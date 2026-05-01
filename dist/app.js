var Rm = Object.defineProperty;
var Lm = (t, e, s) => e in t ? Rm(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var Q = (t, e, s) => Lm(t, typeof e != "symbol" ? e + "" : e, s);
/**
* vue v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let mh, te, Dt, $i, ji, Ao, Jn, Po, yl, yn, Bn, Bs, bl;
function Ee(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
let yt = {}, Xn = [], ie = () => {
}, Un = () => !1, On = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && (t.charCodeAt(2) > 122 || 97 > t.charCodeAt(2)), cr = (t) => t.startsWith("onUpdate:"), gt = Object.assign, fc = (t, e) => {
  let s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Om = Object.prototype.hasOwnProperty, wt = (t, e) => Om.call(t, e), nt = Array.isArray, ot = (t) => typeof t == "function", ct = (t) => typeof t == "string", ge = (t) => typeof t == "symbol", St = (t) => t !== null && typeof t == "object", dc = (t) => (St(t) || ot(t)) && ot(t.then) && ot(t.catch), jt = Object.prototype.toString, hr = (t) => ct(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, vs = Ee(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Fm = Ee("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), ur = (t) => {
  let e = /* @__PURE__ */ Object.create(null);
  return (s) => e[s] || (e[s] = t(s));
}, Em = /-\w/g, Tt = ur((t) => t.replace(Em, (e) => e.slice(1).toUpperCase())), Im = /\B([A-Z])/g, Me = ur((t) => t.replace(Im, "-$1").toLowerCase()), Fn = ur((t) => t.charAt(0).toUpperCase() + t.slice(1)), Zn = ur((t) => t ? `on${Fn(t)}` : ""), ne = (t, e) => !Object.is(t, e), Qn = (t, ...e) => {
  for (let s = 0; s < t.length; s++) t[s](...e);
}, ad = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, { configurable: !0, enumerable: !1, writable: n, value: s });
}, fr = (t) => {
  let e = parseFloat(t);
  return isNaN(e) ? t : e;
}, ti = (t) => {
  let e = ct(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
}, dr = () => mh || (mh = "u" > typeof globalThis ? globalThis : "u" > typeof self ? self : "u" > typeof window ? window : "u" > typeof global ? global : {}), Nm = Ee("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function va(t) {
  if (nt(t)) {
    let e = {};
    for (let s = 0; s < t.length; s++) {
      let n = t[s], i = ct(n) ? od(n) : va(n);
      if (i) for (let a in i) e[a] = i[a];
    }
    return e;
  }
  if (ct(t) || St(t)) return t;
}
let Bm = /;(?![^(]*\))/g, $m = /:([^]+)/, jm = /\/\*[^]*?\*\//g;
function od(t) {
  let e = {};
  return t.replace(jm, "").split(Bm).forEach((s) => {
    if (s) {
      let n = s.split($m);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Sa(t) {
  let e = "";
  if (ct(t)) e = t;
  else if (nt(t)) for (let s = 0; s < t.length; s++) {
    let n = Sa(t[s]);
    n && (e += n + " ");
  }
  else if (St(t)) for (let s in t) t[s] && (e += s + " ");
  return e.trim();
}
function Wm(t) {
  if (!t) return null;
  let { class: e, style: s } = t;
  return e && !ct(e) && (t.class = Sa(e)), s && (t.style = va(s)), t;
}
let Vm = Ee("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), Hm = Ee("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), zm = Ee("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"), Gm = Ee("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), Um = Ee("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
function ks(t, e) {
  let s, n;
  if (t === e) return !0;
  let i = (s = t, jt.call(s) === "[object Date]"), a = (n = e, jt.call(n) === "[object Date]");
  if (i || a) return !!i && !!a && t.getTime() === e.getTime();
  if (i = ge(t), a = ge(e), i || a) return t === e;
  if (i = nt(t), a = nt(e), i || a) return !!i && !!a && function(o, r) {
    if (o.length !== r.length) return !1;
    let l = !0;
    for (let c = 0; l && c < o.length; c++) l = ks(o[c], r[c]);
    return l;
  }(t, e);
  if (i = St(t), a = St(e), i || a) {
    if (!i || !a || Object.keys(t).length !== Object.keys(e).length) return !1;
    for (let o in t) {
      let r = t.hasOwnProperty(o), l = e.hasOwnProperty(o);
      if (r && !l || !r && l || !ks(t[o], e[o])) return !1;
    }
  }
  return String(t) === String(e);
}
function pr(t, e) {
  return t.findIndex((s) => ks(s, e));
}
let rd = (t) => !!(t && t.__v_isRef === !0), ld = (t) => ct(t) ? t : t == null ? "" : nt(t) || St(t) && (t.toString === jt || !ot(t.toString)) ? rd(t) ? ld(t.value) : JSON.stringify(t, cd, 2) : String(t), cd = (t, e) => {
  let s;
  if (rd(e)) return cd(t, e.value);
  if (s = e, jt.call(s) === "[object Map]") return { [`Map(${e.size})`]: [...e.entries()].reduce((n, [i, a], o) => (n[Nr(i, o) + " =>"] = a, n), {}) };
  {
    let n;
    if (n = e, jt.call(n) === "[object Set]") return { [`Set(${e.size})`]: [...e.values()].map((i) => Nr(i)) };
    {
      if (ge(e)) return Nr(e);
      let i;
      if (St(e) && !nt(e) && (i = e, jt.call(i) !== "[object Object]")) return String(e);
    }
  }
  return e;
}, Nr = (t, e = "") => {
  var s;
  return ge(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t;
};
class pc {
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
function qm(t) {
  return new pc(t);
}
function hd() {
  return te;
}
function Km(t, e = !1) {
  te && te.cleanups.push(t);
}
let Br = /* @__PURE__ */ new WeakSet();
class ta {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, te && te.active && te.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    64 & this.flags && (this.flags &= -65, Br.has(this) && (Br.delete(this), this.trigger()));
  }
  notify() {
    (!(2 & this.flags) || 32 & this.flags) && (8 & this.flags || ud(this));
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, yh(this), fd(this);
    let e = Dt, s = Ge;
    Dt = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      dd(this), Dt = e, Ge = s, this.flags &= -3;
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let e = this.deps; e; e = e.nextDep) mc(e);
      this.deps = this.depsTail = void 0, yh(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    64 & this.flags ? Br.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    _l(this) && this.run();
  }
  get dirty() {
    return _l(this);
  }
}
let gr = 0;
function ud(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = ji, ji = t;
    return;
  }
  t.next = $i, $i = t;
}
function gc() {
  let t;
  if (!(--gr > 0)) {
    if (ji) {
      let e = ji;
      for (ji = void 0; e; ) {
        let s = e.next;
        e.next = void 0, e.flags &= -9, e = s;
      }
    }
    for (; $i; ) {
      let e = $i;
      for ($i = void 0; e; ) {
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
function fd(t) {
  for (let e = t.deps; e; e = e.nextDep) e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function dd(t) {
  let e, s = t.depsTail, n = s;
  for (; n; ) {
    let i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), mc(n), function(a) {
      let { prevDep: o, nextDep: r } = a;
      o && (o.nextDep = r, a.prevDep = void 0), r && (r.prevDep = o, a.nextDep = void 0);
    }(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  t.deps = e, t.depsTail = s;
}
function _l(t) {
  for (let e = t.deps; e; e = e.nextDep) if (e.dep.version !== e.version || e.dep.computed && (pd(e.dep.computed) || e.dep.version !== e.version)) return !0;
  return !!t._dirty;
}
function pd(t) {
  if (4 & t.flags && !(16 & t.flags) || (t.flags &= -17, t.globalVersion === ea) || (t.globalVersion = ea, !t.isSSR && 128 & t.flags && (!t.deps && !t._dirty || !_l(t)))) return;
  t.flags |= 2;
  let e = t.dep, s = Dt, n = Ge;
  Dt = t, Ge = !0;
  try {
    fd(t);
    let i = t.fn(t._value);
    (e.version === 0 || ne(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Dt = s, Ge = n, dd(t), t.flags &= -3;
  }
}
function mc(t, e = !1) {
  let { dep: s, prevSub: n, nextSub: i } = t;
  if (n && (n.nextSub = i, t.prevSub = void 0), i && (i.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let a = s.computed.deps; a; a = a.nextDep) mc(a, !0);
  }
  e || --s.sc || !s.map || s.map.delete(s.key);
}
function Ym(t, e) {
  t.effect instanceof ta && (t = t.effect.fn);
  let s = new ta(t);
  e && gt(s, e);
  try {
    s.run();
  } catch (i) {
    throw s.stop(), i;
  }
  let n = s.run.bind(s);
  return n.effect = s, n;
}
function Jm(t) {
  t.effect.stop();
}
let Ge = !0, gd = [];
function Ms() {
  gd.push(Ge), Ge = !1;
}
function As() {
  let t = gd.pop();
  Ge = t === void 0 || t;
}
function yh(t) {
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
let ea = 0;
class Xm {
  constructor(e, s) {
    this.sub = e, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class mr {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Dt || !Ge || Dt === this.computed) return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Dt) s = this.activeLink = new Xm(Dt, this), Dt.deps ? (s.prevDep = Dt.depsTail, Dt.depsTail.nextDep = s, Dt.depsTail = s) : Dt.deps = Dt.depsTail = s, function n(i) {
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
    this.version++, ea++, this.notify(e);
  }
  notify(e) {
    gr++;
    try {
      for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
    } finally {
      gc();
    }
  }
}
let To = /* @__PURE__ */ new WeakMap(), bn = Symbol(""), xl = Symbol(""), sa = Symbol("");
function ue(t, e, s) {
  if (Ge && Dt) {
    let n = To.get(t);
    n || To.set(t, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new mr()), i.map = n, i.key = s), i.track();
  }
}
function gs(t, e, s, n, i, a) {
  let o = To.get(t);
  if (!o) return void ea++;
  let r = (l) => {
    l && l.trigger();
  };
  if (gr++, e === "clear") o.forEach(r);
  else {
    let l = nt(t), c = l && hr(s);
    if (l && s === "length") {
      let h = Number(n);
      o.forEach((u, f) => {
        (f === "length" || f === sa || !ge(f) && f >= h) && r(u);
      });
    } else switch ((s !== void 0 || o.has(void 0)) && r(o.get(s)), c && r(o.get(sa)), e) {
      case "add":
        if (l) c && r(o.get("length"));
        else {
          let u;
          r(o.get(bn)), u = t, jt.call(u) === "[object Map]" && r(o.get(xl));
        }
        break;
      case "delete":
        if (!l) {
          let u;
          r(o.get(bn)), u = t, jt.call(u) === "[object Map]" && r(o.get(xl));
        }
        break;
      case "set":
        let h;
        h = t, jt.call(h) === "[object Map]" && r(o.get(bn));
    }
  }
  gc();
}
function $n(t) {
  let e = xt(t);
  return e === t ? e : (ue(e, "iterate", sa), Te(t) ? e : e.map(Ue));
}
function yr(t) {
  return ue(t = xt(t), "iterate", sa), t;
}
function ss(t, e) {
  return is(t) ? Ss(t) ? ei(Ue(e)) : ei(e) : Ue(e);
}
let Zm = { __proto__: null, [Symbol.iterator]() {
  return $r(this, Symbol.iterator, (t) => ss(this, t));
}, concat(...t) {
  return $n(this).concat(...t.map((e) => nt(e) ? $n(e) : e));
}, entries() {
  return $r(this, "entries", (t) => (t[1] = ss(this, t[1]), t));
}, every(t, e) {
  return os(this, "every", t, e, void 0, arguments);
}, filter(t, e) {
  return os(this, "filter", t, e, (s) => s.map((n) => ss(this, n)), arguments);
}, find(t, e) {
  return os(this, "find", t, e, (s) => ss(this, s), arguments);
}, findIndex(t, e) {
  return os(this, "findIndex", t, e, void 0, arguments);
}, findLast(t, e) {
  return os(this, "findLast", t, e, (s) => ss(this, s), arguments);
}, findLastIndex(t, e) {
  return os(this, "findLastIndex", t, e, void 0, arguments);
}, forEach(t, e) {
  return os(this, "forEach", t, e, void 0, arguments);
}, includes(...t) {
  return jr(this, "includes", t);
}, indexOf(...t) {
  return jr(this, "indexOf", t);
}, join(t) {
  return $n(this).join(t);
}, lastIndexOf(...t) {
  return jr(this, "lastIndexOf", t);
}, map(t, e) {
  return os(this, "map", t, e, void 0, arguments);
}, pop() {
  return bi(this, "pop");
}, push(...t) {
  return bi(this, "push", t);
}, reduce(t, ...e) {
  return bh(this, "reduce", t, e);
}, reduceRight(t, ...e) {
  return bh(this, "reduceRight", t, e);
}, shift() {
  return bi(this, "shift");
}, some(t, e) {
  return os(this, "some", t, e, void 0, arguments);
}, splice(...t) {
  return bi(this, "splice", t);
}, toReversed() {
  return $n(this).toReversed();
}, toSorted(t) {
  return $n(this).toSorted(t);
}, toSpliced(...t) {
  return $n(this).toSpliced(...t);
}, unshift(...t) {
  return bi(this, "unshift", t);
}, values() {
  return $r(this, "values", (t) => ss(this, t));
} };
function $r(t, e, s) {
  let n = yr(t), i = n[e]();
  return n === t || Te(t) || (i._next = i.next, i.next = () => {
    let a = i._next();
    return a.done || (a.value = s(a.value)), a;
  }), i;
}
let Qm = Array.prototype;
function os(t, e, s, n, i, a) {
  let o = yr(t), r = o !== t && !Te(t), l = o[e];
  if (l !== Qm[e]) {
    let u = l.apply(t, a);
    return r ? Ue(u) : u;
  }
  let c = s;
  o !== t && (r ? c = function(u, f) {
    return s.call(this, ss(t, u), f, t);
  } : s.length > 2 && (c = function(u, f) {
    return s.call(this, u, f, t);
  }));
  let h = l.call(o, c, n);
  return r && i ? i(h) : h;
}
function bh(t, e, s, n) {
  let i = yr(t), a = i !== t && !Te(t), o = s, r = !1;
  i !== t && (a ? (r = n.length === 0, o = function(c, h, u) {
    return r && (r = !1, c = ss(t, c)), s.call(this, c, ss(t, h), u, t);
  }) : s.length > 3 && (o = function(c, h, u) {
    return s.call(this, c, h, u, t);
  }));
  let l = i[e](o, ...n);
  return r ? ss(t, l) : l;
}
function jr(t, e, s) {
  let n = xt(t);
  ue(n, "iterate", sa);
  let i = n[e](...s);
  return (i === -1 || i === !1) && wa(s[0]) ? (s[0] = xt(s[0]), n[e](...s)) : i;
}
function bi(t, e, s = []) {
  Ms(), gr++;
  let n = xt(t)[e].apply(t, s);
  return gc(), As(), n;
}
let ty = Ee("__proto__,__v_isRef,__isVue"), md = new Set(Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ge));
function ey(t) {
  ge(t) || (t = String(t));
  let e = xt(this);
  return ue(e, "has", t), e.hasOwnProperty(t);
}
class yd {
  constructor(e = !1, s = !1) {
    this._isReadonly = e, this._isShallow = s;
  }
  get(e, s, n) {
    if (s === "__v_skip") return e.__v_skip;
    let i = this._isReadonly, a = this._isShallow;
    if (s === "__v_isReactive") return !i;
    if (s === "__v_isReadonly") return i;
    if (s === "__v_isShallow") return a;
    if (s === "__v_raw") return n === (i ? a ? wd : Sd : a ? vd : xd).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    let o = nt(e);
    if (!i) {
      let l;
      if (o && (l = Zm[s])) return l;
      if (s === "hasOwnProperty") return ey;
    }
    let r = Reflect.get(e, s, Yt(e) ? e : n);
    if ((ge(s) ? md.has(s) : ty(s)) || (i || ue(e, "get", s), a)) return r;
    if (Yt(r)) {
      let l = o && hr(s) ? r : r.value;
      return i && St(l) ? Do(l) : l;
    }
    return St(r) ? i ? Do(r) : _r(r) : r;
  }
}
class bd extends yd {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, i) {
    let a = e[s], o = nt(e) && hr(s);
    if (!this._isShallow) {
      let c = is(a);
      if (Te(n) || is(n) || (a = xt(a), n = xt(n)), !o && Yt(a) && !Yt(n)) return c || (a.value = n), !0;
    }
    let r = o ? Number(s) < e.length : wt(e, s), l = Reflect.set(e, s, n, Yt(e) ? e : i);
    return e === xt(i) && (r ? ne(n, a) && gs(e, "set", s, n) : gs(e, "add", s, n)), l;
  }
  deleteProperty(e, s) {
    let n = wt(e, s);
    e[s];
    let i = Reflect.deleteProperty(e, s);
    return i && n && gs(e, "delete", s, void 0), i;
  }
  has(e, s) {
    let n = Reflect.has(e, s);
    return ge(s) && md.has(s) || ue(e, "has", s), n;
  }
  ownKeys(e) {
    return ue(e, "iterate", nt(e) ? "length" : bn), Reflect.ownKeys(e);
  }
}
class _d extends yd {
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
let sy = new bd(), ny = new _d(), iy = new bd(!0), ay = new _d(!0), Wr = (t) => t;
function Ea(t) {
  return function() {
    return t !== "delete" && (t === "clear" ? void 0 : this);
  };
}
function br(t, e) {
  let s, n = (gt(s = { get(i) {
    let a = this.__v_raw, o = xt(a), r = xt(i);
    t || (ne(i, r) && ue(o, "get", i), ue(o, "get", r));
    let { has: l } = Reflect.getPrototypeOf(o), c = e ? Wr : t ? ei : Ue;
    return l.call(o, i) ? c(a.get(i)) : l.call(o, r) ? c(a.get(r)) : void (a !== o && a.get(i));
  }, get size() {
    let i = this.__v_raw;
    return t || ue(xt(i), "iterate", bn), i.size;
  }, has(i) {
    let a = this.__v_raw, o = xt(a), r = xt(i);
    return t || (ne(i, r) && ue(o, "has", i), ue(o, "has", r)), i === r ? a.has(i) : a.has(i) || a.has(r);
  }, forEach(i, a) {
    let o = this, r = o.__v_raw, l = xt(r), c = e ? Wr : t ? ei : Ue;
    return t || ue(l, "iterate", bn), r.forEach((h, u) => i.call(a, c(h), c(u), o));
  } }, t ? { add: Ea("add"), set: Ea("set"), delete: Ea("delete"), clear: Ea("clear") } : { add(i) {
    let a = xt(this), o = Reflect.getPrototypeOf(a), r = xt(i), l = e || Te(i) || is(i) ? i : r;
    return o.has.call(a, l) || ne(i, l) && o.has.call(a, i) || ne(r, l) && o.has.call(a, r) || (a.add(l), gs(a, "add", l, l)), this;
  }, set(i, a) {
    e || Te(a) || is(a) || (a = xt(a));
    let o = xt(this), { has: r, get: l } = Reflect.getPrototypeOf(o), c = r.call(o, i);
    c || (i = xt(i), c = r.call(o, i));
    let h = l.call(o, i);
    return o.set(i, a), c ? ne(a, h) && gs(o, "set", i, a) : gs(o, "add", i, a), this;
  }, delete(i) {
    let a = xt(this), { has: o, get: r } = Reflect.getPrototypeOf(a), l = o.call(a, i);
    l || (i = xt(i), l = o.call(a, i)), r && r.call(a, i);
    let c = a.delete(i);
    return l && gs(a, "delete", i, void 0), c;
  }, clear() {
    let i = xt(this), a = i.size !== 0, o = i.clear();
    return a && gs(i, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    s[i] = function(...a) {
      let o, r = this.__v_raw, l = xt(r), c = (o = l, jt.call(o) === "[object Map]"), h = i === "entries" || i === Symbol.iterator && c, u = r[i](...a), f = e ? Wr : t ? ei : Ue;
      return t || ue(l, "iterate", i === "keys" && c ? xl : bn), gt(Object.create(u), { next() {
        let { value: d, done: p } = u.next();
        return p ? { value: d, done: p } : { value: h ? [f(d[0]), f(d[1])] : f(d), done: p };
      } });
    };
  }), s);
  return (i, a, o) => a === "__v_isReactive" ? !t : a === "__v_isReadonly" ? t : a === "__v_raw" ? i : Reflect.get(wt(n, a) && a in i ? n : i, a, o);
}
let oy = { get: br(!1, !1) }, ry = { get: br(!1, !0) }, ly = { get: br(!0, !1) }, cy = { get: br(!0, !0) }, xd = /* @__PURE__ */ new WeakMap(), vd = /* @__PURE__ */ new WeakMap(), Sd = /* @__PURE__ */ new WeakMap(), wd = /* @__PURE__ */ new WeakMap();
function _r(t) {
  return is(t) ? t : xr(t, !1, sy, oy, xd);
}
function Cd(t) {
  return xr(t, !1, iy, ry, vd);
}
function Do(t) {
  return xr(t, !0, ny, ly, Sd);
}
function hy(t) {
  return xr(t, !0, ay, cy, wd);
}
function xr(t, e, s, n, i) {
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
  }((o = a, jt.call(o)).slice(8, -1));
  if (r === 0) return t;
  let l = i.get(t);
  if (l) return l;
  let c = new Proxy(t, r === 2 ? n : s);
  return i.set(t, c), c;
}
function Ss(t) {
  return is(t) ? Ss(t.__v_raw) : !!(t && t.__v_isReactive);
}
function is(t) {
  return !!(t && t.__v_isReadonly);
}
function Te(t) {
  return !!(t && t.__v_isShallow);
}
function wa(t) {
  return !!t && !!t.__v_raw;
}
function xt(t) {
  let e = t && t.__v_raw;
  return e ? xt(e) : t;
}
function kd(t) {
  return !wt(t, "__v_skip") && Object.isExtensible(t) && ad(t, "__v_skip", !0), t;
}
let Ue = (t) => St(t) ? _r(t) : t, ei = (t) => St(t) ? Do(t) : t;
function Yt(t) {
  return !!t && t.__v_isRef === !0;
}
function Wi(t) {
  return Ad(t, !1);
}
function Md(t) {
  return Ad(t, !0);
}
function Ad(t, e) {
  return Yt(t) ? t : new uy(t, e);
}
class uy {
  constructor(e, s) {
    this.dep = new mr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : xt(e), this._value = s ? e : Ue(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    let s = this._rawValue, n = this.__v_isShallow || Te(e) || is(e);
    ne(e = n ? e : xt(e), s) && (this._rawValue = e, this._value = n ? e : Ue(e), this.dep.trigger());
  }
}
function fy(t) {
  t.dep && t.dep.trigger();
}
function Ca(t) {
  return Yt(t) ? t.value : t;
}
function dy(t) {
  return ot(t) ? t() : Ca(t);
}
let py = { get: (t, e, s) => e === "__v_raw" ? t : Ca(Reflect.get(t, e, s)), set: (t, e, s, n) => {
  let i = t[e];
  return Yt(i) && !Yt(s) ? (i.value = s, !0) : Reflect.set(t, e, s, n);
} };
function yc(t) {
  return Ss(t) ? t : new Proxy(t, py);
}
class gy {
  constructor(e) {
    this.__v_isRef = !0, this._value = void 0;
    let s = this.dep = new mr(), { get: n, set: i } = e(s.track.bind(s), s.trigger.bind(s));
    this._get = n, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e) {
    this._set(e);
  }
}
function Pd(t) {
  return new gy(t);
}
function my(t) {
  let e = nt(t) ? Array(t.length) : {};
  for (let s in t) e[s] = new Td(t, s, void 0);
  return e;
}
class Td {
  constructor(e, s, n) {
    this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = ge(s) ? s : String(s), this._raw = xt(e);
    let i = !0, a = e;
    if (!nt(e) || ge(this._key) || !hr(this._key)) do
      i = !wa(a) || Te(a);
    while (i && (a = a.__v_raw));
    this._shallow = i;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = Ca(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && Yt(this._raw[this._key])) {
      let s = this._object[this._key];
      if (Yt(s)) {
        s.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    var e, s;
    let n;
    return e = this._raw, s = this._key, (n = To.get(e)) && n.get(s);
  }
}
class yy {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function by(t, e, s) {
  return Yt(t) ? t : ot(t) ? new yy(t) : !St(t) || !(arguments.length > 1) ? Wi(t) : new Td(t, e, s);
}
class _y {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new mr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ea - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && Dt !== this) return ud(this, !0), !0;
  }
  get value() {
    let e = this.dep.track();
    return pd(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
let xy = { GET: "get", HAS: "has", ITERATE: "iterate" }, vy = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" }, Ia = {}, Ro = /* @__PURE__ */ new WeakMap();
function Sy() {
  return Bs;
}
function Dd(t, e = !1, s = Bs) {
  if (s) {
    let n = Ro.get(s);
    n || Ro.set(s, n = []), n.push(t);
  }
}
function ms(t, e = 1 / 0, s) {
  if (e <= 0 || !St(t) || t.__v_skip || ((s = s || /* @__PURE__ */ new Map()).get(t) || 0) >= e) return t;
  if (s.set(t, e), e--, Yt(t)) ms(t.value, e, s);
  else if (nt(t)) for (let n = 0; n < t.length; n++) ms(t[n], e, s);
  else {
    let n, i;
    if (n = t, jt.call(n) === "[object Set]" || (i = t, jt.call(i) === "[object Map]")) t.forEach((a) => {
      ms(a, e, s);
    });
    else {
      let a;
      if (a = t, jt.call(a) === "[object Object]") {
        for (let o in t) ms(t[o], e, s);
        for (let o of Object.getOwnPropertySymbols(t)) Object.prototype.propertyIsEnumerable.call(t, o) && ms(t[o], e, s);
      }
    }
  }
  return t;
}
function wy(t, e) {
}
let Cy = { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" };
function gi(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (i) {
    En(i, e, s);
  }
}
function Ve(t, e, s, n) {
  if (ot(t)) {
    let i = gi(t, e, s, n);
    return i && dc(i) && i.catch((a) => {
      En(a, e, s);
    }), i;
  }
  if (nt(t)) {
    let i = [];
    for (let a = 0; a < t.length; a++) i.push(Ve(t[a], e, s, n));
    return i;
  }
}
function En(t, e, s, n = !0) {
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
      Ms(), gi(i, null, 10, [t, r, l]), As();
      return;
    }
  }
  (function(o, r = !0, l = !1) {
    if (l) throw o;
    console.error(o);
  })(t, n, a);
}
let xe = [], Ze = -1, si = [], $s = null, Gn = 0, Rd = Promise.resolve(), po = null;
function oi(t) {
  let e = po || Rd;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function bc(t) {
  if (!(1 & t.flags)) {
    let e = Vi(t), s = xe[xe.length - 1];
    !s || !(2 & t.flags) && e >= Vi(s) ? xe.push(t) : xe.splice(function(n) {
      let i = Ze + 1, a = xe.length;
      for (; i < a; ) {
        let o = i + a >>> 1, r = xe[o], l = Vi(r);
        l < n || l === n && 2 & r.flags ? i = o + 1 : a = o;
      }
      return i;
    }(e), 0, t), t.flags |= 1, Ld();
  }
}
function Ld() {
  po || (po = Rd.then(function t(e) {
    try {
      for (Ze = 0; Ze < xe.length; Ze++) {
        let s = xe[Ze];
        s && !(8 & s.flags) && (4 & s.flags && (s.flags &= -2), gi(s, s.i, s.i ? 15 : 14), 4 & s.flags || (s.flags &= -2));
      }
    } finally {
      for (; Ze < xe.length; Ze++) {
        let s = xe[Ze];
        s && (s.flags &= -2);
      }
      Ze = -1, xe.length = 0, Lo(), po = null, (xe.length || si.length) && t();
    }
  }));
}
function na(t) {
  nt(t) ? si.push(...t) : $s && t.id === -1 ? $s.splice(Gn + 1, 0, t) : 1 & t.flags || (si.push(t), t.flags |= 1), Ld();
}
function _h(t, e, s = Ze + 1) {
  for (; s < xe.length; s++) {
    let n = xe[s];
    if (n && 2 & n.flags) {
      if (t && n.id !== t.uid) continue;
      xe.splice(s, 1), s--, 4 & n.flags && (n.flags &= -2), n(), 4 & n.flags || (n.flags &= -2);
    }
  }
}
function Lo(t) {
  if (si.length) {
    let e = [...new Set(si)].sort((s, n) => Vi(s) - Vi(n));
    if (si.length = 0, $s) return void $s.push(...e);
    for (Gn = 0, $s = e; Gn < $s.length; Gn++) {
      let s = $s[Gn];
      4 & s.flags && (s.flags &= -2), 8 & s.flags || s(), s.flags &= -2;
    }
    $s = null, Gn = 0;
  }
}
let Vi = (t) => t.id == null ? 2 & t.flags ? -1 : 1 / 0 : t.id, oe = null, vr = null;
function ia(t) {
  let e = oe;
  return oe = t, vr = t && t.type.__scopeId || null, e;
}
function ky(t) {
  vr = t;
}
function My() {
  vr = null;
}
let Ay = (t) => _c;
function _c(t, e = oe, s) {
  if (!e || t._n) return t;
  let n = (...i) => {
    let a;
    n._d && ra(-1);
    let o = ia(e);
    try {
      a = t(...i);
    } finally {
      ia(o), n._d && ra(1);
    }
    return a;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Py(t, e) {
  if (oe === null) return t;
  let s = Pa(oe), n = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [a, o, r, l = yt] = e[i];
    a && (ot(a) && (a = { mounted: a, updated: a }), a.deep && ms(o), n.push({ dir: a, instance: s, value: o, oldValue: void 0, arg: r, modifiers: l }));
  }
  return t;
}
function ts(t, e, s, n) {
  let i = t.dirs, a = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    let r = i[o];
    a && (r.oldValue = a[o].value);
    let l = r.dir[n];
    l && (Ms(), Ve(l, s, 8, [t.el, r, t, e]), As());
  }
}
function Od(t, e) {
  if (ae) {
    let s = ae.provides, n = ae.parent && ae.parent.provides;
    n === s && (s = ae.provides = Object.create(n)), s[t] = e;
  }
}
function Hi(t, e, s = !1) {
  let n = ve();
  if (n || _n) {
    let i = _n ? _n._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return s && ot(e) ? e.call(n && n.proxy) : e;
  }
}
function Ty() {
  return !!(ve() || _n);
}
let Fd = Symbol.for("v-scx"), Ed = () => Hi(Fd);
function Dy(t, e) {
  return ka(t, null, e);
}
function Ry(t, e) {
  return ka(t, null, { flush: "post" });
}
function Id(t, e) {
  return ka(t, null, { flush: "sync" });
}
function ni(t, e, s) {
  return ka(t, e, s);
}
function ka(t, e, s = yt) {
  let n, { immediate: i, flush: a } = s, o = gt({}, s), r = e && i || !e && a !== "post";
  if (Mn) {
    if (a === "sync") {
      let u = Ed();
      n = u.__watcherHandles || (u.__watcherHandles = []);
    } else if (!r) {
      let u = () => {
      };
      return u.stop = ie, u.resume = ie, u.pause = ie, u;
    }
  }
  let l = ae;
  o.call = (u, f, d) => Ve(u, l, f, d);
  let c = !1;
  a === "post" ? o.scheduler = (u) => {
    qt(u, l && l.suspense);
  } : a !== "sync" && (c = !0, o.scheduler = (u, f) => {
    f ? u() : bc(u);
  }), o.augmentJob = (u) => {
    e && (u.flags |= 4), c && (u.flags |= 2, l && (u.id = l.uid, u.i = l));
  };
  let h = function(u, f, d = yt) {
    let p, g, m, _, { immediate: y, deep: b, once: v, scheduler: w, augmentJob: S, call: x } = d, k = (D) => b ? D : Te(D) || b === !1 || b === 0 ? ms(D, 1) : ms(D), P = !1, F = !1;
    if (Yt(u) ? (g = () => u.value, P = Te(u)) : Ss(u) ? (g = () => k(u), P = !0) : nt(u) ? (F = !0, P = u.some((D) => Ss(D) || Te(D)), g = () => u.map((D) => Yt(D) ? D.value : Ss(D) ? k(D) : ot(D) ? x ? x(D, 2) : D() : void 0)) : g = ot(u) ? f ? x ? () => x(u, 2) : u : () => {
      if (m) {
        Ms();
        try {
          m();
        } finally {
          As();
        }
      }
      let D = Bs;
      Bs = p;
      try {
        return x ? x(u, 3, [_]) : u(_);
      } finally {
        Bs = D;
      }
    } : ie, f && b) {
      let D = g, M = b === !0 ? 1 / 0 : b;
      g = () => ms(D(), M);
    }
    let E = hd(), C = () => {
      p.stop(), E && E.active && fc(E.effects, p);
    };
    if (v && f) {
      let D = f;
      f = (...M) => {
        D(...M), C();
      };
    }
    let N = F ? Array(u.length).fill(Ia) : Ia, L = (D) => {
      if (1 & p.flags && (p.dirty || D)) if (f) {
        let M = p.run();
        if (b || P || (F ? M.some((T, O) => ne(T, N[O])) : ne(M, N))) {
          m && m();
          let T = Bs;
          Bs = p;
          try {
            let O = [M, N === Ia ? void 0 : F && N[0] === Ia ? [] : N, _];
            N = M, x ? x(f, 3, O) : f(...O);
          } finally {
            Bs = T;
          }
        }
      } else p.run();
    };
    return S && S(L), (p = new ta(g)).scheduler = w ? () => w(L, !1) : L, _ = (D) => Dd(D, !1, p), m = p.onStop = () => {
      let D = Ro.get(p);
      if (D) {
        if (x) x(D, 4);
        else for (let M of D) M();
        Ro.delete(p);
      }
    }, f ? y ? L(!0) : N = p.run() : w ? w(L.bind(null, !0), !0) : p.run(), C.pause = p.pause.bind(p), C.resume = p.resume.bind(p), C.stop = C, C;
  }(t, e, o);
  return Mn && (n ? n.push(h) : r && h()), h;
}
function Ly(t, e, s) {
  let n, i = this.proxy, a = ct(t) ? t.includes(".") ? Nd(i, t) : () => i[t] : t.bind(i, i);
  ot(e) ? n = e : (n = e.handler, s = e);
  let o = mi(this), r = ka(a, n.bind(i), s);
  return o(), r;
}
function Nd(t, e) {
  let s = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < s.length && n; i++) n = n[s[i]];
    return n;
  };
}
let Is = /* @__PURE__ */ new WeakMap(), Bd = Symbol("_vte"), cn = (t) => t && (t.disabled || t.disabled === ""), xh = (t) => "u" > typeof SVGElement && t instanceof SVGElement, vh = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement, Vr = (t, e) => {
  let s = t && t.to;
  return ct(s) ? e ? e(s) : null : s;
};
function Na(t, e, s, { o: { insert: n }, m: i }, a = 2) {
  a === 0 && n(t.targetAnchor, e, s);
  let { el: o, anchor: r, shapeFlag: l, children: c, props: h } = t, u = a === 2;
  if (u && n(o, e, s), !Is.has(t) && (!u || cn(h)) && 16 & l) for (let f = 0; f < c.length; f++) i(c[f], e, s, 2);
  u && n(r, e, s);
}
let Oy = { name: "Teleport", __isTeleport: !0, process(t, e, s, n, i, a, o, r, l, c) {
  let { mc: h, pc: u, pbc: f, o: { insert: d, querySelector: p, createText: g, parentNode: m } } = c, _ = cn(e.props), { dynamicChildren: y } = e, b = (S, x, k) => {
    16 & S.shapeFlag && h(S.children, x, k, i, a, o, r, l);
  }, v = (S = e) => {
    let x = cn(S.props), k = S.target = Vr(S.props, p), P = Hr(k, S, g, d);
    k && (o !== "svg" && xh(k) ? o = "svg" : o !== "mathml" && vh(k) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(k), x || (b(S, k, P), _i(S, !1)));
  }, w = (S) => {
    let x = () => {
      if (Is.get(S) === x) {
        if (Is.delete(S), cn(S.props)) {
          let k = m(S.el) || s;
          b(S, k, S.anchor), _i(S, !0);
        }
        v(S);
      }
    };
    Is.set(S, x), qt(x, a);
  };
  if (t == null) {
    let S, x = e.el = g(""), k = e.anchor = g("");
    if (d(x, s, n), d(k, s, n), (S = e.props) && (S.defer || S.defer === "") || a && a.pendingBranch) return void w(e);
    _ && (b(e, s, k), _i(e, !0)), v();
  } else {
    e.el = t.el;
    let S = e.anchor = t.anchor, x = Is.get(t);
    if (x) {
      x.flags |= 8, Is.delete(t), w(e);
      return;
    }
    e.targetStart = t.targetStart;
    let k = e.target = t.target, P = e.targetAnchor = t.targetAnchor, F = cn(t.props), E = F ? s : k, C = F ? S : P;
    if (o === "svg" || xh(k) ? o = "svg" : (o === "mathml" || vh(k)) && (o = "mathml"), y ? (f(t.dynamicChildren, y, E, i, a, o, r), Rc(t, e, !0)) : l || u(t, e, E, C, i, a, o, r, !1), _) F ? e.props && t.props && e.props.to !== t.props.to && (e.props.to = t.props.to) : Na(e, s, S, c, 1);
    else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
      let N = e.target = Vr(e.props, p);
      N && Na(e, N, null, c, 0);
    } else F && Na(e, k, P, c, 1);
    _i(e, _);
  }
}, remove(t, e, s, { um: n, o: { remove: i } }, a) {
  let { shapeFlag: o, children: r, anchor: l, targetStart: c, targetAnchor: h, target: u, props: f } = t, d = a || !cn(f), p = Is.get(t);
  if (p && (p.flags |= 8, Is.delete(t), d = !1), u && (i(c), i(h)), a && i(l), 16 & o) for (let g = 0; g < r.length; g++) {
    let m = r[g];
    n(m, e, s, d, !!m.dynamicChildren);
  }
}, move: Na, hydrate: function(t, e, s, n, i, a, { o: { nextSibling: o, parentNode: r, querySelector: l, insert: c, createText: h } }, u) {
  function f(m, _) {
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
  function d(m, _) {
    _.anchor = u(o(m), _, r(m), s, n, i, a);
  }
  let p = e.target = Vr(e.props, l), g = cn(e.props);
  if (p) {
    let m = p._lpa || p.firstChild;
    16 & e.shapeFlag && (g ? (d(t, e), f(p, m), e.targetAnchor || Hr(p, e, h, c, r(t) === p ? t : null)) : (e.anchor = o(t), f(p, m), e.targetAnchor || Hr(p, e, h, c), u(m && o(m), e, p, s, n, i, a))), _i(e, g);
  } else g && 16 & e.shapeFlag && (d(t, e), e.targetStart = t, e.targetAnchor = o(t));
  return e.anchor && o(e.anchor);
} };
function _i(t, e) {
  let s = t.ctx;
  if (s && s.ut) {
    let n, i;
    for (e ? (n = t.el, i = t.anchor) : (n = t.targetStart, i = t.targetAnchor); n && n !== i; ) n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function Hr(t, e, s, n, i = null) {
  let a = e.targetStart = s(""), o = e.targetAnchor = s("");
  return a[Bd] = o, t && (n(a, t, i), n(o, t, i)), o;
}
let es = Symbol("_leaveCb"), xi = Symbol("_enterCb");
function xc() {
  let t = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: /* @__PURE__ */ new Map() };
  return Aa(() => {
    t.isMounted = !0;
  }), Cr(() => {
    t.isUnmounting = !0;
  }), t;
}
let Ne = [Function, Array], vc = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Ne, onEnter: Ne, onAfterEnter: Ne, onEnterCancelled: Ne, onBeforeLeave: Ne, onLeave: Ne, onAfterLeave: Ne, onLeaveCancelled: Ne, onBeforeAppear: Ne, onAppear: Ne, onAfterAppear: Ne, onAppearCancelled: Ne }, $d = (t) => {
  let e = t.subTree;
  return e.component ? $d(e.component) : e;
};
function jd(t) {
  let e = t[0];
  if (t.length > 1) {
    for (let s of t) if (s.type !== Gt) {
      e = s;
      break;
    }
  }
  return e;
}
let Wd = { name: "BaseTransition", props: vc, setup(t, { slots: e }) {
  let s = ve(), n = xc();
  return () => {
    let i = e.default && Sr(e.default(), !0), a = i && i.length ? jd(i) : s.subTree ? gp() : void 0;
    if (!a) return;
    let o = xt(t), { mode: r } = o;
    if (n.isLeaving) return zr(a);
    let l = Sh(a);
    if (!l) return zr(a);
    let c = ri(l, o, n, s, (u) => c = u);
    l.type !== Gt && Ps(l, c);
    let h = s.subTree && Sh(s.subTree);
    if (h && h.type !== Gt && !He(h, l) && $d(s).type !== Gt) {
      let u = ri(h, o, n, s);
      if (Ps(h, u), r === "out-in" && l.type !== Gt) return n.isLeaving = !0, u.afterLeave = () => {
        n.isLeaving = !1, 8 & s.job.flags || s.update(), delete u.afterLeave, h = void 0;
      }, zr(a);
      r === "in-out" && l.type !== Gt ? u.delayLeave = (f, d, p) => {
        Vd(n, h)[String(h.key)] = h, f[es] = () => {
          d(), f[es] = void 0, delete c.delayedLeave, h = void 0;
        }, c.delayedLeave = () => {
          p(), delete c.delayedLeave, h = void 0;
        };
      } : h = void 0;
    } else h && (h = void 0);
    return a;
  };
} };
function Vd(t, e) {
  let { leavingVNodes: s } = t, n = s.get(e.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(e.type, n)), n;
}
function ri(t, e, s, n, i) {
  let { appear: a, mode: o, persisted: r = !1, onBeforeEnter: l, onEnter: c, onAfterEnter: h, onEnterCancelled: u, onBeforeLeave: f, onLeave: d, onAfterLeave: p, onLeaveCancelled: g, onBeforeAppear: m, onAppear: _, onAfterAppear: y, onAppearCancelled: b } = e, v = String(t.key), w = Vd(s, t), S = (P, F) => {
    P && Ve(P, n, 9, F);
  }, x = (P, F) => {
    let E = F[1];
    S(P, F), nt(P) ? P.every((C) => C.length <= 1) && E() : P.length <= 1 && E();
  }, k = { mode: o, persisted: r, beforeEnter(P) {
    let F = l;
    if (!s.isMounted) if (a) F = m || l;
    else return;
    P[es] && P[es](!0);
    let E = w[v];
    E && He(t, E) && E.el[es] && E.el[es](), S(F, [P]);
  }, enter(P) {
    if (w[v] === t) return;
    let F = c, E = h, C = u;
    if (!s.isMounted) if (a) F = _ || c, E = y || h, C = b || u;
    else return;
    let N = !1;
    P[xi] = (D) => {
      N || (N = !0, D ? S(C, [P]) : S(E, [P]), k.delayedLeave && k.delayedLeave(), P[xi] = void 0);
    };
    let L = P[xi].bind(null, !1);
    F ? x(F, [P, L]) : L();
  }, leave(P, F) {
    let E = String(t.key);
    if (P[xi] && P[xi](!0), s.isUnmounting) return F();
    S(f, [P]);
    let C = !1;
    P[es] = (L) => {
      C || (C = !0, F(), L ? S(g, [P]) : S(p, [P]), P[es] = void 0, w[E] === t && delete w[E]);
    };
    let N = P[es].bind(null, !1);
    w[E] = t, d ? x(d, [P, N]) : N();
  }, clone(P) {
    let F = ri(P, e, s, n, i);
    return i && i(F), F;
  } };
  return k;
}
function zr(t) {
  if (Ma(t)) return (t = as(t)).children = null, t;
}
function Sh(t) {
  if (!Ma(t)) return t.type.__isTeleport && t.children ? jd(t.children) : t;
  if (t.component) return t.component.subTree;
  let { shapeFlag: e, children: s } = t;
  if (s) {
    if (16 & e) return s[0];
    if (32 & e && ot(s.default)) return s.default();
  }
}
function Ps(t, e) {
  6 & t.shapeFlag && t.component ? (t.transition = e, Ps(t.component.subTree, e)) : 128 & t.shapeFlag ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function Sr(t, e = !1, s) {
  let n = [], i = 0;
  for (let a = 0; a < t.length; a++) {
    let o = t[a], r = s == null ? o.key : String(s) + String(o.key != null ? o.key : a);
    o.type === ee ? (128 & o.patchFlag && i++, n = n.concat(Sr(o.children, e, r))) : (e || o.type !== Gt) && n.push(r != null ? as(o, { key: r }) : o);
  }
  if (i > 1) for (let a = 0; a < n.length; a++) n[a].patchFlag = -2;
  return n;
}
function Sc(t, e) {
  return ot(t) ? gt({ name: t.name }, e, { setup: t }) : t;
}
function Fy() {
  let t = ve();
  return t ? (t.appContext.config.idPrefix || "v") + "-" + t.ids[0] + t.ids[1]++ : "";
}
function wc(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Ey(t) {
  let e = ve(), s = Md(null);
  return e && Object.defineProperty(e.refs === yt ? e.refs = {} : e.refs, t, { enumerable: !0, get: () => s.value, set: (n) => s.value = n }), s;
}
function wh(t, e) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(t, e)) && !s.configurable);
}
let Oo = /* @__PURE__ */ new WeakMap();
function ii(t, e, s, n, i = !1) {
  if (nt(t)) return void t.forEach((g, m) => ii(g, e && (nt(e) ? e[m] : e), s, n, i));
  if (ws(n) && !i) {
    512 & n.shapeFlag && n.type.__asyncResolved && n.component.subTree.component && ii(t, e, s, n.component.subTree);
    return;
  }
  let a = 4 & n.shapeFlag ? Pa(n.component) : n.el, o = i ? null : a, { i: r, r: l } = t, c = e && e.r, h = r.refs === yt ? r.refs = {} : r.refs, u = r.setupState, f = xt(u), d = u === yt ? Un : (g) => !wh(h, g) && wt(f, g), p = (g, m) => !(m && wh(h, m));
  if (c != null && c !== l && (Ch(e), ct(c) ? (h[c] = null, d(c) && (u[c] = null)) : Yt(c) && (p(c, e.k) && (c.value = null), e.k && (h[e.k] = null))), ot(l)) gi(l, r, 12, [o, h]);
  else {
    let g = ct(l), m = Yt(l);
    if (g || m) {
      let _ = () => {
        if (t.f) {
          let y = g ? d(l) ? u[l] : h[l] : p() || !t.k ? l.value : h[t.k];
          if (i) nt(y) && fc(y, a);
          else if (nt(y)) y.includes(a) || y.push(a);
          else if (g) h[l] = [a], d(l) && (u[l] = h[l]);
          else {
            let b = [a];
            p(l, t.k) && (l.value = b), t.k && (h[t.k] = b);
          }
        } else g ? (h[l] = o, d(l) && (u[l] = o)) : m && (p(l, t.k) && (l.value = o), t.k && (h[t.k] = o));
      };
      if (o) {
        let y = () => {
          _(), Oo.delete(t);
        };
        y.id = -1, Oo.set(t, y), qt(y, s);
      } else Ch(t), _();
    }
  }
}
function Ch(t) {
  let e = Oo.get(t);
  e && (e.flags |= 8, Oo.delete(t));
}
let kh = !1, jn = () => {
  kh || (console.error("Hydration completed but contains mismatches."), kh = !0);
}, Ba = (t) => {
  if (t.nodeType === 1) {
    if (t.namespaceURI.includes("svg") && t.tagName !== "foreignObject") return "svg";
    if (t.namespaceURI.includes("MathML")) return "mathml";
  }
}, qn = (t) => t.nodeType === 8;
function Iy(t) {
  let { mt: e, p: s, o: { patchProp: n, createText: i, nextSibling: a, parentNode: o, remove: r, insert: l, createComment: c } } = t, h = (y, b, v, w, S, x = !1) => {
    x = x || !!b.dynamicChildren;
    let k = qn(y) && y.data === "[", P = () => p(y, b, v, w, S, k), { type: F, ref: E, shapeFlag: C, patchFlag: N } = b, L = y.nodeType;
    b.el = y, N === -2 && (x = !1, b.dynamicChildren = null);
    let D = null;
    switch (F) {
      case Gs:
        L !== 3 ? b.children === "" ? (l(b.el = i(""), o(y), y), D = y) : D = P() : (y.data !== b.children && (jn(), y.data = b.children), D = a(y));
        break;
      case Gt:
        _(y) ? (D = a(y), m(b.el = y.content.firstChild, y, v)) : D = L !== 8 || k ? P() : a(y);
        break;
      case xn:
        if (k && (L = (y = a(y)).nodeType), L === 1 || L === 3) {
          D = y;
          let M = !b.children.length;
          for (let T = 0; T < b.staticCount; T++) M && (b.children += D.nodeType === 1 ? D.outerHTML : D.data), T === b.staticCount - 1 && (b.anchor = D), D = a(D);
          return k ? a(D) : D;
        }
        P();
        break;
      case ee:
        D = k ? d(y, b, v, w, S, x) : P();
        break;
      default:
        if (1 & C) D = L === 1 && b.type.toLowerCase() === y.tagName.toLowerCase() || _(y) ? u(y, b, v, w, S, x) : P();
        else if (6 & C) {
          b.slotScopeIds = S;
          let M = o(y);
          if (D = k ? g(y) : qn(y) && y.data === "teleport start" ? g(y, y.data, "teleport end") : a(y), e(b, M, null, v, w, Ba(M), x), ws(b) && !b.type.__asyncResolved) {
            let T;
            k ? (T = Et(ee)).anchor = D ? D.previousSibling : M.lastChild : T = y.nodeType === 3 ? Oc("") : Et("div"), T.el = y, b.component.subTree = T;
          }
        } else 64 & C ? D = L !== 8 ? P() : b.type.hydrate(y, b, v, w, S, x, t, f) : 128 & C && (D = b.type.hydrate(y, b, v, w, Ba(o(y)), S, x, t, h));
    }
    return E != null && ii(E, null, w, b), D;
  }, u = (y, b, v, w, S, x) => {
    x = x || !!b.dynamicChildren;
    let { type: k, props: P, patchFlag: F, shapeFlag: E, dirs: C, transition: N } = b, L = k === "input" || k === "option";
    if (L || F !== -1) {
      let D;
      C && ts(b, null, v, "created");
      let M = !1;
      if (_(y)) {
        M = cp(null, N) && v && v.vnode.props && v.vnode.props.appear;
        let T = y.content.firstChild;
        if (M) {
          let O = T.getAttribute("class");
          O && (T.$cls = O), N.beforeEnter(T);
        }
        m(T, y, v), b.el = y = T;
      }
      if (16 & E && !(P && (P.innerHTML || P.textContent))) {
        let T = f(y.firstChild, b, y, v, w, S, x);
        for (; T; ) {
          $a(y, 1) || jn();
          let O = T;
          T = T.nextSibling, r(O);
        }
      } else if (8 & E) {
        let T = b.children;
        T[0] === `
` && (y.tagName === "PRE" || y.tagName === "TEXTAREA") && (T = T.slice(1));
        let { textContent: O } = y;
        O !== T && O !== T.replace(/\r\n|\r/g, `
`) && ($a(y, 0) || jn(), y.textContent = b.children);
      }
      if (P) {
        if (L || !x || 48 & F) {
          let T = y.tagName.includes("-");
          for (let O in P) (L && (O.endsWith("value") || O === "indeterminate") || On(O) && !vs(O) || O[0] === "." || T && !vs(O)) && n(y, O, null, P[O], void 0, v);
        } else if (P.onClick) n(y, "onClick", null, P.onClick, void 0, v);
        else if (4 & F && Ss(P.style)) for (let T in P.style) P.style[T];
      }
      (D = P && P.onVnodeBeforeMount) && Ce(D, v, b), C && ts(b, null, v, "beforeMount"), ((D = P && P.onVnodeMounted) || C || M) && hp(() => {
        D && Ce(D, v, b), M && N.enter(y), C && ts(b, null, v, "mounted");
      }, w);
    }
    return y.nextSibling;
  }, f = (y, b, v, w, S, x, k) => {
    k = k || !!b.dynamicChildren;
    let P = b.children, F = P.length;
    for (let E = 0; E < F; E++) {
      let C = k ? P[E] : P[E] = ke(P[E]), N = C.type === Gs;
      y ? (N && !k && E + 1 < F && ke(P[E + 1]).type === Gs && (l(i(y.data.slice(C.children.length)), v, a(y)), y.data = C.children), y = h(y, C, w, S, x, k)) : N && !C.children ? l(C.el = i(""), v) : ($a(v, 1) || jn(), s(null, C, v, null, w, S, Ba(v), x));
    }
    return y;
  }, d = (y, b, v, w, S, x) => {
    let { slotScopeIds: k } = b;
    k && (S = S ? S.concat(k) : k);
    let P = o(y), F = f(a(y), b, P, v, w, S, x);
    return F && qn(F) && F.data === "]" ? a(b.anchor = F) : (jn(), l(b.anchor = c("]"), P, F), F);
  }, p = (y, b, v, w, S, x) => {
    if ($a(y.parentElement, 1) || jn(), b.el = null, x) {
      let F = g(y);
      for (; ; ) {
        let E = a(y);
        if (E && E !== F) r(E);
        else break;
      }
    }
    let k = a(y), P = o(y);
    return r(y), s(null, b, P, k, v, w, Ba(P), S), v && (v.vnode.el = b.el, Mr(v, b.el)), k;
  }, g = (y, b = "[", v = "]") => {
    let w = 0;
    for (; y; ) if ((y = a(y)) && qn(y) && (y.data === b && w++, y.data === v)) {
      if (w === 0) return a(y);
      w--;
    }
    return y;
  }, m = (y, b, v) => {
    let w = b.parentNode;
    w && w.replaceChild(y, b);
    let S = v;
    for (; S; ) S.vnode.el === b && (S.vnode.el = S.subTree.el = y), S = S.parent;
  }, _ = (y) => y.nodeType === 1 && y.tagName === "TEMPLATE";
  return [(y, b) => {
    if (!b.hasChildNodes()) {
      s(null, y, b), Lo(), b._vnode = y;
      return;
    }
    h(b.firstChild, y, null, null, null), Lo(), b._vnode = y;
  }, h];
}
let Mh = "data-allow-mismatch", Ny = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
function $a(t, e) {
  if (e === 0 || e === 1) for (; t && !t.hasAttribute(Mh); ) t = t.parentElement;
  let s = t && t.getAttribute(Mh);
  if (s == null) return !1;
  {
    if (s === "") return !0;
    let n = s.split(",");
    return !!(e === 0 && n.includes("children")) || n.includes(Ny[e]);
  }
}
let By = dr().requestIdleCallback || ((t) => setTimeout(t, 1)), $y = dr().cancelIdleCallback || ((t) => clearTimeout(t)), jy = (t = 1e4) => (e) => {
  let s = By(e, { timeout: t });
  return () => $y(s);
}, Wy = (t) => (e, s) => {
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
}, Vy = (t) => (e) => {
  if (t) {
    let s = matchMedia(t);
    if (!s.matches) return s.addEventListener("change", e, { once: !0 }), () => s.removeEventListener("change", e);
    e();
  }
}, Hy = (t = []) => (e, s) => {
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
}, ws = (t) => !!t.type.__asyncLoader;
function zy(t) {
  let e;
  ot(t) && (t = { loader: t });
  let { loader: s, loadingComponent: n, errorComponent: i, delay: a = 200, hydrate: o, timeout: r, suspensible: l = !0, onError: c } = t, h = null, u = 0, f = () => {
    let d;
    return h || (d = h = s().catch((p) => {
      if (p = p instanceof Error ? p : Error(String(p)), c) return new Promise((g, m) => {
        c(p, () => g((u++, h = null, f())), () => m(p), u + 1);
      });
      throw p;
    }).then((p) => d !== h && h ? h : (p && (p.__esModule || p[Symbol.toStringTag] === "Module") && (p = p.default), e = p, p)));
  };
  return Sc({ name: "AsyncComponentWrapper", __asyncLoader: f, __asyncHydrate(d, p, g) {
    let m = !1;
    (p.bu || (p.bu = [])).push(() => m = !0);
    let _ = () => {
      m || g();
    }, y = o ? () => {
      let b = o(_, (v) => function(w, S) {
        if (qn(w) && w.data === "[") {
          let x = 1, k = w.nextSibling;
          for (; k; ) {
            if (k.nodeType === 1) {
              if (S(k) === !1) break;
            } else if (qn(k)) if (k.data === "]") {
              if (--x == 0) break;
            } else k.data === "[" && x++;
            k = k.nextSibling;
          }
        } else S(w);
      }(d, v));
      b && (p.bum || (p.bum = [])).push(b);
    } : _;
    e ? y() : f().then(() => !p.isUnmounted && y());
  }, get __asyncResolved() {
    return e;
  }, setup() {
    let d = ae;
    if (wc(d), e) return () => ja(e, d);
    let p = (y) => {
      h = null, En(y, d, 13, !i);
    };
    if (l && d.suspense || Mn) return f().then((y) => () => ja(y, d)).catch((y) => (p(y), () => i ? Et(i, { error: y }) : null));
    let g = Wi(!1), m = Wi(), _ = Wi(!!a);
    return a && setTimeout(() => {
      _.value = !1;
    }, a), r != null && setTimeout(() => {
      if (!g.value && !m.value) {
        let y = Error(`Async component timed out after ${r}ms.`);
        p(y), m.value = y;
      }
    }, r), f().then(() => {
      g.value = !0, d.parent && Ma(d.parent.vnode) && d.parent.update();
    }).catch((y) => {
      p(y), m.value = y;
    }), () => g.value && e ? ja(e, d) : m.value && i ? Et(i, { error: m.value }) : n && !_.value ? ja(n, d) : void 0;
  } });
}
function ja(t, e) {
  let { ref: s, props: n, children: i, ce: a } = e.vnode, o = Et(t, n, i);
  return o.ref = s, o.ce = a, delete e.vnode.ce, o;
}
let Ma = (t) => t.type.__isKeepAlive, Gy = { name: "KeepAlive", __isKeepAlive: !0, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(t, { slots: e }) {
  let s = ve(), n = s.ctx;
  if (!n.renderer) return () => {
    let y = e.default && e.default();
    return y && y.length === 1 ? y[0] : y;
  };
  let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, r = s.suspense, { renderer: { p: l, m: c, um: h, o: { createElement: u } } } = n, f = u("div");
  function d(y) {
    Gr(y), h(y, s, r, !0);
  }
  function p(y) {
    i.forEach((b, v) => {
      let w = Dl(ws(b) ? b.type.__asyncResolved || {} : b.type);
      w && !y(w) && g(v);
    });
  }
  function g(y) {
    let b = i.get(y);
    !b || o && He(b, o) ? o && Gr(o) : d(b), i.delete(y), a.delete(y);
  }
  n.activate = (y, b, v, w, S) => {
    let x = y.component;
    c(y, b, v, 0, r), l(x.vnode, y, b, v, x, r, w, y.slotScopeIds, S), qt(() => {
      x.isDeactivated = !1, x.a && Qn(x.a);
      let k = y.props && y.props.onVnodeMounted;
      k && Ce(k, x.parent, y);
    }, r);
  }, n.deactivate = (y) => {
    let b = y.component;
    No(b.m), No(b.a), c(y, f, null, 1, r), qt(() => {
      b.da && Qn(b.da);
      let v = y.props && y.props.onVnodeUnmounted;
      v && Ce(v, b.parent, y), b.isDeactivated = !0;
    }, r);
  }, ni(() => [t.include, t.exclude], ([y, b]) => {
    y && p((v) => Di(y, v)), b && p((v) => !Di(b, v));
  }, { flush: "post", deep: !0 });
  let m = null, _ = () => {
    m != null && (Bo(s.subTree.type) ? qt(() => {
      i.set(m, Wa(s.subTree));
    }, s.subTree.suspense) : i.set(m, Wa(s.subTree)));
  };
  return Aa(_), wr(_), Cr(() => {
    i.forEach((y) => {
      let { subTree: b, suspense: v } = s, w = Wa(b);
      if (y.type === w.type && y.key === w.key) {
        Gr(w);
        let S = w.component.da;
        S && qt(S, v);
        return;
      }
      d(y);
    });
  }), () => {
    if (m = null, !e.default) return o = null;
    let y = e.default(), b = y[0];
    if (y.length > 1) return o = null, y;
    if (!Ts(b) || !(4 & b.shapeFlag) && !(128 & b.shapeFlag)) return o = null, b;
    let v = Wa(b);
    if (v.type === Gt) return o = null, v;
    let w = v.type, S = Dl(ws(v) ? v.type.__asyncResolved || {} : w), { include: x, exclude: k, max: P } = t;
    if (x && (!S || !Di(x, S)) || k && S && Di(k, S)) return v.shapeFlag &= -257, o = v, b;
    let F = v.key == null ? w : v.key, E = i.get(F);
    return v.el && (v = as(v), 128 & b.shapeFlag && (b.ssContent = v)), m = F, E ? (v.el = E.el, v.component = E.component, v.transition && Ps(v, v.transition), v.shapeFlag |= 512, a.delete(F), a.add(F)) : (a.add(F), P && a.size > parseInt(P, 10) && g(a.values().next().value)), v.shapeFlag |= 256, o = v, Bo(b.type) ? b : v;
  };
} };
function Di(t, e) {
  let s;
  return nt(t) ? t.some((n) => Di(n, e)) : ct(t) ? t.split(",").includes(e) : (s = t, jt.call(s) === "[object RegExp]" && (t.lastIndex = 0, t.test(e)));
}
function Hd(t, e) {
  Gd(t, "a", e);
}
function zd(t, e) {
  Gd(t, "da", e);
}
function Gd(t, e, s = ae) {
  let n = t.__wdc || (t.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return t();
  });
  if (Fo(e, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; ) Ma(i.parent.vnode) && function(a, o, r, l) {
      let c = Fo(o, a, l, !0);
      kr(() => {
        fc(l[o], c);
      }, r);
    }(n, e, s, i), i = i.parent;
  }
}
function Gr(t) {
  t.shapeFlag &= -257, t.shapeFlag &= -513;
}
function Wa(t) {
  return 128 & t.shapeFlag ? t.ssContent : t;
}
function Fo(t, e, s = ae, n = !1) {
  if (s) {
    let i = s[t] || (s[t] = []), a = e.__weh || (e.__weh = (...o) => {
      Ms();
      let r = mi(s), l = Ve(e, s, t, o);
      return r(), As(), l;
    });
    return n ? i.unshift(a) : i.push(a), a;
  }
}
let Ds = (t) => (e, s = ae) => {
  Mn && t !== "sp" || Fo(t, (...n) => e(...n), s);
}, Ud = Ds("bm"), Aa = Ds("m"), Cc = Ds("bu"), wr = Ds("u"), Cr = Ds("bum"), kr = Ds("um"), qd = Ds("sp"), Kd = Ds("rtg"), Yd = Ds("rtc");
function Jd(t, e = ae) {
  Fo("ec", t, e);
}
let kc = "components";
function Uy(t, e) {
  return Mc(kc, t, !0, e) || t;
}
let Xd = Symbol.for("v-ndc");
function qy(t) {
  return ct(t) ? Mc(kc, t, !1) || t : t || Xd;
}
function Ky(t) {
  return Mc("directives", t);
}
function Mc(t, e, s = !0, n = !1) {
  let i = oe || ae;
  if (i) {
    let a = i.type;
    if (t === kc) {
      let r = Dl(a, !1);
      if (r && (r === e || r === Tt(e) || r === Fn(Tt(e)))) return a;
    }
    let o = Ah(i[t] || a[t], e) || Ah(i.appContext[t], e);
    return !o && n ? a : o;
  }
}
function Ah(t, e) {
  return t && (t[e] || t[Tt(e)] || t[Fn(Tt(e))]);
}
function Yy(t, e, s, n) {
  let i, a = s && s[n], o = nt(t);
  if (o || ct(t)) {
    let r = o && Ss(t), l = !1, c = !1;
    r && (l = !Te(t), c = is(t), t = yr(t)), i = Array(t.length);
    for (let h = 0, u = t.length; h < u; h++) i[h] = e(l ? c ? ei(Ue(t[h])) : Ue(t[h]) : t[h], h, void 0, a && a[h]);
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
function Jy(t, e) {
  for (let s = 0; s < e.length; s++) {
    let n = e[s];
    if (nt(n)) for (let i = 0; i < n.length; i++) t[n[i].name] = n[i].fn;
    else n && (t[n.name] = n.key ? (...i) => {
      let a = n.fn(...i);
      return a && (a.key = n.key), a;
    } : n.fn);
  }
  return t;
}
function Xy(t, e, s = {}, n, i) {
  if (oe.ce || oe.parent && ws(oe.parent) && oe.parent.ce) {
    let c = Object.keys(s).length > 0;
    return e !== "default" && (s.name = e), oa(), $o(ee, null, [Et("slot", s, n && n())], c ? -2 : 64);
  }
  let a = t[e];
  a && a._c && (a._d = !1), oa();
  let o = a && Ac(a(s)), r = s.key || o && o.key, l = $o(ee, { key: (r && !ge(r) ? r : `_${e}`) + (!o && n ? "_fb" : "") }, o || (n ? n() : []), o && t._ === 1 ? 64 : -2);
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), a && a._c && (a._d = !0), l;
}
function Ac(t) {
  return t.some((e) => !Ts(e) || e.type !== Gt && (e.type !== ee || !!Ac(e.children))) ? t : null;
}
function Zy(t, e) {
  let s = {};
  for (let n in t) s[e && /[A-Z]/.test(n) ? `on:${n}` : Zn(n)] = t[n];
  return s;
}
let vl = (t) => t ? bp(t) ? Pa(t) : vl(t.parent) : null, zi = gt(/* @__PURE__ */ Object.create(null), { $: (t) => t, $el: (t) => t.vnode.el, $data: (t) => t.data, $props: (t) => t.props, $attrs: (t) => t.attrs, $slots: (t) => t.slots, $refs: (t) => t.refs, $parent: (t) => vl(t.parent), $root: (t) => vl(t.root), $host: (t) => t.ce, $emit: (t) => t.emit, $options: (t) => Cl(t), $forceUpdate: (t) => t.f || (t.f = () => {
  bc(t.update);
}), $nextTick: (t) => t.n || (t.n = oi.bind(t.proxy)), $watch: (t) => Ly.bind(t) }), Ur = (t, e) => t !== yt && !t.__isScriptSetup && wt(t, e), Sl = { get({ _: t }, e) {
  let s, n;
  if (e === "__v_skip") return !0;
  let { ctx: i, setupState: a, data: o, props: r, accessCache: l, type: c, appContext: h } = t;
  if (e[0] !== "$") {
    let f = l[e];
    if (f !== void 0) switch (f) {
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
      if (Ur(a, e)) return l[e] = 1, a[e];
      if (o !== yt && wt(o, e)) return l[e] = 2, o[e];
      if (wt(r, e)) return l[e] = 3, r[e];
      if (i !== yt && wt(i, e)) return l[e] = 4, i[e];
      wl && (l[e] = 0);
    }
  }
  let u = zi[e];
  return u ? (e === "$attrs" && ue(t.attrs, "get", ""), u(t)) : (s = c.__cssModules) && (s = s[e]) ? s : i !== yt && wt(i, e) ? (l[e] = 4, i[e]) : wt(n = h.config.globalProperties, e) ? n[e] : void 0;
}, set({ _: t }, e, s) {
  let { data: n, setupState: i, ctx: a } = t;
  return Ur(i, e) ? (i[e] = s, !0) : n !== yt && wt(n, e) ? (n[e] = s, !0) : !wt(t.props, e) && !(e[0] === "$" && e.slice(1) in t) && (a[e] = s, !0);
}, has({ _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: i, props: a, type: o } }, r) {
  let l;
  return !!(s[r] || t !== yt && r[0] !== "$" && wt(t, r) || Ur(e, r) || wt(a, r) || wt(n, r) || wt(zi, r) || wt(i.config.globalProperties, r) || (l = o.__cssModules) && l[r]);
}, defineProperty(t, e, s) {
  return s.get != null ? t._.accessCache[e] = 0 : wt(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
} }, Qy = gt({}, Sl, { get(t, e) {
  if (e !== Symbol.unscopables) return Sl.get(t, e, t);
}, has: (t, e) => e[0] !== "_" && !Nm(e) });
function tb() {
  return null;
}
function eb() {
  return null;
}
function sb(t) {
}
function nb(t) {
}
function ib() {
  return null;
}
function ab() {
}
function ob(t, e) {
  return null;
}
function rb() {
  return Zd().slots;
}
function lb() {
  return Zd().attrs;
}
function Zd(t) {
  let e = ve();
  return e.setupContext || (e.setupContext = Sp(e));
}
function aa(t) {
  return nt(t) ? t.reduce((e, s) => (e[s] = null, e), {}) : t;
}
function cb(t, e) {
  let s = aa(t);
  for (let n in e) {
    if (n.startsWith("__skip")) continue;
    let i = s[n];
    i ? nt(i) || ot(i) ? i = s[n] = { type: i, default: e[n] } : i.default = e[n] : i === null && (i = s[n] = { default: e[n] }), i && e[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return s;
}
function hb(t, e) {
  return t && e ? nt(t) && nt(e) ? t.concat(e) : gt({}, aa(t), aa(e)) : t || e;
}
function ub(t, e) {
  let s = {};
  for (let n in t) e.includes(n) || Object.defineProperty(s, n, { enumerable: !0, get: () => t[n] });
  return s;
}
function fb(t) {
  let e = ve(), s = Mn, n = t();
  la(), s && Jn(!1);
  let i = () => {
    mi(e), s && Jn(!0);
  }, a = () => {
    ve() !== e && e.scope.off(), la(), s && Jn(!1);
  };
  return dc(n) && (n = n.catch((o) => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), o;
  })), [n, () => {
    i(), Promise.resolve().then(a);
  }];
}
let wl = !0;
function Ph(t, e, s) {
  Ve(nt(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, s);
}
function Cl(t) {
  let e, s = t.type, { mixins: n, extends: i } = s, { mixins: a, optionsCache: o, config: { optionMergeStrategies: r } } = t.appContext, l = o.get(s);
  return l ? e = l : a.length || n || i ? (e = {}, a.length && a.forEach((c) => Eo(e, c, r, !0)), Eo(e, s, r)) : e = s, St(s) && o.set(s, e), e;
}
function Eo(t, e, s, n = !1) {
  let { mixins: i, extends: a } = e;
  for (let o in a && Eo(t, a, s, !0), i && i.forEach((r) => Eo(t, r, s, !0)), e) if (!(n && o === "expose")) {
    let r = db[o] || s && s[o];
    t[o] = r ? r(t[o], e[o]) : e[o];
  }
  return t;
}
let db = { data: Th, props: Dh, emits: Dh, methods: vi, computed: vi, beforeCreate: be, created: be, beforeMount: be, mounted: be, beforeUpdate: be, updated: be, beforeDestroy: be, beforeUnmount: be, destroyed: be, unmounted: be, activated: be, deactivated: be, errorCaptured: be, serverPrefetch: be, components: vi, directives: vi, watch: function(t, e) {
  if (!t) return e;
  if (!e) return t;
  let s = gt(/* @__PURE__ */ Object.create(null), t);
  for (let n in e) s[n] = be(t[n], e[n]);
  return s;
}, provide: Th, inject: function(t, e) {
  return vi(kl(t), kl(e));
} };
function Th(t, e) {
  return e ? t ? function() {
    return gt(ot(t) ? t.call(this, this) : t, ot(e) ? e.call(this, this) : e);
  } : e : t;
}
function kl(t) {
  if (nt(t)) {
    let e = {};
    for (let s = 0; s < t.length; s++) e[t[s]] = t[s];
    return e;
  }
  return t;
}
function be(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function vi(t, e) {
  return t ? gt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Dh(t, e) {
  return t ? nt(t) && nt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : gt(/* @__PURE__ */ Object.create(null), aa(t), aa(e ?? {})) : e;
}
function Qd() {
  return { app: null, config: { isNativeTag: Un, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let pb = 0, _n = null;
function gb(t, e, s = yt) {
  let n = ve(), i = Tt(e), a = Me(e), o = tp(t, i), r = Pd((l, c) => {
    let h, u, f = yt;
    return Id(() => {
      let d = t[i];
      ne(h, d) && (h = d, c());
    }), { get: () => (l(), s.get ? s.get(h) : h), set(d) {
      let p = s.set ? s.set(d) : d;
      if (!ne(p, h) && !(f !== yt && ne(d, f))) return;
      let g = n.vnode.props;
      g && (e in g || i in g || a in g) && (`onUpdate:${e}` in g || `onUpdate:${i}` in g || `onUpdate:${a}` in g) || (h = d, c()), n.emit(`update:${e}`, p), ne(d, p) && ne(d, f) && !ne(p, u) && c(), f = d, u = p;
    } };
  });
  return r[Symbol.iterator] = () => {
    let l = 0;
    return { next: () => l < 2 ? { value: l++ ? o || yt : r, done: !1 } : { done: !0 } };
  }, r;
}
let tp = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Tt(e)}Modifiers`] || t[`${Me(e)}Modifiers`];
function mb(t, e, ...s) {
  let n;
  if (t.isUnmounted) return;
  let i = t.vnode.props || yt, a = s, o = e.startsWith("update:"), r = o && tp(i, e.slice(7));
  r && (r.trim && (a = s.map((h) => ct(h) ? h.trim() : h)), r.number && (a = s.map(fr)));
  let l = i[n = Zn(e)] || i[n = Zn(Tt(e))];
  !l && o && (l = i[n = Zn(Me(e))]), l && Ve(l, t, 6, a);
  let c = i[n + "Once"];
  if (c) {
    if (t.emitted) {
      if (t.emitted[n]) return;
    } else t.emitted = {};
    t.emitted[n] = !0, Ve(c, t, 6, a);
  }
}
let yb = /* @__PURE__ */ new WeakMap();
function Io(t, e) {
  return !!t && !!On(e) && (wt(t, (e = e.slice(2).replace(/Once$/, ""))[0].toLowerCase() + e.slice(1)) || wt(t, Me(e)) || wt(t, e));
}
function go(t) {
  let e, s, { type: n, vnode: i, proxy: a, withProxy: o, propsOptions: [r], slots: l, attrs: c, emit: h, render: u, renderCache: f, props: d, data: p, setupState: g, ctx: m, inheritAttrs: _ } = t, y = ia(t);
  try {
    if (4 & i.shapeFlag) {
      let v = o || a;
      e = ke(u.call(v, v, f, d, g, p, m)), s = c;
    } else e = ke(n.length > 1 ? n(d, { attrs: c, slots: l, emit: h }) : n(d, null)), s = n.props ? c : bb(c);
  } catch (v) {
    Ui.length = 0, En(v, t, 1), e = Et(Gt);
  }
  let b = e;
  if (s && _ !== !1) {
    let v = Object.keys(s), { shapeFlag: w } = b;
    v.length && 7 & w && (r && v.some(cr) && (s = _b(s, r)), b = as(b, s, !1, !0));
  }
  return i.dirs && ((b = as(b, null, !1, !0)).dirs = b.dirs ? b.dirs.concat(i.dirs) : i.dirs), i.transition && Ps(b, i.transition), e = b, ia(y), e;
}
let bb = (t) => {
  let e;
  for (let s in t) (s === "class" || s === "style" || On(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, _b = (t, e) => {
  let s = {};
  for (let n in t) cr(n) && n.slice(9) in e || (s[n] = t[n]);
  return s;
};
function Rh(t, e, s) {
  let n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < n.length; i++) {
    let a = n[i];
    if (ep(e, t, a) && !Io(s, a)) return !0;
  }
  return !1;
}
function ep(t, e, s) {
  let n = t[s], i = e[s];
  return s === "style" && St(n) && St(i) ? !ks(n, i) : n !== i;
}
function Mr({ vnode: t, parent: e, suspense: s }, n) {
  for (; e; ) {
    let i = e.subTree;
    if (i.suspense && i.suspense.activeBranch === t && (i.suspense.vnode.el = i.el = n, t = i), i === t) (t = e.vnode).el = n, e = e.parent;
    else break;
  }
  s && s.activeBranch === t && (s.vnode.el = n);
}
let Ml = {}, sp = (t) => Object.getPrototypeOf(t) === Ml;
function np(t, e, s, n) {
  let i, [a, o] = t.propsOptions, r = !1;
  if (e) for (let l in e) {
    let c;
    if (vs(l)) continue;
    let h = e[l];
    a && wt(a, c = Tt(l)) ? o && o.includes(c) ? (i || (i = {}))[c] = h : s[c] = h : Io(t.emitsOptions, l) || l in n && h === n[l] || (n[l] = h, r = !0);
  }
  if (o) {
    let l = xt(s), c = i || yt;
    for (let h = 0; h < o.length; h++) {
      let u = o[h];
      s[u] = Al(a, l, u, c[u], t, !wt(c, u));
    }
  }
  return r;
}
function Al(t, e, s, n, i, a) {
  let o = t[s];
  if (o != null) {
    let r = wt(o, "default");
    if (r && n === void 0) {
      let l = o.default;
      if (o.type !== Function && !o.skipFactory && ot(l)) {
        let { propsDefaults: c } = i;
        if (s in c) n = c[s];
        else {
          let h = mi(i);
          n = c[s] = l.call(null, e), h();
        }
      } else n = l;
      i.ce && i.ce._setProp(s, n);
    }
    o[0] && (a && !r ? n = !1 : o[1] && (n === "" || n === Me(s)) && (n = !0));
  }
  return n;
}
let xb = /* @__PURE__ */ new WeakMap();
function Lh(t) {
  return !(t[0] === "$" || vs(t));
}
let Pc = (t) => t === "_" || t === "_ctx" || t === "$stable", Tc = (t) => nt(t) ? t.map(ke) : [ke(t)], vb = (t, e, s) => {
  if (e._n) return e;
  let n = _c((...i) => Tc(e(...i)), s);
  return n._c = !1, n;
}, ip = (t, e, s) => {
  let n = t._ctx;
  for (let i in t) {
    if (Pc(i)) continue;
    let a = t[i];
    if (ot(a)) e[i] = vb(i, a, n);
    else if (a != null) {
      let o = Tc(a);
      e[i] = () => o;
    }
  }
}, ap = (t, e) => {
  let s = Tc(e);
  t.slots.default = () => s;
}, op = (t, e, s) => {
  for (let n in e) (s || !Pc(n)) && (t[n] = e[n]);
}, qt = hp;
function Dc(t) {
  return lp(t);
}
function rp(t) {
  return lp(t, Iy);
}
function lp(t, e) {
  var s;
  let n, i;
  dr().__VUE__ = !0;
  let { insert: a, remove: o, patchProp: r, createElement: l, createText: c, createComment: h, setText: u, setElementText: f, parentNode: d, nextSibling: p, setScopeId: g = ie, insertStaticContent: m } = t, _ = (A, R, I, z = null, $ = null, B = null, G, j = null, H = !!R.dynamicChildren) => {
    if (A === R) return;
    A && !He(A, R) && (z = Y(A), et(A, $, B, !0), A = null), R.patchFlag === -2 && (H = !1, R.dynamicChildren = null);
    let { type: W, ref: J, shapeFlag: X } = R;
    switch (W) {
      case Gs:
        y(A, R, I, z);
        break;
      case Gt:
        b(A, R, I, z);
        break;
      case xn:
        A == null && v(R, I, z, G);
        break;
      case ee:
        C(A, R, I, z, $, B, G, j, H);
        break;
      default:
        1 & X ? w(A, R, I, z, $, B, G, j, H) : 6 & X ? N(A, R, I, z, $, B, G, j, H) : (64 & X || 128 & X) && W.process(A, R, I, z, $, B, G, j, H, at);
    }
    J != null && $ ? ii(J, A && A.ref, B, R || A, !R) : J == null && A && A.ref != null && ii(A.ref, null, B, A, !0);
  }, y = (A, R, I, z) => {
    if (A == null) a(R.el = c(R.children), I, z);
    else {
      let $ = R.el = A.el;
      R.children !== A.children && u($, R.children);
    }
  }, b = (A, R, I, z) => {
    A == null ? a(R.el = h(R.children || ""), I, z) : R.el = A.el;
  }, v = (A, R, I, z) => {
    [A.el, A.anchor] = m(A.children, R, I, z, A.el, A.anchor);
  }, w = (A, R, I, z, $, B, G, j, H) => {
    if (R.type === "svg" ? G = "svg" : R.type === "math" && (G = "mathml"), A == null) S(R, I, z, $, B, G, j, H);
    else {
      let W = A.el && A.el._isVueCE ? A.el : null;
      try {
        W && W._beginPatch(), P(A, R, $, B, G, j, H);
      } finally {
        W && W._endPatch();
      }
    }
  }, S = (A, R, I, z, $, B, G, j) => {
    let H, W, { props: J, shapeFlag: X, transition: st, dirs: tt } = A;
    if (H = A.el = l(A.type, B, J && J.is, J), 8 & X ? f(H, A.children) : 16 & X && k(A.children, H, null, z, $, qr(A, B), G, j), tt && ts(A, null, z, "created"), x(H, A, A.scopeId, G, z), J) {
      for (let rt in J) rt === "value" || vs(rt) || r(H, rt, null, J[rt], B, z);
      "value" in J && r(H, "value", null, J.value, B), (W = J.onVnodeBeforeMount) && Ce(W, z, A);
    }
    tt && ts(A, null, z, "beforeMount");
    let ht = cp($, st);
    ht && st.beforeEnter(H), a(H, R, I), ((W = J && J.onVnodeMounted) || ht || tt) && qt(() => {
      W && Ce(W, z, A), ht && st.enter(H), tt && ts(A, null, z, "mounted");
    }, $);
  }, x = (A, R, I, z, $) => {
    if (I && g(A, I), z) for (let B = 0; B < z.length; B++) g(A, z[B]);
    if ($) {
      let B = $.subTree;
      if (R === B || Bo(B.type) && (B.ssContent === R || B.ssFallback === R)) {
        let G = $.vnode;
        x(A, G, G.scopeId, G.slotScopeIds, $.parent);
      }
    }
  }, k = (A, R, I, z, $, B, G, j, H = 0) => {
    for (let W = H; W < A.length; W++) _(null, A[W] = j ? fs(A[W]) : ke(A[W]), R, I, z, $, B, G, j);
  }, P = (A, R, I, z, $, B, G) => {
    let j, H = R.el = A.el, { patchFlag: W, dynamicChildren: J, dirs: X } = R;
    W |= 16 & A.patchFlag;
    let st = A.props || yt, tt = R.props || yt;
    if (I && sn(I, !1), (j = tt.onVnodeBeforeUpdate) && Ce(j, I, R, A), X && ts(R, A, I, "beforeUpdate"), I && sn(I, !0), (st.innerHTML && tt.innerHTML == null || st.textContent && tt.textContent == null) && f(H, ""), J ? F(A.dynamicChildren, J, H, I, z, qr(R, $), B) : G || O(A, R, H, null, I, z, qr(R, $), B, !1), W > 0) {
      if (16 & W) E(H, st, tt, I, $);
      else if (2 & W && st.class !== tt.class && r(H, "class", null, tt.class, $), 4 & W && r(H, "style", st.style, tt.style, $), 8 & W) {
        let ht = R.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let kt = ht[rt], Nt = st[kt], Wt = tt[kt];
          (Wt !== Nt || kt === "value") && r(H, kt, Nt, Wt, $, I);
        }
      }
      1 & W && A.children !== R.children && f(H, R.children);
    } else G || J != null || E(H, st, tt, I, $);
    ((j = tt.onVnodeUpdated) || X) && qt(() => {
      j && Ce(j, I, R, A), X && ts(R, A, I, "updated");
    }, z);
  }, F = (A, R, I, z, $, B, G) => {
    for (let j = 0; j < R.length; j++) {
      let H = A[j], W = R[j], J = H.el && (H.type === ee || !He(H, W) || 198 & H.shapeFlag) ? d(H.el) : I;
      _(H, W, J, null, z, $, B, G, !0);
    }
  }, E = (A, R, I, z, $) => {
    if (R !== I) {
      if (R !== yt) for (let B in R) vs(B) || B in I || r(A, B, R[B], null, $, z);
      for (let B in I) {
        if (vs(B)) continue;
        let G = I[B], j = R[B];
        G !== j && B !== "value" && r(A, B, j, G, $, z);
      }
      "value" in I && r(A, "value", R.value, I.value, $);
    }
  }, C = (A, R, I, z, $, B, G, j, H) => {
    let W = R.el = A ? A.el : c(""), J = R.anchor = A ? A.anchor : c(""), { patchFlag: X, dynamicChildren: st, slotScopeIds: tt } = R;
    tt && (j = j ? j.concat(tt) : tt), A == null ? (a(W, I, z), a(J, I, z), k(R.children || [], I, J, $, B, G, j, H)) : X > 0 && 64 & X && st && A.dynamicChildren && A.dynamicChildren.length === st.length ? (F(A.dynamicChildren, st, I, $, B, G, j), (R.key != null || $ && R === $.subTree) && Rc(A, R, !0)) : O(A, R, I, J, $, B, G, j, H);
  }, N = (A, R, I, z, $, B, G, j, H) => {
    R.slotScopeIds = j, A == null ? 512 & R.shapeFlag ? $.ctx.activate(R, I, z, G, H) : L(R, I, z, $, B, G, H) : D(A, R, H);
  }, L = (A, R, I, z, $, B, G) => {
    let j = A.component = yp(A, z, $);
    if (Ma(A) && (j.ctx.renderer = at), _p(j, !1, G), j.asyncDep) {
      if ($ && $.registerDep(j, M, G), !A.el) {
        let H = j.subTree = Et(Gt);
        b(null, H, R, I), A.placeholder = H.el;
      }
    } else M(j, A, R, I, $, B, G);
  }, D = (A, R, I) => {
    let z = R.component = A.component;
    if (function($, B, G) {
      let { props: j, children: H, component: W } = $, { props: J, children: X, patchFlag: st } = B, tt = W.emitsOptions;
      if (B.dirs || B.transition) return !0;
      if (!G || !(st >= 0)) return (!!H || !!X) && (!X || !X.$stable) || j !== J && (j ? !J || Rh(j, J, tt) : !!J);
      if (1024 & st) return !0;
      if (16 & st) return j ? Rh(j, J, tt) : !!J;
      if (8 & st) {
        let ht = B.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let kt = ht[rt];
          if (ep(J, j, kt) && !Io(tt, kt)) return !0;
        }
      }
      return !1;
    }(A, R, I)) {
      if (z.asyncDep && !z.asyncResolved) return void T(z, R, I);
      z.next = R, z.update();
    } else R.el = A.el, z.vnode = R;
  }, M = (A, R, I, z, $, B, G) => {
    A.scope.on();
    let j = A.effect = new ta(() => {
      if (A.isMounted) {
        let J, { next: X, bu: st, u: tt, parent: ht, vnode: rt } = A;
        {
          let Se = function Oa(tn) {
            let Ls = tn.subTree.component;
            if (Ls) return Ls.asyncDep && !Ls.asyncResolved ? Ls : Oa(Ls);
          }(A);
          if (Se) {
            X && (X.el = rt.el, T(A, X, G)), Se.asyncDep.then(() => {
              qt(() => {
                A.isUnmounted || H();
              }, $);
            });
            return;
          }
        }
        let kt = X;
        sn(A, !1), X ? (X.el = rt.el, T(A, X, G)) : X = rt, st && Qn(st), (J = X.props && X.props.onVnodeBeforeUpdate) && Ce(J, ht, X, rt), sn(A, !0);
        let Nt = go(A), Wt = A.subTree;
        A.subTree = Nt, _(Wt, Nt, d(Wt.el), Y(Wt), A, $, B), X.el = Nt.el, kt === null && Mr(A, Nt.el), tt && qt(tt, $), (J = X.props && X.props.onVnodeUpdated) && qt(() => Ce(J, ht, X, rt), $);
      } else {
        let J, { el: X, props: st } = R, { bm: tt, m: ht, parent: rt, root: kt, type: Nt } = A, Wt = ws(R);
        if (sn(A, !1), tt && Qn(tt), !Wt && (J = st && st.onVnodeBeforeMount) && Ce(J, rt, R), sn(A, !0), X && i) {
          let Se = () => {
            A.subTree = go(A), i(X, A.subTree, A, $, null);
          };
          Wt && Nt.__asyncHydrate ? Nt.__asyncHydrate(X, A, Se) : Se();
        } else {
          kt.ce && kt.ce._hasShadowRoot() && kt.ce._injectChildStyle(Nt, A.parent ? A.parent.type : void 0);
          let Se = A.subTree = go(A);
          _(null, Se, I, z, A, $, B), R.el = Se.el;
        }
        if (ht && qt(ht, $), !Wt && (J = st && st.onVnodeMounted)) {
          let Se = R;
          qt(() => Ce(J, rt, Se), $);
        }
        (256 & R.shapeFlag || rt && ws(rt.vnode) && 256 & rt.vnode.shapeFlag) && A.a && qt(A.a, $), A.isMounted = !0, R = I = z = null;
      }
    });
    A.scope.off();
    let H = A.update = j.run.bind(j), W = A.job = j.runIfDirty.bind(j);
    W.i = A, W.id = A.uid, j.scheduler = () => bc(W), sn(A, !0), H();
  }, T = (A, R, I) => {
    R.component = A;
    let z = A.vnode.props;
    A.vnode = R, A.next = null, function($, B, G, j) {
      let { props: H, attrs: W, vnode: { patchFlag: J } } = $, X = xt(H), [st] = $.propsOptions, tt = !1;
      if ((j || J > 0) && !(16 & J)) {
        if (8 & J) {
          let ht = $.vnode.dynamicProps;
          for (let rt = 0; rt < ht.length; rt++) {
            let kt = ht[rt];
            if (Io($.emitsOptions, kt)) continue;
            let Nt = B[kt];
            if (st) if (wt(W, kt)) Nt !== W[kt] && (W[kt] = Nt, tt = !0);
            else {
              let Wt = Tt(kt);
              H[Wt] = Al(st, X, Wt, Nt, $, !1);
            }
            else Nt !== W[kt] && (W[kt] = Nt, tt = !0);
          }
        }
      } else {
        let ht;
        for (let rt in np($, B, H, W) && (tt = !0), X) B && (wt(B, rt) || (ht = Me(rt)) !== rt && wt(B, ht)) || (st ? G && (G[rt] !== void 0 || G[ht] !== void 0) && (H[rt] = Al(st, X, rt, void 0, $, !0)) : delete H[rt]);
        if (W !== X) for (let rt in W) B && wt(B, rt) || (delete W[rt], tt = !0);
      }
      tt && gs($.attrs, "set", "");
    }(A, R.props, z, I), (($, B, G) => {
      let { vnode: j, slots: H } = $, W = !0, J = yt;
      if (32 & j.shapeFlag) {
        let X = B._;
        X ? G && X === 1 ? W = !1 : op(H, B, G) : (W = !B.$stable, ip(B, H)), J = B;
      } else B && (ap($, B), J = { default: 1 });
      if (W) for (let X in H) Pc(X) || J[X] != null || delete H[X];
    })(A, R.children, I), Ms(), _h(A), As();
  }, O = (A, R, I, z, $, B, G, j, H = !1) => {
    let W = A && A.children, J = A ? A.shapeFlag : 0, X = R.children, { patchFlag: st, shapeFlag: tt } = R;
    if (st > 0) {
      if (128 & st) return void K(W, X, I, z, $, B, G, j, H);
      if (256 & st) return void V(W, X, I, z, $, B, G, j, H);
    }
    8 & tt ? (16 & J && _t(W, $, B), X !== W && f(I, X)) : 16 & J ? 16 & tt ? K(W, X, I, z, $, B, G, j, H) : _t(W, $, B, !0) : (8 & J && f(I, ""), 16 & tt && k(X, I, z, $, B, G, j, H));
  }, V = (A, R, I, z, $, B, G, j, H) => {
    let W;
    A = A || Xn, R = R || Xn;
    let J = A.length, X = R.length, st = Math.min(J, X);
    for (W = 0; W < st; W++) {
      let tt = R[W] = H ? fs(R[W]) : ke(R[W]);
      _(A[W], tt, I, null, $, B, G, j, H);
    }
    J > X ? _t(A, $, B, !0, !1, st) : k(R, I, z, $, B, G, j, H, st);
  }, K = (A, R, I, z, $, B, G, j, H) => {
    let W = 0, J = R.length, X = A.length - 1, st = J - 1;
    for (; W <= X && W <= st; ) {
      let tt = A[W], ht = R[W] = H ? fs(R[W]) : ke(R[W]);
      if (He(tt, ht)) _(tt, ht, I, null, $, B, G, j, H);
      else break;
      W++;
    }
    for (; W <= X && W <= st; ) {
      let tt = A[X], ht = R[st] = H ? fs(R[st]) : ke(R[st]);
      if (He(tt, ht)) _(tt, ht, I, null, $, B, G, j, H);
      else break;
      X--, st--;
    }
    if (W > X) {
      if (W <= st) {
        let tt = st + 1, ht = tt < J ? R[tt].el : z;
        for (; W <= st; ) _(null, R[W] = H ? fs(R[W]) : ke(R[W]), I, ht, $, B, G, j, H), W++;
      }
    } else if (W > st) for (; W <= X; ) et(A[W], $, B, !0), W++;
    else {
      let tt, ht = W, rt = W, kt = /* @__PURE__ */ new Map();
      for (W = rt; W <= st; W++) {
        let Vt = R[W] = H ? fs(R[W]) : ke(R[W]);
        Vt.key != null && kt.set(Vt.key, W);
      }
      let Nt = 0, Wt = st - rt + 1, Se = !1, Oa = 0, tn = Array(Wt);
      for (W = 0; W < Wt; W++) tn[W] = 0;
      for (W = ht; W <= X; W++) {
        let Vt, Qt = A[W];
        if (Nt >= Wt) {
          et(Qt, $, B, !0);
          continue;
        }
        if (Qt.key != null) Vt = kt.get(Qt.key);
        else for (tt = rt; tt <= st; tt++) if (tn[tt - rt] === 0 && He(Qt, R[tt])) {
          Vt = tt;
          break;
        }
        Vt === void 0 ? et(Qt, $, B, !0) : (tn[Vt - rt] = W + 1, Vt >= Oa ? Oa = Vt : Se = !0, _(Qt, R[Vt], I, null, $, B, G, j, H), Nt++);
      }
      let Ls = Se ? function(Vt) {
        let Qt, yi, ye, Ye, en, Nn = Vt.slice(), Ie = [0], Dm = Vt.length;
        for (Qt = 0; Qt < Dm; Qt++) {
          let Fa = Vt[Qt];
          if (Fa !== 0) {
            if (Vt[yi = Ie[Ie.length - 1]] < Fa) {
              Nn[Qt] = yi, Ie.push(Qt);
              continue;
            }
            for (ye = 0, Ye = Ie.length - 1; ye < Ye; ) Vt[Ie[en = ye + Ye >> 1]] < Fa ? ye = en + 1 : Ye = en;
            Fa < Vt[Ie[ye]] && (ye > 0 && (Nn[Qt] = Ie[ye - 1]), Ie[ye] = Qt);
          }
        }
        for (ye = Ie.length, Ye = Ie[ye - 1]; ye-- > 0; ) Ie[ye] = Ye, Ye = Nn[Ye];
        return Ie;
      }(tn) : Xn;
      for (tt = Ls.length - 1, W = Wt - 1; W >= 0; W--) {
        let Vt = rt + W, Qt = R[Vt], yi = R[Vt + 1], ye = Vt + 1 < J ? yi.el || function Ye(en) {
          if (en.placeholder) return en.placeholder;
          let Nn = en.component;
          return Nn ? Ye(Nn.subTree) : null;
        }(yi) : z;
        tn[W] === 0 ? _(null, Qt, I, ye, $, B, G, j, H) : Se && (tt < 0 || W !== Ls[tt] ? Z(Qt, I, ye, 2) : tt--);
      }
    }
  }, Z = (A, R, I, z, $ = null) => {
    let { el: B, type: G, transition: j, children: H, shapeFlag: W } = A;
    if (6 & W) return void Z(A.component.subTree, R, I, z);
    if (128 & W) return void A.suspense.move(R, I, z);
    if (64 & W) return void G.move(A, R, I, at);
    if (G === ee) {
      a(B, R, I);
      for (let J = 0; J < H.length; J++) Z(H[J], R, I, z);
      a(A.anchor, R, I);
      return;
    }
    if (G === xn) return void (({ el: J, anchor: X }, st, tt) => {
      let ht;
      for (; J && J !== X; ) ht = p(J), a(J, st, tt), J = ht;
      a(X, st, tt);
    })(A, R, I);
    if (z !== 2 && 1 & W && j) if (z === 0) j.beforeEnter(B), a(B, R, I), qt(() => j.enter(B), $);
    else {
      let { leave: J, delayLeave: X, afterLeave: st } = j, tt = () => {
        A.ctx.isUnmounted ? o(B) : a(B, R, I);
      }, ht = () => {
        B._isLeaving && B[es](!0), J(B, () => {
          tt(), st && st();
        });
      };
      X ? X(B, tt, ht) : ht();
    }
    else a(B, R, I);
  }, et = (A, R, I, z = !1, $ = !1) => {
    let B, { type: G, props: j, ref: H, children: W, dynamicChildren: J, shapeFlag: X, patchFlag: st, dirs: tt, cacheIndex: ht, memo: rt } = A;
    if (st === -2 && ($ = !1), H != null && (Ms(), ii(H, null, I, A, !0), As()), ht != null && (R.renderCache[ht] = void 0), 256 & X) return void R.ctx.deactivate(A);
    let kt = 1 & X && tt, Nt = !ws(A);
    if (Nt && (B = j && j.onVnodeBeforeUnmount) && Ce(B, R, A), 6 & X) pt(A.component, I, z);
    else {
      if (128 & X) return void A.suspense.unmount(I, z);
      kt && ts(A, null, R, "beforeUnmount"), 64 & X ? A.type.remove(A, R, I, at, z) : J && !J.hasOnce && (G !== ee || st > 0 && 64 & st) ? _t(J, R, I, !1, !0) : (G === ee && 384 & st || !$ && 16 & X) && _t(W, R, I), z && ft(A);
    }
    let Wt = rt != null && ht == null;
    (Nt && (B = j && j.onVnodeUnmounted) || kt || Wt) && qt(() => {
      B && Ce(B, R, A), kt && ts(A, null, R, "unmounted"), Wt && (A.el = null);
    }, I);
  }, ft = (A) => {
    let { type: R, el: I, anchor: z, transition: $ } = A;
    if (R === ee) return void lt(I, z);
    if (R === xn) return void (({ el: G, anchor: j }) => {
      let H;
      for (; G && G !== j; ) H = p(G), o(G), G = H;
      o(j);
    })(A);
    let B = () => {
      o(I), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (1 & A.shapeFlag && $ && !$.persisted) {
      let { leave: G, delayLeave: j } = $, H = () => G(I, B);
      j ? j(A.el, B, H) : H();
    } else B();
  }, lt = (A, R) => {
    let I;
    for (; A !== R; ) I = p(A), o(A), A = I;
    o(R);
  }, pt = (A, R, I) => {
    let { bum: z, scope: $, job: B, subTree: G, um: j, m: H, a: W } = A;
    No(H), No(W), z && Qn(z), $.stop(), B && (B.flags |= 8, et(G, A, R, I)), j && qt(j, R), qt(() => {
      A.isUnmounted = !0;
    }, R);
  }, _t = (A, R, I, z = !1, $ = !1, B = 0) => {
    for (let G = B; G < A.length; G++) et(A[G], R, I, z, $);
  }, Y = (A) => {
    if (6 & A.shapeFlag) return Y(A.component.subTree);
    if (128 & A.shapeFlag) return A.suspense.next();
    let R = p(A.anchor || A.el), I = R && R[Bd];
    return I ? p(I) : R;
  }, q = !1, U = (A, R, I) => {
    let z;
    A == null ? R._vnode && (et(R._vnode, null, null, !0), z = R._vnode.component) : _(R._vnode || null, A, R, null, null, null, I), R._vnode = A, q || (q = !0, _h(z), Lo(), q = !1);
  }, at = { p: _, um: et, m: Z, r: ft, mt: L, mc: k, pc: O, pbc: F, n: Y, o: t };
  return e && ([n, i] = e(at)), { render: U, hydrate: n, createApp: (s = n, function(A, R = null) {
    ot(A) || (A = gt({}, A)), R == null || St(R) || (R = null);
    let I = Qd(), z = /* @__PURE__ */ new WeakSet(), $ = [], B = !1, G = I.app = { _uid: pb++, _component: A, _props: R, _container: null, _context: I, _instance: null, version: Mp, get config() {
      return I.config;
    }, set config(j) {
    }, use: (j, ...H) => (z.has(j) || (j && ot(j.install) ? (z.add(j), j.install(G, ...H)) : ot(j) && (z.add(j), j(G, ...H))), G), mixin: (j) => (I.mixins.includes(j) || I.mixins.push(j), G), component: (j, H) => H ? (I.components[j] = H, G) : I.components[j], directive: (j, H) => H ? (I.directives[j] = H, G) : I.directives[j], mount(j, H, W) {
      if (!B) {
        let J = G._ceVNode || Et(A, R);
        return J.appContext = I, W === !0 ? W = "svg" : W === !1 && (W = void 0), H && s ? s(J, j) : U(J, j, W), B = !0, G._container = j, j.__vue_app__ = G, Pa(J.component);
      }
    }, onUnmount(j) {
      $.push(j);
    }, unmount() {
      B && (Ve($, G._instance, 16), U(null, G._container), delete G._container.__vue_app__);
    }, provide: (j, H) => (I.provides[j] = H, G), runWithContext(j) {
      let H = _n;
      _n = G;
      try {
        return j();
      } finally {
        _n = H;
      }
    } };
    return G;
  }) };
}
function qr({ type: t, props: e }, s) {
  return s === "svg" && t === "foreignObject" || s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : s;
}
function sn({ effect: t, job: e }, s) {
  s ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function cp(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Rc(t, e, s = !1) {
  let n = t.children, i = e.children;
  if (nt(n) && nt(i)) for (let a = 0; a < n.length; a++) {
    let o = n[a], r = i[a];
    1 & r.shapeFlag && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && ((r = i[a] = fs(i[a])).el = o.el), s || r.patchFlag === -2 || Rc(o, r)), r.type === Gs && (r.patchFlag === -1 && (r = i[a] = fs(r)), r.el = o.el), r.type !== Gt || r.el || (r.el = o.el);
  }
}
function No(t) {
  if (t) for (let e = 0; e < t.length; e++) t[e].flags |= 8;
}
let Bo = (t) => t.__isSuspense, Pl = 0, Sb = { name: "Suspense", __isSuspense: !0, process(t, e, s, n, i, a, o, r, l, c) {
  if (t == null) (function(h, u, f, d, p, g, m, _, y) {
    let { p: b, o: { createElement: v } } = y, w = v("div"), S = h.suspense = Oh(h, p, d, u, w, f, g, m, _, y);
    b(null, S.pendingBranch = h.ssContent, w, null, d, S, g, m), S.deps > 0 ? (Gi(h, "onPending"), Gi(h, "onFallback"), b(null, h.ssFallback, u, f, d, null, g, m), Kn(S, h.ssFallback)) : S.resolve(!1, !0);
  })(e, s, n, i, a, o, r, l, c);
  else {
    if (a && a.deps > 0 && !t.suspense.isInFallback) {
      e.suspense = t.suspense, e.suspense.vnode = e, e.el = t.el;
      return;
    }
    (function(h, u, f, d, p, g, m, _, { p: y, um: b, o: { createElement: v } }) {
      let w = u.suspense = h.suspense;
      w.vnode = u, u.el = h.el;
      let S = u.ssContent, x = u.ssFallback, { activeBranch: k, pendingBranch: P, isInFallback: F, isHydrating: E } = w;
      if (P) w.pendingBranch = S, He(P, S) ? (y(P, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0 ? w.resolve() : F && !E && (y(k, x, f, d, p, null, g, m, _), Kn(w, x))) : (w.pendingId = Pl++, E ? (w.isHydrating = !1, w.activeBranch = P) : b(P, p, w), w.deps = 0, w.effects.length = 0, w.hiddenContainer = v("div"), F ? (y(null, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0 ? w.resolve() : (y(k, x, f, d, p, null, g, m, _), Kn(w, x))) : k && He(k, S) ? (y(k, S, f, d, p, w, g, m, _), w.resolve(!0)) : (y(null, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0 && w.resolve()));
      else if (k && He(k, S)) y(k, S, f, d, p, w, g, m, _), Kn(w, S);
      else if (Gi(u, "onPending"), w.pendingBranch = S, 512 & S.shapeFlag ? w.pendingId = S.component.suspenseId : w.pendingId = Pl++, y(null, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0) w.resolve();
      else {
        let { timeout: C, pendingId: N } = w;
        C > 0 ? setTimeout(() => {
          w.pendingId === N && w.fallback(x);
        }, C) : C === 0 && w.fallback(x);
      }
    })(t, e, s, n, i, o, r, l, c);
  }
}, hydrate: function(t, e, s, n, i, a, o, r, l) {
  let c = e.suspense = Oh(e, n, s, t.parentNode, document.createElement("div"), null, i, a, o, r, !0), h = l(t, c.pendingBranch = e.ssContent, s, c, a, o);
  return c.deps === 0 && c.resolve(!1, !0), h;
}, normalize: function(t) {
  let { shapeFlag: e, children: s } = t, n = 32 & e;
  t.ssContent = Fh(n ? s.default : s), t.ssFallback = n ? Fh(s.fallback) : Et(Gt);
} };
function Gi(t, e) {
  let s = t.props && t.props[e];
  ot(s) && s();
}
function Oh(t, e, s, n, i, a, o, r, l, c, h = !1) {
  var u;
  let f, d, { p, m: g, um: m, n: _, o: { parentNode: y, remove: b } } = c, v = (f = (u = t).props && u.props.suspensible) != null && f !== !1;
  v && e && e.pendingBranch && (d = e.pendingId, e.deps++);
  let w = t.props ? ti(t.props.timeout) : void 0, S = a, x = { vnode: t, parent: e, parentComponent: s, namespace: o, container: n, hiddenContainer: i, deps: 0, pendingId: Pl++, timeout: typeof w == "number" ? w : -1, activeBranch: null, isFallbackMountPending: !1, pendingBranch: null, isInFallback: !h, isHydrating: h, isUnmounted: !1, effects: [], resolve(k = !1, P = !1) {
    let { vnode: F, activeBranch: E, pendingBranch: C, pendingId: N, effects: L, parentComponent: D, container: M, isInFallback: T } = x, O = !1;
    x.isHydrating ? x.isHydrating = !1 : !k && ((O = E && C.transition && C.transition.mode === "out-in") && (E.transition.afterLeave = () => {
      N === x.pendingId && (g(C, M, a === S ? _(E) : a, 0), na(L), T && F.ssFallback && (F.ssFallback.el = null));
    }), E && !x.isFallbackMountPending && (y(E.el) === M && (a = _(E)), m(E, D, x, !0), !O && T && F.ssFallback && qt(() => F.ssFallback.el = null, x)), O || g(C, M, a, 0)), x.isFallbackMountPending = !1, Kn(x, C), x.pendingBranch = null, x.isInFallback = !1;
    let V = x.parent, K = !1;
    for (; V; ) {
      if (V.pendingBranch) {
        V.effects.push(...L), K = !0;
        break;
      }
      V = V.parent;
    }
    K || O || na(L), x.effects = [], v && e && e.pendingBranch && d === e.pendingId && (e.deps--, e.deps !== 0 || P || e.resolve()), Gi(F, "onResolve");
  }, fallback(k) {
    if (!x.pendingBranch) return;
    let { vnode: P, activeBranch: F, parentComponent: E, container: C, namespace: N } = x;
    Gi(P, "onFallback");
    let L = _(F), D = () => {
      x.isFallbackMountPending = !1, x.isInFallback && (p(null, k, C, L, E, null, N, r, l), Kn(x, k));
    }, M = k.transition && k.transition.mode === "out-in";
    M && (x.isFallbackMountPending = !0, F.transition.afterLeave = D), x.isInFallback = !0, m(F, E, null, !0), M || D();
  }, move(k, P, F) {
    x.activeBranch && g(x.activeBranch, k, P, F), x.container = k;
  }, next: () => x.activeBranch && _(x.activeBranch), registerDep(k, P, F) {
    let E = !!x.pendingBranch;
    E && x.deps++;
    let C = k.vnode.el;
    k.asyncDep.catch((N) => {
      En(N, k, 0);
    }).then((N) => {
      if (k.isUnmounted || x.isUnmounted || x.pendingId !== k.suspenseId) return;
      la(), k.asyncResolved = !0;
      let { vnode: L } = k;
      Tl(k, N, !1), C && (L.el = C);
      let D = !C && k.subTree.el;
      P(k, L, y(C || k.subTree.el), C ? null : _(k.subTree), x, o, F), D && (L.placeholder = null, b(D)), Mr(k, L.el), E && --x.deps == 0 && x.resolve();
    });
  }, unmount(k, P) {
    x.isUnmounted = !0, x.activeBranch && m(x.activeBranch, s, k, P), x.pendingBranch && m(x.pendingBranch, s, k, P);
  } };
  return x;
}
function Fh(t) {
  let e;
  if (ot(t)) {
    let s = kn && t._c;
    s && (t._d = !1, oa()), t = t(), s && (t._d = !0, e = de, up());
  }
  return nt(t) && (t = function(s) {
    let n;
    for (let i = 0; i < s.length; i++) {
      let a = s[i];
      if (!Ts(a)) return;
      if (a.type !== Gt || a.children === "v-if") {
        if (n) return;
        n = a;
      }
    }
    return n;
  }(t)), t = ke(t), e && !t.dynamicChildren && (t.dynamicChildren = e.filter((s) => s !== t)), t;
}
function hp(t, e) {
  e && e.pendingBranch ? nt(t) ? e.effects.push(...t) : e.effects.push(t) : na(t);
}
function Kn(t, e) {
  t.activeBranch = e;
  let { vnode: s, parentComponent: n } = t, i = e.el;
  for (; !i && e.component; ) i = (e = e.component.subTree).el;
  s.el = i, n && n.subTree === s && (n.vnode.el = i, Mr(n, i));
}
let ee = Symbol.for("v-fgt"), Gs = Symbol.for("v-txt"), Gt = Symbol.for("v-cmt"), xn = Symbol.for("v-stc"), Ui = [], de = null;
function oa(t = !1) {
  Ui.push(de = t ? null : []);
}
function up() {
  Ui.pop(), de = Ui[Ui.length - 1] || null;
}
let kn = 1;
function ra(t, e = !1) {
  kn += t, t < 0 && de && e && (de.hasOnce = !0);
}
function fp(t) {
  return t.dynamicChildren = kn > 0 ? de || Xn : null, up(), kn > 0 && de && de.push(t), t;
}
function wb(t, e, s, n, i, a) {
  return fp(Lc(t, e, s, n, i, a, !0));
}
function $o(t, e, s, n, i) {
  return fp(Et(t, e, s, n, i, !0));
}
function Ts(t) {
  return !!t && t.__v_isVNode === !0;
}
function He(t, e) {
  return t.type === e.type && t.key === e.key;
}
function Cb(t) {
}
let dp = ({ key: t }) => t ?? null, mo = ({ ref: t, ref_key: e, ref_for: s }) => (typeof t == "number" && (t = "" + t), t != null ? ct(t) || Yt(t) || ot(t) ? { i: oe, r: t, k: e, f: !!s } : t : null);
function Lc(t, e = null, s = null, n = 0, i = null, a = +(t !== ee), o = !1, r = !1) {
  let l = { __v_isVNode: !0, __v_skip: !0, type: t, props: e, key: e && dp(e), ref: e && mo(e), scopeId: vr, slotScopeIds: null, children: s, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: a, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: oe };
  return r ? (Fc(l, s), 128 & a && t.normalize(l)) : s && (l.shapeFlag |= ct(s) ? 8 : 16), kn > 0 && !o && de && (l.patchFlag > 0 || 6 & a) && l.patchFlag !== 32 && de.push(l), l;
}
let Et = function(t, e = null, s = null, n = 0, i = null, a = !1) {
  var o;
  if (t && t !== Xd || (t = Gt), Ts(t)) {
    let l = as(t, e, !0);
    return s && Fc(l, s), kn > 0 && !a && de && (6 & l.shapeFlag ? de[de.indexOf(t)] = l : de.push(l)), l.patchFlag = -2, l;
  }
  if (ot(o = t) && "__vccOpts" in o && (t = t.__vccOpts), e) {
    let { class: l, style: c } = e = pp(e);
    l && !ct(l) && (e.class = Sa(l)), St(c) && (wa(c) && !nt(c) && (c = gt({}, c)), e.style = va(c));
  }
  let r = ct(t) ? 1 : Bo(t) ? 128 : t.__isTeleport ? 64 : St(t) ? 4 : 2 * !!ot(t);
  return Lc(t, e, s, n, i, r, a, !0);
};
function pp(t) {
  return t ? wa(t) || sp(t) ? gt({}, t) : t : null;
}
function as(t, e, s = !1, n = !1) {
  let { props: i, ref: a, patchFlag: o, children: r, transition: l } = t, c = e ? mp(i || {}, e) : i, h = { __v_isVNode: !0, __v_skip: !0, type: t.type, props: c, key: c && dp(c), ref: e && e.ref ? s && a ? nt(a) ? a.concat(mo(e)) : [a, mo(e)] : mo(e) : a, scopeId: t.scopeId, slotScopeIds: t.slotScopeIds, children: r, target: t.target, targetStart: t.targetStart, targetAnchor: t.targetAnchor, staticCount: t.staticCount, shapeFlag: t.shapeFlag, patchFlag: e && t.type !== ee ? o === -1 ? 16 : 16 | o : o, dynamicProps: t.dynamicProps, dynamicChildren: t.dynamicChildren, appContext: t.appContext, dirs: t.dirs, transition: l, component: t.component, suspense: t.suspense, ssContent: t.ssContent && as(t.ssContent), ssFallback: t.ssFallback && as(t.ssFallback), placeholder: t.placeholder, el: t.el, anchor: t.anchor, ctx: t.ctx, ce: t.ce };
  return l && n && Ps(h, l.clone(h)), h;
}
function Oc(t = " ", e = 0) {
  return Et(Gs, null, t, e);
}
function kb(t, e) {
  let s = Et(xn, null, t);
  return s.staticCount = e, s;
}
function gp(t = "", e = !1) {
  return e ? (oa(), $o(Gt, null, t)) : Et(Gt, null, t);
}
function ke(t) {
  return t == null || typeof t == "boolean" ? Et(Gt) : nt(t) ? Et(ee, null, t.slice()) : Ts(t) ? fs(t) : Et(Gs, null, String(t));
}
function fs(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : as(t);
}
function Fc(t, e) {
  let s = 0, { shapeFlag: n } = t;
  if (e == null) e = null;
  else if (nt(e)) s = 16;
  else if (typeof e == "object") if (65 & n) {
    let i = e.default;
    i && (i._c && (i._d = !1), Fc(t, i()), i._c && (i._d = !0));
    return;
  } else {
    s = 32;
    let i = e._;
    i || sp(e) ? i === 3 && oe && (oe.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024)) : e._ctx = oe;
  }
  else ot(e) ? (e = { default: e, _ctx: oe }, s = 32) : (e = String(e), 64 & n ? (s = 16, e = [Oc(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function mp(...t) {
  let e = {};
  for (let s = 0; s < t.length; s++) {
    let n = t[s];
    for (let i in n) if (i === "class") e.class !== n.class && (e.class = Sa([e.class, n.class]));
    else if (i === "style") e.style = va([e.style, n.style]);
    else if (On(i)) {
      let a = e[i], o = n[i];
      o && a !== o && !(nt(a) && a.includes(o)) ? e[i] = a ? [].concat(a, o) : o : o != null || a != null || cr(i) || (e[i] = o);
    } else i !== "" && (e[i] = n[i]);
  }
  return e;
}
function Ce(t, e, s, n = null) {
  Ve(t, e, 7, [s, n]);
}
let Mb = Qd(), Ab = 0;
function yp(t, e, s) {
  let n = t.type, i = (e ? e.appContext : t.appContext) || Mb, a = { uid: Ab++, vnode: t, type: n, parent: e, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new pc(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: e ? e.provides : Object.create(i.provides), ids: e ? e.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: function o(r, l, c = !1) {
    let h = c ? xb : l.propsCache, u = h.get(r);
    if (u) return u;
    let f = r.props, d = {}, p = [], g = !1;
    if (!ot(r)) {
      let _ = (y) => {
        g = !0;
        let [b, v] = o(y, l, !0);
        gt(d, b), v && p.push(...v);
      };
      !c && l.mixins.length && l.mixins.forEach(_), r.extends && _(r.extends), r.mixins && r.mixins.forEach(_);
    }
    if (!f && !g) return St(r) && h.set(r, Xn), Xn;
    if (nt(f)) for (let _ = 0; _ < f.length; _++) {
      let y = Tt(f[_]);
      Lh(y) && (d[y] = yt);
    }
    else if (f) for (let _ in f) {
      let y = Tt(_);
      if (Lh(y)) {
        let b = f[_], v = d[y] = nt(b) || ot(b) ? { type: b } : gt({}, b), w = v.type, S = !1, x = !0;
        if (nt(w)) for (let k = 0; k < w.length; ++k) {
          let P = w[k], F = ot(P) && P.name;
          if (F === "Boolean") {
            S = !0;
            break;
          }
          F === "String" && (x = !1);
        }
        else S = ot(w) && w.name === "Boolean";
        v[0] = S, v[1] = x, (S || wt(v, "default")) && p.push(y);
      }
    }
    let m = [d, p];
    return St(r) && h.set(r, m), m;
  }(n, i), emitsOptions: function o(r, l, c = !1) {
    let h = c ? yb : l.emitsCache, u = h.get(r);
    if (u !== void 0) return u;
    let f = r.emits, d = {}, p = !1;
    if (!ot(r)) {
      let g = (m) => {
        let _ = o(m, l, !0);
        _ && (p = !0, gt(d, _));
      };
      !c && l.mixins.length && l.mixins.forEach(g), r.extends && g(r.extends), r.mixins && r.mixins.forEach(g);
    }
    return f || p ? (nt(f) ? f.forEach((g) => d[g] = null) : gt(d, f), St(r) && h.set(r, d), d) : (St(r) && h.set(r, null), null);
  }(n, i), emit: null, emitted: null, propsDefaults: yt, inheritAttrs: n.inheritAttrs, ctx: yt, data: yt, props: yt, attrs: yt, slots: yt, refs: yt, setupState: yt, setupContext: null, suspense: s, suspenseId: s ? s.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return a.ctx = { _: a }, a.root = e ? e.root : a, a.emit = mb.bind(null, a), t.ce && t.ce(a), a;
}
let ae = null, ve = () => ae || oe;
{
  let t = dr(), e = (s, n) => {
    let i;
    return (i = t[s]) || (i = t[s] = []), i.push(n), (a) => {
      i.length > 1 ? i.forEach((o) => o(a)) : i[0](a);
    };
  };
  Ao = e("__VUE_INSTANCE_SETTERS__", (s) => ae = s), Jn = e("__VUE_SSR_SETTERS__", (s) => Mn = s);
}
let mi = (t) => {
  let e = ae;
  return Ao(t), t.scope.on(), () => {
    t.scope.off(), Ao(e);
  };
}, la = () => {
  ae && ae.scope.off(), Ao(null);
};
function bp(t) {
  return 4 & t.vnode.shapeFlag;
}
let Mn = !1;
function _p(t, e = !1, s = !1) {
  e && Jn(e);
  let { props: n, children: i } = t.vnode, a = bp(t);
  (function(c, h, u, f = !1) {
    let d = {}, p = Object.create(Ml);
    for (let g in c.propsDefaults = /* @__PURE__ */ Object.create(null), np(c, h, d, p), c.propsOptions[0]) g in d || (d[g] = void 0);
    u ? c.props = f ? d : Cd(d) : c.type.props ? c.props = d : c.props = p, c.attrs = p;
  })(t, n, a, e);
  var o = s || e;
  let r = t.slots = Object.create(Ml);
  if (32 & t.vnode.shapeFlag) {
    let c = i._;
    c ? (op(r, i, o), o && ad(r, "_", c, !0)) : ip(i, r);
  } else i && ap(t, i);
  let l = a ? function(c, h) {
    let u = c.type;
    c.accessCache = /* @__PURE__ */ Object.create(null), c.proxy = new Proxy(c.ctx, Sl);
    let { setup: f } = u;
    if (f) {
      Ms();
      let d = c.setupContext = f.length > 1 ? Sp(c) : null, p = mi(c), g = gi(f, c, 0, [c.props, d]), m = dc(g);
      if (As(), p(), (m || c.sp) && !ws(c) && wc(c), m) {
        if (g.then(la, la), h) return g.then((_) => {
          Tl(c, _, h);
        }).catch((_) => {
          En(_, c, 0);
        });
        c.asyncDep = g;
      } else Tl(c, g, h);
    } else vp(c, h);
  }(t, e) : void 0;
  return e && Jn(!1), l;
}
function Tl(t, e, s) {
  ot(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : St(e) && (t.setupState = yc(e)), vp(t, s);
}
function xp(t) {
  Po = t, yl = (e) => {
    e.render._rc && (e.withProxy = new Proxy(e.ctx, Qy));
  };
}
let Pb = () => !Po;
function vp(t, e, s) {
  let n = t.type;
  if (!t.render) {
    if (!e && Po && !n.render) {
      let i = n.template || Cl(t).template;
      if (i) {
        let { isCustomElement: a, compilerOptions: o } = t.appContext.config, { delimiters: r, compilerOptions: l } = n, c = gt(gt({ isCustomElement: a, delimiters: r }, o), l);
        n.render = Po(i, c);
      }
    }
    t.render = n.render || ie, yl && yl(t);
  }
  {
    let i = mi(t);
    Ms();
    try {
      (function(a) {
        let o = Cl(a), r = a.proxy, l = a.ctx;
        wl = !1, o.beforeCreate && Ph(o.beforeCreate, a, "bc");
        let { data: c, computed: h, methods: u, watch: f, provide: d, inject: p, created: g, beforeMount: m, mounted: _, beforeUpdate: y, updated: b, activated: v, deactivated: w, beforeUnmount: S, unmounted: x, render: k, renderTracked: P, renderTriggered: F, errorCaptured: E, serverPrefetch: C, expose: N, inheritAttrs: L, components: D, directives: M } = o;
        if (p && function(O, V) {
          for (let K in nt(O) && (O = kl(O)), O) {
            let Z, et = O[K];
            Yt(Z = St(et) ? "default" in et ? Hi(et.from || K, et.default, !0) : Hi(et.from || K) : Hi(et)) ? Object.defineProperty(V, K, { enumerable: !0, configurable: !0, get: () => Z.value, set: (ft) => Z.value = ft }) : V[K] = Z;
          }
        }(p, l), u) for (let O in u) {
          let V = u[O];
          ot(V) && (l[O] = V.bind(r));
        }
        if (c) {
          let O = c.call(r, r);
          St(O) && (a.data = _r(O));
        }
        if (wl = !0, h) for (let O in h) {
          let V = h[O], K = ot(V) ? V.bind(r, r) : ot(V.get) ? V.get.bind(r, r) : ie, Z = wp({ get: K, set: !ot(V) && ot(V.set) ? V.set.bind(r) : ie });
          Object.defineProperty(l, O, { enumerable: !0, configurable: !0, get: () => Z.value, set: (et) => Z.value = et });
        }
        if (f) for (let O in f) (function V(K, Z, et, ft) {
          let lt = ft.includes(".") ? Nd(et, ft) : () => et[ft];
          if (ct(K)) {
            let pt = Z[K];
            ot(pt) && ni(lt, pt);
          } else if (ot(K)) ni(lt, K.bind(et));
          else if (St(K)) if (nt(K)) K.forEach((pt) => V(pt, Z, et, ft));
          else {
            let pt = ot(K.handler) ? K.handler.bind(et) : Z[K.handler];
            ot(pt) && ni(lt, pt, K);
          }
        })(f[O], l, r, O);
        if (d) {
          let O = ot(d) ? d.call(r) : d;
          Reflect.ownKeys(O).forEach((V) => {
            Od(V, O[V]);
          });
        }
        function T(O, V) {
          nt(V) ? V.forEach((K) => O(K.bind(r))) : V && O(V.bind(r));
        }
        if (g && Ph(g, a, "c"), T(Ud, m), T(Aa, _), T(Cc, y), T(wr, b), T(Hd, v), T(zd, w), T(Jd, E), T(Yd, P), T(Kd, F), T(Cr, S), T(kr, x), T(qd, C), nt(N)) if (N.length) {
          let O = a.exposed || (a.exposed = {});
          N.forEach((V) => {
            Object.defineProperty(O, V, { get: () => r[V], set: (K) => r[V] = K, enumerable: !0 });
          });
        } else a.exposed || (a.exposed = {});
        k && a.render === ie && (a.render = k), L != null && (a.inheritAttrs = L), D && (a.components = D), M && (a.directives = M), C && wc(a);
      })(t);
    } finally {
      As(), i();
    }
  }
}
let Tb = { get: (t, e) => (ue(t, "get", ""), t[e]) };
function Sp(t) {
  return { attrs: new Proxy(t.attrs, Tb), slots: t.slots, emit: t.emit, expose: (e) => {
    t.exposed = e || {};
  } };
}
function Pa(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(yc(kd(t.exposed)), { get: (e, s) => s in e ? e[s] : s in zi ? zi[s](t) : void 0, has: (e, s) => s in e || s in zi })) : t.proxy;
}
function Dl(t, e = !0) {
  return ot(t) ? t.displayName || t.name : t.name || e && t.__name;
}
let wp = (t, e) => function(s, n = !1) {
  let i, a;
  return ot(s) ? i = s : (i = s.get, a = s.set), new _y(i, a, n);
}(t, Mn);
function Cp(t, e, s) {
  try {
    ra(-1);
    let n = arguments.length;
    return n !== 2 ? (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Ts(s) && (s = [s]), Et(t, e, s)) : !St(e) || nt(e) ? Et(t, null, e) : Ts(e) ? Et(t, null, [e]) : Et(t, e);
  } finally {
    ra(1);
  }
}
function Db() {
}
function Rb(t, e, s, n) {
  let i = s[n];
  if (i && kp(i, t)) return i;
  let a = e();
  return a.memo = t.slice(), a.cacheIndex = n, s[n] = a;
}
function kp(t, e) {
  let s = t.memo;
  if (s.length != e.length) return !1;
  for (let n = 0; n < s.length; n++) if (ne(s[n], e[n])) return !1;
  return kn > 0 && de && de.push(t), !0;
}
let Mp = "3.5.33", Lb = ie, Ob = null, Fb, Eb = ie, Ib = { createComponentInstance: yp, setupComponent: _p, renderComponentRoot: go, setCurrentRenderingInstance: ia, isVNode: Ts, normalizeVNode: ke, getComponentPublicInstance: Pa, ensureValidVNode: Ac, pushWarningContext: function(t) {
}, popWarningContext: function() {
} }, Nb = null, Bb = null, $b = null, Eh = "u" > typeof window && window.trustedTypes;
if (Eh) try {
  bl = Eh.createPolicy("vue", { createHTML: (t) => t });
} catch {
}
let Ap = bl ? (t) => bl.createHTML(t) : (t) => t, us = "u" > typeof document ? document : null, Ih = us && us.createElement("template"), Pp = { insert: (t, e, s) => {
  e.insertBefore(t, s || null);
}, remove: (t) => {
  let e = t.parentNode;
  e && e.removeChild(t);
}, createElement: (t, e, s, n) => {
  let i = e === "svg" ? us.createElementNS("http://www.w3.org/2000/svg", t) : e === "mathml" ? us.createElementNS("http://www.w3.org/1998/Math/MathML", t) : s ? us.createElement(t, { is: s }) : us.createElement(t);
  return t === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
}, createText: (t) => us.createTextNode(t), createComment: (t) => us.createComment(t), setText: (t, e) => {
  t.nodeValue = e;
}, setElementText: (t, e) => {
  t.textContent = e;
}, parentNode: (t) => t.parentNode, nextSibling: (t) => t.nextSibling, querySelector: (t) => us.querySelector(t), setScopeId(t, e) {
  t.setAttribute(e, "");
}, insertStaticContent(t, e, s, n, i, a) {
  let o = s ? s.previousSibling : e.lastChild;
  if (i && (i === a || i.nextSibling)) for (; e.insertBefore(i.cloneNode(!0), s), i !== a && (i = i.nextSibling); ) ;
  else {
    Ih.innerHTML = Ap(n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t);
    let r = Ih.content;
    if (n === "svg" || n === "mathml") {
      let l = r.firstChild;
      for (; l.firstChild; ) r.appendChild(l.firstChild);
      r.removeChild(l);
    }
    e.insertBefore(r, s);
  }
  return [o ? o.nextSibling : e.firstChild, s ? s.previousSibling : e.lastChild];
} }, Os = "transition", Si = "animation", li = Symbol("_vtc"), Tp = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, Dp = gt({}, vc, Tp), jb = ((Jr = (t, { slots: e }) => Cp(Wd, Rp(t), e)).displayName = "Transition", Jr.props = Dp, Jr), nn = (t, e = []) => {
  nt(t) ? t.forEach((s) => s(...e)) : t && t(...e);
}, Nh = (t) => !!t && (nt(t) ? t.some((e) => e.length > 1) : t.length > 1);
function Rp(t) {
  let e = {};
  for (let C in t) C in Tp || (e[C] = t[C]);
  if (t.css === !1) return e;
  let { name: s = "v", type: n, duration: i, enterFromClass: a = `${s}-enter-from`, enterActiveClass: o = `${s}-enter-active`, enterToClass: r = `${s}-enter-to`, appearFromClass: l = a, appearActiveClass: c = o, appearToClass: h = r, leaveFromClass: u = `${s}-leave-from`, leaveActiveClass: f = `${s}-leave-active`, leaveToClass: d = `${s}-leave-to` } = t, p = function(C) {
    if (C == null) return null;
    {
      if (St(C)) return [function(L) {
        return ti(L);
      }(C.enter), function(L) {
        return ti(L);
      }(C.leave)];
      let N = function(L) {
        return ti(L);
      }(C);
      return [N, N];
    }
  }(i), g = p && p[0], m = p && p[1], { onBeforeEnter: _, onEnter: y, onEnterCancelled: b, onLeave: v, onLeaveCancelled: w, onBeforeAppear: S = _, onAppear: x = y, onAppearCancelled: k = b } = e, P = (C, N, L, D) => {
    C._enterCancelled = D, Ns(C, N ? h : r), Ns(C, N ? c : o), L && L();
  }, F = (C, N) => {
    C._isLeaving = !1, Ns(C, u), Ns(C, d), Ns(C, f), N && N();
  }, E = (C) => (N, L) => {
    let D = C ? x : y, M = () => P(N, C, L);
    nn(D, [N, M]), Bh(() => {
      Ns(N, C ? l : a), Je(N, C ? h : r), Nh(D) || $h(N, n, g, M);
    });
  };
  return gt(e, { onBeforeEnter(C) {
    nn(_, [C]), Je(C, a), Je(C, o);
  }, onBeforeAppear(C) {
    nn(S, [C]), Je(C, l), Je(C, c);
  }, onEnter: E(!1), onAppear: E(!0), onLeave(C, N) {
    C._isLeaving = !0;
    let L = () => F(C, N);
    Je(C, u), C._enterCancelled ? (Je(C, f), Rl(C)) : (Rl(C), Je(C, f)), Bh(() => {
      C._isLeaving && (Ns(C, u), Je(C, d), Nh(v) || $h(C, n, m, L));
    }), nn(v, [C, L]);
  }, onEnterCancelled(C) {
    P(C, !1, void 0, !0), nn(b, [C]);
  }, onAppearCancelled(C) {
    P(C, !0, void 0, !0), nn(k, [C]);
  }, onLeaveCancelled(C) {
    F(C), nn(w, [C]);
  } });
}
function Je(t, e) {
  e.split(/\s+/).forEach((s) => s && t.classList.add(s)), (t[li] || (t[li] = /* @__PURE__ */ new Set())).add(e);
}
function Ns(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.remove(n));
  let s = t[li];
  s && (s.delete(e), s.size || (t[li] = void 0));
}
function Bh(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Wb = 0;
function $h(t, e, s, n) {
  let i = t._endId = ++Wb, a = () => {
    i === t._endId && n();
  };
  if (s != null) return setTimeout(a, s);
  let { type: o, timeout: r, propCount: l } = Lp(t, e);
  if (!o) return n();
  let c = o + "end", h = 0, u = () => {
    t.removeEventListener(c, f), a();
  }, f = (d) => {
    d.target === t && ++h >= l && u();
  };
  setTimeout(() => {
    h < l && u();
  }, r + 1), t.addEventListener(c, f);
}
function Lp(t, e) {
  let s = window.getComputedStyle(t), n = (p) => (s[p] || "").split(", "), i = n(`${Os}Delay`), a = n(`${Os}Duration`), o = jh(i, a), r = n(`${Si}Delay`), l = n(`${Si}Duration`), c = jh(r, l), h = null, u = 0, f = 0;
  e === Os ? o > 0 && (h = Os, u = o, f = a.length) : e === Si ? c > 0 && (h = Si, u = c, f = l.length) : f = (h = (u = Math.max(o, c)) > 0 ? o > c ? Os : Si : null) ? h === Os ? a.length : l.length : 0;
  let d = h === Os && /\b(?:transform|all)(?:,|$)/.test(n(`${Os}Property`).toString());
  return { type: h, timeout: u, propCount: f, hasTransform: d };
}
function jh(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((s, n) => Wh(s) + Wh(t[n])));
}
function Wh(t) {
  return t === "auto" ? 0 : 1e3 * Number(t.slice(0, -1).replace(",", "."));
}
function Rl(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight;
}
let jo = Symbol("_vod"), Op = Symbol("_vsh"), Fp = { name: "show", beforeMount(t, { value: e }, { transition: s }) {
  t[jo] = t.style.display === "none" ? "" : t.style.display, s && e ? s.beforeEnter(t) : wi(t, e);
}, mounted(t, { value: e }, { transition: s }) {
  s && e && s.enter(t);
}, updated(t, { value: e, oldValue: s }, { transition: n }) {
  !e != !s && (n ? e ? (n.beforeEnter(t), wi(t, !0), n.enter(t)) : n.leave(t, () => {
    wi(t, !1);
  }) : wi(t, e));
}, beforeUnmount(t, { value: e }) {
  wi(t, e);
} };
function wi(t, e) {
  t.style.display = e ? t[jo] : "none", t[Op] = !e;
}
let Ep = Symbol("");
function Vb(t) {
  let e = ve();
  if (!e) return;
  let s = e.ut = (i = t(e.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach((a) => Va(a, i));
  }, n = () => {
    let i = t(e.proxy);
    e.ce ? Va(e.ce, i) : function a(o, r) {
      if (128 & o.shapeFlag) {
        let l = o.suspense;
        o = l.activeBranch, l.pendingBranch && !l.isHydrating && l.effects.push(() => {
          a(l.activeBranch, r);
        });
      }
      for (; o.component; ) o = o.component.subTree;
      if (1 & o.shapeFlag && o.el) Va(o.el, r);
      else if (o.type === ee) o.children.forEach((l) => a(l, r));
      else if (o.type === xn) {
        let { el: l, anchor: c } = o;
        for (; l && (Va(l, r), l !== c); ) l = l.nextSibling;
      }
    }(e.subTree, i), s(i);
  };
  Cc(() => {
    na(n);
  }), Aa(() => {
    ni(n, ie, { flush: "post" });
    let i = new MutationObserver(n);
    i.observe(e.subTree.el.parentNode, { childList: !0 }), kr(() => i.disconnect());
  });
}
function Va(t, e) {
  if (t.nodeType === 1) {
    let n = t.style, i = "";
    for (let a in e) {
      var s;
      let o = (s = e[a]) == null ? "initial" : typeof s == "string" ? s === "" ? " " : s : String(s);
      n.setProperty(`--${a}`, o), i += `--${a}: ${o};`;
    }
    n[Ep] = i;
  }
}
let Hb = /(?:^|;)\s*display\s*:/, Vh = /\s*!important$/;
function Ri(t, e, s) {
  if (nt(s)) s.forEach((n) => Ri(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--")) t.setProperty(e, s);
  else {
    let n = function(i, a) {
      let o = Kr[a];
      if (o) return o;
      let r = Tt(a);
      if (r !== "filter" && r in i) return Kr[a] = r;
      r = Fn(r);
      for (let l = 0; l < Hh.length; l++) {
        let c = Hh[l] + r;
        if (c in i) return Kr[a] = c;
      }
      return a;
    }(t, e);
    Vh.test(s) ? t.setProperty(Me(n), s.replace(Vh, ""), "important") : t[n] = s;
  }
}
let Hh = ["Webkit", "Moz", "ms"], Kr = {}, zh = "http://www.w3.org/1999/xlink";
function Gh(t, e, s, n, i, a = Um(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(zh, e.slice(6, e.length)) : t.setAttributeNS(zh, e, s) : s == null || a && !(s || s === "") ? t.removeAttribute(e) : t.setAttribute(e, a ? "" : ge(s) ? String(s) : s);
}
function Uh(t, e, s, n, i) {
  if (e === "innerHTML" || e === "textContent") {
    s != null && (t[e] = e === "innerHTML" ? Ap(s) : s);
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
function ys(t, e, s, n) {
  t.addEventListener(e, s, n);
}
let qh = Symbol("_vei"), Kh = /(?:Once|Passive|Capture)$/, Yr = 0, zb = Promise.resolve(), Yh = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && 123 > t.charCodeAt(2), Ip = (t, e, s, n, i, a) => {
  let o = i === "svg";
  if (e === "class") {
    var r;
    let l;
    r = n, (l = t[li]) && (r = (r ? [r, ...l] : [...l]).join(" ")), r == null ? t.removeAttribute("class") : o ? t.setAttribute("class", r) : t.className = r;
  } else e === "style" ? function(l, c, h) {
    let u = l.style, f = ct(h), d = !1;
    if (h && !f) {
      if (c) if (ct(c)) for (let y of c.split(";")) {
        let b = y.slice(0, y.indexOf(":")).trim();
        h[b] == null && Ri(u, b, "");
      }
      else for (let y in c) h[y] == null && Ri(u, y, "");
      for (let y in h) {
        var p, g, m, _;
        y === "display" && (d = !0);
        let b = h[y];
        b != null ? (p = l, g = y, m = !ct(c) && c ? c[y] : void 0, _ = b, p.tagName === "TEXTAREA" && (g === "width" || g === "height") && ct(_) && m === _ || Ri(u, y, b)) : Ri(u, y, "");
      }
    } else if (f) {
      if (c !== h) {
        let y = u[Ep];
        y && (h += ";" + y), u.cssText = h, d = Hb.test(h);
      }
    } else c && l.removeAttribute("style");
    jo in l && (l[jo] = d ? u.display : "", l[Op] && (u.display = "none"));
  }(t, s, n) : On(e) ? cr(e) || function(l, c, h, u = null) {
    let f = l[qh] || (l[qh] = {}), d = f[c];
    if (h && d) d.value = h;
    else {
      let [m, _] = function(y) {
        let b;
        if (Kh.test(y)) {
          let v;
          for (b = {}; v = y.match(Kh); ) y = y.slice(0, y.length - v[0].length), b[v[0].toLowerCase()] = !0;
        }
        return [y[2] === ":" ? y.slice(3) : Me(y.slice(2)), b];
      }(c);
      if (h) {
        var p, g;
        let y;
        ys(l, m, f[c] = (p = h, g = u, (y = (b) => {
          if (b._vts) {
            if (b._vts <= y.attached) return;
          } else b._vts = Date.now();
          Ve(function(v, w) {
            if (!nt(w)) return w;
            {
              let S = v.stopImmediatePropagation;
              return v.stopImmediatePropagation = () => {
                S.call(v), v._stopped = !0;
              }, w.map((x) => (k) => !k._stopped && x && x(k));
            }
          }(b, y.value), g, 5, [b]);
        }).value = p, y.attached = Yr || (zb.then(() => Yr = 0), Yr = Date.now()), y), _);
      } else d && (l.removeEventListener(m, d, _), f[c] = void 0);
    }
  }(t, e, n, a) : (e[0] === "." ? (e = e.slice(1), 0) : e[0] === "^" ? (e = e.slice(1), 1) : !function(l, c, h, u) {
    if (u) return !!(c === "innerHTML" || c === "textContent" || c in l && Yh(c) && ot(h));
    if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA") return !1;
    if (c === "width" || c === "height") {
      let f = l.tagName;
      if (f === "IMG" || f === "VIDEO" || f === "CANVAS" || f === "SOURCE") return !1;
    }
    return !(Yh(c) && ct(h)) && c in l;
  }(t, e, n, o)) ? t._isVueCE && (function(l, c) {
    let h = l._def.props;
    if (!h) return !1;
    let u = Tt(c);
    return Array.isArray(h) ? h.some((f) => Tt(f) === u) : Object.keys(h).some((f) => Tt(f) === u);
  }(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !ct(n))) ? Uh(t, Tt(e), n, a, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), Gh(t, e, n, o)) : (Uh(t, e, n), t.tagName.includes("-") || e !== "value" && e !== "checked" && e !== "selected" || Gh(t, e, n, o, a, e !== "value"));
}, Jh = {};
function Np(t, e, s) {
  let n, i = Sc(t, e);
  n = i, jt.call(n) === "[object Object]" && (i = gt({}, i, e));
  class a extends Ar {
    constructor(r) {
      super(i, r, s);
    }
  }
  return a.def = i, a;
}
let Gb = (t, e) => Np(t, e, Kp), Ub = "u" > typeof HTMLElement ? HTMLElement : class {
};
class Ar extends Ub {
  constructor(e, s = {}, n = Ho) {
    super(), this._def = e, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== Ho ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow(gt({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._resolved || this._parseSlots(), this._connected = !0;
    let e = this;
    for (; e = e && (e.assignedSlot || e.parentNode || e.host); ) if (e instanceof Ar) {
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
    this._connected = !1, oi(() => {
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
      if (o && !nt(o)) for (let l in o) {
        let c = o[l];
        (c === Number || c && c.type === Number) && (l in this._props && (this._props[l] = ti(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[Tt(l)] = !0);
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
    if (s) for (let n in s) wt(this, n) || Object.defineProperty(this, n, { get: () => Ca(s[n]) });
  }
  _resolveProps(e) {
    let { props: s } = e, n = nt(s) ? s : Object.keys(s || {});
    for (let i of Object.keys(this)) i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (let i of n.map(Tt)) Object.defineProperty(this, i, { get() {
      return this._getProp(i);
    }, set(a) {
      this._setProp(i, a, !0, !this._patching);
    } });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    let s = this.hasAttribute(e), n = s ? this.getAttribute(e) : Jh, i = Tt(e);
    s && this._numberProps && this._numberProps[i] && (n = ti(n)), this._setProp(i, n, !1, !0);
  }
  _getProp(e) {
    return this._props[e];
  }
  _setProp(e, s, n = !0, i = !1) {
    if (s !== this._props[e] && (this._dirty = !0, s === Jh ? delete this._props[e] : (this._props[e] = s, e === "key" && this._app && (this._app._ceVNode.key = s)), i && this._instance && this._update(), n)) {
      let a = this._ob;
      a && (this._processMutations(a.takeRecords()), a.disconnect()), s === !0 ? this.setAttribute(Me(e), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Me(e), s + "") : s || this.removeAttribute(Me(e)), a && a.observe(this, { attributes: !0 });
    }
  }
  _update() {
    let e = this._createVNode();
    this._app && (e.appContext = this._app._context), qp(e, this._root);
  }
  _createVNode() {
    let e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    let s = Et(this._def, gt(e, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      let i = (a, o) => {
        let r;
        this.dispatchEvent(new CustomEvent(a, (r = o[0], jt.call(r) === "[object Object]" ? gt({ detail: o }, o[0]) : { detail: o })));
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
function Bp(t) {
  let e = ve();
  return e && e.ce || null;
}
function qb() {
  let t = Bp();
  return t && t.shadowRoot;
}
function Kb(t = "$style") {
  {
    let e = ve();
    if (!e) return yt;
    let s = e.type.__cssModules;
    return s && s[t] || yt;
  }
}
let $p = /* @__PURE__ */ new WeakMap(), jp = /* @__PURE__ */ new WeakMap(), Wo = Symbol("_moveCb"), Xh = Symbol("_enterCb"), Yb = (Xr = { name: "TransitionGroup", props: gt({}, Dp, { tag: String, moveClass: String }), setup(t, { slots: e }) {
  let s, n, i = ve(), a = xc();
  return wr(() => {
    if (!s.length) return;
    let o = t.moveClass || `${t.name || "v"}-move`;
    if (!function(l, c, h) {
      let u = l.cloneNode(), f = l[li];
      f && f.forEach((g) => {
        g.split(/\s+/).forEach((m) => m && u.classList.remove(m));
      }), h.split(/\s+/).forEach((g) => g && u.classList.add(g)), u.style.display = "none";
      let d = c.nodeType === 1 ? c : c.parentNode;
      d.appendChild(u);
      let { hasTransform: p } = Lp(u);
      return d.removeChild(u), p;
    }(s[0].el, i.vnode.el, o)) {
      s = [];
      return;
    }
    s.forEach(Jb), s.forEach(Xb);
    let r = s.filter(Zb);
    Rl(i.vnode.el), r.forEach((l) => {
      let c = l.el, h = c.style;
      Je(c, o), h.transform = h.webkitTransform = h.transitionDuration = "";
      let u = c[Wo] = (f) => {
        (!f || f.target === c) && (!f || f.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", u), c[Wo] = null, Ns(c, o));
      };
      c.addEventListener("transitionend", u);
    }), s = [];
  }), () => {
    let o = xt(t), r = Rp(o), l = o.tag || ee;
    if (s = [], n) for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.el && h.el instanceof Element && (s.push(h), Ps(h, ri(h, r, a, i)), $p.set(h, Wp(h.el)));
    }
    n = e.default ? Sr(e.default()) : [];
    for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.key != null && Ps(h, ri(h, r, a, i));
    }
    return Et(l, null, n);
  };
} }, delete Xr.props.mode, Xr);
function Jb(t) {
  let e = t.el;
  e[Wo] && e[Wo](), e[Xh] && e[Xh]();
}
function Xb(t) {
  jp.set(t, Wp(t.el));
}
function Zb(t) {
  let e = $p.get(t), s = jp.get(t), n = e.left - s.left, i = e.top - s.top;
  if (n || i) {
    let a = t.el, o = a.style, r = a.getBoundingClientRect(), l = 1, c = 1;
    return a.offsetWidth && (l = r.width / a.offsetWidth), a.offsetHeight && (c = r.height / a.offsetHeight), Number.isFinite(l) && l !== 0 || (l = 1), Number.isFinite(c) && c !== 0 || (c = 1), 0.01 > Math.abs(l - 1) && (l = 1), 0.01 > Math.abs(c - 1) && (c = 1), o.transform = o.webkitTransform = `translate(${n / l}px,${i / c}px)`, o.transitionDuration = "0s", t;
  }
}
function Wp(t) {
  let e = t.getBoundingClientRect();
  return { left: e.left, top: e.top };
}
let Ks = (t) => {
  let e = t.props["onUpdate:modelValue"] || !1;
  return nt(e) ? (s) => Qn(e, s) : e;
};
function Qb(t) {
  t.target.composing = !0;
}
function Zh(t) {
  let e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
let We = Symbol("_assign");
function Qh(t, e, s) {
  return e && (t = t.trim()), s && (t = fr(t)), t;
}
let Vo = { created(t, { modifiers: { lazy: e, trim: s, number: n } }, i) {
  t[We] = Ks(i);
  let a = n || i.props && i.props.type === "number";
  ys(t, e ? "change" : "input", (o) => {
    o.target.composing || t[We](Qh(t.value, s, a));
  }), (s || a) && ys(t, "change", () => {
    t.value = Qh(t.value, s, a);
  }), e || (ys(t, "compositionstart", Qb), ys(t, "compositionend", Zh), ys(t, "change", Zh));
}, mounted(t, { value: e }) {
  t.value = e ?? "";
}, beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: i, number: a } }, o) {
  if (t[We] = Ks(o), t.composing) return;
  let r = (a || t.type === "number") && !/^0\d/.test(t.value) ? fr(t.value) : t.value, l = e ?? "";
  if (r === l) return;
  let c = t.getRootNode();
  (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === t && t.type !== "range" && (n && e === s || i && t.value.trim() === l) || (t.value = l);
} }, Ec = { deep: !0, created(t, e, s) {
  t[We] = Ks(s), ys(t, "change", () => {
    let n = t._modelValue, i = ci(t), a = t.checked, o = t[We];
    if (nt(n)) {
      let r = pr(n, i), l = r !== -1;
      if (a && !l) o(n.concat(i));
      else if (!a && l) {
        let c = [...n];
        c.splice(r, 1), o(c);
      }
    } else {
      let r;
      if (r = n, jt.call(r) === "[object Set]") {
        let l = new Set(n);
        a ? l.add(i) : l.delete(i), o(l);
      } else o(Hp(t, a));
    }
  });
}, mounted: tu, beforeUpdate(t, e, s) {
  t[We] = Ks(s), tu(t, e, s);
} };
function tu(t, { value: e, oldValue: s }, n) {
  let i;
  if (t._modelValue = e, nt(e)) i = pr(e, n.props.value) > -1;
  else {
    let a;
    if (a = e, jt.call(a) === "[object Set]") i = e.has(n.props.value);
    else {
      if (e === s) return;
      i = ks(e, Hp(t, !0));
    }
  }
  t.checked !== i && (t.checked = i);
}
let Ic = { created(t, { value: e }, s) {
  t.checked = ks(e, s.props.value), t[We] = Ks(s), ys(t, "change", () => {
    t[We](ci(t));
  });
}, beforeUpdate(t, { value: e, oldValue: s }, n) {
  t[We] = Ks(n), e !== s && (t.checked = ks(e, n.props.value));
} }, Vp = { deep: !0, created(t, { value: e, modifiers: { number: s } }, n) {
  let i, a = (i = e, jt.call(i) === "[object Set]");
  ys(t, "change", () => {
    let o = Array.prototype.filter.call(t.options, (r) => r.selected).map((r) => s ? fr(ci(r)) : ci(r));
    t[We](t.multiple ? a ? new Set(o) : o : o[0]), t._assigning = !0, oi(() => {
      t._assigning = !1;
    });
  }), t[We] = Ks(n);
}, mounted(t, { value: e }) {
  eu(t, e);
}, beforeUpdate(t, e, s) {
  t[We] = Ks(s);
}, updated(t, { value: e }) {
  t._assigning || eu(t, e);
} };
function eu(t, e) {
  let s, n = t.multiple, i = nt(e);
  if (!n || i || (s = e, jt.call(s) === "[object Set]")) {
    for (let a = 0, o = t.options.length; a < o; a++) {
      let r = t.options[a], l = ci(r);
      if (n) if (i) {
        let c = typeof l;
        c === "string" || c === "number" ? r.selected = e.some((h) => String(h) === String(l)) : r.selected = pr(e, l) > -1;
      } else r.selected = e.has(l);
      else if (ks(ci(r), e)) {
        t.selectedIndex !== a && (t.selectedIndex = a);
        return;
      }
    }
    n || t.selectedIndex === -1 || (t.selectedIndex = -1);
  }
}
function ci(t) {
  return "_value" in t ? t._value : t.value;
}
function Hp(t, e) {
  let s = e ? "_trueValue" : "_falseValue";
  return s in t ? t[s] : e;
}
let zp = { created(t, e, s) {
  Ha(t, e, s, null, "created");
}, mounted(t, e, s) {
  Ha(t, e, s, null, "mounted");
}, beforeUpdate(t, e, s, n) {
  Ha(t, e, s, n, "beforeUpdate");
}, updated(t, e, s, n) {
  Ha(t, e, s, n, "updated");
} };
function Gp(t, e) {
  switch (t) {
    case "SELECT":
      return Vp;
    case "TEXTAREA":
      return Vo;
    default:
      switch (e) {
        case "checkbox":
          return Ec;
        case "radio":
          return Ic;
        default:
          return Vo;
      }
  }
}
function Ha(t, e, s, n, i) {
  let a = Gp(t.tagName, s.props && s.props.type)[i];
  a && a(t, e, s, n);
}
let t0 = ["ctrl", "shift", "alt", "meta"], e0 = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => t0.some((s) => t[`${s}Key`] && !e.includes(s)) }, s0 = (t, e) => {
  if (!t) return t;
  let s = t._withMods || (t._withMods = {}), n = e.join(".");
  return s[n] || (s[n] = (i, ...a) => {
    for (let o = 0; o < e.length; o++) {
      let r = e0[e[o]];
      if (r && r(i, e)) return;
    }
    return t(i, ...a);
  });
}, n0 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" }, i0 = (t, e) => {
  let s = t._withKeys || (t._withKeys = {}), n = e.join(".");
  return s[n] || (s[n] = (i) => {
    if (!("key" in i)) return;
    let a = Me(i.key);
    if (e.some((o) => o === a || n0[o] === a)) return t(i);
  });
}, Nc = gt({ patchProp: Ip }, Pp), su = !1;
function Up() {
  return yn = su ? yn : rp(Nc), su = !0, yn;
}
let qp = (...t) => {
  (yn || (yn = Dc(Nc))).render(...t);
}, a0 = (...t) => {
  Up().hydrate(...t);
}, Ho = (...t) => {
  let e = (yn || (yn = Dc(Nc))).createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = Jp(n);
    if (!i) return;
    let a = e._component;
    ot(a) || a.render || a.template || (a.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    let o = s(i, !1, Yp(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
}, Kp = (...t) => {
  let e = Up().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = Jp(n);
    if (i) return s(i, !0, Yp(i));
  }, e;
};
function Yp(t) {
  return t instanceof SVGElement ? "svg" : typeof MathMLElement == "function" && t instanceof MathMLElement ? "mathml" : void 0;
}
function Jp(t) {
  return ct(t) ? document.querySelector(t) : t;
}
let nu = !1, o0 = () => {
  nu || (nu = !0, Vo.getSSRProps = ({ value: t }) => ({ value: t }), Ic.getSSRProps = ({ value: t }, e) => {
    if (e.props && ks(e.props.value, t)) return { checked: !0 };
  }, Ec.getSSRProps = ({ value: t }, e) => {
    if (nt(t)) {
      if (e.props && pr(t, e.props.value) > -1) return { checked: !0 };
    } else {
      let s;
      if (s = t, jt.call(s) === "[object Set]") {
        if (e.props && t.has(e.props.value)) return { checked: !0 };
      } else if (t) return { checked: !0 };
    }
  }, zp.getSSRProps = (t, e) => {
    if (typeof e.type != "string") return;
    let s = Gp(e.type.toUpperCase(), e.props && e.props.type);
    if (s.getSSRProps) return s.getSSRProps(t, e);
  }, Fp.getSSRProps = ({ value: t }) => {
    if (!t) return { style: { display: "none" } };
  });
};
var Jr, Xr, iu, r0 = Object.freeze({ __proto__: null, BaseTransition: Wd, BaseTransitionPropsValidators: vc, Comment: Gt, DeprecationTypes: $b, EffectScope: pc, ErrorCodes: Cy, ErrorTypeStrings: Ob, Fragment: ee, KeepAlive: Gy, ReactiveEffect: ta, Static: xn, Suspense: Sb, Teleport: Oy, Text: Gs, TrackOpTypes: xy, Transition: jb, TransitionGroup: Yb, TriggerOpTypes: vy, VueElement: Ar, assertNumber: wy, callWithAsyncErrorHandling: Ve, callWithErrorHandling: gi, camelize: Tt, capitalize: Fn, cloneVNode: as, compatUtils: Bb, computed: wp, createApp: Ho, createBlock: $o, createCommentVNode: gp, createElementBlock: wb, createElementVNode: Lc, createHydrationRenderer: rp, createPropsRestProxy: ub, createRenderer: Dc, createSSRApp: Kp, createSlots: Jy, createStaticVNode: kb, createTextVNode: Oc, createVNode: Et, customRef: Pd, defineAsyncComponent: zy, defineComponent: Sc, defineCustomElement: Np, defineEmits: eb, defineExpose: sb, defineModel: ab, defineOptions: nb, defineProps: tb, defineSSRCustomElement: Gb, defineSlots: ib, devtools: Fb, effect: Ym, effectScope: qm, getCurrentInstance: ve, getCurrentScope: hd, getCurrentWatcher: Sy, getTransitionRawChildren: Sr, guardReactiveProps: pp, h: Cp, handleError: En, hasInjectionContext: Ty, hydrate: a0, hydrateOnIdle: jy, hydrateOnInteraction: Hy, hydrateOnMediaQuery: Vy, hydrateOnVisible: Wy, initCustomFormatter: Db, initDirectivesForSSR: o0, inject: Hi, isMemoSame: kp, isProxy: wa, isReactive: Ss, isReadonly: is, isRef: Yt, isRuntimeOnly: Pb, isShallow: Te, isVNode: Ts, markRaw: kd, mergeDefaults: cb, mergeModels: hb, mergeProps: mp, nextTick: oi, nodeOps: Pp, normalizeClass: Sa, normalizeProps: Wm, normalizeStyle: va, onActivated: Hd, onBeforeMount: Ud, onBeforeUnmount: Cr, onBeforeUpdate: Cc, onDeactivated: zd, onErrorCaptured: Jd, onMounted: Aa, onRenderTracked: Yd, onRenderTriggered: Kd, onScopeDispose: Km, onServerPrefetch: qd, onUnmounted: kr, onUpdated: wr, onWatcherCleanup: Dd, openBlock: oa, patchProp: Ip, popScopeId: My, provide: Od, proxyRefs: yc, pushScopeId: ky, queuePostFlushCb: na, reactive: _r, readonly: Do, ref: Wi, registerRuntimeCompiler: xp, render: qp, renderList: Yy, renderSlot: Xy, resolveComponent: Uy, resolveDirective: Ky, resolveDynamicComponent: qy, resolveFilter: Nb, resolveTransitionHooks: ri, setBlockTracking: ra, setDevtoolsHook: Eb, setTransitionHooks: Ps, shallowReactive: Cd, shallowReadonly: hy, shallowRef: Md, ssrContextKey: Fd, ssrUtils: Ib, stop: Jm, toDisplayString: ld, toHandlerKey: Zn, toHandlers: Zy, toRaw: xt, toRef: by, toRefs: my, toValue: dy, transformVNodeArgs: Cb, triggerRef: fy, unref: Ca, useAttrs: lb, useCssModule: Kb, useCssVars: Vb, useHost: Bp, useId: Fy, useModel: gb, useSSRContext: Ed, useShadowRoot: qb, useSlots: rb, useTemplateRef: Ey, useTransitionState: xc, vModelCheckbox: Ec, vModelDynamic: zp, vModelRadio: Ic, vModelSelect: Vp, vModelText: Vo, vShow: Fp, version: Mp, warn: Lb, watch: ni, watchEffect: Dy, watchPostEffect: Ry, watchSyncEffect: Id, withAsyncContext: fb, withCtx: _c, withDefaults: ob, withDirectives: Py, withKeys: i0, withMemo: Rb, withModifiers: s0, withScopeId: Ay });
let ca = Symbol(""), qi = Symbol(""), Bc = Symbol(""), zo = Symbol(""), Xp = Symbol(""), An = Symbol(""), Pn = Symbol(""), Tn = Symbol(""), Ys = Symbol(""), Js = Symbol(""), Ta = Symbol(""), $c = Symbol(""), Zp = Symbol(""), jc = Symbol(""), Ll = Symbol(""), Wc = Symbol(""), l0 = Symbol(""), Vc = Symbol(""), Hc = Symbol(""), Qp = Symbol(""), tg = Symbol(""), Pr = Symbol(""), Go = Symbol(""), zc = Symbol(""), Gc = Symbol(""), ha = Symbol(""), Da = Symbol(""), Uc = Symbol(""), Ol = Symbol(""), c0 = Symbol(""), Fl = Symbol(""), Uo = Symbol(""), h0 = Symbol(""), u0 = Symbol(""), qc = Symbol(""), f0 = Symbol(""), d0 = Symbol(""), Kc = Symbol(""), eg = Symbol(""), hi = { [ca]: "Fragment", [qi]: "Teleport", [Bc]: "Suspense", [zo]: "KeepAlive", [Xp]: "BaseTransition", [An]: "openBlock", [Pn]: "createBlock", [Tn]: "createElementBlock", [Ys]: "createVNode", [Js]: "createElementVNode", [Ta]: "createCommentVNode", [$c]: "createTextVNode", [Zp]: "createStaticVNode", [jc]: "resolveComponent", [Ll]: "resolveDynamicComponent", [Wc]: "resolveDirective", [l0]: "resolveFilter", [Vc]: "withDirectives", [Hc]: "renderList", [Qp]: "renderSlot", [tg]: "createSlots", [Pr]: "toDisplayString", [Go]: "mergeProps", [zc]: "normalizeClass", [Gc]: "normalizeStyle", [ha]: "normalizeProps", [Da]: "guardReactiveProps", [Uc]: "toHandlers", [Ol]: "camelize", [c0]: "capitalize", [Fl]: "toHandlerKey", [Uo]: "setBlockTracking", [h0]: "pushScopeId", [u0]: "popScopeId", [qc]: "withCtx", [f0]: "unref", [d0]: "isRef", [Kc]: "withMemo", [eg]: "isMemoSame" }, Fe = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
function ua(t, e, s, n, i, a, o, r = !1, l = !1, c = !1, h = Fe) {
  var u, f, d, p;
  return t && (r ? (t.helper(An), t.helper((u = t.inSSR, f = c, u || f ? Pn : Tn))) : t.helper((d = t.inSSR, p = c, d || p ? Ys : Js)), o && t.helper(Vc)), { type: 13, tag: e, props: s, children: n, patchFlag: i, dynamicProps: a, directives: o, isBlock: r, disableTracking: l, isComponent: c, loc: h };
}
function vn(t, e = Fe) {
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
function ui(t, e, s = !1, n = !1, i = Fe) {
  return { type: 18, params: t, returns: e, newline: s, isSlot: n, loc: i };
}
function El(t, e, s, n = !0) {
  return { type: 19, test: t, consequent: e, alternate: s, newline: n, loc: Fe };
}
function Yc(t, { helper: e, removeHelper: s, inSSR: n }) {
  if (!t.isBlock) {
    var i, a;
    t.isBlock = !0, s((i = t.isComponent, n || i ? Ys : Js)), e(An), e((a = t.isComponent, n || a ? Pn : Tn));
  }
}
let au = new Uint8Array([123, 123]), ou = new Uint8Array([125, 125]);
function ru(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function Re(t) {
  return t === 32 || t === 10 || t === 9 || t === 12 || t === 13;
}
function Fs(t) {
  return t === 47 || t === 62 || Re(t);
}
function qo(t) {
  let e = new Uint8Array(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}
let re = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
function Il(t) {
  throw t;
}
function sg(t) {
}
function At(t, e, s, n) {
  let i = SyntaxError(`https://vuejs.org/error-reference/#compiler-${t}`);
  return i.code = t, i.loc = e, i;
}
let Pe = (t) => t.type === 4 && t.isStatic;
function ng(t) {
  switch (t) {
    case "Teleport":
    case "teleport":
      return qi;
    case "Suspense":
    case "suspense":
      return Bc;
    case "KeepAlive":
    case "keep-alive":
      return zo;
    case "BaseTransition":
    case "base-transition":
      return Xp;
  }
}
let Nl = /^$|^\d|[^\$\w\xA0-\uFFFF]/, ig = /[A-Za-z_$\xA0-\uFFFF]/, p0 = /[\.\?\w$\xA0-\uFFFF]/, g0 = /\s+[.[]\s*|\s*[.[]\s+/g, ag = (t) => t.type === 4 ? t.content : t.loc.source, og = (t) => {
  let e = ag(t).trim().replace(g0, (r) => r.trim()), s = 0, n = [], i = 0, a = 0, o = null;
  for (let r = 0; r < e.length; r++) {
    let l = e.charAt(r);
    switch (s) {
      case 0:
        if (l === "[") n.push(s), s = 1, i++;
        else if (l === "(") n.push(s), s = 2, a++;
        else if (!(r === 0 ? ig : p0).test(l)) return !1;
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
}, m0 = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
function $e(t, e, s = !1) {
  for (let n = 0; n < t.props.length; n++) {
    let i = t.props[n];
    if (i.type === 7 && (s || i.exp) && (ct(e) ? i.name === e : e.test(i.name))) return i;
  }
}
function Tr(t, e, s = !1, n = !1) {
  for (let i = 0; i < t.props.length; i++) {
    let a = t.props[i];
    if (a.type === 6) {
      if (s) continue;
      if (a.name === e && (a.value || n)) return a;
    } else if (a.name === "bind" && (a.exp || n) && Yn(a.arg, e)) return a;
  }
}
function Yn(t, e) {
  return !!(t && Pe(t) && t.content === e);
}
function Zr(t) {
  return t.type === 5 || t.type === 2;
}
function lu(t) {
  return t.type === 7 && t.name === "pre";
}
function y0(t) {
  return t.type === 7 && t.name === "slot";
}
function Ko(t) {
  return t.type === 1 && t.tagType === 3;
}
function Yo(t) {
  return t.type === 1 && t.tagType === 2;
}
let b0 = /* @__PURE__ */ new Set([ha, Da]);
function Jo(t, e, s) {
  let n, i, a = t.type === 13 ? t.props : t.arguments[2], o = [];
  if (a && !ct(a) && a.type === 14) {
    let r = function l(c, h = []) {
      if (c && !ct(c) && c.type === 14) {
        let u = c.callee;
        if (!ct(u) && b0.has(u)) return l(c.arguments[0], h.concat(c));
      }
      return [c, h];
    }(a);
    a = r[0], i = (o = r[1])[o.length - 1];
  }
  if (a == null || ct(a)) n = je([e]);
  else if (a.type === 14) {
    let r = a.arguments[0];
    ct(r) || r.type !== 15 ? a.callee === Uc ? n = Xt(s.helper(Go), [je([e]), a]) : a.arguments.unshift(je([e])) : cu(e, r) || r.properties.unshift(e), n || (n = a);
  } else a.type === 15 ? (cu(e, a) || a.properties.unshift(e), n = a) : (n = Xt(s.helper(Go), [je([e]), a]), i && i.callee === Da && (i = o[o.length - 2]));
  t.type === 13 ? i ? i.arguments[0] = n : t.props = n : i ? i.arguments[0] = n : t.arguments[2] = n;
}
function cu(t, e) {
  let s = !1;
  if (t.key.type === 4) {
    let n = t.key.content;
    s = e.properties.some((i) => i.key.type === 4 && i.key.content === n);
  }
  return s;
}
function Bl(t, e) {
  return `_${e}_${t.replace(/[^\w]/g, (s, n) => s === "-" ? "_" : t.charCodeAt(n).toString())}`;
}
let _0 = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function rg(t) {
  for (let e = 0; e < t.length; e++) if (!Re(t.charCodeAt(e))) return !1;
  return !0;
}
function Jc(t) {
  return t.type === 2 && rg(t.content) || t.type === 12 && Jc(t.content);
}
function lg(t) {
  return t.type === 3 || Jc(t);
}
let cg = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: () => 0, isVoidTag: Un, isPreTag: Un, isIgnoreNewlineTag: Un, isCustomElement: Un, onError: Il, onWarn: sg, comments: !1, prefixIdentifiers: !1 }, Lt = cg, Xo = null, Cs = "", he = null, Ct = null, De = "", ls = -1, hn = -1, Xc = 0, dn = !1, $l = null, Bt = [], zt = new class {
  constructor(t, e) {
    this.stack = t, this.cbs = e, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = au, this.delimiterClose = ou, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = au, this.delimiterClose = ou;
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
    if (e ? Fs(t) : (32 | t) === this.currentSequence[this.sequenceIndex]) {
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
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : ru(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    Fs(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (Fs(t)) {
      let e = this.buffer.slice(this.sectionStart, this.index);
      e !== "template" && this.enterRCDATA(qo("</" + e), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    Re(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = ru(t) ? 9 : 27, this.sectionStart = this.index));
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
    (t === 61 || Fs(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || Fs(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || Fs(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || Fs(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || Fs(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
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
}(Bt, { onerr: fu, ontext(t, e) {
  za(le(t, e), t, e);
}, ontextentity(t, e, s) {
  za(t, e, s);
}, oninterpolation(t, e) {
  if (dn) return za(le(t, e), t, e);
  let s = t + zt.delimiterOpen.length, n = e - zt.delimiterClose.length;
  for (; Re(Cs.charCodeAt(s)); ) s++;
  for (; Re(Cs.charCodeAt(n - 1)); ) n--;
  let i = le(s, n);
  i.includes("&") && (i = Lt.decodeEntities(i, !1)), jl({ type: 5, content: Ga(i, !1, Ht(s, n)), loc: Ht(t, e) });
}, onopentagname(t, e) {
  let s = le(t, e);
  he = { type: 1, tag: s, ns: Lt.getNamespace(s, Bt[0], Lt.ns), tagType: 0, props: [], children: [], loc: Ht(t - 1, e), codegenNode: void 0 };
}, onopentagend(t) {
  uu(t);
}, onclosetag(t, e) {
  let s = le(t, e);
  if (!Lt.isVoidTag(s)) {
    let n = !1;
    for (let i = 0; i < Bt.length; i++) if (Bt[i].tag.toLowerCase() === s.toLowerCase()) {
      n = !0, i > 0 && Bt[0].loc.start.offset;
      for (let a = 0; a <= i; a++) yo(Bt.shift(), e, a < i);
      break;
    }
    n || hg(t, 60);
  }
}, onselfclosingtag(t) {
  let e = he.tag;
  he.isSelfClosing = !0, uu(t), Bt[0] && Bt[0].tag === e && yo(Bt.shift(), t);
}, onattribname(t, e) {
  Ct = { type: 6, name: le(t, e), nameLoc: Ht(t, e), value: void 0, loc: Ht(t) };
}, ondirname(t, e) {
  let s = le(t, e), n = s === "." || s === ":" ? "bind" : s === "@" ? "on" : s === "#" ? "slot" : s.slice(2);
  if (dn || n === "") Ct = { type: 6, name: s, nameLoc: Ht(t, e), value: void 0, loc: Ht(t) };
  else if (Ct = { type: 7, name: n, rawName: s, exp: void 0, arg: void 0, modifiers: s === "." ? [dt("prop")] : [], loc: Ht(t) }, n === "pre") {
    dn = zt.inVPre = !0, $l = he;
    let i = he.props;
    for (let a = 0; a < i.length; a++) i[a].type === 7 && (i[a] = function(o) {
      let r = { type: 6, name: o.rawName, nameLoc: Ht(o.loc.start.offset, o.loc.start.offset + o.rawName.length), value: void 0, loc: o.loc };
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
  if (dn && !lu(Ct)) Ct.name += s, pn(Ct.nameLoc, e);
  else {
    let n = s[0] !== "[";
    Ct.arg = Ga(n ? s : s.slice(1, -1), n, Ht(t, e), 3 * !!n);
  }
}, ondirmodifier(t, e) {
  let s = le(t, e);
  if (dn && !lu(Ct)) Ct.name += "." + s, pn(Ct.nameLoc, e);
  else if (Ct.name === "slot") {
    let n = Ct.arg;
    n && (n.content += "." + s, pn(n.loc, e));
  } else {
    let n = dt(s, !0, Ht(t, e));
    Ct.modifiers.push(n);
  }
}, onattribdata(t, e) {
  De += le(t, e), ls < 0 && (ls = t), hn = e;
}, onattribentity(t, e, s) {
  De += t, ls < 0 && (ls = e), hn = s;
}, onattribnameend(t) {
  let e = le(Ct.loc.start.offset, t);
  Ct.type === 7 && (Ct.rawName = e), he.props.some((s) => (s.type === 7 ? s.rawName : s.name) === e);
}, onattribend(t, e) {
  he && Ct && (pn(Ct.loc, e), t !== 0 && (De.includes("&") && (De = Lt.decodeEntities(De, !0)), Ct.type === 6 ? (Ct.name === "class" && (De = fg(De).trim()), Ct.value = { type: 2, content: De, loc: t === 1 ? Ht(ls, hn) : Ht(ls - 1, hn + 1) }, zt.inSFCRoot && he.tag === "template" && Ct.name === "lang" && De && De !== "html" && zt.enterRCDATA(qo("</template"), 0)) : (Ct.exp = Ga(De, !1, Ht(ls, hn), 0, 0), Ct.name === "for" && (Ct.forParseResult = function(s) {
    let n = s.loc, i = s.content, a = i.match(_0);
    if (!a) return;
    let [, o, r] = a, l = (d, p, g = !1) => {
      let m = n.start.offset + p, _ = m + d.length;
      return Ga(d, !1, Ht(m, _), 0, +!!g);
    }, c = { source: l(r.trim(), i.indexOf(r, o.length)), value: void 0, key: void 0, index: void 0, finalized: !1 }, h = o.trim().replace(x0, "").trim(), u = o.indexOf(h), f = h.match(hu);
    if (f) {
      let d;
      h = h.replace(hu, "").trim();
      let p = f[1].trim();
      if (p && (d = i.indexOf(p, u + h.length), c.key = l(p, d, !0)), f[2]) {
        let g = f[2].trim();
        g && (c.index = l(g, i.indexOf(g, c.key ? d + p.length : u + h.length), !0));
      }
    }
    return h && (c.value = l(h, u, !0)), c;
  }(Ct.exp)))), (Ct.type !== 7 || Ct.name !== "pre") && he.props.push(Ct)), De = "", ls = hn = -1;
}, oncomment(t, e) {
  Lt.comments && jl({ type: 3, content: le(t, e), loc: Ht(t - 4, e + 3) });
}, onend() {
  let t = Cs.length;
  for (let e = 0; e < Bt.length; e++) yo(Bt[e], t - 1), Bt[e].loc.start.offset;
}, oncdata(t, e) {
  Bt[0].ns !== 0 && za(le(t, e), t, e);
}, onprocessinginstruction(t) {
  (Bt[0] ? Bt[0].ns : Lt.ns) === 0 && fu(21, t - 1);
} }), hu = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, x0 = /^\(|\)$/g;
function le(t, e) {
  return Cs.slice(t, e);
}
function uu(t) {
  zt.inSFCRoot && (he.innerLoc = Ht(t + 1, t + 1)), jl(he);
  let { tag: e, ns: s } = he;
  s === 0 && Lt.isPreTag(e) && Xc++, Lt.isVoidTag(e) ? yo(he, t) : (Bt.unshift(he), (s === 1 || s === 2) && (zt.inXML = !0)), he = null;
}
function za(t, e, s) {
  {
    let a = Bt[0] && Bt[0].tag;
    a !== "script" && a !== "style" && t.includes("&") && (t = Lt.decodeEntities(t, !1));
  }
  let n = Bt[0] || Xo, i = n.children[n.children.length - 1];
  i && i.type === 2 ? (i.content += t, pn(i.loc, s)) : n.children.push({ type: 2, content: t, loc: Ht(e, s) });
}
function yo(t, e, s = !1) {
  s ? pn(t.loc, hg(e, 60)) : pn(t.loc, function(o) {
    let r = o;
    for (; Cs.charCodeAt(r) !== 62 && r < Cs.length - 1; ) r++;
    return r;
  }(e) + 1), zt.inSFCRoot && (t.children.length ? t.innerLoc.end = gt({}, t.children[t.children.length - 1].loc.end) : t.innerLoc.end = gt({}, t.innerLoc.start), t.innerLoc.source = le(t.innerLoc.start.offset, t.innerLoc.end.offset));
  let { tag: n, ns: i, children: a } = t;
  if (!dn && (n === "slot" ? t.tagType = 2 : function({ tag: o, props: r }) {
    if (o === "template") {
      for (let l = 0; l < r.length; l++) if (r[l].type === 7 && v0.has(r[l].name)) return !0;
    }
    return !1;
  }(t) ? t.tagType = 3 : function({ tag: o, props: r }) {
    var l;
    if (Lt.isCustomElement(o)) return !1;
    if (o === "component" || (l = o.charCodeAt(0)) > 64 && l < 91 || ng(o) || Lt.isBuiltInComponent && Lt.isBuiltInComponent(o) || Lt.isNativeTag && !Lt.isNativeTag(o)) return !0;
    for (let c = 0; c < r.length; c++) {
      let h = r[c];
      if (h.type === 6 && h.name === "is" && h.value && h.value.content.startsWith("vue:")) return !0;
    }
    return !1;
  }(t) && (t.tagType = 1)), zt.inRCDATA || (t.children = ug(a)), i === 0 && Lt.isIgnoreNewlineTag(n)) {
    let o = a[0];
    o && o.type === 2 && (o.content = o.content.replace(/^\r?\n/, ""));
  }
  i === 0 && Lt.isPreTag(n) && Xc--, $l === t && (dn = zt.inVPre = !1, $l = null), zt.inXML && (Bt[0] ? Bt[0].ns : Lt.ns) === 0 && (zt.inXML = !1);
}
function hg(t, e) {
  let s = t;
  for (; Cs.charCodeAt(s) !== e && s >= 0; ) s--;
  return s;
}
let v0 = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]), S0 = /\r\n/g;
function ug(t) {
  let e = Lt.whitespace !== "preserve", s = !1;
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    if (i.type === 2) if (Xc) i.content = i.content.replace(S0, `
`);
    else if (rg(i.content)) {
      let a = t[n - 1] && t[n - 1].type, o = t[n + 1] && t[n + 1].type;
      !a || !o || e && (a === 3 && (o === 3 || o === 1) || a === 1 && (o === 3 || o === 1 && function(r) {
        for (let l = 0; l < r.length; l++) {
          let c = r.charCodeAt(l);
          if (c === 10 || c === 13) return !0;
        }
        return !1;
      }(i.content))) ? (s = !0, t[n] = null) : i.content = " ";
    } else e && (i.content = fg(i.content));
  }
  return s ? t.filter(Boolean) : t;
}
function fg(t) {
  let e = "", s = !1;
  for (let n = 0; n < t.length; n++) Re(t.charCodeAt(n)) ? s || (e += " ", s = !0) : (e += t[n], s = !1);
  return e;
}
function jl(t) {
  (Bt[0] || Xo).children.push(t);
}
function Ht(t, e) {
  return { start: zt.getPos(t), end: e == null ? e : zt.getPos(e), source: e == null ? e : le(t, e) };
}
function pn(t, e) {
  t.end = zt.getPos(e), t.source = le(t.start.offset, e);
}
function Ga(t, e = !1, s, n = 0, i = 0) {
  return dt(t, e, s, n);
}
function fu(t, e, s) {
  Lt.onError(At(t, Ht(e, e)));
}
function du(t) {
  let e = t.children.filter((s) => s.type !== 3);
  return e.length !== 1 || e[0].type !== 1 || Yo(e[0]) ? null : e[0];
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
        let h = 3, u = dg(t, e);
        if (u === 0) return s.set(t, 0), 0;
        u < h && (h = u);
        for (let f = 0; f < t.children.length; f++) {
          let d = Oe(t.children[f], e);
          if (d === 0) return s.set(t, 0), 0;
          d < h && (h = d);
        }
        if (h > 1) for (let f = 0; f < t.props.length; f++) {
          let d = t.props[f];
          if (d.type === 7 && d.name === "bind" && d.exp) {
            let p = Oe(d.exp, e);
            if (p === 0) return s.set(t, 0), 0;
            p < h && (h = p);
          }
        }
        if (l.isBlock) {
          var n, i, a, o;
          for (let f = 0; f < t.props.length; f++) if (t.props[f].type === 7) return s.set(t, 0), 0;
          e.removeHelper(An), e.removeHelper((n = e.inSSR, i = l.isComponent, n || i ? Pn : Tn)), l.isBlock = !1, e.helper((a = e.inSSR, o = l.isComponent, a || o ? Ys : Js));
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
let w0 = /* @__PURE__ */ new Set([zc, Gc, ha, Da]);
function dg(t, e) {
  let s = 3, n = pg(t);
  if (n && n.type === 15) {
    let { properties: i } = n;
    for (let a = 0; a < i.length; a++) {
      let o, { key: r, value: l } = i[a], c = Oe(r, e);
      if (c === 0) return c;
      if (c < s && (s = c), (o = l.type === 4 ? Oe(l, e) : l.type === 14 ? function h(u, f) {
        if (u.type === 14 && !ct(u.callee) && w0.has(u.callee)) {
          let d = u.arguments[0];
          if (d.type === 4) return Oe(d, f);
          if (d.type === 14) return h(d, f);
        }
        return 0;
      }(l, e) : 0) === 0) return o;
      o < s && (s = o);
    }
  }
  return s;
}
function pg(t) {
  let e = t.codegenNode;
  if (e.type === 13) return e.props;
}
function Zo(t, e) {
  e.currentNode = t;
  let { nodeTransforms: s } = e, n = [];
  for (let o = 0; o < s.length; o++) {
    let r = s[o](t, e);
    if (r && (nt(r) ? n.push(...r) : n.push(r)), !e.currentNode) return;
    t = e.currentNode;
  }
  switch (t.type) {
    case 3:
      e.ssr || e.helper(Ta);
      break;
    case 5:
      e.ssr || e.helper(Pr);
      break;
    case 9:
      for (let l = 0; l < t.branches.length; l++) Zo(t.branches[l], e);
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
        ct(l) || (e.grandParent = e.parent, e.parent = i, e.childIndex = o, e.onNodeRemoved = r, Zo(l, e));
      }
  }
  e.currentNode = t;
  let a = n.length;
  for (; a--; ) n[a]();
}
function gg(t, e) {
  let s = ct(t) ? (n) => n === t : (n) => t.test(n);
  return (n, i) => {
    if (n.type === 1) {
      let { props: a } = n;
      if (n.tagType === 3 && a.some(y0)) return;
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
let Ua = "/*@__PURE__*/", pu = (t) => `${hi[t]}: _${hi[t]}`;
function gu(t, e, { helper: s, push: n, newline: i, isTS: a }) {
  let o = s(e === "component" ? jc : Wc);
  for (let r = 0; r < t.length; r++) {
    let l = t[r], c = l.endsWith("__self");
    c && (l = l.slice(0, -6)), n(`const ${Bl(l, e)} = ${o}(${JSON.stringify(l)}${c ? ", true" : ""})${a ? "!" : ""}`), r < t.length - 1 && i();
  }
}
function Wl(t, e) {
  let s = t.length > 3;
  e.push("["), s && e.indent(), Li(t, e, s), s && e.deindent(), e.push("]");
}
function Li(t, e, s = !1, n = !0) {
  let { push: i, newline: a } = e;
  for (let o = 0; o < t.length; o++) {
    let r = t[o];
    ct(r) ? i(r, -3) : nt(r) ? Wl(r, e) : _e(r, e), o < t.length - 1 && (s ? (n && i(","), a()) : n && i(", "));
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
      mu(t, e);
      break;
    case 5:
      (function(a, o) {
        let { push: r, helper: l, pure: c } = o;
        c && r(Ua), r(`${l(Pr)}(`), _e(a.content, o), r(")");
      })(t, e);
      break;
    case 8:
      yu(t, e);
      break;
    case 3:
      (function(a, o) {
        let { push: r, helper: l, pure: c } = o;
        c && r(Ua), r(`${l(Ta)}(${JSON.stringify(a.content)})`, -3, a);
      })(t, e);
      break;
    case 13:
      (function(a, o) {
        var r, l;
        let c, { push: h, helper: u, pure: f } = o, { tag: d, props: p, children: g, patchFlag: m, dynamicProps: _, directives: y, isBlock: b, disableTracking: v, isComponent: w } = a;
        m && (c = String(m)), y && h(u(Vc) + "("), b && h(`(${u(An)}(${v ? "true" : ""}), `), f && h(Ua), h(u(b ? (r = o.inSSR, r || w ? Pn : Tn) : (l = o.inSSR, l || w ? Ys : Js)) + "(", -2, a), Li(function(S) {
          let x = S.length;
          for (; x-- && S[x] == null; ) ;
          return S.slice(0, x + 1).map((k) => k || "null");
        }([d, p, g, c, _]), o), h(")"), b && h(")"), y && (h(", "), _e(y, o), h(")"));
      })(t, e);
      break;
    case 14:
      (function(a, o) {
        let { push: r, helper: l, pure: c } = o, h = ct(a.callee) ? a.callee : l(a.callee);
        c && r(Ua), r(h + "(", -2, a), Li(a.arguments, o), r(")");
      })(t, e);
      break;
    case 15:
      (function(a, o) {
        let { push: r, indent: l, deindent: c, newline: h } = o, { properties: u } = a;
        if (!u.length) return r("{}", -2, a);
        let f = u.length > 1;
        r(f ? "{" : "{ "), f && l();
        for (let d = 0; d < u.length; d++) {
          let { key: p, value: g } = u[d];
          (function(m, _) {
            let { push: y } = _;
            if (m.type === 8) y("["), yu(m, _), y("]");
            else if (m.isStatic) {
              let b;
              y((b = m.content, Nl.test(b) ? JSON.stringify(m.content) : m.content), -2, m);
            } else y(`[${m.content}]`, -3, m);
          })(p, o), r(": "), _e(g, o), d < u.length - 1 && (r(","), h());
        }
        f && c(), r(f ? "}" : " }");
      })(t, e);
      break;
    case 17:
      n = t, i = e, Wl(n.elements, i);
      break;
    case 18:
      (function(a, o) {
        let { push: r, indent: l, deindent: c } = o, { params: h, returns: u, body: f, newline: d, isSlot: p } = a;
        p && r(`_${hi[qc]}(`), r("(", -2, a), nt(h) ? Li(h, o) : h && _e(h, o), r(") => "), (d || f) && (r("{"), l()), u ? (d && r("return "), nt(u) ? Wl(u, o) : _e(u, o)) : f && _e(f, o), (d || f) && (c(), r("}")), p && r(")");
      })(t, e);
      break;
    case 19:
      (function(a, o) {
        let { test: r, consequent: l, alternate: c, newline: h } = a, { push: u, indent: f, deindent: d, newline: p } = o;
        if (r.type === 4) {
          let m, _ = (m = r.content, !!Nl.test(m));
          _ && u("("), mu(r, o), _ && u(")");
        } else u("("), _e(r, o), u(")");
        h && f(), o.indentLevel++, h || u(" "), u("? "), _e(l, o), o.indentLevel--, h && p(), h || u(" "), u(": ");
        let g = c.type === 19;
        !g && o.indentLevel++, _e(c, o), !g && o.indentLevel--, h && d(!0);
      })(t, e);
      break;
    case 20:
      (function(a, o) {
        let { push: r, helper: l, indent: c, deindent: h, newline: u } = o, { needPauseTracking: f, needArraySpread: d } = a;
        d && r("[...("), r(`_cache[${a.index}] || (`), f && (c(), r(`${l(Uo)}(-1`), a.inVOnce && r(", true"), r("),"), u(), r("(")), r(`_cache[${a.index}] = `), _e(a.value, o), f && (r(`).cacheIndex = ${a.index},`), u(), r(`${l(Uo)}(1),`), u(), r(`_cache[${a.index}]`), h()), r(")"), d && r(")]");
      })(t, e);
      break;
    case 21:
      Li(t.body, e, !0, !1);
  }
}
function mu(t, e) {
  let { content: s, isStatic: n } = t;
  e.push(n ? JSON.stringify(s) : s, -3, t);
}
function yu(t, e) {
  for (let s = 0; s < t.children.length; s++) {
    let n = t.children[s];
    ct(n) ? e.push(n, -3) : _e(n, e);
  }
}
let C0 = gg(/^(?:if|else|else-if)$/, (t, e, s) => function(n, i, a, o) {
  if (i.name !== "else" && (!i.exp || !i.exp.content.trim())) {
    let l = i.exp ? i.exp.loc : n.loc;
    a.onError(At(28, i.loc)), i.exp = dt("true", !1, l);
  }
  if (i.name === "if") {
    var r;
    let l = bu(n, i), c = { type: 9, loc: Ht((r = n.loc).start.offset, r.end.offset), branches: [l] };
    if (a.replaceNode(c), o) return o(c, l, !0);
  } else {
    let l = a.parent.children, c = l.indexOf(n);
    for (; c-- >= -1; ) {
      let h = l[c];
      if (h && lg(h)) {
        a.removeNode(h);
        continue;
      }
      if (h && h.type === 9) {
        (i.name === "else-if" || i.name === "else") && h.branches[h.branches.length - 1].condition === void 0 && a.onError(At(30, n.loc)), a.removeNode();
        let u = bu(n, i);
        h.branches.push(u);
        let f = o && o(h, u, !1);
        Zo(u, a), f && f(), a.currentNode = null;
      } else a.onError(At(30, n.loc));
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
    a ? n.codegenNode = _u(i, l, s) : function(c) {
      for (; ; ) if (c.type === 19) {
        if (c.alternate.type !== 19) return c;
        c = c.alternate;
      } else c.type === 20 && (c = c.value);
    }(n.codegenNode).alternate = _u(i, l + n.branches.length - 1, s);
  };
}));
function bu(t, e) {
  let s = t.tagType === 3;
  return { type: 10, loc: t.loc, condition: e.name === "else" ? void 0 : e.exp, children: s && !$e(t, "for") ? t.children : [t], userKey: Tr(t, "key"), isTemplateIf: s };
}
function _u(t, e, s) {
  return t.condition ? El(t.condition, xu(t, e, s), Xt(s.helper(Ta), ['""', "true"])) : xu(t, e, s);
}
function xu(t, e, s) {
  let { helper: n } = s, i = Kt("key", dt(`${e}`, !1, Fe, 2)), { children: a } = t, o = a[0];
  if (a.length !== 1 || o.type !== 1) {
    if (a.length !== 1 || o.type !== 11) return ua(s, n(ca), je([i]), a, 64, void 0, void 0, !0, !1, !1, t.loc);
    {
      let r = o.codegenNode;
      return Jo(r, i, s), r;
    }
  }
  {
    let r = o.codegenNode, l = r.type === 14 && r.callee === Kc ? r.arguments[1].returns : r;
    return l.type === 13 && Yc(l, s), Jo(l, i, s), r;
  }
}
let k0 = gg("for", (t, e, s) => {
  let { helper: n, removeHelper: i } = s;
  return function(a, o, r, l) {
    if (!o.exp) return void r.onError(At(31, o.loc));
    let c = o.forParseResult;
    if (!c) return void r.onError(At(32, o.loc));
    mg(c);
    let { scopes: h } = r, { source: u, value: f, key: d, index: p } = c, g = { type: 11, loc: o.loc, source: u, valueAlias: f, keyAlias: d, objectIndexAlias: p, parseResult: c, children: Ko(a) ? a.children : [a] };
    r.replaceNode(g), h.vFor++;
    let m = l && l(g);
    return () => {
      h.vFor--, m && m();
    };
  }(t, e, s, (a) => {
    let o = Xt(n(Hc), [a.source]), r = Ko(t), l = $e(t, "memo"), c = Tr(t, "key", !1, !0);
    c && c.type;
    let h = c && (c.type === 6 ? c.value ? dt(c.value.content, !0) : void 0 : c.exp), u = c && h ? Kt("key", h) : null, f = a.source.type === 4 && a.source.constType > 0, d = f ? 64 : c ? 128 : 256;
    return a.codegenNode = ua(s, n(ca), void 0, o, d, void 0, void 0, !0, !f, !1, t.loc), () => {
      let p, { children: g } = a, m = g.length !== 1 || g[0].type !== 1, _ = Yo(t) ? t : r && t.children.length === 1 && Yo(t.children[0]) ? t.children[0] : null;
      if (_) p = _.codegenNode, r && u && Jo(p, u, s);
      else if (m) p = ua(s, n(ca), u ? je([u]) : void 0, t.children, 64, void 0, void 0, !0, void 0, !1);
      else {
        var y, b, v, w, S, x, k, P;
        p = g[0].codegenNode, r && u && Jo(p, u, s), !f !== p.isBlock && (p.isBlock ? (i(An), i((y = s.inSSR, b = p.isComponent, y || b ? Pn : Tn))) : i((v = s.inSSR, w = p.isComponent, v || w ? Ys : Js))), p.isBlock = !f, p.isBlock ? (n(An), n((S = s.inSSR, x = p.isComponent, S || x ? Pn : Tn))) : n((k = s.inSSR, P = p.isComponent, k || P ? Ys : Js));
      }
      if (l) {
        let F = ui(Vl(a.parseResult, [dt("_cached")]));
        F.body = { type: 21, body: [qe(["const _memo = (", l.exp, ")"]), qe(["if (_cached && _cached.el", ...h ? [" && _cached.key === ", h] : [], ` && ${s.helperString(eg)}(_cached, _memo)) return _cached`]), qe(["const _item = ", p]), dt("_item.memo = _memo"), dt("return _item")], loc: Fe }, o.arguments.push(F, dt("_cache"), dt(String(s.cached.length))), s.cached.push(null);
      } else o.arguments.push(ui(Vl(a.parseResult), p, !0));
    };
  });
});
function mg(t, e) {
  t.finalized || (t.finalized = !0);
}
function Vl({ value: t, key: e, index: s }, n = []) {
  var i = [t, e, s, ...n];
  let a = i.length;
  for (; a-- && !i[a]; ) ;
  return i.slice(0, a + 1).map((o, r) => o || dt("_".repeat(r + 1), !1));
}
let vu = dt("undefined", !1), M0 = (t, e) => {
  if (t.type === 1 && (t.tagType === 1 || t.tagType === 3)) {
    let s = $e(t, "slot");
    if (s) return s.exp, e.scopes.vSlot++, () => {
      e.scopes.vSlot--;
    };
  }
};
function qa(t, e, s) {
  let n = [Kt("name", t), Kt("fn", e)];
  return s != null && n.push(Kt("key", dt(String(s), !0))), je(n);
}
let yg = /* @__PURE__ */ new WeakMap(), A0 = (t, e) => function() {
  let s, n, i, a, o;
  if ((t = e.currentNode).type !== 1 || t.tagType !== 0 && t.tagType !== 1) return;
  let { tag: r, props: l } = t, c = t.tagType === 1, h = c ? function(p, g, m = !1) {
    let { tag: _ } = p, y = Hl(_), b = Tr(p, "is", !1, !0);
    if (b) if (y) {
      let w;
      if (b.type === 6 ? w = b.value && dt(b.value.content, !0) : (w = b.exp) || (w = dt("is", !1, b.arg.loc)), w) return Xt(g.helper(Ll), [w]);
    } else b.type === 6 && b.value.content.startsWith("vue:") && (_ = b.value.content.slice(4));
    let v = ng(_) || g.isBuiltInComponent(_);
    return v ? (m || g.helper(v), v) : (g.helper(jc), g.components.add(_), Bl(_, "component"));
  }(t, e) : `"${r}"`, u = St(h) && h.callee === Ll, f = 0, d = u || h === qi || h === Bc || !c && (r === "svg" || r === "foreignObject" || r === "math");
  if (l.length > 0) {
    let p = bg(t, e, void 0, c, u);
    s = p.props, f = p.patchFlag, a = p.dynamicPropNames;
    let g = p.directives;
    o = g && g.length ? vn(g.map((m) => function(_, y) {
      let b = [], v = yg.get(_);
      v ? b.push(y.helperString(v)) : (y.helper(Wc), y.directives.add(_.name), b.push(Bl(_.name, "directive")));
      let { loc: w } = _;
      if (_.exp && b.push(_.exp), _.arg && (_.exp || b.push("void 0"), b.push(_.arg)), Object.keys(_.modifiers).length) {
        _.arg || (_.exp || b.push("void 0"), b.push("void 0"));
        let S = dt("true", !1, w);
        b.push(je(_.modifiers.map((x) => Kt(x, S)), w));
      }
      return vn(b, _.loc);
    }(m, e))) : void 0, p.shouldUseBlock && (d = !0);
  }
  if (t.children.length > 0) if (h === zo && (d = !0, f |= 1024), c && h !== qi && h !== zo) {
    let { slots: p, hasDynamicSlots: g } = function(m, _, y = (b, v, w, S) => ui(b, w, !1, !0, w.length ? w[0].loc : S)) {
      _.helper(qc);
      let { children: b, loc: v } = m, w = [], S = [], x = _.scopes.vSlot > 0 || _.scopes.vFor > 0, k = $e(m, "slot", !0);
      if (k) {
        let { arg: M, exp: T } = k;
        M && !Pe(M) && (x = !0), w.push(Kt(M || dt("default", !0), y(T, void 0, b, v)));
      }
      let P = !1, F = !1, E = [], C = /* @__PURE__ */ new Set(), N = 0;
      for (let M = 0; M < b.length; M++) {
        let T, O, V, K, Z = b[M];
        if (!Ko(Z) || !(T = $e(Z, "slot", !0))) {
          Z.type !== 3 && E.push(Z);
          continue;
        }
        if (k) {
          _.onError(At(37, T.loc));
          break;
        }
        P = !0;
        let { children: et, loc: ft } = Z, { arg: lt = dt("default", !0), exp: pt, loc: _t } = T;
        Pe(lt) ? O = lt ? lt.content : "default" : x = !0;
        let Y = $e(Z, "for"), q = y(pt, Y, et, ft);
        if (V = $e(Z, "if")) x = !0, S.push(El(V.exp, qa(lt, q, N++), vu));
        else if (K = $e(Z, /^else(?:-if)?$/, !0)) {
          let U, at = M;
          for (; at-- && lg(U = b[at]); ) ;
          if (U && Ko(U) && $e(U, /^(?:else-)?if$/)) {
            let A = S[S.length - 1];
            for (; A.alternate.type === 19; ) A = A.alternate;
            A.alternate = K.exp ? El(K.exp, qa(lt, q, N++), vu) : qa(lt, q, N++);
          } else _.onError(At(30, K.loc));
        } else if (Y) {
          x = !0;
          let U = Y.forParseResult;
          U ? (mg(U), S.push(Xt(_.helper(Hc), [U.source, ui(Vl(U), qa(lt, q), !0)]))) : _.onError(At(32, Y.loc));
        } else {
          if (O) {
            if (C.has(O)) {
              _.onError(At(38, _t));
              continue;
            }
            C.add(O), O === "default" && (F = !0);
          }
          w.push(Kt(lt, q));
        }
      }
      if (!k) {
        let M = (T, O) => Kt("default", y(T, void 0, O, v));
        P ? E.length && !E.every(Jc) && (F ? _.onError(At(39, E[0].loc)) : w.push(M(void 0, E))) : w.push(M(void 0, b));
      }
      let L = x ? 2 : function M(T) {
        for (let O = 0; O < T.length; O++) {
          let V = T[O];
          switch (V.type) {
            case 1:
              if (V.tagType === 2 || M(V.children)) return !0;
              break;
            case 9:
              if (M(V.branches)) return !0;
              break;
            case 10:
            case 11:
              if (M(V.children)) return !0;
          }
        }
        return !1;
      }(m.children) ? 3 : 1, D = je(w.concat(Kt("_", dt(L + "", !1))), v);
      return S.length && (D = Xt(_.helper(tg), [D, vn(S)])), { slots: D, hasDynamicSlots: x };
    }(t, e);
    n = p, g && (f |= 1024);
  } else if (t.children.length === 1 && h !== qi) {
    let p = t.children[0], g = p.type, m = g === 5 || g === 8;
    m && Oe(p, e) === 0 && (f |= 1), n = m || g === 2 ? p : t.children;
  } else n = t.children;
  a && a.length && (i = function(p) {
    let g = "[";
    for (let m = 0, _ = p.length; m < _; m++) g += JSON.stringify(p[m]), m < _ - 1 && (g += ", ");
    return g + "]";
  }(a)), t.codegenNode = ua(e, h, s, n, f === 0 ? void 0 : f, i, o, !!d, !1, c, t.loc);
};
function bg(t, e, s = t.props, n, i, a = !1) {
  let o, { tag: r, loc: l, children: c } = t, h = [], u = [], f = [], d = c.length > 0, p = !1, g = 0, m = !1, _ = !1, y = !1, b = !1, v = !1, w = !1, S = [], x = (F) => {
    h.length && (u.push(je(Su(h), l)), h = []), F && u.push(F);
  }, k = () => {
    e.scopes.vFor > 0 && h.push(Kt(dt("ref_for", !0), dt("true")));
  }, P = ({ key: F, value: E }) => {
    if (Pe(F)) {
      let C = F.content, N = On(C);
      N && (!n || i) && C.toLowerCase() !== "onclick" && C !== "onUpdate:modelValue" && !vs(C) && (b = !0), N && vs(C) && (w = !0), N && E.type === 14 && (E = E.arguments[0]), E.type === 20 || (E.type === 4 || E.type === 8) && Oe(E, e) > 0 || (C === "ref" ? m = !0 : C === "class" ? _ = !0 : C === "style" ? y = !0 : C === "key" || S.includes(C) || S.push(C), n && (C === "class" || C === "style") && !S.includes(C) && S.push(C));
    } else v = !0;
  };
  for (let F = 0; F < s.length; F++) {
    let E = s[F];
    if (E.type === 6) {
      let { loc: C, name: N, nameLoc: L, value: D } = E;
      if (N === "ref" && (m = !0, k()), N === "is" && (Hl(r) || D && D.content.startsWith("vue:"))) continue;
      h.push(Kt(dt(N, !0, L), dt(D ? D.content : "", !0, D ? D.loc : C)));
    } else {
      let { name: C, arg: N, exp: L, loc: D, modifiers: M } = E, T = C === "bind", O = C === "on";
      if (C === "slot") {
        n || e.onError(At(40, D));
        continue;
      }
      if (C === "once" || C === "memo" || C === "is" || T && Yn(N, "is") && Hl(r) || O && a) continue;
      if ((T && Yn(N, "key") || O && d && Yn(N, "vue:before-update")) && (p = !0), T && Yn(N, "ref") && k(), !N && (T || O)) {
        v = !0, L ? T ? (k(), x(), u.push(L)) : x({ type: 14, loc: D, callee: e.helper(Uc), arguments: n ? [L] : [L, "true"] }) : e.onError(At(T ? 34 : 35, D));
        continue;
      }
      T && M.some((K) => K.content === "prop") && (g |= 32);
      let V = e.directiveTransforms[C];
      if (V) {
        let { props: K, needRuntime: Z } = V(E, t, e);
        a || K.forEach(P), O && N && !Pe(N) ? x(je(K, l)) : h.push(...K), Z && (f.push(E), ge(Z) && yg.set(E, Z));
      } else !Fm(C) && (f.push(E), d && (p = !0));
    }
  }
  if (u.length ? (x(), o = u.length > 1 ? Xt(e.helper(Go), u, l) : u[0]) : h.length && (o = je(Su(h), l)), v ? g |= 16 : (_ && !n && (g |= 2), y && !n && (g |= 4), S.length && (g |= 8), b && (g |= 32)), !p && (g === 0 || g === 32) && (m || w || f.length > 0) && (g |= 512), !e.inSSR && o) switch (o.type) {
    case 15:
      let F = -1, E = -1, C = !1;
      for (let D = 0; D < o.properties.length; D++) {
        let M = o.properties[D].key;
        Pe(M) ? M.content === "class" ? F = D : M.content === "style" && (E = D) : M.isHandlerKey || (C = !0);
      }
      let N = o.properties[F], L = o.properties[E];
      C ? o = Xt(e.helper(ha), [o]) : (N && !Pe(N.value) && (N.value = Xt(e.helper(zc), [N.value])), L && (y || L.value.type === 4 && L.value.content.trim()[0] === "[" || L.value.type === 17) && (L.value = Xt(e.helper(Gc), [L.value])));
      break;
    case 14:
      break;
    default:
      o = Xt(e.helper(ha), [Xt(e.helper(Da), [o])]);
  }
  return { props: o, directives: f, patchFlag: g, dynamicPropNames: S, shouldUseBlock: p };
}
function Su(t) {
  let e = /* @__PURE__ */ new Map(), s = [];
  for (let a = 0; a < t.length; a++) {
    var n, i;
    let o = t[a];
    if (o.key.type === 8 || !o.key.isStatic) {
      s.push(o);
      continue;
    }
    let r = o.key.content, l = e.get(r);
    l ? (r === "style" || r === "class" || On(r)) && (n = l, i = o, n.value.type === 17 ? n.value.elements.push(i.value) : n.value = vn([n.value, i.value], n.loc)) : (e.set(r, o), s.push(o));
  }
  return s;
}
function Hl(t) {
  return t === "component" || t === "Component";
}
let P0 = (t, e) => {
  if (Yo(t)) {
    let { children: s, loc: n } = t, { slotName: i, slotProps: a } = function(l, c) {
      let h, u = '"default"', f = [];
      for (let d = 0; d < l.props.length; d++) {
        let p = l.props[d];
        if (p.type === 6) p.value && (p.name === "name" ? u = JSON.stringify(p.value.content) : (p.name = Tt(p.name), f.push(p)));
        else if (p.name === "bind" && Yn(p.arg, "name")) {
          if (p.exp) u = p.exp;
          else if (p.arg && p.arg.type === 4) {
            let g = Tt(p.arg.content);
            u = p.exp = dt(g, !1, p.arg.loc);
          }
        } else p.name === "bind" && p.arg && Pe(p.arg) && (p.arg.content = Tt(p.arg.content)), f.push(p);
      }
      if (f.length > 0) {
        let { props: d, directives: p } = bg(l, c, f, !1, !1);
        h = d, p.length && c.onError(At(36, p[0].loc));
      }
      return { slotName: u, slotProps: h };
    }(t, e), o = [e.prefixIdentifiers ? "_ctx.$slots" : "$slots", i, "{}", "undefined", "true"], r = 2;
    a && (o[2] = a, r = 3), s.length && (o[3] = ui([], s, !1, !1, n), r = 4), e.scopeId && !e.slotted && (r = 5), o.splice(r), t.codegenNode = Xt(e.helper(Qp), o, n);
  }
}, _g = (t, e, s, n) => {
  let i, { loc: a, modifiers: o, arg: r } = t;
  if (!t.exp && o.length, r.type === 4) if (r.isStatic) {
    let u = r.content;
    u.startsWith("vue:") && (u = `vnode-${u.slice(4)}`), i = dt(e.tagType !== 0 || u.startsWith("vnode") || !/[A-Z]/.test(u) ? Zn(Tt(u)) : `on:${u}`, !0, r.loc);
  } else i = qe([`${s.helperString(Fl)}(`, r, ")"]);
  else (i = r).children.unshift(`${s.helperString(Fl)}(`), i.children.push(")");
  let l = t.exp;
  l && !l.content.trim() && (l = void 0);
  let c = s.cacheHandlers && !l && !s.inVOnce;
  if (l) {
    let u, f = og(l), d = !(f || (u = l, m0.test(ag(u)))), p = l.content.includes(";");
    (d || c && f) && (l = qe([`${d ? "$event" : "(...args)"} => ${p ? "{" : "("}`, l, p ? "}" : ")"]));
  }
  let h = { props: [Kt(i, l || dt("() => {}", !1, a))] };
  return n && (h = n(h)), c && (h.props[0].value = s.cache(h.props[0].value)), h.props.forEach((u) => u.key.isHandlerKey = !0), h;
}, T0 = (t, e, s) => {
  let { modifiers: n } = t, i = t.arg, { exp: a } = t;
  return a && a.type === 4 && !a.content.trim() && (a = void 0), i.type !== 4 ? (i.children.unshift("("), i.children.push(') || ""')) : i.isStatic || (i.content = i.content ? `${i.content} || ""` : '""'), n.some((o) => o.content === "camel") && (i.type === 4 ? i.isStatic ? i.content = Tt(i.content) : i.content = `${s.helperString(Ol)}(${i.content})` : (i.children.unshift(`${s.helperString(Ol)}(`), i.children.push(")"))), !s.inSSR && (n.some((o) => o.content === "prop") && wu(i, "."), n.some((o) => o.content === "attr") && wu(i, "^")), { props: [Kt(i, a)] };
}, wu = (t, e) => {
  t.type === 4 ? t.isStatic ? t.content = e + t.content : t.content = `\`${e}\${${t.content}}\`` : (t.children.unshift(`'${e}' + (`), t.children.push(")"));
}, D0 = (t, e) => {
  if (t.type === 0 || t.type === 1 || t.type === 11 || t.type === 10) return () => {
    let s, n = t.children, i = !1;
    for (let a = 0; a < n.length; a++) {
      let o = n[a];
      if (Zr(o)) {
        i = !0;
        for (let r = a + 1; r < n.length; r++) {
          let l = n[r];
          if (Zr(l)) s || (s = n[a] = qe([o], o.loc)), s.children.push(" + ", l), n.splice(r, 1), r--;
          else {
            s = void 0;
            break;
          }
        }
      }
    }
    if (i && (n.length !== 1 || t.type !== 0 && (t.type !== 1 || t.tagType !== 0 || t.props.find((a) => a.type === 7 && !e.directiveTransforms[a.name])))) for (let a = 0; a < n.length; a++) {
      let o = n[a];
      if (Zr(o) || o.type === 8) {
        let r = [];
        (o.type !== 2 || o.content !== " ") && r.push(o), e.ssr || Oe(o, e) !== 0 || r.push("1"), n[a] = { type: 12, content: o, loc: o.loc, codegenNode: Xt(e.helper($c), r) };
      }
    }
  };
}, Cu = /* @__PURE__ */ new WeakSet(), R0 = (t, e) => {
  if (t.type === 1 && $e(t, "once", !0) && !Cu.has(t) && !e.inVOnce && !e.inSSR) return Cu.add(t), e.inVOnce = !0, e.helper(Uo), () => {
    e.inVOnce = !1;
    let s = e.currentNode;
    s.codegenNode && (s.codegenNode = e.cache(s.codegenNode, !0, !0));
  };
}, xg = (t, e, s) => {
  let n, { exp: i, arg: a } = t;
  if (!i) return s.onError(At(41, t.loc)), Ka();
  let o = i.loc.source.trim(), r = i.type === 4 ? i.content : o, l = s.bindingMetadata[o];
  if (l === "props" || l === "props-aliased" || l === "literal-const" || l === "setup-const") return i.loc, Ka();
  if (!r.trim() || !og(i)) return s.onError(At(42, i.loc)), Ka();
  let c = a || dt("modelValue", !0), h = a ? Pe(a) ? `onUpdate:${Tt(a.content)}` : qe(['"onUpdate:" + ', a]) : "onUpdate:modelValue", u = s.isTS ? "($event: any)" : "$event";
  n = qe([`${u} => ((`, i, ") = $event)"]);
  let f = [Kt(c, t.exp), Kt(h, n)];
  if (t.modifiers.length && e.tagType === 1) {
    let d = t.modifiers.map((g) => g.content).map((g) => (Nl.test(g) ? JSON.stringify(g) : g) + ": true").join(", "), p = a ? Pe(a) ? `${a.content}Modifiers` : qe([a, ' + "Modifiers"']) : "modelModifiers";
    f.push(Kt(p, dt(`{ ${d} }`, !1, t.loc, 2)));
  }
  return Ka(f);
};
function Ka(t = []) {
  return { props: t };
}
let ku = /* @__PURE__ */ new WeakSet(), L0 = (t, e) => {
  if (t.type === 1) {
    let s = $e(t, "memo");
    if (!(!s || ku.has(t)) && !e.inSSR) return ku.add(t), () => {
      let n = t.codegenNode || e.currentNode.codegenNode;
      n && n.type === 13 && (t.tagType !== 1 && Yc(n, e), t.codegenNode = Xt(e.helper(Kc), [s.exp, ui(void 0, n), "_cache", String(e.cached.length)]), e.cached.push(null));
    };
  }
}, O0 = (t, e) => {
  if (t.type === 1) {
    for (let s of t.props) if (s.type === 7 && s.name === "bind" && (!s.exp || s.exp.type === 4 && !s.exp.content.trim()) && s.arg) {
      let n = s.arg;
      if (n.type === 4 && n.isStatic) {
        let i = Tt(n.content);
        (ig.test(i[0]) || i[0] === "-") && (s.exp = dt(i, !1, n.loc));
      } else e.onError(At(53, n.loc)), s.exp = dt("", !0, n.loc);
    }
  }
}, vg = Symbol(""), Sg = Symbol(""), wg = Symbol(""), Cg = Symbol(""), zl = Symbol(""), kg = Symbol(""), Mg = Symbol(""), Ag = Symbol(""), Pg = Symbol(""), Tg = Symbol("");
Object.getOwnPropertySymbols(iu = { [vg]: "vModelRadio", [Sg]: "vModelCheckbox", [wg]: "vModelText", [Cg]: "vModelSelect", [zl]: "vModelDynamic", [kg]: "withModifiers", [Mg]: "withKeys", [Ag]: "vShow", [Pg]: "Transition", [Tg]: "TransitionGroup" }).forEach((t) => {
  hi[t] = iu[t];
});
let F0 = { parseMode: "html", isVoidTag: Gm, isNativeTag: (t) => Vm(t) || Hm(t) || zm(t), isPreTag: (t) => t === "pre", isIgnoreNewlineTag: (t) => t === "pre" || t === "textarea", decodeEntities: function(t, e = !1) {
  return Bn || (Bn = document.createElement("div")), e ? (Bn.innerHTML = `<div foo="${t.replace(/"/g, "&quot;")}">`, Bn.children[0].getAttribute("foo")) : (Bn.innerHTML = t, Bn.textContent);
}, isBuiltInComponent: (t) => t === "Transition" || t === "transition" ? Pg : t === "TransitionGroup" || t === "transition-group" ? Tg : void 0, getNamespace(t, e, s) {
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
} }, E0 = Ee("passive,once,capture"), I0 = Ee("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"), N0 = Ee("left,right"), Mu = Ee("onkeyup,onkeydown,onkeypress"), Au = (t, e) => Pe(t) && t.content.toLowerCase() === "onclick" ? dt(e, !0) : t.type !== 4 ? qe(["(", t, `) === "onClick" ? "${e}" : (`, t, ")"]) : t, B0 = (t, e) => {
  t.type === 1 && t.tagType === 0 && (t.tag === "script" || t.tag === "style") && e.removeNode();
}, $0 = [(t) => {
  t.type === 1 && t.props.forEach((e, s) => {
    let n, i;
    e.type === 6 && e.name === "style" && e.value && (t.props[s] = { type: 7, name: "bind", arg: dt("style", !0, e.loc), exp: (n = e.value.content, i = e.loc, dt(JSON.stringify(od(n)), !1, i, 3)), modifiers: [], loc: e.loc });
  });
}], j0 = { cloak: () => ({ props: [] }), html: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(At(54, i)), e.children.length && (s.onError(At(55, i)), e.children.length = 0), { props: [Kt(dt("innerHTML", !0, i), n || dt("", !0))] };
}, text: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(At(56, i)), e.children.length && (s.onError(At(57, i)), e.children.length = 0), { props: [Kt(dt("textContent", !0), n ? Oe(n, s) > 0 ? n : Xt(s.helperString(Pr), [n], i) : dt("", !0))] };
}, model: (t, e, s) => {
  let n = xg(t, e, s);
  if (!n.props.length || e.tagType === 1) return n;
  t.arg && s.onError(At(59, t.arg.loc));
  let { tag: i } = e, a = s.isCustomElement(i);
  if (i === "input" || i === "textarea" || i === "select" || a) {
    let o = wg, r = !1;
    if (i === "input" || a) {
      let l = Tr(e, "type");
      if (l) {
        if (l.type === 7) o = zl;
        else if (l.value) switch (l.value.content) {
          case "radio":
            o = vg;
            break;
          case "checkbox":
            o = Sg;
            break;
          case "file":
            r = !0, s.onError(At(60, t.loc));
        }
      } else e.props.some((c) => c.type === 7 && c.name === "bind" && (!c.arg || c.arg.type !== 4 || !c.arg.isStatic)) && (o = zl);
    } else i === "select" && (o = Cg);
    r || (n.needRuntime = s.helper(o));
  } else s.onError(At(58, t.loc));
  return n.props = n.props.filter((o) => o.key.type !== 4 || o.key.content !== "modelValue"), n;
}, on: (t, e, s) => _g(t, e, s, (n) => {
  let { modifiers: i } = t;
  if (!i.length) return n;
  let { key: a, value: o } = n.props[0], { keyModifiers: r, nonKeyModifiers: l, eventOptionModifiers: c } = ((h, u, f, d) => {
    let p = [], g = [], m = [];
    for (let _ = 0; _ < u.length; _++) {
      let y = u[_].content;
      E0(y) ? m.push(y) : N0(y) ? Pe(h) ? Mu(h.content.toLowerCase()) ? p.push(y) : g.push(y) : (p.push(y), g.push(y)) : I0(y) ? g.push(y) : p.push(y);
    }
    return { keyModifiers: p, nonKeyModifiers: g, eventOptionModifiers: m };
  })(a, i, 0, t.loc);
  if (l.includes("right") && (a = Au(a, "onContextmenu")), l.includes("middle") && (a = Au(a, "onMouseup")), l.length && (o = Xt(s.helper(kg), [o, JSON.stringify(l)])), r.length && (!Pe(a) || Mu(a.content.toLowerCase())) && (o = Xt(s.helper(Mg), [o, JSON.stringify(r)])), c.length) {
    let h = c.map(Fn).join("");
    a = Pe(a) ? dt(`${a.content}${h}`, !0) : qe(["(", a, `) + "${h}"`]);
  }
  return { props: [Kt(a, o)] };
}), show: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(At(62, i)), { props: [], needRuntime: s.helper(Ag) };
} }, Pu = /* @__PURE__ */ Object.create(null);
function W0(t, e) {
  if (!ct(t)) if (t.nodeType) t = t.innerHTML;
  else return ie;
  let s = t + JSON.stringify(e, (r, l) => typeof l == "function" ? l.toString() : l), n = Pu[s];
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
      let f, d = h.onError || Il, p = h.mode === "module";
      h.prefixIdentifiers === !0 ? d(At(48)) : p && d(At(49)), h.cacheHandlers && d(At(50)), h.scopeId && !p && d(At(51));
      let g = gt({}, h, { prefixIdentifiers: !1 }), m = ct(c) ? function(b, v) {
        if (zt.reset(), he = null, Ct = null, De = "", ls = -1, hn = -1, Bt.length = 0, Cs = b, Lt = gt({}, cg), v) {
          let x;
          for (x in v) v[x] != null && (Lt[x] = v[x]);
        }
        zt.mode = Lt.parseMode === "html" ? 1 : 2 * (Lt.parseMode === "sfc"), zt.inXML = Lt.ns === 1 || Lt.ns === 2;
        let w = v && v.delimiters;
        w && (zt.delimiterOpen = qo(w[0]), zt.delimiterClose = qo(w[1]));
        let S = Xo = /* @__PURE__ */ function(x, k = "") {
          return { type: 0, source: k, children: x, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: Fe };
        }([], b);
        return zt.parse(Cs), S.loc = Ht(0, b.length), S.children = ug(S.children), Xo = null, S;
      }(c, g) : c, [_, y] = [[O0, R0, C0, L0, k0, P0, A0, M0, D0], { on: _g, bind: T0, model: xg }];
      return f = function(b, { filename: v = "", prefixIdentifiers: w = !1, hoistStatic: S = !1, hmr: x = !1, cacheHandlers: k = !1, nodeTransforms: P = [], directiveTransforms: F = {}, transformHoist: E = null, isBuiltInComponent: C = ie, isCustomElement: N = ie, expressionPlugins: L = [], scopeId: D = null, slotted: M = !0, ssr: T = !1, inSSR: O = !1, ssrCssVars: V = "", bindingMetadata: K = yt, inline: Z = !1, isTS: et = !1, onError: ft = Il, onWarn: lt = sg, compatConfig: pt }) {
        let _t = v.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), Y = { filename: v, selfName: _t && Fn(Tt(_t[1])), prefixIdentifiers: w, hoistStatic: S, hmr: x, cacheHandlers: k, nodeTransforms: P, directiveTransforms: F, transformHoist: E, isBuiltInComponent: C, isCustomElement: N, expressionPlugins: L, scopeId: D, slotted: M, ssr: T, inSSR: O, ssrCssVars: V, bindingMetadata: K, inline: Z, isTS: et, onError: ft, onWarn: lt, compatConfig: pt, root: b, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: b, childIndex: 0, inVOnce: !1, helper(q) {
          let U = Y.helpers.get(q) || 0;
          return Y.helpers.set(q, U + 1), q;
        }, removeHelper(q) {
          let U = Y.helpers.get(q);
          if (U) {
            let at = U - 1;
            at ? Y.helpers.set(q, at) : Y.helpers.delete(q);
          }
        }, helperString: (q) => `_${hi[Y.helper(q)]}`, replaceNode(q) {
          Y.parent.children[Y.childIndex] = Y.currentNode = q;
        }, removeNode(q) {
          let U = Y.parent.children, at = q ? U.indexOf(q) : Y.currentNode ? Y.childIndex : -1;
          q && q !== Y.currentNode ? Y.childIndex > at && (Y.childIndex--, Y.onNodeRemoved()) : (Y.currentNode = null, Y.onNodeRemoved()), Y.parent.children.splice(at, 1);
        }, onNodeRemoved: ie, addIdentifiers(q) {
        }, removeIdentifiers(q) {
        }, hoist(q) {
          ct(q) && (q = dt(q)), Y.hoists.push(q);
          let U = dt(`_hoisted_${Y.hoists.length}`, !1, q.loc, 2);
          return U.hoisted = q, U;
        }, cache(q, U = !1, at = !1) {
          let A = /* @__PURE__ */ function(R, I, z = !1, $ = !1) {
            return { type: 20, index: R, value: I, needPauseTracking: z, inVOnce: $, needArraySpread: !1, loc: Fe };
          }(Y.cached.length, q, U, at);
          return Y.cached.push(A), A;
        } };
        return Y;
      }(m, u = gt({}, g, { nodeTransforms: [..._, ...h.nodeTransforms || []], directiveTransforms: gt({}, y, h.directiveTransforms || {}) })), Zo(m, f), u.hoistStatic && function b(v, w, S, x = !1, k = !1) {
        let { children: P } = v, F = [];
        for (let L = 0; L < P.length; L++) {
          let D = P[L];
          if (D.type === 1 && D.tagType === 0) {
            let M = x ? 0 : Oe(D, S);
            if (M > 0) {
              if (M >= 2) {
                D.codegenNode.patchFlag = -1, F.push(D);
                continue;
              }
            } else {
              let T = D.codegenNode;
              if (T.type === 13) {
                let O = T.patchFlag;
                if ((O === void 0 || O === 512 || O === 1) && dg(D, S) >= 2) {
                  let V = pg(D);
                  V && (T.props = S.hoist(V));
                }
                T.dynamicProps && (T.dynamicProps = S.hoist(T.dynamicProps));
              }
            }
          } else if (D.type === 12 && (x ? 0 : Oe(D, S)) >= 2) {
            D.codegenNode.type === 14 && D.codegenNode.arguments.length > 0 && D.codegenNode.arguments.push("-1"), F.push(D);
            continue;
          }
          if (D.type === 1) {
            let M = D.tagType === 1;
            M && S.scopes.vSlot++, b(D, v, S, !1, k), M && S.scopes.vSlot--;
          } else if (D.type === 11) b(D, v, S, D.children.length === 1, !0);
          else if (D.type === 9) for (let M = 0; M < D.branches.length; M++) b(D.branches[M], v, S, D.branches[M].children.length === 1, k);
        }
        let E = !1;
        if (F.length === P.length && v.type === 1) {
          if (v.tagType === 0 && v.codegenNode && v.codegenNode.type === 13 && nt(v.codegenNode.children)) v.codegenNode.children = C(vn(v.codegenNode.children)), E = !0;
          else if (v.tagType === 1 && v.codegenNode && v.codegenNode.type === 13 && v.codegenNode.children && !nt(v.codegenNode.children) && v.codegenNode.children.type === 15) {
            let L = N(v.codegenNode, "default");
            L && (L.returns = C(vn(L.returns)), E = !0);
          } else if (v.tagType === 3 && w && w.type === 1 && w.tagType === 1 && w.codegenNode && w.codegenNode.type === 13 && w.codegenNode.children && !nt(w.codegenNode.children) && w.codegenNode.children.type === 15) {
            let L = $e(v, "slot", !0), D = L && L.arg && N(w.codegenNode, L.arg);
            D && (D.returns = C(vn(D.returns)), E = !0);
          }
        }
        if (!E) for (let L of F) L.codegenNode = S.cache(L.codegenNode);
        function C(L) {
          let D = S.cache(L);
          return D.needArraySpread = !0, D;
        }
        function N(L, D) {
          if (L.children && !nt(L.children) && L.children.type === 15) {
            let M = L.children.properties.find((T) => T.key === D || T.key.content === D);
            return M && M.value;
          }
        }
        F.length && S.transformHoist && S.transformHoist(P, S, v);
      }(m, void 0, f, !!du(m)), u.ssr || function(b, v) {
        let { helper: w } = v, { children: S } = b;
        if (S.length === 1) {
          let x = du(b);
          if (x && x.codegenNode) {
            let k = x.codegenNode;
            k.type === 13 && Yc(k, v), b.codegenNode = k;
          } else b.codegenNode = S[0];
        } else S.length > 1 && (b.codegenNode = ua(v, w(ca), void 0, b.children, 64, void 0, void 0, !0, void 0, !1));
      }(m, f), m.helpers = /* @__PURE__ */ new Set([...f.helpers.keys()]), m.components = [...f.components], m.directives = [...f.directives], m.imports = f.imports, m.hoists = f.hoists, m.temps = f.temps, m.cached = f.cached, m.transformed = !0, function(b, v = {}) {
        let w = function(T, { mode: O = "function", prefixIdentifiers: V = O === "module", sourceMap: K = !1, filename: Z = "template.vue.html", scopeId: et = null, optimizeImports: ft = !1, runtimeGlobalName: lt = "Vue", runtimeModuleName: pt = "vue", ssrRuntimeModuleName: _t = "vue/server-renderer", ssr: Y = !1, isTS: q = !1, inSSR: U = !1 }) {
          let at = { mode: O, prefixIdentifiers: V, sourceMap: K, filename: Z, scopeId: et, optimizeImports: ft, runtimeGlobalName: lt, runtimeModuleName: pt, ssrRuntimeModuleName: _t, ssr: Y, isTS: q, inSSR: U, source: T.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: !1, map: void 0, helper: (R) => `_${hi[R]}`, push(R, I = -2, z) {
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
        }(b, v);
        v.onContextCreated && v.onContextCreated(w);
        let { mode: S, push: x, prefixIdentifiers: k, indent: P, deindent: F, newline: E, ssr: C } = w, N = Array.from(b.helpers), L = N.length > 0, D = !k && S !== "module";
        (function(T, O) {
          let { push: V, newline: K, runtimeGlobalName: Z } = O, et = Array.from(T.helpers);
          if (et.length > 0 && (V(`const _Vue = ${Z}
`, -1), T.hoists.length)) {
            let ft = [Ys, Js, Ta, $c, Zp].filter((lt) => et.includes(lt)).map(pu).join(", ");
            V(`const { ${ft} } = _Vue
`, -1);
          }
          (function(ft, lt) {
            if (!ft.length) return;
            lt.pure = !0;
            let { push: pt, newline: _t } = lt;
            _t();
            for (let Y = 0; Y < ft.length; Y++) {
              let q = ft[Y];
              q && (pt(`const _hoisted_${Y + 1} = `), _e(q, lt), _t());
            }
            lt.pure = !1;
          })(T.hoists, O), K(), V("return ");
        })(b, w);
        let M = (C ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
        if (x(`function ${C ? "ssrRender" : "render"}(${M}) {`), P(), D && (x("with (_ctx) {"), P(), L && (x(`const { ${N.map(pu).join(", ")} } = _Vue
`, -1), E())), b.components.length && (gu(b.components, "component", w), (b.directives.length || b.temps > 0) && E()), b.directives.length && (gu(b.directives, "directive", w), b.temps > 0 && E()), b.temps > 0) {
          x("let ");
          for (let T = 0; T < b.temps; T++) x(`${T > 0 ? ", " : ""}_temp${T}`);
        }
        return (b.components.length || b.directives.length || b.temps) && (x(`
`, 0), E()), C || x("return "), b.codegenNode ? _e(b.codegenNode, w) : x("null"), D && (F(), x("}")), F(), x("}"), { ast: b, code: w.code, preamble: "", map: w.map ? w.map.toJSON() : void 0 };
      }(m, g);
    }(r, gt({}, F0, l, { nodeTransforms: [B0, ...$0, ...l.nodeTransforms || []], directiveTransforms: gt({}, j0, l.directiveTransforms || {}), transformHoist: null }));
  }(t, i), o = Function("Vue", a)(r0);
  return o._rc = !0, Pu[s] = o;
}
xp(W0);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Ra(t) {
  return t + 0.5 | 0;
}
const js = (t, e, s) => Math.max(Math.min(t, s), e);
function Oi(t) {
  return js(Ra(t * 2.55), 0, 255);
}
function Us(t) {
  return js(Ra(t * 255), 0, 255);
}
function ds(t) {
  return js(Ra(t / 2.55) / 100, 0, 1);
}
function Tu(t) {
  return js(Ra(t * 100), 0, 100);
}
const Be = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Gl = [..."0123456789ABCDEF"], V0 = (t) => Gl[t & 15], H0 = (t) => Gl[(t & 240) >> 4] + Gl[t & 15], Ya = (t) => (t & 240) >> 4 === (t & 15), z0 = (t) => Ya(t.r) && Ya(t.g) && Ya(t.b) && Ya(t.a);
function G0(t) {
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
const U0 = (t, e) => t < 255 ? e(t) : "";
function q0(t) {
  var e = z0(t) ? V0 : H0;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + U0(t.a, e) : void 0;
}
const K0 = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Dg(t, e, s) {
  const n = e * Math.min(s, 1 - s), i = (a, o = (a + t / 30) % 12) => s - n * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [i(0), i(8), i(4)];
}
function Y0(t, e, s) {
  const n = (i, a = (i + t / 60) % 6) => s - s * e * Math.max(Math.min(a, 4 - a, 1), 0);
  return [n(5), n(3), n(1)];
}
function J0(t, e, s) {
  const n = Dg(t, 1, 0.5);
  let i;
  for (e + s > 1 && (i = 1 / (e + s), e *= i, s *= i), i = 0; i < 3; i++)
    n[i] *= 1 - e - s, n[i] += e;
  return n;
}
function X0(t, e, s, n, i) {
  return t === i ? (e - s) / n + (e < s ? 6 : 0) : e === i ? (s - t) / n + 2 : (t - e) / n + 4;
}
function Zc(t) {
  const s = t.r / 255, n = t.g / 255, i = t.b / 255, a = Math.max(s, n, i), o = Math.min(s, n, i), r = (a + o) / 2;
  let l, c, h;
  return a !== o && (h = a - o, c = r > 0.5 ? h / (2 - a - o) : h / (a + o), l = X0(s, n, i, h, a), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function Qc(t, e, s, n) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, s, n)).map(Us);
}
function th(t, e, s) {
  return Qc(Dg, t, e, s);
}
function Z0(t, e, s) {
  return Qc(J0, t, e, s);
}
function Q0(t, e, s) {
  return Qc(Y0, t, e, s);
}
function Rg(t) {
  return (t % 360 + 360) % 360;
}
function t_(t) {
  const e = K0.exec(t);
  let s = 255, n;
  if (!e)
    return;
  e[5] !== n && (s = e[6] ? Oi(+e[5]) : Us(+e[5]));
  const i = Rg(+e[2]), a = +e[3] / 100, o = +e[4] / 100;
  return e[1] === "hwb" ? n = Z0(i, a, o) : e[1] === "hsv" ? n = Q0(i, a, o) : n = th(i, a, o), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function e_(t, e) {
  var s = Zc(t);
  s[0] = Rg(s[0] + e), s = th(s), t.r = s[0], t.g = s[1], t.b = s[2];
}
function s_(t) {
  if (!t)
    return;
  const e = Zc(t), s = e[0], n = Tu(e[1]), i = Tu(e[2]);
  return t.a < 255 ? `hsla(${s}, ${n}%, ${i}%, ${ds(t.a)})` : `hsl(${s}, ${n}%, ${i}%)`;
}
const Du = {
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
}, Ru = {
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
function n_() {
  const t = {}, e = Object.keys(Ru), s = Object.keys(Du);
  let n, i, a, o, r;
  for (n = 0; n < e.length; n++) {
    for (o = r = e[n], i = 0; i < s.length; i++)
      a = s[i], r = r.replace(a, Du[a]);
    a = parseInt(Ru[o], 16), t[r] = [a >> 16 & 255, a >> 8 & 255, a & 255];
  }
  return t;
}
let Ja;
function i_(t) {
  Ja || (Ja = n_(), Ja.transparent = [0, 0, 0, 0]);
  const e = Ja[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const a_ = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function o_(t) {
  const e = a_.exec(t);
  let s = 255, n, i, a;
  if (e) {
    if (e[7] !== n) {
      const o = +e[7];
      s = e[8] ? Oi(o) : js(o * 255, 0, 255);
    }
    return n = +e[1], i = +e[3], a = +e[5], n = 255 & (e[2] ? Oi(n) : js(n, 0, 255)), i = 255 & (e[4] ? Oi(i) : js(i, 0, 255)), a = 255 & (e[6] ? Oi(a) : js(a, 0, 255)), {
      r: n,
      g: i,
      b: a,
      a: s
    };
  }
}
function r_(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${ds(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const Qr = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, Wn = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function l_(t, e, s) {
  const n = Wn(ds(t.r)), i = Wn(ds(t.g)), a = Wn(ds(t.b));
  return {
    r: Us(Qr(n + s * (Wn(ds(e.r)) - n))),
    g: Us(Qr(i + s * (Wn(ds(e.g)) - i))),
    b: Us(Qr(a + s * (Wn(ds(e.b)) - a))),
    a: t.a + s * (e.a - t.a)
  };
}
function Xa(t, e, s) {
  if (t) {
    let n = Zc(t);
    n[e] = Math.max(0, Math.min(n[e] + n[e] * s, e === 0 ? 360 : 1)), n = th(n), t.r = n[0], t.g = n[1], t.b = n[2];
  }
}
function Lg(t, e) {
  return t && Object.assign(e || {}, t);
}
function Lu(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = Us(t[3]))) : (e = Lg(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = Us(e.a)), e;
}
function c_(t) {
  return t.charAt(0) === "r" ? o_(t) : t_(t);
}
class fa {
  constructor(e) {
    if (e instanceof fa)
      return e;
    const s = typeof e;
    let n;
    s === "object" ? n = Lu(e) : s === "string" && (n = G0(e) || i_(e) || c_(e)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Lg(this._rgb);
    return e && (e.a = ds(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Lu(e);
  }
  rgbString() {
    return this._valid ? r_(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? q0(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? s_(this._rgb) : void 0;
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
    return e && (this._rgb = l_(this._rgb, e._rgb, s)), this;
  }
  clone() {
    return new fa(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = Us(e), this;
  }
  clearer(e) {
    const s = this._rgb;
    return s.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, s = Ra(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
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
    return Xa(this._rgb, 2, e), this;
  }
  darken(e) {
    return Xa(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return Xa(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return Xa(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return e_(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function rs() {
}
const h_ = /* @__PURE__ */ (() => {
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
function $t(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function Le(t, e) {
  return $t(t) ? t : e;
}
function ut(t, e) {
  return typeof t > "u" ? e : t;
}
const u_ = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, Og = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function Rt(t, e, s) {
  if (t && typeof t.call == "function")
    return t.apply(s, e);
}
function Mt(t, e, s, n) {
  let i, a, o;
  if (Ft(t))
    for (a = t.length, i = 0; i < a; i++)
      e.call(s, t[i], i);
  else if (bt(t))
    for (o = Object.keys(t), a = o.length, i = 0; i < a; i++)
      e.call(s, t[o[i]], o[i]);
}
function Qo(t, e) {
  let s, n, i, a;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (s = 0, n = t.length; s < n; ++s)
    if (i = t[s], a = e[s], i.datasetIndex !== a.datasetIndex || i.index !== a.index)
      return !1;
  return !0;
}
function tr(t) {
  if (Ft(t))
    return t.map(tr);
  if (bt(t)) {
    const e = /* @__PURE__ */ Object.create(null), s = Object.keys(t), n = s.length;
    let i = 0;
    for (; i < n; ++i)
      e[s[i]] = tr(t[s[i]]);
    return e;
  }
  return t;
}
function Fg(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function f_(t, e, s, n) {
  if (!Fg(t))
    return;
  const i = e[t], a = s[t];
  bt(i) && bt(a) ? da(i, a, n) : e[t] = tr(a);
}
function da(t, e, s) {
  const n = Ft(e) ? e : [
    e
  ], i = n.length;
  if (!bt(t))
    return t;
  s = s || {};
  const a = s.merger || f_;
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
function Ki(t, e) {
  return da(t, e, {
    merger: d_
  });
}
function d_(t, e, s) {
  if (!Fg(t))
    return;
  const n = e[t], i = s[t];
  bt(n) && bt(i) ? Ki(n, i) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = tr(i));
}
const Ou = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function p_(t) {
  const e = t.split("."), s = [];
  let n = "";
  for (const i of e)
    n += i, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
  return s;
}
function g_(t) {
  const e = p_(t);
  return (s) => {
    for (const n of e) {
      if (n === "")
        break;
      s = s && s[n];
    }
    return s;
  };
}
function Xs(t, e) {
  return (Ou[e] || (Ou[e] = g_(e)))(t);
}
function eh(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const pa = (t) => typeof t < "u", Zs = (t) => typeof t == "function", Fu = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const s of t)
    if (!e.has(s))
      return !1;
  return !0;
};
function m_(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const vt = Math.PI, Ot = 2 * vt, y_ = Ot + vt, er = Number.POSITIVE_INFINITY, b_ = vt / 180, Ut = vt / 2, an = vt / 4, Eu = vt * 2 / 3, Ws = Math.log10, ns = Math.sign;
function Yi(t, e, s) {
  return Math.abs(t - e) < s;
}
function Iu(t) {
  const e = Math.round(t);
  t = Yi(t, e, t / 1e3) ? e : t;
  const s = Math.pow(10, Math.floor(Ws(t))), n = t / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function __(t) {
  const e = [], s = Math.sqrt(t);
  let n;
  for (n = 1; n < s; n++)
    t % n === 0 && (e.push(n), e.push(t / n));
  return s === (s | 0) && e.push(s), e.sort((i, a) => i - a).pop(), e;
}
function x_(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function fi(t) {
  return !x_(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function v_(t, e) {
  const s = Math.round(t);
  return s - e <= t && s + e >= t;
}
function Eg(t, e, s) {
  let n, i, a;
  for (n = 0, i = t.length; n < i; n++)
    a = t[n][s], isNaN(a) || (e.min = Math.min(e.min, a), e.max = Math.max(e.max, a));
}
function ze(t) {
  return t * (vt / 180);
}
function sh(t) {
  return t * (180 / vt);
}
function Nu(t) {
  if (!$t(t))
    return;
  let e = 1, s = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, s++;
  return s;
}
function Ig(t, e) {
  const s = e.x - t.x, n = e.y - t.y, i = Math.sqrt(s * s + n * n);
  let a = Math.atan2(n, s);
  return a < -0.5 * vt && (a += Ot), {
    angle: a,
    distance: i
  };
}
function Ul(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function S_(t, e) {
  return (t - e + y_) % Ot - vt;
}
function fe(t) {
  return (t % Ot + Ot) % Ot;
}
function ga(t, e, s, n) {
  const i = fe(t), a = fe(e), o = fe(s), r = fe(a - i), l = fe(o - i), c = fe(i - a), h = fe(i - o);
  return i === a || i === o || n && a === o || r > l && c < h;
}
function se(t, e, s) {
  return Math.max(e, Math.min(s, t));
}
function w_(t) {
  return se(t, -32768, 32767);
}
function bs(t, e, s, n = 1e-6) {
  return t >= Math.min(e, s) - n && t <= Math.max(e, s) + n;
}
function nh(t, e, s) {
  s = s || ((o) => t[o] < e);
  let n = t.length - 1, i = 0, a;
  for (; n - i > 1; )
    a = i + n >> 1, s(a) ? i = a : n = a;
  return {
    lo: i,
    hi: n
  };
}
const _s = (t, e, s, n) => nh(t, s, n ? (i) => {
  const a = t[i][e];
  return a < s || a === s && t[i + 1][e] === s;
} : (i) => t[i][e] < s), C_ = (t, e, s) => nh(t, s, (n) => t[n][e] >= s);
function k_(t, e, s) {
  let n = 0, i = t.length;
  for (; n < i && t[n] < e; )
    n++;
  for (; i > n && t[i - 1] > s; )
    i--;
  return n > 0 || i < t.length ? t.slice(n, i) : t;
}
const Ng = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function M_(t, e) {
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
  }), Ng.forEach((s) => {
    const n = "_onData" + eh(s), i = t[s];
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
function Bu(t, e) {
  const s = t._chartjs;
  if (!s)
    return;
  const n = s.listeners, i = n.indexOf(e);
  i !== -1 && n.splice(i, 1), !(n.length > 0) && (Ng.forEach((a) => {
    delete t[a];
  }), delete t._chartjs);
}
function Bg(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const $g = function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
}();
function jg(t, e) {
  let s = [], n = !1;
  return function(...i) {
    s = i, n || (n = !0, $g.call(window, () => {
      n = !1, t.apply(e, s);
    }));
  };
}
function A_(t, e) {
  let s;
  return function(...n) {
    return e ? (clearTimeout(s), s = setTimeout(t, e, n)) : t.apply(this, n), e;
  };
}
const ih = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", ce = (t, e, s) => t === "start" ? e : t === "end" ? s : (e + s) / 2, P_ = (t, e, s, n) => t === (n ? "left" : "right") ? s : t === "center" ? (e + s) / 2 : e;
function Wg(t, e, s) {
  const n = e.length;
  let i = 0, a = n;
  if (t._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = t, c = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, h = o.axis, { min: u, max: f, minDefined: d, maxDefined: p } = o.getUserBounds();
    if (d) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        _s(l, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? n : _s(e, h, o.getPixelForValue(u)).lo
      ), c) {
        const g = l.slice(0, i + 1).reverse().findIndex((m) => !mt(m[r.axis]));
        i -= Math.max(0, g);
      }
      i = se(i, 0, n - 1);
    }
    if (p) {
      let g = Math.max(
        // @ts-expect-error Need to type _parsed
        _s(l, o.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : _s(e, h, o.getPixelForValue(f), !0).hi + 1
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
function Vg(t) {
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
const Za = (t) => t === 0 || t === 1, $u = (t, e, s) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * Ot / s)), ju = (t, e, s) => Math.pow(2, -10 * t) * Math.sin((t - e) * Ot / s) + 1, Ji = {
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
  easeInSine: (t) => -Math.cos(t * Ut) + 1,
  easeOutSine: (t) => Math.sin(t * Ut),
  easeInOutSine: (t) => -0.5 * (Math.cos(vt * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => Za(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => Za(t) ? t : $u(t, 0.075, 0.3),
  easeOutElastic: (t) => Za(t) ? t : ju(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return Za(t) ? t : t < 0.5 ? 0.5 * $u(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * ju(t * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (t) => 1 - Ji.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? Ji.easeInBounce(t * 2) * 0.5 : Ji.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function ah(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function Wu(t) {
  return ah(t) ? t : new fa(t);
}
function tl(t) {
  return ah(t) ? t : new fa(t).saturate(0.5).darken(0.1).hexString();
}
const T_ = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], D_ = [
  "color",
  "borderColor",
  "backgroundColor"
];
function R_(t) {
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
      properties: D_
    },
    numbers: {
      type: "number",
      properties: T_
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
function L_(t) {
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
const Vu = /* @__PURE__ */ new Map();
function O_(t, e) {
  e = e || {};
  const s = t + JSON.stringify(e);
  let n = Vu.get(s);
  return n || (n = new Intl.NumberFormat(t, e), Vu.set(s, n)), n;
}
function La(t, e, s) {
  return O_(e, s).format(t);
}
const Hg = {
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
      (c < 1e-4 || c > 1e15) && (i = "scientific"), a = F_(t, s);
    }
    const o = Ws(Math.abs(a)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: i,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), La(t, n, l);
  },
  logarithmic(t, e, s) {
    if (t === 0)
      return "0";
    const n = s[e].significand || t / Math.pow(10, Math.floor(Ws(t)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(n) || e > 0.8 * s.length ? Hg.numeric.call(this, t, e, s) : "";
  }
};
function F_(t, e) {
  let s = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(s) >= 1 && t !== Math.floor(t) && (s = t - Math.floor(t)), s;
}
var Dr = {
  formatters: Hg
};
function E_(t) {
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
      callback: Dr.formatters.values,
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
const Dn = /* @__PURE__ */ Object.create(null), ql = /* @__PURE__ */ Object.create(null);
function Xi(t, e) {
  if (!e)
    return t;
  const s = e.split(".");
  for (let n = 0, i = s.length; n < i; ++n) {
    const a = s[n];
    t = t[a] || (t[a] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function el(t, e, s) {
  return typeof e == "string" ? da(Xi(t, e), s) : da(Xi(t, ""), e);
}
class I_ {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, i) => tl(i.backgroundColor), this.hoverBorderColor = (n, i) => tl(i.borderColor), this.hoverColor = (n, i) => tl(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(s);
  }
  set(e, s) {
    return el(this, e, s);
  }
  get(e) {
    return Xi(this, e);
  }
  describe(e, s) {
    return el(ql, e, s);
  }
  override(e, s) {
    return el(Dn, e, s);
  }
  route(e, s, n, i) {
    const a = Xi(this, e), o = Xi(this, n), r = "_" + s;
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
var It = /* @__PURE__ */ new I_({
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
  R_,
  L_,
  E_
]);
function N_(t) {
  return !t || mt(t.size) || mt(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function sr(t, e, s, n, i) {
  let a = e[i];
  return a || (a = e[i] = t.measureText(i).width, s.push(i)), a > n && (n = a), n;
}
function B_(t, e, s, n) {
  n = n || {};
  let i = n.data = n.data || {}, a = n.garbageCollect = n.garbageCollect || [];
  n.font !== e && (i = n.data = {}, a = n.garbageCollect = [], n.font = e), t.save(), t.font = e;
  let o = 0;
  const r = s.length;
  let l, c, h, u, f;
  for (l = 0; l < r; l++)
    if (u = s[l], u != null && !Ft(u))
      o = sr(t, i, a, o, u);
    else if (Ft(u))
      for (c = 0, h = u.length; c < h; c++)
        f = u[c], f != null && !Ft(f) && (o = sr(t, i, a, o, f));
  t.restore();
  const d = a.length / 2;
  if (d > s.length) {
    for (l = 0; l < d; l++)
      delete i[a[l]];
    a.splice(0, d);
  }
  return o;
}
function on(t, e, s) {
  const n = t.currentDevicePixelRatio, i = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((e - i) * n) / n + i;
}
function Hu(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function Kl(t, e, s, n) {
  zg(t, e, s, n, null);
}
function zg(t, e, s, n, i) {
  let a, o, r, l, c, h, u, f;
  const d = e.pointStyle, p = e.rotation, g = e.radius;
  let m = (p || 0) * b_;
  if (d && typeof d == "object" && (a = d.toString(), a === "[object HTMLImageElement]" || a === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(s, n), t.rotate(m), t.drawImage(d, -d.width / 2, -d.height / 2, d.width, d.height), t.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (t.beginPath(), d) {
      default:
        i ? t.ellipse(s, n, i / 2, g, 0, 0, Ot) : t.arc(s, n, g, 0, Ot), t.closePath();
        break;
      case "triangle":
        h = i ? i / 2 : g, t.moveTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += Eu, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += Eu, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), t.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, o = Math.cos(m + an) * l, u = Math.cos(m + an) * (i ? i / 2 - c : l), r = Math.sin(m + an) * l, f = Math.sin(m + an) * (i ? i / 2 - c : l), t.arc(s - u, n - r, c, m - vt, m - Ut), t.arc(s + f, n - o, c, m - Ut, m), t.arc(s + u, n + r, c, m, m + Ut), t.arc(s - f, n + o, c, m + Ut, m + vt), t.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * g, h = i ? i / 2 : l, t.rect(s - h, n - l, 2 * h, 2 * l);
          break;
        }
        m += an;
      case "rectRot":
        u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + f, n - o), t.lineTo(s + u, n + r), t.lineTo(s - f, n + o), t.closePath();
        break;
      case "crossRot":
        m += an;
      case "cross":
        u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + f, n - o), t.lineTo(s - f, n + o);
        break;
      case "star":
        u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + f, n - o), t.lineTo(s - f, n + o), m += an, u = Math.cos(m) * (i ? i / 2 : g), o = Math.cos(m) * g, r = Math.sin(m) * g, f = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + f, n - o), t.lineTo(s - f, n + o);
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
function xs(t, e, s) {
  return s = s || 0.5, !e || t && t.x > e.left - s && t.x < e.right + s && t.y > e.top - s && t.y < e.bottom + s;
}
function Rr(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function Lr(t) {
  t.restore();
}
function $_(t, e, s, n, i) {
  if (!e)
    return t.lineTo(s.x, s.y);
  if (i === "middle") {
    const a = (e.x + s.x) / 2;
    t.lineTo(a, e.y), t.lineTo(a, s.y);
  } else i === "after" != !!n ? t.lineTo(e.x, s.y) : t.lineTo(s.x, e.y);
  t.lineTo(s.x, s.y);
}
function j_(t, e, s, n) {
  if (!e)
    return t.lineTo(s.x, s.y);
  t.bezierCurveTo(n ? e.cp1x : e.cp2x, n ? e.cp1y : e.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function W_(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), mt(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function V_(t, e, s, n, i) {
  if (i.strikethrough || i.underline) {
    const a = t.measureText(n), o = e - a.actualBoundingBoxLeft, r = e + a.actualBoundingBoxRight, l = s - a.actualBoundingBoxAscent, c = s + a.actualBoundingBoxDescent, h = i.strikethrough ? (l + c) / 2 : c;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = i.decorationWidth || 2, t.moveTo(o, h), t.lineTo(r, h), t.stroke();
  }
}
function H_(t, e) {
  const s = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = s;
}
function Rn(t, e, s, n, i, a = {}) {
  const o = Ft(e) ? e : [
    e
  ], r = a.strokeWidth > 0 && a.strokeColor !== "";
  let l, c;
  for (t.save(), t.font = i.string, W_(t, a), l = 0; l < o.length; ++l)
    c = o[l], a.backdrop && H_(t, a.backdrop), r && (a.strokeColor && (t.strokeStyle = a.strokeColor), mt(a.strokeWidth) || (t.lineWidth = a.strokeWidth), t.strokeText(c, s, n, a.maxWidth)), t.fillText(c, s, n, a.maxWidth), V_(t, s, n, c, a), n += Number(i.lineHeight);
  t.restore();
}
function ma(t, e) {
  const { x: s, y: n, w: i, h: a, radius: o } = e;
  t.arc(s + o.topLeft, n + o.topLeft, o.topLeft, 1.5 * vt, vt, !0), t.lineTo(s, n + a - o.bottomLeft), t.arc(s + o.bottomLeft, n + a - o.bottomLeft, o.bottomLeft, vt, Ut, !0), t.lineTo(s + i - o.bottomRight, n + a), t.arc(s + i - o.bottomRight, n + a - o.bottomRight, o.bottomRight, Ut, 0, !0), t.lineTo(s + i, n + o.topRight), t.arc(s + i - o.topRight, n + o.topRight, o.topRight, 0, -Ut, !0), t.lineTo(s + o.topLeft, n);
}
const z_ = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, G_ = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function U_(t, e) {
  const s = ("" + t).match(z_);
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
const q_ = (t) => +t || 0;
function oh(t, e) {
  const s = {}, n = bt(e), i = n ? Object.keys(e) : e, a = bt(t) ? n ? (o) => ut(t[o], t[e[o]]) : (o) => t[o] : () => t;
  for (const o of i)
    s[o] = q_(a(o));
  return s;
}
function Gg(t) {
  return oh(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Sn(t) {
  return oh(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function me(t) {
  const e = Gg(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function Zt(t, e) {
  t = t || {}, e = e || It.font;
  let s = ut(t.size, e.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = ut(t.style, e.style);
  n && !("" + n).match(G_) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const i = {
    family: ut(t.family, e.family),
    lineHeight: U_(ut(t.lineHeight, e.lineHeight), s),
    size: s,
    style: n,
    weight: ut(t.weight, e.weight),
    string: ""
  };
  return i.string = N_(i), i;
}
function Fi(t, e, s, n) {
  let i, a, o;
  for (i = 0, a = t.length; i < a; ++i)
    if (o = t[i], o !== void 0 && o !== void 0)
      return o;
}
function K_(t, e, s) {
  const { min: n, max: i } = t, a = Og(e, (i - n) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(n, -Math.abs(a)),
    max: o(i, a)
  };
}
function Qs(t, e) {
  return Object.assign(Object.create(t), e);
}
function rh(t, e = [
  ""
], s, n, i = () => t[0]) {
  const a = s || t;
  typeof n > "u" && (n = Yg("_fallback", t));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: a,
    _fallback: n,
    _getTarget: i,
    override: (r) => rh([
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
      return qg(r, l, () => sx(l, e, t, r));
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
      return Gu(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Gu(r);
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
function di(t, e, s, n) {
  const i = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ug(t, n),
    setContext: (a) => di(t, a, s, n),
    override: (a) => di(t.override(a), e, s, n)
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
      return qg(a, o, () => J_(a, o, r));
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
function Ug(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = e.scriptable, _indexable: n = e.indexable, _allKeys: i = e.allKeys } = t;
  return {
    allKeys: i,
    scriptable: s,
    indexable: n,
    isScriptable: Zs(s) ? s : () => s,
    isIndexable: Zs(n) ? n : () => n
  };
}
const Y_ = (t, e) => t ? t + eh(e) : e, lh = (t, e) => bt(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function qg(t, e, s) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const n = s();
  return t[e] = n, n;
}
function J_(t, e, s) {
  const { _proxy: n, _context: i, _subProxy: a, _descriptors: o } = t;
  let r = n[e];
  return Zs(r) && o.isScriptable(e) && (r = X_(e, r, t, s)), Ft(r) && r.length && (r = Z_(e, r, t, o.isIndexable)), lh(e, r) && (r = di(r, i, a && a[e], o)), r;
}
function X_(t, e, s, n) {
  const { _proxy: i, _context: a, _subProxy: o, _stack: r } = s;
  if (r.has(t))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + t);
  r.add(t);
  let l = e(a, o || n);
  return r.delete(t), lh(t, l) && (l = ch(i._scopes, i, t, l)), l;
}
function Z_(t, e, s, n) {
  const { _proxy: i, _context: a, _subProxy: o, _descriptors: r } = s;
  if (typeof a.index < "u" && n(t))
    return e[a.index % e.length];
  if (bt(e[0])) {
    const l = e, c = i._scopes.filter((h) => h !== l);
    e = [];
    for (const h of l) {
      const u = ch(c, i, t, h);
      e.push(di(u, a, o && o[t], r));
    }
  }
  return e;
}
function Kg(t, e, s) {
  return Zs(t) ? t(e, s) : t;
}
const Q_ = (t, e) => t === !0 ? e : typeof t == "string" ? Xs(e, t) : void 0;
function tx(t, e, s, n, i) {
  for (const a of e) {
    const o = Q_(s, a);
    if (o) {
      t.add(o);
      const r = Kg(o._fallback, s, i);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (o === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function ch(t, e, s, n) {
  const i = e._rootScopes, a = Kg(e._fallback, s, n), o = [
    ...t,
    ...i
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = zu(r, o, s, a || s, n);
  return l === null || typeof a < "u" && a !== s && (l = zu(r, o, a, l, n), l === null) ? !1 : rh(Array.from(r), [
    ""
  ], i, a, () => ex(e, s, n));
}
function zu(t, e, s, n, i) {
  for (; s; )
    s = tx(t, e, s, n, i);
  return s;
}
function ex(t, e, s) {
  const n = t._getTarget();
  e in n || (n[e] = {});
  const i = n[e];
  return Ft(i) && bt(s) ? s : i || {};
}
function sx(t, e, s, n) {
  let i;
  for (const a of e)
    if (i = Yg(Y_(a, t), s), typeof i < "u")
      return lh(t, i) ? ch(s, n, t, i) : i;
}
function Yg(t, e) {
  for (const s of e) {
    if (!s)
      continue;
    const n = s[t];
    if (typeof n < "u")
      return n;
  }
}
function Gu(t) {
  let e = t._keys;
  return e || (e = t._keys = nx(t._scopes)), e;
}
function nx(t) {
  const e = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const n of Object.keys(s).filter((i) => !i.startsWith("_")))
      e.add(n);
  return Array.from(e);
}
function Jg(t, e, s, n) {
  const { iScale: i } = t, { key: a = "r" } = this._parsing, o = new Array(n);
  let r, l, c, h;
  for (r = 0, l = n; r < l; ++r)
    c = r + s, h = e[c], o[r] = {
      r: i.parse(Xs(h, a), c)
    };
  return o;
}
const ix = Number.EPSILON || 1e-14, pi = (t, e) => e < t.length && !t[e].skip && t[e], Xg = (t) => t === "x" ? "y" : "x";
function ax(t, e, s, n) {
  const i = t.skip ? e : t, a = e, o = s.skip ? e : s, r = Ul(a, i), l = Ul(o, a);
  let c = r / (r + l), h = l / (r + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const u = n * c, f = n * h;
  return {
    previous: {
      x: a.x - u * (o.x - i.x),
      y: a.y - u * (o.y - i.y)
    },
    next: {
      x: a.x + f * (o.x - i.x),
      y: a.y + f * (o.y - i.y)
    }
  };
}
function ox(t, e, s) {
  const n = t.length;
  let i, a, o, r, l, c = pi(t, 0);
  for (let h = 0; h < n - 1; ++h)
    if (l = c, c = pi(t, h + 1), !(!l || !c)) {
      if (Yi(e[h], 0, ix)) {
        s[h] = s[h + 1] = 0;
        continue;
      }
      i = s[h] / e[h], a = s[h + 1] / e[h], r = Math.pow(i, 2) + Math.pow(a, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[h] = i * o * e[h], s[h + 1] = a * o * e[h]);
    }
}
function rx(t, e, s = "x") {
  const n = Xg(s), i = t.length;
  let a, o, r, l = pi(t, 0);
  for (let c = 0; c < i; ++c) {
    if (o = r, r = l, l = pi(t, c + 1), !r)
      continue;
    const h = r[s], u = r[n];
    o && (a = (h - o[s]) / 3, r[`cp1${s}`] = h - a, r[`cp1${n}`] = u - a * e[c]), l && (a = (l[s] - h) / 3, r[`cp2${s}`] = h + a, r[`cp2${n}`] = u + a * e[c]);
  }
}
function lx(t, e = "x") {
  const s = Xg(e), n = t.length, i = Array(n).fill(0), a = Array(n);
  let o, r, l, c = pi(t, 0);
  for (o = 0; o < n; ++o)
    if (r = l, l = c, c = pi(t, o + 1), !!l) {
      if (c) {
        const h = c[e] - l[e];
        i[o] = h !== 0 ? (c[s] - l[s]) / h : 0;
      }
      a[o] = r ? c ? ns(i[o - 1]) !== ns(i[o]) ? 0 : (i[o - 1] + i[o]) / 2 : i[o - 1] : i[o];
    }
  ox(t, i, a), rx(t, a, e);
}
function Qa(t, e, s) {
  return Math.max(Math.min(t, s), e);
}
function cx(t, e) {
  let s, n, i, a, o, r = xs(t[0], e);
  for (s = 0, n = t.length; s < n; ++s)
    o = a, a = r, r = s < n - 1 && xs(t[s + 1], e), a && (i = t[s], o && (i.cp1x = Qa(i.cp1x, e.left, e.right), i.cp1y = Qa(i.cp1y, e.top, e.bottom)), r && (i.cp2x = Qa(i.cp2x, e.left, e.right), i.cp2y = Qa(i.cp2y, e.top, e.bottom)));
}
function hx(t, e, s, n, i) {
  let a, o, r, l;
  if (e.spanGaps && (t = t.filter((c) => !c.skip)), e.cubicInterpolationMode === "monotone")
    lx(t, i);
  else {
    let c = n ? t[t.length - 1] : t[0];
    for (a = 0, o = t.length; a < o; ++a)
      r = t[a], l = ax(c, r, t[Math.min(a + 1, o - (n ? 0 : 1)) % o], e.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  e.capBezierPoints && cx(t, s);
}
function hh() {
  return typeof window < "u" && typeof document < "u";
}
function uh(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function nr(t, e, s) {
  let n;
  return typeof t == "string" ? (n = parseInt(t, 10), t.indexOf("%") !== -1 && (n = n / 100 * e.parentNode[s])) : n = t, n;
}
const Or = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function ux(t, e) {
  return Or(t).getPropertyValue(e);
}
const fx = [
  "top",
  "right",
  "bottom",
  "left"
];
function wn(t, e, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let i = 0; i < 4; i++) {
    const a = fx[i];
    n[a] = parseFloat(t[e + "-" + a + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const dx = (t, e, s) => (t > 0 || e > 0) && (!s || !s.shadowRoot);
function px(t, e) {
  const s = t.touches, n = s && s.length ? s[0] : t, { offsetX: i, offsetY: a } = n;
  let o = !1, r, l;
  if (dx(i, a, t.target))
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
function un(t, e) {
  if ("native" in t)
    return t;
  const { canvas: s, currentDevicePixelRatio: n } = e, i = Or(s), a = i.boxSizing === "border-box", o = wn(i, "padding"), r = wn(i, "border", "width"), { x: l, y: c, box: h } = px(t, s), u = o.left + (h && r.left), f = o.top + (h && r.top);
  let { width: d, height: p } = e;
  return a && (d -= o.width + r.width, p -= o.height + r.height), {
    x: Math.round((l - u) / d * s.width / n),
    y: Math.round((c - f) / p * s.height / n)
  };
}
function gx(t, e, s) {
  let n, i;
  if (e === void 0 || s === void 0) {
    const a = t && uh(t);
    if (!a)
      e = t.clientWidth, s = t.clientHeight;
    else {
      const o = a.getBoundingClientRect(), r = Or(a), l = wn(r, "border", "width"), c = wn(r, "padding");
      e = o.width - c.width - l.width, s = o.height - c.height - l.height, n = nr(r.maxWidth, a, "clientWidth"), i = nr(r.maxHeight, a, "clientHeight");
    }
  }
  return {
    width: e,
    height: s,
    maxWidth: n || er,
    maxHeight: i || er
  };
}
const Vs = (t) => Math.round(t * 10) / 10;
function mx(t, e, s, n) {
  const i = Or(t), a = wn(i, "margin"), o = nr(i.maxWidth, t, "clientWidth") || er, r = nr(i.maxHeight, t, "clientHeight") || er, l = gx(t, e, s);
  let { width: c, height: h } = l;
  if (i.boxSizing === "content-box") {
    const f = wn(i, "border", "width"), d = wn(i, "padding");
    c -= d.width + f.width, h -= d.height + f.height;
  }
  return c = Math.max(0, c - a.width), h = Math.max(0, n ? c / n : h - a.height), c = Vs(Math.min(c, o, l.maxWidth)), h = Vs(Math.min(h, r, l.maxHeight)), c && !h && (h = Vs(c / 2)), (e !== void 0 || s !== void 0) && n && l.height && h > l.height && (h = l.height, c = Vs(Math.floor(h * n))), {
    width: c,
    height: h
  };
}
function Uu(t, e, s) {
  const n = e || 1, i = Vs(t.height * n), a = Vs(t.width * n);
  t.height = Vs(t.height), t.width = Vs(t.width);
  const o = t.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${t.height}px`, o.style.width = `${t.width}px`), t.currentDevicePixelRatio !== n || o.height !== i || o.width !== a ? (t.currentDevicePixelRatio = n, o.height = i, o.width = a, t.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const yx = function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    hh() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
}();
function qu(t, e) {
  const s = ux(t, e), n = s && s.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function fn(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: t.y + s * (e.y - t.y)
  };
}
function bx(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: n === "middle" ? s < 0.5 ? t.y : e.y : n === "after" ? s < 1 ? t.y : e.y : s > 0 ? e.y : t.y
  };
}
function _x(t, e, s, n) {
  const i = {
    x: t.cp2x,
    y: t.cp2y
  }, a = {
    x: e.cp1x,
    y: e.cp1y
  }, o = fn(t, i, s), r = fn(i, a, s), l = fn(a, e, s), c = fn(o, r, s), h = fn(r, l, s);
  return fn(c, h, s);
}
const xx = function(t, e) {
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
}, vx = function() {
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
  return t ? xx(e, s) : vx();
}
function Zg(t, e) {
  let s, n;
  (e === "ltr" || e === "rtl") && (s = t.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", e, "important"), t.prevTextDirection = n);
}
function Qg(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function tm(t) {
  return t === "angle" ? {
    between: ga,
    compare: S_,
    normalize: fe
  } : {
    between: bs,
    compare: (e, s) => e - s,
    normalize: (e) => e
  };
}
function Ku({ start: t, end: e, count: s, loop: n, style: i }) {
  return {
    start: t % s,
    end: e % s,
    loop: n && (e - t + 1) % s === 0,
    style: i
  };
}
function Sx(t, e, s) {
  const { property: n, start: i, end: a } = s, { between: o, normalize: r } = tm(n), l = e.length;
  let { start: c, end: h, loop: u } = t, f, d;
  if (u) {
    for (c += l, h += l, f = 0, d = l; f < d && o(r(e[c % l][n]), i, a); ++f)
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
function em(t, e, s) {
  if (!s)
    return [
      t
    ];
  const { property: n, start: i, end: a } = s, o = e.length, { compare: r, between: l, normalize: c } = tm(n), { start: h, end: u, loop: f, style: d } = Sx(t, e, s), p = [];
  let g = !1, m = null, _, y, b;
  const v = () => l(i, b, _) && r(i, b) !== 0, w = () => r(a, _) === 0 || l(a, b, _), S = () => g || v(), x = () => !g || w();
  for (let k = h, P = h; k <= u; ++k)
    y = e[k % o], !y.skip && (_ = c(y[n]), _ !== b && (g = l(_, i, a), m === null && S() && (m = r(_, i) === 0 ? k : P), m !== null && x() && (p.push(Ku({
      start: m,
      end: k,
      loop: f,
      count: o,
      style: d
    })), m = null), P = k, b = _));
  return m !== null && p.push(Ku({
    start: m,
    end: u,
    loop: f,
    count: o,
    style: d
  })), p;
}
function sm(t, e) {
  const s = [], n = t.segments;
  for (let i = 0; i < n.length; i++) {
    const a = em(n[i], t.points, e);
    a.length && s.push(...a);
  }
  return s;
}
function wx(t, e, s, n) {
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
function Cx(t, e, s, n) {
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
function kx(t, e) {
  const s = t.points, n = t.options.spanGaps, i = s.length;
  if (!i)
    return [];
  const a = !!t._loop, { start: o, end: r } = wx(s, i, a, n);
  if (n === !0)
    return Yu(t, [
      {
        start: o,
        end: r,
        loop: a
      }
    ], s, e);
  const l = r < o ? r + i : r, c = !!t._fullLoop && o === 0 && r === i - 1;
  return Yu(t, Cx(s, o, l, c), s, e);
}
function Yu(t, e, s, n) {
  return !n || !n.setContext || !s ? e : Mx(t, e, s, n);
}
function Mx(t, e, s, n) {
  const i = t._chart.getContext(), a = Ju(t.options), { _datasetIndex: o, options: { spanGaps: r } } = t, l = s.length, c = [];
  let h = a, u = e[0].start, f = u;
  function d(p, g, m, _) {
    const y = r ? -1 : 1;
    if (p !== g) {
      for (p += l; s[p % l].skip; )
        p -= y;
      for (; s[g % l].skip; )
        g += y;
      p % l !== g % l && (c.push({
        start: p % l,
        end: g % l,
        loop: m,
        style: _
      }), h = _, u = g % l);
    }
  }
  for (const p of e) {
    u = r ? u : p.start;
    let g = s[u % l], m;
    for (f = u + 1; f <= p.end; f++) {
      const _ = s[f % l];
      m = Ju(n.setContext(Qs(i, {
        type: "segment",
        p0: g,
        p1: _,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: o
      }))), Ax(m, h) && d(u, f - 1, p.loop, h), g = _, h = m;
    }
    u < f - 1 && d(u, f - 1, p.loop, h);
  }
  return c;
}
function Ju(t) {
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
function Ax(t, e) {
  if (!e)
    return !1;
  const s = [], n = function(i, a) {
    return ah(a) ? (s.includes(a) || s.push(a), s.indexOf(a)) : a;
  };
  return JSON.stringify(t, n) !== JSON.stringify(e, n);
}
function to(t, e, s) {
  return t.options.clip ? t[s] : e[s];
}
function Px(t, e) {
  const { xScale: s, yScale: n } = t;
  return s && n ? {
    left: to(s, e, "left"),
    right: to(s, e, "right"),
    top: to(n, e, "top"),
    bottom: to(n, e, "bottom")
  } : e;
}
function nm(t, e) {
  const s = e._clip;
  if (s.disabled)
    return !1;
  const n = Px(e, t.chartArea);
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
class Tx {
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
    this._request || (this._running = !0, this._request = $g.call(window, () => {
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
var cs = /* @__PURE__ */ new Tx();
const Xu = "transparent", Dx = {
  boolean(t, e, s) {
    return s > 0.5 ? e : t;
  },
  color(t, e, s) {
    const n = Wu(t || Xu), i = n.valid && Wu(e || Xu);
    return i && i.valid ? i.mix(n, s).hexString() : e;
  },
  number(t, e, s) {
    return t + (e - t) * s;
  }
};
class Rx {
  constructor(e, s, n, i) {
    const a = s[n];
    i = Fi([
      e.to,
      i,
      a,
      e.from
    ]);
    const o = Fi([
      e.from,
      a,
      i
    ]);
    this._active = !0, this._fn = e.fn || Dx[e.type || typeof o], this._easing = Ji[e.easing] || Ji.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = s, this._prop = n, this._from = o, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, s, n) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], a = n - this._start, o = this._duration - a;
      this._start = n, this._duration = Math.floor(Math.max(o, e.duration)), this._total += a, this._loop = !!e.loop, this._to = Fi([
        e.to,
        s,
        i,
        e.from
      ]), this._from = Fi([
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
class im {
  constructor(e, s) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(e) {
    if (!bt(e))
      return;
    const s = Object.keys(It.animation), n = this._properties;
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
    const n = s.options, i = Ox(e, n);
    if (!i)
      return [];
    const a = this._createAnimations(i, n);
    return n.$shared && Lx(e.options.$animations, n).then(() => {
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
      a[c] = u = new Rx(f, e, c, h), i.push(u);
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
      return cs.add(this._chart, n), !0;
  }
}
function Lx(t, e) {
  const s = [], n = Object.keys(e);
  for (let i = 0; i < n.length; i++) {
    const a = t[n[i]];
    a && a.active() && s.push(a.wait());
  }
  return Promise.all(s);
}
function Ox(t, e) {
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
function Zu(t, e) {
  const s = t && t.options || {}, n = s.reverse, i = s.min === void 0 ? e : 0, a = s.max === void 0 ? e : 0;
  return {
    start: n ? a : i,
    end: n ? i : a
  };
}
function Fx(t, e, s) {
  if (s === !1)
    return !1;
  const n = Zu(t, s), i = Zu(e, s);
  return {
    top: i.end,
    right: n.end,
    bottom: i.start,
    left: n.start
  };
}
function Ex(t) {
  let e, s, n, i;
  return bt(t) ? (e = t.top, s = t.right, n = t.bottom, i = t.left) : e = s = n = i = t, {
    top: e,
    right: s,
    bottom: n,
    left: i,
    disabled: t === !1
  };
}
function am(t, e) {
  const s = [], n = t._getSortedDatasetMetas(e);
  let i, a;
  for (i = 0, a = n.length; i < a; ++i)
    s.push(n[i].index);
  return s;
}
function Qu(t, e, s, n = {}) {
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
    c = t.values[l], $t(c) && (a || e === 0 || ns(e) === ns(c)) && (e += c);
  }
  return !h && !n.all ? 0 : e;
}
function Ix(t, e) {
  const { iScale: s, vScale: n } = e, i = s.axis === "x" ? "x" : "y", a = n.axis === "x" ? "x" : "y", o = Object.keys(t), r = new Array(o.length);
  let l, c, h;
  for (l = 0, c = o.length; l < c; ++l)
    h = o[l], r[l] = {
      [i]: h,
      [a]: t[h]
    };
  return r;
}
function sl(t, e) {
  const s = t && t.options.stacked;
  return s || s === void 0 && e.stack !== void 0;
}
function Nx(t, e, s) {
  return `${t.id}.${e.id}.${s.stack || s.type}`;
}
function Bx(t) {
  const { min: e, max: s, minDefined: n, maxDefined: i } = t.getUserBounds();
  return {
    min: n ? e : Number.NEGATIVE_INFINITY,
    max: i ? s : Number.POSITIVE_INFINITY
  };
}
function $x(t, e, s) {
  const n = t[e] || (t[e] = {});
  return n[s] || (n[s] = {});
}
function tf(t, e, s, n) {
  for (const i of e.getMatchingVisibleMetas(n).reverse()) {
    const a = t[i.index];
    if (s && a > 0 || !s && a < 0)
      return i.index;
  }
  return null;
}
function ef(t, e) {
  const { chart: s, _cachedMeta: n } = t, i = s._stacks || (s._stacks = {}), { iScale: a, vScale: o, index: r } = n, l = a.axis, c = o.axis, h = Nx(a, o, n), u = e.length;
  let f;
  for (let d = 0; d < u; ++d) {
    const p = e[d], { [l]: g, [c]: m } = p, _ = p._stacks || (p._stacks = {});
    f = _[c] = $x(i, h, g), f[r] = m, f._top = tf(f, o, !0, n.type), f._bottom = tf(f, o, !1, n.type);
    const y = f._visualValues || (f._visualValues = {});
    y[r] = m;
  }
}
function nl(t, e) {
  const s = t.scales;
  return Object.keys(s).filter((n) => s[n].axis === e).shift();
}
function jx(t, e) {
  return Qs(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function Wx(t, e, s) {
  return Qs(t, {
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
function Ci(t, e) {
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
const il = (t) => t === "reset" || t === "none", sf = (t, e) => e ? t : Object.assign({}, t), Vx = (t, e, s) => t && !e.hidden && e._stacked && {
  keys: am(s, !0),
  values: null
};
class Ke {
  constructor(e, s) {
    this.chart = e, this._ctx = e.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = sl(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && Ci(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, s = this._cachedMeta, n = this.getDataset(), i = (u, f, d, p) => u === "x" ? f : u === "r" ? p : d, a = s.xAxisID = ut(n.xAxisID, nl(e, "x")), o = s.yAxisID = ut(n.yAxisID, nl(e, "y")), r = s.rAxisID = ut(n.rAxisID, nl(e, "r")), l = s.indexAxis, c = s.iAxisID = i(l, a, o, r), h = s.vAxisID = i(l, o, a, r);
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
    this._data && Bu(this._data, this), e._stacked && Ci(e);
  }
  _dataCheck() {
    const e = this.getDataset(), s = e.data || (e.data = []), n = this._data;
    if (bt(s)) {
      const i = this._cachedMeta;
      this._data = Ix(s, i);
    } else if (n !== s) {
      if (n) {
        Bu(n, this);
        const i = this._cachedMeta;
        Ci(i), i._parsed = [];
      }
      s && Object.isExtensible(s) && M_(s, this), this._syncList = [], this._data = s;
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
    s._stacked = sl(s.vScale, s), s.stack !== n.stack && (i = !0, Ci(s), s.stack = n.stack), this._resyncElements(e), (i || a !== s._stacked) && (ef(this, s._parsed), s._stacked = sl(s.vScale, s));
  }
  configure() {
    const e = this.chart.config, s = e.datasetScopeKeys(this._type), n = e.getOptionScopes(this.getDataset(), s, !0);
    this.options = e.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, s) {
    const { _cachedMeta: n, _data: i } = this, { iScale: a, _stacked: o } = n, r = a.axis;
    let l = e === 0 && s === i.length ? !0 : n._sorted, c = e > 0 && n._parsed[e - 1], h, u, f;
    if (this._parsing === !1)
      n._parsed = i, n._sorted = !0, f = i;
    else {
      Ft(i[e]) ? f = this.parseArrayData(n, i, e, s) : bt(i[e]) ? f = this.parseObjectData(n, i, e, s) : f = this.parsePrimitiveData(n, i, e, s);
      const d = () => u[r] === null || c && u[r] < c[r];
      for (h = 0; h < s; ++h)
        n._parsed[h + e] = u = f[h], l && (d() && (l = !1), c = u);
      n._sorted = l;
    }
    o && ef(this, f);
  }
  parsePrimitiveData(e, s, n, i) {
    const { iScale: a, vScale: o } = e, r = a.axis, l = o.axis, c = a.getLabels(), h = a === o, u = new Array(i);
    let f, d, p;
    for (f = 0, d = i; f < d; ++f)
      p = f + n, u[f] = {
        [r]: h || a.parse(c[p], p),
        [l]: o.parse(s[p], p)
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
    let h, u, f, d;
    for (h = 0, u = i; h < u; ++h)
      f = h + n, d = s[f], c[h] = {
        x: a.parse(Xs(d, r), f),
        y: o.parse(Xs(d, l), f)
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
      keys: am(i, !0),
      values: s._stacks[e.axis]._visualValues
    };
    return Qu(r, o, a.index, {
      mode: n
    });
  }
  updateRangeFromParsed(e, s, n, i) {
    const a = n[s.axis];
    let o = a === null ? NaN : a;
    const r = i && n._stacks[s.axis];
    i && r && (i.values = r, o = Qu(i, a, this._cachedMeta.index)), e.min = Math.min(e.min, o), e.max = Math.max(e.max, o);
  }
  getMinMax(e, s) {
    const n = this._cachedMeta, i = n._parsed, a = n._sorted && e === n.iScale, o = i.length, r = this._getOtherScale(e), l = Vx(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = Bx(r);
    let f, d;
    function p() {
      d = i[f];
      const g = d[r.axis];
      return !$t(d[e.axis]) || h > g || u < g;
    }
    for (f = 0; f < o && !(!p() && (this.updateRangeFromParsed(c, e, d, l), a)); ++f)
      ;
    if (a) {
      for (f = o - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(c, e, d, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(e) {
    const s = this._cachedMeta._parsed, n = [];
    let i, a, o;
    for (i = 0, a = s.length; i < a; ++i)
      o = s[i][e.axis], $t(o) && n.push(o);
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
    this.update(e || "default"), s._clip = Ex(ut(this.options.clip, Fx(s.xScale, s.yScale, this.getMaxOverflow())));
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
      a = o.$context || (o.$context = Wx(this.getContext(), e, o)), a.parsed = this.getParsed(e), a.raw = i.data[e], a.index = a.dataIndex = e;
    } else
      a = this.$context || (this.$context = jx(this.chart.getContext(), this.index)), a.dataset = i, a.index = a.datasetIndex = this.index;
    return a.active = !!s, a.mode = n, a;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, e);
  }
  _resolveElementOptions(e, s = "default", n) {
    const i = s === "active", a = this._cachedDataOpts, o = e + "-" + s, r = a[o], l = this.enableOptionSharing && pa(n);
    if (r)
      return sf(r, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, e), u = i ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], f = c.getOptionScopes(this.getDataset(), h), d = Object.keys(It.elements[e]), p = () => this.getContext(n, i, s), g = c.resolveNamedOptions(f, d, p, u);
    return g.$shared && (g.$shared = l, a[o] = Object.freeze(sf(g, l))), g;
  }
  _resolveAnimations(e, s, n) {
    const i = this.chart, a = this._cachedDataOpts, o = `animation-${s}`, r = a[o];
    if (r)
      return r;
    let l;
    if (i.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, s), f = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(f, this.getContext(e, n, s));
    }
    const c = new im(i, l && l.animations);
    return l && l._cacheable && (a[o] = Object.freeze(c)), c;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, s) {
    return !s || il(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, s) {
    const n = this.resolveDataElementOptions(e, s), i = this._sharedOptions, a = this.getSharedOptions(n), o = this.includeOptions(s, a) || a !== i;
    return this.updateSharedOptions(a, s, n), {
      sharedOptions: a,
      includeOptions: o
    };
  }
  updateElement(e, s, n, i) {
    il(i) ? Object.assign(e, n) : this._resolveAnimations(s, i).update(e, n);
  }
  updateSharedOptions(e, s, n) {
    e && !il(s) && this._resolveAnimations(void 0, s).update(e, n);
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
      n._stacked && Ci(n, i);
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
Q(Ke, "defaults", {}), Q(Ke, "datasetElementType", null), Q(Ke, "dataElementType", null);
function Hx(t, e) {
  if (!t._cache.$bar) {
    const s = t.getMatchingVisibleMetas(e);
    let n = [];
    for (let i = 0, a = s.length; i < a; i++)
      n = n.concat(s[i].controller.getAllParsedValues(t));
    t._cache.$bar = Bg(n.sort((i, a) => i - a));
  }
  return t._cache.$bar;
}
function zx(t) {
  const e = t.iScale, s = Hx(e, t.type);
  let n = e._length, i, a, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (pa(r) && (n = Math.min(n, Math.abs(o - r) || n)), r = o);
  };
  for (i = 0, a = s.length; i < a; ++i)
    o = e.getPixelForValue(s[i]), l();
  for (r = void 0, i = 0, a = e.ticks.length; i < a; ++i)
    o = e.getPixelForTick(i), l();
  return n;
}
function Gx(t, e, s, n) {
  const i = s.barThickness;
  let a, o;
  return mt(i) ? (a = e.min * s.categoryPercentage, o = s.barPercentage) : (a = i * n, o = 1), {
    chunk: a / n,
    ratio: o,
    start: e.pixels[t] - a / 2
  };
}
function Ux(t, e, s, n) {
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
function qx(t, e, s, n) {
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
function om(t, e, s, n) {
  return Ft(t) ? qx(t, e, s, n) : e[s.axis] = s.parse(t, n), e;
}
function nf(t, e, s, n) {
  const i = t.iScale, a = t.vScale, o = i.getLabels(), r = i === a, l = [];
  let c, h, u, f;
  for (c = s, h = s + n; c < h; ++c)
    f = e[c], u = {}, u[i.axis] = r || i.parse(o[c], c), l.push(om(f, u, a, c));
  return l;
}
function al(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function Kx(t, e, s) {
  return t !== 0 ? ns(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= s ? 1 : -1);
}
function Yx(t) {
  let e, s, n, i, a;
  return t.horizontal ? (e = t.base > t.x, s = "left", n = "right") : (e = t.base < t.y, s = "bottom", n = "top"), e ? (i = "end", a = "start") : (i = "start", a = "end"), {
    start: s,
    end: n,
    reverse: e,
    top: i,
    bottom: a
  };
}
function Jx(t, e, s, n) {
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
  const { start: o, end: r, reverse: l, top: c, bottom: h } = Yx(t);
  i === "middle" && s && (t.enableBorderRadius = !0, (s._top || 0) === n ? i = c : (s._bottom || 0) === n ? i = h : (a[af(h, o, r, l)] = !0, i = c)), a[af(i, o, r, l)] = !0, t.borderSkipped = a;
}
function af(t, e, s, n) {
  return n ? (t = Xx(t, e, s), t = of(t, s, e)) : t = of(t, e, s), t;
}
function Xx(t, e, s) {
  return t === e ? s : t === s ? e : t;
}
function of(t, e, s) {
  return t === "start" ? e : t === "end" ? s : t;
}
function Zx(t, { inflateAmount: e }, s) {
  t.inflateAmount = e === "auto" ? s === 1 ? 0.33 : 0 : e;
}
class bo extends Ke {
  parsePrimitiveData(e, s, n, i) {
    return nf(e, s, n, i);
  }
  parseArrayData(e, s, n, i) {
    return nf(e, s, n, i);
  }
  parseObjectData(e, s, n, i) {
    const { iScale: a, vScale: o } = e, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = a.axis === "x" ? r : l, h = o.axis === "x" ? r : l, u = [];
    let f, d, p, g;
    for (f = n, d = n + i; f < d; ++f)
      g = s[f], p = {}, p[a.axis] = a.parse(Xs(g, c), f), u.push(om(Xs(g, h), p, o, f));
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
    const s = this._cachedMeta, { iScale: n, vScale: i } = s, a = this.getParsed(e), o = a._custom, r = al(o) ? "[" + o.start + ", " + o.end + "]" : "" + i.getLabelForValue(a[i.axis]);
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
    const a = i === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), h = this._getRuler(), { sharedOptions: u, includeOptions: f } = this._getSharedOptions(s, i);
    for (let d = s; d < s + n; d++) {
      const p = this.getParsed(d), g = a || mt(p[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(d), m = this._calculateBarIndexPixels(d, h), _ = (p._stacks || {})[r.axis], y = {
        horizontal: c,
        base: g.base,
        enableBorderRadius: !_ || al(p._custom) || o === _._top || o === _._bottom,
        x: c ? g.head : m.center,
        y: c ? m.center : g.head,
        height: c ? m.size : Math.abs(g.size),
        width: c ? Math.abs(g.size) : m.size
      };
      f && (y.options = u || this.resolveDataElementOptions(d, e[d].active ? "active" : i));
      const b = y.options || e[d].options;
      Jx(y, b, _, o), Zx(y, b, h.ratio), this.updateElement(e[d], d, y, i);
    }
  }
  _getStacks(e, s) {
    const { iScale: n } = this._cachedMeta, i = n.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), a = n.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (h) => {
      const u = h._parsed.find((d) => d[n.axis] === l), f = u && u[h.vScale.axis];
      if (mt(f) || isNaN(f))
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
      min: r || zx(s),
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
    const { _cachedMeta: { vScale: s, _stacked: n, index: i }, options: { base: a, minBarLength: o } } = this, r = a || 0, l = this.getParsed(e), c = l._custom, h = al(c);
    let u = l[s.axis], f = 0, d = n ? this.applyStack(s, l, n) : u, p, g;
    d !== u && (f = d - u, d = u), h && (u = c.barStart, d = c.barEnd - c.barStart, u !== 0 && ns(u) !== ns(c.barEnd) && (f = 0), f += u);
    const m = !mt(a) && !h ? a : f;
    let _ = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(e) ? p = s.getPixelForValue(f + d) : p = _, g = p - _, Math.abs(g) < o) {
      g = Kx(g, s, r) * o, u === r && (_ -= g / 2);
      const y = s.getPixelForDecimal(0), b = s.getPixelForDecimal(1), v = Math.min(y, b), w = Math.max(y, b);
      _ = Math.max(Math.min(_, w), v), p = _ + g, n && !h && (l._stacks[s.axis]._visualValues[i] = s.getValueForPixel(p) - s.getValueForPixel(_));
    }
    if (_ === s.getPixelForValue(r)) {
      const y = ns(g) * s.getLineWidthForValue(r) / 2;
      _ += y, g -= y;
    }
    return {
      size: g,
      base: _,
      head: p,
      center: p + g / 2
    };
  }
  _calculateBarIndexPixels(e, s) {
    const n = s.scale, i = this.options, a = i.skipNull, o = ut(i.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const h = a ? this._getStackCount(e) : s.stackCount, u = i.barThickness === "flex" ? Ux(e, s, i, h * c) : Gx(e, s, i, h * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, d = this._getAxis().indexOf(ut(f, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, a ? e : void 0) + d;
      r = u.start + u.chunk * p + u.chunk / 2, l = Math.min(o, u.chunk * u.ratio);
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
Q(bo, "id", "bar"), Q(bo, "defaults", {
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
}), Q(bo, "overrides", {
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
class _o extends Ke {
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
    for (let f = s; f < s + n; f++) {
      const d = e[f], p = !a && this.getParsed(f), g = {}, m = g[h] = a ? o.getPixelForDecimal(0.5) : o.getPixelForValue(p[h]), _ = g[u] = a ? r.getBasePixel() : r.getPixelForValue(p[u]);
      g.skip = isNaN(m) || isNaN(_), c && (g.options = l || this.resolveDataElementOptions(f, d.active ? "active" : i), a && (g.options.radius = 0)), this.updateElement(d, f, g, i);
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
Q(_o, "id", "bubble"), Q(_o, "defaults", {
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
}), Q(_o, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function Qx(t, e, s) {
  let n = 1, i = 1, a = 0, o = 0;
  if (e < Ot) {
    const r = t, l = r + e, c = Math.cos(r), h = Math.sin(r), u = Math.cos(l), f = Math.sin(l), d = (b, v, w) => ga(b, r, l, !0) ? 1 : Math.max(v, v * s, w, w * s), p = (b, v, w) => ga(b, r, l, !0) ? -1 : Math.min(v, v * s, w, w * s), g = d(0, c, u), m = d(Ut, h, f), _ = p(vt, c, u), y = p(vt + Ut, h, f);
    n = (g - _) / 2, i = (m - y) / 2, a = -(g + _) / 2, o = -(m + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: i,
    offsetX: a,
    offsetY: o
  };
}
class gn extends Ke {
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
        a = (c) => +Xs(n[c], l);
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
    let e = Ot, s = -Ot;
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
    const s = this.chart, { chartArea: n } = s, i = this._cachedMeta, a = i.data, o = this.getMaxBorderWidth() + this.getMaxOffset(a) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - o) / 2, 0), l = Math.min(u_(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: u } = this._getRotationExtents(), { ratioX: f, ratioY: d, offsetX: p, offsetY: g } = Qx(u, h, l), m = (n.width - o) / f, _ = (n.height - o) / d, y = Math.max(Math.min(m, _) / 2, 0), b = Og(this.options.radius, y), v = Math.max(b * l, 0), w = (b - v) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * b, this.offsetY = g * b, i.total = this.calculateTotal(), this.outerRadius = b - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * c, 0), this.updateElements(a, 0, a.length, e);
  }
  _circumference(e, s) {
    const n = this.options, i = this._cachedMeta, a = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(e) || i._parsed[e] === null || i.data[e].hidden ? 0 : this.calculateCircumference(i._parsed[e] * a / Ot);
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", o = this.chart, r = o.chartArea, c = o.options.animation, h = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, f = a && c.animateScale, d = f ? 0 : this.innerRadius, p = f ? 0 : this.outerRadius, { sharedOptions: g, includeOptions: m } = this._getSharedOptions(s, i);
    let _ = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      _ += this._circumference(y, a);
    for (y = s; y < s + n; ++y) {
      const b = this._circumference(y, a), v = e[y], w = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: _,
        endAngle: _ + b,
        circumference: b,
        outerRadius: p,
        innerRadius: d
      };
      m && (w.options = g || this.resolveDataElementOptions(y, v.active ? "active" : i)), _ += b, this.updateElement(v, y, w, i);
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
    return s > 0 && !isNaN(e) ? Ot * (Math.abs(e) / s) : 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], a = La(s._parsed[e], n.options.locale);
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
Q(gn, "id", "doughnut"), Q(gn, "defaults", {
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
}), Q(gn, "descriptors", {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}), Q(gn, "overrides", {
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
class xo extends Ke {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const s = this._cachedMeta, { dataset: n, data: i = [], _dataset: a } = s, o = this.chart._animationsDisabled;
    let { start: r, count: l } = Wg(s, i, o);
    this._drawStart = r, this._drawCount = l, Vg(s) && (r = 0, l = i.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!a._decimated, n.points = i;
    const c = this.resolveDatasetElementOptions(e);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !o,
      options: c
    }, e), this.updateElements(i, r, l, e);
  }
  updateElements(e, s, n, i) {
    const a = i === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(s, i), f = o.axis, d = r.axis, { spanGaps: p, segment: g } = this.options, m = fi(p) ? p : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || a || i === "none", y = s + n, b = e.length;
    let v = s > 0 && this.getParsed(s - 1);
    for (let w = 0; w < b; ++w) {
      const S = e[w], x = _ ? S : {};
      if (w < s || w >= y) {
        x.skip = !0;
        continue;
      }
      const k = this.getParsed(w), P = mt(k[d]), F = x[f] = o.getPixelForValue(k[f], w), E = x[d] = a || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, k, l) : k[d], w);
      x.skip = isNaN(F) || isNaN(E) || P, x.stop = w > 0 && Math.abs(k[f] - v[f]) > m, g && (x.parsed = k, x.raw = c.data[w]), u && (x.options = h || this.resolveDataElementOptions(w, S.active ? "active" : i)), _ || this.updateElement(S, w, x, i), v = k;
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
Q(xo, "id", "line"), Q(xo, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Q(xo, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class Zi extends Ke {
  constructor(e, s) {
    super(e, s), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], a = La(s._parsed[e].r, n.options.locale);
    return {
      label: i[e] || "",
      value: a
    };
  }
  parseObjectData(e, s, n, i) {
    return Jg.bind(this)(e, s, n, i);
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
    const a = i === "reset", o = this.chart, l = o.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, u = c.yCenter, f = c.getIndexAngle(0) - 0.5 * vt;
    let d = f, p;
    const g = 360 / this.countVisibleElements();
    for (p = 0; p < s; ++p)
      d += this._computeAngle(p, i, g);
    for (p = s; p < s + n; p++) {
      const m = e[p];
      let _ = d, y = d + this._computeAngle(p, i, g), b = o.getDataVisibility(p) ? c.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
      d = y, a && (l.animateScale && (b = 0), l.animateRotate && (_ = y = f));
      const v = {
        x: h,
        y: u,
        innerRadius: 0,
        outerRadius: b,
        startAngle: _,
        endAngle: y,
        options: this.resolveDataElementOptions(p, m.active ? "active" : i)
      };
      this.updateElement(m, p, v, i);
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
Q(Zi, "id", "polarArea"), Q(Zi, "defaults", {
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
}), Q(Zi, "overrides", {
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
class Yl extends gn {
}
Q(Yl, "id", "pie"), Q(Yl, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class vo extends Ke {
  getLabelAndValue(e) {
    const s = this._cachedMeta.vScale, n = this.getParsed(e);
    return {
      label: s.getLabels()[e],
      value: "" + s.getLabelForValue(n[s.axis])
    };
  }
  parseObjectData(e, s, n, i) {
    return Jg.bind(this)(e, s, n, i);
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
      const l = e[r], c = this.resolveDataElementOptions(r, l.active ? "active" : i), h = a.getPointPositionForValue(r, this.getParsed(r).r), u = o ? a.xCenter : h.x, f = o ? a.yCenter : h.y, d = {
        x: u,
        y: f,
        angle: h.angle,
        skip: isNaN(u) || isNaN(f),
        options: c
      };
      this.updateElement(l, r, d, i);
    }
  }
}
Q(vo, "id", "radar"), Q(vo, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), Q(vo, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class So extends Ke {
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart.data.labels || [], { xScale: i, yScale: a } = s, o = this.getParsed(e), r = i.getLabelForValue(o.x), l = a.getLabelForValue(o.y);
    return {
      label: n[e] || "",
      value: "(" + r + ", " + l + ")"
    };
  }
  update(e) {
    const s = this._cachedMeta, { data: n = [] } = s, i = this.chart._animationsDisabled;
    let { start: a, count: o } = Wg(s, n, i);
    if (this._drawStart = a, this._drawCount = o, Vg(s) && (a = 0, o = n.length), this.options.showLine) {
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
    const a = i === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(s, i), u = this.getSharedOptions(h), f = this.includeOptions(i, u), d = o.axis, p = r.axis, { spanGaps: g, segment: m } = this.options, _ = fi(g) ? g : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || a || i === "none";
    let b = s > 0 && this.getParsed(s - 1);
    for (let v = s; v < s + n; ++v) {
      const w = e[v], S = this.getParsed(v), x = y ? w : {}, k = mt(S[p]), P = x[d] = o.getPixelForValue(S[d], v), F = x[p] = a || k ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, S, l) : S[p], v);
      x.skip = isNaN(P) || isNaN(F) || k, x.stop = v > 0 && Math.abs(S[d] - b[d]) > _, m && (x.parsed = S, x.raw = c.data[v]), f && (x.options = u || this.resolveDataElementOptions(v, w.active ? "active" : i)), y || this.updateElement(w, v, x, i), b = S;
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
Q(So, "id", "scatter"), Q(So, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), Q(So, "overrides", {
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
var tv = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: bo,
  BubbleController: _o,
  DoughnutController: gn,
  LineController: xo,
  PieController: Yl,
  PolarAreaController: Zi,
  RadarController: vo,
  ScatterController: So
});
function rn() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class fh {
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
    Object.assign(fh.prototype, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return rn();
  }
  parse() {
    return rn();
  }
  format() {
    return rn();
  }
  add() {
    return rn();
  }
  diff() {
    return rn();
  }
  startOf() {
    return rn();
  }
  endOf() {
    return rn();
  }
}
var ev = {
  _date: fh
};
function sv(t, e, s, n) {
  const { controller: i, data: a, _sorted: o } = t, r = i._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (r && e === r.axis && e !== "r" && o && a.length) {
    const c = r._reversePixels ? C_ : _s;
    if (n) {
      if (i._sharedOptions) {
        const h = a[0], u = typeof h.getRange == "function" && h.getRange(e);
        if (u) {
          const f = c(a, e, s - u), d = c(a, e, s + u);
          return {
            lo: f.lo,
            hi: d.hi
          };
        }
      }
    } else {
      const h = c(a, e, s);
      if (l) {
        const { vScale: u } = i._cachedMeta, { _parsed: f } = t, d = f.slice(0, h.lo + 1).reverse().findIndex((g) => !mt(g[u.axis]));
        h.lo -= Math.max(0, d);
        const p = f.slice(h.hi).findIndex((g) => !mt(g[u.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: a.length - 1
  };
}
function Fr(t, e, s, n, i) {
  const a = t.getSortedVisibleDatasetMetas(), o = s[e];
  for (let r = 0, l = a.length; r < l; ++r) {
    const { index: c, data: h } = a[r], { lo: u, hi: f } = sv(a[r], e, o, i);
    for (let d = u; d <= f; ++d) {
      const p = h[d];
      p.skip || n(p, c, d);
    }
  }
}
function nv(t) {
  const e = t.indexOf("x") !== -1, s = t.indexOf("y") !== -1;
  return function(n, i) {
    const a = e ? Math.abs(n.x - i.x) : 0, o = s ? Math.abs(n.y - i.y) : 0;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
  };
}
function ol(t, e, s, n, i) {
  const a = [];
  return !i && !t.isPointInArea(e) || Fr(t, s, e, function(r, l, c) {
    !i && !xs(r, t.chartArea, 0) || r.inRange(e.x, e.y, n) && a.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), a;
}
function iv(t, e, s, n) {
  let i = [];
  function a(o, r, l) {
    const { startAngle: c, endAngle: h } = o.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: u } = Ig(o, {
      x: e.x,
      y: e.y
    });
    ga(u, c, h) && i.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return Fr(t, s, e, a), i;
}
function av(t, e, s, n, i, a) {
  let o = [];
  const r = nv(s);
  let l = Number.POSITIVE_INFINITY;
  function c(h, u, f) {
    const d = h.inRange(e.x, e.y, i);
    if (n && !d)
      return;
    const p = h.getCenterPoint(i);
    if (!(!!a || t.isPointInArea(p)) && !d)
      return;
    const m = r(e, p);
    m < l ? (o = [
      {
        element: h,
        datasetIndex: u,
        index: f
      }
    ], l = m) : m === l && o.push({
      element: h,
      datasetIndex: u,
      index: f
    });
  }
  return Fr(t, s, e, c), o;
}
function rl(t, e, s, n, i, a) {
  return !a && !t.isPointInArea(e) ? [] : s === "r" && !n ? iv(t, e, s, i) : av(t, e, s, n, i, a);
}
function rf(t, e, s, n, i) {
  const a = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Fr(t, s, e, (l, c, h) => {
    l[o] && l[o](e[s], i) && (a.push({
      element: l,
      datasetIndex: c,
      index: h
    }), r = r || l.inRange(e.x, e.y, i));
  }), n && !r ? [] : a;
}
var ov = {
  modes: {
    index(t, e, s, n) {
      const i = un(e, t), a = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? ol(t, i, a, n, o) : rl(t, i, a, !1, n, o), l = [];
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
      const i = un(e, t), a = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? ol(t, i, a, n, o) : rl(t, i, a, !1, n, o);
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
      const i = un(e, t), a = s.axis || "xy", o = s.includeInvisible || !1;
      return ol(t, i, a, n, o);
    },
    nearest(t, e, s, n) {
      const i = un(e, t), a = s.axis || "xy", o = s.includeInvisible || !1;
      return rl(t, i, a, s.intersect, n, o);
    },
    x(t, e, s, n) {
      const i = un(e, t);
      return rf(t, i, "x", s.intersect, n);
    },
    y(t, e, s, n) {
      const i = un(e, t);
      return rf(t, i, "y", s.intersect, n);
    }
  }
};
const rm = [
  "left",
  "top",
  "right",
  "bottom"
];
function ki(t, e) {
  return t.filter((s) => s.pos === e);
}
function lf(t, e) {
  return t.filter((s) => rm.indexOf(s.pos) === -1 && s.box.axis === e);
}
function Mi(t, e) {
  return t.sort((s, n) => {
    const i = e ? n : s, a = e ? s : n;
    return i.weight === a.weight ? i.index - a.index : i.weight - a.weight;
  });
}
function rv(t) {
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
function lv(t) {
  const e = {};
  for (const s of t) {
    const { stack: n, pos: i, stackWeight: a } = s;
    if (!n || !rm.includes(i))
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
function cv(t, e) {
  const s = lv(t), { vBoxMaxWidth: n, hBoxMaxHeight: i } = e;
  let a, o, r;
  for (a = 0, o = t.length; a < o; ++a) {
    r = t[a];
    const { fullSize: l } = r.box, c = s[r.stack], h = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = h ? h * n : l && e.availableWidth, r.height = i) : (r.width = n, r.height = h ? h * i : l && e.availableHeight);
  }
  return s;
}
function hv(t) {
  const e = rv(t), s = Mi(e.filter((c) => c.box.fullSize), !0), n = Mi(ki(e, "left"), !0), i = Mi(ki(e, "right")), a = Mi(ki(e, "top"), !0), o = Mi(ki(e, "bottom")), r = lf(e, "x"), l = lf(e, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(a),
    rightAndBottom: i.concat(l).concat(o).concat(r),
    chartArea: ki(e, "chartArea"),
    vertical: n.concat(i).concat(l),
    horizontal: a.concat(o).concat(r)
  };
}
function cf(t, e, s, n) {
  return Math.max(t[s], e[s]) + Math.max(t[n], e[n]);
}
function lm(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function uv(t, e, s, n) {
  const { pos: i, box: a } = s, o = t.maxPadding;
  if (!bt(i)) {
    s.size && (t[i] -= s.size);
    const u = n[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? a.height : a.width), s.size = u.size / u.count, t[i] += s.size;
  }
  a.getPadding && lm(o, a.getPadding());
  const r = Math.max(0, e.outerWidth - cf(o, t, "left", "right")), l = Math.max(0, e.outerHeight - cf(o, t, "top", "bottom")), c = r !== t.w, h = l !== t.h;
  return t.w = r, t.h = l, s.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function fv(t) {
  const e = t.maxPadding;
  function s(n) {
    const i = Math.max(e[n] - t[n], 0);
    return t[n] += i, i;
  }
  t.y += s("top"), t.x += s("left"), s("right"), s("bottom");
}
function dv(t, e) {
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
function Ei(t, e, s, n) {
  const i = [];
  let a, o, r, l, c, h;
  for (a = 0, o = t.length, c = 0; a < o; ++a) {
    r = t[a], l = r.box, l.update(r.width || e.w, r.height || e.h, dv(r.horizontal, e));
    const { same: u, other: f } = uv(e, s, r, n);
    c |= u && i.length, h = h || f, l.fullSize || i.push(r);
  }
  return c && Ei(i, e, s, n) || h;
}
function eo(t, e, s, n, i) {
  t.top = s, t.left = e, t.right = e + n, t.bottom = s + i, t.width = n, t.height = i;
}
function hf(t, e, s, n) {
  const i = s.padding;
  let { x: a, y: o } = e;
  for (const r of t) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, h = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const u = e.w * h, f = c.size || l.height;
      pa(c.start) && (o = c.start), l.fullSize ? eo(l, i.left, o, s.outerWidth - i.right - i.left, f) : eo(l, e.left + c.placed, o, u, f), c.start = o, c.placed += u, o = l.bottom;
    } else {
      const u = e.h * h, f = c.size || l.width;
      pa(c.start) && (a = c.start), l.fullSize ? eo(l, a, i.top, f, s.outerHeight - i.bottom - i.top) : eo(l, a, e.top + c.placed, f, u), c.start = a, c.placed += u, a = l.right;
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
    const i = me(t.options.layout.padding), a = Math.max(e - i.width, 0), o = Math.max(s - i.height, 0), r = hv(t.boxes), l = r.vertical, c = r.horizontal;
    Mt(t.boxes, (g) => {
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
    }), f = Object.assign({}, i);
    lm(f, me(n));
    const d = Object.assign({
      maxPadding: f,
      w: a,
      h: o,
      x: i.left,
      y: i.top
    }, i), p = cv(l.concat(c), u);
    Ei(r.fullSize, d, u, p), Ei(l, d, u, p), Ei(c, d, u, p) && Ei(l, d, u, p), fv(d), hf(r.leftAndTop, d, u, p), d.x += d.w, d.y += d.h, hf(r.rightAndBottom, d, u, p), t.chartArea = {
      left: d.left,
      top: d.top,
      right: d.left + d.w,
      bottom: d.top + d.h,
      height: d.h,
      width: d.w
    }, Mt(r.chartArea, (g) => {
      const m = g.box;
      Object.assign(m, t.chartArea), m.update(d.w, d.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class cm {
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
class pv extends cm {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const wo = "$chartjs", gv = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, uf = (t) => t === null || t === "";
function mv(t, e) {
  const s = t.style, n = t.getAttribute("height"), i = t.getAttribute("width");
  if (t[wo] = {
    initial: {
      height: n,
      width: i,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", uf(i)) {
    const a = qu(t, "width");
    a !== void 0 && (t.width = a);
  }
  if (uf(n))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const a = qu(t, "height");
      a !== void 0 && (t.height = a);
    }
  return t;
}
const hm = yx ? {
  passive: !0
} : !1;
function yv(t, e, s) {
  t && t.addEventListener(e, s, hm);
}
function bv(t, e, s) {
  t && t.canvas && t.canvas.removeEventListener(e, s, hm);
}
function _v(t, e) {
  const s = gv[t.type] || t.type, { x: n, y: i } = un(t, e);
  return {
    type: s,
    chart: e,
    native: t,
    x: n !== void 0 ? n : null,
    y: i !== void 0 ? i : null
  };
}
function ir(t, e) {
  for (const s of t)
    if (s === e || s.contains(e))
      return !0;
}
function xv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((a) => {
    let o = !1;
    for (const r of a)
      o = o || ir(r.addedNodes, n), o = o && !ir(r.removedNodes, n);
    o && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function vv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((a) => {
    let o = !1;
    for (const r of a)
      o = o || ir(r.removedNodes, n), o = o && !ir(r.addedNodes, n);
    o && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const ya = /* @__PURE__ */ new Map();
let ff = 0;
function um() {
  const t = window.devicePixelRatio;
  t !== ff && (ff = t, ya.forEach((e, s) => {
    s.currentDevicePixelRatio !== t && e();
  }));
}
function Sv(t, e) {
  ya.size || window.addEventListener("resize", um), ya.set(t, e);
}
function wv(t) {
  ya.delete(t), ya.size || window.removeEventListener("resize", um);
}
function Cv(t, e, s) {
  const n = t.canvas, i = n && uh(n);
  if (!i)
    return;
  const a = jg((r, l) => {
    const c = i.clientWidth;
    s(r, l), c < i.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || a(c, h);
  });
  return o.observe(i), Sv(t, a), o;
}
function ll(t, e, s) {
  s && s.disconnect(), e === "resize" && wv(t);
}
function kv(t, e, s) {
  const n = t.canvas, i = jg((a) => {
    t.ctx !== null && s(_v(a, t));
  }, t);
  return yv(n, e, i), i;
}
class Mv extends cm {
  acquireContext(e, s) {
    const n = e && e.getContext && e.getContext("2d");
    return n && n.canvas === e ? (mv(e, s), n) : null;
  }
  releaseContext(e) {
    const s = e.canvas;
    if (!s[wo])
      return !1;
    const n = s[wo].initial;
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
    }), s.width = s.width, delete s[wo], !0;
  }
  addEventListener(e, s, n) {
    this.removeEventListener(e, s);
    const i = e.$proxies || (e.$proxies = {}), o = {
      attach: xv,
      detach: vv,
      resize: Cv
    }[s] || kv;
    i[s] = o(e, s, n);
  }
  removeEventListener(e, s) {
    const n = e.$proxies || (e.$proxies = {}), i = n[s];
    if (!i)
      return;
    ({
      attach: ll,
      detach: ll,
      resize: ll
    }[s] || bv)(e, s, i), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, s, n, i) {
    return mx(e, s, n, i);
  }
  isAttached(e) {
    const s = e && uh(e);
    return !!(s && s.isConnected);
  }
}
function Av(t) {
  return !hh() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? pv : Mv;
}
var fo;
let Rs = (fo = class {
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
}, Q(fo, "defaults", {}), Q(fo, "defaultRoutes"), fo);
function Pv(t, e) {
  const s = t.options.ticks, n = Tv(t), i = Math.min(s.maxTicksLimit || n, n), a = s.major.enabled ? Rv(e) : [], o = a.length, r = a[0], l = a[o - 1], c = [];
  if (o > i)
    return Lv(e, c, a, o / i), c;
  const h = Dv(a, e, i);
  if (o > 0) {
    let u, f;
    const d = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (so(e, c, h, mt(d) ? 0 : r - d, r), u = 0, f = o - 1; u < f; u++)
      so(e, c, h, a[u], a[u + 1]);
    return so(e, c, h, l, mt(d) ? e.length : l + d), c;
  }
  return so(e, c, h), c;
}
function Tv(t) {
  const e = t.options.offset, s = t._tickSize(), n = t._length / s + (e ? 0 : 1), i = t._maxLength / s;
  return Math.floor(Math.min(n, i));
}
function Dv(t, e, s) {
  const n = Ov(t), i = e.length / s;
  if (!n)
    return Math.max(i, 1);
  const a = __(n);
  for (let o = 0, r = a.length - 1; o < r; o++) {
    const l = a[o];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Rv(t) {
  const e = [];
  let s, n;
  for (s = 0, n = t.length; s < n; s++)
    t[s].major && e.push(s);
  return e;
}
function Lv(t, e, s, n) {
  let i = 0, a = s[0], o;
  for (n = Math.ceil(n), o = 0; o < t.length; o++)
    o === a && (e.push(t[o]), i++, a = s[i * n]);
}
function so(t, e, s, n, i) {
  const a = ut(n, 0), o = Math.min(ut(i, t.length), t.length);
  let r = 0, l, c, h;
  for (s = Math.ceil(s), i && (l = i - n, s = l / Math.floor(l / s)), h = a; h < 0; )
    r++, h = Math.round(a + r * s);
  for (c = Math.max(a, 0); c < o; c++)
    c === h && (e.push(t[c]), r++, h = Math.round(a + r * s));
}
function Ov(t) {
  const e = t.length;
  let s, n;
  if (e < 2)
    return !1;
  for (n = t[0], s = 1; s < e; ++s)
    if (t[s] - t[s - 1] !== n)
      return !1;
  return n;
}
const Fv = (t) => t === "left" ? "right" : t === "right" ? "left" : t, df = (t, e, s) => e === "top" || e === "left" ? t[e] + s : t[e] - s, pf = (t, e) => Math.min(e || t, t);
function gf(t, e) {
  const s = [], n = t.length / e, i = t.length;
  let a = 0;
  for (; a < i; a += n)
    s.push(t[Math.floor(a)]);
  return s;
}
function Ev(t, e, s) {
  const n = t.ticks.length, i = Math.min(e, n - 1), a = t._startPixel, o = t._endPixel, r = 1e-6;
  let l = t.getPixelForTick(i), c;
  if (!(s && (n === 1 ? c = Math.max(l - a, o - l) : e === 0 ? c = (t.getPixelForTick(1) - l) / 2 : c = (l - t.getPixelForTick(i - 1)) / 2, l += i < e ? c : -c, l < a - r || l > o + r)))
    return l;
}
function Iv(t, e) {
  Mt(t, (s) => {
    const n = s.gc, i = n.length / 2;
    let a;
    if (i > e) {
      for (a = 0; a < i; ++a)
        delete s.data[n[a]];
      n.splice(0, i);
    }
  });
}
function Ai(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function mf(t, e) {
  if (!t.display)
    return 0;
  const s = Zt(t.font, e), n = me(t.padding);
  return (Ft(t.text) ? t.text.length : 1) * s.lineHeight + n.height;
}
function Nv(t, e) {
  return Qs(t, {
    scale: e,
    type: "scale"
  });
}
function Bv(t, e, s) {
  return Qs(t, {
    tick: s,
    index: e,
    type: "tick"
  });
}
function $v(t, e, s) {
  let n = ih(t);
  return (s && e !== "right" || !s && e === "right") && (n = Fv(n)), n;
}
function jv(t, e, s, n) {
  const { top: i, left: a, bottom: o, right: r, chart: l } = t, { chartArea: c, scales: h } = l;
  let u = 0, f, d, p;
  const g = o - i, m = r - a;
  if (t.isHorizontal()) {
    if (d = ce(n, a, r), bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      p = h[_].getPixelForValue(y) + g - e;
    } else s === "center" ? p = (c.bottom + c.top) / 2 + g - e : p = df(t, s, e);
    f = r - a;
  } else {
    if (bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      d = h[_].getPixelForValue(y) - m + e;
    } else s === "center" ? d = (c.left + c.right) / 2 - m + e : d = df(t, s, e);
    p = ce(n, o, i), u = s === "left" ? -Ut : Ut;
  }
  return {
    titleX: d,
    titleY: p,
    maxWidth: f,
    rotation: u
  };
}
class In extends Rs {
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
      minDefined: $t(e),
      maxDefined: $t(s)
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
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = K_(this, a, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? gf(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = Pv(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    const e = this.options, s = e.ticks, n = pf(this.ticks.length, e.ticks.maxTicksLimit), i = s.minRotation || 0, a = s.maxRotation;
    let o = i, r, l, c;
    if (!this._isVisible() || !s.display || i >= a || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, f = h.highest.height, d = se(this.chart.width - u, 0, this.maxWidth);
    r = e.offset ? this.maxWidth / n : d / (n - 1), u + 6 > r && (r = d / (n - (e.offset ? 0.5 : 1)), l = this.maxHeight - Ai(e.grid) - s.padding - mf(e.title, this.chart.options.font), c = Math.sqrt(u * u + f * f), o = sh(Math.min(Math.asin(se((h.highest.height + 6) / r, -1, 1)), Math.asin(se(l / c, -1, 1)) - Math.asin(se(f / c, -1, 1)))), o = Math.max(i, Math.min(a, o))), this.labelRotation = o;
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
      const l = mf(i, s.options.font);
      if (r ? (e.width = this.maxWidth, e.height = Ai(a) + l) : (e.height = this.maxHeight, e.width = Ai(a) + l), n.display && this.ticks.length) {
        const { first: c, last: h, widest: u, highest: f } = this._getLabelSizes(), d = n.padding * 2, p = ze(this.labelRotation), g = Math.cos(p), m = Math.sin(p);
        if (r) {
          const _ = n.mirror ? 0 : m * u.width + g * f.height;
          e.height = Math.min(this.maxHeight, e.height + _ + d);
        } else {
          const _ = n.mirror ? 0 : g * u.width + m * f.height;
          e.width = Math.min(this.maxWidth, e.width + _ + d);
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
      let f = 0, d = 0;
      l ? c ? (f = i * e.width, d = n * s.height) : (f = n * e.height, d = i * s.width) : a === "start" ? d = s.width : a === "end" ? f = e.width : a !== "inner" && (f = e.width / 2, d = s.width / 2), this.paddingLeft = Math.max((f - h + o) * this.width / (this.width - h), 0), this.paddingRight = Math.max((d - u + o) * this.width / (this.width - u), 0);
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
      s < n.length && (n = gf(n, s)), this._labelSizes = e = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, s, n) {
    const { ctx: i, _longestTextCache: a } = this, o = [], r = [], l = Math.floor(s / pf(s, n));
    let c = 0, h = 0, u, f, d, p, g, m, _, y, b, v, w;
    for (u = 0; u < s; u += l) {
      if (p = e[u].label, g = this._resolveTickFontOptions(u), i.font = m = g.string, _ = a[m] = a[m] || {
        data: {},
        gc: []
      }, y = g.lineHeight, b = v = 0, !mt(p) && !Ft(p))
        b = sr(i, _.data, _.gc, b, p), v = y;
      else if (Ft(p))
        for (f = 0, d = p.length; f < d; ++f)
          w = p[f], !mt(w) && !Ft(w) && (b = sr(i, _.data, _.gc, b, w), v += y);
      o.push(b), r.push(v), c = Math.max(b, c), h = Math.max(v, h);
    }
    Iv(a, s);
    const S = o.indexOf(c), x = r.indexOf(h), k = (P) => ({
      width: o[P] || 0,
      height: r[P] || 0
    });
    return {
      first: k(0),
      last: k(s - 1),
      widest: k(S),
      highest: k(x),
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
    return w_(this._alignToPixels ? on(this.chart, s, 0) : s);
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
      return n.$context || (n.$context = Bv(this.getContext(), e, n));
    }
    return this.$context || (this.$context = Nv(this.chart.getContext(), this));
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
    const s = this.axis, n = this.chart, i = this.options, { grid: a, position: o, border: r } = i, l = a.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), f = Ai(a), d = [], p = r.setContext(this.getContext()), g = p.display ? p.width : 0, m = g / 2, _ = function(M) {
      return on(n, M, g);
    };
    let y, b, v, w, S, x, k, P, F, E, C, N;
    if (o === "top")
      y = _(this.bottom), x = this.bottom - f, P = y - m, E = _(e.top) + m, N = e.bottom;
    else if (o === "bottom")
      y = _(this.top), E = e.top, N = _(e.bottom) - m, x = y + m, P = this.top + f;
    else if (o === "left")
      y = _(this.right), S = this.right - f, k = y - m, F = _(e.left) + m, C = e.right;
    else if (o === "right")
      y = _(this.left), F = e.left, C = _(e.right) - m, S = y + m, k = this.left + f;
    else if (s === "x") {
      if (o === "center")
        y = _((e.top + e.bottom) / 2 + 0.5);
      else if (bt(o)) {
        const M = Object.keys(o)[0], T = o[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      E = e.top, N = e.bottom, x = y + m, P = x + f;
    } else if (s === "y") {
      if (o === "center")
        y = _((e.left + e.right) / 2);
      else if (bt(o)) {
        const M = Object.keys(o)[0], T = o[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      S = y - m, k = S - f, F = e.left, C = e.right;
    }
    const L = ut(i.ticks.maxTicksLimit, u), D = Math.max(1, Math.ceil(u / L));
    for (b = 0; b < u; b += D) {
      const M = this.getContext(b), T = a.setContext(M), O = r.setContext(M), V = T.lineWidth, K = T.color, Z = O.dash || [], et = O.dashOffset, ft = T.tickWidth, lt = T.tickColor, pt = T.tickBorderDash || [], _t = T.tickBorderDashOffset;
      v = Ev(this, b, l), v !== void 0 && (w = on(n, v, V), c ? S = k = F = C = w : x = P = E = N = w, d.push({
        tx1: S,
        ty1: x,
        tx2: k,
        ty2: P,
        x1: F,
        y1: E,
        x2: C,
        y2: N,
        width: V,
        color: K,
        borderDash: Z,
        borderDashOffset: et,
        tickWidth: ft,
        tickColor: lt,
        tickBorderDash: pt,
        tickBorderDashOffset: _t
      }));
    }
    return this._ticksLength = u, this._borderValue = y, d;
  }
  _computeLabelItems(e) {
    const s = this.axis, n = this.options, { position: i, ticks: a } = n, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: h, mirror: u } = a, f = Ai(n.grid), d = f + h, p = u ? -h : d, g = -ze(this.labelRotation), m = [];
    let _, y, b, v, w, S, x, k, P, F, E, C, N = "middle";
    if (i === "top")
      S = this.bottom - p, x = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      S = this.top + p, x = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const D = this._getYAxisLabelAlignment(f);
      x = D.textAlign, w = D.x;
    } else if (i === "right") {
      const D = this._getYAxisLabelAlignment(f);
      x = D.textAlign, w = D.x;
    } else if (s === "x") {
      if (i === "center")
        S = (e.top + e.bottom) / 2 + d;
      else if (bt(i)) {
        const D = Object.keys(i)[0], M = i[D];
        S = this.chart.scales[D].getPixelForValue(M) + d;
      }
      x = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (i === "center")
        w = (e.left + e.right) / 2 - d;
      else if (bt(i)) {
        const D = Object.keys(i)[0], M = i[D];
        w = this.chart.scales[D].getPixelForValue(M);
      }
      x = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? N = "top" : l === "end" && (N = "bottom"));
    const L = this._getLabelSizes();
    for (_ = 0, y = r.length; _ < y; ++_) {
      b = r[_], v = b.label;
      const D = a.setContext(this.getContext(_));
      k = this.getPixelForTick(_) + a.labelOffset, P = this._resolveTickFontOptions(_), F = P.lineHeight, E = Ft(v) ? v.length : 1;
      const M = E / 2, T = D.color, O = D.textStrokeColor, V = D.textStrokeWidth;
      let K = x;
      o ? (w = k, x === "inner" && (_ === y - 1 ? K = this.options.reverse ? "left" : "right" : _ === 0 ? K = this.options.reverse ? "right" : "left" : K = "center"), i === "top" ? c === "near" || g !== 0 ? C = -E * F + F / 2 : c === "center" ? C = -L.highest.height / 2 - M * F + F : C = -L.highest.height + F / 2 : c === "near" || g !== 0 ? C = F / 2 : c === "center" ? C = L.highest.height / 2 - M * F : C = L.highest.height - E * F, u && (C *= -1), g !== 0 && !D.showLabelBackdrop && (w += F / 2 * Math.sin(g))) : (S = k, C = (1 - E) * F / 2);
      let Z;
      if (D.showLabelBackdrop) {
        const et = me(D.backdropPadding), ft = L.heights[_], lt = L.widths[_];
        let pt = C - et.top, _t = 0 - et.left;
        switch (N) {
          case "middle":
            pt -= ft / 2;
            break;
          case "bottom":
            pt -= ft;
            break;
        }
        switch (x) {
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
          width: lt + et.width,
          height: ft + et.height,
          color: D.backdropColor
        };
      }
      m.push({
        label: v,
        font: P,
        textOffset: C,
        options: {
          rotation: g,
          color: T,
          strokeColor: O,
          strokeWidth: V,
          textAlign: K,
          textBaseline: N,
          translation: [
            w,
            S
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
    let c, h, u, f;
    this.isHorizontal() ? (c = on(e, this.left, o) - o / 2, h = on(e, this.right, r) + r / 2, u = f = l) : (u = on(e, this.top, o) - o / 2, f = on(e, this.bottom, r) + r / 2, c = h = l), s.save(), s.lineWidth = a.width, s.strokeStyle = a.color, s.beginPath(), s.moveTo(c, u), s.lineTo(h, f), s.stroke(), s.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, i = this._computeLabelArea();
    i && Rr(n, i);
    const a = this.getLabelItems(e);
    for (const o of a) {
      const r = o.options, l = o.font, c = o.label, h = o.textOffset;
      Rn(n, c, 0, h, l, r);
    }
    i && Lr(n);
  }
  drawTitle() {
    const { ctx: e, options: { position: s, title: n, reverse: i } } = this;
    if (!n.display)
      return;
    const a = Zt(n.font), o = me(n.padding), r = n.align;
    let l = a.lineHeight / 2;
    s === "bottom" || s === "center" || bt(s) ? (l += o.bottom, Ft(n.text) && (l += a.lineHeight * (n.text.length - 1))) : l += o.top;
    const { titleX: c, titleY: h, maxWidth: u, rotation: f } = jv(this, l, s, r);
    Rn(e, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: u,
      rotation: f,
      textAlign: $v(r, s, i),
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
class no {
  constructor(e, s, n) {
    this.type = e, this.scope = s, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const s = Object.getPrototypeOf(e);
    let n;
    Hv(s) && (n = this.register(s));
    const i = this.items, a = e.id, o = this.scope + "." + a;
    if (!a)
      throw new Error("class does not have id: " + e);
    return a in i || (i[a] = e, Wv(e, o, n), this.override && It.override(e.id, e.overrides)), o;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const s = this.items, n = e.id, i = this.scope;
    n in s && delete s[n], i && n in It[i] && (delete It[i][n], this.override && delete Dn[n]);
  }
}
function Wv(t, e, s) {
  const n = da(/* @__PURE__ */ Object.create(null), [
    s ? It.get(s) : {},
    It.get(e),
    t.defaults
  ]);
  It.set(e, n), t.defaultRoutes && Vv(e, t.defaultRoutes), t.descriptors && It.describe(e, t.descriptors);
}
function Vv(t, e) {
  Object.keys(e).forEach((s) => {
    const n = s.split("."), i = n.pop(), a = [
      t
    ].concat(n).join("."), o = e[s].split("."), r = o.pop(), l = o.join(".");
    It.route(a, i, l, r);
  });
}
function Hv(t) {
  return "id" in t && "defaults" in t;
}
class zv {
  constructor() {
    this.controllers = new no(Ke, "datasets", !0), this.elements = new no(Rs, "elements"), this.plugins = new no(Object, "plugins"), this.scales = new no(In, "scales"), this._typedRegistries = [
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
      n || a.isForType(i) || a === this.plugins && i.id ? this._exec(e, a, i) : Mt(i, (o) => {
        const r = n || this._getRegistryForType(o);
        this._exec(e, r, o);
      });
    });
  }
  _exec(e, s, n) {
    const i = eh(e);
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
var Qe = /* @__PURE__ */ new zv();
class Gv {
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
    const n = e && e.config, i = ut(n.options && n.options.plugins, {}), a = Uv(n);
    return i === !1 && !s ? [] : Kv(e, a, i, s);
  }
  _notifyStateChanges(e) {
    const s = this._oldCache || [], n = this._cache, i = (a, o) => a.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(i(s, n), e, "stop"), this._notify(i(n, s), e, "start");
  }
}
function Uv(t) {
  const e = {}, s = [], n = Object.keys(Qe.plugins.items);
  for (let a = 0; a < n.length; a++)
    s.push(Qe.getPlugin(n[a]));
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
function qv(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function Kv(t, { plugins: e, localIds: s }, n, i) {
  const a = [], o = t.getContext();
  for (const r of e) {
    const l = r.id, c = qv(n[l], i);
    c !== null && a.push({
      plugin: r,
      options: Yv(t.config, {
        plugin: r,
        local: s[l]
      }, c, o)
    });
  }
  return a;
}
function Yv(t, { plugin: e, local: s }, n, i) {
  const a = t.pluginScopeKeys(e), o = t.getOptionScopes(n, a);
  return s && e.defaults && o.push(e.defaults), t.createResolver(o, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Jl(t, e) {
  const s = It.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || s.indexAxis || "x";
}
function Jv(t, e) {
  let s = t;
  return t === "_index_" ? s = e : t === "_value_" && (s = e === "x" ? "y" : "x"), s;
}
function Xv(t, e) {
  return t === e ? "_index_" : "_value_";
}
function yf(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function Zv(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function Xl(t, ...e) {
  if (yf(t))
    return t;
  for (const s of e) {
    const n = s.axis || Zv(s.position) || t.length > 1 && yf(t[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function bf(t, e, s) {
  if (s[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function Qv(t, e) {
  if (e.data && e.data.datasets) {
    const s = e.data.datasets.filter((n) => n.xAxisID === t || n.yAxisID === t);
    if (s.length)
      return bf(t, "x", s[0]) || bf(t, "y", s[0]);
  }
  return {};
}
function tS(t, e) {
  const s = Dn[t.type] || {
    scales: {}
  }, n = e.scales || {}, i = Jl(t.type, e), a = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((o) => {
    const r = n[o];
    if (!bt(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = Xl(o, r, Qv(o, t), It.scales[r.type]), c = Xv(l, i), h = s.scales || {};
    a[o] = Ki(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      h[l],
      h[c]
    ]);
  }), t.data.datasets.forEach((o) => {
    const r = o.type || t.type, l = o.indexAxis || Jl(r, e), h = (Dn[r] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const f = Jv(u, l), d = o[f + "AxisID"] || f;
      a[d] = a[d] || /* @__PURE__ */ Object.create(null), Ki(a[d], [
        {
          axis: f
        },
        n[d],
        h[u]
      ]);
    });
  }), Object.keys(a).forEach((o) => {
    const r = a[o];
    Ki(r, [
      It.scales[r.type],
      It.scale
    ]);
  }), a;
}
function fm(t) {
  const e = t.options || (t.options = {});
  e.plugins = ut(e.plugins, {}), e.scales = tS(t, e);
}
function dm(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function eS(t) {
  return t = t || {}, t.data = dm(t.data), fm(t), t;
}
const _f = /* @__PURE__ */ new Map(), pm = /* @__PURE__ */ new Set();
function io(t, e) {
  let s = _f.get(t);
  return s || (s = e(), _f.set(t, s), pm.add(s)), s;
}
const Pi = (t, e, s) => {
  const n = Xs(e, s);
  n !== void 0 && t.add(n);
};
class sS {
  constructor(e) {
    this._config = eS(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = dm(e);
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
    this.clearCache(), fm(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return io(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, s) {
    return io(`${e}.transition.${s}`, () => [
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
    return io(`${e}-${s}`, () => [
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
    return io(`${n}-plugin-${s}`, () => [
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
      e && (l.add(e), h.forEach((u) => Pi(l, e, u))), h.forEach((u) => Pi(l, i, u)), h.forEach((u) => Pi(l, Dn[a] || {}, u)), h.forEach((u) => Pi(l, It, u)), h.forEach((u) => Pi(l, ql, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), pm.has(s) && o.set(s, c), c;
  }
  chartOptionScopes() {
    const { options: e, type: s } = this;
    return [
      e,
      Dn[s] || {},
      It.datasets[s] || {},
      {
        type: s
      },
      It,
      ql
    ];
  }
  resolveNamedOptions(e, s, n, i = [
    ""
  ]) {
    const a = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = xf(this._resolverCache, e, i);
    let l = o;
    if (iS(o, s)) {
      a.$shared = !1, n = Zs(n) ? n() : n;
      const c = this.createResolver(e, n, r);
      l = di(o, n, c);
    }
    for (const c of s)
      a[c] = l[c];
    return a;
  }
  createResolver(e, s, n = [
    ""
  ], i) {
    const { resolver: a } = xf(this._resolverCache, e, n);
    return bt(s) ? di(a, s, void 0, i) : a;
  }
}
function xf(t, e, s) {
  let n = t.get(e);
  n || (n = /* @__PURE__ */ new Map(), t.set(e, n));
  const i = s.join();
  let a = n.get(i);
  return a || (a = {
    resolver: rh(e, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(i, a)), a;
}
const nS = (t) => bt(t) && Object.getOwnPropertyNames(t).some((e) => Zs(t[e]));
function iS(t, e) {
  const { isScriptable: s, isIndexable: n } = Ug(t);
  for (const i of e) {
    const a = s(i), o = n(i), r = (o || a) && t[i];
    if (a && (Zs(r) || nS(r)) || o && Ft(r))
      return !0;
  }
  return !1;
}
var aS = "4.5.1";
const oS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function vf(t, e) {
  return t === "top" || t === "bottom" || oS.indexOf(t) === -1 && e === "x";
}
function Sf(t, e) {
  return function(s, n) {
    return s[t] === n[t] ? s[e] - n[e] : s[t] - n[t];
  };
}
function wf(t) {
  const e = t.chart, s = e.options.animation;
  e.notifyPlugins("afterRender"), Rt(s && s.onComplete, [
    t
  ], e);
}
function rS(t) {
  const e = t.chart, s = e.options.animation;
  Rt(s && s.onProgress, [
    t
  ], e);
}
function gm(t) {
  return hh() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const Co = {}, Cf = (t) => {
  const e = gm(t);
  return Object.values(Co).filter((s) => s.canvas === e).pop();
};
function lS(t, e, s) {
  const n = Object.keys(t);
  for (const i of n) {
    const a = +i;
    if (a >= e) {
      const o = t[i];
      delete t[i], (s > 0 || a > e) && (t[a + s] = o);
    }
  }
}
function cS(t, e, s, n) {
  return !s || t.type === "mouseout" ? null : n ? e : t;
}
var Es;
let ar = (Es = class {
  static register(...e) {
    Qe.add(...e), kf();
  }
  static unregister(...e) {
    Qe.remove(...e), kf();
  }
  constructor(e, s) {
    const n = this.config = new sS(s), i = gm(e), a = Cf(i);
    if (a)
      throw new Error("Canvas is already in use. Chart with ID '" + a.id + "' must be destroyed before the canvas with ID '" + a.canvas.id + "' can be reused.");
    const o = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Av(i))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(i, o.aspectRatio), l = r && r.canvas, c = l && l.height, h = l && l.width;
    if (this.id = h_(), this.ctx = r, this.canvas = l, this.width = h, this.height = c, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Gv(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = A_((u) => this.update(u), o.resizeDelay || 0), this._dataChanges = [], Co[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    cs.listen(this, "complete", wf), cs.listen(this, "progress", rS), this._initialize(), this.attached && this.update();
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
    return Qe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Uu(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Hu(this.canvas, this.ctx), this;
  }
  stop() {
    return cs.stop(this), this;
  }
  resize(e, s) {
    cs.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: s
    } : this._resize(e, s);
  }
  _resize(e, s) {
    const n = this.options, i = this.canvas, a = n.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(i, e, s, a), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Uu(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), Rt(n.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    Mt(s, (n, i) => {
      n.id = i;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, s = e.scales, n = this.scales, i = Object.keys(n).reduce((o, r) => (o[r] = !1, o), {});
    let a = [];
    s && (a = a.concat(Object.keys(s).map((o) => {
      const r = s[o], l = Xl(o, r), c = l === "r", h = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), Mt(a, (o) => {
      const r = o.options, l = r.id, c = Xl(l, r), h = ut(r.type, o.dtype);
      (r.position === void 0 || vf(r.position, c) !== vf(o.dposition)) && (r.position = o.dposition), i[l] = !0;
      let u = null;
      if (l in n && n[l].type === h)
        u = n[l];
      else {
        const f = Qe.getScale(h);
        u = new f({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), n[u.id] = u;
      }
      u.init(r, e);
    }), Mt(i, (o, r) => {
      o || delete n[r];
    }), Mt(n, (o) => {
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
    this._sortedMetasets = e.slice(0).sort(Sf("order", "index"));
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
      if (o.type && o.type !== r && (this._destroyDatasetMeta(n), o = this.getDatasetMeta(n)), o.type = r, o.indexAxis = a.indexAxis || Jl(r, this.options), o.order = a.order || 0, o.index = n, o.label = "" + a.label, o.visible = this.isDatasetVisible(n), o.controller)
        o.controller.updateIndex(n), o.controller.linkScales();
      else {
        const l = Qe.getController(r), { datasetElementType: c, dataElementType: h } = It.datasets[r];
        Object.assign(l, {
          dataElementType: Qe.getElement(h),
          datasetElementType: c && Qe.getElement(c)
        }), o.controller = new l(this, n), e.push(o.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    Mt(this.data.datasets, (e, s) => {
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
      const { controller: u } = this.getDatasetMeta(c), f = !i && a.indexOf(u) === -1;
      u.buildOrUpdateElements(f), o = Math.max(+u.getMaxOverflow(), o);
    }
    o = this._minPadding = n.layout.autoPadding ? o : 0, this._updateLayout(o), i || Mt(a, (c) => {
      c.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(Sf("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Mt(this.scales, (e) => {
      pe.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, s = new Set(Object.keys(this._listeners)), n = new Set(e.events);
    (!Fu(s, n) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: i, count: a } of s) {
      const o = n === "_removeElements" ? -a : a;
      lS(e, i, o);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (a) => new Set(e.filter((o) => o[0] === a).map((o, r) => r + "," + o.splice(1).join(","))), i = n(0);
    for (let a = 1; a < s; a++)
      if (!Fu(i, n(a)))
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
    this._layers = [], Mt(this.boxes, (i) => {
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
        this._updateDataset(s, Zs(e) ? e({
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
    }) !== !1 && (cs.has(this) ? this.attached && !cs.running(this) && cs.start(this) : (this.draw(), wf({
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
    }, i = nm(this, e);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (i && Rr(s, i), e.controller.draw(), i && Lr(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(e) {
    return xs(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, s, n, i) {
    const a = ov.modes[s];
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
    return this.$context || (this.$context = Qs(null, {
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
    pa(s) ? (a.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(e, n), o.update(a, {
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
    for (this.stop(), cs.remove(this), e = 0, s = this.data.datasets.length; e < s; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: s } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Hu(e, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete Co[this.id], this.notifyPlugins("afterDestroy");
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
    Mt(this.options.events, (a) => n(a, i));
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
    Mt(this._listeners, (e, s) => {
      this.platform.removeEventListener(this, s, e);
    }), this._listeners = {}, Mt(this._responsiveListeners, (e, s) => {
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
    !Qo(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
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
    const { _active: i = [], options: a } = this, o = s, r = this._getActiveElements(e, i, n, o), l = m_(e), c = cS(e, this._lastEvent, n, l);
    n && (this._lastEvent = null, Rt(a.onHover, [
      e,
      r,
      this
    ], this), l && Rt(a.onClick, [
      e,
      r,
      this
    ], this));
    const h = !Qo(r, i);
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
}, Q(Es, "defaults", It), Q(Es, "instances", Co), Q(Es, "overrides", Dn), Q(Es, "registry", Qe), Q(Es, "version", aS), Q(Es, "getChart", Cf), Es);
function kf() {
  return Mt(ar.instances, (t) => t._plugins.invalidate());
}
function hS(t, e, s) {
  const { startAngle: n, x: i, y: a, outerRadius: o, innerRadius: r, options: l } = e, { borderWidth: c, borderJoinStyle: h } = l, u = Math.min(c / o, fe(n - s));
  if (t.beginPath(), t.arc(i, a, o - c / 2, n + u / 2, s - u / 2), r > 0) {
    const f = Math.min(c / r, fe(n - s));
    t.arc(i, a, r + c / 2, s - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, o * fe(n - s));
    if (h === "round")
      t.arc(i, a, f, s - vt / 2, n + vt / 2, !0);
    else if (h === "bevel") {
      const d = 2 * f * f, p = -d * Math.cos(s + vt / 2) + i, g = -d * Math.sin(s + vt / 2) + a, m = d * Math.cos(n + vt / 2) + i, _ = d * Math.sin(n + vt / 2) + a;
      t.lineTo(p, g), t.lineTo(m, _);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function uS(t, e, s) {
  const { startAngle: n, pixelMargin: i, x: a, y: o, outerRadius: r, innerRadius: l } = e;
  let c = i / r;
  t.beginPath(), t.arc(a, o, r, n - c, s + c), l > i ? (c = i / l, t.arc(a, o, l, s + c, n - c, !0)) : t.arc(a, o, i, s + Ut, n - Ut), t.closePath(), t.clip();
}
function fS(t) {
  return oh(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function dS(t, e, s, n) {
  const i = fS(t.options.borderRadius), a = (s - e) / 2, o = Math.min(a, n * e / 2), r = (l) => {
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
function or(t, e, s, n, i, a) {
  const { x: o, y: r, startAngle: l, pixelMargin: c, innerRadius: h } = e, u = Math.max(e.outerRadius + n + s - c, 0), f = h > 0 ? h + n + s + c : 0;
  let d = 0;
  const p = i - l;
  if (n) {
    const D = h > 0 ? h - n : 0, M = u > 0 ? u - n : 0, T = (D + M) / 2, O = T !== 0 ? p * T / (T + n) : p;
    d = (p - O) / 2;
  }
  const g = Math.max(1e-3, p * u - s / vt) / u, m = (p - g) / 2, _ = l + m + d, y = i - m - d, { outerStart: b, outerEnd: v, innerStart: w, innerEnd: S } = dS(e, f, u, y - _), x = u - b, k = u - v, P = _ + b / x, F = y - v / k, E = f + w, C = f + S, N = _ + w / E, L = y - S / C;
  if (t.beginPath(), a) {
    const D = (P + F) / 2;
    if (t.arc(o, r, u, P, D), t.arc(o, r, u, D, F), v > 0) {
      const V = Vn(k, F, o, r);
      t.arc(V.x, V.y, v, F, y + Ut);
    }
    const M = Vn(C, y, o, r);
    if (t.lineTo(M.x, M.y), S > 0) {
      const V = Vn(C, L, o, r);
      t.arc(V.x, V.y, S, y + Ut, L + Math.PI);
    }
    const T = (y - S / f + (_ + w / f)) / 2;
    if (t.arc(o, r, f, y - S / f, T, !0), t.arc(o, r, f, T, _ + w / f, !0), w > 0) {
      const V = Vn(E, N, o, r);
      t.arc(V.x, V.y, w, N + Math.PI, _ - Ut);
    }
    const O = Vn(x, _, o, r);
    if (t.lineTo(O.x, O.y), b > 0) {
      const V = Vn(x, P, o, r);
      t.arc(V.x, V.y, b, _ - Ut, P);
    }
  } else {
    t.moveTo(o, r);
    const D = Math.cos(P) * u + o, M = Math.sin(P) * u + r;
    t.lineTo(D, M);
    const T = Math.cos(F) * u + o, O = Math.sin(F) * u + r;
    t.lineTo(T, O);
  }
  t.closePath();
}
function pS(t, e, s, n, i) {
  const { fullCircles: a, startAngle: o, circumference: r } = e;
  let l = e.endAngle;
  if (a) {
    or(t, e, s, n, l, i);
    for (let c = 0; c < a; ++c)
      t.fill();
    isNaN(r) || (l = o + (r % Ot || Ot));
  }
  return or(t, e, s, n, l, i), t.fill(), l;
}
function gS(t, e, s, n, i) {
  const { fullCircles: a, startAngle: o, circumference: r, options: l } = e, { borderWidth: c, borderJoinStyle: h, borderDash: u, borderDashOffset: f, borderRadius: d } = l, p = l.borderAlign === "inner";
  if (!c)
    return;
  t.setLineDash(u || []), t.lineDashOffset = f, p ? (t.lineWidth = c * 2, t.lineJoin = h || "round") : (t.lineWidth = c, t.lineJoin = h || "bevel");
  let g = e.endAngle;
  if (a) {
    or(t, e, s, n, g, i);
    for (let m = 0; m < a; ++m)
      t.stroke();
    isNaN(r) || (g = o + (r % Ot || Ot));
  }
  p && uS(t, e, g), l.selfJoin && g - o >= vt && d === 0 && h !== "miter" && hS(t, e, g), a || (or(t, e, s, n, g, i), t.stroke());
}
class Ii extends Rs {
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
    ], i), { angle: o, distance: r } = Ig(a, {
      x: s,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: h, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], i), d = (this.options.spacing + this.options.borderWidth) / 2, p = ut(f, c - l), g = ga(o, l, c) && l !== c, m = p >= Ot || g, _ = bs(r, h + d, u + d);
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
    ], s), { offset: c, spacing: h } = this.options, u = (a + o) / 2, f = (r + l + h + c) / 2;
    return {
      x: n + Math.cos(u) * f,
      y: i + Math.sin(u) * f
    };
  }
  tooltipPosition(s) {
    return this.getCenterPoint(s);
  }
  draw(s) {
    const { options: n, circumference: i } = this, a = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, r = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = i > Ot ? Math.floor(i / Ot) : 0, i === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    s.save();
    const l = (this.startAngle + this.endAngle) / 2;
    s.translate(Math.cos(l) * a, Math.sin(l) * a);
    const c = 1 - Math.sin(Math.min(vt, i || 0)), h = a * c;
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, pS(s, this, h, o, r), gS(s, this, h, o, r), s.restore();
  }
}
Q(Ii, "id", "arc"), Q(Ii, "defaults", {
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
}), Q(Ii, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Q(Ii, "descriptors", {
  _scriptable: !0,
  _indexable: (s) => s !== "borderDash"
});
function mm(t, e, s = e) {
  t.lineCap = ut(s.borderCapStyle, e.borderCapStyle), t.setLineDash(ut(s.borderDash, e.borderDash)), t.lineDashOffset = ut(s.borderDashOffset, e.borderDashOffset), t.lineJoin = ut(s.borderJoinStyle, e.borderJoinStyle), t.lineWidth = ut(s.borderWidth, e.borderWidth), t.strokeStyle = ut(s.borderColor, e.borderColor);
}
function mS(t, e, s) {
  t.lineTo(s.x, s.y);
}
function yS(t) {
  return t.stepped ? $_ : t.tension || t.cubicInterpolationMode === "monotone" ? j_ : mS;
}
function ym(t, e, s = {}) {
  const n = t.length, { start: i = 0, end: a = n - 1 } = s, { start: o, end: r } = e, l = Math.max(i, o), c = Math.min(a, r), h = i < o && a < o || i > r && a > r;
  return {
    count: n,
    start: l,
    loop: e.loop,
    ilen: c < l && !h ? n + c - l : c - l
  };
}
function bS(t, e, s, n) {
  const { points: i, options: a } = e, { count: o, start: r, loop: l, ilen: c } = ym(i, s, n), h = yS(a);
  let { move: u = !0, reverse: f } = n || {}, d, p, g;
  for (d = 0; d <= c; ++d)
    p = i[(r + (f ? c - d : d)) % o], !p.skip && (u ? (t.moveTo(p.x, p.y), u = !1) : h(t, g, p, f, a.stepped), g = p);
  return l && (p = i[(r + (f ? c : 0)) % o], h(t, g, p, f, a.stepped)), !!l;
}
function _S(t, e, s, n) {
  const i = e.points, { count: a, start: o, ilen: r } = ym(i, s, n), { move: l = !0, reverse: c } = n || {};
  let h = 0, u = 0, f, d, p, g, m, _;
  const y = (v) => (o + (c ? r - v : v)) % a, b = () => {
    g !== m && (t.lineTo(h, m), t.lineTo(h, g), t.lineTo(h, _));
  };
  for (l && (d = i[y(0)], t.moveTo(d.x, d.y)), f = 0; f <= r; ++f) {
    if (d = i[y(f)], d.skip)
      continue;
    const v = d.x, w = d.y, S = v | 0;
    S === p ? (w < g ? g = w : w > m && (m = w), h = (u * h + v) / ++u) : (b(), t.lineTo(v, w), p = S, u = 0, g = m = w), _ = w;
  }
  b();
}
function Zl(t) {
  const e = t.options, s = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !s ? _S : bS;
}
function xS(t) {
  return t.stepped ? bx : t.tension || t.cubicInterpolationMode === "monotone" ? _x : fn;
}
function vS(t, e, s, n) {
  let i = e._path;
  i || (i = e._path = new Path2D(), e.path(i, s, n) && i.closePath()), mm(t, e.options), t.stroke(i);
}
function SS(t, e, s, n) {
  const { segments: i, options: a } = e, o = Zl(e);
  for (const r of i)
    mm(t, a, r.style), t.beginPath(), o(t, e, r, {
      start: s,
      end: s + n - 1
    }) && t.closePath(), t.stroke();
}
const wS = typeof Path2D == "function";
function CS(t, e, s, n) {
  wS && !e.options.segment ? vS(t, e, s, n) : SS(t, e, s, n);
}
class Hs extends Rs {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, s) {
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const i = n.spanGaps ? this._loop : this._fullLoop;
      hx(this._points, n, e, i, s), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = kx(this, this.options.segment));
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
    const n = this.options, i = e[s], a = this.points, o = sm(this, {
      property: s,
      start: i,
      end: i
    });
    if (!o.length)
      return;
    const r = [], l = xS(n);
    let c, h;
    for (c = 0, h = o.length; c < h; ++c) {
      const { start: u, end: f } = o[c], d = a[u], p = a[f];
      if (d === p) {
        r.push(d);
        continue;
      }
      const g = Math.abs((i - d[s]) / (p[s] - d[s])), m = l(d, p, g, n.stepped);
      m[s] = e[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(e, s, n) {
    return Zl(this)(e, this, s, n);
  }
  path(e, s, n) {
    const i = this.segments, a = Zl(this);
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
    (this.points || []).length && a.borderWidth && (e.save(), CS(e, this, n, i), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Q(Hs, "id", "line"), Q(Hs, "defaults", {
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
}), Q(Hs, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Q(Hs, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function Mf(t, e, s, n) {
  const i = t.options, { [s]: a } = t.getProps([
    s
  ], n);
  return Math.abs(e - a) < i.radius + i.hitRadius;
}
class ko extends Rs {
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
    return Mf(this, s, "x", n);
  }
  inYRange(s, n) {
    return Mf(this, s, "y", n);
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
    this.skip || i.radius < 0.1 || !xs(this, n, this.size(i) / 2) || (s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.fillStyle = i.backgroundColor, Kl(s, i, this.x, this.y));
  }
  getRange() {
    const s = this.options || {};
    return s.radius + s.hitRadius;
  }
}
Q(ko, "id", "point"), /**
* @type {any}
*/
Q(ko, "defaults", {
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
Q(ko, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function bm(t, e) {
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
function zs(t, e, s, n) {
  return t ? 0 : se(e, s, n);
}
function kS(t, e, s) {
  const n = t.options.borderWidth, i = t.borderSkipped, a = Gg(n);
  return {
    t: zs(i.top, a.top, 0, s),
    r: zs(i.right, a.right, 0, e),
    b: zs(i.bottom, a.bottom, 0, s),
    l: zs(i.left, a.left, 0, e)
  };
}
function MS(t, e, s) {
  const { enableBorderRadius: n } = t.getProps([
    "enableBorderRadius"
  ]), i = t.options.borderRadius, a = Sn(i), o = Math.min(e, s), r = t.borderSkipped, l = n || bt(i);
  return {
    topLeft: zs(!l || r.top || r.left, a.topLeft, 0, o),
    topRight: zs(!l || r.top || r.right, a.topRight, 0, o),
    bottomLeft: zs(!l || r.bottom || r.left, a.bottomLeft, 0, o),
    bottomRight: zs(!l || r.bottom || r.right, a.bottomRight, 0, o)
  };
}
function AS(t) {
  const e = bm(t), s = e.right - e.left, n = e.bottom - e.top, i = kS(t, s / 2, n / 2), a = MS(t, s / 2, n / 2);
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
function cl(t, e, s, n) {
  const i = e === null, a = s === null, r = t && !(i && a) && bm(t, n);
  return r && (i || bs(e, r.left, r.right)) && (a || bs(s, r.top, r.bottom));
}
function PS(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function TS(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function hl(t, e, s = {}) {
  const n = t.x !== s.x ? -e : 0, i = t.y !== s.y ? -e : 0, a = (t.x + t.w !== s.x + s.w ? e : 0) - n, o = (t.y + t.h !== s.y + s.h ? e : 0) - i;
  return {
    x: t.x + n,
    y: t.y + i,
    w: t.w + a,
    h: t.h + o,
    radius: t.radius
  };
}
class Mo extends Rs {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: i } } = this, { inner: a, outer: o } = AS(this), r = PS(o.radius) ? ma : TS;
    e.save(), (o.w !== a.w || o.h !== a.h) && (e.beginPath(), r(e, hl(o, s, a)), e.clip(), r(e, hl(a, -s, o)), e.fillStyle = n, e.fill("evenodd")), e.beginPath(), r(e, hl(a, s)), e.fillStyle = i, e.fill(), e.restore();
  }
  inRange(e, s, n) {
    return cl(this, e, s, n);
  }
  inXRange(e, s) {
    return cl(this, e, null, s);
  }
  inYRange(e, s) {
    return cl(this, null, e, s);
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
Q(Mo, "id", "bar"), Q(Mo, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Q(Mo, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var DS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Ii,
  BarElement: Mo,
  LineElement: Hs,
  PointElement: ko
});
const Ql = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Af = /* @__PURE__ */ Ql.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function _m(t) {
  return Ql[t % Ql.length];
}
function xm(t) {
  return Af[t % Af.length];
}
function RS(t, e) {
  return t.borderColor = _m(e), t.backgroundColor = xm(e), ++e;
}
function LS(t, e) {
  return t.backgroundColor = t.data.map(() => _m(e++)), e;
}
function OS(t, e) {
  return t.backgroundColor = t.data.map(() => xm(e++)), e;
}
function FS(t) {
  let e = 0;
  return (s, n) => {
    const i = t.getDatasetMeta(n).controller;
    i instanceof gn ? e = LS(s, e) : i instanceof Zi ? e = OS(s, e) : i && (e = RS(s, e));
  };
}
function Pf(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function ES(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function IS() {
  return It.borderColor !== "rgba(0,0,0,0.1)" || It.backgroundColor !== "rgba(0,0,0,0.1)";
}
var NS = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, s) {
    if (!s.enabled)
      return;
    const { data: { datasets: n }, options: i } = t.config, { elements: a } = i, o = Pf(n) || ES(i) || a && Pf(a) || IS();
    if (!s.forceOverride && o)
      return;
    const r = FS(t);
    n.forEach(r);
  }
};
function BS(t, e, s, n, i) {
  const a = i.samples || n;
  if (a >= s)
    return t.slice(e, e + s);
  const o = [], r = (s - 2) / (a - 2);
  let l = 0;
  const c = e + s - 1;
  let h = e, u, f, d, p, g;
  for (o[l++] = t[h], u = 0; u < a - 2; u++) {
    let m = 0, _ = 0, y;
    const b = Math.floor((u + 1) * r) + 1 + e, v = Math.min(Math.floor((u + 2) * r) + 1, s) + e, w = v - b;
    for (y = b; y < v; y++)
      m += t[y].x, _ += t[y].y;
    m /= w, _ /= w;
    const S = Math.floor(u * r) + 1 + e, x = Math.min(Math.floor((u + 1) * r) + 1, s) + e, { x: k, y: P } = t[h];
    for (d = p = -1, y = S; y < x; y++)
      p = 0.5 * Math.abs((k - m) * (t[y].y - P) - (k - t[y].x) * (_ - P)), p > d && (d = p, f = t[y], g = y);
    o[l++] = f, h = g;
  }
  return o[l++] = t[c], o;
}
function $S(t, e, s, n) {
  let i = 0, a = 0, o, r, l, c, h, u, f, d, p, g;
  const m = [], _ = e + s - 1, y = t[e].x, v = t[_].x - y;
  for (o = e; o < e + s; ++o) {
    r = t[o], l = (r.x - y) / v * n, c = r.y;
    const w = l | 0;
    if (w === h)
      c < p ? (p = c, u = o) : c > g && (g = c, f = o), i = (a * i + r.x) / ++a;
    else {
      const S = o - 1;
      if (!mt(u) && !mt(f)) {
        const x = Math.min(u, f), k = Math.max(u, f);
        x !== d && x !== S && m.push({
          ...t[x],
          x: i
        }), k !== d && k !== S && m.push({
          ...t[k],
          x: i
        });
      }
      o > 0 && S !== d && m.push(t[S]), m.push(r), h = w, a = 0, p = g = c, u = f = d = o;
    }
  }
  return m;
}
function vm(t) {
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
function Tf(t) {
  t.data.datasets.forEach((e) => {
    vm(e);
  });
}
function jS(t, e) {
  const s = e.length;
  let n = 0, i;
  const { iScale: a } = t, { min: o, max: r, minDefined: l, maxDefined: c } = a.getUserBounds();
  return l && (n = se(_s(e, a.axis, o).lo, 0, s - 1)), c ? i = se(_s(e, a.axis, r).hi + 1, n, s) - n : i = s - n, {
    start: n,
    count: i
  };
}
var WS = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, s) => {
    if (!s.enabled) {
      Tf(t);
      return;
    }
    const n = t.width;
    t.data.datasets.forEach((i, a) => {
      const { _data: o, indexAxis: r } = i, l = t.getDatasetMeta(a), c = o || i.data;
      if (Fi([
        r,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = t.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || t.options.parsing)
        return;
      let { start: u, count: f } = jS(l, c);
      const d = s.threshold || 4 * n;
      if (f <= d) {
        vm(i);
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
      let p;
      switch (s.algorithm) {
        case "lttb":
          p = BS(c, u, f, n, s);
          break;
        case "min-max":
          p = $S(c, u, f, n);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${s.algorithm}'`);
      }
      i._decimated = p;
    });
  },
  destroy(t) {
    Tf(t);
  }
};
function VS(t, e, s) {
  const n = t.segments, i = t.points, a = e.points, o = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = Er(l, c, i);
    const h = tc(s, i[l], i[c], r.loop);
    if (!e.segments) {
      o.push({
        source: r,
        target: h,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const u = sm(e, h);
    for (const f of u) {
      const d = tc(s, a[f.start], a[f.end], f.loop), p = em(r, i, d);
      for (const g of p)
        o.push({
          source: g,
          target: f,
          start: {
            [s]: Df(h, d, "start", Math.max)
          },
          end: {
            [s]: Df(h, d, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function tc(t, e, s, n) {
  if (n)
    return;
  let i = e[t], a = s[t];
  return t === "angle" && (i = fe(i), a = fe(a)), {
    property: t,
    start: i,
    end: a
  };
}
function HS(t, e) {
  const { x: s = null, y: n = null } = t || {}, i = e.points, a = [];
  return e.segments.forEach(({ start: o, end: r }) => {
    r = Er(o, r, i);
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
function Er(t, e, s) {
  for (; e > t; e--) {
    const n = s[e];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return e;
}
function Df(t, e, s, n) {
  return t && e ? n(t[s], e[s]) : t ? t[s] : e ? e[s] : 0;
}
function Sm(t, e) {
  let s = [], n = !1;
  return Ft(t) ? (n = !0, s = t) : s = HS(t, e), s.length ? new Hs({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function Rf(t) {
  return t && t.fill !== !1;
}
function zS(t, e, s) {
  let i = t[e].fill;
  const a = [
    e
  ];
  let o;
  if (!s)
    return i;
  for (; i !== !1 && a.indexOf(i) === -1; ) {
    if (!$t(i))
      return i;
    if (o = t[i], !o)
      return !1;
    if (o.visible)
      return i;
    a.push(i), i = o.fill;
  }
  return !1;
}
function GS(t, e, s) {
  const n = YS(t);
  if (bt(n))
    return isNaN(n.value) ? !1 : n;
  let i = parseFloat(n);
  return $t(i) && Math.floor(i) === i ? US(n[0], e, i, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function US(t, e, s, n) {
  return (t === "-" || t === "+") && (s = e + s), s === e || s < 0 || s >= n ? !1 : s;
}
function qS(t, e) {
  let s = null;
  return t === "start" ? s = e.bottom : t === "end" ? s = e.top : bt(t) ? s = e.getPixelForValue(t.value) : e.getBasePixel && (s = e.getBasePixel()), s;
}
function KS(t, e, s) {
  let n;
  return t === "start" ? n = s : t === "end" ? n = e.options.reverse ? e.min : e.max : bt(t) ? n = t.value : n = e.getBaseValue(), n;
}
function YS(t) {
  const e = t.options, s = e.fill;
  let n = ut(s && s.target, s);
  return n === void 0 && (n = !!e.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function JS(t) {
  const { scale: e, index: s, line: n } = t, i = [], a = n.segments, o = n.points, r = XS(e, s);
  r.push(Sm({
    x: null,
    y: e.bottom
  }, n));
  for (let l = 0; l < a.length; l++) {
    const c = a[l];
    for (let h = c.start; h <= c.end; h++)
      ZS(i, o[h], r);
  }
  return new Hs({
    points: i,
    options: {}
  });
}
function XS(t, e) {
  const s = [], n = t.getMatchingVisibleMetas("line");
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (a.index === e)
      break;
    a.hidden || s.unshift(a.dataset);
  }
  return s;
}
function ZS(t, e, s) {
  const n = [];
  for (let i = 0; i < s.length; i++) {
    const a = s[i], { first: o, last: r, point: l } = QS(a, e, "x");
    if (!(!l || o && r)) {
      if (o)
        n.unshift(l);
      else if (t.push(l), !r)
        break;
    }
  }
  t.push(...n);
}
function QS(t, e, s) {
  const n = t.interpolate(e, s);
  if (!n)
    return {};
  const i = n[s], a = t.segments, o = t.points;
  let r = !1, l = !1;
  for (let c = 0; c < a.length; c++) {
    const h = a[c], u = o[h.start][s], f = o[h.end][s];
    if (bs(i, u, f)) {
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
class wm {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, s, n) {
    const { x: i, y: a, radius: o } = this;
    return s = s || {
      start: 0,
      end: Ot
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
function tw(t) {
  const { chart: e, fill: s, line: n } = t;
  if ($t(s))
    return ew(e, s);
  if (s === "stack")
    return JS(t);
  if (s === "shape")
    return !0;
  const i = sw(t);
  return i instanceof wm ? i : Sm(i, n);
}
function ew(t, e) {
  const s = t.getDatasetMeta(e);
  return s && t.isDatasetVisible(e) ? s.dataset : null;
}
function sw(t) {
  return (t.scale || {}).getPointPositionForValue ? iw(t) : nw(t);
}
function nw(t) {
  const { scale: e = {}, fill: s } = t, n = qS(s, e);
  if ($t(n)) {
    const i = e.isHorizontal();
    return {
      x: i ? n : null,
      y: i ? null : n
    };
  }
  return null;
}
function iw(t) {
  const { scale: e, fill: s } = t, n = e.options, i = e.getLabels().length, a = n.reverse ? e.max : e.min, o = KS(s, e, a), r = [];
  if (n.grid.circular) {
    const l = e.getPointPositionForValue(0, a);
    return new wm({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < i; ++l)
    r.push(e.getPointPositionForValue(l, o));
  return r;
}
function ul(t, e, s) {
  const n = tw(e), { chart: i, index: a, line: o, scale: r, axis: l } = e, c = o.options, h = c.fill, u = c.backgroundColor, { above: f = u, below: d = u } = h || {}, p = i.getDatasetMeta(a), g = nm(i, p);
  n && o.points.length && (Rr(t, s), aw(t, {
    line: o,
    target: n,
    above: f,
    below: d,
    area: s,
    scale: r,
    axis: l,
    clip: g
  }), Lr(t));
}
function aw(t, e) {
  const { line: s, target: n, above: i, below: a, area: o, scale: r, clip: l } = e, c = s._loop ? "angle" : e.axis;
  t.save();
  let h = a;
  a !== i && (c === "x" ? (Lf(t, n, o.top), fl(t, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Lf(t, n, o.bottom)) : c === "y" && (Of(t, n, o.left), fl(t, {
    line: s,
    target: n,
    color: a,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Of(t, n, o.right), h = i)), fl(t, {
    line: s,
    target: n,
    color: h,
    scale: r,
    property: c,
    clip: l
  }), t.restore();
}
function Lf(t, e, s) {
  const { segments: n, points: i } = e;
  let a = !0, o = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[Er(l, c, i)];
    a ? (t.moveTo(h.x, h.y), a = !1) : (t.lineTo(h.x, s), t.lineTo(h.x, h.y)), o = !!e.pathSegment(t, r, {
      move: o
    }), o ? t.closePath() : t.lineTo(u.x, s);
  }
  t.lineTo(e.first().x, s), t.closePath(), t.clip();
}
function Of(t, e, s) {
  const { segments: n, points: i } = e;
  let a = !0, o = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[Er(l, c, i)];
    a ? (t.moveTo(h.x, h.y), a = !1) : (t.lineTo(s, h.y), t.lineTo(h.x, h.y)), o = !!e.pathSegment(t, r, {
      move: o
    }), o ? t.closePath() : t.lineTo(s, u.y);
  }
  t.lineTo(s, e.first().y), t.closePath(), t.clip();
}
function fl(t, e) {
  const { line: s, target: n, property: i, color: a, scale: o, clip: r } = e, l = VS(s, n, i);
  for (const { source: c, target: h, start: u, end: f } of l) {
    const { style: { backgroundColor: d = a } = {} } = c, p = n !== !0;
    t.save(), t.fillStyle = d, ow(t, o, r, p && tc(i, u, f)), t.beginPath();
    const g = !!s.pathSegment(t, c);
    let m;
    if (p) {
      g ? t.closePath() : Ff(t, n, f, i);
      const _ = !!n.pathSegment(t, h, {
        move: g,
        reverse: !0
      });
      m = g && _, m || Ff(t, n, u, i);
    }
    t.closePath(), t.fill(m ? "evenodd" : "nonzero"), t.restore();
  }
}
function ow(t, e, s, n) {
  const i = e.chart.chartArea, { property: a, start: o, end: r } = n || {};
  if (a === "x" || a === "y") {
    let l, c, h, u;
    a === "x" ? (l = o, c = i.top, h = r, u = i.bottom) : (l = i.left, c = o, h = i.right, u = r), t.beginPath(), s && (l = Math.max(l, s.left), h = Math.min(h, s.right), c = Math.max(c, s.top), u = Math.min(u, s.bottom)), t.rect(l, c, h - l, u - c), t.clip();
  }
}
function Ff(t, e, s, n) {
  const i = e.interpolate(s, n);
  i && t.lineTo(i.x, i.y);
}
var rw = {
  id: "filler",
  afterDatasetsUpdate(t, e, s) {
    const n = (t.data.datasets || []).length, i = [];
    let a, o, r, l;
    for (o = 0; o < n; ++o)
      a = t.getDatasetMeta(o), r = a.dataset, l = null, r && r.options && r instanceof Hs && (l = {
        visible: t.isDatasetVisible(o),
        index: o,
        fill: GS(r, o, n),
        chart: t,
        axis: a.controller.options.indexAxis,
        scale: a.vScale,
        line: r
      }), a.$filler = l, i.push(l);
    for (o = 0; o < n; ++o)
      l = i[o], !(!l || l.fill === !1) && (l.fill = zS(i, o, s.propagate));
  },
  beforeDraw(t, e, s) {
    const n = s.drawTime === "beforeDraw", i = t.getSortedVisibleDatasetMetas(), a = t.chartArea;
    for (let o = i.length - 1; o >= 0; --o) {
      const r = i[o].$filler;
      r && (r.line.updateControlPoints(a, r.axis), n && r.fill && ul(t.ctx, r, a));
    }
  },
  beforeDatasetsDraw(t, e, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = t.getSortedVisibleDatasetMetas();
    for (let i = n.length - 1; i >= 0; --i) {
      const a = n[i].$filler;
      Rf(a) && ul(t.ctx, a, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, s) {
    const n = e.meta.$filler;
    !Rf(n) || s.drawTime !== "beforeDatasetDraw" || ul(t.ctx, n, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Ef = (t, e) => {
  let { boxHeight: s = e, boxWidth: n = e } = t;
  return t.usePointStyle && (s = Math.min(s, e), n = t.pointStyleWidth || Math.min(n, e)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(e, s)
  };
}, lw = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class If extends Rs {
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
    const n = e.labels, i = Zt(n.font), a = i.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Ef(n, a);
    let c, h;
    s.font = i.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(o, a, r, l) + 10) : (h = this.maxHeight, c = this._fitCols(o, i, r, l) + 10), this.width = Math.min(c, e.maxWidth || this.maxWidth), this.height = Math.min(h, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, s, n, i) {
    const { ctx: a, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = i + r;
    let u = e;
    a.textAlign = "left", a.textBaseline = "middle";
    let f = -1, d = -h;
    return this.legendItems.forEach((p, g) => {
      const m = n + s / 2 + a.measureText(p.text).width;
      (g === 0 || c[c.length - 1] + m + 2 * r > o) && (u += h, c[c.length - (g > 0 ? 0 : 1)] = 0, d += h, f++), l[g] = {
        left: 0,
        top: d,
        row: f,
        width: m,
        height: i
      }, c[c.length - 1] += m + r;
    }), u;
  }
  _fitCols(e, s, n, i) {
    const { ctx: a, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = o - e;
    let u = r, f = 0, d = 0, p = 0, g = 0;
    return this.legendItems.forEach((m, _) => {
      const { itemWidth: y, itemHeight: b } = cw(n, s, a, m, i);
      _ > 0 && d + b + 2 * r > h && (u += f + r, c.push({
        width: f,
        height: d
      }), p += f + r, g++, f = d = 0), l[_] = {
        left: p,
        top: d,
        col: g,
        width: y,
        height: b
      }, f = Math.max(f, y), d += b + r;
    }), u += f, c.push({
      width: f,
      height: d
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: i }, rtl: a } } = this, o = ai(a, this.left, this.width);
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
      Rr(e, this), this._draw(), Lr(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: s, lineWidths: n, ctx: i } = this, { align: a, labels: o } = e, r = It.color, l = ai(e.rtl, this.left, this.width), c = Zt(o.font), { padding: h } = o, u = c.size, f = u / 2;
    let d;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: p, boxHeight: g, itemHeight: m } = Ef(o, u), _ = function(S, x, k) {
      if (isNaN(p) || p <= 0 || isNaN(g) || g < 0)
        return;
      i.save();
      const P = ut(k.lineWidth, 1);
      if (i.fillStyle = ut(k.fillStyle, r), i.lineCap = ut(k.lineCap, "butt"), i.lineDashOffset = ut(k.lineDashOffset, 0), i.lineJoin = ut(k.lineJoin, "miter"), i.lineWidth = P, i.strokeStyle = ut(k.strokeStyle, r), i.setLineDash(ut(k.lineDash, [])), o.usePointStyle) {
        const F = {
          radius: g * Math.SQRT2 / 2,
          pointStyle: k.pointStyle,
          rotation: k.rotation,
          borderWidth: P
        }, E = l.xPlus(S, p / 2), C = x + f;
        zg(i, F, E, C, o.pointStyleWidth && p);
      } else {
        const F = x + Math.max((u - g) / 2, 0), E = l.leftForLtr(S, p), C = Sn(k.borderRadius);
        i.beginPath(), Object.values(C).some((N) => N !== 0) ? ma(i, {
          x: E,
          y: F,
          w: p,
          h: g,
          radius: C
        }) : i.rect(E, F, p, g), i.fill(), P !== 0 && i.stroke();
      }
      i.restore();
    }, y = function(S, x, k) {
      Rn(i, k.text, S, x + m / 2, c, {
        strikethrough: k.hidden,
        textAlign: l.textAlign(k.textAlign)
      });
    }, b = this.isHorizontal(), v = this._computeTitleHeight();
    b ? d = {
      x: ce(a, this.left + h, this.right - n[0]),
      y: this.top + h + v,
      line: 0
    } : d = {
      x: this.left + h,
      y: ce(a, this.top + v + h, this.bottom - s[0].height),
      line: 0
    }, Zg(this.ctx, e.textDirection);
    const w = m + h;
    this.legendItems.forEach((S, x) => {
      i.strokeStyle = S.fontColor, i.fillStyle = S.fontColor;
      const k = i.measureText(S.text).width, P = l.textAlign(S.textAlign || (S.textAlign = o.textAlign)), F = p + f + k;
      let E = d.x, C = d.y;
      l.setWidth(this.width), b ? x > 0 && E + F + h > this.right && (C = d.y += w, d.line++, E = d.x = ce(a, this.left + h, this.right - n[d.line])) : x > 0 && C + w > this.bottom && (E = d.x = E + s[d.line].width + h, d.line++, C = d.y = ce(a, this.top + v + h, this.bottom - s[d.line].height));
      const N = l.x(E);
      if (_(N, C, S), E = P_(P, E + p + f, b ? E + F : this.right, e.rtl), y(l.x(E), C, S), b)
        d.x += F + h;
      else if (typeof S.text != "string") {
        const L = c.lineHeight;
        d.y += Cm(S, L) + h;
      } else
        d.y += w;
    }), Qg(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, s = e.title, n = Zt(s.font), i = me(s.padding);
    if (!s.display)
      return;
    const a = ai(e.rtl, this.left, this.width), o = this.ctx, r = s.position, l = n.size / 2, c = i.top + l;
    let h, u = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), h = this.top + c, u = ce(e.align, u, this.right - f);
    else {
      const p = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h = c + ce(e.align, this.top, this.bottom - p - e.labels.padding - this._computeTitleHeight());
    }
    const d = ce(r, u, u + f);
    o.textAlign = a.textAlign(ih(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = n.string, Rn(o, s.text, d, h, n);
  }
  _computeTitleHeight() {
    const e = this.options.title, s = Zt(e.font), n = me(e.padding);
    return e.display ? s.lineHeight + n.height : 0;
  }
  _getLegendItemAt(e, s) {
    let n, i, a;
    if (bs(e, this.left, this.right) && bs(s, this.top, this.bottom)) {
      for (a = this.legendHitBoxes, n = 0; n < a.length; ++n)
        if (i = a[n], bs(e, i.left, i.left + i.width) && bs(s, i.top, i.top + i.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(e) {
    const s = this.options;
    if (!fw(e.type, s))
      return;
    const n = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const i = this._hoveredItem, a = lw(i, n);
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
function cw(t, e, s, n, i) {
  const a = hw(n, t, e, s), o = uw(i, n, e.lineHeight);
  return {
    itemWidth: a,
    itemHeight: o
  };
}
function hw(t, e, s, n) {
  let i = t.text;
  return i && typeof i != "string" && (i = i.reduce((a, o) => a.length > o.length ? a : o)), e + s.size / 2 + n.measureText(i).width;
}
function uw(t, e, s) {
  let n = t;
  return typeof e.text != "string" && (n = Cm(e, s)), n;
}
function Cm(t, e) {
  const s = t.text ? t.text.length : 0;
  return e * s;
}
function fw(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var dw = {
  id: "legend",
  _element: If,
  start(t, e, s) {
    const n = t.legend = new If({
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
class dh extends Rs {
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
    Rn(e, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: l,
      rotation: c,
      textAlign: ih(s.align),
      textBaseline: "middle",
      translation: [
        o,
        r
      ]
    });
  }
}
function pw(t, e) {
  const s = new dh({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  pe.configure(t, s, e), pe.addBox(t, s), t.titleBlock = s;
}
var gw = {
  id: "title",
  _element: dh,
  start(t, e, s) {
    pw(t, s);
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
const ao = /* @__PURE__ */ new WeakMap();
var mw = {
  id: "subtitle",
  start(t, e, s) {
    const n = new dh({
      ctx: t.ctx,
      options: s,
      chart: t
    });
    pe.configure(t, n, s), pe.addBox(t, n), ao.set(t, n);
  },
  stop(t) {
    pe.removeBox(t, ao.get(t)), ao.delete(t);
  },
  beforeUpdate(t, e, s) {
    const n = ao.get(t);
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
const Ni = {
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
        const c = l.getCenterPoint(), h = Ul(e, c);
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
function Xe(t, e) {
  return e && (Ft(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function hs(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function yw(t, e) {
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
function Nf(t, e) {
  const s = t.chart.ctx, { body: n, footer: i, title: a } = t, { boxWidth: o, boxHeight: r } = e, l = Zt(e.bodyFont), c = Zt(e.titleFont), h = Zt(e.footerFont), u = a.length, f = i.length, d = n.length, p = me(e.padding);
  let g = p.height, m = 0, _ = n.reduce((v, w) => v + w.before.length + w.lines.length + w.after.length, 0);
  if (_ += t.beforeBody.length + t.afterBody.length, u && (g += u * c.lineHeight + (u - 1) * e.titleSpacing + e.titleMarginBottom), _) {
    const v = e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    g += d * v + (_ - d) * l.lineHeight + (_ - 1) * e.bodySpacing;
  }
  f && (g += e.footerMarginTop + f * h.lineHeight + (f - 1) * e.footerSpacing);
  let y = 0;
  const b = function(v) {
    m = Math.max(m, s.measureText(v).width + y);
  };
  return s.save(), s.font = c.string, Mt(t.title, b), s.font = l.string, Mt(t.beforeBody.concat(t.afterBody), b), y = e.displayColors ? o + 2 + e.boxPadding : 0, Mt(n, (v) => {
    Mt(v.before, b), Mt(v.lines, b), Mt(v.after, b);
  }), y = 0, s.font = h.string, Mt(t.footer, b), s.restore(), m += p.width, {
    width: m,
    height: g
  };
}
function bw(t, e) {
  const { y: s, height: n } = e;
  return s < n / 2 ? "top" : s > t.height - n / 2 ? "bottom" : "center";
}
function _w(t, e, s, n) {
  const { x: i, width: a } = n, o = s.caretSize + s.caretPadding;
  if (t === "left" && i + a + o > e.width || t === "right" && i - a - o < 0)
    return !0;
}
function xw(t, e, s, n) {
  const { x: i, width: a } = s, { width: o, chartArea: { left: r, right: l } } = t;
  let c = "center";
  return n === "center" ? c = i <= (r + l) / 2 ? "left" : "right" : i <= a / 2 ? c = "left" : i >= o - a / 2 && (c = "right"), _w(c, t, e, s) && (c = "center"), c;
}
function Bf(t, e, s) {
  const n = s.yAlign || e.yAlign || bw(t, s);
  return {
    xAlign: s.xAlign || e.xAlign || xw(t, e, s, n),
    yAlign: n
  };
}
function vw(t, e) {
  let { x: s, width: n } = t;
  return e === "right" ? s -= n : e === "center" && (s -= n / 2), s;
}
function Sw(t, e, s) {
  let { y: n, height: i } = t;
  return e === "top" ? n += s : e === "bottom" ? n -= i + s : n -= i / 2, n;
}
function $f(t, e, s, n) {
  const { caretSize: i, caretPadding: a, cornerRadius: o } = t, { xAlign: r, yAlign: l } = s, c = i + a, { topLeft: h, topRight: u, bottomLeft: f, bottomRight: d } = Sn(o);
  let p = vw(e, r);
  const g = Sw(e, l, c);
  return l === "center" ? r === "left" ? p += c : r === "right" && (p -= c) : r === "left" ? p -= Math.max(h, f) + i : r === "right" && (p += Math.max(u, d) + i), {
    x: se(p, 0, n.width - e.width),
    y: se(g, 0, n.height - e.height)
  };
}
function oo(t, e, s) {
  const n = me(s.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - n.right : t.x + n.left;
}
function jf(t) {
  return Xe([], hs(t));
}
function ww(t, e, s) {
  return Qs(t, {
    tooltip: e,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Wf(t, e) {
  const s = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return s ? t.override(s) : t;
}
const km = {
  beforeTitle: rs,
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
  afterTitle: rs,
  beforeBody: rs,
  beforeLabel: rs,
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
  afterLabel: rs,
  afterBody: rs,
  beforeFooter: rs,
  footer: rs,
  afterFooter: rs
};
function we(t, e, s, n) {
  const i = t[e].call(s, n);
  return typeof i > "u" ? km[e].call(s, n) : i;
}
class ec extends Rs {
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
    const s = this.chart, n = this.options.setContext(this.getContext()), i = n.enabled && s.options.animation && n.animations, a = new im(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(a)), a;
  }
  getContext() {
    return this.$context || (this.$context = ww(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeTitle", this, e), a = we(n, "title", this, e), o = we(n, "afterTitle", this, e);
    let r = [];
    return r = Xe(r, hs(i)), r = Xe(r, hs(a)), r = Xe(r, hs(o)), r;
  }
  getBeforeBody(e, s) {
    return jf(we(s.callbacks, "beforeBody", this, e));
  }
  getBody(e, s) {
    const { callbacks: n } = s, i = [];
    return Mt(e, (a) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = Wf(n, a);
      Xe(o.before, hs(we(r, "beforeLabel", this, a))), Xe(o.lines, we(r, "label", this, a)), Xe(o.after, hs(we(r, "afterLabel", this, a))), i.push(o);
    }), i;
  }
  getAfterBody(e, s) {
    return jf(we(s.callbacks, "afterBody", this, e));
  }
  getFooter(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeFooter", this, e), a = we(n, "footer", this, e), o = we(n, "afterFooter", this, e);
    let r = [];
    return r = Xe(r, hs(i)), r = Xe(r, hs(a)), r = Xe(r, hs(o)), r;
  }
  _createItems(e) {
    const s = this._active, n = this.chart.data, i = [], a = [], o = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push(yw(this.chart, s[l]));
    return e.filter && (r = r.filter((h, u, f) => e.filter(h, u, f, n))), e.itemSort && (r = r.sort((h, u) => e.itemSort(h, u, n))), Mt(r, (h) => {
      const u = Wf(e.callbacks, h);
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
      const r = Ni[n.position].call(this, i, this._eventPosition);
      o = this._createItems(n), this.title = this.getTitle(o, n), this.beforeBody = this.getBeforeBody(o, n), this.body = this.getBody(o, n), this.afterBody = this.getAfterBody(o, n), this.footer = this.getFooter(o, n);
      const l = this._size = Nf(this, n), c = Object.assign({}, r, l), h = Bf(this.chart, n, c), u = $f(n, c, h, this.chart);
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
    const { xAlign: i, yAlign: a } = this, { caretSize: o, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: u } = Sn(r), { x: f, y: d } = e, { width: p, height: g } = s;
    let m, _, y, b, v, w;
    return a === "center" ? (v = d + g / 2, i === "left" ? (m = f, _ = m - o, b = v + o, w = v - o) : (m = f + p, _ = m + o, b = v - o, w = v + o), y = m) : (i === "left" ? _ = f + Math.max(l, h) + o : i === "right" ? _ = f + p - Math.max(c, u) - o : _ = this.caretX, a === "top" ? (b = d, v = b - o, m = _ - o, y = _ + o) : (b = d + g, v = b + o, m = _ + o, y = _ - o), w = b), {
      x1: m,
      x2: _,
      x3: y,
      y1: b,
      y2: v,
      y3: w
    };
  }
  drawTitle(e, s, n) {
    const i = this.title, a = i.length;
    let o, r, l;
    if (a) {
      const c = ai(n.rtl, this.x, this.width);
      for (e.x = oo(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", o = Zt(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = o.string, l = 0; l < a; ++l)
        s.fillText(i[l], c.x(e.x), e.y + o.lineHeight / 2), e.y += o.lineHeight + r, l + 1 === a && (e.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(e, s, n, i, a) {
    const o = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = a, h = Zt(a.bodyFont), u = oo(this, "left", a), f = i.x(u), d = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, p = s.y + d;
    if (a.usePointStyle) {
      const g = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = i.leftForLtr(f, c) + c / 2, _ = p + l / 2;
      e.strokeStyle = a.multiKeyBackground, e.fillStyle = a.multiKeyBackground, Kl(e, g, m, _), e.strokeStyle = o.borderColor, e.fillStyle = o.backgroundColor, Kl(e, g, m, _);
    } else {
      e.lineWidth = bt(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, e.strokeStyle = o.borderColor, e.setLineDash(o.borderDash || []), e.lineDashOffset = o.borderDashOffset || 0;
      const g = i.leftForLtr(f, c), m = i.leftForLtr(i.xPlus(f, 1), c - 2), _ = Sn(o.borderRadius);
      Object.values(_).some((y) => y !== 0) ? (e.beginPath(), e.fillStyle = a.multiKeyBackground, ma(e, {
        x: g,
        y: p,
        w: c,
        h: l,
        radius: _
      }), e.fill(), e.stroke(), e.fillStyle = o.backgroundColor, e.beginPath(), ma(e, {
        x: m,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), e.fill()) : (e.fillStyle = a.multiKeyBackground, e.fillRect(g, p, c, l), e.strokeRect(g, p, c, l), e.fillStyle = o.backgroundColor, e.fillRect(m, p + 1, c - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[n];
  }
  drawBody(e, s, n) {
    const { body: i } = this, { bodySpacing: a, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: h } = n, u = Zt(n.bodyFont);
    let f = u.lineHeight, d = 0;
    const p = ai(n.rtl, this.x, this.width), g = function(k) {
      s.fillText(k, p.x(e.x + d), e.y + f / 2), e.y += f + a;
    }, m = p.textAlign(o);
    let _, y, b, v, w, S, x;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = u.string, e.x = oo(this, m, n), s.fillStyle = n.bodyColor, Mt(this.beforeBody, g), d = r && m !== "right" ? o === "center" ? c / 2 + h : c + 2 + h : 0, v = 0, S = i.length; v < S; ++v) {
      for (_ = i[v], y = this.labelTextColors[v], s.fillStyle = y, Mt(_.before, g), b = _.lines, r && b.length && (this._drawColorBox(s, e, v, p, n), f = Math.max(u.lineHeight, l)), w = 0, x = b.length; w < x; ++w)
        g(b[w]), f = u.lineHeight;
      Mt(_.after, g);
    }
    d = 0, f = u.lineHeight, Mt(this.afterBody, g), e.y -= a;
  }
  drawFooter(e, s, n) {
    const i = this.footer, a = i.length;
    let o, r;
    if (a) {
      const l = ai(n.rtl, this.x, this.width);
      for (e.x = oo(this, n.footerAlign, n), e.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", o = Zt(n.footerFont), s.fillStyle = n.footerColor, s.font = o.string, r = 0; r < a; ++r)
        s.fillText(i[r], l.x(e.x), e.y + o.lineHeight / 2), e.y += o.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(e, s, n, i) {
    const { xAlign: a, yAlign: o } = this, { x: r, y: l } = e, { width: c, height: h } = n, { topLeft: u, topRight: f, bottomLeft: d, bottomRight: p } = Sn(i.cornerRadius);
    s.fillStyle = i.backgroundColor, s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.beginPath(), s.moveTo(r + u, l), o === "top" && this.drawCaret(e, s, n, i), s.lineTo(r + c - f, l), s.quadraticCurveTo(r + c, l, r + c, l + f), o === "center" && a === "right" && this.drawCaret(e, s, n, i), s.lineTo(r + c, l + h - p), s.quadraticCurveTo(r + c, l + h, r + c - p, l + h), o === "bottom" && this.drawCaret(e, s, n, i), s.lineTo(r + d, l + h), s.quadraticCurveTo(r, l + h, r, l + h - d), o === "center" && a === "left" && this.drawCaret(e, s, n, i), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), i.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(e) {
    const s = this.chart, n = this.$animations, i = n && n.x, a = n && n.y;
    if (i || a) {
      const o = Ni[e.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = Nf(this, e), l = Object.assign({}, o, this._size), c = Bf(s, e, l), h = $f(e, l, c, s);
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
    s.enabled && r && (e.save(), e.globalAlpha = n, this.drawBackground(a, e, i, s), Zg(e, s.textDirection), a.y += o.top, this.drawTitle(a, e, s), this.drawBody(a, e, s), this.drawFooter(a, e, s), Qg(e, s.textDirection), e.restore());
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
    }), a = !Qo(n, i), o = this._positionChanged(i, s);
    (a || o) && (this._active = i, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, a = this._active || [], o = this._getActiveElements(e, a, s, n), r = this._positionChanged(o, e), l = s || !Qo(o, a) || r;
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
    const { caretX: n, caretY: i, options: a } = this, o = Ni[a.position].call(this, e, s);
    return o !== !1 && (n !== o.x || i !== o.y);
  }
}
Q(ec, "positioners", Ni);
var Cw = {
  id: "tooltip",
  _element: ec,
  positioners: Ni,
  afterInit(t, e, s) {
    s && (t.tooltip = new ec({
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
    callbacks: km
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
}, kw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: NS,
  Decimation: WS,
  Filler: rw,
  Legend: dw,
  SubTitle: mw,
  Title: gw,
  Tooltip: Cw
});
const Mw = (t, e, s, n) => (typeof e == "string" ? (s = t.push(e) - 1, n.unshift({
  index: s,
  label: e
})) : isNaN(e) && (s = null), s);
function Aw(t, e, s, n) {
  const i = t.indexOf(e);
  if (i === -1)
    return Mw(t, e, s, n);
  const a = t.lastIndexOf(e);
  return i !== a ? s : i;
}
const Pw = (t, e) => t === null ? null : se(Math.round(t), 0, e);
function Vf(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class sc extends In {
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
    return s = isFinite(s) && n[s] === e ? s : Aw(n, e, ut(s, e), this._addedLabels), Pw(s, n.length - 1);
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
    return Vf.call(this, e);
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
Q(sc, "id", "category"), Q(sc, "defaults", {
  ticks: {
    callback: Vf
  }
});
function Tw(t, e) {
  const s = [], { bounds: i, step: a, min: o, max: r, precision: l, count: c, maxTicks: h, maxDigits: u, includeBounds: f } = t, d = a || 1, p = h - 1, { min: g, max: m } = e, _ = !mt(o), y = !mt(r), b = !mt(c), v = (m - g) / (u + 1);
  let w = Iu((m - g) / p / d) * d, S, x, k, P;
  if (w < 1e-14 && !_ && !y)
    return [
      {
        value: g
      },
      {
        value: m
      }
    ];
  P = Math.ceil(m / w) - Math.floor(g / w), P > p && (w = Iu(P * w / p / d) * d), mt(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), i === "ticks" ? (x = Math.floor(g / w) * w, k = Math.ceil(m / w) * w) : (x = g, k = m), _ && y && a && v_((r - o) / a, w / 1e3) ? (P = Math.round(Math.min((r - o) / w, h)), w = (r - o) / P, x = o, k = r) : b ? (x = _ ? o : x, k = y ? r : k, P = c - 1, w = (k - x) / P) : (P = (k - x) / w, Yi(P, Math.round(P), w / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const F = Math.max(Nu(w), Nu(x));
  S = Math.pow(10, mt(l) ? F : l), x = Math.round(x * S) / S, k = Math.round(k * S) / S;
  let E = 0;
  for (_ && (f && x !== o ? (s.push({
    value: o
  }), x < o && E++, Yi(Math.round((x + E * w) * S) / S, o, Hf(o, v, t)) && E++) : x < o && E++); E < P; ++E) {
    const C = Math.round((x + E * w) * S) / S;
    if (y && C > r)
      break;
    s.push({
      value: C
    });
  }
  return y && f && k !== r ? s.length && Yi(s[s.length - 1].value, r, Hf(r, v, t)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || k === r) && s.push({
    value: k
  }), s;
}
function Hf(t, e, { horizontal: s, minRotation: n }) {
  const i = ze(n), a = (s ? Math.sin(i) : Math.cos(i)) || 1e-3, o = 0.75 * e * ("" + t).length;
  return Math.min(e / a, o);
}
class rr extends In {
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
      const l = ns(i), c = ns(a);
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
    }, a = this._range || this, o = Tw(i, a);
    return e.bounds === "ticks" && Eg(o, this, "value"), e.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
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
    return La(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class nc extends rr {
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!0);
    this.min = $t(e) ? e : 0, this.max = $t(s) ? s : 1, this.handleTickRangeOptions();
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
Q(nc, "id", "linear"), Q(nc, "defaults", {
  ticks: {
    callback: Dr.formatters.numeric
  }
});
const ba = (t) => Math.floor(Ws(t)), ln = (t, e) => Math.pow(10, ba(t) + e);
function zf(t) {
  return t / Math.pow(10, ba(t)) === 1;
}
function Gf(t, e, s) {
  const n = Math.pow(10, s), i = Math.floor(t / n);
  return Math.ceil(e / n) - i;
}
function Dw(t, e) {
  const s = e - t;
  let n = ba(s);
  for (; Gf(t, e, n) > 10; )
    n++;
  for (; Gf(t, e, n) < 10; )
    n--;
  return Math.min(n, ba(t));
}
function Rw(t, { min: e, max: s }) {
  e = Le(t.min, e);
  const n = [], i = ba(e);
  let a = Dw(e, s), o = a < 0 ? Math.pow(10, Math.abs(a)) : 1;
  const r = Math.pow(10, a), l = i > a ? Math.pow(10, i) : 0, c = Math.round((e - l) * o) / o, h = Math.floor((e - l) / r / 10) * r * 10;
  let u = Math.floor((c - h) / Math.pow(10, a)), f = Le(t.min, Math.round((l + h + u * Math.pow(10, a)) * o) / o);
  for (; f < s; )
    n.push({
      value: f,
      major: zf(f),
      significand: u
    }), u >= 10 ? u = u < 15 ? 15 : 20 : u++, u >= 20 && (a++, u = 2, o = a >= 0 ? 1 : o), f = Math.round((l + h + u * Math.pow(10, a)) * o) / o;
  const d = Le(t.max, f);
  return n.push({
    value: d,
    major: zf(d),
    significand: u
  }), n;
}
class ic extends In {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, s) {
    const n = rr.prototype.parse.apply(this, [
      e,
      s
    ]);
    if (n === 0) {
      this._zero = !0;
      return;
    }
    return $t(n) && n > 0 ? n : null;
  }
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!0);
    this.min = $t(e) ? Math.max(0, e) : null, this.max = $t(s) ? Math.max(0, s) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !$t(this._userMin) && (this.min = e === ln(this.min, 0) ? ln(this.min, -1) : ln(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: s } = this.getUserBounds();
    let n = this.min, i = this.max;
    const a = (r) => n = e ? n : r, o = (r) => i = s ? i : r;
    n === i && (n <= 0 ? (a(1), o(10)) : (a(ln(n, -1)), o(ln(i, 1)))), n <= 0 && a(ln(i, -1)), i <= 0 && o(ln(n, 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const e = this.options, s = {
      min: this._userMin,
      max: this._userMax
    }, n = Rw(s, this);
    return e.bounds === "ticks" && Eg(n, this, "value"), e.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : La(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = Ws(e), this._valueRange = Ws(this.max) - Ws(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (Ws(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const s = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + s * this._valueRange);
  }
}
Q(ic, "id", "logarithmic"), Q(ic, "defaults", {
  ticks: {
    callback: Dr.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function ac(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const s = me(e.backdropPadding);
    return ut(e.font && e.font.size, It.font.size) + s.height;
  }
  return 0;
}
function Lw(t, e, s) {
  return s = Ft(s) ? s : [
    s
  ], {
    w: B_(t, e.string, s),
    h: s.length * e.lineHeight
  };
}
function Uf(t, e, s, n, i) {
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
function Ow(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, s = Object.assign({}, e), n = [], i = [], a = t._pointLabels.length, o = t.options.pointLabels, r = o.centerPointLabels ? vt / a : 0;
  for (let l = 0; l < a; l++) {
    const c = o.setContext(t.getPointLabelContext(l));
    i[l] = c.padding;
    const h = t.getPointPosition(l, t.drawingArea + i[l], r), u = Zt(c.font), f = Lw(t.ctx, u, t._pointLabels[l]);
    n[l] = f;
    const d = fe(t.getIndexAngle(l) + r), p = Math.round(sh(d)), g = Uf(p, h.x, f.w, 0, 180), m = Uf(p, h.y, f.h, 90, 270);
    Fw(s, e, d, g, m);
  }
  t.setCenterPoint(e.l - s.l, s.r - e.r, e.t - s.t, s.b - e.b), t._pointLabelItems = Nw(t, n, i);
}
function Fw(t, e, s, n, i) {
  const a = Math.abs(Math.sin(s)), o = Math.abs(Math.cos(s));
  let r = 0, l = 0;
  n.start < e.l ? (r = (e.l - n.start) / a, t.l = Math.min(t.l, e.l - r)) : n.end > e.r && (r = (n.end - e.r) / a, t.r = Math.max(t.r, e.r + r)), i.start < e.t ? (l = (e.t - i.start) / o, t.t = Math.min(t.t, e.t - l)) : i.end > e.b && (l = (i.end - e.b) / o, t.b = Math.max(t.b, e.b + l));
}
function Ew(t, e, s) {
  const n = t.drawingArea, { extra: i, additionalAngle: a, padding: o, size: r } = s, l = t.getPointPosition(e, n + i + o, a), c = Math.round(sh(fe(l.angle + Ut))), h = jw(l.y, r.h, c), u = Bw(c), f = $w(l.x, r.w, u);
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
function Iw(t, e) {
  if (!e)
    return !0;
  const { left: s, top: n, right: i, bottom: a } = t;
  return !(xs({
    x: s,
    y: n
  }, e) || xs({
    x: s,
    y: a
  }, e) || xs({
    x: i,
    y: n
  }, e) || xs({
    x: i,
    y: a
  }, e));
}
function Nw(t, e, s) {
  const n = [], i = t._pointLabels.length, a = t.options, { centerPointLabels: o, display: r } = a.pointLabels, l = {
    extra: ac(a) / 2,
    additionalAngle: o ? vt / i : 0
  };
  let c;
  for (let h = 0; h < i; h++) {
    l.padding = s[h], l.size = e[h];
    const u = Ew(t, h, l);
    n.push(u), r === "auto" && (u.visible = Iw(u, c), u.visible && (c = u));
  }
  return n;
}
function Bw(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function $w(t, e, s) {
  return s === "right" ? t -= e : s === "center" && (t -= e / 2), t;
}
function jw(t, e, s) {
  return s === 90 || s === 270 ? t -= e / 2 : (s > 270 || s < 90) && (t -= e), t;
}
function Ww(t, e, s) {
  const { left: n, top: i, right: a, bottom: o } = s, { backdropColor: r } = e;
  if (!mt(r)) {
    const l = Sn(e.borderRadius), c = me(e.backdropPadding);
    t.fillStyle = r;
    const h = n - c.left, u = i - c.top, f = a - n + c.width, d = o - i + c.height;
    Object.values(l).some((p) => p !== 0) ? (t.beginPath(), ma(t, {
      x: h,
      y: u,
      w: f,
      h: d,
      radius: l
    }), t.fill()) : t.fillRect(h, u, f, d);
  }
}
function Vw(t, e) {
  const { ctx: s, options: { pointLabels: n } } = t;
  for (let i = e - 1; i >= 0; i--) {
    const a = t._pointLabelItems[i];
    if (!a.visible)
      continue;
    const o = n.setContext(t.getPointLabelContext(i));
    Ww(s, o, a);
    const r = Zt(o.font), { x: l, y: c, textAlign: h } = a;
    Rn(s, t._pointLabels[i], l, c + r.lineHeight / 2, r, {
      color: o.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Mm(t, e, s, n) {
  const { ctx: i } = t;
  if (s)
    i.arc(t.xCenter, t.yCenter, e, 0, Ot);
  else {
    let a = t.getPointPosition(0, e);
    i.moveTo(a.x, a.y);
    for (let o = 1; o < n; o++)
      a = t.getPointPosition(o, e), i.lineTo(a.x, a.y);
  }
}
function Hw(t, e, s, n, i) {
  const a = t.ctx, o = e.circular, { color: r, lineWidth: l } = e;
  !o && !n || !r || !l || s < 0 || (a.save(), a.strokeStyle = r, a.lineWidth = l, a.setLineDash(i.dash || []), a.lineDashOffset = i.dashOffset, a.beginPath(), Mm(t, s, o, n), a.closePath(), a.stroke(), a.restore());
}
function zw(t, e, s) {
  return Qs(t, {
    label: s,
    index: e,
    type: "pointLabel"
  });
}
class Bi extends rr {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = me(ac(this.options) / 2), s = this.width = this.maxWidth - e.width, n = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + s / 2 + e.left), this.yCenter = Math.floor(this.top + n / 2 + e.top), this.drawingArea = Math.floor(Math.min(s, n) / 2);
  }
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!1);
    this.min = $t(e) && !isNaN(e) ? e : 0, this.max = $t(s) && !isNaN(s) ? s : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / ac(this.options));
  }
  generateTickLabels(e) {
    rr.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((s, n) => {
      const i = Rt(this.options.pointLabels.callback, [
        s,
        n
      ], this);
      return i || i === 0 ? i : "";
    }).filter((s, n) => this.chart.getDataVisibility(n));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? Ow(this) : this.setCenterPoint(0, 0, 0, 0);
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
      return zw(this.getContext(), e, n);
    }
  }
  getPointPosition(e, s, n = 0) {
    const i = this.getIndexAngle(e) - Ut + n;
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
      n.save(), n.beginPath(), Mm(this, this.getDistanceFromCenterForValue(this._endValue), s, this._pointLabels.length), n.closePath(), n.fillStyle = e, n.fill(), n.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, s = this.options, { angleLines: n, grid: i, border: a } = s, o = this._pointLabels.length;
    let r, l, c;
    if (s.pointLabels.display && Vw(this, o), i.display && this.ticks.forEach((h, u) => {
      if (u !== 0 || u === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const f = this.getContext(u), d = i.setContext(f), p = a.setContext(f);
        Hw(this, d, l, o, p);
      }
    }), n.display) {
      for (e.save(), r = o - 1; r >= 0; r--) {
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
      Rn(e, r.label, 0, -a, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
}
Q(Bi, "id", "radialLinear"), Q(Bi, "defaults", {
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
    callback: Dr.formatters.numeric
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
}), Q(Bi, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), Q(Bi, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const Ir = {
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
}, Ae = /* @__PURE__ */ Object.keys(Ir);
function qf(t, e) {
  return t - e;
}
function Kf(t, e) {
  if (mt(e))
    return null;
  const s = t._adapter, { parser: n, round: i, isoWeekday: a } = t._parseOpts;
  let o = e;
  return typeof n == "function" && (o = n(o)), $t(o) || (o = typeof n == "string" ? s.parse(o, n) : s.parse(o)), o === null ? null : (i && (o = i === "week" && (fi(a) || a === !0) ? s.startOf(o, "isoWeek", a) : s.startOf(o, i)), +o);
}
function Yf(t, e, s, n) {
  const i = Ae.length;
  for (let a = Ae.indexOf(t); a < i - 1; ++a) {
    const o = Ir[Ae[a]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - e) / (r * o.size)) <= n)
      return Ae[a];
  }
  return Ae[i - 1];
}
function Gw(t, e, s, n, i) {
  for (let a = Ae.length - 1; a >= Ae.indexOf(s); a--) {
    const o = Ae[a];
    if (Ir[o].common && t._adapter.diff(i, n, o) >= e - 1)
      return o;
  }
  return Ae[s ? Ae.indexOf(s) : 0];
}
function Uw(t) {
  for (let e = Ae.indexOf(t) + 1, s = Ae.length; e < s; ++e)
    if (Ir[Ae[e]].common)
      return Ae[e];
}
function Jf(t, e, s) {
  if (!s)
    t[e] = !0;
  else if (s.length) {
    const { lo: n, hi: i } = nh(s, e), a = s[n] >= e ? s[n] : s[i];
    t[a] = !0;
  }
}
function qw(t, e, s, n) {
  const i = t._adapter, a = +i.startOf(e[0].value, n), o = e[e.length - 1].value;
  let r, l;
  for (r = a; r <= o; r = +i.add(r, 1, n))
    l = s[r], l >= 0 && (e[l].major = !0);
  return e;
}
function Xf(t, e, s) {
  const n = [], i = {}, a = e.length;
  let o, r;
  for (o = 0; o < a; ++o)
    r = e[o], i[r] = o, n.push({
      value: r,
      major: !1
    });
  return a === 0 || !s ? n : qw(t, n, i, s);
}
class _a extends In {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, s = {}) {
    const n = e.time || (e.time = {}), i = this._adapter = new ev._date(e.adapters.date);
    i.init(s), Ki(n.displayFormats, i.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(e), this._normalized = s.normalized;
  }
  parse(e, s) {
    return e === void 0 ? null : Kf(this, e);
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
    (!o || !r) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), i = $t(i) && !isNaN(i) ? i : +s.startOf(Date.now(), n), a = $t(a) && !isNaN(a) ? a : +s.endOf(Date.now(), n) + 1, this.min = Math.min(i, a - 1), this.max = Math.max(i + 1, a);
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
    const a = this.min, o = this.max, r = k_(i, a, o);
    return this._unit = s.unit || (n.autoSkip ? Yf(s.minUnit, this.min, this.max, this._getLabelCapacity(a)) : Gw(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Uw(this._unit), this.initOffsets(i), e.reverse && r.reverse(), Xf(this, r, this._majorUnit);
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
    const e = this._adapter, s = this.min, n = this.max, i = this.options, a = i.time, o = a.unit || Yf(a.minUnit, s, n, this._getLabelCapacity(s)), r = ut(i.ticks.stepSize, 1), l = o === "week" ? a.isoWeekday : !1, c = fi(l) || l === !0, h = {};
    let u = s, f, d;
    if (c && (u = +e.startOf(u, "isoWeek", l)), u = +e.startOf(u, c ? "day" : o), e.diff(n, s, o) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + o);
    const p = i.ticks.source === "data" && this.getDataTimestamps();
    for (f = u, d = 0; f < n; f = +e.add(f, r, o), d++)
      Jf(h, f, p);
    return (f === n || i.bounds === "ticks" || d === 1) && Jf(h, f, p), Object.keys(h).sort(qf).map((g) => +g);
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
    const r = a.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && r[l], u = c && r[c], f = n[s], d = c && u && f && f.major;
    return this._adapter.format(e, i || (d ? u : h));
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
    const s = this.options.time, n = s.displayFormats, i = n[s.unit] || n.millisecond, a = this._tickFormatFunction(e, 0, Xf(this, [
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
      e.push(Kf(this, i[s]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return Bg(e.sort(qf));
  }
}
Q(_a, "id", "time"), Q(_a, "defaults", {
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
function ro(t, e, s) {
  let n = 0, i = t.length - 1, a, o, r, l;
  s ? (e >= t[n].pos && e <= t[i].pos && ({ lo: n, hi: i } = _s(t, "pos", e)), { pos: a, time: r } = t[n], { pos: o, time: l } = t[i]) : (e >= t[n].time && e <= t[i].time && ({ lo: n, hi: i } = _s(t, "time", e)), { time: a, pos: r } = t[n], { time: o, pos: l } = t[i]);
  const c = o - a;
  return c ? r + (l - r) * (e - a) / c : r;
}
class oc extends _a {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(e);
    this._minPos = ro(s, this.min), this._tableRange = ro(s, this.max) - this._minPos, super.initOffsets(e);
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
    return (ro(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const s = this._offsets, n = this.getDecimalForPixel(e) / s.factor - s.end;
    return ro(this._table, n * this._tableRange + this._minPos, !0);
  }
}
Q(oc, "id", "timeseries"), Q(oc, "defaults", _a.defaults);
var Kw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: sc,
  LinearScale: nc,
  LogarithmicScale: ic,
  RadialLinearScale: Bi,
  TimeScale: _a,
  TimeSeriesScale: oc
});
const Yw = [
  tv,
  DS,
  kw,
  Kw
];
ar.register(...Yw);
const it = "https://slowfootball.club/api", Jt = "Leverkusen", Jw = "https://sf-game-proxy.ofersi15.workers.dev/token", Qi = ["north", "south", "europa", "world", "conference", "hipster"], dl = /* @__PURE__ */ new Set(["Barcelona", "Bayern Munich", "Juventus", "Damac", "Saudi All-Stars", "Inter Miami"]), lo = ["GK", "FB", "CB", "DM", "CM", "AM", "WF", "CF"], Xw = ["FB", "CB", "DM", "CM", "AM", "WF", "CF"], pl = 100, Hn = "sf_tactics_v4", Zw = 7 * 24 * 60 * 60 * 1e3, zn = "sf_players_v6", co = "sf_stats_v1", Qw = 6 * 60 * 60 * 1e3, tC = 7 * 24 * 60 * 60 * 1e3, eC = 6 * 60 * 60 * 1e3, Zf = "sf_submissions_all_v1", ho = "sf_subs_ls", lr = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  DM: ["Tackling", "Passing", "Vision", "Marking"],
  CM: ["Vision", "Passing", "Dribbling", "Shooting"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, Qf = {
  GK: "Han, Ref, Spd, Pas",
  FB: "Pas, Tck, Sta, Mk",
  CB: "Mk, Hdg, Tck, Spd",
  DM: "Tck, Pas, Vis, Mk",
  CM: "Vis, Pas, Drb, Sh",
  AM: "Pas, Drb, Sh, Vis",
  WF: "Drb, Pas, Spd, Sh",
  CF: "Spd, Drb, Hdg, Sh"
}, sC = {
  GK: ["GK"],
  CB: ["CB", "FB", "DM"],
  FB: ["FB", "CB", "DM"],
  DM: ["DM", "FB", "CB", "AM"],
  CM: ["CM", "DM", "AM"],
  AM: ["AM", "WF", "CF", "DM"],
  WM: ["FB", "DM", "AM", "WF"],
  WF: ["WF", "AM", "CF"],
  CF: ["CF", "WF", "AM"]
}, nC = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  DM: ["Tackling", "Marking", "Passing", "Vision"],
  CM: ["Passing", "Vision", "Tackling", "Dribbling"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WM: ["Stamina", "Passing", "Speed", "Dribbling"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, td = ["Mentality", "Experience", "Work rate"], mn = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision"], rc = [...mn, "Mentality", "Experience", "Leadership", "Work rate"], ed = [...rc, "Adaptability", "Form", "Confidence"], ph = {
  442: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "CF", "CF"],
  4411: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "AM", "CF"],
  4231: ["GK", "FB", "CB", "CB", "FB", "DM", "DM", "WF", "AM", "WF", "CF"],
  433: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "WF", "WF", "CF"],
  4321: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "AM", "AM", "CF"],
  3421: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "AM", "AM", "CF"],
  352: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "CM", "WM", "CF", "CF"],
  343: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "WF", "CF", "WF"]
}, iC = {
  442: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 55 }, { x: 44, y: 55 }, { x: 24, y: 55 }, { x: 9, y: 55 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  4411: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 57 }, { x: 44, y: 57 }, { x: 24, y: 57 }, { x: 9, y: 57 }, { x: 34, y: 35 }, { x: 34, y: 13 }],
  4231: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 45, y: 63 }, { x: 23, y: 63 }, { x: 58, y: 40 }, { x: 34, y: 40 }, { x: 10, y: 40 }, { x: 34, y: 13 }],
  433: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 48, y: 56 }, { x: 34, y: 56 }, { x: 20, y: 56 }, { x: 58, y: 28 }, { x: 10, y: 28 }, { x: 34, y: 13 }],
  3421: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 44, y: 35 }, { x: 24, y: 35 }, { x: 34, y: 13 }],
  352: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 61, y: 58 }, { x: 46, y: 58 }, { x: 34, y: 58 }, { x: 22, y: 58 }, { x: 7, y: 58 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  343: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 58, y: 20 }, { x: 34, y: 13 }, { x: 10, y: 20 }],
  4321: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 50, y: 60 }, { x: 34, y: 60 }, { x: 18, y: 60 }, { x: 44, y: 37 }, { x: 24, y: 37 }, { x: 34, y: 13 }]
}, sd = { GK: 0, CB: 1, FB: 2, DM: 3, CM: 4, WM: 5, AM: 6, WF: 7, CF: 8 }, nd = {
  GK: { fill: "#2d4a1a", stroke: "#7ee787", text: "#7ee787" },
  FB: { fill: "#1a3a5e", stroke: "#79c0ff", text: "#79c0ff" },
  CB: { fill: "#1a3060", stroke: "#79c0ff", text: "#79c0ff" },
  DM: { fill: "#3a2a6b", stroke: "#d2a8ff", text: "#d2a8ff" },
  CM: { fill: "#3a2a1a", stroke: "#ffa657", text: "#ffa657" },
  WM: { fill: "#3a1a3a", stroke: "#d2a8ff", text: "#d2a8ff" },
  AM: { fill: "#4a3a10", stroke: "#ffa657", text: "#ffa657" },
  WF: { fill: "#3a1a1a", stroke: "#ff7b72", text: "#ff7b72" },
  CF: { fill: "#5a1010", stroke: "#ff7b72", text: "#ff7b72" }
}, lc = (/* @__PURE__ */ new Date("2025-08-23T00:00:00Z")).getTime(), Am = 7 * 24 * 60 * 60 * 1e3;
function Ln(t, e) {
  const s = lr[e];
  if (!s) return null;
  const n = s.map((i) => t[i]).filter((i) => i != null && i > 0);
  return n.length ? Math.round(n.reduce((i, a) => i + a, 0) / n.length * 10) / 10 : null;
}
function xa(t, e, s, n) {
  const i = Ln(t, e);
  if (i === null) return null;
  if (!n || !s.length) return i;
  const a = s.map((l) => t[l]).filter((l) => l != null && l > 0);
  if (!a.length) return i;
  const o = a.reduce((l, c) => l + c, 0) / a.length, r = n / 100;
  return Math.round((i * (1 - r) + o * r) * 10) / 10;
}
function aC(t) {
  if (!t.Value || !t.Rating) return null;
  const e = t.Rating, s = t.Age || 26, n = e >= 87 ? 4 : e >= 84 ? 3 : e >= 81 ? 2.2 : e >= 78 ? 1.7 : e >= 75 ? 1.3 : 1, i = s <= 22 ? 1.5 : s <= 25 ? 1.3 : s <= 28 ? 1 : s <= 31 ? 0.75 : 0.5, a = t.Value * n * i;
  return Math.round(a / 5e5) * 5e5 || Math.round(a / 1e5) * 1e5;
}
function Pm(t) {
  return t >= 1e6 ? `£${(t / 1e6).toFixed(1)}m` : t >= 1e3 ? `£${(t / 1e3).toFixed(0)}k` : t ? `£${t}` : "—";
}
function oC(t) {
  return t ? `£${(t / 1e3).toFixed(0)}k/w` : "—";
}
function rC(t) {
  return t ? String(t).split("").join("-") : null;
}
function Ti(t) {
  return t ? String(t).replace(/-/g, "") : null;
}
function lC(t) {
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
function cC(t) {
  if (!t) return "—";
  const e = new Date(t);
  if (isNaN(e.getTime())) return "—";
  const s = Date.now() - e.getTime();
  return s < 6e4 ? "just now" : s < 36e5 ? Math.floor(s / 6e4) + "m ago" : s < 864e5 ? Math.floor(s / 36e5) + "h ago" : s < 7 * 864e5 ? Math.floor(s / 864e5) + "d ago" : e.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
function gh() {
  return Math.max(0, Math.round((Date.now() - lc) / Am));
}
function cc(t, e, s) {
  const n = (r) => String(r || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(), i = n(t), a = n(e), o = (s || []).filter((r) => n(r.playerName || r.player || r.name || "") === i && n(r.toClub || r.buyer || r.buyerClub || r.to || "") === a).map((r) => {
    const l = r.ts || r.updatedAt || r.createdAt || r.date;
    if (!l) return null;
    const c = new Date(l).getTime();
    return !c || c < lc ? 0 : Math.round((c - lc) / Am);
  }).filter((r) => r !== null).sort((r, l) => r - l);
  return o.length ? Math.max(0, gh() - o[0]) : null;
}
function hc(t) {
  const e = t.Position || "", s = (a) => Number(t[a] || 0), n = [];
  (e === "CF" || e === "WF") && (s("Shooting") >= 80 && n.push({ n: "Clinical Finisher", d: "Consistently puts away their chances." }), s("Speed") >= 82 && n.push({ n: "Pace Merchant", d: "Explosive behind defensive lines." }), s("Heading") >= 80 && e === "CF" && n.push({ n: "Aerial Threat", d: "Dominant in the air from crosses and corners." }), s("Dribbling") >= 80 && n.push({ n: "Close Control", d: "Exceptional in tight areas, difficult to dispossess." })), (e === "CM" || e === "AM" || e === "DM") && (s("Vision") >= 82 && n.push({ n: "Visionary", d: "Sees passes others miss. Finds runners in behind." }), s("Passing") >= 82 && n.push({ n: "Metronome", d: "High pass completion with the range to switch play." }), e === "DM" && s("Tackling") >= 80 && n.push({ n: "Ball Winner", d: "Reads attacks early to break up play." }), s("Dribbling") >= 80 && n.push({ n: "Carrier", d: "Drives through midfield under pressure." })), (e === "CB" || e === "FB") && (s("Tackling") >= 82 && n.push({ n: "Tackle Machine", d: "Ferocious in the challenge." }), s("Heading") >= 82 && n.push({ n: "Aerial Dominator", d: "Set piece threat at both ends of the pitch." }), s("Passing") >= 78 && n.push({ n: "Distribution", d: "Comfortable on the ball, plays out from the back." }), e === "FB" && s("Speed") >= 80 && n.push({ n: "Overlap Merchant", d: "Creates width and overloads in wide areas." })), e === "GK" && (s("Reflexes") >= 82 && n.push({ n: "Reaction Royalty", d: "Makes saves that look impossible." }), s("Handling") >= 80 && n.push({ n: "Safe Hands", d: "Commanding under crosses." }), s("Speed") >= 72 && n.push({ n: "Sweeper Keeper", d: "Comfortable with the ball at their feet." }));
  const i = lr[e] || [];
  if (i.length && i.reduce((o, r) => o + s(r), 0) / i.length >= 83) {
    const o = t.Archetype || t.archetype || e;
    n.push({ n: `Complete ${o}`, d: "Exceptionally well-rounded — no significant weaknesses." });
  }
  return n.slice(0, 4);
}
function hC(t, e, s) {
  if (!t || !t.Player || !t.Club) return [];
  const n = gh(), i = cc(t.Player, t.Club, s) ?? n, a = t.Nationality || "";
  return (e || []).filter((o) => o.Player !== t.Player && o.Position).slice(0, 12).map((o) => {
    const r = cc(o.Player, t.Club, s) ?? n, l = Math.min(i, r);
    if (l < 13) return null;
    const c = !!(a && a === (o.Nationality || "")), h = l >= 30 || c && l >= 25 ? "great" : "good", u = l >= 60 ? "Long-term" : l >= 30 ? "Established" : "Building";
    return { name: o.Player, pos: o.Position, weeks: l, category: h, label: u, sameNat: c };
  }).filter(Boolean).sort((o, r) => r.weeks - o.weeks);
}
function Tm(t, e) {
  if (!t || t.length < 2) return null;
  const s = t[0].Club;
  if (!s) return null;
  const n = gh(), i = t.map((r) => cc(r.Player, s, e) ?? n);
  let a = 0, o = 0;
  for (let r = 0; r < i.length; r++)
    for (let l = r + 1; l < i.length; l++)
      a += Math.min(i[r], i[l]) / 60, o++;
  return o ? Math.min(100, Math.round(a / o * 100)) : null;
}
function Cn(t) {
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
function uc(t) {
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
let uo = null;
async function gl() {
  return uo || (uo = (await fetch(Jw).then((e) => e.json())).token || null, uo);
}
const ps = location.hostname === "sf.ofersi15.workers.dev" ? "https://sf-cache.ofersi15.workers.dev/sf-cache" : "/sf-cache", ml = "https://sf-cache.ofersi15.workers.dev";
async function Pt(t, e = !1) {
  if (location.protocol === "file:") return null;
  try {
    const s = { signal: AbortSignal.timeout(3e3) };
    e && (s.cache = "no-store");
    const n = await fetch(`${ps}/${t}`, s);
    return n.ok ? await n.text() : null;
  } catch {
    return null;
  }
}
async function qs(t, e) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${ps}/${t}?permanent=1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: e,
        signal: AbortSignal.timeout(5e3)
      });
    } catch {
    }
}
async function id(t) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${ps}/${t}`, { method: "DELETE", signal: AbortSignal.timeout(3e3) });
    } catch {
    }
}
const uC = {
  async loadYouth(t = !1) {
    var r, l, c, h, u, f, d;
    const e = "sf_youth_idx_v2";
    if (this.youthLoading) return;
    this.youthLoading = !0, this.youthLoaded = !1;
    const a = (p, g) => {
      this.youthCap = p.cap || {}, this.youthScouts = (p.scouts || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthAcademy = p.academy || [], this.youthFacilities = p.facilities || {}, this.youthStaff = p.staff || {}, this.youthRejected = (g || p.rejected || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthLoaded = !0, this.youthMsg = "", this.youthScouts.length ? this.youthSubTab = "scouts" : this.youthAcademy.length ? this.youthSubTab = "academy" : this.youthSubTab = "history";
    }, o = (p) => (p || []).map((g) => {
      const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"].filter((_) => this.getYouthAttr(g, _) > 0).length;
      return { ...g, _partial: m < 5 };
    });
    if (!t)
      try {
        const p = JSON.parse(localStorage.getItem(e) || "null");
        if (p) {
          const g = Date.now(), m = g - (p.savedAt || 0), _ = g - (p.histSavedAt || 0), y = g - (p.staticSavedAt || 0), b = encodeURIComponent(Jt);
          if (a(p), this.youthLoading = !1, !(m >= 6e5 || _ >= 36e5 || y >= 36e5)) return;
          if (_ < 36e5) {
            setTimeout(async () => {
              try {
                const w = m >= 6e5, S = y >= 36e5, [x, k, P, F] = await Promise.all([
                  w ? fetch(`${it}/scouting/jobs?club=${b}`).then((C) => C.json()) : Promise.resolve(null),
                  w ? fetch(`${it}/academy?club=${b}`).then((C) => C.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/facilities?club=${b}`).then((C) => C.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/staff/effects?club=${b}`).then((C) => C.json()) : Promise.resolve(null)
                ]), E = {
                  ...p,
                  savedAt: w ? g : p.savedAt,
                  staticSavedAt: S ? g : p.staticSavedAt,
                  ...w ? { cap: x.cap || {}, scouts: x.items || [], academy: o(k.items) } : {},
                  ...S ? { facilities: P || {}, staff: (F && F.ok ? F.effects : {}) || {} } : {}
                };
                try {
                  localStorage.setItem(e, JSON.stringify(E));
                } catch {
                }
                a(E);
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
      const p = encodeURIComponent(Jt), [g, m, _, y] = await Promise.all([
        fetch(`${it}/scouting/jobs?club=${p}`).then((L) => L.json()),
        fetch(`${it}/academy?club=${p}`).then((L) => L.json()),
        fetch(`${it}/facilities?club=${p}`).then((L) => L.json()),
        fetch(`${it}/staff/effects?club=${p}`).then((L) => L.json())
      ]);
      this.youthMsg = "Fetching scout history…";
      const [b, v] = await Promise.all([
        fetch(`${it}/scouting/jobs?club=${p}&status=rejected`).then((L) => L.json()),
        fetch(`${it}/scouting/jobs?club=${p}&status=accepted`).then((L) => L.json()).catch(() => ({}))
      ]), w = m.items || [], S = {};
      for (const L of v.items || []) {
        const D = (((r = L.player) == null ? void 0 : r.name) || ((l = L.player) == null ? void 0 : l.Player) || "").toLowerCase();
        D && (S[D] = L.player);
      }
      for (const L of w) {
        const D = (L.name || L.Player || "").toLowerCase(), M = S[D];
        M && (rc.forEach((T) => {
          M[T] != null && L[T] == null && (L[T] = M[T]);
        }), M.stats && rc.forEach((T) => {
          M.stats[T] != null && L[T] == null && (L[T] = M.stats[T]);
        }));
      }
      const x = o(w), k = (y.ok ? y.effects : {}) || {}, P = Date.now(), F = {
        savedAt: P,
        histSavedAt: P,
        staticSavedAt: P,
        cap: g.cap || {},
        scouts: g.items || [],
        academy: x,
        facilities: _ || {},
        staff: k,
        rejected: b.items || []
      };
      try {
        localStorage.setItem(e, JSON.stringify(F));
      } catch {
      }
      a(F, b.items);
      for (const L of [...g.items || [], ...b.items || []]) {
        const D = (c = L.player) == null ? void 0 : c.stats;
        if (!D || !Object.keys(D).length) continue;
        const M = (L.player.name || L.player.Player || "").toLowerCase();
        if (!M) continue;
        const T = this.players.find((O) => (O.Name || O.name || "").toLowerCase() === M);
        T && T._incompleteStats && (Object.assign(T, D), T._incompleteStats = mn.filter((O) => T[O] != null && T[O] > 0).length < 5);
      }
      const E = mn, C = (L) => L && (E.filter((D) => L[D] != null && L[D] > 0).length >= 5 || L.stats && E.filter((D) => L.stats[D] != null && L.stats[D] > 0).length >= 5), N = (g.items || []).filter((L) => L.player && !C(L.player));
      if (N.length) {
        const L = [...new Set(N.map((T) => {
          var O, V;
          return ((O = T.player) == null ? void 0 : O.club) || ((V = T.player) == null ? void 0 : V.Club);
        }).filter(Boolean))], D = {};
        await Promise.all(L.map(async (T) => {
          try {
            const O = await fetch(`${it}/squads?club=${encodeURIComponent(T)}`).then((V) => V.json());
            D[T.toLowerCase()] = O.players || [];
          } catch {
          }
        }));
        const M = ed;
        for (const T of N) {
          const O = (((h = T.player) == null ? void 0 : h.club) || ((u = T.player) == null ? void 0 : u.Club) || "").toLowerCase(), V = D[O] || [], K = (((f = T.player) == null ? void 0 : f.name) || ((d = T.player) == null ? void 0 : d.Player) || "").toLowerCase(), Z = V.find((et) => (et.Player || "").toLowerCase() === K);
          Z && (M.forEach((et) => {
            Z[et] != null && (T.player[et] = Z[et]);
          }), Z.Rating && (T.player.rating = Z.Rating), Z.Value && (T.player.value = Z.Value), Z.Age && (T.player.age = Z.Age));
        }
        F.scouts = g.items || [];
        try {
          localStorage.setItem(e, JSON.stringify(F));
        } catch {
        }
        a(F, b.items);
      }
    } catch (p) {
      this.youthMsg = "Load failed: " + (p.message || String(p));
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
        const l = localStorage.getItem(e);
        if (l) {
          const { data: c, ts: h } = JSON.parse(l);
          if (Date.now() - h < 18e5) {
            this.youthAllHistoryJobs = (c.jobs || []).map((u) => ({ ...u, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthClubInfoMap = c.clubInfo || {}, this.youthHistLoaded = !0, this.youthHistCacheDate = new Date(h).toLocaleString();
            return;
          }
        }
      } catch {
      }
    this.youthHistLoading = !0, this.youthHistLoaded = !1, this.youthHistMsg = "Fetching club list…", this.youthHistProgress = 0;
    try {
      const [l, c] = await Promise.all([
        fetch(`${it}/managers`).then((b) => b.json()),
        fetch(`${it}/admin/squads/public/clubs`).then((b) => b.json())
      ]), h = new Set(
        (l.managers || []).filter((b) => {
          var v;
          return b.club && !((v = b.username) != null && v.includes("~deleted~"));
        }).map((b) => b.club)
      ), u = (c.clubs || []).filter((b) => h.has(b)), f = [], d = {}, p = 5;
      for (let b = 0; b < u.length; b += p) {
        const v = u.slice(b, b + p);
        this.youthHistMsg = `Scanning clubs ${Math.min(b + p, u.length)}/${u.length}…`, this.youthHistProgress = Math.round(Math.min(b + p, u.length) / u.length * 100), await Promise.all(v.map(async (w) => {
          const S = encodeURIComponent(w);
          try {
            const [x, k, P] = await Promise.all([
              fetch(`${it}/scouting/jobs?club=${S}&status=rejected`).then((L) => L.json()),
              fetch(`${it}/scouting/jobs?club=${S}`).then((L) => L.json()),
              fetch(`${it}/scouting/jobs?club=${S}&status=accepted`).then((L) => L.json())
            ]), F = (x.items || []).map((L) => ({ ...L, _jobStatus: L.status || "rejected" })), E = (k.items || []).map((L) => ({ ...L, _jobStatus: L.status || "active" })), C = (P.items || []).map((L) => ({ ...L, _jobStatus: "accepted" })), N = [...E, ...F, ...C];
            if (N.length > 0) {
              const [L, D] = await Promise.all([
                fetch(`${it}/facilities?club=${S}`).then((M) => M.json()).catch(() => ({})),
                fetch(`${it}/staff/effects?club=${S}`).then((M) => M.json()).catch(() => ({}))
              ]);
              N.forEach((M) => f.push({ ...M, _club: w })), d[w] = {
                facilities: L || {},
                staff: (D.ok ? D.effects : {}) || {}
              };
            }
          } catch {
          }
        })), await new Promise((w) => setTimeout(w, 80));
      }
      const g = mn, m = (b) => b && (g.filter((v) => b[v] != null && b[v] > 0).length >= 5 || b.stats && g.filter((v) => b.stats[v] != null && b.stats[v] > 0).length >= 5), _ = f.filter((b) => b.player && !m(b.player));
      if (_.length) {
        this.youthHistMsg = `Enriching attributes for ${_.length} players…`;
        const b = [...new Set(_.map((x) => {
          var k, P;
          return ((k = x.player) == null ? void 0 : k.club) || ((P = x.player) == null ? void 0 : P.Club);
        }).filter(Boolean))], v = {}, w = 4;
        for (let x = 0; x < b.length; x += w)
          await Promise.all(b.slice(x, x + w).map(async (k) => {
            try {
              const P = await fetch(`${it}/squads?club=${encodeURIComponent(k)}`).then((F) => F.json());
              v[k.toLowerCase()] = P.players || [];
            } catch {
            }
          }));
        const S = ed;
        for (const x of _) {
          const k = (((n = x.player) == null ? void 0 : n.club) || ((i = x.player) == null ? void 0 : i.Club) || "").toLowerCase(), P = v[k] || [], F = (((a = x.player) == null ? void 0 : a.name) || ((o = x.player) == null ? void 0 : o.Player) || "").toLowerCase(), E = P.find((C) => (C.Player || "").toLowerCase() === F);
          E && (S.forEach((C) => {
            E[C] != null && (x.player[C] = E[C]);
          }), E.Rating && (x.player.rating = E.Rating), E.Value && (x.player.value = E.Value), E.Age && (x.player.age = E.Age));
        }
      }
      try {
        localStorage.setItem(e, JSON.stringify({
          data: { jobs: f, clubInfo: d },
          ts: Date.now()
        }));
      } catch {
      }
      const y = f.filter((b) => {
        var v;
        return b._jobStatus === "accepted" && ((v = b.player) == null ? void 0 : v.stats) && Object.keys(b.player.stats).length >= 11;
      });
      if (y.length && ((r = this.allPlayers) != null && r.length)) {
        const b = { n: 0 };
        this.allPlayers = this.allPlayers.map((v) => {
          if (!v._incompleteStats) return v;
          const w = (v.Player || "").toLowerCase(), S = y.find((k) => (k.player.name || "").toLowerCase() === w);
          if (!S) return v;
          b.n++;
          const x = { ...v, ...S.player.stats };
          return x._incompleteStats = mn.filter((k) => x[k] != null && x[k] > 0).length < 5, x;
        }), b.n && console.log(`[SF] enriched ${b.n} incomplete players from accepted scouting jobs`);
      }
      this.youthAllHistoryJobs = f.map((b) => ({ ...b, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthClubInfoMap = d, this.youthHistLoaded = !0, this.youthHistCacheDate = (/* @__PURE__ */ new Date()).toLocaleString(), this.youthHistMsg = "";
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
      const e = encodeURIComponent(Jt), s = "sf_club_v1", n = 30 * 60 * 1e3;
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
        const a = encodeURIComponent(Jt), o = Date.now();
        let r = null;
        try {
          r = JSON.parse(localStorage.getItem(s) || "null");
        } catch {
        }
        const l = o - ((r == null ? void 0 : r.savedAt) || 0), c = o - ((r == null ? void 0 : r.staticSavedAt) || 0), h = l >= n, u = c >= i;
        if (!h && !u) return;
        const [f, d, p, g] = await Promise.all([
          h ? fetch(`${it}/scouting/jobs?club=${a}`).then((m) => m.json()) : Promise.resolve(null),
          h ? fetch(`${it}/academy?club=${a}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/facilities?club=${a}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/staff/effects?club=${a}`).then((m) => m.json()) : Promise.resolve(null)
        ]);
        if (h && f && (this.youthCap = f.cap || this.youthCap, this.youthScouts = (f.items || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 }))), h && d) {
          const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"];
          this.youthAcademy = (d.items || []).map((_) => {
            const y = m.filter((b) => this.getYouthAttr(_, b) > 0).length;
            return { ..._, _partial: y < 5 };
          });
        }
        u && p && (this.youthFacilities = p || {}), u && g && (this.youthStaff = (g.ok ? g.effects : {}) || {}), this.youthBgLastRefresh = (/* @__PURE__ */ new Date()).toLocaleTimeString();
        try {
          const m = {
            ...r || {},
            ...h ? { savedAt: o, cap: (f == null ? void 0 : f.cap) || {}, scouts: (f == null ? void 0 : f.items) || [], academy: this.youthAcademy } : {},
            ...u ? { staticSavedAt: o, facilities: p || {}, staff: this.youthStaff } : {}
          };
          localStorage.setItem(s, JSON.stringify(m));
        } catch {
        }
      } catch {
      }
    })();
  }
}, fC = {
  async buildMatchArchive() {
    var a, o, r, l, c;
    if (this.matchArchiveBuilding) return;
    this.matchArchiveBuilding = !0, this.matchArchiveProgress = 0, this.matchArchiveMsg = "Starting…", this.matchBuildLog = [];
    const t = (h) => {
      this.matchBuildLog.push(`${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB")} ${h}`);
    }, e = (h) => new Promise((u) => setTimeout(u, h));
    t(`Host: ${location.hostname} | Cache: ${ps}`);
    const s = `${ps}/__write_test__`, n = await fetch(s, { method: "POST", body: "1", signal: AbortSignal.timeout(8e3) }).then((h) => `HTTP ${h.status}`).catch((h) => `FAIL: ${h.name}: ${h.message}`);
    if (t(`Cache write test: ${n}`), fetch(s, { method: "DELETE" }).catch(() => {
    }), !n.startsWith("HTTP 2"))
      throw new Error(`Cache write failed before fetch: ${n}`);
    const i = async (h, u) => {
      let f;
      for (let d = 0; d < 3; d++) {
        d > 0 && await e(1e3 * d);
        try {
          const p = await fetch(h, { method: "POST", body: u, signal: AbortSignal.timeout(15e3) });
          if (p.ok) return !0;
          f = `HTTP ${p.status}: ${await p.text().catch(() => "")}`;
        } catch (p) {
          f = `${p.name}: ${p.message}`;
        }
      }
      return f;
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
        this.matchArchiveProgress = Math.round(M / u.length * 20), this.matchArchiveMsg = `Pass 1: ${Math.min(M + 10, u.length)}/${u.length} clubs · ${h.size} fixtures`, await Promise.all(T.map(async (O) => {
          try {
            const V = await fetch(`${it}/matches?club=${encodeURIComponent(O)}&limit=200`).then((Z) => Z.json());
            let K = 0;
            for (const Z of (V == null ? void 0 : V.matches) || [])
              Z.fixtureId && !h.has(Z.fixtureId) && (h.set(Z.fixtureId, Z), K++);
            K && t(`${O}: +${K} (${h.size} total)`);
          } catch (V) {
            t(`ERROR ${O}: ${V.message}`);
          }
        })), await e(50);
      }
      t(`Pass 1 done: ${h.size} unique fixtures`);
      const f = Array.from(h.keys()), d = /* @__PURE__ */ new Map();
      for (const M of Object.keys(this.matchChunks))
        for (const T of this.matchChunks[M] || []) d.set(T.fixtureId, T);
      const p = f.filter((M) => !d.has(M)), g = f.filter((M) => d.has(M)).map((M) => d.get(M));
      t(`Pass 2: ${p.length} new fixtures to fetch, ${g.length} reused from cache`);
      let m = 0;
      for (let M = 0; M < p.length; M += 25) {
        const T = p.slice(M, M + 25);
        this.matchArchiveProgress = 20 + Math.round(M / Math.max(p.length, 1) * 40), this.matchArchiveMsg = `Pass 2: ${Math.min(M + 25, p.length)}/${p.length} new fixtures · ${m} errors`, await Promise.all(T.map(async (O) => {
          var V, K;
          try {
            const Z = await fetch(`${it}/matches/${O}`).then((et) => et.json());
            if (Z != null && Z.match) {
              const et = Z.match;
              et._homeManager = this.extractManager(et.reportNarrative, ((V = et.home) == null ? void 0 : V.club) || ""), et._awayManager = this.extractManager(et.reportNarrative, ((K = et.away) == null ? void 0 : K.club) || ""), g.push(et);
            } else
              m++, t(`No data for ${O}: ${JSON.stringify(Z).slice(0, 60)}`);
          } catch (Z) {
            m++, t(`ERROR fixture ${O}: ${Z.message}`);
          }
        })), await e(30);
      }
      g.sort((M, T) => (T.kickoff || "").localeCompare(M.kickoff || "")), t(`Pass 2 done: ${g.length} matches, ${m} errors`);
      const _ = {};
      let y = 0;
      t(`Pass 3: fetching submissions for ${u.length} clubs`);
      for (let M = 0; M < u.length; M += 10) {
        const T = u.slice(M, M + 10);
        this.matchArchiveProgress = 60 + Math.round(M / u.length * 24), this.matchArchiveMsg = `Pass 3: ${Math.min(M + 10, u.length)}/${u.length} clubs · submissions`, await Promise.all(T.map(async (O) => {
          try {
            const V = await fetch(`${it}/submissions?club=${encodeURIComponent(O)}&limit=200`).then((Z) => Z.json()), K = {};
            for (const Z of (V == null ? void 0 : V.items) || []) {
              const et = Z.gameweek ?? "upcoming";
              (!K[et] || Z.createdAt > K[et].createdAt) && (K[et] = Z);
            }
            _[O] = K;
          } catch (V) {
            y++, t(`SUB ERROR ${O}: ${V.message}`);
          }
        })), await e(50);
      }
      t(`Pass 3 done: ${Object.keys(_).length} clubs, ${y} errors`);
      for (const M of g) {
        const T = M.gameweek, O = T != null ? (r = _[(o = M.home) == null ? void 0 : o.club]) == null ? void 0 : r[T] : null, V = T != null ? (c = _[(l = M.away) == null ? void 0 : l.club]) == null ? void 0 : c[T] : null;
        O && (M.home.sub = { formation: O.formation, instructions: O.instructions, roles: O.roles, xi: O.xi, runs: O.runs }), V && (M.away.sub = { formation: V.formation, instructions: V.instructions, roles: V.roles, xi: V.xi, runs: V.runs });
      }
      const b = /* @__PURE__ */ new Map();
      for (const M of g) {
        const T = M.gameweek ?? 0;
        b.has(T) || b.set(T, []), b.get(T).push(M);
      }
      const v = [...b.keys()].sort((M, T) => M - T);
      t(`Gameweeks: ${v.length} (GW${v[0]}–GW${v[v.length - 1]})`);
      const w = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, S = new Map(this.allPlayers.map((M) => [(M.Player || "").toLowerCase().trim(), M])), x = (M) => M.length ? Math.round(M.reduce((T, O) => T + O, 0) / M.length * 10) / 10 : null, k = (M) => {
        var V;
        if (!((V = M == null ? void 0 : M.xi) != null && V.length)) return null;
        const T = { def: [], mid: [], att: [] }, O = [];
        for (const K of M.xi) {
          const Z = (K.name || K.player || "").toLowerCase().trim(), et = S.get(Z);
          if (!et) continue;
          const ft = (K.slot || "").replace(/\d+$/, "") || et.Position || "CM", lt = et.Position || ft, pt = Ln(et, lt);
          pt && (O.push(pt), w[ft] && T[w[ft]].push(pt));
        }
        return { overall: x(O), def: x(T.def), mid: x(T.mid), att: x(T.att) };
      }, P = { sub: 0, narr: 0, derived: 0, none: 0 }, F = (M, T, O, V) => {
        if (M != null && M.formation)
          return P.sub++, M.formation;
        const K = Ti(this.extractFormation(T, O));
        if (K)
          return P.narr++, K;
        const Z = Ti(this.deriveFormation(V));
        return Z ? (P.derived++, Z) : (P.none++, null);
      }, E = g.map((M) => {
        var V, K, Z, et, ft, lt, pt, _t, Y, q, U, at, A, R, I, z, $, B, G, j, H, W, J, X, st, tt;
        const T = this.extractTactics(M.reportNarrative, (V = M.home) == null ? void 0 : V.club), O = this.extractTactics(M.reportNarrative, (K = M.away) == null ? void 0 : K.club);
        return {
          fixtureId: M.fixtureId,
          kickoff: M.kickoff,
          gameweek: M.gameweek,
          competition: M.competition,
          home: {
            club: (Z = M.home) == null ? void 0 : Z.club,
            formation: F((et = M.home) == null ? void 0 : et.sub, M.reportNarrative, (ft = M.home) == null ? void 0 : ft.club, (lt = M.ratings) == null ? void 0 : lt.home),
            mentality: ((Y = (_t = (pt = M.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : Y.mentality) || (T == null ? void 0 : T.mentality) || null,
            style: ((at = (U = (q = M.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.style) || (T == null ? void 0 : T.style) || null,
            sqRtg: k((A = M.home) == null ? void 0 : A.sub)
          },
          away: {
            club: (R = M.away) == null ? void 0 : R.club,
            formation: F((I = M.away) == null ? void 0 : I.sub, M.reportNarrative, (z = M.away) == null ? void 0 : z.club, ($ = M.ratings) == null ? void 0 : $.away),
            mentality: ((j = (G = (B = M.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.mentality) || (O == null ? void 0 : O.mentality) || null,
            style: ((J = (W = (H = M.away) == null ? void 0 : H.sub) == null ? void 0 : W.instructions) == null ? void 0 : J.style) || (O == null ? void 0 : O.style) || null,
            sqRtg: k((X = M.away) == null ? void 0 : X.sub)
          },
          score: M.score,
          headline: M.headline,
          // Key match stats for formation/style analysis (inline to avoid loading every chunk)
          stats: M.stats ? {
            xg: M.stats.xg,
            shots: M.stats.shots ? { home: ((st = M.stats.shots.home) == null ? void 0 : st.total) ?? null, away: ((tt = M.stats.shots.away) == null ? void 0 : tt.total) ?? null } : null,
            possession: M.stats.possession
          } : null,
          _homeManager: M._homeManager,
          _awayManager: M._awayManager,
          _gw: M.gameweek ?? 0
        };
      });
      t(`Formation sources: sub=${P.sub} narr=${P.narr} derived=${P.derived} none=${P.none} (of ${g.length * 2} sides)`);
      const C = { builtAt: Date.now(), matchCount: g.length, gwCount: v.length, gameweeks: v, fmSrc: P, matches: E }, N = JSON.stringify(C);
      this.matchArchiveProgress = 84, this.matchArchiveMsg = `Saving index (${(N.length / 1024).toFixed(0)}KB)…`, t(`Saving index: ${(N.length / 1024).toFixed(0)}KB`);
      const L = await i(`${ps}/sf_match_archive_v3?permanent=1`, N);
      if (L !== !0) throw new Error(`Index save failed: ${L}`);
      t("Index saved OK");
      let D = 0;
      for (let M = 0; M < v.length; M++) {
        const T = v[M], O = b.get(T), V = JSON.stringify({ gw: T, matches: O });
        this.matchArchiveProgress = 84 + Math.round((M + 1) / v.length * 16), this.matchArchiveMsg = `Saving GW${T} (${O.length} matches, ${(V.length / 1024).toFixed(0)}KB)…`;
        const K = await i(`${ps}/sf_match_archive_v3_gw_${T}?permanent=1`, V);
        K === !0 ? t(`GW${T}: ${O.length} matches saved OK (${(V.length / 1024).toFixed(0)}KB)`) : (D++, t(`ERROR GW${T}: ${K}`)), await e(30);
      }
      this.matchArchive = E, this.matchArchiveChunkCount = v.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.matchArchiveFmSrc = P, this.matchArchiveProgress = 100, D > 0 ? (this.matchArchiveMsg = `Done (${D} GW save errors) — ${g.length} matches`, t(`Build complete: ${g.length} matches, ${D} GW(s) failed`)) : (this.matchArchiveMsg = `Done — ${g.length} matches across ${v.length} gameweeks`, t(`Build complete: ${g.length} matches, ${v.length} GW chunks`));
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
      const l = new Set(this.matchArchive.map((C) => C.fixtureId)), c = Math.max(...this.matchArchive.map((C) => C._gw || 0).filter((C) => C > 0));
      t(`Archive has ${l.size} fixtures up to GW${c}`), this.appendGwMsg = "Scanning clubs for new fixtures…";
      const h = [...new Set(this.allPlayers.map((C) => C.Club).filter(Boolean))].sort(), u = /* @__PURE__ */ new Map();
      for (let C = 0; C < h.length; C += 10) {
        const N = h.slice(C, C + 10);
        this.appendGwProgress = Math.round(C / h.length * 30), this.appendGwMsg = `Scanning ${Math.min(C + 10, h.length)}/${h.length} clubs… ${u.size} new`, await Promise.all(N.map(async (L) => {
          try {
            const D = await fetch(`${it}/matches?club=${encodeURIComponent(L)}&limit=50`).then((M) => M.json());
            for (const M of (D == null ? void 0 : D.matches) || [])
              M.fixtureId && !l.has(M.fixtureId) && !u.has(M.fixtureId) && u.set(M.fixtureId, M);
          } catch (D) {
            t(`ERROR ${L}: ${D.message}`);
          }
        })), await e(50);
      }
      if (t(`Found ${u.size} new fixtures`), u.size === 0) {
        this.appendGwMsg = "No new fixtures found.", this.appendGwBuilding = !1;
        return;
      }
      const f = Array.from(u.keys()), d = [];
      let p = 0;
      for (let C = 0; C < f.length; C += 25) {
        const N = f.slice(C, C + 25);
        this.appendGwProgress = 30 + Math.round(C / f.length * 30), this.appendGwMsg = `Fetching ${Math.min(C + 25, f.length)}/${f.length} match details…`, await Promise.all(N.map(async (L) => {
          var D, M;
          try {
            const T = await fetch(`${it}/matches/${L}`).then((O) => O.json());
            if (T != null && T.match) {
              const O = T.match;
              O._homeManager = this.extractManager(O.reportNarrative, ((D = O.home) == null ? void 0 : D.club) || ""), O._awayManager = this.extractManager(O.reportNarrative, ((M = O.away) == null ? void 0 : M.club) || ""), d.push(O);
            } else
              p++;
          } catch (T) {
            p++, t(`ERROR fixture ${L}: ${T.message}`);
          }
        })), await e(30);
      }
      t(`Fetched ${d.length} full matches, ${p} errors`);
      const g = [...new Set(d.map((C) => C.gameweek).filter((C) => C != null))];
      t(`New GWs: ${g.join(", ")}`), this.appendGwMsg = "Fetching submissions for new GWs…";
      const m = [...new Set(d.flatMap((C) => {
        var N, L;
        return [(N = C.home) == null ? void 0 : N.club, (L = C.away) == null ? void 0 : L.club];
      }).filter(Boolean))], _ = {};
      for (let C = 0; C < m.length; C += 10) {
        const N = m.slice(C, C + 10);
        this.appendGwProgress = 60 + Math.round(C / m.length * 20), this.appendGwMsg = `Submissions: ${Math.min(C + 10, m.length)}/${m.length} clubs…`, await Promise.all(N.map(async (L) => {
          try {
            const D = await fetch(`${it}/submissions?club=${encodeURIComponent(L)}&limit=50`).then((T) => T.json()), M = {};
            for (const T of (D == null ? void 0 : D.items) || []) {
              const O = T.gameweek ?? "upcoming";
              (!M[O] || T.createdAt > M[O].createdAt) && (M[O] = T);
            }
            _[L] = M;
          } catch (D) {
            t(`SUB ERROR ${L}: ${D.message}`);
          }
        })), await e(50);
      }
      for (const C of d) {
        const N = C.gameweek, L = N != null ? (a = _[(i = C.home) == null ? void 0 : i.club]) == null ? void 0 : a[N] : null, D = N != null ? (r = _[(o = C.away) == null ? void 0 : o.club]) == null ? void 0 : r[N] : null;
        L && (C.home.sub = { formation: L.formation, instructions: L.instructions, roles: L.roles, xi: L.xi, runs: L.runs }), D && (C.away.sub = { formation: D.formation, instructions: D.instructions, roles: D.roles, xi: D.xi, runs: D.runs });
      }
      const y = new Map(this.allPlayers.map((C) => [(C.Player || "").toLowerCase().trim(), C])), b = (C) => C.length ? Math.round(C.reduce((N, L) => N + L, 0) / C.length * 10) / 10 : null, v = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, w = (C) => {
        var D;
        if (!((D = C == null ? void 0 : C.xi) != null && D.length)) return null;
        const N = { def: [], mid: [], att: [] }, L = [];
        for (const M of C.xi) {
          const T = (M.name || M.player || "").toLowerCase().trim(), O = y.get(T);
          if (!O) continue;
          const V = (M.slot || "").replace(/\d+$/, "") || O.Position || "CM", K = Ln(O, O.Position || V);
          K && (L.push(K), v[V] && N[v[V]].push(K));
        }
        return { overall: b(L), def: b(N.def), mid: b(N.mid), att: b(N.att) };
      }, S = d.map((C) => {
        var M, T, O, V, K, Z, et, ft, lt, pt, _t, Y, q, U, at, A, R, I, z, $, B, G, j, H, W, J;
        const N = this.extractTactics(C.reportNarrative, (M = C.home) == null ? void 0 : M.club), L = this.extractTactics(C.reportNarrative, (T = C.away) == null ? void 0 : T.club), D = (X, st, tt) => {
          if (X != null && X.formation) return Ti(X.formation);
          const ht = Ti(this.extractFormation(C.reportNarrative, st));
          return ht || Ti(this.deriveFormation(tt)) || null;
        };
        return {
          fixtureId: C.fixtureId,
          kickoff: C.kickoff,
          gameweek: C.gameweek,
          competition: C.competition,
          home: { club: (O = C.home) == null ? void 0 : O.club, formation: D((V = C.home) == null ? void 0 : V.sub, (K = C.home) == null ? void 0 : K.club, (Z = C.ratings) == null ? void 0 : Z.home), mentality: ((lt = (ft = (et = C.home) == null ? void 0 : et.sub) == null ? void 0 : ft.instructions) == null ? void 0 : lt.mentality) || (N == null ? void 0 : N.mentality) || null, style: ((Y = (_t = (pt = C.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : Y.style) || (N == null ? void 0 : N.style) || null, sqRtg: w((q = C.home) == null ? void 0 : q.sub) },
          away: { club: (U = C.away) == null ? void 0 : U.club, formation: D((at = C.away) == null ? void 0 : at.sub, (A = C.away) == null ? void 0 : A.club, (R = C.ratings) == null ? void 0 : R.away), mentality: (($ = (z = (I = C.away) == null ? void 0 : I.sub) == null ? void 0 : z.instructions) == null ? void 0 : $.mentality) || (L == null ? void 0 : L.mentality) || null, style: ((j = (G = (B = C.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.style) || (L == null ? void 0 : L.style) || null, sqRtg: w((H = C.away) == null ? void 0 : H.sub) },
          score: C.score,
          headline: C.headline,
          stats: C.stats ? { xg: C.stats.xg, shots: C.stats.shots ? { home: ((W = C.stats.shots.home) == null ? void 0 : W.total) ?? null, away: ((J = C.stats.shots.away) == null ? void 0 : J.total) ?? null } : null, possession: C.stats.possession } : null,
          _homeManager: C._homeManager,
          _awayManager: C._awayManager,
          _gw: C.gameweek ?? 0
        };
      });
      this.appendGwProgress = 80;
      const x = /* @__PURE__ */ new Map();
      for (const C of d) {
        const N = C.gameweek ?? 0;
        x.has(N) || x.set(N, []), x.get(N).push(C);
      }
      for (const [C, N] of x) {
        let L = [];
        if (this.matchChunks[C]) L = this.matchChunks[C];
        else
          try {
            const O = await Pt(`sf_match_archive_v3_gw_${C}`);
            O && (L = JSON.parse(O).matches || []);
          } catch {
          }
        const D = new Set(L.map((O) => O.fixtureId)), M = [...L, ...N.filter((O) => !D.has(O.fixtureId))];
        this.matchChunks[C] = M;
        const T = JSON.stringify({ gw: C, matches: M });
        this.appendGwMsg = `Saving GW${C} chunk (${M.length} matches)…`, await s(`${ps}/sf_match_archive_v3_gw_${C}?permanent=1`, T), t(`GW${C} chunk saved: ${M.length} matches`);
      }
      this.appendGwProgress = 92, this.appendGwMsg = "Updating archive index…";
      const k = [...this.matchArchive, ...S], P = [...new Set(k.map((C) => C._gw).filter((C) => C > 0))].sort((C, N) => C - N), F = {
        builtAt: Date.now(),
        matchCount: k.length,
        gwCount: P.length,
        gameweeks: P,
        fmSrc: this.matchArchiveFmSrc || {},
        matches: k
      };
      if (await s(`${ps}/sf_match_archive_v3?permanent=1`, JSON.stringify(F)) !== !0) throw new Error("Index save failed");
      this.matchArchive = k, this.matchArchiveChunkCount = P.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.analysisLoaded = !1, this.appendGwProgress = 100, this.appendGwMsg = `Done — added ${S.length} matches (GW${g.join(", GW")})`, t(`Append complete: +${S.length} matches across GW${g.join(", GW")}`);
    } catch (l) {
      this.appendGwMsg = "Error: " + (l.message || l), t(`FATAL: ${l.message || l}`);
    }
    this.appendGwBuilding = !1;
  },
  async loadMatchArchive() {
    var t;
    try {
      const e = await Pt("sf_match_archive_v3", !0);
      if (!e) return;
      const s = await Cn(e);
      (t = s == null ? void 0 : s.matches) != null && t.length && (this.matchArchive = s.matches, this.matchArchiveChunkCount = s.gwCount || 0, this.matchArchiveCacheDate = new Date(s.builtAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), s.fmSrc && (this.matchArchiveFmSrc = s.fmSrc));
    } catch {
    }
  },
  async loadMatchChunk(t) {
    var e, s;
    if (!this.matchChunks[t])
      try {
        const n = await Pt(`sf_match_archive_v3_gw_${t}`);
        if (n) {
          const i = (await Cn(n)).matches || [];
          for (const a of i)
            a._homeManager = this.extractManager(a.reportNarrative, ((e = a.home) == null ? void 0 : e.club) || ""), a._awayManager = this.extractManager(a.reportNarrative, ((s = a.away) == null ? void 0 : s.club) || "");
          if (this.matchChunks[t] = i, this.matchArchive) {
            const a = new Map(i.map((o) => [o.fixtureId, o]));
            for (const o of this.matchArchive) {
              const r = a.get(o.fixtureId);
              r && (o._homeManager = r._homeManager, o._awayManager = r._awayManager);
            }
          }
        }
      } catch {
      }
  },
  async loadAnalysisChunks() {
    var a, o, r, l, c, h, u, f, d, p, g;
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
              b || (b = s(this.extractFormation(_.reportNarrative, (u = _[y]) == null ? void 0 : u.club))), b || (b = s(this.deriveFormation((f = _.ratings) == null ? void 0 : f[y]))), b && (m[y].formation = b, i++);
            }
            !m[y].mentality && ((g = (p = (d = _[y]) == null ? void 0 : d.sub) == null ? void 0 : p.instructions) != null && g.mentality) && (m[y].mentality = _[y].sub.instructions.mentality);
          }
      }
    }
    this.analysisLoaded = !0, this.analysisLoading = !1, this.analysisMsg = `${e.length} matches with full tactical data · ${i} formations backfilled`;
  },
  async loadSubsDb() {
    if (this.subsDbLoading) return;
    this.subsDbLoading = !0, this.subsDbMsg = "Checking cache…";
    const t = await Pt("sf_submissions_db_v1");
    if (t) {
      this.subsDb = await Cn(t), this.subsDbLoaded = !0, this.subsDbLoading = !1;
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
    await qs("sf_submissions_db_v1", JSON.stringify(s)), this.subsDb = s, this.subsDbLoaded = !0, this.subsDbLoading = !1, this.subsDbMsg = `Built · ${t.length} clubs`;
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
    var l, c, h, u, f, d, p, g, m, _, y;
    this.matchView = t, this.matchDetailLoading = !0;
    const e = t._gw ?? t.gameweek ?? 0;
    this.matchChunks[e] || await this.loadMatchChunk(e);
    const s = (l = this.matchChunks[e]) == null ? void 0 : l.find((b) => b.fixtureId === t.fixtureId);
    s && (this.matchView = s);
    const n = this.matchView;
    n._homeManager = this.extractManager(n.reportNarrative, ((c = n.home) == null ? void 0 : c.club) || ""), n._awayManager = this.extractManager(n.reportNarrative, ((h = n.away) == null ? void 0 : h.club) || "");
    const i = (f = (u = n.home) == null ? void 0 : u.sub) != null && f.formation ? this.fmtFormation(n.home.sub.formation) : null, a = (p = (d = n.away) == null ? void 0 : d.sub) != null && p.formation ? this.fmtFormation(n.away.sub.formation) : null, [o, r] = await Promise.all([
      i ? Promise.resolve(i) : this.getClubFormation((g = n.home) == null ? void 0 : g.club, e),
      a ? Promise.resolve(a) : this.getClubFormation((m = n.away) == null ? void 0 : m.club, e)
    ]);
    n._homeFormation = o || this.extractFormation(n.reportNarrative, (_ = n.home) == null ? void 0 : _.club) || n.ratings && this.deriveFormation(n.ratings.home), n._awayFormation = r || this.extractFormation(n.reportNarrative, (y = n.away) == null ? void 0 : y.club) || n.ratings && this.deriveFormation(n.ratings.away), this.matchDetailLoading = !1;
  }
}, dC = {
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
  fmtSubStatus: lC,
  fmtNegoDate: cC,
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
      let f = c * u, d = "formula";
      const p = (g, m) => {
        g > f && (f = g, d = m);
      };
      if ((a = o._transferHistory) != null && a.length) {
        const g = o._transferHistory.filter((m) => m.isReal).sort((m, _) => new Date(_.date) - new Date(m.date));
        if (g[0]) {
          const m = t - new Date(g[0].date).getTime();
          p(g[0].amount * (m < e ? 1 : m < s ? 0.9 : 0.8), "transfer");
        }
      }
      o._listingAsk && p(o._listingAsk, "listing");
      for (const g of l) {
        if (!g.amount || g.amount < 5e4) continue;
        const m = t - new Date(g.updatedAt || 0).getTime(), _ = m < e ? 1 : m < s ? 0.85 : 0.7;
        if (g.status === "accepted" ? p(g.amount * _, "deal") : g.status === "rejected" && p(g.amount * 1.15 * _, "rejected+15%"), g.history)
          for (const y of g.history)
            y.amount >= 5e4 && p(y.amount * 0.9 * _, "bid round");
      }
      if (f > 0) {
        const g = Math.round(f / 5e5) * 5e5 || Math.round(f / 1e5) * 1e5 || Math.round(f);
        i[r] = { v: g, src: d };
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
      const t = await Pt("sf_negos_last_pull");
      if (!t) return;
      const e = parseInt(t, 10);
      if (!this.negosLastPull || e > this.negosLastPull) {
        const s = await Pt("sf_negos_history_v1");
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
          Pt("sf_leverkusen_fin_v1", !0),
          Pt("sf_auctions_v1", !0)
        ]);
        if (s) {
          const a = JSON.parse(s);
          a.budget && (this.clubBudget = a.budget);
        }
        n && this._applyAuctionData(JSON.parse(n));
        const i = await Pt("sf_all_budgets_v1", !0);
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
      qs("sf_leverkusen_fin_v1", JSON.stringify({ budget: t, ts: Date.now() }));
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
        Pt("sf_auctions_v1"),
        Pt("sf_all_budgets_v1")
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
      const t = await Pt("sf_worker_log");
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
    const e = "sf_espionage_v3", s = eC;
    if (!t)
      try {
        let n = await Pt(e);
        n || (n = localStorage.getItem(e));
        const i = n ? await Cn(n) : null;
        if (i) {
          this.espionageClubs = i.clubs || [];
          let a = i.negos || [];
          try {
            const o = await Pt("sf_negos_history_v1");
            if (o) {
              const r = JSON.parse(o), l = new Map(a.map((c) => [c.id, c]));
              r.forEach((c) => l.set(c.id, c)), a = [...l.values()].sort((c, h) => new Date(h.updatedAt || 0) - new Date(c.updatedAt || 0));
            }
          } catch {
          }
          this.espionageNegos = a, this.espionageCacheDate = new Date(i.savedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), Pt("sf_negos_last_pull").then((o) => {
            o && (this.negosLastPull = parseInt(o, 10));
          }).catch(() => {
          }), Pt("sf_leverkusen_fin_v1").then((o) => {
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
        const h = await Pt("sf_negos_history_v1");
        if (h)
          o = JSON.parse(h);
        else {
          const u = await fetch(`${it}/negotiations`).then((d) => d.json());
          o = (Array.isArray(u) ? u : u.negotiations || u.items || []).map((d) => ({
            id: d.id,
            playerName: d.playerName,
            buyer: d.buyer || d.toClub,
            seller: d.seller || d.fromClub,
            amount: d.amount,
            status: d.status,
            subStatus: d.subStatus,
            via: d.via,
            lastActionBy: d.lastActionBy,
            history: d.history || [],
            createdAt: d.createdAt,
            updatedAt: d.updatedAt || d.ts
          })).sort((d, p) => new Date(p.updatedAt || 0) - new Date(d.updatedAt || 0)), qs("sf_negos_history_v1", JSON.stringify(o));
        }
      } catch {
      }
      const r = [], l = 8;
      for (let h = 0; h < i.length; h += l) {
        const u = i.slice(h, h + l), f = await Promise.all(u.map(async (d) => {
          const p = encodeURIComponent(d);
          try {
            const [g, m] = await Promise.all([
              fetch(`${it}/staff?club=${p}`).then((_) => _.json()).catch(() => ({})),
              fetch(`${it}/facilities?club=${p}`).then((_) => _.json()).catch(() => ({}))
            ]);
            return {
              club: d,
              current: g.current || {},
              ads: g.openAds || [],
              levels: m.levels || {},
              project: m.project || null
            };
          } catch {
            return { club: d, current: {}, ads: [], levels: {}, project: null };
          }
        }));
        r.push(...f), this.espionageProgress = Math.min(99, Math.round((h + l) / a * 100)), await new Promise((d) => setTimeout(d, 0));
      }
      this.espionageClubs = r, this.espionageNegos = o, this.espionageCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), Pt("sf_negos_last_pull").then((h) => {
        h && (this.negosLastPull = parseInt(h, 10));
      }).catch(() => {
      }), Pt("sf_leverkusen_fin_v1").then((h) => {
        if (h) {
          const u = JSON.parse(h);
          this.clubBudget = u.budget, this.clubWageBudget = u.wage;
        }
      }).catch(() => {
      }), this.loadAuctionData();
      const c = JSON.stringify({ savedAt: Date.now(), clubs: r, negos: o });
      qs(e, c);
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
}, pC = {
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
    const e = String(t.formation || "").replace(/-/g, ""), s = iC[e];
    if (!s) return [];
    const n = t.xi.map((r, l) => {
      const c = s[l] || { x: 50, y: 50 }, h = r.slot || (ph[e] || [])[l] || "CM", u = this.basePos(r.position || h), f = nd[u] || nd.CM;
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
    }), i = {}, a = n.map((r) => {
      const l = r.slotType;
      return i[l] = (i[l] || 0) + 1, `${l}${i[l]}`;
    });
    return n.map((r, l) => {
      var p;
      const c = a[l], u = (((p = t.runs) == null ? void 0 : p[c]) || [])[0] || null, d = (parseInt(c.replace(/\D/g, "")) || 1) % 2 === 0;
      return {
        ...r,
        slotKey: c,
        runX: u !== null ? u.x / 90 * 68 : null,
        runY: u !== null ? d ? 105 - u.y / 100 * 105 : (u.y - 27.5) / 95 * 105 : null
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
                manager: i === "home" ? n._homeManager : n._awayManager,
                formation: this.extractFormation(n.reportNarrative, a) || this.deriveFormation(n.ratings[i]),
                starters: o
              };
            }
          }
    this.clubLineups = t, this.clubLineupsLoaded = !0;
  },
  // Format a formation code like "4231" → "4-2-3-1"
  fmtFormation: rC,
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
      const t = localStorage.getItem(ho);
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
      const t = await Pt(Zf);
      if (!t) return;
      const e = await Cn(t);
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
      localStorage.setItem(ho, JSON.stringify(s));
    } catch {
    }
    uc(s).then((n) => qs(Zf, n)).catch(() => {
    });
  },
  async openClubDetail(t) {
    this.activeTab = "clubs", this.selectedClubName = t, this.selectedClubSubTab = "xi", this.showRawSub = !1;
    try {
      localStorage.setItem("sf_last_club", t);
    } catch {
    }
    delete this.submissionsCache[t], await this._fetchClubSubmissions(t);
    try {
      const e = localStorage.getItem(ho), s = e ? JSON.parse(e) : { clubs: {} };
      s.clubs[t] = this.submissionsCache[t] || {}, localStorage.setItem(ho, JSON.stringify(s));
    } catch {
    }
    this._fetchClubInfo(t);
  },
  async _fetchClubInfo(t) {
    var e, s, n;
    if (!((e = this.clubInfoCache[t]) != null && e.loaded)) {
      this.clubInfoCache = { ...this.clubInfoCache, [t]: { loading: !0 } };
      try {
        const i = encodeURIComponent(t), [a, o, r, l, c] = await Promise.all([
          fetch(`${it}/facilities?club=${i}`).then((d) => d.json()).catch(() => ({})),
          fetch(`${it}/staff/effects?club=${i}`).then((d) => d.json()).catch(() => ({})),
          fetch(`${it}/academy?club=${i}`).then((d) => d.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}`).then((d) => d.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}&status=accepted`).then((d) => d.json()).catch(() => ({}))
        ]), h = r.items || [], u = {};
        for (const d of c.items || []) {
          const p = (((s = d.player) == null ? void 0 : s.name) || ((n = d.player) == null ? void 0 : n.Player) || "").toLowerCase();
          p && (u[p] = d.player);
        }
        const f = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision", "Mentality", "Experience"];
        for (const d of h) {
          const p = u[(d.name || d.Player || "").toLowerCase()];
          p && f.forEach((g) => {
            var m;
            p[g] != null && d[g] == null && (d[g] = p[g]), ((m = p.stats) == null ? void 0 : m[g]) != null && d[g] == null && (d[g] = p.stats[g]);
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
    this.mySubmissionLoading = !0, await this._fetchClubSubmissions(Jt);
    const t = this.submissionsCache[Jt] || {}, e = Object.keys(t).map(Number).sort((s, n) => n - s).slice(0, 3);
    this.mySubmissions = e.map((s) => t[s]), this.mySubmissionLoading = !1;
  },
  extractManager(t, e) {
    const n = (Array.isArray(t) ? t : [t || ""]).filter((c) => typeof c == "string" && c.startsWith("Pre-match")).join(" ");
    if (!n) return null;
    const i = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), a = "[A-ZÀ-ÖØ-Ý][\\wÀ-ÿ]*", o = `(${a}(?:[ -]${a})*)`;
    let r = n.match(new RegExp(`${o}[’']s ${i}\\b`));
    if (r) return r[1];
    const l = /^(?:Pre|Half|Full|The|An?|From|In|At|By|It|As|But|And|Or)\b/;
    return r = n.match(new RegExp(`${o}[^.]{2,40}?\\b${i}\\b`)), r && !l.test(r[1]) ? r[1] : null;
  },
  matchResultFor(t, e) {
    var r, l, c;
    const s = ((r = t.home) == null ? void 0 : r.club) === e, n = ((l = t.score) == null ? void 0 : l.home) ?? 0, i = ((c = t.score) == null ? void 0 : c.away) ?? 0, a = s ? n : i, o = s ? i : n;
    return a > o ? "W" : a < o ? "L" : "D";
  }
}, gC = {
  async openModal(t, e = null) {
    if (this.selectedPlayer = t, this.highlightedPos = null, this.selectedJobCtx = e || null, this.negoShowAllModal = !1, this.selectedPlayerStats = null, this.selectedPlayerStatsTab = "career", this.selectedPlayerStatsLoading = !0, this.playerModalTab = "overview", this.espionageNegos.length === 0)
      try {
        const s = await Pt("sf_negos_history_v1");
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
    try {
      const t = performance.now();
      let e = await Pt(zn);
      const s = e ? "server" : "localStorage";
      if (e || (e = localStorage.getItem(zn)), e) {
        console.log(`[SF] ${s} read:`, Math.round(performance.now() - t) + "ms,", Math.round(e.length / 1024) + "KB");
        const n = performance.now(), { players: i, meta: a, ts: o } = await Cn(e);
        if (console.log("[SF] parseAsync players:", Math.round(performance.now() - n) + "ms,", i == null ? void 0 : i.length, "players"), i != null && i.length) {
          this.leagueTables = a.leagueTables || {}, this.asOfWeek = a.asOfWeek || "?", this.totalClubs = a.totalClubs || 0, this.managedSet = new Set(a.managedClubs || []), Pt("sf_vacancies_v1").then((u) => {
            if (u)
              try {
                const { clubs: f } = JSON.parse(u);
                this.vacantClubs = new Set(f || []);
              } catch {
              }
          }).catch(() => {
          });
          const r = {};
          Qi.forEach((u) => (this.leagueTables[u] || []).forEach((f) => {
            r[f.Team] = u;
          })), i.forEach((u) => {
            if (u._league = dl.has(u.Club) ? "other" : r[u.Club] || u._league || "world", u._gameRating = Ln(u, u.Position), u._weightedRating = xa(u, u.Position, td, 20), u._incompleteStats = mn.filter((f) => u[f] != null && u[f] > 0).length < 5, u._g90 === void 0) {
              const f = u.Minutes || 0;
              u._g90 = f >= 30 ? Math.round((u.Goals || 0) / f * 90 * 100) / 100 : null, u._a90 = f >= 30 ? Math.round((u.Assists || 0) / f * 90 * 100) / 100 : null, u._xG90 = f >= 30 && u.xG != null ? Math.round(u.xG / f * 90 * 100) / 100 : null, u._xA90 = f >= 30 && u.xA != null ? Math.round(u.xA / f * 90 * 100) / 100 : null;
            }
            if (u.DOB) {
              const f = new Date(u.DOB), d = /* @__PURE__ */ new Date(), p = (d - f) / (365.25 * 24 * 3600 * 1e3);
              if (u._u21 = p < 21, u._u20 = p < 20, p >= 20 && p < 21) {
                const g = new Date(f.getFullYear() + 21, f.getMonth(), f.getDate());
                u._weeksTo21 = Math.ceil((g - d) / (7 * 24 * 3600 * 1e3));
              } else
                u._weeksTo21 = null;
            } else
              u._u21 = (u.Age || 99) < 21, u._u20 = (u.Age || 99) < 20;
          });
          const l = performance.now();
          i.forEach((u) => Object.freeze(u)), console.log("[SF] Object.freeze:", Math.round(performance.now() - l) + "ms");
          const c = performance.now();
          this.allPlayers = i, console.log("[SF] Vue allPlayers set:", Math.round(performance.now() - c) + "ms"), this.playersCacheDate = new Date(o).toLocaleDateString(), this.progress = 100, this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache(), Date.now() - o > Qw ? (this.playersRefreshing = !0, this.fetchFreshData(!1)) : (fetch(`${it}/tables/from-fixtures`).then((u) => u.json()).then((u) => {
            var d;
            const f = (d = u == null ? void 0 : u.meta) == null ? void 0 : d.asOfWeek;
            f != null && f !== "?" && (this.asOfWeek = f);
          }).catch(() => {
          }), setTimeout(() => this.enrichStats(), 500));
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
      let t = await Pt(Hn);
      if (t || (t = localStorage.getItem(Hn)), t) {
        const { ts: e } = JSON.parse(t);
        this.tacticsCacheDate = new Date(e).toLocaleDateString();
      }
    } catch {
    }
  },
  clearPlayersCache() {
    id(zn), id("sf_squads_raw_v1");
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
        let i = await Pt(co);
        if (i || (i = localStorage.getItem(co)), i) {
          console.log("[SF] stats cache:", Math.round(i.length / 1024) + "KB");
          const a = performance.now(), { statsMap: o, ts: r } = await Cn(i);
          if (console.log("[SF] parseAsync stats:", Math.round(performance.now() - a) + "ms"), o) {
            let l = 0;
            const c = this.allPlayers.map((h) => {
              const u = o[(h.Player || "").toLowerCase()];
              return u ? (l++, Object.freeze({ ...h, ...u })) : h;
            });
            if (l > 0) {
              await new Promise((u) => requestAnimationFrame(u)), this.allPlayers = c, this.statsEnriched = !0, Date.now() - r > tC && setTimeout(() => this.enrichStats(!0), 3e3);
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
          const f = u || {}, d = f.minutes || 0, p = {
            ...c,
            Games: f.games || 0,
            Minutes: d,
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
            _g90: d >= 30 ? Math.round((f.goals || 0) / d * 90 * 100) / 100 : null,
            _a90: d >= 30 ? Math.round((f.assists || 0) / d * 90 * 100) / 100 : null,
            _xG90: d >= 30 && f.xG != null ? Math.round(f.xG / d * 90 * 100) / 100 : null,
            _xA90: d >= 30 && f.xA != null ? Math.round(f.xA / d * 90 * 100) / 100 : null
          };
          e[(o.Player || "").toLowerCase()] = p;
        } catch {
        }
      })), this.statsProgress = Math.round((i + n) / s.length * 100), await new Promise((o) => setTimeout(o, 50));
    }
    this.allPlayers = this.allPlayers.map((i) => {
      const a = e[(i.Player || "").toLowerCase()];
      return a ? Object.freeze({ ...i, ...a }) : i;
    }), uc({ statsMap: e, ts: Date.now() }).then((i) => {
      qs(co, i);
      try {
        localStorage.setItem(co, i);
      } catch {
      }
    }).catch(() => {
    }), this.statsEnriching = !1, this.statsEnriched = !0, this.statsProgress = 100;
  },
  async fetchFreshData(t = !0) {
    var e, s;
    try {
      t && (this.loadMsg = "Fetching leagues & managers…", this.progress = 5);
      const [n, i, a] = await Promise.all([
        fetch(`${it}/tables/from-fixtures`).then((g) => g.json()),
        fetch(`${it}/managers`).then((g) => g.json()),
        fetch(`${it}/admin/squads/public/clubs`).then((g) => g.json())
      ]);
      this.leagueTables = n, this.asOfWeek = ((e = n.meta) == null ? void 0 : e.asOfWeek) || "?";
      const o = {};
      Qi.forEach((g) => (n[g] || []).forEach((m) => {
        o[m.Team] = g;
      }));
      const r = (i.managers || []).filter((g) => {
        var m;
        return g.club && !((m = g.username) != null && m.includes("~deleted~"));
      }), l = new Set(r.map((g) => g.club)), c = {};
      r.forEach((g) => {
        c[g.club] = g.username || g.name || "?";
      }), this.managedSet = l, this.managerMap = c;
      try {
        const g = await Pt("sf_vacancies_v1");
        if (g) {
          const { clubs: m } = JSON.parse(g);
          this.vacantClubs = new Set(m || []);
        } else
          this.vacantClubs = new Set([...a.clubs].filter((m) => !l.has(m) && !dl.has(m)));
      } catch {
        this.vacantClubs = /* @__PURE__ */ new Set();
      }
      const h = a.clubs;
      this.totalClubs = h.length;
      const u = /* @__PURE__ */ new Set(), f = [];
      let d = null;
      try {
        const g = await Pt("sf_squads_raw_v1");
        if (g) {
          const { data: m, ts: _ } = JSON.parse(g), y = (Date.now() - _) / 36e5;
          y < 24 && (d = m, console.log(`[SF] using pre-fetched squads cache (${y.toFixed(1)}h old)`));
        }
      } catch {
      }
      const p = (g, m) => {
        (m || []).forEach((_) => {
          const y = `${_.Player}|${_.Club || g}`;
          if (u.has(y)) return;
          u.add(y), _.Club = _.Club || g, _._league = dl.has(_.Club) ? "other" : o[_.Club] || "world", _._managed = l.has(_.Club), _._gameRating = Ln(_, _.Position), _._weightedRating = xa(_, _.Position, td, 20), _._estValue = aC(_), _._incompleteStats = mn.filter((v) => _[v] != null && _[v] > 0).length < 5;
          const b = _.Minutes || 0;
          if (_._g90 = b >= 30 ? Math.round((_.Goals || 0) / b * 90 * 100) / 100 : null, _._a90 = b >= 30 ? Math.round((_.Assists || 0) / b * 90 * 100) / 100 : null, _._xG90 = b >= 30 && _.xG != null ? Math.round(_.xG / b * 90 * 100) / 100 : null, _._xA90 = b >= 30 && _.xA != null ? Math.round(_.xA / b * 90 * 100) / 100 : null, _.DOB) {
            const v = new Date(_.DOB), w = /* @__PURE__ */ new Date(), S = (w - v) / (365.25 * 24 * 3600 * 1e3);
            if (_._u21 = S < 21, _._u20 = S < 20, S >= 20 && S < 21) {
              const x = new Date(v.getFullYear() + 21, v.getMonth(), v.getDate());
              _._weeksTo21 = Math.ceil((x - w) / (7 * 24 * 3600 * 1e3));
            }
          } else
            _._u21 = (_.Age || 99) < 21, _._u20 = (_.Age || 99) < 20;
          f.push(_);
        });
      };
      if (d)
        t && (this.loadMsg = "Loading squads from cache…", this.progress = 50), h.forEach((g) => {
          var m;
          return p(g, ((m = d[g]) == null ? void 0 : m.players) || d[g] || []);
        });
      else
        for (let g = 0; g < h.length; g++) {
          t && (this.loadMsg = `Fetching squads… (${g + 1}/${h.length})`, this.progress = 10 + Math.round(85 * (g + 1) / h.length));
          try {
            const m = await fetch(`${it}/squads?club=${encodeURIComponent(h[g])}`).then((_) => _.json());
            p(h[g], m.players);
          } catch {
            console.warn("Failed:", h[g]);
          }
          await new Promise((m) => setTimeout(m, 20));
        }
      t && (this.loadMsg = "Fetching transfers…", this.progress = 97);
      try {
        const [g, m] = await Promise.all([
          fetch(`${it}/transfers/done`).then((S) => S.json()),
          fetch(`${it}/transfer-list`).then((S) => S.json()).catch(() => ({ listings: [] }))
        ]), _ = /* @__PURE__ */ new Set(["negotiation", "transfer", "listing", "auction", "swap"]), y = {}, b = {};
        (g.deals || []).forEach((S) => {
          const x = (S.playerName || "").toLowerCase();
          if (!x || !S.amount) return;
          const k = { amount: S.amount, buyer: S.buyer || S.toClub, seller: S.seller || S.fromClub, via: S.via, date: S.updatedAt || S.ts, isReal: _.has(S.via) };
          y[x] || (y[x] = []), y[x].push(k), k.isReal && (b[x] || (b[x] = []), b[x].push(k));
        }), [y, b].forEach((S) => Object.values(S).forEach((x) => x.sort((k, P) => new Date(P.date) - new Date(k.date)))), this.transferMap = b, this.allDeals = g.deals || [];
        const v = {};
        (g.deals || []).forEach((S) => {
          const x = S.playerName || "";
          if (!x || !S.amount) return;
          const k = { player: x, amount: S.amount, buyer: S.buyer || S.toClub, seller: S.seller || S.fromClub, via: S.via, date: S.updatedAt || S.ts };
          [k.buyer, k.seller].filter(Boolean).forEach((P) => {
            v[P] || (v[P] = []), v[P].push(k);
          });
        }), Object.values(v).forEach((S) => S.sort((x, k) => new Date(k.date) - new Date(x.date))), this.clubTransferMap = v;
        const w = {};
        (m.listings || []).filter((S) => S.status !== "sold").forEach((S) => {
          var k;
          const x = (S.player || S.name || "").toLowerCase();
          w[x] = { ask: S.ask || S.price, bids: ((k = S.bids) == null ? void 0 : k.length) || 0, highestBid: S.highestBid || 0 };
        }), f.forEach((S) => {
          var P;
          const x = (S.Player || "").toLowerCase();
          (P = y[x]) != null && P.length && (S._transferHistory = y[x]);
          const k = b[x];
          if (k != null && k.length) {
            S._lastTransfer = k[0];
            const F = k[0].amount;
            S._estValue = Math.round(F / 5e5) * 5e5 || Math.round(F / 1e5) * 1e5 || F;
          }
          w[x] && (S._transferListed = !0, S._listingAsk = w[x].ask, S._listingBids = w[x].bids);
        });
      } catch (g) {
        console.warn("Transfer data unavailable:", g);
      }
      uc({
        players: f,
        meta: { leagueTables: n, asOfWeek: this.asOfWeek, totalClubs: h.length, managedClubs: [...l] },
        ts: Date.now()
      }).then((g) => {
        qs(zn, g);
        try {
          localStorage.setItem(zn, g), this.cacheWorking = !0;
        } catch (m) {
          console.warn("Cache write failed:", m), this.cacheWorking = !1;
        }
      }).catch((g) => console.warn("stringifyAsync failed:", g)), f.forEach((g) => Object.freeze(g)), this.allPlayers = f, this.playersCacheDate = (/* @__PURE__ */ new Date()).toLocaleDateString(), this.playersRefreshing = !1, t && (this.progress = 100, this.loadMsg = "Done!", this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache()), setTimeout(() => this.enrichStats(), 800);
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
      this.activeChartDef = { title: "True Market Value vs Rating", desc: "Top-right = most expensive and best. Outliers in top-left = overpriced; bottom-right = potential bargains.", listLabel: "Highest Value", listFmt: (i) => Pm(i._estValue), listColor: "#ffa657" }, this.charts[t] = new Chart(e, {
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
      const n = { north: "#79c0ff", south: "#7ee787", europa: "#d2a8ff", world: "#ffa657", conference: "#ff7b72", hipster: "#39d353", other: "#8b949e" }, i = Qi.map((a) => ({
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
    var v, w, S;
    if (!t)
      try {
        let x = await Pt(Hn);
        if (x || (x = localStorage.getItem(Hn)), x) {
          const { data: k, ts: P } = JSON.parse(x);
          if (Date.now() - P < Zw) {
            this.tacticsData = k, this.tacticsCacheDate = new Date(P).toLocaleDateString(), this.tacticsLoaded = !0;
            return;
          }
        }
      } catch {
      }
    this.tacticsLoading = !0, this.tacticsLoaded = !1, this.tacticsMsg = "Collecting fixture IDs…", this.tacticsProgress = 2;
    const s = (await fetch(`${it}/admin/squads/public/clubs`).then((x) => x.json())).clubs, n = /* @__PURE__ */ new Set();
    for (let x = 0; x < s.length; x++) {
      this.tacticsMsg = `Collecting fixtures… ${x + 1}/${s.length}`, this.tacticsProgress = Math.round(10 * (x + 1) / s.length);
      try {
        ((await fetch(`${it}/matches?club=${encodeURIComponent(s[x])}&limit=8`).then((P) => P.json())).matches || []).forEach((P) => n.add(P.fixtureId));
      } catch {
      }
      await new Promise((k) => setTimeout(k, 60));
    }
    const i = [...n], a = /\b(\d-\d[-\d]*)\b/, o = {}, r = {}, l = {}, c = {}, h = { W: 0, D: 0, L: 0, n: 0, gf: 0, ga: 0 };
    let u = 0, f = 0;
    const d = (x) => {
      const k = x.toLowerCase();
      return k.includes("tiki") ? "Tiki-taka" : k.includes("counter") ? "Counter" : k.includes("relentless") || k.includes("press") ? "Pressing" : k.includes("direct") ? "Direct" : k.includes("attack") ? "Attacking" : k.includes("defen") ? "Defensive" : k.includes("fluid") ? "Fluid" : k.includes("rigid") ? "Rigid" : k.charAt(0).toUpperCase() + k.slice(1);
    };
    for (let x = 0; x < i.length; x++) {
      this.tacticsProgress = 10 + Math.round(88 * (x + 1) / i.length), this.tacticsMsg = `Analysing match reports… ${x + 1}/${i.length}`;
      try {
        const P = (await fetch(`${it}/matches/${i[x]}`).then((N) => N.json())).match;
        if (!P) continue;
        f++;
        const F = P.events || [], E = (v = P.home) == null ? void 0 : v.club, C = (w = P.away) == null ? void 0 : w.club;
        [{ side: "home", club: E }, { side: "away", club: C }].forEach(({ side: N, club: L }) => {
          var ft, lt, pt, _t;
          if (!L) return;
          const D = F.filter((Y) => Y.minute === 0 && Y.type === "other" && Y.team === L);
          let M = null, T = null;
          const O = (P.reportNarrative || []).slice(0, 3).join(" ");
          for (const Y of D) {
            const q = Y.description || "", U = q.match(/tiki[- ]?taka|counter[- ]?attack|\b(attacking|defensive|balanced|fluid|rigid|direct|pressing|relentless|compact|aggressive)\b/i);
            if (U && (T = d(U[0])), q.toLowerCase().includes(" in ")) {
              const at = q.match(a);
              if (at) {
                const A = at[1].split("-").map(Number);
                if (A.length >= 2 && A.reduce((R, I) => R + I, 0) >= 9) {
                  M = at[1];
                  break;
                }
              }
            }
          }
          if (!M && O.toLowerCase().includes(L.toLowerCase())) {
            const q = O.match(/lined up[^.]*?(\d-\d[-\d]*)/i) || O.match(/in (?:an? )?[\w ]+?(\d-\d[-\d]*)/i);
            q && q[1].split("-").map(Number).reduce((at, A) => at + A, 0) >= 9 && (M = q[1]);
          }
          if (!M) return;
          u++;
          const V = N === "home", K = V ? ((ft = P.score) == null ? void 0 : ft.home) || 0 : ((lt = P.score) == null ? void 0 : lt.away) || 0, Z = V ? ((pt = P.score) == null ? void 0 : pt.away) || 0 : ((_t = P.score) == null ? void 0 : _t.home) || 0, et = K > Z ? "W" : K < Z ? "L" : "D";
          o[M] || (o[M] = { formation: M, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0, styles: {} }), o[M][et]++, o[M].gf += K, o[M].ga += Z, o[M].n++, T && (o[M].styles[T] = (o[M].styles[T] || 0) + 1), T && (r[T] || (r[T] = { style: T, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), r[T][et]++, r[T].gf += K, r[T].ga += Z, r[T].n++), L === Jt && (l[M] || (l[M] = { W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), l[M][et]++, l[M].gf += K, l[M].ga += Z, l[M].n++, h[et]++, h.gf += K, h.ga += Z, h.n++, T && (c[T] = (c[T] || 0) + 1));
        });
      } catch {
      }
      await new Promise((k) => setTimeout(k, 60));
    }
    const p = Object.values(o).filter((x) => x.n >= 2).map((x) => {
      var P;
      const k = ((P = Object.entries(x.styles).sort((F, E) => E[1] - F[1])[0]) == null ? void 0 : P[0]) || "";
      return { ...x, topStyle: k, winPct: Math.round(100 * x.W / x.n), ppg: ((x.W * 3 + x.D) / x.n).toFixed(2), avgGF: (x.gf / x.n).toFixed(2), avgGA: (x.ga / x.n).toFixed(2) };
    }).sort((x, k) => k.n - x.n), g = Object.values(r).filter((x) => x.n >= 3).map((x) => ({ ...x, winPct: Math.round(100 * x.W / x.n), ppg: ((x.W * 3 + x.D) / x.n).toFixed(2), avgGF: (x.gf / x.n).toFixed(2), avgGA: (x.ga / x.n).toFixed(2) })).sort((x, k) => k.n - x.n), m = h.n > 0 ? {
      record: h,
      forms: Object.entries(l).sort((x, k) => k[1].n - x[1].n).map(([x, k]) => ({ formation: x, ...k, winPct: Math.round(100 * k.W / k.n) })),
      topStyle: ((S = Object.entries(c).sort((x, k) => k[1] - x[1])[0]) == null ? void 0 : S[0]) || null,
      styleBreakdown: c
    } : null, _ = { totalMatches: f, fixturesAnalysed: i.length, withFormation: u, formations: p, styles: g, myClubData: m };
    this.tacticsData = _;
    const y = Date.now();
    this.tacticsCacheDate = new Date(y).toLocaleDateString();
    const b = JSON.stringify({ data: _, ts: y });
    qs(Hn, b);
    try {
      localStorage.setItem(Hn, b);
    } catch {
    }
    this.tacticsMsg = "Done!", this.tacticsProgress = 100, this.tacticsLoading = !1, this.tacticsLoaded = !0;
  }
}, mC = {
  getYouthAttr(t, e) {
    return t[e] != null && t[e] > 0 ? t[e] : t.stats && t.stats[e] != null && t.stats[e] > 0 ? t.stats[e] : null;
  },
  // ── Saved lineup ──────────────────────────────────────────────────────────
  loadSavedLineup() {
    try {
      const t = localStorage.getItem(`st2:last:${Jt}`);
      if (t) {
        const e = JSON.parse(t);
        e.runs = localStorage.getItem(`st2:runs:${Jt}`) || "on", this.savedLineup = e;
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
    const e = { name: "name_a", pos: "pos_a", age: "age_a", rating: "rating_d", value: "value_d", buyNow: "buynow_d", date: "date", status: "status_a", sclub: "sclub_a", bestattr: "bestattr_a" }, s = { name_a: "name_d", name_d: "name_a", pos_a: "pos_d", pos_d: "pos_a", age_a: "age_d", age_d: "age_a", rating_d: "rating_a", rating_a: "rating_d", value_d: "value_a", value_a: "value_d", buynow_d: "buynow_a", buynow_a: "buynow_d", date: "date_a", date_a: "date", status_a: "status_d", status_d: "status_a", sclub_a: "sclub_d", sclub_d: "sclub_a", bestattr_a: "bestattr_d", bestattr_d: "bestattr_a" }, n = e[t];
    n && (this.youthHistSort = this.youthHistSort === n && s[n] || n);
  },
  youthSortIcon(t) {
    const e = this.youthHistSort, s = { name: "name_a", pos: "pos_a", age: "age_a", rating: "rating_a", value: "value_a", buyNow: "buynow_a", date: "date_a", status: "status_a", sclub: "sclub_a", bestattr: "bestattr_a" }, n = { name: "name_d", pos: "pos_d", age: "age_d", rating: "rating_d", value: "value_d", buyNow: "buynow_d", date: "date", status: "status_d", sclub: "sclub_d", bestattr: "bestattr_d" };
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
      const e = encodeURIComponent(Jt), [s, n] = await Promise.all([
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
    const e = await gl().catch(() => null);
    await fetch(`${it}/staff/applicants/reject`, {
      method: "POST",
      headers: e ? { "Content-Type": "application/json", Authorization: `Bearer ${e}`, "X-Club": Jt, "X-Role": "manager" } : { "Content-Type": "application/json" },
      body: JSON.stringify({ club: Jt, id: t.id })
    }).catch(() => {
    });
  },
  async toggleAd(t) {
    var i;
    const e = ((i = this.clubStaff) == null ? void 0 : i.openAds) || [], n = e.includes(t) ? e.filter((a) => a !== t) : [...e, t];
    this.staffAdsUpdating = !0;
    try {
      const o = { "Content-Type": "application/json", Authorization: `Bearer ${await gl()}`, "X-Club": Jt, "X-Role": "manager" }, l = await (await fetch(`${it}/staff/ads`, {
        method: "POST",
        headers: o,
        body: JSON.stringify({ club: Jt, roles: n })
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
        gl(),
        fetch(`${it}/fixtures/week`).then((a) => a.json())
      ]), s = e.currentWeek - 1;
      if (!(s > 0)) throw new Error(`Bad week from /fixtures/week: ${JSON.stringify(e)}`);
      const n = { "Content-Type": "application/json" };
      this.staffGenMsg = `Week ${s} — toggling ads…`, await fetch(`${ml}/_staff/toggle`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ roles: ["CEO", "Assistant", "Physio"] })
      }), await fetch(`${ml}/_staff/toggle`, {
        method: "POST",
        headers: n,
        body: JSON.stringify({ roles: ["CEO", "Assistant", "Physio", "Technical Director"] })
      }), this.staffGenMsg = `Week ${s} — generating…`;
      const i = await fetch(`${ml}/_staff/generate`, {
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
}, yC = {
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
      t = t.filter((n) => (n._homeManager || "").toLowerCase().includes(s) || (n._awayManager || "").toLowerCase().includes(s));
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
      e._homeManager && t.add(e._homeManager), e._awayManager && t.add(e._awayManager);
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
    var g, m, _, y, b, v, w, S, x, k, P, F, E, C, N, L, D, M, T, O, V, K, Z, et, ft, lt, pt, _t;
    if (!this.matchArchive) return null;
    const t = (Y, q, U, at, A, R, I, z) => {
      if (!q) return;
      Y[q] || (Y[q] = { n: 0, W: 0, D: 0, L: 0, gf: 0, ga: 0, xgF: 0, xgA: 0, sqDiff: 0 });
      const $ = Y[q];
      $.n++, $[U]++, $.gf += at, $.ga += A, $.xgF += R || 0, $.xgA += I || 0, $.sqDiff += z || 0;
    }, e = (Y) => Object.entries(Y).map(([q, U]) => ({
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
    for (const Y of this.matchArchive) {
      const q = ((g = Y.score) == null ? void 0 : g.home) ?? 0, U = ((m = Y.score) == null ? void 0 : m.away) ?? 0, at = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((y = (_ = Y.stats) == null ? void 0 : _.xg) == null ? void 0 : y.home) || 0, I = ((v = (b = Y.stats) == null ? void 0 : b.xg) == null ? void 0 : v.away) || 0, z = (((S = (w = Y.home) == null ? void 0 : w.sqRtg) == null ? void 0 : S.overall) || 0) - (((k = (x = Y.away) == null ? void 0 : x.sqRtg) == null ? void 0 : k.overall) || 0), $ = this.fmtFormation((P = Y.home) == null ? void 0 : P.formation), B = this.fmtFormation((F = Y.away) == null ? void 0 : F.formation), G = (E = Y.home) == null ? void 0 : E.mentality, j = (C = Y.away) == null ? void 0 : C.mentality;
      t(s, $ && B ? `${$} vs ${B}` : null, at, q, U, R, I, z), t(s, $ && B ? `${B} vs ${$}` : null, A, U, q, I, R, -z), t(n, G && j ? `${G} vs ${j}` : null, at, q, U, R, I, z), t(n, G && j ? `${j} vs ${G}` : null, A, U, q, I, R, -z);
    }
    const i = {}, a = {}, o = {}, r = {};
    for (const Y of this.analysisMatches) {
      const q = ((N = Y.score) == null ? void 0 : N.home) ?? 0, U = ((L = Y.score) == null ? void 0 : L.away) ?? 0, at = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((M = (D = Y.stats) == null ? void 0 : D.xg) == null ? void 0 : M.home) || 0, I = ((O = (T = Y.stats) == null ? void 0 : T.xg) == null ? void 0 : O.away) || 0, z = (((K = (V = Y.home) == null ? void 0 : V.sqRtg) == null ? void 0 : K.overall) || 0) - (((et = (Z = Y.away) == null ? void 0 : Z.sqRtg) == null ? void 0 : et.overall) || 0), $ = ((lt = (ft = Y.home) == null ? void 0 : ft.sub) == null ? void 0 : lt.instructions) || {}, B = ((_t = (pt = Y.away) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) || {}, G = $.pressing_intensity, j = B.pressing_intensity, H = $.style, W = B.style, J = $.defensive_line, X = B.defensive_line, st = $.transition_speed, tt = B.transition_speed;
      t(i, G && W ? `${G} vs ${W}` : null, at, q, U, R, I, z), t(i, j && H ? `${j} vs ${H}` : null, A, U, q, I, R, -z), t(a, H && j ? `${H} vs ${j}` : null, at, q, U, R, I, z), t(a, W && G ? `${W} vs ${G}` : null, A, U, q, I, R, -z), t(o, J && tt ? `${J} vs ${tt}` : null, at, q, U, R, I, z), t(o, X && st ? `${X} vs ${st}` : null, A, U, q, I, R, -z), t(r, st && X ? `${st} vs ${X}` : null, at, q, U, R, I, z), t(r, tt && J ? `${tt} vs ${J}` : null, A, U, q, I, R, -z);
    }
    const l = this.matchArchive.length, c = this.matchArchive.filter((Y) => {
      var q, U;
      return ((q = Y.home) == null ? void 0 : q.formation) && ((U = Y.away) == null ? void 0 : U.formation);
    }).length, h = this.matchArchive.filter((Y) => {
      var q, U;
      return ((q = Y.home) == null ? void 0 : q.mentality) && ((U = Y.away) == null ? void 0 : U.mentality);
    }).length, u = this.analysisMatches.length, f = this.analysisMatches.filter((Y) => {
      var q, U, at, A, R, I;
      return ((at = (U = (q = Y.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.pressing_intensity) || ((I = (R = (A = Y.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : I.pressing_intensity);
    }).length, d = this.analysisMatches.filter((Y) => {
      var q, U, at, A, R, I;
      return ((at = (U = (q = Y.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.defensive_line) || ((I = (R = (A = Y.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : I.defensive_line);
    }).length, p = this.analysisMatches.filter((Y) => {
      var q, U, at, A, R, I;
      return ((at = (U = (q = Y.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : at.transition_speed) || ((I = (R = (A = Y.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : I.transition_speed);
    }).length;
    return {
      formations: e(s),
      mentalities: e(n),
      pressing: e(i),
      styleVpress: e(a),
      defLine: e(o),
      transVline: e(r),
      coverage: { total: l, bothFormations: c, bothMentality: h, withInstr: u, withPress: f, withDefLine: d, withTrans: p }
    };
  },
  subsDbStats() {
    var a, o, r, l, c, h, u, f, d;
    if (!this.subsDb || !this.matchArchive) return null;
    const t = this.subsDb.clubs || {}, e = {};
    for (const p of this.matchArchive) {
      const g = p._gw;
      if (g == null) continue;
      const m = (o = t[(a = p.home) == null ? void 0 : a.club]) == null ? void 0 : o[g], _ = (l = t[(r = p.away) == null ? void 0 : r.club]) == null ? void 0 : l[g];
      e[g] || (e[g] = { gw: g, n: 0, hSub: 0, aSub: 0, bothSub: 0, bothFm: 0, bothMen: 0, press: 0, line: 0, trans: 0, sides: 0 });
      const y = e[g];
      y.n++, m && y.hSub++, _ && y.aSub++, m && _ && y.bothSub++, m != null && m.formation && (_ != null && _.formation) && y.bothFm++, (c = m == null ? void 0 : m.instructions) != null && c.mentality && ((h = _ == null ? void 0 : _.instructions) != null && h.mentality) && y.bothMen++;
      for (const b of [m, _])
        b && (y.sides++, (u = b.instructions) != null && u.pressing_intensity && y.press++, (f = b.instructions) != null && f.defensive_line && y.line++, (d = b.instructions) != null && d.transition_speed && y.trans++);
    }
    const s = Object.values(e).sort((p, g) => g.gw - p.gw), n = this.matchArchive.length, i = s.reduce((p, g) => (p.bothSub += g.bothSub, p.bothFm += g.bothFm, p.bothMen += g.bothMen, p.sides += g.sides, p.press += g.press, p.line += g.line, p.trans += g.trans, p), { bothSub: 0, bothFm: 0, bothMen: 0, sides: 0, press: 0, line: 0, trans: 0 });
    return { rows: s, total: n, totals: i };
  }
}, bC = {
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
    return this.allPlayers.filter((t) => t.Club === Jt);
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
    const t = ph[this.mySquadFormation];
    if (!t) return [];
    const e = this.mySquadPlayers, s = /* @__PURE__ */ new Set(), n = (i, a) => {
      const r = (nC[a] || []).map((l) => i[l]).filter((l) => l != null && l > 0);
      return r.length ? r.reduce((l, c) => l + c, 0) / r.length : 0;
    };
    return t.map((i, a) => {
      const o = sC[i] || [i];
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
}, _C = {
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
        const u = new Date(c.endsAt || 0).getTime() > t, f = ((a = c.highest) == null ? void 0 : a.bidder) || null, d = [...c.bids || []].sort((m, _) => (_.amount || 0) - (m.amount || 0)).map((m) => ({
          id: `${c.id}-${m.bidder}`,
          buyer: m.bidder,
          amount: m.amount,
          updatedAt: m.at,
          via: "auction",
          status: u ? "pending" : m.bidder === f ? "accepted" : "rejected",
          subStatus: u || m.bidder === f ? null : "outbid"
        }));
        let p = ((o = d[0]) == null ? void 0 : o.buyer) || null;
        for (const m of d) {
          const _ = this.clubBudgetFor(m.buyer);
          if (_ == null || _ >= m.amount) {
            p = m.buyer;
            break;
          }
        }
        const g = { playerName: c.player, seller: c.club, bids: d, endsAt: c.endsAt, effectiveWinner: p };
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
}, xC = {
  activeModalStats() {
    const t = this.selectedPlayerStats;
    return t ? this.selectedPlayerStatsTab === "season" ? t.seasonStats || null : this.selectedPlayerStatsTab === "career" && (t.career || t.seasonStats) || null : null;
  },
  selectedPlayerTraits() {
    return this.selectedPlayer ? hc(this.selectedPlayer) : [];
  },
  selectedPlayerBonds() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const t = this.allPlayers.filter((e) => e.Club === this.selectedPlayer.Club);
    return hC(this.selectedPlayer, t, this.allDeals);
  },
  mySquadChem() {
    const t = this.allPlayers.filter((e) => e.Club === Jt);
    return Tm(t, this.allDeals);
  },
  availableTraits() {
    const t = /* @__PURE__ */ new Set();
    return this.allPlayers.forEach((e) => hc(e).forEach((s) => t.add(s.n))), ["", ...Array.from(t).sort()];
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
}, vC = {
  filteredPlayers() {
    const t = this.search.toLowerCase();
    return this.allPlayers.filter((e) => {
      var i, a, o;
      if (!this.leagueFilter.has(e._league) || !this.posFilter.has(e.Position)) return !1;
      const s = this.posRatingUseWeighted ? e._weightedRating || e._gameRating || e.Rating || 0 : e._gameRating || e.Rating || 0;
      if (Object.values(this.posRatingFilters).some((r) => r > 60) && !Object.entries(this.posRatingFilters).some(([l, c]) => {
        if (c <= 60) return !1;
        const h = this.posRatingUseWeighted ? xa(e, l, this.mentalCfgAttrs, this.mentalWeightPct) : Ln(e, l);
        return h != null && h >= c;
      }) || this.posRatingMax < 99 && s > this.posRatingMax || this.maxAge < 40 && (e.Age || 99) > this.maxAge || this.ageGroupFilter === "u21" && !e._u21 || this.ageGroupFilter === "u20" && !e._u20 || this.hideOwn && e.Club === Jt || this.hideVacant && this.vacantClubs.has(e.Club) || this.managedOnly && !e._managed || this.forSaleOnly && (!e._managed || e.notForSale) || this.transferListedOnly && !e._transferListed || this.injuredOnly && !e.injured && !e.suspended || this.hideRetiring && e.retiring || this.traitFilter && !hc(e).map((l) => l.n).includes(this.traitFilter))
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
    return this.sortedPlayers.slice(this.page * pl, (this.page + 1) * pl);
  },
  totalPages() {
    return Math.ceil(this.filteredPlayers.length / pl);
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
    return this.allPlayers.filter((t) => t.Age <= 27 && (t._gameRating || 0) >= 68 && t.Club !== Jt).map((t) => {
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
}, SC = {
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
    return e === "date" ? [...t].sort((s, n) => new Date(n.createdAt) - new Date(s.createdAt)) : e === "date_a" ? [...t].sort((s, n) => new Date(s.createdAt) - new Date(n.createdAt)) : e === "rating_d" ? [...t].sort((s, n) => (n.player.rating || n.player.Rating || 0) - (s.player.rating || s.player.Rating || 0)) : e === "rating_a" ? [...t].sort((s, n) => (s.player.rating || s.player.Rating || 0) - (n.player.rating || n.player.Rating || 0)) : e === "age_a" ? [...t].sort((s, n) => (s.player.age || s.player.Age || 0) - (n.player.age || n.player.Age || 0)) : e === "age_d" ? [...t].sort((s, n) => (n.player.age || n.player.Age || 0) - (s.player.age || s.player.Age || 0)) : e === "value_d" ? [...t].sort((s, n) => (n.player.value || n.player.Value || 0) - (s.player.value || s.player.Value || 0)) : e === "value_a" ? [...t].sort((s, n) => (s.player.value || s.player.Value || 0) - (n.player.value || n.player.Value || 0)) : e === "name_a" ? [...t].sort((s, n) => (s.player.name || s.player.Player || "").localeCompare(n.player.name || n.player.Player || "")) : e === "name_d" ? [...t].sort((s, n) => (n.player.name || n.player.Player || "").localeCompare(s.player.name || s.player.Player || "")) : e === "pos_a" ? [...t].sort((s, n) => (s.player.position || s.player.Position || "").localeCompare(n.player.position || n.player.Position || "")) : e === "pos_d" ? [...t].sort((s, n) => (n.player.position || n.player.Position || "").localeCompare(s.player.position || s.player.Position || "")) : e === "buynow_d" ? [...t].sort((s, n) => (n.buyNow || 0) - (s.buyNow || 0)) : e === "buynow_a" ? [...t].sort((s, n) => (s.buyNow || 0) - (n.buyNow || 0)) : e === "status_a" ? [...t].sort((s, n) => (s._jobStatus || s.status || "").localeCompare(n._jobStatus || n.status || "")) : e === "status_d" ? [...t].sort((s, n) => (n._jobStatus || n.status || "").localeCompare(s._jobStatus || s.status || "")) : e === "bestattr_a" ? [...t].sort((s, n) => {
      var i, a;
      return (((i = s.player) == null ? void 0 : i.bestKey) || "").localeCompare(((a = n.player) == null ? void 0 : a.bestKey) || "");
    }) : e === "bestattr_d" ? [...t].sort((s, n) => {
      var i, a;
      return (((i = n.player) == null ? void 0 : i.bestKey) || "").localeCompare(((a = s.player) == null ? void 0 : a.bestKey) || "");
    }) : t;
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
    let t = this.youthAllHistoryJobs;
    const e = (this.youthHistSearch || "").toLowerCase();
    e && (t = t.filter((n) => {
      var i, a;
      return (((i = n.player) == null ? void 0 : i.name) || "").toLowerCase().includes(e) || (((a = n.player) == null ? void 0 : a.club) || "").toLowerCase().includes(e) || (n._club || "").toLowerCase().includes(e);
    })), this.youthHistPos && (t = t.filter((n) => {
      var i, a;
      return (((i = n.player) == null ? void 0 : i.position) || ((a = n.player) == null ? void 0 : a.Position)) === this.youthHistPos;
    })), this.youthHistClubFilter && (t = t.filter((n) => n._club === this.youthHistClubFilter)), this.youthHistStatusFilter && (t = t.filter((n) => (n._jobStatus || n.status) === this.youthHistStatusFilter));
    const s = this.youthHistSort;
    return s === "date" ? [...t].sort((n, i) => new Date(i.createdAt) - new Date(n.createdAt)) : s === "date_a" ? [...t].sort((n, i) => new Date(n.createdAt) - new Date(i.createdAt)) : s === "rating_d" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.rating) || 0) - (((o = n.player) == null ? void 0 : o.rating) || 0);
    }) : s === "rating_a" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.rating) || 0) - (((o = i.player) == null ? void 0 : o.rating) || 0);
    }) : s === "age_a" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.age) || 0) - (((o = i.player) == null ? void 0 : o.age) || 0);
    }) : s === "age_d" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.age) || 0) - (((o = n.player) == null ? void 0 : o.age) || 0);
    }) : s === "value_d" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.value) || 0) - (((o = n.player) == null ? void 0 : o.value) || 0);
    }) : s === "value_a" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.value) || 0) - (((o = i.player) == null ? void 0 : o.value) || 0);
    }) : s === "name_a" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.name) || "").localeCompare(((o = i.player) == null ? void 0 : o.name) || "");
    }) : s === "name_d" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.name) || "").localeCompare(((o = n.player) == null ? void 0 : o.name) || "");
    }) : s === "pos_a" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.position) || "").localeCompare(((o = i.player) == null ? void 0 : o.position) || "");
    }) : s === "pos_d" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.position) || "").localeCompare(((o = n.player) == null ? void 0 : o.position) || "");
    }) : s === "buynow_d" ? [...t].sort((n, i) => (i.buyNow || 0) - (n.buyNow || 0)) : s === "buynow_a" ? [...t].sort((n, i) => (n.buyNow || 0) - (i.buyNow || 0)) : s === "status_a" ? [...t].sort((n, i) => (n._jobStatus || n.status || "").localeCompare(i._jobStatus || i.status || "")) : s === "status_d" ? [...t].sort((n, i) => (i._jobStatus || i.status || "").localeCompare(n._jobStatus || n.status || "")) : s === "sclub_a" ? [...t].sort((n, i) => (n._club || "").localeCompare(i._club || "")) : s === "sclub_d" ? [...t].sort((n, i) => (i._club || "").localeCompare(n._club || "")) : s === "bestattr_a" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = n.player) == null ? void 0 : a.bestKey) || "").localeCompare(((o = i.player) == null ? void 0 : o.bestKey) || "");
    }) : s === "bestattr_d" ? [...t].sort((n, i) => {
      var a, o;
      return (((a = i.player) == null ? void 0 : a.bestKey) || "").localeCompare(((o = n.player) == null ? void 0 : o.bestKey) || "");
    }) : t;
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
}, wC = {
  selectedClubPlayers() {
    if (!this.selectedClubName) return [];
    const t = this.clubSquadSort || "pos";
    return this.allPlayers.filter((e) => e.Club === this.selectedClubName).sort((e, s) => {
      if (t === "pos") {
        const n = (sd[e.Position] ?? 9) - (sd[s.Position] ?? 9);
        return n !== 0 ? n : (s._gameRating || s.Rating || 0) - (e._gameRating || e.Rating || 0);
      }
      return t === "rating" ? (s._gameRating || s.Rating || 0) - (e._gameRating || e.Rating || 0) : t === "value" ? (s.Value || 0) - (e.Value || 0) : t === "age" ? (e.Age || 0) - (s.Age || 0) : (e.Player || "").localeCompare(s.Player || "");
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
Ho({
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
      myClub: Jt,
      leagueFilter: new Set(Qi),
      posFilter: new Set(lo),
      maxAge: 40,
      search: "",
      hideOwn: !1,
      hideVacant: !0,
      managedOnly: !1,
      forSaleOnly: !1,
      transferListedOnly: !1,
      injuredOnly: !1,
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
      // Stats enrichment state
      statsEnriching: !1,
      statsProgress: 0,
      statsEnriched: !1,
      activeTab: (() => {
        const t = location.hash.slice(1);
        return t && ["scout", "squad", "moneyball", "analysis", "youth", "club", "clubs", "espionage", "matches"].includes(t) ? t : localStorage.getItem("sf_activeTab") || "squad";
      })(),
      tabs: [{ id: "scout", label: "🔍 Scout" }, { id: "squad", label: "🛡 My Squad" }, { id: "moneyball", label: "📊 Moneyball" }, { id: "analysis", label: "🔬 Analysis" }, { id: "youth", label: "🌱 Youth" }, { id: "club", label: "🏟 My Club" }, { id: "clubs", label: "🏟 Clubs" }, { id: "espionage", label: "💰 Transfers" }, { id: "matches", label: "📺 Matches" }],
      mySquadFormation: "4231",
      formationKeys: Object.keys(ph),
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
      allLeagues: Qi,
      allPositions: lo,
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
        { key: "_g90", label: "G/90", w: 38, full: "Goals per 90 minutes (min 30 mins played)", group: "per90" },
        { key: "_a90", label: "A/90", w: 38, full: "Assists per 90 minutes (min 30 mins played)", group: "per90" },
        { key: "_xG90", label: "xG/90", w: 44, full: "Expected Goals per 90 minutes", group: "per90" },
        { key: "_xA90", label: "xA/90", w: 44, full: "Expected Assists per 90 minutes", group: "per90" },
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
    ...yC,
    ...bC,
    ..._C,
    ...xC,
    ...vC,
    ...SC,
    ...wC
  },
  watch: {
    filteredPlayers() {
      this.page = 0;
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
      t !== "top-lists" && (await oi(), this.drawMoneyballChart(t));
    },
    async tacticsLoaded(t) {
      t && (await oi(), this.drawTacticsCharts());
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
    ...uC,
    ...fC,
    ...dC,
    ...pC,
    ...gC,
    ...mC,
    fmtVal: Pm,
    fmtWage: oC,
    ratingClass(t) {
      return t ? t >= 84 ? "rating-high" : t >= 77 ? "rating-mid" : "rating-low" : "c-gray";
    },
    attrBarColor(t) {
      return (t || 0) >= 80 ? "#7ee787" : (t || 0) >= 65 ? "#ffa657" : "#ff7b72";
    },
    isKeyAttr(t, e) {
      const s = this.highlightedPos || e, n = lr[s];
      return n ? n.includes(t) : !1;
    },
    gameAttrsFor(t) {
      return lr[t] || [];
    },
    recomputeWeightedRatings() {
      const t = this.mentalCfgAttrs, e = this.mentalWeightPct;
      this.allPlayers = this.allPlayers.map((s) => {
        const n = xa(s, s.Position, t, e);
        return n === s._weightedRating ? s : Object.freeze({ ...s, _weightedRating: n });
      });
    },
    posAttrNames(t) {
      return Qf[t] || "";
    },
    allPosRatings(t) {
      return Xw.map((e) => ({
        pos: e,
        attrs: Qf[e] || "",
        game: Ln(t, e),
        weighted: xa(t, e, this.mentalCfgAttrs, this.mentalWeightPct),
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
      if (this.posFilter.size === lo.length)
        this.posFilter = /* @__PURE__ */ new Set([t]);
      else if (this.posFilter.size === 1 && this.posFilter.has(t))
        this.posFilter = new Set(lo);
      else {
        const s = new Set(this.posFilter);
        s.has(t) ? s.delete(t) : s.add(t), this.posFilter = s;
      }
    },
    clubChemScore(t) {
      const e = this.allPlayers.filter((s) => s.Club === t);
      return Tm(e, this.allDeals);
    },
    chemColor(t) {
      return t == null ? "#6e7681" : t >= 70 ? "#3fb950" : t >= 40 ? "#d29922" : "#f85149";
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
    ar.defaults.font.family = "'Segoe UI',system-ui,sans-serif", ar.defaults.color = "#8b949e";
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
    requestAnimationFrame(() => requestAnimationFrame(() => this.loadData())), this.loadCachedSubmissions(), this.loadMatchArchive();
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
