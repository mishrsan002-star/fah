(() => {
  "use strict";
  const e = "Ice Fishing 3D",
    t = {
      width: 800,
      height: 450
    },
    n = "https://www.playcombo.com/highscores/hiscores.php";

  function s(e, t, n = !0) {
    let s = Math.random() * (t - e) + e;
    return n ? Math.round(s) : Math.round(100 * s) / 100
  }

  function o(e, t = !0) {
    return t ? Math.round(e) : Math.round(100 * e) / 100
  }

  function i(e) {
    return e * Math.PI / 180
  }

  function a(e, n = new BABYLON.Vector2.Zero) {
    let s = t.width,
      o = new Uint8Array(s * t.height * 4);
    e.readPixels(0, 0, o);
    let i = o[4 * n.y * s + 4 * n.x],
      a = o[4 * n.y * s + 4 * n.x + 1],
      r = o[4 * n.y * s + 4 * n.x + 2],
      l = o[4 * n.y * s + 4 * n.x + 3];
    return new BABYLON.Color4.FromInts(i, a, r, l)
  }

  function r(e = "Playcombo") {
    switch (e) {
      case "Playcombo":
      default:
        ! function(e) {
          function t(t) {
            const n = document.createElement("div");
            n.style.position = "absolute", n.style.width = e.style.width, n.style.height = e.style.height, n.style.top = e.style.top, n.style.left = e.style.left, n.style.color = "white", n.style.backgroundColor = "black";
            const s = document.createElement("div");
            s.style.position = "absolute", s.style.top = "50%", s.style.left = "50%", s.style.transform = "translate(-50%, -50%)", n.appendChild(s);
            const o = document.createElement("div");
            o.style.fontSize = "14px", o.style.fontFamily = "Arial", o.style.color = "#999999", o.style.position = "absolute", o.style.bottom = "0", o.style.padding = "5px", o.style.margin = "5px", n.appendChild(o);
            const i = document.createElement("div");
            i.style.fontSize = "16px", i.style.fontFamily = "Arial", i.style.textAlign = "center", i.style.color = "#ffffff", i.style.position = "absolute", i.style.bottom = "0", i.style.right = "0", i.style.width = "150px", i.style.padding = "5px", i.style.margin = "5px", i.style.border = "1px", i.style.borderStyle = "solid", i.style.borderColor = "#999999", i.style.visibility = "hidden", i.style.cursor = "pointer", i.innerText = "Skip Ad", n.appendChild(i);
            const a = document.createElement("div");
            a.style.fontSize = "16px", a.style.fontFamily = "Arial", a.style.textAlign = "center", a.style.color = "#ffffff", a.style.position = "absolute", a.style.top = "50%", a.style.left = "50%", a.style.transform = "translate(-50%, -50%)", a.innerHTML = "Loading<br>please wait", n.appendChild(a);
            const r = document.createElement("a");
            r.href = t.url, r.target = "blank", s.appendChild(r);
            const l = document.createElement("video");
            l.src = t.file, l.style.width = "400px", l.style.height = "225px", l.autoplay = !0, l.onplay = function() {
              a.style.display = "none";
              let e = setInterval(t, 1e3);

              function t() {
                let t = (l.duration - l.currentTime).toFixed(),
                  n = function(e, t = 3) {
                    let n, s = parseInt(e, 10),
                      o = Math.floor(s / 3600),
                      i = Math.floor((s - 3600 * o) / 60),
                      a = s - 3600 * o - 60 * i;
                    switch (o < 10 && (o = "0" + o), i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), t) {
                      case 1:
                        n = a;
                        break;
                      case 2:
                        n = i + ":" + a;
                        break;
                      default:
                        n = o + ":" + i + ":" + a
                    }
                    return n
                  }(t, 2);
                o.innerText = "Ad will close in " + n, t <= 5 && (i.style.visibility = "visible"), t <= 0 && clearInterval(e)
              }
              i.onclick = function() {
                clearInterval(e), n.remove()
              }
            }, l.onended = function() {
              n.remove()
            }, r.appendChild(l), document.body.appendChild(n)
          }

          function n(e, t) {
            let n = new XMLHttpRequest;
            n.open("GET", e, !0), n.responseType = "json", n.onload = function() {
              let e = n.status;
              t(200 === e ? null : e, n.response)
            }, n.send()
          }
          n("./assets/promo/set_promo.json", (function(e, n) {
            null === e ? t(n) : console.log("Promo loading wrong: " + e)
          }))
        }(assets.canvas);
        break;
      case "GameMonetize":
        "undefined" != typeof sdk && "undefined" !== sdk.showBanner && sdk.showBanner();
        break;
      case "GameDistribution":
        "undefined" != typeof gdsdk && "undefined" !== gdsdk.showAd && gdsdk.showAd()
    }
  }
  class l {
    static goUrl(e) {
      window.open(e, "_blank")
    }
    static goHome() {
      window.open("https://www.playcombo.com", "_blank")
    }
    static goScores() {
      window.open(n + "?sendGame=" + e + "&myState=readHtml", "_blank")
    }
    static getScores(t) {
      let s = new XMLHttpRequest;
      s.open("POST", n, !0), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), s.send("sendGame=" + e + "&myState=read"), s.onload = function() {
        200 === s.status ? function(e) {
          let n = "",
            s = "",
            o = e.split("\n");
          for (let e = 0; e < o.length - 1; e++)
            if ("" != o[e] && e < 10) {
              let i = o[e].split(" ... ");
              n += e + 1 + " " + i[0] + "\n", s += i[1] + "\n", t(n, s)
            }
        }(s.responseText) : console.log("Connection error!")
      }
    }
    static sendScores(t, s) {
      let o = new XMLHttpRequest;
      o.open("POST", n, !0), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.send("sendGame=" + e + "&sendName=" + t + "&sendScores=" + s + "&myState=write")
    }
  }
  class c {
    static get GameName() {
      return e
    }
    static get Scores() {
      let t;
      return t = localStorage.getItem(e + " - Scores"), t || (t = 0), t
    }
    static set Scores(t) {
      let n = 0;
      n = localStorage.getItem(e + " - Scores") ? parseFloat(localStorage.getItem(e + " - Scores")) : 0, localStorage.setItem(e + " - Scores", Math.round(100 * (n + t)) / 100)
    }
    static ResetScores() {
      localStorage.setItem(e + " - Scores", 0)
    }
    static get Cash() {
      let t;
      return t = localStorage.getItem(e + " - Cash"), t || (t = 300, localStorage.setItem(e + " - Cash", t.toString())), t
    }
    static set Cash(t) {
      let n;
      n = localStorage.getItem(e + " - Cash") ? parseFloat(localStorage.getItem(e + " - Cash")) : 0;
      let s = Math.round(100 * (n + t)) / 100;
      s > 1e6 && (s = 1e6), localStorage.setItem(e + " - Cash", s)
    }
    static Clear() {
      localStorage.clear()
    }
    static Reset() {
      localStorage.setItem(e + " - Scores", 0), localStorage.setItem(e + " - Cash", 0), localStorage.setItem(e + " - PlayerName", "")
    }
    static set PlayerName(t) {
      "undefined" != t && " " != t && "" != t && localStorage.setItem(e + " - PlayerName", t)
    }
    static get PlayerName() {
      let t;
      return t = localStorage.getItem(e + " - PlayerName"), t || (t = "Player"), t
    }
    static set Place(t) {
      localStorage.setItem(e + " - CurPlace", t)
    }
    static get Place() {
      let t;
      return t = localStorage.getItem(e + " - CurPlace"), t || (t = "Place 8"), t
    }
    static set Rod(t) {
      localStorage.setItem(e + " - CurRod", t)
    }
    static get Rod() {
      let t;
      return t = localStorage.getItem(e + " - CurRod"), t || (t = "Rod1"), t
    }
    static set Lure(t) {
      localStorage.setItem(e + " - CurLure", t)
    }
    static get Lure() {
      let t;
      return t = localStorage.getItem(e + " - CurLure"), t || (t = "Lure9"), t
    }
  }
  class d {
    static Get(t) {
      let n = [],
        s = 0;
      switch (t) {
        case "Place":
          for (s = 1; s < 13; s++) {
            let t = localStorage.getItem(e + " - MarketPlace" + s);
            t || (t = 0), n.push(t)
          }
          break;
        case "Rod":
          for (s = 1; s <= 3; s++) {
            let t = localStorage.getItem(e + " - MarketRod" + s);
            t || (t = 0), n.push(t)
          }
          break;
        case "Lure":
          for (s = 1; s <= 10; s++) {
            let t = localStorage.getItem(e + " - MarketLure" + s);
            t || (t = 0), n.push(t)
          }
      }
      return n
    }
    static Buy(t, n) {
      let s = parseFloat(localStorage.getItem(e + " - Cash")),
        o = Math.round(100 * (s - n)) / 100;
      localStorage.setItem(e + " - Cash", o), localStorage.setItem(e + " - Market" + t, 1)
    }
  }
  class u {
    #e;
    #t = !1;
    #n;
    #s;
    #o;
    #i;
    #a;
    #r;
    constructor() {
      BABYLON.Engine.audioEngine.useCustomUnlockedButton = !0, this.#e = new BABYLON.Sound("sClick", assets.sounds.sClick, scene, null, {
        loop: !1,
        autoplay: !1
      }), this.#n = new BABYLON.Sound("sWind", assets.sounds.sWind, scene, null, {
        loop: !0,
        autoplay: !1
      }), this.#s = new BABYLON.Sound("sDrip", assets.sounds.sDrip, scene), this.#o = new BABYLON.Sound("sTinkle", assets.sounds.sTinkle, scene), this.#i = new BABYLON.Sound("sFreel", assets.sounds.sFreel, scene, null, {
        loop: !0,
        autoplay: !1
      }), this.#a = new BABYLON.Sound("sFootstep", assets.sounds.sFootstep, scene, null, {
        loop: !0,
        autoplay: !1
      }), this.#r = new BABYLON.Sound("sDrilling", assets.sounds.sDrilling, scene, null, {
        loop: !0,
        autoplay: !1
      });
      let e = new BABYLON.Sound("sCrow1", assets.sounds.sCrow1, scene),
        t = new BABYLON.Sound("sCrow2", assets.sounds.sCrow2, scene),
        n = this;
      scene.registerBeforeRender((function() {
        if (!0 === n.#t) {
          let n = s(0, 1e3);
          700 == n && e.play(), 100 == n && t.play()
        }
      }))
    }
    set playGround(e) {
      e ? (this.#t = !0, this.#n.play()) : (this.#t = !1, this.#n.stop())
    }
    get sClick() {
      return BABYLON.Engine.audioEngine.audioContext?.resume(), this.#e
    }
    get sDrip() {
      return this.#s
    }
    get sTinkle() {
      return this.#o
    }
    get sFreel() {
      return this.#i
    }
    get sFootstep() {
      return this.#a
    }
    get sDrilling() {
      return this.#r
    }
    set mute(e) {
      !0 === e ? BABYLON.Engine.audioEngine.setGlobalVolume(0) : BABYLON.Engine.audioEngine.setGlobalVolume(1)
    }
    get mute() {
      let e = !1;
      return e = !(BABYLON.Engine.audioEngine.getGlobalVolume() > 0), e
    }
  }
  Array.prototype.getMeshByName = function(e) {
    let t = new BABYLON.AbstractMesh(null);
    for (let n = 0; n < this.length; n++)
      if (this[n].name === e) {
        t = this[n];
        break
      } return t
  }, Array.prototype.getAnimationByName = function(e) {
    let t = new BABYLON.AnimationGroup(null);
    for (let n = 0; n < this.length; n++)
      if (this[n].name === e) {
        t = this[n];
        break
      } return t
  };
  let p = function() {
      const e = 1.4;
      let t = new B;
      t.reel = new g, t.lure = new m(c.Lure), t.lure.position.y = e, t.setRod = n => {
        switch (n) {
          case "Rod1":
            t.material.albedoTexture = assets.meshes.getMeshByName("Rod1TexColorMesh").material.albedoTexture, t.reel.material.albedoTexture = assets.meshes.getMeshByName("Reel1TexColorMesh").material.albedoTexture;
            break;
          case "Rod2":
            t.material.albedoTexture = assets.meshes.getMeshByName("Rod2TexColorMesh").material.albedoTexture, t.reel.material.albedoTexture = assets.meshes.getMeshByName("Reel2TexColorMesh").material.albedoTexture;
            break;
          case "Rod3":
            t.material.albedoTexture = assets.meshes.getMeshByName("Rod3TexColorMesh").material.albedoTexture, t.reel.material.albedoTexture = assets.meshes.getMeshByName("Reel3TexColorMesh").material.albedoTexture
        }
        t.set = assets.data.Rod[n], c.Rod = n, t.lure.position.y = 1.9, t.lure.position.x = 0, t.lure.position.z = 0, t.bottomLimit = e, u()
      }, t.setRod(c.Rod), t.setLure = n => {
        t.lure.setLure(n), t.lure.position.y = 1.9, t.lure.position.x = 0, t.lure.position.z = 0, t.bottomLimit = e, u()
      };
      let n = t.skeleton;
      t.float = new h("Float1"), t.float.directNode = new BABYLON.TransformNode("DirectNode"), t.float.directNode.setPivotPoint(new BABYLON.Vector3(0, 0, .82)), t.float.directNode.position = t.float.directNode.getPivotPoint().negate(), t.float.directPoint = new BABYLON.Mesh("DirectPoint", scene), t.float.directPoint.parent = t.float.directNode, t.float.inAction = !1, t.lureUp = !1, t.lureDown = !1, t.currentFish = null, t.fishGetLure = !1, t.fishCaught = !1, t.bendShift = 0, t.bottomLimit = e, t.isDemo = !1, t.control = function(e, n) {
        if (t.isDemo) t.reel.setAnimation("Pause");
        else switch (e) {
          case "lureUp":
            n ? (t.lureUp = !0, t.currentFish && t.fishGetLure && (t.fishCaught = !0), t.reel.setAnimation("Forward")) : (t.lureUp = !1, t.reel.setAnimation("Pause"));
            break;
          case "lureDown":
            n ? (t.lureDown = !0, t.reel.setAnimation("Backward")) : (t.lureDown = !1, t.reel.setAnimation("Pause"))
        }
      };
      let s = {
          marker0: (() => {
            let e = new BABYLON.Mesh("marker0", scene, n.bones[2]);
            return e.movePOV(0, 1, .42), e
          })(),
          marker1: (() => {
            let e = new BABYLON.Mesh("marker1", scene, n.bones[3]);
            return e.movePOV(0, -.1, .19), e
          })(),
          marker2: (() => {
            let e = new BABYLON.Mesh("marker2", scene, n.bones[8]);
            return e.movePOV(0, -.1, .19), e
          })(),
          marker3: (() => {
            let e = new BABYLON.Mesh("marker3", scene, n.bones[13]);
            return e.movePOV(0, -.1, .19), e
          })(),
          marker4: (() => {
            let e = new BABYLON.Mesh("marker4", scene, n.bones[16]);
            return e.movePOV(0, .22, .19), e
          })(),
          marker5: new BABYLON.Mesh("marker5", scene, t.float.model),
          marker6: new BABYLON.Mesh("marker5", scene, t.lure)
        },
        o = [];
      for (const [, e] of Object.entries(s)) o.push(e.absolutePosition);
      let a = BABYLON.Mesh.CreateLines("Line", o, scene, !0);
      a.color = new BABYLON.Color3(1, 1, 1), a.alpha = .85, a.material.needDepthPrePass = !0;
      let r = 0,
        l = 0,
        d = 0;

      function u() {
        t.fishCaught = !1, t.fishGetLure = !1, null != t.currentFish && (t.currentFish.fear = !0, t.currentFish = null)
      }

      function p(e, t) {
        d++, e.rotation.y = Math.sin(d * t * Math.PI / 180)
      }

      function f() {
        ! function() {
          let e = i(-35),
            s = new BABYLON.Vector3(0, .4, 3.5);
          n.bones[1].position = s, n.bones[1].setYawPitchRoll(0, e, 0);
          let r = 0;
          t.fishCaught && t.lureUp && !t.isDemo ? (r = t.currentFish.desk.scale, t.bendShift < r / 10 / 2 && (t.bendShift += .01)) : t.bendShift > 0 && (t.bendShift -= .01);
          let c = t.bendShift + l / 1e3 * 2;
          c < .01 && (c = .01), c > .175 && (c = .175);
          for (let e = 3; e <= 16; e++) n.bones[e].setYawPitchRoll(0, -c - t.float.position.z / Math.PI / 20, 0);
          n.bones[1].setYawPitchRoll(t.float.position.x / Math.PI * -1, (t.float.position.z / Math.PI + c + e) / 2, 0), t.reel.position = s, t.reel.rotation = new BABYLON.Vector3(n.bones[1].rotation.x, -n.bones[1].rotation.y, n.bones[1].rotation.z), t.reel.movePOV(t.set.reelPos.x, t.set.reelPos.y, t.set.reelPos.z), a = BABYLON.Mesh.CreateLines(null, o, scene, !0, a)
        }(),
        function() {
          if (t.isDemo)
            if (t.fishCaught) {
              let e = t.currentFish.position,
                n = new BABYLON.Vector3(0, 2.4, 0),
                s = BABYLON.Vector3.Distance(e, n),
                o = new BABYLON.Vector3(n.x - e.x, n.y - e.y, n.z - e.z);
              if (o.normalize(), s > .1) {
                let e = s / 100 * 2;
                t.currentFish.translate(o, e), t.lure.position = t.currentFish.position
              }
              p(t.currentFish, 2)
            } else {
              let n = t.lure.position,
                s = new BABYLON.Vector3(0, e, 0),
                o = BABYLON.Vector3.Distance(n, s),
                i = new BABYLON.Vector3(s.x - n.x, s.y - n.y, s.z - n.z);
              if (i.normalize(), o > .1) {
                let e = o / 100 * 2;
                t.lure.translate(i, e)
              }
              p(t.lure, 2)
            }
          else if (t.fishGetLure)
            if (t.lure.isVisible(!1), t.currentFish && (t.lure.position.x = t.currentFish.position.x, t.lure.position.y = t.currentFish.position.y, t.lure.position.z = t.currentFish.position.z, t.bottomLimit = t.lure.position.y), t.lureUp) {
              let e = t.currentFish.position,
                n = new BABYLON.Vector3.Zero,
                s = BABYLON.Vector3.Distance(e, n),
                o = new BABYLON.Vector3(n.x - e.x, n.y - e.y, n.z - e.z);
              if (o.normalize(), t.fishCaught)
                if (s > .1) {
                  o.multiply(t.currentFish.desk.target);
                  let e = t.set.reelPower / 10 / 2 - t.currentFish.desk.scale / 100;
                  t.currentFish.translate(o, e)
                } else t.isDemo = !0;
              0 === r && (r = s), s > r && (l += .5, l >= 100 && t.fishCaught && u())
            } else l > 0 && l--;
          else {
            if (t.lure.isVisible(!0), l = 0, r = 0, t.lureUp) {
              let n = t.lure.position,
                s = new BABYLON.Vector3.Zero;
              n.y > -.1 && (s = new BABYLON.Vector3(0, e, 0));
              let o = BABYLON.Vector3.Distance(n, s),
                i = new BABYLON.Vector3(s.x - n.x, s.y - n.y, s.z - n.z);
              i.normalize(), p(t.lure, 1), o > .1 ? (t.lure.translate(i, t.set.reelPower / 10), t.bottomLimit = n.y) : t.reel.isMotion = !1
            }
            if (t.lureDown) {
              let e = t.lure.position,
                n = new BABYLON.Vector3(e.x, scene.bottomLimit, e.z),
                s = BABYLON.Vector3.Distance(e, n),
                o = new BABYLON.Vector3(n.x - e.x, n.y - e.y, n.z - e.z);
              o.normalize(), s > .1 && (t.lure.translate(o, .1), t.bottomLimit = e.y, t.reel.isMotion = !0)
            }
            if (!t.lureDown && !t.lureUp) {
              let e = t.lure.position,
                n = new BABYLON.Vector3(0, t.bottomLimit, 0),
                s = BABYLON.Vector3.Distance(e, n),
                o = new BABYLON.Vector3(n.x - e.x, n.y - e.y, n.z - e.z);
              o.y *= 2, o.normalize(), p(t.lure, 1), s > .1 && e.y - .1 > scene.bottomLimit && t.lure.translate(o, .1 * s / 10)
            }
          }
          t.lure.position.y - .1 <= scene.bottomLimit ? t.float.isDown = !0 : t.float.isDown = !1, t.lure.position.y < 0 && !t.lure.isDown && (scene.sound.sDrip.play(), t.float.stopAnimation(), t.lure.isDown = !0), t.lure.position.y > 0 && t.lure.isDown && (scene.sound.sDrip.play(), t.float.stopAnimation(), t.lure.isDown = !1)
        }(),
        function() {
          if (t.lure.position.y < 0) {
            let e = t.float.position,
              n = new BABYLON.Vector3(t.lure.position.x, 0, t.lure.position.z).negate(),
              s = new BABYLON.Vector3(n.x - e.x, n.y - e.y, n.z - e.z),
              o = BABYLON.Vector3.Distance(n, e);
            t.float.directNode.lookAt(s);
            let i = t.float.directPoint.absolutePosition,
              a = new BABYLON.Vector3(i.x - e.x, i.y - e.y, i.z - e.z),
              r = BABYLON.Vector3.Distance(i, e);
            BABYLON.Vector3.Distance(BABYLON.Vector3.Zero(), n) <= .82 ? o > .01 && t.float.translate(s, .025) : r > .01 && t.float.translate(a, .025), t.fishGetLure && !t.float.inAction && (t.float.setAnimation(t.currentFish.set.FishBite), t.float.inAction = !0, t.currentFish && scene.sound.sTinkle.play()), !t.fishGetLure && t.float.inAction && (t.float.inAction = !1, t.float.stopAnimation())
          } else t.float.position = new BABYLON.Vector3(t.lure.position.x, t.lure.position.y + .1, t.lure.position.z)
        }(), l <= 100 && (t.lineTension = l)
      }
      return t.lineTension = l, t.lure.isDown = !1, scene.registerBeforeRender(f), t.onDispose = () => {
        scene.unregisterBeforeRender(f), t.float.dispose(), t.reel.dispose(), t.lure.dispose(), a.dispose()
      }, t
    },
    h = function(e) {
      let t = new BABYLON.TransformNode(e),
        n = assets.meshes.getMeshByName(e);
      t.model = n.clone(e, null), t.model.parent = t, t.isRotated = !1, t.onWater = !1, t.setAnimation = function(e) {
        const n = new BABYLON.Animation("FloatAnim", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        n.setKeys(Object.values(e));
        let o = s(1, 2, !1);
        (new f).position = t.position, scene.beginDirectAnimation(t.model, [n], 0, 60, !1, o, (() => {
          (new f).position = new BABYLON.Vector3(t.position.x, 0, t.position.z)
        }))
      }, t.stopAnimation = function() {
        (new f).position = t.position, scene.stopAnimation(t.model), t.model.position.y = 0
      };
      let o = 0,
        i = new BABYLON.Vector3(.5, 0, .5);

      function a() {
        !0 === t.isDown && !1 === t.isRotated && (o < 1 ? (o += .025, t.model.rotate(i, .025)) : t.isRotated = !0), !1 === t.isDown && !0 === t.isRotated && (o > .1 ? (o -= .1, t.model.rotate(i, -.1)) : t.isRotated = !1)
      }
      return scene.registerBeforeRender(a), t.onDispose = () => {
        scene.unregisterBeforeRender(a)
      }, t
    },
    m = function(e) {
      let t = new BABYLON.TransformNode("lure");
      t.set = assets.data.Lure[e];
      let n = BABYLON.AbstractMesh;
      return n = assets.meshes.getMeshByName(e).clone(e, t), t.setLure = function(e) {
        n.dispose(), n = assets.meshes.getMeshByName(e).clone(e, t), t.set = assets.data.Lure[e], c.Lure = e
      }, t.isVisible = function(e = !0) {
        switch (e) {
          case !0:
            n.visibility = 1;
            break;
          case !1:
            n.visibility = 0
        }
      }, t
    },
    g = function(e = "Reel1") {
      let t = assets.meshes.getMeshByName(e),
        n = t.clone(e, null);
      n.skeleton = assets.meshes.getMeshByName(e).skeleton.clone(t.skeleton.name), n.skeleton.overrideMesh = n;
      let s = n.skeleton.bones[4],
        o = n.skeleton.bones[5],
        i = s.getTransformNode(),
        a = o.getTransformNode(),
        r = 0,
        l = 1;

      function c() {
        !0 === n.isMotion ? (i.rotate(BABYLON.Axis.Y, r * l), a.rotate(BABYLON.Axis.Y, r * l)) : scene.sound.sFreel.stop()
      }
      return n.setAnimation = function(e) {
        if (n.oldAnim !== e) {
          switch (r = .1, e) {
            case "Pause":
              r = 0, scene.sound.sFreel.stop();
              break;
            case "Backward":
              l = 1, n.isMotion = !0, scene.sound.sFreel.play();
              break;
            case "Forward":
              l = -1, n.isMotion = !0, scene.sound.sFreel.play()
          }
          n.oldAnim = e
        }
      }, scene.registerBeforeRender(c), n.onDispose = () => {
        scene.unregisterBeforeRender(c)
      }, n
    },
    B = function(e = "Rod1") {
      let t = assets.meshes.getMeshByName(e),
        n = t.clone(e, null);
      return n.skeleton = assets.meshes.getMeshByName(e).skeleton.clone(t.skeleton.name), n.skeleton.overrideMesh = n, n.name = "Rod", n.set = assets.data.Rod[e], n
    },
    f = function() {
      let e = assets.meshes.getMeshByName("WaterSplashMesh"),
        t = new BABYLON.TransformNode("splash"),
        n = new BABYLON.StandardMaterial("splashMat", scene);
      n.diffuseTexture = e.material.albedoTexture, n.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND, n.alphaMode = 2, n.diffuseTexture.hasAlpha = !0, n.useAlphaFromDiffuseTexture = !0, n.specularColor = new BABYLON.Color3(0, 0, 0), t.rotation.x = i(90);
      let s = new BABYLON.Animation("aScale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT),
        o = [{
          frame: 0,
          value: new BABYLON.Vector3(0, 0, 0)
        }, {
          frame: 30,
          value: new BABYLON.Vector3(1, 1, 1)
        }];
      s.setKeys(o);
      let a = new BABYLON.Animation("aAlpha", "material.alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

      function r(e = (() => {})) {
        let o = new BABYLON.Mesh.CreatePlane("ring", 1, scene);
        o.scaling = new BABYLON.Vector3(0, 0, 0), o.parent = t, o.material = n, scene.beginDirectAnimation(o, [s, a], 0, 30, !1).onAnimationEnd = function() {
          o.dispose(), e()
        }
      }
      a.setKeys([{
        frame: 0,
        value: 1
      }, {
        frame: 20,
        value: 0
      }]);
      let l = 0;
      return scene.registerBeforeRender((function e() {
        l++, 1 === l && r(), 12 === l && r(), 18 === l && r((function() {
          scene.unregisterBeforeRender(e), t.dispose()
        }))
      })), t
    },
    w = function(e) {
      let t = g(),
        n = BABYLON.Quaternion.Identity(),
        i = new BABYLON.TransformNode("fish");
      i.set = assets.data.Fish[e], i.getTime = 0, i.fear = !1;
      let a = assets.meshes.getMeshByName(e),
        r = a.clone(e, null);
      r.skeleton = assets.meshes.getMeshByName(e).skeleton.clone(a.skeleton.name), r.skeleton.overrideMesh = r, r.parent = i, r.rotationQuaternion = BABYLON.Quaternion.Identity();
      let l = "none";
      i.desk = new Object({
        name: null,
        cost: null,
        speed: null,
        weight: null,
        scale: null,
        target: null,
        scan: null,
        species: null,
        category: 0
      });
      let c = s(i.set.MinWeight, i.set.MaxWeight) - (10 - -1 * scene.bottomLimit) * i.set.MinWeight,
        d = c > i.set.MinWeight ? c : i.set.MinWeight,
        u = o(i.set.MaxWeight / 3e3 * (100 * d / i.set.MaxWeight) / 100, !1),
        p = u < .25 ? .25 : u;
      i.desk.name = i.set.Name, i.desk.scan = i.set.Scan, i.desk.species = i.set.Species, i.desk.weight = d, i.desk.scale = p, i.desk.speed = s(.01, .05, !1), i.desk.cost = o(i.desk.weight * i.set.Price / 1e3, !1), i.desk.target = t;
      let h = i.set.MaxWeight / 3;
      for (let e = 1; e < 4; e++) i.desk.weight > h * e && i.desk.category++;

      function m(t) {
        let n = assets.aGroups.getAnimationByName(e + "_" + t);
        n = n.clone(t, (e => {
          let t = r.skeleton.getBoneIndexByName(e.name);
          return r.skeleton.bones[t]
        })), n.play(!0), l = t
      }

      function g() {
        let e = s(-15, 15),
          t = s(scene.bottomLimit, -1),
          n = s(-15, 15);
        return new BABYLON.Vector3(e, t, n)
      }
      i.scaling = new BABYLON.Vector3(i.desk.scale, i.desk.scale, i.desk.scale), i.position = g();
      let B = scene.place.rod,
        f = B.set.maxTension,
        w = B.lure;

      function A() {
        let e = "free";
        switch (function() {
            let e = i.position,
              t = w.position,
              n = BABYLON.Vector3.Distance(e, t),
              s = i.desk.scan.dist,
              o = i.desk.scan.range;
            n <= s ? t.y < 0 ? e.y <= t.y + o && e.y >= t.y - o && (B.currentFish || function() {
              let e = !1;
              return i.desk.species === w.set.Species && w.set.Category[i.desk.category] > 0 && (e = !0), e
            }() && (B.currentFish = i)) : B.fishCaught || (B.currentFish = null) : B.currentFish === i && n > f && (B.currentFish = null, i.fear = !1)
          }(), B.currentFish === i && !1 === B.fishGetLure && !1 === i.fear && (e = "target"), B.fishGetLure && (B.fishCaught || i.getTime++, i.getTime > 300 && (B.fishGetLure = !1, i.getTime = 0, i.fear = !0)), e) {
          case "free":
          default:
            ! function() {
              let e = i.position,
                s = BABYLON.Vector3.Distance(e, t),
                o = new BABYLON.Vector3(t.x - e.x, t.y - e.y, t.z - e.z);
              if (o.normalize(), e.y < 0 ? "Swim" !== l && m("Swim") : "Caught" !== l && m("Caught"), s > .1) {
                if (e.y <= 0 && i.translate(o, i.desk.speed), n.copyFrom(r.rotationQuaternion), B.fishGetLure && B.lureUp && B.currentFish === i) {
                  let t = 100 * e.y / scene.bottomLimit,
                    n = (scene.bottomLimit - scene.bottomLimit * t / 100) / scene.bottomLimit;
                  o = new BABYLON.Vector3(o.x, n, o.z)
                }
                if (e.y > 0) {
                  let e = 10;
                  o = new BABYLON.Vector3(o.x, e, o.z)
                }
                r.lookAt(o), BABYLON.Quaternion.SlerpToRef(n, r.rotationQuaternion, .1, r.rotationQuaternion)
              } else t = g()
            }();
            break;
          case "target":
            ! function() {
              "Swim" !== l && m("Swim");
              let e = i.position,
                t = w.position,
                s = BABYLON.Vector3.Distance(e, t),
                o = new BABYLON.Vector3(t.x - e.x, t.y - e.y, t.z - e.z);
              o.normalize(), s > .1 ? (i.translate(o, i.desk.speed), n.copyFrom(r.rotationQuaternion), r.lookAt(o), BABYLON.Quaternion.SlerpToRef(n, r.rotationQuaternion, 2 * i.desk.speed, r.rotationQuaternion)) : B.fishGetLure = !0
            }();
            break;
          case "stand":
            ! function() {
              "Stand" !== l && m("Stand");
              let e = i.position,
                s = new BABYLON.Vector3(t.x - e.x, t.y - e.y, t.z - e.z);
              s.normalize(), n.copyFrom(r.rotationQuaternion), r.lookAt(s), BABYLON.Quaternion.SlerpToRef(n, r.rotationQuaternion, i.desk.speed / 10, r.rotationQuaternion), 250 === Math.floor(500 * Math.random()) && (t = g())
            }();
          case "resistance":
        }
      }
      return scene.registerBeforeRender(A), i.destroy = function() {
        i.dispose()
      }, i.onDispose = () => {
        B.fishGetLure = !1, B.fishCaught = !1, B.isDemo = !1, B.lureUp = !1, B.currentFish = null, B.bottomLimit = 0, B.bottomLimit = 1.4, scene.unregisterBeforeRender(A)
      }, i
    },
    A = function() {
      let e = new BABYLON.ParticleSystem("particles", 2e4, scene);
      return e.particleTexture = assets.meshes.getMeshByName("SnowMesh").material.albedoTexture, e.translationPivot = new BABYLON.Vector2(0, 0), e.emitter = new BABYLON.Vector3(0, 10, 0), e.gravity = new BABYLON.Vector3(0, -2, 0), e.minEmitBox = new BABYLON.Vector3(-15, 0, -15), e.maxEmitBox = new BABYLON.Vector3(15, 0, 15), e.minSize = .1, e.maxSize = .25, e.minLifeTime = 1, e.maxLifeTime = 25, e.emitRate = 500, e.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE, e.direction1 = new BABYLON.Vector3(-.5, -1, -.5), e.direction2 = new BABYLON.Vector3(.5, 1, .5), e.minAngularSpeed = 0, e.maxAngularSpeed = .5, e.minEmitPower = .01, e.maxEmitPower = 2, e.updateFunction = function(e) {
        for (let t = 0; t < e.length; t++) {
          let n = e[t];
          n.age += this._scaledUpdateSpeed, n.age >= n.lifeTime ? (e.splice(t, 1), this._stockParticles.push(n), t--) : (n.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep), n.color.addInPlace(this._scaledColorStep), n.color.a < 0 && (n.color.a = 0), n.angle += n.angularSpeed * this._scaledUpdateSpeed, n.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection), n.position.addInPlace(this._scaledDirection), this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity), n.direction.addInPlace(this._scaledGravity), n.position.y < 0 && (e.splice(t, 1), this._stockParticles.push(n), t--))
        }
      }, e
    };
  c.ResetScores();
  class b extends BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI {
    constructor() {
      super("Gui");
      let e = new T;
      this.addControl(e), e.buttonUp.onPointerDownObservable.add((function() {
        scene.place.rod.control("lureUp", !0)
      })), e.buttonUp.onPointerUpObservable.add((function() {
        scene.place.rod.control("lureUp", !1)
      })), e.buttonDown.onPointerDownObservable.add((function() {
        scene.place.rod.control("lureDown", !0)
      })), e.buttonDown.onPointerUpObservable.add((function() {
        scene.place.rod.control("lureDown", !1)
      }));
      let t = !1;

      function n() {
        e.alertVisual.percent = scene.place.rod.lineTension, e.cashValue = c.Cash, scene.place.rod.isDemo ? t || (e.showFishDemo(), t = !0) : t = !1
      }
      scene.registerBeforeRender(n), this.onDispose = () => {
        scene.unregisterBeforeRender(n)
      }
    }
  }
  class x extends BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI {
    constructor() {
      super("MainMenu");
      const e = this;
      e.isFullScreen = !1;
      const t = new BABYLON.Camera("Camera", BABYLON.Vector3.Zero(), scene);
      let n = function(e) {
        let t = e.getSize(),
          n = new BABYLON.GUI.Image;
        return createImageBitmap(new ImageData(new Uint8ClampedArray(e.readPixels()), t.width, t.height)).then((e => {
          n.domImage = e
        })), n
      }(assets.meshes.getMeshByName("PicTitleMesh").material.albedoTexture);
      e.addControl(n);
      let s = new BABYLON.GUI.Rectangle("TopLine");
      s.height = "50px", s.width = "100%", s.color = "Black", s.background = "#000000A6", s.verticalAlignment = 0, e.addControl(s);
      let o = new BABYLON.GUI.Image("TitlePic", assets.images.text_name);
      o.autoScale = !0, s.addControl(o);
      let i = new BABYLON.GUI.Button.CreateImageOnlyButton("bPlaycombo", assets.images.btn_fullScr);
      i.height = "60px", i.width = "60px", i.color = "transparent", i.top = -10, i.left = -10, i.horizontalAlignment = 1, i.verticalAlignment = 1, i.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), e.isFullScreen ? (assets.engine.exitFullscreen(), e.isFullScreen = !1) : (assets.engine.enterFullscreen(!1), e.isFullScreen = !0)
      })), e.addControl(i);
      let a = new D(assets.data.Gui.MainMenu.ButtonPlay);
      a.top = -70, a.left = 5, a.horizontalAlignment = 0, a.verticalAlignment = 2, a.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), scene.destroyMainMenu(), scene.createSelector()
      })), e.addControl(a);
      let r = new D(assets.data.Gui.MainMenu.ButtonScores);
      r.top = 0, r.left = 5, r.horizontalAlignment = 0, r.verticalAlignment = 2, r.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new O;
        e.addControl(t)
      })), e.addControl(r);
      let l = new D(assets.data.Gui.MainMenu.ButtonHelp);
      l.top = 70, l.left = 5, l.horizontalAlignment = 0, l.verticalAlignment = 2, l.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new k;
        e.addControl(t)
      })), e.addControl(l), e.onDispose = () => {
        t.dispose()
      }
    }
  }
  class y extends BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI {
    bNext = new D(assets.data.Gui.Selector.ButtonNextText);
    bBack = new D(assets.data.Gui.Selector.ButtonBackText);
    constructor(e) {
      super("SelectorMenu");
      const t = this;
      t.isFullScreen = !1;
      let n = new BABYLON.GUI.Rectangle("TopLine");
      n.height = "50px", n.width = "100%", n.color = "Black", n.background = "#000000A6", n.verticalAlignment = 0, t.addControl(n);
      let s = new BABYLON.GUI.Image("TitlePic", assets.images.text_name);
      s.autoScale = !0, n.addControl(s);
      let o = new BABYLON.GUI.TextBlock;
      o.width = "350px", o.height = "35px", o.color = "#ffffff", o.fontSize = 18, o.fontStyle = "bold", o.outlineColor = "rgb(82,96,104, 0.65)", o.outlineWidth = 3, o.horizontalAlignment = 2, o.verticalAlignment = 1, o.text = assets.data.Gui.Selector.TopTex, t.addControl(o);
      let i = new BABYLON.GUI.Container;
      i.isPointerBlocker = !0, t.addControl(i), i.onPointerClickObservable.add((function() {
        scene.sound.sClick.play(), e()
      })), t.bBack.top = -5, t.bBack.left = 5, t.bBack.horizontalAlignment = 0, t.bBack.verticalAlignment = 1, t.bBack.onPointerDownObservable.add((function() {
        scene.sound.sClick.play()
      })), t.addControl(t.bBack), t.bNext.top = -5, t.bNext.left = -5, t.bNext.isEnabled = !1, t.bNext.alpha = .7, t.bNext.horizontalAlignment = 1, t.bNext.verticalAlignment = 1, t.bNext.onPointerDownObservable.add((function() {
        scene.sound.sClick.play()
      })), t.addControl(t.bNext)
    }
  }
  class L extends BABYLON.GUI.Container {
    #l = new BABYLON.GUI.Image("imgWin1", assets.images.win1);
    #c = new BABYLON.GUI.TextBlock;
    #d = new BABYLON.GUI.Button.CreateImageOnlyButton("bExit", "");
    constructor() {
      super("win");
      let e = this;
      this.#l.width = "492px", this.#l.height = "378px", this.#c.width = "225px", this.#c.color = "#fffcd9", this.#c.fontSize = 18, this.#c.fontStyle = "bold", this.#c.top = -167, this.#c.shadowColor = "black", this.#c.shadowBlur = 5, e.addControl(this.#l), e.addControl(this.#c);
      let t = this.#d;
      t.image.source = assets.images.btn_hud_hor_sm_st1, t.width = "34px", t.height = "32px", t.color = "transparent", t.top = -171, t.left = 215;
      let n = new BABYLON.GUI.Image("Button Exit_overPic");
      n.source = assets.images.btn_hud_hor_sm_st2, n.isVisible = !1, t.addControl(n), t.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), e.dispose()
      })), t.onPointerEnterObservable.add((function() {
        n.isVisible = !0
      })), t.onPointerOutObservable.add((function() {
        n.isVisible = !1
      }));
      let s = new BABYLON.GUI.Image("bIcon", assets.images.icon_ext_sm);
      s.width = "15px", s.height = "16px", t.addControl(s), e.addControl(t)
    }
    set size(e) {
      switch (e) {
        case "big":
          this.#l.source = assets.images.win1, this.#l.width = "492px", this.#l.height = "378px", this.#c.top = -167, this.#d.top = -171, this.#d.left = 215;
          break;
        case "medium":
          this.#l.source = assets.images.win2, this.#l.width = "385px", this.#l.height = "234px", this.#c.top = -95, this.#d.top = -99, this.#d.left = 160
      }
    }
    set title(e) {
      this.#c.text = e
    }
    get title() {
      return this.#c.text
    }
    set isModal(e) {
      e ? (this.width = "100%", this.height = "100%", this.background = "rgba(0,0,0,0.75)", this.isPointerBlocker = !0) : (this.width = this.#l.width, this.height = this.#l.height, this.background = "rgba(0,0,0,0)", this.isPointerBlocker = !1)
    }
  }
  class O extends L {
    constructor() {
      super(), super.title = assets.data.Gui.Scores.Title, super.isModal = !0;
      const e = this;
      l.getScores((function(e, s) {
        t.text = e, n.text = s
      }));
      let t = new BABYLON.GUI.TextBlock;
      t.color = "#fcfbec", t.fontSize = 16, t.width = "330px", t.height = "260px", t.top = -10, t.left = -70, t.lineSpacing = 8, t.textHorizontalAlignment = 0, t.textVerticalAlignment = 0, e.addControl(t);
      let n = new BABYLON.GUI.TextBlock;
      n.color = "#fcfbec", n.fontSize = 16, n.width = "152px", n.height = "260px", n.top = -10, n.left = 158, n.lineSpacing = 8, n.textHorizontalAlignment = 1, n.textVerticalAlignment = 0, e.addControl(n);
      let s = new BABYLON.GUI.TextBlock("");
      s.text = "Your score: " + c.Scores, s.color = "#fcfbec", s.fontSize = 16, s.width = "480px", s.height = "30px", s.top = 135, s.left = 0, s.lineSpacing = 8, e.addControl(s);
      let o = new P(assets.data.Gui.Scores.Button2Text);
      o.left = -156, o.top = 166, o.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), e.dispose(), l.goScores()
      })), e.addControl(o);
      let i = new P(assets.data.Gui.Scores.Button3Text);
      i.left = 0, i.top = 166, i.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new S((() => {
          e.dispose()
        }));
        e.addControl(t)
      })), e.addControl(i);
      let a = new P(assets.data.Gui.Scores.Button1Text);
      a.left = 156, a.top = 166, a.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), e.dispose()
      })), e.addControl(a)
    }
  }
  class N extends L {
    constructor() {
      super(), super.title = assets.data.Gui.Rods.Title, super.isModal = !0;
      const e = this;
      let t = new P(assets.data.Gui.Rods.Button1Text);
      t.top = 166, t.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), e.dispose()
      })), e.addControl(t);
      let n = d.Get("Rod");
      for (let t = 1; t <= 3; t++) {
        let s = assets.images[`Rod${t}_pic`],
          o = assets.data.Rod[`Rod${t}`].Description,
          i = assets.data.Rod[`Rod${t}`].Price,
          a = !1;
        (n[t - 1] > 0 || 0 == i) && (a = !0);
        let r = BABYLON.GUI.Button.CreateImageOnlyButton(`Rod button ${t}`, s);
        r.image.stretch = 2, r.width = "160px", r.height = "210px", r.color = "transparent", r.left = 160 * t - 320, r.top = -15;
        let l = new BABYLON.GUI.TextBlock;
        l.text = a ? "" : i + "$", l.color = "#fffcd9", l.fontSize = 20, l.width = "160px", l.textVerticalAlignment = 1, l.fontStyle = "bold", l.shadowColor = "black", l.shadowBlur = 2, r.addControl(l), r.onPointerDownObservable.add((function() {
          if (scene.sound.sClick.play(), a) scene.place.rod.setRod(`Rod${t}`), e.dispose();
          else {
            let n = new Y({
              image: s,
              name: `Rod${t}`,
              desc: o,
              price: i
            }, (() => {
              scene.place.rod.setRod(`Rod${t}`), e.dispose()
            }));
            e.addControl(n)
          }
        })), e.addControl(r)
      }
    }
  }
  class C extends L {
    constructor(e) {
      super(), super.title = assets.data.Gui.Lures.Title, super.isModal = !0;
      const t = this;
      let n = new P(assets.data.Gui.Lures.Button1Text);
      n.top = 166, n.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), t.dispose()
      })), t.addControl(n);
      let s = d.Get("Lure");
      for (let n = 1; n <= 10; n++) {
        let o = assets.images[`Lure${n}_pic`],
          i = assets.data.Lure[`Lure${n}`].Description,
          a = assets.data.Lure[`Lure${n}`].Price,
          r = !1;
        (s[n - 1] > 0 || 0 == a) && (r = !0);
        let l = BABYLON.GUI.Button.CreateImageOnlyButton(`Lure button ${n}`, o);
        l.image.stretch = 2, l.width = "90px", l.height = "125px", l.color = "transparent", l.left = n <= 5 ? 100 * n - 300 : 100 * n - 300 - 500, l.top = n <= 5 ? -100 : 50;
        let c = new BABYLON.GUI.TextBlock;
        c.text = r ? "" : a + "$", c.color = "#fffcd9", c.fontSize = 20, c.width = "110px", c.textVerticalAlignment = 1, c.fontStyle = "bold", c.shadowColor = "black", c.shadowBlur = 2, l.addControl(c), l.onPointerDownObservable.add((function() {
          if (scene.sound.sClick.play(), r) e.image.source = o, scene.place.rod.setLure(`Lure${n}`), t.dispose();
          else {
            let s = new Y({
              image: o,
              name: `Lure${n}`,
              desc: i,
              price: a
            }, (() => {
              scene.place.rod.setLure(`Lure${n}`), e.image.source = o, t.dispose()
            }));
            t.addControl(s)
          }
        })), t.addControl(l)
      }
    }
  }
  class k extends L {
    constructor() {
      super(), super.title = assets.data.Gui.Help.Title, super.isModal = !0;
      const e = this;
      let t = new BABYLON.GUI.TextBlock;
      t.text = assets.data.Gui.Help.Text, t.color = "#fcfbec", t.fontSize = 16, t.width = "495px", t.height = "290px", t.top = 5, t.left = 5, t.textHorizontalAlignment = 0, t.textVerticalAlignment = 0, t.textWrapping = !0, e.addControl(t);
      let n = new P(assets.data.Gui.Help.Button1Text);
      n.top = 166, n.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), e.dispose()
      })), e.addControl(n)
    }
  }
  class Y extends L {
    constructor(e, t) {
      super(), super.title = assets.data.Gui.Buy.Title, super.size = "medium", super.isModal = !0;
      const n = this;
      let s = new BABYLON.GUI.Image("objImaje", e.image);
      s.width = "90px", s.height = "90px", s.top = 0, s.left = -145, n.addControl(s);
      let o = new BABYLON.GUI.TextBlock;
      o.text = "  Description: " + e.desc + "\n  Price: " + e.price + "$", o.color = "#fcfbec", o.fontSize = 15, o.width = "280px", o.height = "125px", o.top = 0, o.left = 45, o.textHorizontalAlignment = 0, o.textVerticalAlignment = 2, o.textWrapping = !0, n.addControl(o);
      let i = new P(assets.data.Gui.Buy.Button1Text);
      i.top = 92, i.left = 102, i.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), d.Buy(e.name, e.price), t(), n.dispose()
      })), n.addControl(i), c.Cash < e.price && (i.alpha = .25, i.isEnabled = !1);
      let a = new P(assets.data.Gui.Buy.Button2Text);
      a.top = 92, a.left = -102, a.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), n.dispose()
      })), n.addControl(a)
    }
  }
  class S extends L {
    constructor(e) {
      super(), super.title = assets.data.Gui.SendScores.Title, super.size = "medium", super.isModal = !0;
      const t = this;
      let n = new BABYLON.GUI.TextBlock;
      n.text = assets.data.Gui.SendScores.Text, n.color = "#fcfbec", n.fontSize = 15, n.width = "280px", n.height = "25px", n.top = -35, n.left = 45, n.textHorizontalAlignment = 0, n.textVerticalAlignment = 2, n.textWrapping = !0, t.addControl(n);
      let s = new BABYLON.GUI.InputText("PlayerName");
      s.color = "#fcfbec", s.fontSize = 15, s.background = "#ffffff00", s.focusedBackground = "transparent", s.width = "280px", s.height = "30px", s.top = 0, s.left = 0, s.text = c.PlayerName, s.onFocusSelectAll = !0, t.addControl(s);
      let o = new P(assets.data.Gui.SendScores.Button1Text);
      o.top = 92, o.left = 102, o.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let n = s.text,
          o = c.Scores;
        "undefined" !== n && " " !== n && "" !== n && (c.PlayerName = n, l.sendScores(n, o)), t.dispose(), e()
      })), t.addControl(o);
      let i = new P(assets.data.Gui.SendScores.Button2Text);
      i.top = 92, i.left = -102, i.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), t.dispose()
      })), t.addControl(i)
    }
  }
  class _ extends BABYLON.GUI.Container {
    constructor() {
      super("WinDemo");
      let e = this;
      e.width = "100%", e.height = "100%";
      let t = new BABYLON.GUI.Rectangle("InfoLine");
      t.width = "100%", t.height = "100px", t.background = "rgba(0,0,0,0.5)", t.thickness = 0, t.alpha = 0, e.addControl(t);
      let n = new BABYLON.GUI.TextBlock;
      n.color = "#fffcd9", n.fontSize = 20, n.fontStyle = "bold", n.top = 10, n.shadowColor = "black", n.shadowBlur = 5, n.textHorizontalAlignment = 2, n.textVerticalAlignment = 0, n.text = scene.place.rod.currentFish.desk.name, t.addControl(n);
      let s = o(scene.place.rod.currentFish.desk.weight / 1e3, !1),
        i = scene.place.rod.currentFish.desk.cost,
        a = new BABYLON.GUI.TextBlock;
      a.color = "#fff", a.fontSize = 18, a.shadowColor = "black", a.shadowBlur = 3, a.textHorizontalAlignment = 2, a.textVerticalAlignment = 2, a.text = `weight ${s}                                               cash ${i}`, t.addControl(a);
      let r = new BABYLON.GUI.TextBlock;
      r.color = "#fff", r.fontSize = 16, r.top = -10, r.shadowColor = "black", r.shadowBlur = 3, r.textHorizontalAlignment = 2, r.textVerticalAlignment = 1, t.addControl(r), r.text = "click here to continue";
      let l = new BABYLON.Animation("myAnimation", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE),
        d = [];
      d.push({
        frame: 0,
        value: 0
      }), d.push({
        frame: 30,
        value: 1
      }), l.setKeys(d), t.animations = [], t.animations.push(l), t.onPointerDownObservable.add((function() {
        c.Cash = i, c.Scores = s, scene.place.rod.currentFish.destroy(), scene.place.addFish(), scene.sound.sClick.play(), e.dispose()
      })), scene.beginAnimation(t, 0, 30, !1)
    }
  }
  class T extends BABYLON.GUI.Container {
    buttonUp = BABYLON.GUI.Button.CreateImageOnlyButton("btn_up", assets.images.btn_up);
    buttonDown = BABYLON.GUI.Button.CreateImageOnlyButton("btn_dwn", assets.images.btn_dwn);
    alertVisual = new I;
    cashText = new BABYLON.GUI.TextBlock;
    constructor() {
      super("Hud");
      let e = this,
        t = new BABYLON.GUI.Image("hud_top", assets.images.hud_top);
      t.horizontalAlignment = 0, t.verticalAlignment = 0, t.width = "515px", t.height = "63px", t.left = 99, t.top = 0, e.addControl(t);
      let n = new BABYLON.GUI.Image("hud_dwn", assets.images.hud_dwn);
      n.horizontalAlignment = 0, n.verticalAlignment = 0, n.width = "62px", n.height = "305px", n.left = 0, n.top = 99, e.addControl(n);
      let s = new BABYLON.GUI.Image("hud_ctr", assets.images.hud_ctr);
      s.horizontalAlignment = 0, s.verticalAlignment = 0, s.width = "122px", s.height = "122px", s.left = 0, s.top = 0, e.addControl(s);
      let o = this.cashText;
      o.width = "125px", o.height = "40px", o.color = "#fffcd9", o.fontSize = 16, o.fontStyle = "bold", o.top = 11, o.left = 125, o.shadowColor = "black", o.shadowBlur = 5, o.textHorizontalAlignment = 0, o.text = "Cash " + c.Cash + "$", o.horizontalAlignment = 0, o.verticalAlignment = 0, e.addControl(o);
      let i = new v("icon_bug", 1);
      i.left = 1, i.top = 124, i.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new C(m);
        e.addControl(t)
      })), e.addControl(i);
      let a = new v("icon_bag", 1);
      a.left = 1, a.top = 187, a.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new N;
        e.addControl(t)
      })), e.addControl(a);
      let r = new v("icon_cup", 1);
      r.left = 1, r.top = 264, r.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new O;
        e.addControl(t)
      })), e.addControl(r);
      let l = new v("icon_snd", 1);
      l.left = 1, l.top = 327, l.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let e = scene.sound.mute;
        scene.sound.mute = !e
      })), e.addControl(l);
      let d = new v("icon_hlp", 0);
      d.left = 471, d.top = 3, d.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new k;
        e.addControl(t)
      })), e.addControl(d);
      let u = new v("icon_ext", 0);
      u.left = 536, u.top = 3, u.onPointerDownObservable.add((function() {
        scene.sound.sClick.play(), scene.destroyPlace(), scene.createSelector()
      })), e.addControl(u);
      let p = this.buttonUp;
      p.horizontalAlignment = 1, p.verticalAlignment = 0, p.color = "transparent", p.width = "150px", p.height = "150px", p.top = 10, p.left = -10, e.addControl(this.buttonUp);
      let h = this.buttonDown;
      h.horizontalAlignment = 1, h.verticalAlignment = 1, h.color = "transparent", h.width = "150px", h.height = "150px", h.top = -10, h.left = -10, e.addControl(h), this.alertVisual.top = 24, this.alertVisual.left = 24, e.addControl(this.alertVisual);
      let m = new M;
      m.top = 21, m.left = 21, m.onPointerDownObservable.add((function() {
        scene.sound.sClick.play();
        let t = new C(m);
        e.addControl(t)
      })), m.onPointerEnterObservable.add((() => {
        document.body.style.cursor = "pointer"
      })), m.onPointerOutObservable.add((() => {
        document.body.style.cursor = ""
      })), e.addControl(m)
    }
    set cashValue(e) {
      this.cashText.text = "Cash " + e + "$"
    }
    showFishDemo() {
      let e = new _;
      this.addControl(e)
    }
  }
  class I extends BABYLON.GUI.Container {
    #u = new BABYLON.GUI.Container("AlertContainer");
    constructor() {
      super("AlertVisual");
      let e = new BABYLON.GUI.Image("AlertVisualPic", assets.images.line_alert);
      e.width = "74px", e.height = "74px", e.horizontalAlignment = 0, e.verticalAlignment = 1, this.#u.width = e.width, this.#u.height = e.height, this.#u.addControl(e), this.#u.horizontalAlignment = 2, this.#u.verticalAlignment = 1, this.width = e.width, this.height = e.height, this.addControl(this.#u), this.horizontalAlignment = 0, this.verticalAlignment = 0
    }
    set percent(e) {
      let t = Math.round(e / 100 * 74);
      this.#u.height = t + "px"
    }
  }
  class M extends BABYLON.GUI.Button.CreateImageOnlyButton {
    constructor() {
      super("ButtonLure");
      let e = c.Lure + "_pic";
      const t = this;
      t.image.source = assets.images[e], t.width = "80px", t.height = "80px", t.color = "transparent", t.horizontalAlignment = 0, t.verticalAlignment = 0
    }
  }
  class P extends BABYLON.GUI.Button.CreateImageOnlyButton {
    constructor(e) {
      super(`Button ${e}`, "");
      const t = this;
      t.image.source = assets.images.btn_st1, t.width = "165px", t.height = "32px", t.color = "transparent";
      let n = new BABYLON.GUI.Image(`Button ${e}_overPic`);
      n.source = assets.images.btn_st2, n.isVisible = !1, t.addControl(n);
      let s = new BABYLON.GUI.TextBlock;
      s.text = e, s.color = "#fffcd9", s.fontSize = 20, s.width = "110px", s.fontStyle = "bold", s.shadowColor = "black", s.shadowBlur = 2, t.addControl(s), t.onPointerEnterObservable.add((function() {
        n.isVisible = !0
      })), t.onPointerOutObservable.add((function() {
        n.isVisible = !1
      }))
    }
  }
  class D extends BABYLON.GUI.Button.CreateImageOnlyButton {
    constructor(e) {
      super(`Button ${e}`, "");
      const t = this;
      t.image.source = assets.images.btnLarge_st1, t.width = "285px", t.height = "56px", t.color = "transparent";
      let n = new BABYLON.GUI.Image(`Button ${e}_overPic`);
      n.source = assets.images.btnLarge_st2, n.isVisible = !1, t.addControl(n);
      let s = new BABYLON.GUI.TextBlock;
      s.text = e, s.color = "#fffcd9", s.fontSize = 22, s.width = "250px", s.fontStyle = "bold", s.shadowColor = "black", s.shadowBlur = 2, t.addControl(s), t.onPointerEnterObservable.add((function() {
        n.isVisible = !0
      })), t.onPointerOutObservable.add((function() {
        n.isVisible = !1
      }))
    }
  }
  class v extends BABYLON.GUI.Button.CreateImageOnlyButton {
    constructor(e, t = 0) {
      super(`Button ${e}`, "");
      const n = this;
      let s = null,
        o = null;
      switch (t) {
        case 0:
        default:
          s = assets.images.btn_hud_hor_st1, o = assets.images.btn_hud_hor_st2, n.width = "63px", n.height = "40px";
          break;
        case 1:
          s = assets.images.btn_hud_ver_st1, o = assets.images.btn_hud_ver_st2, n.width = "40px", n.height = "63px"
      }
      n.image.source = s;
      let i = new BABYLON.GUI.Image(`Button ${e}_overPic`);
      i.source = o, i.isVisible = !1, n.addControl(i), n.onPointerEnterObservable.add((function() {
        i.isVisible = !0
      })), n.onPointerOutObservable.add((function() {
        i.isVisible = !1
      })), n.color = "transparent";
      let a = new BABYLON.GUI.Image("bIcon", assets.images[e]);
      a.width = "28px", a.height = "28px", n.addControl(a), n.horizontalAlignment = 0, n.verticalAlignment = 0
    }
  }
  let G = function() {
      let e = new BABYLON.TransformNode("hole"),
        t = s(1, 7),
        n = assets.meshes.getMeshByName(`IceHoleMat${t}Mesh`).material;
      n.needDepthPrePass = !0;
      let o = assets.meshes.getMeshByName("IceHole").clone("IceHole", null);
      o.receiveShadows = !0, o.material = n, o.parent = e;
      let i = assets.meshes.getMeshByName("Water").clone("Water", null),
        a = new BABYLON.WaterMaterial("water_material", scene, new BABYLON.Vector2(512, 512));
      a.bumpTexture = i.material.bumpTexture, a.windForce = 5, a.waveHeight = 0, a.bumpHeight = .025, a.windDirection = new BABYLON.Vector2(1, 1), a.waterColor = new BABYLON.Color3(0, 0, 0), a.colorBlendFactor = .75, a.backFaceCulling = !0, a.alpha = .75, a.addToRenderList(o), a.needDepthPrePass = !0, i.material = a, i.parent = e;
      let r = BABYLON.Mesh.CreateGround("WaterGround", 150, 150, 0, scene, !0),
        l = new BABYLON.StandardMaterial("myMaterial", scene);
      return l.diffuseColor = new BABYLON.Color3(0, 0, 0), l.specularColor = new BABYLON.Color3(0, 0, 0), r.material = l, r.position.y = -15, r.parent = e, e
    },
    V = document.getElementById("game_canvas"),
    z = new BABYLON.Engine(V, !0);

  function F({
    width: e = 0,
    height: t = 0
  }) {
    let n = Math.min(window.innerWidth / e, window.innerHeight / t);
    V.style.position = "absolute", V.style.width = (e * n).toString() + "px", V.style.height = (t * n).toString() + "px", V.style.top = (window.innerHeight / 2 - parseInt(V.style.height) / 2).toString() + "px", V.style.left = (window.innerWidth / 2 - parseInt(V.style.width) / 2).toString() + "px", z.resize()
  }
  globalThis.scene = new BABYLON.Scene(z), scene.gameReady = !1, scene.bottomLimit = -10, scene.sndVol = BABYLON.Engine.audioEngine.getGlobalVolume(), scene.pause = (e = !1) => {
      if (!scene.gameReady) return;
      let t = BABYLON.Engine.audioEngine;
      e ? (scene.sndVol = BABYLON.Engine.audioEngine.getGlobalVolume(), t.setGlobalVolume(0), z.stopRenderLoop()) : (t.setGlobalVolume(scene.sndVol), z.runRenderLoop((function() {
        scene.render()
      })))
    }, globalThis.assets = {
      canvas: V,
      engine: z,
      scene,
      data: "",
      meshes: [],
      aGroups: [],
      images: [],
      sounds: [],
      envTexture: BABYLON.CubeTexture
    },
    function() {
      let e = new Image;
      BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function() {
        if (this._loadingDiv) return;
        this._loadingDiv = document.createElement("div"), this._loadingDiv.id = "customLoadingScreenDiv", this._loadingDiv.style.transition = "opacity 1.0s ease";
        let t = document.createElement("style");
        t.type = "text/css", t.innerHTML = "\n        #customLoadingScreenDiv{\n            background-color: #ffffff;\n            color: black;\n            font-size:20px;\n            text-align:center;\n        }";
        let n = document.createElement("div");
        n.style.position = "absolute", n.style.top = "50%", n.style.left = "50%", n.style.transform = "translate(-50%, -50%)", this._loadingDiv.appendChild(n);
        let s = new Image;
        s.src = "./assets/preloader/preloaderSpr.png", n.appendChild(s);
        let o = e;
        return o.id = "preloaderBar", o.style.position = "absolute", o.style.top = "173px", o.style.left = "5px", o.style.width = "10px", o.style.height = "14px", o.src = "./assets/preloader/preloaderBar.png", n.appendChild(o), document.getElementsByTagName("head")[0].appendChild(t), this._resizeLoadingUI(), window.addEventListener("resize", this._resizeLoadingUI), document.body.appendChild(this._loadingDiv), this
      };
      let n = new BABYLON.AssetsManager(scene);
      n.addCubeTextureTask("env task", "./assets/environment.env").onSuccess = function(e) {
        assets.envTexture = e.texture
      };
      let s = [{
          name: "btn_up",
          path: "./assets/gui/btn_up.png"
        }, {
          name: "btn_dwn",
          path: "./assets/gui/btn_dwn.png"
        }, {
          name: "btn_st1",
          path: "./assets/gui/btn_st1.png"
        }, {
          name: "btn_st2",
          path: "./assets/gui/btn_st2.png"
        }, {
          name: "btnLarge_st1",
          path: "./assets/gui/btnLarge_st1.png"
        }, {
          name: "btnLarge_st2",
          path: "./assets/gui/btnLarge_st2.png"
        }, {
          name: "btn_fullScr",
          path: "./assets/gui/btn_fullScr.png"
        }, {
          name: "btn_hud_hor_st1",
          path: "./assets/gui/btn_hud_hor_st1.png"
        }, {
          name: "btn_hud_hor_st2",
          path: "./assets/gui/btn_hud_hor_st2.png"
        }, {
          name: "btn_hud_ver_st1",
          path: "./assets/gui/btn_hud_ver_st1.png"
        }, {
          name: "btn_hud_ver_st2",
          path: "./assets/gui/btn_hud_ver_st2.png"
        }, {
          name: "btn_hud_hor_sm_st1",
          path: "./assets/gui/btn_hud_hor_sm_st1.png"
        }, {
          name: "btn_hud_hor_sm_st2",
          path: "./assets/gui/btn_hud_hor_sm_st2.png"
        }, {
          name: "icon_bag",
          path: "./assets/gui/icon_bag.png"
        }, {
          name: "icon_bug",
          path: "./assets/gui/icon_bug.png"
        }, {
          name: "icon_cup",
          path: "./assets/gui/icon_cup.png"
        }, {
          name: "icon_snd",
          path: "./assets/gui/icon_snd.png"
        }, {
          name: "icon_hlp",
          path: "./assets/gui/icon_hlp.png"
        }, {
          name: "icon_ext",
          path: "./assets/gui/icon_ext.png"
        }, {
          name: "icon_ext_sm",
          path: "./assets/gui/icon_ext_sm.png"
        }, {
          name: "hud_ctr",
          path: "./assets/gui/hud_ctr.png"
        }, {
          name: "hud_top",
          path: "./assets/gui/hud_top.png"
        }, {
          name: "hud_dwn",
          path: "./assets/gui/hud_dwn.png"
        }, {
          name: "win1",
          path: "./assets/gui/win1.png"
        }, {
          name: "win2",
          path: "./assets/gui/win2.png"
        }, {
          name: "Lure1_pic",
          path: "./assets/gui/lure1_pic.png"
        }, {
          name: "Lure2_pic",
          path: "./assets/gui/lure2_pic.png"
        }, {
          name: "Lure3_pic",
          path: "./assets/gui/lure3_pic.png"
        }, {
          name: "Lure4_pic",
          path: "./assets/gui/lure4_pic.png"
        }, {
          name: "Lure5_pic",
          path: "./assets/gui/lure5_pic.png"
        }, {
          name: "Lure6_pic",
          path: "./assets/gui/lure6_pic.png"
        }, {
          name: "Lure7_pic",
          path: "./assets/gui/lure7_pic.png"
        }, {
          name: "Lure8_pic",
          path: "./assets/gui/lure8_pic.png"
        }, {
          name: "Lure9_pic",
          path: "./assets/gui/lure9_pic.png"
        }, {
          name: "Lure10_pic",
          path: "./assets/gui/lure10_pic.png"
        }, {
          name: "Rod1_pic",
          path: "./assets/gui/rod1_pic.png"
        }, {
          name: "Rod2_pic",
          path: "./assets/gui/rod2_pic.png"
        }, {
          name: "Rod3_pic",
          path: "./assets/gui/rod3_pic.png"
        }, {
          name: "line_alert",
          path: "./assets/gui/line_alert.png"
        }, {
          name: "text_name",
          path: "./assets/gui/text_name.png"
        }],
        o = [{
          name: "sCrow1",
          path: "./assets/sound/sCrow1.mp3"
        }, {
          name: "sCrow2",
          path: "./assets/sound/sCrow2.mp3"
        }, {
          name: "sDrilling",
          path: "./assets/sound/sDrilling.mp3"
        }, {
          name: "sDrip",
          path: "./assets/sound/sDrip.mp3"
        }, {
          name: "sFootstep",
          path: "./assets/sound/sFootstep.mp3"
        }, {
          name: "sTinkle",
          path: "./assets/sound/sTinkle.mp3"
        }, {
          name: "sWind",
          path: "./assets/sound/sWind.mp3"
        }, {
          name: "sClick",
          path: "./assets/sound/sClick.mp3"
        }, {
          name: "sFreel",
          path: "./assets/sound/sFreel.mp3"
        }];
      for (let e of s) n.addImageTask("task " + e.name, e.path).onSuccess = function(t) {
        assets.images[e.name] = t.url
      };
      for (let e of o) n.addBinaryFileTask("task " + e.name, e.path).onSuccess = function(t) {
        assets.sounds[e.name] = t.url
      };
      n.addMeshTask("mesh task", null, "./assets/", "assets.glb").onSuccess = function(e) {
        assets.meshes = e.loadedMeshes, assets.aGroups = e.loadedAnimationGroups, scene.removeMesh(assets.meshes[0], !0)
      }, n.addTextFileTask("data task", "./assets/gameData.json").onSuccess = function(e) {
        assets.data = JSON.parse(e.text)
      }, n.onProgress = function(t, n) {
        let s = ((100 - 100 * t / n) / 100 * 290).toFixed();
        e.style.width = s + "px"
      }, n.onFinish = function() {
        scene.sound = new u, z.runRenderLoop((function() {
          scene.render()
        })), scene.gameReady = !0, scene.createMainMenu()
      }, F(t), n.load()
    }(), scene.promoCount = 0, scene.createMainMenu = () => {
      0 === scene.promoCount && (r("GameDistribution"), scene.promoCount++), scene.mainMenu = new x
    }, scene.destroyMainMenu = () => {
      scene.mainMenu.dispose()
    }, scene.createSelector = () => {
      scene.selector = new R
    }, scene.destroySelector = () => {
      scene.selector.dispose()
    }, scene.createPlace = () => {
      r("GameDistribution"), scene.place = new U;
      for (let e = 0; e < 3; e++) scene.place.addFish()
    }, scene.destroyPlace = () => {
      scene.place.dispose()
    }, window.addEventListener("resize", (function() {
      F(t)
    }));
  class R extends BABYLON.TransformNode {
    constructor() {
      super("Selector");
      let e = this;
      const n = new BABYLON.TargetCamera("Camera", new BABYLON.Vector3(0, 530, 0), scene);
      n.setTarget(new BABYLON.Vector3.Zero), n.attachControl(V, !1), n.parent = e;
      let s = assets.meshes.getMeshByName("PicSelectMesh").material.albedoTexture,
        o = assets.meshes.getMeshByName("PicDepthMesh").material.albedoTexture;
      const r = new BABYLON.SpriteManager("sprMnrPlace", null, 1, {
        width: t.width,
        height: t.height
      }, scene);
      r.texture = s;
      let l = new BABYLON.Sprite("place", r);
      l.width = t.width, l.height = t.height, l.parent = e;
      const c = new BABYLON.TransformNode("player");
      c.parent = e;
      let d = assets.meshes.getMeshByName("PlayerSprMesh").material.albedoTexture,
        u = assets.data.PlayerSpr;
      const p = new BABYLON.SpritePackedManager("playerManager", null, 100, scene, u);
      p.texture = d, c.spr = new BABYLON.Sprite("playerSpr", p), c.spr.isPickable = !1, c.spr.width = 50, c.spr.height = 50, c.startAnimation = e => {
        if (e !== c.old_animation) {
          switch (e) {
            case "walk":
              c.spr.playAnimation(50, 50, !1, 50, (() => {
                c.spr.playAnimation(50, 79, !0, 50)
              })), scene.sound.sFootstep.play();
              break;
            case "drill":
              c.spr.playAnimation(0, 0, !1, 50, (() => {
                c.spr.playAnimation(0, 30, !1, 50, (() => {
                  scene.sound.sDrilling.play(), c.spr.playAnimation(30, 49, !1, 50, (() => {
                    c.spr.playAnimation(30, 49, !1, 50, (() => {
                      c.spr.playAnimation(30, 49, !1, 50, (() => {
                        L(), scene.sound.sDrilling.stop()
                      }))
                    }))
                  }))
                }))
              })), scene.sound.sFootstep.stop();
              break;
            case "wait":
              c.spr.playAnimation(0, 0, !1, 50, (() => {})), scene.sound.sFootstep.stop();
              break;
            default:
              c.spr.playAnimation(0, 0, !1, 50, (() => {}))
          }
          c.old_animation = e
        }
      }, c.startAnimation("wait");
      let h = assets.meshes.getMeshByName("PicFlagMesh").material.albedoTexture,
        m = assets.data.FlagSpr;
      const g = new BABYLON.SpritePackedManager("flagManager", null, 100, scene, m);
      g.texture = h, c.flag = new BABYLON.Sprite("playerSpr", g), c.flag.isPickable = !1, c.flag.width = 24, c.flag.height = 24, c.flag.playAnimation(0, 63, !0, 50);
      const B = BABYLON.MeshBuilder.CreateBox("rayBox", {
        Size: 1,
        width: t.width,
        depth: t.height
      }, scene);
      B.visibility = 0, B.parent = e;
      let f = new BABYLON.Vector3.Zero,
        w = null,
        A = null;

      function b() {
        let e = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), n),
          s = scene.pickWithRay(e);
        if (!s.hit) return;
        let r = s.pickedPoint,
          l = new BABYLON.Vector2(Math.round(800 - (f.x + t.width / 2)), Math.round(f.z + t.height / 2)),
          d = a(o, l);
        null !== w ? f = w : (f = new BABYLON.Vector3(r.x, 0, r.z), d.b > 0 && (c.flag.position = new BABYLON.Vector3(r.x - 5, 1, r.z - 5)));
        let u = c.position,
          p = BABYLON.Vector3.Distance(u, f),
          h = new BABYLON.Vector3(f.x - u.x, f.y - u.y, f.z - u.z);
        if (h.normalize(), p > 20 && d.b > 0) {
          c.translate(h, 1);
          let e = f.subtract(u),
            t = Math.atan2(e.z, e.x);
          c.spr.position = c.position, c.spr.angle = t + i(-90), c.startAnimation("walk")
        } else null !== w ? (c.startAnimation("drill"), c.flag.width -= 1, c.flag.height -= 1, c.flag.width <= 0 && c.flag.dispose()) : c.startAnimation("wait")
      }
      scene.registerBeforeRender(b), e.click = function() {
        let e = new BABYLON.Vector2(Math.round(800 - (f.x + t.width / 2)), Math.round(f.z + t.height / 2)),
          n = a(o, e);
        n.b > 0 && (w = f, A = n.b, x.bNext.isEnabled = !0, x.bNext.alpha = 1)
      };
      let x = new y(e.click);

      function L() {
        let e = -10 * A;
        scene.bottomLimit = e, scene.destroySelector(), scene.createPlace()
      }
      x.bBack.onPointerDownObservable.add((function() {
        scene.destroySelector(), scene.createMainMenu()
      })), x.bNext.onPointerDownObservable.add((function() {
        L()
      })), e.onDispose = () => {
        l.dispose(), c.spr.dispose(), c.flag.dispose(), x.dispose(), n.dispose(), scene.unregisterBeforeRender(b), scene.sound.sFootstep.stop(), scene.sound.sDrilling.stop()
      }
    }
  }
  class U extends BABYLON.TransformNode {
    constructor() {
      super("Place");
      let e = this;
      const t = new BABYLON.ArcRotateCamera("Camera", 1.5, .8, 6, BABYLON.Vector3.Zero(), scene);
      t.attachControl(V, !1), t.lowerRadiusLimit = 3, t.upperRadiusLimit = 7, t.upperBetaLimit = 1, t.lowerAlphaLimit = 1.25, t.upperAlphaLimit = 1.86, t.parent = e;
      const n = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-.25, -.5, 0), scene);
      n.intensity = .5, n.position = new BABYLON.Vector3(0, 25, 5), n.parent = e;
      const o = new BABYLON.ShadowGenerator(512, n);
      o.useBlurExponentialShadowMap = !0, o.blurKernel = 32, o.parent = e;
      const i = scene.createDefaultSkybox(assets.envTexture, !0, 1500);
      i.name = "SkyBox", i.material.cameraExposure = 1.1, i.material.alpha = .8, i.parent = e, e.hole = new G, e.hole.parent = e, e.rod = new p, e.rod.parent = e, o.addShadowCaster(e.rod, !0), e.addFish = () => {
        let t = Object.entries(assets.data.Fish),
          n = s(0, t.length - 1);
        new w(t[n][0]).parent = e
      };
      let a = new A;
      a.start();
      const r = new b;
      scene.sound.playGround = !0, e.onDispose = () => {
        a.stop(), r.dispose(), scene.sound.playGround = !1
      }
    }
  }
  console.log("Game started ...")
})();