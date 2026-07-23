var Im = Object.defineProperty;
var Nm = (t, e, s) => e in t ? Im(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var Q = (t, e, s) => Nm(t, typeof e != "symbol" ? e + "" : e, s);
/**
* vue v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let vh, te, Dt, Wi, Hi, Ra, Xn, La, Sl, bn, Bn, js, wl;
function Ee(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
let yt = {}, Zn = [], ie = () => {
}, Un = () => !1, On = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && (t.charCodeAt(2) > 122 || 97 > t.charCodeAt(2)), fr = (t) => t.startsWith("onUpdate:"), gt = Object.assign, yc = (t, e) => {
  let s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Bm = Object.prototype.hasOwnProperty, wt = (t, e) => Bm.call(t, e), st = Array.isArray, at = (t) => typeof t == "function", ct = (t) => typeof t == "string", ge = (t) => typeof t == "symbol", St = (t) => t !== null && typeof t == "object", bc = (t) => (St(t) || at(t)) && at(t.then) && at(t.catch), Wt = Object.prototype.toString, dr = (t) => ct(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, ws = Ee(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), $m = Ee("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), pr = (t) => {
  let e = /* @__PURE__ */ Object.create(null);
  return (s) => e[s] || (e[s] = t(s));
}, jm = /-\w/g, Tt = pr((t) => t.replace(jm, (e) => e.slice(1).toUpperCase())), Wm = /\B([A-Z])/g, Me = pr((t) => t.replace(Wm, "-$1").toLowerCase()), Fn = pr((t) => t.charAt(0).toUpperCase() + t.slice(1)), Qn = pr((t) => t ? `on${Fn(t)}` : ""), ne = (t, e) => !Object.is(t, e), ti = (t, ...e) => {
  for (let s = 0; s < t.length; s++) t[s](...e);
}, hd = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, { configurable: !0, enumerable: !1, writable: n, value: s });
}, gr = (t) => {
  let e = parseFloat(t);
  return isNaN(e) ? t : e;
}, ei = (t) => {
  let e = ct(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
}, mr = () => vh || (vh = "u" > typeof globalThis ? globalThis : "u" > typeof self ? self : "u" > typeof window ? window : "u" > typeof global ? global : {}), Hm = Ee("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function ko(t) {
  if (st(t)) {
    let e = {};
    for (let s = 0; s < t.length; s++) {
      let n = t[s], i = ct(n) ? ud(n) : ko(n);
      if (i) for (let o in i) e[o] = i[o];
    }
    return e;
  }
  if (ct(t) || St(t)) return t;
}
let Vm = /;(?![^(]*\))/g, zm = /:([^]+)/, Gm = /\/\*[^]*?\*\//g;
function ud(t) {
  let e = {};
  return t.replace(Gm, "").split(Vm).forEach((s) => {
    if (s) {
      let n = s.split(zm);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Mo(t) {
  let e = "";
  if (ct(t)) e = t;
  else if (st(t)) for (let s = 0; s < t.length; s++) {
    let n = Mo(t[s]);
    n && (e += n + " ");
  }
  else if (St(t)) for (let s in t) t[s] && (e += s + " ");
  return e.trim();
}
function Um(t) {
  if (!t) return null;
  let { class: e, style: s } = t;
  return e && !ct(e) && (t.class = Mo(e)), s && (t.style = ko(s)), t;
}
let qm = Ee("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), Ym = Ee("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), Km = Ee("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"), Jm = Ee("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), Xm = Ee("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
function As(t, e) {
  let s, n;
  if (t === e) return !0;
  let i = (s = t, Wt.call(s) === "[object Date]"), o = (n = e, Wt.call(n) === "[object Date]");
  if (i || o) return !!i && !!o && t.getTime() === e.getTime();
  if (i = ge(t), o = ge(e), i || o) return t === e;
  if (i = st(t), o = st(e), i || o) return !!i && !!o && function(a, r) {
    if (a.length !== r.length) return !1;
    let l = !0;
    for (let c = 0; l && c < a.length; c++) l = As(a[c], r[c]);
    return l;
  }(t, e);
  if (i = St(t), o = St(e), i || o) {
    if (!i || !o || Object.keys(t).length !== Object.keys(e).length) return !1;
    for (let a in t) {
      let r = t.hasOwnProperty(a), l = e.hasOwnProperty(a);
      if (r && !l || !r && l || !As(t[a], e[a])) return !1;
    }
  }
  return String(t) === String(e);
}
function yr(t, e) {
  return t.findIndex((s) => As(s, e));
}
let fd = (t) => !!(t && t.__v_isRef === !0), dd = (t) => ct(t) ? t : t == null ? "" : st(t) || St(t) && (t.toString === Wt || !at(t.toString)) ? fd(t) ? dd(t.value) : JSON.stringify(t, pd, 2) : String(t), pd = (t, e) => {
  let s;
  if (fd(e)) return pd(t, e.value);
  if (s = e, Wt.call(s) === "[object Map]") return { [`Map(${e.size})`]: [...e.entries()].reduce((n, [i, o], a) => (n[Wr(i, a) + " =>"] = o, n), {}) };
  {
    let n;
    if (n = e, Wt.call(n) === "[object Set]") return { [`Set(${e.size})`]: [...e.values()].map((i) => Wr(i)) };
    {
      if (ge(e)) return Wr(e);
      let i;
      if (St(e) && !st(e) && (i = e, Wt.call(i) !== "[object Object]")) return String(e);
    }
  }
  return e;
}, Wr = (t, e = "") => {
  var s;
  return ge(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t;
};
class _c {
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
function Zm(t) {
  return new _c(t);
}
function gd() {
  return te;
}
function Qm(t, e = !1) {
  te && te.cleanups.push(t);
}
let Hr = /* @__PURE__ */ new WeakSet();
class so {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, te && te.active && te.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    64 & this.flags && (this.flags &= -65, Hr.has(this) && (Hr.delete(this), this.trigger()));
  }
  notify() {
    (!(2 & this.flags) || 32 & this.flags) && (8 & this.flags || md(this));
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, Sh(this), yd(this);
    let e = Dt, s = Ge;
    Dt = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      bd(this), Dt = e, Ge = s, this.flags &= -3;
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let e = this.deps; e; e = e.nextDep) vc(e);
      this.deps = this.depsTail = void 0, Sh(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    64 & this.flags ? Hr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Cl(this) && this.run();
  }
  get dirty() {
    return Cl(this);
  }
}
let br = 0;
function md(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Hi, Hi = t;
    return;
  }
  t.next = Wi, Wi = t;
}
function xc() {
  let t;
  if (!(--br > 0)) {
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
function yd(t) {
  for (let e = t.deps; e; e = e.nextDep) e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function bd(t) {
  let e, s = t.depsTail, n = s;
  for (; n; ) {
    let i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), vc(n), function(o) {
      let { prevDep: a, nextDep: r } = o;
      a && (a.nextDep = r, o.prevDep = void 0), r && (r.prevDep = a, o.nextDep = void 0);
    }(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  t.deps = e, t.depsTail = s;
}
function Cl(t) {
  for (let e = t.deps; e; e = e.nextDep) if (e.dep.version !== e.version || e.dep.computed && (_d(e.dep.computed) || e.dep.version !== e.version)) return !0;
  return !!t._dirty;
}
function _d(t) {
  if (4 & t.flags && !(16 & t.flags) || (t.flags &= -17, t.globalVersion === no) || (t.globalVersion = no, !t.isSSR && 128 & t.flags && (!t.deps && !t._dirty || !Cl(t)))) return;
  t.flags |= 2;
  let e = t.dep, s = Dt, n = Ge;
  Dt = t, Ge = !0;
  try {
    yd(t);
    let i = t.fn(t._value);
    (e.version === 0 || ne(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Dt = s, Ge = n, bd(t), t.flags &= -3;
  }
}
function vc(t, e = !1) {
  let { dep: s, prevSub: n, nextSub: i } = t;
  if (n && (n.nextSub = i, t.prevSub = void 0), i && (i.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep) vc(o, !0);
  }
  e || --s.sc || !s.map || s.map.delete(s.key);
}
function ty(t, e) {
  t.effect instanceof so && (t = t.effect.fn);
  let s = new so(t);
  e && gt(s, e);
  try {
    s.run();
  } catch (i) {
    throw s.stop(), i;
  }
  let n = s.run.bind(s);
  return n.effect = s, n;
}
function ey(t) {
  t.effect.stop();
}
let Ge = !0, xd = [];
function Ps() {
  xd.push(Ge), Ge = !1;
}
function Ts() {
  let t = xd.pop();
  Ge = t === void 0 || t;
}
function Sh(t) {
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
let no = 0;
class sy {
  constructor(e, s) {
    this.sub = e, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class _r {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Dt || !Ge || Dt === this.computed) return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Dt) s = this.activeLink = new sy(Dt, this), Dt.deps ? (s.prevDep = Dt.depsTail, Dt.depsTail.nextDep = s, Dt.depsTail = s) : Dt.deps = Dt.depsTail = s, function n(i) {
      if (i.dep.sc++, 4 & i.sub.flags) {
        let o = i.dep.computed;
        if (o && !i.dep.subs) {
          o.flags |= 20;
          for (let r = o.deps; r; r = r.nextDep) n(r);
        }
        let a = i.dep.subs;
        a !== i && (i.prevSub = a, a && (a.nextSub = i)), i.dep.subs = i;
      }
    }(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      let n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Dt.depsTail, s.nextDep = void 0, Dt.depsTail.nextDep = s, Dt.depsTail = s, Dt.deps === s && (Dt.deps = n);
    }
    return s;
  }
  trigger(e) {
    this.version++, no++, this.notify(e);
  }
  notify(e) {
    br++;
    try {
      for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
    } finally {
      xc();
    }
  }
}
let Oa = /* @__PURE__ */ new WeakMap(), _n = Symbol(""), kl = Symbol(""), io = Symbol("");
function ue(t, e, s) {
  if (Ge && Dt) {
    let n = Oa.get(t);
    n || Oa.set(t, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new _r()), i.map = n, i.key = s), i.track();
  }
}
function ms(t, e, s, n, i, o) {
  let a = Oa.get(t);
  if (!a) return void no++;
  let r = (l) => {
    l && l.trigger();
  };
  if (br++, e === "clear") a.forEach(r);
  else {
    let l = st(t), c = l && dr(s);
    if (l && s === "length") {
      let h = Number(n);
      a.forEach((u, f) => {
        (f === "length" || f === io || !ge(f) && f >= h) && r(u);
      });
    } else switch ((s !== void 0 || a.has(void 0)) && r(a.get(s)), c && r(a.get(io)), e) {
      case "add":
        if (l) c && r(a.get("length"));
        else {
          let u;
          r(a.get(_n)), u = t, Wt.call(u) === "[object Map]" && r(a.get(kl));
        }
        break;
      case "delete":
        if (!l) {
          let u;
          r(a.get(_n)), u = t, Wt.call(u) === "[object Map]" && r(a.get(kl));
        }
        break;
      case "set":
        let h;
        h = t, Wt.call(h) === "[object Map]" && r(a.get(_n));
    }
  }
  xc();
}
function $n(t) {
  let e = xt(t);
  return e === t ? e : (ue(e, "iterate", io), Te(t) ? e : e.map(Ue));
}
function xr(t) {
  return ue(t = xt(t), "iterate", io), t;
}
function ns(t, e) {
  return os(t) ? Cs(t) ? si(Ue(e)) : si(e) : Ue(e);
}
let ny = { __proto__: null, [Symbol.iterator]() {
  return Vr(this, Symbol.iterator, (t) => ns(this, t));
}, concat(...t) {
  return $n(this).concat(...t.map((e) => st(e) ? $n(e) : e));
}, entries() {
  return Vr(this, "entries", (t) => (t[1] = ns(this, t[1]), t));
}, every(t, e) {
  return rs(this, "every", t, e, void 0, arguments);
}, filter(t, e) {
  return rs(this, "filter", t, e, (s) => s.map((n) => ns(this, n)), arguments);
}, find(t, e) {
  return rs(this, "find", t, e, (s) => ns(this, s), arguments);
}, findIndex(t, e) {
  return rs(this, "findIndex", t, e, void 0, arguments);
}, findLast(t, e) {
  return rs(this, "findLast", t, e, (s) => ns(this, s), arguments);
}, findLastIndex(t, e) {
  return rs(this, "findLastIndex", t, e, void 0, arguments);
}, forEach(t, e) {
  return rs(this, "forEach", t, e, void 0, arguments);
}, includes(...t) {
  return zr(this, "includes", t);
}, indexOf(...t) {
  return zr(this, "indexOf", t);
}, join(t) {
  return $n(this).join(t);
}, lastIndexOf(...t) {
  return zr(this, "lastIndexOf", t);
}, map(t, e) {
  return rs(this, "map", t, e, void 0, arguments);
}, pop() {
  return xi(this, "pop");
}, push(...t) {
  return xi(this, "push", t);
}, reduce(t, ...e) {
  return wh(this, "reduce", t, e);
}, reduceRight(t, ...e) {
  return wh(this, "reduceRight", t, e);
}, shift() {
  return xi(this, "shift");
}, some(t, e) {
  return rs(this, "some", t, e, void 0, arguments);
}, splice(...t) {
  return xi(this, "splice", t);
}, toReversed() {
  return $n(this).toReversed();
}, toSorted(t) {
  return $n(this).toSorted(t);
}, toSpliced(...t) {
  return $n(this).toSpliced(...t);
}, unshift(...t) {
  return xi(this, "unshift", t);
}, values() {
  return Vr(this, "values", (t) => ns(this, t));
} };
function Vr(t, e, s) {
  let n = xr(t), i = n[e]();
  return n === t || Te(t) || (i._next = i.next, i.next = () => {
    let o = i._next();
    return o.done || (o.value = s(o.value)), o;
  }), i;
}
let iy = Array.prototype;
function rs(t, e, s, n, i, o) {
  let a = xr(t), r = a !== t && !Te(t), l = a[e];
  if (l !== iy[e]) {
    let u = l.apply(t, o);
    return r ? Ue(u) : u;
  }
  let c = s;
  a !== t && (r ? c = function(u, f) {
    return s.call(this, ns(t, u), f, t);
  } : s.length > 2 && (c = function(u, f) {
    return s.call(this, u, f, t);
  }));
  let h = l.call(a, c, n);
  return r && i ? i(h) : h;
}
function wh(t, e, s, n) {
  let i = xr(t), o = i !== t && !Te(t), a = s, r = !1;
  i !== t && (o ? (r = n.length === 0, a = function(c, h, u) {
    return r && (r = !1, c = ns(t, c)), s.call(this, c, ns(t, h), u, t);
  }) : s.length > 3 && (a = function(c, h, u) {
    return s.call(this, c, h, u, t);
  }));
  let l = i[e](a, ...n);
  return r ? ns(t, l) : l;
}
function zr(t, e, s) {
  let n = xt(t);
  ue(n, "iterate", io);
  let i = n[e](...s);
  return (i === -1 || i === !1) && Ao(s[0]) ? (s[0] = xt(s[0]), n[e](...s)) : i;
}
function xi(t, e, s = []) {
  Ps(), br++;
  let n = xt(t)[e].apply(t, s);
  return xc(), Ts(), n;
}
let oy = Ee("__proto__,__v_isRef,__isVue"), vd = new Set(Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ge));
function ay(t) {
  ge(t) || (t = String(t));
  let e = xt(this);
  return ue(e, "has", t), e.hasOwnProperty(t);
}
class Sd {
  constructor(e = !1, s = !1) {
    this._isReadonly = e, this._isShallow = s;
  }
  get(e, s, n) {
    if (s === "__v_skip") return e.__v_skip;
    let i = this._isReadonly, o = this._isShallow;
    if (s === "__v_isReactive") return !i;
    if (s === "__v_isReadonly") return i;
    if (s === "__v_isShallow") return o;
    if (s === "__v_raw") return n === (i ? o ? Pd : Ad : o ? Md : kd).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    let a = st(e);
    if (!i) {
      let l;
      if (a && (l = ny[s])) return l;
      if (s === "hasOwnProperty") return ay;
    }
    let r = Reflect.get(e, s, Jt(e) ? e : n);
    if ((ge(s) ? vd.has(s) : oy(s)) || (i || ue(e, "get", s), o)) return r;
    if (Jt(r)) {
      let l = a && dr(s) ? r : r.value;
      return i && St(l) ? Fa(l) : l;
    }
    return St(r) ? i ? Fa(r) : Sr(r) : r;
  }
}
class wd extends Sd {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, i) {
    let o = e[s], a = st(e) && dr(s);
    if (!this._isShallow) {
      let c = os(o);
      if (Te(n) || os(n) || (o = xt(o), n = xt(n)), !a && Jt(o) && !Jt(n)) return c || (o.value = n), !0;
    }
    let r = a ? Number(s) < e.length : wt(e, s), l = Reflect.set(e, s, n, Jt(e) ? e : i);
    return e === xt(i) && (r ? ne(n, o) && ms(e, "set", s, n) : ms(e, "add", s, n)), l;
  }
  deleteProperty(e, s) {
    let n = wt(e, s);
    e[s];
    let i = Reflect.deleteProperty(e, s);
    return i && n && ms(e, "delete", s, void 0), i;
  }
  has(e, s) {
    let n = Reflect.has(e, s);
    return ge(s) && vd.has(s) || ue(e, "has", s), n;
  }
  ownKeys(e) {
    return ue(e, "iterate", st(e) ? "length" : _n), Reflect.ownKeys(e);
  }
}
class Cd extends Sd {
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
let ry = new wd(), ly = new Cd(), cy = new wd(!0), hy = new Cd(!0), Gr = (t) => t;
function $o(t) {
  return function() {
    return t !== "delete" && (t === "clear" ? void 0 : this);
  };
}
function vr(t, e) {
  let s, n = (gt(s = { get(i) {
    let o = this.__v_raw, a = xt(o), r = xt(i);
    t || (ne(i, r) && ue(a, "get", i), ue(a, "get", r));
    let { has: l } = Reflect.getPrototypeOf(a), c = e ? Gr : t ? si : Ue;
    return l.call(a, i) ? c(o.get(i)) : l.call(a, r) ? c(o.get(r)) : void (o !== a && o.get(i));
  }, get size() {
    let i = this.__v_raw;
    return t || ue(xt(i), "iterate", _n), i.size;
  }, has(i) {
    let o = this.__v_raw, a = xt(o), r = xt(i);
    return t || (ne(i, r) && ue(a, "has", i), ue(a, "has", r)), i === r ? o.has(i) : o.has(i) || o.has(r);
  }, forEach(i, o) {
    let a = this, r = a.__v_raw, l = xt(r), c = e ? Gr : t ? si : Ue;
    return t || ue(l, "iterate", _n), r.forEach((h, u) => i.call(o, c(h), c(u), a));
  } }, t ? { add: $o("add"), set: $o("set"), delete: $o("delete"), clear: $o("clear") } : { add(i) {
    let o = xt(this), a = Reflect.getPrototypeOf(o), r = xt(i), l = e || Te(i) || os(i) ? i : r;
    return a.has.call(o, l) || ne(i, l) && a.has.call(o, i) || ne(r, l) && a.has.call(o, r) || (o.add(l), ms(o, "add", l, l)), this;
  }, set(i, o) {
    e || Te(o) || os(o) || (o = xt(o));
    let a = xt(this), { has: r, get: l } = Reflect.getPrototypeOf(a), c = r.call(a, i);
    c || (i = xt(i), c = r.call(a, i));
    let h = l.call(a, i);
    return a.set(i, o), c ? ne(o, h) && ms(a, "set", i, o) : ms(a, "add", i, o), this;
  }, delete(i) {
    let o = xt(this), { has: a, get: r } = Reflect.getPrototypeOf(o), l = a.call(o, i);
    l || (i = xt(i), l = a.call(o, i)), r && r.call(o, i);
    let c = o.delete(i);
    return l && ms(o, "delete", i, void 0), c;
  }, clear() {
    let i = xt(this), o = i.size !== 0, a = i.clear();
    return o && ms(i, "clear", void 0, void 0), a;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    s[i] = function(...o) {
      let a, r = this.__v_raw, l = xt(r), c = (a = l, Wt.call(a) === "[object Map]"), h = i === "entries" || i === Symbol.iterator && c, u = r[i](...o), f = e ? Gr : t ? si : Ue;
      return t || ue(l, "iterate", i === "keys" && c ? kl : _n), gt(Object.create(u), { next() {
        let { value: p, done: d } = u.next();
        return d ? { value: p, done: d } : { value: h ? [f(p[0]), f(p[1])] : f(p), done: d };
      } });
    };
  }), s);
  return (i, o, a) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? i : Reflect.get(wt(n, o) && o in i ? n : i, o, a);
}
let uy = { get: vr(!1, !1) }, fy = { get: vr(!1, !0) }, dy = { get: vr(!0, !1) }, py = { get: vr(!0, !0) }, kd = /* @__PURE__ */ new WeakMap(), Md = /* @__PURE__ */ new WeakMap(), Ad = /* @__PURE__ */ new WeakMap(), Pd = /* @__PURE__ */ new WeakMap();
function Sr(t) {
  return os(t) ? t : wr(t, !1, ry, uy, kd);
}
function Td(t) {
  return wr(t, !1, cy, fy, Md);
}
function Fa(t) {
  return wr(t, !0, ly, dy, Ad);
}
function gy(t) {
  return wr(t, !0, hy, py, Pd);
}
function wr(t, e, s, n, i) {
  var o;
  let a;
  if (!St(t) || t.__v_raw && !(e && t.__v_isReactive)) return t;
  let r = (o = t).__v_skip || !Object.isExtensible(o) ? 0 : function(h) {
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
  }((a = o, Wt.call(a)).slice(8, -1));
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
function Ao(t) {
  return !!t && !!t.__v_raw;
}
function xt(t) {
  let e = t && t.__v_raw;
  return e ? xt(e) : t;
}
function Dd(t) {
  return !wt(t, "__v_skip") && Object.isExtensible(t) && hd(t, "__v_skip", !0), t;
}
let Ue = (t) => St(t) ? Sr(t) : t, si = (t) => St(t) ? Fa(t) : t;
function Jt(t) {
  return !!t && t.__v_isRef === !0;
}
function Vi(t) {
  return Ld(t, !1);
}
function Rd(t) {
  return Ld(t, !0);
}
function Ld(t, e) {
  return Jt(t) ? t : new my(t, e);
}
class my {
  constructor(e, s) {
    this.dep = new _r(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : xt(e), this._value = s ? e : Ue(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    let s = this._rawValue, n = this.__v_isShallow || Te(e) || os(e);
    ne(e = n ? e : xt(e), s) && (this._rawValue = e, this._value = n ? e : Ue(e), this.dep.trigger());
  }
}
function yy(t) {
  t.dep && t.dep.trigger();
}
function Po(t) {
  return Jt(t) ? t.value : t;
}
function by(t) {
  return at(t) ? t() : Po(t);
}
let _y = { get: (t, e, s) => e === "__v_raw" ? t : Po(Reflect.get(t, e, s)), set: (t, e, s, n) => {
  let i = t[e];
  return Jt(i) && !Jt(s) ? (i.value = s, !0) : Reflect.set(t, e, s, n);
} };
function Sc(t) {
  return Cs(t) ? t : new Proxy(t, _y);
}
class xy {
  constructor(e) {
    this.__v_isRef = !0, this._value = void 0;
    let s = this.dep = new _r(), { get: n, set: i } = e(s.track.bind(s), s.trigger.bind(s));
    this._get = n, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e) {
    this._set(e);
  }
}
function Od(t) {
  return new xy(t);
}
function vy(t) {
  let e = st(t) ? Array(t.length) : {};
  for (let s in t) e[s] = new Fd(t, s, void 0);
  return e;
}
class Fd {
  constructor(e, s, n) {
    this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = ge(s) ? s : String(s), this._raw = xt(e);
    let i = !0, o = e;
    if (!st(e) || ge(this._key) || !dr(this._key)) do
      i = !Ao(o) || Te(o);
    while (i && (o = o.__v_raw));
    this._shallow = i;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = Po(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && Jt(this._raw[this._key])) {
      let s = this._object[this._key];
      if (Jt(s)) {
        s.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    var e, s;
    let n;
    return e = this._raw, s = this._key, (n = Oa.get(e)) && n.get(s);
  }
}
class Sy {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function wy(t, e, s) {
  return Jt(t) ? t : at(t) ? new Sy(t) : !St(t) || !(arguments.length > 1) ? Vi(t) : new Fd(t, e, s);
}
class Cy {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new _r(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = no - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && Dt !== this) return md(this, !0), !0;
  }
  get value() {
    let e = this.dep.track();
    return _d(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
let ky = { GET: "get", HAS: "has", ITERATE: "iterate" }, My = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" }, jo = {}, Ea = /* @__PURE__ */ new WeakMap();
function Ay() {
  return js;
}
function Ed(t, e = !1, s = js) {
  if (s) {
    let n = Ea.get(s);
    n || Ea.set(s, n = []), n.push(t);
  }
}
function ys(t, e = 1 / 0, s) {
  if (e <= 0 || !St(t) || t.__v_skip || ((s = s || /* @__PURE__ */ new Map()).get(t) || 0) >= e) return t;
  if (s.set(t, e), e--, Jt(t)) ys(t.value, e, s);
  else if (st(t)) for (let n = 0; n < t.length; n++) ys(t[n], e, s);
  else {
    let n, i;
    if (n = t, Wt.call(n) === "[object Set]" || (i = t, Wt.call(i) === "[object Map]")) t.forEach((o) => {
      ys(o, e, s);
    });
    else {
      let o;
      if (o = t, Wt.call(o) === "[object Object]") {
        for (let a in t) ys(t[a], e, s);
        for (let a of Object.getOwnPropertySymbols(t)) Object.prototype.propertyIsEnumerable.call(t, a) && ys(t[a], e, s);
      }
    }
  }
  return t;
}
function Py(t, e) {
}
let Ty = { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" };
function yi(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (i) {
    En(i, e, s);
  }
}
function He(t, e, s, n) {
  if (at(t)) {
    let i = yi(t, e, s, n);
    return i && bc(i) && i.catch((o) => {
      En(o, e, s);
    }), i;
  }
  if (st(t)) {
    let i = [];
    for (let o = 0; o < t.length; o++) i.push(He(t[o], e, s, n));
    return i;
  }
}
function En(t, e, s, n = !0) {
  e && e.vnode;
  let { errorHandler: i, throwUnhandledErrorInProduction: o } = e && e.appContext.config || yt;
  if (e) {
    let a = e.parent, r = e.proxy, l = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; a; ) {
      let c = a.ec;
      if (c) {
        for (let h = 0; h < c.length; h++) if (c[h](t, r, l) === !1) return;
      }
      a = a.parent;
    }
    if (i) {
      Ps(), yi(i, null, 10, [t, r, l]), Ts();
      return;
    }
  }
  (function(a, r = !0, l = !1) {
    if (l) throw a;
    console.error(a);
  })(t, n, o);
}
let xe = [], Qe = -1, ni = [], Ws = null, Gn = 0, Id = Promise.resolve(), ya = null;
function ri(t) {
  let e = ya || Id;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function wc(t) {
  if (!(1 & t.flags)) {
    let e = zi(t), s = xe[xe.length - 1];
    !s || !(2 & t.flags) && e >= zi(s) ? xe.push(t) : xe.splice(function(n) {
      let i = Qe + 1, o = xe.length;
      for (; i < o; ) {
        let a = i + o >>> 1, r = xe[a], l = zi(r);
        l < n || l === n && 2 & r.flags ? i = a + 1 : o = a;
      }
      return i;
    }(e), 0, t), t.flags |= 1, Nd();
  }
}
function Nd() {
  ya || (ya = Id.then(function t(e) {
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
      Qe = -1, xe.length = 0, Ia(), ya = null, (xe.length || ni.length) && t();
    }
  }));
}
function oo(t) {
  st(t) ? ni.push(...t) : Ws && t.id === -1 ? Ws.splice(Gn + 1, 0, t) : 1 & t.flags || (ni.push(t), t.flags |= 1), Nd();
}
function Ch(t, e, s = Qe + 1) {
  for (; s < xe.length; s++) {
    let n = xe[s];
    if (n && 2 & n.flags) {
      if (t && n.id !== t.uid) continue;
      xe.splice(s, 1), s--, 4 & n.flags && (n.flags &= -2), n(), 4 & n.flags || (n.flags &= -2);
    }
  }
}
function Ia(t) {
  if (ni.length) {
    let e = [...new Set(ni)].sort((s, n) => zi(s) - zi(n));
    if (ni.length = 0, Ws) return void Ws.push(...e);
    for (Gn = 0, Ws = e; Gn < Ws.length; Gn++) {
      let s = Ws[Gn];
      4 & s.flags && (s.flags &= -2), 8 & s.flags || s(), s.flags &= -2;
    }
    Ws = null, Gn = 0;
  }
}
let zi = (t) => t.id == null ? 2 & t.flags ? -1 : 1 / 0 : t.id, ae = null, Cr = null;
function ao(t) {
  let e = ae;
  return ae = t, Cr = t && t.type.__scopeId || null, e;
}
function Dy(t) {
  Cr = t;
}
function Ry() {
  Cr = null;
}
let Ly = (t) => Cc;
function Cc(t, e = ae, s) {
  if (!e || t._n) return t;
  let n = (...i) => {
    let o;
    n._d && co(-1);
    let a = ao(e);
    try {
      o = t(...i);
    } finally {
      ao(a), n._d && co(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Oy(t, e) {
  if (ae === null) return t;
  let s = Lo(ae), n = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [o, a, r, l = yt] = e[i];
    o && (at(o) && (o = { mounted: o, updated: o }), o.deep && ys(a), n.push({ dir: o, instance: s, value: a, oldValue: void 0, arg: r, modifiers: l }));
  }
  return t;
}
function es(t, e, s, n) {
  let i = t.dirs, o = e && e.dirs;
  for (let a = 0; a < i.length; a++) {
    let r = i[a];
    o && (r.oldValue = o[a].value);
    let l = r.dir[n];
    l && (Ps(), He(l, s, 8, [t.el, r, t, e]), Ts());
  }
}
function Bd(t, e) {
  if (oe) {
    let s = oe.provides, n = oe.parent && oe.parent.provides;
    n === s && (s = oe.provides = Object.create(n)), s[t] = e;
  }
}
function Gi(t, e, s = !1) {
  let n = ve();
  if (n || xn) {
    let i = xn ? xn._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return s && at(e) ? e.call(n && n.proxy) : e;
  }
}
function Fy() {
  return !!(ve() || xn);
}
let $d = Symbol.for("v-scx"), jd = () => Gi($d);
function Ey(t, e) {
  return To(t, null, e);
}
function Iy(t, e) {
  return To(t, null, { flush: "post" });
}
function Wd(t, e) {
  return To(t, null, { flush: "sync" });
}
function ii(t, e, s) {
  return To(t, e, s);
}
function To(t, e, s = yt) {
  let n, { immediate: i, flush: o } = s, a = gt({}, s), r = e && i || !e && o !== "post";
  if (An) {
    if (o === "sync") {
      let u = jd();
      n = u.__watcherHandles || (u.__watcherHandles = []);
    } else if (!r) {
      let u = () => {
      };
      return u.stop = ie, u.resume = ie, u.pause = ie, u;
    }
  }
  let l = oe;
  a.call = (u, f, p) => He(u, l, f, p);
  let c = !1;
  o === "post" ? a.scheduler = (u) => {
    Yt(u, l && l.suspense);
  } : o !== "sync" && (c = !0, a.scheduler = (u, f) => {
    f ? u() : wc(u);
  }), a.augmentJob = (u) => {
    e && (u.flags |= 4), c && (u.flags |= 2, l && (u.id = l.uid, u.i = l));
  };
  let h = function(u, f, p = yt) {
    let d, g, m, _, { immediate: y, deep: b, once: x, scheduler: v, augmentJob: k, call: S } = p, C = (P) => b ? P : Te(P) || b === !1 || b === 0 ? ys(P, 1) : ys(P), D = !1, O = !1;
    if (Jt(u) ? (g = () => u.value, D = Te(u)) : Cs(u) ? (g = () => C(u), D = !0) : st(u) ? (O = !0, D = u.some((P) => Cs(P) || Te(P)), g = () => u.map((P) => Jt(P) ? P.value : Cs(P) ? C(P) : at(P) ? S ? S(P, 2) : P() : void 0)) : g = at(u) ? f ? S ? () => S(u, 2) : u : () => {
      if (m) {
        Ps();
        try {
          m();
        } finally {
          Ts();
        }
      }
      let P = js;
      js = d;
      try {
        return S ? S(u, 3, [_]) : u(_);
      } finally {
        js = P;
      }
    } : ie, f && b) {
      let P = g, M = b === !0 ? 1 / 0 : b;
      g = () => ys(P(), M);
    }
    let I = gd(), w = () => {
      d.stop(), I && I.active && yc(I.effects, d);
    };
    if (x && f) {
      let P = f;
      f = (...M) => {
        P(...M), w();
      };
    }
    let F = O ? Array(u.length).fill(jo) : jo, L = (P) => {
      if (1 & d.flags && (d.dirty || P)) if (f) {
        let M = d.run();
        if (b || D || (O ? M.some((T, E) => ne(T, F[E])) : ne(M, F))) {
          m && m();
          let T = js;
          js = d;
          try {
            let E = [M, F === jo ? void 0 : O && F[0] === jo ? [] : F, _];
            F = M, S ? S(f, 3, E) : f(...E);
          } finally {
            js = T;
          }
        }
      } else d.run();
    };
    return k && k(L), (d = new so(g)).scheduler = v ? () => v(L, !1) : L, _ = (P) => Ed(P, !1, d), m = d.onStop = () => {
      let P = Ea.get(d);
      if (P) {
        if (S) S(P, 4);
        else for (let M of P) M();
        Ea.delete(d);
      }
    }, f ? y ? L(!0) : F = d.run() : v ? v(L.bind(null, !0), !0) : d.run(), w.pause = d.pause.bind(d), w.resume = d.resume.bind(d), w.stop = w, w;
  }(t, e, a);
  return An && (n ? n.push(h) : r && h()), h;
}
function Ny(t, e, s) {
  let n, i = this.proxy, o = ct(t) ? t.includes(".") ? Hd(i, t) : () => i[t] : t.bind(i, i);
  at(e) ? n = e : (n = e.handler, s = e);
  let a = bi(this), r = To(o, n.bind(i), s);
  return a(), r;
}
function Hd(t, e) {
  let s = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < s.length && n; i++) n = n[s[i]];
    return n;
  };
}
let Bs = /* @__PURE__ */ new WeakMap(), Vd = Symbol("_vte"), hn = (t) => t && (t.disabled || t.disabled === ""), kh = (t) => "u" > typeof SVGElement && t instanceof SVGElement, Mh = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement, Ur = (t, e) => {
  let s = t && t.to;
  return ct(s) ? e ? e(s) : null : s;
};
function Wo(t, e, s, { o: { insert: n }, m: i }, o = 2) {
  o === 0 && n(t.targetAnchor, e, s);
  let { el: a, anchor: r, shapeFlag: l, children: c, props: h } = t, u = o === 2;
  if (u && n(a, e, s), !Bs.has(t) && (!u || hn(h)) && 16 & l) for (let f = 0; f < c.length; f++) i(c[f], e, s, 2);
  u && n(r, e, s);
}
let By = { name: "Teleport", __isTeleport: !0, process(t, e, s, n, i, o, a, r, l, c) {
  let { mc: h, pc: u, pbc: f, o: { insert: p, querySelector: d, createText: g, parentNode: m } } = c, _ = hn(e.props), { dynamicChildren: y } = e, b = (k, S, C) => {
    16 & k.shapeFlag && h(k.children, S, C, i, o, a, r, l);
  }, x = (k = e) => {
    let S = hn(k.props), C = k.target = Ur(k.props, d), D = qr(C, k, g, p);
    C && (a !== "svg" && kh(C) ? a = "svg" : a !== "mathml" && Mh(C) && (a = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(C), S || (b(k, C, D), vi(k, !1)));
  }, v = (k) => {
    let S = () => {
      if (Bs.get(k) === S) {
        if (Bs.delete(k), hn(k.props)) {
          let C = m(k.el) || s;
          b(k, C, k.anchor), vi(k, !0);
        }
        x(k);
      }
    };
    Bs.set(k, S), Yt(S, o);
  };
  if (t == null) {
    let k, S = e.el = g(""), C = e.anchor = g("");
    if (p(S, s, n), p(C, s, n), (k = e.props) && (k.defer || k.defer === "") || o && o.pendingBranch) return void v(e);
    _ && (b(e, s, C), vi(e, !0)), x();
  } else {
    e.el = t.el;
    let k = e.anchor = t.anchor, S = Bs.get(t);
    if (S) {
      S.flags |= 8, Bs.delete(t), v(e);
      return;
    }
    e.targetStart = t.targetStart;
    let C = e.target = t.target, D = e.targetAnchor = t.targetAnchor, O = hn(t.props), I = O ? s : C, w = O ? k : D;
    if (a === "svg" || kh(C) ? a = "svg" : (a === "mathml" || Mh(C)) && (a = "mathml"), y ? (f(t.dynamicChildren, y, I, i, o, a, r), Ic(t, e, !0)) : l || u(t, e, I, w, i, o, a, r, !1), _) O ? e.props && t.props && e.props.to !== t.props.to && (e.props.to = t.props.to) : Wo(e, s, k, c, 1);
    else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
      let F = e.target = Ur(e.props, d);
      F && Wo(e, F, null, c, 0);
    } else O && Wo(e, C, D, c, 1);
    vi(e, _);
  }
}, remove(t, e, s, { um: n, o: { remove: i } }, o) {
  let { shapeFlag: a, children: r, anchor: l, targetStart: c, targetAnchor: h, target: u, props: f } = t, p = o || !hn(f), d = Bs.get(t);
  if (d && (d.flags |= 8, Bs.delete(t), p = !1), u && (i(c), i(h)), o && i(l), 16 & a) for (let g = 0; g < r.length; g++) {
    let m = r[g];
    n(m, e, s, p, !!m.dynamicChildren);
  }
}, move: Wo, hydrate: function(t, e, s, n, i, o, { o: { nextSibling: a, parentNode: r, querySelector: l, insert: c, createText: h } }, u) {
  function f(m, _) {
    let y = _;
    for (; y; ) {
      if (y && y.nodeType === 8) {
        if (y.data === "teleport start anchor") e.targetStart = y;
        else if (y.data === "teleport anchor") {
          e.targetAnchor = y, m._lpa = e.targetAnchor && a(e.targetAnchor);
          break;
        }
      }
      y = a(y);
    }
  }
  function p(m, _) {
    _.anchor = u(a(m), _, r(m), s, n, i, o);
  }
  let d = e.target = Ur(e.props, l), g = hn(e.props);
  if (d) {
    let m = d._lpa || d.firstChild;
    16 & e.shapeFlag && (g ? (p(t, e), f(d, m), e.targetAnchor || qr(d, e, h, c, r(t) === d ? t : null)) : (e.anchor = a(t), f(d, m), e.targetAnchor || qr(d, e, h, c), u(m && a(m), e, d, s, n, i, o))), vi(e, g);
  } else g && 16 & e.shapeFlag && (p(t, e), e.targetStart = t, e.targetAnchor = a(t));
  return e.anchor && a(e.anchor);
} };
function vi(t, e) {
  let s = t.ctx;
  if (s && s.ut) {
    let n, i;
    for (e ? (n = t.el, i = t.anchor) : (n = t.targetStart, i = t.targetAnchor); n && n !== i; ) n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function qr(t, e, s, n, i = null) {
  let o = e.targetStart = s(""), a = e.targetAnchor = s("");
  return o[Vd] = a, t && (n(o, t, i), n(a, t, i)), a;
}
let ss = Symbol("_leaveCb"), Si = Symbol("_enterCb");
function kc() {
  let t = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: /* @__PURE__ */ new Map() };
  return Ro(() => {
    t.isMounted = !0;
  }), Ar(() => {
    t.isUnmounting = !0;
  }), t;
}
let Ne = [Function, Array], Mc = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Ne, onEnter: Ne, onAfterEnter: Ne, onEnterCancelled: Ne, onBeforeLeave: Ne, onLeave: Ne, onAfterLeave: Ne, onLeaveCancelled: Ne, onBeforeAppear: Ne, onAppear: Ne, onAfterAppear: Ne, onAppearCancelled: Ne }, zd = (t) => {
  let e = t.subTree;
  return e.component ? zd(e.component) : e;
};
function Gd(t) {
  let e = t[0];
  if (t.length > 1) {
    for (let s of t) if (s.type !== Ut) {
      e = s;
      break;
    }
  }
  return e;
}
let Ud = { name: "BaseTransition", props: Mc, setup(t, { slots: e }) {
  let s = ve(), n = kc();
  return () => {
    let i = e.default && kr(e.default(), !0), o = i && i.length ? Gd(i) : s.subTree ? xp() : void 0;
    if (!o) return;
    let a = xt(t), { mode: r } = a;
    if (n.isLeaving) return Yr(o);
    let l = Ah(o);
    if (!l) return Yr(o);
    let c = li(l, a, n, s, (u) => c = u);
    l.type !== Ut && Ds(l, c);
    let h = s.subTree && Ah(s.subTree);
    if (h && h.type !== Ut && !Ve(h, l) && zd(s).type !== Ut) {
      let u = li(h, a, n, s);
      if (Ds(h, u), r === "out-in" && l.type !== Ut) return n.isLeaving = !0, u.afterLeave = () => {
        n.isLeaving = !1, 8 & s.job.flags || s.update(), delete u.afterLeave, h = void 0;
      }, Yr(o);
      r === "in-out" && l.type !== Ut ? u.delayLeave = (f, p, d) => {
        qd(n, h)[String(h.key)] = h, f[ss] = () => {
          p(), f[ss] = void 0, delete c.delayedLeave, h = void 0;
        }, c.delayedLeave = () => {
          d(), delete c.delayedLeave, h = void 0;
        };
      } : h = void 0;
    } else h && (h = void 0);
    return o;
  };
} };
function qd(t, e) {
  let { leavingVNodes: s } = t, n = s.get(e.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(e.type, n)), n;
}
function li(t, e, s, n, i) {
  let { appear: o, mode: a, persisted: r = !1, onBeforeEnter: l, onEnter: c, onAfterEnter: h, onEnterCancelled: u, onBeforeLeave: f, onLeave: p, onAfterLeave: d, onLeaveCancelled: g, onBeforeAppear: m, onAppear: _, onAfterAppear: y, onAppearCancelled: b } = e, x = String(t.key), v = qd(s, t), k = (D, O) => {
    D && He(D, n, 9, O);
  }, S = (D, O) => {
    let I = O[1];
    k(D, O), st(D) ? D.every((w) => w.length <= 1) && I() : D.length <= 1 && I();
  }, C = { mode: a, persisted: r, beforeEnter(D) {
    let O = l;
    if (!s.isMounted) if (o) O = m || l;
    else return;
    D[ss] && D[ss](!0);
    let I = v[x];
    I && Ve(t, I) && I.el[ss] && I.el[ss](), k(O, [D]);
  }, enter(D) {
    if (v[x] === t) return;
    let O = c, I = h, w = u;
    if (!s.isMounted) if (o) O = _ || c, I = y || h, w = b || u;
    else return;
    let F = !1;
    D[Si] = (P) => {
      F || (F = !0, P ? k(w, [D]) : k(I, [D]), C.delayedLeave && C.delayedLeave(), D[Si] = void 0);
    };
    let L = D[Si].bind(null, !1);
    O ? S(O, [D, L]) : L();
  }, leave(D, O) {
    let I = String(t.key);
    if (D[Si] && D[Si](!0), s.isUnmounting) return O();
    k(f, [D]);
    let w = !1;
    D[ss] = (L) => {
      w || (w = !0, O(), L ? k(g, [D]) : k(d, [D]), D[ss] = void 0, v[I] === t && delete v[I]);
    };
    let F = D[ss].bind(null, !1);
    v[I] = t, p ? S(p, [D, F]) : F();
  }, clone(D) {
    let O = li(D, e, s, n, i);
    return i && i(O), O;
  } };
  return C;
}
function Yr(t) {
  if (Do(t)) return (t = as(t)).children = null, t;
}
function Ah(t) {
  if (!Do(t)) return t.type.__isTeleport && t.children ? Gd(t.children) : t;
  if (t.component) return t.component.subTree;
  let { shapeFlag: e, children: s } = t;
  if (s) {
    if (16 & e) return s[0];
    if (32 & e && at(s.default)) return s.default();
  }
}
function Ds(t, e) {
  6 & t.shapeFlag && t.component ? (t.transition = e, Ds(t.component.subTree, e)) : 128 & t.shapeFlag ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function kr(t, e = !1, s) {
  let n = [], i = 0;
  for (let o = 0; o < t.length; o++) {
    let a = t[o], r = s == null ? a.key : String(s) + String(a.key != null ? a.key : o);
    a.type === ee ? (128 & a.patchFlag && i++, n = n.concat(kr(a.children, e, r))) : (e || a.type !== Ut) && n.push(r != null ? as(a, { key: r }) : a);
  }
  if (i > 1) for (let o = 0; o < n.length; o++) n[o].patchFlag = -2;
  return n;
}
function Ac(t, e) {
  return at(t) ? gt({ name: t.name }, e, { setup: t }) : t;
}
function $y() {
  let t = ve();
  return t ? (t.appContext.config.idPrefix || "v") + "-" + t.ids[0] + t.ids[1]++ : "";
}
function Pc(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function jy(t) {
  let e = ve(), s = Rd(null);
  return e && Object.defineProperty(e.refs === yt ? e.refs = {} : e.refs, t, { enumerable: !0, get: () => s.value, set: (n) => s.value = n }), s;
}
function Ph(t, e) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(t, e)) && !s.configurable);
}
let Na = /* @__PURE__ */ new WeakMap();
function oi(t, e, s, n, i = !1) {
  if (st(t)) return void t.forEach((g, m) => oi(g, e && (st(e) ? e[m] : e), s, n, i));
  if (ks(n) && !i) {
    512 & n.shapeFlag && n.type.__asyncResolved && n.component.subTree.component && oi(t, e, s, n.component.subTree);
    return;
  }
  let o = 4 & n.shapeFlag ? Lo(n.component) : n.el, a = i ? null : o, { i: r, r: l } = t, c = e && e.r, h = r.refs === yt ? r.refs = {} : r.refs, u = r.setupState, f = xt(u), p = u === yt ? Un : (g) => !Ph(h, g) && wt(f, g), d = (g, m) => !(m && Ph(h, m));
  if (c != null && c !== l && (Th(e), ct(c) ? (h[c] = null, p(c) && (u[c] = null)) : Jt(c) && (d(c, e.k) && (c.value = null), e.k && (h[e.k] = null))), at(l)) yi(l, r, 12, [a, h]);
  else {
    let g = ct(l), m = Jt(l);
    if (g || m) {
      let _ = () => {
        if (t.f) {
          let y = g ? p(l) ? u[l] : h[l] : d() || !t.k ? l.value : h[t.k];
          if (i) st(y) && yc(y, o);
          else if (st(y)) y.includes(o) || y.push(o);
          else if (g) h[l] = [o], p(l) && (u[l] = h[l]);
          else {
            let b = [o];
            d(l, t.k) && (l.value = b), t.k && (h[t.k] = b);
          }
        } else g ? (h[l] = a, p(l) && (u[l] = a)) : m && (d(l, t.k) && (l.value = a), t.k && (h[t.k] = a));
      };
      if (a) {
        let y = () => {
          _(), Na.delete(t);
        };
        y.id = -1, Na.set(t, y), Yt(y, s);
      } else Th(t), _();
    }
  }
}
function Th(t) {
  let e = Na.get(t);
  e && (e.flags |= 8, Na.delete(t));
}
let Dh = !1, jn = () => {
  Dh || (console.error("Hydration completed but contains mismatches."), Dh = !0);
}, Ho = (t) => {
  if (t.nodeType === 1) {
    if (t.namespaceURI.includes("svg") && t.tagName !== "foreignObject") return "svg";
    if (t.namespaceURI.includes("MathML")) return "mathml";
  }
}, qn = (t) => t.nodeType === 8;
function Wy(t) {
  let { mt: e, p: s, o: { patchProp: n, createText: i, nextSibling: o, parentNode: a, remove: r, insert: l, createComment: c } } = t, h = (y, b, x, v, k, S = !1) => {
    S = S || !!b.dynamicChildren;
    let C = qn(y) && y.data === "[", D = () => d(y, b, x, v, k, C), { type: O, ref: I, shapeFlag: w, patchFlag: F } = b, L = y.nodeType;
    b.el = y, F === -2 && (S = !1, b.dynamicChildren = null);
    let P = null;
    switch (O) {
      case qs:
        L !== 3 ? b.children === "" ? (l(b.el = i(""), a(y), y), P = y) : P = D() : (y.data !== b.children && (jn(), y.data = b.children), P = o(y));
        break;
      case Ut:
        _(y) ? (P = o(y), m(b.el = y.content.firstChild, y, x)) : P = L !== 8 || C ? D() : o(y);
        break;
      case vn:
        if (C && (L = (y = o(y)).nodeType), L === 1 || L === 3) {
          P = y;
          let M = !b.children.length;
          for (let T = 0; T < b.staticCount; T++) M && (b.children += P.nodeType === 1 ? P.outerHTML : P.data), T === b.staticCount - 1 && (b.anchor = P), P = o(P);
          return C ? o(P) : P;
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
          let M = a(y);
          if (P = C ? g(y) : qn(y) && y.data === "teleport start" ? g(y, y.data, "teleport end") : o(y), e(b, M, null, x, v, Ho(M), S), ks(b) && !b.type.__asyncResolved) {
            let T;
            C ? (T = Et(ee)).anchor = P ? P.previousSibling : M.lastChild : T = y.nodeType === 3 ? Bc("") : Et("div"), T.el = y, b.component.subTree = T;
          }
        } else 64 & w ? P = L !== 8 ? D() : b.type.hydrate(y, b, x, v, k, S, t, f) : 128 & w && (P = b.type.hydrate(y, b, x, v, Ho(a(y)), k, S, t, h));
    }
    return I != null && oi(I, null, v, b), P;
  }, u = (y, b, x, v, k, S) => {
    S = S || !!b.dynamicChildren;
    let { type: C, props: D, patchFlag: O, shapeFlag: I, dirs: w, transition: F } = b, L = C === "input" || C === "option";
    if (L || O !== -1) {
      let P;
      w && es(b, null, x, "created");
      let M = !1;
      if (_(y)) {
        M = pp(null, F) && x && x.vnode.props && x.vnode.props.appear;
        let T = y.content.firstChild;
        if (M) {
          let E = T.getAttribute("class");
          E && (T.$cls = E), F.beforeEnter(T);
        }
        m(T, y, x), b.el = y = T;
      }
      if (16 & I && !(D && (D.innerHTML || D.textContent))) {
        let T = f(y.firstChild, b, y, x, v, k, S);
        for (; T; ) {
          Vo(y, 1) || jn();
          let E = T;
          T = T.nextSibling, r(E);
        }
      } else if (8 & I) {
        let T = b.children;
        T[0] === `
` && (y.tagName === "PRE" || y.tagName === "TEXTAREA") && (T = T.slice(1));
        let { textContent: E } = y;
        E !== T && E !== T.replace(/\r\n|\r/g, `
`) && (Vo(y, 0) || jn(), y.textContent = b.children);
      }
      if (D) {
        if (L || !S || 48 & O) {
          let T = y.tagName.includes("-");
          for (let E in D) (L && (E.endsWith("value") || E === "indeterminate") || On(E) && !ws(E) || E[0] === "." || T && !ws(E)) && n(y, E, null, D[E], void 0, x);
        } else if (D.onClick) n(y, "onClick", null, D.onClick, void 0, x);
        else if (4 & O && Cs(D.style)) for (let T in D.style) D.style[T];
      }
      (P = D && D.onVnodeBeforeMount) && Ce(P, x, b), w && es(b, null, x, "beforeMount"), ((P = D && D.onVnodeMounted) || w || M) && gp(() => {
        P && Ce(P, x, b), M && F.enter(y), w && es(b, null, x, "mounted");
      }, v);
    }
    return y.nextSibling;
  }, f = (y, b, x, v, k, S, C) => {
    C = C || !!b.dynamicChildren;
    let D = b.children, O = D.length;
    for (let I = 0; I < O; I++) {
      let w = C ? D[I] : D[I] = ke(D[I]), F = w.type === qs;
      y ? (F && !C && I + 1 < O && ke(D[I + 1]).type === qs && (l(i(y.data.slice(w.children.length)), x, o(y)), y.data = w.children), y = h(y, w, v, k, S, C)) : F && !w.children ? l(w.el = i(""), x) : (Vo(x, 1) || jn(), s(null, w, x, null, v, k, Ho(x), S));
    }
    return y;
  }, p = (y, b, x, v, k, S) => {
    let { slotScopeIds: C } = b;
    C && (k = k ? k.concat(C) : C);
    let D = a(y), O = f(o(y), b, D, x, v, k, S);
    return O && qn(O) && O.data === "]" ? o(b.anchor = O) : (jn(), l(b.anchor = c("]"), D, O), O);
  }, d = (y, b, x, v, k, S) => {
    if (Vo(y.parentElement, 1) || jn(), b.el = null, S) {
      let O = g(y);
      for (; ; ) {
        let I = o(y);
        if (I && I !== O) r(I);
        else break;
      }
    }
    let C = o(y), D = a(y);
    return r(y), s(null, b, D, C, x, v, Ho(D), k), x && (x.vnode.el = b.el, Tr(x, b.el)), C;
  }, g = (y, b = "[", x = "]") => {
    let v = 0;
    for (; y; ) if ((y = o(y)) && qn(y) && (y.data === b && v++, y.data === x)) {
      if (v === 0) return o(y);
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
      s(null, y, b), Ia(), b._vnode = y;
      return;
    }
    h(b.firstChild, y, null, null, null), Ia(), b._vnode = y;
  }, h];
}
let Rh = "data-allow-mismatch", Hy = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
function Vo(t, e) {
  if (e === 0 || e === 1) for (; t && !t.hasAttribute(Rh); ) t = t.parentElement;
  let s = t && t.getAttribute(Rh);
  if (s == null) return !1;
  {
    if (s === "") return !0;
    let n = s.split(",");
    return !!(e === 0 && n.includes("children")) || n.includes(Hy[e]);
  }
}
let Vy = mr().requestIdleCallback || ((t) => setTimeout(t, 1)), zy = mr().cancelIdleCallback || ((t) => clearTimeout(t)), Gy = (t = 1e4) => (e) => {
  let s = Vy(e, { timeout: t });
  return () => zy(s);
}, Uy = (t) => (e, s) => {
  let n = new IntersectionObserver((i) => {
    for (let o of i) if (o.isIntersecting) {
      n.disconnect(), e();
      break;
    }
  }, t);
  return s((i) => {
    if (i instanceof Element) {
      if (function(o) {
        let { top: a, left: r, bottom: l, right: c } = o.getBoundingClientRect(), { innerHeight: h, innerWidth: u } = window;
        return (a > 0 && a < h || l > 0 && l < h) && (r > 0 && r < u || c > 0 && c < u);
      }(i)) return e(), n.disconnect(), !1;
      n.observe(i);
    }
  }), () => n.disconnect();
}, qy = (t) => (e) => {
  if (t) {
    let s = matchMedia(t);
    if (!s.matches) return s.addEventListener("change", e, { once: !0 }), () => s.removeEventListener("change", e);
    e();
  }
}, Yy = (t = []) => (e, s) => {
  ct(t) && (t = [t]);
  let n = !1, i = (a) => {
    n || (n = !0, o(), e(), a.target.dispatchEvent(new a.constructor(a.type, a)));
  }, o = () => {
    s((a) => {
      for (let r of t) a.removeEventListener(r, i);
    });
  };
  return s((a) => {
    for (let r of t) a.addEventListener(r, i, { once: !0 });
  }), o;
}, ks = (t) => !!t.type.__asyncLoader;
function Ky(t) {
  let e;
  at(t) && (t = { loader: t });
  let { loader: s, loadingComponent: n, errorComponent: i, delay: o = 200, hydrate: a, timeout: r, suspensible: l = !0, onError: c } = t, h = null, u = 0, f = () => {
    let p;
    return h || (p = h = s().catch((d) => {
      if (d = d instanceof Error ? d : Error(String(d)), c) return new Promise((g, m) => {
        c(d, () => g((u++, h = null, f())), () => m(d), u + 1);
      });
      throw d;
    }).then((d) => p !== h && h ? h : (d && (d.__esModule || d[Symbol.toStringTag] === "Module") && (d = d.default), e = d, d)));
  };
  return Ac({ name: "AsyncComponentWrapper", __asyncLoader: f, __asyncHydrate(p, d, g) {
    let m = !1;
    (d.bu || (d.bu = [])).push(() => m = !0);
    let _ = () => {
      m || g();
    }, y = a ? () => {
      let b = a(_, (x) => function(v, k) {
        if (qn(v) && v.data === "[") {
          let S = 1, C = v.nextSibling;
          for (; C; ) {
            if (C.nodeType === 1) {
              if (k(C) === !1) break;
            } else if (qn(C)) if (C.data === "]") {
              if (--S == 0) break;
            } else C.data === "[" && S++;
            C = C.nextSibling;
          }
        } else k(v);
      }(p, x));
      b && (d.bum || (d.bum = [])).push(b);
    } : _;
    e ? y() : f().then(() => !d.isUnmounted && y());
  }, get __asyncResolved() {
    return e;
  }, setup() {
    let p = oe;
    if (Pc(p), e) return () => zo(e, p);
    let d = (y) => {
      h = null, En(y, p, 13, !i);
    };
    if (l && p.suspense || An) return f().then((y) => () => zo(y, p)).catch((y) => (d(y), () => i ? Et(i, { error: y }) : null));
    let g = Vi(!1), m = Vi(), _ = Vi(!!o);
    return o && setTimeout(() => {
      _.value = !1;
    }, o), r != null && setTimeout(() => {
      if (!g.value && !m.value) {
        let y = Error(`Async component timed out after ${r}ms.`);
        d(y), m.value = y;
      }
    }, r), f().then(() => {
      g.value = !0, p.parent && Do(p.parent.vnode) && p.parent.update();
    }).catch((y) => {
      d(y), m.value = y;
    }), () => g.value && e ? zo(e, p) : m.value && i ? Et(i, { error: m.value }) : n && !_.value ? zo(n, p) : void 0;
  } });
}
function zo(t, e) {
  let { ref: s, props: n, children: i, ce: o } = e.vnode, a = Et(t, n, i);
  return a.ref = s, a.ce = o, delete e.vnode.ce, a;
}
let Do = (t) => t.type.__isKeepAlive, Jy = { name: "KeepAlive", __isKeepAlive: !0, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(t, { slots: e }) {
  let s = ve(), n = s.ctx;
  if (!n.renderer) return () => {
    let y = e.default && e.default();
    return y && y.length === 1 ? y[0] : y;
  };
  let i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), a = null, r = s.suspense, { renderer: { p: l, m: c, um: h, o: { createElement: u } } } = n, f = u("div");
  function p(y) {
    Kr(y), h(y, s, r, !0);
  }
  function d(y) {
    i.forEach((b, x) => {
      let v = El(ks(b) ? b.type.__asyncResolved || {} : b.type);
      v && !y(v) && g(x);
    });
  }
  function g(y) {
    let b = i.get(y);
    !b || a && Ve(b, a) ? a && Kr(a) : p(b), i.delete(y), o.delete(y);
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
    Wa(b.m), Wa(b.a), c(y, f, null, 1, r), Yt(() => {
      b.da && ti(b.da);
      let x = y.props && y.props.onVnodeUnmounted;
      x && Ce(x, b.parent, y), b.isDeactivated = !0;
    }, r);
  }, ii(() => [t.include, t.exclude], ([y, b]) => {
    y && d((x) => Li(y, x)), b && d((x) => !Li(b, x));
  }, { flush: "post", deep: !0 });
  let m = null, _ = () => {
    m != null && (Ha(s.subTree.type) ? Yt(() => {
      i.set(m, Go(s.subTree));
    }, s.subTree.suspense) : i.set(m, Go(s.subTree)));
  };
  return Ro(_), Mr(_), Ar(() => {
    i.forEach((y) => {
      let { subTree: b, suspense: x } = s, v = Go(b);
      if (y.type === v.type && y.key === v.key) {
        Kr(v);
        let k = v.component.da;
        k && Yt(k, x);
        return;
      }
      p(y);
    });
  }), () => {
    if (m = null, !e.default) return a = null;
    let y = e.default(), b = y[0];
    if (y.length > 1) return a = null, y;
    if (!Rs(b) || !(4 & b.shapeFlag) && !(128 & b.shapeFlag)) return a = null, b;
    let x = Go(b);
    if (x.type === Ut) return a = null, x;
    let v = x.type, k = El(ks(x) ? x.type.__asyncResolved || {} : v), { include: S, exclude: C, max: D } = t;
    if (S && (!k || !Li(S, k)) || C && k && Li(C, k)) return x.shapeFlag &= -257, a = x, b;
    let O = x.key == null ? v : x.key, I = i.get(O);
    return x.el && (x = as(x), 128 & b.shapeFlag && (b.ssContent = x)), m = O, I ? (x.el = I.el, x.component = I.component, x.transition && Ds(x, x.transition), x.shapeFlag |= 512, o.delete(O), o.add(O)) : (o.add(O), D && o.size > parseInt(D, 10) && g(o.values().next().value)), x.shapeFlag |= 256, a = x, Ha(b.type) ? b : x;
  };
} };
function Li(t, e) {
  let s;
  return st(t) ? t.some((n) => Li(n, e)) : ct(t) ? t.split(",").includes(e) : (s = t, Wt.call(s) === "[object RegExp]" && (t.lastIndex = 0, t.test(e)));
}
function Yd(t, e) {
  Jd(t, "a", e);
}
function Kd(t, e) {
  Jd(t, "da", e);
}
function Jd(t, e, s = oe) {
  let n = t.__wdc || (t.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return t();
  });
  if (Ba(e, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; ) Do(i.parent.vnode) && function(o, a, r, l) {
      let c = Ba(a, o, l, !0);
      Pr(() => {
        yc(l[a], c);
      }, r);
    }(n, e, s, i), i = i.parent;
  }
}
function Kr(t) {
  t.shapeFlag &= -257, t.shapeFlag &= -513;
}
function Go(t) {
  return 128 & t.shapeFlag ? t.ssContent : t;
}
function Ba(t, e, s = oe, n = !1) {
  if (s) {
    let i = s[t] || (s[t] = []), o = e.__weh || (e.__weh = (...a) => {
      Ps();
      let r = bi(s), l = He(e, s, t, a);
      return r(), Ts(), l;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
let Ls = (t) => (e, s = oe) => {
  An && t !== "sp" || Ba(t, (...n) => e(...n), s);
}, Xd = Ls("bm"), Ro = Ls("m"), Tc = Ls("bu"), Mr = Ls("u"), Ar = Ls("bum"), Pr = Ls("um"), Zd = Ls("sp"), Qd = Ls("rtg"), tp = Ls("rtc");
function ep(t, e = oe) {
  Ba("ec", t, e);
}
let Dc = "components";
function Xy(t, e) {
  return Rc(Dc, t, !0, e) || t;
}
let sp = Symbol.for("v-ndc");
function Zy(t) {
  return ct(t) ? Rc(Dc, t, !1) || t : t || sp;
}
function Qy(t) {
  return Rc("directives", t);
}
function Rc(t, e, s = !0, n = !1) {
  let i = ae || oe;
  if (i) {
    let o = i.type;
    if (t === Dc) {
      let r = El(o, !1);
      if (r && (r === e || r === Tt(e) || r === Fn(Tt(e)))) return o;
    }
    let a = Lh(i[t] || o[t], e) || Lh(i.appContext[t], e);
    return !a && n ? o : a;
  }
}
function Lh(t, e) {
  return t && (t[e] || t[Tt(e)] || t[Fn(Tt(e))]);
}
function tb(t, e, s, n) {
  let i, o = s && s[n], a = st(t);
  if (a || ct(t)) {
    let r = a && Cs(t), l = !1, c = !1;
    r && (l = !Te(t), c = os(t), t = xr(t)), i = Array(t.length);
    for (let h = 0, u = t.length; h < u; h++) i[h] = e(l ? c ? si(Ue(t[h])) : Ue(t[h]) : t[h], h, void 0, o && o[h]);
  } else if (typeof t == "number") {
    i = Array(t);
    for (let r = 0; r < t; r++) i[r] = e(r + 1, r, void 0, o && o[r]);
  } else if (St(t)) if (t[Symbol.iterator]) i = Array.from(t, (r, l) => e(r, l, void 0, o && o[l]));
  else {
    let r = Object.keys(t);
    i = Array(r.length);
    for (let l = 0, c = r.length; l < c; l++) {
      let h = r[l];
      i[l] = e(t[h], h, l, o && o[l]);
    }
  }
  else i = [];
  return s && (s[n] = i), i;
}
function eb(t, e) {
  for (let s = 0; s < e.length; s++) {
    let n = e[s];
    if (st(n)) for (let i = 0; i < n.length; i++) t[n[i].name] = n[i].fn;
    else n && (t[n.name] = n.key ? (...i) => {
      let o = n.fn(...i);
      return o && (o.key = n.key), o;
    } : n.fn);
  }
  return t;
}
function sb(t, e, s = {}, n, i) {
  if (ae.ce || ae.parent && ks(ae.parent) && ae.parent.ce) {
    let c = Object.keys(s).length > 0;
    return e !== "default" && (s.name = e), lo(), Va(ee, null, [Et("slot", s, n && n())], c ? -2 : 64);
  }
  let o = t[e];
  o && o._c && (o._d = !1), lo();
  let a = o && Lc(o(s)), r = s.key || a && a.key, l = Va(ee, { key: (r && !ge(r) ? r : `_${e}`) + (!a && n ? "_fb" : "") }, a || (n ? n() : []), a && t._ === 1 ? 64 : -2);
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function Lc(t) {
  return t.some((e) => !Rs(e) || e.type !== Ut && (e.type !== ee || !!Lc(e.children))) ? t : null;
}
function nb(t, e) {
  let s = {};
  for (let n in t) s[e && /[A-Z]/.test(n) ? `on:${n}` : Qn(n)] = t[n];
  return s;
}
let Ml = (t) => t ? wp(t) ? Lo(t) : Ml(t.parent) : null, Ui = gt(/* @__PURE__ */ Object.create(null), { $: (t) => t, $el: (t) => t.vnode.el, $data: (t) => t.data, $props: (t) => t.props, $attrs: (t) => t.attrs, $slots: (t) => t.slots, $refs: (t) => t.refs, $parent: (t) => Ml(t.parent), $root: (t) => Ml(t.root), $host: (t) => t.ce, $emit: (t) => t.emit, $options: (t) => Tl(t), $forceUpdate: (t) => t.f || (t.f = () => {
  wc(t.update);
}), $nextTick: (t) => t.n || (t.n = ri.bind(t.proxy)), $watch: (t) => Ny.bind(t) }), Jr = (t, e) => t !== yt && !t.__isScriptSetup && wt(t, e), Al = { get({ _: t }, e) {
  let s, n;
  if (e === "__v_skip") return !0;
  let { ctx: i, setupState: o, data: a, props: r, accessCache: l, type: c, appContext: h } = t;
  if (e[0] !== "$") {
    let f = l[e];
    if (f !== void 0) switch (f) {
      case 1:
        return o[e];
      case 2:
        return a[e];
      case 4:
        return i[e];
      case 3:
        return r[e];
    }
    else {
      if (Jr(o, e)) return l[e] = 1, o[e];
      if (a !== yt && wt(a, e)) return l[e] = 2, a[e];
      if (wt(r, e)) return l[e] = 3, r[e];
      if (i !== yt && wt(i, e)) return l[e] = 4, i[e];
      Pl && (l[e] = 0);
    }
  }
  let u = Ui[e];
  return u ? (e === "$attrs" && ue(t.attrs, "get", ""), u(t)) : (s = c.__cssModules) && (s = s[e]) ? s : i !== yt && wt(i, e) ? (l[e] = 4, i[e]) : wt(n = h.config.globalProperties, e) ? n[e] : void 0;
}, set({ _: t }, e, s) {
  let { data: n, setupState: i, ctx: o } = t;
  return Jr(i, e) ? (i[e] = s, !0) : n !== yt && wt(n, e) ? (n[e] = s, !0) : !wt(t.props, e) && !(e[0] === "$" && e.slice(1) in t) && (o[e] = s, !0);
}, has({ _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: i, props: o, type: a } }, r) {
  let l;
  return !!(s[r] || t !== yt && r[0] !== "$" && wt(t, r) || Jr(e, r) || wt(o, r) || wt(n, r) || wt(Ui, r) || wt(i.config.globalProperties, r) || (l = a.__cssModules) && l[r]);
}, defineProperty(t, e, s) {
  return s.get != null ? t._.accessCache[e] = 0 : wt(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
} }, ib = gt({}, Al, { get(t, e) {
  if (e !== Symbol.unscopables) return Al.get(t, e, t);
}, has: (t, e) => e[0] !== "_" && !Hm(e) });
function ob() {
  return null;
}
function ab() {
  return null;
}
function rb(t) {
}
function lb(t) {
}
function cb() {
  return null;
}
function hb() {
}
function ub(t, e) {
  return null;
}
function fb() {
  return np().slots;
}
function db() {
  return np().attrs;
}
function np(t) {
  let e = ve();
  return e.setupContext || (e.setupContext = Ap(e));
}
function ro(t) {
  return st(t) ? t.reduce((e, s) => (e[s] = null, e), {}) : t;
}
function pb(t, e) {
  let s = ro(t);
  for (let n in e) {
    if (n.startsWith("__skip")) continue;
    let i = s[n];
    i ? st(i) || at(i) ? i = s[n] = { type: i, default: e[n] } : i.default = e[n] : i === null && (i = s[n] = { default: e[n] }), i && e[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return s;
}
function gb(t, e) {
  return t && e ? st(t) && st(e) ? t.concat(e) : gt({}, ro(t), ro(e)) : t || e;
}
function mb(t, e) {
  let s = {};
  for (let n in t) e.includes(n) || Object.defineProperty(s, n, { enumerable: !0, get: () => t[n] });
  return s;
}
function yb(t) {
  let e = ve(), s = An, n = t();
  ho(), s && Xn(!1);
  let i = () => {
    bi(e), s && Xn(!0);
  }, o = () => {
    ve() !== e && e.scope.off(), ho(), s && Xn(!1);
  };
  return bc(n) && (n = n.catch((a) => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(o)), a;
  })), [n, () => {
    i(), Promise.resolve().then(o);
  }];
}
let Pl = !0;
function Oh(t, e, s) {
  He(st(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, s);
}
function Tl(t) {
  let e, s = t.type, { mixins: n, extends: i } = s, { mixins: o, optionsCache: a, config: { optionMergeStrategies: r } } = t.appContext, l = a.get(s);
  return l ? e = l : o.length || n || i ? (e = {}, o.length && o.forEach((c) => $a(e, c, r, !0)), $a(e, s, r)) : e = s, St(s) && a.set(s, e), e;
}
function $a(t, e, s, n = !1) {
  let { mixins: i, extends: o } = e;
  for (let a in o && $a(t, o, s, !0), i && i.forEach((r) => $a(t, r, s, !0)), e) if (!(n && a === "expose")) {
    let r = bb[a] || s && s[a];
    t[a] = r ? r(t[a], e[a]) : e[a];
  }
  return t;
}
let bb = { data: Fh, props: Eh, emits: Eh, methods: wi, computed: wi, beforeCreate: be, created: be, beforeMount: be, mounted: be, beforeUpdate: be, updated: be, beforeDestroy: be, beforeUnmount: be, destroyed: be, unmounted: be, activated: be, deactivated: be, errorCaptured: be, serverPrefetch: be, components: wi, directives: wi, watch: function(t, e) {
  if (!t) return e;
  if (!e) return t;
  let s = gt(/* @__PURE__ */ Object.create(null), t);
  for (let n in e) s[n] = be(t[n], e[n]);
  return s;
}, provide: Fh, inject: function(t, e) {
  return wi(Dl(t), Dl(e));
} };
function Fh(t, e) {
  return e ? t ? function() {
    return gt(at(t) ? t.call(this, this) : t, at(e) ? e.call(this, this) : e);
  } : e : t;
}
function Dl(t) {
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
function Eh(t, e) {
  return t ? st(t) && st(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : gt(/* @__PURE__ */ Object.create(null), ro(t), ro(e ?? {})) : e;
}
function ip() {
  return { app: null, config: { isNativeTag: Un, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let _b = 0, xn = null;
function xb(t, e, s = yt) {
  let n = ve(), i = Tt(e), o = Me(e), a = op(t, i), r = Od((l, c) => {
    let h, u, f = yt;
    return Wd(() => {
      let p = t[i];
      ne(h, p) && (h = p, c());
    }), { get: () => (l(), s.get ? s.get(h) : h), set(p) {
      let d = s.set ? s.set(p) : p;
      if (!ne(d, h) && !(f !== yt && ne(p, f))) return;
      let g = n.vnode.props;
      g && (e in g || i in g || o in g) && (`onUpdate:${e}` in g || `onUpdate:${i}` in g || `onUpdate:${o}` in g) || (h = p, c()), n.emit(`update:${e}`, d), ne(p, d) && ne(p, f) && !ne(d, u) && c(), f = p, u = d;
    } };
  });
  return r[Symbol.iterator] = () => {
    let l = 0;
    return { next: () => l < 2 ? { value: l++ ? a || yt : r, done: !1 } : { done: !0 } };
  }, r;
}
let op = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Tt(e)}Modifiers`] || t[`${Me(e)}Modifiers`];
function vb(t, e, ...s) {
  let n;
  if (t.isUnmounted) return;
  let i = t.vnode.props || yt, o = s, a = e.startsWith("update:"), r = a && op(i, e.slice(7));
  r && (r.trim && (o = s.map((h) => ct(h) ? h.trim() : h)), r.number && (o = s.map(gr)));
  let l = i[n = Qn(e)] || i[n = Qn(Tt(e))];
  !l && a && (l = i[n = Qn(Me(e))]), l && He(l, t, 6, o);
  let c = i[n + "Once"];
  if (c) {
    if (t.emitted) {
      if (t.emitted[n]) return;
    } else t.emitted = {};
    t.emitted[n] = !0, He(c, t, 6, o);
  }
}
let Sb = /* @__PURE__ */ new WeakMap();
function ja(t, e) {
  return !!t && !!On(e) && (wt(t, (e = e.slice(2).replace(/Once$/, ""))[0].toLowerCase() + e.slice(1)) || wt(t, Me(e)) || wt(t, e));
}
function ba(t) {
  let e, s, { type: n, vnode: i, proxy: o, withProxy: a, propsOptions: [r], slots: l, attrs: c, emit: h, render: u, renderCache: f, props: p, data: d, setupState: g, ctx: m, inheritAttrs: _ } = t, y = ao(t);
  try {
    if (4 & i.shapeFlag) {
      let x = a || o;
      e = ke(u.call(x, x, f, p, g, d, m)), s = c;
    } else e = ke(n.length > 1 ? n(p, { attrs: c, slots: l, emit: h }) : n(p, null)), s = n.props ? c : wb(c);
  } catch (x) {
    Yi.length = 0, En(x, t, 1), e = Et(Ut);
  }
  let b = e;
  if (s && _ !== !1) {
    let x = Object.keys(s), { shapeFlag: v } = b;
    x.length && 7 & v && (r && x.some(fr) && (s = Cb(s, r)), b = as(b, s, !1, !0));
  }
  return i.dirs && ((b = as(b, null, !1, !0)).dirs = b.dirs ? b.dirs.concat(i.dirs) : i.dirs), i.transition && Ds(b, i.transition), e = b, ao(y), e;
}
let wb = (t) => {
  let e;
  for (let s in t) (s === "class" || s === "style" || On(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, Cb = (t, e) => {
  let s = {};
  for (let n in t) fr(n) && n.slice(9) in e || (s[n] = t[n]);
  return s;
};
function Ih(t, e, s) {
  let n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < n.length; i++) {
    let o = n[i];
    if (ap(e, t, o) && !ja(s, o)) return !0;
  }
  return !1;
}
function ap(t, e, s) {
  let n = t[s], i = e[s];
  return s === "style" && St(n) && St(i) ? !As(n, i) : n !== i;
}
function Tr({ vnode: t, parent: e, suspense: s }, n) {
  for (; e; ) {
    let i = e.subTree;
    if (i.suspense && i.suspense.activeBranch === t && (i.suspense.vnode.el = i.el = n, t = i), i === t) (t = e.vnode).el = n, e = e.parent;
    else break;
  }
  s && s.activeBranch === t && (s.vnode.el = n);
}
let Rl = {}, rp = (t) => Object.getPrototypeOf(t) === Rl;
function lp(t, e, s, n) {
  let i, [o, a] = t.propsOptions, r = !1;
  if (e) for (let l in e) {
    let c;
    if (ws(l)) continue;
    let h = e[l];
    o && wt(o, c = Tt(l)) ? a && a.includes(c) ? (i || (i = {}))[c] = h : s[c] = h : ja(t.emitsOptions, l) || l in n && h === n[l] || (n[l] = h, r = !0);
  }
  if (a) {
    let l = xt(s), c = i || yt;
    for (let h = 0; h < a.length; h++) {
      let u = a[h];
      s[u] = Ll(o, l, u, c[u], t, !wt(c, u));
    }
  }
  return r;
}
function Ll(t, e, s, n, i, o) {
  let a = t[s];
  if (a != null) {
    let r = wt(a, "default");
    if (r && n === void 0) {
      let l = a.default;
      if (a.type !== Function && !a.skipFactory && at(l)) {
        let { propsDefaults: c } = i;
        if (s in c) n = c[s];
        else {
          let h = bi(i);
          n = c[s] = l.call(null, e), h();
        }
      } else n = l;
      i.ce && i.ce._setProp(s, n);
    }
    a[0] && (o && !r ? n = !1 : a[1] && (n === "" || n === Me(s)) && (n = !0));
  }
  return n;
}
let kb = /* @__PURE__ */ new WeakMap();
function Nh(t) {
  return !(t[0] === "$" || ws(t));
}
let Oc = (t) => t === "_" || t === "_ctx" || t === "$stable", Fc = (t) => st(t) ? t.map(ke) : [ke(t)], Mb = (t, e, s) => {
  if (e._n) return e;
  let n = Cc((...i) => Fc(e(...i)), s);
  return n._c = !1, n;
}, cp = (t, e, s) => {
  let n = t._ctx;
  for (let i in t) {
    if (Oc(i)) continue;
    let o = t[i];
    if (at(o)) e[i] = Mb(i, o, n);
    else if (o != null) {
      let a = Fc(o);
      e[i] = () => a;
    }
  }
}, hp = (t, e) => {
  let s = Fc(e);
  t.slots.default = () => s;
}, up = (t, e, s) => {
  for (let n in e) (s || !Oc(n)) && (t[n] = e[n]);
}, Yt = gp;
function Ec(t) {
  return dp(t);
}
function fp(t) {
  return dp(t, Wy);
}
function dp(t, e) {
  var s;
  let n, i;
  mr().__VUE__ = !0;
  let { insert: o, remove: a, patchProp: r, createElement: l, createText: c, createComment: h, setText: u, setElementText: f, parentNode: p, nextSibling: d, setScopeId: g = ie, insertStaticContent: m } = t, _ = (A, R, N, z = null, $ = null, B = null, G, j = null, V = !!R.dynamicChildren) => {
    if (A === R) return;
    A && !Ve(A, R) && (z = K(A), nt(A, $, B, !0), A = null), R.patchFlag === -2 && (V = !1, R.dynamicChildren = null);
    let { type: W, ref: J, shapeFlag: X } = R;
    switch (W) {
      case qs:
        y(A, R, N, z);
        break;
      case Ut:
        b(A, R, N, z);
        break;
      case vn:
        A == null && x(R, N, z, G);
        break;
      case ee:
        w(A, R, N, z, $, B, G, j, V);
        break;
      default:
        1 & X ? v(A, R, N, z, $, B, G, j, V) : 6 & X ? F(A, R, N, z, $, B, G, j, V) : (64 & X || 128 & X) && W.process(A, R, N, z, $, B, G, j, V, ot);
    }
    J != null && $ ? oi(J, A && A.ref, B, R || A, !R) : J == null && A && A.ref != null && oi(A.ref, null, B, A, !0);
  }, y = (A, R, N, z) => {
    if (A == null) o(R.el = c(R.children), N, z);
    else {
      let $ = R.el = A.el;
      R.children !== A.children && u($, R.children);
    }
  }, b = (A, R, N, z) => {
    A == null ? o(R.el = h(R.children || ""), N, z) : R.el = A.el;
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
    let V, W, { props: J, shapeFlag: X, transition: et, dirs: tt } = A;
    if (V = A.el = l(A.type, B, J && J.is, J), 8 & X ? f(V, A.children) : 16 & X && C(A.children, V, null, z, $, Xr(A, B), G, j), tt && es(A, null, z, "created"), S(V, A, A.scopeId, G, z), J) {
      for (let rt in J) rt === "value" || ws(rt) || r(V, rt, null, J[rt], B, z);
      "value" in J && r(V, "value", null, J.value, B), (W = J.onVnodeBeforeMount) && Ce(W, z, A);
    }
    tt && es(A, null, z, "beforeMount");
    let ht = pp($, et);
    ht && et.beforeEnter(V), o(V, R, N), ((W = J && J.onVnodeMounted) || ht || tt) && Yt(() => {
      W && Ce(W, z, A), ht && et.enter(V), tt && es(A, null, z, "mounted");
    }, $);
  }, S = (A, R, N, z, $) => {
    if (N && g(A, N), z) for (let B = 0; B < z.length; B++) g(A, z[B]);
    if ($) {
      let B = $.subTree;
      if (R === B || Ha(B.type) && (B.ssContent === R || B.ssFallback === R)) {
        let G = $.vnode;
        S(A, G, G.scopeId, G.slotScopeIds, $.parent);
      }
    }
  }, C = (A, R, N, z, $, B, G, j, V = 0) => {
    for (let W = V; W < A.length; W++) _(null, A[W] = j ? ds(A[W]) : ke(A[W]), R, N, z, $, B, G, j);
  }, D = (A, R, N, z, $, B, G) => {
    let j, V = R.el = A.el, { patchFlag: W, dynamicChildren: J, dirs: X } = R;
    W |= 16 & A.patchFlag;
    let et = A.props || yt, tt = R.props || yt;
    if (N && nn(N, !1), (j = tt.onVnodeBeforeUpdate) && Ce(j, N, R, A), X && es(R, A, N, "beforeUpdate"), N && nn(N, !0), (et.innerHTML && tt.innerHTML == null || et.textContent && tt.textContent == null) && f(V, ""), J ? O(A.dynamicChildren, J, V, N, z, Xr(R, $), B) : G || E(A, R, V, null, N, z, Xr(R, $), B, !1), W > 0) {
      if (16 & W) I(V, et, tt, N, $);
      else if (2 & W && et.class !== tt.class && r(V, "class", null, tt.class, $), 4 & W && r(V, "style", et.style, tt.style, $), 8 & W) {
        let ht = R.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let Mt = ht[rt], Nt = et[Mt], Ht = tt[Mt];
          (Ht !== Nt || Mt === "value") && r(V, Mt, Nt, Ht, $, N);
        }
      }
      1 & W && A.children !== R.children && f(V, R.children);
    } else G || J != null || I(V, et, tt, N, $);
    ((j = tt.onVnodeUpdated) || X) && Yt(() => {
      j && Ce(j, N, R, A), X && es(R, A, N, "updated");
    }, z);
  }, O = (A, R, N, z, $, B, G) => {
    for (let j = 0; j < R.length; j++) {
      let V = A[j], W = R[j], J = V.el && (V.type === ee || !Ve(V, W) || 198 & V.shapeFlag) ? p(V.el) : N;
      _(V, W, J, null, z, $, B, G, !0);
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
    let W = R.el = A ? A.el : c(""), J = R.anchor = A ? A.anchor : c(""), { patchFlag: X, dynamicChildren: et, slotScopeIds: tt } = R;
    tt && (j = j ? j.concat(tt) : tt), A == null ? (o(W, N, z), o(J, N, z), C(R.children || [], N, J, $, B, G, j, V)) : X > 0 && 64 & X && et && A.dynamicChildren && A.dynamicChildren.length === et.length ? (O(A.dynamicChildren, et, N, $, B, G, j), (R.key != null || $ && R === $.subTree) && Ic(A, R, !0)) : E(A, R, N, J, $, B, G, j, V);
  }, F = (A, R, N, z, $, B, G, j, V) => {
    R.slotScopeIds = j, A == null ? 512 & R.shapeFlag ? $.ctx.activate(R, N, z, G, V) : L(R, N, z, $, B, G, V) : P(A, R, V);
  }, L = (A, R, N, z, $, B, G) => {
    let j = A.component = Sp(A, z, $);
    if (Do(A) && (j.ctx.renderer = ot), Cp(j, !1, G), j.asyncDep) {
      if ($ && $.registerDep(j, M, G), !A.el) {
        let V = j.subTree = Et(Ut);
        b(null, V, R, N), A.placeholder = V.el;
      }
    } else M(j, A, R, N, $, B, G);
  }, P = (A, R, N) => {
    let z = R.component = A.component;
    if (function($, B, G) {
      let { props: j, children: V, component: W } = $, { props: J, children: X, patchFlag: et } = B, tt = W.emitsOptions;
      if (B.dirs || B.transition) return !0;
      if (!G || !(et >= 0)) return (!!V || !!X) && (!X || !X.$stable) || j !== J && (j ? !J || Ih(j, J, tt) : !!J);
      if (1024 & et) return !0;
      if (16 & et) return j ? Ih(j, J, tt) : !!J;
      if (8 & et) {
        let ht = B.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let Mt = ht[rt];
          if (ap(J, j, Mt) && !ja(tt, Mt)) return !0;
        }
      }
      return !1;
    }(A, R, N)) {
      if (z.asyncDep && !z.asyncResolved) return void T(z, R, N);
      z.next = R, z.update();
    } else R.el = A.el, z.vnode = R;
  }, M = (A, R, N, z, $, B, G) => {
    A.scope.on();
    let j = A.effect = new so(() => {
      if (A.isMounted) {
        let J, { next: X, bu: et, u: tt, parent: ht, vnode: rt } = A;
        {
          let Se = function No(en) {
            let Fs = en.subTree.component;
            if (Fs) return Fs.asyncDep && !Fs.asyncResolved ? Fs : No(Fs);
          }(A);
          if (Se) {
            X && (X.el = rt.el, T(A, X, G)), Se.asyncDep.then(() => {
              Yt(() => {
                A.isUnmounted || V();
              }, $);
            });
            return;
          }
        }
        let Mt = X;
        nn(A, !1), X ? (X.el = rt.el, T(A, X, G)) : X = rt, et && ti(et), (J = X.props && X.props.onVnodeBeforeUpdate) && Ce(J, ht, X, rt), nn(A, !0);
        let Nt = ba(A), Ht = A.subTree;
        A.subTree = Nt, _(Ht, Nt, p(Ht.el), K(Ht), A, $, B), X.el = Nt.el, Mt === null && Tr(A, Nt.el), tt && Yt(tt, $), (J = X.props && X.props.onVnodeUpdated) && Yt(() => Ce(J, ht, X, rt), $);
      } else {
        let J, { el: X, props: et } = R, { bm: tt, m: ht, parent: rt, root: Mt, type: Nt } = A, Ht = ks(R);
        if (nn(A, !1), tt && ti(tt), !Ht && (J = et && et.onVnodeBeforeMount) && Ce(J, rt, R), nn(A, !0), X && i) {
          let Se = () => {
            A.subTree = ba(A), i(X, A.subTree, A, $, null);
          };
          Ht && Nt.__asyncHydrate ? Nt.__asyncHydrate(X, A, Se) : Se();
        } else {
          Mt.ce && Mt.ce._hasShadowRoot() && Mt.ce._injectChildStyle(Nt, A.parent ? A.parent.type : void 0);
          let Se = A.subTree = ba(A);
          _(null, Se, N, z, A, $, B), R.el = Se.el;
        }
        if (ht && Yt(ht, $), !Ht && (J = et && et.onVnodeMounted)) {
          let Se = R;
          Yt(() => Ce(J, rt, Se), $);
        }
        (256 & R.shapeFlag || rt && ks(rt.vnode) && 256 & rt.vnode.shapeFlag) && A.a && Yt(A.a, $), A.isMounted = !0, R = N = z = null;
      }
    });
    A.scope.off();
    let V = A.update = j.run.bind(j), W = A.job = j.runIfDirty.bind(j);
    W.i = A, W.id = A.uid, j.scheduler = () => wc(W), nn(A, !0), V();
  }, T = (A, R, N) => {
    R.component = A;
    let z = A.vnode.props;
    A.vnode = R, A.next = null, function($, B, G, j) {
      let { props: V, attrs: W, vnode: { patchFlag: J } } = $, X = xt(V), [et] = $.propsOptions, tt = !1;
      if ((j || J > 0) && !(16 & J)) {
        if (8 & J) {
          let ht = $.vnode.dynamicProps;
          for (let rt = 0; rt < ht.length; rt++) {
            let Mt = ht[rt];
            if (ja($.emitsOptions, Mt)) continue;
            let Nt = B[Mt];
            if (et) if (wt(W, Mt)) Nt !== W[Mt] && (W[Mt] = Nt, tt = !0);
            else {
              let Ht = Tt(Mt);
              V[Ht] = Ll(et, X, Ht, Nt, $, !1);
            }
            else Nt !== W[Mt] && (W[Mt] = Nt, tt = !0);
          }
        }
      } else {
        let ht;
        for (let rt in lp($, B, V, W) && (tt = !0), X) B && (wt(B, rt) || (ht = Me(rt)) !== rt && wt(B, ht)) || (et ? G && (G[rt] !== void 0 || G[ht] !== void 0) && (V[rt] = Ll(et, X, rt, void 0, $, !0)) : delete V[rt]);
        if (W !== X) for (let rt in W) B && wt(B, rt) || (delete W[rt], tt = !0);
      }
      tt && ms($.attrs, "set", "");
    }(A, R.props, z, N), (($, B, G) => {
      let { vnode: j, slots: V } = $, W = !0, J = yt;
      if (32 & j.shapeFlag) {
        let X = B._;
        X ? G && X === 1 ? W = !1 : up(V, B, G) : (W = !B.$stable, cp(B, V)), J = B;
      } else B && (hp($, B), J = { default: 1 });
      if (W) for (let X in V) Oc(X) || J[X] != null || delete V[X];
    })(A, R.children, N), Ps(), Ch(A), Ts();
  }, E = (A, R, N, z, $, B, G, j, V = !1) => {
    let W = A && A.children, J = A ? A.shapeFlag : 0, X = R.children, { patchFlag: et, shapeFlag: tt } = R;
    if (et > 0) {
      if (128 & et) return void Y(W, X, N, z, $, B, G, j, V);
      if (256 & et) return void H(W, X, N, z, $, B, G, j, V);
    }
    8 & tt ? (16 & J && _t(W, $, B), X !== W && f(N, X)) : 16 & J ? 16 & tt ? Y(W, X, N, z, $, B, G, j, V) : _t(W, $, B, !0) : (8 & J && f(N, ""), 16 & tt && C(X, N, z, $, B, G, j, V));
  }, H = (A, R, N, z, $, B, G, j, V) => {
    let W;
    A = A || Zn, R = R || Zn;
    let J = A.length, X = R.length, et = Math.min(J, X);
    for (W = 0; W < et; W++) {
      let tt = R[W] = V ? ds(R[W]) : ke(R[W]);
      _(A[W], tt, N, null, $, B, G, j, V);
    }
    J > X ? _t(A, $, B, !0, !1, et) : C(R, N, z, $, B, G, j, V, et);
  }, Y = (A, R, N, z, $, B, G, j, V) => {
    let W = 0, J = R.length, X = A.length - 1, et = J - 1;
    for (; W <= X && W <= et; ) {
      let tt = A[W], ht = R[W] = V ? ds(R[W]) : ke(R[W]);
      if (Ve(tt, ht)) _(tt, ht, N, null, $, B, G, j, V);
      else break;
      W++;
    }
    for (; W <= X && W <= et; ) {
      let tt = A[X], ht = R[et] = V ? ds(R[et]) : ke(R[et]);
      if (Ve(tt, ht)) _(tt, ht, N, null, $, B, G, j, V);
      else break;
      X--, et--;
    }
    if (W > X) {
      if (W <= et) {
        let tt = et + 1, ht = tt < J ? R[tt].el : z;
        for (; W <= et; ) _(null, R[W] = V ? ds(R[W]) : ke(R[W]), N, ht, $, B, G, j, V), W++;
      }
    } else if (W > et) for (; W <= X; ) nt(A[W], $, B, !0), W++;
    else {
      let tt, ht = W, rt = W, Mt = /* @__PURE__ */ new Map();
      for (W = rt; W <= et; W++) {
        let Vt = R[W] = V ? ds(R[W]) : ke(R[W]);
        Vt.key != null && Mt.set(Vt.key, W);
      }
      let Nt = 0, Ht = et - rt + 1, Se = !1, No = 0, en = Array(Ht);
      for (W = 0; W < Ht; W++) en[W] = 0;
      for (W = ht; W <= X; W++) {
        let Vt, Qt = A[W];
        if (Nt >= Ht) {
          nt(Qt, $, B, !0);
          continue;
        }
        if (Qt.key != null) Vt = Mt.get(Qt.key);
        else for (tt = rt; tt <= et; tt++) if (en[tt - rt] === 0 && Ve(Qt, R[tt])) {
          Vt = tt;
          break;
        }
        Vt === void 0 ? nt(Qt, $, B, !0) : (en[Vt - rt] = W + 1, Vt >= No ? No = Vt : Se = !0, _(Qt, R[Vt], N, null, $, B, G, j, V), Nt++);
      }
      let Fs = Se ? function(Vt) {
        let Qt, _i, ye, Je, sn, Nn = Vt.slice(), Ie = [0], Em = Vt.length;
        for (Qt = 0; Qt < Em; Qt++) {
          let Bo = Vt[Qt];
          if (Bo !== 0) {
            if (Vt[_i = Ie[Ie.length - 1]] < Bo) {
              Nn[Qt] = _i, Ie.push(Qt);
              continue;
            }
            for (ye = 0, Je = Ie.length - 1; ye < Je; ) Vt[Ie[sn = ye + Je >> 1]] < Bo ? ye = sn + 1 : Je = sn;
            Bo < Vt[Ie[ye]] && (ye > 0 && (Nn[Qt] = Ie[ye - 1]), Ie[ye] = Qt);
          }
        }
        for (ye = Ie.length, Je = Ie[ye - 1]; ye-- > 0; ) Ie[ye] = Je, Je = Nn[Je];
        return Ie;
      }(en) : Zn;
      for (tt = Fs.length - 1, W = Ht - 1; W >= 0; W--) {
        let Vt = rt + W, Qt = R[Vt], _i = R[Vt + 1], ye = Vt + 1 < J ? _i.el || function Je(sn) {
          if (sn.placeholder) return sn.placeholder;
          let Nn = sn.component;
          return Nn ? Je(Nn.subTree) : null;
        }(_i) : z;
        en[W] === 0 ? _(null, Qt, N, ye, $, B, G, j, V) : Se && (tt < 0 || W !== Fs[tt] ? Z(Qt, N, ye, 2) : tt--);
      }
    }
  }, Z = (A, R, N, z, $ = null) => {
    let { el: B, type: G, transition: j, children: V, shapeFlag: W } = A;
    if (6 & W) return void Z(A.component.subTree, R, N, z);
    if (128 & W) return void A.suspense.move(R, N, z);
    if (64 & W) return void G.move(A, R, N, ot);
    if (G === ee) {
      o(B, R, N);
      for (let J = 0; J < V.length; J++) Z(V[J], R, N, z);
      o(A.anchor, R, N);
      return;
    }
    if (G === vn) return void (({ el: J, anchor: X }, et, tt) => {
      let ht;
      for (; J && J !== X; ) ht = d(J), o(J, et, tt), J = ht;
      o(X, et, tt);
    })(A, R, N);
    if (z !== 2 && 1 & W && j) if (z === 0) j.beforeEnter(B), o(B, R, N), Yt(() => j.enter(B), $);
    else {
      let { leave: J, delayLeave: X, afterLeave: et } = j, tt = () => {
        A.ctx.isUnmounted ? a(B) : o(B, R, N);
      }, ht = () => {
        B._isLeaving && B[ss](!0), J(B, () => {
          tt(), et && et();
        });
      };
      X ? X(B, tt, ht) : ht();
    }
    else o(B, R, N);
  }, nt = (A, R, N, z = !1, $ = !1) => {
    let B, { type: G, props: j, ref: V, children: W, dynamicChildren: J, shapeFlag: X, patchFlag: et, dirs: tt, cacheIndex: ht, memo: rt } = A;
    if (et === -2 && ($ = !1), V != null && (Ps(), oi(V, null, N, A, !0), Ts()), ht != null && (R.renderCache[ht] = void 0), 256 & X) return void R.ctx.deactivate(A);
    let Mt = 1 & X && tt, Nt = !ks(A);
    if (Nt && (B = j && j.onVnodeBeforeUnmount) && Ce(B, R, A), 6 & X) pt(A.component, N, z);
    else {
      if (128 & X) return void A.suspense.unmount(N, z);
      Mt && es(A, null, R, "beforeUnmount"), 64 & X ? A.type.remove(A, R, N, ot, z) : J && !J.hasOnce && (G !== ee || et > 0 && 64 & et) ? _t(J, R, N, !1, !0) : (G === ee && 384 & et || !$ && 16 & X) && _t(W, R, N), z && ft(A);
    }
    let Ht = rt != null && ht == null;
    (Nt && (B = j && j.onVnodeUnmounted) || Mt || Ht) && Yt(() => {
      B && Ce(B, R, A), Mt && es(A, null, R, "unmounted"), Ht && (A.el = null);
    }, N);
  }, ft = (A) => {
    let { type: R, el: N, anchor: z, transition: $ } = A;
    if (R === ee) return void lt(N, z);
    if (R === vn) return void (({ el: G, anchor: j }) => {
      let V;
      for (; G && G !== j; ) V = d(G), a(G), G = V;
      a(j);
    })(A);
    let B = () => {
      a(N), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (1 & A.shapeFlag && $ && !$.persisted) {
      let { leave: G, delayLeave: j } = $, V = () => G(N, B);
      j ? j(A.el, B, V) : V();
    } else B();
  }, lt = (A, R) => {
    let N;
    for (; A !== R; ) N = d(A), a(A), A = N;
    a(R);
  }, pt = (A, R, N) => {
    let { bum: z, scope: $, job: B, subTree: G, um: j, m: V, a: W } = A;
    Wa(V), Wa(W), z && ti(z), $.stop(), B && (B.flags |= 8, nt(G, A, R, N)), j && Yt(j, R), Yt(() => {
      A.isUnmounted = !0;
    }, R);
  }, _t = (A, R, N, z = !1, $ = !1, B = 0) => {
    for (let G = B; G < A.length; G++) nt(A[G], R, N, z, $);
  }, K = (A) => {
    if (6 & A.shapeFlag) return K(A.component.subTree);
    if (128 & A.shapeFlag) return A.suspense.next();
    let R = d(A.anchor || A.el), N = R && R[Vd];
    return N ? d(N) : R;
  }, q = !1, U = (A, R, N) => {
    let z;
    A == null ? R._vnode && (nt(R._vnode, null, null, !0), z = R._vnode.component) : _(R._vnode || null, A, R, null, null, null, N), R._vnode = A, q || (q = !0, Ch(z), Ia(), q = !1);
  }, ot = { p: _, um: nt, m: Z, r: ft, mt: L, mc: C, pc: E, pbc: O, n: K, o: t };
  return e && ([n, i] = e(ot)), { render: U, hydrate: n, createApp: (s = n, function(A, R = null) {
    at(A) || (A = gt({}, A)), R == null || St(R) || (R = null);
    let N = ip(), z = /* @__PURE__ */ new WeakSet(), $ = [], B = !1, G = N.app = { _uid: _b++, _component: A, _props: R, _container: null, _context: N, _instance: null, version: Rp, get config() {
      return N.config;
    }, set config(j) {
    }, use: (j, ...V) => (z.has(j) || (j && at(j.install) ? (z.add(j), j.install(G, ...V)) : at(j) && (z.add(j), j(G, ...V))), G), mixin: (j) => (N.mixins.includes(j) || N.mixins.push(j), G), component: (j, V) => V ? (N.components[j] = V, G) : N.components[j], directive: (j, V) => V ? (N.directives[j] = V, G) : N.directives[j], mount(j, V, W) {
      if (!B) {
        let J = G._ceVNode || Et(A, R);
        return J.appContext = N, W === !0 ? W = "svg" : W === !1 && (W = void 0), V && s ? s(J, j) : U(J, j, W), B = !0, G._container = j, j.__vue_app__ = G, Lo(J.component);
      }
    }, onUnmount(j) {
      $.push(j);
    }, unmount() {
      B && (He($, G._instance, 16), U(null, G._container), delete G._container.__vue_app__);
    }, provide: (j, V) => (N.provides[j] = V, G), runWithContext(j) {
      let V = xn;
      xn = G;
      try {
        return j();
      } finally {
        xn = V;
      }
    } };
    return G;
  }) };
}
function Xr({ type: t, props: e }, s) {
  return s === "svg" && t === "foreignObject" || s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : s;
}
function nn({ effect: t, job: e }, s) {
  s ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function pp(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Ic(t, e, s = !1) {
  let n = t.children, i = e.children;
  if (st(n) && st(i)) for (let o = 0; o < n.length; o++) {
    let a = n[o], r = i[o];
    1 & r.shapeFlag && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && ((r = i[o] = ds(i[o])).el = a.el), s || r.patchFlag === -2 || Ic(a, r)), r.type === qs && (r.patchFlag === -1 && (r = i[o] = ds(r)), r.el = a.el), r.type !== Ut || r.el || (r.el = a.el);
  }
}
function Wa(t) {
  if (t) for (let e = 0; e < t.length; e++) t[e].flags |= 8;
}
let Ha = (t) => t.__isSuspense, Ol = 0, Ab = { name: "Suspense", __isSuspense: !0, process(t, e, s, n, i, o, a, r, l, c) {
  if (t == null) (function(h, u, f, p, d, g, m, _, y) {
    let { p: b, o: { createElement: x } } = y, v = x("div"), k = h.suspense = Bh(h, d, p, u, v, f, g, m, _, y);
    b(null, k.pendingBranch = h.ssContent, v, null, p, k, g, m), k.deps > 0 ? (qi(h, "onPending"), qi(h, "onFallback"), b(null, h.ssFallback, u, f, p, null, g, m), Yn(k, h.ssFallback)) : k.resolve(!1, !0);
  })(e, s, n, i, o, a, r, l, c);
  else {
    if (o && o.deps > 0 && !t.suspense.isInFallback) {
      e.suspense = t.suspense, e.suspense.vnode = e, e.el = t.el;
      return;
    }
    (function(h, u, f, p, d, g, m, _, { p: y, um: b, o: { createElement: x } }) {
      let v = u.suspense = h.suspense;
      v.vnode = u, u.el = h.el;
      let k = u.ssContent, S = u.ssFallback, { activeBranch: C, pendingBranch: D, isInFallback: O, isHydrating: I } = v;
      if (D) v.pendingBranch = k, Ve(D, k) ? (y(D, k, v.hiddenContainer, null, d, v, g, m, _), v.deps <= 0 ? v.resolve() : O && !I && (y(C, S, f, p, d, null, g, m, _), Yn(v, S))) : (v.pendingId = Ol++, I ? (v.isHydrating = !1, v.activeBranch = D) : b(D, d, v), v.deps = 0, v.effects.length = 0, v.hiddenContainer = x("div"), O ? (y(null, k, v.hiddenContainer, null, d, v, g, m, _), v.deps <= 0 ? v.resolve() : (y(C, S, f, p, d, null, g, m, _), Yn(v, S))) : C && Ve(C, k) ? (y(C, k, f, p, d, v, g, m, _), v.resolve(!0)) : (y(null, k, v.hiddenContainer, null, d, v, g, m, _), v.deps <= 0 && v.resolve()));
      else if (C && Ve(C, k)) y(C, k, f, p, d, v, g, m, _), Yn(v, k);
      else if (qi(u, "onPending"), v.pendingBranch = k, 512 & k.shapeFlag ? v.pendingId = k.component.suspenseId : v.pendingId = Ol++, y(null, k, v.hiddenContainer, null, d, v, g, m, _), v.deps <= 0) v.resolve();
      else {
        let { timeout: w, pendingId: F } = v;
        w > 0 ? setTimeout(() => {
          v.pendingId === F && v.fallback(S);
        }, w) : w === 0 && v.fallback(S);
      }
    })(t, e, s, n, i, a, r, l, c);
  }
}, hydrate: function(t, e, s, n, i, o, a, r, l) {
  let c = e.suspense = Bh(e, n, s, t.parentNode, document.createElement("div"), null, i, o, a, r, !0), h = l(t, c.pendingBranch = e.ssContent, s, c, o, a);
  return c.deps === 0 && c.resolve(!1, !0), h;
}, normalize: function(t) {
  let { shapeFlag: e, children: s } = t, n = 32 & e;
  t.ssContent = $h(n ? s.default : s), t.ssFallback = n ? $h(s.fallback) : Et(Ut);
} };
function qi(t, e) {
  let s = t.props && t.props[e];
  at(s) && s();
}
function Bh(t, e, s, n, i, o, a, r, l, c, h = !1) {
  var u;
  let f, p, { p: d, m: g, um: m, n: _, o: { parentNode: y, remove: b } } = c, x = (f = (u = t).props && u.props.suspensible) != null && f !== !1;
  x && e && e.pendingBranch && (p = e.pendingId, e.deps++);
  let v = t.props ? ei(t.props.timeout) : void 0, k = o, S = { vnode: t, parent: e, parentComponent: s, namespace: a, container: n, hiddenContainer: i, deps: 0, pendingId: Ol++, timeout: typeof v == "number" ? v : -1, activeBranch: null, isFallbackMountPending: !1, pendingBranch: null, isInFallback: !h, isHydrating: h, isUnmounted: !1, effects: [], resolve(C = !1, D = !1) {
    let { vnode: O, activeBranch: I, pendingBranch: w, pendingId: F, effects: L, parentComponent: P, container: M, isInFallback: T } = S, E = !1;
    S.isHydrating ? S.isHydrating = !1 : !C && ((E = I && w.transition && w.transition.mode === "out-in") && (I.transition.afterLeave = () => {
      F === S.pendingId && (g(w, M, o === k ? _(I) : o, 0), oo(L), T && O.ssFallback && (O.ssFallback.el = null));
    }), I && !S.isFallbackMountPending && (y(I.el) === M && (o = _(I)), m(I, P, S, !0), !E && T && O.ssFallback && Yt(() => O.ssFallback.el = null, S)), E || g(w, M, o, 0)), S.isFallbackMountPending = !1, Yn(S, w), S.pendingBranch = null, S.isInFallback = !1;
    let H = S.parent, Y = !1;
    for (; H; ) {
      if (H.pendingBranch) {
        H.effects.push(...L), Y = !0;
        break;
      }
      H = H.parent;
    }
    Y || E || oo(L), S.effects = [], x && e && e.pendingBranch && p === e.pendingId && (e.deps--, e.deps !== 0 || D || e.resolve()), qi(O, "onResolve");
  }, fallback(C) {
    if (!S.pendingBranch) return;
    let { vnode: D, activeBranch: O, parentComponent: I, container: w, namespace: F } = S;
    qi(D, "onFallback");
    let L = _(O), P = () => {
      S.isFallbackMountPending = !1, S.isInFallback && (d(null, C, w, L, I, null, F, r, l), Yn(S, C));
    }, M = C.transition && C.transition.mode === "out-in";
    M && (S.isFallbackMountPending = !0, O.transition.afterLeave = P), S.isInFallback = !0, m(O, I, null, !0), M || P();
  }, move(C, D, O) {
    S.activeBranch && g(S.activeBranch, C, D, O), S.container = C;
  }, next: () => S.activeBranch && _(S.activeBranch), registerDep(C, D, O) {
    let I = !!S.pendingBranch;
    I && S.deps++;
    let w = C.vnode.el;
    C.asyncDep.catch((F) => {
      En(F, C, 0);
    }).then((F) => {
      if (C.isUnmounted || S.isUnmounted || S.pendingId !== C.suspenseId) return;
      ho(), C.asyncResolved = !0;
      let { vnode: L } = C;
      Fl(C, F, !1), w && (L.el = w);
      let P = !w && C.subTree.el;
      D(C, L, y(w || C.subTree.el), w ? null : _(C.subTree), S, a, O), P && (L.placeholder = null, b(P)), Tr(C, L.el), I && --S.deps == 0 && S.resolve();
    });
  }, unmount(C, D) {
    S.isUnmounted = !0, S.activeBranch && m(S.activeBranch, s, C, D), S.pendingBranch && m(S.pendingBranch, s, C, D);
  } };
  return S;
}
function $h(t) {
  let e;
  if (at(t)) {
    let s = Mn && t._c;
    s && (t._d = !1, lo()), t = t(), s && (t._d = !0, e = de, mp());
  }
  return st(t) && (t = function(s) {
    let n;
    for (let i = 0; i < s.length; i++) {
      let o = s[i];
      if (!Rs(o)) return;
      if (o.type !== Ut || o.children === "v-if") {
        if (n) return;
        n = o;
      }
    }
    return n;
  }(t)), t = ke(t), e && !t.dynamicChildren && (t.dynamicChildren = e.filter((s) => s !== t)), t;
}
function gp(t, e) {
  e && e.pendingBranch ? st(t) ? e.effects.push(...t) : e.effects.push(t) : oo(t);
}
function Yn(t, e) {
  t.activeBranch = e;
  let { vnode: s, parentComponent: n } = t, i = e.el;
  for (; !i && e.component; ) i = (e = e.component.subTree).el;
  s.el = i, n && n.subTree === s && (n.vnode.el = i, Tr(n, i));
}
let ee = Symbol.for("v-fgt"), qs = Symbol.for("v-txt"), Ut = Symbol.for("v-cmt"), vn = Symbol.for("v-stc"), Yi = [], de = null;
function lo(t = !1) {
  Yi.push(de = t ? null : []);
}
function mp() {
  Yi.pop(), de = Yi[Yi.length - 1] || null;
}
let Mn = 1;
function co(t, e = !1) {
  Mn += t, t < 0 && de && e && (de.hasOnce = !0);
}
function yp(t) {
  return t.dynamicChildren = Mn > 0 ? de || Zn : null, mp(), Mn > 0 && de && de.push(t), t;
}
function Pb(t, e, s, n, i, o) {
  return yp(Nc(t, e, s, n, i, o, !0));
}
function Va(t, e, s, n, i) {
  return yp(Et(t, e, s, n, i, !0));
}
function Rs(t) {
  return !!t && t.__v_isVNode === !0;
}
function Ve(t, e) {
  return t.type === e.type && t.key === e.key;
}
function Tb(t) {
}
let bp = ({ key: t }) => t ?? null, _a = ({ ref: t, ref_key: e, ref_for: s }) => (typeof t == "number" && (t = "" + t), t != null ? ct(t) || Jt(t) || at(t) ? { i: ae, r: t, k: e, f: !!s } : t : null);
function Nc(t, e = null, s = null, n = 0, i = null, o = +(t !== ee), a = !1, r = !1) {
  let l = { __v_isVNode: !0, __v_skip: !0, type: t, props: e, key: e && bp(e), ref: e && _a(e), scopeId: Cr, slotScopeIds: null, children: s, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: ae };
  return r ? ($c(l, s), 128 & o && t.normalize(l)) : s && (l.shapeFlag |= ct(s) ? 8 : 16), Mn > 0 && !a && de && (l.patchFlag > 0 || 6 & o) && l.patchFlag !== 32 && de.push(l), l;
}
let Et = function(t, e = null, s = null, n = 0, i = null, o = !1) {
  var a;
  if (t && t !== sp || (t = Ut), Rs(t)) {
    let l = as(t, e, !0);
    return s && $c(l, s), Mn > 0 && !o && de && (6 & l.shapeFlag ? de[de.indexOf(t)] = l : de.push(l)), l.patchFlag = -2, l;
  }
  if (at(a = t) && "__vccOpts" in a && (t = t.__vccOpts), e) {
    let { class: l, style: c } = e = _p(e);
    l && !ct(l) && (e.class = Mo(l)), St(c) && (Ao(c) && !st(c) && (c = gt({}, c)), e.style = ko(c));
  }
  let r = ct(t) ? 1 : Ha(t) ? 128 : t.__isTeleport ? 64 : St(t) ? 4 : 2 * !!at(t);
  return Nc(t, e, s, n, i, r, o, !0);
};
function _p(t) {
  return t ? Ao(t) || rp(t) ? gt({}, t) : t : null;
}
function as(t, e, s = !1, n = !1) {
  let { props: i, ref: o, patchFlag: a, children: r, transition: l } = t, c = e ? vp(i || {}, e) : i, h = { __v_isVNode: !0, __v_skip: !0, type: t.type, props: c, key: c && bp(c), ref: e && e.ref ? s && o ? st(o) ? o.concat(_a(e)) : [o, _a(e)] : _a(e) : o, scopeId: t.scopeId, slotScopeIds: t.slotScopeIds, children: r, target: t.target, targetStart: t.targetStart, targetAnchor: t.targetAnchor, staticCount: t.staticCount, shapeFlag: t.shapeFlag, patchFlag: e && t.type !== ee ? a === -1 ? 16 : 16 | a : a, dynamicProps: t.dynamicProps, dynamicChildren: t.dynamicChildren, appContext: t.appContext, dirs: t.dirs, transition: l, component: t.component, suspense: t.suspense, ssContent: t.ssContent && as(t.ssContent), ssFallback: t.ssFallback && as(t.ssFallback), placeholder: t.placeholder, el: t.el, anchor: t.anchor, ctx: t.ctx, ce: t.ce };
  return l && n && Ds(h, l.clone(h)), h;
}
function Bc(t = " ", e = 0) {
  return Et(qs, null, t, e);
}
function Db(t, e) {
  let s = Et(vn, null, t);
  return s.staticCount = e, s;
}
function xp(t = "", e = !1) {
  return e ? (lo(), Va(Ut, null, t)) : Et(Ut, null, t);
}
function ke(t) {
  return t == null || typeof t == "boolean" ? Et(Ut) : st(t) ? Et(ee, null, t.slice()) : Rs(t) ? ds(t) : Et(qs, null, String(t));
}
function ds(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : as(t);
}
function $c(t, e) {
  let s = 0, { shapeFlag: n } = t;
  if (e == null) e = null;
  else if (st(e)) s = 16;
  else if (typeof e == "object") if (65 & n) {
    let i = e.default;
    i && (i._c && (i._d = !1), $c(t, i()), i._c && (i._d = !0));
    return;
  } else {
    s = 32;
    let i = e._;
    i || rp(e) ? i === 3 && ae && (ae.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024)) : e._ctx = ae;
  }
  else at(e) ? (e = { default: e, _ctx: ae }, s = 32) : (e = String(e), 64 & n ? (s = 16, e = [Bc(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function vp(...t) {
  let e = {};
  for (let s = 0; s < t.length; s++) {
    let n = t[s];
    for (let i in n) if (i === "class") e.class !== n.class && (e.class = Mo([e.class, n.class]));
    else if (i === "style") e.style = ko([e.style, n.style]);
    else if (On(i)) {
      let o = e[i], a = n[i];
      a && o !== a && !(st(o) && o.includes(a)) ? e[i] = o ? [].concat(o, a) : a : a != null || o != null || fr(i) || (e[i] = a);
    } else i !== "" && (e[i] = n[i]);
  }
  return e;
}
function Ce(t, e, s, n = null) {
  He(t, e, 7, [s, n]);
}
let Rb = ip(), Lb = 0;
function Sp(t, e, s) {
  let n = t.type, i = (e ? e.appContext : t.appContext) || Rb, o = { uid: Lb++, vnode: t, type: n, parent: e, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new _c(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: e ? e.provides : Object.create(i.provides), ids: e ? e.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: function a(r, l, c = !1) {
    let h = c ? kb : l.propsCache, u = h.get(r);
    if (u) return u;
    let f = r.props, p = {}, d = [], g = !1;
    if (!at(r)) {
      let _ = (y) => {
        g = !0;
        let [b, x] = a(y, l, !0);
        gt(p, b), x && d.push(...x);
      };
      !c && l.mixins.length && l.mixins.forEach(_), r.extends && _(r.extends), r.mixins && r.mixins.forEach(_);
    }
    if (!f && !g) return St(r) && h.set(r, Zn), Zn;
    if (st(f)) for (let _ = 0; _ < f.length; _++) {
      let y = Tt(f[_]);
      Nh(y) && (p[y] = yt);
    }
    else if (f) for (let _ in f) {
      let y = Tt(_);
      if (Nh(y)) {
        let b = f[_], x = p[y] = st(b) || at(b) ? { type: b } : gt({}, b), v = x.type, k = !1, S = !0;
        if (st(v)) for (let C = 0; C < v.length; ++C) {
          let D = v[C], O = at(D) && D.name;
          if (O === "Boolean") {
            k = !0;
            break;
          }
          O === "String" && (S = !1);
        }
        else k = at(v) && v.name === "Boolean";
        x[0] = k, x[1] = S, (k || wt(x, "default")) && d.push(y);
      }
    }
    let m = [p, d];
    return St(r) && h.set(r, m), m;
  }(n, i), emitsOptions: function a(r, l, c = !1) {
    let h = c ? Sb : l.emitsCache, u = h.get(r);
    if (u !== void 0) return u;
    let f = r.emits, p = {}, d = !1;
    if (!at(r)) {
      let g = (m) => {
        let _ = a(m, l, !0);
        _ && (d = !0, gt(p, _));
      };
      !c && l.mixins.length && l.mixins.forEach(g), r.extends && g(r.extends), r.mixins && r.mixins.forEach(g);
    }
    return f || d ? (st(f) ? f.forEach((g) => p[g] = null) : gt(p, f), St(r) && h.set(r, p), p) : (St(r) && h.set(r, null), null);
  }(n, i), emit: null, emitted: null, propsDefaults: yt, inheritAttrs: n.inheritAttrs, ctx: yt, data: yt, props: yt, attrs: yt, slots: yt, refs: yt, setupState: yt, setupContext: null, suspense: s, suspenseId: s ? s.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o.ctx = { _: o }, o.root = e ? e.root : o, o.emit = vb.bind(null, o), t.ce && t.ce(o), o;
}
let oe = null, ve = () => oe || ae;
{
  let t = mr(), e = (s, n) => {
    let i;
    return (i = t[s]) || (i = t[s] = []), i.push(n), (o) => {
      i.length > 1 ? i.forEach((a) => a(o)) : i[0](o);
    };
  };
  Ra = e("__VUE_INSTANCE_SETTERS__", (s) => oe = s), Xn = e("__VUE_SSR_SETTERS__", (s) => An = s);
}
let bi = (t) => {
  let e = oe;
  return Ra(t), t.scope.on(), () => {
    t.scope.off(), Ra(e);
  };
}, ho = () => {
  oe && oe.scope.off(), Ra(null);
};
function wp(t) {
  return 4 & t.vnode.shapeFlag;
}
let An = !1;
function Cp(t, e = !1, s = !1) {
  e && Xn(e);
  let { props: n, children: i } = t.vnode, o = wp(t);
  (function(c, h, u, f = !1) {
    let p = {}, d = Object.create(Rl);
    for (let g in c.propsDefaults = /* @__PURE__ */ Object.create(null), lp(c, h, p, d), c.propsOptions[0]) g in p || (p[g] = void 0);
    u ? c.props = f ? p : Td(p) : c.type.props ? c.props = p : c.props = d, c.attrs = d;
  })(t, n, o, e);
  var a = s || e;
  let r = t.slots = Object.create(Rl);
  if (32 & t.vnode.shapeFlag) {
    let c = i._;
    c ? (up(r, i, a), a && hd(r, "_", c, !0)) : cp(i, r);
  } else i && hp(t, i);
  let l = o ? function(c, h) {
    let u = c.type;
    c.accessCache = /* @__PURE__ */ Object.create(null), c.proxy = new Proxy(c.ctx, Al);
    let { setup: f } = u;
    if (f) {
      Ps();
      let p = c.setupContext = f.length > 1 ? Ap(c) : null, d = bi(c), g = yi(f, c, 0, [c.props, p]), m = bc(g);
      if (Ts(), d(), (m || c.sp) && !ks(c) && Pc(c), m) {
        if (g.then(ho, ho), h) return g.then((_) => {
          Fl(c, _, h);
        }).catch((_) => {
          En(_, c, 0);
        });
        c.asyncDep = g;
      } else Fl(c, g, h);
    } else Mp(c, h);
  }(t, e) : void 0;
  return e && Xn(!1), l;
}
function Fl(t, e, s) {
  at(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : St(e) && (t.setupState = Sc(e)), Mp(t, s);
}
function kp(t) {
  La = t, Sl = (e) => {
    e.render._rc && (e.withProxy = new Proxy(e.ctx, ib));
  };
}
let Ob = () => !La;
function Mp(t, e, s) {
  let n = t.type;
  if (!t.render) {
    if (!e && La && !n.render) {
      let i = n.template || Tl(t).template;
      if (i) {
        let { isCustomElement: o, compilerOptions: a } = t.appContext.config, { delimiters: r, compilerOptions: l } = n, c = gt(gt({ isCustomElement: o, delimiters: r }, a), l);
        n.render = La(i, c);
      }
    }
    t.render = n.render || ie, Sl && Sl(t);
  }
  {
    let i = bi(t);
    Ps();
    try {
      (function(o) {
        let a = Tl(o), r = o.proxy, l = o.ctx;
        Pl = !1, a.beforeCreate && Oh(a.beforeCreate, o, "bc");
        let { data: c, computed: h, methods: u, watch: f, provide: p, inject: d, created: g, beforeMount: m, mounted: _, beforeUpdate: y, updated: b, activated: x, deactivated: v, beforeUnmount: k, unmounted: S, render: C, renderTracked: D, renderTriggered: O, errorCaptured: I, serverPrefetch: w, expose: F, inheritAttrs: L, components: P, directives: M } = a;
        if (d && function(E, H) {
          for (let Y in st(E) && (E = Dl(E)), E) {
            let Z, nt = E[Y];
            Jt(Z = St(nt) ? "default" in nt ? Gi(nt.from || Y, nt.default, !0) : Gi(nt.from || Y) : Gi(nt)) ? Object.defineProperty(H, Y, { enumerable: !0, configurable: !0, get: () => Z.value, set: (ft) => Z.value = ft }) : H[Y] = Z;
          }
        }(d, l), u) for (let E in u) {
          let H = u[E];
          at(H) && (l[E] = H.bind(r));
        }
        if (c) {
          let E = c.call(r, r);
          St(E) && (o.data = Sr(E));
        }
        if (Pl = !0, h) for (let E in h) {
          let H = h[E], Y = at(H) ? H.bind(r, r) : at(H.get) ? H.get.bind(r, r) : ie, Z = Pp({ get: Y, set: !at(H) && at(H.set) ? H.set.bind(r) : ie });
          Object.defineProperty(l, E, { enumerable: !0, configurable: !0, get: () => Z.value, set: (nt) => Z.value = nt });
        }
        if (f) for (let E in f) (function H(Y, Z, nt, ft) {
          let lt = ft.includes(".") ? Hd(nt, ft) : () => nt[ft];
          if (ct(Y)) {
            let pt = Z[Y];
            at(pt) && ii(lt, pt);
          } else if (at(Y)) ii(lt, Y.bind(nt));
          else if (St(Y)) if (st(Y)) Y.forEach((pt) => H(pt, Z, nt, ft));
          else {
            let pt = at(Y.handler) ? Y.handler.bind(nt) : Z[Y.handler];
            at(pt) && ii(lt, pt, Y);
          }
        })(f[E], l, r, E);
        if (p) {
          let E = at(p) ? p.call(r) : p;
          Reflect.ownKeys(E).forEach((H) => {
            Bd(H, E[H]);
          });
        }
        function T(E, H) {
          st(H) ? H.forEach((Y) => E(Y.bind(r))) : H && E(H.bind(r));
        }
        if (g && Oh(g, o, "c"), T(Xd, m), T(Ro, _), T(Tc, y), T(Mr, b), T(Yd, x), T(Kd, v), T(ep, I), T(tp, D), T(Qd, O), T(Ar, k), T(Pr, S), T(Zd, w), st(F)) if (F.length) {
          let E = o.exposed || (o.exposed = {});
          F.forEach((H) => {
            Object.defineProperty(E, H, { get: () => r[H], set: (Y) => r[H] = Y, enumerable: !0 });
          });
        } else o.exposed || (o.exposed = {});
        C && o.render === ie && (o.render = C), L != null && (o.inheritAttrs = L), P && (o.components = P), M && (o.directives = M), w && Pc(o);
      })(t);
    } finally {
      Ts(), i();
    }
  }
}
let Fb = { get: (t, e) => (ue(t, "get", ""), t[e]) };
function Ap(t) {
  return { attrs: new Proxy(t.attrs, Fb), slots: t.slots, emit: t.emit, expose: (e) => {
    t.exposed = e || {};
  } };
}
function Lo(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Sc(Dd(t.exposed)), { get: (e, s) => s in e ? e[s] : s in Ui ? Ui[s](t) : void 0, has: (e, s) => s in e || s in Ui })) : t.proxy;
}
function El(t, e = !0) {
  return at(t) ? t.displayName || t.name : t.name || e && t.__name;
}
let Pp = (t, e) => function(s, n = !1) {
  let i, o;
  return at(s) ? i = s : (i = s.get, o = s.set), new Cy(i, o, n);
}(t, An);
function Tp(t, e, s) {
  try {
    co(-1);
    let n = arguments.length;
    return n !== 2 ? (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Rs(s) && (s = [s]), Et(t, e, s)) : !St(e) || st(e) ? Et(t, null, e) : Rs(e) ? Et(t, null, [e]) : Et(t, e);
  } finally {
    co(1);
  }
}
function Eb() {
}
function Ib(t, e, s, n) {
  let i = s[n];
  if (i && Dp(i, t)) return i;
  let o = e();
  return o.memo = t.slice(), o.cacheIndex = n, s[n] = o;
}
function Dp(t, e) {
  let s = t.memo;
  if (s.length != e.length) return !1;
  for (let n = 0; n < s.length; n++) if (ne(s[n], e[n])) return !1;
  return Mn > 0 && de && de.push(t), !0;
}
let Rp = "3.5.33", Nb = ie, Bb = null, $b, jb = ie, Wb = { createComponentInstance: Sp, setupComponent: Cp, renderComponentRoot: ba, setCurrentRenderingInstance: ao, isVNode: Rs, normalizeVNode: ke, getComponentPublicInstance: Lo, ensureValidVNode: Lc, pushWarningContext: function(t) {
}, popWarningContext: function() {
} }, Hb = null, Vb = null, zb = null, jh = "u" > typeof window && window.trustedTypes;
if (jh) try {
  wl = jh.createPolicy("vue", { createHTML: (t) => t });
} catch {
}
let Lp = wl ? (t) => wl.createHTML(t) : (t) => t, fs = "u" > typeof document ? document : null, Wh = fs && fs.createElement("template"), Op = { insert: (t, e, s) => {
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
}, insertStaticContent(t, e, s, n, i, o) {
  let a = s ? s.previousSibling : e.lastChild;
  if (i && (i === o || i.nextSibling)) for (; e.insertBefore(i.cloneNode(!0), s), i !== o && (i = i.nextSibling); ) ;
  else {
    Wh.innerHTML = Lp(n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t);
    let r = Wh.content;
    if (n === "svg" || n === "mathml") {
      let l = r.firstChild;
      for (; l.firstChild; ) r.appendChild(l.firstChild);
      r.removeChild(l);
    }
    e.insertBefore(r, s);
  }
  return [a ? a.nextSibling : e.firstChild, s ? s.previousSibling : e.lastChild];
} }, Es = "transition", Ci = "animation", ci = Symbol("_vtc"), Fp = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, Ep = gt({}, Mc, Fp), Gb = ((tl = (t, { slots: e }) => Tp(Ud, Ip(t), e)).displayName = "Transition", tl.props = Ep, tl), on = (t, e = []) => {
  st(t) ? t.forEach((s) => s(...e)) : t && t(...e);
}, Hh = (t) => !!t && (st(t) ? t.some((e) => e.length > 1) : t.length > 1);
function Ip(t) {
  let e = {};
  for (let w in t) w in Fp || (e[w] = t[w]);
  if (t.css === !1) return e;
  let { name: s = "v", type: n, duration: i, enterFromClass: o = `${s}-enter-from`, enterActiveClass: a = `${s}-enter-active`, enterToClass: r = `${s}-enter-to`, appearFromClass: l = o, appearActiveClass: c = a, appearToClass: h = r, leaveFromClass: u = `${s}-leave-from`, leaveActiveClass: f = `${s}-leave-active`, leaveToClass: p = `${s}-leave-to` } = t, d = function(w) {
    if (w == null) return null;
    {
      if (St(w)) return [function(L) {
        return ei(L);
      }(w.enter), function(L) {
        return ei(L);
      }(w.leave)];
      let F = function(L) {
        return ei(L);
      }(w);
      return [F, F];
    }
  }(i), g = d && d[0], m = d && d[1], { onBeforeEnter: _, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: v, onBeforeAppear: k = _, onAppear: S = y, onAppearCancelled: C = b } = e, D = (w, F, L, P) => {
    w._enterCancelled = P, $s(w, F ? h : r), $s(w, F ? c : a), L && L();
  }, O = (w, F) => {
    w._isLeaving = !1, $s(w, u), $s(w, p), $s(w, f), F && F();
  }, I = (w) => (F, L) => {
    let P = w ? S : y, M = () => D(F, w, L);
    on(P, [F, M]), Vh(() => {
      $s(F, w ? l : o), Xe(F, w ? h : r), Hh(P) || zh(F, n, g, M);
    });
  };
  return gt(e, { onBeforeEnter(w) {
    on(_, [w]), Xe(w, o), Xe(w, a);
  }, onBeforeAppear(w) {
    on(k, [w]), Xe(w, l), Xe(w, c);
  }, onEnter: I(!1), onAppear: I(!0), onLeave(w, F) {
    w._isLeaving = !0;
    let L = () => O(w, F);
    Xe(w, u), w._enterCancelled ? (Xe(w, f), Il(w)) : (Il(w), Xe(w, f)), Vh(() => {
      w._isLeaving && ($s(w, u), Xe(w, p), Hh(x) || zh(w, n, m, L));
    }), on(x, [w, L]);
  }, onEnterCancelled(w) {
    D(w, !1, void 0, !0), on(b, [w]);
  }, onAppearCancelled(w) {
    D(w, !0, void 0, !0), on(C, [w]);
  }, onLeaveCancelled(w) {
    O(w), on(v, [w]);
  } });
}
function Xe(t, e) {
  e.split(/\s+/).forEach((s) => s && t.classList.add(s)), (t[ci] || (t[ci] = /* @__PURE__ */ new Set())).add(e);
}
function $s(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.remove(n));
  let s = t[ci];
  s && (s.delete(e), s.size || (t[ci] = void 0));
}
function Vh(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Ub = 0;
function zh(t, e, s, n) {
  let i = t._endId = ++Ub, o = () => {
    i === t._endId && n();
  };
  if (s != null) return setTimeout(o, s);
  let { type: a, timeout: r, propCount: l } = Np(t, e);
  if (!a) return n();
  let c = a + "end", h = 0, u = () => {
    t.removeEventListener(c, f), o();
  }, f = (p) => {
    p.target === t && ++h >= l && u();
  };
  setTimeout(() => {
    h < l && u();
  }, r + 1), t.addEventListener(c, f);
}
function Np(t, e) {
  let s = window.getComputedStyle(t), n = (d) => (s[d] || "").split(", "), i = n(`${Es}Delay`), o = n(`${Es}Duration`), a = Gh(i, o), r = n(`${Ci}Delay`), l = n(`${Ci}Duration`), c = Gh(r, l), h = null, u = 0, f = 0;
  e === Es ? a > 0 && (h = Es, u = a, f = o.length) : e === Ci ? c > 0 && (h = Ci, u = c, f = l.length) : f = (h = (u = Math.max(a, c)) > 0 ? a > c ? Es : Ci : null) ? h === Es ? o.length : l.length : 0;
  let p = h === Es && /\b(?:transform|all)(?:,|$)/.test(n(`${Es}Property`).toString());
  return { type: h, timeout: u, propCount: f, hasTransform: p };
}
function Gh(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((s, n) => Uh(s) + Uh(t[n])));
}
function Uh(t) {
  return t === "auto" ? 0 : 1e3 * Number(t.slice(0, -1).replace(",", "."));
}
function Il(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight;
}
let za = Symbol("_vod"), Bp = Symbol("_vsh"), $p = { name: "show", beforeMount(t, { value: e }, { transition: s }) {
  t[za] = t.style.display === "none" ? "" : t.style.display, s && e ? s.beforeEnter(t) : ki(t, e);
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
  t.style.display = e ? t[za] : "none", t[Bp] = !e;
}
let jp = Symbol("");
function qb(t) {
  let e = ve();
  if (!e) return;
  let s = e.ut = (i = t(e.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach((o) => Uo(o, i));
  }, n = () => {
    let i = t(e.proxy);
    e.ce ? Uo(e.ce, i) : function o(a, r) {
      if (128 & a.shapeFlag) {
        let l = a.suspense;
        a = l.activeBranch, l.pendingBranch && !l.isHydrating && l.effects.push(() => {
          o(l.activeBranch, r);
        });
      }
      for (; a.component; ) a = a.component.subTree;
      if (1 & a.shapeFlag && a.el) Uo(a.el, r);
      else if (a.type === ee) a.children.forEach((l) => o(l, r));
      else if (a.type === vn) {
        let { el: l, anchor: c } = a;
        for (; l && (Uo(l, r), l !== c); ) l = l.nextSibling;
      }
    }(e.subTree, i), s(i);
  };
  Tc(() => {
    oo(n);
  }), Ro(() => {
    ii(n, ie, { flush: "post" });
    let i = new MutationObserver(n);
    i.observe(e.subTree.el.parentNode, { childList: !0 }), Pr(() => i.disconnect());
  });
}
function Uo(t, e) {
  if (t.nodeType === 1) {
    let n = t.style, i = "";
    for (let o in e) {
      var s;
      let a = (s = e[o]) == null ? "initial" : typeof s == "string" ? s === "" ? " " : s : String(s);
      n.setProperty(`--${o}`, a), i += `--${o}: ${a};`;
    }
    n[jp] = i;
  }
}
let Yb = /(?:^|;)\s*display\s*:/, qh = /\s*!important$/;
function Oi(t, e, s) {
  if (st(s)) s.forEach((n) => Oi(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--")) t.setProperty(e, s);
  else {
    let n = function(i, o) {
      let a = Zr[o];
      if (a) return a;
      let r = Tt(o);
      if (r !== "filter" && r in i) return Zr[o] = r;
      r = Fn(r);
      for (let l = 0; l < Yh.length; l++) {
        let c = Yh[l] + r;
        if (c in i) return Zr[o] = c;
      }
      return o;
    }(t, e);
    qh.test(s) ? t.setProperty(Me(n), s.replace(qh, ""), "important") : t[n] = s;
  }
}
let Yh = ["Webkit", "Moz", "ms"], Zr = {}, Kh = "http://www.w3.org/1999/xlink";
function Jh(t, e, s, n, i, o = Xm(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(Kh, e.slice(6, e.length)) : t.setAttributeNS(Kh, e, s) : s == null || o && !(s || s === "") ? t.removeAttribute(e) : t.setAttribute(e, o ? "" : ge(s) ? String(s) : s);
}
function Xh(t, e, s, n, i) {
  if (e === "innerHTML" || e === "textContent") {
    s != null && (t[e] = e === "innerHTML" ? Lp(s) : s);
    return;
  }
  let o = t.tagName;
  if (e === "value" && o !== "PROGRESS" && !o.includes("-")) {
    let l = o === "OPTION" ? t.getAttribute("value") || "" : t.value, c = s == null ? t.type === "checkbox" ? "on" : "" : String(s);
    l === c && "_value" in t || (t.value = c), s == null && t.removeAttribute(e), t._value = s;
    return;
  }
  let a = !1;
  if (s === "" || s == null) {
    let l = typeof t[e];
    if (l === "boolean") {
      var r;
      s = !!(r = s) || r === "";
    } else s == null && l === "string" ? (s = "", a = !0) : l === "number" && (s = 0, a = !0);
  }
  try {
    t[e] = s;
  } catch {
  }
  a && t.removeAttribute(i || e);
}
function bs(t, e, s, n) {
  t.addEventListener(e, s, n);
}
let Zh = Symbol("_vei"), Qh = /(?:Once|Passive|Capture)$/, Qr = 0, Kb = Promise.resolve(), tu = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && 123 > t.charCodeAt(2), Wp = (t, e, s, n, i, o) => {
  let a = i === "svg";
  if (e === "class") {
    var r;
    let l;
    r = n, (l = t[ci]) && (r = (r ? [r, ...l] : [...l]).join(" ")), r == null ? t.removeAttribute("class") : a ? t.setAttribute("class", r) : t.className = r;
  } else e === "style" ? function(l, c, h) {
    let u = l.style, f = ct(h), p = !1;
    if (h && !f) {
      if (c) if (ct(c)) for (let y of c.split(";")) {
        let b = y.slice(0, y.indexOf(":")).trim();
        h[b] == null && Oi(u, b, "");
      }
      else for (let y in c) h[y] == null && Oi(u, y, "");
      for (let y in h) {
        var d, g, m, _;
        y === "display" && (p = !0);
        let b = h[y];
        b != null ? (d = l, g = y, m = !ct(c) && c ? c[y] : void 0, _ = b, d.tagName === "TEXTAREA" && (g === "width" || g === "height") && ct(_) && m === _ || Oi(u, y, b)) : Oi(u, y, "");
      }
    } else if (f) {
      if (c !== h) {
        let y = u[jp];
        y && (h += ";" + y), u.cssText = h, p = Yb.test(h);
      }
    } else c && l.removeAttribute("style");
    za in l && (l[za] = p ? u.display : "", l[Bp] && (u.display = "none"));
  }(t, s, n) : On(e) ? fr(e) || function(l, c, h, u = null) {
    let f = l[Zh] || (l[Zh] = {}), p = f[c];
    if (h && p) p.value = h;
    else {
      let [m, _] = function(y) {
        let b;
        if (Qh.test(y)) {
          let x;
          for (b = {}; x = y.match(Qh); ) y = y.slice(0, y.length - x[0].length), b[x[0].toLowerCase()] = !0;
        }
        return [y[2] === ":" ? y.slice(3) : Me(y.slice(2)), b];
      }(c);
      if (h) {
        var d, g;
        let y;
        bs(l, m, f[c] = (d = h, g = u, (y = (b) => {
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
        }).value = d, y.attached = Qr || (Kb.then(() => Qr = 0), Qr = Date.now()), y), _);
      } else p && (l.removeEventListener(m, p, _), f[c] = void 0);
    }
  }(t, e, n, o) : (e[0] === "." ? (e = e.slice(1), 0) : e[0] === "^" ? (e = e.slice(1), 1) : !function(l, c, h, u) {
    if (u) return !!(c === "innerHTML" || c === "textContent" || c in l && tu(c) && at(h));
    if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA") return !1;
    if (c === "width" || c === "height") {
      let f = l.tagName;
      if (f === "IMG" || f === "VIDEO" || f === "CANVAS" || f === "SOURCE") return !1;
    }
    return !(tu(c) && ct(h)) && c in l;
  }(t, e, n, a)) ? t._isVueCE && (function(l, c) {
    let h = l._def.props;
    if (!h) return !1;
    let u = Tt(c);
    return Array.isArray(h) ? h.some((f) => Tt(f) === u) : Object.keys(h).some((f) => Tt(f) === u);
  }(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !ct(n))) ? Xh(t, Tt(e), n, o, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), Jh(t, e, n, a)) : (Xh(t, e, n), t.tagName.includes("-") || e !== "value" && e !== "checked" && e !== "selected" || Jh(t, e, n, a, o, e !== "value"));
}, eu = {};
function Hp(t, e, s) {
  let n, i = Ac(t, e);
  n = i, Wt.call(n) === "[object Object]" && (i = gt({}, i, e));
  class o extends Dr {
    constructor(r) {
      super(i, r, s);
    }
  }
  return o.def = i, o;
}
let Jb = (t, e) => Hp(t, e, Qp), Xb = "u" > typeof HTMLElement ? HTMLElement : class {
};
class Dr extends Xb {
  constructor(e, s = {}, n = qa) {
    super(), this._def = e, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== qa ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow(gt({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._resolved || this._parseSlots(), this._connected = !0;
    let e = this;
    for (; e = e && (e.assignedSlot || e.parentNode || e.host); ) if (e instanceof Dr) {
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
      let o;
      this._resolved = !0, this._pendingResolve = void 0;
      let { props: a, styles: r } = n;
      if (a && !st(a)) for (let l in a) {
        let c = a[l];
        (c === Number || c && c.type === Number) && (l in this._props && (this._props[l] = ei(this._props[l])), (o || (o = /* @__PURE__ */ Object.create(null)))[Tt(l)] = !0);
      }
      this._numberProps = o, this._resolveProps(n), this.shadowRoot && this._applyStyles(r), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, e(this._def = n, !0);
    }) : e(this._def);
  }
  _mount(e) {
    this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    let s = this._instance && this._instance.exposed;
    if (s) for (let n in s) wt(this, n) || Object.defineProperty(this, n, { get: () => Po(s[n]) });
  }
  _resolveProps(e) {
    let { props: s } = e, n = st(s) ? s : Object.keys(s || {});
    for (let i of Object.keys(this)) i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (let i of n.map(Tt)) Object.defineProperty(this, i, { get() {
      return this._getProp(i);
    }, set(o) {
      this._setProp(i, o, !0, !this._patching);
    } });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    let s = this.hasAttribute(e), n = s ? this.getAttribute(e) : eu, i = Tt(e);
    s && this._numberProps && this._numberProps[i] && (n = ei(n)), this._setProp(i, n, !1, !0);
  }
  _getProp(e) {
    return this._props[e];
  }
  _setProp(e, s, n = !0, i = !1) {
    if (s !== this._props[e] && (this._dirty = !0, s === eu ? delete this._props[e] : (this._props[e] = s, e === "key" && this._app && (this._app._ceVNode.key = s)), i && this._instance && this._update(), n)) {
      let o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Me(e), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Me(e), s + "") : s || this.removeAttribute(Me(e)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    let e = this._createVNode();
    this._app && (e.appContext = this._app._context), Zp(e, this._root);
  }
  _createVNode() {
    let e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    let s = Et(this._def, gt(e, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      let i = (o, a) => {
        let r;
        this.dispatchEvent(new CustomEvent(o, (r = a[0], Wt.call(r) === "[object Object]" ? gt({ detail: a }, a[0]) : { detail: a })));
      };
      n.emit = (o, ...a) => {
        i(o, a), Me(o) !== o && i(Me(o), a);
      }, this._setParent();
    }), s;
  }
  _applyStyles(e, s, n) {
    if (!e) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s)) return;
      this._styleChildren.add(s);
    }
    let i = this._nonce, o = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(o), r = null;
    for (let l = e.length - 1; l >= 0; l--) {
      let c = document.createElement("style");
      i && c.setAttribute("nonce", i), c.textContent = e[l], o.insertBefore(c, r || a), r = c, l === 0 && (n || this._styleAnchors.set(this._def, c), s && this._styleAnchors.set(s, c));
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
      let i = e[n], o = i.getAttribute("name") || "default", a = this._slots[o], r = i.parentNode;
      if (a) for (let l of a) {
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
      for (let o = 0; o < i.length; o++) s.add(i[o]);
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
function Vp(t) {
  let e = ve();
  return e && e.ce || null;
}
function Zb() {
  let t = Vp();
  return t && t.shadowRoot;
}
function Qb(t = "$style") {
  {
    let e = ve();
    if (!e) return yt;
    let s = e.type.__cssModules;
    return s && s[t] || yt;
  }
}
let zp = /* @__PURE__ */ new WeakMap(), Gp = /* @__PURE__ */ new WeakMap(), Ga = Symbol("_moveCb"), su = Symbol("_enterCb"), t0 = (el = { name: "TransitionGroup", props: gt({}, Ep, { tag: String, moveClass: String }), setup(t, { slots: e }) {
  let s, n, i = ve(), o = kc();
  return Mr(() => {
    if (!s.length) return;
    let a = t.moveClass || `${t.name || "v"}-move`;
    if (!function(l, c, h) {
      let u = l.cloneNode(), f = l[ci];
      f && f.forEach((g) => {
        g.split(/\s+/).forEach((m) => m && u.classList.remove(m));
      }), h.split(/\s+/).forEach((g) => g && u.classList.add(g)), u.style.display = "none";
      let p = c.nodeType === 1 ? c : c.parentNode;
      p.appendChild(u);
      let { hasTransform: d } = Np(u);
      return p.removeChild(u), d;
    }(s[0].el, i.vnode.el, a)) {
      s = [];
      return;
    }
    s.forEach(e0), s.forEach(s0);
    let r = s.filter(n0);
    Il(i.vnode.el), r.forEach((l) => {
      let c = l.el, h = c.style;
      Xe(c, a), h.transform = h.webkitTransform = h.transitionDuration = "";
      let u = c[Ga] = (f) => {
        (!f || f.target === c) && (!f || f.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", u), c[Ga] = null, $s(c, a));
      };
      c.addEventListener("transitionend", u);
    }), s = [];
  }), () => {
    let a = xt(t), r = Ip(a), l = a.tag || ee;
    if (s = [], n) for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.el && h.el instanceof Element && (s.push(h), Ds(h, li(h, r, o, i)), zp.set(h, Up(h.el)));
    }
    n = e.default ? kr(e.default()) : [];
    for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.key != null && Ds(h, li(h, r, o, i));
    }
    return Et(l, null, n);
  };
} }, delete el.props.mode, el);
function e0(t) {
  let e = t.el;
  e[Ga] && e[Ga](), e[su] && e[su]();
}
function s0(t) {
  Gp.set(t, Up(t.el));
}
function n0(t) {
  let e = zp.get(t), s = Gp.get(t), n = e.left - s.left, i = e.top - s.top;
  if (n || i) {
    let o = t.el, a = o.style, r = o.getBoundingClientRect(), l = 1, c = 1;
    return o.offsetWidth && (l = r.width / o.offsetWidth), o.offsetHeight && (c = r.height / o.offsetHeight), Number.isFinite(l) && l !== 0 || (l = 1), Number.isFinite(c) && c !== 0 || (c = 1), 0.01 > Math.abs(l - 1) && (l = 1), 0.01 > Math.abs(c - 1) && (c = 1), a.transform = a.webkitTransform = `translate(${n / l}px,${i / c}px)`, a.transitionDuration = "0s", t;
  }
}
function Up(t) {
  let e = t.getBoundingClientRect();
  return { left: e.left, top: e.top };
}
let Ks = (t) => {
  let e = t.props["onUpdate:modelValue"] || !1;
  return st(e) ? (s) => ti(e, s) : e;
};
function i0(t) {
  t.target.composing = !0;
}
function nu(t) {
  let e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
let We = Symbol("_assign");
function iu(t, e, s) {
  return e && (t = t.trim()), s && (t = gr(t)), t;
}
let Ua = { created(t, { modifiers: { lazy: e, trim: s, number: n } }, i) {
  t[We] = Ks(i);
  let o = n || i.props && i.props.type === "number";
  bs(t, e ? "change" : "input", (a) => {
    a.target.composing || t[We](iu(t.value, s, o));
  }), (s || o) && bs(t, "change", () => {
    t.value = iu(t.value, s, o);
  }), e || (bs(t, "compositionstart", i0), bs(t, "compositionend", nu), bs(t, "change", nu));
}, mounted(t, { value: e }) {
  t.value = e ?? "";
}, beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: i, number: o } }, a) {
  if (t[We] = Ks(a), t.composing) return;
  let r = (o || t.type === "number") && !/^0\d/.test(t.value) ? gr(t.value) : t.value, l = e ?? "";
  if (r === l) return;
  let c = t.getRootNode();
  (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === t && t.type !== "range" && (n && e === s || i && t.value.trim() === l) || (t.value = l);
} }, jc = { deep: !0, created(t, e, s) {
  t[We] = Ks(s), bs(t, "change", () => {
    let n = t._modelValue, i = hi(t), o = t.checked, a = t[We];
    if (st(n)) {
      let r = yr(n, i), l = r !== -1;
      if (o && !l) a(n.concat(i));
      else if (!o && l) {
        let c = [...n];
        c.splice(r, 1), a(c);
      }
    } else {
      let r;
      if (r = n, Wt.call(r) === "[object Set]") {
        let l = new Set(n);
        o ? l.add(i) : l.delete(i), a(l);
      } else a(Yp(t, o));
    }
  });
}, mounted: ou, beforeUpdate(t, e, s) {
  t[We] = Ks(s), ou(t, e, s);
} };
function ou(t, { value: e, oldValue: s }, n) {
  let i;
  if (t._modelValue = e, st(e)) i = yr(e, n.props.value) > -1;
  else {
    let o;
    if (o = e, Wt.call(o) === "[object Set]") i = e.has(n.props.value);
    else {
      if (e === s) return;
      i = As(e, Yp(t, !0));
    }
  }
  t.checked !== i && (t.checked = i);
}
let Wc = { created(t, { value: e }, s) {
  t.checked = As(e, s.props.value), t[We] = Ks(s), bs(t, "change", () => {
    t[We](hi(t));
  });
}, beforeUpdate(t, { value: e, oldValue: s }, n) {
  t[We] = Ks(n), e !== s && (t.checked = As(e, n.props.value));
} }, qp = { deep: !0, created(t, { value: e, modifiers: { number: s } }, n) {
  let i, o = (i = e, Wt.call(i) === "[object Set]");
  bs(t, "change", () => {
    let a = Array.prototype.filter.call(t.options, (r) => r.selected).map((r) => s ? gr(hi(r)) : hi(r));
    t[We](t.multiple ? o ? new Set(a) : a : a[0]), t._assigning = !0, ri(() => {
      t._assigning = !1;
    });
  }), t[We] = Ks(n);
}, mounted(t, { value: e }) {
  au(t, e);
}, beforeUpdate(t, e, s) {
  t[We] = Ks(s);
}, updated(t, { value: e }) {
  t._assigning || au(t, e);
} };
function au(t, e) {
  let s, n = t.multiple, i = st(e);
  if (!n || i || (s = e, Wt.call(s) === "[object Set]")) {
    for (let o = 0, a = t.options.length; o < a; o++) {
      let r = t.options[o], l = hi(r);
      if (n) if (i) {
        let c = typeof l;
        c === "string" || c === "number" ? r.selected = e.some((h) => String(h) === String(l)) : r.selected = yr(e, l) > -1;
      } else r.selected = e.has(l);
      else if (As(hi(r), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    n || t.selectedIndex === -1 || (t.selectedIndex = -1);
  }
}
function hi(t) {
  return "_value" in t ? t._value : t.value;
}
function Yp(t, e) {
  let s = e ? "_trueValue" : "_falseValue";
  return s in t ? t[s] : e;
}
let Kp = { created(t, e, s) {
  qo(t, e, s, null, "created");
}, mounted(t, e, s) {
  qo(t, e, s, null, "mounted");
}, beforeUpdate(t, e, s, n) {
  qo(t, e, s, n, "beforeUpdate");
}, updated(t, e, s, n) {
  qo(t, e, s, n, "updated");
} };
function Jp(t, e) {
  switch (t) {
    case "SELECT":
      return qp;
    case "TEXTAREA":
      return Ua;
    default:
      switch (e) {
        case "checkbox":
          return jc;
        case "radio":
          return Wc;
        default:
          return Ua;
      }
  }
}
function qo(t, e, s, n, i) {
  let o = Jp(t.tagName, s.props && s.props.type)[i];
  o && o(t, e, s, n);
}
let o0 = ["ctrl", "shift", "alt", "meta"], a0 = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => o0.some((s) => t[`${s}Key`] && !e.includes(s)) }, r0 = (t, e) => {
  if (!t) return t;
  let s = t._withMods || (t._withMods = {}), n = e.join(".");
  return s[n] || (s[n] = (i, ...o) => {
    for (let a = 0; a < e.length; a++) {
      let r = a0[e[a]];
      if (r && r(i, e)) return;
    }
    return t(i, ...o);
  });
}, l0 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" }, c0 = (t, e) => {
  let s = t._withKeys || (t._withKeys = {}), n = e.join(".");
  return s[n] || (s[n] = (i) => {
    if (!("key" in i)) return;
    let o = Me(i.key);
    if (e.some((a) => a === o || l0[a] === o)) return t(i);
  });
}, Hc = gt({ patchProp: Wp }, Op), ru = !1;
function Xp() {
  return bn = ru ? bn : fp(Hc), ru = !0, bn;
}
let Zp = (...t) => {
  (bn || (bn = Ec(Hc))).render(...t);
}, h0 = (...t) => {
  Xp().hydrate(...t);
}, qa = (...t) => {
  let e = (bn || (bn = Ec(Hc))).createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = eg(n);
    if (!i) return;
    let o = e._component;
    at(o) || o.render || o.template || (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    let a = s(i, !1, tg(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), a;
  }, e;
}, Qp = (...t) => {
  let e = Xp().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = eg(n);
    if (i) return s(i, !0, tg(i));
  }, e;
};
function tg(t) {
  return t instanceof SVGElement ? "svg" : typeof MathMLElement == "function" && t instanceof MathMLElement ? "mathml" : void 0;
}
function eg(t) {
  return ct(t) ? document.querySelector(t) : t;
}
let lu = !1, u0 = () => {
  lu || (lu = !0, Ua.getSSRProps = ({ value: t }) => ({ value: t }), Wc.getSSRProps = ({ value: t }, e) => {
    if (e.props && As(e.props.value, t)) return { checked: !0 };
  }, jc.getSSRProps = ({ value: t }, e) => {
    if (st(t)) {
      if (e.props && yr(t, e.props.value) > -1) return { checked: !0 };
    } else {
      let s;
      if (s = t, Wt.call(s) === "[object Set]") {
        if (e.props && t.has(e.props.value)) return { checked: !0 };
      } else if (t) return { checked: !0 };
    }
  }, Kp.getSSRProps = (t, e) => {
    if (typeof e.type != "string") return;
    let s = Jp(e.type.toUpperCase(), e.props && e.props.type);
    if (s.getSSRProps) return s.getSSRProps(t, e);
  }, $p.getSSRProps = ({ value: t }) => {
    if (!t) return { style: { display: "none" } };
  });
};
var tl, el, cu, f0 = Object.freeze({ __proto__: null, BaseTransition: Ud, BaseTransitionPropsValidators: Mc, Comment: Ut, DeprecationTypes: zb, EffectScope: _c, ErrorCodes: Ty, ErrorTypeStrings: Bb, Fragment: ee, KeepAlive: Jy, ReactiveEffect: so, Static: vn, Suspense: Ab, Teleport: By, Text: qs, TrackOpTypes: ky, Transition: Gb, TransitionGroup: t0, TriggerOpTypes: My, VueElement: Dr, assertNumber: Py, callWithAsyncErrorHandling: He, callWithErrorHandling: yi, camelize: Tt, capitalize: Fn, cloneVNode: as, compatUtils: Vb, computed: Pp, createApp: qa, createBlock: Va, createCommentVNode: xp, createElementBlock: Pb, createElementVNode: Nc, createHydrationRenderer: fp, createPropsRestProxy: mb, createRenderer: Ec, createSSRApp: Qp, createSlots: eb, createStaticVNode: Db, createTextVNode: Bc, createVNode: Et, customRef: Od, defineAsyncComponent: Ky, defineComponent: Ac, defineCustomElement: Hp, defineEmits: ab, defineExpose: rb, defineModel: hb, defineOptions: lb, defineProps: ob, defineSSRCustomElement: Jb, defineSlots: cb, devtools: $b, effect: ty, effectScope: Zm, getCurrentInstance: ve, getCurrentScope: gd, getCurrentWatcher: Ay, getTransitionRawChildren: kr, guardReactiveProps: _p, h: Tp, handleError: En, hasInjectionContext: Fy, hydrate: h0, hydrateOnIdle: Gy, hydrateOnInteraction: Yy, hydrateOnMediaQuery: qy, hydrateOnVisible: Uy, initCustomFormatter: Eb, initDirectivesForSSR: u0, inject: Gi, isMemoSame: Dp, isProxy: Ao, isReactive: Cs, isReadonly: os, isRef: Jt, isRuntimeOnly: Ob, isShallow: Te, isVNode: Rs, markRaw: Dd, mergeDefaults: pb, mergeModels: gb, mergeProps: vp, nextTick: ri, nodeOps: Op, normalizeClass: Mo, normalizeProps: Um, normalizeStyle: ko, onActivated: Yd, onBeforeMount: Xd, onBeforeUnmount: Ar, onBeforeUpdate: Tc, onDeactivated: Kd, onErrorCaptured: ep, onMounted: Ro, onRenderTracked: tp, onRenderTriggered: Qd, onScopeDispose: Qm, onServerPrefetch: Zd, onUnmounted: Pr, onUpdated: Mr, onWatcherCleanup: Ed, openBlock: lo, patchProp: Wp, popScopeId: Ry, provide: Bd, proxyRefs: Sc, pushScopeId: Dy, queuePostFlushCb: oo, reactive: Sr, readonly: Fa, ref: Vi, registerRuntimeCompiler: kp, render: Zp, renderList: tb, renderSlot: sb, resolveComponent: Xy, resolveDirective: Qy, resolveDynamicComponent: Zy, resolveFilter: Hb, resolveTransitionHooks: li, setBlockTracking: co, setDevtoolsHook: jb, setTransitionHooks: Ds, shallowReactive: Td, shallowReadonly: gy, shallowRef: Rd, ssrContextKey: $d, ssrUtils: Wb, stop: ey, toDisplayString: dd, toHandlerKey: Qn, toHandlers: nb, toRaw: xt, toRef: wy, toRefs: vy, toValue: by, transformVNodeArgs: Tb, triggerRef: yy, unref: Po, useAttrs: db, useCssModule: Qb, useCssVars: qb, useHost: Vp, useId: $y, useModel: xb, useSSRContext: jd, useShadowRoot: Zb, useSlots: fb, useTemplateRef: jy, useTransitionState: kc, vModelCheckbox: jc, vModelDynamic: Kp, vModelRadio: Wc, vModelSelect: qp, vModelText: Ua, vShow: $p, version: Rp, warn: Nb, watch: ii, watchEffect: Ey, watchPostEffect: Iy, watchSyncEffect: Wd, withAsyncContext: yb, withCtx: Cc, withDefaults: ub, withDirectives: Oy, withKeys: c0, withMemo: Ib, withModifiers: r0, withScopeId: Ly });
let uo = Symbol(""), Ki = Symbol(""), Vc = Symbol(""), Ya = Symbol(""), sg = Symbol(""), Pn = Symbol(""), Tn = Symbol(""), Dn = Symbol(""), Js = Symbol(""), Xs = Symbol(""), Oo = Symbol(""), zc = Symbol(""), ng = Symbol(""), Gc = Symbol(""), Nl = Symbol(""), Uc = Symbol(""), d0 = Symbol(""), qc = Symbol(""), Yc = Symbol(""), ig = Symbol(""), og = Symbol(""), Rr = Symbol(""), Ka = Symbol(""), Kc = Symbol(""), Jc = Symbol(""), fo = Symbol(""), Fo = Symbol(""), Xc = Symbol(""), Bl = Symbol(""), p0 = Symbol(""), $l = Symbol(""), Ja = Symbol(""), g0 = Symbol(""), m0 = Symbol(""), Zc = Symbol(""), y0 = Symbol(""), b0 = Symbol(""), Qc = Symbol(""), ag = Symbol(""), ui = { [uo]: "Fragment", [Ki]: "Teleport", [Vc]: "Suspense", [Ya]: "KeepAlive", [sg]: "BaseTransition", [Pn]: "openBlock", [Tn]: "createBlock", [Dn]: "createElementBlock", [Js]: "createVNode", [Xs]: "createElementVNode", [Oo]: "createCommentVNode", [zc]: "createTextVNode", [ng]: "createStaticVNode", [Gc]: "resolveComponent", [Nl]: "resolveDynamicComponent", [Uc]: "resolveDirective", [d0]: "resolveFilter", [qc]: "withDirectives", [Yc]: "renderList", [ig]: "renderSlot", [og]: "createSlots", [Rr]: "toDisplayString", [Ka]: "mergeProps", [Kc]: "normalizeClass", [Jc]: "normalizeStyle", [fo]: "normalizeProps", [Fo]: "guardReactiveProps", [Xc]: "toHandlers", [Bl]: "camelize", [p0]: "capitalize", [$l]: "toHandlerKey", [Ja]: "setBlockTracking", [g0]: "pushScopeId", [m0]: "popScopeId", [Zc]: "withCtx", [y0]: "unref", [b0]: "isRef", [Qc]: "withMemo", [ag]: "isMemoSame" }, Fe = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
function po(t, e, s, n, i, o, a, r = !1, l = !1, c = !1, h = Fe) {
  var u, f, p, d;
  return t && (r ? (t.helper(Pn), t.helper((u = t.inSSR, f = c, u || f ? Tn : Dn))) : t.helper((p = t.inSSR, d = c, p || d ? Js : Xs)), a && t.helper(qc)), { type: 13, tag: e, props: s, children: n, patchFlag: i, dynamicProps: o, directives: a, isBlock: r, disableTracking: l, isComponent: c, loc: h };
}
function Sn(t, e = Fe) {
  return { type: 17, loc: e, elements: t };
}
function je(t, e = Fe) {
  return { type: 15, loc: e, properties: t };
}
function Kt(t, e) {
  return { type: 16, loc: Fe, key: ct(t) ? dt(t, !0) : t, value: e };
}
function dt(t, e = !1, s = Fe, n = 0) {
  return { type: 4, loc: s, content: t, isStatic: e, constType: e ? 3 : n };
}
function qe(t, e = Fe) {
  return { type: 8, loc: e, children: t };
}
function Xt(t, e = [], s = Fe) {
  return { type: 14, loc: s, callee: t, arguments: e };
}
function fi(t, e, s = !1, n = !1, i = Fe) {
  return { type: 18, params: t, returns: e, newline: s, isSlot: n, loc: i };
}
function jl(t, e, s, n = !0) {
  return { type: 19, test: t, consequent: e, alternate: s, newline: n, loc: Fe };
}
function th(t, { helper: e, removeHelper: s, inSSR: n }) {
  if (!t.isBlock) {
    var i, o;
    t.isBlock = !0, s((i = t.isComponent, n || i ? Js : Xs)), e(Pn), e((o = t.isComponent, n || o ? Tn : Dn));
  }
}
let hu = new Uint8Array([123, 123]), uu = new Uint8Array([125, 125]);
function fu(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function Re(t) {
  return t === 32 || t === 10 || t === 9 || t === 12 || t === 13;
}
function Is(t) {
  return t === 47 || t === 62 || Re(t);
}
function Xa(t) {
  let e = new Uint8Array(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}
let re = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
function Wl(t) {
  throw t;
}
function rg(t) {
}
function Pt(t, e, s, n) {
  let i = SyntaxError(`https://vuejs.org/error-reference/#compiler-${t}`);
  return i.code = t, i.loc = e, i;
}
let Pe = (t) => t.type === 4 && t.isStatic;
function lg(t) {
  switch (t) {
    case "Teleport":
    case "teleport":
      return Ki;
    case "Suspense":
    case "suspense":
      return Vc;
    case "KeepAlive":
    case "keep-alive":
      return Ya;
    case "BaseTransition":
    case "base-transition":
      return sg;
  }
}
let Hl = /^$|^\d|[^\$\w\xA0-\uFFFF]/, cg = /[A-Za-z_$\xA0-\uFFFF]/, _0 = /[\.\?\w$\xA0-\uFFFF]/, x0 = /\s+[.[]\s*|\s*[.[]\s+/g, hg = (t) => t.type === 4 ? t.content : t.loc.source, ug = (t) => {
  let e = hg(t).trim().replace(x0, (r) => r.trim()), s = 0, n = [], i = 0, o = 0, a = null;
  for (let r = 0; r < e.length; r++) {
    let l = e.charAt(r);
    switch (s) {
      case 0:
        if (l === "[") n.push(s), s = 1, i++;
        else if (l === "(") n.push(s), s = 2, o++;
        else if (!(r === 0 ? cg : _0).test(l)) return !1;
        break;
      case 1:
        l === "'" || l === '"' || l === "`" ? (n.push(s), s = 3, a = l) : l === "[" ? i++ : l !== "]" || --i || (s = n.pop());
        break;
      case 2:
        if (l === "'" || l === '"' || l === "`") n.push(s), s = 3, a = l;
        else if (l === "(") o++;
        else if (l === ")") {
          if (r === e.length - 1) return !1;
          --o || (s = n.pop());
        }
        break;
      case 3:
        l === a && (s = n.pop(), a = null);
    }
  }
  return !i && !o;
}, v0 = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
function $e(t, e, s = !1) {
  for (let n = 0; n < t.props.length; n++) {
    let i = t.props[n];
    if (i.type === 7 && (s || i.exp) && (ct(e) ? i.name === e : e.test(i.name))) return i;
  }
}
function Lr(t, e, s = !1, n = !1) {
  for (let i = 0; i < t.props.length; i++) {
    let o = t.props[i];
    if (o.type === 6) {
      if (s) continue;
      if (o.name === e && (o.value || n)) return o;
    } else if (o.name === "bind" && (o.exp || n) && Kn(o.arg, e)) return o;
  }
}
function Kn(t, e) {
  return !!(t && Pe(t) && t.content === e);
}
function sl(t) {
  return t.type === 5 || t.type === 2;
}
function du(t) {
  return t.type === 7 && t.name === "pre";
}
function S0(t) {
  return t.type === 7 && t.name === "slot";
}
function Za(t) {
  return t.type === 1 && t.tagType === 3;
}
function Qa(t) {
  return t.type === 1 && t.tagType === 2;
}
let w0 = /* @__PURE__ */ new Set([fo, Fo]);
function tr(t, e, s) {
  let n, i, o = t.type === 13 ? t.props : t.arguments[2], a = [];
  if (o && !ct(o) && o.type === 14) {
    let r = function l(c, h = []) {
      if (c && !ct(c) && c.type === 14) {
        let u = c.callee;
        if (!ct(u) && w0.has(u)) return l(c.arguments[0], h.concat(c));
      }
      return [c, h];
    }(o);
    o = r[0], i = (a = r[1])[a.length - 1];
  }
  if (o == null || ct(o)) n = je([e]);
  else if (o.type === 14) {
    let r = o.arguments[0];
    ct(r) || r.type !== 15 ? o.callee === Xc ? n = Xt(s.helper(Ka), [je([e]), o]) : o.arguments.unshift(je([e])) : pu(e, r) || r.properties.unshift(e), n || (n = o);
  } else o.type === 15 ? (pu(e, o) || o.properties.unshift(e), n = o) : (n = Xt(s.helper(Ka), [je([e]), o]), i && i.callee === Fo && (i = a[a.length - 2]));
  t.type === 13 ? i ? i.arguments[0] = n : t.props = n : i ? i.arguments[0] = n : t.arguments[2] = n;
}
function pu(t, e) {
  let s = !1;
  if (t.key.type === 4) {
    let n = t.key.content;
    s = e.properties.some((i) => i.key.type === 4 && i.key.content === n);
  }
  return s;
}
function Vl(t, e) {
  return `_${e}_${t.replace(/[^\w]/g, (s, n) => s === "-" ? "_" : t.charCodeAt(n).toString())}`;
}
let C0 = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function fg(t) {
  for (let e = 0; e < t.length; e++) if (!Re(t.charCodeAt(e))) return !1;
  return !0;
}
function eh(t) {
  return t.type === 2 && fg(t.content) || t.type === 12 && eh(t.content);
}
function dg(t) {
  return t.type === 3 || eh(t);
}
let pg = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: () => 0, isVoidTag: Un, isPreTag: Un, isIgnoreNewlineTag: Un, isCustomElement: Un, onError: Wl, onWarn: rg, comments: !1, prefixIdentifiers: !1 }, Lt = pg, er = null, Ms = "", he = null, Ct = null, De = "", cs = -1, un = -1, sh = 0, pn = !1, zl = null, Bt = [], Gt = new class {
  constructor(t, e) {
    this.stack = t, this.cbs = e, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = hu, this.delimiterClose = uu, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = hu, this.delimiterClose = uu;
  }
  getPos(t) {
    let e = 1, s = t + 1, n = this.newlines.length, i = -1;
    if (n > 100) {
      let o = -1, a = n;
      for (; o + 1 < a; ) {
        let r = o + a >>> 1;
        this.newlines[r] < t ? o = r : a = r;
      }
      i = o;
    } else for (let o = n - 1; o >= 0; o--) if (t > this.newlines[o]) {
      i = o;
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
      e !== "template" && this.enterRCDATA(Xa("</" + e), 0), this.handleTagName(t);
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
}(Bt, { onerr: yu, ontext(t, e) {
  Yo(le(t, e), t, e);
}, ontextentity(t, e, s) {
  Yo(t, e, s);
}, oninterpolation(t, e) {
  if (pn) return Yo(le(t, e), t, e);
  let s = t + Gt.delimiterOpen.length, n = e - Gt.delimiterClose.length;
  for (; Re(Ms.charCodeAt(s)); ) s++;
  for (; Re(Ms.charCodeAt(n - 1)); ) n--;
  let i = le(s, n);
  i.includes("&") && (i = Lt.decodeEntities(i, !1)), Gl({ type: 5, content: Ko(i, !1, zt(s, n)), loc: zt(t, e) });
}, onopentagname(t, e) {
  let s = le(t, e);
  he = { type: 1, tag: s, ns: Lt.getNamespace(s, Bt[0], Lt.ns), tagType: 0, props: [], children: [], loc: zt(t - 1, e), codegenNode: void 0 };
}, onopentagend(t) {
  mu(t);
}, onclosetag(t, e) {
  let s = le(t, e);
  if (!Lt.isVoidTag(s)) {
    let n = !1;
    for (let i = 0; i < Bt.length; i++) if (Bt[i].tag.toLowerCase() === s.toLowerCase()) {
      n = !0, i > 0 && Bt[0].loc.start.offset;
      for (let o = 0; o <= i; o++) xa(Bt.shift(), e, o < i);
      break;
    }
    n || gg(t, 60);
  }
}, onselfclosingtag(t) {
  let e = he.tag;
  he.isSelfClosing = !0, mu(t), Bt[0] && Bt[0].tag === e && xa(Bt.shift(), t);
}, onattribname(t, e) {
  Ct = { type: 6, name: le(t, e), nameLoc: zt(t, e), value: void 0, loc: zt(t) };
}, ondirname(t, e) {
  let s = le(t, e), n = s === "." || s === ":" ? "bind" : s === "@" ? "on" : s === "#" ? "slot" : s.slice(2);
  if (pn || n === "") Ct = { type: 6, name: s, nameLoc: zt(t, e), value: void 0, loc: zt(t) };
  else if (Ct = { type: 7, name: n, rawName: s, exp: void 0, arg: void 0, modifiers: s === "." ? [dt("prop")] : [], loc: zt(t) }, n === "pre") {
    pn = Gt.inVPre = !0, zl = he;
    let i = he.props;
    for (let o = 0; o < i.length; o++) i[o].type === 7 && (i[o] = function(a) {
      let r = { type: 6, name: a.rawName, nameLoc: zt(a.loc.start.offset, a.loc.start.offset + a.rawName.length), value: void 0, loc: a.loc };
      if (a.exp) {
        let l = a.exp.loc;
        l.end.offset < a.loc.end.offset && (l.start.offset--, l.start.column--, l.end.offset++, l.end.column++), r.value = { type: 2, content: a.exp.content, loc: l };
      }
      return r;
    }(i[o]));
  }
}, ondirarg(t, e) {
  if (t === e) return;
  let s = le(t, e);
  if (pn && !du(Ct)) Ct.name += s, gn(Ct.nameLoc, e);
  else {
    let n = s[0] !== "[";
    Ct.arg = Ko(n ? s : s.slice(1, -1), n, zt(t, e), 3 * !!n);
  }
}, ondirmodifier(t, e) {
  let s = le(t, e);
  if (pn && !du(Ct)) Ct.name += "." + s, gn(Ct.nameLoc, e);
  else if (Ct.name === "slot") {
    let n = Ct.arg;
    n && (n.content += "." + s, gn(n.loc, e));
  } else {
    let n = dt(s, !0, zt(t, e));
    Ct.modifiers.push(n);
  }
}, onattribdata(t, e) {
  De += le(t, e), cs < 0 && (cs = t), un = e;
}, onattribentity(t, e, s) {
  De += t, cs < 0 && (cs = e), un = s;
}, onattribnameend(t) {
  let e = le(Ct.loc.start.offset, t);
  Ct.type === 7 && (Ct.rawName = e), he.props.some((s) => (s.type === 7 ? s.rawName : s.name) === e);
}, onattribend(t, e) {
  he && Ct && (gn(Ct.loc, e), t !== 0 && (De.includes("&") && (De = Lt.decodeEntities(De, !0)), Ct.type === 6 ? (Ct.name === "class" && (De = yg(De).trim()), Ct.value = { type: 2, content: De, loc: t === 1 ? zt(cs, un) : zt(cs - 1, un + 1) }, Gt.inSFCRoot && he.tag === "template" && Ct.name === "lang" && De && De !== "html" && Gt.enterRCDATA(Xa("</template"), 0)) : (Ct.exp = Ko(De, !1, zt(cs, un), 0, 0), Ct.name === "for" && (Ct.forParseResult = function(s) {
    let n = s.loc, i = s.content, o = i.match(C0);
    if (!o) return;
    let [, a, r] = o, l = (p, d, g = !1) => {
      let m = n.start.offset + d, _ = m + p.length;
      return Ko(p, !1, zt(m, _), 0, +!!g);
    }, c = { source: l(r.trim(), i.indexOf(r, a.length)), value: void 0, key: void 0, index: void 0, finalized: !1 }, h = a.trim().replace(k0, "").trim(), u = a.indexOf(h), f = h.match(gu);
    if (f) {
      let p;
      h = h.replace(gu, "").trim();
      let d = f[1].trim();
      if (d && (p = i.indexOf(d, u + h.length), c.key = l(d, p, !0)), f[2]) {
        let g = f[2].trim();
        g && (c.index = l(g, i.indexOf(g, c.key ? p + d.length : u + h.length), !0));
      }
    }
    return h && (c.value = l(h, u, !0)), c;
  }(Ct.exp)))), (Ct.type !== 7 || Ct.name !== "pre") && he.props.push(Ct)), De = "", cs = un = -1;
}, oncomment(t, e) {
  Lt.comments && Gl({ type: 3, content: le(t, e), loc: zt(t - 4, e + 3) });
}, onend() {
  let t = Ms.length;
  for (let e = 0; e < Bt.length; e++) xa(Bt[e], t - 1), Bt[e].loc.start.offset;
}, oncdata(t, e) {
  Bt[0].ns !== 0 && Yo(le(t, e), t, e);
}, onprocessinginstruction(t) {
  (Bt[0] ? Bt[0].ns : Lt.ns) === 0 && yu(21, t - 1);
} }), gu = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, k0 = /^\(|\)$/g;
function le(t, e) {
  return Ms.slice(t, e);
}
function mu(t) {
  Gt.inSFCRoot && (he.innerLoc = zt(t + 1, t + 1)), Gl(he);
  let { tag: e, ns: s } = he;
  s === 0 && Lt.isPreTag(e) && sh++, Lt.isVoidTag(e) ? xa(he, t) : (Bt.unshift(he), (s === 1 || s === 2) && (Gt.inXML = !0)), he = null;
}
function Yo(t, e, s) {
  {
    let o = Bt[0] && Bt[0].tag;
    o !== "script" && o !== "style" && t.includes("&") && (t = Lt.decodeEntities(t, !1));
  }
  let n = Bt[0] || er, i = n.children[n.children.length - 1];
  i && i.type === 2 ? (i.content += t, gn(i.loc, s)) : n.children.push({ type: 2, content: t, loc: zt(e, s) });
}
function xa(t, e, s = !1) {
  s ? gn(t.loc, gg(e, 60)) : gn(t.loc, function(a) {
    let r = a;
    for (; Ms.charCodeAt(r) !== 62 && r < Ms.length - 1; ) r++;
    return r;
  }(e) + 1), Gt.inSFCRoot && (t.children.length ? t.innerLoc.end = gt({}, t.children[t.children.length - 1].loc.end) : t.innerLoc.end = gt({}, t.innerLoc.start), t.innerLoc.source = le(t.innerLoc.start.offset, t.innerLoc.end.offset));
  let { tag: n, ns: i, children: o } = t;
  if (!pn && (n === "slot" ? t.tagType = 2 : function({ tag: a, props: r }) {
    if (a === "template") {
      for (let l = 0; l < r.length; l++) if (r[l].type === 7 && M0.has(r[l].name)) return !0;
    }
    return !1;
  }(t) ? t.tagType = 3 : function({ tag: a, props: r }) {
    var l;
    if (Lt.isCustomElement(a)) return !1;
    if (a === "component" || (l = a.charCodeAt(0)) > 64 && l < 91 || lg(a) || Lt.isBuiltInComponent && Lt.isBuiltInComponent(a) || Lt.isNativeTag && !Lt.isNativeTag(a)) return !0;
    for (let c = 0; c < r.length; c++) {
      let h = r[c];
      if (h.type === 6 && h.name === "is" && h.value && h.value.content.startsWith("vue:")) return !0;
    }
    return !1;
  }(t) && (t.tagType = 1)), Gt.inRCDATA || (t.children = mg(o)), i === 0 && Lt.isIgnoreNewlineTag(n)) {
    let a = o[0];
    a && a.type === 2 && (a.content = a.content.replace(/^\r?\n/, ""));
  }
  i === 0 && Lt.isPreTag(n) && sh--, zl === t && (pn = Gt.inVPre = !1, zl = null), Gt.inXML && (Bt[0] ? Bt[0].ns : Lt.ns) === 0 && (Gt.inXML = !1);
}
function gg(t, e) {
  let s = t;
  for (; Ms.charCodeAt(s) !== e && s >= 0; ) s--;
  return s;
}
let M0 = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]), A0 = /\r\n/g;
function mg(t) {
  let e = Lt.whitespace !== "preserve", s = !1;
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    if (i.type === 2) if (sh) i.content = i.content.replace(A0, `
`);
    else if (fg(i.content)) {
      let o = t[n - 1] && t[n - 1].type, a = t[n + 1] && t[n + 1].type;
      !o || !a || e && (o === 3 && (a === 3 || a === 1) || o === 1 && (a === 3 || a === 1 && function(r) {
        for (let l = 0; l < r.length; l++) {
          let c = r.charCodeAt(l);
          if (c === 10 || c === 13) return !0;
        }
        return !1;
      }(i.content))) ? (s = !0, t[n] = null) : i.content = " ";
    } else e && (i.content = yg(i.content));
  }
  return s ? t.filter(Boolean) : t;
}
function yg(t) {
  let e = "", s = !1;
  for (let n = 0; n < t.length; n++) Re(t.charCodeAt(n)) ? s || (e += " ", s = !0) : (e += t[n], s = !1);
  return e;
}
function Gl(t) {
  (Bt[0] || er).children.push(t);
}
function zt(t, e) {
  return { start: Gt.getPos(t), end: e == null ? e : Gt.getPos(e), source: e == null ? e : le(t, e) };
}
function gn(t, e) {
  t.end = Gt.getPos(e), t.source = le(t.start.offset, e);
}
function Ko(t, e = !1, s, n = 0, i = 0) {
  return dt(t, e, s, n);
}
function yu(t, e, s) {
  Lt.onError(Pt(t, zt(e, e)));
}
function bu(t) {
  let e = t.children.filter((s) => s.type !== 3);
  return e.length !== 1 || e[0].type !== 1 || Qa(e[0]) ? null : e[0];
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
        let h = 3, u = bg(t, e);
        if (u === 0) return s.set(t, 0), 0;
        u < h && (h = u);
        for (let f = 0; f < t.children.length; f++) {
          let p = Oe(t.children[f], e);
          if (p === 0) return s.set(t, 0), 0;
          p < h && (h = p);
        }
        if (h > 1) for (let f = 0; f < t.props.length; f++) {
          let p = t.props[f];
          if (p.type === 7 && p.name === "bind" && p.exp) {
            let d = Oe(p.exp, e);
            if (d === 0) return s.set(t, 0), 0;
            d < h && (h = d);
          }
        }
        if (l.isBlock) {
          var n, i, o, a;
          for (let f = 0; f < t.props.length; f++) if (t.props[f].type === 7) return s.set(t, 0), 0;
          e.removeHelper(Pn), e.removeHelper((n = e.inSSR, i = l.isComponent, n || i ? Tn : Dn)), l.isBlock = !1, e.helper((o = e.inSSR, a = l.isComponent, o || a ? Js : Xs));
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
        let f = Oe(u, e);
        if (f === 0) return 0;
        f < c && (c = f);
      }
      return c;
    case 20:
      return 2;
  }
}
let P0 = /* @__PURE__ */ new Set([Kc, Jc, fo, Fo]);
function bg(t, e) {
  let s = 3, n = _g(t);
  if (n && n.type === 15) {
    let { properties: i } = n;
    for (let o = 0; o < i.length; o++) {
      let a, { key: r, value: l } = i[o], c = Oe(r, e);
      if (c === 0) return c;
      if (c < s && (s = c), (a = l.type === 4 ? Oe(l, e) : l.type === 14 ? function h(u, f) {
        if (u.type === 14 && !ct(u.callee) && P0.has(u.callee)) {
          let p = u.arguments[0];
          if (p.type === 4) return Oe(p, f);
          if (p.type === 14) return h(p, f);
        }
        return 0;
      }(l, e) : 0) === 0) return a;
      a < s && (s = a);
    }
  }
  return s;
}
function _g(t) {
  let e = t.codegenNode;
  if (e.type === 13) return e.props;
}
function sr(t, e) {
  e.currentNode = t;
  let { nodeTransforms: s } = e, n = [];
  for (let a = 0; a < s.length; a++) {
    let r = s[a](t, e);
    if (r && (st(r) ? n.push(...r) : n.push(r)), !e.currentNode) return;
    t = e.currentNode;
  }
  switch (t.type) {
    case 3:
      e.ssr || e.helper(Oo);
      break;
    case 5:
      e.ssr || e.helper(Rr);
      break;
    case 9:
      for (let l = 0; l < t.branches.length; l++) sr(t.branches[l], e);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      var i = t;
      let a = 0, r = () => {
        a--;
      };
      for (; a < i.children.length; a++) {
        let l = i.children[a];
        ct(l) || (e.grandParent = e.parent, e.parent = i, e.childIndex = a, e.onNodeRemoved = r, sr(l, e));
      }
  }
  e.currentNode = t;
  let o = n.length;
  for (; o--; ) n[o]();
}
function xg(t, e) {
  let s = ct(t) ? (n) => n === t : (n) => t.test(n);
  return (n, i) => {
    if (n.type === 1) {
      let { props: o } = n;
      if (n.tagType === 3 && o.some(S0)) return;
      let a = [];
      for (let r = 0; r < o.length; r++) {
        let l = o[r];
        if (l.type === 7 && s(l.name)) {
          o.splice(r, 1), r--;
          let c = e(n, l, i);
          c && a.push(c);
        }
      }
      return a;
    }
  };
}
let Jo = "/*@__PURE__*/", _u = (t) => `${ui[t]}: _${ui[t]}`;
function xu(t, e, { helper: s, push: n, newline: i, isTS: o }) {
  let a = s(e === "component" ? Gc : Uc);
  for (let r = 0; r < t.length; r++) {
    let l = t[r], c = l.endsWith("__self");
    c && (l = l.slice(0, -6)), n(`const ${Vl(l, e)} = ${a}(${JSON.stringify(l)}${c ? ", true" : ""})${o ? "!" : ""}`), r < t.length - 1 && i();
  }
}
function Ul(t, e) {
  let s = t.length > 3;
  e.push("["), s && e.indent(), Fi(t, e, s), s && e.deindent(), e.push("]");
}
function Fi(t, e, s = !1, n = !0) {
  let { push: i, newline: o } = e;
  for (let a = 0; a < t.length; a++) {
    let r = t[a];
    ct(r) ? i(r, -3) : st(r) ? Ul(r, e) : _e(r, e), a < t.length - 1 && (s ? (n && i(","), o()) : n && i(", "));
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
      vu(t, e);
      break;
    case 5:
      (function(o, a) {
        let { push: r, helper: l, pure: c } = a;
        c && r(Jo), r(`${l(Rr)}(`), _e(o.content, a), r(")");
      })(t, e);
      break;
    case 8:
      Su(t, e);
      break;
    case 3:
      (function(o, a) {
        let { push: r, helper: l, pure: c } = a;
        c && r(Jo), r(`${l(Oo)}(${JSON.stringify(o.content)})`, -3, o);
      })(t, e);
      break;
    case 13:
      (function(o, a) {
        var r, l;
        let c, { push: h, helper: u, pure: f } = a, { tag: p, props: d, children: g, patchFlag: m, dynamicProps: _, directives: y, isBlock: b, disableTracking: x, isComponent: v } = o;
        m && (c = String(m)), y && h(u(qc) + "("), b && h(`(${u(Pn)}(${x ? "true" : ""}), `), f && h(Jo), h(u(b ? (r = a.inSSR, r || v ? Tn : Dn) : (l = a.inSSR, l || v ? Js : Xs)) + "(", -2, o), Fi(function(k) {
          let S = k.length;
          for (; S-- && k[S] == null; ) ;
          return k.slice(0, S + 1).map((C) => C || "null");
        }([p, d, g, c, _]), a), h(")"), b && h(")"), y && (h(", "), _e(y, a), h(")"));
      })(t, e);
      break;
    case 14:
      (function(o, a) {
        let { push: r, helper: l, pure: c } = a, h = ct(o.callee) ? o.callee : l(o.callee);
        c && r(Jo), r(h + "(", -2, o), Fi(o.arguments, a), r(")");
      })(t, e);
      break;
    case 15:
      (function(o, a) {
        let { push: r, indent: l, deindent: c, newline: h } = a, { properties: u } = o;
        if (!u.length) return r("{}", -2, o);
        let f = u.length > 1;
        r(f ? "{" : "{ "), f && l();
        for (let p = 0; p < u.length; p++) {
          let { key: d, value: g } = u[p];
          (function(m, _) {
            let { push: y } = _;
            if (m.type === 8) y("["), Su(m, _), y("]");
            else if (m.isStatic) {
              let b;
              y((b = m.content, Hl.test(b) ? JSON.stringify(m.content) : m.content), -2, m);
            } else y(`[${m.content}]`, -3, m);
          })(d, a), r(": "), _e(g, a), p < u.length - 1 && (r(","), h());
        }
        f && c(), r(f ? "}" : " }");
      })(t, e);
      break;
    case 17:
      n = t, i = e, Ul(n.elements, i);
      break;
    case 18:
      (function(o, a) {
        let { push: r, indent: l, deindent: c } = a, { params: h, returns: u, body: f, newline: p, isSlot: d } = o;
        d && r(`_${ui[Zc]}(`), r("(", -2, o), st(h) ? Fi(h, a) : h && _e(h, a), r(") => "), (p || f) && (r("{"), l()), u ? (p && r("return "), st(u) ? Ul(u, a) : _e(u, a)) : f && _e(f, a), (p || f) && (c(), r("}")), d && r(")");
      })(t, e);
      break;
    case 19:
      (function(o, a) {
        let { test: r, consequent: l, alternate: c, newline: h } = o, { push: u, indent: f, deindent: p, newline: d } = a;
        if (r.type === 4) {
          let m, _ = (m = r.content, !!Hl.test(m));
          _ && u("("), vu(r, a), _ && u(")");
        } else u("("), _e(r, a), u(")");
        h && f(), a.indentLevel++, h || u(" "), u("? "), _e(l, a), a.indentLevel--, h && d(), h || u(" "), u(": ");
        let g = c.type === 19;
        !g && a.indentLevel++, _e(c, a), !g && a.indentLevel--, h && p(!0);
      })(t, e);
      break;
    case 20:
      (function(o, a) {
        let { push: r, helper: l, indent: c, deindent: h, newline: u } = a, { needPauseTracking: f, needArraySpread: p } = o;
        p && r("[...("), r(`_cache[${o.index}] || (`), f && (c(), r(`${l(Ja)}(-1`), o.inVOnce && r(", true"), r("),"), u(), r("(")), r(`_cache[${o.index}] = `), _e(o.value, a), f && (r(`).cacheIndex = ${o.index},`), u(), r(`${l(Ja)}(1),`), u(), r(`_cache[${o.index}]`), h()), r(")"), p && r(")]");
      })(t, e);
      break;
    case 21:
      Fi(t.body, e, !0, !1);
  }
}
function vu(t, e) {
  let { content: s, isStatic: n } = t;
  e.push(n ? JSON.stringify(s) : s, -3, t);
}
function Su(t, e) {
  for (let s = 0; s < t.children.length; s++) {
    let n = t.children[s];
    ct(n) ? e.push(n, -3) : _e(n, e);
  }
}
let T0 = xg(/^(?:if|else|else-if)$/, (t, e, s) => function(n, i, o, a) {
  if (i.name !== "else" && (!i.exp || !i.exp.content.trim())) {
    let l = i.exp ? i.exp.loc : n.loc;
    o.onError(Pt(28, i.loc)), i.exp = dt("true", !1, l);
  }
  if (i.name === "if") {
    var r;
    let l = wu(n, i), c = { type: 9, loc: zt((r = n.loc).start.offset, r.end.offset), branches: [l] };
    if (o.replaceNode(c), a) return a(c, l, !0);
  } else {
    let l = o.parent.children, c = l.indexOf(n);
    for (; c-- >= -1; ) {
      let h = l[c];
      if (h && dg(h)) {
        o.removeNode(h);
        continue;
      }
      if (h && h.type === 9) {
        (i.name === "else-if" || i.name === "else") && h.branches[h.branches.length - 1].condition === void 0 && o.onError(Pt(30, n.loc)), o.removeNode();
        let u = wu(n, i);
        h.branches.push(u);
        let f = a && a(h, u, !1);
        sr(u, o), f && f(), o.currentNode = null;
      } else o.onError(Pt(30, n.loc));
      break;
    }
  }
}(t, e, s, (n, i, o) => {
  let a = s.parent.children, r = a.indexOf(n), l = 0;
  for (; r-- >= 0; ) {
    let c = a[r];
    c && c.type === 9 && (l += c.branches.length);
  }
  return () => {
    o ? n.codegenNode = Cu(i, l, s) : function(c) {
      for (; ; ) if (c.type === 19) {
        if (c.alternate.type !== 19) return c;
        c = c.alternate;
      } else c.type === 20 && (c = c.value);
    }(n.codegenNode).alternate = Cu(i, l + n.branches.length - 1, s);
  };
}));
function wu(t, e) {
  let s = t.tagType === 3;
  return { type: 10, loc: t.loc, condition: e.name === "else" ? void 0 : e.exp, children: s && !$e(t, "for") ? t.children : [t], userKey: Lr(t, "key"), isTemplateIf: s };
}
function Cu(t, e, s) {
  return t.condition ? jl(t.condition, ku(t, e, s), Xt(s.helper(Oo), ['""', "true"])) : ku(t, e, s);
}
function ku(t, e, s) {
  let { helper: n } = s, i = Kt("key", dt(`${e}`, !1, Fe, 2)), { children: o } = t, a = o[0];
  if (o.length !== 1 || a.type !== 1) {
    if (o.length !== 1 || a.type !== 11) return po(s, n(uo), je([i]), o, 64, void 0, void 0, !0, !1, !1, t.loc);
    {
      let r = a.codegenNode;
      return tr(r, i, s), r;
    }
  }
  {
    let r = a.codegenNode, l = r.type === 14 && r.callee === Qc ? r.arguments[1].returns : r;
    return l.type === 13 && th(l, s), tr(l, i, s), r;
  }
}
let D0 = xg("for", (t, e, s) => {
  let { helper: n, removeHelper: i } = s;
  return function(o, a, r, l) {
    if (!a.exp) return void r.onError(Pt(31, a.loc));
    let c = a.forParseResult;
    if (!c) return void r.onError(Pt(32, a.loc));
    vg(c);
    let { scopes: h } = r, { source: u, value: f, key: p, index: d } = c, g = { type: 11, loc: a.loc, source: u, valueAlias: f, keyAlias: p, objectIndexAlias: d, parseResult: c, children: Za(o) ? o.children : [o] };
    r.replaceNode(g), h.vFor++;
    let m = l && l(g);
    return () => {
      h.vFor--, m && m();
    };
  }(t, e, s, (o) => {
    let a = Xt(n(Yc), [o.source]), r = Za(t), l = $e(t, "memo"), c = Lr(t, "key", !1, !0);
    c && c.type;
    let h = c && (c.type === 6 ? c.value ? dt(c.value.content, !0) : void 0 : c.exp), u = c && h ? Kt("key", h) : null, f = o.source.type === 4 && o.source.constType > 0, p = f ? 64 : c ? 128 : 256;
    return o.codegenNode = po(s, n(uo), void 0, a, p, void 0, void 0, !0, !f, !1, t.loc), () => {
      let d, { children: g } = o, m = g.length !== 1 || g[0].type !== 1, _ = Qa(t) ? t : r && t.children.length === 1 && Qa(t.children[0]) ? t.children[0] : null;
      if (_) d = _.codegenNode, r && u && tr(d, u, s);
      else if (m) d = po(s, n(uo), u ? je([u]) : void 0, t.children, 64, void 0, void 0, !0, void 0, !1);
      else {
        var y, b, x, v, k, S, C, D;
        d = g[0].codegenNode, r && u && tr(d, u, s), !f !== d.isBlock && (d.isBlock ? (i(Pn), i((y = s.inSSR, b = d.isComponent, y || b ? Tn : Dn))) : i((x = s.inSSR, v = d.isComponent, x || v ? Js : Xs))), d.isBlock = !f, d.isBlock ? (n(Pn), n((k = s.inSSR, S = d.isComponent, k || S ? Tn : Dn))) : n((C = s.inSSR, D = d.isComponent, C || D ? Js : Xs));
      }
      if (l) {
        let O = fi(ql(o.parseResult, [dt("_cached")]));
        O.body = { type: 21, body: [qe(["const _memo = (", l.exp, ")"]), qe(["if (_cached && _cached.el", ...h ? [" && _cached.key === ", h] : [], ` && ${s.helperString(ag)}(_cached, _memo)) return _cached`]), qe(["const _item = ", d]), dt("_item.memo = _memo"), dt("return _item")], loc: Fe }, a.arguments.push(O, dt("_cache"), dt(String(s.cached.length))), s.cached.push(null);
      } else a.arguments.push(fi(ql(o.parseResult), d, !0));
    };
  });
});
function vg(t, e) {
  t.finalized || (t.finalized = !0);
}
function ql({ value: t, key: e, index: s }, n = []) {
  var i = [t, e, s, ...n];
  let o = i.length;
  for (; o-- && !i[o]; ) ;
  return i.slice(0, o + 1).map((a, r) => a || dt("_".repeat(r + 1), !1));
}
let Mu = dt("undefined", !1), R0 = (t, e) => {
  if (t.type === 1 && (t.tagType === 1 || t.tagType === 3)) {
    let s = $e(t, "slot");
    if (s) return s.exp, e.scopes.vSlot++, () => {
      e.scopes.vSlot--;
    };
  }
};
function Xo(t, e, s) {
  let n = [Kt("name", t), Kt("fn", e)];
  return s != null && n.push(Kt("key", dt(String(s), !0))), je(n);
}
let Sg = /* @__PURE__ */ new WeakMap(), L0 = (t, e) => function() {
  let s, n, i, o, a;
  if ((t = e.currentNode).type !== 1 || t.tagType !== 0 && t.tagType !== 1) return;
  let { tag: r, props: l } = t, c = t.tagType === 1, h = c ? function(d, g, m = !1) {
    let { tag: _ } = d, y = Yl(_), b = Lr(d, "is", !1, !0);
    if (b) if (y) {
      let v;
      if (b.type === 6 ? v = b.value && dt(b.value.content, !0) : (v = b.exp) || (v = dt("is", !1, b.arg.loc)), v) return Xt(g.helper(Nl), [v]);
    } else b.type === 6 && b.value.content.startsWith("vue:") && (_ = b.value.content.slice(4));
    let x = lg(_) || g.isBuiltInComponent(_);
    return x ? (m || g.helper(x), x) : (g.helper(Gc), g.components.add(_), Vl(_, "component"));
  }(t, e) : `"${r}"`, u = St(h) && h.callee === Nl, f = 0, p = u || h === Ki || h === Vc || !c && (r === "svg" || r === "foreignObject" || r === "math");
  if (l.length > 0) {
    let d = wg(t, e, void 0, c, u);
    s = d.props, f = d.patchFlag, o = d.dynamicPropNames;
    let g = d.directives;
    a = g && g.length ? Sn(g.map((m) => function(_, y) {
      let b = [], x = Sg.get(_);
      x ? b.push(y.helperString(x)) : (y.helper(Uc), y.directives.add(_.name), b.push(Vl(_.name, "directive")));
      let { loc: v } = _;
      if (_.exp && b.push(_.exp), _.arg && (_.exp || b.push("void 0"), b.push(_.arg)), Object.keys(_.modifiers).length) {
        _.arg || (_.exp || b.push("void 0"), b.push("void 0"));
        let k = dt("true", !1, v);
        b.push(je(_.modifiers.map((S) => Kt(S, k)), v));
      }
      return Sn(b, _.loc);
    }(m, e))) : void 0, d.shouldUseBlock && (p = !0);
  }
  if (t.children.length > 0) if (h === Ya && (p = !0, f |= 1024), c && h !== Ki && h !== Ya) {
    let { slots: d, hasDynamicSlots: g } = function(m, _, y = (b, x, v, k) => fi(b, v, !1, !0, v.length ? v[0].loc : k)) {
      _.helper(Zc);
      let { children: b, loc: x } = m, v = [], k = [], S = _.scopes.vSlot > 0 || _.scopes.vFor > 0, C = $e(m, "slot", !0);
      if (C) {
        let { arg: M, exp: T } = C;
        M && !Pe(M) && (S = !0), v.push(Kt(M || dt("default", !0), y(T, void 0, b, x)));
      }
      let D = !1, O = !1, I = [], w = /* @__PURE__ */ new Set(), F = 0;
      for (let M = 0; M < b.length; M++) {
        let T, E, H, Y, Z = b[M];
        if (!Za(Z) || !(T = $e(Z, "slot", !0))) {
          Z.type !== 3 && I.push(Z);
          continue;
        }
        if (C) {
          _.onError(Pt(37, T.loc));
          break;
        }
        D = !0;
        let { children: nt, loc: ft } = Z, { arg: lt = dt("default", !0), exp: pt, loc: _t } = T;
        Pe(lt) ? E = lt ? lt.content : "default" : S = !0;
        let K = $e(Z, "for"), q = y(pt, K, nt, ft);
        if (H = $e(Z, "if")) S = !0, k.push(jl(H.exp, Xo(lt, q, F++), Mu));
        else if (Y = $e(Z, /^else(?:-if)?$/, !0)) {
          let U, ot = M;
          for (; ot-- && dg(U = b[ot]); ) ;
          if (U && Za(U) && $e(U, /^(?:else-)?if$/)) {
            let A = k[k.length - 1];
            for (; A.alternate.type === 19; ) A = A.alternate;
            A.alternate = Y.exp ? jl(Y.exp, Xo(lt, q, F++), Mu) : Xo(lt, q, F++);
          } else _.onError(Pt(30, Y.loc));
        } else if (K) {
          S = !0;
          let U = K.forParseResult;
          U ? (vg(U), k.push(Xt(_.helper(Yc), [U.source, fi(ql(U), Xo(lt, q), !0)]))) : _.onError(Pt(32, K.loc));
        } else {
          if (E) {
            if (w.has(E)) {
              _.onError(Pt(38, _t));
              continue;
            }
            w.add(E), E === "default" && (O = !0);
          }
          v.push(Kt(lt, q));
        }
      }
      if (!C) {
        let M = (T, E) => Kt("default", y(T, void 0, E, x));
        D ? I.length && !I.every(eh) && (O ? _.onError(Pt(39, I[0].loc)) : v.push(M(void 0, I))) : v.push(M(void 0, b));
      }
      let L = S ? 2 : function M(T) {
        for (let E = 0; E < T.length; E++) {
          let H = T[E];
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
      }(m.children) ? 3 : 1, P = je(v.concat(Kt("_", dt(L + "", !1))), x);
      return k.length && (P = Xt(_.helper(og), [P, Sn(k)])), { slots: P, hasDynamicSlots: S };
    }(t, e);
    n = d, g && (f |= 1024);
  } else if (t.children.length === 1 && h !== Ki) {
    let d = t.children[0], g = d.type, m = g === 5 || g === 8;
    m && Oe(d, e) === 0 && (f |= 1), n = m || g === 2 ? d : t.children;
  } else n = t.children;
  o && o.length && (i = function(d) {
    let g = "[";
    for (let m = 0, _ = d.length; m < _; m++) g += JSON.stringify(d[m]), m < _ - 1 && (g += ", ");
    return g + "]";
  }(o)), t.codegenNode = po(e, h, s, n, f === 0 ? void 0 : f, i, a, !!p, !1, c, t.loc);
};
function wg(t, e, s = t.props, n, i, o = !1) {
  let a, { tag: r, loc: l, children: c } = t, h = [], u = [], f = [], p = c.length > 0, d = !1, g = 0, m = !1, _ = !1, y = !1, b = !1, x = !1, v = !1, k = [], S = (O) => {
    h.length && (u.push(je(Au(h), l)), h = []), O && u.push(O);
  }, C = () => {
    e.scopes.vFor > 0 && h.push(Kt(dt("ref_for", !0), dt("true")));
  }, D = ({ key: O, value: I }) => {
    if (Pe(O)) {
      let w = O.content, F = On(w);
      F && (!n || i) && w.toLowerCase() !== "onclick" && w !== "onUpdate:modelValue" && !ws(w) && (b = !0), F && ws(w) && (v = !0), F && I.type === 14 && (I = I.arguments[0]), I.type === 20 || (I.type === 4 || I.type === 8) && Oe(I, e) > 0 || (w === "ref" ? m = !0 : w === "class" ? _ = !0 : w === "style" ? y = !0 : w === "key" || k.includes(w) || k.push(w), n && (w === "class" || w === "style") && !k.includes(w) && k.push(w));
    } else x = !0;
  };
  for (let O = 0; O < s.length; O++) {
    let I = s[O];
    if (I.type === 6) {
      let { loc: w, name: F, nameLoc: L, value: P } = I;
      if (F === "ref" && (m = !0, C()), F === "is" && (Yl(r) || P && P.content.startsWith("vue:"))) continue;
      h.push(Kt(dt(F, !0, L), dt(P ? P.content : "", !0, P ? P.loc : w)));
    } else {
      let { name: w, arg: F, exp: L, loc: P, modifiers: M } = I, T = w === "bind", E = w === "on";
      if (w === "slot") {
        n || e.onError(Pt(40, P));
        continue;
      }
      if (w === "once" || w === "memo" || w === "is" || T && Kn(F, "is") && Yl(r) || E && o) continue;
      if ((T && Kn(F, "key") || E && p && Kn(F, "vue:before-update")) && (d = !0), T && Kn(F, "ref") && C(), !F && (T || E)) {
        x = !0, L ? T ? (C(), S(), u.push(L)) : S({ type: 14, loc: P, callee: e.helper(Xc), arguments: n ? [L] : [L, "true"] }) : e.onError(Pt(T ? 34 : 35, P));
        continue;
      }
      T && M.some((Y) => Y.content === "prop") && (g |= 32);
      let H = e.directiveTransforms[w];
      if (H) {
        let { props: Y, needRuntime: Z } = H(I, t, e);
        o || Y.forEach(D), E && F && !Pe(F) ? S(je(Y, l)) : h.push(...Y), Z && (f.push(I), ge(Z) && Sg.set(I, Z));
      } else !$m(w) && (f.push(I), p && (d = !0));
    }
  }
  if (u.length ? (S(), a = u.length > 1 ? Xt(e.helper(Ka), u, l) : u[0]) : h.length && (a = je(Au(h), l)), x ? g |= 16 : (_ && !n && (g |= 2), y && !n && (g |= 4), k.length && (g |= 8), b && (g |= 32)), !d && (g === 0 || g === 32) && (m || v || f.length > 0) && (g |= 512), !e.inSSR && a) switch (a.type) {
    case 15:
      let O = -1, I = -1, w = !1;
      for (let P = 0; P < a.properties.length; P++) {
        let M = a.properties[P].key;
        Pe(M) ? M.content === "class" ? O = P : M.content === "style" && (I = P) : M.isHandlerKey || (w = !0);
      }
      let F = a.properties[O], L = a.properties[I];
      w ? a = Xt(e.helper(fo), [a]) : (F && !Pe(F.value) && (F.value = Xt(e.helper(Kc), [F.value])), L && (y || L.value.type === 4 && L.value.content.trim()[0] === "[" || L.value.type === 17) && (L.value = Xt(e.helper(Jc), [L.value])));
      break;
    case 14:
      break;
    default:
      a = Xt(e.helper(fo), [Xt(e.helper(Fo), [a])]);
  }
  return { props: a, directives: f, patchFlag: g, dynamicPropNames: k, shouldUseBlock: d };
}
function Au(t) {
  let e = /* @__PURE__ */ new Map(), s = [];
  for (let o = 0; o < t.length; o++) {
    var n, i;
    let a = t[o];
    if (a.key.type === 8 || !a.key.isStatic) {
      s.push(a);
      continue;
    }
    let r = a.key.content, l = e.get(r);
    l ? (r === "style" || r === "class" || On(r)) && (n = l, i = a, n.value.type === 17 ? n.value.elements.push(i.value) : n.value = Sn([n.value, i.value], n.loc)) : (e.set(r, a), s.push(a));
  }
  return s;
}
function Yl(t) {
  return t === "component" || t === "Component";
}
let O0 = (t, e) => {
  if (Qa(t)) {
    let { children: s, loc: n } = t, { slotName: i, slotProps: o } = function(l, c) {
      let h, u = '"default"', f = [];
      for (let p = 0; p < l.props.length; p++) {
        let d = l.props[p];
        if (d.type === 6) d.value && (d.name === "name" ? u = JSON.stringify(d.value.content) : (d.name = Tt(d.name), f.push(d)));
        else if (d.name === "bind" && Kn(d.arg, "name")) {
          if (d.exp) u = d.exp;
          else if (d.arg && d.arg.type === 4) {
            let g = Tt(d.arg.content);
            u = d.exp = dt(g, !1, d.arg.loc);
          }
        } else d.name === "bind" && d.arg && Pe(d.arg) && (d.arg.content = Tt(d.arg.content)), f.push(d);
      }
      if (f.length > 0) {
        let { props: p, directives: d } = wg(l, c, f, !1, !1);
        h = p, d.length && c.onError(Pt(36, d[0].loc));
      }
      return { slotName: u, slotProps: h };
    }(t, e), a = [e.prefixIdentifiers ? "_ctx.$slots" : "$slots", i, "{}", "undefined", "true"], r = 2;
    o && (a[2] = o, r = 3), s.length && (a[3] = fi([], s, !1, !1, n), r = 4), e.scopeId && !e.slotted && (r = 5), a.splice(r), t.codegenNode = Xt(e.helper(ig), a, n);
  }
}, Cg = (t, e, s, n) => {
  let i, { loc: o, modifiers: a, arg: r } = t;
  if (!t.exp && a.length, r.type === 4) if (r.isStatic) {
    let u = r.content;
    u.startsWith("vue:") && (u = `vnode-${u.slice(4)}`), i = dt(e.tagType !== 0 || u.startsWith("vnode") || !/[A-Z]/.test(u) ? Qn(Tt(u)) : `on:${u}`, !0, r.loc);
  } else i = qe([`${s.helperString($l)}(`, r, ")"]);
  else (i = r).children.unshift(`${s.helperString($l)}(`), i.children.push(")");
  let l = t.exp;
  l && !l.content.trim() && (l = void 0);
  let c = s.cacheHandlers && !l && !s.inVOnce;
  if (l) {
    let u, f = ug(l), p = !(f || (u = l, v0.test(hg(u)))), d = l.content.includes(";");
    (p || c && f) && (l = qe([`${p ? "$event" : "(...args)"} => ${d ? "{" : "("}`, l, d ? "}" : ")"]));
  }
  let h = { props: [Kt(i, l || dt("() => {}", !1, o))] };
  return n && (h = n(h)), c && (h.props[0].value = s.cache(h.props[0].value)), h.props.forEach((u) => u.key.isHandlerKey = !0), h;
}, F0 = (t, e, s) => {
  let { modifiers: n } = t, i = t.arg, { exp: o } = t;
  return o && o.type === 4 && !o.content.trim() && (o = void 0), i.type !== 4 ? (i.children.unshift("("), i.children.push(') || ""')) : i.isStatic || (i.content = i.content ? `${i.content} || ""` : '""'), n.some((a) => a.content === "camel") && (i.type === 4 ? i.isStatic ? i.content = Tt(i.content) : i.content = `${s.helperString(Bl)}(${i.content})` : (i.children.unshift(`${s.helperString(Bl)}(`), i.children.push(")"))), !s.inSSR && (n.some((a) => a.content === "prop") && Pu(i, "."), n.some((a) => a.content === "attr") && Pu(i, "^")), { props: [Kt(i, o)] };
}, Pu = (t, e) => {
  t.type === 4 ? t.isStatic ? t.content = e + t.content : t.content = `\`${e}\${${t.content}}\`` : (t.children.unshift(`'${e}' + (`), t.children.push(")"));
}, E0 = (t, e) => {
  if (t.type === 0 || t.type === 1 || t.type === 11 || t.type === 10) return () => {
    let s, n = t.children, i = !1;
    for (let o = 0; o < n.length; o++) {
      let a = n[o];
      if (sl(a)) {
        i = !0;
        for (let r = o + 1; r < n.length; r++) {
          let l = n[r];
          if (sl(l)) s || (s = n[o] = qe([a], a.loc)), s.children.push(" + ", l), n.splice(r, 1), r--;
          else {
            s = void 0;
            break;
          }
        }
      }
    }
    if (i && (n.length !== 1 || t.type !== 0 && (t.type !== 1 || t.tagType !== 0 || t.props.find((o) => o.type === 7 && !e.directiveTransforms[o.name])))) for (let o = 0; o < n.length; o++) {
      let a = n[o];
      if (sl(a) || a.type === 8) {
        let r = [];
        (a.type !== 2 || a.content !== " ") && r.push(a), e.ssr || Oe(a, e) !== 0 || r.push("1"), n[o] = { type: 12, content: a, loc: a.loc, codegenNode: Xt(e.helper(zc), r) };
      }
    }
  };
}, Tu = /* @__PURE__ */ new WeakSet(), I0 = (t, e) => {
  if (t.type === 1 && $e(t, "once", !0) && !Tu.has(t) && !e.inVOnce && !e.inSSR) return Tu.add(t), e.inVOnce = !0, e.helper(Ja), () => {
    e.inVOnce = !1;
    let s = e.currentNode;
    s.codegenNode && (s.codegenNode = e.cache(s.codegenNode, !0, !0));
  };
}, kg = (t, e, s) => {
  let n, { exp: i, arg: o } = t;
  if (!i) return s.onError(Pt(41, t.loc)), Zo();
  let a = i.loc.source.trim(), r = i.type === 4 ? i.content : a, l = s.bindingMetadata[a];
  if (l === "props" || l === "props-aliased" || l === "literal-const" || l === "setup-const") return i.loc, Zo();
  if (!r.trim() || !ug(i)) return s.onError(Pt(42, i.loc)), Zo();
  let c = o || dt("modelValue", !0), h = o ? Pe(o) ? `onUpdate:${Tt(o.content)}` : qe(['"onUpdate:" + ', o]) : "onUpdate:modelValue", u = s.isTS ? "($event: any)" : "$event";
  n = qe([`${u} => ((`, i, ") = $event)"]);
  let f = [Kt(c, t.exp), Kt(h, n)];
  if (t.modifiers.length && e.tagType === 1) {
    let p = t.modifiers.map((g) => g.content).map((g) => (Hl.test(g) ? JSON.stringify(g) : g) + ": true").join(", "), d = o ? Pe(o) ? `${o.content}Modifiers` : qe([o, ' + "Modifiers"']) : "modelModifiers";
    f.push(Kt(d, dt(`{ ${p} }`, !1, t.loc, 2)));
  }
  return Zo(f);
};
function Zo(t = []) {
  return { props: t };
}
let Du = /* @__PURE__ */ new WeakSet(), N0 = (t, e) => {
  if (t.type === 1) {
    let s = $e(t, "memo");
    if (!(!s || Du.has(t)) && !e.inSSR) return Du.add(t), () => {
      let n = t.codegenNode || e.currentNode.codegenNode;
      n && n.type === 13 && (t.tagType !== 1 && th(n, e), t.codegenNode = Xt(e.helper(Qc), [s.exp, fi(void 0, n), "_cache", String(e.cached.length)]), e.cached.push(null));
    };
  }
}, B0 = (t, e) => {
  if (t.type === 1) {
    for (let s of t.props) if (s.type === 7 && s.name === "bind" && (!s.exp || s.exp.type === 4 && !s.exp.content.trim()) && s.arg) {
      let n = s.arg;
      if (n.type === 4 && n.isStatic) {
        let i = Tt(n.content);
        (cg.test(i[0]) || i[0] === "-") && (s.exp = dt(i, !1, n.loc));
      } else e.onError(Pt(53, n.loc)), s.exp = dt("", !0, n.loc);
    }
  }
}, Mg = Symbol(""), Ag = Symbol(""), Pg = Symbol(""), Tg = Symbol(""), Kl = Symbol(""), Dg = Symbol(""), Rg = Symbol(""), Lg = Symbol(""), Og = Symbol(""), Fg = Symbol("");
Object.getOwnPropertySymbols(cu = { [Mg]: "vModelRadio", [Ag]: "vModelCheckbox", [Pg]: "vModelText", [Tg]: "vModelSelect", [Kl]: "vModelDynamic", [Dg]: "withModifiers", [Rg]: "withKeys", [Lg]: "vShow", [Og]: "Transition", [Fg]: "TransitionGroup" }).forEach((t) => {
  ui[t] = cu[t];
});
let $0 = { parseMode: "html", isVoidTag: Jm, isNativeTag: (t) => qm(t) || Ym(t) || Km(t), isPreTag: (t) => t === "pre", isIgnoreNewlineTag: (t) => t === "pre" || t === "textarea", decodeEntities: function(t, e = !1) {
  return Bn || (Bn = document.createElement("div")), e ? (Bn.innerHTML = `<div foo="${t.replace(/"/g, "&quot;")}">`, Bn.children[0].getAttribute("foo")) : (Bn.innerHTML = t, Bn.textContent);
}, isBuiltInComponent: (t) => t === "Transition" || t === "transition" ? Og : t === "TransitionGroup" || t === "transition-group" ? Fg : void 0, getNamespace(t, e, s) {
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
} }, j0 = Ee("passive,once,capture"), W0 = Ee("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"), H0 = Ee("left,right"), Ru = Ee("onkeyup,onkeydown,onkeypress"), Lu = (t, e) => Pe(t) && t.content.toLowerCase() === "onclick" ? dt(e, !0) : t.type !== 4 ? qe(["(", t, `) === "onClick" ? "${e}" : (`, t, ")"]) : t, V0 = (t, e) => {
  t.type === 1 && t.tagType === 0 && (t.tag === "script" || t.tag === "style") && e.removeNode();
}, z0 = [(t) => {
  t.type === 1 && t.props.forEach((e, s) => {
    let n, i;
    e.type === 6 && e.name === "style" && e.value && (t.props[s] = { type: 7, name: "bind", arg: dt("style", !0, e.loc), exp: (n = e.value.content, i = e.loc, dt(JSON.stringify(ud(n)), !1, i, 3)), modifiers: [], loc: e.loc });
  });
}], G0 = { cloak: () => ({ props: [] }), html: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(54, i)), e.children.length && (s.onError(Pt(55, i)), e.children.length = 0), { props: [Kt(dt("innerHTML", !0, i), n || dt("", !0))] };
}, text: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(56, i)), e.children.length && (s.onError(Pt(57, i)), e.children.length = 0), { props: [Kt(dt("textContent", !0), n ? Oe(n, s) > 0 ? n : Xt(s.helperString(Rr), [n], i) : dt("", !0))] };
}, model: (t, e, s) => {
  let n = kg(t, e, s);
  if (!n.props.length || e.tagType === 1) return n;
  t.arg && s.onError(Pt(59, t.arg.loc));
  let { tag: i } = e, o = s.isCustomElement(i);
  if (i === "input" || i === "textarea" || i === "select" || o) {
    let a = Pg, r = !1;
    if (i === "input" || o) {
      let l = Lr(e, "type");
      if (l) {
        if (l.type === 7) a = Kl;
        else if (l.value) switch (l.value.content) {
          case "radio":
            a = Mg;
            break;
          case "checkbox":
            a = Ag;
            break;
          case "file":
            r = !0, s.onError(Pt(60, t.loc));
        }
      } else e.props.some((c) => c.type === 7 && c.name === "bind" && (!c.arg || c.arg.type !== 4 || !c.arg.isStatic)) && (a = Kl);
    } else i === "select" && (a = Tg);
    r || (n.needRuntime = s.helper(a));
  } else s.onError(Pt(58, t.loc));
  return n.props = n.props.filter((a) => a.key.type !== 4 || a.key.content !== "modelValue"), n;
}, on: (t, e, s) => Cg(t, e, s, (n) => {
  let { modifiers: i } = t;
  if (!i.length) return n;
  let { key: o, value: a } = n.props[0], { keyModifiers: r, nonKeyModifiers: l, eventOptionModifiers: c } = ((h, u, f, p) => {
    let d = [], g = [], m = [];
    for (let _ = 0; _ < u.length; _++) {
      let y = u[_].content;
      j0(y) ? m.push(y) : H0(y) ? Pe(h) ? Ru(h.content.toLowerCase()) ? d.push(y) : g.push(y) : (d.push(y), g.push(y)) : W0(y) ? g.push(y) : d.push(y);
    }
    return { keyModifiers: d, nonKeyModifiers: g, eventOptionModifiers: m };
  })(o, i, 0, t.loc);
  if (l.includes("right") && (o = Lu(o, "onContextmenu")), l.includes("middle") && (o = Lu(o, "onMouseup")), l.length && (a = Xt(s.helper(Dg), [a, JSON.stringify(l)])), r.length && (!Pe(o) || Ru(o.content.toLowerCase())) && (a = Xt(s.helper(Rg), [a, JSON.stringify(r)])), c.length) {
    let h = c.map(Fn).join("");
    o = Pe(o) ? dt(`${o.content}${h}`, !0) : qe(["(", o, `) + "${h}"`]);
  }
  return { props: [Kt(o, a)] };
}), show: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(62, i)), { props: [], needRuntime: s.helper(Lg) };
} }, Ou = /* @__PURE__ */ Object.create(null);
function U0(t, e) {
  if (!ct(t)) if (t.nodeType) t = t.innerHTML;
  else return ie;
  let s = t + JSON.stringify(e, (r, l) => typeof l == "function" ? l.toString() : l), n = Ou[s];
  if (n) return n;
  if (t[0] === "#") {
    let r = document.querySelector(t);
    t = r ? r.innerHTML : "";
  }
  let i = gt({ hoistStatic: !0, onError: void 0, onWarn: ie }, e);
  !i.isCustomElement && "u" > typeof customElements && (i.isCustomElement = (r) => !!customElements.get(r));
  let { code: o } = function(r, l = {}) {
    return function(c, h = {}) {
      var u;
      let f, p = h.onError || Wl, d = h.mode === "module";
      h.prefixIdentifiers === !0 ? p(Pt(48)) : d && p(Pt(49)), h.cacheHandlers && p(Pt(50)), h.scopeId && !d && p(Pt(51));
      let g = gt({}, h, { prefixIdentifiers: !1 }), m = ct(c) ? function(b, x) {
        if (Gt.reset(), he = null, Ct = null, De = "", cs = -1, un = -1, Bt.length = 0, Ms = b, Lt = gt({}, pg), x) {
          let S;
          for (S in x) x[S] != null && (Lt[S] = x[S]);
        }
        Gt.mode = Lt.parseMode === "html" ? 1 : 2 * (Lt.parseMode === "sfc"), Gt.inXML = Lt.ns === 1 || Lt.ns === 2;
        let v = x && x.delimiters;
        v && (Gt.delimiterOpen = Xa(v[0]), Gt.delimiterClose = Xa(v[1]));
        let k = er = /* @__PURE__ */ function(S, C = "") {
          return { type: 0, source: C, children: S, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: Fe };
        }([], b);
        return Gt.parse(Ms), k.loc = zt(0, b.length), k.children = mg(k.children), er = null, k;
      }(c, g) : c, [_, y] = [[B0, I0, T0, N0, D0, O0, L0, R0, E0], { on: Cg, bind: F0, model: kg }];
      return f = function(b, { filename: x = "", prefixIdentifiers: v = !1, hoistStatic: k = !1, hmr: S = !1, cacheHandlers: C = !1, nodeTransforms: D = [], directiveTransforms: O = {}, transformHoist: I = null, isBuiltInComponent: w = ie, isCustomElement: F = ie, expressionPlugins: L = [], scopeId: P = null, slotted: M = !0, ssr: T = !1, inSSR: E = !1, ssrCssVars: H = "", bindingMetadata: Y = yt, inline: Z = !1, isTS: nt = !1, onError: ft = Wl, onWarn: lt = rg, compatConfig: pt }) {
        let _t = x.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), K = { filename: x, selfName: _t && Fn(Tt(_t[1])), prefixIdentifiers: v, hoistStatic: k, hmr: S, cacheHandlers: C, nodeTransforms: D, directiveTransforms: O, transformHoist: I, isBuiltInComponent: w, isCustomElement: F, expressionPlugins: L, scopeId: P, slotted: M, ssr: T, inSSR: E, ssrCssVars: H, bindingMetadata: Y, inline: Z, isTS: nt, onError: ft, onWarn: lt, compatConfig: pt, root: b, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: b, childIndex: 0, inVOnce: !1, helper(q) {
          let U = K.helpers.get(q) || 0;
          return K.helpers.set(q, U + 1), q;
        }, removeHelper(q) {
          let U = K.helpers.get(q);
          if (U) {
            let ot = U - 1;
            ot ? K.helpers.set(q, ot) : K.helpers.delete(q);
          }
        }, helperString: (q) => `_${ui[K.helper(q)]}`, replaceNode(q) {
          K.parent.children[K.childIndex] = K.currentNode = q;
        }, removeNode(q) {
          let U = K.parent.children, ot = q ? U.indexOf(q) : K.currentNode ? K.childIndex : -1;
          q && q !== K.currentNode ? K.childIndex > ot && (K.childIndex--, K.onNodeRemoved()) : (K.currentNode = null, K.onNodeRemoved()), K.parent.children.splice(ot, 1);
        }, onNodeRemoved: ie, addIdentifiers(q) {
        }, removeIdentifiers(q) {
        }, hoist(q) {
          ct(q) && (q = dt(q)), K.hoists.push(q);
          let U = dt(`_hoisted_${K.hoists.length}`, !1, q.loc, 2);
          return U.hoisted = q, U;
        }, cache(q, U = !1, ot = !1) {
          let A = /* @__PURE__ */ function(R, N, z = !1, $ = !1) {
            return { type: 20, index: R, value: N, needPauseTracking: z, inVOnce: $, needArraySpread: !1, loc: Fe };
          }(K.cached.length, q, U, ot);
          return K.cached.push(A), A;
        } };
        return K;
      }(m, u = gt({}, g, { nodeTransforms: [..._, ...h.nodeTransforms || []], directiveTransforms: gt({}, y, h.directiveTransforms || {}) })), sr(m, f), u.hoistStatic && function b(x, v, k, S = !1, C = !1) {
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
                let E = T.patchFlag;
                if ((E === void 0 || E === 512 || E === 1) && bg(P, k) >= 2) {
                  let H = _g(P);
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
          if (x.tagType === 0 && x.codegenNode && x.codegenNode.type === 13 && st(x.codegenNode.children)) x.codegenNode.children = w(Sn(x.codegenNode.children)), I = !0;
          else if (x.tagType === 1 && x.codegenNode && x.codegenNode.type === 13 && x.codegenNode.children && !st(x.codegenNode.children) && x.codegenNode.children.type === 15) {
            let L = F(x.codegenNode, "default");
            L && (L.returns = w(Sn(L.returns)), I = !0);
          } else if (x.tagType === 3 && v && v.type === 1 && v.tagType === 1 && v.codegenNode && v.codegenNode.type === 13 && v.codegenNode.children && !st(v.codegenNode.children) && v.codegenNode.children.type === 15) {
            let L = $e(x, "slot", !0), P = L && L.arg && F(v.codegenNode, L.arg);
            P && (P.returns = w(Sn(P.returns)), I = !0);
          }
        }
        if (!I) for (let L of O) L.codegenNode = k.cache(L.codegenNode);
        function w(L) {
          let P = k.cache(L);
          return P.needArraySpread = !0, P;
        }
        function F(L, P) {
          if (L.children && !st(L.children) && L.children.type === 15) {
            let M = L.children.properties.find((T) => T.key === P || T.key.content === P);
            return M && M.value;
          }
        }
        O.length && k.transformHoist && k.transformHoist(D, k, x);
      }(m, void 0, f, !!bu(m)), u.ssr || function(b, x) {
        let { helper: v } = x, { children: k } = b;
        if (k.length === 1) {
          let S = bu(b);
          if (S && S.codegenNode) {
            let C = S.codegenNode;
            C.type === 13 && th(C, x), b.codegenNode = C;
          } else b.codegenNode = k[0];
        } else k.length > 1 && (b.codegenNode = po(x, v(uo), void 0, b.children, 64, void 0, void 0, !0, void 0, !1));
      }(m, f), m.helpers = /* @__PURE__ */ new Set([...f.helpers.keys()]), m.components = [...f.components], m.directives = [...f.directives], m.imports = f.imports, m.hoists = f.hoists, m.temps = f.temps, m.cached = f.cached, m.transformed = !0, function(b, x = {}) {
        let v = function(T, { mode: E = "function", prefixIdentifiers: H = E === "module", sourceMap: Y = !1, filename: Z = "template.vue.html", scopeId: nt = null, optimizeImports: ft = !1, runtimeGlobalName: lt = "Vue", runtimeModuleName: pt = "vue", ssrRuntimeModuleName: _t = "vue/server-renderer", ssr: K = !1, isTS: q = !1, inSSR: U = !1 }) {
          let ot = { mode: E, prefixIdentifiers: H, sourceMap: Y, filename: Z, scopeId: nt, optimizeImports: ft, runtimeGlobalName: lt, runtimeModuleName: pt, ssrRuntimeModuleName: _t, ssr: K, isTS: q, inSSR: U, source: T.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: !1, map: void 0, helper: (R) => `_${ui[R]}`, push(R, N = -2, z) {
            ot.code += R;
          }, indent() {
            A(++ot.indentLevel);
          }, deindent(R = !1) {
            R ? --ot.indentLevel : A(--ot.indentLevel);
          }, newline() {
            A(ot.indentLevel);
          } };
          function A(R) {
            ot.push(`
` + "  ".repeat(R), 0);
          }
          return ot;
        }(b, x);
        x.onContextCreated && x.onContextCreated(v);
        let { mode: k, push: S, prefixIdentifiers: C, indent: D, deindent: O, newline: I, ssr: w } = v, F = Array.from(b.helpers), L = F.length > 0, P = !C && k !== "module";
        (function(T, E) {
          let { push: H, newline: Y, runtimeGlobalName: Z } = E, nt = Array.from(T.helpers);
          if (nt.length > 0 && (H(`const _Vue = ${Z}
`, -1), T.hoists.length)) {
            let ft = [Js, Xs, Oo, zc, ng].filter((lt) => nt.includes(lt)).map(_u).join(", ");
            H(`const { ${ft} } = _Vue
`, -1);
          }
          (function(ft, lt) {
            if (!ft.length) return;
            lt.pure = !0;
            let { push: pt, newline: _t } = lt;
            _t();
            for (let K = 0; K < ft.length; K++) {
              let q = ft[K];
              q && (pt(`const _hoisted_${K + 1} = `), _e(q, lt), _t());
            }
            lt.pure = !1;
          })(T.hoists, E), Y(), H("return ");
        })(b, v);
        let M = (w ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
        if (S(`function ${w ? "ssrRender" : "render"}(${M}) {`), D(), P && (S("with (_ctx) {"), D(), L && (S(`const { ${F.map(_u).join(", ")} } = _Vue
`, -1), I())), b.components.length && (xu(b.components, "component", v), (b.directives.length || b.temps > 0) && I()), b.directives.length && (xu(b.directives, "directive", v), b.temps > 0 && I()), b.temps > 0) {
          S("let ");
          for (let T = 0; T < b.temps; T++) S(`${T > 0 ? ", " : ""}_temp${T}`);
        }
        return (b.components.length || b.directives.length || b.temps) && (S(`
`, 0), I()), w || S("return "), b.codegenNode ? _e(b.codegenNode, v) : S("null"), P && (O(), S("}")), O(), S("}"), { ast: b, code: v.code, preamble: "", map: v.map ? v.map.toJSON() : void 0 };
      }(m, g);
    }(r, gt({}, $0, l, { nodeTransforms: [V0, ...z0, ...l.nodeTransforms || []], directiveTransforms: gt({}, G0, l.directiveTransforms || {}), transformHoist: null }));
  }(t, i), a = Function("Vue", o)(f0);
  return a._rc = !0, Ou[s] = a;
}
kp(U0);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Eo(t) {
  return t + 0.5 | 0;
}
const Hs = (t, e, s) => Math.max(Math.min(t, s), e);
function Ei(t) {
  return Hs(Eo(t * 2.55), 0, 255);
}
function Ys(t) {
  return Hs(Eo(t * 255), 0, 255);
}
function ps(t) {
  return Hs(Eo(t / 2.55) / 100, 0, 1);
}
function Fu(t) {
  return Hs(Eo(t * 100), 0, 100);
}
const Be = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Jl = [..."0123456789ABCDEF"], q0 = (t) => Jl[t & 15], Y0 = (t) => Jl[(t & 240) >> 4] + Jl[t & 15], Qo = (t) => (t & 240) >> 4 === (t & 15), K0 = (t) => Qo(t.r) && Qo(t.g) && Qo(t.b) && Qo(t.a);
function J0(t) {
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
const X0 = (t, e) => t < 255 ? e(t) : "";
function Z0(t) {
  var e = K0(t) ? q0 : Y0;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + X0(t.a, e) : void 0;
}
const Q0 = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Eg(t, e, s) {
  const n = e * Math.min(s, 1 - s), i = (o, a = (o + t / 30) % 12) => s - n * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [i(0), i(8), i(4)];
}
function t_(t, e, s) {
  const n = (i, o = (i + t / 60) % 6) => s - s * e * Math.max(Math.min(o, 4 - o, 1), 0);
  return [n(5), n(3), n(1)];
}
function e_(t, e, s) {
  const n = Eg(t, 1, 0.5);
  let i;
  for (e + s > 1 && (i = 1 / (e + s), e *= i, s *= i), i = 0; i < 3; i++)
    n[i] *= 1 - e - s, n[i] += e;
  return n;
}
function s_(t, e, s, n, i) {
  return t === i ? (e - s) / n + (e < s ? 6 : 0) : e === i ? (s - t) / n + 2 : (t - e) / n + 4;
}
function nh(t) {
  const s = t.r / 255, n = t.g / 255, i = t.b / 255, o = Math.max(s, n, i), a = Math.min(s, n, i), r = (o + a) / 2;
  let l, c, h;
  return o !== a && (h = o - a, c = r > 0.5 ? h / (2 - o - a) : h / (o + a), l = s_(s, n, i, h, o), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function ih(t, e, s, n) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, s, n)).map(Ys);
}
function oh(t, e, s) {
  return ih(Eg, t, e, s);
}
function n_(t, e, s) {
  return ih(e_, t, e, s);
}
function i_(t, e, s) {
  return ih(t_, t, e, s);
}
function Ig(t) {
  return (t % 360 + 360) % 360;
}
function o_(t) {
  const e = Q0.exec(t);
  let s = 255, n;
  if (!e)
    return;
  e[5] !== n && (s = e[6] ? Ei(+e[5]) : Ys(+e[5]));
  const i = Ig(+e[2]), o = +e[3] / 100, a = +e[4] / 100;
  return e[1] === "hwb" ? n = n_(i, o, a) : e[1] === "hsv" ? n = i_(i, o, a) : n = oh(i, o, a), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function a_(t, e) {
  var s = nh(t);
  s[0] = Ig(s[0] + e), s = oh(s), t.r = s[0], t.g = s[1], t.b = s[2];
}
function r_(t) {
  if (!t)
    return;
  const e = nh(t), s = e[0], n = Fu(e[1]), i = Fu(e[2]);
  return t.a < 255 ? `hsla(${s}, ${n}%, ${i}%, ${ps(t.a)})` : `hsl(${s}, ${n}%, ${i}%)`;
}
const Eu = {
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
}, Iu = {
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
function l_() {
  const t = {}, e = Object.keys(Iu), s = Object.keys(Eu);
  let n, i, o, a, r;
  for (n = 0; n < e.length; n++) {
    for (a = r = e[n], i = 0; i < s.length; i++)
      o = s[i], r = r.replace(o, Eu[o]);
    o = parseInt(Iu[a], 16), t[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return t;
}
let ta;
function c_(t) {
  ta || (ta = l_(), ta.transparent = [0, 0, 0, 0]);
  const e = ta[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const h_ = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function u_(t) {
  const e = h_.exec(t);
  let s = 255, n, i, o;
  if (e) {
    if (e[7] !== n) {
      const a = +e[7];
      s = e[8] ? Ei(a) : Hs(a * 255, 0, 255);
    }
    return n = +e[1], i = +e[3], o = +e[5], n = 255 & (e[2] ? Ei(n) : Hs(n, 0, 255)), i = 255 & (e[4] ? Ei(i) : Hs(i, 0, 255)), o = 255 & (e[6] ? Ei(o) : Hs(o, 0, 255)), {
      r: n,
      g: i,
      b: o,
      a: s
    };
  }
}
function f_(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${ps(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const nl = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, Wn = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function d_(t, e, s) {
  const n = Wn(ps(t.r)), i = Wn(ps(t.g)), o = Wn(ps(t.b));
  return {
    r: Ys(nl(n + s * (Wn(ps(e.r)) - n))),
    g: Ys(nl(i + s * (Wn(ps(e.g)) - i))),
    b: Ys(nl(o + s * (Wn(ps(e.b)) - o))),
    a: t.a + s * (e.a - t.a)
  };
}
function ea(t, e, s) {
  if (t) {
    let n = nh(t);
    n[e] = Math.max(0, Math.min(n[e] + n[e] * s, e === 0 ? 360 : 1)), n = oh(n), t.r = n[0], t.g = n[1], t.b = n[2];
  }
}
function Ng(t, e) {
  return t && Object.assign(e || {}, t);
}
function Nu(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = Ys(t[3]))) : (e = Ng(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = Ys(e.a)), e;
}
function p_(t) {
  return t.charAt(0) === "r" ? u_(t) : o_(t);
}
class go {
  constructor(e) {
    if (e instanceof go)
      return e;
    const s = typeof e;
    let n;
    s === "object" ? n = Nu(e) : s === "string" && (n = J0(e) || c_(e) || p_(e)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Ng(this._rgb);
    return e && (e.a = ps(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Nu(e);
  }
  rgbString() {
    return this._valid ? f_(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Z0(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? r_(this._rgb) : void 0;
  }
  mix(e, s) {
    if (e) {
      const n = this.rgb, i = e.rgb;
      let o;
      const a = s === o ? 0.5 : s, r = 2 * a - 1, l = n.a - i.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - c, n.r = 255 & c * n.r + o * i.r + 0.5, n.g = 255 & c * n.g + o * i.g + 0.5, n.b = 255 & c * n.b + o * i.b + 0.5, n.a = a * n.a + (1 - a) * i.a, this.rgb = n;
    }
    return this;
  }
  interpolate(e, s) {
    return e && (this._rgb = d_(this._rgb, e._rgb, s)), this;
  }
  clone() {
    return new go(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = Ys(e), this;
  }
  clearer(e) {
    const s = this._rgb;
    return s.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, s = Eo(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
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
    return ea(this._rgb, 2, e), this;
  }
  darken(e) {
    return ea(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return ea(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return ea(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return a_(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function ls() {
}
const g_ = /* @__PURE__ */ (() => {
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
const m_ = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, Bg = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function Rt(t, e, s) {
  if (t && typeof t.call == "function")
    return t.apply(s, e);
}
function At(t, e, s, n) {
  let i, o, a;
  if (Ft(t))
    for (o = t.length, i = 0; i < o; i++)
      e.call(s, t[i], i);
  else if (bt(t))
    for (a = Object.keys(t), o = a.length, i = 0; i < o; i++)
      e.call(s, t[a[i]], a[i]);
}
function nr(t, e) {
  let s, n, i, o;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (s = 0, n = t.length; s < n; ++s)
    if (i = t[s], o = e[s], i.datasetIndex !== o.datasetIndex || i.index !== o.index)
      return !1;
  return !0;
}
function ir(t) {
  if (Ft(t))
    return t.map(ir);
  if (bt(t)) {
    const e = /* @__PURE__ */ Object.create(null), s = Object.keys(t), n = s.length;
    let i = 0;
    for (; i < n; ++i)
      e[s[i]] = ir(t[s[i]]);
    return e;
  }
  return t;
}
function $g(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function y_(t, e, s, n) {
  if (!$g(t))
    return;
  const i = e[t], o = s[t];
  bt(i) && bt(o) ? mo(i, o, n) : e[t] = ir(o);
}
function mo(t, e, s) {
  const n = Ft(e) ? e : [
    e
  ], i = n.length;
  if (!bt(t))
    return t;
  s = s || {};
  const o = s.merger || y_;
  let a;
  for (let r = 0; r < i; ++r) {
    if (a = n[r], !bt(a))
      continue;
    const l = Object.keys(a);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], t, a, s);
  }
  return t;
}
function Ji(t, e) {
  return mo(t, e, {
    merger: b_
  });
}
function b_(t, e, s) {
  if (!$g(t))
    return;
  const n = e[t], i = s[t];
  bt(n) && bt(i) ? Ji(n, i) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = ir(i));
}
const Bu = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function __(t) {
  const e = t.split("."), s = [];
  let n = "";
  for (const i of e)
    n += i, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
  return s;
}
function x_(t) {
  const e = __(t);
  return (s) => {
    for (const n of e) {
      if (n === "")
        break;
      s = s && s[n];
    }
    return s;
  };
}
function Zs(t, e) {
  return (Bu[e] || (Bu[e] = x_(e)))(t);
}
function ah(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const yo = (t) => typeof t < "u", Qs = (t) => typeof t == "function", $u = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const s of t)
    if (!e.has(s))
      return !1;
  return !0;
};
function v_(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const vt = Math.PI, Ot = 2 * vt, S_ = Ot + vt, or = Number.POSITIVE_INFINITY, w_ = vt / 180, qt = vt / 2, an = vt / 4, ju = vt * 2 / 3, Vs = Math.log10, is = Math.sign;
function Xi(t, e, s) {
  return Math.abs(t - e) < s;
}
function Wu(t) {
  const e = Math.round(t);
  t = Xi(t, e, t / 1e3) ? e : t;
  const s = Math.pow(10, Math.floor(Vs(t))), n = t / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function C_(t) {
  const e = [], s = Math.sqrt(t);
  let n;
  for (n = 1; n < s; n++)
    t % n === 0 && (e.push(n), e.push(t / n));
  return s === (s | 0) && e.push(s), e.sort((i, o) => i - o).pop(), e;
}
function k_(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function di(t) {
  return !k_(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function M_(t, e) {
  const s = Math.round(t);
  return s - e <= t && s + e >= t;
}
function jg(t, e, s) {
  let n, i, o;
  for (n = 0, i = t.length; n < i; n++)
    o = t[n][s], isNaN(o) || (e.min = Math.min(e.min, o), e.max = Math.max(e.max, o));
}
function ze(t) {
  return t * (vt / 180);
}
function rh(t) {
  return t * (180 / vt);
}
function Hu(t) {
  if (!jt(t))
    return;
  let e = 1, s = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, s++;
  return s;
}
function Wg(t, e) {
  const s = e.x - t.x, n = e.y - t.y, i = Math.sqrt(s * s + n * n);
  let o = Math.atan2(n, s);
  return o < -0.5 * vt && (o += Ot), {
    angle: o,
    distance: i
  };
}
function Xl(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function A_(t, e) {
  return (t - e + S_) % Ot - vt;
}
function fe(t) {
  return (t % Ot + Ot) % Ot;
}
function bo(t, e, s, n) {
  const i = fe(t), o = fe(e), a = fe(s), r = fe(o - i), l = fe(a - i), c = fe(i - o), h = fe(i - a);
  return i === o || i === a || n && o === a || r > l && c < h;
}
function se(t, e, s) {
  return Math.max(e, Math.min(s, t));
}
function P_(t) {
  return se(t, -32768, 32767);
}
function _s(t, e, s, n = 1e-6) {
  return t >= Math.min(e, s) - n && t <= Math.max(e, s) + n;
}
function lh(t, e, s) {
  s = s || ((a) => t[a] < e);
  let n = t.length - 1, i = 0, o;
  for (; n - i > 1; )
    o = i + n >> 1, s(o) ? i = o : n = o;
  return {
    lo: i,
    hi: n
  };
}
const xs = (t, e, s, n) => lh(t, s, n ? (i) => {
  const o = t[i][e];
  return o < s || o === s && t[i + 1][e] === s;
} : (i) => t[i][e] < s), T_ = (t, e, s) => lh(t, s, (n) => t[n][e] >= s);
function D_(t, e, s) {
  let n = 0, i = t.length;
  for (; n < i && t[n] < e; )
    n++;
  for (; i > n && t[i - 1] > s; )
    i--;
  return n > 0 || i < t.length ? t.slice(n, i) : t;
}
const Hg = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function R_(t, e) {
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
  }), Hg.forEach((s) => {
    const n = "_onData" + ah(s), i = t[s];
    Object.defineProperty(t, s, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const a = i.apply(this, o);
        return t._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...o);
        }), a;
      }
    });
  });
}
function Vu(t, e) {
  const s = t._chartjs;
  if (!s)
    return;
  const n = s.listeners, i = n.indexOf(e);
  i !== -1 && n.splice(i, 1), !(n.length > 0) && (Hg.forEach((o) => {
    delete t[o];
  }), delete t._chartjs);
}
function Vg(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const zg = function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
}();
function Gg(t, e) {
  let s = [], n = !1;
  return function(...i) {
    s = i, n || (n = !0, zg.call(window, () => {
      n = !1, t.apply(e, s);
    }));
  };
}
function L_(t, e) {
  let s;
  return function(...n) {
    return e ? (clearTimeout(s), s = setTimeout(t, e, n)) : t.apply(this, n), e;
  };
}
const ch = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", ce = (t, e, s) => t === "start" ? e : t === "end" ? s : (e + s) / 2, O_ = (t, e, s, n) => t === (n ? "left" : "right") ? s : t === "center" ? (e + s) / 2 : e;
function Ug(t, e, s) {
  const n = e.length;
  let i = 0, o = n;
  if (t._sorted) {
    const { iScale: a, vScale: r, _parsed: l } = t, c = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, h = a.axis, { min: u, max: f, minDefined: p, maxDefined: d } = a.getUserBounds();
    if (p) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        xs(l, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? n : xs(e, h, a.getPixelForValue(u)).lo
      ), c) {
        const g = l.slice(0, i + 1).reverse().findIndex((m) => !mt(m[r.axis]));
        i -= Math.max(0, g);
      }
      i = se(i, 0, n - 1);
    }
    if (d) {
      let g = Math.max(
        // @ts-expect-error Need to type _parsed
        xs(l, a.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : xs(e, h, a.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const m = l.slice(g - 1).findIndex((_) => !mt(_[r.axis]));
        g += Math.max(0, m);
      }
      o = se(g, i, n) - i;
    } else
      o = n - i;
  }
  return {
    start: i,
    count: o
  };
}
function qg(t) {
  const { xScale: e, yScale: s, _scaleRanges: n } = t, i = {
    xmin: e.min,
    xmax: e.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!n)
    return t._scaleRanges = i, !0;
  const o = n.xmin !== e.min || n.xmax !== e.max || n.ymin !== s.min || n.ymax !== s.max;
  return Object.assign(n, i), o;
}
const sa = (t) => t === 0 || t === 1, zu = (t, e, s) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * Ot / s)), Gu = (t, e, s) => Math.pow(2, -10 * t) * Math.sin((t - e) * Ot / s) + 1, Zi = {
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
  easeInOutExpo: (t) => sa(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => sa(t) ? t : zu(t, 0.075, 0.3),
  easeOutElastic: (t) => sa(t) ? t : Gu(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return sa(t) ? t : t < 0.5 ? 0.5 * zu(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * Gu(t * 2 - 1, 0.1125, 0.45);
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
function hh(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function Uu(t) {
  return hh(t) ? t : new go(t);
}
function il(t) {
  return hh(t) ? t : new go(t).saturate(0.5).darken(0.1).hexString();
}
const F_ = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], E_ = [
  "color",
  "borderColor",
  "backgroundColor"
];
function I_(t) {
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
      properties: E_
    },
    numbers: {
      type: "number",
      properties: F_
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
function N_(t) {
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
const qu = /* @__PURE__ */ new Map();
function B_(t, e) {
  e = e || {};
  const s = t + JSON.stringify(e);
  let n = qu.get(s);
  return n || (n = new Intl.NumberFormat(t, e), qu.set(s, n)), n;
}
function Io(t, e, s) {
  return B_(e, s).format(t);
}
const Yg = {
  values(t) {
    return Ft(t) ? t : "" + t;
  },
  numeric(t, e, s) {
    if (t === 0)
      return "0";
    const n = this.chart.options.locale;
    let i, o = t;
    if (s.length > 1) {
      const c = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (c < 1e-4 || c > 1e15) && (i = "scientific"), o = $_(t, s);
    }
    const a = Vs(Math.abs(o)), r = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: i,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Io(t, n, l);
  },
  logarithmic(t, e, s) {
    if (t === 0)
      return "0";
    const n = s[e].significand || t / Math.pow(10, Math.floor(Vs(t)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(n) || e > 0.8 * s.length ? Yg.numeric.call(this, t, e, s) : "";
  }
};
function $_(t, e) {
  let s = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(s) >= 1 && t !== Math.floor(t) && (s = t - Math.floor(t)), s;
}
var Or = {
  formatters: Yg
};
function j_(t) {
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
      callback: Or.formatters.values,
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
const Rn = /* @__PURE__ */ Object.create(null), Zl = /* @__PURE__ */ Object.create(null);
function Qi(t, e) {
  if (!e)
    return t;
  const s = e.split(".");
  for (let n = 0, i = s.length; n < i; ++n) {
    const o = s[n];
    t = t[o] || (t[o] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function ol(t, e, s) {
  return typeof e == "string" ? mo(Qi(t, e), s) : mo(Qi(t, ""), e);
}
class W_ {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, i) => il(i.backgroundColor), this.hoverBorderColor = (n, i) => il(i.borderColor), this.hoverColor = (n, i) => il(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(s);
  }
  set(e, s) {
    return ol(this, e, s);
  }
  get(e) {
    return Qi(this, e);
  }
  describe(e, s) {
    return ol(Zl, e, s);
  }
  override(e, s) {
    return ol(Rn, e, s);
  }
  route(e, s, n, i) {
    const o = Qi(this, e), a = Qi(this, n), r = "_" + s;
    Object.defineProperties(o, {
      [r]: {
        value: o[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], c = a[i];
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
var It = /* @__PURE__ */ new W_({
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
  I_,
  N_,
  j_
]);
function H_(t) {
  return !t || mt(t.size) || mt(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function ar(t, e, s, n, i) {
  let o = e[i];
  return o || (o = e[i] = t.measureText(i).width, s.push(i)), o > n && (n = o), n;
}
function V_(t, e, s, n) {
  n = n || {};
  let i = n.data = n.data || {}, o = n.garbageCollect = n.garbageCollect || [];
  n.font !== e && (i = n.data = {}, o = n.garbageCollect = [], n.font = e), t.save(), t.font = e;
  let a = 0;
  const r = s.length;
  let l, c, h, u, f;
  for (l = 0; l < r; l++)
    if (u = s[l], u != null && !Ft(u))
      a = ar(t, i, o, a, u);
    else if (Ft(u))
      for (c = 0, h = u.length; c < h; c++)
        f = u[c], f != null && !Ft(f) && (a = ar(t, i, o, a, f));
  t.restore();
  const p = o.length / 2;
  if (p > s.length) {
    for (l = 0; l < p; l++)
      delete i[o[l]];
    o.splice(0, p);
  }
  return a;
}
function rn(t, e, s) {
  const n = t.currentDevicePixelRatio, i = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((e - i) * n) / n + i;
}
function Yu(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function Ql(t, e, s, n) {
  Kg(t, e, s, n, null);
}
function Kg(t, e, s, n, i) {
  let o, a, r, l, c, h, u, f;
  const p = e.pointStyle, d = e.rotation, g = e.radius;
  let m = (d || 0) * w_;
  if (p && typeof p == "object" && (o = p.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(s, n), t.rotate(m), t.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), t.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (t.beginPath(), p) {
      default:
        i ? t.ellipse(s, n, i / 2, g, 0, 0, Ot) : t.arc(s, n, g, 0, Ot), t.closePath();
        break;
      case "triangle":
        h = i ? i / 2 : g, t.moveTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += ju, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += ju, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), t.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, a = Math.cos(m + an) * l, u = Math.cos(m + an) * (i ? i / 2 - c : l), r = Math.sin(m + an) * l, f = Math.sin(m + an) * (i ? i / 2 - c : l), t.arc(s - u, n - r, c, m - vt, m - qt), t.arc(s + f, n - a, c, m - qt, m), t.arc(s + u, n + r, c, m, m + qt), t.arc(s - f, n + a, c, m + qt, m + vt), t.closePath();
        break;
      case "rect":
        if (!d) {
          l = Math.SQRT1_2 * g, h = i ? i / 2 : l, t.rect(s - h, n - l, 2 * h, 2 * l);
          break;
        }
        m += an;
      case "rectRot":
        u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + f, n - a), t.lineTo(s + u, n + r), t.lineTo(s - f, n + a), t.closePath();
        break;
      case "crossRot":
        m += an;
      case "cross":
        u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + f, n - a), t.lineTo(s - f, n + a);
        break;
      case "star":
        u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + f, n - a), t.lineTo(s - f, n + a), m += an, u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + f, n - a), t.lineTo(s - f, n + a);
        break;
      case "line":
        a = i ? i / 2 : Math.cos(m) * g, r = Math.sin(m) * g, t.moveTo(s - a, n - r), t.lineTo(s + a, n + r);
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
function vs(t, e, s) {
  return s = s || 0.5, !e || t && t.x > e.left - s && t.x < e.right + s && t.y > e.top - s && t.y < e.bottom + s;
}
function Fr(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function Er(t) {
  t.restore();
}
function z_(t, e, s, n, i) {
  if (!e)
    return t.lineTo(s.x, s.y);
  if (i === "middle") {
    const o = (e.x + s.x) / 2;
    t.lineTo(o, e.y), t.lineTo(o, s.y);
  } else i === "after" != !!n ? t.lineTo(e.x, s.y) : t.lineTo(s.x, e.y);
  t.lineTo(s.x, s.y);
}
function G_(t, e, s, n) {
  if (!e)
    return t.lineTo(s.x, s.y);
  t.bezierCurveTo(n ? e.cp1x : e.cp2x, n ? e.cp1y : e.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function U_(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), mt(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function q_(t, e, s, n, i) {
  if (i.strikethrough || i.underline) {
    const o = t.measureText(n), a = e - o.actualBoundingBoxLeft, r = e + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, c = s + o.actualBoundingBoxDescent, h = i.strikethrough ? (l + c) / 2 : c;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = i.decorationWidth || 2, t.moveTo(a, h), t.lineTo(r, h), t.stroke();
  }
}
function Y_(t, e) {
  const s = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = s;
}
function Ln(t, e, s, n, i, o = {}) {
  const a = Ft(e) ? e : [
    e
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (t.save(), t.font = i.string, U_(t, o), l = 0; l < a.length; ++l)
    c = a[l], o.backdrop && Y_(t, o.backdrop), r && (o.strokeColor && (t.strokeStyle = o.strokeColor), mt(o.strokeWidth) || (t.lineWidth = o.strokeWidth), t.strokeText(c, s, n, o.maxWidth)), t.fillText(c, s, n, o.maxWidth), q_(t, s, n, c, o), n += Number(i.lineHeight);
  t.restore();
}
function _o(t, e) {
  const { x: s, y: n, w: i, h: o, radius: a } = e;
  t.arc(s + a.topLeft, n + a.topLeft, a.topLeft, 1.5 * vt, vt, !0), t.lineTo(s, n + o - a.bottomLeft), t.arc(s + a.bottomLeft, n + o - a.bottomLeft, a.bottomLeft, vt, qt, !0), t.lineTo(s + i - a.bottomRight, n + o), t.arc(s + i - a.bottomRight, n + o - a.bottomRight, a.bottomRight, qt, 0, !0), t.lineTo(s + i, n + a.topRight), t.arc(s + i - a.topRight, n + a.topRight, a.topRight, 0, -qt, !0), t.lineTo(s + a.topLeft, n);
}
const K_ = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, J_ = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function X_(t, e) {
  const s = ("" + t).match(K_);
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
const Z_ = (t) => +t || 0;
function uh(t, e) {
  const s = {}, n = bt(e), i = n ? Object.keys(e) : e, o = bt(t) ? n ? (a) => ut(t[a], t[e[a]]) : (a) => t[a] : () => t;
  for (const a of i)
    s[a] = Z_(o(a));
  return s;
}
function Jg(t) {
  return uh(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function wn(t) {
  return uh(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function me(t) {
  const e = Jg(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function Zt(t, e) {
  t = t || {}, e = e || It.font;
  let s = ut(t.size, e.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = ut(t.style, e.style);
  n && !("" + n).match(J_) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const i = {
    family: ut(t.family, e.family),
    lineHeight: X_(ut(t.lineHeight, e.lineHeight), s),
    size: s,
    style: n,
    weight: ut(t.weight, e.weight),
    string: ""
  };
  return i.string = H_(i), i;
}
function Ii(t, e, s, n) {
  let i, o, a;
  for (i = 0, o = t.length; i < o; ++i)
    if (a = t[i], a !== void 0 && a !== void 0)
      return a;
}
function Q_(t, e, s) {
  const { min: n, max: i } = t, o = Bg(e, (i - n) / 2), a = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: a(n, -Math.abs(o)),
    max: a(i, o)
  };
}
function tn(t, e) {
  return Object.assign(Object.create(t), e);
}
function fh(t, e = [
  ""
], s, n, i = () => t[0]) {
  const o = s || t;
  typeof n > "u" && (n = tm("_fallback", t));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: o,
    _fallback: n,
    _getTarget: i,
    override: (r) => fh([
      r,
      ...t
    ], e, o, n)
  };
  return new Proxy(a, {
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
      return Zg(r, l, () => rx(l, e, t, r));
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
    _descriptors: Xg(t, n),
    setContext: (o) => pi(t, o, s, n),
    override: (o) => pi(t.override(o), e, s, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, a) {
      return delete o[a], delete t[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, a, r) {
      return Zg(o, a, () => ex(o, a, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, a) {
      return o._descriptors.allKeys ? Reflect.has(t, a) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(t, a);
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
    has(o, a) {
      return Reflect.has(t, a);
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
    set(o, a, r) {
      return t[a] = r, delete o[a], !0;
    }
  });
}
function Xg(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = e.scriptable, _indexable: n = e.indexable, _allKeys: i = e.allKeys } = t;
  return {
    allKeys: i,
    scriptable: s,
    indexable: n,
    isScriptable: Qs(s) ? s : () => s,
    isIndexable: Qs(n) ? n : () => n
  };
}
const tx = (t, e) => t ? t + ah(e) : e, dh = (t, e) => bt(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function Zg(t, e, s) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const n = s();
  return t[e] = n, n;
}
function ex(t, e, s) {
  const { _proxy: n, _context: i, _subProxy: o, _descriptors: a } = t;
  let r = n[e];
  return Qs(r) && a.isScriptable(e) && (r = sx(e, r, t, s)), Ft(r) && r.length && (r = nx(e, r, t, a.isIndexable)), dh(e, r) && (r = pi(r, i, o && o[e], a)), r;
}
function sx(t, e, s, n) {
  const { _proxy: i, _context: o, _subProxy: a, _stack: r } = s;
  if (r.has(t))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + t);
  r.add(t);
  let l = e(o, a || n);
  return r.delete(t), dh(t, l) && (l = ph(i._scopes, i, t, l)), l;
}
function nx(t, e, s, n) {
  const { _proxy: i, _context: o, _subProxy: a, _descriptors: r } = s;
  if (typeof o.index < "u" && n(t))
    return e[o.index % e.length];
  if (bt(e[0])) {
    const l = e, c = i._scopes.filter((h) => h !== l);
    e = [];
    for (const h of l) {
      const u = ph(c, i, t, h);
      e.push(pi(u, o, a && a[t], r));
    }
  }
  return e;
}
function Qg(t, e, s) {
  return Qs(t) ? t(e, s) : t;
}
const ix = (t, e) => t === !0 ? e : typeof t == "string" ? Zs(e, t) : void 0;
function ox(t, e, s, n, i) {
  for (const o of e) {
    const a = ix(s, o);
    if (a) {
      t.add(a);
      const r = Qg(a._fallback, s, i);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (a === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function ph(t, e, s, n) {
  const i = e._rootScopes, o = Qg(e._fallback, s, n), a = [
    ...t,
    ...i
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Ku(r, a, s, o || s, n);
  return l === null || typeof o < "u" && o !== s && (l = Ku(r, a, o, l, n), l === null) ? !1 : fh(Array.from(r), [
    ""
  ], i, o, () => ax(e, s, n));
}
function Ku(t, e, s, n, i) {
  for (; s; )
    s = ox(t, e, s, n, i);
  return s;
}
function ax(t, e, s) {
  const n = t._getTarget();
  e in n || (n[e] = {});
  const i = n[e];
  return Ft(i) && bt(s) ? s : i || {};
}
function rx(t, e, s, n) {
  let i;
  for (const o of e)
    if (i = tm(tx(o, t), s), typeof i < "u")
      return dh(t, i) ? ph(s, n, t, i) : i;
}
function tm(t, e) {
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
  return e || (e = t._keys = lx(t._scopes)), e;
}
function lx(t) {
  const e = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const n of Object.keys(s).filter((i) => !i.startsWith("_")))
      e.add(n);
  return Array.from(e);
}
function em(t, e, s, n) {
  const { iScale: i } = t, { key: o = "r" } = this._parsing, a = new Array(n);
  let r, l, c, h;
  for (r = 0, l = n; r < l; ++r)
    c = r + s, h = e[c], a[r] = {
      r: i.parse(Zs(h, o), c)
    };
  return a;
}
const cx = Number.EPSILON || 1e-14, gi = (t, e) => e < t.length && !t[e].skip && t[e], sm = (t) => t === "x" ? "y" : "x";
function hx(t, e, s, n) {
  const i = t.skip ? e : t, o = e, a = s.skip ? e : s, r = Xl(o, i), l = Xl(a, o);
  let c = r / (r + l), h = l / (r + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const u = n * c, f = n * h;
  return {
    previous: {
      x: o.x - u * (a.x - i.x),
      y: o.y - u * (a.y - i.y)
    },
    next: {
      x: o.x + f * (a.x - i.x),
      y: o.y + f * (a.y - i.y)
    }
  };
}
function ux(t, e, s) {
  const n = t.length;
  let i, o, a, r, l, c = gi(t, 0);
  for (let h = 0; h < n - 1; ++h)
    if (l = c, c = gi(t, h + 1), !(!l || !c)) {
      if (Xi(e[h], 0, cx)) {
        s[h] = s[h + 1] = 0;
        continue;
      }
      i = s[h] / e[h], o = s[h + 1] / e[h], r = Math.pow(i, 2) + Math.pow(o, 2), !(r <= 9) && (a = 3 / Math.sqrt(r), s[h] = i * a * e[h], s[h + 1] = o * a * e[h]);
    }
}
function fx(t, e, s = "x") {
  const n = sm(s), i = t.length;
  let o, a, r, l = gi(t, 0);
  for (let c = 0; c < i; ++c) {
    if (a = r, r = l, l = gi(t, c + 1), !r)
      continue;
    const h = r[s], u = r[n];
    a && (o = (h - a[s]) / 3, r[`cp1${s}`] = h - o, r[`cp1${n}`] = u - o * e[c]), l && (o = (l[s] - h) / 3, r[`cp2${s}`] = h + o, r[`cp2${n}`] = u + o * e[c]);
  }
}
function dx(t, e = "x") {
  const s = sm(e), n = t.length, i = Array(n).fill(0), o = Array(n);
  let a, r, l, c = gi(t, 0);
  for (a = 0; a < n; ++a)
    if (r = l, l = c, c = gi(t, a + 1), !!l) {
      if (c) {
        const h = c[e] - l[e];
        i[a] = h !== 0 ? (c[s] - l[s]) / h : 0;
      }
      o[a] = r ? c ? is(i[a - 1]) !== is(i[a]) ? 0 : (i[a - 1] + i[a]) / 2 : i[a - 1] : i[a];
    }
  ux(t, i, o), fx(t, o, e);
}
function na(t, e, s) {
  return Math.max(Math.min(t, s), e);
}
function px(t, e) {
  let s, n, i, o, a, r = vs(t[0], e);
  for (s = 0, n = t.length; s < n; ++s)
    a = o, o = r, r = s < n - 1 && vs(t[s + 1], e), o && (i = t[s], a && (i.cp1x = na(i.cp1x, e.left, e.right), i.cp1y = na(i.cp1y, e.top, e.bottom)), r && (i.cp2x = na(i.cp2x, e.left, e.right), i.cp2y = na(i.cp2y, e.top, e.bottom)));
}
function gx(t, e, s, n, i) {
  let o, a, r, l;
  if (e.spanGaps && (t = t.filter((c) => !c.skip)), e.cubicInterpolationMode === "monotone")
    dx(t, i);
  else {
    let c = n ? t[t.length - 1] : t[0];
    for (o = 0, a = t.length; o < a; ++o)
      r = t[o], l = hx(c, r, t[Math.min(o + 1, a - (n ? 0 : 1)) % a], e.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  e.capBezierPoints && px(t, s);
}
function gh() {
  return typeof window < "u" && typeof document < "u";
}
function mh(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function rr(t, e, s) {
  let n;
  return typeof t == "string" ? (n = parseInt(t, 10), t.indexOf("%") !== -1 && (n = n / 100 * e.parentNode[s])) : n = t, n;
}
const Ir = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function mx(t, e) {
  return Ir(t).getPropertyValue(e);
}
const yx = [
  "top",
  "right",
  "bottom",
  "left"
];
function Cn(t, e, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let i = 0; i < 4; i++) {
    const o = yx[i];
    n[o] = parseFloat(t[e + "-" + o + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const bx = (t, e, s) => (t > 0 || e > 0) && (!s || !s.shadowRoot);
function _x(t, e) {
  const s = t.touches, n = s && s.length ? s[0] : t, { offsetX: i, offsetY: o } = n;
  let a = !1, r, l;
  if (bx(i, o, t.target))
    r = i, l = o;
  else {
    const c = e.getBoundingClientRect();
    r = n.clientX - c.left, l = n.clientY - c.top, a = !0;
  }
  return {
    x: r,
    y: l,
    box: a
  };
}
function fn(t, e) {
  if ("native" in t)
    return t;
  const { canvas: s, currentDevicePixelRatio: n } = e, i = Ir(s), o = i.boxSizing === "border-box", a = Cn(i, "padding"), r = Cn(i, "border", "width"), { x: l, y: c, box: h } = _x(t, s), u = a.left + (h && r.left), f = a.top + (h && r.top);
  let { width: p, height: d } = e;
  return o && (p -= a.width + r.width, d -= a.height + r.height), {
    x: Math.round((l - u) / p * s.width / n),
    y: Math.round((c - f) / d * s.height / n)
  };
}
function xx(t, e, s) {
  let n, i;
  if (e === void 0 || s === void 0) {
    const o = t && mh(t);
    if (!o)
      e = t.clientWidth, s = t.clientHeight;
    else {
      const a = o.getBoundingClientRect(), r = Ir(o), l = Cn(r, "border", "width"), c = Cn(r, "padding");
      e = a.width - c.width - l.width, s = a.height - c.height - l.height, n = rr(r.maxWidth, o, "clientWidth"), i = rr(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: e,
    height: s,
    maxWidth: n || or,
    maxHeight: i || or
  };
}
const zs = (t) => Math.round(t * 10) / 10;
function vx(t, e, s, n) {
  const i = Ir(t), o = Cn(i, "margin"), a = rr(i.maxWidth, t, "clientWidth") || or, r = rr(i.maxHeight, t, "clientHeight") || or, l = xx(t, e, s);
  let { width: c, height: h } = l;
  if (i.boxSizing === "content-box") {
    const f = Cn(i, "border", "width"), p = Cn(i, "padding");
    c -= p.width + f.width, h -= p.height + f.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, n ? c / n : h - o.height), c = zs(Math.min(c, a, l.maxWidth)), h = zs(Math.min(h, r, l.maxHeight)), c && !h && (h = zs(c / 2)), (e !== void 0 || s !== void 0) && n && l.height && h > l.height && (h = l.height, c = zs(Math.floor(h * n))), {
    width: c,
    height: h
  };
}
function Xu(t, e, s) {
  const n = e || 1, i = zs(t.height * n), o = zs(t.width * n);
  t.height = zs(t.height), t.width = zs(t.width);
  const a = t.canvas;
  return a.style && (s || !a.style.height && !a.style.width) && (a.style.height = `${t.height}px`, a.style.width = `${t.width}px`), t.currentDevicePixelRatio !== n || a.height !== i || a.width !== o ? (t.currentDevicePixelRatio = n, a.height = i, a.width = o, t.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Sx = function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    gh() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
}();
function Zu(t, e) {
  const s = mx(t, e), n = s && s.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function dn(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: t.y + s * (e.y - t.y)
  };
}
function wx(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: n === "middle" ? s < 0.5 ? t.y : e.y : n === "after" ? s < 1 ? t.y : e.y : s > 0 ? e.y : t.y
  };
}
function Cx(t, e, s, n) {
  const i = {
    x: t.cp2x,
    y: t.cp2y
  }, o = {
    x: e.cp1x,
    y: e.cp1y
  }, a = dn(t, i, s), r = dn(i, o, s), l = dn(o, e, s), c = dn(a, r, s), h = dn(r, l, s);
  return dn(c, h, s);
}
const kx = function(t, e) {
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
}, Mx = function() {
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
function ai(t, e, s) {
  return t ? kx(e, s) : Mx();
}
function nm(t, e) {
  let s, n;
  (e === "ltr" || e === "rtl") && (s = t.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", e, "important"), t.prevTextDirection = n);
}
function im(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function om(t) {
  return t === "angle" ? {
    between: bo,
    compare: A_,
    normalize: fe
  } : {
    between: _s,
    compare: (e, s) => e - s,
    normalize: (e) => e
  };
}
function Qu({ start: t, end: e, count: s, loop: n, style: i }) {
  return {
    start: t % s,
    end: e % s,
    loop: n && (e - t + 1) % s === 0,
    style: i
  };
}
function Ax(t, e, s) {
  const { property: n, start: i, end: o } = s, { between: a, normalize: r } = om(n), l = e.length;
  let { start: c, end: h, loop: u } = t, f, p;
  if (u) {
    for (c += l, h += l, f = 0, p = l; f < p && a(r(e[c % l][n]), i, o); ++f)
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
function am(t, e, s) {
  if (!s)
    return [
      t
    ];
  const { property: n, start: i, end: o } = s, a = e.length, { compare: r, between: l, normalize: c } = om(n), { start: h, end: u, loop: f, style: p } = Ax(t, e, s), d = [];
  let g = !1, m = null, _, y, b;
  const x = () => l(i, b, _) && r(i, b) !== 0, v = () => r(o, _) === 0 || l(o, b, _), k = () => g || x(), S = () => !g || v();
  for (let C = h, D = h; C <= u; ++C)
    y = e[C % a], !y.skip && (_ = c(y[n]), _ !== b && (g = l(_, i, o), m === null && k() && (m = r(_, i) === 0 ? C : D), m !== null && S() && (d.push(Qu({
      start: m,
      end: C,
      loop: f,
      count: a,
      style: p
    })), m = null), D = C, b = _));
  return m !== null && d.push(Qu({
    start: m,
    end: u,
    loop: f,
    count: a,
    style: p
  })), d;
}
function rm(t, e) {
  const s = [], n = t.segments;
  for (let i = 0; i < n.length; i++) {
    const o = am(n[i], t.points, e);
    o.length && s.push(...o);
  }
  return s;
}
function Px(t, e, s, n) {
  let i = 0, o = e - 1;
  if (s && !n)
    for (; i < e && !t[i].skip; )
      i++;
  for (; i < e && t[i].skip; )
    i++;
  for (i %= e, s && (o += i); o > i && t[o % e].skip; )
    o--;
  return o %= e, {
    start: i,
    end: o
  };
}
function Tx(t, e, s, n) {
  const i = t.length, o = [];
  let a = e, r = t[e], l;
  for (l = e + 1; l <= s; ++l) {
    const c = t[l % i];
    c.skip || c.stop ? r.skip || (n = !1, o.push({
      start: e % i,
      end: (l - 1) % i,
      loop: n
    }), e = a = c.stop ? l : null) : (a = l, r.skip && (e = l)), r = c;
  }
  return a !== null && o.push({
    start: e % i,
    end: a % i,
    loop: n
  }), o;
}
function Dx(t, e) {
  const s = t.points, n = t.options.spanGaps, i = s.length;
  if (!i)
    return [];
  const o = !!t._loop, { start: a, end: r } = Px(s, i, o, n);
  if (n === !0)
    return tf(t, [
      {
        start: a,
        end: r,
        loop: o
      }
    ], s, e);
  const l = r < a ? r + i : r, c = !!t._fullLoop && a === 0 && r === i - 1;
  return tf(t, Tx(s, a, l, c), s, e);
}
function tf(t, e, s, n) {
  return !n || !n.setContext || !s ? e : Rx(t, e, s, n);
}
function Rx(t, e, s, n) {
  const i = t._chart.getContext(), o = ef(t.options), { _datasetIndex: a, options: { spanGaps: r } } = t, l = s.length, c = [];
  let h = o, u = e[0].start, f = u;
  function p(d, g, m, _) {
    const y = r ? -1 : 1;
    if (d !== g) {
      for (d += l; s[d % l].skip; )
        d -= y;
      for (; s[g % l].skip; )
        g += y;
      d % l !== g % l && (c.push({
        start: d % l,
        end: g % l,
        loop: m,
        style: _
      }), h = _, u = g % l);
    }
  }
  for (const d of e) {
    u = r ? u : d.start;
    let g = s[u % l], m;
    for (f = u + 1; f <= d.end; f++) {
      const _ = s[f % l];
      m = ef(n.setContext(tn(i, {
        type: "segment",
        p0: g,
        p1: _,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: a
      }))), Lx(m, h) && p(u, f - 1, d.loop, h), g = _, h = m;
    }
    u < f - 1 && p(u, f - 1, d.loop, h);
  }
  return c;
}
function ef(t) {
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
function Lx(t, e) {
  if (!e)
    return !1;
  const s = [], n = function(i, o) {
    return hh(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(t, n) !== JSON.stringify(e, n);
}
function ia(t, e, s) {
  return t.options.clip ? t[s] : e[s];
}
function Ox(t, e) {
  const { xScale: s, yScale: n } = t;
  return s && n ? {
    left: ia(s, e, "left"),
    right: ia(s, e, "right"),
    top: ia(n, e, "top"),
    bottom: ia(n, e, "bottom")
  } : e;
}
function lm(t, e) {
  const s = e._clip;
  if (s.disabled)
    return !1;
  const n = Ox(e, t.chartArea);
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
class Fx {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, s, n, i) {
    const o = s.listeners[i], a = s.duration;
    o.forEach((r) => r({
      chart: e,
      initial: s.initial,
      numSteps: a,
      currentStep: Math.min(n - s.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = zg.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let s = 0;
    this._charts.forEach((n, i) => {
      if (!n.running || !n.items.length)
        return;
      const o = n.items;
      let a = o.length - 1, r = !1, l;
      for (; a >= 0; --a)
        l = o[a], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(e), r = !0) : (o[a] = o[o.length - 1], o.pop());
      r && (i.draw(), this._notify(i, n, e, "progress")), o.length || (n.running = !1, this._notify(i, n, e, "complete"), n.initial = !1), s += o.length;
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
var hs = /* @__PURE__ */ new Fx();
const sf = "transparent", Ex = {
  boolean(t, e, s) {
    return s > 0.5 ? e : t;
  },
  color(t, e, s) {
    const n = Uu(t || sf), i = n.valid && Uu(e || sf);
    return i && i.valid ? i.mix(n, s).hexString() : e;
  },
  number(t, e, s) {
    return t + (e - t) * s;
  }
};
class Ix {
  constructor(e, s, n, i) {
    const o = s[n];
    i = Ii([
      e.to,
      i,
      o,
      e.from
    ]);
    const a = Ii([
      e.from,
      o,
      i
    ]);
    this._active = !0, this._fn = e.fn || Ex[e.type || typeof a], this._easing = Zi[e.easing] || Zi.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = s, this._prop = n, this._from = a, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, s, n) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], o = n - this._start, a = this._duration - o;
      this._start = n, this._duration = Math.floor(Math.max(a, e.duration)), this._total += o, this._loop = !!e.loop, this._to = Ii([
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
    const s = e - this._start, n = this._duration, i = this._prop, o = this._from, a = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (a || s < n), !this._active) {
      this._target[i] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[i] = o;
      return;
    }
    l = s / n % 2, l = a && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[i] = this._fn(o, r, l);
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
class cm {
  constructor(e, s) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(e) {
    if (!bt(e))
      return;
    const s = Object.keys(It.animation), n = this._properties;
    Object.getOwnPropertyNames(e).forEach((i) => {
      const o = e[i];
      if (!bt(o))
        return;
      const a = {};
      for (const r of s)
        a[r] = o[r];
      (Ft(o.properties) && o.properties || [
        i
      ]).forEach((r) => {
        (r === i || !n.has(r)) && n.set(r, a);
      });
    });
  }
  _animateOptions(e, s) {
    const n = s.options, i = Bx(e, n);
    if (!i)
      return [];
    const o = this._createAnimations(i, n);
    return n.$shared && Nx(e.options.$animations, n).then(() => {
      e.options = n;
    }, () => {
    }), o;
  }
  _createAnimations(e, s) {
    const n = this._properties, i = [], o = e.$animations || (e.$animations = {}), a = Object.keys(s), r = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const c = a[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        i.push(...this._animateOptions(e, s));
        continue;
      }
      const h = s[c];
      let u = o[c];
      const f = n.get(c);
      if (u)
        if (f && u.active()) {
          u.update(f, h, r);
          continue;
        } else
          u.cancel();
      if (!f || !f.duration) {
        e[c] = h;
        continue;
      }
      o[c] = u = new Ix(f, e, c, h), i.push(u);
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
      return hs.add(this._chart, n), !0;
  }
}
function Nx(t, e) {
  const s = [], n = Object.keys(e);
  for (let i = 0; i < n.length; i++) {
    const o = t[n[i]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function Bx(t, e) {
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
function nf(t, e) {
  const s = t && t.options || {}, n = s.reverse, i = s.min === void 0 ? e : 0, o = s.max === void 0 ? e : 0;
  return {
    start: n ? o : i,
    end: n ? i : o
  };
}
function $x(t, e, s) {
  if (s === !1)
    return !1;
  const n = nf(t, s), i = nf(e, s);
  return {
    top: i.end,
    right: n.end,
    bottom: i.start,
    left: n.start
  };
}
function jx(t) {
  let e, s, n, i;
  return bt(t) ? (e = t.top, s = t.right, n = t.bottom, i = t.left) : e = s = n = i = t, {
    top: e,
    right: s,
    bottom: n,
    left: i,
    disabled: t === !1
  };
}
function hm(t, e) {
  const s = [], n = t._getSortedDatasetMetas(e);
  let i, o;
  for (i = 0, o = n.length; i < o; ++i)
    s.push(n[i].index);
  return s;
}
function of(t, e, s, n = {}) {
  const i = t.keys, o = n.mode === "single";
  let a, r, l, c;
  if (e === null)
    return;
  let h = !1;
  for (a = 0, r = i.length; a < r; ++a) {
    if (l = +i[a], l === s) {
      if (h = !0, n.all)
        continue;
      break;
    }
    c = t.values[l], jt(c) && (o || e === 0 || is(e) === is(c)) && (e += c);
  }
  return !h && !n.all ? 0 : e;
}
function Wx(t, e) {
  const { iScale: s, vScale: n } = e, i = s.axis === "x" ? "x" : "y", o = n.axis === "x" ? "x" : "y", a = Object.keys(t), r = new Array(a.length);
  let l, c, h;
  for (l = 0, c = a.length; l < c; ++l)
    h = a[l], r[l] = {
      [i]: h,
      [o]: t[h]
    };
  return r;
}
function al(t, e) {
  const s = t && t.options.stacked;
  return s || s === void 0 && e.stack !== void 0;
}
function Hx(t, e, s) {
  return `${t.id}.${e.id}.${s.stack || s.type}`;
}
function Vx(t) {
  const { min: e, max: s, minDefined: n, maxDefined: i } = t.getUserBounds();
  return {
    min: n ? e : Number.NEGATIVE_INFINITY,
    max: i ? s : Number.POSITIVE_INFINITY
  };
}
function zx(t, e, s) {
  const n = t[e] || (t[e] = {});
  return n[s] || (n[s] = {});
}
function af(t, e, s, n) {
  for (const i of e.getMatchingVisibleMetas(n).reverse()) {
    const o = t[i.index];
    if (s && o > 0 || !s && o < 0)
      return i.index;
  }
  return null;
}
function rf(t, e) {
  const { chart: s, _cachedMeta: n } = t, i = s._stacks || (s._stacks = {}), { iScale: o, vScale: a, index: r } = n, l = o.axis, c = a.axis, h = Hx(o, a, n), u = e.length;
  let f;
  for (let p = 0; p < u; ++p) {
    const d = e[p], { [l]: g, [c]: m } = d, _ = d._stacks || (d._stacks = {});
    f = _[c] = zx(i, h, g), f[r] = m, f._top = af(f, a, !0, n.type), f._bottom = af(f, a, !1, n.type);
    const y = f._visualValues || (f._visualValues = {});
    y[r] = m;
  }
}
function rl(t, e) {
  const s = t.scales;
  return Object.keys(s).filter((n) => s[n].axis === e).shift();
}
function Gx(t, e) {
  return tn(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function Ux(t, e, s) {
  return tn(t, {
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
      const o = i._stacks;
      if (!o || o[n] === void 0 || o[n][s] === void 0)
        return;
      delete o[n][s], o[n]._visualValues !== void 0 && o[n]._visualValues[s] !== void 0 && delete o[n]._visualValues[s];
    }
  }
}
const ll = (t) => t === "reset" || t === "none", lf = (t, e) => e ? t : Object.assign({}, t), qx = (t, e, s) => t && !e.hidden && e._stacked && {
  keys: hm(s, !0),
  values: null
};
class Ye {
  constructor(e, s) {
    this.chart = e, this._ctx = e.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = al(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && Mi(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, s = this._cachedMeta, n = this.getDataset(), i = (u, f, p, d) => u === "x" ? f : u === "r" ? d : p, o = s.xAxisID = ut(n.xAxisID, rl(e, "x")), a = s.yAxisID = ut(n.yAxisID, rl(e, "y")), r = s.rAxisID = ut(n.rAxisID, rl(e, "r")), l = s.indexAxis, c = s.iAxisID = i(l, o, a, r), h = s.vAxisID = i(l, a, o, r);
    s.xScale = this.getScaleForId(o), s.yScale = this.getScaleForId(a), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(c), s.vScale = this.getScaleForId(h);
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
    this._data && Vu(this._data, this), e._stacked && Mi(e);
  }
  _dataCheck() {
    const e = this.getDataset(), s = e.data || (e.data = []), n = this._data;
    if (bt(s)) {
      const i = this._cachedMeta;
      this._data = Wx(s, i);
    } else if (n !== s) {
      if (n) {
        Vu(n, this);
        const i = this._cachedMeta;
        Mi(i), i._parsed = [];
      }
      s && Object.isExtensible(s) && R_(s, this), this._syncList = [], this._data = s;
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
    const o = s._stacked;
    s._stacked = al(s.vScale, s), s.stack !== n.stack && (i = !0, Mi(s), s.stack = n.stack), this._resyncElements(e), (i || o !== s._stacked) && (rf(this, s._parsed), s._stacked = al(s.vScale, s));
  }
  configure() {
    const e = this.chart.config, s = e.datasetScopeKeys(this._type), n = e.getOptionScopes(this.getDataset(), s, !0);
    this.options = e.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, s) {
    const { _cachedMeta: n, _data: i } = this, { iScale: o, _stacked: a } = n, r = o.axis;
    let l = e === 0 && s === i.length ? !0 : n._sorted, c = e > 0 && n._parsed[e - 1], h, u, f;
    if (this._parsing === !1)
      n._parsed = i, n._sorted = !0, f = i;
    else {
      Ft(i[e]) ? f = this.parseArrayData(n, i, e, s) : bt(i[e]) ? f = this.parseObjectData(n, i, e, s) : f = this.parsePrimitiveData(n, i, e, s);
      const p = () => u[r] === null || c && u[r] < c[r];
      for (h = 0; h < s; ++h)
        n._parsed[h + e] = u = f[h], l && (p() && (l = !1), c = u);
      n._sorted = l;
    }
    a && rf(this, f);
  }
  parsePrimitiveData(e, s, n, i) {
    const { iScale: o, vScale: a } = e, r = o.axis, l = a.axis, c = o.getLabels(), h = o === a, u = new Array(i);
    let f, p, d;
    for (f = 0, p = i; f < p; ++f)
      d = f + n, u[f] = {
        [r]: h || o.parse(c[d], d),
        [l]: a.parse(s[d], d)
      };
    return u;
  }
  parseArrayData(e, s, n, i) {
    const { xScale: o, yScale: a } = e, r = new Array(i);
    let l, c, h, u;
    for (l = 0, c = i; l < c; ++l)
      h = l + n, u = s[h], r[l] = {
        x: o.parse(u[0], h),
        y: a.parse(u[1], h)
      };
    return r;
  }
  parseObjectData(e, s, n, i) {
    const { xScale: o, yScale: a } = e, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(i);
    let h, u, f, p;
    for (h = 0, u = i; h < u; ++h)
      f = h + n, p = s[f], c[h] = {
        x: o.parse(Zs(p, r), f),
        y: a.parse(Zs(p, l), f)
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
    const i = this.chart, o = this._cachedMeta, a = s[e.axis], r = {
      keys: hm(i, !0),
      values: s._stacks[e.axis]._visualValues
    };
    return of(r, a, o.index, {
      mode: n
    });
  }
  updateRangeFromParsed(e, s, n, i) {
    const o = n[s.axis];
    let a = o === null ? NaN : o;
    const r = i && n._stacks[s.axis];
    i && r && (i.values = r, a = of(i, o, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
  }
  getMinMax(e, s) {
    const n = this._cachedMeta, i = n._parsed, o = n._sorted && e === n.iScale, a = i.length, r = this._getOtherScale(e), l = qx(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = Vx(r);
    let f, p;
    function d() {
      p = i[f];
      const g = p[r.axis];
      return !jt(p[e.axis]) || h > g || u < g;
    }
    for (f = 0; f < a && !(!d() && (this.updateRangeFromParsed(c, e, p, l), o)); ++f)
      ;
    if (o) {
      for (f = a - 1; f >= 0; --f)
        if (!d()) {
          this.updateRangeFromParsed(c, e, p, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(e) {
    const s = this._cachedMeta._parsed, n = [];
    let i, o, a;
    for (i = 0, o = s.length; i < o; ++i)
      a = s[i][e.axis], jt(a) && n.push(a);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = s.iScale, i = s.vScale, o = this.getParsed(e);
    return {
      label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
      value: i ? "" + i.getLabelForValue(o[i.axis]) : ""
    };
  }
  _update(e) {
    const s = this._cachedMeta;
    this.update(e || "default"), s._clip = jx(ut(this.options.clip, $x(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, s = this.chart, n = this._cachedMeta, i = n.data || [], o = s.chartArea, a = [], r = this._drawStart || 0, l = this._drawCount || i.length - r, c = this.options.drawActiveElementsOnTop;
    let h;
    for (n.dataset && n.dataset.draw(e, o, r, l), h = r; h < r + l; ++h) {
      const u = i[h];
      u.hidden || (u.active && c ? a.push(u) : u.draw(e, o));
    }
    for (h = 0; h < a.length; ++h)
      a[h].draw(e, o);
  }
  getStyle(e, s) {
    const n = s ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(e || 0, n);
  }
  getContext(e, s, n) {
    const i = this.getDataset();
    let o;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[e];
      o = a.$context || (a.$context = Ux(this.getContext(), e, a)), o.parsed = this.getParsed(e), o.raw = i.data[e], o.index = o.dataIndex = e;
    } else
      o = this.$context || (this.$context = Gx(this.chart.getContext(), this.index)), o.dataset = i, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = n, o;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, e);
  }
  _resolveElementOptions(e, s = "default", n) {
    const i = s === "active", o = this._cachedDataOpts, a = e + "-" + s, r = o[a], l = this.enableOptionSharing && yo(n);
    if (r)
      return lf(r, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, e), u = i ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], f = c.getOptionScopes(this.getDataset(), h), p = Object.keys(It.elements[e]), d = () => this.getContext(n, i, s), g = c.resolveNamedOptions(f, p, d, u);
    return g.$shared && (g.$shared = l, o[a] = Object.freeze(lf(g, l))), g;
  }
  _resolveAnimations(e, s, n) {
    const i = this.chart, o = this._cachedDataOpts, a = `animation-${s}`, r = o[a];
    if (r)
      return r;
    let l;
    if (i.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, s), f = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(f, this.getContext(e, n, s));
    }
    const c = new cm(i, l && l.animations);
    return l && l._cacheable && (o[a] = Object.freeze(c)), c;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, s) {
    return !s || ll(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, s) {
    const n = this.resolveDataElementOptions(e, s), i = this._sharedOptions, o = this.getSharedOptions(n), a = this.includeOptions(s, o) || o !== i;
    return this.updateSharedOptions(o, s, n), {
      sharedOptions: o,
      includeOptions: a
    };
  }
  updateElement(e, s, n, i) {
    ll(i) ? Object.assign(e, n) : this._resolveAnimations(s, i).update(e, n);
  }
  updateSharedOptions(e, s, n) {
    e && !ll(s) && this._resolveAnimations(void 0, s).update(e, n);
  }
  _setStyle(e, s, n, i) {
    e.active = i;
    const o = this.getStyle(s, i);
    this._resolveAnimations(s, n, i).update(e, {
      options: !i && this.getSharedOptions(o) || o
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
    const i = n.length, o = s.length, a = Math.min(o, i);
    a && this.parse(0, a), o > i ? this._insertElements(i, o - i, e) : o < i && this._removeElements(o, i - o);
  }
  _insertElements(e, s, n = !0) {
    const i = this._cachedMeta, o = i.data, a = e + s;
    let r;
    const l = (c) => {
      for (c.length += s, r = c.length - 1; r >= a; r--)
        c[r] = c[r - s];
    };
    for (l(o), r = e; r < a; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(i._parsed), this.parse(e, s), n && this.updateElements(o, e, s, "reset");
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
function Yx(t, e) {
  if (!t._cache.$bar) {
    const s = t.getMatchingVisibleMetas(e);
    let n = [];
    for (let i = 0, o = s.length; i < o; i++)
      n = n.concat(s[i].controller.getAllParsedValues(t));
    t._cache.$bar = Vg(n.sort((i, o) => i - o));
  }
  return t._cache.$bar;
}
function Kx(t) {
  const e = t.iScale, s = Yx(e, t.type);
  let n = e._length, i, o, a, r;
  const l = () => {
    a === 32767 || a === -32768 || (yo(r) && (n = Math.min(n, Math.abs(a - r) || n)), r = a);
  };
  for (i = 0, o = s.length; i < o; ++i)
    a = e.getPixelForValue(s[i]), l();
  for (r = void 0, i = 0, o = e.ticks.length; i < o; ++i)
    a = e.getPixelForTick(i), l();
  return n;
}
function Jx(t, e, s, n) {
  const i = s.barThickness;
  let o, a;
  return mt(i) ? (o = e.min * s.categoryPercentage, a = s.barPercentage) : (o = i * n, a = 1), {
    chunk: o / n,
    ratio: a,
    start: e.pixels[t] - o / 2
  };
}
function Xx(t, e, s, n) {
  const i = e.pixels, o = i[t];
  let a = t > 0 ? i[t - 1] : null, r = t < i.length - 1 ? i[t + 1] : null;
  const l = s.categoryPercentage;
  a === null && (a = o - (r === null ? e.end - e.start : r - o)), r === null && (r = o + o - a);
  const c = o - (o - Math.min(a, r)) / 2 * l;
  return {
    chunk: Math.abs(r - a) / 2 * l / n,
    ratio: s.barPercentage,
    start: c
  };
}
function Zx(t, e, s, n) {
  const i = s.parse(t[0], n), o = s.parse(t[1], n), a = Math.min(i, o), r = Math.max(i, o);
  let l = a, c = r;
  Math.abs(a) > Math.abs(r) && (l = r, c = a), e[s.axis] = c, e._custom = {
    barStart: l,
    barEnd: c,
    start: i,
    end: o,
    min: a,
    max: r
  };
}
function um(t, e, s, n) {
  return Ft(t) ? Zx(t, e, s, n) : e[s.axis] = s.parse(t, n), e;
}
function cf(t, e, s, n) {
  const i = t.iScale, o = t.vScale, a = i.getLabels(), r = i === o, l = [];
  let c, h, u, f;
  for (c = s, h = s + n; c < h; ++c)
    f = e[c], u = {}, u[i.axis] = r || i.parse(a[c], c), l.push(um(f, u, o, c));
  return l;
}
function cl(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function Qx(t, e, s) {
  return t !== 0 ? is(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= s ? 1 : -1);
}
function tv(t) {
  let e, s, n, i, o;
  return t.horizontal ? (e = t.base > t.x, s = "left", n = "right") : (e = t.base < t.y, s = "bottom", n = "top"), e ? (i = "end", o = "start") : (i = "start", o = "end"), {
    start: s,
    end: n,
    reverse: e,
    top: i,
    bottom: o
  };
}
function ev(t, e, s, n) {
  let i = e.borderSkipped;
  const o = {};
  if (!i) {
    t.borderSkipped = o;
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
  const { start: a, end: r, reverse: l, top: c, bottom: h } = tv(t);
  i === "middle" && s && (t.enableBorderRadius = !0, (s._top || 0) === n ? i = c : (s._bottom || 0) === n ? i = h : (o[hf(h, a, r, l)] = !0, i = c)), o[hf(i, a, r, l)] = !0, t.borderSkipped = o;
}
function hf(t, e, s, n) {
  return n ? (t = sv(t, e, s), t = uf(t, s, e)) : t = uf(t, e, s), t;
}
function sv(t, e, s) {
  return t === e ? s : t === s ? e : t;
}
function uf(t, e, s) {
  return t === "start" ? e : t === "end" ? s : t;
}
function nv(t, { inflateAmount: e }, s) {
  t.inflateAmount = e === "auto" ? s === 1 ? 0.33 : 0 : e;
}
class va extends Ye {
  parsePrimitiveData(e, s, n, i) {
    return cf(e, s, n, i);
  }
  parseArrayData(e, s, n, i) {
    return cf(e, s, n, i);
  }
  parseObjectData(e, s, n, i) {
    const { iScale: o, vScale: a } = e, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? r : l, h = a.axis === "x" ? r : l, u = [];
    let f, p, d, g;
    for (f = n, p = n + i; f < p; ++f)
      g = s[f], d = {}, d[o.axis] = o.parse(Zs(g, c), f), u.push(um(Zs(g, h), d, a, f));
    return u;
  }
  updateRangeFromParsed(e, s, n, i) {
    super.updateRangeFromParsed(e, s, n, i);
    const o = n._custom;
    o && s === this._cachedMeta.vScale && (e.min = Math.min(e.min, o.min), e.max = Math.max(e.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, { iScale: n, vScale: i } = s, o = this.getParsed(e), a = o._custom, r = cl(a) ? "[" + a.start + ", " + a.end + "]" : "" + i.getLabelForValue(o[i.axis]);
    return {
      label: "" + n.getLabelForValue(o[n.axis]),
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
    const o = i === "reset", { index: a, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), h = this._getRuler(), { sharedOptions: u, includeOptions: f } = this._getSharedOptions(s, i);
    for (let p = s; p < s + n; p++) {
      const d = this.getParsed(p), g = o || mt(d[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), m = this._calculateBarIndexPixels(p, h), _ = (d._stacks || {})[r.axis], y = {
        horizontal: c,
        base: g.base,
        enableBorderRadius: !_ || cl(d._custom) || a === _._top || a === _._bottom,
        x: c ? g.head : m.center,
        y: c ? m.center : g.head,
        height: c ? m.size : Math.abs(g.size),
        width: c ? Math.abs(g.size) : m.size
      };
      f && (y.options = u || this.resolveDataElementOptions(p, e[p].active ? "active" : i));
      const b = y.options || e[p].options;
      ev(y, b, _, a), nv(y, b, h.ratio), this.updateElement(e[p], p, y, i);
    }
  }
  _getStacks(e, s) {
    const { iScale: n } = this._cachedMeta, i = n.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), o = n.options.stacked, a = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (h) => {
      const u = h._parsed.find((p) => p[n.axis] === l), f = u && u[h.vScale.axis];
      if (mt(f) || isNaN(f))
        return !0;
    };
    for (const h of i)
      if (!(s !== void 0 && c(h)) && ((o === !1 || a.indexOf(h.stack) === -1 || o === void 0 && h.stack === void 0) && a.push(h.stack), h.index === e))
        break;
    return a.length || a.push(void 0), a;
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
    const i = this._getStacks(e, n), o = s !== void 0 ? i.indexOf(s) : -1;
    return o === -1 ? i.length - 1 : o;
  }
  _getRuler() {
    const e = this.options, s = this._cachedMeta, n = s.iScale, i = [];
    let o, a;
    for (o = 0, a = s.data.length; o < a; ++o)
      i.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
    const r = e.barThickness;
    return {
      min: r || Kx(s),
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
    const { _cachedMeta: { vScale: s, _stacked: n, index: i }, options: { base: o, minBarLength: a } } = this, r = o || 0, l = this.getParsed(e), c = l._custom, h = cl(c);
    let u = l[s.axis], f = 0, p = n ? this.applyStack(s, l, n) : u, d, g;
    p !== u && (f = p - u, p = u), h && (u = c.barStart, p = c.barEnd - c.barStart, u !== 0 && is(u) !== is(c.barEnd) && (f = 0), f += u);
    const m = !mt(o) && !h ? o : f;
    let _ = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(e) ? d = s.getPixelForValue(f + p) : d = _, g = d - _, Math.abs(g) < a) {
      g = Qx(g, s, r) * a, u === r && (_ -= g / 2);
      const y = s.getPixelForDecimal(0), b = s.getPixelForDecimal(1), x = Math.min(y, b), v = Math.max(y, b);
      _ = Math.max(Math.min(_, v), x), d = _ + g, n && !h && (l._stacks[s.axis]._visualValues[i] = s.getValueForPixel(d) - s.getValueForPixel(_));
    }
    if (_ === s.getPixelForValue(r)) {
      const y = is(g) * s.getLineWidthForValue(r) / 2;
      _ += y, g -= y;
    }
    return {
      size: g,
      base: _,
      head: d,
      center: d + g / 2
    };
  }
  _calculateBarIndexPixels(e, s) {
    const n = s.scale, i = this.options, o = i.skipNull, a = ut(i.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const h = o ? this._getStackCount(e) : s.stackCount, u = i.barThickness === "flex" ? Xx(e, s, i, h * c) : Jx(e, s, i, h * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(ut(f, this.getFirstScaleIdForIndexAxis())), d = this._getStackIndex(this.index, this._cachedMeta.stack, o ? e : void 0) + p;
      r = u.start + u.chunk * d + u.chunk / 2, l = Math.min(a, u.chunk * u.ratio);
    } else
      r = n.getPixelForValue(this.getParsed(e)[n.axis], e), l = Math.min(a, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const e = this._cachedMeta, s = e.vScale, n = e.data, i = n.length;
    let o = 0;
    for (; o < i; ++o)
      this.getParsed(o)[s.axis] !== null && !n[o].hidden && n[o].draw(this._ctx);
  }
}
Q(va, "id", "bar"), Q(va, "defaults", {
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
}), Q(va, "overrides", {
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
class Sa extends Ye {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(e, s, n, i) {
    const o = super.parsePrimitiveData(e, s, n, i);
    for (let a = 0; a < o.length; a++)
      o[a]._custom = this.resolveDataElementOptions(a + n).radius;
    return o;
  }
  parseArrayData(e, s, n, i) {
    const o = super.parseArrayData(e, s, n, i);
    for (let a = 0; a < o.length; a++) {
      const r = s[n + a];
      o[a]._custom = ut(r[2], this.resolveDataElementOptions(a + n).radius);
    }
    return o;
  }
  parseObjectData(e, s, n, i) {
    const o = super.parseObjectData(e, s, n, i);
    for (let a = 0; a < o.length; a++) {
      const r = s[n + a];
      o[a]._custom = ut(r && r.r && +r.r, this.resolveDataElementOptions(a + n).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const e = this._cachedMeta.data;
    let s = 0;
    for (let n = e.length - 1; n >= 0; --n)
      s = Math.max(s, e[n].size(this.resolveDataElementOptions(n)) / 2);
    return s > 0 && s;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart.data.labels || [], { xScale: i, yScale: o } = s, a = this.getParsed(e), r = i.getLabelForValue(a.x), l = o.getLabelForValue(a.y), c = a._custom;
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
    const o = i === "reset", { iScale: a, vScale: r } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(s, i), h = a.axis, u = r.axis;
    for (let f = s; f < s + n; f++) {
      const p = e[f], d = !o && this.getParsed(f), g = {}, m = g[h] = o ? a.getPixelForDecimal(0.5) : a.getPixelForValue(d[h]), _ = g[u] = o ? r.getBasePixel() : r.getPixelForValue(d[u]);
      g.skip = isNaN(m) || isNaN(_), c && (g.options = l || this.resolveDataElementOptions(f, p.active ? "active" : i), o && (g.options.radius = 0)), this.updateElement(p, f, g, i);
    }
  }
  resolveDataElementOptions(e, s) {
    const n = this.getParsed(e);
    let i = super.resolveDataElementOptions(e, s);
    i.$shared && (i = Object.assign({}, i, {
      $shared: !1
    }));
    const o = i.radius;
    return s !== "active" && (i.radius = 0), i.radius += ut(n && n._custom, o), i;
  }
}
Q(Sa, "id", "bubble"), Q(Sa, "defaults", {
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
}), Q(Sa, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function iv(t, e, s) {
  let n = 1, i = 1, o = 0, a = 0;
  if (e < Ot) {
    const r = t, l = r + e, c = Math.cos(r), h = Math.sin(r), u = Math.cos(l), f = Math.sin(l), p = (b, x, v) => bo(b, r, l, !0) ? 1 : Math.max(x, x * s, v, v * s), d = (b, x, v) => bo(b, r, l, !0) ? -1 : Math.min(x, x * s, v, v * s), g = p(0, c, u), m = p(qt, h, f), _ = d(vt, c, u), y = d(vt + qt, h, f);
    n = (g - _) / 2, i = (m - y) / 2, o = -(g + _) / 2, a = -(m + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: i,
    offsetX: o,
    offsetY: a
  };
}
class mn extends Ye {
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
      let o = (l) => +n[l];
      if (bt(n[e])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +Zs(n[c], l);
      }
      let a, r;
      for (a = e, r = e + s; a < r; ++a)
        i._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return ze(this.options.rotation - 90);
  }
  _getCircumference() {
    return ze(this.options.circumference);
  }
  _getRotationExtents() {
    let e = Ot, s = -Ot;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const i = this.chart.getDatasetMeta(n).controller, o = i._getRotation(), a = i._getCircumference();
        e = Math.min(e, o), s = Math.max(s, o + a);
      }
    return {
      rotation: e,
      circumference: s - e
    };
  }
  update(e) {
    const s = this.chart, { chartArea: n } = s, i = this._cachedMeta, o = i.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - a) / 2, 0), l = Math.min(m_(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: u } = this._getRotationExtents(), { ratioX: f, ratioY: p, offsetX: d, offsetY: g } = iv(u, h, l), m = (n.width - a) / f, _ = (n.height - a) / p, y = Math.max(Math.min(m, _) / 2, 0), b = Bg(this.options.radius, y), x = Math.max(b * l, 0), v = (b - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = d * b, this.offsetY = g * b, i.total = this.calculateTotal(), this.outerRadius = b - v * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v * c, 0), this.updateElements(o, 0, o.length, e);
  }
  _circumference(e, s) {
    const n = this.options, i = this._cachedMeta, o = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(e) || i._parsed[e] === null || i.data[e].hidden ? 0 : this.calculateCircumference(i._parsed[e] * o / Ot);
  }
  updateElements(e, s, n, i) {
    const o = i === "reset", a = this.chart, r = a.chartArea, c = a.options.animation, h = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, f = o && c.animateScale, p = f ? 0 : this.innerRadius, d = f ? 0 : this.outerRadius, { sharedOptions: g, includeOptions: m } = this._getSharedOptions(s, i);
    let _ = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      _ += this._circumference(y, o);
    for (y = s; y < s + n; ++y) {
      const b = this._circumference(y, o), x = e[y], v = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: _,
        endAngle: _ + b,
        circumference: b,
        outerRadius: d,
        innerRadius: p
      };
      m && (v.options = g || this.resolveDataElementOptions(y, x.active ? "active" : i)), _ += b, this.updateElement(x, y, v, i);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, s = e.data;
    let n = 0, i;
    for (i = 0; i < s.length; i++) {
      const o = e._parsed[i];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(i) && !s[i].hidden && (n += Math.abs(o));
    }
    return n;
  }
  calculateCircumference(e) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(e) ? Ot * (Math.abs(e) / s) : 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], o = Io(s._parsed[e], n.options.locale);
    return {
      label: i[e] || "",
      value: o
    };
  }
  getMaxBorderWidth(e) {
    let s = 0;
    const n = this.chart;
    let i, o, a, r, l;
    if (!e) {
      for (i = 0, o = n.data.datasets.length; i < o; ++i)
        if (n.isDatasetVisible(i)) {
          a = n.getDatasetMeta(i), e = a.data, r = a.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (i = 0, o = e.length; i < o; ++i)
      l = r.resolveDataElementOptions(i), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(e) {
    let s = 0;
    for (let n = 0, i = e.length; n < i; ++n) {
      const o = this.resolveDataElementOptions(n);
      s = Math.max(s, o.offset || 0, o.hoverOffset || 0);
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
Q(mn, "id", "doughnut"), Q(mn, "defaults", {
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
}), Q(mn, "descriptors", {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}), Q(mn, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const s = e.data, { labels: { pointStyle: n, textAlign: i, color: o, useBorderRadius: a, borderRadius: r } } = e.legend.options;
          return s.labels.length && s.datasets.length ? s.labels.map((l, c) => {
            const u = e.getDatasetMeta(0).controller.getStyle(c);
            return {
              text: l,
              fillStyle: u.backgroundColor,
              fontColor: o,
              hidden: !e.getDataVisibility(c),
              lineDash: u.borderDash,
              lineDashOffset: u.borderDashOffset,
              lineJoin: u.borderJoinStyle,
              lineWidth: u.borderWidth,
              strokeStyle: u.borderColor,
              textAlign: i,
              pointStyle: n,
              borderRadius: a && (r || u.borderRadius),
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
class wa extends Ye {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const s = this._cachedMeta, { dataset: n, data: i = [], _dataset: o } = s, a = this.chart._animationsDisabled;
    let { start: r, count: l } = Ug(s, i, a);
    this._drawStart = r, this._drawCount = l, qg(s) && (r = 0, l = i.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = i;
    const c = this.resolveDatasetElementOptions(e);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !a,
      options: c
    }, e), this.updateElements(i, r, l, e);
  }
  updateElements(e, s, n, i) {
    const o = i === "reset", { iScale: a, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(s, i), f = a.axis, p = r.axis, { spanGaps: d, segment: g } = this.options, m = di(d) ? d : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || i === "none", y = s + n, b = e.length;
    let x = s > 0 && this.getParsed(s - 1);
    for (let v = 0; v < b; ++v) {
      const k = e[v], S = _ ? k : {};
      if (v < s || v >= y) {
        S.skip = !0;
        continue;
      }
      const C = this.getParsed(v), D = mt(C[p]), O = S[f] = a.getPixelForValue(C[f], v), I = S[p] = o || D ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, C, l) : C[p], v);
      S.skip = isNaN(O) || isNaN(I) || D, S.stop = v > 0 && Math.abs(C[f] - x[f]) > m, g && (S.parsed = C, S.raw = c.data[v]), u && (S.options = h || this.resolveDataElementOptions(v, k.active ? "active" : i)), _ || this.updateElement(k, v, S, i), x = C;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, s = e.dataset, n = s.options && s.options.borderWidth || 0, i = e.data || [];
    if (!i.length)
      return n;
    const o = i[0].size(this.resolveDataElementOptions(0)), a = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(n, o, a) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
}
Q(wa, "id", "line"), Q(wa, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Q(wa, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class to extends Ye {
  constructor(e, s) {
    super(e, s), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], o = Io(s._parsed[e].r, n.options.locale);
    return {
      label: i[e] || "",
      value: o
    };
  }
  parseObjectData(e, s, n, i) {
    return em.bind(this)(e, s, n, i);
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
      const o = this.getParsed(i).r;
      !isNaN(o) && this.chart.getDataVisibility(i) && (o < s.min && (s.min = o), o > s.max && (s.max = o));
    }), s;
  }
  _updateRadius() {
    const e = this.chart, s = e.chartArea, n = e.options, i = Math.min(s.right - s.left, s.bottom - s.top), o = Math.max(i / 2, 0), a = Math.max(n.cutoutPercentage ? o / 100 * n.cutoutPercentage : 1, 0), r = (o - a) / e.getVisibleDatasetCount();
    this.outerRadius = o - r * this.index, this.innerRadius = this.outerRadius - r;
  }
  updateElements(e, s, n, i) {
    const o = i === "reset", a = this.chart, l = a.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, u = c.yCenter, f = c.getIndexAngle(0) - 0.5 * vt;
    let p = f, d;
    const g = 360 / this.countVisibleElements();
    for (d = 0; d < s; ++d)
      p += this._computeAngle(d, i, g);
    for (d = s; d < s + n; d++) {
      const m = e[d];
      let _ = p, y = p + this._computeAngle(d, i, g), b = a.getDataVisibility(d) ? c.getDistanceFromCenterForValue(this.getParsed(d).r) : 0;
      p = y, o && (l.animateScale && (b = 0), l.animateRotate && (_ = y = f));
      const x = {
        x: h,
        y: u,
        innerRadius: 0,
        outerRadius: b,
        startAngle: _,
        endAngle: y,
        options: this.resolveDataElementOptions(d, m.active ? "active" : i)
      };
      this.updateElement(m, d, x, i);
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
Q(to, "id", "polarArea"), Q(to, "defaults", {
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
}), Q(to, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const s = e.data;
          if (s.labels.length && s.datasets.length) {
            const { labels: { pointStyle: n, color: i } } = e.legend.options;
            return s.labels.map((o, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: i,
                lineWidth: l.borderWidth,
                pointStyle: n,
                hidden: !e.getDataVisibility(a),
                index: a
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
class tc extends mn {
}
Q(tc, "id", "pie"), Q(tc, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class Ca extends Ye {
  getLabelAndValue(e) {
    const s = this._cachedMeta.vScale, n = this.getParsed(e);
    return {
      label: s.getLabels()[e],
      value: "" + s.getLabelForValue(n[s.axis])
    };
  }
  parseObjectData(e, s, n, i) {
    return em.bind(this)(e, s, n, i);
  }
  update(e) {
    const s = this._cachedMeta, n = s.dataset, i = s.data || [], o = s.iScale.getLabels();
    if (n.points = i, e !== "resize") {
      const a = this.resolveDatasetElementOptions(e);
      this.options.showLine || (a.borderWidth = 0);
      const r = {
        _loop: !0,
        _fullLoop: o.length === i.length,
        options: a
      };
      this.updateElement(n, void 0, r, e);
    }
    this.updateElements(i, 0, i.length, e);
  }
  updateElements(e, s, n, i) {
    const o = this._cachedMeta.rScale, a = i === "reset";
    for (let r = s; r < s + n; r++) {
      const l = e[r], c = this.resolveDataElementOptions(r, l.active ? "active" : i), h = o.getPointPositionForValue(r, this.getParsed(r).r), u = a ? o.xCenter : h.x, f = a ? o.yCenter : h.y, p = {
        x: u,
        y: f,
        angle: h.angle,
        skip: isNaN(u) || isNaN(f),
        options: c
      };
      this.updateElement(l, r, p, i);
    }
  }
}
Q(Ca, "id", "radar"), Q(Ca, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), Q(Ca, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class ka extends Ye {
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart.data.labels || [], { xScale: i, yScale: o } = s, a = this.getParsed(e), r = i.getLabelForValue(a.x), l = o.getLabelForValue(a.y);
    return {
      label: n[e] || "",
      value: "(" + r + ", " + l + ")"
    };
  }
  update(e) {
    const s = this._cachedMeta, { data: n = [] } = s, i = this.chart._animationsDisabled;
    let { start: o, count: a } = Ug(s, n, i);
    if (this._drawStart = o, this._drawCount = a, qg(s) && (o = 0, a = n.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: r, _dataset: l } = s;
      r._chart = this.chart, r._datasetIndex = this.index, r._decimated = !!l._decimated, r.points = n;
      const c = this.resolveDatasetElementOptions(e);
      c.segment = this.options.segment, this.updateElement(r, void 0, {
        animated: !i,
        options: c
      }, e);
    } else this.datasetElementType && (delete s.dataset, this.datasetElementType = !1);
    this.updateElements(n, o, a, e);
  }
  addElements() {
    const { showLine: e } = this.options;
    !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(e, s, n, i) {
    const o = i === "reset", { iScale: a, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(s, i), u = this.getSharedOptions(h), f = this.includeOptions(i, u), p = a.axis, d = r.axis, { spanGaps: g, segment: m } = this.options, _ = di(g) ? g : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || o || i === "none";
    let b = s > 0 && this.getParsed(s - 1);
    for (let x = s; x < s + n; ++x) {
      const v = e[x], k = this.getParsed(x), S = y ? v : {}, C = mt(k[d]), D = S[p] = a.getPixelForValue(k[p], x), O = S[d] = o || C ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, k, l) : k[d], x);
      S.skip = isNaN(D) || isNaN(O) || C, S.stop = x > 0 && Math.abs(k[p] - b[p]) > _, m && (S.parsed = k, S.raw = c.data[x]), f && (S.options = u || this.resolveDataElementOptions(x, v.active ? "active" : i)), y || this.updateElement(v, x, S, i), b = k;
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
    const o = s[0].size(this.resolveDataElementOptions(0)), a = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(i, o, a) / 2;
  }
}
Q(ka, "id", "scatter"), Q(ka, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), Q(ka, "overrides", {
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
var ov = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: va,
  BubbleController: Sa,
  DoughnutController: mn,
  LineController: wa,
  PieController: tc,
  PolarAreaController: to,
  RadarController: Ca,
  ScatterController: ka
});
function ln() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class yh {
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
    Object.assign(yh.prototype, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ln();
  }
  parse() {
    return ln();
  }
  format() {
    return ln();
  }
  add() {
    return ln();
  }
  diff() {
    return ln();
  }
  startOf() {
    return ln();
  }
  endOf() {
    return ln();
  }
}
var av = {
  _date: yh
};
function rv(t, e, s, n) {
  const { controller: i, data: o, _sorted: a } = t, r = i._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (r && e === r.axis && e !== "r" && a && o.length) {
    const c = r._reversePixels ? T_ : xs;
    if (n) {
      if (i._sharedOptions) {
        const h = o[0], u = typeof h.getRange == "function" && h.getRange(e);
        if (u) {
          const f = c(o, e, s - u), p = c(o, e, s + u);
          return {
            lo: f.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const h = c(o, e, s);
      if (l) {
        const { vScale: u } = i._cachedMeta, { _parsed: f } = t, p = f.slice(0, h.lo + 1).reverse().findIndex((g) => !mt(g[u.axis]));
        h.lo -= Math.max(0, p);
        const d = f.slice(h.hi).findIndex((g) => !mt(g[u.axis]));
        h.hi += Math.max(0, d);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Nr(t, e, s, n, i) {
  const o = t.getSortedVisibleDatasetMetas(), a = s[e];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: c, data: h } = o[r], { lo: u, hi: f } = rv(o[r], e, a, i);
    for (let p = u; p <= f; ++p) {
      const d = h[p];
      d.skip || n(d, c, p);
    }
  }
}
function lv(t) {
  const e = t.indexOf("x") !== -1, s = t.indexOf("y") !== -1;
  return function(n, i) {
    const o = e ? Math.abs(n.x - i.x) : 0, a = s ? Math.abs(n.y - i.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function hl(t, e, s, n, i) {
  const o = [];
  return !i && !t.isPointInArea(e) || Nr(t, s, e, function(r, l, c) {
    !i && !vs(r, t.chartArea, 0) || r.inRange(e.x, e.y, n) && o.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function cv(t, e, s, n) {
  let i = [];
  function o(a, r, l) {
    const { startAngle: c, endAngle: h } = a.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: u } = Wg(a, {
      x: e.x,
      y: e.y
    });
    bo(u, c, h) && i.push({
      element: a,
      datasetIndex: r,
      index: l
    });
  }
  return Nr(t, s, e, o), i;
}
function hv(t, e, s, n, i, o) {
  let a = [];
  const r = lv(s);
  let l = Number.POSITIVE_INFINITY;
  function c(h, u, f) {
    const p = h.inRange(e.x, e.y, i);
    if (n && !p)
      return;
    const d = h.getCenterPoint(i);
    if (!(!!o || t.isPointInArea(d)) && !p)
      return;
    const m = r(e, d);
    m < l ? (a = [
      {
        element: h,
        datasetIndex: u,
        index: f
      }
    ], l = m) : m === l && a.push({
      element: h,
      datasetIndex: u,
      index: f
    });
  }
  return Nr(t, s, e, c), a;
}
function ul(t, e, s, n, i, o) {
  return !o && !t.isPointInArea(e) ? [] : s === "r" && !n ? cv(t, e, s, i) : hv(t, e, s, n, i, o);
}
function ff(t, e, s, n, i) {
  const o = [], a = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Nr(t, s, e, (l, c, h) => {
    l[a] && l[a](e[s], i) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), r = r || l.inRange(e.x, e.y, i));
  }), n && !r ? [] : o;
}
var uv = {
  modes: {
    index(t, e, s, n) {
      const i = fn(e, t), o = s.axis || "x", a = s.includeInvisible || !1, r = s.intersect ? hl(t, i, o, n, a) : ul(t, i, o, !1, n, a), l = [];
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
      const i = fn(e, t), o = s.axis || "xy", a = s.includeInvisible || !1;
      let r = s.intersect ? hl(t, i, o, n, a) : ul(t, i, o, !1, n, a);
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
      const i = fn(e, t), o = s.axis || "xy", a = s.includeInvisible || !1;
      return hl(t, i, o, n, a);
    },
    nearest(t, e, s, n) {
      const i = fn(e, t), o = s.axis || "xy", a = s.includeInvisible || !1;
      return ul(t, i, o, s.intersect, n, a);
    },
    x(t, e, s, n) {
      const i = fn(e, t);
      return ff(t, i, "x", s.intersect, n);
    },
    y(t, e, s, n) {
      const i = fn(e, t);
      return ff(t, i, "y", s.intersect, n);
    }
  }
};
const fm = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ai(t, e) {
  return t.filter((s) => s.pos === e);
}
function df(t, e) {
  return t.filter((s) => fm.indexOf(s.pos) === -1 && s.box.axis === e);
}
function Pi(t, e) {
  return t.sort((s, n) => {
    const i = e ? n : s, o = e ? s : n;
    return i.weight === o.weight ? i.index - o.index : i.weight - o.weight;
  });
}
function fv(t) {
  const e = [];
  let s, n, i, o, a, r;
  for (s = 0, n = (t || []).length; s < n; ++s)
    i = t[s], { position: o, options: { stack: a, stackWeight: r = 1 } } = i, e.push({
      index: s,
      box: i,
      pos: o,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: a && o + a,
      stackWeight: r
    });
  return e;
}
function dv(t) {
  const e = {};
  for (const s of t) {
    const { stack: n, pos: i, stackWeight: o } = s;
    if (!n || !fm.includes(i))
      continue;
    const a = e[n] || (e[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += o;
  }
  return e;
}
function pv(t, e) {
  const s = dv(t), { vBoxMaxWidth: n, hBoxMaxHeight: i } = e;
  let o, a, r;
  for (o = 0, a = t.length; o < a; ++o) {
    r = t[o];
    const { fullSize: l } = r.box, c = s[r.stack], h = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = h ? h * n : l && e.availableWidth, r.height = i) : (r.width = n, r.height = h ? h * i : l && e.availableHeight);
  }
  return s;
}
function gv(t) {
  const e = fv(t), s = Pi(e.filter((c) => c.box.fullSize), !0), n = Pi(Ai(e, "left"), !0), i = Pi(Ai(e, "right")), o = Pi(Ai(e, "top"), !0), a = Pi(Ai(e, "bottom")), r = df(e, "x"), l = df(e, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(o),
    rightAndBottom: i.concat(l).concat(a).concat(r),
    chartArea: Ai(e, "chartArea"),
    vertical: n.concat(i).concat(l),
    horizontal: o.concat(a).concat(r)
  };
}
function pf(t, e, s, n) {
  return Math.max(t[s], e[s]) + Math.max(t[n], e[n]);
}
function dm(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function mv(t, e, s, n) {
  const { pos: i, box: o } = s, a = t.maxPadding;
  if (!bt(i)) {
    s.size && (t[i] -= s.size);
    const u = n[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? o.height : o.width), s.size = u.size / u.count, t[i] += s.size;
  }
  o.getPadding && dm(a, o.getPadding());
  const r = Math.max(0, e.outerWidth - pf(a, t, "left", "right")), l = Math.max(0, e.outerHeight - pf(a, t, "top", "bottom")), c = r !== t.w, h = l !== t.h;
  return t.w = r, t.h = l, s.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function yv(t) {
  const e = t.maxPadding;
  function s(n) {
    const i = Math.max(e[n] - t[n], 0);
    return t[n] += i, i;
  }
  t.y += s("top"), t.x += s("left"), s("right"), s("bottom");
}
function bv(t, e) {
  const s = e.maxPadding;
  function n(i) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return i.forEach((a) => {
      o[a] = Math.max(e[a], s[a]);
    }), o;
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
  let o, a, r, l, c, h;
  for (o = 0, a = t.length, c = 0; o < a; ++o) {
    r = t[o], l = r.box, l.update(r.width || e.w, r.height || e.h, bv(r.horizontal, e));
    const { same: u, other: f } = mv(e, s, r, n);
    c |= u && i.length, h = h || f, l.fullSize || i.push(r);
  }
  return c && Ni(i, e, s, n) || h;
}
function oa(t, e, s, n, i) {
  t.top = s, t.left = e, t.right = e + n, t.bottom = s + i, t.width = n, t.height = i;
}
function gf(t, e, s, n) {
  const i = s.padding;
  let { x: o, y: a } = e;
  for (const r of t) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, h = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const u = e.w * h, f = c.size || l.height;
      yo(c.start) && (a = c.start), l.fullSize ? oa(l, i.left, a, s.outerWidth - i.right - i.left, f) : oa(l, e.left + c.placed, a, u, f), c.start = a, c.placed += u, a = l.bottom;
    } else {
      const u = e.h * h, f = c.size || l.width;
      yo(c.start) && (o = c.start), l.fullSize ? oa(l, o, i.top, f, s.outerHeight - i.bottom - i.top) : oa(l, o, e.top + c.placed, f, u), c.start = o, c.placed += u, o = l.right;
    }
  }
  e.x = o, e.y = a;
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
    const i = me(t.options.layout.padding), o = Math.max(e - i.width, 0), a = Math.max(s - i.height, 0), r = gv(t.boxes), l = r.vertical, c = r.horizontal;
    At(t.boxes, (g) => {
      typeof g.beforeLayout == "function" && g.beforeLayout();
    });
    const h = l.reduce((g, m) => m.box.options && m.box.options.display === !1 ? g : g + 1, 0) || 1, u = Object.freeze({
      outerWidth: e,
      outerHeight: s,
      padding: i,
      availableWidth: o,
      availableHeight: a,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: a / 2
    }), f = Object.assign({}, i);
    dm(f, me(n));
    const p = Object.assign({
      maxPadding: f,
      w: o,
      h: a,
      x: i.left,
      y: i.top
    }, i), d = pv(l.concat(c), u);
    Ni(r.fullSize, p, u, d), Ni(l, p, u, d), Ni(c, p, u, d) && Ni(l, p, u, d), yv(p), gf(r.leftAndTop, p, u, d), p.x += p.w, p.y += p.h, gf(r.rightAndBottom, p, u, d), t.chartArea = {
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
class pm {
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
class _v extends pm {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Ma = "$chartjs", xv = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, mf = (t) => t === null || t === "";
function vv(t, e) {
  const s = t.style, n = t.getAttribute("height"), i = t.getAttribute("width");
  if (t[Ma] = {
    initial: {
      height: n,
      width: i,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", mf(i)) {
    const o = Zu(t, "width");
    o !== void 0 && (t.width = o);
  }
  if (mf(n))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const o = Zu(t, "height");
      o !== void 0 && (t.height = o);
    }
  return t;
}
const gm = Sx ? {
  passive: !0
} : !1;
function Sv(t, e, s) {
  t && t.addEventListener(e, s, gm);
}
function wv(t, e, s) {
  t && t.canvas && t.canvas.removeEventListener(e, s, gm);
}
function Cv(t, e) {
  const s = xv[t.type] || t.type, { x: n, y: i } = fn(t, e);
  return {
    type: s,
    chart: e,
    native: t,
    x: n !== void 0 ? n : null,
    y: i !== void 0 ? i : null
  };
}
function lr(t, e) {
  for (const s of t)
    if (s === e || s.contains(e))
      return !0;
}
function kv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((o) => {
    let a = !1;
    for (const r of o)
      a = a || lr(r.addedNodes, n), a = a && !lr(r.removedNodes, n);
    a && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function Mv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((o) => {
    let a = !1;
    for (const r of o)
      a = a || lr(r.removedNodes, n), a = a && !lr(r.addedNodes, n);
    a && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const xo = /* @__PURE__ */ new Map();
let yf = 0;
function mm() {
  const t = window.devicePixelRatio;
  t !== yf && (yf = t, xo.forEach((e, s) => {
    s.currentDevicePixelRatio !== t && e();
  }));
}
function Av(t, e) {
  xo.size || window.addEventListener("resize", mm), xo.set(t, e);
}
function Pv(t) {
  xo.delete(t), xo.size || window.removeEventListener("resize", mm);
}
function Tv(t, e, s) {
  const n = t.canvas, i = n && mh(n);
  if (!i)
    return;
  const o = Gg((r, l) => {
    const c = i.clientWidth;
    s(r, l), c < i.clientWidth && s();
  }, window), a = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return a.observe(i), Av(t, o), a;
}
function fl(t, e, s) {
  s && s.disconnect(), e === "resize" && Pv(t);
}
function Dv(t, e, s) {
  const n = t.canvas, i = Gg((o) => {
    t.ctx !== null && s(Cv(o, t));
  }, t);
  return Sv(n, e, i), i;
}
class Rv extends pm {
  acquireContext(e, s) {
    const n = e && e.getContext && e.getContext("2d");
    return n && n.canvas === e ? (vv(e, s), n) : null;
  }
  releaseContext(e) {
    const s = e.canvas;
    if (!s[Ma])
      return !1;
    const n = s[Ma].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const a = n[o];
      mt(a) ? s.removeAttribute(o) : s.setAttribute(o, a);
    });
    const i = n.style || {};
    return Object.keys(i).forEach((o) => {
      s.style[o] = i[o];
    }), s.width = s.width, delete s[Ma], !0;
  }
  addEventListener(e, s, n) {
    this.removeEventListener(e, s);
    const i = e.$proxies || (e.$proxies = {}), a = {
      attach: kv,
      detach: Mv,
      resize: Tv
    }[s] || Dv;
    i[s] = a(e, s, n);
  }
  removeEventListener(e, s) {
    const n = e.$proxies || (e.$proxies = {}), i = n[s];
    if (!i)
      return;
    ({
      attach: fl,
      detach: fl,
      resize: fl
    }[s] || wv)(e, s, i), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, s, n, i) {
    return vx(e, s, n, i);
  }
  isAttached(e) {
    const s = e && mh(e);
    return !!(s && s.isConnected);
  }
}
function Lv(t) {
  return !gh() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? _v : Rv;
}
var ma;
let Os = (ma = class {
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
    return di(this.x) && di(this.y);
  }
  getProps(e, s) {
    const n = this.$animations;
    if (!s || !n)
      return this;
    const i = {};
    return e.forEach((o) => {
      i[o] = n[o] && n[o].active() ? n[o]._to : this[o];
    }), i;
  }
}, Q(ma, "defaults", {}), Q(ma, "defaultRoutes"), ma);
function Ov(t, e) {
  const s = t.options.ticks, n = Fv(t), i = Math.min(s.maxTicksLimit || n, n), o = s.major.enabled ? Iv(e) : [], a = o.length, r = o[0], l = o[a - 1], c = [];
  if (a > i)
    return Nv(e, c, o, a / i), c;
  const h = Ev(o, e, i);
  if (a > 0) {
    let u, f;
    const p = a > 1 ? Math.round((l - r) / (a - 1)) : null;
    for (aa(e, c, h, mt(p) ? 0 : r - p, r), u = 0, f = a - 1; u < f; u++)
      aa(e, c, h, o[u], o[u + 1]);
    return aa(e, c, h, l, mt(p) ? e.length : l + p), c;
  }
  return aa(e, c, h), c;
}
function Fv(t) {
  const e = t.options.offset, s = t._tickSize(), n = t._length / s + (e ? 0 : 1), i = t._maxLength / s;
  return Math.floor(Math.min(n, i));
}
function Ev(t, e, s) {
  const n = Bv(t), i = e.length / s;
  if (!n)
    return Math.max(i, 1);
  const o = C_(n);
  for (let a = 0, r = o.length - 1; a < r; a++) {
    const l = o[a];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Iv(t) {
  const e = [];
  let s, n;
  for (s = 0, n = t.length; s < n; s++)
    t[s].major && e.push(s);
  return e;
}
function Nv(t, e, s, n) {
  let i = 0, o = s[0], a;
  for (n = Math.ceil(n), a = 0; a < t.length; a++)
    a === o && (e.push(t[a]), i++, o = s[i * n]);
}
function aa(t, e, s, n, i) {
  const o = ut(n, 0), a = Math.min(ut(i, t.length), t.length);
  let r = 0, l, c, h;
  for (s = Math.ceil(s), i && (l = i - n, s = l / Math.floor(l / s)), h = o; h < 0; )
    r++, h = Math.round(o + r * s);
  for (c = Math.max(o, 0); c < a; c++)
    c === h && (e.push(t[c]), r++, h = Math.round(o + r * s));
}
function Bv(t) {
  const e = t.length;
  let s, n;
  if (e < 2)
    return !1;
  for (n = t[0], s = 1; s < e; ++s)
    if (t[s] - t[s - 1] !== n)
      return !1;
  return n;
}
const $v = (t) => t === "left" ? "right" : t === "right" ? "left" : t, bf = (t, e, s) => e === "top" || e === "left" ? t[e] + s : t[e] - s, _f = (t, e) => Math.min(e || t, t);
function xf(t, e) {
  const s = [], n = t.length / e, i = t.length;
  let o = 0;
  for (; o < i; o += n)
    s.push(t[Math.floor(o)]);
  return s;
}
function jv(t, e, s) {
  const n = t.ticks.length, i = Math.min(e, n - 1), o = t._startPixel, a = t._endPixel, r = 1e-6;
  let l = t.getPixelForTick(i), c;
  if (!(s && (n === 1 ? c = Math.max(l - o, a - l) : e === 0 ? c = (t.getPixelForTick(1) - l) / 2 : c = (l - t.getPixelForTick(i - 1)) / 2, l += i < e ? c : -c, l < o - r || l > a + r)))
    return l;
}
function Wv(t, e) {
  At(t, (s) => {
    const n = s.gc, i = n.length / 2;
    let o;
    if (i > e) {
      for (o = 0; o < i; ++o)
        delete s.data[n[o]];
      n.splice(0, i);
    }
  });
}
function Ti(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function vf(t, e) {
  if (!t.display)
    return 0;
  const s = Zt(t.font, e), n = me(t.padding);
  return (Ft(t.text) ? t.text.length : 1) * s.lineHeight + n.height;
}
function Hv(t, e) {
  return tn(t, {
    scale: e,
    type: "scale"
  });
}
function Vv(t, e, s) {
  return tn(t, {
    tick: s,
    index: e,
    type: "tick"
  });
}
function zv(t, e, s) {
  let n = ch(t);
  return (s && e !== "right" || !s && e === "right") && (n = $v(n)), n;
}
function Gv(t, e, s, n) {
  const { top: i, left: o, bottom: a, right: r, chart: l } = t, { chartArea: c, scales: h } = l;
  let u = 0, f, p, d;
  const g = a - i, m = r - o;
  if (t.isHorizontal()) {
    if (p = ce(n, o, r), bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      d = h[_].getPixelForValue(y) + g - e;
    } else s === "center" ? d = (c.bottom + c.top) / 2 + g - e : d = bf(t, s, e);
    f = r - o;
  } else {
    if (bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      p = h[_].getPixelForValue(y) - m + e;
    } else s === "center" ? p = (c.left + c.right) / 2 - m + e : p = bf(t, s, e);
    d = ce(n, a, i), u = s === "left" ? -qt : qt;
  }
  return {
    titleX: p,
    titleY: d,
    maxWidth: f,
    rotation: u
  };
}
class In extends Os {
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
    let { min: s, max: n, minDefined: i, maxDefined: o } = this.getUserBounds(), a;
    if (i && o)
      return {
        min: s,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      a = r[l].controller.getMinMax(this, e), i || (s = Math.min(s, a.min)), o || (n = Math.max(n, a.max));
    return s = o && s > n ? n : s, n = i && s > n ? s : n, {
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
    const { beginAtZero: i, grace: o, ticks: a } = this.options, r = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = s, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Q_(this, o, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? xf(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Ov(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let n, i, o;
    for (n = 0, i = e.length; n < i; n++)
      o = e[n], o.label = Rt(s.callback, [
        o.value,
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
    const e = this.options, s = e.ticks, n = _f(this.ticks.length, e.ticks.maxTicksLimit), i = s.minRotation || 0, o = s.maxRotation;
    let a = i, r, l, c;
    if (!this._isVisible() || !s.display || i >= o || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, f = h.highest.height, p = se(this.chart.width - u, 0, this.maxWidth);
    r = e.offset ? this.maxWidth / n : p / (n - 1), u + 6 > r && (r = p / (n - (e.offset ? 0.5 : 1)), l = this.maxHeight - Ti(e.grid) - s.padding - vf(e.title, this.chart.options.font), c = Math.sqrt(u * u + f * f), a = rh(Math.min(Math.asin(se((h.highest.height + 6) / r, -1, 1)), Math.asin(se(l / c, -1, 1)) - Math.asin(se(f / c, -1, 1)))), a = Math.max(i, Math.min(o, a))), this.labelRotation = a;
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
    }, { chart: s, options: { ticks: n, title: i, grid: o } } = this, a = this._isVisible(), r = this.isHorizontal();
    if (a) {
      const l = vf(i, s.options.font);
      if (r ? (e.width = this.maxWidth, e.height = Ti(o) + l) : (e.height = this.maxHeight, e.width = Ti(o) + l), n.display && this.ticks.length) {
        const { first: c, last: h, widest: u, highest: f } = this._getLabelSizes(), p = n.padding * 2, d = ze(this.labelRotation), g = Math.cos(d), m = Math.sin(d);
        if (r) {
          const _ = n.mirror ? 0 : m * u.width + g * f.height;
          e.height = Math.min(this.maxHeight, e.height + _ + p);
        } else {
          const _ = n.mirror ? 0 : g * u.width + m * f.height;
          e.width = Math.min(this.maxWidth, e.width + _ + p);
        }
        this._calculatePadding(c, h, m, g);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, s, n, i) {
    const { ticks: { align: o, padding: a }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, p = 0;
      l ? c ? (f = i * e.width, p = n * s.height) : (f = n * e.height, p = i * s.width) : o === "start" ? p = s.width : o === "end" ? f = e.width : o !== "inner" && (f = e.width / 2, p = s.width / 2), this.paddingLeft = Math.max((f - h + a) * this.width / (this.width - h), 0), this.paddingRight = Math.max((p - u + a) * this.width / (this.width - u), 0);
    } else {
      let h = s.height / 2, u = e.height / 2;
      o === "start" ? (h = 0, u = e.height) : o === "end" && (h = s.height, u = 0), this.paddingTop = h + a, this.paddingBottom = u + a;
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
      s < n.length && (n = xf(n, s)), this._labelSizes = e = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, s, n) {
    const { ctx: i, _longestTextCache: o } = this, a = [], r = [], l = Math.floor(s / _f(s, n));
    let c = 0, h = 0, u, f, p, d, g, m, _, y, b, x, v;
    for (u = 0; u < s; u += l) {
      if (d = e[u].label, g = this._resolveTickFontOptions(u), i.font = m = g.string, _ = o[m] = o[m] || {
        data: {},
        gc: []
      }, y = g.lineHeight, b = x = 0, !mt(d) && !Ft(d))
        b = ar(i, _.data, _.gc, b, d), x = y;
      else if (Ft(d))
        for (f = 0, p = d.length; f < p; ++f)
          v = d[f], !mt(v) && !Ft(v) && (b = ar(i, _.data, _.gc, b, v), x += y);
      a.push(b), r.push(x), c = Math.max(b, c), h = Math.max(x, h);
    }
    Wv(o, s);
    const k = a.indexOf(c), S = r.indexOf(h), C = (D) => ({
      width: a[D] || 0,
      height: r[D] || 0
    });
    return {
      first: C(0),
      last: C(s - 1),
      widest: C(k),
      highest: C(S),
      widths: a,
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
    return P_(this._alignToPixels ? rn(this.chart, s, 0) : s);
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
      return n.$context || (n.$context = Vv(this.getContext(), e, n));
    }
    return this.$context || (this.$context = Hv(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, s = ze(this.labelRotation), n = Math.abs(Math.cos(s)), i = Math.abs(Math.sin(s)), o = this._getLabelSizes(), a = e.autoSkipPadding || 0, r = o ? o.widest.width + a : 0, l = o ? o.highest.height + a : 0;
    return this.isHorizontal() ? l * n > r * i ? r / n : l / i : l * i < r * n ? l / n : r / i;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const s = this.axis, n = this.chart, i = this.options, { grid: o, position: a, border: r } = i, l = o.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), f = Ti(o), p = [], d = r.setContext(this.getContext()), g = d.display ? d.width : 0, m = g / 2, _ = function(M) {
      return rn(n, M, g);
    };
    let y, b, x, v, k, S, C, D, O, I, w, F;
    if (a === "top")
      y = _(this.bottom), S = this.bottom - f, D = y - m, I = _(e.top) + m, F = e.bottom;
    else if (a === "bottom")
      y = _(this.top), I = e.top, F = _(e.bottom) - m, S = y + m, D = this.top + f;
    else if (a === "left")
      y = _(this.right), k = this.right - f, C = y - m, O = _(e.left) + m, w = e.right;
    else if (a === "right")
      y = _(this.left), O = e.left, w = _(e.right) - m, k = y + m, C = this.left + f;
    else if (s === "x") {
      if (a === "center")
        y = _((e.top + e.bottom) / 2 + 0.5);
      else if (bt(a)) {
        const M = Object.keys(a)[0], T = a[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      I = e.top, F = e.bottom, S = y + m, D = S + f;
    } else if (s === "y") {
      if (a === "center")
        y = _((e.left + e.right) / 2);
      else if (bt(a)) {
        const M = Object.keys(a)[0], T = a[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      k = y - m, C = k - f, O = e.left, w = e.right;
    }
    const L = ut(i.ticks.maxTicksLimit, u), P = Math.max(1, Math.ceil(u / L));
    for (b = 0; b < u; b += P) {
      const M = this.getContext(b), T = o.setContext(M), E = r.setContext(M), H = T.lineWidth, Y = T.color, Z = E.dash || [], nt = E.dashOffset, ft = T.tickWidth, lt = T.tickColor, pt = T.tickBorderDash || [], _t = T.tickBorderDashOffset;
      x = jv(this, b, l), x !== void 0 && (v = rn(n, x, H), c ? k = C = O = w = v : S = D = I = F = v, p.push({
        tx1: k,
        ty1: S,
        tx2: C,
        ty2: D,
        x1: O,
        y1: I,
        x2: w,
        y2: F,
        width: H,
        color: Y,
        borderDash: Z,
        borderDashOffset: nt,
        tickWidth: ft,
        tickColor: lt,
        tickBorderDash: pt,
        tickBorderDashOffset: _t
      }));
    }
    return this._ticksLength = u, this._borderValue = y, p;
  }
  _computeLabelItems(e) {
    const s = this.axis, n = this.options, { position: i, ticks: o } = n, a = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: h, mirror: u } = o, f = Ti(n.grid), p = f + h, d = u ? -h : p, g = -ze(this.labelRotation), m = [];
    let _, y, b, x, v, k, S, C, D, O, I, w, F = "middle";
    if (i === "top")
      k = this.bottom - d, S = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      k = this.top + d, S = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const P = this._getYAxisLabelAlignment(f);
      S = P.textAlign, v = P.x;
    } else if (i === "right") {
      const P = this._getYAxisLabelAlignment(f);
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
      S = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? F = "top" : l === "end" && (F = "bottom"));
    const L = this._getLabelSizes();
    for (_ = 0, y = r.length; _ < y; ++_) {
      b = r[_], x = b.label;
      const P = o.setContext(this.getContext(_));
      C = this.getPixelForTick(_) + o.labelOffset, D = this._resolveTickFontOptions(_), O = D.lineHeight, I = Ft(x) ? x.length : 1;
      const M = I / 2, T = P.color, E = P.textStrokeColor, H = P.textStrokeWidth;
      let Y = S;
      a ? (v = C, S === "inner" && (_ === y - 1 ? Y = this.options.reverse ? "left" : "right" : _ === 0 ? Y = this.options.reverse ? "right" : "left" : Y = "center"), i === "top" ? c === "near" || g !== 0 ? w = -I * O + O / 2 : c === "center" ? w = -L.highest.height / 2 - M * O + O : w = -L.highest.height + O / 2 : c === "near" || g !== 0 ? w = O / 2 : c === "center" ? w = L.highest.height / 2 - M * O : w = L.highest.height - I * O, u && (w *= -1), g !== 0 && !P.showLabelBackdrop && (v += O / 2 * Math.sin(g))) : (k = C, w = (1 - I) * O / 2);
      let Z;
      if (P.showLabelBackdrop) {
        const nt = me(P.backdropPadding), ft = L.heights[_], lt = L.widths[_];
        let pt = w - nt.top, _t = 0 - nt.left;
        switch (F) {
          case "middle":
            pt -= ft / 2;
            break;
          case "bottom":
            pt -= ft;
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
          height: ft + nt.height,
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
          strokeColor: E,
          strokeWidth: H,
          textAlign: Y,
          textBaseline: F,
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
    const { position: s, ticks: { crossAlign: n, mirror: i, padding: o } } = this.options, a = this._getLabelSizes(), r = e + o, l = a.widest.width;
    let c, h;
    return s === "left" ? i ? (h = this.right + o, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : s === "right" ? i ? (h = this.left + o, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
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
    const { ctx: e, options: { backgroundColor: s }, left: n, top: i, width: o, height: a } = this;
    s && (e.save(), e.fillStyle = s, e.fillRect(n, i, o, a), e.restore());
  }
  getLineWidthForValue(e) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const i = this.ticks.findIndex((o) => o.value === e);
    return i >= 0 ? s.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(e) {
    const s = this.options.grid, n = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let o, a;
    const r = (l, c, h) => {
      !h.width || !h.color || (n.save(), n.lineWidth = h.width, n.strokeStyle = h.color, n.setLineDash(h.borderDash || []), n.lineDashOffset = h.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (s.display)
      for (o = 0, a = i.length; o < a; ++o) {
        const l = i[o];
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
    const { chart: e, ctx: s, options: { border: n, grid: i } } = this, o = n.setContext(this.getContext()), a = n.display ? o.width : 0;
    if (!a)
      return;
    const r = i.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, u, f;
    this.isHorizontal() ? (c = rn(e, this.left, a) - a / 2, h = rn(e, this.right, r) + r / 2, u = f = l) : (u = rn(e, this.top, a) - a / 2, f = rn(e, this.bottom, r) + r / 2, c = h = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(c, u), s.lineTo(h, f), s.stroke(), s.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, i = this._computeLabelArea();
    i && Fr(n, i);
    const o = this.getLabelItems(e);
    for (const a of o) {
      const r = a.options, l = a.font, c = a.label, h = a.textOffset;
      Ln(n, c, 0, h, l, r);
    }
    i && Er(n);
  }
  drawTitle() {
    const { ctx: e, options: { position: s, title: n, reverse: i } } = this;
    if (!n.display)
      return;
    const o = Zt(n.font), a = me(n.padding), r = n.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || bt(s) ? (l += a.bottom, Ft(n.text) && (l += o.lineHeight * (n.text.length - 1))) : l += a.top;
    const { titleX: c, titleY: h, maxWidth: u, rotation: f } = Gv(this, l, s, r);
    Ln(e, n.text, 0, 0, o, {
      color: n.color,
      maxWidth: u,
      rotation: f,
      textAlign: zv(r, s, i),
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
    return !this._isVisible() || this.draw !== In.prototype.draw ? [
      {
        z: s,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: n,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
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
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(e) {
    const s = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", i = [];
    let o, a;
    for (o = 0, a = s.length; o < a; ++o) {
      const r = s[o];
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
class ra {
  constructor(e, s, n) {
    this.type = e, this.scope = s, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const s = Object.getPrototypeOf(e);
    let n;
    Yv(s) && (n = this.register(s));
    const i = this.items, o = e.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + e);
    return o in i || (i[o] = e, Uv(e, a, n), this.override && It.override(e.id, e.overrides)), a;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const s = this.items, n = e.id, i = this.scope;
    n in s && delete s[n], i && n in It[i] && (delete It[i][n], this.override && delete Rn[n]);
  }
}
function Uv(t, e, s) {
  const n = mo(/* @__PURE__ */ Object.create(null), [
    s ? It.get(s) : {},
    It.get(e),
    t.defaults
  ]);
  It.set(e, n), t.defaultRoutes && qv(e, t.defaultRoutes), t.descriptors && It.describe(e, t.descriptors);
}
function qv(t, e) {
  Object.keys(e).forEach((s) => {
    const n = s.split("."), i = n.pop(), o = [
      t
    ].concat(n).join("."), a = e[s].split("."), r = a.pop(), l = a.join(".");
    It.route(o, i, l, r);
  });
}
function Yv(t) {
  return "id" in t && "defaults" in t;
}
class Kv {
  constructor() {
    this.controllers = new ra(Ye, "datasets", !0), this.elements = new ra(Os, "elements"), this.plugins = new ra(Object, "plugins"), this.scales = new ra(In, "scales"), this._typedRegistries = [
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
      const o = n || this._getRegistryForType(i);
      n || o.isForType(i) || o === this.plugins && i.id ? this._exec(e, o, i) : At(i, (a) => {
        const r = n || this._getRegistryForType(a);
        this._exec(e, r, a);
      });
    });
  }
  _exec(e, s, n) {
    const i = ah(e);
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
var ts = /* @__PURE__ */ new Kv();
class Jv {
  constructor() {
    this._init = void 0;
  }
  notify(e, s, n, i) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install")), this._init === void 0)
      return;
    const o = i ? this._descriptors(e).filter(i) : this._descriptors(e), a = this._notify(o, e, s, n);
    return s === "afterDestroy" && (this._notify(o, e, "stop"), this._notify(this._init, e, "uninstall"), this._init = void 0), a;
  }
  _notify(e, s, n, i) {
    i = i || {};
    for (const o of e) {
      const a = o.plugin, r = a[n], l = [
        s,
        i,
        o.options
      ];
      if (Rt(r, l, a) === !1 && i.cancelable)
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
    const n = e && e.config, i = ut(n.options && n.options.plugins, {}), o = Xv(n);
    return i === !1 && !s ? [] : Qv(e, o, i, s);
  }
  _notifyStateChanges(e) {
    const s = this._oldCache || [], n = this._cache, i = (o, a) => o.filter((r) => !a.some((l) => r.plugin.id === l.plugin.id));
    this._notify(i(s, n), e, "stop"), this._notify(i(n, s), e, "start");
  }
}
function Xv(t) {
  const e = {}, s = [], n = Object.keys(ts.plugins.items);
  for (let o = 0; o < n.length; o++)
    s.push(ts.getPlugin(n[o]));
  const i = t.plugins || [];
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    s.indexOf(a) === -1 && (s.push(a), e[a.id] = !0);
  }
  return {
    plugins: s,
    localIds: e
  };
}
function Zv(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function Qv(t, { plugins: e, localIds: s }, n, i) {
  const o = [], a = t.getContext();
  for (const r of e) {
    const l = r.id, c = Zv(n[l], i);
    c !== null && o.push({
      plugin: r,
      options: tS(t.config, {
        plugin: r,
        local: s[l]
      }, c, a)
    });
  }
  return o;
}
function tS(t, { plugin: e, local: s }, n, i) {
  const o = t.pluginScopeKeys(e), a = t.getOptionScopes(n, o);
  return s && e.defaults && a.push(e.defaults), t.createResolver(a, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ec(t, e) {
  const s = It.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || s.indexAxis || "x";
}
function eS(t, e) {
  let s = t;
  return t === "_index_" ? s = e : t === "_value_" && (s = e === "x" ? "y" : "x"), s;
}
function sS(t, e) {
  return t === e ? "_index_" : "_value_";
}
function Sf(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function nS(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function sc(t, ...e) {
  if (Sf(t))
    return t;
  for (const s of e) {
    const n = s.axis || nS(s.position) || t.length > 1 && Sf(t[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function wf(t, e, s) {
  if (s[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function iS(t, e) {
  if (e.data && e.data.datasets) {
    const s = e.data.datasets.filter((n) => n.xAxisID === t || n.yAxisID === t);
    if (s.length)
      return wf(t, "x", s[0]) || wf(t, "y", s[0]);
  }
  return {};
}
function oS(t, e) {
  const s = Rn[t.type] || {
    scales: {}
  }, n = e.scales || {}, i = ec(t.type, e), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((a) => {
    const r = n[a];
    if (!bt(r))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = sc(a, r, iS(a, t), It.scales[r.type]), c = sS(l, i), h = s.scales || {};
    o[a] = Ji(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      h[l],
      h[c]
    ]);
  }), t.data.datasets.forEach((a) => {
    const r = a.type || t.type, l = a.indexAxis || ec(r, e), h = (Rn[r] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const f = eS(u, l), p = a[f + "AxisID"] || f;
      o[p] = o[p] || /* @__PURE__ */ Object.create(null), Ji(o[p], [
        {
          axis: f
        },
        n[p],
        h[u]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const r = o[a];
    Ji(r, [
      It.scales[r.type],
      It.scale
    ]);
  }), o;
}
function ym(t) {
  const e = t.options || (t.options = {});
  e.plugins = ut(e.plugins, {}), e.scales = oS(t, e);
}
function bm(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function aS(t) {
  return t = t || {}, t.data = bm(t.data), ym(t), t;
}
const Cf = /* @__PURE__ */ new Map(), _m = /* @__PURE__ */ new Set();
function la(t, e) {
  let s = Cf.get(t);
  return s || (s = e(), Cf.set(t, s), _m.add(s)), s;
}
const Di = (t, e, s) => {
  const n = Zs(e, s);
  n !== void 0 && t.add(n);
};
class rS {
  constructor(e) {
    this._config = aS(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = bm(e);
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
    this.clearCache(), ym(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return la(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, s) {
    return la(`${e}.transition.${s}`, () => [
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
    return la(`${e}-${s}`, () => [
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
    return la(`${n}-plugin-${s}`, () => [
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
    const { options: i, type: o } = this, a = this._cachedScopes(e, n), r = a.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((h) => {
      e && (l.add(e), h.forEach((u) => Di(l, e, u))), h.forEach((u) => Di(l, i, u)), h.forEach((u) => Di(l, Rn[o] || {}, u)), h.forEach((u) => Di(l, It, u)), h.forEach((u) => Di(l, Zl, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), _m.has(s) && a.set(s, c), c;
  }
  chartOptionScopes() {
    const { options: e, type: s } = this;
    return [
      e,
      Rn[s] || {},
      It.datasets[s] || {},
      {
        type: s
      },
      It,
      Zl
    ];
  }
  resolveNamedOptions(e, s, n, i = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: r } = kf(this._resolverCache, e, i);
    let l = a;
    if (cS(a, s)) {
      o.$shared = !1, n = Qs(n) ? n() : n;
      const c = this.createResolver(e, n, r);
      l = pi(a, n, c);
    }
    for (const c of s)
      o[c] = l[c];
    return o;
  }
  createResolver(e, s, n = [
    ""
  ], i) {
    const { resolver: o } = kf(this._resolverCache, e, n);
    return bt(s) ? pi(o, s, void 0, i) : o;
  }
}
function kf(t, e, s) {
  let n = t.get(e);
  n || (n = /* @__PURE__ */ new Map(), t.set(e, n));
  const i = s.join();
  let o = n.get(i);
  return o || (o = {
    resolver: fh(e, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(i, o)), o;
}
const lS = (t) => bt(t) && Object.getOwnPropertyNames(t).some((e) => Qs(t[e]));
function cS(t, e) {
  const { isScriptable: s, isIndexable: n } = Xg(t);
  for (const i of e) {
    const o = s(i), a = n(i), r = (a || o) && t[i];
    if (o && (Qs(r) || lS(r)) || a && Ft(r))
      return !0;
  }
  return !1;
}
var hS = "4.5.1";
const uS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Mf(t, e) {
  return t === "top" || t === "bottom" || uS.indexOf(t) === -1 && e === "x";
}
function Af(t, e) {
  return function(s, n) {
    return s[t] === n[t] ? s[e] - n[e] : s[t] - n[t];
  };
}
function Pf(t) {
  const e = t.chart, s = e.options.animation;
  e.notifyPlugins("afterRender"), Rt(s && s.onComplete, [
    t
  ], e);
}
function fS(t) {
  const e = t.chart, s = e.options.animation;
  Rt(s && s.onProgress, [
    t
  ], e);
}
function xm(t) {
  return gh() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const Aa = {}, Tf = (t) => {
  const e = xm(t);
  return Object.values(Aa).filter((s) => s.canvas === e).pop();
};
function dS(t, e, s) {
  const n = Object.keys(t);
  for (const i of n) {
    const o = +i;
    if (o >= e) {
      const a = t[i];
      delete t[i], (s > 0 || o > e) && (t[o + s] = a);
    }
  }
}
function pS(t, e, s, n) {
  return !s || t.type === "mouseout" ? null : n ? e : t;
}
var Ns;
let cr = (Ns = class {
  static register(...e) {
    ts.add(...e), Df();
  }
  static unregister(...e) {
    ts.remove(...e), Df();
  }
  constructor(e, s) {
    const n = this.config = new rS(s), i = xm(e), o = Tf(i);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Lv(i))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(i, a.aspectRatio), l = r && r.canvas, c = l && l.height, h = l && l.width;
    if (this.id = g_(), this.ctx = r, this.canvas = l, this.width = h, this.height = c, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Jv(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = L_((u) => this.update(u), a.resizeDelay || 0), this._dataChanges = [], Aa[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    hs.listen(this, "complete", Pf), hs.listen(this, "progress", fS), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: s }, width: n, height: i, _aspectRatio: o } = this;
    return mt(e) ? s && o ? o : i ? n / i : null : e;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Xu(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Yu(this.canvas, this.ctx), this;
  }
  stop() {
    return hs.stop(this), this;
  }
  resize(e, s) {
    hs.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: s
    } : this._resize(e, s);
  }
  _resize(e, s) {
    const n = this.options, i = this.canvas, o = n.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(i, e, s, o), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, Xu(this, r, !0) && (this.notifyPlugins("resize", {
      size: a
    }), Rt(n.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    At(s, (n, i) => {
      n.id = i;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, s = e.scales, n = this.scales, i = Object.keys(n).reduce((a, r) => (a[r] = !1, a), {});
    let o = [];
    s && (o = o.concat(Object.keys(s).map((a) => {
      const r = s[a], l = sc(a, r), c = l === "r", h = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), At(o, (a) => {
      const r = a.options, l = r.id, c = sc(l, r), h = ut(r.type, a.dtype);
      (r.position === void 0 || Mf(r.position, c) !== Mf(a.dposition)) && (r.position = a.dposition), i[l] = !0;
      let u = null;
      if (l in n && n[l].type === h)
        u = n[l];
      else {
        const f = ts.getScale(h);
        u = new f({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), n[u.id] = u;
      }
      u.init(r, e);
    }), At(i, (a, r) => {
      a || delete n[r];
    }), At(n, (a) => {
      pe.configure(this, a, a.options), pe.addBox(this, a);
    });
  }
  _updateMetasets() {
    const e = this._metasets, s = this.data.datasets.length, n = e.length;
    if (e.sort((i, o) => i.index - o.index), n > s) {
      for (let i = s; i < n; ++i)
        this._destroyDatasetMeta(i);
      e.splice(s, n - s);
    }
    this._sortedMetasets = e.slice(0).sort(Af("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: s } } = this;
    e.length > s.length && delete this._stacks, e.forEach((n, i) => {
      s.filter((o) => o === n._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const e = [], s = this.data.datasets;
    let n, i;
    for (this._removeUnreferencedMetasets(), n = 0, i = s.length; n < i; n++) {
      const o = s[n];
      let a = this.getDatasetMeta(n);
      const r = o.type || this.config.type;
      if (a.type && a.type !== r && (this._destroyDatasetMeta(n), a = this.getDatasetMeta(n)), a.type = r, a.indexAxis = o.indexAxis || ec(r, this.options), a.order = o.order || 0, a.index = n, a.label = "" + o.label, a.visible = this.isDatasetVisible(n), a.controller)
        a.controller.updateIndex(n), a.controller.linkScales();
      else {
        const l = ts.getController(r), { datasetElementType: c, dataElementType: h } = It.datasets[r];
        Object.assign(l, {
          dataElementType: ts.getElement(h),
          datasetElementType: c && ts.getElement(c)
        }), a.controller = new l(this, n), e.push(a.controller);
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
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: u } = this.getDatasetMeta(c), f = !i && o.indexOf(u) === -1;
      u.buildOrUpdateElements(f), a = Math.max(+u.getMaxOverflow(), a);
    }
    a = this._minPadding = n.layout.autoPadding ? a : 0, this._updateLayout(a), i || At(o, (c) => {
      c.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(Af("z", "_idx"));
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
    (!$u(s, n) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: i, count: o } of s) {
      const a = n === "_removeElements" ? -o : o;
      dS(e, i, a);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (o) => new Set(e.filter((a) => a[0] === o).map((a, r) => r + "," + a.splice(1).join(","))), i = n(0);
    for (let o = 1; o < s; o++)
      if (!$u(i, n(o)))
        return;
    return Array.from(i).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
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
    }, this), this._layers.forEach((i, o) => {
      i._idx = o;
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
        this._updateDataset(s, Qs(e) ? e({
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
    }) !== !1 && (hs.has(this) ? this.attached && !hs.running(this) && hs.start(this) : (this.draw(), Pf({
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
    let i, o;
    for (i = 0, o = s.length; i < o; ++i) {
      const a = s[i];
      (!e || a.visible) && n.push(a);
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
    }, i = lm(this, e);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (i && Fr(s, i), e.controller.draw(), i && Er(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(e) {
    return vs(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, s, n, i) {
    const o = uv.modes[s];
    return typeof o == "function" ? o(this, e, n, i) : [];
  }
  getDatasetMeta(e) {
    const s = this.data.datasets[e], n = this._metasets;
    let i = n.filter((o) => o && o._dataset === s).pop();
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
    return this.$context || (this.$context = tn(null, {
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
    const i = n ? "show" : "hide", o = this.getDatasetMeta(e), a = o.controller._resolveAnimations(void 0, i);
    yo(s) ? (o.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(e, n), a.update(o, {
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
    for (this.stop(), hs.remove(this), e = 0, s = this.data.datasets.length; e < s; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: s } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Yu(e, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete Aa[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, s = this.platform, n = (o, a) => {
      s.addEventListener(this, o, a), e[o] = a;
    }, i = (o, a, r) => {
      o.offsetX = a, o.offsetY = r, this._eventHandler(o);
    };
    At(this.options.events, (o) => n(o, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, s = this.platform, n = (l, c) => {
      s.addEventListener(this, l, c), e[l] = c;
    }, i = (l, c) => {
      e[l] && (s.removeEventListener(this, l, c), delete e[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let a;
    const r = () => {
      i("attach", r), this.attached = !0, this.resize(), n("resize", o), n("detach", a);
    };
    a = () => {
      this.attached = !1, i("resize", o), this._stop(), this._resize(0, 0), n("attach", r);
    }, s.isAttached(this.canvas) ? r() : a();
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
    let o, a, r, l;
    for (s === "dataset" && (o = this.getDatasetMeta(e[0].datasetIndex), o.controller["_" + i + "DatasetHoverStyle"]()), r = 0, l = e.length; r < l; ++r) {
      a = e[r];
      const c = a && this.getDatasetMeta(a.datasetIndex).controller;
      c && c[i + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const s = this._active || [], n = e.map(({ datasetIndex: o, index: a }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[a],
        index: a
      };
    });
    !nr(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
  }
  notifyPlugins(e, s, n) {
    return this._plugins.notify(this, e, s, n);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((s) => s.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, s, n) {
    const i = this.options.hover, o = (l, c) => l.filter((h) => !c.some((u) => h.datasetIndex === u.datasetIndex && h.index === u.index)), a = o(s, e), r = n ? e : o(e, s);
    a.length && this.updateHoverStyle(a, i.mode, !1), r.length && i.mode && this.updateHoverStyle(r, i.mode, !0);
  }
  _eventHandler(e, s) {
    const n = {
      event: e,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, i = (a) => (a.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", n, i) === !1)
      return;
    const o = this._handleEvent(e, s, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, i), (o || n.changed) && this.render(), this;
  }
  _handleEvent(e, s, n) {
    const { _active: i = [], options: o } = this, a = s, r = this._getActiveElements(e, i, n, a), l = v_(e), c = pS(e, this._lastEvent, n, l);
    n && (this._lastEvent = null, Rt(o.onHover, [
      e,
      r,
      this
    ], this), l && Rt(o.onClick, [
      e,
      r,
      this
    ], this));
    const h = !nr(r, i);
    return (h || s) && (this._active = r, this._updateHoverStyles(r, i, s)), this._lastEvent = c, h;
  }
  _getActiveElements(e, s, n, i) {
    if (e.type === "mouseout")
      return [];
    if (!n)
      return s;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(e, o.mode, o, i);
  }
}, Q(Ns, "defaults", It), Q(Ns, "instances", Aa), Q(Ns, "overrides", Rn), Q(Ns, "registry", ts), Q(Ns, "version", hS), Q(Ns, "getChart", Tf), Ns);
function Df() {
  return At(cr.instances, (t) => t._plugins.invalidate());
}
function gS(t, e, s) {
  const { startAngle: n, x: i, y: o, outerRadius: a, innerRadius: r, options: l } = e, { borderWidth: c, borderJoinStyle: h } = l, u = Math.min(c / a, fe(n - s));
  if (t.beginPath(), t.arc(i, o, a - c / 2, n + u / 2, s - u / 2), r > 0) {
    const f = Math.min(c / r, fe(n - s));
    t.arc(i, o, r + c / 2, s - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, a * fe(n - s));
    if (h === "round")
      t.arc(i, o, f, s - vt / 2, n + vt / 2, !0);
    else if (h === "bevel") {
      const p = 2 * f * f, d = -p * Math.cos(s + vt / 2) + i, g = -p * Math.sin(s + vt / 2) + o, m = p * Math.cos(n + vt / 2) + i, _ = p * Math.sin(n + vt / 2) + o;
      t.lineTo(d, g), t.lineTo(m, _);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function mS(t, e, s) {
  const { startAngle: n, pixelMargin: i, x: o, y: a, outerRadius: r, innerRadius: l } = e;
  let c = i / r;
  t.beginPath(), t.arc(o, a, r, n - c, s + c), l > i ? (c = i / l, t.arc(o, a, l, s + c, n - c, !0)) : t.arc(o, a, i, s + qt, n - qt), t.closePath(), t.clip();
}
function yS(t) {
  return uh(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function bS(t, e, s, n) {
  const i = yS(t.options.borderRadius), o = (s - e) / 2, a = Math.min(o, n * e / 2), r = (l) => {
    const c = (s - Math.min(o, l)) * n / 2;
    return se(l, 0, Math.min(o, c));
  };
  return {
    outerStart: r(i.outerStart),
    outerEnd: r(i.outerEnd),
    innerStart: se(i.innerStart, 0, a),
    innerEnd: se(i.innerEnd, 0, a)
  };
}
function Hn(t, e, s, n) {
  return {
    x: s + t * Math.cos(e),
    y: n + t * Math.sin(e)
  };
}
function hr(t, e, s, n, i, o) {
  const { x: a, y: r, startAngle: l, pixelMargin: c, innerRadius: h } = e, u = Math.max(e.outerRadius + n + s - c, 0), f = h > 0 ? h + n + s + c : 0;
  let p = 0;
  const d = i - l;
  if (n) {
    const P = h > 0 ? h - n : 0, M = u > 0 ? u - n : 0, T = (P + M) / 2, E = T !== 0 ? d * T / (T + n) : d;
    p = (d - E) / 2;
  }
  const g = Math.max(1e-3, d * u - s / vt) / u, m = (d - g) / 2, _ = l + m + p, y = i - m - p, { outerStart: b, outerEnd: x, innerStart: v, innerEnd: k } = bS(e, f, u, y - _), S = u - b, C = u - x, D = _ + b / S, O = y - x / C, I = f + v, w = f + k, F = _ + v / I, L = y - k / w;
  if (t.beginPath(), o) {
    const P = (D + O) / 2;
    if (t.arc(a, r, u, D, P), t.arc(a, r, u, P, O), x > 0) {
      const H = Hn(C, O, a, r);
      t.arc(H.x, H.y, x, O, y + qt);
    }
    const M = Hn(w, y, a, r);
    if (t.lineTo(M.x, M.y), k > 0) {
      const H = Hn(w, L, a, r);
      t.arc(H.x, H.y, k, y + qt, L + Math.PI);
    }
    const T = (y - k / f + (_ + v / f)) / 2;
    if (t.arc(a, r, f, y - k / f, T, !0), t.arc(a, r, f, T, _ + v / f, !0), v > 0) {
      const H = Hn(I, F, a, r);
      t.arc(H.x, H.y, v, F + Math.PI, _ - qt);
    }
    const E = Hn(S, _, a, r);
    if (t.lineTo(E.x, E.y), b > 0) {
      const H = Hn(S, D, a, r);
      t.arc(H.x, H.y, b, _ - qt, D);
    }
  } else {
    t.moveTo(a, r);
    const P = Math.cos(D) * u + a, M = Math.sin(D) * u + r;
    t.lineTo(P, M);
    const T = Math.cos(O) * u + a, E = Math.sin(O) * u + r;
    t.lineTo(T, E);
  }
  t.closePath();
}
function _S(t, e, s, n, i) {
  const { fullCircles: o, startAngle: a, circumference: r } = e;
  let l = e.endAngle;
  if (o) {
    hr(t, e, s, n, l, i);
    for (let c = 0; c < o; ++c)
      t.fill();
    isNaN(r) || (l = a + (r % Ot || Ot));
  }
  return hr(t, e, s, n, l, i), t.fill(), l;
}
function xS(t, e, s, n, i) {
  const { fullCircles: o, startAngle: a, circumference: r, options: l } = e, { borderWidth: c, borderJoinStyle: h, borderDash: u, borderDashOffset: f, borderRadius: p } = l, d = l.borderAlign === "inner";
  if (!c)
    return;
  t.setLineDash(u || []), t.lineDashOffset = f, d ? (t.lineWidth = c * 2, t.lineJoin = h || "round") : (t.lineWidth = c, t.lineJoin = h || "bevel");
  let g = e.endAngle;
  if (o) {
    hr(t, e, s, n, g, i);
    for (let m = 0; m < o; ++m)
      t.stroke();
    isNaN(r) || (g = a + (r % Ot || Ot));
  }
  d && mS(t, e, g), l.selfJoin && g - a >= vt && p === 0 && h !== "miter" && gS(t, e, g), o || (hr(t, e, s, n, g, i), t.stroke());
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
    const o = this.getProps([
      "x",
      "y"
    ], i), { angle: a, distance: r } = Wg(o, {
      x: s,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: h, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], i), p = (this.options.spacing + this.options.borderWidth) / 2, d = ut(f, c - l), g = bo(a, l, c) && l !== c, m = d >= Ot || g, _ = _s(r, h + p, u + p);
    return m && _;
  }
  getCenterPoint(s) {
    const { x: n, y: i, startAngle: o, endAngle: a, innerRadius: r, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], s), { offset: c, spacing: h } = this.options, u = (o + a) / 2, f = (r + l + h + c) / 2;
    return {
      x: n + Math.cos(u) * f,
      y: i + Math.sin(u) * f
    };
  }
  tooltipPosition(s) {
    return this.getCenterPoint(s);
  }
  draw(s) {
    const { options: n, circumference: i } = this, o = (n.offset || 0) / 4, a = (n.spacing || 0) / 2, r = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = i > Ot ? Math.floor(i / Ot) : 0, i === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    s.save();
    const l = (this.startAngle + this.endAngle) / 2;
    s.translate(Math.cos(l) * o, Math.sin(l) * o);
    const c = 1 - Math.sin(Math.min(vt, i || 0)), h = o * c;
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, _S(s, this, h, a, r), xS(s, this, h, a, r), s.restore();
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
function vm(t, e, s = e) {
  t.lineCap = ut(s.borderCapStyle, e.borderCapStyle), t.setLineDash(ut(s.borderDash, e.borderDash)), t.lineDashOffset = ut(s.borderDashOffset, e.borderDashOffset), t.lineJoin = ut(s.borderJoinStyle, e.borderJoinStyle), t.lineWidth = ut(s.borderWidth, e.borderWidth), t.strokeStyle = ut(s.borderColor, e.borderColor);
}
function vS(t, e, s) {
  t.lineTo(s.x, s.y);
}
function SS(t) {
  return t.stepped ? z_ : t.tension || t.cubicInterpolationMode === "monotone" ? G_ : vS;
}
function Sm(t, e, s = {}) {
  const n = t.length, { start: i = 0, end: o = n - 1 } = s, { start: a, end: r } = e, l = Math.max(i, a), c = Math.min(o, r), h = i < a && o < a || i > r && o > r;
  return {
    count: n,
    start: l,
    loop: e.loop,
    ilen: c < l && !h ? n + c - l : c - l
  };
}
function wS(t, e, s, n) {
  const { points: i, options: o } = e, { count: a, start: r, loop: l, ilen: c } = Sm(i, s, n), h = SS(o);
  let { move: u = !0, reverse: f } = n || {}, p, d, g;
  for (p = 0; p <= c; ++p)
    d = i[(r + (f ? c - p : p)) % a], !d.skip && (u ? (t.moveTo(d.x, d.y), u = !1) : h(t, g, d, f, o.stepped), g = d);
  return l && (d = i[(r + (f ? c : 0)) % a], h(t, g, d, f, o.stepped)), !!l;
}
function CS(t, e, s, n) {
  const i = e.points, { count: o, start: a, ilen: r } = Sm(i, s, n), { move: l = !0, reverse: c } = n || {};
  let h = 0, u = 0, f, p, d, g, m, _;
  const y = (x) => (a + (c ? r - x : x)) % o, b = () => {
    g !== m && (t.lineTo(h, m), t.lineTo(h, g), t.lineTo(h, _));
  };
  for (l && (p = i[y(0)], t.moveTo(p.x, p.y)), f = 0; f <= r; ++f) {
    if (p = i[y(f)], p.skip)
      continue;
    const x = p.x, v = p.y, k = x | 0;
    k === d ? (v < g ? g = v : v > m && (m = v), h = (u * h + x) / ++u) : (b(), t.lineTo(x, v), d = k, u = 0, g = m = v), _ = v;
  }
  b();
}
function nc(t) {
  const e = t.options, s = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !s ? CS : wS;
}
function kS(t) {
  return t.stepped ? wx : t.tension || t.cubicInterpolationMode === "monotone" ? Cx : dn;
}
function MS(t, e, s, n) {
  let i = e._path;
  i || (i = e._path = new Path2D(), e.path(i, s, n) && i.closePath()), vm(t, e.options), t.stroke(i);
}
function AS(t, e, s, n) {
  const { segments: i, options: o } = e, a = nc(e);
  for (const r of i)
    vm(t, o, r.style), t.beginPath(), a(t, e, r, {
      start: s,
      end: s + n - 1
    }) && t.closePath(), t.stroke();
}
const PS = typeof Path2D == "function";
function TS(t, e, s, n) {
  PS && !e.options.segment ? MS(t, e, s, n) : AS(t, e, s, n);
}
class Gs extends Os {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, s) {
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const i = n.spanGaps ? this._loop : this._fullLoop;
      gx(this._points, n, e, i, s), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Dx(this, this.options.segment));
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
    const n = this.options, i = e[s], o = this.points, a = rm(this, {
      property: s,
      start: i,
      end: i
    });
    if (!a.length)
      return;
    const r = [], l = kS(n);
    let c, h;
    for (c = 0, h = a.length; c < h; ++c) {
      const { start: u, end: f } = a[c], p = o[u], d = o[f];
      if (p === d) {
        r.push(p);
        continue;
      }
      const g = Math.abs((i - p[s]) / (d[s] - p[s])), m = l(p, d, g, n.stepped);
      m[s] = e[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(e, s, n) {
    return nc(this)(e, this, s, n);
  }
  path(e, s, n) {
    const i = this.segments, o = nc(this);
    let a = this._loop;
    s = s || 0, n = n || this.points.length - s;
    for (const r of i)
      a &= o(e, this, r, {
        start: s,
        end: s + n - 1
      });
    return !!a;
  }
  draw(e, s, n, i) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (e.save(), TS(e, this, n, i), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Q(Gs, "id", "line"), Q(Gs, "defaults", {
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
}), Q(Gs, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Q(Gs, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function Rf(t, e, s, n) {
  const i = t.options, { [s]: o } = t.getProps([
    s
  ], n);
  return Math.abs(e - o) < i.radius + i.hitRadius;
}
class Pa extends Os {
  constructor(s) {
    super();
    Q(this, "parsed");
    Q(this, "skip");
    Q(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, s && Object.assign(this, s);
  }
  inRange(s, n, i) {
    const o = this.options, { x: a, y: r } = this.getProps([
      "x",
      "y"
    ], i);
    return Math.pow(s - a, 2) + Math.pow(n - r, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(s, n) {
    return Rf(this, s, "x", n);
  }
  inYRange(s, n) {
    return Rf(this, s, "y", n);
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
    this.skip || i.radius < 0.1 || !vs(this, n, this.size(i) / 2) || (s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.fillStyle = i.backgroundColor, Ql(s, i, this.x, this.y));
  }
  getRange() {
    const s = this.options || {};
    return s.radius + s.hitRadius;
  }
}
Q(Pa, "id", "point"), /**
* @type {any}
*/
Q(Pa, "defaults", {
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
Q(Pa, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function wm(t, e) {
  const { x: s, y: n, base: i, width: o, height: a } = t.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let r, l, c, h, u;
  return t.horizontal ? (u = a / 2, r = Math.min(s, i), l = Math.max(s, i), c = n - u, h = n + u) : (u = o / 2, r = s - u, l = s + u, c = Math.min(n, i), h = Math.max(n, i)), {
    left: r,
    top: c,
    right: l,
    bottom: h
  };
}
function Us(t, e, s, n) {
  return t ? 0 : se(e, s, n);
}
function DS(t, e, s) {
  const n = t.options.borderWidth, i = t.borderSkipped, o = Jg(n);
  return {
    t: Us(i.top, o.top, 0, s),
    r: Us(i.right, o.right, 0, e),
    b: Us(i.bottom, o.bottom, 0, s),
    l: Us(i.left, o.left, 0, e)
  };
}
function RS(t, e, s) {
  const { enableBorderRadius: n } = t.getProps([
    "enableBorderRadius"
  ]), i = t.options.borderRadius, o = wn(i), a = Math.min(e, s), r = t.borderSkipped, l = n || bt(i);
  return {
    topLeft: Us(!l || r.top || r.left, o.topLeft, 0, a),
    topRight: Us(!l || r.top || r.right, o.topRight, 0, a),
    bottomLeft: Us(!l || r.bottom || r.left, o.bottomLeft, 0, a),
    bottomRight: Us(!l || r.bottom || r.right, o.bottomRight, 0, a)
  };
}
function LS(t) {
  const e = wm(t), s = e.right - e.left, n = e.bottom - e.top, i = DS(t, s / 2, n / 2), o = RS(t, s / 2, n / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: s,
      h: n,
      radius: o
    },
    inner: {
      x: e.left + i.l,
      y: e.top + i.t,
      w: s - i.l - i.r,
      h: n - i.t - i.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, o.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function dl(t, e, s, n) {
  const i = e === null, o = s === null, r = t && !(i && o) && wm(t, n);
  return r && (i || _s(e, r.left, r.right)) && (o || _s(s, r.top, r.bottom));
}
function OS(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function FS(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function pl(t, e, s = {}) {
  const n = t.x !== s.x ? -e : 0, i = t.y !== s.y ? -e : 0, o = (t.x + t.w !== s.x + s.w ? e : 0) - n, a = (t.y + t.h !== s.y + s.h ? e : 0) - i;
  return {
    x: t.x + n,
    y: t.y + i,
    w: t.w + o,
    h: t.h + a,
    radius: t.radius
  };
}
class Ta extends Os {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: i } } = this, { inner: o, outer: a } = LS(this), r = OS(a.radius) ? _o : FS;
    e.save(), (a.w !== o.w || a.h !== o.h) && (e.beginPath(), r(e, pl(a, s, o)), e.clip(), r(e, pl(o, -s, a)), e.fillStyle = n, e.fill("evenodd")), e.beginPath(), r(e, pl(o, s)), e.fillStyle = i, e.fill(), e.restore();
  }
  inRange(e, s, n) {
    return dl(this, e, s, n);
  }
  inXRange(e, s) {
    return dl(this, e, null, s);
  }
  inYRange(e, s) {
    return dl(this, null, e, s);
  }
  getCenterPoint(e) {
    const { x: s, y: n, base: i, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: o ? (s + i) / 2 : s,
      y: o ? n : (n + i) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
Q(Ta, "id", "bar"), Q(Ta, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Q(Ta, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var ES = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Bi,
  BarElement: Ta,
  LineElement: Gs,
  PointElement: Pa
});
const ic = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Lf = /* @__PURE__ */ ic.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function Cm(t) {
  return ic[t % ic.length];
}
function km(t) {
  return Lf[t % Lf.length];
}
function IS(t, e) {
  return t.borderColor = Cm(e), t.backgroundColor = km(e), ++e;
}
function NS(t, e) {
  return t.backgroundColor = t.data.map(() => Cm(e++)), e;
}
function BS(t, e) {
  return t.backgroundColor = t.data.map(() => km(e++)), e;
}
function $S(t) {
  let e = 0;
  return (s, n) => {
    const i = t.getDatasetMeta(n).controller;
    i instanceof mn ? e = NS(s, e) : i instanceof to ? e = BS(s, e) : i && (e = IS(s, e));
  };
}
function Of(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function jS(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function WS() {
  return It.borderColor !== "rgba(0,0,0,0.1)" || It.backgroundColor !== "rgba(0,0,0,0.1)";
}
var HS = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, s) {
    if (!s.enabled)
      return;
    const { data: { datasets: n }, options: i } = t.config, { elements: o } = i, a = Of(n) || jS(i) || o && Of(o) || WS();
    if (!s.forceOverride && a)
      return;
    const r = $S(t);
    n.forEach(r);
  }
};
function VS(t, e, s, n, i) {
  const o = i.samples || n;
  if (o >= s)
    return t.slice(e, e + s);
  const a = [], r = (s - 2) / (o - 2);
  let l = 0;
  const c = e + s - 1;
  let h = e, u, f, p, d, g;
  for (a[l++] = t[h], u = 0; u < o - 2; u++) {
    let m = 0, _ = 0, y;
    const b = Math.floor((u + 1) * r) + 1 + e, x = Math.min(Math.floor((u + 2) * r) + 1, s) + e, v = x - b;
    for (y = b; y < x; y++)
      m += t[y].x, _ += t[y].y;
    m /= v, _ /= v;
    const k = Math.floor(u * r) + 1 + e, S = Math.min(Math.floor((u + 1) * r) + 1, s) + e, { x: C, y: D } = t[h];
    for (p = d = -1, y = k; y < S; y++)
      d = 0.5 * Math.abs((C - m) * (t[y].y - D) - (C - t[y].x) * (_ - D)), d > p && (p = d, f = t[y], g = y);
    a[l++] = f, h = g;
  }
  return a[l++] = t[c], a;
}
function zS(t, e, s, n) {
  let i = 0, o = 0, a, r, l, c, h, u, f, p, d, g;
  const m = [], _ = e + s - 1, y = t[e].x, x = t[_].x - y;
  for (a = e; a < e + s; ++a) {
    r = t[a], l = (r.x - y) / x * n, c = r.y;
    const v = l | 0;
    if (v === h)
      c < d ? (d = c, u = a) : c > g && (g = c, f = a), i = (o * i + r.x) / ++o;
    else {
      const k = a - 1;
      if (!mt(u) && !mt(f)) {
        const S = Math.min(u, f), C = Math.max(u, f);
        S !== p && S !== k && m.push({
          ...t[S],
          x: i
        }), C !== p && C !== k && m.push({
          ...t[C],
          x: i
        });
      }
      a > 0 && k !== p && m.push(t[k]), m.push(r), h = v, o = 0, d = g = c, u = f = p = a;
    }
  }
  return m;
}
function Mm(t) {
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
function Ff(t) {
  t.data.datasets.forEach((e) => {
    Mm(e);
  });
}
function GS(t, e) {
  const s = e.length;
  let n = 0, i;
  const { iScale: o } = t, { min: a, max: r, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (n = se(xs(e, o.axis, a).lo, 0, s - 1)), c ? i = se(xs(e, o.axis, r).hi + 1, n, s) - n : i = s - n, {
    start: n,
    count: i
  };
}
var US = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, s) => {
    if (!s.enabled) {
      Ff(t);
      return;
    }
    const n = t.width;
    t.data.datasets.forEach((i, o) => {
      const { _data: a, indexAxis: r } = i, l = t.getDatasetMeta(o), c = a || i.data;
      if (Ii([
        r,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = t.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || t.options.parsing)
        return;
      let { start: u, count: f } = GS(l, c);
      const p = s.threshold || 4 * n;
      if (f <= p) {
        Mm(i);
        return;
      }
      mt(a) && (i._data = c, delete i.data, Object.defineProperty(i, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(g) {
          this._data = g;
        }
      }));
      let d;
      switch (s.algorithm) {
        case "lttb":
          d = VS(c, u, f, n, s);
          break;
        case "min-max":
          d = zS(c, u, f, n);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${s.algorithm}'`);
      }
      i._decimated = d;
    });
  },
  destroy(t) {
    Ff(t);
  }
};
function qS(t, e, s) {
  const n = t.segments, i = t.points, o = e.points, a = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = Br(l, c, i);
    const h = oc(s, i[l], i[c], r.loop);
    if (!e.segments) {
      a.push({
        source: r,
        target: h,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const u = rm(e, h);
    for (const f of u) {
      const p = oc(s, o[f.start], o[f.end], f.loop), d = am(r, i, p);
      for (const g of d)
        a.push({
          source: g,
          target: f,
          start: {
            [s]: Ef(h, p, "start", Math.max)
          },
          end: {
            [s]: Ef(h, p, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function oc(t, e, s, n) {
  if (n)
    return;
  let i = e[t], o = s[t];
  return t === "angle" && (i = fe(i), o = fe(o)), {
    property: t,
    start: i,
    end: o
  };
}
function YS(t, e) {
  const { x: s = null, y: n = null } = t || {}, i = e.points, o = [];
  return e.segments.forEach(({ start: a, end: r }) => {
    r = Br(a, r, i);
    const l = i[a], c = i[r];
    n !== null ? (o.push({
      x: l.x,
      y: n
    }), o.push({
      x: c.x,
      y: n
    })) : s !== null && (o.push({
      x: s,
      y: l.y
    }), o.push({
      x: s,
      y: c.y
    }));
  }), o;
}
function Br(t, e, s) {
  for (; e > t; e--) {
    const n = s[e];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return e;
}
function Ef(t, e, s, n) {
  return t && e ? n(t[s], e[s]) : t ? t[s] : e ? e[s] : 0;
}
function Am(t, e) {
  let s = [], n = !1;
  return Ft(t) ? (n = !0, s = t) : s = YS(t, e), s.length ? new Gs({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function If(t) {
  return t && t.fill !== !1;
}
function KS(t, e, s) {
  let i = t[e].fill;
  const o = [
    e
  ];
  let a;
  if (!s)
    return i;
  for (; i !== !1 && o.indexOf(i) === -1; ) {
    if (!jt(i))
      return i;
    if (a = t[i], !a)
      return !1;
    if (a.visible)
      return i;
    o.push(i), i = a.fill;
  }
  return !1;
}
function JS(t, e, s) {
  const n = tw(t);
  if (bt(n))
    return isNaN(n.value) ? !1 : n;
  let i = parseFloat(n);
  return jt(i) && Math.floor(i) === i ? XS(n[0], e, i, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function XS(t, e, s, n) {
  return (t === "-" || t === "+") && (s = e + s), s === e || s < 0 || s >= n ? !1 : s;
}
function ZS(t, e) {
  let s = null;
  return t === "start" ? s = e.bottom : t === "end" ? s = e.top : bt(t) ? s = e.getPixelForValue(t.value) : e.getBasePixel && (s = e.getBasePixel()), s;
}
function QS(t, e, s) {
  let n;
  return t === "start" ? n = s : t === "end" ? n = e.options.reverse ? e.min : e.max : bt(t) ? n = t.value : n = e.getBaseValue(), n;
}
function tw(t) {
  const e = t.options, s = e.fill;
  let n = ut(s && s.target, s);
  return n === void 0 && (n = !!e.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function ew(t) {
  const { scale: e, index: s, line: n } = t, i = [], o = n.segments, a = n.points, r = sw(e, s);
  r.push(Am({
    x: null,
    y: e.bottom
  }, n));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      nw(i, a[h], r);
  }
  return new Gs({
    points: i,
    options: {}
  });
}
function sw(t, e) {
  const s = [], n = t.getMatchingVisibleMetas("line");
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (o.index === e)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function nw(t, e, s) {
  const n = [];
  for (let i = 0; i < s.length; i++) {
    const o = s[i], { first: a, last: r, point: l } = iw(o, e, "x");
    if (!(!l || a && r)) {
      if (a)
        n.unshift(l);
      else if (t.push(l), !r)
        break;
    }
  }
  t.push(...n);
}
function iw(t, e, s) {
  const n = t.interpolate(e, s);
  if (!n)
    return {};
  const i = n[s], o = t.segments, a = t.points;
  let r = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], u = a[h.start][s], f = a[h.end][s];
    if (_s(i, u, f)) {
      r = i === u, l = i === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: n
  };
}
class Pm {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, s, n) {
    const { x: i, y: o, radius: a } = this;
    return s = s || {
      start: 0,
      end: Ot
    }, e.arc(i, o, a, s.end, s.start, !0), !n.bounds;
  }
  interpolate(e) {
    const { x: s, y: n, radius: i } = this, o = e.angle;
    return {
      x: s + Math.cos(o) * i,
      y: n + Math.sin(o) * i,
      angle: o
    };
  }
}
function ow(t) {
  const { chart: e, fill: s, line: n } = t;
  if (jt(s))
    return aw(e, s);
  if (s === "stack")
    return ew(t);
  if (s === "shape")
    return !0;
  const i = rw(t);
  return i instanceof Pm ? i : Am(i, n);
}
function aw(t, e) {
  const s = t.getDatasetMeta(e);
  return s && t.isDatasetVisible(e) ? s.dataset : null;
}
function rw(t) {
  return (t.scale || {}).getPointPositionForValue ? cw(t) : lw(t);
}
function lw(t) {
  const { scale: e = {}, fill: s } = t, n = ZS(s, e);
  if (jt(n)) {
    const i = e.isHorizontal();
    return {
      x: i ? n : null,
      y: i ? null : n
    };
  }
  return null;
}
function cw(t) {
  const { scale: e, fill: s } = t, n = e.options, i = e.getLabels().length, o = n.reverse ? e.max : e.min, a = QS(s, e, o), r = [];
  if (n.grid.circular) {
    const l = e.getPointPositionForValue(0, o);
    return new Pm({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < i; ++l)
    r.push(e.getPointPositionForValue(l, a));
  return r;
}
function gl(t, e, s) {
  const n = ow(e), { chart: i, index: o, line: a, scale: r, axis: l } = e, c = a.options, h = c.fill, u = c.backgroundColor, { above: f = u, below: p = u } = h || {}, d = i.getDatasetMeta(o), g = lm(i, d);
  n && a.points.length && (Fr(t, s), hw(t, {
    line: a,
    target: n,
    above: f,
    below: p,
    area: s,
    scale: r,
    axis: l,
    clip: g
  }), Er(t));
}
function hw(t, e) {
  const { line: s, target: n, above: i, below: o, area: a, scale: r, clip: l } = e, c = s._loop ? "angle" : e.axis;
  t.save();
  let h = o;
  o !== i && (c === "x" ? (Nf(t, n, a.top), ml(t, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Nf(t, n, a.bottom)) : c === "y" && (Bf(t, n, a.left), ml(t, {
    line: s,
    target: n,
    color: o,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Bf(t, n, a.right), h = i)), ml(t, {
    line: s,
    target: n,
    color: h,
    scale: r,
    property: c,
    clip: l
  }), t.restore();
}
function Nf(t, e, s) {
  const { segments: n, points: i } = e;
  let o = !0, a = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[Br(l, c, i)];
    o ? (t.moveTo(h.x, h.y), o = !1) : (t.lineTo(h.x, s), t.lineTo(h.x, h.y)), a = !!e.pathSegment(t, r, {
      move: a
    }), a ? t.closePath() : t.lineTo(u.x, s);
  }
  t.lineTo(e.first().x, s), t.closePath(), t.clip();
}
function Bf(t, e, s) {
  const { segments: n, points: i } = e;
  let o = !0, a = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[Br(l, c, i)];
    o ? (t.moveTo(h.x, h.y), o = !1) : (t.lineTo(s, h.y), t.lineTo(h.x, h.y)), a = !!e.pathSegment(t, r, {
      move: a
    }), a ? t.closePath() : t.lineTo(s, u.y);
  }
  t.lineTo(s, e.first().y), t.closePath(), t.clip();
}
function ml(t, e) {
  const { line: s, target: n, property: i, color: o, scale: a, clip: r } = e, l = qS(s, n, i);
  for (const { source: c, target: h, start: u, end: f } of l) {
    const { style: { backgroundColor: p = o } = {} } = c, d = n !== !0;
    t.save(), t.fillStyle = p, uw(t, a, r, d && oc(i, u, f)), t.beginPath();
    const g = !!s.pathSegment(t, c);
    let m;
    if (d) {
      g ? t.closePath() : $f(t, n, f, i);
      const _ = !!n.pathSegment(t, h, {
        move: g,
        reverse: !0
      });
      m = g && _, m || $f(t, n, u, i);
    }
    t.closePath(), t.fill(m ? "evenodd" : "nonzero"), t.restore();
  }
}
function uw(t, e, s, n) {
  const i = e.chart.chartArea, { property: o, start: a, end: r } = n || {};
  if (o === "x" || o === "y") {
    let l, c, h, u;
    o === "x" ? (l = a, c = i.top, h = r, u = i.bottom) : (l = i.left, c = a, h = i.right, u = r), t.beginPath(), s && (l = Math.max(l, s.left), h = Math.min(h, s.right), c = Math.max(c, s.top), u = Math.min(u, s.bottom)), t.rect(l, c, h - l, u - c), t.clip();
  }
}
function $f(t, e, s, n) {
  const i = e.interpolate(s, n);
  i && t.lineTo(i.x, i.y);
}
var fw = {
  id: "filler",
  afterDatasetsUpdate(t, e, s) {
    const n = (t.data.datasets || []).length, i = [];
    let o, a, r, l;
    for (a = 0; a < n; ++a)
      o = t.getDatasetMeta(a), r = o.dataset, l = null, r && r.options && r instanceof Gs && (l = {
        visible: t.isDatasetVisible(a),
        index: a,
        fill: JS(r, a, n),
        chart: t,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, i.push(l);
    for (a = 0; a < n; ++a)
      l = i[a], !(!l || l.fill === !1) && (l.fill = KS(i, a, s.propagate));
  },
  beforeDraw(t, e, s) {
    const n = s.drawTime === "beforeDraw", i = t.getSortedVisibleDatasetMetas(), o = t.chartArea;
    for (let a = i.length - 1; a >= 0; --a) {
      const r = i[a].$filler;
      r && (r.line.updateControlPoints(o, r.axis), n && r.fill && gl(t.ctx, r, o));
    }
  },
  beforeDatasetsDraw(t, e, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = t.getSortedVisibleDatasetMetas();
    for (let i = n.length - 1; i >= 0; --i) {
      const o = n[i].$filler;
      If(o) && gl(t.ctx, o, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, s) {
    const n = e.meta.$filler;
    !If(n) || s.drawTime !== "beforeDatasetDraw" || gl(t.ctx, n, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const jf = (t, e) => {
  let { boxHeight: s = e, boxWidth: n = e } = t;
  return t.usePointStyle && (s = Math.min(s, e), n = t.pointStyleWidth || Math.min(n, e)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(e, s)
  };
}, dw = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class Wf extends Os {
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
    const n = e.labels, i = Zt(n.font), o = i.size, a = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = jf(n, o);
    let c, h;
    s.font = i.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(a, o, r, l) + 10) : (h = this.maxHeight, c = this._fitCols(a, i, r, l) + 10), this.width = Math.min(c, e.maxWidth || this.maxWidth), this.height = Math.min(h, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, s, n, i) {
    const { ctx: o, maxWidth: a, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = i + r;
    let u = e;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, p = -h;
    return this.legendItems.forEach((d, g) => {
      const m = n + s / 2 + o.measureText(d.text).width;
      (g === 0 || c[c.length - 1] + m + 2 * r > a) && (u += h, c[c.length - (g > 0 ? 0 : 1)] = 0, p += h, f++), l[g] = {
        left: 0,
        top: p,
        row: f,
        width: m,
        height: i
      }, c[c.length - 1] += m + r;
    }), u;
  }
  _fitCols(e, s, n, i) {
    const { ctx: o, maxHeight: a, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = a - e;
    let u = r, f = 0, p = 0, d = 0, g = 0;
    return this.legendItems.forEach((m, _) => {
      const { itemWidth: y, itemHeight: b } = pw(n, s, o, m, i);
      _ > 0 && p + b + 2 * r > h && (u += f + r, c.push({
        width: f,
        height: p
      }), d += f + r, g++, f = p = 0), l[_] = {
        left: d,
        top: p,
        col: g,
        width: y,
        height: b
      }, f = Math.max(f, y), p += b + r;
    }), u += f, c.push({
      width: f,
      height: p
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: i }, rtl: o } } = this, a = ai(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = ce(n, this.left + i, this.right - this.lineWidths[r]);
      for (const c of s)
        r !== c.row && (r = c.row, l = ce(n, this.left + i, this.right - this.lineWidths[r])), c.top += this.top + e + i, c.left = a.leftForLtr(a.x(l), c.width), l += c.width + i;
    } else {
      let r = 0, l = ce(n, this.top + e + i, this.bottom - this.columnSizes[r].height);
      for (const c of s)
        c.col !== r && (r = c.col, l = ce(n, this.top + e + i, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + i, c.left = a.leftForLtr(a.x(c.left), c.width), l += c.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      Fr(e, this), this._draw(), Er(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: s, lineWidths: n, ctx: i } = this, { align: o, labels: a } = e, r = It.color, l = ai(e.rtl, this.left, this.width), c = Zt(a.font), { padding: h } = a, u = c.size, f = u / 2;
    let p;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: d, boxHeight: g, itemHeight: m } = jf(a, u), _ = function(k, S, C) {
      if (isNaN(d) || d <= 0 || isNaN(g) || g < 0)
        return;
      i.save();
      const D = ut(C.lineWidth, 1);
      if (i.fillStyle = ut(C.fillStyle, r), i.lineCap = ut(C.lineCap, "butt"), i.lineDashOffset = ut(C.lineDashOffset, 0), i.lineJoin = ut(C.lineJoin, "miter"), i.lineWidth = D, i.strokeStyle = ut(C.strokeStyle, r), i.setLineDash(ut(C.lineDash, [])), a.usePointStyle) {
        const O = {
          radius: g * Math.SQRT2 / 2,
          pointStyle: C.pointStyle,
          rotation: C.rotation,
          borderWidth: D
        }, I = l.xPlus(k, d / 2), w = S + f;
        Kg(i, O, I, w, a.pointStyleWidth && d);
      } else {
        const O = S + Math.max((u - g) / 2, 0), I = l.leftForLtr(k, d), w = wn(C.borderRadius);
        i.beginPath(), Object.values(w).some((F) => F !== 0) ? _o(i, {
          x: I,
          y: O,
          w: d,
          h: g,
          radius: w
        }) : i.rect(I, O, d, g), i.fill(), D !== 0 && i.stroke();
      }
      i.restore();
    }, y = function(k, S, C) {
      Ln(i, C.text, k, S + m / 2, c, {
        strikethrough: C.hidden,
        textAlign: l.textAlign(C.textAlign)
      });
    }, b = this.isHorizontal(), x = this._computeTitleHeight();
    b ? p = {
      x: ce(o, this.left + h, this.right - n[0]),
      y: this.top + h + x,
      line: 0
    } : p = {
      x: this.left + h,
      y: ce(o, this.top + x + h, this.bottom - s[0].height),
      line: 0
    }, nm(this.ctx, e.textDirection);
    const v = m + h;
    this.legendItems.forEach((k, S) => {
      i.strokeStyle = k.fontColor, i.fillStyle = k.fontColor;
      const C = i.measureText(k.text).width, D = l.textAlign(k.textAlign || (k.textAlign = a.textAlign)), O = d + f + C;
      let I = p.x, w = p.y;
      l.setWidth(this.width), b ? S > 0 && I + O + h > this.right && (w = p.y += v, p.line++, I = p.x = ce(o, this.left + h, this.right - n[p.line])) : S > 0 && w + v > this.bottom && (I = p.x = I + s[p.line].width + h, p.line++, w = p.y = ce(o, this.top + x + h, this.bottom - s[p.line].height));
      const F = l.x(I);
      if (_(F, w, k), I = O_(D, I + d + f, b ? I + O : this.right, e.rtl), y(l.x(I), w, k), b)
        p.x += O + h;
      else if (typeof k.text != "string") {
        const L = c.lineHeight;
        p.y += Tm(k, L) + h;
      } else
        p.y += v;
    }), im(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, s = e.title, n = Zt(s.font), i = me(s.padding);
    if (!s.display)
      return;
    const o = ai(e.rtl, this.left, this.width), a = this.ctx, r = s.position, l = n.size / 2, c = i.top + l;
    let h, u = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), h = this.top + c, u = ce(e.align, u, this.right - f);
    else {
      const d = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h = c + ce(e.align, this.top, this.bottom - d - e.labels.padding - this._computeTitleHeight());
    }
    const p = ce(r, u, u + f);
    a.textAlign = o.textAlign(ch(r)), a.textBaseline = "middle", a.strokeStyle = s.color, a.fillStyle = s.color, a.font = n.string, Ln(a, s.text, p, h, n);
  }
  _computeTitleHeight() {
    const e = this.options.title, s = Zt(e.font), n = me(e.padding);
    return e.display ? s.lineHeight + n.height : 0;
  }
  _getLegendItemAt(e, s) {
    let n, i, o;
    if (_s(e, this.left, this.right) && _s(s, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
        if (i = o[n], _s(e, i.left, i.left + i.width) && _s(s, i.top, i.top + i.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(e) {
    const s = this.options;
    if (!yw(e.type, s))
      return;
    const n = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const i = this._hoveredItem, o = dw(i, n);
      i && !o && Rt(s.onLeave, [
        e,
        i,
        this
      ], this), this._hoveredItem = n, n && !o && Rt(s.onHover, [
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
function pw(t, e, s, n, i) {
  const o = gw(n, t, e, s), a = mw(i, n, e.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function gw(t, e, s, n) {
  let i = t.text;
  return i && typeof i != "string" && (i = i.reduce((o, a) => o.length > a.length ? o : a)), e + s.size / 2 + n.measureText(i).width;
}
function mw(t, e, s) {
  let n = t;
  return typeof e.text != "string" && (n = Tm(e, s)), n;
}
function Tm(t, e) {
  const s = t.text ? t.text.length : 0;
  return e * s;
}
function yw(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var bw = {
  id: "legend",
  _element: Wf,
  start(t, e, s) {
    const n = t.legend = new Wf({
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
        const e = t.data.datasets, { labels: { usePointStyle: s, pointStyle: n, textAlign: i, color: o, useBorderRadius: a, borderRadius: r } } = t.legend.options;
        return t._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(s ? 0 : void 0), h = me(c.borderWidth);
          return {
            text: e[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
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
            borderRadius: a && (r || c.borderRadius),
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
class bh extends Os {
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
    const o = i * Zt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: s, left: n, bottom: i, right: o, options: a } = this, r = a.align;
    let l = 0, c, h, u;
    return this.isHorizontal() ? (h = ce(r, n, o), u = s + e, c = o - n) : (a.position === "left" ? (h = n + e, u = ce(r, i, s), l = vt * -0.5) : (h = o - e, u = ce(r, s, i), l = vt * 0.5), c = i - s), {
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
    const n = Zt(s.font), o = n.lineHeight / 2 + this._padding.top, { titleX: a, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(o);
    Ln(e, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: l,
      rotation: c,
      textAlign: ch(s.align),
      textBaseline: "middle",
      translation: [
        a,
        r
      ]
    });
  }
}
function _w(t, e) {
  const s = new bh({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  pe.configure(t, s, e), pe.addBox(t, s), t.titleBlock = s;
}
var xw = {
  id: "title",
  _element: bh,
  start(t, e, s) {
    _w(t, s);
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
const ca = /* @__PURE__ */ new WeakMap();
var vw = {
  id: "subtitle",
  start(t, e, s) {
    const n = new bh({
      ctx: t.ctx,
      options: s,
      chart: t
    });
    pe.configure(t, n, s), pe.addBox(t, n), ca.set(t, n);
  },
  stop(t) {
    pe.removeBox(t, ca.get(t)), ca.delete(t);
  },
  beforeUpdate(t, e, s) {
    const n = ca.get(t);
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
    let e, s, n = /* @__PURE__ */ new Set(), i = 0, o = 0;
    for (e = 0, s = t.length; e < s; ++e) {
      const r = t[e].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), i += l.y, ++o;
      }
    }
    return o === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: i / o
    };
  },
  nearest(t, e) {
    if (!t.length)
      return !1;
    let s = e.x, n = e.y, i = Number.POSITIVE_INFINITY, o, a, r;
    for (o = 0, a = t.length; o < a; ++o) {
      const l = t[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Xl(e, c);
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
function us(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function Sw(t, e) {
  const { element: s, datasetIndex: n, index: i } = e, o = t.getDatasetMeta(n).controller, { label: a, value: r } = o.getLabelAndValue(i);
  return {
    chart: t,
    label: a,
    parsed: o.getParsed(i),
    raw: t.data.datasets[n].data[i],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: i,
    datasetIndex: n,
    element: s
  };
}
function Hf(t, e) {
  const s = t.chart.ctx, { body: n, footer: i, title: o } = t, { boxWidth: a, boxHeight: r } = e, l = Zt(e.bodyFont), c = Zt(e.titleFont), h = Zt(e.footerFont), u = o.length, f = i.length, p = n.length, d = me(e.padding);
  let g = d.height, m = 0, _ = n.reduce((x, v) => x + v.before.length + v.lines.length + v.after.length, 0);
  if (_ += t.beforeBody.length + t.afterBody.length, u && (g += u * c.lineHeight + (u - 1) * e.titleSpacing + e.titleMarginBottom), _) {
    const x = e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    g += p * x + (_ - p) * l.lineHeight + (_ - 1) * e.bodySpacing;
  }
  f && (g += e.footerMarginTop + f * h.lineHeight + (f - 1) * e.footerSpacing);
  let y = 0;
  const b = function(x) {
    m = Math.max(m, s.measureText(x).width + y);
  };
  return s.save(), s.font = c.string, At(t.title, b), s.font = l.string, At(t.beforeBody.concat(t.afterBody), b), y = e.displayColors ? a + 2 + e.boxPadding : 0, At(n, (x) => {
    At(x.before, b), At(x.lines, b), At(x.after, b);
  }), y = 0, s.font = h.string, At(t.footer, b), s.restore(), m += d.width, {
    width: m,
    height: g
  };
}
function ww(t, e) {
  const { y: s, height: n } = e;
  return s < n / 2 ? "top" : s > t.height - n / 2 ? "bottom" : "center";
}
function Cw(t, e, s, n) {
  const { x: i, width: o } = n, a = s.caretSize + s.caretPadding;
  if (t === "left" && i + o + a > e.width || t === "right" && i - o - a < 0)
    return !0;
}
function kw(t, e, s, n) {
  const { x: i, width: o } = s, { width: a, chartArea: { left: r, right: l } } = t;
  let c = "center";
  return n === "center" ? c = i <= (r + l) / 2 ? "left" : "right" : i <= o / 2 ? c = "left" : i >= a - o / 2 && (c = "right"), Cw(c, t, e, s) && (c = "center"), c;
}
function Vf(t, e, s) {
  const n = s.yAlign || e.yAlign || ww(t, s);
  return {
    xAlign: s.xAlign || e.xAlign || kw(t, e, s, n),
    yAlign: n
  };
}
function Mw(t, e) {
  let { x: s, width: n } = t;
  return e === "right" ? s -= n : e === "center" && (s -= n / 2), s;
}
function Aw(t, e, s) {
  let { y: n, height: i } = t;
  return e === "top" ? n += s : e === "bottom" ? n -= i + s : n -= i / 2, n;
}
function zf(t, e, s, n) {
  const { caretSize: i, caretPadding: o, cornerRadius: a } = t, { xAlign: r, yAlign: l } = s, c = i + o, { topLeft: h, topRight: u, bottomLeft: f, bottomRight: p } = wn(a);
  let d = Mw(e, r);
  const g = Aw(e, l, c);
  return l === "center" ? r === "left" ? d += c : r === "right" && (d -= c) : r === "left" ? d -= Math.max(h, f) + i : r === "right" && (d += Math.max(u, p) + i), {
    x: se(d, 0, n.width - e.width),
    y: se(g, 0, n.height - e.height)
  };
}
function ha(t, e, s) {
  const n = me(s.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - n.right : t.x + n.left;
}
function Gf(t) {
  return Ze([], us(t));
}
function Pw(t, e, s) {
  return tn(t, {
    tooltip: e,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Uf(t, e) {
  const s = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return s ? t.override(s) : t;
}
const Dm = {
  beforeTitle: ls,
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
  afterTitle: ls,
  beforeBody: ls,
  beforeLabel: ls,
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
  afterLabel: ls,
  afterBody: ls,
  beforeFooter: ls,
  footer: ls,
  afterFooter: ls
};
function we(t, e, s, n) {
  const i = t[e].call(s, n);
  return typeof i > "u" ? Dm[e].call(s, n) : i;
}
class ac extends Os {
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
    const s = this.chart, n = this.options.setContext(this.getContext()), i = n.enabled && s.options.animation && n.animations, o = new cm(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Pw(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeTitle", this, e), o = we(n, "title", this, e), a = we(n, "afterTitle", this, e);
    let r = [];
    return r = Ze(r, us(i)), r = Ze(r, us(o)), r = Ze(r, us(a)), r;
  }
  getBeforeBody(e, s) {
    return Gf(we(s.callbacks, "beforeBody", this, e));
  }
  getBody(e, s) {
    const { callbacks: n } = s, i = [];
    return At(e, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, r = Uf(n, o);
      Ze(a.before, us(we(r, "beforeLabel", this, o))), Ze(a.lines, we(r, "label", this, o)), Ze(a.after, us(we(r, "afterLabel", this, o))), i.push(a);
    }), i;
  }
  getAfterBody(e, s) {
    return Gf(we(s.callbacks, "afterBody", this, e));
  }
  getFooter(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeFooter", this, e), o = we(n, "footer", this, e), a = we(n, "afterFooter", this, e);
    let r = [];
    return r = Ze(r, us(i)), r = Ze(r, us(o)), r = Ze(r, us(a)), r;
  }
  _createItems(e) {
    const s = this._active, n = this.chart.data, i = [], o = [], a = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push(Sw(this.chart, s[l]));
    return e.filter && (r = r.filter((h, u, f) => e.filter(h, u, f, n))), e.itemSort && (r = r.sort((h, u) => e.itemSort(h, u, n))), At(r, (h) => {
      const u = Uf(e.callbacks, h);
      i.push(we(u, "labelColor", this, h)), o.push(we(u, "labelPointStyle", this, h)), a.push(we(u, "labelTextColor", this, h));
    }), this.labelColors = i, this.labelPointStyles = o, this.labelTextColors = a, this.dataPoints = r, r;
  }
  update(e, s) {
    const n = this.options.setContext(this.getContext()), i = this._active;
    let o, a = [];
    if (!i.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = $i[n.position].call(this, i, this._eventPosition);
      a = this._createItems(n), this.title = this.getTitle(a, n), this.beforeBody = this.getBeforeBody(a, n), this.body = this.getBody(a, n), this.afterBody = this.getAfterBody(a, n), this.footer = this.getFooter(a, n);
      const l = this._size = Hf(this, n), c = Object.assign({}, r, l), h = Vf(this.chart, n, c), u = zf(n, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: u.x,
        y: u.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, o && this._resolveAnimations().update(this, o), e && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(e, s, n, i) {
    const o = this.getCaretPosition(e, n, i);
    s.lineTo(o.x1, o.y1), s.lineTo(o.x2, o.y2), s.lineTo(o.x3, o.y3);
  }
  getCaretPosition(e, s, n) {
    const { xAlign: i, yAlign: o } = this, { caretSize: a, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: u } = wn(r), { x: f, y: p } = e, { width: d, height: g } = s;
    let m, _, y, b, x, v;
    return o === "center" ? (x = p + g / 2, i === "left" ? (m = f, _ = m - a, b = x + a, v = x - a) : (m = f + d, _ = m + a, b = x - a, v = x + a), y = m) : (i === "left" ? _ = f + Math.max(l, h) + a : i === "right" ? _ = f + d - Math.max(c, u) - a : _ = this.caretX, o === "top" ? (b = p, x = b - a, m = _ - a, y = _ + a) : (b = p + g, x = b + a, m = _ + a, y = _ - a), v = b), {
      x1: m,
      x2: _,
      x3: y,
      y1: b,
      y2: x,
      y3: v
    };
  }
  drawTitle(e, s, n) {
    const i = this.title, o = i.length;
    let a, r, l;
    if (o) {
      const c = ai(n.rtl, this.x, this.width);
      for (e.x = ha(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", a = Zt(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = a.string, l = 0; l < o; ++l)
        s.fillText(i[l], c.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + r, l + 1 === o && (e.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(e, s, n, i, o) {
    const a = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = o, h = Zt(o.bodyFont), u = ha(this, "left", o), f = i.x(u), p = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, d = s.y + p;
    if (o.usePointStyle) {
      const g = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = i.leftForLtr(f, c) + c / 2, _ = d + l / 2;
      e.strokeStyle = o.multiKeyBackground, e.fillStyle = o.multiKeyBackground, Ql(e, g, m, _), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, Ql(e, g, m, _);
    } else {
      e.lineWidth = bt(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
      const g = i.leftForLtr(f, c), m = i.leftForLtr(i.xPlus(f, 1), c - 2), _ = wn(a.borderRadius);
      Object.values(_).some((y) => y !== 0) ? (e.beginPath(), e.fillStyle = o.multiKeyBackground, _o(e, {
        x: g,
        y: d,
        w: c,
        h: l,
        radius: _
      }), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), _o(e, {
        x: m,
        y: d + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), e.fill()) : (e.fillStyle = o.multiKeyBackground, e.fillRect(g, d, c, l), e.strokeRect(g, d, c, l), e.fillStyle = a.backgroundColor, e.fillRect(m, d + 1, c - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[n];
  }
  drawBody(e, s, n) {
    const { body: i } = this, { bodySpacing: o, bodyAlign: a, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: h } = n, u = Zt(n.bodyFont);
    let f = u.lineHeight, p = 0;
    const d = ai(n.rtl, this.x, this.width), g = function(C) {
      s.fillText(C, d.x(e.x + p), e.y + f / 2), e.y += f + o;
    }, m = d.textAlign(a);
    let _, y, b, x, v, k, S;
    for (s.textAlign = a, s.textBaseline = "middle", s.font = u.string, e.x = ha(this, m, n), s.fillStyle = n.bodyColor, At(this.beforeBody, g), p = r && m !== "right" ? a === "center" ? c / 2 + h : c + 2 + h : 0, x = 0, k = i.length; x < k; ++x) {
      for (_ = i[x], y = this.labelTextColors[x], s.fillStyle = y, At(_.before, g), b = _.lines, r && b.length && (this._drawColorBox(s, e, x, d, n), f = Math.max(u.lineHeight, l)), v = 0, S = b.length; v < S; ++v)
        g(b[v]), f = u.lineHeight;
      At(_.after, g);
    }
    p = 0, f = u.lineHeight, At(this.afterBody, g), e.y -= o;
  }
  drawFooter(e, s, n) {
    const i = this.footer, o = i.length;
    let a, r;
    if (o) {
      const l = ai(n.rtl, this.x, this.width);
      for (e.x = ha(this, n.footerAlign, n), e.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", a = Zt(n.footerFont), s.fillStyle = n.footerColor, s.font = a.string, r = 0; r < o; ++r)
        s.fillText(i[r], l.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(e, s, n, i) {
    const { xAlign: o, yAlign: a } = this, { x: r, y: l } = e, { width: c, height: h } = n, { topLeft: u, topRight: f, bottomLeft: p, bottomRight: d } = wn(i.cornerRadius);
    s.fillStyle = i.backgroundColor, s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.beginPath(), s.moveTo(r + u, l), a === "top" && this.drawCaret(e, s, n, i), s.lineTo(r + c - f, l), s.quadraticCurveTo(r + c, l, r + c, l + f), a === "center" && o === "right" && this.drawCaret(e, s, n, i), s.lineTo(r + c, l + h - d), s.quadraticCurveTo(r + c, l + h, r + c - d, l + h), a === "bottom" && this.drawCaret(e, s, n, i), s.lineTo(r + p, l + h), s.quadraticCurveTo(r, l + h, r, l + h - p), a === "center" && o === "left" && this.drawCaret(e, s, n, i), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), i.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(e) {
    const s = this.chart, n = this.$animations, i = n && n.x, o = n && n.y;
    if (i || o) {
      const a = $i[e.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const r = this._size = Hf(this, e), l = Object.assign({}, a, this._size), c = Vf(s, e, l), h = zf(e, l, c, s);
      (i._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, h));
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
    }, o = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const a = me(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (e.save(), e.globalAlpha = n, this.drawBackground(o, e, i, s), nm(e, s.textDirection), o.y += a.top, this.drawTitle(o, e, s), this.drawBody(o, e, s), this.drawFooter(o, e, s), im(e, s.textDirection), e.restore());
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
    }), o = !nr(n, i), a = this._positionChanged(i, s);
    (o || a) && (this._active = i, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, o = this._active || [], a = this._getActiveElements(e, o, s, n), r = this._positionChanged(a, e), l = s || !nr(a, o) || r;
    return l && (this._active = a, (i.enabled || i.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(e, s, n, i) {
    const o = this.options;
    if (e.type === "mouseout")
      return [];
    if (!i)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(e, o.mode, o, n);
    return o.reverse && a.reverse(), a;
  }
  _positionChanged(e, s) {
    const { caretX: n, caretY: i, options: o } = this, a = $i[o.position].call(this, e, s);
    return a !== !1 && (n !== a.x || i !== a.y);
  }
}
Q(ac, "positioners", $i);
var Tw = {
  id: "tooltip",
  _element: ac,
  positioners: $i,
  afterInit(t, e, s) {
    s && (t.tooltip = new ac({
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
    callbacks: Dm
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
}, Dw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: HS,
  Decimation: US,
  Filler: fw,
  Legend: bw,
  SubTitle: vw,
  Title: xw,
  Tooltip: Tw
});
const Rw = (t, e, s, n) => (typeof e == "string" ? (s = t.push(e) - 1, n.unshift({
  index: s,
  label: e
})) : isNaN(e) && (s = null), s);
function Lw(t, e, s, n) {
  const i = t.indexOf(e);
  if (i === -1)
    return Rw(t, e, s, n);
  const o = t.lastIndexOf(e);
  return i !== o ? s : i;
}
const Ow = (t, e) => t === null ? null : se(Math.round(t), 0, e);
function qf(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class rc extends In {
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const s = this._addedLabels;
    if (s.length) {
      const n = this.getLabels();
      for (const { index: i, label: o } of s)
        n[i] === o && n.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, s) {
    if (mt(e))
      return null;
    const n = this.getLabels();
    return s = isFinite(s) && n[s] === e ? s : Lw(n, e, ut(s, e), this._addedLabels), Ow(s, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (n = 0), s || (i = this.getLabels().length - 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const e = this.min, s = this.max, n = this.options.offset, i = [];
    let o = this.getLabels();
    o = e === 0 && s === o.length - 1 ? o : o.slice(e, s + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let a = e; a <= s; a++)
      i.push({
        value: a
      });
    return i;
  }
  getLabelForValue(e) {
    return qf.call(this, e);
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
Q(rc, "id", "category"), Q(rc, "defaults", {
  ticks: {
    callback: qf
  }
});
function Fw(t, e) {
  const s = [], { bounds: i, step: o, min: a, max: r, precision: l, count: c, maxTicks: h, maxDigits: u, includeBounds: f } = t, p = o || 1, d = h - 1, { min: g, max: m } = e, _ = !mt(a), y = !mt(r), b = !mt(c), x = (m - g) / (u + 1);
  let v = Wu((m - g) / d / p) * p, k, S, C, D;
  if (v < 1e-14 && !_ && !y)
    return [
      {
        value: g
      },
      {
        value: m
      }
    ];
  D = Math.ceil(m / v) - Math.floor(g / v), D > d && (v = Wu(D * v / d / p) * p), mt(l) || (k = Math.pow(10, l), v = Math.ceil(v * k) / k), i === "ticks" ? (S = Math.floor(g / v) * v, C = Math.ceil(m / v) * v) : (S = g, C = m), _ && y && o && M_((r - a) / o, v / 1e3) ? (D = Math.round(Math.min((r - a) / v, h)), v = (r - a) / D, S = a, C = r) : b ? (S = _ ? a : S, C = y ? r : C, D = c - 1, v = (C - S) / D) : (D = (C - S) / v, Xi(D, Math.round(D), v / 1e3) ? D = Math.round(D) : D = Math.ceil(D));
  const O = Math.max(Hu(v), Hu(S));
  k = Math.pow(10, mt(l) ? O : l), S = Math.round(S * k) / k, C = Math.round(C * k) / k;
  let I = 0;
  for (_ && (f && S !== a ? (s.push({
    value: a
  }), S < a && I++, Xi(Math.round((S + I * v) * k) / k, a, Yf(a, x, t)) && I++) : S < a && I++); I < D; ++I) {
    const w = Math.round((S + I * v) * k) / k;
    if (y && w > r)
      break;
    s.push({
      value: w
    });
  }
  return y && f && C !== r ? s.length && Xi(s[s.length - 1].value, r, Yf(r, x, t)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || C === r) && s.push({
    value: C
  }), s;
}
function Yf(t, e, { horizontal: s, minRotation: n }) {
  const i = ze(n), o = (s ? Math.sin(i) : Math.cos(i)) || 1e-3, a = 0.75 * e * ("" + t).length;
  return Math.min(e / o, a);
}
class ur extends In {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, s) {
    return mt(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: s, maxDefined: n } = this.getUserBounds();
    let { min: i, max: o } = this;
    const a = (l) => i = s ? i : l, r = (l) => o = n ? o : l;
    if (e) {
      const l = is(i), c = is(o);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && a(0);
    }
    if (i === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      r(o + l), e || a(i - l);
    }
    this.min = i, this.max = o;
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
    }, o = this._range || this, a = Fw(i, o);
    return e.bounds === "ticks" && jg(a, this, "value"), e.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
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
    return Io(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class lc extends ur {
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!0);
    this.min = jt(e) ? e : 0, this.max = jt(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), s = e ? this.width : this.height, n = ze(this.options.ticks.minRotation), i = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, o.lineHeight / i));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
Q(lc, "id", "linear"), Q(lc, "defaults", {
  ticks: {
    callback: Or.formatters.numeric
  }
});
const vo = (t) => Math.floor(Vs(t)), cn = (t, e) => Math.pow(10, vo(t) + e);
function Kf(t) {
  return t / Math.pow(10, vo(t)) === 1;
}
function Jf(t, e, s) {
  const n = Math.pow(10, s), i = Math.floor(t / n);
  return Math.ceil(e / n) - i;
}
function Ew(t, e) {
  const s = e - t;
  let n = vo(s);
  for (; Jf(t, e, n) > 10; )
    n++;
  for (; Jf(t, e, n) < 10; )
    n--;
  return Math.min(n, vo(t));
}
function Iw(t, { min: e, max: s }) {
  e = Le(t.min, e);
  const n = [], i = vo(e);
  let o = Ew(e, s), a = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const r = Math.pow(10, o), l = i > o ? Math.pow(10, i) : 0, c = Math.round((e - l) * a) / a, h = Math.floor((e - l) / r / 10) * r * 10;
  let u = Math.floor((c - h) / Math.pow(10, o)), f = Le(t.min, Math.round((l + h + u * Math.pow(10, o)) * a) / a);
  for (; f < s; )
    n.push({
      value: f,
      major: Kf(f),
      significand: u
    }), u >= 10 ? u = u < 15 ? 15 : 20 : u++, u >= 20 && (o++, u = 2, a = o >= 0 ? 1 : a), f = Math.round((l + h + u * Math.pow(10, o)) * a) / a;
  const p = Le(t.max, f);
  return n.push({
    value: p,
    major: Kf(p),
    significand: u
  }), n;
}
class cc extends In {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, s) {
    const n = ur.prototype.parse.apply(this, [
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
    this.min = jt(e) ? Math.max(0, e) : null, this.max = jt(s) ? Math.max(0, s) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !jt(this._userMin) && (this.min = e === cn(this.min, 0) ? cn(this.min, -1) : cn(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: s } = this.getUserBounds();
    let n = this.min, i = this.max;
    const o = (r) => n = e ? n : r, a = (r) => i = s ? i : r;
    n === i && (n <= 0 ? (o(1), a(10)) : (o(cn(n, -1)), a(cn(i, 1)))), n <= 0 && o(cn(i, -1)), i <= 0 && a(cn(n, 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const e = this.options, s = {
      min: this._userMin,
      max: this._userMax
    }, n = Iw(s, this);
    return e.bounds === "ticks" && jg(n, this, "value"), e.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : Io(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = Vs(e), this._valueRange = Vs(this.max) - Vs(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (Vs(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const s = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + s * this._valueRange);
  }
}
Q(cc, "id", "logarithmic"), Q(cc, "defaults", {
  ticks: {
    callback: Or.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function hc(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const s = me(e.backdropPadding);
    return ut(e.font && e.font.size, It.font.size) + s.height;
  }
  return 0;
}
function Nw(t, e, s) {
  return s = Ft(s) ? s : [
    s
  ], {
    w: V_(t, e.string, s),
    h: s.length * e.lineHeight
  };
}
function Xf(t, e, s, n, i) {
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
function Bw(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, s = Object.assign({}, e), n = [], i = [], o = t._pointLabels.length, a = t.options.pointLabels, r = a.centerPointLabels ? vt / o : 0;
  for (let l = 0; l < o; l++) {
    const c = a.setContext(t.getPointLabelContext(l));
    i[l] = c.padding;
    const h = t.getPointPosition(l, t.drawingArea + i[l], r), u = Zt(c.font), f = Nw(t.ctx, u, t._pointLabels[l]);
    n[l] = f;
    const p = fe(t.getIndexAngle(l) + r), d = Math.round(rh(p)), g = Xf(d, h.x, f.w, 0, 180), m = Xf(d, h.y, f.h, 90, 270);
    $w(s, e, p, g, m);
  }
  t.setCenterPoint(e.l - s.l, s.r - e.r, e.t - s.t, s.b - e.b), t._pointLabelItems = Hw(t, n, i);
}
function $w(t, e, s, n, i) {
  const o = Math.abs(Math.sin(s)), a = Math.abs(Math.cos(s));
  let r = 0, l = 0;
  n.start < e.l ? (r = (e.l - n.start) / o, t.l = Math.min(t.l, e.l - r)) : n.end > e.r && (r = (n.end - e.r) / o, t.r = Math.max(t.r, e.r + r)), i.start < e.t ? (l = (e.t - i.start) / a, t.t = Math.min(t.t, e.t - l)) : i.end > e.b && (l = (i.end - e.b) / a, t.b = Math.max(t.b, e.b + l));
}
function jw(t, e, s) {
  const n = t.drawingArea, { extra: i, additionalAngle: o, padding: a, size: r } = s, l = t.getPointPosition(e, n + i + a, o), c = Math.round(rh(fe(l.angle + qt))), h = Gw(l.y, r.h, c), u = Vw(c), f = zw(l.x, r.w, u);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: u,
    left: f,
    top: h,
    right: f + r.w,
    bottom: h + r.h
  };
}
function Ww(t, e) {
  if (!e)
    return !0;
  const { left: s, top: n, right: i, bottom: o } = t;
  return !(vs({
    x: s,
    y: n
  }, e) || vs({
    x: s,
    y: o
  }, e) || vs({
    x: i,
    y: n
  }, e) || vs({
    x: i,
    y: o
  }, e));
}
function Hw(t, e, s) {
  const n = [], i = t._pointLabels.length, o = t.options, { centerPointLabels: a, display: r } = o.pointLabels, l = {
    extra: hc(o) / 2,
    additionalAngle: a ? vt / i : 0
  };
  let c;
  for (let h = 0; h < i; h++) {
    l.padding = s[h], l.size = e[h];
    const u = jw(t, h, l);
    n.push(u), r === "auto" && (u.visible = Ww(u, c), u.visible && (c = u));
  }
  return n;
}
function Vw(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function zw(t, e, s) {
  return s === "right" ? t -= e : s === "center" && (t -= e / 2), t;
}
function Gw(t, e, s) {
  return s === 90 || s === 270 ? t -= e / 2 : (s > 270 || s < 90) && (t -= e), t;
}
function Uw(t, e, s) {
  const { left: n, top: i, right: o, bottom: a } = s, { backdropColor: r } = e;
  if (!mt(r)) {
    const l = wn(e.borderRadius), c = me(e.backdropPadding);
    t.fillStyle = r;
    const h = n - c.left, u = i - c.top, f = o - n + c.width, p = a - i + c.height;
    Object.values(l).some((d) => d !== 0) ? (t.beginPath(), _o(t, {
      x: h,
      y: u,
      w: f,
      h: p,
      radius: l
    }), t.fill()) : t.fillRect(h, u, f, p);
  }
}
function qw(t, e) {
  const { ctx: s, options: { pointLabels: n } } = t;
  for (let i = e - 1; i >= 0; i--) {
    const o = t._pointLabelItems[i];
    if (!o.visible)
      continue;
    const a = n.setContext(t.getPointLabelContext(i));
    Uw(s, a, o);
    const r = Zt(a.font), { x: l, y: c, textAlign: h } = o;
    Ln(s, t._pointLabels[i], l, c + r.lineHeight / 2, r, {
      color: a.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Rm(t, e, s, n) {
  const { ctx: i } = t;
  if (s)
    i.arc(t.xCenter, t.yCenter, e, 0, Ot);
  else {
    let o = t.getPointPosition(0, e);
    i.moveTo(o.x, o.y);
    for (let a = 1; a < n; a++)
      o = t.getPointPosition(a, e), i.lineTo(o.x, o.y);
  }
}
function Yw(t, e, s, n, i) {
  const o = t.ctx, a = e.circular, { color: r, lineWidth: l } = e;
  !a && !n || !r || !l || s < 0 || (o.save(), o.strokeStyle = r, o.lineWidth = l, o.setLineDash(i.dash || []), o.lineDashOffset = i.dashOffset, o.beginPath(), Rm(t, s, a, n), o.closePath(), o.stroke(), o.restore());
}
function Kw(t, e, s) {
  return tn(t, {
    label: s,
    index: e,
    type: "pointLabel"
  });
}
class ji extends ur {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = me(hc(this.options) / 2), s = this.width = this.maxWidth - e.width, n = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + s / 2 + e.left), this.yCenter = Math.floor(this.top + n / 2 + e.top), this.drawingArea = Math.floor(Math.min(s, n) / 2);
  }
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!1);
    this.min = jt(e) && !isNaN(e) ? e : 0, this.max = jt(s) && !isNaN(s) ? s : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / hc(this.options));
  }
  generateTickLabels(e) {
    ur.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((s, n) => {
      const i = Rt(this.options.pointLabels.callback, [
        s,
        n
      ], this);
      return i || i === 0 ? i : "";
    }).filter((s, n) => this.chart.getDataVisibility(n));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? Bw(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, s, n, i) {
    this.xCenter += Math.floor((e - s) / 2), this.yCenter += Math.floor((n - i) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, s, n, i));
  }
  getIndexAngle(e) {
    const s = Ot / (this._pointLabels.length || 1), n = this.options.startAngle || 0;
    return fe(e * s + ze(n));
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
      return Kw(this.getContext(), e, n);
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
    const { left: s, top: n, right: i, bottom: o } = this._pointLabelItems[e];
    return {
      left: s,
      top: n,
      right: i,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: e, grid: { circular: s } } = this.options;
    if (e) {
      const n = this.ctx;
      n.save(), n.beginPath(), Rm(this, this.getDistanceFromCenterForValue(this._endValue), s, this._pointLabels.length), n.closePath(), n.fillStyle = e, n.fill(), n.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, s = this.options, { angleLines: n, grid: i, border: o } = s, a = this._pointLabels.length;
    let r, l, c;
    if (s.pointLabels.display && qw(this, a), i.display && this.ticks.forEach((h, u) => {
      if (u !== 0 || u === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const f = this.getContext(u), p = i.setContext(f), d = o.setContext(f);
        Yw(this, p, l, a, d);
      }
    }), n.display) {
      for (e.save(), r = a - 1; r >= 0; r--) {
        const h = n.setContext(this.getPointLabelContext(r)), { color: u, lineWidth: f } = h;
        !f || !u || (e.lineWidth = f, e.strokeStyle = u, e.setLineDash(h.borderDash), e.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(s.reverse ? this.min : this.max), c = this.getPointPosition(r, l), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(c.x, c.y), e.stroke());
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
    let o, a;
    e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(i), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((r, l) => {
      if (l === 0 && this.min >= 0 && !s.reverse)
        return;
      const c = n.setContext(this.getContext(l)), h = Zt(c.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        e.font = h.string, a = e.measureText(r.label).width, e.fillStyle = c.backdropColor;
        const u = me(c.backdropPadding);
        e.fillRect(-a / 2 - u.left, -o - h.size / 2 - u.top, a + u.width, h.size + u.height);
      }
      Ln(e, r.label, 0, -o, h, {
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
    callback: Or.formatters.numeric
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
const $r = {
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
}, Ae = /* @__PURE__ */ Object.keys($r);
function Zf(t, e) {
  return t - e;
}
function Qf(t, e) {
  if (mt(e))
    return null;
  const s = t._adapter, { parser: n, round: i, isoWeekday: o } = t._parseOpts;
  let a = e;
  return typeof n == "function" && (a = n(a)), jt(a) || (a = typeof n == "string" ? s.parse(a, n) : s.parse(a)), a === null ? null : (i && (a = i === "week" && (di(o) || o === !0) ? s.startOf(a, "isoWeek", o) : s.startOf(a, i)), +a);
}
function td(t, e, s, n) {
  const i = Ae.length;
  for (let o = Ae.indexOf(t); o < i - 1; ++o) {
    const a = $r[Ae[o]], r = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((s - e) / (r * a.size)) <= n)
      return Ae[o];
  }
  return Ae[i - 1];
}
function Jw(t, e, s, n, i) {
  for (let o = Ae.length - 1; o >= Ae.indexOf(s); o--) {
    const a = Ae[o];
    if ($r[a].common && t._adapter.diff(i, n, a) >= e - 1)
      return a;
  }
  return Ae[s ? Ae.indexOf(s) : 0];
}
function Xw(t) {
  for (let e = Ae.indexOf(t) + 1, s = Ae.length; e < s; ++e)
    if ($r[Ae[e]].common)
      return Ae[e];
}
function ed(t, e, s) {
  if (!s)
    t[e] = !0;
  else if (s.length) {
    const { lo: n, hi: i } = lh(s, e), o = s[n] >= e ? s[n] : s[i];
    t[o] = !0;
  }
}
function Zw(t, e, s, n) {
  const i = t._adapter, o = +i.startOf(e[0].value, n), a = e[e.length - 1].value;
  let r, l;
  for (r = o; r <= a; r = +i.add(r, 1, n))
    l = s[r], l >= 0 && (e[l].major = !0);
  return e;
}
function sd(t, e, s) {
  const n = [], i = {}, o = e.length;
  let a, r;
  for (a = 0; a < o; ++a)
    r = e[a], i[r] = a, n.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? n : Zw(t, n, i, s);
}
class So extends In {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, s = {}) {
    const n = e.time || (e.time = {}), i = this._adapter = new av._date(e.adapters.date);
    i.init(s), Ji(n.displayFormats, i.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(e), this._normalized = s.normalized;
  }
  parse(e, s) {
    return e === void 0 ? null : Qf(this, e);
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
    let { min: i, max: o, minDefined: a, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !a && !isNaN(c.min) && (i = Math.min(i, c.min)), !r && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!a || !r) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), i = jt(i) && !isNaN(i) ? i : +s.startOf(Date.now(), n), o = jt(o) && !isNaN(o) ? o : +s.endOf(Date.now(), n) + 1, this.min = Math.min(i, o - 1), this.max = Math.max(i + 1, o);
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
    const o = this.min, a = this.max, r = D_(i, o, a);
    return this._unit = s.unit || (n.autoSkip ? td(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Jw(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Xw(this._unit), this.initOffsets(i), e.reverse && r.reverse(), sd(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let s = 0, n = 0, i, o;
    this.options.offset && e.length && (i = this.getDecimalForValue(e[0]), e.length === 1 ? s = 1 - i : s = (this.getDecimalForValue(e[1]) - i) / 2, o = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? n = o : n = (o - this.getDecimalForValue(e[e.length - 2])) / 2);
    const a = e.length < 3 ? 0.5 : 0.25;
    s = se(s, 0, a), n = se(n, 0, a), this._offsets = {
      start: s,
      end: n,
      factor: 1 / (s + 1 + n)
    };
  }
  _generate() {
    const e = this._adapter, s = this.min, n = this.max, i = this.options, o = i.time, a = o.unit || td(o.minUnit, s, n, this._getLabelCapacity(s)), r = ut(i.ticks.stepSize, 1), l = a === "week" ? o.isoWeekday : !1, c = di(l) || l === !0, h = {};
    let u = s, f, p;
    if (c && (u = +e.startOf(u, "isoWeek", l)), u = +e.startOf(u, c ? "day" : a), e.diff(n, s, a) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + a);
    const d = i.ticks.source === "data" && this.getDataTimestamps();
    for (f = u, p = 0; f < n; f = +e.add(f, r, a), p++)
      ed(h, f, d);
    return (f === n || i.bounds === "ticks" || p === 1) && ed(h, f, d), Object.keys(h).sort(Zf).map((g) => +g);
  }
  getLabelForValue(e) {
    const s = this._adapter, n = this.options.time;
    return n.tooltipFormat ? s.format(e, n.tooltipFormat) : s.format(e, n.displayFormats.datetime);
  }
  format(e, s) {
    const i = this.options.time.displayFormats, o = this._unit, a = s || i[o];
    return this._adapter.format(e, a);
  }
  _tickFormatFunction(e, s, n, i) {
    const o = this.options, a = o.ticks.callback;
    if (a)
      return Rt(a, [
        e,
        s,
        n
      ], this);
    const r = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && r[l], u = c && r[c], f = n[s], p = c && u && f && f.major;
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
    const s = this.options.ticks, n = this.ctx.measureText(e).width, i = ze(this.isHorizontal() ? s.maxRotation : s.minRotation), o = Math.cos(i), a = Math.sin(i), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * o + r * a,
      h: n * a + r * o
    };
  }
  _getLabelCapacity(e) {
    const s = this.options.time, n = s.displayFormats, i = n[s.unit] || n.millisecond, o = this._tickFormatFunction(e, 0, sd(this, [
      e
    ], this._majorUnit), i), a = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
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
      e.push(Qf(this, i[s]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return Vg(e.sort(Zf));
  }
}
Q(So, "id", "time"), Q(So, "defaults", {
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
function ua(t, e, s) {
  let n = 0, i = t.length - 1, o, a, r, l;
  s ? (e >= t[n].pos && e <= t[i].pos && ({ lo: n, hi: i } = xs(t, "pos", e)), { pos: o, time: r } = t[n], { pos: a, time: l } = t[i]) : (e >= t[n].time && e <= t[i].time && ({ lo: n, hi: i } = xs(t, "time", e)), { time: o, pos: r } = t[n], { time: a, pos: l } = t[i]);
  const c = a - o;
  return c ? r + (l - r) * (e - o) / c : r;
}
class uc extends So {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(e);
    this._minPos = ua(s, this.min), this._tableRange = ua(s, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: s, max: n } = this, i = [], o = [];
    let a, r, l, c, h;
    for (a = 0, r = e.length; a < r; ++a)
      c = e[a], c >= s && c <= n && i.push(c);
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
    for (a = 0, r = i.length; a < r; ++a)
      h = i[a + 1], l = i[a - 1], c = i[a], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: a / (r - 1)
      });
    return o;
  }
  _generate() {
    const e = this.min, s = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(e) || !n.length) && n.splice(0, 0, e), (!n.includes(s) || n.length === 1) && n.push(s), n.sort((i, o) => i - o);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const s = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return s.length && n.length ? e = this.normalize(s.concat(n)) : e = s.length ? s : n, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (ua(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const s = this._offsets, n = this.getDecimalForPixel(e) / s.factor - s.end;
    return ua(this._table, n * this._tableRange + this._minPos, !0);
  }
}
Q(uc, "id", "timeseries"), Q(uc, "defaults", So.defaults);
var Qw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: rc,
  LinearScale: lc,
  LogarithmicScale: cc,
  RadialLinearScale: ji,
  TimeScale: So,
  TimeSeriesScale: uc
});
const tC = [
  ov,
  ES,
  Dw,
  Qw
];
cr.register(...tC);
const it = "https://slowfootball.club/api", $t = "Arsenal", eC = "https://sf-game-proxy.ofersi15.workers.dev/token", eo = ["north", "south", "europa", "world", "conference", "hipster"], yl = /* @__PURE__ */ new Set(["Barcelona", "Bayern Munich", "Juventus", "Damac", "Saudi All-Stars", "Inter Miami"]), fa = ["GK", "FB", "CB", "DM", "CM", "AM", "WF", "CF"], fc = ["FB", "CB", "DM", "CM", "AM", "WF", "CF"], bl = 100, Vn = "sf_tactics_v4", sC = 7 * 24 * 60 * 60 * 1e3, zn = "sf_players_v6", da = "sf_stats_v1", nC = 6 * 60 * 60 * 1e3, iC = 7 * 24 * 60 * 60 * 1e3, oC = 6 * 60 * 60 * 1e3, nd = "sf_submissions_all_v1", pa = "sf_subs_ls", mi = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  DM: ["Tackling", "Passing", "Vision", "Marking"],
  CM: ["Vision", "Passing", "Dribbling", "Shooting"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, id = {
  GK: "Han, Ref, Spd, Pas",
  FB: "Pas, Tck, Sta, Mk",
  CB: "Mk, Hdg, Tck, Spd",
  DM: "Tck, Pas, Vis, Mk",
  CM: "Vis, Pas, Drb, Sh",
  AM: "Pas, Drb, Sh, Vis",
  WF: "Drb, Pas, Spd, Sh",
  CF: "Spd, Drb, Hdg, Sh"
}, aC = {
  GK: ["GK"],
  CB: ["CB", "FB", "DM"],
  FB: ["FB", "CB", "DM"],
  DM: ["DM", "FB", "CB", "AM"],
  CM: ["CM", "DM", "AM"],
  AM: ["AM", "WF", "CF", "DM"],
  WM: ["FB", "DM", "AM", "WF"],
  WF: ["WF", "AM", "CF"],
  CF: ["CF", "WF", "AM"]
}, rC = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  DM: ["Tackling", "Marking", "Passing", "Vision"],
  CM: ["Passing", "Vision", "Tackling", "Dribbling"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WM: ["Stamina", "Passing", "Speed", "Dribbling"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, od = ["Mentality", "Experience", "Work rate"], yn = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision"], dc = [...yn, "Mentality", "Experience", "Leadership", "Work rate"], ad = [...dc, "Adaptability", "Form", "Confidence"], _h = {
  442: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "CF", "CF"],
  4411: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "AM", "CF"],
  4231: ["GK", "FB", "CB", "CB", "FB", "DM", "DM", "WF", "AM", "WF", "CF"],
  433: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "WF", "WF", "CF"],
  4321: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "AM", "AM", "CF"],
  3421: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "AM", "AM", "CF"],
  352: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "CM", "WM", "CF", "CF"],
  343: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "WF", "CF", "WF"]
}, lC = {
  442: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 55 }, { x: 44, y: 55 }, { x: 24, y: 55 }, { x: 9, y: 55 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  4411: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 57 }, { x: 44, y: 57 }, { x: 24, y: 57 }, { x: 9, y: 57 }, { x: 34, y: 35 }, { x: 34, y: 13 }],
  4231: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 45, y: 63 }, { x: 23, y: 63 }, { x: 58, y: 40 }, { x: 34, y: 40 }, { x: 10, y: 40 }, { x: 34, y: 13 }],
  433: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 48, y: 56 }, { x: 34, y: 56 }, { x: 20, y: 56 }, { x: 58, y: 28 }, { x: 10, y: 28 }, { x: 34, y: 13 }],
  3421: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 44, y: 35 }, { x: 24, y: 35 }, { x: 34, y: 13 }],
  352: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 61, y: 58 }, { x: 46, y: 58 }, { x: 34, y: 58 }, { x: 22, y: 58 }, { x: 7, y: 58 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  343: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 58, y: 20 }, { x: 34, y: 13 }, { x: 10, y: 20 }],
  4321: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 50, y: 60 }, { x: 34, y: 60 }, { x: 18, y: 60 }, { x: 44, y: 37 }, { x: 24, y: 37 }, { x: 34, y: 13 }]
}, rd = { GK: 0, CB: 1, FB: 2, DM: 3, CM: 4, WM: 5, AM: 6, WF: 7, CF: 8 }, ld = {
  GK: { fill: "#2d4a1a", stroke: "#7ee787", text: "#7ee787" },
  FB: { fill: "#1a3a5e", stroke: "#79c0ff", text: "#79c0ff" },
  CB: { fill: "#1a3060", stroke: "#79c0ff", text: "#79c0ff" },
  DM: { fill: "#3a2a6b", stroke: "#d2a8ff", text: "#d2a8ff" },
  CM: { fill: "#3a2a1a", stroke: "#ffa657", text: "#ffa657" },
  WM: { fill: "#3a1a3a", stroke: "#d2a8ff", text: "#d2a8ff" },
  AM: { fill: "#4a3a10", stroke: "#ffa657", text: "#ffa657" },
  WF: { fill: "#3a1a1a", stroke: "#ff7b72", text: "#ff7b72" },
  CF: { fill: "#5a1010", stroke: "#ff7b72", text: "#ff7b72" }
}, pc = (/* @__PURE__ */ new Date("2025-08-23T00:00:00Z")).getTime(), Lm = 7 * 24 * 60 * 60 * 1e3;
function Ss(t, e) {
  const s = mi[e];
  if (!s) return null;
  const n = s.map((i) => t[i]).filter((i) => i != null && i > 0);
  return n.length ? Math.round(n.reduce((i, o) => i + o, 0) / n.length * 10) / 10 : null;
}
function wo(t, e, s, n) {
  const i = Ss(t, e);
  if (i === null) return null;
  if (!n || !s.length) return i;
  const o = s.map((l) => t[l]).filter((l) => l != null && l > 0);
  if (!o.length) return i;
  const a = o.reduce((l, c) => l + c, 0) / o.length, r = n / 100;
  return Math.round((i * (1 - r) + a * r) * 10) / 10;
}
function cC(t) {
  if (!t.Value || !t.Rating) return null;
  const e = t.Rating, s = t.Age || 26, n = e >= 87 ? 4 : e >= 84 ? 3 : e >= 81 ? 2.2 : e >= 78 ? 1.7 : e >= 75 ? 1.3 : 1, i = s <= 22 ? 1.5 : s <= 25 ? 1.3 : s <= 28 ? 1 : s <= 31 ? 0.75 : 0.5, o = t.Value * n * i;
  return Math.round(o / 5e5) * 5e5 || Math.round(o / 1e5) * 1e5;
}
function Jn(t) {
  return t >= 1e6 ? `£${(t / 1e6).toFixed(1)}m` : t >= 1e3 ? `£${(t / 1e3).toFixed(0)}k` : t ? `£${t}` : "—";
}
function hC(t) {
  return t ? `£${(t / 1e3).toFixed(0)}k/w` : "—";
}
function uC(t) {
  return t == null ? "—" : (t >= 0 ? "+" : "") + t.toFixed(2);
}
function fC(t) {
  return t ? String(t).split("").join("-") : null;
}
function Ri(t) {
  return t ? String(t).replace(/-/g, "") : null;
}
function dC(t) {
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
function pC(t) {
  if (!t) return "—";
  const e = new Date(t);
  if (isNaN(e.getTime())) return "—";
  const s = Date.now() - e.getTime();
  return s < 6e4 ? "just now" : s < 36e5 ? Math.floor(s / 6e4) + "m ago" : s < 864e5 ? Math.floor(s / 36e5) + "h ago" : s < 7 * 864e5 ? Math.floor(s / 864e5) + "d ago" : e.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
function jr() {
  return Math.max(0, Math.round((Date.now() - pc) / Lm));
}
function Co(t, e, s) {
  const n = (r) => String(r || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(), i = n(t), o = n(e), a = (s || []).filter((r) => n(r.playerName || r.player || r.name || "") === i && n(r.toClub || r.buyer || r.buyerClub || r.to || "") === o).map((r) => {
    const l = r.ts || r.updatedAt || r.createdAt || r.date;
    if (!l) return null;
    const c = new Date(l).getTime();
    return !c || c < pc ? 0 : Math.round((c - pc) / Lm);
  }).filter((r) => r !== null).sort((r, l) => r - l);
  return a.length ? Math.max(0, jr() - a[0]) : null;
}
function gc(t) {
  const e = t.Position || "", s = (o) => Number(t[o] || 0), n = [];
  (e === "CF" || e === "WF") && (s("Shooting") >= 80 && n.push({ n: "Clinical Finisher", d: "Consistently puts away their chances." }), s("Speed") >= 82 && n.push({ n: "Pace Merchant", d: "Explosive behind defensive lines." }), s("Heading") >= 80 && e === "CF" && n.push({ n: "Aerial Threat", d: "Dominant in the air from crosses and corners." }), s("Dribbling") >= 80 && n.push({ n: "Close Control", d: "Exceptional in tight areas, difficult to dispossess." })), (e === "CM" || e === "AM" || e === "DM") && (s("Vision") >= 82 && n.push({ n: "Visionary", d: "Sees passes others miss. Finds runners in behind." }), s("Passing") >= 82 && n.push({ n: "Metronome", d: "High pass completion with the range to switch play." }), e === "DM" && s("Tackling") >= 80 && n.push({ n: "Ball Winner", d: "Reads attacks early to break up play." }), s("Dribbling") >= 80 && n.push({ n: "Carrier", d: "Drives through midfield under pressure." })), (e === "CB" || e === "FB") && (s("Tackling") >= 82 && n.push({ n: "Tackle Machine", d: "Ferocious in the challenge." }), s("Heading") >= 82 && n.push({ n: "Aerial Dominator", d: "Set piece threat at both ends of the pitch." }), s("Passing") >= 78 && n.push({ n: "Distribution", d: "Comfortable on the ball, plays out from the back." }), e === "FB" && s("Speed") >= 80 && n.push({ n: "Overlap Merchant", d: "Creates width and overloads in wide areas." })), e === "GK" && (s("Reflexes") >= 82 && n.push({ n: "Reaction Royalty", d: "Makes saves that look impossible." }), s("Handling") >= 80 && n.push({ n: "Safe Hands", d: "Commanding under crosses." }), s("Speed") >= 72 && n.push({ n: "Sweeper Keeper", d: "Comfortable with the ball at their feet." }));
  const i = mi[e] || [];
  if (i.length && i.reduce((a, r) => a + s(r), 0) / i.length >= 83) {
    const a = t.Archetype || t.archetype || e;
    n.push({ n: `Complete ${a}`, d: "Exceptionally well-rounded — no significant weaknesses." });
  }
  return n.slice(0, 4);
}
function Om(t, e, s) {
  if (!t || !t.Player || !t.Club) return [];
  const n = jr(), i = Co(t.Player, t.Club, s) ?? n, o = t.Nationality || "";
  return (e || []).filter((a) => a.Player !== t.Player && a.Position).slice(0, 12).map((a) => {
    const r = Co(a.Player, t.Club, s) ?? n, l = Math.min(i, r);
    if (l < 13) return null;
    const c = !!(o && o === (a.Nationality || "")), h = l >= 30 || c && l >= 25 ? "great" : "good", u = l >= 60 ? "Long-term" : l >= 30 ? "Established" : "Building";
    return { name: a.Player, pos: a.Position, weeks: l, category: h, label: u, sameNat: c };
  }).filter(Boolean).sort((a, r) => r.weeks - a.weeks);
}
function gC(t, e) {
  const [s, n] = [t, e].sort(), i = s + "" + n;
  let o = 2166136261;
  for (let a = 0; a < i.length; a++)
    o ^= i.charCodeAt(a), o = Math.imul(o, 16777619) >>> 0;
  return o % 100;
}
function xh(t, e, s) {
  if (!t || !t.Player || !t.Club) return [];
  const n = jr(), i = Co(t.Player, t.Club, s) ?? n;
  return (e || []).filter((o) => o.Player !== t.Player && o.Position).map((o) => {
    const a = Co(o.Player, t.Club, s) ?? n, r = Math.min(i, a);
    return r < 13 || gC(t.Player, o.Player) >= 7 ? null : { name: o.Player, pos: o.Position, weeks: r };
  }).filter(Boolean).sort((o, a) => a.weeks - o.weeks);
}
function Fm(t, e) {
  if (!t || t.length < 2) return null;
  const s = t[0].Club;
  if (!s) return null;
  const n = jr(), i = t.map((r) => Co(r.Player, s, e) ?? n);
  let o = 0, a = 0;
  for (let r = 0; r < i.length; r++)
    for (let l = r + 1; l < i.length; l++)
      o += Math.min(i[r], i[l]) / 60, a++;
  return a ? Math.min(100, Math.round(o / a * 100)) : null;
}
function kn(t) {
  return typeof Worker > "u" ? Promise.resolve(JSON.parse(t)) : new Promise((e, s) => {
    const n = new Blob(
      ["self.onmessage=e=>{try{postMessage({r:JSON.parse(e.data)})}catch(x){postMessage({e:String(x)})}}"],
      { type: "text/javascript" }
    ), i = URL.createObjectURL(n), o = new Worker(i);
    o.onmessage = ({ data: a }) => {
      o.terminate(), URL.revokeObjectURL(i), a.r !== void 0 ? e(a.r) : s(new Error(a.e));
    }, o.onerror = (a) => {
      o.terminate(), URL.revokeObjectURL(i), s(a);
    }, o.postMessage(t);
  });
}
function mc(t) {
  return typeof Worker > "u" ? Promise.resolve(JSON.stringify(t)) : new Promise((e, s) => {
    const n = new Blob(
      ["self.onmessage=e=>{try{postMessage(JSON.stringify(e.data))}catch(x){postMessage({__e:String(x)})}}"],
      { type: "text/javascript" }
    ), i = URL.createObjectURL(n), o = new Worker(i);
    o.onmessage = ({ data: a }) => {
      o.terminate(), URL.revokeObjectURL(i), typeof a == "string" ? e(a) : s(new Error((a == null ? void 0 : a.__e) || "stringify failed"));
    }, o.onerror = (a) => {
      o.terminate(), URL.revokeObjectURL(i), s(a);
    }, o.postMessage(t);
  });
}
let ga = null;
async function _l() {
  return ga || (ga = (await fetch(eC).then((e) => e.json())).token || null, ga);
}
const gs = location.hostname === "sf.ofersi15.workers.dev" ? "https://sf-cache.ofersi15.workers.dev/sf-cache" : "/sf-cache", Da = "https://sf-cache.ofersi15.workers.dev";
async function kt(t, e = !1) {
  if (location.protocol === "file:") return null;
  try {
    const s = { signal: AbortSignal.timeout(3e3) };
    e && (s.cache = "no-store");
    const n = await fetch(`${gs}/${t}`, s);
    return n.ok ? await n.text() : null;
  } catch {
    return null;
  }
}
async function Ke(t, e) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${gs}/${t}?permanent=1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: e,
        signal: AbortSignal.timeout(5e3)
      });
    } catch {
    }
}
async function cd(t) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${gs}/${t}`, { method: "DELETE", signal: AbortSignal.timeout(3e3) });
    } catch {
    }
}
const mC = {
  async loadYouth(t = !1) {
    var r, l, c, h, u, f, p;
    const e = "sf_youth_idx_v2";
    if (this.youthLoading) return;
    this.youthLoading = !0, this.youthLoaded = !1;
    const o = (d, g) => {
      this.youthCap = d.cap || {}, this.youthScouts = (d.scouts || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthAcademy = d.academy || [], this.youthFacilities = d.facilities || {}, this.youthStaff = d.staff || {}, this.youthRejected = (g || d.rejected || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthLoaded = !0, this.youthMsg = "", this.youthScouts.length ? this.youthSubTab = "scouts" : this.youthAcademy.length ? this.youthSubTab = "academy" : this.youthSubTab = "history";
    }, a = (d) => (d || []).map((g) => {
      const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"].filter((_) => this.getYouthAttr(g, _) > 0).length;
      return { ...g, _partial: m < 5 };
    });
    if (!t)
      try {
        let d = await kt(e);
        d || (d = localStorage.getItem(e));
        const g = d ? JSON.parse(d) : null;
        if (g) {
          const m = Date.now(), _ = m - (g.savedAt || 0), y = m - (g.histSavedAt || 0), b = m - (g.staticSavedAt || 0), x = encodeURIComponent($t);
          if (o(g), this.youthLoading = !1, !(_ >= 6e5 || y >= 36e5 || b >= 36e5)) return;
          if (y < 36e5) {
            setTimeout(async () => {
              try {
                const k = _ >= 6e5, S = b >= 36e5, [C, D, O, I] = await Promise.all([
                  k ? fetch(`${it}/scouting/jobs?club=${x}`).then((F) => F.json()) : Promise.resolve(null),
                  k ? fetch(`${it}/academy?club=${x}`).then((F) => F.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/facilities?club=${x}`).then((F) => F.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/staff/effects?club=${x}`).then((F) => F.json()) : Promise.resolve(null)
                ]), w = {
                  ...g,
                  savedAt: k ? m : g.savedAt,
                  staticSavedAt: S ? m : g.staticSavedAt,
                  ...k ? { cap: C.cap || {}, scouts: C.items || [], academy: a(D.items) } : {},
                  ...S ? { facilities: O || {}, staff: (I && I.ok ? I.effects : {}) || {} } : {}
                };
                try {
                  localStorage.setItem(e, JSON.stringify(w));
                } catch {
                }
                o(w);
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
      const d = encodeURIComponent($t), [g, m, _, y] = await Promise.all([
        fetch(`${it}/scouting/jobs?club=${d}`).then((L) => L.json()),
        fetch(`${it}/academy?club=${d}`).then((L) => L.json()),
        fetch(`${it}/facilities?club=${d}`).then((L) => L.json()),
        fetch(`${it}/staff/effects?club=${d}`).then((L) => L.json())
      ]);
      this.youthMsg = "Fetching scout history…";
      const [b, x] = await Promise.all([
        fetch(`${it}/scouting/jobs?club=${d}&status=rejected`).then((L) => L.json()),
        fetch(`${it}/scouting/jobs?club=${d}&status=accepted`).then((L) => L.json()).catch(() => ({}))
      ]), v = m.items || [], k = {};
      for (const L of x.items || []) {
        const P = (((r = L.player) == null ? void 0 : r.name) || ((l = L.player) == null ? void 0 : l.Player) || "").toLowerCase();
        P && (k[P] = L.player);
      }
      for (const L of v) {
        const P = (L.name || L.Player || "").toLowerCase(), M = k[P];
        M && (dc.forEach((T) => {
          M[T] != null && L[T] == null && (L[T] = M[T]);
        }), M.stats && dc.forEach((T) => {
          M.stats[T] != null && L[T] == null && (L[T] = M.stats[T]);
        }));
      }
      const S = a(v), C = (y.ok ? y.effects : {}) || {}, D = Date.now(), O = {
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
      o(O, b.items);
      for (const L of [...g.items || [], ...b.items || []]) {
        const P = (c = L.player) == null ? void 0 : c.stats;
        if (!P || !Object.keys(P).length) continue;
        const M = (L.player.name || L.player.Player || "").toLowerCase();
        if (!M) continue;
        const T = this.players.find((E) => (E.Name || E.name || "").toLowerCase() === M);
        T && T._incompleteStats && (Object.assign(T, P), T._incompleteStats = yn.filter((E) => T[E] != null && T[E] > 0).length < 5);
      }
      const I = yn, w = (L) => L && (I.filter((P) => L[P] != null && L[P] > 0).length >= 5 || L.stats && I.filter((P) => L.stats[P] != null && L.stats[P] > 0).length >= 5), F = (g.items || []).filter((L) => L.player && !w(L.player));
      if (F.length) {
        const L = [...new Set(F.map((T) => {
          var E, H;
          return ((E = T.player) == null ? void 0 : E.club) || ((H = T.player) == null ? void 0 : H.Club);
        }).filter(Boolean))], P = {};
        await Promise.all(L.map(async (T) => {
          try {
            const E = await fetch(`${it}/squads?club=${encodeURIComponent(T)}`).then((H) => H.json());
            P[T.toLowerCase()] = E.players || [];
          } catch {
          }
        }));
        const M = ad;
        for (const T of F) {
          const E = (((h = T.player) == null ? void 0 : h.club) || ((u = T.player) == null ? void 0 : u.Club) || "").toLowerCase(), H = P[E] || [], Y = (((f = T.player) == null ? void 0 : f.name) || ((p = T.player) == null ? void 0 : p.Player) || "").toLowerCase(), Z = H.find((nt) => (nt.Player || "").toLowerCase() === Y);
          Z && (M.forEach((nt) => {
            Z[nt] != null && (T.player[nt] = Z[nt]);
          }), Z.Rating && (T.player.rating = Z.Rating), Z.Value && (T.player.value = Z.Value), Z.Age && (T.player.age = Z.Age));
        }
        O.scouts = g.items || [], Ke(e, JSON.stringify(O));
        try {
          localStorage.setItem(e, JSON.stringify(O));
        } catch {
        }
        o(O, b.items);
      }
    } catch (d) {
      this.youthMsg = "Load failed: " + (d.message || String(d));
    }
    this.youthLoading = !1;
  },
  async refreshYouthJob(t) {
    if (!t._refreshing) {
      t._refreshing = !0, t._refreshed = !1, t._refreshFailed = !1;
      try {
        const e = t.player.club || t.player.Club || "", n = (await fetch(`${it}/squads?club=${encodeURIComponent(e)}`).then((a) => a.json())).players || [], i = (t.player.name || t.player.Player || "").toLowerCase(), o = n.find((a) => (a.Player || "").toLowerCase() === i);
        if (o) {
          const a = ["Speed", "Stamina", "Dribbling", "Passing", "Shooting", "Tackling", "Marking", "Heading", "Vision", "Handling", "Reflexes", "Strength", "Mentality", "Experience", "Leadership", "Work rate", "Adaptability", "Form", "Confidence"], r = {};
          if (a.forEach((l) => {
            o[l] != null && (r[l] = o[l]);
          }), Object.assign(t.player, r, {
            _refreshedAt: (/* @__PURE__ */ new Date()).toLocaleString(),
            rating: o.Rating || o._gameRating || t.player.rating,
            value: o.Value || t.player.value,
            age: o.Age || t.player.age
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
    var n, i, o, a, r;
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
      ), u = (c.clubs || []).filter((x) => h.has(x)), f = [], p = {}, d = 5;
      for (let x = 0; x < u.length; x += d) {
        const v = u.slice(x, x + d);
        this.youthHistMsg = `Scanning clubs ${Math.min(x + d, u.length)}/${u.length}…`, this.youthHistProgress = Math.round(Math.min(x + d, u.length) / u.length * 100), await Promise.all(v.map(async (k) => {
          const S = encodeURIComponent(k);
          try {
            const [C, D, O] = await Promise.all([
              fetch(`${it}/scouting/jobs?club=${S}&status=rejected`).then((P) => P.json()),
              fetch(`${it}/scouting/jobs?club=${S}`).then((P) => P.json()),
              fetch(`${it}/scouting/jobs?club=${S}&status=accepted`).then((P) => P.json())
            ]), I = (C.items || []).map((P) => ({ ...P, _jobStatus: P.status || "rejected" })), w = (D.items || []).map((P) => ({ ...P, _jobStatus: P.status || "active" })), F = (O.items || []).map((P) => ({ ...P, _jobStatus: "accepted" })), L = [...w, ...I, ...F];
            if (L.length > 0) {
              const [P, M] = await Promise.all([
                fetch(`${it}/facilities?club=${S}`).then((T) => T.json()).catch(() => ({})),
                fetch(`${it}/staff/effects?club=${S}`).then((T) => T.json()).catch(() => ({}))
              ]);
              L.forEach((T) => f.push({ ...T, _club: k })), p[k] = {
                facilities: P || {},
                staff: (M.ok ? M.effects : {}) || {}
              };
            }
          } catch {
          }
        })), await new Promise((k) => setTimeout(k, 80));
      }
      const g = yn, m = (x) => x && (g.filter((v) => x[v] != null && x[v] > 0).length >= 5 || x.stats && g.filter((v) => x.stats[v] != null && x.stats[v] > 0).length >= 5), _ = f.filter((x) => x.player && !m(x.player));
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
        const S = ad;
        for (const C of _) {
          const D = (((n = C.player) == null ? void 0 : n.club) || ((i = C.player) == null ? void 0 : i.Club) || "").toLowerCase(), O = v[D] || [], I = (((o = C.player) == null ? void 0 : o.name) || ((a = C.player) == null ? void 0 : a.Player) || "").toLowerCase(), w = O.find((F) => (F.Player || "").toLowerCase() === I);
          w && (S.forEach((F) => {
            w[F] != null && (C.player[F] = w[F]);
          }), w.Rating && (C.player.rating = w.Rating), w.Value && (C.player.value = w.Value), w.Age && (C.player.age = w.Age));
        }
      }
      const y = JSON.stringify({ data: { jobs: f, clubInfo: p }, ts: Date.now() });
      try {
        localStorage.setItem(e, y);
      } catch {
      }
      Ke(e, y).catch(() => {
      });
      const b = f.filter((x) => {
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
          return C._incompleteStats = yn.filter((D) => C[D] != null && C[D] > 0).length < 5, C;
        }), x.n && console.log(`[SF] enriched ${x.n} incomplete players from accepted scouting jobs`);
      }
      this.youthAllHistoryJobs = f.map((x) => ({ ...x, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthClubInfoMap = p, this.youthHistLoaded = !0, this.youthHistCacheDate = (/* @__PURE__ */ new Date()).toLocaleString(), this.youthHistMsg = "";
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
      const n = 3 + (s >= 5 ? 2 : s >= 4 ? 1 : 0), i = s >= 5 ? 2 : s >= 3 ? 1 : 0, o = s * 5;
      return `${n} active scout slots · +${i} quality boost · +${o}% scouting speed`;
    }
    if (t === "academy") {
      const n = s - 1, i = 0.03 + 0.01 * n, o = 0.12 + 0.02 * n, a = 0.3, r = 0.55, l = r + a + o + i, c = ((o + i) / l * 100).toFixed(1), h = (2 * r / l + 3 * a / l + 4 * o / l + 5 * i / l).toFixed(2);
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
      const e = encodeURIComponent($t), s = "sf_club_v1", n = 30 * 60 * 1e3;
      if (!t)
        try {
          const c = JSON.parse(localStorage.getItem(s) || "null");
          if (c) {
            this.clubFacData = c.facilities, this.clubFacQuotes = c.quotes || {}, this.clubStaff = c.staff || {}, this.clubStaffEffects = c.effects || {}, this.clubLoaded = !0, this.clubLoading = !1, this.clubMsg = "", Date.now() - c.savedAt > n && setTimeout(() => this.loadClub(!0), 100);
            return;
          }
        } catch {
        }
      const i = ["stadium", "training", "academy", "scouting", "medical", "analytics"], [o, a, r, ...l] = await Promise.all([
        fetch(`${it}/facilities?club=${e}`).then((c) => c.json()),
        fetch(`${it}/staff?club=${e}`).then((c) => c.json()).catch(() => ({})),
        fetch(`${it}/staff/effects?club=${e}`).then((c) => c.json()).catch(() => ({})),
        ...i.map(
          (c) => fetch(`${it}/facilities/quote?club=${e}&key=${c}`).then((h) => h.json()).then((h) => ({ key: c, ...h })).catch(() => ({ key: c, ok: !1 }))
        )
      ]);
      this.clubFacData = o, this.clubStaff = a || {}, this.clubStaffEffects = (r.ok !== !1 ? r.effects : {}) || {}, this.clubFacQuotes = Object.fromEntries(l.map((c) => [c.key, c]));
      try {
        localStorage.setItem(s, JSON.stringify({
          savedAt: Date.now(),
          facilities: o,
          quotes: this.clubFacQuotes,
          staff: a || {},
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
        const o = encodeURIComponent($t), a = Date.now();
        let r = null;
        try {
          r = JSON.parse(localStorage.getItem(s) || "null");
        } catch {
        }
        const l = a - ((r == null ? void 0 : r.savedAt) || 0), c = a - ((r == null ? void 0 : r.staticSavedAt) || 0), h = l >= n, u = c >= i;
        if (!h && !u) return;
        const [f, p, d, g] = await Promise.all([
          h ? fetch(`${it}/scouting/jobs?club=${o}`).then((m) => m.json()) : Promise.resolve(null),
          h ? fetch(`${it}/academy?club=${o}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/facilities?club=${o}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/staff/effects?club=${o}`).then((m) => m.json()) : Promise.resolve(null)
        ]);
        if (h && f && (this.youthCap = f.cap || this.youthCap, this.youthScouts = (f.items || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 }))), h && p) {
          const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"];
          this.youthAcademy = (p.items || []).map((_) => {
            const y = m.filter((b) => this.getYouthAttr(_, b) > 0).length;
            return { ..._, _partial: y < 5 };
          });
        }
        u && d && (this.youthFacilities = d || {}), u && g && (this.youthStaff = (g.ok ? g.effects : {}) || {}), this.youthBgLastRefresh = (/* @__PURE__ */ new Date()).toLocaleTimeString();
        try {
          const m = {
            ...r || {},
            ...h ? { savedAt: a, cap: (f == null ? void 0 : f.cap) || {}, scouts: (f == null ? void 0 : f.items) || [], academy: this.youthAcademy } : {},
            ...u ? { staticSavedAt: a, facilities: d || {}, staff: this.youthStaff } : {}
          };
          localStorage.setItem(s, JSON.stringify(m));
        } catch {
        }
      } catch {
      }
    })();
  }
}, yC = {
  async buildMatchArchive() {
    var o, a, r, l, c;
    if (this.matchArchiveBuilding) return;
    this.matchArchiveBuilding = !0, this.matchArchiveProgress = 0, this.matchArchiveMsg = "Starting…", this.matchBuildLog = [];
    const t = (h) => {
      this.matchBuildLog.push(`${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB")} ${h}`);
    }, e = (h) => new Promise((u) => setTimeout(u, h));
    t(`Host: ${location.hostname} | Cache: ${gs}`);
    const s = `${gs}/__write_test__`, n = await fetch(s, { method: "POST", body: "1", signal: AbortSignal.timeout(8e3) }).then((h) => `HTTP ${h.status}`).catch((h) => `FAIL: ${h.name}: ${h.message}`);
    if (t(`Cache write test: ${n}`), fetch(s, { method: "DELETE" }).catch(() => {
    }), !n.startsWith("HTTP 2"))
      throw new Error(`Cache write failed before fetch: ${n}`);
    const i = async (h, u) => {
      let f;
      for (let p = 0; p < 3; p++) {
        p > 0 && await e(1e3 * p);
        try {
          const d = await fetch(h, { method: "POST", body: u, signal: AbortSignal.timeout(15e3) });
          if (d.ok) return !0;
          f = `HTTP ${d.status}: ${await d.text().catch(() => "")}`;
        } catch (d) {
          f = `${d.name}: ${d.message}`;
        }
      }
      return f;
    };
    try {
      if ((o = this.matchArchive) != null && o.length) {
        const M = [...new Set(this.matchArchive.map((T) => T._gw))].filter(Boolean);
        this.matchArchiveMsg = `Loading ${M.length} cached chunks…`, t(`Pre-loading ${M.length} GW chunks from KV`), await Promise.all(M.map((T) => this.loadMatchChunk(T))), t(`Chunks loaded: ${Object.keys(this.matchChunks).length} GWs in memory`);
      }
      const h = /* @__PURE__ */ new Map(), u = [...new Set(this.allPlayers.map((M) => M.Club).filter(Boolean))].sort();
      t(`${u.length} clubs to scan`);
      for (let M = 0; M < u.length; M += 10) {
        const T = u.slice(M, M + 10);
        this.matchArchiveProgress = Math.round(M / u.length * 20), this.matchArchiveMsg = `Pass 1: ${Math.min(M + 10, u.length)}/${u.length} clubs · ${h.size} fixtures`, await Promise.all(T.map(async (E) => {
          try {
            const H = await fetch(`${it}/matches?club=${encodeURIComponent(E)}&limit=200`).then((Z) => Z.json());
            let Y = 0;
            for (const Z of (H == null ? void 0 : H.matches) || [])
              Z.fixtureId && !h.has(Z.fixtureId) && (h.set(Z.fixtureId, Z), Y++);
            Y && t(`${E}: +${Y} (${h.size} total)`);
          } catch (H) {
            t(`ERROR ${E}: ${H.message}`);
          }
        })), await e(50);
      }
      t(`Pass 1 done: ${h.size} unique fixtures`);
      const f = Array.from(h.keys()), p = /* @__PURE__ */ new Map();
      for (const M of Object.keys(this.matchChunks))
        for (const T of this.matchChunks[M] || []) p.set(T.fixtureId, T);
      const d = f.filter((M) => !p.has(M)), g = f.filter((M) => p.has(M)).map((M) => p.get(M));
      t(`Pass 2: ${d.length} new fixtures to fetch, ${g.length} reused from cache`);
      let m = 0;
      for (let M = 0; M < d.length; M += 25) {
        const T = d.slice(M, M + 25);
        this.matchArchiveProgress = 20 + Math.round(M / Math.max(d.length, 1) * 40), this.matchArchiveMsg = `Pass 2: ${Math.min(M + 25, d.length)}/${d.length} new fixtures · ${m} errors`, await Promise.all(T.map(async (E) => {
          try {
            const H = await fetch(`${it}/matches/${E}`).then((Y) => Y.json());
            if (H != null && H.match) {
              const Y = H.match;
              g.push(Y);
            } else
              m++, t(`No data for ${E}: ${JSON.stringify(H).slice(0, 60)}`);
          } catch (H) {
            m++, t(`ERROR fixture ${E}: ${H.message}`);
          }
        })), await e(30);
      }
      g.sort((M, T) => (T.kickoff || "").localeCompare(M.kickoff || "")), t(`Pass 2 done: ${g.length} matches, ${m} errors`);
      const _ = {};
      let y = 0;
      t(`Pass 3: fetching submissions for ${u.length} clubs`);
      for (let M = 0; M < u.length; M += 10) {
        const T = u.slice(M, M + 10);
        this.matchArchiveProgress = 60 + Math.round(M / u.length * 24), this.matchArchiveMsg = `Pass 3: ${Math.min(M + 10, u.length)}/${u.length} clubs · submissions`, await Promise.all(T.map(async (E) => {
          try {
            const H = await fetch(`${it}/submissions?club=${encodeURIComponent(E)}&limit=200`).then((Z) => Z.json()), Y = {};
            for (const Z of (H == null ? void 0 : H.items) || []) {
              const nt = Z.gameweek ?? "upcoming";
              (!Y[nt] || Z.createdAt > Y[nt].createdAt) && (Y[nt] = Z);
            }
            _[E] = Y;
          } catch (H) {
            y++, t(`SUB ERROR ${E}: ${H.message}`);
          }
        })), await e(50);
      }
      t(`Pass 3 done: ${Object.keys(_).length} clubs, ${y} errors`);
      for (const M of g) {
        const T = M.gameweek, E = T != null ? (r = _[(a = M.home) == null ? void 0 : a.club]) == null ? void 0 : r[T] : null, H = T != null ? (c = _[(l = M.away) == null ? void 0 : l.club]) == null ? void 0 : c[T] : null;
        E && (M.home.sub = { formation: E.formation, instructions: E.instructions, roles: E.roles, xi: E.xi, runs: E.runs }), H && (M.away.sub = { formation: H.formation, instructions: H.instructions, roles: H.roles, xi: H.xi, runs: H.runs });
      }
      const b = /* @__PURE__ */ new Map();
      for (const M of g) {
        const T = M.gameweek ?? 0;
        b.has(T) || b.set(T, []), b.get(T).push(M);
      }
      const x = [...b.keys()].sort((M, T) => M - T);
      t(`Gameweeks: ${x.length} (GW${x[0]}–GW${x[x.length - 1]})`);
      const v = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, k = new Map(this.allPlayers.map((M) => [(M.Player || "").toLowerCase().trim(), M])), S = (M) => M.length ? Math.round(M.reduce((T, E) => T + E, 0) / M.length * 10) / 10 : null, C = (M) => {
        var H;
        if (!((H = M == null ? void 0 : M.xi) != null && H.length)) return null;
        const T = { def: [], mid: [], att: [] }, E = [];
        for (const Y of M.xi) {
          const Z = (Y.name || Y.player || "").toLowerCase().trim(), nt = k.get(Z);
          if (!nt) continue;
          const ft = (Y.slot || "").replace(/\d+$/, "") || nt.Position || "CM", lt = nt.Position || ft, pt = Ss(nt, lt);
          pt && (E.push(pt), v[ft] && T[v[ft]].push(pt));
        }
        return { overall: S(E), def: S(T.def), mid: S(T.mid), att: S(T.att) };
      }, D = { sub: 0, narr: 0, derived: 0, none: 0 }, O = (M, T, E, H) => {
        if (M != null && M.formation)
          return D.sub++, M.formation;
        const Y = Ri(this.extractFormation(T, E));
        if (Y)
          return D.narr++, Y;
        const Z = Ri(this.deriveFormation(H));
        return Z ? (D.derived++, Z) : (D.none++, null);
      }, I = g.map((M) => {
        var H, Y, Z, nt, ft, lt, pt, _t, K, q, U, ot, A, R, N, z, $, B, G, j, V, W, J, X, et, tt;
        const T = this.extractTactics(M.reportNarrative, (H = M.home) == null ? void 0 : H.club), E = this.extractTactics(M.reportNarrative, (Y = M.away) == null ? void 0 : Y.club);
        return {
          fixtureId: M.fixtureId,
          kickoff: M.kickoff,
          gameweek: M.gameweek,
          competition: M.competition,
          home: {
            club: (Z = M.home) == null ? void 0 : Z.club,
            formation: O((nt = M.home) == null ? void 0 : nt.sub, M.reportNarrative, (ft = M.home) == null ? void 0 : ft.club, (lt = M.ratings) == null ? void 0 : lt.home),
            mentality: ((K = (_t = (pt = M.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : K.mentality) || (T == null ? void 0 : T.mentality) || null,
            style: ((ot = (U = (q = M.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.style) || (T == null ? void 0 : T.style) || null,
            sqRtg: C((A = M.home) == null ? void 0 : A.sub)
          },
          away: {
            club: (R = M.away) == null ? void 0 : R.club,
            formation: O((N = M.away) == null ? void 0 : N.sub, M.reportNarrative, (z = M.away) == null ? void 0 : z.club, ($ = M.ratings) == null ? void 0 : $.away),
            mentality: ((j = (G = (B = M.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.mentality) || (E == null ? void 0 : E.mentality) || null,
            style: ((J = (W = (V = M.away) == null ? void 0 : V.sub) == null ? void 0 : W.instructions) == null ? void 0 : J.style) || (E == null ? void 0 : E.style) || null,
            sqRtg: C((X = M.away) == null ? void 0 : X.sub)
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
      const w = { builtAt: Date.now(), matchCount: g.length, gwCount: x.length, gameweeks: x, fmSrc: D, matches: I }, F = JSON.stringify(w);
      this.matchArchiveProgress = 84, this.matchArchiveMsg = `Saving index (${(F.length / 1024).toFixed(0)}KB)…`, t(`Saving index: ${(F.length / 1024).toFixed(0)}KB`);
      const L = await i(`${gs}/sf_match_archive_v3?permanent=1`, F);
      if (L !== !0) throw new Error(`Index save failed: ${L}`);
      t("Index saved OK");
      let P = 0;
      for (let M = 0; M < x.length; M++) {
        const T = x[M], E = b.get(T), H = JSON.stringify({ gw: T, matches: E });
        this.matchArchiveProgress = 84 + Math.round((M + 1) / x.length * 16), this.matchArchiveMsg = `Saving GW${T} (${E.length} matches, ${(H.length / 1024).toFixed(0)}KB)…`;
        const Y = await i(`${gs}/sf_match_archive_v3_gw_${T}?permanent=1`, H);
        Y === !0 ? t(`GW${T}: ${E.length} matches saved OK (${(H.length / 1024).toFixed(0)}KB)`) : (P++, t(`ERROR GW${T}: ${Y}`)), await e(30);
      }
      this.matchArchive = I, this.matchArchiveChunkCount = x.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.matchArchiveFmSrc = D, this.matchArchiveProgress = 100, P > 0 ? (this.matchArchiveMsg = `Done (${P} GW save errors) — ${g.length} matches`, t(`Build complete: ${g.length} matches, ${P} GW(s) failed`)) : (this.matchArchiveMsg = `Done — ${g.length} matches across ${x.length} gameweeks`, t(`Build complete: ${g.length} matches, ${x.length} GW chunks`));
    } catch (h) {
      this.matchArchiveMsg = "Error: " + (h.message || h), t(`FATAL: ${h.message || h}`);
    }
    this.matchArchiveBuilding = !1;
  },
  async appendLatestGw() {
    var n, i, o, a, r;
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
        const F = h.slice(w, w + 10);
        this.appendGwProgress = Math.round(w / h.length * 30), this.appendGwMsg = `Scanning ${Math.min(w + 10, h.length)}/${h.length} clubs… ${u.size} new`, await Promise.all(F.map(async (L) => {
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
      const f = Array.from(u.keys()), p = [];
      let d = 0;
      for (let w = 0; w < f.length; w += 25) {
        const F = f.slice(w, w + 25);
        this.appendGwProgress = 30 + Math.round(w / f.length * 30), this.appendGwMsg = `Fetching ${Math.min(w + 25, f.length)}/${f.length} match details…`, await Promise.all(F.map(async (L) => {
          try {
            const P = await fetch(`${it}/matches/${L}`).then((M) => M.json());
            if (P != null && P.match) {
              const M = P.match;
              p.push(M);
            } else
              d++;
          } catch (P) {
            d++, t(`ERROR fixture ${L}: ${P.message}`);
          }
        })), await e(30);
      }
      t(`Fetched ${p.length} full matches, ${d} errors`);
      const g = [...new Set(p.map((w) => w.gameweek).filter((w) => w != null))];
      t(`New GWs: ${g.join(", ")}`), this.appendGwMsg = "Fetching submissions for new GWs…";
      const m = [...new Set(p.flatMap((w) => {
        var F, L;
        return [(F = w.home) == null ? void 0 : F.club, (L = w.away) == null ? void 0 : L.club];
      }).filter(Boolean))], _ = {};
      for (let w = 0; w < m.length; w += 10) {
        const F = m.slice(w, w + 10);
        this.appendGwProgress = 60 + Math.round(w / m.length * 20), this.appendGwMsg = `Submissions: ${Math.min(w + 10, m.length)}/${m.length} clubs…`, await Promise.all(F.map(async (L) => {
          try {
            const P = await fetch(`${it}/submissions?club=${encodeURIComponent(L)}&limit=50`).then((T) => T.json()), M = {};
            for (const T of (P == null ? void 0 : P.items) || []) {
              const E = T.gameweek ?? "upcoming";
              (!M[E] || T.createdAt > M[E].createdAt) && (M[E] = T);
            }
            _[L] = M;
          } catch (P) {
            t(`SUB ERROR ${L}: ${P.message}`);
          }
        })), await e(50);
      }
      for (const w of p) {
        const F = w.gameweek, L = F != null ? (o = _[(i = w.home) == null ? void 0 : i.club]) == null ? void 0 : o[F] : null, P = F != null ? (r = _[(a = w.away) == null ? void 0 : a.club]) == null ? void 0 : r[F] : null;
        L && (w.home.sub = { formation: L.formation, instructions: L.instructions, roles: L.roles, xi: L.xi, runs: L.runs }), P && (w.away.sub = { formation: P.formation, instructions: P.instructions, roles: P.roles, xi: P.xi, runs: P.runs });
      }
      const y = new Map(this.allPlayers.map((w) => [(w.Player || "").toLowerCase().trim(), w])), b = (w) => w.length ? Math.round(w.reduce((F, L) => F + L, 0) / w.length * 10) / 10 : null, x = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, v = (w) => {
        var P;
        if (!((P = w == null ? void 0 : w.xi) != null && P.length)) return null;
        const F = { def: [], mid: [], att: [] }, L = [];
        for (const M of w.xi) {
          const T = (M.name || M.player || "").toLowerCase().trim(), E = y.get(T);
          if (!E) continue;
          const H = (M.slot || "").replace(/\d+$/, "") || E.Position || "CM", Y = Ss(E, E.Position || H);
          Y && (L.push(Y), x[H] && F[x[H]].push(Y));
        }
        return { overall: b(L), def: b(F.def), mid: b(F.mid), att: b(F.att) };
      }, k = p.map((w) => {
        var M, T, E, H, Y, Z, nt, ft, lt, pt, _t, K, q, U, ot, A, R, N, z, $, B, G, j, V, W, J;
        const F = this.extractTactics(w.reportNarrative, (M = w.home) == null ? void 0 : M.club), L = this.extractTactics(w.reportNarrative, (T = w.away) == null ? void 0 : T.club), P = (X, et, tt) => {
          if (X != null && X.formation) return Ri(X.formation);
          const ht = Ri(this.extractFormation(w.reportNarrative, et));
          return ht || Ri(this.deriveFormation(tt)) || null;
        };
        return {
          fixtureId: w.fixtureId,
          kickoff: w.kickoff,
          gameweek: w.gameweek,
          competition: w.competition,
          home: { club: (E = w.home) == null ? void 0 : E.club, formation: P((H = w.home) == null ? void 0 : H.sub, (Y = w.home) == null ? void 0 : Y.club, (Z = w.ratings) == null ? void 0 : Z.home), mentality: ((lt = (ft = (nt = w.home) == null ? void 0 : nt.sub) == null ? void 0 : ft.instructions) == null ? void 0 : lt.mentality) || (F == null ? void 0 : F.mentality) || null, style: ((K = (_t = (pt = w.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : K.style) || (F == null ? void 0 : F.style) || null, sqRtg: v((q = w.home) == null ? void 0 : q.sub) },
          away: { club: (U = w.away) == null ? void 0 : U.club, formation: P((ot = w.away) == null ? void 0 : ot.sub, (A = w.away) == null ? void 0 : A.club, (R = w.ratings) == null ? void 0 : R.away), mentality: (($ = (z = (N = w.away) == null ? void 0 : N.sub) == null ? void 0 : z.instructions) == null ? void 0 : $.mentality) || (L == null ? void 0 : L.mentality) || null, style: ((j = (G = (B = w.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.style) || (L == null ? void 0 : L.style) || null, sqRtg: v((V = w.away) == null ? void 0 : V.sub) },
          score: w.score,
          headline: w.headline,
          stats: w.stats ? { xg: w.stats.xg, shots: w.stats.shots ? { home: ((W = w.stats.shots.home) == null ? void 0 : W.total) ?? null, away: ((J = w.stats.shots.away) == null ? void 0 : J.total) ?? null } : null, possession: w.stats.possession } : null,
          _gw: w.gameweek ?? 0
        };
      });
      this.appendGwProgress = 80;
      const S = /* @__PURE__ */ new Map();
      for (const w of p) {
        const F = w.gameweek ?? 0;
        S.has(F) || S.set(F, []), S.get(F).push(w);
      }
      for (const [w, F] of S) {
        let L = [];
        if (this.matchChunks[w]) L = this.matchChunks[w];
        else
          try {
            const E = await kt(`sf_match_archive_v3_gw_${w}`);
            E && (L = JSON.parse(E).matches || []);
          } catch {
          }
        const P = new Set(L.map((E) => E.fixtureId)), M = [...L, ...F.filter((E) => !P.has(E.fixtureId))];
        this.matchChunks[w] = M;
        const T = JSON.stringify({ gw: w, matches: M });
        this.appendGwMsg = `Saving GW${w} chunk (${M.length} matches)…`, await s(`${gs}/sf_match_archive_v3_gw_${w}?permanent=1`, T), t(`GW${w} chunk saved: ${M.length} matches`);
      }
      this.appendGwProgress = 92, this.appendGwMsg = "Updating archive index…";
      const C = [...this.matchArchive, ...k], D = [...new Set(C.map((w) => w._gw).filter((w) => w > 0))].sort((w, F) => w - F), O = {
        builtAt: Date.now(),
        matchCount: C.length,
        gwCount: D.length,
        gameweeks: D,
        fmSrc: this.matchArchiveFmSrc || {},
        matches: C
      };
      if (await s(`${gs}/sf_match_archive_v3?permanent=1`, JSON.stringify(O)) !== !0) throw new Error("Index save failed");
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
      const s = await kn(e);
      (t = s == null ? void 0 : s.matches) != null && t.length && (this.matchArchive = s.matches, this.matchArchiveChunkCount = s.gwCount || 0, this.matchArchiveCacheDate = new Date(s.builtAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), s.fmSrc && (this.matchArchiveFmSrc = s.fmSrc));
    } catch {
    }
  },
  async loadMatchChunk(t) {
    if (!this.matchChunks[t])
      try {
        const e = await kt(`sf_match_archive_v3_gw_${t}`);
        if (e) {
          const s = (await kn(e)).matches || [];
          this.matchChunks[t] = s;
        }
      } catch {
      }
  },
  async loadAnalysisChunks() {
    var o, a, r, l, c, h, u, f, p, d, g;
    if (this.analysisLoading || this.analysisLoaded || !this.matchArchive) return;
    this.analysisLoading = !0;
    const t = [...new Set(this.matchArchive.map((m) => m._gw))].sort((m, _) => m - _), e = [];
    for (let m = 0; m < t.length; m++) {
      this.analysisProgress = Math.round(m / t.length * 100), this.analysisMsg = `Loading GW${t[m]}… ${m + 1}/${t.length}`;
      const _ = t[m];
      this.matchChunks[_] || await this.loadMatchChunk(_);
      for (const y of this.matchChunks[_] || [])
        (a = (o = y.home) == null ? void 0 : o.sub) != null && a.instructions && ((l = (r = y.away) == null ? void 0 : r.sub) != null && l.instructions) && e.push(y);
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
              b || (b = s(this.extractFormation(_.reportNarrative, (u = _[y]) == null ? void 0 : u.club))), b || (b = s(this.deriveFormation((f = _.ratings) == null ? void 0 : f[y]))), b && (m[y].formation = b, i++);
            }
            !m[y].mentality && ((g = (d = (p = _[y]) == null ? void 0 : p.sub) == null ? void 0 : d.instructions) != null && g.mentality) && (m[y].mentality = _[y].sub.instructions.mentality);
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
      this.subsDb = await kn(t), this.subsDbLoaded = !0, this.subsDbLoading = !1;
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
        const o = await fetch(`${it}/submissions?club=${encodeURIComponent(i)}&limit=200`).then((r) => r.json()), a = {};
        for (const r of (o == null ? void 0 : o.items) || []) {
          const l = r.gameweek ?? "upcoming";
          (!a[l] || r.createdAt > a[l].createdAt) && (a[l] = r);
        }
        e[i] = a;
      } catch {
        e[i] = {};
      }
      n % 8 === 0 && await new Promise((o) => setTimeout(o, 20));
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
    var l, c, h, u, f, p, d, g, m;
    this.matchView = t, this.matchDetailLoading = !0;
    const e = t._gw ?? t.gameweek ?? 0;
    this.matchChunks[e] || await this.loadMatchChunk(e);
    const s = (l = this.matchChunks[e]) == null ? void 0 : l.find((_) => _.fixtureId === t.fixtureId);
    s && (this.matchView = s);
    const n = this.matchView, i = (h = (c = n.home) == null ? void 0 : c.sub) != null && h.formation ? this.fmtFormation(n.home.sub.formation) : null, o = (f = (u = n.away) == null ? void 0 : u.sub) != null && f.formation ? this.fmtFormation(n.away.sub.formation) : null, [a, r] = await Promise.all([
      i ? Promise.resolve(i) : this.getClubFormation((p = n.home) == null ? void 0 : p.club, e),
      o ? Promise.resolve(o) : this.getClubFormation((d = n.away) == null ? void 0 : d.club, e)
    ]);
    n._homeFormation = a || this.extractFormation(n.reportNarrative, (g = n.home) == null ? void 0 : g.club) || n.ratings && this.deriveFormation(n.ratings.home), n._awayFormation = r || this.extractFormation(n.reportNarrative, (m = n.away) == null ? void 0 : m.club) || n.ratings && this.deriveFormation(n.ratings.away), this.matchDetailLoading = !1;
  }
}, bC = {
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
  fmtSubStatus: dC,
  fmtNegoDate: pC,
  computeTrueValues() {
    var o;
    if (!this.allPlayers.length) return;
    const t = Date.now(), e = 60 * 24 * 3600 * 1e3, s = 180 * 24 * 3600 * 1e3, n = {};
    for (const a of this.espionageNegos) {
      const r = (a.playerName || "").toLowerCase();
      r && (n[r] || (n[r] = []), n[r].push(a));
    }
    const i = {};
    for (const a of this.allPlayers) {
      const r = (a.Player || "").toLowerCase(), l = n[r] || [], c = a.Value || 0, h = a._gameRating || 0, u = h >= 85 ? 4 : h >= 82 ? 3 : h >= 79 ? 2.2 : h >= 76 ? 1.7 : h >= 72 ? 1.3 : 1;
      let f = c * u, p = "formula";
      const d = (g, m) => {
        g > f && (f = g, p = m);
      };
      if ((o = a._transferHistory) != null && o.length) {
        const g = a._transferHistory.filter((m) => m.isReal).sort((m, _) => new Date(_.date) - new Date(m.date));
        if (g[0]) {
          const m = t - new Date(g[0].date).getTime();
          d(g[0].amount * (m < e ? 1 : m < s ? 0.9 : 0.8), "transfer");
        }
      }
      a._listingAsk && d(a._listingAsk, "listing");
      for (const g of l) {
        if (!g.amount || g.amount < 5e4) continue;
        const m = t - new Date(g.updatedAt || 0).getTime(), _ = m < e ? 1 : m < s ? 0.85 : 0.7;
        if (g.status === "accepted" ? d(g.amount * _, "deal") : g.status === "rejected" && d(g.amount * 1.15 * _, "rejected+15%"), g.history)
          for (const y of g.history)
            y.amount >= 5e4 && d(y.amount * 0.9 * _, "bid round");
      }
      if (f > 0) {
        const g = Math.round(f / 5e5) * 5e5 || Math.round(f / 1e5) * 1e5 || Math.round(f);
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
    const { status: e, subStatus: s, via: n, lastActionBy: i } = t, o = n === "auction", a = n === "listing";
    if (e === "pending")
      return o ? { icon: "🏛", label: "Auction bid", detail: `closes ${this.auctionCountdown}`, color: "#d2a8ff", bg: "#2d1a3a" } : a ? { icon: "📋", label: "Listing offer", detail: "", color: "#79c0ff", bg: "#1f3a5a" } : { icon: "📨", label: "Direct offer", detail: "", color: "#79c0ff", bg: "#1f3a5a" };
    if (e === "counter" || e === "countered") {
      const r = t.buyer === this.myClub, l = i === "buyer";
      return { icon: "🔄", label: `${(r ? l : !l) ? "We" : r ? "Seller" : "Buyer"} countered`, detail: "", color: "#ffa657", bg: "#4a3a10" };
    }
    if (e === "accepted")
      return { icon: "✓", label: o ? "Won auction" : "Accepted", detail: "", color: "#7ee787", bg: "#1a4a2e" };
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
        await new Promise((o) => setTimeout(o, 3e3));
        const [s, n] = await Promise.all([
          kt("sf_arsenal_fin_v1", !0),
          kt("sf_auctions_v1", !0)
        ]);
        if (s) {
          const o = JSON.parse(s);
          o.budget && (this.clubBudget = o.budget);
        }
        n && this._applyAuctionData(JSON.parse(n));
        const i = await kt("sf_all_budgets_v1", !0);
        if (i) {
          const o = JSON.parse(i);
          this.allBudgets = o.data || o;
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
      const o = i.player.toLowerCase(), a = i.snapshot || {};
      n[o] = {
        ...a,
        // all attributes (Speed, Tackling, etc.) for the modal
        Player: i.player,
        Position: i.position || i.pos || a.Position || a.position || a.pos || null,
        Age: a.Age ?? a.age ?? i.age ?? null,
        _gameRating: i.rating ?? i.Rating ?? a.Rating ?? a.rating ?? null,
        Club: i.club || a.Club || a.club || null
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
    const e = "sf_espionage_v3", s = oC;
    if (!t)
      try {
        let n = await kt(e);
        n || (n = localStorage.getItem(e));
        const i = n ? await kn(n) : null;
        if (i) {
          this.espionageClubs = i.clubs || [];
          let o = i.negos || [];
          try {
            const a = await kt("sf_negos_history_v1");
            if (a) {
              const r = JSON.parse(a), l = new Map(o.map((c) => [c.id, c]));
              r.forEach((c) => l.set(c.id, c)), o = [...l.values()].sort((c, h) => new Date(h.updatedAt || 0) - new Date(c.updatedAt || 0));
            }
          } catch {
          }
          this.espionageNegos = o, this.espionageCacheDate = new Date(i.savedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), kt("sf_negos_last_pull").then((a) => {
            a && (this.negosLastPull = parseInt(a, 10));
          }).catch(() => {
          }), kt("sf_arsenal_fin_v1").then((a) => {
            if (a) {
              const r = JSON.parse(a);
              typeof r.budget == "number" && (this.clubBudget = r.budget), typeof r.wage == "number" && (this.clubWageBudget = r.wage);
            }
          }).catch(() => {
          }), this.loadAuctionData(), this.espionageLoaded = !0, this.espionageLoading = !1, this.loadEspionageSubmissions(), Date.now() - i.savedAt > s && setTimeout(() => this.loadEspionage(!0), 100);
          return;
        }
      } catch {
      }
    try {
      const i = [...new Set(this.allPlayers.map((h) => h.Club).filter(Boolean))].sort(), o = i.length;
      let a = [];
      try {
        const h = await kt("sf_negos_history_v1");
        if (h)
          a = JSON.parse(h);
        else {
          const u = await fetch(`${it}/negotiations`).then((p) => p.json());
          a = (Array.isArray(u) ? u : u.negotiations || u.items || []).map((p) => ({
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
          })).sort((p, d) => new Date(d.updatedAt || 0) - new Date(p.updatedAt || 0)), Ke("sf_negos_history_v1", JSON.stringify(a));
        }
      } catch {
      }
      const r = [], l = 8;
      for (let h = 0; h < i.length; h += l) {
        const u = i.slice(h, h + l), f = await Promise.all(u.map(async (p) => {
          const d = encodeURIComponent(p);
          try {
            const [g, m] = await Promise.all([
              fetch(`${it}/staff?club=${d}`).then((_) => _.json()).catch(() => ({})),
              fetch(`${it}/facilities?club=${d}`).then((_) => _.json()).catch(() => ({}))
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
        r.push(...f), this.espionageProgress = Math.min(99, Math.round((h + l) / o * 100)), await new Promise((p) => setTimeout(p, 0));
      }
      this.espionageClubs = r, this.espionageNegos = a, this.espionageCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), kt("sf_negos_last_pull").then((h) => {
        h && (this.negosLastPull = parseInt(h, 10));
      }).catch(() => {
      }), kt("sf_arsenal_fin_v1").then((h) => {
        if (h) {
          const u = JSON.parse(h);
          this.clubBudget = u.budget, this.clubWageBudget = u.wage;
        }
      }).catch(() => {
      }), this.loadAuctionData();
      const c = JSON.stringify({ savedAt: Date.now(), clubs: r, negos: a });
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
}, _C = {
  // ── Match processing helpers (all from stored data, no API calls) ────────
  // Extract formation string from narrative text, looking near club name
  extractFormation(t, e) {
    if (!e) return null;
    const s = Array.isArray(t) ? t : [t || ""], n = s.filter((r) => typeof r == "string" && r.startsWith("Pre-match")).join(" ") || s.join(" "), i = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = "([345]-\\d(?:-\\d){1,2})";
    let a = n.match(new RegExp(`${i}.{0,150}${o}`));
    return a || (a = n.match(new RegExp(`${o}.{0,150}${i}`)), a) ? a[1] : null;
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
    const n = (s.CB || 0) + (s.FB || 0), i = (s.DM || 0) + (s.CM || 0) + (s.WM || 0), o = s.WF || 0, a = s.AM || 0, r = s.CF || 0, l = [n];
    return i && l.push(i), a && o ? (l.push(a + o), r && l.push(r)) : (a && l.push(a), o + r && l.push(o + r)), l.join("-");
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
    }, o = s >= 3 && i[t] ? i[t] : n[t];
    return (o == null ? void 0 : o[e]) ?? t;
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
    var a;
    if (!((a = t == null ? void 0 : t.xi) != null && a.length)) return [];
    const e = String(t.formation || "").replace(/-/g, ""), s = lC[e];
    if (!s) return [];
    const n = t.xi.map((r, l) => {
      const c = s[l] || { x: 50, y: 50 }, h = r.slot || (_h[e] || [])[l] || "CM", u = this.basePos(r.position || h), f = ld[u] || ld.CM;
      return {
        name: r.name,
        position: r.position || h,
        bp: u,
        slotType: h,
        x: c.x,
        y: c.y,
        fill: f.fill,
        stroke: f.stroke,
        textColor: f.text
      };
    }), i = {}, o = n.map((r) => {
      const l = r.slotType;
      return i[l] = (i[l] || 0) + 1, `${l}${i[l]}`;
    });
    return n.map((r, l) => {
      var d;
      const c = o[l], u = (((d = t.runs) == null ? void 0 : d[c]) || [])[0] || null, p = (parseInt(c.replace(/\D/g, "")) || 1) % 2 === 0;
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
    const e = t.filter((i) => i.minutes > 0 && !i.subbedOnAt), s = t.filter((i) => i.minutes > 0 && i.subbedOnAt).sort((i, o) => (i.subbedOnAt ?? 0) - (o.subbedOnAt ?? 0)), n = (i) => ({ ...i, _posLabel: i.position });
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
            const o = (e = n[i]) == null ? void 0 : e.club;
            if (o && (!t[o] || n.kickoff > t[o].kickoff)) {
              const { starters: a } = this.lineupDisplay(n.ratings[i]);
              t[o] = {
                club: o,
                kickoff: n.kickoff,
                gameweek: n.gameweek,
                manager: this.managerMap[o],
                formation: this.extractFormation(n.reportNarrative, o) || this.deriveFormation(n.ratings[i]),
                starters: a
              };
            }
          }
    this.clubLineups = t, this.clubLineupsLoaded = !0;
  },
  // Format a formation code like "4231" → "4-2-3-1"
  fmtFormation: fC,
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
      const t = localStorage.getItem(pa);
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
      const t = await kt(nd);
      if (!t) return;
      const e = await kn(t);
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
      const o = Object.values(this.submissionsCache[n] || {}).sort((a, r) => (r.submittedAt || 0) - (a.submittedAt || 0))[0];
      o && (e[n] = o);
    }
    this.espionageSubmissions = e, this.allSubmissionsLoaded = !0;
    const s = { builtAt: Date.now(), clubs: this.submissionsCache };
    try {
      localStorage.setItem(pa, JSON.stringify(s));
    } catch {
    }
    mc(s).then((n) => Ke(nd, n)).catch(() => {
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
      const e = localStorage.getItem(pa), s = e ? JSON.parse(e) : { clubs: {} };
      s.clubs[t] = this.submissionsCache[t] || {}, localStorage.setItem(pa, JSON.stringify(s));
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
      const o = i.home.club === t ? "home" : "away", r = ((i.ratings || {})[o] || []).filter((l) => l.subbedOnAt === null && l.minutes > 0);
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
        const i = encodeURIComponent(t), [o, a, r, l, c] = await Promise.all([
          fetch(`${it}/facilities?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/staff/effects?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/academy?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}`).then((p) => p.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}&status=accepted`).then((p) => p.json()).catch(() => ({}))
        ]), h = r.items || [], u = {};
        for (const p of c.items || []) {
          const d = (((s = p.player) == null ? void 0 : s.name) || ((n = p.player) == null ? void 0 : n.Player) || "").toLowerCase();
          d && (u[d] = p.player);
        }
        const f = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision", "Mentality", "Experience"];
        for (const p of h) {
          const d = u[(p.name || p.Player || "").toLowerCase()];
          d && f.forEach((g) => {
            var m;
            d[g] != null && p[g] == null && (p[g] = d[g]), ((m = d.stats) == null ? void 0 : m[g]) != null && p[g] == null && (p[g] = d.stats[g]);
          });
        }
        this.clubInfoCache = { ...this.clubInfoCache, [t]: {
          loaded: !0,
          loading: !1,
          facilities: (o == null ? void 0 : o.levels) || o || {},
          facilityProject: (o == null ? void 0 : o.project) || null,
          staff: (a != null && a.ok ? a.effects : a) || {},
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
    this.mySubmissionLoading = !0, await this._fetchClubSubmissions($t);
    const t = this.submissionsCache[$t] || {}, e = Object.keys(t).map(Number).sort((s, n) => n - s).slice(0, 3);
    this.mySubmissions = e.map((s) => t[s]), this.mySubmissionLoading = !1;
  },
  matchResultFor(t, e) {
    var r, l, c;
    const s = ((r = t.home) == null ? void 0 : r.club) === e, n = ((l = t.score) == null ? void 0 : l.home) ?? 0, i = ((c = t.score) == null ? void 0 : c.away) ?? 0, o = s ? n : i, a = s ? i : n;
    return o > a ? "W" : o < a ? "L" : "D";
  }
}, xC = {
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
      let e = await kt(zn);
      const s = e ? "server" : "localStorage";
      if (e || (e = localStorage.getItem(zn)), e) {
        console.log(`[SF] ${s} read:`, Math.round(performance.now() - t) + "ms,", Math.round(e.length / 1024) + "KB");
        const n = performance.now(), { players: i, meta: o, ts: a } = await kn(e);
        if (console.log("[SF] parseAsync players:", Math.round(performance.now() - n) + "ms,", i == null ? void 0 : i.length, "players"), i != null && i.length) {
          this.leagueTables = o.leagueTables || {}, this.asOfWeek = o.asOfWeek || "?", this.totalClubs = o.totalClubs || 0, this.managedSet = new Set(o.managedClubs || []), kt("sf_vacancies_v1").then((u) => {
            if (u)
              try {
                const { clubs: f } = JSON.parse(u);
                this.vacantClubs = new Set(f || []);
              } catch {
              }
          }).catch(() => {
          });
          const r = {};
          eo.forEach((u) => (this.leagueTables[u] || []).forEach((f) => {
            r[f.Team] = u;
          })), i.forEach((u) => {
            if (u._league = yl.has(u.Club) ? "other" : r[u.Club] || u._league || "world", u._gameRating = Ss(u, u.Position), u._weightedRating = wo(u, u.Position, od, 20), u._incompleteStats = yn.filter((f) => u[f] != null && u[f] > 0).length < 5, u.Position !== "GK") {
              let f = null, p = -1;
              for (const d of fc) {
                if (d === u.Position) continue;
                const g = Ss(u, d);
                g != null && g > p && (f = d, p = g);
              }
              p > 0 && (u._pos2 = f, u._pos2Rating = Math.round(p * 10) / 10);
            }
            if (u._pos2Rating != null && u._pos2Rating > (u._gameRating || 0) ? (u._bestPos = u._pos2, u._bestPosRating = u._pos2Rating) : (u._bestPos = u.Position, u._bestPosRating = u._gameRating), u._g90 === void 0) {
              const f = u.Minutes || 0;
              u._g90 = f >= 30 ? Math.round((u.Goals || 0) / f * 90 * 100) / 100 : null, u._a90 = f >= 30 ? Math.round((u.Assists || 0) / f * 90 * 100) / 100 : null, u._xG90 = f >= 30 && u.xG != null ? Math.round(u.xG / f * 90 * 100) / 100 : null, u._xA90 = f >= 30 && u.xA != null ? Math.round(u.xA / f * 90 * 100) / 100 : null;
            }
            if (u._gc === void 0) {
              const f = u.Minutes || 0;
              u._gc = (u.Goals || 0) + (u.Assists || 0), u._gc90 = f >= 30 ? Math.round(u._gc / f * 90 * 100) / 100 : null, u._gDiff = u.xG != null ? Math.round(((u.Goals || 0) - u.xG) * 100) / 100 : null, u._aDiff = u.xA != null ? Math.round(((u.Assists || 0) - u.xA) * 100) / 100 : null, u._gDiff90 = f >= 30 && u.xG != null ? Math.round(((u.Goals || 0) - u.xG) / f * 90 * 100) / 100 : null, u._aDiff90 = f >= 30 && u.xA != null ? Math.round(((u.Assists || 0) - u.xA) / f * 90 * 100) / 100 : null;
            }
            if (u.DOB) {
              const f = new Date(u.DOB), p = /* @__PURE__ */ new Date(), d = (p - f) / (365.25 * 24 * 3600 * 1e3);
              if (u._u21 = d < 21, u._u20 = d < 20, d >= 20 && d < 21) {
                const g = new Date(f.getFullYear() + 21, f.getMonth(), f.getDate());
                u._weeksTo21 = Math.ceil((g - p) / (7 * 24 * 3600 * 1e3));
              } else
                u._weeksTo21 = null;
            } else
              u._u21 = (u.Age || 99) < 21, u._u20 = (u.Age || 99) < 20;
          });
          const l = performance.now();
          i.forEach((u) => Object.freeze(u)), console.log("[SF] Object.freeze:", Math.round(performance.now() - l) + "ms");
          const c = performance.now();
          this.allPlayers = i, console.log("[SF] Vue allPlayers set:", Math.round(performance.now() - c) + "ms"), this.playersCacheDate = new Date(a).toLocaleDateString(), this.progress = 100, this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache(), Date.now() - a > nC ? (this.playersRefreshing = !0, this.fetchFreshData(!1)) : (fetch(`${it}/tables/from-fixtures`).then((u) => u.json()).then((u) => {
            var p;
            const f = (p = u == null ? void 0 : u.meta) == null ? void 0 : p.asOfWeek;
            f != null && f !== "?" && (this.asOfWeek = f);
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
      let t = await kt(Vn);
      if (t || (t = localStorage.getItem(Vn)), t) {
        const { ts: e } = JSON.parse(t);
        this.tacticsCacheDate = new Date(e).toLocaleDateString();
      }
    } catch {
    }
  },
  clearPlayersCache() {
    cd(zn), cd("sf_squads_raw_v1");
    try {
      localStorage.removeItem(zn);
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
        let i = await kt(da);
        if (i || (i = localStorage.getItem(da)), i) {
          console.log("[SF] stats cache:", Math.round(i.length / 1024) + "KB");
          const o = performance.now(), { statsMap: a, ts: r } = await kn(i);
          if (console.log("[SF] parseAsync stats:", Math.round(performance.now() - o) + "ms"), a) {
            let l = 0;
            const c = this.allPlayers.map((h) => {
              const u = a[(h.Player || "").toLowerCase()];
              if (!u) return h;
              l++;
              const f = { ...h, ...u };
              if (f._gc === void 0) {
                const p = f.Minutes || 0;
                f._gc = (f.Goals || 0) + (f.Assists || 0), f._gc90 = p >= 30 ? Math.round(f._gc / p * 90 * 100) / 100 : null, f._gDiff = f.xG != null ? Math.round(((f.Goals || 0) - f.xG) * 100) / 100 : null, f._aDiff = f.xA != null ? Math.round(((f.Assists || 0) - f.xA) * 100) / 100 : null, f._gDiff90 = p >= 30 && f.xG != null ? Math.round(((f.Goals || 0) - f.xG) / p * 90 * 100) / 100 : null, f._aDiff90 = p >= 30 && f.xA != null ? Math.round(((f.Assists || 0) - f.xA) / p * 90 * 100) / 100 : null;
              }
              return Object.freeze(f);
            });
            if (l > 0) {
              await new Promise((u) => requestAnimationFrame(u)), this.allPlayers = c, this.statsEnriched = !0, Date.now() - r > iC && setTimeout(() => this.enrichStats(!0), 3e3);
              return;
            }
          }
        }
      } catch {
      }
    this.statsEnriching = !0, this.statsProgress = 0;
    const e = {}, s = this.allPlayers, n = 3;
    for (let i = 0; i < s.length; i += n) {
      const o = s.slice(i, i + n);
      await Promise.all(o.map(async (a) => {
        try {
          const r = encodeURIComponent(a.Player || "");
          if (!r) return;
          const l = await fetch(`${it}/player-stats?player=${r}`).then((g) => g.json());
          if (!l.ok) return;
          const c = {}, h = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision", "Mentality", "Experience", "Leadership", "Work rate", "Adaptability", "Form", "Confidence"];
          l.player && h.forEach((g) => {
            l.player[g] != null && (c[g] = l.player[g]);
          });
          const u = l.career || l.seasonStats;
          if (!u && Object.keys(c).length === 0) return;
          const f = u || {}, p = f.minutes || 0, d = {
            ...c,
            Games: f.games || 0,
            Minutes: p,
            Goals: f.goals || 0,
            Assists: f.assists || 0,
            xG: f.xG ?? null,
            xA: f.xA ?? null,
            Yellow: f.yellow || 0,
            Red: f.red || 0,
            Steals: f.steals || 0,
            Mistakes: f.mistakes || 0,
            POTM: f.potm || 0,
            "Pass %": f.passPct ?? null,
            "Tackle %": f.tacklePct ?? null,
            "Average Rating": f.averageRating ?? null,
            _g90: p >= 30 ? Math.round((f.goals || 0) / p * 90 * 100) / 100 : null,
            _a90: p >= 30 ? Math.round((f.assists || 0) / p * 90 * 100) / 100 : null,
            _xG90: p >= 30 && f.xG != null ? Math.round(f.xG / p * 90 * 100) / 100 : null,
            _xA90: p >= 30 && f.xA != null ? Math.round(f.xA / p * 90 * 100) / 100 : null,
            _gc: (f.goals || 0) + (f.assists || 0),
            _gc90: p >= 30 ? Math.round(((f.goals || 0) + (f.assists || 0)) / p * 90 * 100) / 100 : null,
            _gDiff: f.xG != null ? Math.round(((f.goals || 0) - f.xG) * 100) / 100 : null,
            _aDiff: f.xA != null ? Math.round(((f.assists || 0) - f.xA) * 100) / 100 : null,
            _gDiff90: p >= 30 && f.xG != null ? Math.round(((f.goals || 0) - f.xG) / p * 90 * 100) / 100 : null,
            _aDiff90: p >= 30 && f.xA != null ? Math.round(((f.assists || 0) - f.xA) / p * 90 * 100) / 100 : null
          };
          e[(a.Player || "").toLowerCase()] = d;
        } catch {
        }
      })), this.statsProgress = Math.round((i + n) / s.length * 100), await new Promise((a) => setTimeout(a, 50));
    }
    this.allPlayers = this.allPlayers.map((i) => {
      const o = e[(i.Player || "").toLowerCase()];
      return o ? Object.freeze({ ...i, ...o }) : i;
    }), mc({ statsMap: e, ts: Date.now() }).then((i) => {
      Ke(da, i);
      try {
        localStorage.setItem(da, i);
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
        fetch(`${it}/tables/from-fixtures`).then((f) => f.json()),
        this.refreshManagerMap(),
        fetch(`${it}/admin/squads/public/clubs`).then((f) => f.json())
      ]);
      this.leagueTables = n, this.asOfWeek = ((e = n.meta) == null ? void 0 : e.asOfWeek) || "?";
      const o = {};
      eo.forEach((f) => (n[f] || []).forEach((p) => {
        o[p.Team] = f;
      }));
      const a = this.managedSet;
      try {
        const f = await kt("sf_vacancies_v1");
        if (f) {
          const { clubs: p } = JSON.parse(f);
          this.vacantClubs = new Set(p || []);
        } else
          this.vacantClubs = new Set([...i.clubs].filter((p) => !a.has(p) && !yl.has(p)));
      } catch {
        this.vacantClubs = /* @__PURE__ */ new Set();
      }
      const r = i.clubs;
      this.totalClubs = r.length;
      const l = /* @__PURE__ */ new Set(), c = [];
      let h = null;
      try {
        const f = await kt("sf_squads_raw_v1");
        if (f) {
          const { data: p, ts: d } = JSON.parse(f), g = (Date.now() - d) / 36e5;
          g < 24 && (h = p, console.log(`[SF] using pre-fetched squads cache (${g.toFixed(1)}h old)`));
        }
      } catch {
      }
      const u = (f, p) => {
        (p || []).forEach((d) => {
          const g = `${d.Player}|${d.Club || f}`;
          if (l.has(g)) return;
          if (l.add(g), d.Club = d.Club || f, d._league = yl.has(d.Club) ? "other" : o[d.Club] || "world", d._managed = a.has(d.Club), d._gameRating = Ss(d, d.Position), d._weightedRating = wo(d, d.Position, od, 20), d._estValue = cC(d), d._incompleteStats = yn.filter((_) => d[_] != null && d[_] > 0).length < 5, d.Position !== "GK") {
            let _ = null, y = -1;
            for (const b of fc) {
              if (b === d.Position) continue;
              const x = Ss(d, b);
              x != null && x > y && (_ = b, y = x);
            }
            y > 0 && (d._pos2 = _, d._pos2Rating = Math.round(y * 10) / 10);
          }
          d._pos2Rating != null && d._pos2Rating > (d._gameRating || 0) ? (d._bestPos = d._pos2, d._bestPosRating = d._pos2Rating) : (d._bestPos = d.Position, d._bestPosRating = d._gameRating);
          const m = d.Minutes || 0;
          if (d._g90 = m >= 30 ? Math.round((d.Goals || 0) / m * 90 * 100) / 100 : null, d._a90 = m >= 30 ? Math.round((d.Assists || 0) / m * 90 * 100) / 100 : null, d._xG90 = m >= 30 && d.xG != null ? Math.round(d.xG / m * 90 * 100) / 100 : null, d._xA90 = m >= 30 && d.xA != null ? Math.round(d.xA / m * 90 * 100) / 100 : null, d._gc = (d.Goals || 0) + (d.Assists || 0), d._gc90 = m >= 30 ? Math.round(d._gc / m * 90 * 100) / 100 : null, d._gDiff = d.xG != null ? Math.round(((d.Goals || 0) - d.xG) * 100) / 100 : null, d._aDiff = d.xA != null ? Math.round(((d.Assists || 0) - d.xA) * 100) / 100 : null, d._gDiff90 = m >= 30 && d.xG != null ? Math.round(((d.Goals || 0) - d.xG) / m * 90 * 100) / 100 : null, d._aDiff90 = m >= 30 && d.xA != null ? Math.round(((d.Assists || 0) - d.xA) / m * 90 * 100) / 100 : null, d.DOB) {
            const _ = new Date(d.DOB), y = /* @__PURE__ */ new Date(), b = (y - _) / (365.25 * 24 * 3600 * 1e3);
            if (d._u21 = b < 21, d._u20 = b < 20, b >= 20 && b < 21) {
              const x = new Date(_.getFullYear() + 21, _.getMonth(), _.getDate());
              d._weeksTo21 = Math.ceil((x - y) / (7 * 24 * 3600 * 1e3));
            }
          } else
            d._u21 = (d.Age || 99) < 21, d._u20 = (d.Age || 99) < 20;
          c.push(d);
        });
      };
      if (h)
        t && (this.loadMsg = "Loading squads from cache…", this.progress = 50), r.forEach((f) => {
          var p;
          return u(f, ((p = h[f]) == null ? void 0 : p.players) || h[f] || []);
        });
      else
        for (let f = 0; f < r.length; f++) {
          t && (this.loadMsg = `Fetching squads… (${f + 1}/${r.length})`, this.progress = 10 + Math.round(85 * (f + 1) / r.length));
          try {
            const p = await fetch(`${it}/squads?club=${encodeURIComponent(r[f])}`).then((d) => d.json());
            u(r[f], p.players);
          } catch {
            console.warn("Failed:", r[f]);
          }
          await new Promise((p) => setTimeout(p, 20));
        }
      t && (this.loadMsg = "Fetching transfers…", this.progress = 97);
      try {
        const [f, p] = await Promise.all([
          fetch(`${it}/transfers/done`).then((b) => b.json()),
          fetch(`${it}/transfer-list`).then((b) => b.json()).catch(() => ({ listings: [] }))
        ]), d = /* @__PURE__ */ new Set(["negotiation", "transfer", "listing", "auction", "swap"]), g = {}, m = {};
        (f.deals || []).forEach((b) => {
          const x = (b.playerName || "").toLowerCase();
          if (!x || !b.amount) return;
          const v = { amount: b.amount, buyer: b.buyer || b.toClub, seller: b.seller || b.fromClub, via: b.via, date: b.updatedAt || b.ts, isReal: d.has(b.via) };
          g[x] || (g[x] = []), g[x].push(v), v.isReal && (m[x] || (m[x] = []), m[x].push(v));
        }), [g, m].forEach((b) => Object.values(b).forEach((x) => x.sort((v, k) => new Date(k.date) - new Date(v.date)))), this.transferMap = m, this.allDeals = f.deals || [];
        const _ = {};
        (f.deals || []).forEach((b) => {
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
      } catch (f) {
        console.warn("Transfer data unavailable:", f);
      }
      mc({
        players: c,
        meta: { leagueTables: n, asOfWeek: this.asOfWeek, totalClubs: r.length, managedClubs: [...a] },
        ts: Date.now()
      }).then((f) => {
        Ke(zn, f);
        try {
          localStorage.setItem(zn, f), this.cacheWorking = !0;
        } catch (p) {
          console.warn("Cache write failed:", p), this.cacheWorking = !1;
        }
      }).catch((f) => console.warn("stringifyAsync failed:", f)), c.forEach((f) => Object.freeze(f)), this.allPlayers = c, this.playersCacheDate = (/* @__PURE__ */ new Date()).toLocaleDateString(), this.playersRefreshing = !1, t && (this.progress = 100, this.loadMsg = "Done!", this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache()), setTimeout(() => this.enrichStats(), 800), t && (setTimeout(() => {
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
      this.activeChartDef = { title: "True Market Value vs Rating", desc: "Top-right = most expensive and best. Outliers in top-left = overpriced; bottom-right = potential bargains.", listLabel: "Highest Value", listFmt: (i) => Jn(i._estValue), listColor: "#ffa657" }, this.charts[t] = new Chart(e, {
        type: "scatter",
        data: { datasets: [{ data: n, backgroundColor: "#1f6feb80", pointRadius: 4 }] },
        options: {
          plugins: { legend: { display: !1 }, tooltip: { callbacks: { label: (i) => i.raw.label + ": £" + i.raw.x.toFixed(1) + "m | Rtg " + i.raw.y.toFixed(1) } } },
          scales: { x: { title: { display: !0, text: "True Value (£m)" } }, y: { title: { display: !0, text: "Rating" } } }
        }
      });
    } else if (t === "goal-eff") {
      const n = s.filter((o) => o.Games > 0 && o.xG != null).map((o) => ({ x: +(o.xG || 0), y: +(o.Goals || 0), label: o.Player + " (" + o.Club + ")" })), i = Math.max(...n.map((o) => Math.max(o.x, o.y)), 1);
      this.activeChartDef = { title: "Goals Scored vs Expected Goals (xG)", desc: "Above diagonal = overperforming xG. Below = underperforming.", listLabel: "Best Over-performers", listFmt: (o) => "+" + ((o.Goals || 0) - (o.xG || 0) >= 0 ? "+" : "") + ((o.Goals || 0) - (o.xG || 0)).toFixed(2), listColor: "#7ee787" }, this.charts[t] = new Chart(e, { type: "scatter", data: { datasets: [
        { label: "Players", data: n, backgroundColor: "#7ee78780", pointRadius: 4 },
        { label: "Expected line", data: [{ x: 0, y: 0 }, { x: i, y: i }], type: "line", borderColor: "#30363d", borderDash: [4, 4], pointRadius: 0, borderWidth: 1 }
      ] }, options: {
        plugins: { legend: { display: !1 }, tooltip: { callbacks: { label: (o) => o.raw.label ? o.raw.label + ": xG " + o.raw.x.toFixed(2) + " | Gls " + o.raw.y : "" } } },
        scales: { x: { title: { display: !0, text: "xG" } }, y: { title: { display: !0, text: "Goals" } } }
      } });
    } else if (t === "assist-eff") {
      const n = s.filter((o) => o.Games > 0 && o.xA != null).map((o) => ({ x: +(o.xA || 0), y: +(o.Assists || 0), label: o.Player + " (" + o.Club + ")" })), i = Math.max(...n.map((o) => Math.max(o.x, o.y)), 1);
      this.activeChartDef = { title: "Assists vs Expected Assists (xA)", desc: "Above diagonal = overperforming xA. Below = underperforming.", listLabel: "Best Over-performers", listFmt: (o) => "+" + ((o.Assists || 0) - (o.xA || 0) >= 0 ? "+" : "") + ((o.Assists || 0) - (o.xA || 0)).toFixed(2), listColor: "#79c0ff" }, this.charts[t] = new Chart(e, { type: "scatter", data: { datasets: [
        { label: "Players", data: n, backgroundColor: "#79c0ff80", pointRadius: 4 },
        { label: "Expected line", data: [{ x: 0, y: 0 }, { x: i, y: i }], type: "line", borderColor: "#30363d", borderDash: [4, 4], pointRadius: 0, borderWidth: 1 }
      ] }, options: {
        plugins: { legend: { display: !1 }, tooltip: { callbacks: { label: (o) => o.raw.label ? o.raw.label + ": xA " + o.raw.x.toFixed(2) + " | Ast " + o.raw.y : "" } } },
        scales: { x: { title: { display: !0, text: "xA" } }, y: { title: { display: !0, text: "Assists" } } }
      } });
    } else if (t === "age-gems") {
      const n = { north: "#79c0ff", south: "#7ee787", europa: "#d2a8ff", world: "#ffa657", conference: "#ff7b72", hipster: "#39d353", other: "#8b949e" }, i = eo.map((o) => ({
        label: o,
        data: s.filter((a) => a._league === o && a.Age != null && a._weightedRating != null).map((a) => ({ x: +a.Age, y: +a._weightedRating, label: a.Player + " (" + a.Club + ") " + a.Position })),
        backgroundColor: n[o] + "80",
        pointRadius: 4
      }));
      this.activeChartDef = { title: "Age vs Weighted Position Rating — Young Gems", desc: "Top-left = young and highly rated for their position (incl. mental attributes).", listLabel: "Top Young Players (≤26)", listFmt: (o) => {
        var a;
        return o.Age + "y · " + ((a = o._weightedRating) == null ? void 0 : a.toFixed(1));
      }, listColor: "#d2a8ff" }, this.charts[t] = new Chart(e, {
        type: "scatter",
        data: { datasets: i },
        options: {
          plugins: { legend: { labels: { color: "#8b949e", boxWidth: 10 } }, tooltip: { callbacks: { label: (o) => o.raw.label ? o.raw.label + ": Age " + o.raw.x + " | PosRtg " + o.raw.y : "" } } },
          scales: { x: { title: { display: !0, text: "Age" }, min: 16, max: 38 }, y: { title: { display: !0, text: "Position Rating" } } }
        }
      });
    }
  },
  async loadTactics(t = !1) {
    var x, v, k;
    if (!t)
      try {
        let S = await kt(Vn);
        if (S || (S = localStorage.getItem(Vn)), S) {
          const { data: C, ts: D } = JSON.parse(S);
          if (Date.now() - D < sC) {
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
    const i = [...n], o = /\b(\d-\d[-\d]*)\b/, a = {}, r = {}, l = {}, c = {}, h = { W: 0, D: 0, L: 0, n: 0, gf: 0, ga: 0 };
    let u = 0, f = 0;
    const p = (S) => {
      const C = S.toLowerCase();
      return C.includes("tiki") ? "Tiki-taka" : C.includes("counter") ? "Counter" : C.includes("relentless") || C.includes("press") ? "Pressing" : C.includes("direct") ? "Direct" : C.includes("attack") ? "Attacking" : C.includes("defen") ? "Defensive" : C.includes("fluid") ? "Fluid" : C.includes("rigid") ? "Rigid" : C.charAt(0).toUpperCase() + C.slice(1);
    };
    for (let S = 0; S < i.length; S++) {
      this.tacticsProgress = 10 + Math.round(88 * (S + 1) / i.length), this.tacticsMsg = `Analysing match reports… ${S + 1}/${i.length}`;
      try {
        const D = (await fetch(`${it}/matches/${i[S]}`).then((F) => F.json())).match;
        if (!D) continue;
        f++;
        const O = D.events || [], I = (x = D.home) == null ? void 0 : x.club, w = (v = D.away) == null ? void 0 : v.club;
        [{ side: "home", club: I }, { side: "away", club: w }].forEach(({ side: F, club: L }) => {
          var ft, lt, pt, _t;
          if (!L) return;
          const P = O.filter((K) => K.minute === 0 && K.type === "other" && K.team === L);
          let M = null, T = null;
          const E = (D.reportNarrative || []).slice(0, 3).join(" ");
          for (const K of P) {
            const q = K.description || "", U = q.match(/tiki[- ]?taka|counter[- ]?attack|\b(attacking|defensive|balanced|fluid|rigid|direct|pressing|relentless|compact|aggressive)\b/i);
            if (U && (T = p(U[0])), q.toLowerCase().includes(" in ")) {
              const ot = q.match(o);
              if (ot) {
                const A = ot[1].split("-").map(Number);
                if (A.length >= 2 && A.reduce((R, N) => R + N, 0) >= 9) {
                  M = ot[1];
                  break;
                }
              }
            }
          }
          if (!M && E.toLowerCase().includes(L.toLowerCase())) {
            const q = E.match(/lined up[^.]*?(\d-\d[-\d]*)/i) || E.match(/in (?:an? )?[\w ]+?(\d-\d[-\d]*)/i);
            q && q[1].split("-").map(Number).reduce((ot, A) => ot + A, 0) >= 9 && (M = q[1]);
          }
          if (!M) return;
          u++;
          const H = F === "home", Y = H ? ((ft = D.score) == null ? void 0 : ft.home) || 0 : ((lt = D.score) == null ? void 0 : lt.away) || 0, Z = H ? ((pt = D.score) == null ? void 0 : pt.away) || 0 : ((_t = D.score) == null ? void 0 : _t.home) || 0, nt = Y > Z ? "W" : Y < Z ? "L" : "D";
          a[M] || (a[M] = { formation: M, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0, styles: {} }), a[M][nt]++, a[M].gf += Y, a[M].ga += Z, a[M].n++, T && (a[M].styles[T] = (a[M].styles[T] || 0) + 1), T && (r[T] || (r[T] = { style: T, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), r[T][nt]++, r[T].gf += Y, r[T].ga += Z, r[T].n++), L === $t && (l[M] || (l[M] = { W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), l[M][nt]++, l[M].gf += Y, l[M].ga += Z, l[M].n++, h[nt]++, h.gf += Y, h.ga += Z, h.n++, T && (c[T] = (c[T] || 0) + 1));
        });
      } catch {
      }
      await new Promise((C) => setTimeout(C, 60));
    }
    const d = Object.values(a).filter((S) => S.n >= 2).map((S) => {
      var D;
      const C = ((D = Object.entries(S.styles).sort((O, I) => I[1] - O[1])[0]) == null ? void 0 : D[0]) || "";
      return { ...S, topStyle: C, winPct: Math.round(100 * S.W / S.n), ppg: ((S.W * 3 + S.D) / S.n).toFixed(2), avgGF: (S.gf / S.n).toFixed(2), avgGA: (S.ga / S.n).toFixed(2) };
    }).sort((S, C) => C.n - S.n), g = Object.values(r).filter((S) => S.n >= 3).map((S) => ({ ...S, winPct: Math.round(100 * S.W / S.n), ppg: ((S.W * 3 + S.D) / S.n).toFixed(2), avgGF: (S.gf / S.n).toFixed(2), avgGA: (S.ga / S.n).toFixed(2) })).sort((S, C) => C.n - S.n), m = h.n > 0 ? {
      record: h,
      forms: Object.entries(l).sort((S, C) => C[1].n - S[1].n).map(([S, C]) => ({ formation: S, ...C, winPct: Math.round(100 * C.W / C.n) })),
      topStyle: ((k = Object.entries(c).sort((S, C) => C[1] - S[1])[0]) == null ? void 0 : k[0]) || null,
      styleBreakdown: c
    } : null, _ = { totalMatches: f, fixturesAnalysed: i.length, withFormation: u, formations: d, styles: g, myClubData: m };
    this.tacticsData = _;
    const y = Date.now();
    this.tacticsCacheDate = new Date(y).toLocaleDateString();
    const b = JSON.stringify({ data: _, ts: y });
    Ke(Vn, b);
    try {
      localStorage.setItem(Vn, b);
    } catch {
    }
    this.tacticsMsg = "Done!", this.tacticsProgress = 100, this.tacticsLoading = !1, this.tacticsLoaded = !0;
  }
}, vC = {
  getYouthAttr(t, e) {
    return t[e] != null && t[e] > 0 ? t[e] : t.stats && t.stats[e] != null && t.stats[e] > 0 ? t.stats[e] : null;
  },
  scoutPosRating(t, e) {
    const s = mi[e];
    if (!s) return null;
    const n = s.map((i) => this.getYouthAttr(t, i)).filter((i) => i != null);
    return n.length ? Math.round(n.reduce((i, o) => i + o, 0) / n.length * 10) / 10 : null;
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
      const t = localStorage.getItem(`st2:last:${$t}`);
      if (t) {
        const e = JSON.parse(t);
        e.runs = localStorage.getItem(`st2:runs:${$t}`) || "on", this.savedLineup = e;
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
    const { col: n, dir: i } = s, o = i === "asc" ? 1 : -1, a = (r) => n.split(".").reduce((l, c) => l == null ? void 0 : l[c], r);
    return [...t].sort((r, l) => {
      let c = a(r), h = a(l);
      if (c == null) return 1;
      if (h == null) return -1;
      const u = typeof c == "string" ? c.localeCompare(h) : Number(c) - Number(h);
      return o * u;
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
      const e = encodeURIComponent($t), [s, n] = await Promise.all([
        fetch(`${it}/staff/applicants?club=${e}`).then((o) => o.json()),
        fetch(`${it}/staff?club=${e}`).then((o) => o.json()).catch(() => ({}))
      ]);
      this.staffApplicants = s.applicants || [];
      const i = (t = this.staffApplicants[0]) == null ? void 0 : t.introducedWeek;
      if (i > 0)
        this.staffWeek = i;
      else {
        const o = await fetch(`${it}/fixtures/week`).then((a) => a.json()).catch(() => ({}));
        o.currentWeek > 0 && (this.staffWeek = o.currentWeek - 1);
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
    const e = await _l().catch(() => null);
    await fetch(`${it}/staff/applicants/reject`, {
      method: "POST",
      headers: e ? { "Content-Type": "application/json", Authorization: `Bearer ${e}`, "X-Club": $t, "X-Role": "manager" } : { "Content-Type": "application/json" },
      body: JSON.stringify({ club: $t, id: t.id })
    }).catch(() => {
    });
  },
  async toggleAd(t) {
    var i;
    const e = ((i = this.clubStaff) == null ? void 0 : i.openAds) || [], n = e.includes(t) ? e.filter((o) => o !== t) : [...e, t];
    this.staffAdsUpdating = !0;
    try {
      const a = { "Content-Type": "application/json", Authorization: `Bearer ${await _l()}`, "X-Club": $t, "X-Role": "manager" }, l = await (await fetch(`${it}/staff/ads`, {
        method: "POST",
        headers: a,
        body: JSON.stringify({ club: $t, roles: n })
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
        _l(),
        fetch(`${it}/fixtures/week`).then((o) => o.json())
      ]), s = e.currentWeek - 1;
      if (!(s > 0)) throw new Error(`Bad week from /fixtures/week: ${JSON.stringify(e)}`);
      const n = { "Content-Type": "application/json" };
      this.staffGenMsg = `Week ${s} — toggling ads…`, await fetch(`${Da}/_staff/toggle`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ roles: ["CEO", "Assistant", "Physio"] })
      }), await fetch(`${Da}/_staff/toggle`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ roles: ["CEO", "Assistant", "Physio", "Technical Director"] })
      }), this.staffGenMsg = `Week ${s} — generating…`;
      const i = await fetch(`${Da}/_staff/generate`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ week: s })
      });
      if (!i.ok) {
        const o = await i.text();
        throw new Error(`${i.status} — ${o.slice(0, 120)}`);
      }
      this.staffGenMsg = "Loading applicants…", await this.loadApplicants(), this.staffGenMsg = "";
    } catch (t) {
      this.staffGenMsg = "⚠ Error: " + t.message;
    } finally {
      this.staffGenLoading = !1;
    }
  }
}, xl = "sf_chat_history_v1", SC = 30, wC = {
  loadChatHistory() {
    try {
      const t = localStorage.getItem(xl);
      t && (this.chatMessages = JSON.parse(t));
    } catch {
    }
  },
  saveChatHistory() {
    try {
      localStorage.setItem(xl, JSON.stringify(this.chatMessages.slice(-SC)));
    } catch {
    }
  },
  clearChat() {
    this.chatMessages = [], this.chatError = "";
    try {
      localStorage.removeItem(xl);
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
    const t = [`My club: ${$t}. Current game week: ~${this.asOfWeek || "?"}.`];
    this.clubBudget != null && t.push(`Transfer budget: ${Jn(this.clubBudget)}${this.clubWageBudget != null ? `, wage budget: ${Jn(this.clubWageBudget)}/wk` : ""}.`);
    const e = (this.allPlayers || []).filter((n) => n.Club === $t);
    e.length && (t.push(`
My squad (${e.length} players) — Name | Pos | Age | Rating | Value:`), e.slice().sort((n, i) => (i._gameRating || 0) - (n._gameRating || 0)).forEach((n) => {
      t.push(`${n.Player} | ${n.Position} | ${n.Age} | ${n._gameRating || "?"} | ${Jn(n.Value)}${n.injured ? " [INJURED]" : ""}${n.suspended ? " [SUSPENDED]" : ""}`);
    }));
    const s = (this.allPlayers || []).filter((n) => {
      var i;
      return n.Club && n.Club !== $t && !((i = this.vacantClubs) != null && i.has(n.Club)) && (n._gameRating || 0) >= 78;
    }).sort((n, i) => (i._gameRating || 0) - (n._gameRating || 0)).slice(0, 40);
    return s.length && (t.push(`
Top-rated players elsewhere (potential transfer targets) — Name | Club | Pos | Age | Rating | Value:`), s.forEach((n) => {
      t.push(`${n.Player} | ${n.Club} | ${n.Position} | ${n.Age} | ${n._gameRating || "?"} | ${Jn(n.Value)}`);
    })), t.join(`
`);
  },
  async sendChatMessage() {
    const t = (this.chatInput || "").trim();
    if (!(!t || this.chatLoading)) {
      this.chatMessages.push({ role: "user", content: t, ts: Date.now() }), this.chatInput = "", this.chatError = "", this.chatLoading = !0, this.saveChatHistory(), this.$nextTick(() => this.scrollChatToBottom());
      try {
        const e = {
          context: this.buildChatContext(),
          messages: this.chatMessages.filter((i) => i.role === "user" || i.role === "assistant").map((i) => ({ role: i.role, content: i.content }))
        }, s = await fetch(`${Da}/_chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
          signal: AbortSignal.timeout(45e3)
        }), n = await s.json();
        if (!s.ok || n.error) throw new Error(n.error || `Request failed (${s.status})`);
        this.chatMessages.push({ role: "assistant", content: n.reply || "(no response)", ts: Date.now() });
      } catch (e) {
        this.chatError = e.message || "Failed to reach assistant";
      } finally {
        this.chatLoading = !1, this.saveChatHistory(), this.$nextTick(() => this.scrollChatToBottom());
      }
    }
  }
}, CC = {
  matchArchiveFiltered() {
    if (!this.matchArchive) return [];
    let t = this.matchArchive;
    if (this.matchFilterComp && (t = t.filter((s) => {
      var n;
      return ((n = s.competition) == null ? void 0 : n.code) === this.matchFilterComp;
    })), this.matchFilterClub) {
      const s = this.matchFilterClub;
      t = t.filter((n) => {
        var i, o;
        return ((i = n.home) == null ? void 0 : i.club) === s || ((o = n.away) == null ? void 0 : o.club) === s;
      });
    }
    if (this.matchFilterManager) {
      const s = this.matchFilterManager.toLowerCase();
      t = t.filter((n) => {
        var i, o;
        return (this.managerMap[(i = n.home) == null ? void 0 : i.club] || "").toLowerCase().includes(s) || (this.managerMap[(o = n.away) == null ? void 0 : o.club] || "").toLowerCase().includes(s);
      });
    }
    const e = this.matchSort;
    return e === "gw_d" ? [...t].sort((s, n) => (n.gameweek || 0) - (s.gameweek || 0)) : e === "gw_a" ? [...t].sort((s, n) => (s.gameweek || 0) - (n.gameweek || 0)) : e === "date_d" ? [...t].sort((s, n) => (n.kickoff || "").localeCompare(s.kickoff || "")) : e === "date_a" ? [...t].sort((s, n) => (s.kickoff || "").localeCompare(n.kickoff || "")) : e === "home_a" ? [...t].sort((s, n) => {
      var i, o;
      return (((i = s.home) == null ? void 0 : i.club) || "").localeCompare(((o = n.home) == null ? void 0 : o.club) || "");
    }) : e === "away_a" ? [...t].sort((s, n) => {
      var i, o;
      return (((i = s.away) == null ? void 0 : i.club) || "").localeCompare(((o = n.away) == null ? void 0 : o.club) || "");
    }) : e === "comp_a" ? [...t].sort((s, n) => {
      var i, o;
      return (((i = s.competition) == null ? void 0 : i.name) || "").localeCompare(((o = n.competition) == null ? void 0 : o.name) || "");
    }) : t;
  },
  matchArchiveManagers() {
    if (!this.matchArchive) return [];
    const t = /* @__PURE__ */ new Set();
    return this.matchArchive.forEach((e) => {
      var i, o;
      const s = this.managerMap[(i = e.home) == null ? void 0 : i.club], n = this.managerMap[(o = e.away) == null ? void 0 : o.club];
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
    var g, m, _, y, b, x, v, k, S, C, D, O, I, w, F, L, P, M, T, E, H, Y, Z, nt, ft, lt, pt, _t;
    if (!this.matchArchive) return null;
    const t = (K, q, U, ot, A, R, N, z) => {
      if (!q) return;
      K[q] || (K[q] = { n: 0, W: 0, D: 0, L: 0, gf: 0, ga: 0, xgF: 0, xgA: 0, sqDiff: 0 });
      const $ = K[q];
      $.n++, $[U]++, $.gf += ot, $.ga += A, $.xgF += R || 0, $.xgA += N || 0, $.sqDiff += z || 0;
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
      const q = ((g = K.score) == null ? void 0 : g.home) ?? 0, U = ((m = K.score) == null ? void 0 : m.away) ?? 0, ot = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((y = (_ = K.stats) == null ? void 0 : _.xg) == null ? void 0 : y.home) || 0, N = ((x = (b = K.stats) == null ? void 0 : b.xg) == null ? void 0 : x.away) || 0, z = (((k = (v = K.home) == null ? void 0 : v.sqRtg) == null ? void 0 : k.overall) || 0) - (((C = (S = K.away) == null ? void 0 : S.sqRtg) == null ? void 0 : C.overall) || 0), $ = this.fmtFormation((D = K.home) == null ? void 0 : D.formation), B = this.fmtFormation((O = K.away) == null ? void 0 : O.formation), G = (I = K.home) == null ? void 0 : I.mentality, j = (w = K.away) == null ? void 0 : w.mentality;
      t(s, $ && B ? `${$} vs ${B}` : null, ot, q, U, R, N, z), t(s, $ && B ? `${B} vs ${$}` : null, A, U, q, N, R, -z), t(n, G && j ? `${G} vs ${j}` : null, ot, q, U, R, N, z), t(n, G && j ? `${j} vs ${G}` : null, A, U, q, N, R, -z);
    }
    const i = {}, o = {}, a = {}, r = {};
    for (const K of this.analysisMatches) {
      const q = ((F = K.score) == null ? void 0 : F.home) ?? 0, U = ((L = K.score) == null ? void 0 : L.away) ?? 0, ot = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((M = (P = K.stats) == null ? void 0 : P.xg) == null ? void 0 : M.home) || 0, N = ((E = (T = K.stats) == null ? void 0 : T.xg) == null ? void 0 : E.away) || 0, z = (((Y = (H = K.home) == null ? void 0 : H.sqRtg) == null ? void 0 : Y.overall) || 0) - (((nt = (Z = K.away) == null ? void 0 : Z.sqRtg) == null ? void 0 : nt.overall) || 0), $ = ((lt = (ft = K.home) == null ? void 0 : ft.sub) == null ? void 0 : lt.instructions) || {}, B = ((_t = (pt = K.away) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) || {}, G = $.pressing_intensity, j = B.pressing_intensity, V = $.style, W = B.style, J = $.defensive_line, X = B.defensive_line, et = $.transition_speed, tt = B.transition_speed;
      t(i, G && W ? `${G} vs ${W}` : null, ot, q, U, R, N, z), t(i, j && V ? `${j} vs ${V}` : null, A, U, q, N, R, -z), t(o, V && j ? `${V} vs ${j}` : null, ot, q, U, R, N, z), t(o, W && G ? `${W} vs ${G}` : null, A, U, q, N, R, -z), t(a, J && tt ? `${J} vs ${tt}` : null, ot, q, U, R, N, z), t(a, X && et ? `${X} vs ${et}` : null, A, U, q, N, R, -z), t(r, et && X ? `${et} vs ${X}` : null, ot, q, U, R, N, z), t(r, tt && J ? `${tt} vs ${J}` : null, A, U, q, N, R, -z);
    }
    const l = this.matchArchive.length, c = this.matchArchive.filter((K) => {
      var q, U;
      return ((q = K.home) == null ? void 0 : q.formation) && ((U = K.away) == null ? void 0 : U.formation);
    }).length, h = this.matchArchive.filter((K) => {
      var q, U;
      return ((q = K.home) == null ? void 0 : q.mentality) && ((U = K.away) == null ? void 0 : U.mentality);
    }).length, u = this.analysisMatches.length, f = this.analysisMatches.filter((K) => {
      var q, U, ot, A, R, N;
      return ((ot = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.pressing_intensity) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.pressing_intensity);
    }).length, p = this.analysisMatches.filter((K) => {
      var q, U, ot, A, R, N;
      return ((ot = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.defensive_line) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.defensive_line);
    }).length, d = this.analysisMatches.filter((K) => {
      var q, U, ot, A, R, N;
      return ((ot = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.transition_speed) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.transition_speed);
    }).length;
    return {
      formations: e(s),
      mentalities: e(n),
      pressing: e(i),
      styleVpress: e(o),
      defLine: e(a),
      transVline: e(r),
      coverage: { total: l, bothFormations: c, bothMentality: h, withInstr: u, withPress: f, withDefLine: p, withTrans: d }
    };
  },
  subsDbStats() {
    var o, a, r, l, c, h, u, f, p;
    if (!this.subsDb || !this.matchArchive) return null;
    const t = this.subsDb.clubs || {}, e = {};
    for (const d of this.matchArchive) {
      const g = d._gw;
      if (g == null) continue;
      const m = (a = t[(o = d.home) == null ? void 0 : o.club]) == null ? void 0 : a[g], _ = (l = t[(r = d.away) == null ? void 0 : r.club]) == null ? void 0 : l[g];
      e[g] || (e[g] = { gw: g, n: 0, hSub: 0, aSub: 0, bothSub: 0, bothFm: 0, bothMen: 0, press: 0, line: 0, trans: 0, sides: 0 });
      const y = e[g];
      y.n++, m && y.hSub++, _ && y.aSub++, m && _ && y.bothSub++, m != null && m.formation && (_ != null && _.formation) && y.bothFm++, (c = m == null ? void 0 : m.instructions) != null && c.mentality && ((h = _ == null ? void 0 : _.instructions) != null && h.mentality) && y.bothMen++;
      for (const b of [m, _])
        b && (y.sides++, (u = b.instructions) != null && u.pressing_intensity && y.press++, (f = b.instructions) != null && f.defensive_line && y.line++, (p = b.instructions) != null && p.transition_speed && y.trans++);
    }
    const s = Object.values(e).sort((d, g) => g.gw - d.gw), n = this.matchArchive.length, i = s.reduce((d, g) => (d.bothSub += g.bothSub, d.bothFm += g.bothFm, d.bothMen += g.bothMen, d.sides += g.sides, d.press += g.press, d.line += g.line, d.trans += g.trans, d), { bothSub: 0, bothFm: 0, bothMen: 0, sides: 0, press: 0, line: 0, trans: 0 });
    return { rows: s, total: n, totals: i };
  }
}, kC = {
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
    return this.allPlayers.filter((t) => t.Club === $t);
  },
  mySquadDislikes() {
    const t = this.mySquadPlayers, e = [], s = /* @__PURE__ */ new Set();
    for (const n of t)
      for (const i of xh(n, t, this.allDeals)) {
        const o = [n.Player, i.name].sort().join("|");
        if (s.has(o)) continue;
        s.add(o);
        const a = t.find((r) => r.Player === i.name);
        e.push({ a: { name: n.Player, pos: n.Position }, b: { name: i.name, pos: i.pos }, weeks: i.weeks, aObj: n, bObj: a });
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
    const t = ["GK", "FB", "CB", "DM", "CM", "AM", "WF", "CF"], e = {};
    return t.forEach((s) => {
      e[s] = [];
    }), this.mySquadPlayers.forEach((s) => {
      e[s.Position] && e[s.Position].push(s);
    }), t.forEach((s) => e[s].sort((n, i) => (i._gameRating || 0) - (n._gameRating || 0))), t.map((s) => ({ pos: s, players: e[s] })).filter((s) => s.players.length);
  },
  bestXIPlayers() {
    const t = _h[this.mySquadFormation];
    if (!t) return [];
    const e = this.mySquadPlayers, s = /* @__PURE__ */ new Set(), n = (i, o) => {
      const r = (rC[o] || []).map((l) => i[l]).filter((l) => l != null && l > 0);
      return r.length ? r.reduce((l, c) => l + c, 0) / r.length : 0;
    };
    return t.map((i, o) => {
      const a = aC[i] || [i];
      let r = null, l = -1;
      for (const h of e) {
        if (s.has(h.Player) || !a.includes(h.Position)) continue;
        const u = n(h, i);
        u > l && (r = h, l = u);
      }
      r && s.add(r.Player);
      const c = r ? Math.round(n(r, i) * 10) / 10 : null;
      return { slot: i, player: r, idx: o, slotRating: c };
    });
  },
  mySquadSetPieces() {
    const t = this.mySquadPlayers, e = (s, n = 5) => [...t].filter((i) => i[s] != null && i[s] > 0).sort((i, o) => (o[s] || 0) - (i[s] || 0)).slice(0, n);
    return [
      { title: "🎯 Free Kicks", key: "Free kicks", players: e("Free kicks") },
      { title: "⚽ Penalties", key: "Penalties", players: e("Penalties") },
      { title: "🔵 Corners", key: "Corners", players: e("Corners") }
    ];
  },
  mySquadCaptainList() {
    return [...this.mySquadPlayers].filter((t) => t.Leadership != null).sort((t, e) => (e.Leadership || 0) - (t.Leadership || 0)).slice(0, 8);
  }
}, MC = {
  espionageFiltered() {
    let t = [...this.espionageClubs];
    if (this.espionageSearch.trim()) {
      const i = this.espionageSearch.trim().toLowerCase();
      t = t.filter((o) => o.club.toLowerCase().includes(i) || (this.managerMap[o.club] || "").toLowerCase().includes(i));
    }
    this.espShowVacantOnly && (t = t.filter((i) => !this.managedSet.has(i.club)));
    const e = (i, o) => {
      var a, r;
      return ((r = (a = i.current) == null ? void 0 : a[o]) == null ? void 0 : r.rating) || 0;
    }, s = (i, o) => {
      var a;
      return ((a = i.levels) == null ? void 0 : a[o]) || 0;
    }, n = {
      ceo_d: (i, o) => e(o, "CEO") - e(i, "CEO"),
      ceo_a: (i, o) => e(i, "CEO") - e(o, "CEO"),
      td_d: (i, o) => e(o, "Technical Director") - e(i, "Technical Director"),
      td_a: (i, o) => e(i, "Technical Director") - e(o, "Technical Director"),
      asst_d: (i, o) => e(o, "Assistant") - e(i, "Assistant"),
      asst_a: (i, o) => e(i, "Assistant") - e(o, "Assistant"),
      physio_d: (i, o) => e(o, "Physio") - e(i, "Physio"),
      physio_a: (i, o) => e(i, "Physio") - e(o, "Physio"),
      training_d: (i, o) => s(o, "training") - s(i, "training"),
      training_a: (i, o) => s(i, "training") - s(o, "training"),
      scouting_d: (i, o) => s(o, "scouting") - s(i, "scouting"),
      scouting_a: (i, o) => s(i, "scouting") - s(o, "scouting"),
      academy_d: (i, o) => s(o, "academy") - s(i, "academy"),
      academy_a: (i, o) => s(i, "academy") - s(o, "academy"),
      medical_d: (i, o) => s(o, "medical") - s(i, "medical"),
      medical_a: (i, o) => s(i, "medical") - s(o, "medical"),
      analytics_d: (i, o) => s(o, "analytics") - s(i, "analytics"),
      analytics_a: (i, o) => s(i, "analytics") - s(o, "analytics"),
      stadium_d: (i, o) => s(o, "stadium") - s(i, "stadium"),
      stadium_a: (i, o) => s(i, "stadium") - s(o, "stadium"),
      ads_d: (i, o) => {
        var a, r;
        return (((a = o.openAds) == null ? void 0 : a.length) || 0) - (((r = i.openAds) == null ? void 0 : r.length) || 0);
      },
      ads_a: (i, o) => {
        var a, r;
        return (((a = i.openAds) == null ? void 0 : a.length) || 0) - (((r = o.openAds) == null ? void 0 : r.length) || 0);
      },
      club_d: (i, o) => o.club.localeCompare(i.club),
      mgr_d: (i, o) => (this.managerMap[o.club] || "").localeCompare(this.managerMap[i.club] || ""),
      mgr_a: (i, o) => {
        const a = this.managedSet.has(i.club) ? 1 : 0, r = this.managedSet.has(o.club) ? 1 : 0;
        return a !== r ? a - r : (this.managerMap[i.club] || "").localeCompare(this.managerMap[o.club] || "");
      }
    };
    return t.sort(n[this.espionageSort] || ((i, o) => i.club.localeCompare(o.club))), t;
  },
  espionageNegoFiltered() {
    const t = (this.espionageNegoSearch || "").trim().toLowerCase(), e = Date.now() - 14 * 24 * 3600 * 1e3;
    let s = this.espionageNegos.filter((i) => i.via === "auction" || !this.negoShowAll && !t && new Date(i.updatedAt || 0).getTime() < e ? !1 : t ? (i.playerName || "").toLowerCase().includes(t) || (i.buyer || "").toLowerCase().includes(t) || (i.seller || "").toLowerCase().includes(t) : !0);
    const n = this.negoSort;
    return n === "player_a" ? s.sort((i, o) => (i.playerName || "").localeCompare(o.playerName || "")) : n === "player_d" ? s.sort((i, o) => (o.playerName || "").localeCompare(i.playerName || "")) : n === "fee_d" ? s.sort((i, o) => (o.fee || o.amount || 0) - (i.fee || i.amount || 0)) : n === "fee_a" ? s.sort((i, o) => (i.fee || i.amount || 0) - (o.fee || o.amount || 0)) : n === "status_a" ? s.sort((i, o) => (i.status || "").localeCompare(o.status || "")) : n === "date_a" ? s.sort((i, o) => new Date(i.updatedAt || 0) - new Date(o.updatedAt || 0)) : s.sort((i, o) => new Date(o.updatedAt || 0) - new Date(i.updatedAt || 0)), s;
  },
  negoPlayerMap() {
    const t = {};
    for (const e of this.espionageNegos) {
      const s = (e.playerName || "").toLowerCase();
      if (!s || t[s]) continue;
      const n = e.player || e.playerInfo || {}, i = e.playerPosition || e.playerPos || n.position || n.pos || e.position || null, o = e.playerAge ?? e.playerDOB ?? n.age ?? n.dob ?? e.age ?? null, a = e.playerRating ?? e.playerOverall ?? n.rating ?? n.overall ?? e.rating ?? null, r = e.playerClub || n.club || n.clubName || e.seller || null;
      t[s] = { Player: e.playerName, Position: i || null, Age: o, _gameRating: a, Club: r };
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
    var o, a;
    const t = this._nowMs;
    if (this.auctionItems.length) {
      const r = [], l = [];
      for (const c of this.auctionItems) {
        const u = new Date(c.endsAt || 0).getTime() > t, f = ((o = c.highest) == null ? void 0 : o.bidder) || null, p = [...c.bids || []].sort((m, _) => (_.amount || 0) - (m.amount || 0)).map((m) => ({
          id: `${c.id}-${m.bidder}`,
          buyer: m.bidder,
          amount: m.amount,
          updatedAt: m.at,
          via: "auction",
          status: u ? "pending" : m.bidder === f ? "accepted" : "rejected",
          subStatus: u || m.bidder === f ? null : "outbid"
        }));
        let d = ((a = p[0]) == null ? void 0 : a.buyer) || null;
        for (const m of p) {
          const _ = this.clubBudgetFor(m.buyer);
          if (_ == null || _ >= m.amount) {
            d = m.buyer;
            break;
          }
        }
        const g = { playerName: c.player, seller: c.club, bids: p, endsAt: c.endsAt, effectiveWinner: d };
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
    const t = new Date(this._nowMs), e = t.getUTCMonth(), n = e >= 2 && e <= 9 ? 20 : 21, i = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), n, 0, 0)), o = i.getUTCDay();
    return i.setUTCDate(i.getUTCDate() + (3 - o + 7) % 7), i.getTime() <= this._nowMs && i.setUTCDate(i.getUTCDate() + 7), i;
  },
  auctionCountdown() {
    const t = this.nextAuctionClose.getTime() - this._nowMs;
    if (t <= 0) return "closing…";
    const e = Math.floor(t / 36e5), s = Math.floor(t % 36e5 / 6e4);
    return e >= 48 ? `${Math.floor(e / 24)}d ${e % 24}h` : e > 0 ? `${e}h ${s}m` : `${s}m`;
  }
}, AC = {
  activeModalStats() {
    const t = this.selectedPlayerStats;
    return t ? this.selectedPlayerStatsTab === "season" ? t.seasonStats || null : this.selectedPlayerStatsTab === "career" && (t.career || t.seasonStats) || null : null;
  },
  selectedPlayerTraits() {
    return this.selectedPlayer ? gc(this.selectedPlayer) : [];
  },
  selectedPlayerBonds() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const t = this.allPlayers.filter((e) => e.Club === this.selectedPlayer.Club);
    return Om(this.selectedPlayer, t, this.allDeals);
  },
  selectedPlayerDislikes() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const t = this.allPlayers.filter((e) => e.Club === this.selectedPlayer.Club);
    return xh(this.selectedPlayer, t, this.allDeals);
  },
  mySquadChem() {
    const t = this.allPlayers.filter((e) => e.Club === $t);
    return Fm(t, this.allDeals);
  },
  availableTraits() {
    const t = /* @__PURE__ */ new Set();
    return this.allPlayers.forEach((e) => gc(e).forEach((s) => t.add(s.n))), ["", ...Array.from(t).sort()];
  },
  selectedPlayerBondSummary() {
    const t = this.selectedPlayerBonds;
    if (!t.length) return null;
    const e = t.filter((o) => o.label === "Long-term").length, s = t.filter((o) => o.label === "Established").length, n = t.filter((o) => o.label === "Building").length, i = [];
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
}, PC = {
  playersWithDislikesSet() {
    const t = /* @__PURE__ */ new Set(), e = {};
    for (const s of this.allPlayers)
      s.Club && (e[s.Club] = e[s.Club] || []).push(s);
    for (const s of Object.values(e))
      for (const n of s)
        !t.has(n.Player) && xh(n, s, this.allDeals).length > 0 && t.add(n.Player);
    return t;
  },
  filteredPlayers() {
    const t = this.search.toLowerCase();
    return this.allPlayers.filter((e) => {
      var i, o, a;
      if (!this.leagueFilter.has(e._league) || !this.posFilter.has(e.Position)) return !1;
      const s = this.posRatingUseWeighted ? e._weightedRating || e._gameRating || e.Rating || 0 : e._gameRating || e.Rating || 0;
      if (Object.values(this.posRatingFilters).some((r) => r > 60) && !Object.entries(this.posRatingFilters).some(([l, c]) => {
        if (c <= 60) return !1;
        const h = this.posRatingUseWeighted ? wo(e, l, this.mentalCfgAttrs, this.mentalWeightPct) : Ss(e, l);
        return h != null && h >= c;
      }) || this.posRatingMax < 99 && s > this.posRatingMax || this.maxAge < 40 && (e.Age || 99) > this.maxAge || this.ageGroupFilter === "u21" && !e._u21 || this.ageGroupFilter === "u20" && !e._u20 || this.hideOwn && e.Club === $t || this.hideVacant && this.vacantClubs.has(e.Club) || this.managedOnly && !e._managed || this.forSaleOnly && (!e._managed || e.notForSale) || this.transferListedOnly && !e._transferListed || this.injuredOnly && !e.injured && !e.suspended || this.dislikesOnly && !this.playersWithDislikesSet.has(e.Player) || this.hideRetiring && e.retiring || this.traitFilter && !gc(e).map((l) => l.n).includes(this.traitFilter))
        return !1;
      for (const [r, l] of Object.entries(this.attrFilters))
        if (l > 0 && (e[r] || 0) < l) return !1;
      return !(t && !((i = e.Player) != null && i.toLowerCase().includes(t)) && !((o = e.Club) != null && o.toLowerCase().includes(t)) && !((a = e.Nationality) != null && a.toLowerCase().includes(t)));
    });
  },
  sortedPlayers() {
    const t = this.sortCol, e = this.sortDir;
    return [...this.filteredPlayers].sort((s, n) => {
      const i = s[t], o = n[t];
      return i == null ? 1 : o == null ? -1 : (typeof i == "number" ? i - o : String(i).localeCompare(String(o))) * e;
    });
  },
  pagedPlayers() {
    return this.sortedPlayers.slice(this.page * bl, (this.page + 1) * bl);
  },
  totalPages() {
    return Math.ceil(this.filteredPlayers.length / bl);
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
        (o) => (o.playerName || "").toLowerCase() === (t.Player || "").toLowerCase() && (o.status === "pending" || o.status === "counter" || o.status === "countered")
      ), i = e > 0 ? Math.round(Math.min(t._listingAsk * 0.85, e * 0.88) / 5e5) * 5e5 || Math.round(Math.min(t._listingAsk * 0.85, e * 0.88) / 1e5) * 1e5 : null;
      return { p: t, tv: e, ratio: s, activeNegos: n, counterOffer: i };
    }).sort((t, e) => t.ratio - e.ratio);
  },
  mbGemsList() {
    return this.allPlayers.filter((t) => t.Age <= 27 && (t._gameRating || 0) >= 68 && t.Club !== $t).map((t) => {
      const e = this.trueVal(t), s = t.Age <= 22 ? 1.3 : t.Age <= 24 ? 1.15 : 1, n = e > 0 ? t._gameRating * t._gameRating * s / (e / 1e6) : 0, i = this.espionageNegos.filter(
        (o) => (o.playerName || "").toLowerCase() === (t.Player || "").toLowerCase() && (o.status === "pending" || o.status === "counter" || o.status === "countered")
      );
      return { p: t, tv: e, gem: n, activeNegos: i };
    }).filter((t) => t.gem > 0).sort((t, e) => e.gem - t.gem).slice(0, 60);
  },
  mbOverList() {
    return this.allPlayers.filter((e) => (e.Games || 0) >= 6 && (e._g90 != null || e._a90 != null)).map((e) => {
      const s = e._g90 || 0, n = e._a90 || 0, i = s * 3 + n * 2, o = e._gameRating || 70, a = i / Math.max(0.05, (o - 58) / 25), r = o < 79 && i >= 0.35;
      return { p: e, contrib90: i, overIndex: a, isGem: r };
    }).filter((e) => e.contrib90 > 0).sort((e, s) => s.overIndex - e.overIndex).slice(0, 60);
  }
}, vl = 50, TC = {
  // Pre-compute all expensive per-row derived values once, cached by Vue
  youthHistJobsEnriched() {
    return this.youthAllHistoryJobs.map((t) => {
      const e = t.player || {}, s = e.position || e.Position, n = this.scoutPosRating(e, s), i = this.scoutBestPos(e), o = t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) : "—";
      return {
        ...t,
        _posRating: n,
        _bestPos: (i == null ? void 0 : i.pos) || null,
        _bestPosRating: (i == null ? void 0 : i.rating) || null,
        _dateStr: o,
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
      var i, o;
      return (((i = this.scoutBestPos(n.player)) == null ? void 0 : i.rating) || 0) - (((o = this.scoutBestPos(s.player)) == null ? void 0 : o.rating) || 0);
    });
    if (e === "bestpos_a") return [...t].sort((s, n) => {
      var i, o;
      return (((i = this.scoutBestPos(s.player)) == null ? void 0 : i.rating) || 0) - (((o = this.scoutBestPos(n.player)) == null ? void 0 : o.rating) || 0);
    });
    if (e === "men_d") return [...t].sort((s, n) => (this.getYouthAttr(n.player, "Mentality") || 0) - (this.getYouthAttr(s.player, "Mentality") || 0));
    if (e === "men_a") return [...t].sort((s, n) => (this.getYouthAttr(s.player, "Mentality") || 0) - (this.getYouthAttr(n.player, "Mentality") || 0));
    if (e === "wr_d") return [...t].sort((s, n) => (this.getYouthAttr(n.player, "Work rate") || 0) - (this.getYouthAttr(s.player, "Work rate") || 0));
    if (e === "wr_a") return [...t].sort((s, n) => (this.getYouthAttr(s.player, "Work rate") || 0) - (this.getYouthAttr(n.player, "Work rate") || 0));
    if (e === "potential_d") {
      const s = { high: 3, medium: 2, low: 1 };
      return [...t].sort((n, i) => {
        var a, r, l, c;
        const o = (s[(a = i.player) == null ? void 0 : a.potential] || 0) - (s[(r = n.player) == null ? void 0 : r.potential] || 0);
        return o !== 0 ? o : (((l = i.player) == null ? void 0 : l.potentialCap) || 0) - (((c = n.player) == null ? void 0 : c.potentialCap) || 0);
      });
    }
    if (e === "potential_a") {
      const s = { high: 3, medium: 2, low: 1 };
      return [...t].sort((n, i) => {
        var a, r, l, c;
        const o = (s[(a = n.player) == null ? void 0 : a.potential] || 0) - (s[(r = i.player) == null ? void 0 : r.potential] || 0);
        return o !== 0 ? o : (((l = n.player) == null ? void 0 : l.potentialCap) || 0) - (((c = i.player) == null ? void 0 : c.potentialCap) || 0);
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
      var i, o;
      return (((i = n.player) == null ? void 0 : i.name) || "").toLowerCase().includes(e) || (((o = n.player) == null ? void 0 : o.club) || "").toLowerCase().includes(e) || (n._club || "").toLowerCase().includes(e);
    })), this.youthHistPos && (t = t.filter((n) => {
      var i, o;
      return (((i = n.player) == null ? void 0 : i.position) || ((o = n.player) == null ? void 0 : o.Position)) === this.youthHistPos;
    })), this.youthHistClubFilter && (t = t.filter((n) => n._club === this.youthHistClubFilter)), this.youthHistStatusFilter && (t = t.filter((n) => (n._jobStatus || n.status) === this.youthHistStatusFilter));
    const s = this.youthHistSort;
    if (s === "date") return [...t].sort((n, i) => new Date(i.createdAt) - new Date(n.createdAt));
    if (s === "date_a") return [...t].sort((n, i) => new Date(n.createdAt) - new Date(i.createdAt));
    if (s === "rating_d") return [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.rating) || 0) - (((a = n.player) == null ? void 0 : a.rating) || 0);
    });
    if (s === "rating_a") return [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.rating) || 0) - (((a = i.player) == null ? void 0 : a.rating) || 0);
    });
    if (s === "age_a") return [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.age) || 0) - (((a = i.player) == null ? void 0 : a.age) || 0);
    });
    if (s === "age_d") return [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.age) || 0) - (((a = n.player) == null ? void 0 : a.age) || 0);
    });
    if (s === "value_d") return [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.value) || 0) - (((a = n.player) == null ? void 0 : a.value) || 0);
    });
    if (s === "value_a") return [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.value) || 0) - (((a = i.player) == null ? void 0 : a.value) || 0);
    });
    if (s === "name_a") return [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.name) || "").localeCompare(((a = i.player) == null ? void 0 : a.name) || "");
    });
    if (s === "name_d") return [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.name) || "").localeCompare(((a = n.player) == null ? void 0 : a.name) || "");
    });
    if (s === "pos_a") return [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.position) || "").localeCompare(((a = i.player) == null ? void 0 : a.position) || "");
    });
    if (s === "pos_d") return [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.position) || "").localeCompare(((a = n.player) == null ? void 0 : a.position) || "");
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
      return [...t].sort((i, o) => {
        var r, l, c, h;
        const a = (n[(r = o.player) == null ? void 0 : r.potential] || 0) - (n[(l = i.player) == null ? void 0 : l.potential] || 0);
        return a !== 0 ? a : (((c = o.player) == null ? void 0 : c.potentialCap) || 0) - (((h = i.player) == null ? void 0 : h.potentialCap) || 0);
      });
    }
    if (s === "potential_a") {
      const n = { high: 3, medium: 2, low: 1 };
      return [...t].sort((i, o) => {
        var r, l, c, h;
        const a = (n[(r = i.player) == null ? void 0 : r.potential] || 0) - (n[(l = o.player) == null ? void 0 : l.potential] || 0);
        return a !== 0 ? a : (((c = i.player) == null ? void 0 : c.potentialCap) || 0) - (((h = o.player) == null ? void 0 : h.potentialCap) || 0);
      });
    }
    return t;
  },
  youthHistPaged() {
    const t = this.youthHistPage * vl;
    return this.youthHistFiltered.slice(t, t + vl);
  },
  youthHistTotalPages() {
    return Math.max(1, Math.ceil(this.youthHistFiltered.length / vl));
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
}, DC = {
  selectedClubPlayers() {
    if (!this.selectedClubName) return [];
    const t = this.clubSquadSort || "pos";
    return this.allPlayers.filter((e) => e.Club === this.selectedClubName).sort((e, s) => {
      if (t === "pos") {
        const n = (rd[e.Position] ?? 9) - (rd[s.Position] ?? 9);
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
qa({
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
      myClub: $t,
      leagueFilter: new Set(eo),
      posFilter: new Set(fa),
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
      posRatingFilters: { GK: 60, FB: 60, CB: 60, DM: 60, CM: 60, AM: 60, WF: 60, CF: 60 },
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
      formationKeys: Object.keys(_h),
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
      allLeagues: eo,
      allPositions: fa,
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
      var i, o;
      const t = ["CEO", "Technical Director", "Assistant", "Physio"], e = {};
      for (const a of this.staffApplicants || [])
        e[a.role] || (e[a.role] = []), e[a.role].push(a);
      const s = ((i = this.clubStaff) == null ? void 0 : i.openAds) || [], n = ((o = this.clubStaff) == null ? void 0 : o.current) || {};
      return t.map((a) => {
        var r;
        return {
          role: a,
          applicants: (e[a] || []).sort((l, c) => (c.rating || 0) - (l.rating || 0)),
          isLive: s.includes(a),
          currentRating: ((r = n[a]) == null ? void 0 : r.rating) ?? null
        };
      });
    },
    ...CC,
    ...kC,
    ...MC,
    ...AC,
    ...PC,
    ...TC,
    ...DC
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
    ...mC,
    ...yC,
    ...bC,
    ..._C,
    ...xC,
    ...vC,
    ...wC,
    fmtVal: Jn,
    fmtWage: hC,
    fmtDiff: uC,
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
        const n = wo(s, s.Position, t, e);
        return n === s._weightedRating ? s : Object.freeze({ ...s, _weightedRating: n });
      });
    },
    posAttrNames(t) {
      return id[t] || "";
    },
    allPosRatings(t) {
      return fc.map((e) => ({
        pos: e,
        attrs: id[e] || "",
        game: Ss(t, e),
        weighted: wo(t, e, this.mentalCfgAttrs, this.mentalWeightPct),
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
      if (this.posFilter.size === fa.length)
        this.posFilter = /* @__PURE__ */ new Set([t]);
      else if (this.posFilter.size === 1 && this.posFilter.has(t))
        this.posFilter = new Set(fa);
      else {
        const s = new Set(this.posFilter);
        s.has(t) ? s.delete(t) : s.add(t), this.posFilter = s;
      }
    },
    clubChemScore(t) {
      const e = this.allPlayers.filter((s) => s.Club === t);
      return Fm(e, this.allDeals);
    },
    chemColor(t) {
      return t == null ? "#6e7681" : t >= 70 ? "#3fb950" : t >= 40 ? "#d29922" : "#f85149";
    },
    playerBondCount(t) {
      if (!(t != null && t.Player) || !(t != null && t.Club)) return null;
      const e = this.allPlayers.filter((s) => s.Club === t.Club);
      return Om(t, e, this.allDeals).length;
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
    cr.defaults.font.family = "'Segoe UI',system-ui,sans-serif", cr.defaults.color = "#8b949e";
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
