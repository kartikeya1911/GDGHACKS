!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a2eeeedc-2bb7-4690-a55b-909adfd8fbc5",e._sentryDebugIdIdentifier="sentry-dbid-a2eeeedc-2bb7-4690-a55b-909adfd8fbc5")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[85],{70085:function(e,n,r){r.d(n,{oC:function(){return e9},VY:function(){return e5},ZA:function(){return e7},ck:function(){return e8},wU:function(){return e4},__:function(){return e2},Uv:function(){return e1},Ee:function(){return e6},Rk:function(){return e3},fC:function(){return e$},Z0:function(){return ne},Tr:function(){return nn},tu:function(){return nt},fF:function(){return nr},xz:function(){return e0}});var t=r(2265),o=r(6741),a=r(98575),u=r(73966),l=r(80886),i=r(66840),d=r(67822),c=r(29114),s=r(15278),f=r(86097),p=r(99103),v=r(99255),g=r(26008),h=r(83832),w=r(71599),m=r(1353),x=r(37053),y=r(26606),M=r(5478),b=r(87922),C=r(57437),j=["Enter"," "],D=["ArrowUp","PageDown","End"],R=["ArrowDown","PageUp","Home",...D],_={ltr:[...j,"ArrowRight"],rtl:[...j,"ArrowLeft"]},k={ltr:["ArrowLeft"],rtl:["ArrowRight"]},I="Menu",[P,E,T]=(0,d.B)(I),[N,O]=(0,u.b)(I,[T,g.D7,m.Pc]),S=(0,g.D7)(),F=(0,m.Pc)(),[L,A]=N(I),[K,V]=N(I),W=e=>{let{__scopeMenu:n,open:r=!1,children:o,dir:a,onOpenChange:u,modal:l=!0}=e,i=S(n),[d,s]=t.useState(null),f=t.useRef(!1),p=(0,y.W)(u),v=(0,c.gm)(a);return t.useEffect(()=>{let e=()=>{f.current=!0,document.addEventListener("pointerdown",n,{capture:!0,once:!0}),document.addEventListener("pointermove",n,{capture:!0,once:!0})},n=()=>f.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",n,{capture:!0}),document.removeEventListener("pointermove",n,{capture:!0})}},[]),(0,C.jsx)(g.fC,{...i,children:(0,C.jsx)(L,{scope:n,open:r,onOpenChange:p,content:d,onContentChange:s,children:(0,C.jsx)(K,{scope:n,onClose:t.useCallback(()=>p(!1),[p]),isUsingKeyboardRef:f,dir:v,modal:l,children:o})})})};W.displayName=I;var G=t.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e,o=S(r);return(0,C.jsx)(g.ee,{...o,...t,ref:n})});G.displayName="MenuAnchor";var U="MenuPortal",[B,z]=N(U,{forceMount:void 0}),X=e=>{let{__scopeMenu:n,forceMount:r,children:t,container:o}=e,a=A(U,n);return(0,C.jsx)(B,{scope:n,forceMount:r,children:(0,C.jsx)(w.z,{present:r||a.open,children:(0,C.jsx)(h.h,{asChild:!0,container:o,children:t})})})};X.displayName=U;var Y="MenuContent",[Z,H]=N(Y),q=t.forwardRef((e,n)=>{let r=z(Y,e.__scopeMenu),{forceMount:t=r.forceMount,...o}=e,a=A(Y,e.__scopeMenu),u=V(Y,e.__scopeMenu);return(0,C.jsx)(P.Provider,{scope:e.__scopeMenu,children:(0,C.jsx)(w.z,{present:t||a.open,children:(0,C.jsx)(P.Slot,{scope:e.__scopeMenu,children:u.modal?(0,C.jsx)(J,{...o,ref:n}):(0,C.jsx)(Q,{...o,ref:n})})})})}),J=t.forwardRef((e,n)=>{let r=A(Y,e.__scopeMenu),u=t.useRef(null),l=(0,a.e)(n,u);return t.useEffect(()=>{let e=u.current;if(e)return(0,M.Ry)(e)},[]),(0,C.jsx)($,{...e,ref:l,trapFocus:r.open,disableOutsidePointerEvents:r.open,disableOutsideScroll:!0,onFocusOutside:(0,o.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>r.onOpenChange(!1)})}),Q=t.forwardRef((e,n)=>{let r=A(Y,e.__scopeMenu);return(0,C.jsx)($,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>r.onOpenChange(!1)})}),$=t.forwardRef((e,n)=>{let{__scopeMenu:r,loop:u=!1,trapFocus:l,onOpenAutoFocus:i,onCloseAutoFocus:d,disableOutsidePointerEvents:c,onEntryFocus:v,onEscapeKeyDown:h,onPointerDownOutside:w,onFocusOutside:y,onInteractOutside:M,onDismiss:j,disableOutsideScroll:_,...k}=e,I=A(Y,r),P=V(Y,r),T=S(r),N=F(r),O=E(r),[L,K]=t.useState(null),W=t.useRef(null),G=(0,a.e)(n,W,I.onContentChange),U=t.useRef(0),B=t.useRef(""),z=t.useRef(0),X=t.useRef(null),H=t.useRef("right"),q=t.useRef(0),J=_?b.Z:t.Fragment,Q=_?{as:x.g7,allowPinchZoom:!0}:void 0,$=e=>{var n,r;let t=B.current+e,o=O().filter(e=>!e.disabled),a=document.activeElement,u=null===(n=o.find(e=>e.ref.current===a))||void 0===n?void 0:n.textValue,l=function(e,n,r){var t;let o=n.length>1&&Array.from(n).every(e=>e===n[0])?n[0]:n,a=(t=Math.max(r?e.indexOf(r):-1,0),e.map((n,r)=>e[(t+r)%e.length]));1===o.length&&(a=a.filter(e=>e!==r));let u=a.find(e=>e.toLowerCase().startsWith(o.toLowerCase()));return u!==r?u:void 0}(o.map(e=>e.textValue),t,u),i=null===(r=o.find(e=>e.textValue===l))||void 0===r?void 0:r.ref.current;!function e(n){B.current=n,window.clearTimeout(U.current),""!==n&&(U.current=window.setTimeout(()=>e(""),1e3))}(t),i&&setTimeout(()=>i.focus())};t.useEffect(()=>()=>window.clearTimeout(U.current),[]),(0,f.EW)();let ee=t.useCallback(e=>{var n,r,t;return H.current===(null===(n=X.current)||void 0===n?void 0:n.side)&&!!(t=null===(r=X.current)||void 0===r?void 0:r.area)&&function(e,n){let{x:r,y:t}=e,o=!1;for(let e=0,a=n.length-1;e<n.length;a=e++){let u=n[e].x,l=n[e].y,i=n[a].x,d=n[a].y;l>t!=d>t&&r<(i-u)*(t-l)/(d-l)+u&&(o=!o)}return o}({x:e.clientX,y:e.clientY},t)},[]);return(0,C.jsx)(Z,{scope:r,searchRef:B,onItemEnter:t.useCallback(e=>{ee(e)&&e.preventDefault()},[ee]),onItemLeave:t.useCallback(e=>{var n;ee(e)||(null===(n=W.current)||void 0===n||n.focus(),K(null))},[ee]),onTriggerLeave:t.useCallback(e=>{ee(e)&&e.preventDefault()},[ee]),pointerGraceTimerRef:z,onPointerGraceIntentChange:t.useCallback(e=>{X.current=e},[]),children:(0,C.jsx)(J,{...Q,children:(0,C.jsx)(p.M,{asChild:!0,trapped:l,onMountAutoFocus:(0,o.M)(i,e=>{var n;e.preventDefault(),null===(n=W.current)||void 0===n||n.focus({preventScroll:!0})}),onUnmountAutoFocus:d,children:(0,C.jsx)(s.XB,{asChild:!0,disableOutsidePointerEvents:c,onEscapeKeyDown:h,onPointerDownOutside:w,onFocusOutside:y,onInteractOutside:M,onDismiss:j,children:(0,C.jsx)(m.fC,{asChild:!0,...N,dir:P.dir,orientation:"vertical",loop:u,currentTabStopId:L,onCurrentTabStopIdChange:K,onEntryFocus:(0,o.M)(v,e=>{P.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,C.jsx)(g.VY,{role:"menu","aria-orientation":"vertical","data-state":e_(I.open),"data-radix-menu-content":"",dir:P.dir,...T,...k,ref:G,style:{outline:"none",...k.style},onKeyDown:(0,o.M)(k.onKeyDown,e=>{let n=e.target.closest("[data-radix-menu-content]")===e.currentTarget,r=e.ctrlKey||e.altKey||e.metaKey,t=1===e.key.length;n&&("Tab"===e.key&&e.preventDefault(),!r&&t&&$(e.key));let o=W.current;if(e.target!==o||!R.includes(e.key))return;e.preventDefault();let a=O().filter(e=>!e.disabled).map(e=>e.ref.current);D.includes(e.key)&&a.reverse(),function(e){let n=document.activeElement;for(let r of e)if(r===n||(r.focus(),document.activeElement!==n))return}(a)}),onBlur:(0,o.M)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(U.current),B.current="")}),onPointerMove:(0,o.M)(e.onPointerMove,eP(e=>{let n=e.target,r=q.current!==e.clientX;if(e.currentTarget.contains(n)&&r){let n=e.clientX>q.current?"right":"left";H.current=n,q.current=e.clientX}}))})})})})})})});q.displayName=Y;var ee=t.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e;return(0,C.jsx)(i.WV.div,{role:"group",...t,ref:n})});ee.displayName="MenuGroup";var en=t.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e;return(0,C.jsx)(i.WV.div,{...t,ref:n})});en.displayName="MenuLabel";var er="MenuItem",et="menu.itemSelect",eo=t.forwardRef((e,n)=>{let{disabled:r=!1,onSelect:u,...l}=e,d=t.useRef(null),c=V(er,e.__scopeMenu),s=H(er,e.__scopeMenu),f=(0,a.e)(n,d),p=t.useRef(!1);return(0,C.jsx)(ea,{...l,ref:f,disabled:r,onClick:(0,o.M)(e.onClick,()=>{let e=d.current;if(!r&&e){let n=new CustomEvent(et,{bubbles:!0,cancelable:!0});e.addEventListener(et,e=>null==u?void 0:u(e),{once:!0}),(0,i.jH)(e,n),n.defaultPrevented?p.current=!1:c.onClose()}}),onPointerDown:n=>{var r;null===(r=e.onPointerDown)||void 0===r||r.call(e,n),p.current=!0},onPointerUp:(0,o.M)(e.onPointerUp,e=>{var n;p.current||null===(n=e.currentTarget)||void 0===n||n.click()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let n=""!==s.searchRef.current;!r&&(!n||" "!==e.key)&&j.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});eo.displayName=er;var ea=t.forwardRef((e,n)=>{let{__scopeMenu:r,disabled:u=!1,textValue:l,...d}=e,c=H(er,r),s=F(r),f=t.useRef(null),p=(0,a.e)(n,f),[v,g]=t.useState(!1),[h,w]=t.useState("");return t.useEffect(()=>{let e=f.current;if(e){var n;w((null!==(n=e.textContent)&&void 0!==n?n:"").trim())}},[d.children]),(0,C.jsx)(P.ItemSlot,{scope:r,disabled:u,textValue:null!=l?l:h,children:(0,C.jsx)(m.ck,{asChild:!0,...s,focusable:!u,children:(0,C.jsx)(i.WV.div,{role:"menuitem","data-highlighted":v?"":void 0,"aria-disabled":u||void 0,"data-disabled":u?"":void 0,...d,ref:p,onPointerMove:(0,o.M)(e.onPointerMove,eP(e=>{u?c.onItemLeave(e):(c.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eP(e=>c.onItemLeave(e))),onFocus:(0,o.M)(e.onFocus,()=>g(!0)),onBlur:(0,o.M)(e.onBlur,()=>g(!1))})})})}),eu=t.forwardRef((e,n)=>{let{checked:r=!1,onCheckedChange:t,...a}=e;return(0,C.jsx)(ev,{scope:e.__scopeMenu,checked:r,children:(0,C.jsx)(eo,{role:"menuitemcheckbox","aria-checked":ek(r)?"mixed":r,...a,ref:n,"data-state":eI(r),onSelect:(0,o.M)(a.onSelect,()=>null==t?void 0:t(!!ek(r)||!r),{checkForDefaultPrevented:!1})})})});eu.displayName="MenuCheckboxItem";var el="MenuRadioGroup",[ei,ed]=N(el,{value:void 0,onValueChange:()=>{}}),ec=t.forwardRef((e,n)=>{let{value:r,onValueChange:t,...o}=e,a=(0,y.W)(t);return(0,C.jsx)(ei,{scope:e.__scopeMenu,value:r,onValueChange:a,children:(0,C.jsx)(ee,{...o,ref:n})})});ec.displayName=el;var es="MenuRadioItem",ef=t.forwardRef((e,n)=>{let{value:r,...t}=e,a=ed(es,e.__scopeMenu),u=r===a.value;return(0,C.jsx)(ev,{scope:e.__scopeMenu,checked:u,children:(0,C.jsx)(eo,{role:"menuitemradio","aria-checked":u,...t,ref:n,"data-state":eI(u),onSelect:(0,o.M)(t.onSelect,()=>{var e;return null===(e=a.onValueChange)||void 0===e?void 0:e.call(a,r)},{checkForDefaultPrevented:!1})})})});ef.displayName=es;var ep="MenuItemIndicator",[ev,eg]=N(ep,{checked:!1}),eh=t.forwardRef((e,n)=>{let{__scopeMenu:r,forceMount:t,...o}=e,a=eg(ep,r);return(0,C.jsx)(w.z,{present:t||ek(a.checked)||!0===a.checked,children:(0,C.jsx)(i.WV.span,{...o,ref:n,"data-state":eI(a.checked)})})});eh.displayName=ep;var ew=t.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e;return(0,C.jsx)(i.WV.div,{role:"separator","aria-orientation":"horizontal",...t,ref:n})});ew.displayName="MenuSeparator";var em=t.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e,o=S(r);return(0,C.jsx)(g.Eh,{...o,...t,ref:n})});em.displayName="MenuArrow";var ex="MenuSub",[ey,eM]=N(ex),eb=e=>{let{__scopeMenu:n,children:r,open:o=!1,onOpenChange:a}=e,u=A(ex,n),l=S(n),[i,d]=t.useState(null),[c,s]=t.useState(null),f=(0,y.W)(a);return t.useEffect(()=>(!1===u.open&&f(!1),()=>f(!1)),[u.open,f]),(0,C.jsx)(g.fC,{...l,children:(0,C.jsx)(L,{scope:n,open:o,onOpenChange:f,content:c,onContentChange:s,children:(0,C.jsx)(ey,{scope:n,contentId:(0,v.M)(),triggerId:(0,v.M)(),trigger:i,onTriggerChange:d,children:r})})})};eb.displayName=ex;var eC="MenuSubTrigger",ej=t.forwardRef((e,n)=>{let r=A(eC,e.__scopeMenu),u=V(eC,e.__scopeMenu),l=eM(eC,e.__scopeMenu),i=H(eC,e.__scopeMenu),d=t.useRef(null),{pointerGraceTimerRef:c,onPointerGraceIntentChange:s}=i,f={__scopeMenu:e.__scopeMenu},p=t.useCallback(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return t.useEffect(()=>p,[p]),t.useEffect(()=>{let e=c.current;return()=>{window.clearTimeout(e),s(null)}},[c,s]),(0,C.jsx)(G,{asChild:!0,...f,children:(0,C.jsx)(ea,{id:l.triggerId,"aria-haspopup":"menu","aria-expanded":r.open,"aria-controls":l.contentId,"data-state":e_(r.open),...e,ref:(0,a.F)(n,l.onTriggerChange),onClick:n=>{var t;null===(t=e.onClick)||void 0===t||t.call(e,n),e.disabled||n.defaultPrevented||(n.currentTarget.focus(),r.open||r.onOpenChange(!0))},onPointerMove:(0,o.M)(e.onPointerMove,eP(n=>{i.onItemEnter(n),n.defaultPrevented||e.disabled||r.open||d.current||(i.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{r.onOpenChange(!0),p()},100))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eP(e=>{var n,t;p();let o=null===(n=r.content)||void 0===n?void 0:n.getBoundingClientRect();if(o){let n=null===(t=r.content)||void 0===t?void 0:t.dataset.side,a="right"===n,u=o[a?"left":"right"],l=o[a?"right":"left"];i.onPointerGraceIntentChange({area:[{x:e.clientX+(a?-5:5),y:e.clientY},{x:u,y:o.top},{x:l,y:o.top},{x:l,y:o.bottom},{x:u,y:o.bottom}],side:n}),window.clearTimeout(c.current),c.current=window.setTimeout(()=>i.onPointerGraceIntentChange(null),300)}else{if(i.onTriggerLeave(e),e.defaultPrevented)return;i.onPointerGraceIntentChange(null)}})),onKeyDown:(0,o.M)(e.onKeyDown,n=>{let t=""!==i.searchRef.current;if(!e.disabled&&(!t||" "!==n.key)&&_[u.dir].includes(n.key)){var o;r.onOpenChange(!0),null===(o=r.content)||void 0===o||o.focus(),n.preventDefault()}})})})});ej.displayName=eC;var eD="MenuSubContent",eR=t.forwardRef((e,n)=>{let r=z(Y,e.__scopeMenu),{forceMount:u=r.forceMount,...l}=e,i=A(Y,e.__scopeMenu),d=V(Y,e.__scopeMenu),c=eM(eD,e.__scopeMenu),s=t.useRef(null),f=(0,a.e)(n,s);return(0,C.jsx)(P.Provider,{scope:e.__scopeMenu,children:(0,C.jsx)(w.z,{present:u||i.open,children:(0,C.jsx)(P.Slot,{scope:e.__scopeMenu,children:(0,C.jsx)($,{id:c.contentId,"aria-labelledby":c.triggerId,...l,ref:f,align:"start",side:"rtl"===d.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{var n;d.isUsingKeyboardRef.current&&(null===(n=s.current)||void 0===n||n.focus()),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,o.M)(e.onFocusOutside,e=>{e.target!==c.trigger&&i.onOpenChange(!1)}),onEscapeKeyDown:(0,o.M)(e.onEscapeKeyDown,e=>{d.onClose(),e.preventDefault()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let n=e.currentTarget.contains(e.target),r=k[d.dir].includes(e.key);if(n&&r){var t;i.onOpenChange(!1),null===(t=c.trigger)||void 0===t||t.focus(),e.preventDefault()}})})})})})});function e_(e){return e?"open":"closed"}function ek(e){return"indeterminate"===e}function eI(e){return ek(e)?"indeterminate":e?"checked":"unchecked"}function eP(e){return n=>"mouse"===n.pointerType?e(n):void 0}eR.displayName=eD;var eE="DropdownMenu",[eT,eN]=(0,u.b)(eE,[O]),eO=O(),[eS,eF]=eT(eE),eL=e=>{let{__scopeDropdownMenu:n,children:r,dir:o,open:a,defaultOpen:u,onOpenChange:i,modal:d=!0}=e,c=eO(n),s=t.useRef(null),[f=!1,p]=(0,l.T)({prop:a,defaultProp:u,onChange:i});return(0,C.jsx)(eS,{scope:n,triggerId:(0,v.M)(),triggerRef:s,contentId:(0,v.M)(),open:f,onOpenChange:p,onOpenToggle:t.useCallback(()=>p(e=>!e),[p]),modal:d,children:(0,C.jsx)(W,{...c,open:f,onOpenChange:p,dir:o,modal:d,children:r})})};eL.displayName=eE;var eA="DropdownMenuTrigger",eK=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,disabled:t=!1,...u}=e,l=eF(eA,r),d=eO(r);return(0,C.jsx)(G,{asChild:!0,...d,children:(0,C.jsx)(i.WV.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":t?"":void 0,disabled:t,...u,ref:(0,a.F)(n,l.triggerRef),onPointerDown:(0,o.M)(e.onPointerDown,e=>{t||0!==e.button||!1!==e.ctrlKey||(l.onOpenToggle(),l.open||e.preventDefault())}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{!t&&(["Enter"," "].includes(e.key)&&l.onOpenToggle(),"ArrowDown"===e.key&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});eK.displayName=eA;var eV=e=>{let{__scopeDropdownMenu:n,...r}=e,t=eO(n);return(0,C.jsx)(X,{...t,...r})};eV.displayName="DropdownMenuPortal";var eW="DropdownMenuContent",eG=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...a}=e,u=eF(eW,r),l=eO(r),i=t.useRef(!1);return(0,C.jsx)(q,{id:u.contentId,"aria-labelledby":u.triggerId,...l,...a,ref:n,onCloseAutoFocus:(0,o.M)(e.onCloseAutoFocus,e=>{var n;i.current||null===(n=u.triggerRef.current)||void 0===n||n.focus(),i.current=!1,e.preventDefault()}),onInteractOutside:(0,o.M)(e.onInteractOutside,e=>{let n=e.detail.originalEvent,r=0===n.button&&!0===n.ctrlKey,t=2===n.button||r;(!u.modal||t)&&(i.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});eG.displayName=eW;var eU=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(ee,{...o,...t,ref:n})});eU.displayName="DropdownMenuGroup";var eB=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(en,{...o,...t,ref:n})});eB.displayName="DropdownMenuLabel";var ez=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(eo,{...o,...t,ref:n})});ez.displayName="DropdownMenuItem";var eX=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(eu,{...o,...t,ref:n})});eX.displayName="DropdownMenuCheckboxItem";var eY=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(ec,{...o,...t,ref:n})});eY.displayName="DropdownMenuRadioGroup";var eZ=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(ef,{...o,...t,ref:n})});eZ.displayName="DropdownMenuRadioItem";var eH=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(eh,{...o,...t,ref:n})});eH.displayName="DropdownMenuItemIndicator";var eq=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(ew,{...o,...t,ref:n})});eq.displayName="DropdownMenuSeparator",t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(em,{...o,...t,ref:n})}).displayName="DropdownMenuArrow";var eJ=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(ej,{...o,...t,ref:n})});eJ.displayName="DropdownMenuSubTrigger";var eQ=t.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=eO(r);return(0,C.jsx)(eR,{...o,...t,ref:n,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});eQ.displayName="DropdownMenuSubContent";var e$=eL,e0=eK,e1=eV,e5=eG,e7=eU,e2=eB,e8=ez,e9=eX,e6=eY,e3=eZ,e4=eH,ne=eq,nn=e=>{let{__scopeDropdownMenu:n,children:r,open:t,onOpenChange:o,defaultOpen:a}=e,u=eO(n),[i=!1,d]=(0,l.T)({prop:t,defaultProp:a,onChange:o});return(0,C.jsx)(eb,{...u,open:i,onOpenChange:d,children:r})},nr=eJ,nt=eQ}}]);