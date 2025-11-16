(function() {
  'use strict';

  const defaultConfig = {
    files: [],
    basePath: '',
    debug: false,
    autoDetect: true  
  };

  const config = Object.assign({}, defaultConfig, window.fileMergerConfig || {});

  window.mergedFiles = window.mergedFiles || {};

  function log(...args) {
    if (config.debug) {
      console.log('[FileMerger]', ...args);
    }
  }

  function error(...args) {
    console.error('[FileMerger]', ...args);
  }

  async function mergeSplitFiles(filePath, numParts) {
    try {
      const parts = [];
      for (let i = 1; i <= numParts; i++) {
        parts.push(`${filePath}.part${i}`);
      }

      log(`Merging ${filePath} from ${numParts} parts...`);
      
      const responses = await Promise.all(
        parts.map(part => window.originalFetch(part))
      );

      for (let i = 0; i < responses.length; i++) {
        if (!responses[i].ok) {
          throw new Error(`Failed to load ${parts[i]}: ${responses[i].status}`);
        }
      }

      const buffers = await Promise.all(responses.map(r => r.arrayBuffer()));

      const totalSize = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);

      const mergedArray = new Uint8Array(totalSize);
      let offset = 0;
      for (const buffer of buffers) {
        mergedArray.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
      }

      log(` ${filePath} merged successfully: ${totalSize} bytes`);
      return mergedArray.buffer;
    } catch (err) {
      error(`Failed to merge ${filePath}:`, err);
      throw err;
    }
  }

  function shouldInterceptFile(url) {
    const urlStr = typeof url === 'string' ? url : url.toString();

    if (urlStr.includes('.part')) {
      return null;
    }

    for (const file of config.files) {
      if (urlStr.includes(file.name)) {
        return file.name;
      }
    }

    if (config.autoDetect) {
      const patterns = [
        /\.data$/,
        /\.wasm$/,
        /\.unityweb$/
      ];

      for (const pattern of patterns) {
        if (pattern.test(urlStr)) {
          const urlParts = urlStr.split('/');
          const filename = urlParts[urlParts.length - 1].split('?')[0];
          return filename;
        }
      }
    }

    return null;
  }

  function getMergedFile(filename) {
    if (window.mergedFiles[filename]) {
      return window.mergedFiles[filename];
    }

    for (const [key, value] of Object.entries(window.mergedFiles)) {
      if (key.endsWith(filename) || filename.endsWith(key)) {
        return value;
      }
    }

    return null;
  }

  if (!window.originalFetch) {
    window.originalFetch = window.fetch;
  }

  window.fetch = function(url, ...args) {
    const filename = shouldInterceptFile(url);
    
    if (filename) {
      log('Intercepting fetch for:', filename);
      
      return new Promise((resolve, reject) => {
        const maxWait = 30000;
        const startTime = Date.now();
        
        const checkData = setInterval(() => {
          const buffer = getMergedFile(filename);
          
          if (buffer) {
            clearInterval(checkData);
            log('Serving merged file:', filename);
            
            const contentType = filename.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream';
            
            resolve(new Response(buffer, {
              status: 200,
              statusText: 'OK',
              headers: {
                'Content-Type': contentType,
                'Content-Length': buffer.byteLength.toString()
              }
            }));
          } else if (Date.now() - startTime > maxWait) {
            clearInterval(checkData);
            reject(new Error(`Timeout waiting for merged file: ${filename}`));
          }
        }, 50);
      });
    }
    
    return window.originalFetch.call(this, url, ...args);
  };

  if (!window.OriginalXMLHttpRequest) {
    window.OriginalXMLHttpRequest = window.XMLHttpRequest;
  }

  window.XMLHttpRequest = function(options) {
    const xhr = new window.OriginalXMLHttpRequest(options);
    const originalOpen = xhr.open;
    const originalSend = xhr.send;
    let requestUrl = '';

    xhr.open = function(method, url, ...args) {
      requestUrl = url;
      return originalOpen.call(this, method, url, ...args);
    };

    xhr.send = function(...args) {
      const filename = shouldInterceptFile(requestUrl);
      
      if (filename) {
        log('Intercepting XMLHttpRequest for:', filename);
        
        const checkInterval = setInterval(() => {
          const buffer = getMergedFile(filename);
          
          if (buffer) {
            clearInterval(checkInterval);
            log(' Serving merged file via XHR:', filename);
            
            Object.defineProperty(xhr, 'response', { 
              value: buffer, 
              writable: false 
            });
            Object.defineProperty(xhr, 'status', { 
              value: 200, 
              writable: false 
            });
            Object.defineProperty(xhr, 'readyState', { 
              value: 4, 
              writable: false 
            });
            
            setTimeout(() => {
              if (xhr.onload) xhr.onload({ 
                type: 'load', 
                loaded: buffer.byteLength, 
                total: buffer.byteLength, 
                lengthComputable: true 
              });
              if (xhr.onreadystatechange) xhr.onreadystatechange();
            }, 0);
          }
        }, 50);
        
        return;
      }

      return originalSend.call(this, ...args);
    };

    return xhr;
  };

  Object.setPrototypeOf(window.XMLHttpRequest, window.OriginalXMLHttpRequest);
  Object.setPrototypeOf(window.XMLHttpRequest.prototype, window.OriginalXMLHttpRequest.prototype);

  async function autoMergeFiles() {
    if (config.files.length === 0) {
      log('No files configured for merging Set window.fileMergerConfig.files');
      return;
    }

    try {
      log('Starting file merge for', config.files.length, 'file(s)...');
      
      const mergePromises = config.files.map(file => {
        const fullPath = config.basePath ? `${config.basePath}${file.name}` : file.name;
        return mergeSplitFiles(fullPath, file.parts).then(buffer => {
          window.mergedFiles[file.name] = buffer;
          window.mergedFiles[fullPath] = buffer;  
          return { name: file.name, size: buffer.byteLength };
        });
      });

      const results = await Promise.all(mergePromises);
      
      log(' All files merged successfully');
      results.forEach(result => {
        log(` ${result.name}: ${result.size} bytes`);
      });

      window.dispatchEvent(new CustomEvent('filesMerged', { detail: results }));
      
    } catch (err) {
      error(' Failed to merge files:', err);
      if (!config.silent) {
        alert('Failed to load game files. Check console for details.\n\nError: ' + err.message);
      }
    }
  }


  autoMergeFiles();

  window.fileMerger = {
    merge: mergeSplitFiles,
    config: config,
    getFile: getMergedFile
  };

})();