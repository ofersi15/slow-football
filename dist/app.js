var Vm = Object.defineProperty;
var zm = (t, e, s) => e in t ? Vm(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var Q = (t, e, s) => zm(t, typeof e != "symbol" ? e + "" : e, s);
/**
* vue v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Sh, te, Dt, Wi, Hi, Oo, Jn, Eo, wl, _n, $n, js, Cl;
function Fe(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
let yt = {}, Zn = [], ie = () => {
}, qn = () => !1, En = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && (t.charCodeAt(2) > 122 || 97 > t.charCodeAt(2)), pr = (t) => t.startsWith("onUpdate:"), gt = Object.assign, bc = (t, e) => {
  let s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Gm = Object.prototype.hasOwnProperty, wt = (t, e) => Gm.call(t, e), st = Array.isArray, ot = (t) => typeof t == "function", ct = (t) => typeof t == "string", ge = (t) => typeof t == "symbol", St = (t) => t !== null && typeof t == "object", _c = (t) => (St(t) || ot(t)) && ot(t.then) && ot(t.catch), Wt = Object.prototype.toString, gr = (t) => ct(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, ws = Fe(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Um = Fe("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), mr = (t) => {
  let e = /* @__PURE__ */ Object.create(null);
  return (s) => e[s] || (e[s] = t(s));
}, qm = /-\w/g, Tt = mr((t) => t.replace(qm, (e) => e.slice(1).toUpperCase())), Ym = /\B([A-Z])/g, Me = mr((t) => t.replace(Ym, "-$1").toLowerCase()), Fn = mr((t) => t.charAt(0).toUpperCase() + t.slice(1)), Qn = mr((t) => t ? `on${Fn(t)}` : ""), ne = (t, e) => !Object.is(t, e), ti = (t, ...e) => {
  for (let s = 0; s < t.length; s++) t[s](...e);
}, gf = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, { configurable: !0, enumerable: !1, writable: n, value: s });
}, yr = (t) => {
  let e = parseFloat(t);
  return isNaN(e) ? t : e;
}, ei = (t) => {
  let e = ct(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
}, br = () => Sh || (Sh = "u" > typeof globalThis ? globalThis : "u" > typeof self ? self : "u" > typeof window ? window : "u" > typeof global ? global : {}), Km = Fe("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function ka(t) {
  if (st(t)) {
    let e = {};
    for (let s = 0; s < t.length; s++) {
      let n = t[s], i = ct(n) ? mf(n) : ka(n);
      if (i) for (let a in i) e[a] = i[a];
    }
    return e;
  }
  if (ct(t) || St(t)) return t;
}
let Xm = /;(?![^(]*\))/g, Jm = /:([^]+)/, Zm = /\/\*[^]*?\*\//g;
function mf(t) {
  let e = {};
  return t.replace(Zm, "").split(Xm).forEach((s) => {
    if (s) {
      let n = s.split(Jm);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Ma(t) {
  let e = "";
  if (ct(t)) e = t;
  else if (st(t)) for (let s = 0; s < t.length; s++) {
    let n = Ma(t[s]);
    n && (e += n + " ");
  }
  else if (St(t)) for (let s in t) t[s] && (e += s + " ");
  return e.trim();
}
function Qm(t) {
  if (!t) return null;
  let { class: e, style: s } = t;
  return e && !ct(e) && (t.class = Ma(e)), s && (t.style = ka(s)), t;
}
let ty = Fe("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), ey = Fe("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), sy = Fe("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"), ny = Fe("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), iy = Fe("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
function As(t, e) {
  let s, n;
  if (t === e) return !0;
  let i = (s = t, Wt.call(s) === "[object Date]"), a = (n = e, Wt.call(n) === "[object Date]");
  if (i || a) return !!i && !!a && t.getTime() === e.getTime();
  if (i = ge(t), a = ge(e), i || a) return t === e;
  if (i = st(t), a = st(e), i || a) return !!i && !!a && function(o, r) {
    if (o.length !== r.length) return !1;
    let l = !0;
    for (let c = 0; l && c < o.length; c++) l = As(o[c], r[c]);
    return l;
  }(t, e);
  if (i = St(t), a = St(e), i || a) {
    if (!i || !a || Object.keys(t).length !== Object.keys(e).length) return !1;
    for (let o in t) {
      let r = t.hasOwnProperty(o), l = e.hasOwnProperty(o);
      if (r && !l || !r && l || !As(t[o], e[o])) return !1;
    }
  }
  return String(t) === String(e);
}
function _r(t, e) {
  return t.findIndex((s) => As(s, e));
}
let yf = (t) => !!(t && t.__v_isRef === !0), bf = (t) => ct(t) ? t : t == null ? "" : st(t) || St(t) && (t.toString === Wt || !ot(t.toString)) ? yf(t) ? bf(t.value) : JSON.stringify(t, _f, 2) : String(t), _f = (t, e) => {
  let s;
  if (yf(e)) return _f(t, e.value);
  if (s = e, Wt.call(s) === "[object Map]") return { [`Map(${e.size})`]: [...e.entries()].reduce((n, [i, a], o) => (n[Vr(i, o) + " =>"] = a, n), {}) };
  {
    let n;
    if (n = e, Wt.call(n) === "[object Set]") return { [`Set(${e.size})`]: [...e.values()].map((i) => Vr(i)) };
    {
      if (ge(e)) return Vr(e);
      let i;
      if (St(e) && !st(e) && (i = e, Wt.call(i) !== "[object Object]")) return String(e);
    }
  }
  return e;
}, Vr = (t, e = "") => {
  var s;
  return ge(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t;
};
class xc {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = te, !e && te && (this.index = (te.scopes || (te.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      let e, s;
      if (this._isPaused = !0, this.scopes) for (e = 0, s = this.scopes.length; e < s; e++) this.scopes[e].pause();
      for (e = 0, s = this.effects.length; e < s; e++) this.effects[e].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      let e, s;
      if (this._isPaused = !1, this.scopes) for (e = 0, s = this.scopes.length; e < s; e++) this.scopes[e].resume();
      for (e = 0, s = this.effects.length; e < s; e++) this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      let s = te;
      try {
        return te = this, e();
      } finally {
        te = s;
      }
    }
  }
  on() {
    ++this._on == 1 && (this.prevScope = te, te = this);
  }
  off() {
    if (this._on > 0 && --this._on == 0) {
      if (te === this) te = this.prevScope;
      else {
        let e = te;
        for (; e; ) {
          if (e.prevScope === this) {
            e.prevScope = this.prevScope;
            break;
          }
          e = e.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(e) {
    if (this._active) {
      let s, n;
      for (s = 0, this._active = !1, n = this.effects.length; s < n; s++) this.effects[s].stop();
      for (s = 0, this.effects.length = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        let i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ay(t) {
  return new xc(t);
}
function xf() {
  return te;
}
function oy(t, e = !1) {
  te && te.cleanups.push(t);
}
let zr = /* @__PURE__ */ new WeakSet();
class na {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, te && te.active && te.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    64 & this.flags && (this.flags &= -65, zr.has(this) && (zr.delete(this), this.trigger()));
  }
  notify() {
    (!(2 & this.flags) || 32 & this.flags) && (8 & this.flags || vf(this));
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, wh(this), Sf(this);
    let e = Dt, s = Ge;
    Dt = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      wf(this), Dt = e, Ge = s, this.flags &= -3;
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let e = this.deps; e; e = e.nextDep) Sc(e);
      this.deps = this.depsTail = void 0, wh(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    64 & this.flags ? zr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    kl(this) && this.run();
  }
  get dirty() {
    return kl(this);
  }
}
let xr = 0;
function vf(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Hi, Hi = t;
    return;
  }
  t.next = Wi, Wi = t;
}
function vc() {
  let t;
  if (!(--xr > 0)) {
    if (Hi) {
      let e = Hi;
      for (Hi = void 0; e; ) {
        let s = e.next;
        e.next = void 0, e.flags &= -9, e = s;
      }
    }
    for (; Wi; ) {
      let e = Wi;
      for (Wi = void 0; e; ) {
        let s = e.next;
        if (e.next = void 0, e.flags &= -9, 1 & e.flags) try {
          e.trigger();
        } catch (n) {
          t || (t = n);
        }
        e = s;
      }
    }
    if (t) throw t;
  }
}
function Sf(t) {
  for (let e = t.deps; e; e = e.nextDep) e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function wf(t) {
  let e, s = t.depsTail, n = s;
  for (; n; ) {
    let i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), Sc(n), function(a) {
      let { prevDep: o, nextDep: r } = a;
      o && (o.nextDep = r, a.prevDep = void 0), r && (r.prevDep = o, a.nextDep = void 0);
    }(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  t.deps = e, t.depsTail = s;
}
function kl(t) {
  for (let e = t.deps; e; e = e.nextDep) if (e.dep.version !== e.version || e.dep.computed && (Cf(e.dep.computed) || e.dep.version !== e.version)) return !0;
  return !!t._dirty;
}
function Cf(t) {
  if (4 & t.flags && !(16 & t.flags) || (t.flags &= -17, t.globalVersion === ia) || (t.globalVersion = ia, !t.isSSR && 128 & t.flags && (!t.deps && !t._dirty || !kl(t)))) return;
  t.flags |= 2;
  let e = t.dep, s = Dt, n = Ge;
  Dt = t, Ge = !0;
  try {
    Sf(t);
    let i = t.fn(t._value);
    (e.version === 0 || ne(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Dt = s, Ge = n, wf(t), t.flags &= -3;
  }
}
function Sc(t, e = !1) {
  let { dep: s, prevSub: n, nextSub: i } = t;
  if (n && (n.nextSub = i, t.prevSub = void 0), i && (i.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let a = s.computed.deps; a; a = a.nextDep) Sc(a, !0);
  }
  e || --s.sc || !s.map || s.map.delete(s.key);
}
function ry(t, e) {
  t.effect instanceof na && (t = t.effect.fn);
  let s = new na(t);
  e && gt(s, e);
  try {
    s.run();
  } catch (i) {
    throw s.stop(), i;
  }
  let n = s.run.bind(s);
  return n.effect = s, n;
}
function ly(t) {
  t.effect.stop();
}
let Ge = !0, kf = [];
function Ps() {
  kf.push(Ge), Ge = !1;
}
function Ts() {
  let t = kf.pop();
  Ge = t === void 0 || t;
}
function wh(t) {
  let { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    let s = Dt;
    Dt = void 0;
    try {
      e();
    } finally {
      Dt = s;
    }
  }
}
let ia = 0;
class cy {
  constructor(e, s) {
    this.sub = e, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class vr {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Dt || !Ge || Dt === this.computed) return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Dt) s = this.activeLink = new cy(Dt, this), Dt.deps ? (s.prevDep = Dt.depsTail, Dt.depsTail.nextDep = s, Dt.depsTail = s) : Dt.deps = Dt.depsTail = s, function n(i) {
      if (i.dep.sc++, 4 & i.sub.flags) {
        let a = i.dep.computed;
        if (a && !i.dep.subs) {
          a.flags |= 20;
          for (let r = a.deps; r; r = r.nextDep) n(r);
        }
        let o = i.dep.subs;
        o !== i && (i.prevSub = o, o && (o.nextSub = i)), i.dep.subs = i;
      }
    }(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      let n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Dt.depsTail, s.nextDep = void 0, Dt.depsTail.nextDep = s, Dt.depsTail = s, Dt.deps === s && (Dt.deps = n);
    }
    return s;
  }
  trigger(e) {
    this.version++, ia++, this.notify(e);
  }
  notify(e) {
    xr++;
    try {
      for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
    } finally {
      vc();
    }
  }
}
let Fo = /* @__PURE__ */ new WeakMap(), xn = Symbol(""), Ml = Symbol(""), aa = Symbol("");
function ue(t, e, s) {
  if (Ge && Dt) {
    let n = Fo.get(t);
    n || Fo.set(t, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new vr()), i.map = n, i.key = s), i.track();
  }
}
function ys(t, e, s, n, i, a) {
  let o = Fo.get(t);
  if (!o) return void ia++;
  let r = (l) => {
    l && l.trigger();
  };
  if (xr++, e === "clear") o.forEach(r);
  else {
    let l = st(t), c = l && gr(s);
    if (l && s === "length") {
      let h = Number(n);
      o.forEach((u, d) => {
        (d === "length" || d === aa || !ge(d) && d >= h) && r(u);
      });
    } else switch ((s !== void 0 || o.has(void 0)) && r(o.get(s)), c && r(o.get(aa)), e) {
      case "add":
        if (l) c && r(o.get("length"));
        else {
          let u;
          r(o.get(xn)), u = t, Wt.call(u) === "[object Map]" && r(o.get(Ml));
        }
        break;
      case "delete":
        if (!l) {
          let u;
          r(o.get(xn)), u = t, Wt.call(u) === "[object Map]" && r(o.get(Ml));
        }
        break;
      case "set":
        let h;
        h = t, Wt.call(h) === "[object Map]" && r(o.get(xn));
    }
  }
  vc();
}
function jn(t) {
  let e = xt(t);
  return e === t ? e : (ue(e, "iterate", aa), Te(t) ? e : e.map(Ue));
}
function Sr(t) {
  return ue(t = xt(t), "iterate", aa), t;
}
function ns(t, e) {
  return os(t) ? Cs(t) ? si(Ue(e)) : si(e) : Ue(e);
}
let hy = { __proto__: null, [Symbol.iterator]() {
  return Gr(this, Symbol.iterator, (t) => ns(this, t));
}, concat(...t) {
  return jn(this).concat(...t.map((e) => st(e) ? jn(e) : e));
}, entries() {
  return Gr(this, "entries", (t) => (t[1] = ns(this, t[1]), t));
}, every(t, e) {
  return ls(this, "every", t, e, void 0, arguments);
}, filter(t, e) {
  return ls(this, "filter", t, e, (s) => s.map((n) => ns(this, n)), arguments);
}, find(t, e) {
  return ls(this, "find", t, e, (s) => ns(this, s), arguments);
}, findIndex(t, e) {
  return ls(this, "findIndex", t, e, void 0, arguments);
}, findLast(t, e) {
  return ls(this, "findLast", t, e, (s) => ns(this, s), arguments);
}, findLastIndex(t, e) {
  return ls(this, "findLastIndex", t, e, void 0, arguments);
}, forEach(t, e) {
  return ls(this, "forEach", t, e, void 0, arguments);
}, includes(...t) {
  return Ur(this, "includes", t);
}, indexOf(...t) {
  return Ur(this, "indexOf", t);
}, join(t) {
  return jn(this).join(t);
}, lastIndexOf(...t) {
  return Ur(this, "lastIndexOf", t);
}, map(t, e) {
  return ls(this, "map", t, e, void 0, arguments);
}, pop() {
  return xi(this, "pop");
}, push(...t) {
  return xi(this, "push", t);
}, reduce(t, ...e) {
  return Ch(this, "reduce", t, e);
}, reduceRight(t, ...e) {
  return Ch(this, "reduceRight", t, e);
}, shift() {
  return xi(this, "shift");
}, some(t, e) {
  return ls(this, "some", t, e, void 0, arguments);
}, splice(...t) {
  return xi(this, "splice", t);
}, toReversed() {
  return jn(this).toReversed();
}, toSorted(t) {
  return jn(this).toSorted(t);
}, toSpliced(...t) {
  return jn(this).toSpliced(...t);
}, unshift(...t) {
  return xi(this, "unshift", t);
}, values() {
  return Gr(this, "values", (t) => ns(this, t));
} };
function Gr(t, e, s) {
  let n = Sr(t), i = n[e]();
  return n === t || Te(t) || (i._next = i.next, i.next = () => {
    let a = i._next();
    return a.done || (a.value = s(a.value)), a;
  }), i;
}
let uy = Array.prototype;
function ls(t, e, s, n, i, a) {
  let o = Sr(t), r = o !== t && !Te(t), l = o[e];
  if (l !== uy[e]) {
    let u = l.apply(t, a);
    return r ? Ue(u) : u;
  }
  let c = s;
  o !== t && (r ? c = function(u, d) {
    return s.call(this, ns(t, u), d, t);
  } : s.length > 2 && (c = function(u, d) {
    return s.call(this, u, d, t);
  }));
  let h = l.call(o, c, n);
  return r && i ? i(h) : h;
}
function Ch(t, e, s, n) {
  let i = Sr(t), a = i !== t && !Te(t), o = s, r = !1;
  i !== t && (a ? (r = n.length === 0, o = function(c, h, u) {
    return r && (r = !1, c = ns(t, c)), s.call(this, c, ns(t, h), u, t);
  }) : s.length > 3 && (o = function(c, h, u) {
    return s.call(this, c, h, u, t);
  }));
  let l = i[e](o, ...n);
  return r ? ns(t, l) : l;
}
function Ur(t, e, s) {
  let n = xt(t);
  ue(n, "iterate", aa);
  let i = n[e](...s);
  return (i === -1 || i === !1) && Aa(s[0]) ? (s[0] = xt(s[0]), n[e](...s)) : i;
}
function xi(t, e, s = []) {
  Ps(), xr++;
  let n = xt(t)[e].apply(t, s);
  return vc(), Ts(), n;
}
let dy = Fe("__proto__,__v_isRef,__isVue"), Mf = new Set(Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ge));
function fy(t) {
  ge(t) || (t = String(t));
  let e = xt(this);
  return ue(e, "has", t), e.hasOwnProperty(t);
}
class Af {
  constructor(e = !1, s = !1) {
    this._isReadonly = e, this._isShallow = s;
  }
  get(e, s, n) {
    if (s === "__v_skip") return e.__v_skip;
    let i = this._isReadonly, a = this._isShallow;
    if (s === "__v_isReactive") return !i;
    if (s === "__v_isReadonly") return i;
    if (s === "__v_isShallow") return a;
    if (s === "__v_raw") return n === (i ? a ? Of : Lf : a ? Rf : Df).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    let o = st(e);
    if (!i) {
      let l;
      if (o && (l = hy[s])) return l;
      if (s === "hasOwnProperty") return fy;
    }
    let r = Reflect.get(e, s, Xt(e) ? e : n);
    if ((ge(s) ? Mf.has(s) : dy(s)) || (i || ue(e, "get", s), a)) return r;
    if (Xt(r)) {
      let l = o && gr(s) ? r : r.value;
      return i && St(l) ? Io(l) : l;
    }
    return St(r) ? i ? Io(r) : Cr(r) : r;
  }
}
class Pf extends Af {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, i) {
    let a = e[s], o = st(e) && gr(s);
    if (!this._isShallow) {
      let c = os(a);
      if (Te(n) || os(n) || (a = xt(a), n = xt(n)), !o && Xt(a) && !Xt(n)) return c || (a.value = n), !0;
    }
    let r = o ? Number(s) < e.length : wt(e, s), l = Reflect.set(e, s, n, Xt(e) ? e : i);
    return e === xt(i) && (r ? ne(n, a) && ys(e, "set", s, n) : ys(e, "add", s, n)), l;
  }
  deleteProperty(e, s) {
    let n = wt(e, s);
    e[s];
    let i = Reflect.deleteProperty(e, s);
    return i && n && ys(e, "delete", s, void 0), i;
  }
  has(e, s) {
    let n = Reflect.has(e, s);
    return ge(s) && Mf.has(s) || ue(e, "has", s), n;
  }
  ownKeys(e) {
    return ue(e, "iterate", st(e) ? "length" : xn), Reflect.ownKeys(e);
  }
}
class Tf extends Af {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, s) {
    return !0;
  }
  deleteProperty(e, s) {
    return !0;
  }
}
let py = new Pf(), gy = new Tf(), my = new Pf(!0), yy = new Tf(!0), qr = (t) => t;
function $a(t) {
  return function() {
    return t !== "delete" && (t === "clear" ? void 0 : this);
  };
}
function wr(t, e) {
  let s, n = (gt(s = { get(i) {
    let a = this.__v_raw, o = xt(a), r = xt(i);
    t || (ne(i, r) && ue(o, "get", i), ue(o, "get", r));
    let { has: l } = Reflect.getPrototypeOf(o), c = e ? qr : t ? si : Ue;
    return l.call(o, i) ? c(a.get(i)) : l.call(o, r) ? c(a.get(r)) : void (a !== o && a.get(i));
  }, get size() {
    let i = this.__v_raw;
    return t || ue(xt(i), "iterate", xn), i.size;
  }, has(i) {
    let a = this.__v_raw, o = xt(a), r = xt(i);
    return t || (ne(i, r) && ue(o, "has", i), ue(o, "has", r)), i === r ? a.has(i) : a.has(i) || a.has(r);
  }, forEach(i, a) {
    let o = this, r = o.__v_raw, l = xt(r), c = e ? qr : t ? si : Ue;
    return t || ue(l, "iterate", xn), r.forEach((h, u) => i.call(a, c(h), c(u), o));
  } }, t ? { add: $a("add"), set: $a("set"), delete: $a("delete"), clear: $a("clear") } : { add(i) {
    let a = xt(this), o = Reflect.getPrototypeOf(a), r = xt(i), l = e || Te(i) || os(i) ? i : r;
    return o.has.call(a, l) || ne(i, l) && o.has.call(a, i) || ne(r, l) && o.has.call(a, r) || (a.add(l), ys(a, "add", l, l)), this;
  }, set(i, a) {
    e || Te(a) || os(a) || (a = xt(a));
    let o = xt(this), { has: r, get: l } = Reflect.getPrototypeOf(o), c = r.call(o, i);
    c || (i = xt(i), c = r.call(o, i));
    let h = l.call(o, i);
    return o.set(i, a), c ? ne(a, h) && ys(o, "set", i, a) : ys(o, "add", i, a), this;
  }, delete(i) {
    let a = xt(this), { has: o, get: r } = Reflect.getPrototypeOf(a), l = o.call(a, i);
    l || (i = xt(i), l = o.call(a, i)), r && r.call(a, i);
    let c = a.delete(i);
    return l && ys(a, "delete", i, void 0), c;
  }, clear() {
    let i = xt(this), a = i.size !== 0, o = i.clear();
    return a && ys(i, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    s[i] = function(...a) {
      let o, r = this.__v_raw, l = xt(r), c = (o = l, Wt.call(o) === "[object Map]"), h = i === "entries" || i === Symbol.iterator && c, u = r[i](...a), d = e ? qr : t ? si : Ue;
      return t || ue(l, "iterate", i === "keys" && c ? Ml : xn), gt(Object.create(u), { next() {
        let { value: p, done: f } = u.next();
        return f ? { value: p, done: f } : { value: h ? [d(p[0]), d(p[1])] : d(p), done: f };
      } });
    };
  }), s);
  return (i, a, o) => a === "__v_isReactive" ? !t : a === "__v_isReadonly" ? t : a === "__v_raw" ? i : Reflect.get(wt(n, a) && a in i ? n : i, a, o);
}
let by = { get: wr(!1, !1) }, _y = { get: wr(!1, !0) }, xy = { get: wr(!0, !1) }, vy = { get: wr(!0, !0) }, Df = /* @__PURE__ */ new WeakMap(), Rf = /* @__PURE__ */ new WeakMap(), Lf = /* @__PURE__ */ new WeakMap(), Of = /* @__PURE__ */ new WeakMap();
function Cr(t) {
  return os(t) ? t : kr(t, !1, py, by, Df);
}
function Ef(t) {
  return kr(t, !1, my, _y, Rf);
}
function Io(t) {
  return kr(t, !0, gy, xy, Lf);
}
function Sy(t) {
  return kr(t, !0, yy, vy, Of);
}
function kr(t, e, s, n, i) {
  var a;
  let o;
  if (!St(t) || t.__v_raw && !(e && t.__v_isReactive)) return t;
  let r = (a = t).__v_skip || !Object.isExtensible(a) ? 0 : function(h) {
    switch (h) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }((o = a, Wt.call(o)).slice(8, -1));
  if (r === 0) return t;
  let l = i.get(t);
  if (l) return l;
  let c = new Proxy(t, r === 2 ? n : s);
  return i.set(t, c), c;
}
function Cs(t) {
  return os(t) ? Cs(t.__v_raw) : !!(t && t.__v_isReactive);
}
function os(t) {
  return !!(t && t.__v_isReadonly);
}
function Te(t) {
  return !!(t && t.__v_isShallow);
}
function Aa(t) {
  return !!t && !!t.__v_raw;
}
function xt(t) {
  let e = t && t.__v_raw;
  return e ? xt(e) : t;
}
function Ff(t) {
  return !wt(t, "__v_skip") && Object.isExtensible(t) && gf(t, "__v_skip", !0), t;
}
let Ue = (t) => St(t) ? Cr(t) : t, si = (t) => St(t) ? Io(t) : t;
function Xt(t) {
  return !!t && t.__v_isRef === !0;
}
function Vi(t) {
  return Nf(t, !1);
}
function If(t) {
  return Nf(t, !0);
}
function Nf(t, e) {
  return Xt(t) ? t : new wy(t, e);
}
class wy {
  constructor(e, s) {
    this.dep = new vr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : xt(e), this._value = s ? e : Ue(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    let s = this._rawValue, n = this.__v_isShallow || Te(e) || os(e);
    ne(e = n ? e : xt(e), s) && (this._rawValue = e, this._value = n ? e : Ue(e), this.dep.trigger());
  }
}
function Cy(t) {
  t.dep && t.dep.trigger();
}
function Pa(t) {
  return Xt(t) ? t.value : t;
}
function ky(t) {
  return ot(t) ? t() : Pa(t);
}
let My = { get: (t, e, s) => e === "__v_raw" ? t : Pa(Reflect.get(t, e, s)), set: (t, e, s, n) => {
  let i = t[e];
  return Xt(i) && !Xt(s) ? (i.value = s, !0) : Reflect.set(t, e, s, n);
} };
function wc(t) {
  return Cs(t) ? t : new Proxy(t, My);
}
class Ay {
  constructor(e) {
    this.__v_isRef = !0, this._value = void 0;
    let s = this.dep = new vr(), { get: n, set: i } = e(s.track.bind(s), s.trigger.bind(s));
    this._get = n, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e) {
    this._set(e);
  }
}
function Bf(t) {
  return new Ay(t);
}
function Py(t) {
  let e = st(t) ? Array(t.length) : {};
  for (let s in t) e[s] = new $f(t, s, void 0);
  return e;
}
class $f {
  constructor(e, s, n) {
    this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = ge(s) ? s : String(s), this._raw = xt(e);
    let i = !0, a = e;
    if (!st(e) || ge(this._key) || !gr(this._key)) do
      i = !Aa(a) || Te(a);
    while (i && (a = a.__v_raw));
    this._shallow = i;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = Pa(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && Xt(this._raw[this._key])) {
      let s = this._object[this._key];
      if (Xt(s)) {
        s.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    var e, s;
    let n;
    return e = this._raw, s = this._key, (n = Fo.get(e)) && n.get(s);
  }
}
class Ty {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Dy(t, e, s) {
  return Xt(t) ? t : ot(t) ? new Ty(t) : !St(t) || !(arguments.length > 1) ? Vi(t) : new $f(t, e, s);
}
class Ry {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new vr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ia - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && Dt !== this) return vf(this, !0), !0;
  }
  get value() {
    let e = this.dep.track();
    return Cf(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
let Ly = { GET: "get", HAS: "has", ITERATE: "iterate" }, Oy = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" }, ja = {}, No = /* @__PURE__ */ new WeakMap();
function Ey() {
  return js;
}
function jf(t, e = !1, s = js) {
  if (s) {
    let n = No.get(s);
    n || No.set(s, n = []), n.push(t);
  }
}
function bs(t, e = 1 / 0, s) {
  if (e <= 0 || !St(t) || t.__v_skip || ((s = s || /* @__PURE__ */ new Map()).get(t) || 0) >= e) return t;
  if (s.set(t, e), e--, Xt(t)) bs(t.value, e, s);
  else if (st(t)) for (let n = 0; n < t.length; n++) bs(t[n], e, s);
  else {
    let n, i;
    if (n = t, Wt.call(n) === "[object Set]" || (i = t, Wt.call(i) === "[object Map]")) t.forEach((a) => {
      bs(a, e, s);
    });
    else {
      let a;
      if (a = t, Wt.call(a) === "[object Object]") {
        for (let o in t) bs(t[o], e, s);
        for (let o of Object.getOwnPropertySymbols(t)) Object.prototype.propertyIsEnumerable.call(t, o) && bs(t[o], e, s);
      }
    }
  }
  return t;
}
function Fy(t, e) {
}
let Iy = { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" };
function yi(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (i) {
    In(i, e, s);
  }
}
function He(t, e, s, n) {
  if (ot(t)) {
    let i = yi(t, e, s, n);
    return i && _c(i) && i.catch((a) => {
      In(a, e, s);
    }), i;
  }
  if (st(t)) {
    let i = [];
    for (let a = 0; a < t.length; a++) i.push(He(t[a], e, s, n));
    return i;
  }
}
function In(t, e, s, n = !0) {
  e && e.vnode;
  let { errorHandler: i, throwUnhandledErrorInProduction: a } = e && e.appContext.config || yt;
  if (e) {
    let o = e.parent, r = e.proxy, l = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; o; ) {
      let c = o.ec;
      if (c) {
        for (let h = 0; h < c.length; h++) if (c[h](t, r, l) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      Ps(), yi(i, null, 10, [t, r, l]), Ts();
      return;
    }
  }
  (function(o, r = !0, l = !1) {
    if (l) throw o;
    console.error(o);
  })(t, n, a);
}
let xe = [], Qe = -1, ni = [], Ws = null, Un = 0, Wf = Promise.resolve(), _o = null;
function ri(t) {
  let e = _o || Wf;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Cc(t) {
  if (!(1 & t.flags)) {
    let e = zi(t), s = xe[xe.length - 1];
    !s || !(2 & t.flags) && e >= zi(s) ? xe.push(t) : xe.splice(function(n) {
      let i = Qe + 1, a = xe.length;
      for (; i < a; ) {
        let o = i + a >>> 1, r = xe[o], l = zi(r);
        l < n || l === n && 2 & r.flags ? i = o + 1 : a = o;
      }
      return i;
    }(e), 0, t), t.flags |= 1, Hf();
  }
}
function Hf() {
  _o || (_o = Wf.then(function t(e) {
    try {
      for (Qe = 0; Qe < xe.length; Qe++) {
        let s = xe[Qe];
        s && !(8 & s.flags) && (4 & s.flags && (s.flags &= -2), yi(s, s.i, s.i ? 15 : 14), 4 & s.flags || (s.flags &= -2));
      }
    } finally {
      for (; Qe < xe.length; Qe++) {
        let s = xe[Qe];
        s && (s.flags &= -2);
      }
      Qe = -1, xe.length = 0, Bo(), _o = null, (xe.length || ni.length) && t();
    }
  }));
}
function oa(t) {
  st(t) ? ni.push(...t) : Ws && t.id === -1 ? Ws.splice(Un + 1, 0, t) : 1 & t.flags || (ni.push(t), t.flags |= 1), Hf();
}
function kh(t, e, s = Qe + 1) {
  for (; s < xe.length; s++) {
    let n = xe[s];
    if (n && 2 & n.flags) {
      if (t && n.id !== t.uid) continue;
      xe.splice(s, 1), s--, 4 & n.flags && (n.flags &= -2), n(), 4 & n.flags || (n.flags &= -2);
    }
  }
}
function Bo(t) {
  if (ni.length) {
    let e = [...new Set(ni)].sort((s, n) => zi(s) - zi(n));
    if (ni.length = 0, Ws) return void Ws.push(...e);
    for (Un = 0, Ws = e; Un < Ws.length; Un++) {
      let s = Ws[Un];
      4 & s.flags && (s.flags &= -2), 8 & s.flags || s(), s.flags &= -2;
    }
    Ws = null, Un = 0;
  }
}
let zi = (t) => t.id == null ? 2 & t.flags ? -1 : 1 / 0 : t.id, oe = null, Mr = null;
function ra(t) {
  let e = oe;
  return oe = t, Mr = t && t.type.__scopeId || null, e;
}
function Ny(t) {
  Mr = t;
}
function By() {
  Mr = null;
}
let $y = (t) => kc;
function kc(t, e = oe, s) {
  if (!e || t._n) return t;
  let n = (...i) => {
    let a;
    n._d && ha(-1);
    let o = ra(e);
    try {
      a = t(...i);
    } finally {
      ra(o), n._d && ha(1);
    }
    return a;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function jy(t, e) {
  if (oe === null) return t;
  let s = La(oe), n = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [a, o, r, l = yt] = e[i];
    a && (ot(a) && (a = { mounted: a, updated: a }), a.deep && bs(o), n.push({ dir: a, instance: s, value: o, oldValue: void 0, arg: r, modifiers: l }));
  }
  return t;
}
function es(t, e, s, n) {
  let i = t.dirs, a = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    let r = i[o];
    a && (r.oldValue = a[o].value);
    let l = r.dir[n];
    l && (Ps(), He(l, s, 8, [t.el, r, t, e]), Ts());
  }
}
function Vf(t, e) {
  if (ae) {
    let s = ae.provides, n = ae.parent && ae.parent.provides;
    n === s && (s = ae.provides = Object.create(n)), s[t] = e;
  }
}
function Gi(t, e, s = !1) {
  let n = ve();
  if (n || vn) {
    let i = vn ? vn._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return s && ot(e) ? e.call(n && n.proxy) : e;
  }
}
function Wy() {
  return !!(ve() || vn);
}
let zf = Symbol.for("v-scx"), Gf = () => Gi(zf);
function Hy(t, e) {
  return Ta(t, null, e);
}
function Vy(t, e) {
  return Ta(t, null, { flush: "post" });
}
function Uf(t, e) {
  return Ta(t, null, { flush: "sync" });
}
function ii(t, e, s) {
  return Ta(t, e, s);
}
function Ta(t, e, s = yt) {
  let n, { immediate: i, flush: a } = s, o = gt({}, s), r = e && i || !e && a !== "post";
  if (Pn) {
    if (a === "sync") {
      let u = Gf();
      n = u.__watcherHandles || (u.__watcherHandles = []);
    } else if (!r) {
      let u = () => {
      };
      return u.stop = ie, u.resume = ie, u.pause = ie, u;
    }
  }
  let l = ae;
  o.call = (u, d, p) => He(u, l, d, p);
  let c = !1;
  a === "post" ? o.scheduler = (u) => {
    Yt(u, l && l.suspense);
  } : a !== "sync" && (c = !0, o.scheduler = (u, d) => {
    d ? u() : Cc(u);
  }), o.augmentJob = (u) => {
    e && (u.flags |= 4), c && (u.flags |= 2, l && (u.id = l.uid, u.i = l));
  };
  let h = function(u, d, p = yt) {
    let f, g, m, _, { immediate: y, deep: b, once: x, scheduler: v, augmentJob: k, call: S } = p, C = (P) => b ? P : Te(P) || b === !1 || b === 0 ? bs(P, 1) : bs(P), D = !1, O = !1;
    if (Xt(u) ? (g = () => u.value, D = Te(u)) : Cs(u) ? (g = () => C(u), D = !0) : st(u) ? (O = !0, D = u.some((P) => Cs(P) || Te(P)), g = () => u.map((P) => Xt(P) ? P.value : Cs(P) ? C(P) : ot(P) ? S ? S(P, 2) : P() : void 0)) : g = ot(u) ? d ? S ? () => S(u, 2) : u : () => {
      if (m) {
        Ps();
        try {
          m();
        } finally {
          Ts();
        }
      }
      let P = js;
      js = f;
      try {
        return S ? S(u, 3, [_]) : u(_);
      } finally {
        js = P;
      }
    } : ie, d && b) {
      let P = g, M = b === !0 ? 1 / 0 : b;
      g = () => bs(P(), M);
    }
    let I = xf(), w = () => {
      f.stop(), I && I.active && bc(I.effects, f);
    };
    if (x && d) {
      let P = d;
      d = (...M) => {
        P(...M), w();
      };
    }
    let E = O ? Array(u.length).fill(ja) : ja, L = (P) => {
      if (1 & f.flags && (f.dirty || P)) if (d) {
        let M = f.run();
        if (b || D || (O ? M.some((T, F) => ne(T, E[F])) : ne(M, E))) {
          m && m();
          let T = js;
          js = f;
          try {
            let F = [M, E === ja ? void 0 : O && E[0] === ja ? [] : E, _];
            E = M, S ? S(d, 3, F) : d(...F);
          } finally {
            js = T;
          }
        }
      } else f.run();
    };
    return k && k(L), (f = new na(g)).scheduler = v ? () => v(L, !1) : L, _ = (P) => jf(P, !1, f), m = f.onStop = () => {
      let P = No.get(f);
      if (P) {
        if (S) S(P, 4);
        else for (let M of P) M();
        No.delete(f);
      }
    }, d ? y ? L(!0) : E = f.run() : v ? v(L.bind(null, !0), !0) : f.run(), w.pause = f.pause.bind(f), w.resume = f.resume.bind(f), w.stop = w, w;
  }(t, e, o);
  return Pn && (n ? n.push(h) : r && h()), h;
}
function zy(t, e, s) {
  let n, i = this.proxy, a = ct(t) ? t.includes(".") ? qf(i, t) : () => i[t] : t.bind(i, i);
  ot(e) ? n = e : (n = e.handler, s = e);
  let o = bi(this), r = Ta(a, n.bind(i), s);
  return o(), r;
}
function qf(t, e) {
  let s = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < s.length && n; i++) n = n[s[i]];
    return n;
  };
}
let Bs = /* @__PURE__ */ new WeakMap(), Yf = Symbol("_vte"), un = (t) => t && (t.disabled || t.disabled === ""), Mh = (t) => "u" > typeof SVGElement && t instanceof SVGElement, Ah = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement, Yr = (t, e) => {
  let s = t && t.to;
  return ct(s) ? e ? e(s) : null : s;
};
function Wa(t, e, s, { o: { insert: n }, m: i }, a = 2) {
  a === 0 && n(t.targetAnchor, e, s);
  let { el: o, anchor: r, shapeFlag: l, children: c, props: h } = t, u = a === 2;
  if (u && n(o, e, s), !Bs.has(t) && (!u || un(h)) && 16 & l) for (let d = 0; d < c.length; d++) i(c[d], e, s, 2);
  u && n(r, e, s);
}
let Gy = { name: "Teleport", __isTeleport: !0, process(t, e, s, n, i, a, o, r, l, c) {
  let { mc: h, pc: u, pbc: d, o: { insert: p, querySelector: f, createText: g, parentNode: m } } = c, _ = un(e.props), { dynamicChildren: y } = e, b = (k, S, C) => {
    16 & k.shapeFlag && h(k.children, S, C, i, a, o, r, l);
  }, x = (k = e) => {
    let S = un(k.props), C = k.target = Yr(k.props, f), D = Kr(C, k, g, p);
    C && (o !== "svg" && Mh(C) ? o = "svg" : o !== "mathml" && Ah(C) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(C), S || (b(k, C, D), vi(k, !1)));
  }, v = (k) => {
    let S = () => {
      if (Bs.get(k) === S) {
        if (Bs.delete(k), un(k.props)) {
          let C = m(k.el) || s;
          b(k, C, k.anchor), vi(k, !0);
        }
        x(k);
      }
    };
    Bs.set(k, S), Yt(S, a);
  };
  if (t == null) {
    let k, S = e.el = g(""), C = e.anchor = g("");
    if (p(S, s, n), p(C, s, n), (k = e.props) && (k.defer || k.defer === "") || a && a.pendingBranch) return void v(e);
    _ && (b(e, s, C), vi(e, !0)), x();
  } else {
    e.el = t.el;
    let k = e.anchor = t.anchor, S = Bs.get(t);
    if (S) {
      S.flags |= 8, Bs.delete(t), v(e);
      return;
    }
    e.targetStart = t.targetStart;
    let C = e.target = t.target, D = e.targetAnchor = t.targetAnchor, O = un(t.props), I = O ? s : C, w = O ? k : D;
    if (o === "svg" || Mh(C) ? o = "svg" : (o === "mathml" || Ah(C)) && (o = "mathml"), y ? (d(t.dynamicChildren, y, I, i, a, o, r), Nc(t, e, !0)) : l || u(t, e, I, w, i, a, o, r, !1), _) O ? e.props && t.props && e.props.to !== t.props.to && (e.props.to = t.props.to) : Wa(e, s, k, c, 1);
    else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
      let E = e.target = Yr(e.props, f);
      E && Wa(e, E, null, c, 0);
    } else O && Wa(e, C, D, c, 1);
    vi(e, _);
  }
}, remove(t, e, s, { um: n, o: { remove: i } }, a) {
  let { shapeFlag: o, children: r, anchor: l, targetStart: c, targetAnchor: h, target: u, props: d } = t, p = a || !un(d), f = Bs.get(t);
  if (f && (f.flags |= 8, Bs.delete(t), p = !1), u && (i(c), i(h)), a && i(l), 16 & o) for (let g = 0; g < r.length; g++) {
    let m = r[g];
    n(m, e, s, p, !!m.dynamicChildren);
  }
}, move: Wa, hydrate: function(t, e, s, n, i, a, { o: { nextSibling: o, parentNode: r, querySelector: l, insert: c, createText: h } }, u) {
  function d(m, _) {
    let y = _;
    for (; y; ) {
      if (y && y.nodeType === 8) {
        if (y.data === "teleport start anchor") e.targetStart = y;
        else if (y.data === "teleport anchor") {
          e.targetAnchor = y, m._lpa = e.targetAnchor && o(e.targetAnchor);
          break;
        }
      }
      y = o(y);
    }
  }
  function p(m, _) {
    _.anchor = u(o(m), _, r(m), s, n, i, a);
  }
  let f = e.target = Yr(e.props, l), g = un(e.props);
  if (f) {
    let m = f._lpa || f.firstChild;
    16 & e.shapeFlag && (g ? (p(t, e), d(f, m), e.targetAnchor || Kr(f, e, h, c, r(t) === f ? t : null)) : (e.anchor = o(t), d(f, m), e.targetAnchor || Kr(f, e, h, c), u(m && o(m), e, f, s, n, i, a))), vi(e, g);
  } else g && 16 & e.shapeFlag && (p(t, e), e.targetStart = t, e.targetAnchor = o(t));
  return e.anchor && o(e.anchor);
} };
function vi(t, e) {
  let s = t.ctx;
  if (s && s.ut) {
    let n, i;
    for (e ? (n = t.el, i = t.anchor) : (n = t.targetStart, i = t.targetAnchor); n && n !== i; ) n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function Kr(t, e, s, n, i = null) {
  let a = e.targetStart = s(""), o = e.targetAnchor = s("");
  return a[Yf] = o, t && (n(a, t, i), n(o, t, i)), o;
}
let ss = Symbol("_leaveCb"), Si = Symbol("_enterCb");
function Mc() {
  let t = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: /* @__PURE__ */ new Map() };
  return Ra(() => {
    t.isMounted = !0;
  }), Tr(() => {
    t.isUnmounting = !0;
  }), t;
}
let Ne = [Function, Array], Ac = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Ne, onEnter: Ne, onAfterEnter: Ne, onEnterCancelled: Ne, onBeforeLeave: Ne, onLeave: Ne, onAfterLeave: Ne, onLeaveCancelled: Ne, onBeforeAppear: Ne, onAppear: Ne, onAfterAppear: Ne, onAppearCancelled: Ne }, Kf = (t) => {
  let e = t.subTree;
  return e.component ? Kf(e.component) : e;
};
function Xf(t) {
  let e = t[0];
  if (t.length > 1) {
    for (let s of t) if (s.type !== Ut) {
      e = s;
      break;
    }
  }
  return e;
}
let Jf = { name: "BaseTransition", props: Ac, setup(t, { slots: e }) {
  let s = ve(), n = Mc();
  return () => {
    let i = e.default && Ar(e.default(), !0), a = i && i.length ? Xf(i) : s.subTree ? kp() : void 0;
    if (!a) return;
    let o = xt(t), { mode: r } = o;
    if (n.isLeaving) return Xr(a);
    let l = Ph(a);
    if (!l) return Xr(a);
    let c = li(l, o, n, s, (u) => c = u);
    l.type !== Ut && Ds(l, c);
    let h = s.subTree && Ph(s.subTree);
    if (h && h.type !== Ut && !Ve(h, l) && Kf(s).type !== Ut) {
      let u = li(h, o, n, s);
      if (Ds(h, u), r === "out-in" && l.type !== Ut) return n.isLeaving = !0, u.afterLeave = () => {
        n.isLeaving = !1, 8 & s.job.flags || s.update(), delete u.afterLeave, h = void 0;
      }, Xr(a);
      r === "in-out" && l.type !== Ut ? u.delayLeave = (d, p, f) => {
        Zf(n, h)[String(h.key)] = h, d[ss] = () => {
          p(), d[ss] = void 0, delete c.delayedLeave, h = void 0;
        }, c.delayedLeave = () => {
          f(), delete c.delayedLeave, h = void 0;
        };
      } : h = void 0;
    } else h && (h = void 0);
    return a;
  };
} };
function Zf(t, e) {
  let { leavingVNodes: s } = t, n = s.get(e.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(e.type, n)), n;
}
function li(t, e, s, n, i) {
  let { appear: a, mode: o, persisted: r = !1, onBeforeEnter: l, onEnter: c, onAfterEnter: h, onEnterCancelled: u, onBeforeLeave: d, onLeave: p, onAfterLeave: f, onLeaveCancelled: g, onBeforeAppear: m, onAppear: _, onAfterAppear: y, onAppearCancelled: b } = e, x = String(t.key), v = Zf(s, t), k = (D, O) => {
    D && He(D, n, 9, O);
  }, S = (D, O) => {
    let I = O[1];
    k(D, O), st(D) ? D.every((w) => w.length <= 1) && I() : D.length <= 1 && I();
  }, C = { mode: o, persisted: r, beforeEnter(D) {
    let O = l;
    if (!s.isMounted) if (a) O = m || l;
    else return;
    D[ss] && D[ss](!0);
    let I = v[x];
    I && Ve(t, I) && I.el[ss] && I.el[ss](), k(O, [D]);
  }, enter(D) {
    if (v[x] === t) return;
    let O = c, I = h, w = u;
    if (!s.isMounted) if (a) O = _ || c, I = y || h, w = b || u;
    else return;
    let E = !1;
    D[Si] = (P) => {
      E || (E = !0, P ? k(w, [D]) : k(I, [D]), C.delayedLeave && C.delayedLeave(), D[Si] = void 0);
    };
    let L = D[Si].bind(null, !1);
    O ? S(O, [D, L]) : L();
  }, leave(D, O) {
    let I = String(t.key);
    if (D[Si] && D[Si](!0), s.isUnmounting) return O();
    k(d, [D]);
    let w = !1;
    D[ss] = (L) => {
      w || (w = !0, O(), L ? k(g, [D]) : k(f, [D]), D[ss] = void 0, v[I] === t && delete v[I]);
    };
    let E = D[ss].bind(null, !1);
    v[I] = t, p ? S(p, [D, E]) : E();
  }, clone(D) {
    let O = li(D, e, s, n, i);
    return i && i(O), O;
  } };
  return C;
}
function Xr(t) {
  if (Da(t)) return (t = rs(t)).children = null, t;
}
function Ph(t) {
  if (!Da(t)) return t.type.__isTeleport && t.children ? Xf(t.children) : t;
  if (t.component) return t.component.subTree;
  let { shapeFlag: e, children: s } = t;
  if (s) {
    if (16 & e) return s[0];
    if (32 & e && ot(s.default)) return s.default();
  }
}
function Ds(t, e) {
  6 & t.shapeFlag && t.component ? (t.transition = e, Ds(t.component.subTree, e)) : 128 & t.shapeFlag ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function Ar(t, e = !1, s) {
  let n = [], i = 0;
  for (let a = 0; a < t.length; a++) {
    let o = t[a], r = s == null ? o.key : String(s) + String(o.key != null ? o.key : a);
    o.type === ee ? (128 & o.patchFlag && i++, n = n.concat(Ar(o.children, e, r))) : (e || o.type !== Ut) && n.push(r != null ? rs(o, { key: r }) : o);
  }
  if (i > 1) for (let a = 0; a < n.length; a++) n[a].patchFlag = -2;
  return n;
}
function Pc(t, e) {
  return ot(t) ? gt({ name: t.name }, e, { setup: t }) : t;
}
function Uy() {
  let t = ve();
  return t ? (t.appContext.config.idPrefix || "v") + "-" + t.ids[0] + t.ids[1]++ : "";
}
function Tc(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function qy(t) {
  let e = ve(), s = If(null);
  return e && Object.defineProperty(e.refs === yt ? e.refs = {} : e.refs, t, { enumerable: !0, get: () => s.value, set: (n) => s.value = n }), s;
}
function Th(t, e) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(t, e)) && !s.configurable);
}
let $o = /* @__PURE__ */ new WeakMap();
function ai(t, e, s, n, i = !1) {
  if (st(t)) return void t.forEach((g, m) => ai(g, e && (st(e) ? e[m] : e), s, n, i));
  if (ks(n) && !i) {
    512 & n.shapeFlag && n.type.__asyncResolved && n.component.subTree.component && ai(t, e, s, n.component.subTree);
    return;
  }
  let a = 4 & n.shapeFlag ? La(n.component) : n.el, o = i ? null : a, { i: r, r: l } = t, c = e && e.r, h = r.refs === yt ? r.refs = {} : r.refs, u = r.setupState, d = xt(u), p = u === yt ? qn : (g) => !Th(h, g) && wt(d, g), f = (g, m) => !(m && Th(h, m));
  if (c != null && c !== l && (Dh(e), ct(c) ? (h[c] = null, p(c) && (u[c] = null)) : Xt(c) && (f(c, e.k) && (c.value = null), e.k && (h[e.k] = null))), ot(l)) yi(l, r, 12, [o, h]);
  else {
    let g = ct(l), m = Xt(l);
    if (g || m) {
      let _ = () => {
        if (t.f) {
          let y = g ? p(l) ? u[l] : h[l] : f() || !t.k ? l.value : h[t.k];
          if (i) st(y) && bc(y, a);
          else if (st(y)) y.includes(a) || y.push(a);
          else if (g) h[l] = [a], p(l) && (u[l] = h[l]);
          else {
            let b = [a];
            f(l, t.k) && (l.value = b), t.k && (h[t.k] = b);
          }
        } else g ? (h[l] = o, p(l) && (u[l] = o)) : m && (f(l, t.k) && (l.value = o), t.k && (h[t.k] = o));
      };
      if (o) {
        let y = () => {
          _(), $o.delete(t);
        };
        y.id = -1, $o.set(t, y), Yt(y, s);
      } else Dh(t), _();
    }
  }
}
function Dh(t) {
  let e = $o.get(t);
  e && (e.flags |= 8, $o.delete(t));
}
let Rh = !1, Wn = () => {
  Rh || (console.error("Hydration completed but contains mismatches."), Rh = !0);
}, Ha = (t) => {
  if (t.nodeType === 1) {
    if (t.namespaceURI.includes("svg") && t.tagName !== "foreignObject") return "svg";
    if (t.namespaceURI.includes("MathML")) return "mathml";
  }
}, Yn = (t) => t.nodeType === 8;
function Yy(t) {
  let { mt: e, p: s, o: { patchProp: n, createText: i, nextSibling: a, parentNode: o, remove: r, insert: l, createComment: c } } = t, h = (y, b, x, v, k, S = !1) => {
    S = S || !!b.dynamicChildren;
    let C = Yn(y) && y.data === "[", D = () => f(y, b, x, v, k, C), { type: O, ref: I, shapeFlag: w, patchFlag: E } = b, L = y.nodeType;
    b.el = y, E === -2 && (S = !1, b.dynamicChildren = null);
    let P = null;
    switch (O) {
      case Ys:
        L !== 3 ? b.children === "" ? (l(b.el = i(""), o(y), y), P = y) : P = D() : (y.data !== b.children && (Wn(), y.data = b.children), P = a(y));
        break;
      case Ut:
        _(y) ? (P = a(y), m(b.el = y.content.firstChild, y, x)) : P = L !== 8 || C ? D() : a(y);
        break;
      case Sn:
        if (C && (L = (y = a(y)).nodeType), L === 1 || L === 3) {
          P = y;
          let M = !b.children.length;
          for (let T = 0; T < b.staticCount; T++) M && (b.children += P.nodeType === 1 ? P.outerHTML : P.data), T === b.staticCount - 1 && (b.anchor = P), P = a(P);
          return C ? a(P) : P;
        }
        D();
        break;
      case ee:
        P = C ? p(y, b, x, v, k, S) : D();
        break;
      default:
        if (1 & w) P = L === 1 && b.type.toLowerCase() === y.tagName.toLowerCase() || _(y) ? u(y, b, x, v, k, S) : D();
        else if (6 & w) {
          b.slotScopeIds = k;
          let M = o(y);
          if (P = C ? g(y) : Yn(y) && y.data === "teleport start" ? g(y, y.data, "teleport end") : a(y), e(b, M, null, x, v, Ha(M), S), ks(b) && !b.type.__asyncResolved) {
            let T;
            C ? (T = It(ee)).anchor = P ? P.previousSibling : M.lastChild : T = y.nodeType === 3 ? $c("") : It("div"), T.el = y, b.component.subTree = T;
          }
        } else 64 & w ? P = L !== 8 ? D() : b.type.hydrate(y, b, x, v, k, S, t, d) : 128 & w && (P = b.type.hydrate(y, b, x, v, Ha(o(y)), k, S, t, h));
    }
    return I != null && ai(I, null, v, b), P;
  }, u = (y, b, x, v, k, S) => {
    S = S || !!b.dynamicChildren;
    let { type: C, props: D, patchFlag: O, shapeFlag: I, dirs: w, transition: E } = b, L = C === "input" || C === "option";
    if (L || O !== -1) {
      let P;
      w && es(b, null, x, "created");
      let M = !1;
      if (_(y)) {
        M = _p(null, E) && x && x.vnode.props && x.vnode.props.appear;
        let T = y.content.firstChild;
        if (M) {
          let F = T.getAttribute("class");
          F && (T.$cls = F), E.beforeEnter(T);
        }
        m(T, y, x), b.el = y = T;
      }
      if (16 & I && !(D && (D.innerHTML || D.textContent))) {
        let T = d(y.firstChild, b, y, x, v, k, S);
        for (; T; ) {
          Va(y, 1) || Wn();
          let F = T;
          T = T.nextSibling, r(F);
        }
      } else if (8 & I) {
        let T = b.children;
        T[0] === `
` && (y.tagName === "PRE" || y.tagName === "TEXTAREA") && (T = T.slice(1));
        let { textContent: F } = y;
        F !== T && F !== T.replace(/\r\n|\r/g, `
`) && (Va(y, 0) || Wn(), y.textContent = b.children);
      }
      if (D) {
        if (L || !S || 48 & O) {
          let T = y.tagName.includes("-");
          for (let F in D) (L && (F.endsWith("value") || F === "indeterminate") || En(F) && !ws(F) || F[0] === "." || T && !ws(F)) && n(y, F, null, D[F], void 0, x);
        } else if (D.onClick) n(y, "onClick", null, D.onClick, void 0, x);
        else if (4 & O && Cs(D.style)) for (let T in D.style) D.style[T];
      }
      (P = D && D.onVnodeBeforeMount) && Ce(P, x, b), w && es(b, null, x, "beforeMount"), ((P = D && D.onVnodeMounted) || w || M) && xp(() => {
        P && Ce(P, x, b), M && E.enter(y), w && es(b, null, x, "mounted");
      }, v);
    }
    return y.nextSibling;
  }, d = (y, b, x, v, k, S, C) => {
    C = C || !!b.dynamicChildren;
    let D = b.children, O = D.length;
    for (let I = 0; I < O; I++) {
      let w = C ? D[I] : D[I] = ke(D[I]), E = w.type === Ys;
      y ? (E && !C && I + 1 < O && ke(D[I + 1]).type === Ys && (l(i(y.data.slice(w.children.length)), x, a(y)), y.data = w.children), y = h(y, w, v, k, S, C)) : E && !w.children ? l(w.el = i(""), x) : (Va(x, 1) || Wn(), s(null, w, x, null, v, k, Ha(x), S));
    }
    return y;
  }, p = (y, b, x, v, k, S) => {
    let { slotScopeIds: C } = b;
    C && (k = k ? k.concat(C) : C);
    let D = o(y), O = d(a(y), b, D, x, v, k, S);
    return O && Yn(O) && O.data === "]" ? a(b.anchor = O) : (Wn(), l(b.anchor = c("]"), D, O), O);
  }, f = (y, b, x, v, k, S) => {
    if (Va(y.parentElement, 1) || Wn(), b.el = null, S) {
      let O = g(y);
      for (; ; ) {
        let I = a(y);
        if (I && I !== O) r(I);
        else break;
      }
    }
    let C = a(y), D = o(y);
    return r(y), s(null, b, D, C, x, v, Ha(D), k), x && (x.vnode.el = b.el, Rr(x, b.el)), C;
  }, g = (y, b = "[", x = "]") => {
    let v = 0;
    for (; y; ) if ((y = a(y)) && Yn(y) && (y.data === b && v++, y.data === x)) {
      if (v === 0) return a(y);
      v--;
    }
    return y;
  }, m = (y, b, x) => {
    let v = b.parentNode;
    v && v.replaceChild(y, b);
    let k = x;
    for (; k; ) k.vnode.el === b && (k.vnode.el = k.subTree.el = y), k = k.parent;
  }, _ = (y) => y.nodeType === 1 && y.tagName === "TEMPLATE";
  return [(y, b) => {
    if (!b.hasChildNodes()) {
      s(null, y, b), Bo(), b._vnode = y;
      return;
    }
    h(b.firstChild, y, null, null, null), Bo(), b._vnode = y;
  }, h];
}
let Lh = "data-allow-mismatch", Ky = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
function Va(t, e) {
  if (e === 0 || e === 1) for (; t && !t.hasAttribute(Lh); ) t = t.parentElement;
  let s = t && t.getAttribute(Lh);
  if (s == null) return !1;
  {
    if (s === "") return !0;
    let n = s.split(",");
    return !!(e === 0 && n.includes("children")) || n.includes(Ky[e]);
  }
}
let Xy = br().requestIdleCallback || ((t) => setTimeout(t, 1)), Jy = br().cancelIdleCallback || ((t) => clearTimeout(t)), Zy = (t = 1e4) => (e) => {
  let s = Xy(e, { timeout: t });
  return () => Jy(s);
}, Qy = (t) => (e, s) => {
  let n = new IntersectionObserver((i) => {
    for (let a of i) if (a.isIntersecting) {
      n.disconnect(), e();
      break;
    }
  }, t);
  return s((i) => {
    if (i instanceof Element) {
      if (function(a) {
        let { top: o, left: r, bottom: l, right: c } = a.getBoundingClientRect(), { innerHeight: h, innerWidth: u } = window;
        return (o > 0 && o < h || l > 0 && l < h) && (r > 0 && r < u || c > 0 && c < u);
      }(i)) return e(), n.disconnect(), !1;
      n.observe(i);
    }
  }), () => n.disconnect();
}, tb = (t) => (e) => {
  if (t) {
    let s = matchMedia(t);
    if (!s.matches) return s.addEventListener("change", e, { once: !0 }), () => s.removeEventListener("change", e);
    e();
  }
}, eb = (t = []) => (e, s) => {
  ct(t) && (t = [t]);
  let n = !1, i = (o) => {
    n || (n = !0, a(), e(), o.target.dispatchEvent(new o.constructor(o.type, o)));
  }, a = () => {
    s((o) => {
      for (let r of t) o.removeEventListener(r, i);
    });
  };
  return s((o) => {
    for (let r of t) o.addEventListener(r, i, { once: !0 });
  }), a;
}, ks = (t) => !!t.type.__asyncLoader;
function sb(t) {
  let e;
  ot(t) && (t = { loader: t });
  let { loader: s, loadingComponent: n, errorComponent: i, delay: a = 200, hydrate: o, timeout: r, suspensible: l = !0, onError: c } = t, h = null, u = 0, d = () => {
    let p;
    return h || (p = h = s().catch((f) => {
      if (f = f instanceof Error ? f : Error(String(f)), c) return new Promise((g, m) => {
        c(f, () => g((u++, h = null, d())), () => m(f), u + 1);
      });
      throw f;
    }).then((f) => p !== h && h ? h : (f && (f.__esModule || f[Symbol.toStringTag] === "Module") && (f = f.default), e = f, f)));
  };
  return Pc({ name: "AsyncComponentWrapper", __asyncLoader: d, __asyncHydrate(p, f, g) {
    let m = !1;
    (f.bu || (f.bu = [])).push(() => m = !0);
    let _ = () => {
      m || g();
    }, y = o ? () => {
      let b = o(_, (x) => function(v, k) {
        if (Yn(v) && v.data === "[") {
          let S = 1, C = v.nextSibling;
          for (; C; ) {
            if (C.nodeType === 1) {
              if (k(C) === !1) break;
            } else if (Yn(C)) if (C.data === "]") {
              if (--S == 0) break;
            } else C.data === "[" && S++;
            C = C.nextSibling;
          }
        } else k(v);
      }(p, x));
      b && (f.bum || (f.bum = [])).push(b);
    } : _;
    e ? y() : d().then(() => !f.isUnmounted && y());
  }, get __asyncResolved() {
    return e;
  }, setup() {
    let p = ae;
    if (Tc(p), e) return () => za(e, p);
    let f = (y) => {
      h = null, In(y, p, 13, !i);
    };
    if (l && p.suspense || Pn) return d().then((y) => () => za(y, p)).catch((y) => (f(y), () => i ? It(i, { error: y }) : null));
    let g = Vi(!1), m = Vi(), _ = Vi(!!a);
    return a && setTimeout(() => {
      _.value = !1;
    }, a), r != null && setTimeout(() => {
      if (!g.value && !m.value) {
        let y = Error(`Async component timed out after ${r}ms.`);
        f(y), m.value = y;
      }
    }, r), d().then(() => {
      g.value = !0, p.parent && Da(p.parent.vnode) && p.parent.update();
    }).catch((y) => {
      f(y), m.value = y;
    }), () => g.value && e ? za(e, p) : m.value && i ? It(i, { error: m.value }) : n && !_.value ? za(n, p) : void 0;
  } });
}
function za(t, e) {
  let { ref: s, props: n, children: i, ce: a } = e.vnode, o = It(t, n, i);
  return o.ref = s, o.ce = a, delete e.vnode.ce, o;
}
let Da = (t) => t.type.__isKeepAlive, nb = { name: "KeepAlive", __isKeepAlive: !0, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(t, { slots: e }) {
  let s = ve(), n = s.ctx;
  if (!n.renderer) return () => {
    let y = e.default && e.default();
    return y && y.length === 1 ? y[0] : y;
  };
  let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, r = s.suspense, { renderer: { p: l, m: c, um: h, o: { createElement: u } } } = n, d = u("div");
  function p(y) {
    Jr(y), h(y, s, r, !0);
  }
  function f(y) {
    i.forEach((b, x) => {
      let v = Il(ks(b) ? b.type.__asyncResolved || {} : b.type);
      v && !y(v) && g(x);
    });
  }
  function g(y) {
    let b = i.get(y);
    !b || o && Ve(b, o) ? o && Jr(o) : p(b), i.delete(y), a.delete(y);
  }
  n.activate = (y, b, x, v, k) => {
    let S = y.component;
    c(y, b, x, 0, r), l(S.vnode, y, b, x, S, r, v, y.slotScopeIds, k), Yt(() => {
      S.isDeactivated = !1, S.a && ti(S.a);
      let C = y.props && y.props.onVnodeMounted;
      C && Ce(C, S.parent, y);
    }, r);
  }, n.deactivate = (y) => {
    let b = y.component;
    Vo(b.m), Vo(b.a), c(y, d, null, 1, r), Yt(() => {
      b.da && ti(b.da);
      let x = y.props && y.props.onVnodeUnmounted;
      x && Ce(x, b.parent, y), b.isDeactivated = !0;
    }, r);
  }, ii(() => [t.include, t.exclude], ([y, b]) => {
    y && f((x) => Li(y, x)), b && f((x) => !Li(b, x));
  }, { flush: "post", deep: !0 });
  let m = null, _ = () => {
    m != null && (zo(s.subTree.type) ? Yt(() => {
      i.set(m, Ga(s.subTree));
    }, s.subTree.suspense) : i.set(m, Ga(s.subTree)));
  };
  return Ra(_), Pr(_), Tr(() => {
    i.forEach((y) => {
      let { subTree: b, suspense: x } = s, v = Ga(b);
      if (y.type === v.type && y.key === v.key) {
        Jr(v);
        let k = v.component.da;
        k && Yt(k, x);
        return;
      }
      p(y);
    });
  }), () => {
    if (m = null, !e.default) return o = null;
    let y = e.default(), b = y[0];
    if (y.length > 1) return o = null, y;
    if (!Rs(b) || !(4 & b.shapeFlag) && !(128 & b.shapeFlag)) return o = null, b;
    let x = Ga(b);
    if (x.type === Ut) return o = null, x;
    let v = x.type, k = Il(ks(x) ? x.type.__asyncResolved || {} : v), { include: S, exclude: C, max: D } = t;
    if (S && (!k || !Li(S, k)) || C && k && Li(C, k)) return x.shapeFlag &= -257, o = x, b;
    let O = x.key == null ? v : x.key, I = i.get(O);
    return x.el && (x = rs(x), 128 & b.shapeFlag && (b.ssContent = x)), m = O, I ? (x.el = I.el, x.component = I.component, x.transition && Ds(x, x.transition), x.shapeFlag |= 512, a.delete(O), a.add(O)) : (a.add(O), D && a.size > parseInt(D, 10) && g(a.values().next().value)), x.shapeFlag |= 256, o = x, zo(b.type) ? b : x;
  };
} };
function Li(t, e) {
  let s;
  return st(t) ? t.some((n) => Li(n, e)) : ct(t) ? t.split(",").includes(e) : (s = t, Wt.call(s) === "[object RegExp]" && (t.lastIndex = 0, t.test(e)));
}
function Qf(t, e) {
  ep(t, "a", e);
}
function tp(t, e) {
  ep(t, "da", e);
}
function ep(t, e, s = ae) {
  let n = t.__wdc || (t.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return t();
  });
  if (jo(e, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; ) Da(i.parent.vnode) && function(a, o, r, l) {
      let c = jo(o, a, l, !0);
      Dr(() => {
        bc(l[o], c);
      }, r);
    }(n, e, s, i), i = i.parent;
  }
}
function Jr(t) {
  t.shapeFlag &= -257, t.shapeFlag &= -513;
}
function Ga(t) {
  return 128 & t.shapeFlag ? t.ssContent : t;
}
function jo(t, e, s = ae, n = !1) {
  if (s) {
    let i = s[t] || (s[t] = []), a = e.__weh || (e.__weh = (...o) => {
      Ps();
      let r = bi(s), l = He(e, s, t, o);
      return r(), Ts(), l;
    });
    return n ? i.unshift(a) : i.push(a), a;
  }
}
let Ls = (t) => (e, s = ae) => {
  Pn && t !== "sp" || jo(t, (...n) => e(...n), s);
}, sp = Ls("bm"), Ra = Ls("m"), Dc = Ls("bu"), Pr = Ls("u"), Tr = Ls("bum"), Dr = Ls("um"), np = Ls("sp"), ip = Ls("rtg"), ap = Ls("rtc");
function op(t, e = ae) {
  jo("ec", t, e);
}
let Rc = "components";
function ib(t, e) {
  return Lc(Rc, t, !0, e) || t;
}
let rp = Symbol.for("v-ndc");
function ab(t) {
  return ct(t) ? Lc(Rc, t, !1) || t : t || rp;
}
function ob(t) {
  return Lc("directives", t);
}
function Lc(t, e, s = !0, n = !1) {
  let i = oe || ae;
  if (i) {
    let a = i.type;
    if (t === Rc) {
      let r = Il(a, !1);
      if (r && (r === e || r === Tt(e) || r === Fn(Tt(e)))) return a;
    }
    let o = Oh(i[t] || a[t], e) || Oh(i.appContext[t], e);
    return !o && n ? a : o;
  }
}
function Oh(t, e) {
  return t && (t[e] || t[Tt(e)] || t[Fn(Tt(e))]);
}
function rb(t, e, s, n) {
  let i, a = s && s[n], o = st(t);
  if (o || ct(t)) {
    let r = o && Cs(t), l = !1, c = !1;
    r && (l = !Te(t), c = os(t), t = Sr(t)), i = Array(t.length);
    for (let h = 0, u = t.length; h < u; h++) i[h] = e(l ? c ? si(Ue(t[h])) : Ue(t[h]) : t[h], h, void 0, a && a[h]);
  } else if (typeof t == "number") {
    i = Array(t);
    for (let r = 0; r < t; r++) i[r] = e(r + 1, r, void 0, a && a[r]);
  } else if (St(t)) if (t[Symbol.iterator]) i = Array.from(t, (r, l) => e(r, l, void 0, a && a[l]));
  else {
    let r = Object.keys(t);
    i = Array(r.length);
    for (let l = 0, c = r.length; l < c; l++) {
      let h = r[l];
      i[l] = e(t[h], h, l, a && a[l]);
    }
  }
  else i = [];
  return s && (s[n] = i), i;
}
function lb(t, e) {
  for (let s = 0; s < e.length; s++) {
    let n = e[s];
    if (st(n)) for (let i = 0; i < n.length; i++) t[n[i].name] = n[i].fn;
    else n && (t[n.name] = n.key ? (...i) => {
      let a = n.fn(...i);
      return a && (a.key = n.key), a;
    } : n.fn);
  }
  return t;
}
function cb(t, e, s = {}, n, i) {
  if (oe.ce || oe.parent && ks(oe.parent) && oe.parent.ce) {
    let c = Object.keys(s).length > 0;
    return e !== "default" && (s.name = e), ca(), Go(ee, null, [It("slot", s, n && n())], c ? -2 : 64);
  }
  let a = t[e];
  a && a._c && (a._d = !1), ca();
  let o = a && Oc(a(s)), r = s.key || o && o.key, l = Go(ee, { key: (r && !ge(r) ? r : `_${e}`) + (!o && n ? "_fb" : "") }, o || (n ? n() : []), o && t._ === 1 ? 64 : -2);
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), a && a._c && (a._d = !0), l;
}
function Oc(t) {
  return t.some((e) => !Rs(e) || e.type !== Ut && (e.type !== ee || !!Oc(e.children))) ? t : null;
}
function hb(t, e) {
  let s = {};
  for (let n in t) s[e && /[A-Z]/.test(n) ? `on:${n}` : Qn(n)] = t[n];
  return s;
}
let Al = (t) => t ? Pp(t) ? La(t) : Al(t.parent) : null, Ui = gt(/* @__PURE__ */ Object.create(null), { $: (t) => t, $el: (t) => t.vnode.el, $data: (t) => t.data, $props: (t) => t.props, $attrs: (t) => t.attrs, $slots: (t) => t.slots, $refs: (t) => t.refs, $parent: (t) => Al(t.parent), $root: (t) => Al(t.root), $host: (t) => t.ce, $emit: (t) => t.emit, $options: (t) => Dl(t), $forceUpdate: (t) => t.f || (t.f = () => {
  Cc(t.update);
}), $nextTick: (t) => t.n || (t.n = ri.bind(t.proxy)), $watch: (t) => zy.bind(t) }), Zr = (t, e) => t !== yt && !t.__isScriptSetup && wt(t, e), Pl = { get({ _: t }, e) {
  let s, n;
  if (e === "__v_skip") return !0;
  let { ctx: i, setupState: a, data: o, props: r, accessCache: l, type: c, appContext: h } = t;
  if (e[0] !== "$") {
    let d = l[e];
    if (d !== void 0) switch (d) {
      case 1:
        return a[e];
      case 2:
        return o[e];
      case 4:
        return i[e];
      case 3:
        return r[e];
    }
    else {
      if (Zr(a, e)) return l[e] = 1, a[e];
      if (o !== yt && wt(o, e)) return l[e] = 2, o[e];
      if (wt(r, e)) return l[e] = 3, r[e];
      if (i !== yt && wt(i, e)) return l[e] = 4, i[e];
      Tl && (l[e] = 0);
    }
  }
  let u = Ui[e];
  return u ? (e === "$attrs" && ue(t.attrs, "get", ""), u(t)) : (s = c.__cssModules) && (s = s[e]) ? s : i !== yt && wt(i, e) ? (l[e] = 4, i[e]) : wt(n = h.config.globalProperties, e) ? n[e] : void 0;
}, set({ _: t }, e, s) {
  let { data: n, setupState: i, ctx: a } = t;
  return Zr(i, e) ? (i[e] = s, !0) : n !== yt && wt(n, e) ? (n[e] = s, !0) : !wt(t.props, e) && !(e[0] === "$" && e.slice(1) in t) && (a[e] = s, !0);
}, has({ _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: i, props: a, type: o } }, r) {
  let l;
  return !!(s[r] || t !== yt && r[0] !== "$" && wt(t, r) || Zr(e, r) || wt(a, r) || wt(n, r) || wt(Ui, r) || wt(i.config.globalProperties, r) || (l = o.__cssModules) && l[r]);
}, defineProperty(t, e, s) {
  return s.get != null ? t._.accessCache[e] = 0 : wt(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
} }, ub = gt({}, Pl, { get(t, e) {
  if (e !== Symbol.unscopables) return Pl.get(t, e, t);
}, has: (t, e) => e[0] !== "_" && !Km(e) });
function db() {
  return null;
}
function fb() {
  return null;
}
function pb(t) {
}
function gb(t) {
}
function mb() {
  return null;
}
function yb() {
}
function bb(t, e) {
  return null;
}
function _b() {
  return lp().slots;
}
function xb() {
  return lp().attrs;
}
function lp(t) {
  let e = ve();
  return e.setupContext || (e.setupContext = Lp(e));
}
function la(t) {
  return st(t) ? t.reduce((e, s) => (e[s] = null, e), {}) : t;
}
function vb(t, e) {
  let s = la(t);
  for (let n in e) {
    if (n.startsWith("__skip")) continue;
    let i = s[n];
    i ? st(i) || ot(i) ? i = s[n] = { type: i, default: e[n] } : i.default = e[n] : i === null && (i = s[n] = { default: e[n] }), i && e[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return s;
}
function Sb(t, e) {
  return t && e ? st(t) && st(e) ? t.concat(e) : gt({}, la(t), la(e)) : t || e;
}
function wb(t, e) {
  let s = {};
  for (let n in t) e.includes(n) || Object.defineProperty(s, n, { enumerable: !0, get: () => t[n] });
  return s;
}
function Cb(t) {
  let e = ve(), s = Pn, n = t();
  ua(), s && Jn(!1);
  let i = () => {
    bi(e), s && Jn(!0);
  }, a = () => {
    ve() !== e && e.scope.off(), ua(), s && Jn(!1);
  };
  return _c(n) && (n = n.catch((o) => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), o;
  })), [n, () => {
    i(), Promise.resolve().then(a);
  }];
}
let Tl = !0;
function Eh(t, e, s) {
  He(st(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, s);
}
function Dl(t) {
  let e, s = t.type, { mixins: n, extends: i } = s, { mixins: a, optionsCache: o, config: { optionMergeStrategies: r } } = t.appContext, l = o.get(s);
  return l ? e = l : a.length || n || i ? (e = {}, a.length && a.forEach((c) => Wo(e, c, r, !0)), Wo(e, s, r)) : e = s, St(s) && o.set(s, e), e;
}
function Wo(t, e, s, n = !1) {
  let { mixins: i, extends: a } = e;
  for (let o in a && Wo(t, a, s, !0), i && i.forEach((r) => Wo(t, r, s, !0)), e) if (!(n && o === "expose")) {
    let r = kb[o] || s && s[o];
    t[o] = r ? r(t[o], e[o]) : e[o];
  }
  return t;
}
let kb = { data: Fh, props: Ih, emits: Ih, methods: wi, computed: wi, beforeCreate: be, created: be, beforeMount: be, mounted: be, beforeUpdate: be, updated: be, beforeDestroy: be, beforeUnmount: be, destroyed: be, unmounted: be, activated: be, deactivated: be, errorCaptured: be, serverPrefetch: be, components: wi, directives: wi, watch: function(t, e) {
  if (!t) return e;
  if (!e) return t;
  let s = gt(/* @__PURE__ */ Object.create(null), t);
  for (let n in e) s[n] = be(t[n], e[n]);
  return s;
}, provide: Fh, inject: function(t, e) {
  return wi(Rl(t), Rl(e));
} };
function Fh(t, e) {
  return e ? t ? function() {
    return gt(ot(t) ? t.call(this, this) : t, ot(e) ? e.call(this, this) : e);
  } : e : t;
}
function Rl(t) {
  if (st(t)) {
    let e = {};
    for (let s = 0; s < t.length; s++) e[t[s]] = t[s];
    return e;
  }
  return t;
}
function be(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function wi(t, e) {
  return t ? gt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Ih(t, e) {
  return t ? st(t) && st(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : gt(/* @__PURE__ */ Object.create(null), la(t), la(e ?? {})) : e;
}
function cp() {
  return { app: null, config: { isNativeTag: qn, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let Mb = 0, vn = null;
function Ab(t, e, s = yt) {
  let n = ve(), i = Tt(e), a = Me(e), o = hp(t, i), r = Bf((l, c) => {
    let h, u, d = yt;
    return Uf(() => {
      let p = t[i];
      ne(h, p) && (h = p, c());
    }), { get: () => (l(), s.get ? s.get(h) : h), set(p) {
      let f = s.set ? s.set(p) : p;
      if (!ne(f, h) && !(d !== yt && ne(p, d))) return;
      let g = n.vnode.props;
      g && (e in g || i in g || a in g) && (`onUpdate:${e}` in g || `onUpdate:${i}` in g || `onUpdate:${a}` in g) || (h = p, c()), n.emit(`update:${e}`, f), ne(p, f) && ne(p, d) && !ne(f, u) && c(), d = p, u = f;
    } };
  });
  return r[Symbol.iterator] = () => {
    let l = 0;
    return { next: () => l < 2 ? { value: l++ ? o || yt : r, done: !1 } : { done: !0 } };
  }, r;
}
let hp = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Tt(e)}Modifiers`] || t[`${Me(e)}Modifiers`];
function Pb(t, e, ...s) {
  let n;
  if (t.isUnmounted) return;
  let i = t.vnode.props || yt, a = s, o = e.startsWith("update:"), r = o && hp(i, e.slice(7));
  r && (r.trim && (a = s.map((h) => ct(h) ? h.trim() : h)), r.number && (a = s.map(yr)));
  let l = i[n = Qn(e)] || i[n = Qn(Tt(e))];
  !l && o && (l = i[n = Qn(Me(e))]), l && He(l, t, 6, a);
  let c = i[n + "Once"];
  if (c) {
    if (t.emitted) {
      if (t.emitted[n]) return;
    } else t.emitted = {};
    t.emitted[n] = !0, He(c, t, 6, a);
  }
}
let Tb = /* @__PURE__ */ new WeakMap();
function Ho(t, e) {
  return !!t && !!En(e) && (wt(t, (e = e.slice(2).replace(/Once$/, ""))[0].toLowerCase() + e.slice(1)) || wt(t, Me(e)) || wt(t, e));
}
function xo(t) {
  let e, s, { type: n, vnode: i, proxy: a, withProxy: o, propsOptions: [r], slots: l, attrs: c, emit: h, render: u, renderCache: d, props: p, data: f, setupState: g, ctx: m, inheritAttrs: _ } = t, y = ra(t);
  try {
    if (4 & i.shapeFlag) {
      let x = o || a;
      e = ke(u.call(x, x, d, p, g, f, m)), s = c;
    } else e = ke(n.length > 1 ? n(p, { attrs: c, slots: l, emit: h }) : n(p, null)), s = n.props ? c : Db(c);
  } catch (x) {
    Yi.length = 0, In(x, t, 1), e = It(Ut);
  }
  let b = e;
  if (s && _ !== !1) {
    let x = Object.keys(s), { shapeFlag: v } = b;
    x.length && 7 & v && (r && x.some(pr) && (s = Rb(s, r)), b = rs(b, s, !1, !0));
  }
  return i.dirs && ((b = rs(b, null, !1, !0)).dirs = b.dirs ? b.dirs.concat(i.dirs) : i.dirs), i.transition && Ds(b, i.transition), e = b, ra(y), e;
}
let Db = (t) => {
  let e;
  for (let s in t) (s === "class" || s === "style" || En(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, Rb = (t, e) => {
  let s = {};
  for (let n in t) pr(n) && n.slice(9) in e || (s[n] = t[n]);
  return s;
};
function Nh(t, e, s) {
  let n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < n.length; i++) {
    let a = n[i];
    if (up(e, t, a) && !Ho(s, a)) return !0;
  }
  return !1;
}
function up(t, e, s) {
  let n = t[s], i = e[s];
  return s === "style" && St(n) && St(i) ? !As(n, i) : n !== i;
}
function Rr({ vnode: t, parent: e, suspense: s }, n) {
  for (; e; ) {
    let i = e.subTree;
    if (i.suspense && i.suspense.activeBranch === t && (i.suspense.vnode.el = i.el = n, t = i), i === t) (t = e.vnode).el = n, e = e.parent;
    else break;
  }
  s && s.activeBranch === t && (s.vnode.el = n);
}
let Ll = {}, dp = (t) => Object.getPrototypeOf(t) === Ll;
function fp(t, e, s, n) {
  let i, [a, o] = t.propsOptions, r = !1;
  if (e) for (let l in e) {
    let c;
    if (ws(l)) continue;
    let h = e[l];
    a && wt(a, c = Tt(l)) ? o && o.includes(c) ? (i || (i = {}))[c] = h : s[c] = h : Ho(t.emitsOptions, l) || l in n && h === n[l] || (n[l] = h, r = !0);
  }
  if (o) {
    let l = xt(s), c = i || yt;
    for (let h = 0; h < o.length; h++) {
      let u = o[h];
      s[u] = Ol(a, l, u, c[u], t, !wt(c, u));
    }
  }
  return r;
}
function Ol(t, e, s, n, i, a) {
  let o = t[s];
  if (o != null) {
    let r = wt(o, "default");
    if (r && n === void 0) {
      let l = o.default;
      if (o.type !== Function && !o.skipFactory && ot(l)) {
        let { propsDefaults: c } = i;
        if (s in c) n = c[s];
        else {
          let h = bi(i);
          n = c[s] = l.call(null, e), h();
        }
      } else n = l;
      i.ce && i.ce._setProp(s, n);
    }
    o[0] && (a && !r ? n = !1 : o[1] && (n === "" || n === Me(s)) && (n = !0));
  }
  return n;
}
let Lb = /* @__PURE__ */ new WeakMap();
function Bh(t) {
  return !(t[0] === "$" || ws(t));
}
let Ec = (t) => t === "_" || t === "_ctx" || t === "$stable", Fc = (t) => st(t) ? t.map(ke) : [ke(t)], Ob = (t, e, s) => {
  if (e._n) return e;
  let n = kc((...i) => Fc(e(...i)), s);
  return n._c = !1, n;
}, pp = (t, e, s) => {
  let n = t._ctx;
  for (let i in t) {
    if (Ec(i)) continue;
    let a = t[i];
    if (ot(a)) e[i] = Ob(i, a, n);
    else if (a != null) {
      let o = Fc(a);
      e[i] = () => o;
    }
  }
}, gp = (t, e) => {
  let s = Fc(e);
  t.slots.default = () => s;
}, mp = (t, e, s) => {
  for (let n in e) (s || !Ec(n)) && (t[n] = e[n]);
}, Yt = xp;
function Ic(t) {
  return bp(t);
}
function yp(t) {
  return bp(t, Yy);
}
function bp(t, e) {
  var s;
  let n, i;
  br().__VUE__ = !0;
  let { insert: a, remove: o, patchProp: r, createElement: l, createText: c, createComment: h, setText: u, setElementText: d, parentNode: p, nextSibling: f, setScopeId: g = ie, insertStaticContent: m } = t, _ = (A, R, N, z = null, $ = null, B = null, G, j = null, V = !!R.dynamicChildren) => {
    if (A === R) return;
    A && !Ve(A, R) && (z = K(A), nt(A, $, B, !0), A = null), R.patchFlag === -2 && (V = !1, R.dynamicChildren = null);
    let { type: W, ref: X, shapeFlag: J } = R;
    switch (W) {
      case Ys:
        y(A, R, N, z);
        break;
      case Ut:
        b(A, R, N, z);
        break;
      case Sn:
        A == null && x(R, N, z, G);
        break;
      case ee:
        w(A, R, N, z, $, B, G, j, V);
        break;
      default:
        1 & J ? v(A, R, N, z, $, B, G, j, V) : 6 & J ? E(A, R, N, z, $, B, G, j, V) : (64 & J || 128 & J) && W.process(A, R, N, z, $, B, G, j, V, at);
    }
    X != null && $ ? ai(X, A && A.ref, B, R || A, !R) : X == null && A && A.ref != null && ai(A.ref, null, B, A, !0);
  }, y = (A, R, N, z) => {
    if (A == null) a(R.el = c(R.children), N, z);
    else {
      let $ = R.el = A.el;
      R.children !== A.children && u($, R.children);
    }
  }, b = (A, R, N, z) => {
    A == null ? a(R.el = h(R.children || ""), N, z) : R.el = A.el;
  }, x = (A, R, N, z) => {
    [A.el, A.anchor] = m(A.children, R, N, z, A.el, A.anchor);
  }, v = (A, R, N, z, $, B, G, j, V) => {
    if (R.type === "svg" ? G = "svg" : R.type === "math" && (G = "mathml"), A == null) k(R, N, z, $, B, G, j, V);
    else {
      let W = A.el && A.el._isVueCE ? A.el : null;
      try {
        W && W._beginPatch(), D(A, R, $, B, G, j, V);
      } finally {
        W && W._endPatch();
      }
    }
  }, k = (A, R, N, z, $, B, G, j) => {
    let V, W, { props: X, shapeFlag: J, transition: et, dirs: tt } = A;
    if (V = A.el = l(A.type, B, X && X.is, X), 8 & J ? d(V, A.children) : 16 & J && C(A.children, V, null, z, $, Qr(A, B), G, j), tt && es(A, null, z, "created"), S(V, A, A.scopeId, G, z), X) {
      for (let rt in X) rt === "value" || ws(rt) || r(V, rt, null, X[rt], B, z);
      "value" in X && r(V, "value", null, X.value, B), (W = X.onVnodeBeforeMount) && Ce(W, z, A);
    }
    tt && es(A, null, z, "beforeMount");
    let ht = _p($, et);
    ht && et.beforeEnter(V), a(V, R, N), ((W = X && X.onVnodeMounted) || ht || tt) && Yt(() => {
      W && Ce(W, z, A), ht && et.enter(V), tt && es(A, null, z, "mounted");
    }, $);
  }, S = (A, R, N, z, $) => {
    if (N && g(A, N), z) for (let B = 0; B < z.length; B++) g(A, z[B]);
    if ($) {
      let B = $.subTree;
      if (R === B || zo(B.type) && (B.ssContent === R || B.ssFallback === R)) {
        let G = $.vnode;
        S(A, G, G.scopeId, G.slotScopeIds, $.parent);
      }
    }
  }, C = (A, R, N, z, $, B, G, j, V = 0) => {
    for (let W = V; W < A.length; W++) _(null, A[W] = j ? ps(A[W]) : ke(A[W]), R, N, z, $, B, G, j);
  }, D = (A, R, N, z, $, B, G) => {
    let j, V = R.el = A.el, { patchFlag: W, dynamicChildren: X, dirs: J } = R;
    W |= 16 & A.patchFlag;
    let et = A.props || yt, tt = R.props || yt;
    if (N && an(N, !1), (j = tt.onVnodeBeforeUpdate) && Ce(j, N, R, A), J && es(R, A, N, "beforeUpdate"), N && an(N, !0), (et.innerHTML && tt.innerHTML == null || et.textContent && tt.textContent == null) && d(V, ""), X ? O(A.dynamicChildren, X, V, N, z, Qr(R, $), B) : G || F(A, R, V, null, N, z, Qr(R, $), B, !1), W > 0) {
      if (16 & W) I(V, et, tt, N, $);
      else if (2 & W && et.class !== tt.class && r(V, "class", null, tt.class, $), 4 & W && r(V, "style", et.style, tt.style, $), 8 & W) {
        let ht = R.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let Mt = ht[rt], Bt = et[Mt], Ht = tt[Mt];
          (Ht !== Bt || Mt === "value") && r(V, Mt, Bt, Ht, $, N);
        }
      }
      1 & W && A.children !== R.children && d(V, R.children);
    } else G || X != null || I(V, et, tt, N, $);
    ((j = tt.onVnodeUpdated) || J) && Yt(() => {
      j && Ce(j, N, R, A), J && es(R, A, N, "updated");
    }, z);
  }, O = (A, R, N, z, $, B, G) => {
    for (let j = 0; j < R.length; j++) {
      let V = A[j], W = R[j], X = V.el && (V.type === ee || !Ve(V, W) || 198 & V.shapeFlag) ? p(V.el) : N;
      _(V, W, X, null, z, $, B, G, !0);
    }
  }, I = (A, R, N, z, $) => {
    if (R !== N) {
      if (R !== yt) for (let B in R) ws(B) || B in N || r(A, B, R[B], null, $, z);
      for (let B in N) {
        if (ws(B)) continue;
        let G = N[B], j = R[B];
        G !== j && B !== "value" && r(A, B, j, G, $, z);
      }
      "value" in N && r(A, "value", R.value, N.value, $);
    }
  }, w = (A, R, N, z, $, B, G, j, V) => {
    let W = R.el = A ? A.el : c(""), X = R.anchor = A ? A.anchor : c(""), { patchFlag: J, dynamicChildren: et, slotScopeIds: tt } = R;
    tt && (j = j ? j.concat(tt) : tt), A == null ? (a(W, N, z), a(X, N, z), C(R.children || [], N, X, $, B, G, j, V)) : J > 0 && 64 & J && et && A.dynamicChildren && A.dynamicChildren.length === et.length ? (O(A.dynamicChildren, et, N, $, B, G, j), (R.key != null || $ && R === $.subTree) && Nc(A, R, !0)) : F(A, R, N, X, $, B, G, j, V);
  }, E = (A, R, N, z, $, B, G, j, V) => {
    R.slotScopeIds = j, A == null ? 512 & R.shapeFlag ? $.ctx.activate(R, N, z, G, V) : L(R, N, z, $, B, G, V) : P(A, R, V);
  }, L = (A, R, N, z, $, B, G) => {
    let j = A.component = Ap(A, z, $);
    if (Da(A) && (j.ctx.renderer = at), Tp(j, !1, G), j.asyncDep) {
      if ($ && $.registerDep(j, M, G), !A.el) {
        let V = j.subTree = It(Ut);
        b(null, V, R, N), A.placeholder = V.el;
      }
    } else M(j, A, R, N, $, B, G);
  }, P = (A, R, N) => {
    let z = R.component = A.component;
    if (function($, B, G) {
      let { props: j, children: V, component: W } = $, { props: X, children: J, patchFlag: et } = B, tt = W.emitsOptions;
      if (B.dirs || B.transition) return !0;
      if (!G || !(et >= 0)) return (!!V || !!J) && (!J || !J.$stable) || j !== X && (j ? !X || Nh(j, X, tt) : !!X);
      if (1024 & et) return !0;
      if (16 & et) return j ? Nh(j, X, tt) : !!X;
      if (8 & et) {
        let ht = B.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let Mt = ht[rt];
          if (up(X, j, Mt) && !Ho(tt, Mt)) return !0;
        }
      }
      return !1;
    }(A, R, N)) {
      if (z.asyncDep && !z.asyncResolved) return void T(z, R, N);
      z.next = R, z.update();
    } else R.el = A.el, z.vnode = R;
  }, M = (A, R, N, z, $, B, G) => {
    A.scope.on();
    let j = A.effect = new na(() => {
      if (A.isMounted) {
        let X, { next: J, bu: et, u: tt, parent: ht, vnode: rt } = A;
        {
          let Se = function Na(sn) {
            let Es = sn.subTree.component;
            if (Es) return Es.asyncDep && !Es.asyncResolved ? Es : Na(Es);
          }(A);
          if (Se) {
            J && (J.el = rt.el, T(A, J, G)), Se.asyncDep.then(() => {
              Yt(() => {
                A.isUnmounted || V();
              }, $);
            });
            return;
          }
        }
        let Mt = J;
        an(A, !1), J ? (J.el = rt.el, T(A, J, G)) : J = rt, et && ti(et), (X = J.props && J.props.onVnodeBeforeUpdate) && Ce(X, ht, J, rt), an(A, !0);
        let Bt = xo(A), Ht = A.subTree;
        A.subTree = Bt, _(Ht, Bt, p(Ht.el), K(Ht), A, $, B), J.el = Bt.el, Mt === null && Rr(A, Bt.el), tt && Yt(tt, $), (X = J.props && J.props.onVnodeUpdated) && Yt(() => Ce(X, ht, J, rt), $);
      } else {
        let X, { el: J, props: et } = R, { bm: tt, m: ht, parent: rt, root: Mt, type: Bt } = A, Ht = ks(R);
        if (an(A, !1), tt && ti(tt), !Ht && (X = et && et.onVnodeBeforeMount) && Ce(X, rt, R), an(A, !0), J && i) {
          let Se = () => {
            A.subTree = xo(A), i(J, A.subTree, A, $, null);
          };
          Ht && Bt.__asyncHydrate ? Bt.__asyncHydrate(J, A, Se) : Se();
        } else {
          Mt.ce && Mt.ce._hasShadowRoot() && Mt.ce._injectChildStyle(Bt, A.parent ? A.parent.type : void 0);
          let Se = A.subTree = xo(A);
          _(null, Se, N, z, A, $, B), R.el = Se.el;
        }
        if (ht && Yt(ht, $), !Ht && (X = et && et.onVnodeMounted)) {
          let Se = R;
          Yt(() => Ce(X, rt, Se), $);
        }
        (256 & R.shapeFlag || rt && ks(rt.vnode) && 256 & rt.vnode.shapeFlag) && A.a && Yt(A.a, $), A.isMounted = !0, R = N = z = null;
      }
    });
    A.scope.off();
    let V = A.update = j.run.bind(j), W = A.job = j.runIfDirty.bind(j);
    W.i = A, W.id = A.uid, j.scheduler = () => Cc(W), an(A, !0), V();
  }, T = (A, R, N) => {
    R.component = A;
    let z = A.vnode.props;
    A.vnode = R, A.next = null, function($, B, G, j) {
      let { props: V, attrs: W, vnode: { patchFlag: X } } = $, J = xt(V), [et] = $.propsOptions, tt = !1;
      if ((j || X > 0) && !(16 & X)) {
        if (8 & X) {
          let ht = $.vnode.dynamicProps;
          for (let rt = 0; rt < ht.length; rt++) {
            let Mt = ht[rt];
            if (Ho($.emitsOptions, Mt)) continue;
            let Bt = B[Mt];
            if (et) if (wt(W, Mt)) Bt !== W[Mt] && (W[Mt] = Bt, tt = !0);
            else {
              let Ht = Tt(Mt);
              V[Ht] = Ol(et, J, Ht, Bt, $, !1);
            }
            else Bt !== W[Mt] && (W[Mt] = Bt, tt = !0);
          }
        }
      } else {
        let ht;
        for (let rt in fp($, B, V, W) && (tt = !0), J) B && (wt(B, rt) || (ht = Me(rt)) !== rt && wt(B, ht)) || (et ? G && (G[rt] !== void 0 || G[ht] !== void 0) && (V[rt] = Ol(et, J, rt, void 0, $, !0)) : delete V[rt]);
        if (W !== J) for (let rt in W) B && wt(B, rt) || (delete W[rt], tt = !0);
      }
      tt && ys($.attrs, "set", "");
    }(A, R.props, z, N), (($, B, G) => {
      let { vnode: j, slots: V } = $, W = !0, X = yt;
      if (32 & j.shapeFlag) {
        let J = B._;
        J ? G && J === 1 ? W = !1 : mp(V, B, G) : (W = !B.$stable, pp(B, V)), X = B;
      } else B && (gp($, B), X = { default: 1 });
      if (W) for (let J in V) Ec(J) || X[J] != null || delete V[J];
    })(A, R.children, N), Ps(), kh(A), Ts();
  }, F = (A, R, N, z, $, B, G, j, V = !1) => {
    let W = A && A.children, X = A ? A.shapeFlag : 0, J = R.children, { patchFlag: et, shapeFlag: tt } = R;
    if (et > 0) {
      if (128 & et) return void Y(W, J, N, z, $, B, G, j, V);
      if (256 & et) return void H(W, J, N, z, $, B, G, j, V);
    }
    8 & tt ? (16 & X && _t(W, $, B), J !== W && d(N, J)) : 16 & X ? 16 & tt ? Y(W, J, N, z, $, B, G, j, V) : _t(W, $, B, !0) : (8 & X && d(N, ""), 16 & tt && C(J, N, z, $, B, G, j, V));
  }, H = (A, R, N, z, $, B, G, j, V) => {
    let W;
    A = A || Zn, R = R || Zn;
    let X = A.length, J = R.length, et = Math.min(X, J);
    for (W = 0; W < et; W++) {
      let tt = R[W] = V ? ps(R[W]) : ke(R[W]);
      _(A[W], tt, N, null, $, B, G, j, V);
    }
    X > J ? _t(A, $, B, !0, !1, et) : C(R, N, z, $, B, G, j, V, et);
  }, Y = (A, R, N, z, $, B, G, j, V) => {
    let W = 0, X = R.length, J = A.length - 1, et = X - 1;
    for (; W <= J && W <= et; ) {
      let tt = A[W], ht = R[W] = V ? ps(R[W]) : ke(R[W]);
      if (Ve(tt, ht)) _(tt, ht, N, null, $, B, G, j, V);
      else break;
      W++;
    }
    for (; W <= J && W <= et; ) {
      let tt = A[J], ht = R[et] = V ? ps(R[et]) : ke(R[et]);
      if (Ve(tt, ht)) _(tt, ht, N, null, $, B, G, j, V);
      else break;
      J--, et--;
    }
    if (W > J) {
      if (W <= et) {
        let tt = et + 1, ht = tt < X ? R[tt].el : z;
        for (; W <= et; ) _(null, R[W] = V ? ps(R[W]) : ke(R[W]), N, ht, $, B, G, j, V), W++;
      }
    } else if (W > et) for (; W <= J; ) nt(A[W], $, B, !0), W++;
    else {
      let tt, ht = W, rt = W, Mt = /* @__PURE__ */ new Map();
      for (W = rt; W <= et; W++) {
        let Vt = R[W] = V ? ps(R[W]) : ke(R[W]);
        Vt.key != null && Mt.set(Vt.key, W);
      }
      let Bt = 0, Ht = et - rt + 1, Se = !1, Na = 0, sn = Array(Ht);
      for (W = 0; W < Ht; W++) sn[W] = 0;
      for (W = ht; W <= J; W++) {
        let Vt, Qt = A[W];
        if (Bt >= Ht) {
          nt(Qt, $, B, !0);
          continue;
        }
        if (Qt.key != null) Vt = Mt.get(Qt.key);
        else for (tt = rt; tt <= et; tt++) if (sn[tt - rt] === 0 && Ve(Qt, R[tt])) {
          Vt = tt;
          break;
        }
        Vt === void 0 ? nt(Qt, $, B, !0) : (sn[Vt - rt] = W + 1, Vt >= Na ? Na = Vt : Se = !0, _(Qt, R[Vt], N, null, $, B, G, j, V), Bt++);
      }
      let Es = Se ? function(Vt) {
        let Qt, _i, ye, Xe, nn, Bn = Vt.slice(), Ie = [0], Hm = Vt.length;
        for (Qt = 0; Qt < Hm; Qt++) {
          let Ba = Vt[Qt];
          if (Ba !== 0) {
            if (Vt[_i = Ie[Ie.length - 1]] < Ba) {
              Bn[Qt] = _i, Ie.push(Qt);
              continue;
            }
            for (ye = 0, Xe = Ie.length - 1; ye < Xe; ) Vt[Ie[nn = ye + Xe >> 1]] < Ba ? ye = nn + 1 : Xe = nn;
            Ba < Vt[Ie[ye]] && (ye > 0 && (Bn[Qt] = Ie[ye - 1]), Ie[ye] = Qt);
          }
        }
        for (ye = Ie.length, Xe = Ie[ye - 1]; ye-- > 0; ) Ie[ye] = Xe, Xe = Bn[Xe];
        return Ie;
      }(sn) : Zn;
      for (tt = Es.length - 1, W = Ht - 1; W >= 0; W--) {
        let Vt = rt + W, Qt = R[Vt], _i = R[Vt + 1], ye = Vt + 1 < X ? _i.el || function Xe(nn) {
          if (nn.placeholder) return nn.placeholder;
          let Bn = nn.component;
          return Bn ? Xe(Bn.subTree) : null;
        }(_i) : z;
        sn[W] === 0 ? _(null, Qt, N, ye, $, B, G, j, V) : Se && (tt < 0 || W !== Es[tt] ? Z(Qt, N, ye, 2) : tt--);
      }
    }
  }, Z = (A, R, N, z, $ = null) => {
    let { el: B, type: G, transition: j, children: V, shapeFlag: W } = A;
    if (6 & W) return void Z(A.component.subTree, R, N, z);
    if (128 & W) return void A.suspense.move(R, N, z);
    if (64 & W) return void G.move(A, R, N, at);
    if (G === ee) {
      a(B, R, N);
      for (let X = 0; X < V.length; X++) Z(V[X], R, N, z);
      a(A.anchor, R, N);
      return;
    }
    if (G === Sn) return void (({ el: X, anchor: J }, et, tt) => {
      let ht;
      for (; X && X !== J; ) ht = f(X), a(X, et, tt), X = ht;
      a(J, et, tt);
    })(A, R, N);
    if (z !== 2 && 1 & W && j) if (z === 0) j.beforeEnter(B), a(B, R, N), Yt(() => j.enter(B), $);
    else {
      let { leave: X, delayLeave: J, afterLeave: et } = j, tt = () => {
        A.ctx.isUnmounted ? o(B) : a(B, R, N);
      }, ht = () => {
        B._isLeaving && B[ss](!0), X(B, () => {
          tt(), et && et();
        });
      };
      J ? J(B, tt, ht) : ht();
    }
    else a(B, R, N);
  }, nt = (A, R, N, z = !1, $ = !1) => {
    let B, { type: G, props: j, ref: V, children: W, dynamicChildren: X, shapeFlag: J, patchFlag: et, dirs: tt, cacheIndex: ht, memo: rt } = A;
    if (et === -2 && ($ = !1), V != null && (Ps(), ai(V, null, N, A, !0), Ts()), ht != null && (R.renderCache[ht] = void 0), 256 & J) return void R.ctx.deactivate(A);
    let Mt = 1 & J && tt, Bt = !ks(A);
    if (Bt && (B = j && j.onVnodeBeforeUnmount) && Ce(B, R, A), 6 & J) pt(A.component, N, z);
    else {
      if (128 & J) return void A.suspense.unmount(N, z);
      Mt && es(A, null, R, "beforeUnmount"), 64 & J ? A.type.remove(A, R, N, at, z) : X && !X.hasOnce && (G !== ee || et > 0 && 64 & et) ? _t(X, R, N, !1, !0) : (G === ee && 384 & et || !$ && 16 & J) && _t(W, R, N), z && dt(A);
    }
    let Ht = rt != null && ht == null;
    (Bt && (B = j && j.onVnodeUnmounted) || Mt || Ht) && Yt(() => {
      B && Ce(B, R, A), Mt && es(A, null, R, "unmounted"), Ht && (A.el = null);
    }, N);
  }, dt = (A) => {
    let { type: R, el: N, anchor: z, transition: $ } = A;
    if (R === ee) return void lt(N, z);
    if (R === Sn) return void (({ el: G, anchor: j }) => {
      let V;
      for (; G && G !== j; ) V = f(G), o(G), G = V;
      o(j);
    })(A);
    let B = () => {
      o(N), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (1 & A.shapeFlag && $ && !$.persisted) {
      let { leave: G, delayLeave: j } = $, V = () => G(N, B);
      j ? j(A.el, B, V) : V();
    } else B();
  }, lt = (A, R) => {
    let N;
    for (; A !== R; ) N = f(A), o(A), A = N;
    o(R);
  }, pt = (A, R, N) => {
    let { bum: z, scope: $, job: B, subTree: G, um: j, m: V, a: W } = A;
    Vo(V), Vo(W), z && ti(z), $.stop(), B && (B.flags |= 8, nt(G, A, R, N)), j && Yt(j, R), Yt(() => {
      A.isUnmounted = !0;
    }, R);
  }, _t = (A, R, N, z = !1, $ = !1, B = 0) => {
    for (let G = B; G < A.length; G++) nt(A[G], R, N, z, $);
  }, K = (A) => {
    if (6 & A.shapeFlag) return K(A.component.subTree);
    if (128 & A.shapeFlag) return A.suspense.next();
    let R = f(A.anchor || A.el), N = R && R[Yf];
    return N ? f(N) : R;
  }, q = !1, U = (A, R, N) => {
    let z;
    A == null ? R._vnode && (nt(R._vnode, null, null, !0), z = R._vnode.component) : _(R._vnode || null, A, R, null, null, null, N), R._vnode = A, q || (q = !0, kh(z), Bo(), q = !1);
  }, at = { p: _, um: nt, m: Z, r: dt, mt: L, mc: C, pc: F, pbc: O, n: K, o: t };
  return e && ([n, i] = e(at)), { render: U, hydrate: n, createApp: (s = n, function(A, R = null) {
    ot(A) || (A = gt({}, A)), R == null || St(R) || (R = null);
    let N = cp(), z = /* @__PURE__ */ new WeakSet(), $ = [], B = !1, G = N.app = { _uid: Mb++, _component: A, _props: R, _container: null, _context: N, _instance: null, version: Ip, get config() {
      return N.config;
    }, set config(j) {
    }, use: (j, ...V) => (z.has(j) || (j && ot(j.install) ? (z.add(j), j.install(G, ...V)) : ot(j) && (z.add(j), j(G, ...V))), G), mixin: (j) => (N.mixins.includes(j) || N.mixins.push(j), G), component: (j, V) => V ? (N.components[j] = V, G) : N.components[j], directive: (j, V) => V ? (N.directives[j] = V, G) : N.directives[j], mount(j, V, W) {
      if (!B) {
        let X = G._ceVNode || It(A, R);
        return X.appContext = N, W === !0 ? W = "svg" : W === !1 && (W = void 0), V && s ? s(X, j) : U(X, j, W), B = !0, G._container = j, j.__vue_app__ = G, La(X.component);
      }
    }, onUnmount(j) {
      $.push(j);
    }, unmount() {
      B && (He($, G._instance, 16), U(null, G._container), delete G._container.__vue_app__);
    }, provide: (j, V) => (N.provides[j] = V, G), runWithContext(j) {
      let V = vn;
      vn = G;
      try {
        return j();
      } finally {
        vn = V;
      }
    } };
    return G;
  }) };
}
function Qr({ type: t, props: e }, s) {
  return s === "svg" && t === "foreignObject" || s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : s;
}
function an({ effect: t, job: e }, s) {
  s ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function _p(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Nc(t, e, s = !1) {
  let n = t.children, i = e.children;
  if (st(n) && st(i)) for (let a = 0; a < n.length; a++) {
    let o = n[a], r = i[a];
    1 & r.shapeFlag && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && ((r = i[a] = ps(i[a])).el = o.el), s || r.patchFlag === -2 || Nc(o, r)), r.type === Ys && (r.patchFlag === -1 && (r = i[a] = ps(r)), r.el = o.el), r.type !== Ut || r.el || (r.el = o.el);
  }
}
function Vo(t) {
  if (t) for (let e = 0; e < t.length; e++) t[e].flags |= 8;
}
let zo = (t) => t.__isSuspense, El = 0, Eb = { name: "Suspense", __isSuspense: !0, process(t, e, s, n, i, a, o, r, l, c) {
  if (t == null) (function(h, u, d, p, f, g, m, _, y) {
    let { p: b, o: { createElement: x } } = y, v = x("div"), k = h.suspense = $h(h, f, p, u, v, d, g, m, _, y);
    b(null, k.pendingBranch = h.ssContent, v, null, p, k, g, m), k.deps > 0 ? (qi(h, "onPending"), qi(h, "onFallback"), b(null, h.ssFallback, u, d, p, null, g, m), Kn(k, h.ssFallback)) : k.resolve(!1, !0);
  })(e, s, n, i, a, o, r, l, c);
  else {
    if (a && a.deps > 0 && !t.suspense.isInFallback) {
      e.suspense = t.suspense, e.suspense.vnode = e, e.el = t.el;
      return;
    }
    (function(h, u, d, p, f, g, m, _, { p: y, um: b, o: { createElement: x } }) {
      let v = u.suspense = h.suspense;
      v.vnode = u, u.el = h.el;
      let k = u.ssContent, S = u.ssFallback, { activeBranch: C, pendingBranch: D, isInFallback: O, isHydrating: I } = v;
      if (D) v.pendingBranch = k, Ve(D, k) ? (y(D, k, v.hiddenContainer, null, f, v, g, m, _), v.deps <= 0 ? v.resolve() : O && !I && (y(C, S, d, p, f, null, g, m, _), Kn(v, S))) : (v.pendingId = El++, I ? (v.isHydrating = !1, v.activeBranch = D) : b(D, f, v), v.deps = 0, v.effects.length = 0, v.hiddenContainer = x("div"), O ? (y(null, k, v.hiddenContainer, null, f, v, g, m, _), v.deps <= 0 ? v.resolve() : (y(C, S, d, p, f, null, g, m, _), Kn(v, S))) : C && Ve(C, k) ? (y(C, k, d, p, f, v, g, m, _), v.resolve(!0)) : (y(null, k, v.hiddenContainer, null, f, v, g, m, _), v.deps <= 0 && v.resolve()));
      else if (C && Ve(C, k)) y(C, k, d, p, f, v, g, m, _), Kn(v, k);
      else if (qi(u, "onPending"), v.pendingBranch = k, 512 & k.shapeFlag ? v.pendingId = k.component.suspenseId : v.pendingId = El++, y(null, k, v.hiddenContainer, null, f, v, g, m, _), v.deps <= 0) v.resolve();
      else {
        let { timeout: w, pendingId: E } = v;
        w > 0 ? setTimeout(() => {
          v.pendingId === E && v.fallback(S);
        }, w) : w === 0 && v.fallback(S);
      }
    })(t, e, s, n, i, o, r, l, c);
  }
}, hydrate: function(t, e, s, n, i, a, o, r, l) {
  let c = e.suspense = $h(e, n, s, t.parentNode, document.createElement("div"), null, i, a, o, r, !0), h = l(t, c.pendingBranch = e.ssContent, s, c, a, o);
  return c.deps === 0 && c.resolve(!1, !0), h;
}, normalize: function(t) {
  let { shapeFlag: e, children: s } = t, n = 32 & e;
  t.ssContent = jh(n ? s.default : s), t.ssFallback = n ? jh(s.fallback) : It(Ut);
} };
function qi(t, e) {
  let s = t.props && t.props[e];
  ot(s) && s();
}
function $h(t, e, s, n, i, a, o, r, l, c, h = !1) {
  var u;
  let d, p, { p: f, m: g, um: m, n: _, o: { parentNode: y, remove: b } } = c, x = (d = (u = t).props && u.props.suspensible) != null && d !== !1;
  x && e && e.pendingBranch && (p = e.pendingId, e.deps++);
  let v = t.props ? ei(t.props.timeout) : void 0, k = a, S = { vnode: t, parent: e, parentComponent: s, namespace: o, container: n, hiddenContainer: i, deps: 0, pendingId: El++, timeout: typeof v == "number" ? v : -1, activeBranch: null, isFallbackMountPending: !1, pendingBranch: null, isInFallback: !h, isHydrating: h, isUnmounted: !1, effects: [], resolve(C = !1, D = !1) {
    let { vnode: O, activeBranch: I, pendingBranch: w, pendingId: E, effects: L, parentComponent: P, container: M, isInFallback: T } = S, F = !1;
    S.isHydrating ? S.isHydrating = !1 : !C && ((F = I && w.transition && w.transition.mode === "out-in") && (I.transition.afterLeave = () => {
      E === S.pendingId && (g(w, M, a === k ? _(I) : a, 0), oa(L), T && O.ssFallback && (O.ssFallback.el = null));
    }), I && !S.isFallbackMountPending && (y(I.el) === M && (a = _(I)), m(I, P, S, !0), !F && T && O.ssFallback && Yt(() => O.ssFallback.el = null, S)), F || g(w, M, a, 0)), S.isFallbackMountPending = !1, Kn(S, w), S.pendingBranch = null, S.isInFallback = !1;
    let H = S.parent, Y = !1;
    for (; H; ) {
      if (H.pendingBranch) {
        H.effects.push(...L), Y = !0;
        break;
      }
      H = H.parent;
    }
    Y || F || oa(L), S.effects = [], x && e && e.pendingBranch && p === e.pendingId && (e.deps--, e.deps !== 0 || D || e.resolve()), qi(O, "onResolve");
  }, fallback(C) {
    if (!S.pendingBranch) return;
    let { vnode: D, activeBranch: O, parentComponent: I, container: w, namespace: E } = S;
    qi(D, "onFallback");
    let L = _(O), P = () => {
      S.isFallbackMountPending = !1, S.isInFallback && (f(null, C, w, L, I, null, E, r, l), Kn(S, C));
    }, M = C.transition && C.transition.mode === "out-in";
    M && (S.isFallbackMountPending = !0, O.transition.afterLeave = P), S.isInFallback = !0, m(O, I, null, !0), M || P();
  }, move(C, D, O) {
    S.activeBranch && g(S.activeBranch, C, D, O), S.container = C;
  }, next: () => S.activeBranch && _(S.activeBranch), registerDep(C, D, O) {
    let I = !!S.pendingBranch;
    I && S.deps++;
    let w = C.vnode.el;
    C.asyncDep.catch((E) => {
      In(E, C, 0);
    }).then((E) => {
      if (C.isUnmounted || S.isUnmounted || S.pendingId !== C.suspenseId) return;
      ua(), C.asyncResolved = !0;
      let { vnode: L } = C;
      Fl(C, E, !1), w && (L.el = w);
      let P = !w && C.subTree.el;
      D(C, L, y(w || C.subTree.el), w ? null : _(C.subTree), S, o, O), P && (L.placeholder = null, b(P)), Rr(C, L.el), I && --S.deps == 0 && S.resolve();
    });
  }, unmount(C, D) {
    S.isUnmounted = !0, S.activeBranch && m(S.activeBranch, s, C, D), S.pendingBranch && m(S.pendingBranch, s, C, D);
  } };
  return S;
}
function jh(t) {
  let e;
  if (ot(t)) {
    let s = An && t._c;
    s && (t._d = !1, ca()), t = t(), s && (t._d = !0, e = fe, vp());
  }
  return st(t) && (t = function(s) {
    let n;
    for (let i = 0; i < s.length; i++) {
      let a = s[i];
      if (!Rs(a)) return;
      if (a.type !== Ut || a.children === "v-if") {
        if (n) return;
        n = a;
      }
    }
    return n;
  }(t)), t = ke(t), e && !t.dynamicChildren && (t.dynamicChildren = e.filter((s) => s !== t)), t;
}
function xp(t, e) {
  e && e.pendingBranch ? st(t) ? e.effects.push(...t) : e.effects.push(t) : oa(t);
}
function Kn(t, e) {
  t.activeBranch = e;
  let { vnode: s, parentComponent: n } = t, i = e.el;
  for (; !i && e.component; ) i = (e = e.component.subTree).el;
  s.el = i, n && n.subTree === s && (n.vnode.el = i, Rr(n, i));
}
let ee = Symbol.for("v-fgt"), Ys = Symbol.for("v-txt"), Ut = Symbol.for("v-cmt"), Sn = Symbol.for("v-stc"), Yi = [], fe = null;
function ca(t = !1) {
  Yi.push(fe = t ? null : []);
}
function vp() {
  Yi.pop(), fe = Yi[Yi.length - 1] || null;
}
let An = 1;
function ha(t, e = !1) {
  An += t, t < 0 && fe && e && (fe.hasOnce = !0);
}
function Sp(t) {
  return t.dynamicChildren = An > 0 ? fe || Zn : null, vp(), An > 0 && fe && fe.push(t), t;
}
function Fb(t, e, s, n, i, a) {
  return Sp(Bc(t, e, s, n, i, a, !0));
}
function Go(t, e, s, n, i) {
  return Sp(It(t, e, s, n, i, !0));
}
function Rs(t) {
  return !!t && t.__v_isVNode === !0;
}
function Ve(t, e) {
  return t.type === e.type && t.key === e.key;
}
function Ib(t) {
}
let wp = ({ key: t }) => t ?? null, vo = ({ ref: t, ref_key: e, ref_for: s }) => (typeof t == "number" && (t = "" + t), t != null ? ct(t) || Xt(t) || ot(t) ? { i: oe, r: t, k: e, f: !!s } : t : null);
function Bc(t, e = null, s = null, n = 0, i = null, a = +(t !== ee), o = !1, r = !1) {
  let l = { __v_isVNode: !0, __v_skip: !0, type: t, props: e, key: e && wp(e), ref: e && vo(e), scopeId: Mr, slotScopeIds: null, children: s, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: a, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: oe };
  return r ? (jc(l, s), 128 & a && t.normalize(l)) : s && (l.shapeFlag |= ct(s) ? 8 : 16), An > 0 && !o && fe && (l.patchFlag > 0 || 6 & a) && l.patchFlag !== 32 && fe.push(l), l;
}
let It = function(t, e = null, s = null, n = 0, i = null, a = !1) {
  var o;
  if (t && t !== rp || (t = Ut), Rs(t)) {
    let l = rs(t, e, !0);
    return s && jc(l, s), An > 0 && !a && fe && (6 & l.shapeFlag ? fe[fe.indexOf(t)] = l : fe.push(l)), l.patchFlag = -2, l;
  }
  if (ot(o = t) && "__vccOpts" in o && (t = t.__vccOpts), e) {
    let { class: l, style: c } = e = Cp(e);
    l && !ct(l) && (e.class = Ma(l)), St(c) && (Aa(c) && !st(c) && (c = gt({}, c)), e.style = ka(c));
  }
  let r = ct(t) ? 1 : zo(t) ? 128 : t.__isTeleport ? 64 : St(t) ? 4 : 2 * !!ot(t);
  return Bc(t, e, s, n, i, r, a, !0);
};
function Cp(t) {
  return t ? Aa(t) || dp(t) ? gt({}, t) : t : null;
}
function rs(t, e, s = !1, n = !1) {
  let { props: i, ref: a, patchFlag: o, children: r, transition: l } = t, c = e ? Mp(i || {}, e) : i, h = { __v_isVNode: !0, __v_skip: !0, type: t.type, props: c, key: c && wp(c), ref: e && e.ref ? s && a ? st(a) ? a.concat(vo(e)) : [a, vo(e)] : vo(e) : a, scopeId: t.scopeId, slotScopeIds: t.slotScopeIds, children: r, target: t.target, targetStart: t.targetStart, targetAnchor: t.targetAnchor, staticCount: t.staticCount, shapeFlag: t.shapeFlag, patchFlag: e && t.type !== ee ? o === -1 ? 16 : 16 | o : o, dynamicProps: t.dynamicProps, dynamicChildren: t.dynamicChildren, appContext: t.appContext, dirs: t.dirs, transition: l, component: t.component, suspense: t.suspense, ssContent: t.ssContent && rs(t.ssContent), ssFallback: t.ssFallback && rs(t.ssFallback), placeholder: t.placeholder, el: t.el, anchor: t.anchor, ctx: t.ctx, ce: t.ce };
  return l && n && Ds(h, l.clone(h)), h;
}
function $c(t = " ", e = 0) {
  return It(Ys, null, t, e);
}
function Nb(t, e) {
  let s = It(Sn, null, t);
  return s.staticCount = e, s;
}
function kp(t = "", e = !1) {
  return e ? (ca(), Go(Ut, null, t)) : It(Ut, null, t);
}
function ke(t) {
  return t == null || typeof t == "boolean" ? It(Ut) : st(t) ? It(ee, null, t.slice()) : Rs(t) ? ps(t) : It(Ys, null, String(t));
}
function ps(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : rs(t);
}
function jc(t, e) {
  let s = 0, { shapeFlag: n } = t;
  if (e == null) e = null;
  else if (st(e)) s = 16;
  else if (typeof e == "object") if (65 & n) {
    let i = e.default;
    i && (i._c && (i._d = !1), jc(t, i()), i._c && (i._d = !0));
    return;
  } else {
    s = 32;
    let i = e._;
    i || dp(e) ? i === 3 && oe && (oe.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024)) : e._ctx = oe;
  }
  else ot(e) ? (e = { default: e, _ctx: oe }, s = 32) : (e = String(e), 64 & n ? (s = 16, e = [$c(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function Mp(...t) {
  let e = {};
  for (let s = 0; s < t.length; s++) {
    let n = t[s];
    for (let i in n) if (i === "class") e.class !== n.class && (e.class = Ma([e.class, n.class]));
    else if (i === "style") e.style = ka([e.style, n.style]);
    else if (En(i)) {
      let a = e[i], o = n[i];
      o && a !== o && !(st(a) && a.includes(o)) ? e[i] = a ? [].concat(a, o) : o : o != null || a != null || pr(i) || (e[i] = o);
    } else i !== "" && (e[i] = n[i]);
  }
  return e;
}
function Ce(t, e, s, n = null) {
  He(t, e, 7, [s, n]);
}
let Bb = cp(), $b = 0;
function Ap(t, e, s) {
  let n = t.type, i = (e ? e.appContext : t.appContext) || Bb, a = { uid: $b++, vnode: t, type: n, parent: e, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new xc(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: e ? e.provides : Object.create(i.provides), ids: e ? e.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: function o(r, l, c = !1) {
    let h = c ? Lb : l.propsCache, u = h.get(r);
    if (u) return u;
    let d = r.props, p = {}, f = [], g = !1;
    if (!ot(r)) {
      let _ = (y) => {
        g = !0;
        let [b, x] = o(y, l, !0);
        gt(p, b), x && f.push(...x);
      };
      !c && l.mixins.length && l.mixins.forEach(_), r.extends && _(r.extends), r.mixins && r.mixins.forEach(_);
    }
    if (!d && !g) return St(r) && h.set(r, Zn), Zn;
    if (st(d)) for (let _ = 0; _ < d.length; _++) {
      let y = Tt(d[_]);
      Bh(y) && (p[y] = yt);
    }
    else if (d) for (let _ in d) {
      let y = Tt(_);
      if (Bh(y)) {
        let b = d[_], x = p[y] = st(b) || ot(b) ? { type: b } : gt({}, b), v = x.type, k = !1, S = !0;
        if (st(v)) for (let C = 0; C < v.length; ++C) {
          let D = v[C], O = ot(D) && D.name;
          if (O === "Boolean") {
            k = !0;
            break;
          }
          O === "String" && (S = !1);
        }
        else k = ot(v) && v.name === "Boolean";
        x[0] = k, x[1] = S, (k || wt(x, "default")) && f.push(y);
      }
    }
    let m = [p, f];
    return St(r) && h.set(r, m), m;
  }(n, i), emitsOptions: function o(r, l, c = !1) {
    let h = c ? Tb : l.emitsCache, u = h.get(r);
    if (u !== void 0) return u;
    let d = r.emits, p = {}, f = !1;
    if (!ot(r)) {
      let g = (m) => {
        let _ = o(m, l, !0);
        _ && (f = !0, gt(p, _));
      };
      !c && l.mixins.length && l.mixins.forEach(g), r.extends && g(r.extends), r.mixins && r.mixins.forEach(g);
    }
    return d || f ? (st(d) ? d.forEach((g) => p[g] = null) : gt(p, d), St(r) && h.set(r, p), p) : (St(r) && h.set(r, null), null);
  }(n, i), emit: null, emitted: null, propsDefaults: yt, inheritAttrs: n.inheritAttrs, ctx: yt, data: yt, props: yt, attrs: yt, slots: yt, refs: yt, setupState: yt, setupContext: null, suspense: s, suspenseId: s ? s.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return a.ctx = { _: a }, a.root = e ? e.root : a, a.emit = Pb.bind(null, a), t.ce && t.ce(a), a;
}
let ae = null, ve = () => ae || oe;
{
  let t = br(), e = (s, n) => {
    let i;
    return (i = t[s]) || (i = t[s] = []), i.push(n), (a) => {
      i.length > 1 ? i.forEach((o) => o(a)) : i[0](a);
    };
  };
  Oo = e("__VUE_INSTANCE_SETTERS__", (s) => ae = s), Jn = e("__VUE_SSR_SETTERS__", (s) => Pn = s);
}
let bi = (t) => {
  let e = ae;
  return Oo(t), t.scope.on(), () => {
    t.scope.off(), Oo(e);
  };
}, ua = () => {
  ae && ae.scope.off(), Oo(null);
};
function Pp(t) {
  return 4 & t.vnode.shapeFlag;
}
let Pn = !1;
function Tp(t, e = !1, s = !1) {
  e && Jn(e);
  let { props: n, children: i } = t.vnode, a = Pp(t);
  (function(c, h, u, d = !1) {
    let p = {}, f = Object.create(Ll);
    for (let g in c.propsDefaults = /* @__PURE__ */ Object.create(null), fp(c, h, p, f), c.propsOptions[0]) g in p || (p[g] = void 0);
    u ? c.props = d ? p : Ef(p) : c.type.props ? c.props = p : c.props = f, c.attrs = f;
  })(t, n, a, e);
  var o = s || e;
  let r = t.slots = Object.create(Ll);
  if (32 & t.vnode.shapeFlag) {
    let c = i._;
    c ? (mp(r, i, o), o && gf(r, "_", c, !0)) : pp(i, r);
  } else i && gp(t, i);
  let l = a ? function(c, h) {
    let u = c.type;
    c.accessCache = /* @__PURE__ */ Object.create(null), c.proxy = new Proxy(c.ctx, Pl);
    let { setup: d } = u;
    if (d) {
      Ps();
      let p = c.setupContext = d.length > 1 ? Lp(c) : null, f = bi(c), g = yi(d, c, 0, [c.props, p]), m = _c(g);
      if (Ts(), f(), (m || c.sp) && !ks(c) && Tc(c), m) {
        if (g.then(ua, ua), h) return g.then((_) => {
          Fl(c, _, h);
        }).catch((_) => {
          In(_, c, 0);
        });
        c.asyncDep = g;
      } else Fl(c, g, h);
    } else Rp(c, h);
  }(t, e) : void 0;
  return e && Jn(!1), l;
}
function Fl(t, e, s) {
  ot(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : St(e) && (t.setupState = wc(e)), Rp(t, s);
}
function Dp(t) {
  Eo = t, wl = (e) => {
    e.render._rc && (e.withProxy = new Proxy(e.ctx, ub));
  };
}
let jb = () => !Eo;
function Rp(t, e, s) {
  let n = t.type;
  if (!t.render) {
    if (!e && Eo && !n.render) {
      let i = n.template || Dl(t).template;
      if (i) {
        let { isCustomElement: a, compilerOptions: o } = t.appContext.config, { delimiters: r, compilerOptions: l } = n, c = gt(gt({ isCustomElement: a, delimiters: r }, o), l);
        n.render = Eo(i, c);
      }
    }
    t.render = n.render || ie, wl && wl(t);
  }
  {
    let i = bi(t);
    Ps();
    try {
      (function(a) {
        let o = Dl(a), r = a.proxy, l = a.ctx;
        Tl = !1, o.beforeCreate && Eh(o.beforeCreate, a, "bc");
        let { data: c, computed: h, methods: u, watch: d, provide: p, inject: f, created: g, beforeMount: m, mounted: _, beforeUpdate: y, updated: b, activated: x, deactivated: v, beforeUnmount: k, unmounted: S, render: C, renderTracked: D, renderTriggered: O, errorCaptured: I, serverPrefetch: w, expose: E, inheritAttrs: L, components: P, directives: M } = o;
        if (f && function(F, H) {
          for (let Y in st(F) && (F = Rl(F)), F) {
            let Z, nt = F[Y];
            Xt(Z = St(nt) ? "default" in nt ? Gi(nt.from || Y, nt.default, !0) : Gi(nt.from || Y) : Gi(nt)) ? Object.defineProperty(H, Y, { enumerable: !0, configurable: !0, get: () => Z.value, set: (dt) => Z.value = dt }) : H[Y] = Z;
          }
        }(f, l), u) for (let F in u) {
          let H = u[F];
          ot(H) && (l[F] = H.bind(r));
        }
        if (c) {
          let F = c.call(r, r);
          St(F) && (a.data = Cr(F));
        }
        if (Tl = !0, h) for (let F in h) {
          let H = h[F], Y = ot(H) ? H.bind(r, r) : ot(H.get) ? H.get.bind(r, r) : ie, Z = Op({ get: Y, set: !ot(H) && ot(H.set) ? H.set.bind(r) : ie });
          Object.defineProperty(l, F, { enumerable: !0, configurable: !0, get: () => Z.value, set: (nt) => Z.value = nt });
        }
        if (d) for (let F in d) (function H(Y, Z, nt, dt) {
          let lt = dt.includes(".") ? qf(nt, dt) : () => nt[dt];
          if (ct(Y)) {
            let pt = Z[Y];
            ot(pt) && ii(lt, pt);
          } else if (ot(Y)) ii(lt, Y.bind(nt));
          else if (St(Y)) if (st(Y)) Y.forEach((pt) => H(pt, Z, nt, dt));
          else {
            let pt = ot(Y.handler) ? Y.handler.bind(nt) : Z[Y.handler];
            ot(pt) && ii(lt, pt, Y);
          }
        })(d[F], l, r, F);
        if (p) {
          let F = ot(p) ? p.call(r) : p;
          Reflect.ownKeys(F).forEach((H) => {
            Vf(H, F[H]);
          });
        }
        function T(F, H) {
          st(H) ? H.forEach((Y) => F(Y.bind(r))) : H && F(H.bind(r));
        }
        if (g && Eh(g, a, "c"), T(sp, m), T(Ra, _), T(Dc, y), T(Pr, b), T(Qf, x), T(tp, v), T(op, I), T(ap, D), T(ip, O), T(Tr, k), T(Dr, S), T(np, w), st(E)) if (E.length) {
          let F = a.exposed || (a.exposed = {});
          E.forEach((H) => {
            Object.defineProperty(F, H, { get: () => r[H], set: (Y) => r[H] = Y, enumerable: !0 });
          });
        } else a.exposed || (a.exposed = {});
        C && a.render === ie && (a.render = C), L != null && (a.inheritAttrs = L), P && (a.components = P), M && (a.directives = M), w && Tc(a);
      })(t);
    } finally {
      Ts(), i();
    }
  }
}
let Wb = { get: (t, e) => (ue(t, "get", ""), t[e]) };
function Lp(t) {
  return { attrs: new Proxy(t.attrs, Wb), slots: t.slots, emit: t.emit, expose: (e) => {
    t.exposed = e || {};
  } };
}
function La(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(wc(Ff(t.exposed)), { get: (e, s) => s in e ? e[s] : s in Ui ? Ui[s](t) : void 0, has: (e, s) => s in e || s in Ui })) : t.proxy;
}
function Il(t, e = !0) {
  return ot(t) ? t.displayName || t.name : t.name || e && t.__name;
}
let Op = (t, e) => function(s, n = !1) {
  let i, a;
  return ot(s) ? i = s : (i = s.get, a = s.set), new Ry(i, a, n);
}(t, Pn);
function Ep(t, e, s) {
  try {
    ha(-1);
    let n = arguments.length;
    return n !== 2 ? (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Rs(s) && (s = [s]), It(t, e, s)) : !St(e) || st(e) ? It(t, null, e) : Rs(e) ? It(t, null, [e]) : It(t, e);
  } finally {
    ha(1);
  }
}
function Hb() {
}
function Vb(t, e, s, n) {
  let i = s[n];
  if (i && Fp(i, t)) return i;
  let a = e();
  return a.memo = t.slice(), a.cacheIndex = n, s[n] = a;
}
function Fp(t, e) {
  let s = t.memo;
  if (s.length != e.length) return !1;
  for (let n = 0; n < s.length; n++) if (ne(s[n], e[n])) return !1;
  return An > 0 && fe && fe.push(t), !0;
}
let Ip = "3.5.33", zb = ie, Gb = null, Ub, qb = ie, Yb = { createComponentInstance: Ap, setupComponent: Tp, renderComponentRoot: xo, setCurrentRenderingInstance: ra, isVNode: Rs, normalizeVNode: ke, getComponentPublicInstance: La, ensureValidVNode: Oc, pushWarningContext: function(t) {
}, popWarningContext: function() {
} }, Kb = null, Xb = null, Jb = null, Wh = "u" > typeof window && window.trustedTypes;
if (Wh) try {
  Cl = Wh.createPolicy("vue", { createHTML: (t) => t });
} catch {
}
let Np = Cl ? (t) => Cl.createHTML(t) : (t) => t, fs = "u" > typeof document ? document : null, Hh = fs && fs.createElement("template"), Bp = { insert: (t, e, s) => {
  e.insertBefore(t, s || null);
}, remove: (t) => {
  let e = t.parentNode;
  e && e.removeChild(t);
}, createElement: (t, e, s, n) => {
  let i = e === "svg" ? fs.createElementNS("http://www.w3.org/2000/svg", t) : e === "mathml" ? fs.createElementNS("http://www.w3.org/1998/Math/MathML", t) : s ? fs.createElement(t, { is: s }) : fs.createElement(t);
  return t === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
}, createText: (t) => fs.createTextNode(t), createComment: (t) => fs.createComment(t), setText: (t, e) => {
  t.nodeValue = e;
}, setElementText: (t, e) => {
  t.textContent = e;
}, parentNode: (t) => t.parentNode, nextSibling: (t) => t.nextSibling, querySelector: (t) => fs.querySelector(t), setScopeId(t, e) {
  t.setAttribute(e, "");
}, insertStaticContent(t, e, s, n, i, a) {
  let o = s ? s.previousSibling : e.lastChild;
  if (i && (i === a || i.nextSibling)) for (; e.insertBefore(i.cloneNode(!0), s), i !== a && (i = i.nextSibling); ) ;
  else {
    Hh.innerHTML = Np(n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t);
    let r = Hh.content;
    if (n === "svg" || n === "mathml") {
      let l = r.firstChild;
      for (; l.firstChild; ) r.appendChild(l.firstChild);
      r.removeChild(l);
    }
    e.insertBefore(r, s);
  }
  return [o ? o.nextSibling : e.firstChild, s ? s.previousSibling : e.lastChild];
} }, Fs = "transition", Ci = "animation", ci = Symbol("_vtc"), $p = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, jp = gt({}, Ac, $p), Zb = ((sl = (t, { slots: e }) => Ep(Jf, Wp(t), e)).displayName = "Transition", sl.props = jp, sl), on = (t, e = []) => {
  st(t) ? t.forEach((s) => s(...e)) : t && t(...e);
}, Vh = (t) => !!t && (st(t) ? t.some((e) => e.length > 1) : t.length > 1);
function Wp(t) {
  let e = {};
  for (let w in t) w in $p || (e[w] = t[w]);
  if (t.css === !1) return e;
  let { name: s = "v", type: n, duration: i, enterFromClass: a = `${s}-enter-from`, enterActiveClass: o = `${s}-enter-active`, enterToClass: r = `${s}-enter-to`, appearFromClass: l = a, appearActiveClass: c = o, appearToClass: h = r, leaveFromClass: u = `${s}-leave-from`, leaveActiveClass: d = `${s}-leave-active`, leaveToClass: p = `${s}-leave-to` } = t, f = function(w) {
    if (w == null) return null;
    {
      if (St(w)) return [function(L) {
        return ei(L);
      }(w.enter), function(L) {
        return ei(L);
      }(w.leave)];
      let E = function(L) {
        return ei(L);
      }(w);
      return [E, E];
    }
  }(i), g = f && f[0], m = f && f[1], { onBeforeEnter: _, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: v, onBeforeAppear: k = _, onAppear: S = y, onAppearCancelled: C = b } = e, D = (w, E, L, P) => {
    w._enterCancelled = P, $s(w, E ? h : r), $s(w, E ? c : o), L && L();
  }, O = (w, E) => {
    w._isLeaving = !1, $s(w, u), $s(w, p), $s(w, d), E && E();
  }, I = (w) => (E, L) => {
    let P = w ? S : y, M = () => D(E, w, L);
    on(P, [E, M]), zh(() => {
      $s(E, w ? l : a), Je(E, w ? h : r), Vh(P) || Gh(E, n, g, M);
    });
  };
  return gt(e, { onBeforeEnter(w) {
    on(_, [w]), Je(w, a), Je(w, o);
  }, onBeforeAppear(w) {
    on(k, [w]), Je(w, l), Je(w, c);
  }, onEnter: I(!1), onAppear: I(!0), onLeave(w, E) {
    w._isLeaving = !0;
    let L = () => O(w, E);
    Je(w, u), w._enterCancelled ? (Je(w, d), Nl(w)) : (Nl(w), Je(w, d)), zh(() => {
      w._isLeaving && ($s(w, u), Je(w, p), Vh(x) || Gh(w, n, m, L));
    }), on(x, [w, L]);
  }, onEnterCancelled(w) {
    D(w, !1, void 0, !0), on(b, [w]);
  }, onAppearCancelled(w) {
    D(w, !0, void 0, !0), on(C, [w]);
  }, onLeaveCancelled(w) {
    O(w), on(v, [w]);
  } });
}
function Je(t, e) {
  e.split(/\s+/).forEach((s) => s && t.classList.add(s)), (t[ci] || (t[ci] = /* @__PURE__ */ new Set())).add(e);
}
function $s(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.remove(n));
  let s = t[ci];
  s && (s.delete(e), s.size || (t[ci] = void 0));
}
function zh(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Qb = 0;
function Gh(t, e, s, n) {
  let i = t._endId = ++Qb, a = () => {
    i === t._endId && n();
  };
  if (s != null) return setTimeout(a, s);
  let { type: o, timeout: r, propCount: l } = Hp(t, e);
  if (!o) return n();
  let c = o + "end", h = 0, u = () => {
    t.removeEventListener(c, d), a();
  }, d = (p) => {
    p.target === t && ++h >= l && u();
  };
  setTimeout(() => {
    h < l && u();
  }, r + 1), t.addEventListener(c, d);
}
function Hp(t, e) {
  let s = window.getComputedStyle(t), n = (f) => (s[f] || "").split(", "), i = n(`${Fs}Delay`), a = n(`${Fs}Duration`), o = Uh(i, a), r = n(`${Ci}Delay`), l = n(`${Ci}Duration`), c = Uh(r, l), h = null, u = 0, d = 0;
  e === Fs ? o > 0 && (h = Fs, u = o, d = a.length) : e === Ci ? c > 0 && (h = Ci, u = c, d = l.length) : d = (h = (u = Math.max(o, c)) > 0 ? o > c ? Fs : Ci : null) ? h === Fs ? a.length : l.length : 0;
  let p = h === Fs && /\b(?:transform|all)(?:,|$)/.test(n(`${Fs}Property`).toString());
  return { type: h, timeout: u, propCount: d, hasTransform: p };
}
function Uh(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((s, n) => qh(s) + qh(t[n])));
}
function qh(t) {
  return t === "auto" ? 0 : 1e3 * Number(t.slice(0, -1).replace(",", "."));
}
function Nl(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight;
}
let Uo = Symbol("_vod"), Vp = Symbol("_vsh"), zp = { name: "show", beforeMount(t, { value: e }, { transition: s }) {
  t[Uo] = t.style.display === "none" ? "" : t.style.display, s && e ? s.beforeEnter(t) : ki(t, e);
}, mounted(t, { value: e }, { transition: s }) {
  s && e && s.enter(t);
}, updated(t, { value: e, oldValue: s }, { transition: n }) {
  !e != !s && (n ? e ? (n.beforeEnter(t), ki(t, !0), n.enter(t)) : n.leave(t, () => {
    ki(t, !1);
  }) : ki(t, e));
}, beforeUnmount(t, { value: e }) {
  ki(t, e);
} };
function ki(t, e) {
  t.style.display = e ? t[Uo] : "none", t[Vp] = !e;
}
let Gp = Symbol("");
function t0(t) {
  let e = ve();
  if (!e) return;
  let s = e.ut = (i = t(e.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach((a) => Ua(a, i));
  }, n = () => {
    let i = t(e.proxy);
    e.ce ? Ua(e.ce, i) : function a(o, r) {
      if (128 & o.shapeFlag) {
        let l = o.suspense;
        o = l.activeBranch, l.pendingBranch && !l.isHydrating && l.effects.push(() => {
          a(l.activeBranch, r);
        });
      }
      for (; o.component; ) o = o.component.subTree;
      if (1 & o.shapeFlag && o.el) Ua(o.el, r);
      else if (o.type === ee) o.children.forEach((l) => a(l, r));
      else if (o.type === Sn) {
        let { el: l, anchor: c } = o;
        for (; l && (Ua(l, r), l !== c); ) l = l.nextSibling;
      }
    }(e.subTree, i), s(i);
  };
  Dc(() => {
    oa(n);
  }), Ra(() => {
    ii(n, ie, { flush: "post" });
    let i = new MutationObserver(n);
    i.observe(e.subTree.el.parentNode, { childList: !0 }), Dr(() => i.disconnect());
  });
}
function Ua(t, e) {
  if (t.nodeType === 1) {
    let n = t.style, i = "";
    for (let a in e) {
      var s;
      let o = (s = e[a]) == null ? "initial" : typeof s == "string" ? s === "" ? " " : s : String(s);
      n.setProperty(`--${a}`, o), i += `--${a}: ${o};`;
    }
    n[Gp] = i;
  }
}
let e0 = /(?:^|;)\s*display\s*:/, Yh = /\s*!important$/;
function Oi(t, e, s) {
  if (st(s)) s.forEach((n) => Oi(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--")) t.setProperty(e, s);
  else {
    let n = function(i, a) {
      let o = tl[a];
      if (o) return o;
      let r = Tt(a);
      if (r !== "filter" && r in i) return tl[a] = r;
      r = Fn(r);
      for (let l = 0; l < Kh.length; l++) {
        let c = Kh[l] + r;
        if (c in i) return tl[a] = c;
      }
      return a;
    }(t, e);
    Yh.test(s) ? t.setProperty(Me(n), s.replace(Yh, ""), "important") : t[n] = s;
  }
}
let Kh = ["Webkit", "Moz", "ms"], tl = {}, Xh = "http://www.w3.org/1999/xlink";
function Jh(t, e, s, n, i, a = iy(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(Xh, e.slice(6, e.length)) : t.setAttributeNS(Xh, e, s) : s == null || a && !(s || s === "") ? t.removeAttribute(e) : t.setAttribute(e, a ? "" : ge(s) ? String(s) : s);
}
function Zh(t, e, s, n, i) {
  if (e === "innerHTML" || e === "textContent") {
    s != null && (t[e] = e === "innerHTML" ? Np(s) : s);
    return;
  }
  let a = t.tagName;
  if (e === "value" && a !== "PROGRESS" && !a.includes("-")) {
    let l = a === "OPTION" ? t.getAttribute("value") || "" : t.value, c = s == null ? t.type === "checkbox" ? "on" : "" : String(s);
    l === c && "_value" in t || (t.value = c), s == null && t.removeAttribute(e), t._value = s;
    return;
  }
  let o = !1;
  if (s === "" || s == null) {
    let l = typeof t[e];
    if (l === "boolean") {
      var r;
      s = !!(r = s) || r === "";
    } else s == null && l === "string" ? (s = "", o = !0) : l === "number" && (s = 0, o = !0);
  }
  try {
    t[e] = s;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function _s(t, e, s, n) {
  t.addEventListener(e, s, n);
}
let Qh = Symbol("_vei"), tu = /(?:Once|Passive|Capture)$/, el = 0, s0 = Promise.resolve(), eu = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && 123 > t.charCodeAt(2), Up = (t, e, s, n, i, a) => {
  let o = i === "svg";
  if (e === "class") {
    var r;
    let l;
    r = n, (l = t[ci]) && (r = (r ? [r, ...l] : [...l]).join(" ")), r == null ? t.removeAttribute("class") : o ? t.setAttribute("class", r) : t.className = r;
  } else e === "style" ? function(l, c, h) {
    let u = l.style, d = ct(h), p = !1;
    if (h && !d) {
      if (c) if (ct(c)) for (let y of c.split(";")) {
        let b = y.slice(0, y.indexOf(":")).trim();
        h[b] == null && Oi(u, b, "");
      }
      else for (let y in c) h[y] == null && Oi(u, y, "");
      for (let y in h) {
        var f, g, m, _;
        y === "display" && (p = !0);
        let b = h[y];
        b != null ? (f = l, g = y, m = !ct(c) && c ? c[y] : void 0, _ = b, f.tagName === "TEXTAREA" && (g === "width" || g === "height") && ct(_) && m === _ || Oi(u, y, b)) : Oi(u, y, "");
      }
    } else if (d) {
      if (c !== h) {
        let y = u[Gp];
        y && (h += ";" + y), u.cssText = h, p = e0.test(h);
      }
    } else c && l.removeAttribute("style");
    Uo in l && (l[Uo] = p ? u.display : "", l[Vp] && (u.display = "none"));
  }(t, s, n) : En(e) ? pr(e) || function(l, c, h, u = null) {
    let d = l[Qh] || (l[Qh] = {}), p = d[c];
    if (h && p) p.value = h;
    else {
      let [m, _] = function(y) {
        let b;
        if (tu.test(y)) {
          let x;
          for (b = {}; x = y.match(tu); ) y = y.slice(0, y.length - x[0].length), b[x[0].toLowerCase()] = !0;
        }
        return [y[2] === ":" ? y.slice(3) : Me(y.slice(2)), b];
      }(c);
      if (h) {
        var f, g;
        let y;
        _s(l, m, d[c] = (f = h, g = u, (y = (b) => {
          if (b._vts) {
            if (b._vts <= y.attached) return;
          } else b._vts = Date.now();
          He(function(x, v) {
            if (!st(v)) return v;
            {
              let k = x.stopImmediatePropagation;
              return x.stopImmediatePropagation = () => {
                k.call(x), x._stopped = !0;
              }, v.map((S) => (C) => !C._stopped && S && S(C));
            }
          }(b, y.value), g, 5, [b]);
        }).value = f, y.attached = el || (s0.then(() => el = 0), el = Date.now()), y), _);
      } else p && (l.removeEventListener(m, p, _), d[c] = void 0);
    }
  }(t, e, n, a) : (e[0] === "." ? (e = e.slice(1), 0) : e[0] === "^" ? (e = e.slice(1), 1) : !function(l, c, h, u) {
    if (u) return !!(c === "innerHTML" || c === "textContent" || c in l && eu(c) && ot(h));
    if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA") return !1;
    if (c === "width" || c === "height") {
      let d = l.tagName;
      if (d === "IMG" || d === "VIDEO" || d === "CANVAS" || d === "SOURCE") return !1;
    }
    return !(eu(c) && ct(h)) && c in l;
  }(t, e, n, o)) ? t._isVueCE && (function(l, c) {
    let h = l._def.props;
    if (!h) return !1;
    let u = Tt(c);
    return Array.isArray(h) ? h.some((d) => Tt(d) === u) : Object.keys(h).some((d) => Tt(d) === u);
  }(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !ct(n))) ? Zh(t, Tt(e), n, a, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), Jh(t, e, n, o)) : (Zh(t, e, n), t.tagName.includes("-") || e !== "value" && e !== "checked" && e !== "selected" || Jh(t, e, n, o, a, e !== "value"));
}, su = {};
function qp(t, e, s) {
  let n, i = Pc(t, e);
  n = i, Wt.call(n) === "[object Object]" && (i = gt({}, i, e));
  class a extends Lr {
    constructor(r) {
      super(i, r, s);
    }
  }
  return a.def = i, a;
}
let n0 = (t, e) => qp(t, e, ig), i0 = "u" > typeof HTMLElement ? HTMLElement : class {
};
class Lr extends i0 {
  constructor(e, s = {}, n = Ko) {
    super(), this._def = e, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== Ko ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow(gt({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._resolved || this._parseSlots(), this._connected = !0;
    let e = this;
    for (; e = e && (e.assignedSlot || e.parentNode || e.host); ) if (e instanceof Lr) {
      this._parent = e;
      break;
    }
    this._instance || (this._resolved ? this._mount(this._def) : e && e._pendingResolve ? this._pendingResolve = e._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(e = this._parent) {
    e && (this._instance.parent = e._instance, this._inheritParentContext(e));
  }
  _inheritParentContext(e = this._parent) {
    e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
  }
  disconnectedCallback() {
    this._connected = !1, ri(() => {
      !this._connected && (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(e) {
    for (let s of e) this._setAttr(s.attributeName);
  }
  _resolveDef() {
    if (this._pendingResolve) return;
    for (let n = 0; n < this.attributes.length; n++) this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    let e = (n, i = !1) => {
      let a;
      this._resolved = !0, this._pendingResolve = void 0;
      let { props: o, styles: r } = n;
      if (o && !st(o)) for (let l in o) {
        let c = o[l];
        (c === Number || c && c.type === Number) && (l in this._props && (this._props[l] = ei(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[Tt(l)] = !0);
      }
      this._numberProps = a, this._resolveProps(n), this.shadowRoot && this._applyStyles(r), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, e(this._def = n, !0);
    }) : e(this._def);
  }
  _mount(e) {
    this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    let s = this._instance && this._instance.exposed;
    if (s) for (let n in s) wt(this, n) || Object.defineProperty(this, n, { get: () => Pa(s[n]) });
  }
  _resolveProps(e) {
    let { props: s } = e, n = st(s) ? s : Object.keys(s || {});
    for (let i of Object.keys(this)) i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (let i of n.map(Tt)) Object.defineProperty(this, i, { get() {
      return this._getProp(i);
    }, set(a) {
      this._setProp(i, a, !0, !this._patching);
    } });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    let s = this.hasAttribute(e), n = s ? this.getAttribute(e) : su, i = Tt(e);
    s && this._numberProps && this._numberProps[i] && (n = ei(n)), this._setProp(i, n, !1, !0);
  }
  _getProp(e) {
    return this._props[e];
  }
  _setProp(e, s, n = !0, i = !1) {
    if (s !== this._props[e] && (this._dirty = !0, s === su ? delete this._props[e] : (this._props[e] = s, e === "key" && this._app && (this._app._ceVNode.key = s)), i && this._instance && this._update(), n)) {
      let a = this._ob;
      a && (this._processMutations(a.takeRecords()), a.disconnect()), s === !0 ? this.setAttribute(Me(e), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Me(e), s + "") : s || this.removeAttribute(Me(e)), a && a.observe(this, { attributes: !0 });
    }
  }
  _update() {
    let e = this._createVNode();
    this._app && (e.appContext = this._app._context), ng(e, this._root);
  }
  _createVNode() {
    let e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    let s = It(this._def, gt(e, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      let i = (a, o) => {
        let r;
        this.dispatchEvent(new CustomEvent(a, (r = o[0], Wt.call(r) === "[object Object]" ? gt({ detail: o }, o[0]) : { detail: o })));
      };
      n.emit = (a, ...o) => {
        i(a, o), Me(a) !== a && i(Me(a), o);
      }, this._setParent();
    }), s;
  }
  _applyStyles(e, s, n) {
    if (!e) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s)) return;
      this._styleChildren.add(s);
    }
    let i = this._nonce, a = this.shadowRoot, o = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(a), r = null;
    for (let l = e.length - 1; l >= 0; l--) {
      let c = document.createElement("style");
      i && c.setAttribute("nonce", i), c.textContent = e[l], a.insertBefore(c, r || o), r = c, l === 0 && (n || this._styleAnchors.set(this._def, c), s && this._styleAnchors.set(s, c));
    }
  }
  _getStyleAnchor(e) {
    if (!e) return null;
    let s = this._styleAnchors.get(e);
    return s && s.parentNode === this.shadowRoot ? s : (s && this._styleAnchors.delete(e), null);
  }
  _getRootStyleInsertionAnchor(e) {
    for (let s = 0; s < e.childNodes.length; s++) {
      let n = e.childNodes[s];
      if (!(n instanceof HTMLStyleElement)) return n;
    }
    return null;
  }
  _parseSlots() {
    let e, s = this._slots = {};
    for (; e = this.firstChild; ) {
      let n = e.nodeType === 1 && e.getAttribute("slot") || "default";
      (s[n] || (s[n] = [])).push(e), this.removeChild(e);
    }
  }
  _renderSlots() {
    let e = this._getSlots(), s = this._instance.type.__scopeId;
    for (let n = 0; n < e.length; n++) {
      let i = e[n], a = i.getAttribute("name") || "default", o = this._slots[a], r = i.parentNode;
      if (o) for (let l of o) {
        if (s && l.nodeType === 1) {
          let c, h = s + "-s", u = document.createTreeWalker(l, 1);
          for (l.setAttribute(h, ""); c = u.nextNode(); ) c.setAttribute(h, "");
        }
        r.insertBefore(l, i);
      }
      else for (; i.firstChild; ) r.insertBefore(i.firstChild, i);
      r.removeChild(i);
    }
  }
  _getSlots() {
    let e = [this];
    this._teleportTargets && e.push(...this._teleportTargets);
    let s = /* @__PURE__ */ new Set();
    for (let n of e) {
      let i = n.querySelectorAll("slot");
      for (let a = 0; a < i.length; a++) s.add(i[a]);
    }
    return Array.from(s);
  }
  _injectChildStyle(e, s) {
    this._applyStyles(e.styles, e, s);
  }
  _beginPatch() {
    this._patching = !0, this._dirty = !1;
  }
  _endPatch() {
    this._patching = !1, this._dirty && this._instance && this._update();
  }
  _hasShadowRoot() {
    return this._def.shadowRoot !== !1;
  }
  _removeChildStyle(e) {
  }
}
function Yp(t) {
  let e = ve();
  return e && e.ce || null;
}
function a0() {
  let t = Yp();
  return t && t.shadowRoot;
}
function o0(t = "$style") {
  {
    let e = ve();
    if (!e) return yt;
    let s = e.type.__cssModules;
    return s && s[t] || yt;
  }
}
let Kp = /* @__PURE__ */ new WeakMap(), Xp = /* @__PURE__ */ new WeakMap(), qo = Symbol("_moveCb"), nu = Symbol("_enterCb"), r0 = (nl = { name: "TransitionGroup", props: gt({}, jp, { tag: String, moveClass: String }), setup(t, { slots: e }) {
  let s, n, i = ve(), a = Mc();
  return Pr(() => {
    if (!s.length) return;
    let o = t.moveClass || `${t.name || "v"}-move`;
    if (!function(l, c, h) {
      let u = l.cloneNode(), d = l[ci];
      d && d.forEach((g) => {
        g.split(/\s+/).forEach((m) => m && u.classList.remove(m));
      }), h.split(/\s+/).forEach((g) => g && u.classList.add(g)), u.style.display = "none";
      let p = c.nodeType === 1 ? c : c.parentNode;
      p.appendChild(u);
      let { hasTransform: f } = Hp(u);
      return p.removeChild(u), f;
    }(s[0].el, i.vnode.el, o)) {
      s = [];
      return;
    }
    s.forEach(l0), s.forEach(c0);
    let r = s.filter(h0);
    Nl(i.vnode.el), r.forEach((l) => {
      let c = l.el, h = c.style;
      Je(c, o), h.transform = h.webkitTransform = h.transitionDuration = "";
      let u = c[qo] = (d) => {
        (!d || d.target === c) && (!d || d.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", u), c[qo] = null, $s(c, o));
      };
      c.addEventListener("transitionend", u);
    }), s = [];
  }), () => {
    let o = xt(t), r = Wp(o), l = o.tag || ee;
    if (s = [], n) for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.el && h.el instanceof Element && (s.push(h), Ds(h, li(h, r, a, i)), Kp.set(h, Jp(h.el)));
    }
    n = e.default ? Ar(e.default()) : [];
    for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.key != null && Ds(h, li(h, r, a, i));
    }
    return It(l, null, n);
  };
} }, delete nl.props.mode, nl);
function l0(t) {
  let e = t.el;
  e[qo] && e[qo](), e[nu] && e[nu]();
}
function c0(t) {
  Xp.set(t, Jp(t.el));
}
function h0(t) {
  let e = Kp.get(t), s = Xp.get(t), n = e.left - s.left, i = e.top - s.top;
  if (n || i) {
    let a = t.el, o = a.style, r = a.getBoundingClientRect(), l = 1, c = 1;
    return a.offsetWidth && (l = r.width / a.offsetWidth), a.offsetHeight && (c = r.height / a.offsetHeight), Number.isFinite(l) && l !== 0 || (l = 1), Number.isFinite(c) && c !== 0 || (c = 1), 0.01 > Math.abs(l - 1) && (l = 1), 0.01 > Math.abs(c - 1) && (c = 1), o.transform = o.webkitTransform = `translate(${n / l}px,${i / c}px)`, o.transitionDuration = "0s", t;
  }
}
function Jp(t) {
  let e = t.getBoundingClientRect();
  return { left: e.left, top: e.top };
}
let Xs = (t) => {
  let e = t.props["onUpdate:modelValue"] || !1;
  return st(e) ? (s) => ti(e, s) : e;
};
function u0(t) {
  t.target.composing = !0;
}
function iu(t) {
  let e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
let We = Symbol("_assign");
function au(t, e, s) {
  return e && (t = t.trim()), s && (t = yr(t)), t;
}
let Yo = { created(t, { modifiers: { lazy: e, trim: s, number: n } }, i) {
  t[We] = Xs(i);
  let a = n || i.props && i.props.type === "number";
  _s(t, e ? "change" : "input", (o) => {
    o.target.composing || t[We](au(t.value, s, a));
  }), (s || a) && _s(t, "change", () => {
    t.value = au(t.value, s, a);
  }), e || (_s(t, "compositionstart", u0), _s(t, "compositionend", iu), _s(t, "change", iu));
}, mounted(t, { value: e }) {
  t.value = e ?? "";
}, beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: i, number: a } }, o) {
  if (t[We] = Xs(o), t.composing) return;
  let r = (a || t.type === "number") && !/^0\d/.test(t.value) ? yr(t.value) : t.value, l = e ?? "";
  if (r === l) return;
  let c = t.getRootNode();
  (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === t && t.type !== "range" && (n && e === s || i && t.value.trim() === l) || (t.value = l);
} }, Wc = { deep: !0, created(t, e, s) {
  t[We] = Xs(s), _s(t, "change", () => {
    let n = t._modelValue, i = hi(t), a = t.checked, o = t[We];
    if (st(n)) {
      let r = _r(n, i), l = r !== -1;
      if (a && !l) o(n.concat(i));
      else if (!a && l) {
        let c = [...n];
        c.splice(r, 1), o(c);
      }
    } else {
      let r;
      if (r = n, Wt.call(r) === "[object Set]") {
        let l = new Set(n);
        a ? l.add(i) : l.delete(i), o(l);
      } else o(Qp(t, a));
    }
  });
}, mounted: ou, beforeUpdate(t, e, s) {
  t[We] = Xs(s), ou(t, e, s);
} };
function ou(t, { value: e, oldValue: s }, n) {
  let i;
  if (t._modelValue = e, st(e)) i = _r(e, n.props.value) > -1;
  else {
    let a;
    if (a = e, Wt.call(a) === "[object Set]") i = e.has(n.props.value);
    else {
      if (e === s) return;
      i = As(e, Qp(t, !0));
    }
  }
  t.checked !== i && (t.checked = i);
}
let Hc = { created(t, { value: e }, s) {
  t.checked = As(e, s.props.value), t[We] = Xs(s), _s(t, "change", () => {
    t[We](hi(t));
  });
}, beforeUpdate(t, { value: e, oldValue: s }, n) {
  t[We] = Xs(n), e !== s && (t.checked = As(e, n.props.value));
} }, Zp = { deep: !0, created(t, { value: e, modifiers: { number: s } }, n) {
  let i, a = (i = e, Wt.call(i) === "[object Set]");
  _s(t, "change", () => {
    let o = Array.prototype.filter.call(t.options, (r) => r.selected).map((r) => s ? yr(hi(r)) : hi(r));
    t[We](t.multiple ? a ? new Set(o) : o : o[0]), t._assigning = !0, ri(() => {
      t._assigning = !1;
    });
  }), t[We] = Xs(n);
}, mounted(t, { value: e }) {
  ru(t, e);
}, beforeUpdate(t, e, s) {
  t[We] = Xs(s);
}, updated(t, { value: e }) {
  t._assigning || ru(t, e);
} };
function ru(t, e) {
  let s, n = t.multiple, i = st(e);
  if (!n || i || (s = e, Wt.call(s) === "[object Set]")) {
    for (let a = 0, o = t.options.length; a < o; a++) {
      let r = t.options[a], l = hi(r);
      if (n) if (i) {
        let c = typeof l;
        c === "string" || c === "number" ? r.selected = e.some((h) => String(h) === String(l)) : r.selected = _r(e, l) > -1;
      } else r.selected = e.has(l);
      else if (As(hi(r), e)) {
        t.selectedIndex !== a && (t.selectedIndex = a);
        return;
      }
    }
    n || t.selectedIndex === -1 || (t.selectedIndex = -1);
  }
}
function hi(t) {
  return "_value" in t ? t._value : t.value;
}
function Qp(t, e) {
  let s = e ? "_trueValue" : "_falseValue";
  return s in t ? t[s] : e;
}
let tg = { created(t, e, s) {
  qa(t, e, s, null, "created");
}, mounted(t, e, s) {
  qa(t, e, s, null, "mounted");
}, beforeUpdate(t, e, s, n) {
  qa(t, e, s, n, "beforeUpdate");
}, updated(t, e, s, n) {
  qa(t, e, s, n, "updated");
} };
function eg(t, e) {
  switch (t) {
    case "SELECT":
      return Zp;
    case "TEXTAREA":
      return Yo;
    default:
      switch (e) {
        case "checkbox":
          return Wc;
        case "radio":
          return Hc;
        default:
          return Yo;
      }
  }
}
function qa(t, e, s, n, i) {
  let a = eg(t.tagName, s.props && s.props.type)[i];
  a && a(t, e, s, n);
}
let d0 = ["ctrl", "shift", "alt", "meta"], f0 = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => d0.some((s) => t[`${s}Key`] && !e.includes(s)) }, p0 = (t, e) => {
  if (!t) return t;
  let s = t._withMods || (t._withMods = {}), n = e.join(".");
  return s[n] || (s[n] = (i, ...a) => {
    for (let o = 0; o < e.length; o++) {
      let r = f0[e[o]];
      if (r && r(i, e)) return;
    }
    return t(i, ...a);
  });
}, g0 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" }, m0 = (t, e) => {
  let s = t._withKeys || (t._withKeys = {}), n = e.join(".");
  return s[n] || (s[n] = (i) => {
    if (!("key" in i)) return;
    let a = Me(i.key);
    if (e.some((o) => o === a || g0[o] === a)) return t(i);
  });
}, Vc = gt({ patchProp: Up }, Bp), lu = !1;
function sg() {
  return _n = lu ? _n : yp(Vc), lu = !0, _n;
}
let ng = (...t) => {
  (_n || (_n = Ic(Vc))).render(...t);
}, y0 = (...t) => {
  sg().hydrate(...t);
}, Ko = (...t) => {
  let e = (_n || (_n = Ic(Vc))).createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = og(n);
    if (!i) return;
    let a = e._component;
    ot(a) || a.render || a.template || (a.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    let o = s(i, !1, ag(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
}, ig = (...t) => {
  let e = sg().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = og(n);
    if (i) return s(i, !0, ag(i));
  }, e;
};
function ag(t) {
  return t instanceof SVGElement ? "svg" : typeof MathMLElement == "function" && t instanceof MathMLElement ? "mathml" : void 0;
}
function og(t) {
  return ct(t) ? document.querySelector(t) : t;
}
let cu = !1, b0 = () => {
  cu || (cu = !0, Yo.getSSRProps = ({ value: t }) => ({ value: t }), Hc.getSSRProps = ({ value: t }, e) => {
    if (e.props && As(e.props.value, t)) return { checked: !0 };
  }, Wc.getSSRProps = ({ value: t }, e) => {
    if (st(t)) {
      if (e.props && _r(t, e.props.value) > -1) return { checked: !0 };
    } else {
      let s;
      if (s = t, Wt.call(s) === "[object Set]") {
        if (e.props && t.has(e.props.value)) return { checked: !0 };
      } else if (t) return { checked: !0 };
    }
  }, tg.getSSRProps = (t, e) => {
    if (typeof e.type != "string") return;
    let s = eg(e.type.toUpperCase(), e.props && e.props.type);
    if (s.getSSRProps) return s.getSSRProps(t, e);
  }, zp.getSSRProps = ({ value: t }) => {
    if (!t) return { style: { display: "none" } };
  });
};
var sl, nl, hu, _0 = Object.freeze({ __proto__: null, BaseTransition: Jf, BaseTransitionPropsValidators: Ac, Comment: Ut, DeprecationTypes: Jb, EffectScope: xc, ErrorCodes: Iy, ErrorTypeStrings: Gb, Fragment: ee, KeepAlive: nb, ReactiveEffect: na, Static: Sn, Suspense: Eb, Teleport: Gy, Text: Ys, TrackOpTypes: Ly, Transition: Zb, TransitionGroup: r0, TriggerOpTypes: Oy, VueElement: Lr, assertNumber: Fy, callWithAsyncErrorHandling: He, callWithErrorHandling: yi, camelize: Tt, capitalize: Fn, cloneVNode: rs, compatUtils: Xb, computed: Op, createApp: Ko, createBlock: Go, createCommentVNode: kp, createElementBlock: Fb, createElementVNode: Bc, createHydrationRenderer: yp, createPropsRestProxy: wb, createRenderer: Ic, createSSRApp: ig, createSlots: lb, createStaticVNode: Nb, createTextVNode: $c, createVNode: It, customRef: Bf, defineAsyncComponent: sb, defineComponent: Pc, defineCustomElement: qp, defineEmits: fb, defineExpose: pb, defineModel: yb, defineOptions: gb, defineProps: db, defineSSRCustomElement: n0, defineSlots: mb, devtools: Ub, effect: ry, effectScope: ay, getCurrentInstance: ve, getCurrentScope: xf, getCurrentWatcher: Ey, getTransitionRawChildren: Ar, guardReactiveProps: Cp, h: Ep, handleError: In, hasInjectionContext: Wy, hydrate: y0, hydrateOnIdle: Zy, hydrateOnInteraction: eb, hydrateOnMediaQuery: tb, hydrateOnVisible: Qy, initCustomFormatter: Hb, initDirectivesForSSR: b0, inject: Gi, isMemoSame: Fp, isProxy: Aa, isReactive: Cs, isReadonly: os, isRef: Xt, isRuntimeOnly: jb, isShallow: Te, isVNode: Rs, markRaw: Ff, mergeDefaults: vb, mergeModels: Sb, mergeProps: Mp, nextTick: ri, nodeOps: Bp, normalizeClass: Ma, normalizeProps: Qm, normalizeStyle: ka, onActivated: Qf, onBeforeMount: sp, onBeforeUnmount: Tr, onBeforeUpdate: Dc, onDeactivated: tp, onErrorCaptured: op, onMounted: Ra, onRenderTracked: ap, onRenderTriggered: ip, onScopeDispose: oy, onServerPrefetch: np, onUnmounted: Dr, onUpdated: Pr, onWatcherCleanup: jf, openBlock: ca, patchProp: Up, popScopeId: By, provide: Vf, proxyRefs: wc, pushScopeId: Ny, queuePostFlushCb: oa, reactive: Cr, readonly: Io, ref: Vi, registerRuntimeCompiler: Dp, render: ng, renderList: rb, renderSlot: cb, resolveComponent: ib, resolveDirective: ob, resolveDynamicComponent: ab, resolveFilter: Kb, resolveTransitionHooks: li, setBlockTracking: ha, setDevtoolsHook: qb, setTransitionHooks: Ds, shallowReactive: Ef, shallowReadonly: Sy, shallowRef: If, ssrContextKey: zf, ssrUtils: Yb, stop: ly, toDisplayString: bf, toHandlerKey: Qn, toHandlers: hb, toRaw: xt, toRef: Dy, toRefs: Py, toValue: ky, transformVNodeArgs: Ib, triggerRef: Cy, unref: Pa, useAttrs: xb, useCssModule: o0, useCssVars: t0, useHost: Yp, useId: Uy, useModel: Ab, useSSRContext: Gf, useShadowRoot: a0, useSlots: _b, useTemplateRef: qy, useTransitionState: Mc, vModelCheckbox: Wc, vModelDynamic: tg, vModelRadio: Hc, vModelSelect: Zp, vModelText: Yo, vShow: zp, version: Ip, warn: zb, watch: ii, watchEffect: Hy, watchPostEffect: Vy, watchSyncEffect: Uf, withAsyncContext: Cb, withCtx: kc, withDefaults: bb, withDirectives: jy, withKeys: m0, withMemo: Vb, withModifiers: p0, withScopeId: $y });
let da = Symbol(""), Ki = Symbol(""), zc = Symbol(""), Xo = Symbol(""), rg = Symbol(""), Tn = Symbol(""), Dn = Symbol(""), Rn = Symbol(""), Js = Symbol(""), Zs = Symbol(""), Oa = Symbol(""), Gc = Symbol(""), lg = Symbol(""), Uc = Symbol(""), Bl = Symbol(""), qc = Symbol(""), x0 = Symbol(""), Yc = Symbol(""), Kc = Symbol(""), cg = Symbol(""), hg = Symbol(""), Or = Symbol(""), Jo = Symbol(""), Xc = Symbol(""), Jc = Symbol(""), fa = Symbol(""), Ea = Symbol(""), Zc = Symbol(""), $l = Symbol(""), v0 = Symbol(""), jl = Symbol(""), Zo = Symbol(""), S0 = Symbol(""), w0 = Symbol(""), Qc = Symbol(""), C0 = Symbol(""), k0 = Symbol(""), th = Symbol(""), ug = Symbol(""), ui = { [da]: "Fragment", [Ki]: "Teleport", [zc]: "Suspense", [Xo]: "KeepAlive", [rg]: "BaseTransition", [Tn]: "openBlock", [Dn]: "createBlock", [Rn]: "createElementBlock", [Js]: "createVNode", [Zs]: "createElementVNode", [Oa]: "createCommentVNode", [Gc]: "createTextVNode", [lg]: "createStaticVNode", [Uc]: "resolveComponent", [Bl]: "resolveDynamicComponent", [qc]: "resolveDirective", [x0]: "resolveFilter", [Yc]: "withDirectives", [Kc]: "renderList", [cg]: "renderSlot", [hg]: "createSlots", [Or]: "toDisplayString", [Jo]: "mergeProps", [Xc]: "normalizeClass", [Jc]: "normalizeStyle", [fa]: "normalizeProps", [Ea]: "guardReactiveProps", [Zc]: "toHandlers", [$l]: "camelize", [v0]: "capitalize", [jl]: "toHandlerKey", [Zo]: "setBlockTracking", [S0]: "pushScopeId", [w0]: "popScopeId", [Qc]: "withCtx", [C0]: "unref", [k0]: "isRef", [th]: "withMemo", [ug]: "isMemoSame" }, Ee = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
function pa(t, e, s, n, i, a, o, r = !1, l = !1, c = !1, h = Ee) {
  var u, d, p, f;
  return t && (r ? (t.helper(Tn), t.helper((u = t.inSSR, d = c, u || d ? Dn : Rn))) : t.helper((p = t.inSSR, f = c, p || f ? Js : Zs)), o && t.helper(Yc)), { type: 13, tag: e, props: s, children: n, patchFlag: i, dynamicProps: a, directives: o, isBlock: r, disableTracking: l, isComponent: c, loc: h };
}
function wn(t, e = Ee) {
  return { type: 17, loc: e, elements: t };
}
function je(t, e = Ee) {
  return { type: 15, loc: e, properties: t };
}
function Kt(t, e) {
  return { type: 16, loc: Ee, key: ct(t) ? ft(t, !0) : t, value: e };
}
function ft(t, e = !1, s = Ee, n = 0) {
  return { type: 4, loc: s, content: t, isStatic: e, constType: e ? 3 : n };
}
function qe(t, e = Ee) {
  return { type: 8, loc: e, children: t };
}
function Jt(t, e = [], s = Ee) {
  return { type: 14, loc: s, callee: t, arguments: e };
}
function di(t, e, s = !1, n = !1, i = Ee) {
  return { type: 18, params: t, returns: e, newline: s, isSlot: n, loc: i };
}
function Wl(t, e, s, n = !0) {
  return { type: 19, test: t, consequent: e, alternate: s, newline: n, loc: Ee };
}
function eh(t, { helper: e, removeHelper: s, inSSR: n }) {
  if (!t.isBlock) {
    var i, a;
    t.isBlock = !0, s((i = t.isComponent, n || i ? Js : Zs)), e(Tn), e((a = t.isComponent, n || a ? Dn : Rn));
  }
}
let uu = new Uint8Array([123, 123]), du = new Uint8Array([125, 125]);
function fu(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function Re(t) {
  return t === 32 || t === 10 || t === 9 || t === 12 || t === 13;
}
function Is(t) {
  return t === 47 || t === 62 || Re(t);
}
function Qo(t) {
  let e = new Uint8Array(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}
let re = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
function Hl(t) {
  throw t;
}
function dg(t) {
}
function Pt(t, e, s, n) {
  let i = SyntaxError(`https://vuejs.org/error-reference/#compiler-${t}`);
  return i.code = t, i.loc = e, i;
}
let Pe = (t) => t.type === 4 && t.isStatic;
function fg(t) {
  switch (t) {
    case "Teleport":
    case "teleport":
      return Ki;
    case "Suspense":
    case "suspense":
      return zc;
    case "KeepAlive":
    case "keep-alive":
      return Xo;
    case "BaseTransition":
    case "base-transition":
      return rg;
  }
}
let Vl = /^$|^\d|[^\$\w\xA0-\uFFFF]/, pg = /[A-Za-z_$\xA0-\uFFFF]/, M0 = /[\.\?\w$\xA0-\uFFFF]/, A0 = /\s+[.[]\s*|\s*[.[]\s+/g, gg = (t) => t.type === 4 ? t.content : t.loc.source, mg = (t) => {
  let e = gg(t).trim().replace(A0, (r) => r.trim()), s = 0, n = [], i = 0, a = 0, o = null;
  for (let r = 0; r < e.length; r++) {
    let l = e.charAt(r);
    switch (s) {
      case 0:
        if (l === "[") n.push(s), s = 1, i++;
        else if (l === "(") n.push(s), s = 2, a++;
        else if (!(r === 0 ? pg : M0).test(l)) return !1;
        break;
      case 1:
        l === "'" || l === '"' || l === "`" ? (n.push(s), s = 3, o = l) : l === "[" ? i++ : l !== "]" || --i || (s = n.pop());
        break;
      case 2:
        if (l === "'" || l === '"' || l === "`") n.push(s), s = 3, o = l;
        else if (l === "(") a++;
        else if (l === ")") {
          if (r === e.length - 1) return !1;
          --a || (s = n.pop());
        }
        break;
      case 3:
        l === o && (s = n.pop(), o = null);
    }
  }
  return !i && !a;
}, P0 = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
function $e(t, e, s = !1) {
  for (let n = 0; n < t.props.length; n++) {
    let i = t.props[n];
    if (i.type === 7 && (s || i.exp) && (ct(e) ? i.name === e : e.test(i.name))) return i;
  }
}
function Er(t, e, s = !1, n = !1) {
  for (let i = 0; i < t.props.length; i++) {
    let a = t.props[i];
    if (a.type === 6) {
      if (s) continue;
      if (a.name === e && (a.value || n)) return a;
    } else if (a.name === "bind" && (a.exp || n) && Xn(a.arg, e)) return a;
  }
}
function Xn(t, e) {
  return !!(t && Pe(t) && t.content === e);
}
function il(t) {
  return t.type === 5 || t.type === 2;
}
function pu(t) {
  return t.type === 7 && t.name === "pre";
}
function T0(t) {
  return t.type === 7 && t.name === "slot";
}
function tr(t) {
  return t.type === 1 && t.tagType === 3;
}
function er(t) {
  return t.type === 1 && t.tagType === 2;
}
let D0 = /* @__PURE__ */ new Set([fa, Ea]);
function sr(t, e, s) {
  let n, i, a = t.type === 13 ? t.props : t.arguments[2], o = [];
  if (a && !ct(a) && a.type === 14) {
    let r = function l(c, h = []) {
      if (c && !ct(c) && c.type === 14) {
        let u = c.callee;
        if (!ct(u) && D0.has(u)) return l(c.arguments[0], h.concat(c));
      }
      return [c, h];
    }(a);
    a = r[0], i = (o = r[1])[o.length - 1];
  }
  if (a == null || ct(a)) n = je([e]);
  else if (a.type === 14) {
    let r = a.arguments[0];
    ct(r) || r.type !== 15 ? a.callee === Zc ? n = Jt(s.helper(Jo), [je([e]), a]) : a.arguments.unshift(je([e])) : gu(e, r) || r.properties.unshift(e), n || (n = a);
  } else a.type === 15 ? (gu(e, a) || a.properties.unshift(e), n = a) : (n = Jt(s.helper(Jo), [je([e]), a]), i && i.callee === Ea && (i = o[o.length - 2]));
  t.type === 13 ? i ? i.arguments[0] = n : t.props = n : i ? i.arguments[0] = n : t.arguments[2] = n;
}
function gu(t, e) {
  let s = !1;
  if (t.key.type === 4) {
    let n = t.key.content;
    s = e.properties.some((i) => i.key.type === 4 && i.key.content === n);
  }
  return s;
}
function zl(t, e) {
  return `_${e}_${t.replace(/[^\w]/g, (s, n) => s === "-" ? "_" : t.charCodeAt(n).toString())}`;
}
let R0 = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function yg(t) {
  for (let e = 0; e < t.length; e++) if (!Re(t.charCodeAt(e))) return !1;
  return !0;
}
function sh(t) {
  return t.type === 2 && yg(t.content) || t.type === 12 && sh(t.content);
}
function bg(t) {
  return t.type === 3 || sh(t);
}
let _g = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: () => 0, isVoidTag: qn, isPreTag: qn, isIgnoreNewlineTag: qn, isCustomElement: qn, onError: Hl, onWarn: dg, comments: !1, prefixIdentifiers: !1 }, Lt = _g, nr = null, Ms = "", he = null, Ct = null, De = "", hs = -1, dn = -1, nh = 0, gn = !1, Gl = null, $t = [], Gt = new class {
  constructor(t, e) {
    this.stack = t, this.cbs = e, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = uu, this.delimiterClose = du, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = uu, this.delimiterClose = du;
  }
  getPos(t) {
    let e = 1, s = t + 1, n = this.newlines.length, i = -1;
    if (n > 100) {
      let a = -1, o = n;
      for (; a + 1 < o; ) {
        let r = a + o >>> 1;
        this.newlines[r] < t ? a = r : o = r;
      }
      i = a;
    } else for (let a = n - 1; a >= 0; a--) if (t > this.newlines[a]) {
      i = a;
      break;
    }
    return i >= 0 && (e = i + 2, s = t - this.newlines[i]), { column: s, line: e, offset: t };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(t) {
    t === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : this.inVPre || t !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t));
  }
  stateInterpolationOpen(t) {
    if (t === this.delimiterOpen[this.delimiterIndex]) if (this.delimiterIndex === this.delimiterOpen.length - 1) {
      let e = this.index + 1 - this.delimiterOpen.length;
      e > this.sectionStart && this.cbs.ontext(this.sectionStart, e), this.state = 3, this.sectionStart = e;
    } else this.delimiterIndex++;
    else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(t)) : (this.state = 1, this.stateText(t));
  }
  stateInterpolation(t) {
    t === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(t));
  }
  stateInterpolationClose(t) {
    t === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(t));
  }
  stateSpecialStartSequence(t) {
    let e = this.sequenceIndex === this.currentSequence.length;
    if (e ? Is(t) : (32 | t) === this.currentSequence[this.sequenceIndex]) {
      if (!e) return void this.sequenceIndex++;
    } else this.inRCDATA = !1;
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(t);
  }
  stateInRCDATA(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === 62 || Re(t)) {
        let e = this.index - this.currentSequence.length;
        if (this.sectionStart < e) {
          let s = this.index;
          this.index = e, this.cbs.ontext(this.sectionStart, e), this.index = s;
        }
        this.sectionStart = e + 2, this.stateInClosingTagName(t), this.inRCDATA = !1;
        return;
      }
      this.sequenceIndex = 0;
    }
    (32 | t) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence !== re.TitleEnd && (this.currentSequence !== re.TextareaEnd || this.inSFCRoot) ? this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.inVPre || t !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === re.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === re.Cdata.length && (this.state = 28, this.currentSequence = re.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
  }
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length; ) {
      let e = this.buffer.charCodeAt(this.index);
      if (e === 10 && this.newlines.push(this.index), e === t) return !0;
    }
    return this.index = this.buffer.length - 1, !1;
  }
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === re.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, e) {
    this.enterRCDATA(t, e), this.state = 31;
  }
  enterRCDATA(t, e) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = e;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : fu(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    Is(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (Is(t)) {
      let e = this.buffer.slice(this.sectionStart, this.index);
      e !== "template" && this.enterRCDATA(Qo("</" + e), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    Re(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = fu(t) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === 62 || Re(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    t === 62 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(t) {
    t === 62 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : t === 47 ? this.state = 7 : t === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : Re(t) || this.handleAttrStart(t);
  }
  handleAttrStart(t) {
    t === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : t === 46 || t === 58 || t === 64 || t === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : Re(t) || (this.state = 11, this.stateBeforeAttrName(t));
  }
  stateInAttrName(t) {
    (t === 61 || Is(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || Is(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || Is(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || Is(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || Is(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(t) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(t);
  }
  stateAfterAttrName(t) {
    t === 61 ? this.state = 18 : t === 47 || t === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t)) : Re(t) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(t));
  }
  stateBeforeAttrValue(t) {
    t === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : t === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : Re(t) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(t));
  }
  handleInAttrValue(t, e) {
    (t === e || this.fastForwardTo(e)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(e === 34 ? 3 : 2, this.index + 1), this.state = 11);
  }
  stateInAttrValueDoubleQuotes(t) {
    this.handleInAttrValue(t, 34);
  }
  stateInAttrValueSingleQuotes(t) {
    this.handleInAttrValue(t, 39);
  }
  stateInAttrValueNoQuotes(t) {
    Re(t) || t === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(t)) : (t === 39 || t === 60 || t === 61 || t === 96) && this.cbs.onerr(18, this.index);
  }
  stateBeforeDeclaration(t) {
    t === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = t === 45 ? 25 : 23;
  }
  stateInDeclaration(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === 45 ? (this.state = 28, this.currentSequence = re.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === re.ScriptEnd[3] ? this.startSpecial(re.ScriptEnd, 4) : t === re.StyleEnd[3] ? this.startSpecial(re.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === re.TitleEnd[3] ? this.startSpecial(re.TitleEnd, 4) : t === re.TextareaEnd[3] ? this.startSpecial(re.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  startEntity() {
  }
  stateInEntity() {
  }
  parse(t) {
    for (this.buffer = t; this.index < this.buffer.length; ) {
      let e = this.buffer.charCodeAt(this.index);
      switch (e === 10 && this.state !== 33 && this.newlines.push(this.index), this.state) {
        case 1:
          this.stateText(e);
          break;
        case 2:
          this.stateInterpolationOpen(e);
          break;
        case 3:
          this.stateInterpolation(e);
          break;
        case 4:
          this.stateInterpolationClose(e);
          break;
        case 31:
          this.stateSpecialStartSequence(e);
          break;
        case 32:
          this.stateInRCDATA(e);
          break;
        case 26:
          this.stateCDATASequence(e);
          break;
        case 19:
          this.stateInAttrValueDoubleQuotes(e);
          break;
        case 12:
          this.stateInAttrName(e);
          break;
        case 13:
          this.stateInDirName(e);
          break;
        case 14:
          this.stateInDirArg(e);
          break;
        case 15:
          this.stateInDynamicDirArg(e);
          break;
        case 16:
          this.stateInDirModifier(e);
          break;
        case 28:
          this.stateInCommentLike(e);
          break;
        case 27:
          this.stateInSpecialComment(e);
          break;
        case 11:
          this.stateBeforeAttrName(e);
          break;
        case 6:
          this.stateInTagName(e);
          break;
        case 34:
          this.stateInSFCRootTagName(e);
          break;
        case 9:
          this.stateInClosingTagName(e);
          break;
        case 5:
          this.stateBeforeTagName(e);
          break;
        case 17:
          this.stateAfterAttrName(e);
          break;
        case 20:
          this.stateInAttrValueSingleQuotes(e);
          break;
        case 18:
          this.stateBeforeAttrValue(e);
          break;
        case 8:
          this.stateBeforeClosingTagName(e);
          break;
        case 10:
          this.stateAfterClosingTagName(e);
          break;
        case 29:
          this.stateBeforeSpecialS(e);
          break;
        case 30:
          this.stateBeforeSpecialT(e);
          break;
        case 21:
          this.stateInAttrValueNoQuotes(e);
          break;
        case 7:
          this.stateInSelfClosingTag(e);
          break;
        case 23:
          this.stateInDeclaration(e);
          break;
        case 22:
          this.stateBeforeDeclaration(e);
          break;
        case 25:
          this.stateBeforeComment(e);
          break;
        case 24:
          this.stateInProcessingInstruction(e);
          break;
        case 33:
          this.stateInEntity();
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  cleanup() {
    this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  handleTrailingData() {
    let t = this.buffer.length;
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === re.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, e) {
  }
}($t, { onerr: bu, ontext(t, e) {
  Ya(le(t, e), t, e);
}, ontextentity(t, e, s) {
  Ya(t, e, s);
}, oninterpolation(t, e) {
  if (gn) return Ya(le(t, e), t, e);
  let s = t + Gt.delimiterOpen.length, n = e - Gt.delimiterClose.length;
  for (; Re(Ms.charCodeAt(s)); ) s++;
  for (; Re(Ms.charCodeAt(n - 1)); ) n--;
  let i = le(s, n);
  i.includes("&") && (i = Lt.decodeEntities(i, !1)), Ul({ type: 5, content: Ka(i, !1, zt(s, n)), loc: zt(t, e) });
}, onopentagname(t, e) {
  let s = le(t, e);
  he = { type: 1, tag: s, ns: Lt.getNamespace(s, $t[0], Lt.ns), tagType: 0, props: [], children: [], loc: zt(t - 1, e), codegenNode: void 0 };
}, onopentagend(t) {
  yu(t);
}, onclosetag(t, e) {
  let s = le(t, e);
  if (!Lt.isVoidTag(s)) {
    let n = !1;
    for (let i = 0; i < $t.length; i++) if ($t[i].tag.toLowerCase() === s.toLowerCase()) {
      n = !0, i > 0 && $t[0].loc.start.offset;
      for (let a = 0; a <= i; a++) So($t.shift(), e, a < i);
      break;
    }
    n || xg(t, 60);
  }
}, onselfclosingtag(t) {
  let e = he.tag;
  he.isSelfClosing = !0, yu(t), $t[0] && $t[0].tag === e && So($t.shift(), t);
}, onattribname(t, e) {
  Ct = { type: 6, name: le(t, e), nameLoc: zt(t, e), value: void 0, loc: zt(t) };
}, ondirname(t, e) {
  let s = le(t, e), n = s === "." || s === ":" ? "bind" : s === "@" ? "on" : s === "#" ? "slot" : s.slice(2);
  if (gn || n === "") Ct = { type: 6, name: s, nameLoc: zt(t, e), value: void 0, loc: zt(t) };
  else if (Ct = { type: 7, name: n, rawName: s, exp: void 0, arg: void 0, modifiers: s === "." ? [ft("prop")] : [], loc: zt(t) }, n === "pre") {
    gn = Gt.inVPre = !0, Gl = he;
    let i = he.props;
    for (let a = 0; a < i.length; a++) i[a].type === 7 && (i[a] = function(o) {
      let r = { type: 6, name: o.rawName, nameLoc: zt(o.loc.start.offset, o.loc.start.offset + o.rawName.length), value: void 0, loc: o.loc };
      if (o.exp) {
        let l = o.exp.loc;
        l.end.offset < o.loc.end.offset && (l.start.offset--, l.start.column--, l.end.offset++, l.end.column++), r.value = { type: 2, content: o.exp.content, loc: l };
      }
      return r;
    }(i[a]));
  }
}, ondirarg(t, e) {
  if (t === e) return;
  let s = le(t, e);
  if (gn && !pu(Ct)) Ct.name += s, mn(Ct.nameLoc, e);
  else {
    let n = s[0] !== "[";
    Ct.arg = Ka(n ? s : s.slice(1, -1), n, zt(t, e), 3 * !!n);
  }
}, ondirmodifier(t, e) {
  let s = le(t, e);
  if (gn && !pu(Ct)) Ct.name += "." + s, mn(Ct.nameLoc, e);
  else if (Ct.name === "slot") {
    let n = Ct.arg;
    n && (n.content += "." + s, mn(n.loc, e));
  } else {
    let n = ft(s, !0, zt(t, e));
    Ct.modifiers.push(n);
  }
}, onattribdata(t, e) {
  De += le(t, e), hs < 0 && (hs = t), dn = e;
}, onattribentity(t, e, s) {
  De += t, hs < 0 && (hs = e), dn = s;
}, onattribnameend(t) {
  let e = le(Ct.loc.start.offset, t);
  Ct.type === 7 && (Ct.rawName = e), he.props.some((s) => (s.type === 7 ? s.rawName : s.name) === e);
}, onattribend(t, e) {
  he && Ct && (mn(Ct.loc, e), t !== 0 && (De.includes("&") && (De = Lt.decodeEntities(De, !0)), Ct.type === 6 ? (Ct.name === "class" && (De = Sg(De).trim()), Ct.value = { type: 2, content: De, loc: t === 1 ? zt(hs, dn) : zt(hs - 1, dn + 1) }, Gt.inSFCRoot && he.tag === "template" && Ct.name === "lang" && De && De !== "html" && Gt.enterRCDATA(Qo("</template"), 0)) : (Ct.exp = Ka(De, !1, zt(hs, dn), 0, 0), Ct.name === "for" && (Ct.forParseResult = function(s) {
    let n = s.loc, i = s.content, a = i.match(R0);
    if (!a) return;
    let [, o, r] = a, l = (p, f, g = !1) => {
      let m = n.start.offset + f, _ = m + p.length;
      return Ka(p, !1, zt(m, _), 0, +!!g);
    }, c = { source: l(r.trim(), i.indexOf(r, o.length)), value: void 0, key: void 0, index: void 0, finalized: !1 }, h = o.trim().replace(L0, "").trim(), u = o.indexOf(h), d = h.match(mu);
    if (d) {
      let p;
      h = h.replace(mu, "").trim();
      let f = d[1].trim();
      if (f && (p = i.indexOf(f, u + h.length), c.key = l(f, p, !0)), d[2]) {
        let g = d[2].trim();
        g && (c.index = l(g, i.indexOf(g, c.key ? p + f.length : u + h.length), !0));
      }
    }
    return h && (c.value = l(h, u, !0)), c;
  }(Ct.exp)))), (Ct.type !== 7 || Ct.name !== "pre") && he.props.push(Ct)), De = "", hs = dn = -1;
}, oncomment(t, e) {
  Lt.comments && Ul({ type: 3, content: le(t, e), loc: zt(t - 4, e + 3) });
}, onend() {
  let t = Ms.length;
  for (let e = 0; e < $t.length; e++) So($t[e], t - 1), $t[e].loc.start.offset;
}, oncdata(t, e) {
  $t[0].ns !== 0 && Ya(le(t, e), t, e);
}, onprocessinginstruction(t) {
  ($t[0] ? $t[0].ns : Lt.ns) === 0 && bu(21, t - 1);
} }), mu = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, L0 = /^\(|\)$/g;
function le(t, e) {
  return Ms.slice(t, e);
}
function yu(t) {
  Gt.inSFCRoot && (he.innerLoc = zt(t + 1, t + 1)), Ul(he);
  let { tag: e, ns: s } = he;
  s === 0 && Lt.isPreTag(e) && nh++, Lt.isVoidTag(e) ? So(he, t) : ($t.unshift(he), (s === 1 || s === 2) && (Gt.inXML = !0)), he = null;
}
function Ya(t, e, s) {
  {
    let a = $t[0] && $t[0].tag;
    a !== "script" && a !== "style" && t.includes("&") && (t = Lt.decodeEntities(t, !1));
  }
  let n = $t[0] || nr, i = n.children[n.children.length - 1];
  i && i.type === 2 ? (i.content += t, mn(i.loc, s)) : n.children.push({ type: 2, content: t, loc: zt(e, s) });
}
function So(t, e, s = !1) {
  s ? mn(t.loc, xg(e, 60)) : mn(t.loc, function(o) {
    let r = o;
    for (; Ms.charCodeAt(r) !== 62 && r < Ms.length - 1; ) r++;
    return r;
  }(e) + 1), Gt.inSFCRoot && (t.children.length ? t.innerLoc.end = gt({}, t.children[t.children.length - 1].loc.end) : t.innerLoc.end = gt({}, t.innerLoc.start), t.innerLoc.source = le(t.innerLoc.start.offset, t.innerLoc.end.offset));
  let { tag: n, ns: i, children: a } = t;
  if (!gn && (n === "slot" ? t.tagType = 2 : function({ tag: o, props: r }) {
    if (o === "template") {
      for (let l = 0; l < r.length; l++) if (r[l].type === 7 && O0.has(r[l].name)) return !0;
    }
    return !1;
  }(t) ? t.tagType = 3 : function({ tag: o, props: r }) {
    var l;
    if (Lt.isCustomElement(o)) return !1;
    if (o === "component" || (l = o.charCodeAt(0)) > 64 && l < 91 || fg(o) || Lt.isBuiltInComponent && Lt.isBuiltInComponent(o) || Lt.isNativeTag && !Lt.isNativeTag(o)) return !0;
    for (let c = 0; c < r.length; c++) {
      let h = r[c];
      if (h.type === 6 && h.name === "is" && h.value && h.value.content.startsWith("vue:")) return !0;
    }
    return !1;
  }(t) && (t.tagType = 1)), Gt.inRCDATA || (t.children = vg(a)), i === 0 && Lt.isIgnoreNewlineTag(n)) {
    let o = a[0];
    o && o.type === 2 && (o.content = o.content.replace(/^\r?\n/, ""));
  }
  i === 0 && Lt.isPreTag(n) && nh--, Gl === t && (gn = Gt.inVPre = !1, Gl = null), Gt.inXML && ($t[0] ? $t[0].ns : Lt.ns) === 0 && (Gt.inXML = !1);
}
function xg(t, e) {
  let s = t;
  for (; Ms.charCodeAt(s) !== e && s >= 0; ) s--;
  return s;
}
let O0 = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]), E0 = /\r\n/g;
function vg(t) {
  let e = Lt.whitespace !== "preserve", s = !1;
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    if (i.type === 2) if (nh) i.content = i.content.replace(E0, `
`);
    else if (yg(i.content)) {
      let a = t[n - 1] && t[n - 1].type, o = t[n + 1] && t[n + 1].type;
      !a || !o || e && (a === 3 && (o === 3 || o === 1) || a === 1 && (o === 3 || o === 1 && function(r) {
        for (let l = 0; l < r.length; l++) {
          let c = r.charCodeAt(l);
          if (c === 10 || c === 13) return !0;
        }
        return !1;
      }(i.content))) ? (s = !0, t[n] = null) : i.content = " ";
    } else e && (i.content = Sg(i.content));
  }
  return s ? t.filter(Boolean) : t;
}
function Sg(t) {
  let e = "", s = !1;
  for (let n = 0; n < t.length; n++) Re(t.charCodeAt(n)) ? s || (e += " ", s = !0) : (e += t[n], s = !1);
  return e;
}
function Ul(t) {
  ($t[0] || nr).children.push(t);
}
function zt(t, e) {
  return { start: Gt.getPos(t), end: e == null ? e : Gt.getPos(e), source: e == null ? e : le(t, e) };
}
function mn(t, e) {
  t.end = Gt.getPos(e), t.source = le(t.start.offset, e);
}
function Ka(t, e = !1, s, n = 0, i = 0) {
  return ft(t, e, s, n);
}
function bu(t, e, s) {
  Lt.onError(Pt(t, zt(e, e)));
}
function _u(t) {
  let e = t.children.filter((s) => s.type !== 3);
  return e.length !== 1 || e[0].type !== 1 || er(e[0]) ? null : e[0];
}
function Oe(t, e) {
  let { constantCache: s } = e;
  switch (t.type) {
    case 1:
      if (t.tagType !== 0) return 0;
      let r = s.get(t);
      if (r !== void 0) return r;
      let l = t.codegenNode;
      if (l.type !== 13 || l.isBlock && t.tag !== "svg" && t.tag !== "foreignObject" && t.tag !== "math") return 0;
      if (l.patchFlag !== void 0) return s.set(t, 0), 0;
      {
        let h = 3, u = wg(t, e);
        if (u === 0) return s.set(t, 0), 0;
        u < h && (h = u);
        for (let d = 0; d < t.children.length; d++) {
          let p = Oe(t.children[d], e);
          if (p === 0) return s.set(t, 0), 0;
          p < h && (h = p);
        }
        if (h > 1) for (let d = 0; d < t.props.length; d++) {
          let p = t.props[d];
          if (p.type === 7 && p.name === "bind" && p.exp) {
            let f = Oe(p.exp, e);
            if (f === 0) return s.set(t, 0), 0;
            f < h && (h = f);
          }
        }
        if (l.isBlock) {
          var n, i, a, o;
          for (let d = 0; d < t.props.length; d++) if (t.props[d].type === 7) return s.set(t, 0), 0;
          e.removeHelper(Tn), e.removeHelper((n = e.inSSR, i = l.isComponent, n || i ? Dn : Rn)), l.isBlock = !1, e.helper((a = e.inSSR, o = l.isComponent, a || o ? Js : Zs));
        }
        return s.set(t, h), h;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
    default:
      return 0;
    case 5:
    case 12:
      return Oe(t.content, e);
    case 4:
      return t.constType;
    case 8:
      let c = 3;
      for (let h = 0; h < t.children.length; h++) {
        let u = t.children[h];
        if (ct(u) || ge(u)) continue;
        let d = Oe(u, e);
        if (d === 0) return 0;
        d < c && (c = d);
      }
      return c;
    case 20:
      return 2;
  }
}
let F0 = /* @__PURE__ */ new Set([Xc, Jc, fa, Ea]);
function wg(t, e) {
  let s = 3, n = Cg(t);
  if (n && n.type === 15) {
    let { properties: i } = n;
    for (let a = 0; a < i.length; a++) {
      let o, { key: r, value: l } = i[a], c = Oe(r, e);
      if (c === 0) return c;
      if (c < s && (s = c), (o = l.type === 4 ? Oe(l, e) : l.type === 14 ? function h(u, d) {
        if (u.type === 14 && !ct(u.callee) && F0.has(u.callee)) {
          let p = u.arguments[0];
          if (p.type === 4) return Oe(p, d);
          if (p.type === 14) return h(p, d);
        }
        return 0;
      }(l, e) : 0) === 0) return o;
      o < s && (s = o);
    }
  }
  return s;
}
function Cg(t) {
  let e = t.codegenNode;
  if (e.type === 13) return e.props;
}
function ir(t, e) {
  e.currentNode = t;
  let { nodeTransforms: s } = e, n = [];
  for (let o = 0; o < s.length; o++) {
    let r = s[o](t, e);
    if (r && (st(r) ? n.push(...r) : n.push(r)), !e.currentNode) return;
    t = e.currentNode;
  }
  switch (t.type) {
    case 3:
      e.ssr || e.helper(Oa);
      break;
    case 5:
      e.ssr || e.helper(Or);
      break;
    case 9:
      for (let l = 0; l < t.branches.length; l++) ir(t.branches[l], e);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      var i = t;
      let o = 0, r = () => {
        o--;
      };
      for (; o < i.children.length; o++) {
        let l = i.children[o];
        ct(l) || (e.grandParent = e.parent, e.parent = i, e.childIndex = o, e.onNodeRemoved = r, ir(l, e));
      }
  }
  e.currentNode = t;
  let a = n.length;
  for (; a--; ) n[a]();
}
function kg(t, e) {
  let s = ct(t) ? (n) => n === t : (n) => t.test(n);
  return (n, i) => {
    if (n.type === 1) {
      let { props: a } = n;
      if (n.tagType === 3 && a.some(T0)) return;
      let o = [];
      for (let r = 0; r < a.length; r++) {
        let l = a[r];
        if (l.type === 7 && s(l.name)) {
          a.splice(r, 1), r--;
          let c = e(n, l, i);
          c && o.push(c);
        }
      }
      return o;
    }
  };
}
let Xa = "/*@__PURE__*/", xu = (t) => `${ui[t]}: _${ui[t]}`;
function vu(t, e, { helper: s, push: n, newline: i, isTS: a }) {
  let o = s(e === "component" ? Uc : qc);
  for (let r = 0; r < t.length; r++) {
    let l = t[r], c = l.endsWith("__self");
    c && (l = l.slice(0, -6)), n(`const ${zl(l, e)} = ${o}(${JSON.stringify(l)}${c ? ", true" : ""})${a ? "!" : ""}`), r < t.length - 1 && i();
  }
}
function ql(t, e) {
  let s = t.length > 3;
  e.push("["), s && e.indent(), Ei(t, e, s), s && e.deindent(), e.push("]");
}
function Ei(t, e, s = !1, n = !0) {
  let { push: i, newline: a } = e;
  for (let o = 0; o < t.length; o++) {
    let r = t[o];
    ct(r) ? i(r, -3) : st(r) ? ql(r, e) : _e(r, e), o < t.length - 1 && (s ? (n && i(","), a()) : n && i(", "));
  }
}
function _e(t, e) {
  var s, n, i;
  if (ct(t)) return void e.push(t, -3);
  if (ge(t)) return void e.push(e.helper(t));
  switch (t.type) {
    case 1:
    case 9:
    case 11:
    case 12:
      _e(t.codegenNode, e);
      break;
    case 2:
      s = t, e.push(JSON.stringify(s.content), -3, s);
      break;
    case 4:
      Su(t, e);
      break;
    case 5:
      (function(a, o) {
        let { push: r, helper: l, pure: c } = o;
        c && r(Xa), r(`${l(Or)}(`), _e(a.content, o), r(")");
      })(t, e);
      break;
    case 8:
      wu(t, e);
      break;
    case 3:
      (function(a, o) {
        let { push: r, helper: l, pure: c } = o;
        c && r(Xa), r(`${l(Oa)}(${JSON.stringify(a.content)})`, -3, a);
      })(t, e);
      break;
    case 13:
      (function(a, o) {
        var r, l;
        let c, { push: h, helper: u, pure: d } = o, { tag: p, props: f, children: g, patchFlag: m, dynamicProps: _, directives: y, isBlock: b, disableTracking: x, isComponent: v } = a;
        m && (c = String(m)), y && h(u(Yc) + "("), b && h(`(${u(Tn)}(${x ? "true" : ""}), `), d && h(Xa), h(u(b ? (r = o.inSSR, r || v ? Dn : Rn) : (l = o.inSSR, l || v ? Js : Zs)) + "(", -2, a), Ei(function(k) {
          let S = k.length;
          for (; S-- && k[S] == null; ) ;
          return k.slice(0, S + 1).map((C) => C || "null");
        }([p, f, g, c, _]), o), h(")"), b && h(")"), y && (h(", "), _e(y, o), h(")"));
      })(t, e);
      break;
    case 14:
      (function(a, o) {
        let { push: r, helper: l, pure: c } = o, h = ct(a.callee) ? a.callee : l(a.callee);
        c && r(Xa), r(h + "(", -2, a), Ei(a.arguments, o), r(")");
      })(t, e);
      break;
    case 15:
      (function(a, o) {
        let { push: r, indent: l, deindent: c, newline: h } = o, { properties: u } = a;
        if (!u.length) return r("{}", -2, a);
        let d = u.length > 1;
        r(d ? "{" : "{ "), d && l();
        for (let p = 0; p < u.length; p++) {
          let { key: f, value: g } = u[p];
          (function(m, _) {
            let { push: y } = _;
            if (m.type === 8) y("["), wu(m, _), y("]");
            else if (m.isStatic) {
              let b;
              y((b = m.content, Vl.test(b) ? JSON.stringify(m.content) : m.content), -2, m);
            } else y(`[${m.content}]`, -3, m);
          })(f, o), r(": "), _e(g, o), p < u.length - 1 && (r(","), h());
        }
        d && c(), r(d ? "}" : " }");
      })(t, e);
      break;
    case 17:
      n = t, i = e, ql(n.elements, i);
      break;
    case 18:
      (function(a, o) {
        let { push: r, indent: l, deindent: c } = o, { params: h, returns: u, body: d, newline: p, isSlot: f } = a;
        f && r(`_${ui[Qc]}(`), r("(", -2, a), st(h) ? Ei(h, o) : h && _e(h, o), r(") => "), (p || d) && (r("{"), l()), u ? (p && r("return "), st(u) ? ql(u, o) : _e(u, o)) : d && _e(d, o), (p || d) && (c(), r("}")), f && r(")");
      })(t, e);
      break;
    case 19:
      (function(a, o) {
        let { test: r, consequent: l, alternate: c, newline: h } = a, { push: u, indent: d, deindent: p, newline: f } = o;
        if (r.type === 4) {
          let m, _ = (m = r.content, !!Vl.test(m));
          _ && u("("), Su(r, o), _ && u(")");
        } else u("("), _e(r, o), u(")");
        h && d(), o.indentLevel++, h || u(" "), u("? "), _e(l, o), o.indentLevel--, h && f(), h || u(" "), u(": ");
        let g = c.type === 19;
        !g && o.indentLevel++, _e(c, o), !g && o.indentLevel--, h && p(!0);
      })(t, e);
      break;
    case 20:
      (function(a, o) {
        let { push: r, helper: l, indent: c, deindent: h, newline: u } = o, { needPauseTracking: d, needArraySpread: p } = a;
        p && r("[...("), r(`_cache[${a.index}] || (`), d && (c(), r(`${l(Zo)}(-1`), a.inVOnce && r(", true"), r("),"), u(), r("(")), r(`_cache[${a.index}] = `), _e(a.value, o), d && (r(`).cacheIndex = ${a.index},`), u(), r(`${l(Zo)}(1),`), u(), r(`_cache[${a.index}]`), h()), r(")"), p && r(")]");
      })(t, e);
      break;
    case 21:
      Ei(t.body, e, !0, !1);
  }
}
function Su(t, e) {
  let { content: s, isStatic: n } = t;
  e.push(n ? JSON.stringify(s) : s, -3, t);
}
function wu(t, e) {
  for (let s = 0; s < t.children.length; s++) {
    let n = t.children[s];
    ct(n) ? e.push(n, -3) : _e(n, e);
  }
}
let I0 = kg(/^(?:if|else|else-if)$/, (t, e, s) => function(n, i, a, o) {
  if (i.name !== "else" && (!i.exp || !i.exp.content.trim())) {
    let l = i.exp ? i.exp.loc : n.loc;
    a.onError(Pt(28, i.loc)), i.exp = ft("true", !1, l);
  }
  if (i.name === "if") {
    var r;
    let l = Cu(n, i), c = { type: 9, loc: zt((r = n.loc).start.offset, r.end.offset), branches: [l] };
    if (a.replaceNode(c), o) return o(c, l, !0);
  } else {
    let l = a.parent.children, c = l.indexOf(n);
    for (; c-- >= -1; ) {
      let h = l[c];
      if (h && bg(h)) {
        a.removeNode(h);
        continue;
      }
      if (h && h.type === 9) {
        (i.name === "else-if" || i.name === "else") && h.branches[h.branches.length - 1].condition === void 0 && a.onError(Pt(30, n.loc)), a.removeNode();
        let u = Cu(n, i);
        h.branches.push(u);
        let d = o && o(h, u, !1);
        ir(u, a), d && d(), a.currentNode = null;
      } else a.onError(Pt(30, n.loc));
      break;
    }
  }
}(t, e, s, (n, i, a) => {
  let o = s.parent.children, r = o.indexOf(n), l = 0;
  for (; r-- >= 0; ) {
    let c = o[r];
    c && c.type === 9 && (l += c.branches.length);
  }
  return () => {
    a ? n.codegenNode = ku(i, l, s) : function(c) {
      for (; ; ) if (c.type === 19) {
        if (c.alternate.type !== 19) return c;
        c = c.alternate;
      } else c.type === 20 && (c = c.value);
    }(n.codegenNode).alternate = ku(i, l + n.branches.length - 1, s);
  };
}));
function Cu(t, e) {
  let s = t.tagType === 3;
  return { type: 10, loc: t.loc, condition: e.name === "else" ? void 0 : e.exp, children: s && !$e(t, "for") ? t.children : [t], userKey: Er(t, "key"), isTemplateIf: s };
}
function ku(t, e, s) {
  return t.condition ? Wl(t.condition, Mu(t, e, s), Jt(s.helper(Oa), ['""', "true"])) : Mu(t, e, s);
}
function Mu(t, e, s) {
  let { helper: n } = s, i = Kt("key", ft(`${e}`, !1, Ee, 2)), { children: a } = t, o = a[0];
  if (a.length !== 1 || o.type !== 1) {
    if (a.length !== 1 || o.type !== 11) return pa(s, n(da), je([i]), a, 64, void 0, void 0, !0, !1, !1, t.loc);
    {
      let r = o.codegenNode;
      return sr(r, i, s), r;
    }
  }
  {
    let r = o.codegenNode, l = r.type === 14 && r.callee === th ? r.arguments[1].returns : r;
    return l.type === 13 && eh(l, s), sr(l, i, s), r;
  }
}
let N0 = kg("for", (t, e, s) => {
  let { helper: n, removeHelper: i } = s;
  return function(a, o, r, l) {
    if (!o.exp) return void r.onError(Pt(31, o.loc));
    let c = o.forParseResult;
    if (!c) return void r.onError(Pt(32, o.loc));
    Mg(c);
    let { scopes: h } = r, { source: u, value: d, key: p, index: f } = c, g = { type: 11, loc: o.loc, source: u, valueAlias: d, keyAlias: p, objectIndexAlias: f, parseResult: c, children: tr(a) ? a.children : [a] };
    r.replaceNode(g), h.vFor++;
    let m = l && l(g);
    return () => {
      h.vFor--, m && m();
    };
  }(t, e, s, (a) => {
    let o = Jt(n(Kc), [a.source]), r = tr(t), l = $e(t, "memo"), c = Er(t, "key", !1, !0);
    c && c.type;
    let h = c && (c.type === 6 ? c.value ? ft(c.value.content, !0) : void 0 : c.exp), u = c && h ? Kt("key", h) : null, d = a.source.type === 4 && a.source.constType > 0, p = d ? 64 : c ? 128 : 256;
    return a.codegenNode = pa(s, n(da), void 0, o, p, void 0, void 0, !0, !d, !1, t.loc), () => {
      let f, { children: g } = a, m = g.length !== 1 || g[0].type !== 1, _ = er(t) ? t : r && t.children.length === 1 && er(t.children[0]) ? t.children[0] : null;
      if (_) f = _.codegenNode, r && u && sr(f, u, s);
      else if (m) f = pa(s, n(da), u ? je([u]) : void 0, t.children, 64, void 0, void 0, !0, void 0, !1);
      else {
        var y, b, x, v, k, S, C, D;
        f = g[0].codegenNode, r && u && sr(f, u, s), !d !== f.isBlock && (f.isBlock ? (i(Tn), i((y = s.inSSR, b = f.isComponent, y || b ? Dn : Rn))) : i((x = s.inSSR, v = f.isComponent, x || v ? Js : Zs))), f.isBlock = !d, f.isBlock ? (n(Tn), n((k = s.inSSR, S = f.isComponent, k || S ? Dn : Rn))) : n((C = s.inSSR, D = f.isComponent, C || D ? Js : Zs));
      }
      if (l) {
        let O = di(Yl(a.parseResult, [ft("_cached")]));
        O.body = { type: 21, body: [qe(["const _memo = (", l.exp, ")"]), qe(["if (_cached && _cached.el", ...h ? [" && _cached.key === ", h] : [], ` && ${s.helperString(ug)}(_cached, _memo)) return _cached`]), qe(["const _item = ", f]), ft("_item.memo = _memo"), ft("return _item")], loc: Ee }, o.arguments.push(O, ft("_cache"), ft(String(s.cached.length))), s.cached.push(null);
      } else o.arguments.push(di(Yl(a.parseResult), f, !0));
    };
  });
});
function Mg(t, e) {
  t.finalized || (t.finalized = !0);
}
function Yl({ value: t, key: e, index: s }, n = []) {
  var i = [t, e, s, ...n];
  let a = i.length;
  for (; a-- && !i[a]; ) ;
  return i.slice(0, a + 1).map((o, r) => o || ft("_".repeat(r + 1), !1));
}
let Au = ft("undefined", !1), B0 = (t, e) => {
  if (t.type === 1 && (t.tagType === 1 || t.tagType === 3)) {
    let s = $e(t, "slot");
    if (s) return s.exp, e.scopes.vSlot++, () => {
      e.scopes.vSlot--;
    };
  }
};
function Ja(t, e, s) {
  let n = [Kt("name", t), Kt("fn", e)];
  return s != null && n.push(Kt("key", ft(String(s), !0))), je(n);
}
let Ag = /* @__PURE__ */ new WeakMap(), $0 = (t, e) => function() {
  let s, n, i, a, o;
  if ((t = e.currentNode).type !== 1 || t.tagType !== 0 && t.tagType !== 1) return;
  let { tag: r, props: l } = t, c = t.tagType === 1, h = c ? function(f, g, m = !1) {
    let { tag: _ } = f, y = Kl(_), b = Er(f, "is", !1, !0);
    if (b) if (y) {
      let v;
      if (b.type === 6 ? v = b.value && ft(b.value.content, !0) : (v = b.exp) || (v = ft("is", !1, b.arg.loc)), v) return Jt(g.helper(Bl), [v]);
    } else b.type === 6 && b.value.content.startsWith("vue:") && (_ = b.value.content.slice(4));
    let x = fg(_) || g.isBuiltInComponent(_);
    return x ? (m || g.helper(x), x) : (g.helper(Uc), g.components.add(_), zl(_, "component"));
  }(t, e) : `"${r}"`, u = St(h) && h.callee === Bl, d = 0, p = u || h === Ki || h === zc || !c && (r === "svg" || r === "foreignObject" || r === "math");
  if (l.length > 0) {
    let f = Pg(t, e, void 0, c, u);
    s = f.props, d = f.patchFlag, a = f.dynamicPropNames;
    let g = f.directives;
    o = g && g.length ? wn(g.map((m) => function(_, y) {
      let b = [], x = Ag.get(_);
      x ? b.push(y.helperString(x)) : (y.helper(qc), y.directives.add(_.name), b.push(zl(_.name, "directive")));
      let { loc: v } = _;
      if (_.exp && b.push(_.exp), _.arg && (_.exp || b.push("void 0"), b.push(_.arg)), Object.keys(_.modifiers).length) {
        _.arg || (_.exp || b.push("void 0"), b.push("void 0"));
        let k = ft("true", !1, v);
        b.push(je(_.modifiers.map((S) => Kt(S, k)), v));
      }
      return wn(b, _.loc);
    }(m, e))) : void 0, f.shouldUseBlock && (p = !0);
  }
  if (t.children.length > 0) if (h === Xo && (p = !0, d |= 1024), c && h !== Ki && h !== Xo) {
    let { slots: f, hasDynamicSlots: g } = function(m, _, y = (b, x, v, k) => di(b, v, !1, !0, v.length ? v[0].loc : k)) {
      _.helper(Qc);
      let { children: b, loc: x } = m, v = [], k = [], S = _.scopes.vSlot > 0 || _.scopes.vFor > 0, C = $e(m, "slot", !0);
      if (C) {
        let { arg: M, exp: T } = C;
        M && !Pe(M) && (S = !0), v.push(Kt(M || ft("default", !0), y(T, void 0, b, x)));
      }
      let D = !1, O = !1, I = [], w = /* @__PURE__ */ new Set(), E = 0;
      for (let M = 0; M < b.length; M++) {
        let T, F, H, Y, Z = b[M];
        if (!tr(Z) || !(T = $e(Z, "slot", !0))) {
          Z.type !== 3 && I.push(Z);
          continue;
        }
        if (C) {
          _.onError(Pt(37, T.loc));
          break;
        }
        D = !0;
        let { children: nt, loc: dt } = Z, { arg: lt = ft("default", !0), exp: pt, loc: _t } = T;
        Pe(lt) ? F = lt ? lt.content : "default" : S = !0;
        let K = $e(Z, "for"), q = y(pt, K, nt, dt);
        if (H = $e(Z, "if")) S = !0, k.push(Wl(H.exp, Ja(lt, q, E++), Au));
        else if (Y = $e(Z, /^else(?:-if)?$/, !0)) {
          let U, at = M;
          for (; at-- && bg(U = b[at]); ) ;
          if (U && tr(U) && $e(U, /^(?:else-)?if$/)) {
            let A = k[k.length - 1];
            for (; A.alternate.type === 19; ) A = A.alternate;
            A.alternate = Y.exp ? Wl(Y.exp, Ja(lt, q, E++), Au) : Ja(lt, q, E++);
          } else _.onError(Pt(30, Y.loc));
        } else if (K) {
          S = !0;
          let U = K.forParseResult;
          U ? (Mg(U), k.push(Jt(_.helper(Kc), [U.source, di(Yl(U), Ja(lt, q), !0)]))) : _.onError(Pt(32, K.loc));
        } else {
          if (F) {
            if (w.has(F)) {
              _.onError(Pt(38, _t));
              continue;
            }
            w.add(F), F === "default" && (O = !0);
          }
          v.push(Kt(lt, q));
        }
      }
      if (!C) {
        let M = (T, F) => Kt("default", y(T, void 0, F, x));
        D ? I.length && !I.every(sh) && (O ? _.onError(Pt(39, I[0].loc)) : v.push(M(void 0, I))) : v.push(M(void 0, b));
      }
      let L = S ? 2 : function M(T) {
        for (let F = 0; F < T.length; F++) {
          let H = T[F];
          switch (H.type) {
            case 1:
              if (H.tagType === 2 || M(H.children)) return !0;
              break;
            case 9:
              if (M(H.branches)) return !0;
              break;
            case 10:
            case 11:
              if (M(H.children)) return !0;
          }
        }
        return !1;
      }(m.children) ? 3 : 1, P = je(v.concat(Kt("_", ft(L + "", !1))), x);
      return k.length && (P = Jt(_.helper(hg), [P, wn(k)])), { slots: P, hasDynamicSlots: S };
    }(t, e);
    n = f, g && (d |= 1024);
  } else if (t.children.length === 1 && h !== Ki) {
    let f = t.children[0], g = f.type, m = g === 5 || g === 8;
    m && Oe(f, e) === 0 && (d |= 1), n = m || g === 2 ? f : t.children;
  } else n = t.children;
  a && a.length && (i = function(f) {
    let g = "[";
    for (let m = 0, _ = f.length; m < _; m++) g += JSON.stringify(f[m]), m < _ - 1 && (g += ", ");
    return g + "]";
  }(a)), t.codegenNode = pa(e, h, s, n, d === 0 ? void 0 : d, i, o, !!p, !1, c, t.loc);
};
function Pg(t, e, s = t.props, n, i, a = !1) {
  let o, { tag: r, loc: l, children: c } = t, h = [], u = [], d = [], p = c.length > 0, f = !1, g = 0, m = !1, _ = !1, y = !1, b = !1, x = !1, v = !1, k = [], S = (O) => {
    h.length && (u.push(je(Pu(h), l)), h = []), O && u.push(O);
  }, C = () => {
    e.scopes.vFor > 0 && h.push(Kt(ft("ref_for", !0), ft("true")));
  }, D = ({ key: O, value: I }) => {
    if (Pe(O)) {
      let w = O.content, E = En(w);
      E && (!n || i) && w.toLowerCase() !== "onclick" && w !== "onUpdate:modelValue" && !ws(w) && (b = !0), E && ws(w) && (v = !0), E && I.type === 14 && (I = I.arguments[0]), I.type === 20 || (I.type === 4 || I.type === 8) && Oe(I, e) > 0 || (w === "ref" ? m = !0 : w === "class" ? _ = !0 : w === "style" ? y = !0 : w === "key" || k.includes(w) || k.push(w), n && (w === "class" || w === "style") && !k.includes(w) && k.push(w));
    } else x = !0;
  };
  for (let O = 0; O < s.length; O++) {
    let I = s[O];
    if (I.type === 6) {
      let { loc: w, name: E, nameLoc: L, value: P } = I;
      if (E === "ref" && (m = !0, C()), E === "is" && (Kl(r) || P && P.content.startsWith("vue:"))) continue;
      h.push(Kt(ft(E, !0, L), ft(P ? P.content : "", !0, P ? P.loc : w)));
    } else {
      let { name: w, arg: E, exp: L, loc: P, modifiers: M } = I, T = w === "bind", F = w === "on";
      if (w === "slot") {
        n || e.onError(Pt(40, P));
        continue;
      }
      if (w === "once" || w === "memo" || w === "is" || T && Xn(E, "is") && Kl(r) || F && a) continue;
      if ((T && Xn(E, "key") || F && p && Xn(E, "vue:before-update")) && (f = !0), T && Xn(E, "ref") && C(), !E && (T || F)) {
        x = !0, L ? T ? (C(), S(), u.push(L)) : S({ type: 14, loc: P, callee: e.helper(Zc), arguments: n ? [L] : [L, "true"] }) : e.onError(Pt(T ? 34 : 35, P));
        continue;
      }
      T && M.some((Y) => Y.content === "prop") && (g |= 32);
      let H = e.directiveTransforms[w];
      if (H) {
        let { props: Y, needRuntime: Z } = H(I, t, e);
        a || Y.forEach(D), F && E && !Pe(E) ? S(je(Y, l)) : h.push(...Y), Z && (d.push(I), ge(Z) && Ag.set(I, Z));
      } else !Um(w) && (d.push(I), p && (f = !0));
    }
  }
  if (u.length ? (S(), o = u.length > 1 ? Jt(e.helper(Jo), u, l) : u[0]) : h.length && (o = je(Pu(h), l)), x ? g |= 16 : (_ && !n && (g |= 2), y && !n && (g |= 4), k.length && (g |= 8), b && (g |= 32)), !f && (g === 0 || g === 32) && (m || v || d.length > 0) && (g |= 512), !e.inSSR && o) switch (o.type) {
    case 15:
      let O = -1, I = -1, w = !1;
      for (let P = 0; P < o.properties.length; P++) {
        let M = o.properties[P].key;
        Pe(M) ? M.content === "class" ? O = P : M.content === "style" && (I = P) : M.isHandlerKey || (w = !0);
      }
      let E = o.properties[O], L = o.properties[I];
      w ? o = Jt(e.helper(fa), [o]) : (E && !Pe(E.value) && (E.value = Jt(e.helper(Xc), [E.value])), L && (y || L.value.type === 4 && L.value.content.trim()[0] === "[" || L.value.type === 17) && (L.value = Jt(e.helper(Jc), [L.value])));
      break;
    case 14:
      break;
    default:
      o = Jt(e.helper(fa), [Jt(e.helper(Ea), [o])]);
  }
  return { props: o, directives: d, patchFlag: g, dynamicPropNames: k, shouldUseBlock: f };
}
function Pu(t) {
  let e = /* @__PURE__ */ new Map(), s = [];
  for (let a = 0; a < t.length; a++) {
    var n, i;
    let o = t[a];
    if (o.key.type === 8 || !o.key.isStatic) {
      s.push(o);
      continue;
    }
    let r = o.key.content, l = e.get(r);
    l ? (r === "style" || r === "class" || En(r)) && (n = l, i = o, n.value.type === 17 ? n.value.elements.push(i.value) : n.value = wn([n.value, i.value], n.loc)) : (e.set(r, o), s.push(o));
  }
  return s;
}
function Kl(t) {
  return t === "component" || t === "Component";
}
let j0 = (t, e) => {
  if (er(t)) {
    let { children: s, loc: n } = t, { slotName: i, slotProps: a } = function(l, c) {
      let h, u = '"default"', d = [];
      for (let p = 0; p < l.props.length; p++) {
        let f = l.props[p];
        if (f.type === 6) f.value && (f.name === "name" ? u = JSON.stringify(f.value.content) : (f.name = Tt(f.name), d.push(f)));
        else if (f.name === "bind" && Xn(f.arg, "name")) {
          if (f.exp) u = f.exp;
          else if (f.arg && f.arg.type === 4) {
            let g = Tt(f.arg.content);
            u = f.exp = ft(g, !1, f.arg.loc);
          }
        } else f.name === "bind" && f.arg && Pe(f.arg) && (f.arg.content = Tt(f.arg.content)), d.push(f);
      }
      if (d.length > 0) {
        let { props: p, directives: f } = Pg(l, c, d, !1, !1);
        h = p, f.length && c.onError(Pt(36, f[0].loc));
      }
      return { slotName: u, slotProps: h };
    }(t, e), o = [e.prefixIdentifiers ? "_ctx.$slots" : "$slots", i, "{}", "undefined", "true"], r = 2;
    a && (o[2] = a, r = 3), s.length && (o[3] = di([], s, !1, !1, n), r = 4), e.scopeId && !e.slotted && (r = 5), o.splice(r), t.codegenNode = Jt(e.helper(cg), o, n);
  }
}, Tg = (t, e, s, n) => {
  let i, { loc: a, modifiers: o, arg: r } = t;
  if (!t.exp && o.length, r.type === 4) if (r.isStatic) {
    let u = r.content;
    u.startsWith("vue:") && (u = `vnode-${u.slice(4)}`), i = ft(e.tagType !== 0 || u.startsWith("vnode") || !/[A-Z]/.test(u) ? Qn(Tt(u)) : `on:${u}`, !0, r.loc);
  } else i = qe([`${s.helperString(jl)}(`, r, ")"]);
  else (i = r).children.unshift(`${s.helperString(jl)}(`), i.children.push(")");
  let l = t.exp;
  l && !l.content.trim() && (l = void 0);
  let c = s.cacheHandlers && !l && !s.inVOnce;
  if (l) {
    let u, d = mg(l), p = !(d || (u = l, P0.test(gg(u)))), f = l.content.includes(";");
    (p || c && d) && (l = qe([`${p ? "$event" : "(...args)"} => ${f ? "{" : "("}`, l, f ? "}" : ")"]));
  }
  let h = { props: [Kt(i, l || ft("() => {}", !1, a))] };
  return n && (h = n(h)), c && (h.props[0].value = s.cache(h.props[0].value)), h.props.forEach((u) => u.key.isHandlerKey = !0), h;
}, W0 = (t, e, s) => {
  let { modifiers: n } = t, i = t.arg, { exp: a } = t;
  return a && a.type === 4 && !a.content.trim() && (a = void 0), i.type !== 4 ? (i.children.unshift("("), i.children.push(') || ""')) : i.isStatic || (i.content = i.content ? `${i.content} || ""` : '""'), n.some((o) => o.content === "camel") && (i.type === 4 ? i.isStatic ? i.content = Tt(i.content) : i.content = `${s.helperString($l)}(${i.content})` : (i.children.unshift(`${s.helperString($l)}(`), i.children.push(")"))), !s.inSSR && (n.some((o) => o.content === "prop") && Tu(i, "."), n.some((o) => o.content === "attr") && Tu(i, "^")), { props: [Kt(i, a)] };
}, Tu = (t, e) => {
  t.type === 4 ? t.isStatic ? t.content = e + t.content : t.content = `\`${e}\${${t.content}}\`` : (t.children.unshift(`'${e}' + (`), t.children.push(")"));
}, H0 = (t, e) => {
  if (t.type === 0 || t.type === 1 || t.type === 11 || t.type === 10) return () => {
    let s, n = t.children, i = !1;
    for (let a = 0; a < n.length; a++) {
      let o = n[a];
      if (il(o)) {
        i = !0;
        for (let r = a + 1; r < n.length; r++) {
          let l = n[r];
          if (il(l)) s || (s = n[a] = qe([o], o.loc)), s.children.push(" + ", l), n.splice(r, 1), r--;
          else {
            s = void 0;
            break;
          }
        }
      }
    }
    if (i && (n.length !== 1 || t.type !== 0 && (t.type !== 1 || t.tagType !== 0 || t.props.find((a) => a.type === 7 && !e.directiveTransforms[a.name])))) for (let a = 0; a < n.length; a++) {
      let o = n[a];
      if (il(o) || o.type === 8) {
        let r = [];
        (o.type !== 2 || o.content !== " ") && r.push(o), e.ssr || Oe(o, e) !== 0 || r.push("1"), n[a] = { type: 12, content: o, loc: o.loc, codegenNode: Jt(e.helper(Gc), r) };
      }
    }
  };
}, Du = /* @__PURE__ */ new WeakSet(), V0 = (t, e) => {
  if (t.type === 1 && $e(t, "once", !0) && !Du.has(t) && !e.inVOnce && !e.inSSR) return Du.add(t), e.inVOnce = !0, e.helper(Zo), () => {
    e.inVOnce = !1;
    let s = e.currentNode;
    s.codegenNode && (s.codegenNode = e.cache(s.codegenNode, !0, !0));
  };
}, Dg = (t, e, s) => {
  let n, { exp: i, arg: a } = t;
  if (!i) return s.onError(Pt(41, t.loc)), Za();
  let o = i.loc.source.trim(), r = i.type === 4 ? i.content : o, l = s.bindingMetadata[o];
  if (l === "props" || l === "props-aliased" || l === "literal-const" || l === "setup-const") return i.loc, Za();
  if (!r.trim() || !mg(i)) return s.onError(Pt(42, i.loc)), Za();
  let c = a || ft("modelValue", !0), h = a ? Pe(a) ? `onUpdate:${Tt(a.content)}` : qe(['"onUpdate:" + ', a]) : "onUpdate:modelValue", u = s.isTS ? "($event: any)" : "$event";
  n = qe([`${u} => ((`, i, ") = $event)"]);
  let d = [Kt(c, t.exp), Kt(h, n)];
  if (t.modifiers.length && e.tagType === 1) {
    let p = t.modifiers.map((g) => g.content).map((g) => (Vl.test(g) ? JSON.stringify(g) : g) + ": true").join(", "), f = a ? Pe(a) ? `${a.content}Modifiers` : qe([a, ' + "Modifiers"']) : "modelModifiers";
    d.push(Kt(f, ft(`{ ${p} }`, !1, t.loc, 2)));
  }
  return Za(d);
};
function Za(t = []) {
  return { props: t };
}
let Ru = /* @__PURE__ */ new WeakSet(), z0 = (t, e) => {
  if (t.type === 1) {
    let s = $e(t, "memo");
    if (!(!s || Ru.has(t)) && !e.inSSR) return Ru.add(t), () => {
      let n = t.codegenNode || e.currentNode.codegenNode;
      n && n.type === 13 && (t.tagType !== 1 && eh(n, e), t.codegenNode = Jt(e.helper(th), [s.exp, di(void 0, n), "_cache", String(e.cached.length)]), e.cached.push(null));
    };
  }
}, G0 = (t, e) => {
  if (t.type === 1) {
    for (let s of t.props) if (s.type === 7 && s.name === "bind" && (!s.exp || s.exp.type === 4 && !s.exp.content.trim()) && s.arg) {
      let n = s.arg;
      if (n.type === 4 && n.isStatic) {
        let i = Tt(n.content);
        (pg.test(i[0]) || i[0] === "-") && (s.exp = ft(i, !1, n.loc));
      } else e.onError(Pt(53, n.loc)), s.exp = ft("", !0, n.loc);
    }
  }
}, Rg = Symbol(""), Lg = Symbol(""), Og = Symbol(""), Eg = Symbol(""), Xl = Symbol(""), Fg = Symbol(""), Ig = Symbol(""), Ng = Symbol(""), Bg = Symbol(""), $g = Symbol("");
Object.getOwnPropertySymbols(hu = { [Rg]: "vModelRadio", [Lg]: "vModelCheckbox", [Og]: "vModelText", [Eg]: "vModelSelect", [Xl]: "vModelDynamic", [Fg]: "withModifiers", [Ig]: "withKeys", [Ng]: "vShow", [Bg]: "Transition", [$g]: "TransitionGroup" }).forEach((t) => {
  ui[t] = hu[t];
});
let U0 = { parseMode: "html", isVoidTag: ny, isNativeTag: (t) => ty(t) || ey(t) || sy(t), isPreTag: (t) => t === "pre", isIgnoreNewlineTag: (t) => t === "pre" || t === "textarea", decodeEntities: function(t, e = !1) {
  return $n || ($n = document.createElement("div")), e ? ($n.innerHTML = `<div foo="${t.replace(/"/g, "&quot;")}">`, $n.children[0].getAttribute("foo")) : ($n.innerHTML = t, $n.textContent);
}, isBuiltInComponent: (t) => t === "Transition" || t === "transition" ? Bg : t === "TransitionGroup" || t === "transition-group" ? $g : void 0, getNamespace(t, e, s) {
  let n = e ? e.ns : s;
  if (e && n === 2) if (e.tag === "annotation-xml") {
    if (t === "svg") return 1;
    e.props.some((i) => i.type === 6 && i.name === "encoding" && i.value != null && (i.value.content === "text/html" || i.value.content === "application/xhtml+xml")) && (n = 0);
  } else /^m(?:[ions]|text)$/.test(e.tag) && t !== "mglyph" && t !== "malignmark" && (n = 0);
  else e && n === 1 && (e.tag === "foreignObject" || e.tag === "desc" || e.tag === "title") && (n = 0);
  if (n === 0) {
    if (t === "svg") return 1;
    if (t === "math") return 2;
  }
  return n;
} }, q0 = Fe("passive,once,capture"), Y0 = Fe("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"), K0 = Fe("left,right"), Lu = Fe("onkeyup,onkeydown,onkeypress"), Ou = (t, e) => Pe(t) && t.content.toLowerCase() === "onclick" ? ft(e, !0) : t.type !== 4 ? qe(["(", t, `) === "onClick" ? "${e}" : (`, t, ")"]) : t, X0 = (t, e) => {
  t.type === 1 && t.tagType === 0 && (t.tag === "script" || t.tag === "style") && e.removeNode();
}, J0 = [(t) => {
  t.type === 1 && t.props.forEach((e, s) => {
    let n, i;
    e.type === 6 && e.name === "style" && e.value && (t.props[s] = { type: 7, name: "bind", arg: ft("style", !0, e.loc), exp: (n = e.value.content, i = e.loc, ft(JSON.stringify(mf(n)), !1, i, 3)), modifiers: [], loc: e.loc });
  });
}], Z0 = { cloak: () => ({ props: [] }), html: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(54, i)), e.children.length && (s.onError(Pt(55, i)), e.children.length = 0), { props: [Kt(ft("innerHTML", !0, i), n || ft("", !0))] };
}, text: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(56, i)), e.children.length && (s.onError(Pt(57, i)), e.children.length = 0), { props: [Kt(ft("textContent", !0), n ? Oe(n, s) > 0 ? n : Jt(s.helperString(Or), [n], i) : ft("", !0))] };
}, model: (t, e, s) => {
  let n = Dg(t, e, s);
  if (!n.props.length || e.tagType === 1) return n;
  t.arg && s.onError(Pt(59, t.arg.loc));
  let { tag: i } = e, a = s.isCustomElement(i);
  if (i === "input" || i === "textarea" || i === "select" || a) {
    let o = Og, r = !1;
    if (i === "input" || a) {
      let l = Er(e, "type");
      if (l) {
        if (l.type === 7) o = Xl;
        else if (l.value) switch (l.value.content) {
          case "radio":
            o = Rg;
            break;
          case "checkbox":
            o = Lg;
            break;
          case "file":
            r = !0, s.onError(Pt(60, t.loc));
        }
      } else e.props.some((c) => c.type === 7 && c.name === "bind" && (!c.arg || c.arg.type !== 4 || !c.arg.isStatic)) && (o = Xl);
    } else i === "select" && (o = Eg);
    r || (n.needRuntime = s.helper(o));
  } else s.onError(Pt(58, t.loc));
  return n.props = n.props.filter((o) => o.key.type !== 4 || o.key.content !== "modelValue"), n;
}, on: (t, e, s) => Tg(t, e, s, (n) => {
  let { modifiers: i } = t;
  if (!i.length) return n;
  let { key: a, value: o } = n.props[0], { keyModifiers: r, nonKeyModifiers: l, eventOptionModifiers: c } = ((h, u, d, p) => {
    let f = [], g = [], m = [];
    for (let _ = 0; _ < u.length; _++) {
      let y = u[_].content;
      q0(y) ? m.push(y) : K0(y) ? Pe(h) ? Lu(h.content.toLowerCase()) ? f.push(y) : g.push(y) : (f.push(y), g.push(y)) : Y0(y) ? g.push(y) : f.push(y);
    }
    return { keyModifiers: f, nonKeyModifiers: g, eventOptionModifiers: m };
  })(a, i, 0, t.loc);
  if (l.includes("right") && (a = Ou(a, "onContextmenu")), l.includes("middle") && (a = Ou(a, "onMouseup")), l.length && (o = Jt(s.helper(Fg), [o, JSON.stringify(l)])), r.length && (!Pe(a) || Lu(a.content.toLowerCase())) && (o = Jt(s.helper(Ig), [o, JSON.stringify(r)])), c.length) {
    let h = c.map(Fn).join("");
    a = Pe(a) ? ft(`${a.content}${h}`, !0) : qe(["(", a, `) + "${h}"`]);
  }
  return { props: [Kt(a, o)] };
}), show: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(62, i)), { props: [], needRuntime: s.helper(Ng) };
} }, Eu = /* @__PURE__ */ Object.create(null);
function Q0(t, e) {
  if (!ct(t)) if (t.nodeType) t = t.innerHTML;
  else return ie;
  let s = t + JSON.stringify(e, (r, l) => typeof l == "function" ? l.toString() : l), n = Eu[s];
  if (n) return n;
  if (t[0] === "#") {
    let r = document.querySelector(t);
    t = r ? r.innerHTML : "";
  }
  let i = gt({ hoistStatic: !0, onError: void 0, onWarn: ie }, e);
  !i.isCustomElement && "u" > typeof customElements && (i.isCustomElement = (r) => !!customElements.get(r));
  let { code: a } = function(r, l = {}) {
    return function(c, h = {}) {
      var u;
      let d, p = h.onError || Hl, f = h.mode === "module";
      h.prefixIdentifiers === !0 ? p(Pt(48)) : f && p(Pt(49)), h.cacheHandlers && p(Pt(50)), h.scopeId && !f && p(Pt(51));
      let g = gt({}, h, { prefixIdentifiers: !1 }), m = ct(c) ? function(b, x) {
        if (Gt.reset(), he = null, Ct = null, De = "", hs = -1, dn = -1, $t.length = 0, Ms = b, Lt = gt({}, _g), x) {
          let S;
          for (S in x) x[S] != null && (Lt[S] = x[S]);
        }
        Gt.mode = Lt.parseMode === "html" ? 1 : 2 * (Lt.parseMode === "sfc"), Gt.inXML = Lt.ns === 1 || Lt.ns === 2;
        let v = x && x.delimiters;
        v && (Gt.delimiterOpen = Qo(v[0]), Gt.delimiterClose = Qo(v[1]));
        let k = nr = /* @__PURE__ */ function(S, C = "") {
          return { type: 0, source: C, children: S, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: Ee };
        }([], b);
        return Gt.parse(Ms), k.loc = zt(0, b.length), k.children = vg(k.children), nr = null, k;
      }(c, g) : c, [_, y] = [[G0, V0, I0, z0, N0, j0, $0, B0, H0], { on: Tg, bind: W0, model: Dg }];
      return d = function(b, { filename: x = "", prefixIdentifiers: v = !1, hoistStatic: k = !1, hmr: S = !1, cacheHandlers: C = !1, nodeTransforms: D = [], directiveTransforms: O = {}, transformHoist: I = null, isBuiltInComponent: w = ie, isCustomElement: E = ie, expressionPlugins: L = [], scopeId: P = null, slotted: M = !0, ssr: T = !1, inSSR: F = !1, ssrCssVars: H = "", bindingMetadata: Y = yt, inline: Z = !1, isTS: nt = !1, onError: dt = Hl, onWarn: lt = dg, compatConfig: pt }) {
        let _t = x.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), K = { filename: x, selfName: _t && Fn(Tt(_t[1])), prefixIdentifiers: v, hoistStatic: k, hmr: S, cacheHandlers: C, nodeTransforms: D, directiveTransforms: O, transformHoist: I, isBuiltInComponent: w, isCustomElement: E, expressionPlugins: L, scopeId: P, slotted: M, ssr: T, inSSR: F, ssrCssVars: H, bindingMetadata: Y, inline: Z, isTS: nt, onError: dt, onWarn: lt, compatConfig: pt, root: b, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: b, childIndex: 0, inVOnce: !1, helper(q) {
          let U = K.helpers.get(q) || 0;
          return K.helpers.set(q, U + 1), q;
        }, removeHelper(q) {
          let U = K.helpers.get(q);
          if (U) {
            let at = U - 1;
            at ? K.helpers.set(q, at) : K.helpers.delete(q);
          }
        }, helperString: (q) => `_${ui[K.helper(q)]}`, replaceNode(q) {
          K.parent.children[K.childIndex] = K.currentNode = q;
        }, removeNode(q) {
          let U = K.parent.children, at = q ? U.indexOf(q) : K.currentNode ? K.childIndex : -1;
          q && q !== K.currentNode ? K.childIndex > at && (K.childIndex--, K.onNodeRemoved()) : (K.currentNode = null, K.onNodeRemoved()), K.parent.children.splice(at, 1);
        }, onNodeRemoved: ie, addIdentifiers(q) {
        }, removeIdentifiers(q) {
        }, hoist(q) {
          ct(q) && (q = ft(q)), K.hoists.push(q);
          let U = ft(`_hoisted_${K.hoists.length}`, !1, q.loc, 2);
          return U.hoisted = q, U;
        }, cache(q, U = !1, at = !1) {
          let A = /* @__PURE__ */ function(R, N, z = !1, $ = !1) {
            return { type: 20, index: R, value: N, needPauseTracking: z, inVOnce: $, needArraySpread: !1, loc: Ee };
          }(K.cached.length, q, U, at);
          return K.cached.push(A), A;
        } };
        return K;
      }(m, u = gt({}, g, { nodeTransforms: [..._, ...h.nodeTransforms || []], directiveTransforms: gt({}, y, h.directiveTransforms || {}) })), ir(m, d), u.hoistStatic && function b(x, v, k, S = !1, C = !1) {
        let { children: D } = x, O = [];
        for (let L = 0; L < D.length; L++) {
          let P = D[L];
          if (P.type === 1 && P.tagType === 0) {
            let M = S ? 0 : Oe(P, k);
            if (M > 0) {
              if (M >= 2) {
                P.codegenNode.patchFlag = -1, O.push(P);
                continue;
              }
            } else {
              let T = P.codegenNode;
              if (T.type === 13) {
                let F = T.patchFlag;
                if ((F === void 0 || F === 512 || F === 1) && wg(P, k) >= 2) {
                  let H = Cg(P);
                  H && (T.props = k.hoist(H));
                }
                T.dynamicProps && (T.dynamicProps = k.hoist(T.dynamicProps));
              }
            }
          } else if (P.type === 12 && (S ? 0 : Oe(P, k)) >= 2) {
            P.codegenNode.type === 14 && P.codegenNode.arguments.length > 0 && P.codegenNode.arguments.push("-1"), O.push(P);
            continue;
          }
          if (P.type === 1) {
            let M = P.tagType === 1;
            M && k.scopes.vSlot++, b(P, x, k, !1, C), M && k.scopes.vSlot--;
          } else if (P.type === 11) b(P, x, k, P.children.length === 1, !0);
          else if (P.type === 9) for (let M = 0; M < P.branches.length; M++) b(P.branches[M], x, k, P.branches[M].children.length === 1, C);
        }
        let I = !1;
        if (O.length === D.length && x.type === 1) {
          if (x.tagType === 0 && x.codegenNode && x.codegenNode.type === 13 && st(x.codegenNode.children)) x.codegenNode.children = w(wn(x.codegenNode.children)), I = !0;
          else if (x.tagType === 1 && x.codegenNode && x.codegenNode.type === 13 && x.codegenNode.children && !st(x.codegenNode.children) && x.codegenNode.children.type === 15) {
            let L = E(x.codegenNode, "default");
            L && (L.returns = w(wn(L.returns)), I = !0);
          } else if (x.tagType === 3 && v && v.type === 1 && v.tagType === 1 && v.codegenNode && v.codegenNode.type === 13 && v.codegenNode.children && !st(v.codegenNode.children) && v.codegenNode.children.type === 15) {
            let L = $e(x, "slot", !0), P = L && L.arg && E(v.codegenNode, L.arg);
            P && (P.returns = w(wn(P.returns)), I = !0);
          }
        }
        if (!I) for (let L of O) L.codegenNode = k.cache(L.codegenNode);
        function w(L) {
          let P = k.cache(L);
          return P.needArraySpread = !0, P;
        }
        function E(L, P) {
          if (L.children && !st(L.children) && L.children.type === 15) {
            let M = L.children.properties.find((T) => T.key === P || T.key.content === P);
            return M && M.value;
          }
        }
        O.length && k.transformHoist && k.transformHoist(D, k, x);
      }(m, void 0, d, !!_u(m)), u.ssr || function(b, x) {
        let { helper: v } = x, { children: k } = b;
        if (k.length === 1) {
          let S = _u(b);
          if (S && S.codegenNode) {
            let C = S.codegenNode;
            C.type === 13 && eh(C, x), b.codegenNode = C;
          } else b.codegenNode = k[0];
        } else k.length > 1 && (b.codegenNode = pa(x, v(da), void 0, b.children, 64, void 0, void 0, !0, void 0, !1));
      }(m, d), m.helpers = /* @__PURE__ */ new Set([...d.helpers.keys()]), m.components = [...d.components], m.directives = [...d.directives], m.imports = d.imports, m.hoists = d.hoists, m.temps = d.temps, m.cached = d.cached, m.transformed = !0, function(b, x = {}) {
        let v = function(T, { mode: F = "function", prefixIdentifiers: H = F === "module", sourceMap: Y = !1, filename: Z = "template.vue.html", scopeId: nt = null, optimizeImports: dt = !1, runtimeGlobalName: lt = "Vue", runtimeModuleName: pt = "vue", ssrRuntimeModuleName: _t = "vue/server-renderer", ssr: K = !1, isTS: q = !1, inSSR: U = !1 }) {
          let at = { mode: F, prefixIdentifiers: H, sourceMap: Y, filename: Z, scopeId: nt, optimizeImports: dt, runtimeGlobalName: lt, runtimeModuleName: pt, ssrRuntimeModuleName: _t, ssr: K, isTS: q, inSSR: U, source: T.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: !1, map: void 0, helper: (R) => `_${ui[R]}`, push(R, N = -2, z) {
            at.code += R;
          }, indent() {
            A(++at.indentLevel);
          }, deindent(R = !1) {
            R ? --at.indentLevel : A(--at.indentLevel);
          }, newline() {
            A(at.indentLevel);
          } };
          function A(R) {
            at.push(`
` + "  ".repeat(R), 0);
          }
          return at;
        }(b, x);
        x.onContextCreated && x.onContextCreated(v);
        let { mode: k, push: S, prefixIdentifiers: C, indent: D, deindent: O, newline: I, ssr: w } = v, E = Array.from(b.helpers), L = E.length > 0, P = !C && k !== "module";
        (function(T, F) {
          let { push: H, newline: Y, runtimeGlobalName: Z } = F, nt = Array.from(T.helpers);
          if (nt.length > 0 && (H(`const _Vue = ${Z}
`, -1), T.hoists.length)) {
            let dt = [Js, Zs, Oa, Gc, lg].filter((lt) => nt.includes(lt)).map(xu).join(", ");
            H(`const { ${dt} } = _Vue
`, -1);
          }
          (function(dt, lt) {
            if (!dt.length) return;
            lt.pure = !0;
            let { push: pt, newline: _t } = lt;
            _t();
            for (let K = 0; K < dt.length; K++) {
              let q = dt[K];
              q && (pt(`const _hoisted_${K + 1} = `), _e(q, lt), _t());
            }
            lt.pure = !1;
          })(T.hoists, F), Y(), H("return ");
        })(b, v);
        let M = (w ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
        if (S(`function ${w ? "ssrRender" : "render"}(${M}) {`), D(), P && (S("with (_ctx) {"), D(), L && (S(`const { ${E.map(xu).join(", ")} } = _Vue
`, -1), I())), b.components.length && (vu(b.components, "component", v), (b.directives.length || b.temps > 0) && I()), b.directives.length && (vu(b.directives, "directive", v), b.temps > 0 && I()), b.temps > 0) {
          S("let ");
          for (let T = 0; T < b.temps; T++) S(`${T > 0 ? ", " : ""}_temp${T}`);
        }
        return (b.components.length || b.directives.length || b.temps) && (S(`
`, 0), I()), w || S("return "), b.codegenNode ? _e(b.codegenNode, v) : S("null"), P && (O(), S("}")), O(), S("}"), { ast: b, code: v.code, preamble: "", map: v.map ? v.map.toJSON() : void 0 };
      }(m, g);
    }(r, gt({}, U0, l, { nodeTransforms: [X0, ...J0, ...l.nodeTransforms || []], directiveTransforms: gt({}, Z0, l.directiveTransforms || {}), transformHoist: null }));
  }(t, i), o = Function("Vue", a)(_0);
  return o._rc = !0, Eu[s] = o;
}
Dp(Q0);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Fa(t) {
  return t + 0.5 | 0;
}
const Vs = (t, e, s) => Math.max(Math.min(t, s), e);
function Fi(t) {
  return Vs(Fa(t * 2.55), 0, 255);
}
function Ks(t) {
  return Vs(Fa(t * 255), 0, 255);
}
function gs(t) {
  return Vs(Fa(t / 2.55) / 100, 0, 1);
}
function Fu(t) {
  return Vs(Fa(t * 100), 0, 100);
}
const Be = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Jl = [..."0123456789ABCDEF"], t_ = (t) => Jl[t & 15], e_ = (t) => Jl[(t & 240) >> 4] + Jl[t & 15], Qa = (t) => (t & 240) >> 4 === (t & 15), s_ = (t) => Qa(t.r) && Qa(t.g) && Qa(t.b) && Qa(t.a);
function n_(t) {
  var e = t.length, s;
  return t[0] === "#" && (e === 4 || e === 5 ? s = {
    r: 255 & Be[t[1]] * 17,
    g: 255 & Be[t[2]] * 17,
    b: 255 & Be[t[3]] * 17,
    a: e === 5 ? Be[t[4]] * 17 : 255
  } : (e === 7 || e === 9) && (s = {
    r: Be[t[1]] << 4 | Be[t[2]],
    g: Be[t[3]] << 4 | Be[t[4]],
    b: Be[t[5]] << 4 | Be[t[6]],
    a: e === 9 ? Be[t[7]] << 4 | Be[t[8]] : 255
  })), s;
}
const i_ = (t, e) => t < 255 ? e(t) : "";
function a_(t) {
  var e = s_(t) ? t_ : e_;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + i_(t.a, e) : void 0;
}
const o_ = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function jg(t, e, s) {
  const n = e * Math.min(s, 1 - s), i = (a, o = (a + t / 30) % 12) => s - n * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [i(0), i(8), i(4)];
}
function r_(t, e, s) {
  const n = (i, a = (i + t / 60) % 6) => s - s * e * Math.max(Math.min(a, 4 - a, 1), 0);
  return [n(5), n(3), n(1)];
}
function l_(t, e, s) {
  const n = jg(t, 1, 0.5);
  let i;
  for (e + s > 1 && (i = 1 / (e + s), e *= i, s *= i), i = 0; i < 3; i++)
    n[i] *= 1 - e - s, n[i] += e;
  return n;
}
function c_(t, e, s, n, i) {
  return t === i ? (e - s) / n + (e < s ? 6 : 0) : e === i ? (s - t) / n + 2 : (t - e) / n + 4;
}
function ih(t) {
  const s = t.r / 255, n = t.g / 255, i = t.b / 255, a = Math.max(s, n, i), o = Math.min(s, n, i), r = (a + o) / 2;
  let l, c, h;
  return a !== o && (h = a - o, c = r > 0.5 ? h / (2 - a - o) : h / (a + o), l = c_(s, n, i, h, a), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function ah(t, e, s, n) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, s, n)).map(Ks);
}
function oh(t, e, s) {
  return ah(jg, t, e, s);
}
function h_(t, e, s) {
  return ah(l_, t, e, s);
}
function u_(t, e, s) {
  return ah(r_, t, e, s);
}
function Wg(t) {
  return (t % 360 + 360) % 360;
}
function d_(t) {
  const e = o_.exec(t);
  let s = 255, n;
  if (!e)
    return;
  e[5] !== n && (s = e[6] ? Fi(+e[5]) : Ks(+e[5]));
  const i = Wg(+e[2]), a = +e[3] / 100, o = +e[4] / 100;
  return e[1] === "hwb" ? n = h_(i, a, o) : e[1] === "hsv" ? n = u_(i, a, o) : n = oh(i, a, o), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function f_(t, e) {
  var s = ih(t);
  s[0] = Wg(s[0] + e), s = oh(s), t.r = s[0], t.g = s[1], t.b = s[2];
}
function p_(t) {
  if (!t)
    return;
  const e = ih(t), s = e[0], n = Fu(e[1]), i = Fu(e[2]);
  return t.a < 255 ? `hsla(${s}, ${n}%, ${i}%, ${gs(t.a)})` : `hsl(${s}, ${n}%, ${i}%)`;
}
const Iu = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Nu = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function g_() {
  const t = {}, e = Object.keys(Nu), s = Object.keys(Iu);
  let n, i, a, o, r;
  for (n = 0; n < e.length; n++) {
    for (o = r = e[n], i = 0; i < s.length; i++)
      a = s[i], r = r.replace(a, Iu[a]);
    a = parseInt(Nu[o], 16), t[r] = [a >> 16 & 255, a >> 8 & 255, a & 255];
  }
  return t;
}
let to;
function m_(t) {
  to || (to = g_(), to.transparent = [0, 0, 0, 0]);
  const e = to[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const y_ = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function b_(t) {
  const e = y_.exec(t);
  let s = 255, n, i, a;
  if (e) {
    if (e[7] !== n) {
      const o = +e[7];
      s = e[8] ? Fi(o) : Vs(o * 255, 0, 255);
    }
    return n = +e[1], i = +e[3], a = +e[5], n = 255 & (e[2] ? Fi(n) : Vs(n, 0, 255)), i = 255 & (e[4] ? Fi(i) : Vs(i, 0, 255)), a = 255 & (e[6] ? Fi(a) : Vs(a, 0, 255)), {
      r: n,
      g: i,
      b: a,
      a: s
    };
  }
}
function __(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${gs(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const al = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, Hn = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function x_(t, e, s) {
  const n = Hn(gs(t.r)), i = Hn(gs(t.g)), a = Hn(gs(t.b));
  return {
    r: Ks(al(n + s * (Hn(gs(e.r)) - n))),
    g: Ks(al(i + s * (Hn(gs(e.g)) - i))),
    b: Ks(al(a + s * (Hn(gs(e.b)) - a))),
    a: t.a + s * (e.a - t.a)
  };
}
function eo(t, e, s) {
  if (t) {
    let n = ih(t);
    n[e] = Math.max(0, Math.min(n[e] + n[e] * s, e === 0 ? 360 : 1)), n = oh(n), t.r = n[0], t.g = n[1], t.b = n[2];
  }
}
function Hg(t, e) {
  return t && Object.assign(e || {}, t);
}
function Bu(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = Ks(t[3]))) : (e = Hg(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = Ks(e.a)), e;
}
function v_(t) {
  return t.charAt(0) === "r" ? b_(t) : d_(t);
}
class ga {
  constructor(e) {
    if (e instanceof ga)
      return e;
    const s = typeof e;
    let n;
    s === "object" ? n = Bu(e) : s === "string" && (n = n_(e) || m_(e) || v_(e)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Hg(this._rgb);
    return e && (e.a = gs(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Bu(e);
  }
  rgbString() {
    return this._valid ? __(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? a_(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? p_(this._rgb) : void 0;
  }
  mix(e, s) {
    if (e) {
      const n = this.rgb, i = e.rgb;
      let a;
      const o = s === a ? 0.5 : s, r = 2 * o - 1, l = n.a - i.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      a = 1 - c, n.r = 255 & c * n.r + a * i.r + 0.5, n.g = 255 & c * n.g + a * i.g + 0.5, n.b = 255 & c * n.b + a * i.b + 0.5, n.a = o * n.a + (1 - o) * i.a, this.rgb = n;
    }
    return this;
  }
  interpolate(e, s) {
    return e && (this._rgb = x_(this._rgb, e._rgb, s)), this;
  }
  clone() {
    return new ga(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = Ks(e), this;
  }
  clearer(e) {
    const s = this._rgb;
    return s.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, s = Fa(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
    return e.r = e.g = e.b = s, this;
  }
  opaquer(e) {
    const s = this._rgb;
    return s.a *= 1 + e, this;
  }
  negate() {
    const e = this._rgb;
    return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
  }
  lighten(e) {
    return eo(this._rgb, 2, e), this;
  }
  darken(e) {
    return eo(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return eo(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return eo(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return f_(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function cs() {
}
const S_ = /* @__PURE__ */ (() => {
  let t = 0;
  return () => t++;
})();
function mt(t) {
  return t == null;
}
function Ft(t) {
  if (Array.isArray && Array.isArray(t))
    return !0;
  const e = Object.prototype.toString.call(t);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function bt(t) {
  return t !== null && Object.prototype.toString.call(t) === "[object Object]";
}
function jt(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function Le(t, e) {
  return jt(t) ? t : e;
}
function ut(t, e) {
  return typeof t > "u" ? e : t;
}
const w_ = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, Vg = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function Rt(t, e, s) {
  if (t && typeof t.call == "function")
    return t.apply(s, e);
}
function At(t, e, s, n) {
  let i, a, o;
  if (Ft(t))
    for (a = t.length, i = 0; i < a; i++)
      e.call(s, t[i], i);
  else if (bt(t))
    for (o = Object.keys(t), a = o.length, i = 0; i < a; i++)
      e.call(s, t[o[i]], o[i]);
}
function ar(t, e) {
  let s, n, i, a;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (s = 0, n = t.length; s < n; ++s)
    if (i = t[s], a = e[s], i.datasetIndex !== a.datasetIndex || i.index !== a.index)
      return !1;
  return !0;
}
function or(t) {
  if (Ft(t))
    return t.map(or);
  if (bt(t)) {
    const e = /* @__PURE__ */ Object.create(null), s = Object.keys(t), n = s.length;
    let i = 0;
    for (; i < n; ++i)
      e[s[i]] = or(t[s[i]]);
    return e;
  }
  return t;
}
function zg(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function C_(t, e, s, n) {
  if (!zg(t))
    return;
  const i = e[t], a = s[t];
  bt(i) && bt(a) ? ma(i, a, n) : e[t] = or(a);
}
function ma(t, e, s) {
  const n = Ft(e) ? e : [
    e
  ], i = n.length;
  if (!bt(t))
    return t;
  s = s || {};
  const a = s.merger || C_;
  let o;
  for (let r = 0; r < i; ++r) {
    if (o = n[r], !bt(o))
      continue;
    const l = Object.keys(o);
    for (let c = 0, h = l.length; c < h; ++c)
      a(l[c], t, o, s);
  }
  return t;
}
function Xi(t, e) {
  return ma(t, e, {
    merger: k_
  });
}
function k_(t, e, s) {
  if (!zg(t))
    return;
  const n = e[t], i = s[t];
  bt(n) && bt(i) ? Xi(n, i) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = or(i));
}
const $u = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function M_(t) {
  const e = t.split("."), s = [];
  let n = "";
  for (const i of e)
    n += i, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
  return s;
}
function A_(t) {
  const e = M_(t);
  return (s) => {
    for (const n of e) {
      if (n === "")
        break;
      s = s && s[n];
    }
    return s;
  };
}
function Qs(t, e) {
  return ($u[e] || ($u[e] = A_(e)))(t);
}
function rh(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const ya = (t) => typeof t < "u", tn = (t) => typeof t == "function", ju = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const s of t)
    if (!e.has(s))
      return !1;
  return !0;
};
function P_(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const vt = Math.PI, Et = 2 * vt, T_ = Et + vt, rr = Number.POSITIVE_INFINITY, D_ = vt / 180, qt = vt / 2, rn = vt / 4, Wu = vt * 2 / 3, zs = Math.log10, as = Math.sign;
function Ji(t, e, s) {
  return Math.abs(t - e) < s;
}
function Hu(t) {
  const e = Math.round(t);
  t = Ji(t, e, t / 1e3) ? e : t;
  const s = Math.pow(10, Math.floor(zs(t))), n = t / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function R_(t) {
  const e = [], s = Math.sqrt(t);
  let n;
  for (n = 1; n < s; n++)
    t % n === 0 && (e.push(n), e.push(t / n));
  return s === (s | 0) && e.push(s), e.sort((i, a) => i - a).pop(), e;
}
function L_(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function fi(t) {
  return !L_(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function O_(t, e) {
  const s = Math.round(t);
  return s - e <= t && s + e >= t;
}
function Gg(t, e, s) {
  let n, i, a;
  for (n = 0, i = t.length; n < i; n++)
    a = t[n][s], isNaN(a) || (e.min = Math.min(e.min, a), e.max = Math.max(e.max, a));
}
function ze(t) {
  return t * (vt / 180);
}
function lh(t) {
  return t * (180 / vt);
}
function Vu(t) {
  if (!jt(t))
    return;
  let e = 1, s = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, s++;
  return s;
}
function Ug(t, e) {
  const s = e.x - t.x, n = e.y - t.y, i = Math.sqrt(s * s + n * n);
  let a = Math.atan2(n, s);
  return a < -0.5 * vt && (a += Et), {
    angle: a,
    distance: i
  };
}
function Zl(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function E_(t, e) {
  return (t - e + T_) % Et - vt;
}
function de(t) {
  return (t % Et + Et) % Et;
}
function ba(t, e, s, n) {
  const i = de(t), a = de(e), o = de(s), r = de(a - i), l = de(o - i), c = de(i - a), h = de(i - o);
  return i === a || i === o || n && a === o || r > l && c < h;
}
function se(t, e, s) {
  return Math.max(e, Math.min(s, t));
}
function F_(t) {
  return se(t, -32768, 32767);
}
function xs(t, e, s, n = 1e-6) {
  return t >= Math.min(e, s) - n && t <= Math.max(e, s) + n;
}
function ch(t, e, s) {
  s = s || ((o) => t[o] < e);
  let n = t.length - 1, i = 0, a;
  for (; n - i > 1; )
    a = i + n >> 1, s(a) ? i = a : n = a;
  return {
    lo: i,
    hi: n
  };
}
const vs = (t, e, s, n) => ch(t, s, n ? (i) => {
  const a = t[i][e];
  return a < s || a === s && t[i + 1][e] === s;
} : (i) => t[i][e] < s), I_ = (t, e, s) => ch(t, s, (n) => t[n][e] >= s);
function N_(t, e, s) {
  let n = 0, i = t.length;
  for (; n < i && t[n] < e; )
    n++;
  for (; i > n && t[i - 1] > s; )
    i--;
  return n > 0 || i < t.length ? t.slice(n, i) : t;
}
const qg = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function B_(t, e) {
  if (t._chartjs) {
    t._chartjs.listeners.push(e);
    return;
  }
  Object.defineProperty(t, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        e
      ]
    }
  }), qg.forEach((s) => {
    const n = "_onData" + rh(s), i = t[s];
    Object.defineProperty(t, s, {
      configurable: !0,
      enumerable: !1,
      value(...a) {
        const o = i.apply(this, a);
        return t._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...a);
        }), o;
      }
    });
  });
}
function zu(t, e) {
  const s = t._chartjs;
  if (!s)
    return;
  const n = s.listeners, i = n.indexOf(e);
  i !== -1 && n.splice(i, 1), !(n.length > 0) && (qg.forEach((a) => {
    delete t[a];
  }), delete t._chartjs);
}
function Yg(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const Kg = function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
}();
function Xg(t, e) {
  let s = [], n = !1;
  return function(...i) {
    s = i, n || (n = !0, Kg.call(window, () => {
      n = !1, t.apply(e, s);
    }));
  };
}
function $_(t, e) {
  let s;
  return function(...n) {
    return e ? (clearTimeout(s), s = setTimeout(t, e, n)) : t.apply(this, n), e;
  };
}
const hh = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", ce = (t, e, s) => t === "start" ? e : t === "end" ? s : (e + s) / 2, j_ = (t, e, s, n) => t === (n ? "left" : "right") ? s : t === "center" ? (e + s) / 2 : e;
function Jg(t, e, s) {
  const n = e.length;
  let i = 0, a = n;
  if (t._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = t, c = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, h = o.axis, { min: u, max: d, minDefined: p, maxDefined: f } = o.getUserBounds();
    if (p) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        vs(l, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? n : vs(e, h, o.getPixelForValue(u)).lo
      ), c) {
        const g = l.slice(0, i + 1).reverse().findIndex((m) => !mt(m[r.axis]));
        i -= Math.max(0, g);
      }
      i = se(i, 0, n - 1);
    }
    if (f) {
      let g = Math.max(
        // @ts-expect-error Need to type _parsed
        vs(l, o.axis, d, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : vs(e, h, o.getPixelForValue(d), !0).hi + 1
      );
      if (c) {
        const m = l.slice(g - 1).findIndex((_) => !mt(_[r.axis]));
        g += Math.max(0, m);
      }
      a = se(g, i, n) - i;
    } else
      a = n - i;
  }
  return {
    start: i,
    count: a
  };
}
function Zg(t) {
  const { xScale: e, yScale: s, _scaleRanges: n } = t, i = {
    xmin: e.min,
    xmax: e.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!n)
    return t._scaleRanges = i, !0;
  const a = n.xmin !== e.min || n.xmax !== e.max || n.ymin !== s.min || n.ymax !== s.max;
  return Object.assign(n, i), a;
}
const so = (t) => t === 0 || t === 1, Gu = (t, e, s) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * Et / s)), Uu = (t, e, s) => Math.pow(2, -10 * t) * Math.sin((t - e) * Et / s) + 1, Zi = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => -t * (t - 2),
  easeInOutQuad: (t) => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (t -= 1) * t * t + 1,
  easeInOutCubic: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
  easeInOutQuart: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
  easeInOutQuint: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
  easeInSine: (t) => -Math.cos(t * qt) + 1,
  easeOutSine: (t) => Math.sin(t * qt),
  easeInOutSine: (t) => -0.5 * (Math.cos(vt * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => so(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => so(t) ? t : Gu(t, 0.075, 0.3),
  easeOutElastic: (t) => so(t) ? t : Uu(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return so(t) ? t : t < 0.5 ? 0.5 * Gu(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * Uu(t * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(t) {
    return t * t * ((1.70158 + 1) * t - 1.70158);
  },
  easeOutBack(t) {
    return (t -= 1) * t * ((1.70158 + 1) * t + 1.70158) + 1;
  },
  easeInOutBack(t) {
    let e = 1.70158;
    return (t /= 0.5) < 1 ? 0.5 * (t * t * (((e *= 1.525) + 1) * t - e)) : 0.5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
  },
  easeInBounce: (t) => 1 - Zi.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? Zi.easeInBounce(t * 2) * 0.5 : Zi.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function uh(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function qu(t) {
  return uh(t) ? t : new ga(t);
}
function ol(t) {
  return uh(t) ? t : new ga(t).saturate(0.5).darken(0.1).hexString();
}
const W_ = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], H_ = [
  "color",
  "borderColor",
  "backgroundColor"
];
function V_(t) {
  t.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), t.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
  }), t.set("animations", {
    colors: {
      type: "color",
      properties: H_
    },
    numbers: {
      type: "number",
      properties: W_
    }
  }), t.describe("animations", {
    _fallback: "animation"
  }), t.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (e) => e | 0
        }
      }
    }
  });
}
function z_(t) {
  t.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Yu = /* @__PURE__ */ new Map();
function G_(t, e) {
  e = e || {};
  const s = t + JSON.stringify(e);
  let n = Yu.get(s);
  return n || (n = new Intl.NumberFormat(t, e), Yu.set(s, n)), n;
}
function Ia(t, e, s) {
  return G_(e, s).format(t);
}
const Qg = {
  values(t) {
    return Ft(t) ? t : "" + t;
  },
  numeric(t, e, s) {
    if (t === 0)
      return "0";
    const n = this.chart.options.locale;
    let i, a = t;
    if (s.length > 1) {
      const c = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (c < 1e-4 || c > 1e15) && (i = "scientific"), a = U_(t, s);
    }
    const o = zs(Math.abs(a)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: i,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Ia(t, n, l);
  },
  logarithmic(t, e, s) {
    if (t === 0)
      return "0";
    const n = s[e].significand || t / Math.pow(10, Math.floor(zs(t)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(n) || e > 0.8 * s.length ? Qg.numeric.call(this, t, e, s) : "";
  }
};
function U_(t, e) {
  let s = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(s) >= 1 && t !== Math.floor(t) && (s = t - Math.floor(t)), s;
}
var Fr = {
  formatters: Qg
};
function q_(t) {
  t.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (e, s) => s.lineWidth,
      tickColor: (e, s) => s.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Fr.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), t.route("scale.ticks", "color", "", "color"), t.route("scale.grid", "color", "", "borderColor"), t.route("scale.border", "color", "", "borderColor"), t.route("scale.title", "color", "", "color"), t.describe("scale", {
    _fallback: !1,
    _scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
    _indexable: (e) => e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
  }), t.describe("scales", {
    _fallback: "scale"
  }), t.describe("scale.ticks", {
    _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
    _indexable: (e) => e !== "backdropPadding"
  });
}
const Ln = /* @__PURE__ */ Object.create(null), Ql = /* @__PURE__ */ Object.create(null);
function Qi(t, e) {
  if (!e)
    return t;
  const s = e.split(".");
  for (let n = 0, i = s.length; n < i; ++n) {
    const a = s[n];
    t = t[a] || (t[a] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function rl(t, e, s) {
  return typeof e == "string" ? ma(Qi(t, e), s) : ma(Qi(t, ""), e);
}
class Y_ {
  constructor(e, s) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (n) => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (n, i) => ol(i.backgroundColor), this.hoverBorderColor = (n, i) => ol(i.borderColor), this.hoverColor = (n, i) => ol(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(s);
  }
  set(e, s) {
    return rl(this, e, s);
  }
  get(e) {
    return Qi(this, e);
  }
  describe(e, s) {
    return rl(Ql, e, s);
  }
  override(e, s) {
    return rl(Ln, e, s);
  }
  route(e, s, n, i) {
    const a = Qi(this, e), o = Qi(this, n), r = "_" + s;
    Object.defineProperties(a, {
      [r]: {
        value: a[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], c = o[i];
          return bt(l) ? Object.assign({}, c, l) : ut(l, c);
        },
        set(l) {
          this[r] = l;
        }
      }
    });
  }
  apply(e) {
    e.forEach((s) => s(this));
  }
}
var Nt = /* @__PURE__ */ new Y_({
  _scriptable: (t) => !t.startsWith("on"),
  _indexable: (t) => t !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  V_,
  z_,
  q_
]);
function K_(t) {
  return !t || mt(t.size) || mt(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function lr(t, e, s, n, i) {
  let a = e[i];
  return a || (a = e[i] = t.measureText(i).width, s.push(i)), a > n && (n = a), n;
}
function X_(t, e, s, n) {
  n = n || {};
  let i = n.data = n.data || {}, a = n.garbageCollect = n.garbageCollect || [];
  n.font !== e && (i = n.data = {}, a = n.garbageCollect = [], n.font = e), t.save(), t.font = e;
  let o = 0;
  const r = s.length;
  let l, c, h, u, d;
  for (l = 0; l < r; l++)
    if (u = s[l], u != null && !Ft(u))
      o = lr(t, i, a, o, u);
    else if (Ft(u))
      for (c = 0, h = u.length; c < h; c++)
        d = u[c], d != null && !Ft(d) && (o = lr(t, i, a, o, d));
  t.restore();
  const p = a.length / 2;
  if (p > s.length) {
    for (l = 0; l < p; l++)
      delete i[a[l]];
    a.splice(0, p);
  }
  return o;
}
function ln(t, e, s) {
  const n = t.currentDevicePixelRatio, i = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((e - i) * n) / n + i;
}
function Ku(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function tc(t, e, s, n) {
  tm(t, e, s, n, null);
}
function tm(t, e, s, n, i) {
  let a, o, r, l, c, h, u, d;
  const p = e.pointStyle, f = e.rotation, g = e.radius;
  let m = (f || 0) * D_;
  if (p && typeof p == "object" && (a = p.toString(), a === "[object HTMLImageElement]" || a === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(s, n), t.rotate(m), t.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), t.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (t.beginPath(), p) {
      default:
        i ? t.ellipse(s, n, i / 2, g, 0, 0, Et) : t.arc(s, n, g, 0, Et), t.closePath();
        break;
      case "triangle":
        h = i ? i / 2 : g, t.moveTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += Wu, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += Wu, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), t.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, o = Math.cos(m + rn) * l, u = Math.cos(m + rn) * (i ? i / 2 - c : l), r = Math.sin(m + rn) * l, d = Math.sin(m + rn) * (i ? i / 2 - c : l), t.arc(s - u, n - r, c, m - vt, m - qt), t.arc(s + d, n - o, c, m - qt, m), t.arc(s + u, n + r, c, m, m + qt), t.arc(s - d, n + o, c, m + qt, m + vt), t.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * g, h = i ? i / 2 : l, t.rect(s - h, n - l, 2 * h, 2 * l);
          break;
        }
        m += rn;
      case "rectRot":
        u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + d, n - o), t.lineTo(s + u, n + r), t.lineTo(s - d, n + o), t.closePath();
        break;
      case "crossRot":
        m += rn;
      case "cross":
        u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + d, n - o), t.lineTo(s - d, n + o);
        break;
      case "star":
        u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + d, n - o), t.lineTo(s - d, n + o), m += rn, u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + d, n - o), t.lineTo(s - d, n + o);
        break;
      case "line":
        o = i ? i / 2 : Math.cos(m) * g, r = Math.sin(m) * g, t.moveTo(s - o, n - r), t.lineTo(s + o, n + r);
        break;
      case "dash":
        t.moveTo(s, n), t.lineTo(s + Math.cos(m) * (i ? i / 2 : g), n + Math.sin(m) * g);
        break;
      case !1:
        t.closePath();
        break;
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function Ss(t, e, s) {
  return s = s || 0.5, !e || t && t.x > e.left - s && t.x < e.right + s && t.y > e.top - s && t.y < e.bottom + s;
}
function Ir(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function Nr(t) {
  t.restore();
}
function J_(t, e, s, n, i) {
  if (!e)
    return t.lineTo(s.x, s.y);
  if (i === "middle") {
    const a = (e.x + s.x) / 2;
    t.lineTo(a, e.y), t.lineTo(a, s.y);
  } else i === "after" != !!n ? t.lineTo(e.x, s.y) : t.lineTo(s.x, e.y);
  t.lineTo(s.x, s.y);
}
function Z_(t, e, s, n) {
  if (!e)
    return t.lineTo(s.x, s.y);
  t.bezierCurveTo(n ? e.cp1x : e.cp2x, n ? e.cp1y : e.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function Q_(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), mt(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function tx(t, e, s, n, i) {
  if (i.strikethrough || i.underline) {
    const a = t.measureText(n), o = e - a.actualBoundingBoxLeft, r = e + a.actualBoundingBoxRight, l = s - a.actualBoundingBoxAscent, c = s + a.actualBoundingBoxDescent, h = i.strikethrough ? (l + c) / 2 : c;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = i.decorationWidth || 2, t.moveTo(o, h), t.lineTo(r, h), t.stroke();
  }
}
function ex(t, e) {
  const s = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = s;
}
function On(t, e, s, n, i, a = {}) {
  const o = Ft(e) ? e : [
    e
  ], r = a.strokeWidth > 0 && a.strokeColor !== "";
  let l, c;
  for (t.save(), t.font = i.string, Q_(t, a), l = 0; l < o.length; ++l)
    c = o[l], a.backdrop && ex(t, a.backdrop), r && (a.strokeColor && (t.strokeStyle = a.strokeColor), mt(a.strokeWidth) || (t.lineWidth = a.strokeWidth), t.strokeText(c, s, n, a.maxWidth)), t.fillText(c, s, n, a.maxWidth), tx(t, s, n, c, a), n += Number(i.lineHeight);
  t.restore();
}
function _a(t, e) {
  const { x: s, y: n, w: i, h: a, radius: o } = e;
  t.arc(s + o.topLeft, n + o.topLeft, o.topLeft, 1.5 * vt, vt, !0), t.lineTo(s, n + a - o.bottomLeft), t.arc(s + o.bottomLeft, n + a - o.bottomLeft, o.bottomLeft, vt, qt, !0), t.lineTo(s + i - o.bottomRight, n + a), t.arc(s + i - o.bottomRight, n + a - o.bottomRight, o.bottomRight, qt, 0, !0), t.lineTo(s + i, n + o.topRight), t.arc(s + i - o.topRight, n + o.topRight, o.topRight, 0, -qt, !0), t.lineTo(s + o.topLeft, n);
}
const sx = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, nx = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function ix(t, e) {
  const s = ("" + t).match(sx);
  if (!s || s[1] === "normal")
    return e * 1.2;
  switch (t = +s[2], s[3]) {
    case "px":
      return t;
    case "%":
      t /= 100;
      break;
  }
  return e * t;
}
const ax = (t) => +t || 0;
function dh(t, e) {
  const s = {}, n = bt(e), i = n ? Object.keys(e) : e, a = bt(t) ? n ? (o) => ut(t[o], t[e[o]]) : (o) => t[o] : () => t;
  for (const o of i)
    s[o] = ax(a(o));
  return s;
}
function em(t) {
  return dh(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Cn(t) {
  return dh(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function me(t) {
  const e = em(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function Zt(t, e) {
  t = t || {}, e = e || Nt.font;
  let s = ut(t.size, e.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = ut(t.style, e.style);
  n && !("" + n).match(nx) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const i = {
    family: ut(t.family, e.family),
    lineHeight: ix(ut(t.lineHeight, e.lineHeight), s),
    size: s,
    style: n,
    weight: ut(t.weight, e.weight),
    string: ""
  };
  return i.string = K_(i), i;
}
function Ii(t, e, s, n) {
  let i, a, o;
  for (i = 0, a = t.length; i < a; ++i)
    if (o = t[i], o !== void 0 && o !== void 0)
      return o;
}
function ox(t, e, s) {
  const { min: n, max: i } = t, a = Vg(e, (i - n) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(n, -Math.abs(a)),
    max: o(i, a)
  };
}
function en(t, e) {
  return Object.assign(Object.create(t), e);
}
function fh(t, e = [
  ""
], s, n, i = () => t[0]) {
  const a = s || t;
  typeof n > "u" && (n = am("_fallback", t));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: a,
    _fallback: n,
    _getTarget: i,
    override: (r) => fh([
      r,
      ...t
    ], e, a, n)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, l) {
      return delete r[l], delete r._keys, delete t[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, l) {
      return nm(r, l, () => px(l, e, t, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, l) {
      return Reflect.getOwnPropertyDescriptor(r._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(r, l) {
      return Ju(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Ju(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const h = r._storage || (r._storage = i());
      return r[l] = h[l] = c, delete r._keys, !0;
    }
  });
}
function pi(t, e, s, n) {
  const i = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: sm(t, n),
    setContext: (a) => pi(t, a, s, n),
    override: (a) => pi(t.override(a), e, s, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, o) {
      return delete a[o], delete t[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, o, r) {
      return nm(a, o, () => lx(a, o, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, o) {
      return a._descriptors.allKeys ? Reflect.has(t, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(t, o);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t);
    },
    /**
    * A trap for the in operator.
    */
    has(a, o) {
      return Reflect.has(t, o);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(t);
    },
    /**
    * A trap for setting property values.
    */
    set(a, o, r) {
      return t[o] = r, delete a[o], !0;
    }
  });
}
function sm(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = e.scriptable, _indexable: n = e.indexable, _allKeys: i = e.allKeys } = t;
  return {
    allKeys: i,
    scriptable: s,
    indexable: n,
    isScriptable: tn(s) ? s : () => s,
    isIndexable: tn(n) ? n : () => n
  };
}
const rx = (t, e) => t ? t + rh(e) : e, ph = (t, e) => bt(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function nm(t, e, s) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const n = s();
  return t[e] = n, n;
}
function lx(t, e, s) {
  const { _proxy: n, _context: i, _subProxy: a, _descriptors: o } = t;
  let r = n[e];
  return tn(r) && o.isScriptable(e) && (r = cx(e, r, t, s)), Ft(r) && r.length && (r = hx(e, r, t, o.isIndexable)), ph(e, r) && (r = pi(r, i, a && a[e], o)), r;
}
function cx(t, e, s, n) {
  const { _proxy: i, _context: a, _subProxy: o, _stack: r } = s;
  if (r.has(t))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + t);
  r.add(t);
  let l = e(a, o || n);
  return r.delete(t), ph(t, l) && (l = gh(i._scopes, i, t, l)), l;
}
function hx(t, e, s, n) {
  const { _proxy: i, _context: a, _subProxy: o, _descriptors: r } = s;
  if (typeof a.index < "u" && n(t))
    return e[a.index % e.length];
  if (bt(e[0])) {
    const l = e, c = i._scopes.filter((h) => h !== l);
    e = [];
    for (const h of l) {
      const u = gh(c, i, t, h);
      e.push(pi(u, a, o && o[t], r));
    }
  }
  return e;
}
function im(t, e, s) {
  return tn(t) ? t(e, s) : t;
}
const ux = (t, e) => t === !0 ? e : typeof t == "string" ? Qs(e, t) : void 0;
function dx(t, e, s, n, i) {
  for (const a of e) {
    const o = ux(s, a);
    if (o) {
      t.add(o);
      const r = im(o._fallback, s, i);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (o === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function gh(t, e, s, n) {
  const i = e._rootScopes, a = im(e._fallback, s, n), o = [
    ...t,
    ...i
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Xu(r, o, s, a || s, n);
  return l === null || typeof a < "u" && a !== s && (l = Xu(r, o, a, l, n), l === null) ? !1 : fh(Array.from(r), [
    ""
  ], i, a, () => fx(e, s, n));
}
function Xu(t, e, s, n, i) {
  for (; s; )
    s = dx(t, e, s, n, i);
  return s;
}
function fx(t, e, s) {
  const n = t._getTarget();
  e in n || (n[e] = {});
  const i = n[e];
  return Ft(i) && bt(s) ? s : i || {};
}
function px(t, e, s, n) {
  let i;
  for (const a of e)
    if (i = am(rx(a, t), s), typeof i < "u")
      return ph(t, i) ? gh(s, n, t, i) : i;
}
function am(t, e) {
  for (const s of e) {
    if (!s)
      continue;
    const n = s[t];
    if (typeof n < "u")
      return n;
  }
}
function Ju(t) {
  let e = t._keys;
  return e || (e = t._keys = gx(t._scopes)), e;
}
function gx(t) {
  const e = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const n of Object.keys(s).filter((i) => !i.startsWith("_")))
      e.add(n);
  return Array.from(e);
}
function om(t, e, s, n) {
  const { iScale: i } = t, { key: a = "r" } = this._parsing, o = new Array(n);
  let r, l, c, h;
  for (r = 0, l = n; r < l; ++r)
    c = r + s, h = e[c], o[r] = {
      r: i.parse(Qs(h, a), c)
    };
  return o;
}
const mx = Number.EPSILON || 1e-14, gi = (t, e) => e < t.length && !t[e].skip && t[e], rm = (t) => t === "x" ? "y" : "x";
function yx(t, e, s, n) {
  const i = t.skip ? e : t, a = e, o = s.skip ? e : s, r = Zl(a, i), l = Zl(o, a);
  let c = r / (r + l), h = l / (r + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const u = n * c, d = n * h;
  return {
    previous: {
      x: a.x - u * (o.x - i.x),
      y: a.y - u * (o.y - i.y)
    },
    next: {
      x: a.x + d * (o.x - i.x),
      y: a.y + d * (o.y - i.y)
    }
  };
}
function bx(t, e, s) {
  const n = t.length;
  let i, a, o, r, l, c = gi(t, 0);
  for (let h = 0; h < n - 1; ++h)
    if (l = c, c = gi(t, h + 1), !(!l || !c)) {
      if (Ji(e[h], 0, mx)) {
        s[h] = s[h + 1] = 0;
        continue;
      }
      i = s[h] / e[h], a = s[h + 1] / e[h], r = Math.pow(i, 2) + Math.pow(a, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[h] = i * o * e[h], s[h + 1] = a * o * e[h]);
    }
}
function _x(t, e, s = "x") {
  const n = rm(s), i = t.length;
  let a, o, r, l = gi(t, 0);
  for (let c = 0; c < i; ++c) {
    if (o = r, r = l, l = gi(t, c + 1), !r)
      continue;
    const h = r[s], u = r[n];
    o && (a = (h - o[s]) / 3, r[`cp1${s}`] = h - a, r[`cp1${n}`] = u - a * e[c]), l && (a = (l[s] - h) / 3, r[`cp2${s}`] = h + a, r[`cp2${n}`] = u + a * e[c]);
  }
}
function xx(t, e = "x") {
  const s = rm(e), n = t.length, i = Array(n).fill(0), a = Array(n);
  let o, r, l, c = gi(t, 0);
  for (o = 0; o < n; ++o)
    if (r = l, l = c, c = gi(t, o + 1), !!l) {
      if (c) {
        const h = c[e] - l[e];
        i[o] = h !== 0 ? (c[s] - l[s]) / h : 0;
      }
      a[o] = r ? c ? as(i[o - 1]) !== as(i[o]) ? 0 : (i[o - 1] + i[o]) / 2 : i[o - 1] : i[o];
    }
  bx(t, i, a), _x(t, a, e);
}
function no(t, e, s) {
  return Math.max(Math.min(t, s), e);
}
function vx(t, e) {
  let s, n, i, a, o, r = Ss(t[0], e);
  for (s = 0, n = t.length; s < n; ++s)
    o = a, a = r, r = s < n - 1 && Ss(t[s + 1], e), a && (i = t[s], o && (i.cp1x = no(i.cp1x, e.left, e.right), i.cp1y = no(i.cp1y, e.top, e.bottom)), r && (i.cp2x = no(i.cp2x, e.left, e.right), i.cp2y = no(i.cp2y, e.top, e.bottom)));
}
function Sx(t, e, s, n, i) {
  let a, o, r, l;
  if (e.spanGaps && (t = t.filter((c) => !c.skip)), e.cubicInterpolationMode === "monotone")
    xx(t, i);
  else {
    let c = n ? t[t.length - 1] : t[0];
    for (a = 0, o = t.length; a < o; ++a)
      r = t[a], l = yx(c, r, t[Math.min(a + 1, o - (n ? 0 : 1)) % o], e.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  e.capBezierPoints && vx(t, s);
}
function mh() {
  return typeof window < "u" && typeof document < "u";
}
function yh(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function cr(t, e, s) {
  let n;
  return typeof t == "string" ? (n = parseInt(t, 10), t.indexOf("%") !== -1 && (n = n / 100 * e.parentNode[s])) : n = t, n;
}
const Br = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function wx(t, e) {
  return Br(t).getPropertyValue(e);
}
const Cx = [
  "top",
  "right",
  "bottom",
  "left"
];
function kn(t, e, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let i = 0; i < 4; i++) {
    const a = Cx[i];
    n[a] = parseFloat(t[e + "-" + a + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const kx = (t, e, s) => (t > 0 || e > 0) && (!s || !s.shadowRoot);
function Mx(t, e) {
  const s = t.touches, n = s && s.length ? s[0] : t, { offsetX: i, offsetY: a } = n;
  let o = !1, r, l;
  if (kx(i, a, t.target))
    r = i, l = a;
  else {
    const c = e.getBoundingClientRect();
    r = n.clientX - c.left, l = n.clientY - c.top, o = !0;
  }
  return {
    x: r,
    y: l,
    box: o
  };
}
function fn(t, e) {
  if ("native" in t)
    return t;
  const { canvas: s, currentDevicePixelRatio: n } = e, i = Br(s), a = i.boxSizing === "border-box", o = kn(i, "padding"), r = kn(i, "border", "width"), { x: l, y: c, box: h } = Mx(t, s), u = o.left + (h && r.left), d = o.top + (h && r.top);
  let { width: p, height: f } = e;
  return a && (p -= o.width + r.width, f -= o.height + r.height), {
    x: Math.round((l - u) / p * s.width / n),
    y: Math.round((c - d) / f * s.height / n)
  };
}
function Ax(t, e, s) {
  let n, i;
  if (e === void 0 || s === void 0) {
    const a = t && yh(t);
    if (!a)
      e = t.clientWidth, s = t.clientHeight;
    else {
      const o = a.getBoundingClientRect(), r = Br(a), l = kn(r, "border", "width"), c = kn(r, "padding");
      e = o.width - c.width - l.width, s = o.height - c.height - l.height, n = cr(r.maxWidth, a, "clientWidth"), i = cr(r.maxHeight, a, "clientHeight");
    }
  }
  return {
    width: e,
    height: s,
    maxWidth: n || rr,
    maxHeight: i || rr
  };
}
const Gs = (t) => Math.round(t * 10) / 10;
function Px(t, e, s, n) {
  const i = Br(t), a = kn(i, "margin"), o = cr(i.maxWidth, t, "clientWidth") || rr, r = cr(i.maxHeight, t, "clientHeight") || rr, l = Ax(t, e, s);
  let { width: c, height: h } = l;
  if (i.boxSizing === "content-box") {
    const d = kn(i, "border", "width"), p = kn(i, "padding");
    c -= p.width + d.width, h -= p.height + d.height;
  }
  return c = Math.max(0, c - a.width), h = Math.max(0, n ? c / n : h - a.height), c = Gs(Math.min(c, o, l.maxWidth)), h = Gs(Math.min(h, r, l.maxHeight)), c && !h && (h = Gs(c / 2)), (e !== void 0 || s !== void 0) && n && l.height && h > l.height && (h = l.height, c = Gs(Math.floor(h * n))), {
    width: c,
    height: h
  };
}
function Zu(t, e, s) {
  const n = e || 1, i = Gs(t.height * n), a = Gs(t.width * n);
  t.height = Gs(t.height), t.width = Gs(t.width);
  const o = t.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${t.height}px`, o.style.width = `${t.width}px`), t.currentDevicePixelRatio !== n || o.height !== i || o.width !== a ? (t.currentDevicePixelRatio = n, o.height = i, o.width = a, t.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Tx = function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    mh() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
}();
function Qu(t, e) {
  const s = wx(t, e), n = s && s.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function pn(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: t.y + s * (e.y - t.y)
  };
}
function Dx(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: n === "middle" ? s < 0.5 ? t.y : e.y : n === "after" ? s < 1 ? t.y : e.y : s > 0 ? e.y : t.y
  };
}
function Rx(t, e, s, n) {
  const i = {
    x: t.cp2x,
    y: t.cp2y
  }, a = {
    x: e.cp1x,
    y: e.cp1y
  }, o = pn(t, i, s), r = pn(i, a, s), l = pn(a, e, s), c = pn(o, r, s), h = pn(r, l, s);
  return pn(c, h, s);
}
const Lx = function(t, e) {
  return {
    x(s) {
      return t + t + e - s;
    },
    setWidth(s) {
      e = s;
    },
    textAlign(s) {
      return s === "center" ? s : s === "right" ? "left" : "right";
    },
    xPlus(s, n) {
      return s - n;
    },
    leftForLtr(s, n) {
      return s - n;
    }
  };
}, Ox = function() {
  return {
    x(t) {
      return t;
    },
    setWidth(t) {
    },
    textAlign(t) {
      return t;
    },
    xPlus(t, e) {
      return t + e;
    },
    leftForLtr(t, e) {
      return t;
    }
  };
};
function oi(t, e, s) {
  return t ? Lx(e, s) : Ox();
}
function lm(t, e) {
  let s, n;
  (e === "ltr" || e === "rtl") && (s = t.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", e, "important"), t.prevTextDirection = n);
}
function cm(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function hm(t) {
  return t === "angle" ? {
    between: ba,
    compare: E_,
    normalize: de
  } : {
    between: xs,
    compare: (e, s) => e - s,
    normalize: (e) => e
  };
}
function td({ start: t, end: e, count: s, loop: n, style: i }) {
  return {
    start: t % s,
    end: e % s,
    loop: n && (e - t + 1) % s === 0,
    style: i
  };
}
function Ex(t, e, s) {
  const { property: n, start: i, end: a } = s, { between: o, normalize: r } = hm(n), l = e.length;
  let { start: c, end: h, loop: u } = t, d, p;
  if (u) {
    for (c += l, h += l, d = 0, p = l; d < p && o(r(e[c % l][n]), i, a); ++d)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: u,
    style: t.style
  };
}
function um(t, e, s) {
  if (!s)
    return [
      t
    ];
  const { property: n, start: i, end: a } = s, o = e.length, { compare: r, between: l, normalize: c } = hm(n), { start: h, end: u, loop: d, style: p } = Ex(t, e, s), f = [];
  let g = !1, m = null, _, y, b;
  const x = () => l(i, b, _) && r(i, b) !== 0, v = () => r(a, _) === 0 || l(a, b, _), k = () => g || x(), S = () => !g || v();
  for (let C = h, D = h; C <= u; ++C)
    y = e[C % o], !y.skip && (_ = c(y[n]), _ !== b && (g = l(_, i, a), m === null && k() && (m = r(_, i) === 0 ? C : D), m !== null && S() && (f.push(td({
      start: m,
      end: C,
      loop: d,
      count: o,
      style: p
    })), m = null), D = C, b = _));
  return m !== null && f.push(td({
    start: m,
    end: u,
    loop: d,
    count: o,
    style: p
  })), f;
}
function dm(t, e) {
  const s = [], n = t.segments;
  for (let i = 0; i < n.length; i++) {
    const a = um(n[i], t.points, e);
    a.length && s.push(...a);
  }
  return s;
}
function Fx(t, e, s, n) {
  let i = 0, a = e - 1;
  if (s && !n)
    for (; i < e && !t[i].skip; )
      i++;
  for (; i < e && t[i].skip; )
    i++;
  for (i %= e, s && (a += i); a > i && t[a % e].skip; )
    a--;
  return a %= e, {
    start: i,
    end: a
  };
}
function Ix(t, e, s, n) {
  const i = t.length, a = [];
  let o = e, r = t[e], l;
  for (l = e + 1; l <= s; ++l) {
    const c = t[l % i];
    c.skip || c.stop ? r.skip || (n = !1, a.push({
      start: e % i,
      end: (l - 1) % i,
      loop: n
    }), e = o = c.stop ? l : null) : (o = l, r.skip && (e = l)), r = c;
  }
  return o !== null && a.push({
    start: e % i,
    end: o % i,
    loop: n
  }), a;
}
function Nx(t, e) {
  const s = t.points, n = t.options.spanGaps, i = s.length;
  if (!i)
    return [];
  const a = !!t._loop, { start: o, end: r } = Fx(s, i, a, n);
  if (n === !0)
    return ed(t, [
      {
        start: o,
        end: r,
        loop: a
      }
    ], s, e);
  const l = r < o ? r + i : r, c = !!t._fullLoop && o === 0 && r === i - 1;
  return ed(t, Ix(s, o, l, c), s, e);
}
function ed(t, e, s, n) {
  return !n || !n.setContext || !s ? e : Bx(t, e, s, n);
}
function Bx(t, e, s, n) {
  const i = t._chart.getContext(), a = sd(t.options), { _datasetIndex: o, options: { spanGaps: r } } = t, l = s.length, c = [];
  let h = a, u = e[0].start, d = u;
  function p(f, g, m, _) {
    const y = r ? -1 : 1;
    if (f !== g) {
      for (f += l; s[f % l].skip; )
        f -= y;
      for (; s[g % l].skip; )
        g += y;
      f % l !== g % l && (c.push({
        start: f % l,
        end: g % l,
        loop: m,
        style: _
      }), h = _, u = g % l);
    }
  }
  for (const f of e) {
    u = r ? u : f.start;
    let g = s[u % l], m;
    for (d = u + 1; d <= f.end; d++) {
      const _ = s[d % l];
      m = sd(n.setContext(en(i, {
        type: "segment",
        p0: g,
        p1: _,
        p0DataIndex: (d - 1) % l,
        p1DataIndex: d % l,
        datasetIndex: o
      }))), $x(m, h) && p(u, d - 1, f.loop, h), g = _, h = m;
    }
    u < d - 1 && p(u, d - 1, f.loop, h);
  }
  return c;
}
function sd(t) {
  return {
    backgroundColor: t.backgroundColor,
    borderCapStyle: t.borderCapStyle,
    borderDash: t.borderDash,
    borderDashOffset: t.borderDashOffset,
    borderJoinStyle: t.borderJoinStyle,
    borderWidth: t.borderWidth,
    borderColor: t.borderColor
  };
}
function $x(t, e) {
  if (!e)
    return !1;
  const s = [], n = function(i, a) {
    return uh(a) ? (s.includes(a) || s.push(a), s.indexOf(a)) : a;
  };
  return JSON.stringify(t, n) !== JSON.stringify(e, n);
}
function io(t, e, s) {
  return t.options.clip ? t[s] : e[s];
}
function jx(t, e) {
  const { xScale: s, yScale: n } = t;
  return s && n ? {
    left: io(s, e, "left"),
    right: io(s, e, "right"),
    top: io(n, e, "top"),
    bottom: io(n, e, "bottom")
  } : e;
}
function fm(t, e) {
  const s = e._clip;
  if (s.disabled)
    return !1;
  const n = jx(e, t.chartArea);
  return {
    left: s.left === !1 ? 0 : n.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? t.width : n.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : n.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? t.height : n.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class Wx {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, s, n, i) {
    const a = s.listeners[i], o = s.duration;
    a.forEach((r) => r({
      chart: e,
      initial: s.initial,
      numSteps: o,
      currentStep: Math.min(n - s.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Kg.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let s = 0;
    this._charts.forEach((n, i) => {
      if (!n.running || !n.items.length)
        return;
      const a = n.items;
      let o = a.length - 1, r = !1, l;
      for (; o >= 0; --o)
        l = a[o], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(e), r = !0) : (a[o] = a[a.length - 1], a.pop());
      r && (i.draw(), this._notify(i, n, e, "progress")), a.length || (n.running = !1, this._notify(i, n, e, "complete"), n.initial = !1), s += a.length;
    }), this._lastDate = e, s === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const s = this._charts;
    let n = s.get(e);
    return n || (n = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, s.set(e, n)), n;
  }
  listen(e, s, n) {
    this._getAnims(e).listeners[s].push(n);
  }
  add(e, s) {
    !s || !s.length || this._getAnims(e).items.push(...s);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const s = this._charts.get(e);
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((n, i) => Math.max(n, i._duration), 0), this._refresh());
  }
  running(e) {
    if (!this._running)
      return !1;
    const s = this._charts.get(e);
    return !(!s || !s.running || !s.items.length);
  }
  stop(e) {
    const s = this._charts.get(e);
    if (!s || !s.items.length)
      return;
    const n = s.items;
    let i = n.length - 1;
    for (; i >= 0; --i)
      n[i].cancel();
    s.items = [], this._notify(e, s, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var us = /* @__PURE__ */ new Wx();
const nd = "transparent", Hx = {
  boolean(t, e, s) {
    return s > 0.5 ? e : t;
  },
  color(t, e, s) {
    const n = qu(t || nd), i = n.valid && qu(e || nd);
    return i && i.valid ? i.mix(n, s).hexString() : e;
  },
  number(t, e, s) {
    return t + (e - t) * s;
  }
};
class Vx {
  constructor(e, s, n, i) {
    const a = s[n];
    i = Ii([
      e.to,
      i,
      a,
      e.from
    ]);
    const o = Ii([
      e.from,
      a,
      i
    ]);
    this._active = !0, this._fn = e.fn || Hx[e.type || typeof o], this._easing = Zi[e.easing] || Zi.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = s, this._prop = n, this._from = o, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, s, n) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], a = n - this._start, o = this._duration - a;
      this._start = n, this._duration = Math.floor(Math.max(o, e.duration)), this._total += a, this._loop = !!e.loop, this._to = Ii([
        e.to,
        s,
        i,
        e.from
      ]), this._from = Ii([
        e.from,
        i,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(e) {
    const s = e - this._start, n = this._duration, i = this._prop, a = this._from, o = this._loop, r = this._to;
    let l;
    if (this._active = a !== r && (o || s < n), !this._active) {
      this._target[i] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[i] = a;
      return;
    }
    l = s / n % 2, l = o && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[i] = this._fn(a, r, l);
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((s, n) => {
      e.push({
        res: s,
        rej: n
      });
    });
  }
  _notify(e) {
    const s = e ? "res" : "rej", n = this._promises || [];
    for (let i = 0; i < n.length; i++)
      n[i][s]();
  }
}
class pm {
  constructor(e, s) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(e) {
    if (!bt(e))
      return;
    const s = Object.keys(Nt.animation), n = this._properties;
    Object.getOwnPropertyNames(e).forEach((i) => {
      const a = e[i];
      if (!bt(a))
        return;
      const o = {};
      for (const r of s)
        o[r] = a[r];
      (Ft(a.properties) && a.properties || [
        i
      ]).forEach((r) => {
        (r === i || !n.has(r)) && n.set(r, o);
      });
    });
  }
  _animateOptions(e, s) {
    const n = s.options, i = Gx(e, n);
    if (!i)
      return [];
    const a = this._createAnimations(i, n);
    return n.$shared && zx(e.options.$animations, n).then(() => {
      e.options = n;
    }, () => {
    }), a;
  }
  _createAnimations(e, s) {
    const n = this._properties, i = [], a = e.$animations || (e.$animations = {}), o = Object.keys(s), r = Date.now();
    let l;
    for (l = o.length - 1; l >= 0; --l) {
      const c = o[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        i.push(...this._animateOptions(e, s));
        continue;
      }
      const h = s[c];
      let u = a[c];
      const d = n.get(c);
      if (u)
        if (d && u.active()) {
          u.update(d, h, r);
          continue;
        } else
          u.cancel();
      if (!d || !d.duration) {
        e[c] = h;
        continue;
      }
      a[c] = u = new Vx(d, e, c, h), i.push(u);
    }
    return i;
  }
  update(e, s) {
    if (this._properties.size === 0) {
      Object.assign(e, s);
      return;
    }
    const n = this._createAnimations(e, s);
    if (n.length)
      return us.add(this._chart, n), !0;
  }
}
function zx(t, e) {
  const s = [], n = Object.keys(e);
  for (let i = 0; i < n.length; i++) {
    const a = t[n[i]];
    a && a.active() && s.push(a.wait());
  }
  return Promise.all(s);
}
function Gx(t, e) {
  if (!e)
    return;
  let s = t.options;
  if (!s) {
    t.options = e;
    return;
  }
  return s.$shared && (t.options = s = Object.assign({}, s, {
    $shared: !1,
    $animations: {}
  })), s;
}
function id(t, e) {
  const s = t && t.options || {}, n = s.reverse, i = s.min === void 0 ? e : 0, a = s.max === void 0 ? e : 0;
  return {
    start: n ? a : i,
    end: n ? i : a
  };
}
function Ux(t, e, s) {
  if (s === !1)
    return !1;
  const n = id(t, s), i = id(e, s);
  return {
    top: i.end,
    right: n.end,
    bottom: i.start,
    left: n.start
  };
}
function qx(t) {
  let e, s, n, i;
  return bt(t) ? (e = t.top, s = t.right, n = t.bottom, i = t.left) : e = s = n = i = t, {
    top: e,
    right: s,
    bottom: n,
    left: i,
    disabled: t === !1
  };
}
function gm(t, e) {
  const s = [], n = t._getSortedDatasetMetas(e);
  let i, a;
  for (i = 0, a = n.length; i < a; ++i)
    s.push(n[i].index);
  return s;
}
function ad(t, e, s, n = {}) {
  const i = t.keys, a = n.mode === "single";
  let o, r, l, c;
  if (e === null)
    return;
  let h = !1;
  for (o = 0, r = i.length; o < r; ++o) {
    if (l = +i[o], l === s) {
      if (h = !0, n.all)
        continue;
      break;
    }
    c = t.values[l], jt(c) && (a || e === 0 || as(e) === as(c)) && (e += c);
  }
  return !h && !n.all ? 0 : e;
}
function Yx(t, e) {
  const { iScale: s, vScale: n } = e, i = s.axis === "x" ? "x" : "y", a = n.axis === "x" ? "x" : "y", o = Object.keys(t), r = new Array(o.length);
  let l, c, h;
  for (l = 0, c = o.length; l < c; ++l)
    h = o[l], r[l] = {
      [i]: h,
      [a]: t[h]
    };
  return r;
}
function ll(t, e) {
  const s = t && t.options.stacked;
  return s || s === void 0 && e.stack !== void 0;
}
function Kx(t, e, s) {
  return `${t.id}.${e.id}.${s.stack || s.type}`;
}
function Xx(t) {
  const { min: e, max: s, minDefined: n, maxDefined: i } = t.getUserBounds();
  return {
    min: n ? e : Number.NEGATIVE_INFINITY,
    max: i ? s : Number.POSITIVE_INFINITY
  };
}
function Jx(t, e, s) {
  const n = t[e] || (t[e] = {});
  return n[s] || (n[s] = {});
}
function od(t, e, s, n) {
  for (const i of e.getMatchingVisibleMetas(n).reverse()) {
    const a = t[i.index];
    if (s && a > 0 || !s && a < 0)
      return i.index;
  }
  return null;
}
function rd(t, e) {
  const { chart: s, _cachedMeta: n } = t, i = s._stacks || (s._stacks = {}), { iScale: a, vScale: o, index: r } = n, l = a.axis, c = o.axis, h = Kx(a, o, n), u = e.length;
  let d;
  for (let p = 0; p < u; ++p) {
    const f = e[p], { [l]: g, [c]: m } = f, _ = f._stacks || (f._stacks = {});
    d = _[c] = Jx(i, h, g), d[r] = m, d._top = od(d, o, !0, n.type), d._bottom = od(d, o, !1, n.type);
    const y = d._visualValues || (d._visualValues = {});
    y[r] = m;
  }
}
function cl(t, e) {
  const s = t.scales;
  return Object.keys(s).filter((n) => s[n].axis === e).shift();
}
function Zx(t, e) {
  return en(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function Qx(t, e, s) {
  return en(t, {
    active: !1,
    dataIndex: e,
    parsed: void 0,
    raw: void 0,
    element: s,
    index: e,
    mode: "default",
    type: "data"
  });
}
function Mi(t, e) {
  const s = t.controller.index, n = t.vScale && t.vScale.axis;
  if (n) {
    e = e || t._parsed;
    for (const i of e) {
      const a = i._stacks;
      if (!a || a[n] === void 0 || a[n][s] === void 0)
        return;
      delete a[n][s], a[n]._visualValues !== void 0 && a[n]._visualValues[s] !== void 0 && delete a[n]._visualValues[s];
    }
  }
}
const hl = (t) => t === "reset" || t === "none", ld = (t, e) => e ? t : Object.assign({}, t), tv = (t, e, s) => t && !e.hidden && e._stacked && {
  keys: gm(s, !0),
  values: null
};
class Ye {
  constructor(e, s) {
    this.chart = e, this._ctx = e.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = ll(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && Mi(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, s = this._cachedMeta, n = this.getDataset(), i = (u, d, p, f) => u === "x" ? d : u === "r" ? f : p, a = s.xAxisID = ut(n.xAxisID, cl(e, "x")), o = s.yAxisID = ut(n.yAxisID, cl(e, "y")), r = s.rAxisID = ut(n.rAxisID, cl(e, "r")), l = s.indexAxis, c = s.iAxisID = i(l, a, o, r), h = s.vAxisID = i(l, o, a, r);
    s.xScale = this.getScaleForId(a), s.yScale = this.getScaleForId(o), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(c), s.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(e) {
    return this.chart.scales[e];
  }
  _getOtherScale(e) {
    const s = this._cachedMeta;
    return e === s.iScale ? s.vScale : s.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const e = this._cachedMeta;
    this._data && zu(this._data, this), e._stacked && Mi(e);
  }
  _dataCheck() {
    const e = this.getDataset(), s = e.data || (e.data = []), n = this._data;
    if (bt(s)) {
      const i = this._cachedMeta;
      this._data = Yx(s, i);
    } else if (n !== s) {
      if (n) {
        zu(n, this);
        const i = this._cachedMeta;
        Mi(i), i._parsed = [];
      }
      s && Object.isExtensible(s) && B_(s, this), this._syncList = [], this._data = s;
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const s = this._cachedMeta, n = this.getDataset();
    let i = !1;
    this._dataCheck();
    const a = s._stacked;
    s._stacked = ll(s.vScale, s), s.stack !== n.stack && (i = !0, Mi(s), s.stack = n.stack), this._resyncElements(e), (i || a !== s._stacked) && (rd(this, s._parsed), s._stacked = ll(s.vScale, s));
  }
  configure() {
    const e = this.chart.config, s = e.datasetScopeKeys(this._type), n = e.getOptionScopes(this.getDataset(), s, !0);
    this.options = e.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, s) {
    const { _cachedMeta: n, _data: i } = this, { iScale: a, _stacked: o } = n, r = a.axis;
    let l = e === 0 && s === i.length ? !0 : n._sorted, c = e > 0 && n._parsed[e - 1], h, u, d;
    if (this._parsing === !1)
      n._parsed = i, n._sorted = !0, d = i;
    else {
      Ft(i[e]) ? d = this.parseArrayData(n, i, e, s) : bt(i[e]) ? d = this.parseObjectData(n, i, e, s) : d = this.parsePrimitiveData(n, i, e, s);
      const p = () => u[r] === null || c && u[r] < c[r];
      for (h = 0; h < s; ++h)
        n._parsed[h + e] = u = d[h], l && (p() && (l = !1), c = u);
      n._sorted = l;
    }
    o && rd(this, d);
  }
  parsePrimitiveData(e, s, n, i) {
    const { iScale: a, vScale: o } = e, r = a.axis, l = o.axis, c = a.getLabels(), h = a === o, u = new Array(i);
    let d, p, f;
    for (d = 0, p = i; d < p; ++d)
      f = d + n, u[d] = {
        [r]: h || a.parse(c[f], f),
        [l]: o.parse(s[f], f)
      };
    return u;
  }
  parseArrayData(e, s, n, i) {
    const { xScale: a, yScale: o } = e, r = new Array(i);
    let l, c, h, u;
    for (l = 0, c = i; l < c; ++l)
      h = l + n, u = s[h], r[l] = {
        x: a.parse(u[0], h),
        y: o.parse(u[1], h)
      };
    return r;
  }
  parseObjectData(e, s, n, i) {
    const { xScale: a, yScale: o } = e, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(i);
    let h, u, d, p;
    for (h = 0, u = i; h < u; ++h)
      d = h + n, p = s[d], c[h] = {
        x: a.parse(Qs(p, r), d),
        y: o.parse(Qs(p, l), d)
      };
    return c;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, s, n) {
    const i = this.chart, a = this._cachedMeta, o = s[e.axis], r = {
      keys: gm(i, !0),
      values: s._stacks[e.axis]._visualValues
    };
    return ad(r, o, a.index, {
      mode: n
    });
  }
  updateRangeFromParsed(e, s, n, i) {
    const a = n[s.axis];
    let o = a === null ? NaN : a;
    const r = i && n._stacks[s.axis];
    i && r && (i.values = r, o = ad(i, a, this._cachedMeta.index)), e.min = Math.min(e.min, o), e.max = Math.max(e.max, o);
  }
  getMinMax(e, s) {
    const n = this._cachedMeta, i = n._parsed, a = n._sorted && e === n.iScale, o = i.length, r = this._getOtherScale(e), l = tv(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = Xx(r);
    let d, p;
    function f() {
      p = i[d];
      const g = p[r.axis];
      return !jt(p[e.axis]) || h > g || u < g;
    }
    for (d = 0; d < o && !(!f() && (this.updateRangeFromParsed(c, e, p, l), a)); ++d)
      ;
    if (a) {
      for (d = o - 1; d >= 0; --d)
        if (!f()) {
          this.updateRangeFromParsed(c, e, p, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(e) {
    const s = this._cachedMeta._parsed, n = [];
    let i, a, o;
    for (i = 0, a = s.length; i < a; ++i)
      o = s[i][e.axis], jt(o) && n.push(o);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = s.iScale, i = s.vScale, a = this.getParsed(e);
    return {
      label: n ? "" + n.getLabelForValue(a[n.axis]) : "",
      value: i ? "" + i.getLabelForValue(a[i.axis]) : ""
    };
  }
  _update(e) {
    const s = this._cachedMeta;
    this.update(e || "default"), s._clip = qx(ut(this.options.clip, Ux(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, s = this.chart, n = this._cachedMeta, i = n.data || [], a = s.chartArea, o = [], r = this._drawStart || 0, l = this._drawCount || i.length - r, c = this.options.drawActiveElementsOnTop;
    let h;
    for (n.dataset && n.dataset.draw(e, a, r, l), h = r; h < r + l; ++h) {
      const u = i[h];
      u.hidden || (u.active && c ? o.push(u) : u.draw(e, a));
    }
    for (h = 0; h < o.length; ++h)
      o[h].draw(e, a);
  }
  getStyle(e, s) {
    const n = s ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(e || 0, n);
  }
  getContext(e, s, n) {
    const i = this.getDataset();
    let a;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[e];
      a = o.$context || (o.$context = Qx(this.getContext(), e, o)), a.parsed = this.getParsed(e), a.raw = i.data[e], a.index = a.dataIndex = e;
    } else
      a = this.$context || (this.$context = Zx(this.chart.getContext(), this.index)), a.dataset = i, a.index = a.datasetIndex = this.index;
    return a.active = !!s, a.mode = n, a;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, e);
  }
  _resolveElementOptions(e, s = "default", n) {
    const i = s === "active", a = this._cachedDataOpts, o = e + "-" + s, r = a[o], l = this.enableOptionSharing && ya(n);
    if (r)
      return ld(r, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, e), u = i ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], d = c.getOptionScopes(this.getDataset(), h), p = Object.keys(Nt.elements[e]), f = () => this.getContext(n, i, s), g = c.resolveNamedOptions(d, p, f, u);
    return g.$shared && (g.$shared = l, a[o] = Object.freeze(ld(g, l))), g;
  }
  _resolveAnimations(e, s, n) {
    const i = this.chart, a = this._cachedDataOpts, o = `animation-${s}`, r = a[o];
    if (r)
      return r;
    let l;
    if (i.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, s), d = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(d, this.getContext(e, n, s));
    }
    const c = new pm(i, l && l.animations);
    return l && l._cacheable && (a[o] = Object.freeze(c)), c;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, s) {
    return !s || hl(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, s) {
    const n = this.resolveDataElementOptions(e, s), i = this._sharedOptions, a = this.getSharedOptions(n), o = this.includeOptions(s, a) || a !== i;
    return this.updateSharedOptions(a, s, n), {
      sharedOptions: a,
      includeOptions: o
    };
  }
  updateElement(e, s, n, i) {
    hl(i) ? Object.assign(e, n) : this._resolveAnimations(s, i).update(e, n);
  }
  updateSharedOptions(e, s, n) {
    e && !hl(s) && this._resolveAnimations(void 0, s).update(e, n);
  }
  _setStyle(e, s, n, i) {
    e.active = i;
    const a = this.getStyle(s, i);
    this._resolveAnimations(s, n, i).update(e, {
      options: !i && this.getSharedOptions(a) || a
    });
  }
  removeHoverStyle(e, s, n) {
    this._setStyle(e, n, "active", !1);
  }
  setHoverStyle(e, s, n) {
    this._setStyle(e, n, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !0);
  }
  _resyncElements(e) {
    const s = this._data, n = this._cachedMeta.data;
    for (const [r, l, c] of this._syncList)
      this[r](l, c);
    this._syncList = [];
    const i = n.length, a = s.length, o = Math.min(a, i);
    o && this.parse(0, o), a > i ? this._insertElements(i, a - i, e) : a < i && this._removeElements(a, i - a);
  }
  _insertElements(e, s, n = !0) {
    const i = this._cachedMeta, a = i.data, o = e + s;
    let r;
    const l = (c) => {
      for (c.length += s, r = c.length - 1; r >= o; r--)
        c[r] = c[r - s];
    };
    for (l(a), r = e; r < o; ++r)
      a[r] = new this.dataElementType();
    this._parsing && l(i._parsed), this.parse(e, s), n && this.updateElements(a, e, s, "reset");
  }
  updateElements(e, s, n, i) {
  }
  _removeElements(e, s) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const i = n._parsed.splice(e, s);
      n._stacked && Mi(n, i);
    }
    n.data.splice(e, s);
  }
  _sync(e) {
    if (this._parsing)
      this._syncList.push(e);
    else {
      const [s, n, i] = e;
      this[s](n, i);
    }
    this.chart._dataChanges.push([
      this.index,
      ...e
    ]);
  }
  _onDataPush() {
    const e = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - e,
      e
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(e, s) {
    s && this._sync([
      "_removeElements",
      e,
      s
    ]);
    const n = arguments.length - 2;
    n && this._sync([
      "_insertElements",
      e,
      n
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
Q(Ye, "defaults", {}), Q(Ye, "datasetElementType", null), Q(Ye, "dataElementType", null);
function ev(t, e) {
  if (!t._cache.$bar) {
    const s = t.getMatchingVisibleMetas(e);
    let n = [];
    for (let i = 0, a = s.length; i < a; i++)
      n = n.concat(s[i].controller.getAllParsedValues(t));
    t._cache.$bar = Yg(n.sort((i, a) => i - a));
  }
  return t._cache.$bar;
}
function sv(t) {
  const e = t.iScale, s = ev(e, t.type);
  let n = e._length, i, a, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (ya(r) && (n = Math.min(n, Math.abs(o - r) || n)), r = o);
  };
  for (i = 0, a = s.length; i < a; ++i)
    o = e.getPixelForValue(s[i]), l();
  for (r = void 0, i = 0, a = e.ticks.length; i < a; ++i)
    o = e.getPixelForTick(i), l();
  return n;
}
function nv(t, e, s, n) {
  const i = s.barThickness;
  let a, o;
  return mt(i) ? (a = e.min * s.categoryPercentage, o = s.barPercentage) : (a = i * n, o = 1), {
    chunk: a / n,
    ratio: o,
    start: e.pixels[t] - a / 2
  };
}
function iv(t, e, s, n) {
  const i = e.pixels, a = i[t];
  let o = t > 0 ? i[t - 1] : null, r = t < i.length - 1 ? i[t + 1] : null;
  const l = s.categoryPercentage;
  o === null && (o = a - (r === null ? e.end - e.start : r - a)), r === null && (r = a + a - o);
  const c = a - (a - Math.min(o, r)) / 2 * l;
  return {
    chunk: Math.abs(r - o) / 2 * l / n,
    ratio: s.barPercentage,
    start: c
  };
}
function av(t, e, s, n) {
  const i = s.parse(t[0], n), a = s.parse(t[1], n), o = Math.min(i, a), r = Math.max(i, a);
  let l = o, c = r;
  Math.abs(o) > Math.abs(r) && (l = r, c = o), e[s.axis] = c, e._custom = {
    barStart: l,
    barEnd: c,
    start: i,
    end: a,
    min: o,
    max: r
  };
}
function mm(t, e, s, n) {
  return Ft(t) ? av(t, e, s, n) : e[s.axis] = s.parse(t, n), e;
}
function cd(t, e, s, n) {
  const i = t.iScale, a = t.vScale, o = i.getLabels(), r = i === a, l = [];
  let c, h, u, d;
  for (c = s, h = s + n; c < h; ++c)
    d = e[c], u = {}, u[i.axis] = r || i.parse(o[c], c), l.push(mm(d, u, a, c));
  return l;
}
function ul(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function ov(t, e, s) {
  return t !== 0 ? as(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= s ? 1 : -1);
}
function rv(t) {
  let e, s, n, i, a;
  return t.horizontal ? (e = t.base > t.x, s = "left", n = "right") : (e = t.base < t.y, s = "bottom", n = "top"), e ? (i = "end", a = "start") : (i = "start", a = "end"), {
    start: s,
    end: n,
    reverse: e,
    top: i,
    bottom: a
  };
}
function lv(t, e, s, n) {
  let i = e.borderSkipped;
  const a = {};
  if (!i) {
    t.borderSkipped = a;
    return;
  }
  if (i === !0) {
    t.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: o, end: r, reverse: l, top: c, bottom: h } = rv(t);
  i === "middle" && s && (t.enableBorderRadius = !0, (s._top || 0) === n ? i = c : (s._bottom || 0) === n ? i = h : (a[hd(h, o, r, l)] = !0, i = c)), a[hd(i, o, r, l)] = !0, t.borderSkipped = a;
}
function hd(t, e, s, n) {
  return n ? (t = cv(t, e, s), t = ud(t, s, e)) : t = ud(t, e, s), t;
}
function cv(t, e, s) {
  return t === e ? s : t === s ? e : t;
}
function ud(t, e, s) {
  return t === "start" ? e : t === "end" ? s : t;
}
function hv(t, { inflateAmount: e }, s) {
  t.inflateAmount = e === "auto" ? s === 1 ? 0.33 : 0 : e;
}
class wo extends Ye {
  parsePrimitiveData(e, s, n, i) {
    return cd(e, s, n, i);
  }
  parseArrayData(e, s, n, i) {
    return cd(e, s, n, i);
  }
  parseObjectData(e, s, n, i) {
    const { iScale: a, vScale: o } = e, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = a.axis === "x" ? r : l, h = o.axis === "x" ? r : l, u = [];
    let d, p, f, g;
    for (d = n, p = n + i; d < p; ++d)
      g = s[d], f = {}, f[a.axis] = a.parse(Qs(g, c), d), u.push(mm(Qs(g, h), f, o, d));
    return u;
  }
  updateRangeFromParsed(e, s, n, i) {
    super.updateRangeFromParsed(e, s, n, i);
    const a = n._custom;
    a && s === this._cachedMeta.vScale && (e.min = Math.min(e.min, a.min), e.max = Math.max(e.max, a.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, { iScale: n, vScale: i } = s, a = this.getParsed(e), o = a._custom, r = ul(o) ? "[" + o.start + ", " + o.end + "]" : "" + i.getLabelForValue(a[i.axis]);
    return {
      label: "" + n.getLabelForValue(a[n.axis]),
      value: r
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const s = this._cachedMeta;
    this.updateElements(s.data, 0, s.data.length, e);
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), h = this._getRuler(), { sharedOptions: u, includeOptions: d } = this._getSharedOptions(s, i);
    for (let p = s; p < s + n; p++) {
      const f = this.getParsed(p), g = a || mt(f[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), m = this._calculateBarIndexPixels(p, h), _ = (f._stacks || {})[r.axis], y = {
        horizontal: c,
        base: g.base,
        enableBorderRadius: !_ || ul(f._custom) || o === _._top || o === _._bottom,
        x: c ? g.head : m.center,
        y: c ? m.center : g.head,
        height: c ? m.size : Math.abs(g.size),
        width: c ? Math.abs(g.size) : m.size
      };
      d && (y.options = u || this.resolveDataElementOptions(p, e[p].active ? "active" : i));
      const b = y.options || e[p].options;
      lv(y, b, _, o), hv(y, b, h.ratio), this.updateElement(e[p], p, y, i);
    }
  }
  _getStacks(e, s) {
    const { iScale: n } = this._cachedMeta, i = n.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), a = n.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (h) => {
      const u = h._parsed.find((p) => p[n.axis] === l), d = u && u[h.vScale.axis];
      if (mt(d) || isNaN(d))
        return !0;
    };
    for (const h of i)
      if (!(s !== void 0 && c(h)) && ((a === !1 || o.indexOf(h.stack) === -1 || a === void 0 && h.stack === void 0) && o.push(h.stack), h.index === e))
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(e) {
    return this._getStacks(void 0, e).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const e = this.chart.scales, s = this.chart.options.indexAxis;
    return Object.keys(e).filter((n) => e[n].axis === s).shift();
  }
  _getAxis() {
    const e = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const n of this.chart.data.datasets)
      e[ut(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, s)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, s, n) {
    const i = this._getStacks(e, n), a = s !== void 0 ? i.indexOf(s) : -1;
    return a === -1 ? i.length - 1 : a;
  }
  _getRuler() {
    const e = this.options, s = this._cachedMeta, n = s.iScale, i = [];
    let a, o;
    for (a = 0, o = s.data.length; a < o; ++a)
      i.push(n.getPixelForValue(this.getParsed(a)[n.axis], a));
    const r = e.barThickness;
    return {
      min: r || sv(s),
      pixels: i,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: e.grouped,
      ratio: r ? 1 : e.categoryPercentage * e.barPercentage
    };
  }
  _calculateBarValuePixels(e) {
    const { _cachedMeta: { vScale: s, _stacked: n, index: i }, options: { base: a, minBarLength: o } } = this, r = a || 0, l = this.getParsed(e), c = l._custom, h = ul(c);
    let u = l[s.axis], d = 0, p = n ? this.applyStack(s, l, n) : u, f, g;
    p !== u && (d = p - u, p = u), h && (u = c.barStart, p = c.barEnd - c.barStart, u !== 0 && as(u) !== as(c.barEnd) && (d = 0), d += u);
    const m = !mt(a) && !h ? a : d;
    let _ = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(e) ? f = s.getPixelForValue(d + p) : f = _, g = f - _, Math.abs(g) < o) {
      g = ov(g, s, r) * o, u === r && (_ -= g / 2);
      const y = s.getPixelForDecimal(0), b = s.getPixelForDecimal(1), x = Math.min(y, b), v = Math.max(y, b);
      _ = Math.max(Math.min(_, v), x), f = _ + g, n && !h && (l._stacks[s.axis]._visualValues[i] = s.getValueForPixel(f) - s.getValueForPixel(_));
    }
    if (_ === s.getPixelForValue(r)) {
      const y = as(g) * s.getLineWidthForValue(r) / 2;
      _ += y, g -= y;
    }
    return {
      size: g,
      base: _,
      head: f,
      center: f + g / 2
    };
  }
  _calculateBarIndexPixels(e, s) {
    const n = s.scale, i = this.options, a = i.skipNull, o = ut(i.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const h = a ? this._getStackCount(e) : s.stackCount, u = i.barThickness === "flex" ? iv(e, s, i, h * c) : nv(e, s, i, h * c), d = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(ut(d, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, a ? e : void 0) + p;
      r = u.start + u.chunk * f + u.chunk / 2, l = Math.min(o, u.chunk * u.ratio);
    } else
      r = n.getPixelForValue(this.getParsed(e)[n.axis], e), l = Math.min(o, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const e = this._cachedMeta, s = e.vScale, n = e.data, i = n.length;
    let a = 0;
    for (; a < i; ++a)
      this.getParsed(a)[s.axis] !== null && !n[a].hidden && n[a].draw(this._ctx);
  }
}
Q(wo, "id", "bar"), Q(wo, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), Q(wo, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
class Co extends Ye {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(e, s, n, i) {
    const a = super.parsePrimitiveData(e, s, n, i);
    for (let o = 0; o < a.length; o++)
      a[o]._custom = this.resolveDataElementOptions(o + n).radius;
    return a;
  }
  parseArrayData(e, s, n, i) {
    const a = super.parseArrayData(e, s, n, i);
    for (let o = 0; o < a.length; o++) {
      const r = s[n + o];
      a[o]._custom = ut(r[2], this.resolveDataElementOptions(o + n).radius);
    }
    return a;
  }
  parseObjectData(e, s, n, i) {
    const a = super.parseObjectData(e, s, n, i);
    for (let o = 0; o < a.length; o++) {
      const r = s[n + o];
      a[o]._custom = ut(r && r.r && +r.r, this.resolveDataElementOptions(o + n).radius);
    }
    return a;
  }
  getMaxOverflow() {
    const e = this._cachedMeta.data;
    let s = 0;
    for (let n = e.length - 1; n >= 0; --n)
      s = Math.max(s, e[n].size(this.resolveDataElementOptions(n)) / 2);
    return s > 0 && s;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart.data.labels || [], { xScale: i, yScale: a } = s, o = this.getParsed(e), r = i.getLabelForValue(o.x), l = a.getLabelForValue(o.y), c = o._custom;
    return {
      label: n[e] || "",
      value: "(" + r + ", " + l + (c ? ", " + c : "") + ")"
    };
  }
  update(e) {
    const s = this._cachedMeta.data;
    this.updateElements(s, 0, s.length, e);
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", { iScale: o, vScale: r } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(s, i), h = o.axis, u = r.axis;
    for (let d = s; d < s + n; d++) {
      const p = e[d], f = !a && this.getParsed(d), g = {}, m = g[h] = a ? o.getPixelForDecimal(0.5) : o.getPixelForValue(f[h]), _ = g[u] = a ? r.getBasePixel() : r.getPixelForValue(f[u]);
      g.skip = isNaN(m) || isNaN(_), c && (g.options = l || this.resolveDataElementOptions(d, p.active ? "active" : i), a && (g.options.radius = 0)), this.updateElement(p, d, g, i);
    }
  }
  resolveDataElementOptions(e, s) {
    const n = this.getParsed(e);
    let i = super.resolveDataElementOptions(e, s);
    i.$shared && (i = Object.assign({}, i, {
      $shared: !1
    }));
    const a = i.radius;
    return s !== "active" && (i.radius = 0), i.radius += ut(n && n._custom, a), i;
  }
}
Q(Co, "id", "bubble"), Q(Co, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
}), Q(Co, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function uv(t, e, s) {
  let n = 1, i = 1, a = 0, o = 0;
  if (e < Et) {
    const r = t, l = r + e, c = Math.cos(r), h = Math.sin(r), u = Math.cos(l), d = Math.sin(l), p = (b, x, v) => ba(b, r, l, !0) ? 1 : Math.max(x, x * s, v, v * s), f = (b, x, v) => ba(b, r, l, !0) ? -1 : Math.min(x, x * s, v, v * s), g = p(0, c, u), m = p(qt, h, d), _ = f(vt, c, u), y = f(vt + qt, h, d);
    n = (g - _) / 2, i = (m - y) / 2, a = -(g + _) / 2, o = -(m + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: i,
    offsetX: a,
    offsetY: o
  };
}
class yn extends Ye {
  constructor(e, s) {
    super(e, s), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(e, s) {
    const n = this.getDataset().data, i = this._cachedMeta;
    if (this._parsing === !1)
      i._parsed = n;
    else {
      let a = (l) => +n[l];
      if (bt(n[e])) {
        const { key: l = "value" } = this._parsing;
        a = (c) => +Qs(n[c], l);
      }
      let o, r;
      for (o = e, r = e + s; o < r; ++o)
        i._parsed[o] = a(o);
    }
  }
  _getRotation() {
    return ze(this.options.rotation - 90);
  }
  _getCircumference() {
    return ze(this.options.circumference);
  }
  _getRotationExtents() {
    let e = Et, s = -Et;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const i = this.chart.getDatasetMeta(n).controller, a = i._getRotation(), o = i._getCircumference();
        e = Math.min(e, a), s = Math.max(s, a + o);
      }
    return {
      rotation: e,
      circumference: s - e
    };
  }
  update(e) {
    const s = this.chart, { chartArea: n } = s, i = this._cachedMeta, a = i.data, o = this.getMaxBorderWidth() + this.getMaxOffset(a) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - o) / 2, 0), l = Math.min(w_(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: u } = this._getRotationExtents(), { ratioX: d, ratioY: p, offsetX: f, offsetY: g } = uv(u, h, l), m = (n.width - o) / d, _ = (n.height - o) / p, y = Math.max(Math.min(m, _) / 2, 0), b = Vg(this.options.radius, y), x = Math.max(b * l, 0), v = (b - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * b, this.offsetY = g * b, i.total = this.calculateTotal(), this.outerRadius = b - v * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v * c, 0), this.updateElements(a, 0, a.length, e);
  }
  _circumference(e, s) {
    const n = this.options, i = this._cachedMeta, a = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(e) || i._parsed[e] === null || i.data[e].hidden ? 0 : this.calculateCircumference(i._parsed[e] * a / Et);
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", o = this.chart, r = o.chartArea, c = o.options.animation, h = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, d = a && c.animateScale, p = d ? 0 : this.innerRadius, f = d ? 0 : this.outerRadius, { sharedOptions: g, includeOptions: m } = this._getSharedOptions(s, i);
    let _ = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      _ += this._circumference(y, a);
    for (y = s; y < s + n; ++y) {
      const b = this._circumference(y, a), x = e[y], v = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: _,
        endAngle: _ + b,
        circumference: b,
        outerRadius: f,
        innerRadius: p
      };
      m && (v.options = g || this.resolveDataElementOptions(y, x.active ? "active" : i)), _ += b, this.updateElement(x, y, v, i);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, s = e.data;
    let n = 0, i;
    for (i = 0; i < s.length; i++) {
      const a = e._parsed[i];
      a !== null && !isNaN(a) && this.chart.getDataVisibility(i) && !s[i].hidden && (n += Math.abs(a));
    }
    return n;
  }
  calculateCircumference(e) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(e) ? Et * (Math.abs(e) / s) : 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], a = Ia(s._parsed[e], n.options.locale);
    return {
      label: i[e] || "",
      value: a
    };
  }
  getMaxBorderWidth(e) {
    let s = 0;
    const n = this.chart;
    let i, a, o, r, l;
    if (!e) {
      for (i = 0, a = n.data.datasets.length; i < a; ++i)
        if (n.isDatasetVisible(i)) {
          o = n.getDatasetMeta(i), e = o.data, r = o.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (i = 0, a = e.length; i < a; ++i)
      l = r.resolveDataElementOptions(i), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(e) {
    let s = 0;
    for (let n = 0, i = e.length; n < i; ++n) {
      const a = this.resolveDataElementOptions(n);
      s = Math.max(s, a.offset || 0, a.hoverOffset || 0);
    }
    return s;
  }
  _getRingWeightOffset(e) {
    let s = 0;
    for (let n = 0; n < e; ++n)
      this.chart.isDatasetVisible(n) && (s += this._getRingWeight(n));
    return s;
  }
  _getRingWeight(e) {
    return Math.max(ut(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
Q(yn, "id", "doughnut"), Q(yn, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), Q(yn, "descriptors", {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}), Q(yn, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const s = e.data, { labels: { pointStyle: n, textAlign: i, color: a, useBorderRadius: o, borderRadius: r } } = e.legend.options;
          return s.labels.length && s.datasets.length ? s.labels.map((l, c) => {
            const u = e.getDatasetMeta(0).controller.getStyle(c);
            return {
              text: l,
              fillStyle: u.backgroundColor,
              fontColor: a,
              hidden: !e.getDataVisibility(c),
              lineDash: u.borderDash,
              lineDashOffset: u.borderDashOffset,
              lineJoin: u.borderJoinStyle,
              lineWidth: u.borderWidth,
              strokeStyle: u.borderColor,
              textAlign: i,
              pointStyle: n,
              borderRadius: o && (r || u.borderRadius),
              index: c
            };
          }) : [];
        }
      },
      onClick(e, s, n) {
        n.chart.toggleDataVisibility(s.index), n.chart.update();
      }
    }
  }
});
class ko extends Ye {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const s = this._cachedMeta, { dataset: n, data: i = [], _dataset: a } = s, o = this.chart._animationsDisabled;
    let { start: r, count: l } = Jg(s, i, o);
    this._drawStart = r, this._drawCount = l, Zg(s) && (r = 0, l = i.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!a._decimated, n.points = i;
    const c = this.resolveDatasetElementOptions(e);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !o,
      options: c
    }, e), this.updateElements(i, r, l, e);
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(s, i), d = o.axis, p = r.axis, { spanGaps: f, segment: g } = this.options, m = fi(f) ? f : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || a || i === "none", y = s + n, b = e.length;
    let x = s > 0 && this.getParsed(s - 1);
    for (let v = 0; v < b; ++v) {
      const k = e[v], S = _ ? k : {};
      if (v < s || v >= y) {
        S.skip = !0;
        continue;
      }
      const C = this.getParsed(v), D = mt(C[p]), O = S[d] = o.getPixelForValue(C[d], v), I = S[p] = a || D ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, C, l) : C[p], v);
      S.skip = isNaN(O) || isNaN(I) || D, S.stop = v > 0 && Math.abs(C[d] - x[d]) > m, g && (S.parsed = C, S.raw = c.data[v]), u && (S.options = h || this.resolveDataElementOptions(v, k.active ? "active" : i)), _ || this.updateElement(k, v, S, i), x = C;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, s = e.dataset, n = s.options && s.options.borderWidth || 0, i = e.data || [];
    if (!i.length)
      return n;
    const a = i[0].size(this.resolveDataElementOptions(0)), o = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(n, a, o) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
}
Q(ko, "id", "line"), Q(ko, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Q(ko, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class ta extends Ye {
  constructor(e, s) {
    super(e, s), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], a = Ia(s._parsed[e].r, n.options.locale);
    return {
      label: i[e] || "",
      value: a
    };
  }
  parseObjectData(e, s, n, i) {
    return om.bind(this)(e, s, n, i);
  }
  update(e) {
    const s = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(s, 0, s.length, e);
  }
  getMinMax() {
    const e = this._cachedMeta, s = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return e.data.forEach((n, i) => {
      const a = this.getParsed(i).r;
      !isNaN(a) && this.chart.getDataVisibility(i) && (a < s.min && (s.min = a), a > s.max && (s.max = a));
    }), s;
  }
  _updateRadius() {
    const e = this.chart, s = e.chartArea, n = e.options, i = Math.min(s.right - s.left, s.bottom - s.top), a = Math.max(i / 2, 0), o = Math.max(n.cutoutPercentage ? a / 100 * n.cutoutPercentage : 1, 0), r = (a - o) / e.getVisibleDatasetCount();
    this.outerRadius = a - r * this.index, this.innerRadius = this.outerRadius - r;
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", o = this.chart, l = o.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, u = c.yCenter, d = c.getIndexAngle(0) - 0.5 * vt;
    let p = d, f;
    const g = 360 / this.countVisibleElements();
    for (f = 0; f < s; ++f)
      p += this._computeAngle(f, i, g);
    for (f = s; f < s + n; f++) {
      const m = e[f];
      let _ = p, y = p + this._computeAngle(f, i, g), b = o.getDataVisibility(f) ? c.getDistanceFromCenterForValue(this.getParsed(f).r) : 0;
      p = y, a && (l.animateScale && (b = 0), l.animateRotate && (_ = y = d));
      const x = {
        x: h,
        y: u,
        innerRadius: 0,
        outerRadius: b,
        startAngle: _,
        endAngle: y,
        options: this.resolveDataElementOptions(f, m.active ? "active" : i)
      };
      this.updateElement(m, f, x, i);
    }
  }
  countVisibleElements() {
    const e = this._cachedMeta;
    let s = 0;
    return e.data.forEach((n, i) => {
      !isNaN(this.getParsed(i).r) && this.chart.getDataVisibility(i) && s++;
    }), s;
  }
  _computeAngle(e, s, n) {
    return this.chart.getDataVisibility(e) ? ze(this.resolveDataElementOptions(e, s).angle || n) : 0;
  }
}
Q(ta, "id", "polarArea"), Q(ta, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}), Q(ta, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const s = e.data;
          if (s.labels.length && s.datasets.length) {
            const { labels: { pointStyle: n, color: i } } = e.legend.options;
            return s.labels.map((a, o) => {
              const l = e.getDatasetMeta(0).controller.getStyle(o);
              return {
                text: a,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: i,
                lineWidth: l.borderWidth,
                pointStyle: n,
                hidden: !e.getDataVisibility(o),
                index: o
              };
            });
          }
          return [];
        }
      },
      onClick(e, s, n) {
        n.chart.toggleDataVisibility(s.index), n.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
});
class ec extends yn {
}
Q(ec, "id", "pie"), Q(ec, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class Mo extends Ye {
  getLabelAndValue(e) {
    const s = this._cachedMeta.vScale, n = this.getParsed(e);
    return {
      label: s.getLabels()[e],
      value: "" + s.getLabelForValue(n[s.axis])
    };
  }
  parseObjectData(e, s, n, i) {
    return om.bind(this)(e, s, n, i);
  }
  update(e) {
    const s = this._cachedMeta, n = s.dataset, i = s.data || [], a = s.iScale.getLabels();
    if (n.points = i, e !== "resize") {
      const o = this.resolveDatasetElementOptions(e);
      this.options.showLine || (o.borderWidth = 0);
      const r = {
        _loop: !0,
        _fullLoop: a.length === i.length,
        options: o
      };
      this.updateElement(n, void 0, r, e);
    }
    this.updateElements(i, 0, i.length, e);
  }
  updateElements(e, s, n, i) {
    const a = this._cachedMeta.rScale, o = i === "reset";
    for (let r = s; r < s + n; r++) {
      const l = e[r], c = this.resolveDataElementOptions(r, l.active ? "active" : i), h = a.getPointPositionForValue(r, this.getParsed(r).r), u = o ? a.xCenter : h.x, d = o ? a.yCenter : h.y, p = {
        x: u,
        y: d,
        angle: h.angle,
        skip: isNaN(u) || isNaN(d),
        options: c
      };
      this.updateElement(l, r, p, i);
    }
  }
}
Q(Mo, "id", "radar"), Q(Mo, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), Q(Mo, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class Ao extends Ye {
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart.data.labels || [], { xScale: i, yScale: a } = s, o = this.getParsed(e), r = i.getLabelForValue(o.x), l = a.getLabelForValue(o.y);
    return {
      label: n[e] || "",
      value: "(" + r + ", " + l + ")"
    };
  }
  update(e) {
    const s = this._cachedMeta, { data: n = [] } = s, i = this.chart._animationsDisabled;
    let { start: a, count: o } = Jg(s, n, i);
    if (this._drawStart = a, this._drawCount = o, Zg(s) && (a = 0, o = n.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: r, _dataset: l } = s;
      r._chart = this.chart, r._datasetIndex = this.index, r._decimated = !!l._decimated, r.points = n;
      const c = this.resolveDatasetElementOptions(e);
      c.segment = this.options.segment, this.updateElement(r, void 0, {
        animated: !i,
        options: c
      }, e);
    } else this.datasetElementType && (delete s.dataset, this.datasetElementType = !1);
    this.updateElements(n, a, o, e);
  }
  addElements() {
    const { showLine: e } = this.options;
    !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(s, i), u = this.getSharedOptions(h), d = this.includeOptions(i, u), p = o.axis, f = r.axis, { spanGaps: g, segment: m } = this.options, _ = fi(g) ? g : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || a || i === "none";
    let b = s > 0 && this.getParsed(s - 1);
    for (let x = s; x < s + n; ++x) {
      const v = e[x], k = this.getParsed(x), S = y ? v : {}, C = mt(k[f]), D = S[p] = o.getPixelForValue(k[p], x), O = S[f] = a || C ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, k, l) : k[f], x);
      S.skip = isNaN(D) || isNaN(O) || C, S.stop = x > 0 && Math.abs(k[p] - b[p]) > _, m && (S.parsed = k, S.raw = c.data[x]), d && (S.options = u || this.resolveDataElementOptions(x, v.active ? "active" : i)), y || this.updateElement(v, x, S, i), b = k;
    }
    this.updateSharedOptions(u, i, h);
  }
  getMaxOverflow() {
    const e = this._cachedMeta, s = e.data || [];
    if (!this.options.showLine) {
      let r = 0;
      for (let l = s.length - 1; l >= 0; --l)
        r = Math.max(r, s[l].size(this.resolveDataElementOptions(l)) / 2);
      return r > 0 && r;
    }
    const n = e.dataset, i = n.options && n.options.borderWidth || 0;
    if (!s.length)
      return i;
    const a = s[0].size(this.resolveDataElementOptions(0)), o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(i, a, o) / 2;
  }
}
Q(Ao, "id", "scatter"), Q(Ao, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), Q(Ao, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
var dv = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: wo,
  BubbleController: Co,
  DoughnutController: yn,
  LineController: ko,
  PieController: ec,
  PolarAreaController: ta,
  RadarController: Mo,
  ScatterController: Ao
});
function cn() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class bh {
  constructor(e) {
    Q(this, "options");
    this.options = e || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(e) {
    Object.assign(bh.prototype, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return cn();
  }
  parse() {
    return cn();
  }
  format() {
    return cn();
  }
  add() {
    return cn();
  }
  diff() {
    return cn();
  }
  startOf() {
    return cn();
  }
  endOf() {
    return cn();
  }
}
var fv = {
  _date: bh
};
function pv(t, e, s, n) {
  const { controller: i, data: a, _sorted: o } = t, r = i._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (r && e === r.axis && e !== "r" && o && a.length) {
    const c = r._reversePixels ? I_ : vs;
    if (n) {
      if (i._sharedOptions) {
        const h = a[0], u = typeof h.getRange == "function" && h.getRange(e);
        if (u) {
          const d = c(a, e, s - u), p = c(a, e, s + u);
          return {
            lo: d.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const h = c(a, e, s);
      if (l) {
        const { vScale: u } = i._cachedMeta, { _parsed: d } = t, p = d.slice(0, h.lo + 1).reverse().findIndex((g) => !mt(g[u.axis]));
        h.lo -= Math.max(0, p);
        const f = d.slice(h.hi).findIndex((g) => !mt(g[u.axis]));
        h.hi += Math.max(0, f);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: a.length - 1
  };
}
function $r(t, e, s, n, i) {
  const a = t.getSortedVisibleDatasetMetas(), o = s[e];
  for (let r = 0, l = a.length; r < l; ++r) {
    const { index: c, data: h } = a[r], { lo: u, hi: d } = pv(a[r], e, o, i);
    for (let p = u; p <= d; ++p) {
      const f = h[p];
      f.skip || n(f, c, p);
    }
  }
}
function gv(t) {
  const e = t.indexOf("x") !== -1, s = t.indexOf("y") !== -1;
  return function(n, i) {
    const a = e ? Math.abs(n.x - i.x) : 0, o = s ? Math.abs(n.y - i.y) : 0;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
  };
}
function dl(t, e, s, n, i) {
  const a = [];
  return !i && !t.isPointInArea(e) || $r(t, s, e, function(r, l, c) {
    !i && !Ss(r, t.chartArea, 0) || r.inRange(e.x, e.y, n) && a.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), a;
}
function mv(t, e, s, n) {
  let i = [];
  function a(o, r, l) {
    const { startAngle: c, endAngle: h } = o.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: u } = Ug(o, {
      x: e.x,
      y: e.y
    });
    ba(u, c, h) && i.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return $r(t, s, e, a), i;
}
function yv(t, e, s, n, i, a) {
  let o = [];
  const r = gv(s);
  let l = Number.POSITIVE_INFINITY;
  function c(h, u, d) {
    const p = h.inRange(e.x, e.y, i);
    if (n && !p)
      return;
    const f = h.getCenterPoint(i);
    if (!(!!a || t.isPointInArea(f)) && !p)
      return;
    const m = r(e, f);
    m < l ? (o = [
      {
        element: h,
        datasetIndex: u,
        index: d
      }
    ], l = m) : m === l && o.push({
      element: h,
      datasetIndex: u,
      index: d
    });
  }
  return $r(t, s, e, c), o;
}
function fl(t, e, s, n, i, a) {
  return !a && !t.isPointInArea(e) ? [] : s === "r" && !n ? mv(t, e, s, i) : yv(t, e, s, n, i, a);
}
function dd(t, e, s, n, i) {
  const a = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return $r(t, s, e, (l, c, h) => {
    l[o] && l[o](e[s], i) && (a.push({
      element: l,
      datasetIndex: c,
      index: h
    }), r = r || l.inRange(e.x, e.y, i));
  }), n && !r ? [] : a;
}
var bv = {
  modes: {
    index(t, e, s, n) {
      const i = fn(e, t), a = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? dl(t, i, a, n, o) : fl(t, i, a, !1, n, o), l = [];
      return r.length ? (t.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = r[0].index, u = c.data[h];
        u && !u.skip && l.push({
          element: u,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(t, e, s, n) {
      const i = fn(e, t), a = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? dl(t, i, a, n, o) : fl(t, i, a, !1, n, o);
      if (r.length > 0) {
        const l = r[0].datasetIndex, c = t.getDatasetMeta(l).data;
        r = [];
        for (let h = 0; h < c.length; ++h)
          r.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return r;
    },
    point(t, e, s, n) {
      const i = fn(e, t), a = s.axis || "xy", o = s.includeInvisible || !1;
      return dl(t, i, a, n, o);
    },
    nearest(t, e, s, n) {
      const i = fn(e, t), a = s.axis || "xy", o = s.includeInvisible || !1;
      return fl(t, i, a, s.intersect, n, o);
    },
    x(t, e, s, n) {
      const i = fn(e, t);
      return dd(t, i, "x", s.intersect, n);
    },
    y(t, e, s, n) {
      const i = fn(e, t);
      return dd(t, i, "y", s.intersect, n);
    }
  }
};
const ym = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ai(t, e) {
  return t.filter((s) => s.pos === e);
}
function fd(t, e) {
  return t.filter((s) => ym.indexOf(s.pos) === -1 && s.box.axis === e);
}
function Pi(t, e) {
  return t.sort((s, n) => {
    const i = e ? n : s, a = e ? s : n;
    return i.weight === a.weight ? i.index - a.index : i.weight - a.weight;
  });
}
function _v(t) {
  const e = [];
  let s, n, i, a, o, r;
  for (s = 0, n = (t || []).length; s < n; ++s)
    i = t[s], { position: a, options: { stack: o, stackWeight: r = 1 } } = i, e.push({
      index: s,
      box: i,
      pos: a,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: o && a + o,
      stackWeight: r
    });
  return e;
}
function xv(t) {
  const e = {};
  for (const s of t) {
    const { stack: n, pos: i, stackWeight: a } = s;
    if (!n || !ym.includes(i))
      continue;
    const o = e[n] || (e[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += a;
  }
  return e;
}
function vv(t, e) {
  const s = xv(t), { vBoxMaxWidth: n, hBoxMaxHeight: i } = e;
  let a, o, r;
  for (a = 0, o = t.length; a < o; ++a) {
    r = t[a];
    const { fullSize: l } = r.box, c = s[r.stack], h = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = h ? h * n : l && e.availableWidth, r.height = i) : (r.width = n, r.height = h ? h * i : l && e.availableHeight);
  }
  return s;
}
function Sv(t) {
  const e = _v(t), s = Pi(e.filter((c) => c.box.fullSize), !0), n = Pi(Ai(e, "left"), !0), i = Pi(Ai(e, "right")), a = Pi(Ai(e, "top"), !0), o = Pi(Ai(e, "bottom")), r = fd(e, "x"), l = fd(e, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(a),
    rightAndBottom: i.concat(l).concat(o).concat(r),
    chartArea: Ai(e, "chartArea"),
    vertical: n.concat(i).concat(l),
    horizontal: a.concat(o).concat(r)
  };
}
function pd(t, e, s, n) {
  return Math.max(t[s], e[s]) + Math.max(t[n], e[n]);
}
function bm(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function wv(t, e, s, n) {
  const { pos: i, box: a } = s, o = t.maxPadding;
  if (!bt(i)) {
    s.size && (t[i] -= s.size);
    const u = n[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? a.height : a.width), s.size = u.size / u.count, t[i] += s.size;
  }
  a.getPadding && bm(o, a.getPadding());
  const r = Math.max(0, e.outerWidth - pd(o, t, "left", "right")), l = Math.max(0, e.outerHeight - pd(o, t, "top", "bottom")), c = r !== t.w, h = l !== t.h;
  return t.w = r, t.h = l, s.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function Cv(t) {
  const e = t.maxPadding;
  function s(n) {
    const i = Math.max(e[n] - t[n], 0);
    return t[n] += i, i;
  }
  t.y += s("top"), t.x += s("left"), s("right"), s("bottom");
}
function kv(t, e) {
  const s = e.maxPadding;
  function n(i) {
    const a = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return i.forEach((o) => {
      a[o] = Math.max(e[o], s[o]);
    }), a;
  }
  return n(t ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Ni(t, e, s, n) {
  const i = [];
  let a, o, r, l, c, h;
  for (a = 0, o = t.length, c = 0; a < o; ++a) {
    r = t[a], l = r.box, l.update(r.width || e.w, r.height || e.h, kv(r.horizontal, e));
    const { same: u, other: d } = wv(e, s, r, n);
    c |= u && i.length, h = h || d, l.fullSize || i.push(r);
  }
  return c && Ni(i, e, s, n) || h;
}
function ao(t, e, s, n, i) {
  t.top = s, t.left = e, t.right = e + n, t.bottom = s + i, t.width = n, t.height = i;
}
function gd(t, e, s, n) {
  const i = s.padding;
  let { x: a, y: o } = e;
  for (const r of t) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, h = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const u = e.w * h, d = c.size || l.height;
      ya(c.start) && (o = c.start), l.fullSize ? ao(l, i.left, o, s.outerWidth - i.right - i.left, d) : ao(l, e.left + c.placed, o, u, d), c.start = o, c.placed += u, o = l.bottom;
    } else {
      const u = e.h * h, d = c.size || l.width;
      ya(c.start) && (a = c.start), l.fullSize ? ao(l, a, i.top, d, s.outerHeight - i.bottom - i.top) : ao(l, a, e.top + c.placed, d, u), c.start = a, c.placed += u, a = l.right;
    }
  }
  e.x = a, e.y = o;
}
var pe = {
  addBox(t, e) {
    t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
      return [
        {
          z: 0,
          draw(s) {
            e.draw(s);
          }
        }
      ];
    }, t.boxes.push(e);
  },
  removeBox(t, e) {
    const s = t.boxes ? t.boxes.indexOf(e) : -1;
    s !== -1 && t.boxes.splice(s, 1);
  },
  configure(t, e, s) {
    e.fullSize = s.fullSize, e.position = s.position, e.weight = s.weight;
  },
  update(t, e, s, n) {
    if (!t)
      return;
    const i = me(t.options.layout.padding), a = Math.max(e - i.width, 0), o = Math.max(s - i.height, 0), r = Sv(t.boxes), l = r.vertical, c = r.horizontal;
    At(t.boxes, (g) => {
      typeof g.beforeLayout == "function" && g.beforeLayout();
    });
    const h = l.reduce((g, m) => m.box.options && m.box.options.display === !1 ? g : g + 1, 0) || 1, u = Object.freeze({
      outerWidth: e,
      outerHeight: s,
      padding: i,
      availableWidth: a,
      availableHeight: o,
      vBoxMaxWidth: a / 2 / h,
      hBoxMaxHeight: o / 2
    }), d = Object.assign({}, i);
    bm(d, me(n));
    const p = Object.assign({
      maxPadding: d,
      w: a,
      h: o,
      x: i.left,
      y: i.top
    }, i), f = vv(l.concat(c), u);
    Ni(r.fullSize, p, u, f), Ni(l, p, u, f), Ni(c, p, u, f) && Ni(l, p, u, f), Cv(p), gd(r.leftAndTop, p, u, f), p.x += p.w, p.y += p.h, gd(r.rightAndBottom, p, u, f), t.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, At(r.chartArea, (g) => {
      const m = g.box;
      Object.assign(m, t.chartArea), m.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class _m {
  acquireContext(e, s) {
  }
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, s, n) {
  }
  removeEventListener(e, s, n) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, s, n, i) {
    return s = Math.max(0, s || e.width), n = n || e.height, {
      width: s,
      height: Math.max(0, i ? Math.floor(s / i) : n)
    };
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {
  }
}
class Mv extends _m {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Po = "$chartjs", Av = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, md = (t) => t === null || t === "";
function Pv(t, e) {
  const s = t.style, n = t.getAttribute("height"), i = t.getAttribute("width");
  if (t[Po] = {
    initial: {
      height: n,
      width: i,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", md(i)) {
    const a = Qu(t, "width");
    a !== void 0 && (t.width = a);
  }
  if (md(n))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const a = Qu(t, "height");
      a !== void 0 && (t.height = a);
    }
  return t;
}
const xm = Tx ? {
  passive: !0
} : !1;
function Tv(t, e, s) {
  t && t.addEventListener(e, s, xm);
}
function Dv(t, e, s) {
  t && t.canvas && t.canvas.removeEventListener(e, s, xm);
}
function Rv(t, e) {
  const s = Av[t.type] || t.type, { x: n, y: i } = fn(t, e);
  return {
    type: s,
    chart: e,
    native: t,
    x: n !== void 0 ? n : null,
    y: i !== void 0 ? i : null
  };
}
function hr(t, e) {
  for (const s of t)
    if (s === e || s.contains(e))
      return !0;
}
function Lv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((a) => {
    let o = !1;
    for (const r of a)
      o = o || hr(r.addedNodes, n), o = o && !hr(r.removedNodes, n);
    o && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function Ov(t, e, s) {
  const n = t.canvas, i = new MutationObserver((a) => {
    let o = !1;
    for (const r of a)
      o = o || hr(r.removedNodes, n), o = o && !hr(r.addedNodes, n);
    o && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const xa = /* @__PURE__ */ new Map();
let yd = 0;
function vm() {
  const t = window.devicePixelRatio;
  t !== yd && (yd = t, xa.forEach((e, s) => {
    s.currentDevicePixelRatio !== t && e();
  }));
}
function Ev(t, e) {
  xa.size || window.addEventListener("resize", vm), xa.set(t, e);
}
function Fv(t) {
  xa.delete(t), xa.size || window.removeEventListener("resize", vm);
}
function Iv(t, e, s) {
  const n = t.canvas, i = n && yh(n);
  if (!i)
    return;
  const a = Xg((r, l) => {
    const c = i.clientWidth;
    s(r, l), c < i.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || a(c, h);
  });
  return o.observe(i), Ev(t, a), o;
}
function pl(t, e, s) {
  s && s.disconnect(), e === "resize" && Fv(t);
}
function Nv(t, e, s) {
  const n = t.canvas, i = Xg((a) => {
    t.ctx !== null && s(Rv(a, t));
  }, t);
  return Tv(n, e, i), i;
}
class Bv extends _m {
  acquireContext(e, s) {
    const n = e && e.getContext && e.getContext("2d");
    return n && n.canvas === e ? (Pv(e, s), n) : null;
  }
  releaseContext(e) {
    const s = e.canvas;
    if (!s[Po])
      return !1;
    const n = s[Po].initial;
    [
      "height",
      "width"
    ].forEach((a) => {
      const o = n[a];
      mt(o) ? s.removeAttribute(a) : s.setAttribute(a, o);
    });
    const i = n.style || {};
    return Object.keys(i).forEach((a) => {
      s.style[a] = i[a];
    }), s.width = s.width, delete s[Po], !0;
  }
  addEventListener(e, s, n) {
    this.removeEventListener(e, s);
    const i = e.$proxies || (e.$proxies = {}), o = {
      attach: Lv,
      detach: Ov,
      resize: Iv
    }[s] || Nv;
    i[s] = o(e, s, n);
  }
  removeEventListener(e, s) {
    const n = e.$proxies || (e.$proxies = {}), i = n[s];
    if (!i)
      return;
    ({
      attach: pl,
      detach: pl,
      resize: pl
    }[s] || Dv)(e, s, i), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, s, n, i) {
    return Px(e, s, n, i);
  }
  isAttached(e) {
    const s = e && yh(e);
    return !!(s && s.isConnected);
  }
}
function $v(t) {
  return !mh() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? Mv : Bv;
}
var bo;
let Os = (bo = class {
  constructor() {
    Q(this, "x");
    Q(this, "y");
    Q(this, "active", !1);
    Q(this, "options");
    Q(this, "$animations");
  }
  tooltipPosition(e) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: s,
      y: n
    };
  }
  hasValue() {
    return fi(this.x) && fi(this.y);
  }
  getProps(e, s) {
    const n = this.$animations;
    if (!s || !n)
      return this;
    const i = {};
    return e.forEach((a) => {
      i[a] = n[a] && n[a].active() ? n[a]._to : this[a];
    }), i;
  }
}, Q(bo, "defaults", {}), Q(bo, "defaultRoutes"), bo);
function jv(t, e) {
  const s = t.options.ticks, n = Wv(t), i = Math.min(s.maxTicksLimit || n, n), a = s.major.enabled ? Vv(e) : [], o = a.length, r = a[0], l = a[o - 1], c = [];
  if (o > i)
    return zv(e, c, a, o / i), c;
  const h = Hv(a, e, i);
  if (o > 0) {
    let u, d;
    const p = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (oo(e, c, h, mt(p) ? 0 : r - p, r), u = 0, d = o - 1; u < d; u++)
      oo(e, c, h, a[u], a[u + 1]);
    return oo(e, c, h, l, mt(p) ? e.length : l + p), c;
  }
  return oo(e, c, h), c;
}
function Wv(t) {
  const e = t.options.offset, s = t._tickSize(), n = t._length / s + (e ? 0 : 1), i = t._maxLength / s;
  return Math.floor(Math.min(n, i));
}
function Hv(t, e, s) {
  const n = Gv(t), i = e.length / s;
  if (!n)
    return Math.max(i, 1);
  const a = R_(n);
  for (let o = 0, r = a.length - 1; o < r; o++) {
    const l = a[o];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Vv(t) {
  const e = [];
  let s, n;
  for (s = 0, n = t.length; s < n; s++)
    t[s].major && e.push(s);
  return e;
}
function zv(t, e, s, n) {
  let i = 0, a = s[0], o;
  for (n = Math.ceil(n), o = 0; o < t.length; o++)
    o === a && (e.push(t[o]), i++, a = s[i * n]);
}
function oo(t, e, s, n, i) {
  const a = ut(n, 0), o = Math.min(ut(i, t.length), t.length);
  let r = 0, l, c, h;
  for (s = Math.ceil(s), i && (l = i - n, s = l / Math.floor(l / s)), h = a; h < 0; )
    r++, h = Math.round(a + r * s);
  for (c = Math.max(a, 0); c < o; c++)
    c === h && (e.push(t[c]), r++, h = Math.round(a + r * s));
}
function Gv(t) {
  const e = t.length;
  let s, n;
  if (e < 2)
    return !1;
  for (n = t[0], s = 1; s < e; ++s)
    if (t[s] - t[s - 1] !== n)
      return !1;
  return n;
}
const Uv = (t) => t === "left" ? "right" : t === "right" ? "left" : t, bd = (t, e, s) => e === "top" || e === "left" ? t[e] + s : t[e] - s, _d = (t, e) => Math.min(e || t, t);
function xd(t, e) {
  const s = [], n = t.length / e, i = t.length;
  let a = 0;
  for (; a < i; a += n)
    s.push(t[Math.floor(a)]);
  return s;
}
function qv(t, e, s) {
  const n = t.ticks.length, i = Math.min(e, n - 1), a = t._startPixel, o = t._endPixel, r = 1e-6;
  let l = t.getPixelForTick(i), c;
  if (!(s && (n === 1 ? c = Math.max(l - a, o - l) : e === 0 ? c = (t.getPixelForTick(1) - l) / 2 : c = (l - t.getPixelForTick(i - 1)) / 2, l += i < e ? c : -c, l < a - r || l > o + r)))
    return l;
}
function Yv(t, e) {
  At(t, (s) => {
    const n = s.gc, i = n.length / 2;
    let a;
    if (i > e) {
      for (a = 0; a < i; ++a)
        delete s.data[n[a]];
      n.splice(0, i);
    }
  });
}
function Ti(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function vd(t, e) {
  if (!t.display)
    return 0;
  const s = Zt(t.font, e), n = me(t.padding);
  return (Ft(t.text) ? t.text.length : 1) * s.lineHeight + n.height;
}
function Kv(t, e) {
  return en(t, {
    scale: e,
    type: "scale"
  });
}
function Xv(t, e, s) {
  return en(t, {
    tick: s,
    index: e,
    type: "tick"
  });
}
function Jv(t, e, s) {
  let n = hh(t);
  return (s && e !== "right" || !s && e === "right") && (n = Uv(n)), n;
}
function Zv(t, e, s, n) {
  const { top: i, left: a, bottom: o, right: r, chart: l } = t, { chartArea: c, scales: h } = l;
  let u = 0, d, p, f;
  const g = o - i, m = r - a;
  if (t.isHorizontal()) {
    if (p = ce(n, a, r), bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      f = h[_].getPixelForValue(y) + g - e;
    } else s === "center" ? f = (c.bottom + c.top) / 2 + g - e : f = bd(t, s, e);
    d = r - a;
  } else {
    if (bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      p = h[_].getPixelForValue(y) - m + e;
    } else s === "center" ? p = (c.left + c.right) / 2 - m + e : p = bd(t, s, e);
    f = ce(n, o, i), u = s === "left" ? -qt : qt;
  }
  return {
    titleX: p,
    titleY: f,
    maxWidth: d,
    rotation: u
  };
}
class Nn extends Os {
  constructor(e) {
    super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(e) {
    this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
  }
  parse(e, s) {
    return e;
  }
  getUserBounds() {
    let { _userMin: e, _userMax: s, _suggestedMin: n, _suggestedMax: i } = this;
    return e = Le(e, Number.POSITIVE_INFINITY), s = Le(s, Number.NEGATIVE_INFINITY), n = Le(n, Number.POSITIVE_INFINITY), i = Le(i, Number.NEGATIVE_INFINITY), {
      min: Le(e, n),
      max: Le(s, i),
      minDefined: jt(e),
      maxDefined: jt(s)
    };
  }
  getMinMax(e) {
    let { min: s, max: n, minDefined: i, maxDefined: a } = this.getUserBounds(), o;
    if (i && a)
      return {
        min: s,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      o = r[l].controller.getMinMax(this, e), i || (s = Math.min(s, o.min)), a || (n = Math.max(n, o.max));
    return s = a && s > n ? n : s, n = i && s > n ? s : n, {
      min: Le(s, Le(n, s)),
      max: Le(n, Le(s, n))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const e = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
  }
  getLabelItems(e = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(e));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    Rt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(e, s, n) {
    const { beginAtZero: i, grace: a, ticks: o } = this.options, r = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = s, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ox(this, a, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? xd(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = jv(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse, s, n;
    this.isHorizontal() ? (s = this.left, n = this.right) : (s = this.top, n = this.bottom, e = !e), this._startPixel = s, this._endPixel = n, this._reversePixels = e, this._length = n - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Rt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Rt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Rt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(e) {
    this.chart.notifyPlugins(e, this.getContext()), Rt(this.options[e], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    Rt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(e) {
    const s = this.options.ticks;
    let n, i, a;
    for (n = 0, i = e.length; n < i; n++)
      a = e[n], a.label = Rt(s.callback, [
        a.value,
        n,
        e
      ], this);
  }
  afterTickToLabelConversion() {
    Rt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Rt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const e = this.options, s = e.ticks, n = _d(this.ticks.length, e.ticks.maxTicksLimit), i = s.minRotation || 0, a = s.maxRotation;
    let o = i, r, l, c;
    if (!this._isVisible() || !s.display || i >= a || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, d = h.highest.height, p = se(this.chart.width - u, 0, this.maxWidth);
    r = e.offset ? this.maxWidth / n : p / (n - 1), u + 6 > r && (r = p / (n - (e.offset ? 0.5 : 1)), l = this.maxHeight - Ti(e.grid) - s.padding - vd(e.title, this.chart.options.font), c = Math.sqrt(u * u + d * d), o = lh(Math.min(Math.asin(se((h.highest.height + 6) / r, -1, 1)), Math.asin(se(l / c, -1, 1)) - Math.asin(se(d / c, -1, 1)))), o = Math.max(i, Math.min(a, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    Rt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Rt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const e = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: n, title: i, grid: a } } = this, o = this._isVisible(), r = this.isHorizontal();
    if (o) {
      const l = vd(i, s.options.font);
      if (r ? (e.width = this.maxWidth, e.height = Ti(a) + l) : (e.height = this.maxHeight, e.width = Ti(a) + l), n.display && this.ticks.length) {
        const { first: c, last: h, widest: u, highest: d } = this._getLabelSizes(), p = n.padding * 2, f = ze(this.labelRotation), g = Math.cos(f), m = Math.sin(f);
        if (r) {
          const _ = n.mirror ? 0 : m * u.width + g * d.height;
          e.height = Math.min(this.maxHeight, e.height + _ + p);
        } else {
          const _ = n.mirror ? 0 : g * u.width + m * d.height;
          e.width = Math.min(this.maxWidth, e.width + _ + p);
        }
        this._calculatePadding(c, h, m, g);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, s, n, i) {
    const { ticks: { align: a, padding: o }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let d = 0, p = 0;
      l ? c ? (d = i * e.width, p = n * s.height) : (d = n * e.height, p = i * s.width) : a === "start" ? p = s.width : a === "end" ? d = e.width : a !== "inner" && (d = e.width / 2, p = s.width / 2), this.paddingLeft = Math.max((d - h + o) * this.width / (this.width - h), 0), this.paddingRight = Math.max((p - u + o) * this.width / (this.width - u), 0);
    } else {
      let h = s.height / 2, u = e.height / 2;
      a === "start" ? (h = 0, u = e.height) : a === "end" && (h = s.height, u = 0), this.paddingTop = h + o, this.paddingBottom = u + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Rt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: e, position: s } = this.options;
    return s === "top" || s === "bottom" || e === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(e) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(e);
    let s, n;
    for (s = 0, n = e.length; s < n; s++)
      mt(e[s].label) && (e.splice(s, 1), n--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const s = this.options.ticks.sampleSize;
      let n = this.ticks;
      s < n.length && (n = xd(n, s)), this._labelSizes = e = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, s, n) {
    const { ctx: i, _longestTextCache: a } = this, o = [], r = [], l = Math.floor(s / _d(s, n));
    let c = 0, h = 0, u, d, p, f, g, m, _, y, b, x, v;
    for (u = 0; u < s; u += l) {
      if (f = e[u].label, g = this._resolveTickFontOptions(u), i.font = m = g.string, _ = a[m] = a[m] || {
        data: {},
        gc: []
      }, y = g.lineHeight, b = x = 0, !mt(f) && !Ft(f))
        b = lr(i, _.data, _.gc, b, f), x = y;
      else if (Ft(f))
        for (d = 0, p = f.length; d < p; ++d)
          v = f[d], !mt(v) && !Ft(v) && (b = lr(i, _.data, _.gc, b, v), x += y);
      o.push(b), r.push(x), c = Math.max(b, c), h = Math.max(x, h);
    }
    Yv(a, s);
    const k = o.indexOf(c), S = r.indexOf(h), C = (D) => ({
      width: o[D] || 0,
      height: r[D] || 0
    });
    return {
      first: C(0),
      last: C(s - 1),
      widest: C(k),
      highest: C(S),
      widths: o,
      heights: r
    };
  }
  getLabelForValue(e) {
    return e;
  }
  getPixelForValue(e, s) {
    return NaN;
  }
  getValueForPixel(e) {
  }
  getPixelForTick(e) {
    const s = this.ticks;
    return e < 0 || e > s.length - 1 ? null : this.getPixelForValue(s[e].value);
  }
  getPixelForDecimal(e) {
    this._reversePixels && (e = 1 - e);
    const s = this._startPixel + e * this._length;
    return F_(this._alignToPixels ? ln(this.chart, s, 0) : s);
  }
  getDecimalForPixel(e) {
    const s = (e - this._startPixel) / this._length;
    return this._reversePixels ? 1 - s : s;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: e, max: s } = this;
    return e < 0 && s < 0 ? s : e > 0 && s > 0 ? e : 0;
  }
  getContext(e) {
    const s = this.ticks || [];
    if (e >= 0 && e < s.length) {
      const n = s[e];
      return n.$context || (n.$context = Xv(this.getContext(), e, n));
    }
    return this.$context || (this.$context = Kv(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, s = ze(this.labelRotation), n = Math.abs(Math.cos(s)), i = Math.abs(Math.sin(s)), a = this._getLabelSizes(), o = e.autoSkipPadding || 0, r = a ? a.widest.width + o : 0, l = a ? a.highest.height + o : 0;
    return this.isHorizontal() ? l * n > r * i ? r / n : l / i : l * i < r * n ? l / n : r / i;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const s = this.axis, n = this.chart, i = this.options, { grid: a, position: o, border: r } = i, l = a.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), d = Ti(a), p = [], f = r.setContext(this.getContext()), g = f.display ? f.width : 0, m = g / 2, _ = function(M) {
      return ln(n, M, g);
    };
    let y, b, x, v, k, S, C, D, O, I, w, E;
    if (o === "top")
      y = _(this.bottom), S = this.bottom - d, D = y - m, I = _(e.top) + m, E = e.bottom;
    else if (o === "bottom")
      y = _(this.top), I = e.top, E = _(e.bottom) - m, S = y + m, D = this.top + d;
    else if (o === "left")
      y = _(this.right), k = this.right - d, C = y - m, O = _(e.left) + m, w = e.right;
    else if (o === "right")
      y = _(this.left), O = e.left, w = _(e.right) - m, k = y + m, C = this.left + d;
    else if (s === "x") {
      if (o === "center")
        y = _((e.top + e.bottom) / 2 + 0.5);
      else if (bt(o)) {
        const M = Object.keys(o)[0], T = o[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      I = e.top, E = e.bottom, S = y + m, D = S + d;
    } else if (s === "y") {
      if (o === "center")
        y = _((e.left + e.right) / 2);
      else if (bt(o)) {
        const M = Object.keys(o)[0], T = o[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      k = y - m, C = k - d, O = e.left, w = e.right;
    }
    const L = ut(i.ticks.maxTicksLimit, u), P = Math.max(1, Math.ceil(u / L));
    for (b = 0; b < u; b += P) {
      const M = this.getContext(b), T = a.setContext(M), F = r.setContext(M), H = T.lineWidth, Y = T.color, Z = F.dash || [], nt = F.dashOffset, dt = T.tickWidth, lt = T.tickColor, pt = T.tickBorderDash || [], _t = T.tickBorderDashOffset;
      x = qv(this, b, l), x !== void 0 && (v = ln(n, x, H), c ? k = C = O = w = v : S = D = I = E = v, p.push({
        tx1: k,
        ty1: S,
        tx2: C,
        ty2: D,
        x1: O,
        y1: I,
        x2: w,
        y2: E,
        width: H,
        color: Y,
        borderDash: Z,
        borderDashOffset: nt,
        tickWidth: dt,
        tickColor: lt,
        tickBorderDash: pt,
        tickBorderDashOffset: _t
      }));
    }
    return this._ticksLength = u, this._borderValue = y, p;
  }
  _computeLabelItems(e) {
    const s = this.axis, n = this.options, { position: i, ticks: a } = n, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: h, mirror: u } = a, d = Ti(n.grid), p = d + h, f = u ? -h : p, g = -ze(this.labelRotation), m = [];
    let _, y, b, x, v, k, S, C, D, O, I, w, E = "middle";
    if (i === "top")
      k = this.bottom - f, S = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      k = this.top + f, S = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const P = this._getYAxisLabelAlignment(d);
      S = P.textAlign, v = P.x;
    } else if (i === "right") {
      const P = this._getYAxisLabelAlignment(d);
      S = P.textAlign, v = P.x;
    } else if (s === "x") {
      if (i === "center")
        k = (e.top + e.bottom) / 2 + p;
      else if (bt(i)) {
        const P = Object.keys(i)[0], M = i[P];
        k = this.chart.scales[P].getPixelForValue(M) + p;
      }
      S = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (i === "center")
        v = (e.left + e.right) / 2 - p;
      else if (bt(i)) {
        const P = Object.keys(i)[0], M = i[P];
        v = this.chart.scales[P].getPixelForValue(M);
      }
      S = this._getYAxisLabelAlignment(d).textAlign;
    }
    s === "y" && (l === "start" ? E = "top" : l === "end" && (E = "bottom"));
    const L = this._getLabelSizes();
    for (_ = 0, y = r.length; _ < y; ++_) {
      b = r[_], x = b.label;
      const P = a.setContext(this.getContext(_));
      C = this.getPixelForTick(_) + a.labelOffset, D = this._resolveTickFontOptions(_), O = D.lineHeight, I = Ft(x) ? x.length : 1;
      const M = I / 2, T = P.color, F = P.textStrokeColor, H = P.textStrokeWidth;
      let Y = S;
      o ? (v = C, S === "inner" && (_ === y - 1 ? Y = this.options.reverse ? "left" : "right" : _ === 0 ? Y = this.options.reverse ? "right" : "left" : Y = "center"), i === "top" ? c === "near" || g !== 0 ? w = -I * O + O / 2 : c === "center" ? w = -L.highest.height / 2 - M * O + O : w = -L.highest.height + O / 2 : c === "near" || g !== 0 ? w = O / 2 : c === "center" ? w = L.highest.height / 2 - M * O : w = L.highest.height - I * O, u && (w *= -1), g !== 0 && !P.showLabelBackdrop && (v += O / 2 * Math.sin(g))) : (k = C, w = (1 - I) * O / 2);
      let Z;
      if (P.showLabelBackdrop) {
        const nt = me(P.backdropPadding), dt = L.heights[_], lt = L.widths[_];
        let pt = w - nt.top, _t = 0 - nt.left;
        switch (E) {
          case "middle":
            pt -= dt / 2;
            break;
          case "bottom":
            pt -= dt;
            break;
        }
        switch (S) {
          case "center":
            _t -= lt / 2;
            break;
          case "right":
            _t -= lt;
            break;
          case "inner":
            _ === y - 1 ? _t -= lt : _ > 0 && (_t -= lt / 2);
            break;
        }
        Z = {
          left: _t,
          top: pt,
          width: lt + nt.width,
          height: dt + nt.height,
          color: P.backdropColor
        };
      }
      m.push({
        label: x,
        font: D,
        textOffset: w,
        options: {
          rotation: g,
          color: T,
          strokeColor: F,
          strokeWidth: H,
          textAlign: Y,
          textBaseline: E,
          translation: [
            v,
            k
          ],
          backdrop: Z
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: s } = this.options;
    if (-ze(this.labelRotation))
      return e === "top" ? "left" : "right";
    let i = "center";
    return s.align === "start" ? i = "left" : s.align === "end" ? i = "right" : s.align === "inner" && (i = "inner"), i;
  }
  _getYAxisLabelAlignment(e) {
    const { position: s, ticks: { crossAlign: n, mirror: i, padding: a } } = this.options, o = this._getLabelSizes(), r = e + a, l = o.widest.width;
    let c, h;
    return s === "left" ? i ? (h = this.right + a, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : s === "right" ? i ? (h = this.left + a, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const e = this.chart, s = this.options.position;
    if (s === "left" || s === "right")
      return {
        top: 0,
        left: this.left,
        bottom: e.height,
        right: this.right
      };
    if (s === "top" || s === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: e.width
      };
  }
  drawBackground() {
    const { ctx: e, options: { backgroundColor: s }, left: n, top: i, width: a, height: o } = this;
    s && (e.save(), e.fillStyle = s, e.fillRect(n, i, a, o), e.restore());
  }
  getLineWidthForValue(e) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const i = this.ticks.findIndex((a) => a.value === e);
    return i >= 0 ? s.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(e) {
    const s = this.options.grid, n = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let a, o;
    const r = (l, c, h) => {
      !h.width || !h.color || (n.save(), n.lineWidth = h.width, n.strokeStyle = h.color, n.setLineDash(h.borderDash || []), n.lineDashOffset = h.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (s.display)
      for (a = 0, o = i.length; a < o; ++a) {
        const l = i[a];
        s.drawOnChartArea && r({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), s.drawTicks && r({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: e, ctx: s, options: { border: n, grid: i } } = this, a = n.setContext(this.getContext()), o = n.display ? a.width : 0;
    if (!o)
      return;
    const r = i.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, u, d;
    this.isHorizontal() ? (c = ln(e, this.left, o) - o / 2, h = ln(e, this.right, r) + r / 2, u = d = l) : (u = ln(e, this.top, o) - o / 2, d = ln(e, this.bottom, r) + r / 2, c = h = l), s.save(), s.lineWidth = a.width, s.strokeStyle = a.color, s.beginPath(), s.moveTo(c, u), s.lineTo(h, d), s.stroke(), s.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, i = this._computeLabelArea();
    i && Ir(n, i);
    const a = this.getLabelItems(e);
    for (const o of a) {
      const r = o.options, l = o.font, c = o.label, h = o.textOffset;
      On(n, c, 0, h, l, r);
    }
    i && Nr(n);
  }
  drawTitle() {
    const { ctx: e, options: { position: s, title: n, reverse: i } } = this;
    if (!n.display)
      return;
    const a = Zt(n.font), o = me(n.padding), r = n.align;
    let l = a.lineHeight / 2;
    s === "bottom" || s === "center" || bt(s) ? (l += o.bottom, Ft(n.text) && (l += a.lineHeight * (n.text.length - 1))) : l += o.top;
    const { titleX: c, titleY: h, maxWidth: u, rotation: d } = Zv(this, l, s, r);
    On(e, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: u,
      rotation: d,
      textAlign: Jv(r, s, i),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(e) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
  }
  _layers() {
    const e = this.options, s = e.ticks && e.ticks.z || 0, n = ut(e.grid && e.grid.z, -1), i = ut(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== Nn.prototype.draw ? [
      {
        z: s,
        draw: (a) => {
          this.draw(a);
        }
      }
    ] : [
      {
        z: n,
        draw: (a) => {
          this.drawBackground(), this.drawGrid(a), this.drawTitle();
        }
      },
      {
        z: i,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: s,
        draw: (a) => {
          this.drawLabels(a);
        }
      }
    ];
  }
  getMatchingVisibleMetas(e) {
    const s = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", i = [];
    let a, o;
    for (a = 0, o = s.length; a < o; ++a) {
      const r = s[a];
      r[n] === this.id && (!e || r.type === e) && i.push(r);
    }
    return i;
  }
  _resolveTickFontOptions(e) {
    const s = this.options.ticks.setContext(this.getContext(e));
    return Zt(s.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class ro {
  constructor(e, s, n) {
    this.type = e, this.scope = s, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const s = Object.getPrototypeOf(e);
    let n;
    eS(s) && (n = this.register(s));
    const i = this.items, a = e.id, o = this.scope + "." + a;
    if (!a)
      throw new Error("class does not have id: " + e);
    return a in i || (i[a] = e, Qv(e, o, n), this.override && Nt.override(e.id, e.overrides)), o;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const s = this.items, n = e.id, i = this.scope;
    n in s && delete s[n], i && n in Nt[i] && (delete Nt[i][n], this.override && delete Ln[n]);
  }
}
function Qv(t, e, s) {
  const n = ma(/* @__PURE__ */ Object.create(null), [
    s ? Nt.get(s) : {},
    Nt.get(e),
    t.defaults
  ]);
  Nt.set(e, n), t.defaultRoutes && tS(e, t.defaultRoutes), t.descriptors && Nt.describe(e, t.descriptors);
}
function tS(t, e) {
  Object.keys(e).forEach((s) => {
    const n = s.split("."), i = n.pop(), a = [
      t
    ].concat(n).join("."), o = e[s].split("."), r = o.pop(), l = o.join(".");
    Nt.route(a, i, l, r);
  });
}
function eS(t) {
  return "id" in t && "defaults" in t;
}
class sS {
  constructor() {
    this.controllers = new ro(Ye, "datasets", !0), this.elements = new ro(Os, "elements"), this.plugins = new ro(Object, "plugins"), this.scales = new ro(Nn, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...e) {
    this._each("register", e);
  }
  remove(...e) {
    this._each("unregister", e);
  }
  addControllers(...e) {
    this._each("register", e, this.controllers);
  }
  addElements(...e) {
    this._each("register", e, this.elements);
  }
  addPlugins(...e) {
    this._each("register", e, this.plugins);
  }
  addScales(...e) {
    this._each("register", e, this.scales);
  }
  getController(e) {
    return this._get(e, this.controllers, "controller");
  }
  getElement(e) {
    return this._get(e, this.elements, "element");
  }
  getPlugin(e) {
    return this._get(e, this.plugins, "plugin");
  }
  getScale(e) {
    return this._get(e, this.scales, "scale");
  }
  removeControllers(...e) {
    this._each("unregister", e, this.controllers);
  }
  removeElements(...e) {
    this._each("unregister", e, this.elements);
  }
  removePlugins(...e) {
    this._each("unregister", e, this.plugins);
  }
  removeScales(...e) {
    this._each("unregister", e, this.scales);
  }
  _each(e, s, n) {
    [
      ...s
    ].forEach((i) => {
      const a = n || this._getRegistryForType(i);
      n || a.isForType(i) || a === this.plugins && i.id ? this._exec(e, a, i) : At(i, (o) => {
        const r = n || this._getRegistryForType(o);
        this._exec(e, r, o);
      });
    });
  }
  _exec(e, s, n) {
    const i = rh(e);
    Rt(n["before" + i], [], n), s[e](n), Rt(n["after" + i], [], n);
  }
  _getRegistryForType(e) {
    for (let s = 0; s < this._typedRegistries.length; s++) {
      const n = this._typedRegistries[s];
      if (n.isForType(e))
        return n;
    }
    return this.plugins;
  }
  _get(e, s, n) {
    const i = s.get(e);
    if (i === void 0)
      throw new Error('"' + e + '" is not a registered ' + n + ".");
    return i;
  }
}
var ts = /* @__PURE__ */ new sS();
class nS {
  constructor() {
    this._init = void 0;
  }
  notify(e, s, n, i) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install")), this._init === void 0)
      return;
    const a = i ? this._descriptors(e).filter(i) : this._descriptors(e), o = this._notify(a, e, s, n);
    return s === "afterDestroy" && (this._notify(a, e, "stop"), this._notify(this._init, e, "uninstall"), this._init = void 0), o;
  }
  _notify(e, s, n, i) {
    i = i || {};
    for (const a of e) {
      const o = a.plugin, r = o[n], l = [
        s,
        i,
        a.options
      ];
      if (Rt(r, l, o) === !1 && i.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    mt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(e) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(e);
    return this._notifyStateChanges(e), s;
  }
  _createDescriptors(e, s) {
    const n = e && e.config, i = ut(n.options && n.options.plugins, {}), a = iS(n);
    return i === !1 && !s ? [] : oS(e, a, i, s);
  }
  _notifyStateChanges(e) {
    const s = this._oldCache || [], n = this._cache, i = (a, o) => a.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(i(s, n), e, "stop"), this._notify(i(n, s), e, "start");
  }
}
function iS(t) {
  const e = {}, s = [], n = Object.keys(ts.plugins.items);
  for (let a = 0; a < n.length; a++)
    s.push(ts.getPlugin(n[a]));
  const i = t.plugins || [];
  for (let a = 0; a < i.length; a++) {
    const o = i[a];
    s.indexOf(o) === -1 && (s.push(o), e[o.id] = !0);
  }
  return {
    plugins: s,
    localIds: e
  };
}
function aS(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function oS(t, { plugins: e, localIds: s }, n, i) {
  const a = [], o = t.getContext();
  for (const r of e) {
    const l = r.id, c = aS(n[l], i);
    c !== null && a.push({
      plugin: r,
      options: rS(t.config, {
        plugin: r,
        local: s[l]
      }, c, o)
    });
  }
  return a;
}
function rS(t, { plugin: e, local: s }, n, i) {
  const a = t.pluginScopeKeys(e), o = t.getOptionScopes(n, a);
  return s && e.defaults && o.push(e.defaults), t.createResolver(o, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function sc(t, e) {
  const s = Nt.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || s.indexAxis || "x";
}
function lS(t, e) {
  let s = t;
  return t === "_index_" ? s = e : t === "_value_" && (s = e === "x" ? "y" : "x"), s;
}
function cS(t, e) {
  return t === e ? "_index_" : "_value_";
}
function Sd(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function hS(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function nc(t, ...e) {
  if (Sd(t))
    return t;
  for (const s of e) {
    const n = s.axis || hS(s.position) || t.length > 1 && Sd(t[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function wd(t, e, s) {
  if (s[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function uS(t, e) {
  if (e.data && e.data.datasets) {
    const s = e.data.datasets.filter((n) => n.xAxisID === t || n.yAxisID === t);
    if (s.length)
      return wd(t, "x", s[0]) || wd(t, "y", s[0]);
  }
  return {};
}
function dS(t, e) {
  const s = Ln[t.type] || {
    scales: {}
  }, n = e.scales || {}, i = sc(t.type, e), a = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((o) => {
    const r = n[o];
    if (!bt(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = nc(o, r, uS(o, t), Nt.scales[r.type]), c = cS(l, i), h = s.scales || {};
    a[o] = Xi(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      h[l],
      h[c]
    ]);
  }), t.data.datasets.forEach((o) => {
    const r = o.type || t.type, l = o.indexAxis || sc(r, e), h = (Ln[r] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const d = lS(u, l), p = o[d + "AxisID"] || d;
      a[p] = a[p] || /* @__PURE__ */ Object.create(null), Xi(a[p], [
        {
          axis: d
        },
        n[p],
        h[u]
      ]);
    });
  }), Object.keys(a).forEach((o) => {
    const r = a[o];
    Xi(r, [
      Nt.scales[r.type],
      Nt.scale
    ]);
  }), a;
}
function Sm(t) {
  const e = t.options || (t.options = {});
  e.plugins = ut(e.plugins, {}), e.scales = dS(t, e);
}
function wm(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function fS(t) {
  return t = t || {}, t.data = wm(t.data), Sm(t), t;
}
const Cd = /* @__PURE__ */ new Map(), Cm = /* @__PURE__ */ new Set();
function lo(t, e) {
  let s = Cd.get(t);
  return s || (s = e(), Cd.set(t, s), Cm.add(s)), s;
}
const Di = (t, e, s) => {
  const n = Qs(e, s);
  n !== void 0 && t.add(n);
};
class pS {
  constructor(e) {
    this._config = fS(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(e) {
    this._config.type = e;
  }
  get data() {
    return this._config.data;
  }
  set data(e) {
    this._config.data = wm(e);
  }
  get options() {
    return this._config.options;
  }
  set options(e) {
    this._config.options = e;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const e = this._config;
    this.clearCache(), Sm(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return lo(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, s) {
    return lo(`${e}.transition.${s}`, () => [
      [
        `datasets.${e}.transitions.${s}`,
        `transitions.${s}`
      ],
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(e, s) {
    return lo(`${e}-${s}`, () => [
      [
        `datasets.${e}.elements.${s}`,
        `datasets.${e}`,
        `elements.${s}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(e) {
    const s = e.id, n = this.type;
    return lo(`${n}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...e.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(e, s) {
    const n = this._scopeCache;
    let i = n.get(e);
    return (!i || s) && (i = /* @__PURE__ */ new Map(), n.set(e, i)), i;
  }
  getOptionScopes(e, s, n) {
    const { options: i, type: a } = this, o = this._cachedScopes(e, n), r = o.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((h) => {
      e && (l.add(e), h.forEach((u) => Di(l, e, u))), h.forEach((u) => Di(l, i, u)), h.forEach((u) => Di(l, Ln[a] || {}, u)), h.forEach((u) => Di(l, Nt, u)), h.forEach((u) => Di(l, Ql, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Cm.has(s) && o.set(s, c), c;
  }
  chartOptionScopes() {
    const { options: e, type: s } = this;
    return [
      e,
      Ln[s] || {},
      Nt.datasets[s] || {},
      {
        type: s
      },
      Nt,
      Ql
    ];
  }
  resolveNamedOptions(e, s, n, i = [
    ""
  ]) {
    const a = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = kd(this._resolverCache, e, i);
    let l = o;
    if (mS(o, s)) {
      a.$shared = !1, n = tn(n) ? n() : n;
      const c = this.createResolver(e, n, r);
      l = pi(o, n, c);
    }
    for (const c of s)
      a[c] = l[c];
    return a;
  }
  createResolver(e, s, n = [
    ""
  ], i) {
    const { resolver: a } = kd(this._resolverCache, e, n);
    return bt(s) ? pi(a, s, void 0, i) : a;
  }
}
function kd(t, e, s) {
  let n = t.get(e);
  n || (n = /* @__PURE__ */ new Map(), t.set(e, n));
  const i = s.join();
  let a = n.get(i);
  return a || (a = {
    resolver: fh(e, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(i, a)), a;
}
const gS = (t) => bt(t) && Object.getOwnPropertyNames(t).some((e) => tn(t[e]));
function mS(t, e) {
  const { isScriptable: s, isIndexable: n } = sm(t);
  for (const i of e) {
    const a = s(i), o = n(i), r = (o || a) && t[i];
    if (a && (tn(r) || gS(r)) || o && Ft(r))
      return !0;
  }
  return !1;
}
var yS = "4.5.1";
const bS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Md(t, e) {
  return t === "top" || t === "bottom" || bS.indexOf(t) === -1 && e === "x";
}
function Ad(t, e) {
  return function(s, n) {
    return s[t] === n[t] ? s[e] - n[e] : s[t] - n[t];
  };
}
function Pd(t) {
  const e = t.chart, s = e.options.animation;
  e.notifyPlugins("afterRender"), Rt(s && s.onComplete, [
    t
  ], e);
}
function _S(t) {
  const e = t.chart, s = e.options.animation;
  Rt(s && s.onProgress, [
    t
  ], e);
}
function km(t) {
  return mh() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const To = {}, Td = (t) => {
  const e = km(t);
  return Object.values(To).filter((s) => s.canvas === e).pop();
};
function xS(t, e, s) {
  const n = Object.keys(t);
  for (const i of n) {
    const a = +i;
    if (a >= e) {
      const o = t[i];
      delete t[i], (s > 0 || a > e) && (t[a + s] = o);
    }
  }
}
function vS(t, e, s, n) {
  return !s || t.type === "mouseout" ? null : n ? e : t;
}
var Ns;
let ur = (Ns = class {
  static register(...e) {
    ts.add(...e), Dd();
  }
  static unregister(...e) {
    ts.remove(...e), Dd();
  }
  constructor(e, s) {
    const n = this.config = new pS(s), i = km(e), a = Td(i);
    if (a)
      throw new Error("Canvas is already in use. Chart with ID '" + a.id + "' must be destroyed before the canvas with ID '" + a.canvas.id + "' can be reused.");
    const o = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || $v(i))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(i, o.aspectRatio), l = r && r.canvas, c = l && l.height, h = l && l.width;
    if (this.id = S_(), this.ctx = r, this.canvas = l, this.width = h, this.height = c, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new nS(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = $_((u) => this.update(u), o.resizeDelay || 0), this._dataChanges = [], To[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    us.listen(this, "complete", Pd), us.listen(this, "progress", _S), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: s }, width: n, height: i, _aspectRatio: a } = this;
    return mt(e) ? s && a ? a : i ? n / i : null : e;
  }
  get data() {
    return this.config.data;
  }
  set data(e) {
    this.config.data = e;
  }
  get options() {
    return this._options;
  }
  set options(e) {
    this.config.options = e;
  }
  get registry() {
    return ts;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Zu(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ku(this.canvas, this.ctx), this;
  }
  stop() {
    return us.stop(this), this;
  }
  resize(e, s) {
    us.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: s
    } : this._resize(e, s);
  }
  _resize(e, s) {
    const n = this.options, i = this.canvas, a = n.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(i, e, s, a), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Zu(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), Rt(n.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    At(s, (n, i) => {
      n.id = i;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, s = e.scales, n = this.scales, i = Object.keys(n).reduce((o, r) => (o[r] = !1, o), {});
    let a = [];
    s && (a = a.concat(Object.keys(s).map((o) => {
      const r = s[o], l = nc(o, r), c = l === "r", h = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), At(a, (o) => {
      const r = o.options, l = r.id, c = nc(l, r), h = ut(r.type, o.dtype);
      (r.position === void 0 || Md(r.position, c) !== Md(o.dposition)) && (r.position = o.dposition), i[l] = !0;
      let u = null;
      if (l in n && n[l].type === h)
        u = n[l];
      else {
        const d = ts.getScale(h);
        u = new d({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), n[u.id] = u;
      }
      u.init(r, e);
    }), At(i, (o, r) => {
      o || delete n[r];
    }), At(n, (o) => {
      pe.configure(this, o, o.options), pe.addBox(this, o);
    });
  }
  _updateMetasets() {
    const e = this._metasets, s = this.data.datasets.length, n = e.length;
    if (e.sort((i, a) => i.index - a.index), n > s) {
      for (let i = s; i < n; ++i)
        this._destroyDatasetMeta(i);
      e.splice(s, n - s);
    }
    this._sortedMetasets = e.slice(0).sort(Ad("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: s } } = this;
    e.length > s.length && delete this._stacks, e.forEach((n, i) => {
      s.filter((a) => a === n._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const e = [], s = this.data.datasets;
    let n, i;
    for (this._removeUnreferencedMetasets(), n = 0, i = s.length; n < i; n++) {
      const a = s[n];
      let o = this.getDatasetMeta(n);
      const r = a.type || this.config.type;
      if (o.type && o.type !== r && (this._destroyDatasetMeta(n), o = this.getDatasetMeta(n)), o.type = r, o.indexAxis = a.indexAxis || sc(r, this.options), o.order = a.order || 0, o.index = n, o.label = "" + a.label, o.visible = this.isDatasetVisible(n), o.controller)
        o.controller.updateIndex(n), o.controller.linkScales();
      else {
        const l = ts.getController(r), { datasetElementType: c, dataElementType: h } = Nt.datasets[r];
        Object.assign(l, {
          dataElementType: ts.getElement(h),
          datasetElementType: c && ts.getElement(c)
        }), o.controller = new l(this, n), e.push(o.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    At(this.data.datasets, (e, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(e) {
    const s = this.config;
    s.update();
    const n = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), i = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: e,
      cancelable: !0
    }) === !1)
      return;
    const a = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: u } = this.getDatasetMeta(c), d = !i && a.indexOf(u) === -1;
      u.buildOrUpdateElements(d), o = Math.max(+u.getMaxOverflow(), o);
    }
    o = this._minPadding = n.layout.autoPadding ? o : 0, this._updateLayout(o), i || At(a, (c) => {
      c.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(Ad("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    At(this.scales, (e) => {
      pe.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, s = new Set(Object.keys(this._listeners)), n = new Set(e.events);
    (!ju(s, n) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: i, count: a } of s) {
      const o = n === "_removeElements" ? -a : a;
      xS(e, i, o);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (a) => new Set(e.filter((o) => o[0] === a).map((o, r) => r + "," + o.splice(1).join(","))), i = n(0);
    for (let a = 1; a < s; a++)
      if (!ju(i, n(a)))
        return;
    return Array.from(i).map((a) => a.split(",")).map((a) => ({
      method: a[1],
      start: +a[2],
      count: +a[3]
    }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    pe.update(this, this.width, this.height, e);
    const s = this.chartArea, n = s.width <= 0 || s.height <= 0;
    this._layers = [], At(this.boxes, (i) => {
      n && i.position === "chartArea" || (i.configure && i.configure(), this._layers.push(...i._layers()));
    }, this), this._layers.forEach((i, a) => {
      i._idx = a;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(e) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: e,
      cancelable: !0
    }) !== !1) {
      for (let s = 0, n = this.data.datasets.length; s < n; ++s)
        this.getDatasetMeta(s).controller.configure();
      for (let s = 0, n = this.data.datasets.length; s < n; ++s)
        this._updateDataset(s, tn(e) ? e({
          datasetIndex: s
        }) : e);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: e
      });
    }
  }
  _updateDataset(e, s) {
    const n = this.getDatasetMeta(e), i = {
      meta: n,
      index: e,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", i) !== !1 && (n.controller._update(s), i.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", i));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (us.has(this) ? this.attached && !us.running(this) && us.start(this) : (this.draw(), Pd({
      chart: this
    })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: n, height: i } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, i);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const s = this._layers;
    for (e = 0; e < s.length && s[e].z <= 0; ++e)
      s[e].draw(this.chartArea);
    for (this._drawDatasets(); e < s.length; ++e)
      s[e].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(e) {
    const s = this._sortedMetasets, n = [];
    let i, a;
    for (i = 0, a = s.length; i < a; ++i) {
      const o = s[i];
      (!e || o.visible) && n.push(o);
    }
    return n;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this.getSortedVisibleDatasetMetas();
    for (let s = e.length - 1; s >= 0; --s)
      this._drawDataset(e[s]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(e) {
    const s = this.ctx, n = {
      meta: e,
      index: e.index,
      cancelable: !0
    }, i = fm(this, e);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (i && Ir(s, i), e.controller.draw(), i && Nr(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(e) {
    return Ss(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, s, n, i) {
    const a = bv.modes[s];
    return typeof a == "function" ? a(this, e, n, i) : [];
  }
  getDatasetMeta(e) {
    const s = this.data.datasets[e], n = this._metasets;
    let i = n.filter((a) => a && a._dataset === s).pop();
    return i || (i = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: s && s.order || 0,
      index: e,
      _dataset: s,
      _parsed: [],
      _sorted: !1
    }, n.push(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = en(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(e) {
    const s = this.data.datasets[e];
    if (!s)
      return !1;
    const n = this.getDatasetMeta(e);
    return typeof n.hidden == "boolean" ? !n.hidden : !s.hidden;
  }
  setDatasetVisibility(e, s) {
    const n = this.getDatasetMeta(e);
    n.hidden = !s;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, s, n) {
    const i = n ? "show" : "hide", a = this.getDatasetMeta(e), o = a.controller._resolveAnimations(void 0, i);
    ya(s) ? (a.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(e, n), o.update(a, {
      visible: n
    }), this.update((r) => r.datasetIndex === e ? i : void 0));
  }
  hide(e, s) {
    this._updateVisibility(e, s, !1);
  }
  show(e, s) {
    this._updateVisibility(e, s, !0);
  }
  _destroyDatasetMeta(e) {
    const s = this._metasets[e];
    s && s.controller && s.controller._destroy(), delete this._metasets[e];
  }
  _stop() {
    let e, s;
    for (this.stop(), us.remove(this), e = 0, s = this.data.datasets.length; e < s; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: s } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Ku(e, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete To[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, s = this.platform, n = (a, o) => {
      s.addEventListener(this, a, o), e[a] = o;
    }, i = (a, o, r) => {
      a.offsetX = o, a.offsetY = r, this._eventHandler(a);
    };
    At(this.options.events, (a) => n(a, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, s = this.platform, n = (l, c) => {
      s.addEventListener(this, l, c), e[l] = c;
    }, i = (l, c) => {
      e[l] && (s.removeEventListener(this, l, c), delete e[l]);
    }, a = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let o;
    const r = () => {
      i("attach", r), this.attached = !0, this.resize(), n("resize", a), n("detach", o);
    };
    o = () => {
      this.attached = !1, i("resize", a), this._stop(), this._resize(0, 0), n("attach", r);
    }, s.isAttached(this.canvas) ? r() : o();
  }
  unbindEvents() {
    At(this._listeners, (e, s) => {
      this.platform.removeEventListener(this, s, e);
    }), this._listeners = {}, At(this._responsiveListeners, (e, s) => {
      this.platform.removeEventListener(this, s, e);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(e, s, n) {
    const i = n ? "set" : "remove";
    let a, o, r, l;
    for (s === "dataset" && (a = this.getDatasetMeta(e[0].datasetIndex), a.controller["_" + i + "DatasetHoverStyle"]()), r = 0, l = e.length; r < l; ++r) {
      o = e[r];
      const c = o && this.getDatasetMeta(o.datasetIndex).controller;
      c && c[i + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const s = this._active || [], n = e.map(({ datasetIndex: a, index: o }) => {
      const r = this.getDatasetMeta(a);
      if (!r)
        throw new Error("No dataset found at index " + a);
      return {
        datasetIndex: a,
        element: r.data[o],
        index: o
      };
    });
    !ar(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
  }
  notifyPlugins(e, s, n) {
    return this._plugins.notify(this, e, s, n);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((s) => s.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, s, n) {
    const i = this.options.hover, a = (l, c) => l.filter((h) => !c.some((u) => h.datasetIndex === u.datasetIndex && h.index === u.index)), o = a(s, e), r = n ? e : a(e, s);
    o.length && this.updateHoverStyle(o, i.mode, !1), r.length && i.mode && this.updateHoverStyle(r, i.mode, !0);
  }
  _eventHandler(e, s) {
    const n = {
      event: e,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, i = (o) => (o.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", n, i) === !1)
      return;
    const a = this._handleEvent(e, s, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, i), (a || n.changed) && this.render(), this;
  }
  _handleEvent(e, s, n) {
    const { _active: i = [], options: a } = this, o = s, r = this._getActiveElements(e, i, n, o), l = P_(e), c = vS(e, this._lastEvent, n, l);
    n && (this._lastEvent = null, Rt(a.onHover, [
      e,
      r,
      this
    ], this), l && Rt(a.onClick, [
      e,
      r,
      this
    ], this));
    const h = !ar(r, i);
    return (h || s) && (this._active = r, this._updateHoverStyles(r, i, s)), this._lastEvent = c, h;
  }
  _getActiveElements(e, s, n, i) {
    if (e.type === "mouseout")
      return [];
    if (!n)
      return s;
    const a = this.options.hover;
    return this.getElementsAtEventForMode(e, a.mode, a, i);
  }
}, Q(Ns, "defaults", Nt), Q(Ns, "instances", To), Q(Ns, "overrides", Ln), Q(Ns, "registry", ts), Q(Ns, "version", yS), Q(Ns, "getChart", Td), Ns);
function Dd() {
  return At(ur.instances, (t) => t._plugins.invalidate());
}
function SS(t, e, s) {
  const { startAngle: n, x: i, y: a, outerRadius: o, innerRadius: r, options: l } = e, { borderWidth: c, borderJoinStyle: h } = l, u = Math.min(c / o, de(n - s));
  if (t.beginPath(), t.arc(i, a, o - c / 2, n + u / 2, s - u / 2), r > 0) {
    const d = Math.min(c / r, de(n - s));
    t.arc(i, a, r + c / 2, s - d / 2, n + d / 2, !0);
  } else {
    const d = Math.min(c / 2, o * de(n - s));
    if (h === "round")
      t.arc(i, a, d, s - vt / 2, n + vt / 2, !0);
    else if (h === "bevel") {
      const p = 2 * d * d, f = -p * Math.cos(s + vt / 2) + i, g = -p * Math.sin(s + vt / 2) + a, m = p * Math.cos(n + vt / 2) + i, _ = p * Math.sin(n + vt / 2) + a;
      t.lineTo(f, g), t.lineTo(m, _);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function wS(t, e, s) {
  const { startAngle: n, pixelMargin: i, x: a, y: o, outerRadius: r, innerRadius: l } = e;
  let c = i / r;
  t.beginPath(), t.arc(a, o, r, n - c, s + c), l > i ? (c = i / l, t.arc(a, o, l, s + c, n - c, !0)) : t.arc(a, o, i, s + qt, n - qt), t.closePath(), t.clip();
}
function CS(t) {
  return dh(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function kS(t, e, s, n) {
  const i = CS(t.options.borderRadius), a = (s - e) / 2, o = Math.min(a, n * e / 2), r = (l) => {
    const c = (s - Math.min(a, l)) * n / 2;
    return se(l, 0, Math.min(a, c));
  };
  return {
    outerStart: r(i.outerStart),
    outerEnd: r(i.outerEnd),
    innerStart: se(i.innerStart, 0, o),
    innerEnd: se(i.innerEnd, 0, o)
  };
}
function Vn(t, e, s, n) {
  return {
    x: s + t * Math.cos(e),
    y: n + t * Math.sin(e)
  };
}
function dr(t, e, s, n, i, a) {
  const { x: o, y: r, startAngle: l, pixelMargin: c, innerRadius: h } = e, u = Math.max(e.outerRadius + n + s - c, 0), d = h > 0 ? h + n + s + c : 0;
  let p = 0;
  const f = i - l;
  if (n) {
    const P = h > 0 ? h - n : 0, M = u > 0 ? u - n : 0, T = (P + M) / 2, F = T !== 0 ? f * T / (T + n) : f;
    p = (f - F) / 2;
  }
  const g = Math.max(1e-3, f * u - s / vt) / u, m = (f - g) / 2, _ = l + m + p, y = i - m - p, { outerStart: b, outerEnd: x, innerStart: v, innerEnd: k } = kS(e, d, u, y - _), S = u - b, C = u - x, D = _ + b / S, O = y - x / C, I = d + v, w = d + k, E = _ + v / I, L = y - k / w;
  if (t.beginPath(), a) {
    const P = (D + O) / 2;
    if (t.arc(o, r, u, D, P), t.arc(o, r, u, P, O), x > 0) {
      const H = Vn(C, O, o, r);
      t.arc(H.x, H.y, x, O, y + qt);
    }
    const M = Vn(w, y, o, r);
    if (t.lineTo(M.x, M.y), k > 0) {
      const H = Vn(w, L, o, r);
      t.arc(H.x, H.y, k, y + qt, L + Math.PI);
    }
    const T = (y - k / d + (_ + v / d)) / 2;
    if (t.arc(o, r, d, y - k / d, T, !0), t.arc(o, r, d, T, _ + v / d, !0), v > 0) {
      const H = Vn(I, E, o, r);
      t.arc(H.x, H.y, v, E + Math.PI, _ - qt);
    }
    const F = Vn(S, _, o, r);
    if (t.lineTo(F.x, F.y), b > 0) {
      const H = Vn(S, D, o, r);
      t.arc(H.x, H.y, b, _ - qt, D);
    }
  } else {
    t.moveTo(o, r);
    const P = Math.cos(D) * u + o, M = Math.sin(D) * u + r;
    t.lineTo(P, M);
    const T = Math.cos(O) * u + o, F = Math.sin(O) * u + r;
    t.lineTo(T, F);
  }
  t.closePath();
}
function MS(t, e, s, n, i) {
  const { fullCircles: a, startAngle: o, circumference: r } = e;
  let l = e.endAngle;
  if (a) {
    dr(t, e, s, n, l, i);
    for (let c = 0; c < a; ++c)
      t.fill();
    isNaN(r) || (l = o + (r % Et || Et));
  }
  return dr(t, e, s, n, l, i), t.fill(), l;
}
function AS(t, e, s, n, i) {
  const { fullCircles: a, startAngle: o, circumference: r, options: l } = e, { borderWidth: c, borderJoinStyle: h, borderDash: u, borderDashOffset: d, borderRadius: p } = l, f = l.borderAlign === "inner";
  if (!c)
    return;
  t.setLineDash(u || []), t.lineDashOffset = d, f ? (t.lineWidth = c * 2, t.lineJoin = h || "round") : (t.lineWidth = c, t.lineJoin = h || "bevel");
  let g = e.endAngle;
  if (a) {
    dr(t, e, s, n, g, i);
    for (let m = 0; m < a; ++m)
      t.stroke();
    isNaN(r) || (g = o + (r % Et || Et));
  }
  f && wS(t, e, g), l.selfJoin && g - o >= vt && p === 0 && h !== "miter" && SS(t, e, g), a || (dr(t, e, s, n, g, i), t.stroke());
}
class Bi extends Os {
  constructor(s) {
    super();
    Q(this, "circumference");
    Q(this, "endAngle");
    Q(this, "fullCircles");
    Q(this, "innerRadius");
    Q(this, "outerRadius");
    Q(this, "pixelMargin");
    Q(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, s && Object.assign(this, s);
  }
  inRange(s, n, i) {
    const a = this.getProps([
      "x",
      "y"
    ], i), { angle: o, distance: r } = Ug(a, {
      x: s,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: h, outerRadius: u, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], i), p = (this.options.spacing + this.options.borderWidth) / 2, f = ut(d, c - l), g = ba(o, l, c) && l !== c, m = f >= Et || g, _ = xs(r, h + p, u + p);
    return m && _;
  }
  getCenterPoint(s) {
    const { x: n, y: i, startAngle: a, endAngle: o, innerRadius: r, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], s), { offset: c, spacing: h } = this.options, u = (a + o) / 2, d = (r + l + h + c) / 2;
    return {
      x: n + Math.cos(u) * d,
      y: i + Math.sin(u) * d
    };
  }
  tooltipPosition(s) {
    return this.getCenterPoint(s);
  }
  draw(s) {
    const { options: n, circumference: i } = this, a = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, r = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = i > Et ? Math.floor(i / Et) : 0, i === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    s.save();
    const l = (this.startAngle + this.endAngle) / 2;
    s.translate(Math.cos(l) * a, Math.sin(l) * a);
    const c = 1 - Math.sin(Math.min(vt, i || 0)), h = a * c;
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, MS(s, this, h, o, r), AS(s, this, h, o, r), s.restore();
  }
}
Q(Bi, "id", "arc"), Q(Bi, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0,
  selfJoin: !1
}), Q(Bi, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Q(Bi, "descriptors", {
  _scriptable: !0,
  _indexable: (s) => s !== "borderDash"
});
function Mm(t, e, s = e) {
  t.lineCap = ut(s.borderCapStyle, e.borderCapStyle), t.setLineDash(ut(s.borderDash, e.borderDash)), t.lineDashOffset = ut(s.borderDashOffset, e.borderDashOffset), t.lineJoin = ut(s.borderJoinStyle, e.borderJoinStyle), t.lineWidth = ut(s.borderWidth, e.borderWidth), t.strokeStyle = ut(s.borderColor, e.borderColor);
}
function PS(t, e, s) {
  t.lineTo(s.x, s.y);
}
function TS(t) {
  return t.stepped ? J_ : t.tension || t.cubicInterpolationMode === "monotone" ? Z_ : PS;
}
function Am(t, e, s = {}) {
  const n = t.length, { start: i = 0, end: a = n - 1 } = s, { start: o, end: r } = e, l = Math.max(i, o), c = Math.min(a, r), h = i < o && a < o || i > r && a > r;
  return {
    count: n,
    start: l,
    loop: e.loop,
    ilen: c < l && !h ? n + c - l : c - l
  };
}
function DS(t, e, s, n) {
  const { points: i, options: a } = e, { count: o, start: r, loop: l, ilen: c } = Am(i, s, n), h = TS(a);
  let { move: u = !0, reverse: d } = n || {}, p, f, g;
  for (p = 0; p <= c; ++p)
    f = i[(r + (d ? c - p : p)) % o], !f.skip && (u ? (t.moveTo(f.x, f.y), u = !1) : h(t, g, f, d, a.stepped), g = f);
  return l && (f = i[(r + (d ? c : 0)) % o], h(t, g, f, d, a.stepped)), !!l;
}
function RS(t, e, s, n) {
  const i = e.points, { count: a, start: o, ilen: r } = Am(i, s, n), { move: l = !0, reverse: c } = n || {};
  let h = 0, u = 0, d, p, f, g, m, _;
  const y = (x) => (o + (c ? r - x : x)) % a, b = () => {
    g !== m && (t.lineTo(h, m), t.lineTo(h, g), t.lineTo(h, _));
  };
  for (l && (p = i[y(0)], t.moveTo(p.x, p.y)), d = 0; d <= r; ++d) {
    if (p = i[y(d)], p.skip)
      continue;
    const x = p.x, v = p.y, k = x | 0;
    k === f ? (v < g ? g = v : v > m && (m = v), h = (u * h + x) / ++u) : (b(), t.lineTo(x, v), f = k, u = 0, g = m = v), _ = v;
  }
  b();
}
function ic(t) {
  const e = t.options, s = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !s ? RS : DS;
}
function LS(t) {
  return t.stepped ? Dx : t.tension || t.cubicInterpolationMode === "monotone" ? Rx : pn;
}
function OS(t, e, s, n) {
  let i = e._path;
  i || (i = e._path = new Path2D(), e.path(i, s, n) && i.closePath()), Mm(t, e.options), t.stroke(i);
}
function ES(t, e, s, n) {
  const { segments: i, options: a } = e, o = ic(e);
  for (const r of i)
    Mm(t, a, r.style), t.beginPath(), o(t, e, r, {
      start: s,
      end: s + n - 1
    }) && t.closePath(), t.stroke();
}
const FS = typeof Path2D == "function";
function IS(t, e, s, n) {
  FS && !e.options.segment ? OS(t, e, s, n) : ES(t, e, s, n);
}
class Us extends Os {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, s) {
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const i = n.spanGaps ? this._loop : this._fullLoop;
      Sx(this._points, n, e, i, s), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Nx(this, this.options.segment));
  }
  first() {
    const e = this.segments, s = this.points;
    return e.length && s[e[0].start];
  }
  last() {
    const e = this.segments, s = this.points, n = e.length;
    return n && s[e[n - 1].end];
  }
  interpolate(e, s) {
    const n = this.options, i = e[s], a = this.points, o = dm(this, {
      property: s,
      start: i,
      end: i
    });
    if (!o.length)
      return;
    const r = [], l = LS(n);
    let c, h;
    for (c = 0, h = o.length; c < h; ++c) {
      const { start: u, end: d } = o[c], p = a[u], f = a[d];
      if (p === f) {
        r.push(p);
        continue;
      }
      const g = Math.abs((i - p[s]) / (f[s] - p[s])), m = l(p, f, g, n.stepped);
      m[s] = e[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(e, s, n) {
    return ic(this)(e, this, s, n);
  }
  path(e, s, n) {
    const i = this.segments, a = ic(this);
    let o = this._loop;
    s = s || 0, n = n || this.points.length - s;
    for (const r of i)
      o &= a(e, this, r, {
        start: s,
        end: s + n - 1
      });
    return !!o;
  }
  draw(e, s, n, i) {
    const a = this.options || {};
    (this.points || []).length && a.borderWidth && (e.save(), IS(e, this, n, i), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Q(Us, "id", "line"), Q(Us, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), Q(Us, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Q(Us, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function Rd(t, e, s, n) {
  const i = t.options, { [s]: a } = t.getProps([
    s
  ], n);
  return Math.abs(e - a) < i.radius + i.hitRadius;
}
class Do extends Os {
  constructor(s) {
    super();
    Q(this, "parsed");
    Q(this, "skip");
    Q(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, s && Object.assign(this, s);
  }
  inRange(s, n, i) {
    const a = this.options, { x: o, y: r } = this.getProps([
      "x",
      "y"
    ], i);
    return Math.pow(s - o, 2) + Math.pow(n - r, 2) < Math.pow(a.hitRadius + a.radius, 2);
  }
  inXRange(s, n) {
    return Rd(this, s, "x", n);
  }
  inYRange(s, n) {
    return Rd(this, s, "y", n);
  }
  getCenterPoint(s) {
    const { x: n, y: i } = this.getProps([
      "x",
      "y"
    ], s);
    return {
      x: n,
      y: i
    };
  }
  size(s) {
    s = s || this.options || {};
    let n = s.radius || 0;
    n = Math.max(n, n && s.hoverRadius || 0);
    const i = n && s.borderWidth || 0;
    return (n + i) * 2;
  }
  draw(s, n) {
    const i = this.options;
    this.skip || i.radius < 0.1 || !Ss(this, n, this.size(i) / 2) || (s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.fillStyle = i.backgroundColor, tc(s, i, this.x, this.y));
  }
  getRange() {
    const s = this.options || {};
    return s.radius + s.hitRadius;
  }
}
Q(Do, "id", "point"), /**
* @type {any}
*/
Q(Do, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
Q(Do, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Pm(t, e) {
  const { x: s, y: n, base: i, width: a, height: o } = t.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let r, l, c, h, u;
  return t.horizontal ? (u = o / 2, r = Math.min(s, i), l = Math.max(s, i), c = n - u, h = n + u) : (u = a / 2, r = s - u, l = s + u, c = Math.min(n, i), h = Math.max(n, i)), {
    left: r,
    top: c,
    right: l,
    bottom: h
  };
}
function qs(t, e, s, n) {
  return t ? 0 : se(e, s, n);
}
function NS(t, e, s) {
  const n = t.options.borderWidth, i = t.borderSkipped, a = em(n);
  return {
    t: qs(i.top, a.top, 0, s),
    r: qs(i.right, a.right, 0, e),
    b: qs(i.bottom, a.bottom, 0, s),
    l: qs(i.left, a.left, 0, e)
  };
}
function BS(t, e, s) {
  const { enableBorderRadius: n } = t.getProps([
    "enableBorderRadius"
  ]), i = t.options.borderRadius, a = Cn(i), o = Math.min(e, s), r = t.borderSkipped, l = n || bt(i);
  return {
    topLeft: qs(!l || r.top || r.left, a.topLeft, 0, o),
    topRight: qs(!l || r.top || r.right, a.topRight, 0, o),
    bottomLeft: qs(!l || r.bottom || r.left, a.bottomLeft, 0, o),
    bottomRight: qs(!l || r.bottom || r.right, a.bottomRight, 0, o)
  };
}
function $S(t) {
  const e = Pm(t), s = e.right - e.left, n = e.bottom - e.top, i = NS(t, s / 2, n / 2), a = BS(t, s / 2, n / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: s,
      h: n,
      radius: a
    },
    inner: {
      x: e.left + i.l,
      y: e.top + i.t,
      w: s - i.l - i.r,
      h: n - i.t - i.b,
      radius: {
        topLeft: Math.max(0, a.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, a.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, a.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, a.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function gl(t, e, s, n) {
  const i = e === null, a = s === null, r = t && !(i && a) && Pm(t, n);
  return r && (i || xs(e, r.left, r.right)) && (a || xs(s, r.top, r.bottom));
}
function jS(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function WS(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function ml(t, e, s = {}) {
  const n = t.x !== s.x ? -e : 0, i = t.y !== s.y ? -e : 0, a = (t.x + t.w !== s.x + s.w ? e : 0) - n, o = (t.y + t.h !== s.y + s.h ? e : 0) - i;
  return {
    x: t.x + n,
    y: t.y + i,
    w: t.w + a,
    h: t.h + o,
    radius: t.radius
  };
}
class Ro extends Os {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: i } } = this, { inner: a, outer: o } = $S(this), r = jS(o.radius) ? _a : WS;
    e.save(), (o.w !== a.w || o.h !== a.h) && (e.beginPath(), r(e, ml(o, s, a)), e.clip(), r(e, ml(a, -s, o)), e.fillStyle = n, e.fill("evenodd")), e.beginPath(), r(e, ml(a, s)), e.fillStyle = i, e.fill(), e.restore();
  }
  inRange(e, s, n) {
    return gl(this, e, s, n);
  }
  inXRange(e, s) {
    return gl(this, e, null, s);
  }
  inYRange(e, s) {
    return gl(this, null, e, s);
  }
  getCenterPoint(e) {
    const { x: s, y: n, base: i, horizontal: a } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: a ? (s + i) / 2 : s,
      y: a ? n : (n + i) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
Q(Ro, "id", "bar"), Q(Ro, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Q(Ro, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var HS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Bi,
  BarElement: Ro,
  LineElement: Us,
  PointElement: Do
});
const ac = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Ld = /* @__PURE__ */ ac.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function Tm(t) {
  return ac[t % ac.length];
}
function Dm(t) {
  return Ld[t % Ld.length];
}
function VS(t, e) {
  return t.borderColor = Tm(e), t.backgroundColor = Dm(e), ++e;
}
function zS(t, e) {
  return t.backgroundColor = t.data.map(() => Tm(e++)), e;
}
function GS(t, e) {
  return t.backgroundColor = t.data.map(() => Dm(e++)), e;
}
function US(t) {
  let e = 0;
  return (s, n) => {
    const i = t.getDatasetMeta(n).controller;
    i instanceof yn ? e = zS(s, e) : i instanceof ta ? e = GS(s, e) : i && (e = VS(s, e));
  };
}
function Od(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function qS(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function YS() {
  return Nt.borderColor !== "rgba(0,0,0,0.1)" || Nt.backgroundColor !== "rgba(0,0,0,0.1)";
}
var KS = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, s) {
    if (!s.enabled)
      return;
    const { data: { datasets: n }, options: i } = t.config, { elements: a } = i, o = Od(n) || qS(i) || a && Od(a) || YS();
    if (!s.forceOverride && o)
      return;
    const r = US(t);
    n.forEach(r);
  }
};
function XS(t, e, s, n, i) {
  const a = i.samples || n;
  if (a >= s)
    return t.slice(e, e + s);
  const o = [], r = (s - 2) / (a - 2);
  let l = 0;
  const c = e + s - 1;
  let h = e, u, d, p, f, g;
  for (o[l++] = t[h], u = 0; u < a - 2; u++) {
    let m = 0, _ = 0, y;
    const b = Math.floor((u + 1) * r) + 1 + e, x = Math.min(Math.floor((u + 2) * r) + 1, s) + e, v = x - b;
    for (y = b; y < x; y++)
      m += t[y].x, _ += t[y].y;
    m /= v, _ /= v;
    const k = Math.floor(u * r) + 1 + e, S = Math.min(Math.floor((u + 1) * r) + 1, s) + e, { x: C, y: D } = t[h];
    for (p = f = -1, y = k; y < S; y++)
      f = 0.5 * Math.abs((C - m) * (t[y].y - D) - (C - t[y].x) * (_ - D)), f > p && (p = f, d = t[y], g = y);
    o[l++] = d, h = g;
  }
  return o[l++] = t[c], o;
}
function JS(t, e, s, n) {
  let i = 0, a = 0, o, r, l, c, h, u, d, p, f, g;
  const m = [], _ = e + s - 1, y = t[e].x, x = t[_].x - y;
  for (o = e; o < e + s; ++o) {
    r = t[o], l = (r.x - y) / x * n, c = r.y;
    const v = l | 0;
    if (v === h)
      c < f ? (f = c, u = o) : c > g && (g = c, d = o), i = (a * i + r.x) / ++a;
    else {
      const k = o - 1;
      if (!mt(u) && !mt(d)) {
        const S = Math.min(u, d), C = Math.max(u, d);
        S !== p && S !== k && m.push({
          ...t[S],
          x: i
        }), C !== p && C !== k && m.push({
          ...t[C],
          x: i
        });
      }
      o > 0 && k !== p && m.push(t[k]), m.push(r), h = v, a = 0, f = g = c, u = d = p = o;
    }
  }
  return m;
}
function Rm(t) {
  if (t._decimated) {
    const e = t._data;
    delete t._decimated, delete t._data, Object.defineProperty(t, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: e
    });
  }
}
function Ed(t) {
  t.data.datasets.forEach((e) => {
    Rm(e);
  });
}
function ZS(t, e) {
  const s = e.length;
  let n = 0, i;
  const { iScale: a } = t, { min: o, max: r, minDefined: l, maxDefined: c } = a.getUserBounds();
  return l && (n = se(vs(e, a.axis, o).lo, 0, s - 1)), c ? i = se(vs(e, a.axis, r).hi + 1, n, s) - n : i = s - n, {
    start: n,
    count: i
  };
}
var QS = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, s) => {
    if (!s.enabled) {
      Ed(t);
      return;
    }
    const n = t.width;
    t.data.datasets.forEach((i, a) => {
      const { _data: o, indexAxis: r } = i, l = t.getDatasetMeta(a), c = o || i.data;
      if (Ii([
        r,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = t.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || t.options.parsing)
        return;
      let { start: u, count: d } = ZS(l, c);
      const p = s.threshold || 4 * n;
      if (d <= p) {
        Rm(i);
        return;
      }
      mt(o) && (i._data = c, delete i.data, Object.defineProperty(i, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(g) {
          this._data = g;
        }
      }));
      let f;
      switch (s.algorithm) {
        case "lttb":
          f = XS(c, u, d, n, s);
          break;
        case "min-max":
          f = JS(c, u, d, n);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${s.algorithm}'`);
      }
      i._decimated = f;
    });
  },
  destroy(t) {
    Ed(t);
  }
};
function tw(t, e, s) {
  const n = t.segments, i = t.points, a = e.points, o = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = jr(l, c, i);
    const h = oc(s, i[l], i[c], r.loop);
    if (!e.segments) {
      o.push({
        source: r,
        target: h,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const u = dm(e, h);
    for (const d of u) {
      const p = oc(s, a[d.start], a[d.end], d.loop), f = um(r, i, p);
      for (const g of f)
        o.push({
          source: g,
          target: d,
          start: {
            [s]: Fd(h, p, "start", Math.max)
          },
          end: {
            [s]: Fd(h, p, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function oc(t, e, s, n) {
  if (n)
    return;
  let i = e[t], a = s[t];
  return t === "angle" && (i = de(i), a = de(a)), {
    property: t,
    start: i,
    end: a
  };
}
function ew(t, e) {
  const { x: s = null, y: n = null } = t || {}, i = e.points, a = [];
  return e.segments.forEach(({ start: o, end: r }) => {
    r = jr(o, r, i);
    const l = i[o], c = i[r];
    n !== null ? (a.push({
      x: l.x,
      y: n
    }), a.push({
      x: c.x,
      y: n
    })) : s !== null && (a.push({
      x: s,
      y: l.y
    }), a.push({
      x: s,
      y: c.y
    }));
  }), a;
}
function jr(t, e, s) {
  for (; e > t; e--) {
    const n = s[e];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return e;
}
function Fd(t, e, s, n) {
  return t && e ? n(t[s], e[s]) : t ? t[s] : e ? e[s] : 0;
}
function Lm(t, e) {
  let s = [], n = !1;
  return Ft(t) ? (n = !0, s = t) : s = ew(t, e), s.length ? new Us({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function Id(t) {
  return t && t.fill !== !1;
}
function sw(t, e, s) {
  let i = t[e].fill;
  const a = [
    e
  ];
  let o;
  if (!s)
    return i;
  for (; i !== !1 && a.indexOf(i) === -1; ) {
    if (!jt(i))
      return i;
    if (o = t[i], !o)
      return !1;
    if (o.visible)
      return i;
    a.push(i), i = o.fill;
  }
  return !1;
}
function nw(t, e, s) {
  const n = rw(t);
  if (bt(n))
    return isNaN(n.value) ? !1 : n;
  let i = parseFloat(n);
  return jt(i) && Math.floor(i) === i ? iw(n[0], e, i, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function iw(t, e, s, n) {
  return (t === "-" || t === "+") && (s = e + s), s === e || s < 0 || s >= n ? !1 : s;
}
function aw(t, e) {
  let s = null;
  return t === "start" ? s = e.bottom : t === "end" ? s = e.top : bt(t) ? s = e.getPixelForValue(t.value) : e.getBasePixel && (s = e.getBasePixel()), s;
}
function ow(t, e, s) {
  let n;
  return t === "start" ? n = s : t === "end" ? n = e.options.reverse ? e.min : e.max : bt(t) ? n = t.value : n = e.getBaseValue(), n;
}
function rw(t) {
  const e = t.options, s = e.fill;
  let n = ut(s && s.target, s);
  return n === void 0 && (n = !!e.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function lw(t) {
  const { scale: e, index: s, line: n } = t, i = [], a = n.segments, o = n.points, r = cw(e, s);
  r.push(Lm({
    x: null,
    y: e.bottom
  }, n));
  for (let l = 0; l < a.length; l++) {
    const c = a[l];
    for (let h = c.start; h <= c.end; h++)
      hw(i, o[h], r);
  }
  return new Us({
    points: i,
    options: {}
  });
}
function cw(t, e) {
  const s = [], n = t.getMatchingVisibleMetas("line");
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (a.index === e)
      break;
    a.hidden || s.unshift(a.dataset);
  }
  return s;
}
function hw(t, e, s) {
  const n = [];
  for (let i = 0; i < s.length; i++) {
    const a = s[i], { first: o, last: r, point: l } = uw(a, e, "x");
    if (!(!l || o && r)) {
      if (o)
        n.unshift(l);
      else if (t.push(l), !r)
        break;
    }
  }
  t.push(...n);
}
function uw(t, e, s) {
  const n = t.interpolate(e, s);
  if (!n)
    return {};
  const i = n[s], a = t.segments, o = t.points;
  let r = !1, l = !1;
  for (let c = 0; c < a.length; c++) {
    const h = a[c], u = o[h.start][s], d = o[h.end][s];
    if (xs(i, u, d)) {
      r = i === u, l = i === d;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: n
  };
}
class Om {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, s, n) {
    const { x: i, y: a, radius: o } = this;
    return s = s || {
      start: 0,
      end: Et
    }, e.arc(i, a, o, s.end, s.start, !0), !n.bounds;
  }
  interpolate(e) {
    const { x: s, y: n, radius: i } = this, a = e.angle;
    return {
      x: s + Math.cos(a) * i,
      y: n + Math.sin(a) * i,
      angle: a
    };
  }
}
function dw(t) {
  const { chart: e, fill: s, line: n } = t;
  if (jt(s))
    return fw(e, s);
  if (s === "stack")
    return lw(t);
  if (s === "shape")
    return !0;
  const i = pw(t);
  return i instanceof Om ? i : Lm(i, n);
}
function fw(t, e) {
  const s = t.getDatasetMeta(e);
  return s && t.isDatasetVisible(e) ? s.dataset : null;
}
function pw(t) {
  return (t.scale || {}).getPointPositionForValue ? mw(t) : gw(t);
}
function gw(t) {
  const { scale: e = {}, fill: s } = t, n = aw(s, e);
  if (jt(n)) {
    const i = e.isHorizontal();
    return {
      x: i ? n : null,
      y: i ? null : n
    };
  }
  return null;
}
function mw(t) {
  const { scale: e, fill: s } = t, n = e.options, i = e.getLabels().length, a = n.reverse ? e.max : e.min, o = ow(s, e, a), r = [];
  if (n.grid.circular) {
    const l = e.getPointPositionForValue(0, a);
    return new Om({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < i; ++l)
    r.push(e.getPointPositionForValue(l, o));
  return r;
}
function yl(t, e, s) {
  const n = dw(e), { chart: i, index: a, line: o, scale: r, axis: l } = e, c = o.options, h = c.fill, u = c.backgroundColor, { above: d = u, below: p = u } = h || {}, f = i.getDatasetMeta(a), g = fm(i, f);
  n && o.points.length && (Ir(t, s), yw(t, {
    line: o,
    target: n,
    above: d,
    below: p,
    area: s,
    scale: r,
    axis: l,
    clip: g
  }), Nr(t));
}
function yw(t, e) {
  const { line: s, target: n, above: i, below: a, area: o, scale: r, clip: l } = e, c = s._loop ? "angle" : e.axis;
  t.save();
  let h = a;
  a !== i && (c === "x" ? (Nd(t, n, o.top), bl(t, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Nd(t, n, o.bottom)) : c === "y" && (Bd(t, n, o.left), bl(t, {
    line: s,
    target: n,
    color: a,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Bd(t, n, o.right), h = i)), bl(t, {
    line: s,
    target: n,
    color: h,
    scale: r,
    property: c,
    clip: l
  }), t.restore();
}
function Nd(t, e, s) {
  const { segments: n, points: i } = e;
  let a = !0, o = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[jr(l, c, i)];
    a ? (t.moveTo(h.x, h.y), a = !1) : (t.lineTo(h.x, s), t.lineTo(h.x, h.y)), o = !!e.pathSegment(t, r, {
      move: o
    }), o ? t.closePath() : t.lineTo(u.x, s);
  }
  t.lineTo(e.first().x, s), t.closePath(), t.clip();
}
function Bd(t, e, s) {
  const { segments: n, points: i } = e;
  let a = !0, o = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[jr(l, c, i)];
    a ? (t.moveTo(h.x, h.y), a = !1) : (t.lineTo(s, h.y), t.lineTo(h.x, h.y)), o = !!e.pathSegment(t, r, {
      move: o
    }), o ? t.closePath() : t.lineTo(s, u.y);
  }
  t.lineTo(s, e.first().y), t.closePath(), t.clip();
}
function bl(t, e) {
  const { line: s, target: n, property: i, color: a, scale: o, clip: r } = e, l = tw(s, n, i);
  for (const { source: c, target: h, start: u, end: d } of l) {
    const { style: { backgroundColor: p = a } = {} } = c, f = n !== !0;
    t.save(), t.fillStyle = p, bw(t, o, r, f && oc(i, u, d)), t.beginPath();
    const g = !!s.pathSegment(t, c);
    let m;
    if (f) {
      g ? t.closePath() : $d(t, n, d, i);
      const _ = !!n.pathSegment(t, h, {
        move: g,
        reverse: !0
      });
      m = g && _, m || $d(t, n, u, i);
    }
    t.closePath(), t.fill(m ? "evenodd" : "nonzero"), t.restore();
  }
}
function bw(t, e, s, n) {
  const i = e.chart.chartArea, { property: a, start: o, end: r } = n || {};
  if (a === "x" || a === "y") {
    let l, c, h, u;
    a === "x" ? (l = o, c = i.top, h = r, u = i.bottom) : (l = i.left, c = o, h = i.right, u = r), t.beginPath(), s && (l = Math.max(l, s.left), h = Math.min(h, s.right), c = Math.max(c, s.top), u = Math.min(u, s.bottom)), t.rect(l, c, h - l, u - c), t.clip();
  }
}
function $d(t, e, s, n) {
  const i = e.interpolate(s, n);
  i && t.lineTo(i.x, i.y);
}
var _w = {
  id: "filler",
  afterDatasetsUpdate(t, e, s) {
    const n = (t.data.datasets || []).length, i = [];
    let a, o, r, l;
    for (o = 0; o < n; ++o)
      a = t.getDatasetMeta(o), r = a.dataset, l = null, r && r.options && r instanceof Us && (l = {
        visible: t.isDatasetVisible(o),
        index: o,
        fill: nw(r, o, n),
        chart: t,
        axis: a.controller.options.indexAxis,
        scale: a.vScale,
        line: r
      }), a.$filler = l, i.push(l);
    for (o = 0; o < n; ++o)
      l = i[o], !(!l || l.fill === !1) && (l.fill = sw(i, o, s.propagate));
  },
  beforeDraw(t, e, s) {
    const n = s.drawTime === "beforeDraw", i = t.getSortedVisibleDatasetMetas(), a = t.chartArea;
    for (let o = i.length - 1; o >= 0; --o) {
      const r = i[o].$filler;
      r && (r.line.updateControlPoints(a, r.axis), n && r.fill && yl(t.ctx, r, a));
    }
  },
  beforeDatasetsDraw(t, e, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = t.getSortedVisibleDatasetMetas();
    for (let i = n.length - 1; i >= 0; --i) {
      const a = n[i].$filler;
      Id(a) && yl(t.ctx, a, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, s) {
    const n = e.meta.$filler;
    !Id(n) || s.drawTime !== "beforeDatasetDraw" || yl(t.ctx, n, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const jd = (t, e) => {
  let { boxHeight: s = e, boxWidth: n = e } = t;
  return t.usePointStyle && (s = Math.min(s, e), n = t.pointStyleWidth || Math.min(n, e)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(e, s)
  };
}, xw = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class Wd extends Os {
  constructor(e) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, s, n) {
    this.maxWidth = e, this.maxHeight = s, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const e = this.options.labels || {};
    let s = Rt(e.generateLabels, [
      this.chart
    ], this) || [];
    e.filter && (s = s.filter((n) => e.filter(n, this.chart.data))), e.sort && (s = s.sort((n, i) => e.sort(n, i, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: e, ctx: s } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const n = e.labels, i = Zt(n.font), a = i.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = jd(n, a);
    let c, h;
    s.font = i.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(o, a, r, l) + 10) : (h = this.maxHeight, c = this._fitCols(o, i, r, l) + 10), this.width = Math.min(c, e.maxWidth || this.maxWidth), this.height = Math.min(h, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, s, n, i) {
    const { ctx: a, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = i + r;
    let u = e;
    a.textAlign = "left", a.textBaseline = "middle";
    let d = -1, p = -h;
    return this.legendItems.forEach((f, g) => {
      const m = n + s / 2 + a.measureText(f.text).width;
      (g === 0 || c[c.length - 1] + m + 2 * r > o) && (u += h, c[c.length - (g > 0 ? 0 : 1)] = 0, p += h, d++), l[g] = {
        left: 0,
        top: p,
        row: d,
        width: m,
        height: i
      }, c[c.length - 1] += m + r;
    }), u;
  }
  _fitCols(e, s, n, i) {
    const { ctx: a, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = o - e;
    let u = r, d = 0, p = 0, f = 0, g = 0;
    return this.legendItems.forEach((m, _) => {
      const { itemWidth: y, itemHeight: b } = vw(n, s, a, m, i);
      _ > 0 && p + b + 2 * r > h && (u += d + r, c.push({
        width: d,
        height: p
      }), f += d + r, g++, d = p = 0), l[_] = {
        left: f,
        top: p,
        col: g,
        width: y,
        height: b
      }, d = Math.max(d, y), p += b + r;
    }), u += d, c.push({
      width: d,
      height: p
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: i }, rtl: a } } = this, o = oi(a, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = ce(n, this.left + i, this.right - this.lineWidths[r]);
      for (const c of s)
        r !== c.row && (r = c.row, l = ce(n, this.left + i, this.right - this.lineWidths[r])), c.top += this.top + e + i, c.left = o.leftForLtr(o.x(l), c.width), l += c.width + i;
    } else {
      let r = 0, l = ce(n, this.top + e + i, this.bottom - this.columnSizes[r].height);
      for (const c of s)
        c.col !== r && (r = c.col, l = ce(n, this.top + e + i, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + i, c.left = o.leftForLtr(o.x(c.left), c.width), l += c.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      Ir(e, this), this._draw(), Nr(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: s, lineWidths: n, ctx: i } = this, { align: a, labels: o } = e, r = Nt.color, l = oi(e.rtl, this.left, this.width), c = Zt(o.font), { padding: h } = o, u = c.size, d = u / 2;
    let p;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: f, boxHeight: g, itemHeight: m } = jd(o, u), _ = function(k, S, C) {
      if (isNaN(f) || f <= 0 || isNaN(g) || g < 0)
        return;
      i.save();
      const D = ut(C.lineWidth, 1);
      if (i.fillStyle = ut(C.fillStyle, r), i.lineCap = ut(C.lineCap, "butt"), i.lineDashOffset = ut(C.lineDashOffset, 0), i.lineJoin = ut(C.lineJoin, "miter"), i.lineWidth = D, i.strokeStyle = ut(C.strokeStyle, r), i.setLineDash(ut(C.lineDash, [])), o.usePointStyle) {
        const O = {
          radius: g * Math.SQRT2 / 2,
          pointStyle: C.pointStyle,
          rotation: C.rotation,
          borderWidth: D
        }, I = l.xPlus(k, f / 2), w = S + d;
        tm(i, O, I, w, o.pointStyleWidth && f);
      } else {
        const O = S + Math.max((u - g) / 2, 0), I = l.leftForLtr(k, f), w = Cn(C.borderRadius);
        i.beginPath(), Object.values(w).some((E) => E !== 0) ? _a(i, {
          x: I,
          y: O,
          w: f,
          h: g,
          radius: w
        }) : i.rect(I, O, f, g), i.fill(), D !== 0 && i.stroke();
      }
      i.restore();
    }, y = function(k, S, C) {
      On(i, C.text, k, S + m / 2, c, {
        strikethrough: C.hidden,
        textAlign: l.textAlign(C.textAlign)
      });
    }, b = this.isHorizontal(), x = this._computeTitleHeight();
    b ? p = {
      x: ce(a, this.left + h, this.right - n[0]),
      y: this.top + h + x,
      line: 0
    } : p = {
      x: this.left + h,
      y: ce(a, this.top + x + h, this.bottom - s[0].height),
      line: 0
    }, lm(this.ctx, e.textDirection);
    const v = m + h;
    this.legendItems.forEach((k, S) => {
      i.strokeStyle = k.fontColor, i.fillStyle = k.fontColor;
      const C = i.measureText(k.text).width, D = l.textAlign(k.textAlign || (k.textAlign = o.textAlign)), O = f + d + C;
      let I = p.x, w = p.y;
      l.setWidth(this.width), b ? S > 0 && I + O + h > this.right && (w = p.y += v, p.line++, I = p.x = ce(a, this.left + h, this.right - n[p.line])) : S > 0 && w + v > this.bottom && (I = p.x = I + s[p.line].width + h, p.line++, w = p.y = ce(a, this.top + x + h, this.bottom - s[p.line].height));
      const E = l.x(I);
      if (_(E, w, k), I = j_(D, I + f + d, b ? I + O : this.right, e.rtl), y(l.x(I), w, k), b)
        p.x += O + h;
      else if (typeof k.text != "string") {
        const L = c.lineHeight;
        p.y += Em(k, L) + h;
      } else
        p.y += v;
    }), cm(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, s = e.title, n = Zt(s.font), i = me(s.padding);
    if (!s.display)
      return;
    const a = oi(e.rtl, this.left, this.width), o = this.ctx, r = s.position, l = n.size / 2, c = i.top + l;
    let h, u = this.left, d = this.width;
    if (this.isHorizontal())
      d = Math.max(...this.lineWidths), h = this.top + c, u = ce(e.align, u, this.right - d);
    else {
      const f = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h = c + ce(e.align, this.top, this.bottom - f - e.labels.padding - this._computeTitleHeight());
    }
    const p = ce(r, u, u + d);
    o.textAlign = a.textAlign(hh(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = n.string, On(o, s.text, p, h, n);
  }
  _computeTitleHeight() {
    const e = this.options.title, s = Zt(e.font), n = me(e.padding);
    return e.display ? s.lineHeight + n.height : 0;
  }
  _getLegendItemAt(e, s) {
    let n, i, a;
    if (xs(e, this.left, this.right) && xs(s, this.top, this.bottom)) {
      for (a = this.legendHitBoxes, n = 0; n < a.length; ++n)
        if (i = a[n], xs(e, i.left, i.left + i.width) && xs(s, i.top, i.top + i.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(e) {
    const s = this.options;
    if (!Cw(e.type, s))
      return;
    const n = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const i = this._hoveredItem, a = xw(i, n);
      i && !a && Rt(s.onLeave, [
        e,
        i,
        this
      ], this), this._hoveredItem = n, n && !a && Rt(s.onHover, [
        e,
        n,
        this
      ], this);
    } else n && Rt(s.onClick, [
      e,
      n,
      this
    ], this);
  }
}
function vw(t, e, s, n, i) {
  const a = Sw(n, t, e, s), o = ww(i, n, e.lineHeight);
  return {
    itemWidth: a,
    itemHeight: o
  };
}
function Sw(t, e, s, n) {
  let i = t.text;
  return i && typeof i != "string" && (i = i.reduce((a, o) => a.length > o.length ? a : o)), e + s.size / 2 + n.measureText(i).width;
}
function ww(t, e, s) {
  let n = t;
  return typeof e.text != "string" && (n = Em(e, s)), n;
}
function Em(t, e) {
  const s = t.text ? t.text.length : 0;
  return e * s;
}
function Cw(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var kw = {
  id: "legend",
  _element: Wd,
  start(t, e, s) {
    const n = t.legend = new Wd({
      ctx: t.ctx,
      options: s,
      chart: t
    });
    pe.configure(t, n, s), pe.addBox(t, n);
  },
  stop(t) {
    pe.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, s) {
    const n = t.legend;
    pe.configure(t, n, s), n.options = s;
  },
  afterUpdate(t) {
    const e = t.legend;
    e.buildLabels(), e.adjustHitBoxes();
  },
  afterEvent(t, e) {
    e.replay || t.legend.handleEvent(e.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(t, e, s) {
      const n = e.datasetIndex, i = s.chart;
      i.isDatasetVisible(n) ? (i.hide(n), e.hidden = !0) : (i.show(n), e.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets, { labels: { usePointStyle: s, pointStyle: n, textAlign: i, color: a, useBorderRadius: o, borderRadius: r } } = t.legend.options;
        return t._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(s ? 0 : void 0), h = me(c.borderWidth);
          return {
            text: e[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: a,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: i || c.textAlign,
            borderRadius: o && (r || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (t) => t.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (t) => !t.startsWith("on"),
    labels: {
      _scriptable: (t) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(t)
    }
  }
};
class _h extends Os {
  constructor(e) {
    super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, s) {
    const n = this.options;
    if (this.left = 0, this.top = 0, !n.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = e, this.height = this.bottom = s;
    const i = Ft(n.text) ? n.text.length : 1;
    this._padding = me(n.padding);
    const a = i * Zt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = a : this.width = a;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: s, left: n, bottom: i, right: a, options: o } = this, r = o.align;
    let l = 0, c, h, u;
    return this.isHorizontal() ? (h = ce(r, n, a), u = s + e, c = a - n) : (o.position === "left" ? (h = n + e, u = ce(r, i, s), l = vt * -0.5) : (h = a - e, u = ce(r, s, i), l = vt * 0.5), c = i - s), {
      titleX: h,
      titleY: u,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const e = this.ctx, s = this.options;
    if (!s.display)
      return;
    const n = Zt(s.font), a = n.lineHeight / 2 + this._padding.top, { titleX: o, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(a);
    On(e, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: l,
      rotation: c,
      textAlign: hh(s.align),
      textBaseline: "middle",
      translation: [
        o,
        r
      ]
    });
  }
}
function Mw(t, e) {
  const s = new _h({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  pe.configure(t, s, e), pe.addBox(t, s), t.titleBlock = s;
}
var Aw = {
  id: "title",
  _element: _h,
  start(t, e, s) {
    Mw(t, s);
  },
  stop(t) {
    const e = t.titleBlock;
    pe.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, s) {
    const n = t.titleBlock;
    pe.configure(t, n, s), n.options = s;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const co = /* @__PURE__ */ new WeakMap();
var Pw = {
  id: "subtitle",
  start(t, e, s) {
    const n = new _h({
      ctx: t.ctx,
      options: s,
      chart: t
    });
    pe.configure(t, n, s), pe.addBox(t, n), co.set(t, n);
  },
  stop(t) {
    pe.removeBox(t, co.get(t)), co.delete(t);
  },
  beforeUpdate(t, e, s) {
    const n = co.get(t);
    pe.configure(t, n, s), n.options = s;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const $i = {
  average(t) {
    if (!t.length)
      return !1;
    let e, s, n = /* @__PURE__ */ new Set(), i = 0, a = 0;
    for (e = 0, s = t.length; e < s; ++e) {
      const r = t[e].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), i += l.y, ++a;
      }
    }
    return a === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: i / a
    };
  },
  nearest(t, e) {
    if (!t.length)
      return !1;
    let s = e.x, n = e.y, i = Number.POSITIVE_INFINITY, a, o, r;
    for (a = 0, o = t.length; a < o; ++a) {
      const l = t[a].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Zl(e, c);
        h < i && (i = h, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      s = l.x, n = l.y;
    }
    return {
      x: s,
      y: n
    };
  }
};
function Ze(t, e) {
  return e && (Ft(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function ds(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function Tw(t, e) {
  const { element: s, datasetIndex: n, index: i } = e, a = t.getDatasetMeta(n).controller, { label: o, value: r } = a.getLabelAndValue(i);
  return {
    chart: t,
    label: o,
    parsed: a.getParsed(i),
    raw: t.data.datasets[n].data[i],
    formattedValue: r,
    dataset: a.getDataset(),
    dataIndex: i,
    datasetIndex: n,
    element: s
  };
}
function Hd(t, e) {
  const s = t.chart.ctx, { body: n, footer: i, title: a } = t, { boxWidth: o, boxHeight: r } = e, l = Zt(e.bodyFont), c = Zt(e.titleFont), h = Zt(e.footerFont), u = a.length, d = i.length, p = n.length, f = me(e.padding);
  let g = f.height, m = 0, _ = n.reduce((x, v) => x + v.before.length + v.lines.length + v.after.length, 0);
  if (_ += t.beforeBody.length + t.afterBody.length, u && (g += u * c.lineHeight + (u - 1) * e.titleSpacing + e.titleMarginBottom), _) {
    const x = e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    g += p * x + (_ - p) * l.lineHeight + (_ - 1) * e.bodySpacing;
  }
  d && (g += e.footerMarginTop + d * h.lineHeight + (d - 1) * e.footerSpacing);
  let y = 0;
  const b = function(x) {
    m = Math.max(m, s.measureText(x).width + y);
  };
  return s.save(), s.font = c.string, At(t.title, b), s.font = l.string, At(t.beforeBody.concat(t.afterBody), b), y = e.displayColors ? o + 2 + e.boxPadding : 0, At(n, (x) => {
    At(x.before, b), At(x.lines, b), At(x.after, b);
  }), y = 0, s.font = h.string, At(t.footer, b), s.restore(), m += f.width, {
    width: m,
    height: g
  };
}
function Dw(t, e) {
  const { y: s, height: n } = e;
  return s < n / 2 ? "top" : s > t.height - n / 2 ? "bottom" : "center";
}
function Rw(t, e, s, n) {
  const { x: i, width: a } = n, o = s.caretSize + s.caretPadding;
  if (t === "left" && i + a + o > e.width || t === "right" && i - a - o < 0)
    return !0;
}
function Lw(t, e, s, n) {
  const { x: i, width: a } = s, { width: o, chartArea: { left: r, right: l } } = t;
  let c = "center";
  return n === "center" ? c = i <= (r + l) / 2 ? "left" : "right" : i <= a / 2 ? c = "left" : i >= o - a / 2 && (c = "right"), Rw(c, t, e, s) && (c = "center"), c;
}
function Vd(t, e, s) {
  const n = s.yAlign || e.yAlign || Dw(t, s);
  return {
    xAlign: s.xAlign || e.xAlign || Lw(t, e, s, n),
    yAlign: n
  };
}
function Ow(t, e) {
  let { x: s, width: n } = t;
  return e === "right" ? s -= n : e === "center" && (s -= n / 2), s;
}
function Ew(t, e, s) {
  let { y: n, height: i } = t;
  return e === "top" ? n += s : e === "bottom" ? n -= i + s : n -= i / 2, n;
}
function zd(t, e, s, n) {
  const { caretSize: i, caretPadding: a, cornerRadius: o } = t, { xAlign: r, yAlign: l } = s, c = i + a, { topLeft: h, topRight: u, bottomLeft: d, bottomRight: p } = Cn(o);
  let f = Ow(e, r);
  const g = Ew(e, l, c);
  return l === "center" ? r === "left" ? f += c : r === "right" && (f -= c) : r === "left" ? f -= Math.max(h, d) + i : r === "right" && (f += Math.max(u, p) + i), {
    x: se(f, 0, n.width - e.width),
    y: se(g, 0, n.height - e.height)
  };
}
function ho(t, e, s) {
  const n = me(s.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - n.right : t.x + n.left;
}
function Gd(t) {
  return Ze([], ds(t));
}
function Fw(t, e, s) {
  return en(t, {
    tooltip: e,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Ud(t, e) {
  const s = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return s ? t.override(s) : t;
}
const Fm = {
  beforeTitle: cs,
  title(t) {
    if (t.length > 0) {
      const e = t[0], s = e.chart.data.labels, n = s ? s.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label)
        return e.label;
      if (n > 0 && e.dataIndex < n)
        return s[e.dataIndex];
    }
    return "";
  },
  afterTitle: cs,
  beforeBody: cs,
  beforeLabel: cs,
  label(t) {
    if (this && this.options && this.options.mode === "dataset")
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const s = t.formattedValue;
    return mt(s) || (e += s), e;
  },
  labelColor(t) {
    const s = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor,
      borderWidth: s.borderWidth,
      borderDash: s.borderDash,
      borderDashOffset: s.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(t) {
    const s = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      pointStyle: s.pointStyle,
      rotation: s.rotation
    };
  },
  afterLabel: cs,
  afterBody: cs,
  beforeFooter: cs,
  footer: cs,
  afterFooter: cs
};
function we(t, e, s, n) {
  const i = t[e].call(s, n);
  return typeof i > "u" ? Fm[e].call(s, n) : i;
}
class rc extends Os {
  constructor(e) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(e) {
    this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const e = this._cachedAnimations;
    if (e)
      return e;
    const s = this.chart, n = this.options.setContext(this.getContext()), i = n.enabled && s.options.animation && n.animations, a = new pm(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(a)), a;
  }
  getContext() {
    return this.$context || (this.$context = Fw(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeTitle", this, e), a = we(n, "title", this, e), o = we(n, "afterTitle", this, e);
    let r = [];
    return r = Ze(r, ds(i)), r = Ze(r, ds(a)), r = Ze(r, ds(o)), r;
  }
  getBeforeBody(e, s) {
    return Gd(we(s.callbacks, "beforeBody", this, e));
  }
  getBody(e, s) {
    const { callbacks: n } = s, i = [];
    return At(e, (a) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = Ud(n, a);
      Ze(o.before, ds(we(r, "beforeLabel", this, a))), Ze(o.lines, we(r, "label", this, a)), Ze(o.after, ds(we(r, "afterLabel", this, a))), i.push(o);
    }), i;
  }
  getAfterBody(e, s) {
    return Gd(we(s.callbacks, "afterBody", this, e));
  }
  getFooter(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeFooter", this, e), a = we(n, "footer", this, e), o = we(n, "afterFooter", this, e);
    let r = [];
    return r = Ze(r, ds(i)), r = Ze(r, ds(a)), r = Ze(r, ds(o)), r;
  }
  _createItems(e) {
    const s = this._active, n = this.chart.data, i = [], a = [], o = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push(Tw(this.chart, s[l]));
    return e.filter && (r = r.filter((h, u, d) => e.filter(h, u, d, n))), e.itemSort && (r = r.sort((h, u) => e.itemSort(h, u, n))), At(r, (h) => {
      const u = Ud(e.callbacks, h);
      i.push(we(u, "labelColor", this, h)), a.push(we(u, "labelPointStyle", this, h)), o.push(we(u, "labelTextColor", this, h));
    }), this.labelColors = i, this.labelPointStyles = a, this.labelTextColors = o, this.dataPoints = r, r;
  }
  update(e, s) {
    const n = this.options.setContext(this.getContext()), i = this._active;
    let a, o = [];
    if (!i.length)
      this.opacity !== 0 && (a = {
        opacity: 0
      });
    else {
      const r = $i[n.position].call(this, i, this._eventPosition);
      o = this._createItems(n), this.title = this.getTitle(o, n), this.beforeBody = this.getBeforeBody(o, n), this.body = this.getBody(o, n), this.afterBody = this.getAfterBody(o, n), this.footer = this.getFooter(o, n);
      const l = this._size = Hd(this, n), c = Object.assign({}, r, l), h = Vd(this.chart, n, c), u = zd(n, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, a = {
        opacity: 1,
        x: u.x,
        y: u.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, a && this._resolveAnimations().update(this, a), e && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(e, s, n, i) {
    const a = this.getCaretPosition(e, n, i);
    s.lineTo(a.x1, a.y1), s.lineTo(a.x2, a.y2), s.lineTo(a.x3, a.y3);
  }
  getCaretPosition(e, s, n) {
    const { xAlign: i, yAlign: a } = this, { caretSize: o, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: u } = Cn(r), { x: d, y: p } = e, { width: f, height: g } = s;
    let m, _, y, b, x, v;
    return a === "center" ? (x = p + g / 2, i === "left" ? (m = d, _ = m - o, b = x + o, v = x - o) : (m = d + f, _ = m + o, b = x - o, v = x + o), y = m) : (i === "left" ? _ = d + Math.max(l, h) + o : i === "right" ? _ = d + f - Math.max(c, u) - o : _ = this.caretX, a === "top" ? (b = p, x = b - o, m = _ - o, y = _ + o) : (b = p + g, x = b + o, m = _ + o, y = _ - o), v = b), {
      x1: m,
      x2: _,
      x3: y,
      y1: b,
      y2: x,
      y3: v
    };
  }
  drawTitle(e, s, n) {
    const i = this.title, a = i.length;
    let o, r, l;
    if (a) {
      const c = oi(n.rtl, this.x, this.width);
      for (e.x = ho(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", o = Zt(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = o.string, l = 0; l < a; ++l)
        s.fillText(i[l], c.x(e.x), e.y + o.lineHeight / 2), e.y += o.lineHeight + r, l + 1 === a && (e.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(e, s, n, i, a) {
    const o = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = a, h = Zt(a.bodyFont), u = ho(this, "left", a), d = i.x(u), p = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, f = s.y + p;
    if (a.usePointStyle) {
      const g = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = i.leftForLtr(d, c) + c / 2, _ = f + l / 2;
      e.strokeStyle = a.multiKeyBackground, e.fillStyle = a.multiKeyBackground, tc(e, g, m, _), e.strokeStyle = o.borderColor, e.fillStyle = o.backgroundColor, tc(e, g, m, _);
    } else {
      e.lineWidth = bt(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, e.strokeStyle = o.borderColor, e.setLineDash(o.borderDash || []), e.lineDashOffset = o.borderDashOffset || 0;
      const g = i.leftForLtr(d, c), m = i.leftForLtr(i.xPlus(d, 1), c - 2), _ = Cn(o.borderRadius);
      Object.values(_).some((y) => y !== 0) ? (e.beginPath(), e.fillStyle = a.multiKeyBackground, _a(e, {
        x: g,
        y: f,
        w: c,
        h: l,
        radius: _
      }), e.fill(), e.stroke(), e.fillStyle = o.backgroundColor, e.beginPath(), _a(e, {
        x: m,
        y: f + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), e.fill()) : (e.fillStyle = a.multiKeyBackground, e.fillRect(g, f, c, l), e.strokeRect(g, f, c, l), e.fillStyle = o.backgroundColor, e.fillRect(m, f + 1, c - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[n];
  }
  drawBody(e, s, n) {
    const { body: i } = this, { bodySpacing: a, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: h } = n, u = Zt(n.bodyFont);
    let d = u.lineHeight, p = 0;
    const f = oi(n.rtl, this.x, this.width), g = function(C) {
      s.fillText(C, f.x(e.x + p), e.y + d / 2), e.y += d + a;
    }, m = f.textAlign(o);
    let _, y, b, x, v, k, S;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = u.string, e.x = ho(this, m, n), s.fillStyle = n.bodyColor, At(this.beforeBody, g), p = r && m !== "right" ? o === "center" ? c / 2 + h : c + 2 + h : 0, x = 0, k = i.length; x < k; ++x) {
      for (_ = i[x], y = this.labelTextColors[x], s.fillStyle = y, At(_.before, g), b = _.lines, r && b.length && (this._drawColorBox(s, e, x, f, n), d = Math.max(u.lineHeight, l)), v = 0, S = b.length; v < S; ++v)
        g(b[v]), d = u.lineHeight;
      At(_.after, g);
    }
    p = 0, d = u.lineHeight, At(this.afterBody, g), e.y -= a;
  }
  drawFooter(e, s, n) {
    const i = this.footer, a = i.length;
    let o, r;
    if (a) {
      const l = oi(n.rtl, this.x, this.width);
      for (e.x = ho(this, n.footerAlign, n), e.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", o = Zt(n.footerFont), s.fillStyle = n.footerColor, s.font = o.string, r = 0; r < a; ++r)
        s.fillText(i[r], l.x(e.x), e.y + o.lineHeight / 2), e.y += o.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(e, s, n, i) {
    const { xAlign: a, yAlign: o } = this, { x: r, y: l } = e, { width: c, height: h } = n, { topLeft: u, topRight: d, bottomLeft: p, bottomRight: f } = Cn(i.cornerRadius);
    s.fillStyle = i.backgroundColor, s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.beginPath(), s.moveTo(r + u, l), o === "top" && this.drawCaret(e, s, n, i), s.lineTo(r + c - d, l), s.quadraticCurveTo(r + c, l, r + c, l + d), o === "center" && a === "right" && this.drawCaret(e, s, n, i), s.lineTo(r + c, l + h - f), s.quadraticCurveTo(r + c, l + h, r + c - f, l + h), o === "bottom" && this.drawCaret(e, s, n, i), s.lineTo(r + p, l + h), s.quadraticCurveTo(r, l + h, r, l + h - p), o === "center" && a === "left" && this.drawCaret(e, s, n, i), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), i.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(e) {
    const s = this.chart, n = this.$animations, i = n && n.x, a = n && n.y;
    if (i || a) {
      const o = $i[e.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = Hd(this, e), l = Object.assign({}, o, this._size), c = Vd(s, e, l), h = zd(e, l, c, s);
      (i._to !== h.x || a._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
    const s = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n)
      return;
    this._updateAnimationTarget(s);
    const i = {
      width: this.width,
      height: this.height
    }, a = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const o = me(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (e.save(), e.globalAlpha = n, this.drawBackground(a, e, i, s), lm(e, s.textDirection), a.y += o.top, this.drawTitle(a, e, s), this.drawBody(a, e, s), this.drawFooter(a, e, s), cm(e, s.textDirection), e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, s) {
    const n = this._active, i = e.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), a = !ar(n, i), o = this._positionChanged(i, s);
    (a || o) && (this._active = i, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, a = this._active || [], o = this._getActiveElements(e, a, s, n), r = this._positionChanged(o, e), l = s || !ar(o, a) || r;
    return l && (this._active = o, (i.enabled || i.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(e, s, n, i) {
    const a = this.options;
    if (e.type === "mouseout")
      return [];
    if (!i)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(e, a.mode, a, n);
    return a.reverse && o.reverse(), o;
  }
  _positionChanged(e, s) {
    const { caretX: n, caretY: i, options: a } = this, o = $i[a.position].call(this, e, s);
    return o !== !1 && (n !== o.x || i !== o.y);
  }
}
Q(rc, "positioners", $i);
var Iw = {
  id: "tooltip",
  _element: rc,
  positioners: $i,
  afterInit(t, e, s) {
    s && (t.tooltip = new rc({
      chart: t,
      options: s
    }));
  },
  beforeUpdate(t, e, s) {
    t.tooltip && t.tooltip.initialize(s);
  },
  reset(t, e, s) {
    t.tooltip && t.tooltip.initialize(s);
  },
  afterDraw(t) {
    const e = t.tooltip;
    if (e && e._willRender()) {
      const s = {
        tooltip: e
      };
      if (t.notifyPlugins("beforeTooltipDraw", {
        ...s,
        cancelable: !0
      }) === !1)
        return;
      e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", s);
    }
  },
  afterEvent(t, e) {
    if (t.tooltip) {
      const s = e.replay;
      t.tooltip.handleEvent(e.event, s, e.inChartArea) && (e.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (t, e) => e.bodyFont.size,
    boxWidth: (t, e) => e.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Fm
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (t) => t !== "filter" && t !== "itemSort" && t !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, Nw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: KS,
  Decimation: QS,
  Filler: _w,
  Legend: kw,
  SubTitle: Pw,
  Title: Aw,
  Tooltip: Iw
});
const Bw = (t, e, s, n) => (typeof e == "string" ? (s = t.push(e) - 1, n.unshift({
  index: s,
  label: e
})) : isNaN(e) && (s = null), s);
function $w(t, e, s, n) {
  const i = t.indexOf(e);
  if (i === -1)
    return Bw(t, e, s, n);
  const a = t.lastIndexOf(e);
  return i !== a ? s : i;
}
const jw = (t, e) => t === null ? null : se(Math.round(t), 0, e);
function qd(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class lc extends Nn {
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const s = this._addedLabels;
    if (s.length) {
      const n = this.getLabels();
      for (const { index: i, label: a } of s)
        n[i] === a && n.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, s) {
    if (mt(e))
      return null;
    const n = this.getLabels();
    return s = isFinite(s) && n[s] === e ? s : $w(n, e, ut(s, e), this._addedLabels), jw(s, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (n = 0), s || (i = this.getLabels().length - 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const e = this.min, s = this.max, n = this.options.offset, i = [];
    let a = this.getLabels();
    a = e === 0 && s === a.length - 1 ? a : a.slice(e, s + 1), this._valueRange = Math.max(a.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let o = e; o <= s; o++)
      i.push({
        value: o
      });
    return i;
  }
  getLabelForValue(e) {
    return qd.call(this, e);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getPixelForTick(e) {
    const s = this.ticks;
    return e < 0 || e > s.length - 1 ? null : this.getPixelForValue(s[e].value);
  }
  getValueForPixel(e) {
    return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
Q(lc, "id", "category"), Q(lc, "defaults", {
  ticks: {
    callback: qd
  }
});
function Ww(t, e) {
  const s = [], { bounds: i, step: a, min: o, max: r, precision: l, count: c, maxTicks: h, maxDigits: u, includeBounds: d } = t, p = a || 1, f = h - 1, { min: g, max: m } = e, _ = !mt(o), y = !mt(r), b = !mt(c), x = (m - g) / (u + 1);
  let v = Hu((m - g) / f / p) * p, k, S, C, D;
  if (v < 1e-14 && !_ && !y)
    return [
      {
        value: g
      },
      {
        value: m
      }
    ];
  D = Math.ceil(m / v) - Math.floor(g / v), D > f && (v = Hu(D * v / f / p) * p), mt(l) || (k = Math.pow(10, l), v = Math.ceil(v * k) / k), i === "ticks" ? (S = Math.floor(g / v) * v, C = Math.ceil(m / v) * v) : (S = g, C = m), _ && y && a && O_((r - o) / a, v / 1e3) ? (D = Math.round(Math.min((r - o) / v, h)), v = (r - o) / D, S = o, C = r) : b ? (S = _ ? o : S, C = y ? r : C, D = c - 1, v = (C - S) / D) : (D = (C - S) / v, Ji(D, Math.round(D), v / 1e3) ? D = Math.round(D) : D = Math.ceil(D));
  const O = Math.max(Vu(v), Vu(S));
  k = Math.pow(10, mt(l) ? O : l), S = Math.round(S * k) / k, C = Math.round(C * k) / k;
  let I = 0;
  for (_ && (d && S !== o ? (s.push({
    value: o
  }), S < o && I++, Ji(Math.round((S + I * v) * k) / k, o, Yd(o, x, t)) && I++) : S < o && I++); I < D; ++I) {
    const w = Math.round((S + I * v) * k) / k;
    if (y && w > r)
      break;
    s.push({
      value: w
    });
  }
  return y && d && C !== r ? s.length && Ji(s[s.length - 1].value, r, Yd(r, x, t)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || C === r) && s.push({
    value: C
  }), s;
}
function Yd(t, e, { horizontal: s, minRotation: n }) {
  const i = ze(n), a = (s ? Math.sin(i) : Math.cos(i)) || 1e-3, o = 0.75 * e * ("" + t).length;
  return Math.min(e / a, o);
}
class fr extends Nn {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, s) {
    return mt(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: s, maxDefined: n } = this.getUserBounds();
    let { min: i, max: a } = this;
    const o = (l) => i = s ? i : l, r = (l) => a = n ? a : l;
    if (e) {
      const l = as(i), c = as(a);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && o(0);
    }
    if (i === a) {
      let l = a === 0 ? 1 : Math.abs(a * 0.05);
      r(a + l), e || o(i - l);
    }
    this.min = i, this.max = a;
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: s, stepSize: n } = e, i;
    return n ? (i = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, i > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${i} ticks. Limiting to 1000.`), i = 1e3)) : (i = this.computeTickLimit(), s = s || 11), s && (i = Math.min(s, i)), i;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options, s = e.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const i = {
      maxTicks: n,
      bounds: e.bounds,
      min: e.min,
      max: e.max,
      precision: s.precision,
      step: s.stepSize,
      count: s.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: s.minRotation || 0,
      includeBounds: s.includeBounds !== !1
    }, a = this._range || this, o = Ww(i, a);
    return e.bounds === "ticks" && Gg(o, this, "value"), e.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const e = this.ticks;
    let s = this.min, n = this.max;
    if (super.configure(), this.options.offset && e.length) {
      const i = (n - s) / Math.max(e.length - 1, 1) / 2;
      s -= i, n += i;
    }
    this._startValue = s, this._endValue = n, this._valueRange = n - s;
  }
  getLabelForValue(e) {
    return Ia(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class cc extends fr {
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!0);
    this.min = jt(e) ? e : 0, this.max = jt(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), s = e ? this.width : this.height, n = ze(this.options.ticks.minRotation), i = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, a = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, a.lineHeight / i));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
Q(cc, "id", "linear"), Q(cc, "defaults", {
  ticks: {
    callback: Fr.formatters.numeric
  }
});
const va = (t) => Math.floor(zs(t)), hn = (t, e) => Math.pow(10, va(t) + e);
function Kd(t) {
  return t / Math.pow(10, va(t)) === 1;
}
function Xd(t, e, s) {
  const n = Math.pow(10, s), i = Math.floor(t / n);
  return Math.ceil(e / n) - i;
}
function Hw(t, e) {
  const s = e - t;
  let n = va(s);
  for (; Xd(t, e, n) > 10; )
    n++;
  for (; Xd(t, e, n) < 10; )
    n--;
  return Math.min(n, va(t));
}
function Vw(t, { min: e, max: s }) {
  e = Le(t.min, e);
  const n = [], i = va(e);
  let a = Hw(e, s), o = a < 0 ? Math.pow(10, Math.abs(a)) : 1;
  const r = Math.pow(10, a), l = i > a ? Math.pow(10, i) : 0, c = Math.round((e - l) * o) / o, h = Math.floor((e - l) / r / 10) * r * 10;
  let u = Math.floor((c - h) / Math.pow(10, a)), d = Le(t.min, Math.round((l + h + u * Math.pow(10, a)) * o) / o);
  for (; d < s; )
    n.push({
      value: d,
      major: Kd(d),
      significand: u
    }), u >= 10 ? u = u < 15 ? 15 : 20 : u++, u >= 20 && (a++, u = 2, o = a >= 0 ? 1 : o), d = Math.round((l + h + u * Math.pow(10, a)) * o) / o;
  const p = Le(t.max, d);
  return n.push({
    value: p,
    major: Kd(p),
    significand: u
  }), n;
}
class hc extends Nn {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, s) {
    const n = fr.prototype.parse.apply(this, [
      e,
      s
    ]);
    if (n === 0) {
      this._zero = !0;
      return;
    }
    return jt(n) && n > 0 ? n : null;
  }
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!0);
    this.min = jt(e) ? Math.max(0, e) : null, this.max = jt(s) ? Math.max(0, s) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !jt(this._userMin) && (this.min = e === hn(this.min, 0) ? hn(this.min, -1) : hn(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: s } = this.getUserBounds();
    let n = this.min, i = this.max;
    const a = (r) => n = e ? n : r, o = (r) => i = s ? i : r;
    n === i && (n <= 0 ? (a(1), o(10)) : (a(hn(n, -1)), o(hn(i, 1)))), n <= 0 && a(hn(i, -1)), i <= 0 && o(hn(n, 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const e = this.options, s = {
      min: this._userMin,
      max: this._userMax
    }, n = Vw(s, this);
    return e.bounds === "ticks" && Gg(n, this, "value"), e.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : Ia(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = zs(e), this._valueRange = zs(this.max) - zs(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (zs(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const s = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + s * this._valueRange);
  }
}
Q(hc, "id", "logarithmic"), Q(hc, "defaults", {
  ticks: {
    callback: Fr.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function uc(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const s = me(e.backdropPadding);
    return ut(e.font && e.font.size, Nt.font.size) + s.height;
  }
  return 0;
}
function zw(t, e, s) {
  return s = Ft(s) ? s : [
    s
  ], {
    w: X_(t, e.string, s),
    h: s.length * e.lineHeight
  };
}
function Jd(t, e, s, n, i) {
  return t === n || t === i ? {
    start: e - s / 2,
    end: e + s / 2
  } : t < n || t > i ? {
    start: e - s,
    end: e
  } : {
    start: e,
    end: e + s
  };
}
function Gw(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, s = Object.assign({}, e), n = [], i = [], a = t._pointLabels.length, o = t.options.pointLabels, r = o.centerPointLabels ? vt / a : 0;
  for (let l = 0; l < a; l++) {
    const c = o.setContext(t.getPointLabelContext(l));
    i[l] = c.padding;
    const h = t.getPointPosition(l, t.drawingArea + i[l], r), u = Zt(c.font), d = zw(t.ctx, u, t._pointLabels[l]);
    n[l] = d;
    const p = de(t.getIndexAngle(l) + r), f = Math.round(lh(p)), g = Jd(f, h.x, d.w, 0, 180), m = Jd(f, h.y, d.h, 90, 270);
    Uw(s, e, p, g, m);
  }
  t.setCenterPoint(e.l - s.l, s.r - e.r, e.t - s.t, s.b - e.b), t._pointLabelItems = Kw(t, n, i);
}
function Uw(t, e, s, n, i) {
  const a = Math.abs(Math.sin(s)), o = Math.abs(Math.cos(s));
  let r = 0, l = 0;
  n.start < e.l ? (r = (e.l - n.start) / a, t.l = Math.min(t.l, e.l - r)) : n.end > e.r && (r = (n.end - e.r) / a, t.r = Math.max(t.r, e.r + r)), i.start < e.t ? (l = (e.t - i.start) / o, t.t = Math.min(t.t, e.t - l)) : i.end > e.b && (l = (i.end - e.b) / o, t.b = Math.max(t.b, e.b + l));
}
function qw(t, e, s) {
  const n = t.drawingArea, { extra: i, additionalAngle: a, padding: o, size: r } = s, l = t.getPointPosition(e, n + i + o, a), c = Math.round(lh(de(l.angle + qt))), h = Zw(l.y, r.h, c), u = Xw(c), d = Jw(l.x, r.w, u);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: u,
    left: d,
    top: h,
    right: d + r.w,
    bottom: h + r.h
  };
}
function Yw(t, e) {
  if (!e)
    return !0;
  const { left: s, top: n, right: i, bottom: a } = t;
  return !(Ss({
    x: s,
    y: n
  }, e) || Ss({
    x: s,
    y: a
  }, e) || Ss({
    x: i,
    y: n
  }, e) || Ss({
    x: i,
    y: a
  }, e));
}
function Kw(t, e, s) {
  const n = [], i = t._pointLabels.length, a = t.options, { centerPointLabels: o, display: r } = a.pointLabels, l = {
    extra: uc(a) / 2,
    additionalAngle: o ? vt / i : 0
  };
  let c;
  for (let h = 0; h < i; h++) {
    l.padding = s[h], l.size = e[h];
    const u = qw(t, h, l);
    n.push(u), r === "auto" && (u.visible = Yw(u, c), u.visible && (c = u));
  }
  return n;
}
function Xw(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function Jw(t, e, s) {
  return s === "right" ? t -= e : s === "center" && (t -= e / 2), t;
}
function Zw(t, e, s) {
  return s === 90 || s === 270 ? t -= e / 2 : (s > 270 || s < 90) && (t -= e), t;
}
function Qw(t, e, s) {
  const { left: n, top: i, right: a, bottom: o } = s, { backdropColor: r } = e;
  if (!mt(r)) {
    const l = Cn(e.borderRadius), c = me(e.backdropPadding);
    t.fillStyle = r;
    const h = n - c.left, u = i - c.top, d = a - n + c.width, p = o - i + c.height;
    Object.values(l).some((f) => f !== 0) ? (t.beginPath(), _a(t, {
      x: h,
      y: u,
      w: d,
      h: p,
      radius: l
    }), t.fill()) : t.fillRect(h, u, d, p);
  }
}
function tC(t, e) {
  const { ctx: s, options: { pointLabels: n } } = t;
  for (let i = e - 1; i >= 0; i--) {
    const a = t._pointLabelItems[i];
    if (!a.visible)
      continue;
    const o = n.setContext(t.getPointLabelContext(i));
    Qw(s, o, a);
    const r = Zt(o.font), { x: l, y: c, textAlign: h } = a;
    On(s, t._pointLabels[i], l, c + r.lineHeight / 2, r, {
      color: o.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Im(t, e, s, n) {
  const { ctx: i } = t;
  if (s)
    i.arc(t.xCenter, t.yCenter, e, 0, Et);
  else {
    let a = t.getPointPosition(0, e);
    i.moveTo(a.x, a.y);
    for (let o = 1; o < n; o++)
      a = t.getPointPosition(o, e), i.lineTo(a.x, a.y);
  }
}
function eC(t, e, s, n, i) {
  const a = t.ctx, o = e.circular, { color: r, lineWidth: l } = e;
  !o && !n || !r || !l || s < 0 || (a.save(), a.strokeStyle = r, a.lineWidth = l, a.setLineDash(i.dash || []), a.lineDashOffset = i.dashOffset, a.beginPath(), Im(t, s, o, n), a.closePath(), a.stroke(), a.restore());
}
function sC(t, e, s) {
  return en(t, {
    label: s,
    index: e,
    type: "pointLabel"
  });
}
class ji extends fr {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = me(uc(this.options) / 2), s = this.width = this.maxWidth - e.width, n = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + s / 2 + e.left), this.yCenter = Math.floor(this.top + n / 2 + e.top), this.drawingArea = Math.floor(Math.min(s, n) / 2);
  }
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!1);
    this.min = jt(e) && !isNaN(e) ? e : 0, this.max = jt(s) && !isNaN(s) ? s : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / uc(this.options));
  }
  generateTickLabels(e) {
    fr.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((s, n) => {
      const i = Rt(this.options.pointLabels.callback, [
        s,
        n
      ], this);
      return i || i === 0 ? i : "";
    }).filter((s, n) => this.chart.getDataVisibility(n));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? Gw(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, s, n, i) {
    this.xCenter += Math.floor((e - s) / 2), this.yCenter += Math.floor((n - i) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, s, n, i));
  }
  getIndexAngle(e) {
    const s = Et / (this._pointLabels.length || 1), n = this.options.startAngle || 0;
    return de(e * s + ze(n));
  }
  getDistanceFromCenterForValue(e) {
    if (mt(e))
      return NaN;
    const s = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - e) * s : (e - this.min) * s;
  }
  getValueForDistanceFromCenter(e) {
    if (mt(e))
      return NaN;
    const s = e / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - s : this.min + s;
  }
  getPointLabelContext(e) {
    const s = this._pointLabels || [];
    if (e >= 0 && e < s.length) {
      const n = s[e];
      return sC(this.getContext(), e, n);
    }
  }
  getPointPosition(e, s, n = 0) {
    const i = this.getIndexAngle(e) - qt + n;
    return {
      x: Math.cos(i) * s + this.xCenter,
      y: Math.sin(i) * s + this.yCenter,
      angle: i
    };
  }
  getPointPositionForValue(e, s) {
    return this.getPointPosition(e, this.getDistanceFromCenterForValue(s));
  }
  getBasePosition(e) {
    return this.getPointPositionForValue(e || 0, this.getBaseValue());
  }
  getPointLabelPosition(e) {
    const { left: s, top: n, right: i, bottom: a } = this._pointLabelItems[e];
    return {
      left: s,
      top: n,
      right: i,
      bottom: a
    };
  }
  drawBackground() {
    const { backgroundColor: e, grid: { circular: s } } = this.options;
    if (e) {
      const n = this.ctx;
      n.save(), n.beginPath(), Im(this, this.getDistanceFromCenterForValue(this._endValue), s, this._pointLabels.length), n.closePath(), n.fillStyle = e, n.fill(), n.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, s = this.options, { angleLines: n, grid: i, border: a } = s, o = this._pointLabels.length;
    let r, l, c;
    if (s.pointLabels.display && tC(this, o), i.display && this.ticks.forEach((h, u) => {
      if (u !== 0 || u === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const d = this.getContext(u), p = i.setContext(d), f = a.setContext(d);
        eC(this, p, l, o, f);
      }
    }), n.display) {
      for (e.save(), r = o - 1; r >= 0; r--) {
        const h = n.setContext(this.getPointLabelContext(r)), { color: u, lineWidth: d } = h;
        !d || !u || (e.lineWidth = d, e.strokeStyle = u, e.setLineDash(h.borderDash), e.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(s.reverse ? this.min : this.max), c = this.getPointPosition(r, l), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(c.x, c.y), e.stroke());
      }
      e.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const e = this.ctx, s = this.options, n = s.ticks;
    if (!n.display)
      return;
    const i = this.getIndexAngle(0);
    let a, o;
    e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(i), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((r, l) => {
      if (l === 0 && this.min >= 0 && !s.reverse)
        return;
      const c = n.setContext(this.getContext(l)), h = Zt(c.font);
      if (a = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        e.font = h.string, o = e.measureText(r.label).width, e.fillStyle = c.backdropColor;
        const u = me(c.backdropPadding);
        e.fillRect(-o / 2 - u.left, -a - h.size / 2 - u.top, o + u.width, h.size + u.height);
      }
      On(e, r.label, 0, -a, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
}
Q(ji, "id", "radialLinear"), Q(ji, "defaults", {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: Fr.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(e) {
      return e;
    },
    padding: 5,
    centerPointLabels: !1
  }
}), Q(ji, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), Q(ji, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const Wr = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, Ae = /* @__PURE__ */ Object.keys(Wr);
function Zd(t, e) {
  return t - e;
}
function Qd(t, e) {
  if (mt(e))
    return null;
  const s = t._adapter, { parser: n, round: i, isoWeekday: a } = t._parseOpts;
  let o = e;
  return typeof n == "function" && (o = n(o)), jt(o) || (o = typeof n == "string" ? s.parse(o, n) : s.parse(o)), o === null ? null : (i && (o = i === "week" && (fi(a) || a === !0) ? s.startOf(o, "isoWeek", a) : s.startOf(o, i)), +o);
}
function tf(t, e, s, n) {
  const i = Ae.length;
  for (let a = Ae.indexOf(t); a < i - 1; ++a) {
    const o = Wr[Ae[a]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - e) / (r * o.size)) <= n)
      return Ae[a];
  }
  return Ae[i - 1];
}
function nC(t, e, s, n, i) {
  for (let a = Ae.length - 1; a >= Ae.indexOf(s); a--) {
    const o = Ae[a];
    if (Wr[o].common && t._adapter.diff(i, n, o) >= e - 1)
      return o;
  }
  return Ae[s ? Ae.indexOf(s) : 0];
}
function iC(t) {
  for (let e = Ae.indexOf(t) + 1, s = Ae.length; e < s; ++e)
    if (Wr[Ae[e]].common)
      return Ae[e];
}
function ef(t, e, s) {
  if (!s)
    t[e] = !0;
  else if (s.length) {
    const { lo: n, hi: i } = ch(s, e), a = s[n] >= e ? s[n] : s[i];
    t[a] = !0;
  }
}
function aC(t, e, s, n) {
  const i = t._adapter, a = +i.startOf(e[0].value, n), o = e[e.length - 1].value;
  let r, l;
  for (r = a; r <= o; r = +i.add(r, 1, n))
    l = s[r], l >= 0 && (e[l].major = !0);
  return e;
}
function sf(t, e, s) {
  const n = [], i = {}, a = e.length;
  let o, r;
  for (o = 0; o < a; ++o)
    r = e[o], i[r] = o, n.push({
      value: r,
      major: !1
    });
  return a === 0 || !s ? n : aC(t, n, i, s);
}
class Sa extends Nn {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, s = {}) {
    const n = e.time || (e.time = {}), i = this._adapter = new fv._date(e.adapters.date);
    i.init(s), Xi(n.displayFormats, i.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(e), this._normalized = s.normalized;
  }
  parse(e, s) {
    return e === void 0 ? null : Qd(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const e = this.options, s = this._adapter, n = e.time.unit || "day";
    let { min: i, max: a, minDefined: o, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !o && !isNaN(c.min) && (i = Math.min(i, c.min)), !r && !isNaN(c.max) && (a = Math.max(a, c.max));
    }
    (!o || !r) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), i = jt(i) && !isNaN(i) ? i : +s.startOf(Date.now(), n), a = jt(a) && !isNaN(a) ? a : +s.endOf(Date.now(), n) + 1, this.min = Math.min(i, a - 1), this.max = Math.max(i + 1, a);
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let s = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return e.length && (s = e[0], n = e[e.length - 1]), {
      min: s,
      max: n
    };
  }
  buildTicks() {
    const e = this.options, s = e.time, n = e.ticks, i = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" && i.length && (this.min = this._userMin || i[0], this.max = this._userMax || i[i.length - 1]);
    const a = this.min, o = this.max, r = N_(i, a, o);
    return this._unit = s.unit || (n.autoSkip ? tf(s.minUnit, this.min, this.max, this._getLabelCapacity(a)) : nC(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : iC(this._unit), this.initOffsets(i), e.reverse && r.reverse(), sf(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let s = 0, n = 0, i, a;
    this.options.offset && e.length && (i = this.getDecimalForValue(e[0]), e.length === 1 ? s = 1 - i : s = (this.getDecimalForValue(e[1]) - i) / 2, a = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? n = a : n = (a - this.getDecimalForValue(e[e.length - 2])) / 2);
    const o = e.length < 3 ? 0.5 : 0.25;
    s = se(s, 0, o), n = se(n, 0, o), this._offsets = {
      start: s,
      end: n,
      factor: 1 / (s + 1 + n)
    };
  }
  _generate() {
    const e = this._adapter, s = this.min, n = this.max, i = this.options, a = i.time, o = a.unit || tf(a.minUnit, s, n, this._getLabelCapacity(s)), r = ut(i.ticks.stepSize, 1), l = o === "week" ? a.isoWeekday : !1, c = fi(l) || l === !0, h = {};
    let u = s, d, p;
    if (c && (u = +e.startOf(u, "isoWeek", l)), u = +e.startOf(u, c ? "day" : o), e.diff(n, s, o) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + o);
    const f = i.ticks.source === "data" && this.getDataTimestamps();
    for (d = u, p = 0; d < n; d = +e.add(d, r, o), p++)
      ef(h, d, f);
    return (d === n || i.bounds === "ticks" || p === 1) && ef(h, d, f), Object.keys(h).sort(Zd).map((g) => +g);
  }
  getLabelForValue(e) {
    const s = this._adapter, n = this.options.time;
    return n.tooltipFormat ? s.format(e, n.tooltipFormat) : s.format(e, n.displayFormats.datetime);
  }
  format(e, s) {
    const i = this.options.time.displayFormats, a = this._unit, o = s || i[a];
    return this._adapter.format(e, o);
  }
  _tickFormatFunction(e, s, n, i) {
    const a = this.options, o = a.ticks.callback;
    if (o)
      return Rt(o, [
        e,
        s,
        n
      ], this);
    const r = a.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && r[l], u = c && r[c], d = n[s], p = c && u && d && d.major;
    return this._adapter.format(e, i || (p ? u : h));
  }
  generateTickLabels(e) {
    let s, n, i;
    for (s = 0, n = e.length; s < n; ++s)
      i = e[s], i.label = this._tickFormatFunction(i.value, s, e);
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const s = this._offsets, n = this.getDecimalForValue(e);
    return this.getPixelForDecimal((s.start + n) * s.factor);
  }
  getValueForPixel(e) {
    const s = this._offsets, n = this.getDecimalForPixel(e) / s.factor - s.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(e) {
    const s = this.options.ticks, n = this.ctx.measureText(e).width, i = ze(this.isHorizontal() ? s.maxRotation : s.minRotation), a = Math.cos(i), o = Math.sin(i), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * a + r * o,
      h: n * o + r * a
    };
  }
  _getLabelCapacity(e) {
    const s = this.options.time, n = s.displayFormats, i = n[s.unit] || n.millisecond, a = this._tickFormatFunction(e, 0, sf(this, [
      e
    ], this._majorUnit), i), o = this._getLabelSize(a), r = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [], s, n;
    if (e.length)
      return e;
    const i = this.getMatchingVisibleMetas();
    if (this._normalized && i.length)
      return this._cache.data = i[0].controller.getAllParsedValues(this);
    for (s = 0, n = i.length; s < n; ++s)
      e = e.concat(i[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(e);
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let s, n;
    if (e.length)
      return e;
    const i = this.getLabels();
    for (s = 0, n = i.length; s < n; ++s)
      e.push(Qd(this, i[s]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return Yg(e.sort(Zd));
  }
}
Q(Sa, "id", "time"), Q(Sa, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function uo(t, e, s) {
  let n = 0, i = t.length - 1, a, o, r, l;
  s ? (e >= t[n].pos && e <= t[i].pos && ({ lo: n, hi: i } = vs(t, "pos", e)), { pos: a, time: r } = t[n], { pos: o, time: l } = t[i]) : (e >= t[n].time && e <= t[i].time && ({ lo: n, hi: i } = vs(t, "time", e)), { time: a, pos: r } = t[n], { time: o, pos: l } = t[i]);
  const c = o - a;
  return c ? r + (l - r) * (e - a) / c : r;
}
class dc extends Sa {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(e);
    this._minPos = uo(s, this.min), this._tableRange = uo(s, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: s, max: n } = this, i = [], a = [];
    let o, r, l, c, h;
    for (o = 0, r = e.length; o < r; ++o)
      c = e[o], c >= s && c <= n && i.push(c);
    if (i.length < 2)
      return [
        {
          time: s,
          pos: 0
        },
        {
          time: n,
          pos: 1
        }
      ];
    for (o = 0, r = i.length; o < r; ++o)
      h = i[o + 1], l = i[o - 1], c = i[o], Math.round((h + l) / 2) !== c && a.push({
        time: c,
        pos: o / (r - 1)
      });
    return a;
  }
  _generate() {
    const e = this.min, s = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(e) || !n.length) && n.splice(0, 0, e), (!n.includes(s) || n.length === 1) && n.push(s), n.sort((i, a) => i - a);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const s = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return s.length && n.length ? e = this.normalize(s.concat(n)) : e = s.length ? s : n, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (uo(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const s = this._offsets, n = this.getDecimalForPixel(e) / s.factor - s.end;
    return uo(this._table, n * this._tableRange + this._minPos, !0);
  }
}
Q(dc, "id", "timeseries"), Q(dc, "defaults", Sa.defaults);
var oC = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: lc,
  LinearScale: cc,
  LogarithmicScale: hc,
  RadialLinearScale: ji,
  TimeScale: Sa,
  TimeSeriesScale: dc
});
const rC = [
  dv,
  HS,
  Nw,
  oC
];
ur.register(...rC);
const it = "https://slowfootball.club/api", Ot = "Arsenal", lC = "https://sf-game-proxy.ofersi15.workers.dev/token", ea = ["north", "south", "europa", "world", "conference", "hipster"], _l = /* @__PURE__ */ new Set(["Barcelona", "Bayern Munich", "Juventus", "Damac", "Saudi All-Stars", "Inter Miami"]), fo = ["GK", "FB", "CB", "DM", "AM", "WF", "CF"], fc = ["FB", "CB", "DM", "AM", "WF", "CF"], xl = 100, zn = "sf_tactics_v4", cC = 7 * 24 * 60 * 60 * 1e3, Gn = "sf_players_v6", po = "sf_stats_v1", hC = 6 * 60 * 60 * 1e3, uC = 7 * 24 * 60 * 60 * 1e3, dC = 6 * 60 * 60 * 1e3, nf = "sf_submissions_all_v1", go = "sf_subs_ls", mi = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  DM: ["Tackling", "Passing", "Vision", "Marking"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, af = {
  GK: "Han, Ref, Spd, Pas",
  FB: "Pas, Tck, Sta, Mk",
  CB: "Mk, Hdg, Tck, Spd",
  DM: "Tck, Pas, Vis, Mk",
  AM: "Pas, Drb, Sh, Vis",
  WF: "Drb, Pas, Spd, Sh",
  CF: "Spd, Drb, Hdg, Sh"
}, Nm = {
  GK: ["GK"],
  CB: ["CB", "FB", "DM"],
  FB: ["FB", "CB", "DM"],
  DM: ["DM", "FB", "CB", "AM"],
  CM: ["CM", "DM", "AM"],
  AM: ["AM", "WF", "CF", "DM"],
  WM: ["FB", "DM", "AM", "WF"],
  WF: ["WF", "AM", "CF"],
  CF: ["CF", "WF", "AM"]
}, fC = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  DM: ["Tackling", "Marking", "Passing", "Vision"],
  CM: ["Passing", "Vision", "Tackling", "Dribbling"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WM: ["Stamina", "Passing", "Speed", "Dribbling"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, of = ["Mentality", "Experience", "Work rate"], bn = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision"], pc = [...bn, "Mentality", "Experience", "Leadership", "Work rate"], rf = [...pc, "Adaptability", "Form", "Confidence"], xh = {
  442: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "CF", "CF"],
  4411: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "AM", "CF"],
  4231: ["GK", "FB", "CB", "CB", "FB", "DM", "DM", "WF", "AM", "WF", "CF"],
  433: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "WF", "WF", "CF"],
  4321: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "AM", "AM", "CF"],
  3421: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "AM", "AM", "CF"],
  352: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "CM", "WM", "CF", "CF"],
  343: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "WF", "CF", "WF"]
}, pC = {
  442: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 55 }, { x: 44, y: 55 }, { x: 24, y: 55 }, { x: 9, y: 55 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  4411: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 57 }, { x: 44, y: 57 }, { x: 24, y: 57 }, { x: 9, y: 57 }, { x: 34, y: 35 }, { x: 34, y: 13 }],
  4231: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 45, y: 63 }, { x: 23, y: 63 }, { x: 58, y: 40 }, { x: 34, y: 40 }, { x: 10, y: 40 }, { x: 34, y: 13 }],
  433: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 48, y: 56 }, { x: 34, y: 56 }, { x: 20, y: 56 }, { x: 58, y: 28 }, { x: 10, y: 28 }, { x: 34, y: 13 }],
  3421: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 44, y: 35 }, { x: 24, y: 35 }, { x: 34, y: 13 }],
  352: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 61, y: 58 }, { x: 46, y: 58 }, { x: 34, y: 58 }, { x: 22, y: 58 }, { x: 7, y: 58 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  343: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 58, y: 20 }, { x: 34, y: 13 }, { x: 10, y: 20 }],
  4321: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 50, y: 60 }, { x: 34, y: 60 }, { x: 18, y: 60 }, { x: 44, y: 37 }, { x: 24, y: 37 }, { x: 34, y: 13 }]
}, lf = { GK: 0, CB: 1, FB: 2, DM: 3, CM: 4, WM: 5, AM: 6, WF: 7, CF: 8 }, cf = {
  GK: { fill: "#2d4a1a", stroke: "#7ee787", text: "#7ee787" },
  FB: { fill: "#1a3a5e", stroke: "#79c0ff", text: "#79c0ff" },
  CB: { fill: "#1a3060", stroke: "#79c0ff", text: "#79c0ff" },
  DM: { fill: "#3a2a6b", stroke: "#d2a8ff", text: "#d2a8ff" },
  CM: { fill: "#3a2a1a", stroke: "#ffa657", text: "#ffa657" },
  WM: { fill: "#3a1a3a", stroke: "#d2a8ff", text: "#d2a8ff" },
  AM: { fill: "#4a3a10", stroke: "#ffa657", text: "#ffa657" },
  WF: { fill: "#3a1a1a", stroke: "#ff7b72", text: "#ff7b72" },
  CF: { fill: "#5a1010", stroke: "#ff7b72", text: "#ff7b72" }
}, gc = (/* @__PURE__ */ new Date("2025-08-23T00:00:00Z")).getTime(), Bm = 7 * 24 * 60 * 60 * 1e3;
function is(t, e) {
  const s = mi[e];
  if (!s) return null;
  const n = s.map((i) => t[i]).filter((i) => i != null && i > 0);
  return n.length ? Math.round(n.reduce((i, a) => i + a, 0) / n.length * 10) / 10 : null;
}
function wa(t, e, s, n) {
  const i = is(t, e);
  if (i === null) return null;
  if (!n || !s.length) return i;
  const a = s.map((l) => t[l]).filter((l) => l != null && l > 0);
  if (!a.length) return i;
  const o = a.reduce((l, c) => l + c, 0) / a.length, r = n / 100;
  return Math.round((i * (1 - r) + o * r) * 10) / 10;
}
function gC(t) {
  if (!t.Value || !t.Rating) return null;
  const e = t.Rating, s = t.Age || 26, n = e >= 87 ? 4 : e >= 84 ? 3 : e >= 81 ? 2.2 : e >= 78 ? 1.7 : e >= 75 ? 1.3 : 1, i = s <= 22 ? 1.5 : s <= 25 ? 1.3 : s <= 28 ? 1 : s <= 31 ? 0.75 : 0.5, a = t.Value * n * i;
  return Math.round(a / 5e5) * 5e5 || Math.round(a / 1e5) * 1e5;
}
function mC(t) {
  if (!t) return "";
  const e = (o) => o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), s = (o) => e(o).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[^\w])_([^_]+)_(?!\w)/g, "$1<em>$2</em>");
  let n = "", i = null;
  const a = () => {
    i && (n += i === "ul" ? "</ul>" : "</ol>", i = null);
  };
  for (const o of String(t).split(`
`)) {
    const r = o.trim(), l = /^(#{1,4})\s+(.*)$/.exec(r), c = /^[-*]\s+(.*)$/.exec(r), h = /^\d+[.)]\s+(.*)$/.exec(r);
    if (l) {
      a();
      const u = Math.min(l[1].length + 2, 6);
      n += `<h${u}>${s(l[2])}</h${u}>`;
    } else c ? (i !== "ul" && (a(), n += "<ul>", i = "ul"), n += `<li>${s(c[1])}</li>`) : h ? (i !== "ol" && (a(), n += "<ol>", i = "ol"), n += `<li>${s(h[1])}</li>`) : r === "" ? a() : (a(), n += `<p>${s(r)}</p>`);
  }
  return a(), n;
}
function Hs(t) {
  return t >= 1e6 ? `£${(t / 1e6).toFixed(1)}m` : t >= 1e3 ? `£${(t / 1e3).toFixed(0)}k` : t ? `£${t}` : "—";
}
function yC(t) {
  return t ? `£${(t / 1e3).toFixed(0)}k/w` : "—";
}
function bC(t) {
  return t == null ? "—" : (t >= 0 ? "+" : "") + t.toFixed(2);
}
function Lo(t) {
  return t ? String(t).split("").join("-") : null;
}
function Ri(t) {
  return t ? String(t).replace(/-/g, "") : null;
}
function _C(t) {
  return t ? {
    withdrawn: "↩ Withdrawn",
    declined: "✗ Declined",
    agreed: "✓ Agreed",
    offer: "Offer out",
    finalised: "✓ Done",
    moved_elsewhere: "Went elsewhere",
    adjusted: "Adjusted",
    closed: "Closed",
    finalising: "Finalising…",
    outbid: "Outbid",
    counter_rejected: "Counter rejected",
    won: "✓ Won",
    insufficient_funds: "$ Insufficient",
    "auction-bid": "Auction bid"
  }[t] || t : "—";
}
function xC(t) {
  if (!t) return "—";
  const e = new Date(t);
  if (isNaN(e.getTime())) return "—";
  const s = Date.now() - e.getTime();
  return s < 6e4 ? "just now" : s < 36e5 ? Math.floor(s / 6e4) + "m ago" : s < 864e5 ? Math.floor(s / 36e5) + "h ago" : s < 7 * 864e5 ? Math.floor(s / 864e5) + "d ago" : e.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
function Hr() {
  return Math.max(0, Math.round((Date.now() - gc) / Bm));
}
function Ca(t, e, s) {
  const n = (r) => String(r || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(), i = n(t), a = n(e), o = (s || []).filter((r) => n(r.playerName || r.player || r.name || "") === i && n(r.toClub || r.buyer || r.buyerClub || r.to || "") === a).map((r) => {
    const l = r.ts || r.updatedAt || r.createdAt || r.date;
    if (!l) return null;
    const c = new Date(l).getTime();
    return !c || c < gc ? 0 : Math.round((c - gc) / Bm);
  }).filter((r) => r !== null).sort((r, l) => r - l);
  return o.length ? Math.max(0, Hr() - o[0]) : null;
}
function mc(t) {
  const e = t.Position || "", s = (a) => Number(t[a] || 0), n = [];
  (e === "CF" || e === "WF") && (s("Shooting") >= 80 && n.push({ n: "Clinical Finisher", d: "Consistently puts away their chances." }), s("Speed") >= 82 && n.push({ n: "Pace Merchant", d: "Explosive behind defensive lines." }), s("Heading") >= 80 && e === "CF" && n.push({ n: "Aerial Threat", d: "Dominant in the air from crosses and corners." }), s("Dribbling") >= 80 && n.push({ n: "Close Control", d: "Exceptional in tight areas, difficult to dispossess." })), (e === "CM" || e === "AM" || e === "DM") && (s("Vision") >= 82 && n.push({ n: "Visionary", d: "Sees passes others miss. Finds runners in behind." }), s("Passing") >= 82 && n.push({ n: "Metronome", d: "High pass completion with the range to switch play." }), e === "DM" && s("Tackling") >= 80 && n.push({ n: "Ball Winner", d: "Reads attacks early to break up play." }), s("Dribbling") >= 80 && n.push({ n: "Carrier", d: "Drives through midfield under pressure." })), (e === "CB" || e === "FB") && (s("Tackling") >= 82 && n.push({ n: "Tackle Machine", d: "Ferocious in the challenge." }), s("Heading") >= 82 && n.push({ n: "Aerial Dominator", d: "Set piece threat at both ends of the pitch." }), s("Passing") >= 78 && n.push({ n: "Distribution", d: "Comfortable on the ball, plays out from the back." }), e === "FB" && s("Speed") >= 80 && n.push({ n: "Overlap Merchant", d: "Creates width and overloads in wide areas." })), e === "GK" && (s("Reflexes") >= 82 && n.push({ n: "Reaction Royalty", d: "Makes saves that look impossible." }), s("Handling") >= 80 && n.push({ n: "Safe Hands", d: "Commanding under crosses." }), s("Speed") >= 72 && n.push({ n: "Sweeper Keeper", d: "Comfortable with the ball at their feet." }));
  const i = mi[e] || [];
  if (i.length && i.reduce((o, r) => o + s(r), 0) / i.length >= 83) {
    const o = t.Archetype || t.archetype || e;
    n.push({ n: `Complete ${o}`, d: "Exceptionally well-rounded — no significant weaknesses." });
  }
  return n.slice(0, 4);
}
function $m(t, e, s) {
  if (!t || !t.Player || !t.Club) return [];
  const n = Hr(), i = Ca(t.Player, t.Club, s) ?? n, a = t.Nationality || "";
  return (e || []).filter((o) => o.Player !== t.Player && o.Position).slice(0, 12).map((o) => {
    const r = Ca(o.Player, t.Club, s) ?? n, l = Math.min(i, r);
    if (l < 13) return null;
    const c = !!(a && a === (o.Nationality || "")), h = l >= 30 || c && l >= 25 ? "great" : "good", u = l >= 60 ? "Long-term" : l >= 30 ? "Established" : "Building";
    return { name: o.Player, pos: o.Position, weeks: l, category: h, label: u, sameNat: c };
  }).filter(Boolean).sort((o, r) => r.weeks - o.weeks);
}
function vC(t, e) {
  const [s, n] = [t, e].sort(), i = s + "" + n;
  let a = 2166136261;
  for (let o = 0; o < i.length; o++)
    a ^= i.charCodeAt(o), a = Math.imul(a, 16777619) >>> 0;
  return a % 100;
}
function vh(t, e, s) {
  if (!t || !t.Player || !t.Club) return [];
  const n = Hr(), i = Ca(t.Player, t.Club, s) ?? n;
  return (e || []).filter((a) => a.Player !== t.Player && a.Position).map((a) => {
    const o = Ca(a.Player, t.Club, s) ?? n, r = Math.min(i, o);
    return r < 13 || vC(t.Player, a.Player) >= 7 ? null : { name: a.Player, pos: a.Position, weeks: r };
  }).filter(Boolean).sort((a, o) => o.weeks - a.weeks);
}
function jm(t, e) {
  if (!t || t.length < 2) return null;
  const s = t[0].Club;
  if (!s) return null;
  const n = Hr(), i = t.map((r) => Ca(r.Player, s, e) ?? n);
  let a = 0, o = 0;
  for (let r = 0; r < i.length; r++)
    for (let l = r + 1; l < i.length; l++)
      a += Math.min(i[r], i[l]) / 60, o++;
  return o ? Math.min(100, Math.round(a / o * 100)) : null;
}
function Mn(t) {
  return typeof Worker > "u" ? Promise.resolve(JSON.parse(t)) : new Promise((e, s) => {
    const n = new Blob(
      ["self.onmessage=e=>{try{postMessage({r:JSON.parse(e.data)})}catch(x){postMessage({e:String(x)})}}"],
      { type: "text/javascript" }
    ), i = URL.createObjectURL(n), a = new Worker(i);
    a.onmessage = ({ data: o }) => {
      a.terminate(), URL.revokeObjectURL(i), o.r !== void 0 ? e(o.r) : s(new Error(o.e));
    }, a.onerror = (o) => {
      a.terminate(), URL.revokeObjectURL(i), s(o);
    }, a.postMessage(t);
  });
}
function yc(t) {
  return typeof Worker > "u" ? Promise.resolve(JSON.stringify(t)) : new Promise((e, s) => {
    const n = new Blob(
      ["self.onmessage=e=>{try{postMessage(JSON.stringify(e.data))}catch(x){postMessage({__e:String(x)})}}"],
      { type: "text/javascript" }
    ), i = URL.createObjectURL(n), a = new Worker(i);
    a.onmessage = ({ data: o }) => {
      a.terminate(), URL.revokeObjectURL(i), typeof o == "string" ? e(o) : s(new Error((o == null ? void 0 : o.__e) || "stringify failed"));
    }, a.onerror = (o) => {
      a.terminate(), URL.revokeObjectURL(i), s(o);
    }, a.postMessage(t);
  });
}
let mo = null;
async function vl() {
  return mo || (mo = (await fetch(lC).then((e) => e.json())).token || null, mo);
}
const ms = location.hostname === "sf.ofersi15.workers.dev" ? "https://sf-cache.ofersi15.workers.dev/sf-cache" : "/sf-cache", sa = "https://sf-cache.ofersi15.workers.dev";
async function kt(t, e = !1) {
  if (location.protocol === "file:") return null;
  try {
    const s = { signal: AbortSignal.timeout(3e3) };
    e && (s.cache = "no-store");
    const n = await fetch(`${ms}/${t}`, s);
    return n.ok ? await n.text() : null;
  } catch {
    return null;
  }
}
async function Ke(t, e) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${ms}/${t}?permanent=1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: e,
        signal: AbortSignal.timeout(5e3)
      });
    } catch {
    }
}
async function hf(t) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${ms}/${t}`, { method: "DELETE", signal: AbortSignal.timeout(3e3) });
    } catch {
    }
}
const SC = {
  async loadYouth(t = !1) {
    var r, l, c, h, u, d, p;
    const e = "sf_youth_idx_v2";
    if (this.youthLoading) return;
    this.youthLoading = !0, this.youthLoaded = !1;
    const a = (f, g) => {
      this.youthCap = f.cap || {}, this.youthScouts = (f.scouts || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthAcademy = f.academy || [], this.youthFacilities = f.facilities || {}, this.youthStaff = f.staff || {}, this.youthRejected = (g || f.rejected || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthLoaded = !0, this.youthMsg = "", this.youthScouts.length ? this.youthSubTab = "scouts" : this.youthAcademy.length ? this.youthSubTab = "academy" : this.youthSubTab = "history";
    }, o = (f) => (f || []).map((g) => {
      const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"].filter((_) => this.getYouthAttr(g, _) > 0).length;
      return { ...g, _partial: m < 5 };
    });
    if (!t)
      try {
        let f = await kt(e);
        f || (f = localStorage.getItem(e));
        const g = f ? JSON.parse(f) : null;
        if (g) {
          const m = Date.now(), _ = m - (g.savedAt || 0), y = m - (g.histSavedAt || 0), b = m - (g.staticSavedAt || 0), x = encodeURIComponent(Ot);
          if (a(g), this.youthLoading = !1, !(_ >= 6e5 || y >= 36e5 || b >= 36e5)) return;
          if (y < 36e5) {
            setTimeout(async () => {
              try {
                const k = _ >= 6e5, S = b >= 36e5, [C, D, O, I] = await Promise.all([
                  k ? fetch(`${it}/scouting/jobs?club=${x}`).then((E) => E.json()) : Promise.resolve(null),
                  k ? fetch(`${it}/academy?club=${x}`).then((E) => E.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/facilities?club=${x}`).then((E) => E.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/staff/effects?club=${x}`).then((E) => E.json()) : Promise.resolve(null)
                ]), w = {
                  ...g,
                  savedAt: k ? m : g.savedAt,
                  staticSavedAt: S ? m : g.staticSavedAt,
                  ...k ? { cap: C.cap || {}, scouts: C.items || [], academy: o(D.items) } : {},
                  ...S ? { facilities: O || {}, staff: (I && I.ok ? I.effects : {}) || {} } : {}
                };
                try {
                  localStorage.setItem(e, JSON.stringify(w));
                } catch {
                }
                a(w);
              } catch {
              }
            }, 100);
            return;
          }
        }
      } catch {
      }
    this.youthMsg = this.youthLoaded ? "" : "Fetching scouting data…";
    try {
      const f = encodeURIComponent(Ot), [g, m, _, y] = await Promise.all([
        fetch(`${it}/scouting/jobs?club=${f}`).then((L) => L.json()),
        fetch(`${it}/academy?club=${f}`).then((L) => L.json()),
        fetch(`${it}/facilities?club=${f}`).then((L) => L.json()),
        fetch(`${it}/staff/effects?club=${f}`).then((L) => L.json())
      ]);
      this.youthMsg = "Fetching scout history…";
      const [b, x] = await Promise.all([
        fetch(`${it}/scouting/jobs?club=${f}&status=rejected`).then((L) => L.json()),
        fetch(`${it}/scouting/jobs?club=${f}&status=accepted`).then((L) => L.json()).catch(() => ({}))
      ]), v = m.items || [], k = {};
      for (const L of x.items || []) {
        const P = (((r = L.player) == null ? void 0 : r.name) || ((l = L.player) == null ? void 0 : l.Player) || "").toLowerCase();
        P && (k[P] = L.player);
      }
      for (const L of v) {
        const P = (L.name || L.Player || "").toLowerCase(), M = k[P];
        M && (pc.forEach((T) => {
          M[T] != null && L[T] == null && (L[T] = M[T]);
        }), M.stats && pc.forEach((T) => {
          M.stats[T] != null && L[T] == null && (L[T] = M.stats[T]);
        }));
      }
      const S = o(v), C = (y.ok ? y.effects : {}) || {}, D = Date.now(), O = {
        savedAt: D,
        histSavedAt: D,
        staticSavedAt: D,
        cap: g.cap || {},
        scouts: g.items || [],
        academy: S,
        facilities: _ || {},
        staff: C,
        rejected: b.items || []
      };
      Ke(e, JSON.stringify(O));
      try {
        localStorage.setItem(e, JSON.stringify(O));
      } catch {
      }
      a(O, b.items);
      for (const L of [...g.items || [], ...b.items || []]) {
        const P = (c = L.player) == null ? void 0 : c.stats;
        if (!P || !Object.keys(P).length) continue;
        const M = (L.player.name || L.player.Player || "").toLowerCase();
        if (!M) continue;
        const T = this.players.find((F) => (F.Name || F.name || "").toLowerCase() === M);
        T && T._incompleteStats && (Object.assign(T, P), T._incompleteStats = bn.filter((F) => T[F] != null && T[F] > 0).length < 5);
      }
      const I = bn, w = (L) => L && (I.filter((P) => L[P] != null && L[P] > 0).length >= 5 || L.stats && I.filter((P) => L.stats[P] != null && L.stats[P] > 0).length >= 5), E = (g.items || []).filter((L) => L.player && !w(L.player));
      if (E.length) {
        const L = [...new Set(E.map((T) => {
          var F, H;
          return ((F = T.player) == null ? void 0 : F.club) || ((H = T.player) == null ? void 0 : H.Club);
        }).filter(Boolean))], P = {};
        await Promise.all(L.map(async (T) => {
          try {
            const F = await fetch(`${it}/squads?club=${encodeURIComponent(T)}`).then((H) => H.json());
            P[T.toLowerCase()] = F.players || [];
          } catch {
          }
        }));
        const M = rf;
        for (const T of E) {
          const F = (((h = T.player) == null ? void 0 : h.club) || ((u = T.player) == null ? void 0 : u.Club) || "").toLowerCase(), H = P[F] || [], Y = (((d = T.player) == null ? void 0 : d.name) || ((p = T.player) == null ? void 0 : p.Player) || "").toLowerCase(), Z = H.find((nt) => (nt.Player || "").toLowerCase() === Y);
          Z && (M.forEach((nt) => {
            Z[nt] != null && (T.player[nt] = Z[nt]);
          }), Z.Rating && (T.player.rating = Z.Rating), Z.Value && (T.player.value = Z.Value), Z.Age && (T.player.age = Z.Age));
        }
        O.scouts = g.items || [], Ke(e, JSON.stringify(O));
        try {
          localStorage.setItem(e, JSON.stringify(O));
        } catch {
        }
        a(O, b.items);
      }
    } catch (f) {
      this.youthMsg = "Load failed: " + (f.message || String(f));
    }
    this.youthLoading = !1;
  },
  async refreshYouthJob(t) {
    if (!t._refreshing) {
      t._refreshing = !0, t._refreshed = !1, t._refreshFailed = !1;
      try {
        const e = t.player.club || t.player.Club || "", n = (await fetch(`${it}/squads?club=${encodeURIComponent(e)}`).then((o) => o.json())).players || [], i = (t.player.name || t.player.Player || "").toLowerCase(), a = n.find((o) => (o.Player || "").toLowerCase() === i);
        if (a) {
          const o = ["Speed", "Stamina", "Dribbling", "Passing", "Shooting", "Tackling", "Marking", "Heading", "Vision", "Handling", "Reflexes", "Strength", "Mentality", "Experience", "Leadership", "Work rate", "Adaptability", "Form", "Confidence"], r = {};
          if (o.forEach((l) => {
            a[l] != null && (r[l] = a[l]);
          }), Object.assign(t.player, r, {
            _refreshedAt: (/* @__PURE__ */ new Date()).toLocaleString(),
            rating: a.Rating || a._gameRating || t.player.rating,
            value: a.Value || t.player.value,
            age: a.Age || t.player.age
          }), t._refreshed = !0, this.selectedPlayer) {
            const l = (this.selectedPlayer.Player || this.selectedPlayer.name || "").toLowerCase();
            l && l === i && (this.selectedPlayer = { ...this.selectedPlayer, ...r });
          }
        } else
          t._refreshFailed = !0;
      } catch {
        t._refreshFailed = !0;
      }
      t._refreshing = !1;
    }
  },
  // ── All-clubs history methods ──
  youthClubMaxRating(t) {
    const e = this.youthAllHistoryJobs.filter((s) => s._club === t);
    return e.length ? Math.max(...e.map((s) => {
      var n;
      return ((n = s.player) == null ? void 0 : n.rating) || 0;
    })) : 0;
  },
  youthClubAvgRating(t) {
    const e = this.youthAllHistoryJobs.filter((s) => {
      var n;
      return s._club === t && ((n = s.player) == null ? void 0 : n.rating);
    });
    return e.length ? e.reduce((s, n) => s + (n.player.rating || 0), 0) / e.length : 0;
  },
  async loadYouthHistory(t = !1) {
    var n, i, a, o, r;
    const e = "sf_youth_hist_v2";
    if (!t)
      try {
        let l = await kt(e);
        if (l || (l = localStorage.getItem(e)), l) {
          const { data: c, ts: h } = JSON.parse(l);
          if (Date.now() - h < 864e5) {
            this.youthAllHistoryJobs = (c.jobs || []).map((u) => ({ ...u, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthClubInfoMap = c.clubInfo || {}, this.youthHistLoaded = !0, this.youthHistCacheDate = new Date(h).toLocaleString();
            return;
          }
        }
      } catch {
      }
    this.youthHistLoading = !0, this.youthHistLoaded = !1, this.youthHistMsg = "Fetching club list…", this.youthHistProgress = 0;
    try {
      const [l, c] = await Promise.all([
        fetch(`${it}/managers`).then((x) => x.json()),
        fetch(`${it}/admin/squads/public/clubs`).then((x) => x.json())
      ]), h = new Set(
        (l.managers || []).filter((x) => {
          var v;
          return x.club && !((v = x.username) != null && v.includes("~deleted~"));
        }).map((x) => x.club)
      ), u = (c.clubs || []).filter((x) => h.has(x)), d = [], p = {}, f = 5;
      for (let x = 0; x < u.length; x += f) {
        const v = u.slice(x, x + f);
        this.youthHistMsg = `Scanning clubs ${Math.min(x + f, u.length)}/${u.length}…`, this.youthHistProgress = Math.round(Math.min(x + f, u.length) / u.length * 100), await Promise.all(v.map(async (k) => {
          const S = encodeURIComponent(k);
          try {
            const [C, D, O] = await Promise.all([
              fetch(`${it}/scouting/jobs?club=${S}&status=rejected`).then((P) => P.json()),
              fetch(`${it}/scouting/jobs?club=${S}`).then((P) => P.json()),
              fetch(`${it}/scouting/jobs?club=${S}&status=accepted`).then((P) => P.json())
            ]), I = (C.items || []).map((P) => ({ ...P, _jobStatus: P.status || "rejected" })), w = (D.items || []).map((P) => ({ ...P, _jobStatus: P.status || "active" })), E = (O.items || []).map((P) => ({ ...P, _jobStatus: "accepted" })), L = [...w, ...I, ...E];
            if (L.length > 0) {
              const [P, M] = await Promise.all([
                fetch(`${it}/facilities?club=${S}`).then((T) => T.json()).catch(() => ({})),
                fetch(`${it}/staff/effects?club=${S}`).then((T) => T.json()).catch(() => ({}))
              ]);
              L.forEach((T) => d.push({ ...T, _club: k })), p[k] = {
                facilities: P || {},
                staff: (M.ok ? M.effects : {}) || {}
              };
            }
          } catch {
          }
        })), await new Promise((k) => setTimeout(k, 80));
      }
      const g = bn, m = (x) => x && (g.filter((v) => x[v] != null && x[v] > 0).length >= 5 || x.stats && g.filter((v) => x.stats[v] != null && x.stats[v] > 0).length >= 5), _ = d.filter((x) => x.player && !m(x.player));
      if (_.length) {
        this.youthHistMsg = `Enriching attributes for ${_.length} players…`;
        const x = [...new Set(_.map((C) => {
          var D, O;
          return ((D = C.player) == null ? void 0 : D.club) || ((O = C.player) == null ? void 0 : O.Club);
        }).filter(Boolean))], v = {}, k = 4;
        for (let C = 0; C < x.length; C += k)
          await Promise.all(x.slice(C, C + k).map(async (D) => {
            try {
              const O = await fetch(`${it}/squads?club=${encodeURIComponent(D)}`).then((I) => I.json());
              v[D.toLowerCase()] = O.players || [];
            } catch {
            }
          }));
        const S = rf;
        for (const C of _) {
          const D = (((n = C.player) == null ? void 0 : n.club) || ((i = C.player) == null ? void 0 : i.Club) || "").toLowerCase(), O = v[D] || [], I = (((a = C.player) == null ? void 0 : a.name) || ((o = C.player) == null ? void 0 : o.Player) || "").toLowerCase(), w = O.find((E) => (E.Player || "").toLowerCase() === I);
          w && (S.forEach((E) => {
            w[E] != null && (C.player[E] = w[E]);
          }), w.Rating && (C.player.rating = w.Rating), w.Value && (C.player.value = w.Value), w.Age && (C.player.age = w.Age));
        }
      }
      const y = JSON.stringify({ data: { jobs: d, clubInfo: p }, ts: Date.now() });
      try {
        localStorage.setItem(e, y);
      } catch {
      }
      Ke(e, y).catch(() => {
      });
      const b = d.filter((x) => {
        var v;
        return x._jobStatus === "accepted" && ((v = x.player) == null ? void 0 : v.stats) && Object.keys(x.player.stats).length >= 11;
      });
      if (b.length && ((r = this.allPlayers) != null && r.length)) {
        const x = { n: 0 };
        this.allPlayers = this.allPlayers.map((v) => {
          if (!v._incompleteStats) return v;
          const k = (v.Player || "").toLowerCase(), S = b.find((D) => (D.player.name || "").toLowerCase() === k);
          if (!S) return v;
          x.n++;
          const C = { ...v, ...S.player.stats };
          return C._incompleteStats = bn.filter((D) => C[D] != null && C[D] > 0).length < 5, C;
        }), x.n && console.log(`[SF] enriched ${x.n} incomplete players from accepted scouting jobs`);
      }
      this.youthAllHistoryJobs = d.map((x) => ({ ...x, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthClubInfoMap = p, this.youthHistLoaded = !0, this.youthHistCacheDate = (/* @__PURE__ */ new Date()).toLocaleString(), this.youthHistMsg = "";
    } catch (l) {
      this.youthHistMsg = "Load failed: " + (l.message || String(l));
    }
    this.youthHistLoading = !1;
  },
  // ── Club tab helpers ──
  facDescription(t, e) {
    var i;
    const s = Math.max(1, Math.min(5, e || 1));
    return ((i = {
      stadium: { 1: "30,000 seats, but not a decent pie in sight.", 2: "Capacity of 40,000. Still has library tendencies.", 3: "One of the biggest grounds in the land, but needs a lick of paint.", 4: "60,000 seats and almost as many food options.", 5: "Iconic venue. A fortress and a cash machine." },
      training: { 1: "You train on a primary school's playing field. Degrading.", 2: "Local leisure centre. Functional, but sharing with OAP tai-chi on Wednesdays.", 3: "A plot of land the plastic fan local MP awarded the club after a back-hander.", 4: "Club-controlled site with good surfaces and gym.", 5: "High-performance centre with dedicated staff and kit." },
      scouting: { 1: "A dusty old fella in a rain mac who taps his nose a lot.", 2: "A couple of part-timers with long lenses.", 3: "Regional contacts and semi-regular reports.", 4: "Co-ordinated coverage across key markets.", 5: "Global reach, data-driven targets." },
      analytics: { 1: "The owner's son is a whizz on socials.", 2: "One intern with a spreadsheet and a dream.", 3: "Basic event data and templated reports.", 4: "Video and event pipelines with tagging.", 5: "Integrated modelling and pre/post-match packs." },
      academy: { 1: "Your kid and a couple of his mates, if you're lucky.", 2: "Community sessions with cones and bibs.", 3: "Age-group teams and part-time coaches.", 4: "Structured pathway with specialist coaches.", 5: "Category-standard academy with links to first team." },
      medical: { 1: "A magic sponge. Better be pretty bloody magical...", 2: "Tape, ice, and a rolly table in a cupboard.", 3: "Dedicated room with ultrasound and rehab kit.", 4: "Sports science staff and protocols.", 5: "Full sports medicine suite and monitoring." }
    }[t]) == null ? void 0 : i[s]) || "";
  },
  facBonus(t, e) {
    const s = Math.max(1, Math.min(5, e || 1));
    if (t === "training") {
      const n = Math.round((1 + 0.2 * (s - 1) - 1) * 100);
      return `${n === 0 ? "No XP cap bonus" : `Up to +${n}% XP cap`} · live XP & fatigue recovery rates shown below`;
    }
    if (t === "scouting") {
      const n = 3 + (s >= 5 ? 2 : s >= 4 ? 1 : 0), i = s >= 5 ? 2 : s >= 3 ? 1 : 0, a = s * 5;
      return `${n} active scout slots · +${i} quality boost · +${a}% scouting speed`;
    }
    if (t === "academy") {
      const n = s - 1, i = 0.03 + 0.01 * n, a = 0.12 + 0.02 * n, o = 0.3, r = 0.55, l = r + o + a + i, c = ((a + i) / l * 100).toFixed(1), h = (2 * r / l + 3 * o / l + 4 * a / l + 5 * i / l).toFixed(2);
      return `${c}% big-jump chance · ${h} avg training score`;
    }
    return t === "stadium" ? `${{ 1: "30,000", 2: "40,000", 3: "50,000", 4: "60,000", 5: "80,000" }[s]} seat capacity → matchday income · CEO quality via staff` : t === "medical" ? { 1: "No bonus", 2: "-3% weekly injury chance · +4% rehab speed", 3: "-6% weekly injury chance · +8% rehab speed", 4: "-10% weekly injury chance · +12% rehab speed", 5: "-14% weekly injury chance · +16% rehab speed" }[s] + " · Physio staff drives actual effect" : t === "analytics" ? `Formations unlocked: ${{ 1: "442 · 433 · 4231 · 532 · 343", 2: "+352 · 541 · 4411", 3: "+4321 · 451", 4: "+4141 · 442 D · 3421", 5: "+3241 · 4222 · 4132" }[s]} · automation via Responsibilities tab` : "Effects from staff quality";
  },
  facRef(t, e) {
    if (e = Math.max(1, Math.min(5, e || 1)), t === "training") return e === 1 ? "Base (no XP cap bonus)" : `+${(e - 1) * 20}% XP cap`;
    if (t === "scouting") {
      const s = 3 + (e >= 5 ? 2 : e >= 4 ? 1 : 0), n = e >= 5 ? 2 : e >= 3 ? 1 : 0, i = e * 5;
      return s + " slots" + (n ? ` · +${n} rtg` : "") + ` · +${i}% spd`;
    }
    return t === "academy" ? ["15.0", "17.5", "19.8", "22.0", "24.1"][e - 1] + "% big-jump" : t === "medical" ? { 1: "Base", 2: "-3% inj / +4% rehab", 3: "-6% inj / +8% rehab", 4: "-10% inj / +12% rehab", 5: "-14% inj / +16% rehab" }[e] : t === "analytics" ? { 1: "442 433 4231 532 343", 2: "+352 541 4411", 3: "+4321 451", 4: "+4141 442D 3421", 5: "+3241 4222 4132" }[e] : t === "stadium" ? ["30k", "40k", "50k", "60k", "80k"][e - 1] + " seats" : "";
  },
  facCurLv(t) {
    var e, s;
    return ((s = (e = this.clubFacData) == null ? void 0 : e.levels) == null ? void 0 : s[t]) || 0;
  },
  facEmoji(t) {
    return { stadium: "🏟", training: "⚽", scouting: "🔭", analytics: "📊", academy: "🌱", medical: "🏥" }[t] || "🏗";
  },
  facTitle(t) {
    return { stadium: "Stadium", training: "Training Ground", scouting: "Scouting Network", analytics: "Analytics Dept", academy: "Academy", medical: "Medical Centre" }[t] || t;
  },
  async loadClub(t = !1) {
    this.clubLoading = !0, this.clubMsg = "Loading club data…";
    try {
      const e = encodeURIComponent(Ot), s = "sf_club_v1", n = 30 * 60 * 1e3;
      if (!t)
        try {
          const c = JSON.parse(localStorage.getItem(s) || "null");
          if (c) {
            this.clubFacData = c.facilities, this.clubFacQuotes = c.quotes || {}, this.clubStaff = c.staff || {}, this.clubStaffEffects = c.effects || {}, this.clubLoaded = !0, this.clubLoading = !1, this.clubMsg = "", Date.now() - c.savedAt > n && setTimeout(() => this.loadClub(!0), 100);
            return;
          }
        } catch {
        }
      const i = ["stadium", "training", "academy", "scouting", "medical", "analytics"], [a, o, r, ...l] = await Promise.all([
        fetch(`${it}/facilities?club=${e}`).then((c) => c.json()),
        fetch(`${it}/staff?club=${e}`).then((c) => c.json()).catch(() => ({})),
        fetch(`${it}/staff/effects?club=${e}`).then((c) => c.json()).catch(() => ({})),
        ...i.map(
          (c) => fetch(`${it}/facilities/quote?club=${e}&key=${c}`).then((h) => h.json()).then((h) => ({ key: c, ...h })).catch(() => ({ key: c, ok: !1 }))
        )
      ]);
      this.clubFacData = a, this.clubStaff = o || {}, this.clubStaffEffects = (r.ok !== !1 ? r.effects : {}) || {}, this.clubFacQuotes = Object.fromEntries(l.map((c) => [c.key, c]));
      try {
        localStorage.setItem(s, JSON.stringify({
          savedAt: Date.now(),
          facilities: a,
          quotes: this.clubFacQuotes,
          staff: o || {},
          effects: this.clubStaffEffects
        }));
      } catch {
      }
      this.clubLoaded = !0, this.clubMsg = "";
    } catch (e) {
      this.clubMsg = "Error: " + e.message;
    } finally {
      this.clubLoading = !1;
    }
  },
  // ── Background auto-refresh (9am–11pm EST, incremental) ──
  // Refreshes scouts/academy/facilities/staff silently without showing a loading spinner.
  // History (all-clubs) is 24h TTL and is never auto-refreshed (too expensive).
  bgAutoRefresh() {
    const e = ((/* @__PURE__ */ new Date()).getUTCHours() + 19) % 24;
    if (e < 9 || e >= 23) return;
    const s = "sf_youth_idx_v2", n = 8 * 60 * 1e3, i = 60 * 60 * 1e3;
    (async () => {
      try {
        const a = encodeURIComponent(Ot), o = Date.now();
        let r = null;
        try {
          r = JSON.parse(localStorage.getItem(s) || "null");
        } catch {
        }
        const l = o - ((r == null ? void 0 : r.savedAt) || 0), c = o - ((r == null ? void 0 : r.staticSavedAt) || 0), h = l >= n, u = c >= i;
        if (!h && !u) return;
        const [d, p, f, g] = await Promise.all([
          h ? fetch(`${it}/scouting/jobs?club=${a}`).then((m) => m.json()) : Promise.resolve(null),
          h ? fetch(`${it}/academy?club=${a}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/facilities?club=${a}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/staff/effects?club=${a}`).then((m) => m.json()) : Promise.resolve(null)
        ]);
        if (h && d && (this.youthCap = d.cap || this.youthCap, this.youthScouts = (d.items || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 }))), h && p) {
          const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"];
          this.youthAcademy = (p.items || []).map((_) => {
            const y = m.filter((b) => this.getYouthAttr(_, b) > 0).length;
            return { ..._, _partial: y < 5 };
          });
        }
        u && f && (this.youthFacilities = f || {}), u && g && (this.youthStaff = (g.ok ? g.effects : {}) || {}), this.youthBgLastRefresh = (/* @__PURE__ */ new Date()).toLocaleTimeString();
        try {
          const m = {
            ...r || {},
            ...h ? { savedAt: o, cap: (d == null ? void 0 : d.cap) || {}, scouts: (d == null ? void 0 : d.items) || [], academy: this.youthAcademy } : {},
            ...u ? { staticSavedAt: o, facilities: f || {}, staff: this.youthStaff } : {}
          };
          localStorage.setItem(s, JSON.stringify(m));
        } catch {
        }
      } catch {
      }
    })();
  }
}, wC = {
  async buildMatchArchive() {
    var a, o, r, l, c;
    if (this.matchArchiveBuilding) return;
    this.matchArchiveBuilding = !0, this.matchArchiveProgress = 0, this.matchArchiveMsg = "Starting…", this.matchBuildLog = [];
    const t = (h) => {
      this.matchBuildLog.push(`${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB")} ${h}`);
    }, e = (h) => new Promise((u) => setTimeout(u, h));
    t(`Host: ${location.hostname} | Cache: ${ms}`);
    const s = `${ms}/__write_test__`, n = await fetch(s, { method: "POST", body: "1", signal: AbortSignal.timeout(8e3) }).then((h) => `HTTP ${h.status}`).catch((h) => `FAIL: ${h.name}: ${h.message}`);
    if (t(`Cache write test: ${n}`), fetch(s, { method: "DELETE" }).catch(() => {
    }), !n.startsWith("HTTP 2"))
      throw new Error(`Cache write failed before fetch: ${n}`);
    const i = async (h, u) => {
      let d;
      for (let p = 0; p < 3; p++) {
        p > 0 && await e(1e3 * p);
        try {
          const f = await fetch(h, { method: "POST", body: u, signal: AbortSignal.timeout(15e3) });
          if (f.ok) return !0;
          d = `HTTP ${f.status}: ${await f.text().catch(() => "")}`;
        } catch (f) {
          d = `${f.name}: ${f.message}`;
        }
      }
      return d;
    };
    try {
      if ((a = this.matchArchive) != null && a.length) {
        const M = [...new Set(this.matchArchive.map((T) => T._gw))].filter(Boolean);
        this.matchArchiveMsg = `Loading ${M.length} cached chunks…`, t(`Pre-loading ${M.length} GW chunks from KV`), await Promise.all(M.map((T) => this.loadMatchChunk(T))), t(`Chunks loaded: ${Object.keys(this.matchChunks).length} GWs in memory`);
      }
      const h = /* @__PURE__ */ new Map(), u = [...new Set(this.allPlayers.map((M) => M.Club).filter(Boolean))].sort();
      t(`${u.length} clubs to scan`);
      for (let M = 0; M < u.length; M += 10) {
        const T = u.slice(M, M + 10);
        this.matchArchiveProgress = Math.round(M / u.length * 20), this.matchArchiveMsg = `Pass 1: ${Math.min(M + 10, u.length)}/${u.length} clubs · ${h.size} fixtures`, await Promise.all(T.map(async (F) => {
          try {
            const H = await fetch(`${it}/matches?club=${encodeURIComponent(F)}&limit=200`).then((Z) => Z.json());
            let Y = 0;
            for (const Z of (H == null ? void 0 : H.matches) || [])
              Z.fixtureId && !h.has(Z.fixtureId) && (h.set(Z.fixtureId, Z), Y++);
            Y && t(`${F}: +${Y} (${h.size} total)`);
          } catch (H) {
            t(`ERROR ${F}: ${H.message}`);
          }
        })), await e(50);
      }
      t(`Pass 1 done: ${h.size} unique fixtures`);
      const d = Array.from(h.keys()), p = /* @__PURE__ */ new Map();
      for (const M of Object.keys(this.matchChunks))
        for (const T of this.matchChunks[M] || []) p.set(T.fixtureId, T);
      const f = d.filter((M) => !p.has(M)), g = d.filter((M) => p.has(M)).map((M) => p.get(M));
      t(`Pass 2: ${f.length} new fixtures to fetch, ${g.length} reused from cache`);
      let m = 0;
      for (let M = 0; M < f.length; M += 25) {
        const T = f.slice(M, M + 25);
        this.matchArchiveProgress = 20 + Math.round(M / Math.max(f.length, 1) * 40), this.matchArchiveMsg = `Pass 2: ${Math.min(M + 25, f.length)}/${f.length} new fixtures · ${m} errors`, await Promise.all(T.map(async (F) => {
          try {
            const H = await fetch(`${it}/matches/${F}`).then((Y) => Y.json());
            if (H != null && H.match) {
              const Y = H.match;
              g.push(Y);
            } else
              m++, t(`No data for ${F}: ${JSON.stringify(H).slice(0, 60)}`);
          } catch (H) {
            m++, t(`ERROR fixture ${F}: ${H.message}`);
          }
        })), await e(30);
      }
      g.sort((M, T) => (T.kickoff || "").localeCompare(M.kickoff || "")), t(`Pass 2 done: ${g.length} matches, ${m} errors`);
      const _ = {};
      let y = 0;
      t(`Pass 3: fetching submissions for ${u.length} clubs`);
      for (let M = 0; M < u.length; M += 10) {
        const T = u.slice(M, M + 10);
        this.matchArchiveProgress = 60 + Math.round(M / u.length * 24), this.matchArchiveMsg = `Pass 3: ${Math.min(M + 10, u.length)}/${u.length} clubs · submissions`, await Promise.all(T.map(async (F) => {
          try {
            const H = await fetch(`${it}/submissions?club=${encodeURIComponent(F)}&limit=200`).then((Z) => Z.json()), Y = {};
            for (const Z of (H == null ? void 0 : H.items) || []) {
              const nt = Z.gameweek ?? "upcoming";
              (!Y[nt] || Z.createdAt > Y[nt].createdAt) && (Y[nt] = Z);
            }
            _[F] = Y;
          } catch (H) {
            y++, t(`SUB ERROR ${F}: ${H.message}`);
          }
        })), await e(50);
      }
      t(`Pass 3 done: ${Object.keys(_).length} clubs, ${y} errors`);
      for (const M of g) {
        const T = M.gameweek, F = T != null ? (r = _[(o = M.home) == null ? void 0 : o.club]) == null ? void 0 : r[T] : null, H = T != null ? (c = _[(l = M.away) == null ? void 0 : l.club]) == null ? void 0 : c[T] : null;
        F && (M.home.sub = { formation: F.formation, instructions: F.instructions, roles: F.roles, xi: F.xi, runs: F.runs }), H && (M.away.sub = { formation: H.formation, instructions: H.instructions, roles: H.roles, xi: H.xi, runs: H.runs });
      }
      const b = /* @__PURE__ */ new Map();
      for (const M of g) {
        const T = M.gameweek ?? 0;
        b.has(T) || b.set(T, []), b.get(T).push(M);
      }
      const x = [...b.keys()].sort((M, T) => M - T);
      t(`Gameweeks: ${x.length} (GW${x[0]}–GW${x[x.length - 1]})`);
      const v = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, k = new Map(this.allPlayers.map((M) => [(M.Player || "").toLowerCase().trim(), M])), S = (M) => M.length ? Math.round(M.reduce((T, F) => T + F, 0) / M.length * 10) / 10 : null, C = (M) => {
        var H;
        if (!((H = M == null ? void 0 : M.xi) != null && H.length)) return null;
        const T = { def: [], mid: [], att: [] }, F = [];
        for (const Y of M.xi) {
          const Z = (Y.name || Y.player || "").toLowerCase().trim(), nt = k.get(Z);
          if (!nt) continue;
          const dt = (Y.slot || "").replace(/\d+$/, "") || nt.Position || "CM", lt = nt.Position || dt, pt = is(nt, lt);
          pt && (F.push(pt), v[dt] && T[v[dt]].push(pt));
        }
        return { overall: S(F), def: S(T.def), mid: S(T.mid), att: S(T.att) };
      }, D = { sub: 0, narr: 0, derived: 0, none: 0 }, O = (M, T, F, H) => {
        if (M != null && M.formation)
          return D.sub++, M.formation;
        const Y = Ri(this.extractFormation(T, F));
        if (Y)
          return D.narr++, Y;
        const Z = Ri(this.deriveFormation(H));
        return Z ? (D.derived++, Z) : (D.none++, null);
      }, I = g.map((M) => {
        var H, Y, Z, nt, dt, lt, pt, _t, K, q, U, at, A, R, N, z, $, B, G, j, V, W, X, J, et, tt;
        const T = this.extractTactics(M.reportNarrative, (H = M.home) == null ? void 0 : H.club), F = this.extractTactics(M.reportNarrative, (Y = M.away) == null ? void 0 : Y.club);
        return {
          fixtureId: M.fixtureId,
          kickoff: M.kickoff,
          gameweek: M.gameweek,
          competition: M.competition,
          home: {
            club: (Z = M.home) == null ? void 0 : Z.club,
            formation: O((nt = M.home) == null ? void 0 : nt.sub, M.reportNarrative, (dt = M.home) == null ? void 0 : dt.club, (lt = M.ratings) == null ? void 0 : lt.home),
            mentality: ((K = (_t = (pt = M.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : K.mentality) || (T == null ? void 0 : T.mentality) || null,
            style: ((at = (U = (q = M.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.style) || (T == null ? void 0 : T.style) || null,
            sqRtg: C((A = M.home) == null ? void 0 : A.sub)
          },
          away: {
            club: (R = M.away) == null ? void 0 : R.club,
            formation: O((N = M.away) == null ? void 0 : N.sub, M.reportNarrative, (z = M.away) == null ? void 0 : z.club, ($ = M.ratings) == null ? void 0 : $.away),
            mentality: ((j = (G = (B = M.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.mentality) || (F == null ? void 0 : F.mentality) || null,
            style: ((X = (W = (V = M.away) == null ? void 0 : V.sub) == null ? void 0 : W.instructions) == null ? void 0 : X.style) || (F == null ? void 0 : F.style) || null,
            sqRtg: C((J = M.away) == null ? void 0 : J.sub)
          },
          score: M.score,
          headline: M.headline,
          // Key match stats for formation/style analysis (inline to avoid loading every chunk)
          stats: M.stats ? {
            xg: M.stats.xg,
            shots: M.stats.shots ? { home: ((et = M.stats.shots.home) == null ? void 0 : et.total) ?? null, away: ((tt = M.stats.shots.away) == null ? void 0 : tt.total) ?? null } : null,
            possession: M.stats.possession
          } : null,
          _gw: M.gameweek ?? 0
        };
      });
      t(`Formation sources: sub=${D.sub} narr=${D.narr} derived=${D.derived} none=${D.none} (of ${g.length * 2} sides)`);
      const w = { builtAt: Date.now(), matchCount: g.length, gwCount: x.length, gameweeks: x, fmSrc: D, matches: I }, E = JSON.stringify(w);
      this.matchArchiveProgress = 84, this.matchArchiveMsg = `Saving index (${(E.length / 1024).toFixed(0)}KB)…`, t(`Saving index: ${(E.length / 1024).toFixed(0)}KB`);
      const L = await i(`${ms}/sf_match_archive_v3?permanent=1`, E);
      if (L !== !0) throw new Error(`Index save failed: ${L}`);
      t("Index saved OK");
      let P = 0;
      for (let M = 0; M < x.length; M++) {
        const T = x[M], F = b.get(T), H = JSON.stringify({ gw: T, matches: F });
        this.matchArchiveProgress = 84 + Math.round((M + 1) / x.length * 16), this.matchArchiveMsg = `Saving GW${T} (${F.length} matches, ${(H.length / 1024).toFixed(0)}KB)…`;
        const Y = await i(`${ms}/sf_match_archive_v3_gw_${T}?permanent=1`, H);
        Y === !0 ? t(`GW${T}: ${F.length} matches saved OK (${(H.length / 1024).toFixed(0)}KB)`) : (P++, t(`ERROR GW${T}: ${Y}`)), await e(30);
      }
      this.matchArchive = I, this.matchArchiveChunkCount = x.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.matchArchiveFmSrc = D, this.matchArchiveProgress = 100, P > 0 ? (this.matchArchiveMsg = `Done (${P} GW save errors) — ${g.length} matches`, t(`Build complete: ${g.length} matches, ${P} GW(s) failed`)) : (this.matchArchiveMsg = `Done — ${g.length} matches across ${x.length} gameweeks`, t(`Build complete: ${g.length} matches, ${x.length} GW chunks`));
    } catch (h) {
      this.matchArchiveMsg = "Error: " + (h.message || h), t(`FATAL: ${h.message || h}`);
    }
    this.matchArchiveBuilding = !1;
  },
  async appendLatestGw() {
    var n, i, a, o, r;
    if (this.appendGwBuilding || this.matchArchiveBuilding) return;
    if (!((n = this.matchArchive) != null && n.length)) {
      alert("Load the archive first");
      return;
    }
    this.appendGwBuilding = !0, this.appendGwProgress = 0, this.appendGwMsg = "Starting…";
    const t = (l) => {
      this.matchBuildLog.push(l), console.log("[AppendGW]", l);
    }, e = (l) => new Promise((c) => setTimeout(c, l)), s = async (l, c, h = 3) => {
      for (let u = 0; u < h; u++) {
        try {
          if ((await fetch(l, { method: "POST", headers: { "Content-Type": "application/json" }, body: c })).ok) return !0;
        } catch {
        }
        await e(500);
      }
      return "save failed";
    };
    try {
      const l = new Set(this.matchArchive.map((w) => w.fixtureId)), c = Math.max(...this.matchArchive.map((w) => w._gw || 0).filter((w) => w > 0));
      t(`Archive has ${l.size} fixtures up to GW${c}`), this.appendGwMsg = "Scanning clubs for new fixtures…";
      const h = [...new Set(this.allPlayers.map((w) => w.Club).filter(Boolean))].sort(), u = /* @__PURE__ */ new Map();
      for (let w = 0; w < h.length; w += 10) {
        const E = h.slice(w, w + 10);
        this.appendGwProgress = Math.round(w / h.length * 30), this.appendGwMsg = `Scanning ${Math.min(w + 10, h.length)}/${h.length} clubs… ${u.size} new`, await Promise.all(E.map(async (L) => {
          try {
            const P = await fetch(`${it}/matches?club=${encodeURIComponent(L)}&limit=50`).then((M) => M.json());
            for (const M of (P == null ? void 0 : P.matches) || [])
              M.fixtureId && !l.has(M.fixtureId) && !u.has(M.fixtureId) && u.set(M.fixtureId, M);
          } catch (P) {
            t(`ERROR ${L}: ${P.message}`);
          }
        })), await e(50);
      }
      if (t(`Found ${u.size} new fixtures`), u.size === 0) {
        this.appendGwMsg = "No new fixtures found.", this.appendGwBuilding = !1;
        return;
      }
      const d = Array.from(u.keys()), p = [];
      let f = 0;
      for (let w = 0; w < d.length; w += 25) {
        const E = d.slice(w, w + 25);
        this.appendGwProgress = 30 + Math.round(w / d.length * 30), this.appendGwMsg = `Fetching ${Math.min(w + 25, d.length)}/${d.length} match details…`, await Promise.all(E.map(async (L) => {
          try {
            const P = await fetch(`${it}/matches/${L}`).then((M) => M.json());
            if (P != null && P.match) {
              const M = P.match;
              p.push(M);
            } else
              f++;
          } catch (P) {
            f++, t(`ERROR fixture ${L}: ${P.message}`);
          }
        })), await e(30);
      }
      t(`Fetched ${p.length} full matches, ${f} errors`);
      const g = [...new Set(p.map((w) => w.gameweek).filter((w) => w != null))];
      t(`New GWs: ${g.join(", ")}`), this.appendGwMsg = "Fetching submissions for new GWs…";
      const m = [...new Set(p.flatMap((w) => {
        var E, L;
        return [(E = w.home) == null ? void 0 : E.club, (L = w.away) == null ? void 0 : L.club];
      }).filter(Boolean))], _ = {};
      for (let w = 0; w < m.length; w += 10) {
        const E = m.slice(w, w + 10);
        this.appendGwProgress = 60 + Math.round(w / m.length * 20), this.appendGwMsg = `Submissions: ${Math.min(w + 10, m.length)}/${m.length} clubs…`, await Promise.all(E.map(async (L) => {
          try {
            const P = await fetch(`${it}/submissions?club=${encodeURIComponent(L)}&limit=50`).then((T) => T.json()), M = {};
            for (const T of (P == null ? void 0 : P.items) || []) {
              const F = T.gameweek ?? "upcoming";
              (!M[F] || T.createdAt > M[F].createdAt) && (M[F] = T);
            }
            _[L] = M;
          } catch (P) {
            t(`SUB ERROR ${L}: ${P.message}`);
          }
        })), await e(50);
      }
      for (const w of p) {
        const E = w.gameweek, L = E != null ? (a = _[(i = w.home) == null ? void 0 : i.club]) == null ? void 0 : a[E] : null, P = E != null ? (r = _[(o = w.away) == null ? void 0 : o.club]) == null ? void 0 : r[E] : null;
        L && (w.home.sub = { formation: L.formation, instructions: L.instructions, roles: L.roles, xi: L.xi, runs: L.runs }), P && (w.away.sub = { formation: P.formation, instructions: P.instructions, roles: P.roles, xi: P.xi, runs: P.runs });
      }
      const y = new Map(this.allPlayers.map((w) => [(w.Player || "").toLowerCase().trim(), w])), b = (w) => w.length ? Math.round(w.reduce((E, L) => E + L, 0) / w.length * 10) / 10 : null, x = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, v = (w) => {
        var P;
        if (!((P = w == null ? void 0 : w.xi) != null && P.length)) return null;
        const E = { def: [], mid: [], att: [] }, L = [];
        for (const M of w.xi) {
          const T = (M.name || M.player || "").toLowerCase().trim(), F = y.get(T);
          if (!F) continue;
          const H = (M.slot || "").replace(/\d+$/, "") || F.Position || "CM", Y = is(F, F.Position || H);
          Y && (L.push(Y), x[H] && E[x[H]].push(Y));
        }
        return { overall: b(L), def: b(E.def), mid: b(E.mid), att: b(E.att) };
      }, k = p.map((w) => {
        var M, T, F, H, Y, Z, nt, dt, lt, pt, _t, K, q, U, at, A, R, N, z, $, B, G, j, V, W, X;
        const E = this.extractTactics(w.reportNarrative, (M = w.home) == null ? void 0 : M.club), L = this.extractTactics(w.reportNarrative, (T = w.away) == null ? void 0 : T.club), P = (J, et, tt) => {
          if (J != null && J.formation) return Ri(J.formation);
          const ht = Ri(this.extractFormation(w.reportNarrative, et));
          return ht || Ri(this.deriveFormation(tt)) || null;
        };
        return {
          fixtureId: w.fixtureId,
          kickoff: w.kickoff,
          gameweek: w.gameweek,
          competition: w.competition,
          home: { club: (F = w.home) == null ? void 0 : F.club, formation: P((H = w.home) == null ? void 0 : H.sub, (Y = w.home) == null ? void 0 : Y.club, (Z = w.ratings) == null ? void 0 : Z.home), mentality: ((lt = (dt = (nt = w.home) == null ? void 0 : nt.sub) == null ? void 0 : dt.instructions) == null ? void 0 : lt.mentality) || (E == null ? void 0 : E.mentality) || null, style: ((K = (_t = (pt = w.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : K.style) || (E == null ? void 0 : E.style) || null, sqRtg: v((q = w.home) == null ? void 0 : q.sub) },
          away: { club: (U = w.away) == null ? void 0 : U.club, formation: P((at = w.away) == null ? void 0 : at.sub, (A = w.away) == null ? void 0 : A.club, (R = w.ratings) == null ? void 0 : R.away), mentality: (($ = (z = (N = w.away) == null ? void 0 : N.sub) == null ? void 0 : z.instructions) == null ? void 0 : $.mentality) || (L == null ? void 0 : L.mentality) || null, style: ((j = (G = (B = w.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.style) || (L == null ? void 0 : L.style) || null, sqRtg: v((V = w.away) == null ? void 0 : V.sub) },
          score: w.score,
          headline: w.headline,
          stats: w.stats ? { xg: w.stats.xg, shots: w.stats.shots ? { home: ((W = w.stats.shots.home) == null ? void 0 : W.total) ?? null, away: ((X = w.stats.shots.away) == null ? void 0 : X.total) ?? null } : null, possession: w.stats.possession } : null,
          _gw: w.gameweek ?? 0
        };
      });
      this.appendGwProgress = 80;
      const S = /* @__PURE__ */ new Map();
      for (const w of p) {
        const E = w.gameweek ?? 0;
        S.has(E) || S.set(E, []), S.get(E).push(w);
      }
      for (const [w, E] of S) {
        let L = [];
        if (this.matchChunks[w]) L = this.matchChunks[w];
        else
          try {
            const F = await kt(`sf_match_archive_v3_gw_${w}`);
            F && (L = JSON.parse(F).matches || []);
          } catch {
          }
        const P = new Set(L.map((F) => F.fixtureId)), M = [...L, ...E.filter((F) => !P.has(F.fixtureId))];
        this.matchChunks[w] = M;
        const T = JSON.stringify({ gw: w, matches: M });
        this.appendGwMsg = `Saving GW${w} chunk (${M.length} matches)…`, await s(`${ms}/sf_match_archive_v3_gw_${w}?permanent=1`, T), t(`GW${w} chunk saved: ${M.length} matches`);
      }
      this.appendGwProgress = 92, this.appendGwMsg = "Updating archive index…";
      const C = [...this.matchArchive, ...k], D = [...new Set(C.map((w) => w._gw).filter((w) => w > 0))].sort((w, E) => w - E), O = {
        builtAt: Date.now(),
        matchCount: C.length,
        gwCount: D.length,
        gameweeks: D,
        fmSrc: this.matchArchiveFmSrc || {},
        matches: C
      };
      if (await s(`${ms}/sf_match_archive_v3?permanent=1`, JSON.stringify(O)) !== !0) throw new Error("Index save failed");
      this.matchArchive = C, this.matchArchiveChunkCount = D.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.analysisLoaded = !1, this.appendGwProgress = 100, this.appendGwMsg = `Done — added ${k.length} matches (GW${g.join(", GW")})`, t(`Append complete: +${k.length} matches across GW${g.join(", GW")}`);
    } catch (l) {
      this.appendGwMsg = "Error: " + (l.message || l), t(`FATAL: ${l.message || l}`);
    }
    this.appendGwBuilding = !1;
  },
  async loadMatchArchive() {
    var t;
    try {
      const e = await kt("sf_match_archive_v3", !0);
      if (!e) return;
      const s = await Mn(e);
      (t = s == null ? void 0 : s.matches) != null && t.length && (this.matchArchive = s.matches, this.matchArchiveChunkCount = s.gwCount || 0, this.matchArchiveCacheDate = new Date(s.builtAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), s.fmSrc && (this.matchArchiveFmSrc = s.fmSrc));
    } catch {
    }
  },
  async loadMatchChunk(t) {
    if (!this.matchChunks[t])
      try {
        const e = await kt(`sf_match_archive_v3_gw_${t}`);
        if (e) {
          const s = (await Mn(e)).matches || [];
          this.matchChunks[t] = s;
        }
      } catch {
      }
  },
  async loadAnalysisChunks() {
    var a, o, r, l, c, h, u, d, p, f, g;
    if (this.analysisLoading || this.analysisLoaded || !this.matchArchive) return;
    this.analysisLoading = !0;
    const t = [...new Set(this.matchArchive.map((m) => m._gw))].sort((m, _) => m - _), e = [];
    for (let m = 0; m < t.length; m++) {
      this.analysisProgress = Math.round(m / t.length * 100), this.analysisMsg = `Loading GW${t[m]}… ${m + 1}/${t.length}`;
      const _ = t[m];
      this.matchChunks[_] || await this.loadMatchChunk(_);
      for (const y of this.matchChunks[_] || [])
        (o = (a = y.home) == null ? void 0 : a.sub) != null && o.instructions && ((l = (r = y.away) == null ? void 0 : r.sub) != null && l.instructions) && e.push(y);
      await new Promise((y) => setTimeout(y, 20));
    }
    this.analysisMatches = e;
    const s = (m) => m ? String(m).replace(/-/g, "") : null, n = /* @__PURE__ */ new Map();
    for (const m of Object.keys(this.matchChunks))
      for (const _ of this.matchChunks[m] || []) n.set(_.fixtureId, _);
    let i = 0;
    for (const m of this.matchArchive || []) {
      const _ = n.get(m.fixtureId);
      if (_) {
        for (const y of ["home", "away"])
          if (m[y]) {
            if (!m[y].formation) {
              let b = ((h = (c = _[y]) == null ? void 0 : c.sub) == null ? void 0 : h.formation) || null;
              b || (b = s(this.extractFormation(_.reportNarrative, (u = _[y]) == null ? void 0 : u.club))), b || (b = s(this.deriveFormation((d = _.ratings) == null ? void 0 : d[y]))), b && (m[y].formation = b, i++);
            }
            !m[y].mentality && ((g = (f = (p = _[y]) == null ? void 0 : p.sub) == null ? void 0 : f.instructions) != null && g.mentality) && (m[y].mentality = _[y].sub.instructions.mentality);
          }
      }
    }
    this.analysisLoaded = !0, this.analysisLoading = !1, this.analysisMsg = `${e.length} matches with full tactical data · ${i} formations backfilled`;
  },
  async loadSubsDb() {
    if (this.subsDbLoading) return;
    this.subsDbLoading = !0, this.subsDbMsg = "Checking cache…";
    const t = await kt("sf_submissions_db_v1");
    if (t) {
      this.subsDb = await Mn(t), this.subsDbLoaded = !0, this.subsDbLoading = !1;
      const e = this.subsDb.builtAt ? new Date(this.subsDb.builtAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
      this.subsDbMsg = `Loaded from cache · ${e}`;
      return;
    }
    await this.buildSubsDb();
  },
  async buildSubsDb() {
    this.subsDbLoading = !0, this.subsDbLoaded = !1;
    const t = [...new Set((this.allPlayers || []).map((n) => n.Club).filter(Boolean))].sort(), e = {};
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      this.subsDbProgress = Math.round(n / t.length * 100), this.subsDbMsg = `${n + 1}/${t.length} · ${i}`;
      try {
        const a = await fetch(`${it}/submissions?club=${encodeURIComponent(i)}&limit=200`).then((r) => r.json()), o = {};
        for (const r of (a == null ? void 0 : a.items) || []) {
          const l = r.gameweek ?? "upcoming";
          (!o[l] || r.createdAt > o[l].createdAt) && (o[l] = r);
        }
        e[i] = o;
      } catch {
        e[i] = {};
      }
      n % 8 === 0 && await new Promise((a) => setTimeout(a, 20));
    }
    const s = { clubs: e, builtAt: (/* @__PURE__ */ new Date()).toISOString() };
    await Ke("sf_submissions_db_v1", JSON.stringify(s)), this.subsDb = s, this.subsDbLoaded = !0, this.subsDbLoading = !1, this.subsDbMsg = `Built · ${t.length} clubs`;
  },
  // Return formatted formation for a club/gameweek from submissions (fetches if not cached)
  async getClubFormation(t, e) {
    var n;
    if (!t || !e) return null;
    await this._fetchClubSubmissions(t);
    const s = (n = this.submissionsCache[t]) == null ? void 0 : n[e];
    return s != null && s.formation ? this.fmtFormation(s.formation) : null;
  },
  async openMatch(t) {
    var l, c, h, u, d, p, f, g, m;
    this.matchView = t, this.matchDetailLoading = !0;
    const e = t._gw ?? t.gameweek ?? 0;
    this.matchChunks[e] || await this.loadMatchChunk(e);
    const s = (l = this.matchChunks[e]) == null ? void 0 : l.find((_) => _.fixtureId === t.fixtureId);
    s && (this.matchView = s);
    const n = this.matchView, i = (h = (c = n.home) == null ? void 0 : c.sub) != null && h.formation ? this.fmtFormation(n.home.sub.formation) : null, a = (d = (u = n.away) == null ? void 0 : u.sub) != null && d.formation ? this.fmtFormation(n.away.sub.formation) : null, [o, r] = await Promise.all([
      i ? Promise.resolve(i) : this.getClubFormation((p = n.home) == null ? void 0 : p.club, e),
      a ? Promise.resolve(a) : this.getClubFormation((f = n.away) == null ? void 0 : f.club, e)
    ]);
    n._homeFormation = o || this.extractFormation(n.reportNarrative, (g = n.home) == null ? void 0 : g.club) || n.ratings && this.deriveFormation(n.ratings.home), n._awayFormation = r || this.extractFormation(n.reportNarrative, (m = n.away) == null ? void 0 : m.club) || n.ratings && this.deriveFormation(n.ratings.away), this.matchDetailLoading = !1;
  }
}, CC = {
  espRatingClass(t) {
    return t ? t >= 85 ? "c-green" : t >= 75 ? "c-orange" : "c-gray" : "c-gray";
  },
  espFacClass(t) {
    return t >= 5 ? "c-green" : t >= 4 ? "c-orange" : t >= 3 ? "c-blue" : "c-gray";
  },
  setPieceDesc(t, e) {
    var n;
    return ((n = {
      delivery: {
        Inswinger: "Curves toward goal — rewards far-post runners.",
        Outswinger: "Curves away — near-post flick-on.",
        Driven: "Flat and hard — penalty spot as target.",
        "Short Corner": "Short lay-off to pull defenders wide."
      },
      scheme: {
        Zonal: "Players hold areas of space — attack the ball when it enters their zone.",
        "Man-to-Man": "Each defender tracks a specific attacker through their run.",
        Hybrid: "Zonal around the posts, man-marking on the most dangerous runners."
      },
      press: {
        "Hold Shape": "Maintain structure — wait for delivery before engaging.",
        "Press Taker": "Rush the taker immediately to force a hurried or short delivery."
      },
      // Attacking corner zone roles
      atkZone: {
        nearPost: "Near Post — first to the ball on inswinging deliveries",
        farPost: "Far Post — ideal for outswinging deliveries",
        penaltySpot: "Penalty Spot — volleys, flick-ons, or second balls",
        blockade: "Blockade — screens the keeper, minimises overlap",
        edgeOfBox: "Edge of Box — recycles clearances or shoots from range",
        shortCorner: "Short Corner — pulls a defender wide to open space inside",
        holdBack: "Hold Back — counter cover, stays outside the box"
      },
      // Defensive corner zone roles
      defZone: {
        nearPost: "Near Post — attacks the ball first on short deliveries",
        farPost: "Far Post — last aerial line of defence",
        sixYardAnchor: "6-Yard Box — commands the box, best aerial defender",
        penaltySpot: "Penalty Spot — blocks shots and first balls",
        edgeOfBox: "Edge of Box — picks up second balls, drives forward",
        counterRunner: "Counter Runner — fastest player, lurks for the breakaway"
      }
    }[t]) == null ? void 0 : n[e]) || "";
  },
  setPieceZoneLabel(t, e) {
    var n;
    return ((n = {
      atk: { nearPost: "Near Post", farPost: "Far Post", penaltySpot: "Penalty Spot", blockade: "Blockade", edgeOfBox: "Edge of Box", shortCorner: "Short Corner", holdBack: "Hold Back" },
      def: { nearPost: "Near Post", farPost: "Far Post", sixYardAnchor: "6-Yard Box", penaltySpot: "Penalty Spot", edgeOfBox: "Edge of Box", counterRunner: "Counter Runner" }
    }[t]) == null ? void 0 : n[e]) || e;
  },
  // Key attributes to show for each zone assignment (no Strength in this game)
  playerFitPct(t) {
    const e = this.xiPlayerInfo(t);
    return e ? e.fitnessPct != null ? e.fitnessPct : e.Fitness != null ? e.Fitness : null : null;
  },
  fitColor(t) {
    return t == null ? "#8b949e" : t >= 85 ? "#7ee787" : t >= 70 ? "#ffa657" : "#ff7b72";
  },
  roleAttrs(t) {
    return {
      captain: ["Mentality", "Leadership"],
      penalty: ["Shooting", "Mentality"],
      freekick: ["Passing", "Vision"],
      corner: ["Passing", "Vision"]
    }[(t || "").toLowerCase()] || [];
  },
  spZoneAttrs(t, e) {
    var n;
    return t === "taker" ? ["Passing", "Vision"] : ((n = {
      atk: {
        nearPost: ["Heading", "Speed"],
        farPost: ["Heading", "Stamina"],
        penaltySpot: ["Heading", "Shooting"],
        blockade: ["Heading", "Tackling"],
        edgeOfBox: ["Shooting", "Vision"],
        shortCorner: ["Passing", "Dribbling"],
        holdBack: ["Speed", "Tackling"]
      },
      def: {
        nearPost: ["Heading", "Speed"],
        farPost: ["Heading", "Marking"],
        sixYardAnchor: ["Heading", "Marking"],
        penaltySpot: ["Heading", "Marking"],
        edgeOfBox: ["Speed", "Marking"],
        counterRunner: ["Speed", "Stamina"]
      }
    }[t]) == null ? void 0 : n[e]) || ["Heading"];
  },
  // Returns true if this zone should be highlighted for the given delivery type
  spDeliveryHighlight(t, e) {
    return {
      Inswinger: "farPost",
      Outswinger: "nearPost",
      Driven: "penaltySpot",
      "Short Corner": "shortCorner"
    }[t] === e;
  },
  // Color an attribute value: green ≥80, orange ≥70, white otherwise
  spAttrColor(t) {
    const e = parseInt(t, 10);
    return e ? e >= 80 ? "#3fb950" : e >= 70 ? "#ffa657" : "#e6edf3" : "#8b949e";
  },
  negoStatusStyle(t) {
    return { ...{
      active: { background: "#1a4a2e", color: "#7ee787" },
      offered: { background: "#3a2a6b", color: "#d2a8ff" },
      countered: { background: "#4a3a10", color: "#ffa657" },
      counter: { background: "#4a3a10", color: "#ffa657" },
      pending: { background: "#1f3a5a", color: "#79c0ff" },
      accepted: { background: "#1a4a2e", color: "#7ee787" },
      rejected: { background: "#3a1212", color: "#ff7b72" },
      withdrawn: { background: "#21262d", color: "#8b949e" }
    }[t] || { background: "#21262d", color: "#8b949e" }, borderRadius: "8px", padding: "1px 7px", fontSize: "10px", fontWeight: "700" };
  },
  negoSubStatusStyle(t) {
    return t ? ["agreed", "finalised", "won"].includes(t) ? { color: "#7ee787", fontWeight: "600" } : ["declined", "withdrawn", "counter_rejected", "moved_elsewhere", "outbid", "insufficient_funds"].includes(t) ? { color: "#ff7b72" } : ["offer", "finalising", "adjusted", "auction-bid"].includes(t) ? { color: "#ffa657" } : { color: "#8b949e" } : { color: "#8b949e" };
  },
  fmtSubStatus: _C,
  fmtNegoDate: xC,
  computeTrueValues() {
    var a;
    if (!this.allPlayers.length) return;
    const t = Date.now(), e = 60 * 24 * 3600 * 1e3, s = 180 * 24 * 3600 * 1e3, n = {};
    for (const o of this.espionageNegos) {
      const r = (o.playerName || "").toLowerCase();
      r && (n[r] || (n[r] = []), n[r].push(o));
    }
    const i = {};
    for (const o of this.allPlayers) {
      const r = (o.Player || "").toLowerCase(), l = n[r] || [], c = o.Value || 0, h = o._gameRating || 0, u = h >= 85 ? 4 : h >= 82 ? 3 : h >= 79 ? 2.2 : h >= 76 ? 1.7 : h >= 72 ? 1.3 : 1;
      let d = c * u, p = "formula";
      const f = (g, m) => {
        g > d && (d = g, p = m);
      };
      if ((a = o._transferHistory) != null && a.length) {
        const g = o._transferHistory.filter((m) => m.isReal).sort((m, _) => new Date(_.date) - new Date(m.date));
        if (g[0]) {
          const m = t - new Date(g[0].date).getTime();
          f(g[0].amount * (m < e ? 1 : m < s ? 0.9 : 0.8), "transfer");
        }
      }
      o._listingAsk && f(o._listingAsk, "listing");
      for (const g of l) {
        if (!g.amount || g.amount < 5e4) continue;
        const m = t - new Date(g.updatedAt || 0).getTime(), _ = m < e ? 1 : m < s ? 0.85 : 0.7;
        if (g.status === "accepted" ? f(g.amount * _, "deal") : g.status === "rejected" && f(g.amount * 1.15 * _, "rejected+15%"), g.history)
          for (const y of g.history)
            y.amount >= 5e4 && f(y.amount * 0.9 * _, "bid round");
      }
      if (d > 0) {
        const g = Math.round(d / 5e5) * 5e5 || Math.round(d / 1e5) * 1e5 || Math.round(d);
        i[r] = { v: g, src: p };
      }
    }
    this.trueValueMap = i;
  },
  trueVal(t) {
    var e;
    return ((e = this.trueValueMap[(t.Player || "").toLowerCase()]) == null ? void 0 : e.v) || t._estValue || 0;
  },
  trueValSrc(t) {
    var e;
    return ((e = this.trueValueMap[(t.Player || "").toLowerCase()]) == null ? void 0 : e.src) || "formula";
  },
  onNegoScroll(t) {
    const e = t.target;
    e.scrollHeight - e.scrollTop - e.clientHeight < 250 && this.negoDisplayCount < this.espionageNegoFiltered.length && (this.negoDisplayCount = Math.min(this.negoDisplayCount + 50, this.espionageNegoFiltered.length));
  },
  startNegosPolling() {
    this.negosPollingInterval || (this.negosPollingInterval = setInterval(() => this.pollNegosUpdate(), 3e5));
  },
  stopNegosPolling() {
    this.negosPollingInterval && (clearInterval(this.negosPollingInterval), this.negosPollingInterval = null);
  },
  async pollNegosUpdate() {
    try {
      const t = await kt("sf_negos_last_pull");
      if (!t) return;
      const e = parseInt(t, 10);
      if (!this.negosLastPull || e > this.negosLastPull) {
        const s = await kt("sf_negos_history_v1");
        s && (this.espionageNegos = JSON.parse(s), this.negosLastPull = e);
      }
    } catch {
    }
  },
  negoStatusInfo(t) {
    if (!t) return { icon: "", label: "—", detail: "", color: "#8b949e", bg: "#21262d" };
    const { status: e, subStatus: s, via: n, lastActionBy: i } = t, a = n === "auction", o = n === "listing";
    if (e === "pending")
      return a ? { icon: "🏛", label: "Auction bid", detail: `closes ${this.auctionCountdown}`, color: "#d2a8ff", bg: "#2d1a3a" } : o ? { icon: "📋", label: "Listing offer", detail: "", color: "#79c0ff", bg: "#1f3a5a" } : { icon: "📨", label: "Direct offer", detail: "", color: "#79c0ff", bg: "#1f3a5a" };
    if (e === "counter" || e === "countered") {
      const r = t.buyer === this.myClub, l = i === "buyer";
      return { icon: "🔄", label: `${(r ? l : !l) ? "We" : r ? "Seller" : "Buyer"} countered`, detail: "", color: "#ffa657", bg: "#4a3a10" };
    }
    if (e === "accepted")
      return { icon: "✓", label: a ? "Won auction" : "Accepted", detail: "", color: "#7ee787", bg: "#1a4a2e" };
    if (e === "rejected") {
      const l = {
        declined: "✗ Rejected",
        counter_rejected: "✗ Counter rejected",
        moved_elsewhere: "✗ Went elsewhere",
        outbid: "✗ Outbid",
        insufficient_funds: "⚠ Funds issue",
        withdrawn: "↩ Withdrawn",
        closed: "✗ Closed"
      }[s] || "✗ Rejected";
      return { icon: "", label: l, detail: s === "insufficient_funds" ? "next bidder wins" : "", color: l.startsWith("↩") ? "#8b949e" : "#ff7b72", bg: l.startsWith("↩") ? "#21262d" : "#3a1212" };
    }
    return e === "withdrawn" ? { icon: "↩", label: "Withdrawn", detail: "", color: "#8b949e", bg: "#21262d" } : s === "outbid" ? { icon: "", label: "✗ Outbid", detail: "", color: "#ff7b72", bg: "#3a1212" } : s === "insufficient_funds" ? { icon: "", label: "⚠ Funds issue", detail: "next bidder wins", color: "#ffa657", bg: "#3a2810" } : s === "won" ? { icon: "✓", label: "Won", detail: "", color: "#7ee787", bg: "#1a4a2e" } : { icon: "", label: e || "—", detail: s || "", color: "#8b949e", bg: "#21262d" };
  },
  // Highest bid amount visible for an auction nego
  auctionHighestBid(t) {
    var e;
    return (e = t.history) != null && e.length ? Math.max(t.amount || 0, ...t.history.map((s) => s.amount || 0)) : t.amount;
  },
  async pullBudgetNow() {
    if (this.pullingBudget) return;
    this.pullingBudget = !0;
    const t = "https://sf-cache.ofersi15.workers.dev";
    try {
      await fetch(`${t}/_budget`, { method: "POST", signal: AbortSignal.timeout(8e3) });
      for (let e = 0; e < 6; e++) {
        await new Promise((a) => setTimeout(a, 3e3));
        const [s, n] = await Promise.all([
          kt("sf_arsenal_fin_v1", !0),
          kt("sf_auctions_v1", !0)
        ]);
        if (s) {
          const a = JSON.parse(s);
          a.budget && (this.clubBudget = a.budget);
        }
        n && this._applyAuctionData(JSON.parse(n));
        const i = await kt("sf_all_budgets_v1", !0);
        if (i) {
          const a = JSON.parse(i);
          this.allBudgets = a.data || a;
        }
        if (s) break;
      }
    } catch {
    }
    this.pullingBudget = !1;
  },
  saveBudget() {
    const t = parseInt((this.budgetEditVal || "").replace(/[^0-9]/g, ""), 10);
    if (!isNaN(t) && t > 0) {
      this.budgetOverride = t;
      try {
        localStorage.setItem("sf_budget_override", String(t));
      } catch {
      }
      Ke("sf_arsenal_fin_v1", JSON.stringify({ budget: t, ts: Date.now() }));
    }
    this.budgetEditing = !1;
  },
  _applyAuctionData(t) {
    const e = t.data || t, s = Array.isArray(e) ? e : e.items || [];
    this.auctionItems = s;
    const n = {};
    for (const i of s) {
      if (!i.player) continue;
      const a = i.player.toLowerCase(), o = i.snapshot || {};
      n[a] = {
        ...o,
        // all attributes (Speed, Tackling, etc.) for the modal
        Player: i.player,
        Position: i.position || i.pos || o.Position || o.position || o.pos || null,
        Age: o.Age ?? o.age ?? i.age ?? null,
        _gameRating: i.rating ?? i.Rating ?? o.Rating ?? o.rating ?? null,
        Club: i.club || o.Club || o.club || null
      };
    }
    this.auctionProfiles = n;
  },
  async loadAuctionData() {
    try {
      const [t, e] = await Promise.all([
        kt("sf_auctions_v1"),
        kt("sf_all_budgets_v1")
      ]);
      if (t && this._applyAuctionData(JSON.parse(t)), e) {
        const s = JSON.parse(e);
        this.allBudgets = s.data || s;
      }
    } catch {
    }
  },
  async loadWorkerLog() {
    this.workerLogOpen = !0;
    try {
      const t = await kt("sf_worker_log");
      this.workerLog = t ? JSON.parse(t) : [];
    } catch {
      this.workerLog = [];
    }
  },
  playerByName(t) {
    if (!t) return null;
    const e = t.toLowerCase();
    return this.allPlayers.find((s) => (s.Player || "").toLowerCase() === e) || this.youthAcademy.find((s) => (s.Player || s.name || "").toLowerCase() === e) || this.auctionProfiles[e] || this.negoPlayerMap[e] || null;
  },
  openPlayerByName(t) {
    if (!t) return;
    const e = this.playerByName(t);
    e && this.openModal(e);
  },
  async loadEspionage(t = !1) {
    this.espionageLoading = !0, this.espionageMsg = "Loading…", this.espionageProgress = 0;
    const e = "sf_espionage_v3", s = dC;
    if (!t)
      try {
        let n = await kt(e);
        n || (n = localStorage.getItem(e));
        const i = n ? await Mn(n) : null;
        if (i) {
          this.espionageClubs = i.clubs || [];
          let a = i.negos || [];
          try {
            const o = await kt("sf_negos_history_v1");
            if (o) {
              const r = JSON.parse(o), l = new Map(a.map((c) => [c.id, c]));
              r.forEach((c) => l.set(c.id, c)), a = [...l.values()].sort((c, h) => new Date(h.updatedAt || 0) - new Date(c.updatedAt || 0));
            }
          } catch {
          }
          this.espionageNegos = a, this.espionageCacheDate = new Date(i.savedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), kt("sf_negos_last_pull").then((o) => {
            o && (this.negosLastPull = parseInt(o, 10));
          }).catch(() => {
          }), kt("sf_arsenal_fin_v1").then((o) => {
            if (o) {
              const r = JSON.parse(o);
              typeof r.budget == "number" && (this.clubBudget = r.budget), typeof r.wage == "number" && (this.clubWageBudget = r.wage);
            }
          }).catch(() => {
          }), this.loadAuctionData(), this.espionageLoaded = !0, this.espionageLoading = !1, this.loadEspionageSubmissions(), Date.now() - i.savedAt > s && setTimeout(() => this.loadEspionage(!0), 100);
          return;
        }
      } catch {
      }
    try {
      const i = [...new Set(this.allPlayers.map((h) => h.Club).filter(Boolean))].sort(), a = i.length;
      let o = [];
      try {
        const h = await kt("sf_negos_history_v1");
        if (h)
          o = JSON.parse(h);
        else {
          const u = await fetch(`${it}/negotiations`).then((p) => p.json());
          o = (Array.isArray(u) ? u : u.negotiations || u.items || []).map((p) => ({
            id: p.id,
            playerName: p.playerName,
            buyer: p.buyer || p.toClub,
            seller: p.seller || p.fromClub,
            amount: p.amount,
            status: p.status,
            subStatus: p.subStatus,
            via: p.via,
            lastActionBy: p.lastActionBy,
            history: p.history || [],
            createdAt: p.createdAt,
            updatedAt: p.updatedAt || p.ts
          })).sort((p, f) => new Date(f.updatedAt || 0) - new Date(p.updatedAt || 0)), Ke("sf_negos_history_v1", JSON.stringify(o));
        }
      } catch {
      }
      const r = [], l = 8;
      for (let h = 0; h < i.length; h += l) {
        const u = i.slice(h, h + l), d = await Promise.all(u.map(async (p) => {
          const f = encodeURIComponent(p);
          try {
            const [g, m] = await Promise.all([
              fetch(`${it}/staff?club=${f}`).then((_) => _.json()).catch(() => ({})),
              fetch(`${it}/facilities?club=${f}`).then((_) => _.json()).catch(() => ({}))
            ]);
            return {
              club: p,
              current: g.current || {},
              ads: g.openAds || [],
              levels: m.levels || {},
              project: m.project || null
            };
          } catch {
            return { club: p, current: {}, ads: [], levels: {}, project: null };
          }
        }));
        r.push(...d), this.espionageProgress = Math.min(99, Math.round((h + l) / a * 100)), await new Promise((p) => setTimeout(p, 0));
      }
      this.espionageClubs = r, this.espionageNegos = o, this.espionageCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), kt("sf_negos_last_pull").then((h) => {
        h && (this.negosLastPull = parseInt(h, 10));
      }).catch(() => {
      }), kt("sf_arsenal_fin_v1").then((h) => {
        if (h) {
          const u = JSON.parse(h);
          this.clubBudget = u.budget, this.clubWageBudget = u.wage;
        }
      }).catch(() => {
      }), this.loadAuctionData();
      const c = JSON.stringify({ savedAt: Date.now(), clubs: r, negos: o });
      Ke(e, c);
      try {
        localStorage.setItem(e, c);
      } catch {
      }
      this.espionageLoaded = !0, this.espionageProgress = 100, this.loadEspionageSubmissions();
    } catch (n) {
      this.espionageMsg = "⚠ " + n.message;
    } finally {
      this.espionageLoading = !1;
    }
  },
  drawTacticsCharts() {
    this.destroyChart("formations"), this.destroyChart("form-pop");
    const t = document.getElementById("chart-formations");
    if (t && this.tacticsData) {
      const s = [...this.tacticsData.formations].sort((n, i) => i.winPct - n.winPct).slice(0, 12);
      this.charts.formations = new Chart(t, {
        type: "bar",
        data: { labels: s.map((n) => n.formation), datasets: [
          { label: "Win %", data: s.map((n) => n.winPct), backgroundColor: "#238636", borderRadius: 4 },
          { label: "Draw %", data: s.map((n) => Math.round(100 * n.D / n.n)), backgroundColor: "#d2982280", borderRadius: 4 }
        ] },
        options: { plugins: { legend: { labels: { color: "#8b949e" } } }, scales: { x: { stacked: !1, ticks: { color: "#8b949e" } }, y: { max: 80, ticks: { color: "#8b949e" } } } }
      });
    }
    const e = document.getElementById("chart-form-pop");
    if (e && this.tacticsData) {
      const s = this.tacticsData.formations.slice(0, 12);
      this.charts["form-pop"] = new Chart(e, {
        type: "bar",
        data: { labels: s.map((n) => n.formation), datasets: [{ label: "Times used", data: s.map((n) => n.n), backgroundColor: "#1f6feb", borderRadius: 4 }] },
        options: { indexAxis: "y", plugins: { legend: { display: !1 } }, scales: { x: { ticks: { color: "#8b949e" } }, y: { ticks: { color: "#e6edf3", font: { weight: "bold" } } } } }
      });
    }
  }
}, kC = {
  // ── Match processing helpers (all from stored data, no API calls) ────────
  // Extract formation string from narrative text, looking near club name
  extractFormation(t, e) {
    if (!e) return null;
    const s = Array.isArray(t) ? t : [t || ""], n = s.filter((r) => typeof r == "string" && r.startsWith("Pre-match")).join(" ") || s.join(" "), i = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), a = "([345]-\\d(?:-\\d){1,2})";
    let o = n.match(new RegExp(`${i}.{0,150}${a}`));
    return o || (o = n.match(new RegExp(`${a}.{0,150}${i}`)), o) ? o[1] : null;
  },
  // Derive formation from starters' position counts (fallback when not in narrative)
  deriveFormation(t) {
    if (!(t != null && t.length)) return null;
    const e = t.filter((c) => c.minutes > 0 && !c.subbedOnAt);
    if (e.length < 9) return null;
    const s = {};
    for (const c of e) {
      const h = this.basePos(c.position);
      s[h] = (s[h] || 0) + 1;
    }
    const n = (s.CB || 0) + (s.FB || 0), i = (s.DM || 0) + (s.CM || 0) + (s.WM || 0), a = s.WF || 0, o = s.AM || 0, r = s.CF || 0, l = [n];
    return i && l.push(i), o && a ? (l.push(o + a), r && l.push(r)) : (o && l.push(o), a + r && l.push(a + r)), l.join("-");
  },
  // L/R/C position label given position code, index within that position, total count
  posLabel(t, e, s) {
    if (s <= 1 || t === "GK") return t;
    const n = {
      FB: ["LB", "RB"],
      CB: ["LCB", "RCB"],
      DM: ["LDM", "RDM"],
      CM: ["LCM", "RCM"],
      WM: ["LWM", "RWM"],
      AM: ["LAM", "RAM"],
      WF: ["LW", "RW"],
      CF: ["LCF", "RCF"]
    }, i = {
      CB: ["LCB", "CB", "RCB"],
      DM: ["LDM", "DM", "RDM"],
      CM: ["LCM", "CM", "RCM"],
      AM: ["LAM", "AM", "RAM"]
    }, a = s >= 3 && i[t] ? i[t] : n[t];
    return (a == null ? void 0 : a[e]) ?? t;
  },
  // Strip L/R/C side prefix from API position codes → base game position
  basePos(t) {
    if (!t) return t;
    const e = t.split("/")[0];
    return {
      LB: "FB",
      RB: "FB",
      LCB: "CB",
      RCB: "CB",
      LDM: "DM",
      RDM: "DM",
      LCM: "CM",
      RCM: "CM",
      LM: "WM",
      RM: "WM",
      LWM: "WM",
      RWM: "WM",
      LAM: "AM",
      RAM: "AM",
      LW: "WF",
      RW: "WF",
      LWF: "WF",
      RWF: "WF",
      ST: "CF",
      SS: "CF",
      LCF: "CF",
      RCF: "CF"
    }[e] || e;
  },
  // Look up player data from allPlayers by name (case-insensitive)
  xiPlayerInfo(t) {
    if (!t || typeof t != "string") return null;
    const e = t.toLowerCase();
    return this.allPlayers.find((s) => (s.Player || "").toLowerCase() === e) || null;
  },
  // Build layout array for pitch visualization: maps each xi player to their slot position + run target
  pitchLayout(t) {
    var o;
    if (!((o = t == null ? void 0 : t.xi) != null && o.length)) return [];
    const e = String(t.formation || "").replace(/-/g, ""), s = pC[e];
    if (!s) return [];
    const n = t.xi.map((r, l) => {
      const c = s[l] || { x: 50, y: 50 }, h = r.slot || (xh[e] || [])[l] || "CM", u = this.basePos(r.position || h), d = cf[u] || cf.CM;
      return {
        name: r.name,
        position: r.position || h,
        bp: u,
        slotType: h,
        x: c.x,
        y: c.y,
        fill: d.fill,
        stroke: d.stroke,
        textColor: d.text
      };
    }), i = {}, a = n.map((r) => {
      const l = r.slotType;
      return i[l] = (i[l] || 0) + 1, `${l}${i[l]}`;
    });
    return n.map((r, l) => {
      var f;
      const c = a[l], u = (((f = t.runs) == null ? void 0 : f[c]) || [])[0] || null, p = (parseInt(c.replace(/\D/g, "")) || 1) % 2 === 0;
      return {
        ...r,
        slotKey: c,
        runX: u !== null ? u.x / 90 * 68 : null,
        runY: u !== null ? p ? 105 - u.y / 100 * 105 : (u.y - 27.5) / 95 * 105 : null
      };
    });
  },
  // Return starters in raw API order with position label, plus subs sorted by time on
  lineupDisplay(t) {
    if (!(t != null && t.length)) return { starters: [], subs: [] };
    const e = t.filter((i) => i.minutes > 0 && !i.subbedOnAt), s = t.filter((i) => i.minutes > 0 && i.subbedOnAt).sort((i, a) => (i.subbedOnAt ?? 0) - (a.subbedOnAt ?? 0)), n = (i) => ({ ...i, _posLabel: i.position });
    return { starters: e.map(n), subs: s.map(n) };
  },
  // Scan all loaded GW chunks and return the last known starting XI per club
  buildClubLineups() {
    var e;
    const t = {};
    for (const s of Object.keys(this.matchChunks))
      for (const n of this.matchChunks[s] || [])
        if (!(!n.kickoff || !n.ratings))
          for (const i of ["home", "away"]) {
            const a = (e = n[i]) == null ? void 0 : e.club;
            if (a && (!t[a] || n.kickoff > t[a].kickoff)) {
              const { starters: o } = this.lineupDisplay(n.ratings[i]);
              t[a] = {
                club: a,
                kickoff: n.kickoff,
                gameweek: n.gameweek,
                manager: this.managerMap[a],
                formation: this.extractFormation(n.reportNarrative, a) || this.deriveFormation(n.ratings[i]),
                starters: o
              };
            }
          }
    this.clubLineups = t, this.clubLineupsLoaded = !0;
  },
  // Format a formation code like "4231" → "4-2-3-1"
  fmtFormation: Lo,
  // Extract tactical settings for a club from Pre-match narrative paragraphs
  // Maps free-form narrative language to actual game API instruction values
  extractTactics(t, e) {
    if (!e || !t) return null;
    const n = (Array.isArray(t) ? t : [t]).filter((c) => typeof c == "string" && c.startsWith("Pre-match")).join(" ");
    if (!n) return null;
    const i = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = (n.split(new RegExp("(?<=[.!?])\\s+")).filter((c) => new RegExp(i, "i").test(c)).join(" ") || n).toLowerCase(), l = {};
    return /\battacking\b/.test(r) ? l.mentality = "Attacking" : /\bdefensive\b/.test(r) ? l.mentality = "Defensive" : /\bbalanced\b/.test(r) && (l.mentality = "Balanced"), /short[- ]pass|tiki/.test(r) ? l.style = "Short" : /\bdirect\b/.test(r) && (l.style = "Direct"), /\bfluid\b/.test(r) ? l.structure = "Fluid" : /\brigid\b/.test(r) && (l.structure = "Rigid"), /aggressive press|relentless press|high press/.test(r) ? l.pressing = "Aggressive" : /\bpassive\b/.test(r) && (l.pressing = "Passive"), /high line/.test(r) ? l.defLine = "High" : /sitting low|deep block|low block|sit(?:ting)? deep/.test(r) && (l.defLine = "Low"), /fast (?:break|counter|transition)|spring fast|quick (?:counter|break)/.test(r) ? l.transition = "Fast" : /slow build|patient build|deliberate/.test(r) && (l.transition = "Slow"), /\bwide\b/.test(r) ? l.focus = "Wide" : /through the (?:center|centre|middle)|central focus/.test(r) && (l.focus = "Central"), Object.keys(l).length ? l : null;
  },
  // ── Shared submissions fetch helper ──────────────────────────────────────
  // Fetches all submissions for a club from the API and populates submissionsCache.
  // All callers (getClubFormation, loadEspionageSubmissions, openClubDetail, fetchMySubmission)
  // go through this single method so there's no duplicated fetch/normalize logic.
  async _fetchClubSubmissions(t) {
    if (!(!t || this.submissionsCache[t] !== void 0))
      try {
        const e = await fetch(`${it}/submissions?club=${encodeURIComponent(t)}&limit=50`).then((n) => n.json()), s = {};
        for (const n of (e == null ? void 0 : e.items) || []) {
          const i = n.gameweek ?? "upcoming";
          (!s[i] || n.createdAt > s[i].createdAt) && (s[i] = n);
        }
        for (const n of Object.values(s)) this._normalizeSubs(n);
        this.submissionsCache[t] = s;
      } catch {
        this.submissionsCache[t] = {};
      }
  },
  _normalizeSubs(t) {
    if (!Array.isArray(t.subs)) return;
    t.subs = t.subs.map((s) => {
      if (typeof s == "string")
        try {
          s = JSON.parse(s);
        } catch {
        }
      if (typeof (s == null ? void 0 : s.name) == "string" && s.name.trimStart().startsWith("{"))
        try {
          const n = JSON.parse(s.name);
          s = { ...n, name: n.name || "" };
        } catch {
        }
      return s;
    }).filter((s) => typeof s == "object" && s !== null && (s.name || s.off));
    const e = /* @__PURE__ */ new Map();
    for (const s of t.subs) {
      if (!s.off) continue;
      const n = e.get(s.off);
      (!n || !n.name && s.name) && e.set(s.off, s);
    }
    t.subs = t.subs.filter((s) => !s.off || e.get(s.off) === s);
  },
  async loadCachedSubmissions() {
    try {
      const t = localStorage.getItem(go);
      if (t) {
        const e = JSON.parse(t);
        for (const [s, n] of Object.entries((e == null ? void 0 : e.clubs) || {}))
          if (!this.submissionsCache[s]) {
            for (const i of Object.values(n)) this._normalizeSubs(i);
            this.submissionsCache[s] = n;
          }
        Object.keys(this.submissionsCache).length > 0 && (this.allSubmissionsLoaded = !0);
      }
    } catch {
    }
    try {
      const t = await kt(nf);
      if (!t) return;
      const e = await Mn(t);
      if (e != null && e.clubs) {
        for (const [s, n] of Object.entries(e.clubs))
          this.submissionsCache[s] || (this.submissionsCache[s] = n);
        Object.keys(this.submissionsCache).length > 0 && (this.allSubmissionsLoaded = !0);
      }
    } catch {
    }
  },
  // Load latest submission for every club in espionageClubs (parallel, non-blocking)
  async loadEspionageSubmissions() {
    const t = (this.espionageClubs || []).map((n) => n.club).filter(Boolean);
    if (!t.length) return;
    await Promise.all(t.map((n) => this._fetchClubSubmissions(n)));
    const e = {};
    for (const n of t) {
      const a = Object.values(this.submissionsCache[n] || {}).sort((o, r) => (r.submittedAt || 0) - (o.submittedAt || 0))[0];
      a && (e[n] = a);
    }
    this.espionageSubmissions = e, this.allSubmissionsLoaded = !0;
    const s = { builtAt: Date.now(), clubs: this.submissionsCache };
    try {
      localStorage.setItem(go, JSON.stringify(s));
    } catch {
    }
    yc(s).then((n) => Ke(nf, n)).catch(() => {
    });
  },
  async openClubDetail(t) {
    this.activeTab = "clubs", this.selectedClubName = t, this.selectedClubSubTab = "xi", this.showRawSub = !1, this.selectedClubMatchXi = null;
    try {
      localStorage.setItem("sf_last_club", t);
    } catch {
    }
    delete this.submissionsCache[t], await this._fetchClubSubmissions(t);
    try {
      const e = localStorage.getItem(go), s = e ? JSON.parse(e) : { clubs: {} };
      s.clubs[t] = this.submissionsCache[t] || {}, localStorage.setItem(go, JSON.stringify(s));
    } catch {
    }
    Object.keys(this.submissionsCache[t] || {}).length || this._fetchClubLastMatchXi(t), this._fetchClubInfo(t);
  },
  async _fetchClubLastMatchXi(t) {
    try {
      const s = ((await fetch(`${it}/matches?club=${encodeURIComponent(t)}&limit=1`).then((l) => l.json())).matches || [])[0];
      if (!s) return;
      const i = (await fetch(`${it}/matches/${s.fixtureId}`).then((l) => l.json())).match;
      if (!i) return;
      const a = i.home.club === t ? "home" : "away", r = ((i.ratings || {})[a] || []).filter((l) => l.subbedOnAt === null && l.minutes > 0);
      if (!r.length) return;
      this.selectedClubMatchXi = {
        _gw: i.gameweek,
        xi: r.map((l) => ({ name: l.player, pos: this.basePos(l.position) }))
      };
    } catch {
    }
  },
  async _fetchClubInfo(t) {
    var e, s, n;
    if (!((e = this.clubInfoCache[t]) != null && e.loaded)) {
      this.clubInfoCache = { ...this.clubInfoCache, [t]: { loading: !0 } };
      try {
        const i = encodeURIComponent(t), [a, o, r, l, c] = await Promise.all([
          fetch(`${it}/facilities?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/staff/effects?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/academy?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}&status=accepted`).then((p) => p.json()).catch(() => ({}))
        ]), h = r.items || [], u = {};
        for (const p of c.items || []) {
          const f = (((s = p.player) == null ? void 0 : s.name) || ((n = p.player) == null ? void 0 : n.Player) || "").toLowerCase();
          f && (u[f] = p.player);
        }
        const d = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision", "Mentality", "Experience"];
        for (const p of h) {
          const f = u[(p.name || p.Player || "").toLowerCase()];
          f && d.forEach((g) => {
            var m;
            f[g] != null && p[g] == null && (p[g] = f[g]), ((m = f.stats) == null ? void 0 : m[g]) != null && p[g] == null && (p[g] = f.stats[g]);
          });
        }
        this.clubInfoCache = { ...this.clubInfoCache, [t]: {
          loaded: !0,
          loading: !1,
          facilities: (a == null ? void 0 : a.levels) || a || {},
          facilityProject: (a == null ? void 0 : a.project) || null,
          staff: (o != null && o.ok ? o.effects : o) || {},
          academy: h,
          scouts: (l == null ? void 0 : l.items) || [],
          scoutCap: (l == null ? void 0 : l.cap) || {}
        } };
      } catch {
        this.clubInfoCache = { ...this.clubInfoCache, [t]: { loaded: !0, loading: !1, error: !0 } };
      }
    }
  },
  async fetchMySubmission() {
    if (this.mySubmissionLoading) return;
    this.mySubmissionLoading = !0, await this._fetchClubSubmissions(Ot);
    const t = this.submissionsCache[Ot] || {}, e = Object.keys(t).map(Number).sort((s, n) => n - s).slice(0, 3);
    this.mySubmissions = e.map((s) => t[s]), this.mySubmissionLoading = !1;
  },
  matchResultFor(t, e) {
    var r, l, c;
    const s = ((r = t.home) == null ? void 0 : r.club) === e, n = ((l = t.score) == null ? void 0 : l.home) ?? 0, i = ((c = t.score) == null ? void 0 : c.away) ?? 0, a = s ? n : i, o = s ? i : n;
    return a > o ? "W" : a < o ? "L" : "D";
  }
}, MC = {
  async openModal(t, e = null) {
    if (this.selectedPlayer = t, this.highlightedPos = null, this.selectedJobCtx = e || null, this.negoShowAllModal = !1, this.selectedPlayerStats = null, this.selectedPlayerStatsTab = "career", this.selectedPlayerStatsLoading = !0, this.playerModalTab = "overview", this.espionageNegos.length === 0)
      try {
        const s = await kt("sf_negos_history_v1");
        s && (this.espionageNegos = JSON.parse(s));
      } catch {
      }
    try {
      const s = encodeURIComponent(t.Player || "");
      if (s) {
        const n = await fetch(`${it}/player-stats?player=${s}&history=true`).then((i) => i.json());
        n.ok && (this.selectedPlayerStats = n);
      }
    } catch {
    }
    this.selectedPlayerStatsLoading = !1;
  },
  closeModal() {
    this.selectedPlayer = null, this.selectedJobCtx = null, this.selectedPlayerStats = null;
  },
  // Return stats object for the selected tab in the player modal
  playerStatsForTab(t) {
    const e = this.selectedPlayerStats;
    return e ? t === "season" ? e.seasonStats || null : t === "career" && (e.career || e.seasonStats) || null : null;
  },
  async loadData() {
    this.refreshManagerMap();
    try {
      const t = performance.now();
      let e = await kt(Gn);
      const s = e ? "server" : "localStorage";
      if (e || (e = localStorage.getItem(Gn)), e) {
        console.log(`[SF] ${s} read:`, Math.round(performance.now() - t) + "ms,", Math.round(e.length / 1024) + "KB");
        const n = performance.now(), { players: i, meta: a, ts: o } = await Mn(e);
        if (console.log("[SF] parseAsync players:", Math.round(performance.now() - n) + "ms,", i == null ? void 0 : i.length, "players"), i != null && i.length) {
          this.leagueTables = a.leagueTables || {}, this.asOfWeek = a.asOfWeek || "?", this.totalClubs = a.totalClubs || 0, this.managedSet = new Set(a.managedClubs || []), kt("sf_vacancies_v1").then((u) => {
            if (u)
              try {
                const { clubs: d } = JSON.parse(u);
                this.vacantClubs = new Set(d || []);
              } catch {
              }
          }).catch(() => {
          });
          const r = {};
          ea.forEach((u) => (this.leagueTables[u] || []).forEach((d) => {
            r[d.Team] = u;
          })), i.forEach((u) => {
            if (u._league = _l.has(u.Club) ? "other" : r[u.Club] || u._league || "world", u._gameRating = is(u, u.Position), u._weightedRating = wa(u, u.Position, of, 20), u._incompleteStats = bn.filter((d) => u[d] != null && u[d] > 0).length < 5, u.Position !== "GK") {
              let d = null, p = -1;
              for (const f of fc) {
                if (f === u.Position) continue;
                const g = is(u, f);
                g != null && g > p && (d = f, p = g);
              }
              p > 0 && (u._pos2 = d, u._pos2Rating = Math.round(p * 10) / 10);
            }
            if (u._pos2Rating != null && u._pos2Rating > (u._gameRating || 0) ? (u._bestPos = u._pos2, u._bestPosRating = u._pos2Rating) : (u._bestPos = u.Position, u._bestPosRating = u._gameRating), u._g90 === void 0) {
              const d = u.Minutes || 0;
              u._g90 = d >= 30 ? Math.round((u.Goals || 0) / d * 90 * 100) / 100 : null, u._a90 = d >= 30 ? Math.round((u.Assists || 0) / d * 90 * 100) / 100 : null, u._xG90 = d >= 30 && u.xG != null ? Math.round(u.xG / d * 90 * 100) / 100 : null, u._xA90 = d >= 30 && u.xA != null ? Math.round(u.xA / d * 90 * 100) / 100 : null;
            }
            if (u._gc === void 0) {
              const d = u.Minutes || 0;
              u._gc = (u.Goals || 0) + (u.Assists || 0), u._gc90 = d >= 30 ? Math.round(u._gc / d * 90 * 100) / 100 : null, u._gDiff = u.xG != null ? Math.round(((u.Goals || 0) - u.xG) * 100) / 100 : null, u._aDiff = u.xA != null ? Math.round(((u.Assists || 0) - u.xA) * 100) / 100 : null, u._gDiff90 = d >= 30 && u.xG != null ? Math.round(((u.Goals || 0) - u.xG) / d * 90 * 100) / 100 : null, u._aDiff90 = d >= 30 && u.xA != null ? Math.round(((u.Assists || 0) - u.xA) / d * 90 * 100) / 100 : null;
            }
            if (u.DOB) {
              const d = new Date(u.DOB), p = /* @__PURE__ */ new Date(), f = (p - d) / (365.25 * 24 * 3600 * 1e3);
              if (u._u21 = f < 21, u._u20 = f < 20, f >= 20 && f < 21) {
                const g = new Date(d.getFullYear() + 21, d.getMonth(), d.getDate());
                u._weeksTo21 = Math.ceil((g - p) / (7 * 24 * 3600 * 1e3));
              } else
                u._weeksTo21 = null;
            } else
              u._u21 = (u.Age || 99) < 21, u._u20 = (u.Age || 99) < 20;
          });
          const l = performance.now();
          i.forEach((u) => Object.freeze(u)), console.log("[SF] Object.freeze:", Math.round(performance.now() - l) + "ms");
          const c = performance.now();
          this.allPlayers = i, console.log("[SF] Vue allPlayers set:", Math.round(performance.now() - c) + "ms"), this.playersCacheDate = new Date(o).toLocaleDateString(), this.progress = 100, this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache(), Date.now() - o > hC ? (this.playersRefreshing = !0, this.fetchFreshData(!1)) : (fetch(`${it}/tables/from-fixtures`).then((u) => u.json()).then((u) => {
            var p;
            const d = (p = u == null ? void 0 : u.meta) == null ? void 0 : p.asOfWeek;
            d != null && d !== "?" && (this.asOfWeek = d);
          }).catch(() => {
          }), setTimeout(() => this.enrichStats(), 500)), setTimeout(() => {
            !this.youthLoaded && !this.youthLoading && this.loadYouth();
          }, 3e3), setTimeout(() => {
            !this.espionageLoaded && !this.espionageLoading && this.loadEspionage();
          }, 7e3);
          return;
        }
      }
    } catch (t) {
      console.warn("Cache read failed:", t);
    }
    await this.fetchFreshData(!0);
  },
  async checkTacticsCache() {
    try {
      let t = await kt(zn);
      if (t || (t = localStorage.getItem(zn)), t) {
        const { ts: e } = JSON.parse(t);
        this.tacticsCacheDate = new Date(e).toLocaleDateString();
      }
    } catch {
    }
  },
  clearPlayersCache() {
    hf(Gn), hf("sf_squads_raw_v1");
    try {
      localStorage.removeItem(Gn);
    } catch {
    }
    try {
      localStorage.removeItem("sf_youth_hist_v2");
    } catch {
    }
    try {
      localStorage.removeItem("sf_youth_idx_v2");
    } catch {
    }
    try {
      localStorage.removeItem("sf_club_v1");
    } catch {
    }
    this.youthHistLoaded = !1, this.youthHistCacheDate = null, this.youthLoaded = !1, this.clubLoaded = !1, this.clubLoading = !1, this.playersRefreshing = !0, this.fetchFreshData(!1);
  },
  // Background stats enrichment — fetch full season stats per player from /api/player-stats
  async enrichStats(t = !1) {
    if (this.statsEnriching || this.statsEnriched && !t) return;
    if (this.statsEnriched = !1, !t)
      try {
        let i = await kt(po);
        if (i || (i = localStorage.getItem(po)), i) {
          console.log("[SF] stats cache:", Math.round(i.length / 1024) + "KB");
          const a = performance.now(), { statsMap: o, ts: r } = await Mn(i);
          if (console.log("[SF] parseAsync stats:", Math.round(performance.now() - a) + "ms"), o) {
            let l = 0;
            const c = this.allPlayers.map((h) => {
              const u = o[(h.Player || "").toLowerCase()];
              if (!u) return h;
              l++;
              const d = { ...h, ...u };
              if (d._gc === void 0) {
                const p = d.Minutes || 0;
                d._gc = (d.Goals || 0) + (d.Assists || 0), d._gc90 = p >= 30 ? Math.round(d._gc / p * 90 * 100) / 100 : null, d._gDiff = d.xG != null ? Math.round(((d.Goals || 0) - d.xG) * 100) / 100 : null, d._aDiff = d.xA != null ? Math.round(((d.Assists || 0) - d.xA) * 100) / 100 : null, d._gDiff90 = p >= 30 && d.xG != null ? Math.round(((d.Goals || 0) - d.xG) / p * 90 * 100) / 100 : null, d._aDiff90 = p >= 30 && d.xA != null ? Math.round(((d.Assists || 0) - d.xA) / p * 90 * 100) / 100 : null;
              }
              return Object.freeze(d);
            });
            if (l > 0) {
              await new Promise((u) => requestAnimationFrame(u)), this.allPlayers = c, this.statsEnriched = !0, Date.now() - r > uC && setTimeout(() => this.enrichStats(!0), 3e3);
              return;
            }
          }
        }
      } catch {
      }
    this.statsEnriching = !0, this.statsProgress = 0;
    const e = {}, s = this.allPlayers, n = 3;
    for (let i = 0; i < s.length; i += n) {
      const a = s.slice(i, i + n);
      await Promise.all(a.map(async (o) => {
        try {
          const r = encodeURIComponent(o.Player || "");
          if (!r) return;
          const l = await fetch(`${it}/player-stats?player=${r}`).then((g) => g.json());
          if (!l.ok) return;
          const c = {}, h = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision", "Mentality", "Experience", "Leadership", "Work rate", "Adaptability", "Form", "Confidence"];
          l.player && h.forEach((g) => {
            l.player[g] != null && (c[g] = l.player[g]);
          });
          const u = l.career || l.seasonStats;
          if (!u && Object.keys(c).length === 0) return;
          const d = u || {}, p = d.minutes || 0, f = {
            ...c,
            Games: d.games || 0,
            Minutes: p,
            Goals: d.goals || 0,
            Assists: d.assists || 0,
            xG: d.xG ?? null,
            xA: d.xA ?? null,
            Yellow: d.yellow || 0,
            Red: d.red || 0,
            Steals: d.steals || 0,
            Mistakes: d.mistakes || 0,
            POTM: d.potm || 0,
            "Pass %": d.passPct ?? null,
            "Tackle %": d.tacklePct ?? null,
            "Average Rating": d.averageRating ?? null,
            _g90: p >= 30 ? Math.round((d.goals || 0) / p * 90 * 100) / 100 : null,
            _a90: p >= 30 ? Math.round((d.assists || 0) / p * 90 * 100) / 100 : null,
            _xG90: p >= 30 && d.xG != null ? Math.round(d.xG / p * 90 * 100) / 100 : null,
            _xA90: p >= 30 && d.xA != null ? Math.round(d.xA / p * 90 * 100) / 100 : null,
            _gc: (d.goals || 0) + (d.assists || 0),
            _gc90: p >= 30 ? Math.round(((d.goals || 0) + (d.assists || 0)) / p * 90 * 100) / 100 : null,
            _gDiff: d.xG != null ? Math.round(((d.goals || 0) - d.xG) * 100) / 100 : null,
            _aDiff: d.xA != null ? Math.round(((d.assists || 0) - d.xA) * 100) / 100 : null,
            _gDiff90: p >= 30 && d.xG != null ? Math.round(((d.goals || 0) - d.xG) / p * 90 * 100) / 100 : null,
            _aDiff90: p >= 30 && d.xA != null ? Math.round(((d.assists || 0) - d.xA) / p * 90 * 100) / 100 : null
          };
          e[(o.Player || "").toLowerCase()] = f;
        } catch {
        }
      })), this.statsProgress = Math.round((i + n) / s.length * 100), await new Promise((o) => setTimeout(o, 50));
    }
    this.allPlayers = this.allPlayers.map((i) => {
      const a = e[(i.Player || "").toLowerCase()];
      return a ? Object.freeze({ ...i, ...a }) : i;
    }), yc({ statsMap: e, ts: Date.now() }).then((i) => {
      Ke(po, i);
      try {
        localStorage.setItem(po, i);
      } catch {
      }
    }).catch(() => {
    }), this.statsEnriching = !1, this.statsEnriched = !0, this.statsProgress = 100;
  },
  // Fetch /api/managers and rebuild managerMap + managedSet — cheap enough to call on every load
  async refreshManagerMap() {
    try {
      const e = ((await fetch(`${it}/managers`).then((n) => n.json())).managers || []).filter((n) => {
        var i;
        return n.club && !((i = n.username) != null && i.includes("~deleted~"));
      }), s = {};
      e.forEach((n) => {
        s[n.club] = n.name || n.username || "?";
      }), this.managerMap = s, this.managedSet = new Set(e.map((n) => n.club));
    } catch {
    }
  },
  async fetchFreshData(t = !0) {
    var e, s;
    try {
      t && (this.loadMsg = "Fetching leagues & managers…", this.progress = 5);
      const [n, , i] = await Promise.all([
        fetch(`${it}/tables/from-fixtures`).then((d) => d.json()),
        this.refreshManagerMap(),
        fetch(`${it}/admin/squads/public/clubs`).then((d) => d.json())
      ]);
      this.leagueTables = n, this.asOfWeek = ((e = n.meta) == null ? void 0 : e.asOfWeek) || "?";
      const a = {};
      ea.forEach((d) => (n[d] || []).forEach((p) => {
        a[p.Team] = d;
      }));
      const o = this.managedSet;
      try {
        const d = await kt("sf_vacancies_v1");
        if (d) {
          const { clubs: p } = JSON.parse(d);
          this.vacantClubs = new Set(p || []);
        } else
          this.vacantClubs = new Set([...i.clubs].filter((p) => !o.has(p) && !_l.has(p)));
      } catch {
        this.vacantClubs = /* @__PURE__ */ new Set();
      }
      const r = i.clubs;
      this.totalClubs = r.length;
      const l = /* @__PURE__ */ new Set(), c = [];
      let h = null;
      try {
        const d = await kt("sf_squads_raw_v1");
        if (d) {
          const { data: p, ts: f } = JSON.parse(d), g = (Date.now() - f) / 36e5;
          g < 24 && (h = p, console.log(`[SF] using pre-fetched squads cache (${g.toFixed(1)}h old)`));
        }
      } catch {
      }
      const u = (d, p) => {
        (p || []).forEach((f) => {
          const g = `${f.Player}|${f.Club || d}`;
          if (l.has(g)) return;
          if (l.add(g), f.Club = f.Club || d, f._league = _l.has(f.Club) ? "other" : a[f.Club] || "world", f._managed = o.has(f.Club), f._gameRating = is(f, f.Position), f._weightedRating = wa(f, f.Position, of, 20), f._estValue = gC(f), f._incompleteStats = bn.filter((_) => f[_] != null && f[_] > 0).length < 5, f.Position !== "GK") {
            let _ = null, y = -1;
            for (const b of fc) {
              if (b === f.Position) continue;
              const x = is(f, b);
              x != null && x > y && (_ = b, y = x);
            }
            y > 0 && (f._pos2 = _, f._pos2Rating = Math.round(y * 10) / 10);
          }
          f._pos2Rating != null && f._pos2Rating > (f._gameRating || 0) ? (f._bestPos = f._pos2, f._bestPosRating = f._pos2Rating) : (f._bestPos = f.Position, f._bestPosRating = f._gameRating);
          const m = f.Minutes || 0;
          if (f._g90 = m >= 30 ? Math.round((f.Goals || 0) / m * 90 * 100) / 100 : null, f._a90 = m >= 30 ? Math.round((f.Assists || 0) / m * 90 * 100) / 100 : null, f._xG90 = m >= 30 && f.xG != null ? Math.round(f.xG / m * 90 * 100) / 100 : null, f._xA90 = m >= 30 && f.xA != null ? Math.round(f.xA / m * 90 * 100) / 100 : null, f._gc = (f.Goals || 0) + (f.Assists || 0), f._gc90 = m >= 30 ? Math.round(f._gc / m * 90 * 100) / 100 : null, f._gDiff = f.xG != null ? Math.round(((f.Goals || 0) - f.xG) * 100) / 100 : null, f._aDiff = f.xA != null ? Math.round(((f.Assists || 0) - f.xA) * 100) / 100 : null, f._gDiff90 = m >= 30 && f.xG != null ? Math.round(((f.Goals || 0) - f.xG) / m * 90 * 100) / 100 : null, f._aDiff90 = m >= 30 && f.xA != null ? Math.round(((f.Assists || 0) - f.xA) / m * 90 * 100) / 100 : null, f.DOB) {
            const _ = new Date(f.DOB), y = /* @__PURE__ */ new Date(), b = (y - _) / (365.25 * 24 * 3600 * 1e3);
            if (f._u21 = b < 21, f._u20 = b < 20, b >= 20 && b < 21) {
              const x = new Date(_.getFullYear() + 21, _.getMonth(), _.getDate());
              f._weeksTo21 = Math.ceil((x - y) / (7 * 24 * 3600 * 1e3));
            }
          } else
            f._u21 = (f.Age || 99) < 21, f._u20 = (f.Age || 99) < 20;
          c.push(f);
        });
      };
      if (h)
        t && (this.loadMsg = "Loading squads from cache…", this.progress = 50), r.forEach((d) => {
          var p;
          return u(d, ((p = h[d]) == null ? void 0 : p.players) || h[d] || []);
        });
      else
        for (let d = 0; d < r.length; d++) {
          t && (this.loadMsg = `Fetching squads… (${d + 1}/${r.length})`, this.progress = 10 + Math.round(85 * (d + 1) / r.length));
          try {
            const p = await fetch(`${it}/squads?club=${encodeURIComponent(r[d])}`).then((f) => f.json());
            u(r[d], p.players);
          } catch {
            console.warn("Failed:", r[d]);
          }
          await new Promise((p) => setTimeout(p, 20));
        }
      t && (this.loadMsg = "Fetching transfers…", this.progress = 97);
      try {
        const [d, p] = await Promise.all([
          fetch(`${it}/transfers/done`).then((b) => b.json()),
          fetch(`${it}/transfer-list`).then((b) => b.json()).catch(() => ({ listings: [] }))
        ]), f = /* @__PURE__ */ new Set(["negotiation", "transfer", "listing", "auction", "swap"]), g = {}, m = {};
        (d.deals || []).forEach((b) => {
          const x = (b.playerName || "").toLowerCase();
          if (!x || !b.amount) return;
          const v = { amount: b.amount, buyer: b.buyer || b.toClub, seller: b.seller || b.fromClub, via: b.via, date: b.updatedAt || b.ts, isReal: f.has(b.via) };
          g[x] || (g[x] = []), g[x].push(v), v.isReal && (m[x] || (m[x] = []), m[x].push(v));
        }), [g, m].forEach((b) => Object.values(b).forEach((x) => x.sort((v, k) => new Date(k.date) - new Date(v.date)))), this.transferMap = m, this.allDeals = d.deals || [];
        const _ = {};
        (d.deals || []).forEach((b) => {
          const x = b.playerName || "";
          if (!x || !b.amount) return;
          const v = { player: x, amount: b.amount, buyer: b.buyer || b.toClub, seller: b.seller || b.fromClub, via: b.via, date: b.updatedAt || b.ts };
          [v.buyer, v.seller].filter(Boolean).forEach((k) => {
            _[k] || (_[k] = []), _[k].push(v);
          });
        }), Object.values(_).forEach((b) => b.sort((x, v) => new Date(v.date) - new Date(x.date))), this.clubTransferMap = _;
        const y = {};
        (p.listings || []).filter((b) => b.status !== "sold").forEach((b) => {
          var v;
          const x = (b.player || b.name || "").toLowerCase();
          y[x] = { ask: b.ask || b.price, bids: ((v = b.bids) == null ? void 0 : v.length) || 0, highestBid: b.highestBid || 0 };
        }), c.forEach((b) => {
          var k;
          const x = (b.Player || "").toLowerCase();
          (k = g[x]) != null && k.length && (b._transferHistory = g[x]);
          const v = m[x];
          if (v != null && v.length) {
            b._lastTransfer = v[0];
            const S = v[0].amount;
            b._estValue = Math.round(S / 5e5) * 5e5 || Math.round(S / 1e5) * 1e5 || S;
          }
          y[x] && (b._transferListed = !0, b._listingAsk = y[x].ask, b._listingBids = y[x].bids);
        });
      } catch (d) {
        console.warn("Transfer data unavailable:", d);
      }
      yc({
        players: c,
        meta: { leagueTables: n, asOfWeek: this.asOfWeek, totalClubs: r.length, managedClubs: [...o] },
        ts: Date.now()
      }).then((d) => {
        Ke(Gn, d);
        try {
          localStorage.setItem(Gn, d), this.cacheWorking = !0;
        } catch (p) {
          console.warn("Cache write failed:", p), this.cacheWorking = !1;
        }
      }).catch((d) => console.warn("stringifyAsync failed:", d)), c.forEach((d) => Object.freeze(d)), this.allPlayers = c, this.playersCacheDate = (/* @__PURE__ */ new Date()).toLocaleDateString(), this.playersRefreshing = !1, t && (this.progress = 100, this.loadMsg = "Done!", this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache()), setTimeout(() => this.enrichStats(), 800), t && (setTimeout(() => {
        !this.youthLoaded && !this.youthLoading && this.loadYouth();
      }, 3e3), setTimeout(() => {
        !this.espionageLoaded && !this.espionageLoading && this.loadEspionage();
      }, 7e3));
    } catch (n) {
      console.error(n), this.playersRefreshing = !1, t && ((s = n.message) != null && s.includes("Failed to fetch") || n.name === "TypeError") && (this.corsError = !0, this.buildBookmarklet());
    }
  },
  buildBookmarklet() {
    const t = `(function(){const s=document.createElement('iframe');s.src='${location.href}';s.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999';document.body.appendChild(s);})()`;
    this.bookmarkletHref = "javascript:" + encodeURIComponent(t);
  },
  destroyChart(t) {
    if (this.charts[t]) {
      try {
        this.charts[t].destroy();
      } catch {
      }
      delete this.charts[t];
    }
  },
  drawMoneyballChart(t) {
    this.destroyChart(t);
    const e = document.getElementById("chart-" + t);
    if (!e) return;
    const s = this.filteredPlayers;
    if (t === "value-rating") {
      const n = s.filter((i) => i._estValue > 0 && i.Rating > 0).map((i) => ({ x: i._estValue / 1e6, y: +i.Rating, label: i.Player + " (" + i.Club + ")" }));
      this.activeChartDef = { title: "True Market Value vs Rating", desc: "Top-right = most expensive and best. Outliers in top-left = overpriced; bottom-right = potential bargains.", listLabel: "Highest Value", listFmt: (i) => Hs(i._estValue), listColor: "#ffa657" }, this.charts[t] = new Chart(e, {
        type: "scatter",
        data: { datasets: [{ data: n, backgroundColor: "#1f6feb80", pointRadius: 4 }] },
        options: {
          plugins: { legend: { display: !1 }, tooltip: { callbacks: { label: (i) => i.raw.label + ": £" + i.raw.x.toFixed(1) + "m | Rtg " + i.raw.y.toFixed(1) } } },
          scales: { x: { title: { display: !0, text: "True Value (£m)" } }, y: { title: { display: !0, text: "Rating" } } }
        }
      });
    } else if (t === "goal-eff") {
      const n = s.filter((a) => a.Games > 0 && a.xG != null).map((a) => ({ x: +(a.xG || 0), y: +(a.Goals || 0), label: a.Player + " (" + a.Club + ")" })), i = Math.max(...n.map((a) => Math.max(a.x, a.y)), 1);
      this.activeChartDef = { title: "Goals Scored vs Expected Goals (xG)", desc: "Above diagonal = overperforming xG. Below = underperforming.", listLabel: "Best Over-performers", listFmt: (a) => "+" + ((a.Goals || 0) - (a.xG || 0) >= 0 ? "+" : "") + ((a.Goals || 0) - (a.xG || 0)).toFixed(2), listColor: "#7ee787" }, this.charts[t] = new Chart(e, { type: "scatter", data: { datasets: [
        { label: "Players", data: n, backgroundColor: "#7ee78780", pointRadius: 4 },
        { label: "Expected line", data: [{ x: 0, y: 0 }, { x: i, y: i }], type: "line", borderColor: "#30363d", borderDash: [4, 4], pointRadius: 0, borderWidth: 1 }
      ] }, options: {
        plugins: { legend: { display: !1 }, tooltip: { callbacks: { label: (a) => a.raw.label ? a.raw.label + ": xG " + a.raw.x.toFixed(2) + " | Gls " + a.raw.y : "" } } },
        scales: { x: { title: { display: !0, text: "xG" } }, y: { title: { display: !0, text: "Goals" } } }
      } });
    } else if (t === "assist-eff") {
      const n = s.filter((a) => a.Games > 0 && a.xA != null).map((a) => ({ x: +(a.xA || 0), y: +(a.Assists || 0), label: a.Player + " (" + a.Club + ")" })), i = Math.max(...n.map((a) => Math.max(a.x, a.y)), 1);
      this.activeChartDef = { title: "Assists vs Expected Assists (xA)", desc: "Above diagonal = overperforming xA. Below = underperforming.", listLabel: "Best Over-performers", listFmt: (a) => "+" + ((a.Assists || 0) - (a.xA || 0) >= 0 ? "+" : "") + ((a.Assists || 0) - (a.xA || 0)).toFixed(2), listColor: "#79c0ff" }, this.charts[t] = new Chart(e, { type: "scatter", data: { datasets: [
        { label: "Players", data: n, backgroundColor: "#79c0ff80", pointRadius: 4 },
        { label: "Expected line", data: [{ x: 0, y: 0 }, { x: i, y: i }], type: "line", borderColor: "#30363d", borderDash: [4, 4], pointRadius: 0, borderWidth: 1 }
      ] }, options: {
        plugins: { legend: { display: !1 }, tooltip: { callbacks: { label: (a) => a.raw.label ? a.raw.label + ": xA " + a.raw.x.toFixed(2) + " | Ast " + a.raw.y : "" } } },
        scales: { x: { title: { display: !0, text: "xA" } }, y: { title: { display: !0, text: "Assists" } } }
      } });
    } else if (t === "age-gems") {
      const n = { north: "#79c0ff", south: "#7ee787", europa: "#d2a8ff", world: "#ffa657", conference: "#ff7b72", hipster: "#39d353", other: "#8b949e" }, i = ea.map((a) => ({
        label: a,
        data: s.filter((o) => o._league === a && o.Age != null && o._weightedRating != null).map((o) => ({ x: +o.Age, y: +o._weightedRating, label: o.Player + " (" + o.Club + ") " + o.Position })),
        backgroundColor: n[a] + "80",
        pointRadius: 4
      }));
      this.activeChartDef = { title: "Age vs Weighted Position Rating — Young Gems", desc: "Top-left = young and highly rated for their position (incl. mental attributes).", listLabel: "Top Young Players (≤26)", listFmt: (a) => {
        var o;
        return a.Age + "y · " + ((o = a._weightedRating) == null ? void 0 : o.toFixed(1));
      }, listColor: "#d2a8ff" }, this.charts[t] = new Chart(e, {
        type: "scatter",
        data: { datasets: i },
        options: {
          plugins: { legend: { labels: { color: "#8b949e", boxWidth: 10 } }, tooltip: { callbacks: { label: (a) => a.raw.label ? a.raw.label + ": Age " + a.raw.x + " | PosRtg " + a.raw.y : "" } } },
          scales: { x: { title: { display: !0, text: "Age" }, min: 16, max: 38 }, y: { title: { display: !0, text: "Position Rating" } } }
        }
      });
    }
  },
  async loadTactics(t = !1) {
    var x, v, k;
    if (!t)
      try {
        let S = await kt(zn);
        if (S || (S = localStorage.getItem(zn)), S) {
          const { data: C, ts: D } = JSON.parse(S);
          if (Date.now() - D < cC) {
            this.tacticsData = C, this.tacticsCacheDate = new Date(D).toLocaleDateString(), this.tacticsLoaded = !0;
            return;
          }
        }
      } catch {
      }
    this.tacticsLoading = !0, this.tacticsLoaded = !1, this.tacticsMsg = "Collecting fixture IDs…", this.tacticsProgress = 2;
    const s = (await fetch(`${it}/admin/squads/public/clubs`).then((S) => S.json())).clubs, n = /* @__PURE__ */ new Set();
    for (let S = 0; S < s.length; S++) {
      this.tacticsMsg = `Collecting fixtures… ${S + 1}/${s.length}`, this.tacticsProgress = Math.round(10 * (S + 1) / s.length);
      try {
        ((await fetch(`${it}/matches?club=${encodeURIComponent(s[S])}&limit=8`).then((D) => D.json())).matches || []).forEach((D) => n.add(D.fixtureId));
      } catch {
      }
      await new Promise((C) => setTimeout(C, 60));
    }
    const i = [...n], a = /\b(\d-\d[-\d]*)\b/, o = {}, r = {}, l = {}, c = {}, h = { W: 0, D: 0, L: 0, n: 0, gf: 0, ga: 0 };
    let u = 0, d = 0;
    const p = (S) => {
      const C = S.toLowerCase();
      return C.includes("tiki") ? "Tiki-taka" : C.includes("counter") ? "Counter" : C.includes("relentless") || C.includes("press") ? "Pressing" : C.includes("direct") ? "Direct" : C.includes("attack") ? "Attacking" : C.includes("defen") ? "Defensive" : C.includes("fluid") ? "Fluid" : C.includes("rigid") ? "Rigid" : C.charAt(0).toUpperCase() + C.slice(1);
    };
    for (let S = 0; S < i.length; S++) {
      this.tacticsProgress = 10 + Math.round(88 * (S + 1) / i.length), this.tacticsMsg = `Analysing match reports… ${S + 1}/${i.length}`;
      try {
        const D = (await fetch(`${it}/matches/${i[S]}`).then((E) => E.json())).match;
        if (!D) continue;
        d++;
        const O = D.events || [], I = (x = D.home) == null ? void 0 : x.club, w = (v = D.away) == null ? void 0 : v.club;
        [{ side: "home", club: I }, { side: "away", club: w }].forEach(({ side: E, club: L }) => {
          var dt, lt, pt, _t;
          if (!L) return;
          const P = O.filter((K) => K.minute === 0 && K.type === "other" && K.team === L);
          let M = null, T = null;
          const F = (D.reportNarrative || []).slice(0, 3).join(" ");
          for (const K of P) {
            const q = K.description || "", U = q.match(/tiki[- ]?taka|counter[- ]?attack|\b(attacking|defensive|balanced|fluid|rigid|direct|pressing|relentless|compact|aggressive)\b/i);
            if (U && (T = p(U[0])), q.toLowerCase().includes(" in ")) {
              const at = q.match(a);
              if (at) {
                const A = at[1].split("-").map(Number);
                if (A.length >= 2 && A.reduce((R, N) => R + N, 0) >= 9) {
                  M = at[1];
                  break;
                }
              }
            }
          }
          if (!M && F.toLowerCase().includes(L.toLowerCase())) {
            const q = F.match(/lined up[^.]*?(\d-\d[-\d]*)/i) || F.match(/in (?:an? )?[\w ]+?(\d-\d[-\d]*)/i);
            q && q[1].split("-").map(Number).reduce((at, A) => at + A, 0) >= 9 && (M = q[1]);
          }
          if (!M) return;
          u++;
          const H = E === "home", Y = H ? ((dt = D.score) == null ? void 0 : dt.home) || 0 : ((lt = D.score) == null ? void 0 : lt.away) || 0, Z = H ? ((pt = D.score) == null ? void 0 : pt.away) || 0 : ((_t = D.score) == null ? void 0 : _t.home) || 0, nt = Y > Z ? "W" : Y < Z ? "L" : "D";
          o[M] || (o[M] = { formation: M, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0, styles: {} }), o[M][nt]++, o[M].gf += Y, o[M].ga += Z, o[M].n++, T && (o[M].styles[T] = (o[M].styles[T] || 0) + 1), T && (r[T] || (r[T] = { style: T, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), r[T][nt]++, r[T].gf += Y, r[T].ga += Z, r[T].n++), L === Ot && (l[M] || (l[M] = { W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), l[M][nt]++, l[M].gf += Y, l[M].ga += Z, l[M].n++, h[nt]++, h.gf += Y, h.ga += Z, h.n++, T && (c[T] = (c[T] || 0) + 1));
        });
      } catch {
      }
      await new Promise((C) => setTimeout(C, 60));
    }
    const f = Object.values(o).filter((S) => S.n >= 2).map((S) => {
      var D;
      const C = ((D = Object.entries(S.styles).sort((O, I) => I[1] - O[1])[0]) == null ? void 0 : D[0]) || "";
      return { ...S, topStyle: C, winPct: Math.round(100 * S.W / S.n), ppg: ((S.W * 3 + S.D) / S.n).toFixed(2), avgGF: (S.gf / S.n).toFixed(2), avgGA: (S.ga / S.n).toFixed(2) };
    }).sort((S, C) => C.n - S.n), g = Object.values(r).filter((S) => S.n >= 3).map((S) => ({ ...S, winPct: Math.round(100 * S.W / S.n), ppg: ((S.W * 3 + S.D) / S.n).toFixed(2), avgGF: (S.gf / S.n).toFixed(2), avgGA: (S.ga / S.n).toFixed(2) })).sort((S, C) => C.n - S.n), m = h.n > 0 ? {
      record: h,
      forms: Object.entries(l).sort((S, C) => C[1].n - S[1].n).map(([S, C]) => ({ formation: S, ...C, winPct: Math.round(100 * C.W / C.n) })),
      topStyle: ((k = Object.entries(c).sort((S, C) => C[1] - S[1])[0]) == null ? void 0 : k[0]) || null,
      styleBreakdown: c
    } : null, _ = { totalMatches: d, fixturesAnalysed: i.length, withFormation: u, formations: f, styles: g, myClubData: m };
    this.tacticsData = _;
    const y = Date.now();
    this.tacticsCacheDate = new Date(y).toLocaleDateString();
    const b = JSON.stringify({ data: _, ts: y });
    Ke(zn, b);
    try {
      localStorage.setItem(zn, b);
    } catch {
    }
    this.tacticsMsg = "Done!", this.tacticsProgress = 100, this.tacticsLoading = !1, this.tacticsLoaded = !0;
  }
}, AC = {
  getYouthAttr(t, e) {
    return t[e] != null && t[e] > 0 ? t[e] : t.stats && t.stats[e] != null && t.stats[e] > 0 ? t.stats[e] : null;
  },
  scoutPosRating(t, e) {
    const s = mi[e];
    if (!s) return null;
    const n = s.map((i) => this.getYouthAttr(t, i)).filter((i) => i != null);
    return n.length ? Math.round(n.reduce((i, a) => i + a, 0) / n.length * 10) / 10 : null;
  },
  scoutBestPos(t) {
    let e = null, s = -1;
    for (const n of Object.keys(mi)) {
      const i = this.scoutPosRating(t, n);
      i != null && i > s && (s = i, e = n);
    }
    return e ? { pos: e, rating: s } : null;
  },
  // ── Saved lineup ──────────────────────────────────────────────────────────
  loadSavedLineup() {
    try {
      const t = localStorage.getItem(`st2:last:${Ot}`);
      if (t) {
        const e = JSON.parse(t);
        e.runs = localStorage.getItem(`st2:runs:${Ot}`) || "on", this.savedLineup = e;
      } else
        this.savedLineup = null;
    } catch {
      this.savedLineup = null;
    }
  },
  // ── Generic table sort helpers ────────────────────────────────────────────
  tblSortBy(t, e) {
    const s = this.tblSort[t];
    this.tblSort = { ...this.tblSort, [t]: { col: e, dir: (s == null ? void 0 : s.col) === e && s.dir === "desc" ? "asc" : "desc" } };
  },
  tblSortIcon(t, e) {
    const s = this.tblSort[t];
    return !s || s.col !== e ? "" : s.dir === "asc" ? " ▲" : " ▼";
  },
  tblSorted(t, e) {
    if (!t) return [];
    const s = this.tblSort[e];
    if (!s || !s.col) return t;
    const { col: n, dir: i } = s, a = i === "asc" ? 1 : -1, o = (r) => n.split(".").reduce((l, c) => l == null ? void 0 : l[c], r);
    return [...t].sort((r, l) => {
      let c = o(r), h = o(l);
      if (c == null) return 1;
      if (h == null) return -1;
      const u = typeof c == "string" ? c.localeCompare(h) : Number(c) - Number(h);
      return a * u;
    });
  },
  // ── Youth table sort helpers ──────────────────────────────────────────────
  youthSortBy(t) {
    const e = { name: "name_a", pos: "pos_a", age: "age_a", value: "value_d", buyNow: "buynow_d", date: "date", status: "status_a", sclub: "sclub_a", bestpos: "bestpos_d", men: "men_d", wr: "wr_d", potential: "potential_d" }, s = { name_a: "name_d", name_d: "name_a", pos_a: "pos_d", pos_d: "pos_a", age_a: "age_d", age_d: "age_a", value_d: "value_a", value_a: "value_d", buynow_d: "buynow_a", buynow_a: "buynow_d", date: "date_a", date_a: "date", status_a: "status_d", status_d: "status_a", sclub_a: "sclub_d", sclub_d: "sclub_a", bestpos_d: "bestpos_a", bestpos_a: "bestpos_d", men_d: "men_a", men_a: "men_d", wr_d: "wr_a", wr_a: "wr_d", potential_d: "potential_a", potential_a: "potential_d" }, n = e[t];
    n && (this.youthHistSort = this.youthHistSort === n && s[n] || n);
  },
  youthSortIcon(t) {
    const e = this.youthHistSort, s = { name: "name_a", pos: "pos_a", age: "age_a", value: "value_a", buyNow: "buynow_a", date: "date_a", status: "status_a", sclub: "sclub_a", bestpos: "bestpos_a", men: "men_a", wr: "wr_a", potential: "potential_a" }, n = { name: "name_d", pos: "pos_d", age: "age_d", value: "value_d", buyNow: "buynow_d", date: "date", status: "status_d", sclub: "sclub_d", bestpos: "bestpos_d", men: "men_d", wr: "wr_d", potential: "potential_d" };
    return e === s[t] ? " ▲" : e === n[t] ? " ▼" : "";
  },
  // ── Espionage table sort helpers ──────────────────────────────────────────
  espSortBy(t) {
    const e = { club: "club", mgr: "mgr_a", ceo: "ceo_d", td: "td_d", asst: "asst_d", physio: "physio_d", training: "training_d", scouting: "scouting_d", academy: "academy_d", medical: "medical_d", analytics: "analytics_d", stadium: "stadium_d", ads: "ads_d" }, s = { club: "club_d", club_d: "club", mgr_a: "mgr_d", mgr_d: "mgr_a", ceo_d: "ceo_a", ceo_a: "ceo_d", td_d: "td_a", td_a: "td_d", asst_d: "asst_a", asst_a: "asst_d", physio_d: "physio_a", physio_a: "physio_d", training_d: "training_a", training_a: "training_d", scouting_d: "scouting_a", scouting_a: "scouting_d", academy_d: "academy_a", academy_a: "academy_d", medical_d: "medical_a", medical_a: "medical_d", analytics_d: "analytics_a", analytics_a: "analytics_d", stadium_d: "stadium_a", stadium_a: "stadium_d", ads_d: "ads_a", ads_a: "ads_d" }, n = e[t];
    n && (this.espionageSort = this.espionageSort === n && s[n] || n);
  },
  espSortIcon(t) {
    const e = this.espionageSort, s = { club: "club", mgr: "mgr_a", ceo: "ceo_a", td: "td_a", asst: "asst_a", physio: "physio_a", training: "training_a", scouting: "scouting_a", academy: "academy_a", medical: "medical_a", analytics: "analytics_a", stadium: "stadium_a", ads: "ads_a" }, n = { club: "club_d", mgr: "mgr_d", ceo: "ceo_d", td: "td_d", asst: "asst_d", physio: "physio_d", training: "training_d", scouting: "scouting_d", academy: "academy_d", medical: "medical_d", analytics: "analytics_d", stadium: "stadium_d", ads: "ads_d" };
    return e === s[t] ? " ▲" : e === n[t] ? " ▼" : "";
  },
  // ── Negotiations sort helpers ─────────────────────────────────────────────
  negoSortBy(t) {
    const e = { player: "player_d", parties: "parties_d", fee: "fee_d", status: "status_a", date: "date_d" }, s = { player_d: "player_a", player_a: "player_d", parties_d: "parties_a", parties_a: "parties_d", fee_d: "fee_a", fee_a: "fee_d", status_a: "status_d", status_d: "status_a", date_d: "date_a", date_a: "date_d" }, n = e[t];
    n && (this.negoSort = this.negoSort === n && s[n] || n);
  },
  negoSortIcon(t) {
    const e = this.negoSort, s = { player: "player_a", parties: "parties_a", fee: "fee_a", status: "status_a", date: "date_a" }, n = { player: "player_d", parties: "parties_d", fee: "fee_d", status: "status_d", date: "date_d" };
    return e === s[t] ? " ▲" : e === n[t] ? " ▼" : "";
  },
  // ── Staff recruitment ─────────────────────────────────────────────────────
  async loadApplicants() {
    var t;
    this.staffApplicantsLoading = !0, this.staffApplicantsMsg = "";
    try {
      const e = encodeURIComponent(Ot), [s, n] = await Promise.all([
        fetch(`${it}/staff/applicants?club=${e}`).then((a) => a.json()),
        fetch(`${it}/staff?club=${e}`).then((a) => a.json()).catch(() => ({}))
      ]);
      this.staffApplicants = s.applicants || [];
      const i = (t = this.staffApplicants[0]) == null ? void 0 : t.introducedWeek;
      if (i > 0)
        this.staffWeek = i;
      else {
        const a = await fetch(`${it}/fixtures/week`).then((o) => o.json()).catch(() => ({}));
        a.currentWeek > 0 && (this.staffWeek = a.currentWeek - 1);
      }
      n.openAds && (this.clubStaff = { ...this.clubStaff, openAds: n.openAds }), n.current && (this.clubStaff = { ...this.clubStaff, current: n.current });
    } catch (e) {
      this.staffApplicantsMsg = "⚠ " + e.message;
    } finally {
      this.staffApplicantsLoading = !1;
    }
  },
  staffApplicantRatingClass(t) {
    var n, i;
    const e = (i = (n = this.clubStaff) == null ? void 0 : n.current) == null ? void 0 : i[t.role], s = e == null ? void 0 : e.rating;
    return s ? t.rating > s ? "c-green" : t.rating === s ? "c-orange" : "c-red" : this.ratingClass(t.rating);
  },
  async rejectApplicant(t) {
    this.staffApplicants = (this.staffApplicants || []).filter((s) => s.id !== t.id);
    const e = await vl().catch(() => null);
    await fetch(`${it}/staff/applicants/reject`, {
      method: "POST",
      headers: e ? { "Content-Type": "application/json", Authorization: `Bearer ${e}`, "X-Club": Ot, "X-Role": "manager" } : { "Content-Type": "application/json" },
      body: JSON.stringify({ club: Ot, id: t.id })
    }).catch(() => {
    });
  },
  async toggleAd(t) {
    var i;
    const e = ((i = this.clubStaff) == null ? void 0 : i.openAds) || [], n = e.includes(t) ? e.filter((a) => a !== t) : [...e, t];
    this.staffAdsUpdating = !0;
    try {
      const o = { "Content-Type": "application/json", Authorization: `Bearer ${await vl()}`, "X-Club": Ot, "X-Role": "manager" }, l = await (await fetch(`${it}/staff/ads`, {
        method: "POST",
        headers: o,
        body: JSON.stringify({ club: Ot, roles: n })
      })).json();
      this.clubStaff = { ...this.clubStaff, openAds: l.openAds || n };
    } catch {
    } finally {
      this.staffAdsUpdating = !1;
    }
  },
  async generateApplicants() {
    this.staffGenLoading = !0, this.staffApplicants = null, this.staffGenMsg = "";
    try {
      this.staffGenMsg = "Authenticating…";
      const [t, e] = await Promise.all([
        vl(),
        fetch(`${it}/fixtures/week`).then((a) => a.json())
      ]), s = e.currentWeek - 1;
      if (!(s > 0)) throw new Error(`Bad week from /fixtures/week: ${JSON.stringify(e)}`);
      const n = { "Content-Type": "application/json" };
      this.staffGenMsg = `Week ${s} — toggling ads…`, await fetch(`${sa}/_staff/toggle`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ roles: ["CEO", "Assistant", "Physio"] })
      }), await fetch(`${sa}/_staff/toggle`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ roles: ["CEO", "Assistant", "Physio", "Technical Director"] })
      }), this.staffGenMsg = `Week ${s} — generating…`;
      const i = await fetch(`${sa}/_staff/generate`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ week: s })
      });
      if (!i.ok) {
        const a = await i.text();
        throw new Error(`${i.status} — ${a.slice(0, 120)}`);
      }
      this.staffGenMsg = "Loading applicants…", await this.loadApplicants(), this.staffGenMsg = "";
    } catch (t) {
      this.staffGenMsg = "⚠ Error: " + t.message;
    } finally {
      this.staffGenLoading = !1;
    }
  }
}, uf = "sf_chat_sessions_v1", df = "sf_chat_history_v1", PC = 20, TC = 30, ff = 3, DC = 8 * 1024 * 1024, RC = 10 * 1024 * 1024, pf = 2e4, LC = /\.(json|csv|txt|md)$/i, OC = 1568;
function yo(t) {
  return typeof t == "string" ? [{ type: "text", text: t }] : Array.isArray(t) ? t : [];
}
function Wm(t) {
  return new Promise((e, s) => {
    const n = new FileReader();
    n.onload = () => e(n.result), n.onerror = () => s(new Error(`Could not read ${t.name}`)), n.readAsDataURL(t);
  });
}
function EC(t) {
  return new Promise((e, s) => {
    const n = new FileReader();
    n.onload = () => e(n.result), n.onerror = () => s(new Error(`Could not read ${t.name}`)), n.readAsText(t);
  });
}
function FC(t) {
  return new Promise((e, s) => {
    const n = new Image();
    n.onload = () => e(n), n.onerror = () => s(new Error("Could not decode image")), n.src = t;
  });
}
async function IC(t) {
  const e = await Wm(t), s = await FC(e), n = Math.min(1, OC / Math.max(s.width, s.height)), i = Math.max(1, Math.round(s.width * n)), a = Math.max(1, Math.round(s.height * n)), o = document.createElement("canvas");
  o.width = i, o.height = a, o.getContext("2d").drawImage(s, 0, 0, i, a);
  const r = o.toDataURL("image/jpeg", 0.85), l = /^data:(.+?);base64,(.*)$/.exec(r);
  if (!l) throw new Error(`Could not process ${t.name}`);
  return { mediaType: l[1], base64: l[2] };
}
const NC = {
  _newChatSessionId() {
    return "cs_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  },
  _deriveChatTitle(t) {
    const e = (t || []).find((i) => i.role === "user");
    if (!e) return "New chat";
    const s = yo(e.content).find((i) => i.type === "text" && i.text), n = s ? s.text : "";
    return n ? n.length > 40 ? n.slice(0, 40) + "…" : n : "New chat";
  },
  _stripForStorage(t) {
    if (typeof t.content == "string") return t;
    const e = yo(t.content).map((s) => s.type === "image" ? { type: "text", text: "[image attached]" } : s.type === "document" ? { type: "text", text: "[PDF attached]" } : s.type === "text" ? { type: "text", text: s.text.length > 4e3 ? s.text.slice(0, 4e3) + "…" : s.text } : s);
    return { role: t.role, content: e, ts: t.ts };
  },
  chatBlocks(t) {
    return yo(t);
  },
  attachmentsFull() {
    return this.chatAttachments.length >= ff;
  },
  attachmentToBlock(t) {
    return t.kind === "image" ? { type: "image", source: { type: "base64", media_type: t.mediaType, data: t.base64 } } : t.kind === "document" ? { type: "document", source: { type: "base64", media_type: t.mediaType, data: t.base64 } } : { type: "text", text: `--- file: ${t.name} ---
${t.text}
--- end file ---` };
  },
  async onChatFileSelected(t) {
    const e = Array.from(t.target.files || []);
    t.target.value = "", this.chatError = "";
    for (const s of e) {
      if (this.attachmentsFull()) {
        this.chatError = `Up to ${ff} attachments per message.`;
        break;
      }
      try {
        if (s.type.startsWith("image/")) {
          if (s.size > DC) throw new Error(`${s.name} is too large (max 8MB)`);
          const { mediaType: n, base64: i } = await IC(s);
          this.chatAttachments.push({ id: this._newChatSessionId(), kind: "image", name: s.name, mediaType: n, base64: i });
        } else if (s.type === "application/pdf") {
          if (s.size > RC) throw new Error(`${s.name} is too large (max 10MB)`);
          const n = await Wm(s), i = /^data:(.+?);base64,(.*)$/.exec(n);
          if (!i) throw new Error(`Could not read ${s.name}`);
          this.chatAttachments.push({ id: this._newChatSessionId(), kind: "document", name: s.name, mediaType: "application/pdf", base64: i[2] });
        } else if (s.type.startsWith("text/") || s.type === "application/json" || LC.test(s.name)) {
          const n = await EC(s), i = n.length > pf ? n.slice(0, pf) + `
…[truncated]` : n;
          this.chatAttachments.push({ id: this._newChatSessionId(), kind: "text", name: s.name, text: i });
        } else
          throw new Error(`Unsupported file type: ${s.name}`);
      } catch (n) {
        this.chatError = n.message || "Could not attach file";
      }
    }
  },
  removeChatAttachment(t) {
    this.chatAttachments.splice(t, 1);
  },
  loadChatHistory() {
    try {
      const e = localStorage.getItem(uf);
      if (e) {
        const s = JSON.parse(e);
        this.chatSessions = Array.isArray(s.sessions) ? s.sessions : [], this.activeChatSessionId = s.activeId || null;
      } else {
        const s = localStorage.getItem(df), n = s ? JSON.parse(s) : [], i = {
          id: this._newChatSessionId(),
          title: this._deriveChatTitle(n),
          messages: n,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          aiTitled: !0
          // don't auto-rename pre-existing history on migration
        };
        this.chatSessions = [i], this.activeChatSessionId = i.id, localStorage.removeItem(df);
      }
    } catch {
      this.chatSessions = [], this.activeChatSessionId = null;
    }
    if (!this.chatSessions.length) {
      this.newChatSession();
      return;
    }
    const t = this.chatSessions.find((e) => e.id === this.activeChatSessionId) || this.chatSessions[0];
    this.activeChatSessionId = t.id, this.chatMessages = t.messages;
  },
  // touchedId: pass the session whose content actually changed (bumps its updatedAt for
  // sort order + applies the fallback title). Omit for saves that don't represent new
  // activity — renaming, deleting — so they don't reorder the list.
  saveChatHistory(t) {
    try {
      if (t) {
        const s = this.chatSessions.find((n) => n.id === t);
        s && (s.updatedAt = Date.now(), (!s.title || s.title === "New chat") && (s.title = this._deriveChatTitle(s.messages)));
      }
      const e = this.chatSessions.slice().sort((s, n) => (n.updatedAt || 0) - (s.updatedAt || 0)).slice(0, PC).map((s) => ({ ...s, messages: s.messages.slice(-TC).map((n) => this._stripForStorage(n)) }));
      localStorage.setItem(uf, JSON.stringify({ sessions: e, activeId: this.activeChatSessionId }));
    } catch {
    }
  },
  sortedChatSessions() {
    return this.chatSessions.slice().sort((t, e) => (e.updatedAt || 0) - (t.updatedAt || 0));
  },
  // Groups sortedChatSessions() into Claude-style date buckets for the sidebar list.
  chatSessionGroups() {
    const e = ((a) => {
      const o = new Date(a);
      return o.setHours(0, 0, 0, 0), o.getTime();
    })(Date.now()), s = e - 864e5, n = e - 7 * 864e5, i = [
      { label: "Today", sessions: [] },
      { label: "Yesterday", sessions: [] },
      { label: "Previous 7 days", sessions: [] },
      { label: "Older", sessions: [] }
    ];
    return this.sortedChatSessions().forEach((a) => {
      const o = a.updatedAt || a.createdAt || 0;
      o >= e ? i[0].sessions.push(a) : o >= s ? i[1].sessions.push(a) : o >= n ? i[2].sessions.push(a) : i[3].sessions.push(a);
    }), i.filter((a) => a.sessions.length);
  },
  toggleAssistantSidebar() {
    this.assistantSidebarExpanded = !this.assistantSidebarExpanded;
    try {
      localStorage.setItem("sf_assistant_sidebar_expanded", this.assistantSidebarExpanded ? "1" : "0");
    } catch {
    }
  },
  startRenameSession(t, e) {
    e && e.stopPropagation();
    const s = this.chatSessions.find((n) => n.id === t);
    s && (this.renamingSessionId = t, this.renameDraft = s.title, this.$nextTick(() => {
      const n = this.$refs["renameInput_" + t], i = Array.isArray(n) ? n[0] : n;
      i && (i.focus(), i.select());
    }));
  },
  commitRenameSession() {
    const t = this.chatSessions.find((e) => e.id === this.renamingSessionId);
    if (t) {
      const e = (this.renameDraft || "").trim();
      e && (t.title = e.length > 60 ? e.slice(0, 60) + "…" : e), t.aiTitled = !0, this.saveChatHistory();
    }
    this.renamingSessionId = null, this.renameDraft = "";
  },
  cancelRenameSession() {
    this.renamingSessionId = null, this.renameDraft = "";
  },
  // Fires once per session, right after the first assistant reply — replaces the truncated
  // first-message title with a real AI-generated one. Best-effort: failures just keep the fallback.
  async _maybeGenerateAiTitle(t) {
    const e = this.chatSessions.find((o) => o.id === t);
    if (!e || e.aiTitled) return;
    const s = e.messages.filter((o) => o.role === "user"), n = e.messages.filter((o) => o.role === "assistant");
    if (s.length !== 1 || n.length !== 1) return;
    e.aiTitled = !0;
    const i = (o) => yo(o.content).filter((r) => r.type === "text" && r.text).map((r) => r.text).join(" "), a = `User: ${i(s[0])}
Assistant: ${i(n[0])}`.trim().slice(0, 2e3);
    if (a)
      try {
        const o = await fetch(`${sa}/_title`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: a }),
          signal: AbortSignal.timeout(15e3)
        }), r = await o.json();
        if (o.ok && r.title) {
          const l = this.chatSessions.find((c) => c.id === t);
          l && (l.title = r.title, this.saveChatHistory());
        }
      } catch {
      }
  },
  newChatSession() {
    const t = { id: this._newChatSessionId(), title: "New chat", messages: [], createdAt: Date.now(), updatedAt: Date.now(), aiTitled: !1 };
    this.chatSessions.unshift(t), this.activeChatSessionId = t.id, this.chatMessages = t.messages, this.chatAttachments = [], this.chatError = "", this.saveChatHistory();
  },
  switchChatSession(t) {
    const e = this.chatSessions.find((s) => s.id === t);
    e && (this.activeChatSessionId = e.id, this.chatMessages = e.messages, this.chatAttachments = [], this.chatError = "", this.renamingSessionId = null, this.$nextTick(() => this.scrollChatToBottom()));
  },
  deleteChatSession(t) {
    const e = this.chatSessions.findIndex((s) => s.id === t);
    e !== -1 && confirm("Delete this chat?") && (this.chatSessions.splice(e, 1), this.chatSessions.length ? (this.activeChatSessionId = this.chatSessions[0].id, this.chatMessages = this.chatSessions[0].messages) : this.newChatSession(), this.saveChatHistory());
  },
  toggleAssistantDock() {
    if (this.activeTab !== "assistant") {
      this.assistantDockOpen = !this.assistantDockOpen;
      try {
        localStorage.setItem("sf_assistant_dock_open", this.assistantDockOpen ? "1" : "0");
      } catch {
      }
      this.assistantDockOpen ? this.$nextTick(() => this.scrollChatToBottom()) : this.assistantDockListOpen = !1;
    }
  },
  closeAssistantDock() {
    this.assistantDockOpen = !1, this.assistantDockListOpen = !1;
    try {
      localStorage.setItem("sf_assistant_dock_open", "0");
    } catch {
    }
  },
  scrollChatToBottom() {
    const t = this.$refs.chatScroll;
    t && (t.scrollTop = t.scrollHeight);
  },
  onChatKeydown(t) {
    t.key === "Enter" && !t.shiftKey && (t.preventDefault(), this.sendChatMessage());
  },
  // Summarizes squad, budget and top transfer targets from already-loaded data — no extra API calls.
  buildChatContext() {
    var h, u;
    const t = [`My club: ${Ot}. Current game week: ~${this.asOfWeek || "?"}.`];
    this.clubBudget != null && t.push(`Transfer budget: ${Hs(this.clubBudget)}${this.clubWageBudget != null ? `, wage budget: ${Hs(this.clubWageBudget)}/wk` : ""}.`), t.push(`
Pricing note: the raw "Value" field from the game API is NOT a reliable market price — quality players are scarce and in high demand, so real fees run well above it. Use "TrueVal" instead (shown below as value/source) — it's the last real transfer fee, the live transfer-list asking price, or recent negotiation activity where known, else a rating-scaled estimate off Value (marked "formula"). Ground any pricing discussion in TrueVal plus the recent transfers and transfer-list sections below, not the raw Value field.`);
    const e = { 1: ["442", "433", "4231", "532", "343"], 2: ["352", "541", "4411"], 3: ["4321", "451"], 4: ["4141", "442 D", "3421"], 5: ["3241", "4222", "4132"] }, s = (u = (h = this.clubFacData) == null ? void 0 : h.levels) == null ? void 0 : u.analytics, n = s ? Object.keys(e).filter((d) => +d <= s).flatMap((d) => e[d]).join(", ") : null;
    t.push(`
Game mechanics reference (fixed game rules — these are the actual dropdown options in the live submission form, not opponent-specific data):
- Formations are gated by Analytics Dept facility level, cumulative: Lv1 unlocks 442/433/4231/532/343, Lv2 adds 352/541/4411, Lv3 adds 4321/451, Lv4 adds 4141/442 D/3421, Lv5 adds 3241/4222/4132.${s ? ` My club's Analytics Dept is level ${s} → currently unlocked: ${n}.` : " (My club's current Analytics Dept level isn't loaded this session — check the My Club tab.)"}
- Match instructions (6 dropdowns): Mentality (Very Defensive / Defensive / Balanced / Attacking / Very Attacking), Style (Short / Mixed / Direct), Structure (Fluid / Balanced / Rigid), Defensive Line (Deep / Low / Medium / High), Attacking Focus (Left / Right / Central / Mixed), Pressing Intensity (High Press / Mid-Block / Low Block / Counter Press).
- Set-piece takers (Captain, Penalty, Free-kick, Corner) are just player assignments — no extra tuning for penalties or free-kicks. Corners alone have dedicated instructions: Attacking corner — Delivery (Inswinger / Outswinger / Driven / Short Corner), Stay Back (1 or 2 players forward), 7 zone roles (Near Post, Far Post, Penalty Spot, Blockade, Edge of Box, Short Corner, Hold Back). Defensive corner — Scheme (Zonal / Man-to-Man / Hybrid), Press (Hold Shape / Press Taker), 6 zone roles (Near Post, Far Post, 6-Yard Box, Penalty Spot, Edge of Box, Counter Runner).
- Substitutions: 5 subs per match. Each sub has a Plan (same 5 mentality values above) and a Timing trigger = a window (Half-time / 46-60' / 61-75' / 76'-) plus a condition. Only the Half-time window offers "if losing" as a condition; the other three windows only offer "if winning" / "if not winning" / "any situation".`);
    const i = (this.allPlayers || []).filter((d) => d.Club === Ot);
    i.length && (t.push(`
My squad (${i.length} players) — Name | Pos | Age | Rating | Fitness | TrueVal (source) | AltPosFit | Ldr/Ment/Exp | FK/Pen/Cor:`), i.slice().sort((d, p) => (p._gameRating || 0) - (d._gameRating || 0)).forEach((d) => {
      const p = d.fitnessPct != null ? `${d.fitnessPct}%` : "?", g = (Nm[d.Position] || []).filter((y) => y !== d.Position && y !== "GK").map((y) => `${y}:${is(d, y) ?? "?"}`).join(",") || "-", m = `${d.Leadership ?? "?"}/${d.Mentality ?? "?"}/${d.Experience ?? "?"}`, _ = `${d["Free kicks"] ?? "?"}/${d.Penalties ?? "?"}/${d.Corners ?? "?"}`;
      t.push(`${d.Player} | ${d.Position} | ${d.Age} | ${d._gameRating || "?"} | ${p} | ${Hs(this.trueVal(d))} (${this.trueValSrc(d)}) | ${g} | ${m} | ${_}${d.injured ? " [INJURED]" : ""}${d.suspended ? " [SUSPENDED]" : ""}`);
    }), t.push(`Lineup-suggestion guidance: "AltPosFit" is each player's game-formula rating (same weighted-attribute formula as "Rating") if played at a different compatible position instead of their listed one. Some players inflate their nominal position's rating via one shared attribute (e.g. a converted DM's high Stamina alone can push their FB rating above a true fullback's) — always cross-check AltPosFit and recommend whichever position the numbers actually favor, not just the listed Position. For captain, weigh Leadership ("Ldr/Ment/Exp", first number) most heavily, with Mentality and Experience as secondary factors — do not just default to the highest-rated or best-known player. For set-piece takers, use the dedicated Free kicks / Penalties / Corners attributes ("FK/Pen/Cor") for the free-kick / penalty / corner taker respectively — these are literal in-game attributes, not proxies. For substitutions, the game allows 5 subs per match (not 3) — actively plan to use 3-5 of them with sensible Plan + Timing combinations suited to the match state (e.g. fresh legs / attacking sub late if chasing the game, a defensive sub to protect a lead), rather than defaulting to only 1-2 subs or leaving slots blank.`));
    const a = (this.allPlayers || []).filter((d) => {
      var p;
      return d.Club && d.Club !== Ot && !((p = this.vacantClubs) != null && p.has(d.Club)) && (d._gameRating || 0) >= 78;
    }).sort((d, p) => (p._gameRating || 0) - (d._gameRating || 0)).slice(0, 40);
    a.length && (t.push(`
Top-rated players elsewhere (potential transfer targets) — Name | Club | Pos | Age | Rating | TrueVal (source):`), a.forEach((d) => {
      t.push(`${d.Player} | ${d.Club} | ${d.Position} | ${d.Age} | ${d._gameRating || "?"} | ${Hs(this.trueVal(d))} (${this.trueValSrc(d)})`);
    }));
    const o = (this.allPlayers || []).flatMap((d) => (d._transferHistory || []).filter((p) => p.isReal).map((p) => ({ name: d.Player, ...p }))).sort((d, p) => new Date(p.date) - new Date(d.date)).slice(0, 30);
    o.length && (t.push(`
Recent real completed transfers league-wide (most recent first) — Player | Fee | Seller → Buyer | Date:`), o.forEach((d) => {
      t.push(`${d.name} | ${Hs(d.amount)} | ${d.seller || "?"} → ${d.buyer || "?"} | ${d.date ? new Date(d.date).toLocaleDateString("en-GB") : "?"}`);
    }));
    const r = (this.allPlayers || []).filter((d) => d._transferListed && d._listingAsk);
    r.length && (t.push(`
Players currently on the transfer list — Name | Club | Pos | Age | Rating | Asking price | Bids:`), r.slice().sort((d, p) => (p._gameRating || 0) - (d._gameRating || 0)).forEach((d) => {
      t.push(`${d.Player} | ${d.Club} | ${d.Position} | ${d.Age} | ${d._gameRating || "?"} | ${Hs(d._listingAsk)} | ${d._listingBids || 0}`);
    }));
    const l = Object.entries(this.espionageSubmissions || {}).filter(([d]) => d !== Ot).sort(([d], [p]) => d.localeCompare(p));
    l.length && (t.push(`
Opponent tactics — each club's most recently submitted lineup (this can be their plan for an upcoming, not-yet-played gameweek, so treat it as their likely XI/setup) — Club | Formation | Mentality | Style | GW | XI:`), l.forEach(([d, p]) => {
      var g, m;
      const f = (p.xi || []).map((_) => _.name).filter(Boolean).join(", ");
      t.push(`${d} | ${Lo(p.formation) || "?"} | ${((g = p.instructions) == null ? void 0 : g.mentality) || "?"} | ${((m = p.instructions) == null ? void 0 : m.style) || "?"} | ${p._gw ?? p.gameweek ?? "?"} | ${f || "?"}`);
    }));
    const c = (this.matchArchive || []).filter((d) => {
      var p, f;
      return ((p = d.home) == null ? void 0 : p.club) === Ot || ((f = d.away) == null ? void 0 : f.club) === Ot;
    }).sort((d, p) => (p.gameweek || 0) - (d.gameweek || 0)).slice(0, 8);
    return c.length && (t.push(`
My club's recent match results (most recent first; no fixture list is available so I don't know future opponents) — GW | Opponent (H/A) | Score | My formation/mentality | Opponent formation/mentality:`), c.forEach((d) => {
      var _;
      const p = ((_ = d.home) == null ? void 0 : _.club) === Ot, f = p ? d.home : d.away, g = p ? d.away : d.home, m = d.score ? `${d.score.home ?? "?"}-${d.score.away ?? "?"}` : "?";
      t.push(`GW${d.gameweek ?? "?"} | ${(g == null ? void 0 : g.club) || "?"} (${p ? "H" : "A"}) | ${m} | ${Lo(f == null ? void 0 : f.formation) || "?"}/${(f == null ? void 0 : f.mentality) || "?"} | ${Lo(g == null ? void 0 : g.formation) || "?"}/${(g == null ? void 0 : g.mentality) || "?"}`);
    })), t.join(`
`);
  },
  async sendChatMessage() {
    const t = (this.chatInput || "").trim();
    if (!t && !this.chatAttachments.length || this.chatLoading) return;
    const e = this.activeChatSessionId, s = [];
    t && s.push({ type: "text", text: t }), this.chatAttachments.forEach((n) => s.push(this.attachmentToBlock(n))), this.chatMessages.push({ role: "user", content: s, ts: Date.now() }), this.chatInput = "", this.chatAttachments = [], await this._requestAssistantReply(e);
  },
  // Pops the last assistant reply and re-requests one for the same conversation so far.
  async regenerateLastResponse() {
    if (this.chatLoading) return;
    const t = this.activeChatSessionId;
    let e = -1;
    for (let s = this.chatMessages.length - 1; s >= 0; s--)
      if (this.chatMessages[s].role === "assistant") {
        e = s;
        break;
      }
    e !== -1 && (this.chatMessages.splice(e, 1), await this._requestAssistantReply(t));
  },
  stopChatMessage() {
    this._chatAbortController && (this._chatStoppedByUser = !0, this._chatAbortController.abort());
  },
  // Shared by sendChatMessage (after the new user turn) and regenerateLastResponse (after
  // popping the old reply) — both just need "ask for the next assistant message and handle it".
  async _requestAssistantReply(t) {
    this.chatError = "", this.chatLoading = !0, this.saveChatHistory(t), this.$nextTick(() => this.scrollChatToBottom());
    const e = new AbortController();
    this._chatAbortController = e;
    const s = setTimeout(() => e.abort(), 45e3);
    try {
      const n = {
        context: this.buildChatContext(),
        messages: this.chatMessages.filter((o) => o.role === "user" || o.role === "assistant").map((o) => ({ role: o.role, content: o.content }))
      }, i = await fetch(`${sa}/_chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n),
        signal: e.signal
      }), a = await i.json();
      if (!i.ok || a.error) throw new Error(a.error || `Request failed (${i.status})`);
      this.chatMessages.push({ role: "assistant", content: a.reply || "(no response)", ts: Date.now() }), this._maybeGenerateAiTitle(t);
    } catch (n) {
      n.name === "AbortError" ? this._chatStoppedByUser || (this.chatError = "Request timed out") : this.chatError = n.message || "Failed to reach assistant";
    } finally {
      clearTimeout(s), this._chatAbortController = null, this._chatStoppedByUser = !1, this.chatLoading = !1, this.saveChatHistory(t), this.$nextTick(() => this.scrollChatToBottom());
    }
  }
}, BC = {
  matchArchiveFiltered() {
    if (!this.matchArchive) return [];
    let t = this.matchArchive;
    if (this.matchFilterComp && (t = t.filter((s) => {
      var n;
      return ((n = s.competition) == null ? void 0 : n.code) === this.matchFilterComp;
    })), this.matchFilterClub) {
      const s = this.matchFilterClub;
      t = t.filter((n) => {
        var i, a;
        return ((i = n.home) == null ? void 0 : i.club) === s || ((a = n.away) == null ? void 0 : a.club) === s;
      });
    }
    if (this.matchFilterManager) {
      const s = this.matchFilterManager.toLowerCase();
      t = t.filter((n) => {
        var i, a;
        return (this.managerMap[(i = n.home) == null ? void 0 : i.club] || "").toLowerCase().includes(s) || (this.managerMap[(a = n.away) == null ? void 0 : a.club] || "").toLowerCase().includes(s);
      });
    }
    const e = this.matchSort;
    return e === "gw_d" ? [...t].sort((s, n) => (n.gameweek || 0) - (s.gameweek || 0)) : e === "gw_a" ? [...t].sort((s, n) => (s.gameweek || 0) - (n.gameweek || 0)) : e === "date_d" ? [...t].sort((s, n) => (n.kickoff || "").localeCompare(s.kickoff || "")) : e === "date_a" ? [...t].sort((s, n) => (s.kickoff || "").localeCompare(n.kickoff || "")) : e === "home_a" ? [...t].sort((s, n) => {
      var i, a;
      return (((i = s.home) == null ? void 0 : i.club) || "").localeCompare(((a = n.home) == null ? void 0 : a.club) || "");
    }) : e === "away_a" ? [...t].sort((s, n) => {
      var i, a;
      return (((i = s.away) == null ? void 0 : i.club) || "").localeCompare(((a = n.away) == null ? void 0 : a.club) || "");
    }) : e === "comp_a" ? [...t].sort((s, n) => {
      var i, a;
      return (((i = s.competition) == null ? void 0 : i.name) || "").localeCompare(((a = n.competition) == null ? void 0 : a.name) || "");
    }) : t;
  },
  matchArchiveManagers() {
    if (!this.matchArchive) return [];
    const t = /* @__PURE__ */ new Set();
    return this.matchArchive.forEach((e) => {
      var i, a;
      const s = this.managerMap[(i = e.home) == null ? void 0 : i.club], n = this.managerMap[(a = e.away) == null ? void 0 : a.club];
      s && t.add(s), n && t.add(n);
    }), Array.from(t).sort();
  },
  matchArchiveClubs() {
    if (!this.matchArchive) return [];
    const t = /* @__PURE__ */ new Set();
    return this.matchArchive.forEach((e) => {
      var s, n;
      (s = e.home) != null && s.club && t.add(e.home.club), (n = e.away) != null && n.club && t.add(e.away.club);
    }), Array.from(t).sort();
  },
  matchArchiveComps() {
    if (!this.matchArchive) return [];
    const t = /* @__PURE__ */ new Map();
    return this.matchArchive.forEach((e) => {
      var s;
      (s = e.competition) != null && s.code && t.set(e.competition.code, e.competition.name);
    }), Array.from(t.entries()).map(([e, s]) => ({ code: e, name: s })).sort((e, s) => e.name.localeCompare(s.name));
  },
  tacticsAnalysis() {
    var g, m, _, y, b, x, v, k, S, C, D, O, I, w, E, L, P, M, T, F, H, Y, Z, nt, dt, lt, pt, _t;
    if (!this.matchArchive) return null;
    const t = (K, q, U, at, A, R, N, z) => {
      if (!q) return;
      K[q] || (K[q] = { n: 0, W: 0, D: 0, L: 0, gf: 0, ga: 0, xgF: 0, xgA: 0, sqDiff: 0 });
      const $ = K[q];
      $.n++, $[U]++, $.gf += at, $.ga += A, $.xgF += R || 0, $.xgA += N || 0, $.sqDiff += z || 0;
    }, e = (K) => Object.entries(K).map(([q, U]) => ({
      key: q,
      n: U.n,
      W: U.W,
      D: U.D,
      L: U.L,
      winPct: U.n ? Math.round(U.W / U.n * 100) : 0,
      ppg: U.n ? Math.round((U.W * 3 + U.D) / U.n * 100) / 100 : 0,
      avgGF: U.n ? Math.round(U.gf / U.n * 10) / 10 : 0,
      avgGA: U.n ? Math.round(U.ga / U.n * 10) / 10 : 0,
      avgXgF: U.n ? Math.round(U.xgF / U.n * 10) / 10 : 0,
      avgXgA: U.n ? Math.round(U.xgA / U.n * 10) / 10 : 0,
      avgXgDiff: U.n ? Math.round((U.xgF - U.xgA) / U.n * 10) / 10 : 0,
      avgSqDiff: U.n ? Math.round(U.sqDiff / U.n * 10) / 10 : 0
    })).filter((q) => q.n >= 3).sort((q, U) => U.winPct - q.winPct), s = {}, n = {};
    for (const K of this.matchArchive) {
      const q = ((g = K.score) == null ? void 0 : g.home) ?? 0, U = ((m = K.score) == null ? void 0 : m.away) ?? 0, at = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((y = (_ = K.stats) == null ? void 0 : _.xg) == null ? void 0 : y.home) || 0, N = ((x = (b = K.stats) == null ? void 0 : b.xg) == null ? void 0 : x.away) || 0, z = (((k = (v = K.home) == null ? void 0 : v.sqRtg) == null ? void 0 : k.overall) || 0) - (((C = (S = K.away) == null ? void 0 : S.sqRtg) == null ? void 0 : C.overall) || 0), $ = this.fmtFormation((D = K.home) == null ? void 0 : D.formation), B = this.fmtFormation((O = K.away) == null ? void 0 : O.formation), G = (I = K.home) == null ? void 0 : I.mentality, j = (w = K.away) == null ? void 0 : w.mentality;
      t(s, $ && B ? `${$} vs ${B}` : null, at, q, U, R, N, z), t(s, $ && B ? `${B} vs ${$}` : null, A, U, q, N, R, -z), t(n, G && j ? `${G} vs ${j}` : null, at, q, U, R, N, z), t(n, G && j ? `${j} vs ${G}` : null, A, U, q, N, R, -z);
    }
    const i = {}, a = {}, o = {}, r = {};
    for (const K of this.analysisMatches) {
      const q = ((E = K.score) == null ? void 0 : E.home) ?? 0, U = ((L = K.score) == null ? void 0 : L.away) ?? 0, at = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((M = (P = K.stats) == null ? void 0 : P.xg) == null ? void 0 : M.home) || 0, N = ((F = (T = K.stats) == null ? void 0 : T.xg) == null ? void 0 : F.away) || 0, z = (((Y = (H = K.home) == null ? void 0 : H.sqRtg) == null ? void 0 : Y.overall) || 0) - (((nt = (Z = K.away) == null ? void 0 : Z.sqRtg) == null ? void 0 : nt.overall) || 0), $ = ((lt = (dt = K.home) == null ? void 0 : dt.sub) == null ? void 0 : lt.instructions) || {}, B = ((_t = (pt = K.away) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) || {}, G = $.pressing_intensity, j = B.pressing_intensity, V = $.style, W = B.style, X = $.defensive_line, J = B.defensive_line, et = $.transition_speed, tt = B.transition_speed;
      t(i, G && W ? `${G} vs ${W}` : null, at, q, U, R, N, z), t(i, j && V ? `${j} vs ${V}` : null, A, U, q, N, R, -z), t(a, V && j ? `${V} vs ${j}` : null, at, q, U, R, N, z), t(a, W && G ? `${W} vs ${G}` : null, A, U, q, N, R, -z), t(o, X && tt ? `${X} vs ${tt}` : null, at, q, U, R, N, z), t(o, J && et ? `${J} vs ${et}` : null, A, U, q, N, R, -z), t(r, et && J ? `${et} vs ${J}` : null, at, q, U, R, N, z), t(r, tt && X ? `${tt} vs ${X}` : null, A, U, q, N, R, -z);
    }
    const l = this.matchArchive.length, c = this.matchArchive.filter((K) => {
      var q, U;
      return ((q = K.home) == null ? void 0 : q.formation) && ((U = K.away) == null ? void 0 : U.formation);
    }).length, h = this.matchArchive.filter((K) => {
      var q, U;
      return ((q = K.home) == null ? void 0 : q.mentality) && ((U = K.away) == null ? void 0 : U.mentality);
    }).length, u = this.analysisMatches.length, d = this.analysisMatches.filter((K) => {
      var q, U, at, A, R, N;
      return ((at = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.pressing_intensity) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.pressing_intensity);
    }).length, p = this.analysisMatches.filter((K) => {
      var q, U, at, A, R, N;
      return ((at = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.defensive_line) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.defensive_line);
    }).length, f = this.analysisMatches.filter((K) => {
      var q, U, at, A, R, N;
      return ((at = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.transition_speed) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.transition_speed);
    }).length;
    return {
      formations: e(s),
      mentalities: e(n),
      pressing: e(i),
      styleVpress: e(a),
      defLine: e(o),
      transVline: e(r),
      coverage: { total: l, bothFormations: c, bothMentality: h, withInstr: u, withPress: d, withDefLine: p, withTrans: f }
    };
  },
  subsDbStats() {
    var a, o, r, l, c, h, u, d, p;
    if (!this.subsDb || !this.matchArchive) return null;
    const t = this.subsDb.clubs || {}, e = {};
    for (const f of this.matchArchive) {
      const g = f._gw;
      if (g == null) continue;
      const m = (o = t[(a = f.home) == null ? void 0 : a.club]) == null ? void 0 : o[g], _ = (l = t[(r = f.away) == null ? void 0 : r.club]) == null ? void 0 : l[g];
      e[g] || (e[g] = { gw: g, n: 0, hSub: 0, aSub: 0, bothSub: 0, bothFm: 0, bothMen: 0, press: 0, line: 0, trans: 0, sides: 0 });
      const y = e[g];
      y.n++, m && y.hSub++, _ && y.aSub++, m && _ && y.bothSub++, m != null && m.formation && (_ != null && _.formation) && y.bothFm++, (c = m == null ? void 0 : m.instructions) != null && c.mentality && ((h = _ == null ? void 0 : _.instructions) != null && h.mentality) && y.bothMen++;
      for (const b of [m, _])
        b && (y.sides++, (u = b.instructions) != null && u.pressing_intensity && y.press++, (d = b.instructions) != null && d.defensive_line && y.line++, (p = b.instructions) != null && p.transition_speed && y.trans++);
    }
    const s = Object.values(e).sort((f, g) => g.gw - f.gw), n = this.matchArchive.length, i = s.reduce((f, g) => (f.bothSub += g.bothSub, f.bothFm += g.bothFm, f.bothMen += g.bothMen, f.sides += g.sides, f.press += g.press, f.line += g.line, f.trans += g.trans, f), { bothSub: 0, bothFm: 0, bothMen: 0, sides: 0, press: 0, line: 0, trans: 0 });
    return { rows: s, total: n, totals: i };
  }
}, $C = {
  filterableAttrs() {
    return [
      { k: "Speed", l: "Speed" },
      { k: "Stamina", l: "Stamina" },
      { k: "Dribbling", l: "Drib" },
      { k: "Passing", l: "Pass" },
      { k: "Shooting", l: "Shoot" },
      { k: "Tackling", l: "Tckl" },
      { k: "Marking", l: "Mark" },
      { k: "Heading", l: "Head" },
      { k: "Vision", l: "Vision" },
      { k: "Handling", l: "Handl" },
      { k: "Reflexes", l: "Reflex" },
      { k: "Mentality", l: "Mental" },
      { k: "Experience", l: "Exp" },
      { k: "Work rate", l: "Wk.Rate" },
      { k: "Leadership", l: "Leader" },
      { k: "Adaptability", l: "Adapt" }
    ];
  },
  activeAttrFilterCount() {
    return Object.values(this.attrFilters).filter((t) => t > 0).length;
  },
  mySquadPlayers() {
    return this.allPlayers.filter((t) => t.Club === Ot);
  },
  mySquadDislikes() {
    const t = this.mySquadPlayers, e = [], s = /* @__PURE__ */ new Set();
    for (const n of t)
      for (const i of vh(n, t, this.allDeals)) {
        const a = [n.Player, i.name].sort().join("|");
        if (s.has(a)) continue;
        s.add(a);
        const o = t.find((r) => r.Player === i.name);
        e.push({ a: { name: n.Player, pos: n.Position }, b: { name: i.name, pos: i.pos }, weeks: i.weeks, aObj: n, bObj: o });
      }
    return e.sort((n, i) => i.weeks - n.weeks);
  },
  lineupPlayerMap() {
    const t = {};
    for (const e of this.allPlayers)
      e.Player && (t[e.Player.toLowerCase()] = e);
    return t;
  },
  lineupWithStats() {
    if (!this.savedLineup) return null;
    const t = this.lineupPlayerMap, e = (s) => (s ? t[s.toLowerCase()] : null) || null;
    return {
      ...this.savedLineup,
      xi: (this.savedLineup.xi || []).map((s) => ({ ...s, player: e(s.name) })),
      subs: (this.savedLineup.subs || []).map((s) => ({ ...s, player: e(s.name) }))
    };
  },
  mySquadByPosition() {
    const t = ["GK", "FB", "CB", "DM", "AM", "WF", "CF"], e = {};
    return t.forEach((s) => {
      e[s] = [];
    }), this.mySquadPlayers.forEach((s) => {
      e[s.Position] && e[s.Position].push(s);
    }), t.forEach((s) => e[s].sort((n, i) => (i._gameRating || 0) - (n._gameRating || 0))), t.map((s) => ({ pos: s, players: e[s] })).filter((s) => s.players.length);
  },
  bestXIPlayers() {
    const t = xh[this.mySquadFormation];
    if (!t) return [];
    const e = this.mySquadPlayers, s = /* @__PURE__ */ new Set(), n = (i, a) => {
      const r = (fC[a] || []).map((l) => i[l]).filter((l) => l != null && l > 0);
      return r.length ? r.reduce((l, c) => l + c, 0) / r.length : 0;
    };
    return t.map((i, a) => {
      const o = Nm[i] || [i];
      let r = null, l = -1;
      for (const h of e) {
        if (s.has(h.Player) || !o.includes(h.Position)) continue;
        const u = n(h, i);
        u > l && (r = h, l = u);
      }
      r && s.add(r.Player);
      const c = r ? Math.round(n(r, i) * 10) / 10 : null;
      return { slot: i, player: r, idx: a, slotRating: c };
    });
  },
  mySquadSetPieces() {
    const t = this.mySquadPlayers, e = (s, n = 5) => [...t].filter((i) => i[s] != null && i[s] > 0).sort((i, a) => (a[s] || 0) - (i[s] || 0)).slice(0, n);
    return [
      { title: "🎯 Free Kicks", key: "Free kicks", players: e("Free kicks") },
      { title: "⚽ Penalties", key: "Penalties", players: e("Penalties") },
      { title: "🔵 Corners", key: "Corners", players: e("Corners") }
    ];
  },
  mySquadCaptainList() {
    return [...this.mySquadPlayers].filter((t) => t.Leadership != null).sort((t, e) => (e.Leadership || 0) - (t.Leadership || 0)).slice(0, 8);
  }
}, jC = {
  espionageFiltered() {
    let t = [...this.espionageClubs];
    if (this.espionageSearch.trim()) {
      const i = this.espionageSearch.trim().toLowerCase();
      t = t.filter((a) => a.club.toLowerCase().includes(i) || (this.managerMap[a.club] || "").toLowerCase().includes(i));
    }
    this.espShowVacantOnly && (t = t.filter((i) => !this.managedSet.has(i.club)));
    const e = (i, a) => {
      var o, r;
      return ((r = (o = i.current) == null ? void 0 : o[a]) == null ? void 0 : r.rating) || 0;
    }, s = (i, a) => {
      var o;
      return ((o = i.levels) == null ? void 0 : o[a]) || 0;
    }, n = {
      ceo_d: (i, a) => e(a, "CEO") - e(i, "CEO"),
      ceo_a: (i, a) => e(i, "CEO") - e(a, "CEO"),
      td_d: (i, a) => e(a, "Technical Director") - e(i, "Technical Director"),
      td_a: (i, a) => e(i, "Technical Director") - e(a, "Technical Director"),
      asst_d: (i, a) => e(a, "Assistant") - e(i, "Assistant"),
      asst_a: (i, a) => e(i, "Assistant") - e(a, "Assistant"),
      physio_d: (i, a) => e(a, "Physio") - e(i, "Physio"),
      physio_a: (i, a) => e(i, "Physio") - e(a, "Physio"),
      training_d: (i, a) => s(a, "training") - s(i, "training"),
      training_a: (i, a) => s(i, "training") - s(a, "training"),
      scouting_d: (i, a) => s(a, "scouting") - s(i, "scouting"),
      scouting_a: (i, a) => s(i, "scouting") - s(a, "scouting"),
      academy_d: (i, a) => s(a, "academy") - s(i, "academy"),
      academy_a: (i, a) => s(i, "academy") - s(a, "academy"),
      medical_d: (i, a) => s(a, "medical") - s(i, "medical"),
      medical_a: (i, a) => s(i, "medical") - s(a, "medical"),
      analytics_d: (i, a) => s(a, "analytics") - s(i, "analytics"),
      analytics_a: (i, a) => s(i, "analytics") - s(a, "analytics"),
      stadium_d: (i, a) => s(a, "stadium") - s(i, "stadium"),
      stadium_a: (i, a) => s(i, "stadium") - s(a, "stadium"),
      ads_d: (i, a) => {
        var o, r;
        return (((o = a.openAds) == null ? void 0 : o.length) || 0) - (((r = i.openAds) == null ? void 0 : r.length) || 0);
      },
      ads_a: (i, a) => {
        var o, r;
        return (((o = i.openAds) == null ? void 0 : o.length) || 0) - (((r = a.openAds) == null ? void 0 : r.length) || 0);
      },
      club_d: (i, a) => a.club.localeCompare(i.club),
      mgr_d: (i, a) => (this.managerMap[a.club] || "").localeCompare(this.managerMap[i.club] || ""),
      mgr_a: (i, a) => {
        const o = this.managedSet.has(i.club) ? 1 : 0, r = this.managedSet.has(a.club) ? 1 : 0;
        return o !== r ? o - r : (this.managerMap[i.club] || "").localeCompare(this.managerMap[a.club] || "");
      }
    };
    return t.sort(n[this.espionageSort] || ((i, a) => i.club.localeCompare(a.club))), t;
  },
  espionageNegoFiltered() {
    const t = (this.espionageNegoSearch || "").trim().toLowerCase(), e = Date.now() - 14 * 24 * 3600 * 1e3;
    let s = this.espionageNegos.filter((i) => i.via === "auction" || !this.negoShowAll && !t && new Date(i.updatedAt || 0).getTime() < e ? !1 : t ? (i.playerName || "").toLowerCase().includes(t) || (i.buyer || "").toLowerCase().includes(t) || (i.seller || "").toLowerCase().includes(t) : !0);
    const n = this.negoSort;
    return n === "player_a" ? s.sort((i, a) => (i.playerName || "").localeCompare(a.playerName || "")) : n === "player_d" ? s.sort((i, a) => (a.playerName || "").localeCompare(i.playerName || "")) : n === "fee_d" ? s.sort((i, a) => (a.fee || a.amount || 0) - (i.fee || i.amount || 0)) : n === "fee_a" ? s.sort((i, a) => (i.fee || i.amount || 0) - (a.fee || a.amount || 0)) : n === "status_a" ? s.sort((i, a) => (i.status || "").localeCompare(a.status || "")) : n === "date_a" ? s.sort((i, a) => new Date(i.updatedAt || 0) - new Date(a.updatedAt || 0)) : s.sort((i, a) => new Date(a.updatedAt || 0) - new Date(i.updatedAt || 0)), s;
  },
  negoPlayerMap() {
    const t = {};
    for (const e of this.espionageNegos) {
      const s = (e.playerName || "").toLowerCase();
      if (!s || t[s]) continue;
      const n = e.player || e.playerInfo || {}, i = e.playerPosition || e.playerPos || n.position || n.pos || e.position || null, a = e.playerAge ?? e.playerDOB ?? n.age ?? n.dob ?? e.age ?? null, o = e.playerRating ?? e.playerOverall ?? n.rating ?? n.overall ?? e.rating ?? null, r = e.playerClub || n.club || n.clubName || e.seller || null;
      t[s] = { Player: e.playerName, Position: i || null, Age: a, _gameRating: o, Club: r };
    }
    return t;
  },
  effectiveBudget() {
    return this.clubBudget ?? this.budgetOverride;
  },
  clubBudgetFor() {
    return (t) => {
      if (!t) return null;
      const e = this.allBudgets[t] || this.allBudgets[t.toLowerCase()] || null;
      return e ? typeof e == "number" ? e : e.transfer ?? e.transferBudget ?? e.available ?? e.budget ?? null : t === this.myClub ? this.effectiveBudget : null;
    };
  },
  auctionsByPlayer() {
    var a, o;
    const t = this._nowMs;
    if (this.auctionItems.length) {
      const r = [], l = [];
      for (const c of this.auctionItems) {
        const u = new Date(c.endsAt || 0).getTime() > t, d = ((a = c.highest) == null ? void 0 : a.bidder) || null, p = [...c.bids || []].sort((m, _) => (_.amount || 0) - (m.amount || 0)).map((m) => ({
          id: `${c.id}-${m.bidder}`,
          buyer: m.bidder,
          amount: m.amount,
          updatedAt: m.at,
          via: "auction",
          status: u ? "pending" : m.bidder === d ? "accepted" : "rejected",
          subStatus: u || m.bidder === d ? null : "outbid"
        }));
        let f = ((o = p[0]) == null ? void 0 : o.buyer) || null;
        for (const m of p) {
          const _ = this.clubBudgetFor(m.buyer);
          if (_ == null || _ >= m.amount) {
            f = m.buyer;
            break;
          }
        }
        const g = { playerName: c.player, seller: c.club, bids: p, endsAt: c.endsAt, effectiveWinner: f };
        u ? r.push(g) : l.push(g);
      }
      return r.sort((c, h) => (c.playerName || "").localeCompare(h.playerName || "")), l.sort((c, h) => new Date(h.endsAt || 0) - new Date(c.endsAt || 0)), { active: r, past: l };
    }
    const e = this.nextAuctionClose.getTime() - 7 * 24 * 3600 * 1e3, s = /* @__PURE__ */ new Map();
    for (const r of this.espionageNegos) {
      if (r.via !== "auction") continue;
      const l = (r.playerName || "?").toLowerCase();
      s.has(l) || s.set(l, { playerName: r.playerName, seller: r.seller, bids: [] }), s.get(l).bids.push(r);
    }
    for (const r of s.values())
      r.bids.sort((l, c) => (c.amount || 0) - (l.amount || 0));
    const n = [], i = [];
    for (const r of s.values())
      r.bids.some(
        (c) => c.status === "pending" && new Date(c.updatedAt || c.createdAt || 0).getTime() > e
      ) ? n.push(r) : i.push(r);
    return n.sort((r, l) => (r.playerName || "").localeCompare(l.playerName || "")), i.sort((r, l) => {
      const c = Math.max(...r.bids.map((u) => new Date(u.updatedAt || 0).getTime()));
      return Math.max(...l.bids.map((u) => new Date(u.updatedAt || 0).getTime())) - c;
    }), { active: n, past: i };
  },
  nextAuctionClose() {
    const t = new Date(this._nowMs), e = t.getUTCMonth(), n = e >= 2 && e <= 9 ? 20 : 21, i = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), n, 0, 0)), a = i.getUTCDay();
    return i.setUTCDate(i.getUTCDate() + (3 - a + 7) % 7), i.getTime() <= this._nowMs && i.setUTCDate(i.getUTCDate() + 7), i;
  },
  auctionCountdown() {
    const t = this.nextAuctionClose.getTime() - this._nowMs;
    if (t <= 0) return "closing…";
    const e = Math.floor(t / 36e5), s = Math.floor(t % 36e5 / 6e4);
    return e >= 48 ? `${Math.floor(e / 24)}d ${e % 24}h` : e > 0 ? `${e}h ${s}m` : `${s}m`;
  }
}, WC = {
  activeModalStats() {
    const t = this.selectedPlayerStats;
    return t ? this.selectedPlayerStatsTab === "season" ? t.seasonStats || null : this.selectedPlayerStatsTab === "career" && (t.career || t.seasonStats) || null : null;
  },
  selectedPlayerTraits() {
    return this.selectedPlayer ? mc(this.selectedPlayer) : [];
  },
  selectedPlayerBonds() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const t = this.allPlayers.filter((e) => e.Club === this.selectedPlayer.Club);
    return $m(this.selectedPlayer, t, this.allDeals);
  },
  selectedPlayerDislikes() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const t = this.allPlayers.filter((e) => e.Club === this.selectedPlayer.Club);
    return vh(this.selectedPlayer, t, this.allDeals);
  },
  mySquadChem() {
    const t = this.allPlayers.filter((e) => e.Club === Ot);
    return jm(t, this.allDeals);
  },
  availableTraits() {
    const t = /* @__PURE__ */ new Set();
    return this.allPlayers.forEach((e) => mc(e).forEach((s) => t.add(s.n))), ["", ...Array.from(t).sort()];
  },
  selectedPlayerBondSummary() {
    const t = this.selectedPlayerBonds;
    if (!t.length) return null;
    const e = t.filter((a) => a.label === "Long-term").length, s = t.filter((a) => a.label === "Established").length, n = t.filter((a) => a.label === "Building").length, i = [];
    return e && i.push({ label: `${e} Long-term`, color: "#3fb950" }), s && i.push({ label: `${s} Established`, color: "#d29922" }), n && i.push({ label: `${n} Building`, color: "#8b949e" }), i;
  },
  selectedPlayerNegos() {
    if (!this.selectedPlayer) return [];
    const t = (this.selectedPlayer.Player || this.selectedPlayer.name || "").toLowerCase();
    return t ? this.espionageNegos.filter((e) => (e.playerName || "").toLowerCase() === t) : [];
  },
  espionageNegoPage() {
    return this.espionageNegoFiltered.slice(0, this.negoDisplayCount);
  },
  selectedPlayerNegosVisible() {
    const t = this.selectedPlayerNegos;
    if (this.negoShowAllModal) return t;
    const e = Date.now() - 30 * 24 * 3600 * 1e3, s = t.filter((n) => new Date(n.updatedAt || 0).getTime() >= e);
    return s.length ? s : t.slice(0, 5);
  }
}, HC = {
  playersWithDislikesSet() {
    const t = /* @__PURE__ */ new Set(), e = {};
    for (const s of this.allPlayers)
      s.Club && (e[s.Club] = e[s.Club] || []).push(s);
    for (const s of Object.values(e))
      for (const n of s)
        !t.has(n.Player) && vh(n, s, this.allDeals).length > 0 && t.add(n.Player);
    return t;
  },
  filteredPlayers() {
    const t = this.search.toLowerCase();
    return this.allPlayers.filter((e) => {
      var i, a, o;
      if (!this.leagueFilter.has(e._league) || !this.posFilter.has(e.Position)) return !1;
      const s = this.posRatingUseWeighted ? e._weightedRating || e._gameRating || e.Rating || 0 : e._gameRating || e.Rating || 0;
      if (Object.values(this.posRatingFilters).some((r) => r > 60) && !Object.entries(this.posRatingFilters).some(([l, c]) => {
        if (c <= 60) return !1;
        const h = this.posRatingUseWeighted ? wa(e, l, this.mentalCfgAttrs, this.mentalWeightPct) : is(e, l);
        return h != null && h >= c;
      }) || this.posRatingMax < 99 && s > this.posRatingMax || this.maxAge < 40 && (e.Age || 99) > this.maxAge || this.ageGroupFilter === "u21" && !e._u21 || this.ageGroupFilter === "u20" && !e._u20 || this.hideOwn && e.Club === Ot || this.hideVacant && this.vacantClubs.has(e.Club) || this.managedOnly && !e._managed || this.forSaleOnly && (!e._managed || e.notForSale) || this.transferListedOnly && !e._transferListed || this.injuredOnly && !e.injured && !e.suspended || this.dislikesOnly && !this.playersWithDislikesSet.has(e.Player) || this.hideRetiring && e.retiring || this.traitFilter && !mc(e).map((l) => l.n).includes(this.traitFilter))
        return !1;
      for (const [r, l] of Object.entries(this.attrFilters))
        if (l > 0 && (e[r] || 0) < l) return !1;
      return !(t && !((i = e.Player) != null && i.toLowerCase().includes(t)) && !((a = e.Club) != null && a.toLowerCase().includes(t)) && !((o = e.Nationality) != null && o.toLowerCase().includes(t)));
    });
  },
  sortedPlayers() {
    const t = this.sortCol, e = this.sortDir;
    return [...this.filteredPlayers].sort((s, n) => {
      const i = s[t], a = n[t];
      return i == null ? 1 : a == null ? -1 : (typeof i == "number" ? i - a : String(i).localeCompare(String(a))) * e;
    });
  },
  pagedPlayers() {
    return this.sortedPlayers.slice(this.page * xl, (this.page + 1) * xl);
  },
  totalPages() {
    return Math.ceil(this.filteredPlayers.length / xl);
  },
  filteredClubs() {
    return new Set(this.filteredPlayers.map((t) => t.Club)).size;
  },
  topLists() {
    const t = this.filteredPlayers.filter((s) => s.Games > 0);
    return [
      { title: "⭐ Highest Rated", data: [...this.filteredPlayers].sort((s, n) => (n.Rating || 0) - (s.Rating || 0)).slice(0, 15), key: "Rating", color: "#ffa657", dec: 1 },
      { title: "🎯 Position Specialists", data: [...this.filteredPlayers].sort((s, n) => (n._weightedRating || 0) - (s._weightedRating || 0)).slice(0, 15), key: "_weightedRating", color: "#d2a8ff", dec: 1 },
      { title: "⚽ Top Scorers", data: [...t].sort((s, n) => (n.Goals || 0) - (s.Goals || 0)).slice(0, 15), key: "Goals", color: "#7ee787", dec: 0 },
      { title: "🎩 Most Clinical (Goals/xG)", data: [...t].filter((s) => (s.xG || 0) >= 1).sort((s, n) => (n.Goals || 0) / (n.xG || 1) - (s.Goals || 0) / (s.xG || 1)).slice(0, 15), key: "Goals", color: "#7ee787", dec: 0 },
      { title: "🅰 Top Assisters", data: [...t].sort((s, n) => (n.Assists || 0) - (s.Assists || 0)).slice(0, 15), key: "Assists", color: "#79c0ff", dec: 0 },
      { title: "💰 True Market Value", data: [...this.filteredPlayers].filter((s) => this.trueVal(s)).sort((s, n) => this.trueVal(n) - this.trueVal(s)).slice(0, 15), key: "_estValue", color: "#ffa657", dec: 0 },
      { title: "🔥 Highest Form", data: [...t].sort((s, n) => (n.Form || 0) - (s.Form || 0)).slice(0, 15), key: "Form", color: "#ff7b72", dec: 1 },
      { title: "🏃 Top Workhorses", data: [...t].sort((s, n) => (n.Steals || 0) + (n["Tackle %"] || 0) - (s.Steals || 0) - (s["Tackle %"] || 0)).slice(0, 15), key: "Steals", color: "#79c0ff", dec: 0 }
    ];
  },
  activeChartList() {
    const t = this.filteredPlayers.filter((e) => e.Games > 0);
    return this.mbChart === "value-rating" ? [...this.filteredPlayers].sort((e, s) => this.trueVal(s) - this.trueVal(e)).slice(0, 20) : this.mbChart === "goal-eff" ? [...t].filter((e) => e.xG > 0).sort((e, s) => (s.Goals || 0) - (s.xG || 0) - ((e.Goals || 0) - (e.xG || 0))).slice(0, 20) : this.mbChart === "assist-eff" ? [...t].filter((e) => e.xA > 0).sort((e, s) => (s.Assists || 0) - (s.xA || 0) - ((e.Assists || 0) - (e.xA || 0))).slice(0, 20) : this.mbChart === "age-gems" ? [...this.filteredPlayers].filter((e) => e.Age <= 26).sort((e, s) => (s._weightedRating || 0) - (e._weightedRating || 0)).slice(0, 20) : [];
  },
  mbMarketList() {
    return this.allPlayers.filter((t) => t._transferListed && t._listingAsk).map((t) => {
      const e = this.trueVal(t), s = e > 0 ? t._listingAsk / e : 9, n = this.espionageNegos.filter(
        (a) => (a.playerName || "").toLowerCase() === (t.Player || "").toLowerCase() && (a.status === "pending" || a.status === "counter" || a.status === "countered")
      ), i = e > 0 ? Math.round(Math.min(t._listingAsk * 0.85, e * 0.88) / 5e5) * 5e5 || Math.round(Math.min(t._listingAsk * 0.85, e * 0.88) / 1e5) * 1e5 : null;
      return { p: t, tv: e, ratio: s, activeNegos: n, counterOffer: i };
    }).sort((t, e) => t.ratio - e.ratio);
  },
  mbGemsList() {
    return this.allPlayers.filter((t) => t.Age <= 27 && (t._gameRating || 0) >= 68 && t.Club !== Ot).map((t) => {
      const e = this.trueVal(t), s = t.Age <= 22 ? 1.3 : t.Age <= 24 ? 1.15 : 1, n = e > 0 ? t._gameRating * t._gameRating * s / (e / 1e6) : 0, i = this.espionageNegos.filter(
        (a) => (a.playerName || "").toLowerCase() === (t.Player || "").toLowerCase() && (a.status === "pending" || a.status === "counter" || a.status === "countered")
      );
      return { p: t, tv: e, gem: n, activeNegos: i };
    }).filter((t) => t.gem > 0).sort((t, e) => e.gem - t.gem).slice(0, 60);
  },
  mbOverList() {
    return this.allPlayers.filter((e) => (e.Games || 0) >= 6 && (e._g90 != null || e._a90 != null)).map((e) => {
      const s = e._g90 || 0, n = e._a90 || 0, i = s * 3 + n * 2, a = e._gameRating || 70, o = i / Math.max(0.05, (a - 58) / 25), r = a < 79 && i >= 0.35;
      return { p: e, contrib90: i, overIndex: o, isGem: r };
    }).filter((e) => e.contrib90 > 0).sort((e, s) => s.overIndex - e.overIndex).slice(0, 60);
  }
}, Sl = 50, VC = {
  // Pre-compute all expensive per-row derived values once, cached by Vue
  youthHistJobsEnriched() {
    return this.youthAllHistoryJobs.map((t) => {
      const e = t.player || {}, s = e.position || e.Position, n = this.scoutPosRating(e, s), i = this.scoutBestPos(e), a = t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) : "—";
      return {
        ...t,
        _posRating: n,
        _bestPos: (i == null ? void 0 : i.pos) || null,
        _bestPosRating: (i == null ? void 0 : i.rating) || null,
        _dateStr: a,
        _mentality: this.getYouthAttr(e, "Mentality"),
        _workRate: this.getYouthAttr(e, "Work rate")
      };
    });
  },
  // Per-club active/total counts, derived from enriched jobs (no template-level .filter calls)
  youthClubStatsMap() {
    const t = {};
    for (const e of this.youthHistJobsEnriched) {
      const s = e._club;
      s && (t[s] || (t[s] = { active: 0, total: 0 }), t[s].total++, (e._jobStatus || e.status) === "active" && t[s].active++);
    }
    return t;
  },
  youthAcademySorted() {
    return [...this.youthAcademy].sort((t, e) => (e.Rating || e.rating || 0) - (t.Rating || t.rating || 0));
  },
  youthAcademyAvgRating() {
    const t = this.youthAcademy.filter((e) => e.Rating || e.rating);
    return t.length ? t.reduce((e, s) => e + (s.Rating || s.rating), 0) / t.length : 0;
  },
  youthAcademyTopRating() {
    return this.youthAcademy.length ? Math.max(...this.youthAcademy.map((t) => t.Rating || t.rating || 0)) : 0;
  },
  youthHistPositions() {
    return [...new Set(this.youthRejected.map((t) => t.player.position || t.player.Position))].filter(Boolean).sort();
  },
  youthFilteredHistory() {
    let t = this.youthRejected;
    this.youthHistPos && (t = t.filter((s) => (s.player.position || s.player.Position) === this.youthHistPos));
    const e = this.youthHistSort;
    if (e === "date") return [...t].sort((s, n) => new Date(n.createdAt) - new Date(s.createdAt));
    if (e === "date_a") return [...t].sort((s, n) => new Date(s.createdAt) - new Date(n.createdAt));
    if (e === "rating_d") return [...t].sort((s, n) => (n.player.rating || n.player.Rating || 0) - (s.player.rating || s.player.Rating || 0));
    if (e === "rating_a") return [...t].sort((s, n) => (s.player.rating || s.player.Rating || 0) - (n.player.rating || n.player.Rating || 0));
    if (e === "age_a") return [...t].sort((s, n) => (s.player.age || s.player.Age || 0) - (n.player.age || n.player.Age || 0));
    if (e === "age_d") return [...t].sort((s, n) => (n.player.age || n.player.Age || 0) - (s.player.age || s.player.Age || 0));
    if (e === "value_d") return [...t].sort((s, n) => (n.player.value || n.player.Value || 0) - (s.player.value || s.player.Value || 0));
    if (e === "value_a") return [...t].sort((s, n) => (s.player.value || s.player.Value || 0) - (n.player.value || n.player.Value || 0));
    if (e === "name_a") return [...t].sort((s, n) => (s.player.name || s.player.Player || "").localeCompare(n.player.name || n.player.Player || ""));
    if (e === "name_d") return [...t].sort((s, n) => (n.player.name || n.player.Player || "").localeCompare(s.player.name || s.player.Player || ""));
    if (e === "pos_a") return [...t].sort((s, n) => (s.player.position || s.player.Position || "").localeCompare(n.player.position || n.player.Position || ""));
    if (e === "pos_d") return [...t].sort((s, n) => (n.player.position || n.player.Position || "").localeCompare(s.player.position || s.player.Position || ""));
    if (e === "buynow_d") return [...t].sort((s, n) => (n.buyNow || 0) - (s.buyNow || 0));
    if (e === "buynow_a") return [...t].sort((s, n) => (s.buyNow || 0) - (n.buyNow || 0));
    if (e === "status_a") return [...t].sort((s, n) => (s._jobStatus || s.status || "").localeCompare(n._jobStatus || n.status || ""));
    if (e === "status_d") return [...t].sort((s, n) => (n._jobStatus || n.status || "").localeCompare(s._jobStatus || s.status || ""));
    if (e === "bestpos_d") return [...t].sort((s, n) => {
      var i, a;
      return (((i = this.scoutBestPos(n.player)) == null ? void 0 : i.rating) || 0) - (((a = this.scoutBestPos(s.player)) == null ? void 0 : a.rating) || 0);
    });
    if (e === "bestpos_a") return [...t].sort((s, n) => {
      var i, a;
      return (((i = this.scoutBestPos(s.player)) == null ? void 0 : i.rating) || 0) - (((a = this.scoutBestPos(n.player)) == null ? void 0 : a.rating) || 0);
    });
    if (e === "men_d") return [...t].sort((s, n) => (this.getYouthAttr(n.player, "Mentality") || 0) - (this.getYouthAttr(s.player, "Mentality") || 0));
    if (e === "men_a") return [...t].sort((s, n) => (this.getYouthAttr(s.player, "Mentality") || 0) - (this.getYouthAttr(n.player, "Mentality") || 0));
    if (e === "wr_d") return [...t].sort((s, n) => (this.getYouthAttr(n.player, "Work rate") || 0) - (this.getYouthAttr(s.player, "Work rate") || 0));
    if (e === "wr_a") return [...t].sort((s, n) => (this.getYouthAttr(s.player, "Work rate") || 0) - (this.getYouthAttr(n.player, "Work rate") || 0));
    if (e === "potential_d") {
      const s = { high: 3, medium: 2, low: 1 };
      return [...t].sort((n, i) => {
        var o, r, l, c;
        const a = (s[(o = i.player) == null ? void 0 : o.potential] || 0) - (s[(r = n.player) == null ? void 0 : r.potential] || 0);
        return a !== 0 ? a : (((l = i.player) == null ? void 0 : l.potentialCap) || 0) - (((c = n.player) == null ? void 0 : c.potentialCap) || 0);
      });
    }
    if (e === "potential_a") {
      const s = { high: 3, medium: 2, low: 1 };
      return [...t].sort((n, i) => {
        var o, r, l, c;
        const a = (s[(o = n.player) == null ? void 0 : o.potential] || 0) - (s[(r = i.player) == null ? void 0 : r.potential] || 0);
        return a !== 0 ? a : (((l = n.player) == null ? void 0 : l.potentialCap) || 0) - (((c = i.player) == null ? void 0 : c.potentialCap) || 0);
      });
    }
    return t;
  },
  youthHistMaxRating() {
    return this.youthRejected.length ? Math.max(...this.youthRejected.map((t) => t.player.rating || t.player.Rating || 0)) : 0;
  },
  youthHistAvgRating() {
    return this.youthRejected.length ? this.youthRejected.reduce((t, e) => t + (e.player.rating || e.player.Rating || 0), 0) / this.youthRejected.length : 0;
  },
  youthHistClubs() {
    return [...new Set(this.youthAllHistoryJobs.map((t) => t._club))].filter(Boolean).sort();
  },
  youthHistAllPositions() {
    return [...new Set(this.youthAllHistoryJobs.map((t) => {
      var e, s;
      return ((e = t.player) == null ? void 0 : e.position) || ((s = t.player) == null ? void 0 : s.Position);
    }))].filter(Boolean).sort();
  },
  youthHistFiltered() {
    let t = this.youthHistJobsEnriched;
    const e = (this.youthHistSearch || "").toLowerCase();
    e && (t = t.filter((n) => {
      var i, a;
      return (((i = n.player) == null ? void 0 : i.name) || "").toLowerCase().includes(e) || (((a = n.player) == null ? void 0 : a.club) || "").toLowerCase().includes(e) || (n._club || "").toLowerCase().includes(e);
    })), this.youthHistPos && (t = t.filter((n) => {
      var i, a;
      return (((i = n.player) == null ? void 0 : i.position) || ((a = n.player) == null ? void 0 : a.Position)) === this.youthHistPos;
    })), this.youthHistClubFilter && (t = t.filter((n) => n._club === this.youthHistClubFilter)), this.youthHistStatusFilter && (t = t.filter((n) => (n._jobStatus || n.status) === this.youthHistStatusFilter));
    const s = this.youthHistSort;
    if (s === "date") return [...t].sort((n, i) => new Date(i.createdAt) - new Date(n.createdAt));
    if (s === "date_a") return [...t].sort((n, i) => new Date(n.createdAt) - new Date(i.createdAt));
    if (s === "rating_d") return [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.rating) || 0) - (((o = n.player) == null ? void 0 : o.rating) || 0);
    });
    if (s === "rating_a") return [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.rating) || 0) - (((o = i.player) == null ? void 0 : o.rating) || 0);
    });
    if (s === "age_a") return [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.age) || 0) - (((o = i.player) == null ? void 0 : o.age) || 0);
    });
    if (s === "age_d") return [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.age) || 0) - (((o = n.player) == null ? void 0 : o.age) || 0);
    });
    if (s === "value_d") return [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.value) || 0) - (((o = n.player) == null ? void 0 : o.value) || 0);
    });
    if (s === "value_a") return [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.value) || 0) - (((o = i.player) == null ? void 0 : o.value) || 0);
    });
    if (s === "name_a") return [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.name) || "").localeCompare(((o = i.player) == null ? void 0 : o.name) || "");
    });
    if (s === "name_d") return [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.name) || "").localeCompare(((o = n.player) == null ? void 0 : o.name) || "");
    });
    if (s === "pos_a") return [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.position) || "").localeCompare(((o = i.player) == null ? void 0 : o.position) || "");
    });
    if (s === "pos_d") return [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.position) || "").localeCompare(((o = n.player) == null ? void 0 : o.position) || "");
    });
    if (s === "buynow_d") return [...t].sort((n, i) => (i.buyNow || 0) - (n.buyNow || 0));
    if (s === "buynow_a") return [...t].sort((n, i) => (n.buyNow || 0) - (i.buyNow || 0));
    if (s === "status_a") return [...t].sort((n, i) => (n._jobStatus || n.status || "").localeCompare(i._jobStatus || i.status || ""));
    if (s === "status_d") return [...t].sort((n, i) => (i._jobStatus || i.status || "").localeCompare(n._jobStatus || n.status || ""));
    if (s === "sclub_a") return [...t].sort((n, i) => (n._club || "").localeCompare(i._club || ""));
    if (s === "sclub_d") return [...t].sort((n, i) => (i._club || "").localeCompare(n._club || ""));
    if (s === "bestpos_d") return [...t].sort((n, i) => (i._bestPosRating || 0) - (n._bestPosRating || 0));
    if (s === "bestpos_a") return [...t].sort((n, i) => (n._bestPosRating || 0) - (i._bestPosRating || 0));
    if (s === "men_d") return [...t].sort((n, i) => (i._mentality || 0) - (n._mentality || 0));
    if (s === "men_a") return [...t].sort((n, i) => (n._mentality || 0) - (i._mentality || 0));
    if (s === "wr_d") return [...t].sort((n, i) => (i._workRate || 0) - (n._workRate || 0));
    if (s === "wr_a") return [...t].sort((n, i) => (n._workRate || 0) - (i._workRate || 0));
    if (s === "potential_d") {
      const n = { high: 3, medium: 2, low: 1 };
      return [...t].sort((i, a) => {
        var r, l, c, h;
        const o = (n[(r = a.player) == null ? void 0 : r.potential] || 0) - (n[(l = i.player) == null ? void 0 : l.potential] || 0);
        return o !== 0 ? o : (((c = a.player) == null ? void 0 : c.potentialCap) || 0) - (((h = i.player) == null ? void 0 : h.potentialCap) || 0);
      });
    }
    if (s === "potential_a") {
      const n = { high: 3, medium: 2, low: 1 };
      return [...t].sort((i, a) => {
        var r, l, c, h;
        const o = (n[(r = i.player) == null ? void 0 : r.potential] || 0) - (n[(l = a.player) == null ? void 0 : l.potential] || 0);
        return o !== 0 ? o : (((c = i.player) == null ? void 0 : c.potentialCap) || 0) - (((h = a.player) == null ? void 0 : h.potentialCap) || 0);
      });
    }
    return t;
  },
  youthHistPaged() {
    const t = this.youthHistPage * Sl;
    return this.youthHistFiltered.slice(t, t + Sl);
  },
  youthHistTotalPages() {
    return Math.max(1, Math.ceil(this.youthHistFiltered.length / Sl));
  },
  youthDaysUntilUpgrade() {
    if (!this.youthFacilities.project) return null;
    const t = new Date(this.youthFacilities.project.completeAt) - /* @__PURE__ */ new Date();
    return Math.max(0, Math.round(t / 864e5));
  },
  youthUpgradeProgress() {
    if (!this.youthFacilities.project) return 0;
    const t = new Date(this.youthFacilities.project.startedAt), e = new Date(this.youthFacilities.project.completeAt);
    return Math.min(100, Math.max(0, (/* @__PURE__ */ new Date() - t) / (e - t) * 100));
  }
}, zC = {
  selectedClubPlayers() {
    if (!this.selectedClubName) return [];
    const t = this.clubSquadSort || "pos";
    return this.allPlayers.filter((e) => e.Club === this.selectedClubName).sort((e, s) => {
      if (t === "pos") {
        const n = (lf[e.Position] ?? 9) - (lf[s.Position] ?? 9);
        return n !== 0 ? n : (s._gameRating || s.Rating || 0) - (e._gameRating || e.Rating || 0);
      }
      return t === "rating" ? (s._gameRating || s.Rating || 0) - (e._gameRating || e.Rating || 0) : t === "value" ? (s.Value || 0) - (e.Value || 0) : t === "age" ? (e.Age || 0) - (s.Age || 0) : t === "fitness" ? (s.fitnessPct ?? s.Fitness ?? -1) - (e.fitnessPct ?? e.Fitness ?? -1) : t === "chem" ? (this.playerBondCount(s) ?? -1) - (this.playerBondCount(e) ?? -1) : (e.Player || "").localeCompare(s.Player || "");
    });
  },
  selectedClubSubmissions() {
    if (!this.selectedClubName) return [];
    const t = this.submissionsCache[this.selectedClubName] || {};
    return Object.values(t).sort((e, s) => (s.submittedAt || 0) - (e.submittedAt || 0));
  },
  selectedClubTransfers() {
    return this.selectedClubName ? (this.clubTransferMap[this.selectedClubName] || []).slice(0, 20) : [];
  },
  selectedClubEspData() {
    return this.selectedClubName && this.espionageClubs.find((t) => t.club === this.selectedClubName) || null;
  }
};
Ko({
  data() {
    return {
      loaded: !1,
      corsError: !1,
      progress: 0,
      loadMsg: "Starting…",
      allPlayers: [],
      leagueTables: {},
      managedSet: /* @__PURE__ */ new Set(),
      managerMap: {},
      vacantClubs: /* @__PURE__ */ new Set(),
      asOfWeek: "?",
      totalClubs: 0,
      transferMap: {},
      myClub: Ot,
      leagueFilter: new Set(ea),
      posFilter: new Set(fo),
      maxAge: 40,
      search: "",
      hideOwn: !1,
      hideVacant: !0,
      managedOnly: !1,
      forSaleOnly: !1,
      transferListedOnly: !1,
      injuredOnly: !1,
      dislikesOnly: !1,
      hideRetiring: !0,
      traitFilter: "",
      allDeals: [],
      ageGroupFilter: "all",
      // 'all' | 'u21' | 'u20'
      sortCol: "_gameRating",
      sortDir: -1,
      page: 0,
      // Per-position rating filters — each pos has its own min threshold
      posRatingFilters: { GK: 60, FB: 60, CB: 60, DM: 60, AM: 60, WF: 60, CF: 60 },
      posRatingMax: 99,
      // global max rating cap
      posRatingUseWeighted: !1,
      // filter by weighted rating instead of game rating
      posRatingsOpen: !1,
      scoutFiltersOpen: !0,
      // Stats enrichment state
      statsEnriching: !1,
      statsProgress: 0,
      statsEnriched: !1,
      activeTab: (() => {
        const t = location.hash.slice(1);
        return t && ["scout", "squad", "moneyball", "analysis", "youth", "club", "clubs", "espionage", "matches", "assistant"].includes(t) ? t : localStorage.getItem("sf_activeTab") || "squad";
      })(),
      tabs: [{ id: "scout", label: "🔍 Scout" }, { id: "squad", label: "🛡 My Squad" }, { id: "moneyball", label: "📊 Moneyball" }, { id: "analysis", label: "🔬 Analysis" }, { id: "youth", label: "🌱 Youth" }, { id: "club", label: "🏟 My Club" }, { id: "clubs", label: "🏟 Clubs" }, { id: "espionage", label: "💰 Transfers" }, { id: "matches", label: "📺 Matches" }, { id: "assistant", label: "🤖 Assistant" }],
      mySquadFormation: "4231",
      formationKeys: Object.keys(xh),
      attrFiltersOpen: !1,
      attrFilters: {},
      // e.g. { Speed: 70, Dribbling: 75 } — 0/null = inactive
      mbChart: "market",
      mbCharts: [
        { id: "market", label: "🛒 Market" },
        { id: "gems", label: "💎 Gems" },
        { id: "overperformers", label: "⚡ Gets It Done" },
        { id: "top-lists", label: "📋 Top Lists" },
        { id: "value-rating", label: "Value vs Rating" },
        { id: "goal-eff", label: "Goals vs xG" },
        { id: "assist-eff", label: "Assists vs xA" },
        { id: "age-gems", label: "Age vs Rating" }
      ],
      activeChartDef: { title: "", desc: "", listLabel: "", listFmt: () => "", listColor: "#ffa657" },
      charts: {},
      tacticsLoaded: !1,
      tacticsLoading: !1,
      tacticsProgress: 0,
      tacticsMsg: "",
      tacticsData: null,
      tacticsCacheDate: null,
      // Youth tab state
      youthLoaded: !1,
      youthLoading: !1,
      youthMsg: "",
      youthCap: {},
      youthScouts: [],
      youthAcademy: [],
      youthFacilities: {},
      youthStaff: {},
      youthRejected: [],
      youthHistPos: "",
      youthHistSort: "date",
      youthSubTab: "scouts",
      // All-clubs history state
      youthHistLoading: !1,
      youthHistLoaded: !1,
      youthHistMsg: "",
      youthHistProgress: 0,
      youthHistCacheDate: null,
      youthAllHistoryJobs: [],
      youthClubInfoMap: {},
      youthHistSearch: "",
      youthHistClubFilter: "",
      youthHistStatusFilter: "",
      youthHistPage: 0,
      // Background refresh state
      youthBgInterval: null,
      youthBgLastRefresh: null,
      // Club tab state (Facilities + Staff)
      clubLoading: !1,
      clubLoaded: !1,
      clubMsg: "",
      clubSubTab: "facilities",
      clubFacData: null,
      clubFacQuotes: {},
      clubStaff: {},
      clubStaffEffects: {},
      // Staff recruitment
      staffApplicants: null,
      staffApplicantsLoading: !1,
      staffApplicantsMsg: "",
      staffWeek: null,
      staffGenLoading: !1,
      staffGenMsg: "",
      staffAdsUpdating: !1,
      tblSort: {},
      negoSort: "date_d",
      // Saved lineup
      savedLineup: null,
      // Matches archive tab
      matchArchive: null,
      // null=not loaded, []=loaded
      matchArchiveBuilding: !1,
      matchArchiveProgress: 0,
      matchArchiveMsg: "",
      appendGwBuilding: !1,
      appendGwMsg: "",
      appendGwProgress: 0,
      matchArchiveCacheDate: null,
      matchView: null,
      matchDetailLoading: !1,
      matchChunks: {},
      matchArchiveChunkCount: 0,
      matchBuildLog: [],
      matchFilterClub: "",
      matchFilterManager: "",
      matchFilterComp: "",
      matchSort: "gw_d",
      matchSubTab: "list",
      analysisLoading: !1,
      analysisLoaded: !1,
      analysisMsg: "",
      analysisProgress: 0,
      analysisMatches: [],
      analysisFilterFormation: "",
      analysisFilterOpp: "",
      analysisFilterMentality: "",
      analysisFilterMentalityOpp: "",
      analysisFilterPressing: "",
      analysisFilterPressingOpp: "",
      analysisFilterLine: "",
      analysisFilterLineOpp: "",
      analysisFilterStyle: "",
      analysisFilterStyleOpp: "",
      analysisFilterTrans: "",
      analysisFilterTransOpp: "",
      fmDrillDown: null,
      subsDbLoading: !1,
      subsDbLoaded: !1,
      subsDbMsg: "",
      subsDbProgress: 0,
      subsDb: null,
      matchArchiveFmSrc: null,
      clubLineups: {},
      clubLineupsLoaded: !1,
      mySubmissions: [],
      mySubmissionLoading: !1,
      submissionsCache: {},
      // club → { gw: {formation, ...} }
      espionageSubmissions: {},
      // club → latest submission object
      selectedClubName: null,
      selectedClubSubTab: "xi",
      // 'xi' | 'history' | 'transfers'
      selectedClubMatchXi: null,
      // fallback last-match XI when no submission
      showRawSub: !1,
      clubSquadSort: "pos",
      hoveredPitchPlayer: null,
      spHoveredPlayer: null,
      // { name, side, zoneKey } for set-piece zone hover
      allSubmissionsLoaded: !1,
      clubTransferMap: {},
      // Espionage tab
      espionageLoading: !1,
      espionageLoaded: !1,
      espionageMsg: "",
      espionageProgress: 0,
      espionageClubs: [],
      espionageNegos: [],
      espionageCacheDate: null,
      negosLastPull: null,
      espionageSubTab: "negos",
      espionageSearch: "",
      espionageSort: "club",
      espShowVacantOnly: !1,
      espionageNegoSearch: "",
      negoExpandedId: null,
      negoShowAll: !1,
      negoShowAllModal: !1,
      negoDisplayCount: 50,
      // Assistant tab (AI chat)
      chatMessages: [],
      chatInput: "",
      chatLoading: !1,
      chatError: "",
      chatAttachments: [],
      chatSessions: [],
      activeChatSessionId: null,
      renamingSessionId: null,
      renameDraft: "",
      assistantDockOpen: (() => {
        try {
          return localStorage.getItem("sf_assistant_dock_open") === "1";
        } catch {
          return !1;
        }
      })(),
      // Defaults to expanded on wide screens (plenty of room), collapsed on narrow ones —
      // but once the user explicitly toggles it, that choice sticks regardless of width.
      assistantSidebarExpanded: (() => {
        try {
          const t = localStorage.getItem("sf_assistant_sidebar_expanded");
          if (t !== null) return t === "1";
        } catch {
        }
        return typeof window < "u" && window.innerWidth >= 1300;
      })(),
      assistantDockListOpen: !1,
      workerLog: null,
      workerLogOpen: !1,
      trueValueMap: {},
      negosPollingInterval: null,
      _nowMs: Date.now(),
      _clockInterval: null,
      clubBudget: null,
      clubWageBudget: null,
      budgetOverride: (() => {
        try {
          const t = localStorage.getItem("sf_budget_override");
          return t ? parseInt(t, 10) : null;
        } catch {
          return null;
        }
      })(),
      budgetEditing: !1,
      budgetEditVal: "",
      pullingBudget: !1,
      auctionProfiles: {},
      // playerName.toLowerCase() → full snapshot from /api/auctions
      auctionItems: [],
      // raw items from /api/auctions (has all bids + snapshots)
      allBudgets: {},
      // club name → {transfer, ...} from /api/budgets?format=full
      clubInfoCache: {},
      // club name → { facilities, staff, academy, scouts, loading }
      pastAuctionsOpen: !1,
      auctionExpandedPlayers: {},
      selectedJobCtx: null,
      playersCacheDate: null,
      playersRefreshing: !1,
      cacheWorking: !0,
      bookmarkletHref: "",
      allLeagues: ea,
      allPositions: fo,
      selectedPlayer: null,
      selectedPlayerStats: null,
      selectedPlayerStatsTab: "career",
      selectedPlayerStatsLoading: !1,
      playerModalTab: "overview",
      highlightedPos: null,
      // Mental attr configuration for weighted position rating
      mentalCfgOpen: !1,
      mentalCfgAttrs: ["Mentality", "Experience", "Work rate"],
      mentalWeightPct: 20,
      // % contribution of mental to weighted rating
      physicalAttrs: [
        { k: "Speed", l: "Speed" },
        { k: "Stamina", l: "Stamina" },
        { k: "Dribbling", l: "Dribbling" },
        { k: "Passing", l: "Passing" },
        { k: "Shooting", l: "Shooting" },
        { k: "Tackling", l: "Tackling" },
        { k: "Marking", l: "Marking" },
        { k: "Heading", l: "Heading" },
        { k: "Vision", l: "Vision" },
        { k: "Handling", l: "Handling (GK)" },
        { k: "Reflexes", l: "Reflexes (GK)" }
      ],
      mentalAttrs: [
        { k: "Mentality", l: "Mentality" },
        { k: "Experience", l: "Experience" },
        { k: "Leadership", l: "Leadership" },
        { k: "Work rate", l: "Work Rate" },
        { k: "Adaptability", l: "Adaptability" },
        { k: "Free kicks", l: "Free Kicks" },
        { k: "Penalties", l: "Penalties" },
        { k: "Corners", l: "Corners" }
      ],
      tableCols: [
        { key: "Player", label: "Player", w: 130, full: "Player Name" },
        { key: "Club", label: "Club", w: 130, full: "Club (league tag + vacancy indicator)" },
        { key: "Position", label: "Pos", w: 38, full: "Position" },
        { key: "Age", label: "Age", w: 34, full: "Age" },
        { key: "_bestPos", label: "Best", w: 40, full: "Best Position — position (incl. alternates) where this player rates highest" },
        { key: "_bestPosRating", label: "BstRtg", w: 52, full: "Rating at their Best Position" },
        { key: "_gameRating", label: "Rtg", w: 44, full: "Game Rating — avg of the 4 key position attributes (same formula as the game's own Rating)" },
        { key: "_weightedRating", label: "WRtg", w: 52, full: "Weighted Rating: overall rating blended with mental attrs (Mentality, Experience etc) — configure weight in sidebar" },
        { key: "Value", label: "Val", w: 60, full: "In-game value (Transfermarkt baseline — actual transfers typically 2-4x higher)" },
        { key: "_estValue", label: "TrueVal", w: 68, full: "True market value: last real transfer fee where known (excludes Saudi/Tamaguchi auto-deals); formula estimate otherwise" },
        { key: "Games", label: "G", w: 28, full: "Games Played", group: "stats" },
        { key: "Minutes", label: "Mins", w: 42, full: "Minutes Played", group: "stats" },
        { key: "Average Rating", label: "AvgRtg", w: 52, full: "Average Match Rating", group: "stats" },
        { key: "Goals", label: "Gls", w: 32, full: "Goals Scored", group: "stats" },
        { key: "xG", label: "xG", w: 38, full: "Expected Goals", group: "stats" },
        { key: "Assists", label: "Ast", w: 32, full: "Assists", group: "stats" },
        { key: "xA", label: "xA", w: 38, full: "Expected Assists", group: "stats" },
        { key: "_gc", label: "GC", w: 32, full: "Goal Contributions (Goals + Assists)", group: "stats" },
        { key: "_gDiff", label: "G-xG", w: 44, full: "Goals minus Expected Goals — finishing performance vs expectation", group: "stats" },
        { key: "_aDiff", label: "A-xA", w: 44, full: "Assists minus Expected Assists — creativity performance vs expectation", group: "stats" },
        { key: "_g90", label: "G/90", w: 38, full: "Goals per 90 minutes (min 30 mins played)", group: "per90" },
        { key: "_a90", label: "A/90", w: 38, full: "Assists per 90 minutes (min 30 mins played)", group: "per90" },
        { key: "_xG90", label: "xG/90", w: 44, full: "Expected Goals per 90 minutes", group: "per90" },
        { key: "_xA90", label: "xA/90", w: 44, full: "Expected Assists per 90 minutes", group: "per90" },
        { key: "_gc90", label: "GC/90", w: 44, full: "Goal Contributions per 90 minutes", group: "per90" },
        { key: "_gDiff90", label: "G-xG/90", w: 52, full: "Goals minus Expected Goals, per 90 minutes", group: "per90" },
        { key: "_aDiff90", label: "A-xA/90", w: 52, full: "Assists minus Expected Assists, per 90 minutes", group: "per90" },
        { key: "Yellow", label: "Yel", w: 28, full: "Yellow Cards", group: "stats" },
        { key: "Red", label: "Red", w: 28, full: "Red Cards", group: "stats" },
        { key: "Tackle %", label: "Tkl%", w: 42, full: "Tackle Success %", group: "stats" },
        { key: "Pass %", label: "Pas%", w: 42, full: "Pass Accuracy %", group: "stats" },
        { key: "Steals", label: "Stl", w: 32, full: "Ball Steals", group: "stats" },
        { key: "Mistakes", label: "Err", w: 32, full: "Errors Leading to Chance/Goal", group: "stats" },
        { key: "Form", label: "Form", w: 40, full: "Current Form (recent match ratings avg)", group: "stats" },
        { key: "fitnessPct", label: "Fit%", w: 38, full: "Fitness %", group: "fitness" },
        { key: "injuryRiskLabel", label: "InjRisk", w: 60, full: "Injury Risk Level", group: "fitness" },
        { key: "injured", label: "Inj", w: 28, full: "Currently Injured", group: "fitness" },
        { key: "suspended", label: "Sus", w: 28, full: "Currently Suspended", group: "fitness" },
        { key: "Speed", label: "Spd", w: 32, full: "Speed", group: "attrs" },
        { key: "Stamina", label: "Sta", w: 32, full: "Stamina", group: "attrs" },
        { key: "Vision", label: "Vis", w: 32, full: "Vision", group: "attrs" },
        { key: "Dribbling", label: "Dri", w: 32, full: "Dribbling", group: "attrs" },
        { key: "Passing", label: "Pas", w: 32, full: "Passing", group: "attrs" },
        { key: "Shooting", label: "Sht", w: 32, full: "Shooting", group: "attrs" },
        { key: "Tackling", label: "Tck", w: 32, full: "Tackling", group: "attrs" },
        { key: "Marking", label: "Mrk", w: 32, full: "Marking", group: "attrs" },
        { key: "Heading", label: "Hd", w: 32, full: "Heading", group: "attrs" },
        { key: "Handling", label: "Hnd", w: 32, full: "Handling (GK)", group: "attrs" },
        { key: "Reflexes", label: "Rfx", w: 32, full: "Reflexes (GK)", group: "attrs" },
        { key: "Free kicks", label: "FK", w: 32, full: "Free Kick Ability", group: "attrs" },
        { key: "Penalties", label: "Pen", w: 32, full: "Penalty Taking", group: "attrs" },
        { key: "Corners", label: "Cor", w: 32, full: "Corner Taking", group: "attrs" },
        { key: "Mentality", label: "Men", w: 32, full: "Mentality", group: "mental" },
        { key: "Leadership", label: "Lead", w: 36, full: "Leadership", group: "mental" },
        { key: "Experience", label: "Exp", w: 36, full: "Experience", group: "mental" },
        { key: "Confidence", label: "Conf", w: 36, full: "Confidence", group: "mental" },
        { key: "Work rate", label: "WR", w: 32, full: "Work Rate", group: "mental" },
        { key: "Morale", label: "Mor", w: 32, full: "Morale", group: "mental" },
        { key: "Nationality", label: "Nat", w: 60, full: "Nationality", group: "bio" },
        { key: "PreferredFoot", label: "Foot", w: 36, full: "Preferred Foot", group: "bio" }
      ],
      colGroups: { stats: !0, per90: !0, fitness: !0, attrs: !1, mental: !0, bio: !1 }
    };
  },
  computed: {
    visibleTableCols() {
      return this.tableCols.filter((t) => !t.group || this.colGroups[t.group]);
    },
    staffApplicantsByRole() {
      var i, a;
      const t = ["CEO", "Technical Director", "Assistant", "Physio"], e = {};
      for (const o of this.staffApplicants || [])
        e[o.role] || (e[o.role] = []), e[o.role].push(o);
      const s = ((i = this.clubStaff) == null ? void 0 : i.openAds) || [], n = ((a = this.clubStaff) == null ? void 0 : a.current) || {};
      return t.map((o) => {
        var r;
        return {
          role: o,
          applicants: (e[o] || []).sort((l, c) => (c.rating || 0) - (l.rating || 0)),
          isLive: s.includes(o),
          currentRating: ((r = n[o]) == null ? void 0 : r.rating) ?? null
        };
      });
    },
    ...BC,
    ...$C,
    ...jC,
    ...WC,
    ...HC,
    ...VC,
    ...zC
  },
  watch: {
    filteredPlayers() {
      this.page = 0;
    },
    youthHistFiltered() {
      this.youthHistPage = 0;
    },
    espionageNegoFiltered() {
      this.negoDisplayCount = 50;
    },
    espionageNegos(t) {
      t.length && this.computeTrueValues();
    },
    allPlayers(t) {
      t.length && this.espionageNegos.length && this.computeTrueValues();
    },
    mentalCfgAttrs: { handler() {
      this.recomputeWeightedRatings();
      try {
        localStorage.setItem("sf_mental_cfg", JSON.stringify({ attrs: this.mentalCfgAttrs, pct: this.mentalWeightPct }));
      } catch {
      }
    }, deep: !0 },
    mentalWeightPct() {
      this.recomputeWeightedRatings();
      try {
        localStorage.setItem("sf_mental_cfg", JSON.stringify({ attrs: this.mentalCfgAttrs, pct: this.mentalWeightPct }));
      } catch {
      }
    },
    async mbChart(t) {
      t !== "top-lists" && (await ri(), this.drawMoneyballChart(t));
    },
    async tacticsLoaded(t) {
      t && (await ri(), this.drawTacticsCharts());
    },
    activeTab: {
      immediate: !0,
      handler(t) {
        localStorage.setItem("sf_activeTab", t), history.replaceState(null, "", "#" + t), t === "youth" && (!this.youthLoaded && !this.youthLoading && this.loadYouth(), !this.youthHistLoaded && !this.youthHistLoading && this.loadYouthHistory(!1)), t === "club" && !this.clubLoaded && !this.clubLoading && this.loadClub(), (t === "espionage" || t === "clubs") && !this.espionageLoaded && !this.espionageLoading && this.loadEspionage(!1), t === "espionage" ? this.startNegosPolling() : this.stopNegosPolling(), t === "squad" && this.loadSavedLineup(), t === "analysis" && this.loadAnalysisChunks();
      },
      flush: "sync"
    },
    matchArchive(t) {
      t && this.activeTab === "analysis" && this.loadAnalysisChunks();
    }
  },
  methods: {
    ...SC,
    ...wC,
    ...CC,
    ...kC,
    ...MC,
    ...AC,
    ...NC,
    fmtVal: Hs,
    fmtWage: yC,
    fmtDiff: bC,
    renderMarkdown: mC,
    ratingClass(t) {
      return t ? t >= 84 ? "rating-high" : t >= 77 ? "rating-mid" : "rating-low" : "c-gray";
    },
    attrBarColor(t) {
      return (t || 0) >= 80 ? "#7ee787" : (t || 0) >= 65 ? "#ffa657" : "#ff7b72";
    },
    isKeyAttr(t, e) {
      const s = this.highlightedPos || e, n = mi[s];
      return n ? n.includes(t) : !1;
    },
    gameAttrsFor(t) {
      return mi[t] || [];
    },
    recomputeWeightedRatings() {
      const t = this.mentalCfgAttrs, e = this.mentalWeightPct;
      this.allPlayers = this.allPlayers.map((s) => {
        const n = wa(s, s.Position, t, e);
        return n === s._weightedRating ? s : Object.freeze({ ...s, _weightedRating: n });
      });
    },
    posAttrNames(t) {
      return af[t] || "";
    },
    allPosRatings(t) {
      return fc.map((e) => ({
        pos: e,
        attrs: af[e] || "",
        game: is(t, e),
        weighted: wa(t, e, this.mentalCfgAttrs, this.mentalWeightPct),
        isNative: t.Position === e
      }));
    },
    toggleMentalAttr(t) {
      const e = this.mentalCfgAttrs.indexOf(t);
      e >= 0 ? this.mentalCfgAttrs.splice(e, 1) : this.mentalCfgAttrs.push(t);
    },
    toggleLeague(t) {
      const e = new Set(this.leagueFilter);
      e.has(t) ? e.delete(t) : e.add(t), this.leagueFilter = e;
    },
    togglePos(t) {
      if (this.posFilter.size === fo.length)
        this.posFilter = /* @__PURE__ */ new Set([t]);
      else if (this.posFilter.size === 1 && this.posFilter.has(t))
        this.posFilter = new Set(fo);
      else {
        const s = new Set(this.posFilter);
        s.has(t) ? s.delete(t) : s.add(t), this.posFilter = s;
      }
    },
    clubChemScore(t) {
      const e = this.allPlayers.filter((s) => s.Club === t);
      return jm(e, this.allDeals);
    },
    chemColor(t) {
      return t == null ? "#6e7681" : t >= 70 ? "#3fb950" : t >= 40 ? "#d29922" : "#f85149";
    },
    playerBondCount(t) {
      if (!(t != null && t.Player) || !(t != null && t.Club)) return null;
      const e = this.allPlayers.filter((s) => s.Club === t.Club);
      return $m(t, e, this.allDeals).length;
    },
    bondColor(t) {
      return t == null ? "#6e7681" : t >= 5 ? "#3fb950" : t >= 2 ? "#d29922" : "#8b949e";
    },
    setAttrFilter(t, e) {
      const s = parseInt(e) || 0, n = { ...this.attrFilters };
      s > 0 ? n[t] = s : delete n[t], this.attrFilters = n;
    },
    toggleAttrFilter(t, e) {
      const s = { ...this.attrFilters };
      (s[t] || 0) === e ? delete s[t] : s[t] = e, this.attrFilters = s;
    },
    clearAttrFilters() {
      this.attrFilters = {};
    },
    sortBy(t) {
      this.sortCol === t ? this.sortDir = -this.sortDir : (this.sortCol = t, this.sortDir = -1), this.page = 0;
    }
  },
  beforeUnmount() {
    this.youthBgInterval && clearInterval(this.youthBgInterval), this.stopNegosPolling(), this._clockInterval && clearInterval(this._clockInterval), this._hashHandler && window.removeEventListener("hashchange", this._hashHandler);
  },
  mounted() {
    ur.defaults.font.family = "'Segoe UI',system-ui,sans-serif", ur.defaults.color = "#8b949e";
    try {
      localStorage.setItem("_sf_test", "1"), localStorage.getItem("_sf_test") === "1" ? (localStorage.removeItem("_sf_test"), this.cacheWorking = !0) : this.cacheWorking = !1;
    } catch {
      this.cacheWorking = !1;
    }
    try {
      const t = localStorage.getItem("sf_mental_cfg");
      if (t) {
        const e = JSON.parse(t);
        Array.isArray(e.attrs) && e.attrs.length && (this.mentalCfgAttrs = e.attrs), e.pct != null && (this.mentalWeightPct = e.pct);
      }
    } catch {
    }
    requestAnimationFrame(() => requestAnimationFrame(() => this.loadData())), this.loadCachedSubmissions(), this.loadMatchArchive(), this.loadChatHistory();
    try {
      const t = localStorage.getItem("sf_last_club");
      t && this.activeTab === "clubs" && setTimeout(() => this.openClubDetail(t).catch(() => {
        this.selectedClubName = null;
        try {
          localStorage.removeItem("sf_last_club");
        } catch {
        }
      }), 800);
    } catch {
    }
    this.youthBgInterval = setInterval(() => {
      this.bgAutoRefresh();
    }, 8 * 60 * 1e3), this._clockInterval = setInterval(() => {
      this._nowMs = Date.now();
    }, 6e4), this.activeTab === "espionage" && this.startNegosPolling(), this._hashHandler = () => {
      const t = location.hash.slice(1);
      t && this.tabs.some((e) => e.id === t) && (this.activeTab = t);
    }, window.addEventListener("hashchange", this._hashHandler);
  }
}).mount("#app");
