(self.webpackChunk_gooddata_sdk_ui_web_components=self.webpackChunk_gooddata_sdk_ui_web_components||[]).push([[746],{19676:(t,e,i)=>{i.d(e,{W:()=>c});var s=i(29205),r=i.n(s),n=i(89558),a=i(57408),o=i(33082),h=i(7045),u=i(11732),l=i(98962),d=i(25);class m extends h.W2{attribute(t,e){return(0,n.A)(t)?this.item.attribute=t:this.item.attribute=(0,l.a)(t,e),this}defaultDisplayForm(t,e){return(0,a.i_)(t)?this.item.defaultDisplayForm=t:this.item.defaultDisplayForm=(0,d.H)(t,e),this}displayForms(t){return this.item.displayForms=t,this}geoPinDisplayForms(t){return this.item.geoPinDisplayForms=t,this}toExecutionModel(t=r()){if(!this.item.defaultDisplayForm)throw new Error("Cannot convert catalog attribute to execution model, no displayForm found!");const e=t=>{var e;return t.alias(null===(e=this.item.defaultDisplayForm)||void 0===e?void 0:e.title)};return(0,o.YE)(this.item.defaultDisplayForm.ref,(i=>t(e(i))))}}const c=(t=r())=>(0,u.AZ)(m,{type:"attribute"},t)},37754:(t,e,i)=>{i.d(e,{hy:()=>c,xS:()=>f});var s=i(29205),r=i.n(s),n=i(89558),a=i(57408),o=i(18653),h=i(11732),u=i(98962),l=i(25),d=i(37914);class m extends h.Ib{granularity(t){return this.item.granularity=t,this}attribute(t,e){return(0,n.A)(t)?this.item.attribute=t:this.item.attribute=(0,u.a)(t,e),this}defaultDisplayForm(t,e){return(0,a.i_)(t)?this.item.defaultDisplayForm=t:this.item.defaultDisplayForm=(0,l.H)(t,e),this}}const c=(t=r())=>(0,h.AZ)(m,{},t);class p extends h.Ib{relevance(t){return this.item.relevance=t,this}dateAttributes(t){return this.item.dateAttributes=t,this}dataSet(t,e){var i;return i=t,(0,o.J)(i)&&"dataSet"===i.type?this.item.dataSet=t:this.item.dataSet=(0,d.q)(t,e),this}}const f=(t=r())=>(0,h.AZ)(p,{type:"dateDataset"},t)},23120:(t,e,i)=>{i.d(e,{Z:()=>l});var s=i(29205),r=i.n(s),n=i(18653),a=i(7045),o=i(11732),h=i(1556);class u extends a.W2{fact(t,e){var i;return i=t,(0,n.J)(i)&&"fact"===i.type?this.item.fact=t:this.item.fact=(0,h.k)(t,e),this}}const l=(t=r())=>(0,o.AZ)(u,{type:"fact"},t)},7045:(t,e,i)=>{i.d(e,{Dt:()=>h,W2:()=>a});var s=i(29205),r=i.n(s),n=i(11732);class a extends n.Ib{groups(t){return this.item.groups=t,this}}class o extends n.Ib{title(t){return this.item.title=t,this}tag(t){return this.item.tag=t,this}}const h=(t=r())=>(0,n.AZ)(o,{},t)},69036:(t,e,i)=>{i.d(e,{Y:()=>d});var s=i(29205),r=i.n(s),n=i(7045),a=i(13096),o=i(16473),h=i(11732),u=i(18587);class l extends n.W2{measure(t,e){return(0,a.i)(t)?this.item.measure=t:this.item.measure=(0,u._)(t,e),this}toExecutionModel(t=r()){if(!this.item.measure)throw new Error("Cannot convert catalog measure to execution model, no measure found!");const e=t=>{var e,i;return t.alias(null===(e=this.item.measure)||void 0===e?void 0:e.title).format(null===(i=this.item.measure)||void 0===i?void 0:i.format)};return(0,o.dg)(this.item.measure.ref,(i=>t(e(i))))}}const d=(t=r())=>(0,h.AZ)(l,{type:"measure"},t)},98962:(t,e,i)=>{i.d(e,{a:()=>h});var s=i(29205),r=i.n(s),n=i(64509),a=i(11732);class o extends n.U{drillDownStep(t){return t&&(this.item.drillDownStep=t),this}drillToAttributeLink(t){return t&&(this.item.drillToAttributeLink=t),this}displayForms(t){return this.item.displayForms=t,this}}const h=(t,e=r())=>(0,a.AZ)(o,{type:"attribute",ref:t},e)},37914:(t,e,i)=>{i.d(e,{q:()=>h});var s=i(29205),r=i.n(s),n=i(64509),a=i(11732);class o extends n.U{}const h=(t,e=r())=>(0,a.AZ)(o,{type:"dataSet",ref:t},e)},25:(t,e,i)=>{i.d(e,{H:()=>h});var s=i(29205),r=i.n(s),n=i(64509),a=i(11732);class o extends n.U{attribute(t){return this.item.attribute=t,this}displayFormType(t){return this.item.displayFormType=t,this}isDefault(t){return this.item.isDefault=t,this}}const h=(t,e=r())=>(0,a.AZ)(o,{type:"displayForm",ref:t},e)},1556:(t,e,i)=>{i.d(e,{k:()=>h});var s=i(29205),r=i.n(s),n=i(64509),a=i(11732);class o extends n.U{}const h=(t,e=r())=>(0,a.AZ)(o,{type:"fact",ref:t},e)},64509:(t,e,i)=>{i.d(e,{U:()=>r});var s=i(11732);class r extends s.Ib{title(t){return this.item.title=t,this}description(t){return this.item.description=t,this}id(t){return this.item.id=t,this}uri(t){return this.item.uri=t,this}unlisted(t){return this.item.unlisted=t,this}production(t){return this.item.production=t,this}deprecated(t){return this.item.deprecated=t,this}}},18587:(t,e,i)=>{i.d(e,{_:()=>h});var s=i(29205),r=i.n(s),n=i(64509),a=i(11732);class o extends n.U{expression(t){return this.item.expression=t,this}format(t){return this.item.format=t,this}isLocked(t){return this.item.isLocked=t,this}created(t){return this.item.created=t,this}createdBy(t){return this.item.createdBy=t,this}updated(t){return this.item.updated=t,this}updatedBy(t){return this.item.updatedBy=t,this}}const h=(t,e=r())=>(0,a.AZ)(o,{type:"measure",ref:t},e)},73075:(t,e,i)=>{i.d(e,{g7:()=>o,qL:()=>r,v7:()=>n});var s=i(33011);class r{constructor(t){this.realProvider=t,this.reset=()=>{this.principal=void 0},this.initializeClient=t=>{var e,i;null===(i=(e=this.realProvider).initializeClient)||void 0===i||i.call(e,t)},this.onNotAuthenticated=(t,e)=>{var i,s;null===(s=(i=this.realProvider).onNotAuthenticated)||void 0===s||s.call(i,t,e)},this.authenticate=t=>this.principal?Promise.resolve(this.principal):(this.inflightRequest||(this.inflightRequest=this.realProvider.authenticate(t).then((t=>(this.principal=t,this.inflightRequest=void 0,t))).catch((t=>{throw this.inflightRequest=void 0,t}))),this.inflightRequest)}getCurrentPrincipal(t){return this.realProvider.getCurrentPrincipal(t)}async deauthenticate(t){return this.realProvider.deauthenticate(t)}}class n{authenticate(t){throw new s.tn("NoopAuthProvider does not support authenticate")}getCurrentPrincipal(t){throw new s.tn("NoopAuthProvider does not support getCurrentPrincipal")}deauthenticate(t){throw new s.tn("NoopAuthProvider does not support deauthenticate")}reset(){throw new s.tn("NoopAuthProvider does not support reset")}}const a={userId:"anonymous"};class o{authenticate(t){return Promise.resolve(a)}getCurrentPrincipal(t){return Promise.resolve(a)}deauthenticate(t){return Promise.resolve()}reset(){}}},29118:(t,e,i)=>{i.d(e,{q:()=>l,r:()=>d});var s=i(73734),r=i(32354),n=i.n(r),a=i(99991),o=i.n(a),h=i(20253),u=i.n(h);class l{constructor(t,e=50,i=0){this.allItems=t,(0,s.kG)(i>=0,`paging offset must be non-negative, got: ${i}`),(0,s.kG)(e>0,`limit must be a positive number, got: ${e}`),this.items=t.slice(i,i+e),this.offset=Math.min(i,t.length),this.limit=e,this.totalCount=t.length}async next(){return 0===this.items.length?this:new l(this.allItems,this.limit,this.offset+this.items.length)}async goTo(t){return 0===this.items.length?this:new l(this.allItems,this.limit,t*this.items.length)}async all(){return[...this.allItems]}async allSorted(t){return[...this.allItems].sort(t)}}class d{static async for(t,e=50,i=0){(0,s.kG)(i>=0,`paging offset must be non-negative, got: ${i}`),(0,s.kG)(e>0,`limit must be a positive number, got: ${e}`);const{totalCount:r,items:n}=await t({limit:e,offset:i});return(0,s.kG)(!u()(r),`total count must be specified, got: ${r}`),new d(t,e,i,r,n)}constructor(t,e=50,i=0,s,r){this.getData=t,this.limit=e,this.offset=i,this.totalCount=s,this.items=r,this.next=async()=>{if(0===this.items.length)return this;if(this.items.length<this.limit||this.offset+this.items.length===this.totalCount)return new d(this.getData,this.limit,this.offset+this.limit,this.totalCount,[]);const t=await this.getData({limit:this.limit,offset:this.offset+this.limit});return new d(this.getData,this.limit,this.offset+this.limit,t.totalCount,t.items)},this.goTo=async t=>{const e=t*this.limit,i=await this.getData({limit:this.limit,offset:e});return new d(this.getData,this.limit,e,i.totalCount,i.items)},this.all=async()=>{const t=[],e=n()(0,this.totalCount/this.limit);for(0===this.offset&&(t.push(...this.items),e.shift());e.length>0;){const i=e.slice(0,6);e.splice(0,6);const s=await Promise.all(i.map((t=>this.goTo(t))));t.push(...o()(s,(t=>t.items)))}return t},this.allSorted=async t=>(await this.all()).sort(t)}}},16893:(t,e,i)=>{i.d(e,{q:()=>a});var s=i(21692);const r="about:blank";function n(t,e){const i=(0,s.N)(t);return t!==i?i===r?`${e} contains invalid schema; possible XSS detected`:`${e} contains invalid characters`:t.search(/\/\.+/)>-1?`${e} contains reserved filename characters`:void 0}function a(t){var e;try{if("https:"!==new URL(t).protocol)return"url does not use https"}catch(t){return"url is malformed"}const i=null!==(e=n(t,"url"))&&void 0!==e?e:n(decodeURIComponent(t),"decoded url");if(i)return i}},94514:(t,e,i)=>{i.d(e,{f:()=>n});var s=i(37693),r=i.n(s);function n(t){return!r()(t)&&"attribute"===t.type}},26090:(t,e,i)=>{i.d(e,{t:()=>n});var s=i(37693),r=i.n(s);function n(t){return!r()(t)&&"attributeHierarchy"===t.type}},95296:(t,e,i)=>{i.d(e,{j:()=>n});var s=i(37693),r=i.n(s);function n(t){return!r()(t)&&"fact"===t.type}},39166:(t,e,i)=>{i.d(e,{m:()=>n});var s=i(37693),r=i.n(s);function n(t){return!r()(t)&&"measure"===t.type}},57408:(t,e,i)=>{i.d(e,{i_:()=>r}),i(73734);var s=i(18653);function r(t){return(0,s.J)(t)&&"displayForm"===t.type}},13096:(t,e,i)=>{i.d(e,{i:()=>r});var s=i(18653);function r(t){return(0,s.J)(t)&&"measure"===t.type}}}]);
//# sourceMappingURL=cbb76d86ad36d5366173.js.map