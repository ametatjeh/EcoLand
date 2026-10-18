var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,o)=>(o=n==null?{}:e(i(n)),l(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e),f=class{constructor(){this.container=null,this.initContainer(),this.initFlashListener()}initContainer(){if(typeof document>`u`)return;let e=document.getElementById(`ecozone-toast-container`);e||(e=document.createElement(`div`),e.id=`ecozone-toast-container`,e.className=`ecozone-toast-container`,e.setAttribute(`role`,`status`),e.setAttribute(`aria-live`,`polite`),document.body.appendChild(e)),this.container=e}initFlashListener(){if(typeof document>`u`)return;let e=()=>{let e=document.getElementById(`laravel-flash-success`);e&&e.dataset.message&&(this.saved(e.dataset.message),e.remove());let t=document.getElementById(`laravel-flash-error`);t&&t.dataset.message&&(this.error(`✕ Gagal menyimpan`,t.dataset.message),t.remove())};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e()}show({type:e=`success`,title:t=``,message:n=``,duration:r=3500,icon:i=null}){(!this.container||!document.body.contains(this.container))&&this.initContainer();let a=`${e}:${t}:${n}`;if(this._lastKey===a&&Date.now()-(this._lastTime||0)<600)return{dismiss:()=>{}};this._lastKey=a,this._lastTime=Date.now();let o=document.createElement(`div`);o.className=`ecotoast-item ecotoast-${e}`,o.setAttribute(`role`,`alert`);let s=``;s=i||(e===`success`?`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>`:e===`error`?`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>`:e===`warning`?`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`:`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
      </svg>`),o.innerHTML=`
      <div class="ecotoast-icon-box">${s}</div>
      <div class="ecotoast-body">
        <div class="ecotoast-title">${p(t)}</div>
        ${n?`<div class="ecotoast-desc">${p(n)}</div>`:``}
      </div>
      <button type="button" class="ecotoast-close" title="Tutup notifikasi" aria-label="Tutup">✕</button>
      <div class="ecotoast-bar" style="animation-duration: ${r}ms;"></div>
    `;let c=o.querySelector(`.ecotoast-close`),l=null,u=()=>{l&&clearTimeout(l),o.classList.add(`ecotoast-leave`),setTimeout(()=>{o.remove()},250)};return c.addEventListener(`click`,u),this.container.appendChild(o),r>0&&(l=setTimeout(u,r)),{dismiss:u}}saved(e=`Perubahan data telah tersimpan.`){return this.show({type:`success`,title:`✓ Berhasil disimpan`,message:e})}created(e=`Data baru berhasil disimpan.`){return this.show({type:`success`,title:`✓ Berhasil ditambahkan`,message:e})}updated(e=`Perubahan data berhasil disimpan.`){return this.show({type:`success`,title:`✓ Berhasil diperbarui`,message:e})}deleted(e=`Data berhasil dihapus.`){return this.show({type:`success`,title:`✓ Berhasil dihapus`,message:e})}published(e=`Perubahan berhasil dipublikasikan.`){return this.show({type:`success`,title:`✓ Berhasil dipublikasikan`,message:e})}imported(e=`Data telah berhasil diimpor.`){return this.show({type:`success`,title:`✓ Data berhasil diimpor`,message:e})}uploaded(e=`File dan metadata berhasil disimpan.`){return this.show({type:`success`,title:`✓ File berhasil diunggah`,message:e})}success(e=`✓ Berhasil disimpan`,t=``){return this.show({type:`success`,title:e.startsWith(`✓`)?e:`✓ ${e}`,message:t})}error(e=`✕ Gagal menyimpan`,t=`Data belum berhasil disimpan. Periksa kembali isian dan coba lagi.`){return this.show({type:`error`,title:e.startsWith(`✕`)?e:`✕ ${e}`,message:t,duration:4500})}warning(e=`Peringatan`,t=``){return this.show({type:`warning`,title:e,message:t,duration:4e3})}info(e=`Informasi`,t=``){return this.show({type:`info`,title:e,message:t})}};function p(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var m=new f;typeof window<`u`&&(window.EcoToast=m,window.showToast=e=>typeof e==`string`?m.success(e):m.show(e));var h={scenes:[{id:`0-1-pano_20261004_100402_6`,name:`1. PANO_20261004_100402_6`,sequence:1,status:`tersedia`,description:`Panorama titik 1 kawasan penanaman pohon. Terdapat info hotspot Pohon Scooby Doo.`,thumbnail:`/tiles/0-1-pano_20261004_100402_6/preview.jpg`,preview:`/tiles/0-1-pano_20261004_100402_6/preview.jpg`,latitude:5.48135,longitude:95.58355,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:.7176204122520318,pitch:.1800948515498284,fov:1.3945993259187417},linkHotspots:[{yaw:.03014976230538835,pitch:.02643290165309864,rotation:6.283185307179586,target:`1-2-pano_20261004_100722_7`}],infoHotspots:[{yaw:1.2666246510961905,pitch:-.19098522139040597,title:`Pohon Scooby Doo`,text:`<br>`}]},{id:`1-2-pano_20261004_100722_7`,name:`2. PANO_20261004_100722_7`,sequence:2,status:`tersedia`,description:`Panorama titik 2 kawasan penanaman pohon. Terdapat info hotspot Pesawat Tempur.`,thumbnail:`/tiles/1-2-pano_20261004_100722_7/preview.jpg`,preview:`/tiles/1-2-pano_20261004_100722_7/preview.jpg`,latitude:5.48168,longitude:95.5838,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:1.5115493233731163,pitch:.1525186886522647,fov:1.3945993259187417},linkHotspots:[{yaw:-2.8706929059681148,pitch:-.0448967639209954,rotation:6.283185307179586,target:`0-1-pano_20261004_100402_6`},{yaw:.7395703586489386,pitch:.11872788990518046,rotation:0,target:`2-3-pano_20261004_095925_3`}],infoHotspots:[{yaw:.22364720623081347,pitch:.16888656856956885,title:`Pesawat Tempur`,text:`Text`}]},{id:`2-3-pano_20261004_095925_3`,name:`3. PANO_20261004_095925_3`,sequence:3,status:`tersedia`,description:`Panorama titik 3 kawasan penanaman pohon. Terdapat info hotspot Senso Supra Natural dan Pintu Welcome.`,thumbnail:`/tiles/2-3-pano_20261004_095925_3/preview.jpg`,preview:`/tiles/2-3-pano_20261004_095925_3/preview.jpg`,latitude:5.4818556,longitude:95.5840917,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:.37979756719106206,pitch:.04846658243499746,fov:1.3945993259187417},linkHotspots:[{yaw:.8704408551624532,pitch:-.19419646834669102,rotation:0,target:`3-4-pano_20261004_101937_11`},{yaw:1.6976031542983385,pitch:-.049091771145560514,rotation:0,target:`1-2-pano_20261004_100722_7`}],infoHotspots:[{yaw:-1.864613716834878,pitch:.5266181755816888,title:`Senso Supra Natural`,text:`<br>`},{yaw:2.7863856727428384,pitch:.34442522583293567,title:`Pintu Welcome`,text:`Text`}]},{id:`3-4-pano_20261004_101937_11`,name:`4. PANO_20261004_101937_11`,sequence:4,status:`tersedia`,description:`Panorama titik 4 kawasan penanaman pohon. Terdapat info hotspot Master Magic.`,thumbnail:`/tiles/3-4-pano_20261004_101937_11/preview.jpg`,preview:`/tiles/3-4-pano_20261004_101937_11/preview.jpg`,latitude:5.48215,longitude:95.58435,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:.6722519287210993,pitch:.18301033113915643,fov:1.3945993259187417},linkHotspots:[{yaw:-1.4177896409400272,pitch:.3646449202319886,rotation:0,target:`2-3-pano_20261004_095925_3`},{yaw:.42228075410022115,pitch:.8020360851690533,rotation:0,target:`4-32-pano_20261004_095509_0`}],infoHotspots:[{yaw:-1.3435897200169489,pitch:.21857024197986874,title:`Master Magic`,text:`Supra Natural&nbsp;`}]},{id:`4-32-pano_20261004_095509_0`,name:`3.2 PANO_20261004_095509_0`,sequence:5,status:`tersedia`,description:`Panorama titik 3.2 kawasan penanaman pohon. Menghubungkan titik 3, titik 4, dan titik 5.`,thumbnail:`/tiles/4-32-pano_20261004_095509_0/preview.jpg`,preview:`/tiles/4-32-pano_20261004_095509_0/preview.jpg`,latitude:5.4821,longitude:95.58358,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{pitch:0,yaw:0,fov:1.5707963267948966},linkHotspots:[{yaw:-2.893554457411156,pitch:-.6963642143154054,rotation:0,target:`3-4-pano_20261004_101937_11`},{yaw:-2.0826598198117896,pitch:-.04552845778872339,rotation:0,target:`2-3-pano_20261004_095925_3`},{yaw:-.6788695978901487,pitch:.15160639748459914,rotation:0,target:`5-5-pano_20261004_103130_17-2`}],infoHotspots:[]},{id:`5-5-pano_20261004_103130_17-2`,name:`5. PANO_20261004_103130_17 (2)`,sequence:6,status:`tersedia`,description:`Panorama titik 5 kawasan penanaman pohon. Terdapat info hotspot Pengusaha Madu Rimba.`,thumbnail:`/tiles/5-5-pano_20261004_103130_17-2/preview.jpg`,preview:`/tiles/5-5-pano_20261004_103130_17-2/preview.jpg`,latitude:5.48242,longitude:95.5842,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:2.8857007275322193,pitch:-.238303625498979,fov:1.3945993259187417},linkHotspots:[{yaw:3.0154459565887812,pitch:-.46798372795382015,rotation:0,target:`3-4-pano_20261004_101937_11`},{yaw:2.155542466117045,pitch:-.16464652316926198,rotation:0,target:`0-1-pano_20261004_100402_6`}],infoHotspots:[{yaw:2.843260059526739,pitch:-.17250357376821412,title:`Pengusaha Madu Rimba`,text:`Madu Rimba`}]}],name:`IKHW`,settings:{mouseViewMode:`drag`,autorotateEnabled:!0,fullscreenButton:!1,viewControlButtons:!0}}.scenes.map(e=>({...e,initialView:e.initialViewParameters,panorama_path:`/tiles/${e.id}/preview.jpg`,panorama:`/tiles/${e.id}/preview.jpg`,connected_points:e.linkHotspots.map(e=>e.target)})),g={namaAplikasi:`Eco Land`,namaProyek:`Kawasan Penanaman Pohon`,subjudul:`Virtual Tour 360° Pemulihan Ekosistem & Silvikultur`,organisasi:`IKHW Aceh — Inisiatif Konservasi & Hutan Wakaf`,domain:`ikhw.org`,emailKontak:`info@ikhw.org`,luasDeskriptif:`±2 Hektare`,luasDetail:`Kurang lebih 20.000 m² (2 Hektare)`,targetBibit:`1.000+ Batang Pohon Lokal`,lokasiReferensi:{nama:`Titik Patok Referensi Acuan Kawasan`,latitude:5.4818556,longitude:95.5840917,sistemKoordinat:`WGS84 / EPSG:4326`,keterangan:`Koordinat titik acuan penanda lokasi lapangan (bukan poligon batas).`},deskripsi:`Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.`,tujuanProgram:[`Penghijauan dan pemulihan tutupan kanopi pohon pada lahan terbuka.`,`Pencegahan erosi tanah dan perbaikan tata kelola resapan air hujan.`,`Penyediaan koridor pakan alami bagi satwa liar dan burung lokal.`,`Edukasi publik melalui dokumentasi visual Virtual Tour 360° berkala.`],pengelola:{penanggungJawab:`Tim Konservasi & Pemulihan Ekosistem IKHW Aceh`,kontak:`info@ikhw.org`,lokasiAdministratif:`Provinsi Aceh, Indonesia`}},_=s(((e,t)=>{function n(){}n.prototype.addEventListener=function(e,t){var n=this.__events=this.__events||{},r=n[e]=n[e]||[];r.indexOf(t)<0&&r.push(t)},n.prototype.removeEventListener=function(e,t){var n=(this.__events=this.__events||{})[e];if(n){var r=n.indexOf(t);r>=0&&n.splice(r,1)}},n.prototype.emit=function(e,t){var n=(this.__events=this.__events||{})[e],r=Array.prototype.slice.call(arguments,1);if(n)for(var i=0;i<n.length;i++)n[i].apply(this,r)};function r(e){for(var t in n.prototype)n.prototype.hasOwnProperty(t)&&(e.prototype[t]=n.prototype[t])}t.exports=r})),v=s(((e,t)=>{function n(){return typeof performance<`u`&&performance.now?function(){return performance.now()}:function(){return Date.now()}}t.exports=n()})),y=s(((e,t)=>{var n=v();function r(e,t){this.fn=e,this.cb=t,this.cfn=null}function i(e){this._queue=[],this._delay=e&&e.delay||0,this._paused=e&&!!e.paused||!1,this._currentTask=null,this._lastFinished=null}i.prototype.length=function(){return this._queue.length},i.prototype.push=function(e,t){var n=new r(e,t),i=this._cancel.bind(this,n);return this._queue.push(n),this._next(),i},i.prototype.pause=function(){this._paused||=!0},i.prototype.resume=function(){this._paused&&(this._paused=!1,this._next())},i.prototype._start=function(e){if(this._currentTask)throw Error(`WorkQueue: called start while running task`);this._currentTask=e;var t=this._finish.bind(this,e);if(e.cfn=e.fn(t),typeof e.cfn!=`function`)throw Error(`WorkQueue: function is not cancellable`)},i.prototype._finish=function(e){var t=Array.prototype.slice.call(arguments,1);if(this._currentTask!==e)throw Error(`WorkQueue: called finish on wrong task`);e.cb.apply(null,t),this._currentTask=null,this._lastFinished=n(),this._next()},i.prototype._cancel=function(e){var t=Array.prototype.slice.call(arguments,1);if(this._currentTask===e)e.cfn.apply(null,t);else{var n=this._queue.indexOf(e);n>=0&&(this._queue.splice(n,1),e.cb.apply(null,t))}},i.prototype._next=function(){if(!this._paused&&this._queue.length&&!this._currentTask){if(this._lastFinished!=null){var e=n()-this._lastFinished,t=this._delay-e;if(t>0){setTimeout(this._next.bind(this),t);return}}var r=this._queue.shift();this._start(r)}},t.exports=i})),b=s(((e,t)=>{function n(e,t,n,r){r||={};var i=n!=null&&n.absoluteWidth!=null?n.absoluteWidth/e:n!=null&&n.relativeWidth!=null?n.relativeWidth:1,a=n&&n.absoluteHeight!=null?n.absoluteHeight/t:n!=null&&n.relativeHeight!=null?n.relativeHeight:1,o=n!=null&&n.absoluteX!=null?n.absoluteX/e:n!=null&&n.relativeX!=null?n.relativeX:0,s=n!=null&&n.absoluteY!=null?n.absoluteY/t:n!=null&&n.relativeY!=null?n.relativeY:0;return r.x=o,r.y=s,r.width=i,r.height=a,r}t.exports=n})),x=s(((e,t)=>{function n(e){return function(t){var n,r;try{r=e()}catch(e){n=e}finally{n?t(n):t(null,r)}}}t.exports=n})),S=s(((e,t)=>{function n(e){var t=!1,n;return function(){return t||(t=!0,n=e.apply(null,arguments)),n}}t.exports=n})),C=s(((e,t)=>{var n=S();function r(e){return function(){if(!arguments.length)throw Error(`cancelized: expected at least one argument`);var t=Array.prototype.slice.call(arguments,0),r=t[t.length-1]=n(t[t.length-1]);function i(){r.apply(null,arguments)}return e.apply(null,t),i}}t.exports=r})),w=s(((e,t)=>{function n(e){for(var t in e)e.hasOwnProperty(t)&&(e[t]=void 0)}t.exports=n})),T=s(((e,t)=>{function n(){this._renderers={}}n.prototype.set=function(e,t,n){this._renderers[e]||(this._renderers[e]={}),this._renderers[e][t]=n},n.prototype.get=function(e,t){return this._renderers[e]&&this._renderers[e][t]||null},t.exports=n})),E=s(((e,t)=>{var n=_(),r=y(),i=b(),a=x(),o=C(),s=w(),c=T();function l(e,t){return e.cmp(t)}function u(e,t){return-e.cmp(t)}function d(e){this._progressive=!!(e&&e.progressive),this._layers=[],this._renderers=[],this._tilesToLoad=[],this._tilesToRender=[],this._tmpVisible=[],this._tmpChildren=[],this._width=0,this._height=0,this._tmpRect={},this._tmpSize={},this._createTextureWorkQueue=new r,this._emitRenderInvalid=this._emitRenderInvalid.bind(this),this._rendererRegistry=new c}n(d),d.prototype.destroy=function(){this.removeAllLayers(),s(this)},d.prototype.registerRenderer=function(e,t,n){return this._rendererRegistry.set(e,t,n)},d.prototype.domElement=function(){throw Error(`Stage implementation must override domElement`)},d.prototype.width=function(){return this._width},d.prototype.height=function(){return this._height},d.prototype.size=function(e){return e||={},e.width=this._width,e.height=this._height,e},d.prototype.setSize=function(e){this._width=e.width,this._height=e.height,this.setSizeForType(),this.emit(`resize`),this._emitRenderInvalid()},d.prototype.setSizeForType=function(e){throw Error(`Stage implementation must override setSizeForType`)},d.prototype.loadImage=function(){throw Error(`Stage implementation must override loadImage`)},d.prototype._emitRenderInvalid=function(){this.emit(`renderInvalid`)},d.prototype.validateLayer=function(e){throw Error(`Stage implementation must override validateLayer`)},d.prototype.listLayers=function(){return[].concat(this._layers)},d.prototype.hasLayer=function(e){return this._layers.indexOf(e)>=0},d.prototype.addLayer=function(e,t){if(this._layers.indexOf(e)>=0)throw Error(`Layer already in stage`);if(t??=this._layers.length,t<0||t>this._layers.length)throw Error(`Invalid layer position`);this.validateLayer(e);var n=e.geometry().type,r=e.view().type,i=this._rendererRegistry.get(n,r);if(!i)throw Error(`No `+this.type+` renderer avaiable for `+n+` geometry and `+r+` view`);var a=this.createRenderer(i);this._layers.splice(t,0,e),this._renderers.splice(t,0,a),e.addEventListener(`viewChange`,this._emitRenderInvalid),e.addEventListener(`effectsChange`,this._emitRenderInvalid),e.addEventListener(`fixedLevelChange`,this._emitRenderInvalid),e.addEventListener(`textureStoreChange`,this._emitRenderInvalid),this._emitRenderInvalid()},d.prototype.moveLayer=function(e,t){var n=this._layers.indexOf(e);if(n<0)throw Error(`No such layer in stage`);if(t<0||t>=this._layers.length)throw Error(`Invalid layer position`);e=this._layers.splice(n,1)[0];var r=this._renderers.splice(n,1)[0];this._layers.splice(t,0,e),this._renderers.splice(t,0,r),this._emitRenderInvalid()},d.prototype.removeLayer=function(e){var t=this._layers.indexOf(e);if(t<0)throw Error(`No such layer in stage`);var n=this._layers.splice(t,1)[0],r=this._renderers.splice(t,1)[0];this.destroyRenderer(r),n.removeEventListener(`viewChange`,this._emitRenderInvalid),n.removeEventListener(`effectsChange`,this._emitRenderInvalid),n.removeEventListener(`fixedLevelChange`,this._emitRenderInvalid),n.removeEventListener(`textureStoreChange`,this._emitRenderInvalid),this._emitRenderInvalid()},d.prototype.removeAllLayers=function(){for(;this._layers.length>0;)this.removeLayer(this._layers[0])},d.prototype.startFrame=function(){throw Error(`Stage implementation must override startFrame`)},d.prototype.endFrame=function(){throw Error(`Stage implementation must override endFrame`)},d.prototype.render=function(){var e,t,n=this._tilesToLoad,r=this._tilesToRender,a=!0,o,s=this._width,c=this._height,l=this._tmpRect,u=this._tmpSize;if(!(s<=0||c<=0)){for(this.startFrame(),e=0;e<this._layers.length;e++)this._layers[e].textureStore().startFrame();for(e=0;e<this._layers.length;e++){var d=this._layers[e],f=d.effects(),p=d.view(),m=d.textureStore(),h=this._renderers[e],g=this._layers.length-e,_,v;if(i(s,c,f&&f.rect,l),!(l.width<=0||l.height<=0)){for(u.width=l.width*this._width,u.height=l.height*this._height,p.setSize(u),h.startLayer(d,l),o=this._collectTiles(d,m),t=0;t<n.length;t++)_=n[t],m.markTile(_);for(t=0;t<r.length;t++)_=r[t],v=m.texture(_),h.renderTile(_,v,d,g);d.emit(`renderComplete`,o),o||(a=!1),h.endLayer(d,l)}}for(e=0;e<this._layers.length;e++)this._layers[e].textureStore().endFrame();this.endFrame(),this.emit(`renderComplete`,a)}},d.prototype._collectTiles=function(e,t){var n=this._tilesToLoad,r=this._tilesToRender,i=this._tmpVisible;n.length=0,r.length=0,i.length=0,e.visibleTiles(i);for(var a=!0,o=0;o<i.length;o++){var s=i[o],c;this._collectTileToLoad(s),t.texture(s)?(c=!1,this._collectTileToRender(s)):(c=this._collectChildren(s,t),a=!1),this._collectParents(s,t,c)}return n.sort(l),r.sort(u),a},d.prototype._collectChildren=function(e,t){var n=this._tmpChildren,r=!0;do{if(n.length=0,!e.children(n))break;r=!1;for(var i=0;i<n.length;i++)e=n[i],t.texture(e)?(this._collectTileToLoad(e),this._collectTileToRender(e)):r=!0}while(r&&n.length===1);return r},d.prototype._collectParents=function(e,t,n){for(var r=this._progressive;(r||n)&&(e=e.parent())!=null;){if(n){if(t.texture(e))this._collectTileToRender(e),n=!1;else if(!this._progressive)continue}this._collectTileToLoad(e)||(r=!1)}return n},d.prototype._collectTileToLoad=function(e){return this._collectTileIntoList(e,this._tilesToLoad)},d.prototype._collectTileToRender=function(e){return this._collectTileIntoList(e,this._tilesToRender)},d.prototype._collectTileIntoList=function(e,t){for(var n=!1,r=0;r<t.length;r++)if(e.equals(t[r])){n=!0;break}return n||t.push(e),!n},d.prototype.createTexture=function(e,t,n){var r=this;function i(){return new r.TextureClass(r,e,t)}var s=o(a(i));return this._createTextureWorkQueue.push(s,function(r,i){n(r,e,t,i)})},t.exports=d})),D=s(((e,t)=>{t.exports=(function(){return typeof window<`u`?window:typeof self<`u`?self:typeof global<`u`?global:null})()})),O=s(((e,t)=>{var n=D(),r=_(),i=w(),a={HTMLImageElement:[`naturalWidth`,`naturalHeight`],HTMLCanvasElement:[`width`,`height`],ImageBitmap:[`width`,`height`]};function o(e){var t=!1;for(var r in a)if(n[r]&&e instanceof n[r]){t=!0,this._widthProp=a[r][0],this._heightProp=a[r][1];break}if(!t)throw Error(`Unsupported pixel source`);this._element=e}r(o),o.prototype.destroy=function(){i(this)},o.prototype.element=function(){return this._element},o.prototype.width=function(){return this._element[this._widthProp]},o.prototype.height=function(){return this._element[this._heightProp]},o.prototype.timestamp=function(){return 0},o.prototype.isDynamic=function(){return!1},t.exports=o})),k=s(((e,t)=>{function n(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}t.exports=n})),A=s(((e,t)=>{var n=k();function r(e){this.constructor.super_.apply(this,arguments),this.message=e}n(r,Error),t.exports=r})),j=s(((e,t)=>{(function(e,n,r){t!==void 0&&t.exports?t.exports=r():typeof define==`function`&&define.amd?define(n,r):e[n]=r()})(e,`bowser`,function(){function e(e){function t(t){var n=e.match(t);return n&&n.length>1&&n[1]||``}function n(t){var n=e.match(t);return n&&n.length>1&&n[2]||``}var r=t(/(ipod|iphone|ipad)/i).toLowerCase(),a=!/like android/i.test(e)&&/android/i.test(e),o=/nexus\s*[0-6]\s*/i.test(e),s=!o&&/nexus\s*[0-9]+/i.test(e),c=/CrOS/.test(e),l=/silk/i.test(e),u=/sailfish/i.test(e),d=/tizen/i.test(e),f=/(web|hpw)(o|0)s/i.test(e),p=/windows phone/i.test(e);/SamsungBrowser/i.test(e);var m=!p&&/windows/i.test(e),h=!r&&!l&&/macintosh/i.test(e),g=!a&&!u&&!d&&!f&&/linux/i.test(e),_=n(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),v=t(/version\/(\d+(\.\d+)?)/i),y=/tablet/i.test(e)&&!/tablet pc/i.test(e),b=!y&&/[^-]mobi/i.test(e),x=/xbox/i.test(e),S;/opera/i.test(e)?S={name:`Opera`,opera:!0,version:v||t(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}:/opr\/|opios/i.test(e)?S={name:`Opera`,opera:!0,version:t(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i)||v}:/SamsungBrowser/i.test(e)?S={name:`Samsung Internet for Android`,samsungBrowser:!0,version:v||t(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)}:/Whale/i.test(e)?S={name:`NAVER Whale browser`,whale:!0,version:t(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)}:/MZBrowser/i.test(e)?S={name:`MZ Browser`,mzbrowser:!0,version:t(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/coast/i.test(e)?S={name:`Opera Coast`,coast:!0,version:v||t(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}:/focus/i.test(e)?S={name:`Focus`,focus:!0,version:t(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)}:/yabrowser/i.test(e)?S={name:`Yandex Browser`,yandexbrowser:!0,version:v||t(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/ucbrowser/i.test(e)?S={name:`UC Browser`,ucbrowser:!0,version:t(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/mxios/i.test(e)?S={name:`Maxthon`,maxthon:!0,version:t(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/epiphany/i.test(e)?S={name:`Epiphany`,epiphany:!0,version:t(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}:/puffin/i.test(e)?S={name:`Puffin`,puffin:!0,version:t(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}:/sleipnir/i.test(e)?S={name:`Sleipnir`,sleipnir:!0,version:t(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}:/k-meleon/i.test(e)?S={name:`K-Meleon`,kMeleon:!0,version:t(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}:p?(S={name:`Windows Phone`,osname:`Windows Phone`,windowsphone:!0},_?(S.msedge=!0,S.version=_):(S.msie=!0,S.version=t(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(e)?S={name:`Internet Explorer`,msie:!0,version:t(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:c?S={name:`Chrome`,osname:`Chrome OS`,chromeos:!0,chromeBook:!0,chrome:!0,version:t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/edg([ea]|ios)/i.test(e)?S={name:`Microsoft Edge`,msedge:!0,version:_}:/vivaldi/i.test(e)?S={name:`Vivaldi`,vivaldi:!0,version:t(/vivaldi\/(\d+(\.\d+)?)/i)||v}:u?S={name:`Sailfish`,osname:`Sailfish OS`,sailfish:!0,version:t(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?S={name:`SeaMonkey`,seamonkey:!0,version:t(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(e)?(S={name:`Firefox`,firefox:!0,version:t(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(S.firefoxos=!0,S.osname=`Firefox OS`)):l?S={name:`Amazon Silk`,silk:!0,version:t(/silk\/(\d+(\.\d+)?)/i)}:/phantom/i.test(e)?S={name:`PhantomJS`,phantom:!0,version:t(/phantomjs\/(\d+(\.\d+)?)/i)}:/slimerjs/i.test(e)?S={name:`SlimerJS`,slimer:!0,version:t(/slimerjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?S={name:`BlackBerry`,osname:`BlackBerry OS`,blackberry:!0,version:v||t(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:f?(S={name:`WebOS`,osname:`WebOS`,webos:!0,version:v||t(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(S.touchpad=!0)):/bada/i.test(e)?S={name:`Bada`,osname:`Bada`,bada:!0,version:t(/dolfin\/(\d+(\.\d+)?)/i)}:d?S={name:`Tizen`,osname:`Tizen`,tizen:!0,version:t(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||v}:/qupzilla/i.test(e)?S={name:`QupZilla`,qupzilla:!0,version:t(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||v}:/chromium/i.test(e)?S={name:`Chromium`,chromium:!0,version:t(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||v}:/chrome|crios|crmo/i.test(e)?S={name:`Chrome`,chrome:!0,version:t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:a?S={name:`Android`,version:v}:/safari|applewebkit/i.test(e)?(S={name:`Safari`,safari:!0},v&&(S.version=v)):r?(S={name:r==`iphone`?`iPhone`:r==`ipad`?`iPad`:`iPod`},v&&(S.version=v)):S=/googlebot/i.test(e)?{name:`Googlebot`,googlebot:!0,version:t(/googlebot\/(\d+(\.\d+))/i)||v}:{name:t(/^(.*)\/(.*) /),version:n(/^(.*)\/(.*) /)},!S.msedge&&/(apple)?webkit/i.test(e)?(/(apple)?webkit\/537\.36/i.test(e)?(S.name=S.name||`Blink`,S.blink=!0):(S.name=S.name||`Webkit`,S.webkit=!0),!S.version&&v&&(S.version=v)):!S.opera&&/gecko\//i.test(e)&&(S.name=S.name||`Gecko`,S.gecko=!0,S.version=S.version||t(/gecko\/(\d+(\.\d+)?)/i)),!S.windowsphone&&(a||S.silk)?(S.android=!0,S.osname=`Android`):!S.windowsphone&&r?(S[r]=!0,S.ios=!0,S.osname=`iOS`):h?(S.mac=!0,S.osname=`macOS`):x?(S.xbox=!0,S.osname=`Xbox`):m?(S.windows=!0,S.osname=`Windows`):g&&(S.linux=!0,S.osname=`Linux`);function C(e){switch(e){case`NT`:return`NT`;case`XP`:return`XP`;case`NT 5.0`:return`2000`;case`NT 5.1`:return`XP`;case`NT 5.2`:return`2003`;case`NT 6.0`:return`Vista`;case`NT 6.1`:return`7`;case`NT 6.2`:return`8`;case`NT 6.3`:return`8.1`;case`NT 10.0`:return`10`;default:return}}var w=``;S.windows?w=C(t(/Windows ((NT|XP)( \d\d?.\d)?)/i)):S.windowsphone?w=t(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):S.mac?(w=t(/Mac OS X (\d+([_\.\s]\d+)*)/i),w=w.replace(/[_\s]/g,`.`)):r?(w=t(/os (\d+([_\s]\d+)*) like mac os x/i),w=w.replace(/[_\s]/g,`.`)):a?w=t(/android[ \/-](\d+(\.\d+)*)/i):S.webos?w=t(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):S.blackberry?w=t(/rim\stablet\sos\s(\d+(\.\d+)*)/i):S.bada?w=t(/bada\/(\d+(\.\d+)*)/i):S.tizen&&(w=t(/tizen[\/\s](\d+(\.\d+)*)/i)),w&&(S.osversion=w);var T=!S.windows&&w.split(`.`)[0];return y||s||r==`ipad`||a&&(T==3||T>=4&&!b)||S.silk?S.tablet=!0:(b||r==`iphone`||r==`ipod`||a||o||S.blackberry||S.webos||S.bada)&&(S.mobile=!0),S.msedge||S.msie&&S.version>=10||S.yandexbrowser&&S.version>=15||S.vivaldi&&S.version>=1||S.chrome&&S.version>=20||S.samsungBrowser&&S.version>=4||S.whale&&i([S.version,`1.0`])===1||S.mzbrowser&&i([S.version,`6.0`])===1||S.focus&&i([S.version,`1.0`])===1||S.firefox&&S.version>=20||S.safari&&S.version>=6||S.opera&&S.version>=10||S.ios&&S.osversion&&S.osversion.split(`.`)[0]>=6||S.blackberry&&S.version>=10.1||S.chromium&&S.version>=20?S.a=!0:S.msie&&S.version<10||S.chrome&&S.version<20||S.firefox&&S.version<20||S.safari&&S.version<6||S.opera&&S.version<10||S.ios&&S.osversion&&S.osversion.split(`.`)[0]<6||S.chromium&&S.version<20?S.c=!0:S.x=!0,S}var t=e(typeof navigator<`u`&&navigator.userAgent||``);t.test=function(e){for(var n=0;n<e.length;++n){var r=e[n];if(typeof r==`string`&&r in t)return!0}return!1};function n(e){return e.split(`.`).length}function r(e,t){var n=[],r;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r++)n.push(t(e[r]));return n}function i(e){for(var t=Math.max(n(e[0]),n(e[1])),i=r(e,function(e){var i=t-n(e);return e+=Array(i+1).join(`.0`),r(e.split(`.`),function(e){return Array(20-e.length).join(`0`)+e}).reverse()});--t>=0;)if(i[0][t]>i[1][t])return 1;else if(i[0][t]===i[1][t]){if(t===0)return 0}else return-1}function a(n,r,a){var o=t;typeof r==`string`&&(a=r,r=void 0),r===void 0&&(r=!1),a&&(o=e(a));var s=``+o.version;for(var c in n)if(n.hasOwnProperty(c)&&o[c]){if(typeof n[c]!=`string`)throw Error(`Browser version in the minVersion map should be a string: `+c+`: `+String(n));return i([s,n[c]])<0}return r}function o(e,t,n){return!a(e,t,n)}return t.isUnsupportedBrowser=a,t.compareVersions=i,t.check=o,t._detect=e,t.detect=e,t})})),M=s(((e,t)=>{var n=O(),r=A(),i=j(),a=D(),o=S(),s=!!a.createImageBitmap&&!i.firefox,c={imageOrientation:`flipY`,premultiplyAlpha:`premultiply`};function l(e){this._stage=e}l.prototype.loadImage=function(e,t,n){var r=this,i=new Image;i.crossOrigin=`anonymous`;var a=t&&t.x||0,s=t&&t.y||0,c=t&&t.width||1,l=t&&t.height||1;n=o(n),i.onload=function(){r._handleLoad(i,a,s,c,l,n)},i.onerror=function(){r._handleError(e,n)},i.src=e;function u(){i.onload=i.onerror=null,i.src=``,n.apply(null,arguments)}return u},l.prototype._handleLoad=function(e,t,r,i,o,l){if(t===0&&r===0&&i===1&&o===1)l(null,new n(e));else if(t*=e.naturalWidth,r*=e.naturalHeight,i*=e.naturalWidth,o*=e.naturalHeight,s)a.createImageBitmap(e,t,r,i,o,c).then(function(e){l(null,new n(e))});else{var u=document.createElement(`canvas`);u.width=i,u.height=o,u.getContext(`2d`).drawImage(e,t,r,i,o,0,0,i,o),l(null,new n(u))}},l.prototype._handleError=function(e,t){t(new r(`Network error: `+e))},t.exports=l})),ee=s(((e,t)=>{function n(){if(typeof window<`u`){if(window.devicePixelRatio)return window.devicePixelRatio;var e=window.screen;if(e&&e.deviceXDPI&&e.logicalXDPI)return e.deviceXDPI/e.logicalXDPI;if(e&&e.systemXDPI&&e.logicalXDPI)return e.systemXDPI/e.logicalXDPI}return 1}t.exports=n})),N=s(((e,t)=>{function n(e){return!(e&e-1)}t.exports=n})),P=s(((e,t)=>{function n(e){for(var t=document.documentElement.style,n=[`Moz`,`Webkit`,`Khtml`,`O`,`ms`],r=0;r<n.length;r++){var i=n[r]+(e[0].toUpperCase()+e.slice(1));if(i in t)return i}return e}function r(e){var t=n(e);return function(e){return e.style[t]}}function i(e){var t=n(e);return function(e,n){return e.style[t]=n}}var a=i(`transform`),o=i(`transformOrigin`);function s(e){a(e,`translateZ(0)`)}function c(e){o(e,`0 0 0`)}function l(e){e.style.position=`absolute`}function u(e,t,n){e.style.left=t+`px`,e.style.top=n+`px`}function d(e,t,n){e.style.width=t+`px`,e.style.height=n+`px`}function f(e){e.style.width=e.style.height=0}function p(e){e.style.width=e.style.height=`100%`}function m(e){e.style.overflow=`hidden`}function h(e){e.style.overflow=`visible`}function g(e){e.style.pointerEvents=`none`}t.exports={prefixProperty:n,getWithVendorPrefix:r,setWithVendorPrefix:i,setTransform:a,setTransformOrigin:o,setNullTransform:s,setNullTransformOrigin:c,setAbsolute:l,setPixelPosition:u,setPixelSize:d,setNullSize:f,setFullSize:p,setOverflowHidden:m,setOverflowVisible:h,setNoPointerEvents:g}})),F=s(((e,t)=>{var n=E(),r=M(),i=j(),a=k(),o=ee(),s=N(),c=P().setAbsolute,l=P().setFullSize,u=w(),d={videoUseTexImage2D:i.chrome};function f(e,t){var n={alpha:!0,premultipliedAlpha:!0,antialias:!!(t&&t.antialias),preserveDrawingBuffer:!!(t&&t.preserveDrawingBuffer)},r=e.getContext&&(e.getContext(`webgl`,n)||e.getContext(`experimental-webgl`,n));if(!r)throw Error(`Could not get WebGL context`);return t.wrapContext&&(r=t.wrapContext(r)),r}function p(e){e||={};var t=this;this.constructor.super_.call(this,e),this._generateMipmaps=e.generateMipmaps!=null&&e.generateMipmaps,this._loader=new r(this),this._domElement=document.createElement(`canvas`),c(this._domElement),l(this._domElement),this._gl=f(this._domElement,e),this._handleContextLoss=function(){t.emit(`webglcontextlost`),t._gl=null},this._domElement.addEventListener(`webglcontextlost`,this._handleContextLoss),this._rendererInstances=[]}a(p,n),p.prototype.destroy=function(){this._domElement.removeEventListener(`webglcontextlost`,this._handleContextLoss),this.constructor.super_.prototype.destroy.call(this)},p.prototype.domElement=function(){return this._domElement},p.prototype.webGlContext=function(){return this._gl},p.prototype.setSizeForType=function(){var e=o();this._domElement.width=e*this._width,this._domElement.height=e*this._height},p.prototype.loadImage=function(e,t,n){return this._loader.loadImage(e,t,n)},p.prototype.maxTextureSize=function(){return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE)},p.prototype.validateLayer=function(e){var t=e.geometry().maxTileSize(),n=this.maxTextureSize();if(t>n)throw Error(`Layer has level with tile size larger than maximum texture size (`+t+` vs. `+n+`)`)},p.prototype.createRenderer=function(e){for(var t=this._rendererInstances,n=0;n<t.length;n++)if(t[n]instanceof e)return t[n];var r=new e(this._gl);return t.push(r),r},p.prototype.destroyRenderer=function(e){var t=this._rendererInstances;if(this._renderers.indexOf(e)<0){e.destroy();var n=t.indexOf(e);n>=0&&t.splice(n,1)}},p.prototype.startFrame=function(){var e=this._gl;if(!e)throw Error(`Bad WebGL context - maybe context was lost?`);e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA)},p.prototype.endFrame=function(){},p.prototype.takeSnapshot=function(e){(typeof e!=`object`||!e)&&(e={});var t=e.quality;if(t===void 0&&(t=75),typeof t!=`number`||t<0||t>100)throw Error(`WebGLStage: Snapshot quality needs to be a number between 0 and 100`);return this.render(),this._domElement.toDataURL(`image/jpeg`,t/100)},p.type=p.prototype.type=`webgl`;function m(e,t,n){this._stage=e,this._gl=e._gl,this._texture=null,this._timestamp=null,this._width=this._height=null,this.refresh(t,n)}m.prototype.refresh=function(e,t){var n=this._gl,r=this._stage,i,a=t.timestamp();if(a!==this._timestamp){var o=t.element(),c=t.width(),l=t.height();if(c!==this._width||l!==this._height){var u=r.maxTextureSize();if(c>u)throw Error(`Texture width larger than max size (`+c+` vs. `+u+`)`);if(l>u)throw Error(`Texture height larger than max size (`+l+` vs. `+u+`)`);this._texture&&n.deleteTexture(i),i=this._texture=n.createTexture(),n.bindTexture(n.TEXTURE_2D,i),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,o)}else i=this._texture,n.bindTexture(n.TEXTURE_2D,i),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),o instanceof HTMLVideoElement&&d.videoUseTexImage2D?n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,o):n.texSubImage2D(n.TEXTURE_2D,0,0,0,n.RGBA,n.UNSIGNED_BYTE,o);r._generateMipmaps&&s(c)&&s(l)?(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.TEXTURE_2D)):(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR)),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.bindTexture(n.TEXTURE_2D,null),this._timestamp=a,this._width=c,this._height=l}},m.prototype.destroy=function(){this._texture&&this._gl.deleteTexture(this._texture),u(this)},p.TextureClass=p.prototype.TextureClass=m,t.exports=p})),te=c({ARRAY_TYPE:()=>V,EPSILON:()=>B,RANDOM:()=>H,equals:()=>z,setMatrixArrayType:()=>I,toRadian:()=>R});function I(e){V=e}function R(e){return e*ne}function z(e,t){return Math.abs(e-t)<=B*Math.max(1,Math.abs(e),Math.abs(t))}var B,V,H,ne,U=o((()=>{B=1e-6,V=typeof Float32Array<`u`?Float32Array:Array,H=Math.random,ne=Math.PI/180,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)})})),re=c({LDU:()=>xe,add:()=>Se,adjoint:()=>fe,clone:()=>ae,copy:()=>oe,create:()=>ie,determinant:()=>pe,equals:()=>Te,exactEquals:()=>we,frob:()=>be,fromRotation:()=>_e,fromScaling:()=>ve,fromValues:()=>ce,identity:()=>se,invert:()=>de,mul:()=>Oe,multiply:()=>me,multiplyScalar:()=>Ee,multiplyScalarAndAdd:()=>De,rotate:()=>he,scale:()=>ge,set:()=>le,str:()=>ye,sub:()=>ke,subtract:()=>Ce,transpose:()=>ue});function ie(){var e=new V(4);return V!=Float32Array&&(e[1]=0,e[2]=0),e[0]=1,e[3]=1,e}function ae(e){var t=new V(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function oe(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function se(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e}function ce(e,t,n,r){var i=new V(4);return i[0]=e,i[1]=t,i[2]=n,i[3]=r,i}function le(e,t,n,r,i){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e}function ue(e,t){if(e===t){var n=t[1];e[1]=t[2],e[2]=n}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e}function de(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*a-i*r;return o?(o=1/o,e[0]=a*o,e[1]=-r*o,e[2]=-i*o,e[3]=n*o,e):null}function fe(e,t){var n=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=n,e}function pe(e){return e[0]*e[3]-e[2]*e[1]}function me(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*s+a*c,e[1]=i*s+o*c,e[2]=r*l+a*u,e[3]=i*l+o*u,e}function he(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c+a*s,e[1]=i*c+o*s,e[2]=r*-s+a*c,e[3]=i*-s+o*c,e}function ge(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1];return e[0]=r*s,e[1]=i*s,e[2]=a*c,e[3]=o*c,e}function _e(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=-n,e[3]=r,e}function ve(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e}function ye(e){return`mat2(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`)`}function be(e){return Math.hypot(e[0],e[1],e[2],e[3])}function xe(e,t,n,r){return e[2]=r[2]/r[0],n[0]=r[0],n[1]=r[1],n[3]=r[3]-e[2]*n[1],[e,t,n]}function Se(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e}function Ce(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e}function we(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function Te(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=t[0],s=t[1],c=t[2],l=t[3];return Math.abs(n-o)<=1e-6*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(r-s)<=1e-6*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(i-c)<=1e-6*Math.max(1,Math.abs(i),Math.abs(c))&&Math.abs(a-l)<=1e-6*Math.max(1,Math.abs(a),Math.abs(l))}function Ee(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e}function De(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e}var Oe,ke,Ae=o((()=>{U(),Oe=me,ke=Ce})),je=c({add:()=>Je,clone:()=>Ne,copy:()=>Pe,create:()=>Me,determinant:()=>ze,equals:()=>$e,exactEquals:()=>Qe,frob:()=>qe,fromRotation:()=>We,fromScaling:()=>Ge,fromTranslation:()=>W,fromValues:()=>Ie,identity:()=>Fe,invert:()=>Re,mul:()=>et,multiply:()=>Be,multiplyScalar:()=>Xe,multiplyScalarAndAdd:()=>Ze,rotate:()=>Ve,scale:()=>He,set:()=>Le,str:()=>Ke,sub:()=>tt,subtract:()=>Ye,translate:()=>Ue});function Me(){var e=new V(6);return V!=Float32Array&&(e[1]=0,e[2]=0,e[4]=0,e[5]=0),e[0]=1,e[3]=1,e}function Ne(e){var t=new V(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t}function Pe(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e}function Fe(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e}function Ie(e,t,n,r,i,a){var o=new V(6);return o[0]=e,o[1]=t,o[2]=n,o[3]=r,o[4]=i,o[5]=a,o}function Le(e,t,n,r,i,a,o){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e}function Re(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=n*a-r*i;return c?(c=1/c,e[0]=a*c,e[1]=-r*c,e[2]=-i*c,e[3]=n*c,e[4]=(i*s-a*o)*c,e[5]=(r*o-n*s)*c,e):null}function ze(e){return e[0]*e[3]-e[1]*e[2]}function Be(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=n[0],u=n[1],d=n[2],f=n[3],p=n[4],m=n[5];return e[0]=r*l+a*u,e[1]=i*l+o*u,e[2]=r*d+a*f,e[3]=i*d+o*f,e[4]=r*p+a*m+s,e[5]=i*p+o*m+c,e}function Ve(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=Math.sin(n),u=Math.cos(n);return e[0]=r*u+a*l,e[1]=i*u+o*l,e[2]=r*-l+a*u,e[3]=i*-l+o*u,e[4]=s,e[5]=c,e}function He(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=n[0],u=n[1];return e[0]=r*l,e[1]=i*l,e[2]=a*u,e[3]=o*u,e[4]=s,e[5]=c,e}function Ue(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=n[0],u=n[1];return e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=r*l+a*u+s,e[5]=i*l+o*u+c,e}function We(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=-n,e[3]=r,e[4]=0,e[5]=0,e}function Ge(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e[4]=0,e[5]=0,e}function W(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=t[0],e[5]=t[1],e}function Ke(e){return`mat2d(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`)`}function qe(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],1)}function Je(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e}function Ye(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e[4]=t[4]-n[4],e[5]=t[5]-n[5],e}function Xe(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e}function Ze(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e[4]=t[4]+n[4]*r,e[5]=t[5]+n[5]*r,e}function Qe(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]}function $e(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=t[0],l=t[1],u=t[2],d=t[3],f=t[4],p=t[5];return Math.abs(n-c)<=1e-6*Math.max(1,Math.abs(n),Math.abs(c))&&Math.abs(r-l)<=1e-6*Math.max(1,Math.abs(r),Math.abs(l))&&Math.abs(i-u)<=1e-6*Math.max(1,Math.abs(i),Math.abs(u))&&Math.abs(a-d)<=1e-6*Math.max(1,Math.abs(a),Math.abs(d))&&Math.abs(o-f)<=1e-6*Math.max(1,Math.abs(o),Math.abs(f))&&Math.abs(s-p)<=1e-6*Math.max(1,Math.abs(s),Math.abs(p))}var et,tt,nt=o((()=>{U(),et=Be,tt=Ye})),rt=c({add:()=>Tt,adjoint:()=>pt,clone:()=>ot,copy:()=>st,create:()=>it,determinant:()=>mt,equals:()=>At,exactEquals:()=>kt,frob:()=>wt,fromMat2d:()=>bt,fromMat4:()=>at,fromQuat:()=>q,fromRotation:()=>vt,fromScaling:()=>yt,fromTranslation:()=>_t,fromValues:()=>ct,identity:()=>ut,invert:()=>ft,mul:()=>jt,multiply:()=>ht,multiplyScalar:()=>Dt,multiplyScalarAndAdd:()=>Ot,normalFromMat4:()=>xt,projection:()=>St,rotate:()=>G,scale:()=>K,set:()=>lt,str:()=>Ct,sub:()=>Mt,subtract:()=>Et,translate:()=>gt,transpose:()=>dt});function it(){var e=new V(9);return V!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function at(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function ot(e){var t=new V(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function st(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function ct(e,t,n,r,i,a,o,s,c){var l=new V(9);return l[0]=e,l[1]=t,l[2]=n,l[3]=r,l[4]=i,l[5]=a,l[6]=o,l[7]=s,l[8]=c,l}function lt(e,t,n,r,i,a,o,s,c,l){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e[6]=s,e[7]=c,e[8]=l,e}function ut(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function dt(e,t){if(e===t){var n=t[1],r=t[2],i=t[5];e[1]=t[3],e[2]=t[6],e[3]=n,e[5]=t[7],e[6]=r,e[7]=i}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e}function ft(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=u*o-s*l,f=-u*a+s*c,p=l*a-o*c,m=n*d+r*f+i*p;return m?(m=1/m,e[0]=d*m,e[1]=(-u*r+i*l)*m,e[2]=(s*r-i*o)*m,e[3]=f*m,e[4]=(u*n-i*c)*m,e[5]=(-s*n+i*a)*m,e[6]=p*m,e[7]=(-l*n+r*c)*m,e[8]=(o*n-r*a)*m,e):null}function pt(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8];return e[0]=o*u-s*l,e[1]=i*l-r*u,e[2]=r*s-i*o,e[3]=s*c-a*u,e[4]=n*u-i*c,e[5]=i*a-n*s,e[6]=a*l-o*c,e[7]=r*c-n*l,e[8]=n*o-r*a,e}function mt(e){var t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*(l*a-o*c)+n*(-l*i+o*s)+r*(c*i-a*s)}function ht(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=n[0],p=n[1],m=n[2],h=n[3],g=n[4],_=n[5],v=n[6],y=n[7],b=n[8];return e[0]=f*r+p*o+m*l,e[1]=f*i+p*s+m*u,e[2]=f*a+p*c+m*d,e[3]=h*r+g*o+_*l,e[4]=h*i+g*s+_*u,e[5]=h*a+g*c+_*d,e[6]=v*r+y*o+b*l,e[7]=v*i+y*s+b*u,e[8]=v*a+y*c+b*d,e}function gt(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=n[0],p=n[1];return e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=s,e[5]=c,e[6]=f*r+p*o+l,e[7]=f*i+p*s+u,e[8]=f*a+p*c+d,e}function G(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=Math.sin(n),p=Math.cos(n);return e[0]=p*r+f*o,e[1]=p*i+f*s,e[2]=p*a+f*c,e[3]=p*o-f*r,e[4]=p*s-f*i,e[5]=p*c-f*a,e[6]=l,e[7]=u,e[8]=d,e}function K(e,t,n){var r=n[0],i=n[1];return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=i*t[3],e[4]=i*t[4],e[5]=i*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function _t(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=t[0],e[7]=t[1],e[8]=1,e}function vt(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=0,e[3]=-n,e[4]=r,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function yt(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=t[1],e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function bt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e}function q(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n+n,s=r+r,c=i+i,l=n*o,u=r*o,d=r*s,f=i*o,p=i*s,m=i*c,h=a*o,g=a*s,_=a*c;return e[0]=1-d-m,e[3]=u-_,e[6]=f+g,e[1]=u+_,e[4]=1-l-m,e[7]=p-h,e[2]=f-g,e[5]=p+h,e[8]=1-l-d,e}function xt(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(c*E-o*k-l*T)*A,e[2]=(o*O-s*E+l*w)*A,e[3]=(i*O-r*k-a*D)*A,e[4]=(n*k-i*E+a*T)*A,e[5]=(r*E-n*O-a*w)*A,e[6]=(h*C-g*S+_*x)*A,e[7]=(g*b-m*C-_*y)*A,e[8]=(m*S-h*b+_*v)*A,e):null}function St(e,t,n){return e[0]=2/t,e[1]=0,e[2]=0,e[3]=0,e[4]=-2/n,e[5]=0,e[6]=-1,e[7]=1,e[8]=1,e}function Ct(e){return`mat3(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`, `+e[6]+`, `+e[7]+`, `+e[8]+`)`}function wt(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}function Tt(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e[6]=t[6]+n[6],e[7]=t[7]+n[7],e[8]=t[8]+n[8],e}function Et(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e[4]=t[4]-n[4],e[5]=t[5]-n[5],e[6]=t[6]-n[6],e[7]=t[7]-n[7],e[8]=t[8]-n[8],e}function Dt(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*n,e}function Ot(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e[4]=t[4]+n[4]*r,e[5]=t[5]+n[5]*r,e[6]=t[6]+n[6]*r,e[7]=t[7]+n[7]*r,e[8]=t[8]+n[8]*r,e}function kt(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]}function At(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=e[6],l=e[7],u=e[8],d=t[0],f=t[1],p=t[2],m=t[3],h=t[4],g=t[5],_=t[6],v=t[7],y=t[8];return Math.abs(n-d)<=1e-6*Math.max(1,Math.abs(n),Math.abs(d))&&Math.abs(r-f)<=1e-6*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(i-p)<=1e-6*Math.max(1,Math.abs(i),Math.abs(p))&&Math.abs(a-m)<=1e-6*Math.max(1,Math.abs(a),Math.abs(m))&&Math.abs(o-h)<=1e-6*Math.max(1,Math.abs(o),Math.abs(h))&&Math.abs(s-g)<=1e-6*Math.max(1,Math.abs(s),Math.abs(g))&&Math.abs(c-_)<=1e-6*Math.max(1,Math.abs(c),Math.abs(_))&&Math.abs(l-v)<=1e-6*Math.max(1,Math.abs(l),Math.abs(v))&&Math.abs(u-y)<=1e-6*Math.max(1,Math.abs(u),Math.abs(y))}var jt,Mt,Nt=o((()=>{U(),jt=ht,Mt=Et})),Pt=c({add:()=>vn,adjoint:()=>J,clone:()=>It,copy:()=>Lt,create:()=>Ft,determinant:()=>Ut,equals:()=>Cn,exactEquals:()=>Sn,frob:()=>_n,fromQuat:()=>ln,fromQuat2:()=>rn,fromRotation:()=>Qt,fromRotationTranslation:()=>nn,fromRotationTranslationScale:()=>sn,fromRotationTranslationScaleOrigin:()=>cn,fromScaling:()=>Zt,fromTranslation:()=>Xt,fromValues:()=>Rt,fromXRotation:()=>$t,fromYRotation:()=>en,fromZRotation:()=>tn,frustum:()=>un,getRotation:()=>X,getScaling:()=>on,getTranslation:()=>an,identity:()=>Bt,invert:()=>Ht,lookAt:()=>mn,mul:()=>wn,multiply:()=>Y,multiplyScalar:()=>bn,multiplyScalarAndAdd:()=>xn,ortho:()=>pn,perspective:()=>dn,perspectiveFromFieldOfView:()=>fn,rotate:()=>Kt,rotateX:()=>qt,rotateY:()=>Jt,rotateZ:()=>Yt,scale:()=>Gt,set:()=>zt,str:()=>gn,sub:()=>Tn,subtract:()=>yn,targetTo:()=>hn,translate:()=>Wt,transpose:()=>Vt});function Ft(){var e=new V(16);return V!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function It(e){var t=new V(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Lt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Rt(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){var g=new V(16);return g[0]=e,g[1]=t,g[2]=n,g[3]=r,g[4]=i,g[5]=a,g[6]=o,g[7]=s,g[8]=c,g[9]=l,g[10]=u,g[11]=d,g[12]=f,g[13]=p,g[14]=m,g[15]=h,g}function zt(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e[6]=s,e[7]=c,e[8]=l,e[9]=u,e[10]=d,e[11]=f,e[12]=p,e[13]=m,e[14]=h,e[15]=g,e}function Bt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Vt(e,t){if(e===t){var n=t[1],r=t[2],i=t[3],a=t[6],o=t[7],s=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=n,e[6]=t[9],e[7]=t[13],e[8]=r,e[9]=a,e[11]=t[14],e[12]=i,e[13]=o,e[14]=s}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e}function Ht(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(i*O-r*k-a*D)*A,e[2]=(h*C-g*S+_*x)*A,e[3]=(f*S-d*C-p*x)*A,e[4]=(c*E-o*k-l*T)*A,e[5]=(n*k-i*E+a*T)*A,e[6]=(g*b-m*C-_*y)*A,e[7]=(u*C-f*b+p*y)*A,e[8]=(o*O-s*E+l*w)*A,e[9]=(r*E-n*O-a*w)*A,e[10]=(m*S-h*b+_*v)*A,e[11]=(d*b-u*S-p*v)*A,e[12]=(s*T-o*D-c*w)*A,e[13]=(n*D-r*T+i*w)*A,e[14]=(h*y-m*x-g*v)*A,e[15]=(u*x-d*y+f*v)*A,e):null}function J(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15];return e[0]=s*(f*_-p*g)-d*(c*_-l*g)+h*(c*p-l*f),e[1]=-(r*(f*_-p*g)-d*(i*_-a*g)+h*(i*p-a*f)),e[2]=r*(c*_-l*g)-s*(i*_-a*g)+h*(i*l-a*c),e[3]=-(r*(c*p-l*f)-s*(i*p-a*f)+d*(i*l-a*c)),e[4]=-(o*(f*_-p*g)-u*(c*_-l*g)+m*(c*p-l*f)),e[5]=n*(f*_-p*g)-u*(i*_-a*g)+m*(i*p-a*f),e[6]=-(n*(c*_-l*g)-o*(i*_-a*g)+m*(i*l-a*c)),e[7]=n*(c*p-l*f)-o*(i*p-a*f)+u*(i*l-a*c),e[8]=o*(d*_-p*h)-u*(s*_-l*h)+m*(s*p-l*d),e[9]=-(n*(d*_-p*h)-u*(r*_-a*h)+m*(r*p-a*d)),e[10]=n*(s*_-l*h)-o*(r*_-a*h)+m*(r*l-a*s),e[11]=-(n*(s*p-l*d)-o*(r*p-a*d)+u*(r*l-a*s)),e[12]=-(o*(d*g-f*h)-u*(s*g-c*h)+m*(s*f-c*d)),e[13]=n*(d*g-f*h)-u*(r*g-i*h)+m*(r*f-i*d),e[14]=-(n*(s*g-c*h)-o*(r*g-i*h)+m*(r*c-i*s)),e[15]=n*(s*f-c*d)-o*(r*f-i*d)+u*(r*c-i*s),e}function Ut(e){var t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m;return _*(d*g-f*h)-v*D+y*E+b*T-x*w+S*C}function Y(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=t[9],p=t[10],m=t[11],h=t[12],g=t[13],_=t[14],v=t[15],y=n[0],b=n[1],x=n[2],S=n[3];return e[0]=y*r+b*s+x*d+S*h,e[1]=y*i+b*c+x*f+S*g,e[2]=y*a+b*l+x*p+S*_,e[3]=y*o+b*u+x*m+S*v,y=n[4],b=n[5],x=n[6],S=n[7],e[4]=y*r+b*s+x*d+S*h,e[5]=y*i+b*c+x*f+S*g,e[6]=y*a+b*l+x*p+S*_,e[7]=y*o+b*u+x*m+S*v,y=n[8],b=n[9],x=n[10],S=n[11],e[8]=y*r+b*s+x*d+S*h,e[9]=y*i+b*c+x*f+S*g,e[10]=y*a+b*l+x*p+S*_,e[11]=y*o+b*u+x*m+S*v,y=n[12],b=n[13],x=n[14],S=n[15],e[12]=y*r+b*s+x*d+S*h,e[13]=y*i+b*c+x*f+S*g,e[14]=y*a+b*l+x*p+S*_,e[15]=y*o+b*u+x*m+S*v,e}function Wt(e,t,n){var r=n[0],i=n[1],a=n[2],o,s,c,l,u,d,f,p,m,h,g,_;return t===e?(e[12]=t[0]*r+t[4]*i+t[8]*a+t[12],e[13]=t[1]*r+t[5]*i+t[9]*a+t[13],e[14]=t[2]*r+t[6]*i+t[10]*a+t[14],e[15]=t[3]*r+t[7]*i+t[11]*a+t[15]):(o=t[0],s=t[1],c=t[2],l=t[3],u=t[4],d=t[5],f=t[6],p=t[7],m=t[8],h=t[9],g=t[10],_=t[11],e[0]=o,e[1]=s,e[2]=c,e[3]=l,e[4]=u,e[5]=d,e[6]=f,e[7]=p,e[8]=m,e[9]=h,e[10]=g,e[11]=_,e[12]=o*r+u*i+m*a+t[12],e[13]=s*r+d*i+h*a+t[13],e[14]=c*r+f*i+g*a+t[14],e[15]=l*r+p*i+_*a+t[15]),e}function Gt(e,t,n){var r=n[0],i=n[1],a=n[2];return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*a,e[9]=t[9]*a,e[10]=t[10]*a,e[11]=t[11]*a,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Kt(e,t,n,r){var i=r[0],a=r[1],o=r[2],s=Math.hypot(i,a,o),c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;return s<1e-6?null:(s=1/s,i*=s,a*=s,o*=s,c=Math.sin(n),l=Math.cos(n),u=1-l,d=t[0],f=t[1],p=t[2],m=t[3],h=t[4],g=t[5],_=t[6],v=t[7],y=t[8],b=t[9],x=t[10],S=t[11],C=i*i*u+l,w=a*i*u+o*c,T=o*i*u-a*c,E=i*a*u-o*c,D=a*a*u+l,O=o*a*u+i*c,k=i*o*u+a*c,A=a*o*u-i*c,j=o*o*u+l,e[0]=d*C+h*w+y*T,e[1]=f*C+g*w+b*T,e[2]=p*C+_*w+x*T,e[3]=m*C+v*w+S*T,e[4]=d*E+h*D+y*O,e[5]=f*E+g*D+b*O,e[6]=p*E+_*D+x*O,e[7]=m*E+v*D+S*O,e[8]=d*k+h*A+y*j,e[9]=f*k+g*A+b*j,e[10]=p*k+_*A+x*j,e[11]=m*k+v*A+S*j,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function qt(e,t,n){var r=Math.sin(n),i=Math.cos(n),a=t[4],o=t[5],s=t[6],c=t[7],l=t[8],u=t[9],d=t[10],f=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=a*i+l*r,e[5]=o*i+u*r,e[6]=s*i+d*r,e[7]=c*i+f*r,e[8]=l*i-a*r,e[9]=u*i-o*r,e[10]=d*i-s*r,e[11]=f*i-c*r,e}function Jt(e,t,n){var r=Math.sin(n),i=Math.cos(n),a=t[0],o=t[1],s=t[2],c=t[3],l=t[8],u=t[9],d=t[10],f=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*i-l*r,e[1]=o*i-u*r,e[2]=s*i-d*r,e[3]=c*i-f*r,e[8]=a*r+l*i,e[9]=o*r+u*i,e[10]=s*r+d*i,e[11]=c*r+f*i,e}function Yt(e,t,n){var r=Math.sin(n),i=Math.cos(n),a=t[0],o=t[1],s=t[2],c=t[3],l=t[4],u=t[5],d=t[6],f=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*i+l*r,e[1]=o*i+u*r,e[2]=s*i+d*r,e[3]=c*i+f*r,e[4]=l*i-a*r,e[5]=u*i-o*r,e[6]=d*i-s*r,e[7]=f*i-c*r,e}function Xt(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1,e}function Zt(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Qt(e,t,n){var r=n[0],i=n[1],a=n[2],o=Math.hypot(r,i,a),s,c,l;return o<1e-6?null:(o=1/o,r*=o,i*=o,a*=o,s=Math.sin(t),c=Math.cos(t),l=1-c,e[0]=r*r*l+c,e[1]=i*r*l+a*s,e[2]=a*r*l-i*s,e[3]=0,e[4]=r*i*l-a*s,e[5]=i*i*l+c,e[6]=a*i*l+r*s,e[7]=0,e[8]=r*a*l+i*s,e[9]=i*a*l-r*s,e[10]=a*a*l+c,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e)}function $t(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=r,e[6]=n,e[7]=0,e[8]=0,e[9]=-n,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function en(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=0,e[2]=-n,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=n,e[9]=0,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function tn(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=0,e[3]=0,e[4]=-n,e[5]=r,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function nn(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=r+r,c=i+i,l=a+a,u=r*s,d=r*c,f=r*l,p=i*c,m=i*l,h=a*l,g=o*s,_=o*c,v=o*l;return e[0]=1-(p+h),e[1]=d+v,e[2]=f-_,e[3]=0,e[4]=d-v,e[5]=1-(u+h),e[6]=m+g,e[7]=0,e[8]=f+_,e[9]=m-g,e[10]=1-(u+p),e[11]=0,e[12]=n[0],e[13]=n[1],e[14]=n[2],e[15]=1,e}function rn(e,t){var n=new V(3),r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=r*r+i*i+a*a+o*o;return d>0?(n[0]=(s*o+u*r+c*a-l*i)*2/d,n[1]=(c*o+u*i+l*r-s*a)*2/d,n[2]=(l*o+u*a+s*i-c*r)*2/d):(n[0]=(s*o+u*r+c*a-l*i)*2,n[1]=(c*o+u*i+l*r-s*a)*2,n[2]=(l*o+u*a+s*i-c*r)*2),nn(e,t,n),e}function an(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function on(e,t){var n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10];return e[0]=Math.hypot(n,r,i),e[1]=Math.hypot(a,o,s),e[2]=Math.hypot(c,l,u),e}function X(e,t){var n=new V(3);on(n,t);var r=1/n[0],i=1/n[1],a=1/n[2],o=t[0]*r,s=t[1]*i,c=t[2]*a,l=t[4]*r,u=t[5]*i,d=t[6]*a,f=t[8]*r,p=t[9]*i,m=t[10]*a,h=o+u+m,g=0;return h>0?(g=Math.sqrt(h+1)*2,e[3]=.25*g,e[0]=(d-p)/g,e[1]=(f-c)/g,e[2]=(s-l)/g):o>u&&o>m?(g=Math.sqrt(1+o-u-m)*2,e[3]=(d-p)/g,e[0]=.25*g,e[1]=(s+l)/g,e[2]=(f+c)/g):u>m?(g=Math.sqrt(1+u-o-m)*2,e[3]=(f-c)/g,e[0]=(s+l)/g,e[1]=.25*g,e[2]=(d+p)/g):(g=Math.sqrt(1+m-o-u)*2,e[3]=(s-l)/g,e[0]=(f+c)/g,e[1]=(d+p)/g,e[2]=.25*g),e}function sn(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3],c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=r[0],x=r[1],S=r[2];return e[0]=(1-(m+g))*b,e[1]=(f+y)*b,e[2]=(p-v)*b,e[3]=0,e[4]=(f-y)*x,e[5]=(1-(d+g))*x,e[6]=(h+_)*x,e[7]=0,e[8]=(p+v)*S,e[9]=(h-_)*S,e[10]=(1-(d+m))*S,e[11]=0,e[12]=n[0],e[13]=n[1],e[14]=n[2],e[15]=1,e}function cn(e,t,n,r,i){var a=t[0],o=t[1],s=t[2],c=t[3],l=a+a,u=o+o,d=s+s,f=a*l,p=a*u,m=a*d,h=o*u,g=o*d,_=s*d,v=c*l,y=c*u,b=c*d,x=r[0],S=r[1],C=r[2],w=i[0],T=i[1],E=i[2],D=(1-(h+_))*x,O=(p+b)*x,k=(m-y)*x,A=(p-b)*S,j=(1-(f+_))*S,M=(g+v)*S,ee=(m+y)*C,N=(g-v)*C,P=(1-(f+h))*C;return e[0]=D,e[1]=O,e[2]=k,e[3]=0,e[4]=A,e[5]=j,e[6]=M,e[7]=0,e[8]=ee,e[9]=N,e[10]=P,e[11]=0,e[12]=n[0]+w-(D*w+A*T+ee*E),e[13]=n[1]+T-(O*w+j*T+N*E),e[14]=n[2]+E-(k*w+M*T+P*E),e[15]=1,e}function ln(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n+n,s=r+r,c=i+i,l=n*o,u=r*o,d=r*s,f=i*o,p=i*s,m=i*c,h=a*o,g=a*s,_=a*c;return e[0]=1-d-m,e[1]=u+_,e[2]=f-g,e[3]=0,e[4]=u-_,e[5]=1-l-m,e[6]=p+h,e[7]=0,e[8]=f+g,e[9]=p-h,e[10]=1-l-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function un(e,t,n,r,i,a,o){var s=1/(n-t),c=1/(i-r),l=1/(a-o);return e[0]=a*2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a*2*c,e[6]=0,e[7]=0,e[8]=(n+t)*s,e[9]=(i+r)*c,e[10]=(o+a)*l,e[11]=-1,e[12]=0,e[13]=0,e[14]=o*a*2*l,e[15]=0,e}function dn(e,t,n,r,i){var a=1/Math.tan(t/2),o;return e[0]=a/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0?(o=1/(r-i),e[10]=(i+r)*o,e[14]=2*i*r*o):(e[10]=-1,e[14]=-2*r),e}function fn(e,t,n,r){var i=Math.tan(t.upDegrees*Math.PI/180),a=Math.tan(t.downDegrees*Math.PI/180),o=Math.tan(t.leftDegrees*Math.PI/180),s=Math.tan(t.rightDegrees*Math.PI/180),c=2/(o+s),l=2/(i+a);return e[0]=c,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=l,e[6]=0,e[7]=0,e[8]=-((o-s)*c*.5),e[9]=(i-a)*l*.5,e[10]=r/(n-r),e[11]=-1,e[12]=0,e[13]=0,e[14]=r*n/(n-r),e[15]=0,e}function pn(e,t,n,r,i,a,o){var s=1/(t-n),c=1/(r-i),l=1/(a-o);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*c,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*l,e[11]=0,e[12]=(t+n)*s,e[13]=(i+r)*c,e[14]=(o+a)*l,e[15]=1,e}function mn(e,t,n,r){var i,a,o,s,c,l,u,d,f,p,m=t[0],h=t[1],g=t[2],_=r[0],v=r[1],y=r[2],b=n[0],x=n[1],S=n[2];return Math.abs(m-b)<1e-6&&Math.abs(h-x)<1e-6&&Math.abs(g-S)<1e-6?Bt(e):(u=m-b,d=h-x,f=g-S,p=1/Math.hypot(u,d,f),u*=p,d*=p,f*=p,i=v*f-y*d,a=y*u-_*f,o=_*d-v*u,p=Math.hypot(i,a,o),p?(p=1/p,i*=p,a*=p,o*=p):(i=0,a=0,o=0),s=d*o-f*a,c=f*i-u*o,l=u*a-d*i,p=Math.hypot(s,c,l),p?(p=1/p,s*=p,c*=p,l*=p):(s=0,c=0,l=0),e[0]=i,e[1]=s,e[2]=u,e[3]=0,e[4]=a,e[5]=c,e[6]=d,e[7]=0,e[8]=o,e[9]=l,e[10]=f,e[11]=0,e[12]=-(i*m+a*h+o*g),e[13]=-(s*m+c*h+l*g),e[14]=-(u*m+d*h+f*g),e[15]=1,e)}function hn(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=r[0],c=r[1],l=r[2],u=i-n[0],d=a-n[1],f=o-n[2],p=u*u+d*d+f*f;p>0&&(p=1/Math.sqrt(p),u*=p,d*=p,f*=p);var m=c*f-l*d,h=l*u-s*f,g=s*d-c*u;return p=m*m+h*h+g*g,p>0&&(p=1/Math.sqrt(p),m*=p,h*=p,g*=p),e[0]=m,e[1]=h,e[2]=g,e[3]=0,e[4]=d*g-f*h,e[5]=f*m-u*g,e[6]=u*h-d*m,e[7]=0,e[8]=u,e[9]=d,e[10]=f,e[11]=0,e[12]=i,e[13]=a,e[14]=o,e[15]=1,e}function gn(e){return`mat4(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`, `+e[6]+`, `+e[7]+`, `+e[8]+`, `+e[9]+`, `+e[10]+`, `+e[11]+`, `+e[12]+`, `+e[13]+`, `+e[14]+`, `+e[15]+`)`}function _n(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])}function vn(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e[6]=t[6]+n[6],e[7]=t[7]+n[7],e[8]=t[8]+n[8],e[9]=t[9]+n[9],e[10]=t[10]+n[10],e[11]=t[11]+n[11],e[12]=t[12]+n[12],e[13]=t[13]+n[13],e[14]=t[14]+n[14],e[15]=t[15]+n[15],e}function yn(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e[4]=t[4]-n[4],e[5]=t[5]-n[5],e[6]=t[6]-n[6],e[7]=t[7]-n[7],e[8]=t[8]-n[8],e[9]=t[9]-n[9],e[10]=t[10]-n[10],e[11]=t[11]-n[11],e[12]=t[12]-n[12],e[13]=t[13]-n[13],e[14]=t[14]-n[14],e[15]=t[15]-n[15],e}function bn(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12]*n,e[13]=t[13]*n,e[14]=t[14]*n,e[15]=t[15]*n,e}function xn(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e[4]=t[4]+n[4]*r,e[5]=t[5]+n[5]*r,e[6]=t[6]+n[6]*r,e[7]=t[7]+n[7]*r,e[8]=t[8]+n[8]*r,e[9]=t[9]+n[9]*r,e[10]=t[10]+n[10]*r,e[11]=t[11]+n[11]*r,e[12]=t[12]+n[12]*r,e[13]=t[13]+n[13]*r,e[14]=t[14]+n[14]*r,e[15]=t[15]+n[15]*r,e}function Sn(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]&&e[11]===t[11]&&e[12]===t[12]&&e[13]===t[13]&&e[14]===t[14]&&e[15]===t[15]}function Cn(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],m=e[12],h=e[13],g=e[14],_=e[15],v=t[0],y=t[1],b=t[2],x=t[3],S=t[4],C=t[5],w=t[6],T=t[7],E=t[8],D=t[9],O=t[10],k=t[11],A=t[12],j=t[13],M=t[14],ee=t[15];return Math.abs(n-v)<=1e-6*Math.max(1,Math.abs(n),Math.abs(v))&&Math.abs(r-y)<=1e-6*Math.max(1,Math.abs(r),Math.abs(y))&&Math.abs(i-b)<=1e-6*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(a-x)<=1e-6*Math.max(1,Math.abs(a),Math.abs(x))&&Math.abs(o-S)<=1e-6*Math.max(1,Math.abs(o),Math.abs(S))&&Math.abs(s-C)<=1e-6*Math.max(1,Math.abs(s),Math.abs(C))&&Math.abs(c-w)<=1e-6*Math.max(1,Math.abs(c),Math.abs(w))&&Math.abs(l-T)<=1e-6*Math.max(1,Math.abs(l),Math.abs(T))&&Math.abs(u-E)<=1e-6*Math.max(1,Math.abs(u),Math.abs(E))&&Math.abs(d-D)<=1e-6*Math.max(1,Math.abs(d),Math.abs(D))&&Math.abs(f-O)<=1e-6*Math.max(1,Math.abs(f),Math.abs(O))&&Math.abs(p-k)<=1e-6*Math.max(1,Math.abs(p),Math.abs(k))&&Math.abs(m-A)<=1e-6*Math.max(1,Math.abs(m),Math.abs(A))&&Math.abs(h-j)<=1e-6*Math.max(1,Math.abs(h),Math.abs(j))&&Math.abs(g-M)<=1e-6*Math.max(1,Math.abs(g),Math.abs(M))&&Math.abs(_-ee)<=1e-6*Math.max(1,Math.abs(_),Math.abs(ee))}var wn,Tn,En=o((()=>{U(),wn=Y,Tn=yn})),Dn=c({add:()=>Pn,angle:()=>lr,bezier:()=>tr,ceil:()=>Rn,clone:()=>kn,copy:()=>Mn,create:()=>On,cross:()=>Qn,dist:()=>_r,distance:()=>Gn,div:()=>gr,divide:()=>Ln,dot:()=>Zn,equals:()=>pr,exactEquals:()=>fr,floor:()=>zn,forEach:()=>xr,fromValues:()=>jn,hermite:()=>er,inverse:()=>Yn,len:()=>yr,length:()=>An,lerp:()=>$n,max:()=>Vn,min:()=>Bn,mul:()=>hr,multiply:()=>In,negate:()=>Jn,normalize:()=>Xn,random:()=>nr,rotateX:()=>or,rotateY:()=>sr,rotateZ:()=>cr,round:()=>Hn,scale:()=>Un,scaleAndAdd:()=>Wn,set:()=>Nn,sqrDist:()=>vr,sqrLen:()=>br,squaredDistance:()=>Kn,squaredLength:()=>qn,str:()=>dr,sub:()=>mr,subtract:()=>Fn,transformMat3:()=>ir,transformMat4:()=>rr,transformQuat:()=>ar,zero:()=>ur});function On(){var e=new V(3);return V!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function kn(e){var t=new V(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function An(e){var t=e[0],n=e[1],r=e[2];return Math.hypot(t,n,r)}function jn(e,t,n){var r=new V(3);return r[0]=e,r[1]=t,r[2]=n,r}function Mn(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Nn(e,t,n,r){return e[0]=t,e[1]=n,e[2]=r,e}function Pn(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function Fn(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function In(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e}function Ln(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e}function Rn(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e}function zn(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e}function Bn(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e}function Vn(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e}function Hn(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e}function Un(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function Wn(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e}function Gn(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2];return Math.hypot(n,r,i)}function Kn(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2];return n*n+r*r+i*i}function qn(e){var t=e[0],n=e[1],r=e[2];return t*t+n*n+r*r}function Jn(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Yn(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e}function Xn(e,t){var n=t[0],r=t[1],i=t[2],a=n*n+r*r+i*i;return a>0&&(a=1/Math.sqrt(a)),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e}function Zn(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Qn(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2];return e[0]=i*c-a*s,e[1]=a*o-r*c,e[2]=r*s-i*o,e}function $n(e,t,n,r){var i=t[0],a=t[1],o=t[2];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e[2]=o+r*(n[2]-o),e}function er(e,t,n,r,i,a){var o=a*a,s=o*(2*a-3)+1,c=o*(a-2)+a,l=o*(a-1),u=o*(3-2*a);return e[0]=t[0]*s+n[0]*c+r[0]*l+i[0]*u,e[1]=t[1]*s+n[1]*c+r[1]*l+i[1]*u,e[2]=t[2]*s+n[2]*c+r[2]*l+i[2]*u,e}function tr(e,t,n,r,i,a){var o=1-a,s=o*o,c=a*a,l=s*o,u=3*a*s,d=3*c*o,f=c*a;return e[0]=t[0]*l+n[0]*u+r[0]*d+i[0]*f,e[1]=t[1]*l+n[1]*u+r[1]*d+i[1]*f,e[2]=t[2]*l+n[2]*u+r[2]*d+i[2]*f,e}function nr(e,t){t||=1;var n=H()*2*Math.PI,r=H()*2-1,i=Math.sqrt(1-r*r)*t;return e[0]=Math.cos(n)*i,e[1]=Math.sin(n)*i,e[2]=r*t,e}function rr(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[3]*r+n[7]*i+n[11]*a+n[15];return o||=1,e[0]=(n[0]*r+n[4]*i+n[8]*a+n[12])/o,e[1]=(n[1]*r+n[5]*i+n[9]*a+n[13])/o,e[2]=(n[2]*r+n[6]*i+n[10]*a+n[14])/o,e}function ir(e,t,n){var r=t[0],i=t[1],a=t[2];return e[0]=r*n[0]+i*n[3]+a*n[6],e[1]=r*n[1]+i*n[4]+a*n[7],e[2]=r*n[2]+i*n[5]+a*n[8],e}function ar(e,t,n){var r=n[0],i=n[1],a=n[2],o=n[3],s=t[0],c=t[1],l=t[2],u=i*l-a*c,d=a*s-r*l,f=r*c-i*s,p=i*f-a*d,m=a*u-r*f,h=r*d-i*u,g=o*2;return u*=g,d*=g,f*=g,p*=2,m*=2,h*=2,e[0]=s+u+p,e[1]=c+d+m,e[2]=l+f+h,e}function or(e,t,n,r){var i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[0],a[1]=i[1]*Math.cos(r)-i[2]*Math.sin(r),a[2]=i[1]*Math.sin(r)+i[2]*Math.cos(r),e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function sr(e,t,n,r){var i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[2]*Math.sin(r)+i[0]*Math.cos(r),a[1]=i[1],a[2]=i[2]*Math.cos(r)-i[0]*Math.sin(r),e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function cr(e,t,n,r){var i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[0]*Math.cos(r)-i[1]*Math.sin(r),a[1]=i[0]*Math.sin(r)+i[1]*Math.cos(r),a[2]=i[2],e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function lr(e,t){var n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],s=t[2],c=Math.sqrt(n*n+r*r+i*i)*Math.sqrt(a*a+o*o+s*s),l=c&&Zn(e,t)/c;return Math.acos(Math.min(Math.max(l,-1),1))}function ur(e){return e[0]=0,e[1]=0,e[2]=0,e}function dr(e){return`vec3(`+e[0]+`, `+e[1]+`, `+e[2]+`)`}function fr(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function pr(e,t){var n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],s=t[2];return Math.abs(n-a)<=1e-6*Math.max(1,Math.abs(n),Math.abs(a))&&Math.abs(r-o)<=1e-6*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(i-s)<=1e-6*Math.max(1,Math.abs(i),Math.abs(s))}var mr,hr,gr,_r,vr,yr,br,xr,Sr=o((()=>{U(),mr=Fn,hr=In,gr=Ln,_r=Gn,vr=Kn,yr=An,br=qn,xr=function(){var e=On();return function(t,n,r,i,a,o){var s,c;for(n||=3,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}}()})),Cr=c({add:()=>kr,ceil:()=>Nr,clone:()=>Tr,copy:()=>Dr,create:()=>wr,cross:()=>Jr,dist:()=>oi,distance:()=>Br,div:()=>ai,divide:()=>Mr,dot:()=>qr,equals:()=>ni,exactEquals:()=>ti,floor:()=>Pr,forEach:()=>ui,fromValues:()=>Er,inverse:()=>Gr,len:()=>ci,length:()=>Hr,lerp:()=>Yr,max:()=>Ir,min:()=>Fr,mul:()=>ii,multiply:()=>jr,negate:()=>Wr,normalize:()=>Kr,random:()=>Xr,round:()=>Lr,scale:()=>Rr,scaleAndAdd:()=>zr,set:()=>Or,sqrDist:()=>si,sqrLen:()=>li,squaredDistance:()=>Vr,squaredLength:()=>Ur,str:()=>ei,sub:()=>ri,subtract:()=>Ar,transformMat4:()=>Zr,transformQuat:()=>Qr,zero:()=>$r});function wr(){var e=new V(4);return V!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Tr(e){var t=new V(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function Er(e,t,n,r){var i=new V(4);return i[0]=e,i[1]=t,i[2]=n,i[3]=r,i}function Dr(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function Or(e,t,n,r,i){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e}function kr(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e}function Ar(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e}function jr(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e[3]=t[3]*n[3],e}function Mr(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e[3]=t[3]/n[3],e}function Nr(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e[3]=Math.ceil(t[3]),e}function Pr(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e[3]=Math.floor(t[3]),e}function Fr(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e[3]=Math.min(t[3],n[3]),e}function Ir(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e[3]=Math.max(t[3],n[3]),e}function Lr(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e[3]=Math.round(t[3]),e}function Rr(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e}function zr(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e}function Br(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2],a=t[3]-e[3];return Math.hypot(n,r,i,a)}function Vr(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2],a=t[3]-e[3];return n*n+r*r+i*i+a*a}function Hr(e){var t=e[0],n=e[1],r=e[2],i=e[3];return Math.hypot(t,n,r,i)}function Ur(e){var t=e[0],n=e[1],r=e[2],i=e[3];return t*t+n*n+r*r+i*i}function Wr(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e}function Gr(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e}function Kr(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*n+r*r+i*i+a*a;return o>0&&(o=1/Math.sqrt(o)),e[0]=n*o,e[1]=r*o,e[2]=i*o,e[3]=a*o,e}function qr(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function Jr(e,t,n,r){var i=n[0]*r[1]-n[1]*r[0],a=n[0]*r[2]-n[2]*r[0],o=n[0]*r[3]-n[3]*r[0],s=n[1]*r[2]-n[2]*r[1],c=n[1]*r[3]-n[3]*r[1],l=n[2]*r[3]-n[3]*r[2],u=t[0],d=t[1],f=t[2],p=t[3];return e[0]=d*l-f*c+p*s,e[1]=-(u*l)+f*o-p*a,e[2]=u*c-d*o+p*i,e[3]=-(u*s)+d*a-f*i,e}function Yr(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e[2]=o+r*(n[2]-o),e[3]=s+r*(n[3]-s),e}function Xr(e,t){t||=1;var n,r,i,a,o,s;do n=H()*2-1,r=H()*2-1,o=n*n+r*r;while(o>=1);do i=H()*2-1,a=H()*2-1,s=i*i+a*a;while(s>=1);var c=Math.sqrt((1-o)/s);return e[0]=t*n,e[1]=t*r,e[2]=t*i*c,e[3]=t*a*c,e}function Zr(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3];return e[0]=n[0]*r+n[4]*i+n[8]*a+n[12]*o,e[1]=n[1]*r+n[5]*i+n[9]*a+n[13]*o,e[2]=n[2]*r+n[6]*i+n[10]*a+n[14]*o,e[3]=n[3]*r+n[7]*i+n[11]*a+n[15]*o,e}function Qr(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2],l=n[3],u=l*r+s*a-c*i,d=l*i+c*r-o*a,f=l*a+o*i-s*r,p=-o*r-s*i-c*a;return e[0]=u*l+p*-o+d*-c-f*-s,e[1]=d*l+p*-s+f*-o-u*-c,e[2]=f*l+p*-c+u*-s-d*-o,e[3]=t[3],e}function $r(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e}function ei(e){return`vec4(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`)`}function ti(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function ni(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=t[0],s=t[1],c=t[2],l=t[3];return Math.abs(n-o)<=1e-6*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(r-s)<=1e-6*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(i-c)<=1e-6*Math.max(1,Math.abs(i),Math.abs(c))&&Math.abs(a-l)<=1e-6*Math.max(1,Math.abs(a),Math.abs(l))}var ri,ii,ai,oi,si,ci,li,ui,di=o((()=>{U(),ri=Ar,ii=jr,ai=Mr,oi=Br,si=Vr,ci=Hr,li=Ur,ui=function(){var e=wr();return function(t,n,r,i,a,o){var s,c;for(n||=4,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}}()})),fi=c({add:()=>Li,calculateW:()=>Si,clone:()=>Ni,conjugate:()=>ki,copy:()=>Fi,create:()=>pi,dot:()=>Bi,equals:()=>Ji,exactEquals:()=>qi,exp:()=>Ci,fromEuler:()=>ji,fromMat3:()=>Ai,fromValues:()=>Pi,getAngle:()=>_i,getAxisAngle:()=>gi,identity:()=>mi,invert:()=>Oi,len:()=>Ui,length:()=>Hi,lerp:()=>Vi,ln:()=>wi,mul:()=>Ri,multiply:()=>vi,normalize:()=>Ki,pow:()=>Ti,random:()=>Di,rotateX:()=>yi,rotateY:()=>bi,rotateZ:()=>xi,rotationTo:()=>Yi,scale:()=>zi,set:()=>Ii,setAxes:()=>Zi,setAxisAngle:()=>hi,slerp:()=>Ei,sqlerp:()=>Xi,sqrLen:()=>Gi,squaredLength:()=>Wi,str:()=>Mi});function pi(){var e=new V(4);return V!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function mi(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function hi(e,t,n){n*=.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function gi(e,t){var n=Math.acos(t[3])*2,r=Math.sin(n/2);return r>1e-6?(e[0]=t[0]/r,e[1]=t[1]/r,e[2]=t[2]/r):(e[0]=1,e[1]=0,e[2]=0),n}function _i(e,t){var n=Bi(e,t);return Math.acos(2*n*n-1)}function vi(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*u+o*s+i*l-a*c,e[1]=i*u+o*c+a*s-r*l,e[2]=a*u+o*l+r*c-i*s,e[3]=o*u-r*s-i*c-a*l,e}function yi(e,t,n){n*=.5;var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c+o*s,e[1]=i*c+a*s,e[2]=a*c-i*s,e[3]=o*c-r*s,e}function bi(e,t,n){n*=.5;var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c-a*s,e[1]=i*c+o*s,e[2]=a*c+r*s,e[3]=o*c-i*s,e}function xi(e,t,n){n*=.5;var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c+i*s,e[1]=i*c-r*s,e[2]=a*c+o*s,e[3]=o*c-a*s,e}function Si(e,t){var n=t[0],r=t[1],i=t[2];return e[0]=n,e[1]=r,e[2]=i,e[3]=Math.sqrt(Math.abs(1-n*n-r*r-i*i)),e}function Ci(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=Math.sqrt(n*n+r*r+i*i),s=Math.exp(a),c=o>0?s*Math.sin(o)/o:0;return e[0]=n*c,e[1]=r*c,e[2]=i*c,e[3]=s*Math.cos(o),e}function wi(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=Math.sqrt(n*n+r*r+i*i),s=o>0?Math.atan2(o,a)/o:0;return e[0]=n*s,e[1]=r*s,e[2]=i*s,e[3]=.5*Math.log(n*n+r*r+i*i+a*a),e}function Ti(e,t,n){return wi(e,t),zi(e,e,n),Ci(e,e),e}function Ei(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3],c=n[0],l=n[1],u=n[2],d=n[3],f,p=i*c+a*l+o*u+s*d,m,h,g;return p<0&&(p=-p,c=-c,l=-l,u=-u,d=-d),1-p>1e-6?(f=Math.acos(p),m=Math.sin(f),h=Math.sin((1-r)*f)/m,g=Math.sin(r*f)/m):(h=1-r,g=r),e[0]=h*i+g*c,e[1]=h*a+g*l,e[2]=h*o+g*u,e[3]=h*s+g*d,e}function Di(e){var t=H(),n=H(),r=H(),i=Math.sqrt(1-t),a=Math.sqrt(t);return e[0]=i*Math.sin(2*Math.PI*n),e[1]=i*Math.cos(2*Math.PI*n),e[2]=a*Math.sin(2*Math.PI*r),e[3]=a*Math.cos(2*Math.PI*r),e}function Oi(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*n+r*r+i*i+a*a,s=o?1/o:0;return e[0]=-n*s,e[1]=-r*s,e[2]=-i*s,e[3]=a*s,e}function ki(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function Ai(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var a=(i+1)%3,o=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[a*3+a]-t[o*3+o]+1),e[i]=.5*r,r=.5/r,e[3]=(t[a*3+o]-t[o*3+a])*r,e[a]=(t[a*3+i]+t[i*3+a])*r,e[o]=(t[o*3+i]+t[i*3+o])*r}return e}function ji(e,t,n,r){var i=.5*Math.PI/180;t*=i,n*=i,r*=i;var a=Math.sin(t),o=Math.cos(t),s=Math.sin(n),c=Math.cos(n),l=Math.sin(r),u=Math.cos(r);return e[0]=a*c*u-o*s*l,e[1]=o*s*u+a*c*l,e[2]=o*c*l-a*s*u,e[3]=o*c*u+a*s*l,e}function Mi(e){return`quat(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`)`}var Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi=o((()=>{U(),Nt(),Sr(),di(),Ni=Tr,Pi=Er,Fi=Dr,Ii=Or,Li=kr,Ri=vi,zi=Rr,Bi=qr,Vi=Yr,Hi=Hr,Ui=Hi,Wi=Ur,Gi=Wi,Ki=Kr,qi=ti,Ji=ni,Yi=function(){var e=On(),t=jn(1,0,0),n=jn(0,1,0);return function(r,i,a){var o=Zn(i,a);return o<-.999999?(Qn(e,t,i),yr(e)<1e-6&&Qn(e,n,i),Xn(e,e),hi(r,e,Math.PI),r):o>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(Qn(e,i,a),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+o,Ki(r,r))}}(),Xi=function(){var e=pi(),t=pi();return function(n,r,i,a,o,s){return Ei(e,r,o,s),Ei(t,i,a,s),Ei(n,e,t,2*s*(1-s)),n}}(),Zi=function(){var e=it();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],Ki(t,Ai(t,e))}}()})),$i=c({add:()=>xa,clone:()=>ta,conjugate:()=>Ea,copy:()=>ca,create:()=>ea,dot:()=>Pa,equals:()=>Aa,exactEquals:()=>ka,fromMat4:()=>sa,fromRotation:()=>oa,fromRotationTranslation:()=>ia,fromRotationTranslationValues:()=>ra,fromTranslation:()=>aa,fromValues:()=>na,getDual:()=>da,getReal:()=>ja,getTranslation:()=>pa,identity:()=>la,invert:()=>Ta,len:()=>Ia,length:()=>Fa,lerp:()=>wa,mul:()=>Na,multiply:()=>Sa,normalize:()=>Da,rotateAroundAxis:()=>ba,rotateByQuatAppend:()=>va,rotateByQuatPrepend:()=>ya,rotateX:()=>ha,rotateY:()=>ga,rotateZ:()=>_a,scale:()=>Ca,set:()=>ua,setDual:()=>fa,setReal:()=>Ma,sqrLen:()=>Ra,squaredLength:()=>La,str:()=>Oa,translate:()=>ma});function ea(){var e=new V(8);return V!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0),e[3]=1,e}function ta(e){var t=new V(8);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t}function na(e,t,n,r,i,a,o,s){var c=new V(8);return c[0]=e,c[1]=t,c[2]=n,c[3]=r,c[4]=i,c[5]=a,c[6]=o,c[7]=s,c}function ra(e,t,n,r,i,a,o){var s=new V(8);s[0]=e,s[1]=t,s[2]=n,s[3]=r;var c=i*.5,l=a*.5,u=o*.5;return s[4]=c*r+l*n-u*t,s[5]=l*r+u*e-c*n,s[6]=u*r+c*t-l*e,s[7]=-c*e-l*t-u*n,s}function ia(e,t,n){var r=n[0]*.5,i=n[1]*.5,a=n[2]*.5,o=t[0],s=t[1],c=t[2],l=t[3];return e[0]=o,e[1]=s,e[2]=c,e[3]=l,e[4]=r*l+i*c-a*s,e[5]=i*l+a*o-r*c,e[6]=a*l+r*s-i*o,e[7]=-r*o-i*s-a*c,e}function aa(e,t){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e[4]=t[0]*.5,e[5]=t[1]*.5,e[6]=t[2]*.5,e[7]=0,e}function oa(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=0,e[5]=0,e[6]=0,e[7]=0,e}function sa(e,t){var n=pi();X(n,t);var r=new V(3);return an(r,t),ia(e,n,r),e}function ca(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e}function la(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e}function ua(e,t,n,r,i,a,o,s,c){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e[6]=s,e[7]=c,e}function da(e,t){return e[0]=t[4],e[1]=t[5],e[2]=t[6],e[3]=t[7],e}function fa(e,t){return e[4]=t[0],e[5]=t[1],e[6]=t[2],e[7]=t[3],e}function pa(e,t){var n=t[4],r=t[5],i=t[6],a=t[7],o=-t[0],s=-t[1],c=-t[2],l=t[3];return e[0]=(n*l+a*o+r*c-i*s)*2,e[1]=(r*l+a*s+i*o-n*c)*2,e[2]=(i*l+a*c+n*s-r*o)*2,e}function ma(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0]*.5,c=n[1]*.5,l=n[2]*.5,u=t[4],d=t[5],f=t[6],p=t[7];return e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=o*s+i*l-a*c+u,e[5]=o*c+a*s-r*l+d,e[6]=o*l+r*c-i*s+f,e[7]=-r*s-i*c-a*l+p,e}function ha(e,t,n){var r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=s*o+u*r+c*a-l*i,f=c*o+u*i+l*r-s*a,p=l*o+u*a+s*i-c*r,m=u*o-s*r-c*i-l*a;return yi(e,t,n),r=e[0],i=e[1],a=e[2],o=e[3],e[4]=d*o+m*r+f*a-p*i,e[5]=f*o+m*i+p*r-d*a,e[6]=p*o+m*a+d*i-f*r,e[7]=m*o-d*r-f*i-p*a,e}function ga(e,t,n){var r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=s*o+u*r+c*a-l*i,f=c*o+u*i+l*r-s*a,p=l*o+u*a+s*i-c*r,m=u*o-s*r-c*i-l*a;return bi(e,t,n),r=e[0],i=e[1],a=e[2],o=e[3],e[4]=d*o+m*r+f*a-p*i,e[5]=f*o+m*i+p*r-d*a,e[6]=p*o+m*a+d*i-f*r,e[7]=m*o-d*r-f*i-p*a,e}function _a(e,t,n){var r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=s*o+u*r+c*a-l*i,f=c*o+u*i+l*r-s*a,p=l*o+u*a+s*i-c*r,m=u*o-s*r-c*i-l*a;return xi(e,t,n),r=e[0],i=e[1],a=e[2],o=e[3],e[4]=d*o+m*r+f*a-p*i,e[5]=f*o+m*i+p*r-d*a,e[6]=p*o+m*a+d*i-f*r,e[7]=m*o-d*r-f*i-p*a,e}function va(e,t,n){var r=n[0],i=n[1],a=n[2],o=n[3],s=t[0],c=t[1],l=t[2],u=t[3];return e[0]=s*o+u*r+c*a-l*i,e[1]=c*o+u*i+l*r-s*a,e[2]=l*o+u*a+s*i-c*r,e[3]=u*o-s*r-c*i-l*a,s=t[4],c=t[5],l=t[6],u=t[7],e[4]=s*o+u*r+c*a-l*i,e[5]=c*o+u*i+l*r-s*a,e[6]=l*o+u*a+s*i-c*r,e[7]=u*o-s*r-c*i-l*a,e}function ya(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*u+o*s+i*l-a*c,e[1]=i*u+o*c+a*s-r*l,e[2]=a*u+o*l+r*c-i*s,e[3]=o*u-r*s-i*c-a*l,s=n[4],c=n[5],l=n[6],u=n[7],e[4]=r*u+o*s+i*l-a*c,e[5]=i*u+o*c+a*s-r*l,e[6]=a*u+o*l+r*c-i*s,e[7]=o*u-r*s-i*c-a*l,e}function ba(e,t,n,r){if(Math.abs(r)<1e-6)return ca(e,t);var i=Math.hypot(n[0],n[1],n[2]);r*=.5;var a=Math.sin(r),o=a*n[0]/i,s=a*n[1]/i,c=a*n[2]/i,l=Math.cos(r),u=t[0],d=t[1],f=t[2],p=t[3];e[0]=u*l+p*o+d*c-f*s,e[1]=d*l+p*s+f*o-u*c,e[2]=f*l+p*c+u*s-d*o,e[3]=p*l-u*o-d*s-f*c;var m=t[4],h=t[5],g=t[6],_=t[7];return e[4]=m*l+_*o+h*c-g*s,e[5]=h*l+_*s+g*o-m*c,e[6]=g*l+_*c+m*s-h*o,e[7]=_*l-m*o-h*s-g*c,e}function xa(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e[6]=t[6]+n[6],e[7]=t[7]+n[7],e}function Sa(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[4],c=n[5],l=n[6],u=n[7],d=t[4],f=t[5],p=t[6],m=t[7],h=n[0],g=n[1],_=n[2],v=n[3];return e[0]=r*v+o*h+i*_-a*g,e[1]=i*v+o*g+a*h-r*_,e[2]=a*v+o*_+r*g-i*h,e[3]=o*v-r*h-i*g-a*_,e[4]=r*u+o*s+i*l-a*c+d*v+m*h+f*_-p*g,e[5]=i*u+o*c+a*s-r*l+f*v+m*g+p*h-d*_,e[6]=a*u+o*l+r*c-i*s+p*v+m*_+d*g-f*h,e[7]=o*u-r*s-i*c-a*l+m*v-d*h-f*g-p*_,e}function Ca(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e}function wa(e,t,n,r){var i=1-r;return Pa(t,n)<0&&(r=-r),e[0]=t[0]*i+n[0]*r,e[1]=t[1]*i+n[1]*r,e[2]=t[2]*i+n[2]*r,e[3]=t[3]*i+n[3]*r,e[4]=t[4]*i+n[4]*r,e[5]=t[5]*i+n[5]*r,e[6]=t[6]*i+n[6]*r,e[7]=t[7]*i+n[7]*r,e}function Ta(e,t){var n=La(t);return e[0]=-t[0]/n,e[1]=-t[1]/n,e[2]=-t[2]/n,e[3]=t[3]/n,e[4]=-t[4]/n,e[5]=-t[5]/n,e[6]=-t[6]/n,e[7]=t[7]/n,e}function Ea(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e[4]=-t[4],e[5]=-t[5],e[6]=-t[6],e[7]=t[7],e}function Da(e,t){var n=La(t);if(n>0){n=Math.sqrt(n);var r=t[0]/n,i=t[1]/n,a=t[2]/n,o=t[3]/n,s=t[4],c=t[5],l=t[6],u=t[7],d=r*s+i*c+a*l+o*u;e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=(s-r*d)/n,e[5]=(c-i*d)/n,e[6]=(l-a*d)/n,e[7]=(u-o*d)/n}return e}function Oa(e){return`quat2(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`, `+e[6]+`, `+e[7]+`)`}function ka(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]}function Aa(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=e[6],l=e[7],u=t[0],d=t[1],f=t[2],p=t[3],m=t[4],h=t[5],g=t[6],_=t[7];return Math.abs(n-u)<=1e-6*Math.max(1,Math.abs(n),Math.abs(u))&&Math.abs(r-d)<=1e-6*Math.max(1,Math.abs(r),Math.abs(d))&&Math.abs(i-f)<=1e-6*Math.max(1,Math.abs(i),Math.abs(f))&&Math.abs(a-p)<=1e-6*Math.max(1,Math.abs(a),Math.abs(p))&&Math.abs(o-m)<=1e-6*Math.max(1,Math.abs(o),Math.abs(m))&&Math.abs(s-h)<=1e-6*Math.max(1,Math.abs(s),Math.abs(h))&&Math.abs(c-g)<=1e-6*Math.max(1,Math.abs(c),Math.abs(g))&&Math.abs(l-_)<=1e-6*Math.max(1,Math.abs(l),Math.abs(_))}var ja,Ma,Na,Pa,Fa,Ia,La,Ra,za=o((()=>{U(),Qi(),En(),ja=Fi,Ma=Fi,Na=Sa,Pa=Bi,Fa=Hi,Ia=Fa,La=Wi,Ra=La})),Ba=c({add:()=>Ka,angle:()=>bo,ceil:()=>Xa,clone:()=>Ha,copy:()=>Wa,create:()=>Va,cross:()=>fo,dist:()=>ko,distance:()=>ro,div:()=>Oo,divide:()=>Ya,dot:()=>uo,equals:()=>wo,exactEquals:()=>Co,floor:()=>Za,forEach:()=>Mo,fromValues:()=>Ua,inverse:()=>co,len:()=>To,length:()=>ao,lerp:()=>po,max:()=>$a,min:()=>Qa,mul:()=>Do,multiply:()=>Ja,negate:()=>so,normalize:()=>lo,random:()=>mo,rotate:()=>yo,round:()=>eo,scale:()=>to,scaleAndAdd:()=>no,set:()=>Ga,sqrDist:()=>Ao,sqrLen:()=>jo,squaredDistance:()=>io,squaredLength:()=>oo,str:()=>So,sub:()=>Eo,subtract:()=>qa,transformMat2:()=>ho,transformMat2d:()=>go,transformMat3:()=>_o,transformMat4:()=>vo,zero:()=>xo});function Va(){var e=new V(2);return V!=Float32Array&&(e[0]=0,e[1]=0),e}function Ha(e){var t=new V(2);return t[0]=e[0],t[1]=e[1],t}function Ua(e,t){var n=new V(2);return n[0]=e,n[1]=t,n}function Wa(e,t){return e[0]=t[0],e[1]=t[1],e}function Ga(e,t,n){return e[0]=t,e[1]=n,e}function Ka(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e}function qa(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e}function Ja(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e}function Ya(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e}function Xa(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e}function Za(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e}function Qa(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e}function $a(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e}function eo(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e}function to(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e}function no(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e}function ro(e,t){var n=t[0]-e[0],r=t[1]-e[1];return Math.hypot(n,r)}function io(e,t){var n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r}function ao(e){var t=e[0],n=e[1];return Math.hypot(t,n)}function oo(e){var t=e[0],n=e[1];return t*t+n*n}function so(e,t){return e[0]=-t[0],e[1]=-t[1],e}function co(e,t){return e[0]=1/t[0],e[1]=1/t[1],e}function lo(e,t){var n=t[0],r=t[1],i=n*n+r*r;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e}function uo(e,t){return e[0]*t[0]+e[1]*t[1]}function fo(e,t,n){var r=t[0]*n[1]-t[1]*n[0];return e[0]=e[1]=0,e[2]=r,e}function po(e,t,n,r){var i=t[0],a=t[1];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e}function mo(e,t){t||=1;var n=H()*2*Math.PI;return e[0]=Math.cos(n)*t,e[1]=Math.sin(n)*t,e}function ho(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i,e[1]=n[1]*r+n[3]*i,e}function go(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i+n[4],e[1]=n[1]*r+n[3]*i+n[5],e}function _o(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[3]*i+n[6],e[1]=n[1]*r+n[4]*i+n[7],e}function vo(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[4]*i+n[12],e[1]=n[1]*r+n[5]*i+n[13],e}function yo(e,t,n,r){var i=t[0]-n[0],a=t[1]-n[1],o=Math.sin(r),s=Math.cos(r);return e[0]=i*s-a*o+n[0],e[1]=i*o+a*s+n[1],e}function bo(e,t){var n=e[0],r=e[1],i=t[0],a=t[1],o=Math.sqrt(n*n+r*r)*Math.sqrt(i*i+a*a),s=o&&(n*i+r*a)/o;return Math.acos(Math.min(Math.max(s,-1),1))}function xo(e){return e[0]=0,e[1]=0,e}function So(e){return`vec2(`+e[0]+`, `+e[1]+`)`}function Co(e,t){return e[0]===t[0]&&e[1]===t[1]}function wo(e,t){var n=e[0],r=e[1],i=t[0],a=t[1];return Math.abs(n-i)<=1e-6*Math.max(1,Math.abs(n),Math.abs(i))&&Math.abs(r-a)<=1e-6*Math.max(1,Math.abs(r),Math.abs(a))}var To,Eo,Do,Oo,ko,Ao,jo,Mo,No=o((()=>{U(),To=ao,Eo=qa,Do=Ja,Oo=Ya,ko=ro,Ao=io,jo=oo,Mo=function(){var e=Va();return function(t,n,r,i,a,o){var s,c;for(n||=2,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],a(e,e,o),t[s]=e[0],t[s+1]=e[1];return t}}()})),Po=c({glMatrix:()=>te,mat2:()=>re,mat2d:()=>je,mat3:()=>rt,mat4:()=>Pt,quat:()=>fi,quat2:()=>$i,vec2:()=>Ba,vec3:()=>Dn,vec4:()=>Cr}),Fo=o((()=>{U(),Ae(),nt(),Nt(),En(),Qi(),za(),No(),Sr(),di()})),Io=s(((e,t)=>{function n(e,t,n){return Math.min(Math.max(e,t),n)}t.exports=n})),Lo=s(((e,t)=>{var n=Io(),r=(Fo(),d(Po)).vec4,i=(Fo(),d(Po)).vec3,a=(Fo(),d(Po)).mat4;function o(e,t,n){var r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw e.getShaderInfoLog(r);return r}function s(e,t,n,r,i){var a=o(e,e.VERTEX_SHADER,t),s=o(e,e.FRAGMENT_SHADER,n),c=e.createProgram();if(e.attachShader(c,a),e.attachShader(c,s),e.linkProgram(c),!e.getProgramParameter(c,e.LINK_STATUS))throw e.getProgramInfoLog(c);for(var l=0;l<r.length;l++){var u=r[l];if(c[u]=e.getAttribLocation(c,u),c[u]===-1)throw Error(`Shader program has no `+u+` attribute`)}for(var d=0;d<i.length;d++){var f=i[d];if(c[f]=e.getUniformLocation(c,f),c[f]===-1)throw Error(`Shader program has no `+f+` uniform`)}return c}function c(e,t){for(var n=e.getAttachedShaders(t),r=0;r<n.length;r++){var i=n[r];e.detachShader(t,i),e.deleteShader(i)}e.deleteProgram(t)}function l(e,t,n,r){var i=e.createBuffer();return e.bindBuffer(t,i),e.bufferData(t,r,n),i}function u(e,t,n,r){return{vertexIndices:l(e,e.ELEMENT_ARRAY_BUFFER,e.STATIC_DRAW,new Uint16Array(t)),vertexPositions:l(e,e.ARRAY_BUFFER,e.STATIC_DRAW,new Float32Array(n)),textureCoords:l(e,e.ARRAY_BUFFER,e.STATIC_DRAW,new Float32Array(r))}}function f(e,t){e.deleteBuffer(t.vertexIndices),e.deleteBuffer(t.vertexPositions),e.deleteBuffer(t.textureCoords)}function p(e,t){for(var n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES),r=0;r<n;r++)e.enableVertexAttribArray(r)}function m(e,t){for(var n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES),r=0;r<n;r++)e.disableVertexAttribArray(r)}function h(e,t,n){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n._texture),e.uniform1i(t.uSampler,0)}function g(e,t,n,r){var i=((n+1)*256-r)/65536;e.uniform1f(t.uDepth,i)}var _=1,v=r.create(),y=a.create();a.identity(y);function b(e,t,n){var r=_;t&&t.opacity!=null&&(r=t.opacity),e.uniform1f(n.opacity,r);var i=v;t&&t.colorOffset&&(i=t.colorOffset),e.uniform4fv(n.colorOffset,i);var a=y;t&&t.colorMatrix&&(a=t.colorMatrix),e.uniformMatrix4fv(n.colorMatrix,!1,a)}var x=i.create(),S=i.create();function C(e,t,r,o){if(r.x===0&&r.width===1&&r.y===0&&r.height===1)e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),a.identity(o);else{var s=r.x,c=n(s,0,1),l=c-s,u=1-c,d=n(r.width-l,0,u),f=r.width-d,p=1-r.height-r.y,m=n(p,0,1),h=m-p,g=1-m,_=n(r.height-h,0,g),v=r.height-_;i.set(S,r.width/d,r.height/_,1),i.set(x,(f-l)/d,(v-h)/_,0),a.identity(o),a.translate(o,o,x),a.scale(o,o,S),e.viewport(e.drawingBufferWidth*c,e.drawingBufferHeight*m,e.drawingBufferWidth*d,e.drawingBufferHeight*_)}}t.exports={createShaderProgram:s,destroyShaderProgram:c,createConstantBuffers:u,destroyConstantBuffers:f,enableAttributes:p,disableAttributes:m,setTexture:h,setDepth:g,setViewport:C,setupPixelEffectUniforms:b}})),Ro=s(((e,t)=>{t.exports=[`attribute vec3 aVertexPosition;`,`attribute vec2 aTextureCoord;`,`uniform float uDepth;`,`uniform mat4 uViewportMatrix;`,`uniform mat4 uProjMatrix;`,`varying vec2 vTextureCoord;`,`void main(void) {`,`  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);`,`  gl_Position.z = uDepth * gl_Position.w;`,`  vTextureCoord = aTextureCoord;`,`}`].join(`
`)})),zo=s(((e,t)=>{t.exports=[`#ifdef GL_FRAGMENT_PRECISION_HIGH`,`precision highp float;`,`#else`,`precision mediump float;`,`#endif`,`uniform sampler2D uSampler;`,`uniform float uOpacity;`,`uniform vec4 uColorOffset;`,`uniform mat4 uColorMatrix;`,`varying vec2 vTextureCoord;`,`void main(void) {`,`  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;`,`  gl_FragColor = vec4(color.rgba * uOpacity);`,`}`].join(`
`)})),Bo=s(((e,t)=>{var n=(Fo(),d(Po)).mat4,r=(Fo(),d(Po)).vec3,i=w(),a=Lo(),o=a.createConstantBuffers,s=a.destroyConstantBuffers,c=a.createShaderProgram,l=a.destroyShaderProgram,u=a.enableAttributes,f=a.disableAttributes,p=a.setViewport,m=a.setupPixelEffectUniforms,h=a.setDepth,g=a.setTexture,_=Ro(),v=zo(),y=[0,1,2,0,2,3],b=[-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],x=[0,0,1,0,1,1,0,1],S=[`aVertexPosition`,`aTextureCoord`],C=[`uDepth`,`uOpacity`,`uSampler`,`uProjMatrix`,`uViewportMatrix`,`uColorOffset`,`uColorMatrix`];function T(e){this.gl=e,this.projMatrix=n.create(),this.viewportMatrix=n.create(),this.translateVector=r.create(),this.scaleVector=r.create(),this.constantBuffers=o(e,y,b,x),this.shaderProgram=c(e,_,v,S,C)}T.prototype.destroy=function(){s(this.gl,this.constantBuffers),l(this.gl,this.shaderProgram),i(this)},T.prototype.startLayer=function(e,t){var n=this.gl,r=this.shaderProgram,i=this.constantBuffers,a=this.viewportMatrix;n.useProgram(r),u(n,r),p(n,e,t,a),n.uniformMatrix4fv(r.uViewportMatrix,!1,a),n.bindBuffer(n.ARRAY_BUFFER,i.vertexPositions),n.vertexAttribPointer(r.aVertexPosition,3,n.FLOAT,n.FALSE,0,0),n.bindBuffer(n.ARRAY_BUFFER,i.textureCoords),n.vertexAttribPointer(r.aTextureCoord,2,n.FLOAT,n.FALSE,0,0),m(n,e.effects(),{opacity:r.uOpacity,colorOffset:r.uColorOffset,colorMatrix:r.uColorMatrix})},T.prototype.endLayer=function(e,t){var n=this.gl,r=this.shaderProgram;f(n,r)},T.prototype.renderTile=function(e,t,r,i){var a=this.gl,o=this.shaderProgram,s=this.constantBuffers,c=this.projMatrix,l=this.translateVector,u=this.scaleVector;l[0]=e.centerX(),l[1]=e.centerY(),l[2]=-.5,u[0]=e.scaleX(),u[1]=e.scaleY(),u[2]=1,n.copy(c,r.view().projection()),n.rotateX(c,c,e.rotX()),n.rotateY(c,c,e.rotY()),n.translate(c,c,l),n.scale(c,c,u),a.uniformMatrix4fv(o.uProjMatrix,!1,c),h(a,o,i,e.z),g(a,o,t),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,s.vertexIndices),a.drawElements(a.TRIANGLES,y.length,a.UNSIGNED_SHORT,0)},t.exports=T})),Vo=s(((e,t)=>{var n=Bo(),r=k();function i(){this.constructor.super_.apply(this,arguments)}r(i,n),t.exports=i})),Ho=s(((e,t)=>{var n=Bo(),r=k();function i(){this.constructor.super_.apply(this,arguments)}r(i,n),t.exports=i})),Uo=s(((e,t)=>{t.exports=[`attribute vec3 aVertexPosition;`,`uniform float uDepth;`,`uniform mat4 uViewportMatrix;`,`uniform mat4 uInvProjMatrix;`,`varying vec4 vRay;`,`void main(void) {`,`  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);`,`  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);`,`}`].join(`
`)})),Wo=s(((e,t)=>{t.exports=[`#ifdef GL_FRAGMENT_PRECISION_HIGH`,`precision highp float;`,`#else`,`precision mediump float`,`#endif`,`uniform sampler2D uSampler;`,`uniform float uOpacity;`,`uniform float uTextureX;`,`uniform float uTextureY;`,`uniform float uTextureWidth;`,`uniform float uTextureHeight;`,`uniform vec4 uColorOffset;`,`uniform mat4 uColorMatrix;`,`varying vec4 vRay;`,`const float PI = 3.14159265358979323846264;`,`void main(void) {`,`  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);`,`  float phi  = acos(vRay.y * r);`,`  float theta = atan(vRay.x, -1.0*vRay.z);`,`  float s = 0.5 + 0.5 * theta / PI;`,`  float t = 1.0 - phi / PI;`,`  s = s * uTextureWidth + uTextureX;`,`  t = t * uTextureHeight + uTextureY;`,`  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;`,`  gl_FragColor = vec4(color.rgba * uOpacity);`,`}`].join(`
`)})),Go=s(((e,t)=>{var n=(Fo(),d(Po)).mat4,r=w(),i=Lo(),a=i.createConstantBuffers,o=i.destroyConstantBuffers,s=i.createShaderProgram,c=i.destroyShaderProgram,l=i.enableAttributes,u=i.disableAttributes,f=i.setViewport,p=i.setupPixelEffectUniforms,m=i.setDepth,h=i.setTexture,g=Uo(),_=Wo(),v=[0,1,2,0,2,3],y=[-1,-1,0,1,-1,0,1,1,0,-1,1,0],b=[0,0,1,0,1,1,0,1],x=[`aVertexPosition`],S=[`uDepth`,`uOpacity`,`uSampler`,`uInvProjMatrix`,`uViewportMatrix`,`uColorOffset`,`uColorMatrix`,`uTextureX`,`uTextureY`,`uTextureWidth`,`uTextureHeight`];function C(e){this.gl=e,this.invProjMatrix=n.create(),this.viewportMatrix=n.create(),this.constantBuffers=a(e,v,y,b),this.shaderProgram=s(e,g,_,x,S)}C.prototype.destroy=function(){o(this.gl,this.constantBuffers),c(this.gl,this.shaderProgram),r(this)},C.prototype.startLayer=function(e,t){var r=this.gl,i=this.shaderProgram,a=this.constantBuffers,o=this.invProjMatrix,s=this.viewportMatrix;r.useProgram(i),l(r,i),f(r,e,t,s),r.uniformMatrix4fv(i.uViewportMatrix,!1,s),r.bindBuffer(r.ARRAY_BUFFER,a.vertexPositions),r.vertexAttribPointer(i.aVertexPosition,3,r.FLOAT,r.FALSE,0,0),r.bindBuffer(r.ARRAY_BUFFER,a.textureCoords),n.copy(o,e.view().projection()),n.invert(o,o),r.uniformMatrix4fv(i.uInvProjMatrix,!1,o);var c=e.effects().textureCrop||{},u=c.x==null?0:c.x,d=c.y==null?0:c.y,m=c.width==null?1:c.width,h=c.height==null?1:c.height;r.uniform1f(i.uTextureX,u),r.uniform1f(i.uTextureY,d),r.uniform1f(i.uTextureWidth,m),r.uniform1f(i.uTextureHeight,h),p(r,e.effects(),{opacity:i.uOpacity,colorOffset:i.uColorOffset,colorMatrix:i.uColorMatrix})},C.prototype.endLayer=function(e,t){var n=this.gl,r=this.shaderProgram;u(n,r)},C.prototype.renderTile=function(e,t,n,r){var i=this.gl,a=this.shaderProgram,o=this.constantBuffers;m(i,a,r,e.z),h(i,a,t),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,o.vertexIndices),i.drawElements(i.TRIANGLES,v.length,i.UNSIGNED_SHORT,0)},t.exports=C})),Ko=s(((e,t)=>{var n=Vo(),r=Ho(),i=Go();function a(e){switch(e.type){case`webgl`:e.registerRenderer(`flat`,`flat`,r),e.registerRenderer(`cube`,`rectilinear`,n),e.registerRenderer(`equirect`,`rectilinear`,i);break;default:throw Error(`Unknown stage type: `+e.type)}}t.exports=a})),qo=s(((e,t)=>{function n(){for(var e=0,t=0;t<arguments.length;t++){var n=arguments[t];e+=n,e+=n<<10,e^=n>>6}return e+=e<<3,e^=e>>11,e+=e<<15,e>=0?e:-e}t.exports=n})),Jo=s(((e,t)=>{function n(e,t){return(+e%(t=+t)+t)%t}t.exports=n})),Yo=s(((e,t)=>{var n=Jo(),r=64;function i(e){if(e!=null&&(!isFinite(e)||Math.floor(e)!==e||e<1))throw Error(`Set: invalid capacity`);this._capacity=this._capacity||r,this._buckets=[];for(var t=0;t<this._capacity;t++)this._buckets.push([]);this._size=0}i.prototype.add=function(e){for(var t=n(e.hash(),this._capacity),r=this._buckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return r[i]=e,a}return r.push(e),this._size++,null},i.prototype.remove=function(e){for(var t=n(e.hash(),this._capacity),r=this._buckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a)){for(var o=i;o<r.length-1;o++)r[o]=r[o+1];return--r.length,this._size--,a}}return null},i.prototype.has=function(e){for(var t=n(e.hash(),this._capacity),r=this._buckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return!0}return!1},i.prototype.size=function(){return this._size},i.prototype.clear=function(){for(var e=0;e<this._capacity;e++)this._buckets[e].length=0;this._size=0},i.prototype.forEach=function(e){for(var t=0,n=0;n<this._capacity;n++)for(var r=this._buckets[n],i=0;i<r.length;i++)e(r[i]),t+=1;return t},t.exports=i})),Xo=s(((e,t)=>{var n=Yo();function r(){this._stack=[],this._visited=new n,this._vertices=null}r.prototype.search=function(e,t,n){var r=this._stack,i=this._visited,a=this._vertices,o=0;for(this._clear(),r.push(t);r.length>0;){var s=r.pop();if(!i.has(s)&&e.intersects(s.vertices(a))){i.add(s);for(var c=s.neighbors(),l=0;l<c.length;l++)r.push(c[l]);n.push(s),o++}}return this._vertices=a,this._clear(),o},r.prototype._clear=function(){this._stack.length=0,this._visited.clear()},t.exports=r})),Zo=s(((e,t)=>{var n=Jo();function r(e){if(!isFinite(e)||Math.floor(e)!==e||e<0)throw Error(`LruMap: invalid capacity`);this._capacity=e,this._keys=Array(this._capacity),this._values=Array(this._capacity),this._start=0,this._size=0}r.prototype._index=function(e){return n(this._start+e,this._capacity)},r.prototype.get=function(e){for(var t=0;t<this._size;t++){var n=this._keys[this._index(t)];if(e.equals(n))return this._values[this._index(t)]}return null},r.prototype.set=function(e,t){if(this._capacity===0)return e;this.del(e);var n=this._size===this._capacity?this._keys[this._index(0)]:null;return this._keys[this._index(this._size)]=e,this._values[this._index(this._size)]=t,this._size<this._capacity?this._size++:this._start=this._index(1),n},r.prototype.del=function(e){for(var t=0;t<this._size;t++)if(e.equals(this._keys[this._index(t)])){for(var n=this._values[this._index(t)],r=t;r<this._size-1;r++)this._keys[this._index(r)]=this._keys[this._index(r+1)],this._values[this._index(r)]=this._values[this._index(r+1)];return this._size--,n}return null},r.prototype.has=function(e){for(var t=0;t<this._size;t++)if(e.equals(this._keys[this._index(t)]))return!0;return!1},r.prototype.size=function(){return this._size},r.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._start=0,this._size=0},r.prototype.forEach=function(e){for(var t=0,n=0;n<this._size;n++)e(this._keys[this._index(n)],this._values[this._index(n)]),t+=1;return t},t.exports=r})),Qo=s(((e,t)=>{function n(e){this._fallbackOnly=!!e.fallbackOnly}n.prototype.numHorizontalTiles=function(){return Math.ceil(this.width()/this.tileWidth())},n.prototype.numVerticalTiles=function(){return Math.ceil(this.height()/this.tileHeight())},n.prototype.fallbackOnly=function(){return this._fallbackOnly},t.exports=n})),$o=s(((e,t)=>{function n(e,t){return e<t?-1:+(e>t)}t.exports=n})),es=s(((e,t)=>{var n=$o();function r(e,t){for(var r=[],i=0;i<e.length;i++)r.push(new t(e[i]));return r.sort(function(e,t){return n(e.width(),t.width())}),r}function i(e){for(var t=[],n=0;n<e.length;n++)e[n]._fallbackOnly||t.push(e[n]);if(!t.length)throw Error(`No selectable levels in list`);return t}t.exports={makeLevelList:r,makeSelectableLevelList:i}})),ts=s(((e,t)=>{function n(e){var t=typeof e;if(t===`object`){if(e===null)return`null`;if(Object.prototype.toString.call(e)===`[object Array]`)return`array`;if(Object.prototype.toString.call(e)===`[object RegExp]`)return`regexp`}return t}t.exports=n})),ns=s(((e,t)=>{var n=k(),r=qo(),i=Xo(),a=Zo(),o=Qo(),s=es().makeLevelList,c=es().makeSelectableLevelList,l=Io(),u=$o(),f=ts(),p=(Fo(),d(Po)).vec3,m=(Fo(),d(Po)).vec4,h=64,g=`fudlrb`,_={f:{x:0,y:0},b:{x:0,y:Math.PI},l:{x:0,y:Math.PI/2},r:{x:0,y:-Math.PI/2},u:{x:Math.PI/2,y:0},d:{x:-Math.PI/2,y:0}},v=p.create();function y(e,t,n,r){t&&p.rotateZ(e,e,v,t),n&&p.rotateX(e,e,v,n),r&&p.rotateY(e,e,v,r)}for(var b={},x=0;x<g.length;x++){var S=g[x],C=_[S],w=p.fromValues(0,0,-1);y(w,0,C.x,C.y),b[S]=w}var T={f:[`l`,`r`,`u`,`d`],b:[`r`,`l`,`u`,`d`],l:[`b`,`f`,`u`,`d`],r:[`f`,`b`,`u`,`d`],u:[`l`,`r`,`b`,`f`],d:[`l`,`r`,`f`,`b`]},E=[[0,1],[1,0],[0,-1],[-1,0]];function D(e,t,n,r,i){this.face=e,this.x=t,this.y=n,this.z=r,this._geometry=i,this._level=i.levelList[r]}D.prototype.rotX=function(){return _[this.face].x},D.prototype.rotY=function(){return _[this.face].y},D.prototype.centerX=function(){return(this.x+.5)/this._level.numHorizontalTiles()-.5},D.prototype.centerY=function(){return .5-(this.y+.5)/this._level.numVerticalTiles()},D.prototype.scaleX=function(){return 1/this._level.numHorizontalTiles()},D.prototype.scaleY=function(){return 1/this._level.numVerticalTiles()},D.prototype.vertices=function(e){e||=[p.create(),p.create(),p.create(),p.create()];var t=_[this.face];function n(e,n,r){p.set(e,n,r,-.5),y(e,0,t.x,t.y)}var r=this.centerX()-this.scaleX()/2,i=this.centerX()+this.scaleX()/2,a=this.centerY()-this.scaleY()/2,o=this.centerY()+this.scaleY()/2;return n(e[0],r,o),n(e[1],i,o),n(e[2],i,a),n(e[3],r,a),e},D.prototype.parent=function(){if(this.z===0)return null;var e=this.face,t=this.z,n=this.x,r=this.y,i=this._geometry,a=i.levelList[t],o=i.levelList[t-1];return new D(e,Math.floor(n/a.numHorizontalTiles()*o.numHorizontalTiles()),Math.floor(r/a.numVerticalTiles()*o.numVerticalTiles()),t-1,i)},D.prototype.children=function(e){if(this.z===this._geometry.levelList.length-1)return null;var t=this.face,n=this.z,r=this.x,i=this.y,a=this._geometry,o=a.levelList[n],s=a.levelList[n+1],c=s.numHorizontalTiles()/o.numHorizontalTiles(),l=s.numVerticalTiles()/o.numVerticalTiles();e||=[];for(var u=0;u<c;u++)for(var d=0;d<l;d++){var f=c*r+u,p=l*i+d,m=n+1;e.push(new D(t,f,p,m,a))}return e},D.prototype.neighbors=function(){var e=this._geometry,t=e._neighborsCache,n=t.get(this);if(n)return n;for(var r=e._vec,i=this.face,a=this.x,o=this.y,s=this.z,c=this._level,u=c.numHorizontalTiles(),d=c.numVerticalTiles(),f=[],m=0;m<E.length;m++){var h=E[m][0],g=E[m][1],v=a+h,b=o+g,x=s,S=i;if(v<0||v>=u||b<0||b>=d){var C=this.centerX(),w=this.centerY();v<0?(p.set(r,-.5,w,-.5),S=T[i][0]):v>=u?(p.set(r,.5,w,-.5),S=T[i][1]):b<0?(p.set(r,C,.5,-.5),S=T[i][2]):b>=d&&(p.set(r,C,-.5,-.5),S=T[i][3]);var O=_[i];y(r,0,O.x,O.y),O=_[S],y(r,0,-O.x,-O.y),v=l(Math.floor((.5+r[0])*u),0,u-1),b=l(Math.floor((.5-r[1])*d),0,d-1)}f.push(new D(S,v,b,x,e))}return t.set(this,f),f},D.prototype.hash=function(){return r(g.indexOf(this.face),this.z,this.y,this.x)},D.prototype.equals=function(e){return this._geometry===e._geometry&&this.face===e.face&&this.z===e.z&&this.y===e.y&&this.x===e.x},D.prototype.cmp=function(e){return u(this.z,e.z)||u(g.indexOf(this.face),g.indexOf(e.face))||u(this.y,e.y)||u(this.x,e.x)},D.prototype.str=function(){return`CubeTile(`+tile.face+`, `+tile.x+`, `+tile.y+`, `+tile.z+`)`};function O(e){if(this.constructor.super_.call(this,e),this._size=e.size,this._tileSize=e.tileSize,this._size%this._tileSize!==0)throw Error(`Level size is not multiple of tile size: `+this._size+` `+this._tileSize)}n(O,o),O.prototype.width=function(){return this._size},O.prototype.height=function(){return this._size},O.prototype.tileWidth=function(){return this._tileSize},O.prototype.tileHeight=function(){return this._tileSize},O.prototype._validateWithParentLevel=function(e){var t=this.width(),n=this.height(),r=this.tileWidth(),i=this.tileHeight(),a=this.numHorizontalTiles(),o=this.numVerticalTiles(),s=e.width(),c=e.height(),l=e.tileWidth(),u=e.tileHeight(),d=e.numHorizontalTiles(),f=e.numVerticalTiles();if(t%s!==0)throw Error(`Level width must be multiple of parent level: `+t+` vs. `+s);if(n%c!==0)throw Error(`Level height must be multiple of parent level: `+n+` vs. `+c);if(a%d!==0)throw Error(`Number of horizontal tiles must be multiple of parent level: `+a+` (`+t+`/`+r+`) vs. `+d+` (`+s+`/`+l+`)`);if(o%f!==0)throw Error(`Number of vertical tiles must be multiple of parent level: `+o+` (`+n+`/`+i+`) vs. `+f+` (`+c+`/`+u+`)`)};function A(e){if(f(e)!==`array`)throw Error(`Level list must be an array`);this.levelList=s(e,O),this.selectableLevelList=c(this.levelList);for(var t=1;t<this.levelList.length;t++)this.levelList[t]._validateWithParentLevel(this.levelList[t-1]);this._tileSearcher=new i(this),this._neighborsCache=new a(h),this._vec=m.create(),this._viewSize={}}A.prototype.maxTileSize=function(){for(var e=0,t=0;t<this.levelList.length;t++){var n=this.levelList[t];e=Math.max(e,n.tileWidth,n.tileHeight)}return e},A.prototype.levelTiles=function(e,t){var n=this.levelList.indexOf(e),r=e.numHorizontalTiles()-1,i=e.numVerticalTiles()-1;t||=[];for(var a=0;a<g.length;a++)for(var o=g[a],s=0;s<=r;s++)for(var c=0;c<=i;c++)t.push(new D(o,s,c,n,this));return t},A.prototype._closestTile=function(e,t){var n=this._vec;m.set(n,0,0,1,1),m.transformMat4(n,n,e.inverseProjection());var r=1/0,i=null;for(var a in b){var o=b[a],s=1-p.dot(o,n);s<r&&(r=s,i=a)}for(var c=Math.max(Math.abs(n[0]),Math.abs(n[1]),Math.abs(n[2]))/.5,u=0;u<3;u++)n[u]=n[u]/c;var d=_[i];y(n,0,-d.x,-d.y);var f=this.levelList.indexOf(t),h=t.numHorizontalTiles(),g=t.numVerticalTiles(),v=l(Math.floor((.5+n[0])*h),0,h-1),x=l(Math.floor((.5-n[1])*g),0,g-1);return new D(i,v,x,f,this)},A.prototype.visibleTiles=function(e,t,n){var r=this._viewSize,i=this._tileSearcher;if(n||=[],e.size(r),r.width===0||r.height===0)return n;var a=this._closestTile(e,t);if(!i.search(e,a,n))throw Error(`Starting tile is not visible`);return n},A.Tile=A.prototype.Tile=D,A.type=A.prototype.type=`cube`,D.type=D.prototype.type=`cube`,t.exports=A})),rs=s(((e,t)=>{var n=k(),r=qo(),i=Xo(),a=Zo(),o=Qo(),s=es().makeLevelList,c=es().makeSelectableLevelList,l=Io(),u=Jo(),f=$o(),p=ts(),m=(Fo(),d(Po)).vec2,h=(Fo(),d(Po)).vec4,g=64,_=[[0,1],[1,0],[0,-1],[-1,0]];function v(e,t,n,r){this.x=e,this.y=t,this.z=n,this._geometry=r,this._level=r.levelList[n]}v.prototype.rotX=function(){return 0},v.prototype.rotY=function(){return 0},v.prototype.centerX=function(){var e=this._level.width(),t=this._level.tileWidth();return(this.x*t+.5*this.width())/e-.5},v.prototype.centerY=function(){var e=this._level.height(),t=this._level.tileHeight();return .5-(this.y*t+.5*this.height())/e},v.prototype.scaleX=function(){var e=this._level.width();return this.width()/e},v.prototype.scaleY=function(){var e=this._level.height();return this.height()/e},v.prototype.width=function(){var e=this._level.width(),t=this._level.tileWidth();return this.x===this._level.numHorizontalTiles()-1&&u(e,t)||t},v.prototype.height=function(){var e=this._level.height(),t=this._level.tileHeight();return this.y===this._level.numVerticalTiles()-1&&u(e,t)||t},v.prototype.levelWidth=function(){return this._level.width()},v.prototype.levelHeight=function(){return this._level.height()},v.prototype.vertices=function(e){e||=[m.create(),m.create(),m.create(),m.create()];var t=this.centerX()-this.scaleX()/2,n=this.centerX()+this.scaleX()/2,r=this.centerY()-this.scaleY()/2,i=this.centerY()+this.scaleY()/2;return m.set(e[0],t,i),m.set(e[1],n,i),m.set(e[2],n,r),m.set(e[3],t,r),e},v.prototype.parent=function(){if(this.z===0)return null;var e=this._geometry,t=this.z-1;return new v(Math.floor(this.x/2),Math.floor(this.y/2),t,e)},v.prototype.children=function(e){if(this.z===this._geometry.levelList.length-1)return null;var t=this._geometry,n=this.z+1;return e||=[],e.push(new v(2*this.x,2*this.y,n,t)),e.push(new v(2*this.x,2*this.y+1,n,t)),e.push(new v(2*this.x+1,2*this.y,n,t)),e.push(new v(2*this.x+1,2*this.y+1,n,t)),e},v.prototype.neighbors=function(){var e=this._geometry,t=e._neighborsCache,n=t.get(this);if(n)return n;for(var r=this.x,i=this.y,a=this.z,o=this._level,s=o.numHorizontalTiles()-1,c=o.numVerticalTiles()-1,l=[],u=0;u<_.length;u++){var d=_[u][0],f=_[u][1],p=r+d,m=i+f,h=a;0<=p&&p<=s&&0<=m&&m<=c&&l.push(new v(p,m,h,e))}return t.set(this,l),l},v.prototype.hash=function(){return r(this.z,this.y,this.x)},v.prototype.equals=function(e){return this._geometry===e._geometry&&this.z===e.z&&this.y===e.y&&this.x===e.x},v.prototype.cmp=function(e){return f(this.z,e.z)||f(this.y,e.y)||f(this.x,e.x)},v.prototype.str=function(){return`FlatTile(`+tile.x+`, `+tile.y+`, `+tile.z+`)`};function y(e){this.constructor.super_.call(this,e),this._width=e.width,this._height=e.height,this._tileWidth=e.tileWidth,this._tileHeight=e.tileHeight}n(y,o),y.prototype.width=function(){return this._width},y.prototype.height=function(){return this._height},y.prototype.tileWidth=function(){return this._tileWidth},y.prototype.tileHeight=function(){return this._tileHeight},y.prototype._validateWithParentLevel=function(e){var t=this.width(),n=this.height(),r=this.tileWidth(),i=this.tileHeight(),a=e.width(),o=e.height(),s=e.tileWidth(),c=e.tileHeight();if(t%a!==0)return Error(`Level width must be multiple of parent level: `+t+` vs. `+a);if(n%o!==0)return Error(`Level height must be multiple of parent level: `+n+` vs. `+o);if(r%s!==0)return Error(`Level tile width must be multiple of parent level: `+r+` vs. `+s);if(i%c!==0)return Error(`Level tile height must be multiple of parent level: `+i+` vs. `+c)};function b(e){if(p(e)!==`array`)throw Error(`Level list must be an array`);this.levelList=s(e,y),this.selectableLevelList=c(this.levelList);for(var t=1;t<this.levelList.length;t++)this.levelList[t]._validateWithParentLevel(this.levelList[t-1]);this._tileSearcher=new i(this),this._neighborsCache=new a(g),this._vec=h.create(),this._viewSize={}}b.prototype.maxTileSize=function(){for(var e=0,t=0;t<this.levelList.length;t++){var n=this.levelList[t];e=Math.max(e,n.tileWidth,n.tileHeight)}return e},b.prototype.levelTiles=function(e,t){var n=this.levelList.indexOf(e),r=e.numHorizontalTiles()-1,i=e.numVerticalTiles()-1;t||=[];for(var a=0;a<=r;a++)for(var o=0;o<=i;o++)t.push(new v(a,o,n,this));return t},b.prototype._closestTile=function(e,t){var n=this._vec;h.set(n,0,0,1,1),h.transformMat4(n,n,e.inverseProjection());var r=.5+n[0],i=.5-n[1],a=this.levelList.indexOf(t),o=t.width(),s=t.height(),c=t.tileWidth(),u=t.tileHeight(),d=t.numHorizontalTiles(),f=t.numVerticalTiles();return new v(l(Math.floor(r*o/c),0,d-1),l(Math.floor(i*s/u),0,f-1),a,this)},b.prototype.visibleTiles=function(e,t,n){var r=this._viewSize,i=this._tileSearcher;if(n||=[],e.size(r),r.width===0||r.height===0)return n;var a=this._closestTile(e,t);if(!i.search(e,a,n))throw Error(`Starting tile is not visible`);return n},b.Tile=b.prototype.Tile=v,b.type=b.prototype.type=`flat`,v.type=v.prototype.type=`flat`,t.exports=b})),is=s(((e,t)=>{var n=k(),r=qo(),i=$o(),a=es(),o=Qo(),s=ts();function c(e,t){this.z=e,this._geometry=t,this._level=t.levelList[e]}c.prototype.rotX=function(){return 0},c.prototype.rotY=function(){return 0},c.prototype.centerX=function(){return .5},c.prototype.centerY=function(){return .5},c.prototype.scaleX=function(){return 1},c.prototype.scaleY=function(){return 1},c.prototype.parent=function(){return this.z===0?null:new c(this.z-1,this._geometry)},c.prototype.children=function(e){return this.z===this._geometry.levelList.length-1?null:(e||=[],e.push(new c(this.z+1,this._geometry)),e)},c.prototype.neighbors=function(){return[]},c.prototype.hash=function(){return r(this.z)},c.prototype.equals=function(e){return this._geometry===e._geometry&&this.z===e.z},c.prototype.cmp=function(e){return i(this.z,e.z)},c.prototype.str=function(){return`EquirectTile(`+tile.z+`)`};function l(e){this.constructor.super_.call(this,e),this._width=e.width}n(l,o),l.prototype.width=function(){return this._width},l.prototype.height=function(){return this._width/2},l.prototype.tileWidth=function(){return this._width},l.prototype.tileHeight=function(){return this._width/2};function u(e){if(s(e)!==`array`)throw Error(`Level list must be an array`);this.levelList=a.makeLevelList(e,l),this.selectableLevelList=a.makeSelectableLevelList(this.levelList)}u.prototype.maxTileSize=function(){for(var e=0,t=0;t<this.levelList.length;t++){var n=this.levelList[t];e=Math.max(e,n.tileWidth,n.tileHeight)}return e},u.prototype.levelTiles=function(e,t){var n=this.levelList.indexOf(e);return t||=[],t.push(new c(n,this)),t},u.prototype.visibleTiles=function(e,t,n){var r=new c(this.levelList.indexOf(t),this);n||=[],n.length=0,n.push(r)},u.Tile=u.prototype.Tile=c,u.type=u.prototype.type=`equirect`,c.type=c.prototype.type=`equirect`,t.exports=u})),as=s(((e,t)=>{function n(e,t,n){return 2*Math.atan(n*Math.tan(e/2)/t)}function r(e,t,r){return n(e,t,r)}function i(e,t,r){return n(e,t,Math.sqrt(t*t+r*r))}function a(e,t,r){return n(e,r,t)}function o(e,t,r){return n(e,r,Math.sqrt(t*t+r*r))}function s(e,t,r){return n(e,Math.sqrt(t*t+r*r),t)}function c(e,t,r){return n(e,Math.sqrt(t*t+r*r),r)}t.exports={convert:n,htov:r,htod:i,vtoh:a,vtod:o,dtoh:s,dtov:c}})),os=s(((e,t)=>{function n(e){return typeof e==`number`&&isFinite(e)}t.exports=n})),ss=s(((e,t)=>{function n(e){return e.toPrecision(15)}t.exports=n})),cs=s(((e,t)=>{function n(){var e=arguments;return function(t){for(var n=t,r=0;r<e.length;r++)n=e[r].call(null,n);return n}}t.exports=n})),ls=s(((e,t)=>{var n=_(),r=(Fo(),d(Po)).mat4,i=(Fo(),d(Po)).vec4,a=ee(),o=as(),s=Jo(),c=os(),l=Io(),u=ss(),f=cs(),p=w(),m=0,h=0,g=0,v=0,y=0,b=Math.PI/4,x=0,S=0,C=1e-6;function T(e,t){this._yaw=e&&e.yaw!=null?e.yaw:g,this._pitch=e&&e.pitch!=null?e.pitch:v,this._roll=e&&e.roll!=null?e.roll:y,this._fov=e&&e.fov!=null?e.fov:b,this._width=e&&e.width!=null?e.width:m,this._height=e&&e.height!=null?e.height:h,this._projectionCenterX=e&&e.projectionCenterX!=null?e.projectionCenterX:x,this._projectionCenterY=e&&e.projectionCenterY!=null?e.projectionCenterY:S,this._limiter=t||null,this._projMatrix=r.create(),this._invProjMatrix=r.create(),this._frustum=[i.create(),i.create(),i.create(),i.create(),i.create()],this._projectionChanged=!0,this._params={},this._fovs={},this._tmpVec=i.create(),this._update()}n(T),T.prototype.destroy=function(){p(this)},T.prototype.yaw=function(){return this._yaw},T.prototype.pitch=function(){return this._pitch},T.prototype.roll=function(){return this._roll},T.prototype.projectionCenterX=function(){return this._projectionCenterX},T.prototype.projectionCenterY=function(){return this._projectionCenterY},T.prototype.fov=function(){return this._fov},T.prototype.width=function(){return this._width},T.prototype.height=function(){return this._height},T.prototype.size=function(e){return e||={},e.width=this._width,e.height=this._height,e},T.prototype.parameters=function(e){return e||={},e.yaw=this._yaw,e.pitch=this._pitch,e.roll=this._roll,e.fov=this._fov,e},T.prototype.limiter=function(){return this._limiter},T.prototype.setYaw=function(e){this._resetParams(),this._params.yaw=e,this._update(this._params)},T.prototype.setPitch=function(e){this._resetParams(),this._params.pitch=e,this._update(this._params)},T.prototype.setRoll=function(e){this._resetParams(),this._params.roll=e,this._update(this._params)},T.prototype.setFov=function(e){this._resetParams(),this._params.fov=e,this._update(this._params)},T.prototype.setProjectionCenterX=function(e){this._resetParams(),this._params.projectionCenterX=e,this._update(this._params)},T.prototype.setProjectionCenterY=function(e){this._resetParams(),this._params.projectionCenterY=e,this._update(this._params)},T.prototype.offsetYaw=function(e){this.setYaw(this._yaw+e)},T.prototype.offsetPitch=function(e){this.setPitch(this._pitch+e)},T.prototype.offsetRoll=function(e){this.setRoll(this._roll+e)},T.prototype.offsetFov=function(e){this.setFov(this._fov+e)},T.prototype.setSize=function(e){this._resetParams(),this._params.width=e.width,this._params.height=e.height,this._update(this._params)},T.prototype.setParameters=function(e){this._resetParams(),this._params.yaw=e.yaw,this._params.pitch=e.pitch,this._params.roll=e.roll,this._params.fov=e.fov,this._params.projectionCenterX=e.projectionCenterX,this._params.projectionCenterY=e.projectionCenterY,this._update(this._params)},T.prototype.setLimiter=function(e){this._limiter=e||null,this._update()},T.prototype._resetParams=function(){var e=this._params;e.yaw=null,e.pitch=null,e.roll=null,e.fov=null,e.width=null,e.height=null},T.prototype._update=function(e){e??=(this._resetParams(),this._params);var t=this._yaw,n=this._pitch,r=this._roll,i=this._fov,a=this._projectionCenterX,o=this._projectionCenterY,s=this._width,l=this._height;if(e.yaw=e.yaw==null?t:e.yaw,e.pitch=e.pitch==null?n:e.pitch,e.roll=e.roll==null?r:e.roll,e.fov=e.fov==null?i:e.fov,e.width=e.width==null?s:e.width,e.height=e.height==null?l:e.height,e.projectionCenterX=e.projectionCenterX==null?a:e.projectionCenterX,e.projectionCenterY=e.projectionCenterY==null?o:e.projectionCenterY,this._limiter&&(e=this._limiter(e),!e))throw Error(`Bad view limiter`);e=this._normalize(e);var u=e.yaw,d=e.pitch,f=e.roll,p=e.fov,m=e.width,h=e.height,g=e.projectionCenterX,_=e.projectionCenterY;if(!c(u)||!c(d)||!c(f)||!c(p)||!c(m)||!c(h)||!c(g)||!c(_))throw Error(`Bad view - suspect a broken limiter`);this._yaw=u,this._pitch=d,this._roll=f,this._fov=p,this._width=m,this._height=h,this._projectionCenterX=g,this._projectionCenterY=_,(u!==t||d!==n||f!==r||p!==i||m!==s||h!==l||g!==a||_!==o)&&(this._projectionChanged=!0,this.emit(`change`)),(m!==s||h!==l)&&this.emit(`resize`)},T.prototype._normalize=function(e){this._normalizeCoordinates(e);var t=o.htov(Math.PI,e.width,e.height),n=isNaN(t)?Math.PI:Math.min(Math.PI,t);return e.fov=l(e.fov,C,n-C),e},T.prototype._normalizeCoordinates=function(e){return`yaw`in e&&(e.yaw=s(e.yaw-Math.PI,-2*Math.PI)+Math.PI),`pitch`in e&&(e.pitch=s(e.pitch-Math.PI,-2*Math.PI)+Math.PI),`roll`in e&&(e.roll=s(e.roll-Math.PI,-2*Math.PI)+Math.PI),e},T.prototype.normalizeToClosest=function(e,t){var n=this._yaw,r=this._pitch,i=e.yaw,a=e.pitch,o=i-2*Math.PI,s=i+2*Math.PI;Math.abs(o-n)<Math.abs(i-n)?i=o:Math.abs(s-n)<Math.abs(i-n)&&(i=s);var c=a-2*Math.PI,l=a+2*Math.PI;return Math.abs(c-r)<Math.abs(a-r)?a=c:Math.abs(c-r)<Math.abs(a-r)&&(a=l),t||={},t.yaw=i,t.pitch=a,t},T.prototype.updateWithControlParameters=function(e){var t=this._fov,n=o.vtoh(t,this._width,this._height);isNaN(n)&&(n=t),this.offsetYaw(e.axisScaledX*n+e.x*2*n+e.yaw),this.offsetPitch(e.axisScaledY*t+e.y*2*n+e.pitch),this.offsetRoll(-e.roll),this.offsetFov(e.zoom*t)},T.prototype._updateProjection=function(){var e=this._projMatrix,t=this._invProjMatrix,n=this._frustum;if(this._projectionChanged){var i=this._width,a=this._height,s=this._fov,c=o.vtoh(s,i,a),l=i/a,u=this._projectionCenterX,d=this._projectionCenterY;if(u!==0||d!==0){var f=Math.atan(u*2*Math.tan(c/2)),p=Math.atan(d*2*Math.tan(s/2)),m=this._fovs;m.leftDegrees=(c/2+f)*180/Math.PI,m.rightDegrees=(c/2-f)*180/Math.PI,m.upDegrees=(s/2+p)*180/Math.PI,m.downDegrees=(s/2-p)*180/Math.PI,r.perspectiveFromFieldOfView(e,m,-1,1)}else r.perspective(e,s,l,-1,1);r.rotateZ(e,e,this._roll),r.rotateX(e,e,this._pitch),r.rotateY(e,e,this._yaw),r.invert(t,e),this._matrixToFrustum(e,n),this._projectionChanged=!1}},T.prototype._matrixToFrustum=function(e,t){i.set(t[0],e[3]+e[0],e[7]+e[4],e[11]+e[8],0),i.set(t[1],e[3]-e[0],e[7]-e[4],e[11]-e[8],0),i.set(t[2],e[3]+e[1],e[7]+e[5],e[11]+e[9],0),i.set(t[3],e[3]-e[1],e[7]-e[5],e[11]-e[9],0),i.set(t[4],e[3]+e[2],e[7]+e[6],e[11]+e[10],0)},T.prototype.projection=function(){return this._updateProjection(),this._projMatrix},T.prototype.inverseProjection=function(){return this._updateProjection(),this._invProjMatrix},T.prototype.intersects=function(e){this._updateProjection();for(var t=this._frustum,n=this._tmpVec,r=0;r<t.length;r++){for(var a=t[r],o=!1,s=0;s<e.length;s++){var c=e[s];i.set(n,c[0],c[1],c[2],0),i.dot(a,n)>=0&&(o=!0)}if(!o)return!1}return!0},T.prototype.selectLevel=function(e){for(var t=a()*this._height,n=Math.tan(.5*this._fov),r=0;r<e.length;r++){var i=e[r];if(n*i.height()>=t)return i}return e[e.length-1]},T.prototype.coordinatesToScreen=function(e,t){var n=this._tmpVec;t||={};var r=this._width,a=this._height;if(r<=0||a<=0)return t.x=null,t.y=null,null;var o=e.yaw,s=e.pitch,c=Math.sin(o)*Math.cos(s),l=-Math.sin(s),u=-Math.cos(o)*Math.cos(s);if(i.set(n,c,l,u,1),i.transformMat4(n,n,this.projection()),n[3]>=0)t.x=r*(n[0]/n[3]+1)/2,t.y=a*(1-n[1]/n[3])/2;else return t.x=null,t.y=null,null;return t},T.prototype.screenToCoordinates=function(e,t){var n=this._tmpVec;t||={};var r=this._width,a=this._height,o=2*e.x/r-1,s=1-2*e.y/a;i.set(n,o,s,1,1),i.transformMat4(n,n,this.inverseProjection());var c=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);return t.yaw=Math.atan2(n[0],-n[2]),t.pitch=Math.acos(n[1]/c)-Math.PI/2,this._normalizeCoordinates(t),t},T.prototype.coordinatesToPerspectiveTransform=function(e,t,n){n||=``;var r=this._height,i=this._width,a=this._fov,o=.5*r/Math.tan(a/2),s=``;return s+=`translateX(`+u(i/2)+`px) `,s+=`translateY(`+u(r/2)+`px) `,s+=`translateX(-50%) translateY(-50%) `,s+=`perspective(`+u(o)+`px) `,s+=`translateZ(`+u(o)+`px) `,s+=`rotateZ(`+u(-this._roll)+`rad) `,s+=`rotateX(`+u(-this._pitch)+`rad) `,s+=`rotateY(`+u(this._yaw)+`rad) `,s+=`rotateY(`+u(-e.yaw)+`rad) `,s+=`rotateX(`+u(e.pitch)+`rad) `,s+=`translateZ(`+u(-t)+`px) `,s+=n+` `,s},T.limit={yaw:function(e,t){return function(n){return n.yaw=l(n.yaw,e,t),n}},pitch:function(e,t){return function(n){return n.pitch=l(n.pitch,e,t),n}},roll:function(e,t){return function(n){return n.roll=l(n.roll,e,t),n}},hfov:function(e,t){return function(n){var r=n.width,i=n.height;if(r>0&&i>0){var a=o.htov(e,r,i),s=o.htov(t,r,i);n.fov=l(n.fov,a,s)}return n}},vfov:function(e,t){return function(n){return n.fov=l(n.fov,e,t),n}},resolution:function(e){return function(t){var n=t.height;if(n){var r=a()*n,i=2*Math.atan(r/e);t.fov=l(t.fov,i,1/0)}return t}},traditional:function(e,t,n){return n??=t,f(T.limit.resolution(e),T.limit.vfov(0,t),T.limit.hfov(0,n),T.limit.pitch(-Math.PI/2,Math.PI/2))}},T.type=T.prototype.type=`rectilinear`,t.exports=T})),us=s(((e,t)=>{var n=_(),r=(Fo(),d(Po)).mat4,i=(Fo(),d(Po)).vec4,a=ee(),o=os(),s=Io(),c=w(),l=0,u=0,f=.5,p=.5,m=1,h=[1,0,1,0],g=[-1,-1,1,1],v=1e-6;function y(e,t){if(!(e&&e.mediaAspectRatio!=null))throw Error(`mediaAspectRatio must be defined`);this._x=e&&e.x!=null?e.x:f,this._y=e&&e.y!=null?e.y:p,this._zoom=e&&e.zoom!=null?e.zoom:m,this._mediaAspectRatio=e.mediaAspectRatio,this._width=e&&e.width!=null?e.width:l,this._height=e&&e.height!=null?e.height:u,this._limiter=t||null,this._projMatrix=r.create(),this._invProjMatrix=r.create(),this._frustum=[0,0,0,0],this._projectionChanged=!0,this._params={},this._vec=i.create(),this._update()}n(y),y.prototype.destroy=function(){c(this)},y.prototype.x=function(){return this._x},y.prototype.y=function(){return this._y},y.prototype.zoom=function(){return this._zoom},y.prototype.mediaAspectRatio=function(){return this._mediaAspectRatio},y.prototype.width=function(){return this._width},y.prototype.height=function(){return this._height},y.prototype.size=function(e){return e||={},e.width=this._width,e.height=this._height,e},y.prototype.parameters=function(e){return e||={},e.x=this._x,e.y=this._y,e.zoom=this._zoom,e.mediaAspectRatio=this._mediaAspectRatio,e},y.prototype.limiter=function(){return this._limiter},y.prototype.setX=function(e){this._resetParams(),this._params.x=e,this._update(this._params)},y.prototype.setY=function(e){this._resetParams(),this._params.y=e,this._update(this._params)},y.prototype.setZoom=function(e){this._resetParams(),this._params.zoom=e,this._update(this._params)},y.prototype.offsetX=function(e){this.setX(this._x+e)},y.prototype.offsetY=function(e){this.setY(this._y+e)},y.prototype.offsetZoom=function(e){this.setZoom(this._zoom+e)},y.prototype.setMediaAspectRatio=function(e){this._resetParams(),this._params.mediaAspectRatio=e,this._update(this._params)},y.prototype.setSize=function(e){this._resetParams(),this._params.width=e.width,this._params.height=e.height,this._update(this._params)},y.prototype.setParameters=function(e){this._resetParams(),this._params.x=e.x,this._params.y=e.y,this._params.zoom=e.zoom,this._params.mediaAspectRatio=e.mediaAspectRatio,this._update(this._params)},y.prototype.setLimiter=function(e){this._limiter=e||null,this._update()},y.prototype._resetParams=function(){var e=this._params;e.x=null,e.y=null,e.zoom=null,e.mediaAspectRatio=null,e.width=null,e.height=null},y.prototype._update=function(e){e??=(this._resetParams(),this._params);var t=this._x,n=this._y,r=this._zoom,i=this._mediaAspectRatio,a=this._width,c=this._height;if(e.x=e.x==null?t:e.x,e.y=e.y==null?n:e.y,e.zoom=e.zoom==null?r:e.zoom,e.mediaAspectRatio=e.mediaAspectRatio==null?i:e.mediaAspectRatio,e.width=e.width==null?a:e.width,e.height=e.height==null?c:e.height,this._limiter&&(e=this._limiter(e),!e))throw Error(`Bad view limiter`);var l=e.x,u=e.y,d=e.zoom,f=e.mediaAspectRatio,p=e.width,m=e.height;if(!o(l)||!o(u)||!o(d)||!o(f)||!o(p)||!o(m))throw Error(`Bad view - suspect a broken limiter`);d=s(d,v,1/0),this._x=l,this._y=u,this._zoom=d,this._mediaAspectRatio=f,this._width=p,this._height=m,(l!==t||u!==n||d!==r||f!==i||p!==a||m!==c)&&(this._projectionChanged=!0,this.emit(`change`)),(p!==a||m!==c)&&this.emit(`resize`)},y.prototype._zoomX=function(){return this._zoom},y.prototype._zoomY=function(){var e=this._mediaAspectRatio,t=this._width/this._height,n=this._zoom,r=n*e/t;return isNaN(r)&&(r=n),r},y.prototype.updateWithControlParameters=function(e){var t=this.zoom(),n=this._zoomX(),r=this._zoomY();this.offsetX(e.axisScaledX*n+e.x*t),this.offsetY(e.axisScaledY*r+e.y*t),this.offsetZoom(e.zoom*t)},y.prototype._updateProjection=function(){var e=this._projMatrix,t=this._invProjMatrix,n=this._frustum;if(this._projectionChanged){var i=this._x,a=this._y,o=this._zoomX(),s=this._zoomY(),c=n[0]=.5-a+.5*s,l=n[1]=i-.5+.5*o,u=n[2]=.5-a-.5*s,d=n[3]=i-.5-.5*o;r.ortho(e,d,l,u,c,-1,1),r.invert(t,e),this._projectionChanged=!1}},y.prototype.projection=function(){return this._updateProjection(),this._projMatrix},y.prototype.inverseProjection=function(){return this._updateProjection(),this._invProjMatrix},y.prototype.intersects=function(e){this._updateProjection();for(var t=this._frustum,n=0;n<t.length;n++){for(var r=t[n],i=h[n],a=g[n],o=!1,s=0;s<e.length;s++){var c=e[s];if(a<0&&c[i]<r||a>0&&c[i]>r){o=!0;break}}if(!o)return!1}return!0},y.prototype.selectLevel=function(e){for(var t=a()*this.width(),n=this._zoom,r=0;r<e.length;r++){var i=e[r];if(n*i.width()>=t)return i}return e[e.length-1]},y.prototype.coordinatesToScreen=function(e,t){var n=this._vec;t||={};var r=this._width,a=this._height;if(r<=0||a<=0)return t.x=null,t.y=null,null;var o=e&&e.x!=null?e.x:f,s=e&&e.y!=null?e.y:p;i.set(n,o-.5,.5-s,-1,1),i.transformMat4(n,n,this.projection());for(var c=0;c<3;c++)n[c]/=n[3];return t.x=r*(n[0]+1)/2,t.y=a*(1-n[1])/2,t},y.prototype.screenToCoordinates=function(e,t){var n=this._vec;t||={};var r=this._width,a=this._height,o=2*e.x/r-1,s=1-2*e.y/a;return i.set(n,o,s,1,1),i.transformMat4(n,n,this.inverseProjection()),t.x=.5+n[0],t.y=.5-n[1],t},y.limit={x:function(e,t){return function(n){return n.x=s(n.x,e,t),n}},y:function(e,t){return function(n){return n.y=s(n.y,e,t),n}},zoom:function(e,t){return function(n){return n.zoom=s(n.zoom,e,t),n}},resolution:function(e){return function(t){if(t.width<=0||t.height<=0)return t;var n=t.width,r=a()*n/e;return t.zoom=s(t.zoom,r,1/0),t}},visibleX:function(e,t){return function(n){var r=t-e;n.zoom>r&&(n.zoom=r);var i=e+.5*n.zoom,a=t-.5*n.zoom;return n.x=s(n.x,i,a),n}},visibleY:function(e,t){return function(n){if(n.width<=0||n.height<=0)return n;var r=n.width/n.height/n.mediaAspectRatio,i=(t-e)*r;n.zoom>i&&(n.zoom=i);var a=e+.5*n.zoom/r,o=t-.5*n.zoom/r;return n.y=s(n.y,a,o),n}},letterbox:function(){return function(e){if(e.width<=0||e.height<=0)return e;var t=e.width/e.height,n=1,r=t/e.mediaAspectRatio;e.mediaAspectRatio>=t&&(e.zoom=Math.min(e.zoom,n)),e.mediaAspectRatio<=t&&(e.zoom=Math.min(e.zoom,r));var i,a;e.zoom>n?i=a=.5:(i=0+.5*e.zoom/n,a=1-.5*e.zoom/n);var o,c;return e.zoom>r?o=c=.5:(o=0+.5*e.zoom/r,c=1-.5*e.zoom/r),e.x=s(e.x,i,a),e.y=s(e.y,o,c),e}}},y.type=y.prototype.type=`flat`,t.exports=y})),ds=s(((e,t)=>{var n=y(),r=Jo();function i(e){this._concurrency=e&&e.concurrency||1,this._paused=e&&!!e.paused||!1,this._pool=[];for(var t=0;t<this._concurrency;t++)this._pool.push(new n(e));this._next=0}i.prototype.length=function(){for(var e=0,t=0;t<this._pool.length;t++)e+=this._pool[t].length();return e},i.prototype.push=function(e,t){var n=this._next,i=this._pool[n].push(e,t);return this._next=r(this._next+1,this._concurrency),i},i.prototype.pause=function(){if(!this._paused){this._paused=!0;for(var e=0;e<this._concurrency;e++)this._pool[e].pause()}},i.prototype.resume=function(){if(this._paused){this._paused=!1;for(var e=0;e<this._concurrency;e++)this._pool[e].resume()}},t.exports=i})),fs=s(((e,t)=>{function n(){}t.exports=n})),ps=s(((e,t)=>{var n=fs();function r(){var e=Array.prototype.slice.call(arguments,0);return function(){var t=e.slice(0),r=null,i=null,a=arguments.length?Array.prototype.slice.call(arguments,0,arguments.length-1):[],o=arguments.length?arguments[arguments.length-1]:n;function s(){if(arguments[0])r=i=null,o.apply(null,arguments);else if(!t.length)r=i=null,o.apply(null,arguments);else{r=t.shift();var e=r,n=Array.prototype.slice.call(arguments,1);n.push(s);var a=r.apply(null,n);if(e===r){if(typeof a!=`function`)throw Error(`chain: chaining on non-cancellable function`);i=a}}}function c(){i&&i.apply(null,arguments)}return a.unshift(null),s.apply(null,a),c}}t.exports=r})),ms=s(((e,t)=>{function n(e,t){var n=null;function r(){n!=null&&(n=null,t(null))}function i(){n!=null&&(clearTimeout(n),n=null,t.apply(null,arguments))}return n=setTimeout(r,e),i}t.exports=n})),hs=s(((e,t)=>{var n=_(),r=A(),i=ds(),a=ps(),o=ms(),s=v(),c={x:`x`,y:`y`,z:`z`,f:`face`},l=`bdflru`,u=4,d=1e4;function f(e,t){t||={},this._loadPool=new i({concurrency:t.concurrency||u}),this._retryDelay=t.retryDelay||d,this._retryMap={},this._sourceFromTile=e}n(f),f.prototype.loadAsset=function(e,t,n){var i=this,c=this._retryDelay,l=this._retryMap,u=this._sourceFromTile(t),d=u.url,f=u.rect,p=e.loadImage.bind(e,d,f),m=function(e){return i._loadPool.push(p,function(n,a){n?(n instanceof r&&(l[d]=s(),i.emit(`networkError`,n,t)),e(n,t)):(delete l[d],e(null,t,a))})},h,g=l[d];if(g!=null){var _=s()-g;_<c?h=c-_:(h=0,delete l[d])}return a(o.bind(null,h),m)(n)},f.fromString=function(e,t){t||={};var n=t&&t.cubeMapPreviewFaceOrder||l;return new f(t.cubeMapPreviewUrl?i:r,t);function r(t){var n=e;for(var r in c){var i=c[r],a=p(r),o=t.hasOwnProperty(i)?t[i]:``;n=n.replace(a,o)}return{url:n}}function i(e){return e.z===0?a(e):r(e)}function a(e){var r=n.indexOf(e.face)/6;return{url:t.cubeMapPreviewUrl,rect:{x:0,y:r,width:1,height:1/6}}}};function p(e){var t=`\\{(`+e+`)\\}`;return new RegExp(t,`g`)}t.exports=f})),gs=s(((e,t)=>{function n(e){this._asset=e}n.prototype.asset=function(){return this._asset},n.prototype.loadAsset=function(e,t,n){var r=this,i=setTimeout(function(){n(null,t,r._asset)},0);function a(){clearTimeout(i),n.apply(null,arguments)}return a},t.exports=n})),_s=s(((e,t)=>{var n=O(),r=k(),i=_(),a=w();function o(e){this.constructor.super_.call(this,e),this._timestamp=0}r(o,n),i(o),o.prototype.destroy=function(){a(this)},o.prototype.timestamp=function(){return this._timestamp},o.prototype.isDynamic=function(){return!0},o.prototype.markDirty=function(){this._timestamp++,this.emit(`change`)},t.exports=o})),vs=s(((e,t)=>{var n=Jo(),r=64;function i(e){if(e!=null&&(!isFinite(e)||Math.floor(e)!==e||e<1))throw Error(`Map: invalid capacity`);this._capacity=e||r,this._keyBuckets=[],this._valBuckets=[];for(var t=0;t<this._capacity;t++)this._keyBuckets.push([]),this._valBuckets.push([]);this._size=0}i.prototype.get=function(e){for(var t=n(e.hash(),this._capacity),r=this._keyBuckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return this._valBuckets[t][i]}return null},i.prototype.set=function(e,t){for(var r=n(e.hash(),this._capacity),i=this._keyBuckets[r],a=this._valBuckets[r],o=0;o<i.length;o++){var s=i[o];if(e.equals(s)){var c=a[o];return i[o]=e,a[o]=t,c}}return i.push(e),a.push(t),this._size++,null},i.prototype.del=function(e){for(var t=n(e.hash(),this._capacity),r=this._keyBuckets[t],i=this._valBuckets[t],a=0;a<r.length;a++){var o=r[a];if(e.equals(o)){for(var s=i[a],c=a;c<r.length-1;c++)r[c]=r[c+1],i[c]=i[c+1];return--r.length,--i.length,this._size--,s}}return null},i.prototype.has=function(e){for(var t=n(e.hash(),this._capacity),r=this._keyBuckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return!0}return!1},i.prototype.size=function(){return this._size},i.prototype.clear=function(){for(var e=0;e<this._capacity;e++)this._keyBuckets[e].length=0,this._valBuckets[e].length=0;this._size=0},i.prototype.forEach=function(e){for(var t=0,n=0;n<this._capacity;n++)for(var r=this._keyBuckets[n],i=this._valBuckets[n],a=0;a<r.length;a++)e(r[a],i[a]),t+=1;return t},t.exports=i})),ys=s(((e,t)=>{var n=Jo();function r(e){if(!isFinite(e)||Math.floor(e)!==e||e<0)throw Error(`LruSet: invalid capacity`);this._capacity=e,this._elements=Array(this._capacity),this._start=0,this._size=0}r.prototype._index=function(e){return n(this._start+e,this._capacity)},r.prototype.add=function(e){if(this._capacity===0)return e;this.remove(e);var t=this._size===this._capacity?this._elements[this._index(0)]:null;return this._elements[this._index(this._size)]=e,this._size<this._capacity?this._size++:this._start=this._index(1),t},r.prototype.remove=function(e){for(var t=0;t<this._size;t++){var n=this._elements[this._index(t)];if(e.equals(n)){for(var r=t;r<this._size-1;r++)this._elements[this._index(r)]=this._elements[this._index(r+1)];return this._size--,n}}return null},r.prototype.has=function(e){for(var t=0;t<this._size;t++)if(e.equals(this._elements[this._index(t)]))return!0;return!1},r.prototype.size=function(){return this._size},r.prototype.clear=function(){this._elements.length=0,this._start=0,this._size=0},r.prototype.forEach=function(e){for(var t=0,n=0;n<this._size;n++)e(this._elements[this._index(n)]),t+=1;return t},t.exports=r})),bs=s(((e,t)=>{function n(e,t){for(var n in t)n in e||(e[n]=t[n]);return e}t.exports=n})),xs=s(((e,t)=>{var n=fs();function r(e){return function(){var t=arguments.length?Array.prototype.slice.call(arguments,0,arguments.length-1):[],r=arguments.length?arguments[arguments.length-1]:n,i=null,a=!1;function o(){!arguments[0]||a?r.apply(null,arguments):i=e.apply(null,t)}return t.push(o),o(!0),function(){a=!0,i.apply(null,arguments)}}}t.exports=r})),Ss=s(((e,t)=>{var n=vs(),r=Yo(),i=ys(),a=_(),o=bs(),s=xs(),c=ps(),l=k(),u=w(),d=typeof MARZIPANODEBUG<`u`&&MARZIPANODEBUG.textureStore,f={IDLE:0,START:1,MARK:2,END:3},p={previouslyVisibleCacheSize:512},m=0;function h(){}l(h,Error);function g(e,t){var n=this,r=m++;n._id=r,n._store=e,n._tile=t,n._asset=null,n._texture=null,n._changeHandler=function(){e.emit(`textureInvalid`,t)};var i=e.source(),a=e.stage(),o=i.loadAsset.bind(i),l=a.createTexture.bind(a),u=c(s(o),l);e.emit(`textureStartLoad`,t),d&&console.log(`loading`,r,t),n._cancel=u(a,t,function(i,a,o,s){n._cancel=null,i?(o&&o.destroy(),s&&s.destroy(),i instanceof h?(e.emit(`textureCancel`,t),d&&console.log(`cancel`,r,t)):(e.emit(`textureError`,t,i),d&&console.log(`error`,r,t))):(n._texture=s,o.isDynamic()?(n._asset=o,o.addEventListener(`change`,n._changeHandler)):o.destroy(),e.emit(`textureLoad`,t),d&&console.log(`load`,r,t))})}g.prototype.asset=function(){return this._asset},g.prototype.texture=function(){return this._texture},g.prototype.destroy=function(){var e=this._id,t=this._store,n=this._tile,r=this._asset,i=this._texture,a=this._cancel;a?a(new h(`Texture load cancelled`)):(r&&(r.removeEventListener(`change`,this._changeHandler),r.destroy()),i&&i.destroy(),t.emit(`textureUnload`,n),d&&console.log(`unload`,e,n),u(this))},a(g);function v(e,t,a){a=o(a||{},p),this._source=e,this._stage=t,this._state=f.IDLE,this._delimCount=0,this._itemMap=new n,this._visible=new r,this._previouslyVisible=new i(a.previouslyVisibleCacheSize),this._pinMap=new n,this._newVisible=new r,this._noLongerVisible=[],this._visibleAgain=[],this._evicted=[]}a(v),v.prototype.destroy=function(){this.clear(),u(this)},v.prototype.stage=function(){return this._stage},v.prototype.source=function(){return this._source},v.prototype.clear=function(){var e=this;e._evicted.length=0,e._itemMap.forEach(function(t){e._evicted.push(t)}),e._evicted.forEach(function(t){e._unloadTile(t)}),e._itemMap.clear(),e._visible.clear(),e._previouslyVisible.clear(),e._pinMap.clear(),e._newVisible.clear(),e._noLongerVisible.length=0,e._visibleAgain.length=0,e._evicted.length=0},v.prototype.clearNotPinned=function(){var e=this;e._evicted.length=0,e._itemMap.forEach(function(t){e._pinMap.has(t)||e._evicted.push(t)}),e._evicted.forEach(function(t){e._unloadTile(t)}),e._visible.clear(),e._previouslyVisible.clear(),e._evicted.length=0},v.prototype.startFrame=function(){if(this._state!==f.IDLE&&this._state!==f.START)throw Error(`TextureStore: startFrame called out of sequence`);this._state=f.START,this._delimCount++},v.prototype.markTile=function(e){if(this._state!==f.START&&this._state!==f.MARK)throw Error(`TextureStore: markTile called out of sequence`);this._state=f.MARK;var t=this._itemMap.get(e),n=t&&t.texture(),r=t&&t.asset();n&&r&&n.refresh(e,r),this._newVisible.add(e)},v.prototype.endFrame=function(){if(this._state!==f.START&&this._state!==f.MARK&&this._state!==f.END)throw Error(`TextureStore: endFrame called out of sequence`);this._state=f.END,this._delimCount--,this._delimCount||(this._update(),this._state=f.IDLE)},v.prototype._update=function(){var e=this;e._noLongerVisible.length=0,e._visible.forEach(function(t){e._newVisible.has(t)||e._noLongerVisible.push(t)}),e._visibleAgain.length=0,e._newVisible.forEach(function(t){e._previouslyVisible.has(t)&&e._visibleAgain.push(t)}),e._visibleAgain.forEach(function(t){e._previouslyVisible.remove(t)}),e._evicted.length=0,e._noLongerVisible.forEach(function(t){var n=e._itemMap.get(t);if(n&&n.texture()){var r=e._previouslyVisible.add(t);r!=null&&e._evicted.push(r)}else n&&e._unloadTile(t)}),e._evicted.forEach(function(t){e._pinMap.has(t)||e._unloadTile(t)}),e._newVisible.forEach(function(t){e._itemMap.get(t)||e._loadTile(t)});var t=e._visible;e._visible=e._newVisible,e._newVisible=t,e._newVisible.clear(),e._noLongerVisible.length=0,e._visibleAgain.length=0,e._evicted.length=0},v.prototype._loadTile=function(e){if(this._itemMap.has(e))throw Error(`TextureStore: loading texture already in cache`);var t=new g(this,e);this._itemMap.set(e,t)},v.prototype._unloadTile=function(e){var t=this._itemMap.del(e);if(!t)throw Error(`TextureStore: unloading texture not in cache`);t.destroy()},v.prototype.asset=function(e){var t=this._itemMap.get(e);return t?t.asset():null},v.prototype.texture=function(e){var t=this._itemMap.get(e);return t?t.texture():null},v.prototype.pin=function(e){var t=(this._pinMap.get(e)||0)+1;return this._pinMap.set(e,t),this._itemMap.has(e)||this._loadTile(e),t},v.prototype.unpin=function(e){var t=this._pinMap.get(e);if(t)t--,t>0?this._pinMap.set(e,t):(this._pinMap.del(e),!this._visible.has(e)&&!this._previouslyVisible.has(e)&&this._unloadTile(e));else throw Error(`TextureStore: unpin when not pinned`);return t},v.prototype.query=function(e){var t=this._itemMap.get(e),n=this._pinMap.get(e)||0;return{visible:this._visible.has(e),previouslyVisible:this._previouslyVisible.has(e),hasAsset:t!=null&&t.asset()!=null,hasTexture:t!=null&&t.texture()!=null,pinned:n!==0,pinCount:n}},t.exports=v})),Cs=s(((e,t)=>{function n(e,t){for(var n in t)e[n]=t[n];return e}t.exports=n})),ws=s(((e,t)=>{var n=_(),r=Cs(),i=w();function a(e,t,n,r,i){i||={};var a=this;this._source=e,this._geometry=t,this._view=n,this._textureStore=r,this._effects=i.effects||{},this._fixedLevelIndex=null,this._viewChangeHandler=function(){a.emit(`viewChange`,a.view())},this._view.addEventListener(`change`,this._viewChangeHandler),this._textureStoreChangeHandler=function(){a.emit(`textureStoreChange`,a.textureStore())},this._textureStore.addEventListener(`textureLoad`,this._textureStoreChangeHandler),this._textureStore.addEventListener(`textureError`,this._textureStoreChangeHandler),this._textureStore.addEventListener(`textureInvalid`,this._textureStoreChangeHandler)}n(a),a.prototype.destroy=function(){this._view.removeEventListener(`change`,this._viewChangeHandler),this._textureStore.removeEventListener(`textureLoad`,this._textureStoreChangeHandler),this._textureStore.removeEventListener(`textureError`,this._textureStoreChangeHandler),this._textureStore.removeEventListener(`textureInvalid`,this._textureStoreChangeHandler),i(this)},a.prototype.source=function(){return this._source},a.prototype.geometry=function(){return this._geometry},a.prototype.view=function(){return this._view},a.prototype.textureStore=function(){return this._textureStore},a.prototype.effects=function(){return this._effects},a.prototype.setEffects=function(e){this._effects=e,this.emit(`effectsChange`,this._effects)},a.prototype.mergeEffects=function(e){r(this._effects,e),this.emit(`effectsChange`,this._effects)},a.prototype.fixedLevel=function(){return this._fixedLevelIndex},a.prototype.setFixedLevel=function(e){if(e!==this._fixedLevelIndex){if(e!=null&&(e>=this._geometry.levelList.length||e<0))throw Error(`Level index out of range: `+e);this._fixedLevelIndex=e,this.emit(`fixedLevelChange`,this._fixedLevelIndex)}},a.prototype._selectLevel=function(){return this._fixedLevelIndex==null?this._view.selectLevel(this._geometry.selectableLevelList):this._geometry.levelList[this._fixedLevelIndex]},a.prototype.visibleTiles=function(e){var t=this._selectLevel();return this._geometry.visibleTiles(this._view,t,e)},a.prototype.pinLevel=function(e){for(var t=this._geometry.levelList[e],n=this._geometry.levelTiles(t),r=0;r<n.length;r++)this._textureStore.pin(n[r])},a.prototype.unpinLevel=function(e){for(var t=this._geometry.levelList[e],n=this._geometry.levelTiles(t),r=0;r<n.length;r++)this._textureStore.unpin(n[r])},a.prototype.pinFirstLevel=function(){return this.pinLevel(0)},a.prototype.unpinFirstLevel=function(){return this.unpinLevel(0)},t.exports=a})),Ts=s(((e,t)=>{var n=_(),r=w();function i(e){var t=this;this._stage=e,this._running=!1,this._rendering=!1,this._requestHandle=null,this._boundLoop=this._loop.bind(this),this._renderInvalidHandler=function(){t._rendering||t.renderOnNextFrame()},this._stage.addEventListener(`renderInvalid`,this._renderInvalidHandler)}n(i),i.prototype.destroy=function(){this.stop(),this._stage.removeEventListener(`renderInvalid`,this._renderInvalidHandler),r(this)},i.prototype.stage=function(){return this._stage},i.prototype.start=function(){this._running=!0,this.renderOnNextFrame()},i.prototype.stop=function(){this._requestHandle&&=(window.cancelAnimationFrame(this._requestHandle),null),this._running=!1},i.prototype.renderOnNextFrame=function(){this._running&&!this._requestHandle&&(this._requestHandle=window.requestAnimationFrame(this._boundLoop))},i.prototype._loop=function(){if(!this._running)throw Error(`Render loop running while in stopped state`);this._requestHandle=null,this._rendering=!0,this.emit(`beforeRender`),this._rendering=!1,this._stage.render(),this.emit(`afterRender`)},t.exports=i})),Es=s(((e,t)=>{function n(){this.velocity=null,this.friction=null,this.offset=null}n.equals=function(e,t){return e.velocity===t.velocity&&e.friction===t.friction&&e.offset===t.offset},n.prototype.equals=function(e){return n.equals(this,e)},n.prototype.update=function(e,t){e.offset&&(this.offset=this.offset||0,this.offset+=e.offset);var n=this.offsetFromVelocity(t);n&&(this.offset=this.offset||0,this.offset+=n),this.velocity=e.velocity,this.friction=e.friction},n.prototype.reset=function(){this.velocity=null,this.friction=null,this.offset=null},n.prototype.velocityAfter=function(e){return this.velocity?this.friction?r(this.velocity,this.friction*e):this.velocity:null},n.prototype.offsetFromVelocity=function(e){e=Math.min(e,this.nullVelocityTime());var t=this.velocityAfter(e);return(this.velocity+t)/2*e},n.prototype.nullVelocityTime=function(){return this.velocity==null?0:this.velocity&&!this.friction?1/0:Math.abs(this.velocity/this.friction)};function r(e,t){return e<0?Math.min(0,e+t):e>0?Math.max(0,e-t):0}t.exports=n})),Ds=s(((e,t)=>{var n=_(),r=Es(),i=w();function a(e,t,n,i,a){if(!e)throw Error(`KeyControlMethod: keyCode must be defined`);if(!t)throw Error(`KeyControlMethod: parameter must be defined`);if(!n)throw Error(`KeyControlMethod: velocity must be defined`);if(!i)throw Error(`KeyControlMethod: friction must be defined`);a||=document,this._keyCode=e,this._parameter=t,this._velocity=n,this._friction=i,this._element=a,this._keydownHandler=this._handlePress.bind(this),this._keyupHandler=this._handleRelease.bind(this),this._blurHandler=this._handleBlur.bind(this),this._element.addEventListener(`keydown`,this._keydownHandler),this._element.addEventListener(`keyup`,this._keyupHandler),window.addEventListener(`blur`,this._blurHandler),this._dynamics=new r,this._pressing=!1}n(a),a.prototype.destroy=function(){this._element.removeEventListener(`keydown`,this._keydownHandler),this._element.removeEventListener(`keyup`,this._keyupHandler),window.removeEventListener(`blur`,this._blurHandler),i(this)},a.prototype._handlePress=function(e){e.keyCode===this._keyCode&&(this._pressing=!0,this._dynamics.velocity=this._velocity,this._dynamics.friction=0,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`active`))},a.prototype._handleRelease=function(e){e.keyCode===this._keyCode&&(this._pressing&&(this._dynamics.friction=this._friction,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`inactive`)),this._pressing=!1)},a.prototype._handleBlur=function(){this._dynamics.velocity=0,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`inactive`),this._pressing=!1},t.exports=a})),Os=s(((e,t)=>{(function(e,n,r,i){var a=[``,`webkit`,`moz`,`MS`,`ms`,`o`],o=n.createElement(`div`),s=`function`,c=Math.round,l=Math.abs,u=Date.now;function d(e,t,n){return setTimeout(_(e,n),t)}function f(e,t,n){return Array.isArray(e)?(p(e,n[t],n),!0):!1}function p(e,t,n){var r;if(e){if(e.forEach)e.forEach(t,n);else if(e.length!==i)for(r=0;r<e.length;)t.call(n,e[r],r,e),r++;else for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)}}function m(e,t,n){for(var r=Object.keys(t),a=0;a<r.length;)(!n||n&&e[r[a]]===i)&&(e[r[a]]=t[r[a]]),a++;return e}function h(e,t){return m(e,t,!0)}function g(e,t,n){var r=t.prototype,i=e.prototype=Object.create(r);i.constructor=e,i._super=r,n&&m(i,n)}function _(e,t){return function(){return e.apply(t,arguments)}}function v(e,t){return typeof e==s?e.apply(t&&t[0]||i,t):e}function y(e,t){return e===i?t:e}function b(e,t,n){p(w(t),function(t){e.addEventListener(t,n,!1)})}function x(e,t,n){p(w(t),function(t){e.removeEventListener(t,n,!1)})}function S(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function C(e,t){return e.indexOf(t)>-1}function w(e){return e.trim().split(/\s+/g)}function T(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var r=0;r<e.length;){if(n&&e[r][n]==t||!n&&e[r]===t)return r;r++}return-1}function E(e){return Array.prototype.slice.call(e,0)}function D(e,t,n){for(var r=[],i=[],a=0;a<e.length;){var o=t?e[a][t]:e[a];T(i,o)<0&&r.push(e[a]),i[a]=o,a++}return n&&(r=t?r.sort(function(e,n){return e[t]>n[t]}):r.sort()),r}function O(e,t){for(var n,r,o=t[0].toUpperCase()+t.slice(1),s=0;s<a.length;){if(n=a[s],r=n?n+o:t,r in e)return r;s++}return i}var k=1;function A(){return k++}function j(e){var t=e.ownerDocument;return t.defaultView||t.parentWindow}var M=/mobile|tablet|ip(ad|hone|od)|android/i,ee=`ontouchstart`in e,N=O(e,`PointerEvent`)!==i,P=ee&&M.test(navigator.userAgent),F=`touch`,te=`pen`,I=`mouse`,R=`kinect`,z=25,B=1,V=2,H=4,ne=8,U=1,re=2,ie=4,ae=8,oe=16,se=re|ie,ce=ae|oe,le=se|ce,ue=[`x`,`y`],de=[`clientX`,`clientY`];function fe(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(t){v(e.options.enable,[e])&&n.handler(t)},this.init()}fe.prototype={handler:function(){},init:function(){this.evEl&&b(this.element,this.evEl,this.domHandler),this.evTarget&&b(this.target,this.evTarget,this.domHandler),this.evWin&&b(j(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&x(this.element,this.evEl,this.domHandler),this.evTarget&&x(this.target,this.evTarget,this.domHandler),this.evWin&&x(j(this.element),this.evWin,this.domHandler)}};function pe(e){return new(e.options.inputClass||(N?Pe:P?He:ee?We:ke))(e,me)}function me(e,t,n){var r=n.pointers.length,i=n.changedPointers.length,a=t&B&&r-i===0,o=t&(H|ne)&&r-i===0;n.isFirst=!!a,n.isFinal=!!o,a&&(e.session={}),n.eventType=t,he(e,n),e.emit(`hammer.input`,n),e.recognize(n),e.session.prevInput=n}function he(e,t){var n=e.session,r=t.pointers,i=r.length;n.firstInput||=ve(t),i>1&&!n.firstMultiple?n.firstMultiple=ve(t):i===1&&(n.firstMultiple=!1);var a=n.firstInput,o=n.firstMultiple,s=o?o.center:a.center,c=t.center=ye(r);t.timeStamp=u(),t.deltaTime=t.timeStamp-a.timeStamp,t.angle=Ce(s,c),t.distance=Se(s,c),ge(n,t),t.offsetDirection=xe(t.deltaX,t.deltaY),t.scale=o?Te(o.pointers,r):1,t.rotation=o?we(o.pointers,r):0,_e(n,t);var l=e.element;S(t.srcEvent.target,l)&&(l=t.srcEvent.target),t.target=l}function ge(e,t){var n=t.center,r=e.offsetDelta||{},i=e.prevDelta||{},a=e.prevInput||{};(t.eventType===B||a.eventType===H)&&(i=e.prevDelta={x:a.deltaX||0,y:a.deltaY||0},r=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=i.x+(n.x-r.x),t.deltaY=i.y+(n.y-r.y)}function _e(e,t){var n=e.lastInterval||t,r=t.timeStamp-n.timeStamp,a,o,s,c;if(t.eventType!=ne&&(r>z||n.velocity===i)){var u=n.deltaX-t.deltaX,d=n.deltaY-t.deltaY,f=be(r,u,d);o=f.x,s=f.y,a=l(f.x)>l(f.y)?f.x:f.y,c=xe(u,d),e.lastInterval=t}else a=n.velocity,o=n.velocityX,s=n.velocityY,c=n.direction;t.velocity=a,t.velocityX=o,t.velocityY=s,t.direction=c}function ve(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:c(e.pointers[n].clientX),clientY:c(e.pointers[n].clientY)},n++;return{timeStamp:u(),pointers:t,center:ye(t),deltaX:e.deltaX,deltaY:e.deltaY}}function ye(e){var t=e.length;if(t===1)return{x:c(e[0].clientX),y:c(e[0].clientY)};for(var n=0,r=0,i=0;i<t;)n+=e[i].clientX,r+=e[i].clientY,i++;return{x:c(n/t),y:c(r/t)}}function be(e,t,n){return{x:t/e||0,y:n/e||0}}function xe(e,t){return e===t?U:l(e)>=l(t)?e>0?re:ie:t>0?ae:oe}function Se(e,t,n){n||=ue;var r=t[n[0]]-e[n[0]],i=t[n[1]]-e[n[1]];return Math.sqrt(r*r+i*i)}function Ce(e,t,n){n||=ue;var r=t[n[0]]-e[n[0]],i=t[n[1]]-e[n[1]];return Math.atan2(i,r)*180/Math.PI}function we(e,t){return Ce(t[1],t[0],de)-Ce(e[1],e[0],de)}function Te(e,t){return Se(t[0],t[1],de)/Se(e[0],e[1],de)}var Ee={mousedown:B,mousemove:V,mouseup:H},De=`mousedown`,Oe=`mousemove mouseup`;function ke(){this.evEl=De,this.evWin=Oe,this.allow=!0,this.pressed=!1,fe.apply(this,arguments)}g(ke,fe,{handler:function(e){var t=Ee[e.type];t&B&&e.button===0&&(this.pressed=!0),t&V&&e.which!==1&&(t=H),this.pressed&&this.allow&&(t&H&&(this.pressed=!1),this.callback(this.manager,t,{pointers:[e],changedPointers:[e],pointerType:I,srcEvent:e}))}});var Ae={pointerdown:B,pointermove:V,pointerup:H,pointercancel:ne,pointerout:ne},je={2:F,3:te,4:I,5:R},Me=`pointerdown`,Ne=`pointermove pointerup pointercancel`;e.MSPointerEvent&&(Me=`MSPointerDown`,Ne=`MSPointerMove MSPointerUp MSPointerCancel`);function Pe(){this.evEl=Me,this.evWin=Ne,fe.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}g(Pe,fe,{handler:function(e){var t=this.store,n=!1,r=Ae[e.type.toLowerCase().replace(`ms`,``)],i=je[e.pointerType]||e.pointerType,a=i==F,o=T(t,e.pointerId,`pointerId`);r&B&&(e.button===0||a)?o<0&&(t.push(e),o=t.length-1):r&(H|ne)&&(n=!0),!(o<0)&&(t[o]=e,this.callback(this.manager,r,{pointers:t,changedPointers:[e],pointerType:i,srcEvent:e}),n&&t.splice(o,1))}});var Fe={touchstart:B,touchmove:V,touchend:H,touchcancel:ne},Ie=`touchstart`,Le=`touchstart touchmove touchend touchcancel`;function Re(){this.evTarget=Ie,this.evWin=Le,this.started=!1,fe.apply(this,arguments)}g(Re,fe,{handler:function(e){var t=Fe[e.type];if(t===B&&(this.started=!0),this.started){var n=ze.call(this,e,t);t&(H|ne)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:F,srcEvent:e})}}});function ze(e,t){var n=E(e.touches),r=E(e.changedTouches);return t&(H|ne)&&(n=D(n.concat(r),`identifier`,!0)),[n,r]}var Be={touchstart:B,touchmove:V,touchend:H,touchcancel:ne},Ve=`touchstart touchmove touchend touchcancel`;function He(){this.evTarget=Ve,this.targetIds={},fe.apply(this,arguments)}g(He,fe,{handler:function(e){var t=Be[e.type],n=Ue.call(this,e,t);n&&this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:F,srcEvent:e})}});function Ue(e,t){var n=E(e.touches),r=this.targetIds;if(t&(B|V)&&n.length===1)return r[n[0].identifier]=!0,[n,n];var i,a,o=E(e.changedTouches),s=[],c=this.target;if(a=n.filter(function(e){return S(e.target,c)}),t===B)for(i=0;i<a.length;)r[a[i].identifier]=!0,i++;for(i=0;i<o.length;)r[o[i].identifier]&&s.push(o[i]),t&(H|ne)&&delete r[o[i].identifier],i++;if(s.length)return[D(a.concat(s),`identifier`,!0),s]}function We(){fe.apply(this,arguments);var e=_(this.handler,this);this.touch=new He(this.manager,e),this.mouse=new ke(this.manager,e)}g(We,fe,{handler:function(e,t,n){var r=n.pointerType==F,i=n.pointerType==I;if(r)this.mouse.allow=!1;else if(i&&!this.mouse.allow)return;t&(H|ne)&&(this.mouse.allow=!0),this.callback(e,t,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ge=O(o.style,`touchAction`),W=Ge!==i,Ke=`compute`,qe=`auto`,Je=`manipulation`,Ye=`none`,Xe=`pan-x`,Ze=`pan-y`;function Qe(e,t){this.manager=e,this.set(t)}Qe.prototype={set:function(e){e==Ke&&(e=this.compute()),W&&(this.manager.element.style[Ge]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return p(this.manager.recognizers,function(t){v(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),$e(e.join(` `))},preventDefaults:function(e){if(!W){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented)t.preventDefault();else{var r=this.actions,i=C(r,Ye),a=C(r,Ze),o=C(r,Xe);if(i||a&&n&se||o&&n&ce)return this.preventSrc(t)}}},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};function $e(e){if(C(e,Ye))return Ye;var t=C(e,Xe),n=C(e,Ze);return t&&n?Xe+` `+Ze:t||n?t?Xe:Ze:C(e,Je)?Je:qe}var et=1,tt=2,nt=4,rt=8,it=rt,at=16,ot=32;function st(e){this.id=A(),this.manager=null,this.options=h(e||{},this.defaults),this.options.enable=y(this.options.enable,!0),this.state=et,this.simultaneous={},this.requireFail=[]}st.prototype={defaults:{},set:function(e){return m(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(f(e,`recognizeWith`,this))return this;var t=this.simultaneous;return e=ut(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return f(e,`dropRecognizeWith`,this)||(e=ut(e,this),delete this.simultaneous[e.id]),this},requireFailure:function(e){if(f(e,`requireFailure`,this))return this;var t=this.requireFail;return e=ut(e,this),T(t,e)===-1&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(f(e,`dropRequireFailure`,this))return this;e=ut(e,this);var t=T(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){var t=this,n=this.state;function r(r){t.manager.emit(t.options.event+(r?ct(n):``),e)}n<rt&&r(!0),r(),n>=rt&&r(!0)},tryEmit:function(e){if(this.canEmit())return this.emit(e);this.state=ot},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(ot|et)))return!1;e++}return!0},recognize:function(e){var t=m({},e);v(this.options.enable,[this,t])?(this.state&(it|at|ot)&&(this.state=et),this.state=this.process(t),this.state&(tt|nt|rt|at)&&this.tryEmit(t)):(this.reset(),this.state=ot)},process:function(e){},getTouchAction:function(){},reset:function(){}};function ct(e){return e&at?`cancel`:e&rt?`end`:e&nt?`move`:e&tt?`start`:``}function lt(e){return e==oe?`down`:e==ae?`up`:e==re?`left`:e==ie?`right`:``}function ut(e,t){var n=t.manager;return n?n.get(e):e}function dt(){st.apply(this,arguments)}g(dt,st,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return t===0||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,r=t&(tt|nt),i=this.attrTest(e);return r&&(n&ne||!i)?t|at:r||i?n&H?t|rt:t&tt?t|nt:tt:ot}});function ft(){dt.apply(this,arguments),this.pX=null,this.pY=null}g(ft,dt,{defaults:{event:`pan`,threshold:10,pointers:1,direction:le},getTouchAction:function(){var e=this.options.direction,t=[];return e&se&&t.push(Ze),e&ce&&t.push(Xe),t},directionTest:function(e){var t=this.options,n=!0,r=e.distance,i=e.direction,a=e.deltaX,o=e.deltaY;return i&t.direction||(t.direction&se?(i=a===0?U:a<0?re:ie,n=a!=this.pX,r=Math.abs(e.deltaX)):(i=o===0?U:o<0?ae:oe,n=o!=this.pY,r=Math.abs(e.deltaY))),e.direction=i,n&&r>t.threshold&&i&t.direction},attrTest:function(e){return dt.prototype.attrTest.call(this,e)&&(this.state&tt||!(this.state&tt)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=lt(e.direction);t&&this.manager.emit(this.options.event+t,e),this._super.emit.call(this,e)}});function pt(){dt.apply(this,arguments)}g(pt,dt,{defaults:{event:`pinch`,threshold:0,pointers:2},getTouchAction:function(){return[Ye]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&tt)},emit:function(e){if(this._super.emit.call(this,e),e.scale!==1){var t=e.scale<1?`in`:`out`;this.manager.emit(this.options.event+t,e)}}});function mt(){st.apply(this,arguments),this._timer=null,this._input=null}g(mt,st,{defaults:{event:`press`,pointers:1,time:500,threshold:5},getTouchAction:function(){return[qe]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime>t.time;if(this._input=e,!r||!n||e.eventType&(H|ne)&&!i)this.reset();else if(e.eventType&B)this.reset(),this._timer=d(function(){this.state=it,this.tryEmit()},t.time,this);else if(e.eventType&H)return it;return ot},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===it&&(e&&e.eventType&H?this.manager.emit(this.options.event+`up`,e):(this._input.timeStamp=u(),this.manager.emit(this.options.event,this._input)))}});function ht(){dt.apply(this,arguments)}g(ht,dt,{defaults:{event:`rotate`,threshold:0,pointers:2},getTouchAction:function(){return[Ye]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&tt)}});function gt(){dt.apply(this,arguments)}g(gt,dt,{defaults:{event:`swipe`,threshold:10,velocity:.65,direction:se|ce,pointers:1},getTouchAction:function(){return ft.prototype.getTouchAction.call(this)},attrTest:function(e){var t=this.options.direction,n;return t&(se|ce)?n=e.velocity:t&se?n=e.velocityX:t&ce&&(n=e.velocityY),this._super.attrTest.call(this,e)&&t&e.direction&&e.distance>this.options.threshold&&l(n)>this.options.velocity&&e.eventType&H},emit:function(e){var t=lt(e.direction);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}});function G(){st.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}g(G,st,{defaults:{event:`tap`,pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Je]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime<t.time;if(this.reset(),e.eventType&B&&this.count===0)return this.failTimeout();if(r&&i&&n){if(e.eventType!=H)return this.failTimeout();var a=!this.pTime||e.timeStamp-this.pTime<t.interval,o=!this.pCenter||Se(this.pCenter,e.center)<t.posThreshold;if(this.pTime=e.timeStamp,this.pCenter=e.center,!o||!a?this.count=1:this.count+=1,this._input=e,this.count%t.taps===0)return this.hasRequireFailures()?(this._timer=d(function(){this.state=it,this.tryEmit()},t.interval,this),tt):it}return ot},failTimeout:function(){return this._timer=d(function(){this.state=ot},this.options.interval,this),ot},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==it&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}});function K(e,t){return t||={},t.recognizers=y(t.recognizers,K.defaults.preset),new yt(e,t)}K.VERSION=`2.0.4`,K.defaults={domEvents:!1,touchAction:Ke,enable:!0,inputTarget:null,inputClass:null,preset:[[ht,{enable:!1}],[pt,{enable:!1},[`rotate`]],[gt,{direction:se}],[ft,{direction:se},[`swipe`]],[G],[G,{event:`doubletap`,taps:2},[`tap`]],[mt]],cssProps:{userSelect:`none`,touchSelect:`none`,touchCallout:`none`,contentZooming:`none`,userDrag:`none`,tapHighlightColor:`rgba(0,0,0,0)`}};var _t=1,vt=2;function yt(e,t){t||={},this.options=h(t,K.defaults),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.element=e,this.input=pe(this),this.touchAction=new Qe(this,this.options.touchAction),bt(this,!0),p(t.recognizers,function(e){var t=this.add(new e[0](e[1]));e[2]&&t.recognizeWith(e[2]),e[3]&&t.requireFailure(e[3])},this)}yt.prototype={set:function(e){return m(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?vt:_t},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,r=this.recognizers,i=t.curRecognizer;(!i||i&&i.state&it)&&(i=t.curRecognizer=null);for(var a=0;a<r.length;)n=r[a],t.stopped!==vt&&(!i||n==i||n.canRecognizeWith(i))?n.recognize(e):n.reset(),!i&&n.state&(tt|nt|rt)&&(i=t.curRecognizer=n),a++}},get:function(e){if(e instanceof st)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(f(e,`add`,this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(f(e,`remove`,this))return this;var t=this.recognizers;return e=this.get(e),t.splice(T(t,e),1),this.touchAction.update(),this},on:function(e,t){var n=this.handlers;return p(w(e),function(e){n[e]=n[e]||[],n[e].push(t)}),this},off:function(e,t){var n=this.handlers;return p(w(e),function(e){t?n[e].splice(T(n[e],t),1):delete n[e]}),this},emit:function(e,t){this.options.domEvents&&q(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(n&&n.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var r=0;r<n.length;)n[r](t),r++}},destroy:function(){this.element&&bt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}};function bt(e,t){var n=e.element;p(e.options.cssProps,function(e,r){n.style[O(n.style,r)]=t?e:``})}function q(e,t){var r=n.createEvent(`Event`);r.initEvent(e,!0,!0),r.gesture=t,t.target.dispatchEvent(r)}m(K,{INPUT_START:B,INPUT_MOVE:V,INPUT_END:H,INPUT_CANCEL:ne,STATE_POSSIBLE:et,STATE_BEGAN:tt,STATE_CHANGED:nt,STATE_ENDED:rt,STATE_RECOGNIZED:it,STATE_CANCELLED:at,STATE_FAILED:ot,DIRECTION_NONE:U,DIRECTION_LEFT:re,DIRECTION_RIGHT:ie,DIRECTION_UP:ae,DIRECTION_DOWN:oe,DIRECTION_HORIZONTAL:se,DIRECTION_VERTICAL:ce,DIRECTION_ALL:le,Manager:yt,Input:fe,TouchAction:Qe,TouchInput:He,MouseInput:ke,PointerEventInput:Pe,TouchMouseInput:We,SingleTouchInput:Re,Recognizer:st,AttrRecognizer:dt,Tap:G,Pan:ft,Swipe:gt,Pinch:pt,Rotate:ht,Press:mt,on:b,off:x,each:p,merge:h,extend:m,inherit:g,bindFn:_,prefixed:O}),typeof define==s&&define.amd?define(function(){return K}):t!==void 0&&t.exports?t.exports=K:e[r]=K})(window,document,`Hammer`)})),ks=s(((e,t)=>{var n=Os(),r=1,i=`MarzipanoHammerElementId`;function a(e,t){return e[i]||(e[i]=r++),t+e[i]}function o(){this._managers={},this._refCount={}}o.prototype.get=function(e,t){var n=a(e,t);return this._managers[n]||(this._managers[n]=this._createManager(e,t),this._refCount[n]=0),this._refCount[n]++,new s(this,this._managers[n],e,t)},o.prototype._createManager=function(e,t){var r=new n.Manager(e);return t===`mouse`?r.add(new n.Pan({direction:n.DIRECTION_ALL,threshold:0})):(t===`touch`||t===`pen`||t===`kinect`)&&(r.add(new n.Pan({direction:n.DIRECTION_ALL,threshold:20,pointers:1})),r.add(new n.Pinch)),r},o.prototype._releaseHandle=function(e,t){var n=a(e,t);this._refCount[n]&&(this._refCount[n]--,this._refCount[n]||(this._managers[n].destroy(),delete this._managers[n],delete this._refCount[n]))};function s(e,t,n,r){this._manager=t,this._element=n,this._type=r,this._hammerGestures=e,this._eventHandlers=[]}s.prototype.on=function(e,t){var n=this._type,r=function(e){n===e.pointerType&&t(e)};this._eventHandlers.push({events:e,handler:r}),this._manager.on(e,r)},s.prototype.release=function(){for(var e=0;e<this._eventHandlers.length;e++){var t=this._eventHandlers[e];this._manager.off(t.events,t.handler)}this._hammerGestures._releaseHandle(this._element,this._type),this._manager=null,this._element=null,this._type=null,this._hammerGestures=null},s.prototype.manager=function(){return this._manager},t.exports=new o})),As=s(((e,t)=>{function n(e,t,n,i,a){var o=Math.sqrt(t**2+n**2);e=Math.max(e,o/i),r(t,n,e,a),a[0]=Math.abs(a[0]),a[1]=Math.abs(a[1])}function r(e,t,n,r){var i=Math.atan(t/e);r[0]=n*Math.cos(i),r[1]=n*Math.sin(i)}t.exports={maxFriction:n,changeVectorNorm:r}})),js=s(((e,t)=>{var n=_(),r=Es(),i=ks(),a=bs(),o=As().maxFriction,s=w(),c={friction:6,maxFrictionTime:.3,hammerEvent:`pan`},l=typeof MARZIPANODEBUG<`u`&&MARZIPANODEBUG.controls;function u(e,t,n){if(this._element=e,this._opts=a(n||{},c),this._startEvent=null,this._lastEvent=null,this._active=!1,this._dynamics={x:new r,y:new r},this._hammer=i.get(e,t),this._hammer.on(`hammer.input`,this._handleHammerEvent.bind(this)),this._opts.hammerEvent!=`pan`&&this._opts.hammerEvent!=`pinch`)throw Error(this._opts.hammerEvent+` is not a hammerEvent managed in DragControlMethod`);this._hammer.on(this._opts.hammerEvent+`start`,this._handleStart.bind(this)),this._hammer.on(this._opts.hammerEvent+`move`,this._handleMove.bind(this)),this._hammer.on(this._opts.hammerEvent+`end`,this._handleEnd.bind(this)),this._hammer.on(this._opts.hammerEvent+`cancel`,this._handleEnd.bind(this))}n(u),u.prototype.destroy=function(){this._hammer.release(),s(this)},u.prototype._handleHammerEvent=function(e){if(e.isFirst){if(l&&this._active)throw Error(`DragControlMethod active detected when already active`);this._active=!0,this.emit(`active`)}if(e.isFinal){if(l&&!this._active)throw Error(`DragControlMethod inactive detected when already inactive`);this._active=!1,this.emit(`inactive`)}},u.prototype._handleStart=function(e){e.preventDefault(),this._startEvent=e},u.prototype._handleMove=function(e){e.preventDefault(),this._startEvent&&(this._updateDynamicsMove(e),this.emit(`parameterDynamics`,`axisScaledX`,this._dynamics.x),this.emit(`parameterDynamics`,`axisScaledY`,this._dynamics.y))},u.prototype._handleEnd=function(e){e.preventDefault(),this._startEvent&&(this._updateDynamicsRelease(e),this.emit(`parameterDynamics`,`axisScaledX`,this._dynamics.x),this.emit(`parameterDynamics`,`axisScaledY`,this._dynamics.y)),this._startEvent=!1,this._lastEvent=!1},u.prototype._updateDynamicsMove=function(e){var t=e.deltaX,n=e.deltaY,r=this._lastEvent||this._startEvent;r&&(t-=r.deltaX,n-=r.deltaY);var i=this._element.getBoundingClientRect(),a=i.right-i.left,o=i.bottom-i.top;t/=a,n/=o,this._dynamics.x.reset(),this._dynamics.y.reset(),this._dynamics.x.offset=-t,this._dynamics.y.offset=-n,this._lastEvent=e};var d=[null,null];u.prototype._updateDynamicsRelease=function(e){var t=this._element.getBoundingClientRect(),n=t.right-t.left,r=t.bottom-t.top,i=1e3*e.velocityX/n,a=1e3*e.velocityY/r;this._dynamics.x.reset(),this._dynamics.y.reset(),this._dynamics.x.velocity=i,this._dynamics.y.velocity=a,o(this._opts.friction,this._dynamics.x.velocity,this._dynamics.y.velocity,this._opts.maxFrictionTime,d),this._dynamics.x.friction=d[0],this._dynamics.y.friction=d[1]},t.exports=u})),Ms=s(((e,t)=>{var n=_(),r=Es(),i=ks(),a=bs(),o=As().maxFriction,s=w(),c={speed:8,friction:6,maxFrictionTime:.3};function l(e,t,n){this._element=e,this._opts=a(n||{},c),this._active=!1,this._hammer=i.get(e,t),this._dynamics={x:new r,y:new r},this._hammer.on(`panstart`,this._handleStart.bind(this)),this._hammer.on(`panmove`,this._handleMove.bind(this)),this._hammer.on(`panend`,this._handleRelease.bind(this)),this._hammer.on(`pancancel`,this._handleRelease.bind(this))}n(l),l.prototype.destroy=function(){this._hammer.release(),s(this)},l.prototype._handleStart=function(e){e.preventDefault(),this._active||(this._active=!0,this.emit(`active`))},l.prototype._handleMove=function(e){e.preventDefault(),this._updateDynamics(e,!1)},l.prototype._handleRelease=function(e){e.preventDefault(),this._updateDynamics(e,!0),this._active&&(this._active=!1,this.emit(`inactive`))};var u=[null,null];l.prototype._updateDynamics=function(e,t){var n=this._element.getBoundingClientRect(),r=n.right-n.left,i=n.bottom-n.top,a=Math.max(r,i),s=e.deltaX/a*this._opts.speed,c=e.deltaY/a*this._opts.speed;this._dynamics.x.reset(),this._dynamics.y.reset(),this._dynamics.x.velocity=s,this._dynamics.y.velocity=c,t&&(o(this._opts.friction,this._dynamics.x.velocity,this._dynamics.y.velocity,this._opts.maxFrictionTime,u),this._dynamics.x.friction=u[0],this._dynamics.y.friction=u[1]),this.emit(`parameterDynamics`,`x`,this._dynamics.x),this.emit(`parameterDynamics`,`y`,this._dynamics.y)},t.exports=l})),Ns=s(((e,t)=>{var n=_(),r=Es(),i=bs(),a=w(),o={frictionTime:.2,zoomDelta:.001};function s(e,t){this._element=e,this._opts=i(t||{},o),this._dynamics=new r,this._eventList=[];var n=this._opts.frictionTime?this.withSmoothing:this.withoutSmoothing;this._wheelListener=n.bind(this),e.addEventListener(`wheel`,this._wheelListener)}n(s),s.prototype.destroy=function(){this._element.removeEventListener(`wheel`,this._wheelListener),a(this)},s.prototype.withoutSmoothing=function(e){this._dynamics.offset=c(e)*this._opts.zoomDelta,this.emit(`parameterDynamics`,`zoom`,this._dynamics),e.preventDefault(),this.emit(`active`),this.emit(`inactive`)},s.prototype.withSmoothing=function(e){var t=e.timeStamp;for(this._eventList.push(e);this._eventList[0].timeStamp<t-this._opts.frictionTime*1e3;)this._eventList.shift(0);for(var n=0,r=0;r<this._eventList.length;r++){var i=c(this._eventList[r])*this._opts.zoomDelta;n+=i/this._opts.frictionTime}this._dynamics.velocity=n,this._dynamics.friction=Math.abs(n)/this._opts.frictionTime,this.emit(`parameterDynamics`,`zoom`,this._dynamics),e.preventDefault(),this.emit(`active`),this.emit(`inactive`)};function c(e){var t=e.deltaMode==1?20:1;return e.deltaY*t}t.exports=s})),Ps=s(((e,t)=>{var n=_(),r=Es(),i=ks(),a=w();function o(e,t,n){this._hammer=i.get(e,t),this._lastEvent=null,this._active=!1,this._dynamics=new r,this._hammer.on(`pinchstart`,this._handleStart.bind(this)),this._hammer.on(`pinch`,this._handleEvent.bind(this)),this._hammer.on(`pinchend`,this._handleEnd.bind(this)),this._hammer.on(`pinchcancel`,this._handleEnd.bind(this))}n(o),o.prototype.destroy=function(){this._hammer.release(),a(this)},o.prototype._handleStart=function(){this._active||(this._active=!0,this.emit(`active`))},o.prototype._handleEnd=function(){this._lastEvent=null,this._active&&(this._active=!1,this.emit(`inactive`))},o.prototype._handleEvent=function(e){var t=e.scale;this._lastEvent&&(t/=this._lastEvent.scale),this._dynamics.offset=(t-1)*-1,this.emit(`parameterDynamics`,`zoom`,this._dynamics),this._lastEvent=e},t.exports=o})),Fs=s(((e,t)=>{var n=_(),r=Es(),i=w();function a(e){if(!e)throw Error(`VelocityControlMethod: parameter must be defined`);this._parameter=e,this._dynamics=new r}n(a),a.prototype.destroy=function(){i(this)},a.prototype.setVelocity=function(e){this._dynamics.velocity=e,this.emit(`parameterDynamics`,this._parameter,this._dynamics)},a.prototype.setFriction=function(e){this._dynamics.friction=e,this.emit(`parameterDynamics`,this._parameter,this._dynamics)},t.exports=a})),Is=s(((e,t)=>{var n=_(),r=Es(),i=w();function a(e,t,n,i){if(!e)throw Error(`ElementPressControlMethod: element must be defined`);if(!t)throw Error(`ElementPressControlMethod: parameter must be defined`);if(!n)throw Error(`ElementPressControlMethod: velocity must be defined`);if(!i)throw Error(`ElementPressControlMethod: friction must be defined`);this._element=e,this._pressHandler=this._handlePress.bind(this),this._releaseHandler=this._handleRelease.bind(this),e.addEventListener(`mousedown`,this._pressHandler),e.addEventListener(`mouseup`,this._releaseHandler),e.addEventListener(`mouseleave`,this._releaseHandler),e.addEventListener(`touchstart`,this._pressHandler),e.addEventListener(`touchmove`,this._releaseHandler),e.addEventListener(`touchend`,this._releaseHandler),this._parameter=t,this._velocity=n,this._friction=i,this._dynamics=new r,this._pressing=!1}n(a),a.prototype.destroy=function(){this._element.removeEventListener(`mousedown`,this._pressHandler),this._element.removeEventListener(`mouseup`,this._releaseHandler),this._element.removeEventListener(`mouseleave`,this._releaseHandler),this._element.removeEventListener(`touchstart`,this._pressHandler),this._element.removeEventListener(`touchmove`,this._releaseHandler),this._element.removeEventListener(`touchend`,this._releaseHandler),i(this)},a.prototype._handlePress=function(){this._pressing=!0,this._dynamics.velocity=this._velocity,this._dynamics.friction=0,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`active`)},a.prototype._handleRelease=function(){this._pressing&&(this._dynamics.friction=this._friction,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`inactive`)),this._pressing=!1},t.exports=a})),Ls=s(((e,t)=>{var n=_(),r=Es(),i=v(),a=w();function o(e){e||={},this._methods=[],this._parameters=[`x`,`y`,`axisScaledX`,`axisScaledY`,`zoom`,`yaw`,`pitch`,`roll`],this._now=e.nowForTesting||i,this._composedOffsets={},this._composeReturn={offsets:this._composedOffsets,changing:null}}n(o),o.prototype.add=function(e){if(!this.has(e)){var t={};this._parameters.forEach(function(e){t[e]={dynamics:new r,time:null}});var n=this._updateDynamics.bind(this,t),i={instance:e,dynamics:t,parameterDynamicsHandler:n};e.addEventListener(`parameterDynamics`,n),this._methods.push(i)}},o.prototype.remove=function(e){var t=this._indexOfInstance(e);if(t>=0){var n=this._methods.splice(t,1)[0];n.instance.removeEventListener(`parameterDynamics`,n.parameterDynamicsHandler)}},o.prototype.has=function(e){return this._indexOfInstance(e)>=0},o.prototype._indexOfInstance=function(e){for(var t=0;t<this._methods.length;t++)if(this._methods[t].instance===e)return t;return-1},o.prototype.list=function(){for(var e=[],t=0;t<this._methods.length;t++)e.push(this._methods[t].instance);return e},o.prototype._updateDynamics=function(e,t,n){var r=e[t];if(!r)throw Error(`Unknown control parameter `+t);var i=this._now();r.dynamics.update(n,(i-r.time)/1e3),r.time=i,this.emit(`change`)},o.prototype._resetComposedOffsets=function(){for(var e=0;e<this._parameters.length;e++)this._composedOffsets[this._parameters[e]]=0},o.prototype.offsets=function(){var e,t=!1,n=this._now();this._resetComposedOffsets();for(var r=0;r<this._methods.length;r++)for(var i=this._methods[r].dynamics,a=0;a<this._parameters.length;a++){e=this._parameters[a];var o=i[e],s=o.dynamics;s.offset!=null&&(this._composedOffsets[e]+=s.offset,s.offset=null);var c=(n-o.time)/1e3,l=s.offsetFromVelocity(c);l&&(this._composedOffsets[e]+=l);var u=s.velocityAfter(c);s.velocity=u,u&&(t=!0),o.time=n}return this._composeReturn.changing=t,this._composeReturn},o.prototype.destroy=function(){for(var e=this.list(),t=0;t<e.length;t++)this.remove(e[t]);a(this)},t.exports=o})),Rs=s(((e,t)=>{var n=_(),r=Ls(),i=w(),a=typeof MARZIPANODEBUG<`u`&&MARZIPANODEBUG.controls;function o(e){e||={},this._methods={},this._methodGroups={},this._composer=new r,this._enabled=e&&e.enabled?!!e.enabled:!0,this._activeCount=0,this.updatedViews_=[],this._attachedRenderLoop=null}n(o),o.prototype.destroy=function(){this.detach(),this._composer.destroy(),i(this)},o.prototype.methods=function(){var e={};for(var t in this._methods)e[t]=this._methods[t];return e},o.prototype.method=function(e){return this._methods[e]},o.prototype.registerMethod=function(e,t,n){if(this._methods[e])throw Error(`Control method already registered with id `+e);this._methods[e]={instance:t,enabled:!1,active:!1,activeHandler:this._handleActive.bind(this,e),inactiveHandler:this._handleInactive.bind(this,e)},n&&this.enableMethod(e,t)},o.prototype.unregisterMethod=function(e){var t=this._methods[e];if(!t)throw Error(`No control method registered with id `+e);t.enabled&&this.disableMethod(e),delete this._methods[e]},o.prototype.enableMethod=function(e){var t=this._methods[e];if(!t)throw Error(`No control method registered with id `+e);t.enabled||(t.enabled=!0,t.active&&this._incrementActiveCount(),this._listen(e),this._updateComposer(),this.emit(`methodEnabled`,e))},o.prototype.disableMethod=function(e){var t=this._methods[e];if(!t)throw Error(`No control method registered with id `+e);t.enabled&&(t.enabled=!1,t.active&&this._decrementActiveCount(),this._unlisten(e),this._updateComposer(),this.emit(`methodDisabled`,e))},o.prototype.addMethodGroup=function(e,t){this._methodGroups[e]=t},o.prototype.removeMethodGroup=function(e){delete this._methodGroups[e]},o.prototype.methodGroups=function(){var e={};for(var t in this._methodGroups)e[t]=this._methodGroups[t];return e},o.prototype.enableMethodGroup=function(e){var t=this;t._methodGroups[e].forEach(function(e){t.enableMethod(e)})},o.prototype.disableMethodGroup=function(e){var t=this;t._methodGroups[e].forEach(function(e){t.disableMethod(e)})},o.prototype.enabled=function(){return this._enabled},o.prototype.enable=function(){this._enabled||(this._enabled=!0,this._activeCount>0&&this.emit(`active`),this.emit(`enabled`),this._updateComposer())},o.prototype.disable=function(){this._enabled&&(this._enabled=!1,this._activeCount>0&&this.emit(`inactive`),this.emit(`disabled`),this._updateComposer())},o.prototype.attach=function(e){this._attachedRenderLoop&&this.detach(),this._attachedRenderLoop=e,this._beforeRenderHandler=this._updateViewsWithControls.bind(this),this._changeHandler=e.renderOnNextFrame.bind(e),this._attachedRenderLoop.addEventListener(`beforeRender`,this._beforeRenderHandler),this._composer.addEventListener(`change`,this._changeHandler)},o.prototype.detach=function(){this._attachedRenderLoop&&=(this._attachedRenderLoop.removeEventListener(`beforeRender`,this._beforeRenderHandler),this._composer.removeEventListener(`change`,this._changeHandler),this._beforeRenderHandler=null,this._changeHandler=null,null)},o.prototype.attached=function(){return this._attachedRenderLoop!=null},o.prototype._listen=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);t.instance.addEventListener(`active`,t.activeHandler),t.instance.addEventListener(`inactive`,t.inactiveHandler)},o.prototype._unlisten=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);t.instance.removeEventListener(`active`,t.activeHandler),t.instance.removeEventListener(`inactive`,t.inactiveHandler)},o.prototype._handleActive=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);if(!t.enabled)throw Error(`Should not receive event from disabled control method`);t.active||(t.active=!0,this._incrementActiveCount())},o.prototype._handleInactive=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);if(!t.enabled)throw Error(`Should not receive event from disabled control method`);t.active&&(t.active=!1,this._decrementActiveCount())},o.prototype._incrementActiveCount=function(){this._activeCount++,a&&this._checkActiveCount(),this._enabled&&this._activeCount===1&&this.emit(`active`)},o.prototype._decrementActiveCount=function(){this._activeCount--,a&&this._checkActiveCount(),this._enabled&&this._activeCount===0&&this.emit(`inactive`)},o.prototype._checkActiveCount=function(){var e=0;for(var t in this._methods){var n=this._methods[t];n.enabled&&n.active&&e++}if(e!=this._activeCount)throw Error(`Bad control state`)},o.prototype._updateComposer=function(){var e=this._composer;for(var t in this._methods){var n=this._methods[t],r=this._enabled&&n.enabled;r&&!e.has(n.instance)&&e.add(n.instance),!r&&e.has(n.instance)&&e.remove(n.instance)}},o.prototype._updateViewsWithControls=function(){var e=this._composer.offsets();e.changing&&this._attachedRenderLoop.renderOnNextFrame(),this.updatedViews_.length=0;for(var t=this._attachedRenderLoop.stage().listLayers(),n=0;n<t.length;n++){var r=t[n].view();this.updatedViews_.indexOf(r)<0&&(t[n].view().updateWithControlParameters(e.offsets),this.updatedViews_.push(r))}},t.exports=o})),zs=s(((e,t)=>{var n=P().setTransform,r=ss();function i(e,t,i,a){a||=``,n(e,`translateX(`+r(t)+`px) translateY(`+r(i)+`px) translateZ(0) `+a)}t.exports=i})),Bs=s(((e,t)=>{var n=_(),r=zs(),i=P().setTransform,a=w();function o(e,t,n,r,i){i||={},i.perspective=i.perspective||{},i.perspective.extraTransforms=i.perspective.extraTransforms==null?``:i.perspective.extraTransforms,this._domElement=e,this._parentDomElement=t,this._view=n,this._coords={},this._perspective={},this.setPosition(r),this._parentDomElement.appendChild(this._domElement),this.setPerspective(i.perspective),this._visible=!0,this._position={x:0,y:0}}n(o),o.prototype.destroy=function(){this._parentDomElement.removeChild(this._domElement),a(this)},o.prototype.domElement=function(){return this._domElement},o.prototype.position=function(){return this._coords},o.prototype.setPosition=function(e){for(var t in e)this._coords[t]=e[t];this._update()},o.prototype.perspective=function(){return this._perspective},o.prototype.setPerspective=function(e){for(var t in e)this._perspective[t]=e[t];this._update()},o.prototype.show=function(){this._visible||(this._visible=!0,this._update())},o.prototype.hide=function(){this._visible&&(this._visible=!1,this._update())},o.prototype._update=function(){var e=this._domElement,t=this._coords,n=this._position,r,i,a=!1;if(this._visible){var o=this._view;this._perspective.radius?(a=!0,this._setEmbeddedPosition(o,t)):(o.coordinatesToScreen(t,n),r=n.x,i=n.y,r!=null&&i!=null&&(a=!0,this._setPosition(r,i)))}a?(e.style.display=`block`,e.style.position=`absolute`):(e.style.display=`none`,e.style.position=``)},o.prototype._setEmbeddedPosition=function(e,t){var n=e.coordinatesToPerspectiveTransform(t,this._perspective.radius,this._perspective.extraTransforms);i(this._domElement,n)},o.prototype._setPosition=function(e,t){r(this._domElement,e,t,this._perspective.extraTransforms)},t.exports=o})),Vs=s(((e,t)=>{var n=_(),r=Bs(),i=b(),a=zs(),o=P().setAbsolute,s=P().setOverflowHidden,c=P().setOverflowVisible,l=P().setNullSize,u=P().setPixelSize,d=P().setWithVendorPrefix(`pointer-events`),f=w();function p(e,t,n,r,i){i||={},this._parentDomElement=e,this._stage=t,this._view=n,this._renderLoop=r,this._hotspots=[],this._visible=!0,this._rect=i.rect,this._visibilityOrRectChanged=!0,this._stageWidth=null,this._stageHeight=null,this._tmpRect={},this._hotspotContainerWrapper=document.createElement(`div`),o(this._hotspotContainerWrapper),d(this._hotspotContainerWrapper,`none`),this._parentDomElement.appendChild(this._hotspotContainerWrapper),this._hotspotContainer=document.createElement(`div`),o(this._hotspotContainer),d(this._hotspotContainer,`all`),this._hotspotContainerWrapper.appendChild(this._hotspotContainer),this._updateHandler=this._update.bind(this),this._renderLoop.addEventListener(`afterRender`,this._updateHandler)}n(p),p.prototype.destroy=function(){for(;this._hotspots.length;)this.destroyHotspot(this._hotspots[0]);this._parentDomElement.removeChild(this._hotspotContainerWrapper),this._renderLoop.removeEventListener(`afterRender`,this._updateHandler),f(this)},p.prototype.domElement=function(){return this._hotspotContainer},p.prototype.setRect=function(e){this._rect=e,this._visibilityOrRectChanged=!0},p.prototype.rect=function(){return this._rect},p.prototype.createHotspot=function(e,t,n){t||={};var i=new r(e,this._hotspotContainer,this._view,t,n);return this._hotspots.push(i),i._update(),this.emit(`hotspotsChange`),i},p.prototype.hasHotspot=function(e){return this._hotspots.indexOf(e)>=0},p.prototype.listHotspots=function(){return[].concat(this._hotspots)},p.prototype.destroyHotspot=function(e){var t=this._hotspots.indexOf(e);if(t<0)throw Error(`No such hotspot`);this._hotspots.splice(t,1),e.destroy(),this.emit(`hotspotsChange`)},p.prototype.hide=function(){this._visible&&(this._visible=!1,this._visibilityOrRectChanged=!0,this._update())},p.prototype.show=function(){this._visible||(this._visible=!0,this._visibilityOrRectChanged=!0,this._update())},p.prototype._update=function(){var e=this._hotspotContainerWrapper,t=this._stage.width(),n=this._stage.height(),r=this._tmpRect;if(this._visibilityOrRectChanged||this._rect&&(t!==this._stageWidth||n!==this._stageHeight)){var o=this._visible;e.style.display=o?`block`:`none`,o&&(this._rect?(i(t,n,this._rect,r),a(e,t*r.x,n*r.y),u(e,t*r.width,n*r.height),s(e)):(a(e,0,0),l(e),c(e))),this._stageWidth=t,this._stageHeight=n,this._visibilityOrRectChanged=!1}for(var d=0;d<this._hotspots.length;d++)this._hotspots[d]._update()},t.exports=p})),Hs=s(((e,t)=>{var n=ws(),r=Ss(),i=Vs(),a=_(),o=v(),s=fs(),c=ts(),l=bs(),u=w();function d(e,t){this._viewer=e,this._view=t,this._layers=[],this._hotspotContainer=new i(e._controlContainer,e.stage(),this._view,e.renderLoop()),this._movement=null,this._movementStartTime=null,this._movementStep=null,this._movementParams=null,this._movementCallback=null,this._updateMovementHandler=this._updateMovement.bind(this),this._updateHotspotContainerHandler=this._updateHotspotContainer.bind(this),this._viewer.addEventListener(`sceneChange`,this._updateHotspotContainerHandler),this._viewChangeHandler=this.emit.bind(this,`viewChange`),this._view.addEventListener(`change`,this._viewChangeHandler),this._updateHotspotContainer()}a(d),d.prototype.destroy=function(){this._view.removeEventListener(`change`,this._viewChangeHandler),this._viewer.removeEventListener(`sceneChange`,this._updateHotspotContainerHandler),this._movement&&this.stopMovement(),this._hotspotContainer.destroy(),this.destroyAllLayers(),u(this)},d.prototype.hotspotContainer=function(){return this._hotspotContainer},d.prototype.layer=function(){return this._layers[0]},d.prototype.listLayers=function(){return[].concat(this._layers)},d.prototype.view=function(){return this._view},d.prototype.viewer=function(){return this._viewer},d.prototype.visible=function(){return this._viewer.scene()===this},d.prototype.createLayer=function(e){e||={};var t=e.textureStoreOpts||{},i=e.layerOpts||{},a=e.source,o=e.geometry,s=this._view,c=new n(a,o,s,new r(a,this._viewer.stage(),t),i);return this._layers.push(c),e.pinFirstLevel&&c.pinFirstLevel(),this.emit(`layerChange`),c},d.prototype.destroyLayer=function(e){var t=this._layers.indexOf(e);if(t<0)throw Error(`No such layer in scene`);this._layers.splice(t,1),this.emit(`layerChange`),e.textureStore().destroy(),e.destroy()},d.prototype.destroyAllLayers=function(){for(;this._layers.length>0;)this.destroyLayer(this._layers[0])},d.prototype.switchTo=function(e,t){return this._viewer.switchScene(this,e,t)},d.prototype.lookTo=function(e,t,n){var r=this;if(t||={},n||=s,c(e)!==`object`)throw Error(`Target view parameters must be an object`);var i=t.ease==null?function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)}:t.ease,a=t.controlsInterrupt!=null&&t.controlsInterrupt,o=t.transitionDuration==null?1e3:t.transitionDuration,u=t.shortest==null||t.shortest,d=this._view,f=d.parameters(),p={};l(p,e),l(p,f),u&&d.normalizeToClosest&&d.normalizeToClosest(p,p);var m=function(){var e=!1;return function(t,n){if(n>=o&&e)return null;var r=Math.min(n/o,1);for(var a in t){var s=f[a],c=p[a];t[a]=s+i(r)*(c-s)}return e=n>=o,t}},h=this._viewer.controls().enabled();a||this._viewer.controls().disable(),this.startMovement(m,function(){h&&r._viewer.controls().enable(),n()})},d.prototype.startMovement=function(e,t){var n=this._viewer.renderLoop();this._movement&&this.stopMovement();var r=e();if(typeof r!=`function`)throw Error(`Bad movement`);this._movement=e,this._movementStep=r,this._movementStartTime=o(),this._movementParams={},this._movementCallback=t,n.addEventListener(`beforeRender`,this._updateMovementHandler),n.renderOnNextFrame()},d.prototype.stopMovement=function(){var e=this._movementCallback,t=this._viewer.renderLoop();this._movement&&(this._movement=null,this._movementStep=null,this._movementStartTime=null,this._movementParams=null,this._movementCallback=null,t.removeEventListener(`beforeRender`,this._updateMovementHandler),e&&e())},d.prototype.movement=function(){return this._movement},d.prototype._updateMovement=function(){if(!this._movement)throw Error(`Should not call update`);var e=this._viewer.renderLoop(),t=this._view,n=o()-this._movementStartTime,r=this._movementStep,i=this._movementParams;i=t.parameters(i),i=r(i,n),i==null?this.stopMovement():(t.setParameters(i),e.renderOnNextFrame())},d.prototype._updateHotspotContainer=function(){this.visible()?this._hotspotContainer.show():this._hotspotContainer.hide()},t.exports=d})),Us=s(((e,t)=>{var n=_(),r=bs(),i=v(),a={duration:1/0};function o(e){e=r(e||{},a),this._duration=e.duration,this._startTime=null,this._handle=null,this._check=this._check.bind(this)}n(o),o.prototype.start=function(){this._startTime=i(),this._handle==null&&this._duration<1/0&&this._setup(this._duration)},o.prototype.started=function(){return this._startTime!=null},o.prototype.stop=function(){this._startTime=null,this._handle!=null&&(clearTimeout(this._handle),this._handle=null)},o.prototype._setup=function(e){this._handle=setTimeout(this._check,e)},o.prototype._teardown=function(){clearTimeout(this._handle),this._handle=null},o.prototype._check=function(){var e=i()-this._startTime,t=this._duration-e;this._teardown(),t<=0?(this.emit(`timeout`),this._startTime=null):t<1/0&&this._setup(t)},o.prototype.duration=function(){return this._duration},o.prototype.setDuration=function(e){this._duration=e,this._startTime!=null&&this._check()},t.exports=o})),Ws=s(((e,t)=>{var n=bs(),r=w(),i={active:`move`,inactive:`default`,disabled:`default`};function a(e,t,r,a){a=n(a||{},i),this._element=r,this._controls=e,this._id=t,this._attached=!1,this._setActiveCursor=this._setCursor.bind(this,a.active),this._setInactiveCursor=this._setCursor.bind(this,a.inactive),this._setDisabledCursor=this._setCursor.bind(this,a.disabled),this._setOriginalCursor=this._setCursor.bind(this,this._element.style.cursor),this._updateAttachmentHandler=this._updateAttachment.bind(this),e.addEventListener(`methodEnabled`,this._updateAttachmentHandler),e.addEventListener(`methodDisabled`,this._updateAttachmentHandler),e.addEventListener(`enabled`,this._updateAttachmentHandler),e.addEventListener(`disabled`,this._updateAttachmentHandler),this._updateAttachment()}a.prototype.destroy=function(){this._detachFromControlMethod(this._controls.method(this._id)),this._setOriginalCursor(),this._controls.removeEventListener(`methodEnabled`,this._updateAttachmentHandler),this._controls.removeEventListener(`methodDisabled`,this._updateAttachmentHandler),this._controls.removeEventListener(`enabled`,this._updateAttachmentHandler),this._controls.removeEventListener(`disabled`,this._updateAttachmentHandler),r(this)},a.prototype._updateAttachment=function(){var e=this._controls,t=this._id;e.enabled()&&e.method(t).enabled?this._attachToControlMethod(e.method(t)):this._detachFromControlMethod(e.method(t))},a.prototype._attachToControlMethod=function(e){this._attached||=(e.instance.addEventListener(`active`,this._setActiveCursor),e.instance.addEventListener(`inactive`,this._setInactiveCursor),e.active?this._setActiveCursor():this._setInactiveCursor(),!0)},a.prototype._detachFromControlMethod=function(e){this._attached&&=(e.instance.removeEventListener(`active`,this._setActiveCursor),e.instance.removeEventListener(`inactive`,this._setInactiveCursor),this._setDisabledCursor(),!1)},a.prototype._setCursor=function(e){this._element.style.cursor=e},t.exports=a})),Gs=s(((e,t)=>{var n=bs(),r=js(),i=Ms(),a=Ns(),o=Ps(),s=Ds(),c={mouseViewMode:`drag`,dragMode:`pan`};function l(e,t,l){l=n(l||{},c);var u={mouseViewDrag:new r(t,`mouse`),mouseViewQtvr:new i(t,`mouse`),leftArrowKey:new s(37,`x`,-.7,3),rightArrowKey:new s(39,`x`,.7,3),upArrowKey:new s(38,`y`,-.7,3),downArrowKey:new s(40,`y`,.7,3),plusKey:new s(107,`zoom`,-.7,3),minusKey:new s(109,`zoom`,.7,3),wKey:new s(87,`y`,-.7,3),aKey:new s(65,`x`,-.7,3),sKey:new s(83,`y`,.7,3),dKey:new s(68,`x`,.7,3),qKey:new s(81,`roll`,.7,3),eKey:new s(69,`roll`,-.7,3)},d=[`scrollZoom`,`touchView`,`pinch`];l.scrollZoom!==!1&&(u.scrollZoom=new a(t));var f={arrowKeys:[`leftArrowKey`,`rightArrowKey`,`upArrowKey`,`downArrowKey`],plusMinusKeys:[`plusKey`,`minusKey`],wasdKeys:[`wKey`,`aKey`,`sKey`,`dKey`],qeKeys:[`qKey`,`eKey`]};switch(l.dragMode){case`pinch`:u.pinch=new r(t,`touch`,{hammerEvent:`pinch`});break;case`pan`:u.touchView=new r(t,`touch`),u.pinch=new o(t,`touch`);break;default:throw Error(`Unknown drag mode: `+l.dragMode)}switch(l.mouseViewMode){case`drag`:d.push(`mouseViewDrag`);break;case`qtvr`:d.push(`mouseViewQtvr`);break;default:throw Error(`Unknown mouse view mode: `+l.mouseViewMode)}for(var p in u){var m=u[p];e.registerMethod(p,m),d.indexOf(p)>=0&&e.enableMethod(p)}for(var h in f){var g=f[h];e.addMethodGroup(h,g)}return u}t.exports=l})),Ks=s(((e,t)=>{var n=v();function r(e,t,r){var i=!1,a=n();function o(){if(!i){var s=(n()-a)/e;s<1?(t(s),requestAnimationFrame(o)):(t(1),r())}}return t(0),requestAnimationFrame(o),function(){i=!0,r.apply(null,arguments)}}t.exports=r})),qs=s(((e,t)=>{var n=_(),r=Ts(),i=Rs(),a=Hs(),o=Us(),s=F(),c=Ws(),l=ks(),u=Gs(),d=Ko(),f=P().setOverflowHidden,p=P().setAbsolute,m=P().setFullSize,h=Ks(),g=fs(),v=w();function y(e,t){t||={},this._domElement=e,f(e),this._stage=new s(t.stage),d(this._stage),this._domElement.appendChild(this._stage.domElement()),this._controlContainer=document.createElement(`div`),p(this._controlContainer),m(this._controlContainer),e.appendChild(this._controlContainer),this._size={},this.updateSize(),this._updateSizeListener=this.updateSize.bind(this),window.addEventListener(`resize`,this._updateSizeListener),this._renderLoop=new r(this._stage),this._controls=new i,this._controlMethods=u(this._controls,this._controlContainer,t.controls),this._controls.attach(this._renderLoop),this._hammerManagerTouch=l.get(this._controlContainer,`touch`),this._hammerManagerMouse=l.get(this._controlContainer,`mouse`),this._dragCursor=new c(this._controls,`mouseViewDrag`,e,t.cursors&&t.cursors.drag||{}),this._renderLoop.start(),this._scenes=[],this._currentScene=null,this._replacedScene=null,this._cancelCurrentTween=null,this._layerChangeHandler=this._updateSceneLayers.bind(this),this._viewChangeHandler=this.emit.bind(this,`viewChange`),this._idleTimer=new o,this._idleTimer.start(),this._resetIdleTimerHandler=this._resetIdleTimer.bind(this),this.addEventListener(`viewChange`,this._resetIdleTimerHandler),this._triggerIdleTimerHandler=this._triggerIdleTimer.bind(this),this._idleTimer.addEventListener(`timeout`,this._triggerIdleTimerHandler),this._stopMovementHandler=this.stopMovement.bind(this),this._controls.addEventListener(`active`,this._stopMovementHandler),this.addEventListener(`sceneChange`,this._stopMovementHandler),this._idleMovement=null}n(y),y.prototype.destroy=function(){for(var e in window.removeEventListener(`resize`,this._updateSizeListener),this._currentScene&&this._removeSceneEventListeners(this._currentScene),this._replacedScene&&this._removeSceneEventListeners(this._replacedScene),this._dragCursor.destroy(),this._controlMethods)this._controlMethods[e].destroy();for(;this._scenes.length;)this.destroyScene(this._scenes[0]);this._domElement.removeChild(this._stage.domElement()),this._stage.destroy(),this._renderLoop.destroy(),this._controls.destroy(),this._controls=null,this._cancelCurrentTween&&this._cancelCurrentTween(),v(this)},y.prototype.updateSize=function(){var e=this._size;e.width=this._domElement.clientWidth,e.height=this._domElement.clientHeight,this._stage.setSize(e)},y.prototype.stage=function(){return this._stage},y.prototype.renderLoop=function(){return this._renderLoop},y.prototype.controls=function(){return this._controls},y.prototype.domElement=function(){return this._domElement},y.prototype.createScene=function(e){e||={};var t=this.createEmptyScene({view:e.view});return t.createLayer({source:e.source,geometry:e.geometry,pinFirstLevel:e.pinFirstLevel,textureStoreOpts:e.textureStoreOpts,layerOpts:e.layerOpts}),t},y.prototype.createEmptyScene=function(e){e||={};var t=new a(this,e.view);return this._scenes.push(t),t},y.prototype._updateSceneLayers=function(){var e,t,n=this._stage,r=this._currentScene,i=this._replacedScene,a=n.listLayers(),o=[];if(i&&(o=o.concat(i.listLayers())),r&&(o=o.concat(r.listLayers())),Math.abs(a.length-o.length)!==1)throw Error(`Stage and scene out of sync`);if(o.length<a.length){for(e=0;e<a.length;e++)if(t=a[e],o.indexOf(t)<0){this._removeLayerFromStage(t);break}}if(o.length>a.length)for(e=0;e<o.length;e++)t=o[e],a.indexOf(t)<0&&this._addLayerToStage(t,e)},y.prototype._addLayerToStage=function(e,t){e.pinFirstLevel(),this._stage.addLayer(e,t)},y.prototype._removeLayerFromStage=function(e){this._stage.removeLayer(e),e.unpinFirstLevel(),e.textureStore().clearNotPinned()},y.prototype._addSceneEventListeners=function(e){e.addEventListener(`layerChange`,this._layerChangeHandler),e.addEventListener(`viewChange`,this._viewChangeHandler)},y.prototype._removeSceneEventListeners=function(e){e.removeEventListener(`layerChange`,this._layerChangeHandler),e.removeEventListener(`viewChange`,this._viewChangeHandler)},y.prototype.destroyScene=function(e){var t=this._scenes.indexOf(e);if(t<0)throw Error(`No such scene in viewer`);var n,r;if(this._currentScene===e){for(this._removeSceneEventListeners(e),r=e.listLayers(),n=0;n<r.length;n++)this._removeLayerFromStage(r[n]);this._cancelCurrentTween&&=(this._cancelCurrentTween(),null),this._currentScene=null,this.emit(`sceneChange`)}if(this._replacedScene===e){for(this._removeSceneEventListeners(e),r=e.listLayers(),n=0;n<r.length;n++)this._removeLayerFromStage(r[n]);this._replacedScene=null}this._scenes.splice(t,1),e.destroy()},y.prototype.destroyAllScenes=function(){for(;this._scenes.length>0;)this.destroyScene(this._scenes[0])},y.prototype.hasScene=function(e){return this._scenes.indexOf(e)>=0},y.prototype.listScenes=function(){return[].concat(this._scenes)},y.prototype.scene=function(){return this._currentScene},y.prototype.view=function(){var e=this._currentScene;return e?e.view():null},y.prototype.lookTo=function(e,t,n){var r=this._currentScene;r&&r.lookTo(e,t,n)},y.prototype.startMovement=function(e,t){var n=this._currentScene;n&&n.startMovement(e,t)},y.prototype.stopMovement=function(){var e=this._currentScene;e&&e.stopMovement()},y.prototype.movement=function(){var e=this._currentScene;if(e)return e.movement()},y.prototype.setIdleMovement=function(e,t){this._idleTimer.setDuration(e),this._idleMovement=t},y.prototype.breakIdleMovement=function(){this.stopMovement(),this._resetIdleTimer()},y.prototype._resetIdleTimer=function(){this._idleTimer.start()},y.prototype._triggerIdleTimer=function(){var e=this._idleMovement;e&&this.startMovement(e)};var b=1e3;function x(e,t,n){t.listLayers().forEach(function(t){t.mergeEffects({opacity:e})}),t._hotspotContainer.domElement().style.opacity=e}y.prototype.switchScene=function(e,t,n){var r=this;t||={},n||=g;var i=this._stage,a=this._currentScene;if(a===e){n();return}if(this._scenes.indexOf(e)<0)throw Error(`No such scene in viewer`);this._cancelCurrentTween&&=(this._cancelCurrentTween(),null);var o=a?a.listLayers():[],s=e.listLayers(),c=i.listLayers();if(a&&(c.length!==o.length||c.length>1&&c[0]!=o[0]))throw Error(`Stage not in sync with viewer`);for(var l=t.transitionDuration==null?b:t.transitionDuration,u=t.transitionUpdate==null?x:t.transitionUpdate,d=0;d<s.length;d++)this._addLayerToStage(s[d]);function f(t){u(t,e,a)}function p(){if(r._replacedScene){r._removeSceneEventListeners(r._replacedScene),o=r._replacedScene.listLayers();for(var e=0;e<o.length;e++)r._removeLayerFromStage(o[e]);r._replacedScene=null}r._cancelCurrentTween=null,n()}this._cancelCurrentTween=h(l,f,p),this._currentScene=e,this._replacedScene=a,this.emit(`sceneChange`),this.emit(`viewChange`),this._addSceneEventListeners(e)},t.exports=y})),Js=s(((e,t)=>{var n=(Fo(),d(Po)).vec4,r=(Fo(),d(Po)).mat4;function i(e){var t=e||{};return t.colorOffset=t.colorOffset||n.create(),t.colorMatrix=t.colorMatrix||r.create(),t}function a(e,t,r){o(r,e,t.colorMatrix),n.add(r,r,t.colorOffset)}function o(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3];return e[0]=n[0]*r+n[1]*i+n[2]*a+n[3]*o,e[1]=n[4]*r+n[5]*i+n[6]*a+n[7]*o,e[2]=n[8]*r+n[9]*i+n[10]*a+n[11]*o,e[3]=n[12]*r+n[13]*i+n[14]*a+n[15]*o,e}var s=n.create();function c(e,t){for(var r=e.width,i=e.height,o=e.data,c=0;c<r*i;c++)n.set(s,o[c*4+0]/255,o[c*4+1]/255,o[c*4+2]/255,o[c*4+3]/255),a(s,t,s),o[c*4+0]=s[0]*255,o[c*4+1]=s[1]*255,o[c*4+2]=s[2]*255,o[c*4+3]=s[3]*255}t.exports={identity:i,applyToPixel:a,applyToImageData:c}})),Ys=s(((e,t)=>{var n=bs(),r=.1,i=.01,a={yawSpeed:r,pitchSpeed:r,fovSpeed:r,yawAccel:i,pitchAccel:i,fovAccel:i,targetPitch:0,targetFov:null};function o(e){e=n(e||{},a);var t=e.yawSpeed,r=e.pitchSpeed,i=e.fovSpeed,o=e.yawAccel,s=e.pitchAccel,c=e.fovAccel,l=e.targetPitch,u=e.targetFov;return function(){var e=0,n=0,a=0,d=0,f=0,p=0,m=0,h,g,_,v;return function(y,b){if(h=(b-e)/1e3,f=Math.min(n+h*o,t),g=f*h,y.yaw+=g,l!=null&&y.pitch!==l){var x=.5*a*a/s;p=Math.abs(l-y.pitch)>x?Math.min(a+h*s,r):Math.max(a-h*s,0),_=p*h,l<y.pitch&&(y.pitch=Math.max(l,y.pitch-_)),l>y.pitch&&(y.pitch=Math.min(l,y.pitch+_))}if(u!=null&&y.fov!==l){var S=.5*d*d/c;m=Math.abs(u-y.fov)>S?Math.min(d+h*c,i):Math.max(d-h*c,0),v=m*h,u<y.fov&&(y.fov=Math.max(u,y.fov-v)),u>y.fov&&(y.fov=Math.min(u,y.fov+v))}return e=b,n=f,a=p,d=m,y}}}t.exports=o})),Xs=s(((e,t)=>{function n(e,t){function n(){t&&t.length>0?e.apply(null,t):e()}setTimeout(n,0)}t.exports=n})),Zs=s(((e,t)=>{function n(e){return e*Math.PI/180}t.exports=n})),Qs=s(((e,t)=>{function n(e){return e*180/Math.PI}t.exports=n})),$s=u(s(((e,t)=>{t.exports={WebGlStage:F(),WebGlCubeRenderer:Vo(),WebGlFlatRenderer:Ho(),WebGlEquirectRenderer:Go(),registerDefaultRenderers:Ko(),CubeGeometry:ns(),FlatGeometry:rs(),EquirectGeometry:is(),RectilinearView:ls(),FlatView:us(),ImageUrlSource:hs(),SingleAssetSource:gs(),StaticAsset:O(),DynamicAsset:_s(),TextureStore:Ss(),Layer:ws(),RenderLoop:Ts(),KeyControlMethod:Ds(),DragControlMethod:js(),QtvrControlMethod:Ms(),ScrollZoomControlMethod:Ns(),PinchZoomControlMethod:Ps(),VelocityControlMethod:Fs(),ElementPressControlMethod:Is(),Controls:Rs(),Dynamics:Es(),Viewer:qs(),Scene:Hs(),Hotspot:Bs(),HotspotContainer:Vs(),colorEffects:Js(),registerDefaultControls:Gs(),autorotate:Ys(),util:{async:x(),cancelize:C(),chain:ps(),clamp:Io(),clearOwnProperties:w(),cmp:$o(),compose:cs(),convertFov:as(),decimal:ss(),defaults:bs(),defer:Xs(),degToRad:Zs(),delay:ms(),dom:P(),extend:Cs(),hash:qo(),inherits:k(),mod:Jo(),noop:fs(),now:v(),once:S(),pixelRatio:ee(),radToDeg:Qs(),real:os(),retry:xs(),tween:Ks(),type:ts()},dependencies:{bowser:j(),glMatrix:(Fo(),d(Po)),eventEmitter:_(),hammerjs:Os()}}}))(),1),ec=null;function tc(){let e=document.getElementById(`pano`);if(!e)throw Error(`#pano element not found`);return ec=new $s.default.Viewer(e,{controls:{mouseViewMode:`drag`},stage:{progressive:!0}}),ec}function nc(e){if(!ec)throw Error(`Viewer belum diinisialisasi`);let t=null,n=null,r=e.initialViewParameters||e.initialView||{};if(e.levels&&e.levels.length>0){let r=`/tiles`;t=$s.default.ImageUrlSource.fromString(`${r}/${e.id}/{z}/{f}/{y}/{x}.jpg`,{cubeMapPreviewUrl:`${r}/${e.id}/preview.jpg`}),n=new $s.default.CubeGeometry(e.levels)}else{let r=e.panorama||e.panorama_path;t=$s.default.ImageUrlSource.fromString(r),n=new $s.default.EquirectGeometry([{width:4096}])}let i=e.faceSize||896,a=$s.default.RectilinearView.limit.traditional(i,100*Math.PI/180,120*Math.PI/180),o=new $s.default.RectilinearView({yaw:r.yaw??0,pitch:r.pitch??0,fov:r.fov??Math.PI/2},a);return{scene:ec.createScene({source:t,geometry:n,view:o,pinFirstLevel:!0}),view:o}}function rc(e,t){if(!e)return;let n=e.fov(),r=Math.max(30*Math.PI/180,Math.min(120*Math.PI/180,n+t));e.setFov(r)}function ic(e,t){e&&t&&(e.setYaw(t.yaw??0),e.setPitch(t.pitch??0),e.setFov(t.fov??Math.PI/2))}function ac(e,t){e&&typeof t==`function`&&e.addEventListener(`change`,()=>{t(-(e.yaw()*180/Math.PI))})}function oc(e,t,n){let r=document.createElement(`div`);r.className=`hotspot link-hotspot`,r.setAttribute(`role`,`button`),r.setAttribute(`tabindex`,`0`),r.setAttribute(`aria-label`,`Menuju ${t||e.target}`);let i=document.createElement(`div`);i.className=`link-hotspot-pulse`;let a=document.createElement(`img`);a.src=`/img/link.png`,a.className=`link-hotspot-icon`;let o=e.rotation??0;a.style.transform=`rotate(${o}rad)`,a.style.webkitTransform=`rotate(${o}rad)`,i.appendChild(a);let s=document.createElement(`div`);s.className=`hotspot-tooltip link-hotspot-tooltip`,s.textContent=t||`Lihat Lokasi`,r.appendChild(i),r.appendChild(s);let c=t=>{t.stopPropagation(),n(e.target)};return r.addEventListener(`click`,c),r.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&c(e)}),r}function sc(e){let t=document.createElement(`div`);t.className=typeof window<`u`&&window.innerWidth>768?`hotspot info-hotspot visible`:`hotspot info-hotspot`,t.setAttribute(`role`,`button`),t.setAttribute(`tabindex`,`0`);let n=document.createElement(`div`);n.className=`info-hotspot-header`;let r=document.createElement(`div`);r.className=`info-hotspot-icon-wrapper`;let i=document.createElement(`img`);i.src=`/img/info.png`,i.className=`info-hotspot-icon`,i.alt=`Info`,r.appendChild(i);let a=document.createElement(`div`);a.className=`info-hotspot-title-wrapper`;let o=document.createElement(`div`);o.className=`info-hotspot-title`,o.innerHTML=e.title||`Informasi`,a.appendChild(o);let s=document.createElement(`div`);s.className=`info-hotspot-close-wrapper`;let c=document.createElement(`img`);c.src=`/img/close.png`,c.className=`info-hotspot-close-icon`,c.alt=`Tutup`,s.appendChild(c),n.appendChild(r),n.appendChild(a),n.appendChild(s);let l=document.createElement(`div`);return l.className=`info-hotspot-text`,l.innerHTML=e.text||`<p>Tidak ada keterangan tambahan.</p>`,t.appendChild(n),t.appendChild(l),n.addEventListener(`click`,n=>{n.stopPropagation();let r=t.classList.toggle(`visible`);window.innerWidth<=600&&r&&cc(e)}),s.addEventListener(`click`,e=>{e.stopPropagation(),t.classList.remove(`visible`)}),t}function cc(e){let t=document.getElementById(`mobile-info-modal`);t&&t.remove();let n=document.createElement(`div`);n.id=`mobile-info-modal`,n.className=`modal-overlay`,n.innerHTML=`
    <div class="modal-card" style="max-width: 400px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/img/info.png" style="width: 20px; height: 20px;" alt="Info" />
          <h3>${e.title||`Informasi`}</h3>
        </div>
        <button id="btn-close-mob-info" class="icon-btn" aria-label="Tutup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div style="font-size: 14px; line-height: 1.6; color: var(--clr-text);">
          ${e.text||`Tidak ada keterangan tambahan.`}
        </div>
      </div>
      <div class="modal-footer">
        <button id="btn-dismiss-mob-info" class="btn-primary-action" style="padding: 8px 18px; font-size: 13px;">
          Tutup
        </button>
      </div>
    </div>
  `,document.body.appendChild(n);let r=()=>n.remove();n.querySelector(`#btn-close-mob-info`)?.addEventListener(`click`,r),n.querySelector(`#btn-dismiss-mob-info`)?.addEventListener(`click`,r),n.addEventListener(`click`,e=>{e.target===n&&r()})}function lc(e,t,n,r,i=null){if(!e||!t)return;let a=e.hotspotContainer();if(typeof a.listHotspots==`function`)[...a.listHotspots()].forEach(e=>a.destroyHotspot(e));else if(a._hotspots)for(;a._hotspots.length>0;)a.destroyHotspot(a._hotspots[0]);Array.isArray(i)&&i.length>0?i.filter(e=>e.sceneId===t.id&&e.status===`published`&&e.isActive!==!1).forEach(e=>{if(e.type===`link`){let t=n.find(t=>t.id===e.target),i=oc(e,t?t.name:e.title||e.target,r);a.createHotspot(i,{yaw:e.yaw,pitch:e.pitch})}else{let t=sc(e);a.createHotspot(t,{yaw:e.yaw,pitch:e.pitch})}}):((t.linkHotspots||[]).forEach(e=>{let t=n.find(t=>t.id===e.target),i=oc(e,t?t.name:e.target,r);a.createHotspot(i,{yaw:e.yaw,pitch:e.pitch})}),(t.infoHotspots||[]).forEach(e=>{let t=sc(e);a.createHotspot(t,{yaw:e.yaw,pitch:e.pitch})}))}var uc=null;function dc(){let e=document.getElementById(`sidebar`),t=document.getElementById(`sidebar-overlay`);e&&e.classList.remove(`closed`),t&&t.classList.add(`active`)}function fc(){let e=document.getElementById(`sidebar`),t=document.getElementById(`sidebar-overlay`);e&&e.classList.add(`closed`),t&&t.classList.remove(`active`)}function pc(){let e=document.getElementById(`sidebar`);e&&e.classList.contains(`closed`)?dc():fc()}function mc(e,t){let n=document.getElementById(`scene-list`);n&&(n.innerHTML=``,e.forEach(e=>{let r=document.createElement(`li`);r.className=`scene-item${e.id===t?` active`:``}`,r.setAttribute(`data-scene-id`,e.id);let i=e.status===`tersedia`;r.innerHTML=`
      <div class="scene-item-seq">${e.sequence||`•`}</div>
      <div class="scene-item-info">
        <div class="scene-item-name">${e.name}</div>
        <div class="scene-item-status">
          ${i?`✓ Foto Tersedia`:`⏳ Belum Tersedia`}${typeof e.latitude==`number`?` • ${e.latitude.toFixed(5)}°, ${e.longitude.toFixed(5)}°`:``}
        </div>
      </div>
    `,r.addEventListener(`click`,()=>{typeof uc==`function`&&uc(e.id),fc()}),n.appendChild(r)}))}function hc(e){document.querySelectorAll(`.scene-item`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-scene-id`)===e)})}function gc(e){uc=e;let t=document.getElementById(`btn-sidebar-toggle`),n=document.getElementById(`btn-sidebar-close`),r=document.getElementById(`sidebar-overlay`);t&&t.addEventListener(`click`,pc),n&&n.addEventListener(`click`,fc),r&&r.addEventListener(`click`,fc)}function _c(e){let t=document.getElementById(`btn-zoom-in`),n=document.getElementById(`btn-zoom-out`),r=document.getElementById(`btn-reset-view`),i=document.getElementById(`btn-fullscreen`),a=document.getElementById(`btn-prev-scene`),o=document.getElementById(`btn-next-scene`);t&&e.onZoomIn&&t.addEventListener(`click`,e.onZoomIn),n&&e.onZoomOut&&n.addEventListener(`click`,e.onZoomOut),r&&e.onResetView&&r.addEventListener(`click`,e.onResetView),i&&e.onFullscreen&&i.addEventListener(`click`,e.onFullscreen),a&&e.onPrevScene&&a.addEventListener(`click`,e.onPrevScene),o&&e.onNextScene&&o.addEventListener(`click`,e.onNextScene),document.addEventListener(`keydown`,t=>{if(t.target.tagName!==`INPUT`&&t.target.tagName!==`TEXTAREA`)switch(t.key){case`+`:case`=`:e.onZoomIn&&e.onZoomIn();break;case`-`:e.onZoomOut&&e.onZoomOut();break;case`r`:case`R`:e.onResetView&&e.onResetView();break;case`f`:case`F`:e.onFullscreen&&e.onFullscreen();break;case`ArrowLeft`:e.onPrevScene&&e.onPrevScene();break;case`ArrowRight`:e.onNextScene&&e.onNextScene()}})}function vc(){document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}var yc=u(s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n=typeof globalThis<`u`?globalThis:n||self,r(n.leaflet={}))})(e,(function(e){var t=`1.9.4`;function n(e){for(var t,n=1,r=arguments.length,i;n<r;n++)for(t in i=arguments[n],i)e[t]=i[t];return e}var r=Object.create||(function(){function e(){}return function(t){return e.prototype=t,new e}})();function i(e,t){var n=Array.prototype.slice;if(e.bind)return e.bind.apply(e,n.call(arguments,1));var r=n.call(arguments,2);return function(){return e.apply(t,r.length?r.concat(n.call(arguments)):arguments)}}var a=0;function o(e){return`_leaflet_id`in e||(e._leaflet_id=++a),e._leaflet_id}function s(e,t,n){var r,i,a,o=function(){r=!1,i&&=(a.apply(n,i),!1)};return a=function(){r?i=arguments:(e.apply(n,arguments),setTimeout(o,t),r=!0)},a}function c(e,t,n){var r=t[1],i=t[0],a=r-i;return e===r&&n?e:((e-i)%a+a)%a+i}function l(){return!1}function u(e,t){if(t===!1)return e;var n=10**(t===void 0?6:t);return Math.round(e*n)/n}function d(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,``)}function f(e){return d(e).split(/\s+/)}function p(e,t){for(var n in Object.prototype.hasOwnProperty.call(e,`options`)||(e.options=e.options?r(e.options):{}),t)e.options[n]=t[n];return e.options}function m(e,t,n){var r=[];for(var i in e)r.push(encodeURIComponent(n?i.toUpperCase():i)+`=`+encodeURIComponent(e[i]));return(!t||t.indexOf(`?`)===-1?`?`:`&`)+r.join(`&`)}var h=/\{ *([\w_ -]+) *\}/g;function g(e,t){return e.replace(h,function(e,n){var r=t[n];if(r===void 0)throw Error(`No value provided for variable `+e);return typeof r==`function`&&(r=r(t)),r})}var _=Array.isArray||function(e){return Object.prototype.toString.call(e)===`[object Array]`};function v(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1}var y=`data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;function b(e){return window[`webkit`+e]||window[`moz`+e]||window[`ms`+e]}var x=0;function S(e){var t=+new Date,n=Math.max(0,16-(t-x));return x=t+n,window.setTimeout(e,n)}var C=window.requestAnimationFrame||b(`RequestAnimationFrame`)||S,w=window.cancelAnimationFrame||b(`CancelAnimationFrame`)||b(`CancelRequestAnimationFrame`)||function(e){window.clearTimeout(e)};function T(e,t,n){if(n&&C===S)e.call(t);else return C.call(window,i(e,t))}function E(e){e&&w.call(window,e)}var D={__proto__:null,extend:n,create:r,bind:i,get lastId(){return a},stamp:o,throttle:s,wrapNum:c,falseFn:l,formatNum:u,trim:d,splitWords:f,setOptions:p,getParamString:m,template:g,isArray:_,indexOf:v,emptyImageUrl:y,requestFn:C,cancelFn:w,requestAnimFrame:T,cancelAnimFrame:E};function O(){}O.extend=function(e){var t=function(){p(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=t.__super__=this.prototype,a=r(i);for(var o in a.constructor=t,t.prototype=a,this)Object.prototype.hasOwnProperty.call(this,o)&&o!==`prototype`&&o!==`__super__`&&(t[o]=this[o]);return e.statics&&n(t,e.statics),e.includes&&(k(e.includes),n.apply(null,[a].concat(e.includes))),n(a,e),delete a.statics,delete a.includes,a.options&&(a.options=i.options?r(i.options):{},n(a.options,e.options)),a._initHooks=[],a.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var e=0,t=a._initHooks.length;e<t;e++)a._initHooks[e].call(this)}},t},O.include=function(e){var t=this.prototype.options;return n(this.prototype,e),e.options&&(this.prototype.options=t,this.mergeOptions(e.options)),this},O.mergeOptions=function(e){return n(this.prototype.options,e),this},O.addInitHook=function(e){var t=Array.prototype.slice.call(arguments,1),n=typeof e==`function`?e:function(){this[e].apply(this,t)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(n),this};function k(e){if(typeof L<`u`&&L&&L.Mixin){e=_(e)?e:[e];for(var t=0;t<e.length;t++)e[t]===L.Mixin.Events&&console.warn(`Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.`,Error().stack)}}var A={on:function(e,t,n){if(typeof e==`object`)for(var r in e)this._on(r,e[r],t);else{e=f(e);for(var i=0,a=e.length;i<a;i++)this._on(e[i],t,n)}return this},off:function(e,t,n){if(!arguments.length)delete this._events;else if(typeof e==`object`)for(var r in e)this._off(r,e[r],t);else{e=f(e);for(var i=arguments.length===1,a=0,o=e.length;a<o;a++)i?this._off(e[a]):this._off(e[a],t,n)}return this},_on:function(e,t,n,r){if(typeof t!=`function`)console.warn(`wrong listener type: `+typeof t);else if(this._listens(e,t,n)===!1){n===this&&(n=void 0);var i={fn:t,ctx:n};r&&(i.once=!0),this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(i)}},_off:function(e,t,n){var r,i,a;if(this._events&&(r=this._events[e],r)){if(arguments.length===1){if(this._firingCount)for(i=0,a=r.length;i<a;i++)r[i].fn=l;delete this._events[e]}else if(typeof t!=`function`)console.warn(`wrong listener type: `+typeof t);else{var o=this._listens(e,t,n);if(o!==!1){var s=r[o];this._firingCount&&(s.fn=l,this._events[e]=r=r.slice()),r.splice(o,1)}}}},fire:function(e,t,r){if(!this.listens(e,r))return this;var i=n({},t,{type:e,target:this,sourceTarget:t&&t.sourceTarget||this});if(this._events){var a=this._events[e];if(a){this._firingCount=this._firingCount+1||1;for(var o=0,s=a.length;o<s;o++){var c=a[o],l=c.fn;c.once&&this.off(e,l,c.ctx),l.call(c.ctx||this,i)}this._firingCount--}}return r&&this._propagateEvent(i),this},listens:function(e,t,n,r){typeof e!=`string`&&console.warn(`"string" type argument expected`);var i=t;typeof t!=`function`&&(r=!!t,i=void 0,n=void 0);var a=this._events&&this._events[e];if(a&&a.length&&this._listens(e,i,n)!==!1)return!0;if(r){for(var o in this._eventParents)if(this._eventParents[o].listens(e,t,n,r))return!0}return!1},_listens:function(e,t,n){if(!this._events)return!1;var r=this._events[e]||[];if(!t)return!!r.length;n===this&&(n=void 0);for(var i=0,a=r.length;i<a;i++)if(r[i].fn===t&&r[i].ctx===n)return i;return!1},once:function(e,t,n){if(typeof e==`object`)for(var r in e)this._on(r,e[r],t,!0);else{e=f(e);for(var i=0,a=e.length;i<a;i++)this._on(e[i],t,n,!0)}return this},addEventParent:function(e){return this._eventParents=this._eventParents||{},this._eventParents[o(e)]=e,this},removeEventParent:function(e){return this._eventParents&&delete this._eventParents[o(e)],this},_propagateEvent:function(e){for(var t in this._eventParents)this._eventParents[t].fire(e.type,n({layer:e.target,propagatedFrom:e.target},e),!0)}};A.addEventListener=A.on,A.removeEventListener=A.clearAllEventListeners=A.off,A.addOneTimeEventListener=A.once,A.fireEvent=A.fire,A.hasEventListeners=A.listens;var j=O.extend(A);function M(e,t,n){this.x=n?Math.round(e):e,this.y=n?Math.round(t):t}var ee=Math.trunc||function(e){return e>0?Math.floor(e):Math.ceil(e)};M.prototype={clone:function(){return new M(this.x,this.y)},add:function(e){return this.clone()._add(N(e))},_add:function(e){return this.x+=e.x,this.y+=e.y,this},subtract:function(e){return this.clone()._subtract(N(e))},_subtract:function(e){return this.x-=e.x,this.y-=e.y,this},divideBy:function(e){return this.clone()._divideBy(e)},_divideBy:function(e){return this.x/=e,this.y/=e,this},multiplyBy:function(e){return this.clone()._multiplyBy(e)},_multiplyBy:function(e){return this.x*=e,this.y*=e,this},scaleBy:function(e){return new M(this.x*e.x,this.y*e.y)},unscaleBy:function(e){return new M(this.x/e.x,this.y/e.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=ee(this.x),this.y=ee(this.y),this},distanceTo:function(e){e=N(e);var t=e.x-this.x,n=e.y-this.y;return Math.sqrt(t*t+n*n)},equals:function(e){return e=N(e),e.x===this.x&&e.y===this.y},contains:function(e){return e=N(e),Math.abs(e.x)<=Math.abs(this.x)&&Math.abs(e.y)<=Math.abs(this.y)},toString:function(){return`Point(`+u(this.x)+`, `+u(this.y)+`)`}};function N(e,t,n){return e instanceof M?e:_(e)?new M(e[0],e[1]):e==null?e:typeof e==`object`&&`x`in e&&`y`in e?new M(e.x,e.y):new M(e,t,n)}function P(e,t){if(e)for(var n=t?[e,t]:e,r=0,i=n.length;r<i;r++)this.extend(n[r])}P.prototype={extend:function(e){var t,n;if(!e)return this;if(e instanceof M||typeof e[0]==`number`||`x`in e)t=n=N(e);else if(e=F(e),t=e.min,n=e.max,!t||!n)return this;return!this.min&&!this.max?(this.min=t.clone(),this.max=n.clone()):(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(n.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(n.y,this.max.y)),this},getCenter:function(e){return N((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,e)},getBottomLeft:function(){return N(this.min.x,this.max.y)},getTopRight:function(){return N(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(e){var t,n;return e=typeof e[0]==`number`||e instanceof M?N(e):F(e),e instanceof P?(t=e.min,n=e.max):t=n=e,t.x>=this.min.x&&n.x<=this.max.x&&t.y>=this.min.y&&n.y<=this.max.y},intersects:function(e){e=F(e);var t=this.min,n=this.max,r=e.min,i=e.max,a=i.x>=t.x&&r.x<=n.x,o=i.y>=t.y&&r.y<=n.y;return a&&o},overlaps:function(e){e=F(e);var t=this.min,n=this.max,r=e.min,i=e.max,a=i.x>t.x&&r.x<n.x,o=i.y>t.y&&r.y<n.y;return a&&o},isValid:function(){return!!(this.min&&this.max)},pad:function(e){var t=this.min,n=this.max,r=Math.abs(t.x-n.x)*e,i=Math.abs(t.y-n.y)*e;return F(N(t.x-r,t.y-i),N(n.x+r,n.y+i))},equals:function(e){return e?(e=F(e),this.min.equals(e.getTopLeft())&&this.max.equals(e.getBottomRight())):!1}};function F(e,t){return!e||e instanceof P?e:new P(e,t)}function te(e,t){if(e)for(var n=t?[e,t]:e,r=0,i=n.length;r<i;r++)this.extend(n[r])}te.prototype={extend:function(e){var t=this._southWest,n=this._northEast,r,i;if(e instanceof R)r=e,i=e;else if(e instanceof te){if(r=e._southWest,i=e._northEast,!r||!i)return this}else return e?this.extend(z(e)||I(e)):this;return!t&&!n?(this._southWest=new R(r.lat,r.lng),this._northEast=new R(i.lat,i.lng)):(t.lat=Math.min(r.lat,t.lat),t.lng=Math.min(r.lng,t.lng),n.lat=Math.max(i.lat,n.lat),n.lng=Math.max(i.lng,n.lng)),this},pad:function(e){var t=this._southWest,n=this._northEast,r=Math.abs(t.lat-n.lat)*e,i=Math.abs(t.lng-n.lng)*e;return new te(new R(t.lat-r,t.lng-i),new R(n.lat+r,n.lng+i))},getCenter:function(){return new R((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new R(this.getNorth(),this.getWest())},getSouthEast:function(){return new R(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(e){e=typeof e[0]==`number`||e instanceof R||`lat`in e?z(e):I(e);var t=this._southWest,n=this._northEast,r,i;return e instanceof te?(r=e.getSouthWest(),i=e.getNorthEast()):r=i=e,r.lat>=t.lat&&i.lat<=n.lat&&r.lng>=t.lng&&i.lng<=n.lng},intersects:function(e){e=I(e);var t=this._southWest,n=this._northEast,r=e.getSouthWest(),i=e.getNorthEast(),a=i.lat>=t.lat&&r.lat<=n.lat,o=i.lng>=t.lng&&r.lng<=n.lng;return a&&o},overlaps:function(e){e=I(e);var t=this._southWest,n=this._northEast,r=e.getSouthWest(),i=e.getNorthEast(),a=i.lat>t.lat&&r.lat<n.lat,o=i.lng>t.lng&&r.lng<n.lng;return a&&o},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(`,`)},equals:function(e,t){return e?(e=I(e),this._southWest.equals(e.getSouthWest(),t)&&this._northEast.equals(e.getNorthEast(),t)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function I(e,t){return e instanceof te?e:new te(e,t)}function R(e,t,n){if(isNaN(e)||isNaN(t))throw Error(`Invalid LatLng object: (`+e+`, `+t+`)`);this.lat=+e,this.lng=+t,n!==void 0&&(this.alt=+n)}R.prototype={equals:function(e,t){return e?(e=z(e),Math.max(Math.abs(this.lat-e.lat),Math.abs(this.lng-e.lng))<=(t===void 0?1e-9:t)):!1},toString:function(e){return`LatLng(`+u(this.lat,e)+`, `+u(this.lng,e)+`)`},distanceTo:function(e){return V.distance(this,z(e))},wrap:function(){return V.wrapLatLng(this)},toBounds:function(e){var t=180*e/40075017,n=t/Math.cos(Math.PI/180*this.lat);return I([this.lat-t,this.lng-n],[this.lat+t,this.lng+n])},clone:function(){return new R(this.lat,this.lng,this.alt)}};function z(e,t,n){return e instanceof R?e:_(e)&&typeof e[0]!=`object`?e.length===3?new R(e[0],e[1],e[2]):e.length===2?new R(e[0],e[1]):null:e==null?e:typeof e==`object`&&`lat`in e?new R(e.lat,`lng`in e?e.lng:e.lon,e.alt):t===void 0?null:new R(e,t,n)}var B={latLngToPoint:function(e,t){var n=this.projection.project(e),r=this.scale(t);return this.transformation._transform(n,r)},pointToLatLng:function(e,t){var n=this.scale(t),r=this.transformation.untransform(e,n);return this.projection.unproject(r)},project:function(e){return this.projection.project(e)},unproject:function(e){return this.projection.unproject(e)},scale:function(e){return 256*2**e},zoom:function(e){return Math.log(e/256)/Math.LN2},getProjectedBounds:function(e){if(this.infinite)return null;var t=this.projection.bounds,n=this.scale(e);return new P(this.transformation.transform(t.min,n),this.transformation.transform(t.max,n))},infinite:!1,wrapLatLng:function(e){var t=this.wrapLng?c(e.lng,this.wrapLng,!0):e.lng,n=this.wrapLat?c(e.lat,this.wrapLat,!0):e.lat,r=e.alt;return new R(n,t,r)},wrapLatLngBounds:function(e){var t=e.getCenter(),n=this.wrapLatLng(t),r=t.lat-n.lat,i=t.lng-n.lng;if(r===0&&i===0)return e;var a=e.getSouthWest(),o=e.getNorthEast();return new te(new R(a.lat-r,a.lng-i),new R(o.lat-r,o.lng-i))}},V=n({},B,{wrapLng:[-180,180],R:6371e3,distance:function(e,t){var n=Math.PI/180,r=e.lat*n,i=t.lat*n,a=Math.sin((t.lat-e.lat)*n/2),o=Math.sin((t.lng-e.lng)*n/2),s=a*a+Math.cos(r)*Math.cos(i)*o*o,c=2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));return this.R*c}}),H=6378137,ne={R:H,MAX_LATITUDE:85.0511287798,project:function(e){var t=Math.PI/180,n=this.MAX_LATITUDE,r=Math.max(Math.min(n,e.lat),-n),i=Math.sin(r*t);return new M(this.R*e.lng*t,this.R*Math.log((1+i)/(1-i))/2)},unproject:function(e){var t=180/Math.PI;return new R((2*Math.atan(Math.exp(e.y/this.R))-Math.PI/2)*t,e.x*t/this.R)},bounds:(function(){var e=H*Math.PI;return new P([-e,-e],[e,e])})()};function U(e,t,n,r){_(e)?(this._a=e[0],this._b=e[1],this._c=e[2],this._d=e[3]):(this._a=e,this._b=t,this._c=n,this._d=r)}U.prototype={transform:function(e,t){return this._transform(e.clone(),t)},_transform:function(e,t){return t||=1,e.x=t*(this._a*e.x+this._b),e.y=t*(this._c*e.y+this._d),e},untransform:function(e,t){return t||=1,new M((e.x/t-this._b)/this._a,(e.y/t-this._d)/this._c)}};function re(e,t,n,r){return new U(e,t,n,r)}var ie=n({},V,{code:`EPSG:3857`,projection:ne,transformation:function(){var e=.5/(Math.PI*ne.R);return re(e,.5,-e,.5)}()}),ae=n({},ie,{code:`EPSG:900913`});function oe(e){return document.createElementNS(`http://www.w3.org/2000/svg`,e)}function se(e,t){for(var n=``,r=0,i,a=e.length,o,s,c;r<a;r++){for(s=e[r],i=0,o=s.length;i<o;i++)c=s[i],n+=(i?`L`:`M`)+c.x+` `+c.y;n+=t?W.svg?`z`:`x`:``}return n||`M0 0`}var ce=document.documentElement.style,le=`ActiveXObject`in window,ue=le&&!document.addEventListener,de=`msLaunchUri`in navigator&&!(`documentMode`in document),fe=Ge(`webkit`),pe=Ge(`android`),me=Ge(`android 2`)||Ge(`android 3`),he=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),ge=pe&&Ge(`Google`)&&he<537&&!(`AudioNode`in window),_e=!!window.opera,ve=!de&&Ge(`chrome`),ye=Ge(`gecko`)&&!fe&&!_e&&!le,be=!ve&&Ge(`safari`),xe=Ge(`phantom`),Se=`OTransition`in ce,Ce=navigator.platform.indexOf(`Win`)===0,we=le&&`transition`in ce,Te=`WebKitCSSMatrix`in window&&`m11`in new window.WebKitCSSMatrix&&!me,Ee=`MozPerspective`in ce,De=!window.L_DISABLE_3D&&(we||Te||Ee)&&!Se&&!xe,Oe=typeof orientation<`u`||Ge(`mobile`),ke=Oe&&fe,Ae=Oe&&Te,je=!window.PointerEvent&&window.MSPointerEvent,Me=!!(window.PointerEvent||je),Ne=`ontouchstart`in window||!!window.TouchEvent,Pe=!window.L_NO_TOUCH&&(Ne||Me),Fe=Oe&&_e,Ie=Oe&&ye,Le=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Re=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener(`testPassiveEventSupport`,l,t),window.removeEventListener(`testPassiveEventSupport`,l,t)}catch{}return e}(),ze=function(){return!!document.createElement(`canvas`).getContext}(),Be=!!(document.createElementNS&&oe(`svg`).createSVGRect),Ve=!!Be&&(function(){var e=document.createElement(`div`);return e.innerHTML=`<svg/>`,(e.firstChild&&e.firstChild.namespaceURI)===`http://www.w3.org/2000/svg`})(),He=!Be&&function(){try{var e=document.createElement(`div`);e.innerHTML=`<v:shape adj="1"/>`;var t=e.firstChild;return t.style.behavior=`url(#default#VML)`,t&&typeof t.adj==`object`}catch{return!1}}(),Ue=navigator.platform.indexOf(`Mac`)===0,We=navigator.platform.indexOf(`Linux`)===0;function Ge(e){return navigator.userAgent.toLowerCase().indexOf(e)>=0}var W={ie:le,ielt9:ue,edge:de,webkit:fe,android:pe,android23:me,androidStock:ge,opera:_e,chrome:ve,gecko:ye,safari:be,phantom:xe,opera12:Se,win:Ce,ie3d:we,webkit3d:Te,gecko3d:Ee,any3d:De,mobile:Oe,mobileWebkit:ke,mobileWebkit3d:Ae,msPointer:je,pointer:Me,touch:Pe,touchNative:Ne,mobileOpera:Fe,mobileGecko:Ie,retina:Le,passiveEvents:Re,canvas:ze,svg:Be,vml:He,inlineSvg:Ve,mac:Ue,linux:We},Ke=W.msPointer?`MSPointerDown`:`pointerdown`,qe=W.msPointer?`MSPointerMove`:`pointermove`,Je=W.msPointer?`MSPointerUp`:`pointerup`,Ye=W.msPointer?`MSPointerCancel`:`pointercancel`,Xe={touchstart:Ke,touchmove:qe,touchend:Je,touchcancel:Ye},Ze={touchstart:st,touchmove:ot,touchend:ot,touchcancel:ot},Qe={},$e=!1;function et(e,t,n){return t===`touchstart`&&at(),Ze[t]?(n=Ze[t].bind(this,n),e.addEventListener(Xe[t],n,!1),n):(console.warn(`wrong event specified:`,t),l)}function tt(e,t,n){Xe[t]?e.removeEventListener(Xe[t],n,!1):console.warn(`wrong event specified:`,t)}function nt(e){Qe[e.pointerId]=e}function rt(e){Qe[e.pointerId]&&(Qe[e.pointerId]=e)}function it(e){delete Qe[e.pointerId]}function at(){$e||=(document.addEventListener(Ke,nt,!0),document.addEventListener(qe,rt,!0),document.addEventListener(Je,it,!0),document.addEventListener(Ye,it,!0),!0)}function ot(e,t){if(t.pointerType!==(t.MSPOINTER_TYPE_MOUSE||`mouse`)){for(var n in t.touches=[],Qe)t.touches.push(Qe[n]);t.changedTouches=[t],e(t)}}function st(e,t){t.MSPOINTER_TYPE_TOUCH&&t.pointerType===t.MSPOINTER_TYPE_TOUCH&&Zt(t),ot(e,t)}function ct(e){var t={},n,r;for(r in e)n=e[r],t[r]=n&&n.bind?n.bind(e):n;return e=t,t.type=`dblclick`,t.detail=2,t.isTrusted=!1,t._simulated=!0,t}var lt=200;function ut(e,t){e.addEventListener(`dblclick`,t);var n=0,r;function i(e){if(e.detail!==1)r=e.detail;else if(!(e.pointerType===`mouse`||e.sourceCapabilities&&!e.sourceCapabilities.firesTouchEvents)){var i=$t(e);if(!i.some(function(e){return e instanceof HTMLLabelElement&&e.attributes.for})||i.some(function(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement})){var a=Date.now();a-n<=lt?(r++,r===2&&t(ct(e))):r=1,n=a}}}return e.addEventListener(`click`,i),{dblclick:t,simDblclick:i}}function dt(e,t){e.removeEventListener(`dblclick`,t.dblclick),e.removeEventListener(`click`,t.simDblclick)}var ft=Et([`transform`,`webkitTransform`,`OTransform`,`MozTransform`,`msTransform`]),pt=Et([`webkitTransition`,`transition`,`OTransition`,`MozTransition`,`msTransition`]),mt=pt===`webkitTransition`||pt===`OTransition`?pt+`End`:`transitionend`;function ht(e){return typeof e==`string`?document.getElementById(e):e}function gt(e,t){var n=e.style[t]||e.currentStyle&&e.currentStyle[t];if((!n||n===`auto`)&&document.defaultView){var r=document.defaultView.getComputedStyle(e,null);n=r?r[t]:null}return n===`auto`?null:n}function G(e,t,n){var r=document.createElement(e);return r.className=t||``,n&&n.appendChild(r),r}function K(e){var t=e.parentNode;t&&t.removeChild(e)}function _t(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function vt(e){var t=e.parentNode;t&&t.lastChild!==e&&t.appendChild(e)}function yt(e){var t=e.parentNode;t&&t.firstChild!==e&&t.insertBefore(e,t.firstChild)}function bt(e,t){if(e.classList!==void 0)return e.classList.contains(t);var n=Ct(e);return n.length>0&&RegExp(`(^|\\s)`+t+`(\\s|$)`).test(n)}function q(e,t){if(e.classList!==void 0)for(var n=f(t),r=0,i=n.length;r<i;r++)e.classList.add(n[r]);else if(!bt(e,t)){var a=Ct(e);St(e,(a?a+` `:``)+t)}}function xt(e,t){e.classList===void 0?St(e,d((` `+Ct(e)+` `).replace(` `+t+` `,` `))):e.classList.remove(t)}function St(e,t){e.className.baseVal===void 0?e.className=t:e.className.baseVal=t}function Ct(e){return e.correspondingElement&&(e=e.correspondingElement),e.className.baseVal===void 0?e.className:e.className.baseVal}function wt(e,t){`opacity`in e.style?e.style.opacity=t:`filter`in e.style&&Tt(e,t)}function Tt(e,t){var n=!1,r=`DXImageTransform.Microsoft.Alpha`;try{n=e.filters.item(r)}catch{if(t===1)return}t=Math.round(t*100),n?(n.Enabled=t!==100,n.Opacity=t):e.style.filter+=` progid:`+r+`(opacity=`+t+`)`}function Et(e){for(var t=document.documentElement.style,n=0;n<e.length;n++)if(e[n]in t)return e[n];return!1}function Dt(e,t,n){var r=t||new M(0,0);e.style[ft]=(W.ie3d?`translate(`+r.x+`px,`+r.y+`px)`:`translate3d(`+r.x+`px,`+r.y+`px,0)`)+(n?` scale(`+n+`)`:``)}function Ot(e,t){e._leaflet_pos=t,W.any3d?Dt(e,t):(e.style.left=t.x+`px`,e.style.top=t.y+`px`)}function kt(e){return e._leaflet_pos||new M(0,0)}var At,jt,Mt;if(`onselectstart`in document)At=function(){J(window,`selectstart`,Zt)},jt=function(){Y(window,`selectstart`,Zt)};else{var Nt=Et([`userSelect`,`WebkitUserSelect`,`OUserSelect`,`MozUserSelect`,`msUserSelect`]);At=function(){if(Nt){var e=document.documentElement.style;Mt=e[Nt],e[Nt]=`none`}},jt=function(){Nt&&(document.documentElement.style[Nt]=Mt,Mt=void 0)}}function Pt(){J(window,`dragstart`,Zt)}function Ft(){Y(window,`dragstart`,Zt)}var It,Lt;function Rt(e){for(;e.tabIndex===-1;)e=e.parentNode;e.style&&(zt(),It=e,Lt=e.style.outlineStyle,e.style.outlineStyle=`none`,J(window,`keydown`,zt))}function zt(){It&&(It.style.outlineStyle=Lt,It=void 0,Lt=void 0,Y(window,`keydown`,zt))}function Bt(e){do e=e.parentNode;while((!e.offsetWidth||!e.offsetHeight)&&e!==document.body);return e}function Vt(e){var t=e.getBoundingClientRect();return{x:t.width/e.offsetWidth||1,y:t.height/e.offsetHeight||1,boundingClientRect:t}}var Ht={__proto__:null,TRANSFORM:ft,TRANSITION:pt,TRANSITION_END:mt,get:ht,getStyle:gt,create:G,remove:K,empty:_t,toFront:vt,toBack:yt,hasClass:bt,addClass:q,removeClass:xt,setClass:St,getClass:Ct,setOpacity:wt,testProp:Et,setTransform:Dt,setPosition:Ot,getPosition:kt,get disableTextSelection(){return At},get enableTextSelection(){return jt},disableImageDrag:Pt,enableImageDrag:Ft,preventOutline:Rt,restoreOutline:zt,getSizedParentNode:Bt,getScale:Vt};function J(e,t,n,r){if(t&&typeof t==`object`)for(var i in t)Kt(e,i,t[i],n);else{t=f(t);for(var a=0,o=t.length;a<o;a++)Kt(e,t[a],n,r)}return this}var Ut=`_leaflet_events`;function Y(e,t,n,r){if(arguments.length===1)Wt(e),delete e[Ut];else if(t&&typeof t==`object`)for(var i in t)qt(e,i,t[i],n);else if(t=f(t),arguments.length===2)Wt(e,function(e){return v(t,e)!==-1});else for(var a=0,o=t.length;a<o;a++)qt(e,t[a],n,r);return this}function Wt(e,t){for(var n in e[Ut]){var r=n.split(/\d/)[0];(!t||t(r))&&qt(e,r,null,null,n)}}var Gt={mouseenter:`mouseover`,mouseleave:`mouseout`,wheel:!(`onwheel`in window)&&`mousewheel`};function Kt(e,t,n,r){var i=t+o(n)+(r?`_`+o(r):``);if(e[Ut]&&e[Ut][i])return this;var a=function(t){return n.call(r||e,t||window.event)},s=a;!W.touchNative&&W.pointer&&t.indexOf(`touch`)===0?a=et(e,t,a):W.touch&&t===`dblclick`?a=ut(e,a):`addEventListener`in e?t===`touchstart`||t===`touchmove`||t===`wheel`||t===`mousewheel`?e.addEventListener(Gt[t]||t,a,W.passiveEvents?{passive:!1}:!1):t===`mouseenter`||t===`mouseleave`?(a=function(t){t||=window.event,rn(e,t)&&s(t)},e.addEventListener(Gt[t],a,!1)):e.addEventListener(t,s,!1):e.attachEvent(`on`+t,a),e[Ut]=e[Ut]||{},e[Ut][i]=a}function qt(e,t,n,r,i){i||=t+o(n)+(r?`_`+o(r):``);var a=e[Ut]&&e[Ut][i];if(!a)return this;!W.touchNative&&W.pointer&&t.indexOf(`touch`)===0?tt(e,t,a):W.touch&&t===`dblclick`?dt(e,a):`removeEventListener`in e?e.removeEventListener(Gt[t]||t,a,!1):e.detachEvent(`on`+t,a),e[Ut][i]=null}function Jt(e){return e.stopPropagation?e.stopPropagation():e.originalEvent?e.originalEvent._stopped=!0:e.cancelBubble=!0,this}function Yt(e){return Kt(e,`wheel`,Jt),this}function Xt(e){return J(e,`mousedown touchstart dblclick contextmenu`,Jt),e._leaflet_disable_click=!0,this}function Zt(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,this}function Qt(e){return Zt(e),Jt(e),this}function $t(e){if(e.composedPath)return e.composedPath();for(var t=[],n=e.target;n;)t.push(n),n=n.parentNode;return t}function en(e,t){if(!t)return new M(e.clientX,e.clientY);var n=Vt(t),r=n.boundingClientRect;return new M((e.clientX-r.left)/n.x-t.clientLeft,(e.clientY-r.top)/n.y-t.clientTop)}var tn=W.linux&&W.chrome?window.devicePixelRatio:W.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function nn(e){return W.edge?e.wheelDeltaY/2:e.deltaY&&e.deltaMode===0?-e.deltaY/tn:e.deltaY&&e.deltaMode===1?-e.deltaY*20:e.deltaY&&e.deltaMode===2?-e.deltaY*60:e.deltaX||e.deltaZ?0:e.wheelDelta?(e.wheelDeltaY||e.wheelDelta)/2:e.detail&&Math.abs(e.detail)<32765?-e.detail*20:e.detail?e.detail/-32765*60:0}function rn(e,t){var n=t.relatedTarget;if(!n)return!0;try{for(;n&&n!==e;)n=n.parentNode}catch{return!1}return n!==e}var an={__proto__:null,on:J,off:Y,stopPropagation:Jt,disableScrollPropagation:Yt,disableClickPropagation:Xt,preventDefault:Zt,stop:Qt,getPropagationPath:$t,getMousePosition:en,getWheelDelta:nn,isExternalTarget:rn,addListener:J,removeListener:Y},on=j.extend({run:function(e,t,n,r){this.stop(),this._el=e,this._inProgress=!0,this._duration=n||.25,this._easeOutPower=1/Math.max(r||.5,.2),this._startPos=kt(e),this._offset=t.subtract(this._startPos),this._startTime=+new Date,this.fire(`start`),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=T(this._animate,this),this._step()},_step:function(e){var t=+new Date-this._startTime,n=this._duration*1e3;t<n?this._runFrame(this._easeOut(t/n),e):(this._runFrame(1),this._complete())},_runFrame:function(e,t){var n=this._startPos.add(this._offset.multiplyBy(e));t&&n._round(),Ot(this._el,n),this.fire(`step`)},_complete:function(){E(this._animId),this._inProgress=!1,this.fire(`end`)},_easeOut:function(e){return 1-(1-e)**this._easeOutPower}}),X=j.extend({options:{crs:ie,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(e,t){t=p(this,t),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(e),this._initLayout(),this._onResize=i(this._onResize,this),this._initEvents(),t.maxBounds&&this.setMaxBounds(t.maxBounds),t.zoom!==void 0&&(this._zoom=this._limitZoom(t.zoom)),t.center&&t.zoom!==void 0&&this.setView(z(t.center),t.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=pt&&W.any3d&&!W.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),J(this._proxy,mt,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(e,t,r){return t=t===void 0?this._zoom:this._limitZoom(t),e=this._limitCenter(z(e),t,this.options.maxBounds),r||={},this._stop(),this._loaded&&!r.reset&&r!==!0&&(r.animate!==void 0&&(r.zoom=n({animate:r.animate},r.zoom),r.pan=n({animate:r.animate,duration:r.duration},r.pan)),this._zoom===t?this._tryAnimatedPan(e,r.pan):this._tryAnimatedZoom&&this._tryAnimatedZoom(e,t,r.zoom))?(clearTimeout(this._sizeTimer),this):(this._resetView(e,t,r.pan&&r.pan.noMoveStart),this)},setZoom:function(e,t){return this._loaded?this.setView(this.getCenter(),e,{zoom:t}):(this._zoom=e,this)},zoomIn:function(e,t){return e||=W.any3d?this.options.zoomDelta:1,this.setZoom(this._zoom+e,t)},zoomOut:function(e,t){return e||=W.any3d?this.options.zoomDelta:1,this.setZoom(this._zoom-e,t)},setZoomAround:function(e,t,n){var r=this.getZoomScale(t),i=this.getSize().divideBy(2),a=(e instanceof M?e:this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1-1/r),o=this.containerPointToLatLng(i.add(a));return this.setView(o,t,{zoom:n})},_getBoundsCenterZoom:function(e,t){t||={},e=e.getBounds?e.getBounds():I(e);var n=N(t.paddingTopLeft||t.padding||[0,0]),r=N(t.paddingBottomRight||t.padding||[0,0]),i=this.getBoundsZoom(e,!1,n.add(r));if(i=typeof t.maxZoom==`number`?Math.min(t.maxZoom,i):i,i===1/0)return{center:e.getCenter(),zoom:i};var a=r.subtract(n).divideBy(2),o=this.project(e.getSouthWest(),i),s=this.project(e.getNorthEast(),i);return{center:this.unproject(o.add(s).divideBy(2).add(a),i),zoom:i}},fitBounds:function(e,t){if(e=I(e),!e.isValid())throw Error(`Bounds are not valid.`);var n=this._getBoundsCenterZoom(e,t);return this.setView(n.center,n.zoom,t)},fitWorld:function(e){return this.fitBounds([[-90,-180],[90,180]],e)},panTo:function(e,t){return this.setView(e,this._zoom,{pan:t})},panBy:function(e,t){if(e=N(e).round(),t||={},!e.x&&!e.y)return this.fire(`moveend`);if(t.animate!==!0&&!this.getSize().contains(e))return this._resetView(this.unproject(this.project(this.getCenter()).add(e)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new on,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),t.noMoveStart||this.fire(`movestart`),t.animate!==!1){q(this._mapPane,`leaflet-pan-anim`);var n=this._getMapPanePos().subtract(e).round();this._panAnim.run(this._mapPane,n,t.duration||.25,t.easeLinearity)}else this._rawPanBy(e),this.fire(`move`).fire(`moveend`);return this},flyTo:function(e,t,n){if(n||={},n.animate===!1||!W.any3d)return this.setView(e,t,n);this._stop();var r=this.project(this.getCenter()),i=this.project(e),a=this.getSize(),o=this._zoom;e=z(e),t=t===void 0?o:t;var s=Math.max(a.x,a.y),c=s*this.getZoomScale(o,t),l=i.distanceTo(r)||1,u=1.42,d=u*u;function f(e){var t=e?-1:1,n=e?c:s,r=(c*c-s*s+t*d*d*l*l)/(2*n*d*l),i=Math.sqrt(r*r+1)-r;return i<1e-9?-18:Math.log(i)}function p(e){return(Math.exp(e)-Math.exp(-e))/2}function m(e){return(Math.exp(e)+Math.exp(-e))/2}function h(e){return p(e)/m(e)}var g=f(0);function _(e){return s*(m(g)/m(g+u*e))}function v(e){return s*(m(g)*h(g+u*e)-p(g))/d}function y(e){return 1-(1-e)**1.5}var b=Date.now(),x=(f(1)-g)/u,S=n.duration?1e3*n.duration:1e3*x*.8;function C(){var n=(Date.now()-b)/S,a=y(n)*x;n<=1?(this._flyToFrame=T(C,this),this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a)/l)),o),this.getScaleZoom(s/_(a),o),{flyTo:!0})):this._move(e,t)._moveEnd(!0)}return this._moveStart(!0,n.noMoveStart),C.call(this),this},flyToBounds:function(e,t){var n=this._getBoundsCenterZoom(e,t);return this.flyTo(n.center,n.zoom,t)},setMaxBounds:function(e){return e=I(e),this.listens(`moveend`,this._panInsideMaxBounds)&&this.off(`moveend`,this._panInsideMaxBounds),e.isValid()?(this.options.maxBounds=e,this._loaded&&this._panInsideMaxBounds(),this.on(`moveend`,this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(e){var t=this.options.minZoom;return this.options.minZoom=e,this._loaded&&t!==e&&(this.fire(`zoomlevelschange`),this.getZoom()<this.options.minZoom)?this.setZoom(e):this},setMaxZoom:function(e){var t=this.options.maxZoom;return this.options.maxZoom=e,this._loaded&&t!==e&&(this.fire(`zoomlevelschange`),this.getZoom()>this.options.maxZoom)?this.setZoom(e):this},panInsideBounds:function(e,t){this._enforcingBounds=!0;var n=this.getCenter(),r=this._limitCenter(n,this._zoom,I(e));return n.equals(r)||this.panTo(r,t),this._enforcingBounds=!1,this},panInside:function(e,t){t||={};var n=N(t.paddingTopLeft||t.padding||[0,0]),r=N(t.paddingBottomRight||t.padding||[0,0]),i=this.project(this.getCenter()),a=this.project(e),o=this.getPixelBounds(),s=F([o.min.add(n),o.max.subtract(r)]),c=s.getSize();if(!s.contains(a)){this._enforcingBounds=!0;var l=a.subtract(s.getCenter()),u=s.extend(a).getSize().subtract(c);i.x+=l.x<0?-u.x:u.x,i.y+=l.y<0?-u.y:u.y,this.panTo(this.unproject(i),t),this._enforcingBounds=!1}return this},invalidateSize:function(e){if(!this._loaded)return this;e=n({animate:!1,pan:!0},e===!0?{animate:!0}:e);var t=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var r=this.getSize(),a=t.divideBy(2).round(),o=r.divideBy(2).round(),s=a.subtract(o);return!s.x&&!s.y?this:(e.animate&&e.pan?this.panBy(s):(e.pan&&this._rawPanBy(s),this.fire(`move`),e.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(i(this.fire,this,`moveend`),200)):this.fire(`moveend`)),this.fire(`resize`,{oldSize:t,newSize:r}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire(`viewreset`),this._stop()},locate:function(e){if(e=this._locateOptions=n({timeout:1e4,watch:!1},e),!(`geolocation`in navigator))return this._handleGeolocationError({code:0,message:`Geolocation not supported.`}),this;var t=i(this._handleGeolocationResponse,this),r=i(this._handleGeolocationError,this);return e.watch?this._locationWatchId=navigator.geolocation.watchPosition(t,r,e):navigator.geolocation.getCurrentPosition(t,r,e),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(e){if(this._container._leaflet_id){var t=e.code,n=e.message||(t===1?`permission denied`:t===2?`position unavailable`:`timeout`);this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire(`locationerror`,{code:t,message:`Geolocation error: `+n+`.`})}},_handleGeolocationResponse:function(e){if(this._container._leaflet_id){var t=e.coords.latitude,n=e.coords.longitude,r=new R(t,n),i=r.toBounds(e.coords.accuracy*2),a=this._locateOptions;if(a.setView){var o=this.getBoundsZoom(i);this.setView(r,a.maxZoom?Math.min(o,a.maxZoom):o)}var s={latlng:r,bounds:i,timestamp:e.timestamp};for(var c in e.coords)typeof e.coords[c]==`number`&&(s[c]=e.coords[c]);this.fire(`locationfound`,s)}},addHandler:function(e,t){if(!t)return this;var n=this[e]=new t(this);return this._handlers.push(n),this.options[e]&&n.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off(`moveend`,this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw Error(`Map container is being reused by another instance`);try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}for(var e in this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),K(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&=(E(this._resizeRequest),null),this._clearHandlers(),this._loaded&&this.fire(`unload`),this._layers)this._layers[e].remove();for(e in this._panes)K(this._panes[e]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(e,t){var n=G(`div`,`leaflet-pane`+(e?` leaflet-`+e.replace(`Pane`,``)+`-pane`:``),t||this._mapPane);return e&&(this._panes[e]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var e=this.getPixelBounds();return new te(this.unproject(e.getBottomLeft()),this.unproject(e.getTopRight()))},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(e,t,n){e=I(e),n=N(n||[0,0]);var r=this.getZoom()||0,i=this.getMinZoom(),a=this.getMaxZoom(),o=e.getNorthWest(),s=e.getSouthEast(),c=this.getSize().subtract(n),l=F(this.project(s,r),this.project(o,r)).getSize(),u=W.any3d?this.options.zoomSnap:1,d=c.x/l.x,f=c.y/l.y,p=t?Math.max(d,f):Math.min(d,f);return r=this.getScaleZoom(p,r),u&&(r=Math.round(r/(u/100))*(u/100),r=t?Math.ceil(r/u)*u:Math.floor(r/u)*u),Math.max(i,Math.min(a,r))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new M(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(e,t){var n=this._getTopLeftPoint(e,t);return new P(n,n.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(e){return this.options.crs.getProjectedBounds(e===void 0?this.getZoom():e)},getPane:function(e){return typeof e==`string`?this._panes[e]:e},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(e,t){var n=this.options.crs;return t=t===void 0?this._zoom:t,n.scale(e)/n.scale(t)},getScaleZoom:function(e,t){var n=this.options.crs;t=t===void 0?this._zoom:t;var r=n.zoom(e*n.scale(t));return isNaN(r)?1/0:r},project:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.latLngToPoint(z(e),t)},unproject:function(e,t){return t=t===void 0?this._zoom:t,this.options.crs.pointToLatLng(N(e),t)},layerPointToLatLng:function(e){var t=N(e).add(this.getPixelOrigin());return this.unproject(t)},latLngToLayerPoint:function(e){return this.project(z(e))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(e){return this.options.crs.wrapLatLng(z(e))},wrapLatLngBounds:function(e){return this.options.crs.wrapLatLngBounds(I(e))},distance:function(e,t){return this.options.crs.distance(z(e),z(t))},containerPointToLayerPoint:function(e){return N(e).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(e){return N(e).add(this._getMapPanePos())},containerPointToLatLng:function(e){var t=this.containerPointToLayerPoint(N(e));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(e){return this.layerPointToContainerPoint(this.latLngToLayerPoint(z(e)))},mouseEventToContainerPoint:function(e){return en(e,this._container)},mouseEventToLayerPoint:function(e){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))},mouseEventToLatLng:function(e){return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))},_initContainer:function(e){var t=this._container=ht(e);if(!t)throw Error(`Map container not found.`);if(t._leaflet_id)throw Error(`Map container is already initialized.`);J(t,`scroll`,this._onScroll,this),this._containerId=o(t)},_initLayout:function(){var e=this._container;this._fadeAnimated=this.options.fadeAnimation&&W.any3d,q(e,`leaflet-container`+(W.touch?` leaflet-touch`:``)+(W.retina?` leaflet-retina`:``)+(W.ielt9?` leaflet-oldie`:``)+(W.safari?` leaflet-safari`:``)+(this._fadeAnimated?` leaflet-fade-anim`:``));var t=gt(e,`position`);t!==`absolute`&&t!==`relative`&&t!==`fixed`&&t!==`sticky`&&(e.style.position=`relative`),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var e=this._panes={};this._paneRenderers={},this._mapPane=this.createPane(`mapPane`,this._container),Ot(this._mapPane,new M(0,0)),this.createPane(`tilePane`),this.createPane(`overlayPane`),this.createPane(`shadowPane`),this.createPane(`markerPane`),this.createPane(`tooltipPane`),this.createPane(`popupPane`),this.options.markerZoomAnimation||(q(e.markerPane,`leaflet-zoom-hide`),q(e.shadowPane,`leaflet-zoom-hide`))},_resetView:function(e,t,n){Ot(this._mapPane,new M(0,0));var r=!this._loaded;this._loaded=!0,t=this._limitZoom(t),this.fire(`viewprereset`);var i=this._zoom!==t;this._moveStart(i,n)._move(e,t)._moveEnd(i),this.fire(`viewreset`),r&&this.fire(`load`)},_moveStart:function(e,t){return e&&this.fire(`zoomstart`),t||this.fire(`movestart`),this},_move:function(e,t,n,r){t===void 0&&(t=this._zoom);var i=this._zoom!==t;return this._zoom=t,this._lastCenter=e,this._pixelOrigin=this._getNewPixelOrigin(e),r?n&&n.pinch&&this.fire(`zoom`,n):((i||n&&n.pinch)&&this.fire(`zoom`,n),this.fire(`move`,n)),this},_moveEnd:function(e){return e&&this.fire(`zoomend`),this.fire(`moveend`)},_stop:function(){return E(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(e){Ot(this._mapPane,this._getMapPanePos().subtract(e))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw Error(`Set map center and zoom first.`)},_initEvents:function(e){this._targets={},this._targets[o(this._container)]=this;var t=e?Y:J;t(this._container,`click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup`,this._handleDOMEvent,this),this.options.trackResize&&t(window,`resize`,this._onResize,this),W.any3d&&this.options.transform3DLimit&&(e?this.off:this.on).call(this,`moveend`,this._onMoveEnd)},_onResize:function(){E(this._resizeRequest),this._resizeRequest=T(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var e=this._getMapPanePos();Math.max(Math.abs(e.x),Math.abs(e.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(e,t){for(var n=[],r,i=t===`mouseout`||t===`mouseover`,a=e.target||e.srcElement,s=!1;a;){if(r=this._targets[o(a)],r&&(t===`click`||t===`preclick`)&&this._draggableMoved(r)){s=!0;break}if(r&&r.listens(t,!0)&&(i&&!rn(a,e)||(n.push(r),i))||a===this._container)break;a=a.parentNode}return!n.length&&!s&&!i&&this.listens(t,!0)&&(n=[this]),n},_isClickDisabled:function(e){for(;e&&e!==this._container;){if(e._leaflet_disable_click)return!0;e=e.parentNode}},_handleDOMEvent:function(e){var t=e.target||e.srcElement;if(!(!this._loaded||t._leaflet_disable_events||e.type===`click`&&this._isClickDisabled(t))){var n=e.type;n===`mousedown`&&Rt(t),this._fireDOMEvent(e,n)}},_mouseEvents:[`click`,`dblclick`,`mouseover`,`mouseout`,`contextmenu`],_fireDOMEvent:function(e,t,r){if(e.type===`click`){var i=n({},e);i.type=`preclick`,this._fireDOMEvent(i,i.type,r)}var a=this._findEventTargets(e,t);if(r){for(var o=[],s=0;s<r.length;s++)r[s].listens(t,!0)&&o.push(r[s]);a=o.concat(a)}if(a.length){t===`contextmenu`&&Zt(e);var c=a[0],l={originalEvent:e};if(e.type!==`keypress`&&e.type!==`keydown`&&e.type!==`keyup`){var u=c.getLatLng&&(!c._radius||c._radius<=10);l.containerPoint=u?this.latLngToContainerPoint(c.getLatLng()):this.mouseEventToContainerPoint(e),l.layerPoint=this.containerPointToLayerPoint(l.containerPoint),l.latlng=u?c.getLatLng():this.layerPointToLatLng(l.layerPoint)}for(s=0;s<a.length;s++)if(a[s].fire(t,l,!0),l.originalEvent._stopped||a[s].options.bubblingMouseEvents===!1&&v(this._mouseEvents,t)!==-1)return}},_draggableMoved:function(e){return e=e.dragging&&e.dragging.enabled()?e:this,e.dragging&&e.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var e=0,t=this._handlers.length;e<t;e++)this._handlers[e].disable()},whenReady:function(e,t){return this._loaded?e.call(t||this,{target:this}):this.on(`load`,e,t),this},_getMapPanePos:function(){return kt(this._mapPane)||new M(0,0)},_moved:function(){var e=this._getMapPanePos();return e&&!e.equals([0,0])},_getTopLeftPoint:function(e,t){return(e&&t!==void 0?this._getNewPixelOrigin(e,t):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(e,t){var n=this.getSize()._divideBy(2);return this.project(e,t)._subtract(n)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(e,t,n){var r=this._getNewPixelOrigin(n,t);return this.project(e,t)._subtract(r)},_latLngBoundsToNewLayerBounds:function(e,t,n){var r=this._getNewPixelOrigin(n,t);return F([this.project(e.getSouthWest(),t)._subtract(r),this.project(e.getNorthWest(),t)._subtract(r),this.project(e.getSouthEast(),t)._subtract(r),this.project(e.getNorthEast(),t)._subtract(r)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(e){return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())},_limitCenter:function(e,t,n){if(!n)return e;var r=this.project(e,t),i=this.getSize().divideBy(2),a=new P(r.subtract(i),r.add(i)),o=this._getBoundsOffset(a,n,t);return Math.abs(o.x)<=1&&Math.abs(o.y)<=1?e:this.unproject(r.add(o),t)},_limitOffset:function(e,t){if(!t)return e;var n=this.getPixelBounds(),r=new P(n.min.add(e),n.max.add(e));return e.add(this._getBoundsOffset(r,t))},_getBoundsOffset:function(e,t,n){var r=F(this.project(t.getNorthEast(),n),this.project(t.getSouthWest(),n)),i=r.min.subtract(e.min),a=r.max.subtract(e.max);return new M(this._rebound(i.x,-a.x),this._rebound(i.y,-a.y))},_rebound:function(e,t){return e+t>0?Math.round(e-t)/2:Math.max(0,Math.ceil(e))-Math.max(0,Math.floor(t))},_limitZoom:function(e){var t=this.getMinZoom(),n=this.getMaxZoom(),r=W.any3d?this.options.zoomSnap:1;return r&&(e=Math.round(e/r)*r),Math.max(t,Math.min(n,e))},_onPanTransitionStep:function(){this.fire(`move`)},_onPanTransitionEnd:function(){xt(this._mapPane,`leaflet-pan-anim`),this.fire(`moveend`)},_tryAnimatedPan:function(e,t){var n=this._getCenterOffset(e)._trunc();return(t&&t.animate)!==!0&&!this.getSize().contains(n)?!1:(this.panBy(n,t),!0)},_createAnimProxy:function(){var e=this._proxy=G(`div`,`leaflet-proxy leaflet-zoom-animated`);this._panes.mapPane.appendChild(e),this.on(`zoomanim`,function(e){var t=ft,n=this._proxy.style[t];Dt(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[t]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on(`load moveend`,this._animMoveEnd,this),this._on(`unload`,this._destroyAnimProxy,this)},_destroyAnimProxy:function(){K(this._proxy),this.off(`load moveend`,this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var e=this.getCenter(),t=this.getZoom();Dt(this._proxy,this.project(e,t),this.getZoomScale(t,1))},_catchTransitionEnd:function(e){this._animatingZoom&&e.propertyName.indexOf(`transform`)>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName(`leaflet-zoom-animated`).length},_tryAnimatedZoom:function(e,t,n){if(this._animatingZoom)return!0;if(n||={},!this._zoomAnimated||n.animate===!1||this._nothingToAnimate()||Math.abs(t-this._zoom)>this.options.zoomAnimationThreshold)return!1;var r=this.getZoomScale(t),i=this._getCenterOffset(e)._divideBy(1-1/r);return n.animate!==!0&&!this.getSize().contains(i)?!1:(T(function(){this._moveStart(!0,n.noMoveStart||!1)._animateZoom(e,t,!0)},this),!0)},_animateZoom:function(e,t,n,r){this._mapPane&&(n&&(this._animatingZoom=!0,this._animateToCenter=e,this._animateToZoom=t,q(this._mapPane,`leaflet-zoom-anim`)),this.fire(`zoomanim`,{center:e,zoom:t,noUpdate:r}),this._tempFireZoomEvent||=this._zoom!==this._animateToZoom,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(i(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&xt(this._mapPane,`leaflet-zoom-anim`),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire(`zoom`),delete this._tempFireZoomEvent,this.fire(`move`),this._moveEnd(!0))}});function sn(e,t){return new X(e,t)}var cn=O.extend({options:{position:`topright`},initialize:function(e){p(this,e)},getPosition:function(){return this.options.position},setPosition:function(e){var t=this._map;return t&&t.removeControl(this),this.options.position=e,t&&t.addControl(this),this},getContainer:function(){return this._container},addTo:function(e){this.remove(),this._map=e;var t=this._container=this.onAdd(e),n=this.getPosition(),r=e._controlCorners[n];return q(t,`leaflet-control`),n.indexOf(`bottom`)===-1?r.appendChild(t):r.insertBefore(t,r.firstChild),this._map.on(`unload`,this.remove,this),this},remove:function(){return this._map&&=(K(this._container),this.onRemove&&this.onRemove(this._map),this._map.off(`unload`,this.remove,this),null),this},_refocusOnMap:function(e){this._map&&e&&e.screenX>0&&e.screenY>0&&this._map.getContainer().focus()}}),ln=function(e){return new cn(e)};X.include({addControl:function(e){return e.addTo(this),this},removeControl:function(e){return e.remove(),this},_initControlPos:function(){var e=this._controlCorners={},t=`leaflet-`,n=this._controlContainer=G(`div`,t+`control-container`,this._container);function r(r,i){var a=t+r+` `+t+i;e[r+i]=G(`div`,a,n)}r(`top`,`left`),r(`top`,`right`),r(`bottom`,`left`),r(`bottom`,`right`)},_clearControlPos:function(){for(var e in this._controlCorners)K(this._controlCorners[e]);K(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var un=cn.extend({options:{collapsed:!0,position:`topright`,autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(e,t,n,r){return n<r?-1:+(r<n)}},initialize:function(e,t,n){for(var r in p(this,n),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1,e)this._addLayer(e[r],r);for(r in t)this._addLayer(t[r],r,!0)},onAdd:function(e){this._initLayout(),this._update(),this._map=e,e.on(`zoomend`,this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.on(`add remove`,this._onLayerChange,this);return this._container},addTo:function(e){return cn.prototype.addTo.call(this,e),this._expandIfNotCollapsed()},onRemove:function(){this._map.off(`zoomend`,this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.off(`add remove`,this._onLayerChange,this)},addBaseLayer:function(e,t){return this._addLayer(e,t),this._map?this._update():this},addOverlay:function(e,t){return this._addLayer(e,t,!0),this._map?this._update():this},removeLayer:function(e){e.off(`add remove`,this._onLayerChange,this);var t=this._getLayer(o(e));return t&&this._layers.splice(this._layers.indexOf(t),1),this._map?this._update():this},expand:function(){q(this._container,`leaflet-control-layers-expanded`),this._section.style.height=null;var e=this._map.getSize().y-(this._container.offsetTop+50);return e<this._section.clientHeight?(q(this._section,`leaflet-control-layers-scrollbar`),this._section.style.height=e+`px`):xt(this._section,`leaflet-control-layers-scrollbar`),this._checkDisabledLayers(),this},collapse:function(){return xt(this._container,`leaflet-control-layers-expanded`),this},_initLayout:function(){var e=`leaflet-control-layers`,t=this._container=G(`div`,e),n=this.options.collapsed;t.setAttribute(`aria-haspopup`,!0),Xt(t),Yt(t);var r=this._section=G(`section`,e+`-list`);n&&(this._map.on(`click`,this.collapse,this),J(t,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var i=this._layersLink=G(`a`,e+`-toggle`,t);i.href=`#`,i.title=`Layers`,i.setAttribute(`role`,`button`),J(i,{keydown:function(e){e.keyCode===13&&this._expandSafely()},click:function(e){Zt(e),this._expandSafely()}},this),n||this.expand(),this._baseLayersList=G(`div`,e+`-base`,r),this._separator=G(`div`,e+`-separator`,r),this._overlaysList=G(`div`,e+`-overlays`,r),t.appendChild(r)},_getLayer:function(e){for(var t=0;t<this._layers.length;t++)if(this._layers[t]&&o(this._layers[t].layer)===e)return this._layers[t]},_addLayer:function(e,t,n){this._map&&e.on(`add remove`,this._onLayerChange,this),this._layers.push({layer:e,name:t,overlay:n}),this.options.sortLayers&&this._layers.sort(i(function(e,t){return this.options.sortFunction(e.layer,t.layer,e.name,t.name)},this)),this.options.autoZIndex&&e.setZIndex&&(this._lastZIndex++,e.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;_t(this._baseLayersList),_t(this._overlaysList),this._layerControlInputs=[];var e,t,n,r,i=0;for(n=0;n<this._layers.length;n++)r=this._layers[n],this._addItem(r),t||=r.overlay,e||=!r.overlay,i+=+!r.overlay;return this.options.hideSingleBase&&(e&&=i>1,this._baseLayersList.style.display=e?``:`none`),this._separator.style.display=t&&e?``:`none`,this},_onLayerChange:function(e){this._handlingClick||this._update();var t=this._getLayer(o(e.target)),n=t.overlay?e.type===`add`?`overlayadd`:`overlayremove`:e.type===`add`?`baselayerchange`:null;n&&this._map.fire(n,t)},_createRadioElement:function(e,t){var n=`<input type="radio" class="leaflet-control-layers-selector" name="`+e+`"`+(t?` checked="checked"`:``)+`/>`,r=document.createElement(`div`);return r.innerHTML=n,r.firstChild},_addItem:function(e){var t=document.createElement(`label`),n=this._map.hasLayer(e.layer),r;e.overlay?(r=document.createElement(`input`),r.type=`checkbox`,r.className=`leaflet-control-layers-selector`,r.defaultChecked=n):r=this._createRadioElement(`leaflet-base-layers_`+o(this),n),this._layerControlInputs.push(r),r.layerId=o(e.layer),J(r,`click`,this._onInputClick,this);var i=document.createElement(`span`);i.innerHTML=` `+e.name;var a=document.createElement(`span`);return t.appendChild(a),a.appendChild(r),a.appendChild(i),(e.overlay?this._overlaysList:this._baseLayersList).appendChild(t),this._checkDisabledLayers(),t},_onInputClick:function(){if(!this._preventClick){var e=this._layerControlInputs,t,n,r=[],i=[];this._handlingClick=!0;for(var a=e.length-1;a>=0;a--)t=e[a],n=this._getLayer(t.layerId).layer,t.checked?r.push(n):t.checked||i.push(n);for(a=0;a<i.length;a++)this._map.hasLayer(i[a])&&this._map.removeLayer(i[a]);for(a=0;a<r.length;a++)this._map.hasLayer(r[a])||this._map.addLayer(r[a]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var e=this._layerControlInputs,t,n,r=this._map.getZoom(),i=e.length-1;i>=0;i--)t=e[i],n=this._getLayer(t.layerId).layer,t.disabled=n.options.minZoom!==void 0&&r<n.options.minZoom||n.options.maxZoom!==void 0&&r>n.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var e=this._section;this._preventClick=!0,J(e,`click`,Zt),this.expand();var t=this;setTimeout(function(){Y(e,`click`,Zt),t._preventClick=!1})}}),dn=function(e,t,n){return new un(e,t,n)},fn=cn.extend({options:{position:`topleft`,zoomInText:`<span aria-hidden="true">+</span>`,zoomInTitle:`Zoom in`,zoomOutText:`<span aria-hidden="true">&#x2212;</span>`,zoomOutTitle:`Zoom out`},onAdd:function(e){var t=`leaflet-control-zoom`,n=G(`div`,t+` leaflet-bar`),r=this.options;return this._zoomInButton=this._createButton(r.zoomInText,r.zoomInTitle,t+`-in`,n,this._zoomIn),this._zoomOutButton=this._createButton(r.zoomOutText,r.zoomOutTitle,t+`-out`,n,this._zoomOut),this._updateDisabled(),e.on(`zoomend zoomlevelschange`,this._updateDisabled,this),n},onRemove:function(e){e.off(`zoomend zoomlevelschange`,this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(e){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(e.shiftKey?3:1))},_zoomOut:function(e){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(e.shiftKey?3:1))},_createButton:function(e,t,n,r,i){var a=G(`a`,n,r);return a.innerHTML=e,a.href=`#`,a.title=t,a.setAttribute(`role`,`button`),a.setAttribute(`aria-label`,t),Xt(a),J(a,`click`,Qt),J(a,`click`,i,this),J(a,`click`,this._refocusOnMap,this),a},_updateDisabled:function(){var e=this._map,t=`leaflet-disabled`;xt(this._zoomInButton,t),xt(this._zoomOutButton,t),this._zoomInButton.setAttribute(`aria-disabled`,`false`),this._zoomOutButton.setAttribute(`aria-disabled`,`false`),(this._disabled||e._zoom===e.getMinZoom())&&(q(this._zoomOutButton,t),this._zoomOutButton.setAttribute(`aria-disabled`,`true`)),(this._disabled||e._zoom===e.getMaxZoom())&&(q(this._zoomInButton,t),this._zoomInButton.setAttribute(`aria-disabled`,`true`))}});X.mergeOptions({zoomControl:!0}),X.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new fn,this.addControl(this.zoomControl))});var pn=function(e){return new fn(e)},mn=cn.extend({options:{position:`bottomleft`,maxWidth:100,metric:!0,imperial:!0},onAdd:function(e){var t=`leaflet-control-scale`,n=G(`div`,t),r=this.options;return this._addScales(r,t+`-line`,n),e.on(r.updateWhenIdle?`moveend`:`move`,this._update,this),e.whenReady(this._update,this),n},onRemove:function(e){e.off(this.options.updateWhenIdle?`moveend`:`move`,this._update,this)},_addScales:function(e,t,n){e.metric&&(this._mScale=G(`div`,t,n)),e.imperial&&(this._iScale=G(`div`,t,n))},_update:function(){var e=this._map,t=e.getSize().y/2,n=e.distance(e.containerPointToLatLng([0,t]),e.containerPointToLatLng([this.options.maxWidth,t]));this._updateScales(n)},_updateScales:function(e){this.options.metric&&e&&this._updateMetric(e),this.options.imperial&&e&&this._updateImperial(e)},_updateMetric:function(e){var t=this._getRoundNum(e),n=t<1e3?t+` m`:t/1e3+` km`;this._updateScale(this._mScale,n,t/e)},_updateImperial:function(e){var t=e*3.2808399,n,r,i;t>5280?(n=t/5280,r=this._getRoundNum(n),this._updateScale(this._iScale,r+` mi`,r/n)):(i=this._getRoundNum(t),this._updateScale(this._iScale,i+` ft`,i/t))},_updateScale:function(e,t,n){e.style.width=Math.round(this.options.maxWidth*n)+`px`,e.innerHTML=t},_getRoundNum:function(e){var t=10**((Math.floor(e)+``).length-1),n=e/t;return n=n>=10?10:n>=5?5:n>=3?3:n>=2?2:1,t*n}}),hn=function(e){return new mn(e)},gn=cn.extend({options:{position:`bottomright`,prefix:`<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">`+(W.inlineSvg?`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> `:``)+`Leaflet</a>`},initialize:function(e){p(this,e),this._attributions={}},onAdd:function(e){for(var t in e.attributionControl=this,this._container=G(`div`,`leaflet-control-attribution`),Xt(this._container),e._layers)e._layers[t].getAttribution&&this.addAttribution(e._layers[t].getAttribution());return this._update(),e.on(`layeradd`,this._addAttribution,this),this._container},onRemove:function(e){e.off(`layeradd`,this._addAttribution,this)},_addAttribution:function(e){e.layer.getAttribution&&(this.addAttribution(e.layer.getAttribution()),e.layer.once(`remove`,function(){this.removeAttribution(e.layer.getAttribution())},this))},setPrefix:function(e){return this.options.prefix=e,this._update(),this},addAttribution:function(e){return e&&(this._attributions[e]||(this._attributions[e]=0),this._attributions[e]++,this._update()),this},removeAttribution:function(e){return e&&this._attributions[e]&&(this._attributions[e]--,this._update()),this},_update:function(){if(this._map){var e=[];for(var t in this._attributions)this._attributions[t]&&e.push(t);var n=[];this.options.prefix&&n.push(this.options.prefix),e.length&&n.push(e.join(`, `)),this._container.innerHTML=n.join(` <span aria-hidden="true">|</span> `)}}});X.mergeOptions({attributionControl:!0}),X.addInitHook(function(){this.options.attributionControl&&new gn().addTo(this)}),cn.Layers=un,cn.Zoom=fn,cn.Scale=mn,cn.Attribution=gn,ln.layers=dn,ln.zoom=pn,ln.scale=hn,ln.attribution=function(e){return new gn(e)};var _n=O.extend({initialize:function(e){this._map=e},enable:function(){return this._enabled||(this._enabled=!0,this.addHooks()),this},disable:function(){return this._enabled&&(this._enabled=!1,this.removeHooks()),this},enabled:function(){return!!this._enabled}});_n.addTo=function(e,t){return e.addHandler(t,this),this};var vn={Events:A},yn=W.touch?`touchstart mousedown`:`mousedown`,bn=j.extend({options:{clickTolerance:3},initialize:function(e,t,n,r){p(this,r),this._element=e,this._dragStartTarget=t||e,this._preventOutline=n},enable:function(){this._enabled||=(J(this._dragStartTarget,yn,this._onDown,this),!0)},disable:function(){this._enabled&&(bn._dragging===this&&this.finishDrag(!0),Y(this._dragStartTarget,yn,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(e){if(this._enabled&&(this._moved=!1,!bt(this._element,`leaflet-zoom-anim`))){if(e.touches&&e.touches.length!==1)bn._dragging===this&&this.finishDrag();else if(!(bn._dragging||e.shiftKey||e.which!==1&&e.button!==1&&!e.touches)&&(bn._dragging=this,this._preventOutline&&Rt(this._element),Pt(),At(),!this._moving)){this.fire(`down`);var t=e.touches?e.touches[0]:e,n=Bt(this._element);this._startPoint=new M(t.clientX,t.clientY),this._startPos=kt(this._element),this._parentScale=Vt(n);var r=e.type===`mousedown`;J(document,r?`mousemove`:`touchmove`,this._onMove,this),J(document,r?`mouseup`:`touchend touchcancel`,this._onUp,this)}}},_onMove:function(e){if(this._enabled){if(e.touches&&e.touches.length>1)this._moved=!0;else{var t=e.touches&&e.touches.length===1?e.touches[0]:e,n=new M(t.clientX,t.clientY)._subtract(this._startPoint);(n.x||n.y)&&(Math.abs(n.x)+Math.abs(n.y)<this.options.clickTolerance||(n.x/=this._parentScale.x,n.y/=this._parentScale.y,Zt(e),this._moved||(this.fire(`dragstart`),this._moved=!0,q(document.body,`leaflet-dragging`),this._lastTarget=e.target||e.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),q(this._lastTarget,`leaflet-drag-target`)),this._newPos=this._startPos.add(n),this._moving=!0,this._lastEvent=e,this._updatePosition()))}}},_updatePosition:function(){var e={originalEvent:this._lastEvent};this.fire(`predrag`,e),Ot(this._element,this._newPos),this.fire(`drag`,e)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(e){xt(document.body,`leaflet-dragging`),this._lastTarget&&=(xt(this._lastTarget,`leaflet-drag-target`),null),Y(document,`mousemove touchmove`,this._onMove,this),Y(document,`mouseup touchend touchcancel`,this._onUp,this),Ft(),jt();var t=this._moved&&this._moving;this._moving=!1,bn._dragging=!1,t&&this.fire(`dragend`,{noInertia:e,distance:this._newPos.distanceTo(this._startPos)})}});function xn(e,t,n){for(var r,i=[1,4,2,8],a=0,o,s,c,l,u=e.length,d,f;a<u;a++)e[a]._code=Pn(e[a],t);for(s=0;s<4;s++){for(d=i[s],r=[],a=0,u=e.length,o=u-1;a<u;o=a++)c=e[a],l=e[o],c._code&d?l._code&d||(f=Nn(l,c,d,t,n),f._code=Pn(f,t),r.push(f)):(l._code&d&&(f=Nn(l,c,d,t,n),f._code=Pn(f,t),r.push(f)),r.push(c));e=r}return e}function Sn(e,t){var n,r,i,a,o,s,c,l,u;if(!e||e.length===0)throw Error(`latlngs not passed`);Ln(e)||(console.warn(`latlngs are not flat! Only the first ring will be used`),e=e[0]);var d=z([0,0]),f=I(e);f.getNorthWest().distanceTo(f.getSouthWest())*f.getNorthEast().distanceTo(f.getNorthWest())<1700&&(d=Cn(e));var p=e.length,m=[];for(n=0;n<p;n++){var h=z(e[n]);m.push(t.project(z([h.lat-d.lat,h.lng-d.lng])))}for(s=c=l=0,n=0,r=p-1;n<p;r=n++)i=m[n],a=m[r],o=i.y*a.x-a.y*i.x,c+=(i.x+a.x)*o,l+=(i.y+a.y)*o,s+=o*3;u=s===0?m[0]:[c/s,l/s];var g=t.unproject(N(u));return z([g.lat+d.lat,g.lng+d.lng])}function Cn(e){for(var t=0,n=0,r=0,i=0;i<e.length;i++){var a=z(e[i]);t+=a.lat,n+=a.lng,r++}return z([t/r,n/r])}var wn={__proto__:null,clipPolygon:xn,polygonCenter:Sn,centroid:Cn};function Tn(e,t){if(!t||!e.length)return e.slice();var n=t*t;return e=An(e,n),e=On(e,n),e}function En(e,t,n){return Math.sqrt(In(e,t,n,!0))}function Dn(e,t,n){return In(e,t,n)}function On(e,t){var n=e.length,r=new(typeof Uint8Array<`u`?Uint8Array:Array)(n);r[0]=r[n-1]=1,kn(e,r,t,0,n-1);var i,a=[];for(i=0;i<n;i++)r[i]&&a.push(e[i]);return a}function kn(e,t,n,r,i){for(var a=0,o,s=r+1,c;s<=i-1;s++)c=In(e[s],e[r],e[i],!0),c>a&&(o=s,a=c);a>n&&(t[o]=1,kn(e,t,n,r,o),kn(e,t,n,o,i))}function An(e,t){for(var n=[e[0]],r=1,i=0,a=e.length;r<a;r++)Fn(e[r],e[i])>t&&(n.push(e[r]),i=r);return i<a-1&&n.push(e[a-1]),n}var jn;function Mn(e,t,n,r,i){var a=r?jn:Pn(e,n),o=Pn(t,n),s,c,l;for(jn=o;;){if(!(a|o))return[e,t];if(a&o)return!1;s=a||o,c=Nn(e,t,s,n,i),l=Pn(c,n),s===a?(e=c,a=l):(t=c,o=l)}}function Nn(e,t,n,r,i){var a=t.x-e.x,o=t.y-e.y,s=r.min,c=r.max,l,u;return n&8?(l=e.x+a*(c.y-e.y)/o,u=c.y):n&4?(l=e.x+a*(s.y-e.y)/o,u=s.y):n&2?(l=c.x,u=e.y+o*(c.x-e.x)/a):n&1&&(l=s.x,u=e.y+o*(s.x-e.x)/a),new M(l,u,i)}function Pn(e,t){var n=0;return e.x<t.min.x?n|=1:e.x>t.max.x&&(n|=2),e.y<t.min.y?n|=4:e.y>t.max.y&&(n|=8),n}function Fn(e,t){var n=t.x-e.x,r=t.y-e.y;return n*n+r*r}function In(e,t,n,r){var i=t.x,a=t.y,o=n.x-i,s=n.y-a,c=o*o+s*s,l;return c>0&&(l=((e.x-i)*o+(e.y-a)*s)/c,l>1?(i=n.x,a=n.y):l>0&&(i+=o*l,a+=s*l)),o=e.x-i,s=e.y-a,r?o*o+s*s:new M(i,a)}function Ln(e){return!_(e[0])||typeof e[0][0]!=`object`&&e[0][0]!==void 0}function Rn(e){return console.warn(`Deprecated use of _flat, please use L.LineUtil.isFlat instead.`),Ln(e)}function zn(e,t){var n,r,i,a,o,s,c,l;if(!e||e.length===0)throw Error(`latlngs not passed`);Ln(e)||(console.warn(`latlngs are not flat! Only the first ring will be used`),e=e[0]);var u=z([0,0]),d=I(e);d.getNorthWest().distanceTo(d.getSouthWest())*d.getNorthEast().distanceTo(d.getNorthWest())<1700&&(u=Cn(e));var f=e.length,p=[];for(n=0;n<f;n++){var m=z(e[n]);p.push(t.project(z([m.lat-u.lat,m.lng-u.lng])))}for(n=0,r=0;n<f-1;n++)r+=p[n].distanceTo(p[n+1])/2;if(r===0)l=p[0];else for(n=0,a=0;n<f-1;n++)if(o=p[n],s=p[n+1],i=o.distanceTo(s),a+=i,a>r){c=(a-r)/i,l=[s.x-c*(s.x-o.x),s.y-c*(s.y-o.y)];break}var h=t.unproject(N(l));return z([h.lat+u.lat,h.lng+u.lng])}var Bn={__proto__:null,simplify:Tn,pointToSegmentDistance:En,closestPointOnSegment:Dn,clipSegment:Mn,_getEdgeIntersection:Nn,_getBitCode:Pn,_sqClosestPointOnSegment:In,isFlat:Ln,_flat:Rn,polylineCenter:zn},Vn={project:function(e){return new M(e.lng,e.lat)},unproject:function(e){return new R(e.y,e.x)},bounds:new P([-180,-90],[180,90])},Hn={R:6378137,R_MINOR:6356752.314245179,bounds:new P([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(e){var t=Math.PI/180,n=this.R,r=e.lat*t,i=this.R_MINOR/n,a=Math.sqrt(1-i*i),o=a*Math.sin(r),s=Math.tan(Math.PI/4-r/2)/((1-o)/(1+o))**(a/2);return r=-n*Math.log(Math.max(s,1e-10)),new M(e.lng*t*n,r)},unproject:function(e){for(var t=180/Math.PI,n=this.R,r=this.R_MINOR/n,i=Math.sqrt(1-r*r),a=Math.exp(-e.y/n),o=Math.PI/2-2*Math.atan(a),s=0,c=.1,l;s<15&&Math.abs(c)>1e-7;s++)l=i*Math.sin(o),l=((1-l)/(1+l))**(i/2),c=Math.PI/2-2*Math.atan(a*l)-o,o+=c;return new R(o*t,e.x*t/n)}},Un={__proto__:null,LonLat:Vn,Mercator:Hn,SphericalMercator:ne},Wn=n({},V,{code:`EPSG:3395`,projection:Hn,transformation:function(){var e=.5/(Math.PI*Hn.R);return re(e,.5,-e,.5)}()}),Gn=n({},V,{code:`EPSG:4326`,projection:Vn,transformation:re(1/180,1,-1/180,.5)}),Kn=n({},B,{projection:Vn,transformation:re(1,0,-1,0),scale:function(e){return 2**e},zoom:function(e){return Math.log(e)/Math.LN2},distance:function(e,t){var n=t.lng-e.lng,r=t.lat-e.lat;return Math.sqrt(n*n+r*r)},infinite:!0});B.Earth=V,B.EPSG3395=Wn,B.EPSG3857=ie,B.EPSG900913=ae,B.EPSG4326=Gn,B.Simple=Kn;var qn=j.extend({options:{pane:`overlayPane`,attribution:null,bubblingMouseEvents:!0},addTo:function(e){return e.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(e){return e&&e.removeLayer(this),this},getPane:function(e){return this._map.getPane(e?this.options[e]||e:this.options.pane)},addInteractiveTarget:function(e){return this._map._targets[o(e)]=this,this},removeInteractiveTarget:function(e){return delete this._map._targets[o(e)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(e){var t=e.target;if(t.hasLayer(this)){if(this._map=t,this._zoomAnimated=t._zoomAnimated,this.getEvents){var n=this.getEvents();t.on(n,this),this.once(`remove`,function(){t.off(n,this)},this)}this.onAdd(t),this.fire(`add`),t.fire(`layeradd`,{layer:this})}}});X.include({addLayer:function(e){if(!e._layerAdd)throw Error(`The provided object is not a Layer.`);var t=o(e);return this._layers[t]||(this._layers[t]=e,e._mapToAdd=this,e.beforeAdd&&e.beforeAdd(this),this.whenReady(e._layerAdd,e)),this},removeLayer:function(e){var t=o(e);return this._layers[t]&&(this._loaded&&e.onRemove(this),delete this._layers[t],this._loaded&&(this.fire(`layerremove`,{layer:e}),e.fire(`remove`)),e._map=e._mapToAdd=null),this},hasLayer:function(e){return o(e)in this._layers},eachLayer:function(e,t){for(var n in this._layers)e.call(t,this._layers[n]);return this},_addLayers:function(e){e=e?_(e)?e:[e]:[];for(var t=0,n=e.length;t<n;t++)this.addLayer(e[t])},_addZoomLimit:function(e){(!isNaN(e.options.maxZoom)||!isNaN(e.options.minZoom))&&(this._zoomBoundLayers[o(e)]=e,this._updateZoomLevels())},_removeZoomLimit:function(e){var t=o(e);this._zoomBoundLayers[t]&&(delete this._zoomBoundLayers[t],this._updateZoomLevels())},_updateZoomLevels:function(){var e=1/0,t=-1/0,n=this._getZoomSpan();for(var r in this._zoomBoundLayers){var i=this._zoomBoundLayers[r].options;e=i.minZoom===void 0?e:Math.min(e,i.minZoom),t=i.maxZoom===void 0?t:Math.max(t,i.maxZoom)}this._layersMaxZoom=t===-1/0?void 0:t,this._layersMinZoom=e===1/0?void 0:e,n!==this._getZoomSpan()&&this.fire(`zoomlevelschange`),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Jn=qn.extend({initialize:function(e,t){p(this,t),this._layers={};var n,r;if(e)for(n=0,r=e.length;n<r;n++)this.addLayer(e[n])},addLayer:function(e){var t=this.getLayerId(e);return this._layers[t]=e,this._map&&this._map.addLayer(e),this},removeLayer:function(e){var t=e in this._layers?e:this.getLayerId(e);return this._map&&this._layers[t]&&this._map.removeLayer(this._layers[t]),delete this._layers[t],this},hasLayer:function(e){return(typeof e==`number`?e:this.getLayerId(e))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(e){var t=Array.prototype.slice.call(arguments,1),n,r;for(n in this._layers)r=this._layers[n],r[e]&&r[e].apply(r,t);return this},onAdd:function(e){this.eachLayer(e.addLayer,e)},onRemove:function(e){this.eachLayer(e.removeLayer,e)},eachLayer:function(e,t){for(var n in this._layers)e.call(t,this._layers[n]);return this},getLayer:function(e){return this._layers[e]},getLayers:function(){var e=[];return this.eachLayer(e.push,e),e},setZIndex:function(e){return this.invoke(`setZIndex`,e)},getLayerId:function(e){return o(e)}}),Yn=function(e,t){return new Jn(e,t)},Xn=Jn.extend({addLayer:function(e){return this.hasLayer(e)?this:(e.addEventParent(this),Jn.prototype.addLayer.call(this,e),this.fire(`layeradd`,{layer:e}))},removeLayer:function(e){return this.hasLayer(e)?(e in this._layers&&(e=this._layers[e]),e.removeEventParent(this),Jn.prototype.removeLayer.call(this,e),this.fire(`layerremove`,{layer:e})):this},setStyle:function(e){return this.invoke(`setStyle`,e)},bringToFront:function(){return this.invoke(`bringToFront`)},bringToBack:function(){return this.invoke(`bringToBack`)},getBounds:function(){var e=new te;for(var t in this._layers){var n=this._layers[t];e.extend(n.getBounds?n.getBounds():n.getLatLng())}return e}}),Zn=function(e,t){return new Xn(e,t)},Qn=O.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(e){p(this,e)},createIcon:function(e){return this._createIcon(`icon`,e)},createShadow:function(e){return this._createIcon(`shadow`,e)},_createIcon:function(e,t){var n=this._getIconUrl(e);if(!n){if(e===`icon`)throw Error(`iconUrl not set in Icon options (see the docs).`);return null}var r=this._createImg(n,t&&t.tagName===`IMG`?t:null);return this._setIconStyles(r,e),(this.options.crossOrigin||this.options.crossOrigin===``)&&(r.crossOrigin=this.options.crossOrigin===!0?``:this.options.crossOrigin),r},_setIconStyles:function(e,t){var n=this.options,r=n[t+`Size`];typeof r==`number`&&(r=[r,r]);var i=N(r),a=N(t===`shadow`&&n.shadowAnchor||n.iconAnchor||i&&i.divideBy(2,!0));e.className=`leaflet-marker-`+t+` `+(n.className||``),a&&(e.style.marginLeft=-a.x+`px`,e.style.marginTop=-a.y+`px`),i&&(e.style.width=i.x+`px`,e.style.height=i.y+`px`)},_createImg:function(e,t){return t||=document.createElement(`img`),t.src=e,t},_getIconUrl:function(e){return W.retina&&this.options[e+`RetinaUrl`]||this.options[e+`Url`]}});function $n(e){return new Qn(e)}var er=Qn.extend({options:{iconUrl:`marker-icon.png`,iconRetinaUrl:`marker-icon-2x.png`,shadowUrl:`marker-shadow.png`,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(e){return typeof er.imagePath!=`string`&&(er.imagePath=this._detectIconPath()),(this.options.imagePath||er.imagePath)+Qn.prototype._getIconUrl.call(this,e)},_stripUrl:function(e){var t=function(e,t,n){var r=t.exec(e);return r&&r[n]};return e=t(e,/^url\((['"])?(.+)\1\)$/,2),e&&t(e,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var e=G(`div`,`leaflet-default-icon-path`,document.body),t=gt(e,`background-image`)||gt(e,`backgroundImage`);if(document.body.removeChild(e),t=this._stripUrl(t),t)return t;var n=document.querySelector(`link[href$="leaflet.css"]`);return n?n.href.substring(0,n.href.length-11-1):``}}),tr=_n.extend({initialize:function(e){this._marker=e},addHooks:function(){var e=this._marker._icon;this._draggable||=new bn(e,e,!0),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),q(e,`leaflet-marker-draggable`)},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&xt(this._marker._icon,`leaflet-marker-draggable`)},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(e){var t=this._marker,n=t._map,r=this._marker.options.autoPanSpeed,i=this._marker.options.autoPanPadding,a=kt(t._icon),o=n.getPixelBounds(),s=n.getPixelOrigin(),c=F(o.min._subtract(s).add(i),o.max._subtract(s).subtract(i));if(!c.contains(a)){var l=N((Math.max(c.max.x,a.x)-c.max.x)/(o.max.x-c.max.x)-(Math.min(c.min.x,a.x)-c.min.x)/(o.min.x-c.min.x),(Math.max(c.max.y,a.y)-c.max.y)/(o.max.y-c.max.y)-(Math.min(c.min.y,a.y)-c.min.y)/(o.min.y-c.min.y)).multiplyBy(r);n.panBy(l,{animate:!1}),this._draggable._newPos._add(l),this._draggable._startPos._add(l),Ot(t._icon,this._draggable._newPos),this._onDrag(e),this._panRequest=T(this._adjustPan.bind(this,e))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire(`movestart`).fire(`dragstart`)},_onPreDrag:function(e){this._marker.options.autoPan&&(E(this._panRequest),this._panRequest=T(this._adjustPan.bind(this,e)))},_onDrag:function(e){var t=this._marker,n=t._shadow,r=kt(t._icon),i=t._map.layerPointToLatLng(r);n&&Ot(n,r),t._latlng=i,e.latlng=i,e.oldLatLng=this._oldLatLng,t.fire(`move`,e).fire(`drag`,e)},_onDragEnd:function(e){E(this._panRequest),delete this._oldLatLng,this._marker.fire(`moveend`).fire(`dragend`,e)}}),nr=qn.extend({options:{icon:new er,interactive:!0,keyboard:!0,title:``,alt:`Marker`,zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:`markerPane`,shadowPane:`shadowPane`,bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(e,t){p(this,t),this._latlng=z(e)},onAdd:function(e){this._zoomAnimated=this._zoomAnimated&&e.options.markerZoomAnimation,this._zoomAnimated&&e.on(`zoomanim`,this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(e){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&e.off(`zoomanim`,this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(e){var t=this._latlng;return this._latlng=z(e),this.update(),this.fire(`move`,{oldLatLng:t,latlng:this._latlng})},setZIndexOffset:function(e){return this.options.zIndexOffset=e,this.update()},getIcon:function(){return this.options.icon},setIcon:function(e){return this.options.icon=e,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var e=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(e)}return this},_initIcon:function(){var e=this.options,t=`leaflet-zoom-`+(this._zoomAnimated?`animated`:`hide`),n=e.icon.createIcon(this._icon),r=!1;n!==this._icon&&(this._icon&&this._removeIcon(),r=!0,e.title&&(n.title=e.title),n.tagName===`IMG`&&(n.alt=e.alt||``)),q(n,t),e.keyboard&&(n.tabIndex=`0`,n.setAttribute(`role`,`button`)),this._icon=n,e.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&J(n,`focus`,this._panOnFocus,this);var i=e.icon.createShadow(this._shadow),a=!1;i!==this._shadow&&(this._removeShadow(),a=!0),i&&(q(i,t),i.alt=``),this._shadow=i,e.opacity<1&&this._updateOpacity(),r&&this.getPane().appendChild(this._icon),this._initInteraction(),i&&a&&this.getPane(e.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Y(this._icon,`focus`,this._panOnFocus,this),K(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&K(this._shadow),this._shadow=null},_setPos:function(e){this._icon&&Ot(this._icon,e),this._shadow&&Ot(this._shadow,e),this._zIndex=e.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(e){this._icon&&(this._icon.style.zIndex=this._zIndex+e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center).round();this._setPos(t)},_initInteraction:function(){if(this.options.interactive&&(q(this._icon,`leaflet-interactive`),this.addInteractiveTarget(this._icon),tr)){var e=this.options.draggable;this.dragging&&(e=this.dragging.enabled(),this.dragging.disable()),this.dragging=new tr(this),e&&this.dragging.enable()}},setOpacity:function(e){return this.options.opacity=e,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var e=this.options.opacity;this._icon&&wt(this._icon,e),this._shadow&&wt(this._shadow,e)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var e=this._map;if(e){var t=this.options.icon.options,n=t.iconSize?N(t.iconSize):N(0,0),r=t.iconAnchor?N(t.iconAnchor):N(0,0);e.panInside(this._latlng,{paddingTopLeft:r,paddingBottomRight:n.subtract(r)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function rr(e,t){return new nr(e,t)}var ir=qn.extend({options:{stroke:!0,color:`#3388ff`,weight:3,opacity:1,lineCap:`round`,lineJoin:`round`,dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:`evenodd`,interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(e){this._renderer=e.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(e){return p(this,e),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&e&&Object.prototype.hasOwnProperty.call(e,`weight`)&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),ar=ir.extend({options:{fill:!0,radius:10},initialize:function(e,t){p(this,t),this._latlng=z(e),this._radius=this.options.radius},setLatLng:function(e){var t=this._latlng;return this._latlng=z(e),this.redraw(),this.fire(`move`,{oldLatLng:t,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(e){return this.options.radius=this._radius=e,this.redraw()},getRadius:function(){return this._radius},setStyle:function(e){var t=e&&e.radius||this._radius;return ir.prototype.setStyle.call(this,e),this.setRadius(t),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var e=this._radius,t=this._radiusY||e,n=this._clickTolerance(),r=[e+n,t+n];this._pxBounds=new P(this._point.subtract(r),this._point.add(r))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(e){return e.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function or(e,t){return new ar(e,t)}var sr=ar.extend({initialize:function(e,t,r){if(typeof t==`number`&&(t=n({},r,{radius:t})),p(this,t),this._latlng=z(e),isNaN(this.options.radius))throw Error(`Circle radius cannot be NaN`);this._mRadius=this.options.radius},setRadius:function(e){return this._mRadius=e,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var e=[this._radius,this._radiusY||this._radius];return new te(this._map.layerPointToLatLng(this._point.subtract(e)),this._map.layerPointToLatLng(this._point.add(e)))},setStyle:ir.prototype.setStyle,_project:function(){var e=this._latlng.lng,t=this._latlng.lat,n=this._map,r=n.options.crs;if(r.distance===V.distance){var i=Math.PI/180,a=this._mRadius/V.R/i,o=n.project([t+a,e]),s=n.project([t-a,e]),c=o.add(s).divideBy(2),l=n.unproject(c).lat,u=Math.acos((Math.cos(a*i)-Math.sin(t*i)*Math.sin(l*i))/(Math.cos(t*i)*Math.cos(l*i)))/i;(isNaN(u)||u===0)&&(u=a/Math.cos(Math.PI/180*t)),this._point=c.subtract(n.getPixelOrigin()),this._radius=isNaN(u)?0:c.x-n.project([l,e-u]).x,this._radiusY=c.y-o.y}else{var d=r.unproject(r.project(this._latlng).subtract([this._mRadius,0]));this._point=n.latLngToLayerPoint(this._latlng),this._radius=this._point.x-n.latLngToLayerPoint(d).x}this._updateBounds()}});function cr(e,t,n){return new sr(e,t,n)}var lr=ir.extend({options:{smoothFactor:1,noClip:!1},initialize:function(e,t){p(this,t),this._setLatLngs(e)},getLatLngs:function(){return this._latlngs},setLatLngs:function(e){return this._setLatLngs(e),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(e){for(var t=1/0,n=null,r=In,i,a,o=0,s=this._parts.length;o<s;o++)for(var c=this._parts[o],l=1,u=c.length;l<u;l++){i=c[l-1],a=c[l];var d=r(e,i,a,!0);d<t&&(t=d,n=r(e,i,a))}return n&&(n.distance=Math.sqrt(t)),n},getCenter:function(){if(!this._map)throw Error(`Must add layer to map before using getCenter()`);return zn(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(e,t){return t||=this._defaultShape(),e=z(e),t.push(e),this._bounds.extend(e),this.redraw()},_setLatLngs:function(e){this._bounds=new te,this._latlngs=this._convertLatLngs(e)},_defaultShape:function(){return Ln(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(e){for(var t=[],n=Ln(e),r=0,i=e.length;r<i;r++)n?(t[r]=z(e[r]),this._bounds.extend(t[r])):t[r]=this._convertLatLngs(e[r]);return t},_project:function(){var e=new P;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,e),this._bounds.isValid()&&e.isValid()&&(this._rawPxBounds=e,this._updateBounds())},_updateBounds:function(){var e=this._clickTolerance(),t=new M(e,e);this._rawPxBounds&&(this._pxBounds=new P([this._rawPxBounds.min.subtract(t),this._rawPxBounds.max.add(t)]))},_projectLatlngs:function(e,t,n){var r=e[0]instanceof R,i=e.length,a,o;if(r){for(o=[],a=0;a<i;a++)o[a]=this._map.latLngToLayerPoint(e[a]),n.extend(o[a]);t.push(o)}else for(a=0;a<i;a++)this._projectLatlngs(e[a],t,n)},_clipPoints:function(){var e=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(e)){if(this.options.noClip)this._parts=this._rings;else for(var t=this._parts,n=0,r,i=0,a=this._rings.length,o,s,c;n<a;n++)for(c=this._rings[n],r=0,o=c.length;r<o-1;r++)s=Mn(c[r],c[r+1],e,r,!0),s&&(t[i]=t[i]||[],t[i].push(s[0]),(s[1]!==c[r+1]||r===o-2)&&(t[i].push(s[1]),i++))}},_simplifyPoints:function(){for(var e=this._parts,t=this.options.smoothFactor,n=0,r=e.length;n<r;n++)e[n]=Tn(e[n],t)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(e,t){var n,r,i,a,o,s,c=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(n=0,a=this._parts.length;n<a;n++)for(s=this._parts[n],r=0,o=s.length,i=o-1;r<o;i=r++)if((t||r!==0)&&En(e,s[i],s[r])<=c)return!0;return!1}});function ur(e,t){return new lr(e,t)}lr._flat=Rn;var dr=lr.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw Error(`Must add layer to map before using getCenter()`);return Sn(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(e){var t=lr.prototype._convertLatLngs.call(this,e),n=t.length;return n>=2&&t[0]instanceof R&&t[0].equals(t[n-1])&&t.pop(),t},_setLatLngs:function(e){lr.prototype._setLatLngs.call(this,e),Ln(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Ln(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var e=this._renderer._bounds,t=this.options.weight,n=new M(t,t);if(e=new P(e.min.subtract(n),e.max.add(n)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(e)){if(this.options.noClip)this._parts=this._rings;else for(var r=0,i=this._rings.length,a;r<i;r++)a=xn(this._rings[r],e,!0),a.length&&this._parts.push(a)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(e){var t=!1,n,r,i,a,o,s,c,l;if(!this._pxBounds||!this._pxBounds.contains(e))return!1;for(a=0,c=this._parts.length;a<c;a++)for(n=this._parts[a],o=0,l=n.length,s=l-1;o<l;s=o++)r=n[o],i=n[s],r.y>e.y!=i.y>e.y&&e.x<(i.x-r.x)*(e.y-r.y)/(i.y-r.y)+r.x&&(t=!t);return t||lr.prototype._containsPoint.call(this,e,!0)}});function fr(e,t){return new dr(e,t)}var pr=Xn.extend({initialize:function(e,t){p(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t=_(e)?e:e.features,n,r,i;if(t){for(n=0,r=t.length;n<r;n++)i=t[n],(i.geometries||i.geometry||i.features||i.coordinates)&&this.addData(i);return this}var a=this.options;if(a.filter&&!a.filter(e))return this;var o=mr(e,a);return o?(o.feature=xr(e),o.defaultOptions=o.options,this.resetStyle(o),a.onEachFeature&&a.onEachFeature(e,o),this.addLayer(o)):this},resetStyle:function(e){return e===void 0?this.eachLayer(this.resetStyle,this):(e.options=n({},e.defaultOptions),this._setLayerStyle(e,this.options.style),this)},setStyle:function(e){return this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(e,t){e.setStyle&&(typeof t==`function`&&(t=t(e.feature)),e.setStyle(t))}});function mr(e,t){var n=e.type===`Feature`?e.geometry:e,r=n?n.coordinates:null,i=[],a=t&&t.pointToLayer,o=t&&t.coordsToLatLng||gr,s,c,l,u;if(!r&&!n)return null;switch(n.type){case`Point`:return s=o(r),hr(a,e,s,t);case`MultiPoint`:for(l=0,u=r.length;l<u;l++)s=o(r[l]),i.push(hr(a,e,s,t));return new Xn(i);case`LineString`:case`MultiLineString`:return c=_r(r,n.type===`LineString`?0:1,o),new lr(c,t);case`Polygon`:case`MultiPolygon`:return c=_r(r,n.type===`Polygon`?1:2,o),new dr(c,t);case`GeometryCollection`:for(l=0,u=n.geometries.length;l<u;l++){var d=mr({geometry:n.geometries[l],type:`Feature`,properties:e.properties},t);d&&i.push(d)}return new Xn(i);case`FeatureCollection`:for(l=0,u=n.features.length;l<u;l++){var f=mr(n.features[l],t);f&&i.push(f)}return new Xn(i);default:throw Error(`Invalid GeoJSON object.`)}}function hr(e,t,n,r){return e?e(t,n):new nr(n,r&&r.markersInheritOptions&&r)}function gr(e){return new R(e[1],e[0],e[2])}function _r(e,t,n){for(var r=[],i=0,a=e.length,o;i<a;i++)o=t?_r(e[i],t-1,n):(n||gr)(e[i]),r.push(o);return r}function vr(e,t){return e=z(e),e.alt===void 0?[u(e.lng,t),u(e.lat,t)]:[u(e.lng,t),u(e.lat,t),u(e.alt,t)]}function yr(e,t,n,r){for(var i=[],a=0,o=e.length;a<o;a++)i.push(t?yr(e[a],Ln(e[a])?0:t-1,n,r):vr(e[a],r));return!t&&n&&i.length>0&&i.push(i[0].slice()),i}function br(e,t){return e.feature?n({},e.feature,{geometry:t}):xr(t)}function xr(e){return e.type===`Feature`||e.type===`FeatureCollection`?e:{type:`Feature`,properties:{},geometry:e}}var Sr={toGeoJSON:function(e){return br(this,{type:`Point`,coordinates:vr(this.getLatLng(),e)})}};nr.include(Sr),sr.include(Sr),ar.include(Sr),lr.include({toGeoJSON:function(e){var t=!Ln(this._latlngs),n=yr(this._latlngs,+!!t,!1,e);return br(this,{type:(t?`Multi`:``)+`LineString`,coordinates:n})}}),dr.include({toGeoJSON:function(e){var t=!Ln(this._latlngs),n=t&&!Ln(this._latlngs[0]),r=yr(this._latlngs,n?2:+!!t,!0,e);return t||(r=[r]),br(this,{type:(n?`Multi`:``)+`Polygon`,coordinates:r})}}),Jn.include({toMultiPoint:function(e){var t=[];return this.eachLayer(function(n){t.push(n.toGeoJSON(e).geometry.coordinates)}),br(this,{type:`MultiPoint`,coordinates:t})},toGeoJSON:function(e){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(t===`MultiPoint`)return this.toMultiPoint(e);var n=t===`GeometryCollection`,r=[];return this.eachLayer(function(t){if(t.toGeoJSON){var i=t.toGeoJSON(e);if(n)r.push(i.geometry);else{var a=xr(i);a.type===`FeatureCollection`?r.push.apply(r,a.features):r.push(a)}}}),n?br(this,{geometries:r,type:`GeometryCollection`}):{type:`FeatureCollection`,features:r}}});function Cr(e,t){return new pr(e,t)}var wr=Cr,Tr=qn.extend({options:{opacity:1,alt:``,interactive:!1,crossOrigin:!1,errorOverlayUrl:``,zIndex:1,className:``},initialize:function(e,t,n){this._url=e,this._bounds=I(t),p(this,n)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(q(this._image,`leaflet-interactive`),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){K(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(e){return this.options.opacity=e,this._image&&this._updateOpacity(),this},setStyle:function(e){return e.opacity&&this.setOpacity(e.opacity),this},bringToFront:function(){return this._map&&vt(this._image),this},bringToBack:function(){return this._map&&yt(this._image),this},setUrl:function(e){return this._url=e,this._image&&(this._image.src=e),this},setBounds:function(e){return this._bounds=I(e),this._map&&this._reset(),this},getEvents:function(){var e={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var e=this._url.tagName===`IMG`,t=this._image=e?this._url:G(`img`);q(t,`leaflet-image-layer`),this._zoomAnimated&&q(t,`leaflet-zoom-animated`),this.options.className&&q(t,this.options.className),t.onselectstart=l,t.onmousemove=l,t.onload=i(this.fire,this,`load`),t.onerror=i(this._overlayOnError,this,`error`),(this.options.crossOrigin||this.options.crossOrigin===``)&&(t.crossOrigin=this.options.crossOrigin===!0?``:this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),e?this._url=t.src:(t.src=this._url,t.alt=this.options.alt)},_animateZoom:function(e){var t=this._map.getZoomScale(e.zoom),n=this._map._latLngBoundsToNewLayerBounds(this._bounds,e.zoom,e.center).min;Dt(this._image,n,t)},_reset:function(){var e=this._image,t=new P(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),n=t.getSize();Ot(e,t.min),e.style.width=n.x+`px`,e.style.height=n.y+`px`},_updateOpacity:function(){wt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire(`error`);var e=this.options.errorOverlayUrl;e&&this._url!==e&&(this._url=e,this._image.src=e)},getCenter:function(){return this._bounds.getCenter()}}),Er=function(e,t,n){return new Tr(e,t,n)},Dr=Tr.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var e=this._url.tagName===`VIDEO`,t=this._image=e?this._url:G(`video`);if(q(t,`leaflet-image-layer`),this._zoomAnimated&&q(t,`leaflet-zoom-animated`),this.options.className&&q(t,this.options.className),t.onselectstart=l,t.onmousemove=l,t.onloadeddata=i(this.fire,this,`load`),e){for(var n=t.getElementsByTagName(`source`),r=[],a=0;a<n.length;a++)r.push(n[a].src);this._url=n.length>0?r:[t.src]}else{_(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(t.style,`objectFit`)&&(t.style.objectFit=`fill`),t.autoplay=!!this.options.autoplay,t.loop=!!this.options.loop,t.muted=!!this.options.muted,t.playsInline=!!this.options.playsInline;for(var o=0;o<this._url.length;o++){var s=G(`source`);s.src=this._url[o],t.appendChild(s)}}}});function Or(e,t,n){return new Dr(e,t,n)}var kr=Tr.extend({_initImage:function(){var e=this._image=this._url;q(e,`leaflet-image-layer`),this._zoomAnimated&&q(e,`leaflet-zoom-animated`),this.options.className&&q(e,this.options.className),e.onselectstart=l,e.onmousemove=l}});function Ar(e,t,n){return new kr(e,t,n)}var jr=qn.extend({options:{interactive:!1,offset:[0,0],className:``,pane:void 0,content:``},initialize:function(e,t){e&&(e instanceof R||_(e))?(this._latlng=z(e),p(this,t)):(p(this,e),this._source=t),this.options.content&&(this._content=this.options.content)},openOn:function(e){return e=arguments.length?e:this._source._map,e.hasLayer(this)||e.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(e){return this._map?this.close():(arguments.length?this._source=e:e=this._source,this._prepareOpen(),this.openOn(e._map)),this},onAdd:function(e){this._zoomAnimated=e._zoomAnimated,this._container||this._initLayout(),e._fadeAnimated&&wt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),e._fadeAnimated&&wt(this._container,1),this.bringToFront(),this.options.interactive&&(q(this._container,`leaflet-interactive`),this.addInteractiveTarget(this._container))},onRemove:function(e){e._fadeAnimated?(wt(this._container,0),this._removeTimeout=setTimeout(i(K,void 0,this._container),200)):K(this._container),this.options.interactive&&(xt(this._container,`leaflet-interactive`),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(e){return this._latlng=z(e),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(e){return this._content=e,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility=`hidden`,this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility=``,this._adjustPan())},getEvents:function(){var e={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&vt(this._container),this},bringToBack:function(){return this._map&&yt(this._container),this},_prepareOpen:function(e){var t=this._source;if(!t._map)return!1;if(t instanceof Xn){t=null;var n=this._source._layers;for(var r in n)if(n[r]._map){t=n[r];break}if(!t)return!1;this._source=t}if(!e){if(t.getCenter)e=t.getCenter();else if(t.getLatLng)e=t.getLatLng();else if(t.getBounds)e=t.getBounds().getCenter();else throw Error(`Unable to get source layer LatLng.`)}return this.setLatLng(e),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var e=this._contentNode,t=typeof this._content==`function`?this._content(this._source||this):this._content;if(typeof t==`string`)e.innerHTML=t;else{for(;e.hasChildNodes();)e.removeChild(e.firstChild);e.appendChild(t)}this.fire(`contentupdate`)}},_updatePosition:function(){if(this._map){var e=this._map.latLngToLayerPoint(this._latlng),t=N(this.options.offset),n=this._getAnchor();this._zoomAnimated?Ot(this._container,e.add(n)):t=t.add(e).add(n);var r=this._containerBottom=-t.y,i=this._containerLeft=-Math.round(this._containerWidth/2)+t.x;this._container.style.bottom=r+`px`,this._container.style.left=i+`px`}},_getAnchor:function(){return[0,0]}});X.include({_initOverlay:function(e,t,n,r){var i=t;return i instanceof e||(i=new e(r).setContent(t)),n&&i.setLatLng(n),i}}),qn.include({_initOverlay:function(e,t,n,r){var i=n;return i instanceof e?(p(i,r),i._source=this):(i=t&&!r?t:new e(r,this),i.setContent(n)),i}});var Mr=jr.extend({options:{pane:`popupPane`,offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:``},openOn:function(e){return e=arguments.length?e:this._source._map,!e.hasLayer(this)&&e._popup&&e._popup.options.autoClose&&e.removeLayer(e._popup),e._popup=this,jr.prototype.openOn.call(this,e)},onAdd:function(e){jr.prototype.onAdd.call(this,e),e.fire(`popupopen`,{popup:this}),this._source&&(this._source.fire(`popupopen`,{popup:this},!0),this._source instanceof ir||this._source.on(`preclick`,Jt))},onRemove:function(e){jr.prototype.onRemove.call(this,e),e.fire(`popupclose`,{popup:this}),this._source&&(this._source.fire(`popupclose`,{popup:this},!0),this._source instanceof ir||this._source.off(`preclick`,Jt))},getEvents:function(){var e=jr.prototype.getEvents.call(this);return(this.options.closeOnClick===void 0?this._map.options.closePopupOnClick:this.options.closeOnClick)&&(e.preclick=this.close),this.options.keepInView&&(e.moveend=this._adjustPan),e},_initLayout:function(){var e=`leaflet-popup`,t=this._container=G(`div`,e+` `+(this.options.className||``)+` leaflet-zoom-animated`),n=this._wrapper=G(`div`,e+`-content-wrapper`,t);if(this._contentNode=G(`div`,e+`-content`,n),Xt(t),Yt(this._contentNode),J(t,`contextmenu`,Jt),this._tipContainer=G(`div`,e+`-tip-container`,t),this._tip=G(`div`,e+`-tip`,this._tipContainer),this.options.closeButton){var r=this._closeButton=G(`a`,e+`-close-button`,t);r.setAttribute(`role`,`button`),r.setAttribute(`aria-label`,`Close popup`),r.href=`#close`,r.innerHTML=`<span aria-hidden="true">&#215;</span>`,J(r,`click`,function(e){Zt(e),this.close()},this)}},_updateLayout:function(){var e=this._contentNode,t=e.style;t.width=``,t.whiteSpace=`nowrap`;var n=e.offsetWidth;n=Math.min(n,this.options.maxWidth),n=Math.max(n,this.options.minWidth),t.width=n+1+`px`,t.whiteSpace=``,t.height=``;var r=e.offsetHeight,i=this.options.maxHeight,a=`leaflet-popup-scrolled`;i&&r>i?(t.height=i+`px`,q(e,a)):xt(e,a),this._containerWidth=this._container.offsetWidth},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center),n=this._getAnchor();Ot(this._container,t.add(n))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning)this._autopanning=!1;else{var e=this._map,t=parseInt(gt(this._container,`marginBottom`),10)||0,n=this._container.offsetHeight+t,r=this._containerWidth,i=new M(this._containerLeft,-n-this._containerBottom);i._add(kt(this._container));var a=e.layerPointToContainerPoint(i),o=N(this.options.autoPanPadding),s=N(this.options.autoPanPaddingTopLeft||o),c=N(this.options.autoPanPaddingBottomRight||o),l=e.getSize(),u=0,d=0;a.x+r+c.x>l.x&&(u=a.x+r-l.x+c.x),a.x-u-s.x<0&&(u=a.x-s.x),a.y+n+c.y>l.y&&(d=a.y+n-l.y+c.y),a.y-d-s.y<0&&(d=a.y-s.y),(u||d)&&(this.options.keepInView&&(this._autopanning=!0),e.fire(`autopanstart`).panBy([u,d]))}}},_getAnchor:function(){return N(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Nr=function(e,t){return new Mr(e,t)};X.mergeOptions({closePopupOnClick:!0}),X.include({openPopup:function(e,t,n){return this._initOverlay(Mr,e,t,n).openOn(this),this},closePopup:function(e){return e=arguments.length?e:this._popup,e&&e.close(),this}}),qn.include({bindPopup:function(e,t){return this._popup=this._initOverlay(Mr,this._popup,e,t),this._popupHandlersAdded||=(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),!0),this},unbindPopup:function(){return this._popup&&=(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,null),this},openPopup:function(e){return this._popup&&(this instanceof Xn||(this._popup._source=this),this._popup._prepareOpen(e||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(e){return this._popup&&this._popup.setContent(e),this},getPopup:function(){return this._popup},_openPopup:function(e){if(this._popup&&this._map){Qt(e);var t=e.layer||e.target;this._popup._source===t&&!(t instanceof ir)?this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(e.latlng):(this._popup._source=t,this.openPopup(e.latlng))}},_movePopup:function(e){this._popup.setLatLng(e.latlng)},_onKeyPress:function(e){e.originalEvent.keyCode===13&&this._openPopup(e)}});var Pr=jr.extend({options:{pane:`tooltipPane`,offset:[0,0],direction:`auto`,permanent:!1,sticky:!1,opacity:.9},onAdd:function(e){jr.prototype.onAdd.call(this,e),this.setOpacity(this.options.opacity),e.fire(`tooltipopen`,{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire(`tooltipopen`,{tooltip:this},!0))},onRemove:function(e){jr.prototype.onRemove.call(this,e),e.fire(`tooltipclose`,{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire(`tooltipclose`,{tooltip:this},!0))},getEvents:function(){var e=jr.prototype.getEvents.call(this);return this.options.permanent||(e.preclick=this.close),e},_initLayout:function(){var e=`leaflet-tooltip `+(this.options.className||``)+` leaflet-zoom-`+(this._zoomAnimated?`animated`:`hide`);this._contentNode=this._container=G(`div`,e),this._container.setAttribute(`role`,`tooltip`),this._container.setAttribute(`id`,`leaflet-tooltip-`+o(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(e){var t,n,r=this._map,i=this._container,a=r.latLngToContainerPoint(r.getCenter()),o=r.layerPointToContainerPoint(e),s=this.options.direction,c=i.offsetWidth,l=i.offsetHeight,u=N(this.options.offset),d=this._getAnchor();s===`top`?(t=c/2,n=l):s===`bottom`?(t=c/2,n=0):s===`center`?(t=c/2,n=l/2):s===`right`?(t=0,n=l/2):s===`left`?(t=c,n=l/2):o.x<a.x?(s=`right`,t=0,n=l/2):(s=`left`,t=c+(u.x+d.x)*2,n=l/2),e=e.subtract(N(t,n,!0)).add(u).add(d),xt(i,`leaflet-tooltip-right`),xt(i,`leaflet-tooltip-left`),xt(i,`leaflet-tooltip-top`),xt(i,`leaflet-tooltip-bottom`),q(i,`leaflet-tooltip-`+s),Ot(i,e)},_updatePosition:function(){var e=this._map.latLngToLayerPoint(this._latlng);this._setPosition(e)},setOpacity:function(e){this.options.opacity=e,this._container&&wt(this._container,e)},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);this._setPosition(t)},_getAnchor:function(){return N(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Fr=function(e,t){return new Pr(e,t)};X.include({openTooltip:function(e,t,n){return this._initOverlay(Pr,e,t,n).openOn(this),this},closeTooltip:function(e){return e.close(),this}}),qn.include({bindTooltip:function(e,t){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Pr,this._tooltip,e,t),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&=(this._initTooltipInteractions(!0),this.closeTooltip(),null),this},_initTooltipInteractions:function(e){if(e||!this._tooltipHandlersAdded){var t=e?`off`:`on`,n={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?n.add=this._openTooltip:(n.mouseover=this._openTooltip,n.mouseout=this.closeTooltip,n.click=this._openTooltip,this._map?this._addFocusListeners():n.add=this._addFocusListeners),this._tooltip.options.sticky&&(n.mousemove=this._moveTooltip),this[t](n),this._tooltipHandlersAdded=!e}},openTooltip:function(e){return this._tooltip&&(this instanceof Xn||(this._tooltip._source=this),this._tooltip._prepareOpen(e)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(e){return this._tooltip&&this._tooltip.setContent(e),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(e){var t=typeof e.getElement==`function`&&e.getElement();t&&(J(t,`focus`,function(){this._tooltip._source=e,this.openTooltip()},this),J(t,`blur`,this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(e){var t=typeof e.getElement==`function`&&e.getElement();t&&t.setAttribute(`aria-describedby`,this._tooltip._container.id)},_openTooltip:function(e){if(this._tooltip&&this._map){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var t=this;this._map.once(`moveend`,function(){t._openOnceFlag=!1,t._openTooltip(e)})}else this._tooltip._source=e.layer||e.target,this.openTooltip(this._tooltip.options.sticky?e.latlng:void 0)}},_moveTooltip:function(e){var t=e.latlng,n,r;this._tooltip.options.sticky&&e.originalEvent&&(n=this._map.mouseEventToContainerPoint(e.originalEvent),r=this._map.containerPointToLayerPoint(n),t=this._map.layerPointToLatLng(r)),this._tooltip.setLatLng(t)}});var Ir=Qn.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:`leaflet-div-icon`},createIcon:function(e){var t=e&&e.tagName===`DIV`?e:document.createElement(`div`),n=this.options;if(n.html instanceof Element?(_t(t),t.appendChild(n.html)):t.innerHTML=n.html===!1?``:n.html,n.bgPos){var r=N(n.bgPos);t.style.backgroundPosition=-r.x+`px `+-r.y+`px`}return this._setIconStyles(t,`icon`),t},createShadow:function(){return null}});function Lr(e){return new Ir(e)}Qn.Default=er;var Rr=qn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:W.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:`tilePane`,className:``,keepBuffer:2},initialize:function(e){p(this,e)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(e){e._addZoomLimit(this)},onRemove:function(e){this._removeAllTiles(),K(this._container),e._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(vt(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(yt(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(e){return this.options.opacity=e,this._updateOpacity(),this},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var e=this._clampZoom(this._map.getZoom());e!==this._tileZoom&&(this._tileZoom=e,this._updateLevels()),this._update()}return this},getEvents:function(){var e={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||=s(this._onMoveEnd,this.options.updateInterval,this),e.move=this._onMove),this._zoomAnimated&&(e.zoomanim=this._animateZoom),e},createTile:function(){return document.createElement(`div`)},getTileSize:function(){var e=this.options.tileSize;return e instanceof M?e:new M(e,e)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(e){for(var t=this.getPane().children,n=-e(-1/0,1/0),r=0,i=t.length,a;r<i;r++)a=t[r].style.zIndex,t[r]!==this._container&&a&&(n=e(n,+a));isFinite(n)&&(this.options.zIndex=n+e(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!W.ielt9){wt(this._container,this.options.opacity);var e=+new Date,t=!1,n=!1;for(var r in this._tiles){var i=this._tiles[r];if(i.current&&i.loaded){var a=Math.min(1,(e-i.loaded)/200);wt(i.el,a),a<1?t=!0:(i.active?n=!0:this._onOpaqueTile(i),i.active=!0)}}n&&!this._noPrune&&this._pruneTiles(),t&&(E(this._fadeFrame),this._fadeFrame=T(this._updateOpacity,this))}},_onOpaqueTile:l,_initContainer:function(){this._container||(this._container=G(`div`,`leaflet-layer `+(this.options.className||``)),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var e=this._tileZoom,t=this.options.maxZoom;if(e!==void 0){for(var n in this._levels)n=Number(n),this._levels[n].el.children.length||n===e?(this._levels[n].el.style.zIndex=t-Math.abs(e-n),this._onUpdateLevel(n)):(K(this._levels[n].el),this._removeTilesAtZoom(n),this._onRemoveLevel(n),delete this._levels[n]);var r=this._levels[e],i=this._map;return r||(r=this._levels[e]={},r.el=G(`div`,`leaflet-tile-container leaflet-zoom-animated`,this._container),r.el.style.zIndex=t,r.origin=i.project(i.unproject(i.getPixelOrigin()),e).round(),r.zoom=e,this._setZoomTransform(r,i.getCenter(),i.getZoom()),r.el.offsetWidth,this._onCreateLevel(r)),this._level=r,r}},_onUpdateLevel:l,_onRemoveLevel:l,_onCreateLevel:l,_pruneTiles:function(){if(this._map){var e,t,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom)this._removeAllTiles();else{for(e in this._tiles)t=this._tiles[e],t.retain=t.current;for(e in this._tiles)if(t=this._tiles[e],t.current&&!t.active){var r=t.coords;this._retainParent(r.x,r.y,r.z,r.z-5)||this._retainChildren(r.x,r.y,r.z,r.z+2)}for(e in this._tiles)this._tiles[e].retain||this._removeTile(e)}}},_removeTilesAtZoom:function(e){for(var t in this._tiles)this._tiles[t].coords.z===e&&this._removeTile(t)},_removeAllTiles:function(){for(var e in this._tiles)this._removeTile(e)},_invalidateAll:function(){for(var e in this._levels)K(this._levels[e].el),this._onRemoveLevel(Number(e)),delete this._levels[e];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(e,t,n,r){var i=Math.floor(e/2),a=Math.floor(t/2),o=n-1,s=new M(+i,+a);s.z=+o;var c=this._tileCoordsToKey(s),l=this._tiles[c];return l&&l.active?(l.retain=!0,!0):(l&&l.loaded&&(l.retain=!0),o>r&&this._retainParent(i,a,o,r))},_retainChildren:function(e,t,n,r){for(var i=2*e;i<2*e+2;i++)for(var a=2*t;a<2*t+2;a++){var o=new M(i,a);o.z=n+1;var s=this._tileCoordsToKey(o),c=this._tiles[s];c&&c.active?c.retain=!0:(c&&c.loaded&&(c.retain=!0),n+1<r&&this._retainChildren(i,a,n+1,r))}},_resetView:function(e){var t=e&&(e.pinch||e.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),t,t)},_animateZoom:function(e){this._setView(e.center,e.zoom,!0,e.noUpdate)},_clampZoom:function(e){var t=this.options;return t.minNativeZoom!==void 0&&e<t.minNativeZoom?t.minNativeZoom:t.maxNativeZoom!==void 0&&t.maxNativeZoom<e?t.maxNativeZoom:e},_setView:function(e,t,n,r){var i=Math.round(t);i=this.options.maxZoom!==void 0&&i>this.options.maxZoom||this.options.minZoom!==void 0&&i<this.options.minZoom?void 0:this._clampZoom(i);var a=this.options.updateWhenZooming&&i!==this._tileZoom;(!r||a)&&(this._tileZoom=i,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),i!==void 0&&this._update(e),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(e,t)},_setZoomTransforms:function(e,t){for(var n in this._levels)this._setZoomTransform(this._levels[n],e,t)},_setZoomTransform:function(e,t,n){var r=this._map.getZoomScale(n,e.zoom),i=e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t,n)).round();W.any3d?Dt(e.el,i,r):Ot(e.el,i)},_resetGrid:function(){var e=this._map,t=e.options.crs,n=this._tileSize=this.getTileSize(),r=this._tileZoom,i=this._map.getPixelWorldBounds(this._tileZoom);i&&(this._globalTileRange=this._pxBoundsToTileRange(i)),this._wrapX=t.wrapLng&&!this.options.noWrap&&[Math.floor(e.project([0,t.wrapLng[0]],r).x/n.x),Math.ceil(e.project([0,t.wrapLng[1]],r).x/n.y)],this._wrapY=t.wrapLat&&!this.options.noWrap&&[Math.floor(e.project([t.wrapLat[0],0],r).y/n.x),Math.ceil(e.project([t.wrapLat[1],0],r).y/n.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(e){var t=this._map,n=t._animatingZoom?Math.max(t._animateToZoom,t.getZoom()):t.getZoom(),r=t.getZoomScale(n,this._tileZoom),i=t.project(e,this._tileZoom).floor(),a=t.getSize().divideBy(r*2);return new P(i.subtract(a),i.add(a))},_update:function(e){var t=this._map;if(t){var n=this._clampZoom(t.getZoom());if(e===void 0&&(e=t.getCenter()),this._tileZoom!==void 0){var r=this._getTiledPixelBounds(e),i=this._pxBoundsToTileRange(r),a=i.getCenter(),o=[],s=this.options.keepBuffer,c=new P(i.getBottomLeft().subtract([s,-s]),i.getTopRight().add([s,-s]));if(!(isFinite(i.min.x)&&isFinite(i.min.y)&&isFinite(i.max.x)&&isFinite(i.max.y)))throw Error(`Attempted to load an infinite number of tiles`);for(var l in this._tiles){var u=this._tiles[l].coords;(u.z!==this._tileZoom||!c.contains(new M(u.x,u.y)))&&(this._tiles[l].current=!1)}if(Math.abs(n-this._tileZoom)>1)this._setView(e,n);else{for(var d=i.min.y;d<=i.max.y;d++)for(var f=i.min.x;f<=i.max.x;f++){var p=new M(f,d);if(p.z=this._tileZoom,this._isValidTile(p)){var m=this._tiles[this._tileCoordsToKey(p)];m?m.current=!0:o.push(p)}}if(o.sort(function(e,t){return e.distanceTo(a)-t.distanceTo(a)}),o.length!==0){this._loading||(this._loading=!0,this.fire(`loading`));var h=document.createDocumentFragment();for(f=0;f<o.length;f++)this._addTile(o[f],h);this._level.el.appendChild(h)}}}}},_isValidTile:function(e){var t=this._map.options.crs;if(!t.infinite){var n=this._globalTileRange;if(!t.wrapLng&&(e.x<n.min.x||e.x>n.max.x)||!t.wrapLat&&(e.y<n.min.y||e.y>n.max.y))return!1}if(!this.options.bounds)return!0;var r=this._tileCoordsToBounds(e);return I(this.options.bounds).overlaps(r)},_keyToBounds:function(e){return this._tileCoordsToBounds(this._keyToTileCoords(e))},_tileCoordsToNwSe:function(e){var t=this._map,n=this.getTileSize(),r=e.scaleBy(n),i=r.add(n);return[t.unproject(r,e.z),t.unproject(i,e.z)]},_tileCoordsToBounds:function(e){var t=this._tileCoordsToNwSe(e),n=new te(t[0],t[1]);return this.options.noWrap||(n=this._map.wrapLatLngBounds(n)),n},_tileCoordsToKey:function(e){return e.x+`:`+e.y+`:`+e.z},_keyToTileCoords:function(e){var t=e.split(`:`),n=new M(+t[0],+t[1]);return n.z=+t[2],n},_removeTile:function(e){var t=this._tiles[e];t&&(K(t.el),delete this._tiles[e],this.fire(`tileunload`,{tile:t.el,coords:this._keyToTileCoords(e)}))},_initTile:function(e){q(e,`leaflet-tile`);var t=this.getTileSize();e.style.width=t.x+`px`,e.style.height=t.y+`px`,e.onselectstart=l,e.onmousemove=l,W.ielt9&&this.options.opacity<1&&wt(e,this.options.opacity)},_addTile:function(e,t){var n=this._getTilePos(e),r=this._tileCoordsToKey(e),a=this.createTile(this._wrapCoords(e),i(this._tileReady,this,e));this._initTile(a),this.createTile.length<2&&T(i(this._tileReady,this,e,null,a)),Ot(a,n),this._tiles[r]={el:a,coords:e,current:!0},t.appendChild(a),this.fire(`tileloadstart`,{tile:a,coords:e})},_tileReady:function(e,t,n){t&&this.fire(`tileerror`,{error:t,tile:n,coords:e});var r=this._tileCoordsToKey(e);n=this._tiles[r],n&&(n.loaded=+new Date,this._map._fadeAnimated?(wt(n.el,0),E(this._fadeFrame),this._fadeFrame=T(this._updateOpacity,this)):(n.active=!0,this._pruneTiles()),t||(q(n.el,`leaflet-tile-loaded`),this.fire(`tileload`,{tile:n.el,coords:e})),this._noTilesToLoad()&&(this._loading=!1,this.fire(`load`),W.ielt9||!this._map._fadeAnimated?T(this._pruneTiles,this):setTimeout(i(this._pruneTiles,this),250)))},_getTilePos:function(e){return e.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(e){var t=new M(this._wrapX?c(e.x,this._wrapX):e.x,this._wrapY?c(e.y,this._wrapY):e.y);return t.z=e.z,t},_pxBoundsToTileRange:function(e){var t=this.getTileSize();return new P(e.min.unscaleBy(t).floor(),e.max.unscaleBy(t).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var e in this._tiles)if(!this._tiles[e].loaded)return!1;return!0}});function zr(e){return new Rr(e)}var Br=Rr.extend({options:{minZoom:0,maxZoom:18,subdomains:`abc`,errorTileUrl:``,zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(e,t){this._url=e,t=p(this,t),t.detectRetina&&W.retina&&t.maxZoom>0?(t.tileSize=Math.floor(t.tileSize/2),t.zoomReverse?(t.zoomOffset--,t.minZoom=Math.min(t.maxZoom,t.minZoom+1)):(t.zoomOffset++,t.maxZoom=Math.max(t.minZoom,t.maxZoom-1)),t.minZoom=Math.max(0,t.minZoom)):t.zoomReverse?t.minZoom=Math.min(t.maxZoom,t.minZoom):t.maxZoom=Math.max(t.minZoom,t.maxZoom),typeof t.subdomains==`string`&&(t.subdomains=t.subdomains.split(``)),this.on(`tileunload`,this._onTileRemove)},setUrl:function(e,t){return this._url===e&&t===void 0&&(t=!0),this._url=e,t||this.redraw(),this},createTile:function(e,t){var n=document.createElement(`img`);return J(n,`load`,i(this._tileOnLoad,this,t,n)),J(n,`error`,i(this._tileOnError,this,t,n)),(this.options.crossOrigin||this.options.crossOrigin===``)&&(n.crossOrigin=this.options.crossOrigin===!0?``:this.options.crossOrigin),typeof this.options.referrerPolicy==`string`&&(n.referrerPolicy=this.options.referrerPolicy),n.alt=``,n.src=this.getTileUrl(e),n},getTileUrl:function(e){var t={r:W.retina?`@2x`:``,s:this._getSubdomain(e),x:e.x,y:e.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var r=this._globalTileRange.max.y-e.y;this.options.tms&&(t.y=r),t[`-y`]=r}return g(this._url,n(t,this.options))},_tileOnLoad:function(e,t){W.ielt9?setTimeout(i(e,this,null,t),0):e(null,t)},_tileOnError:function(e,t,n){var r=this.options.errorTileUrl;r&&t.getAttribute(`src`)!==r&&(t.src=r),e(n,t)},_onTileRemove:function(e){e.tile.onload=null},_getZoomForUrl:function(){var e=this._tileZoom,t=this.options.maxZoom,n=this.options.zoomReverse,r=this.options.zoomOffset;return n&&(e=t-e),e+r},_getSubdomain:function(e){var t=Math.abs(e.x+e.y)%this.options.subdomains.length;return this.options.subdomains[t]},_abortLoading:function(){var e,t;for(e in this._tiles)if(this._tiles[e].coords.z!==this._tileZoom&&(t=this._tiles[e].el,t.onload=l,t.onerror=l,!t.complete)){t.src=y;var n=this._tiles[e].coords;K(t),delete this._tiles[e],this.fire(`tileabort`,{tile:t,coords:n})}},_removeTile:function(e){var t=this._tiles[e];if(t)return t.el.setAttribute(`src`,y),Rr.prototype._removeTile.call(this,e)},_tileReady:function(e,t,n){if(!(!this._map||n&&n.getAttribute(`src`)===y))return Rr.prototype._tileReady.call(this,e,t,n)}});function Vr(e,t){return new Br(e,t)}var Hr=Br.extend({defaultWmsParams:{service:`WMS`,request:`GetMap`,layers:``,styles:``,format:`image/jpeg`,transparent:!1,version:`1.1.1`},options:{crs:null,uppercase:!1},initialize:function(e,t){this._url=e;var r=n({},this.defaultWmsParams);for(var i in t)i in this.options||(r[i]=t[i]);t=p(this,t);var a=t.detectRetina&&W.retina?2:1,o=this.getTileSize();r.width=o.x*a,r.height=o.y*a,this.wmsParams=r},onAdd:function(e){this._crs=this.options.crs||e.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var t=this._wmsVersion>=1.3?`crs`:`srs`;this.wmsParams[t]=this._crs.code,Br.prototype.onAdd.call(this,e)},getTileUrl:function(e){var t=this._tileCoordsToNwSe(e),n=this._crs,r=F(n.project(t[0]),n.project(t[1])),i=r.min,a=r.max,o=(this._wmsVersion>=1.3&&this._crs===Gn?[i.y,i.x,a.y,a.x]:[i.x,i.y,a.x,a.y]).join(`,`),s=Br.prototype.getTileUrl.call(this,e);return s+m(this.wmsParams,s,this.options.uppercase)+(this.options.uppercase?`&BBOX=`:`&bbox=`)+o},setParams:function(e,t){return n(this.wmsParams,e),t||this.redraw(),this}});function Ur(e,t){return new Hr(e,t)}Br.WMS=Hr,Vr.wms=Ur;var Wr=qn.extend({options:{padding:.1},initialize:function(e){p(this,e),o(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),q(this._container,`leaflet-zoom-animated`)),this.getPane().appendChild(this._container),this._update(),this.on(`update`,this._updatePaths,this)},onRemove:function(){this.off(`update`,this._updatePaths,this),this._destroyContainer()},getEvents:function(){var e={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(e.zoomanim=this._onAnimZoom),e},_onAnimZoom:function(e){this._updateTransform(e.center,e.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(e,t){var n=this._map.getZoomScale(t,this._zoom),r=this._map.getSize().multiplyBy(.5+this.options.padding),i=this._map.project(this._center,t),a=r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e,t));W.any3d?Dt(this._container,a,n):Ot(this._container,a)},_reset:function(){for(var e in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[e]._reset()},_onZoomEnd:function(){for(var e in this._layers)this._layers[e]._project()},_updatePaths:function(){for(var e in this._layers)this._layers[e]._update()},_update:function(){var e=this.options.padding,t=this._map.getSize(),n=this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();this._bounds=new P(n,n.add(t.multiplyBy(1+e*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Gr=Wr.extend({options:{tolerance:0},getEvents:function(){var e=Wr.prototype.getEvents.call(this);return e.viewprereset=this._onViewPreReset,e},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Wr.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var e=this._container=document.createElement(`canvas`);J(e,`mousemove`,this._onMouseMove,this),J(e,`click dblclick mousedown mouseup contextmenu`,this._onClick,this),J(e,`mouseout`,this._handleMouseOut,this),e._leaflet_disable_events=!0,this._ctx=e.getContext(`2d`)},_destroyContainer:function(){E(this._redrawRequest),delete this._ctx,K(this._container),Y(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var e;for(var t in this._redrawBounds=null,this._layers)e=this._layers[t],e._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Wr.prototype._update.call(this);var e=this._bounds,t=this._container,n=e.getSize(),r=W.retina?2:1;Ot(t,e.min),t.width=r*n.x,t.height=r*n.y,t.style.width=n.x+`px`,t.style.height=n.y+`px`,W.retina&&this._ctx.scale(2,2),this._ctx.translate(-e.min.x,-e.min.y),this.fire(`update`)}},_reset:function(){Wr.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(e){this._updateDashArray(e),this._layers[o(e)]=e;var t=e._order={layer:e,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=t),this._drawLast=t,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(e){this._requestRedraw(e)},_removePath:function(e){var t=e._order,n=t.next,r=t.prev;n?n.prev=r:this._drawLast=r,r?r.next=n:this._drawFirst=n,delete e._order,delete this._layers[o(e)],this._requestRedraw(e)},_updatePath:function(e){this._extendRedrawBounds(e),e._project(),e._update(),this._requestRedraw(e)},_updateStyle:function(e){this._updateDashArray(e),this._requestRedraw(e)},_updateDashArray:function(e){if(typeof e.options.dashArray==`string`){for(var t=e.options.dashArray.split(/[, ]+/),n=[],r,i=0;i<t.length;i++){if(r=Number(t[i]),isNaN(r))return;n.push(r)}e.options._dashArray=n}else e.options._dashArray=e.options.dashArray},_requestRedraw:function(e){this._map&&(this._extendRedrawBounds(e),this._redrawRequest=this._redrawRequest||T(this._redraw,this))},_extendRedrawBounds:function(e){if(e._pxBounds){var t=(e.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new P,this._redrawBounds.extend(e._pxBounds.min.subtract([t,t])),this._redrawBounds.extend(e._pxBounds.max.add([t,t]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var e=this._redrawBounds;if(e){var t=e.getSize();this._ctx.clearRect(e.min.x,e.min.y,t.x,t.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var e,t=this._redrawBounds;if(this._ctx.save(),t){var n=t.getSize();this._ctx.beginPath(),this._ctx.rect(t.min.x,t.min.y,n.x,n.y),this._ctx.clip()}this._drawing=!0;for(var r=this._drawFirst;r;r=r.next)e=r.layer,(!t||e._pxBounds&&e._pxBounds.intersects(t))&&e._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(e,t){if(this._drawing){var n,r,i,a,o=e._parts,s=o.length,c=this._ctx;if(s){for(c.beginPath(),n=0;n<s;n++){for(r=0,i=o[n].length;r<i;r++)a=o[n][r],c[r?`lineTo`:`moveTo`](a.x,a.y);t&&c.closePath()}this._fillStroke(c,e)}}},_updateCircle:function(e){if(this._drawing&&!e._empty()){var t=e._point,n=this._ctx,r=Math.max(Math.round(e._radius),1),i=(Math.max(Math.round(e._radiusY),1)||r)/r;i!==1&&(n.save(),n.scale(1,i)),n.beginPath(),n.arc(t.x,t.y/i,r,0,Math.PI*2,!1),i!==1&&n.restore(),this._fillStroke(n,e)}},_fillStroke:function(e,t){var n=t.options;n.fill&&(e.globalAlpha=n.fillOpacity,e.fillStyle=n.fillColor||n.color,e.fill(n.fillRule||`evenodd`)),n.stroke&&n.weight!==0&&(e.setLineDash&&e.setLineDash(t.options&&t.options._dashArray||[]),e.globalAlpha=n.opacity,e.lineWidth=n.weight,e.strokeStyle=n.color,e.lineCap=n.lineCap,e.lineJoin=n.lineJoin,e.stroke())},_onClick:function(e){for(var t=this._map.mouseEventToLayerPoint(e),n,r,i=this._drawFirst;i;i=i.next)n=i.layer,n.options.interactive&&n._containsPoint(t)&&(e.type!==`click`&&e.type!==`preclick`||!this._map._draggableMoved(n))&&(r=n);this._fireEvent(r?[r]:!1,e)},_onMouseMove:function(e){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var t=this._map.mouseEventToLayerPoint(e);this._handleMouseHover(e,t)}},_handleMouseOut:function(e){var t=this._hoveredLayer;t&&(xt(this._container,`leaflet-interactive`),this._fireEvent([t],e,`mouseout`),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(e,t){if(!this._mouseHoverThrottled){for(var n,r,a=this._drawFirst;a;a=a.next)n=a.layer,n.options.interactive&&n._containsPoint(t)&&(r=n);r!==this._hoveredLayer&&(this._handleMouseOut(e),r&&(q(this._container,`leaflet-interactive`),this._fireEvent([r],e,`mouseover`),this._hoveredLayer=r)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,e),this._mouseHoverThrottled=!0,setTimeout(i(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(e,t,n){this._map._fireDOMEvent(t,n||t.type,e)},_bringToFront:function(e){var t=e._order;if(t){var n=t.next,r=t.prev;if(n)n.prev=r;else return;r?r.next=n:n&&(this._drawFirst=n),t.prev=this._drawLast,this._drawLast.next=t,t.next=null,this._drawLast=t,this._requestRedraw(e)}},_bringToBack:function(e){var t=e._order;if(t){var n=t.next,r=t.prev;if(r)r.next=n;else return;n?n.prev=r:r&&(this._drawLast=r),t.prev=null,t.next=this._drawFirst,this._drawFirst.prev=t,this._drawFirst=t,this._requestRedraw(e)}}});function Kr(e){return W.canvas?new Gr(e):null}var qr=(function(){try{return document.namespaces.add(`lvml`,`urn:schemas-microsoft-com:vml`),function(e){return document.createElement(`<lvml:`+e+` class="lvml">`)}}catch{}return function(e){return document.createElement(`<`+e+` xmlns="urn:schemas-microsoft.com:vml" class="lvml">`)}})(),Jr={_initContainer:function(){this._container=G(`div`,`leaflet-vml-container`)},_update:function(){this._map._animatingZoom||(Wr.prototype._update.call(this),this.fire(`update`))},_initPath:function(e){var t=e._container=qr(`shape`);q(t,`leaflet-vml-shape `+(this.options.className||``)),t.coordsize=`1 1`,e._path=qr(`path`),t.appendChild(e._path),this._updateStyle(e),this._layers[o(e)]=e},_addPath:function(e){var t=e._container;this._container.appendChild(t),e.options.interactive&&e.addInteractiveTarget(t)},_removePath:function(e){var t=e._container;K(t),e.removeInteractiveTarget(t),delete this._layers[o(e)]},_updateStyle:function(e){var t=e._stroke,n=e._fill,r=e.options,i=e._container;i.stroked=!!r.stroke,i.filled=!!r.fill,r.stroke?(t||=e._stroke=qr(`stroke`),i.appendChild(t),t.weight=r.weight+`px`,t.color=r.color,t.opacity=r.opacity,r.dashArray?t.dashStyle=_(r.dashArray)?r.dashArray.join(` `):r.dashArray.replace(/( *, *)/g,` `):t.dashStyle=``,t.endcap=r.lineCap.replace(`butt`,`flat`),t.joinstyle=r.lineJoin):t&&(i.removeChild(t),e._stroke=null),r.fill?(n||=e._fill=qr(`fill`),i.appendChild(n),n.color=r.fillColor||r.color,n.opacity=r.fillOpacity):n&&(i.removeChild(n),e._fill=null)},_updateCircle:function(e){var t=e._point.round(),n=Math.round(e._radius),r=Math.round(e._radiusY||n);this._setPath(e,e._empty()?`M0 0`:`AL `+t.x+`,`+t.y+` `+n+`,`+r+` 0,23592600`)},_setPath:function(e,t){e._path.v=t},_bringToFront:function(e){vt(e._container)},_bringToBack:function(e){yt(e._container)}},Yr=W.vml?qr:oe,Xr=Wr.extend({_initContainer:function(){this._container=Yr(`svg`),this._container.setAttribute(`pointer-events`,`none`),this._rootGroup=Yr(`g`),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){K(this._container),Y(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Wr.prototype._update.call(this);var e=this._bounds,t=e.getSize(),n=this._container;(!this._svgSize||!this._svgSize.equals(t))&&(this._svgSize=t,n.setAttribute(`width`,t.x),n.setAttribute(`height`,t.y)),Ot(n,e.min),n.setAttribute(`viewBox`,[e.min.x,e.min.y,t.x,t.y].join(` `)),this.fire(`update`)}},_initPath:function(e){var t=e._path=Yr(`path`);e.options.className&&q(t,e.options.className),e.options.interactive&&q(t,`leaflet-interactive`),this._updateStyle(e),this._layers[o(e)]=e},_addPath:function(e){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(e._path),e.addInteractiveTarget(e._path)},_removePath:function(e){K(e._path),e.removeInteractiveTarget(e._path),delete this._layers[o(e)]},_updatePath:function(e){e._project(),e._update()},_updateStyle:function(e){var t=e._path,n=e.options;t&&(n.stroke?(t.setAttribute(`stroke`,n.color),t.setAttribute(`stroke-opacity`,n.opacity),t.setAttribute(`stroke-width`,n.weight),t.setAttribute(`stroke-linecap`,n.lineCap),t.setAttribute(`stroke-linejoin`,n.lineJoin),n.dashArray?t.setAttribute(`stroke-dasharray`,n.dashArray):t.removeAttribute(`stroke-dasharray`),n.dashOffset?t.setAttribute(`stroke-dashoffset`,n.dashOffset):t.removeAttribute(`stroke-dashoffset`)):t.setAttribute(`stroke`,`none`),n.fill?(t.setAttribute(`fill`,n.fillColor||n.color),t.setAttribute(`fill-opacity`,n.fillOpacity),t.setAttribute(`fill-rule`,n.fillRule||`evenodd`)):t.setAttribute(`fill`,`none`))},_updatePoly:function(e,t){this._setPath(e,se(e._parts,t))},_updateCircle:function(e){var t=e._point,n=Math.max(Math.round(e._radius),1),r=Math.max(Math.round(e._radiusY),1)||n,i=`a`+n+`,`+r+` 0 1,0 `,a=e._empty()?`M0 0`:`M`+(t.x-n)+`,`+t.y+i+n*2+`,0 `+i+-n*2+`,0 `;this._setPath(e,a)},_setPath:function(e,t){e._path.setAttribute(`d`,t)},_bringToFront:function(e){vt(e._path)},_bringToBack:function(e){yt(e._path)}});W.vml&&Xr.include(Jr);function Zr(e){return W.svg||W.vml?new Xr(e):null}X.include({getRenderer:function(e){var t=e.options.renderer||this._getPaneRenderer(e.options.pane)||this.options.renderer||this._renderer;return t||=this._renderer=this._createRenderer(),this.hasLayer(t)||this.addLayer(t),t},_getPaneRenderer:function(e){if(e===`overlayPane`||e===void 0)return!1;var t=this._paneRenderers[e];return t===void 0&&(t=this._createRenderer({pane:e}),this._paneRenderers[e]=t),t},_createRenderer:function(e){return this.options.preferCanvas&&Kr(e)||Zr(e)}});var Qr=dr.extend({initialize:function(e,t){dr.prototype.initialize.call(this,this._boundsToLatLngs(e),t)},setBounds:function(e){return this.setLatLngs(this._boundsToLatLngs(e))},_boundsToLatLngs:function(e){return e=I(e),[e.getSouthWest(),e.getNorthWest(),e.getNorthEast(),e.getSouthEast()]}});function $r(e,t){return new Qr(e,t)}Xr.create=Yr,Xr.pointsToPath=se,pr.geometryToLayer=mr,pr.coordsToLatLng=gr,pr.coordsToLatLngs=_r,pr.latLngToCoords=vr,pr.latLngsToCoords=yr,pr.getFeature=br,pr.asFeature=xr,X.mergeOptions({boxZoom:!0});var ei=_n.extend({initialize:function(e){this._map=e,this._container=e._container,this._pane=e._panes.overlayPane,this._resetStateTimeout=0,e.on(`unload`,this._destroy,this)},addHooks:function(){J(this._container,`mousedown`,this._onMouseDown,this)},removeHooks:function(){Y(this._container,`mousedown`,this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){K(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(e){if(!e.shiftKey||e.which!==1&&e.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),At(),Pt(),this._startPoint=this._map.mouseEventToContainerPoint(e),J(document,{contextmenu:Qt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(e){this._moved||(this._moved=!0,this._box=G(`div`,`leaflet-zoom-box`,this._container),q(this._container,`leaflet-crosshair`),this._map.fire(`boxzoomstart`)),this._point=this._map.mouseEventToContainerPoint(e);var t=new P(this._point,this._startPoint),n=t.getSize();Ot(this._box,t.min),this._box.style.width=n.x+`px`,this._box.style.height=n.y+`px`},_finish:function(){this._moved&&(K(this._box),xt(this._container,`leaflet-crosshair`)),jt(),Ft(),Y(document,{contextmenu:Qt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(e){if((e.which===1||e.button===1)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(i(this._resetState,this),0);var t=new te(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(t).fire(`boxzoomend`,{boxZoomBounds:t})}},_onKeyDown:function(e){e.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});X.addInitHook(`addHandler`,`boxZoom`,ei),X.mergeOptions({doubleClickZoom:!0});var ti=_n.extend({addHooks:function(){this._map.on(`dblclick`,this._onDoubleClick,this)},removeHooks:function(){this._map.off(`dblclick`,this._onDoubleClick,this)},_onDoubleClick:function(e){var t=this._map,n=t.getZoom(),r=t.options.zoomDelta,i=e.originalEvent.shiftKey?n-r:n+r;t.options.doubleClickZoom===`center`?t.setZoom(i):t.setZoomAround(e.containerPoint,i)}});X.addInitHook(`addHandler`,`doubleClickZoom`,ti),X.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var ni=_n.extend({addHooks:function(){if(!this._draggable){var e=this._map;this._draggable=new bn(e._mapPane,e._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on(`predrag`,this._onPreDragLimit,this),e.options.worldCopyJump&&(this._draggable.on(`predrag`,this._onPreDragWrap,this),e.on(`zoomend`,this._onZoomEnd,this),e.whenReady(this._onZoomEnd,this))}q(this._map._container,`leaflet-grab leaflet-touch-drag`),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){xt(this._map._container,`leaflet-grab`),xt(this._map._container,`leaflet-touch-drag`),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var e=this._map;if(e._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var t=I(this._map.options.maxBounds);this._offsetLimit=F(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;e.fire(`movestart`).fire(`dragstart`),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(e){if(this._map.options.inertia){var t=this._lastTime=+new Date,n=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(n),this._times.push(t),this._prunePositions(t)}this._map.fire(`move`,e).fire(`drag`,e)},_prunePositions:function(e){for(;this._positions.length>1&&e-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var e=this._map.getSize().divideBy(2),t=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=t.subtract(e).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(e,t){return e-(e-t)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var e=this._draggable._newPos.subtract(this._draggable._startPos),t=this._offsetLimit;e.x<t.min.x&&(e.x=this._viscousLimit(e.x,t.min.x)),e.y<t.min.y&&(e.y=this._viscousLimit(e.y,t.min.y)),e.x>t.max.x&&(e.x=this._viscousLimit(e.x,t.max.x)),e.y>t.max.y&&(e.y=this._viscousLimit(e.y,t.max.y)),this._draggable._newPos=this._draggable._startPos.add(e)}},_onPreDragWrap:function(){var e=this._worldWidth,t=Math.round(e/2),n=this._initialWorldOffset,r=this._draggable._newPos.x,i=(r-t+n)%e+t-n,a=(r+t+n)%e-t-n,o=Math.abs(i+n)<Math.abs(a+n)?i:a;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=o},_onDragEnd:function(e){var t=this._map,n=t.options,r=!n.inertia||e.noInertia||this._times.length<2;if(t.fire(`dragend`,e),r)t.fire(`moveend`);else{this._prunePositions(+new Date);var i=this._lastPos.subtract(this._positions[0]),a=(this._lastTime-this._times[0])/1e3,o=n.easeLinearity,s=i.multiplyBy(o/a),c=s.distanceTo([0,0]),l=Math.min(n.inertiaMaxSpeed,c),u=s.multiplyBy(l/c),d=l/(n.inertiaDeceleration*o),f=u.multiplyBy(-d/2).round();!f.x&&!f.y?t.fire(`moveend`):(f=t._limitOffset(f,t.options.maxBounds),T(function(){t.panBy(f,{duration:d,easeLinearity:o,noMoveStart:!0,animate:!0})}))}}});X.addInitHook(`addHandler`,`dragging`,ni),X.mergeOptions({keyboard:!0,keyboardPanDelta:80});var ri=_n.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(e){this._map=e,this._setPanDelta(e.options.keyboardPanDelta),this._setZoomDelta(e.options.zoomDelta)},addHooks:function(){var e=this._map._container;e.tabIndex<=0&&(e.tabIndex=`0`),J(e,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Y(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var e=document.body,t=document.documentElement,n=e.scrollTop||t.scrollTop,r=e.scrollLeft||t.scrollLeft;this._map._container.focus(),window.scrollTo(r,n)}},_onFocus:function(){this._focused=!0,this._map.fire(`focus`)},_onBlur:function(){this._focused=!1,this._map.fire(`blur`)},_setPanDelta:function(e){for(var t=this._panKeys={},n=this.keyCodes,r=0,i=n.left.length;r<i;r++)t[n.left[r]]=[-1*e,0];for(r=0,i=n.right.length;r<i;r++)t[n.right[r]]=[e,0];for(r=0,i=n.down.length;r<i;r++)t[n.down[r]]=[0,e];for(r=0,i=n.up.length;r<i;r++)t[n.up[r]]=[0,-1*e]},_setZoomDelta:function(e){for(var t=this._zoomKeys={},n=this.keyCodes,r=0,i=n.zoomIn.length;r<i;r++)t[n.zoomIn[r]]=e;for(r=0,i=n.zoomOut.length;r<i;r++)t[n.zoomOut[r]]=-e},_addHooks:function(){J(document,`keydown`,this._onKeyDown,this)},_removeHooks:function(){Y(document,`keydown`,this._onKeyDown,this)},_onKeyDown:function(e){if(!(e.altKey||e.ctrlKey||e.metaKey)){var t=e.keyCode,n=this._map,r;if(t in this._panKeys){if(!n._panAnim||!n._panAnim._inProgress){if(r=this._panKeys[t],e.shiftKey&&(r=N(r).multiplyBy(3)),n.options.maxBounds&&(r=n._limitOffset(N(r),n.options.maxBounds)),n.options.worldCopyJump){var i=n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));n.panTo(i)}else n.panBy(r)}}else if(t in this._zoomKeys)n.setZoom(n.getZoom()+(e.shiftKey?3:1)*this._zoomKeys[t]);else if(t===27&&n._popup&&n._popup.options.closeOnEscapeKey)n.closePopup();else return;Qt(e)}}});X.addInitHook(`addHandler`,`keyboard`,ri),X.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ii=_n.extend({addHooks:function(){J(this._map._container,`wheel`,this._onWheelScroll,this),this._delta=0},removeHooks:function(){Y(this._map._container,`wheel`,this._onWheelScroll,this)},_onWheelScroll:function(e){var t=nn(e),n=this._map.options.wheelDebounceTime;this._delta+=t,this._lastMousePos=this._map.mouseEventToContainerPoint(e),this._startTime||=+new Date;var r=Math.max(n-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(i(this._performZoom,this),r),Qt(e)},_performZoom:function(){var e=this._map,t=e.getZoom(),n=this._map.options.zoomSnap||0;e._stop();var r=this._delta/(this._map.options.wheelPxPerZoomLevel*4),i=4*Math.log(2/(1+Math.exp(-Math.abs(r))))/Math.LN2,a=n?Math.ceil(i/n)*n:i,o=e._limitZoom(t+(this._delta>0?a:-a))-t;this._delta=0,this._startTime=null,o&&(e.options.scrollWheelZoom===`center`?e.setZoom(t+o):e.setZoomAround(this._lastMousePos,t+o))}});X.addInitHook(`addHandler`,`scrollWheelZoom`,ii);var ai=600;X.mergeOptions({tapHold:W.touchNative&&W.safari&&W.mobile,tapTolerance:15});var oi=_n.extend({addHooks:function(){J(this._map._container,`touchstart`,this._onDown,this)},removeHooks:function(){Y(this._map._container,`touchstart`,this._onDown,this)},_onDown:function(e){if(clearTimeout(this._holdTimeout),e.touches.length===1){var t=e.touches[0];this._startPos=this._newPos=new M(t.clientX,t.clientY),this._holdTimeout=setTimeout(i(function(){this._cancel(),this._isTapValid()&&(J(document,`touchend`,Zt),J(document,`touchend touchcancel`,this._cancelClickPrevent),this._simulateEvent(`contextmenu`,t))},this),ai),J(document,`touchend touchcancel contextmenu`,this._cancel,this),J(document,`touchmove`,this._onMove,this)}},_cancelClickPrevent:function e(){Y(document,`touchend`,Zt),Y(document,`touchend touchcancel`,e)},_cancel:function(){clearTimeout(this._holdTimeout),Y(document,`touchend touchcancel contextmenu`,this._cancel,this),Y(document,`touchmove`,this._onMove,this)},_onMove:function(e){var t=e.touches[0];this._newPos=new M(t.clientX,t.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(e,t){var n=new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window,screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY});n._simulated=!0,t.target.dispatchEvent(n)}});X.addInitHook(`addHandler`,`tapHold`,oi),X.mergeOptions({touchZoom:W.touch,bounceAtZoomLimits:!0});var si=_n.extend({addHooks:function(){q(this._map._container,`leaflet-touch-zoom`),J(this._map._container,`touchstart`,this._onTouchStart,this)},removeHooks:function(){xt(this._map._container,`leaflet-touch-zoom`),Y(this._map._container,`touchstart`,this._onTouchStart,this)},_onTouchStart:function(e){var t=this._map;if(!(!e.touches||e.touches.length!==2||t._animatingZoom||this._zooming)){var n=t.mouseEventToContainerPoint(e.touches[0]),r=t.mouseEventToContainerPoint(e.touches[1]);this._centerPoint=t.getSize()._divideBy(2),this._startLatLng=t.containerPointToLatLng(this._centerPoint),t.options.touchZoom!==`center`&&(this._pinchStartLatLng=t.containerPointToLatLng(n.add(r)._divideBy(2))),this._startDist=n.distanceTo(r),this._startZoom=t.getZoom(),this._moved=!1,this._zooming=!0,t._stop(),J(document,`touchmove`,this._onTouchMove,this),J(document,`touchend touchcancel`,this._onTouchEnd,this),Zt(e)}},_onTouchMove:function(e){if(e.touches&&e.touches.length===2&&this._zooming){var t=this._map,n=t.mouseEventToContainerPoint(e.touches[0]),r=t.mouseEventToContainerPoint(e.touches[1]),a=n.distanceTo(r)/this._startDist;if(this._zoom=t.getScaleZoom(a,this._startZoom),!t.options.bounceAtZoomLimits&&(this._zoom<t.getMinZoom()&&a<1||this._zoom>t.getMaxZoom()&&a>1)&&(this._zoom=t._limitZoom(this._zoom)),t.options.touchZoom===`center`){if(this._center=this._startLatLng,a===1)return}else{var o=n._add(r)._divideBy(2)._subtract(this._centerPoint);if(a===1&&o.x===0&&o.y===0)return;this._center=t.unproject(t.project(this._pinchStartLatLng,this._zoom).subtract(o),this._zoom)}this._moved||=(t._moveStart(!0,!1),!0),E(this._animRequest);var s=i(t._move,t,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=T(s,this,!0),Zt(e)}},_onTouchEnd:function(){!this._moved||!this._zooming?this._zooming=!1:(this._zooming=!1,E(this._animRequest),Y(document,`touchmove`,this._onTouchMove,this),Y(document,`touchend touchcancel`,this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom)))}});X.addInitHook(`addHandler`,`touchZoom`,si),X.BoxZoom=ei,X.DoubleClickZoom=ti,X.Drag=ni,X.Keyboard=ri,X.ScrollWheelZoom=ii,X.TapHold=oi,X.TouchZoom=si,e.Bounds=P,e.Browser=W,e.CRS=B,e.Canvas=Gr,e.Circle=sr,e.CircleMarker=ar,e.Class=O,e.Control=cn,e.DivIcon=Ir,e.DivOverlay=jr,e.DomEvent=an,e.DomUtil=Ht,e.Draggable=bn,e.Evented=j,e.FeatureGroup=Xn,e.GeoJSON=pr,e.GridLayer=Rr,e.Handler=_n,e.Icon=Qn,e.ImageOverlay=Tr,e.LatLng=R,e.LatLngBounds=te,e.Layer=qn,e.LayerGroup=Jn,e.LineUtil=Bn,e.Map=X,e.Marker=nr,e.Mixin=vn,e.Path=ir,e.Point=M,e.PolyUtil=wn,e.Polygon=dr,e.Polyline=lr,e.Popup=Mr,e.PosAnimation=on,e.Projection=Un,e.Rectangle=Qr,e.Renderer=Wr,e.SVG=Xr,e.SVGOverlay=kr,e.TileLayer=Br,e.Tooltip=Pr,e.Transformation=U,e.Util=D,e.VideoOverlay=Dr,e.bind=i,e.bounds=F,e.canvas=Kr,e.circle=cr,e.circleMarker=or,e.control=ln,e.divIcon=Lr,e.extend=n,e.featureGroup=Zn,e.geoJSON=Cr,e.geoJson=wr,e.gridLayer=zr,e.icon=$n,e.imageOverlay=Er,e.latLng=z,e.latLngBounds=I,e.layerGroup=Yn,e.map=sn,e.marker=rr,e.point=N,e.polygon=fr,e.polyline=ur,e.popup=Nr,e.rectangle=$r,e.setOptions=p,e.stamp=o,e.svg=Zr,e.svgOverlay=Ar,e.tileLayer=Vr,e.tooltip=Fr,e.transformation=re,e.version=t,e.videoOverlay=Or;var ci=window.L;e.noConflict=function(){return window.L=ci,this},window.L=e}))}))(),1),bc=null,xc=null,Sc=[],Cc=null;function wc(e,t){if(!document.getElementById(e))return;Cc=t;let{latitude:n,longitude:r}=g.lokasiReferensi;bc=yc.default.map(e,{center:[n,r],zoom:16,zoomControl:!1,attributionControl:!1,dragging:!0,scrollWheelZoom:!0,doubleClickZoom:!1}),yc.default.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,{maxZoom:19}).addTo(bc),yc.default.circleMarker([n,r],{radius:4,fillColor:`#f59e0b`,color:`#ffffff`,weight:1.5,fillOpacity:1}).addTo(bc).bindTooltip(`Patok Referensi Acuan`,{direction:`top`}),h.forEach(e=>{let t=yc.default.circleMarker([e.latitude,e.longitude],{radius:6,fillColor:`#ffffff`,color:`#059669`,weight:2,opacity:1,fillOpacity:.9}).addTo(bc);t.bindTooltip(`Titik ${e.sequence}: ${e.name}`,{direction:`top`,offset:[0,-6],className:`minimap-tooltip`}),t.on(`click`,()=>{typeof Cc==`function`&&Cc(e.id)}),Sc.push({id:e.id,marker:t})});let i=yc.default.divIcon({className:`minimap-user-icon`,html:`
      <div class="user-position-marker">
        <span class="user-radar-wave"></span>
        <span class="user-center-point"></span>
      </div>
    `,iconSize:[22,22],iconAnchor:[11,11]});return xc=yc.default.marker([n,r],{icon:i,zIndexOffset:2e3}).addTo(bc),setTimeout(()=>{bc.invalidateSize(),bc.setView([n,r],16)},300),bc}function Tc(e){if(!bc||!xc)return;let t=h.find(t=>t.id===e);t&&(xc.setLatLng([t.latitude,t.longitude]),bc.panTo([t.latitude,t.longitude]),Sc.forEach(({id:t,marker:n})=>{t===e?n.setStyle({radius:7,fillColor:`#10b981`,color:`#ffffff`,weight:3}):n.setStyle({radius:5,fillColor:`#ffffff`,color:`#059669`,weight:2})}))}function Ec(){bc&&bc.invalidateSize()}var Dc=new Map;function Oc(e,t){if(!document.getElementById(e))return null;if(Dc.has(e)){let t=Dc.get(e);return setTimeout(()=>{t.map.invalidateSize()},100),t.map}let{latitude:n,longitude:r,nama:i}=g.lokasiReferensi,a=yc.default.map(e,{center:[n,r],zoom:17,maxZoom:19,minZoom:13,zoomControl:!0}),o=yc.default.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,{maxZoom:19,attribution:`Citra Satelit &copy; Esri`}),s=yc.default.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap`});o.addTo(a);let c={"🛰️ Citra Satelit":o,"🗺️ Peta Jalan (OSM)":s};yc.default.control.layers(c,null,{position:`topright`}).addTo(a),yc.default.control.scale({imperial:!1,position:`bottomleft`}).addTo(a),kc(a,n,r,i);let l=yc.default.layerGroup().addTo(a);return Ac(l,h,t),Dc.set(e,{map:a,markersLayer:l,onSelectScene:t}),setTimeout(()=>{a.invalidateSize()},250),a}function kc(e,t,n,r){let i=yc.default.divIcon({className:`main-ref-marker-icon`,html:`
      <div class="ref-location-pin" title="Lokasi Referensi Kawasan">
        <span class="ref-pin-core"></span>
        <span class="ref-pin-ring"></span>
      </div>
    `,iconSize:[30,30],iconAnchor:[15,15]});yc.default.marker([t,n],{icon:i,zIndexOffset:1e3}).addTo(e).bindPopup(`
    <div class="location-popup-card">
      <div class="popup-badge ref-badge">📍 Titik Referensi Acuan</div>
      <h4>${r}</h4>
      <p style="font-size: 12px; margin-bottom: 6px;">
        <strong>Koordinat WGS84:</strong><br/>
        Latitude: <code>${t}° N</code><br/>
        Longitude: <code>${n}° E</code>
      </p>
      <p style="font-size: 11px; color: #6b7280; line-height: 1.4;">
        Koordinat ini digunakan sebagai titik acuan lokasi lapangan kawasan penanaman pohon ±2 hektare.
      </p>
    </div>
  `)}function Ac(e,t,n){e&&(e.clearLayers(),t.forEach(t=>{let r=t.status===`tersedia`,i=yc.default.divIcon({className:`scene-marker-icon`,html:`
        <div class="scene-pin-badge ${r?`ready`:`pending`}" title="${t.name}">
          <span>${t.sequence}</span>
        </div>
      `,iconSize:[28,28],iconAnchor:[14,14]}),a=yc.default.marker([t.latitude,t.longitude],{icon:i}).addTo(e);a.bindPopup(`
      <div class="location-popup-card">
        <div class="popup-badge">Titik ${t.sequence}</div>
        <h4>${t.name}</h4>
        <p style="font-size: 12px; color: #4b5563; margin-bottom: 8px;">
          ${t.description}
        </p>
        <div style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">
          Status: <strong>${r?`✓ Foto Tersedia`:`⏳ Belum Tersedia`}</strong>
        </div>
        <button class="btn-popup-explore" data-target="${t.id}">
          🔄 Buka di Virtual Tour 360°
        </button>
      </div>
    `),a.on(`popupopen`,e=>{let r=e.popup.getElement();if(!r)return;let i=r.querySelector(`.btn-popup-explore`);i&&(i.onclick=()=>{typeof n==`function`&&n(t.id)})})}))}function jc(){Dc.forEach(({map:e})=>{e&&setTimeout(()=>{e.invalidateSize(),e.setView([g.lokasiReferensi.latitude,g.lokasiReferensi.longitude],17)},200)})}function Mc(e){return new Promise(t=>{let n=new Image;n.onload=()=>t(!0),n.onerror=()=>t(!1),n.src=e})}function Nc(e){Pc();let t=document.getElementById(`pano`);if(!t)return;let n=document.createElement(`div`);n.className=`empty-state`,n.id=`empty-state`,n.innerHTML=`
    <div class="empty-state-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    </div>
    <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; margin-bottom: 8px;">
      Titik ${e.sequence||`•`} • Status: Menunggu Pengambilan Foto Lapangan
    </div>
    <h3>${e.name}</h3>
    <p>
      Foto panorama 360° lapangan untuk titik ini belum tersedia.<br/>
      Ambil bola panorama menggunakan aplikasi <strong>Go Street View</strong> di HP Android, lalu simpan file di:<br/>
      <code>${e.panorama_path||e.panorama}</code><br/><br/>
      Format didukung: <strong>.jpg</strong>, <strong>.png</strong>, <strong>.webp</strong><br/>
      Rasio aspek wajib: <strong>2:1 (Equirectangular)</strong> • Rekomendasi: <strong>4096×2048 px</strong>
    </p>
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <a href="#beranda" class="btn-primary-action" style="padding: 8px 16px; font-size: 12px; text-decoration: none;">
        🌿 Kembali ke Beranda
      </a>
    </div>
  `,t.appendChild(n)}function Pc(){let e=document.getElementById(`empty-state`);e&&e.remove()}function Fc(e){let t=document.getElementById(`tour-scene-seq`),n=document.getElementById(`tour-scene-name`),r=document.getElementById(`tour-scene-desc`),i=document.getElementById(`tour-scene-gps`);t&&(t.textContent=`Titik ${e.sequence||`•`}`),n&&(n.textContent=e.name||`Virtual Tour 360°`),r&&(r.textContent=e.description||``),i&&e.latitude&&e.longitude&&(i.textContent=`Titik Acuan: ${e.latitude.toFixed(6)}° N, ${e.longitude.toFixed(6)}° E`)}function Ic(e){return new Promise(t=>{let n=[],r=[];[`image/jpeg`,`image/png`,`image/webp`].includes(e.type)||n.push(`Format file "${e.type}" tidak didukung. Gunakan JPG (.jpg), PNG (.png), atau WebP (.webp).`);let i=e.size/1048576;i>25?r.push(`Ukuran file cukup besar (${i.toFixed(1)} MB). Pertimbangkan kompresi ke 4-10 MB untuk kecepatan koneksi seluler Android.`):i<.4&&r.push(`Ukuran file sangat kecil (${i.toFixed(2)} MB). Pastikan resolusi cukup tajam untuk panorama 360°.`);let a=URL.createObjectURL(e),o=new Image;o.onload=()=>{let e=o.naturalWidth,s=o.naturalHeight,c=e/s;Math.abs(c-2)<=.05||n.push(`Rasio aspek gambar adalah ${c.toFixed(2)}:1 (${e}×${s}px). Foto 360° equirectangular WAJIB memiliki rasio 2:1 (lebar tepat 2 kali tinggi). Foto ini kemungkinan adalah foto flat biasa, bukan bola panorama 360°.`),e<2048&&r.push(`Resolusi (${e}×${s}px) di bawah standar rekomendasi minimal 4096×2048px.`),URL.revokeObjectURL(a),t({valid:n.length===0,width:e,height:s,ratio:c,sizeMb:i,errors:n,warnings:r})},o.onerror=()=>{URL.revokeObjectURL(a),n.push(`Gagal membaca data gambar. File mungkin korup atau bukan gambar yang valid.`),t({valid:!1,width:0,height:0,ratio:0,sizeMb:i,errors:n,warnings:r})},o.src=a})}async function Lc(){let e=[];for(let t of h){let n=await Mc(t.panorama);e.push({...t,liveExists:n,effectiveStatus:n?`tersedia`:`belum_tersedia`})}return e}function Rc(e,t){let n=document.getElementById(e);if(!n)return;n.innerHTML=`
    <div class="gsv-guide-wrapper">
      <div class="gsv-header">
        <div class="gsv-badge">📱 Panduan Lapangan Android</div>
        <h2>Integrasi Foto Go Street View ke Virtual Tour</h2>
        <p>
          Langkah demi langkah pengambilan foto bola 360° menggunakan aplikasi <strong>Go Street View</strong> di HP Android,
          verifikasi rasio equirectangular 2:1, dan pemetaan ke titik koordinat kawasan 2 hektare.
        </p>
      </div>

      <!-- Step Cards -->
      <div class="gsv-steps-grid">
        <div class="gsv-step-card">
          <div class="step-num">01</div>
          <h4>Pengambilan Foto di HP Android</h4>
          <p>
            Buka aplikasi Go Street View di titik survei. Berdirilah di satu titik poros dan putar HP mengikuti panduan titik oranye hingga seluruh bola panorama (360° horizontal & 180° vertikal) terhubung.
          </p>
          <div class="step-note">💡 Gunakan monopod atau pegang HP stabil setinggi dada.</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">02</div>
          <h4>Catat Koordinat & Urutan</h4>
          <p>
            Pastikan GPS aktif dengan akurasi tinggi. Cocokkan titik pengambilan dengan salah satu dari <strong>6 Titik Survei</strong> yang telah ditentukan pada tata letak kawasan.
          </p>
          <div class="step-note">📍 Titik 3 adalah patok acuan sentral (5.4818556° N, 95.5840917° E).</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">03</div>
          <h4>Uji Validasi Rasio 2:1</h4>
          <p>
            Gunakan kotak penguji di bawah untuk memeriksa apakah file foto yang diekspor dari HP memiliki rasio equirectangular 2:1 dan siap ditampilkan di Marzipano.
          </p>
          <div class="step-note">🔍 Validasi otomatis mendeteksi dimensi dan format.</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">04</div>
          <h4>Simpan ke Folder Tanpa Mengubah Kode</h4>
          <p>
            Pindahkan file ke folder <code>public/tours/titik-X/panorama.jpg</code>. Aplikasi secara instan mengganti placeholder menjadi panorama 360° aktif.
          </p>
          <div class="step-note">⚡ Tidak perlu kompilasi ulang atau ubah script!</div>
        </div>
      </div>

      <!-- Interactive Validator Dropzone -->
      <div class="gsv-validator-box">
        <h3>🔍 Alat Uji & Validasi Foto Panorama</h3>
        <p>Pilih foto hasil tangkapan Go Street View untuk menguji kompatibilitasnya sebelum dipindahkan ke proyek:</p>

        <div class="dropzone" id="gsv-dropzone">
          <input type="file" id="gsv-file-input" accept="image/jpeg,image/png,image/webp" style="display: none;" />
          <div class="dropzone-inner" id="dropzone-prompt">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p><strong>Klik untuk memilih foto</strong> atau seret file ke sini</p>
            <span style="font-size: 12px; color: #6b7280;">Format: JPG, PNG, WebP (Rasio Wajib 2:1)</span>
          </div>
        </div>

        <div id="gsv-validation-result" class="gsv-result-box hidden"></div>
      </div>

      <!-- Status Matrix Table -->
      <div class="gsv-status-table-box">
        <h3>📊 Matriks Status Panorama Lapangan (6 Titik)</h3>
        <p>Status ketersediaan file panorama aktual pada direktori <code>public/tours/</code>:</p>
        <div class="table-responsive">
          <table class="status-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Titik</th>
                <th>Koordinat GPS</th>
                <th>Koneksi Hotspot</th>
                <th>Lokasi File</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="gsv-matrix-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;let r=n.querySelector(`#gsv-dropzone`),i=n.querySelector(`#gsv-file-input`),a=n.querySelector(`#gsv-validation-result`);r&&i&&(r.addEventListener(`click`,()=>i.click()),r.addEventListener(`dragover`,e=>{e.preventDefault(),r.classList.add(`dragover`)}),r.addEventListener(`dragleave`,()=>{r.classList.remove(`dragover`)}),r.addEventListener(`drop`,e=>{e.preventDefault(),r.classList.remove(`dragover`),e.dataTransfer.files.length>0&&zc(e.dataTransfer.files[0],a)}),i.addEventListener(`change`,e=>{e.target.files.length>0&&zc(e.target.files[0],a)})),Bc()}async function zc(e,t){t.classList.remove(`hidden`),t.innerHTML=`
    <div style="padding: 16px; text-align: center; color: #4b5563;">
      <div class="loading-spinner" style="width: 28px; height: 28px; margin: 0 auto 10px;"></div>
      Menganalisis resolusi, format, dan rasio aspek foto...
    </div>
  `;let n=await Ic(e);t.innerHTML=n.valid?`
      <div class="alert-box success">
        <div class="alert-icon">✓</div>
        <div class="alert-content">
          <h4>Foto Valid Equirectangular 360°!</h4>
          <p>
            Dimensi: <strong>${n.width} × ${n.height} px</strong> (Rasio <strong>${n.ratio.toFixed(2)}:1</strong>)<br/>
            Ukuran Berkas: <strong>${n.sizeMb.toFixed(2)} MB</strong> (${e.type})
          </p>
          <div style="margin-top: 10px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 6px;">
            <strong>Langkah Selanjutnya:</strong><br/>
            1. Tentukan untuk titik mana foto ini diambil (misal: Titik 1).<br/>
            2. Ganti nama file menjadi <code>panorama.jpg</code>.<br/>
            3. Simpan di: <code>public/tours/titik-X/panorama.jpg</code>.
          </div>
        </div>
      </div>
    `:`
      <div class="alert-box error">
        <div class="alert-icon">✕</div>
        <div class="alert-content">
          <h4>Foto Tidak Memenuhi Standar Panorama 360°</h4>
          <ul style="margin: 8px 0 8px 16px; font-size: 13px;">
            ${n.errors.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
          <p style="font-size: 12px; color: #6b7280;">
            Solusi: Pastikan foto diambil dalam mode 360° Sphere pada aplikasi Go Street View, bukan foto panorama panorama horizontal biasa.
          </p>
        </div>
      </div>
    `}async function Bc(){let e=document.getElementById(`gsv-matrix-body`);e&&(e.innerHTML=(await Lc()).map(e=>{let t=e.liveExists;return`
        <tr>
          <td style="font-weight: 700; color: #10b981;">#${e.sequence}</td>
          <td><strong>${e.name}</strong></td>
          <td style="font-family: monospace; font-size: 12px;">${e.latitude.toFixed(6)}°, ${e.longitude.toFixed(6)}°</td>
          <td><span style="font-size: 12px; color: #6b7280;">Terhubung ke: ${e.connected_points?.join(`, `)||e.hotspots?.filter(e=>e.type===`link`).map(e=>e.target).join(`, `)||`-`}</span></td>
          <td><code style="font-size: 11px;">${e.panorama_path}</code></td>
          <td>
            <span class="status-pill ${t?`ready`:`pending`}">
              ${t?`✓ Tersedia`:`⏳ Belum Tersedia`}
            </span>
          </td>
        </tr>
      `}).join(``))}var Vc=`vtour_admin_token`,Hc=`vtour_admin_user`,Z={getToken(){return sessionStorage.getItem(Vc)||localStorage.getItem(Vc)||``},setSession(e,t){sessionStorage.setItem(Vc,e),localStorage.setItem(Vc,e),t&&(sessionStorage.setItem(Hc,JSON.stringify(t)),localStorage.setItem(Hc,JSON.stringify(t)))},clearSession(){sessionStorage.removeItem(Vc),sessionStorage.removeItem(Hc),localStorage.removeItem(Vc),localStorage.removeItem(Hc)},getUser(){let e=sessionStorage.getItem(Hc)||localStorage.getItem(Hc);try{return e?JSON.parse(e):null}catch{return null}},isAuthenticated(){return!!this.getToken()},async login(e,t){try{let n=await(await fetch(`/api/auth/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({username:e,password:t})})).json();return n.success&&n.token?(this.setSession(n.token,n.user),{success:!0,user:n.user}):{success:!1,message:n.message||`Login gagal`}}catch(n){try{let n=await(await fetch(`/api.php?action=login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({username:e,password:t})})).json();return n.success&&n.token?(this.setSession(n.token,n.user),{success:!0,user:n.user}):{success:!1,message:n.message||`Login gagal`}}catch{return{success:!1,message:`Tidak dapat menghubungi server: `+n.message}}}},async logout(){let e=this.getToken();try{await fetch(`/api/auth/logout`,{method:`POST`,headers:{Authorization:`Bearer ${e}`}})}catch{}this.clearSession()},async getHotspots(){try{let e=await fetch(`/api/hotspots`);if(e.ok){let t=await e.json();return Array.isArray(t.hotspots)?t.hotspots:[]}}catch{console.warn(`API /api/hotspots gagal, fallback ke /data/hotspots.json`)}try{let e=await fetch(`/data/hotspots.json`);if(e.ok){let t=await e.json();return Array.isArray(t.hotspots)?t.hotspots:[]}}catch(e){console.error(`Gagal memuat hotspots.json:`,e)}return[]},async saveHotspots(e){let t=this.getToken();if(!t)throw Error(`Akses ditolak: Anda harus login sebagai admin`);let n={version:`1.1.0`,hotspots:e};try{let e=await fetch(`/api/hotspots`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${t}`},body:JSON.stringify(n)});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.message||`HTTP Error ${e.status}`)}return await e.json()}catch(e){try{let e=await fetch(`/api.php?action=save_hotspots`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${t}`},body:JSON.stringify(n)});if(e.ok)return await e.json()}catch{}throw e}},async exportBackup(){let e=this.getToken();try{let t=await fetch(`/api/backup/export`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok)return await t.json()}catch{}let t=await this.getHotspots();return{exportType:`marzipano_hotspots_backup`,version:`1.1.0`,exportedAt:new Date().toISOString(),project:`Eco Land — Kawasan Penanaman Pohon ±2 Hektare Aceh`,totalHotspots:t.length,data:{version:`1.1.0`,lastUpdated:new Date().toISOString(),hotspots:t}}},async importBackup(e){let t=this.getToken();if(!t)throw Error(`Akses ditolak: Memerlukan login admin`);let n=await fetch(`/api/backup/import`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!n.ok){let e=await n.json().catch(()=>({}));throw Error(e.message||`Gagal memulihkan cadangan`)}return await n.json()},async saveSceneCustomName(e,t){let n=this.getToken();try{let r=await fetch(`/api/scenes/rename`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${n}`},body:JSON.stringify({sceneId:e,newName:t})});if(r.ok)return await r.json()}catch{}return{success:!0}},async getScenes(){try{let e=await fetch(`/api/scenes`);if(e.ok)return(await e.json()).scenes||[]}catch(e){console.warn(`Gagal memuat /api/scenes:`,e)}return[]},async getCustomSceneNames(){try{let e=await fetch(`/api/scenes/custom`);if(e.ok)return await e.json()}catch{}return{}},async updateScene(e,t){let n=await fetch(`/api/admin/scenes/${e}`,{method:`PUT`,headers:this.getAuthHeaders(),body:JSON.stringify(t)}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal memperbarui metadata scene`);return r},getAuthHeaders(){let e=this.getToken();return{"Content-Type":`application/json`,Accept:`application/json`,...e?{Authorization:`Bearer ${e}`}:{}}},getAuthHeadersMultipart(){let e=this.getToken();return{Accept:`application/json`,...e?{Authorization:`Bearer ${e}`}:{}}},async getTreeDashboard(e=null){let t=e&&e!==`all`?`?planting_zone_id=${encodeURIComponent(e)}`:``,n=await fetch(`/api/admin/trees/dashboard${t}`,{headers:this.getAuthHeaders()});if(!n.ok)throw Error(`Gagal memuat dashboard penanaman`);return await n.json()},async getTreeSpecies(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/admin/trees/species?${t}`,{headers:this.getAuthHeaders()});if(!n.ok)throw Error(`Gagal memuat daftar jenis pohon`);return await n.json()},async saveTreeSpecies(e,t=null){let n=e instanceof FormData,r=t?`/api/admin/trees/species/${t}`:`/api/admin/trees/species`,i=n&&t?`POST`:t?`PUT`:`POST`;n&&t&&e.append(`_method`,`PUT`);let a={...this.getAuthHeaders()};n&&delete a[`Content-Type`];let o=await fetch(r,{method:i,headers:a,body:n?e:JSON.stringify(e)}),s=await o.json();if(!o.ok)throw Error(s.message||`Gagal menyimpan jenis pohon`);return s},async deleteTreeSpecies(e){let t=await fetch(`/api/admin/trees/species/${e}`,{method:`DELETE`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus jenis pohon`);return n},async getPublicTreeSpecies(){let e=await fetch(`/api/tree-species`);if(!e.ok)throw Error(`Gagal memuat katalog publik jenis pohon`);return await e.json()},async getPublicTreeSpeciesDetail(e){let t=await fetch(`/api/tree-species/${e}`);if(!t.ok)throw Error(`Gagal memuat detail jenis pohon`);return await t.json()},async getPlantingActivities(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/admin/trees/activities?${t}`,{headers:this.getAuthHeaders()});if(!n.ok)throw Error(`Gagal memuat kegiatan penanaman`);return await n.json()},async savePlantingActivity(e,t=null){let n=t?`/api/admin/trees/activities/${t}`:`/api/admin/trees/activities`,r=await fetch(n,{method:t?`PUT`:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify(e)}),i=await r.json();if(!r.ok){let e=Error(i.message||`Gagal menyimpan kegiatan penanaman`);throw e.errors=i.errors||null,e.status=r.status,e}return i},async getPlantingActivity(e){let t=await fetch(`/api/admin/trees/activities/${e}`,{headers:this.getAuthHeaders()});if(!t.ok)throw Error(`Gagal memuat detail kegiatan penanaman`);return await t.json()},async deletePlantingActivity(e){let t=await fetch(`/api/admin/trees/activities/${e}`,{method:`DELETE`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus kegiatan penanaman`);return n},async correctPlantingActivityItem(e,t,n){let r=await fetch(`/api/admin/trees/activities/items/${e}/correct`,{method:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify({new_quantity:t,reason:n})}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal menyimpan koreksi bibit awal`);return i},async getTreeSurveys(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/admin/trees/surveys?${t}`,{headers:this.getAuthHeaders()});if(!n.ok)throw Error(`Gagal memuat catatan survei pemantauan`);return await n.json()},async getTreeSurveyDetail(e){let t=await fetch(`/api/admin/trees/surveys/${e}`,{headers:this.getAuthHeaders()});if(!t.ok)throw Error(`Gagal memuat detail survei pemantauan`);return await t.json()},async saveTreeSurvey(e,t=null){let n=t?`/api/admin/trees/surveys/${t}`:`/api/admin/trees/surveys`,r=await fetch(n,{method:t?`PUT`:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify(e)}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal menyimpan survei pemantauan`);return i},async deleteTreeSurvey(e){let t=await fetch(`/api/admin/trees/surveys/${e}`,{method:`DELETE`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus survei`);return n},async getTreeMaintenance(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/admin/trees/maintenance?${t}`,{headers:this.getAuthHeaders()});if(!n.ok)throw Error(`Gagal memuat catatan perawatan`);return await n.json()},async getTreeMaintenanceDetail(e){let t=await fetch(`/api/admin/trees/maintenance/${e}`,{headers:this.getAuthHeaders()});if(!t.ok)throw Error(`Gagal memuat detail catatan perawatan`);return await t.json()},async saveTreeMaintenance(e,t=null){let n=t?`/api/admin/trees/maintenance/${t}`:`/api/admin/trees/maintenance`,r=await fetch(n,{method:t?`PUT`:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify(e)}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal menyimpan catatan perawatan`);return i},async deleteTreeMaintenance(e){let t=await fetch(`/api/admin/trees/maintenance/${e}`,{method:`DELETE`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus catatan perawatan`);return n},async previewTreeImport(e,t){let n=new FormData;n.append(`file`,e),n.append(`type`,t);let r=this.getToken(),i=await fetch(`/api/admin/trees/import/preview`,{method:`POST`,headers:{Accept:`application/json`,...r?{Authorization:`Bearer ${r}`}:{}},body:n}),a=await i.json();if(!i.ok)throw Error(a.message||`Gagal memvalidasi berkas impor`);return a},async executeTreeImport(e,t){let n=await fetch(`/api/admin/trees/import/execute`,{method:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify({type:e,data:t,confirm:!0})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menjalankan impor data`);return r},async getZones(e={}){let t=new URLSearchParams(e).toString();try{let e=await fetch(`/api/admin/zones?${t}`,{headers:this.getAuthHeaders()});if(e.ok)return await e.json()}catch{}try{let e=await fetch(`/api/zones?${t}`);if(e.ok)return await e.json()}catch{}throw Error(`Gagal memuat daftar kawasan`)},async getZone(e){let t=await fetch(`/api/admin/zones/${e}`,{headers:this.getAuthHeaders()});if(!t.ok)throw Error(`Gagal memuat detail kawasan`);return await t.json()},async saveZone(e,t=null){let n=t?`/api/admin/zones/${t}`:`/api/admin/zones`,r=await fetch(n,{method:t?`PUT`:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify(e)}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal menyimpan data kawasan`);return i},async deleteZone(e){let t=await fetch(`/api/admin/zones/${e}`,{method:`DELETE`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus kawasan`);return n},async archiveZone(e){let t=await fetch(`/api/admin/zones/${e}/archive`,{method:`POST`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal mengubah status arsip`);return n},async linkZoneScenes(e,t){let n=await fetch(`/api/admin/zones/${e}/link-scenes`,{method:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify({scene_ids:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menghubungkan panorama`);return r},async getPublicZones(){let e=await fetch(`/api/zones`);if(!e.ok)throw Error(`Gagal memuat kawasan publik`);return await e.json()},async getPublicZone(e){let t=await fetch(`/api/zones/${e}`);if(!t.ok)throw Error(`Gagal memuat detail kawasan publik`);return await t.json()},async getZonePhotos(e,t={}){let n=new URLSearchParams(t).toString(),r=await fetch(`/api/admin/zones/${e}/photos?${n}`,{headers:this.getAuthHeaders()});if(!r.ok)throw Error(`Gagal memuat galeri foto kawasan`);return await r.json()},async uploadZonePhotos(e,t){let n=await fetch(`/api/admin/zones/${e}/photos`,{method:`POST`,headers:this.getAuthHeadersMultipart(),body:t}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal mengunggah foto kawasan`);return r},async updateZonePhoto(e,t,n){let r=n instanceof FormData,i=`PUT`,a=n,o=this.getAuthHeaders();r?(i=`POST`,n.append(`_method`,`PUT`),o=this.getAuthHeadersMultipart()):a=JSON.stringify(n);let s=await fetch(`/api/admin/zones/${e}/photos/${t}`,{method:i,headers:o,body:a}),c=await s.json();if(!s.ok)throw Error(c.message||`Gagal memperbarui metadata foto`);return c},async deleteZonePhoto(e,t){let n=await fetch(`/api/admin/zones/${e}/photos/${t}`,{method:`DELETE`,headers:this.getAuthHeaders()}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menghapus foto kawasan`);return r},async setZoneCoverPhoto(e,t){let n=await fetch(`/api/admin/zones/${e}/photos/${t}/set-cover`,{method:`POST`,headers:this.getAuthHeaders()}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menjadikan foto sebagai sampul`);return r},async reorderZonePhotos(e,t){let n=await fetch(`/api/admin/zones/${e}/photos/reorder`,{method:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify({photo_ids:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menyimpan urutan foto`);return r},async getPublicZonePhotos(e){let t=await fetch(`/api/zones/${e}/photos`);if(!t.ok)throw Error(`Gagal memuat galeri foto publik kawasan`);return await t.json()},async getAllPublicPhotos(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/photos?${t}`);if(!n.ok)throw Error(`Gagal memuat galeri foto kawasan publik`);return await n.json()},async getActivityLogs(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/admin/activity-logs?${t}`,{headers:this.getAuthHeaders()});if(!n.ok)throw Error(`Gagal memuat log aktivitas`);return await n.json()},async getSettings(){let e=await fetch(`/api/admin/settings`,{headers:this.getAuthHeaders()});if(!e.ok)throw Error(`Gagal memuat pengaturan aplikasi`);return await e.json()},async saveSettings(e){let t=await fetch(`/api/admin/settings`,{method:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify({settings:e})}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menyimpan pengaturan`);return n},async uploadLogo(e){let t=await fetch(`/api/admin/settings/logo`,{method:`POST`,headers:this.getAuthHeadersMultipart(),body:e}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal mengunggah logo aplikasi`);return n},async removeLogo(){let e=await fetch(`/api/admin/settings/logo`,{method:`DELETE`,headers:this.getAuthHeaders()}),t=await e.json();if(!e.ok)throw Error(t.message||`Gagal menghapus logo aplikasi`);return t},async getUsers(){let e=await fetch(`/api/admin/users`,{headers:this.getAuthHeaders()});if(!e.ok)throw Error(`Gagal memuat daftar pengguna`);return await e.json()},async saveUser(e,t=null){let n=t?`/api/admin/users/${t}`:`/api/admin/users`,r=await fetch(n,{method:t?`PUT`:`POST`,headers:this.getAuthHeaders(),body:JSON.stringify(e)}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal menyimpan data pengguna`);return i},async deleteUser(e){let t=await fetch(`/api/admin/users/${e}`,{method:`DELETE`,headers:this.getAuthHeaders()}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus pengguna`);return n}},Uc=[];function Wc(e){typeof e==`function`&&Uc.push(e)}function Gc(e){Uc.forEach(t=>{try{t(e)}catch(e){console.warn(`Error in auth change listener:`,e)}})}function Kc(){document.getElementById(`admin-login-modal`);let e=document.getElementById(`admin-login-form`),t=document.getElementById(`admin-login-error`),n=document.getElementById(`btn-close-login-modal`),r=document.getElementById(`btn-admin-logout`);e&&e.addEventListener(`submit`,async n=>{n.preventDefault();let r=document.getElementById(`admin-username`),i=document.getElementById(`admin-password`),a=e.querySelector(`button[type="submit"]`);if(!r||!i)return;a.disabled=!0,a.textContent=`Memverifikasi...`,t&&t.classList.add(`hidden`);let o=await Z.login(r.value.trim(),i.value);a.disabled=!1,a.textContent=`Masuk Administrator`,o.success?(Jc(),r.value=``,i.value=``,m.success(`✓ Berhasil Masuk`,`Selamat datang kembali, ${o.user?.name||o.user?.username||`Administrator`}!`),Gc(!0)):(t&&(t.textContent=o.message||`Kredensial tidak valid`,t.classList.remove(`hidden`)),m.error(`✕ Gagal Masuk`,o.message||`Username atau kata sandi admin salah.`))}),n&&n.addEventListener(`click`,Jc);let i=e=>{e&&typeof e.preventDefault==`function`&&e.preventDefault(),qc()};r&&r.addEventListener(`click`,i),document.querySelectorAll(`.btn-sidebar-quick-logout`).forEach(e=>{e.addEventListener(`click`,i)})}function qc(){try{let e=Z.getToken();e&&fetch(`/api/auth/logout`,{method:`POST`,headers:{Authorization:`Bearer ${e}`},keepalive:!0}).catch(()=>{})}catch(e){console.warn(`API logout error:`,e)}Z.clearSession();try{sessionStorage.clear(),localStorage.removeItem(`vtour_admin_token`),localStorage.removeItem(`vtour_admin_user`),localStorage.removeItem(`admin_redirect_hash`)}catch{}window.location.href=`/logout`}function Jc(){let e=document.getElementById(`admin-login-modal`);e&&e.classList.add(`hidden`)}function Yc(){if(Z.isAuthenticated())return!0;if(typeof document<`u`){let e=document.querySelector(`meta[name="eco-server-auth"]`);if(e&&e.getAttribute(`content`)===`true`)return!0}return!1}async function Xc({scenes:e,hotspots:t,selectedZoneId:n=`all`,onNavigateToPanorama:r,onNavigateToEditor:i,onNavigateToTrees:a,onNavigateToZones:o,onNavigateToSpecies:s,onNavigateToActivities:c,onNavigateToSurveys:l,onNavigateToMaintenance:u,onNavigateToReports:d,onNavigateToLogs:f}){let p=document.getElementById(`admin-dashboard-content`);if(!p)return;let m=new Set(e.map(e=>e.id)),h=e.length,g=t.filter(e=>e.type===`link`);t.filter(e=>e.type===`info`);let _=t.filter(e=>e.status===`draft`),v=t.filter(e=>e.status===`published`);t.filter(e=>e.isActive===!1||e.status===`inactive`);let y=new Set(g.map(e=>e.sceneId));e.filter(e=>!y.has(e.id));let b=g.filter(e=>!m.has(e.target));e.filter(e=>e.status!==`tersedia`);let x=Math.max(0,t.length-b.length),S=null;try{S=await Z.getTreeDashboard(n)}catch(e){console.warn(`Could not load tree dashboard stats:`,e)}let C=S?.indicators||{total_zones:0,total_species:0,total_activities:0,total_initial_seedlings:0,total_alive_initial:0,total_dead_initial:0,total_missing_initial:0,total_replacements:0,monitored_batches_count:0,survival_rate:null,survival_rate_status:`data_belum_lengkap`};C.survival_rate!==null&&`${C.survival_rate}`;let w=C.survival_rate_status===`terverifikasi`?`pill-success`:`pill-info`,T=(C.total_zones||0)>0,E=(C.total_species||0)>0,D=`Belum Dimulai`,O=`pill-warning`,k=`Kawasan dan master jenis pohon belum dikonfigurasi.`,A=`Belum ada data kawasan dan spesies terdaftar.`;T&&E?(D=`Selesai`,O=`pill-success`,k=`${C.total_zones} kawasan aktif terdaftar & ${C.total_species} master jenis pohon siap.`,A=`Semua data persiapan awal telah lengkap.`):(T||E)&&(D=`Sedang Berjalan`,O=`pill-info`,k=`${C.total_zones||0} kawasan & ${C.total_species||0} spesies tercatat.`,A=T?`Master jenis pohon belum ditambahkan.`:`Data kawasan belum ditambahkan.`);let j=(C.total_activities||0)>0,M=(C.total_initial_seedlings||0)>0,ee=`Belum Dimulai`,N=`pill-warning`,P=`Belum ada kegiatan penanaman di lapangan yang dicatat.`,F=`Pencatatan batch/kelompok bibit awal belum dilakukan.`;j&&M?(ee=`Selesai`,N=`pill-success`,P=`${C.total_activities} kegiatan penanaman tercatat dengan total ${C.total_initial_seedlings} bibit awal.`,F=`Kelompok penanaman aktif di lapangan.`):j&&(ee=`Sedang Berjalan`,N=`pill-info`,P=`${C.total_activities} kegiatan tercatat.`,F=`Rincian jumlah bibit pohon per spesies belum diisi.`);let te=(C.monitored_batches_count||0)>0,I=(C.total_replacements||0)>0,R=`Belum Dimulai`,z=`pill-warning`,B=`Pemeriksaan sensus dan tindakan silvikultur belum dicatat.`,V=`Survei sensus hidup/mati bibit belum diinput.`;te&&I?(R=`Selesai`,z=`pill-success`,B=`${C.monitored_batches_count} kelompok telah disensus, ${C.total_replacements} bibit penyulaman tertangani.`,V=`Survei dan silvikultur aktif berjalan berkala.`):(te||I)&&(R=`Sedang Berjalan`,z=`pill-info`,B=te?`${C.monitored_batches_count} kelompok terpantau.`:`${C.total_replacements} bibit disulam.`,V=te?`Belum ada tindakan penyulaman bibit mati.`:`Survei sensus tanaman belum dicatat.`);let H=h>0,ne=v.length>0,U=`Belum Dimulai`,re=`pill-warning`,ie=`Panorama dan hotspot belum disiapkan.`,ae=`Aset panorama atau hotspot belum terpasang.`;H&&ne&&_.length===0?(U=`Selesai`,re=`pill-success`,ie=`${h} panorama multiresolution & ${v.length} hotspot aktif terpublikasi.`,ae=`Seluruh hotspot telah terbit untuk publik.`):H&&(U=`Sedang Berjalan`,re=`pill-info`,ie=`${h} panorama tersedia, ${v.length} hotspot terpublikasi.`,ae=_.length>0?`${_.length} hotspot masih berupa draft.`:`Sebagian hotspot belum ditautkan.`);let oe=C.survival_rate!==null,se=`Belum Dimulai`,ce=`pill-warning`,le=`Data evaluasi dan pelaporan belum lengkap.`,ue=`Perlu data penanaman dan survei untuk menghasilkan laporan.`;oe?(se=`Selesai`,ce=`pill-success`,le=`Kelangsungan hidup ${C.survival_rate}% terverifikasi. Rekapitulasi & ekspor data siap diunduh.`,ue=`Laporan komprehensif siap.`):j&&(se=`Sedang Berjalan`,ce=`pill-info`,le=`Data awal penanaman tersedia, menunggu hasil survei sensus untuk perhitungan kelulusan hidup (survival rate).`,ue=`Perhitungan survival rate membutuhkan sensus survei terverifikasi.`),p.innerHTML=`
    <!-- Top Action Banner -->
    <div class="admin-dashboard-hero" style="margin-bottom: 24px;">
      <div class="admin-hero-content">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 6px;">Ringkasan Sistem Informasi Eco Land & Restorasi Kawasan</h2>
        <p style="color: var(--clr-text-muted); font-size: 13px; line-height: 1.5;">
          Pantau status kelengkapan 6 panorama Marzipano, integritas hotspot interaktif, dan statistik penanaman bibit pohon kawasan ±2 hektare secara aktual.
        </p>
      </div>
      <div class="admin-hero-actions" style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button id="dash-btn-open-editor" class="btn-primary-action btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Editor Hotspot
        </button>
        <button id="dash-btn-open-panoramas" class="btn-secondary-action btn-sm">
          🌐 Panorama (${h})
        </button>
        <button id="dash-btn-open-trees" class="btn-secondary-action btn-sm">
          🌱 Data Penanaman
        </button>
      </div>
    </div>

    <!-- E.1. DELAPAN KARTU STATISTIK UTAMA (AKTUAL & NON-FIKTIF) -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
          📊 Indikator Kunci Kawasan & Penanaman (Data Aktual)
        </h3>
        <span class="admin-header-pill ${w}" style="font-size: 11px;">
          ${C.survival_rate_status===`terverifikasi`?`Terverifikasi`:`Belum Ada Sensus`}
        </span>
      </div>
      <div class="admin-stats-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));">
        <!-- 1. Total Kawasan -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Total Kawasan</span>
            <span class="stat-icon">🏞️</span>
          </div>
          <div class="stat-number text-accent">${C.total_zones}</div>
          <div class="stat-footer-text">Lahan terdaftar dalam sistem</div>
        </div>

        <!-- 2. Kawasan Aktif -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Kawasan Aktif</span>
            <span class="stat-icon">✅</span>
          </div>
          <div class="stat-number text-success">${C.total_zones}</div>
          <div class="stat-footer-text">Dalam status restorasi aktif</div>
        </div>

        <!-- 3. Total Jenis Pohon -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Total Jenis Pohon</span>
            <span class="stat-icon">🌿</span>
          </div>
          <div class="stat-number">${C.total_species}</div>
          <div class="stat-footer-text">Spesies terdata di master database</div>
        </div>

        <!-- 4. Total Kegiatan Penanaman -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Kegiatan Penanaman</span>
            <span class="stat-icon">📋</span>
          </div>
          <div class="stat-number text-accent">${C.total_activities}</div>
          <div class="stat-footer-text">Batch kelompok bibit tercatat</div>
        </div>

        <!-- 5. Total Bibit Awal yang Tercatat -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Total Bibit Awal</span>
            <span class="stat-icon">🌱</span>
          </div>
          <div class="stat-number text-success">${C.total_initial_seedlings}</div>
          <div class="stat-footer-text">Batang ditanam (rekaman historis)</div>
        </div>

        <!-- 6. Jumlah Kelompok yang Sudah Dipantau -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Kelompok Dipantau</span>
            <span class="stat-icon">🔍</span>
          </div>
          <div class="stat-number text-info">${C.monitored_batches_count}</div>
          <div class="stat-footer-text">Memiliki catatan sensus lapangan</div>
        </div>

        <!-- 7. Jumlah Scene Panorama -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Scene Panorama</span>
            <span class="stat-icon">🌐</span>
          </div>
          <div class="stat-number">${h}</div>
          <div class="stat-footer-text">Titik foto 360° Marzipano</div>
        </div>

        <!-- 8. Jumlah Hotspot Valid & Terdaftar -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Hotspot Valid</span>
            <span class="stat-icon">📍</span>
          </div>
          <div class="stat-number text-info">${x}</div>
          <div class="stat-footer-text">${v.length} publik, ${_.length} draft</div>
        </div>
      </div>
    </div>

    <!-- E.2. PANEL TAHAPAN PENGELOLAAN KAWASAN (WORKFLOW 5 TAHAPAN) -->
    <div style="margin-bottom: 24px;">
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
          🧭 Alur & Tahapan Pengelolaan Kawasan Penanaman
        </h3>
        <p style="color: var(--clr-text-muted); font-size: 12px; margin-top: 2px;">
          Panduan progres berbasis data aktual. Admin dapat membuka seluruh modul kapan saja secara mandiri.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <!-- Tahap 1: Persiapan -->
        <div class="admin-stat-card" style="border-left: 4px solid ${D===`Selesai`?`#10b981`:D===`Sedang Berjalan`?`#38bdf8`:`#f59e0b`};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 1</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Persiapan Kawasan & Spesies</h4>
            </div>
            <span class="admin-header-pill ${O}" style="font-size: 10px;">${D}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${k}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${A}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-zones" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🏞️ Kelola Kawasan
            </button>
            <button id="stage-btn-species" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🌿 Master Spesies
            </button>
          </div>
        </div>

        <!-- Tahap 2: Kegiatan Penanaman -->
        <div class="admin-stat-card" style="border-left: 4px solid ${ee===`Selesai`?`#10b981`:ee===`Sedang Berjalan`?`#38bdf8`:`#f59e0b`};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 2</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Kegiatan Penanaman</h4>
            </div>
            <span class="admin-header-pill ${N}" style="font-size: 10px;">${ee}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${P}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${F}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-activities" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              📋 Pencatatan Penanaman
            </button>
          </div>
        </div>

        <!-- Tahap 3: Pemantauan dan Perawatan -->
        <div class="admin-stat-card" style="border-left: 4px solid ${R===`Selesai`?`#10b981`:R===`Sedang Berjalan`?`#38bdf8`:`#f59e0b`};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 3</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Pemantauan & Perawatan</h4>
            </div>
            <span class="admin-header-pill ${z}" style="font-size: 10px;">${R}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${B}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${V}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-surveys" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🔍 Pemantauan
            </button>
            <button id="stage-btn-maintenance" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🛠️ Perawatan & Sulam
            </button>
          </div>
        </div>

        <!-- Tahap 4: Dokumentasi Digital (Virtual Tour) -->
        <div class="admin-stat-card" style="border-left: 4px solid ${U===`Selesai`?`#10b981`:U===`Sedang Berjalan`?`#38bdf8`:`#f59e0b`};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 4</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Dokumentasi Digital 360°</h4>
            </div>
            <span class="admin-header-pill ${re}" style="font-size: 10px;">${U}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${ie}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${ae}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-editor" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🎨 Editor Hotspot
            </button>
            <button id="stage-btn-panoramas" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🌐 Panorama
            </button>
          </div>
        </div>

        <!-- Tahap 5: Evaluasi dan Pelaporan -->
        <div class="admin-stat-card" style="border-left: 4px solid ${se===`Selesai`?`#10b981`:se===`Sedang Berjalan`?`#38bdf8`:`#f59e0b`};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 5</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Evaluasi & Pelaporan</h4>
            </div>
            <span class="admin-header-pill ${ce}" style="font-size: 10px;">${se}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${le}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${ue}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-reports" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              📑 Rekapitulasi & Ekspor
            </button>
          </div>
        </div>
      </div>
    </div>

  `,p.querySelector(`#dash-btn-open-editor`)?.addEventListener(`click`,()=>{i&&i()}),p.querySelector(`#dash-btn-open-panoramas`)?.addEventListener(`click`,()=>{r&&r()}),p.querySelector(`#dash-btn-open-trees`)?.addEventListener(`click`,()=>{a&&a()}),p.querySelector(`#stage-btn-zones`)?.addEventListener(`click`,()=>{o&&o()}),p.querySelector(`#stage-btn-species`)?.addEventListener(`click`,()=>{s&&s()}),p.querySelector(`#stage-btn-activities`)?.addEventListener(`click`,()=>{c&&c()}),p.querySelector(`#stage-btn-surveys`)?.addEventListener(`click`,()=>{l&&l()}),p.querySelector(`#stage-btn-maintenance`)?.addEventListener(`click`,()=>{u&&u()}),p.querySelector(`#stage-btn-editor`)?.addEventListener(`click`,()=>{i&&i()}),p.querySelector(`#stage-btn-panoramas`)?.addEventListener(`click`,()=>{r&&r()}),p.querySelector(`#stage-btn-reports`)?.addEventListener(`click`,()=>{d&&d()})}var Zc=[];async function Qc({scenes:e,hotspots:t,onOpenEditorForScene:n,onPreviewScene:r,onScenesUpdated:i}){let a=document.getElementById(`admin-panoramas-content`);if(!a)return;try{let[t,n]=await Promise.all([Z.getZones().catch(()=>({zones:[]})),Z.getScenes().catch(()=>[])]);Zc=t.zones||[],n&&n.length>0&&n.forEach(t=>{let n=e.find(e=>e.id===t.id);n&&(t.planting_zone_id!==void 0&&(n.planting_zone_id=t.planting_zone_id),t.name&&(n.name=t.name),t.description!==void 0&&(n.description=t.description),t.status&&(n.status=t.status),t.initialViewParameters&&(n.initialViewParameters={...n.initialViewParameters,...t.initialViewParameters}),t.initialView&&(n.initialView={...n.initialView,...t.initialView}),t.initial_yaw!==void 0&&(n.initial_yaw=t.initial_yaw),t.initial_pitch!==void 0&&(n.initial_pitch=t.initial_pitch),t.initial_fov!==void 0&&(n.initial_fov=t.initial_fov))})}catch{Zc=[]}let o=e=>{let n=t.filter(t=>t.sceneId===e);return{links:n.filter(e=>e.type===`link`).length,infos:n.filter(e=>e.type===`info`).length,drafts:n.filter(e=>e.status===`draft`).length,total:n.length,list:n}};a.innerHTML=`
    <div class="admin-section-header">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2>🌐 Manajemen Panorama (${e.length} Scene)</h2>
          <p>Kelola seluruh panorama 360°, ubah nama tampilan, deskripsi, tautkan ke kawasan restorasi, dan atur sudut pandang awal.</p>
        </div>
      </div>
    </div>

    <div class="admin-panoramas-grid">
      ${e.map((e,t)=>{let n=o(e.id),r=`/tiles/${e.id}/preview.jpg`,i=e.status===`tersedia`,a=Zc.find(t=>t.id===e.planting_zone_id);return`
            <div class="admin-pano-card" data-scene-id="${e.id}">
              <div class="pano-card-media">
                <img src="${r}" alt="${$c(e.name)}" class="pano-card-thumb" onerror="this.onerror=null; this.src='/img/placeholder-360.svg';" />
                <div class="pano-card-overlay">
                  <span class="pano-seq-badge">Titik #${e.sequence||t+1}</span>
                  <span class="pano-status-badge ${i?`ready`:`missing`}">
                    ${i?`✓ Aset Tile Siap`:`⏳ Menunggu Foto`}
                  </span>
                </div>
              </div>

              <div class="pano-card-body">
                <div class="pano-card-title-row">
                  <h3 class="pano-display-name" id="name-display-${e.id}">${$c(e.name)}</h3>
                  <button class="btn-edit-title-icon btn-config-scene" data-scene-id="${e.id}" title="Edit Konfigurasi Scene">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </button>
                </div>

                <div class="pano-id-badge">
                  <span>ID Scene:</span>
                  <code>${e.id}</code>
                </div>

                ${a?`<div style="margin-bottom: 8px;">
                        <span class="admin-header-pill pill-success" style="font-size: 11px;">
                          🏞️ ${$c(a.name)}
                        </span>
                      </div>`:``}

                <div class="pano-stats-chips">
                  <span class="pano-chip chip-link" title="Hotspot Navigasi Keluar">
                    🧭 ${n.links} Navigasi
                  </span>
                  <span class="pano-chip chip-info" title="Hotspot Informasi">
                    ℹ️ ${n.infos} Informasi
                  </span>
                  ${n.drafts>0?`<span class="pano-chip chip-draft" title="Hotspot Draft">
                          📝 ${n.drafts} Draft
                        </span>`:``}
                </div>

                <div class="pano-meta-details">
                  <div><strong>Deskripsi:</strong> ${$c(e.description||`Belum ada deskripsi`)}</div>
                  <div><strong>Lokasi Acuan:</strong> ${e.latitude?e.latitude.toFixed(6):`-`}° N, ${e.longitude?e.longitude.toFixed(6):`-`}° E</div>
                  <div><strong>Sudut Pandang Awal:</strong> Yaw: ${e.initialViewParameters?.yaw?.toFixed(2)??`0.00`} rad, Pitch: ${e.initialViewParameters?.pitch?.toFixed(2)??`0.00`} rad</div>
                </div>

                <div class="pano-card-actions">
                  <button class="btn-primary-action btn-sm btn-open-editor" data-scene-id="${e.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Buka Editor
                  </button>
                  <button class="btn-secondary-action btn-sm btn-config-scene" data-scene-id="${e.id}">
                    ⚙️ Edit Scene
                  </button>
                  <button class="btn-secondary-action btn-sm btn-preview-scene" data-scene-id="${e.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M10 8l6 4-6 4V8z"/>
                    </svg>
                    Pratinjau
                  </button>
                </div>
              </div>
            </div>
          `}).join(``)}
    </div>

    <!-- Modal Edit Konfigurasi Scene -->
    <div id="modal-config-scene" class="admin-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="modal-config-scene-title">
      <div class="admin-modal-box" style="max-width: 620px;">
        <div class="admin-modal-header">
          <h3 id="modal-config-scene-title">⚙️ Edit Konfigurasi Panorama</h3>
          <button type="button" id="btn-close-config-scene-modal" class="icon-btn-sm" title="Tutup Popup">✕</button>
        </div>
        <form id="form-config-scene" style="display: flex; flex-direction: column; margin: 0; min-height: 0; overflow: hidden;">
          <div class="admin-modal-body" style="display: flex; flex-direction: column; gap: 14px; max-height: calc(85vh - 130px); overflow-y: auto;">
            <input type="hidden" id="cfg-scene-id" />

            <div class="form-group">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                Nama Tampilan Scene: <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="cfg-scene-name" class="form-input" required />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama yang tampil di viewer dan daftar titik.</small>
            </div>

            <div class="form-group">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                Deskripsi Scene:
              </label>
              <textarea id="cfg-scene-desc" class="form-textarea" rows="2"></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                  Tautkan ke Kawasan:
                </label>
                <select id="cfg-scene-zone" class="form-select">
                  <option value="">-- Tanpa Kawasan --</option>
                  ${Zc.map(e=>`<option value="${e.id}">${$c(e.name)}</option>`).join(``)}
                </select>
              </div>

              <div class="form-group">
                <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                  Status Scene:
                </label>
                <select id="cfg-scene-status" class="form-select">
                  <option value="tersedia">✓ Tersedia (Aktif)</option>
                  <option value="menunggu_foto">⏳ Menunggu Foto</option>
                  <option value="diarsipkan">📦 Diarsipkan</option>
                </select>
              </div>
            </div>

            <div style="border-top: 1px solid var(--clr-border-subtle); padding-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label style="color: #fff; font-size: 13px; font-weight: 600; margin: 0;">
                  Sudut Pandang Awal (Initial View Parameters):
                </label>
                <button type="button" id="btn-reset-view-params" class="btn-secondary-action btn-sm" style="padding: 3px 8px; font-size: 11px;">
                  🔄 Reset Standar
                </button>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <label style="color: var(--clr-text-muted); font-size: 11px; font-weight: 600;">Yaw (Horizontal):</label>
                    <span id="cfg-scene-yaw-deg" style="color: #10b981; font-size: 10px; font-weight: 600;">0.0°</span>
                  </div>
                  <input type="number" step="any" id="cfg-scene-yaw" class="form-input" placeholder="0.0 rad" />
                  <small style="color: var(--clr-text-muted); font-size: 10px; display: block; margin-top: 2px;">Rentang: -3.14 s/d 3.14 rad</small>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <label style="color: var(--clr-text-muted); font-size: 11px; font-weight: 600;">Pitch (Vertikal):</label>
                    <span id="cfg-scene-pitch-deg" style="color: #10b981; font-size: 10px; font-weight: 600;">0.0°</span>
                  </div>
                  <input type="number" step="any" id="cfg-scene-pitch" class="form-input" placeholder="0.0 rad" />
                  <small style="color: var(--clr-text-muted); font-size: 10px; display: block; margin-top: 2px;">Rentang: -1.57 s/d 1.57 rad</small>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <label style="color: var(--clr-text-muted); font-size: 11px; font-weight: 600;">FOV (Zoom/Bidang):</label>
                    <span id="cfg-scene-fov-deg" style="color: #10b981; font-size: 10px; font-weight: 600;">80.0°</span>
                  </div>
                  <input type="number" step="any" id="cfg-scene-fov" class="form-input" placeholder="1.395 rad" />
                  <small style="color: var(--clr-text-muted); font-size: 10px; display: block; margin-top: 2px;">Default Marzipano: ~1.395 rad</small>
                </div>
              </div>
            </div>

            <!-- Hotspot List in Scene -->
            <div style="border-top: 1px solid var(--clr-border-subtle); padding-top: 12px;">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Hotspot Terpasang di Scene Ini:
              </label>
              <div id="cfg-scene-hotspots-list" style="max-height: 140px; overflow-y: auto; background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" id="btn-cancel-config-scene" class="btn-secondary-action">Batal</button>
            <button type="submit" class="btn-primary-action">💾 Simpan Perubahan Scene</button>
          </div>
        </form>
      </div>
    </div>
  `,a.querySelectorAll(`.btn-open-editor`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);n&&n(t)})}),a.querySelectorAll(`.btn-preview-scene`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);r&&r(t)})});let s=document.getElementById(`modal-config-scene`),c=document.getElementById(`form-config-scene`),l=()=>{let e=parseFloat(document.getElementById(`cfg-scene-yaw`)?.value||0)||0,t=parseFloat(document.getElementById(`cfg-scene-pitch`)?.value||0)||0,n=parseFloat(document.getElementById(`cfg-scene-fov`)?.value||1.394599)||1.394599,r=(e*180/Math.PI).toFixed(1),i=(t*180/Math.PI).toFixed(1),a=(n*180/Math.PI).toFixed(1),o=document.getElementById(`cfg-scene-yaw-deg`);o&&(o.textContent=`${r}°`);let s=document.getElementById(`cfg-scene-pitch-deg`);s&&(s.textContent=`${i}°`);let c=document.getElementById(`cfg-scene-fov-deg`);c&&(c.textContent=`${a}°`)};[`cfg-scene-yaw`,`cfg-scene-pitch`,`cfg-scene-fov`].forEach(e=>{document.getElementById(e)?.addEventListener(`input`,l)}),document.getElementById(`btn-reset-view-params`)?.addEventListener(`click`,()=>{document.getElementById(`cfg-scene-yaw`).value=0,document.getElementById(`cfg-scene-pitch`).value=0,document.getElementById(`cfg-scene-fov`).value=1.394599,l()}),a.querySelectorAll(`.btn-config-scene`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-scene-id`),r=e.find(e=>e.id===n);if(!r)return;document.getElementById(`cfg-scene-id`).value=r.id,document.getElementById(`cfg-scene-name`).value=r.name,document.getElementById(`cfg-scene-desc`).value=r.description||``;let i=document.getElementById(`cfg-scene-zone`);i&&(i.innerHTML=`
          <option value="">-- Tanpa Kawasan --</option>
          ${Zc.map(e=>`<option value="${e.id}" ${e.id===r.planting_zone_id?`selected`:``}>${$c(e.name)}</option>`).join(``)}
        `,i.value=r.planting_zone_id||``),document.getElementById(`cfg-scene-status`).value=r.status||`tersedia`;let a=r.initialViewParameters?.yaw??r.initial_yaw??0,c=r.initialViewParameters?.pitch??r.initial_pitch??0,u=r.initialViewParameters?.fov??r.initial_fov??1.394599;document.getElementById(`cfg-scene-yaw`).value=a,document.getElementById(`cfg-scene-pitch`).value=c,document.getElementById(`cfg-scene-fov`).value=u,l(),document.getElementById(`modal-config-scene-title`).textContent=`⚙️ Edit Panorama: ${r.name} (${r.id})`;let d=o(r.id),f=document.getElementById(`cfg-scene-hotspots-list`);f.innerHTML=d.list.length>0?d.list.map(e=>`
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 6px; background: rgba(255,255,255,0.02); border-radius: 4px;">
            <span>${e.type===`link`?`🧭`:`ℹ️`} <strong>${$c(e.title||`(Tanpa Judul)`)}</strong> <code style="font-size: 10px; color: var(--clr-text-muted);">(${e.type})</code></span>
            <span style="font-size: 10px; color: ${e.status===`published`?`#34d399`:`#f59e0b`};">${e.status}</span>
          </div>
        `).join(``):`<span style="color: var(--clr-text-muted); font-size: 11px;">Belum ada hotspot pada scene ini.</span>`,s.classList.remove(`hidden`),setTimeout(()=>{document.getElementById(`cfg-scene-name`)?.focus()},50)})});let u=()=>s?.classList.add(`hidden`);document.getElementById(`btn-close-config-scene-modal`)?.addEventListener(`click`,u),document.getElementById(`btn-cancel-config-scene`)?.addEventListener(`click`,u),s?.addEventListener(`click`,e=>{e.target===s&&u()}),window._adminPanoModalEscAttached||(window._adminPanoModalEscAttached=!0,window.addEventListener(`keydown`,e=>{if(e.key===`Escape`){let e=document.getElementById(`modal-config-scene`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`)}})),c?.addEventListener(`submit`,async a=>{a.preventDefault();let o=document.getElementById(`cfg-scene-id`).value,l=e.find(e=>e.id===o);if(!l)return;let u=(e,t=0)=>{if(e===``||e==null)return t;let n=String(e).replace(`,`,`.`).trim(),r=parseFloat(n);return isNaN(r)?t:r},d=document.getElementById(`cfg-scene-zone`).value||null,f={name:document.getElementById(`cfg-scene-name`).value.trim(),description:document.getElementById(`cfg-scene-desc`).value.trim(),planting_zone_id:d,status:document.getElementById(`cfg-scene-status`).value,initial_yaw:u(document.getElementById(`cfg-scene-yaw`).value,0),initial_pitch:u(document.getElementById(`cfg-scene-pitch`).value,0),initial_fov:u(document.getElementById(`cfg-scene-fov`).value,1.394599)},p=c?.querySelector(`button[type="submit"]`);p&&(p.disabled=!0,p.textContent=`Menyimpan...`);try{await Z.updateScene(o,f),l.name=f.name,l.description=f.description,l.planting_zone_id=f.planting_zone_id,l.status=f.status,l.initial_yaw=f.initial_yaw,l.initial_pitch=f.initial_pitch,l.initial_fov=f.initial_fov,l.initialViewParameters||={},l.initialViewParameters.yaw=f.initial_yaw,l.initialViewParameters.pitch=f.initial_pitch,l.initialViewParameters.fov=f.initial_fov,l.initialView||={},l.initialView.yaw=f.initial_yaw,l.initialView.pitch=f.initial_pitch,l.initialView.fov=f.initial_fov,s.classList.add(`hidden`),m.saved(`Konfigurasi scene '${l.name}' berhasil disimpan.`),i&&i(),Qc({scenes:e,hotspots:t,onOpenEditorForScene:n,onPreviewScene:r,onScenesUpdated:i})}catch(e){m.error(`✕ Gagal menyimpan konfigurasi`,e.message)}finally{p&&(p.disabled=!1,p.textContent=`💾 Simpan Konfigurasi Scene`)}})}function $c(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var el=class{constructor({scenes:e,getHotspots:t,onHotspotsChanged:n,onSceneSwitchRequest:r}){this.scenes=e,this.getHotspots=t,this.onHotspotsChanged=n,this.onSceneSwitchRequest=r,this.viewer=null,this.currentSceneId=null,this.currentMarzipanoScene=null,this.currentView=null,this.sceneMap=new Map,this.mode=`select`,this.selectedHotspotId=null,this.clipboardHotspot=null,this.isDragging=!1,this.hasUnsavedChanges=!1,this.historyStack=[],this.redoStack=[],this.searchQuery=``,this.filterScene=`all`,this.filterType=`all`,this.filterStatus=`all`,this.handleViewerClick=this.handleViewerClick.bind(this),this.handleBeforeUnload=this.handleBeforeUnload.bind(this),this.cachedTreeSpeciesList=[],this.cachedPlantingActivitiesList=[]}init(){this.populateSceneDropdowns(),this.bindToolbarEvents(),this.bindFormEvents(),this.bindSearchFilterEvents(),window.addEventListener(`beforeunload`,this.handleBeforeUnload),this.loadTreeMetadata()}populateSceneDropdowns(){let e=document.getElementById(`editor-scene-select`);if(e&&this.scenes&&this.scenes.length>0){let t=this.currentSceneId||e.value;e.innerHTML=this.scenes.map((e,n)=>`<option value="${e.id}" ${e.id===t?`selected`:``}>Titik ${e.sequence||n+1}: ${tl(e.name)}</option>`).join(``),this.currentSceneId&&(e.value=this.currentSceneId)}let t=document.getElementById(`editor-filter-scene`);if(t&&this.scenes&&this.scenes.length>0){let e=this.filterScene||t.value||`all`;t.innerHTML=`<option value="all" ${e===`all`?`selected`:``}>Semua Scene</option>`+this.scenes.map((t,n)=>`<option value="${t.id}" ${t.id===e?`selected`:``}>Titik ${t.sequence||n+1}: ${tl(t.name)}</option>`).join(``)}}async loadTreeMetadata(){try{let[e,t]=await Promise.all([Z.getTreeSpecies({per_page:100}),Z.getPlantingActivities({per_page:100})]);this.cachedTreeSpeciesList=e.data||[],this.cachedPlantingActivitiesList=t.data||[]}catch{}}handleBeforeUnload(e){this.hasUnsavedChanges&&(e.preventDefault(),e.returnValue=`Terdapat perubahan hotspot yang belum disimpan ke server!`)}initViewer(){let e=document.getElementById(`admin-editor-pano`);e&&(this.viewer||(this.viewer=new $s.default.Viewer(e,{controls:{mouseViewMode:`drag`},stage:{progressive:!0}}),e.addEventListener(`click`,this.handleViewerClick),typeof ResizeObserver<`u`&&new ResizeObserver(()=>{this.viewer&&e.clientWidth>0&&e.clientHeight>0&&(this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render())}).observe(e)))}refreshViewerSize(){let e=document.getElementById(`admin-editor-pano`);!this.viewer&&e&&this.initViewer(),this.viewer&&(this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render())}setScene(e,t=!1){if(!e)return;this.currentSceneId=e;let n=document.getElementById(`admin-editor-pano`);if(!this.viewer&&n&&this.initViewer(),!this.viewer)return;let r=this.scenes.find(t=>t.id===e);if(!r)return;this.viewer.updateSize();let i=document.getElementById(`editor-scene-select`);i&&i.value!==e&&(i.value=e);let a=this.sceneMap.get(e);if(t&&a){if(this.viewer.hasScene&&this.viewer.hasScene(a.scene))try{this.viewer.destroyScene(a.scene)}catch{}this.sceneMap.delete(e),a=null}if(!a){let t=null,n=null,i=r.initialViewParameters||r.initialView||{};if(r.levels&&r.levels.length>0)t=$s.default.ImageUrlSource.fromString(`/tiles/${r.id}/{z}/{f}/{y}/{x}.jpg`,{cubeMapPreviewUrl:`/tiles/${r.id}/preview.jpg`}),n=new $s.default.CubeGeometry(r.levels);else{let e=r.panorama||r.panorama_path;t=$s.default.ImageUrlSource.fromString(e),n=new $s.default.EquirectGeometry([{width:4096}])}let o=r.faceSize||896,s=$s.default.RectilinearView.limit.traditional(o,100*Math.PI/180,120*Math.PI/180),c=new $s.default.RectilinearView({yaw:i.yaw??0,pitch:i.pitch??0,fov:i.fov??Math.PI/2},s);a={scene:this.viewer.createScene({source:t,geometry:n,view:c,pinFirstLevel:!0}),view:c},this.sceneMap.set(e,a)}this.currentMarzipanoScene=a.scene,this.currentView=a.view,a.scene.switchTo({transitionDuration:0}),this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render(),setTimeout(()=>{this.viewer&&(this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render())},50),this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.updateCurrentSceneTitleUI(r)}updateCurrentSceneTitleUI(e){let t=document.getElementById(`editor-current-scene-name`);t&&(t.textContent=`${e.name} (${e.id})`)}setMode(e){this.mode=e,document.querySelectorAll(`.editor-tool-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-mode`)===e)});let t=document.getElementById(`admin-editor-pano`);t&&(t.classList.remove(`mode-add`,`mode-move`,`mode-preview`),e.startsWith(`add-`)&&t.classList.add(`mode-add`),e===`move`&&t.classList.add(`mode-move`),e===`preview`&&t.classList.add(`mode-preview`));let n=document.getElementById(`editor-mode-hint`);n&&(e===`add-link`?(n.innerHTML=`👉 <strong>Mode Tambah Navigasi:</strong> Klik posisi pada panorama untuk menempatkan tanda panah.`,n.classList.remove(`hidden`)):e===`add-info`?(n.innerHTML=`👉 <strong>Mode Tambah Informasi:</strong> Klik posisi pada panorama untuk menempatkan titik edukasi.`,n.classList.remove(`hidden`)):e===`move`?(n.innerHTML=`✋ <strong>Mode Pindahkan:</strong> Klik atau seret hotspot pada panorama untuk mengubah posisinya.`,n.classList.remove(`hidden`)):e===`preview`?(n.innerHTML=`👁️ <strong>Mode Pratinjau Pengunjung:</strong> Menampilkan tampilan bersih sesuai hak akses pengunjung.`,n.classList.remove(`hidden`)):n.classList.add(`hidden`)),this.renderHotspotsOnCurrentScene()}handleViewerClick(e){if(this.currentView&&!this.isDragging&&(this.mode===`add-link`||this.mode===`add-info`)){let t=document.getElementById(`admin-editor-pano`).getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=this.currentView.screenToCoordinates({x:n,y:r});if(!i)return;this.saveHistorySnapshot(`Tambah Hotspot`);let a=this.mode===`add-link`,o=this.scenes.filter(e=>e.id!==this.currentSceneId),s=o.length>0?o[0].id:this.scenes[0].id,c=`hs_${a?`link`:`info`}_${Date.now()}`,l={id:c,sceneId:this.currentSceneId,type:a?`link`:`info`,yaw:i.yaw,pitch:i.pitch,title:a?`Menuju ${this.getSceneName(s)}`:`Informasi Baru`,status:`draft`,isActive:!0,source:`editor`};a?(l.target=s,l.rotation=0,l.icon=`arrow`):(l.text=`<p>Tuliskan deskripsi pohon atau konservasi di sini.</p>`,l.icon=`tree`),this.getHotspots().push(l),this.selectedHotspotId=c,this.hasUnsavedChanges=!0,this.setMode(`select`),this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.openHotspotForm(l),this.notifyHotspotsChanged(),this.showToast(`Hotspot berhasil ditempatkan! Silakan lengkapi formulir di samping.`)}}getSceneName(e){let t=this.scenes.find(t=>t.id===e);return t?t.name:e}renderHotspotsOnCurrentScene(){if(!this.currentMarzipanoScene)return;let e=this.currentMarzipanoScene.hotspotContainer();if(typeof e.listHotspots==`function`)[...e.listHotspots()].forEach(t=>e.destroyHotspot(t));else if(e._hotspots)for(;e._hotspots.length>0;)e.destroyHotspot(e._hotspots[0]);this.getHotspots().filter(e=>e.sceneId===this.currentSceneId).forEach(t=>{if(this.mode===`preview`&&(t.isActive===!1||t.status===`inactive`))return;let n=this.createEditorHotspotDOM(t);e.createHotspot(n,{yaw:t.yaw,pitch:t.pitch})})}createEditorHotspotDOM(e){let t=e.id===this.selectedHotspotId,n=e.type===`link`,r=this.mode===`preview`,i=document.createElement(`div`);if(i.className=`editor-hotspot-item ${n?`link-type`:`info-type`}`,t&&i.classList.add(`selected`),e.status===`draft`&&i.classList.add(`status-draft`),e.isActive===!1&&i.classList.add(`status-inactive`),i.setAttribute(`data-id`,e.id),n){let t=document.createElement(`img`);t.src=`/img/link.png`,t.className=`editor-hs-icon link-icon`;let n=e.rotation??0;t.style.transform=`rotate(${n}rad)`,i.appendChild(t);let r=document.createElement(`span`);r.className=`editor-hs-tooltip`,r.textContent=e.title||this.getSceneName(e.target),i.appendChild(r)}else{let t=document.createElement(`img`);t.src=`/img/info.png`,t.className=`editor-hs-icon info-icon`,i.appendChild(t);let n=document.createElement(`span`);n.className=`editor-hs-tooltip`,n.textContent=e.title||`Info`,i.appendChild(n)}if(!r){let t=document.createElement(`div`);t.className=`editor-hs-badge badge-${e.status||`published`}`,t.textContent=e.status===`draft`?`D`:e.isActive===!1?`OFF`:`✓`,i.appendChild(t)}return i.addEventListener(`click`,t=>{t.stopPropagation(),this.mode===`preview`?n&&e.target?this.setScene(e.target):alert(`[Informasi] ${e.title}\n\n${(e.text||``).replace(/<[^>]*>/g,``)}`):this.selectHotspot(e.id)}),this.attachDragEvents(i,e),i}attachDragEvents(e,t){let n=0,r=0,i=!1;e.addEventListener(`pointerdown`,e=>{if(this.mode===`preview`)return;e.stopPropagation(),this.isDragging=!0,i=!1,n=e.clientX,r=e.clientY;let a=document.getElementById(`admin-editor-pano`).getBoundingClientRect(),o=e=>{if(!this.isDragging)return;let o=e.clientX-n,s=e.clientY-r;if(Math.hypot(o,s)>5){i=!0;let n=e.clientX-a.left,r=e.clientY-a.top,o=this.currentView.screenToCoordinates({x:n,y:r});o&&(t.yaw=o.yaw,t.pitch=o.pitch,this.updateCoordinateInputsUI(o.yaw,o.pitch),this.renderHotspotsOnCurrentScene())}},s=()=>{document.removeEventListener(`pointermove`,o),document.removeEventListener(`pointerup`,s),setTimeout(()=>{this.isDragging=!1},50),i&&(this.saveHistorySnapshot(`Pindahkan Hotspot`),this.hasUnsavedChanges=!0,this.notifyHotspotsChanged(),this.showToast(`Posisi hotspot "${t.title||t.id}" berhasil diperbarui.`))};document.addEventListener(`pointermove`,o),document.addEventListener(`pointerup`,s)})}selectHotspot(e){this.selectedHotspotId=e;let t=this.getHotspots().find(t=>t.id===e);t&&(t.sceneId!==this.currentSceneId&&this.setScene(t.sceneId),this.renderHotspotsOnCurrentScene(),this.highlightListItem(e),this.openHotspotForm(t))}updateCoordinateInputsUI(e,t){let n=document.getElementById(`prop-yaw`),r=document.getElementById(`prop-pitch`);n&&(n.value=Number(e).toFixed(4)),r&&(r.value=Number(t).toFixed(4))}openHotspotForm(e){let t=document.getElementById(`editor-properties-panel`);if(!t)return;t.classList.remove(`empty-state`);let n=e.type===`link`,r=this.scenes.map(t=>`<option value="${t.id}" ${t.id===e.target?`selected`:``}>${t.name} (${t.id})</option>`).join(``);t.innerHTML=`
      <div class="prop-form-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="prop-type-badge ${n?`badge-link`:`badge-info`}">
            ${n?`🧭 Hotspot Navigasi`:`ℹ️ Hotspot Informasi`}
          </span>
          <span class="prop-id-label">ID: <code>${e.id}</code></span>
        </div>
        <button id="btn-close-prop-form" class="icon-btn-sm" title="Tutup Formulir">✕</button>
      </div>

      <form id="hotspot-properties-form" class="prop-form-body">
        <div class="form-group">
          <label for="prop-title">Judul / Nama Hotspot:</label>
          <input type="text" id="prop-title" class="form-input" value="${tl(e.title||``)}" required />
        </div>

        ${n?`
          <div class="form-group">
            <label for="prop-target">Scene Tujuan:</label>
            <select id="prop-target" class="form-select">
              ${r}
            </select>
          </div>
          <div class="form-group">
            <label for="prop-rotation">Rotasi Arah Panah (Derajat):</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="range" id="prop-rotation-slider" min="0" max="360" value="${Math.round((e.rotation||0)*180/Math.PI)}" style="flex: 1;" />
              <input type="number" id="prop-rotation" class="form-input" style="width: 70px;" value="${Math.round((e.rotation||0)*180/Math.PI)}" />
            </div>
          </div>
        `:`
          <div class="form-group">
            <label for="prop-info-source">Sumber Konten Informasi:</label>
            <select id="prop-info-source" class="form-select">
              <option value="manual" ${!e.infoSourceType||e.infoSourceType===`manual`?`selected`:``}>✏️ Konten Manual (Teks Bebas)</option>
              <option value="tree_species" ${e.infoSourceType===`tree_species`?`selected`:``}>🌿 Master Jenis Pohon (Data Dinamis)</option>
              <option value="planting_activity" ${e.infoSourceType===`planting_activity`?`selected`:``}>📋 Kelompok / Kegiatan Penanaman</option>
              <option value="latest_survey" ${e.infoSourceType===`latest_survey`?`selected`:``}>🔍 Pemantauan Terkini Kelompok Tanam</option>
            </select>
            <small style="color: var(--clr-text-dim); display: block; margin-top: 4px;">
              Pilih sumber informasi dari database penanaman pohon kawasan.
            </small>
          </div>

          <div class="form-group ${e.infoSourceType===`tree_species`?``:`hidden`}" id="group-select-tree-species">
            <label for="prop-tree-species">Pilih Spesies Pohon Terkait:</label>
            <select id="prop-tree-species" class="form-select">
              <option value="">-- Pilih Jenis Pohon --</option>
              ${this.cachedTreeSpeciesList.map(t=>`<option value="${t.id}" ${t.id==e.treeSpeciesId?`selected`:``}>${tl(t.common_name)} (${tl(t.scientific_name||``)})</option>`).join(``)}
            </select>
          </div>

          <div class="form-group ${e.infoSourceType===`planting_activity`||e.infoSourceType===`latest_survey`?``:`hidden`}" id="group-select-planting-activity">
            <label for="prop-planting-activity">Pilih Kelompok / Batch Penanaman:</label>
            <select id="prop-planting-activity" class="form-select">
              <option value="">-- Pilih Kelompok Penanaman --</option>
              ${this.cachedPlantingActivitiesList.map(t=>`<option value="${t.id}" ${t.id==e.plantingActivityId?`selected`:``}>[${tl(t.batch_code)}] ${tl(t.name)} (${tl(t.location_zone)})</option>`).join(``)}
            </select>
          </div>

          <div class="form-group" id="group-prop-desc">
            <label for="prop-desc">Deskripsi Informasi:</label>
            <textarea id="prop-desc" class="form-textarea" rows="4">${tl(e.text||e.rawText||``)}</textarea>
          </div>
        `}

        <div class="form-row">
          <div class="form-group" style="flex: 1;">
            <label for="prop-yaw">Koordinat Yaw (Rad):</label>
            <input type="number" step="0.001" id="prop-yaw" class="form-input" value="${Number(e.yaw).toFixed(4)}" />
          </div>
          <div class="form-group" style="flex: 1;">
            <label for="prop-pitch">Koordinat Pitch (Rad):</label>
            <input type="number" step="0.001" id="prop-pitch" class="form-input" value="${Number(e.pitch).toFixed(4)}" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group" style="flex: 1;">
            <label for="prop-status">Status Publikasi:</label>
            <select id="prop-status" class="form-select">
              <option value="draft" ${e.status===`draft`?`selected`:``}>📝 Draft (Belum Publik)</option>
              <option value="published" ${e.status===`published`?`selected`:``}>🚀 Published (Publik)</option>
              <option value="inactive" ${e.status===`inactive`?`selected`:``}>⏸️ Inactive (Nonaktif)</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1; display: flex; align-items: center; margin-top: 22px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="prop-active" ${e.isActive===!1?``:`checked`} />
              <span>Titik Aktif</span>
            </label>
          </div>
        </div>

        <div class="prop-form-actions">
          <button type="button" id="btn-apply-props" class="btn-primary-action btn-sm">
            💾 Perbarui
          </button>
          <button type="button" id="btn-duplicate-current" class="btn-secondary-action btn-sm" title="Gandakan titik ini">
            📋 Duplikasi
          </button>
          <button type="button" id="btn-delete-current" class="btn-danger-action btn-sm" title="Hapus titik ini">
            🗑️ Hapus
          </button>
        </div>
      </form>
    `;let i=document.getElementById(`hotspot-properties-form`),a=document.getElementById(`btn-apply-props`),o=document.getElementById(`btn-duplicate-current`),s=document.getElementById(`btn-delete-current`),c=document.getElementById(`btn-close-prop-form`),l=document.getElementById(`prop-rotation-slider`),u=document.getElementById(`prop-rotation`),d=document.getElementById(`prop-info-source`),f=document.getElementById(`group-select-tree-species`),p=document.getElementById(`group-select-planting-activity`);d&&d.addEventListener(`change`,e=>{let t=e.target.value;f&&f.classList.toggle(`hidden`,t!==`tree_species`),p&&p.classList.toggle(`hidden`,t!==`planting_activity`&&t!==`latest_survey`)}),l&&u&&(l.addEventListener(`input`,e=>{u.value=e.target.value}),u.addEventListener(`input`,e=>{l.value=e.target.value}));let m=()=>{this.saveHistorySnapshot(`Edit Pengaturan Hotspot`),e.title=document.getElementById(`prop-title`).value.trim(),e.yaw=parseFloat(document.getElementById(`prop-yaw`).value)||0,e.pitch=parseFloat(document.getElementById(`prop-pitch`).value)||0,e.status=document.getElementById(`prop-status`).value,e.isActive=document.getElementById(`prop-active`).checked,n?(e.target=document.getElementById(`prop-target`).value,e.rotation=parseFloat(u?.value||0)*Math.PI/180,e.infoSourceType=`manual`,e.treeSpeciesId=null,e.plantingActivityId=null):(e.text=document.getElementById(`prop-desc`)?.value||``,e.infoSourceType=d?.value||`manual`,e.treeSpeciesId=e.infoSourceType===`tree_species`&&parseInt(document.getElementById(`prop-tree-species`)?.value)||null,e.plantingActivityId=(e.infoSourceType===`planting_activity`||e.infoSourceType===`latest_survey`)&&parseInt(document.getElementById(`prop-planting-activity`)?.value)||null),this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.notifyHotspotsChanged(),this.showToast(`Perubahan hotspot diterapkan di memori.`)};a?.addEventListener(`click`,m),i?.addEventListener(`submit`,e=>{e.preventDefault(),m()}),o?.addEventListener(`click`,()=>{this.duplicateHotspot(e.id)}),s?.addEventListener(`click`,()=>{this.deleteHotspot(e.id)}),c?.addEventListener(`click`,()=>{this.selectedHotspotId=null,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),t.innerHTML=`
        <div class="prop-empty-notice">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>Pilih salah satu hotspot di panorama atau daftar untuk mengubah propertinya.</p>
        </div>
      `})}duplicateHotspot(e){let t=this.getHotspots().find(t=>t.id===e);if(!t)return;this.saveHistorySnapshot(`Duplikasi Hotspot`);let n=`hs_copy_${Date.now()}`,r=JSON.parse(JSON.stringify(t));r.id=n,r.title=`${t.title||`Hotspot`} (Salinan)`,r.yaw=(r.yaw||0)+.08,r.pitch=(r.pitch||0)+.01,r.status=`draft`,r.source=`editor`,this.getHotspots().push(r),this.selectedHotspotId=n,this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.openHotspotForm(r),this.notifyHotspotsChanged(),this.showToast(`Hotspot berhasil digandakan sebagai draft (${n})!`)}copyHotspotToClipboard(e){let t=this.getHotspots().find(t=>t.id===e);t&&(this.clipboardHotspot=JSON.parse(JSON.stringify(t)),this.showToast(`Hotspot "${t.title||t.id}" disalin ke papan klip.`))}pasteHotspotFromClipboard(){if(!this.clipboardHotspot){m.warning(`Papan Klip Kosong`,`Salin hotspot terlebih dahulu menggunakan tombol Salin.`);return}this.saveHistorySnapshot(`Tempel Hotspot`);let e=`hs_paste_${Date.now()}`,t=JSON.parse(JSON.stringify(this.clipboardHotspot));if(t.id=e,t.sceneId=this.currentSceneId,t.title=`${t.title} (Tempel)`,t.status=`draft`,t.source=`editor`,t.type===`link`&&t.target===this.currentSceneId){let e=this.scenes.find(e=>e.id!==this.currentSceneId);e&&(t.target=e.id)}this.getHotspots().push(t),this.selectedHotspotId=e,this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.openHotspotForm(t),this.notifyHotspotsChanged(),this.showToast(`Hotspot ditempelkan ke scene ${this.currentSceneId} sebagai draft.`)}deleteHotspot(e){let t=this.getHotspots().find(t=>t.id===e);if(!t||!confirm(`Apakah Anda yakin ingin menghapus hotspot "${t.title||t.id}"?`))return;this.saveHistorySnapshot(`Hapus Hotspot`);let n=this.getHotspots(),r=n.findIndex(t=>t.id===e);r!==-1&&n.splice(r,1),this.selectedHotspotId=null,this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList();let i=document.getElementById(`editor-properties-panel`);i&&(i.innerHTML=`
        <div class="prop-empty-notice">
          <p>Hotspot telah dihapus. Pilih hotspot lain untuk melihat detailnya.</p>
        </div>
      `),this.notifyHotspotsChanged(),this.showToast(`Hotspot berhasil dihapus.`)}saveHistorySnapshot(e=`Perubahan`){let t=JSON.stringify(this.getHotspots());this.historyStack.push(t),this.historyStack.length>30&&this.historyStack.shift(),this.redoStack=[],this.updateUndoRedoButtonsUI()}undo(){if(this.historyStack.length===0)return;let e=JSON.stringify(this.getHotspots());this.redoStack.push(e);let t=this.historyStack.pop(),n=JSON.parse(t),r=this.getHotspots();r.length=0,n.forEach(e=>r.push(e)),this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.updateUndoRedoButtonsUI(),this.notifyHotspotsChanged(),this.showToast(`Undo: Perubahan terakhir dibatalkan.`)}redo(){if(this.redoStack.length===0)return;let e=JSON.stringify(this.getHotspots());this.historyStack.push(e);let t=this.redoStack.pop(),n=JSON.parse(t),r=this.getHotspots();r.length=0,n.forEach(e=>r.push(e)),this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.updateUndoRedoButtonsUI(),this.notifyHotspotsChanged(),this.showToast(`Redo: Perubahan dikembalikan.`)}updateUndoRedoButtonsUI(){let e=document.getElementById(`tool-undo`),t=document.getElementById(`tool-redo`);e&&(e.disabled=this.historyStack.length===0),t&&(t.disabled=this.redoStack.length===0)}async saveToServer(e=!1){let t=this.getHotspots();e&&t.forEach(e=>{e.status===`draft`&&(e.status=`published`)});let n=document.getElementById(`btn-editor-save-draft`),r=document.getElementById(`btn-editor-publish`);n&&(n.disabled=!0),r&&(r.disabled=!0);try{let n=await Z.saveHotspots(t);this.hasUnsavedChanges=!1,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.notifyHotspotsChanged(),e?m.published(n?.message||`Seluruh hotspot berhasil dipublikasikan!`):m.saved(n?.message||`Perubahan hotspot berhasil disimpan ke server.`)}catch(e){console.error(`Gagal menyimpan:`,e),m.error(`✕ Gagal menyimpan ke server`,e.message||`Perubahan tetap tersimpan sementara di memori browser.`)}finally{n&&(n.disabled=!1),r&&(r.disabled=!1)}}renderHotspotsList(){let e=document.getElementById(`editor-hotspots-table`),t=document.getElementById(`editor-filter-count`);if(!e)return;let n=[...this.getHotspots()];if(this.filterScene!==`all`&&(n=n.filter(e=>e.sceneId===this.filterScene)),this.filterType!==`all`&&(n=n.filter(e=>e.type===this.filterType)),this.filterStatus!==`all`&&(n=n.filter(e=>e.status===this.filterStatus)),this.searchQuery){let e=this.searchQuery.toLowerCase();n=n.filter(t=>{let n=(t.title||``).toLowerCase().includes(e),r=(t.text||``).toLowerCase().includes(e),i=(t.target||``).toLowerCase().includes(e);return n||r||i})}t&&(t.textContent=`${n.length} Hotspot`),n.length===0?e.innerHTML=`
        <div class="list-empty-msg">
          Tidak ada hotspot yang cocok dengan filter atau pencarian.
        </div>
      `:(e.innerHTML=n.map(e=>{let t=e.id===this.selectedHotspotId,n=e.sceneId===this.currentSceneId,r=this.getSceneName(e.sceneId);return`
          <div class="hs-list-row ${t?`active-row`:``}" data-id="${e.id}">
            <div class="hs-row-left">
              <span class="hs-type-indicator ${e.type===`link`?`type-link`:`type-info`}">
                ${e.type===`link`?`🧭`:`ℹ️`}
              </span>
              <div class="hs-row-info">
                <div class="hs-row-title">${tl(e.title||e.id)}</div>
                <div class="hs-row-scene">
                  <span>${r}</span>
                  ${e.type===`link`?`<span>→ Menuju: ${this.getSceneName(e.target)}</span>`:``}
                </div>
              </div>
            </div>

            <div class="hs-row-right">
              <span class="hs-status-pill pill-${e.status||`published`}">
                ${e.status||`published`}
              </span>
              <button class="btn-row-action btn-row-select" data-id="${e.id}" title="Pilih & Buka">
                ${n?`Buka`:`Lompat`}
              </button>
            </div>
          </div>
        `}).join(``),e.querySelectorAll(`.hs-list-row`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);this.selectHotspot(t)})}))}highlightListItem(e){document.querySelectorAll(`.hs-list-row`).forEach(t=>{t.classList.toggle(`active-row`,t.getAttribute(`data-id`)===e)})}bindToolbarEvents(){document.getElementById(`tool-select`)?.addEventListener(`click`,()=>this.setMode(`select`)),document.getElementById(`tool-add-link`)?.addEventListener(`click`,()=>this.setMode(`add-link`)),document.getElementById(`tool-add-info`)?.addEventListener(`click`,()=>this.setMode(`add-info`)),document.getElementById(`tool-move`)?.addEventListener(`click`,()=>this.setMode(`move`)),document.getElementById(`tool-preview`)?.addEventListener(`click`,()=>{this.setMode(this.mode===`preview`?`select`:`preview`)}),document.getElementById(`tool-undo`)?.addEventListener(`click`,()=>this.undo()),document.getElementById(`tool-redo`)?.addEventListener(`click`,()=>this.redo()),document.getElementById(`tool-duplicate`)?.addEventListener(`click`,()=>{this.selectedHotspotId?this.duplicateHotspot(this.selectedHotspotId):m.warning(`Peringatan`,`Pilih salah satu hotspot terlebih dahulu untuk digandakan.`)}),document.getElementById(`tool-copy`)?.addEventListener(`click`,()=>{this.selectedHotspotId?this.copyHotspotToClipboard(this.selectedHotspotId):m.warning(`Peringatan`,`Pilih salah satu hotspot terlebih dahulu untuk disalin.`)}),document.getElementById(`tool-paste`)?.addEventListener(`click`,()=>{this.pasteHotspotFromClipboard()}),document.getElementById(`tool-delete`)?.addEventListener(`click`,()=>{this.selectedHotspotId?this.deleteHotspot(this.selectedHotspotId):m.warning(`Peringatan`,`Pilih hotspot yang ingin dihapus.`)}),document.getElementById(`btn-editor-save-draft`)?.addEventListener(`click`,()=>{this.saveToServer(!1)}),document.getElementById(`btn-editor-publish`)?.addEventListener(`click`,()=>{confirm(`Publikasikan seluruh perubahan hotspot agar dapat langsung dilihat oleh pengunjung?`)&&this.saveToServer(!0)});let e=document.getElementById(`editor-scene-select`);e&&e.addEventListener(`change`,e=>{this.setScene(e.target.value)})}bindFormEvents(){document.getElementById(`btn-editor-revert`)?.addEventListener(`click`,async()=>{if(confirm(`Batalkan seluruh perubahan yang belum disimpan dan muat ulang dari server?`)){let e=await Z.getHotspots(),t=this.getHotspots();t.length=0,e.forEach(e=>t.push(e)),this.hasUnsavedChanges=!1,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.notifyHotspotsChanged(),this.showToast(`Data dikembalikan ke versi server.`)}})}bindSearchFilterEvents(){let e=document.getElementById(`editor-search-input`),t=document.getElementById(`editor-filter-scene`),n=document.getElementById(`editor-filter-type`),r=document.getElementById(`editor-filter-status`);e?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim(),this.renderHotspotsList()}),t?.addEventListener(`change`,e=>{this.filterScene=e.target.value,this.renderHotspotsList()}),n?.addEventListener(`change`,e=>{this.filterType=e.target.value,this.renderHotspotsList()}),r?.addEventListener(`change`,e=>{this.filterStatus=e.target.value,this.renderHotspotsList()})}notifyHotspotsChanged(){this.onHotspotsChanged&&this.onHotspotsChanged(this.getHotspots())}showToast(e){typeof e==`string`?e.includes(`berhasil`)||e.includes(`diterapkan`)?m.success(`✓ Berhasil`,e):e.includes(`Gagal`)||e.includes(`gagal`)?m.error(`✕ Gagal`,e):m.info(`Informasi Hotspot`,e):m.show(e)}};function tl(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function nl({scenes:e,getHotspots:t,onRestoreComplete:n}){let r=document.getElementById(`admin-backup-content`);if(!r)return;let i=new Set(e.map(e=>e.id));r.innerHTML=`
    <div class="backup-grid">
      <!-- Card Ekspor Cadangan -->
      <div class="backup-card">
        <div class="backup-card-header">
          <div class="backup-icon">📥</div>
          <div>
            <h3>Ekspor Cadangan Konfigurasi Hotspot</h3>
            <p>Unduh seluruh data hotspot navigasi dan informasi dalam berkas JSON mandiri.</p>
          </div>
        </div>

        <div class="backup-card-body">
          <p>
            Berkas cadangan mencakup seluruh koordinat bola (yaw & pitch), status draft/published, judul, target navigasi, dan konten informasi saat ini.
          </p>
          <div class="backup-info-box">
            <strong>Catatan Penting:</strong> Cadangan ini berisi metadata konfigurasi hotspot, bukan file gambar tile panorama asli yang tersimpan di direktori server.
          </div>
          <button id="btn-export-json" class="btn-primary-action" style="margin-top: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Unduh Cadangan JSON Sekarang
          </button>
        </div>
      </div>

      <!-- Card Pemulihan Cadangan -->
      <div class="backup-card">
        <div class="backup-card-header">
          <div class="backup-icon">📤</div>
          <div>
            <h3>Pemulihan (Impor) Konfigurasi Hotspot</h3>
            <p>Pulihkan titik hotspot dari berkas cadangan JSON yang valid.</p>
          </div>
        </div>

        <div class="backup-card-body">
          <p>Pilih file cadangan JSON dari perangkat Anda. Sistem akan memvalidasi kompatibilitas scene sebelum menerapkannya.</p>

          <div class="backup-dropzone" id="backup-dropzone">
            <input type="file" id="backup-file-input" accept=".json,application/json" style="display: none;" />
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9M8 17l4-4 4 4"/>
            </svg>
            <p>Seret dan lepas file JSON di sini, atau <button type="button" class="btn-text-link" id="btn-browse-file">Pilih Berkas</button></p>
            <span class="file-hint">Format yang didukung: JSON Cadangan Marzipano Hotspot</span>
          </div>

          <!-- Preview & Validation Area -->
          <div id="import-validation-box" class="import-validation-box hidden">
            <h4>Hasil Validasi Berkas Cadangan:</h4>
            <div id="import-validation-summary" class="val-summary"></div>
            <div class="val-actions">
              <button id="btn-confirm-import" class="btn-primary-action btn-sm">Terapkan Pemulihan</button>
              <button id="btn-cancel-import" class="btn-secondary-action btn-sm">Batal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,r.querySelector(`#btn-export-json`)?.addEventListener(`click`,async()=>{try{let e=await Z.exportBackup(),t=JSON.stringify(e,null,2),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`),a=`marzipano_hotspots_backup_${new Date().toISOString().slice(0,10)}.json`;i.href=r,i.download=a,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r),m.saved(`Data cadangan berhasil diekspor.`)}catch(e){m.error(`✕ Gagal mengekspor data cadangan`,e.message)}});let a=r.querySelector(`#backup-file-input`),o=r.querySelector(`#btn-browse-file`),s=r.querySelector(`#backup-dropzone`),c=r.querySelector(`#import-validation-box`),l=r.querySelector(`#import-validation-summary`),u=r.querySelector(`#btn-confirm-import`),d=r.querySelector(`#btn-cancel-import`),f=null;o?.addEventListener(`click`,()=>a?.click()),s?.addEventListener(`dragover`,e=>{e.preventDefault(),s.classList.add(`drag-over`)}),s?.addEventListener(`dragleave`,()=>{s.classList.remove(`drag-over`)}),s?.addEventListener(`drop`,e=>{e.preventDefault(),s.classList.remove(`drag-over`),e.dataTransfer.files.length>0&&p(e.dataTransfer.files[0])}),a?.addEventListener(`change`,e=>{e.target.files.length>0&&p(e.target.files[0])});function p(e){if(!e.name.endsWith(`.json`)){m.error(`✕ Format berkas tidak valid`,`Hanya berkas berformat .json yang dapat dipulihkan.`);return}let t=new FileReader;t.onload=e=>{try{h(JSON.parse(e.target.result))}catch(e){m.error(`✕ Format JSON tidak valid`,e.message)}},t.readAsText(e)}function h(e){let n=[];if(Array.isArray(e.hotspots))n=e.hotspots;else if(e.data&&Array.isArray(e.data.hotspots))n=e.data.hotspots;else{m.error(`✕ Struktur berkas tidak valid`,`Tidak ditemukan array hotspots pada berkas JSON.`);return}let r=0,a=new Set,o=0,s=t(),u=new Set(s.map(e=>e.id)),d=0;n.forEach(e=>{i.has(e.sceneId)?r++:a.add(e.sceneId),e.type===`link`&&!i.has(e.target)&&o++,u.has(e.id)&&d++}),f=e,l.innerHTML=`
      <ul class="val-list">
        <li><strong>Total Hotspot Ditemukan:</strong> ${n.length} titik</li>
        <li><strong>Hotspot dengan Scene Cocok:</strong> ${r} titik</li>
        ${a.size>0?`<li class="val-warn">⚠️ <strong>Scene Tidak Dikenal:</strong> ${Array.from(a).join(`, `)}</li>`:`<li class="val-ok">✓ Semua ID scene asal terdaftar pada sistem.</li>`}
        ${o>0?`<li class="val-warn">⚠️ <strong>Target Navigasi Tidak Dikenal:</strong> ${o} titik</li>`:`<li class="val-ok">✓ Semua tujuan navigasi valid.</li>`}
        <li><strong>ID yang Tumpang Tindih (Akan diperbarui):</strong> ${d} titik</li>
      </ul>
      <p style="font-size: 13px; color: var(--clr-text-muted); margin-top: 8px;">
        Menerapkan cadangan ini akan memperbarui dataset hotspot di server. Lanjutkan?
      </p>
    `,c.classList.remove(`hidden`)}u?.addEventListener(`click`,async()=>{if(f)try{u.disabled=!0,u.textContent=`Memulihkan...`;let e=await Z.importBackup(f);m.imported(e?.message||`Pemulihan cadangan berhasil diterapkan!`),c.classList.add(`hidden`),f=null,n&&n()}catch(e){m.error(`✕ Gagal memulihkan cadangan`,e.message)}finally{u.disabled=!1,u.textContent=`Terapkan Pemulihan`}}),d?.addEventListener(`click`,()=>{c.classList.add(`hidden`),f=null,a&&(a.value=``)})}var rl=`vtour_display_settings`,il={defaultScene:`0-1-pano_20261004_100402_6`,autorotate:!1,autorotateSpeed:1,hotspotAnimation:`pulse`,showTooltipsByDefault:!0,themeAccent:`#2ecc71`};function al(){try{let e=localStorage.getItem(rl);return e?{...il,...JSON.parse(e)}:{...il}}catch{return{...il}}}function ol(e){localStorage.setItem(rl,JSON.stringify(e))}async function sl({scenes:e=[],onSettingsUpdated:t}={}){let n=document.getElementById(`admin-settings-content`);if(!n)return;let r=al(),i={};try{i=(await Z.getSettings()).flat||{}}catch(e){console.warn(`Gagal memuat settings dari server:`,e)}let a=e.map(e=>`<option value="${e.id}" ${e.id===r.defaultScene?`selected`:``}>${e.name} (${e.id})</option>`).join(``);n.innerHTML=`
    <div class="settings-container" style="max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
      <div class="admin-section-header">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span>⚙️</span> Pengaturan Sistem & Identitas Organisasi
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Konfigurasi identitas pengelola, judul proyek, parameter visual Marzipano, dan parameter aplikasi.
          </p>
        </div>
      </div>

      <!-- KARTU 0: LOGO APLIKASI -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          🖼️ Logo Aplikasi & Header
        </h3>
        <p style="color: var(--clr-text-muted); font-size: 12px; margin-top: -6px; margin-bottom: 16px; line-height: 1.5;">
          Unggah logo resmi proyek/organisasi untuk ditampilkan pada bilah navigasi (Header) dan Footer. Format yang didukung: PNG, SVG, JPG, WebP (maks. 2 MB).
        </p>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
          <!-- Logo Preview Box -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div id="logo-preview-box" class="brand-logo-icon" style="width: 72px; height: 72px; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #10b981 0%, #047857 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35); border: 1px solid rgba(255, 255, 255, 0.2);">
              ${i.app_logo?`
                <img id="logo-preview-img" src="${cl(i.app_logo)}" alt="Logo Aplikasi" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;" />
              `:`
                <svg id="logo-preview-svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #fff;">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              `}
            </div>
            <span style="font-size: 11px; color: var(--clr-text-muted);">Pratinjau Logo</span>
          </div>

          <!-- Upload Controls -->
          <div style="flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 12px;">
            <form id="logo-upload-form" style="display: flex; flex-direction: column; gap: 12px;">
              <input type="file" id="input-app-logo" accept="image/png,image/jpeg,image/svg+xml,image/webp" style="display: none;" />
              <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
                <button type="button" id="btn-select-logo" class="btn-secondary-action btn-sm" style="display: flex; align-items: center; gap: 6px;">
                  📁 Pilih Berkas Logo...
                </button>
                <button type="submit" id="btn-upload-logo" class="btn-primary-action btn-sm" disabled style="display: flex; align-items: center; gap: 6px;">
                  ⬆️ Unggah Logo
                </button>
                <button type="button" id="btn-remove-logo" class="btn-danger-action btn-sm" style="display: ${i.app_logo?`flex`:`none`}; align-items: center; gap: 6px; padding: 7px 12px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); color: #ef4444; border-radius: 6px; cursor: pointer;">
                  🗑️ Reset ke Default
                </button>
              </div>
              <span id="selected-logo-name" style="font-size: 12px; color: var(--clr-primary-light); font-family: monospace;">
                ${i.app_logo?`Logo aktif terpasang: `+i.app_logo.split(`/`).pop():`Menggunakan logo bawaan vektor SVG`}
              </span>
            </form>
          </div>
        </div>
      </div>

      <!-- KARTU 1: IDENTITAS ORGANISASI -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          🏢 Identitas Organisasi & Kontak
        </h3>
        <form id="org-settings-form">
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="set-org-name" style="color: #fff; font-size: 13px;">Nama Organisasi / Pengelola Proyek: *</label>
            <input type="text" id="set-org-name" class="form-input" required value="${cl(i.org_name||`IKHW Aceh (Inisiatif Konservasi & Hutan Wakaf)`)}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 14px;">
            <div class="form-group">
              <label for="set-org-email" style="color: #fff; font-size: 13px;">Email Kontak Resmi:</label>
              <input type="email" id="set-org-email" class="form-input" value="${cl(i.org_contact_email||`info@ikhw.org`)}" />
            </div>
            <div class="form-group">
              <label for="set-app-title" style="color: #fff; font-size: 13px;">Judul Sistem / Header:</label>
              <input type="text" id="set-app-title" class="form-input" value="${cl(i.app_title||`Eco Land — Kawasan Penanaman Pohon & Virtual Tour 360°`)}" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label for="set-org-address" style="color: #fff; font-size: 13px;">Alamat Kantor Organisasi:</label>
            <textarea id="set-org-address" class="form-input" rows="2">${cl(i.org_address||`Banda Aceh, Provinsi Aceh, Indonesia`)}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" class="btn-primary-action btn-sm">
              💾 Simpan Identitas Organisasi
            </button>
          </div>
        </form>
      </div>

      <!-- KARTU 2: DESKRIPSI PROGRAM DAN KAWASAN -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          📝 Deskripsi Program dan Kawasan
        </h3>
        <p style="color: var(--clr-text-muted); font-size: 12px; margin-top: -6px; margin-bottom: 14px; line-height: 1.5;">
          Deskripsi ini tampil pada halaman Beranda (Hero Banner) dan Informasi Kawasan (Gambaran Umum & Lokasi Referensi).
        </p>
        <form id="program-desc-form">
          <div class="form-group" style="margin-bottom: 16px;">
            <label for="set-program-description" style="color: #fff; font-size: 13px; font-weight: 600;">Deskripsi Program/Kawasan: *</label>
            <textarea id="set-program-description" class="form-input" rows="5" required style="line-height: 1.6; resize: vertical;" placeholder="Tulis deskripsi program dan kawasan restorasi...">${cl(i.program_description||`Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.`)}</textarea>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <button type="button" id="btn-cancel-program-desc" class="btn-secondary-action btn-sm">
              Batal
            </button>
            <button type="submit" class="btn-primary-action btn-sm">
              💾 Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      <!-- KARTU 2: PENGATURAN VIRTUAL TOUR & TAMPILAN -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          🌐 Pengaturan Tampilan Virtual Tour 360°
        </h3>
        <form id="display-settings-form">
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="set-default-scene" style="color: #fff; font-size: 13px;">Panorama Pembuka Utama (Default Scene):</label>
            <select id="set-default-scene" class="form-select">
              ${a}
            </select>
            <small class="form-help-text" style="color: var(--clr-text-muted); font-size: 11px;">Panorama yang pertama kali dimuat saat pengunjung membuka menu Virtual Tour 360°.</small>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label for="set-animation" style="color: #fff; font-size: 13px;">Animasi Hotspot Marzipano:</label>
            <select id="set-animation" class="form-select">
              <option value="pulse" ${r.hotspotAnimation===`pulse`?`selected`:``}>Pulsing Glow (Berdenyut Halus)</option>
              <option value="bounce" ${r.hotspotAnimation===`bounce`?`selected`:``}>Floating Bob (Melayang)</option>
              <option value="static" ${r.hotspotAnimation===`static`?`selected`:``}>Statis Sederhana</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 18px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #fff; font-size: 13px;">
              <input type="checkbox" id="set-tooltips" ${r.showTooltipsByDefault?`checked`:``} />
              <span>Tampilkan label tooltip nama lokasi pada hotspot navigasi secara langsung</span>
            </label>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button type="button" id="btn-reset-settings" class="btn-secondary-action btn-sm">
              Kembalikan ke Default
            </button>
            <button type="submit" class="btn-primary-action btn-sm">
              💾 Simpan Pengaturan Tampilan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;let o=n.querySelector(`#input-app-logo`),s=n.querySelector(`#btn-select-logo`),c=n.querySelector(`#btn-upload-logo`),l=n.querySelector(`#btn-remove-logo`),u=n.querySelector(`#logo-upload-form`),d=n.querySelector(`#logo-preview-box`),f=n.querySelector(`#selected-logo-name`);s?.addEventListener(`click`,()=>{o?.click()}),o?.addEventListener(`change`,()=>{let e=o.files?.[0];if(!e)return;if(e.size>2097152){m.error(`Ukuran File Terlalu Besar`,`Ukuran logo maksimal 2 MB.`),o.value=``,c&&(c.disabled=!0);return}f&&(f.textContent=`Berkas dipilih: ${e.name} (${(e.size/1024).toFixed(1)} KB)`),c&&(c.disabled=!1);let t=new FileReader;t.onload=e=>{d&&(d.innerHTML=`<img src="${e.target.result}" alt="Pratinjau Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;" />`)},t.readAsDataURL(e)}),u?.addEventListener(`submit`,async e=>{e.preventDefault();let t=o.files?.[0];if(!t){m.error(`Pilih Berkas`,`Silakan pilih berkas logo terlebih dahulu.`);return}let n=new FormData;n.append(`logo`,t),c&&(c.disabled=!0,c.textContent=`Mengunggah...`);try{let e=await Z.uploadLogo(n);i.app_logo=e.logo_url,m.saved(e.message||`Logo aplikasi berhasil diunggah.`),l&&(l.style.display=`flex`),f&&(f.textContent=`Logo aktif terpasang: `+e.logo_url.split(`/`).pop()),o.value=``,ll(e.logo_url)}catch(e){m.error(`✕ Gagal Mengunggah Logo`,e.message)}finally{c&&(c.disabled=!0,c.textContent=`⬆️ Unggah Logo`)}}),l?.addEventListener(`click`,async()=>{if(confirm(`Kembalikan logo aplikasi ke ikon default bawaan?`)){l.disabled=!0,l.textContent=`Mereset...`;try{let e=await Z.removeLogo();i.app_logo=``,m.updated(e.message||`Logo aplikasi telah dikembalikan ke default.`),l.style.display=`none`,f&&(f.textContent=`Menggunakan logo bawaan vektor SVG`),d&&(d.innerHTML=`
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #fff;">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        `),o.value=``,ll(``)}catch(e){m.error(`✕ Gagal Mereset Logo`,e.message)}finally{l.disabled=!1,l.textContent=`🗑️ Reset ke Default`}}});let p=n.querySelector(`#org-settings-form`);p?.addEventListener(`submit`,async e=>{e.preventDefault();let t={org_name:n.querySelector(`#set-org-name`).value.trim(),org_contact_email:n.querySelector(`#set-org-email`).value.trim(),app_title:n.querySelector(`#set-app-title`).value.trim(),org_address:n.querySelector(`#set-org-address`).value.trim()},r=p.querySelector(`button[type="submit"]`);r&&(r.disabled=!0,r.textContent=`Menyimpan...`);try{let e=await Z.saveSettings(t);m.saved(e?.message||`Identitas organisasi berhasil disimpan ke database.`)}catch(e){m.error(`✕ Gagal menyimpan identitas`,e.message)}finally{r&&(r.disabled=!1,r.textContent=`💾 Simpan Identitas Organisasi`)}});let h=n.querySelector(`#program-desc-form`),g=n.querySelector(`#btn-cancel-program-desc`),_=n.querySelector(`#set-program-description`),v=i.program_description||`Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.`;g?.addEventListener(`click`,()=>{_&&(_.value=v,m.info(`Perubahan deskripsi dibatalkan.`))}),h?.addEventListener(`submit`,async e=>{e.preventDefault();let t=_?.value?.trim();if(!t){m.error(`Validasi Gagal`,`Deskripsi program/kawasan tidak boleh kosong.`);return}let n=h.querySelector(`button[type="submit"]`);n&&(n.disabled=!0,n.textContent=`Menyimpan...`);try{let e=await Z.saveSettings({program_description:t});i.program_description=t,m.saved(e?.message||`Deskripsi program dan kawasan berhasil disimpan.`);let n=document.getElementById(`hero-desc`);n&&(n.textContent=t);let r=document.getElementById(`info-general-desc`);r&&(r.textContent=t)}catch(e){m.error(`✕ Gagal menyimpan deskripsi`,e.message)}finally{n&&(n.disabled=!1,n.textContent=`💾 Simpan Perubahan`)}});let y=n.querySelector(`#display-settings-form`),b=n.querySelector(`#btn-reset-settings`);y?.addEventListener(`submit`,e=>{e.preventDefault();let i={...r,defaultScene:n.querySelector(`#set-default-scene`).value,hotspotAnimation:n.querySelector(`#set-animation`).value,showTooltipsByDefault:n.querySelector(`#set-tooltips`).checked};ol(i),m.saved(`Pengaturan tampilan berhasil disimpan.`),t&&t(i)}),b?.addEventListener(`click`,()=>{confirm(`Kembalikan seluruh pengaturan tampilan ke pengaturan default?`)&&(ol(il),m.updated(`Pengaturan tampilan berhasil dikembalikan ke default.`),sl({scenes:e,onSettingsUpdated:t}),t&&t(il))})}function cl(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}function ll(e){document.querySelectorAll(`.brand-logo-icon`).forEach(t=>{t.id!==`logo-preview-box`&&(t.innerHTML=e?`<img src="${cl(e)}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`:`
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      `)})}function ul(e){if(!e)return``;if(e instanceof Date)return isNaN(e.getTime())?``:`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`;let t=String(e).trim();if(!t||t===`dd/mm/yyyy`||t===`-`)return``;let n=t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);if(n)return`${n[1]}-${n[2].padStart(2,`0`)}-${n[3].padStart(2,`0`)}`;let r=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(r){let e=r[1].padStart(2,`0`),t=r[2].padStart(2,`0`);return`${r[3]}-${t}-${e}`}return``}function dl(e,t=`-`){if(!e)return t;let n=ul(e);if(!n)return t;let[r,i,a]=n.split(`-`);return`${a}/${i}/${r}`}function fl(e){return e&&ul(e)||null}var pl=`dashboard`,ml=[],hl=[],gl=[],_l=[];async function vl({scenes:e=[]}={}){_l=e;let t=document.getElementById(`admin-trees-content`);t&&(bl(t,e),await xl(pl,e))}async function yl(e,t=[]){t&&t.length>0&&(_l=t),pl=e;let n=document.getElementById(`admin-trees-content`);n&&(document.getElementById(`tree-subpane-content`)||bl(n,t),n.querySelectorAll(`.tree-tab-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-tree-tab`)===e)}),await xl(e,t))}function bl(e,t){e.innerHTML=`
    <div class="admin-section-header" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 24px;">🌱</span> Data Penanaman & Pemantauan Pohon
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Dokumentasi jenis pohon, bibit tertanam, kelompok batch, survei pemantauan historis, dan tindakan silvikultur kawasan ±2 hektare.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="#katalog" class="btn-secondary-action btn-sm" style="text-decoration: none;">
            🌳 Katalog Publik Pohon →
          </a>
        </div>
      </div>
    </div>

    <!-- Tree Module Sub-tabs -->
    <div class="tree-subtabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px; margin-bottom: 20px; overflow-x: auto;">
      <button class="tree-tab-btn active" data-tree-tab="dashboard">📊 Dashboard</button>
      <button class="tree-tab-btn" data-tree-tab="species">🌿 Master Jenis Pohon</button>
      <button class="tree-tab-btn" data-tree-tab="activities">📋 Kegiatan Penanaman</button>
      <button class="tree-tab-btn" data-tree-tab="surveys">🔍 Pemantauan Tanaman</button>
      <button class="tree-tab-btn" data-tree-tab="maintenance">🛠️ Perawatan & Penyulaman</button>
      <button class="tree-tab-btn" data-tree-tab="reports">📑 Laporan</button>
      <button class="tree-tab-btn" data-tree-tab="import-export">🔄 Impor & Ekspor</button>
    </div>

    <!-- Tree Subpane Content Area -->
    <div id="tree-subpane-content" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px;">
        <span class="loading-spinner"></span> Memuat data penanaman...
      </div>
    </div>
  `,e.querySelectorAll(`.tree-tab-btn`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=n.getAttribute(`data-tree-tab`);pl=r,e.querySelectorAll(`.tree-tab-btn`).forEach(e=>e.classList.toggle(`active`,e===n)),await xl(r,t)})})}async function xl(e,t){let n=document.getElementById(`tree-subpane-content`);if(n)try{e===`dashboard`?await Sl(n):e===`species`?await Cl(n):e===`activities`?await Dl(n,t):e===`surveys`?await jl(n):e===`maintenance`?await Nl(n):e===`reports`?Fl(n):e===`import-export`&&Il(n)}catch(e){n.innerHTML=`
      <div class="alert-banner alert-danger" style="margin: 20px 0;">
        ⚠️ Terjadi kesalahan saat memuat modul: ${Q(e.message)}
      </div>
    `}}async function Sl(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat indikator penanaman...</div>`;let t=await Z.getTreeDashboard(),n=t.indicators||{},r=t.needs_inspection||[],i=t.charts?.species_distribution||[],a=n.survival_rate===null?`Data Belum Lengkap`:`${n.survival_rate}%`,o=n.survival_rate===null?`pill-neutral`:n.survival_rate>=80?`pill-success`:n.survival_rate>=60?`pill-warning`:`pill-danger`;e.innerHTML=`
    <!-- Top KPI Grid: 7 Indikator Utama + Kelangsungan Hidup -->
    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
      <div class="stat-card">
        <span class="stat-label">Total Kawasan Aktif</span>
        <span class="stat-value" style="color: #38bdf8;">${n.total_zones||0}</span>
        <span class="stat-desc">Kawasan penanaman terdaftar</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Jenis Pohon</span>
        <span class="stat-value">${n.total_species||0}</span>
        <span class="stat-desc">Spesies kayu & buah hutan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kegiatan Penanaman</span>
        <span class="stat-value" style="color: #60a5fa;">${n.total_activities||0}</span>
        <span class="stat-desc">Batch penanaman lapangan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Bibit Awal</span>
        <span class="stat-value" style="color: var(--clr-primary, #10b981);">${n.total_initial_seedlings?.toLocaleString()||0}</span>
        <span class="stat-desc">Bibit kelompok awal historis</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kelompok Dipantau</span>
        <span class="stat-value" style="color: #a78bfa;">${n.monitored_batches_count||0}</span>
        <span class="stat-desc">Sudah memiliki data survei</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Scene Panorama</span>
        <span class="stat-value">${n.total_scenes||0}</span>
        <span class="stat-desc">Titik foto 360° Marzipano</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Hotspot Terdaftar</span>
        <span class="stat-value">${n.total_hotspots||0}</span>
        <span class="stat-desc">Navigasi & info lapangan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kelangsungan Hidup</span>
        <span class="stat-value"><span class="admin-header-pill ${o}" style="font-size: 16px; padding: 3px 8px;">${a}</span></span>
        <span class="stat-desc">Hidup Awal ÷ Bibit Awal</span>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-bottom: 24px;">
      <!-- Distribusi Spesies -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          🌳 Distribusi Bibit per Jenis Pohon
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${i.length>0?i.map(e=>`
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
                  <span style="font-weight: 500;">${Q(e.common_name)} <i>(${Q(e.scientific_name)})</i></span>
                  <span style="font-weight: 600;">${e.total_planted} bibit</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                  <div style="background: var(--clr-primary, #10b981); height: 100%; width: ${Math.min(100,e.total_planted/Math.max(1,n.total_initial_seedlings)*100)}%;"></div>
                </div>
              </div>
            `).join(``):`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada bibit tercatat.</p>`}
        </div>
      </div>

      <!-- Distribusi menurut Kawasan -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          📍 Distribusi Penanaman Menurut Kawasan
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${t.charts?.zone_distribution&&t.charts.zone_distribution.length>0?t.charts.zone_distribution.map(e=>`
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
                    <span style="font-weight: 500;">${Q(e.name)} <code style="font-size:11px;color:#38bdf8;">(${Q(e.zone_code)})</code></span>
                    <span style="font-weight: 600;">${Number(e.total_planted).toLocaleString(`id-ID`)} bibit</span>
                  </div>
                  <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: #38bdf8; height: 100%; width: ${Math.min(100,e.total_planted/Math.max(1,n.total_initial_seedlings)*100)}%;"></div>
                  </div>
                </div>
              `).join(``):`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada bibit terdistribusi ke kawasan.</p>`}
        </div>
      </div>
    </div>

    <!-- Kelompok Perlu Pemeriksaan & Aktivitas Terkini -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-bottom: 24px;">
      <!-- Kelompok Perlu Pemeriksaan -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          ⚠️ Kelompok Perlu Survei Ulang (${r.length})
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto;">
          ${r.length>0?r.map(e=>`
              <div style="padding: 10px 12px; background: rgba(255,255,255,0.03); border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; font-weight: 500;">
                  <span>${Q(e.batch_code)} — ${Q(e.name)}</span>
                  <span style="color: #f59e0b;">${e.survival_rate===null?`Belum Survei`:e.survival_rate+`%`}</span>
                </div>
                <div style="font-size: 12px; color: var(--clr-text-muted); margin-top: 3px;">
                  📍 ${Q(e.location_zone)} • ${Q(e.reason)}
                </div>
              </div>
            `).join(``):`<p style="color: var(--clr-primary, #10b981); font-size: 13px;">✓ Semua kelompok penanaman dalam kondisi pemantauan baik.</p>`}
        </div>
      </div>

      <!-- Riwayat Survei Terkini -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          📋 Survei Pemantauan Terkini
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto;">
          ${t.recent_surveys&&t.recent_surveys.length>0?t.recent_surveys.map(e=>`
                <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 4px; font-size: 12px;">
                  <div style="display: flex; justify-content: space-between;">
                    <strong>${Q(e.batch_code||`-`)}</strong>
                    <span style="color: #94a3b8;">📅 ${dl(e.survey_date)}</span>
                  </div>
                  <div style="color: #cbd5e1; margin-top: 2px;">
                    Hidup: <strong style="color: #34d399;">${e.alive_count} btg</strong> • Kondisi: ${Q(e.health_condition||`-`)} • Petugas: ${Q(e.inspector_name||`-`)}
                  </div>
                </div>
              `).join(``):`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada catatan survei pemantauan terbaru.</p>`}
        </div>
      </div>
    </div>
  `}async function Cl(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat master jenis pohon...</div>`,ml=(await Z.getTreeSpecies()).species||[],e.innerHTML=`
    <!-- Breadcrumb & Header -->
    <div style="margin-bottom: 16px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin" style="color: var(--clr-text-muted); text-decoration: none;">Admin Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: #34d399; font-weight: 600;">Master Jenis Pohon</span>
      </nav>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: #fff; margin: 0;">Master Data Jenis Pohon</h2>
          <p style="font-size: 12px; color: var(--clr-text-muted); margin: 4px 0 0;">Koleksi taksonomi jenis pohon silvikultur, status asal, dan data ekologis.</p>
        </div>
        <button id="btn-add-species" class="btn-primary-action btn-sm">
          ➕ Tambah Jenis Pohon Baru
        </button>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; gap: 8px; flex: 1; min-width: 260px;">
        <input type="text" id="filter-species-search" class="form-input" placeholder="Cari nama umum, ilmiah, famili..." style="max-width: 300px;" />
        <select id="filter-species-origin" class="form-select" style="max-width: 180px;">
          <option value="all">Semua Status Asal</option>
          <option value="lokal_asli">Jenis Lokal / Asli</option>
          <option value="introduksi">Jenis Introduksi</option>
          <option value="belum_diverifikasi">Belum Diverifikasi</option>
        </select>
      </div>
      <div style="font-size: 12px; color: var(--clr-text-muted);">
        Total: <strong style="color: #fff;" id="species-count-badge">${ml.length}</strong> jenis
      </div>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Nama Umum & Ilmiah</th>
            <th style="padding: 10px 14px;">Famili</th>
            <th style="padding: 10px 14px;">Status Asal</th>
            <th style="padding: 10px 14px;">Fungsi Ekologis</th>
            <th style="padding: 10px 14px; text-align: right;">Total Ditanam</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="species-table-body">
          ${wl(ml)}
        </tbody>
      </table>
    </div>
  `;let t=document.getElementById(`filter-species-search`),n=document.getElementById(`filter-species-origin`),r=()=>{let r=t.value.toLowerCase(),i=n.value,a=ml.filter(e=>{let t=e.common_name.toLowerCase().includes(r)||e.scientific_name.toLowerCase().includes(r)||(e.local_name||``).toLowerCase().includes(r),n=i===`all`||e.origin_status===i;return t&&n});document.getElementById(`species-table-body`).innerHTML=wl(a);let o=document.getElementById(`species-count-badge`);o&&(o.textContent=a.length),Tl(e)};t?.addEventListener(`input`,r),n?.addEventListener(`change`,r),document.getElementById(`btn-add-species`)?.addEventListener(`click`,()=>{El(null,e)}),Tl(e)}function wl(e){return e.length===0?`<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Tidak ada data jenis pohon ditemukan.</td></tr>`:e.map(e=>`
    <tr style="border-bottom: 1px solid var(--clr-border);">
      <td style="padding: 10px 14px;">
        <span style="font-weight: 600; color: var(--clr-text);">${Q(e.common_name)}</span><br>
        <span style="font-size: 12px; font-style: italic; color: var(--clr-primary, #10b981);">${Q(e.scientific_name)}</span>
        ${e.local_name?`<span style="font-size: 11px; color: var(--clr-text-muted);"> (${Q(e.local_name)})</span>`:``}
      </td>
      <td style="padding: 10px 14px;">${Q(e.family||`-`)}</td>
      <td style="padding: 10px 14px;">
        <span class="admin-header-pill ${e.origin_status===`lokal_asli`?`pill-success`:e.origin_status===`introduksi`?`pill-warning`:`pill-neutral`}" style="font-size: 11px;">
          ${e.origin_status===`lokal_asli`?`Lokal / Asli`:e.origin_status===`introduksi`?`Introduksi`:`Belum Diverifikasi`}
        </span>
      </td>
      <td style="padding: 10px 14px; max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${Q(e.ecological_function||``)}">
        ${Q(e.ecological_function||`-`)}
      </td>
      <td style="padding: 10px 14px; text-align: right; font-weight: 600;">
        ${e.total_planted?.toLocaleString()||0} bibit
      </td>
      <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
        <button class="btn-edit-species icon-btn-sm" data-id="${e.id}" title="Edit Data">✏️</button>
        <button class="btn-del-species icon-btn-sm" data-id="${e.id}" title="Hapus Spesies" style="color: #ef4444;">🗑️</button>
      </td>
    </tr>
  `).join(``)}function Tl(e){document.querySelectorAll(`.btn-edit-species`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-id`),r=ml.find(e=>e.id===n);r&&El(r,e)})}),document.querySelectorAll(`.btn-del-species`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`),r=ml.find(e=>e.id===n),i=r?r.common_name:`spesies ini`;if(confirm(`Yakin ingin menghapus jenis pohon "${i}"? Data yang sudah terhubung dengan kegiatan penanaman tidak dapat dihapus.`))try{await Z.deleteTreeSpecies(n),m.deleted(`Jenis pohon "${i}" berhasil dihapus.`),await Cl(e)}catch(e){m.error(`✕ Gagal menghapus jenis pohon`,e.message)}})})}function El(e=null,t){let n=!!e,r=n?`Edit Jenis Pohon: ${Q(e.common_name)}`:`Tambah Jenis Pohon Baru`;t.innerHTML=`
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin" style="color: var(--clr-text-muted); text-decoration: none;">Admin Dashboard</a>
        <span>&rsaquo;</span>
        <button id="breadcrumb-btn-species-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Master Jenis Pohon</button>
        <span>&rsaquo;</span>
        <span style="color: #34d399; font-weight: 600;">${n?`Edit Spesies`:`Tambah Spesies`}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${n?`✏️`:`🌱`}</span> ${r}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            Lengkapi atribut pohon untuk katalog publik dan modul pemantauan restorasi silvikultur kawasan ±2 hektare.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-species" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-preview-species-form" class="btn-secondary-action btn-sm">
            👁️ Preview Singkat
          </button>
          <button type="button" id="btn-cancel-species-form" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-species-form" class="btn-primary-action btn-sm">
            💾 ${n?`Simpan Perubahan`:`Simpan Jenis Pohon`}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="species-form-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="species-page-form" enctype="multipart/form-data">
      <input type="hidden" id="page-sp-id" value="${n?e.id:``}" />

      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- CARD 1: IDENTITAS POHON -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🏷️</span> Card 1 — Identitas Pohon
            </h3>
            <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="page-sp-common" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Umum (Indonesia): <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="page-sp-common" class="form-input" required placeholder="Contoh: Merbau Aceh / Bungur" value="${Q(e?.common_name||``)}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama populer yang ditampilkan utama pada katalog publik.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-scientific" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Ilmiah (Spesies / Takson): <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="page-sp-scientific" class="form-input" required placeholder="Contoh: Intsia bijuga / Lagerstroemia speciosa" value="${Q(e?.scientific_name||``)}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama ilmiah unik internasional (binomial nomenclature).</small>
            </div>

            <div class="form-group">
              <label for="page-sp-local" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Lokal / Daerah:
              </label>
              <input type="text" id="page-sp-local" class="form-input" placeholder="Contoh: Kayu Ipil, Bungur Hutan" value="${Q(e?.local_name||``)}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama sebutan di kalangan warga lokal atau etnis Aceh.</small>
            </div>

            <div class="form-group" style="display: flex; flex-direction: column; justify-content: center;">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Status Publikasi & Operasional:
              </label>
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--clr-text); font-size: 13px; padding-top: 6px;">
                <input type="checkbox" id="page-sp-active" ${!e||e.is_active?`checked`:``} style="width: 18px; height: 18px; accent-color: #10b981;" />
                <span>Aktif dan Ditampilkan di Katalog Publik</span>
              </label>
            </div>
          </div>
        </div>

        <!-- CARD 2: KLASIFIKASI BOTANI -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🌿</span> Card 2 — Klasifikasi Botani
            </h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="page-sp-family" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Famili Botani:
              </label>
              <input type="text" id="page-sp-family" class="form-input" placeholder="Contoh: Fabaceae / Lythraceae / Moraceae" value="${Q(e?.family||``)}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Keluarga taksonomi botani pohon.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-origin" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Status Asal Spesies: <span style="color: #ef4444;">*</span>
              </label>
              <select id="page-sp-origin" class="form-select" required>
                <option value="lokal_asli" ${e?.origin_status===`lokal_asli`?`selected`:``}>Jenis Lokal / Asli (Indigenous)</option>
                <option value="introduksi" ${e?.origin_status===`introduksi`?`selected`:``}>Jenis Introduksi (Exotic / Naturalized)</option>
                <option value="belum_diverifikasi" ${!e||e?.origin_status===`belum_diverifikasi`?`selected`:``}>Belum Diverifikasi</option>
              </select>
              <small style="color: var(--clr-text-muted); font-size: 11px;">Klasifikasi keaslian pohon terhadap ekoregion Aceh.</small>
            </div>
          </div>
        </div>

        <!-- CARD 3: INFORMASI EKOLOGIS -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🌲</span> Card 3 — Informasi Ekologis & Silvikultur
            </h3>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label for="page-sp-ecological" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Fungsi Ekologis:
              </label>
              <textarea id="page-sp-ecological" class="form-textarea" rows="3" placeholder="Penyedia habitat burung, naungan kanopi rapat, penahan erosi lereng terjal, pengikat nitrogen tanah...">${Q(e?.ecological_function||``)}</textarea>
              <small style="color: var(--clr-text-muted); font-size: 11px;">Peran spesies dalam keseimbangan ekosistem bentang alam.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-benefits" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Manfaat &amp; Kegunaan Ekonomi / Tradisional:
              </label>
              <textarea id="page-sp-benefits" class="form-textarea" rows="2" placeholder="Kayu pertukangan bernilai tinggi, pakan satwa lebah madu, buah hutan konsumsi...">${Q(e?.benefits||``)}</textarea>
            </div>

            <div class="form-group">
              <label for="page-sp-desc" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Deskripsi Tambahan &amp; Morfologi:
              </label>
              <textarea id="page-sp-desc" class="form-textarea" rows="3" placeholder="Tinggi pohon dewasa dapat mencapai 25 meter, diameter batang 60 cm, daun majemuk berpasangan...">${Q(e?.description||``)}</textarea>
            </div>
          </div>
        </div>

        <!-- CARD 4: FOTO DAN REFERENSI -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>📸</span> Card 4 — Foto dan Referensi
            </h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div class="form-group">
                <label for="page-sp-photo-file" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Upload Berkas Foto Pohon:
                </label>
                <input type="file" id="page-sp-photo-file" class="form-input" accept="image/*" />
                <small style="color: var(--clr-text-muted); font-size: 11px;">Format JPEG/PNG/WebP, maksimal 5MB.</small>
              </div>

              <div class="form-group">
                <label for="page-sp-photo-path" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Atau URL / Path Foto Tersimpan:
                </label>
                <input type="text" id="page-sp-photo-path" class="form-input" placeholder="/storage/tree-species/merbau.jpg" value="${Q(e?.photo_path||``)}" />
              </div>

              <div class="form-group">
                <label for="page-sp-ref" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Sumber Referensi Identifikasi:
                </label>
                <input type="text" id="page-sp-ref" class="form-input" placeholder="Buku Flora Malesiana" value="${Q(e?.reference_source||``)}" />
                <small style="color: var(--clr-text-muted); font-size: 11px;">Rujukan pustaka atau tim surveyor yang mengidentifikasi spesies.</small>
              </div>
            </div>

            <!-- Preview Card Foto -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.25); border: 1px dashed var(--clr-border); border-radius: 8px; padding: 16px; min-height: 220px;">
              <div id="sp-photo-preview-box" style="width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 6px; background: rgba(255,255,255,0.02);">
                ${e?.photo_path?`<img src="${e.photo_path}" alt="Foto ${Q(e.common_name)}" style="max-width: 100%; max-height: 100%; object-fit: cover;" id="img-sp-preview" />`:`<div style="text-align: center; color: var(--clr-text-muted); font-size: 12px;" id="placeholder-sp-preview">
                         <span style="font-size: 32px; display: block; margin-bottom: 6px;">📷</span>
                         Belum ada foto yang dipilih
                       </div>`}
              </div>
              <span style="font-size: 11px; color: var(--clr-text-muted); margin-top: 8px;">Pratinjau Foto Spesies</span>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Bawah -->
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
          <button type="button" id="btn-cancel-species-bottom" class="btn-secondary-action">
            Batal
          </button>
          <button type="button" id="btn-save-species-bottom" class="btn-primary-action">
            💾 ${n?`Simpan Perubahan`:`Simpan Jenis Pohon`}
          </button>
        </div>
      </div>
    </form>

    <!-- Modal Preview Singkat -->
    <div id="modal-species-preview" class="admin-modal-overlay hidden">
      <div class="admin-modal-box" style="max-width: 500px;">
        <div class="admin-modal-header">
          <h3 style="margin: 0; font-size: 16px; color: #fff;">👁️ Pratinjau Singkat Jenis Pohon</h3>
          <button id="btn-close-species-preview-modal" class="icon-btn-sm">✕</button>
        </div>
        <div class="admin-modal-body" id="modal-species-preview-body" style="padding: 20px;">
          <!-- Populated dynamically -->
        </div>
        <div class="admin-modal-footer">
          <button type="button" id="btn-dismiss-species-preview" class="btn-primary-action btn-sm">Tutup Pratinjau</button>
        </div>
      </div>
    </div>
  `;let i=document.getElementById(`page-sp-photo-file`),a=document.getElementById(`page-sp-photo-path`),o=document.getElementById(`sp-photo-preview-box`);i?.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){let e=URL.createObjectURL(t);o.innerHTML=`<img src="${e}" alt="Preview" style="max-width: 100%; max-height: 100%; object-fit: cover;" />`}}),a?.addEventListener(`input`,e=>{let t=e.target.value.trim();t&&!i.files[0]&&(o.innerHTML=`<img src="${t}" alt="Preview" style="max-width: 100%; max-height: 100%; object-fit: cover;" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\\'text-align: center; color: #ef4444; font-size: 12px;\\\'>⚠️ Gagal memuat URL foto</div>';" />`)});let s=()=>{let n=document.getElementById(`page-sp-common`).value.trim();(!n||e&&n===e.common_name||confirm(`Perubahan belum disimpan. Kembali ke daftar jenis pohon?`))&&Cl(t)};document.getElementById(`breadcrumb-btn-species-list`)?.addEventListener(`click`,s),document.getElementById(`btn-back-to-species`)?.addEventListener(`click`,s),document.getElementById(`btn-cancel-species-form`)?.addEventListener(`click`,s),document.getElementById(`btn-cancel-species-bottom`)?.addEventListener(`click`,s);let c=document.getElementById(`modal-species-preview`),l=document.getElementById(`modal-species-preview-body`);document.getElementById(`btn-preview-species-form`)?.addEventListener(`click`,()=>{let e=document.getElementById(`page-sp-common`).value.trim()||`(Nama belum diisi)`,t=document.getElementById(`page-sp-scientific`).value.trim()||`(Nama ilmiah belum diisi)`,n=document.getElementById(`page-sp-local`).value.trim()||`-`,r=document.getElementById(`page-sp-family`).value.trim()||`-`,i=document.getElementById(`page-sp-origin`).value,a=i===`lokal_asli`?`Lokal / Asli`:i===`introduksi`?`Introduksi`:`Belum Diverifikasi`,o=document.getElementById(`page-sp-ecological`).value.trim()||`-`,s=document.getElementById(`page-sp-benefits`).value.trim()||`-`,u=document.getElementById(`page-sp-ref`).value.trim()||`-`;l.innerHTML=`
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--clr-border); border-radius: 8px; padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div>
            <h3 style="color: #fff; margin: 0; font-size: 16px;">${Q(e)}</h3>
            <span style="font-size: 13px; font-style: italic; color: #34d399;">${Q(t)}</span>
          </div>
          <span class="admin-header-pill pill-success" style="font-size: 11px;">${a}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 12px; color: var(--clr-text-muted);">
          <div><strong>Famili:</strong> ${Q(r)}</div>
          <div><strong>Nama Lokal:</strong> ${Q(n)}</div>
        </div>
        <div style="font-size: 12px; color: var(--clr-text); margin-bottom: 8px;">
          <strong>Fungsi Ekologis:</strong><br />
          <p style="margin: 4px 0 0; color: var(--clr-text-muted); line-height: 1.4;">${Q(o)}</p>
        </div>
        <div style="font-size: 12px; color: var(--clr-text); margin-bottom: 8px;">
          <strong>Manfaat:</strong><br />
          <p style="margin: 4px 0 0; color: var(--clr-text-muted); line-height: 1.4;">${Q(s)}</p>
        </div>
        <div style="font-size: 11px; color: var(--clr-text-muted); border-top: 1px solid var(--clr-border-subtle); padding-top: 8px;">
          <strong>Referensi:</strong> ${Q(u)}
        </div>
      </div>
    `,c.classList.remove(`hidden`)}),document.getElementById(`btn-close-species-preview-modal`)?.addEventListener(`click`,()=>c.classList.add(`hidden`)),document.getElementById(`btn-dismiss-species-preview`)?.addEventListener(`click`,()=>c.classList.add(`hidden`));let u=async()=>{let e=document.getElementById(`species-form-alert`),r=document.getElementById(`page-sp-common`).value.trim(),a=document.getElementById(`page-sp-scientific`).value.trim();if(!r){e.className=`alert-box error`,e.textContent=`Nama umum pohon (Indonesia) wajib diisi.`,e.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!a){e.className=`alert-box error`,e.textContent=`Nama ilmiah (spesies) wajib diisi.`,e.scrollIntoView({behavior:`smooth`,block:`center`});return}let o=[document.getElementById(`btn-save-species-form`),document.getElementById(`btn-save-species-bottom`)];o.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{let e=document.getElementById(`page-sp-id`).value,o=i.files[0],s;if(o){let e=new FormData;e.append(`common_name`,r),e.append(`scientific_name`,a),e.append(`local_name`,document.getElementById(`page-sp-local`).value.trim()),e.append(`family`,document.getElementById(`page-sp-family`).value.trim()),e.append(`origin_status`,document.getElementById(`page-sp-origin`).value),e.append(`reference_source`,document.getElementById(`page-sp-ref`).value.trim()),e.append(`ecological_function`,document.getElementById(`page-sp-ecological`).value.trim()),e.append(`benefits`,document.getElementById(`page-sp-benefits`).value.trim()),e.append(`description`,document.getElementById(`page-sp-desc`).value.trim()),e.append(`is_active`,document.getElementById(`page-sp-active`).checked?`1`:`0`),e.append(`photo`,o),s=e}else s={common_name:r,scientific_name:a,local_name:document.getElementById(`page-sp-local`).value.trim(),family:document.getElementById(`page-sp-family`).value.trim(),origin_status:document.getElementById(`page-sp-origin`).value,reference_source:document.getElementById(`page-sp-ref`).value.trim(),ecological_function:document.getElementById(`page-sp-ecological`).value.trim(),benefits:document.getElementById(`page-sp-benefits`).value.trim(),description:document.getElementById(`page-sp-desc`).value.trim(),photo_path:document.getElementById(`page-sp-photo-path`).value.trim(),is_active:document.getElementById(`page-sp-active`).checked};await Z.saveTreeSpecies(s,e||null),n?m.updated(`Data jenis pohon '${r}' berhasil disimpan.`):m.created(`Data jenis pohon '${r}' berhasil disimpan.`),await Cl(t)}catch(t){e.className=`alert-box error`,e.textContent=`Gagal menyimpan jenis pohon: ${t.message}. Seluruh data input tetap dipertahankan.`,e.scrollIntoView({behavior:`smooth`,block:`center`}),m.error(`✕ Gagal menyimpan jenis pohon`,t.message),o.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=`💾 ${n?`Simpan Perubahan`:`Simpan Jenis Pohon`}`)})}};document.getElementById(`btn-save-species-form`)?.addEventListener(`click`,u),document.getElementById(`btn-save-species-bottom`)?.addEventListener(`click`,u)}async function Dl(e,t){t&&t.length>0&&(_l=t),e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat kegiatan penanaman...</div>`;let[n,r,i]=await Promise.all([Z.getPlantingActivities(),Z.getTreeSpecies(),Z.getZones()]);hl=n.activities||[],ml=r.species||[],gl=i.zones||[],e.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; gap: 8px; flex: 1;">
        <input type="text" id="filter-act-search" class="form-input" placeholder="Cari batch, kegiatan, zona..." style="max-width: 320px;" />
      </div>
      <button id="btn-add-activity" class="btn-primary-action btn-sm">
        ➕ Catat Kegiatan Penanaman
      </button>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Batch & Tanggal</th>
            <th style="padding: 10px 14px;">Nama Kegiatan & Pelaksana</th>
            <th style="padding: 10px 14px;">Zona / Panorama</th>
            <th style="padding: 10px 14px; text-align: right;">Total Awal</th>
            <th style="padding: 10px 14px; text-align: center;">Kelangsungan Hidup</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="act-table-body">
          ${Ol(hl)}
        </tbody>
      </table>
    </div>

  `,document.getElementById(`filter-act-search`)?.addEventListener(`input`,n=>{let r=n.target.value.toLowerCase().trim(),i=hl.filter(e=>{let t=(e.batch_code||``).toLowerCase().includes(r),n=(e.name||``).toLowerCase().includes(r),i=(e.location_zone||``).toLowerCase().includes(r),a=(e.person_in_charge||``).toLowerCase().includes(r);return t||n||i||a}),a=document.getElementById(`act-table-body`);a&&(a.innerHTML=Ol(i)),kl(e,t)}),document.getElementById(`btn-add-activity`)?.addEventListener(`click`,async()=>{await Al(null,e,t||_l,gl)}),kl(e,t)}function Ol(e){return e.length===0?`<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan kegiatan penanaman.</td></tr>`:e.map(e=>{let t=e.survival_rate===null?`Data Belum Lengkap`:`${e.survival_rate}%`,n=e.survival_rate===null?`pill-neutral`:e.survival_rate>=80?`pill-success`:`pill-warning`;return`
      <tr style="border-bottom: 1px solid var(--clr-border);">
        <td style="padding: 10px 14px;">
          <span style="font-weight: 600;">${Q(e.batch_code)}</span><br>
          <span style="font-size: 12px; color: var(--clr-text-muted);">📅 ${dl(e.activity_date)}</span>
        </td>
        <td style="padding: 10px 14px;">
          <span style="font-weight: 500;">${Q(e.name)}</span><br>
          <span style="font-size: 11px; color: var(--clr-text-muted);">PIC: ${Q(e.person_in_charge)} • ${Q(e.organizer)}</span>
        </td>
        <td style="padding: 10px 14px;">
          <span>📍 ${Q(e.location_zone)}</span><br>
          <span style="font-size: 11px; color: var(--clr-text-muted);">${e.scene_name?`🌐 `+Q(e.scene_name):`Tanpa Panorama`}</span>
        </td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 600;">
          ${e.total_initial_seedlings} bibit
        </td>
        <td style="padding: 10px 14px; text-align: center;">
          <span class="admin-header-pill ${n}" style="font-size: 11px;">${t}</span>
        </td>
        <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
          <button class="btn-edit-activity icon-btn-sm" data-id="${e.id}" title="Edit Kegiatan" aria-label="Edit Kegiatan" style="margin-right: 4px; color: #38bdf8;">✏️</button>
          <button class="btn-del-activity icon-btn-sm" data-id="${e.id}" title="Hapus Kegiatan" aria-label="Hapus Kegiatan" style="color: #ef4444;">🗑️</button>
        </td>
      </tr>
    `}).join(``)}function kl(e,t){document.querySelectorAll(`.btn-edit-activity`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=n.getAttribute(`data-id`);try{n.disabled=!0,n.innerHTML=`⏳`;let i=await Z.getPlantingActivity(r);await Al(i.activity||i,e,t||_l,gl)}catch(e){m.error(`✕ Gagal memuat data kegiatan`,e.message),n.disabled=!1,n.innerHTML=`✏️`}})}),document.querySelectorAll(`.btn-del-activity`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=n.getAttribute(`data-id`);if(confirm(`Hapus kegiatan penanaman ini beserta rincian bibitnya?`))try{await Z.deletePlantingActivity(r),m.deleted(`Catatan kegiatan penanaman berhasil dihapus.`),Dl(e,t)}catch(e){m.error(`✕ Gagal menghapus kegiatan penanaman`,e.message)}})})}async function Al(e=null,t,n=[],r=[]){let i=!!e;(!r||r.length===0)&&(gl.length>0?r=gl:(r=(await Z.getZones()).zones||[],gl=r)),(!n||n.length===0)&&(n=_l),(!ml||ml.length===0)&&(ml=(await Z.getTreeSpecies()).species||[]);let a=e&&e.items&&e.items.length>0?e.items:[];t.innerHTML=`
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin/dashboard" style="color: var(--clr-text-muted); text-decoration: none;">Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: var(--clr-text-muted);">Data Penanaman</span>
        <span>&rsaquo;</span>
        <button type="button" id="breadcrumb-btn-act-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Kegiatan Penanaman</button>
        <span>&rsaquo;</span>
        <span style="color: ${i?`#38bdf8`:`#10b981`}; font-weight: 600;">${i?`Edit`:`Catat Baru`}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${i?`✏️`:`🌱`}</span> ${i?`Edit Kegiatan Penanaman: ${Q(e.batch_code)}`:`Catat Kegiatan Penanaman Baru`}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            ${i?`Perbarui data pelaksanaan, kawasan penanaman, tim pelaksana, dan rincian jenis bibit yang ditanam.`:`Catat data pelaksanaan kegiatan penanaman baru, kawasan target, tim pelaksana, dan rincian bibit awal yang ditanam.`}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-act" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-cancel-act-top" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-act-top" class="btn-primary-action btn-sm">
            💾 ${i?`Simpan Perubahan`:`Simpan Kegiatan`}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="act-edit-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="form-edit-activity" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- CARD 1: INFORMASI BATCH & WAKTU -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📋</span> Card 1 — Informasi Kegiatan & Batch
          </h3>
          <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="edit-act-batch" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kode / Kelompok Batch: <span style="color: #ef4444;">*</span>
            </label>
            ${i?`<input type="text" id="edit-act-batch" class="form-input" readonly value="${Q(e.batch_code)}" style="background: rgba(255,255,255,0.05); cursor: not-allowed; opacity: 0.85;" />
                 <small style="color: var(--clr-text-muted); font-size: 11px;">Kode unik batch penanaman dipertahankan sebagai referensi riwayat.</small>`:`<input type="text" id="edit-act-batch" class="form-input" required placeholder="Contoh: BATCH-2026-01" value="" />
                 <small style="color: var(--clr-text-muted); font-size: 11px;">Kode unik batch penanaman untuk identifikasi dan referensi pemantauan berkala.</small>`}
          </div>

          <div class="form-group">
            <label for="edit-act-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="edit-act-date" class="form-input" required value="${i?ul(e.activity_date):new Date().toISOString().split(`T`)[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD${i?` • Tampilan: ${dl(e.activity_date)}`:``}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="edit-act-name" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Kegiatan Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-name" class="form-input" required placeholder="Contoh: Penanaman Pohon Blok Utara Kawasan" value="${i?Q(e.name):``}" />
          </div>
        </div>
      </div>

      <!-- CARD 2: LOKASI & PANORAMA -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📍</span> Card 2 — Kawasan & Lokasi Penanaman
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="edit-act-zone-id" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kawasan Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="edit-act-zone-id" class="form-select" required>
              <option value="">-- Pilih Kawasan Penanaman --</option>
              ${r.map(t=>`<option value="${t.id}" ${i?t.id===e.planting_zone_id?`selected`:``:r.length===1?`selected`:``}>${Q(t.name)} (${Q(t.zone_code||``)})</option>`).join(``)}
            </select>
          </div>

          <div class="form-group">
            <label for="edit-act-zone" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Zona Deskriptif / Blok Lapangan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-zone" class="form-input" required placeholder="Contoh: Blok A - Lereng Barat" value="${i?Q(e.location_zone):``}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="edit-act-scene" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Hubungkan ke Panorama Marzipano (Opsional):
            </label>
            <select id="edit-act-scene" class="form-select">
              <option value="">-- Tanpa Hubungan Panorama --</option>
              ${n.map(t=>`<option value="${t.id}" ${i&&t.id===e.scene_id?`selected`:``}>${Q(t.name)}</option>`).join(``)}
            </select>
          </div>
        </div>
      </div>

      <!-- CARD 3: PENANGGUNG JAWAB & ORGANISASI -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>👥</span> Card 3 — Pelaksana & Penanggung Jawab
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="edit-act-pic" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Penanggung Jawab (PIC): <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-pic" class="form-input" required placeholder="Penanggung Jawab Lapangan" value="${i?Q(e.person_in_charge):``}" />
          </div>

          <div class="form-group">
            <label for="edit-act-org" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tim / Organisasi / Mitra: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-org" class="form-input" required placeholder="Contoh: Tim IKHW Aceh" value="${i?Q(e.organizer):`Tim IKHW Aceh`}" />
          </div>
        </div>
      </div>

      <!-- CARD 4: RINCIAN JENIS POHON & BIBIT AWAL -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🌱</span> Card 4 — Rincian Jenis Pohon & Bibit Awal Ditanam
            </h3>
            <p style="font-size: 12px; color: var(--clr-text-muted); margin: 4px 0 0;">
              ${i?`Data bibit lama dimuat secara lengkap. Tambahkan atau sesuaikan jumlah tanpa menghapus detail yang tidak diubah.`:`Pilih jenis pohon dan tentukan jumlah bibit awal yang ditanam. Anda dapat menambahkan beberapa jenis sekaligus.`}
            </p>
          </div>
          <button type="button" id="btn-edit-add-item-row" class="btn-secondary-action btn-sm">
            ➕ Tambah Baris Jenis
          </button>
        </div>

        <div id="edit-act-items-container" style="display: flex; flex-direction: column; gap: 10px;">
          <!-- Items will be rendered here -->
        </div>
      </div>

      <!-- CARD 5: CATATAN TAMBAHAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📝</span> Card 5 — Catatan Lapangan
          </h3>
        </div>

        <div class="form-group">
          <label for="edit-act-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
            Catatan Tambahan:
          </label>
          <textarea id="edit-act-notes" class="form-textarea" rows="3" placeholder="Kondisi cuaca saat tanam, perlakuan mulsa, persiapan lubang tanam...">${i?Q(e.notes||``):``}</textarea>
        </div>
      </div>

      <!-- Tombol Aksi Bawah -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
        <button type="button" id="btn-cancel-act-bottom" class="btn-secondary-action">
          Batal
        </button>
        <button type="button" id="btn-save-act-bottom" class="btn-primary-action">
          💾 ${i?`Simpan Perubahan`:`Simpan Kegiatan`}
        </button>
      </div>
    </form>
  `;let o=document.getElementById(`edit-act-items-container`),s=(e=null)=>{let t=document.createElement(`div`);return t.className=`edit-act-item-row`,e&&e.id&&(t.dataset.itemId=String(e.id)),t.style.cssText=`display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid var(--clr-border-subtle);`,t.innerHTML=`
      <select class="form-select edit-item-sp-select" style="flex: 2; min-width: 200px;" required>
        <option value="">-- Pilih Jenis Pohon --</option>
        ${ml.map(t=>`<option value="${t.id}" ${e&&t.id===e.tree_species_id?`selected`:``}>${Q(t.common_name)} (${Q(t.scientific_name)})</option>`).join(``)}
      </select>
      <input type="number" class="form-input edit-item-qty-input" style="flex: 1; min-width: 100px;" placeholder="Jumlah bibit" min="1" value="${e?e.quantity:``}" required />
      <input type="text" class="form-input edit-item-unit-input" style="width: 90px;" value="${Q(e?.unit||`batang`)}" placeholder="Satuan" />
      <button type="button" class="icon-btn-sm edit-btn-del-row" style="color: #ef4444;" title="Hapus Baris" aria-label="Hapus Baris">✕</button>
    `,t.querySelector(`.edit-btn-del-row`).addEventListener(`click`,()=>{o.querySelectorAll(`.edit-act-item-row`).length>1?t.remove():m.warning(`Peringatan Input`,`Minimal satu jenis pohon harus ada dalam kegiatan penanaman.`)}),t};a.length>0?a.forEach(e=>o.appendChild(s(e))):o.appendChild(s(null)),document.getElementById(`btn-edit-add-item-row`)?.addEventListener(`click`,()=>{o.appendChild(s(null))});let c=()=>{Dl(t,n)};document.getElementById(`breadcrumb-btn-act-list`)?.addEventListener(`click`,c),document.getElementById(`btn-back-to-act`)?.addEventListener(`click`,c),document.getElementById(`btn-cancel-act-top`)?.addEventListener(`click`,c),document.getElementById(`btn-cancel-act-bottom`)?.addEventListener(`click`,c);let l=()=>{document.querySelectorAll(`.field-error-msg`).forEach(e=>e.remove()),document.querySelectorAll(`.input-field-error`).forEach(e=>{e.classList.remove(`input-field-error`),e.style.borderColor=``})},u=(e,t)=>{if(!e)return;e.classList.add(`input-field-error`),e.style.borderColor=`#ef4444`;let n=document.createElement(`div`);n.className=`field-error-msg`,n.style.cssText=`color: #ef4444; font-size: 11px; margin-top: 4px; font-weight: 500;`,n.textContent=`⚠ ${t}`,e.nextSibling?e.parentNode.insertBefore(n,e.nextSibling):e.parentNode.appendChild(n)},d=async()=>{let r=document.getElementById(`act-edit-alert`);r.classList.add(`hidden`),r.textContent=``,l();let a=document.getElementById(`edit-act-batch`).value.trim(),s=document.getElementById(`edit-act-date`).value,c=fl(s),d=document.getElementById(`edit-act-name`).value.trim(),f=document.getElementById(`edit-act-zone-id`).value,p=document.getElementById(`edit-act-zone`).value.trim(),h=document.getElementById(`edit-act-scene`).value,g=document.getElementById(`edit-act-pic`).value.trim(),_=document.getElementById(`edit-act-org`).value.trim(),v=document.getElementById(`edit-act-notes`).value.trim();if(!a){r.className=`alert-banner alert-danger`,r.textContent=`Kode / kelompok batch kegiatan penanaman wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-batch`),`Kode batch wajib diisi.`);return}if(!c){r.className=`alert-banner alert-danger`,r.textContent=`Tanggal penanaman wajib diisi dengan format tanggal yang valid.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-date`),`Tanggal penanaman tidak valid.`);return}if(!d){r.className=`alert-banner alert-danger`,r.textContent=`Nama kegiatan penanaman wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-name`),`Nama kegiatan penanaman wajib diisi.`);return}if(!f){r.className=`alert-banner alert-danger`,r.textContent=`Kawasan penanaman wajib dipilih.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-zone-id`),`Pilih kawasan penanaman.`);return}if(!p){r.className=`alert-banner alert-danger`,r.textContent=`Zona deskriptif / blok penanaman wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-zone`),`Zona deskriptif / blok penanaman wajib diisi.`);return}if(!g){r.className=`alert-banner alert-danger`,r.textContent=`Nama penanggung jawab (PIC) wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-pic`),`Nama penanggung jawab (PIC) wajib diisi.`);return}if(!_){r.className=`alert-banner alert-danger`,r.textContent=`Tim atau organisasi pelaksana wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),u(document.getElementById(`edit-act-org`),`Tim atau organisasi pelaksana wajib diisi.`);return}let y=o.querySelectorAll(`.edit-act-item-row`),b=[],x=!1;if(y.forEach(e=>{let t=e.querySelector(`.edit-item-sp-select`).value,n=e.querySelector(`.edit-item-qty-input`).value,r=parseInt(n,10),i=e.querySelector(`.edit-item-unit-input`).value.trim()||`batang`,a=e.dataset.itemId?parseInt(e.dataset.itemId,10):null;if(t&&!isNaN(r)&&r>0){let e={tree_species_id:t,quantity:r,unit:i};a&&(e.id=a),b.push(e)}else t&&(isNaN(r)||r<=0)?(x=!0,u(e.querySelector(`.edit-item-qty-input`),`Jumlah bibit minimal 1.`)):!t&&n&&u(e.querySelector(`.edit-item-sp-select`),`Pilih jenis pohon.`)}),x){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah bibit harus berupa angka bulat positif (minimal 1).`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(b.length===0){r.className=`alert-banner alert-danger`,r.textContent=`Pilih setidaknya 1 jenis pohon dengan jumlah bibit yang valid.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}let S={batch_code:a,activity_date:c,name:d,planting_zone_id:f||null,location_zone:p,scene_id:h||null,person_in_charge:g,organizer:_,notes:v,items:b},C=[document.getElementById(`btn-save-act-top`),document.getElementById(`btn-save-act-bottom`)];C.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{await Z.savePlantingActivity(S,i?e.id:null),m.show({type:`success`,title:i?`Berhasil diperbarui.`:`Berhasil disimpan.`,message:i?`Data kegiatan penanaman '${a}' berhasil diperbarui.`:`Data kegiatan penanaman '${a}' dan rincian bibit berhasil dicatat.`}),await Dl(t,n)}catch(e){r.className=`alert-banner alert-danger`,e.errors&&typeof e.errors==`object`?r.innerHTML=`
          <strong>✕ Gagal menyimpan kegiatan: Terdapat kesalahan validasi input</strong>
          <ul style="margin: 8px 0 0 18px; padding: 0;">${Object.entries(e.errors).map(([e,t])=>{let n=Array.isArray(t)?t.join(`, `):String(t);if(e===`batch_code`)u(document.getElementById(`edit-act-batch`),n);else if(e===`name`)u(document.getElementById(`edit-act-name`),n);else if(e===`activity_date`)u(document.getElementById(`edit-act-date`),n);else if(e===`location_zone`)u(document.getElementById(`edit-act-zone`),n);else if(e===`planting_zone_id`)u(document.getElementById(`edit-act-zone-id`),n);else if(e===`scene_id`)u(document.getElementById(`edit-act-scene`),n);else if(e===`person_in_charge`)u(document.getElementById(`edit-act-pic`),n);else if(e===`organizer`)u(document.getElementById(`edit-act-org`),n);else if(e.startsWith(`items.`)){let t=e.split(`.`),r=parseInt(t[1],10),i=t[2],a=o.querySelectorAll(`.edit-act-item-row`);a[r]&&(i===`tree_species_id`?u(a[r].querySelector(`.edit-item-sp-select`),n):i===`quantity`&&u(a[r].querySelector(`.edit-item-qty-input`),n))}return`<li>${Q(n)}</li>`}).join(``)}</ul>
          <div style="margin-top: 6px; font-size: 11px; opacity: 0.85;">Seluruh data input yang telah Anda isi tetap dipertahankan. Silakan periksa kembali dan simpan ulang.</div>
        `:r.textContent=`Gagal menyimpan kegiatan penanaman: ${e.message}. Seluruh data input tetap dipertahankan.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),m.error(`✕ Gagal menyimpan kegiatan`,e.message||`Terjadi kesalahan validasi.`),C.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=`💾 ${i?`Simpan Perubahan`:`Simpan Kegiatan`}`)})}};document.getElementById(`btn-save-act-top`)?.addEventListener(`click`,d),document.getElementById(`btn-save-act-bottom`)?.addEventListener(`click`,d)}async function jl(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat catatan survei pemantauan...</div>`;let[t,n]=await Promise.all([Z.getTreeSurveys(),Z.getPlantingActivities()]),r=t.surveys||[];hl=n.activities||[],e.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <h3 style="font-size: 15px; margin-bottom: 4px;">Riwayat Survei Pemantauan Tanaman</h3>
        <p style="color: var(--clr-text-muted); font-size: 12px;">Setiap pemeriksaan disimpan terpisah menurut tanggal; tidak menimpa data survei sebelumnya.</p>
      </div>
      <button id="btn-add-survey" class="btn-primary-action btn-sm">
        ➕ Catat Hasil Survei
      </button>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Tanggal Survei</th>
            <th style="padding: 10px 14px;">Kelompok / Batch</th>
            <th style="padding: 10px 14px;">Bibit Hidup Awal</th>
            <th style="padding: 10px 14px;">Mati / Hilang</th>
            <th style="padding: 10px 14px; text-align: center;">Kelangsungan Hidup</th>
            <th style="padding: 10px 14px;">Kondisi & Gejala</th>
            <th style="padding: 10px 14px;">Pemeriksa</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${r.length>0?r.map(e=>`
                <tr style="border-bottom: 1px solid var(--clr-border);">
                  <td style="padding: 10px 14px; font-weight: 600;">📅 ${dl(e.survey_date)}</td>
                  <td style="padding: 10px 14px;">
                    <span style="font-weight: 500;">${Q(e.batch_code)}</span><br>
                    <span style="font-size: 11px; color: var(--clr-text-muted);">${Q(e.location_zone)}</span>
                  </td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #10b981;">
                    ${e.alive_count} / ${e.initial_seedlings} bibit
                  </td>
                  <td style="padding: 10px 14px; color: #ef4444;">
                    ${e.dead_count} mati, ${e.missing_count} hilang
                  </td>
                  <td style="padding: 10px 14px; text-align: center;">
                    <span class="admin-header-pill ${e.survival_rate>=80?`pill-success`:`pill-warning`}" style="font-size: 11px;">
                      ${e.survival_rate===null?`-`:e.survival_rate+`%`}
                    </span>
                  </td>
                  <td style="padding: 10px 14px;">
                    <span style="font-weight: 500;">${Rl(e.health_condition.replace(`_`,` `))}</span>
                    ${e.damage_symptoms?`<br><span style="font-size: 11px; color: var(--clr-text-muted);">${Q(e.damage_symptoms)}</span>`:``}
                  </td>
                  <td style="padding: 10px 14px;">${Q(e.inspector_name)}</td>
                  <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                    <button class="btn-edit-survey icon-btn-sm" data-id="${e.id}" title="Edit Survei" aria-label="Edit Survei" style="margin-right: 4px; color: #38bdf8;">✏️</button>
                    <button class="btn-del-survey icon-btn-sm" data-id="${e.id}" title="Hapus Survei" aria-label="Hapus Survei" style="color: #ef4444;">🗑️</button>
                  </td>
                </tr>
              `).join(``):`<tr><td colspan="8" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan survei pemantauan.</td></tr>`}
        </tbody>
      </table>
    </div>

  `,document.getElementById(`btn-add-survey`)?.addEventListener(`click`,async()=>{await Ml(null,e)}),document.querySelectorAll(`.btn-edit-survey`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`);try{t.disabled=!0,t.innerHTML=`⏳`;let r=await Z.getTreeSurveyDetail(n);await Ml(r.survey||r,e)}catch(e){m.error(`✕ Gagal memuat data survei`,e.message),t.disabled=!1,t.innerHTML=`✏️`}})}),document.querySelectorAll(`.btn-del-survey`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`);if(confirm(`Hapus catatan survei ini?`))try{await Z.deleteTreeSurvey(n),m.deleted(`Catatan survei pemantauan berhasil dihapus.`),jl(e)}catch(e){m.error(`✕ Gagal menghapus survei`,e.message)}})})}async function Ml(e=null,t){let n=!!e;(!hl||hl.length===0)&&(hl=(await Z.getPlantingActivities()).activities||[]),t.innerHTML=`
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin/dashboard" style="color: var(--clr-text-muted); text-decoration: none;">Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: var(--clr-text-muted);">Data Penanaman</span>
        <span>&rsaquo;</span>
        <button type="button" id="breadcrumb-btn-srv-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Pemantauan Tanaman</button>
        <span>&rsaquo;</span>
        <span style="color: #38bdf8; font-weight: 600;">${n?`Edit`:`Catat Baru`}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${n?`✏️`:`➕`}</span> ${n?`Edit Pemantauan Tanaman: ${Q(e.batch_code||e.id)}`:`Catat Hasil Survei Pemantauan Tanaman`}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            ${n?`Koreksi hasil sensus lapangan, kondisi kesehatan bibit, dan pengukuran silvikultur batch tanaman.`:`Rekam hasil sensus berkala, laju kelangsungan hidup, dan catatan silvikultur per batch penanaman.`}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-srv" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-cancel-srv-top" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-srv-top" class="btn-primary-action btn-sm">
            💾 ${n?`Simpan Perubahan`:`Simpan Survei`}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="srv-form-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="form-survey-page" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- CARD 1: INFORMASI BATCH & JADWAL PEMANTAUAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🔍</span> Card 1 — Informasi Batch & Jadwal Pemantauan
          </h3>
          <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="srv-form-act" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kelompok / Batch Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="srv-form-act" class="form-select" required>
              <option value="">-- Pilih Batch Penanaman --</option>
              ${hl.map(t=>`<option value="${t.id}" ${e&&t.id===e.planting_activity_id?`selected`:``}>${Q(t.batch_code)} - ${Q(t.name)} (${t.total_initial_seedlings} bibit)</option>`).join(``)}
            </select>
          </div>

          <div class="form-group">
            <label for="srv-form-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Pemeriksaan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="srv-form-date" class="form-input" required value="${e?ul(e.survey_date):new Date().toISOString().split(`T`)[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD ${e?`• Tampilan sebelumnya: ${dl(e.survey_date)}`:``}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-inspector" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Petugas Pemeriksa: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="srv-form-inspector" class="form-input" required placeholder="Nama Surveyor / Tim Lapangan" value="${Q(e?.inspector_name||``)}" />
          </div>
        </div>
      </div>

      <!-- CARD 2: HASIL SENSUS TANAMAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📊</span> Card 2 — Hasil Sensus & Kelangsungan Hidup
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="srv-form-alive" style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Bibit Hidup: <span style="color: #ef4444;">*</span>
            </label>
            <input type="number" id="srv-form-alive" class="form-input" required min="0" placeholder="0" value="${e?e.alive_count:``}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Bibit yang masih tegak dan hidup.</small>
          </div>

          <div class="form-group">
            <label for="srv-form-dead" style="color: #ef4444; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Mati: <span style="color: #ef4444;">*</span>
            </label>
            <input type="number" id="srv-form-dead" class="form-input" required min="0" value="${e?e.dead_count:0}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Bibit mati / kering.</small>
          </div>

          <div class="form-group">
            <label for="srv-form-missing" style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Hilang:
            </label>
            <input type="number" id="srv-form-missing" class="form-input" min="0" value="${e&&e.missing_count||0}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Ajir ada namun tanaman raib.</small>
          </div>

          <div class="form-group">
            <label for="srv-form-health" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kondisi Kesehatan Tanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="srv-form-health" class="form-select" required>
              <option value="sangat_baik" ${e?.health_condition===`sangat_baik`?`selected`:``}>Sangat Baik (Segar, Tunas Aktif)</option>
              <option value="baik" ${!e||e?.health_condition===`baik`?`selected`:``}>Baik (Pertumbuhan Normal)</option>
              <option value="sedang" ${e?.health_condition===`sedang`?`selected`:``}>Sedang (Daun Menguning/Kering Parsial)</option>
              <option value="merana" ${e?.health_condition===`merana`?`selected`:``}>Merana (Pertumbuhan Terhambat)</option>
              <option value="terserang_hama" ${e?.health_condition===`terserang_hama`?`selected`:``}>Terserang Hama / Penyakit</option>
            </select>
          </div>
        </div>
      </div>

      <!-- CARD 3: PENGUKURAN & CATATAN LAPANGAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📏</span> Card 3 — Pengukuran Silvikultur & Catatan Lapangan
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="srv-form-height" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tinggi Rata-rata (cm, opsional):
            </label>
            <input type="number" step="0.1" min="0" id="srv-form-height" class="form-input" placeholder="Misal: 65.5" value="${e?.average_height_cm||``}" />
          </div>

          <div class="form-group">
            <label for="srv-form-diameter" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Diameter Batang Rata-rata (cm, opsional):
            </label>
            <input type="number" step="0.1" min="0" id="srv-form-diameter" class="form-input" placeholder="Misal: 1.8" value="${e?.average_diameter_cm||``}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-symptoms" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Gejala / Penyebab Kerusakan (Jika ada):
            </label>
            <input type="text" id="srv-form-symptoms" class="form-input" placeholder="Kekeringan, dimakan satwa, tertutup gulma..." value="${Q(e?.damage_symptoms||``)}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Catatan Lapangan & Rekomendasi Tindakan:
            </label>
            <textarea id="srv-form-notes" class="form-textarea" rows="3" placeholder="Perlu penyiangan piringan, pemupukan tambahan, penyulaman...">${Q(e?.field_notes||``)}</textarea>
          </div>
        </div>
      </div>

      <!-- Tombol Aksi Bawah -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
        <button type="button" id="btn-cancel-srv-bottom" class="btn-secondary-action">
          Batal
        </button>
        <button type="button" id="btn-save-srv-bottom" class="btn-primary-action">
          💾 ${n?`Simpan Perubahan`:`Simpan Survei`}
        </button>
      </div>
    </form>
  `;let r=()=>{jl(t)};document.getElementById(`breadcrumb-btn-srv-list`)?.addEventListener(`click`,r),document.getElementById(`btn-back-to-srv`)?.addEventListener(`click`,r),document.getElementById(`btn-cancel-srv-top`)?.addEventListener(`click`,r),document.getElementById(`btn-cancel-srv-bottom`)?.addEventListener(`click`,r);let i=async()=>{let r=document.getElementById(`srv-form-alert`);r.classList.add(`hidden`),r.textContent=``;let i=document.getElementById(`srv-form-act`).value,a=document.getElementById(`srv-form-date`).value,o=fl(a),s=document.getElementById(`srv-form-inspector`).value.trim(),c=document.getElementById(`srv-form-alive`).value,l=document.getElementById(`srv-form-dead`).value,u=document.getElementById(`srv-form-missing`).value,d=document.getElementById(`srv-form-health`).value,f=parseFloat(document.getElementById(`srv-form-height`).value)||null,p=parseFloat(document.getElementById(`srv-form-diameter`).value)||null,h=document.getElementById(`srv-form-symptoms`).value.trim()||null,g=document.getElementById(`srv-form-notes`).value.trim()||null;if(!i){r.className=`alert-banner alert-danger`,r.textContent=`Pilih kelompok / batch penanaman.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!o){r.className=`alert-banner alert-danger`,r.textContent=`Tanggal pemeriksaan wajib diisi dengan tanggal yang valid.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!s){r.className=`alert-banner alert-danger`,r.textContent=`Nama petugas pemeriksa wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}let _=parseInt(c,10),v=parseInt(l,10),y=parseInt(u,10)||0;if(isNaN(_)||_<0){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah bibit hidup tidak boleh kosong atau bernilai negatif.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(isNaN(v)||v<0){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah bibit mati tidak boleh negatif.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(y<0){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah bibit hilang tidak boleh negatif.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}let b=hl.find(e=>e.id===i);if(b&&b.total_initial_seedlings>0&&_>b.total_initial_seedlings){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah bibit hidup (${_}) tidak boleh melebihi jumlah awal batch (${b.total_initial_seedlings} bibit).`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}let x={planting_activity_id:i,survey_date:o,alive_count:_,dead_count:v,missing_count:y,health_condition:d,inspector_name:s,average_height_cm:f,average_diameter_cm:p,damage_symptoms:h,field_notes:g,is_verified:!0},S=[document.getElementById(`btn-save-srv-top`),document.getElementById(`btn-save-srv-bottom`)];S.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{await Z.saveTreeSurvey(x,n?e.id:null),n?m.show({type:`success`,title:`Berhasil diperbarui.`,message:`Data hasil pemantauan tanaman berhasil diperbarui.`}):m.saved(`Catatan survei pemantauan pohon berhasil disimpan.`),await jl(t)}catch(e){r.className=`alert-banner alert-danger`,r.textContent=`Gagal menyimpan survei: ${e.message}. Seluruh data input tetap dipertahankan.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),m.error(`✕ Gagal menyimpan survei`,e.message),S.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=n?`💾 Simpan Perubahan`:`💾 Simpan Survei`)})}};document.getElementById(`btn-save-srv-top`)?.addEventListener(`click`,i),document.getElementById(`btn-save-srv-bottom`)?.addEventListener(`click`,i)}async function Nl(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat catatan perawatan & penyulaman...</div>`;let[t,n]=await Promise.all([Z.getTreeMaintenance(),Z.getPlantingActivities()]),r=t.logs||[];hl=n.activities||[],e.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <h3 style="font-size: 15px; margin-bottom: 4px;">Pencatatan Perawatan & Penyulaman</h3>
        <p style="color: var(--clr-text-muted); font-size: 12px;">Bibit pengganti penyulaman dicatat terpisah agar riwayat kelangsungan hidup kelompok awal tidak bias.</p>
      </div>
      <button id="btn-add-maintenance" class="btn-primary-action btn-sm">
        ➕ Catat Tindakan Perawatan / Penyulaman
      </button>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Tanggal</th>
            <th style="padding: 10px 14px;">Kelompok Penanaman</th>
            <th style="padding: 10px 14px;">Jenis Tindakan</th>
            <th style="padding: 10px 14px;">Jumlah Ditangani</th>
            <th style="padding: 10px 14px; color: #f59e0b;">Bibit Penyulaman</th>
            <th style="padding: 10px 14px;">Pelaksana</th>
            <th style="padding: 10px 14px;">Alasan / Catatan</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${r.length>0?r.map(e=>`
                <tr style="border-bottom: 1px solid var(--clr-border);">
                  <td style="padding: 10px 14px; font-weight: 600;">📅 ${dl(e.maintenance_date)}</td>
                  <td style="padding: 10px 14px;">${Q(e.batch_code)} (${Q(e.location_zone)})</td>
                  <td style="padding: 10px 14px;">
                    <span class="admin-header-pill ${e.action_type===`penyulaman`?`pill-warning`:`pill-neutral`}" style="font-size: 11px;">
                      ${Q(e.action_type_label)}
                    </span>
                  </td>
                  <td style="padding: 10px 14px;">${e.plants_handled_count||`-`} bibit</td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #f59e0b;">
                    ${e.replacement_plants_count>0?`+${e.replacement_plants_count} bibit baru`:`-`}
                  </td>
                  <td style="padding: 10px 14px;">${Q(e.officer_or_team)}</td>
                  <td style="padding: 10px 14px; font-size: 12px; color: var(--clr-text-muted);">${Q(e.action_reason||e.notes||`-`)}</td>
                  <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                    <button class="btn-edit-maintenance icon-btn-sm" data-id="${e.id}" title="Edit Catatan Perawatan" aria-label="Edit Catatan Perawatan" style="margin-right: 4px; color: #38bdf8;">✏️</button>
                    <button class="btn-del-maintenance icon-btn-sm" data-id="${e.id}" title="Hapus" aria-label="Hapus" style="color: #ef4444;">🗑️</button>
                  </td>
                </tr>
              `).join(``):`<tr><td colspan="8" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan perawatan.</td></tr>`}
        </tbody>
      </table>
    </div>

  `,document.getElementById(`btn-add-maintenance`)?.addEventListener(`click`,async()=>{await Pl(null,e)}),document.querySelectorAll(`.btn-edit-maintenance`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`);try{t.disabled=!0,t.innerHTML=`⏳`;let r=await Z.getTreeMaintenanceDetail(n);await Pl(r.log||r.maintenance||r,e)}catch(e){m.error(`✕ Gagal memuat data perawatan`,e.message),t.disabled=!1,t.innerHTML=`✏️`}})}),document.querySelectorAll(`.btn-del-maintenance`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`);if(confirm(`Hapus catatan perawatan ini?`))try{await Z.deleteTreeMaintenance(n),m.deleted(`Catatan perawatan berhasil dihapus.`),Nl(e)}catch(e){m.error(`✕ Gagal menghapus perawatan`,e.message)}})})}async function Pl(e=null,t){let n=!!e;(!hl||hl.length===0)&&(hl=(await Z.getPlantingActivities()).activities||[]),t.innerHTML=`
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin/dashboard" style="color: var(--clr-text-muted); text-decoration: none;">Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: var(--clr-text-muted);">Data Penanaman</span>
        <span>&rsaquo;</span>
        <button type="button" id="breadcrumb-btn-mnt-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Perawatan dan Penyulaman</button>
        <span>&rsaquo;</span>
        <span style="color: #38bdf8; font-weight: 600;">${n?`Edit`:`Catat Baru`}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${n?`✏️`:`➕`}</span> ${n?`Edit Perawatan & Penyulaman: ${Q(e.batch_code||e.id)}`:`Catat Tindakan Perawatan / Penyulaman`}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            ${n?`Koreksi tindakan silvikultur, bibit penyulaman baru, dan tim pelaksana penanganan bibit.`:`Catat tindakan silvikultur (penyiangan, penyiraman, pemupukan) atau penyulaman bibit baru pengganti.`}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-mnt" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-cancel-mnt-top" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-mnt-top" class="btn-primary-action btn-sm">
            💾 ${n?`Simpan Perubahan`:`Simpan Tindakan`}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="mnt-form-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="form-maintenance-page" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- CARD 1: INFORMASI BATCH & WAKTU -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🛠️</span> Card 1 — Informasi Batch & Jadwal Pelaksanaan
          </h3>
          <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="mnt-form-act" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kelompok / Batch Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="mnt-form-act" class="form-select" required>
              <option value="">-- Pilih Batch Penanaman --</option>
              ${hl.map(t=>`<option value="${t.id}" ${e&&t.id===e.planting_activity_id?`selected`:``}>${Q(t.batch_code)} - ${Q(t.name)}</option>`).join(``)}
            </select>
          </div>

          <div class="form-group">
            <label for="mnt-form-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Pelaksanaan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="mnt-form-date" class="form-input" required value="${e?ul(e.maintenance_date):new Date().toISOString().split(`T`)[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD ${e?`• Tampilan sebelumnya: ${dl(e.maintenance_date)}`:``}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="mnt-form-team" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Petugas / Tim Pelaksana: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="mnt-form-team" class="form-input" required placeholder="Contoh: Tim Silvikultur IKHW" value="${Q(e?.officer_or_team||`Tim Silvikultur IKHW`)}" />
          </div>
        </div>
      </div>

      <!-- CARD 2: TINDAKAN SILVIKULTUR & BIBIT -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🌱</span> Card 2 — Tindakan Silvikultur & Penanganan Bibit
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="mnt-form-action" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jenis Tindakan Silvikultur: <span style="color: #ef4444;">*</span>
            </label>
            <select id="mnt-form-action" class="form-select" required>
              <option value="penyiangan" ${!e||e.action_type===`penyiangan`?`selected`:``}>Penyiangan (Pembersihan Gulma & Piringan)</option>
              <option value="penyiraman" ${e?.action_type===`penyiraman`?`selected`:``}>Penyiraman</option>
              <option value="pemupukan" ${e?.action_type===`pemupukan`?`selected`:``}>Pemupukan (Organik / NPK)</option>
              <option value="perlindungan_bibit" ${e?.action_type===`perlindungan_bibit`?`selected`:``}>Perlindungan Bibit / Ajir / Mulsa</option>
              <option value="pengendalian_gangguan" ${e?.action_type===`pengendalian_gangguan`?`selected`:``}>Pengendalian Hama / Gangguan</option>
              <option value="penyulaman" ${e?.action_type===`penyulaman`?`selected`:``}>Penyulaman (Tanam Pengganti Bibit Mati)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="mnt-form-handled" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Tanaman Ditangani:
            </label>
            <input type="number" id="mnt-form-handled" class="form-input" min="0" value="${e&&e.plants_handled_count||0}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Jumlah batang pohon yang dirawat / disiangi / dipupuk.</small>
          </div>

          <div class="form-group">
            <label for="mnt-form-replacement" style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Bibit Penyulaman (Bibit Baru Pengganti):
            </label>
            <input type="number" id="mnt-form-replacement" class="form-input" min="0" value="${e&&e.replacement_plants_count||0}" />
            <small style="color: #f59e0b; font-size: 11px;">⚠️ Bibit pengganti dicatat terpisah dan tidak menggabungkan bibit awal.</small>
          </div>

          <div class="form-group">
            <label for="mnt-form-cost" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Estimasi Biaya Tindakan (Rp, opsional):
            </label>
            <input type="number" min="0" id="mnt-form-cost" class="form-input" placeholder="Contoh: 150000" value="${e?.cost||``}" />
          </div>
        </div>
      </div>

      <!-- CARD 3: ALASAN & CATATAN LAPANGAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📝</span> Card 3 — Alasan Silvikultur & Catatan Lapangan
          </h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="form-group">
            <label for="mnt-form-reason" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Penyebab / Alasan Tindakan:
            </label>
            <input type="text" id="mnt-form-reason" class="form-input" placeholder="Gulma menutupi tajuk bibit / bibit mati kekeringan / pemupukan berkala..." value="${Q(e?.action_reason||``)}" />
          </div>

          <div class="form-group">
            <label for="mnt-form-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Catatan Tambahan & Dokumentasi:
            </label>
            <textarea id="mnt-form-notes" class="form-textarea" rows="3" placeholder="Kondisi pasca tindakan, rekomendasi pemantauan lanjutan...">${Q(e?.notes||``)}</textarea>
          </div>
        </div>
      </div>

      <!-- Tombol Aksi Bawah -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
        <button type="button" id="btn-cancel-mnt-bottom" class="btn-secondary-action">
          Batal
        </button>
        <button type="button" id="btn-save-mnt-bottom" class="btn-primary-action">
          💾 ${n?`Simpan Perubahan`:`Simpan Tindakan`}
        </button>
      </div>
    </form>
  `;let r=()=>{Nl(t)};document.getElementById(`breadcrumb-btn-mnt-list`)?.addEventListener(`click`,r),document.getElementById(`btn-back-to-mnt`)?.addEventListener(`click`,r),document.getElementById(`btn-cancel-mnt-top`)?.addEventListener(`click`,r),document.getElementById(`btn-cancel-mnt-bottom`)?.addEventListener(`click`,r);let i=async()=>{let r=document.getElementById(`mnt-form-alert`);r.classList.add(`hidden`),r.textContent=``;let i=document.getElementById(`mnt-form-act`).value,a=document.getElementById(`mnt-form-date`).value,o=fl(a),s=document.getElementById(`mnt-form-action`).value,c=document.getElementById(`mnt-form-team`).value.trim(),l=document.getElementById(`mnt-form-handled`).value,u=document.getElementById(`mnt-form-replacement`).value,d=document.getElementById(`mnt-form-cost`).value,f=document.getElementById(`mnt-form-reason`).value.trim()||null,p=document.getElementById(`mnt-form-notes`).value.trim()||null;if(!i){r.className=`alert-banner alert-danger`,r.textContent=`Pilih kelompok / batch penanaman.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!o){r.className=`alert-banner alert-danger`,r.textContent=`Tanggal pelaksanaan wajib diisi dengan tanggal yang valid.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!c){r.className=`alert-banner alert-danger`,r.textContent=`Petugas atau tim pelaksana wajib diisi.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}let h=parseInt(l,10)||0,g=parseInt(u,10)||0,_=d?parseFloat(d):null;if(h<0){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah tanaman ditangani tidak boleh negatif.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}if(g<0){r.className=`alert-banner alert-danger`,r.textContent=`Jumlah bibit penyulaman tidak boleh negatif.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`});return}let v={planting_activity_id:i,maintenance_date:o,action_type:s,officer_or_team:c,plants_handled_count:h,replacement_plants_count:g,action_reason:f,notes:p,cost:_},y=[document.getElementById(`btn-save-mnt-top`),document.getElementById(`btn-save-mnt-bottom`)];y.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{await Z.saveTreeMaintenance(v,n?e.id:null),n?m.show({type:`success`,title:`Berhasil diperbarui.`,message:`Catatan perawatan dan penyulaman berhasil diperbarui.`}):m.saved(`Catatan perawatan dan penyulaman berhasil disimpan.`),await Nl(t)}catch(e){r.className=`alert-banner alert-danger`,r.textContent=`Gagal menyimpan catatan perawatan: ${e.message}. Seluruh data input tetap dipertahankan.`,r.classList.remove(`hidden`),r.scrollIntoView({behavior:`smooth`,block:`center`}),m.error(`✕ Gagal menyimpan perawatan`,e.message),y.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=n?`💾 Simpan Perubahan`:`💾 Simpan Tindakan`)})}};document.getElementById(`btn-save-mnt-top`)?.addEventListener(`click`,i),document.getElementById(`btn-save-mnt-bottom`)?.addEventListener(`click`,i)}function Fl(e){e.innerHTML=`
    <div style="max-width: 780px;">
      <h3 style="font-size: 16px; margin-bottom: 6px;">Ekspor Laporan Resmi Penanaman & Pemantauan</h3>
      <p style="color: var(--clr-text-muted); font-size: 13px; margin-bottom: 20px;">
        Unduh laporan format CSV terstandar dengan encoding UTF-8 BOM untuk kompatibilitas langsung di Microsoft Excel, Google Sheets, dan LibreOffice.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
        <div class="admin-pane-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 28px;">📊</span>
            <h4 style="font-size: 14px; margin: 8px 0 4px;">Ringkasan Penanaman & Kelangsungan Hidup</h4>
            <p style="font-size: 12px; color: var(--clr-text-muted);">Memuat kode batch, tanggal tanam, zona, bibit awal, jumlah hidup survei terkini, tingkat kelangsungan hidup, dan bibit penyulaman.</p>
          </div>
          <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" style="text-decoration: none; text-align: center; margin-top: 14px;">
            📥 Unduh CSV Ringkasan
          </a>
        </div>

        <div class="admin-pane-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 28px;">🌿</span>
            <h4 style="font-size: 14px; margin: 8px 0 4px;">Master Jenis Pohon</h4>
            <p style="font-size: 12px; color: var(--clr-text-muted);">Daftar seluruh spesies pohon tercatat beserta nama ilmiah, famili botani, status jenis lokal/introduksi, fungsi ekologis, dan total bibit ditanam.</p>
          </div>
          <a href="/api/admin/trees/reports/species/csv" class="btn-secondary-action btn-sm" style="text-decoration: none; text-align: center; margin-top: 14px;">
            📥 Unduh CSV Master Pohon
          </a>
        </div>

        <div class="admin-pane-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 28px;">🔍</span>
            <h4 style="font-size: 14px; margin: 8px 0 4px;">Riwayat Survei Pemantauan</h4>
            <p style="font-size: 12px; color: var(--clr-text-muted);">Laporan detail seluruh survei berkala menurut tanggal, kondisi kesehatan tanaman, ukuran rata-rata tinggi dan diameter, serta catatan surveyor.</p>
          </div>
          <a href="/api/admin/trees/reports/surveys/csv" class="btn-secondary-action btn-sm" style="text-decoration: none; text-align: center; margin-top: 14px;">
            📥 Unduh CSV Catatan Survei
          </a>
        </div>
      </div>
    </div>
  `}function Il(e){e.innerHTML=`
    <div style="max-width: 800px;">
      <h3 style="font-size: 16px; margin-bottom: 6px;">Impor Data Penanaman & Pemantauan</h3>
      <p style="color: var(--clr-text-muted); font-size: 13px; margin-bottom: 20px;">
        Unggah data massal menggunakan berkas CSV dengan template resmi. Sistem akan memvalidasi baris, mendeteksi kesalahan, dan menampilkan pratinjau sebelum disimpan. Data historis yang ada tidak akan terhapus.
      </p>

      <div class="form-row" style="margin-bottom: 16px;">
        <div class="form-group" style="flex: 1;">
          <label>1. Unduh Template CSV Resmi:</label>
          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <a href="/api/admin/trees/import/template/species" class="btn-secondary-action btn-sm" style="text-decoration: none;">
              📥 Template Master Jenis Pohon
            </a>
            <a href="/api/admin/trees/import/template/activities" class="btn-secondary-action btn-sm" style="text-decoration: none;">
              📥 Template Kegiatan Penanaman
            </a>
          </div>
        </div>
      </div>

      <div class="admin-pane-card" style="padding: 18px; margin-bottom: 20px;">
        <h4 style="font-size: 14px; margin-bottom: 12px;">2. Unggah & Periksa Berkas CSV</h4>
        <form id="form-import-preview" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Jenis Data Impor: *</label>
              <select id="import-type" class="form-select" required>
                <option value="species">Master Jenis Pohon</option>
                <option value="activities">Kegiatan Penanaman & Bibit Awal</option>
              </select>
            </div>
            <div class="form-group" style="flex: 2;">
              <label>Pilih Berkas CSV: *</label>
              <input type="file" id="import-file" class="form-input" accept=".csv,text/csv" required />
            </div>
          </div>
          <div>
            <button type="submit" class="btn-primary-action btn-sm">🔍 Periksa & Pratinjau Berkas</button>
          </div>
        </form>
      </div>

      <!-- Preview Container -->
      <div id="import-preview-container" class="hidden" style="margin-top: 16px;">
        <!-- Populated dynamically -->
      </div>
    </div>
  `;let t=document.getElementById(`form-import-preview`),n=document.getElementById(`import-preview-container`);t?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`import-type`).value,r=document.getElementById(`import-file`).files[0];if(r){n.innerHTML=`<div style="text-align: center; padding: 20px;">⏳ Memvalidasi berkas CSV...</div>`,n.classList.remove(`hidden`);try{let e=await Z.previewTreeImport(r,t);Ll(n,e,t)}catch(e){n.innerHTML=`
        <div class="alert-banner alert-danger">
          ⚠️ Validasi Gagal: ${Q(e.message)}
        </div>
      `}}})}function Ll(e,t,n){let r=t.invalid_count>0,i=t.valid_count>0;e.innerHTML=`
    <div class="admin-pane-card" style="padding: 16px;">
      <h4 style="font-size: 14px; margin-bottom: 8px;">Hasil Pemeriksaan Berkas</h4>
      <div style="display: flex; gap: 12px; font-size: 13px; margin-bottom: 14px;">
        <span class="admin-header-pill pill-neutral">Total: ${t.total_rows} baris</span>
        <span class="admin-header-pill pill-success">Valid: ${t.valid_count} baris</span>
        ${r?`<span class="admin-header-pill pill-danger">Bermasalah: ${t.invalid_count} baris</span>`:``}
      </div>

      ${r?`
        <div style="margin-bottom: 14px; background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 10px; border-radius: 4px; font-size: 12px;">
          <b>Baris Bermasalah (Dilewati):</b>
          <ul style="margin: 4px 0 0 16px;">
            ${t.invalid_rows.map(e=>`<li>Baris ${e.line}: ${e.errors.join(`, `)}</li>`).join(``)}
          </ul>
        </div>
      `:``}

      <div style="overflow-x: auto; max-height: 240px; margin-bottom: 14px;">
        <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03);">
              <th style="padding: 6px 10px;">Baris</th>
              <th style="padding: 6px 10px;">Data Utama</th>
              <th style="padding: 6px 10px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${t.valid_preview.map(e=>`
              <tr style="border-bottom: 1px solid var(--clr-border);">
                <td style="padding: 6px 10px;">${e.line}</td>
                <td style="padding: 6px 10px;">${Q(e.common_name||e.batch_code||``)} ${e.scientific_name?`(<i>${e.scientific_name}</i>)`:``} ${e.quantity?`— ${e.quantity} bibit`:``}</td>
                <td style="padding: 6px 10px; color: #10b981;">✓ Valid</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

      ${i?`
        <button id="btn-execute-import" class="btn-primary-action btn-sm">
          💾 Simpan ${t.valid_count} Data Valid ke Database
        </button>
      `:`<p style="color: #ef4444; font-size: 13px;">Tidak ada data valid yang dapat diimpor. Silakan perbaiki berkas CSV.</p>`}
    </div>
  `,document.getElementById(`btn-execute-import`)?.addEventListener(`click`,async()=>{let r=document.getElementById(`btn-execute-import`);try{r&&(r.disabled=!0,r.textContent=`Menyimpan data impor...`);let i=await Z.executeTreeImport(n,t.valid_data);m.imported(i?.message||`Data impor berhasil disimpan ke database.`),e.classList.add(`hidden`)}catch(e){m.error(`✕ Gagal mengimpor data`,e.message)}finally{r&&(r.disabled=!1,r.textContent=`💾 Simpan ${t.valid_count} Data Valid ke Database`)}})}function Q(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}function Rl(e){return e?e.charAt(0).toUpperCase()+e.slice(1):``}var zl=null,Bl=[],Vl=`all`,Hl=``,Ul=`all`;function Wl(e,t){zl=t,Vl=`all`,Hl=``,Ul=`all`,e.innerHTML=`
    <div class="zone-gallery-admin-wrapper space-y-5">
      <!-- Gallery Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 class="text-base font-bold text-white flex items-center gap-2">
            <span>🖼️</span> Galeri Foto Kawasan: <span class="text-emerald-400 font-semibold">${$l(t.name)}</span>
          </h4>
          <p class="text-xs text-slate-400 mt-1">
            Unggah dan kelola foto dokumentasi lapangan, kegiatan penanaman, pemantauan, dan pilih foto sampul utama.
          </p>
        </div>
        <div class="flex items-center gap-2.5 shrink-0">
          <button id="btn-admin-upload-photos" class="btn-primary-action btn-sm flex items-center gap-1.5 cursor-pointer">
            <span>➕</span> Unggah Foto Baru
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
        <div class="flex flex-wrap items-center gap-2">
          <label class="text-xs text-slate-400">Kategori:</label>
          <select id="admin-gallery-cat-filter" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500">
            <option value="all">Semua Kategori</option>
            <option value="Kondisi Kawasan">Kondisi Kawasan</option>
            <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
            <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
            <option value="Pemantauan">Pemantauan</option>
            <option value="Perawatan">Perawatan</option>
            <option value="Fasilitas">Fasilitas</option>
            <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
          </select>

          <label class="text-xs text-slate-400 ml-2">Status:</label>
          <select id="admin-gallery-status-filter" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500">
            <option value="all">Semua Status</option>
            <option value="published">Publikasi Saja</option>
            <option value="draft">Internal Saja</option>
          </select>
        </div>

        <div class="relative min-w-[200px]">
          <span class="absolute inset-y-0 left-2.5 flex items-center text-slate-500 text-xs">🔍</span>
          <input
            type="text"
            id="admin-gallery-search"
            placeholder="Cari foto..."
            class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-emerald-500 placeholder-slate-500"
          />
        </div>
      </div>

      <!-- Photos Grid Container -->
      <div id="admin-gallery-grid" class="min-h-[220px]">
        <div class="flex items-center justify-center py-12 text-slate-400 gap-2">
          <span class="animate-spin text-lg">⏳</span> Memuat foto kawasan...
        </div>
      </div>
    </div>

    <!-- Upload Modal Container -->
    <div id="admin-upload-modal" class="modal-overlay hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📤</span> Unggah Foto Dokumentasi Kawasan
          </h4>
          <button id="btn-close-upload-modal" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>

        <form id="admin-upload-form" class="space-y-4">
          <div id="admin-upload-error" class="hidden p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Pilih File Foto (Bisa pilih beberapa) *</label>
            <input
              type="file"
              id="upload-file-input"
              multiple
              accept="image/jpeg,image/png,image/webp"
              required
              class="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer bg-slate-800/80 p-2 rounded-xl border border-slate-700"
            />
            <p class="text-[11px] text-slate-500 mt-1">Format: JPG, PNG, atau WebP. Maks 5 MB per file.</p>
          </div>

          <div id="upload-preview-list" class="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800 hidden"></div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Judul / Label Foto</label>
              <input
                type="text"
                id="upload-title-input"
                placeholder="Kosongkan untuk nama file"
                class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Kategori Foto *</label>
              <select id="upload-category-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500">
                <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
                <option value="Pemantauan">Pemantauan</option>
                <option value="Perawatan">Perawatan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Deskripsi / Keterangan (Caption)</label>
            <textarea
              id="upload-caption-input"
              rows="2"
              placeholder="Catatan tambahan mengenai foto ini..."
              class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Tanggal Dokumentasi</label>
              <input
                type="date"
                id="upload-date-input"
                class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500"
              />
            </div>
            <div class="flex flex-col justify-end space-y-1.5 pb-1">
              <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" id="upload-is-published" checked class="rounded bg-slate-800 text-emerald-500" />
                <span>Publikasikan foto</span>
              </label>
              <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" id="upload-is-cover" class="rounded bg-slate-800 text-emerald-500" />
                <span>Jadikan Sampul Kawasan</span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button type="button" id="btn-cancel-upload" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition">
              Batal
            </button>
            <button type="submit" id="btn-submit-upload" class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg flex items-center gap-1.5">
              <span>🚀</span> Mulai Unggah
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Photo Modal Container -->
    <div id="admin-edit-photo-modal" class="modal-overlay hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <span>✏️</span> Edit Metadata Foto
          </h4>
          <button id="btn-close-edit-modal" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>

        <form id="admin-edit-photo-form" class="space-y-3.5">
          <input type="hidden" id="edit-photo-id" />
          <div id="admin-edit-error" class="hidden p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>

          <div class="flex items-center gap-3 p-2 bg-slate-950/70 rounded-xl border border-slate-800">
            <img id="edit-preview-img" src="" alt="" class="w-16 h-16 rounded-lg object-cover" />
            <div class="text-xs text-slate-400 flex-1 overflow-hidden">
              <p id="edit-preview-filename" class="font-mono text-slate-300 truncate">-</p>
              <label class="mt-1.5 inline-block text-[11px] text-emerald-400 hover:underline cursor-pointer">
                Ganti File Foto
                <input type="file" id="edit-replace-file" accept="image/jpeg,image/png,image/webp" class="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Judul Foto</label>
            <input type="text" id="edit-title-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Deskripsi / Keterangan</label>
            <textarea id="edit-caption-input" rows="2" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-emerald-500"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
              <select id="edit-category-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-2.5 py-2 outline-none focus:border-emerald-500">
                <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
                <option value="Pemantauan">Pemantauan</option>
                <option value="Perawatan">Perawatan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Tanggal Dokumentasi</label>
              <input type="date" id="edit-date-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-2.5 py-2 outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="edit-is-published" class="rounded bg-slate-800 text-emerald-500" />
              <span>Publikasikan foto</span>
            </label>
            <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="edit-is-cover" class="rounded bg-slate-800 text-emerald-500" />
              <span>Foto Sampul</span>
            </label>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button type="button" id="btn-cancel-edit" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition">
              Batal
            </button>
            <button type="submit" id="btn-submit-edit" class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;let n=document.getElementById(`admin-gallery-cat-filter`),r=document.getElementById(`admin-gallery-status-filter`),i=document.getElementById(`admin-gallery-search`);n&&n.addEventListener(`change`,e=>{Vl=e.target.value,Kl()}),r&&r.addEventListener(`change`,e=>{Ul=e.target.value,Kl()}),i&&i.addEventListener(`input`,e=>{Hl=e.target.value.toLowerCase().trim(),Kl()}),ql(),Xl(),Gl()}async function Gl(){let e=document.getElementById(`admin-gallery-grid`);if(e&&zl)try{Bl=(await Z.getZonePhotos(zl.id)).photos||[],Kl()}catch(t){console.error(`Failed to load zone photos:`,t),e.innerHTML=`
      <div class="p-6 text-center text-xs text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
        Gagal memuat foto kawasan: ${$l(t.message)}
      </div>
    `}}function Kl(){let e=document.getElementById(`admin-gallery-grid`);if(!e)return;let t=Bl.filter(e=>{if(Vl!==`all`&&e.category!==Vl||Ul===`published`&&!e.is_published||Ul===`draft`&&e.is_published)return!1;if(Hl){let t=(e.title||``).toLowerCase().includes(Hl),n=(e.caption||``).toLowerCase().includes(Hl);if(!t&&!n)return!1}return!0});if(t.length===0){e.innerHTML=`
      <div class="p-12 text-center text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
        <div class="text-4xl mb-3">📷</div>
        <h5 class="text-sm font-bold text-white mb-1">Belum Ada Foto untuk Kawasan Ini</h5>
        <p class="text-xs text-slate-400 max-w-sm mx-auto mb-4">
          Unggah dokumentasi foto lapangan seperti kondisi lahan, bibit penanaman, atau survei pemantauan berkala.
        </p>
        <button id="btn-empty-upload" class="btn-primary-action btn-sm">
          ➕ Unggah Foto Pertama
        </button>
      </div>
    `;let t=document.getElementById(`btn-empty-upload`);t&&t.addEventListener(`click`,Jl)}else e.innerHTML=`
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${t.map(e=>{let t=e.file_url||e.file_path,n=e.file_size?`${Math.round(e.file_size/1024)} KB`:`-`,r=dl(e.documented_at);return`
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition shadow-lg">
            <div class="relative aspect-4/3 bg-slate-950 overflow-hidden group">
              <img
                src="${t}"
                alt="${$l(e.alt_text||e.title)}"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onerror="this.src='/favicon.svg'"
              />
              <div class="absolute top-2 left-2 flex flex-wrap gap-1">
                ${e.is_cover?`
                  <span class="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md shadow">
                    ⭐ Sampul
                  </span>
                `:``}
                <span class="text-[10px] font-semibold ${e.is_published?`bg-emerald-500/90 text-white`:`bg-slate-700 text-slate-300`} px-2 py-0.5 rounded-md backdrop-blur-sm">
                  ${e.is_published?`👁️ Publik`:`🔒 Internal`}
                </span>
              </div>
              <div class="absolute bottom-2 left-2">
                <span class="text-[10px] font-medium bg-black/70 backdrop-blur-sm text-slate-300 px-2 py-0.5 rounded-md">
                  🏷️ ${$l(e.category||`Kondisi Kawasan`)}
                </span>
              </div>
            </div>

            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h5 class="text-xs font-bold text-white line-clamp-1" title="${$l(e.title||`-`)}">
                  ${$l(e.title||`Foto Tanpa Judul`)}
                </h5>
                ${e.caption?`
                  <p class="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug" title="${$l(e.caption)}">
                    ${$l(e.caption)}
                  </p>
                `:``}
              </div>

              <div class="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                <span>📅 ${r}</span>
                <span>📦 ${n}</span>
              </div>
            </div>

            <div class="p-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-1">
              ${e.is_cover?`
                <span class="text-[11px] text-amber-400 font-bold px-2 py-1">
                  ⭐ Sampul Aktif
                </span>
              `:`
                <button
                  class="btn-set-cover text-[11px] font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 px-2 py-1 rounded-lg transition"
                  data-id="${e.id}"
                  title="Jadikan sebagai foto sampul utama kawasan"
                >
                  ⭐ Jadikan Sampul
                </button>
              `}

              <div class="flex items-center gap-1">
                <button
                  class="btn-edit-photo text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
                  data-id="${e.id}"
                  title="Edit metadata foto"
                >
                  ✏️
                </button>
                <button
                  class="btn-delete-photo text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition"
                  data-id="${e.id}"
                  title="Hapus foto ini"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `}).join(``)}
    </div>
  `,e.querySelectorAll(`.btn-set-cover`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);try{e.textContent=`Menyimpan...`,e.disabled=!0,await Z.setZoneCoverPhoto(zl.id,t),m.updated(`Foto berhasil ditetapkan sebagai sampul kawasan.`),await Gl()}catch(e){m.error(`✕ Gagal menetapkan foto sampul`,e.message)}finally{e.disabled=!1,e.textContent=`⭐ Jadikan Sampul`}})}),e.querySelectorAll(`.btn-edit-photo`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-id`),10),n=Bl.find(e=>e.id===t);n&&Zl(n)})}),e.querySelectorAll(`.btn-delete-photo`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(confirm(`Apakah Anda yakin ingin menghapus foto dokumentasi ini?`))try{await Z.deleteZonePhoto(zl.id,t),m.deleted(`Foto dokumentasi kawasan berhasil dihapus.`),await Gl()}catch(e){m.error(`✕ Gagal menghapus foto`,e.message)}})})}function ql(){let e=document.getElementById(`btn-admin-upload-photos`);document.getElementById(`admin-upload-modal`);let t=document.getElementById(`btn-close-upload-modal`),n=document.getElementById(`btn-cancel-upload`),r=document.getElementById(`admin-upload-form`),i=document.getElementById(`upload-file-input`),a=document.getElementById(`upload-preview-list`);e&&e.addEventListener(`click`,Jl),t&&t.addEventListener(`click`,Yl),n&&n.addEventListener(`click`,Yl),i&&i.addEventListener(`change`,e=>{let t=Array.from(e.target.files);t.length>0&&a?(a.classList.remove(`hidden`),a.innerHTML=t.map(e=>`
          <span class="inline-flex items-center gap-1 bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-md border border-slate-700">
            📄 ${$l(e.name)} (${Math.round(e.size/1024)} KB)
          </span>
        `).join(``)):a&&a.classList.add(`hidden`)}),r&&r.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`admin-upload-error`),n=document.getElementById(`btn-submit-upload`);t&&t.classList.add(`hidden`);let o=i.files;if(!o||o.length===0){t&&(t.textContent=`Pilih setidaknya satu file foto.`,t.classList.remove(`hidden`));return}let s=new FormData;Array.from(o).forEach(e=>{s.append(`photos[]`,e)}),s.append(`title`,document.getElementById(`upload-title-input`).value.trim()),s.append(`category`,document.getElementById(`upload-category-input`).value),s.append(`caption`,document.getElementById(`upload-caption-input`).value.trim());let c=fl(document.getElementById(`upload-date-input`).value);c&&s.append(`documented_at`,c),s.append(`is_published`,document.getElementById(`upload-is-published`).checked?`1`:`0`),s.append(`is_cover`,document.getElementById(`upload-is-cover`).checked?`1`:`0`),n.disabled=!0,n.innerHTML=`<span class="animate-spin">⏳</span> Mengunggah...`;try{let e=await Z.uploadZonePhotos(zl.id,s);Yl(),r.reset(),a&&a.classList.add(`hidden`),m.uploaded(e?.message||`Foto kawasan dan metadata berhasil diunggah.`),await Gl()}catch(e){t&&(t.textContent=e.message||`Gagal mengunggah foto.`,t.classList.remove(`hidden`)),m.error(`✕ Gagal mengunggah foto`,e.message||`Periksa file foto dan coba lagi.`)}finally{n.disabled=!1,n.innerHTML=`<span>🚀</span> Mulai Unggah`}})}function Jl(){let e=document.getElementById(`admin-upload-modal`),t=document.getElementById(`upload-date-input`);t&&!t.value&&(t.value=new Date().toISOString().substring(0,10)),e&&e.classList.remove(`hidden`)}function Yl(){let e=document.getElementById(`admin-upload-modal`);e&&e.classList.add(`hidden`)}function Xl(){document.getElementById(`admin-edit-photo-modal`);let e=document.getElementById(`btn-close-edit-modal`),t=document.getElementById(`btn-cancel-edit`),n=document.getElementById(`admin-edit-photo-form`),r=document.getElementById(`edit-replace-file`);e&&e.addEventListener(`click`,Ql),t&&t.addEventListener(`click`,Ql),r&&r.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){let e=document.getElementById(`edit-preview-img`),n=document.getElementById(`edit-preview-filename`);e&&(e.src=URL.createObjectURL(t)),n&&(n.textContent=`File Baru: ${t.name}`)}}),n&&n.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-photo-id`).value,n=document.getElementById(`btn-submit-edit`),i=document.getElementById(`admin-edit-error`);i&&i.classList.add(`hidden`);let a=new FormData;a.append(`title`,document.getElementById(`edit-title-input`).value.trim()),a.append(`caption`,document.getElementById(`edit-caption-input`).value.trim()),a.append(`category`,document.getElementById(`edit-category-input`).value);let o=fl(document.getElementById(`edit-date-input`).value);o&&a.append(`documented_at`,o),a.append(`is_published`,document.getElementById(`edit-is-published`).checked?`1`:`0`),a.append(`is_cover`,document.getElementById(`edit-is-cover`).checked?`1`:`0`),r&&r.files.length>0&&a.append(`photo`,r.files[0]),n.disabled=!0,n.textContent=`Menyimpan...`;try{let e=await Z.updateZonePhoto(zl.id,t,a);Ql(),m.updated(e?.message||`Metadata foto kawasan berhasil diperbarui.`),await Gl()}catch(e){i&&(i.textContent=e.message||`Gagal memperbarui metadata foto.`,i.classList.remove(`hidden`)),m.error(`✕ Gagal memperbarui foto`,e.message)}finally{n.disabled=!1,n.textContent=`Simpan Perubahan`}})}function Zl(e){let t=document.getElementById(`admin-edit-photo-modal`);if(!t)return;document.getElementById(`edit-photo-id`).value=e.id,document.getElementById(`edit-title-input`).value=e.title||``,document.getElementById(`edit-caption-input`).value=e.caption||``,document.getElementById(`edit-category-input`).value=e.category||`Kondisi Kawasan`,document.getElementById(`edit-date-input`).value=ul(e.documented_at),document.getElementById(`edit-is-published`).checked=!!e.is_published,document.getElementById(`edit-is-cover`).checked=!!e.is_cover;let n=document.getElementById(`edit-preview-img`),r=document.getElementById(`edit-preview-filename`);n&&(n.src=e.file_url||e.file_path),r&&(r.textContent=e.title||`Foto #${e.id}`);let i=document.getElementById(`edit-replace-file`);i&&(i.value=``);let a=document.getElementById(`admin-edit-error`);a&&a.classList.add(`hidden`),t.classList.remove(`hidden`)}function Ql(){let e=document.getElementById(`admin-edit-photo-modal`);e&&e.classList.add(`hidden`)}function $l(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var eu=[],tu=null;async function nu({scenes:e=[],onNavigateToTour:t,onOpenHotspotEditor:n}={}){let r=document.getElementById(`admin-zones-content`);r&&(iu(r),await au())}async function ru(e,t=null,n=`tab-ringkasan`){t&&(tu=t);let r=document.getElementById(`admin-zones-content`);r&&(document.getElementById(`zone-pane-container`)||iu(r),r.querySelectorAll(`.zone-nav-tab`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-zone-tab`)===e)}),e===`list`?eu.length===0?await au():ou():e===`create`?lu(null):e===`detail`&&tu?uu(tu,n):e===`gallery`&&(eu.length===0&&await au(),yu()))}function iu(e){e.innerHTML=`
    <div class="admin-section-header" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span style="font-size: 22px;">🏞️</span> Manajemen Kawasan / Lahan Penanaman
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Kelola multiple kawasan konservasi dan penanaman pohon, batas deskriptif, luasan lahan (ha/m²), dan tautan Virtual Tour 360°.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-zone-add-new" class="btn-primary-action btn-sm">
            ➕ Tambah Kawasan Baru
          </button>
        </div>
      </div>
    </div>

    <!-- Zones Sub-navigation Bar -->
    <div class="zone-subtabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px; margin-bottom: 20px; overflow-x: auto;">
      <button class="zone-nav-tab active" data-zone-tab="list">📋 Daftar Kawasan / Lahan</button>
      <button class="zone-nav-tab" data-zone-tab="create">➕ Formulir Tambah Kawasan</button>
      <button class="zone-nav-tab" data-zone-tab="gallery">🖼️ Galeri Foto Kawasan</button>
      <button class="zone-nav-tab hidden" id="tab-nav-zone-detail" data-zone-tab="detail">🔍 Detail Kawasan</button>
    </div>

    <!-- Zone Pane Dynamic Container -->
    <div id="zone-pane-container" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat data kawasan...
      </div>
    </div>
  `,e.querySelectorAll(`.zone-nav-tab`).forEach(e=>{e.addEventListener(`click`,()=>{ru(e.getAttribute(`data-zone-tab`))})});let t=e.querySelector(`#btn-zone-add-new`);t&&t.addEventListener(`click`,()=>{ru(`create`)})}async function au(){let e=document.getElementById(`zone-pane-container`);if(e)try{eu=(await Z.getZones({sort_by:`created_at`,sort_dir:`asc`})).zones||[],ou()}catch(t){e.innerHTML=`
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat data kawasan: ${t.message}
        <button id="btn-retry-zones" class="btn-secondary-action btn-sm" style="margin-left: 12px;">Coba Lagi</button>
      </div>
    `;let n=document.getElementById(`btn-retry-zones`);n&&n.addEventListener(`click`,au)}}function ou(){let e=document.getElementById(`zone-pane-container`);if(!e)return;let t=eu.length,n=eu.reduce((e,t)=>e+(parseFloat(t.area_in_ha)||0),0),r=eu.reduce((e,t)=>e+(parseInt(t.total_initial_seedlings)||0),0);e.innerHTML=`
    <!-- Top Filter & Search Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; background: var(--clr-surface); padding: 14px 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; flex: 1;">
        <input type="text" id="zone-search-input" class="form-input" placeholder="🔍 Cari nama, kode, lokasi, penanggung jawab..." style="max-width: 300px; padding: 7px 12px; font-size: 13px;" />
        <select id="zone-filter-status" class="form-select" style="padding: 7px 12px; font-size: 13px;">
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="preparation">Persiapan</option>
          <option value="monitoring">Pemantauan</option>
          <option value="completed">Selesai</option>
        </select>
        <select id="zone-filter-archived" class="form-select" style="padding: 7px 12px; font-size: 13px;">
          <option value="false">Kawasan Aktif</option>
          <option value="true">Diarsipkan</option>
        </select>
      </div>

      <!-- Quick Metrics Pill -->
      <div style="display: flex; gap: 16px; font-size: 12px; color: var(--clr-text-muted);">
        <div>Total Kawasan: <strong style="color: #fff;">${t}</strong></div>
        <div>Total Luas: <strong style="color: var(--clr-primary);">${n.toFixed(2)} Ha</strong></div>
        <div>Total Bibit: <strong style="color: #fff;">${r.toLocaleString(`id-ID`)} Batang</strong></div>
      </div>
    </div>

    <!-- Zones List / Cards -->
    <div id="zones-table-wrapper" class="table-responsive">
      ${su(eu)}
    </div>
  `;let i=document.getElementById(`zone-search-input`),a=document.getElementById(`zone-filter-status`),o=document.getElementById(`zone-filter-archived`),s=async()=>{let e=i.value.trim(),t=a.value,n=o.value;try{eu=(await Z.getZones({search:e,status:t,archived:n})).zones||[];let r=document.getElementById(`zones-table-wrapper`);r&&(r.innerHTML=su(eu)),cu()}catch(e){console.error(e)}};i&&i.addEventListener(`input`,bu(s,300)),a&&a.addEventListener(`change`,s),o&&o.addEventListener(`change`,s),cu()}function su(e){return!e||e.length===0?`
      <div style="text-align: center; padding: 48px 20px; background: var(--clr-surface); border-radius: var(--radius-md); border: 1px dashed var(--clr-border);">
        <div style="font-size: 40px; margin-bottom: 12px;">🏞️</div>
        <h4 style="color: #fff; margin-bottom: 6px;">Belum Ada Kawasan / Lahan Penanaman Terdaftar</h4>
        <p style="color: var(--clr-text-muted); font-size: 13px; max-width: 480px; margin: 0 auto 18px;">
          Sistem mendukung pengelolaan beberapa kawasan penanaman secara terintegrasi. Tambahkan kawasan penanaman pertama Anda.
        </p>
        <button id="btn-empty-add-zone" class="btn-primary-action btn-sm">➕ Tambah Kawasan Sekarang</button>
      </div>
    `:`
    <table class="data-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
      <thead>
        <tr style="background: var(--clr-surface-card); border-bottom: 2px solid var(--clr-border); color: var(--clr-text-muted); font-size: 12px; text-transform: uppercase;">
          <th style="padding: 12px 14px;">Kode</th>
          <th style="padding: 12px 14px;">Nama Kawasan & Lokasi</th>
          <th style="padding: 12px 14px;">Luas Lahan</th>
          <th style="padding: 12px 14px; text-align: center;">Penanaman</th>
          <th style="padding: 12px 14px; text-align: center;">Bibit Awal</th>
          <th style="padding: 12px 14px; text-align: center;">Survival</th>
          <th style="padding: 12px 14px; text-align: center;">Panorama</th>
          <th style="padding: 12px 14px; text-align: center;">Status</th>
          <th style="padding: 12px 14px; text-align: right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${e.map(e=>{let t={active:`<span class="badge-status-published">Aktif</span>`,preparation:`<span class="badge-status-draft">Persiapan</span>`,monitoring:`<span class="badge-status-draft" style="color:#38bdf8;border-color:rgba(56,189,248,0.3)">Pemantauan</span>`,completed:`<span class="badge-status-inactive">Selesai</span>`}[e.status]||e.status,n=e.survival_rate===null?`<span style="color:var(--clr-text-dim)">Belum cukup</span>`:`${e.survival_rate}%`;return`
      <tr data-zone-id="${e.id}" style="border-bottom: 1px solid var(--clr-border-subtle);">
        <td style="padding: 12px 14px;">
          <span style="font-family: monospace; font-size: 12px; background: rgba(16,185,129,0.1); color: var(--clr-primary); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.2);">
            ${e.zone_code}
          </span>
        </td>
        <td style="padding: 12px 14px;">
          <div style="font-weight: 600; color: #fff; font-size: 14px;">${$(e.name)}</div>
          <div style="font-size: 11px; color: var(--clr-text-muted); margin-top: 2px;">
            ${$(e.category||`Silvikultur`)} • ${$(e.city||e.province||`Aceh`)}
          </div>
        </td>
        <td style="padding: 12px 14px;">
          <div style="font-weight: 600; color: var(--clr-primary); font-size: 13px;">${e.area_size} ${e.area_unit}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">(±${(parseFloat(e.area_in_ha)||0).toFixed(2)} Ha)</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; color: #fff; font-size: 13px;">${e.activities_count||0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">kegiatan</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; color: #fff; font-size: 13px;">${(e.total_initial_seedlings||0).toLocaleString(`id-ID`)}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">${e.species_count||0} jenis</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; font-size: 13px;">${n}</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; color: #fff; font-size: 13px;">${e.scenes_count||0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">scene 360°</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          ${t}
        </td>
        <td style="padding: 12px 14px; text-align: right; white-space: nowrap;">
          <div style="display: inline-flex; gap: 4px;">
            <button class="btn-action-detail btn-text-btn btn-sm" data-id="${e.id}" title="Buka Detail Kawasan (8 Tab)">
              🔍 Detail
            </button>
            <button class="btn-action-edit btn-text-btn btn-sm" data-id="${e.id}" title="Edit Data Kawasan">
              ✏️ Edit
            </button>
            <button class="btn-action-tour btn-text-btn btn-sm" data-id="${e.id}" title="Buka Virtual Tour Kawasan Ini">
              🌐 Tour
            </button>
            <button class="btn-action-archive btn-text-btn btn-sm" data-id="${e.id}" title="${e.is_archived?`Aktifkan Kembali`:`Arsipkan Kawasan`}" style="color: ${e.is_archived?`#10b981`:`#f59e0b`};">
              ${e.is_archived?`♻️ Pulihkan`:`📦 Arsip`}
            </button>
            <button class="btn-action-delete btn-text-btn btn-sm" data-id="${e.id}" title="Hapus Kawasan" style="color: #ef4444;">
              🗑️ Hapus
            </button>
          </div>
        </td>
      </tr>
    `}).join(``)}
      </tbody>
    </table>
  `}function cu(){let e=document.getElementById(`zone-pane-container`);if(!e)return;let t=e.querySelector(`#btn-empty-add-zone`);t&&t.addEventListener(`click`,()=>ru(`create`)),e.querySelectorAll(`.btn-action-detail`).forEach(e=>{e.addEventListener(`click`,()=>{ru(`detail`,e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-action-edit`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);try{lu((await Z.getZone(t)).zone)}catch(e){m.error(`✕ Gagal memuat kawasan`,e.message)}})}),e.querySelectorAll(`.btn-action-tour`).forEach(e=>{e.addEventListener(`click`,()=>{e.getAttribute(`data-id`),window.location.hash=`tour`})}),e.querySelectorAll(`.btn-action-archive`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(confirm(`Ubah status arsip kawasan ini?`))try{let e=await Z.archiveZone(t);window.dispatchEvent(new CustomEvent(`zones-updated`)),m.show({type:`success`,title:e.action===`archived`?`✓ Berhasil diarsipkan`:`✓ Berhasil dipulihkan`,message:e.message||`Status kawasan berhasil diperbarui.`}),await au()}catch(e){m.error(`✕ Gagal mengubah status arsip`,e.message)}})}),e.querySelectorAll(`.btn-action-delete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(confirm(`Yakin ingin menghapus kawasan ini? Kawasan tanpa data terkait akan dihapus permanen, atau diarsipkan jika memiliki data.`))try{let e=await Z.deleteZone(t);window.dispatchEvent(new CustomEvent(`zones-updated`)),m.show({type:`success`,title:e.action===`deleted`?`✓ Berhasil dihapus`:`✓ Berhasil diarsipkan`,message:e.message||`Kawasan berhasil dihapus.`}),await au()}catch(e){m.error(`✕ Gagal menghapus kawasan`,e.message)}})})}function lu(e=null){let t=document.getElementById(`zone-pane-container`);if(!t)return;let n=!!e,r=n?`Edit Kawasan: ${e.name}`:`Tambah Kawasan / Lahan Baru`;t.innerHTML=`
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); max-width: 960px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--clr-border); padding-bottom: 12px;">
        <h3 style="color: #fff; margin: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
          <span>${n?`✏️`:`➕`}</span> ${r}
        </h3>
        <button id="btn-cancel-zone-form" class="btn-text-btn btn-sm">← Kembali ke Daftar</button>
      </div>

      <form id="zone-edit-form">
        <input type="hidden" id="form-zone-id" value="${e?e.id:``}" />

        <!-- BAGIAN 1: INFORMASI DASAR -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            1. Informasi Dasar Kawasan
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="form-zone-code">Kode Kawasan (Unik): *</label>
              <input type="text" id="form-zone-code" class="form-input" required placeholder="Contoh: KW-ACEH-02" value="${e?e.zone_code:``}" />
              <small style="color: var(--clr-text-dim); font-size: 11px;">Kode unik sebagai pengenal permanen dalam sistem.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-name">Nama Kawasan: *</label>
              <input type="text" id="form-zone-name" class="form-input" required placeholder="Nama lengkap kawasan penanaman" value="${e?$(e.name):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-category">Kategori Kawasan:</label>
              <input type="text" id="form-zone-category" class="form-input" placeholder="e.g. Silvikultur, Konservasi Pesisir, Arboretum" value="${e?$(e.category||``):`Silvikultur & Konservasi`}" />
            </div>
            <div class="form-group">
              <label for="form-zone-status">Status Kawasan: *</label>
              <select id="form-zone-status" class="form-select" required>
                <option value="preparation" ${e&&e.status===`preparation`?`selected`:``}>Persiapan Lahan</option>
                <option value="active" ${!e||e.status===`active`?`selected`:``}>Aktif Penanaman</option>
                <option value="monitoring" ${e&&e.status===`monitoring`?`selected`:``}>Pemantauan</option>
                <option value="completed" ${e&&e.status===`completed`?`selected`:``}>Selesai / Mandiri</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-purpose">Tujuan Penanaman:</label>
            <input type="text" id="form-zone-purpose" class="form-input" placeholder="Tujuan utama program penanaman pada kawasan ini" value="${e?$(e.planting_purpose||``):``}" />
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-desc">Deskripsi Kawasan:</label>
            <textarea id="form-zone-desc" class="form-input" rows="3" placeholder="Uraian gambaran umum kawasan, vegetasi, dan karakteristik ekosistem">${e?$(e.description||``):``}</textarea>
          </div>
        </div>

        <!-- BAGIAN 2: INFORMASI LOKASI -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            2. Informasi Lokasi Deskriptif & Titik Referensi Opsional
          </h4>
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="form-zone-address">Alamat / Keterangan Lokasi:</label>
            <input type="text" id="form-zone-address" class="form-input" placeholder="Jalan, blok, atau patokan lokasi deskriptif" value="${e?$(e.address||``):``}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-village">Desa / Gampong:</label>
              <input type="text" id="form-zone-village" class="form-input" placeholder="Gampong" value="${e?$(e.village||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-district">Kecamatan:</label>
              <input type="text" id="form-zone-district" class="form-input" placeholder="Kecamatan" value="${e?$(e.district||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-city">Kabupaten / Kota:</label>
              <input type="text" id="form-zone-city" class="form-input" placeholder="Kabupaten" value="${e?$(e.city||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-province">Provinsi:</label>
              <input type="text" id="form-zone-province" class="form-input" placeholder="Provinsi" value="${e?$(e.province||``):`Aceh`}" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;">
            <div class="form-group">
              <label for="form-zone-lat">Latitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lat" class="form-input" placeholder="Contoh: 5.4818556" value="${e&&e.latitude?e.latitude:``}" />
              <small style="color: var(--clr-text-dim); font-size: 11px;">Hanya titik koordinat referensi patok, bukan poligon GPS.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-lng">Longitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lng" class="form-input" placeholder="Contoh: 95.5840917" value="${e&&e.longitude?e.longitude:``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-access">Catatan Akses Lapangan:</label>
              <input type="text" id="form-zone-access" class="form-input" placeholder="Akses kendaraan, jalan setapak, rute masuk" value="${e?$(e.access_notes||``):``}" />
            </div>
          </div>
        </div>

        <!-- BAGIAN 3: INFORMASI LAHAN & LUASAN -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            3. Informasi Lahan (Input Manual, Bebas Poligon)
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-area-size">Luas Lahan: *</label>
              <input type="number" step="0.01" min="0" id="form-zone-area-size" class="form-input" required placeholder="Contoh: 2.00" value="${e?e.area_size:``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-area-unit">Satuan Luas: *</label>
              <select id="form-zone-area-unit" class="form-select" required>
                <option value="ha" ${!e||e.area_unit===`ha`?`selected`:``}>Hektare (ha)</option>
                <option value="m2" ${e&&e.area_unit===`m2`?`selected`:``}>Meter Persegi (m²)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="form-zone-meas-method">Metode Pengukuran Luas:</label>
              <input type="text" id="form-zone-meas-method" class="form-input" placeholder="e.g. Survei Patok Batas, Data Deskriptif Sertifikat" value="${e?$(e.measurement_method||``):`Survei Patok Lapangan Deskriptif`}" />
            </div>
            <div class="form-group">
              <label for="form-zone-meas-date">Tanggal Pengukuran:</label>
              <input type="date" id="form-zone-meas-date" class="form-input" value="${e&&e.measurement_date?ul(e.measurement_date):``}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-land-notes">Catatan Kondisi Lahan & Tanah:</label>
            <textarea id="form-zone-land-notes" class="form-input" rows="2" placeholder="Kondisi topografi, jenis tanah, kemiringan lereng, vegetasi awal">${e?$(e.land_condition_notes||``):``}</textarea>
          </div>
        </div>

        <!-- BAGIAN 4: PENGELOLAAN & PUBLIKASI -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            4. Pengelolaan, Target, & Publikasi
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-pic">Penanggung Jawab / Koordinator:</label>
              <input type="text" id="form-zone-pic" class="form-input" placeholder="Nama koordinator lapangan" value="${e?$(e.person_in_charge||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-org">Organisasi / Lembaga Mitra:</label>
              <input type="text" id="form-zone-org" class="form-input" placeholder="IKHW / Mitra" value="${e?$(e.organization||``):`IKHW Aceh`}" />
            </div>
            <div class="form-group">
              <label for="form-zone-target">Target Penanaman (Batang):</label>
              <input type="number" min="0" id="form-zone-target" class="form-input" placeholder="e.g. 1000" value="${e&&e.planting_target?e.planting_target:``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-start-date">Tanggal Mulai Program:</label>
              <input type="date" id="form-zone-start-date" class="form-input" value="${e&&e.start_date?ul(e.start_date):``}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-internal-notes">Catatan Internal (Tidak Tampil ke Publik):</label>
            <textarea id="form-zone-internal-notes" class="form-input" rows="2" placeholder="Catatan internal pengelola">${e?$(e.internal_notes||``):``}</textarea>
          </div>

          <div style="display: flex; gap: 20px; align-items: center; margin-top: 16px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #fff;">
              <input type="checkbox" id="form-zone-published" ${!e||e.is_published?`checked`:``} />
              <span>Publikasikan Kawasan ke Halaman Virtual Tour Pengunjung</span>
            </label>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--clr-border); padding-top: 16px;">
          <button type="button" id="btn-cancel-form" class="btn-secondary-action">Batal</button>
          <button type="submit" id="btn-submit-zone" class="btn-primary-action">
            💾 ${n?`Simpan Perubahan`:`Tambahkan Kawasan`}
          </button>
        </div>
      </form>
    </div>
  `;let i=document.getElementById(`btn-cancel-zone-form`),a=document.getElementById(`btn-cancel-form`),o=()=>ru(`list`);i&&i.addEventListener(`click`,o),a&&a.addEventListener(`click`,o);let s=document.getElementById(`zone-edit-form`);s&&s.addEventListener(`submit`,async e=>{e.preventDefault();let t={zone_code:document.getElementById(`form-zone-code`).value.trim(),name:document.getElementById(`form-zone-name`).value.trim(),category:document.getElementById(`form-zone-category`).value.trim(),status:document.getElementById(`form-zone-status`).value,planting_purpose:document.getElementById(`form-zone-purpose`).value.trim(),description:document.getElementById(`form-zone-desc`).value.trim(),address:document.getElementById(`form-zone-address`).value.trim(),village:document.getElementById(`form-zone-village`).value.trim(),district:document.getElementById(`form-zone-district`).value.trim(),city:document.getElementById(`form-zone-city`).value.trim(),province:document.getElementById(`form-zone-province`).value.trim(),latitude:document.getElementById(`form-zone-lat`).value?parseFloat(document.getElementById(`form-zone-lat`).value):null,longitude:document.getElementById(`form-zone-lng`).value?parseFloat(document.getElementById(`form-zone-lng`).value):null,access_notes:document.getElementById(`form-zone-access`).value.trim(),area_size:parseFloat(document.getElementById(`form-zone-area-size`).value)||0,area_unit:document.getElementById(`form-zone-area-unit`).value,measurement_method:document.getElementById(`form-zone-meas-method`).value.trim(),measurement_date:fl(document.getElementById(`form-zone-meas-date`).value),land_condition_notes:document.getElementById(`form-zone-land-notes`).value.trim(),person_in_charge:document.getElementById(`form-zone-pic`).value.trim(),organization:document.getElementById(`form-zone-org`).value.trim(),planting_target:document.getElementById(`form-zone-target`).value?parseInt(document.getElementById(`form-zone-target`).value):null,start_date:fl(document.getElementById(`form-zone-start-date`).value),internal_notes:document.getElementById(`form-zone-internal-notes`).value.trim(),is_published:document.getElementById(`form-zone-published`).checked},n=document.getElementById(`form-zone-id`).value,r=!!n,i=document.getElementById(`btn-submit-zone`);i.disabled=!0,i.innerText=`Menyimpan...`;try{let e=await Z.saveZone(t,n||null);window.dispatchEvent(new CustomEvent(`zones-updated`)),r?m.updated(e.message||`Perubahan data kawasan berhasil disimpan.`):m.created(e.message||`Data kawasan baru berhasil disimpan.`),await au()}catch(e){m.error(`✕ Gagal menyimpan kawasan`,e.message||`Periksa kembali formulir kawasan dan coba lagi.`),i.disabled=!1,i.innerText=r?`💾 Simpan Perubahan`:`💾 Tambahkan Kawasan`}})}async function uu(e,t=`tab-ringkasan`){let n=document.getElementById(`zone-pane-container`);if(n){n.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
      <span class="loading-spinner"></span> Memuat detail kawasan (8 Tab)...
    </div>
  `;try{du(await Z.getZone(e),t)}catch(e){n.innerHTML=`
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat detail kawasan: ${e.message}
        <button id="btn-back-to-list" class="btn-secondary-action btn-sm" style="margin-left: 12px;">Kembali</button>
      </div>
    `;let t=document.getElementById(`btn-back-to-list`);t&&t.addEventListener(`click`,()=>ru(`list`))}}}function du(e,t=`tab-ringkasan`){let n=document.getElementById(`zone-pane-container`);if(!n)return;let r=e.zone;e.summary,e.land_info;let i=document.getElementById(`tab-nav-zone-detail`);if(i&&(i.classList.remove(`hidden`),i.classList.add(`active`)),n.innerHTML=`
    <!-- Detail Header Card -->
    <div style="background: var(--clr-surface); padding: 20px 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-family: monospace; font-size: 13px; background: rgba(16,185,129,0.15); color: var(--clr-primary); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.3);">
              ${r.zone_code}
            </span>
            <h2 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">${$(r.name)}</h2>
            <span class="badge-status-published">${r.status}</span>
          </div>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 6px 0 0;">
            📍 ${$(r.address||(r.village?r.village+`, `+r.district:`Lokasi Terdaftar`))} • ${$(r.city||`Aceh`)}
          </p>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-detail-edit-zone" class="btn-secondary-action btn-sm">✏️ Edit Kawasan</button>
          <button id="btn-detail-back-list" class="btn-text-btn btn-sm">← Daftar Kawasan</button>
        </div>
      </div>

      <!-- 8 Tabs Bar -->
      <div class="zone-detail-tabs" style="display: flex; gap: 4px; border-bottom: 1px solid var(--clr-border); padding-top: 16px; margin-top: 14px; overflow-x: auto;">
        <button class="zone-tab-link active" data-tab="tab-ringkasan">1. Ringkasan</button>
        <button class="zone-tab-link" data-tab="tab-lahan">2. Informasi Lahan</button>
        <button class="zone-tab-link" data-tab="tab-penanaman">3. Jenis & Kegiatan Penanaman</button>
        <button class="zone-tab-link" data-tab="tab-pemantauan">4. Pemantauan</button>
        <button class="zone-tab-link" data-tab="tab-perawatan">5. Perawatan</button>
        <button class="zone-tab-link" data-tab="tab-galeri">6. Galeri Foto</button>
        <button class="zone-tab-link" data-tab="tab-tour">7. Virtual Tour</button>
        <button class="zone-tab-link" data-tab="tab-laporan">8. Laporan</button>
      </div>
    </div>

    <!-- Tab Contents Container -->
    <div id="zone-tab-body">
      ${fu(e)}
    </div>
  `,n.querySelectorAll(`.zone-tab-link`).forEach(t=>{t.addEventListener(`click`,()=>{n.querySelectorAll(`.zone-tab-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let i=t.getAttribute(`data-tab`),a=document.getElementById(`zone-tab-body`);a&&(i===`tab-ringkasan`?a.innerHTML=fu(e):i===`tab-lahan`?a.innerHTML=pu(e):i===`tab-penanaman`?a.innerHTML=mu(e):i===`tab-pemantauan`?a.innerHTML=hu(e):i===`tab-perawatan`?a.innerHTML=gu(e):i===`tab-galeri`?Wl(a,r):i===`tab-tour`?a.innerHTML=_u(e):i===`tab-laporan`&&(a.innerHTML=vu(e)))})}),t===`tab-galeri`){let e=n.querySelector(`.zone-tab-link[data-tab="tab-galeri"]`);e&&(n.querySelectorAll(`.zone-tab-link`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`));let t=document.getElementById(`zone-tab-body`);t&&Wl(t,r)}let a=document.getElementById(`btn-detail-edit-zone`);a&&a.addEventListener(`click`,()=>lu(r));let o=document.getElementById(`btn-detail-back-list`);o&&o.addEventListener(`click`,()=>ru(`list`))}function fu(e){let t=e.zone,n=e.summary,r=n.survival_rate===null?`Data belum cukup`:`${n.survival_rate}%`;return`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Luas Lahan Tercatat</span>
        <span class="stat-value" style="color: var(--clr-primary);">${t.area_size} ${t.area_unit}</span>
        <span class="stat-desc">±${n.area_in_ha} Hektare (Deskriptif)</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Kegiatan Penanaman</span>
        <span class="stat-value">${n.activities_count}</span>
        <span class="stat-desc">Batch kegiatan terdaftar</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Bibit Awal Ditanam</span>
        <span class="stat-value">${(n.total_initial_seedlings||0).toLocaleString(`id-ID`)}</span>
        <span class="stat-desc">${n.unique_species_count} Spesies Pohon Berbeda</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Kelangsungan Hidup Terkini</span>
        <span class="stat-value" style="color: ${n.survival_rate&&n.survival_rate>=75?`var(--clr-primary)`:`var(--clr-gold)`};">
          ${r}
        </span>
        <span class="stat-desc">Formula: Kelompok awal hidup / awal ditanam</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Scene Panorama Terkait</span>
        <span class="stat-value">${n.scenes_count}</span>
        <span class="stat-desc">Terhubung Marzipano</span>
      </div>
    </div>

    <!-- Description & Context -->
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Tujuan & Deskripsi Kawasan</h4>
      <p style="color: var(--clr-text-muted); font-size: 13px; line-height: 1.6;">
        ${$(t.description||`Tidak ada deskripsi tambahan.`)}
      </p>
      ${t.planting_purpose?`
        <div style="margin-top: 12px; padding: 12px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--clr-primary); border-radius: 4px;">
          <strong style="color: var(--clr-primary); font-size: 12px;">TUJUAN PENANAMAN:</strong>
          <p style="margin: 4px 0 0; color: #fff; font-size: 13px;">${$(t.planting_purpose)}</p>
        </div>
      `:``}
    </div>
  `}function pu(e){let t=e.land_info;return`
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Spesifikasi & Karakteristik Lahan</h3>
      <table class="data-table" style="width: 100%; font-size: 13px;">
        <tbody>
          <tr>
            <td style="width: 240px; color: var(--clr-text-muted); padding: 10px 0;">Luas Tercatat</td>
            <td style="color: #fff; font-weight: 600;">${t.area_size} ${t.area_unit} (±${t.area_in_ha} Hektare)</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Metode Pengukuran</td>
            <td style="color: #fff;">${$(t.measurement_method||`-`)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Tanggal Pengukuran</td>
            <td style="color: #fff;">${dl(t.measurement_date)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Kondisi Lahan & Tanah</td>
            <td style="color: #fff;">${$(t.land_condition_notes||`Belum ada catatan khusus`)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Titik Koordinat Acuan</td>
            <td style="color: #fff;">
              ${t.latitude&&t.longitude?`${t.latitude}° N, ${t.longitude}° E (Patok Referensi)`:`<span style="color:var(--clr-text-dim)">Tidak ada koordinat GPS (Input deskriptif tetap valid)</span>`}
            </td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Aksesibilitas / Rute</td>
            <td style="color: #fff;">${$(t.access_notes||`-`)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Alamat Administratif</td>
            <td style="color: #fff;">${$(t.address||`-`)}, ${$(t.village||``)}, ${$(t.district||``)}, ${$(t.city||``)}, ${$(t.province||``)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `}function mu(e){let t=e.activities||[],n=e.species||[];return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Spesies Pohon Tertanam -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Jenis Pohon Tertanam di Kawasan Ini (${n.length} Jenis)</h4>
        ${n.length>0?`
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 14px;">
            ${n.map(e=>`
              <div style="background: var(--clr-surface-card); padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
                <div style="font-weight: 600; color: #fff;">${$(e.local_name)}</div>
                <div style="font-style: italic; font-size: 12px; color: var(--clr-primary);">${$(e.scientific_name)}</div>
                <div style="font-size: 11px; color: var(--clr-text-muted); margin-top: 4px;">Famili: ${$(e.family)}</div>
                <div style="font-size: 13px; font-weight: 700; color: #fff; margin-top: 6px;">
                  ${(e.total_initial_quantity||0).toLocaleString(`id-ID`)} Batang
                </div>
              </div>
            `).join(``)}
          </div>
        `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada bibit pohon yang tercatat di kawasan ini.</p>`}
      </div>

      <!-- Riwayat Kegiatan Penanaman -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Daftar Kegiatan Penanaman (${t.length} Kegiatan)</h4>
        ${t.length>0?`
          <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 12px;">
            <thead>
              <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
                <th style="padding: 8px;">Batch Code</th>
                <th style="padding: 8px;">Nama Kegiatan</th>
                <th style="padding: 8px;">Tanggal</th>
                <th style="padding: 8px;">Spesies & Jumlah</th>
                <th style="padding: 8px;">Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody>
              ${t.map(e=>`
                <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                  <td style="padding: 8px; font-family: monospace; color: var(--clr-primary);">${e.batch_code}</td>
                  <td style="padding: 8px; font-weight: 600; color: #fff;">${$(e.name)}</td>
                  <td style="padding: 8px;">${dl(e.activity_date)}</td>
                  <td style="padding: 8px;">
                    ${e.items&&e.items.length>0?e.items.map(e=>`${e.species?e.species.local_name:`Pohon`}: ${e.quantity} ${e.unit||`btg`}`).join(`, `):`-`}
                  </td>
                  <td style="padding: 8px;">${$(e.person_in_charge||`-`)}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada kegiatan penanaman yang dicatat pada kawasan ini.</p>`}
      </div>
    </div>
  `}function hu(e){let t=e.surveys||[];return`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Catatan Survei & Pemantauan Tanaman Historis (${t.length} Survei)</h4>
      ${t.length>0?`
        <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 12px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 8px;">Tanggal</th>
              <th style="padding: 8px;">Kegiatan / Batch</th>
              <th style="padding: 8px; text-align: center;">Hidup Awal</th>
              <th style="padding: 8px; text-align: center;">Mati</th>
              <th style="padding: 8px; text-align: center;">Hilang</th>
              <th style="padding: 8px;">Kondisi</th>
              <th style="padding: 8px;">Pemeriksa</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>`
              <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                <td style="padding: 8px;">${dl(e.survey_date)}</td>
                <td style="padding: 8px; font-weight: 500; color: #fff;">${e.activity?e.activity.name:`-`}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-primary); font-weight: 600;">${e.alive_count||0}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-danger);">${e.dead_count||0}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-gold);">${e.missing_count||0}</td>
                <td style="padding: 8px;">${$(e.health_condition||`-`)}</td>
                <td style="padding: 8px;">${$(e.inspector_name||`-`)}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada survei pemantauan untuk kawasan ini.</p>`}
    </div>
  `}function gu(e){let t=e.maintenance||[];return`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Riwayat Tindakan Silvikultur, Perawatan & Penyulaman (${t.length} Tindakan)</h4>
      ${t.length>0?`
        <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 12px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 8px;">Tanggal</th>
              <th style="padding: 8px;">Jenis Tindakan</th>
              <th style="padding: 8px; text-align: center;">Jumlah Ditangani</th>
              <th style="padding: 8px; text-align: center;">Bibit Sulaman</th>
              <th style="padding: 8px;">Pelaksana</th>
              <th style="padding: 8px;">Catatan</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>`
              <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                <td style="padding: 8px;">${dl(e.maintenance_date)}</td>
                <td style="padding: 8px; font-weight: 600; color: #fff; text-transform: capitalize;">${$(e.action_type||`-`)}</td>
                <td style="padding: 8px; text-align: center;">${e.plants_treated_count||0}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-primary); font-weight: 600;">${e.replacement_plants_count||0}</td>
                <td style="padding: 8px;">${$(e.executor_name||`-`)}</td>
                <td style="padding: 8px; color: var(--clr-text-muted);">${$(e.notes||`-`)}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada tindakan perawatan atau penyulaman yang dicatat pada kawasan ini.</p>`}
    </div>
  `}function _u(e){let t=e.scenes||[];return`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Panorama 360° Terhubung Kawasan Ini (${t.length} Scene)</h4>
        <a href="#tour" class="btn-primary-action btn-sm" style="text-decoration: none;">🌐 Buka Virtual Tour Penuh</a>
      </div>
      ${t.length>0?`
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px;">
          ${t.map(e=>`
            <div style="background: var(--clr-surface-card); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--clr-border-subtle);">
              <img src="${e.thumbnail_path||`/tiles/`+e.id+`/preview.jpg`}" alt="${e.name}" style="width: 100%; height: 120px; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              <div style="padding: 10px;">
                <div style="font-weight: 600; color: #fff; font-size: 13px;">${$(e.name)}</div>
                <div style="font-size: 11px; color: var(--clr-primary); margin-top: 4px;">🎯 ${e.hotspots_count||0} Hotspots</div>
              </div>
            </div>
          `).join(``)}
        </div>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada scene panorama yang dihubungkan ke kawasan ini.</p>`}
    </div>
  `}function vu(e){let t=e.zone,n=e.summary;return`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Ekspor Laporan Kawasan: ${$(t.name)}</h4>
        <div style="display: flex; gap: 8px;">
          <a href="/api/admin/trees/reports/summary/csv" class="btn-secondary-action btn-sm" style="text-decoration: none;" download>
            📥 Unduh Ringkasan CSV
          </a>
          <button onclick="window.print()" class="btn-text-btn btn-sm">🖨️ Cetak Halaman</button>
        </div>
      </div>
      <div style="background: var(--clr-surface-card); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle); font-size: 13px; line-height: 1.8;">
        <div><strong>Kawasan:</strong> ${$(t.name)} (${t.zone_code})</div>
        <div><strong>Luas Tercatat:</strong> ${t.area_size} ${t.area_unit} (±${n.area_in_ha} Ha)</div>
        <div><strong>Status:</strong> ${t.status} • <strong>Target Penanaman:</strong> ${t.planting_target||`-`} batang</div>
        <div><strong>Bibit Tertanam:</strong> ${(n.total_initial_seedlings||0).toLocaleString(`id-ID`)} batang (${n.unique_species_count} jenis)</div>
        <div><strong>Kelangsungan Hidup Kelompok Awal:</strong> ${n.survival_rate===null?`Data belum cukup`:n.survival_rate+`%`}</div>
        <div><strong>Total Survei Pemantauan:</strong> ${n.total_surveys} kali • <strong>Tindakan Perawatan:</strong> ${n.total_maintenance} kali</div>
      </div>
    </div>
  `}function yu(){let e=document.getElementById(`zone-pane-container`);e&&(e.innerHTML=`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="color: #fff; margin: 0; font-size: 16px;">Galeri Dokumentasi Foto per Kawasan</h3>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 4px 0 0;">
            Pilih kawasan penanaman untuk melihat, mengunggah, atau mengelola foto dokumentasi lapangannya.
          </p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
        ${eu.map(e=>`
          <div style="background: var(--clr-surface-card); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--clr-border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="height: 160px; background: #0c1410; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
              ${e.main_photo_path?`
                <img src="${e.main_photo_path}" alt="${e.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              `:`
                <span style="font-size: 40px;">🏞️</span>
              `}
              <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; color: #fff;">
                ${e.status}
              </div>
            </div>
            <div style="padding: 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span style="font-size: 11px; font-family: monospace; color: var(--clr-primary); font-weight: 600;">${e.zone_code}</span>
                <h5 style="margin: 4px 0 6px; color: #fff; font-size: 14px; font-weight: 700;">${$(e.name)}</h5>
                <p style="font-size: 12px; color: var(--clr-text-muted); margin: 0;">${e.area_size} ${e.area_unit} • ${$(e.category||`Konservasi`)}</p>
              </div>
              <button class="btn-open-zone-gallery btn-primary-action btn-sm" data-id="${e.id}" style="width: 100%; margin-top: 14px; justify-content: center;">
                🖼️ Buka Galeri Kawasan
              </button>
            </div>
          </div>
        `).join(``)}
      </div>
    </div>
  `,e.querySelectorAll(`.btn-open-zone-gallery`).forEach(e=>{e.addEventListener(`click`,()=>{ru(`detail`,e.getAttribute(`data-id`),`tab-galeri`)})}))}function bu(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}function $(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var xu=`rekap`,Su=[],Cu=null;async function wu(){let e=document.getElementById(`admin-reports-content`);e&&(Eu(e),await Du(xu))}async function Tu(e){xu=e;let t=document.getElementById(`admin-reports-content`);t&&(document.getElementById(`report-content-pane`)||Eu(t),t.querySelectorAll(`.report-tab-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-report-tab`)===e)}),await Du(e))}function Eu(e){e.innerHTML=`
    <div class="admin-section-header" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span style="font-size: 22px;">📊</span> Laporan & Statistik Penanaman
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Rekapitulasi kuantitatif, analisis kelangsungan hidup (survival rate), laporan agregat per kawasan dan jenis pohon, serta ekspor berkas.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" style="text-decoration: none;" download>
            📥 Unduh Semua Data (CSV)
          </a>
        </div>
      </div>
    </div>

    <!-- Reports Subtabs -->
    <div class="report-subtabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px; margin-bottom: 20px; overflow-x: auto;">
      <button class="report-tab-btn active" data-report-tab="rekap">📋 Rekapitulasi Penanaman</button>
      <button class="report-tab-btn" data-report-tab="survival">🌱 Kelangsungan Hidup Tanaman</button>
      <button class="report-tab-btn" data-report-tab="per-kawasan">🏞️ Laporan per Kawasan</button>
      <button class="report-tab-btn" data-report-tab="per-pohon">🌳 Laporan per Jenis Pohon</button>
      <button class="report-tab-btn" data-report-tab="ekspor">💾 Ekspor Data</button>
    </div>

    <!-- Report Body Container -->
    <div id="report-pane-body" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat laporan...
      </div>
    </div>
  `,e.querySelectorAll(`.report-tab-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{await Tu(e.getAttribute(`data-report-tab`))})})}async function Du(e){let t=document.getElementById(`report-pane-body`);if(t)try{Cu||=await Z.getTreeDashboard(),Su.length===0&&(Su=(await Z.getZones()).zones||[]),e===`rekap`?Ou(t,Cu):e===`survival`?ku(t,Cu):e===`per-kawasan`?Au(t,Su):e===`per-pohon`?ju(t,Cu):e===`ekspor`&&Mu(t)}catch(e){t.innerHTML=`
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat data laporan: ${e.message}
      </div>
    `}}function Ou(e,t){let n=t.indicators||t.metrics||{},r=n.total_initial_seedlings||0,i=n.total_alive_initial||0,a=n.total_dead_initial||0,o=n.total_missing_initial||0,s=n.total_replacements||0,c=n.survival_rate,l=c==null?`Data Belum Lengkap`:`${Number(c).toFixed(1)}%`;e.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Summary Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Total Bibit Awal</span>
          <span class="stat-value">${r.toLocaleString(`id-ID`)}</span>
          <span class="stat-desc">Tercatat dalam kegiatan</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Tanaman Terkonfirmasi Hidup</span>
          <span class="stat-value" style="color: var(--clr-primary);">${i.toLocaleString(`id-ID`)}</span>
          <span class="stat-desc">Kelompok bibit awal</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Tanaman Mati</span>
          <span class="stat-value" style="color: var(--clr-danger);">${a.toLocaleString(`id-ID`)}</span>
          <span class="stat-desc">Hasil verifikasi survei</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Tanaman Hilang / Rusak</span>
          <span class="stat-value" style="color: var(--clr-gold);">${o.toLocaleString(`id-ID`)}</span>
          <span class="stat-desc">Tidak ditemukan di ajir</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Bibit Penyulaman</span>
          <span class="stat-value" style="color: #38bdf8;">${s.toLocaleString(`id-ID`)}</span>
          <span class="stat-desc">Dicatat terpisah dari awal</span>
        </div>
      </div>

      <!-- Action & Table -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h4 style="color: #fff; margin: 0; font-size: 15px;">Tabel Rekapitulasi Bibit dan Tindakan Lapangan</h4>
          <a href="/api/admin/trees/reports/summary/csv" class="btn-secondary-action btn-sm" download>📥 Ekspor CSV</a>
        </div>
        <table class="data-table" style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 10px;">Indikator</th>
              <th style="padding: 10px; text-align: right;">Jumlah Batang</th>
              <th style="padding: 10px; text-align: right;">Persentase</th>
              <th style="padding: 10px;">Keterangan Metodologis</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: #fff; font-weight: 600;">Bibit Awal Ditanam</td>
              <td style="padding: 10px; text-align: right; font-weight: 700;">${r.toLocaleString(`id-ID`)}</td>
              <td style="padding: 10px; text-align: right;">100.0%</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Dasar acuan historis kelompok awal</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: var(--clr-primary); font-weight: 600;">Terkonfirmasi Hidup (Kelompok Awal)</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-primary); font-weight: 700;">${i.toLocaleString(`id-ID`)}</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-primary); font-weight: 700;">${l}</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Kelangsungan hidup kelompok awal tanpa mencampur sulaman</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: var(--clr-danger); font-weight: 600;">Mati (Kelompok Awal)</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-danger); font-weight: 700;">${a.toLocaleString(`id-ID`)}</td>
              <td style="padding: 10px; text-align: right;">${r>0?(a/r*100).toFixed(1)+`%`:`-`}</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Mati akibat kekeringan, genangan, atau penyakit</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: var(--clr-gold); font-weight: 600;">Hilang / Terbawa Air</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-gold); font-weight: 700;">${o.toLocaleString(`id-ID`)}</td>
              <td style="padding: 10px; text-align: right;">${r>0?(o/r*100).toFixed(1)+`%`:`-`}</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Ajir ditemukan kosong atau tersapu air</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: #38bdf8; font-weight: 600;">Bibit Sulaman Masuk</td>
              <td style="padding: 10px; text-align: right; color: #38bdf8; font-weight: 700;">${s.toLocaleString(`id-ID`)}</td>
              <td style="padding: 10px; text-align: right;">-</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Bibit pengganti yang disulam untuk memulihkan kerapatan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `}function ku(e,t){t.survival;let n=t.needs_inspection||[];e.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; margin-top: 0; font-size: 16px;">Formula Kelangsungan Hidup Tanaman (Silvikultur Standar)</h3>
        <div style="background: var(--clr-surface-card); padding: 16px; border-radius: 8px; border-left: 4px solid var(--clr-primary); margin: 12px 0; font-family: monospace; font-size: 14px; color: #fff;">
          Persentase Kelangsungan Hidup = (Jumlah Tanaman Kelompok Awal Hidup ÷ Jumlah Bibit Awal Ditanam) × 100%
        </div>
        <p style="color: var(--clr-text-muted); font-size: 13px; line-height: 1.6; margin: 0;">
          💡 <strong>Kepatuhan Metodologi:</strong> Bibit hasil sulaman tidak dihitung sebagai bibit kelompok awal agar tidak memanipulasi persentase kelulusan hidup tanaman asli. Hasil survei adalah potret pada waktu pemeriksaan, bukan penjumlahan kumulatif.
        </p>
      </div>

      <!-- Kelompok Perlu Pemeriksaan Ulang -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Kelompok Penanaman yang Perlu Pemantauan / Tindak Lanjut (${n.length})</h4>
        ${n.length>0?`
          <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 10px;">
            <thead>
              <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
                <th style="padding: 8px;">Batch</th>
                <th style="padding: 8px;">Nama Kegiatan</th>
                <th style="padding: 8px;">Zona / Lokasi</th>
                <th style="padding: 8px;">Survei Terakhir</th>
                <th style="padding: 8px; text-align: center;">Survival</th>
                <th style="padding: 8px;">Alasan Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              ${n.map(e=>`
                <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                  <td style="padding: 8px; font-family: monospace; color: var(--clr-primary);">${e.batch_code}</td>
                  <td style="padding: 8px; font-weight: 600; color: #fff;">${e.name}</td>
                  <td style="padding: 8px;">${e.location_zone||`-`}</td>
                  <td style="padding: 8px;">${e.last_survey_date?dl(e.last_survey_date):`Belum pernah`}</td>
                  <td style="padding: 8px; text-align: center; color: ${e.survival_rate!==null&&e.survival_rate<70?`var(--clr-danger)`:`var(--clr-gold)`}; font-weight: 700;">
                    ${e.survival_rate===null?`-`:e.survival_rate+`%`}
                  </td>
                  <td style="padding: 8px; color: #fca5a5;">${e.reason}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        `:`<p style="color: var(--clr-primary); font-size: 13px;">✅ Semua kelompok penanaman telah terpantau dengan kondisi kelangsungan hidup baik.</p>`}
      </div>
    </div>
  `}function Au(e,t){e.innerHTML=`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Perbandingan Seluruh Kawasan Penanaman (${t.length} Kawasan)</h4>
        <button onclick="window.print()" class="btn-text-btn btn-sm">🖨️ Cetak Laporan</button>
      </div>

      <table class="data-table" style="width: 100%; font-size: 13px;">
        <thead>
          <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
            <th style="padding: 10px;">Kode & Nama Kawasan</th>
            <th style="padding: 10px;">Luas Lahan</th>
            <th style="padding: 10px; text-align: center;">Kegiatan</th>
            <th style="padding: 10px; text-align: center;">Bibit Awal</th>
            <th style="padding: 10px; text-align: center;">Jumlah Spesies</th>
            <th style="padding: 10px; text-align: center;">Survival Rate</th>
            <th style="padding: 10px; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(e=>`
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px;">
                <div style="font-weight: 600; color: #fff;">${e.name}</div>
                <div style="font-family: monospace; font-size: 11px; color: var(--clr-primary);">${e.zone_code}</div>
              </td>
              <td style="padding: 10px; color: #fff;">${e.area_size} ${e.area_unit}</td>
              <td style="padding: 10px; text-align: center; color: #fff;">${e.activities_count||0}</td>
              <td style="padding: 10px; text-align: center; font-weight: 600; color: #fff;">${(e.total_initial_seedlings||0).toLocaleString(`id-ID`)}</td>
              <td style="padding: 10px; text-align: center; color: #fff;">${e.species_count||0}</td>
              <td style="padding: 10px; text-align: center; font-weight: 700; color: var(--clr-primary);">
                ${e.survival_rate===null?`<span style="color:var(--clr-text-dim)">-</span>`:e.survival_rate+`%`}
              </td>
              <td style="padding: 10px; text-align: center;">
                <span class="badge-status-published">${e.status}</span>
              </td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function ju(e,t){let n=t.charts?.species_distribution||[];e.innerHTML=`
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Distribusi Penanaman per Jenis Pohon</h4>
        <a href="/api/admin/trees/reports/species/csv" class="btn-secondary-action btn-sm" download>📥 Ekspor Data Spesies (CSV)</a>
      </div>

      ${n.length>0?`
        <table class="data-table" style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 10px;">Nama Lokal Pohon</th>
              <th style="padding: 10px;">Nama Ilmiah (Latin)</th>
              <th style="padding: 10px; text-align: right;">Total Bibit Awal</th>
            </tr>
          </thead>
          <tbody>
            ${n.map(e=>`
              <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                <td style="padding: 10px; font-weight: 600; color: #fff;">${e.common_name||e.local_name||`-`}</td>
                <td style="padding: 10px; font-style: italic; color: var(--clr-primary);">${e.scientific_name||`-`}</td>
                <td style="padding: 10px; text-align: right; font-weight: 700; color: #fff;">${(e.total_planted==null?e.count||0:e.total_planted).toLocaleString(`id-ID`)} batang</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada data penanaman per jenis pohon.</p>`}
    </div>
  `}function Mu(e){e.innerHTML=`
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); max-width: 760px; margin: 0 auto;">
      <h3 style="color: #fff; margin-top: 0; font-size: 17px; margin-bottom: 16px;">Pusat Unduhan & Ekspor Berkas Laporan</h3>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--clr-surface-card); border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
          <div>
            <div style="font-weight: 600; color: #fff;">Rekapitulasi Penanaman Komprehensif</div>
            <div style="font-size: 12px; color: var(--clr-text-muted);">Format CSV terstruktur untuk Excel/Spreadsheet</div>
          </div>
          <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" download>📥 Unduh CSV</a>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--clr-surface-card); border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
          <div>
            <div style="font-weight: 600; color: #fff;">Katalog Master Jenis Pohon (Spesies)</div>
            <div style="font-size: 12px; color: var(--clr-text-muted);">Data nama lokal, ilmiah, famili, status dan fungsi ekologis</div>
          </div>
          <a href="/api/admin/trees/reports/species/csv" class="btn-primary-action btn-sm" download>📥 Unduh CSV</a>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--clr-surface-card); border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
          <div>
            <div style="font-weight: 600; color: #fff;">Laporan Hasil Pemantauan & Sensus Pertumbuhan</div>
            <div style="font-size: 12px; color: var(--clr-text-muted);">Riwayat survei, tanaman hidup, mati, dan gejala kerusakan</div>
          </div>
          <a href="/api/admin/trees/reports/surveys/csv" class="btn-primary-action btn-sm" download>📥 Unduh CSV</a>
        </div>
      </div>
    </div>
  `}var Nu=[];async function Pu(){let e=document.getElementById(`admin-users-content`);e&&(Fu(e),await Lu())}function Fu(e){e.innerHTML=`
    <div class="admin-section-header" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span style="font-size: 22px;">👥</span> Pengguna dan Hak Akses
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Atur pembagian peran: Administrator (seluruh kontrol), Petugas Penanaman (input kegiatan & survei), Editor Konten (panorama & publikasi).
          </p>
        </div>
        <div>
          <button id="btn-add-user" class="btn-primary-action btn-sm">➕ Tambah Pengguna</button>
        </div>
      </div>
    </div>

    <!-- Users Table Container -->
    <div id="users-table-wrapper" class="table-responsive" style="background: var(--clr-surface); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat data pengguna...
      </div>
    </div>

    <!-- Modal Form Tambah/Edit Pengguna -->
    <div id="user-form-modal" class="modal-overlay hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; z-index: 100;">
      <div style="background: var(--clr-surface-card); border: 1px solid var(--clr-border); border-radius: var(--radius-md); padding: 24px; max-width: 440px; width: 90%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px;">
          <h3 id="user-modal-title" style="margin: 0; color: #fff; font-size: 16px;">Tambah Pengguna Baru</h3>
          <button id="btn-close-user-modal" class="icon-btn" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 18px;">✕</button>
        </div>
        <form id="user-account-form">
          <input type="hidden" id="user-edit-id" />
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-name" style="color: #fff; font-size: 13px;">Nama Lengkap: *</label>
            <input type="text" id="user-input-name" class="form-input" required placeholder="Nama lengkap petugas" />
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-username" style="color: #fff; font-size: 13px;">Username: *</label>
            <input type="text" id="user-input-username" class="form-input" required placeholder="username_login" />
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-email" style="color: #fff; font-size: 13px;">Email (Opsional):</label>
            <input type="email" id="user-input-email" class="form-input" placeholder="email@organisasi.id" />
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-password" style="color: #fff; font-size: 13px;">Kata Sandi: <span id="pwd-help-text" style="font-size: 11px; color: var(--clr-text-muted);">(Min. 6 karakter)</span></label>
            <input type="password" id="user-input-password" class="form-input" placeholder="••••••••" />
          </div>
          <div class="form-group" style="margin-bottom: 16px;">
            <label for="user-input-role" style="color: #fff; font-size: 13px;">Peran & Hak Akses: *</label>
            <select id="user-input-role" class="form-select" required>
              <option value="administrator">Administrator (Akses Penuh Semua Modul)</option>
              <option value="petugas_penanaman">Petugas Penanaman (Input Data Pohon & Survei)</option>
              <option value="editor_konten">Editor Konten (Kelola Panorama & Info Publik)</option>
            </select>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" id="btn-cancel-user-modal" class="btn-secondary-action btn-sm">Batal</button>
            <button type="submit" id="btn-submit-user" class="btn-primary-action btn-sm">💾 Simpan Pengguna</button>
          </div>
        </form>
      </div>
    </div>
  `;let t=e.querySelector(`#btn-add-user`);t&&t.addEventListener(`click`,()=>Iu(null));let n=e.querySelector(`#user-form-modal`),r=e.querySelector(`#btn-close-user-modal`),i=e.querySelector(`#btn-cancel-user-modal`),a=()=>{n&&(n.style.display=`none`,n.classList.add(`hidden`))};r&&r.addEventListener(`click`,a),i&&i.addEventListener(`click`,a);let o=e.querySelector(`#user-account-form`);o&&o.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`user-edit-id`).value,n={name:document.getElementById(`user-input-name`).value.trim(),username:document.getElementById(`user-input-username`).value.trim(),email:document.getElementById(`user-input-email`).value.trim()||null,role:document.getElementById(`user-input-role`).value},r=document.getElementById(`user-input-password`).value;r&&(n.password=r);let i=!!t,s=o.querySelector(`button[type="submit"]`);s&&(s.disabled=!0,s.textContent=`Menyimpan...`);try{let e=await Z.saveUser(n,t||null);i?m.updated(e.message||`Data pengguna berhasil disimpan.`):m.created(e.message||`Pengguna baru berhasil ditambahkan.`),a(),await Lu()}catch(e){m.error(`✕ Gagal menyimpan pengguna`,e.message)}finally{s&&(s.disabled=!1,s.textContent=`Simpan Pengguna`)}})}function Iu(e=null){let t=document.getElementById(`user-form-modal`);if(!t)return;t.style.display=`flex`,t.classList.remove(`hidden`),document.getElementById(`user-modal-title`).innerText=e?`Edit Pengguna: ${e.name}`:`Tambah Pengguna Baru`,document.getElementById(`user-edit-id`).value=e?e.id:``,document.getElementById(`user-input-name`).value=e?e.name:``,document.getElementById(`user-input-username`).value=e?e.username:``,document.getElementById(`user-input-email`).value=e&&e.email?e.email:``,document.getElementById(`user-input-role`).value=e?e.role:`petugas_penanaman`,document.getElementById(`user-input-password`).value=``;let n=document.getElementById(`pwd-help-text`);n&&(n.innerText=e?`(Kosongkan jika tidak ingin mengubah sandi)`:`(Wajib diisi, min 6 karakter)`);let r=document.getElementById(`user-input-password`);r&&(r.required=!e)}async function Lu(){let e=document.getElementById(`users-table-wrapper`);if(e)try{Nu=(await Z.getUsers()).users||[],Ru(e,Nu)}catch(t){e.innerHTML=`
      <div style="color: #fca5a5; padding: 16px;">❌ Gagal memuat daftar pengguna: ${t.message}</div>
    `}}function Ru(e,t){if(!t||t.length===0){e.innerHTML=`<div style="text-align: center; color: var(--clr-text-muted); padding: 30px;">Tidak ada pengguna terdaftar.</div>`;return}let n={administrator:`<span class="badge-status-published" style="font-size: 11px;">Administrator</span>`,admin:`<span class="badge-status-published" style="font-size: 11px;">Administrator</span>`,superadmin:`<span class="badge-status-published" style="font-size: 11px;">Super Admin</span>`,petugas_penanaman:`<span class="badge-status-draft" style="color:#38bdf8;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);font-size: 11px;font-weight:600;padding:2px 8px;border-radius:9999px;">🌱 Petugas Penanaman</span>`,editor_konten:`<span class="badge-status-draft" style="color:#fbbf24;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.35);font-size: 11px;font-weight:600;padding:2px 8px;border-radius:9999px;">✏️ Editor Konten</span>`};e.innerHTML=`
    <table class="data-table" style="width: 100%; font-size: 13px;">
      <thead>
        <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border); text-align: left; font-size: 12px;">
          <th style="padding: 10px;">Nama</th>
          <th style="padding: 10px;">Username</th>
          <th style="padding: 10px;">Email</th>
          <th style="padding: 10px;">Peran (Role)</th>
          <th style="padding: 10px; text-align: right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(e=>`
    <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
      <td style="padding: 10px; font-weight: 600; color: #fff;">${zu(e.name)}</td>
      <td style="padding: 10px; font-family: monospace; color: var(--clr-primary);">${zu(e.username)}</td>
      <td style="padding: 10px; color: var(--clr-text-muted);">${zu(e.email||`-`)}</td>
      <td style="padding: 10px;">${n[e.role]||e.role}</td>
      <td style="padding: 10px; text-align: right; white-space: nowrap;">
        <button class="btn-edit-user btn-text-btn btn-sm" data-id="${e.id}">✏️ Edit</button>
        ${e.username===`admin`?``:`
          <button class="btn-delete-user btn-text-btn btn-sm" data-id="${e.id}" style="color: var(--clr-danger);">🗑️ Hapus</button>
        `}
      </td>
    </tr>
  `).join(``)}
      </tbody>
    </table>
  `,e.querySelectorAll(`.btn-edit-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=Nu.find(e=>String(e.id)===String(t));n&&Iu(n)})}),e.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(confirm(`Hapus pengguna ini?`))try{let e=await Z.deleteUser(t);m.deleted(e.message||`Pengguna berhasil dihapus.`),await Lu()}catch(e){m.error(`✕ Gagal menghapus: `+e.message)}})})}function zu(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Bu=[];async function Vu(){let e=document.getElementById(`admin-activity-logs-content`);e&&(Hu(e),await Uu())}function Hu(e){e.innerHTML=`
    <div class="admin-section-header" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span style="font-size: 22px;">📜</span> Log Aktivitas Sistem
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Rekaman jejak audit sistem: penambahan kawasan, pembaruan bibit, survei pemantauan, publikasi hotspot, dan autentikasi.
          </p>
        </div>
        <div>
          <button id="btn-refresh-logs" class="btn-secondary-action btn-sm">🔄 Segarkan Log</button>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 20px; background: var(--clr-surface); padding: 14px 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <input type="text" id="log-search" class="form-input" placeholder="🔍 Cari deskripsi atau pengguna..." style="max-width: 280px; padding: 7px 12px; font-size: 13px;" />
      <select id="log-filter-module" class="form-select" style="padding: 7px 12px; font-size: 13px;">
        <option value="all">Semua Modul</option>
        <option value="zones">Kawasan</option>
        <option value="trees">Data Penanaman</option>
        <option value="hotspots">Hotspots</option>
        <option value="users">Pengguna</option>
        <option value="settings">Pengaturan</option>
      </select>
    </div>

    <!-- Logs Table Container -->
    <div id="logs-table-wrapper" class="table-responsive" style="background: var(--clr-surface); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat log aktivitas...
      </div>
    </div>
  `;let t=e.querySelector(`#btn-refresh-logs`);t&&t.addEventListener(`click`,Uu);let n=e.querySelector(`#log-search`),r=e.querySelector(`#log-filter-module`),i=async()=>{await Uu({search:n.value.trim(),module:r.value})};n&&n.addEventListener(`input`,Gu(i,300)),r&&r.addEventListener(`change`,i)}async function Uu(e={}){let t=document.getElementById(`logs-table-wrapper`);if(t)try{Bu=(await Z.getActivityLogs(e)).logs||[],Wu(t,Bu)}catch(e){t.innerHTML=`
      <div style="color: #fca5a5; padding: 16px;">❌ Gagal memuat log: ${e.message}</div>
    `}}function Wu(e,t){e.innerHTML=!t||t.length===0?`
      <div style="text-align: center; padding: 30px; color: var(--clr-text-muted);">
        Tidak ada catatan log aktivitas yang cocok dengan filter.
      </div>
    `:`
    <table class="data-table" style="width: 100%; font-size: 13px;">
      <thead>
        <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border); text-align: left; font-size: 12px;">
          <th style="padding: 10px;">Waktu Kejadian</th>
          <th style="padding: 10px;">Pengguna</th>
          <th style="padding: 10px;">Aksi</th>
          <th style="padding: 10px;">Modul</th>
          <th style="padding: 10px;">Uraian Catatan Log</th>
          <th style="padding: 10px;">IP Pengakses</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(e=>{let t=e.created_at?e.created_at.substring(0,19).replace(`T`,` `):`-`,n={create:`<span class="badge-status-published" style="font-size:11px;">TAMBAH</span>`,update:`<span class="badge-status-draft" style="color:#38bdf8;border-color:rgba(56,189,248,0.3);font-size:11px;">UBAH</span>`,delete:`<span class="badge-status-inactive" style="font-size:11px;">HAPUS</span>`,archive:`<span class="badge-status-draft" style="font-size:11px;">ARSIP</span>`,link_scenes:`<span class="badge-status-draft" style="font-size:11px;">HUBUNGKAN</span>`}[e.action]||`<span style="font-size:11px;color:var(--clr-text-muted);text-transform:uppercase;">${e.action}</span>`;return`
      <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
        <td style="padding: 10px; font-family: monospace; font-size: 11px; color: var(--clr-text-dim); white-space: nowrap;">
          ${t}
        </td>
        <td style="padding: 10px; font-weight: 600; color: #fff;">
          ${Ku(e.user_name||`Admin`)}
        </td>
        <td style="padding: 10px;">
          ${n}
        </td>
        <td style="padding: 10px; font-weight: 500; text-transform: uppercase; font-size: 11px; color: var(--clr-primary);">
          ${Ku(e.module)}
        </td>
        <td style="padding: 10px; color: #fff;">
          ${Ku(e.description)}
        </td>
        <td style="padding: 10px; font-family: monospace; font-size: 11px; color: var(--clr-text-dim);">
          ${e.ip_address||`-`}
        </td>
      </tr>
    `}).join(``)}
      </tbody>
    </table>
  `}function Gu(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}function Ku(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var qu=`dashboard`,Ju=null,Yu=null,Xu=null,Zu=[],Qu=null,$u=[...h],ed=`all`;async function td({onPublicTourUpdate:e,onExitAdminToTour:t}){Kc(),Wc(async e=>{if(e){let e=sessionStorage.getItem(`admin_redirect_hash`);sessionStorage.removeItem(`admin_redirect_hash`),await od(),nd(),e&&e.startsWith(`#admin`)?(window.location.hash=e,ld(e)):window.location.hash.startsWith(`#admin`)?ld(window.location.hash):(window.location.hash=`#admin/dashboard`,hd(`dashboard`,null,!1))}else window.location.hash=`beranda`});try{let[e,t]=await Promise.all([Z.getScenes(),Z.getCustomSceneNames().catch(()=>({}))]);e&&e.length>0?e.forEach(e=>{let n=$u.find(t=>t.id===e.id);n&&(n.name=t[e.id]||e.name||n.name,n.description=e.description??n.description,n.planting_zone_id=e.planting_zone_id??n.planting_zone_id,n.status=e.status??n.status,e.initialViewParameters&&(n.initialViewParameters={...n.initialViewParameters,...e.initialViewParameters}),e.initialView&&(n.initialView={...n.initialView,...e.initialView}))}):t&&$u.forEach(e=>{t[e.id]&&(e.name=t[e.id])})}catch(e){console.warn(`Gagal sinkronisasi data scene server:`,e)}Zu=await Z.getHotspots(),Qu=new el({scenes:$u,getHotspots:()=>Zu,onHotspotsChanged:t=>{Zu=t,_d(),e&&e(Zu)},onSceneSwitchRequest:e=>{Qu.setScene(e)}}),Qu.init(),window.__editorInstance=Qu,$u.length>0&&(Qu.currentSceneId=$u[0].id),md(t),nl({scenes:$u,getHotspots:()=>Zu,onRestoreComplete:async()=>{Zu=await Z.getHotspots(),Qu.renderHotspotsOnCurrentScene(),Qu.renderHotspotsList(),gd(),e&&e(Zu)}}),sl({scenes:$u,onSettingsUpdated:()=>{}}),rd(),nd(),Yc()&&(await od(),window.location.hash.startsWith(`#admin`)?ld(window.location.hash):gd()),_d()}function nd(){let e=Z.getUser()||{name:`Administrator`,username:`admin`,email:`admin@ikhw.org`,role:`administrator`},t=e.name||e.username||`Administrator`,n=e.email||`admin@ikhw.org`,r={administrator:`Administrator`,admin:`Admin Sistem`,superadmin:`Super Admin`,petugas_penanaman:`Petugas Penanaman`,editor_konten:`Editor Konten`}[e.role]||e.role||`Petugas Penanaman`,i=e.role===`admin`||e.role===`superadmin`||e.role===`administrator`,a=t.trim().split(/\s+/).filter(Boolean),o=a.length>=2?(a[0][0]+a[1][0]).toUpperCase():t.substring(0,2).toUpperCase(),s=document.getElementById(`topbar-user-avatar`),c=document.getElementById(`dropdown-user-avatar-lg`),l=document.getElementById(`topbar-user-name`),u=document.getElementById(`dropdown-user-fullname`),d=document.getElementById(`topbar-user-role`),f=document.getElementById(`dropdown-user-role-badge`),p=document.getElementById(`dropdown-user-email`),m=document.getElementById(`sidebar-user-avatar`),h=document.getElementById(`sidebar-user-name`),g=document.getElementById(`sidebar-user-email`);s&&(s.textContent=o||`AD`),c&&(c.textContent=o||`AD`),l&&(l.textContent=t),u&&(u.textContent=t),p&&(p.textContent=n),d&&(d.textContent=r,d.className=e.role===`petugas_penanaman`?`text-[10px] text-sky-400 font-medium leading-none mt-0.5`:e.role===`editor_konten`?`text-[10px] text-amber-400 font-medium leading-none mt-0.5`:`text-[10px] text-emerald-400 font-medium leading-none mt-0.5`),f&&(f.textContent=r,f.className=e.role===`petugas_penanaman`?`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20`:e.role===`editor_konten`?`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20`:`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`),m&&(m.textContent=o||`AD`),h&&(h.textContent=t),g&&(g.textContent=n);let _=i;document.querySelectorAll(`[data-admin-tab="users"], [data-admin-tab="settings"]`).forEach(e=>{_?e.style.opacity=`1`:(e.style.opacity=`0.45`,e.setAttribute(`title`,`Menu ini hanya dapat dikelola oleh Administrator Sistem`))})}function rd(){let e=document.getElementById(`admin-profile-dropdown-root`),t=document.getElementById(`btn-admin-profile-toggle`),n=document.getElementById(`admin-profile-menu`),r=document.getElementById(`topbar-profile-chevron`);if(!t||!n)return;let i=()=>{n.classList.add(`hidden`),t.setAttribute(`aria-expanded`,`false`),r&&r.classList.remove(`rotated`)},a=()=>{n.classList.remove(`hidden`),t.setAttribute(`aria-expanded`,`true`),r&&r.classList.add(`rotated`)};t.hasAttribute(`data-bound`)||(t.setAttribute(`data-bound`,`true`),t.addEventListener(`click`,e=>{e.stopPropagation(),t.getAttribute(`aria-expanded`)===`true`?i():a()})),document.querySelectorAll(`.profile-menu-nav-item`).forEach(e=>{e.hasAttribute(`data-bound`)||(e.setAttribute(`data-bound`,`true`),e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target-tab`);i(),t&&hd(t)}))}),document.addEventListener(`click`,t=>{e&&!e.contains(t.target)&&i()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!n.classList.contains(`hidden`)&&(i(),t.focus())})}function id(e){let t=document.getElementById(`topbar-zone-switcher-container`);t&&([`dashboard`,`zones`,`trees`,`reports`].includes(e)?t.classList.remove(`hidden`):t.classList.add(`hidden`))}function ad(e,t=null){let n=document.getElementById(`admin-header-title`),r=document.getElementById(`admin-breadcrumb-active`),i=document.getElementById(`breadcrumb-category-wrapper`),a=document.getElementById(`breadcrumb-category-title`),o=document.getElementById(`breadcrumb-btn-root`);o&&!o.hasAttribute(`data-bound`)&&(o.setAttribute(`data-bound`,`true`),o.addEventListener(`click`,()=>hd(`dashboard`)));let s=null,c=`Dashboard Ringkasan Virtual Tour & Silvikultur`,l=`Dashboard Ringkasan`;e===`dashboard`?(s=null,c=`Dashboard Ringkasan Virtual Tour & Silvikultur`,l=`Ringkasan`):e===`zones`?(s=`2. Persiapan`,t===`create`?(c=`Formulir Tambah Kawasan Baru`,l=`Tambah Kawasan`):t===`detail`?(c=`Detail Informasi Kawasan (8 Tab)`,l=`Detail Kawasan`):t===`gallery`?(c=`Galeri Foto Dokumentasi Kawasan`,l=`Galeri Kawasan`):(c=`Manajemen Kawasan / Lahan Penanaman Pohon`,l=`Manajemen Kawasan`)):e===`trees`?t===`species`?(s=`2. Persiapan`,c=`Master Jenis Pohon (Silvikultur)`,l=`Master Jenis Pohon`):t===`activities`?(s=`3. Pelaksanaan`,c=`Kegiatan Penanaman & Batch Bibit`,l=`Kegiatan Penanaman`):t===`surveys`?(s=`4. Pemantauan & Perawatan`,c=`Pemantauan Pertumbuhan & Sensus Pohon`,l=`Pemantauan Tanaman`):t===`maintenance`?(s=`4. Pemantauan & Perawatan`,c=`Perawatan, Pemupukan & Penyulaman`,l=`Perawatan & Penyulaman`):(s=`1. Dashboard`,c=`Statistik & Ringkasan Penanaman`,l=`Statistik Penanaman`):e===`panoramas`?(s=`5. Dokumentasi Digital`,c=`Manajemen Panorama 360° Kawasan`,l=`Manajemen Panorama`):e===`editor`?(s=`5. Dokumentasi Digital`,c=`Visual Hotspot & Spatial Editor Marzipano`,l=`Editor Hotspot`):e===`reports`?(s=`6. Evaluasi & Pelaporan`,t===`per-kawasan`?(c=`Laporan Agregat per Kawasan`,l=`Rekapitulasi Kawasan`):t===`per-pohon`?(c=`Laporan Distribusi per Jenis Pohon`,l=`Rekapitulasi Pohon`):t===`ekspor`?(c=`Pusat Ekspor & Unduhan Data`,l=`Ekspor Data`):(c=`Laporan & Statistik Penanaman Komprehensif`,l=`Laporan & Statistik`)):e===`settings`?(s=`7. Pengelolaan Sistem`,c=`Pengaturan Sistem & Identitas Organisasi`,l=`Pengaturan & Identitas`):e===`users`?(s=`7. Pengelolaan Sistem`,c=`Manajemen Pengguna & Hak Akses`,l=`Kelola Pengguna`):e===`activity-logs`?(s=`7. Pengelolaan Sistem`,c=`Log Histori Aktivitas & Jejak Audit`,l=`Log Aktivitas`):e===`backup`&&(s=`7. Pengelolaan Sistem`,c=`Cadangan & Pemulihan Basis Data`,l=`Cadangan Data`),n&&(n.textContent=c),r&&(r.textContent=l),i&&a&&(s?(a.textContent=s,i.classList.remove(`hidden`)):i.classList.add(`hidden`))}async function od(){if(!Yc())return;let e=document.getElementById(`topbar-zone-switcher`);if(e)try{let t=(await Z.getZones({sort_by:`name`,sort_dir:`asc`})).zones||[];e.innerHTML=`<option value="all" class="bg-slate-900 text-white">Semua Kawasan (Agregat)</option>`,t.forEach(t=>{let n=document.createElement(`option`);n.value=t.id,n.className=`bg-slate-900 text-white`,n.textContent=`${t.name} ${t.zone_code?`(${t.zone_code})`:``}`,e.appendChild(n)}),ed&&(e.value=ed),e.hasAttribute(`data-bound`)||(e.setAttribute(`data-bound`,`true`),e.addEventListener(`change`,()=>{ed=e.value,gd()}))}catch(e){console.warn(`Gagal memuat switcher kawasan:`,e)}}function sd(e,t=null){return e===`dashboard`?`#admin/dashboard`:e===`zones`?t&&t!==`list`?`#admin/zones/${t}`:`#admin/zones`:e===`trees`?t&&t!==`dashboard`?`#admin/trees/${t}`:`#admin/trees/dashboard`:e===`panoramas`?`#admin/panoramas`:e===`editor`?`#admin/editor`:e===`settings`?`#admin/settings`:e===`reports`?t&&t!==`rekap`?`#admin/reports/${t}`:`#admin/reports`:e===`users`?`#admin/users`:e===`activity-logs`?`#admin/activity-logs`:e===`backup`?`#admin/backup`:`#admin/dashboard`}function cd(e){if(!e)return{tab:`dashboard`,subTab:null};let t=e.replace(/^#?\/?/,``).replace(/^\/+/,``).split(`/`).filter(Boolean);if(t[0]!==`admin`)return null;let n=t[1]||`dashboard`,r=t[2]||null;return n===`kawasan`||n===`zones`?{tab:`zones`,subTab:r||`list`}:n===`species`?{tab:`trees`,subTab:`species`}:n===`activities`?{tab:`trees`,subTab:`activities`}:n===`surveys`?{tab:`trees`,subTab:`surveys`}:n===`maintenance`?{tab:`trees`,subTab:`maintenance`}:n===`logs`||n===`activity-logs`?{tab:`activity-logs`,subTab:null}:n===`reports`?{tab:`reports`,subTab:r||`rekap`}:n===`trees`?{tab:`trees`,subTab:r||`dashboard`}:{tab:n,subTab:r}}function ld(e){let t=cd(e);if(t){if(!Yc()){sessionStorage.setItem(`admin_redirect_hash`,e),window.location.href=`/login`;return}hd(t.tab,t.subTab,!1)}}function ud(e=`dashboard`,t=null){if(!Yc()){sessionStorage.setItem(`admin_redirect_hash`,sd(e,t)),window.location.href=`/login`;return}let n=sd(e,t);window.location.hash=n,hd(e,t,!1)}function dd(){let e=document.getElementById(`admin-sidebar`),t=document.getElementById(`admin-sidebar-backdrop`);e&&e.classList.add(`-translate-x-full`),t&&t.classList.add(`hidden`)}function fd(){let e=document.getElementById(`admin-sidebar`),t=document.getElementById(`admin-sidebar-backdrop`);e&&e.classList.remove(`-translate-x-full`),t&&t.classList.remove(`hidden`)}function pd(){let e=document.getElementById(`admin-sidebar`),t=document.getElementById(`admin-main-wrapper`),n=document.getElementById(`btn-toggle-sidebar-collapse`),r=document.getElementById(`btn-sidebar-collapse-toggle`),i=e=>{n&&n.setAttribute(`aria-expanded`,e?`false`:`true`),r&&r.setAttribute(`aria-expanded`,e?`false`:`true`)},a=(n,r=!0)=>{if(e&&t){if(e.classList.toggle(`sidebar-collapsed`,n),t.classList.toggle(`sidebar-collapsed`,n),i(n),r)try{localStorage.setItem(`admin_sidebar_collapsed`,n?`true`:`false`)}catch{}setTimeout(()=>{window.dispatchEvent(new Event(`resize`))},260)}},o=()=>{let t=!e?.classList.contains(`sidebar-collapsed`);a(t,!0)};try{localStorage.getItem(`admin_sidebar_collapsed`)===`true`&&window.innerWidth>=1024?a(!0,!1):i(!1)}catch{i(!1)}n&&!n.hasAttribute(`data-bound`)&&(n.setAttribute(`data-bound`,`true`),n.addEventListener(`click`,o)),r&&!r.hasAttribute(`data-bound`)&&(r.setAttribute(`data-bound`,`true`),r.addEventListener(`click`,o))}function md(e){pd(),document.querySelectorAll(`.admin-nav-btn`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.getAttribute(`data-admin-tab`),r=e.getAttribute(`data-tree-subtab`),i=e.getAttribute(`data-zone-subtab`),a=e.getAttribute(`data-report-subtab`);dd(),n&&(n===`zones`?hd(`zones`,i||`list`):n===`reports`?hd(`reports`,a||`rekap`):n===`trees`?hd(`trees`,r||`dashboard`):hd(n))})});let t=document.getElementById(`sidebar-btn-tour-preview`);t&&t.addEventListener(`click`,t=>{dd(),e?(t.preventDefault(),e()):window.location.hash=`tour`});let n=document.getElementById(`btn-admin-view-public`);n&&n.addEventListener(`click`,()=>{dd(),e?e():window.location.hash=`beranda`});let r=document.getElementById(`btn-admin-mobile-sidebar`),i=document.getElementById(`btn-close-admin-sidebar-mobile`),a=document.getElementById(`admin-sidebar-backdrop`);r&&r.addEventListener(`click`,fd),i&&i.addEventListener(`click`,dd),a&&a.addEventListener(`click`,dd)}function hd(e,t=null,n=!0){if(qu=e,e===`trees`?Ju=t:e===`zones`?Yu=t:e===`reports`&&(Xu=t),n){let n=sd(e,t);window.location.hash!==n&&(window.location.hash.startsWith(`#admin`)||window.location.hash===``)&&(window.location.hash=n)}document.querySelectorAll(`.admin-nav-btn`).forEach(t=>{let n=t.getAttribute(`data-admin-tab`),r=t.getAttribute(`data-tree-subtab`),i=t.getAttribute(`data-zone-subtab`),a=t.getAttribute(`data-report-subtab`),o=!1;o=e===`trees`?n===`trees`&&(r===Ju||!Ju&&r===`dashboard`):e===`zones`?n===`zones`&&(i===Yu||!Yu&&i===`list`):e===`reports`?n===`reports`&&(a===Xu||!Xu&&a===`rekap`):n===e,t.classList.toggle(`active`,o)}),document.querySelectorAll(`.admin-subpane`).forEach(t=>{t.classList.toggle(`active`,t.id===`admin-pane-${e}`)}),ad(e,t),id(e),gd(),window.scrollTo(0,0),e===`editor`&&Qu&&setTimeout(()=>{window.dispatchEvent(new Event(`resize`)),Qu.refreshViewerSize();let e=Qu.currentSceneId||($u.length>0?$u[0].id:null);e&&Qu.setScene(e)},100)}function gd(){_d(),Yc()&&(qu===`dashboard`?Xc({scenes:$u,hotspots:Zu,selectedZoneId:ed,onNavigateToPanorama:()=>hd(`panoramas`),onNavigateToEditor:()=>hd(`editor`),onNavigateToTrees:()=>hd(`trees`,`dashboard`),onNavigateToZones:()=>hd(`zones`,`list`),onNavigateToSpecies:()=>hd(`trees`,`species`),onNavigateToActivities:()=>hd(`trees`,`activities`),onNavigateToSurveys:()=>hd(`trees`,`surveys`),onNavigateToMaintenance:()=>hd(`trees`,`maintenance`),onNavigateToReports:()=>hd(`reports`,`rekap`),onNavigateToLogs:()=>hd(`activity-logs`)}):qu===`zones`?Yu?ru(Yu):nu({scenes:$u}):qu===`panoramas`?Qc({scenes:$u,hotspots:Zu,onOpenEditorForScene:e=>{Qu&&(Qu.currentSceneId=e),hd(`editor`),setTimeout(()=>{Qu&&Qu.setScene(e)},120)},onPreviewScene:e=>{window.location.hash=`tour`;let t=new CustomEvent(`preview-scene`,{detail:{sceneId:e}});window.dispatchEvent(t)},onScenesUpdated:()=>{gd()}}):qu===`trees`?Ju?yl(Ju,$u):vl({scenes:$u}):qu===`reports`?Xu?Tu(Xu):wu():qu===`settings`?sl({scenes:$u,onSettingsUpdated:()=>{}}):qu===`backup`?nl({scenes:$u,getHotspots:()=>Zu,onRestoreComplete:async()=>{Zu=await Z.getHotspots(),gd()}}):qu===`users`?Pu():qu===`activity-logs`?Vu():qu===`editor`&&Qu&&(Qu.renderHotspotsList(),Qu.renderHotspotsOnCurrentScene()))}function _d(){let e=Zu.filter(e=>e.status===`draft`).length,t=document.getElementById(`admin-draft-count-badge`);t&&(t.textContent=e>0?`${e} Draft`:`Sinkron`,t.className=`px-2.5 py-1 rounded-full text-xs font-semibold ${e>0?`bg-amber-500/10 text-amber-400 border border-amber-500/30`:`bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}`)}var vd=[],yd=null;async function bd(e,t){let n=document.getElementById(e);n&&(yd=t,n.innerHTML=`
    <div class="hero-section" style="padding: 24px 28px; margin-bottom: 24px;">
      <div class="hero-badge">🌳 Flora & Silvikultur Kawasan</div>
      <h1 class="hero-title" style="font-size: 26px; margin: 10px 0;">
        Katalog Jenis Pohon Kawasan Restorasi
      </h1>
      <p class="hero-subtitle" style="max-width: 800px; font-size: 14px; margin-bottom: 20px;">
        Dokumentasi resmi seluruh spesies pohon yang terdaftar dan ditanam dalam kawasan pemulihan lahan ±2 hektare. Data kuantitas bibit dan kelangsungan hidup disajikan secara faktual berdasarkan catatan survei lapangan.
      </p>

      <!-- Filter & Search Toolbar -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; background: rgba(0,0,0,0.25); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <div style="flex: 1; min-width: 220px;">
          <input type="text" id="catalog-search" class="form-input form-input-sm" placeholder="🔍 Cari nama pohon, ilmiah, atau famili..." style="width: 100%;" />
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <label style="font-size: 12px; color: var(--clr-text-muted);">Status Asal:</label>
          <select id="catalog-filter-origin" class="form-select form-select-sm" style="width: auto;">
            <option value="all">Semua Status</option>
            <option value="lokal_asli">Jenis Lokal / Asli</option>
            <option value="introduksi">Introduksi</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Species Grid Container -->
    <div id="catalog-grid" class="points-grid" style="min-height: 250px;">
      <div style="grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; padding: 60px 0;">
        <span class="loading-spinner"></span> Memuat katalog pohon...
      </div>
    </div>

    <!-- Modal Detail Pohon Publik -->
    <div id="catalog-detail-modal" class="modal-overlay hidden">
      <div class="modal-card" style="max-width: 640px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 26px;">🌿</span>
            <div>
              <h3 id="catmodal-title" style="margin: 0; font-size: 18px;">Detail Pohon</h3>
              <p id="catmodal-subtitle" style="margin: 2px 0 0; font-size: 12px; font-style: italic; color: var(--clr-primary-light);"></p>
            </div>
          </div>
          <button id="btn-close-catmodal" class="icon-btn" aria-label="Tutup">✕</button>
        </div>
        <div class="modal-body" id="catmodal-body">
          <!-- Populated dynamically -->
        </div>
        <div class="modal-footer" style="display: flex; justify-content: flex-end;">
          <button type="button" id="btn-catmodal-close-action" class="btn-secondary-action btn-sm">Tutup</button>
        </div>
      </div>
    </div>
  `,xd(),await Sd())}function xd(){let e=document.getElementById(`catalog-search`),t=document.getElementById(`catalog-filter-origin`),n=document.getElementById(`btn-close-catmodal`),r=document.getElementById(`btn-catmodal-close-action`),i=document.getElementById(`catalog-detail-modal`);e?.addEventListener(`input`,()=>Cd()),t?.addEventListener(`change`,()=>Cd());let a=()=>i?.classList.add(`hidden`);n?.addEventListener(`click`,a),r?.addEventListener(`click`,a),i?.addEventListener(`click`,e=>{e.target===i&&a()})}async function Sd(){let e=document.getElementById(`catalog-grid`);if(e)try{vd=(await Z.getPublicTreeSpecies()).species||[],Cd()}catch(t){e.innerHTML=`
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; background: rgba(239, 68, 68, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.2);">
        <p style="color: var(--clr-danger); margin-bottom: 8px;">Gagal memuat data katalog pohon.</p>
        <p style="font-size: 13px; color: var(--clr-text-muted);">${Ed(t.message)}</p>
      </div>
    `}}function Cd(){let e=document.getElementById(`catalog-grid`);if(!e)return;let t=document.getElementById(`catalog-search`)?.value.toLowerCase().trim()||``,n=document.getElementById(`catalog-filter-origin`)?.value||`all`,r=vd.filter(e=>{let r=!t||e.common_name&&e.common_name.toLowerCase().includes(t)||e.scientific_name&&e.scientific_name.toLowerCase().includes(t)||e.local_name&&e.local_name.toLowerCase().includes(t)||e.family&&e.family.toLowerCase().includes(t),i=n===`all`||e.origin_status===n;return r&&i});r.length===0?e.innerHTML=`
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: rgba(0,0,0,0.18); border-radius: var(--radius-md); border: 1px dashed var(--clr-border);">
        <span style="font-size: 38px; display: block; margin-bottom: 12px;">🌱</span>
        <h3 style="font-size: 16px; margin-bottom: 6px;">Belum Ada Spesies Pohon Tercatat</h3>
        <p style="font-size: 13px; color: var(--clr-text-muted); max-width: 500px; margin: 0 auto;">
          ${t||n!==`all`?`Tidak ada jenis pohon yang cocok dengan filter pencarian Anda.`:`Data master pohon belum dimasukkan atau belum disetujui untuk publikasi oleh administrator.`}
        </p>
      </div>
    `:(e.innerHTML=r.map(e=>wd(e)).join(``),e.querySelectorAll(`.btn-view-species-detail`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-id`)),n=vd.find(e=>e.id===t);n&&Td(n)})}),e.querySelectorAll(`.btn-jump-scene`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);yd&&t&&yd(t)})}))}function wd(e){let t=e.origin_status===`lokal_asli`?`pill-success`:`pill-info`,n=(e.scenes||[]).map(e=>`
    <button class="btn-jump-scene btn-text-btn btn-sm" data-scene-id="${e.scene_id}" style="font-size: 11px; padding: 2px 6px; background: rgba(16, 185, 129, 0.12); color: var(--clr-primary-light); border-radius: 4px;" title="Lihat di panorama: ${Ed(e.scene_name||e.scene_id)}">
      📍 ${Ed(e.zone||e.scene_name||e.scene_id)}
    </button>
  `).join(``);return`
    <div class="point-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="point-card-top" style="margin-bottom: 8px;">
          <span class="admin-header-pill ${t}" style="font-size: 11px;">
            ${Ed(e.origin_status_label||e.origin_status)}
          </span>
          <span style="font-size: 11px; color: var(--clr-primary-light); font-weight: 600;">
            ${e.total_planted>0?`🌱 ${e.total_planted} Bibit Ditanam`:`🌱 Belum Ditanam`}
          </span>
        </div>

        <h3 class="point-title" style="margin-bottom: 2px; font-size: 16px;">
          ${Ed(e.common_name)}
        </h3>

        ${e.local_name?`<div style="font-size: 12px; color: var(--clr-text-muted); margin-bottom: 2px;">Nama Daerah: <strong>${Ed(e.local_name)}</strong></div>`:``}

        ${e.scientific_name?`<div style="font-size: 12px; font-style: italic; color: var(--clr-text-dim); margin-bottom: 8px;">${Ed(e.scientific_name)} ${e.family?`• Famili ${Ed(e.family)}`:``}</div>`:``}

        ${e.ecological_function?`
          <div style="font-size: 12px; color: var(--clr-text); background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 10px; line-height: 1.4;">
            <strong style="color: var(--clr-primary-light);">Fungsi Ekologis:</strong><br/>
            ${Ed(e.ecological_function)}
          </div>
        `:``}

        ${e.scenes&&e.scenes.length>0?`
          <div style="margin-bottom: 10px;">
            <div style="font-size: 11px; color: var(--clr-text-dim); margin-bottom: 4px;">Titik Lokasi Panorama:</div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${n}
            </div>
          </div>
        `:``}
      </div>

      <div style="border-top: 1px solid var(--clr-border); padding-top: 10px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px; color: var(--clr-text-dim);">
          ${e.activities_count?`${e.activities_count} Kegiatan Tanam`:`Master Spesies`}
        </span>
        <button class="btn-view-species-detail btn-secondary-action btn-sm" data-id="${e.id}" style="font-size: 12px; padding: 5px 12px;">
          Lihat Profil Lengkap →
        </button>
      </div>
    </div>
  `}function Td(e){let t=document.getElementById(`catalog-detail-modal`),n=document.getElementById(`catmodal-title`),r=document.getElementById(`catmodal-subtitle`),i=document.getElementById(`catmodal-body`);t&&i&&(n.textContent=e.common_name,r.textContent=e.scientific_name?`${e.scientific_name} ${e.family?`(${e.family})`:``}`:``,i.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 14px;">
      ${e.photo_path?`
        <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 220px; background: #000; border: 1px solid var(--clr-border);">
          <img src="${e.photo_path}" alt="${Ed(e.common_name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
        </div>
      `:``}

      <div class="stats-grid" style="margin-bottom: 0;">
        <div class="stat-card" style="padding: 10px;">
          <span class="stat-label">Nama Lokal</span>
          <span class="stat-value" style="font-size: 14px;">${Ed(e.local_name||`-`)}</span>
        </div>
        <div class="stat-card" style="padding: 10px;">
          <span class="stat-label">Status Asal</span>
          <span class="stat-value" style="font-size: 14px;">${Ed(e.origin_status_label)}</span>
        </div>
        <div class="stat-card" style="padding: 10px;">
          <span class="stat-label">Total Bibit Ditanam</span>
          <span class="stat-value" style="font-size: 14px; color: var(--clr-primary-light);">${e.total_planted>0?`${e.total_planted} Batang`:`Belum Ada`}</span>
        </div>
      </div>

      ${e.description?`
        <div>
          <h4 style="font-size: 13px; color: var(--clr-primary-light); margin-bottom: 4px;">Deskripsi Morfologi & Silvikultur</h4>
          <p style="font-size: 13px; line-height: 1.5; color: var(--clr-text-muted);">${Ed(e.description)}</p>
        </div>
      `:``}

      ${e.ecological_function?`
        <div>
          <h4 style="font-size: 13px; color: var(--clr-primary-light); margin-bottom: 4px;">Peran & Fungsi Ekologis</h4>
          <p style="font-size: 13px; line-height: 1.5; color: var(--clr-text-muted);">${Ed(e.ecological_function)}</p>
        </div>
      `:``}

      ${e.benefits?`
        <div>
          <h4 style="font-size: 13px; color: var(--clr-primary-light); margin-bottom: 4px;">Manfaat & Kegunaan</h4>
          <p style="font-size: 13px; line-height: 1.5; color: var(--clr-text-muted);">${Ed(e.benefits)}</p>
        </div>
      `:``}

      ${e.reference_source?`
        <div style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: var(--clr-text-dim);">
          📖 <strong>Sumber Referensi Identifikasi:</strong> ${Ed(e.reference_source)}
        </div>
      `:``}
    </div>
  `,t.classList.remove(`hidden`))}function Ed(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Dd=[],Od=null;function kd(e){let t=Number(e)||0;return t===0?`0 Hektare`:`${t.toLocaleString(`id-ID`,{minimumFractionDigits:0,maximumFractionDigits:4})} Hektare`}function Ad(e){let t=Number(e)||0;return t===0?`0 m²`:`${Math.round(t).toLocaleString(`id-ID`)} m²`}function jd(e){let t=document.getElementById(`stat-luas-label`),n=document.getElementById(`stat-luas`),r=document.getElementById(`stat-luas-desc`),i=document.getElementById(`stat-zones-label`),a=document.getElementById(`stat-zones-count`),o=document.getElementById(`stat-zones-desc`),s=document.getElementById(`stat-trees-label`),c=document.getElementById(`stat-trees-count`),l=document.getElementById(`stat-trees-desc`),u=document.getElementById(`stat-species-label`),d=document.getElementById(`stat-species-count`),f=document.getElementById(`stat-species-desc`);t&&(t.textContent=`Total Luas Kawasan`),i&&(i.textContent=`Jumlah Kawasan/Lahan`),s&&(s.textContent=`Bibit Awal Ditanam`),u&&(u.textContent=`Total Jenis Pohon`),f&&(f.textContent=`Spesies terdata di master database`);let p=0,m=0,h=0,g=0,_=6;e&&typeof e==`object`&&(`total_area_ha`in e?(p=Number(e.total_area_ha)||0,m=Number(e.total_area_m2)||p*1e4,h=Number(e.total_zones)||0,g=Number(e.total_trees??e.total_seedlings)||0,`total_species`in e&&(_=Number(e.total_species)||6)):Array.isArray(e)&&(h=e.length,p=e.reduce((e,t)=>{let n=t.area_in_ha===void 0?t.area_unit===`m2`?Number(t.area_size)/1e4:Number(t.area_size):Number(t.area_in_ha);return e+(isNaN(n)?0:n)},0),m=p*1e4,g=e.reduce((e,t)=>e+(Number(t.total_initial_seedlings)||0),0))),n&&(n.textContent=kd(p)),r&&(r.textContent=Ad(m)),a&&(a.textContent=`${h} Kawasan`),o&&(o.textContent=`Total kawasan/lahan dalam sistem.`),c&&(c.textContent=`${g.toLocaleString(`id-ID`)} Batang`),l&&(l.textContent=`Akumulasi seluruh kegiatan & lahan`),d&&(d.innerHTML=`<span class="stat-emoji" style="margin-right: 6px;">🌿</span>${_}`)}async function Md(){try{let e=await Z.getPublicZones();e&&e.summary?jd(e.summary):e&&e.zones&&jd(e.zones)}catch(e){console.debug(`Error refreshing public total area:`,e)}}async function Nd(e,t){let n=document.getElementById(e);if(n){Od=t;try{let e=await Z.getPublicZones();Dd=e&&e.zones?e.zones:[],e&&e.summary?jd(e.summary):jd(Dd)}catch(e){console.warn(`Gagal memuat kawasan publik:`,e),Dd=[]}Pd(n),Fd()}}function Pd(e){!Dd||Dd.length===0?e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--clr-border, #24352b);">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">🌱</span>
        <h4 style="margin: 0 0 6px 0; color: var(--clr-text, #e2e8f0);">Belum Ada Kawasan yang Dipublikasikan</h4>
        <p style="margin: 0; font-size: 13px; color: var(--clr-text-muted, #94a3b8);">Data kawasan penanaman akan segera tersedia setelah diverifikasi.</p>
      </div>
    `:(e.innerHTML=Dd.map(e=>{let t=e.latitude&&e.longitude,n=e.survival_rate!==null&&e.survival_rate!==void 0?`${Number(e.survival_rate).toFixed(1)}% Kelangsungan Hidup`:`Data survei belum lengkap`,r=e.survival_rate>=80?`text-emerald-400`:e.survival_rate>=50?`text-amber-400`:`text-slate-400`;return`
      <div class="point-card" style="display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--clr-border, #24352b); background: var(--clr-surface, #14211a); border-radius: 12px; overflow: hidden; padding: 18px;">
        <div>
          <div class="point-card-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="point-sequence-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-weight: 600; font-size: 11px; padding: 3px 8px; border-radius: 6px;">
              ${e.zone_code}
            </span>
            <span class="point-status-tag" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 11px; padding: 3px 8px; border-radius: 6px;">
              ${Ld(e.category||`Kawasan Restorasi`)}
            </span>
          </div>

          <h3 class="point-title" style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #fff;">
            ${Ld(e.name)}
          </h3>
          <p class="point-desc" style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 14px;">
            ${Ld(e.description||`Program restorasi vegetasi pohon dan pengayaan ekosistem.`)}
          </p>

          <!-- Metrics summary -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; background: rgba(0,0,0,0.25); padding: 10px; border-radius: 8px;">
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Luas Lahan</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${Number(e.area_size).toLocaleString(`id-ID`)} ${Ld(e.area_unit||`ha`)}
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Total Bibit Awal</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${Number(e.total_initial_seedlings||0).toLocaleString(`id-ID`)} Btg
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Jenis Spesies</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${e.species_count||0} Jenis
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Status Pantau</span>
              <strong style="font-size: 11px;" class="${r}">
                ${n}
              </strong>
            </div>
          </div>

          <div class="point-meta" style="font-size: 12px; color: #64748b; margin-bottom: 14px;">
            📍 ${Ld(e.city||e.address||`Provinsi Aceh`)}
            ${t?` • <span style="font-family: monospace;">${Number(e.latitude).toFixed(4)}° N, ${Number(e.longitude).toFixed(4)}° E</span>`:``}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button class="btn-card-explore btn-public-zone-detail" data-zone-id="${e.id}" style="flex: 1; padding: 8px 12px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            ℹ️ Detail Kawasan
          </button>
          ${e.scenes_count>0?`
            <button class="btn-card-explore btn-public-zone-tour" data-zone-id="${e.id}" style="flex: 1; background: var(--clr-primary, #059669); color: white; padding: 8px 12px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              🔄 Virtual Tour
            </button>
          `:``}
        </div>
      </div>
    `}).join(``),e.querySelectorAll(`.btn-public-zone-detail`).forEach(e=>{e.addEventListener(`click`,()=>{Id(e.getAttribute(`data-zone-id`))})}),e.querySelectorAll(`.btn-public-zone-tour`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-zone-id`);try{let e=await Z.getPublicZone(t);if(e.success&&e.zone&&e.zone.scenes&&e.zone.scenes.length>0){let t=e.zone.scenes[0];Od&&Od(t.id)}else window.location.hash=`tour`}catch{window.location.hash=`tour`}})}))}function Fd(){let e=document.getElementById(`public-zone-modal`);e&&(e.querySelectorAll(`.btn-close-modal`).forEach(t=>{t.addEventListener(`click`,()=>{e.classList.add(`hidden`)})}),e.addEventListener(`click`,t=>{t.target===e&&e.classList.add(`hidden`)}))}async function Id(e){let t=document.getElementById(`public-zone-modal`),n=document.getElementById(`public-zone-modal-body`),r=document.getElementById(`public-zone-modal-title`),i=document.getElementById(`public-zone-modal-badge`);if(t&&n){t.classList.remove(`hidden`),n.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; padding: 40px 0;">
      <span class="loading-spinner"></span> Memuat detail kawasan...
    </div>
  `;try{let a=await Z.getPublicZone(e);if(!a.success||!a.zone){n.innerHTML=`<div class="alert alert-error">Gagal memuat detail kawasan penanaman.</div>`;return}let o=a.zone;r&&(r.textContent=o.name),i&&(i.textContent=`${o.zone_code} • ${o.category||`Kawasan Restorasi`}`);let s=o.survival_rate!==null&&o.survival_rate!==void 0?`${Number(o.survival_rate).toFixed(1)}%`:`Belum cukup data survei`;n.innerHTML=`
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- Banner Deskripsi -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #34d399;">🌱 Ringkasan & Profil Lahan</h4>
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
            ${Ld(o.description||`Tidak ada keterangan tambahan.`)}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: #94a3b8;">
            <div><strong>Tujuan Penanaman:</strong> ${Ld(o.planting_purpose||`Restorasi ekosistem`)}</div>
            <div><strong>Status Lahan:</strong> <span style="color: #38bdf8;">${Ld(o.status||`Aktif`)}</span></div>
          </div>
        </div>

        <!-- Metrik Faktual -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Luas Lahan Tercatat</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${Number(o.area_size).toLocaleString(`id-ID`)} ${Ld(o.area_unit||`ha`)}
            </div>
            <div style="font-size: 11px; color: #94a3b8;">(±${Number(o.area_in_ha).toFixed(2)} Hektare)</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Total Bibit Awal</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${Number(o.total_initial_seedlings||0).toLocaleString(`id-ID`)} Batang
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Data historis kegiatan</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Keanekaragaman</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${o.species_count||0} Spesies
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Komposisi pohon</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Kelangsungan Hidup</div>
            <div style="font-size: 15px; font-weight: 700; color: #34d399; margin-top: 2px;">
              ${s}
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Survei terverifikasi</div>
          </div>
        </div>

        <!-- Lokasi & Titik Acuan Referensi -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 14px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #e2e8f0;">📍 Lokasi Deskriptif</h4>
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #94a3b8;">
            ${Ld([o.address,o.village,o.district,o.city,o.province].filter(Boolean).join(`, `)||`Provinsi Aceh`)}
          </p>
          ${o.latitude&&o.longitude?`
            <div style="font-size: 12px; color: #64748b;">
              Titik Acuan Lapangan (WGS84): <code style="color: #38bdf8;">${Number(o.latitude).toFixed(6)}° N, ${Number(o.longitude).toFixed(6)}° E</code>
            </div>
          `:`<div style="font-size: 12px; color: #64748b;">Titik koordinat acuan: Belum terverifikasi</div>`}
        </div>

        <!-- Daftar Jenis Pohon Tertanam -->
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #e2e8f0;">🌳 Jenis Pohon Tertanam</h4>
          ${o.species_list&&o.species_list.length>0?`
            <table class="species-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--clr-border, #24352b); text-align: left; color: #64748b;">
                  <th style="padding: 8px 6px;">Nama Lokal</th>
                  <th style="padding: 8px 6px;">Nama Ilmiah</th>
                  <th style="padding: 8px 6px; text-align: right;">Jumlah Bibit Awal</th>
                </tr>
              </thead>
              <tbody>
                ${o.species_list.map(e=>`
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                    <td style="padding: 8px 6px; font-weight: 600; color: #e2e8f0;">${Ld(e.local_name)}</td>
                    <td style="padding: 8px 6px; font-style: italic; color: #94a3b8;">${Ld(e.scientific_name)}</td>
                    <td style="padding: 8px 6px; text-align: right; color: #34d399; font-weight: 600;">
                      ${Number(e.total_quantity).toLocaleString(`id-ID`)} Batang
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          `:`
            <div style="font-size: 13px; color: #64748b; font-style: italic; padding: 12px 0;">
              Belum ada pencatatan kelompok bibit pohon terdaftar untuk kawasan ini.
            </div>
          `}
        </div>

        <!-- Scene Panorama Terhubung -->
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #e2e8f0;">🔄 Panorama 360° Terhubung (${o.scenes?o.scenes.length:0} Titik)</h4>
          ${o.scenes&&o.scenes.length>0?`
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
              ${o.scenes.map(e=>`
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <span style="font-size: 10px; color: #38bdf8; font-weight: 600;">Titik ${e.sequence}</span>
                    <h5 style="margin: 2px 0 8px 0; font-size: 13px; color: #e2e8f0;">${Ld(e.name)}</h5>
                  </div>
                  <button class="btn-primary-action btn-sm btn-open-scene-direct" data-scene-id="${e.id}" style="padding: 6px 10px; font-size: 11px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 4px;">
                    👁️ Buka Panorama
                  </button>
                </div>
              `).join(``)}
            </div>
          `:`
            <div style="font-size: 13px; color: #64748b; font-style: italic; padding: 8px 0;">
              Belum ada titik panorama 360° yang dihubungkan ke kawasan ini.
            </div>
          `}
        </div>
      </div>
    `,n.querySelectorAll(`.btn-open-scene-direct`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.getAttribute(`data-scene-id`);t.classList.add(`hidden`),Od?Od(n):window.location.hash=`tour`})})}catch(e){n.innerHTML=`<div class="alert alert-error">Gagal menghubungi server: ${Ld(e.message)}</div>`}}}function Ld(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var Rd=[],zd=[],Bd=`all`,Vd=`all`,Hd=``,Ud=-1,Wd=[];async function Gd(e=`public-gallery-container`){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
    <div class="gallery-wrapper">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 28px 24px; margin-bottom: 24px;">
        <div class="hero-badge" style="margin-bottom: 14px;">
          <span>📸</span> Dokumentasi Visual & Silvikultur Kawasan
        </div>
        <h1 class="hero-title" style="font-size: 32px; margin-bottom: 10px;">
          Galeri Foto Kawasan Restorasi
        </h1>
        <p class="hero-subtitle text-slate-300 text-sm w-full max-w-full mx-auto leading-relaxed text-center" style="text-align: center; margin-bottom: 0; padding-left: 24px; padding-right: 24px; max-width: 100%;">
          Dokumentasi visual perkembangan kawasan pemulihan lahan &plusmn;2 hektare, pelaksanaan penanaman, pertumbuhan tutupan tajuk, dan monitoring berkala.
        </p>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="gallery-filter-toolbar bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch md:items-center justify-between" style="margin-bottom: 36px;">
        <div class="flex flex-wrap items-center gap-4 sm:gap-5">
          <div class="flex items-center gap-2.5">
            <label for="gallery-filter-zone" class="text-xs sm:text-sm text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0">
              <span class="text-base">🏞️</span> Kawasan:
            </label>
            <select id="gallery-filter-zone" class="h-11 sm:h-12 bg-slate-950/90 hover:bg-slate-950 border border-white/15 hover:border-emerald-500/60 text-slate-100 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition shadow-md cursor-pointer min-w-[190px]">
              <option value="all">Semua Kawasan</option>
            </select>
          </div>

          <div class="flex items-center gap-2.5">
            <label for="gallery-filter-category" class="text-xs sm:text-sm text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0">
              <span class="text-base">🏷️</span> Kategori:
            </label>
            <select id="gallery-filter-category" class="h-11 sm:h-12 bg-slate-950/90 hover:bg-slate-950 border border-white/15 hover:border-emerald-500/60 text-slate-100 text-sm font-medium rounded-xl pl-4 pr-10 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition shadow-md cursor-pointer min-w-[200px]">
              <option value="all">Semua Kategori</option>
              <option value="Kondisi Kawasan">Kondisi Kawasan</option>
              <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
              <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
              <option value="Pemantauan">Pemantauan</option>
              <option value="Perawatan">Perawatan</option>
              <option value="Fasilitas">Fasilitas</option>
              <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
            </select>
          </div>
        </div>

        <div class="relative min-w-[260px] md:max-w-sm w-full">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            id="gallery-search-input"
            placeholder="Cari foto, judul, keterangan..."
            class="h-11 sm:h-12 w-full bg-slate-950/90 hover:bg-slate-950 border border-white/15 hover:border-emerald-500/60 text-slate-100 text-sm font-medium rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 placeholder-slate-500 transition shadow-md"
          />
        </div>
      </div>

      <!-- Grid Foto Galeri -->
      <div id="gallery-grid-container" class="min-h-[320px]">
        <div class="flex items-center justify-center py-20 text-slate-400 gap-2">
          <span class="loading-spinner"></span> Memuat galeri foto...
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Container -->
    <div id="gallery-lightbox-modal" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden flex flex-col justify-between" role="dialog" aria-modal="true" aria-label="Penampil Foto Kawasan">
      <!-- Lightbox Header -->
      <div class="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 text-white select-none z-20">
        <div class="flex items-center gap-3">
          <span id="lightbox-counter" class="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">1 / 1</span>
          <span id="lightbox-category-badge" class="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">Kategori</span>
        </div>
        <button id="btn-close-lightbox" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 transition cursor-pointer font-bold text-sm" aria-label="Tutup penampil foto (Escape)">
          <span>Tutup</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Lightbox Main Stage -->
      <div class="relative flex-1 flex items-center justify-center p-4 overflow-hidden select-none cursor-pointer" id="lightbox-stage">
        <!-- Prev Button -->
        <button id="btn-lightbox-prev" class="absolute left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition hover:scale-110 cursor-pointer" aria-label="Foto sebelumnya">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Main Displayed Image (Stops propagation so clicking backdrop closes) -->
        <div class="max-w-5xl max-h-[75vh] flex items-center justify-center transition-all duration-300 cursor-default" id="lightbox-img-wrapper">
          <img id="lightbox-img" src="" alt="" class="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl border border-slate-800/80" />
          <div id="lightbox-error-msg" class="hidden bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
            <span class="text-3xl mb-2 block">⚠️</span>
            <p class="font-semibold text-white text-sm">Gagal memuat gambar foto</p>
            <p class="text-xs text-slate-400 mt-1">Berkas gambar tidak ditemukan atau belum tersedia.</p>
          </div>
        </div>

        <!-- Next Button -->
        <button id="btn-lightbox-next" class="absolute right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition hover:scale-110 cursor-pointer" aria-label="Foto berikutnya">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Lightbox Footer (Info & Caption) -->
      <div class="px-6 py-4 bg-slate-900/90 border-t border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 z-20 select-none">
        <div>
          <h3 id="lightbox-title" class="text-base font-bold text-white leading-snug">Judul Foto</h3>
          <p id="lightbox-caption" class="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">Deskripsi foto</p>
        </div>
        <div class="flex items-center gap-4 text-xs text-slate-400 shrink-0">
          <span id="lightbox-zone-name">🏞️ Kawasan</span>
          <span id="lightbox-date">📅 Tanggal</span>
        </div>
      </div>
    </div>
  `;try{zd=(await Z.getPublicZones()).zones||[];let e=document.getElementById(`gallery-filter-zone`);e&&zd.length>0&&zd.forEach(t=>{let n=document.createElement(`option`);n.value=t.id,n.textContent=`${t.name} (${t.zone_code})`,e.appendChild(n)})}catch(e){console.warn(`Gagal memuat kawasan untuk filter galeri:`,e)}await Kd();let n=document.getElementById(`gallery-filter-zone`),r=document.getElementById(`gallery-filter-category`),i=document.getElementById(`gallery-search-input`);n&&n.addEventListener(`change`,e=>{Bd=e.target.value,qd()}),r&&r.addEventListener(`change`,e=>{Vd=e.target.value,qd()}),i&&i.addEventListener(`input`,e=>{Hd=e.target.value.toLowerCase().trim(),qd()}),Yd()}async function Kd(){let e=document.getElementById(`gallery-grid-container`);if(e)try{Rd=(await Z.getAllPublicPhotos()).photos||[],qd()}catch(t){console.error(`Error loading gallery photos:`,t),e.innerHTML=`
      <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
        <p class="font-semibold mb-1">Gagal memuat data galeri foto</p>
        <p class="text-xs text-red-300">${nf(t.message)}</p>
      </div>
    `}}function qd(){Wd=Rd.filter(e=>{if(Bd!==`all`&&e.planting_zone_id!==Bd||Vd!==`all`&&e.category!==Vd)return!1;if(Hd){let t=(e.title||``).toLowerCase().includes(Hd),n=(e.caption||``).toLowerCase().includes(Hd),r=(e.zone?.name||``).toLowerCase().includes(Hd),i=(e.category||``).toLowerCase().includes(Hd);if(!t&&!n&&!r&&!i)return!1}return!0}),Jd()}function Jd(){let e=document.getElementById(`gallery-grid-container`);e&&(Wd.length===0?e.innerHTML=`
      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <div class="text-4xl mb-3">📷</div>
        <h4 class="text-base font-bold text-white mb-1">Belum Ada Foto Dokumentasi</h4>
        <p class="text-xs text-slate-400 max-w-md mx-auto">
          Tidak ditemukan foto yang sesuai dengan filter yang dipilih atau belum ada foto yang dipublikasikan.
        </p>
      </div>
    `:(e.innerHTML=`
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      ${Wd.map((e,t)=>{let n=e.zone?e.zone.name:`Kawasan Penanaman`,r=dl(e.documented_at),i=e.thumbnail_url||e.file_url||e.file_path||``;return i&&!i.startsWith(`http://`)&&!i.startsWith(`https://`)&&!i.startsWith(`/`)&&(i=`/`+i),`
          <div
            class="gallery-card group bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-500/40 hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
            data-index="${t}"
          >
            <!-- Thumbnail Box -->
            <div class="relative aspect-4/3 bg-slate-950 overflow-hidden">
              <img
                src="${i}"
                alt="${nf(e.alt_text||e.title||`Foto Kawasan`)}"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onerror="this.src='/favicon.svg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                <span class="text-xs font-semibold text-white flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                  <span>🔍</span> Perbesar Foto
                </span>
              </div>
              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span class="text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg shadow-sm">
                  ${nf(e.category||`Dokumentasi`)}
                </span>
                ${e.is_cover?`
                  <span class="text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                    <span>⭐</span> Sampul
                  </span>
                `:``}
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-4 flex-1 flex flex-col justify-between gap-3 bg-slate-900/30">
              <div>
                <h4 class="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors tracking-tight">
                  ${nf(e.title||`Dokumentasi Kawasan`)}
                </h4>
                ${e.caption?`
                  <p class="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    ${nf(e.caption)}
                  </p>
                `:`
                  <p class="text-xs text-slate-500 italic mt-1.5 line-clamp-1">
                    Foto dokumentasi resmi kawasan penanaman
                  </p>
                `}
              </div>
              <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span class="truncate max-w-[130px] font-medium text-slate-300 flex items-center gap-1" title="${nf(n)}">
                  <span>🏞️</span> ${nf(n)}
                </span>
                <span class="font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  📅 ${r}
                </span>
              </div>
            </div>
          </div>
        `}).join(``)}
    </div>
  `,e.querySelectorAll(`.gallery-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`),10);isNaN(t)||Xd(t)})})))}function Yd(){let e=document.getElementById(`gallery-lightbox-modal`),t=document.getElementById(`btn-close-lightbox`),n=document.getElementById(`btn-lightbox-prev`),r=document.getElementById(`btn-lightbox-next`);t&&t.addEventListener(`click`,Zd),n&&n.addEventListener(`click`,e=>{e.stopPropagation(),Qd()}),r&&r.addEventListener(`click`,e=>{e.stopPropagation(),$d()});let i=document.getElementById(`lightbox-stage`),a=document.getElementById(`lightbox-img-wrapper`);if(i&&i.addEventListener(`click`,e=>{e.target===i&&Zd()}),a&&a.addEventListener(`click`,e=>{e.stopPropagation()}),window.addEventListener(`keydown`,t=>{e&&!e.classList.contains(`hidden`)&&(t.key===`Escape`?Zd():t.key===`ArrowLeft`?Qd():t.key===`ArrowRight`&&$d())}),i){let e=0;i.addEventListener(`touchstart`,t=>{e=t.changedTouches[0].screenX},{passive:!0}),i.addEventListener(`touchend`,t=>{let n=t.changedTouches[0].screenX-e;Math.abs(n)>50&&(n>0?Qd():$d())},{passive:!0})}}function Xd(e){if(e<0||e>=Wd.length)return;Ud=e;let t=document.getElementById(`gallery-lightbox-modal`);t&&(t.classList.remove(`hidden`),document.body.style.overflow=`hidden`),ef()}function Zd(){let e=document.getElementById(`gallery-lightbox-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``),Ud=-1}function Qd(){Wd.length!==0&&(Ud=(Ud-1+Wd.length)%Wd.length,ef())}function $d(){Wd.length!==0&&(Ud=(Ud+1)%Wd.length,ef())}function ef(){if(Ud<0||Ud>=Wd.length)return;let e=Wd[Ud],t=document.getElementById(`lightbox-img`),n=document.getElementById(`lightbox-title`),r=document.getElementById(`lightbox-caption`),i=document.getElementById(`lightbox-zone-name`),a=document.getElementById(`lightbox-date`),o=document.getElementById(`lightbox-counter`),s=document.getElementById(`lightbox-category-badge`),c=document.getElementById(`lightbox-error-msg`);t&&(t.classList.remove(`hidden`),c&&c.classList.add(`hidden`),t.onerror=()=>{t.classList.add(`hidden`),c&&c.classList.remove(`hidden`)},t.src=e.file_url||e.file_path,t.alt=e.alt_text||e.title||`Foto Kawasan`),n&&(n.textContent=e.title||`Dokumentasi Kawasan`),r&&(r.textContent=e.caption||`-`),i&&(i.textContent=`🏞️ ${e.zone?e.zone.name:`Kawasan Penanaman`}`),a&&(a.textContent=`📅 ${e.documented_at?tf(e.documented_at):`-`}`),o&&(o.textContent=`${Ud+1} / ${Wd.length}`),s&&(s.textContent=e.category||`Dokumentasi`)}function tf(e){if(!e)return`-`;try{return new Date(e).toLocaleDateString(`id-ID`,{day:`numeric`,month:`short`,year:`numeric`})}catch{return e}}function nf(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var rf=s(((e,t)=>{t.exports=function(){return typeof Promise==`function`&&Promise.prototype&&Promise.prototype.then}})),af=s((e=>{var t,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(e){if(!e)throw Error(`"version" cannot be null or undefined`);if(e<1||e>40)throw Error(`"version" should be in range from 1 to 40`);return e*4+17},e.getSymbolTotalCodewords=function(e){return n[e]},e.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},e.setToSJISFunction=function(e){if(typeof e!=`function`)throw Error(`"toSJISFunc" is not a valid function.`);t=e},e.isKanjiModeEnabled=function(){return t!==void 0},e.toSJIS=function(e){return t(e)}})),of=s((e=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`l`:case`low`:return e.L;case`m`:case`medium`:return e.M;case`q`:case`quartile`:return e.Q;case`h`:case`high`:return e.H;default:throw Error(`Unknown EC Level: `+t)}}e.isValid=function(e){return e&&e.bit!==void 0&&e.bit>=0&&e.bit<4},e.from=function(n,r){if(e.isValid(n))return n;try{return t(n)}catch{return r}}})),sf=s(((e,t)=>{function n(){this.buffer=[],this.length=0}n.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=n})),cf=s(((e,t)=>{function n(e){if(!e||e<1)throw Error(`BitMatrix size must be defined and greater than 0`);this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}n.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},n.prototype.get=function(e,t){return this.data[e*this.size+t]},n.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},n.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=n})),lf=s((e=>{var t=af().getSymbolSize;e.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=t(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let e=1;e<n-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},e.getPositions=function(t){let n=[],r=e.getRowColCoords(t),i=r.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)e===0&&t===0||e===0&&t===i-1||e===i-1&&t===0||n.push([r[e],r[t]]);return n}})),uf=s((e=>{var t=af().getSymbolSize,n=7;e.getPositions=function(e){let r=t(e);return[[0,0],[r-n,0],[0,r-n]]}})),df=s((e=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return e!=null&&e!==``&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let n=e.size,r=0,i=0,a=0,o=null,s=null;for(let c=0;c<n;c++){i=a=0,o=s=null;for(let l=0;l<n;l++){let n=e.get(c,l);n===o?i++:(i>=5&&(r+=t.N1+(i-5)),o=n,i=1),n=e.get(l,c),n===s?a++:(a>=5&&(r+=t.N1+(a-5)),s=n,a=1)}i>=5&&(r+=t.N1+(i-5)),a>=5&&(r+=t.N1+(a-5))}return r},e.getPenaltyN2=function(e){let n=e.size,r=0;for(let t=0;t<n-1;t++)for(let i=0;i<n-1;i++){let n=e.get(t,i)+e.get(t,i+1)+e.get(t+1,i)+e.get(t+1,i+1);(n===4||n===0)&&r++}return r*t.N2},e.getPenaltyN3=function(e){let n=e.size,r=0,i=0,a=0;for(let t=0;t<n;t++){i=a=0;for(let o=0;o<n;o++)i=i<<1&2047|e.get(t,o),o>=10&&(i===1488||i===93)&&r++,a=a<<1&2047|e.get(o,t),o>=10&&(a===1488||a===93)&&r++}return r*t.N3},e.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let t=0;t<r;t++)n+=e.data[t];return Math.abs(Math.ceil(n*100/r/5)-10)*t.N4};function n(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2==0;case e.Patterns.PATTERN001:return n%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(n+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return n*r%2+n*r%3==0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2==0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2==0;default:throw Error(`bad maskPattern:`+t)}}e.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let a=0;a<r;a++)t.isReserved(a,i)||t.xor(a,i,n(e,a,i))},e.getBestMask=function(t,n){let r=Object.keys(e.Patterns).length,i=0,a=1/0;for(let o=0;o<r;o++){n(o),e.applyMask(o,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(o,t),r<a&&(a=r,i=o)}return i}})),ff=s((e=>{var t=of(),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(e,r){switch(r){case t.L:return n[(e-1)*4+0];case t.M:return n[(e-1)*4+1];case t.Q:return n[(e-1)*4+2];case t.H:return n[(e-1)*4+3];default:return}},e.getTotalCodewordsCount=function(e,n){switch(n){case t.L:return r[(e-1)*4+0];case t.M:return r[(e-1)*4+1];case t.Q:return r[(e-1)*4+2];case t.H:return r[(e-1)*4+3];default:return}}})),pf=s((e=>{var t=new Uint8Array(512),n=new Uint8Array(256);(function(){let e=1;for(let r=0;r<255;r++)t[r]=e,n[e]=r,e<<=1,e&256&&(e^=285);for(let e=255;e<512;e++)t[e]=t[e-255]})(),e.log=function(e){if(e<1)throw Error(`log(`+e+`)`);return n[e]},e.exp=function(e){return t[e]},e.mul=function(e,r){return e===0||r===0?0:t[n[e]+n[r]]}})),mf=s((e=>{var t=pf();e.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<n.length;a++)r[i+a]^=t.mul(e[i],n[a]);return r},e.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let e=r[0];for(let i=0;i<n.length;i++)r[i]^=t.mul(n[i],e);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r},e.generateECPolynomial=function(n){let r=new Uint8Array([1]);for(let i=0;i<n;i++)r=e.mul(r,new Uint8Array([1,t.exp(i)]));return r}})),hf=s(((e,t)=>{var n=mf();function r(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},r.prototype.encode=function(e){if(!this.genPoly)throw Error(`Encoder not initialized`);let t=new Uint8Array(e.length+this.degree);t.set(e);let r=n.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r},t.exports=r})),gf=s((e=>{e.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}})),_f=s((e=>{var t=`[0-9]+`,n=`[A-Z $%*+\\-./:]+`,r=`(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+`;r=r.replace(/u/g,`\\u`);var i=`(?:(?![A-Z0-9 $%*+\\-./:]|`+r+`)(?:.|[\r
]))+`;e.KANJI=new RegExp(r,`g`),e.BYTE_KANJI=RegExp(`[^A-Z0-9 $%*+\\-./:]+`,`g`),e.BYTE=new RegExp(i,`g`),e.NUMERIC=new RegExp(t,`g`),e.ALPHANUMERIC=new RegExp(n,`g`);var a=RegExp(`^`+r+`$`),o=RegExp(`^[0-9]+$`),s=RegExp(`^[A-Z0-9 $%*+\\-./:]+$`);e.testKanji=function(e){return a.test(e)},e.testNumeric=function(e){return o.test(e)},e.testAlphanumeric=function(e){return s.test(e)}})),vf=s((e=>{var t=gf(),n=_f();e.NUMERIC={id:`Numeric`,bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:`Alphanumeric`,bit:2,ccBits:[9,11,13]},e.BYTE={id:`Byte`,bit:4,ccBits:[8,16,16]},e.KANJI={id:`Kanji`,bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,n){if(!e.ccBits)throw Error(`Invalid mode: `+e);if(!t.isValid(n))throw Error(`Invalid version: `+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return n.testNumeric(t)?e.NUMERIC:n.testAlphanumeric(t)?e.ALPHANUMERIC:n.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw Error(`Invalid mode`)},e.isValid=function(e){return e&&e.bit&&e.ccBits};function r(t){if(typeof t!=`string`)throw Error(`Param is not a string`);switch(t.toLowerCase()){case`numeric`:return e.NUMERIC;case`alphanumeric`:return e.ALPHANUMERIC;case`kanji`:return e.KANJI;case`byte`:return e.BYTE;default:throw Error(`Unknown mode: `+t)}}e.from=function(t,n){if(e.isValid(t))return t;try{return r(t)}catch{return n}}})),yf=s((e=>{var t=af(),n=ff(),r=of(),i=vf(),a=gf(),o=7973,s=t.getBCHDigit(o);function c(t,n,r){for(let i=1;i<=40;i++)if(n<=e.getCapacity(i,r,t))return i}function l(e,t){return i.getCharCountIndicator(e,t)+4}function u(e,t){let n=0;return e.forEach(function(e){let r=l(e.mode,t);n+=r+e.getBitsLength()}),n}function d(t,n){for(let r=1;r<=40;r++)if(u(t,r)<=e.getCapacity(r,n,i.MIXED))return r}e.from=function(e,t){return a.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,r,o){if(!a.isValid(e))throw Error(`Invalid QR Code version`);o===void 0&&(o=i.BYTE);let s=(t.getSymbolTotalCodewords(e)-n.getTotalCodewordsCount(e,r))*8;if(o===i.MIXED)return s;let c=s-l(o,e);switch(o){case i.NUMERIC:return Math.floor(c/10*3);case i.ALPHANUMERIC:return Math.floor(c/11*2);case i.KANJI:return Math.floor(c/13);case i.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(e,t){let n,i=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return d(e,i);if(e.length===0)return 1;n=e[0]}else n=e;return c(n.mode,n.getLength(),i)},e.getEncodedBits=function(e){if(!a.isValid(e)||e<7)throw Error(`Invalid QR Code version`);let n=e<<12;for(;t.getBCHDigit(n)-s>=0;)n^=o<<t.getBCHDigit(n)-s;return e<<12|n}})),bf=s((e=>{var t=af(),n=1335,r=21522,i=t.getBCHDigit(n);e.getEncodedBits=function(e,a){let o=e.bit<<3|a,s=o<<10;for(;t.getBCHDigit(s)-i>=0;)s^=n<<t.getBCHDigit(s)-i;return(o<<10|s)^r}})),xf=s(((e,t)=>{var n=vf();function r(e){this.mode=n.NUMERIC,this.data=e.toString()}r.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t,n,r;for(t=0;t+3<=this.data.length;t+=3)n=this.data.substr(t,3),r=parseInt(n,10),e.put(r,10);let i=this.data.length-t;i>0&&(n=this.data.substr(t),r=parseInt(n,10),e.put(r,i*3+1))},t.exports=r})),Sf=s(((e,t)=>{var n=vf(),r=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`.split(``);function i(e){this.mode=n.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t=0;for(;t+2<=this.data.length;t+=2){let n=r.indexOf(this.data[t])*45;n+=r.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(r.indexOf(this.data[t]),6)},t.exports=i})),Cf=s(((e,t)=>{var n=vf();function r(e){this.mode=n.BYTE,this.data=typeof e==`string`?new TextEncoder().encode(e):new Uint8Array(e)}r.getBitsLength=function(e){return e*8},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r})),wf=s(((e,t)=>{var n=vf(),r=af();function i(e){this.mode=n.KANJI,this.data=e}i.getBitsLength=function(e){return e*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t=0;for(;t<this.data.length;t++){let n=r.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error(`Invalid SJIS character: `+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}},t.exports=i})),Tf=s(((e,t)=>{var n={single_source_shortest_paths:function(e,t,r){var i={},a={};a[t]=0;var o=n.PriorityQueue.make();o.push(t,0);for(var s,c,l,u,d,f,p,m,h;!o.empty();)for(l in s=o.pop(),c=s.value,u=s.cost,d=e[c]||{},d)d.hasOwnProperty(l)&&(f=d[l],p=u+f,m=a[l],h=a[l]===void 0,(h||m>p)&&(a[l]=p,o.push(l,p),i[l]=c));if(r!==void 0&&a[r]===void 0){var g=[`Could not find a path from `,t,` to `,r,`.`].join(``);throw Error(g)}return i},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,r){var i=n.single_source_shortest_paths(e,t,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t=n.PriorityQueue,r={},i;for(i in e||={},t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r.queue=[],r.sorter=e.sorter||t.default_sorter,r},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var n={value:e,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t!==void 0&&(t.exports=n)})),Ef=s((e=>{var t=vf(),n=xf(),r=Sf(),i=Cf(),a=wf(),o=_f(),s=af(),c=Tf();function l(e){return unescape(encodeURIComponent(e)).length}function u(e,t,n){let r=[],i;for(;(i=e.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:t,length:i[0].length});return r}function d(e){let n=u(o.NUMERIC,t.NUMERIC,e),r=u(o.ALPHANUMERIC,t.ALPHANUMERIC,e),i,a;return s.isKanjiModeEnabled()?(i=u(o.BYTE,t.BYTE,e),a=u(o.KANJI,t.KANJI,e)):(i=u(o.BYTE_KANJI,t.BYTE,e),a=[]),n.concat(r,i,a).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function f(e,o){switch(o){case t.NUMERIC:return n.getBitsLength(e);case t.ALPHANUMERIC:return r.getBitsLength(e);case t.KANJI:return a.getBitsLength(e);case t.BYTE:return i.getBitsLength(e)}}function p(e){return e.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}function m(e){let n=[];for(let r=0;r<e.length;r++){let i=e[r];switch(i.mode){case t.NUMERIC:n.push([i,{data:i.data,mode:t.ALPHANUMERIC,length:i.length},{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.ALPHANUMERIC:n.push([i,{data:i.data,mode:t.BYTE,length:i.length}]);break;case t.KANJI:n.push([i,{data:i.data,mode:t.BYTE,length:l(i.data)}]);break;case t.BYTE:n.push([{data:i.data,mode:t.BYTE,length:l(i.data)}])}}return n}function h(e,n){let r={},i={start:{}},a=[`start`];for(let o=0;o<e.length;o++){let s=e[o],c=[];for(let e=0;e<s.length;e++){let l=s[e],u=``+o+e;c.push(u),r[u]={node:l,lastCount:0},i[u]={};for(let e=0;e<a.length;e++){let o=a[e];r[o]&&r[o].node.mode===l.mode?(i[o][u]=f(r[o].lastCount+l.length,l.mode)-f(r[o].lastCount,l.mode),r[o].lastCount+=l.length):(r[o]&&(r[o].lastCount=l.length),i[o][u]=f(l.length,l.mode)+4+t.getCharCountIndicator(l.mode,n))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}function g(e,o){let c,l=t.getBestModeForData(e);if(c=t.from(o,l),c!==t.BYTE&&c.bit<l.bit)throw Error(`"`+e+`" cannot be encoded with mode `+t.toString(c)+`.
 Suggested mode is: `+t.toString(l));switch(c===t.KANJI&&!s.isKanjiModeEnabled()&&(c=t.BYTE),c){case t.NUMERIC:return new n(e);case t.ALPHANUMERIC:return new r(e);case t.KANJI:return new a(e);case t.BYTE:return new i(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return typeof t==`string`?e.push(g(t,null)):t.data&&e.push(g(t.data,t.mode)),e},[])},e.fromString=function(t,n){let r=h(m(d(t,s.isKanjiModeEnabled())),n),i=c.find_path(r.map,`start`,`end`),a=[];for(let e=1;e<i.length-1;e++)a.push(r.table[i[e]].node);return e.fromArray(p(a))},e.rawSplit=function(t){return e.fromArray(d(t,s.isKanjiModeEnabled()))}})),Df=s((e=>{var t=af(),n=of(),r=sf(),i=cf(),a=lf(),o=uf(),s=df(),c=ff(),l=hf(),u=yf(),d=bf(),f=vf(),p=Ef();function m(e,t){let n=e.size,r=o.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1||n<=i+t))for(let r=-1;r<=7;r++)a+r<=-1||n<=a+r||(t>=0&&t<=6&&(r===0||r===6)||r>=0&&r<=6&&(t===0||t===6)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0))}}function h(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}function g(e,t){let n=a.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)t===-2||t===2||n===-2||n===2||t===0&&n===0?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}function _(e,t){let n=e.size,r=u.getEncodedBits(t),i,a,o;for(let t=0;t<18;t++)i=Math.floor(t/3),a=t%3+n-8-3,o=(r>>t&1)==1,e.set(i,a,o,!0),e.set(a,i,o,!0)}function v(e,t,n){let r=e.size,i=d.getEncodedBits(t,n),a,o;for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);e.set(r-8,8,1,!0)}function y(e,t){let n=e.size,r=-1,i=n-1,a=7,o=0;for(let s=n-1;s>0;s-=2)for(s===6&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,s-n)){let r=!1;o<t.length&&(r=(t[o]>>>a&1)==1),e.set(i,s-n,r),a--,a===-1&&(o++,a=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function b(e,n,i){let a=new r;i.forEach(function(t){a.put(t.mode.bit,4),a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),t.write(a)});let o=(t.getSymbolTotalCodewords(e)-c.getTotalCodewordsCount(e,n))*8;for(a.getLengthInBits()+4<=o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);let s=(o-a.getLengthInBits())/8;for(let e=0;e<s;e++)a.put(e%2?17:236,8);return x(a,e,n)}function x(e,n,r){let i=t.getSymbolTotalCodewords(n),a=i-c.getTotalCodewordsCount(n,r),o=c.getBlocksCount(n,r),s=o-i%o,u=Math.floor(i/o),d=Math.floor(a/o),f=d+1,p=u-d,m=new l(p),h=0,g=Array(o),_=Array(o),v=0,y=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?d:f;g[e]=y.slice(h,h+t),_[e]=m.encode(g[e]),h+=t,v=Math.max(v,t)}let b=new Uint8Array(i),x=0,S,C;for(S=0;S<v;S++)for(C=0;C<o;C++)S<g[C].length&&(b[x++]=g[C][S]);for(S=0;S<p;S++)for(C=0;C<o;C++)b[x++]=_[C][S];return b}function S(e,n,r,a){let o;if(Array.isArray(e))o=p.fromArray(e);else if(typeof e==`string`){let t=n;if(!t){let n=p.rawSplit(e);t=u.getBestVersionForData(n,r)}o=p.fromString(e,t||40)}else throw Error(`Invalid data`);let c=u.getBestVersionForData(o,r);if(!c)throw Error(`The amount of data is too big to be stored in a QR Code`);if(!n)n=c;else if(n<c)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+c+`.
`);let l=b(n,r,o),d=new i(t.getSymbolSize(n));return m(d,n),h(d),g(d,n),v(d,r,0),n>=7&&_(d,n),y(d,l),isNaN(a)&&(a=s.getBestMask(d,v.bind(null,d,r))),s.applyMask(a,d),v(d,r,a),{modules:d,version:n,errorCorrectionLevel:r,maskPattern:a,segments:o}}e.create=function(e,r){if(e===void 0||e===``)throw Error(`No input text`);let i=n.M,a,o;return r!==void 0&&(i=n.from(r.errorCorrectionLevel,n.M),a=u.from(r.version),o=s.from(r.maskPattern),r.toSJISFunc&&t.setToSJISFunction(r.toSJISFunc)),S(e,a,i,o)}})),Of=s((e=>{function t(e){if(typeof e==`number`&&(e=e.toString()),typeof e!=`string`)throw Error(`Color should be defined as hex string`);let t=e.slice().replace(`#`,``).split(``);if(t.length<3||t.length===5||t.length>8)throw Error(`Invalid hex color: `+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),t.length===6&&t.push(`F`,`F`);let n=parseInt(t.join(``),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:`#`+t.slice(0,6).join(``)}}e.getOptions=function(e){e||={},e.color||(e.color={});let n=e.margin===void 0||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:t(e.color.dark||`#000000ff`),light:t(e.color.light||`#ffffffff`)},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+t.margin*2?t.width/(e+t.margin*2):t.scale},e.getImageWidth=function(t,n){let r=e.getScale(t,n);return Math.floor((t+n.margin*2)*r)},e.qrToImageData=function(t,n,r){let i=n.modules.size,a=n.modules.data,o=e.getScale(i,r),s=Math.floor((i+r.margin*2)*o),c=r.margin*o,l=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let u=(e*s+n)*4,d=r.color.light;if(e>=c&&n>=c&&e<s-c&&n<s-c){let t=Math.floor((e-c)/o),r=Math.floor((n-c)/o);d=l[+!!a[t*i+r]]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}})),kf=s((e=>{var t=Of();function n(e,t,n){e.clearRect(0,0,t.width,t.height),t.style||={},t.height=n,t.width=n,t.style.height=n+`px`,t.style.width=n+`px`}function r(){try{return document.createElement(`canvas`)}catch{throw Error(`You need to specify a canvas element`)}}e.render=function(e,i,a){let o=a,s=i;o===void 0&&(!i||!i.getContext)&&(o=i,i=void 0),i||(s=r()),o=t.getOptions(o);let c=t.getImageWidth(e.modules.size,o),l=s.getContext(`2d`),u=l.createImageData(c,c);return t.qrToImageData(u.data,e,o),n(l,s,c),l.putImageData(u,0,0),s},e.renderToDataURL=function(t,n,r){let i=r;i===void 0&&(!n||!n.getContext)&&(i=n,n=void 0),i||={};let a=e.render(t,n,i),o=i.type||`image/png`,s=i.rendererOpts||{};return a.toDataURL(o,s.quality)}})),Af=s((e=>{var t=Of();function n(e,t){let n=e.a/255,r=t+`="`+e.hex+`"`;return n<1?r+` `+t+`-opacity="`+n.toFixed(2).slice(1)+`"`:r}function r(e,t,n){let r=e+t;return n!==void 0&&(r+=` `+n),r}function i(e,t,n){let i=``,a=0,o=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);!l&&!o&&(o=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(i+=o?r(`M`,l+n,.5+u+n):r(`m`,a,0),a=0,o=!1),l+1<t&&e[c+1]||(i+=r(`h`,s),s=0)):a++}return i}e.render=function(e,r,a){let o=t.getOptions(r),s=e.modules.size,c=e.modules.data,l=s+o.margin*2,u=o.color.light.a?`<path `+n(o.color.light,`fill`)+` d="M0 0h`+l+`v`+l+`H0z"/>`:``,d=`<path `+n(o.color.dark,`stroke`)+` d="`+i(c,s,o.margin)+`"/>`,f=`viewBox="0 0 `+l+` `+l+`"`,p=`<svg xmlns="http://www.w3.org/2000/svg" `+(o.width?`width="`+o.width+`" height="`+o.width+`" `:``)+f+` shape-rendering="crispEdges">`+u+d+`</svg>
`;return typeof a==`function`&&a(null,p),p}})),jf=u(s((e=>{var t=rf(),n=Df(),r=kf(),i=Af();function a(e,r,i,a,o){let s=[].slice.call(arguments,1),c=s.length,l=typeof s[c-1]==`function`;if(!l&&!t())throw Error(`Callback required as last argument`);if(l){if(c<2)throw Error(`Too few arguments provided`);c===2?(o=i,i=r,r=a=void 0):c===3&&(r.getContext&&o===void 0?(o=a,a=void 0):(o=a,a=i,i=r,r=void 0))}else{if(c<1)throw Error(`Too few arguments provided`);return c===1?(i=r,r=a=void 0):c===2&&!r.getContext&&(a=i,i=r,r=void 0),new Promise(function(t,o){try{t(e(n.create(i,a),r,a))}catch(e){o(e)}})}try{let t=n.create(i,a);o(null,e(t,r,a))}catch(e){o(e)}}e.create=n.create,e.toCanvas=a.bind(null,r.render),e.toDataURL=a.bind(null,r.renderToDataURL),e.toString=a.bind(null,function(e,t,n){return i.render(e,n)})}))(),1),Mf=[],Nf=[],Pf=`all`,Ff=``;async function If(e=`public-tree-qr-container`){let t=document.getElementById(e);t&&(t.innerHTML=`
    <div class="tree-qr-wrapper py-2 sm:py-4">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 36px 24px; margin-bottom: 28px; border-radius: var(--radius-lg);">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3.5 shadow-sm">
          <span>📱</span> Identifikasi Digital Flora & Blok Kawasan
        </div>
        <h1 class="hero-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style="margin: 6px 0 10px;">
          Tree QR Code Kawasan Restorasi
        </h1>
        <p class="hero-subtitle text-slate-300 text-xs sm:text-sm w-full max-w-full mx-auto leading-relaxed text-center" style="text-align: center; margin: 0 auto 20px; padding-left: 24px; padding-right: 24px; max-width: 100%;">
          Pindai QR code di lapangan untuk mengakses profil biologis jenis pohon, taksonomi, atau data blok penanaman kawasan secara langsung melalui sistem informasi publik.
        </p>

        <!-- Informational Banner: Kejujuran Data Lapangan -->
        <div class="w-full max-w-full mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-left text-xs text-slate-300 flex items-start gap-3.5 shadow-xl backdrop-blur-sm" style="max-width: 100%;">
          <span class="text-xl shrink-0 mt-0.5">ℹ️</span>
          <div>
            <strong class="text-emerald-400 font-semibold block mb-0.5">Catatan Identifikasi Lapangan:</strong>
            <p class="leading-relaxed text-slate-400 text-xs">
              Sistem saat ini menerapkan identifikasi QR Code berbasis <strong>Master Jenis Spesies Pohon</strong> dan <strong>Kelompok / Blok Penanaman</strong> terverifikasi. QR Code individual per batang pohon hanya diterbitkan apabila penomoran tag pohon lapangan telah tercatat dalam basis data resmi.
            </p>
          </div>
        </div>
      </div>

      <!-- Filter Controls & Search Toolbar -->
      <div class="treeqr-toolbar w-full backdrop-blur-xl border border-white/10 rounded-xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between" style="padding: 12px 16px; margin-bottom: 28px; background: rgba(0, 0, 0, 0.28); border: 1px solid var(--clr-border);">
        <div class="flex items-center gap-2.5">
          <label for="qr-filter-type" style="font-size: 12px; color: var(--clr-text-muted); font-weight: 600; white-space: nowrap;">
            <span>🏷️</span> Filter Objek:
          </label>
          <select id="qr-filter-type" class="form-select form-select-sm" style="width: auto; min-width: 200px; padding: 7px 28px 7px 10px; font-size: 12px; background-color: #142018; border: 1px solid var(--clr-border); border-radius: 6px; color: #ffffff;">
            <option value="all">Semua Objek</option>
            <option value="species">🌳 Jenis Spesies Pohon</option>
            <option value="zone">🏞️ Kelompok / Blok Kawasan</option>
          </select>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto flex-1 md:justify-end">
          <!-- Live Search Input -->
          <div style="flex: 1; max-width: 340px; min-width: 200px;">
            <input
              type="text"
              id="qr-search-input"
              class="form-input form-input-sm"
              placeholder="🔍 Cari nama pohon, blok, famili..."
              style="width: 100%; padding: 7px 12px; font-size: 12px; background-color: #142018; border: 1px solid var(--clr-border); border-radius: 6px; color: #ffffff;"
            />
          </div>

          <div style="padding: 6px 12px; font-size: 11px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 6px; color: #34d399; font-family: monospace; font-weight: bold; white-space: nowrap; flex-shrink: 0;">
            <span id="qr-items-count">Memuat...</span>
          </div>
        </div>
      </div>

      <!-- Grid Cards (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols) -->
      <div id="tree-qr-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
        <div class="col-span-full py-16 text-center text-slate-400 flex items-center justify-center gap-2">
          <span class="animate-spin text-xl">⏳</span> Memuat data QR Code...
        </div>
      </div>
    </div>

    <!-- QR Detail / Scan Modal -->
    <div id="qr-preview-modal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
        <button id="btn-close-qrmodal" class="absolute top-4 right-4 z-30 p-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 transition cursor-pointer" aria-label="Tutup modal">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <span id="modal-qr-badge" class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          QR Code
        </span>
        <h3 id="modal-qr-title" class="text-lg font-bold text-white mb-1">Nama Objek</h3>
        <p id="modal-qr-sub" class="text-xs text-slate-400 italic mb-5">Subjudul Objek</p>

        <!-- Canvas Container -->
        <div class="bg-white p-4 rounded-2xl inline-block shadow-inner mb-4">
          <canvas id="modal-qr-canvas" class="max-w-full"></canvas>
        </div>

        <p class="text-xs text-slate-400 mb-4 max-w-xs mx-auto leading-relaxed">
          Pindai kode QR menggunakan kamera ponsel untuk langsung menuju laman profil publik.
        </p>

        <div class="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 mb-5 text-[11px] font-mono text-emerald-400 truncate max-w-sm mx-auto" id="modal-qr-url">
          https://...
        </div>

        <div class="flex items-center justify-center gap-3">
          <button type="button" id="btn-download-qr" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-900/30">
            <span>📥 Unduh QR</span>
          </button>
          <button type="button" id="btn-open-target-url" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700">
            <span>🌐 Buka Laman Profil</span>
          </button>
        </div>
      </div>
    </div>
  `,Lf(),Rf(),await zf())}function Lf(){let e=document.getElementById(`qr-filter-type`);e&&e.addEventListener(`change`,e=>{Pf=e.target.value||`all`,Vf()});let t=document.getElementById(`qr-search-input`);t&&t.addEventListener(`input`,e=>{Ff=(e.target.value||``).trim().toLowerCase(),Vf()})}function Rf(){let e=document.getElementById(`qr-preview-modal`),t=document.getElementById(`btn-close-qrmodal`),n=()=>e?.classList.add(`hidden`);t?.addEventListener(`click`,n),e?.addEventListener(`click`,t=>{t.target===e&&n()}),window.addEventListener(`keydown`,t=>{t.key===`Escape`&&e&&!e.classList.contains(`hidden`)&&n()})}async function zf(){try{let[e,t]=await Promise.all([Z.getPublicTreeSpecies().catch(()=>({species:[]})),Z.getPublicZones().catch(()=>({zones:[]}))]);Mf=e.species||[],Nf=t.zones||[],Vf()}catch(e){console.error(`Gagal memuat data tree QR:`,e);let t=document.getElementById(`tree-qr-grid`);t&&(t.innerHTML=`
        <div class="col-span-full bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
          Gagal memuat katalog QR Code. Silakan muat ulang halaman.
        </div>
      `)}}function Bf(){let e=window.location;return`${e.protocol}//${e.host}`}function Vf(){let e=document.getElementById(`tree-qr-grid`),t=document.getElementById(`qr-items-count`);if(!e)return;let n=[];(Pf===`all`||Pf===`species`)&&Mf.forEach(e=>{let t=e.common_name||e.local_name||`Spesies Pohon`,r=e.scientific_name||``;n.push({type:`species`,id:e.id,badge:`Jenis Spesies`,badgeColor:`emerald`,title:r?`${t} / ${r}`:t,commonName:t,scientificName:r,subtitle:``,photo:e.photo_path||null,totalPlanted:e.total_planted||0,origin:e.origin_status_label||`Lokal / Asli`,targetUrl:`${Bf()}/#katalog?species=${encodeURIComponent(e.id)}`})}),(Pf===`all`||Pf===`zone`)&&Nf.forEach(e=>{n.push({type:`zone`,id:e.id,badge:`Blok Kawasan`,badgeColor:`blue`,title:e.name,subtitle:`${e.zone_code||`Blok`} • ${e.category||`Silvikultur`}`,photo:null,areaSize:`${e.area_in_ha||e.area_size||0} Ha`,category:e.category||`Silvikultur`,origin:e.city||`Aceh Besar`,targetUrl:`${Bf()}/#beranda`})}),Ff&&(n=n.filter(e=>{let t=(e.title||``).toLowerCase().includes(Ff),n=(e.subtitle||``).toLowerCase().includes(Ff),r=(e.id||``).toLowerCase().includes(Ff),i=(e.origin||``).toLowerCase().includes(Ff);return t||n||r||i})),t&&(t.textContent=`Menampilkan ${n.length} objek`),n.length===0?e.innerHTML=`
      <div class="col-span-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <div class="text-3xl mb-2">🔍</div>
        <p class="font-bold text-white text-sm mb-1">Tidak Ada Objek Ditemukan</p>
        <p class="text-xs text-slate-400">
          ${Ff?`Tidak ada hasil untuk kata kunci "${Uf(Ff)}".`:`Belum ada objek terdaftar untuk kategori ini.`}
        </p>
      </div>
    `:(e.innerHTML=n.map((e,t)=>`
      <div class="treeqr-card bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-3 sm:p-4 lg:p-4.5 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" style="border-radius: 0px !important;">
        <!-- Top accent highlight line on hover -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div>
          <!-- Header: Category Badge + ID + Titles (No Tree Image) -->
          <div class="mb-2.5 sm:mb-3">
            <div class="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span class="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 ${e.type===`species`?`bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`:`bg-blue-500/15 text-blue-400 border border-blue-500/30`}" style="border-radius: 0px !important;">
                <span class="w-1.5 h-1.5 ${e.type===`species`?`bg-emerald-400 animate-pulse`:`bg-blue-400`}"></span>
                ${e.badge}
              </span>
              <span class="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-950/70 border border-slate-800/80 px-1.5 sm:px-2 py-0.5 truncate max-w-[85px] sm:max-w-[120px]" style="border-radius: 0px !important;">ID: ${Uf(e.id)}</span>
            </div>

            <h3 class="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate leading-snug" title="${Uf(e.title)}">
              ${e.type===`species`&&e.scientificName?`<span>${Uf(e.commonName)}</span> <span class="text-slate-500 font-normal text-[11px] sm:text-xs">/</span> <span class="text-[11px] sm:text-xs font-normal italic text-slate-400">${Uf(e.scientificName)}</span>`:Uf(e.title)}
            </h3>
            ${e.subtitle?`
              <p class="text-[11px] sm:text-xs text-slate-400 italic truncate mt-0.5">
                ${Uf(e.subtitle)}
              </p>
            `:``}
          </div>

          <!-- QR Code Centered Showcase (Strict 0 radius) -->
          <div class="my-2.5 sm:my-3 p-2.5 sm:p-3.5 bg-slate-950/70 border border-white/5 group-hover:border-emerald-500/30 flex flex-col items-center justify-center text-center transition-all relative overflow-hidden" style="border-radius: 0px !important;">
            <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

            <div class="relative p-1.5 sm:p-2 bg-white shadow-lg transition-transform duration-300 group-hover:scale-105 inline-flex items-center justify-center" style="border-radius: 0px !important;">
              <canvas id="qr-thumb-${t}" class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 block"></canvas>
            </div>

            ${e.type===`species`?`
              <div class="mt-2 sm:mt-2.5 text-[11px] sm:text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 tracking-wide">
                ${e.totalPlanted>0?`🌱 ${e.totalPlanted} Bibit`:`🌱 Belum Ada`}
              </div>
            `:``}
          </div>

          <!-- Metrics Grid: Hanya untuk non-spesies (zone/blok) -->
          ${e.type===`species`?``:`
            <div class="grid grid-cols-2 gap-2 my-2.5 text-xs">
              <div class="bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5 flex flex-col" style="border-radius: 0px !important;">
                <span class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Luas</span>
                <span class="text-xs font-bold text-blue-400 mt-0.5">
                  📐 ${Uf(e.areaSize||`0 Ha`)}
                </span>
              </div>
              <div class="bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5 flex flex-col" style="border-radius: 0px !important;">
                <span class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Wilayah</span>
                <span class="text-xs font-semibold text-slate-300 truncate mt-0.5">
                  📍 ${Uf(e.origin)}
                </span>
              </div>
            </div>
          `}
        </div>

        <!-- Footer Action Bar (Strict 0 radius) -->
        <div class="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1 sm:gap-2">
          <a href="${e.targetUrl}" class="text-[11px] sm:text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>Buka Info</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <button type="button" class="btn-open-qr-modal px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-semibold shadow-md shadow-emerald-950/50 hover:shadow-emerald-900/50 transition-all flex items-center gap-1 cursor-pointer" style="border-radius: 0px !important;" data-index="${t}">
            <span>Perbesar<span class="hidden sm:inline"> QR</span></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </button>
        </div>
      </div>
    `).join(``),n.forEach((e,t)=>{let n=document.getElementById(`qr-thumb-${t}`);n&&jf.toCanvas(n,e.targetUrl,{width:140,margin:1,color:{dark:`#0a1610`,light:`#ffffff`}}).catch(e=>console.warn(`QR render error:`,e))}),e.querySelectorAll(`.btn-open-qr-modal`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`),10);!isNaN(t)&&n[t]&&Hf(n[t])})}))}function Hf(e){let t=document.getElementById(`qr-preview-modal`),n=document.getElementById(`modal-qr-badge`),r=document.getElementById(`modal-qr-title`),i=document.getElementById(`modal-qr-sub`),a=document.getElementById(`modal-qr-url`),o=document.getElementById(`modal-qr-canvas`),s=document.getElementById(`btn-download-qr`),c=document.getElementById(`btn-open-target-url`);t&&o&&(n&&(n.textContent=e.badge),r&&(r.textContent=e.title),i&&(i.textContent=e.subtitle),a&&(a.textContent=e.targetUrl),jf.toCanvas(o,e.targetUrl,{width:220,margin:2,color:{dark:`#0f172a`,light:`#ffffff`}}),s&&(s.onclick=()=>{let t=document.createElement(`a`);t.download=`QR-${e.id}.png`,t.href=o.toDataURL(`image/png`),t.click()}),c&&(c.onclick=()=>{window.open(e.targetUrl,`_blank`)}),t.classList.remove(`hidden`))}function Uf(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Wf=null,Gf=`all`,Kf=``;async function qf(e=`public-carbon-container`){let t=document.getElementById(e);if(t){t.innerHTML=`
    <div class="carbon-loading-state">
      <div class="carbon-spinner"></div>
      <p>Memuat data monitoring karbon kawasan...</p>
    </div>
  `;try{let e=await fetch(`/api/carbon/public-summary`);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);let n=await e.json();if(!n.success)throw Error(n.message||`Gagal memuat data`);Wf=n,Jf(t,n)}catch(n){console.error(`Error loading carbon data:`,n),t.innerHTML=`
      <div class="carbon-error-state">
        <span class="carbon-error-icon">⚠️</span>
        <h3>Gagal Memuat Data Monitoring Karbon</h3>
        <p>${Yf(n.message||`Terjadi kesalahan saat memuat data dari server.`)}</p>
        <button class="btn-carbon-retry" id="btn-retry-carbon">Coba Lagi</button>
      </div>
    `;let r=document.getElementById(`btn-retry-carbon`);r&&r.addEventListener(`click`,()=>qf(e))}}}function Jf(e,t){let n=t.indicators||{};t.metadata;let r=t.charts||{},i=t.zones_table||[],a=r.species_composition||[],o=Kf?a.filter(e=>e.name.toLowerCase().includes(Kf.toLowerCase())||e.scientific_name&&e.scientific_name.toLowerCase().includes(Kf.toLowerCase())):a;e.innerHTML=`
    <div class="carbon-wrapper">
      <!-- 1. Hero Section -->
      <div class="carbon-hero">
        <div class="carbon-badge-row">
          <span class="carbon-badge-pill">🌱 Transparansi Restorasi & Akuntansi Karbon</span>
          <span class="carbon-badge-pill status-ready">Data Inventarisasi Tersedia</span>
          <span class="carbon-badge-pill status-est">Estimasi Awal Model Tropis</span>
        </div>
        <h1 class="carbon-title">Monitoring Karbon Kawasan Restorasi</h1>
        <p class="carbon-subtitle">
          Pantau perkembangan kawasan restorasi, pertumbuhan pohon, dan estimasi perubahan simpanan karbon melalui data pemantauan yang terdokumentasi.
        </p>
        
        <!-- Status Label Strip -->
        <div class="carbon-status-strip">
          <div class="status-strip-item">
            <span class="strip-dot green"></span>
            <span><strong>Status Inventarisasi:</strong> Sensus Lapangan Lengkap (${n.total_trees_planted?.toLocaleString()} Bibit Tertanam)</span>
          </div>
          <div class="status-strip-item">
            <span class="strip-dot yellow"></span>
            <span><strong>Metodologi Perhitungan:</strong> Formula Allometrik Pantropikal (Chave et al., 2014)</span>
          </div>
          <div class="status-strip-item">
            <span class="strip-dot orange"></span>
            <span><strong>Perubahan Stok (ΔC):</strong> Menunggu Periode Pengukuran ke-2</span>
          </div>
          <div class="status-strip-item">
            <span class="strip-dot blue"></span>
            <span><strong>Status Verra VM0047:</strong> Kandidat Metodologi ARR (Belum Diterbitkan Kredit)</span>
          </div>
        </div>
      </div>

      <!-- 2. Filter & Toolbar -->
      <div class="carbon-filter-card">
        <div class="filter-left">
          <label for="carbon-zone-filter" class="filter-label">Filter Kawasan:</label>
          <select id="carbon-zone-filter" class="carbon-select">
            <option value="all">Semua Kawasan (${n.total_zones||1} Kawasan)</option>
            ${(i||[]).map(e=>`<option value="${e.id}" ${Gf===e.id?`selected`:``}>${Yf(e.name)} (${e.area_ha} Ha)</option>`).join(``)}
          </select>
        </div>
        <div class="filter-right">
          <span class="filter-note">Terakhir diperbarui: <strong>${Yf(n.latest_survey_date||`01 Jan 2026`)}</strong></span>
        </div>
      </div>

      <!-- 3. Kartu Indikator Utama (5 Cards) -->
      <div class="carbon-kpi-grid">
        <!-- Card 1: Luas Kawasan -->
        <div class="carbon-kpi-card">
          <div class="kpi-header">
            <span class="kpi-icon">🗺️</span>
            <span class="kpi-title">Total Luas Kawasan</span>
          </div>
          <div class="kpi-value">${n.total_area_ha||0} <span class="kpi-unit">Hektare</span></div>
          <div class="kpi-sub">
            <span>Setara ${n.total_area_m2?.toLocaleString()||0} m²</span>
            <span class="kpi-source">• ${n.total_zones||1} Kawasan Aktif</span>
          </div>
        </div>

        <!-- Card 2: Jumlah Pohon Tercatat -->
        <div class="carbon-kpi-card">
          <div class="kpi-header">
            <span class="kpi-icon">🌳</span>
            <span class="kpi-title">Jumlah Pohon Tercatat</span>
          </div>
          <div class="kpi-value">${n.total_trees_planted?.toLocaleString()||0} <span class="kpi-unit">Batang</span></div>
          <div class="kpi-sub">
            <span>Bibit Awal Kelompok BATCH-2026-001</span>
            <span class="kpi-source">• Penanaman: ${Yf(n.planting_date||`2026-10-01`)}</span>
          </div>
        </div>

        <!-- Card 3: Pohon Hidup -->
        <div class="carbon-kpi-card highlight-green">
          <div class="kpi-header">
            <span class="kpi-icon">🌿</span>
            <span class="kpi-title">Pohon Hidup (Survival)</span>
          </div>
          <div class="kpi-value">${n.total_alive_trees?.toLocaleString()||0} <span class="kpi-unit">Batang</span></div>
          <div class="kpi-sub">
            <span class="pill-survival">${n.survival_rate||0}% Hidup</span>
            <span class="kpi-source">• ${n.total_dead_trees||0} Mati • ${n.total_missing_trees||0} Hilang</span>
          </div>
        </div>

        <!-- Card 4: Estimasi Stok Karbon -->
        <div class="carbon-kpi-card highlight-cyan">
          <div class="kpi-header">
            <span class="kpi-icon">💨</span>
            <span class="kpi-title">Estimasi Stok Karbon</span>
          </div>
          <div class="kpi-value">${n.carbon_stock_ton_c||0} <span class="kpi-unit">Ton C</span></div>
          <div class="kpi-sub">
            <span class="co2e-tag">~${n.carbon_stock_co2e_ton||0} Ton CO₂e</span>
            <span class="kpi-source">• Estimasi Awal Tegakan Muda</span>
          </div>
        </div>

        <!-- Card 5: Perubahan Stok Karbon (Delta C) -->
        <div class="carbon-kpi-card highlight-amber">
          <div class="kpi-header">
            <span class="kpi-icon">📈</span>
            <span class="kpi-title">Perubahan Stok Karbon (ΔC)</span>
          </div>
          <div class="kpi-value text-amber">Belum Tersedia</div>
          <div class="kpi-sub">
            <span>Menunggu Pengukuran Periode ke-2</span>
            <span class="kpi-source">• Min. 2 Periode untuk ΔC</span>
          </div>
        </div>
      </div>

      <!-- 4. Grid Grafik Interaktif (4 Charts) -->
      <div class="carbon-charts-grid">
        <!-- Grafik 1: Perkembangan Penanaman -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">🌱</span>
              <div>
                <h3 class="chart-title">Grafik 1 — Perkembangan Penanaman Pohon</h3>
                <p class="chart-desc">Jumlah bibit pohon kayu dan buah hutan yang ditanam per batch kegiatan</p>
              </div>
            </div>
          </div>
          <div class="chart-body">
            <div class="custom-bar-chart">
              ${(r.planting_progress||[]).map(e=>`
                <div class="bar-item-wrap">
                  <div class="bar-info-row">
                    <span class="bar-label"><strong>${Yf(e.batch_code)}</strong> (${Yf(e.period_label||e.activity_date)})</span>
                    <span class="bar-val">${e.trees_planted?.toLocaleString()} batang</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill green-fill" style="width: 100%;"></div>
                  </div>
                  <div class="bar-foot">
                    <span>Lokasi: ${Yf(e.zone_name)}</span>
                    <span class="pill-verified">Tercatat Lapangan</span>
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>

        <!-- Grafik 2: Kondisi & Status Pohon -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">📊</span>
              <div>
                <h3 class="chart-title">Grafik 2 — Kondisi & Status Pohon Lapangan</h3>
                <p class="chart-desc">Sensus pohon hidup, mati, hilang, dan belum diperiksa</p>
              </div>
            </div>
          </div>
          <div class="chart-body">
            <!-- Segmented Progress Bar -->
            <div class="condition-stacked-bar">
              <div class="stack-seg seg-alive" style="width: ${n.survival_rate||88}%;" title="Hidup: ${n.total_alive_trees} batang (${n.survival_rate}%)"></div>
              <div class="stack-seg seg-dead" style="width: ${(n.total_dead_trees||0)/(n.total_trees_planted||1)*100}%;" title="Mati: ${n.total_dead_trees} batang"></div>
              <div class="stack-seg seg-missing" style="width: ${(n.total_missing_trees||0)/(n.total_trees_planted||1)*100}%;" title="Hilang: ${n.total_missing_trees} batang"></div>
            </div>

            <!-- Legend Grid -->
            <div class="condition-legend-grid">
              <div class="legend-item">
                <span class="legend-dot green"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Hidup</span>
                  <span class="legend-count"><strong>${n.total_alive_trees}</strong> batang (${n.survival_rate}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot red"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Mati</span>
                  <span class="legend-count"><strong>${n.total_dead_trees}</strong> batang (${((n.total_dead_trees||0)/(n.total_trees_planted||1)*100).toFixed(1)}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot orange"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Hilang / Tidak Ditemukan</span>
                  <span class="legend-count"><strong>${n.total_missing_trees}</strong> batang (${((n.total_missing_trees||0)/(n.total_trees_planted||1)*100).toFixed(1)}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot gray"></span>
                <div class="legend-text">
                  <span class="legend-name">Belum Diperiksa</span>
                  <span class="legend-count"><strong>${n.total_uninspected_trees||0}</strong> batang (0%)</span>
                </div>
              </div>
            </div>

            <div class="condition-notice">
              ℹ️ <strong>Prinsip Kejujuran Data:</strong> Pohon yang belum diperiksa atau hilang tidak pernah diasumsikan sebagai pohon hidup.
            </div>
          </div>
        </div>

        <!-- Grafik 3: Perkembangan Stok Karbon (ΔC) -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">📉</span>
              <div>
                <h3 class="chart-title">Grafik 3 — Perkembangan Stok Karbon (ΔC)</h3>
                <p class="chart-desc">Perubahan simpanan biomassa karbon multi-periode dalam satuan Ton C & CO₂e</p>
              </div>
            </div>
          </div>
          <div class="chart-body">
            <!-- Informative Empty State -->
            <div class="carbon-empty-trend-box">
              <div class="empty-trend-icon">⏳</div>
              <h4 class="empty-trend-title">Grafik Tren Memerlukan Pengukuran Berkala</h4>
              <p class="empty-trend-desc">
                Saat ini sistem baru mencatat <strong>1 periode survei lapangan baseline</strong> (Survei: ${Yf(n.latest_survey_date||`01 Jan 2026`)}).
              </p>
              <div class="empty-trend-steps">
                <div class="trend-step completed">
                  <span class="step-num">✓</span>
                  <span><strong>Periode 1 (Baseline):</strong> Sensus Awal (${n.carbon_stock_ton_c} Ton C / ${n.carbon_stock_co2e_ton} Ton CO₂e)</span>
                </div>
                <div class="trend-step waiting">
                  <span class="step-num">2</span>
                  <span><strong>Periode 2 (Survei Lanjutan):</strong> Menunggu jadwal pengukuran diameter & tinggi berkala</span>
                </div>
              </div>
              <p class="empty-trend-footnote">
                Sesuai metodologi akuntansi karbon ilmiah, garis tren perubahan stok (ΔC) tidak boleh dibuat-buat sebelum ada minimal dua pengukuran faktual di lapangan.
              </p>
            </div>
          </div>
        </div>

        <!-- Grafik 4: Komposisi Jenis Pohon & Kontribusi Karbon -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">🌲</span>
              <div>
                <h3 class="chart-title">Grafik 4 — Komposisi Jenis Pohon & Estimasi Serapan</h3>
                <p class="chart-desc">Rincian populasi jenis pohon serta estimasi simpanan CO₂e per spesies</p>
              </div>
            </div>
            <div class="species-search-box">
              <input
                type="text"
                id="carbon-species-search"
                class="species-search-input"
                placeholder="Cari jenis pohon..."
                value="${Yf(Kf)}"
              />
            </div>
          </div>
          <div class="chart-body">
            <div class="species-horizontal-bars">
              ${o.length>0?o.map(e=>{let t=Math.min(100,Math.round(e.planted_count/250*100));return`
                    <div class="species-bar-row">
                      <div class="species-meta-row">
                        <span class="species-title">
                          <strong>${Yf(e.name)}</strong>
                          <em class="species-latin">(${Yf(e.scientific_name)})</em>
                        </span>
                        <div class="species-vals">
                          <span class="species-count">${e.planted_count} ditanam • ${e.estimated_alive} hidup</span>
                          <span class="species-co2e-badge">${e.co2e_ton} Ton CO₂e</span>
                        </div>
                      </div>
                      <div class="species-bar-track">
                        <div class="species-bar-fill" style="width: ${t}%;"></div>
                      </div>
                      <div class="species-sub-info">
                        <span>Berat Jenis Kayu (ρ): ${e.wood_density} g/cm³</span>
                        <span>Stok Karbon: ${e.carbon_stock_kg} kg C</span>
                      </div>
                    </div>
                  `}).join(``):`<div class="empty-search-alert">Tidak ada jenis pohon yang cocok dengan kata kunci "${Yf(Kf)}".</div>`}
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Skema Visual Edukatif: Bagaimana Restorasi Menyimpan Karbon? -->
      <div class="carbon-education-section">
        <div class="section-badge-center">
          <span class="carbon-badge-pill">💡 Pemahaman Publik</span>
        </div>
        <h2 class="edu-main-title">Bagaimana Restorasi Membantu Menyimpan Karbon?</h2>
        <p class="edu-main-desc">
          Pohon menyerap CO₂ dari atmosfer selama pertumbuhannya dan menyimpannya dalam bentuk kayu, daun, dan akar. Melalui pengukuran diameter batang, tinggi, dan kelangsungan hidup secara berkala, kita dapat memperkirakan perubahan karbon yang tersimpan dalam vegetasi.
        </p>

        <!-- 6 Langkah Visual Flow -->
        <div class="edu-flow-grid">
          <div class="edu-flow-card">
            <div class="flow-num">1</div>
            <div class="flow-icon">🗺️</div>
            <h4 class="flow-title">Kawasan & Kondisi Awal</h4>
            <p class="flow-desc">Mengidentifikasi batas lahan terdegradasi serta baseline vegetasi sebelum kegiatan restorasi dimulai.</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">2</div>
            <div class="flow-icon">🌱</div>
            <h4 class="flow-title">Penanaman & Pemulihan</h4>
            <p class="flow-desc">Menanam spesies pohon kayu keras endemik lokal dan pohon buah hutan pakan satwa secara terencana.</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">3</div>
            <div class="flow-icon">📏</div>
            <h4 class="flow-title">Pengukuran Lapangan</h4>
            <p class="flow-desc">Memantau sensus pohon hidup, diameter batang (DBH), tinggi pohon, dan kondisi kesehatan vegetasi.</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">4</div>
            <div class="flow-icon">🧮</div>
            <h4 class="flow-title">Perhitungan Biomassa</h4>
            <p class="flow-desc">Menggunakan data lapangan dan persamaan allometrik ilmiah (AGB, BGB, dan fraksi karbon 47%).</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">5</div>
            <div class="flow-icon">🔄</div>
            <h4 class="flow-title">Pemantauan Perubahan</h4>
            <p class="flow-desc">Membandingkan hasil pengukuran multi-periode untuk menghitung laju perubahan stok karbon (ΔC).</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">6</div>
            <div class="flow-icon">📋</div>
            <h4 class="flow-title">Evaluasi & Verifikasi</h4>
            <p class="flow-desc">Menilai kualitas data, risiko non-permanensi, baseline, dan persyaratan standar metodologi karbon.</p>
          </div>
        </div>

        <div class="edu-alert-box">
          ⚠️ <strong>Catatan Penting:</strong> Hasil estimasi biomassa vegetasi ini <strong>bukan otomatis kredit karbon yang dapat diperdagangkan</strong>. Penerbitan kredit karbon memerlukan proses audit independen serta kepatuhan penuh terhadap standar sertifikasi internasional.
        </div>
      </div>

      <!-- 6. Diagram Khusus: Estimasi Stok Karbon vs. Kredit Karbon -->
      <div class="carbon-credit-comparison-section">
        <div class="section-badge-center">
          <span class="carbon-badge-pill">⚖️ Transparansi Konseptual</span>
        </div>
        <h2 class="edu-main-title">Perbedaan Mendasar: Estimasi Stok Karbon vs. Kredit Karbon</h2>
        <p class="edu-main-desc">
          Memahami alur dari pohon yang ditanam hingga potensi penerbitan unit kredit karbon resmi yang dapat diakui pasar.
        </p>

        <!-- Step-by-Step Methodology Flowchart -->
        <div class="comparison-steps-container">
          <div class="comp-step current-stage">
            <div class="comp-badge">Tahap 1 — Selesai</div>
            <div class="comp-icon">🌳</div>
            <h4 class="comp-title">Data Pohon Aktual</h4>
            <p class="comp-desc">Inventarisasi faktual pohon di lapangan (spesies, jumlah hidup, diameter, tinggi).</p>
            <div class="comp-tag green-tag">✓ Data Tersedia</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step current-stage">
            <div class="comp-badge">Tahap 2 — Saat Ini</div>
            <div class="comp-icon">🧮</div>
            <h4 class="comp-title">Estimasi Stok Karbon</h4>
            <p class="comp-desc">Perhitungan biomassa pohon (AGB + BGB) menggunakan allometrik ilmiah (Ton C / Ton CO₂e).</p>
            <div class="comp-tag yellow-tag">Estimasi Awal (~0,88 Ton CO₂e)</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 3 — Lanjutan</div>
            <div class="comp-icon">📊</div>
            <h4 class="comp-title">Perubahan Stok (ΔC)</h4>
            <p class="comp-desc">Membandingkan stok karbon pada dua periode pengukuran ($T_2 - T_1$) untuk melihat pertumbuhan riil.</p>
            <div class="comp-tag amber-tag">Menunggu Periode 2</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 4 — Metodologi</div>
            <div class="comp-icon">📑</div>
            <h4 class="comp-title">Penghitungan Bersih (Net)</h4>
            <p class="comp-desc">Mengurangkan emisi baseline, emisi pelaksanaan proyek, dan kebocoran aktivitas (leakage).</p>
            <div class="comp-tag gray-tag">Syarat Metodologi ARR</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 5 — Sertifikasi</div>
            <div class="comp-icon">🛡️</div>
            <h4 class="comp-title">Validasi & Verifikasi</h4>
            <p class="comp-desc">Audit independen oleh lembaga audit pihak ketiga (VVB) dan penyisihan buffer risiko (10-20%).</p>
            <div class="comp-tag gray-tag">Audit Independen</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 6 — Penerbitan</div>
            <div class="comp-icon">📜</div>
            <h4 class="comp-title">Kredit Karbon (VCUs)</h4>
            <p class="comp-desc">Penerbitan unit kredit karbon resmi yang dapat diperdagangkan atau diklaim sebagai carbon offset.</p>
            <div class="comp-tag gray-tag">Belum Diterbitkan</div>
          </div>
        </div>

        <!-- 4 Key Clarification Boxes -->
        <div class="comp-details-grid">
          <div class="detail-box">
            <h5>1. Stok Karbon (Carbon Stock)</h5>
            <p>Total jumlah karbon yang tersimpan dalam jaringan biomassa tanaman pada satu titik waktu tertentu (satuan: Ton C atau Ton CO₂e).</p>
          </div>
          <div class="detail-box">
            <h5>2. Perubahan Stok Karbon (ΔC)</h5>
            <p>Selisih akumulasi karbon antara dua periode waktu pengukuran. Hanya bisa dihitung jika ada minimal dua sensus lapangan yang sah.</p>
          </div>
          <div class="detail-box">
            <h5>3. Penyerapan Bersih (Net Removals)</h5>
            <p>Pengurangan karbon riil setelah memperhitungkan skenario tanpa proyek (baseline), emisi operasional, dan emisi kebocoran (leakage).</p>
          </div>
          <div class="detail-box">
            <h5>4. Kredit Karbon Terverifikasi</h5>
            <p>Unit sertifikat yang diterbitkan oleh badan standar karbon resmi (seperti Verra VCS) setelah melalui audit independen menyeluruh.</p>
          </div>
        </div>
      </div>

      <!-- 7. Tabel Ringkas Kawasan untuk Pengunjung -->
      <div class="carbon-table-section">
        <div class="table-section-header">
          <div>
            <h3 class="table-sec-title">Ringkasan Kawasan Restorasi & Data Karbon</h3>
            <p class="table-sec-desc">Daftar kawasan penanaman pohon aktif beserta kelengkapan data pemantauan</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="carbon-zones-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Kawasan</th>
                <th>Luas Lahan</th>
                <th>Pohon Tercatat</th>
                <th>Survei Terakhir</th>
                <th>Kelangsungan Hidup</th>
                <th>Status Data</th>
                <th>Estimasi Karbon</th>
                <th>Perubahan Stok (ΔC)</th>
              </tr>
            </thead>
            <tbody>
              ${i.length>0?i.map((e,t)=>`
                  <tr>
                    <td><strong>${t+1}</strong></td>
                    <td>
                      <strong>${Yf(e.name)}</strong><br/>
                      <span class="text-xs text-muted">Kode: ${Yf(e.zone_code)}</span>
                    </td>
                    <td><strong>${e.area_ha}</strong> Ha</td>
                    <td><strong>${e.planted_trees?.toLocaleString()}</strong> bibit</td>
                    <td>${Yf(e.latest_survey_date)}</td>
                    <td><span class="pill-verified">${e.survival_rate}% Hidup</span></td>
                    <td><span class="pill-completeness">${Yf(e.data_completeness)}</span></td>
                    <td>
                      <strong>~${e.co2e_ton}</strong> Ton CO₂e<br/>
                      <span class="text-xs text-muted">(${e.carbon_stock_ton_c} Ton C)</span>
                    </td>
                    <td><span class="pill-waiting">${Yf(e.delta_c)}</span></td>
                  </tr>
                `).join(``):`<tr><td colspan="9" class="text-center py-4">Belum ada kawasan yang terdaftar.</td></tr>`}
            </tbody>
          </table>
        </div>
        <div class="table-scroll-hint">
          <span>👉</span> Geser tabel ke samping untuk melihat seluruh kolom data
        </div>
      </div>

      <!-- 8. Transparansi Metodologi, Asumsi, & Sumber Data -->
      <div class="carbon-methodology-card">
        <h3 class="method-title">Metode, Asumsi, & Batasan Ilmiah</h3>
        <div class="method-grid">
          <div class="method-col">
            <h4>📌 Sumber Data & Pengukuran Lapangan</h4>
            <ul>
              <li><strong>Tanggal Pembaruan:</strong> ${Yf(n.latest_survey_date||`01 Januari 2026`)}.</li>
              <li><strong>Cakupan Kawasan:</strong> ${Yf(i[0]?.name||`Kawasan Lamteuba`)} (${n.total_area_ha} Ha).</li>
              <li><strong>Metode Lapangan:</strong> Sensus 100% pohon tegakan awal pada plot restorasi.</li>
              <li><strong>Rata-rata Tinggi Tanaman:</strong> ${n.average_height_cm} cm (~1,35 meter).</li>
              <li><strong>Rata-rata Diameter Batang (DBH):</strong> ${n.average_diameter_cm} cm.</li>
            </ul>
          </div>
          <div class="method-col">
            <h4>📐 Persamaan & Parameter Ilmiah</h4>
            <ul>
              <li><strong>Persamaan Allometrik:</strong> Chave et al. (2014) untuk biomassa pohon muda tropis basah: $AGB = 0.0673 \\times (\\rho \\times D^2 \\times H)^{0.976}$.</li>
              <li><strong>Fraksi Karbon:</strong> $CF = 0.47$ (47% dari biomassa kering adalah karbon, IPCC default).</li>
              <li><strong>Rasio Akar-Pucuk (BGB):</strong> $R = 0.24$ (24% dari AGB, IPCC default).</li>
              <li><strong>Faktor Konversi CO₂e:</strong> Rasio molekul $44/12 \\approx 3.667$.</li>
              <li><strong>Berat Jenis Kayu (ρ):</strong> Rujukan database ICRAF Wood Density (0,40 – 0,68 g/cm³).</li>
            </ul>
          </div>
        </div>

        <div class="method-disclaimer-box">
          <h5>⚠️ Batasan & Pernyataan Keterbukaan Publik:</h5>
          <p>
            1. Perhitungan ini adalah <strong>estimasi awal biomassa tegakan pohon muda</strong> dan belum mencakup cadangan karbon organik tanah (<em>Soil Organic Carbon</em>) maupun serasah daun.<br/>
            2. Perubahan stok karbon (ΔC) secara metodologis <strong>wajib menunggu minimal dua periode pengukuran</strong> untuk membuktikan laju penyerapan tahunan yang sesungguhnya.<br/>
            3. Proyek ini <strong>belum menyatakan telah memenuhi atau menerbitkan kredit karbon Verra VM0047</strong>. Metodologi Verra dijadikan acuan prinsip kehati-hatian dalam pencatatan data restorasi menuju kelayakan di masa depan.
          </p>
        </div>
      </div>
    </div>
  `;let s=document.getElementById(`carbon-zone-filter`);s&&s.addEventListener(`change`,async t=>{Gf=t.target.value;let n=Gf===`all`?`/api/carbon/public-summary`:`/api/carbon/public-summary?zone_id=${Gf}`;try{let t=await(await fetch(n)).json();t.success&&(Wf=t,Jf(e,t))}catch(e){console.error(`Filter error:`,e)}});let c=document.getElementById(`carbon-species-search`);c&&c.addEventListener(`input`,t=>{Kf=t.target.value,Jf(e,Wf);let n=document.getElementById(`carbon-species-search`);n&&(n.focus(),n.setSelectionRange(Kf.length,Kf.length))})}function Yf(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Xf=null,Zf=null,Qf=null,$f=null,ep=new Map,tp=[];document.addEventListener(`DOMContentLoaded`,async()=>{try{tp=await Z.getHotspots()}catch(e){console.warn(`Failed loading hotspots:`,e)}np(),rp(),cp(),Nd(`home-zones-grid`,e=>{window.location.hash=`tour`,dp(e)});try{Xf=tc()}catch(e){console.warn(`Marzipano viewer initialization:`,e.message)}gc(dp),mc(h,null),_c({onZoomIn:()=>rc(Qf,-.15),onZoomOut:()=>rc(Qf,.15),onResetView:()=>ic(Qf,$f||{}),onFullscreen:vc,onPrevScene:lp,onNextScene:up});let e=document.getElementById(`tour-compass`);e&&e.addEventListener(`click`,()=>{ic(Qf,$f||{})}),wc(`tour-minimap`,e=>{dp(e)});let t=document.getElementById(`btn-minimap-minimize`),n=document.getElementById(`tour-minimap-card`);t&&n&&t.addEventListener(`click`,()=>{let e=n.classList.toggle(`minimized`);t.textContent=e?`Buka Radar`:`Tutup`,e||setTimeout(()=>Ec(),150)});let r=document.getElementById(`btn-exit-to-list`);r&&r.addEventListener(`click`,()=>{window.location.hash=`beranda`}),Rc(`streetview-guide-container`);try{await td({onPublicTourUpdate:e=>{if(tp=e,Zf){let e=ep.get(Zf),t=h.find(e=>e.id===Zf);e&&t&&lc(e.scene,t,h,dp,tp)}},onExitAdminToTour:()=>{window.location.hash=`tour`}})}catch(e){console.warn(`Admin panel initialization error:`,e)}window.addEventListener(`preview-scene`,e=>{e.detail&&e.detail.sceneId&&(window.location.hash=`tour`,dp(e.detail.sceneId))}),sp(),window.addEventListener(`hashchange`,sp),h.length>0&&await dp(h[0].id)});async function np(){let e=document.getElementById(`nav-brand-title`),t=document.getElementById(`hero-title`),n=document.getElementById(`hero-desc`),r=document.getElementById(`info-general-desc`);e&&(e.textContent=g.namaAplikasi||`Eco Land`);let i=e=>{document.querySelectorAll(`.brand-subtitle`).forEach(t=>{t.textContent=e})};i(g.organisasi||`IKHW - Inisiatif Konservasi Hutan Wakaf`),t&&(t.innerHTML=`Eco Land<br /><span style="display: block; font-size: 24px; font-weight: 600; opacity: 0.92; margin-top: 6px;">Kawasan Penanaman Pohon</span>`),n&&(n.textContent=g.deskripsi),r&&(r.textContent=g.deskripsi),Md();try{let e=await fetch(`/api/settings/public`);if(e.ok){let t=(await e.json()).flat||{};t.program_description&&(n&&(n.textContent=t.program_description),r&&(r.textContent=t.program_description)),t.org_name&&i(t.org_name),t.app_logo&&document.querySelectorAll(`.brand-logo-icon`).forEach(e=>{e.innerHTML=`<img src="${t.app_logo}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`})}}catch(e){console.debug(`Public settings fetch fallback to config defaults:`,e)}}function rp(){let e=document.querySelectorAll(`.nav-tab-btn`),t=document.getElementById(`brand-btn`),n=document.getElementById(`btn-mobile-menu`),r=document.getElementById(`nav-tabs`),i=document.getElementById(`mobile-nav-backdrop`),a=document.getElementById(`nav-btn-admin-desktop`),o=document.getElementById(`footer-btn-admin`),s=document.querySelectorAll(`.nav-dropdown`);function c(){s.forEach(e=>{e.classList.remove(`is-open`);let t=e.querySelector(`.nav-dropdown-trigger`);t&&t.setAttribute(`aria-expanded`,`false`)})}function l(){if(c(),r&&r.classList.remove(`mobile-open`),i&&i.classList.remove(`show`),n){n.setAttribute(`aria-expanded`,`false`);let e=n.querySelector(`.hamburger-icon-open`),t=n.querySelector(`.hamburger-icon-close`);e&&e.classList.remove(`hidden`),t&&t.classList.add(`hidden`)}}function u(){if(!r)return;let e=r.classList.toggle(`mobile-open`);if(i&&i.classList.toggle(`show`,e),e||c(),n){n.setAttribute(`aria-expanded`,e?`true`:`false`);let t=n.querySelector(`.hamburger-icon-open`),r=n.querySelector(`.hamburger-icon-close`);t&&t.classList.toggle(`hidden`,e),r&&r.classList.toggle(`hidden`,!e)}}s.forEach(e=>{let t=e.querySelector(`.nav-dropdown-trigger`);t&&t.addEventListener(`click`,n=>{n.preventDefault(),n.stopPropagation();let r=e.classList.contains(`is-open`);s.forEach(t=>{if(t!==e){t.classList.remove(`is-open`);let e=t.querySelector(`.nav-dropdown-trigger`);e&&e.setAttribute(`aria-expanded`,`false`)}}),r?(e.classList.remove(`is-open`),t.setAttribute(`aria-expanded`,`false`)):(e.classList.add(`is-open`),t.setAttribute(`aria-expanded`,`true`))}),e.querySelectorAll(`.nav-dropdown-item`).forEach(e=>{e.addEventListener(`click`,()=>{c(),l()})})}),e.forEach(e=>{e.classList.contains(`nav-dropdown-trigger`)||e.classList.contains(`btn-nav-login`)||e.addEventListener(`click`,t=>{let n=e.getAttribute(`data-tab`);if(n===`login`)window.location.href=`/login`;else{if(n===`admin`){if(!ip()){window.location.href=`/login`;return}t.preventDefault(),ud()}else window.location.hash=n;c(),l()}})}),document.querySelectorAll(`.btn-nav-login`).forEach(e=>{e.addEventListener(`click`,t=>{let n=ip(),r=e.getAttribute(`href`)||``;!n||r.includes(`/login`)||e.getAttribute(`data-tab`)===`login`?(l(),window.location.href=`/login`):(t.preventDefault(),l(),ud())})}),a&&a.addEventListener(`click`,e=>{let t=ip(),n=a.getAttribute(`href`)||``;!t||n.includes(`/login`)||a.getAttribute(`data-tab`)===`login`?window.location.href=`/login`:(e.preventDefault(),ud())}),o&&o.addEventListener(`click`,e=>{ip()?(e.preventDefault(),ud()):window.location.href=`/login`}),t&&t.addEventListener(`click`,()=>{window.location.hash=`beranda`,l()}),n&&n.addEventListener(`click`,e=>{e.stopPropagation(),u()}),i&&i.addEventListener(`click`,l),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(c(),l())}),document.addEventListener(`click`,e=>{e.target.closest(`.nav-dropdown`)||c(),r&&r.classList.contains(`mobile-open`)&&!r.contains(e.target)&&!n.contains(e.target)&&l()}),document.querySelectorAll(`.footer-nav-link`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.getAttribute(`data-tab`);n&&(t.preventDefault(),window.location.hash=n,window.scrollTo({top:0,behavior:`smooth`}))})});let d=document.getElementById(`btn-hero-start-tour`),f=document.getElementById(`btn-hero-view-points`);d&&d.addEventListener(`click`,()=>window.location.hash=`tour`),f&&f.addEventListener(`click`,()=>window.location.hash=`info`),ap(),Wc(()=>{ap()})}function ip(){if(Z.isAuthenticated())return!0;if(typeof window<`u`&&typeof window.ECO_SERVER_AUTH==`boolean`)return window.ECO_SERVER_AUTH;if(typeof document<`u`){let e=document.querySelector(`meta[name="eco-server-auth"]`);if(e)return e.getAttribute(`content`)===`true`}return Yc()}function ap(){let e=ip(),t=document.getElementById(`nav-btn-admin-desktop`),n=document.querySelectorAll(`.btn-nav-login`),r=e?`/#admin/dashboard`:`/login`;t&&(t.setAttribute(`href`,r),t.setAttribute(`data-tab`,e?`admin`:`login`),e?(t.setAttribute(`title`,`Dashboard Eco Land`),t.classList.add(`is-authenticated`),t.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span class="header-login-text">Dashboard</span>
      `):(t.setAttribute(`title`,`Login Eco Land`),t.classList.remove(`is-authenticated`),t.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span class="header-login-text">Login</span>
      `)),n.forEach(t=>{t.setAttribute(`href`,r),t.setAttribute(`data-tab`,e?`admin`:`login`);let n=t.querySelector(`.nav-icon`),i=t.querySelector(`.nav-text`)||t.querySelector(`span:last-child`);e?(t.setAttribute(`title`,`Dashboard Eco Land`),n&&(n.textContent=`📊`),i&&(i.textContent=`Dashboard`)):(t.setAttribute(`title`,`Login Eco Land`),n&&(n.textContent=`🔐`),i&&(i.textContent=`Login`))})}function op(e){ap();let t=document.getElementById(`main-navbar`);t&&(t.style.display=e===`admin`?`none`:``);let n=document.getElementById(`views-container`);n&&(n.style.display=e===`admin`?`none`:``);let r=document.getElementById(`public-global-footer`);r&&(r.style.display=[`beranda`,`info`,`galeri`,`katalog`,`tree-qr`,`karbon`].includes(e)?`block`:`none`);let i=[`galeri`,`katalog`,`tree-qr`];document.querySelectorAll(`.nav-tab-btn`).forEach(t=>{let n=t.getAttribute(`data-tab`);n===`informasi`?t.classList.toggle(`active`,i.includes(e)):t.classList.toggle(`active`,n===e)}),document.querySelectorAll(`.nav-dropdown-item`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-tab`)===e)}),document.querySelectorAll(`.view-pane`).forEach(t=>{t.classList.toggle(`active`,t.id===`view-${e}`)}),e!==`tour`&&window.scrollTo(0,0),e===`beranda`?(Md(),Oc(`home-ref-map`,e=>{window.location.hash=`tour`,dp(e)}),jc()):e===`info`?(Oc(`gis-map`,e=>{window.location.hash=`tour`,dp(e)}),jc()):e===`galeri`?Gd(`public-gallery-container`):e===`katalog`?bd(`public-tree-catalog-container`,e=>{window.location.hash=`tour`,dp(e)}):e===`tree-qr`?If(`public-tree-qr-container`):e===`karbon`?qf(`public-carbon-container`):e===`tour`?(window.dispatchEvent(new Event(`resize`)),setTimeout(()=>Ec(),200)):e===`admin`&&window.dispatchEvent(new Event(`resize`))}function sp(){let e=window.location.hash||`#beranda`,t=e.replace(/^#\/?/,``).split(`?`)[0]||`beranda`;t===`monitoring-karbon`&&(t=`karbon`),t===`titik`?window.location.replace(`#beranda`):t===`admin`||t.startsWith(`admin/`)?ip()?(op(`admin`),ld(e)):(sessionStorage.setItem(`admin_redirect_hash`,e),ud()):[`beranda`,`tour`,`info`,`galeri`,`katalog`,`tree-qr`,`karbon`,`admin`].includes(t)?op(t):op(`beranda`)}function cp(){let e=document.getElementById(`home-points-grid`);e&&(e.innerHTML=h.map(e=>{let t=e.status===`tersedia`;return`
        <div class="point-card">
          <div>
            <div class="point-card-top">
              <span class="point-sequence-badge">Titik ${e.sequence}</span>
              <span class="point-status-tag ${t?`ready`:`pending`}">
                ${t?`✓ Foto Siap`:`⏳ Menunggu Foto GSV`}
              </span>
            </div>
            <h3 class="point-title">${e.name}</h3>
            <p class="point-desc">${e.description}</p>
            <div class="point-meta">
              📍 Koordinat Acuan: ${e.latitude.toFixed(6)}° N, ${e.longitude.toFixed(6)}° E
            </div>
          </div>
          <button class="btn-card-explore" data-scene-id="${e.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M10 8l6 4-6 4V8z"/>
            </svg>
            Buka Panorama 360°
          </button>
        </div>
      `}).join(``),e.querySelectorAll(`.btn-card-explore`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);window.location.hash=`tour`,dp(t)})}))}function lp(){Zf&&dp(h[(h.findIndex(e=>e.id===Zf)-1+h.length)%h.length].id)}function up(){Zf&&dp(h[(h.findIndex(e=>e.id===Zf)+1)%h.length].id)}async function dp(e){if(!e||e===Zf)return;let t=h.find(t=>t.id===e);if(!t)return;Fc(t),hc(e),mc(h,e),Tc(e);let n=document.getElementById(`tour-loading`);if(n&&n.classList.remove(`hidden`),!await Mc(t.panorama))n&&n.classList.add(`hidden`),Pc(),Nc(t),Zf=e,Qf=null,$f=t.initialView;else{Pc();try{let r=ep.get(e);if(!r&&Xf?(r=nc(t),lc(r.scene,t,h,dp,tp),ep.set(e,r)):r&&lc(r.scene,t,h,dp,tp),r){r.scene.switchTo({transitionDuration:500}),Zf=e,Qf=r.view,$f=t.initialView;let n=document.getElementById(`compass-needle`);n&&ac(r.view,e=>{n.style.transform=`rotate(${e}deg)`})}n&&n.classList.add(`hidden`)}catch(e){console.error(`Error switching scene:`,e),n&&n.classList.add(`hidden`),Nc(t)}}}window.addEventListener(`zones-updated`,()=>{Md()});