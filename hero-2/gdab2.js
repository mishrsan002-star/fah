// ============================================================
//  GDAB — GameDistribution AntiBlock
//  Unity WebGL Fix by: syncintellect / endlessguyin (forked)
//  Patch: Unity asset streaming freeze fix
// ============================================================

// --- UNITY ASSET DETECTION -----------------------------------
// These are the file extensions and URL patterns Unity WebGL
// uses when streaming game assets. We must NEVER block these.
const UNITY_ASSET_PATTERNS = [
  /\.data(\.gz|\.br)?$/i,
  /\.wasm(\.gz|\.br)?$/i,
  /\.framework\.js(\.gz|\.br)?$/i,
  /\.loader\.js$/i,
  /\.bundle(\.gz|\.br)?$/i,
  /\.unityweb$/i,
  /\.memgz$/i,
  /Build\//i,
  /StreamingAssets\//i,
];

function isUnityAsset(url) {
  if (!url) return false;
  return UNITY_ASSET_PATTERNS.some((pattern) => pattern.test(url));
}

// --- DOMAIN CHECK --------------------------------------------
const currentDomain = window.location.hostname;

function isSameDomain(url) {
  if (!url) return true;
  try {
    if (url.startsWith("/") || !url.includes("://")) return true;
    const urlObj = new URL(url);
    return urlObj.hostname === currentDomain;
  } catch (e) {
    return false;
  }
}

// A URL is "safe" if it's same-domain OR a Unity asset
function isSafeUrl(url) {
  return isSameDomain(url) || isUnityAsset(url);
}

// --- PREVENT PAGE UNLOAD / POPUPS ----------------------------
window.onbeforeunload = function (e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  setTimeout(function () {
    window.stop();
  }, 1);
};

const originalWindowOpen = window.open;
window.open = function () {
  return null;
};

window.confirm = function () {
  return false;
};

window.alert = function (message) {};

// --- FETCH PATCH ---------------------------------------------
const originalFetch = window.fetch;
window.fetch = function (resource, options) {
  const url = typeof resource === "string" ? resource : resource.url;
  if (isSafeUrl(url)) {
    return originalFetch.apply(this, arguments);
  } else {
    console.log("[GDAB] Blocked external fetch:", url);
    return new Promise((resolve, reject) => {
      reject(new Error("External network request blocked"));
    });
  }
};

// --- XHR PATCH -----------------------------------------------
// KEY FIX: Unity's loader reads ETag and other headers for its
// IndexedDB caching system. We must:
//   1. Never block Unity asset XHRs
//   2. Silently swallow getResponseHeader errors (ETag is a
//      "forbidden" header the browser won't expose — this is
//      what caused the freeze: Unity was crashing on the error)
const originalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function () {
  const xhr = new originalXHR();
  const originalOpen = xhr.open.bind(xhr);
  const originalSend = xhr.send.bind(xhr);
  const originalGetResponseHeader = xhr.getResponseHeader.bind(xhr);

  let _blocked = false;

  xhr.open = function (method, url, ...rest) {
    _blocked = !isSafeUrl(url);
    if (_blocked) {
      xhr._blockedUrl = url;
    }
    return originalOpen(method, url, ...rest);
  };

  xhr.send = function (body) {
    if (_blocked) {
      console.log("[GDAB] Blocked external XHR:", xhr._blockedUrl);
      setTimeout(() => {
        const errorEvent = new Event("error");
        xhr.dispatchEvent(errorEvent);
      }, 0);
      return;
    }
    return originalSend(body);
  };

  // FIX: Wrap getResponseHeader so Unity's ETag check doesn't
  // throw and stall the loading pipeline.
  xhr.getResponseHeader = function (name) {
    try {
      return originalGetResponseHeader(name);
    } catch (e) {
      // Browser refused to expose this header (e.g. ETag).
      // Return null so Unity falls back gracefully instead of freezing.
      return null;
    }
  };

  return xhr;
};

// --- IMAGE PATCH ---------------------------------------------
const originalImage = window.Image;
window.Image = function () {
  const img = new originalImage();
  const originalSrcDescriptor = Object.getOwnPropertyDescriptor(
    HTMLImageElement.prototype,
    "src"
  );
  Object.defineProperty(img, "src", {
    set: function (value) {
      if (isSafeUrl(value)) {
        originalSrcDescriptor.set.call(this, value);
      } else {
        console.log("[GDAB] Blocked external image:", value);
      }
    },
    get: function () {
      return originalSrcDescriptor.get.call(this);
    },
  });
  return img;
};

// --- createElement PATCH -------------------------------------
// FIX: Unity's loader uses dynamically created <script> tags
// to load its own framework/wasm files. We must allow these.
const originalCreateElement = document.createElement.bind(document);
document.createElement = function (tagName) {
  const element = originalCreateElement(tagName);

  if (tagName.toLowerCase() === "script") {
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(
      HTMLScriptElement.prototype,
      "src"
    );
    Object.defineProperty(element, "src", {
      set: function (value) {
        if (isSafeUrl(value)) {
          // Includes Unity .loader.js and .framework.js
          originalSrcDescriptor.set.call(this, value);
        } else {
          console.log("[GDAB] Blocked external script:", value);
        }
      },
      get: function () {
        return originalSrcDescriptor.get.call(this);
      },
    });
  }

  if (tagName.toLowerCase() === "iframe") {
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(
      HTMLIFrameElement.prototype,
      "src"
    );
    Object.defineProperty(element, "src", {
      set: function (value) {
        if (isSafeUrl(value)) {
          originalSrcDescriptor.set.call(this, value);
        } else {
          console.log("[GDAB] Blocked external iframe:", value);
        }
      },
      get: function () {
        return originalSrcDescriptor.get.call(this);
      },
    });
  }

  return element;
};

// --- sendBeacon PATCH ----------------------------------------
const originalSendBeacon = navigator.sendBeacon.bind(navigator);
navigator.sendBeacon = function (url, data) {
  if (isSafeUrl(url)) {
    return originalSendBeacon(url, data);
  } else {
    console.log("[GDAB] Blocked external beacon:", url);
    return false;
  }
};

// --- WebSocket PATCH -----------------------------------------
const originalWebSocket = window.WebSocket;
window.WebSocket = function (url, protocols) {
  if (isSafeUrl(url)) {
    return new originalWebSocket(url, protocols);
  } else {
    console.log("[GDAB] Blocked external WebSocket:", url);
    return {
      send: function () {},
      close: function () {},
      addEventListener: function () {},
    };
  }
};

// --- READY ---------------------------------------------------
console.log(
  "%cGDAB is running! (Unity WebGL fix active)",
  "color: white; background-color: #111; font-size: 18px; padding: 10px; display: block; text-align: center;"
);
console.log(
  "%cGameDistribution-AntiBlock — syncintellect / endlessguyin — Unity freeze patch applied",
  "color: #aaa; background-color: #111; font-size: 11px; padding: 8px; display: block; text-align: center;"
);