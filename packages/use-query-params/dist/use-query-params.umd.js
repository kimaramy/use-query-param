(function(t,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],s):(t=typeof globalThis<"u"?globalThis:t||self,s(t.useQueryParams={},t.React))})(this,function(t,s){"use strict";const h=e=>e==null,y=(e=!1)=>{if(!window)throw new ReferenceError("'window' is undefined.");const[r,n]=s.useState(window.location.search.slice(1)),a=(u,i=null)=>{const o=!h(i)&&!e;window.history[o?"pushState":"replaceState"](i,"",`${window.location.pathname}${u.length>0?`?${u}`:u}`)},c=()=>{n(window.location.search.slice(1))};return s.useEffect(()=>(window.addEventListener("popstate",c),()=>{window.removeEventListener("popstate",c)}),[]),[r,a]},f={isShallow:!1},S=e=>{var o;const[r,n]=y((o=e==null?void 0:e.isShallow)!=null?o:f.isShallow),a=s.useCallback(d=>new URLSearchParams(d).toString(),[]),u=s.useCallback(d=>{const l={},w=new URLSearchParams(d).entries();for(const[Q,P]of w)l[Q]=P;return l},[])(r),i=s.useCallback(d=>{const l=JSON.parse(JSON.stringify(d)),w=Object.keys(l).length>0;n(a(l),w?l:null),window.dispatchEvent(new Event("popstate"))},[n]);return s.useEffect(()=>{n(r)},[r]),[u,i]},m=(e,r,n)=>{var i;const[a,c]=S({isShallow:(i=n==null?void 0:n.isShallow)!=null?i:f.isShallow}),u=o=>{c({...a,[e]:o})};return[r?r(a[e]):a[e],u]};t.useQueryParam=m,t.useQueryParams=S,t.useQueryString=y,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});