var Om = Object.defineProperty;
var Fm = (t, e, s) => e in t ? Om(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var Q = (t, e, s) => Fm(t, typeof e != "symbol" ? e + "" : e, s);
/**
* vue v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let yh, te, Dt, ji, Wi, Pa, Jn, Ta, bl, yn, Bn, $s, _l;
function Ee(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
let yt = {}, Xn = [], ie = () => {
}, Un = () => !1, On = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && (t.charCodeAt(2) > 122 || 97 > t.charCodeAt(2)), cr = (t) => t.startsWith("onUpdate:"), gt = Object.assign, fc = (t, e) => {
  let s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Em = Object.prototype.hasOwnProperty, wt = (t, e) => Em.call(t, e), nt = Array.isArray, at = (t) => typeof t == "function", ct = (t) => typeof t == "string", ge = (t) => typeof t == "symbol", St = (t) => t !== null && typeof t == "object", pc = (t) => (St(t) || at(t)) && at(t.then) && at(t.catch), jt = Object.prototype.toString, hr = (t) => ct(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Ss = Ee(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Im = Ee("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), ur = (t) => {
  let e = /* @__PURE__ */ Object.create(null);
  return (s) => e[s] || (e[s] = t(s));
}, Nm = /-\w/g, Tt = ur((t) => t.replace(Nm, (e) => e.slice(1).toUpperCase())), Bm = /\B([A-Z])/g, Me = ur((t) => t.replace(Bm, "-$1").toLowerCase()), Fn = ur((t) => t.charAt(0).toUpperCase() + t.slice(1)), Zn = ur((t) => t ? `on${Fn(t)}` : ""), ne = (t, e) => !Object.is(t, e), Qn = (t, ...e) => {
  for (let s = 0; s < t.length; s++) t[s](...e);
}, af = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, { configurable: !0, enumerable: !1, writable: n, value: s });
}, dr = (t) => {
  let e = parseFloat(t);
  return isNaN(e) ? t : e;
}, ti = (t) => {
  let e = ct(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
}, fr = () => yh || (yh = "u" > typeof globalThis ? globalThis : "u" > typeof self ? self : "u" > typeof window ? window : "u" > typeof global ? global : {}), $m = Ee("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function wo(t) {
  if (nt(t)) {
    let e = {};
    for (let s = 0; s < t.length; s++) {
      let n = t[s], i = ct(n) ? rf(n) : wo(n);
      if (i) for (let o in i) e[o] = i[o];
    }
    return e;
  }
  if (ct(t) || St(t)) return t;
}
let jm = /;(?![^(]*\))/g, Wm = /:([^]+)/, Vm = /\/\*[^]*?\*\//g;
function rf(t) {
  let e = {};
  return t.replace(Vm, "").split(jm).forEach((s) => {
    if (s) {
      let n = s.split(Wm);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Co(t) {
  let e = "";
  if (ct(t)) e = t;
  else if (nt(t)) for (let s = 0; s < t.length; s++) {
    let n = Co(t[s]);
    n && (e += n + " ");
  }
  else if (St(t)) for (let s in t) t[s] && (e += s + " ");
  return e.trim();
}
function Hm(t) {
  if (!t) return null;
  let { class: e, style: s } = t;
  return e && !ct(e) && (t.class = Co(e)), s && (t.style = wo(s)), t;
}
let zm = Ee("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"), Gm = Ee("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"), Um = Ee("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"), qm = Ee("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), Ym = Ee("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
function Ms(t, e) {
  let s, n;
  if (t === e) return !0;
  let i = (s = t, jt.call(s) === "[object Date]"), o = (n = e, jt.call(n) === "[object Date]");
  if (i || o) return !!i && !!o && t.getTime() === e.getTime();
  if (i = ge(t), o = ge(e), i || o) return t === e;
  if (i = nt(t), o = nt(e), i || o) return !!i && !!o && function(a, r) {
    if (a.length !== r.length) return !1;
    let l = !0;
    for (let c = 0; l && c < a.length; c++) l = Ms(a[c], r[c]);
    return l;
  }(t, e);
  if (i = St(t), o = St(e), i || o) {
    if (!i || !o || Object.keys(t).length !== Object.keys(e).length) return !1;
    for (let a in t) {
      let r = t.hasOwnProperty(a), l = e.hasOwnProperty(a);
      if (r && !l || !r && l || !Ms(t[a], e[a])) return !1;
    }
  }
  return String(t) === String(e);
}
function pr(t, e) {
  return t.findIndex((s) => Ms(s, e));
}
let lf = (t) => !!(t && t.__v_isRef === !0), cf = (t) => ct(t) ? t : t == null ? "" : nt(t) || St(t) && (t.toString === jt || !at(t.toString)) ? lf(t) ? cf(t.value) : JSON.stringify(t, hf, 2) : String(t), hf = (t, e) => {
  let s;
  if (lf(e)) return hf(t, e.value);
  if (s = e, jt.call(s) === "[object Map]") return { [`Map(${e.size})`]: [...e.entries()].reduce((n, [i, o], a) => (n[Nr(i, a) + " =>"] = o, n), {}) };
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
class gc {
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
function Km(t) {
  return new gc(t);
}
function uf() {
  return te;
}
function Jm(t, e = !1) {
  te && te.cleanups.push(t);
}
let Br = /* @__PURE__ */ new WeakSet();
class eo {
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
    (!(2 & this.flags) || 32 & this.flags) && (8 & this.flags || df(this));
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, bh(this), ff(this);
    let e = Dt, s = Ge;
    Dt = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      pf(this), Dt = e, Ge = s, this.flags &= -3;
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let e = this.deps; e; e = e.nextDep) yc(e);
      this.deps = this.depsTail = void 0, bh(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    64 & this.flags ? Br.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    xl(this) && this.run();
  }
  get dirty() {
    return xl(this);
  }
}
let gr = 0;
function df(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Wi, Wi = t;
    return;
  }
  t.next = ji, ji = t;
}
function mc() {
  let t;
  if (!(--gr > 0)) {
    if (Wi) {
      let e = Wi;
      for (Wi = void 0; e; ) {
        let s = e.next;
        e.next = void 0, e.flags &= -9, e = s;
      }
    }
    for (; ji; ) {
      let e = ji;
      for (ji = void 0; e; ) {
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
function ff(t) {
  for (let e = t.deps; e; e = e.nextDep) e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function pf(t) {
  let e, s = t.depsTail, n = s;
  for (; n; ) {
    let i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), yc(n), function(o) {
      let { prevDep: a, nextDep: r } = o;
      a && (a.nextDep = r, o.prevDep = void 0), r && (r.prevDep = a, o.nextDep = void 0);
    }(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  t.deps = e, t.depsTail = s;
}
function xl(t) {
  for (let e = t.deps; e; e = e.nextDep) if (e.dep.version !== e.version || e.dep.computed && (gf(e.dep.computed) || e.dep.version !== e.version)) return !0;
  return !!t._dirty;
}
function gf(t) {
  if (4 & t.flags && !(16 & t.flags) || (t.flags &= -17, t.globalVersion === so) || (t.globalVersion = so, !t.isSSR && 128 & t.flags && (!t.deps && !t._dirty || !xl(t)))) return;
  t.flags |= 2;
  let e = t.dep, s = Dt, n = Ge;
  Dt = t, Ge = !0;
  try {
    ff(t);
    let i = t.fn(t._value);
    (e.version === 0 || ne(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Dt = s, Ge = n, pf(t), t.flags &= -3;
  }
}
function yc(t, e = !1) {
  let { dep: s, prevSub: n, nextSub: i } = t;
  if (n && (n.nextSub = i, t.prevSub = void 0), i && (i.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep) yc(o, !0);
  }
  e || --s.sc || !s.map || s.map.delete(s.key);
}
function Xm(t, e) {
  t.effect instanceof eo && (t = t.effect.fn);
  let s = new eo(t);
  e && gt(s, e);
  try {
    s.run();
  } catch (i) {
    throw s.stop(), i;
  }
  let n = s.run.bind(s);
  return n.effect = s, n;
}
function Zm(t) {
  t.effect.stop();
}
let Ge = !0, mf = [];
function As() {
  mf.push(Ge), Ge = !1;
}
function Ps() {
  let t = mf.pop();
  Ge = t === void 0 || t;
}
function bh(t) {
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
let so = 0;
class Qm {
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
    if (s === void 0 || s.sub !== Dt) s = this.activeLink = new Qm(Dt, this), Dt.deps ? (s.prevDep = Dt.depsTail, Dt.depsTail.nextDep = s, Dt.depsTail = s) : Dt.deps = Dt.depsTail = s, function n(i) {
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
    this.version++, so++, this.notify(e);
  }
  notify(e) {
    gr++;
    try {
      for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
    } finally {
      mc();
    }
  }
}
let Da = /* @__PURE__ */ new WeakMap(), bn = Symbol(""), vl = Symbol(""), no = Symbol("");
function ue(t, e, s) {
  if (Ge && Dt) {
    let n = Da.get(t);
    n || Da.set(t, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new mr()), i.map = n, i.key = s), i.track();
  }
}
function ms(t, e, s, n, i, o) {
  let a = Da.get(t);
  if (!a) return void so++;
  let r = (l) => {
    l && l.trigger();
  };
  if (gr++, e === "clear") a.forEach(r);
  else {
    let l = nt(t), c = l && hr(s);
    if (l && s === "length") {
      let h = Number(n);
      a.forEach((u, d) => {
        (d === "length" || d === no || !ge(d) && d >= h) && r(u);
      });
    } else switch ((s !== void 0 || a.has(void 0)) && r(a.get(s)), c && r(a.get(no)), e) {
      case "add":
        if (l) c && r(a.get("length"));
        else {
          let u;
          r(a.get(bn)), u = t, jt.call(u) === "[object Map]" && r(a.get(vl));
        }
        break;
      case "delete":
        if (!l) {
          let u;
          r(a.get(bn)), u = t, jt.call(u) === "[object Map]" && r(a.get(vl));
        }
        break;
      case "set":
        let h;
        h = t, jt.call(h) === "[object Map]" && r(a.get(bn));
    }
  }
  mc();
}
function $n(t) {
  let e = xt(t);
  return e === t ? e : (ue(e, "iterate", no), Te(t) ? e : e.map(Ue));
}
function yr(t) {
  return ue(t = xt(t), "iterate", no), t;
}
function ss(t, e) {
  return os(t) ? ws(t) ? ei(Ue(e)) : ei(e) : Ue(e);
}
let ty = { __proto__: null, [Symbol.iterator]() {
  return $r(this, Symbol.iterator, (t) => ss(this, t));
}, concat(...t) {
  return $n(this).concat(...t.map((e) => nt(e) ? $n(e) : e));
}, entries() {
  return $r(this, "entries", (t) => (t[1] = ss(this, t[1]), t));
}, every(t, e) {
  return rs(this, "every", t, e, void 0, arguments);
}, filter(t, e) {
  return rs(this, "filter", t, e, (s) => s.map((n) => ss(this, n)), arguments);
}, find(t, e) {
  return rs(this, "find", t, e, (s) => ss(this, s), arguments);
}, findIndex(t, e) {
  return rs(this, "findIndex", t, e, void 0, arguments);
}, findLast(t, e) {
  return rs(this, "findLast", t, e, (s) => ss(this, s), arguments);
}, findLastIndex(t, e) {
  return rs(this, "findLastIndex", t, e, void 0, arguments);
}, forEach(t, e) {
  return rs(this, "forEach", t, e, void 0, arguments);
}, includes(...t) {
  return jr(this, "includes", t);
}, indexOf(...t) {
  return jr(this, "indexOf", t);
}, join(t) {
  return $n(this).join(t);
}, lastIndexOf(...t) {
  return jr(this, "lastIndexOf", t);
}, map(t, e) {
  return rs(this, "map", t, e, void 0, arguments);
}, pop() {
  return _i(this, "pop");
}, push(...t) {
  return _i(this, "push", t);
}, reduce(t, ...e) {
  return _h(this, "reduce", t, e);
}, reduceRight(t, ...e) {
  return _h(this, "reduceRight", t, e);
}, shift() {
  return _i(this, "shift");
}, some(t, e) {
  return rs(this, "some", t, e, void 0, arguments);
}, splice(...t) {
  return _i(this, "splice", t);
}, toReversed() {
  return $n(this).toReversed();
}, toSorted(t) {
  return $n(this).toSorted(t);
}, toSpliced(...t) {
  return $n(this).toSpliced(...t);
}, unshift(...t) {
  return _i(this, "unshift", t);
}, values() {
  return $r(this, "values", (t) => ss(this, t));
} };
function $r(t, e, s) {
  let n = yr(t), i = n[e]();
  return n === t || Te(t) || (i._next = i.next, i.next = () => {
    let o = i._next();
    return o.done || (o.value = s(o.value)), o;
  }), i;
}
let ey = Array.prototype;
function rs(t, e, s, n, i, o) {
  let a = yr(t), r = a !== t && !Te(t), l = a[e];
  if (l !== ey[e]) {
    let u = l.apply(t, o);
    return r ? Ue(u) : u;
  }
  let c = s;
  a !== t && (r ? c = function(u, d) {
    return s.call(this, ss(t, u), d, t);
  } : s.length > 2 && (c = function(u, d) {
    return s.call(this, u, d, t);
  }));
  let h = l.call(a, c, n);
  return r && i ? i(h) : h;
}
function _h(t, e, s, n) {
  let i = yr(t), o = i !== t && !Te(t), a = s, r = !1;
  i !== t && (o ? (r = n.length === 0, a = function(c, h, u) {
    return r && (r = !1, c = ss(t, c)), s.call(this, c, ss(t, h), u, t);
  }) : s.length > 3 && (a = function(c, h, u) {
    return s.call(this, c, h, u, t);
  }));
  let l = i[e](a, ...n);
  return r ? ss(t, l) : l;
}
function jr(t, e, s) {
  let n = xt(t);
  ue(n, "iterate", no);
  let i = n[e](...s);
  return (i === -1 || i === !1) && ko(s[0]) ? (s[0] = xt(s[0]), n[e](...s)) : i;
}
function _i(t, e, s = []) {
  As(), gr++;
  let n = xt(t)[e].apply(t, s);
  return mc(), Ps(), n;
}
let sy = Ee("__proto__,__v_isRef,__isVue"), yf = new Set(Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ge));
function ny(t) {
  ge(t) || (t = String(t));
  let e = xt(this);
  return ue(e, "has", t), e.hasOwnProperty(t);
}
class bf {
  constructor(e = !1, s = !1) {
    this._isReadonly = e, this._isShallow = s;
  }
  get(e, s, n) {
    if (s === "__v_skip") return e.__v_skip;
    let i = this._isReadonly, o = this._isShallow;
    if (s === "__v_isReactive") return !i;
    if (s === "__v_isReadonly") return i;
    if (s === "__v_isShallow") return o;
    if (s === "__v_raw") return n === (i ? o ? Cf : wf : o ? Sf : vf).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    let a = nt(e);
    if (!i) {
      let l;
      if (a && (l = ty[s])) return l;
      if (s === "hasOwnProperty") return ny;
    }
    let r = Reflect.get(e, s, Kt(e) ? e : n);
    if ((ge(s) ? yf.has(s) : sy(s)) || (i || ue(e, "get", s), o)) return r;
    if (Kt(r)) {
      let l = a && hr(s) ? r : r.value;
      return i && St(l) ? Ra(l) : l;
    }
    return St(r) ? i ? Ra(r) : _r(r) : r;
  }
}
class _f extends bf {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, i) {
    let o = e[s], a = nt(e) && hr(s);
    if (!this._isShallow) {
      let c = os(o);
      if (Te(n) || os(n) || (o = xt(o), n = xt(n)), !a && Kt(o) && !Kt(n)) return c || (o.value = n), !0;
    }
    let r = a ? Number(s) < e.length : wt(e, s), l = Reflect.set(e, s, n, Kt(e) ? e : i);
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
    return ge(s) && yf.has(s) || ue(e, "has", s), n;
  }
  ownKeys(e) {
    return ue(e, "iterate", nt(e) ? "length" : bn), Reflect.ownKeys(e);
  }
}
class xf extends bf {
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
let iy = new _f(), oy = new xf(), ay = new _f(!0), ry = new xf(!0), Wr = (t) => t;
function No(t) {
  return function() {
    return t !== "delete" && (t === "clear" ? void 0 : this);
  };
}
function br(t, e) {
  let s, n = (gt(s = { get(i) {
    let o = this.__v_raw, a = xt(o), r = xt(i);
    t || (ne(i, r) && ue(a, "get", i), ue(a, "get", r));
    let { has: l } = Reflect.getPrototypeOf(a), c = e ? Wr : t ? ei : Ue;
    return l.call(a, i) ? c(o.get(i)) : l.call(a, r) ? c(o.get(r)) : void (o !== a && o.get(i));
  }, get size() {
    let i = this.__v_raw;
    return t || ue(xt(i), "iterate", bn), i.size;
  }, has(i) {
    let o = this.__v_raw, a = xt(o), r = xt(i);
    return t || (ne(i, r) && ue(a, "has", i), ue(a, "has", r)), i === r ? o.has(i) : o.has(i) || o.has(r);
  }, forEach(i, o) {
    let a = this, r = a.__v_raw, l = xt(r), c = e ? Wr : t ? ei : Ue;
    return t || ue(l, "iterate", bn), r.forEach((h, u) => i.call(o, c(h), c(u), a));
  } }, t ? { add: No("add"), set: No("set"), delete: No("delete"), clear: No("clear") } : { add(i) {
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
      let a, r = this.__v_raw, l = xt(r), c = (a = l, jt.call(a) === "[object Map]"), h = i === "entries" || i === Symbol.iterator && c, u = r[i](...o), d = e ? Wr : t ? ei : Ue;
      return t || ue(l, "iterate", i === "keys" && c ? vl : bn), gt(Object.create(u), { next() {
        let { value: f, done: p } = u.next();
        return p ? { value: f, done: p } : { value: h ? [d(f[0]), d(f[1])] : d(f), done: p };
      } });
    };
  }), s);
  return (i, o, a) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? i : Reflect.get(wt(n, o) && o in i ? n : i, o, a);
}
let ly = { get: br(!1, !1) }, cy = { get: br(!1, !0) }, hy = { get: br(!0, !1) }, uy = { get: br(!0, !0) }, vf = /* @__PURE__ */ new WeakMap(), Sf = /* @__PURE__ */ new WeakMap(), wf = /* @__PURE__ */ new WeakMap(), Cf = /* @__PURE__ */ new WeakMap();
function _r(t) {
  return os(t) ? t : xr(t, !1, iy, ly, vf);
}
function kf(t) {
  return xr(t, !1, ay, cy, Sf);
}
function Ra(t) {
  return xr(t, !0, oy, hy, wf);
}
function dy(t) {
  return xr(t, !0, ry, uy, Cf);
}
function xr(t, e, s, n, i) {
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
  }((a = o, jt.call(a)).slice(8, -1));
  if (r === 0) return t;
  let l = i.get(t);
  if (l) return l;
  let c = new Proxy(t, r === 2 ? n : s);
  return i.set(t, c), c;
}
function ws(t) {
  return os(t) ? ws(t.__v_raw) : !!(t && t.__v_isReactive);
}
function os(t) {
  return !!(t && t.__v_isReadonly);
}
function Te(t) {
  return !!(t && t.__v_isShallow);
}
function ko(t) {
  return !!t && !!t.__v_raw;
}
function xt(t) {
  let e = t && t.__v_raw;
  return e ? xt(e) : t;
}
function Mf(t) {
  return !wt(t, "__v_skip") && Object.isExtensible(t) && af(t, "__v_skip", !0), t;
}
let Ue = (t) => St(t) ? _r(t) : t, ei = (t) => St(t) ? Ra(t) : t;
function Kt(t) {
  return !!t && t.__v_isRef === !0;
}
function Vi(t) {
  return Pf(t, !1);
}
function Af(t) {
  return Pf(t, !0);
}
function Pf(t, e) {
  return Kt(t) ? t : new fy(t, e);
}
class fy {
  constructor(e, s) {
    this.dep = new mr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : xt(e), this._value = s ? e : Ue(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    let s = this._rawValue, n = this.__v_isShallow || Te(e) || os(e);
    ne(e = n ? e : xt(e), s) && (this._rawValue = e, this._value = n ? e : Ue(e), this.dep.trigger());
  }
}
function py(t) {
  t.dep && t.dep.trigger();
}
function Mo(t) {
  return Kt(t) ? t.value : t;
}
function gy(t) {
  return at(t) ? t() : Mo(t);
}
let my = { get: (t, e, s) => e === "__v_raw" ? t : Mo(Reflect.get(t, e, s)), set: (t, e, s, n) => {
  let i = t[e];
  return Kt(i) && !Kt(s) ? (i.value = s, !0) : Reflect.set(t, e, s, n);
} };
function bc(t) {
  return ws(t) ? t : new Proxy(t, my);
}
class yy {
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
function Tf(t) {
  return new yy(t);
}
function by(t) {
  let e = nt(t) ? Array(t.length) : {};
  for (let s in t) e[s] = new Df(t, s, void 0);
  return e;
}
class Df {
  constructor(e, s, n) {
    this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = ge(s) ? s : String(s), this._raw = xt(e);
    let i = !0, o = e;
    if (!nt(e) || ge(this._key) || !hr(this._key)) do
      i = !ko(o) || Te(o);
    while (i && (o = o.__v_raw));
    this._shallow = i;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = Mo(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && Kt(this._raw[this._key])) {
      let s = this._object[this._key];
      if (Kt(s)) {
        s.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    var e, s;
    let n;
    return e = this._raw, s = this._key, (n = Da.get(e)) && n.get(s);
  }
}
class _y {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function xy(t, e, s) {
  return Kt(t) ? t : at(t) ? new _y(t) : !St(t) || !(arguments.length > 1) ? Vi(t) : new Df(t, e, s);
}
class vy {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new mr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = so - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && Dt !== this) return df(this, !0), !0;
  }
  get value() {
    let e = this.dep.track();
    return gf(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
let Sy = { GET: "get", HAS: "has", ITERATE: "iterate" }, wy = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" }, Bo = {}, La = /* @__PURE__ */ new WeakMap();
function Cy() {
  return $s;
}
function Rf(t, e = !1, s = $s) {
  if (s) {
    let n = La.get(s);
    n || La.set(s, n = []), n.push(t);
  }
}
function ys(t, e = 1 / 0, s) {
  if (e <= 0 || !St(t) || t.__v_skip || ((s = s || /* @__PURE__ */ new Map()).get(t) || 0) >= e) return t;
  if (s.set(t, e), e--, Kt(t)) ys(t.value, e, s);
  else if (nt(t)) for (let n = 0; n < t.length; n++) ys(t[n], e, s);
  else {
    let n, i;
    if (n = t, jt.call(n) === "[object Set]" || (i = t, jt.call(i) === "[object Map]")) t.forEach((o) => {
      ys(o, e, s);
    });
    else {
      let o;
      if (o = t, jt.call(o) === "[object Object]") {
        for (let a in t) ys(t[a], e, s);
        for (let a of Object.getOwnPropertySymbols(t)) Object.prototype.propertyIsEnumerable.call(t, a) && ys(t[a], e, s);
      }
    }
  }
  return t;
}
function ky(t, e) {
}
let My = { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" };
function mi(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (i) {
    En(i, e, s);
  }
}
function Ve(t, e, s, n) {
  if (at(t)) {
    let i = mi(t, e, s, n);
    return i && pc(i) && i.catch((o) => {
      En(o, e, s);
    }), i;
  }
  if (nt(t)) {
    let i = [];
    for (let o = 0; o < t.length; o++) i.push(Ve(t[o], e, s, n));
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
      As(), mi(i, null, 10, [t, r, l]), Ps();
      return;
    }
  }
  (function(a, r = !0, l = !1) {
    if (l) throw a;
    console.error(a);
  })(t, n, o);
}
let xe = [], Ze = -1, si = [], js = null, Gn = 0, Lf = Promise.resolve(), ga = null;
function ai(t) {
  let e = ga || Lf;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function _c(t) {
  if (!(1 & t.flags)) {
    let e = Hi(t), s = xe[xe.length - 1];
    !s || !(2 & t.flags) && e >= Hi(s) ? xe.push(t) : xe.splice(function(n) {
      let i = Ze + 1, o = xe.length;
      for (; i < o; ) {
        let a = i + o >>> 1, r = xe[a], l = Hi(r);
        l < n || l === n && 2 & r.flags ? i = a + 1 : o = a;
      }
      return i;
    }(e), 0, t), t.flags |= 1, Of();
  }
}
function Of() {
  ga || (ga = Lf.then(function t(e) {
    try {
      for (Ze = 0; Ze < xe.length; Ze++) {
        let s = xe[Ze];
        s && !(8 & s.flags) && (4 & s.flags && (s.flags &= -2), mi(s, s.i, s.i ? 15 : 14), 4 & s.flags || (s.flags &= -2));
      }
    } finally {
      for (; Ze < xe.length; Ze++) {
        let s = xe[Ze];
        s && (s.flags &= -2);
      }
      Ze = -1, xe.length = 0, Oa(), ga = null, (xe.length || si.length) && t();
    }
  }));
}
function io(t) {
  nt(t) ? si.push(...t) : js && t.id === -1 ? js.splice(Gn + 1, 0, t) : 1 & t.flags || (si.push(t), t.flags |= 1), Of();
}
function xh(t, e, s = Ze + 1) {
  for (; s < xe.length; s++) {
    let n = xe[s];
    if (n && 2 & n.flags) {
      if (t && n.id !== t.uid) continue;
      xe.splice(s, 1), s--, 4 & n.flags && (n.flags &= -2), n(), 4 & n.flags || (n.flags &= -2);
    }
  }
}
function Oa(t) {
  if (si.length) {
    let e = [...new Set(si)].sort((s, n) => Hi(s) - Hi(n));
    if (si.length = 0, js) return void js.push(...e);
    for (Gn = 0, js = e; Gn < js.length; Gn++) {
      let s = js[Gn];
      4 & s.flags && (s.flags &= -2), 8 & s.flags || s(), s.flags &= -2;
    }
    js = null, Gn = 0;
  }
}
let Hi = (t) => t.id == null ? 2 & t.flags ? -1 : 1 / 0 : t.id, ae = null, vr = null;
function oo(t) {
  let e = ae;
  return ae = t, vr = t && t.type.__scopeId || null, e;
}
function Ay(t) {
  vr = t;
}
function Py() {
  vr = null;
}
let Ty = (t) => xc;
function xc(t, e = ae, s) {
  if (!e || t._n) return t;
  let n = (...i) => {
    let o;
    n._d && lo(-1);
    let a = oo(e);
    try {
      o = t(...i);
    } finally {
      oo(a), n._d && lo(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Dy(t, e) {
  if (ae === null) return t;
  let s = Do(ae), n = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [o, a, r, l = yt] = e[i];
    o && (at(o) && (o = { mounted: o, updated: o }), o.deep && ys(a), n.push({ dir: o, instance: s, value: a, oldValue: void 0, arg: r, modifiers: l }));
  }
  return t;
}
function ts(t, e, s, n) {
  let i = t.dirs, o = e && e.dirs;
  for (let a = 0; a < i.length; a++) {
    let r = i[a];
    o && (r.oldValue = o[a].value);
    let l = r.dir[n];
    l && (As(), Ve(l, s, 8, [t.el, r, t, e]), Ps());
  }
}
function Ff(t, e) {
  if (oe) {
    let s = oe.provides, n = oe.parent && oe.parent.provides;
    n === s && (s = oe.provides = Object.create(n)), s[t] = e;
  }
}
function zi(t, e, s = !1) {
  let n = ve();
  if (n || _n) {
    let i = _n ? _n._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return s && at(e) ? e.call(n && n.proxy) : e;
  }
}
function Ry() {
  return !!(ve() || _n);
}
let Ef = Symbol.for("v-scx"), If = () => zi(Ef);
function Ly(t, e) {
  return Ao(t, null, e);
}
function Oy(t, e) {
  return Ao(t, null, { flush: "post" });
}
function Nf(t, e) {
  return Ao(t, null, { flush: "sync" });
}
function ni(t, e, s) {
  return Ao(t, e, s);
}
function Ao(t, e, s = yt) {
  let n, { immediate: i, flush: o } = s, a = gt({}, s), r = e && i || !e && o !== "post";
  if (Mn) {
    if (o === "sync") {
      let u = If();
      n = u.__watcherHandles || (u.__watcherHandles = []);
    } else if (!r) {
      let u = () => {
      };
      return u.stop = ie, u.resume = ie, u.pause = ie, u;
    }
  }
  let l = oe;
  a.call = (u, d, f) => Ve(u, l, d, f);
  let c = !1;
  o === "post" ? a.scheduler = (u) => {
    qt(u, l && l.suspense);
  } : o !== "sync" && (c = !0, a.scheduler = (u, d) => {
    d ? u() : _c(u);
  }), a.augmentJob = (u) => {
    e && (u.flags |= 4), c && (u.flags |= 2, l && (u.id = l.uid, u.i = l));
  };
  let h = function(u, d, f = yt) {
    let p, g, m, _, { immediate: y, deep: b, once: v, scheduler: w, augmentJob: S, call: x } = f, k = (D) => b ? D : Te(D) || b === !1 || b === 0 ? ys(D, 1) : ys(D), P = !1, F = !1;
    if (Kt(u) ? (g = () => u.value, P = Te(u)) : ws(u) ? (g = () => k(u), P = !0) : nt(u) ? (F = !0, P = u.some((D) => ws(D) || Te(D)), g = () => u.map((D) => Kt(D) ? D.value : ws(D) ? k(D) : at(D) ? x ? x(D, 2) : D() : void 0)) : g = at(u) ? d ? x ? () => x(u, 2) : u : () => {
      if (m) {
        As();
        try {
          m();
        } finally {
          Ps();
        }
      }
      let D = $s;
      $s = p;
      try {
        return x ? x(u, 3, [_]) : u(_);
      } finally {
        $s = D;
      }
    } : ie, d && b) {
      let D = g, M = b === !0 ? 1 / 0 : b;
      g = () => ys(D(), M);
    }
    let E = uf(), C = () => {
      p.stop(), E && E.active && fc(E.effects, p);
    };
    if (v && d) {
      let D = d;
      d = (...M) => {
        D(...M), C();
      };
    }
    let I = F ? Array(u.length).fill(Bo) : Bo, L = (D) => {
      if (1 & p.flags && (p.dirty || D)) if (d) {
        let M = p.run();
        if (b || P || (F ? M.some((T, O) => ne(T, I[O])) : ne(M, I))) {
          m && m();
          let T = $s;
          $s = p;
          try {
            let O = [M, I === Bo ? void 0 : F && I[0] === Bo ? [] : I, _];
            I = M, x ? x(d, 3, O) : d(...O);
          } finally {
            $s = T;
          }
        }
      } else p.run();
    };
    return S && S(L), (p = new eo(g)).scheduler = w ? () => w(L, !1) : L, _ = (D) => Rf(D, !1, p), m = p.onStop = () => {
      let D = La.get(p);
      if (D) {
        if (x) x(D, 4);
        else for (let M of D) M();
        La.delete(p);
      }
    }, d ? y ? L(!0) : I = p.run() : w ? w(L.bind(null, !0), !0) : p.run(), C.pause = p.pause.bind(p), C.resume = p.resume.bind(p), C.stop = C, C;
  }(t, e, a);
  return Mn && (n ? n.push(h) : r && h()), h;
}
function Fy(t, e, s) {
  let n, i = this.proxy, o = ct(t) ? t.includes(".") ? Bf(i, t) : () => i[t] : t.bind(i, i);
  at(e) ? n = e : (n = e.handler, s = e);
  let a = yi(this), r = Ao(o, n.bind(i), s);
  return a(), r;
}
function Bf(t, e) {
  let s = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < s.length && n; i++) n = n[s[i]];
    return n;
  };
}
let Ns = /* @__PURE__ */ new WeakMap(), $f = Symbol("_vte"), cn = (t) => t && (t.disabled || t.disabled === ""), vh = (t) => "u" > typeof SVGElement && t instanceof SVGElement, Sh = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement, Vr = (t, e) => {
  let s = t && t.to;
  return ct(s) ? e ? e(s) : null : s;
};
function $o(t, e, s, { o: { insert: n }, m: i }, o = 2) {
  o === 0 && n(t.targetAnchor, e, s);
  let { el: a, anchor: r, shapeFlag: l, children: c, props: h } = t, u = o === 2;
  if (u && n(a, e, s), !Ns.has(t) && (!u || cn(h)) && 16 & l) for (let d = 0; d < c.length; d++) i(c[d], e, s, 2);
  u && n(r, e, s);
}
let Ey = { name: "Teleport", __isTeleport: !0, process(t, e, s, n, i, o, a, r, l, c) {
  let { mc: h, pc: u, pbc: d, o: { insert: f, querySelector: p, createText: g, parentNode: m } } = c, _ = cn(e.props), { dynamicChildren: y } = e, b = (S, x, k) => {
    16 & S.shapeFlag && h(S.children, x, k, i, o, a, r, l);
  }, v = (S = e) => {
    let x = cn(S.props), k = S.target = Vr(S.props, p), P = Hr(k, S, g, f);
    k && (a !== "svg" && vh(k) ? a = "svg" : a !== "mathml" && Sh(k) && (a = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(k), x || (b(S, k, P), xi(S, !1)));
  }, w = (S) => {
    let x = () => {
      if (Ns.get(S) === x) {
        if (Ns.delete(S), cn(S.props)) {
          let k = m(S.el) || s;
          b(S, k, S.anchor), xi(S, !0);
        }
        v(S);
      }
    };
    Ns.set(S, x), qt(x, o);
  };
  if (t == null) {
    let S, x = e.el = g(""), k = e.anchor = g("");
    if (f(x, s, n), f(k, s, n), (S = e.props) && (S.defer || S.defer === "") || o && o.pendingBranch) return void w(e);
    _ && (b(e, s, k), xi(e, !0)), v();
  } else {
    e.el = t.el;
    let S = e.anchor = t.anchor, x = Ns.get(t);
    if (x) {
      x.flags |= 8, Ns.delete(t), w(e);
      return;
    }
    e.targetStart = t.targetStart;
    let k = e.target = t.target, P = e.targetAnchor = t.targetAnchor, F = cn(t.props), E = F ? s : k, C = F ? S : P;
    if (a === "svg" || vh(k) ? a = "svg" : (a === "mathml" || Sh(k)) && (a = "mathml"), y ? (d(t.dynamicChildren, y, E, i, o, a, r), Lc(t, e, !0)) : l || u(t, e, E, C, i, o, a, r, !1), _) F ? e.props && t.props && e.props.to !== t.props.to && (e.props.to = t.props.to) : $o(e, s, S, c, 1);
    else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
      let I = e.target = Vr(e.props, p);
      I && $o(e, I, null, c, 0);
    } else F && $o(e, k, P, c, 1);
    xi(e, _);
  }
}, remove(t, e, s, { um: n, o: { remove: i } }, o) {
  let { shapeFlag: a, children: r, anchor: l, targetStart: c, targetAnchor: h, target: u, props: d } = t, f = o || !cn(d), p = Ns.get(t);
  if (p && (p.flags |= 8, Ns.delete(t), f = !1), u && (i(c), i(h)), o && i(l), 16 & a) for (let g = 0; g < r.length; g++) {
    let m = r[g];
    n(m, e, s, f, !!m.dynamicChildren);
  }
}, move: $o, hydrate: function(t, e, s, n, i, o, { o: { nextSibling: a, parentNode: r, querySelector: l, insert: c, createText: h } }, u) {
  function d(m, _) {
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
  function f(m, _) {
    _.anchor = u(a(m), _, r(m), s, n, i, o);
  }
  let p = e.target = Vr(e.props, l), g = cn(e.props);
  if (p) {
    let m = p._lpa || p.firstChild;
    16 & e.shapeFlag && (g ? (f(t, e), d(p, m), e.targetAnchor || Hr(p, e, h, c, r(t) === p ? t : null)) : (e.anchor = a(t), d(p, m), e.targetAnchor || Hr(p, e, h, c), u(m && a(m), e, p, s, n, i, o))), xi(e, g);
  } else g && 16 & e.shapeFlag && (f(t, e), e.targetStart = t, e.targetAnchor = a(t));
  return e.anchor && a(e.anchor);
} };
function xi(t, e) {
  let s = t.ctx;
  if (s && s.ut) {
    let n, i;
    for (e ? (n = t.el, i = t.anchor) : (n = t.targetStart, i = t.targetAnchor); n && n !== i; ) n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function Hr(t, e, s, n, i = null) {
  let o = e.targetStart = s(""), a = e.targetAnchor = s("");
  return o[$f] = a, t && (n(o, t, i), n(a, t, i)), a;
}
let es = Symbol("_leaveCb"), vi = Symbol("_enterCb");
function vc() {
  let t = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: /* @__PURE__ */ new Map() };
  return To(() => {
    t.isMounted = !0;
  }), Cr(() => {
    t.isUnmounting = !0;
  }), t;
}
let Ne = [Function, Array], Sc = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Ne, onEnter: Ne, onAfterEnter: Ne, onEnterCancelled: Ne, onBeforeLeave: Ne, onLeave: Ne, onAfterLeave: Ne, onLeaveCancelled: Ne, onBeforeAppear: Ne, onAppear: Ne, onAfterAppear: Ne, onAppearCancelled: Ne }, jf = (t) => {
  let e = t.subTree;
  return e.component ? jf(e.component) : e;
};
function Wf(t) {
  let e = t[0];
  if (t.length > 1) {
    for (let s of t) if (s.type !== Gt) {
      e = s;
      break;
    }
  }
  return e;
}
let Vf = { name: "BaseTransition", props: Sc, setup(t, { slots: e }) {
  let s = ve(), n = vc();
  return () => {
    let i = e.default && Sr(e.default(), !0), o = i && i.length ? Wf(i) : s.subTree ? mp() : void 0;
    if (!o) return;
    let a = xt(t), { mode: r } = a;
    if (n.isLeaving) return zr(o);
    let l = wh(o);
    if (!l) return zr(o);
    let c = ri(l, a, n, s, (u) => c = u);
    l.type !== Gt && Ts(l, c);
    let h = s.subTree && wh(s.subTree);
    if (h && h.type !== Gt && !He(h, l) && jf(s).type !== Gt) {
      let u = ri(h, a, n, s);
      if (Ts(h, u), r === "out-in" && l.type !== Gt) return n.isLeaving = !0, u.afterLeave = () => {
        n.isLeaving = !1, 8 & s.job.flags || s.update(), delete u.afterLeave, h = void 0;
      }, zr(o);
      r === "in-out" && l.type !== Gt ? u.delayLeave = (d, f, p) => {
        Hf(n, h)[String(h.key)] = h, d[es] = () => {
          f(), d[es] = void 0, delete c.delayedLeave, h = void 0;
        }, c.delayedLeave = () => {
          p(), delete c.delayedLeave, h = void 0;
        };
      } : h = void 0;
    } else h && (h = void 0);
    return o;
  };
} };
function Hf(t, e) {
  let { leavingVNodes: s } = t, n = s.get(e.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(e.type, n)), n;
}
function ri(t, e, s, n, i) {
  let { appear: o, mode: a, persisted: r = !1, onBeforeEnter: l, onEnter: c, onAfterEnter: h, onEnterCancelled: u, onBeforeLeave: d, onLeave: f, onAfterLeave: p, onLeaveCancelled: g, onBeforeAppear: m, onAppear: _, onAfterAppear: y, onAppearCancelled: b } = e, v = String(t.key), w = Hf(s, t), S = (P, F) => {
    P && Ve(P, n, 9, F);
  }, x = (P, F) => {
    let E = F[1];
    S(P, F), nt(P) ? P.every((C) => C.length <= 1) && E() : P.length <= 1 && E();
  }, k = { mode: a, persisted: r, beforeEnter(P) {
    let F = l;
    if (!s.isMounted) if (o) F = m || l;
    else return;
    P[es] && P[es](!0);
    let E = w[v];
    E && He(t, E) && E.el[es] && E.el[es](), S(F, [P]);
  }, enter(P) {
    if (w[v] === t) return;
    let F = c, E = h, C = u;
    if (!s.isMounted) if (o) F = _ || c, E = y || h, C = b || u;
    else return;
    let I = !1;
    P[vi] = (D) => {
      I || (I = !0, D ? S(C, [P]) : S(E, [P]), k.delayedLeave && k.delayedLeave(), P[vi] = void 0);
    };
    let L = P[vi].bind(null, !1);
    F ? x(F, [P, L]) : L();
  }, leave(P, F) {
    let E = String(t.key);
    if (P[vi] && P[vi](!0), s.isUnmounting) return F();
    S(d, [P]);
    let C = !1;
    P[es] = (L) => {
      C || (C = !0, F(), L ? S(g, [P]) : S(p, [P]), P[es] = void 0, w[E] === t && delete w[E]);
    };
    let I = P[es].bind(null, !1);
    w[E] = t, f ? x(f, [P, I]) : I();
  }, clone(P) {
    let F = ri(P, e, s, n, i);
    return i && i(F), F;
  } };
  return k;
}
function zr(t) {
  if (Po(t)) return (t = as(t)).children = null, t;
}
function wh(t) {
  if (!Po(t)) return t.type.__isTeleport && t.children ? Wf(t.children) : t;
  if (t.component) return t.component.subTree;
  let { shapeFlag: e, children: s } = t;
  if (s) {
    if (16 & e) return s[0];
    if (32 & e && at(s.default)) return s.default();
  }
}
function Ts(t, e) {
  6 & t.shapeFlag && t.component ? (t.transition = e, Ts(t.component.subTree, e)) : 128 & t.shapeFlag ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function Sr(t, e = !1, s) {
  let n = [], i = 0;
  for (let o = 0; o < t.length; o++) {
    let a = t[o], r = s == null ? a.key : String(s) + String(a.key != null ? a.key : o);
    a.type === ee ? (128 & a.patchFlag && i++, n = n.concat(Sr(a.children, e, r))) : (e || a.type !== Gt) && n.push(r != null ? as(a, { key: r }) : a);
  }
  if (i > 1) for (let o = 0; o < n.length; o++) n[o].patchFlag = -2;
  return n;
}
function wc(t, e) {
  return at(t) ? gt({ name: t.name }, e, { setup: t }) : t;
}
function Iy() {
  let t = ve();
  return t ? (t.appContext.config.idPrefix || "v") + "-" + t.ids[0] + t.ids[1]++ : "";
}
function Cc(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Ny(t) {
  let e = ve(), s = Af(null);
  return e && Object.defineProperty(e.refs === yt ? e.refs = {} : e.refs, t, { enumerable: !0, get: () => s.value, set: (n) => s.value = n }), s;
}
function Ch(t, e) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(t, e)) && !s.configurable);
}
let Fa = /* @__PURE__ */ new WeakMap();
function ii(t, e, s, n, i = !1) {
  if (nt(t)) return void t.forEach((g, m) => ii(g, e && (nt(e) ? e[m] : e), s, n, i));
  if (Cs(n) && !i) {
    512 & n.shapeFlag && n.type.__asyncResolved && n.component.subTree.component && ii(t, e, s, n.component.subTree);
    return;
  }
  let o = 4 & n.shapeFlag ? Do(n.component) : n.el, a = i ? null : o, { i: r, r: l } = t, c = e && e.r, h = r.refs === yt ? r.refs = {} : r.refs, u = r.setupState, d = xt(u), f = u === yt ? Un : (g) => !Ch(h, g) && wt(d, g), p = (g, m) => !(m && Ch(h, m));
  if (c != null && c !== l && (kh(e), ct(c) ? (h[c] = null, f(c) && (u[c] = null)) : Kt(c) && (p(c, e.k) && (c.value = null), e.k && (h[e.k] = null))), at(l)) mi(l, r, 12, [a, h]);
  else {
    let g = ct(l), m = Kt(l);
    if (g || m) {
      let _ = () => {
        if (t.f) {
          let y = g ? f(l) ? u[l] : h[l] : p() || !t.k ? l.value : h[t.k];
          if (i) nt(y) && fc(y, o);
          else if (nt(y)) y.includes(o) || y.push(o);
          else if (g) h[l] = [o], f(l) && (u[l] = h[l]);
          else {
            let b = [o];
            p(l, t.k) && (l.value = b), t.k && (h[t.k] = b);
          }
        } else g ? (h[l] = a, f(l) && (u[l] = a)) : m && (p(l, t.k) && (l.value = a), t.k && (h[t.k] = a));
      };
      if (a) {
        let y = () => {
          _(), Fa.delete(t);
        };
        y.id = -1, Fa.set(t, y), qt(y, s);
      } else kh(t), _();
    }
  }
}
function kh(t) {
  let e = Fa.get(t);
  e && (e.flags |= 8, Fa.delete(t));
}
let Mh = !1, jn = () => {
  Mh || (console.error("Hydration completed but contains mismatches."), Mh = !0);
}, jo = (t) => {
  if (t.nodeType === 1) {
    if (t.namespaceURI.includes("svg") && t.tagName !== "foreignObject") return "svg";
    if (t.namespaceURI.includes("MathML")) return "mathml";
  }
}, qn = (t) => t.nodeType === 8;
function By(t) {
  let { mt: e, p: s, o: { patchProp: n, createText: i, nextSibling: o, parentNode: a, remove: r, insert: l, createComment: c } } = t, h = (y, b, v, w, S, x = !1) => {
    x = x || !!b.dynamicChildren;
    let k = qn(y) && y.data === "[", P = () => p(y, b, v, w, S, k), { type: F, ref: E, shapeFlag: C, patchFlag: I } = b, L = y.nodeType;
    b.el = y, I === -2 && (x = !1, b.dynamicChildren = null);
    let D = null;
    switch (F) {
      case Us:
        L !== 3 ? b.children === "" ? (l(b.el = i(""), a(y), y), D = y) : D = P() : (y.data !== b.children && (jn(), y.data = b.children), D = o(y));
        break;
      case Gt:
        _(y) ? (D = o(y), m(b.el = y.content.firstChild, y, v)) : D = L !== 8 || k ? P() : o(y);
        break;
      case xn:
        if (k && (L = (y = o(y)).nodeType), L === 1 || L === 3) {
          D = y;
          let M = !b.children.length;
          for (let T = 0; T < b.staticCount; T++) M && (b.children += D.nodeType === 1 ? D.outerHTML : D.data), T === b.staticCount - 1 && (b.anchor = D), D = o(D);
          return k ? o(D) : D;
        }
        P();
        break;
      case ee:
        D = k ? f(y, b, v, w, S, x) : P();
        break;
      default:
        if (1 & C) D = L === 1 && b.type.toLowerCase() === y.tagName.toLowerCase() || _(y) ? u(y, b, v, w, S, x) : P();
        else if (6 & C) {
          b.slotScopeIds = S;
          let M = a(y);
          if (D = k ? g(y) : qn(y) && y.data === "teleport start" ? g(y, y.data, "teleport end") : o(y), e(b, M, null, v, w, jo(M), x), Cs(b) && !b.type.__asyncResolved) {
            let T;
            k ? (T = Et(ee)).anchor = D ? D.previousSibling : M.lastChild : T = y.nodeType === 3 ? Fc("") : Et("div"), T.el = y, b.component.subTree = T;
          }
        } else 64 & C ? D = L !== 8 ? P() : b.type.hydrate(y, b, v, w, S, x, t, d) : 128 & C && (D = b.type.hydrate(y, b, v, w, jo(a(y)), S, x, t, h));
    }
    return E != null && ii(E, null, w, b), D;
  }, u = (y, b, v, w, S, x) => {
    x = x || !!b.dynamicChildren;
    let { type: k, props: P, patchFlag: F, shapeFlag: E, dirs: C, transition: I } = b, L = k === "input" || k === "option";
    if (L || F !== -1) {
      let D;
      C && ts(b, null, v, "created");
      let M = !1;
      if (_(y)) {
        M = hp(null, I) && v && v.vnode.props && v.vnode.props.appear;
        let T = y.content.firstChild;
        if (M) {
          let O = T.getAttribute("class");
          O && (T.$cls = O), I.beforeEnter(T);
        }
        m(T, y, v), b.el = y = T;
      }
      if (16 & E && !(P && (P.innerHTML || P.textContent))) {
        let T = d(y.firstChild, b, y, v, w, S, x);
        for (; T; ) {
          Wo(y, 1) || jn();
          let O = T;
          T = T.nextSibling, r(O);
        }
      } else if (8 & E) {
        let T = b.children;
        T[0] === `
` && (y.tagName === "PRE" || y.tagName === "TEXTAREA") && (T = T.slice(1));
        let { textContent: O } = y;
        O !== T && O !== T.replace(/\r\n|\r/g, `
`) && (Wo(y, 0) || jn(), y.textContent = b.children);
      }
      if (P) {
        if (L || !x || 48 & F) {
          let T = y.tagName.includes("-");
          for (let O in P) (L && (O.endsWith("value") || O === "indeterminate") || On(O) && !Ss(O) || O[0] === "." || T && !Ss(O)) && n(y, O, null, P[O], void 0, v);
        } else if (P.onClick) n(y, "onClick", null, P.onClick, void 0, v);
        else if (4 & F && ws(P.style)) for (let T in P.style) P.style[T];
      }
      (D = P && P.onVnodeBeforeMount) && Ce(D, v, b), C && ts(b, null, v, "beforeMount"), ((D = P && P.onVnodeMounted) || C || M) && up(() => {
        D && Ce(D, v, b), M && I.enter(y), C && ts(b, null, v, "mounted");
      }, w);
    }
    return y.nextSibling;
  }, d = (y, b, v, w, S, x, k) => {
    k = k || !!b.dynamicChildren;
    let P = b.children, F = P.length;
    for (let E = 0; E < F; E++) {
      let C = k ? P[E] : P[E] = ke(P[E]), I = C.type === Us;
      y ? (I && !k && E + 1 < F && ke(P[E + 1]).type === Us && (l(i(y.data.slice(C.children.length)), v, o(y)), y.data = C.children), y = h(y, C, w, S, x, k)) : I && !C.children ? l(C.el = i(""), v) : (Wo(v, 1) || jn(), s(null, C, v, null, w, S, jo(v), x));
    }
    return y;
  }, f = (y, b, v, w, S, x) => {
    let { slotScopeIds: k } = b;
    k && (S = S ? S.concat(k) : k);
    let P = a(y), F = d(o(y), b, P, v, w, S, x);
    return F && qn(F) && F.data === "]" ? o(b.anchor = F) : (jn(), l(b.anchor = c("]"), P, F), F);
  }, p = (y, b, v, w, S, x) => {
    if (Wo(y.parentElement, 1) || jn(), b.el = null, x) {
      let F = g(y);
      for (; ; ) {
        let E = o(y);
        if (E && E !== F) r(E);
        else break;
      }
    }
    let k = o(y), P = a(y);
    return r(y), s(null, b, P, k, v, w, jo(P), S), v && (v.vnode.el = b.el, Mr(v, b.el)), k;
  }, g = (y, b = "[", v = "]") => {
    let w = 0;
    for (; y; ) if ((y = o(y)) && qn(y) && (y.data === b && w++, y.data === v)) {
      if (w === 0) return o(y);
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
      s(null, y, b), Oa(), b._vnode = y;
      return;
    }
    h(b.firstChild, y, null, null, null), Oa(), b._vnode = y;
  }, h];
}
let Ah = "data-allow-mismatch", $y = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
function Wo(t, e) {
  if (e === 0 || e === 1) for (; t && !t.hasAttribute(Ah); ) t = t.parentElement;
  let s = t && t.getAttribute(Ah);
  if (s == null) return !1;
  {
    if (s === "") return !0;
    let n = s.split(",");
    return !!(e === 0 && n.includes("children")) || n.includes($y[e]);
  }
}
let jy = fr().requestIdleCallback || ((t) => setTimeout(t, 1)), Wy = fr().cancelIdleCallback || ((t) => clearTimeout(t)), Vy = (t = 1e4) => (e) => {
  let s = jy(e, { timeout: t });
  return () => Wy(s);
}, Hy = (t) => (e, s) => {
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
}, zy = (t) => (e) => {
  if (t) {
    let s = matchMedia(t);
    if (!s.matches) return s.addEventListener("change", e, { once: !0 }), () => s.removeEventListener("change", e);
    e();
  }
}, Gy = (t = []) => (e, s) => {
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
}, Cs = (t) => !!t.type.__asyncLoader;
function Uy(t) {
  let e;
  at(t) && (t = { loader: t });
  let { loader: s, loadingComponent: n, errorComponent: i, delay: o = 200, hydrate: a, timeout: r, suspensible: l = !0, onError: c } = t, h = null, u = 0, d = () => {
    let f;
    return h || (f = h = s().catch((p) => {
      if (p = p instanceof Error ? p : Error(String(p)), c) return new Promise((g, m) => {
        c(p, () => g((u++, h = null, d())), () => m(p), u + 1);
      });
      throw p;
    }).then((p) => f !== h && h ? h : (p && (p.__esModule || p[Symbol.toStringTag] === "Module") && (p = p.default), e = p, p)));
  };
  return wc({ name: "AsyncComponentWrapper", __asyncLoader: d, __asyncHydrate(f, p, g) {
    let m = !1;
    (p.bu || (p.bu = [])).push(() => m = !0);
    let _ = () => {
      m || g();
    }, y = a ? () => {
      let b = a(_, (v) => function(w, S) {
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
      }(f, v));
      b && (p.bum || (p.bum = [])).push(b);
    } : _;
    e ? y() : d().then(() => !p.isUnmounted && y());
  }, get __asyncResolved() {
    return e;
  }, setup() {
    let f = oe;
    if (Cc(f), e) return () => Vo(e, f);
    let p = (y) => {
      h = null, En(y, f, 13, !i);
    };
    if (l && f.suspense || Mn) return d().then((y) => () => Vo(y, f)).catch((y) => (p(y), () => i ? Et(i, { error: y }) : null));
    let g = Vi(!1), m = Vi(), _ = Vi(!!o);
    return o && setTimeout(() => {
      _.value = !1;
    }, o), r != null && setTimeout(() => {
      if (!g.value && !m.value) {
        let y = Error(`Async component timed out after ${r}ms.`);
        p(y), m.value = y;
      }
    }, r), d().then(() => {
      g.value = !0, f.parent && Po(f.parent.vnode) && f.parent.update();
    }).catch((y) => {
      p(y), m.value = y;
    }), () => g.value && e ? Vo(e, f) : m.value && i ? Et(i, { error: m.value }) : n && !_.value ? Vo(n, f) : void 0;
  } });
}
function Vo(t, e) {
  let { ref: s, props: n, children: i, ce: o } = e.vnode, a = Et(t, n, i);
  return a.ref = s, a.ce = o, delete e.vnode.ce, a;
}
let Po = (t) => t.type.__isKeepAlive, qy = { name: "KeepAlive", __isKeepAlive: !0, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(t, { slots: e }) {
  let s = ve(), n = s.ctx;
  if (!n.renderer) return () => {
    let y = e.default && e.default();
    return y && y.length === 1 ? y[0] : y;
  };
  let i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), a = null, r = s.suspense, { renderer: { p: l, m: c, um: h, o: { createElement: u } } } = n, d = u("div");
  function f(y) {
    Gr(y), h(y, s, r, !0);
  }
  function p(y) {
    i.forEach((b, v) => {
      let w = Rl(Cs(b) ? b.type.__asyncResolved || {} : b.type);
      w && !y(w) && g(v);
    });
  }
  function g(y) {
    let b = i.get(y);
    !b || a && He(b, a) ? a && Gr(a) : f(b), i.delete(y), o.delete(y);
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
    Ba(b.m), Ba(b.a), c(y, d, null, 1, r), qt(() => {
      b.da && Qn(b.da);
      let v = y.props && y.props.onVnodeUnmounted;
      v && Ce(v, b.parent, y), b.isDeactivated = !0;
    }, r);
  }, ni(() => [t.include, t.exclude], ([y, b]) => {
    y && p((v) => Ri(y, v)), b && p((v) => !Ri(b, v));
  }, { flush: "post", deep: !0 });
  let m = null, _ = () => {
    m != null && ($a(s.subTree.type) ? qt(() => {
      i.set(m, Ho(s.subTree));
    }, s.subTree.suspense) : i.set(m, Ho(s.subTree)));
  };
  return To(_), wr(_), Cr(() => {
    i.forEach((y) => {
      let { subTree: b, suspense: v } = s, w = Ho(b);
      if (y.type === w.type && y.key === w.key) {
        Gr(w);
        let S = w.component.da;
        S && qt(S, v);
        return;
      }
      f(y);
    });
  }), () => {
    if (m = null, !e.default) return a = null;
    let y = e.default(), b = y[0];
    if (y.length > 1) return a = null, y;
    if (!Ds(b) || !(4 & b.shapeFlag) && !(128 & b.shapeFlag)) return a = null, b;
    let v = Ho(b);
    if (v.type === Gt) return a = null, v;
    let w = v.type, S = Rl(Cs(v) ? v.type.__asyncResolved || {} : w), { include: x, exclude: k, max: P } = t;
    if (x && (!S || !Ri(x, S)) || k && S && Ri(k, S)) return v.shapeFlag &= -257, a = v, b;
    let F = v.key == null ? w : v.key, E = i.get(F);
    return v.el && (v = as(v), 128 & b.shapeFlag && (b.ssContent = v)), m = F, E ? (v.el = E.el, v.component = E.component, v.transition && Ts(v, v.transition), v.shapeFlag |= 512, o.delete(F), o.add(F)) : (o.add(F), P && o.size > parseInt(P, 10) && g(o.values().next().value)), v.shapeFlag |= 256, a = v, $a(b.type) ? b : v;
  };
} };
function Ri(t, e) {
  let s;
  return nt(t) ? t.some((n) => Ri(n, e)) : ct(t) ? t.split(",").includes(e) : (s = t, jt.call(s) === "[object RegExp]" && (t.lastIndex = 0, t.test(e)));
}
function zf(t, e) {
  Uf(t, "a", e);
}
function Gf(t, e) {
  Uf(t, "da", e);
}
function Uf(t, e, s = oe) {
  let n = t.__wdc || (t.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return t();
  });
  if (Ea(e, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; ) Po(i.parent.vnode) && function(o, a, r, l) {
      let c = Ea(a, o, l, !0);
      kr(() => {
        fc(l[a], c);
      }, r);
    }(n, e, s, i), i = i.parent;
  }
}
function Gr(t) {
  t.shapeFlag &= -257, t.shapeFlag &= -513;
}
function Ho(t) {
  return 128 & t.shapeFlag ? t.ssContent : t;
}
function Ea(t, e, s = oe, n = !1) {
  if (s) {
    let i = s[t] || (s[t] = []), o = e.__weh || (e.__weh = (...a) => {
      As();
      let r = yi(s), l = Ve(e, s, t, a);
      return r(), Ps(), l;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
let Rs = (t) => (e, s = oe) => {
  Mn && t !== "sp" || Ea(t, (...n) => e(...n), s);
}, qf = Rs("bm"), To = Rs("m"), kc = Rs("bu"), wr = Rs("u"), Cr = Rs("bum"), kr = Rs("um"), Yf = Rs("sp"), Kf = Rs("rtg"), Jf = Rs("rtc");
function Xf(t, e = oe) {
  Ea("ec", t, e);
}
let Mc = "components";
function Yy(t, e) {
  return Ac(Mc, t, !0, e) || t;
}
let Zf = Symbol.for("v-ndc");
function Ky(t) {
  return ct(t) ? Ac(Mc, t, !1) || t : t || Zf;
}
function Jy(t) {
  return Ac("directives", t);
}
function Ac(t, e, s = !0, n = !1) {
  let i = ae || oe;
  if (i) {
    let o = i.type;
    if (t === Mc) {
      let r = Rl(o, !1);
      if (r && (r === e || r === Tt(e) || r === Fn(Tt(e)))) return o;
    }
    let a = Ph(i[t] || o[t], e) || Ph(i.appContext[t], e);
    return !a && n ? o : a;
  }
}
function Ph(t, e) {
  return t && (t[e] || t[Tt(e)] || t[Fn(Tt(e))]);
}
function Xy(t, e, s, n) {
  let i, o = s && s[n], a = nt(t);
  if (a || ct(t)) {
    let r = a && ws(t), l = !1, c = !1;
    r && (l = !Te(t), c = os(t), t = yr(t)), i = Array(t.length);
    for (let h = 0, u = t.length; h < u; h++) i[h] = e(l ? c ? ei(Ue(t[h])) : Ue(t[h]) : t[h], h, void 0, o && o[h]);
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
function Zy(t, e) {
  for (let s = 0; s < e.length; s++) {
    let n = e[s];
    if (nt(n)) for (let i = 0; i < n.length; i++) t[n[i].name] = n[i].fn;
    else n && (t[n.name] = n.key ? (...i) => {
      let o = n.fn(...i);
      return o && (o.key = n.key), o;
    } : n.fn);
  }
  return t;
}
function Qy(t, e, s = {}, n, i) {
  if (ae.ce || ae.parent && Cs(ae.parent) && ae.parent.ce) {
    let c = Object.keys(s).length > 0;
    return e !== "default" && (s.name = e), ro(), ja(ee, null, [Et("slot", s, n && n())], c ? -2 : 64);
  }
  let o = t[e];
  o && o._c && (o._d = !1), ro();
  let a = o && Pc(o(s)), r = s.key || a && a.key, l = ja(ee, { key: (r && !ge(r) ? r : `_${e}`) + (!a && n ? "_fb" : "") }, a || (n ? n() : []), a && t._ === 1 ? 64 : -2);
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function Pc(t) {
  return t.some((e) => !Ds(e) || e.type !== Gt && (e.type !== ee || !!Pc(e.children))) ? t : null;
}
function tb(t, e) {
  let s = {};
  for (let n in t) s[e && /[A-Z]/.test(n) ? `on:${n}` : Zn(n)] = t[n];
  return s;
}
let Sl = (t) => t ? _p(t) ? Do(t) : Sl(t.parent) : null, Gi = gt(/* @__PURE__ */ Object.create(null), { $: (t) => t, $el: (t) => t.vnode.el, $data: (t) => t.data, $props: (t) => t.props, $attrs: (t) => t.attrs, $slots: (t) => t.slots, $refs: (t) => t.refs, $parent: (t) => Sl(t.parent), $root: (t) => Sl(t.root), $host: (t) => t.ce, $emit: (t) => t.emit, $options: (t) => kl(t), $forceUpdate: (t) => t.f || (t.f = () => {
  _c(t.update);
}), $nextTick: (t) => t.n || (t.n = ai.bind(t.proxy)), $watch: (t) => Fy.bind(t) }), Ur = (t, e) => t !== yt && !t.__isScriptSetup && wt(t, e), wl = { get({ _: t }, e) {
  let s, n;
  if (e === "__v_skip") return !0;
  let { ctx: i, setupState: o, data: a, props: r, accessCache: l, type: c, appContext: h } = t;
  if (e[0] !== "$") {
    let d = l[e];
    if (d !== void 0) switch (d) {
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
      if (Ur(o, e)) return l[e] = 1, o[e];
      if (a !== yt && wt(a, e)) return l[e] = 2, a[e];
      if (wt(r, e)) return l[e] = 3, r[e];
      if (i !== yt && wt(i, e)) return l[e] = 4, i[e];
      Cl && (l[e] = 0);
    }
  }
  let u = Gi[e];
  return u ? (e === "$attrs" && ue(t.attrs, "get", ""), u(t)) : (s = c.__cssModules) && (s = s[e]) ? s : i !== yt && wt(i, e) ? (l[e] = 4, i[e]) : wt(n = h.config.globalProperties, e) ? n[e] : void 0;
}, set({ _: t }, e, s) {
  let { data: n, setupState: i, ctx: o } = t;
  return Ur(i, e) ? (i[e] = s, !0) : n !== yt && wt(n, e) ? (n[e] = s, !0) : !wt(t.props, e) && !(e[0] === "$" && e.slice(1) in t) && (o[e] = s, !0);
}, has({ _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: i, props: o, type: a } }, r) {
  let l;
  return !!(s[r] || t !== yt && r[0] !== "$" && wt(t, r) || Ur(e, r) || wt(o, r) || wt(n, r) || wt(Gi, r) || wt(i.config.globalProperties, r) || (l = a.__cssModules) && l[r]);
}, defineProperty(t, e, s) {
  return s.get != null ? t._.accessCache[e] = 0 : wt(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
} }, eb = gt({}, wl, { get(t, e) {
  if (e !== Symbol.unscopables) return wl.get(t, e, t);
}, has: (t, e) => e[0] !== "_" && !$m(e) });
function sb() {
  return null;
}
function nb() {
  return null;
}
function ib(t) {
}
function ob(t) {
}
function ab() {
  return null;
}
function rb() {
}
function lb(t, e) {
  return null;
}
function cb() {
  return Qf().slots;
}
function hb() {
  return Qf().attrs;
}
function Qf(t) {
  let e = ve();
  return e.setupContext || (e.setupContext = wp(e));
}
function ao(t) {
  return nt(t) ? t.reduce((e, s) => (e[s] = null, e), {}) : t;
}
function ub(t, e) {
  let s = ao(t);
  for (let n in e) {
    if (n.startsWith("__skip")) continue;
    let i = s[n];
    i ? nt(i) || at(i) ? i = s[n] = { type: i, default: e[n] } : i.default = e[n] : i === null && (i = s[n] = { default: e[n] }), i && e[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return s;
}
function db(t, e) {
  return t && e ? nt(t) && nt(e) ? t.concat(e) : gt({}, ao(t), ao(e)) : t || e;
}
function fb(t, e) {
  let s = {};
  for (let n in t) e.includes(n) || Object.defineProperty(s, n, { enumerable: !0, get: () => t[n] });
  return s;
}
function pb(t) {
  let e = ve(), s = Mn, n = t();
  co(), s && Jn(!1);
  let i = () => {
    yi(e), s && Jn(!0);
  }, o = () => {
    ve() !== e && e.scope.off(), co(), s && Jn(!1);
  };
  return pc(n) && (n = n.catch((a) => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(o)), a;
  })), [n, () => {
    i(), Promise.resolve().then(o);
  }];
}
let Cl = !0;
function Th(t, e, s) {
  Ve(nt(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, s);
}
function kl(t) {
  let e, s = t.type, { mixins: n, extends: i } = s, { mixins: o, optionsCache: a, config: { optionMergeStrategies: r } } = t.appContext, l = a.get(s);
  return l ? e = l : o.length || n || i ? (e = {}, o.length && o.forEach((c) => Ia(e, c, r, !0)), Ia(e, s, r)) : e = s, St(s) && a.set(s, e), e;
}
function Ia(t, e, s, n = !1) {
  let { mixins: i, extends: o } = e;
  for (let a in o && Ia(t, o, s, !0), i && i.forEach((r) => Ia(t, r, s, !0)), e) if (!(n && a === "expose")) {
    let r = gb[a] || s && s[a];
    t[a] = r ? r(t[a], e[a]) : e[a];
  }
  return t;
}
let gb = { data: Dh, props: Rh, emits: Rh, methods: Si, computed: Si, beforeCreate: be, created: be, beforeMount: be, mounted: be, beforeUpdate: be, updated: be, beforeDestroy: be, beforeUnmount: be, destroyed: be, unmounted: be, activated: be, deactivated: be, errorCaptured: be, serverPrefetch: be, components: Si, directives: Si, watch: function(t, e) {
  if (!t) return e;
  if (!e) return t;
  let s = gt(/* @__PURE__ */ Object.create(null), t);
  for (let n in e) s[n] = be(t[n], e[n]);
  return s;
}, provide: Dh, inject: function(t, e) {
  return Si(Ml(t), Ml(e));
} };
function Dh(t, e) {
  return e ? t ? function() {
    return gt(at(t) ? t.call(this, this) : t, at(e) ? e.call(this, this) : e);
  } : e : t;
}
function Ml(t) {
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
function Si(t, e) {
  return t ? gt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Rh(t, e) {
  return t ? nt(t) && nt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : gt(/* @__PURE__ */ Object.create(null), ao(t), ao(e ?? {})) : e;
}
function tp() {
  return { app: null, config: { isNativeTag: Un, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let mb = 0, _n = null;
function yb(t, e, s = yt) {
  let n = ve(), i = Tt(e), o = Me(e), a = ep(t, i), r = Tf((l, c) => {
    let h, u, d = yt;
    return Nf(() => {
      let f = t[i];
      ne(h, f) && (h = f, c());
    }), { get: () => (l(), s.get ? s.get(h) : h), set(f) {
      let p = s.set ? s.set(f) : f;
      if (!ne(p, h) && !(d !== yt && ne(f, d))) return;
      let g = n.vnode.props;
      g && (e in g || i in g || o in g) && (`onUpdate:${e}` in g || `onUpdate:${i}` in g || `onUpdate:${o}` in g) || (h = f, c()), n.emit(`update:${e}`, p), ne(f, p) && ne(f, d) && !ne(p, u) && c(), d = f, u = p;
    } };
  });
  return r[Symbol.iterator] = () => {
    let l = 0;
    return { next: () => l < 2 ? { value: l++ ? a || yt : r, done: !1 } : { done: !0 } };
  }, r;
}
let ep = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Tt(e)}Modifiers`] || t[`${Me(e)}Modifiers`];
function bb(t, e, ...s) {
  let n;
  if (t.isUnmounted) return;
  let i = t.vnode.props || yt, o = s, a = e.startsWith("update:"), r = a && ep(i, e.slice(7));
  r && (r.trim && (o = s.map((h) => ct(h) ? h.trim() : h)), r.number && (o = s.map(dr)));
  let l = i[n = Zn(e)] || i[n = Zn(Tt(e))];
  !l && a && (l = i[n = Zn(Me(e))]), l && Ve(l, t, 6, o);
  let c = i[n + "Once"];
  if (c) {
    if (t.emitted) {
      if (t.emitted[n]) return;
    } else t.emitted = {};
    t.emitted[n] = !0, Ve(c, t, 6, o);
  }
}
let _b = /* @__PURE__ */ new WeakMap();
function Na(t, e) {
  return !!t && !!On(e) && (wt(t, (e = e.slice(2).replace(/Once$/, ""))[0].toLowerCase() + e.slice(1)) || wt(t, Me(e)) || wt(t, e));
}
function ma(t) {
  let e, s, { type: n, vnode: i, proxy: o, withProxy: a, propsOptions: [r], slots: l, attrs: c, emit: h, render: u, renderCache: d, props: f, data: p, setupState: g, ctx: m, inheritAttrs: _ } = t, y = oo(t);
  try {
    if (4 & i.shapeFlag) {
      let v = a || o;
      e = ke(u.call(v, v, d, f, g, p, m)), s = c;
    } else e = ke(n.length > 1 ? n(f, { attrs: c, slots: l, emit: h }) : n(f, null)), s = n.props ? c : xb(c);
  } catch (v) {
    qi.length = 0, En(v, t, 1), e = Et(Gt);
  }
  let b = e;
  if (s && _ !== !1) {
    let v = Object.keys(s), { shapeFlag: w } = b;
    v.length && 7 & w && (r && v.some(cr) && (s = vb(s, r)), b = as(b, s, !1, !0));
  }
  return i.dirs && ((b = as(b, null, !1, !0)).dirs = b.dirs ? b.dirs.concat(i.dirs) : i.dirs), i.transition && Ts(b, i.transition), e = b, oo(y), e;
}
let xb = (t) => {
  let e;
  for (let s in t) (s === "class" || s === "style" || On(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, vb = (t, e) => {
  let s = {};
  for (let n in t) cr(n) && n.slice(9) in e || (s[n] = t[n]);
  return s;
};
function Lh(t, e, s) {
  let n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < n.length; i++) {
    let o = n[i];
    if (sp(e, t, o) && !Na(s, o)) return !0;
  }
  return !1;
}
function sp(t, e, s) {
  let n = t[s], i = e[s];
  return s === "style" && St(n) && St(i) ? !Ms(n, i) : n !== i;
}
function Mr({ vnode: t, parent: e, suspense: s }, n) {
  for (; e; ) {
    let i = e.subTree;
    if (i.suspense && i.suspense.activeBranch === t && (i.suspense.vnode.el = i.el = n, t = i), i === t) (t = e.vnode).el = n, e = e.parent;
    else break;
  }
  s && s.activeBranch === t && (s.vnode.el = n);
}
let Al = {}, np = (t) => Object.getPrototypeOf(t) === Al;
function ip(t, e, s, n) {
  let i, [o, a] = t.propsOptions, r = !1;
  if (e) for (let l in e) {
    let c;
    if (Ss(l)) continue;
    let h = e[l];
    o && wt(o, c = Tt(l)) ? a && a.includes(c) ? (i || (i = {}))[c] = h : s[c] = h : Na(t.emitsOptions, l) || l in n && h === n[l] || (n[l] = h, r = !0);
  }
  if (a) {
    let l = xt(s), c = i || yt;
    for (let h = 0; h < a.length; h++) {
      let u = a[h];
      s[u] = Pl(o, l, u, c[u], t, !wt(c, u));
    }
  }
  return r;
}
function Pl(t, e, s, n, i, o) {
  let a = t[s];
  if (a != null) {
    let r = wt(a, "default");
    if (r && n === void 0) {
      let l = a.default;
      if (a.type !== Function && !a.skipFactory && at(l)) {
        let { propsDefaults: c } = i;
        if (s in c) n = c[s];
        else {
          let h = yi(i);
          n = c[s] = l.call(null, e), h();
        }
      } else n = l;
      i.ce && i.ce._setProp(s, n);
    }
    a[0] && (o && !r ? n = !1 : a[1] && (n === "" || n === Me(s)) && (n = !0));
  }
  return n;
}
let Sb = /* @__PURE__ */ new WeakMap();
function Oh(t) {
  return !(t[0] === "$" || Ss(t));
}
let Tc = (t) => t === "_" || t === "_ctx" || t === "$stable", Dc = (t) => nt(t) ? t.map(ke) : [ke(t)], wb = (t, e, s) => {
  if (e._n) return e;
  let n = xc((...i) => Dc(e(...i)), s);
  return n._c = !1, n;
}, op = (t, e, s) => {
  let n = t._ctx;
  for (let i in t) {
    if (Tc(i)) continue;
    let o = t[i];
    if (at(o)) e[i] = wb(i, o, n);
    else if (o != null) {
      let a = Dc(o);
      e[i] = () => a;
    }
  }
}, ap = (t, e) => {
  let s = Dc(e);
  t.slots.default = () => s;
}, rp = (t, e, s) => {
  for (let n in e) (s || !Tc(n)) && (t[n] = e[n]);
}, qt = up;
function Rc(t) {
  return cp(t);
}
function lp(t) {
  return cp(t, By);
}
function cp(t, e) {
  var s;
  let n, i;
  fr().__VUE__ = !0;
  let { insert: o, remove: a, patchProp: r, createElement: l, createText: c, createComment: h, setText: u, setElementText: d, parentNode: f, nextSibling: p, setScopeId: g = ie, insertStaticContent: m } = t, _ = (A, R, N, z = null, $ = null, B = null, G, j = null, H = !!R.dynamicChildren) => {
    if (A === R) return;
    A && !He(A, R) && (z = K(A), et(A, $, B, !0), A = null), R.patchFlag === -2 && (H = !1, R.dynamicChildren = null);
    let { type: W, ref: J, shapeFlag: X } = R;
    switch (W) {
      case Us:
        y(A, R, N, z);
        break;
      case Gt:
        b(A, R, N, z);
        break;
      case xn:
        A == null && v(R, N, z, G);
        break;
      case ee:
        C(A, R, N, z, $, B, G, j, H);
        break;
      default:
        1 & X ? w(A, R, N, z, $, B, G, j, H) : 6 & X ? I(A, R, N, z, $, B, G, j, H) : (64 & X || 128 & X) && W.process(A, R, N, z, $, B, G, j, H, ot);
    }
    J != null && $ ? ii(J, A && A.ref, B, R || A, !R) : J == null && A && A.ref != null && ii(A.ref, null, B, A, !0);
  }, y = (A, R, N, z) => {
    if (A == null) o(R.el = c(R.children), N, z);
    else {
      let $ = R.el = A.el;
      R.children !== A.children && u($, R.children);
    }
  }, b = (A, R, N, z) => {
    A == null ? o(R.el = h(R.children || ""), N, z) : R.el = A.el;
  }, v = (A, R, N, z) => {
    [A.el, A.anchor] = m(A.children, R, N, z, A.el, A.anchor);
  }, w = (A, R, N, z, $, B, G, j, H) => {
    if (R.type === "svg" ? G = "svg" : R.type === "math" && (G = "mathml"), A == null) S(R, N, z, $, B, G, j, H);
    else {
      let W = A.el && A.el._isVueCE ? A.el : null;
      try {
        W && W._beginPatch(), P(A, R, $, B, G, j, H);
      } finally {
        W && W._endPatch();
      }
    }
  }, S = (A, R, N, z, $, B, G, j) => {
    let H, W, { props: J, shapeFlag: X, transition: st, dirs: tt } = A;
    if (H = A.el = l(A.type, B, J && J.is, J), 8 & X ? d(H, A.children) : 16 & X && k(A.children, H, null, z, $, qr(A, B), G, j), tt && ts(A, null, z, "created"), x(H, A, A.scopeId, G, z), J) {
      for (let rt in J) rt === "value" || Ss(rt) || r(H, rt, null, J[rt], B, z);
      "value" in J && r(H, "value", null, J.value, B), (W = J.onVnodeBeforeMount) && Ce(W, z, A);
    }
    tt && ts(A, null, z, "beforeMount");
    let ht = hp($, st);
    ht && st.beforeEnter(H), o(H, R, N), ((W = J && J.onVnodeMounted) || ht || tt) && qt(() => {
      W && Ce(W, z, A), ht && st.enter(H), tt && ts(A, null, z, "mounted");
    }, $);
  }, x = (A, R, N, z, $) => {
    if (N && g(A, N), z) for (let B = 0; B < z.length; B++) g(A, z[B]);
    if ($) {
      let B = $.subTree;
      if (R === B || $a(B.type) && (B.ssContent === R || B.ssFallback === R)) {
        let G = $.vnode;
        x(A, G, G.scopeId, G.slotScopeIds, $.parent);
      }
    }
  }, k = (A, R, N, z, $, B, G, j, H = 0) => {
    for (let W = H; W < A.length; W++) _(null, A[W] = j ? fs(A[W]) : ke(A[W]), R, N, z, $, B, G, j);
  }, P = (A, R, N, z, $, B, G) => {
    let j, H = R.el = A.el, { patchFlag: W, dynamicChildren: J, dirs: X } = R;
    W |= 16 & A.patchFlag;
    let st = A.props || yt, tt = R.props || yt;
    if (N && sn(N, !1), (j = tt.onVnodeBeforeUpdate) && Ce(j, N, R, A), X && ts(R, A, N, "beforeUpdate"), N && sn(N, !0), (st.innerHTML && tt.innerHTML == null || st.textContent && tt.textContent == null) && d(H, ""), J ? F(A.dynamicChildren, J, H, N, z, qr(R, $), B) : G || O(A, R, H, null, N, z, qr(R, $), B, !1), W > 0) {
      if (16 & W) E(H, st, tt, N, $);
      else if (2 & W && st.class !== tt.class && r(H, "class", null, tt.class, $), 4 & W && r(H, "style", st.style, tt.style, $), 8 & W) {
        let ht = R.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let kt = ht[rt], Nt = st[kt], Wt = tt[kt];
          (Wt !== Nt || kt === "value") && r(H, kt, Nt, Wt, $, N);
        }
      }
      1 & W && A.children !== R.children && d(H, R.children);
    } else G || J != null || E(H, st, tt, N, $);
    ((j = tt.onVnodeUpdated) || X) && qt(() => {
      j && Ce(j, N, R, A), X && ts(R, A, N, "updated");
    }, z);
  }, F = (A, R, N, z, $, B, G) => {
    for (let j = 0; j < R.length; j++) {
      let H = A[j], W = R[j], J = H.el && (H.type === ee || !He(H, W) || 198 & H.shapeFlag) ? f(H.el) : N;
      _(H, W, J, null, z, $, B, G, !0);
    }
  }, E = (A, R, N, z, $) => {
    if (R !== N) {
      if (R !== yt) for (let B in R) Ss(B) || B in N || r(A, B, R[B], null, $, z);
      for (let B in N) {
        if (Ss(B)) continue;
        let G = N[B], j = R[B];
        G !== j && B !== "value" && r(A, B, j, G, $, z);
      }
      "value" in N && r(A, "value", R.value, N.value, $);
    }
  }, C = (A, R, N, z, $, B, G, j, H) => {
    let W = R.el = A ? A.el : c(""), J = R.anchor = A ? A.anchor : c(""), { patchFlag: X, dynamicChildren: st, slotScopeIds: tt } = R;
    tt && (j = j ? j.concat(tt) : tt), A == null ? (o(W, N, z), o(J, N, z), k(R.children || [], N, J, $, B, G, j, H)) : X > 0 && 64 & X && st && A.dynamicChildren && A.dynamicChildren.length === st.length ? (F(A.dynamicChildren, st, N, $, B, G, j), (R.key != null || $ && R === $.subTree) && Lc(A, R, !0)) : O(A, R, N, J, $, B, G, j, H);
  }, I = (A, R, N, z, $, B, G, j, H) => {
    R.slotScopeIds = j, A == null ? 512 & R.shapeFlag ? $.ctx.activate(R, N, z, G, H) : L(R, N, z, $, B, G, H) : D(A, R, H);
  }, L = (A, R, N, z, $, B, G) => {
    let j = A.component = bp(A, z, $);
    if (Po(A) && (j.ctx.renderer = ot), xp(j, !1, G), j.asyncDep) {
      if ($ && $.registerDep(j, M, G), !A.el) {
        let H = j.subTree = Et(Gt);
        b(null, H, R, N), A.placeholder = H.el;
      }
    } else M(j, A, R, N, $, B, G);
  }, D = (A, R, N) => {
    let z = R.component = A.component;
    if (function($, B, G) {
      let { props: j, children: H, component: W } = $, { props: J, children: X, patchFlag: st } = B, tt = W.emitsOptions;
      if (B.dirs || B.transition) return !0;
      if (!G || !(st >= 0)) return (!!H || !!X) && (!X || !X.$stable) || j !== J && (j ? !J || Lh(j, J, tt) : !!J);
      if (1024 & st) return !0;
      if (16 & st) return j ? Lh(j, J, tt) : !!J;
      if (8 & st) {
        let ht = B.dynamicProps;
        for (let rt = 0; rt < ht.length; rt++) {
          let kt = ht[rt];
          if (sp(J, j, kt) && !Na(tt, kt)) return !0;
        }
      }
      return !1;
    }(A, R, N)) {
      if (z.asyncDep && !z.asyncResolved) return void T(z, R, N);
      z.next = R, z.update();
    } else R.el = A.el, z.vnode = R;
  }, M = (A, R, N, z, $, B, G) => {
    A.scope.on();
    let j = A.effect = new eo(() => {
      if (A.isMounted) {
        let J, { next: X, bu: st, u: tt, parent: ht, vnode: rt } = A;
        {
          let Se = function Eo(tn) {
            let Os = tn.subTree.component;
            if (Os) return Os.asyncDep && !Os.asyncResolved ? Os : Eo(Os);
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
        let Nt = ma(A), Wt = A.subTree;
        A.subTree = Nt, _(Wt, Nt, f(Wt.el), K(Wt), A, $, B), X.el = Nt.el, kt === null && Mr(A, Nt.el), tt && qt(tt, $), (J = X.props && X.props.onVnodeUpdated) && qt(() => Ce(J, ht, X, rt), $);
      } else {
        let J, { el: X, props: st } = R, { bm: tt, m: ht, parent: rt, root: kt, type: Nt } = A, Wt = Cs(R);
        if (sn(A, !1), tt && Qn(tt), !Wt && (J = st && st.onVnodeBeforeMount) && Ce(J, rt, R), sn(A, !0), X && i) {
          let Se = () => {
            A.subTree = ma(A), i(X, A.subTree, A, $, null);
          };
          Wt && Nt.__asyncHydrate ? Nt.__asyncHydrate(X, A, Se) : Se();
        } else {
          kt.ce && kt.ce._hasShadowRoot() && kt.ce._injectChildStyle(Nt, A.parent ? A.parent.type : void 0);
          let Se = A.subTree = ma(A);
          _(null, Se, N, z, A, $, B), R.el = Se.el;
        }
        if (ht && qt(ht, $), !Wt && (J = st && st.onVnodeMounted)) {
          let Se = R;
          qt(() => Ce(J, rt, Se), $);
        }
        (256 & R.shapeFlag || rt && Cs(rt.vnode) && 256 & rt.vnode.shapeFlag) && A.a && qt(A.a, $), A.isMounted = !0, R = N = z = null;
      }
    });
    A.scope.off();
    let H = A.update = j.run.bind(j), W = A.job = j.runIfDirty.bind(j);
    W.i = A, W.id = A.uid, j.scheduler = () => _c(W), sn(A, !0), H();
  }, T = (A, R, N) => {
    R.component = A;
    let z = A.vnode.props;
    A.vnode = R, A.next = null, function($, B, G, j) {
      let { props: H, attrs: W, vnode: { patchFlag: J } } = $, X = xt(H), [st] = $.propsOptions, tt = !1;
      if ((j || J > 0) && !(16 & J)) {
        if (8 & J) {
          let ht = $.vnode.dynamicProps;
          for (let rt = 0; rt < ht.length; rt++) {
            let kt = ht[rt];
            if (Na($.emitsOptions, kt)) continue;
            let Nt = B[kt];
            if (st) if (wt(W, kt)) Nt !== W[kt] && (W[kt] = Nt, tt = !0);
            else {
              let Wt = Tt(kt);
              H[Wt] = Pl(st, X, Wt, Nt, $, !1);
            }
            else Nt !== W[kt] && (W[kt] = Nt, tt = !0);
          }
        }
      } else {
        let ht;
        for (let rt in ip($, B, H, W) && (tt = !0), X) B && (wt(B, rt) || (ht = Me(rt)) !== rt && wt(B, ht)) || (st ? G && (G[rt] !== void 0 || G[ht] !== void 0) && (H[rt] = Pl(st, X, rt, void 0, $, !0)) : delete H[rt]);
        if (W !== X) for (let rt in W) B && wt(B, rt) || (delete W[rt], tt = !0);
      }
      tt && ms($.attrs, "set", "");
    }(A, R.props, z, N), (($, B, G) => {
      let { vnode: j, slots: H } = $, W = !0, J = yt;
      if (32 & j.shapeFlag) {
        let X = B._;
        X ? G && X === 1 ? W = !1 : rp(H, B, G) : (W = !B.$stable, op(B, H)), J = B;
      } else B && (ap($, B), J = { default: 1 });
      if (W) for (let X in H) Tc(X) || J[X] != null || delete H[X];
    })(A, R.children, N), As(), xh(A), Ps();
  }, O = (A, R, N, z, $, B, G, j, H = !1) => {
    let W = A && A.children, J = A ? A.shapeFlag : 0, X = R.children, { patchFlag: st, shapeFlag: tt } = R;
    if (st > 0) {
      if (128 & st) return void Y(W, X, N, z, $, B, G, j, H);
      if (256 & st) return void V(W, X, N, z, $, B, G, j, H);
    }
    8 & tt ? (16 & J && _t(W, $, B), X !== W && d(N, X)) : 16 & J ? 16 & tt ? Y(W, X, N, z, $, B, G, j, H) : _t(W, $, B, !0) : (8 & J && d(N, ""), 16 & tt && k(X, N, z, $, B, G, j, H));
  }, V = (A, R, N, z, $, B, G, j, H) => {
    let W;
    A = A || Xn, R = R || Xn;
    let J = A.length, X = R.length, st = Math.min(J, X);
    for (W = 0; W < st; W++) {
      let tt = R[W] = H ? fs(R[W]) : ke(R[W]);
      _(A[W], tt, N, null, $, B, G, j, H);
    }
    J > X ? _t(A, $, B, !0, !1, st) : k(R, N, z, $, B, G, j, H, st);
  }, Y = (A, R, N, z, $, B, G, j, H) => {
    let W = 0, J = R.length, X = A.length - 1, st = J - 1;
    for (; W <= X && W <= st; ) {
      let tt = A[W], ht = R[W] = H ? fs(R[W]) : ke(R[W]);
      if (He(tt, ht)) _(tt, ht, N, null, $, B, G, j, H);
      else break;
      W++;
    }
    for (; W <= X && W <= st; ) {
      let tt = A[X], ht = R[st] = H ? fs(R[st]) : ke(R[st]);
      if (He(tt, ht)) _(tt, ht, N, null, $, B, G, j, H);
      else break;
      X--, st--;
    }
    if (W > X) {
      if (W <= st) {
        let tt = st + 1, ht = tt < J ? R[tt].el : z;
        for (; W <= st; ) _(null, R[W] = H ? fs(R[W]) : ke(R[W]), N, ht, $, B, G, j, H), W++;
      }
    } else if (W > st) for (; W <= X; ) et(A[W], $, B, !0), W++;
    else {
      let tt, ht = W, rt = W, kt = /* @__PURE__ */ new Map();
      for (W = rt; W <= st; W++) {
        let Vt = R[W] = H ? fs(R[W]) : ke(R[W]);
        Vt.key != null && kt.set(Vt.key, W);
      }
      let Nt = 0, Wt = st - rt + 1, Se = !1, Eo = 0, tn = Array(Wt);
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
        Vt === void 0 ? et(Qt, $, B, !0) : (tn[Vt - rt] = W + 1, Vt >= Eo ? Eo = Vt : Se = !0, _(Qt, R[Vt], N, null, $, B, G, j, H), Nt++);
      }
      let Os = Se ? function(Vt) {
        let Qt, bi, ye, Ke, en, Nn = Vt.slice(), Ie = [0], Lm = Vt.length;
        for (Qt = 0; Qt < Lm; Qt++) {
          let Io = Vt[Qt];
          if (Io !== 0) {
            if (Vt[bi = Ie[Ie.length - 1]] < Io) {
              Nn[Qt] = bi, Ie.push(Qt);
              continue;
            }
            for (ye = 0, Ke = Ie.length - 1; ye < Ke; ) Vt[Ie[en = ye + Ke >> 1]] < Io ? ye = en + 1 : Ke = en;
            Io < Vt[Ie[ye]] && (ye > 0 && (Nn[Qt] = Ie[ye - 1]), Ie[ye] = Qt);
          }
        }
        for (ye = Ie.length, Ke = Ie[ye - 1]; ye-- > 0; ) Ie[ye] = Ke, Ke = Nn[Ke];
        return Ie;
      }(tn) : Xn;
      for (tt = Os.length - 1, W = Wt - 1; W >= 0; W--) {
        let Vt = rt + W, Qt = R[Vt], bi = R[Vt + 1], ye = Vt + 1 < J ? bi.el || function Ke(en) {
          if (en.placeholder) return en.placeholder;
          let Nn = en.component;
          return Nn ? Ke(Nn.subTree) : null;
        }(bi) : z;
        tn[W] === 0 ? _(null, Qt, N, ye, $, B, G, j, H) : Se && (tt < 0 || W !== Os[tt] ? Z(Qt, N, ye, 2) : tt--);
      }
    }
  }, Z = (A, R, N, z, $ = null) => {
    let { el: B, type: G, transition: j, children: H, shapeFlag: W } = A;
    if (6 & W) return void Z(A.component.subTree, R, N, z);
    if (128 & W) return void A.suspense.move(R, N, z);
    if (64 & W) return void G.move(A, R, N, ot);
    if (G === ee) {
      o(B, R, N);
      for (let J = 0; J < H.length; J++) Z(H[J], R, N, z);
      o(A.anchor, R, N);
      return;
    }
    if (G === xn) return void (({ el: J, anchor: X }, st, tt) => {
      let ht;
      for (; J && J !== X; ) ht = p(J), o(J, st, tt), J = ht;
      o(X, st, tt);
    })(A, R, N);
    if (z !== 2 && 1 & W && j) if (z === 0) j.beforeEnter(B), o(B, R, N), qt(() => j.enter(B), $);
    else {
      let { leave: J, delayLeave: X, afterLeave: st } = j, tt = () => {
        A.ctx.isUnmounted ? a(B) : o(B, R, N);
      }, ht = () => {
        B._isLeaving && B[es](!0), J(B, () => {
          tt(), st && st();
        });
      };
      X ? X(B, tt, ht) : ht();
    }
    else o(B, R, N);
  }, et = (A, R, N, z = !1, $ = !1) => {
    let B, { type: G, props: j, ref: H, children: W, dynamicChildren: J, shapeFlag: X, patchFlag: st, dirs: tt, cacheIndex: ht, memo: rt } = A;
    if (st === -2 && ($ = !1), H != null && (As(), ii(H, null, N, A, !0), Ps()), ht != null && (R.renderCache[ht] = void 0), 256 & X) return void R.ctx.deactivate(A);
    let kt = 1 & X && tt, Nt = !Cs(A);
    if (Nt && (B = j && j.onVnodeBeforeUnmount) && Ce(B, R, A), 6 & X) pt(A.component, N, z);
    else {
      if (128 & X) return void A.suspense.unmount(N, z);
      kt && ts(A, null, R, "beforeUnmount"), 64 & X ? A.type.remove(A, R, N, ot, z) : J && !J.hasOnce && (G !== ee || st > 0 && 64 & st) ? _t(J, R, N, !1, !0) : (G === ee && 384 & st || !$ && 16 & X) && _t(W, R, N), z && dt(A);
    }
    let Wt = rt != null && ht == null;
    (Nt && (B = j && j.onVnodeUnmounted) || kt || Wt) && qt(() => {
      B && Ce(B, R, A), kt && ts(A, null, R, "unmounted"), Wt && (A.el = null);
    }, N);
  }, dt = (A) => {
    let { type: R, el: N, anchor: z, transition: $ } = A;
    if (R === ee) return void lt(N, z);
    if (R === xn) return void (({ el: G, anchor: j }) => {
      let H;
      for (; G && G !== j; ) H = p(G), a(G), G = H;
      a(j);
    })(A);
    let B = () => {
      a(N), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (1 & A.shapeFlag && $ && !$.persisted) {
      let { leave: G, delayLeave: j } = $, H = () => G(N, B);
      j ? j(A.el, B, H) : H();
    } else B();
  }, lt = (A, R) => {
    let N;
    for (; A !== R; ) N = p(A), a(A), A = N;
    a(R);
  }, pt = (A, R, N) => {
    let { bum: z, scope: $, job: B, subTree: G, um: j, m: H, a: W } = A;
    Ba(H), Ba(W), z && Qn(z), $.stop(), B && (B.flags |= 8, et(G, A, R, N)), j && qt(j, R), qt(() => {
      A.isUnmounted = !0;
    }, R);
  }, _t = (A, R, N, z = !1, $ = !1, B = 0) => {
    for (let G = B; G < A.length; G++) et(A[G], R, N, z, $);
  }, K = (A) => {
    if (6 & A.shapeFlag) return K(A.component.subTree);
    if (128 & A.shapeFlag) return A.suspense.next();
    let R = p(A.anchor || A.el), N = R && R[$f];
    return N ? p(N) : R;
  }, q = !1, U = (A, R, N) => {
    let z;
    A == null ? R._vnode && (et(R._vnode, null, null, !0), z = R._vnode.component) : _(R._vnode || null, A, R, null, null, null, N), R._vnode = A, q || (q = !0, xh(z), Oa(), q = !1);
  }, ot = { p: _, um: et, m: Z, r: dt, mt: L, mc: k, pc: O, pbc: F, n: K, o: t };
  return e && ([n, i] = e(ot)), { render: U, hydrate: n, createApp: (s = n, function(A, R = null) {
    at(A) || (A = gt({}, A)), R == null || St(R) || (R = null);
    let N = tp(), z = /* @__PURE__ */ new WeakSet(), $ = [], B = !1, G = N.app = { _uid: mb++, _component: A, _props: R, _container: null, _context: N, _instance: null, version: Ap, get config() {
      return N.config;
    }, set config(j) {
    }, use: (j, ...H) => (z.has(j) || (j && at(j.install) ? (z.add(j), j.install(G, ...H)) : at(j) && (z.add(j), j(G, ...H))), G), mixin: (j) => (N.mixins.includes(j) || N.mixins.push(j), G), component: (j, H) => H ? (N.components[j] = H, G) : N.components[j], directive: (j, H) => H ? (N.directives[j] = H, G) : N.directives[j], mount(j, H, W) {
      if (!B) {
        let J = G._ceVNode || Et(A, R);
        return J.appContext = N, W === !0 ? W = "svg" : W === !1 && (W = void 0), H && s ? s(J, j) : U(J, j, W), B = !0, G._container = j, j.__vue_app__ = G, Do(J.component);
      }
    }, onUnmount(j) {
      $.push(j);
    }, unmount() {
      B && (Ve($, G._instance, 16), U(null, G._container), delete G._container.__vue_app__);
    }, provide: (j, H) => (N.provides[j] = H, G), runWithContext(j) {
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
function hp(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Lc(t, e, s = !1) {
  let n = t.children, i = e.children;
  if (nt(n) && nt(i)) for (let o = 0; o < n.length; o++) {
    let a = n[o], r = i[o];
    1 & r.shapeFlag && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && ((r = i[o] = fs(i[o])).el = a.el), s || r.patchFlag === -2 || Lc(a, r)), r.type === Us && (r.patchFlag === -1 && (r = i[o] = fs(r)), r.el = a.el), r.type !== Gt || r.el || (r.el = a.el);
  }
}
function Ba(t) {
  if (t) for (let e = 0; e < t.length; e++) t[e].flags |= 8;
}
let $a = (t) => t.__isSuspense, Tl = 0, Cb = { name: "Suspense", __isSuspense: !0, process(t, e, s, n, i, o, a, r, l, c) {
  if (t == null) (function(h, u, d, f, p, g, m, _, y) {
    let { p: b, o: { createElement: v } } = y, w = v("div"), S = h.suspense = Fh(h, p, f, u, w, d, g, m, _, y);
    b(null, S.pendingBranch = h.ssContent, w, null, f, S, g, m), S.deps > 0 ? (Ui(h, "onPending"), Ui(h, "onFallback"), b(null, h.ssFallback, u, d, f, null, g, m), Yn(S, h.ssFallback)) : S.resolve(!1, !0);
  })(e, s, n, i, o, a, r, l, c);
  else {
    if (o && o.deps > 0 && !t.suspense.isInFallback) {
      e.suspense = t.suspense, e.suspense.vnode = e, e.el = t.el;
      return;
    }
    (function(h, u, d, f, p, g, m, _, { p: y, um: b, o: { createElement: v } }) {
      let w = u.suspense = h.suspense;
      w.vnode = u, u.el = h.el;
      let S = u.ssContent, x = u.ssFallback, { activeBranch: k, pendingBranch: P, isInFallback: F, isHydrating: E } = w;
      if (P) w.pendingBranch = S, He(P, S) ? (y(P, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0 ? w.resolve() : F && !E && (y(k, x, d, f, p, null, g, m, _), Yn(w, x))) : (w.pendingId = Tl++, E ? (w.isHydrating = !1, w.activeBranch = P) : b(P, p, w), w.deps = 0, w.effects.length = 0, w.hiddenContainer = v("div"), F ? (y(null, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0 ? w.resolve() : (y(k, x, d, f, p, null, g, m, _), Yn(w, x))) : k && He(k, S) ? (y(k, S, d, f, p, w, g, m, _), w.resolve(!0)) : (y(null, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0 && w.resolve()));
      else if (k && He(k, S)) y(k, S, d, f, p, w, g, m, _), Yn(w, S);
      else if (Ui(u, "onPending"), w.pendingBranch = S, 512 & S.shapeFlag ? w.pendingId = S.component.suspenseId : w.pendingId = Tl++, y(null, S, w.hiddenContainer, null, p, w, g, m, _), w.deps <= 0) w.resolve();
      else {
        let { timeout: C, pendingId: I } = w;
        C > 0 ? setTimeout(() => {
          w.pendingId === I && w.fallback(x);
        }, C) : C === 0 && w.fallback(x);
      }
    })(t, e, s, n, i, a, r, l, c);
  }
}, hydrate: function(t, e, s, n, i, o, a, r, l) {
  let c = e.suspense = Fh(e, n, s, t.parentNode, document.createElement("div"), null, i, o, a, r, !0), h = l(t, c.pendingBranch = e.ssContent, s, c, o, a);
  return c.deps === 0 && c.resolve(!1, !0), h;
}, normalize: function(t) {
  let { shapeFlag: e, children: s } = t, n = 32 & e;
  t.ssContent = Eh(n ? s.default : s), t.ssFallback = n ? Eh(s.fallback) : Et(Gt);
} };
function Ui(t, e) {
  let s = t.props && t.props[e];
  at(s) && s();
}
function Fh(t, e, s, n, i, o, a, r, l, c, h = !1) {
  var u;
  let d, f, { p, m: g, um: m, n: _, o: { parentNode: y, remove: b } } = c, v = (d = (u = t).props && u.props.suspensible) != null && d !== !1;
  v && e && e.pendingBranch && (f = e.pendingId, e.deps++);
  let w = t.props ? ti(t.props.timeout) : void 0, S = o, x = { vnode: t, parent: e, parentComponent: s, namespace: a, container: n, hiddenContainer: i, deps: 0, pendingId: Tl++, timeout: typeof w == "number" ? w : -1, activeBranch: null, isFallbackMountPending: !1, pendingBranch: null, isInFallback: !h, isHydrating: h, isUnmounted: !1, effects: [], resolve(k = !1, P = !1) {
    let { vnode: F, activeBranch: E, pendingBranch: C, pendingId: I, effects: L, parentComponent: D, container: M, isInFallback: T } = x, O = !1;
    x.isHydrating ? x.isHydrating = !1 : !k && ((O = E && C.transition && C.transition.mode === "out-in") && (E.transition.afterLeave = () => {
      I === x.pendingId && (g(C, M, o === S ? _(E) : o, 0), io(L), T && F.ssFallback && (F.ssFallback.el = null));
    }), E && !x.isFallbackMountPending && (y(E.el) === M && (o = _(E)), m(E, D, x, !0), !O && T && F.ssFallback && qt(() => F.ssFallback.el = null, x)), O || g(C, M, o, 0)), x.isFallbackMountPending = !1, Yn(x, C), x.pendingBranch = null, x.isInFallback = !1;
    let V = x.parent, Y = !1;
    for (; V; ) {
      if (V.pendingBranch) {
        V.effects.push(...L), Y = !0;
        break;
      }
      V = V.parent;
    }
    Y || O || io(L), x.effects = [], v && e && e.pendingBranch && f === e.pendingId && (e.deps--, e.deps !== 0 || P || e.resolve()), Ui(F, "onResolve");
  }, fallback(k) {
    if (!x.pendingBranch) return;
    let { vnode: P, activeBranch: F, parentComponent: E, container: C, namespace: I } = x;
    Ui(P, "onFallback");
    let L = _(F), D = () => {
      x.isFallbackMountPending = !1, x.isInFallback && (p(null, k, C, L, E, null, I, r, l), Yn(x, k));
    }, M = k.transition && k.transition.mode === "out-in";
    M && (x.isFallbackMountPending = !0, F.transition.afterLeave = D), x.isInFallback = !0, m(F, E, null, !0), M || D();
  }, move(k, P, F) {
    x.activeBranch && g(x.activeBranch, k, P, F), x.container = k;
  }, next: () => x.activeBranch && _(x.activeBranch), registerDep(k, P, F) {
    let E = !!x.pendingBranch;
    E && x.deps++;
    let C = k.vnode.el;
    k.asyncDep.catch((I) => {
      En(I, k, 0);
    }).then((I) => {
      if (k.isUnmounted || x.isUnmounted || x.pendingId !== k.suspenseId) return;
      co(), k.asyncResolved = !0;
      let { vnode: L } = k;
      Dl(k, I, !1), C && (L.el = C);
      let D = !C && k.subTree.el;
      P(k, L, y(C || k.subTree.el), C ? null : _(k.subTree), x, a, F), D && (L.placeholder = null, b(D)), Mr(k, L.el), E && --x.deps == 0 && x.resolve();
    });
  }, unmount(k, P) {
    x.isUnmounted = !0, x.activeBranch && m(x.activeBranch, s, k, P), x.pendingBranch && m(x.pendingBranch, s, k, P);
  } };
  return x;
}
function Eh(t) {
  let e;
  if (at(t)) {
    let s = kn && t._c;
    s && (t._d = !1, ro()), t = t(), s && (t._d = !0, e = fe, dp());
  }
  return nt(t) && (t = function(s) {
    let n;
    for (let i = 0; i < s.length; i++) {
      let o = s[i];
      if (!Ds(o)) return;
      if (o.type !== Gt || o.children === "v-if") {
        if (n) return;
        n = o;
      }
    }
    return n;
  }(t)), t = ke(t), e && !t.dynamicChildren && (t.dynamicChildren = e.filter((s) => s !== t)), t;
}
function up(t, e) {
  e && e.pendingBranch ? nt(t) ? e.effects.push(...t) : e.effects.push(t) : io(t);
}
function Yn(t, e) {
  t.activeBranch = e;
  let { vnode: s, parentComponent: n } = t, i = e.el;
  for (; !i && e.component; ) i = (e = e.component.subTree).el;
  s.el = i, n && n.subTree === s && (n.vnode.el = i, Mr(n, i));
}
let ee = Symbol.for("v-fgt"), Us = Symbol.for("v-txt"), Gt = Symbol.for("v-cmt"), xn = Symbol.for("v-stc"), qi = [], fe = null;
function ro(t = !1) {
  qi.push(fe = t ? null : []);
}
function dp() {
  qi.pop(), fe = qi[qi.length - 1] || null;
}
let kn = 1;
function lo(t, e = !1) {
  kn += t, t < 0 && fe && e && (fe.hasOnce = !0);
}
function fp(t) {
  return t.dynamicChildren = kn > 0 ? fe || Xn : null, dp(), kn > 0 && fe && fe.push(t), t;
}
function kb(t, e, s, n, i, o) {
  return fp(Oc(t, e, s, n, i, o, !0));
}
function ja(t, e, s, n, i) {
  return fp(Et(t, e, s, n, i, !0));
}
function Ds(t) {
  return !!t && t.__v_isVNode === !0;
}
function He(t, e) {
  return t.type === e.type && t.key === e.key;
}
function Mb(t) {
}
let pp = ({ key: t }) => t ?? null, ya = ({ ref: t, ref_key: e, ref_for: s }) => (typeof t == "number" && (t = "" + t), t != null ? ct(t) || Kt(t) || at(t) ? { i: ae, r: t, k: e, f: !!s } : t : null);
function Oc(t, e = null, s = null, n = 0, i = null, o = +(t !== ee), a = !1, r = !1) {
  let l = { __v_isVNode: !0, __v_skip: !0, type: t, props: e, key: e && pp(e), ref: e && ya(e), scopeId: vr, slotScopeIds: null, children: s, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: ae };
  return r ? (Ec(l, s), 128 & o && t.normalize(l)) : s && (l.shapeFlag |= ct(s) ? 8 : 16), kn > 0 && !a && fe && (l.patchFlag > 0 || 6 & o) && l.patchFlag !== 32 && fe.push(l), l;
}
let Et = function(t, e = null, s = null, n = 0, i = null, o = !1) {
  var a;
  if (t && t !== Zf || (t = Gt), Ds(t)) {
    let l = as(t, e, !0);
    return s && Ec(l, s), kn > 0 && !o && fe && (6 & l.shapeFlag ? fe[fe.indexOf(t)] = l : fe.push(l)), l.patchFlag = -2, l;
  }
  if (at(a = t) && "__vccOpts" in a && (t = t.__vccOpts), e) {
    let { class: l, style: c } = e = gp(e);
    l && !ct(l) && (e.class = Co(l)), St(c) && (ko(c) && !nt(c) && (c = gt({}, c)), e.style = wo(c));
  }
  let r = ct(t) ? 1 : $a(t) ? 128 : t.__isTeleport ? 64 : St(t) ? 4 : 2 * !!at(t);
  return Oc(t, e, s, n, i, r, o, !0);
};
function gp(t) {
  return t ? ko(t) || np(t) ? gt({}, t) : t : null;
}
function as(t, e, s = !1, n = !1) {
  let { props: i, ref: o, patchFlag: a, children: r, transition: l } = t, c = e ? yp(i || {}, e) : i, h = { __v_isVNode: !0, __v_skip: !0, type: t.type, props: c, key: c && pp(c), ref: e && e.ref ? s && o ? nt(o) ? o.concat(ya(e)) : [o, ya(e)] : ya(e) : o, scopeId: t.scopeId, slotScopeIds: t.slotScopeIds, children: r, target: t.target, targetStart: t.targetStart, targetAnchor: t.targetAnchor, staticCount: t.staticCount, shapeFlag: t.shapeFlag, patchFlag: e && t.type !== ee ? a === -1 ? 16 : 16 | a : a, dynamicProps: t.dynamicProps, dynamicChildren: t.dynamicChildren, appContext: t.appContext, dirs: t.dirs, transition: l, component: t.component, suspense: t.suspense, ssContent: t.ssContent && as(t.ssContent), ssFallback: t.ssFallback && as(t.ssFallback), placeholder: t.placeholder, el: t.el, anchor: t.anchor, ctx: t.ctx, ce: t.ce };
  return l && n && Ts(h, l.clone(h)), h;
}
function Fc(t = " ", e = 0) {
  return Et(Us, null, t, e);
}
function Ab(t, e) {
  let s = Et(xn, null, t);
  return s.staticCount = e, s;
}
function mp(t = "", e = !1) {
  return e ? (ro(), ja(Gt, null, t)) : Et(Gt, null, t);
}
function ke(t) {
  return t == null || typeof t == "boolean" ? Et(Gt) : nt(t) ? Et(ee, null, t.slice()) : Ds(t) ? fs(t) : Et(Us, null, String(t));
}
function fs(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : as(t);
}
function Ec(t, e) {
  let s = 0, { shapeFlag: n } = t;
  if (e == null) e = null;
  else if (nt(e)) s = 16;
  else if (typeof e == "object") if (65 & n) {
    let i = e.default;
    i && (i._c && (i._d = !1), Ec(t, i()), i._c && (i._d = !0));
    return;
  } else {
    s = 32;
    let i = e._;
    i || np(e) ? i === 3 && ae && (ae.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024)) : e._ctx = ae;
  }
  else at(e) ? (e = { default: e, _ctx: ae }, s = 32) : (e = String(e), 64 & n ? (s = 16, e = [Fc(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function yp(...t) {
  let e = {};
  for (let s = 0; s < t.length; s++) {
    let n = t[s];
    for (let i in n) if (i === "class") e.class !== n.class && (e.class = Co([e.class, n.class]));
    else if (i === "style") e.style = wo([e.style, n.style]);
    else if (On(i)) {
      let o = e[i], a = n[i];
      a && o !== a && !(nt(o) && o.includes(a)) ? e[i] = o ? [].concat(o, a) : a : a != null || o != null || cr(i) || (e[i] = a);
    } else i !== "" && (e[i] = n[i]);
  }
  return e;
}
function Ce(t, e, s, n = null) {
  Ve(t, e, 7, [s, n]);
}
let Pb = tp(), Tb = 0;
function bp(t, e, s) {
  let n = t.type, i = (e ? e.appContext : t.appContext) || Pb, o = { uid: Tb++, vnode: t, type: n, parent: e, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new gc(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: e ? e.provides : Object.create(i.provides), ids: e ? e.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: function a(r, l, c = !1) {
    let h = c ? Sb : l.propsCache, u = h.get(r);
    if (u) return u;
    let d = r.props, f = {}, p = [], g = !1;
    if (!at(r)) {
      let _ = (y) => {
        g = !0;
        let [b, v] = a(y, l, !0);
        gt(f, b), v && p.push(...v);
      };
      !c && l.mixins.length && l.mixins.forEach(_), r.extends && _(r.extends), r.mixins && r.mixins.forEach(_);
    }
    if (!d && !g) return St(r) && h.set(r, Xn), Xn;
    if (nt(d)) for (let _ = 0; _ < d.length; _++) {
      let y = Tt(d[_]);
      Oh(y) && (f[y] = yt);
    }
    else if (d) for (let _ in d) {
      let y = Tt(_);
      if (Oh(y)) {
        let b = d[_], v = f[y] = nt(b) || at(b) ? { type: b } : gt({}, b), w = v.type, S = !1, x = !0;
        if (nt(w)) for (let k = 0; k < w.length; ++k) {
          let P = w[k], F = at(P) && P.name;
          if (F === "Boolean") {
            S = !0;
            break;
          }
          F === "String" && (x = !1);
        }
        else S = at(w) && w.name === "Boolean";
        v[0] = S, v[1] = x, (S || wt(v, "default")) && p.push(y);
      }
    }
    let m = [f, p];
    return St(r) && h.set(r, m), m;
  }(n, i), emitsOptions: function a(r, l, c = !1) {
    let h = c ? _b : l.emitsCache, u = h.get(r);
    if (u !== void 0) return u;
    let d = r.emits, f = {}, p = !1;
    if (!at(r)) {
      let g = (m) => {
        let _ = a(m, l, !0);
        _ && (p = !0, gt(f, _));
      };
      !c && l.mixins.length && l.mixins.forEach(g), r.extends && g(r.extends), r.mixins && r.mixins.forEach(g);
    }
    return d || p ? (nt(d) ? d.forEach((g) => f[g] = null) : gt(f, d), St(r) && h.set(r, f), f) : (St(r) && h.set(r, null), null);
  }(n, i), emit: null, emitted: null, propsDefaults: yt, inheritAttrs: n.inheritAttrs, ctx: yt, data: yt, props: yt, attrs: yt, slots: yt, refs: yt, setupState: yt, setupContext: null, suspense: s, suspenseId: s ? s.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o.ctx = { _: o }, o.root = e ? e.root : o, o.emit = bb.bind(null, o), t.ce && t.ce(o), o;
}
let oe = null, ve = () => oe || ae;
{
  let t = fr(), e = (s, n) => {
    let i;
    return (i = t[s]) || (i = t[s] = []), i.push(n), (o) => {
      i.length > 1 ? i.forEach((a) => a(o)) : i[0](o);
    };
  };
  Pa = e("__VUE_INSTANCE_SETTERS__", (s) => oe = s), Jn = e("__VUE_SSR_SETTERS__", (s) => Mn = s);
}
let yi = (t) => {
  let e = oe;
  return Pa(t), t.scope.on(), () => {
    t.scope.off(), Pa(e);
  };
}, co = () => {
  oe && oe.scope.off(), Pa(null);
};
function _p(t) {
  return 4 & t.vnode.shapeFlag;
}
let Mn = !1;
function xp(t, e = !1, s = !1) {
  e && Jn(e);
  let { props: n, children: i } = t.vnode, o = _p(t);
  (function(c, h, u, d = !1) {
    let f = {}, p = Object.create(Al);
    for (let g in c.propsDefaults = /* @__PURE__ */ Object.create(null), ip(c, h, f, p), c.propsOptions[0]) g in f || (f[g] = void 0);
    u ? c.props = d ? f : kf(f) : c.type.props ? c.props = f : c.props = p, c.attrs = p;
  })(t, n, o, e);
  var a = s || e;
  let r = t.slots = Object.create(Al);
  if (32 & t.vnode.shapeFlag) {
    let c = i._;
    c ? (rp(r, i, a), a && af(r, "_", c, !0)) : op(i, r);
  } else i && ap(t, i);
  let l = o ? function(c, h) {
    let u = c.type;
    c.accessCache = /* @__PURE__ */ Object.create(null), c.proxy = new Proxy(c.ctx, wl);
    let { setup: d } = u;
    if (d) {
      As();
      let f = c.setupContext = d.length > 1 ? wp(c) : null, p = yi(c), g = mi(d, c, 0, [c.props, f]), m = pc(g);
      if (Ps(), p(), (m || c.sp) && !Cs(c) && Cc(c), m) {
        if (g.then(co, co), h) return g.then((_) => {
          Dl(c, _, h);
        }).catch((_) => {
          En(_, c, 0);
        });
        c.asyncDep = g;
      } else Dl(c, g, h);
    } else Sp(c, h);
  }(t, e) : void 0;
  return e && Jn(!1), l;
}
function Dl(t, e, s) {
  at(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : St(e) && (t.setupState = bc(e)), Sp(t, s);
}
function vp(t) {
  Ta = t, bl = (e) => {
    e.render._rc && (e.withProxy = new Proxy(e.ctx, eb));
  };
}
let Db = () => !Ta;
function Sp(t, e, s) {
  let n = t.type;
  if (!t.render) {
    if (!e && Ta && !n.render) {
      let i = n.template || kl(t).template;
      if (i) {
        let { isCustomElement: o, compilerOptions: a } = t.appContext.config, { delimiters: r, compilerOptions: l } = n, c = gt(gt({ isCustomElement: o, delimiters: r }, a), l);
        n.render = Ta(i, c);
      }
    }
    t.render = n.render || ie, bl && bl(t);
  }
  {
    let i = yi(t);
    As();
    try {
      (function(o) {
        let a = kl(o), r = o.proxy, l = o.ctx;
        Cl = !1, a.beforeCreate && Th(a.beforeCreate, o, "bc");
        let { data: c, computed: h, methods: u, watch: d, provide: f, inject: p, created: g, beforeMount: m, mounted: _, beforeUpdate: y, updated: b, activated: v, deactivated: w, beforeUnmount: S, unmounted: x, render: k, renderTracked: P, renderTriggered: F, errorCaptured: E, serverPrefetch: C, expose: I, inheritAttrs: L, components: D, directives: M } = a;
        if (p && function(O, V) {
          for (let Y in nt(O) && (O = Ml(O)), O) {
            let Z, et = O[Y];
            Kt(Z = St(et) ? "default" in et ? zi(et.from || Y, et.default, !0) : zi(et.from || Y) : zi(et)) ? Object.defineProperty(V, Y, { enumerable: !0, configurable: !0, get: () => Z.value, set: (dt) => Z.value = dt }) : V[Y] = Z;
          }
        }(p, l), u) for (let O in u) {
          let V = u[O];
          at(V) && (l[O] = V.bind(r));
        }
        if (c) {
          let O = c.call(r, r);
          St(O) && (o.data = _r(O));
        }
        if (Cl = !0, h) for (let O in h) {
          let V = h[O], Y = at(V) ? V.bind(r, r) : at(V.get) ? V.get.bind(r, r) : ie, Z = Cp({ get: Y, set: !at(V) && at(V.set) ? V.set.bind(r) : ie });
          Object.defineProperty(l, O, { enumerable: !0, configurable: !0, get: () => Z.value, set: (et) => Z.value = et });
        }
        if (d) for (let O in d) (function V(Y, Z, et, dt) {
          let lt = dt.includes(".") ? Bf(et, dt) : () => et[dt];
          if (ct(Y)) {
            let pt = Z[Y];
            at(pt) && ni(lt, pt);
          } else if (at(Y)) ni(lt, Y.bind(et));
          else if (St(Y)) if (nt(Y)) Y.forEach((pt) => V(pt, Z, et, dt));
          else {
            let pt = at(Y.handler) ? Y.handler.bind(et) : Z[Y.handler];
            at(pt) && ni(lt, pt, Y);
          }
        })(d[O], l, r, O);
        if (f) {
          let O = at(f) ? f.call(r) : f;
          Reflect.ownKeys(O).forEach((V) => {
            Ff(V, O[V]);
          });
        }
        function T(O, V) {
          nt(V) ? V.forEach((Y) => O(Y.bind(r))) : V && O(V.bind(r));
        }
        if (g && Th(g, o, "c"), T(qf, m), T(To, _), T(kc, y), T(wr, b), T(zf, v), T(Gf, w), T(Xf, E), T(Jf, P), T(Kf, F), T(Cr, S), T(kr, x), T(Yf, C), nt(I)) if (I.length) {
          let O = o.exposed || (o.exposed = {});
          I.forEach((V) => {
            Object.defineProperty(O, V, { get: () => r[V], set: (Y) => r[V] = Y, enumerable: !0 });
          });
        } else o.exposed || (o.exposed = {});
        k && o.render === ie && (o.render = k), L != null && (o.inheritAttrs = L), D && (o.components = D), M && (o.directives = M), C && Cc(o);
      })(t);
    } finally {
      Ps(), i();
    }
  }
}
let Rb = { get: (t, e) => (ue(t, "get", ""), t[e]) };
function wp(t) {
  return { attrs: new Proxy(t.attrs, Rb), slots: t.slots, emit: t.emit, expose: (e) => {
    t.exposed = e || {};
  } };
}
function Do(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(bc(Mf(t.exposed)), { get: (e, s) => s in e ? e[s] : s in Gi ? Gi[s](t) : void 0, has: (e, s) => s in e || s in Gi })) : t.proxy;
}
function Rl(t, e = !0) {
  return at(t) ? t.displayName || t.name : t.name || e && t.__name;
}
let Cp = (t, e) => function(s, n = !1) {
  let i, o;
  return at(s) ? i = s : (i = s.get, o = s.set), new vy(i, o, n);
}(t, Mn);
function kp(t, e, s) {
  try {
    lo(-1);
    let n = arguments.length;
    return n !== 2 ? (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Ds(s) && (s = [s]), Et(t, e, s)) : !St(e) || nt(e) ? Et(t, null, e) : Ds(e) ? Et(t, null, [e]) : Et(t, e);
  } finally {
    lo(1);
  }
}
function Lb() {
}
function Ob(t, e, s, n) {
  let i = s[n];
  if (i && Mp(i, t)) return i;
  let o = e();
  return o.memo = t.slice(), o.cacheIndex = n, s[n] = o;
}
function Mp(t, e) {
  let s = t.memo;
  if (s.length != e.length) return !1;
  for (let n = 0; n < s.length; n++) if (ne(s[n], e[n])) return !1;
  return kn > 0 && fe && fe.push(t), !0;
}
let Ap = "3.5.33", Fb = ie, Eb = null, Ib, Nb = ie, Bb = { createComponentInstance: bp, setupComponent: xp, renderComponentRoot: ma, setCurrentRenderingInstance: oo, isVNode: Ds, normalizeVNode: ke, getComponentPublicInstance: Do, ensureValidVNode: Pc, pushWarningContext: function(t) {
}, popWarningContext: function() {
} }, $b = null, jb = null, Wb = null, Ih = "u" > typeof window && window.trustedTypes;
if (Ih) try {
  _l = Ih.createPolicy("vue", { createHTML: (t) => t });
} catch {
}
let Pp = _l ? (t) => _l.createHTML(t) : (t) => t, ds = "u" > typeof document ? document : null, Nh = ds && ds.createElement("template"), Tp = { insert: (t, e, s) => {
  e.insertBefore(t, s || null);
}, remove: (t) => {
  let e = t.parentNode;
  e && e.removeChild(t);
}, createElement: (t, e, s, n) => {
  let i = e === "svg" ? ds.createElementNS("http://www.w3.org/2000/svg", t) : e === "mathml" ? ds.createElementNS("http://www.w3.org/1998/Math/MathML", t) : s ? ds.createElement(t, { is: s }) : ds.createElement(t);
  return t === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
}, createText: (t) => ds.createTextNode(t), createComment: (t) => ds.createComment(t), setText: (t, e) => {
  t.nodeValue = e;
}, setElementText: (t, e) => {
  t.textContent = e;
}, parentNode: (t) => t.parentNode, nextSibling: (t) => t.nextSibling, querySelector: (t) => ds.querySelector(t), setScopeId(t, e) {
  t.setAttribute(e, "");
}, insertStaticContent(t, e, s, n, i, o) {
  let a = s ? s.previousSibling : e.lastChild;
  if (i && (i === o || i.nextSibling)) for (; e.insertBefore(i.cloneNode(!0), s), i !== o && (i = i.nextSibling); ) ;
  else {
    Nh.innerHTML = Pp(n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t);
    let r = Nh.content;
    if (n === "svg" || n === "mathml") {
      let l = r.firstChild;
      for (; l.firstChild; ) r.appendChild(l.firstChild);
      r.removeChild(l);
    }
    e.insertBefore(r, s);
  }
  return [a ? a.nextSibling : e.firstChild, s ? s.previousSibling : e.lastChild];
} }, Fs = "transition", wi = "animation", li = Symbol("_vtc"), Dp = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, Rp = gt({}, Sc, Dp), Vb = ((Jr = (t, { slots: e }) => kp(Vf, Lp(t), e)).displayName = "Transition", Jr.props = Rp, Jr), nn = (t, e = []) => {
  nt(t) ? t.forEach((s) => s(...e)) : t && t(...e);
}, Bh = (t) => !!t && (nt(t) ? t.some((e) => e.length > 1) : t.length > 1);
function Lp(t) {
  let e = {};
  for (let C in t) C in Dp || (e[C] = t[C]);
  if (t.css === !1) return e;
  let { name: s = "v", type: n, duration: i, enterFromClass: o = `${s}-enter-from`, enterActiveClass: a = `${s}-enter-active`, enterToClass: r = `${s}-enter-to`, appearFromClass: l = o, appearActiveClass: c = a, appearToClass: h = r, leaveFromClass: u = `${s}-leave-from`, leaveActiveClass: d = `${s}-leave-active`, leaveToClass: f = `${s}-leave-to` } = t, p = function(C) {
    if (C == null) return null;
    {
      if (St(C)) return [function(L) {
        return ti(L);
      }(C.enter), function(L) {
        return ti(L);
      }(C.leave)];
      let I = function(L) {
        return ti(L);
      }(C);
      return [I, I];
    }
  }(i), g = p && p[0], m = p && p[1], { onBeforeEnter: _, onEnter: y, onEnterCancelled: b, onLeave: v, onLeaveCancelled: w, onBeforeAppear: S = _, onAppear: x = y, onAppearCancelled: k = b } = e, P = (C, I, L, D) => {
    C._enterCancelled = D, Bs(C, I ? h : r), Bs(C, I ? c : a), L && L();
  }, F = (C, I) => {
    C._isLeaving = !1, Bs(C, u), Bs(C, f), Bs(C, d), I && I();
  }, E = (C) => (I, L) => {
    let D = C ? x : y, M = () => P(I, C, L);
    nn(D, [I, M]), $h(() => {
      Bs(I, C ? l : o), Je(I, C ? h : r), Bh(D) || jh(I, n, g, M);
    });
  };
  return gt(e, { onBeforeEnter(C) {
    nn(_, [C]), Je(C, o), Je(C, a);
  }, onBeforeAppear(C) {
    nn(S, [C]), Je(C, l), Je(C, c);
  }, onEnter: E(!1), onAppear: E(!0), onLeave(C, I) {
    C._isLeaving = !0;
    let L = () => F(C, I);
    Je(C, u), C._enterCancelled ? (Je(C, d), Ll(C)) : (Ll(C), Je(C, d)), $h(() => {
      C._isLeaving && (Bs(C, u), Je(C, f), Bh(v) || jh(C, n, m, L));
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
function Bs(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.remove(n));
  let s = t[li];
  s && (s.delete(e), s.size || (t[li] = void 0));
}
function $h(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Hb = 0;
function jh(t, e, s, n) {
  let i = t._endId = ++Hb, o = () => {
    i === t._endId && n();
  };
  if (s != null) return setTimeout(o, s);
  let { type: a, timeout: r, propCount: l } = Op(t, e);
  if (!a) return n();
  let c = a + "end", h = 0, u = () => {
    t.removeEventListener(c, d), o();
  }, d = (f) => {
    f.target === t && ++h >= l && u();
  };
  setTimeout(() => {
    h < l && u();
  }, r + 1), t.addEventListener(c, d);
}
function Op(t, e) {
  let s = window.getComputedStyle(t), n = (p) => (s[p] || "").split(", "), i = n(`${Fs}Delay`), o = n(`${Fs}Duration`), a = Wh(i, o), r = n(`${wi}Delay`), l = n(`${wi}Duration`), c = Wh(r, l), h = null, u = 0, d = 0;
  e === Fs ? a > 0 && (h = Fs, u = a, d = o.length) : e === wi ? c > 0 && (h = wi, u = c, d = l.length) : d = (h = (u = Math.max(a, c)) > 0 ? a > c ? Fs : wi : null) ? h === Fs ? o.length : l.length : 0;
  let f = h === Fs && /\b(?:transform|all)(?:,|$)/.test(n(`${Fs}Property`).toString());
  return { type: h, timeout: u, propCount: d, hasTransform: f };
}
function Wh(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((s, n) => Vh(s) + Vh(t[n])));
}
function Vh(t) {
  return t === "auto" ? 0 : 1e3 * Number(t.slice(0, -1).replace(",", "."));
}
function Ll(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight;
}
let Wa = Symbol("_vod"), Fp = Symbol("_vsh"), Ep = { name: "show", beforeMount(t, { value: e }, { transition: s }) {
  t[Wa] = t.style.display === "none" ? "" : t.style.display, s && e ? s.beforeEnter(t) : Ci(t, e);
}, mounted(t, { value: e }, { transition: s }) {
  s && e && s.enter(t);
}, updated(t, { value: e, oldValue: s }, { transition: n }) {
  !e != !s && (n ? e ? (n.beforeEnter(t), Ci(t, !0), n.enter(t)) : n.leave(t, () => {
    Ci(t, !1);
  }) : Ci(t, e));
}, beforeUnmount(t, { value: e }) {
  Ci(t, e);
} };
function Ci(t, e) {
  t.style.display = e ? t[Wa] : "none", t[Fp] = !e;
}
let Ip = Symbol("");
function zb(t) {
  let e = ve();
  if (!e) return;
  let s = e.ut = (i = t(e.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach((o) => zo(o, i));
  }, n = () => {
    let i = t(e.proxy);
    e.ce ? zo(e.ce, i) : function o(a, r) {
      if (128 & a.shapeFlag) {
        let l = a.suspense;
        a = l.activeBranch, l.pendingBranch && !l.isHydrating && l.effects.push(() => {
          o(l.activeBranch, r);
        });
      }
      for (; a.component; ) a = a.component.subTree;
      if (1 & a.shapeFlag && a.el) zo(a.el, r);
      else if (a.type === ee) a.children.forEach((l) => o(l, r));
      else if (a.type === xn) {
        let { el: l, anchor: c } = a;
        for (; l && (zo(l, r), l !== c); ) l = l.nextSibling;
      }
    }(e.subTree, i), s(i);
  };
  kc(() => {
    io(n);
  }), To(() => {
    ni(n, ie, { flush: "post" });
    let i = new MutationObserver(n);
    i.observe(e.subTree.el.parentNode, { childList: !0 }), kr(() => i.disconnect());
  });
}
function zo(t, e) {
  if (t.nodeType === 1) {
    let n = t.style, i = "";
    for (let o in e) {
      var s;
      let a = (s = e[o]) == null ? "initial" : typeof s == "string" ? s === "" ? " " : s : String(s);
      n.setProperty(`--${o}`, a), i += `--${o}: ${a};`;
    }
    n[Ip] = i;
  }
}
let Gb = /(?:^|;)\s*display\s*:/, Hh = /\s*!important$/;
function Li(t, e, s) {
  if (nt(s)) s.forEach((n) => Li(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--")) t.setProperty(e, s);
  else {
    let n = function(i, o) {
      let a = Yr[o];
      if (a) return a;
      let r = Tt(o);
      if (r !== "filter" && r in i) return Yr[o] = r;
      r = Fn(r);
      for (let l = 0; l < zh.length; l++) {
        let c = zh[l] + r;
        if (c in i) return Yr[o] = c;
      }
      return o;
    }(t, e);
    Hh.test(s) ? t.setProperty(Me(n), s.replace(Hh, ""), "important") : t[n] = s;
  }
}
let zh = ["Webkit", "Moz", "ms"], Yr = {}, Gh = "http://www.w3.org/1999/xlink";
function Uh(t, e, s, n, i, o = Ym(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(Gh, e.slice(6, e.length)) : t.setAttributeNS(Gh, e, s) : s == null || o && !(s || s === "") ? t.removeAttribute(e) : t.setAttribute(e, o ? "" : ge(s) ? String(s) : s);
}
function qh(t, e, s, n, i) {
  if (e === "innerHTML" || e === "textContent") {
    s != null && (t[e] = e === "innerHTML" ? Pp(s) : s);
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
let Yh = Symbol("_vei"), Kh = /(?:Once|Passive|Capture)$/, Kr = 0, Ub = Promise.resolve(), Jh = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && 123 > t.charCodeAt(2), Np = (t, e, s, n, i, o) => {
  let a = i === "svg";
  if (e === "class") {
    var r;
    let l;
    r = n, (l = t[li]) && (r = (r ? [r, ...l] : [...l]).join(" ")), r == null ? t.removeAttribute("class") : a ? t.setAttribute("class", r) : t.className = r;
  } else e === "style" ? function(l, c, h) {
    let u = l.style, d = ct(h), f = !1;
    if (h && !d) {
      if (c) if (ct(c)) for (let y of c.split(";")) {
        let b = y.slice(0, y.indexOf(":")).trim();
        h[b] == null && Li(u, b, "");
      }
      else for (let y in c) h[y] == null && Li(u, y, "");
      for (let y in h) {
        var p, g, m, _;
        y === "display" && (f = !0);
        let b = h[y];
        b != null ? (p = l, g = y, m = !ct(c) && c ? c[y] : void 0, _ = b, p.tagName === "TEXTAREA" && (g === "width" || g === "height") && ct(_) && m === _ || Li(u, y, b)) : Li(u, y, "");
      }
    } else if (d) {
      if (c !== h) {
        let y = u[Ip];
        y && (h += ";" + y), u.cssText = h, f = Gb.test(h);
      }
    } else c && l.removeAttribute("style");
    Wa in l && (l[Wa] = f ? u.display : "", l[Fp] && (u.display = "none"));
  }(t, s, n) : On(e) ? cr(e) || function(l, c, h, u = null) {
    let d = l[Yh] || (l[Yh] = {}), f = d[c];
    if (h && f) f.value = h;
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
        bs(l, m, d[c] = (p = h, g = u, (y = (b) => {
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
        }).value = p, y.attached = Kr || (Ub.then(() => Kr = 0), Kr = Date.now()), y), _);
      } else f && (l.removeEventListener(m, f, _), d[c] = void 0);
    }
  }(t, e, n, o) : (e[0] === "." ? (e = e.slice(1), 0) : e[0] === "^" ? (e = e.slice(1), 1) : !function(l, c, h, u) {
    if (u) return !!(c === "innerHTML" || c === "textContent" || c in l && Jh(c) && at(h));
    if (c === "spellcheck" || c === "draggable" || c === "translate" || c === "autocorrect" || c === "sandbox" && l.tagName === "IFRAME" || c === "form" || c === "list" && l.tagName === "INPUT" || c === "type" && l.tagName === "TEXTAREA") return !1;
    if (c === "width" || c === "height") {
      let d = l.tagName;
      if (d === "IMG" || d === "VIDEO" || d === "CANVAS" || d === "SOURCE") return !1;
    }
    return !(Jh(c) && ct(h)) && c in l;
  }(t, e, n, a)) ? t._isVueCE && (function(l, c) {
    let h = l._def.props;
    if (!h) return !1;
    let u = Tt(c);
    return Array.isArray(h) ? h.some((d) => Tt(d) === u) : Object.keys(h).some((d) => Tt(d) === u);
  }(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !ct(n))) ? qh(t, Tt(e), n, o, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), Uh(t, e, n, a)) : (qh(t, e, n), t.tagName.includes("-") || e !== "value" && e !== "checked" && e !== "selected" || Uh(t, e, n, a, o, e !== "value"));
}, Xh = {};
function Bp(t, e, s) {
  let n, i = wc(t, e);
  n = i, jt.call(n) === "[object Object]" && (i = gt({}, i, e));
  class o extends Ar {
    constructor(r) {
      super(i, r, s);
    }
  }
  return o.def = i, o;
}
let qb = (t, e) => Bp(t, e, Kp), Yb = "u" > typeof HTMLElement ? HTMLElement : class {
};
class Ar extends Yb {
  constructor(e, s = {}, n = za) {
    super(), this._def = e, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== za ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow(gt({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot) : this._root = this;
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
    this._connected = !1, ai(() => {
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
      if (a && !nt(a)) for (let l in a) {
        let c = a[l];
        (c === Number || c && c.type === Number) && (l in this._props && (this._props[l] = ti(this._props[l])), (o || (o = /* @__PURE__ */ Object.create(null)))[Tt(l)] = !0);
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
    if (s) for (let n in s) wt(this, n) || Object.defineProperty(this, n, { get: () => Mo(s[n]) });
  }
  _resolveProps(e) {
    let { props: s } = e, n = nt(s) ? s : Object.keys(s || {});
    for (let i of Object.keys(this)) i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (let i of n.map(Tt)) Object.defineProperty(this, i, { get() {
      return this._getProp(i);
    }, set(o) {
      this._setProp(i, o, !0, !this._patching);
    } });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    let s = this.hasAttribute(e), n = s ? this.getAttribute(e) : Xh, i = Tt(e);
    s && this._numberProps && this._numberProps[i] && (n = ti(n)), this._setProp(i, n, !1, !0);
  }
  _getProp(e) {
    return this._props[e];
  }
  _setProp(e, s, n = !0, i = !1) {
    if (s !== this._props[e] && (this._dirty = !0, s === Xh ? delete this._props[e] : (this._props[e] = s, e === "key" && this._app && (this._app._ceVNode.key = s)), i && this._instance && this._update(), n)) {
      let o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Me(e), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Me(e), s + "") : s || this.removeAttribute(Me(e)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    let e = this._createVNode();
    this._app && (e.appContext = this._app._context), Yp(e, this._root);
  }
  _createVNode() {
    let e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    let s = Et(this._def, gt(e, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      let i = (o, a) => {
        let r;
        this.dispatchEvent(new CustomEvent(o, (r = a[0], jt.call(r) === "[object Object]" ? gt({ detail: a }, a[0]) : { detail: a })));
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
function $p(t) {
  let e = ve();
  return e && e.ce || null;
}
function Kb() {
  let t = $p();
  return t && t.shadowRoot;
}
function Jb(t = "$style") {
  {
    let e = ve();
    if (!e) return yt;
    let s = e.type.__cssModules;
    return s && s[t] || yt;
  }
}
let jp = /* @__PURE__ */ new WeakMap(), Wp = /* @__PURE__ */ new WeakMap(), Va = Symbol("_moveCb"), Zh = Symbol("_enterCb"), Xb = (Xr = { name: "TransitionGroup", props: gt({}, Rp, { tag: String, moveClass: String }), setup(t, { slots: e }) {
  let s, n, i = ve(), o = vc();
  return wr(() => {
    if (!s.length) return;
    let a = t.moveClass || `${t.name || "v"}-move`;
    if (!function(l, c, h) {
      let u = l.cloneNode(), d = l[li];
      d && d.forEach((g) => {
        g.split(/\s+/).forEach((m) => m && u.classList.remove(m));
      }), h.split(/\s+/).forEach((g) => g && u.classList.add(g)), u.style.display = "none";
      let f = c.nodeType === 1 ? c : c.parentNode;
      f.appendChild(u);
      let { hasTransform: p } = Op(u);
      return f.removeChild(u), p;
    }(s[0].el, i.vnode.el, a)) {
      s = [];
      return;
    }
    s.forEach(Zb), s.forEach(Qb);
    let r = s.filter(t0);
    Ll(i.vnode.el), r.forEach((l) => {
      let c = l.el, h = c.style;
      Je(c, a), h.transform = h.webkitTransform = h.transitionDuration = "";
      let u = c[Va] = (d) => {
        (!d || d.target === c) && (!d || d.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", u), c[Va] = null, Bs(c, a));
      };
      c.addEventListener("transitionend", u);
    }), s = [];
  }), () => {
    let a = xt(t), r = Lp(a), l = a.tag || ee;
    if (s = [], n) for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.el && h.el instanceof Element && (s.push(h), Ts(h, ri(h, r, o, i)), jp.set(h, Vp(h.el)));
    }
    n = e.default ? Sr(e.default()) : [];
    for (let c = 0; c < n.length; c++) {
      let h = n[c];
      h.key != null && Ts(h, ri(h, r, o, i));
    }
    return Et(l, null, n);
  };
} }, delete Xr.props.mode, Xr);
function Zb(t) {
  let e = t.el;
  e[Va] && e[Va](), e[Zh] && e[Zh]();
}
function Qb(t) {
  Wp.set(t, Vp(t.el));
}
function t0(t) {
  let e = jp.get(t), s = Wp.get(t), n = e.left - s.left, i = e.top - s.top;
  if (n || i) {
    let o = t.el, a = o.style, r = o.getBoundingClientRect(), l = 1, c = 1;
    return o.offsetWidth && (l = r.width / o.offsetWidth), o.offsetHeight && (c = r.height / o.offsetHeight), Number.isFinite(l) && l !== 0 || (l = 1), Number.isFinite(c) && c !== 0 || (c = 1), 0.01 > Math.abs(l - 1) && (l = 1), 0.01 > Math.abs(c - 1) && (c = 1), a.transform = a.webkitTransform = `translate(${n / l}px,${i / c}px)`, a.transitionDuration = "0s", t;
  }
}
function Vp(t) {
  let e = t.getBoundingClientRect();
  return { left: e.left, top: e.top };
}
let Ys = (t) => {
  let e = t.props["onUpdate:modelValue"] || !1;
  return nt(e) ? (s) => Qn(e, s) : e;
};
function e0(t) {
  t.target.composing = !0;
}
function Qh(t) {
  let e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
let We = Symbol("_assign");
function tu(t, e, s) {
  return e && (t = t.trim()), s && (t = dr(t)), t;
}
let Ha = { created(t, { modifiers: { lazy: e, trim: s, number: n } }, i) {
  t[We] = Ys(i);
  let o = n || i.props && i.props.type === "number";
  bs(t, e ? "change" : "input", (a) => {
    a.target.composing || t[We](tu(t.value, s, o));
  }), (s || o) && bs(t, "change", () => {
    t.value = tu(t.value, s, o);
  }), e || (bs(t, "compositionstart", e0), bs(t, "compositionend", Qh), bs(t, "change", Qh));
}, mounted(t, { value: e }) {
  t.value = e ?? "";
}, beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: i, number: o } }, a) {
  if (t[We] = Ys(a), t.composing) return;
  let r = (o || t.type === "number") && !/^0\d/.test(t.value) ? dr(t.value) : t.value, l = e ?? "";
  if (r === l) return;
  let c = t.getRootNode();
  (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === t && t.type !== "range" && (n && e === s || i && t.value.trim() === l) || (t.value = l);
} }, Ic = { deep: !0, created(t, e, s) {
  t[We] = Ys(s), bs(t, "change", () => {
    let n = t._modelValue, i = ci(t), o = t.checked, a = t[We];
    if (nt(n)) {
      let r = pr(n, i), l = r !== -1;
      if (o && !l) a(n.concat(i));
      else if (!o && l) {
        let c = [...n];
        c.splice(r, 1), a(c);
      }
    } else {
      let r;
      if (r = n, jt.call(r) === "[object Set]") {
        let l = new Set(n);
        o ? l.add(i) : l.delete(i), a(l);
      } else a(zp(t, o));
    }
  });
}, mounted: eu, beforeUpdate(t, e, s) {
  t[We] = Ys(s), eu(t, e, s);
} };
function eu(t, { value: e, oldValue: s }, n) {
  let i;
  if (t._modelValue = e, nt(e)) i = pr(e, n.props.value) > -1;
  else {
    let o;
    if (o = e, jt.call(o) === "[object Set]") i = e.has(n.props.value);
    else {
      if (e === s) return;
      i = Ms(e, zp(t, !0));
    }
  }
  t.checked !== i && (t.checked = i);
}
let Nc = { created(t, { value: e }, s) {
  t.checked = Ms(e, s.props.value), t[We] = Ys(s), bs(t, "change", () => {
    t[We](ci(t));
  });
}, beforeUpdate(t, { value: e, oldValue: s }, n) {
  t[We] = Ys(n), e !== s && (t.checked = Ms(e, n.props.value));
} }, Hp = { deep: !0, created(t, { value: e, modifiers: { number: s } }, n) {
  let i, o = (i = e, jt.call(i) === "[object Set]");
  bs(t, "change", () => {
    let a = Array.prototype.filter.call(t.options, (r) => r.selected).map((r) => s ? dr(ci(r)) : ci(r));
    t[We](t.multiple ? o ? new Set(a) : a : a[0]), t._assigning = !0, ai(() => {
      t._assigning = !1;
    });
  }), t[We] = Ys(n);
}, mounted(t, { value: e }) {
  su(t, e);
}, beforeUpdate(t, e, s) {
  t[We] = Ys(s);
}, updated(t, { value: e }) {
  t._assigning || su(t, e);
} };
function su(t, e) {
  let s, n = t.multiple, i = nt(e);
  if (!n || i || (s = e, jt.call(s) === "[object Set]")) {
    for (let o = 0, a = t.options.length; o < a; o++) {
      let r = t.options[o], l = ci(r);
      if (n) if (i) {
        let c = typeof l;
        c === "string" || c === "number" ? r.selected = e.some((h) => String(h) === String(l)) : r.selected = pr(e, l) > -1;
      } else r.selected = e.has(l);
      else if (Ms(ci(r), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    n || t.selectedIndex === -1 || (t.selectedIndex = -1);
  }
}
function ci(t) {
  return "_value" in t ? t._value : t.value;
}
function zp(t, e) {
  let s = e ? "_trueValue" : "_falseValue";
  return s in t ? t[s] : e;
}
let Gp = { created(t, e, s) {
  Go(t, e, s, null, "created");
}, mounted(t, e, s) {
  Go(t, e, s, null, "mounted");
}, beforeUpdate(t, e, s, n) {
  Go(t, e, s, n, "beforeUpdate");
}, updated(t, e, s, n) {
  Go(t, e, s, n, "updated");
} };
function Up(t, e) {
  switch (t) {
    case "SELECT":
      return Hp;
    case "TEXTAREA":
      return Ha;
    default:
      switch (e) {
        case "checkbox":
          return Ic;
        case "radio":
          return Nc;
        default:
          return Ha;
      }
  }
}
function Go(t, e, s, n, i) {
  let o = Up(t.tagName, s.props && s.props.type)[i];
  o && o(t, e, s, n);
}
let s0 = ["ctrl", "shift", "alt", "meta"], n0 = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => s0.some((s) => t[`${s}Key`] && !e.includes(s)) }, i0 = (t, e) => {
  if (!t) return t;
  let s = t._withMods || (t._withMods = {}), n = e.join(".");
  return s[n] || (s[n] = (i, ...o) => {
    for (let a = 0; a < e.length; a++) {
      let r = n0[e[a]];
      if (r && r(i, e)) return;
    }
    return t(i, ...o);
  });
}, o0 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" }, a0 = (t, e) => {
  let s = t._withKeys || (t._withKeys = {}), n = e.join(".");
  return s[n] || (s[n] = (i) => {
    if (!("key" in i)) return;
    let o = Me(i.key);
    if (e.some((a) => a === o || o0[a] === o)) return t(i);
  });
}, Bc = gt({ patchProp: Np }, Tp), nu = !1;
function qp() {
  return yn = nu ? yn : lp(Bc), nu = !0, yn;
}
let Yp = (...t) => {
  (yn || (yn = Rc(Bc))).render(...t);
}, r0 = (...t) => {
  qp().hydrate(...t);
}, za = (...t) => {
  let e = (yn || (yn = Rc(Bc))).createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = Xp(n);
    if (!i) return;
    let o = e._component;
    at(o) || o.render || o.template || (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    let a = s(i, !1, Jp(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), a;
  }, e;
}, Kp = (...t) => {
  let e = qp().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    let i = Xp(n);
    if (i) return s(i, !0, Jp(i));
  }, e;
};
function Jp(t) {
  return t instanceof SVGElement ? "svg" : typeof MathMLElement == "function" && t instanceof MathMLElement ? "mathml" : void 0;
}
function Xp(t) {
  return ct(t) ? document.querySelector(t) : t;
}
let iu = !1, l0 = () => {
  iu || (iu = !0, Ha.getSSRProps = ({ value: t }) => ({ value: t }), Nc.getSSRProps = ({ value: t }, e) => {
    if (e.props && Ms(e.props.value, t)) return { checked: !0 };
  }, Ic.getSSRProps = ({ value: t }, e) => {
    if (nt(t)) {
      if (e.props && pr(t, e.props.value) > -1) return { checked: !0 };
    } else {
      let s;
      if (s = t, jt.call(s) === "[object Set]") {
        if (e.props && t.has(e.props.value)) return { checked: !0 };
      } else if (t) return { checked: !0 };
    }
  }, Gp.getSSRProps = (t, e) => {
    if (typeof e.type != "string") return;
    let s = Up(e.type.toUpperCase(), e.props && e.props.type);
    if (s.getSSRProps) return s.getSSRProps(t, e);
  }, Ep.getSSRProps = ({ value: t }) => {
    if (!t) return { style: { display: "none" } };
  });
};
var Jr, Xr, ou, c0 = Object.freeze({ __proto__: null, BaseTransition: Vf, BaseTransitionPropsValidators: Sc, Comment: Gt, DeprecationTypes: Wb, EffectScope: gc, ErrorCodes: My, ErrorTypeStrings: Eb, Fragment: ee, KeepAlive: qy, ReactiveEffect: eo, Static: xn, Suspense: Cb, Teleport: Ey, Text: Us, TrackOpTypes: Sy, Transition: Vb, TransitionGroup: Xb, TriggerOpTypes: wy, VueElement: Ar, assertNumber: ky, callWithAsyncErrorHandling: Ve, callWithErrorHandling: mi, camelize: Tt, capitalize: Fn, cloneVNode: as, compatUtils: jb, computed: Cp, createApp: za, createBlock: ja, createCommentVNode: mp, createElementBlock: kb, createElementVNode: Oc, createHydrationRenderer: lp, createPropsRestProxy: fb, createRenderer: Rc, createSSRApp: Kp, createSlots: Zy, createStaticVNode: Ab, createTextVNode: Fc, createVNode: Et, customRef: Tf, defineAsyncComponent: Uy, defineComponent: wc, defineCustomElement: Bp, defineEmits: nb, defineExpose: ib, defineModel: rb, defineOptions: ob, defineProps: sb, defineSSRCustomElement: qb, defineSlots: ab, devtools: Ib, effect: Xm, effectScope: Km, getCurrentInstance: ve, getCurrentScope: uf, getCurrentWatcher: Cy, getTransitionRawChildren: Sr, guardReactiveProps: gp, h: kp, handleError: En, hasInjectionContext: Ry, hydrate: r0, hydrateOnIdle: Vy, hydrateOnInteraction: Gy, hydrateOnMediaQuery: zy, hydrateOnVisible: Hy, initCustomFormatter: Lb, initDirectivesForSSR: l0, inject: zi, isMemoSame: Mp, isProxy: ko, isReactive: ws, isReadonly: os, isRef: Kt, isRuntimeOnly: Db, isShallow: Te, isVNode: Ds, markRaw: Mf, mergeDefaults: ub, mergeModels: db, mergeProps: yp, nextTick: ai, nodeOps: Tp, normalizeClass: Co, normalizeProps: Hm, normalizeStyle: wo, onActivated: zf, onBeforeMount: qf, onBeforeUnmount: Cr, onBeforeUpdate: kc, onDeactivated: Gf, onErrorCaptured: Xf, onMounted: To, onRenderTracked: Jf, onRenderTriggered: Kf, onScopeDispose: Jm, onServerPrefetch: Yf, onUnmounted: kr, onUpdated: wr, onWatcherCleanup: Rf, openBlock: ro, patchProp: Np, popScopeId: Py, provide: Ff, proxyRefs: bc, pushScopeId: Ay, queuePostFlushCb: io, reactive: _r, readonly: Ra, ref: Vi, registerRuntimeCompiler: vp, render: Yp, renderList: Xy, renderSlot: Qy, resolveComponent: Yy, resolveDirective: Jy, resolveDynamicComponent: Ky, resolveFilter: $b, resolveTransitionHooks: ri, setBlockTracking: lo, setDevtoolsHook: Nb, setTransitionHooks: Ts, shallowReactive: kf, shallowReadonly: dy, shallowRef: Af, ssrContextKey: Ef, ssrUtils: Bb, stop: Zm, toDisplayString: cf, toHandlerKey: Zn, toHandlers: tb, toRaw: xt, toRef: xy, toRefs: by, toValue: gy, transformVNodeArgs: Mb, triggerRef: py, unref: Mo, useAttrs: hb, useCssModule: Jb, useCssVars: zb, useHost: $p, useId: Iy, useModel: yb, useSSRContext: If, useShadowRoot: Kb, useSlots: cb, useTemplateRef: Ny, useTransitionState: vc, vModelCheckbox: Ic, vModelDynamic: Gp, vModelRadio: Nc, vModelSelect: Hp, vModelText: Ha, vShow: Ep, version: Ap, warn: Fb, watch: ni, watchEffect: Ly, watchPostEffect: Oy, watchSyncEffect: Nf, withAsyncContext: pb, withCtx: xc, withDefaults: lb, withDirectives: Dy, withKeys: a0, withMemo: Ob, withModifiers: i0, withScopeId: Ty });
let ho = Symbol(""), Yi = Symbol(""), $c = Symbol(""), Ga = Symbol(""), Zp = Symbol(""), An = Symbol(""), Pn = Symbol(""), Tn = Symbol(""), Ks = Symbol(""), Js = Symbol(""), Ro = Symbol(""), jc = Symbol(""), Qp = Symbol(""), Wc = Symbol(""), Ol = Symbol(""), Vc = Symbol(""), h0 = Symbol(""), Hc = Symbol(""), zc = Symbol(""), tg = Symbol(""), eg = Symbol(""), Pr = Symbol(""), Ua = Symbol(""), Gc = Symbol(""), Uc = Symbol(""), uo = Symbol(""), Lo = Symbol(""), qc = Symbol(""), Fl = Symbol(""), u0 = Symbol(""), El = Symbol(""), qa = Symbol(""), d0 = Symbol(""), f0 = Symbol(""), Yc = Symbol(""), p0 = Symbol(""), g0 = Symbol(""), Kc = Symbol(""), sg = Symbol(""), hi = { [ho]: "Fragment", [Yi]: "Teleport", [$c]: "Suspense", [Ga]: "KeepAlive", [Zp]: "BaseTransition", [An]: "openBlock", [Pn]: "createBlock", [Tn]: "createElementBlock", [Ks]: "createVNode", [Js]: "createElementVNode", [Ro]: "createCommentVNode", [jc]: "createTextVNode", [Qp]: "createStaticVNode", [Wc]: "resolveComponent", [Ol]: "resolveDynamicComponent", [Vc]: "resolveDirective", [h0]: "resolveFilter", [Hc]: "withDirectives", [zc]: "renderList", [tg]: "renderSlot", [eg]: "createSlots", [Pr]: "toDisplayString", [Ua]: "mergeProps", [Gc]: "normalizeClass", [Uc]: "normalizeStyle", [uo]: "normalizeProps", [Lo]: "guardReactiveProps", [qc]: "toHandlers", [Fl]: "camelize", [u0]: "capitalize", [El]: "toHandlerKey", [qa]: "setBlockTracking", [d0]: "pushScopeId", [f0]: "popScopeId", [Yc]: "withCtx", [p0]: "unref", [g0]: "isRef", [Kc]: "withMemo", [sg]: "isMemoSame" }, Fe = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
function fo(t, e, s, n, i, o, a, r = !1, l = !1, c = !1, h = Fe) {
  var u, d, f, p;
  return t && (r ? (t.helper(An), t.helper((u = t.inSSR, d = c, u || d ? Pn : Tn))) : t.helper((f = t.inSSR, p = c, f || p ? Ks : Js)), a && t.helper(Hc)), { type: 13, tag: e, props: s, children: n, patchFlag: i, dynamicProps: o, directives: a, isBlock: r, disableTracking: l, isComponent: c, loc: h };
}
function vn(t, e = Fe) {
  return { type: 17, loc: e, elements: t };
}
function je(t, e = Fe) {
  return { type: 15, loc: e, properties: t };
}
function Yt(t, e) {
  return { type: 16, loc: Fe, key: ct(t) ? ft(t, !0) : t, value: e };
}
function ft(t, e = !1, s = Fe, n = 0) {
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
function Il(t, e, s, n = !0) {
  return { type: 19, test: t, consequent: e, alternate: s, newline: n, loc: Fe };
}
function Jc(t, { helper: e, removeHelper: s, inSSR: n }) {
  if (!t.isBlock) {
    var i, o;
    t.isBlock = !0, s((i = t.isComponent, n || i ? Ks : Js)), e(An), e((o = t.isComponent, n || o ? Pn : Tn));
  }
}
let au = new Uint8Array([123, 123]), ru = new Uint8Array([125, 125]);
function lu(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function Re(t) {
  return t === 32 || t === 10 || t === 9 || t === 12 || t === 13;
}
function Es(t) {
  return t === 47 || t === 62 || Re(t);
}
function Ya(t) {
  let e = new Uint8Array(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}
let re = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
function Nl(t) {
  throw t;
}
function ng(t) {
}
function Pt(t, e, s, n) {
  let i = SyntaxError(`https://vuejs.org/error-reference/#compiler-${t}`);
  return i.code = t, i.loc = e, i;
}
let Pe = (t) => t.type === 4 && t.isStatic;
function ig(t) {
  switch (t) {
    case "Teleport":
    case "teleport":
      return Yi;
    case "Suspense":
    case "suspense":
      return $c;
    case "KeepAlive":
    case "keep-alive":
      return Ga;
    case "BaseTransition":
    case "base-transition":
      return Zp;
  }
}
let Bl = /^$|^\d|[^\$\w\xA0-\uFFFF]/, og = /[A-Za-z_$\xA0-\uFFFF]/, m0 = /[\.\?\w$\xA0-\uFFFF]/, y0 = /\s+[.[]\s*|\s*[.[]\s+/g, ag = (t) => t.type === 4 ? t.content : t.loc.source, rg = (t) => {
  let e = ag(t).trim().replace(y0, (r) => r.trim()), s = 0, n = [], i = 0, o = 0, a = null;
  for (let r = 0; r < e.length; r++) {
    let l = e.charAt(r);
    switch (s) {
      case 0:
        if (l === "[") n.push(s), s = 1, i++;
        else if (l === "(") n.push(s), s = 2, o++;
        else if (!(r === 0 ? og : m0).test(l)) return !1;
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
}, b0 = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
function $e(t, e, s = !1) {
  for (let n = 0; n < t.props.length; n++) {
    let i = t.props[n];
    if (i.type === 7 && (s || i.exp) && (ct(e) ? i.name === e : e.test(i.name))) return i;
  }
}
function Tr(t, e, s = !1, n = !1) {
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
function Zr(t) {
  return t.type === 5 || t.type === 2;
}
function cu(t) {
  return t.type === 7 && t.name === "pre";
}
function _0(t) {
  return t.type === 7 && t.name === "slot";
}
function Ka(t) {
  return t.type === 1 && t.tagType === 3;
}
function Ja(t) {
  return t.type === 1 && t.tagType === 2;
}
let x0 = /* @__PURE__ */ new Set([uo, Lo]);
function Xa(t, e, s) {
  let n, i, o = t.type === 13 ? t.props : t.arguments[2], a = [];
  if (o && !ct(o) && o.type === 14) {
    let r = function l(c, h = []) {
      if (c && !ct(c) && c.type === 14) {
        let u = c.callee;
        if (!ct(u) && x0.has(u)) return l(c.arguments[0], h.concat(c));
      }
      return [c, h];
    }(o);
    o = r[0], i = (a = r[1])[a.length - 1];
  }
  if (o == null || ct(o)) n = je([e]);
  else if (o.type === 14) {
    let r = o.arguments[0];
    ct(r) || r.type !== 15 ? o.callee === qc ? n = Xt(s.helper(Ua), [je([e]), o]) : o.arguments.unshift(je([e])) : hu(e, r) || r.properties.unshift(e), n || (n = o);
  } else o.type === 15 ? (hu(e, o) || o.properties.unshift(e), n = o) : (n = Xt(s.helper(Ua), [je([e]), o]), i && i.callee === Lo && (i = a[a.length - 2]));
  t.type === 13 ? i ? i.arguments[0] = n : t.props = n : i ? i.arguments[0] = n : t.arguments[2] = n;
}
function hu(t, e) {
  let s = !1;
  if (t.key.type === 4) {
    let n = t.key.content;
    s = e.properties.some((i) => i.key.type === 4 && i.key.content === n);
  }
  return s;
}
function $l(t, e) {
  return `_${e}_${t.replace(/[^\w]/g, (s, n) => s === "-" ? "_" : t.charCodeAt(n).toString())}`;
}
let v0 = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function lg(t) {
  for (let e = 0; e < t.length; e++) if (!Re(t.charCodeAt(e))) return !1;
  return !0;
}
function Xc(t) {
  return t.type === 2 && lg(t.content) || t.type === 12 && Xc(t.content);
}
function cg(t) {
  return t.type === 3 || Xc(t);
}
let hg = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: () => 0, isVoidTag: Un, isPreTag: Un, isIgnoreNewlineTag: Un, isCustomElement: Un, onError: Nl, onWarn: ng, comments: !1, prefixIdentifiers: !1 }, Lt = hg, Za = null, ks = "", he = null, Ct = null, De = "", cs = -1, hn = -1, Zc = 0, fn = !1, jl = null, Bt = [], zt = new class {
  constructor(t, e) {
    this.stack = t, this.cbs = e, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = au, this.delimiterClose = ru, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = au, this.delimiterClose = ru;
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
    if (e ? Es(t) : (32 | t) === this.currentSequence[this.sequenceIndex]) {
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
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : lu(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    Es(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (Es(t)) {
      let e = this.buffer.slice(this.sectionStart, this.index);
      e !== "template" && this.enterRCDATA(Ya("</" + e), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    Re(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = lu(t) ? 9 : 27, this.sectionStart = this.index));
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
    (t === 61 || Es(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || Es(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || Es(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || Es(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || Es(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
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
  Uo(le(t, e), t, e);
}, ontextentity(t, e, s) {
  Uo(t, e, s);
}, oninterpolation(t, e) {
  if (fn) return Uo(le(t, e), t, e);
  let s = t + zt.delimiterOpen.length, n = e - zt.delimiterClose.length;
  for (; Re(ks.charCodeAt(s)); ) s++;
  for (; Re(ks.charCodeAt(n - 1)); ) n--;
  let i = le(s, n);
  i.includes("&") && (i = Lt.decodeEntities(i, !1)), Wl({ type: 5, content: qo(i, !1, Ht(s, n)), loc: Ht(t, e) });
}, onopentagname(t, e) {
  let s = le(t, e);
  he = { type: 1, tag: s, ns: Lt.getNamespace(s, Bt[0], Lt.ns), tagType: 0, props: [], children: [], loc: Ht(t - 1, e), codegenNode: void 0 };
}, onopentagend(t) {
  du(t);
}, onclosetag(t, e) {
  let s = le(t, e);
  if (!Lt.isVoidTag(s)) {
    let n = !1;
    for (let i = 0; i < Bt.length; i++) if (Bt[i].tag.toLowerCase() === s.toLowerCase()) {
      n = !0, i > 0 && Bt[0].loc.start.offset;
      for (let o = 0; o <= i; o++) ba(Bt.shift(), e, o < i);
      break;
    }
    n || ug(t, 60);
  }
}, onselfclosingtag(t) {
  let e = he.tag;
  he.isSelfClosing = !0, du(t), Bt[0] && Bt[0].tag === e && ba(Bt.shift(), t);
}, onattribname(t, e) {
  Ct = { type: 6, name: le(t, e), nameLoc: Ht(t, e), value: void 0, loc: Ht(t) };
}, ondirname(t, e) {
  let s = le(t, e), n = s === "." || s === ":" ? "bind" : s === "@" ? "on" : s === "#" ? "slot" : s.slice(2);
  if (fn || n === "") Ct = { type: 6, name: s, nameLoc: Ht(t, e), value: void 0, loc: Ht(t) };
  else if (Ct = { type: 7, name: n, rawName: s, exp: void 0, arg: void 0, modifiers: s === "." ? [ft("prop")] : [], loc: Ht(t) }, n === "pre") {
    fn = zt.inVPre = !0, jl = he;
    let i = he.props;
    for (let o = 0; o < i.length; o++) i[o].type === 7 && (i[o] = function(a) {
      let r = { type: 6, name: a.rawName, nameLoc: Ht(a.loc.start.offset, a.loc.start.offset + a.rawName.length), value: void 0, loc: a.loc };
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
  if (fn && !cu(Ct)) Ct.name += s, pn(Ct.nameLoc, e);
  else {
    let n = s[0] !== "[";
    Ct.arg = qo(n ? s : s.slice(1, -1), n, Ht(t, e), 3 * !!n);
  }
}, ondirmodifier(t, e) {
  let s = le(t, e);
  if (fn && !cu(Ct)) Ct.name += "." + s, pn(Ct.nameLoc, e);
  else if (Ct.name === "slot") {
    let n = Ct.arg;
    n && (n.content += "." + s, pn(n.loc, e));
  } else {
    let n = ft(s, !0, Ht(t, e));
    Ct.modifiers.push(n);
  }
}, onattribdata(t, e) {
  De += le(t, e), cs < 0 && (cs = t), hn = e;
}, onattribentity(t, e, s) {
  De += t, cs < 0 && (cs = e), hn = s;
}, onattribnameend(t) {
  let e = le(Ct.loc.start.offset, t);
  Ct.type === 7 && (Ct.rawName = e), he.props.some((s) => (s.type === 7 ? s.rawName : s.name) === e);
}, onattribend(t, e) {
  he && Ct && (pn(Ct.loc, e), t !== 0 && (De.includes("&") && (De = Lt.decodeEntities(De, !0)), Ct.type === 6 ? (Ct.name === "class" && (De = fg(De).trim()), Ct.value = { type: 2, content: De, loc: t === 1 ? Ht(cs, hn) : Ht(cs - 1, hn + 1) }, zt.inSFCRoot && he.tag === "template" && Ct.name === "lang" && De && De !== "html" && zt.enterRCDATA(Ya("</template"), 0)) : (Ct.exp = qo(De, !1, Ht(cs, hn), 0, 0), Ct.name === "for" && (Ct.forParseResult = function(s) {
    let n = s.loc, i = s.content, o = i.match(v0);
    if (!o) return;
    let [, a, r] = o, l = (f, p, g = !1) => {
      let m = n.start.offset + p, _ = m + f.length;
      return qo(f, !1, Ht(m, _), 0, +!!g);
    }, c = { source: l(r.trim(), i.indexOf(r, a.length)), value: void 0, key: void 0, index: void 0, finalized: !1 }, h = a.trim().replace(S0, "").trim(), u = a.indexOf(h), d = h.match(uu);
    if (d) {
      let f;
      h = h.replace(uu, "").trim();
      let p = d[1].trim();
      if (p && (f = i.indexOf(p, u + h.length), c.key = l(p, f, !0)), d[2]) {
        let g = d[2].trim();
        g && (c.index = l(g, i.indexOf(g, c.key ? f + p.length : u + h.length), !0));
      }
    }
    return h && (c.value = l(h, u, !0)), c;
  }(Ct.exp)))), (Ct.type !== 7 || Ct.name !== "pre") && he.props.push(Ct)), De = "", cs = hn = -1;
}, oncomment(t, e) {
  Lt.comments && Wl({ type: 3, content: le(t, e), loc: Ht(t - 4, e + 3) });
}, onend() {
  let t = ks.length;
  for (let e = 0; e < Bt.length; e++) ba(Bt[e], t - 1), Bt[e].loc.start.offset;
}, oncdata(t, e) {
  Bt[0].ns !== 0 && Uo(le(t, e), t, e);
}, onprocessinginstruction(t) {
  (Bt[0] ? Bt[0].ns : Lt.ns) === 0 && fu(21, t - 1);
} }), uu = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, S0 = /^\(|\)$/g;
function le(t, e) {
  return ks.slice(t, e);
}
function du(t) {
  zt.inSFCRoot && (he.innerLoc = Ht(t + 1, t + 1)), Wl(he);
  let { tag: e, ns: s } = he;
  s === 0 && Lt.isPreTag(e) && Zc++, Lt.isVoidTag(e) ? ba(he, t) : (Bt.unshift(he), (s === 1 || s === 2) && (zt.inXML = !0)), he = null;
}
function Uo(t, e, s) {
  {
    let o = Bt[0] && Bt[0].tag;
    o !== "script" && o !== "style" && t.includes("&") && (t = Lt.decodeEntities(t, !1));
  }
  let n = Bt[0] || Za, i = n.children[n.children.length - 1];
  i && i.type === 2 ? (i.content += t, pn(i.loc, s)) : n.children.push({ type: 2, content: t, loc: Ht(e, s) });
}
function ba(t, e, s = !1) {
  s ? pn(t.loc, ug(e, 60)) : pn(t.loc, function(a) {
    let r = a;
    for (; ks.charCodeAt(r) !== 62 && r < ks.length - 1; ) r++;
    return r;
  }(e) + 1), zt.inSFCRoot && (t.children.length ? t.innerLoc.end = gt({}, t.children[t.children.length - 1].loc.end) : t.innerLoc.end = gt({}, t.innerLoc.start), t.innerLoc.source = le(t.innerLoc.start.offset, t.innerLoc.end.offset));
  let { tag: n, ns: i, children: o } = t;
  if (!fn && (n === "slot" ? t.tagType = 2 : function({ tag: a, props: r }) {
    if (a === "template") {
      for (let l = 0; l < r.length; l++) if (r[l].type === 7 && w0.has(r[l].name)) return !0;
    }
    return !1;
  }(t) ? t.tagType = 3 : function({ tag: a, props: r }) {
    var l;
    if (Lt.isCustomElement(a)) return !1;
    if (a === "component" || (l = a.charCodeAt(0)) > 64 && l < 91 || ig(a) || Lt.isBuiltInComponent && Lt.isBuiltInComponent(a) || Lt.isNativeTag && !Lt.isNativeTag(a)) return !0;
    for (let c = 0; c < r.length; c++) {
      let h = r[c];
      if (h.type === 6 && h.name === "is" && h.value && h.value.content.startsWith("vue:")) return !0;
    }
    return !1;
  }(t) && (t.tagType = 1)), zt.inRCDATA || (t.children = dg(o)), i === 0 && Lt.isIgnoreNewlineTag(n)) {
    let a = o[0];
    a && a.type === 2 && (a.content = a.content.replace(/^\r?\n/, ""));
  }
  i === 0 && Lt.isPreTag(n) && Zc--, jl === t && (fn = zt.inVPre = !1, jl = null), zt.inXML && (Bt[0] ? Bt[0].ns : Lt.ns) === 0 && (zt.inXML = !1);
}
function ug(t, e) {
  let s = t;
  for (; ks.charCodeAt(s) !== e && s >= 0; ) s--;
  return s;
}
let w0 = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]), C0 = /\r\n/g;
function dg(t) {
  let e = Lt.whitespace !== "preserve", s = !1;
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    if (i.type === 2) if (Zc) i.content = i.content.replace(C0, `
`);
    else if (lg(i.content)) {
      let o = t[n - 1] && t[n - 1].type, a = t[n + 1] && t[n + 1].type;
      !o || !a || e && (o === 3 && (a === 3 || a === 1) || o === 1 && (a === 3 || a === 1 && function(r) {
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
function Wl(t) {
  (Bt[0] || Za).children.push(t);
}
function Ht(t, e) {
  return { start: zt.getPos(t), end: e == null ? e : zt.getPos(e), source: e == null ? e : le(t, e) };
}
function pn(t, e) {
  t.end = zt.getPos(e), t.source = le(t.start.offset, e);
}
function qo(t, e = !1, s, n = 0, i = 0) {
  return ft(t, e, s, n);
}
function fu(t, e, s) {
  Lt.onError(Pt(t, Ht(e, e)));
}
function pu(t) {
  let e = t.children.filter((s) => s.type !== 3);
  return e.length !== 1 || e[0].type !== 1 || Ja(e[0]) ? null : e[0];
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
        let h = 3, u = pg(t, e);
        if (u === 0) return s.set(t, 0), 0;
        u < h && (h = u);
        for (let d = 0; d < t.children.length; d++) {
          let f = Oe(t.children[d], e);
          if (f === 0) return s.set(t, 0), 0;
          f < h && (h = f);
        }
        if (h > 1) for (let d = 0; d < t.props.length; d++) {
          let f = t.props[d];
          if (f.type === 7 && f.name === "bind" && f.exp) {
            let p = Oe(f.exp, e);
            if (p === 0) return s.set(t, 0), 0;
            p < h && (h = p);
          }
        }
        if (l.isBlock) {
          var n, i, o, a;
          for (let d = 0; d < t.props.length; d++) if (t.props[d].type === 7) return s.set(t, 0), 0;
          e.removeHelper(An), e.removeHelper((n = e.inSSR, i = l.isComponent, n || i ? Pn : Tn)), l.isBlock = !1, e.helper((o = e.inSSR, a = l.isComponent, o || a ? Ks : Js));
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
let k0 = /* @__PURE__ */ new Set([Gc, Uc, uo, Lo]);
function pg(t, e) {
  let s = 3, n = gg(t);
  if (n && n.type === 15) {
    let { properties: i } = n;
    for (let o = 0; o < i.length; o++) {
      let a, { key: r, value: l } = i[o], c = Oe(r, e);
      if (c === 0) return c;
      if (c < s && (s = c), (a = l.type === 4 ? Oe(l, e) : l.type === 14 ? function h(u, d) {
        if (u.type === 14 && !ct(u.callee) && k0.has(u.callee)) {
          let f = u.arguments[0];
          if (f.type === 4) return Oe(f, d);
          if (f.type === 14) return h(f, d);
        }
        return 0;
      }(l, e) : 0) === 0) return a;
      a < s && (s = a);
    }
  }
  return s;
}
function gg(t) {
  let e = t.codegenNode;
  if (e.type === 13) return e.props;
}
function Qa(t, e) {
  e.currentNode = t;
  let { nodeTransforms: s } = e, n = [];
  for (let a = 0; a < s.length; a++) {
    let r = s[a](t, e);
    if (r && (nt(r) ? n.push(...r) : n.push(r)), !e.currentNode) return;
    t = e.currentNode;
  }
  switch (t.type) {
    case 3:
      e.ssr || e.helper(Ro);
      break;
    case 5:
      e.ssr || e.helper(Pr);
      break;
    case 9:
      for (let l = 0; l < t.branches.length; l++) Qa(t.branches[l], e);
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
        ct(l) || (e.grandParent = e.parent, e.parent = i, e.childIndex = a, e.onNodeRemoved = r, Qa(l, e));
      }
  }
  e.currentNode = t;
  let o = n.length;
  for (; o--; ) n[o]();
}
function mg(t, e) {
  let s = ct(t) ? (n) => n === t : (n) => t.test(n);
  return (n, i) => {
    if (n.type === 1) {
      let { props: o } = n;
      if (n.tagType === 3 && o.some(_0)) return;
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
let Yo = "/*@__PURE__*/", gu = (t) => `${hi[t]}: _${hi[t]}`;
function mu(t, e, { helper: s, push: n, newline: i, isTS: o }) {
  let a = s(e === "component" ? Wc : Vc);
  for (let r = 0; r < t.length; r++) {
    let l = t[r], c = l.endsWith("__self");
    c && (l = l.slice(0, -6)), n(`const ${$l(l, e)} = ${a}(${JSON.stringify(l)}${c ? ", true" : ""})${o ? "!" : ""}`), r < t.length - 1 && i();
  }
}
function Vl(t, e) {
  let s = t.length > 3;
  e.push("["), s && e.indent(), Oi(t, e, s), s && e.deindent(), e.push("]");
}
function Oi(t, e, s = !1, n = !0) {
  let { push: i, newline: o } = e;
  for (let a = 0; a < t.length; a++) {
    let r = t[a];
    ct(r) ? i(r, -3) : nt(r) ? Vl(r, e) : _e(r, e), a < t.length - 1 && (s ? (n && i(","), o()) : n && i(", "));
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
      yu(t, e);
      break;
    case 5:
      (function(o, a) {
        let { push: r, helper: l, pure: c } = a;
        c && r(Yo), r(`${l(Pr)}(`), _e(o.content, a), r(")");
      })(t, e);
      break;
    case 8:
      bu(t, e);
      break;
    case 3:
      (function(o, a) {
        let { push: r, helper: l, pure: c } = a;
        c && r(Yo), r(`${l(Ro)}(${JSON.stringify(o.content)})`, -3, o);
      })(t, e);
      break;
    case 13:
      (function(o, a) {
        var r, l;
        let c, { push: h, helper: u, pure: d } = a, { tag: f, props: p, children: g, patchFlag: m, dynamicProps: _, directives: y, isBlock: b, disableTracking: v, isComponent: w } = o;
        m && (c = String(m)), y && h(u(Hc) + "("), b && h(`(${u(An)}(${v ? "true" : ""}), `), d && h(Yo), h(u(b ? (r = a.inSSR, r || w ? Pn : Tn) : (l = a.inSSR, l || w ? Ks : Js)) + "(", -2, o), Oi(function(S) {
          let x = S.length;
          for (; x-- && S[x] == null; ) ;
          return S.slice(0, x + 1).map((k) => k || "null");
        }([f, p, g, c, _]), a), h(")"), b && h(")"), y && (h(", "), _e(y, a), h(")"));
      })(t, e);
      break;
    case 14:
      (function(o, a) {
        let { push: r, helper: l, pure: c } = a, h = ct(o.callee) ? o.callee : l(o.callee);
        c && r(Yo), r(h + "(", -2, o), Oi(o.arguments, a), r(")");
      })(t, e);
      break;
    case 15:
      (function(o, a) {
        let { push: r, indent: l, deindent: c, newline: h } = a, { properties: u } = o;
        if (!u.length) return r("{}", -2, o);
        let d = u.length > 1;
        r(d ? "{" : "{ "), d && l();
        for (let f = 0; f < u.length; f++) {
          let { key: p, value: g } = u[f];
          (function(m, _) {
            let { push: y } = _;
            if (m.type === 8) y("["), bu(m, _), y("]");
            else if (m.isStatic) {
              let b;
              y((b = m.content, Bl.test(b) ? JSON.stringify(m.content) : m.content), -2, m);
            } else y(`[${m.content}]`, -3, m);
          })(p, a), r(": "), _e(g, a), f < u.length - 1 && (r(","), h());
        }
        d && c(), r(d ? "}" : " }");
      })(t, e);
      break;
    case 17:
      n = t, i = e, Vl(n.elements, i);
      break;
    case 18:
      (function(o, a) {
        let { push: r, indent: l, deindent: c } = a, { params: h, returns: u, body: d, newline: f, isSlot: p } = o;
        p && r(`_${hi[Yc]}(`), r("(", -2, o), nt(h) ? Oi(h, a) : h && _e(h, a), r(") => "), (f || d) && (r("{"), l()), u ? (f && r("return "), nt(u) ? Vl(u, a) : _e(u, a)) : d && _e(d, a), (f || d) && (c(), r("}")), p && r(")");
      })(t, e);
      break;
    case 19:
      (function(o, a) {
        let { test: r, consequent: l, alternate: c, newline: h } = o, { push: u, indent: d, deindent: f, newline: p } = a;
        if (r.type === 4) {
          let m, _ = (m = r.content, !!Bl.test(m));
          _ && u("("), yu(r, a), _ && u(")");
        } else u("("), _e(r, a), u(")");
        h && d(), a.indentLevel++, h || u(" "), u("? "), _e(l, a), a.indentLevel--, h && p(), h || u(" "), u(": ");
        let g = c.type === 19;
        !g && a.indentLevel++, _e(c, a), !g && a.indentLevel--, h && f(!0);
      })(t, e);
      break;
    case 20:
      (function(o, a) {
        let { push: r, helper: l, indent: c, deindent: h, newline: u } = a, { needPauseTracking: d, needArraySpread: f } = o;
        f && r("[...("), r(`_cache[${o.index}] || (`), d && (c(), r(`${l(qa)}(-1`), o.inVOnce && r(", true"), r("),"), u(), r("(")), r(`_cache[${o.index}] = `), _e(o.value, a), d && (r(`).cacheIndex = ${o.index},`), u(), r(`${l(qa)}(1),`), u(), r(`_cache[${o.index}]`), h()), r(")"), f && r(")]");
      })(t, e);
      break;
    case 21:
      Oi(t.body, e, !0, !1);
  }
}
function yu(t, e) {
  let { content: s, isStatic: n } = t;
  e.push(n ? JSON.stringify(s) : s, -3, t);
}
function bu(t, e) {
  for (let s = 0; s < t.children.length; s++) {
    let n = t.children[s];
    ct(n) ? e.push(n, -3) : _e(n, e);
  }
}
let M0 = mg(/^(?:if|else|else-if)$/, (t, e, s) => function(n, i, o, a) {
  if (i.name !== "else" && (!i.exp || !i.exp.content.trim())) {
    let l = i.exp ? i.exp.loc : n.loc;
    o.onError(Pt(28, i.loc)), i.exp = ft("true", !1, l);
  }
  if (i.name === "if") {
    var r;
    let l = _u(n, i), c = { type: 9, loc: Ht((r = n.loc).start.offset, r.end.offset), branches: [l] };
    if (o.replaceNode(c), a) return a(c, l, !0);
  } else {
    let l = o.parent.children, c = l.indexOf(n);
    for (; c-- >= -1; ) {
      let h = l[c];
      if (h && cg(h)) {
        o.removeNode(h);
        continue;
      }
      if (h && h.type === 9) {
        (i.name === "else-if" || i.name === "else") && h.branches[h.branches.length - 1].condition === void 0 && o.onError(Pt(30, n.loc)), o.removeNode();
        let u = _u(n, i);
        h.branches.push(u);
        let d = a && a(h, u, !1);
        Qa(u, o), d && d(), o.currentNode = null;
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
    o ? n.codegenNode = xu(i, l, s) : function(c) {
      for (; ; ) if (c.type === 19) {
        if (c.alternate.type !== 19) return c;
        c = c.alternate;
      } else c.type === 20 && (c = c.value);
    }(n.codegenNode).alternate = xu(i, l + n.branches.length - 1, s);
  };
}));
function _u(t, e) {
  let s = t.tagType === 3;
  return { type: 10, loc: t.loc, condition: e.name === "else" ? void 0 : e.exp, children: s && !$e(t, "for") ? t.children : [t], userKey: Tr(t, "key"), isTemplateIf: s };
}
function xu(t, e, s) {
  return t.condition ? Il(t.condition, vu(t, e, s), Xt(s.helper(Ro), ['""', "true"])) : vu(t, e, s);
}
function vu(t, e, s) {
  let { helper: n } = s, i = Yt("key", ft(`${e}`, !1, Fe, 2)), { children: o } = t, a = o[0];
  if (o.length !== 1 || a.type !== 1) {
    if (o.length !== 1 || a.type !== 11) return fo(s, n(ho), je([i]), o, 64, void 0, void 0, !0, !1, !1, t.loc);
    {
      let r = a.codegenNode;
      return Xa(r, i, s), r;
    }
  }
  {
    let r = a.codegenNode, l = r.type === 14 && r.callee === Kc ? r.arguments[1].returns : r;
    return l.type === 13 && Jc(l, s), Xa(l, i, s), r;
  }
}
let A0 = mg("for", (t, e, s) => {
  let { helper: n, removeHelper: i } = s;
  return function(o, a, r, l) {
    if (!a.exp) return void r.onError(Pt(31, a.loc));
    let c = a.forParseResult;
    if (!c) return void r.onError(Pt(32, a.loc));
    yg(c);
    let { scopes: h } = r, { source: u, value: d, key: f, index: p } = c, g = { type: 11, loc: a.loc, source: u, valueAlias: d, keyAlias: f, objectIndexAlias: p, parseResult: c, children: Ka(o) ? o.children : [o] };
    r.replaceNode(g), h.vFor++;
    let m = l && l(g);
    return () => {
      h.vFor--, m && m();
    };
  }(t, e, s, (o) => {
    let a = Xt(n(zc), [o.source]), r = Ka(t), l = $e(t, "memo"), c = Tr(t, "key", !1, !0);
    c && c.type;
    let h = c && (c.type === 6 ? c.value ? ft(c.value.content, !0) : void 0 : c.exp), u = c && h ? Yt("key", h) : null, d = o.source.type === 4 && o.source.constType > 0, f = d ? 64 : c ? 128 : 256;
    return o.codegenNode = fo(s, n(ho), void 0, a, f, void 0, void 0, !0, !d, !1, t.loc), () => {
      let p, { children: g } = o, m = g.length !== 1 || g[0].type !== 1, _ = Ja(t) ? t : r && t.children.length === 1 && Ja(t.children[0]) ? t.children[0] : null;
      if (_) p = _.codegenNode, r && u && Xa(p, u, s);
      else if (m) p = fo(s, n(ho), u ? je([u]) : void 0, t.children, 64, void 0, void 0, !0, void 0, !1);
      else {
        var y, b, v, w, S, x, k, P;
        p = g[0].codegenNode, r && u && Xa(p, u, s), !d !== p.isBlock && (p.isBlock ? (i(An), i((y = s.inSSR, b = p.isComponent, y || b ? Pn : Tn))) : i((v = s.inSSR, w = p.isComponent, v || w ? Ks : Js))), p.isBlock = !d, p.isBlock ? (n(An), n((S = s.inSSR, x = p.isComponent, S || x ? Pn : Tn))) : n((k = s.inSSR, P = p.isComponent, k || P ? Ks : Js));
      }
      if (l) {
        let F = ui(Hl(o.parseResult, [ft("_cached")]));
        F.body = { type: 21, body: [qe(["const _memo = (", l.exp, ")"]), qe(["if (_cached && _cached.el", ...h ? [" && _cached.key === ", h] : [], ` && ${s.helperString(sg)}(_cached, _memo)) return _cached`]), qe(["const _item = ", p]), ft("_item.memo = _memo"), ft("return _item")], loc: Fe }, a.arguments.push(F, ft("_cache"), ft(String(s.cached.length))), s.cached.push(null);
      } else a.arguments.push(ui(Hl(o.parseResult), p, !0));
    };
  });
});
function yg(t, e) {
  t.finalized || (t.finalized = !0);
}
function Hl({ value: t, key: e, index: s }, n = []) {
  var i = [t, e, s, ...n];
  let o = i.length;
  for (; o-- && !i[o]; ) ;
  return i.slice(0, o + 1).map((a, r) => a || ft("_".repeat(r + 1), !1));
}
let Su = ft("undefined", !1), P0 = (t, e) => {
  if (t.type === 1 && (t.tagType === 1 || t.tagType === 3)) {
    let s = $e(t, "slot");
    if (s) return s.exp, e.scopes.vSlot++, () => {
      e.scopes.vSlot--;
    };
  }
};
function Ko(t, e, s) {
  let n = [Yt("name", t), Yt("fn", e)];
  return s != null && n.push(Yt("key", ft(String(s), !0))), je(n);
}
let bg = /* @__PURE__ */ new WeakMap(), T0 = (t, e) => function() {
  let s, n, i, o, a;
  if ((t = e.currentNode).type !== 1 || t.tagType !== 0 && t.tagType !== 1) return;
  let { tag: r, props: l } = t, c = t.tagType === 1, h = c ? function(p, g, m = !1) {
    let { tag: _ } = p, y = zl(_), b = Tr(p, "is", !1, !0);
    if (b) if (y) {
      let w;
      if (b.type === 6 ? w = b.value && ft(b.value.content, !0) : (w = b.exp) || (w = ft("is", !1, b.arg.loc)), w) return Xt(g.helper(Ol), [w]);
    } else b.type === 6 && b.value.content.startsWith("vue:") && (_ = b.value.content.slice(4));
    let v = ig(_) || g.isBuiltInComponent(_);
    return v ? (m || g.helper(v), v) : (g.helper(Wc), g.components.add(_), $l(_, "component"));
  }(t, e) : `"${r}"`, u = St(h) && h.callee === Ol, d = 0, f = u || h === Yi || h === $c || !c && (r === "svg" || r === "foreignObject" || r === "math");
  if (l.length > 0) {
    let p = _g(t, e, void 0, c, u);
    s = p.props, d = p.patchFlag, o = p.dynamicPropNames;
    let g = p.directives;
    a = g && g.length ? vn(g.map((m) => function(_, y) {
      let b = [], v = bg.get(_);
      v ? b.push(y.helperString(v)) : (y.helper(Vc), y.directives.add(_.name), b.push($l(_.name, "directive")));
      let { loc: w } = _;
      if (_.exp && b.push(_.exp), _.arg && (_.exp || b.push("void 0"), b.push(_.arg)), Object.keys(_.modifiers).length) {
        _.arg || (_.exp || b.push("void 0"), b.push("void 0"));
        let S = ft("true", !1, w);
        b.push(je(_.modifiers.map((x) => Yt(x, S)), w));
      }
      return vn(b, _.loc);
    }(m, e))) : void 0, p.shouldUseBlock && (f = !0);
  }
  if (t.children.length > 0) if (h === Ga && (f = !0, d |= 1024), c && h !== Yi && h !== Ga) {
    let { slots: p, hasDynamicSlots: g } = function(m, _, y = (b, v, w, S) => ui(b, w, !1, !0, w.length ? w[0].loc : S)) {
      _.helper(Yc);
      let { children: b, loc: v } = m, w = [], S = [], x = _.scopes.vSlot > 0 || _.scopes.vFor > 0, k = $e(m, "slot", !0);
      if (k) {
        let { arg: M, exp: T } = k;
        M && !Pe(M) && (x = !0), w.push(Yt(M || ft("default", !0), y(T, void 0, b, v)));
      }
      let P = !1, F = !1, E = [], C = /* @__PURE__ */ new Set(), I = 0;
      for (let M = 0; M < b.length; M++) {
        let T, O, V, Y, Z = b[M];
        if (!Ka(Z) || !(T = $e(Z, "slot", !0))) {
          Z.type !== 3 && E.push(Z);
          continue;
        }
        if (k) {
          _.onError(Pt(37, T.loc));
          break;
        }
        P = !0;
        let { children: et, loc: dt } = Z, { arg: lt = ft("default", !0), exp: pt, loc: _t } = T;
        Pe(lt) ? O = lt ? lt.content : "default" : x = !0;
        let K = $e(Z, "for"), q = y(pt, K, et, dt);
        if (V = $e(Z, "if")) x = !0, S.push(Il(V.exp, Ko(lt, q, I++), Su));
        else if (Y = $e(Z, /^else(?:-if)?$/, !0)) {
          let U, ot = M;
          for (; ot-- && cg(U = b[ot]); ) ;
          if (U && Ka(U) && $e(U, /^(?:else-)?if$/)) {
            let A = S[S.length - 1];
            for (; A.alternate.type === 19; ) A = A.alternate;
            A.alternate = Y.exp ? Il(Y.exp, Ko(lt, q, I++), Su) : Ko(lt, q, I++);
          } else _.onError(Pt(30, Y.loc));
        } else if (K) {
          x = !0;
          let U = K.forParseResult;
          U ? (yg(U), S.push(Xt(_.helper(zc), [U.source, ui(Hl(U), Ko(lt, q), !0)]))) : _.onError(Pt(32, K.loc));
        } else {
          if (O) {
            if (C.has(O)) {
              _.onError(Pt(38, _t));
              continue;
            }
            C.add(O), O === "default" && (F = !0);
          }
          w.push(Yt(lt, q));
        }
      }
      if (!k) {
        let M = (T, O) => Yt("default", y(T, void 0, O, v));
        P ? E.length && !E.every(Xc) && (F ? _.onError(Pt(39, E[0].loc)) : w.push(M(void 0, E))) : w.push(M(void 0, b));
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
      }(m.children) ? 3 : 1, D = je(w.concat(Yt("_", ft(L + "", !1))), v);
      return S.length && (D = Xt(_.helper(eg), [D, vn(S)])), { slots: D, hasDynamicSlots: x };
    }(t, e);
    n = p, g && (d |= 1024);
  } else if (t.children.length === 1 && h !== Yi) {
    let p = t.children[0], g = p.type, m = g === 5 || g === 8;
    m && Oe(p, e) === 0 && (d |= 1), n = m || g === 2 ? p : t.children;
  } else n = t.children;
  o && o.length && (i = function(p) {
    let g = "[";
    for (let m = 0, _ = p.length; m < _; m++) g += JSON.stringify(p[m]), m < _ - 1 && (g += ", ");
    return g + "]";
  }(o)), t.codegenNode = fo(e, h, s, n, d === 0 ? void 0 : d, i, a, !!f, !1, c, t.loc);
};
function _g(t, e, s = t.props, n, i, o = !1) {
  let a, { tag: r, loc: l, children: c } = t, h = [], u = [], d = [], f = c.length > 0, p = !1, g = 0, m = !1, _ = !1, y = !1, b = !1, v = !1, w = !1, S = [], x = (F) => {
    h.length && (u.push(je(wu(h), l)), h = []), F && u.push(F);
  }, k = () => {
    e.scopes.vFor > 0 && h.push(Yt(ft("ref_for", !0), ft("true")));
  }, P = ({ key: F, value: E }) => {
    if (Pe(F)) {
      let C = F.content, I = On(C);
      I && (!n || i) && C.toLowerCase() !== "onclick" && C !== "onUpdate:modelValue" && !Ss(C) && (b = !0), I && Ss(C) && (w = !0), I && E.type === 14 && (E = E.arguments[0]), E.type === 20 || (E.type === 4 || E.type === 8) && Oe(E, e) > 0 || (C === "ref" ? m = !0 : C === "class" ? _ = !0 : C === "style" ? y = !0 : C === "key" || S.includes(C) || S.push(C), n && (C === "class" || C === "style") && !S.includes(C) && S.push(C));
    } else v = !0;
  };
  for (let F = 0; F < s.length; F++) {
    let E = s[F];
    if (E.type === 6) {
      let { loc: C, name: I, nameLoc: L, value: D } = E;
      if (I === "ref" && (m = !0, k()), I === "is" && (zl(r) || D && D.content.startsWith("vue:"))) continue;
      h.push(Yt(ft(I, !0, L), ft(D ? D.content : "", !0, D ? D.loc : C)));
    } else {
      let { name: C, arg: I, exp: L, loc: D, modifiers: M } = E, T = C === "bind", O = C === "on";
      if (C === "slot") {
        n || e.onError(Pt(40, D));
        continue;
      }
      if (C === "once" || C === "memo" || C === "is" || T && Kn(I, "is") && zl(r) || O && o) continue;
      if ((T && Kn(I, "key") || O && f && Kn(I, "vue:before-update")) && (p = !0), T && Kn(I, "ref") && k(), !I && (T || O)) {
        v = !0, L ? T ? (k(), x(), u.push(L)) : x({ type: 14, loc: D, callee: e.helper(qc), arguments: n ? [L] : [L, "true"] }) : e.onError(Pt(T ? 34 : 35, D));
        continue;
      }
      T && M.some((Y) => Y.content === "prop") && (g |= 32);
      let V = e.directiveTransforms[C];
      if (V) {
        let { props: Y, needRuntime: Z } = V(E, t, e);
        o || Y.forEach(P), O && I && !Pe(I) ? x(je(Y, l)) : h.push(...Y), Z && (d.push(E), ge(Z) && bg.set(E, Z));
      } else !Im(C) && (d.push(E), f && (p = !0));
    }
  }
  if (u.length ? (x(), a = u.length > 1 ? Xt(e.helper(Ua), u, l) : u[0]) : h.length && (a = je(wu(h), l)), v ? g |= 16 : (_ && !n && (g |= 2), y && !n && (g |= 4), S.length && (g |= 8), b && (g |= 32)), !p && (g === 0 || g === 32) && (m || w || d.length > 0) && (g |= 512), !e.inSSR && a) switch (a.type) {
    case 15:
      let F = -1, E = -1, C = !1;
      for (let D = 0; D < a.properties.length; D++) {
        let M = a.properties[D].key;
        Pe(M) ? M.content === "class" ? F = D : M.content === "style" && (E = D) : M.isHandlerKey || (C = !0);
      }
      let I = a.properties[F], L = a.properties[E];
      C ? a = Xt(e.helper(uo), [a]) : (I && !Pe(I.value) && (I.value = Xt(e.helper(Gc), [I.value])), L && (y || L.value.type === 4 && L.value.content.trim()[0] === "[" || L.value.type === 17) && (L.value = Xt(e.helper(Uc), [L.value])));
      break;
    case 14:
      break;
    default:
      a = Xt(e.helper(uo), [Xt(e.helper(Lo), [a])]);
  }
  return { props: a, directives: d, patchFlag: g, dynamicPropNames: S, shouldUseBlock: p };
}
function wu(t) {
  let e = /* @__PURE__ */ new Map(), s = [];
  for (let o = 0; o < t.length; o++) {
    var n, i;
    let a = t[o];
    if (a.key.type === 8 || !a.key.isStatic) {
      s.push(a);
      continue;
    }
    let r = a.key.content, l = e.get(r);
    l ? (r === "style" || r === "class" || On(r)) && (n = l, i = a, n.value.type === 17 ? n.value.elements.push(i.value) : n.value = vn([n.value, i.value], n.loc)) : (e.set(r, a), s.push(a));
  }
  return s;
}
function zl(t) {
  return t === "component" || t === "Component";
}
let D0 = (t, e) => {
  if (Ja(t)) {
    let { children: s, loc: n } = t, { slotName: i, slotProps: o } = function(l, c) {
      let h, u = '"default"', d = [];
      for (let f = 0; f < l.props.length; f++) {
        let p = l.props[f];
        if (p.type === 6) p.value && (p.name === "name" ? u = JSON.stringify(p.value.content) : (p.name = Tt(p.name), d.push(p)));
        else if (p.name === "bind" && Kn(p.arg, "name")) {
          if (p.exp) u = p.exp;
          else if (p.arg && p.arg.type === 4) {
            let g = Tt(p.arg.content);
            u = p.exp = ft(g, !1, p.arg.loc);
          }
        } else p.name === "bind" && p.arg && Pe(p.arg) && (p.arg.content = Tt(p.arg.content)), d.push(p);
      }
      if (d.length > 0) {
        let { props: f, directives: p } = _g(l, c, d, !1, !1);
        h = f, p.length && c.onError(Pt(36, p[0].loc));
      }
      return { slotName: u, slotProps: h };
    }(t, e), a = [e.prefixIdentifiers ? "_ctx.$slots" : "$slots", i, "{}", "undefined", "true"], r = 2;
    o && (a[2] = o, r = 3), s.length && (a[3] = ui([], s, !1, !1, n), r = 4), e.scopeId && !e.slotted && (r = 5), a.splice(r), t.codegenNode = Xt(e.helper(tg), a, n);
  }
}, xg = (t, e, s, n) => {
  let i, { loc: o, modifiers: a, arg: r } = t;
  if (!t.exp && a.length, r.type === 4) if (r.isStatic) {
    let u = r.content;
    u.startsWith("vue:") && (u = `vnode-${u.slice(4)}`), i = ft(e.tagType !== 0 || u.startsWith("vnode") || !/[A-Z]/.test(u) ? Zn(Tt(u)) : `on:${u}`, !0, r.loc);
  } else i = qe([`${s.helperString(El)}(`, r, ")"]);
  else (i = r).children.unshift(`${s.helperString(El)}(`), i.children.push(")");
  let l = t.exp;
  l && !l.content.trim() && (l = void 0);
  let c = s.cacheHandlers && !l && !s.inVOnce;
  if (l) {
    let u, d = rg(l), f = !(d || (u = l, b0.test(ag(u)))), p = l.content.includes(";");
    (f || c && d) && (l = qe([`${f ? "$event" : "(...args)"} => ${p ? "{" : "("}`, l, p ? "}" : ")"]));
  }
  let h = { props: [Yt(i, l || ft("() => {}", !1, o))] };
  return n && (h = n(h)), c && (h.props[0].value = s.cache(h.props[0].value)), h.props.forEach((u) => u.key.isHandlerKey = !0), h;
}, R0 = (t, e, s) => {
  let { modifiers: n } = t, i = t.arg, { exp: o } = t;
  return o && o.type === 4 && !o.content.trim() && (o = void 0), i.type !== 4 ? (i.children.unshift("("), i.children.push(') || ""')) : i.isStatic || (i.content = i.content ? `${i.content} || ""` : '""'), n.some((a) => a.content === "camel") && (i.type === 4 ? i.isStatic ? i.content = Tt(i.content) : i.content = `${s.helperString(Fl)}(${i.content})` : (i.children.unshift(`${s.helperString(Fl)}(`), i.children.push(")"))), !s.inSSR && (n.some((a) => a.content === "prop") && Cu(i, "."), n.some((a) => a.content === "attr") && Cu(i, "^")), { props: [Yt(i, o)] };
}, Cu = (t, e) => {
  t.type === 4 ? t.isStatic ? t.content = e + t.content : t.content = `\`${e}\${${t.content}}\`` : (t.children.unshift(`'${e}' + (`), t.children.push(")"));
}, L0 = (t, e) => {
  if (t.type === 0 || t.type === 1 || t.type === 11 || t.type === 10) return () => {
    let s, n = t.children, i = !1;
    for (let o = 0; o < n.length; o++) {
      let a = n[o];
      if (Zr(a)) {
        i = !0;
        for (let r = o + 1; r < n.length; r++) {
          let l = n[r];
          if (Zr(l)) s || (s = n[o] = qe([a], a.loc)), s.children.push(" + ", l), n.splice(r, 1), r--;
          else {
            s = void 0;
            break;
          }
        }
      }
    }
    if (i && (n.length !== 1 || t.type !== 0 && (t.type !== 1 || t.tagType !== 0 || t.props.find((o) => o.type === 7 && !e.directiveTransforms[o.name])))) for (let o = 0; o < n.length; o++) {
      let a = n[o];
      if (Zr(a) || a.type === 8) {
        let r = [];
        (a.type !== 2 || a.content !== " ") && r.push(a), e.ssr || Oe(a, e) !== 0 || r.push("1"), n[o] = { type: 12, content: a, loc: a.loc, codegenNode: Xt(e.helper(jc), r) };
      }
    }
  };
}, ku = /* @__PURE__ */ new WeakSet(), O0 = (t, e) => {
  if (t.type === 1 && $e(t, "once", !0) && !ku.has(t) && !e.inVOnce && !e.inSSR) return ku.add(t), e.inVOnce = !0, e.helper(qa), () => {
    e.inVOnce = !1;
    let s = e.currentNode;
    s.codegenNode && (s.codegenNode = e.cache(s.codegenNode, !0, !0));
  };
}, vg = (t, e, s) => {
  let n, { exp: i, arg: o } = t;
  if (!i) return s.onError(Pt(41, t.loc)), Jo();
  let a = i.loc.source.trim(), r = i.type === 4 ? i.content : a, l = s.bindingMetadata[a];
  if (l === "props" || l === "props-aliased" || l === "literal-const" || l === "setup-const") return i.loc, Jo();
  if (!r.trim() || !rg(i)) return s.onError(Pt(42, i.loc)), Jo();
  let c = o || ft("modelValue", !0), h = o ? Pe(o) ? `onUpdate:${Tt(o.content)}` : qe(['"onUpdate:" + ', o]) : "onUpdate:modelValue", u = s.isTS ? "($event: any)" : "$event";
  n = qe([`${u} => ((`, i, ") = $event)"]);
  let d = [Yt(c, t.exp), Yt(h, n)];
  if (t.modifiers.length && e.tagType === 1) {
    let f = t.modifiers.map((g) => g.content).map((g) => (Bl.test(g) ? JSON.stringify(g) : g) + ": true").join(", "), p = o ? Pe(o) ? `${o.content}Modifiers` : qe([o, ' + "Modifiers"']) : "modelModifiers";
    d.push(Yt(p, ft(`{ ${f} }`, !1, t.loc, 2)));
  }
  return Jo(d);
};
function Jo(t = []) {
  return { props: t };
}
let Mu = /* @__PURE__ */ new WeakSet(), F0 = (t, e) => {
  if (t.type === 1) {
    let s = $e(t, "memo");
    if (!(!s || Mu.has(t)) && !e.inSSR) return Mu.add(t), () => {
      let n = t.codegenNode || e.currentNode.codegenNode;
      n && n.type === 13 && (t.tagType !== 1 && Jc(n, e), t.codegenNode = Xt(e.helper(Kc), [s.exp, ui(void 0, n), "_cache", String(e.cached.length)]), e.cached.push(null));
    };
  }
}, E0 = (t, e) => {
  if (t.type === 1) {
    for (let s of t.props) if (s.type === 7 && s.name === "bind" && (!s.exp || s.exp.type === 4 && !s.exp.content.trim()) && s.arg) {
      let n = s.arg;
      if (n.type === 4 && n.isStatic) {
        let i = Tt(n.content);
        (og.test(i[0]) || i[0] === "-") && (s.exp = ft(i, !1, n.loc));
      } else e.onError(Pt(53, n.loc)), s.exp = ft("", !0, n.loc);
    }
  }
}, Sg = Symbol(""), wg = Symbol(""), Cg = Symbol(""), kg = Symbol(""), Gl = Symbol(""), Mg = Symbol(""), Ag = Symbol(""), Pg = Symbol(""), Tg = Symbol(""), Dg = Symbol("");
Object.getOwnPropertySymbols(ou = { [Sg]: "vModelRadio", [wg]: "vModelCheckbox", [Cg]: "vModelText", [kg]: "vModelSelect", [Gl]: "vModelDynamic", [Mg]: "withModifiers", [Ag]: "withKeys", [Pg]: "vShow", [Tg]: "Transition", [Dg]: "TransitionGroup" }).forEach((t) => {
  hi[t] = ou[t];
});
let I0 = { parseMode: "html", isVoidTag: qm, isNativeTag: (t) => zm(t) || Gm(t) || Um(t), isPreTag: (t) => t === "pre", isIgnoreNewlineTag: (t) => t === "pre" || t === "textarea", decodeEntities: function(t, e = !1) {
  return Bn || (Bn = document.createElement("div")), e ? (Bn.innerHTML = `<div foo="${t.replace(/"/g, "&quot;")}">`, Bn.children[0].getAttribute("foo")) : (Bn.innerHTML = t, Bn.textContent);
}, isBuiltInComponent: (t) => t === "Transition" || t === "transition" ? Tg : t === "TransitionGroup" || t === "transition-group" ? Dg : void 0, getNamespace(t, e, s) {
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
} }, N0 = Ee("passive,once,capture"), B0 = Ee("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"), $0 = Ee("left,right"), Au = Ee("onkeyup,onkeydown,onkeypress"), Pu = (t, e) => Pe(t) && t.content.toLowerCase() === "onclick" ? ft(e, !0) : t.type !== 4 ? qe(["(", t, `) === "onClick" ? "${e}" : (`, t, ")"]) : t, j0 = (t, e) => {
  t.type === 1 && t.tagType === 0 && (t.tag === "script" || t.tag === "style") && e.removeNode();
}, W0 = [(t) => {
  t.type === 1 && t.props.forEach((e, s) => {
    let n, i;
    e.type === 6 && e.name === "style" && e.value && (t.props[s] = { type: 7, name: "bind", arg: ft("style", !0, e.loc), exp: (n = e.value.content, i = e.loc, ft(JSON.stringify(rf(n)), !1, i, 3)), modifiers: [], loc: e.loc });
  });
}], V0 = { cloak: () => ({ props: [] }), html: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(54, i)), e.children.length && (s.onError(Pt(55, i)), e.children.length = 0), { props: [Yt(ft("innerHTML", !0, i), n || ft("", !0))] };
}, text: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(56, i)), e.children.length && (s.onError(Pt(57, i)), e.children.length = 0), { props: [Yt(ft("textContent", !0), n ? Oe(n, s) > 0 ? n : Xt(s.helperString(Pr), [n], i) : ft("", !0))] };
}, model: (t, e, s) => {
  let n = vg(t, e, s);
  if (!n.props.length || e.tagType === 1) return n;
  t.arg && s.onError(Pt(59, t.arg.loc));
  let { tag: i } = e, o = s.isCustomElement(i);
  if (i === "input" || i === "textarea" || i === "select" || o) {
    let a = Cg, r = !1;
    if (i === "input" || o) {
      let l = Tr(e, "type");
      if (l) {
        if (l.type === 7) a = Gl;
        else if (l.value) switch (l.value.content) {
          case "radio":
            a = Sg;
            break;
          case "checkbox":
            a = wg;
            break;
          case "file":
            r = !0, s.onError(Pt(60, t.loc));
        }
      } else e.props.some((c) => c.type === 7 && c.name === "bind" && (!c.arg || c.arg.type !== 4 || !c.arg.isStatic)) && (a = Gl);
    } else i === "select" && (a = kg);
    r || (n.needRuntime = s.helper(a));
  } else s.onError(Pt(58, t.loc));
  return n.props = n.props.filter((a) => a.key.type !== 4 || a.key.content !== "modelValue"), n;
}, on: (t, e, s) => xg(t, e, s, (n) => {
  let { modifiers: i } = t;
  if (!i.length) return n;
  let { key: o, value: a } = n.props[0], { keyModifiers: r, nonKeyModifiers: l, eventOptionModifiers: c } = ((h, u, d, f) => {
    let p = [], g = [], m = [];
    for (let _ = 0; _ < u.length; _++) {
      let y = u[_].content;
      N0(y) ? m.push(y) : $0(y) ? Pe(h) ? Au(h.content.toLowerCase()) ? p.push(y) : g.push(y) : (p.push(y), g.push(y)) : B0(y) ? g.push(y) : p.push(y);
    }
    return { keyModifiers: p, nonKeyModifiers: g, eventOptionModifiers: m };
  })(o, i, 0, t.loc);
  if (l.includes("right") && (o = Pu(o, "onContextmenu")), l.includes("middle") && (o = Pu(o, "onMouseup")), l.length && (a = Xt(s.helper(Mg), [a, JSON.stringify(l)])), r.length && (!Pe(o) || Au(o.content.toLowerCase())) && (a = Xt(s.helper(Ag), [a, JSON.stringify(r)])), c.length) {
    let h = c.map(Fn).join("");
    o = Pe(o) ? ft(`${o.content}${h}`, !0) : qe(["(", o, `) + "${h}"`]);
  }
  return { props: [Yt(o, a)] };
}), show: (t, e, s) => {
  let { exp: n, loc: i } = t;
  return n || s.onError(Pt(62, i)), { props: [], needRuntime: s.helper(Pg) };
} }, Tu = /* @__PURE__ */ Object.create(null);
function H0(t, e) {
  if (!ct(t)) if (t.nodeType) t = t.innerHTML;
  else return ie;
  let s = t + JSON.stringify(e, (r, l) => typeof l == "function" ? l.toString() : l), n = Tu[s];
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
      let d, f = h.onError || Nl, p = h.mode === "module";
      h.prefixIdentifiers === !0 ? f(Pt(48)) : p && f(Pt(49)), h.cacheHandlers && f(Pt(50)), h.scopeId && !p && f(Pt(51));
      let g = gt({}, h, { prefixIdentifiers: !1 }), m = ct(c) ? function(b, v) {
        if (zt.reset(), he = null, Ct = null, De = "", cs = -1, hn = -1, Bt.length = 0, ks = b, Lt = gt({}, hg), v) {
          let x;
          for (x in v) v[x] != null && (Lt[x] = v[x]);
        }
        zt.mode = Lt.parseMode === "html" ? 1 : 2 * (Lt.parseMode === "sfc"), zt.inXML = Lt.ns === 1 || Lt.ns === 2;
        let w = v && v.delimiters;
        w && (zt.delimiterOpen = Ya(w[0]), zt.delimiterClose = Ya(w[1]));
        let S = Za = /* @__PURE__ */ function(x, k = "") {
          return { type: 0, source: k, children: x, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: Fe };
        }([], b);
        return zt.parse(ks), S.loc = Ht(0, b.length), S.children = dg(S.children), Za = null, S;
      }(c, g) : c, [_, y] = [[E0, O0, M0, F0, A0, D0, T0, P0, L0], { on: xg, bind: R0, model: vg }];
      return d = function(b, { filename: v = "", prefixIdentifiers: w = !1, hoistStatic: S = !1, hmr: x = !1, cacheHandlers: k = !1, nodeTransforms: P = [], directiveTransforms: F = {}, transformHoist: E = null, isBuiltInComponent: C = ie, isCustomElement: I = ie, expressionPlugins: L = [], scopeId: D = null, slotted: M = !0, ssr: T = !1, inSSR: O = !1, ssrCssVars: V = "", bindingMetadata: Y = yt, inline: Z = !1, isTS: et = !1, onError: dt = Nl, onWarn: lt = ng, compatConfig: pt }) {
        let _t = v.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), K = { filename: v, selfName: _t && Fn(Tt(_t[1])), prefixIdentifiers: w, hoistStatic: S, hmr: x, cacheHandlers: k, nodeTransforms: P, directiveTransforms: F, transformHoist: E, isBuiltInComponent: C, isCustomElement: I, expressionPlugins: L, scopeId: D, slotted: M, ssr: T, inSSR: O, ssrCssVars: V, bindingMetadata: Y, inline: Z, isTS: et, onError: dt, onWarn: lt, compatConfig: pt, root: b, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: b, childIndex: 0, inVOnce: !1, helper(q) {
          let U = K.helpers.get(q) || 0;
          return K.helpers.set(q, U + 1), q;
        }, removeHelper(q) {
          let U = K.helpers.get(q);
          if (U) {
            let ot = U - 1;
            ot ? K.helpers.set(q, ot) : K.helpers.delete(q);
          }
        }, helperString: (q) => `_${hi[K.helper(q)]}`, replaceNode(q) {
          K.parent.children[K.childIndex] = K.currentNode = q;
        }, removeNode(q) {
          let U = K.parent.children, ot = q ? U.indexOf(q) : K.currentNode ? K.childIndex : -1;
          q && q !== K.currentNode ? K.childIndex > ot && (K.childIndex--, K.onNodeRemoved()) : (K.currentNode = null, K.onNodeRemoved()), K.parent.children.splice(ot, 1);
        }, onNodeRemoved: ie, addIdentifiers(q) {
        }, removeIdentifiers(q) {
        }, hoist(q) {
          ct(q) && (q = ft(q)), K.hoists.push(q);
          let U = ft(`_hoisted_${K.hoists.length}`, !1, q.loc, 2);
          return U.hoisted = q, U;
        }, cache(q, U = !1, ot = !1) {
          let A = /* @__PURE__ */ function(R, N, z = !1, $ = !1) {
            return { type: 20, index: R, value: N, needPauseTracking: z, inVOnce: $, needArraySpread: !1, loc: Fe };
          }(K.cached.length, q, U, ot);
          return K.cached.push(A), A;
        } };
        return K;
      }(m, u = gt({}, g, { nodeTransforms: [..._, ...h.nodeTransforms || []], directiveTransforms: gt({}, y, h.directiveTransforms || {}) })), Qa(m, d), u.hoistStatic && function b(v, w, S, x = !1, k = !1) {
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
                if ((O === void 0 || O === 512 || O === 1) && pg(D, S) >= 2) {
                  let V = gg(D);
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
            let L = I(v.codegenNode, "default");
            L && (L.returns = C(vn(L.returns)), E = !0);
          } else if (v.tagType === 3 && w && w.type === 1 && w.tagType === 1 && w.codegenNode && w.codegenNode.type === 13 && w.codegenNode.children && !nt(w.codegenNode.children) && w.codegenNode.children.type === 15) {
            let L = $e(v, "slot", !0), D = L && L.arg && I(w.codegenNode, L.arg);
            D && (D.returns = C(vn(D.returns)), E = !0);
          }
        }
        if (!E) for (let L of F) L.codegenNode = S.cache(L.codegenNode);
        function C(L) {
          let D = S.cache(L);
          return D.needArraySpread = !0, D;
        }
        function I(L, D) {
          if (L.children && !nt(L.children) && L.children.type === 15) {
            let M = L.children.properties.find((T) => T.key === D || T.key.content === D);
            return M && M.value;
          }
        }
        F.length && S.transformHoist && S.transformHoist(P, S, v);
      }(m, void 0, d, !!pu(m)), u.ssr || function(b, v) {
        let { helper: w } = v, { children: S } = b;
        if (S.length === 1) {
          let x = pu(b);
          if (x && x.codegenNode) {
            let k = x.codegenNode;
            k.type === 13 && Jc(k, v), b.codegenNode = k;
          } else b.codegenNode = S[0];
        } else S.length > 1 && (b.codegenNode = fo(v, w(ho), void 0, b.children, 64, void 0, void 0, !0, void 0, !1));
      }(m, d), m.helpers = /* @__PURE__ */ new Set([...d.helpers.keys()]), m.components = [...d.components], m.directives = [...d.directives], m.imports = d.imports, m.hoists = d.hoists, m.temps = d.temps, m.cached = d.cached, m.transformed = !0, function(b, v = {}) {
        let w = function(T, { mode: O = "function", prefixIdentifiers: V = O === "module", sourceMap: Y = !1, filename: Z = "template.vue.html", scopeId: et = null, optimizeImports: dt = !1, runtimeGlobalName: lt = "Vue", runtimeModuleName: pt = "vue", ssrRuntimeModuleName: _t = "vue/server-renderer", ssr: K = !1, isTS: q = !1, inSSR: U = !1 }) {
          let ot = { mode: O, prefixIdentifiers: V, sourceMap: Y, filename: Z, scopeId: et, optimizeImports: dt, runtimeGlobalName: lt, runtimeModuleName: pt, ssrRuntimeModuleName: _t, ssr: K, isTS: q, inSSR: U, source: T.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: !1, map: void 0, helper: (R) => `_${hi[R]}`, push(R, N = -2, z) {
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
        }(b, v);
        v.onContextCreated && v.onContextCreated(w);
        let { mode: S, push: x, prefixIdentifiers: k, indent: P, deindent: F, newline: E, ssr: C } = w, I = Array.from(b.helpers), L = I.length > 0, D = !k && S !== "module";
        (function(T, O) {
          let { push: V, newline: Y, runtimeGlobalName: Z } = O, et = Array.from(T.helpers);
          if (et.length > 0 && (V(`const _Vue = ${Z}
`, -1), T.hoists.length)) {
            let dt = [Ks, Js, Ro, jc, Qp].filter((lt) => et.includes(lt)).map(gu).join(", ");
            V(`const { ${dt} } = _Vue
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
          })(T.hoists, O), Y(), V("return ");
        })(b, w);
        let M = (C ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
        if (x(`function ${C ? "ssrRender" : "render"}(${M}) {`), P(), D && (x("with (_ctx) {"), P(), L && (x(`const { ${I.map(gu).join(", ")} } = _Vue
`, -1), E())), b.components.length && (mu(b.components, "component", w), (b.directives.length || b.temps > 0) && E()), b.directives.length && (mu(b.directives, "directive", w), b.temps > 0 && E()), b.temps > 0) {
          x("let ");
          for (let T = 0; T < b.temps; T++) x(`${T > 0 ? ", " : ""}_temp${T}`);
        }
        return (b.components.length || b.directives.length || b.temps) && (x(`
`, 0), E()), C || x("return "), b.codegenNode ? _e(b.codegenNode, w) : x("null"), D && (F(), x("}")), F(), x("}"), { ast: b, code: w.code, preamble: "", map: w.map ? w.map.toJSON() : void 0 };
      }(m, g);
    }(r, gt({}, I0, l, { nodeTransforms: [j0, ...W0, ...l.nodeTransforms || []], directiveTransforms: gt({}, V0, l.directiveTransforms || {}), transformHoist: null }));
  }(t, i), a = Function("Vue", o)(c0);
  return a._rc = !0, Tu[s] = a;
}
vp(H0);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Oo(t) {
  return t + 0.5 | 0;
}
const Ws = (t, e, s) => Math.max(Math.min(t, s), e);
function Fi(t) {
  return Ws(Oo(t * 2.55), 0, 255);
}
function qs(t) {
  return Ws(Oo(t * 255), 0, 255);
}
function ps(t) {
  return Ws(Oo(t / 2.55) / 100, 0, 1);
}
function Du(t) {
  return Ws(Oo(t * 100), 0, 100);
}
const Be = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ul = [..."0123456789ABCDEF"], z0 = (t) => Ul[t & 15], G0 = (t) => Ul[(t & 240) >> 4] + Ul[t & 15], Xo = (t) => (t & 240) >> 4 === (t & 15), U0 = (t) => Xo(t.r) && Xo(t.g) && Xo(t.b) && Xo(t.a);
function q0(t) {
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
const Y0 = (t, e) => t < 255 ? e(t) : "";
function K0(t) {
  var e = U0(t) ? z0 : G0;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + Y0(t.a, e) : void 0;
}
const J0 = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Rg(t, e, s) {
  const n = e * Math.min(s, 1 - s), i = (o, a = (o + t / 30) % 12) => s - n * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [i(0), i(8), i(4)];
}
function X0(t, e, s) {
  const n = (i, o = (i + t / 60) % 6) => s - s * e * Math.max(Math.min(o, 4 - o, 1), 0);
  return [n(5), n(3), n(1)];
}
function Z0(t, e, s) {
  const n = Rg(t, 1, 0.5);
  let i;
  for (e + s > 1 && (i = 1 / (e + s), e *= i, s *= i), i = 0; i < 3; i++)
    n[i] *= 1 - e - s, n[i] += e;
  return n;
}
function Q0(t, e, s, n, i) {
  return t === i ? (e - s) / n + (e < s ? 6 : 0) : e === i ? (s - t) / n + 2 : (t - e) / n + 4;
}
function Qc(t) {
  const s = t.r / 255, n = t.g / 255, i = t.b / 255, o = Math.max(s, n, i), a = Math.min(s, n, i), r = (o + a) / 2;
  let l, c, h;
  return o !== a && (h = o - a, c = r > 0.5 ? h / (2 - o - a) : h / (o + a), l = Q0(s, n, i, h, o), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function th(t, e, s, n) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, s, n)).map(qs);
}
function eh(t, e, s) {
  return th(Rg, t, e, s);
}
function t_(t, e, s) {
  return th(Z0, t, e, s);
}
function e_(t, e, s) {
  return th(X0, t, e, s);
}
function Lg(t) {
  return (t % 360 + 360) % 360;
}
function s_(t) {
  const e = J0.exec(t);
  let s = 255, n;
  if (!e)
    return;
  e[5] !== n && (s = e[6] ? Fi(+e[5]) : qs(+e[5]));
  const i = Lg(+e[2]), o = +e[3] / 100, a = +e[4] / 100;
  return e[1] === "hwb" ? n = t_(i, o, a) : e[1] === "hsv" ? n = e_(i, o, a) : n = eh(i, o, a), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function n_(t, e) {
  var s = Qc(t);
  s[0] = Lg(s[0] + e), s = eh(s), t.r = s[0], t.g = s[1], t.b = s[2];
}
function i_(t) {
  if (!t)
    return;
  const e = Qc(t), s = e[0], n = Du(e[1]), i = Du(e[2]);
  return t.a < 255 ? `hsla(${s}, ${n}%, ${i}%, ${ps(t.a)})` : `hsl(${s}, ${n}%, ${i}%)`;
}
const Ru = {
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
}, Lu = {
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
function o_() {
  const t = {}, e = Object.keys(Lu), s = Object.keys(Ru);
  let n, i, o, a, r;
  for (n = 0; n < e.length; n++) {
    for (a = r = e[n], i = 0; i < s.length; i++)
      o = s[i], r = r.replace(o, Ru[o]);
    o = parseInt(Lu[a], 16), t[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return t;
}
let Zo;
function a_(t) {
  Zo || (Zo = o_(), Zo.transparent = [0, 0, 0, 0]);
  const e = Zo[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const r_ = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function l_(t) {
  const e = r_.exec(t);
  let s = 255, n, i, o;
  if (e) {
    if (e[7] !== n) {
      const a = +e[7];
      s = e[8] ? Fi(a) : Ws(a * 255, 0, 255);
    }
    return n = +e[1], i = +e[3], o = +e[5], n = 255 & (e[2] ? Fi(n) : Ws(n, 0, 255)), i = 255 & (e[4] ? Fi(i) : Ws(i, 0, 255)), o = 255 & (e[6] ? Fi(o) : Ws(o, 0, 255)), {
      r: n,
      g: i,
      b: o,
      a: s
    };
  }
}
function c_(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${ps(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const Qr = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, Wn = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function h_(t, e, s) {
  const n = Wn(ps(t.r)), i = Wn(ps(t.g)), o = Wn(ps(t.b));
  return {
    r: qs(Qr(n + s * (Wn(ps(e.r)) - n))),
    g: qs(Qr(i + s * (Wn(ps(e.g)) - i))),
    b: qs(Qr(o + s * (Wn(ps(e.b)) - o))),
    a: t.a + s * (e.a - t.a)
  };
}
function Qo(t, e, s) {
  if (t) {
    let n = Qc(t);
    n[e] = Math.max(0, Math.min(n[e] + n[e] * s, e === 0 ? 360 : 1)), n = eh(n), t.r = n[0], t.g = n[1], t.b = n[2];
  }
}
function Og(t, e) {
  return t && Object.assign(e || {}, t);
}
function Ou(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = qs(t[3]))) : (e = Og(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = qs(e.a)), e;
}
function u_(t) {
  return t.charAt(0) === "r" ? l_(t) : s_(t);
}
class po {
  constructor(e) {
    if (e instanceof po)
      return e;
    const s = typeof e;
    let n;
    s === "object" ? n = Ou(e) : s === "string" && (n = q0(e) || a_(e) || u_(e)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Og(this._rgb);
    return e && (e.a = ps(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Ou(e);
  }
  rgbString() {
    return this._valid ? c_(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? K0(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? i_(this._rgb) : void 0;
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
    return e && (this._rgb = h_(this._rgb, e._rgb, s)), this;
  }
  clone() {
    return new po(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = qs(e), this;
  }
  clearer(e) {
    const s = this._rgb;
    return s.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, s = Oo(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
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
    return Qo(this._rgb, 2, e), this;
  }
  darken(e) {
    return Qo(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return Qo(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return Qo(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return n_(this._rgb, e), this;
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
const d_ = /* @__PURE__ */ (() => {
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
const f_ = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, Fg = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
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
function tr(t, e) {
  let s, n, i, o;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (s = 0, n = t.length; s < n; ++s)
    if (i = t[s], o = e[s], i.datasetIndex !== o.datasetIndex || i.index !== o.index)
      return !1;
  return !0;
}
function er(t) {
  if (Ft(t))
    return t.map(er);
  if (bt(t)) {
    const e = /* @__PURE__ */ Object.create(null), s = Object.keys(t), n = s.length;
    let i = 0;
    for (; i < n; ++i)
      e[s[i]] = er(t[s[i]]);
    return e;
  }
  return t;
}
function Eg(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function p_(t, e, s, n) {
  if (!Eg(t))
    return;
  const i = e[t], o = s[t];
  bt(i) && bt(o) ? go(i, o, n) : e[t] = er(o);
}
function go(t, e, s) {
  const n = Ft(e) ? e : [
    e
  ], i = n.length;
  if (!bt(t))
    return t;
  s = s || {};
  const o = s.merger || p_;
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
function Ki(t, e) {
  return go(t, e, {
    merger: g_
  });
}
function g_(t, e, s) {
  if (!Eg(t))
    return;
  const n = e[t], i = s[t];
  bt(n) && bt(i) ? Ki(n, i) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = er(i));
}
const Fu = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function m_(t) {
  const e = t.split("."), s = [];
  let n = "";
  for (const i of e)
    n += i, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
  return s;
}
function y_(t) {
  const e = m_(t);
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
  return (Fu[e] || (Fu[e] = y_(e)))(t);
}
function sh(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const mo = (t) => typeof t < "u", Zs = (t) => typeof t == "function", Eu = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const s of t)
    if (!e.has(s))
      return !1;
  return !0;
};
function b_(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const vt = Math.PI, Ot = 2 * vt, __ = Ot + vt, sr = Number.POSITIVE_INFINITY, x_ = vt / 180, Ut = vt / 2, on = vt / 4, Iu = vt * 2 / 3, Vs = Math.log10, ns = Math.sign;
function Ji(t, e, s) {
  return Math.abs(t - e) < s;
}
function Nu(t) {
  const e = Math.round(t);
  t = Ji(t, e, t / 1e3) ? e : t;
  const s = Math.pow(10, Math.floor(Vs(t))), n = t / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function v_(t) {
  const e = [], s = Math.sqrt(t);
  let n;
  for (n = 1; n < s; n++)
    t % n === 0 && (e.push(n), e.push(t / n));
  return s === (s | 0) && e.push(s), e.sort((i, o) => i - o).pop(), e;
}
function S_(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function di(t) {
  return !S_(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function w_(t, e) {
  const s = Math.round(t);
  return s - e <= t && s + e >= t;
}
function Ig(t, e, s) {
  let n, i, o;
  for (n = 0, i = t.length; n < i; n++)
    o = t[n][s], isNaN(o) || (e.min = Math.min(e.min, o), e.max = Math.max(e.max, o));
}
function ze(t) {
  return t * (vt / 180);
}
function nh(t) {
  return t * (180 / vt);
}
function Bu(t) {
  if (!$t(t))
    return;
  let e = 1, s = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, s++;
  return s;
}
function Ng(t, e) {
  const s = e.x - t.x, n = e.y - t.y, i = Math.sqrt(s * s + n * n);
  let o = Math.atan2(n, s);
  return o < -0.5 * vt && (o += Ot), {
    angle: o,
    distance: i
  };
}
function ql(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function C_(t, e) {
  return (t - e + __) % Ot - vt;
}
function de(t) {
  return (t % Ot + Ot) % Ot;
}
function yo(t, e, s, n) {
  const i = de(t), o = de(e), a = de(s), r = de(o - i), l = de(a - i), c = de(i - o), h = de(i - a);
  return i === o || i === a || n && o === a || r > l && c < h;
}
function se(t, e, s) {
  return Math.max(e, Math.min(s, t));
}
function k_(t) {
  return se(t, -32768, 32767);
}
function _s(t, e, s, n = 1e-6) {
  return t >= Math.min(e, s) - n && t <= Math.max(e, s) + n;
}
function ih(t, e, s) {
  s = s || ((a) => t[a] < e);
  let n = t.length - 1, i = 0, o;
  for (; n - i > 1; )
    o = i + n >> 1, s(o) ? i = o : n = o;
  return {
    lo: i,
    hi: n
  };
}
const xs = (t, e, s, n) => ih(t, s, n ? (i) => {
  const o = t[i][e];
  return o < s || o === s && t[i + 1][e] === s;
} : (i) => t[i][e] < s), M_ = (t, e, s) => ih(t, s, (n) => t[n][e] >= s);
function A_(t, e, s) {
  let n = 0, i = t.length;
  for (; n < i && t[n] < e; )
    n++;
  for (; i > n && t[i - 1] > s; )
    i--;
  return n > 0 || i < t.length ? t.slice(n, i) : t;
}
const Bg = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function P_(t, e) {
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
  }), Bg.forEach((s) => {
    const n = "_onData" + sh(s), i = t[s];
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
function $u(t, e) {
  const s = t._chartjs;
  if (!s)
    return;
  const n = s.listeners, i = n.indexOf(e);
  i !== -1 && n.splice(i, 1), !(n.length > 0) && (Bg.forEach((o) => {
    delete t[o];
  }), delete t._chartjs);
}
function $g(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const jg = function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
}();
function Wg(t, e) {
  let s = [], n = !1;
  return function(...i) {
    s = i, n || (n = !0, jg.call(window, () => {
      n = !1, t.apply(e, s);
    }));
  };
}
function T_(t, e) {
  let s;
  return function(...n) {
    return e ? (clearTimeout(s), s = setTimeout(t, e, n)) : t.apply(this, n), e;
  };
}
const oh = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", ce = (t, e, s) => t === "start" ? e : t === "end" ? s : (e + s) / 2, D_ = (t, e, s, n) => t === (n ? "left" : "right") ? s : t === "center" ? (e + s) / 2 : e;
function Vg(t, e, s) {
  const n = e.length;
  let i = 0, o = n;
  if (t._sorted) {
    const { iScale: a, vScale: r, _parsed: l } = t, c = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, h = a.axis, { min: u, max: d, minDefined: f, maxDefined: p } = a.getUserBounds();
    if (f) {
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
    if (p) {
      let g = Math.max(
        // @ts-expect-error Need to type _parsed
        xs(l, a.axis, d, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : xs(e, h, a.getPixelForValue(d), !0).hi + 1
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
function Hg(t) {
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
const ta = (t) => t === 0 || t === 1, ju = (t, e, s) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * Ot / s)), Wu = (t, e, s) => Math.pow(2, -10 * t) * Math.sin((t - e) * Ot / s) + 1, Xi = {
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
  easeInOutExpo: (t) => ta(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => ta(t) ? t : ju(t, 0.075, 0.3),
  easeOutElastic: (t) => ta(t) ? t : Wu(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return ta(t) ? t : t < 0.5 ? 0.5 * ju(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * Wu(t * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (t) => 1 - Xi.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? Xi.easeInBounce(t * 2) * 0.5 : Xi.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function ah(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function Vu(t) {
  return ah(t) ? t : new po(t);
}
function tl(t) {
  return ah(t) ? t : new po(t).saturate(0.5).darken(0.1).hexString();
}
const R_ = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], L_ = [
  "color",
  "borderColor",
  "backgroundColor"
];
function O_(t) {
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
      properties: L_
    },
    numbers: {
      type: "number",
      properties: R_
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
function F_(t) {
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
const Hu = /* @__PURE__ */ new Map();
function E_(t, e) {
  e = e || {};
  const s = t + JSON.stringify(e);
  let n = Hu.get(s);
  return n || (n = new Intl.NumberFormat(t, e), Hu.set(s, n)), n;
}
function Fo(t, e, s) {
  return E_(e, s).format(t);
}
const zg = {
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
      (c < 1e-4 || c > 1e15) && (i = "scientific"), o = I_(t, s);
    }
    const a = Vs(Math.abs(o)), r = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: i,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Fo(t, n, l);
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
    ].includes(n) || e > 0.8 * s.length ? zg.numeric.call(this, t, e, s) : "";
  }
};
function I_(t, e) {
  let s = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(s) >= 1 && t !== Math.floor(t) && (s = t - Math.floor(t)), s;
}
var Dr = {
  formatters: zg
};
function N_(t) {
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
const Dn = /* @__PURE__ */ Object.create(null), Yl = /* @__PURE__ */ Object.create(null);
function Zi(t, e) {
  if (!e)
    return t;
  const s = e.split(".");
  for (let n = 0, i = s.length; n < i; ++n) {
    const o = s[n];
    t = t[o] || (t[o] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function el(t, e, s) {
  return typeof e == "string" ? go(Zi(t, e), s) : go(Zi(t, ""), e);
}
class B_ {
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
    return Zi(this, e);
  }
  describe(e, s) {
    return el(Yl, e, s);
  }
  override(e, s) {
    return el(Dn, e, s);
  }
  route(e, s, n, i) {
    const o = Zi(this, e), a = Zi(this, n), r = "_" + s;
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
var It = /* @__PURE__ */ new B_({
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
  O_,
  F_,
  N_
]);
function $_(t) {
  return !t || mt(t.size) || mt(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function nr(t, e, s, n, i) {
  let o = e[i];
  return o || (o = e[i] = t.measureText(i).width, s.push(i)), o > n && (n = o), n;
}
function j_(t, e, s, n) {
  n = n || {};
  let i = n.data = n.data || {}, o = n.garbageCollect = n.garbageCollect || [];
  n.font !== e && (i = n.data = {}, o = n.garbageCollect = [], n.font = e), t.save(), t.font = e;
  let a = 0;
  const r = s.length;
  let l, c, h, u, d;
  for (l = 0; l < r; l++)
    if (u = s[l], u != null && !Ft(u))
      a = nr(t, i, o, a, u);
    else if (Ft(u))
      for (c = 0, h = u.length; c < h; c++)
        d = u[c], d != null && !Ft(d) && (a = nr(t, i, o, a, d));
  t.restore();
  const f = o.length / 2;
  if (f > s.length) {
    for (l = 0; l < f; l++)
      delete i[o[l]];
    o.splice(0, f);
  }
  return a;
}
function an(t, e, s) {
  const n = t.currentDevicePixelRatio, i = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((e - i) * n) / n + i;
}
function zu(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function Kl(t, e, s, n) {
  Gg(t, e, s, n, null);
}
function Gg(t, e, s, n, i) {
  let o, a, r, l, c, h, u, d;
  const f = e.pointStyle, p = e.rotation, g = e.radius;
  let m = (p || 0) * x_;
  if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(s, n), t.rotate(m), t.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), t.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (t.beginPath(), f) {
      default:
        i ? t.ellipse(s, n, i / 2, g, 0, 0, Ot) : t.arc(s, n, g, 0, Ot), t.closePath();
        break;
      case "triangle":
        h = i ? i / 2 : g, t.moveTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += Iu, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), m += Iu, t.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * g), t.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, a = Math.cos(m + on) * l, u = Math.cos(m + on) * (i ? i / 2 - c : l), r = Math.sin(m + on) * l, d = Math.sin(m + on) * (i ? i / 2 - c : l), t.arc(s - u, n - r, c, m - vt, m - Ut), t.arc(s + d, n - a, c, m - Ut, m), t.arc(s + u, n + r, c, m, m + Ut), t.arc(s - d, n + a, c, m + Ut, m + vt), t.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * g, h = i ? i / 2 : l, t.rect(s - h, n - l, 2 * h, 2 * l);
          break;
        }
        m += on;
      case "rectRot":
        u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + d, n - a), t.lineTo(s + u, n + r), t.lineTo(s - d, n + a), t.closePath();
        break;
      case "crossRot":
        m += on;
      case "cross":
        u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + d, n - a), t.lineTo(s - d, n + a);
        break;
      case "star":
        u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + d, n - a), t.lineTo(s - d, n + a), m += on, u = Math.cos(m) * (i ? i / 2 : g), a = Math.cos(m) * g, r = Math.sin(m) * g, d = Math.sin(m) * (i ? i / 2 : g), t.moveTo(s - u, n - r), t.lineTo(s + u, n + r), t.moveTo(s + d, n - a), t.lineTo(s - d, n + a);
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
function Rr(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function Lr(t) {
  t.restore();
}
function W_(t, e, s, n, i) {
  if (!e)
    return t.lineTo(s.x, s.y);
  if (i === "middle") {
    const o = (e.x + s.x) / 2;
    t.lineTo(o, e.y), t.lineTo(o, s.y);
  } else i === "after" != !!n ? t.lineTo(e.x, s.y) : t.lineTo(s.x, e.y);
  t.lineTo(s.x, s.y);
}
function V_(t, e, s, n) {
  if (!e)
    return t.lineTo(s.x, s.y);
  t.bezierCurveTo(n ? e.cp1x : e.cp2x, n ? e.cp1y : e.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function H_(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), mt(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function z_(t, e, s, n, i) {
  if (i.strikethrough || i.underline) {
    const o = t.measureText(n), a = e - o.actualBoundingBoxLeft, r = e + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, c = s + o.actualBoundingBoxDescent, h = i.strikethrough ? (l + c) / 2 : c;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = i.decorationWidth || 2, t.moveTo(a, h), t.lineTo(r, h), t.stroke();
  }
}
function G_(t, e) {
  const s = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = s;
}
function Rn(t, e, s, n, i, o = {}) {
  const a = Ft(e) ? e : [
    e
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (t.save(), t.font = i.string, H_(t, o), l = 0; l < a.length; ++l)
    c = a[l], o.backdrop && G_(t, o.backdrop), r && (o.strokeColor && (t.strokeStyle = o.strokeColor), mt(o.strokeWidth) || (t.lineWidth = o.strokeWidth), t.strokeText(c, s, n, o.maxWidth)), t.fillText(c, s, n, o.maxWidth), z_(t, s, n, c, o), n += Number(i.lineHeight);
  t.restore();
}
function bo(t, e) {
  const { x: s, y: n, w: i, h: o, radius: a } = e;
  t.arc(s + a.topLeft, n + a.topLeft, a.topLeft, 1.5 * vt, vt, !0), t.lineTo(s, n + o - a.bottomLeft), t.arc(s + a.bottomLeft, n + o - a.bottomLeft, a.bottomLeft, vt, Ut, !0), t.lineTo(s + i - a.bottomRight, n + o), t.arc(s + i - a.bottomRight, n + o - a.bottomRight, a.bottomRight, Ut, 0, !0), t.lineTo(s + i, n + a.topRight), t.arc(s + i - a.topRight, n + a.topRight, a.topRight, 0, -Ut, !0), t.lineTo(s + a.topLeft, n);
}
const U_ = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, q_ = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Y_(t, e) {
  const s = ("" + t).match(U_);
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
const K_ = (t) => +t || 0;
function rh(t, e) {
  const s = {}, n = bt(e), i = n ? Object.keys(e) : e, o = bt(t) ? n ? (a) => ut(t[a], t[e[a]]) : (a) => t[a] : () => t;
  for (const a of i)
    s[a] = K_(o(a));
  return s;
}
function Ug(t) {
  return rh(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Sn(t) {
  return rh(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function me(t) {
  const e = Ug(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function Zt(t, e) {
  t = t || {}, e = e || It.font;
  let s = ut(t.size, e.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = ut(t.style, e.style);
  n && !("" + n).match(q_) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const i = {
    family: ut(t.family, e.family),
    lineHeight: Y_(ut(t.lineHeight, e.lineHeight), s),
    size: s,
    style: n,
    weight: ut(t.weight, e.weight),
    string: ""
  };
  return i.string = $_(i), i;
}
function Ei(t, e, s, n) {
  let i, o, a;
  for (i = 0, o = t.length; i < o; ++i)
    if (a = t[i], a !== void 0 && a !== void 0)
      return a;
}
function J_(t, e, s) {
  const { min: n, max: i } = t, o = Fg(e, (i - n) / 2), a = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: a(n, -Math.abs(o)),
    max: a(i, o)
  };
}
function Qs(t, e) {
  return Object.assign(Object.create(t), e);
}
function lh(t, e = [
  ""
], s, n, i = () => t[0]) {
  const o = s || t;
  typeof n > "u" && (n = Jg("_fallback", t));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: o,
    _fallback: n,
    _getTarget: i,
    override: (r) => lh([
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
      return Yg(r, l, () => ix(l, e, t, r));
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
      return Uu(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Uu(r);
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
function fi(t, e, s, n) {
  const i = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: qg(t, n),
    setContext: (o) => fi(t, o, s, n),
    override: (o) => fi(t.override(o), e, s, n)
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
      return Yg(o, a, () => Z_(o, a, r));
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
function qg(t, e = {
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
const X_ = (t, e) => t ? t + sh(e) : e, ch = (t, e) => bt(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function Yg(t, e, s) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const n = s();
  return t[e] = n, n;
}
function Z_(t, e, s) {
  const { _proxy: n, _context: i, _subProxy: o, _descriptors: a } = t;
  let r = n[e];
  return Zs(r) && a.isScriptable(e) && (r = Q_(e, r, t, s)), Ft(r) && r.length && (r = tx(e, r, t, a.isIndexable)), ch(e, r) && (r = fi(r, i, o && o[e], a)), r;
}
function Q_(t, e, s, n) {
  const { _proxy: i, _context: o, _subProxy: a, _stack: r } = s;
  if (r.has(t))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + t);
  r.add(t);
  let l = e(o, a || n);
  return r.delete(t), ch(t, l) && (l = hh(i._scopes, i, t, l)), l;
}
function tx(t, e, s, n) {
  const { _proxy: i, _context: o, _subProxy: a, _descriptors: r } = s;
  if (typeof o.index < "u" && n(t))
    return e[o.index % e.length];
  if (bt(e[0])) {
    const l = e, c = i._scopes.filter((h) => h !== l);
    e = [];
    for (const h of l) {
      const u = hh(c, i, t, h);
      e.push(fi(u, o, a && a[t], r));
    }
  }
  return e;
}
function Kg(t, e, s) {
  return Zs(t) ? t(e, s) : t;
}
const ex = (t, e) => t === !0 ? e : typeof t == "string" ? Xs(e, t) : void 0;
function sx(t, e, s, n, i) {
  for (const o of e) {
    const a = ex(s, o);
    if (a) {
      t.add(a);
      const r = Kg(a._fallback, s, i);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (a === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function hh(t, e, s, n) {
  const i = e._rootScopes, o = Kg(e._fallback, s, n), a = [
    ...t,
    ...i
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Gu(r, a, s, o || s, n);
  return l === null || typeof o < "u" && o !== s && (l = Gu(r, a, o, l, n), l === null) ? !1 : lh(Array.from(r), [
    ""
  ], i, o, () => nx(e, s, n));
}
function Gu(t, e, s, n, i) {
  for (; s; )
    s = sx(t, e, s, n, i);
  return s;
}
function nx(t, e, s) {
  const n = t._getTarget();
  e in n || (n[e] = {});
  const i = n[e];
  return Ft(i) && bt(s) ? s : i || {};
}
function ix(t, e, s, n) {
  let i;
  for (const o of e)
    if (i = Jg(X_(o, t), s), typeof i < "u")
      return ch(t, i) ? hh(s, n, t, i) : i;
}
function Jg(t, e) {
  for (const s of e) {
    if (!s)
      continue;
    const n = s[t];
    if (typeof n < "u")
      return n;
  }
}
function Uu(t) {
  let e = t._keys;
  return e || (e = t._keys = ox(t._scopes)), e;
}
function ox(t) {
  const e = /* @__PURE__ */ new Set();
  for (const s of t)
    for (const n of Object.keys(s).filter((i) => !i.startsWith("_")))
      e.add(n);
  return Array.from(e);
}
function Xg(t, e, s, n) {
  const { iScale: i } = t, { key: o = "r" } = this._parsing, a = new Array(n);
  let r, l, c, h;
  for (r = 0, l = n; r < l; ++r)
    c = r + s, h = e[c], a[r] = {
      r: i.parse(Xs(h, o), c)
    };
  return a;
}
const ax = Number.EPSILON || 1e-14, pi = (t, e) => e < t.length && !t[e].skip && t[e], Zg = (t) => t === "x" ? "y" : "x";
function rx(t, e, s, n) {
  const i = t.skip ? e : t, o = e, a = s.skip ? e : s, r = ql(o, i), l = ql(a, o);
  let c = r / (r + l), h = l / (r + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const u = n * c, d = n * h;
  return {
    previous: {
      x: o.x - u * (a.x - i.x),
      y: o.y - u * (a.y - i.y)
    },
    next: {
      x: o.x + d * (a.x - i.x),
      y: o.y + d * (a.y - i.y)
    }
  };
}
function lx(t, e, s) {
  const n = t.length;
  let i, o, a, r, l, c = pi(t, 0);
  for (let h = 0; h < n - 1; ++h)
    if (l = c, c = pi(t, h + 1), !(!l || !c)) {
      if (Ji(e[h], 0, ax)) {
        s[h] = s[h + 1] = 0;
        continue;
      }
      i = s[h] / e[h], o = s[h + 1] / e[h], r = Math.pow(i, 2) + Math.pow(o, 2), !(r <= 9) && (a = 3 / Math.sqrt(r), s[h] = i * a * e[h], s[h + 1] = o * a * e[h]);
    }
}
function cx(t, e, s = "x") {
  const n = Zg(s), i = t.length;
  let o, a, r, l = pi(t, 0);
  for (let c = 0; c < i; ++c) {
    if (a = r, r = l, l = pi(t, c + 1), !r)
      continue;
    const h = r[s], u = r[n];
    a && (o = (h - a[s]) / 3, r[`cp1${s}`] = h - o, r[`cp1${n}`] = u - o * e[c]), l && (o = (l[s] - h) / 3, r[`cp2${s}`] = h + o, r[`cp2${n}`] = u + o * e[c]);
  }
}
function hx(t, e = "x") {
  const s = Zg(e), n = t.length, i = Array(n).fill(0), o = Array(n);
  let a, r, l, c = pi(t, 0);
  for (a = 0; a < n; ++a)
    if (r = l, l = c, c = pi(t, a + 1), !!l) {
      if (c) {
        const h = c[e] - l[e];
        i[a] = h !== 0 ? (c[s] - l[s]) / h : 0;
      }
      o[a] = r ? c ? ns(i[a - 1]) !== ns(i[a]) ? 0 : (i[a - 1] + i[a]) / 2 : i[a - 1] : i[a];
    }
  lx(t, i, o), cx(t, o, e);
}
function ea(t, e, s) {
  return Math.max(Math.min(t, s), e);
}
function ux(t, e) {
  let s, n, i, o, a, r = vs(t[0], e);
  for (s = 0, n = t.length; s < n; ++s)
    a = o, o = r, r = s < n - 1 && vs(t[s + 1], e), o && (i = t[s], a && (i.cp1x = ea(i.cp1x, e.left, e.right), i.cp1y = ea(i.cp1y, e.top, e.bottom)), r && (i.cp2x = ea(i.cp2x, e.left, e.right), i.cp2y = ea(i.cp2y, e.top, e.bottom)));
}
function dx(t, e, s, n, i) {
  let o, a, r, l;
  if (e.spanGaps && (t = t.filter((c) => !c.skip)), e.cubicInterpolationMode === "monotone")
    hx(t, i);
  else {
    let c = n ? t[t.length - 1] : t[0];
    for (o = 0, a = t.length; o < a; ++o)
      r = t[o], l = rx(c, r, t[Math.min(o + 1, a - (n ? 0 : 1)) % a], e.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  e.capBezierPoints && ux(t, s);
}
function uh() {
  return typeof window < "u" && typeof document < "u";
}
function dh(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function ir(t, e, s) {
  let n;
  return typeof t == "string" ? (n = parseInt(t, 10), t.indexOf("%") !== -1 && (n = n / 100 * e.parentNode[s])) : n = t, n;
}
const Or = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function fx(t, e) {
  return Or(t).getPropertyValue(e);
}
const px = [
  "top",
  "right",
  "bottom",
  "left"
];
function wn(t, e, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let i = 0; i < 4; i++) {
    const o = px[i];
    n[o] = parseFloat(t[e + "-" + o + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const gx = (t, e, s) => (t > 0 || e > 0) && (!s || !s.shadowRoot);
function mx(t, e) {
  const s = t.touches, n = s && s.length ? s[0] : t, { offsetX: i, offsetY: o } = n;
  let a = !1, r, l;
  if (gx(i, o, t.target))
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
function un(t, e) {
  if ("native" in t)
    return t;
  const { canvas: s, currentDevicePixelRatio: n } = e, i = Or(s), o = i.boxSizing === "border-box", a = wn(i, "padding"), r = wn(i, "border", "width"), { x: l, y: c, box: h } = mx(t, s), u = a.left + (h && r.left), d = a.top + (h && r.top);
  let { width: f, height: p } = e;
  return o && (f -= a.width + r.width, p -= a.height + r.height), {
    x: Math.round((l - u) / f * s.width / n),
    y: Math.round((c - d) / p * s.height / n)
  };
}
function yx(t, e, s) {
  let n, i;
  if (e === void 0 || s === void 0) {
    const o = t && dh(t);
    if (!o)
      e = t.clientWidth, s = t.clientHeight;
    else {
      const a = o.getBoundingClientRect(), r = Or(o), l = wn(r, "border", "width"), c = wn(r, "padding");
      e = a.width - c.width - l.width, s = a.height - c.height - l.height, n = ir(r.maxWidth, o, "clientWidth"), i = ir(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: e,
    height: s,
    maxWidth: n || sr,
    maxHeight: i || sr
  };
}
const Hs = (t) => Math.round(t * 10) / 10;
function bx(t, e, s, n) {
  const i = Or(t), o = wn(i, "margin"), a = ir(i.maxWidth, t, "clientWidth") || sr, r = ir(i.maxHeight, t, "clientHeight") || sr, l = yx(t, e, s);
  let { width: c, height: h } = l;
  if (i.boxSizing === "content-box") {
    const d = wn(i, "border", "width"), f = wn(i, "padding");
    c -= f.width + d.width, h -= f.height + d.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, n ? c / n : h - o.height), c = Hs(Math.min(c, a, l.maxWidth)), h = Hs(Math.min(h, r, l.maxHeight)), c && !h && (h = Hs(c / 2)), (e !== void 0 || s !== void 0) && n && l.height && h > l.height && (h = l.height, c = Hs(Math.floor(h * n))), {
    width: c,
    height: h
  };
}
function qu(t, e, s) {
  const n = e || 1, i = Hs(t.height * n), o = Hs(t.width * n);
  t.height = Hs(t.height), t.width = Hs(t.width);
  const a = t.canvas;
  return a.style && (s || !a.style.height && !a.style.width) && (a.style.height = `${t.height}px`, a.style.width = `${t.width}px`), t.currentDevicePixelRatio !== n || a.height !== i || a.width !== o ? (t.currentDevicePixelRatio = n, a.height = i, a.width = o, t.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const _x = function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    uh() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
}();
function Yu(t, e) {
  const s = fx(t, e), n = s && s.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function dn(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: t.y + s * (e.y - t.y)
  };
}
function xx(t, e, s, n) {
  return {
    x: t.x + s * (e.x - t.x),
    y: n === "middle" ? s < 0.5 ? t.y : e.y : n === "after" ? s < 1 ? t.y : e.y : s > 0 ? e.y : t.y
  };
}
function vx(t, e, s, n) {
  const i = {
    x: t.cp2x,
    y: t.cp2y
  }, o = {
    x: e.cp1x,
    y: e.cp1y
  }, a = dn(t, i, s), r = dn(i, o, s), l = dn(o, e, s), c = dn(a, r, s), h = dn(r, l, s);
  return dn(c, h, s);
}
const Sx = function(t, e) {
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
}, wx = function() {
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
  return t ? Sx(e, s) : wx();
}
function Qg(t, e) {
  let s, n;
  (e === "ltr" || e === "rtl") && (s = t.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", e, "important"), t.prevTextDirection = n);
}
function tm(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function em(t) {
  return t === "angle" ? {
    between: yo,
    compare: C_,
    normalize: de
  } : {
    between: _s,
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
function Cx(t, e, s) {
  const { property: n, start: i, end: o } = s, { between: a, normalize: r } = em(n), l = e.length;
  let { start: c, end: h, loop: u } = t, d, f;
  if (u) {
    for (c += l, h += l, d = 0, f = l; d < f && a(r(e[c % l][n]), i, o); ++d)
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
function sm(t, e, s) {
  if (!s)
    return [
      t
    ];
  const { property: n, start: i, end: o } = s, a = e.length, { compare: r, between: l, normalize: c } = em(n), { start: h, end: u, loop: d, style: f } = Cx(t, e, s), p = [];
  let g = !1, m = null, _, y, b;
  const v = () => l(i, b, _) && r(i, b) !== 0, w = () => r(o, _) === 0 || l(o, b, _), S = () => g || v(), x = () => !g || w();
  for (let k = h, P = h; k <= u; ++k)
    y = e[k % a], !y.skip && (_ = c(y[n]), _ !== b && (g = l(_, i, o), m === null && S() && (m = r(_, i) === 0 ? k : P), m !== null && x() && (p.push(Ku({
      start: m,
      end: k,
      loop: d,
      count: a,
      style: f
    })), m = null), P = k, b = _));
  return m !== null && p.push(Ku({
    start: m,
    end: u,
    loop: d,
    count: a,
    style: f
  })), p;
}
function nm(t, e) {
  const s = [], n = t.segments;
  for (let i = 0; i < n.length; i++) {
    const o = sm(n[i], t.points, e);
    o.length && s.push(...o);
  }
  return s;
}
function kx(t, e, s, n) {
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
function Mx(t, e, s, n) {
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
function Ax(t, e) {
  const s = t.points, n = t.options.spanGaps, i = s.length;
  if (!i)
    return [];
  const o = !!t._loop, { start: a, end: r } = kx(s, i, o, n);
  if (n === !0)
    return Ju(t, [
      {
        start: a,
        end: r,
        loop: o
      }
    ], s, e);
  const l = r < a ? r + i : r, c = !!t._fullLoop && a === 0 && r === i - 1;
  return Ju(t, Mx(s, a, l, c), s, e);
}
function Ju(t, e, s, n) {
  return !n || !n.setContext || !s ? e : Px(t, e, s, n);
}
function Px(t, e, s, n) {
  const i = t._chart.getContext(), o = Xu(t.options), { _datasetIndex: a, options: { spanGaps: r } } = t, l = s.length, c = [];
  let h = o, u = e[0].start, d = u;
  function f(p, g, m, _) {
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
    for (d = u + 1; d <= p.end; d++) {
      const _ = s[d % l];
      m = Xu(n.setContext(Qs(i, {
        type: "segment",
        p0: g,
        p1: _,
        p0DataIndex: (d - 1) % l,
        p1DataIndex: d % l,
        datasetIndex: a
      }))), Tx(m, h) && f(u, d - 1, p.loop, h), g = _, h = m;
    }
    u < d - 1 && f(u, d - 1, p.loop, h);
  }
  return c;
}
function Xu(t) {
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
function Tx(t, e) {
  if (!e)
    return !1;
  const s = [], n = function(i, o) {
    return ah(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(t, n) !== JSON.stringify(e, n);
}
function sa(t, e, s) {
  return t.options.clip ? t[s] : e[s];
}
function Dx(t, e) {
  const { xScale: s, yScale: n } = t;
  return s && n ? {
    left: sa(s, e, "left"),
    right: sa(s, e, "right"),
    top: sa(n, e, "top"),
    bottom: sa(n, e, "bottom")
  } : e;
}
function im(t, e) {
  const s = e._clip;
  if (s.disabled)
    return !1;
  const n = Dx(e, t.chartArea);
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
class Rx {
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
    this._request || (this._running = !0, this._request = jg.call(window, () => {
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
var hs = /* @__PURE__ */ new Rx();
const Zu = "transparent", Lx = {
  boolean(t, e, s) {
    return s > 0.5 ? e : t;
  },
  color(t, e, s) {
    const n = Vu(t || Zu), i = n.valid && Vu(e || Zu);
    return i && i.valid ? i.mix(n, s).hexString() : e;
  },
  number(t, e, s) {
    return t + (e - t) * s;
  }
};
class Ox {
  constructor(e, s, n, i) {
    const o = s[n];
    i = Ei([
      e.to,
      i,
      o,
      e.from
    ]);
    const a = Ei([
      e.from,
      o,
      i
    ]);
    this._active = !0, this._fn = e.fn || Lx[e.type || typeof a], this._easing = Xi[e.easing] || Xi.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = s, this._prop = n, this._from = a, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, s, n) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], o = n - this._start, a = this._duration - o;
      this._start = n, this._duration = Math.floor(Math.max(a, e.duration)), this._total += o, this._loop = !!e.loop, this._to = Ei([
        e.to,
        s,
        i,
        e.from
      ]), this._from = Ei([
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
class om {
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
    const n = s.options, i = Ex(e, n);
    if (!i)
      return [];
    const o = this._createAnimations(i, n);
    return n.$shared && Fx(e.options.$animations, n).then(() => {
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
      o[c] = u = new Ox(d, e, c, h), i.push(u);
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
function Fx(t, e) {
  const s = [], n = Object.keys(e);
  for (let i = 0; i < n.length; i++) {
    const o = t[n[i]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function Ex(t, e) {
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
function Qu(t, e) {
  const s = t && t.options || {}, n = s.reverse, i = s.min === void 0 ? e : 0, o = s.max === void 0 ? e : 0;
  return {
    start: n ? o : i,
    end: n ? i : o
  };
}
function Ix(t, e, s) {
  if (s === !1)
    return !1;
  const n = Qu(t, s), i = Qu(e, s);
  return {
    top: i.end,
    right: n.end,
    bottom: i.start,
    left: n.start
  };
}
function Nx(t) {
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
  let i, o;
  for (i = 0, o = n.length; i < o; ++i)
    s.push(n[i].index);
  return s;
}
function td(t, e, s, n = {}) {
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
    c = t.values[l], $t(c) && (o || e === 0 || ns(e) === ns(c)) && (e += c);
  }
  return !h && !n.all ? 0 : e;
}
function Bx(t, e) {
  const { iScale: s, vScale: n } = e, i = s.axis === "x" ? "x" : "y", o = n.axis === "x" ? "x" : "y", a = Object.keys(t), r = new Array(a.length);
  let l, c, h;
  for (l = 0, c = a.length; l < c; ++l)
    h = a[l], r[l] = {
      [i]: h,
      [o]: t[h]
    };
  return r;
}
function sl(t, e) {
  const s = t && t.options.stacked;
  return s || s === void 0 && e.stack !== void 0;
}
function $x(t, e, s) {
  return `${t.id}.${e.id}.${s.stack || s.type}`;
}
function jx(t) {
  const { min: e, max: s, minDefined: n, maxDefined: i } = t.getUserBounds();
  return {
    min: n ? e : Number.NEGATIVE_INFINITY,
    max: i ? s : Number.POSITIVE_INFINITY
  };
}
function Wx(t, e, s) {
  const n = t[e] || (t[e] = {});
  return n[s] || (n[s] = {});
}
function ed(t, e, s, n) {
  for (const i of e.getMatchingVisibleMetas(n).reverse()) {
    const o = t[i.index];
    if (s && o > 0 || !s && o < 0)
      return i.index;
  }
  return null;
}
function sd(t, e) {
  const { chart: s, _cachedMeta: n } = t, i = s._stacks || (s._stacks = {}), { iScale: o, vScale: a, index: r } = n, l = o.axis, c = a.axis, h = $x(o, a, n), u = e.length;
  let d;
  for (let f = 0; f < u; ++f) {
    const p = e[f], { [l]: g, [c]: m } = p, _ = p._stacks || (p._stacks = {});
    d = _[c] = Wx(i, h, g), d[r] = m, d._top = ed(d, a, !0, n.type), d._bottom = ed(d, a, !1, n.type);
    const y = d._visualValues || (d._visualValues = {});
    y[r] = m;
  }
}
function nl(t, e) {
  const s = t.scales;
  return Object.keys(s).filter((n) => s[n].axis === e).shift();
}
function Vx(t, e) {
  return Qs(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function Hx(t, e, s) {
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
function ki(t, e) {
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
const il = (t) => t === "reset" || t === "none", nd = (t, e) => e ? t : Object.assign({}, t), zx = (t, e, s) => t && !e.hidden && e._stacked && {
  keys: am(s, !0),
  values: null
};
class Ye {
  constructor(e, s) {
    this.chart = e, this._ctx = e.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = sl(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && ki(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, s = this._cachedMeta, n = this.getDataset(), i = (u, d, f, p) => u === "x" ? d : u === "r" ? p : f, o = s.xAxisID = ut(n.xAxisID, nl(e, "x")), a = s.yAxisID = ut(n.yAxisID, nl(e, "y")), r = s.rAxisID = ut(n.rAxisID, nl(e, "r")), l = s.indexAxis, c = s.iAxisID = i(l, o, a, r), h = s.vAxisID = i(l, a, o, r);
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
    this._data && $u(this._data, this), e._stacked && ki(e);
  }
  _dataCheck() {
    const e = this.getDataset(), s = e.data || (e.data = []), n = this._data;
    if (bt(s)) {
      const i = this._cachedMeta;
      this._data = Bx(s, i);
    } else if (n !== s) {
      if (n) {
        $u(n, this);
        const i = this._cachedMeta;
        ki(i), i._parsed = [];
      }
      s && Object.isExtensible(s) && P_(s, this), this._syncList = [], this._data = s;
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
    s._stacked = sl(s.vScale, s), s.stack !== n.stack && (i = !0, ki(s), s.stack = n.stack), this._resyncElements(e), (i || o !== s._stacked) && (sd(this, s._parsed), s._stacked = sl(s.vScale, s));
  }
  configure() {
    const e = this.chart.config, s = e.datasetScopeKeys(this._type), n = e.getOptionScopes(this.getDataset(), s, !0);
    this.options = e.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, s) {
    const { _cachedMeta: n, _data: i } = this, { iScale: o, _stacked: a } = n, r = o.axis;
    let l = e === 0 && s === i.length ? !0 : n._sorted, c = e > 0 && n._parsed[e - 1], h, u, d;
    if (this._parsing === !1)
      n._parsed = i, n._sorted = !0, d = i;
    else {
      Ft(i[e]) ? d = this.parseArrayData(n, i, e, s) : bt(i[e]) ? d = this.parseObjectData(n, i, e, s) : d = this.parsePrimitiveData(n, i, e, s);
      const f = () => u[r] === null || c && u[r] < c[r];
      for (h = 0; h < s; ++h)
        n._parsed[h + e] = u = d[h], l && (f() && (l = !1), c = u);
      n._sorted = l;
    }
    a && sd(this, d);
  }
  parsePrimitiveData(e, s, n, i) {
    const { iScale: o, vScale: a } = e, r = o.axis, l = a.axis, c = o.getLabels(), h = o === a, u = new Array(i);
    let d, f, p;
    for (d = 0, f = i; d < f; ++d)
      p = d + n, u[d] = {
        [r]: h || o.parse(c[p], p),
        [l]: a.parse(s[p], p)
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
    let h, u, d, f;
    for (h = 0, u = i; h < u; ++h)
      d = h + n, f = s[d], c[h] = {
        x: o.parse(Xs(f, r), d),
        y: a.parse(Xs(f, l), d)
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
      keys: am(i, !0),
      values: s._stacks[e.axis]._visualValues
    };
    return td(r, a, o.index, {
      mode: n
    });
  }
  updateRangeFromParsed(e, s, n, i) {
    const o = n[s.axis];
    let a = o === null ? NaN : o;
    const r = i && n._stacks[s.axis];
    i && r && (i.values = r, a = td(i, o, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
  }
  getMinMax(e, s) {
    const n = this._cachedMeta, i = n._parsed, o = n._sorted && e === n.iScale, a = i.length, r = this._getOtherScale(e), l = zx(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = jx(r);
    let d, f;
    function p() {
      f = i[d];
      const g = f[r.axis];
      return !$t(f[e.axis]) || h > g || u < g;
    }
    for (d = 0; d < a && !(!p() && (this.updateRangeFromParsed(c, e, f, l), o)); ++d)
      ;
    if (o) {
      for (d = a - 1; d >= 0; --d)
        if (!p()) {
          this.updateRangeFromParsed(c, e, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(e) {
    const s = this._cachedMeta._parsed, n = [];
    let i, o, a;
    for (i = 0, o = s.length; i < o; ++i)
      a = s[i][e.axis], $t(a) && n.push(a);
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
    this.update(e || "default"), s._clip = Nx(ut(this.options.clip, Ix(s.xScale, s.yScale, this.getMaxOverflow())));
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
      o = a.$context || (a.$context = Hx(this.getContext(), e, a)), o.parsed = this.getParsed(e), o.raw = i.data[e], o.index = o.dataIndex = e;
    } else
      o = this.$context || (this.$context = Vx(this.chart.getContext(), this.index)), o.dataset = i, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = n, o;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, e);
  }
  _resolveElementOptions(e, s = "default", n) {
    const i = s === "active", o = this._cachedDataOpts, a = e + "-" + s, r = o[a], l = this.enableOptionSharing && mo(n);
    if (r)
      return nd(r, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, e), u = i ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], d = c.getOptionScopes(this.getDataset(), h), f = Object.keys(It.elements[e]), p = () => this.getContext(n, i, s), g = c.resolveNamedOptions(d, f, p, u);
    return g.$shared && (g.$shared = l, o[a] = Object.freeze(nd(g, l))), g;
  }
  _resolveAnimations(e, s, n) {
    const i = this.chart, o = this._cachedDataOpts, a = `animation-${s}`, r = o[a];
    if (r)
      return r;
    let l;
    if (i.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, s), d = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(d, this.getContext(e, n, s));
    }
    const c = new om(i, l && l.animations);
    return l && l._cacheable && (o[a] = Object.freeze(c)), c;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, s) {
    return !s || il(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, s) {
    const n = this.resolveDataElementOptions(e, s), i = this._sharedOptions, o = this.getSharedOptions(n), a = this.includeOptions(s, o) || o !== i;
    return this.updateSharedOptions(o, s, n), {
      sharedOptions: o,
      includeOptions: a
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
      n._stacked && ki(n, i);
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
function Gx(t, e) {
  if (!t._cache.$bar) {
    const s = t.getMatchingVisibleMetas(e);
    let n = [];
    for (let i = 0, o = s.length; i < o; i++)
      n = n.concat(s[i].controller.getAllParsedValues(t));
    t._cache.$bar = $g(n.sort((i, o) => i - o));
  }
  return t._cache.$bar;
}
function Ux(t) {
  const e = t.iScale, s = Gx(e, t.type);
  let n = e._length, i, o, a, r;
  const l = () => {
    a === 32767 || a === -32768 || (mo(r) && (n = Math.min(n, Math.abs(a - r) || n)), r = a);
  };
  for (i = 0, o = s.length; i < o; ++i)
    a = e.getPixelForValue(s[i]), l();
  for (r = void 0, i = 0, o = e.ticks.length; i < o; ++i)
    a = e.getPixelForTick(i), l();
  return n;
}
function qx(t, e, s, n) {
  const i = s.barThickness;
  let o, a;
  return mt(i) ? (o = e.min * s.categoryPercentage, a = s.barPercentage) : (o = i * n, a = 1), {
    chunk: o / n,
    ratio: a,
    start: e.pixels[t] - o / 2
  };
}
function Yx(t, e, s, n) {
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
function Kx(t, e, s, n) {
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
function rm(t, e, s, n) {
  return Ft(t) ? Kx(t, e, s, n) : e[s.axis] = s.parse(t, n), e;
}
function id(t, e, s, n) {
  const i = t.iScale, o = t.vScale, a = i.getLabels(), r = i === o, l = [];
  let c, h, u, d;
  for (c = s, h = s + n; c < h; ++c)
    d = e[c], u = {}, u[i.axis] = r || i.parse(a[c], c), l.push(rm(d, u, o, c));
  return l;
}
function ol(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function Jx(t, e, s) {
  return t !== 0 ? ns(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= s ? 1 : -1);
}
function Xx(t) {
  let e, s, n, i, o;
  return t.horizontal ? (e = t.base > t.x, s = "left", n = "right") : (e = t.base < t.y, s = "bottom", n = "top"), e ? (i = "end", o = "start") : (i = "start", o = "end"), {
    start: s,
    end: n,
    reverse: e,
    top: i,
    bottom: o
  };
}
function Zx(t, e, s, n) {
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
  const { start: a, end: r, reverse: l, top: c, bottom: h } = Xx(t);
  i === "middle" && s && (t.enableBorderRadius = !0, (s._top || 0) === n ? i = c : (s._bottom || 0) === n ? i = h : (o[od(h, a, r, l)] = !0, i = c)), o[od(i, a, r, l)] = !0, t.borderSkipped = o;
}
function od(t, e, s, n) {
  return n ? (t = Qx(t, e, s), t = ad(t, s, e)) : t = ad(t, e, s), t;
}
function Qx(t, e, s) {
  return t === e ? s : t === s ? e : t;
}
function ad(t, e, s) {
  return t === "start" ? e : t === "end" ? s : t;
}
function tv(t, { inflateAmount: e }, s) {
  t.inflateAmount = e === "auto" ? s === 1 ? 0.33 : 0 : e;
}
class _a extends Ye {
  parsePrimitiveData(e, s, n, i) {
    return id(e, s, n, i);
  }
  parseArrayData(e, s, n, i) {
    return id(e, s, n, i);
  }
  parseObjectData(e, s, n, i) {
    const { iScale: o, vScale: a } = e, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? r : l, h = a.axis === "x" ? r : l, u = [];
    let d, f, p, g;
    for (d = n, f = n + i; d < f; ++d)
      g = s[d], p = {}, p[o.axis] = o.parse(Xs(g, c), d), u.push(rm(Xs(g, h), p, a, d));
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
    const s = this._cachedMeta, { iScale: n, vScale: i } = s, o = this.getParsed(e), a = o._custom, r = ol(a) ? "[" + a.start + ", " + a.end + "]" : "" + i.getLabelForValue(o[i.axis]);
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
    const o = i === "reset", { index: a, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), h = this._getRuler(), { sharedOptions: u, includeOptions: d } = this._getSharedOptions(s, i);
    for (let f = s; f < s + n; f++) {
      const p = this.getParsed(f), g = o || mt(p[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(f), m = this._calculateBarIndexPixels(f, h), _ = (p._stacks || {})[r.axis], y = {
        horizontal: c,
        base: g.base,
        enableBorderRadius: !_ || ol(p._custom) || a === _._top || a === _._bottom,
        x: c ? g.head : m.center,
        y: c ? m.center : g.head,
        height: c ? m.size : Math.abs(g.size),
        width: c ? Math.abs(g.size) : m.size
      };
      d && (y.options = u || this.resolveDataElementOptions(f, e[f].active ? "active" : i));
      const b = y.options || e[f].options;
      Zx(y, b, _, a), tv(y, b, h.ratio), this.updateElement(e[f], f, y, i);
    }
  }
  _getStacks(e, s) {
    const { iScale: n } = this._cachedMeta, i = n.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), o = n.options.stacked, a = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (h) => {
      const u = h._parsed.find((f) => f[n.axis] === l), d = u && u[h.vScale.axis];
      if (mt(d) || isNaN(d))
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
      min: r || Ux(s),
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
    const { _cachedMeta: { vScale: s, _stacked: n, index: i }, options: { base: o, minBarLength: a } } = this, r = o || 0, l = this.getParsed(e), c = l._custom, h = ol(c);
    let u = l[s.axis], d = 0, f = n ? this.applyStack(s, l, n) : u, p, g;
    f !== u && (d = f - u, f = u), h && (u = c.barStart, f = c.barEnd - c.barStart, u !== 0 && ns(u) !== ns(c.barEnd) && (d = 0), d += u);
    const m = !mt(o) && !h ? o : d;
    let _ = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(e) ? p = s.getPixelForValue(d + f) : p = _, g = p - _, Math.abs(g) < a) {
      g = Jx(g, s, r) * a, u === r && (_ -= g / 2);
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
    const n = s.scale, i = this.options, o = i.skipNull, a = ut(i.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const h = o ? this._getStackCount(e) : s.stackCount, u = i.barThickness === "flex" ? Yx(e, s, i, h * c) : qx(e, s, i, h * c), d = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, f = this._getAxis().indexOf(ut(d, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, o ? e : void 0) + f;
      r = u.start + u.chunk * p + u.chunk / 2, l = Math.min(a, u.chunk * u.ratio);
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
Q(_a, "id", "bar"), Q(_a, "defaults", {
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
}), Q(_a, "overrides", {
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
class xa extends Ye {
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
    for (let d = s; d < s + n; d++) {
      const f = e[d], p = !o && this.getParsed(d), g = {}, m = g[h] = o ? a.getPixelForDecimal(0.5) : a.getPixelForValue(p[h]), _ = g[u] = o ? r.getBasePixel() : r.getPixelForValue(p[u]);
      g.skip = isNaN(m) || isNaN(_), c && (g.options = l || this.resolveDataElementOptions(d, f.active ? "active" : i), o && (g.options.radius = 0)), this.updateElement(f, d, g, i);
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
Q(xa, "id", "bubble"), Q(xa, "defaults", {
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
}), Q(xa, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function ev(t, e, s) {
  let n = 1, i = 1, o = 0, a = 0;
  if (e < Ot) {
    const r = t, l = r + e, c = Math.cos(r), h = Math.sin(r), u = Math.cos(l), d = Math.sin(l), f = (b, v, w) => yo(b, r, l, !0) ? 1 : Math.max(v, v * s, w, w * s), p = (b, v, w) => yo(b, r, l, !0) ? -1 : Math.min(v, v * s, w, w * s), g = f(0, c, u), m = f(Ut, h, d), _ = p(vt, c, u), y = p(vt + Ut, h, d);
    n = (g - _) / 2, i = (m - y) / 2, o = -(g + _) / 2, a = -(m + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: i,
    offsetX: o,
    offsetY: a
  };
}
class gn extends Ye {
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
        o = (c) => +Xs(n[c], l);
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
    const s = this.chart, { chartArea: n } = s, i = this._cachedMeta, o = i.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - a) / 2, 0), l = Math.min(f_(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: u } = this._getRotationExtents(), { ratioX: d, ratioY: f, offsetX: p, offsetY: g } = ev(u, h, l), m = (n.width - a) / d, _ = (n.height - a) / f, y = Math.max(Math.min(m, _) / 2, 0), b = Fg(this.options.radius, y), v = Math.max(b * l, 0), w = (b - v) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * b, this.offsetY = g * b, i.total = this.calculateTotal(), this.outerRadius = b - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * c, 0), this.updateElements(o, 0, o.length, e);
  }
  _circumference(e, s) {
    const n = this.options, i = this._cachedMeta, o = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(e) || i._parsed[e] === null || i.data[e].hidden ? 0 : this.calculateCircumference(i._parsed[e] * o / Ot);
  }
  updateElements(e, s, n, i) {
    const o = i === "reset", a = this.chart, r = a.chartArea, c = a.options.animation, h = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, d = o && c.animateScale, f = d ? 0 : this.innerRadius, p = d ? 0 : this.outerRadius, { sharedOptions: g, includeOptions: m } = this._getSharedOptions(s, i);
    let _ = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      _ += this._circumference(y, o);
    for (y = s; y < s + n; ++y) {
      const b = this._circumference(y, o), v = e[y], w = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: _,
        endAngle: _ + b,
        circumference: b,
        outerRadius: p,
        innerRadius: f
      };
      m && (w.options = g || this.resolveDataElementOptions(y, v.active ? "active" : i)), _ += b, this.updateElement(v, y, w, i);
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
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], o = Fo(s._parsed[e], n.options.locale);
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
class va extends Ye {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const s = this._cachedMeta, { dataset: n, data: i = [], _dataset: o } = s, a = this.chart._animationsDisabled;
    let { start: r, count: l } = Vg(s, i, a);
    this._drawStart = r, this._drawCount = l, Hg(s) && (r = 0, l = i.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = i;
    const c = this.resolveDatasetElementOptions(e);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !a,
      options: c
    }, e), this.updateElements(i, r, l, e);
  }
  updateElements(e, s, n, i) {
    const o = i === "reset", { iScale: a, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(s, i), d = a.axis, f = r.axis, { spanGaps: p, segment: g } = this.options, m = di(p) ? p : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || i === "none", y = s + n, b = e.length;
    let v = s > 0 && this.getParsed(s - 1);
    for (let w = 0; w < b; ++w) {
      const S = e[w], x = _ ? S : {};
      if (w < s || w >= y) {
        x.skip = !0;
        continue;
      }
      const k = this.getParsed(w), P = mt(k[f]), F = x[d] = a.getPixelForValue(k[d], w), E = x[f] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, k, l) : k[f], w);
      x.skip = isNaN(F) || isNaN(E) || P, x.stop = w > 0 && Math.abs(k[d] - v[d]) > m, g && (x.parsed = k, x.raw = c.data[w]), u && (x.options = h || this.resolveDataElementOptions(w, S.active ? "active" : i)), _ || this.updateElement(S, w, x, i), v = k;
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
Q(va, "id", "line"), Q(va, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Q(va, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class Qi extends Ye {
  constructor(e, s) {
    super(e, s), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], o = Fo(s._parsed[e].r, n.options.locale);
    return {
      label: i[e] || "",
      value: o
    };
  }
  parseObjectData(e, s, n, i) {
    return Xg.bind(this)(e, s, n, i);
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
    const o = i === "reset", a = this.chart, l = a.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, u = c.yCenter, d = c.getIndexAngle(0) - 0.5 * vt;
    let f = d, p;
    const g = 360 / this.countVisibleElements();
    for (p = 0; p < s; ++p)
      f += this._computeAngle(p, i, g);
    for (p = s; p < s + n; p++) {
      const m = e[p];
      let _ = f, y = f + this._computeAngle(p, i, g), b = a.getDataVisibility(p) ? c.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
      f = y, o && (l.animateScale && (b = 0), l.animateRotate && (_ = y = d));
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
Q(Qi, "id", "polarArea"), Q(Qi, "defaults", {
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
}), Q(Qi, "overrides", {
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
class Jl extends gn {
}
Q(Jl, "id", "pie"), Q(Jl, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class Sa extends Ye {
  getLabelAndValue(e) {
    const s = this._cachedMeta.vScale, n = this.getParsed(e);
    return {
      label: s.getLabels()[e],
      value: "" + s.getLabelForValue(n[s.axis])
    };
  }
  parseObjectData(e, s, n, i) {
    return Xg.bind(this)(e, s, n, i);
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
      const l = e[r], c = this.resolveDataElementOptions(r, l.active ? "active" : i), h = o.getPointPositionForValue(r, this.getParsed(r).r), u = a ? o.xCenter : h.x, d = a ? o.yCenter : h.y, f = {
        x: u,
        y: d,
        angle: h.angle,
        skip: isNaN(u) || isNaN(d),
        options: c
      };
      this.updateElement(l, r, f, i);
    }
  }
}
Q(Sa, "id", "radar"), Q(Sa, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), Q(Sa, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class wa extends Ye {
  getLabelAndValue(e) {
    const s = this._cachedMeta, n = this.chart.data.labels || [], { xScale: i, yScale: o } = s, a = this.getParsed(e), r = i.getLabelForValue(a.x), l = o.getLabelForValue(a.y);
    return {
      label: n[e] || "",
      value: "(" + r + ", " + l + ")"
    };
  }
  update(e) {
    const s = this._cachedMeta, { data: n = [] } = s, i = this.chart._animationsDisabled;
    let { start: o, count: a } = Vg(s, n, i);
    if (this._drawStart = o, this._drawCount = a, Hg(s) && (o = 0, a = n.length), this.options.showLine) {
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
    const o = i === "reset", { iScale: a, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(s, i), u = this.getSharedOptions(h), d = this.includeOptions(i, u), f = a.axis, p = r.axis, { spanGaps: g, segment: m } = this.options, _ = di(g) ? g : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || o || i === "none";
    let b = s > 0 && this.getParsed(s - 1);
    for (let v = s; v < s + n; ++v) {
      const w = e[v], S = this.getParsed(v), x = y ? w : {}, k = mt(S[p]), P = x[f] = a.getPixelForValue(S[f], v), F = x[p] = o || k ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, S, l) : S[p], v);
      x.skip = isNaN(P) || isNaN(F) || k, x.stop = v > 0 && Math.abs(S[f] - b[f]) > _, m && (x.parsed = S, x.raw = c.data[v]), d && (x.options = u || this.resolveDataElementOptions(v, w.active ? "active" : i)), y || this.updateElement(w, v, x, i), b = S;
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
Q(wa, "id", "scatter"), Q(wa, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), Q(wa, "overrides", {
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
var sv = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: _a,
  BubbleController: xa,
  DoughnutController: gn,
  LineController: va,
  PieController: Jl,
  PolarAreaController: Qi,
  RadarController: Sa,
  ScatterController: wa
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
var nv = {
  _date: fh
};
function iv(t, e, s, n) {
  const { controller: i, data: o, _sorted: a } = t, r = i._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (r && e === r.axis && e !== "r" && a && o.length) {
    const c = r._reversePixels ? M_ : xs;
    if (n) {
      if (i._sharedOptions) {
        const h = o[0], u = typeof h.getRange == "function" && h.getRange(e);
        if (u) {
          const d = c(o, e, s - u), f = c(o, e, s + u);
          return {
            lo: d.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const h = c(o, e, s);
      if (l) {
        const { vScale: u } = i._cachedMeta, { _parsed: d } = t, f = d.slice(0, h.lo + 1).reverse().findIndex((g) => !mt(g[u.axis]));
        h.lo -= Math.max(0, f);
        const p = d.slice(h.hi).findIndex((g) => !mt(g[u.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Fr(t, e, s, n, i) {
  const o = t.getSortedVisibleDatasetMetas(), a = s[e];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: c, data: h } = o[r], { lo: u, hi: d } = iv(o[r], e, a, i);
    for (let f = u; f <= d; ++f) {
      const p = h[f];
      p.skip || n(p, c, f);
    }
  }
}
function ov(t) {
  const e = t.indexOf("x") !== -1, s = t.indexOf("y") !== -1;
  return function(n, i) {
    const o = e ? Math.abs(n.x - i.x) : 0, a = s ? Math.abs(n.y - i.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function al(t, e, s, n, i) {
  const o = [];
  return !i && !t.isPointInArea(e) || Fr(t, s, e, function(r, l, c) {
    !i && !vs(r, t.chartArea, 0) || r.inRange(e.x, e.y, n) && o.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function av(t, e, s, n) {
  let i = [];
  function o(a, r, l) {
    const { startAngle: c, endAngle: h } = a.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: u } = Ng(a, {
      x: e.x,
      y: e.y
    });
    yo(u, c, h) && i.push({
      element: a,
      datasetIndex: r,
      index: l
    });
  }
  return Fr(t, s, e, o), i;
}
function rv(t, e, s, n, i, o) {
  let a = [];
  const r = ov(s);
  let l = Number.POSITIVE_INFINITY;
  function c(h, u, d) {
    const f = h.inRange(e.x, e.y, i);
    if (n && !f)
      return;
    const p = h.getCenterPoint(i);
    if (!(!!o || t.isPointInArea(p)) && !f)
      return;
    const m = r(e, p);
    m < l ? (a = [
      {
        element: h,
        datasetIndex: u,
        index: d
      }
    ], l = m) : m === l && a.push({
      element: h,
      datasetIndex: u,
      index: d
    });
  }
  return Fr(t, s, e, c), a;
}
function rl(t, e, s, n, i, o) {
  return !o && !t.isPointInArea(e) ? [] : s === "r" && !n ? av(t, e, s, i) : rv(t, e, s, n, i, o);
}
function rd(t, e, s, n, i) {
  const o = [], a = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Fr(t, s, e, (l, c, h) => {
    l[a] && l[a](e[s], i) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), r = r || l.inRange(e.x, e.y, i));
  }), n && !r ? [] : o;
}
var lv = {
  modes: {
    index(t, e, s, n) {
      const i = un(e, t), o = s.axis || "x", a = s.includeInvisible || !1, r = s.intersect ? al(t, i, o, n, a) : rl(t, i, o, !1, n, a), l = [];
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
      const i = un(e, t), o = s.axis || "xy", a = s.includeInvisible || !1;
      let r = s.intersect ? al(t, i, o, n, a) : rl(t, i, o, !1, n, a);
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
      const i = un(e, t), o = s.axis || "xy", a = s.includeInvisible || !1;
      return al(t, i, o, n, a);
    },
    nearest(t, e, s, n) {
      const i = un(e, t), o = s.axis || "xy", a = s.includeInvisible || !1;
      return rl(t, i, o, s.intersect, n, a);
    },
    x(t, e, s, n) {
      const i = un(e, t);
      return rd(t, i, "x", s.intersect, n);
    },
    y(t, e, s, n) {
      const i = un(e, t);
      return rd(t, i, "y", s.intersect, n);
    }
  }
};
const lm = [
  "left",
  "top",
  "right",
  "bottom"
];
function Mi(t, e) {
  return t.filter((s) => s.pos === e);
}
function ld(t, e) {
  return t.filter((s) => lm.indexOf(s.pos) === -1 && s.box.axis === e);
}
function Ai(t, e) {
  return t.sort((s, n) => {
    const i = e ? n : s, o = e ? s : n;
    return i.weight === o.weight ? i.index - o.index : i.weight - o.weight;
  });
}
function cv(t) {
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
function hv(t) {
  const e = {};
  for (const s of t) {
    const { stack: n, pos: i, stackWeight: o } = s;
    if (!n || !lm.includes(i))
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
function uv(t, e) {
  const s = hv(t), { vBoxMaxWidth: n, hBoxMaxHeight: i } = e;
  let o, a, r;
  for (o = 0, a = t.length; o < a; ++o) {
    r = t[o];
    const { fullSize: l } = r.box, c = s[r.stack], h = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = h ? h * n : l && e.availableWidth, r.height = i) : (r.width = n, r.height = h ? h * i : l && e.availableHeight);
  }
  return s;
}
function dv(t) {
  const e = cv(t), s = Ai(e.filter((c) => c.box.fullSize), !0), n = Ai(Mi(e, "left"), !0), i = Ai(Mi(e, "right")), o = Ai(Mi(e, "top"), !0), a = Ai(Mi(e, "bottom")), r = ld(e, "x"), l = ld(e, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(o),
    rightAndBottom: i.concat(l).concat(a).concat(r),
    chartArea: Mi(e, "chartArea"),
    vertical: n.concat(i).concat(l),
    horizontal: o.concat(a).concat(r)
  };
}
function cd(t, e, s, n) {
  return Math.max(t[s], e[s]) + Math.max(t[n], e[n]);
}
function cm(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function fv(t, e, s, n) {
  const { pos: i, box: o } = s, a = t.maxPadding;
  if (!bt(i)) {
    s.size && (t[i] -= s.size);
    const u = n[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? o.height : o.width), s.size = u.size / u.count, t[i] += s.size;
  }
  o.getPadding && cm(a, o.getPadding());
  const r = Math.max(0, e.outerWidth - cd(a, t, "left", "right")), l = Math.max(0, e.outerHeight - cd(a, t, "top", "bottom")), c = r !== t.w, h = l !== t.h;
  return t.w = r, t.h = l, s.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function pv(t) {
  const e = t.maxPadding;
  function s(n) {
    const i = Math.max(e[n] - t[n], 0);
    return t[n] += i, i;
  }
  t.y += s("top"), t.x += s("left"), s("right"), s("bottom");
}
function gv(t, e) {
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
function Ii(t, e, s, n) {
  const i = [];
  let o, a, r, l, c, h;
  for (o = 0, a = t.length, c = 0; o < a; ++o) {
    r = t[o], l = r.box, l.update(r.width || e.w, r.height || e.h, gv(r.horizontal, e));
    const { same: u, other: d } = fv(e, s, r, n);
    c |= u && i.length, h = h || d, l.fullSize || i.push(r);
  }
  return c && Ii(i, e, s, n) || h;
}
function na(t, e, s, n, i) {
  t.top = s, t.left = e, t.right = e + n, t.bottom = s + i, t.width = n, t.height = i;
}
function hd(t, e, s, n) {
  const i = s.padding;
  let { x: o, y: a } = e;
  for (const r of t) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, h = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const u = e.w * h, d = c.size || l.height;
      mo(c.start) && (a = c.start), l.fullSize ? na(l, i.left, a, s.outerWidth - i.right - i.left, d) : na(l, e.left + c.placed, a, u, d), c.start = a, c.placed += u, a = l.bottom;
    } else {
      const u = e.h * h, d = c.size || l.width;
      mo(c.start) && (o = c.start), l.fullSize ? na(l, o, i.top, d, s.outerHeight - i.bottom - i.top) : na(l, o, e.top + c.placed, d, u), c.start = o, c.placed += u, o = l.right;
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
    const i = me(t.options.layout.padding), o = Math.max(e - i.width, 0), a = Math.max(s - i.height, 0), r = dv(t.boxes), l = r.vertical, c = r.horizontal;
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
    }), d = Object.assign({}, i);
    cm(d, me(n));
    const f = Object.assign({
      maxPadding: d,
      w: o,
      h: a,
      x: i.left,
      y: i.top
    }, i), p = uv(l.concat(c), u);
    Ii(r.fullSize, f, u, p), Ii(l, f, u, p), Ii(c, f, u, p) && Ii(l, f, u, p), pv(f), hd(r.leftAndTop, f, u, p), f.x += f.w, f.y += f.h, hd(r.rightAndBottom, f, u, p), t.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, At(r.chartArea, (g) => {
      const m = g.box;
      Object.assign(m, t.chartArea), m.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class hm {
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
class mv extends hm {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Ca = "$chartjs", yv = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ud = (t) => t === null || t === "";
function bv(t, e) {
  const s = t.style, n = t.getAttribute("height"), i = t.getAttribute("width");
  if (t[Ca] = {
    initial: {
      height: n,
      width: i,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", ud(i)) {
    const o = Yu(t, "width");
    o !== void 0 && (t.width = o);
  }
  if (ud(n))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const o = Yu(t, "height");
      o !== void 0 && (t.height = o);
    }
  return t;
}
const um = _x ? {
  passive: !0
} : !1;
function _v(t, e, s) {
  t && t.addEventListener(e, s, um);
}
function xv(t, e, s) {
  t && t.canvas && t.canvas.removeEventListener(e, s, um);
}
function vv(t, e) {
  const s = yv[t.type] || t.type, { x: n, y: i } = un(t, e);
  return {
    type: s,
    chart: e,
    native: t,
    x: n !== void 0 ? n : null,
    y: i !== void 0 ? i : null
  };
}
function or(t, e) {
  for (const s of t)
    if (s === e || s.contains(e))
      return !0;
}
function Sv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((o) => {
    let a = !1;
    for (const r of o)
      a = a || or(r.addedNodes, n), a = a && !or(r.removedNodes, n);
    a && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function wv(t, e, s) {
  const n = t.canvas, i = new MutationObserver((o) => {
    let a = !1;
    for (const r of o)
      a = a || or(r.removedNodes, n), a = a && !or(r.addedNodes, n);
    a && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const _o = /* @__PURE__ */ new Map();
let dd = 0;
function dm() {
  const t = window.devicePixelRatio;
  t !== dd && (dd = t, _o.forEach((e, s) => {
    s.currentDevicePixelRatio !== t && e();
  }));
}
function Cv(t, e) {
  _o.size || window.addEventListener("resize", dm), _o.set(t, e);
}
function kv(t) {
  _o.delete(t), _o.size || window.removeEventListener("resize", dm);
}
function Mv(t, e, s) {
  const n = t.canvas, i = n && dh(n);
  if (!i)
    return;
  const o = Wg((r, l) => {
    const c = i.clientWidth;
    s(r, l), c < i.clientWidth && s();
  }, window), a = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return a.observe(i), Cv(t, o), a;
}
function ll(t, e, s) {
  s && s.disconnect(), e === "resize" && kv(t);
}
function Av(t, e, s) {
  const n = t.canvas, i = Wg((o) => {
    t.ctx !== null && s(vv(o, t));
  }, t);
  return _v(n, e, i), i;
}
class Pv extends hm {
  acquireContext(e, s) {
    const n = e && e.getContext && e.getContext("2d");
    return n && n.canvas === e ? (bv(e, s), n) : null;
  }
  releaseContext(e) {
    const s = e.canvas;
    if (!s[Ca])
      return !1;
    const n = s[Ca].initial;
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
    }), s.width = s.width, delete s[Ca], !0;
  }
  addEventListener(e, s, n) {
    this.removeEventListener(e, s);
    const i = e.$proxies || (e.$proxies = {}), a = {
      attach: Sv,
      detach: wv,
      resize: Mv
    }[s] || Av;
    i[s] = a(e, s, n);
  }
  removeEventListener(e, s) {
    const n = e.$proxies || (e.$proxies = {}), i = n[s];
    if (!i)
      return;
    ({
      attach: ll,
      detach: ll,
      resize: ll
    }[s] || xv)(e, s, i), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, s, n, i) {
    return bx(e, s, n, i);
  }
  isAttached(e) {
    const s = e && dh(e);
    return !!(s && s.isConnected);
  }
}
function Tv(t) {
  return !uh() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? mv : Pv;
}
var pa;
let Ls = (pa = class {
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
}, Q(pa, "defaults", {}), Q(pa, "defaultRoutes"), pa);
function Dv(t, e) {
  const s = t.options.ticks, n = Rv(t), i = Math.min(s.maxTicksLimit || n, n), o = s.major.enabled ? Ov(e) : [], a = o.length, r = o[0], l = o[a - 1], c = [];
  if (a > i)
    return Fv(e, c, o, a / i), c;
  const h = Lv(o, e, i);
  if (a > 0) {
    let u, d;
    const f = a > 1 ? Math.round((l - r) / (a - 1)) : null;
    for (ia(e, c, h, mt(f) ? 0 : r - f, r), u = 0, d = a - 1; u < d; u++)
      ia(e, c, h, o[u], o[u + 1]);
    return ia(e, c, h, l, mt(f) ? e.length : l + f), c;
  }
  return ia(e, c, h), c;
}
function Rv(t) {
  const e = t.options.offset, s = t._tickSize(), n = t._length / s + (e ? 0 : 1), i = t._maxLength / s;
  return Math.floor(Math.min(n, i));
}
function Lv(t, e, s) {
  const n = Ev(t), i = e.length / s;
  if (!n)
    return Math.max(i, 1);
  const o = v_(n);
  for (let a = 0, r = o.length - 1; a < r; a++) {
    const l = o[a];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Ov(t) {
  const e = [];
  let s, n;
  for (s = 0, n = t.length; s < n; s++)
    t[s].major && e.push(s);
  return e;
}
function Fv(t, e, s, n) {
  let i = 0, o = s[0], a;
  for (n = Math.ceil(n), a = 0; a < t.length; a++)
    a === o && (e.push(t[a]), i++, o = s[i * n]);
}
function ia(t, e, s, n, i) {
  const o = ut(n, 0), a = Math.min(ut(i, t.length), t.length);
  let r = 0, l, c, h;
  for (s = Math.ceil(s), i && (l = i - n, s = l / Math.floor(l / s)), h = o; h < 0; )
    r++, h = Math.round(o + r * s);
  for (c = Math.max(o, 0); c < a; c++)
    c === h && (e.push(t[c]), r++, h = Math.round(o + r * s));
}
function Ev(t) {
  const e = t.length;
  let s, n;
  if (e < 2)
    return !1;
  for (n = t[0], s = 1; s < e; ++s)
    if (t[s] - t[s - 1] !== n)
      return !1;
  return n;
}
const Iv = (t) => t === "left" ? "right" : t === "right" ? "left" : t, fd = (t, e, s) => e === "top" || e === "left" ? t[e] + s : t[e] - s, pd = (t, e) => Math.min(e || t, t);
function gd(t, e) {
  const s = [], n = t.length / e, i = t.length;
  let o = 0;
  for (; o < i; o += n)
    s.push(t[Math.floor(o)]);
  return s;
}
function Nv(t, e, s) {
  const n = t.ticks.length, i = Math.min(e, n - 1), o = t._startPixel, a = t._endPixel, r = 1e-6;
  let l = t.getPixelForTick(i), c;
  if (!(s && (n === 1 ? c = Math.max(l - o, a - l) : e === 0 ? c = (t.getPixelForTick(1) - l) / 2 : c = (l - t.getPixelForTick(i - 1)) / 2, l += i < e ? c : -c, l < o - r || l > a + r)))
    return l;
}
function Bv(t, e) {
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
function Pi(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function md(t, e) {
  if (!t.display)
    return 0;
  const s = Zt(t.font, e), n = me(t.padding);
  return (Ft(t.text) ? t.text.length : 1) * s.lineHeight + n.height;
}
function $v(t, e) {
  return Qs(t, {
    scale: e,
    type: "scale"
  });
}
function jv(t, e, s) {
  return Qs(t, {
    tick: s,
    index: e,
    type: "tick"
  });
}
function Wv(t, e, s) {
  let n = oh(t);
  return (s && e !== "right" || !s && e === "right") && (n = Iv(n)), n;
}
function Vv(t, e, s, n) {
  const { top: i, left: o, bottom: a, right: r, chart: l } = t, { chartArea: c, scales: h } = l;
  let u = 0, d, f, p;
  const g = a - i, m = r - o;
  if (t.isHorizontal()) {
    if (f = ce(n, o, r), bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      p = h[_].getPixelForValue(y) + g - e;
    } else s === "center" ? p = (c.bottom + c.top) / 2 + g - e : p = fd(t, s, e);
    d = r - o;
  } else {
    if (bt(s)) {
      const _ = Object.keys(s)[0], y = s[_];
      f = h[_].getPixelForValue(y) - m + e;
    } else s === "center" ? f = (c.left + c.right) / 2 - m + e : f = fd(t, s, e);
    p = ce(n, a, i), u = s === "left" ? -Ut : Ut;
  }
  return {
    titleX: f,
    titleY: p,
    maxWidth: d,
    rotation: u
  };
}
class In extends Ls {
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
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = J_(this, o, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? gd(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Dv(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    const e = this.options, s = e.ticks, n = pd(this.ticks.length, e.ticks.maxTicksLimit), i = s.minRotation || 0, o = s.maxRotation;
    let a = i, r, l, c;
    if (!this._isVisible() || !s.display || i >= o || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, d = h.highest.height, f = se(this.chart.width - u, 0, this.maxWidth);
    r = e.offset ? this.maxWidth / n : f / (n - 1), u + 6 > r && (r = f / (n - (e.offset ? 0.5 : 1)), l = this.maxHeight - Pi(e.grid) - s.padding - md(e.title, this.chart.options.font), c = Math.sqrt(u * u + d * d), a = nh(Math.min(Math.asin(se((h.highest.height + 6) / r, -1, 1)), Math.asin(se(l / c, -1, 1)) - Math.asin(se(d / c, -1, 1)))), a = Math.max(i, Math.min(o, a))), this.labelRotation = a;
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
      const l = md(i, s.options.font);
      if (r ? (e.width = this.maxWidth, e.height = Pi(o) + l) : (e.height = this.maxHeight, e.width = Pi(o) + l), n.display && this.ticks.length) {
        const { first: c, last: h, widest: u, highest: d } = this._getLabelSizes(), f = n.padding * 2, p = ze(this.labelRotation), g = Math.cos(p), m = Math.sin(p);
        if (r) {
          const _ = n.mirror ? 0 : m * u.width + g * d.height;
          e.height = Math.min(this.maxHeight, e.height + _ + f);
        } else {
          const _ = n.mirror ? 0 : g * u.width + m * d.height;
          e.width = Math.min(this.maxWidth, e.width + _ + f);
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
      let d = 0, f = 0;
      l ? c ? (d = i * e.width, f = n * s.height) : (d = n * e.height, f = i * s.width) : o === "start" ? f = s.width : o === "end" ? d = e.width : o !== "inner" && (d = e.width / 2, f = s.width / 2), this.paddingLeft = Math.max((d - h + a) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - u + a) * this.width / (this.width - u), 0);
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
      s < n.length && (n = gd(n, s)), this._labelSizes = e = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, s, n) {
    const { ctx: i, _longestTextCache: o } = this, a = [], r = [], l = Math.floor(s / pd(s, n));
    let c = 0, h = 0, u, d, f, p, g, m, _, y, b, v, w;
    for (u = 0; u < s; u += l) {
      if (p = e[u].label, g = this._resolveTickFontOptions(u), i.font = m = g.string, _ = o[m] = o[m] || {
        data: {},
        gc: []
      }, y = g.lineHeight, b = v = 0, !mt(p) && !Ft(p))
        b = nr(i, _.data, _.gc, b, p), v = y;
      else if (Ft(p))
        for (d = 0, f = p.length; d < f; ++d)
          w = p[d], !mt(w) && !Ft(w) && (b = nr(i, _.data, _.gc, b, w), v += y);
      a.push(b), r.push(v), c = Math.max(b, c), h = Math.max(v, h);
    }
    Bv(o, s);
    const S = a.indexOf(c), x = r.indexOf(h), k = (P) => ({
      width: a[P] || 0,
      height: r[P] || 0
    });
    return {
      first: k(0),
      last: k(s - 1),
      widest: k(S),
      highest: k(x),
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
    return k_(this._alignToPixels ? an(this.chart, s, 0) : s);
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
      return n.$context || (n.$context = jv(this.getContext(), e, n));
    }
    return this.$context || (this.$context = $v(this.chart.getContext(), this));
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
    const s = this.axis, n = this.chart, i = this.options, { grid: o, position: a, border: r } = i, l = o.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), d = Pi(o), f = [], p = r.setContext(this.getContext()), g = p.display ? p.width : 0, m = g / 2, _ = function(M) {
      return an(n, M, g);
    };
    let y, b, v, w, S, x, k, P, F, E, C, I;
    if (a === "top")
      y = _(this.bottom), x = this.bottom - d, P = y - m, E = _(e.top) + m, I = e.bottom;
    else if (a === "bottom")
      y = _(this.top), E = e.top, I = _(e.bottom) - m, x = y + m, P = this.top + d;
    else if (a === "left")
      y = _(this.right), S = this.right - d, k = y - m, F = _(e.left) + m, C = e.right;
    else if (a === "right")
      y = _(this.left), F = e.left, C = _(e.right) - m, S = y + m, k = this.left + d;
    else if (s === "x") {
      if (a === "center")
        y = _((e.top + e.bottom) / 2 + 0.5);
      else if (bt(a)) {
        const M = Object.keys(a)[0], T = a[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      E = e.top, I = e.bottom, x = y + m, P = x + d;
    } else if (s === "y") {
      if (a === "center")
        y = _((e.left + e.right) / 2);
      else if (bt(a)) {
        const M = Object.keys(a)[0], T = a[M];
        y = _(this.chart.scales[M].getPixelForValue(T));
      }
      S = y - m, k = S - d, F = e.left, C = e.right;
    }
    const L = ut(i.ticks.maxTicksLimit, u), D = Math.max(1, Math.ceil(u / L));
    for (b = 0; b < u; b += D) {
      const M = this.getContext(b), T = o.setContext(M), O = r.setContext(M), V = T.lineWidth, Y = T.color, Z = O.dash || [], et = O.dashOffset, dt = T.tickWidth, lt = T.tickColor, pt = T.tickBorderDash || [], _t = T.tickBorderDashOffset;
      v = Nv(this, b, l), v !== void 0 && (w = an(n, v, V), c ? S = k = F = C = w : x = P = E = I = w, f.push({
        tx1: S,
        ty1: x,
        tx2: k,
        ty2: P,
        x1: F,
        y1: E,
        x2: C,
        y2: I,
        width: V,
        color: Y,
        borderDash: Z,
        borderDashOffset: et,
        tickWidth: dt,
        tickColor: lt,
        tickBorderDash: pt,
        tickBorderDashOffset: _t
      }));
    }
    return this._ticksLength = u, this._borderValue = y, f;
  }
  _computeLabelItems(e) {
    const s = this.axis, n = this.options, { position: i, ticks: o } = n, a = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: h, mirror: u } = o, d = Pi(n.grid), f = d + h, p = u ? -h : f, g = -ze(this.labelRotation), m = [];
    let _, y, b, v, w, S, x, k, P, F, E, C, I = "middle";
    if (i === "top")
      S = this.bottom - p, x = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      S = this.top + p, x = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const D = this._getYAxisLabelAlignment(d);
      x = D.textAlign, w = D.x;
    } else if (i === "right") {
      const D = this._getYAxisLabelAlignment(d);
      x = D.textAlign, w = D.x;
    } else if (s === "x") {
      if (i === "center")
        S = (e.top + e.bottom) / 2 + f;
      else if (bt(i)) {
        const D = Object.keys(i)[0], M = i[D];
        S = this.chart.scales[D].getPixelForValue(M) + f;
      }
      x = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (i === "center")
        w = (e.left + e.right) / 2 - f;
      else if (bt(i)) {
        const D = Object.keys(i)[0], M = i[D];
        w = this.chart.scales[D].getPixelForValue(M);
      }
      x = this._getYAxisLabelAlignment(d).textAlign;
    }
    s === "y" && (l === "start" ? I = "top" : l === "end" && (I = "bottom"));
    const L = this._getLabelSizes();
    for (_ = 0, y = r.length; _ < y; ++_) {
      b = r[_], v = b.label;
      const D = o.setContext(this.getContext(_));
      k = this.getPixelForTick(_) + o.labelOffset, P = this._resolveTickFontOptions(_), F = P.lineHeight, E = Ft(v) ? v.length : 1;
      const M = E / 2, T = D.color, O = D.textStrokeColor, V = D.textStrokeWidth;
      let Y = x;
      a ? (w = k, x === "inner" && (_ === y - 1 ? Y = this.options.reverse ? "left" : "right" : _ === 0 ? Y = this.options.reverse ? "right" : "left" : Y = "center"), i === "top" ? c === "near" || g !== 0 ? C = -E * F + F / 2 : c === "center" ? C = -L.highest.height / 2 - M * F + F : C = -L.highest.height + F / 2 : c === "near" || g !== 0 ? C = F / 2 : c === "center" ? C = L.highest.height / 2 - M * F : C = L.highest.height - E * F, u && (C *= -1), g !== 0 && !D.showLabelBackdrop && (w += F / 2 * Math.sin(g))) : (S = k, C = (1 - E) * F / 2);
      let Z;
      if (D.showLabelBackdrop) {
        const et = me(D.backdropPadding), dt = L.heights[_], lt = L.widths[_];
        let pt = C - et.top, _t = 0 - et.left;
        switch (I) {
          case "middle":
            pt -= dt / 2;
            break;
          case "bottom":
            pt -= dt;
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
          height: dt + et.height,
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
          textAlign: Y,
          textBaseline: I,
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
    let c, h, u, d;
    this.isHorizontal() ? (c = an(e, this.left, a) - a / 2, h = an(e, this.right, r) + r / 2, u = d = l) : (u = an(e, this.top, a) - a / 2, d = an(e, this.bottom, r) + r / 2, c = h = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(c, u), s.lineTo(h, d), s.stroke(), s.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, i = this._computeLabelArea();
    i && Rr(n, i);
    const o = this.getLabelItems(e);
    for (const a of o) {
      const r = a.options, l = a.font, c = a.label, h = a.textOffset;
      Rn(n, c, 0, h, l, r);
    }
    i && Lr(n);
  }
  drawTitle() {
    const { ctx: e, options: { position: s, title: n, reverse: i } } = this;
    if (!n.display)
      return;
    const o = Zt(n.font), a = me(n.padding), r = n.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || bt(s) ? (l += a.bottom, Ft(n.text) && (l += o.lineHeight * (n.text.length - 1))) : l += a.top;
    const { titleX: c, titleY: h, maxWidth: u, rotation: d } = Vv(this, l, s, r);
    Rn(e, n.text, 0, 0, o, {
      color: n.color,
      maxWidth: u,
      rotation: d,
      textAlign: Wv(r, s, i),
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
class oa {
  constructor(e, s, n) {
    this.type = e, this.scope = s, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const s = Object.getPrototypeOf(e);
    let n;
    Gv(s) && (n = this.register(s));
    const i = this.items, o = e.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + e);
    return o in i || (i[o] = e, Hv(e, a, n), this.override && It.override(e.id, e.overrides)), a;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const s = this.items, n = e.id, i = this.scope;
    n in s && delete s[n], i && n in It[i] && (delete It[i][n], this.override && delete Dn[n]);
  }
}
function Hv(t, e, s) {
  const n = go(/* @__PURE__ */ Object.create(null), [
    s ? It.get(s) : {},
    It.get(e),
    t.defaults
  ]);
  It.set(e, n), t.defaultRoutes && zv(e, t.defaultRoutes), t.descriptors && It.describe(e, t.descriptors);
}
function zv(t, e) {
  Object.keys(e).forEach((s) => {
    const n = s.split("."), i = n.pop(), o = [
      t
    ].concat(n).join("."), a = e[s].split("."), r = a.pop(), l = a.join(".");
    It.route(o, i, l, r);
  });
}
function Gv(t) {
  return "id" in t && "defaults" in t;
}
class Uv {
  constructor() {
    this.controllers = new oa(Ye, "datasets", !0), this.elements = new oa(Ls, "elements"), this.plugins = new oa(Object, "plugins"), this.scales = new oa(In, "scales"), this._typedRegistries = [
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
    const i = sh(e);
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
var Qe = /* @__PURE__ */ new Uv();
class qv {
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
    const n = e && e.config, i = ut(n.options && n.options.plugins, {}), o = Yv(n);
    return i === !1 && !s ? [] : Jv(e, o, i, s);
  }
  _notifyStateChanges(e) {
    const s = this._oldCache || [], n = this._cache, i = (o, a) => o.filter((r) => !a.some((l) => r.plugin.id === l.plugin.id));
    this._notify(i(s, n), e, "stop"), this._notify(i(n, s), e, "start");
  }
}
function Yv(t) {
  const e = {}, s = [], n = Object.keys(Qe.plugins.items);
  for (let o = 0; o < n.length; o++)
    s.push(Qe.getPlugin(n[o]));
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
function Kv(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function Jv(t, { plugins: e, localIds: s }, n, i) {
  const o = [], a = t.getContext();
  for (const r of e) {
    const l = r.id, c = Kv(n[l], i);
    c !== null && o.push({
      plugin: r,
      options: Xv(t.config, {
        plugin: r,
        local: s[l]
      }, c, a)
    });
  }
  return o;
}
function Xv(t, { plugin: e, local: s }, n, i) {
  const o = t.pluginScopeKeys(e), a = t.getOptionScopes(n, o);
  return s && e.defaults && a.push(e.defaults), t.createResolver(a, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Xl(t, e) {
  const s = It.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || s.indexAxis || "x";
}
function Zv(t, e) {
  let s = t;
  return t === "_index_" ? s = e : t === "_value_" && (s = e === "x" ? "y" : "x"), s;
}
function Qv(t, e) {
  return t === e ? "_index_" : "_value_";
}
function yd(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function tS(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function Zl(t, ...e) {
  if (yd(t))
    return t;
  for (const s of e) {
    const n = s.axis || tS(s.position) || t.length > 1 && yd(t[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function bd(t, e, s) {
  if (s[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function eS(t, e) {
  if (e.data && e.data.datasets) {
    const s = e.data.datasets.filter((n) => n.xAxisID === t || n.yAxisID === t);
    if (s.length)
      return bd(t, "x", s[0]) || bd(t, "y", s[0]);
  }
  return {};
}
function sS(t, e) {
  const s = Dn[t.type] || {
    scales: {}
  }, n = e.scales || {}, i = Xl(t.type, e), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((a) => {
    const r = n[a];
    if (!bt(r))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = Zl(a, r, eS(a, t), It.scales[r.type]), c = Qv(l, i), h = s.scales || {};
    o[a] = Ki(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      h[l],
      h[c]
    ]);
  }), t.data.datasets.forEach((a) => {
    const r = a.type || t.type, l = a.indexAxis || Xl(r, e), h = (Dn[r] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const d = Zv(u, l), f = a[d + "AxisID"] || d;
      o[f] = o[f] || /* @__PURE__ */ Object.create(null), Ki(o[f], [
        {
          axis: d
        },
        n[f],
        h[u]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const r = o[a];
    Ki(r, [
      It.scales[r.type],
      It.scale
    ]);
  }), o;
}
function fm(t) {
  const e = t.options || (t.options = {});
  e.plugins = ut(e.plugins, {}), e.scales = sS(t, e);
}
function pm(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function nS(t) {
  return t = t || {}, t.data = pm(t.data), fm(t), t;
}
const _d = /* @__PURE__ */ new Map(), gm = /* @__PURE__ */ new Set();
function aa(t, e) {
  let s = _d.get(t);
  return s || (s = e(), _d.set(t, s), gm.add(s)), s;
}
const Ti = (t, e, s) => {
  const n = Xs(e, s);
  n !== void 0 && t.add(n);
};
class iS {
  constructor(e) {
    this._config = nS(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = pm(e);
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
    return aa(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, s) {
    return aa(`${e}.transition.${s}`, () => [
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
    return aa(`${e}-${s}`, () => [
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
    return aa(`${n}-plugin-${s}`, () => [
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
      e && (l.add(e), h.forEach((u) => Ti(l, e, u))), h.forEach((u) => Ti(l, i, u)), h.forEach((u) => Ti(l, Dn[o] || {}, u)), h.forEach((u) => Ti(l, It, u)), h.forEach((u) => Ti(l, Yl, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), gm.has(s) && a.set(s, c), c;
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
      Yl
    ];
  }
  resolveNamedOptions(e, s, n, i = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: r } = xd(this._resolverCache, e, i);
    let l = a;
    if (aS(a, s)) {
      o.$shared = !1, n = Zs(n) ? n() : n;
      const c = this.createResolver(e, n, r);
      l = fi(a, n, c);
    }
    for (const c of s)
      o[c] = l[c];
    return o;
  }
  createResolver(e, s, n = [
    ""
  ], i) {
    const { resolver: o } = xd(this._resolverCache, e, n);
    return bt(s) ? fi(o, s, void 0, i) : o;
  }
}
function xd(t, e, s) {
  let n = t.get(e);
  n || (n = /* @__PURE__ */ new Map(), t.set(e, n));
  const i = s.join();
  let o = n.get(i);
  return o || (o = {
    resolver: lh(e, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(i, o)), o;
}
const oS = (t) => bt(t) && Object.getOwnPropertyNames(t).some((e) => Zs(t[e]));
function aS(t, e) {
  const { isScriptable: s, isIndexable: n } = qg(t);
  for (const i of e) {
    const o = s(i), a = n(i), r = (a || o) && t[i];
    if (o && (Zs(r) || oS(r)) || a && Ft(r))
      return !0;
  }
  return !1;
}
var rS = "4.5.1";
const lS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function vd(t, e) {
  return t === "top" || t === "bottom" || lS.indexOf(t) === -1 && e === "x";
}
function Sd(t, e) {
  return function(s, n) {
    return s[t] === n[t] ? s[e] - n[e] : s[t] - n[t];
  };
}
function wd(t) {
  const e = t.chart, s = e.options.animation;
  e.notifyPlugins("afterRender"), Rt(s && s.onComplete, [
    t
  ], e);
}
function cS(t) {
  const e = t.chart, s = e.options.animation;
  Rt(s && s.onProgress, [
    t
  ], e);
}
function mm(t) {
  return uh() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const ka = {}, Cd = (t) => {
  const e = mm(t);
  return Object.values(ka).filter((s) => s.canvas === e).pop();
};
function hS(t, e, s) {
  const n = Object.keys(t);
  for (const i of n) {
    const o = +i;
    if (o >= e) {
      const a = t[i];
      delete t[i], (s > 0 || o > e) && (t[o + s] = a);
    }
  }
}
function uS(t, e, s, n) {
  return !s || t.type === "mouseout" ? null : n ? e : t;
}
var Is;
let ar = (Is = class {
  static register(...e) {
    Qe.add(...e), kd();
  }
  static unregister(...e) {
    Qe.remove(...e), kd();
  }
  constructor(e, s) {
    const n = this.config = new iS(s), i = mm(e), o = Cd(i);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Tv(i))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(i, a.aspectRatio), l = r && r.canvas, c = l && l.height, h = l && l.width;
    if (this.id = d_(), this.ctx = r, this.canvas = l, this.width = h, this.height = c, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new qv(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = T_((u) => this.update(u), a.resizeDelay || 0), this._dataChanges = [], ka[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    hs.listen(this, "complete", wd), hs.listen(this, "progress", cS), this._initialize(), this.attached && this.update();
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
    return Qe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : qu(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return zu(this.canvas, this.ctx), this;
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
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, qu(this, r, !0) && (this.notifyPlugins("resize", {
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
      const r = s[a], l = Zl(a, r), c = l === "r", h = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), At(o, (a) => {
      const r = a.options, l = r.id, c = Zl(l, r), h = ut(r.type, a.dtype);
      (r.position === void 0 || vd(r.position, c) !== vd(a.dposition)) && (r.position = a.dposition), i[l] = !0;
      let u = null;
      if (l in n && n[l].type === h)
        u = n[l];
      else {
        const d = Qe.getScale(h);
        u = new d({
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
    this._sortedMetasets = e.slice(0).sort(Sd("order", "index"));
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
      if (a.type && a.type !== r && (this._destroyDatasetMeta(n), a = this.getDatasetMeta(n)), a.type = r, a.indexAxis = o.indexAxis || Xl(r, this.options), a.order = o.order || 0, a.index = n, a.label = "" + o.label, a.visible = this.isDatasetVisible(n), a.controller)
        a.controller.updateIndex(n), a.controller.linkScales();
      else {
        const l = Qe.getController(r), { datasetElementType: c, dataElementType: h } = It.datasets[r];
        Object.assign(l, {
          dataElementType: Qe.getElement(h),
          datasetElementType: c && Qe.getElement(c)
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
      const { controller: u } = this.getDatasetMeta(c), d = !i && o.indexOf(u) === -1;
      u.buildOrUpdateElements(d), a = Math.max(+u.getMaxOverflow(), a);
    }
    a = this._minPadding = n.layout.autoPadding ? a : 0, this._updateLayout(a), i || At(o, (c) => {
      c.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(Sd("z", "_idx"));
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
    (!Eu(s, n) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: i, count: o } of s) {
      const a = n === "_removeElements" ? -o : o;
      hS(e, i, a);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (o) => new Set(e.filter((a) => a[0] === o).map((a, r) => r + "," + a.splice(1).join(","))), i = n(0);
    for (let o = 1; o < s; o++)
      if (!Eu(i, n(o)))
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
    }) !== !1 && (hs.has(this) ? this.attached && !hs.running(this) && hs.start(this) : (this.draw(), wd({
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
    }, i = im(this, e);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (i && Rr(s, i), e.controller.draw(), i && Lr(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(e) {
    return vs(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, s, n, i) {
    const o = lv.modes[s];
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
    const i = n ? "show" : "hide", o = this.getDatasetMeta(e), a = o.controller._resolveAnimations(void 0, i);
    mo(s) ? (o.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(e, n), a.update(o, {
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
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), zu(e, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete ka[this.id], this.notifyPlugins("afterDestroy");
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
    !tr(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
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
    const { _active: i = [], options: o } = this, a = s, r = this._getActiveElements(e, i, n, a), l = b_(e), c = uS(e, this._lastEvent, n, l);
    n && (this._lastEvent = null, Rt(o.onHover, [
      e,
      r,
      this
    ], this), l && Rt(o.onClick, [
      e,
      r,
      this
    ], this));
    const h = !tr(r, i);
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
}, Q(Is, "defaults", It), Q(Is, "instances", ka), Q(Is, "overrides", Dn), Q(Is, "registry", Qe), Q(Is, "version", rS), Q(Is, "getChart", Cd), Is);
function kd() {
  return At(ar.instances, (t) => t._plugins.invalidate());
}
function dS(t, e, s) {
  const { startAngle: n, x: i, y: o, outerRadius: a, innerRadius: r, options: l } = e, { borderWidth: c, borderJoinStyle: h } = l, u = Math.min(c / a, de(n - s));
  if (t.beginPath(), t.arc(i, o, a - c / 2, n + u / 2, s - u / 2), r > 0) {
    const d = Math.min(c / r, de(n - s));
    t.arc(i, o, r + c / 2, s - d / 2, n + d / 2, !0);
  } else {
    const d = Math.min(c / 2, a * de(n - s));
    if (h === "round")
      t.arc(i, o, d, s - vt / 2, n + vt / 2, !0);
    else if (h === "bevel") {
      const f = 2 * d * d, p = -f * Math.cos(s + vt / 2) + i, g = -f * Math.sin(s + vt / 2) + o, m = f * Math.cos(n + vt / 2) + i, _ = f * Math.sin(n + vt / 2) + o;
      t.lineTo(p, g), t.lineTo(m, _);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function fS(t, e, s) {
  const { startAngle: n, pixelMargin: i, x: o, y: a, outerRadius: r, innerRadius: l } = e;
  let c = i / r;
  t.beginPath(), t.arc(o, a, r, n - c, s + c), l > i ? (c = i / l, t.arc(o, a, l, s + c, n - c, !0)) : t.arc(o, a, i, s + Ut, n - Ut), t.closePath(), t.clip();
}
function pS(t) {
  return rh(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function gS(t, e, s, n) {
  const i = pS(t.options.borderRadius), o = (s - e) / 2, a = Math.min(o, n * e / 2), r = (l) => {
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
function Vn(t, e, s, n) {
  return {
    x: s + t * Math.cos(e),
    y: n + t * Math.sin(e)
  };
}
function rr(t, e, s, n, i, o) {
  const { x: a, y: r, startAngle: l, pixelMargin: c, innerRadius: h } = e, u = Math.max(e.outerRadius + n + s - c, 0), d = h > 0 ? h + n + s + c : 0;
  let f = 0;
  const p = i - l;
  if (n) {
    const D = h > 0 ? h - n : 0, M = u > 0 ? u - n : 0, T = (D + M) / 2, O = T !== 0 ? p * T / (T + n) : p;
    f = (p - O) / 2;
  }
  const g = Math.max(1e-3, p * u - s / vt) / u, m = (p - g) / 2, _ = l + m + f, y = i - m - f, { outerStart: b, outerEnd: v, innerStart: w, innerEnd: S } = gS(e, d, u, y - _), x = u - b, k = u - v, P = _ + b / x, F = y - v / k, E = d + w, C = d + S, I = _ + w / E, L = y - S / C;
  if (t.beginPath(), o) {
    const D = (P + F) / 2;
    if (t.arc(a, r, u, P, D), t.arc(a, r, u, D, F), v > 0) {
      const V = Vn(k, F, a, r);
      t.arc(V.x, V.y, v, F, y + Ut);
    }
    const M = Vn(C, y, a, r);
    if (t.lineTo(M.x, M.y), S > 0) {
      const V = Vn(C, L, a, r);
      t.arc(V.x, V.y, S, y + Ut, L + Math.PI);
    }
    const T = (y - S / d + (_ + w / d)) / 2;
    if (t.arc(a, r, d, y - S / d, T, !0), t.arc(a, r, d, T, _ + w / d, !0), w > 0) {
      const V = Vn(E, I, a, r);
      t.arc(V.x, V.y, w, I + Math.PI, _ - Ut);
    }
    const O = Vn(x, _, a, r);
    if (t.lineTo(O.x, O.y), b > 0) {
      const V = Vn(x, P, a, r);
      t.arc(V.x, V.y, b, _ - Ut, P);
    }
  } else {
    t.moveTo(a, r);
    const D = Math.cos(P) * u + a, M = Math.sin(P) * u + r;
    t.lineTo(D, M);
    const T = Math.cos(F) * u + a, O = Math.sin(F) * u + r;
    t.lineTo(T, O);
  }
  t.closePath();
}
function mS(t, e, s, n, i) {
  const { fullCircles: o, startAngle: a, circumference: r } = e;
  let l = e.endAngle;
  if (o) {
    rr(t, e, s, n, l, i);
    for (let c = 0; c < o; ++c)
      t.fill();
    isNaN(r) || (l = a + (r % Ot || Ot));
  }
  return rr(t, e, s, n, l, i), t.fill(), l;
}
function yS(t, e, s, n, i) {
  const { fullCircles: o, startAngle: a, circumference: r, options: l } = e, { borderWidth: c, borderJoinStyle: h, borderDash: u, borderDashOffset: d, borderRadius: f } = l, p = l.borderAlign === "inner";
  if (!c)
    return;
  t.setLineDash(u || []), t.lineDashOffset = d, p ? (t.lineWidth = c * 2, t.lineJoin = h || "round") : (t.lineWidth = c, t.lineJoin = h || "bevel");
  let g = e.endAngle;
  if (o) {
    rr(t, e, s, n, g, i);
    for (let m = 0; m < o; ++m)
      t.stroke();
    isNaN(r) || (g = a + (r % Ot || Ot));
  }
  p && fS(t, e, g), l.selfJoin && g - a >= vt && f === 0 && h !== "miter" && dS(t, e, g), o || (rr(t, e, s, n, g, i), t.stroke());
}
class Ni extends Ls {
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
    ], i), { angle: a, distance: r } = Ng(o, {
      x: s,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: h, outerRadius: u, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], i), f = (this.options.spacing + this.options.borderWidth) / 2, p = ut(d, c - l), g = yo(a, l, c) && l !== c, m = p >= Ot || g, _ = _s(r, h + f, u + f);
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
    ], s), { offset: c, spacing: h } = this.options, u = (o + a) / 2, d = (r + l + h + c) / 2;
    return {
      x: n + Math.cos(u) * d,
      y: i + Math.sin(u) * d
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
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, mS(s, this, h, a, r), yS(s, this, h, a, r), s.restore();
  }
}
Q(Ni, "id", "arc"), Q(Ni, "defaults", {
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
}), Q(Ni, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Q(Ni, "descriptors", {
  _scriptable: !0,
  _indexable: (s) => s !== "borderDash"
});
function ym(t, e, s = e) {
  t.lineCap = ut(s.borderCapStyle, e.borderCapStyle), t.setLineDash(ut(s.borderDash, e.borderDash)), t.lineDashOffset = ut(s.borderDashOffset, e.borderDashOffset), t.lineJoin = ut(s.borderJoinStyle, e.borderJoinStyle), t.lineWidth = ut(s.borderWidth, e.borderWidth), t.strokeStyle = ut(s.borderColor, e.borderColor);
}
function bS(t, e, s) {
  t.lineTo(s.x, s.y);
}
function _S(t) {
  return t.stepped ? W_ : t.tension || t.cubicInterpolationMode === "monotone" ? V_ : bS;
}
function bm(t, e, s = {}) {
  const n = t.length, { start: i = 0, end: o = n - 1 } = s, { start: a, end: r } = e, l = Math.max(i, a), c = Math.min(o, r), h = i < a && o < a || i > r && o > r;
  return {
    count: n,
    start: l,
    loop: e.loop,
    ilen: c < l && !h ? n + c - l : c - l
  };
}
function xS(t, e, s, n) {
  const { points: i, options: o } = e, { count: a, start: r, loop: l, ilen: c } = bm(i, s, n), h = _S(o);
  let { move: u = !0, reverse: d } = n || {}, f, p, g;
  for (f = 0; f <= c; ++f)
    p = i[(r + (d ? c - f : f)) % a], !p.skip && (u ? (t.moveTo(p.x, p.y), u = !1) : h(t, g, p, d, o.stepped), g = p);
  return l && (p = i[(r + (d ? c : 0)) % a], h(t, g, p, d, o.stepped)), !!l;
}
function vS(t, e, s, n) {
  const i = e.points, { count: o, start: a, ilen: r } = bm(i, s, n), { move: l = !0, reverse: c } = n || {};
  let h = 0, u = 0, d, f, p, g, m, _;
  const y = (v) => (a + (c ? r - v : v)) % o, b = () => {
    g !== m && (t.lineTo(h, m), t.lineTo(h, g), t.lineTo(h, _));
  };
  for (l && (f = i[y(0)], t.moveTo(f.x, f.y)), d = 0; d <= r; ++d) {
    if (f = i[y(d)], f.skip)
      continue;
    const v = f.x, w = f.y, S = v | 0;
    S === p ? (w < g ? g = w : w > m && (m = w), h = (u * h + v) / ++u) : (b(), t.lineTo(v, w), p = S, u = 0, g = m = w), _ = w;
  }
  b();
}
function Ql(t) {
  const e = t.options, s = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !s ? vS : xS;
}
function SS(t) {
  return t.stepped ? xx : t.tension || t.cubicInterpolationMode === "monotone" ? vx : dn;
}
function wS(t, e, s, n) {
  let i = e._path;
  i || (i = e._path = new Path2D(), e.path(i, s, n) && i.closePath()), ym(t, e.options), t.stroke(i);
}
function CS(t, e, s, n) {
  const { segments: i, options: o } = e, a = Ql(e);
  for (const r of i)
    ym(t, o, r.style), t.beginPath(), a(t, e, r, {
      start: s,
      end: s + n - 1
    }) && t.closePath(), t.stroke();
}
const kS = typeof Path2D == "function";
function MS(t, e, s, n) {
  kS && !e.options.segment ? wS(t, e, s, n) : CS(t, e, s, n);
}
class zs extends Ls {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, s) {
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const i = n.spanGaps ? this._loop : this._fullLoop;
      dx(this._points, n, e, i, s), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Ax(this, this.options.segment));
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
    const n = this.options, i = e[s], o = this.points, a = nm(this, {
      property: s,
      start: i,
      end: i
    });
    if (!a.length)
      return;
    const r = [], l = SS(n);
    let c, h;
    for (c = 0, h = a.length; c < h; ++c) {
      const { start: u, end: d } = a[c], f = o[u], p = o[d];
      if (f === p) {
        r.push(f);
        continue;
      }
      const g = Math.abs((i - f[s]) / (p[s] - f[s])), m = l(f, p, g, n.stepped);
      m[s] = e[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(e, s, n) {
    return Ql(this)(e, this, s, n);
  }
  path(e, s, n) {
    const i = this.segments, o = Ql(this);
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
    (this.points || []).length && o.borderWidth && (e.save(), MS(e, this, n, i), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Q(zs, "id", "line"), Q(zs, "defaults", {
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
}), Q(zs, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Q(zs, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function Md(t, e, s, n) {
  const i = t.options, { [s]: o } = t.getProps([
    s
  ], n);
  return Math.abs(e - o) < i.radius + i.hitRadius;
}
class Ma extends Ls {
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
    return Md(this, s, "x", n);
  }
  inYRange(s, n) {
    return Md(this, s, "y", n);
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
    this.skip || i.radius < 0.1 || !vs(this, n, this.size(i) / 2) || (s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.fillStyle = i.backgroundColor, Kl(s, i, this.x, this.y));
  }
  getRange() {
    const s = this.options || {};
    return s.radius + s.hitRadius;
  }
}
Q(Ma, "id", "point"), /**
* @type {any}
*/
Q(Ma, "defaults", {
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
Q(Ma, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function _m(t, e) {
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
function Gs(t, e, s, n) {
  return t ? 0 : se(e, s, n);
}
function AS(t, e, s) {
  const n = t.options.borderWidth, i = t.borderSkipped, o = Ug(n);
  return {
    t: Gs(i.top, o.top, 0, s),
    r: Gs(i.right, o.right, 0, e),
    b: Gs(i.bottom, o.bottom, 0, s),
    l: Gs(i.left, o.left, 0, e)
  };
}
function PS(t, e, s) {
  const { enableBorderRadius: n } = t.getProps([
    "enableBorderRadius"
  ]), i = t.options.borderRadius, o = Sn(i), a = Math.min(e, s), r = t.borderSkipped, l = n || bt(i);
  return {
    topLeft: Gs(!l || r.top || r.left, o.topLeft, 0, a),
    topRight: Gs(!l || r.top || r.right, o.topRight, 0, a),
    bottomLeft: Gs(!l || r.bottom || r.left, o.bottomLeft, 0, a),
    bottomRight: Gs(!l || r.bottom || r.right, o.bottomRight, 0, a)
  };
}
function TS(t) {
  const e = _m(t), s = e.right - e.left, n = e.bottom - e.top, i = AS(t, s / 2, n / 2), o = PS(t, s / 2, n / 2);
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
function cl(t, e, s, n) {
  const i = e === null, o = s === null, r = t && !(i && o) && _m(t, n);
  return r && (i || _s(e, r.left, r.right)) && (o || _s(s, r.top, r.bottom));
}
function DS(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function RS(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function hl(t, e, s = {}) {
  const n = t.x !== s.x ? -e : 0, i = t.y !== s.y ? -e : 0, o = (t.x + t.w !== s.x + s.w ? e : 0) - n, a = (t.y + t.h !== s.y + s.h ? e : 0) - i;
  return {
    x: t.x + n,
    y: t.y + i,
    w: t.w + o,
    h: t.h + a,
    radius: t.radius
  };
}
class Aa extends Ls {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: i } } = this, { inner: o, outer: a } = TS(this), r = DS(a.radius) ? bo : RS;
    e.save(), (a.w !== o.w || a.h !== o.h) && (e.beginPath(), r(e, hl(a, s, o)), e.clip(), r(e, hl(o, -s, a)), e.fillStyle = n, e.fill("evenodd")), e.beginPath(), r(e, hl(o, s)), e.fillStyle = i, e.fill(), e.restore();
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
Q(Aa, "id", "bar"), Q(Aa, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Q(Aa, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var LS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Ni,
  BarElement: Aa,
  LineElement: zs,
  PointElement: Ma
});
const tc = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Ad = /* @__PURE__ */ tc.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function xm(t) {
  return tc[t % tc.length];
}
function vm(t) {
  return Ad[t % Ad.length];
}
function OS(t, e) {
  return t.borderColor = xm(e), t.backgroundColor = vm(e), ++e;
}
function FS(t, e) {
  return t.backgroundColor = t.data.map(() => xm(e++)), e;
}
function ES(t, e) {
  return t.backgroundColor = t.data.map(() => vm(e++)), e;
}
function IS(t) {
  let e = 0;
  return (s, n) => {
    const i = t.getDatasetMeta(n).controller;
    i instanceof gn ? e = FS(s, e) : i instanceof Qi ? e = ES(s, e) : i && (e = OS(s, e));
  };
}
function Pd(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function NS(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function BS() {
  return It.borderColor !== "rgba(0,0,0,0.1)" || It.backgroundColor !== "rgba(0,0,0,0.1)";
}
var $S = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, s) {
    if (!s.enabled)
      return;
    const { data: { datasets: n }, options: i } = t.config, { elements: o } = i, a = Pd(n) || NS(i) || o && Pd(o) || BS();
    if (!s.forceOverride && a)
      return;
    const r = IS(t);
    n.forEach(r);
  }
};
function jS(t, e, s, n, i) {
  const o = i.samples || n;
  if (o >= s)
    return t.slice(e, e + s);
  const a = [], r = (s - 2) / (o - 2);
  let l = 0;
  const c = e + s - 1;
  let h = e, u, d, f, p, g;
  for (a[l++] = t[h], u = 0; u < o - 2; u++) {
    let m = 0, _ = 0, y;
    const b = Math.floor((u + 1) * r) + 1 + e, v = Math.min(Math.floor((u + 2) * r) + 1, s) + e, w = v - b;
    for (y = b; y < v; y++)
      m += t[y].x, _ += t[y].y;
    m /= w, _ /= w;
    const S = Math.floor(u * r) + 1 + e, x = Math.min(Math.floor((u + 1) * r) + 1, s) + e, { x: k, y: P } = t[h];
    for (f = p = -1, y = S; y < x; y++)
      p = 0.5 * Math.abs((k - m) * (t[y].y - P) - (k - t[y].x) * (_ - P)), p > f && (f = p, d = t[y], g = y);
    a[l++] = d, h = g;
  }
  return a[l++] = t[c], a;
}
function WS(t, e, s, n) {
  let i = 0, o = 0, a, r, l, c, h, u, d, f, p, g;
  const m = [], _ = e + s - 1, y = t[e].x, v = t[_].x - y;
  for (a = e; a < e + s; ++a) {
    r = t[a], l = (r.x - y) / v * n, c = r.y;
    const w = l | 0;
    if (w === h)
      c < p ? (p = c, u = a) : c > g && (g = c, d = a), i = (o * i + r.x) / ++o;
    else {
      const S = a - 1;
      if (!mt(u) && !mt(d)) {
        const x = Math.min(u, d), k = Math.max(u, d);
        x !== f && x !== S && m.push({
          ...t[x],
          x: i
        }), k !== f && k !== S && m.push({
          ...t[k],
          x: i
        });
      }
      a > 0 && S !== f && m.push(t[S]), m.push(r), h = w, o = 0, p = g = c, u = d = f = a;
    }
  }
  return m;
}
function Sm(t) {
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
function Td(t) {
  t.data.datasets.forEach((e) => {
    Sm(e);
  });
}
function VS(t, e) {
  const s = e.length;
  let n = 0, i;
  const { iScale: o } = t, { min: a, max: r, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (n = se(xs(e, o.axis, a).lo, 0, s - 1)), c ? i = se(xs(e, o.axis, r).hi + 1, n, s) - n : i = s - n, {
    start: n,
    count: i
  };
}
var HS = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, s) => {
    if (!s.enabled) {
      Td(t);
      return;
    }
    const n = t.width;
    t.data.datasets.forEach((i, o) => {
      const { _data: a, indexAxis: r } = i, l = t.getDatasetMeta(o), c = a || i.data;
      if (Ei([
        r,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = t.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || t.options.parsing)
        return;
      let { start: u, count: d } = VS(l, c);
      const f = s.threshold || 4 * n;
      if (d <= f) {
        Sm(i);
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
      let p;
      switch (s.algorithm) {
        case "lttb":
          p = jS(c, u, d, n, s);
          break;
        case "min-max":
          p = WS(c, u, d, n);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${s.algorithm}'`);
      }
      i._decimated = p;
    });
  },
  destroy(t) {
    Td(t);
  }
};
function zS(t, e, s) {
  const n = t.segments, i = t.points, o = e.points, a = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = Er(l, c, i);
    const h = ec(s, i[l], i[c], r.loop);
    if (!e.segments) {
      a.push({
        source: r,
        target: h,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const u = nm(e, h);
    for (const d of u) {
      const f = ec(s, o[d.start], o[d.end], d.loop), p = sm(r, i, f);
      for (const g of p)
        a.push({
          source: g,
          target: d,
          start: {
            [s]: Dd(h, f, "start", Math.max)
          },
          end: {
            [s]: Dd(h, f, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function ec(t, e, s, n) {
  if (n)
    return;
  let i = e[t], o = s[t];
  return t === "angle" && (i = de(i), o = de(o)), {
    property: t,
    start: i,
    end: o
  };
}
function GS(t, e) {
  const { x: s = null, y: n = null } = t || {}, i = e.points, o = [];
  return e.segments.forEach(({ start: a, end: r }) => {
    r = Er(a, r, i);
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
function Er(t, e, s) {
  for (; e > t; e--) {
    const n = s[e];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return e;
}
function Dd(t, e, s, n) {
  return t && e ? n(t[s], e[s]) : t ? t[s] : e ? e[s] : 0;
}
function wm(t, e) {
  let s = [], n = !1;
  return Ft(t) ? (n = !0, s = t) : s = GS(t, e), s.length ? new zs({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function Rd(t) {
  return t && t.fill !== !1;
}
function US(t, e, s) {
  let i = t[e].fill;
  const o = [
    e
  ];
  let a;
  if (!s)
    return i;
  for (; i !== !1 && o.indexOf(i) === -1; ) {
    if (!$t(i))
      return i;
    if (a = t[i], !a)
      return !1;
    if (a.visible)
      return i;
    o.push(i), i = a.fill;
  }
  return !1;
}
function qS(t, e, s) {
  const n = XS(t);
  if (bt(n))
    return isNaN(n.value) ? !1 : n;
  let i = parseFloat(n);
  return $t(i) && Math.floor(i) === i ? YS(n[0], e, i, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function YS(t, e, s, n) {
  return (t === "-" || t === "+") && (s = e + s), s === e || s < 0 || s >= n ? !1 : s;
}
function KS(t, e) {
  let s = null;
  return t === "start" ? s = e.bottom : t === "end" ? s = e.top : bt(t) ? s = e.getPixelForValue(t.value) : e.getBasePixel && (s = e.getBasePixel()), s;
}
function JS(t, e, s) {
  let n;
  return t === "start" ? n = s : t === "end" ? n = e.options.reverse ? e.min : e.max : bt(t) ? n = t.value : n = e.getBaseValue(), n;
}
function XS(t) {
  const e = t.options, s = e.fill;
  let n = ut(s && s.target, s);
  return n === void 0 && (n = !!e.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function ZS(t) {
  const { scale: e, index: s, line: n } = t, i = [], o = n.segments, a = n.points, r = QS(e, s);
  r.push(wm({
    x: null,
    y: e.bottom
  }, n));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      tw(i, a[h], r);
  }
  return new zs({
    points: i,
    options: {}
  });
}
function QS(t, e) {
  const s = [], n = t.getMatchingVisibleMetas("line");
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (o.index === e)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function tw(t, e, s) {
  const n = [];
  for (let i = 0; i < s.length; i++) {
    const o = s[i], { first: a, last: r, point: l } = ew(o, e, "x");
    if (!(!l || a && r)) {
      if (a)
        n.unshift(l);
      else if (t.push(l), !r)
        break;
    }
  }
  t.push(...n);
}
function ew(t, e, s) {
  const n = t.interpolate(e, s);
  if (!n)
    return {};
  const i = n[s], o = t.segments, a = t.points;
  let r = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], u = a[h.start][s], d = a[h.end][s];
    if (_s(i, u, d)) {
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
class Cm {
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
function sw(t) {
  const { chart: e, fill: s, line: n } = t;
  if ($t(s))
    return nw(e, s);
  if (s === "stack")
    return ZS(t);
  if (s === "shape")
    return !0;
  const i = iw(t);
  return i instanceof Cm ? i : wm(i, n);
}
function nw(t, e) {
  const s = t.getDatasetMeta(e);
  return s && t.isDatasetVisible(e) ? s.dataset : null;
}
function iw(t) {
  return (t.scale || {}).getPointPositionForValue ? aw(t) : ow(t);
}
function ow(t) {
  const { scale: e = {}, fill: s } = t, n = KS(s, e);
  if ($t(n)) {
    const i = e.isHorizontal();
    return {
      x: i ? n : null,
      y: i ? null : n
    };
  }
  return null;
}
function aw(t) {
  const { scale: e, fill: s } = t, n = e.options, i = e.getLabels().length, o = n.reverse ? e.max : e.min, a = JS(s, e, o), r = [];
  if (n.grid.circular) {
    const l = e.getPointPositionForValue(0, o);
    return new Cm({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < i; ++l)
    r.push(e.getPointPositionForValue(l, a));
  return r;
}
function ul(t, e, s) {
  const n = sw(e), { chart: i, index: o, line: a, scale: r, axis: l } = e, c = a.options, h = c.fill, u = c.backgroundColor, { above: d = u, below: f = u } = h || {}, p = i.getDatasetMeta(o), g = im(i, p);
  n && a.points.length && (Rr(t, s), rw(t, {
    line: a,
    target: n,
    above: d,
    below: f,
    area: s,
    scale: r,
    axis: l,
    clip: g
  }), Lr(t));
}
function rw(t, e) {
  const { line: s, target: n, above: i, below: o, area: a, scale: r, clip: l } = e, c = s._loop ? "angle" : e.axis;
  t.save();
  let h = o;
  o !== i && (c === "x" ? (Ld(t, n, a.top), dl(t, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Ld(t, n, a.bottom)) : c === "y" && (Od(t, n, a.left), dl(t, {
    line: s,
    target: n,
    color: o,
    scale: r,
    property: c,
    clip: l
  }), t.restore(), t.save(), Od(t, n, a.right), h = i)), dl(t, {
    line: s,
    target: n,
    color: h,
    scale: r,
    property: c,
    clip: l
  }), t.restore();
}
function Ld(t, e, s) {
  const { segments: n, points: i } = e;
  let o = !0, a = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[Er(l, c, i)];
    o ? (t.moveTo(h.x, h.y), o = !1) : (t.lineTo(h.x, s), t.lineTo(h.x, h.y)), a = !!e.pathSegment(t, r, {
      move: a
    }), a ? t.closePath() : t.lineTo(u.x, s);
  }
  t.lineTo(e.first().x, s), t.closePath(), t.clip();
}
function Od(t, e, s) {
  const { segments: n, points: i } = e;
  let o = !0, a = !1;
  t.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = i[l], u = i[Er(l, c, i)];
    o ? (t.moveTo(h.x, h.y), o = !1) : (t.lineTo(s, h.y), t.lineTo(h.x, h.y)), a = !!e.pathSegment(t, r, {
      move: a
    }), a ? t.closePath() : t.lineTo(s, u.y);
  }
  t.lineTo(s, e.first().y), t.closePath(), t.clip();
}
function dl(t, e) {
  const { line: s, target: n, property: i, color: o, scale: a, clip: r } = e, l = zS(s, n, i);
  for (const { source: c, target: h, start: u, end: d } of l) {
    const { style: { backgroundColor: f = o } = {} } = c, p = n !== !0;
    t.save(), t.fillStyle = f, lw(t, a, r, p && ec(i, u, d)), t.beginPath();
    const g = !!s.pathSegment(t, c);
    let m;
    if (p) {
      g ? t.closePath() : Fd(t, n, d, i);
      const _ = !!n.pathSegment(t, h, {
        move: g,
        reverse: !0
      });
      m = g && _, m || Fd(t, n, u, i);
    }
    t.closePath(), t.fill(m ? "evenodd" : "nonzero"), t.restore();
  }
}
function lw(t, e, s, n) {
  const i = e.chart.chartArea, { property: o, start: a, end: r } = n || {};
  if (o === "x" || o === "y") {
    let l, c, h, u;
    o === "x" ? (l = a, c = i.top, h = r, u = i.bottom) : (l = i.left, c = a, h = i.right, u = r), t.beginPath(), s && (l = Math.max(l, s.left), h = Math.min(h, s.right), c = Math.max(c, s.top), u = Math.min(u, s.bottom)), t.rect(l, c, h - l, u - c), t.clip();
  }
}
function Fd(t, e, s, n) {
  const i = e.interpolate(s, n);
  i && t.lineTo(i.x, i.y);
}
var cw = {
  id: "filler",
  afterDatasetsUpdate(t, e, s) {
    const n = (t.data.datasets || []).length, i = [];
    let o, a, r, l;
    for (a = 0; a < n; ++a)
      o = t.getDatasetMeta(a), r = o.dataset, l = null, r && r.options && r instanceof zs && (l = {
        visible: t.isDatasetVisible(a),
        index: a,
        fill: qS(r, a, n),
        chart: t,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, i.push(l);
    for (a = 0; a < n; ++a)
      l = i[a], !(!l || l.fill === !1) && (l.fill = US(i, a, s.propagate));
  },
  beforeDraw(t, e, s) {
    const n = s.drawTime === "beforeDraw", i = t.getSortedVisibleDatasetMetas(), o = t.chartArea;
    for (let a = i.length - 1; a >= 0; --a) {
      const r = i[a].$filler;
      r && (r.line.updateControlPoints(o, r.axis), n && r.fill && ul(t.ctx, r, o));
    }
  },
  beforeDatasetsDraw(t, e, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = t.getSortedVisibleDatasetMetas();
    for (let i = n.length - 1; i >= 0; --i) {
      const o = n[i].$filler;
      Rd(o) && ul(t.ctx, o, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, s) {
    const n = e.meta.$filler;
    !Rd(n) || s.drawTime !== "beforeDatasetDraw" || ul(t.ctx, n, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Ed = (t, e) => {
  let { boxHeight: s = e, boxWidth: n = e } = t;
  return t.usePointStyle && (s = Math.min(s, e), n = t.pointStyleWidth || Math.min(n, e)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(e, s)
  };
}, hw = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class Id extends Ls {
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
    const n = e.labels, i = Zt(n.font), o = i.size, a = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Ed(n, o);
    let c, h;
    s.font = i.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(a, o, r, l) + 10) : (h = this.maxHeight, c = this._fitCols(a, i, r, l) + 10), this.width = Math.min(c, e.maxWidth || this.maxWidth), this.height = Math.min(h, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, s, n, i) {
    const { ctx: o, maxWidth: a, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = i + r;
    let u = e;
    o.textAlign = "left", o.textBaseline = "middle";
    let d = -1, f = -h;
    return this.legendItems.forEach((p, g) => {
      const m = n + s / 2 + o.measureText(p.text).width;
      (g === 0 || c[c.length - 1] + m + 2 * r > a) && (u += h, c[c.length - (g > 0 ? 0 : 1)] = 0, f += h, d++), l[g] = {
        left: 0,
        top: f,
        row: d,
        width: m,
        height: i
      }, c[c.length - 1] += m + r;
    }), u;
  }
  _fitCols(e, s, n, i) {
    const { ctx: o, maxHeight: a, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = a - e;
    let u = r, d = 0, f = 0, p = 0, g = 0;
    return this.legendItems.forEach((m, _) => {
      const { itemWidth: y, itemHeight: b } = uw(n, s, o, m, i);
      _ > 0 && f + b + 2 * r > h && (u += d + r, c.push({
        width: d,
        height: f
      }), p += d + r, g++, d = f = 0), l[_] = {
        left: p,
        top: f,
        col: g,
        width: y,
        height: b
      }, d = Math.max(d, y), f += b + r;
    }), u += d, c.push({
      width: d,
      height: f
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: i }, rtl: o } } = this, a = oi(o, this.left, this.width);
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
      Rr(e, this), this._draw(), Lr(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: s, lineWidths: n, ctx: i } = this, { align: o, labels: a } = e, r = It.color, l = oi(e.rtl, this.left, this.width), c = Zt(a.font), { padding: h } = a, u = c.size, d = u / 2;
    let f;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: p, boxHeight: g, itemHeight: m } = Ed(a, u), _ = function(S, x, k) {
      if (isNaN(p) || p <= 0 || isNaN(g) || g < 0)
        return;
      i.save();
      const P = ut(k.lineWidth, 1);
      if (i.fillStyle = ut(k.fillStyle, r), i.lineCap = ut(k.lineCap, "butt"), i.lineDashOffset = ut(k.lineDashOffset, 0), i.lineJoin = ut(k.lineJoin, "miter"), i.lineWidth = P, i.strokeStyle = ut(k.strokeStyle, r), i.setLineDash(ut(k.lineDash, [])), a.usePointStyle) {
        const F = {
          radius: g * Math.SQRT2 / 2,
          pointStyle: k.pointStyle,
          rotation: k.rotation,
          borderWidth: P
        }, E = l.xPlus(S, p / 2), C = x + d;
        Gg(i, F, E, C, a.pointStyleWidth && p);
      } else {
        const F = x + Math.max((u - g) / 2, 0), E = l.leftForLtr(S, p), C = Sn(k.borderRadius);
        i.beginPath(), Object.values(C).some((I) => I !== 0) ? bo(i, {
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
    b ? f = {
      x: ce(o, this.left + h, this.right - n[0]),
      y: this.top + h + v,
      line: 0
    } : f = {
      x: this.left + h,
      y: ce(o, this.top + v + h, this.bottom - s[0].height),
      line: 0
    }, Qg(this.ctx, e.textDirection);
    const w = m + h;
    this.legendItems.forEach((S, x) => {
      i.strokeStyle = S.fontColor, i.fillStyle = S.fontColor;
      const k = i.measureText(S.text).width, P = l.textAlign(S.textAlign || (S.textAlign = a.textAlign)), F = p + d + k;
      let E = f.x, C = f.y;
      l.setWidth(this.width), b ? x > 0 && E + F + h > this.right && (C = f.y += w, f.line++, E = f.x = ce(o, this.left + h, this.right - n[f.line])) : x > 0 && C + w > this.bottom && (E = f.x = E + s[f.line].width + h, f.line++, C = f.y = ce(o, this.top + v + h, this.bottom - s[f.line].height));
      const I = l.x(E);
      if (_(I, C, S), E = D_(P, E + p + d, b ? E + F : this.right, e.rtl), y(l.x(E), C, S), b)
        f.x += F + h;
      else if (typeof S.text != "string") {
        const L = c.lineHeight;
        f.y += km(S, L) + h;
      } else
        f.y += w;
    }), tm(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, s = e.title, n = Zt(s.font), i = me(s.padding);
    if (!s.display)
      return;
    const o = oi(e.rtl, this.left, this.width), a = this.ctx, r = s.position, l = n.size / 2, c = i.top + l;
    let h, u = this.left, d = this.width;
    if (this.isHorizontal())
      d = Math.max(...this.lineWidths), h = this.top + c, u = ce(e.align, u, this.right - d);
    else {
      const p = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h = c + ce(e.align, this.top, this.bottom - p - e.labels.padding - this._computeTitleHeight());
    }
    const f = ce(r, u, u + d);
    a.textAlign = o.textAlign(oh(r)), a.textBaseline = "middle", a.strokeStyle = s.color, a.fillStyle = s.color, a.font = n.string, Rn(a, s.text, f, h, n);
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
    if (!pw(e.type, s))
      return;
    const n = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const i = this._hoveredItem, o = hw(i, n);
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
function uw(t, e, s, n, i) {
  const o = dw(n, t, e, s), a = fw(i, n, e.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function dw(t, e, s, n) {
  let i = t.text;
  return i && typeof i != "string" && (i = i.reduce((o, a) => o.length > a.length ? o : a)), e + s.size / 2 + n.measureText(i).width;
}
function fw(t, e, s) {
  let n = t;
  return typeof e.text != "string" && (n = km(e, s)), n;
}
function km(t, e) {
  const s = t.text ? t.text.length : 0;
  return e * s;
}
function pw(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var gw = {
  id: "legend",
  _element: Id,
  start(t, e, s) {
    const n = t.legend = new Id({
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
class ph extends Ls {
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
    Rn(e, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: l,
      rotation: c,
      textAlign: oh(s.align),
      textBaseline: "middle",
      translation: [
        a,
        r
      ]
    });
  }
}
function mw(t, e) {
  const s = new ph({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  pe.configure(t, s, e), pe.addBox(t, s), t.titleBlock = s;
}
var yw = {
  id: "title",
  _element: ph,
  start(t, e, s) {
    mw(t, s);
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
const ra = /* @__PURE__ */ new WeakMap();
var bw = {
  id: "subtitle",
  start(t, e, s) {
    const n = new ph({
      ctx: t.ctx,
      options: s,
      chart: t
    });
    pe.configure(t, n, s), pe.addBox(t, n), ra.set(t, n);
  },
  stop(t) {
    pe.removeBox(t, ra.get(t)), ra.delete(t);
  },
  beforeUpdate(t, e, s) {
    const n = ra.get(t);
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
const Bi = {
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
        const c = l.getCenterPoint(), h = ql(e, c);
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
function us(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function _w(t, e) {
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
function Nd(t, e) {
  const s = t.chart.ctx, { body: n, footer: i, title: o } = t, { boxWidth: a, boxHeight: r } = e, l = Zt(e.bodyFont), c = Zt(e.titleFont), h = Zt(e.footerFont), u = o.length, d = i.length, f = n.length, p = me(e.padding);
  let g = p.height, m = 0, _ = n.reduce((v, w) => v + w.before.length + w.lines.length + w.after.length, 0);
  if (_ += t.beforeBody.length + t.afterBody.length, u && (g += u * c.lineHeight + (u - 1) * e.titleSpacing + e.titleMarginBottom), _) {
    const v = e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    g += f * v + (_ - f) * l.lineHeight + (_ - 1) * e.bodySpacing;
  }
  d && (g += e.footerMarginTop + d * h.lineHeight + (d - 1) * e.footerSpacing);
  let y = 0;
  const b = function(v) {
    m = Math.max(m, s.measureText(v).width + y);
  };
  return s.save(), s.font = c.string, At(t.title, b), s.font = l.string, At(t.beforeBody.concat(t.afterBody), b), y = e.displayColors ? a + 2 + e.boxPadding : 0, At(n, (v) => {
    At(v.before, b), At(v.lines, b), At(v.after, b);
  }), y = 0, s.font = h.string, At(t.footer, b), s.restore(), m += p.width, {
    width: m,
    height: g
  };
}
function xw(t, e) {
  const { y: s, height: n } = e;
  return s < n / 2 ? "top" : s > t.height - n / 2 ? "bottom" : "center";
}
function vw(t, e, s, n) {
  const { x: i, width: o } = n, a = s.caretSize + s.caretPadding;
  if (t === "left" && i + o + a > e.width || t === "right" && i - o - a < 0)
    return !0;
}
function Sw(t, e, s, n) {
  const { x: i, width: o } = s, { width: a, chartArea: { left: r, right: l } } = t;
  let c = "center";
  return n === "center" ? c = i <= (r + l) / 2 ? "left" : "right" : i <= o / 2 ? c = "left" : i >= a - o / 2 && (c = "right"), vw(c, t, e, s) && (c = "center"), c;
}
function Bd(t, e, s) {
  const n = s.yAlign || e.yAlign || xw(t, s);
  return {
    xAlign: s.xAlign || e.xAlign || Sw(t, e, s, n),
    yAlign: n
  };
}
function ww(t, e) {
  let { x: s, width: n } = t;
  return e === "right" ? s -= n : e === "center" && (s -= n / 2), s;
}
function Cw(t, e, s) {
  let { y: n, height: i } = t;
  return e === "top" ? n += s : e === "bottom" ? n -= i + s : n -= i / 2, n;
}
function $d(t, e, s, n) {
  const { caretSize: i, caretPadding: o, cornerRadius: a } = t, { xAlign: r, yAlign: l } = s, c = i + o, { topLeft: h, topRight: u, bottomLeft: d, bottomRight: f } = Sn(a);
  let p = ww(e, r);
  const g = Cw(e, l, c);
  return l === "center" ? r === "left" ? p += c : r === "right" && (p -= c) : r === "left" ? p -= Math.max(h, d) + i : r === "right" && (p += Math.max(u, f) + i), {
    x: se(p, 0, n.width - e.width),
    y: se(g, 0, n.height - e.height)
  };
}
function la(t, e, s) {
  const n = me(s.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - n.right : t.x + n.left;
}
function jd(t) {
  return Xe([], us(t));
}
function kw(t, e, s) {
  return Qs(t, {
    tooltip: e,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Wd(t, e) {
  const s = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return s ? t.override(s) : t;
}
const Mm = {
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
  return typeof i > "u" ? Mm[e].call(s, n) : i;
}
class sc extends Ls {
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
    const s = this.chart, n = this.options.setContext(this.getContext()), i = n.enabled && s.options.animation && n.animations, o = new om(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = kw(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeTitle", this, e), o = we(n, "title", this, e), a = we(n, "afterTitle", this, e);
    let r = [];
    return r = Xe(r, us(i)), r = Xe(r, us(o)), r = Xe(r, us(a)), r;
  }
  getBeforeBody(e, s) {
    return jd(we(s.callbacks, "beforeBody", this, e));
  }
  getBody(e, s) {
    const { callbacks: n } = s, i = [];
    return At(e, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, r = Wd(n, o);
      Xe(a.before, us(we(r, "beforeLabel", this, o))), Xe(a.lines, we(r, "label", this, o)), Xe(a.after, us(we(r, "afterLabel", this, o))), i.push(a);
    }), i;
  }
  getAfterBody(e, s) {
    return jd(we(s.callbacks, "afterBody", this, e));
  }
  getFooter(e, s) {
    const { callbacks: n } = s, i = we(n, "beforeFooter", this, e), o = we(n, "footer", this, e), a = we(n, "afterFooter", this, e);
    let r = [];
    return r = Xe(r, us(i)), r = Xe(r, us(o)), r = Xe(r, us(a)), r;
  }
  _createItems(e) {
    const s = this._active, n = this.chart.data, i = [], o = [], a = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push(_w(this.chart, s[l]));
    return e.filter && (r = r.filter((h, u, d) => e.filter(h, u, d, n))), e.itemSort && (r = r.sort((h, u) => e.itemSort(h, u, n))), At(r, (h) => {
      const u = Wd(e.callbacks, h);
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
      const r = Bi[n.position].call(this, i, this._eventPosition);
      a = this._createItems(n), this.title = this.getTitle(a, n), this.beforeBody = this.getBeforeBody(a, n), this.body = this.getBody(a, n), this.afterBody = this.getAfterBody(a, n), this.footer = this.getFooter(a, n);
      const l = this._size = Nd(this, n), c = Object.assign({}, r, l), h = Bd(this.chart, n, c), u = $d(n, c, h, this.chart);
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
    const { xAlign: i, yAlign: o } = this, { caretSize: a, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: u } = Sn(r), { x: d, y: f } = e, { width: p, height: g } = s;
    let m, _, y, b, v, w;
    return o === "center" ? (v = f + g / 2, i === "left" ? (m = d, _ = m - a, b = v + a, w = v - a) : (m = d + p, _ = m + a, b = v - a, w = v + a), y = m) : (i === "left" ? _ = d + Math.max(l, h) + a : i === "right" ? _ = d + p - Math.max(c, u) - a : _ = this.caretX, o === "top" ? (b = f, v = b - a, m = _ - a, y = _ + a) : (b = f + g, v = b + a, m = _ + a, y = _ - a), w = b), {
      x1: m,
      x2: _,
      x3: y,
      y1: b,
      y2: v,
      y3: w
    };
  }
  drawTitle(e, s, n) {
    const i = this.title, o = i.length;
    let a, r, l;
    if (o) {
      const c = oi(n.rtl, this.x, this.width);
      for (e.x = la(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", a = Zt(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = a.string, l = 0; l < o; ++l)
        s.fillText(i[l], c.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + r, l + 1 === o && (e.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(e, s, n, i, o) {
    const a = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = o, h = Zt(o.bodyFont), u = la(this, "left", o), d = i.x(u), f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, p = s.y + f;
    if (o.usePointStyle) {
      const g = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = i.leftForLtr(d, c) + c / 2, _ = p + l / 2;
      e.strokeStyle = o.multiKeyBackground, e.fillStyle = o.multiKeyBackground, Kl(e, g, m, _), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, Kl(e, g, m, _);
    } else {
      e.lineWidth = bt(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
      const g = i.leftForLtr(d, c), m = i.leftForLtr(i.xPlus(d, 1), c - 2), _ = Sn(a.borderRadius);
      Object.values(_).some((y) => y !== 0) ? (e.beginPath(), e.fillStyle = o.multiKeyBackground, bo(e, {
        x: g,
        y: p,
        w: c,
        h: l,
        radius: _
      }), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), bo(e, {
        x: m,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), e.fill()) : (e.fillStyle = o.multiKeyBackground, e.fillRect(g, p, c, l), e.strokeRect(g, p, c, l), e.fillStyle = a.backgroundColor, e.fillRect(m, p + 1, c - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[n];
  }
  drawBody(e, s, n) {
    const { body: i } = this, { bodySpacing: o, bodyAlign: a, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: h } = n, u = Zt(n.bodyFont);
    let d = u.lineHeight, f = 0;
    const p = oi(n.rtl, this.x, this.width), g = function(k) {
      s.fillText(k, p.x(e.x + f), e.y + d / 2), e.y += d + o;
    }, m = p.textAlign(a);
    let _, y, b, v, w, S, x;
    for (s.textAlign = a, s.textBaseline = "middle", s.font = u.string, e.x = la(this, m, n), s.fillStyle = n.bodyColor, At(this.beforeBody, g), f = r && m !== "right" ? a === "center" ? c / 2 + h : c + 2 + h : 0, v = 0, S = i.length; v < S; ++v) {
      for (_ = i[v], y = this.labelTextColors[v], s.fillStyle = y, At(_.before, g), b = _.lines, r && b.length && (this._drawColorBox(s, e, v, p, n), d = Math.max(u.lineHeight, l)), w = 0, x = b.length; w < x; ++w)
        g(b[w]), d = u.lineHeight;
      At(_.after, g);
    }
    f = 0, d = u.lineHeight, At(this.afterBody, g), e.y -= o;
  }
  drawFooter(e, s, n) {
    const i = this.footer, o = i.length;
    let a, r;
    if (o) {
      const l = oi(n.rtl, this.x, this.width);
      for (e.x = la(this, n.footerAlign, n), e.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", a = Zt(n.footerFont), s.fillStyle = n.footerColor, s.font = a.string, r = 0; r < o; ++r)
        s.fillText(i[r], l.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(e, s, n, i) {
    const { xAlign: o, yAlign: a } = this, { x: r, y: l } = e, { width: c, height: h } = n, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = Sn(i.cornerRadius);
    s.fillStyle = i.backgroundColor, s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.beginPath(), s.moveTo(r + u, l), a === "top" && this.drawCaret(e, s, n, i), s.lineTo(r + c - d, l), s.quadraticCurveTo(r + c, l, r + c, l + d), a === "center" && o === "right" && this.drawCaret(e, s, n, i), s.lineTo(r + c, l + h - p), s.quadraticCurveTo(r + c, l + h, r + c - p, l + h), a === "bottom" && this.drawCaret(e, s, n, i), s.lineTo(r + f, l + h), s.quadraticCurveTo(r, l + h, r, l + h - f), a === "center" && o === "left" && this.drawCaret(e, s, n, i), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), i.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(e) {
    const s = this.chart, n = this.$animations, i = n && n.x, o = n && n.y;
    if (i || o) {
      const a = Bi[e.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const r = this._size = Nd(this, e), l = Object.assign({}, a, this._size), c = Bd(s, e, l), h = $d(e, l, c, s);
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
    s.enabled && r && (e.save(), e.globalAlpha = n, this.drawBackground(o, e, i, s), Qg(e, s.textDirection), o.y += a.top, this.drawTitle(o, e, s), this.drawBody(o, e, s), this.drawFooter(o, e, s), tm(e, s.textDirection), e.restore());
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
    }), o = !tr(n, i), a = this._positionChanged(i, s);
    (o || a) && (this._active = i, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, o = this._active || [], a = this._getActiveElements(e, o, s, n), r = this._positionChanged(a, e), l = s || !tr(a, o) || r;
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
    const { caretX: n, caretY: i, options: o } = this, a = Bi[o.position].call(this, e, s);
    return a !== !1 && (n !== a.x || i !== a.y);
  }
}
Q(sc, "positioners", Bi);
var Mw = {
  id: "tooltip",
  _element: sc,
  positioners: Bi,
  afterInit(t, e, s) {
    s && (t.tooltip = new sc({
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
    callbacks: Mm
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
}, Aw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: $S,
  Decimation: HS,
  Filler: cw,
  Legend: gw,
  SubTitle: bw,
  Title: yw,
  Tooltip: Mw
});
const Pw = (t, e, s, n) => (typeof e == "string" ? (s = t.push(e) - 1, n.unshift({
  index: s,
  label: e
})) : isNaN(e) && (s = null), s);
function Tw(t, e, s, n) {
  const i = t.indexOf(e);
  if (i === -1)
    return Pw(t, e, s, n);
  const o = t.lastIndexOf(e);
  return i !== o ? s : i;
}
const Dw = (t, e) => t === null ? null : se(Math.round(t), 0, e);
function Vd(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class nc extends In {
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
    return s = isFinite(s) && n[s] === e ? s : Tw(n, e, ut(s, e), this._addedLabels), Dw(s, n.length - 1);
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
    return Vd.call(this, e);
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
Q(nc, "id", "category"), Q(nc, "defaults", {
  ticks: {
    callback: Vd
  }
});
function Rw(t, e) {
  const s = [], { bounds: i, step: o, min: a, max: r, precision: l, count: c, maxTicks: h, maxDigits: u, includeBounds: d } = t, f = o || 1, p = h - 1, { min: g, max: m } = e, _ = !mt(a), y = !mt(r), b = !mt(c), v = (m - g) / (u + 1);
  let w = Nu((m - g) / p / f) * f, S, x, k, P;
  if (w < 1e-14 && !_ && !y)
    return [
      {
        value: g
      },
      {
        value: m
      }
    ];
  P = Math.ceil(m / w) - Math.floor(g / w), P > p && (w = Nu(P * w / p / f) * f), mt(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), i === "ticks" ? (x = Math.floor(g / w) * w, k = Math.ceil(m / w) * w) : (x = g, k = m), _ && y && o && w_((r - a) / o, w / 1e3) ? (P = Math.round(Math.min((r - a) / w, h)), w = (r - a) / P, x = a, k = r) : b ? (x = _ ? a : x, k = y ? r : k, P = c - 1, w = (k - x) / P) : (P = (k - x) / w, Ji(P, Math.round(P), w / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const F = Math.max(Bu(w), Bu(x));
  S = Math.pow(10, mt(l) ? F : l), x = Math.round(x * S) / S, k = Math.round(k * S) / S;
  let E = 0;
  for (_ && (d && x !== a ? (s.push({
    value: a
  }), x < a && E++, Ji(Math.round((x + E * w) * S) / S, a, Hd(a, v, t)) && E++) : x < a && E++); E < P; ++E) {
    const C = Math.round((x + E * w) * S) / S;
    if (y && C > r)
      break;
    s.push({
      value: C
    });
  }
  return y && d && k !== r ? s.length && Ji(s[s.length - 1].value, r, Hd(r, v, t)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || k === r) && s.push({
    value: k
  }), s;
}
function Hd(t, e, { horizontal: s, minRotation: n }) {
  const i = ze(n), o = (s ? Math.sin(i) : Math.cos(i)) || 1e-3, a = 0.75 * e * ("" + t).length;
  return Math.min(e / o, a);
}
class lr extends In {
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
      const l = ns(i), c = ns(o);
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
    }, o = this._range || this, a = Rw(i, o);
    return e.bounds === "ticks" && Ig(a, this, "value"), e.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
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
    return Fo(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class ic extends lr {
  determineDataLimits() {
    const { min: e, max: s } = this.getMinMax(!0);
    this.min = $t(e) ? e : 0, this.max = $t(s) ? s : 1, this.handleTickRangeOptions();
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
Q(ic, "id", "linear"), Q(ic, "defaults", {
  ticks: {
    callback: Dr.formatters.numeric
  }
});
const xo = (t) => Math.floor(Vs(t)), ln = (t, e) => Math.pow(10, xo(t) + e);
function zd(t) {
  return t / Math.pow(10, xo(t)) === 1;
}
function Gd(t, e, s) {
  const n = Math.pow(10, s), i = Math.floor(t / n);
  return Math.ceil(e / n) - i;
}
function Lw(t, e) {
  const s = e - t;
  let n = xo(s);
  for (; Gd(t, e, n) > 10; )
    n++;
  for (; Gd(t, e, n) < 10; )
    n--;
  return Math.min(n, xo(t));
}
function Ow(t, { min: e, max: s }) {
  e = Le(t.min, e);
  const n = [], i = xo(e);
  let o = Lw(e, s), a = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const r = Math.pow(10, o), l = i > o ? Math.pow(10, i) : 0, c = Math.round((e - l) * a) / a, h = Math.floor((e - l) / r / 10) * r * 10;
  let u = Math.floor((c - h) / Math.pow(10, o)), d = Le(t.min, Math.round((l + h + u * Math.pow(10, o)) * a) / a);
  for (; d < s; )
    n.push({
      value: d,
      major: zd(d),
      significand: u
    }), u >= 10 ? u = u < 15 ? 15 : 20 : u++, u >= 20 && (o++, u = 2, a = o >= 0 ? 1 : a), d = Math.round((l + h + u * Math.pow(10, o)) * a) / a;
  const f = Le(t.max, d);
  return n.push({
    value: f,
    major: zd(f),
    significand: u
  }), n;
}
class oc extends In {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, s) {
    const n = lr.prototype.parse.apply(this, [
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
    const o = (r) => n = e ? n : r, a = (r) => i = s ? i : r;
    n === i && (n <= 0 ? (o(1), a(10)) : (o(ln(n, -1)), a(ln(i, 1)))), n <= 0 && o(ln(i, -1)), i <= 0 && a(ln(n, 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const e = this.options, s = {
      min: this._userMin,
      max: this._userMax
    }, n = Ow(s, this);
    return e.bounds === "ticks" && Ig(n, this, "value"), e.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : Fo(e, this.chart.options.locale, this.options.ticks.format);
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
Q(oc, "id", "logarithmic"), Q(oc, "defaults", {
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
function Fw(t, e, s) {
  return s = Ft(s) ? s : [
    s
  ], {
    w: j_(t, e.string, s),
    h: s.length * e.lineHeight
  };
}
function Ud(t, e, s, n, i) {
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
function Ew(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, s = Object.assign({}, e), n = [], i = [], o = t._pointLabels.length, a = t.options.pointLabels, r = a.centerPointLabels ? vt / o : 0;
  for (let l = 0; l < o; l++) {
    const c = a.setContext(t.getPointLabelContext(l));
    i[l] = c.padding;
    const h = t.getPointPosition(l, t.drawingArea + i[l], r), u = Zt(c.font), d = Fw(t.ctx, u, t._pointLabels[l]);
    n[l] = d;
    const f = de(t.getIndexAngle(l) + r), p = Math.round(nh(f)), g = Ud(p, h.x, d.w, 0, 180), m = Ud(p, h.y, d.h, 90, 270);
    Iw(s, e, f, g, m);
  }
  t.setCenterPoint(e.l - s.l, s.r - e.r, e.t - s.t, s.b - e.b), t._pointLabelItems = $w(t, n, i);
}
function Iw(t, e, s, n, i) {
  const o = Math.abs(Math.sin(s)), a = Math.abs(Math.cos(s));
  let r = 0, l = 0;
  n.start < e.l ? (r = (e.l - n.start) / o, t.l = Math.min(t.l, e.l - r)) : n.end > e.r && (r = (n.end - e.r) / o, t.r = Math.max(t.r, e.r + r)), i.start < e.t ? (l = (e.t - i.start) / a, t.t = Math.min(t.t, e.t - l)) : i.end > e.b && (l = (i.end - e.b) / a, t.b = Math.max(t.b, e.b + l));
}
function Nw(t, e, s) {
  const n = t.drawingArea, { extra: i, additionalAngle: o, padding: a, size: r } = s, l = t.getPointPosition(e, n + i + a, o), c = Math.round(nh(de(l.angle + Ut))), h = Vw(l.y, r.h, c), u = jw(c), d = Ww(l.x, r.w, u);
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
function Bw(t, e) {
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
function $w(t, e, s) {
  const n = [], i = t._pointLabels.length, o = t.options, { centerPointLabels: a, display: r } = o.pointLabels, l = {
    extra: ac(o) / 2,
    additionalAngle: a ? vt / i : 0
  };
  let c;
  for (let h = 0; h < i; h++) {
    l.padding = s[h], l.size = e[h];
    const u = Nw(t, h, l);
    n.push(u), r === "auto" && (u.visible = Bw(u, c), u.visible && (c = u));
  }
  return n;
}
function jw(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function Ww(t, e, s) {
  return s === "right" ? t -= e : s === "center" && (t -= e / 2), t;
}
function Vw(t, e, s) {
  return s === 90 || s === 270 ? t -= e / 2 : (s > 270 || s < 90) && (t -= e), t;
}
function Hw(t, e, s) {
  const { left: n, top: i, right: o, bottom: a } = s, { backdropColor: r } = e;
  if (!mt(r)) {
    const l = Sn(e.borderRadius), c = me(e.backdropPadding);
    t.fillStyle = r;
    const h = n - c.left, u = i - c.top, d = o - n + c.width, f = a - i + c.height;
    Object.values(l).some((p) => p !== 0) ? (t.beginPath(), bo(t, {
      x: h,
      y: u,
      w: d,
      h: f,
      radius: l
    }), t.fill()) : t.fillRect(h, u, d, f);
  }
}
function zw(t, e) {
  const { ctx: s, options: { pointLabels: n } } = t;
  for (let i = e - 1; i >= 0; i--) {
    const o = t._pointLabelItems[i];
    if (!o.visible)
      continue;
    const a = n.setContext(t.getPointLabelContext(i));
    Hw(s, a, o);
    const r = Zt(a.font), { x: l, y: c, textAlign: h } = o;
    Rn(s, t._pointLabels[i], l, c + r.lineHeight / 2, r, {
      color: a.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Am(t, e, s, n) {
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
function Gw(t, e, s, n, i) {
  const o = t.ctx, a = e.circular, { color: r, lineWidth: l } = e;
  !a && !n || !r || !l || s < 0 || (o.save(), o.strokeStyle = r, o.lineWidth = l, o.setLineDash(i.dash || []), o.lineDashOffset = i.dashOffset, o.beginPath(), Am(t, s, a, n), o.closePath(), o.stroke(), o.restore());
}
function Uw(t, e, s) {
  return Qs(t, {
    label: s,
    index: e,
    type: "pointLabel"
  });
}
class $i extends lr {
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
    lr.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((s, n) => {
      const i = Rt(this.options.pointLabels.callback, [
        s,
        n
      ], this);
      return i || i === 0 ? i : "";
    }).filter((s, n) => this.chart.getDataVisibility(n));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? Ew(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, s, n, i) {
    this.xCenter += Math.floor((e - s) / 2), this.yCenter += Math.floor((n - i) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, s, n, i));
  }
  getIndexAngle(e) {
    const s = Ot / (this._pointLabels.length || 1), n = this.options.startAngle || 0;
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
      return Uw(this.getContext(), e, n);
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
      n.save(), n.beginPath(), Am(this, this.getDistanceFromCenterForValue(this._endValue), s, this._pointLabels.length), n.closePath(), n.fillStyle = e, n.fill(), n.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, s = this.options, { angleLines: n, grid: i, border: o } = s, a = this._pointLabels.length;
    let r, l, c;
    if (s.pointLabels.display && zw(this, a), i.display && this.ticks.forEach((h, u) => {
      if (u !== 0 || u === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const d = this.getContext(u), f = i.setContext(d), p = o.setContext(d);
        Gw(this, f, l, a, p);
      }
    }), n.display) {
      for (e.save(), r = a - 1; r >= 0; r--) {
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
      Rn(e, r.label, 0, -o, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
}
Q($i, "id", "radialLinear"), Q($i, "defaults", {
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
}), Q($i, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), Q($i, "descriptors", {
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
function qd(t, e) {
  return t - e;
}
function Yd(t, e) {
  if (mt(e))
    return null;
  const s = t._adapter, { parser: n, round: i, isoWeekday: o } = t._parseOpts;
  let a = e;
  return typeof n == "function" && (a = n(a)), $t(a) || (a = typeof n == "string" ? s.parse(a, n) : s.parse(a)), a === null ? null : (i && (a = i === "week" && (di(o) || o === !0) ? s.startOf(a, "isoWeek", o) : s.startOf(a, i)), +a);
}
function Kd(t, e, s, n) {
  const i = Ae.length;
  for (let o = Ae.indexOf(t); o < i - 1; ++o) {
    const a = Ir[Ae[o]], r = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((s - e) / (r * a.size)) <= n)
      return Ae[o];
  }
  return Ae[i - 1];
}
function qw(t, e, s, n, i) {
  for (let o = Ae.length - 1; o >= Ae.indexOf(s); o--) {
    const a = Ae[o];
    if (Ir[a].common && t._adapter.diff(i, n, a) >= e - 1)
      return a;
  }
  return Ae[s ? Ae.indexOf(s) : 0];
}
function Yw(t) {
  for (let e = Ae.indexOf(t) + 1, s = Ae.length; e < s; ++e)
    if (Ir[Ae[e]].common)
      return Ae[e];
}
function Jd(t, e, s) {
  if (!s)
    t[e] = !0;
  else if (s.length) {
    const { lo: n, hi: i } = ih(s, e), o = s[n] >= e ? s[n] : s[i];
    t[o] = !0;
  }
}
function Kw(t, e, s, n) {
  const i = t._adapter, o = +i.startOf(e[0].value, n), a = e[e.length - 1].value;
  let r, l;
  for (r = o; r <= a; r = +i.add(r, 1, n))
    l = s[r], l >= 0 && (e[l].major = !0);
  return e;
}
function Xd(t, e, s) {
  const n = [], i = {}, o = e.length;
  let a, r;
  for (a = 0; a < o; ++a)
    r = e[a], i[r] = a, n.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? n : Kw(t, n, i, s);
}
class vo extends In {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, s = {}) {
    const n = e.time || (e.time = {}), i = this._adapter = new nv._date(e.adapters.date);
    i.init(s), Ki(n.displayFormats, i.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(e), this._normalized = s.normalized;
  }
  parse(e, s) {
    return e === void 0 ? null : Yd(this, e);
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
    (!a || !r) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), i = $t(i) && !isNaN(i) ? i : +s.startOf(Date.now(), n), o = $t(o) && !isNaN(o) ? o : +s.endOf(Date.now(), n) + 1, this.min = Math.min(i, o - 1), this.max = Math.max(i + 1, o);
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
    const o = this.min, a = this.max, r = A_(i, o, a);
    return this._unit = s.unit || (n.autoSkip ? Kd(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : qw(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Yw(this._unit), this.initOffsets(i), e.reverse && r.reverse(), Xd(this, r, this._majorUnit);
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
    const e = this._adapter, s = this.min, n = this.max, i = this.options, o = i.time, a = o.unit || Kd(o.minUnit, s, n, this._getLabelCapacity(s)), r = ut(i.ticks.stepSize, 1), l = a === "week" ? o.isoWeekday : !1, c = di(l) || l === !0, h = {};
    let u = s, d, f;
    if (c && (u = +e.startOf(u, "isoWeek", l)), u = +e.startOf(u, c ? "day" : a), e.diff(n, s, a) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + a);
    const p = i.ticks.source === "data" && this.getDataTimestamps();
    for (d = u, f = 0; d < n; d = +e.add(d, r, a), f++)
      Jd(h, d, p);
    return (d === n || i.bounds === "ticks" || f === 1) && Jd(h, d, p), Object.keys(h).sort(qd).map((g) => +g);
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
    const r = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && r[l], u = c && r[c], d = n[s], f = c && u && d && d.major;
    return this._adapter.format(e, i || (f ? u : h));
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
    const s = this.options.time, n = s.displayFormats, i = n[s.unit] || n.millisecond, o = this._tickFormatFunction(e, 0, Xd(this, [
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
      e.push(Yd(this, i[s]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return $g(e.sort(qd));
  }
}
Q(vo, "id", "time"), Q(vo, "defaults", {
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
function ca(t, e, s) {
  let n = 0, i = t.length - 1, o, a, r, l;
  s ? (e >= t[n].pos && e <= t[i].pos && ({ lo: n, hi: i } = xs(t, "pos", e)), { pos: o, time: r } = t[n], { pos: a, time: l } = t[i]) : (e >= t[n].time && e <= t[i].time && ({ lo: n, hi: i } = xs(t, "time", e)), { time: o, pos: r } = t[n], { time: a, pos: l } = t[i]);
  const c = a - o;
  return c ? r + (l - r) * (e - o) / c : r;
}
class rc extends vo {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(e);
    this._minPos = ca(s, this.min), this._tableRange = ca(s, this.max) - this._minPos, super.initOffsets(e);
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
    return (ca(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const s = this._offsets, n = this.getDecimalForPixel(e) / s.factor - s.end;
    return ca(this._table, n * this._tableRange + this._minPos, !0);
  }
}
Q(rc, "id", "timeseries"), Q(rc, "defaults", vo.defaults);
var Jw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: nc,
  LinearScale: ic,
  LogarithmicScale: oc,
  RadialLinearScale: $i,
  TimeScale: vo,
  TimeSeriesScale: rc
});
const Xw = [
  sv,
  LS,
  Aw,
  Jw
];
ar.register(...Xw);
const it = "https://slowfootball.club/api", Jt = "Leverkusen", Zw = "https://sf-game-proxy.ofersi15.workers.dev/token", to = ["north", "south", "europa", "world", "conference", "hipster"], fl = /* @__PURE__ */ new Set(["Barcelona", "Bayern Munich", "Juventus", "Damac", "Saudi All-Stars", "Inter Miami"]), ha = ["GK", "FB", "CB", "DM", "CM", "AM", "WF", "CF"], Qw = ["FB", "CB", "DM", "CM", "AM", "WF", "CF"], pl = 100, Hn = "sf_tactics_v4", tC = 7 * 24 * 60 * 60 * 1e3, zn = "sf_players_v6", ua = "sf_stats_v1", eC = 6 * 60 * 60 * 1e3, sC = 7 * 24 * 60 * 60 * 1e3, nC = 6 * 60 * 60 * 1e3, Zd = "sf_submissions_all_v1", da = "sf_subs_ls", gi = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  DM: ["Tackling", "Passing", "Vision", "Marking"],
  CM: ["Vision", "Passing", "Dribbling", "Shooting"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, Qd = {
  GK: "Han, Ref, Spd, Pas",
  FB: "Pas, Tck, Sta, Mk",
  CB: "Mk, Hdg, Tck, Spd",
  DM: "Tck, Pas, Vis, Mk",
  CM: "Vis, Pas, Drb, Sh",
  AM: "Pas, Drb, Sh, Vis",
  WF: "Drb, Pas, Spd, Sh",
  CF: "Spd, Drb, Hdg, Sh"
}, iC = {
  GK: ["GK"],
  CB: ["CB", "FB", "DM"],
  FB: ["FB", "CB", "DM"],
  DM: ["DM", "FB", "CB", "AM"],
  CM: ["CM", "DM", "AM"],
  AM: ["AM", "WF", "CF", "DM"],
  WM: ["FB", "DM", "AM", "WF"],
  WF: ["WF", "AM", "CF"],
  CF: ["CF", "WF", "AM"]
}, oC = {
  GK: ["Handling", "Reflexes", "Speed", "Passing"],
  CB: ["Marking", "Heading", "Tackling", "Speed"],
  FB: ["Passing", "Tackling", "Stamina", "Marking"],
  DM: ["Tackling", "Marking", "Passing", "Vision"],
  CM: ["Passing", "Vision", "Tackling", "Dribbling"],
  AM: ["Passing", "Dribbling", "Shooting", "Vision"],
  WM: ["Stamina", "Passing", "Speed", "Dribbling"],
  WF: ["Dribbling", "Passing", "Speed", "Shooting"],
  CF: ["Speed", "Dribbling", "Heading", "Shooting"]
}, tf = ["Mentality", "Experience", "Work rate"], mn = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision"], lc = [...mn, "Mentality", "Experience", "Leadership", "Work rate"], ef = [...lc, "Adaptability", "Form", "Confidence"], gh = {
  442: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "CF", "CF"],
  4411: ["GK", "FB", "CB", "CB", "FB", "WM", "CM", "CM", "WM", "AM", "CF"],
  4231: ["GK", "FB", "CB", "CB", "FB", "DM", "DM", "WF", "AM", "WF", "CF"],
  433: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "WF", "WF", "CF"],
  4321: ["GK", "FB", "CB", "CB", "FB", "CM", "CM", "CM", "AM", "AM", "CF"],
  3421: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "AM", "AM", "CF"],
  352: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "CM", "WM", "CF", "CF"],
  343: ["GK", "CB", "CB", "CB", "WM", "CM", "CM", "WM", "WF", "CF", "WF"]
}, aC = {
  442: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 55 }, { x: 44, y: 55 }, { x: 24, y: 55 }, { x: 9, y: 55 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  4411: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 59, y: 57 }, { x: 44, y: 57 }, { x: 24, y: 57 }, { x: 9, y: 57 }, { x: 34, y: 35 }, { x: 34, y: 13 }],
  4231: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 45, y: 63 }, { x: 23, y: 63 }, { x: 58, y: 40 }, { x: 34, y: 40 }, { x: 10, y: 40 }, { x: 34, y: 13 }],
  433: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 48, y: 56 }, { x: 34, y: 56 }, { x: 20, y: 56 }, { x: 58, y: 28 }, { x: 10, y: 28 }, { x: 34, y: 13 }],
  3421: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 44, y: 35 }, { x: 24, y: 35 }, { x: 34, y: 13 }],
  352: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 61, y: 58 }, { x: 46, y: 58 }, { x: 34, y: 58 }, { x: 22, y: 58 }, { x: 7, y: 58 }, { x: 44, y: 20 }, { x: 24, y: 20 }],
  343: [{ x: 34, y: 97 }, { x: 51, y: 78 }, { x: 34, y: 78 }, { x: 17, y: 78 }, { x: 60, y: 59 }, { x: 43, y: 59 }, { x: 25, y: 59 }, { x: 8, y: 59 }, { x: 58, y: 20 }, { x: 34, y: 13 }, { x: 10, y: 20 }],
  4321: [{ x: 34, y: 97 }, { x: 60, y: 78 }, { x: 45, y: 78 }, { x: 23, y: 78 }, { x: 8, y: 78 }, { x: 50, y: 60 }, { x: 34, y: 60 }, { x: 18, y: 60 }, { x: 44, y: 37 }, { x: 24, y: 37 }, { x: 34, y: 13 }]
}, sf = { GK: 0, CB: 1, FB: 2, DM: 3, CM: 4, WM: 5, AM: 6, WF: 7, CF: 8 }, nf = {
  GK: { fill: "#2d4a1a", stroke: "#7ee787", text: "#7ee787" },
  FB: { fill: "#1a3a5e", stroke: "#79c0ff", text: "#79c0ff" },
  CB: { fill: "#1a3060", stroke: "#79c0ff", text: "#79c0ff" },
  DM: { fill: "#3a2a6b", stroke: "#d2a8ff", text: "#d2a8ff" },
  CM: { fill: "#3a2a1a", stroke: "#ffa657", text: "#ffa657" },
  WM: { fill: "#3a1a3a", stroke: "#d2a8ff", text: "#d2a8ff" },
  AM: { fill: "#4a3a10", stroke: "#ffa657", text: "#ffa657" },
  WF: { fill: "#3a1a1a", stroke: "#ff7b72", text: "#ff7b72" },
  CF: { fill: "#5a1010", stroke: "#ff7b72", text: "#ff7b72" }
}, cc = (/* @__PURE__ */ new Date("2025-08-23T00:00:00Z")).getTime(), Pm = 7 * 24 * 60 * 60 * 1e3;
function Ln(t, e) {
  const s = gi[e];
  if (!s) return null;
  const n = s.map((i) => t[i]).filter((i) => i != null && i > 0);
  return n.length ? Math.round(n.reduce((i, o) => i + o, 0) / n.length * 10) / 10 : null;
}
function So(t, e, s, n) {
  const i = Ln(t, e);
  if (i === null) return null;
  if (!n || !s.length) return i;
  const o = s.map((l) => t[l]).filter((l) => l != null && l > 0);
  if (!o.length) return i;
  const a = o.reduce((l, c) => l + c, 0) / o.length, r = n / 100;
  return Math.round((i * (1 - r) + a * r) * 10) / 10;
}
function rC(t) {
  if (!t.Value || !t.Rating) return null;
  const e = t.Rating, s = t.Age || 26, n = e >= 87 ? 4 : e >= 84 ? 3 : e >= 81 ? 2.2 : e >= 78 ? 1.7 : e >= 75 ? 1.3 : 1, i = s <= 22 ? 1.5 : s <= 25 ? 1.3 : s <= 28 ? 1 : s <= 31 ? 0.75 : 0.5, o = t.Value * n * i;
  return Math.round(o / 5e5) * 5e5 || Math.round(o / 1e5) * 1e5;
}
function Tm(t) {
  return t >= 1e6 ? `£${(t / 1e6).toFixed(1)}m` : t >= 1e3 ? `£${(t / 1e3).toFixed(0)}k` : t ? `£${t}` : "—";
}
function lC(t) {
  return t ? `£${(t / 1e3).toFixed(0)}k/w` : "—";
}
function cC(t) {
  return t ? String(t).split("").join("-") : null;
}
function Di(t) {
  return t ? String(t).replace(/-/g, "") : null;
}
function hC(t) {
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
function uC(t) {
  if (!t) return "—";
  const e = new Date(t);
  if (isNaN(e.getTime())) return "—";
  const s = Date.now() - e.getTime();
  return s < 6e4 ? "just now" : s < 36e5 ? Math.floor(s / 6e4) + "m ago" : s < 864e5 ? Math.floor(s / 36e5) + "h ago" : s < 7 * 864e5 ? Math.floor(s / 864e5) + "d ago" : e.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
function mh() {
  return Math.max(0, Math.round((Date.now() - cc) / Pm));
}
function hc(t, e, s) {
  const n = (r) => String(r || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(), i = n(t), o = n(e), a = (s || []).filter((r) => n(r.playerName || r.player || r.name || "") === i && n(r.toClub || r.buyer || r.buyerClub || r.to || "") === o).map((r) => {
    const l = r.ts || r.updatedAt || r.createdAt || r.date;
    if (!l) return null;
    const c = new Date(l).getTime();
    return !c || c < cc ? 0 : Math.round((c - cc) / Pm);
  }).filter((r) => r !== null).sort((r, l) => r - l);
  return a.length ? Math.max(0, mh() - a[0]) : null;
}
function uc(t) {
  const e = t.Position || "", s = (o) => Number(t[o] || 0), n = [];
  (e === "CF" || e === "WF") && (s("Shooting") >= 80 && n.push({ n: "Clinical Finisher", d: "Consistently puts away their chances." }), s("Speed") >= 82 && n.push({ n: "Pace Merchant", d: "Explosive behind defensive lines." }), s("Heading") >= 80 && e === "CF" && n.push({ n: "Aerial Threat", d: "Dominant in the air from crosses and corners." }), s("Dribbling") >= 80 && n.push({ n: "Close Control", d: "Exceptional in tight areas, difficult to dispossess." })), (e === "CM" || e === "AM" || e === "DM") && (s("Vision") >= 82 && n.push({ n: "Visionary", d: "Sees passes others miss. Finds runners in behind." }), s("Passing") >= 82 && n.push({ n: "Metronome", d: "High pass completion with the range to switch play." }), e === "DM" && s("Tackling") >= 80 && n.push({ n: "Ball Winner", d: "Reads attacks early to break up play." }), s("Dribbling") >= 80 && n.push({ n: "Carrier", d: "Drives through midfield under pressure." })), (e === "CB" || e === "FB") && (s("Tackling") >= 82 && n.push({ n: "Tackle Machine", d: "Ferocious in the challenge." }), s("Heading") >= 82 && n.push({ n: "Aerial Dominator", d: "Set piece threat at both ends of the pitch." }), s("Passing") >= 78 && n.push({ n: "Distribution", d: "Comfortable on the ball, plays out from the back." }), e === "FB" && s("Speed") >= 80 && n.push({ n: "Overlap Merchant", d: "Creates width and overloads in wide areas." })), e === "GK" && (s("Reflexes") >= 82 && n.push({ n: "Reaction Royalty", d: "Makes saves that look impossible." }), s("Handling") >= 80 && n.push({ n: "Safe Hands", d: "Commanding under crosses." }), s("Speed") >= 72 && n.push({ n: "Sweeper Keeper", d: "Comfortable with the ball at their feet." }));
  const i = gi[e] || [];
  if (i.length && i.reduce((a, r) => a + s(r), 0) / i.length >= 83) {
    const a = t.Archetype || t.archetype || e;
    n.push({ n: `Complete ${a}`, d: "Exceptionally well-rounded — no significant weaknesses." });
  }
  return n.slice(0, 4);
}
function Dm(t, e, s) {
  if (!t || !t.Player || !t.Club) return [];
  const n = mh(), i = hc(t.Player, t.Club, s) ?? n, o = t.Nationality || "";
  return (e || []).filter((a) => a.Player !== t.Player && a.Position).slice(0, 12).map((a) => {
    const r = hc(a.Player, t.Club, s) ?? n, l = Math.min(i, r);
    if (l < 13) return null;
    const c = !!(o && o === (a.Nationality || "")), h = l >= 30 || c && l >= 25 ? "great" : "good", u = l >= 60 ? "Long-term" : l >= 30 ? "Established" : "Building";
    return { name: a.Player, pos: a.Position, weeks: l, category: h, label: u, sameNat: c };
  }).filter(Boolean).sort((a, r) => r.weeks - a.weeks);
}
function Rm(t, e) {
  if (!t || t.length < 2) return null;
  const s = t[0].Club;
  if (!s) return null;
  const n = mh(), i = t.map((r) => hc(r.Player, s, e) ?? n);
  let o = 0, a = 0;
  for (let r = 0; r < i.length; r++)
    for (let l = r + 1; l < i.length; l++)
      o += Math.min(i[r], i[l]) / 60, a++;
  return a ? Math.min(100, Math.round(o / a * 100)) : null;
}
function Cn(t) {
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
function dc(t) {
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
let fa = null;
async function gl() {
  return fa || (fa = (await fetch(Zw).then((e) => e.json())).token || null, fa);
}
const gs = location.hostname === "sf.ofersi15.workers.dev" ? "https://sf-cache.ofersi15.workers.dev/sf-cache" : "/sf-cache", ml = "https://sf-cache.ofersi15.workers.dev";
async function Mt(t, e = !1) {
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
async function is(t, e) {
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
async function of(t) {
  if (location.protocol !== "file:")
    try {
      await fetch(`${gs}/${t}`, { method: "DELETE", signal: AbortSignal.timeout(3e3) });
    } catch {
    }
}
const dC = {
  async loadYouth(t = !1) {
    var r, l, c, h, u, d, f;
    const e = "sf_youth_idx_v2";
    if (this.youthLoading) return;
    this.youthLoading = !0, this.youthLoaded = !1;
    const o = (p, g) => {
      this.youthCap = p.cap || {}, this.youthScouts = (p.scouts || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthAcademy = p.academy || [], this.youthFacilities = p.facilities || {}, this.youthStaff = p.staff || {}, this.youthRejected = (g || p.rejected || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthLoaded = !0, this.youthMsg = "", this.youthScouts.length ? this.youthSubTab = "scouts" : this.youthAcademy.length ? this.youthSubTab = "academy" : this.youthSubTab = "history";
    }, a = (p) => (p || []).map((g) => {
      const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"].filter((_) => this.getYouthAttr(g, _) > 0).length;
      return { ...g, _partial: m < 5 };
    });
    if (!t)
      try {
        let p = await Mt(e);
        p || (p = localStorage.getItem(e));
        const g = p ? JSON.parse(p) : null;
        if (g) {
          const m = Date.now(), _ = m - (g.savedAt || 0), y = m - (g.histSavedAt || 0), b = m - (g.staticSavedAt || 0), v = encodeURIComponent(Jt);
          if (o(g), this.youthLoading = !1, !(_ >= 6e5 || y >= 36e5 || b >= 36e5)) return;
          if (y < 36e5) {
            setTimeout(async () => {
              try {
                const S = _ >= 6e5, x = b >= 36e5, [k, P, F, E] = await Promise.all([
                  S ? fetch(`${it}/scouting/jobs?club=${v}`).then((I) => I.json()) : Promise.resolve(null),
                  S ? fetch(`${it}/academy?club=${v}`).then((I) => I.json()) : Promise.resolve(null),
                  x ? fetch(`${it}/facilities?club=${v}`).then((I) => I.json()) : Promise.resolve(null),
                  x ? fetch(`${it}/staff/effects?club=${v}`).then((I) => I.json()) : Promise.resolve(null)
                ]), C = {
                  ...g,
                  savedAt: S ? m : g.savedAt,
                  staticSavedAt: x ? m : g.staticSavedAt,
                  ...S ? { cap: k.cap || {}, scouts: k.items || [], academy: a(P.items) } : {},
                  ...x ? { facilities: F || {}, staff: (E && E.ok ? E.effects : {}) || {} } : {}
                };
                try {
                  localStorage.setItem(e, JSON.stringify(C));
                } catch {
                }
                o(C);
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
        M && (lc.forEach((T) => {
          M[T] != null && L[T] == null && (L[T] = M[T]);
        }), M.stats && lc.forEach((T) => {
          M.stats[T] != null && L[T] == null && (L[T] = M.stats[T]);
        }));
      }
      const x = a(w), k = (y.ok ? y.effects : {}) || {}, P = Date.now(), F = {
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
      is(e, JSON.stringify(F));
      try {
        localStorage.setItem(e, JSON.stringify(F));
      } catch {
      }
      o(F, b.items);
      for (const L of [...g.items || [], ...b.items || []]) {
        const D = (c = L.player) == null ? void 0 : c.stats;
        if (!D || !Object.keys(D).length) continue;
        const M = (L.player.name || L.player.Player || "").toLowerCase();
        if (!M) continue;
        const T = this.players.find((O) => (O.Name || O.name || "").toLowerCase() === M);
        T && T._incompleteStats && (Object.assign(T, D), T._incompleteStats = mn.filter((O) => T[O] != null && T[O] > 0).length < 5);
      }
      const E = mn, C = (L) => L && (E.filter((D) => L[D] != null && L[D] > 0).length >= 5 || L.stats && E.filter((D) => L.stats[D] != null && L.stats[D] > 0).length >= 5), I = (g.items || []).filter((L) => L.player && !C(L.player));
      if (I.length) {
        const L = [...new Set(I.map((T) => {
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
        const M = ef;
        for (const T of I) {
          const O = (((h = T.player) == null ? void 0 : h.club) || ((u = T.player) == null ? void 0 : u.Club) || "").toLowerCase(), V = D[O] || [], Y = (((d = T.player) == null ? void 0 : d.name) || ((f = T.player) == null ? void 0 : f.Player) || "").toLowerCase(), Z = V.find((et) => (et.Player || "").toLowerCase() === Y);
          Z && (M.forEach((et) => {
            Z[et] != null && (T.player[et] = Z[et]);
          }), Z.Rating && (T.player.rating = Z.Rating), Z.Value && (T.player.value = Z.Value), Z.Age && (T.player.age = Z.Age));
        }
        F.scouts = g.items || [], is(e, JSON.stringify(F));
        try {
          localStorage.setItem(e, JSON.stringify(F));
        } catch {
        }
        o(F, b.items);
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
      ), u = (c.clubs || []).filter((b) => h.has(b)), d = [], f = {}, p = 5;
      for (let b = 0; b < u.length; b += p) {
        const v = u.slice(b, b + p);
        this.youthHistMsg = `Scanning clubs ${Math.min(b + p, u.length)}/${u.length}…`, this.youthHistProgress = Math.round(Math.min(b + p, u.length) / u.length * 100), await Promise.all(v.map(async (w) => {
          const S = encodeURIComponent(w);
          try {
            const [x, k, P] = await Promise.all([
              fetch(`${it}/scouting/jobs?club=${S}&status=rejected`).then((L) => L.json()),
              fetch(`${it}/scouting/jobs?club=${S}`).then((L) => L.json()),
              fetch(`${it}/scouting/jobs?club=${S}&status=accepted`).then((L) => L.json())
            ]), F = (x.items || []).map((L) => ({ ...L, _jobStatus: L.status || "rejected" })), E = (k.items || []).map((L) => ({ ...L, _jobStatus: L.status || "active" })), C = (P.items || []).map((L) => ({ ...L, _jobStatus: "accepted" })), I = [...E, ...F, ...C];
            if (I.length > 0) {
              const [L, D] = await Promise.all([
                fetch(`${it}/facilities?club=${S}`).then((M) => M.json()).catch(() => ({})),
                fetch(`${it}/staff/effects?club=${S}`).then((M) => M.json()).catch(() => ({}))
              ]);
              I.forEach((M) => d.push({ ...M, _club: w })), f[w] = {
                facilities: L || {},
                staff: (D.ok ? D.effects : {}) || {}
              };
            }
          } catch {
          }
        })), await new Promise((w) => setTimeout(w, 80));
      }
      const g = mn, m = (b) => b && (g.filter((v) => b[v] != null && b[v] > 0).length >= 5 || b.stats && g.filter((v) => b.stats[v] != null && b.stats[v] > 0).length >= 5), _ = d.filter((b) => b.player && !m(b.player));
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
        const S = ef;
        for (const x of _) {
          const k = (((n = x.player) == null ? void 0 : n.club) || ((i = x.player) == null ? void 0 : i.Club) || "").toLowerCase(), P = v[k] || [], F = (((o = x.player) == null ? void 0 : o.name) || ((a = x.player) == null ? void 0 : a.Player) || "").toLowerCase(), E = P.find((C) => (C.Player || "").toLowerCase() === F);
          E && (S.forEach((C) => {
            E[C] != null && (x.player[C] = E[C]);
          }), E.Rating && (x.player.rating = E.Rating), E.Value && (x.player.value = E.Value), E.Age && (x.player.age = E.Age));
        }
      }
      try {
        localStorage.setItem(e, JSON.stringify({
          data: { jobs: d, clubInfo: f },
          ts: Date.now()
        }));
      } catch {
      }
      const y = d.filter((b) => {
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
      this.youthAllHistoryJobs = d.map((b) => ({ ...b, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 })), this.youthClubInfoMap = f, this.youthHistLoaded = !0, this.youthHistCacheDate = (/* @__PURE__ */ new Date()).toLocaleString(), this.youthHistMsg = "";
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
        const o = encodeURIComponent(Jt), a = Date.now();
        let r = null;
        try {
          r = JSON.parse(localStorage.getItem(s) || "null");
        } catch {
        }
        const l = a - ((r == null ? void 0 : r.savedAt) || 0), c = a - ((r == null ? void 0 : r.staticSavedAt) || 0), h = l >= n, u = c >= i;
        if (!h && !u) return;
        const [d, f, p, g] = await Promise.all([
          h ? fetch(`${it}/scouting/jobs?club=${o}`).then((m) => m.json()) : Promise.resolve(null),
          h ? fetch(`${it}/academy?club=${o}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/facilities?club=${o}`).then((m) => m.json()) : Promise.resolve(null),
          u ? fetch(`${it}/staff/effects?club=${o}`).then((m) => m.json()) : Promise.resolve(null)
        ]);
        if (h && d && (this.youthCap = d.cap || this.youthCap, this.youthScouts = (d.items || []).map((m) => ({ ...m, _refreshed: !1, _refreshing: !1, _refreshFailed: !1 }))), h && f) {
          const m = ["Speed", "Passing", "Stamina", "Heading", "Tackling", "Marking", "Handling", "Reflexes", "Vision", "Dribbling", "Shooting"];
          this.youthAcademy = (f.items || []).map((_) => {
            const y = m.filter((b) => this.getYouthAttr(_, b) > 0).length;
            return { ..._, _partial: y < 5 };
          });
        }
        u && p && (this.youthFacilities = p || {}), u && g && (this.youthStaff = (g.ok ? g.effects : {}) || {}), this.youthBgLastRefresh = (/* @__PURE__ */ new Date()).toLocaleTimeString();
        try {
          const m = {
            ...r || {},
            ...h ? { savedAt: a, cap: (d == null ? void 0 : d.cap) || {}, scouts: (d == null ? void 0 : d.items) || [], academy: this.youthAcademy } : {},
            ...u ? { staticSavedAt: a, facilities: p || {}, staff: this.youthStaff } : {}
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
      let d;
      for (let f = 0; f < 3; f++) {
        f > 0 && await e(1e3 * f);
        try {
          const p = await fetch(h, { method: "POST", body: u, signal: AbortSignal.timeout(15e3) });
          if (p.ok) return !0;
          d = `HTTP ${p.status}: ${await p.text().catch(() => "")}`;
        } catch (p) {
          d = `${p.name}: ${p.message}`;
        }
      }
      return d;
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
        this.matchArchiveProgress = Math.round(M / u.length * 20), this.matchArchiveMsg = `Pass 1: ${Math.min(M + 10, u.length)}/${u.length} clubs · ${h.size} fixtures`, await Promise.all(T.map(async (O) => {
          try {
            const V = await fetch(`${it}/matches?club=${encodeURIComponent(O)}&limit=200`).then((Z) => Z.json());
            let Y = 0;
            for (const Z of (V == null ? void 0 : V.matches) || [])
              Z.fixtureId && !h.has(Z.fixtureId) && (h.set(Z.fixtureId, Z), Y++);
            Y && t(`${O}: +${Y} (${h.size} total)`);
          } catch (V) {
            t(`ERROR ${O}: ${V.message}`);
          }
        })), await e(50);
      }
      t(`Pass 1 done: ${h.size} unique fixtures`);
      const d = Array.from(h.keys()), f = /* @__PURE__ */ new Map();
      for (const M of Object.keys(this.matchChunks))
        for (const T of this.matchChunks[M] || []) f.set(T.fixtureId, T);
      const p = d.filter((M) => !f.has(M)), g = d.filter((M) => f.has(M)).map((M) => f.get(M));
      t(`Pass 2: ${p.length} new fixtures to fetch, ${g.length} reused from cache`);
      let m = 0;
      for (let M = 0; M < p.length; M += 25) {
        const T = p.slice(M, M + 25);
        this.matchArchiveProgress = 20 + Math.round(M / Math.max(p.length, 1) * 40), this.matchArchiveMsg = `Pass 2: ${Math.min(M + 25, p.length)}/${p.length} new fixtures · ${m} errors`, await Promise.all(T.map(async (O) => {
          var V, Y;
          try {
            const Z = await fetch(`${it}/matches/${O}`).then((et) => et.json());
            if (Z != null && Z.match) {
              const et = Z.match;
              et._homeManager = this.extractManager(et.reportNarrative, ((V = et.home) == null ? void 0 : V.club) || ""), et._awayManager = this.extractManager(et.reportNarrative, ((Y = et.away) == null ? void 0 : Y.club) || ""), g.push(et);
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
            const V = await fetch(`${it}/submissions?club=${encodeURIComponent(O)}&limit=200`).then((Z) => Z.json()), Y = {};
            for (const Z of (V == null ? void 0 : V.items) || []) {
              const et = Z.gameweek ?? "upcoming";
              (!Y[et] || Z.createdAt > Y[et].createdAt) && (Y[et] = Z);
            }
            _[O] = Y;
          } catch (V) {
            y++, t(`SUB ERROR ${O}: ${V.message}`);
          }
        })), await e(50);
      }
      t(`Pass 3 done: ${Object.keys(_).length} clubs, ${y} errors`);
      for (const M of g) {
        const T = M.gameweek, O = T != null ? (r = _[(a = M.home) == null ? void 0 : a.club]) == null ? void 0 : r[T] : null, V = T != null ? (c = _[(l = M.away) == null ? void 0 : l.club]) == null ? void 0 : c[T] : null;
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
        for (const Y of M.xi) {
          const Z = (Y.name || Y.player || "").toLowerCase().trim(), et = S.get(Z);
          if (!et) continue;
          const dt = (Y.slot || "").replace(/\d+$/, "") || et.Position || "CM", lt = et.Position || dt, pt = Ln(et, lt);
          pt && (O.push(pt), w[dt] && T[w[dt]].push(pt));
        }
        return { overall: x(O), def: x(T.def), mid: x(T.mid), att: x(T.att) };
      }, P = { sub: 0, narr: 0, derived: 0, none: 0 }, F = (M, T, O, V) => {
        if (M != null && M.formation)
          return P.sub++, M.formation;
        const Y = Di(this.extractFormation(T, O));
        if (Y)
          return P.narr++, Y;
        const Z = Di(this.deriveFormation(V));
        return Z ? (P.derived++, Z) : (P.none++, null);
      }, E = g.map((M) => {
        var V, Y, Z, et, dt, lt, pt, _t, K, q, U, ot, A, R, N, z, $, B, G, j, H, W, J, X, st, tt;
        const T = this.extractTactics(M.reportNarrative, (V = M.home) == null ? void 0 : V.club), O = this.extractTactics(M.reportNarrative, (Y = M.away) == null ? void 0 : Y.club);
        return {
          fixtureId: M.fixtureId,
          kickoff: M.kickoff,
          gameweek: M.gameweek,
          competition: M.competition,
          home: {
            club: (Z = M.home) == null ? void 0 : Z.club,
            formation: F((et = M.home) == null ? void 0 : et.sub, M.reportNarrative, (dt = M.home) == null ? void 0 : dt.club, (lt = M.ratings) == null ? void 0 : lt.home),
            mentality: ((K = (_t = (pt = M.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : K.mentality) || (T == null ? void 0 : T.mentality) || null,
            style: ((ot = (U = (q = M.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.style) || (T == null ? void 0 : T.style) || null,
            sqRtg: k((A = M.home) == null ? void 0 : A.sub)
          },
          away: {
            club: (R = M.away) == null ? void 0 : R.club,
            formation: F((N = M.away) == null ? void 0 : N.sub, M.reportNarrative, (z = M.away) == null ? void 0 : z.club, ($ = M.ratings) == null ? void 0 : $.away),
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
      const C = { builtAt: Date.now(), matchCount: g.length, gwCount: v.length, gameweeks: v, fmSrc: P, matches: E }, I = JSON.stringify(C);
      this.matchArchiveProgress = 84, this.matchArchiveMsg = `Saving index (${(I.length / 1024).toFixed(0)}KB)…`, t(`Saving index: ${(I.length / 1024).toFixed(0)}KB`);
      const L = await i(`${gs}/sf_match_archive_v3?permanent=1`, I);
      if (L !== !0) throw new Error(`Index save failed: ${L}`);
      t("Index saved OK");
      let D = 0;
      for (let M = 0; M < v.length; M++) {
        const T = v[M], O = b.get(T), V = JSON.stringify({ gw: T, matches: O });
        this.matchArchiveProgress = 84 + Math.round((M + 1) / v.length * 16), this.matchArchiveMsg = `Saving GW${T} (${O.length} matches, ${(V.length / 1024).toFixed(0)}KB)…`;
        const Y = await i(`${gs}/sf_match_archive_v3_gw_${T}?permanent=1`, V);
        Y === !0 ? t(`GW${T}: ${O.length} matches saved OK (${(V.length / 1024).toFixed(0)}KB)`) : (D++, t(`ERROR GW${T}: ${Y}`)), await e(30);
      }
      this.matchArchive = E, this.matchArchiveChunkCount = v.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.matchArchiveFmSrc = P, this.matchArchiveProgress = 100, D > 0 ? (this.matchArchiveMsg = `Done (${D} GW save errors) — ${g.length} matches`, t(`Build complete: ${g.length} matches, ${D} GW(s) failed`)) : (this.matchArchiveMsg = `Done — ${g.length} matches across ${v.length} gameweeks`, t(`Build complete: ${g.length} matches, ${v.length} GW chunks`));
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
      const l = new Set(this.matchArchive.map((C) => C.fixtureId)), c = Math.max(...this.matchArchive.map((C) => C._gw || 0).filter((C) => C > 0));
      t(`Archive has ${l.size} fixtures up to GW${c}`), this.appendGwMsg = "Scanning clubs for new fixtures…";
      const h = [...new Set(this.allPlayers.map((C) => C.Club).filter(Boolean))].sort(), u = /* @__PURE__ */ new Map();
      for (let C = 0; C < h.length; C += 10) {
        const I = h.slice(C, C + 10);
        this.appendGwProgress = Math.round(C / h.length * 30), this.appendGwMsg = `Scanning ${Math.min(C + 10, h.length)}/${h.length} clubs… ${u.size} new`, await Promise.all(I.map(async (L) => {
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
      const d = Array.from(u.keys()), f = [];
      let p = 0;
      for (let C = 0; C < d.length; C += 25) {
        const I = d.slice(C, C + 25);
        this.appendGwProgress = 30 + Math.round(C / d.length * 30), this.appendGwMsg = `Fetching ${Math.min(C + 25, d.length)}/${d.length} match details…`, await Promise.all(I.map(async (L) => {
          var D, M;
          try {
            const T = await fetch(`${it}/matches/${L}`).then((O) => O.json());
            if (T != null && T.match) {
              const O = T.match;
              O._homeManager = this.extractManager(O.reportNarrative, ((D = O.home) == null ? void 0 : D.club) || ""), O._awayManager = this.extractManager(O.reportNarrative, ((M = O.away) == null ? void 0 : M.club) || ""), f.push(O);
            } else
              p++;
          } catch (T) {
            p++, t(`ERROR fixture ${L}: ${T.message}`);
          }
        })), await e(30);
      }
      t(`Fetched ${f.length} full matches, ${p} errors`);
      const g = [...new Set(f.map((C) => C.gameweek).filter((C) => C != null))];
      t(`New GWs: ${g.join(", ")}`), this.appendGwMsg = "Fetching submissions for new GWs…";
      const m = [...new Set(f.flatMap((C) => {
        var I, L;
        return [(I = C.home) == null ? void 0 : I.club, (L = C.away) == null ? void 0 : L.club];
      }).filter(Boolean))], _ = {};
      for (let C = 0; C < m.length; C += 10) {
        const I = m.slice(C, C + 10);
        this.appendGwProgress = 60 + Math.round(C / m.length * 20), this.appendGwMsg = `Submissions: ${Math.min(C + 10, m.length)}/${m.length} clubs…`, await Promise.all(I.map(async (L) => {
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
      for (const C of f) {
        const I = C.gameweek, L = I != null ? (o = _[(i = C.home) == null ? void 0 : i.club]) == null ? void 0 : o[I] : null, D = I != null ? (r = _[(a = C.away) == null ? void 0 : a.club]) == null ? void 0 : r[I] : null;
        L && (C.home.sub = { formation: L.formation, instructions: L.instructions, roles: L.roles, xi: L.xi, runs: L.runs }), D && (C.away.sub = { formation: D.formation, instructions: D.instructions, roles: D.roles, xi: D.xi, runs: D.runs });
      }
      const y = new Map(this.allPlayers.map((C) => [(C.Player || "").toLowerCase().trim(), C])), b = (C) => C.length ? Math.round(C.reduce((I, L) => I + L, 0) / C.length * 10) / 10 : null, v = { CB: "def", FB: "def", DM: "mid", CM: "mid", WM: "mid", AM: "att", WF: "att", CF: "att" }, w = (C) => {
        var D;
        if (!((D = C == null ? void 0 : C.xi) != null && D.length)) return null;
        const I = { def: [], mid: [], att: [] }, L = [];
        for (const M of C.xi) {
          const T = (M.name || M.player || "").toLowerCase().trim(), O = y.get(T);
          if (!O) continue;
          const V = (M.slot || "").replace(/\d+$/, "") || O.Position || "CM", Y = Ln(O, O.Position || V);
          Y && (L.push(Y), v[V] && I[v[V]].push(Y));
        }
        return { overall: b(L), def: b(I.def), mid: b(I.mid), att: b(I.att) };
      }, S = f.map((C) => {
        var M, T, O, V, Y, Z, et, dt, lt, pt, _t, K, q, U, ot, A, R, N, z, $, B, G, j, H, W, J;
        const I = this.extractTactics(C.reportNarrative, (M = C.home) == null ? void 0 : M.club), L = this.extractTactics(C.reportNarrative, (T = C.away) == null ? void 0 : T.club), D = (X, st, tt) => {
          if (X != null && X.formation) return Di(X.formation);
          const ht = Di(this.extractFormation(C.reportNarrative, st));
          return ht || Di(this.deriveFormation(tt)) || null;
        };
        return {
          fixtureId: C.fixtureId,
          kickoff: C.kickoff,
          gameweek: C.gameweek,
          competition: C.competition,
          home: { club: (O = C.home) == null ? void 0 : O.club, formation: D((V = C.home) == null ? void 0 : V.sub, (Y = C.home) == null ? void 0 : Y.club, (Z = C.ratings) == null ? void 0 : Z.home), mentality: ((lt = (dt = (et = C.home) == null ? void 0 : et.sub) == null ? void 0 : dt.instructions) == null ? void 0 : lt.mentality) || (I == null ? void 0 : I.mentality) || null, style: ((K = (_t = (pt = C.home) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) == null ? void 0 : K.style) || (I == null ? void 0 : I.style) || null, sqRtg: w((q = C.home) == null ? void 0 : q.sub) },
          away: { club: (U = C.away) == null ? void 0 : U.club, formation: D((ot = C.away) == null ? void 0 : ot.sub, (A = C.away) == null ? void 0 : A.club, (R = C.ratings) == null ? void 0 : R.away), mentality: (($ = (z = (N = C.away) == null ? void 0 : N.sub) == null ? void 0 : z.instructions) == null ? void 0 : $.mentality) || (L == null ? void 0 : L.mentality) || null, style: ((j = (G = (B = C.away) == null ? void 0 : B.sub) == null ? void 0 : G.instructions) == null ? void 0 : j.style) || (L == null ? void 0 : L.style) || null, sqRtg: w((H = C.away) == null ? void 0 : H.sub) },
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
      for (const C of f) {
        const I = C.gameweek ?? 0;
        x.has(I) || x.set(I, []), x.get(I).push(C);
      }
      for (const [C, I] of x) {
        let L = [];
        if (this.matchChunks[C]) L = this.matchChunks[C];
        else
          try {
            const O = await Mt(`sf_match_archive_v3_gw_${C}`);
            O && (L = JSON.parse(O).matches || []);
          } catch {
          }
        const D = new Set(L.map((O) => O.fixtureId)), M = [...L, ...I.filter((O) => !D.has(O.fixtureId))];
        this.matchChunks[C] = M;
        const T = JSON.stringify({ gw: C, matches: M });
        this.appendGwMsg = `Saving GW${C} chunk (${M.length} matches)…`, await s(`${gs}/sf_match_archive_v3_gw_${C}?permanent=1`, T), t(`GW${C} chunk saved: ${M.length} matches`);
      }
      this.appendGwProgress = 92, this.appendGwMsg = "Updating archive index…";
      const k = [...this.matchArchive, ...S], P = [...new Set(k.map((C) => C._gw).filter((C) => C > 0))].sort((C, I) => C - I), F = {
        builtAt: Date.now(),
        matchCount: k.length,
        gwCount: P.length,
        gameweeks: P,
        fmSrc: this.matchArchiveFmSrc || {},
        matches: k
      };
      if (await s(`${gs}/sf_match_archive_v3?permanent=1`, JSON.stringify(F)) !== !0) throw new Error("Index save failed");
      this.matchArchive = k, this.matchArchiveChunkCount = P.length, this.matchArchiveCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), this.analysisLoaded = !1, this.appendGwProgress = 100, this.appendGwMsg = `Done — added ${S.length} matches (GW${g.join(", GW")})`, t(`Append complete: +${S.length} matches across GW${g.join(", GW")}`);
    } catch (l) {
      this.appendGwMsg = "Error: " + (l.message || l), t(`FATAL: ${l.message || l}`);
    }
    this.appendGwBuilding = !1;
  },
  async loadMatchArchive() {
    var t;
    try {
      const e = await Mt("sf_match_archive_v3", !0);
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
        const n = await Mt(`sf_match_archive_v3_gw_${t}`);
        if (n) {
          const i = (await Cn(n)).matches || [];
          for (const o of i)
            o._homeManager = this.extractManager(o.reportNarrative, ((e = o.home) == null ? void 0 : e.club) || ""), o._awayManager = this.extractManager(o.reportNarrative, ((s = o.away) == null ? void 0 : s.club) || "");
          if (this.matchChunks[t] = i, this.matchArchive) {
            const o = new Map(i.map((a) => [a.fixtureId, a]));
            for (const a of this.matchArchive) {
              const r = o.get(a.fixtureId);
              r && (a._homeManager = r._homeManager, a._awayManager = r._awayManager);
            }
          }
        }
      } catch {
      }
  },
  async loadAnalysisChunks() {
    var o, a, r, l, c, h, u, d, f, p, g;
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
              b || (b = s(this.extractFormation(_.reportNarrative, (u = _[y]) == null ? void 0 : u.club))), b || (b = s(this.deriveFormation((d = _.ratings) == null ? void 0 : d[y]))), b && (m[y].formation = b, i++);
            }
            !m[y].mentality && ((g = (p = (f = _[y]) == null ? void 0 : f.sub) == null ? void 0 : p.instructions) != null && g.mentality) && (m[y].mentality = _[y].sub.instructions.mentality);
          }
      }
    }
    this.analysisLoaded = !0, this.analysisLoading = !1, this.analysisMsg = `${e.length} matches with full tactical data · ${i} formations backfilled`;
  },
  async loadSubsDb() {
    if (this.subsDbLoading) return;
    this.subsDbLoading = !0, this.subsDbMsg = "Checking cache…";
    const t = await Mt("sf_submissions_db_v1");
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
    await is("sf_submissions_db_v1", JSON.stringify(s)), this.subsDb = s, this.subsDbLoaded = !0, this.subsDbLoading = !1, this.subsDbMsg = `Built · ${t.length} clubs`;
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
    var l, c, h, u, d, f, p, g, m, _, y;
    this.matchView = t, this.matchDetailLoading = !0;
    const e = t._gw ?? t.gameweek ?? 0;
    this.matchChunks[e] || await this.loadMatchChunk(e);
    const s = (l = this.matchChunks[e]) == null ? void 0 : l.find((b) => b.fixtureId === t.fixtureId);
    s && (this.matchView = s);
    const n = this.matchView;
    n._homeManager = this.extractManager(n.reportNarrative, ((c = n.home) == null ? void 0 : c.club) || ""), n._awayManager = this.extractManager(n.reportNarrative, ((h = n.away) == null ? void 0 : h.club) || "");
    const i = (d = (u = n.home) == null ? void 0 : u.sub) != null && d.formation ? this.fmtFormation(n.home.sub.formation) : null, o = (p = (f = n.away) == null ? void 0 : f.sub) != null && p.formation ? this.fmtFormation(n.away.sub.formation) : null, [a, r] = await Promise.all([
      i ? Promise.resolve(i) : this.getClubFormation((g = n.home) == null ? void 0 : g.club, e),
      o ? Promise.resolve(o) : this.getClubFormation((m = n.away) == null ? void 0 : m.club, e)
    ]);
    n._homeFormation = a || this.extractFormation(n.reportNarrative, (_ = n.home) == null ? void 0 : _.club) || n.ratings && this.deriveFormation(n.ratings.home), n._awayFormation = r || this.extractFormation(n.reportNarrative, (y = n.away) == null ? void 0 : y.club) || n.ratings && this.deriveFormation(n.ratings.away), this.matchDetailLoading = !1;
  }
}, pC = {
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
  fmtSubStatus: hC,
  fmtNegoDate: uC,
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
      let d = c * u, f = "formula";
      const p = (g, m) => {
        g > d && (d = g, f = m);
      };
      if ((o = a._transferHistory) != null && o.length) {
        const g = a._transferHistory.filter((m) => m.isReal).sort((m, _) => new Date(_.date) - new Date(m.date));
        if (g[0]) {
          const m = t - new Date(g[0].date).getTime();
          p(g[0].amount * (m < e ? 1 : m < s ? 0.9 : 0.8), "transfer");
        }
      }
      a._listingAsk && p(a._listingAsk, "listing");
      for (const g of l) {
        if (!g.amount || g.amount < 5e4) continue;
        const m = t - new Date(g.updatedAt || 0).getTime(), _ = m < e ? 1 : m < s ? 0.85 : 0.7;
        if (g.status === "accepted" ? p(g.amount * _, "deal") : g.status === "rejected" && p(g.amount * 1.15 * _, "rejected+15%"), g.history)
          for (const y of g.history)
            y.amount >= 5e4 && p(y.amount * 0.9 * _, "bid round");
      }
      if (d > 0) {
        const g = Math.round(d / 5e5) * 5e5 || Math.round(d / 1e5) * 1e5 || Math.round(d);
        i[r] = { v: g, src: f };
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
      const t = await Mt("sf_negos_last_pull");
      if (!t) return;
      const e = parseInt(t, 10);
      if (!this.negosLastPull || e > this.negosLastPull) {
        const s = await Mt("sf_negos_history_v1");
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
          Mt("sf_leverkusen_fin_v1", !0),
          Mt("sf_auctions_v1", !0)
        ]);
        if (s) {
          const o = JSON.parse(s);
          o.budget && (this.clubBudget = o.budget);
        }
        n && this._applyAuctionData(JSON.parse(n));
        const i = await Mt("sf_all_budgets_v1", !0);
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
      is("sf_leverkusen_fin_v1", JSON.stringify({ budget: t, ts: Date.now() }));
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
        Mt("sf_auctions_v1"),
        Mt("sf_all_budgets_v1")
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
      const t = await Mt("sf_worker_log");
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
    const e = "sf_espionage_v3", s = nC;
    if (!t)
      try {
        let n = await Mt(e);
        n || (n = localStorage.getItem(e));
        const i = n ? await Cn(n) : null;
        if (i) {
          this.espionageClubs = i.clubs || [];
          let o = i.negos || [];
          try {
            const a = await Mt("sf_negos_history_v1");
            if (a) {
              const r = JSON.parse(a), l = new Map(o.map((c) => [c.id, c]));
              r.forEach((c) => l.set(c.id, c)), o = [...l.values()].sort((c, h) => new Date(h.updatedAt || 0) - new Date(c.updatedAt || 0));
            }
          } catch {
          }
          this.espionageNegos = o, this.espionageCacheDate = new Date(i.savedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), Mt("sf_negos_last_pull").then((a) => {
            a && (this.negosLastPull = parseInt(a, 10));
          }).catch(() => {
          }), Mt("sf_leverkusen_fin_v1").then((a) => {
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
        const h = await Mt("sf_negos_history_v1");
        if (h)
          a = JSON.parse(h);
        else {
          const u = await fetch(`${it}/negotiations`).then((f) => f.json());
          a = (Array.isArray(u) ? u : u.negotiations || u.items || []).map((f) => ({
            id: f.id,
            playerName: f.playerName,
            buyer: f.buyer || f.toClub,
            seller: f.seller || f.fromClub,
            amount: f.amount,
            status: f.status,
            subStatus: f.subStatus,
            via: f.via,
            lastActionBy: f.lastActionBy,
            history: f.history || [],
            createdAt: f.createdAt,
            updatedAt: f.updatedAt || f.ts
          })).sort((f, p) => new Date(p.updatedAt || 0) - new Date(f.updatedAt || 0)), is("sf_negos_history_v1", JSON.stringify(a));
        }
      } catch {
      }
      const r = [], l = 8;
      for (let h = 0; h < i.length; h += l) {
        const u = i.slice(h, h + l), d = await Promise.all(u.map(async (f) => {
          const p = encodeURIComponent(f);
          try {
            const [g, m] = await Promise.all([
              fetch(`${it}/staff?club=${p}`).then((_) => _.json()).catch(() => ({})),
              fetch(`${it}/facilities?club=${p}`).then((_) => _.json()).catch(() => ({}))
            ]);
            return {
              club: f,
              current: g.current || {},
              ads: g.openAds || [],
              levels: m.levels || {},
              project: m.project || null
            };
          } catch {
            return { club: f, current: {}, ads: [], levels: {}, project: null };
          }
        }));
        r.push(...d), this.espionageProgress = Math.min(99, Math.round((h + l) / o * 100)), await new Promise((f) => setTimeout(f, 0));
      }
      this.espionageClubs = r, this.espionageNegos = a, this.espionageCacheDate = (/* @__PURE__ */ new Date()).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }), Mt("sf_negos_last_pull").then((h) => {
        h && (this.negosLastPull = parseInt(h, 10));
      }).catch(() => {
      }), Mt("sf_leverkusen_fin_v1").then((h) => {
        if (h) {
          const u = JSON.parse(h);
          this.clubBudget = u.budget, this.clubWageBudget = u.wage;
        }
      }).catch(() => {
      }), this.loadAuctionData();
      const c = JSON.stringify({ savedAt: Date.now(), clubs: r, negos: a });
      is(e, c);
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
}, gC = {
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
    const e = String(t.formation || "").replace(/-/g, ""), s = aC[e];
    if (!s) return [];
    const n = t.xi.map((r, l) => {
      const c = s[l] || { x: 50, y: 50 }, h = r.slot || (gh[e] || [])[l] || "CM", u = this.basePos(r.position || h), d = nf[u] || nf.CM;
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
    }), i = {}, o = n.map((r) => {
      const l = r.slotType;
      return i[l] = (i[l] || 0) + 1, `${l}${i[l]}`;
    });
    return n.map((r, l) => {
      var p;
      const c = o[l], u = (((p = t.runs) == null ? void 0 : p[c]) || [])[0] || null, f = (parseInt(c.replace(/\D/g, "")) || 1) % 2 === 0;
      return {
        ...r,
        slotKey: c,
        runX: u !== null ? u.x / 90 * 68 : null,
        runY: u !== null ? f ? 105 - u.y / 100 * 105 : (u.y - 27.5) / 95 * 105 : null
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
                manager: i === "home" ? n._homeManager : n._awayManager,
                formation: this.extractFormation(n.reportNarrative, o) || this.deriveFormation(n.ratings[i]),
                starters: a
              };
            }
          }
    this.clubLineups = t, this.clubLineupsLoaded = !0;
  },
  // Format a formation code like "4231" → "4-2-3-1"
  fmtFormation: cC,
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
      const t = localStorage.getItem(da);
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
      const t = await Mt(Zd);
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
      const o = Object.values(this.submissionsCache[n] || {}).sort((a, r) => (r.submittedAt || 0) - (a.submittedAt || 0))[0];
      o && (e[n] = o);
    }
    this.espionageSubmissions = e, this.allSubmissionsLoaded = !0;
    const s = { builtAt: Date.now(), clubs: this.submissionsCache };
    try {
      localStorage.setItem(da, JSON.stringify(s));
    } catch {
    }
    dc(s).then((n) => is(Zd, n)).catch(() => {
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
      const e = localStorage.getItem(da), s = e ? JSON.parse(e) : { clubs: {} };
      s.clubs[t] = this.submissionsCache[t] || {}, localStorage.setItem(da, JSON.stringify(s));
    } catch {
    }
    this._fetchClubInfo(t);
  },
  async _fetchClubInfo(t) {
    var e, s, n;
    if (!((e = this.clubInfoCache[t]) != null && e.loaded)) {
      this.clubInfoCache = { ...this.clubInfoCache, [t]: { loading: !0 } };
      try {
        const i = encodeURIComponent(t), [o, a, r, l, c] = await Promise.all([
          fetch(`${it}/facilities?club=${i}`).then((f) => f.json()).catch(() => ({})),
          fetch(`${it}/staff/effects?club=${i}`).then((f) => f.json()).catch(() => ({})),
          fetch(`${it}/academy?club=${i}`).then((f) => f.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}`).then((f) => f.json()).catch(() => ({})),
          fetch(`${it}/scouting/jobs?club=${i}&status=accepted`).then((f) => f.json()).catch(() => ({}))
        ]), h = r.items || [], u = {};
        for (const f of c.items || []) {
          const p = (((s = f.player) == null ? void 0 : s.name) || ((n = f.player) == null ? void 0 : n.Player) || "").toLowerCase();
          p && (u[p] = f.player);
        }
        const d = ["Speed", "Passing", "Marking", "Heading", "Tackling", "Stamina", "Dribbling", "Shooting", "Handling", "Reflexes", "Strength", "Vision", "Mentality", "Experience"];
        for (const f of h) {
          const p = u[(f.name || f.Player || "").toLowerCase()];
          p && d.forEach((g) => {
            var m;
            p[g] != null && f[g] == null && (f[g] = p[g]), ((m = p.stats) == null ? void 0 : m[g]) != null && f[g] == null && (f[g] = p.stats[g]);
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
    this.mySubmissionLoading = !0, await this._fetchClubSubmissions(Jt);
    const t = this.submissionsCache[Jt] || {}, e = Object.keys(t).map(Number).sort((s, n) => n - s).slice(0, 3);
    this.mySubmissions = e.map((s) => t[s]), this.mySubmissionLoading = !1;
  },
  extractManager(t, e) {
    const n = (Array.isArray(t) ? t : [t || ""]).filter((c) => typeof c == "string" && c.startsWith("Pre-match")).join(" ");
    if (!n) return null;
    const i = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = "[A-ZÀ-ÖØ-Ý][\\wÀ-ÿ]*", a = `(${o}(?:[ -]${o})*)`;
    let r = n.match(new RegExp(`${a}[’']s ${i}\\b`));
    if (r) return r[1];
    const l = /^(?:Pre|Half|Full|The|An?|From|In|At|By|It|As|But|And|Or)\b/;
    return r = n.match(new RegExp(`${a}[^.]{2,40}?\\b${i}\\b`)), r && !l.test(r[1]) ? r[1] : null;
  },
  matchResultFor(t, e) {
    var r, l, c;
    const s = ((r = t.home) == null ? void 0 : r.club) === e, n = ((l = t.score) == null ? void 0 : l.home) ?? 0, i = ((c = t.score) == null ? void 0 : c.away) ?? 0, o = s ? n : i, a = s ? i : n;
    return o > a ? "W" : o < a ? "L" : "D";
  }
}, mC = {
  async openModal(t, e = null) {
    if (this.selectedPlayer = t, this.highlightedPos = null, this.selectedJobCtx = e || null, this.negoShowAllModal = !1, this.selectedPlayerStats = null, this.selectedPlayerStatsTab = "career", this.selectedPlayerStatsLoading = !0, this.playerModalTab = "overview", this.espionageNegos.length === 0)
      try {
        const s = await Mt("sf_negos_history_v1");
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
      let e = await Mt(zn);
      const s = e ? "server" : "localStorage";
      if (e || (e = localStorage.getItem(zn)), e) {
        console.log(`[SF] ${s} read:`, Math.round(performance.now() - t) + "ms,", Math.round(e.length / 1024) + "KB");
        const n = performance.now(), { players: i, meta: o, ts: a } = await Cn(e);
        if (console.log("[SF] parseAsync players:", Math.round(performance.now() - n) + "ms,", i == null ? void 0 : i.length, "players"), i != null && i.length) {
          this.leagueTables = o.leagueTables || {}, this.asOfWeek = o.asOfWeek || "?", this.totalClubs = o.totalClubs || 0, this.managedSet = new Set(o.managedClubs || []), Mt("sf_vacancies_v1").then((u) => {
            if (u)
              try {
                const { clubs: d } = JSON.parse(u);
                this.vacantClubs = new Set(d || []);
              } catch {
              }
          }).catch(() => {
          });
          const r = {};
          to.forEach((u) => (this.leagueTables[u] || []).forEach((d) => {
            r[d.Team] = u;
          })), i.forEach((u) => {
            if (u._league = fl.has(u.Club) ? "other" : r[u.Club] || u._league || "world", u._gameRating = Ln(u, u.Position), u._weightedRating = So(u, u.Position, tf, 20), u._incompleteStats = mn.filter((d) => u[d] != null && u[d] > 0).length < 5, u._g90 === void 0) {
              const d = u.Minutes || 0;
              u._g90 = d >= 30 ? Math.round((u.Goals || 0) / d * 90 * 100) / 100 : null, u._a90 = d >= 30 ? Math.round((u.Assists || 0) / d * 90 * 100) / 100 : null, u._xG90 = d >= 30 && u.xG != null ? Math.round(u.xG / d * 90 * 100) / 100 : null, u._xA90 = d >= 30 && u.xA != null ? Math.round(u.xA / d * 90 * 100) / 100 : null;
            }
            if (u.DOB) {
              const d = new Date(u.DOB), f = /* @__PURE__ */ new Date(), p = (f - d) / (365.25 * 24 * 3600 * 1e3);
              if (u._u21 = p < 21, u._u20 = p < 20, p >= 20 && p < 21) {
                const g = new Date(d.getFullYear() + 21, d.getMonth(), d.getDate());
                u._weeksTo21 = Math.ceil((g - f) / (7 * 24 * 3600 * 1e3));
              } else
                u._weeksTo21 = null;
            } else
              u._u21 = (u.Age || 99) < 21, u._u20 = (u.Age || 99) < 20;
          });
          const l = performance.now();
          i.forEach((u) => Object.freeze(u)), console.log("[SF] Object.freeze:", Math.round(performance.now() - l) + "ms");
          const c = performance.now();
          this.allPlayers = i, console.log("[SF] Vue allPlayers set:", Math.round(performance.now() - c) + "ms"), this.playersCacheDate = new Date(a).toLocaleDateString(), this.progress = 100, this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache(), Date.now() - a > eC ? (this.playersRefreshing = !0, this.fetchFreshData(!1)) : (fetch(`${it}/tables/from-fixtures`).then((u) => u.json()).then((u) => {
            var f;
            const d = (f = u == null ? void 0 : u.meta) == null ? void 0 : f.asOfWeek;
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
      let t = await Mt(Hn);
      if (t || (t = localStorage.getItem(Hn)), t) {
        const { ts: e } = JSON.parse(t);
        this.tacticsCacheDate = new Date(e).toLocaleDateString();
      }
    } catch {
    }
  },
  clearPlayersCache() {
    of(zn), of("sf_squads_raw_v1");
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
        let i = await Mt(ua);
        if (i || (i = localStorage.getItem(ua)), i) {
          console.log("[SF] stats cache:", Math.round(i.length / 1024) + "KB");
          const o = performance.now(), { statsMap: a, ts: r } = await Cn(i);
          if (console.log("[SF] parseAsync stats:", Math.round(performance.now() - o) + "ms"), a) {
            let l = 0;
            const c = this.allPlayers.map((h) => {
              const u = a[(h.Player || "").toLowerCase()];
              return u ? (l++, Object.freeze({ ...h, ...u })) : h;
            });
            if (l > 0) {
              await new Promise((u) => requestAnimationFrame(u)), this.allPlayers = c, this.statsEnriched = !0, Date.now() - r > sC && setTimeout(() => this.enrichStats(!0), 3e3);
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
          const d = u || {}, f = d.minutes || 0, p = {
            ...c,
            Games: d.games || 0,
            Minutes: f,
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
            _g90: f >= 30 ? Math.round((d.goals || 0) / f * 90 * 100) / 100 : null,
            _a90: f >= 30 ? Math.round((d.assists || 0) / f * 90 * 100) / 100 : null,
            _xG90: f >= 30 && d.xG != null ? Math.round(d.xG / f * 90 * 100) / 100 : null,
            _xA90: f >= 30 && d.xA != null ? Math.round(d.xA / f * 90 * 100) / 100 : null
          };
          e[(a.Player || "").toLowerCase()] = p;
        } catch {
        }
      })), this.statsProgress = Math.round((i + n) / s.length * 100), await new Promise((a) => setTimeout(a, 50));
    }
    this.allPlayers = this.allPlayers.map((i) => {
      const o = e[(i.Player || "").toLowerCase()];
      return o ? Object.freeze({ ...i, ...o }) : i;
    }), dc({ statsMap: e, ts: Date.now() }).then((i) => {
      is(ua, i);
      try {
        localStorage.setItem(ua, i);
      } catch {
      }
    }).catch(() => {
    }), this.statsEnriching = !1, this.statsEnriched = !0, this.statsProgress = 100;
  },
  async fetchFreshData(t = !0) {
    var e, s;
    try {
      t && (this.loadMsg = "Fetching leagues & managers…", this.progress = 5);
      const [n, i, o] = await Promise.all([
        fetch(`${it}/tables/from-fixtures`).then((g) => g.json()),
        fetch(`${it}/managers`).then((g) => g.json()),
        fetch(`${it}/admin/squads/public/clubs`).then((g) => g.json())
      ]);
      this.leagueTables = n, this.asOfWeek = ((e = n.meta) == null ? void 0 : e.asOfWeek) || "?";
      const a = {};
      to.forEach((g) => (n[g] || []).forEach((m) => {
        a[m.Team] = g;
      }));
      const r = (i.managers || []).filter((g) => {
        var m;
        return g.club && !((m = g.username) != null && m.includes("~deleted~"));
      }), l = new Set(r.map((g) => g.club)), c = {};
      r.forEach((g) => {
        c[g.club] = g.username || g.name || "?";
      }), this.managedSet = l, this.managerMap = c;
      try {
        const g = await Mt("sf_vacancies_v1");
        if (g) {
          const { clubs: m } = JSON.parse(g);
          this.vacantClubs = new Set(m || []);
        } else
          this.vacantClubs = new Set([...o.clubs].filter((m) => !l.has(m) && !fl.has(m)));
      } catch {
        this.vacantClubs = /* @__PURE__ */ new Set();
      }
      const h = o.clubs;
      this.totalClubs = h.length;
      const u = /* @__PURE__ */ new Set(), d = [];
      let f = null;
      try {
        const g = await Mt("sf_squads_raw_v1");
        if (g) {
          const { data: m, ts: _ } = JSON.parse(g), y = (Date.now() - _) / 36e5;
          y < 24 && (f = m, console.log(`[SF] using pre-fetched squads cache (${y.toFixed(1)}h old)`));
        }
      } catch {
      }
      const p = (g, m) => {
        (m || []).forEach((_) => {
          const y = `${_.Player}|${_.Club || g}`;
          if (u.has(y)) return;
          u.add(y), _.Club = _.Club || g, _._league = fl.has(_.Club) ? "other" : a[_.Club] || "world", _._managed = l.has(_.Club), _._gameRating = Ln(_, _.Position), _._weightedRating = So(_, _.Position, tf, 20), _._estValue = rC(_), _._incompleteStats = mn.filter((v) => _[v] != null && _[v] > 0).length < 5;
          const b = _.Minutes || 0;
          if (_._g90 = b >= 30 ? Math.round((_.Goals || 0) / b * 90 * 100) / 100 : null, _._a90 = b >= 30 ? Math.round((_.Assists || 0) / b * 90 * 100) / 100 : null, _._xG90 = b >= 30 && _.xG != null ? Math.round(_.xG / b * 90 * 100) / 100 : null, _._xA90 = b >= 30 && _.xA != null ? Math.round(_.xA / b * 90 * 100) / 100 : null, _.DOB) {
            const v = new Date(_.DOB), w = /* @__PURE__ */ new Date(), S = (w - v) / (365.25 * 24 * 3600 * 1e3);
            if (_._u21 = S < 21, _._u20 = S < 20, S >= 20 && S < 21) {
              const x = new Date(v.getFullYear() + 21, v.getMonth(), v.getDate());
              _._weeksTo21 = Math.ceil((x - w) / (7 * 24 * 3600 * 1e3));
            }
          } else
            _._u21 = (_.Age || 99) < 21, _._u20 = (_.Age || 99) < 20;
          d.push(_);
        });
      };
      if (f)
        t && (this.loadMsg = "Loading squads from cache…", this.progress = 50), h.forEach((g) => {
          var m;
          return p(g, ((m = f[g]) == null ? void 0 : m.players) || f[g] || []);
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
        }), d.forEach((S) => {
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
      dc({
        players: d,
        meta: { leagueTables: n, asOfWeek: this.asOfWeek, totalClubs: h.length, managedClubs: [...l] },
        ts: Date.now()
      }).then((g) => {
        is(zn, g);
        try {
          localStorage.setItem(zn, g), this.cacheWorking = !0;
        } catch (m) {
          console.warn("Cache write failed:", m), this.cacheWorking = !1;
        }
      }).catch((g) => console.warn("stringifyAsync failed:", g)), d.forEach((g) => Object.freeze(g)), this.allPlayers = d, this.playersCacheDate = (/* @__PURE__ */ new Date()).toLocaleDateString(), this.playersRefreshing = !1, t && (this.progress = 100, this.loadMsg = "Done!", this.loaded = !0, this.buildBookmarklet(), this.checkTacticsCache()), setTimeout(() => this.enrichStats(), 800), t && (setTimeout(() => {
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
      this.activeChartDef = { title: "True Market Value vs Rating", desc: "Top-right = most expensive and best. Outliers in top-left = overpriced; bottom-right = potential bargains.", listLabel: "Highest Value", listFmt: (i) => Tm(i._estValue), listColor: "#ffa657" }, this.charts[t] = new Chart(e, {
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
      const n = { north: "#79c0ff", south: "#7ee787", europa: "#d2a8ff", world: "#ffa657", conference: "#ff7b72", hipster: "#39d353", other: "#8b949e" }, i = to.map((o) => ({
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
    var v, w, S;
    if (!t)
      try {
        let x = await Mt(Hn);
        if (x || (x = localStorage.getItem(Hn)), x) {
          const { data: k, ts: P } = JSON.parse(x);
          if (Date.now() - P < tC) {
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
    const i = [...n], o = /\b(\d-\d[-\d]*)\b/, a = {}, r = {}, l = {}, c = {}, h = { W: 0, D: 0, L: 0, n: 0, gf: 0, ga: 0 };
    let u = 0, d = 0;
    const f = (x) => {
      const k = x.toLowerCase();
      return k.includes("tiki") ? "Tiki-taka" : k.includes("counter") ? "Counter" : k.includes("relentless") || k.includes("press") ? "Pressing" : k.includes("direct") ? "Direct" : k.includes("attack") ? "Attacking" : k.includes("defen") ? "Defensive" : k.includes("fluid") ? "Fluid" : k.includes("rigid") ? "Rigid" : k.charAt(0).toUpperCase() + k.slice(1);
    };
    for (let x = 0; x < i.length; x++) {
      this.tacticsProgress = 10 + Math.round(88 * (x + 1) / i.length), this.tacticsMsg = `Analysing match reports… ${x + 1}/${i.length}`;
      try {
        const P = (await fetch(`${it}/matches/${i[x]}`).then((I) => I.json())).match;
        if (!P) continue;
        d++;
        const F = P.events || [], E = (v = P.home) == null ? void 0 : v.club, C = (w = P.away) == null ? void 0 : w.club;
        [{ side: "home", club: E }, { side: "away", club: C }].forEach(({ side: I, club: L }) => {
          var dt, lt, pt, _t;
          if (!L) return;
          const D = F.filter((K) => K.minute === 0 && K.type === "other" && K.team === L);
          let M = null, T = null;
          const O = (P.reportNarrative || []).slice(0, 3).join(" ");
          for (const K of D) {
            const q = K.description || "", U = q.match(/tiki[- ]?taka|counter[- ]?attack|\b(attacking|defensive|balanced|fluid|rigid|direct|pressing|relentless|compact|aggressive)\b/i);
            if (U && (T = f(U[0])), q.toLowerCase().includes(" in ")) {
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
          if (!M && O.toLowerCase().includes(L.toLowerCase())) {
            const q = O.match(/lined up[^.]*?(\d-\d[-\d]*)/i) || O.match(/in (?:an? )?[\w ]+?(\d-\d[-\d]*)/i);
            q && q[1].split("-").map(Number).reduce((ot, A) => ot + A, 0) >= 9 && (M = q[1]);
          }
          if (!M) return;
          u++;
          const V = I === "home", Y = V ? ((dt = P.score) == null ? void 0 : dt.home) || 0 : ((lt = P.score) == null ? void 0 : lt.away) || 0, Z = V ? ((pt = P.score) == null ? void 0 : pt.away) || 0 : ((_t = P.score) == null ? void 0 : _t.home) || 0, et = Y > Z ? "W" : Y < Z ? "L" : "D";
          a[M] || (a[M] = { formation: M, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0, styles: {} }), a[M][et]++, a[M].gf += Y, a[M].ga += Z, a[M].n++, T && (a[M].styles[T] = (a[M].styles[T] || 0) + 1), T && (r[T] || (r[T] = { style: T, W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), r[T][et]++, r[T].gf += Y, r[T].ga += Z, r[T].n++), L === Jt && (l[M] || (l[M] = { W: 0, D: 0, L: 0, gf: 0, ga: 0, n: 0 }), l[M][et]++, l[M].gf += Y, l[M].ga += Z, l[M].n++, h[et]++, h.gf += Y, h.ga += Z, h.n++, T && (c[T] = (c[T] || 0) + 1));
        });
      } catch {
      }
      await new Promise((k) => setTimeout(k, 60));
    }
    const p = Object.values(a).filter((x) => x.n >= 2).map((x) => {
      var P;
      const k = ((P = Object.entries(x.styles).sort((F, E) => E[1] - F[1])[0]) == null ? void 0 : P[0]) || "";
      return { ...x, topStyle: k, winPct: Math.round(100 * x.W / x.n), ppg: ((x.W * 3 + x.D) / x.n).toFixed(2), avgGF: (x.gf / x.n).toFixed(2), avgGA: (x.ga / x.n).toFixed(2) };
    }).sort((x, k) => k.n - x.n), g = Object.values(r).filter((x) => x.n >= 3).map((x) => ({ ...x, winPct: Math.round(100 * x.W / x.n), ppg: ((x.W * 3 + x.D) / x.n).toFixed(2), avgGF: (x.gf / x.n).toFixed(2), avgGA: (x.ga / x.n).toFixed(2) })).sort((x, k) => k.n - x.n), m = h.n > 0 ? {
      record: h,
      forms: Object.entries(l).sort((x, k) => k[1].n - x[1].n).map(([x, k]) => ({ formation: x, ...k, winPct: Math.round(100 * k.W / k.n) })),
      topStyle: ((S = Object.entries(c).sort((x, k) => k[1] - x[1])[0]) == null ? void 0 : S[0]) || null,
      styleBreakdown: c
    } : null, _ = { totalMatches: d, fixturesAnalysed: i.length, withFormation: u, formations: p, styles: g, myClubData: m };
    this.tacticsData = _;
    const y = Date.now();
    this.tacticsCacheDate = new Date(y).toLocaleDateString();
    const b = JSON.stringify({ data: _, ts: y });
    is(Hn, b);
    try {
      localStorage.setItem(Hn, b);
    } catch {
    }
    this.tacticsMsg = "Done!", this.tacticsProgress = 100, this.tacticsLoading = !1, this.tacticsLoaded = !0;
  }
}, yC = {
  getYouthAttr(t, e) {
    return t[e] != null && t[e] > 0 ? t[e] : t.stats && t.stats[e] != null && t.stats[e] > 0 ? t.stats[e] : null;
  },
  scoutPosRating(t, e) {
    const s = gi[e];
    if (!s) return null;
    const n = s.map((i) => this.getYouthAttr(t, i)).filter((i) => i != null);
    return n.length ? Math.round(n.reduce((i, o) => i + o, 0) / n.length * 10) / 10 : null;
  },
  scoutBestPos(t) {
    let e = null, s = -1;
    for (const n of Object.keys(gi)) {
      const i = this.scoutPosRating(t, n);
      i != null && i > s && (s = i, e = n);
    }
    return e ? { pos: e, rating: s } : null;
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
    const e = ((i = this.clubStaff) == null ? void 0 : i.openAds) || [], n = e.includes(t) ? e.filter((o) => o !== t) : [...e, t];
    this.staffAdsUpdating = !0;
    try {
      const a = { "Content-Type": "application/json", Authorization: `Bearer ${await gl()}`, "X-Club": Jt, "X-Role": "manager" }, l = await (await fetch(`${it}/staff/ads`, {
        method: "POST",
        headers: a,
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
        fetch(`${it}/fixtures/week`).then((o) => o.json())
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
}, bC = {
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
      t = t.filter((n) => (n._homeManager || "").toLowerCase().includes(s) || (n._awayManager || "").toLowerCase().includes(s));
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
    var g, m, _, y, b, v, w, S, x, k, P, F, E, C, I, L, D, M, T, O, V, Y, Z, et, dt, lt, pt, _t;
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
      const q = ((g = K.score) == null ? void 0 : g.home) ?? 0, U = ((m = K.score) == null ? void 0 : m.away) ?? 0, ot = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((y = (_ = K.stats) == null ? void 0 : _.xg) == null ? void 0 : y.home) || 0, N = ((v = (b = K.stats) == null ? void 0 : b.xg) == null ? void 0 : v.away) || 0, z = (((S = (w = K.home) == null ? void 0 : w.sqRtg) == null ? void 0 : S.overall) || 0) - (((k = (x = K.away) == null ? void 0 : x.sqRtg) == null ? void 0 : k.overall) || 0), $ = this.fmtFormation((P = K.home) == null ? void 0 : P.formation), B = this.fmtFormation((F = K.away) == null ? void 0 : F.formation), G = (E = K.home) == null ? void 0 : E.mentality, j = (C = K.away) == null ? void 0 : C.mentality;
      t(s, $ && B ? `${$} vs ${B}` : null, ot, q, U, R, N, z), t(s, $ && B ? `${B} vs ${$}` : null, A, U, q, N, R, -z), t(n, G && j ? `${G} vs ${j}` : null, ot, q, U, R, N, z), t(n, G && j ? `${j} vs ${G}` : null, A, U, q, N, R, -z);
    }
    const i = {}, o = {}, a = {}, r = {};
    for (const K of this.analysisMatches) {
      const q = ((I = K.score) == null ? void 0 : I.home) ?? 0, U = ((L = K.score) == null ? void 0 : L.away) ?? 0, ot = q > U ? "W" : q < U ? "L" : "D", A = U > q ? "W" : U < q ? "L" : "D", R = ((M = (D = K.stats) == null ? void 0 : D.xg) == null ? void 0 : M.home) || 0, N = ((O = (T = K.stats) == null ? void 0 : T.xg) == null ? void 0 : O.away) || 0, z = (((Y = (V = K.home) == null ? void 0 : V.sqRtg) == null ? void 0 : Y.overall) || 0) - (((et = (Z = K.away) == null ? void 0 : Z.sqRtg) == null ? void 0 : et.overall) || 0), $ = ((lt = (dt = K.home) == null ? void 0 : dt.sub) == null ? void 0 : lt.instructions) || {}, B = ((_t = (pt = K.away) == null ? void 0 : pt.sub) == null ? void 0 : _t.instructions) || {}, G = $.pressing_intensity, j = B.pressing_intensity, H = $.style, W = B.style, J = $.defensive_line, X = B.defensive_line, st = $.transition_speed, tt = B.transition_speed;
      t(i, G && W ? `${G} vs ${W}` : null, ot, q, U, R, N, z), t(i, j && H ? `${j} vs ${H}` : null, A, U, q, N, R, -z), t(o, H && j ? `${H} vs ${j}` : null, ot, q, U, R, N, z), t(o, W && G ? `${W} vs ${G}` : null, A, U, q, N, R, -z), t(a, J && tt ? `${J} vs ${tt}` : null, ot, q, U, R, N, z), t(a, X && st ? `${X} vs ${st}` : null, A, U, q, N, R, -z), t(r, st && X ? `${st} vs ${X}` : null, ot, q, U, R, N, z), t(r, tt && J ? `${tt} vs ${J}` : null, A, U, q, N, R, -z);
    }
    const l = this.matchArchive.length, c = this.matchArchive.filter((K) => {
      var q, U;
      return ((q = K.home) == null ? void 0 : q.formation) && ((U = K.away) == null ? void 0 : U.formation);
    }).length, h = this.matchArchive.filter((K) => {
      var q, U;
      return ((q = K.home) == null ? void 0 : q.mentality) && ((U = K.away) == null ? void 0 : U.mentality);
    }).length, u = this.analysisMatches.length, d = this.analysisMatches.filter((K) => {
      var q, U, ot, A, R, N;
      return ((ot = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.pressing_intensity) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.pressing_intensity);
    }).length, f = this.analysisMatches.filter((K) => {
      var q, U, ot, A, R, N;
      return ((ot = (U = (q = K.home) == null ? void 0 : q.sub) == null ? void 0 : U.instructions) == null ? void 0 : ot.defensive_line) || ((N = (R = (A = K.away) == null ? void 0 : A.sub) == null ? void 0 : R.instructions) == null ? void 0 : N.defensive_line);
    }).length, p = this.analysisMatches.filter((K) => {
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
      coverage: { total: l, bothFormations: c, bothMentality: h, withInstr: u, withPress: d, withDefLine: f, withTrans: p }
    };
  },
  subsDbStats() {
    var o, a, r, l, c, h, u, d, f;
    if (!this.subsDb || !this.matchArchive) return null;
    const t = this.subsDb.clubs || {}, e = {};
    for (const p of this.matchArchive) {
      const g = p._gw;
      if (g == null) continue;
      const m = (a = t[(o = p.home) == null ? void 0 : o.club]) == null ? void 0 : a[g], _ = (l = t[(r = p.away) == null ? void 0 : r.club]) == null ? void 0 : l[g];
      e[g] || (e[g] = { gw: g, n: 0, hSub: 0, aSub: 0, bothSub: 0, bothFm: 0, bothMen: 0, press: 0, line: 0, trans: 0, sides: 0 });
      const y = e[g];
      y.n++, m && y.hSub++, _ && y.aSub++, m && _ && y.bothSub++, m != null && m.formation && (_ != null && _.formation) && y.bothFm++, (c = m == null ? void 0 : m.instructions) != null && c.mentality && ((h = _ == null ? void 0 : _.instructions) != null && h.mentality) && y.bothMen++;
      for (const b of [m, _])
        b && (y.sides++, (u = b.instructions) != null && u.pressing_intensity && y.press++, (d = b.instructions) != null && d.defensive_line && y.line++, (f = b.instructions) != null && f.transition_speed && y.trans++);
    }
    const s = Object.values(e).sort((p, g) => g.gw - p.gw), n = this.matchArchive.length, i = s.reduce((p, g) => (p.bothSub += g.bothSub, p.bothFm += g.bothFm, p.bothMen += g.bothMen, p.sides += g.sides, p.press += g.press, p.line += g.line, p.trans += g.trans, p), { bothSub: 0, bothFm: 0, bothMen: 0, sides: 0, press: 0, line: 0, trans: 0 });
    return { rows: s, total: n, totals: i };
  }
}, _C = {
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
    const t = gh[this.mySquadFormation];
    if (!t) return [];
    const e = this.mySquadPlayers, s = /* @__PURE__ */ new Set(), n = (i, o) => {
      const r = (oC[o] || []).map((l) => i[l]).filter((l) => l != null && l > 0);
      return r.length ? r.reduce((l, c) => l + c, 0) / r.length : 0;
    };
    return t.map((i, o) => {
      const a = iC[i] || [i];
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
}, xC = {
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
        const u = new Date(c.endsAt || 0).getTime() > t, d = ((o = c.highest) == null ? void 0 : o.bidder) || null, f = [...c.bids || []].sort((m, _) => (_.amount || 0) - (m.amount || 0)).map((m) => ({
          id: `${c.id}-${m.bidder}`,
          buyer: m.bidder,
          amount: m.amount,
          updatedAt: m.at,
          via: "auction",
          status: u ? "pending" : m.bidder === d ? "accepted" : "rejected",
          subStatus: u || m.bidder === d ? null : "outbid"
        }));
        let p = ((a = f[0]) == null ? void 0 : a.buyer) || null;
        for (const m of f) {
          const _ = this.clubBudgetFor(m.buyer);
          if (_ == null || _ >= m.amount) {
            p = m.buyer;
            break;
          }
        }
        const g = { playerName: c.player, seller: c.club, bids: f, endsAt: c.endsAt, effectiveWinner: p };
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
}, vC = {
  activeModalStats() {
    const t = this.selectedPlayerStats;
    return t ? this.selectedPlayerStatsTab === "season" ? t.seasonStats || null : this.selectedPlayerStatsTab === "career" && (t.career || t.seasonStats) || null : null;
  },
  selectedPlayerTraits() {
    return this.selectedPlayer ? uc(this.selectedPlayer) : [];
  },
  selectedPlayerBonds() {
    if (!this.selectedPlayer || !this.selectedPlayer.Club) return [];
    const t = this.allPlayers.filter((e) => e.Club === this.selectedPlayer.Club);
    return Dm(this.selectedPlayer, t, this.allDeals);
  },
  mySquadChem() {
    const t = this.allPlayers.filter((e) => e.Club === Jt);
    return Rm(t, this.allDeals);
  },
  availableTraits() {
    const t = /* @__PURE__ */ new Set();
    return this.allPlayers.forEach((e) => uc(e).forEach((s) => t.add(s.n))), ["", ...Array.from(t).sort()];
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
}, SC = {
  filteredPlayers() {
    const t = this.search.toLowerCase();
    return this.allPlayers.filter((e) => {
      var i, o, a;
      if (!this.leagueFilter.has(e._league) || !this.posFilter.has(e.Position)) return !1;
      const s = this.posRatingUseWeighted ? e._weightedRating || e._gameRating || e.Rating || 0 : e._gameRating || e.Rating || 0;
      if (Object.values(this.posRatingFilters).some((r) => r > 60) && !Object.entries(this.posRatingFilters).some(([l, c]) => {
        if (c <= 60) return !1;
        const h = this.posRatingUseWeighted ? So(e, l, this.mentalCfgAttrs, this.mentalWeightPct) : Ln(e, l);
        return h != null && h >= c;
      }) || this.posRatingMax < 99 && s > this.posRatingMax || this.maxAge < 40 && (e.Age || 99) > this.maxAge || this.ageGroupFilter === "u21" && !e._u21 || this.ageGroupFilter === "u20" && !e._u20 || this.hideOwn && e.Club === Jt || this.hideVacant && this.vacantClubs.has(e.Club) || this.managedOnly && !e._managed || this.forSaleOnly && (!e._managed || e.notForSale) || this.transferListedOnly && !e._transferListed || this.injuredOnly && !e.injured && !e.suspended || this.hideRetiring && e.retiring || this.traitFilter && !uc(e).map((l) => l.n).includes(this.traitFilter))
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
        (o) => (o.playerName || "").toLowerCase() === (t.Player || "").toLowerCase() && (o.status === "pending" || o.status === "counter" || o.status === "countered")
      ), i = e > 0 ? Math.round(Math.min(t._listingAsk * 0.85, e * 0.88) / 5e5) * 5e5 || Math.round(Math.min(t._listingAsk * 0.85, e * 0.88) / 1e5) * 1e5 : null;
      return { p: t, tv: e, ratio: s, activeNegos: n, counterOffer: i };
    }).sort((t, e) => t.ratio - e.ratio);
  },
  mbGemsList() {
    return this.allPlayers.filter((t) => t.Age <= 27 && (t._gameRating || 0) >= 68 && t.Club !== Jt).map((t) => {
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
}, yl = 50, wC = {
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
    return e === "date" ? [...t].sort((s, n) => new Date(n.createdAt) - new Date(s.createdAt)) : e === "date_a" ? [...t].sort((s, n) => new Date(s.createdAt) - new Date(n.createdAt)) : e === "rating_d" ? [...t].sort((s, n) => (n.player.rating || n.player.Rating || 0) - (s.player.rating || s.player.Rating || 0)) : e === "rating_a" ? [...t].sort((s, n) => (s.player.rating || s.player.Rating || 0) - (n.player.rating || n.player.Rating || 0)) : e === "age_a" ? [...t].sort((s, n) => (s.player.age || s.player.Age || 0) - (n.player.age || n.player.Age || 0)) : e === "age_d" ? [...t].sort((s, n) => (n.player.age || n.player.Age || 0) - (s.player.age || s.player.Age || 0)) : e === "value_d" ? [...t].sort((s, n) => (n.player.value || n.player.Value || 0) - (s.player.value || s.player.Value || 0)) : e === "value_a" ? [...t].sort((s, n) => (s.player.value || s.player.Value || 0) - (n.player.value || n.player.Value || 0)) : e === "name_a" ? [...t].sort((s, n) => (s.player.name || s.player.Player || "").localeCompare(n.player.name || n.player.Player || "")) : e === "name_d" ? [...t].sort((s, n) => (n.player.name || n.player.Player || "").localeCompare(s.player.name || s.player.Player || "")) : e === "pos_a" ? [...t].sort((s, n) => (s.player.position || s.player.Position || "").localeCompare(n.player.position || n.player.Position || "")) : e === "pos_d" ? [...t].sort((s, n) => (n.player.position || n.player.Position || "").localeCompare(s.player.position || s.player.Position || "")) : e === "buynow_d" ? [...t].sort((s, n) => (n.buyNow || 0) - (s.buyNow || 0)) : e === "buynow_a" ? [...t].sort((s, n) => (s.buyNow || 0) - (n.buyNow || 0)) : e === "status_a" ? [...t].sort((s, n) => (s._jobStatus || s.status || "").localeCompare(n._jobStatus || n.status || "")) : e === "status_d" ? [...t].sort((s, n) => (n._jobStatus || n.status || "").localeCompare(s._jobStatus || s.status || "")) : e === "bestattr_a" ? [...t].sort((s, n) => {
      var i, o;
      return (((i = s.player) == null ? void 0 : i.bestKey) || "").localeCompare(((o = n.player) == null ? void 0 : o.bestKey) || "");
    }) : e === "bestattr_d" ? [...t].sort((s, n) => {
      var i, o;
      return (((i = n.player) == null ? void 0 : i.bestKey) || "").localeCompare(((o = s.player) == null ? void 0 : o.bestKey) || "");
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
    return s === "date" ? [...t].sort((n, i) => new Date(i.createdAt) - new Date(n.createdAt)) : s === "date_a" ? [...t].sort((n, i) => new Date(n.createdAt) - new Date(i.createdAt)) : s === "rating_d" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.rating) || 0) - (((a = n.player) == null ? void 0 : a.rating) || 0);
    }) : s === "rating_a" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.rating) || 0) - (((a = i.player) == null ? void 0 : a.rating) || 0);
    }) : s === "age_a" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.age) || 0) - (((a = i.player) == null ? void 0 : a.age) || 0);
    }) : s === "age_d" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.age) || 0) - (((a = n.player) == null ? void 0 : a.age) || 0);
    }) : s === "value_d" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.value) || 0) - (((a = n.player) == null ? void 0 : a.value) || 0);
    }) : s === "value_a" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.value) || 0) - (((a = i.player) == null ? void 0 : a.value) || 0);
    }) : s === "name_a" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.name) || "").localeCompare(((a = i.player) == null ? void 0 : a.name) || "");
    }) : s === "name_d" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.name) || "").localeCompare(((a = n.player) == null ? void 0 : a.name) || "");
    }) : s === "pos_a" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.position) || "").localeCompare(((a = i.player) == null ? void 0 : a.position) || "");
    }) : s === "pos_d" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.position) || "").localeCompare(((a = n.player) == null ? void 0 : a.position) || "");
    }) : s === "buynow_d" ? [...t].sort((n, i) => (i.buyNow || 0) - (n.buyNow || 0)) : s === "buynow_a" ? [...t].sort((n, i) => (n.buyNow || 0) - (i.buyNow || 0)) : s === "status_a" ? [...t].sort((n, i) => (n._jobStatus || n.status || "").localeCompare(i._jobStatus || i.status || "")) : s === "status_d" ? [...t].sort((n, i) => (i._jobStatus || i.status || "").localeCompare(n._jobStatus || n.status || "")) : s === "sclub_a" ? [...t].sort((n, i) => (n._club || "").localeCompare(i._club || "")) : s === "sclub_d" ? [...t].sort((n, i) => (i._club || "").localeCompare(n._club || "")) : s === "bestattr_a" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = n.player) == null ? void 0 : o.bestKey) || "").localeCompare(((a = i.player) == null ? void 0 : a.bestKey) || "");
    }) : s === "bestattr_d" ? [...t].sort((n, i) => {
      var o, a;
      return (((o = i.player) == null ? void 0 : o.bestKey) || "").localeCompare(((a = n.player) == null ? void 0 : a.bestKey) || "");
    }) : t;
  },
  youthHistPaged() {
    const t = this.youthHistPage * yl;
    return this.youthHistFiltered.slice(t, t + yl);
  },
  youthHistTotalPages() {
    return Math.max(1, Math.ceil(this.youthHistFiltered.length / yl));
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
}, CC = {
  selectedClubPlayers() {
    if (!this.selectedClubName) return [];
    const t = this.clubSquadSort || "pos";
    return this.allPlayers.filter((e) => e.Club === this.selectedClubName).sort((e, s) => {
      if (t === "pos") {
        const n = (sf[e.Position] ?? 9) - (sf[s.Position] ?? 9);
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
za({
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
      leagueFilter: new Set(to),
      posFilter: new Set(ha),
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
      scoutFiltersOpen: !0,
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
      formationKeys: Object.keys(gh),
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
      allLeagues: to,
      allPositions: ha,
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
    ...bC,
    ..._C,
    ...xC,
    ...vC,
    ...SC,
    ...wC,
    ...CC
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
      t !== "top-lists" && (await ai(), this.drawMoneyballChart(t));
    },
    async tacticsLoaded(t) {
      t && (await ai(), this.drawTacticsCharts());
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
    ...dC,
    ...fC,
    ...pC,
    ...gC,
    ...mC,
    ...yC,
    fmtVal: Tm,
    fmtWage: lC,
    ratingClass(t) {
      return t ? t >= 84 ? "rating-high" : t >= 77 ? "rating-mid" : "rating-low" : "c-gray";
    },
    attrBarColor(t) {
      return (t || 0) >= 80 ? "#7ee787" : (t || 0) >= 65 ? "#ffa657" : "#ff7b72";
    },
    isKeyAttr(t, e) {
      const s = this.highlightedPos || e, n = gi[s];
      return n ? n.includes(t) : !1;
    },
    gameAttrsFor(t) {
      return gi[t] || [];
    },
    recomputeWeightedRatings() {
      const t = this.mentalCfgAttrs, e = this.mentalWeightPct;
      this.allPlayers = this.allPlayers.map((s) => {
        const n = So(s, s.Position, t, e);
        return n === s._weightedRating ? s : Object.freeze({ ...s, _weightedRating: n });
      });
    },
    posAttrNames(t) {
      return Qd[t] || "";
    },
    allPosRatings(t) {
      return Qw.map((e) => ({
        pos: e,
        attrs: Qd[e] || "",
        game: Ln(t, e),
        weighted: So(t, e, this.mentalCfgAttrs, this.mentalWeightPct),
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
      if (this.posFilter.size === ha.length)
        this.posFilter = /* @__PURE__ */ new Set([t]);
      else if (this.posFilter.size === 1 && this.posFilter.has(t))
        this.posFilter = new Set(ha);
      else {
        const s = new Set(this.posFilter);
        s.has(t) ? s.delete(t) : s.add(t), this.posFilter = s;
      }
    },
    clubChemScore(t) {
      const e = this.allPlayers.filter((s) => s.Club === t);
      return Rm(e, this.allDeals);
    },
    chemColor(t) {
      return t == null ? "#6e7681" : t >= 70 ? "#3fb950" : t >= 40 ? "#d29922" : "#f85149";
    },
    playerBondCount(t) {
      if (!(t != null && t.Player) || !(t != null && t.Club)) return null;
      const e = this.allPlayers.filter((s) => s.Club === t.Club);
      return Dm(t, e, this.allDeals).length;
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
