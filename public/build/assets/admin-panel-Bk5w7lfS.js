import{a as e,i as t,n,r,t as i}from"./rolldown-runtime-B0Z9INg1.js";var a=class{constructor(){this.container=null,this.initContainer(),this.initFlashListener()}initContainer(){if(typeof document>`u`)return;let e=document.getElementById(`ecozone-toast-container`);e||(e=document.createElement(`div`),e.id=`ecozone-toast-container`,e.className=`ecozone-toast-container`,e.setAttribute(`role`,`status`),e.setAttribute(`aria-live`,`polite`),document.body.appendChild(e)),this.container=e}initFlashListener(){if(typeof document>`u`)return;let e=()=>{let e=document.getElementById(`laravel-flash-success`);e&&e.dataset.message&&(this.saved(e.dataset.message),e.remove());let t=document.getElementById(`laravel-flash-error`);t&&t.dataset.message&&(this.error(`✕ Gagal menyimpan`,t.dataset.message),t.remove())};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e()}show({type:e=`success`,title:t=``,message:n=``,duration:r=3500,icon:i=null}){(!this.container||!document.body.contains(this.container))&&this.initContainer();let a=`${e}:${t}:${n}`;if(this._lastKey===a&&Date.now()-(this._lastTime||0)<600)return{dismiss:()=>{}};this._lastKey=a,this._lastTime=Date.now();let s=document.createElement(`div`);s.className=`ecotoast-item ecotoast-${e}`,s.setAttribute(`role`,`alert`);let c=``;c=i||(e===`success`?`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>`:e===`error`?`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>`:e===`warning`?`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`:`<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
      </svg>`),s.innerHTML=`
      <div class="ecotoast-icon-box">${c}</div>
      <div class="ecotoast-body">
        <div class="ecotoast-title">${o(t)}</div>
        ${n?`<div class="ecotoast-desc">${o(n)}</div>`:``}
      </div>
      <button type="button" class="ecotoast-close" title="Tutup notifikasi" aria-label="Tutup">✕</button>
      <div class="ecotoast-bar" style="animation-duration: ${r}ms;"></div>
    `;let l=s.querySelector(`.ecotoast-close`),u=null,d=()=>{u&&clearTimeout(u),s.classList.add(`ecotoast-leave`),setTimeout(()=>{s.remove()},250)};return l.addEventListener(`click`,d),this.container.appendChild(s),r>0&&(u=setTimeout(d,r)),{dismiss:d}}saved(e=`Perubahan data telah tersimpan.`){return this.show({type:`success`,title:`✓ Berhasil disimpan`,message:e})}created(e=`Data baru berhasil disimpan.`){return this.show({type:`success`,title:`✓ Berhasil ditambahkan`,message:e})}updated(e=`Perubahan data berhasil disimpan.`){return this.show({type:`success`,title:`✓ Berhasil diperbarui`,message:e})}deleted(e=`Data berhasil dihapus.`){return this.show({type:`success`,title:`✓ Berhasil dihapus`,message:e})}published(e=`Perubahan berhasil dipublikasikan.`){return this.show({type:`success`,title:`✓ Berhasil dipublikasikan`,message:e})}imported(e=`Data telah berhasil diimpor.`){return this.show({type:`success`,title:`✓ Data berhasil diimpor`,message:e})}uploaded(e=`File dan metadata berhasil disimpan.`){return this.show({type:`success`,title:`✓ File berhasil diunggah`,message:e})}success(e=`✓ Berhasil disimpan`,t=``){return this.show({type:`success`,title:e.startsWith(`✓`)?e:`✓ ${e}`,message:t})}error(e=`✕ Gagal menyimpan`,t=`Data belum berhasil disimpan. Periksa kembali isian dan coba lagi.`){return this.show({type:`error`,title:e.startsWith(`✕`)?e:`✕ ${e}`,message:t,duration:4500})}warning(e=`Peringatan`,t=``){return this.show({type:`warning`,title:e,message:t,duration:4e3})}info(e=`Informasi`,t=``){return this.show({type:`info`,title:e,message:t})}};function o(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var s=new a;typeof window<`u`&&(window.EcoToast=s,window.showToast=e=>typeof e==`string`?s.success(e):s.show(e));var c={scenes:[{id:`0-1-pano_20261004_100402_6`,name:`1. PANO_20261004_100402_6`,sequence:1,status:`tersedia`,description:`Panorama titik 1 kawasan penanaman pohon. Terdapat info hotspot Pohon Scooby Doo.`,thumbnail:`/tiles/0-1-pano_20261004_100402_6/preview.jpg`,preview:`/tiles/0-1-pano_20261004_100402_6/preview.jpg`,latitude:5.48135,longitude:95.58355,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:.7176204122520318,pitch:.1800948515498284,fov:1.3945993259187417},linkHotspots:[{yaw:.03014976230538835,pitch:.02643290165309864,rotation:6.283185307179586,target:`1-2-pano_20261004_100722_7`}],infoHotspots:[{yaw:1.2666246510961905,pitch:-.19098522139040597,title:`Pohon Scooby Doo`,text:`<br>`}]},{id:`1-2-pano_20261004_100722_7`,name:`2. PANO_20261004_100722_7`,sequence:2,status:`tersedia`,description:`Panorama titik 2 kawasan penanaman pohon. Terdapat info hotspot Pesawat Tempur.`,thumbnail:`/tiles/1-2-pano_20261004_100722_7/preview.jpg`,preview:`/tiles/1-2-pano_20261004_100722_7/preview.jpg`,latitude:5.48168,longitude:95.5838,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:1.5115493233731163,pitch:.1525186886522647,fov:1.3945993259187417},linkHotspots:[{yaw:-2.8706929059681148,pitch:-.0448967639209954,rotation:6.283185307179586,target:`0-1-pano_20261004_100402_6`},{yaw:.7395703586489386,pitch:.11872788990518046,rotation:0,target:`2-3-pano_20261004_095925_3`}],infoHotspots:[{yaw:.22364720623081347,pitch:.16888656856956885,title:`Pesawat Tempur`,text:`Text`}]},{id:`2-3-pano_20261004_095925_3`,name:`3. PANO_20261004_095925_3`,sequence:3,status:`tersedia`,description:`Panorama titik 3 kawasan penanaman pohon. Terdapat info hotspot Senso Supra Natural dan Pintu Welcome.`,thumbnail:`/tiles/2-3-pano_20261004_095925_3/preview.jpg`,preview:`/tiles/2-3-pano_20261004_095925_3/preview.jpg`,latitude:5.4818556,longitude:95.5840917,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:.37979756719106206,pitch:.04846658243499746,fov:1.3945993259187417},linkHotspots:[{yaw:.8704408551624532,pitch:-.19419646834669102,rotation:0,target:`3-4-pano_20261004_101937_11`},{yaw:1.6976031542983385,pitch:-.049091771145560514,rotation:0,target:`1-2-pano_20261004_100722_7`}],infoHotspots:[{yaw:-1.864613716834878,pitch:.5266181755816888,title:`Senso Supra Natural`,text:`<br>`},{yaw:2.7863856727428384,pitch:.34442522583293567,title:`Pintu Welcome`,text:`Text`}]},{id:`3-4-pano_20261004_101937_11`,name:`4. PANO_20261004_101937_11`,sequence:4,status:`tersedia`,description:`Panorama titik 4 kawasan penanaman pohon. Terdapat info hotspot Master Magic.`,thumbnail:`/tiles/3-4-pano_20261004_101937_11/preview.jpg`,preview:`/tiles/3-4-pano_20261004_101937_11/preview.jpg`,latitude:5.48215,longitude:95.58435,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:.6722519287210993,pitch:.18301033113915643,fov:1.3945993259187417},linkHotspots:[{yaw:-1.4177896409400272,pitch:.3646449202319886,rotation:0,target:`2-3-pano_20261004_095925_3`},{yaw:.42228075410022115,pitch:.8020360851690533,rotation:0,target:`4-32-pano_20261004_095509_0`}],infoHotspots:[{yaw:-1.3435897200169489,pitch:.21857024197986874,title:`Master Magic`,text:`Supra Natural&nbsp;`}]},{id:`4-32-pano_20261004_095509_0`,name:`3.2 PANO_20261004_095509_0`,sequence:5,status:`tersedia`,description:`Panorama titik 3.2 kawasan penanaman pohon. Menghubungkan titik 3, titik 4, dan titik 5.`,thumbnail:`/tiles/4-32-pano_20261004_095509_0/preview.jpg`,preview:`/tiles/4-32-pano_20261004_095509_0/preview.jpg`,latitude:5.4821,longitude:95.58358,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{pitch:0,yaw:0,fov:1.5707963267948966},linkHotspots:[{yaw:-2.893554457411156,pitch:-.6963642143154054,rotation:0,target:`3-4-pano_20261004_101937_11`},{yaw:-2.0826598198117896,pitch:-.04552845778872339,rotation:0,target:`2-3-pano_20261004_095925_3`},{yaw:-.6788695978901487,pitch:.15160639748459914,rotation:0,target:`5-5-pano_20261004_103130_17-2`}],infoHotspots:[]},{id:`5-5-pano_20261004_103130_17-2`,name:`5. PANO_20261004_103130_17 (2)`,sequence:6,status:`tersedia`,description:`Panorama titik 5 kawasan penanaman pohon. Terdapat info hotspot Pengusaha Madu Rimba.`,thumbnail:`/tiles/5-5-pano_20261004_103130_17-2/preview.jpg`,preview:`/tiles/5-5-pano_20261004_103130_17-2/preview.jpg`,latitude:5.48242,longitude:95.5842,levels:[{tileSize:256,size:256,fallbackOnly:!0},{tileSize:512,size:512},{tileSize:512,size:1024}],faceSize:896,initialViewParameters:{yaw:2.8857007275322193,pitch:-.238303625498979,fov:1.3945993259187417},linkHotspots:[{yaw:3.0154459565887812,pitch:-.46798372795382015,rotation:0,target:`3-4-pano_20261004_101937_11`},{yaw:2.155542466117045,pitch:-.16464652316926198,rotation:0,target:`0-1-pano_20261004_100402_6`}],infoHotspots:[{yaw:2.843260059526739,pitch:-.17250357376821412,title:`Pengusaha Madu Rimba`,text:`Madu Rimba`}]}],name:`IKHW`,settings:{mouseViewMode:`drag`,autorotateEnabled:!0,fullscreenButton:!1,viewControlButtons:!0}}.scenes.map(e=>({...e,initialView:e.initialViewParameters,panorama_path:`/tiles/${e.id}/preview.jpg`,panorama:`/tiles/${e.id}/preview.jpg`,connected_points:e.linkHotspots.map(e=>e.target)})),l=i(((e,t)=>{function n(){}n.prototype.addEventListener=function(e,t){var n=this.__events=this.__events||{},r=n[e]=n[e]||[];r.indexOf(t)<0&&r.push(t)},n.prototype.removeEventListener=function(e,t){var n=(this.__events=this.__events||{})[e];if(n){var r=n.indexOf(t);r>=0&&n.splice(r,1)}},n.prototype.emit=function(e,t){var n=(this.__events=this.__events||{})[e],r=Array.prototype.slice.call(arguments,1);if(n)for(var i=0;i<n.length;i++)n[i].apply(this,r)};function r(e){for(var t in n.prototype)n.prototype.hasOwnProperty(t)&&(e.prototype[t]=n.prototype[t])}t.exports=r})),u=i(((e,t)=>{function n(){return typeof performance<`u`&&performance.now?function(){return performance.now()}:function(){return Date.now()}}t.exports=n()})),d=i(((e,t)=>{var n=u();function r(e,t){this.fn=e,this.cb=t,this.cfn=null}function i(e){this._queue=[],this._delay=e&&e.delay||0,this._paused=e&&!!e.paused||!1,this._currentTask=null,this._lastFinished=null}i.prototype.length=function(){return this._queue.length},i.prototype.push=function(e,t){var n=new r(e,t),i=this._cancel.bind(this,n);return this._queue.push(n),this._next(),i},i.prototype.pause=function(){this._paused||=!0},i.prototype.resume=function(){this._paused&&(this._paused=!1,this._next())},i.prototype._start=function(e){if(this._currentTask)throw Error(`WorkQueue: called start while running task`);this._currentTask=e;var t=this._finish.bind(this,e);if(e.cfn=e.fn(t),typeof e.cfn!=`function`)throw Error(`WorkQueue: function is not cancellable`)},i.prototype._finish=function(e){var t=Array.prototype.slice.call(arguments,1);if(this._currentTask!==e)throw Error(`WorkQueue: called finish on wrong task`);e.cb.apply(null,t),this._currentTask=null,this._lastFinished=n(),this._next()},i.prototype._cancel=function(e){var t=Array.prototype.slice.call(arguments,1);if(this._currentTask===e)e.cfn.apply(null,t);else{var n=this._queue.indexOf(e);n>=0&&(this._queue.splice(n,1),e.cb.apply(null,t))}},i.prototype._next=function(){if(!this._paused&&this._queue.length&&!this._currentTask){if(this._lastFinished!=null){var e=n()-this._lastFinished,t=this._delay-e;if(t>0){setTimeout(this._next.bind(this),t);return}}var r=this._queue.shift();this._start(r)}},t.exports=i})),f=i(((e,t)=>{function n(e,t,n,r){r||={};var i=n!=null&&n.absoluteWidth!=null?n.absoluteWidth/e:n!=null&&n.relativeWidth!=null?n.relativeWidth:1,a=n&&n.absoluteHeight!=null?n.absoluteHeight/t:n!=null&&n.relativeHeight!=null?n.relativeHeight:1,o=n!=null&&n.absoluteX!=null?n.absoluteX/e:n!=null&&n.relativeX!=null?n.relativeX:0,s=n!=null&&n.absoluteY!=null?n.absoluteY/t:n!=null&&n.relativeY!=null?n.relativeY:0;return r.x=o,r.y=s,r.width=i,r.height=a,r}t.exports=n})),p=i(((e,t)=>{function n(e){return function(t){var n,r;try{r=e()}catch(e){n=e}finally{n?t(n):t(null,r)}}}t.exports=n})),m=i(((e,t)=>{function n(e){var t=!1,n;return function(){return t||(t=!0,n=e.apply(null,arguments)),n}}t.exports=n})),h=i(((e,t)=>{var n=m();function r(e){return function(){if(!arguments.length)throw Error(`cancelized: expected at least one argument`);var t=Array.prototype.slice.call(arguments,0),r=t[t.length-1]=n(t[t.length-1]);function i(){r.apply(null,arguments)}return e.apply(null,t),i}}t.exports=r})),g=i(((e,t)=>{function n(e){for(var t in e)e.hasOwnProperty(t)&&(e[t]=void 0)}t.exports=n})),_=i(((e,t)=>{function n(){this._renderers={}}n.prototype.set=function(e,t,n){this._renderers[e]||(this._renderers[e]={}),this._renderers[e][t]=n},n.prototype.get=function(e,t){return this._renderers[e]&&this._renderers[e][t]||null},t.exports=n})),v=i(((e,t)=>{var n=l(),r=d(),i=f(),a=p(),o=h(),s=g(),c=_();function u(e,t){return e.cmp(t)}function m(e,t){return-e.cmp(t)}function v(e){this._progressive=!!(e&&e.progressive),this._layers=[],this._renderers=[],this._tilesToLoad=[],this._tilesToRender=[],this._tmpVisible=[],this._tmpChildren=[],this._width=0,this._height=0,this._tmpRect={},this._tmpSize={},this._createTextureWorkQueue=new r,this._emitRenderInvalid=this._emitRenderInvalid.bind(this),this._rendererRegistry=new c}n(v),v.prototype.destroy=function(){this.removeAllLayers(),s(this)},v.prototype.registerRenderer=function(e,t,n){return this._rendererRegistry.set(e,t,n)},v.prototype.domElement=function(){throw Error(`Stage implementation must override domElement`)},v.prototype.width=function(){return this._width},v.prototype.height=function(){return this._height},v.prototype.size=function(e){return e||={},e.width=this._width,e.height=this._height,e},v.prototype.setSize=function(e){this._width=e.width,this._height=e.height,this.setSizeForType(),this.emit(`resize`),this._emitRenderInvalid()},v.prototype.setSizeForType=function(e){throw Error(`Stage implementation must override setSizeForType`)},v.prototype.loadImage=function(){throw Error(`Stage implementation must override loadImage`)},v.prototype._emitRenderInvalid=function(){this.emit(`renderInvalid`)},v.prototype.validateLayer=function(e){throw Error(`Stage implementation must override validateLayer`)},v.prototype.listLayers=function(){return[].concat(this._layers)},v.prototype.hasLayer=function(e){return this._layers.indexOf(e)>=0},v.prototype.addLayer=function(e,t){if(this._layers.indexOf(e)>=0)throw Error(`Layer already in stage`);if(t??=this._layers.length,t<0||t>this._layers.length)throw Error(`Invalid layer position`);this.validateLayer(e);var n=e.geometry().type,r=e.view().type,i=this._rendererRegistry.get(n,r);if(!i)throw Error(`No `+this.type+` renderer avaiable for `+n+` geometry and `+r+` view`);var a=this.createRenderer(i);this._layers.splice(t,0,e),this._renderers.splice(t,0,a),e.addEventListener(`viewChange`,this._emitRenderInvalid),e.addEventListener(`effectsChange`,this._emitRenderInvalid),e.addEventListener(`fixedLevelChange`,this._emitRenderInvalid),e.addEventListener(`textureStoreChange`,this._emitRenderInvalid),this._emitRenderInvalid()},v.prototype.moveLayer=function(e,t){var n=this._layers.indexOf(e);if(n<0)throw Error(`No such layer in stage`);if(t<0||t>=this._layers.length)throw Error(`Invalid layer position`);e=this._layers.splice(n,1)[0];var r=this._renderers.splice(n,1)[0];this._layers.splice(t,0,e),this._renderers.splice(t,0,r),this._emitRenderInvalid()},v.prototype.removeLayer=function(e){var t=this._layers.indexOf(e);if(t<0)throw Error(`No such layer in stage`);var n=this._layers.splice(t,1)[0],r=this._renderers.splice(t,1)[0];this.destroyRenderer(r),n.removeEventListener(`viewChange`,this._emitRenderInvalid),n.removeEventListener(`effectsChange`,this._emitRenderInvalid),n.removeEventListener(`fixedLevelChange`,this._emitRenderInvalid),n.removeEventListener(`textureStoreChange`,this._emitRenderInvalid),this._emitRenderInvalid()},v.prototype.removeAllLayers=function(){for(;this._layers.length>0;)this.removeLayer(this._layers[0])},v.prototype.startFrame=function(){throw Error(`Stage implementation must override startFrame`)},v.prototype.endFrame=function(){throw Error(`Stage implementation must override endFrame`)},v.prototype.render=function(){var e,t,n=this._tilesToLoad,r=this._tilesToRender,a=!0,o,s=this._width,c=this._height,l=this._tmpRect,u=this._tmpSize;if(!(s<=0||c<=0)){for(this.startFrame(),e=0;e<this._layers.length;e++)this._layers[e].textureStore().startFrame();for(e=0;e<this._layers.length;e++){var d=this._layers[e],f=d.effects(),p=d.view(),m=d.textureStore(),h=this._renderers[e],g=this._layers.length-e,_,v;if(i(s,c,f&&f.rect,l),!(l.width<=0||l.height<=0)){for(u.width=l.width*this._width,u.height=l.height*this._height,p.setSize(u),h.startLayer(d,l),o=this._collectTiles(d,m),t=0;t<n.length;t++)_=n[t],m.markTile(_);for(t=0;t<r.length;t++)_=r[t],v=m.texture(_),h.renderTile(_,v,d,g);d.emit(`renderComplete`,o),o||(a=!1),h.endLayer(d,l)}}for(e=0;e<this._layers.length;e++)this._layers[e].textureStore().endFrame();this.endFrame(),this.emit(`renderComplete`,a)}},v.prototype._collectTiles=function(e,t){var n=this._tilesToLoad,r=this._tilesToRender,i=this._tmpVisible;n.length=0,r.length=0,i.length=0,e.visibleTiles(i);for(var a=!0,o=0;o<i.length;o++){var s=i[o],c;this._collectTileToLoad(s),t.texture(s)?(c=!1,this._collectTileToRender(s)):(c=this._collectChildren(s,t),a=!1),this._collectParents(s,t,c)}return n.sort(u),r.sort(m),a},v.prototype._collectChildren=function(e,t){var n=this._tmpChildren,r=!0;do{if(n.length=0,!e.children(n))break;r=!1;for(var i=0;i<n.length;i++)e=n[i],t.texture(e)?(this._collectTileToLoad(e),this._collectTileToRender(e)):r=!0}while(r&&n.length===1);return r},v.prototype._collectParents=function(e,t,n){for(var r=this._progressive;(r||n)&&(e=e.parent())!=null;){if(n){if(t.texture(e))this._collectTileToRender(e),n=!1;else if(!this._progressive)continue}this._collectTileToLoad(e)||(r=!1)}return n},v.prototype._collectTileToLoad=function(e){return this._collectTileIntoList(e,this._tilesToLoad)},v.prototype._collectTileToRender=function(e){return this._collectTileIntoList(e,this._tilesToRender)},v.prototype._collectTileIntoList=function(e,t){for(var n=!1,r=0;r<t.length;r++)if(e.equals(t[r])){n=!0;break}return n||t.push(e),!n},v.prototype.createTexture=function(e,t,n){var r=this;function i(){return new r.TextureClass(r,e,t)}var s=o(a(i));return this._createTextureWorkQueue.push(s,function(r,i){n(r,e,t,i)})},t.exports=v})),y=i(((e,t)=>{t.exports=(function(){return typeof window<`u`?window:typeof self<`u`?self:typeof global<`u`?global:null})()})),b=i(((e,t)=>{var n=y(),r=l(),i=g(),a={HTMLImageElement:[`naturalWidth`,`naturalHeight`],HTMLCanvasElement:[`width`,`height`],ImageBitmap:[`width`,`height`]};function o(e){var t=!1;for(var r in a)if(n[r]&&e instanceof n[r]){t=!0,this._widthProp=a[r][0],this._heightProp=a[r][1];break}if(!t)throw Error(`Unsupported pixel source`);this._element=e}r(o),o.prototype.destroy=function(){i(this)},o.prototype.element=function(){return this._element},o.prototype.width=function(){return this._element[this._widthProp]},o.prototype.height=function(){return this._element[this._heightProp]},o.prototype.timestamp=function(){return 0},o.prototype.isDynamic=function(){return!1},t.exports=o})),x=i(((e,t)=>{function n(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}t.exports=n})),S=i(((e,t)=>{var n=x();function r(e){this.constructor.super_.apply(this,arguments),this.message=e}n(r,Error),t.exports=r})),C=i(((e,t)=>{(function(e,n,r){t!==void 0&&t.exports?t.exports=r():typeof define==`function`&&define.amd?define(n,r):e[n]=r()})(e,`bowser`,function(){function e(e){function t(t){var n=e.match(t);return n&&n.length>1&&n[1]||``}function n(t){var n=e.match(t);return n&&n.length>1&&n[2]||``}var r=t(/(ipod|iphone|ipad)/i).toLowerCase(),a=!/like android/i.test(e)&&/android/i.test(e),o=/nexus\s*[0-6]\s*/i.test(e),s=!o&&/nexus\s*[0-9]+/i.test(e),c=/CrOS/.test(e),l=/silk/i.test(e),u=/sailfish/i.test(e),d=/tizen/i.test(e),f=/(web|hpw)(o|0)s/i.test(e),p=/windows phone/i.test(e);/SamsungBrowser/i.test(e);var m=!p&&/windows/i.test(e),h=!r&&!l&&/macintosh/i.test(e),g=!a&&!u&&!d&&!f&&/linux/i.test(e),_=n(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),v=t(/version\/(\d+(\.\d+)?)/i),y=/tablet/i.test(e)&&!/tablet pc/i.test(e),b=!y&&/[^-]mobi/i.test(e),x=/xbox/i.test(e),S;/opera/i.test(e)?S={name:`Opera`,opera:!0,version:v||t(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}:/opr\/|opios/i.test(e)?S={name:`Opera`,opera:!0,version:t(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i)||v}:/SamsungBrowser/i.test(e)?S={name:`Samsung Internet for Android`,samsungBrowser:!0,version:v||t(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)}:/Whale/i.test(e)?S={name:`NAVER Whale browser`,whale:!0,version:t(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)}:/MZBrowser/i.test(e)?S={name:`MZ Browser`,mzbrowser:!0,version:t(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/coast/i.test(e)?S={name:`Opera Coast`,coast:!0,version:v||t(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}:/focus/i.test(e)?S={name:`Focus`,focus:!0,version:t(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)}:/yabrowser/i.test(e)?S={name:`Yandex Browser`,yandexbrowser:!0,version:v||t(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/ucbrowser/i.test(e)?S={name:`UC Browser`,ucbrowser:!0,version:t(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/mxios/i.test(e)?S={name:`Maxthon`,maxthon:!0,version:t(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/epiphany/i.test(e)?S={name:`Epiphany`,epiphany:!0,version:t(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}:/puffin/i.test(e)?S={name:`Puffin`,puffin:!0,version:t(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}:/sleipnir/i.test(e)?S={name:`Sleipnir`,sleipnir:!0,version:t(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}:/k-meleon/i.test(e)?S={name:`K-Meleon`,kMeleon:!0,version:t(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}:p?(S={name:`Windows Phone`,osname:`Windows Phone`,windowsphone:!0},_?(S.msedge=!0,S.version=_):(S.msie=!0,S.version=t(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(e)?S={name:`Internet Explorer`,msie:!0,version:t(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:c?S={name:`Chrome`,osname:`Chrome OS`,chromeos:!0,chromeBook:!0,chrome:!0,version:t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/edg([ea]|ios)/i.test(e)?S={name:`Microsoft Edge`,msedge:!0,version:_}:/vivaldi/i.test(e)?S={name:`Vivaldi`,vivaldi:!0,version:t(/vivaldi\/(\d+(\.\d+)?)/i)||v}:u?S={name:`Sailfish`,osname:`Sailfish OS`,sailfish:!0,version:t(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?S={name:`SeaMonkey`,seamonkey:!0,version:t(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(e)?(S={name:`Firefox`,firefox:!0,version:t(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(S.firefoxos=!0,S.osname=`Firefox OS`)):l?S={name:`Amazon Silk`,silk:!0,version:t(/silk\/(\d+(\.\d+)?)/i)}:/phantom/i.test(e)?S={name:`PhantomJS`,phantom:!0,version:t(/phantomjs\/(\d+(\.\d+)?)/i)}:/slimerjs/i.test(e)?S={name:`SlimerJS`,slimer:!0,version:t(/slimerjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?S={name:`BlackBerry`,osname:`BlackBerry OS`,blackberry:!0,version:v||t(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:f?(S={name:`WebOS`,osname:`WebOS`,webos:!0,version:v||t(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(S.touchpad=!0)):/bada/i.test(e)?S={name:`Bada`,osname:`Bada`,bada:!0,version:t(/dolfin\/(\d+(\.\d+)?)/i)}:d?S={name:`Tizen`,osname:`Tizen`,tizen:!0,version:t(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||v}:/qupzilla/i.test(e)?S={name:`QupZilla`,qupzilla:!0,version:t(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||v}:/chromium/i.test(e)?S={name:`Chromium`,chromium:!0,version:t(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||v}:/chrome|crios|crmo/i.test(e)?S={name:`Chrome`,chrome:!0,version:t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:a?S={name:`Android`,version:v}:/safari|applewebkit/i.test(e)?(S={name:`Safari`,safari:!0},v&&(S.version=v)):r?(S={name:r==`iphone`?`iPhone`:r==`ipad`?`iPad`:`iPod`},v&&(S.version=v)):S=/googlebot/i.test(e)?{name:`Googlebot`,googlebot:!0,version:t(/googlebot\/(\d+(\.\d+))/i)||v}:{name:t(/^(.*)\/(.*) /),version:n(/^(.*)\/(.*) /)},!S.msedge&&/(apple)?webkit/i.test(e)?(/(apple)?webkit\/537\.36/i.test(e)?(S.name=S.name||`Blink`,S.blink=!0):(S.name=S.name||`Webkit`,S.webkit=!0),!S.version&&v&&(S.version=v)):!S.opera&&/gecko\//i.test(e)&&(S.name=S.name||`Gecko`,S.gecko=!0,S.version=S.version||t(/gecko\/(\d+(\.\d+)?)/i)),!S.windowsphone&&(a||S.silk)?(S.android=!0,S.osname=`Android`):!S.windowsphone&&r?(S[r]=!0,S.ios=!0,S.osname=`iOS`):h?(S.mac=!0,S.osname=`macOS`):x?(S.xbox=!0,S.osname=`Xbox`):m?(S.windows=!0,S.osname=`Windows`):g&&(S.linux=!0,S.osname=`Linux`);function C(e){switch(e){case`NT`:return`NT`;case`XP`:return`XP`;case`NT 5.0`:return`2000`;case`NT 5.1`:return`XP`;case`NT 5.2`:return`2003`;case`NT 6.0`:return`Vista`;case`NT 6.1`:return`7`;case`NT 6.2`:return`8`;case`NT 6.3`:return`8.1`;case`NT 10.0`:return`10`;default:return}}var w=``;S.windows?w=C(t(/Windows ((NT|XP)( \d\d?.\d)?)/i)):S.windowsphone?w=t(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):S.mac?(w=t(/Mac OS X (\d+([_\.\s]\d+)*)/i),w=w.replace(/[_\s]/g,`.`)):r?(w=t(/os (\d+([_\s]\d+)*) like mac os x/i),w=w.replace(/[_\s]/g,`.`)):a?w=t(/android[ \/-](\d+(\.\d+)*)/i):S.webos?w=t(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):S.blackberry?w=t(/rim\stablet\sos\s(\d+(\.\d+)*)/i):S.bada?w=t(/bada\/(\d+(\.\d+)*)/i):S.tizen&&(w=t(/tizen[\/\s](\d+(\.\d+)*)/i)),w&&(S.osversion=w);var T=!S.windows&&w.split(`.`)[0];return y||s||r==`ipad`||a&&(T==3||T>=4&&!b)||S.silk?S.tablet=!0:(b||r==`iphone`||r==`ipod`||a||o||S.blackberry||S.webos||S.bada)&&(S.mobile=!0),S.msedge||S.msie&&S.version>=10||S.yandexbrowser&&S.version>=15||S.vivaldi&&S.version>=1||S.chrome&&S.version>=20||S.samsungBrowser&&S.version>=4||S.whale&&i([S.version,`1.0`])===1||S.mzbrowser&&i([S.version,`6.0`])===1||S.focus&&i([S.version,`1.0`])===1||S.firefox&&S.version>=20||S.safari&&S.version>=6||S.opera&&S.version>=10||S.ios&&S.osversion&&S.osversion.split(`.`)[0]>=6||S.blackberry&&S.version>=10.1||S.chromium&&S.version>=20?S.a=!0:S.msie&&S.version<10||S.chrome&&S.version<20||S.firefox&&S.version<20||S.safari&&S.version<6||S.opera&&S.version<10||S.ios&&S.osversion&&S.osversion.split(`.`)[0]<6||S.chromium&&S.version<20?S.c=!0:S.x=!0,S}var t=e(typeof navigator<`u`&&navigator.userAgent||``);t.test=function(e){for(var n=0;n<e.length;++n){var r=e[n];if(typeof r==`string`&&r in t)return!0}return!1};function n(e){return e.split(`.`).length}function r(e,t){var n=[],r;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r++)n.push(t(e[r]));return n}function i(e){for(var t=Math.max(n(e[0]),n(e[1])),i=r(e,function(e){var i=t-n(e);return e+=Array(i+1).join(`.0`),r(e.split(`.`),function(e){return Array(20-e.length).join(`0`)+e}).reverse()});--t>=0;)if(i[0][t]>i[1][t])return 1;else if(i[0][t]===i[1][t]){if(t===0)return 0}else return-1}function a(n,r,a){var o=t;typeof r==`string`&&(a=r,r=void 0),r===void 0&&(r=!1),a&&(o=e(a));var s=``+o.version;for(var c in n)if(n.hasOwnProperty(c)&&o[c]){if(typeof n[c]!=`string`)throw Error(`Browser version in the minVersion map should be a string: `+c+`: `+String(n));return i([s,n[c]])<0}return r}function o(e,t,n){return!a(e,t,n)}return t.isUnsupportedBrowser=a,t.compareVersions=i,t.check=o,t._detect=e,t.detect=e,t})})),w=i(((e,t)=>{var n=b(),r=S(),i=C(),a=y(),o=m(),s=!!a.createImageBitmap&&!i.firefox,c={imageOrientation:`flipY`,premultiplyAlpha:`premultiply`};function l(e){this._stage=e}l.prototype.loadImage=function(e,t,n){var r=this,i=new Image;i.crossOrigin=`anonymous`;var a=t&&t.x||0,s=t&&t.y||0,c=t&&t.width||1,l=t&&t.height||1;n=o(n),i.onload=function(){r._handleLoad(i,a,s,c,l,n)},i.onerror=function(){r._handleError(e,n)},i.src=e;function u(){i.onload=i.onerror=null,i.src=``,n.apply(null,arguments)}return u},l.prototype._handleLoad=function(e,t,r,i,o,l){if(t===0&&r===0&&i===1&&o===1)l(null,new n(e));else if(t*=e.naturalWidth,r*=e.naturalHeight,i*=e.naturalWidth,o*=e.naturalHeight,s)a.createImageBitmap(e,t,r,i,o,c).then(function(e){l(null,new n(e))});else{var u=document.createElement(`canvas`);u.width=i,u.height=o,u.getContext(`2d`).drawImage(e,t,r,i,o,0,0,i,o),l(null,new n(u))}},l.prototype._handleError=function(e,t){t(new r(`Network error: `+e))},t.exports=l})),T=i(((e,t)=>{function n(){if(typeof window<`u`){if(window.devicePixelRatio)return window.devicePixelRatio;var e=window.screen;if(e&&e.deviceXDPI&&e.logicalXDPI)return e.deviceXDPI/e.logicalXDPI;if(e&&e.systemXDPI&&e.logicalXDPI)return e.systemXDPI/e.logicalXDPI}return 1}t.exports=n})),E=i(((e,t)=>{function n(e){return!(e&e-1)}t.exports=n})),D=i(((e,t)=>{function n(e){for(var t=document.documentElement.style,n=[`Moz`,`Webkit`,`Khtml`,`O`,`ms`],r=0;r<n.length;r++){var i=n[r]+(e[0].toUpperCase()+e.slice(1));if(i in t)return i}return e}function r(e){var t=n(e);return function(e){return e.style[t]}}function i(e){var t=n(e);return function(e,n){return e.style[t]=n}}var a=i(`transform`),o=i(`transformOrigin`);function s(e){a(e,`translateZ(0)`)}function c(e){o(e,`0 0 0`)}function l(e){e.style.position=`absolute`}function u(e,t,n){e.style.left=t+`px`,e.style.top=n+`px`}function d(e,t,n){e.style.width=t+`px`,e.style.height=n+`px`}function f(e){e.style.width=e.style.height=0}function p(e){e.style.width=e.style.height=`100%`}function m(e){e.style.overflow=`hidden`}function h(e){e.style.overflow=`visible`}function g(e){e.style.pointerEvents=`none`}t.exports={prefixProperty:n,getWithVendorPrefix:r,setWithVendorPrefix:i,setTransform:a,setTransformOrigin:o,setNullTransform:s,setNullTransformOrigin:c,setAbsolute:l,setPixelPosition:u,setPixelSize:d,setNullSize:f,setFullSize:p,setOverflowHidden:m,setOverflowVisible:h,setNoPointerEvents:g}})),O=i(((e,t)=>{var n=v(),r=w(),i=C(),a=x(),o=T(),s=E(),c=D().setAbsolute,l=D().setFullSize,u=g(),d={videoUseTexImage2D:i.chrome};function f(e,t){var n={alpha:!0,premultipliedAlpha:!0,antialias:!!(t&&t.antialias),preserveDrawingBuffer:!!(t&&t.preserveDrawingBuffer)},r=e.getContext&&(e.getContext(`webgl`,n)||e.getContext(`experimental-webgl`,n));if(!r)throw Error(`Could not get WebGL context`);return t.wrapContext&&(r=t.wrapContext(r)),r}function p(e){e||={};var t=this;this.constructor.super_.call(this,e),this._generateMipmaps=e.generateMipmaps!=null&&e.generateMipmaps,this._loader=new r(this),this._domElement=document.createElement(`canvas`),c(this._domElement),l(this._domElement),this._gl=f(this._domElement,e),this._handleContextLoss=function(){t.emit(`webglcontextlost`),t._gl=null},this._domElement.addEventListener(`webglcontextlost`,this._handleContextLoss),this._rendererInstances=[]}a(p,n),p.prototype.destroy=function(){this._domElement.removeEventListener(`webglcontextlost`,this._handleContextLoss),this.constructor.super_.prototype.destroy.call(this)},p.prototype.domElement=function(){return this._domElement},p.prototype.webGlContext=function(){return this._gl},p.prototype.setSizeForType=function(){var e=o();this._domElement.width=e*this._width,this._domElement.height=e*this._height},p.prototype.loadImage=function(e,t,n){return this._loader.loadImage(e,t,n)},p.prototype.maxTextureSize=function(){return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE)},p.prototype.validateLayer=function(e){var t=e.geometry().maxTileSize(),n=this.maxTextureSize();if(t>n)throw Error(`Layer has level with tile size larger than maximum texture size (`+t+` vs. `+n+`)`)},p.prototype.createRenderer=function(e){for(var t=this._rendererInstances,n=0;n<t.length;n++)if(t[n]instanceof e)return t[n];var r=new e(this._gl);return t.push(r),r},p.prototype.destroyRenderer=function(e){var t=this._rendererInstances;if(this._renderers.indexOf(e)<0){e.destroy();var n=t.indexOf(e);n>=0&&t.splice(n,1)}},p.prototype.startFrame=function(){var e=this._gl;if(!e)throw Error(`Bad WebGL context - maybe context was lost?`);e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA)},p.prototype.endFrame=function(){},p.prototype.takeSnapshot=function(e){(typeof e!=`object`||!e)&&(e={});var t=e.quality;if(t===void 0&&(t=75),typeof t!=`number`||t<0||t>100)throw Error(`WebGLStage: Snapshot quality needs to be a number between 0 and 100`);return this.render(),this._domElement.toDataURL(`image/jpeg`,t/100)},p.type=p.prototype.type=`webgl`;function m(e,t,n){this._stage=e,this._gl=e._gl,this._texture=null,this._timestamp=null,this._width=this._height=null,this.refresh(t,n)}m.prototype.refresh=function(e,t){var n=this._gl,r=this._stage,i,a=t.timestamp();if(a!==this._timestamp){var o=t.element(),c=t.width(),l=t.height();if(c!==this._width||l!==this._height){var u=r.maxTextureSize();if(c>u)throw Error(`Texture width larger than max size (`+c+` vs. `+u+`)`);if(l>u)throw Error(`Texture height larger than max size (`+l+` vs. `+u+`)`);this._texture&&n.deleteTexture(i),i=this._texture=n.createTexture(),n.bindTexture(n.TEXTURE_2D,i),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,o)}else i=this._texture,n.bindTexture(n.TEXTURE_2D,i),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),o instanceof HTMLVideoElement&&d.videoUseTexImage2D?n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,o):n.texSubImage2D(n.TEXTURE_2D,0,0,0,n.RGBA,n.UNSIGNED_BYTE,o);r._generateMipmaps&&s(c)&&s(l)?(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_LINEAR),n.generateMipmap(n.TEXTURE_2D)):(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR)),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.bindTexture(n.TEXTURE_2D,null),this._timestamp=a,this._width=c,this._height=l}},m.prototype.destroy=function(){this._texture&&this._gl.deleteTexture(this._texture),u(this)},p.TextureClass=p.prototype.TextureClass=m,t.exports=p})),k=r({ARRAY_TYPE:()=>M,EPSILON:()=>te,RANDOM:()=>N,equals:()=>ee,setMatrixArrayType:()=>A,toRadian:()=>j});function A(e){M=e}function j(e){return e*ne}function ee(e,t){return Math.abs(e-t)<=te*Math.max(1,Math.abs(e),Math.abs(t))}var te,M,N,ne,P=n((()=>{te=1e-6,M=typeof Float32Array<`u`?Float32Array:Array,N=Math.random,ne=Math.PI/180,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)})})),re=r({LDU:()=>_e,add:()=>ve,adjoint:()=>le,clone:()=>ae,copy:()=>F,create:()=>ie,determinant:()=>ue,equals:()=>xe,exactEquals:()=>be,frob:()=>ge,fromRotation:()=>pe,fromScaling:()=>me,fromValues:()=>I,identity:()=>oe,invert:()=>ce,mul:()=>we,multiply:()=>de,multiplyScalar:()=>Se,multiplyScalarAndAdd:()=>Ce,rotate:()=>R,scale:()=>fe,set:()=>L,str:()=>he,sub:()=>Te,subtract:()=>ye,transpose:()=>se});function ie(){var e=new M(4);return M!=Float32Array&&(e[1]=0,e[2]=0),e[0]=1,e[3]=1,e}function ae(e){var t=new M(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function F(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function oe(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e}function I(e,t,n,r){var i=new M(4);return i[0]=e,i[1]=t,i[2]=n,i[3]=r,i}function L(e,t,n,r,i){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e}function se(e,t){if(e===t){var n=t[1];e[1]=t[2],e[2]=n}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e}function ce(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*a-i*r;return o?(o=1/o,e[0]=a*o,e[1]=-r*o,e[2]=-i*o,e[3]=n*o,e):null}function le(e,t){var n=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=n,e}function ue(e){return e[0]*e[3]-e[2]*e[1]}function de(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*s+a*c,e[1]=i*s+o*c,e[2]=r*l+a*u,e[3]=i*l+o*u,e}function R(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c+a*s,e[1]=i*c+o*s,e[2]=r*-s+a*c,e[3]=i*-s+o*c,e}function fe(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1];return e[0]=r*s,e[1]=i*s,e[2]=a*c,e[3]=o*c,e}function pe(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=-n,e[3]=r,e}function me(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e}function he(e){return`mat2(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`)`}function ge(e){return Math.hypot(e[0],e[1],e[2],e[3])}function _e(e,t,n,r){return e[2]=r[2]/r[0],n[0]=r[0],n[1]=r[1],n[3]=r[3]-e[2]*n[1],[e,t,n]}function ve(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e}function ye(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e}function be(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function xe(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=t[0],s=t[1],c=t[2],l=t[3];return Math.abs(n-o)<=1e-6*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(r-s)<=1e-6*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(i-c)<=1e-6*Math.max(1,Math.abs(i),Math.abs(c))&&Math.abs(a-l)<=1e-6*Math.max(1,Math.abs(a),Math.abs(l))}function Se(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e}function Ce(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e}var we,Te,Ee=n((()=>{P(),we=de,Te=ye})),De=r({add:()=>Ge,clone:()=>ke,copy:()=>Ae,create:()=>Oe,determinant:()=>Fe,equals:()=>Xe,exactEquals:()=>Ye,frob:()=>We,fromRotation:()=>Be,fromScaling:()=>Ve,fromTranslation:()=>He,fromValues:()=>Me,identity:()=>je,invert:()=>Pe,mul:()=>Ze,multiply:()=>Ie,multiplyScalar:()=>qe,multiplyScalarAndAdd:()=>Je,rotate:()=>Le,scale:()=>Re,set:()=>Ne,str:()=>Ue,sub:()=>Qe,subtract:()=>Ke,translate:()=>ze});function Oe(){var e=new M(6);return M!=Float32Array&&(e[1]=0,e[2]=0,e[4]=0,e[5]=0),e[0]=1,e[3]=1,e}function ke(e){var t=new M(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t}function Ae(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e}function je(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e}function Me(e,t,n,r,i,a){var o=new M(6);return o[0]=e,o[1]=t,o[2]=n,o[3]=r,o[4]=i,o[5]=a,o}function Ne(e,t,n,r,i,a,o){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e}function Pe(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=n*a-r*i;return c?(c=1/c,e[0]=a*c,e[1]=-r*c,e[2]=-i*c,e[3]=n*c,e[4]=(i*s-a*o)*c,e[5]=(r*o-n*s)*c,e):null}function Fe(e){return e[0]*e[3]-e[1]*e[2]}function Ie(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=n[0],u=n[1],d=n[2],f=n[3],p=n[4],m=n[5];return e[0]=r*l+a*u,e[1]=i*l+o*u,e[2]=r*d+a*f,e[3]=i*d+o*f,e[4]=r*p+a*m+s,e[5]=i*p+o*m+c,e}function Le(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=Math.sin(n),u=Math.cos(n);return e[0]=r*u+a*l,e[1]=i*u+o*l,e[2]=r*-l+a*u,e[3]=i*-l+o*u,e[4]=s,e[5]=c,e}function Re(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=n[0],u=n[1];return e[0]=r*l,e[1]=i*l,e[2]=a*u,e[3]=o*u,e[4]=s,e[5]=c,e}function ze(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=n[0],u=n[1];return e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=r*l+a*u+s,e[5]=i*l+o*u+c,e}function Be(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=-n,e[3]=r,e[4]=0,e[5]=0,e}function Ve(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e[4]=0,e[5]=0,e}function He(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=t[0],e[5]=t[1],e}function Ue(e){return`mat2d(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`)`}function We(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],1)}function Ge(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e}function Ke(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e[4]=t[4]-n[4],e[5]=t[5]-n[5],e}function qe(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e}function Je(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e[4]=t[4]+n[4]*r,e[5]=t[5]+n[5]*r,e}function Ye(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]}function Xe(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=t[0],l=t[1],u=t[2],d=t[3],f=t[4],p=t[5];return Math.abs(n-c)<=1e-6*Math.max(1,Math.abs(n),Math.abs(c))&&Math.abs(r-l)<=1e-6*Math.max(1,Math.abs(r),Math.abs(l))&&Math.abs(i-u)<=1e-6*Math.max(1,Math.abs(i),Math.abs(u))&&Math.abs(a-d)<=1e-6*Math.max(1,Math.abs(a),Math.abs(d))&&Math.abs(o-f)<=1e-6*Math.max(1,Math.abs(o),Math.abs(f))&&Math.abs(s-p)<=1e-6*Math.max(1,Math.abs(s),Math.abs(p))}var Ze,Qe,$e=n((()=>{P(),Ze=Ie,Qe=Ke})),et=r({add:()=>Tt,adjoint:()=>ut,clone:()=>rt,copy:()=>it,create:()=>tt,determinant:()=>dt,equals:()=>At,exactEquals:()=>kt,frob:()=>wt,fromMat2d:()=>yt,fromMat4:()=>nt,fromQuat:()=>bt,fromRotation:()=>_t,fromScaling:()=>vt,fromTranslation:()=>gt,fromValues:()=>at,identity:()=>st,invert:()=>lt,mul:()=>jt,multiply:()=>ft,multiplyScalar:()=>Dt,multiplyScalarAndAdd:()=>Ot,normalFromMat4:()=>xt,projection:()=>St,rotate:()=>mt,scale:()=>ht,set:()=>ot,str:()=>Ct,sub:()=>Mt,subtract:()=>Et,translate:()=>pt,transpose:()=>ct});function tt(){var e=new M(9);return M!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function nt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function rt(e){var t=new M(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function it(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function at(e,t,n,r,i,a,o,s,c){var l=new M(9);return l[0]=e,l[1]=t,l[2]=n,l[3]=r,l[4]=i,l[5]=a,l[6]=o,l[7]=s,l[8]=c,l}function ot(e,t,n,r,i,a,o,s,c,l){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e[6]=s,e[7]=c,e[8]=l,e}function st(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function ct(e,t){if(e===t){var n=t[1],r=t[2],i=t[5];e[1]=t[3],e[2]=t[6],e[3]=n,e[5]=t[7],e[6]=r,e[7]=i}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e}function lt(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=u*o-s*l,f=-u*a+s*c,p=l*a-o*c,m=n*d+r*f+i*p;return m?(m=1/m,e[0]=d*m,e[1]=(-u*r+i*l)*m,e[2]=(s*r-i*o)*m,e[3]=f*m,e[4]=(u*n-i*c)*m,e[5]=(-s*n+i*a)*m,e[6]=p*m,e[7]=(-l*n+r*c)*m,e[8]=(o*n-r*a)*m,e):null}function ut(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8];return e[0]=o*u-s*l,e[1]=i*l-r*u,e[2]=r*s-i*o,e[3]=s*c-a*u,e[4]=n*u-i*c,e[5]=i*a-n*s,e[6]=a*l-o*c,e[7]=r*c-n*l,e[8]=n*o-r*a,e}function dt(e){var t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*(l*a-o*c)+n*(-l*i+o*s)+r*(c*i-a*s)}function ft(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=n[0],p=n[1],m=n[2],h=n[3],g=n[4],_=n[5],v=n[6],y=n[7],b=n[8];return e[0]=f*r+p*o+m*l,e[1]=f*i+p*s+m*u,e[2]=f*a+p*c+m*d,e[3]=h*r+g*o+_*l,e[4]=h*i+g*s+_*u,e[5]=h*a+g*c+_*d,e[6]=v*r+y*o+b*l,e[7]=v*i+y*s+b*u,e[8]=v*a+y*c+b*d,e}function pt(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=n[0],p=n[1];return e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=s,e[5]=c,e[6]=f*r+p*o+l,e[7]=f*i+p*s+u,e[8]=f*a+p*c+d,e}function mt(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=Math.sin(n),p=Math.cos(n);return e[0]=p*r+f*o,e[1]=p*i+f*s,e[2]=p*a+f*c,e[3]=p*o-f*r,e[4]=p*s-f*i,e[5]=p*c-f*a,e[6]=l,e[7]=u,e[8]=d,e}function ht(e,t,n){var r=n[0],i=n[1];return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=i*t[3],e[4]=i*t[4],e[5]=i*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function gt(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=t[0],e[7]=t[1],e[8]=1,e}function _t(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=0,e[3]=-n,e[4]=r,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function vt(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=t[1],e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function yt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e}function bt(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n+n,s=r+r,c=i+i,l=n*o,u=r*o,d=r*s,f=i*o,p=i*s,m=i*c,h=a*o,g=a*s,_=a*c;return e[0]=1-d-m,e[3]=u-_,e[6]=f+g,e[1]=u+_,e[4]=1-l-m,e[7]=p-h,e[2]=f-g,e[5]=p+h,e[8]=1-l-d,e}function xt(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(c*E-o*k-l*T)*A,e[2]=(o*O-s*E+l*w)*A,e[3]=(i*O-r*k-a*D)*A,e[4]=(n*k-i*E+a*T)*A,e[5]=(r*E-n*O-a*w)*A,e[6]=(h*C-g*S+_*x)*A,e[7]=(g*b-m*C-_*y)*A,e[8]=(m*S-h*b+_*v)*A,e):null}function St(e,t,n){return e[0]=2/t,e[1]=0,e[2]=0,e[3]=0,e[4]=-2/n,e[5]=0,e[6]=-1,e[7]=1,e[8]=1,e}function Ct(e){return`mat3(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`, `+e[6]+`, `+e[7]+`, `+e[8]+`)`}function wt(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}function Tt(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e[6]=t[6]+n[6],e[7]=t[7]+n[7],e[8]=t[8]+n[8],e}function Et(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e[4]=t[4]-n[4],e[5]=t[5]-n[5],e[6]=t[6]-n[6],e[7]=t[7]-n[7],e[8]=t[8]-n[8],e}function Dt(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*n,e}function Ot(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e[4]=t[4]+n[4]*r,e[5]=t[5]+n[5]*r,e[6]=t[6]+n[6]*r,e[7]=t[7]+n[7]*r,e[8]=t[8]+n[8]*r,e}function kt(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]}function At(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=e[6],l=e[7],u=e[8],d=t[0],f=t[1],p=t[2],m=t[3],h=t[4],g=t[5],_=t[6],v=t[7],y=t[8];return Math.abs(n-d)<=1e-6*Math.max(1,Math.abs(n),Math.abs(d))&&Math.abs(r-f)<=1e-6*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(i-p)<=1e-6*Math.max(1,Math.abs(i),Math.abs(p))&&Math.abs(a-m)<=1e-6*Math.max(1,Math.abs(a),Math.abs(m))&&Math.abs(o-h)<=1e-6*Math.max(1,Math.abs(o),Math.abs(h))&&Math.abs(s-g)<=1e-6*Math.max(1,Math.abs(s),Math.abs(g))&&Math.abs(c-_)<=1e-6*Math.max(1,Math.abs(c),Math.abs(_))&&Math.abs(l-v)<=1e-6*Math.max(1,Math.abs(l),Math.abs(v))&&Math.abs(u-y)<=1e-6*Math.max(1,Math.abs(u),Math.abs(y))}var jt,Mt,Nt=n((()=>{P(),jt=ft,Mt=Et})),Pt=r({add:()=>xn,adjoint:()=>Ut,clone:()=>It,copy:()=>Lt,create:()=>Ft,determinant:()=>Wt,equals:()=>En,exactEquals:()=>Tn,frob:()=>bn,fromQuat:()=>fn,fromQuat2:()=>on,fromRotation:()=>en,fromRotationTranslation:()=>an,fromRotationTranslationScale:()=>un,fromRotationTranslationScaleOrigin:()=>dn,fromScaling:()=>$t,fromTranslation:()=>Qt,fromValues:()=>Rt,fromXRotation:()=>tn,fromYRotation:()=>nn,fromZRotation:()=>rn,frustum:()=>pn,getRotation:()=>ln,getScaling:()=>cn,getTranslation:()=>sn,identity:()=>Bt,invert:()=>Ht,lookAt:()=>_n,mul:()=>Dn,multiply:()=>Gt,multiplyScalar:()=>Cn,multiplyScalarAndAdd:()=>wn,ortho:()=>gn,perspective:()=>mn,perspectiveFromFieldOfView:()=>hn,rotate:()=>Jt,rotateX:()=>Yt,rotateY:()=>Xt,rotateZ:()=>Zt,scale:()=>qt,set:()=>zt,str:()=>yn,sub:()=>On,subtract:()=>Sn,targetTo:()=>vn,translate:()=>Kt,transpose:()=>Vt});function Ft(){var e=new M(16);return M!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function It(e){var t=new M(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Lt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Rt(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){var g=new M(16);return g[0]=e,g[1]=t,g[2]=n,g[3]=r,g[4]=i,g[5]=a,g[6]=o,g[7]=s,g[8]=c,g[9]=l,g[10]=u,g[11]=d,g[12]=f,g[13]=p,g[14]=m,g[15]=h,g}function zt(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e[6]=s,e[7]=c,e[8]=l,e[9]=u,e[10]=d,e[11]=f,e[12]=p,e[13]=m,e[14]=h,e[15]=g,e}function Bt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Vt(e,t){if(e===t){var n=t[1],r=t[2],i=t[3],a=t[6],o=t[7],s=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=n,e[6]=t[9],e[7]=t[13],e[8]=r,e[9]=a,e[11]=t[14],e[12]=i,e[13]=o,e[14]=s}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e}function Ht(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(i*O-r*k-a*D)*A,e[2]=(h*C-g*S+_*x)*A,e[3]=(f*S-d*C-p*x)*A,e[4]=(c*E-o*k-l*T)*A,e[5]=(n*k-i*E+a*T)*A,e[6]=(g*b-m*C-_*y)*A,e[7]=(u*C-f*b+p*y)*A,e[8]=(o*O-s*E+l*w)*A,e[9]=(r*E-n*O-a*w)*A,e[10]=(m*S-h*b+_*v)*A,e[11]=(d*b-u*S-p*v)*A,e[12]=(s*T-o*D-c*w)*A,e[13]=(n*D-r*T+i*w)*A,e[14]=(h*y-m*x-g*v)*A,e[15]=(u*x-d*y+f*v)*A,e):null}function Ut(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15];return e[0]=s*(f*_-p*g)-d*(c*_-l*g)+h*(c*p-l*f),e[1]=-(r*(f*_-p*g)-d*(i*_-a*g)+h*(i*p-a*f)),e[2]=r*(c*_-l*g)-s*(i*_-a*g)+h*(i*l-a*c),e[3]=-(r*(c*p-l*f)-s*(i*p-a*f)+d*(i*l-a*c)),e[4]=-(o*(f*_-p*g)-u*(c*_-l*g)+m*(c*p-l*f)),e[5]=n*(f*_-p*g)-u*(i*_-a*g)+m*(i*p-a*f),e[6]=-(n*(c*_-l*g)-o*(i*_-a*g)+m*(i*l-a*c)),e[7]=n*(c*p-l*f)-o*(i*p-a*f)+u*(i*l-a*c),e[8]=o*(d*_-p*h)-u*(s*_-l*h)+m*(s*p-l*d),e[9]=-(n*(d*_-p*h)-u*(r*_-a*h)+m*(r*p-a*d)),e[10]=n*(s*_-l*h)-o*(r*_-a*h)+m*(r*l-a*s),e[11]=-(n*(s*p-l*d)-o*(r*p-a*d)+u*(r*l-a*s)),e[12]=-(o*(d*g-f*h)-u*(s*g-c*h)+m*(s*f-c*d)),e[13]=n*(d*g-f*h)-u*(r*g-i*h)+m*(r*f-i*d),e[14]=-(n*(s*g-c*h)-o*(r*g-i*h)+m*(r*c-i*s)),e[15]=n*(s*f-c*d)-o*(r*f-i*d)+u*(r*c-i*s),e}function Wt(e){var t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m;return _*(d*g-f*h)-v*D+y*E+b*T-x*w+S*C}function Gt(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=t[9],p=t[10],m=t[11],h=t[12],g=t[13],_=t[14],v=t[15],y=n[0],b=n[1],x=n[2],S=n[3];return e[0]=y*r+b*s+x*d+S*h,e[1]=y*i+b*c+x*f+S*g,e[2]=y*a+b*l+x*p+S*_,e[3]=y*o+b*u+x*m+S*v,y=n[4],b=n[5],x=n[6],S=n[7],e[4]=y*r+b*s+x*d+S*h,e[5]=y*i+b*c+x*f+S*g,e[6]=y*a+b*l+x*p+S*_,e[7]=y*o+b*u+x*m+S*v,y=n[8],b=n[9],x=n[10],S=n[11],e[8]=y*r+b*s+x*d+S*h,e[9]=y*i+b*c+x*f+S*g,e[10]=y*a+b*l+x*p+S*_,e[11]=y*o+b*u+x*m+S*v,y=n[12],b=n[13],x=n[14],S=n[15],e[12]=y*r+b*s+x*d+S*h,e[13]=y*i+b*c+x*f+S*g,e[14]=y*a+b*l+x*p+S*_,e[15]=y*o+b*u+x*m+S*v,e}function Kt(e,t,n){var r=n[0],i=n[1],a=n[2],o,s,c,l,u,d,f,p,m,h,g,_;return t===e?(e[12]=t[0]*r+t[4]*i+t[8]*a+t[12],e[13]=t[1]*r+t[5]*i+t[9]*a+t[13],e[14]=t[2]*r+t[6]*i+t[10]*a+t[14],e[15]=t[3]*r+t[7]*i+t[11]*a+t[15]):(o=t[0],s=t[1],c=t[2],l=t[3],u=t[4],d=t[5],f=t[6],p=t[7],m=t[8],h=t[9],g=t[10],_=t[11],e[0]=o,e[1]=s,e[2]=c,e[3]=l,e[4]=u,e[5]=d,e[6]=f,e[7]=p,e[8]=m,e[9]=h,e[10]=g,e[11]=_,e[12]=o*r+u*i+m*a+t[12],e[13]=s*r+d*i+h*a+t[13],e[14]=c*r+f*i+g*a+t[14],e[15]=l*r+p*i+_*a+t[15]),e}function qt(e,t,n){var r=n[0],i=n[1],a=n[2];return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*a,e[9]=t[9]*a,e[10]=t[10]*a,e[11]=t[11]*a,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function Jt(e,t,n,r){var i=r[0],a=r[1],o=r[2],s=Math.hypot(i,a,o),c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;return s<1e-6?null:(s=1/s,i*=s,a*=s,o*=s,c=Math.sin(n),l=Math.cos(n),u=1-l,d=t[0],f=t[1],p=t[2],m=t[3],h=t[4],g=t[5],_=t[6],v=t[7],y=t[8],b=t[9],x=t[10],S=t[11],C=i*i*u+l,w=a*i*u+o*c,T=o*i*u-a*c,E=i*a*u-o*c,D=a*a*u+l,O=o*a*u+i*c,k=i*o*u+a*c,A=a*o*u-i*c,j=o*o*u+l,e[0]=d*C+h*w+y*T,e[1]=f*C+g*w+b*T,e[2]=p*C+_*w+x*T,e[3]=m*C+v*w+S*T,e[4]=d*E+h*D+y*O,e[5]=f*E+g*D+b*O,e[6]=p*E+_*D+x*O,e[7]=m*E+v*D+S*O,e[8]=d*k+h*A+y*j,e[9]=f*k+g*A+b*j,e[10]=p*k+_*A+x*j,e[11]=m*k+v*A+S*j,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function Yt(e,t,n){var r=Math.sin(n),i=Math.cos(n),a=t[4],o=t[5],s=t[6],c=t[7],l=t[8],u=t[9],d=t[10],f=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=a*i+l*r,e[5]=o*i+u*r,e[6]=s*i+d*r,e[7]=c*i+f*r,e[8]=l*i-a*r,e[9]=u*i-o*r,e[10]=d*i-s*r,e[11]=f*i-c*r,e}function Xt(e,t,n){var r=Math.sin(n),i=Math.cos(n),a=t[0],o=t[1],s=t[2],c=t[3],l=t[8],u=t[9],d=t[10],f=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*i-l*r,e[1]=o*i-u*r,e[2]=s*i-d*r,e[3]=c*i-f*r,e[8]=a*r+l*i,e[9]=o*r+u*i,e[10]=s*r+d*i,e[11]=c*r+f*i,e}function Zt(e,t,n){var r=Math.sin(n),i=Math.cos(n),a=t[0],o=t[1],s=t[2],c=t[3],l=t[4],u=t[5],d=t[6],f=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*i+l*r,e[1]=o*i+u*r,e[2]=s*i+d*r,e[3]=c*i+f*r,e[4]=l*i-a*r,e[5]=u*i-o*r,e[6]=d*i-s*r,e[7]=f*i-c*r,e}function Qt(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1,e}function $t(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function en(e,t,n){var r=n[0],i=n[1],a=n[2],o=Math.hypot(r,i,a),s,c,l;return o<1e-6?null:(o=1/o,r*=o,i*=o,a*=o,s=Math.sin(t),c=Math.cos(t),l=1-c,e[0]=r*r*l+c,e[1]=i*r*l+a*s,e[2]=a*r*l-i*s,e[3]=0,e[4]=r*i*l-a*s,e[5]=i*i*l+c,e[6]=a*i*l+r*s,e[7]=0,e[8]=r*a*l+i*s,e[9]=i*a*l-r*s,e[10]=a*a*l+c,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e)}function tn(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=r,e[6]=n,e[7]=0,e[8]=0,e[9]=-n,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function nn(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=0,e[2]=-n,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=n,e[9]=0,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function rn(e,t){var n=Math.sin(t),r=Math.cos(t);return e[0]=r,e[1]=n,e[2]=0,e[3]=0,e[4]=-n,e[5]=r,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function an(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=r+r,c=i+i,l=a+a,u=r*s,d=r*c,f=r*l,p=i*c,m=i*l,h=a*l,g=o*s,_=o*c,v=o*l;return e[0]=1-(p+h),e[1]=d+v,e[2]=f-_,e[3]=0,e[4]=d-v,e[5]=1-(u+h),e[6]=m+g,e[7]=0,e[8]=f+_,e[9]=m-g,e[10]=1-(u+p),e[11]=0,e[12]=n[0],e[13]=n[1],e[14]=n[2],e[15]=1,e}function on(e,t){var n=new M(3),r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=r*r+i*i+a*a+o*o;return d>0?(n[0]=(s*o+u*r+c*a-l*i)*2/d,n[1]=(c*o+u*i+l*r-s*a)*2/d,n[2]=(l*o+u*a+s*i-c*r)*2/d):(n[0]=(s*o+u*r+c*a-l*i)*2,n[1]=(c*o+u*i+l*r-s*a)*2,n[2]=(l*o+u*a+s*i-c*r)*2),an(e,t,n),e}function sn(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function cn(e,t){var n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10];return e[0]=Math.hypot(n,r,i),e[1]=Math.hypot(a,o,s),e[2]=Math.hypot(c,l,u),e}function ln(e,t){var n=new M(3);cn(n,t);var r=1/n[0],i=1/n[1],a=1/n[2],o=t[0]*r,s=t[1]*i,c=t[2]*a,l=t[4]*r,u=t[5]*i,d=t[6]*a,f=t[8]*r,p=t[9]*i,m=t[10]*a,h=o+u+m,g=0;return h>0?(g=Math.sqrt(h+1)*2,e[3]=.25*g,e[0]=(d-p)/g,e[1]=(f-c)/g,e[2]=(s-l)/g):o>u&&o>m?(g=Math.sqrt(1+o-u-m)*2,e[3]=(d-p)/g,e[0]=.25*g,e[1]=(s+l)/g,e[2]=(f+c)/g):u>m?(g=Math.sqrt(1+u-o-m)*2,e[3]=(f-c)/g,e[0]=(s+l)/g,e[1]=.25*g,e[2]=(d+p)/g):(g=Math.sqrt(1+m-o-u)*2,e[3]=(s-l)/g,e[0]=(f+c)/g,e[1]=(d+p)/g,e[2]=.25*g),e}function un(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3],c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=r[0],x=r[1],S=r[2];return e[0]=(1-(m+g))*b,e[1]=(f+y)*b,e[2]=(p-v)*b,e[3]=0,e[4]=(f-y)*x,e[5]=(1-(d+g))*x,e[6]=(h+_)*x,e[7]=0,e[8]=(p+v)*S,e[9]=(h-_)*S,e[10]=(1-(d+m))*S,e[11]=0,e[12]=n[0],e[13]=n[1],e[14]=n[2],e[15]=1,e}function dn(e,t,n,r,i){var a=t[0],o=t[1],s=t[2],c=t[3],l=a+a,u=o+o,d=s+s,f=a*l,p=a*u,m=a*d,h=o*u,g=o*d,_=s*d,v=c*l,y=c*u,b=c*d,x=r[0],S=r[1],C=r[2],w=i[0],T=i[1],E=i[2],D=(1-(h+_))*x,O=(p+b)*x,k=(m-y)*x,A=(p-b)*S,j=(1-(f+_))*S,ee=(g+v)*S,te=(m+y)*C,M=(g-v)*C,N=(1-(f+h))*C;return e[0]=D,e[1]=O,e[2]=k,e[3]=0,e[4]=A,e[5]=j,e[6]=ee,e[7]=0,e[8]=te,e[9]=M,e[10]=N,e[11]=0,e[12]=n[0]+w-(D*w+A*T+te*E),e[13]=n[1]+T-(O*w+j*T+M*E),e[14]=n[2]+E-(k*w+ee*T+N*E),e[15]=1,e}function fn(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n+n,s=r+r,c=i+i,l=n*o,u=r*o,d=r*s,f=i*o,p=i*s,m=i*c,h=a*o,g=a*s,_=a*c;return e[0]=1-d-m,e[1]=u+_,e[2]=f-g,e[3]=0,e[4]=u-_,e[5]=1-l-m,e[6]=p+h,e[7]=0,e[8]=f+g,e[9]=p-h,e[10]=1-l-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function pn(e,t,n,r,i,a,o){var s=1/(n-t),c=1/(i-r),l=1/(a-o);return e[0]=a*2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a*2*c,e[6]=0,e[7]=0,e[8]=(n+t)*s,e[9]=(i+r)*c,e[10]=(o+a)*l,e[11]=-1,e[12]=0,e[13]=0,e[14]=o*a*2*l,e[15]=0,e}function mn(e,t,n,r,i){var a=1/Math.tan(t/2),o;return e[0]=a/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0?(o=1/(r-i),e[10]=(i+r)*o,e[14]=2*i*r*o):(e[10]=-1,e[14]=-2*r),e}function hn(e,t,n,r){var i=Math.tan(t.upDegrees*Math.PI/180),a=Math.tan(t.downDegrees*Math.PI/180),o=Math.tan(t.leftDegrees*Math.PI/180),s=Math.tan(t.rightDegrees*Math.PI/180),c=2/(o+s),l=2/(i+a);return e[0]=c,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=l,e[6]=0,e[7]=0,e[8]=-((o-s)*c*.5),e[9]=(i-a)*l*.5,e[10]=r/(n-r),e[11]=-1,e[12]=0,e[13]=0,e[14]=r*n/(n-r),e[15]=0,e}function gn(e,t,n,r,i,a,o){var s=1/(t-n),c=1/(r-i),l=1/(a-o);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*c,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*l,e[11]=0,e[12]=(t+n)*s,e[13]=(i+r)*c,e[14]=(o+a)*l,e[15]=1,e}function _n(e,t,n,r){var i,a,o,s,c,l,u,d,f,p,m=t[0],h=t[1],g=t[2],_=r[0],v=r[1],y=r[2],b=n[0],x=n[1],S=n[2];return Math.abs(m-b)<1e-6&&Math.abs(h-x)<1e-6&&Math.abs(g-S)<1e-6?Bt(e):(u=m-b,d=h-x,f=g-S,p=1/Math.hypot(u,d,f),u*=p,d*=p,f*=p,i=v*f-y*d,a=y*u-_*f,o=_*d-v*u,p=Math.hypot(i,a,o),p?(p=1/p,i*=p,a*=p,o*=p):(i=0,a=0,o=0),s=d*o-f*a,c=f*i-u*o,l=u*a-d*i,p=Math.hypot(s,c,l),p?(p=1/p,s*=p,c*=p,l*=p):(s=0,c=0,l=0),e[0]=i,e[1]=s,e[2]=u,e[3]=0,e[4]=a,e[5]=c,e[6]=d,e[7]=0,e[8]=o,e[9]=l,e[10]=f,e[11]=0,e[12]=-(i*m+a*h+o*g),e[13]=-(s*m+c*h+l*g),e[14]=-(u*m+d*h+f*g),e[15]=1,e)}function vn(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=r[0],c=r[1],l=r[2],u=i-n[0],d=a-n[1],f=o-n[2],p=u*u+d*d+f*f;p>0&&(p=1/Math.sqrt(p),u*=p,d*=p,f*=p);var m=c*f-l*d,h=l*u-s*f,g=s*d-c*u;return p=m*m+h*h+g*g,p>0&&(p=1/Math.sqrt(p),m*=p,h*=p,g*=p),e[0]=m,e[1]=h,e[2]=g,e[3]=0,e[4]=d*g-f*h,e[5]=f*m-u*g,e[6]=u*h-d*m,e[7]=0,e[8]=u,e[9]=d,e[10]=f,e[11]=0,e[12]=i,e[13]=a,e[14]=o,e[15]=1,e}function yn(e){return`mat4(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`, `+e[6]+`, `+e[7]+`, `+e[8]+`, `+e[9]+`, `+e[10]+`, `+e[11]+`, `+e[12]+`, `+e[13]+`, `+e[14]+`, `+e[15]+`)`}function bn(e){return Math.hypot(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])}function xn(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e[6]=t[6]+n[6],e[7]=t[7]+n[7],e[8]=t[8]+n[8],e[9]=t[9]+n[9],e[10]=t[10]+n[10],e[11]=t[11]+n[11],e[12]=t[12]+n[12],e[13]=t[13]+n[13],e[14]=t[14]+n[14],e[15]=t[15]+n[15],e}function Sn(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e[4]=t[4]-n[4],e[5]=t[5]-n[5],e[6]=t[6]-n[6],e[7]=t[7]-n[7],e[8]=t[8]-n[8],e[9]=t[9]-n[9],e[10]=t[10]-n[10],e[11]=t[11]-n[11],e[12]=t[12]-n[12],e[13]=t[13]-n[13],e[14]=t[14]-n[14],e[15]=t[15]-n[15],e}function Cn(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12]*n,e[13]=t[13]*n,e[14]=t[14]*n,e[15]=t[15]*n,e}function wn(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e[4]=t[4]+n[4]*r,e[5]=t[5]+n[5]*r,e[6]=t[6]+n[6]*r,e[7]=t[7]+n[7]*r,e[8]=t[8]+n[8]*r,e[9]=t[9]+n[9]*r,e[10]=t[10]+n[10]*r,e[11]=t[11]+n[11]*r,e[12]=t[12]+n[12]*r,e[13]=t[13]+n[13]*r,e[14]=t[14]+n[14]*r,e[15]=t[15]+n[15]*r,e}function Tn(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]&&e[11]===t[11]&&e[12]===t[12]&&e[13]===t[13]&&e[14]===t[14]&&e[15]===t[15]}function En(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],m=e[12],h=e[13],g=e[14],_=e[15],v=t[0],y=t[1],b=t[2],x=t[3],S=t[4],C=t[5],w=t[6],T=t[7],E=t[8],D=t[9],O=t[10],k=t[11],A=t[12],j=t[13],ee=t[14],te=t[15];return Math.abs(n-v)<=1e-6*Math.max(1,Math.abs(n),Math.abs(v))&&Math.abs(r-y)<=1e-6*Math.max(1,Math.abs(r),Math.abs(y))&&Math.abs(i-b)<=1e-6*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(a-x)<=1e-6*Math.max(1,Math.abs(a),Math.abs(x))&&Math.abs(o-S)<=1e-6*Math.max(1,Math.abs(o),Math.abs(S))&&Math.abs(s-C)<=1e-6*Math.max(1,Math.abs(s),Math.abs(C))&&Math.abs(c-w)<=1e-6*Math.max(1,Math.abs(c),Math.abs(w))&&Math.abs(l-T)<=1e-6*Math.max(1,Math.abs(l),Math.abs(T))&&Math.abs(u-E)<=1e-6*Math.max(1,Math.abs(u),Math.abs(E))&&Math.abs(d-D)<=1e-6*Math.max(1,Math.abs(d),Math.abs(D))&&Math.abs(f-O)<=1e-6*Math.max(1,Math.abs(f),Math.abs(O))&&Math.abs(p-k)<=1e-6*Math.max(1,Math.abs(p),Math.abs(k))&&Math.abs(m-A)<=1e-6*Math.max(1,Math.abs(m),Math.abs(A))&&Math.abs(h-j)<=1e-6*Math.max(1,Math.abs(h),Math.abs(j))&&Math.abs(g-ee)<=1e-6*Math.max(1,Math.abs(g),Math.abs(ee))&&Math.abs(_-te)<=1e-6*Math.max(1,Math.abs(_),Math.abs(te))}var Dn,On,kn=n((()=>{P(),Dn=Gt,On=Sn})),An=r({add:()=>Ln,angle:()=>fr,bezier:()=>ir,ceil:()=>Vn,clone:()=>Mn,copy:()=>Fn,create:()=>jn,cross:()=>tr,dist:()=>br,distance:()=>Jn,div:()=>yr,divide:()=>Bn,dot:()=>er,equals:()=>gr,exactEquals:()=>hr,floor:()=>Hn,forEach:()=>wr,fromValues:()=>Pn,hermite:()=>rr,inverse:()=>Qn,len:()=>Sr,length:()=>Nn,lerp:()=>nr,max:()=>Wn,min:()=>Un,mul:()=>vr,multiply:()=>zn,negate:()=>Zn,normalize:()=>$n,random:()=>ar,rotateX:()=>lr,rotateY:()=>ur,rotateZ:()=>dr,round:()=>Gn,scale:()=>Kn,scaleAndAdd:()=>qn,set:()=>In,sqrDist:()=>xr,sqrLen:()=>Cr,squaredDistance:()=>Yn,squaredLength:()=>Xn,str:()=>mr,sub:()=>_r,subtract:()=>Rn,transformMat3:()=>sr,transformMat4:()=>or,transformQuat:()=>cr,zero:()=>pr});function jn(){var e=new M(3);return M!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Mn(e){var t=new M(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function Nn(e){var t=e[0],n=e[1],r=e[2];return Math.hypot(t,n,r)}function Pn(e,t,n){var r=new M(3);return r[0]=e,r[1]=t,r[2]=n,r}function Fn(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function In(e,t,n,r){return e[0]=t,e[1]=n,e[2]=r,e}function Ln(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function Rn(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function zn(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e}function Bn(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e}function Vn(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e}function Hn(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e}function Un(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e}function Wn(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e}function Gn(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e}function Kn(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function qn(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e}function Jn(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2];return Math.hypot(n,r,i)}function Yn(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2];return n*n+r*r+i*i}function Xn(e){var t=e[0],n=e[1],r=e[2];return t*t+n*n+r*r}function Zn(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Qn(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e}function $n(e,t){var n=t[0],r=t[1],i=t[2],a=n*n+r*r+i*i;return a>0&&(a=1/Math.sqrt(a)),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e}function er(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function tr(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2];return e[0]=i*c-a*s,e[1]=a*o-r*c,e[2]=r*s-i*o,e}function nr(e,t,n,r){var i=t[0],a=t[1],o=t[2];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e[2]=o+r*(n[2]-o),e}function rr(e,t,n,r,i,a){var o=a*a,s=o*(2*a-3)+1,c=o*(a-2)+a,l=o*(a-1),u=o*(3-2*a);return e[0]=t[0]*s+n[0]*c+r[0]*l+i[0]*u,e[1]=t[1]*s+n[1]*c+r[1]*l+i[1]*u,e[2]=t[2]*s+n[2]*c+r[2]*l+i[2]*u,e}function ir(e,t,n,r,i,a){var o=1-a,s=o*o,c=a*a,l=s*o,u=3*a*s,d=3*c*o,f=c*a;return e[0]=t[0]*l+n[0]*u+r[0]*d+i[0]*f,e[1]=t[1]*l+n[1]*u+r[1]*d+i[1]*f,e[2]=t[2]*l+n[2]*u+r[2]*d+i[2]*f,e}function ar(e,t){t||=1;var n=N()*2*Math.PI,r=N()*2-1,i=Math.sqrt(1-r*r)*t;return e[0]=Math.cos(n)*i,e[1]=Math.sin(n)*i,e[2]=r*t,e}function or(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[3]*r+n[7]*i+n[11]*a+n[15];return o||=1,e[0]=(n[0]*r+n[4]*i+n[8]*a+n[12])/o,e[1]=(n[1]*r+n[5]*i+n[9]*a+n[13])/o,e[2]=(n[2]*r+n[6]*i+n[10]*a+n[14])/o,e}function sr(e,t,n){var r=t[0],i=t[1],a=t[2];return e[0]=r*n[0]+i*n[3]+a*n[6],e[1]=r*n[1]+i*n[4]+a*n[7],e[2]=r*n[2]+i*n[5]+a*n[8],e}function cr(e,t,n){var r=n[0],i=n[1],a=n[2],o=n[3],s=t[0],c=t[1],l=t[2],u=i*l-a*c,d=a*s-r*l,f=r*c-i*s,p=i*f-a*d,m=a*u-r*f,h=r*d-i*u,g=o*2;return u*=g,d*=g,f*=g,p*=2,m*=2,h*=2,e[0]=s+u+p,e[1]=c+d+m,e[2]=l+f+h,e}function lr(e,t,n,r){var i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[0],a[1]=i[1]*Math.cos(r)-i[2]*Math.sin(r),a[2]=i[1]*Math.sin(r)+i[2]*Math.cos(r),e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function ur(e,t,n,r){var i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[2]*Math.sin(r)+i[0]*Math.cos(r),a[1]=i[1],a[2]=i[2]*Math.cos(r)-i[0]*Math.sin(r),e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function dr(e,t,n,r){var i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[0]*Math.cos(r)-i[1]*Math.sin(r),a[1]=i[0]*Math.sin(r)+i[1]*Math.cos(r),a[2]=i[2],e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function fr(e,t){var n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],s=t[2],c=Math.sqrt(n*n+r*r+i*i)*Math.sqrt(a*a+o*o+s*s),l=c&&er(e,t)/c;return Math.acos(Math.min(Math.max(l,-1),1))}function pr(e){return e[0]=0,e[1]=0,e[2]=0,e}function mr(e){return`vec3(`+e[0]+`, `+e[1]+`, `+e[2]+`)`}function hr(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function gr(e,t){var n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],s=t[2];return Math.abs(n-a)<=1e-6*Math.max(1,Math.abs(n),Math.abs(a))&&Math.abs(r-o)<=1e-6*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(i-s)<=1e-6*Math.max(1,Math.abs(i),Math.abs(s))}var _r,vr,yr,br,xr,Sr,Cr,wr,Tr=n((()=>{P(),_r=Rn,vr=zn,yr=Bn,br=Jn,xr=Yn,Sr=Nn,Cr=Xn,wr=function(){var e=jn();return function(t,n,r,i,a,o){var s,c;for(n||=3,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}}()})),Er=r({add:()=>Mr,ceil:()=>Ir,clone:()=>Or,copy:()=>Ar,create:()=>Dr,cross:()=>Zr,dist:()=>li,distance:()=>Ur,div:()=>ci,divide:()=>Fr,dot:()=>Xr,equals:()=>ai,exactEquals:()=>ii,floor:()=>Lr,forEach:()=>pi,fromValues:()=>kr,inverse:()=>Jr,len:()=>di,length:()=>Gr,lerp:()=>Qr,max:()=>zr,min:()=>Rr,mul:()=>si,multiply:()=>Pr,negate:()=>qr,normalize:()=>Yr,random:()=>$r,round:()=>Br,scale:()=>Vr,scaleAndAdd:()=>Hr,set:()=>jr,sqrDist:()=>ui,sqrLen:()=>fi,squaredDistance:()=>Wr,squaredLength:()=>Kr,str:()=>ri,sub:()=>oi,subtract:()=>Nr,transformMat4:()=>ei,transformQuat:()=>ti,zero:()=>ni});function Dr(){var e=new M(4);return M!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Or(e){var t=new M(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function kr(e,t,n,r){var i=new M(4);return i[0]=e,i[1]=t,i[2]=n,i[3]=r,i}function Ar(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function jr(e,t,n,r,i){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e}function Mr(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e}function Nr(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e}function Pr(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e[3]=t[3]*n[3],e}function Fr(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e[3]=t[3]/n[3],e}function Ir(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e[3]=Math.ceil(t[3]),e}function Lr(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e[3]=Math.floor(t[3]),e}function Rr(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e[3]=Math.min(t[3],n[3]),e}function zr(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e[3]=Math.max(t[3],n[3]),e}function Br(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e[3]=Math.round(t[3]),e}function Vr(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e}function Hr(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e}function Ur(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2],a=t[3]-e[3];return Math.hypot(n,r,i,a)}function Wr(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2],a=t[3]-e[3];return n*n+r*r+i*i+a*a}function Gr(e){var t=e[0],n=e[1],r=e[2],i=e[3];return Math.hypot(t,n,r,i)}function Kr(e){var t=e[0],n=e[1],r=e[2],i=e[3];return t*t+n*n+r*r+i*i}function qr(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e}function Jr(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e}function Yr(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*n+r*r+i*i+a*a;return o>0&&(o=1/Math.sqrt(o)),e[0]=n*o,e[1]=r*o,e[2]=i*o,e[3]=a*o,e}function Xr(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function Zr(e,t,n,r){var i=n[0]*r[1]-n[1]*r[0],a=n[0]*r[2]-n[2]*r[0],o=n[0]*r[3]-n[3]*r[0],s=n[1]*r[2]-n[2]*r[1],c=n[1]*r[3]-n[3]*r[1],l=n[2]*r[3]-n[3]*r[2],u=t[0],d=t[1],f=t[2],p=t[3];return e[0]=d*l-f*c+p*s,e[1]=-(u*l)+f*o-p*a,e[2]=u*c-d*o+p*i,e[3]=-(u*s)+d*a-f*i,e}function Qr(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e[2]=o+r*(n[2]-o),e[3]=s+r*(n[3]-s),e}function $r(e,t){t||=1;var n,r,i,a,o,s;do n=N()*2-1,r=N()*2-1,o=n*n+r*r;while(o>=1);do i=N()*2-1,a=N()*2-1,s=i*i+a*a;while(s>=1);var c=Math.sqrt((1-o)/s);return e[0]=t*n,e[1]=t*r,e[2]=t*i*c,e[3]=t*a*c,e}function ei(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3];return e[0]=n[0]*r+n[4]*i+n[8]*a+n[12]*o,e[1]=n[1]*r+n[5]*i+n[9]*a+n[13]*o,e[2]=n[2]*r+n[6]*i+n[10]*a+n[14]*o,e[3]=n[3]*r+n[7]*i+n[11]*a+n[15]*o,e}function ti(e,t,n){var r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2],l=n[3],u=l*r+s*a-c*i,d=l*i+c*r-o*a,f=l*a+o*i-s*r,p=-o*r-s*i-c*a;return e[0]=u*l+p*-o+d*-c-f*-s,e[1]=d*l+p*-s+f*-o-u*-c,e[2]=f*l+p*-c+u*-s-d*-o,e[3]=t[3],e}function ni(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e}function ri(e){return`vec4(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`)`}function ii(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function ai(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=t[0],s=t[1],c=t[2],l=t[3];return Math.abs(n-o)<=1e-6*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(r-s)<=1e-6*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(i-c)<=1e-6*Math.max(1,Math.abs(i),Math.abs(c))&&Math.abs(a-l)<=1e-6*Math.max(1,Math.abs(a),Math.abs(l))}var oi,si,ci,li,ui,di,fi,pi,mi=n((()=>{P(),oi=Nr,si=Pr,ci=Fr,li=Ur,ui=Wr,di=Gr,fi=Kr,pi=function(){var e=Dr();return function(t,n,r,i,a,o){var s,c;for(n||=4,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}}()})),hi=r({add:()=>Bi,calculateW:()=>Ti,clone:()=>Ii,conjugate:()=>Mi,copy:()=>Ri,create:()=>gi,dot:()=>Ui,equals:()=>Zi,exactEquals:()=>Xi,exp:()=>Ei,fromEuler:()=>Pi,fromMat3:()=>Ni,fromValues:()=>Li,getAngle:()=>bi,getAxisAngle:()=>yi,identity:()=>_i,invert:()=>ji,len:()=>Ki,length:()=>Gi,lerp:()=>Wi,ln:()=>Di,mul:()=>Vi,multiply:()=>xi,normalize:()=>Yi,pow:()=>Oi,random:()=>Ai,rotateX:()=>Si,rotateY:()=>Ci,rotateZ:()=>wi,rotationTo:()=>Qi,scale:()=>Hi,set:()=>zi,setAxes:()=>ea,setAxisAngle:()=>vi,slerp:()=>ki,sqlerp:()=>$i,sqrLen:()=>Ji,squaredLength:()=>qi,str:()=>Fi});function gi(){var e=new M(4);return M!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function _i(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function vi(e,t,n){n*=.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e}function yi(e,t){var n=Math.acos(t[3])*2,r=Math.sin(n/2);return r>1e-6?(e[0]=t[0]/r,e[1]=t[1]/r,e[2]=t[2]/r):(e[0]=1,e[1]=0,e[2]=0),n}function bi(e,t){var n=Ui(e,t);return Math.acos(2*n*n-1)}function xi(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*u+o*s+i*l-a*c,e[1]=i*u+o*c+a*s-r*l,e[2]=a*u+o*l+r*c-i*s,e[3]=o*u-r*s-i*c-a*l,e}function Si(e,t,n){n*=.5;var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c+o*s,e[1]=i*c+a*s,e[2]=a*c-i*s,e[3]=o*c-r*s,e}function Ci(e,t,n){n*=.5;var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c-a*s,e[1]=i*c+o*s,e[2]=a*c+r*s,e[3]=o*c-i*s,e}function wi(e,t,n){n*=.5;var r=t[0],i=t[1],a=t[2],o=t[3],s=Math.sin(n),c=Math.cos(n);return e[0]=r*c+i*s,e[1]=i*c-r*s,e[2]=a*c+o*s,e[3]=o*c-a*s,e}function Ti(e,t){var n=t[0],r=t[1],i=t[2];return e[0]=n,e[1]=r,e[2]=i,e[3]=Math.sqrt(Math.abs(1-n*n-r*r-i*i)),e}function Ei(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=Math.sqrt(n*n+r*r+i*i),s=Math.exp(a),c=o>0?s*Math.sin(o)/o:0;return e[0]=n*c,e[1]=r*c,e[2]=i*c,e[3]=s*Math.cos(o),e}function Di(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=Math.sqrt(n*n+r*r+i*i),s=o>0?Math.atan2(o,a)/o:0;return e[0]=n*s,e[1]=r*s,e[2]=i*s,e[3]=.5*Math.log(n*n+r*r+i*i+a*a),e}function Oi(e,t,n){return Di(e,t),Hi(e,e,n),Ei(e,e),e}function ki(e,t,n,r){var i=t[0],a=t[1],o=t[2],s=t[3],c=n[0],l=n[1],u=n[2],d=n[3],f,p=i*c+a*l+o*u+s*d,m,h,g;return p<0&&(p=-p,c=-c,l=-l,u=-u,d=-d),1-p>1e-6?(f=Math.acos(p),m=Math.sin(f),h=Math.sin((1-r)*f)/m,g=Math.sin(r*f)/m):(h=1-r,g=r),e[0]=h*i+g*c,e[1]=h*a+g*l,e[2]=h*o+g*u,e[3]=h*s+g*d,e}function Ai(e){var t=N(),n=N(),r=N(),i=Math.sqrt(1-t),a=Math.sqrt(t);return e[0]=i*Math.sin(2*Math.PI*n),e[1]=i*Math.cos(2*Math.PI*n),e[2]=a*Math.sin(2*Math.PI*r),e[3]=a*Math.cos(2*Math.PI*r),e}function ji(e,t){var n=t[0],r=t[1],i=t[2],a=t[3],o=n*n+r*r+i*i+a*a,s=o?1/o:0;return e[0]=-n*s,e[1]=-r*s,e[2]=-i*s,e[3]=a*s,e}function Mi(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function Ni(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var a=(i+1)%3,o=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[a*3+a]-t[o*3+o]+1),e[i]=.5*r,r=.5/r,e[3]=(t[a*3+o]-t[o*3+a])*r,e[a]=(t[a*3+i]+t[i*3+a])*r,e[o]=(t[o*3+i]+t[i*3+o])*r}return e}function Pi(e,t,n,r){var i=.5*Math.PI/180;t*=i,n*=i,r*=i;var a=Math.sin(t),o=Math.cos(t),s=Math.sin(n),c=Math.cos(n),l=Math.sin(r),u=Math.cos(r);return e[0]=a*c*u-o*s*l,e[1]=o*s*u+a*c*l,e[2]=o*c*l-a*s*u,e[3]=o*c*u+a*s*l,e}function Fi(e){return`quat(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`)`}var Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta=n((()=>{P(),Nt(),Tr(),mi(),Ii=Or,Li=kr,Ri=Ar,zi=jr,Bi=Mr,Vi=xi,Hi=Vr,Ui=Xr,Wi=Qr,Gi=Gr,Ki=Gi,qi=Kr,Ji=qi,Yi=Yr,Xi=ii,Zi=ai,Qi=function(){var e=jn(),t=Pn(1,0,0),n=Pn(0,1,0);return function(r,i,a){var o=er(i,a);return o<-.999999?(tr(e,t,i),Sr(e)<1e-6&&tr(e,n,i),$n(e,e),vi(r,e,Math.PI),r):o>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(tr(e,i,a),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+o,Yi(r,r))}}(),$i=function(){var e=gi(),t=gi();return function(n,r,i,a,o,s){return ki(e,r,o,s),ki(t,i,a,s),ki(n,e,t,2*s*(1-s)),n}}(),ea=function(){var e=tt();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],Yi(t,Ni(t,e))}}()})),na=r({add:()=>wa,clone:()=>ia,conjugate:()=>ka,copy:()=>da,create:()=>ra,dot:()=>La,equals:()=>Na,exactEquals:()=>Ma,fromMat4:()=>ua,fromRotation:()=>la,fromRotationTranslation:()=>sa,fromRotationTranslationValues:()=>oa,fromTranslation:()=>ca,fromValues:()=>aa,getDual:()=>ma,getReal:()=>Pa,getTranslation:()=>ga,identity:()=>fa,invert:()=>Oa,len:()=>za,length:()=>Ra,lerp:()=>Da,mul:()=>Ia,multiply:()=>Ta,normalize:()=>Aa,rotateAroundAxis:()=>Ca,rotateByQuatAppend:()=>xa,rotateByQuatPrepend:()=>Sa,rotateX:()=>va,rotateY:()=>ya,rotateZ:()=>ba,scale:()=>Ea,set:()=>pa,setDual:()=>ha,setReal:()=>Fa,sqrLen:()=>Va,squaredLength:()=>Ba,str:()=>ja,translate:()=>_a});function ra(){var e=new M(8);return M!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0),e[3]=1,e}function ia(e){var t=new M(8);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t}function aa(e,t,n,r,i,a,o,s){var c=new M(8);return c[0]=e,c[1]=t,c[2]=n,c[3]=r,c[4]=i,c[5]=a,c[6]=o,c[7]=s,c}function oa(e,t,n,r,i,a,o){var s=new M(8);s[0]=e,s[1]=t,s[2]=n,s[3]=r;var c=i*.5,l=a*.5,u=o*.5;return s[4]=c*r+l*n-u*t,s[5]=l*r+u*e-c*n,s[6]=u*r+c*t-l*e,s[7]=-c*e-l*t-u*n,s}function sa(e,t,n){var r=n[0]*.5,i=n[1]*.5,a=n[2]*.5,o=t[0],s=t[1],c=t[2],l=t[3];return e[0]=o,e[1]=s,e[2]=c,e[3]=l,e[4]=r*l+i*c-a*s,e[5]=i*l+a*o-r*c,e[6]=a*l+r*s-i*o,e[7]=-r*o-i*s-a*c,e}function ca(e,t){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e[4]=t[0]*.5,e[5]=t[1]*.5,e[6]=t[2]*.5,e[7]=0,e}function la(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=0,e[5]=0,e[6]=0,e[7]=0,e}function ua(e,t){var n=gi();ln(n,t);var r=new M(3);return sn(r,t),sa(e,n,r),e}function da(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e}function fa(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e}function pa(e,t,n,r,i,a,o,s,c){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e[4]=a,e[5]=o,e[6]=s,e[7]=c,e}function ma(e,t){return e[0]=t[4],e[1]=t[5],e[2]=t[6],e[3]=t[7],e}function ha(e,t){return e[4]=t[0],e[5]=t[1],e[6]=t[2],e[7]=t[3],e}function ga(e,t){var n=t[4],r=t[5],i=t[6],a=t[7],o=-t[0],s=-t[1],c=-t[2],l=t[3];return e[0]=(n*l+a*o+r*c-i*s)*2,e[1]=(r*l+a*s+i*o-n*c)*2,e[2]=(i*l+a*c+n*s-r*o)*2,e}function _a(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0]*.5,c=n[1]*.5,l=n[2]*.5,u=t[4],d=t[5],f=t[6],p=t[7];return e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=o*s+i*l-a*c+u,e[5]=o*c+a*s-r*l+d,e[6]=o*l+r*c-i*s+f,e[7]=-r*s-i*c-a*l+p,e}function va(e,t,n){var r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=s*o+u*r+c*a-l*i,f=c*o+u*i+l*r-s*a,p=l*o+u*a+s*i-c*r,m=u*o-s*r-c*i-l*a;return Si(e,t,n),r=e[0],i=e[1],a=e[2],o=e[3],e[4]=d*o+m*r+f*a-p*i,e[5]=f*o+m*i+p*r-d*a,e[6]=p*o+m*a+d*i-f*r,e[7]=m*o-d*r-f*i-p*a,e}function ya(e,t,n){var r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=s*o+u*r+c*a-l*i,f=c*o+u*i+l*r-s*a,p=l*o+u*a+s*i-c*r,m=u*o-s*r-c*i-l*a;return Ci(e,t,n),r=e[0],i=e[1],a=e[2],o=e[3],e[4]=d*o+m*r+f*a-p*i,e[5]=f*o+m*i+p*r-d*a,e[6]=p*o+m*a+d*i-f*r,e[7]=m*o-d*r-f*i-p*a,e}function ba(e,t,n){var r=-t[0],i=-t[1],a=-t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=s*o+u*r+c*a-l*i,f=c*o+u*i+l*r-s*a,p=l*o+u*a+s*i-c*r,m=u*o-s*r-c*i-l*a;return wi(e,t,n),r=e[0],i=e[1],a=e[2],o=e[3],e[4]=d*o+m*r+f*a-p*i,e[5]=f*o+m*i+p*r-d*a,e[6]=p*o+m*a+d*i-f*r,e[7]=m*o-d*r-f*i-p*a,e}function xa(e,t,n){var r=n[0],i=n[1],a=n[2],o=n[3],s=t[0],c=t[1],l=t[2],u=t[3];return e[0]=s*o+u*r+c*a-l*i,e[1]=c*o+u*i+l*r-s*a,e[2]=l*o+u*a+s*i-c*r,e[3]=u*o-s*r-c*i-l*a,s=t[4],c=t[5],l=t[6],u=t[7],e[4]=s*o+u*r+c*a-l*i,e[5]=c*o+u*i+l*r-s*a,e[6]=l*o+u*a+s*i-c*r,e[7]=u*o-s*r-c*i-l*a,e}function Sa(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*u+o*s+i*l-a*c,e[1]=i*u+o*c+a*s-r*l,e[2]=a*u+o*l+r*c-i*s,e[3]=o*u-r*s-i*c-a*l,s=n[4],c=n[5],l=n[6],u=n[7],e[4]=r*u+o*s+i*l-a*c,e[5]=i*u+o*c+a*s-r*l,e[6]=a*u+o*l+r*c-i*s,e[7]=o*u-r*s-i*c-a*l,e}function Ca(e,t,n,r){if(Math.abs(r)<1e-6)return da(e,t);var i=Math.hypot(n[0],n[1],n[2]);r*=.5;var a=Math.sin(r),o=a*n[0]/i,s=a*n[1]/i,c=a*n[2]/i,l=Math.cos(r),u=t[0],d=t[1],f=t[2],p=t[3];e[0]=u*l+p*o+d*c-f*s,e[1]=d*l+p*s+f*o-u*c,e[2]=f*l+p*c+u*s-d*o,e[3]=p*l-u*o-d*s-f*c;var m=t[4],h=t[5],g=t[6],_=t[7];return e[4]=m*l+_*o+h*c-g*s,e[5]=h*l+_*s+g*o-m*c,e[6]=g*l+_*c+m*s-h*o,e[7]=_*l-m*o-h*s-g*c,e}function wa(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e[4]=t[4]+n[4],e[5]=t[5]+n[5],e[6]=t[6]+n[6],e[7]=t[7]+n[7],e}function Ta(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3],s=n[4],c=n[5],l=n[6],u=n[7],d=t[4],f=t[5],p=t[6],m=t[7],h=n[0],g=n[1],_=n[2],v=n[3];return e[0]=r*v+o*h+i*_-a*g,e[1]=i*v+o*g+a*h-r*_,e[2]=a*v+o*_+r*g-i*h,e[3]=o*v-r*h-i*g-a*_,e[4]=r*u+o*s+i*l-a*c+d*v+m*h+f*_-p*g,e[5]=i*u+o*c+a*s-r*l+f*v+m*g+p*h-d*_,e[6]=a*u+o*l+r*c-i*s+p*v+m*_+d*g-f*h,e[7]=o*u-r*s-i*c-a*l+m*v-d*h-f*g-p*_,e}function Ea(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e}function Da(e,t,n,r){var i=1-r;return La(t,n)<0&&(r=-r),e[0]=t[0]*i+n[0]*r,e[1]=t[1]*i+n[1]*r,e[2]=t[2]*i+n[2]*r,e[3]=t[3]*i+n[3]*r,e[4]=t[4]*i+n[4]*r,e[5]=t[5]*i+n[5]*r,e[6]=t[6]*i+n[6]*r,e[7]=t[7]*i+n[7]*r,e}function Oa(e,t){var n=Ba(t);return e[0]=-t[0]/n,e[1]=-t[1]/n,e[2]=-t[2]/n,e[3]=t[3]/n,e[4]=-t[4]/n,e[5]=-t[5]/n,e[6]=-t[6]/n,e[7]=t[7]/n,e}function ka(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e[4]=-t[4],e[5]=-t[5],e[6]=-t[6],e[7]=t[7],e}function Aa(e,t){var n=Ba(t);if(n>0){n=Math.sqrt(n);var r=t[0]/n,i=t[1]/n,a=t[2]/n,o=t[3]/n,s=t[4],c=t[5],l=t[6],u=t[7],d=r*s+i*c+a*l+o*u;e[0]=r,e[1]=i,e[2]=a,e[3]=o,e[4]=(s-r*d)/n,e[5]=(c-i*d)/n,e[6]=(l-a*d)/n,e[7]=(u-o*d)/n}return e}function ja(e){return`quat2(`+e[0]+`, `+e[1]+`, `+e[2]+`, `+e[3]+`, `+e[4]+`, `+e[5]+`, `+e[6]+`, `+e[7]+`)`}function Ma(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]}function Na(e,t){var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],c=e[6],l=e[7],u=t[0],d=t[1],f=t[2],p=t[3],m=t[4],h=t[5],g=t[6],_=t[7];return Math.abs(n-u)<=1e-6*Math.max(1,Math.abs(n),Math.abs(u))&&Math.abs(r-d)<=1e-6*Math.max(1,Math.abs(r),Math.abs(d))&&Math.abs(i-f)<=1e-6*Math.max(1,Math.abs(i),Math.abs(f))&&Math.abs(a-p)<=1e-6*Math.max(1,Math.abs(a),Math.abs(p))&&Math.abs(o-m)<=1e-6*Math.max(1,Math.abs(o),Math.abs(m))&&Math.abs(s-h)<=1e-6*Math.max(1,Math.abs(s),Math.abs(h))&&Math.abs(c-g)<=1e-6*Math.max(1,Math.abs(c),Math.abs(g))&&Math.abs(l-_)<=1e-6*Math.max(1,Math.abs(l),Math.abs(_))}var Pa,Fa,Ia,La,Ra,za,Ba,Va,Ha=n((()=>{P(),ta(),kn(),Pa=Ri,Fa=Ri,Ia=Ta,La=Ui,Ra=Gi,za=Ra,Ba=qi,Va=Ba})),Ua=r({add:()=>Ya,angle:()=>Co,ceil:()=>$a,clone:()=>Ga,copy:()=>qa,create:()=>Wa,cross:()=>ho,dist:()=>Mo,distance:()=>oo,div:()=>jo,divide:()=>Qa,dot:()=>mo,equals:()=>Do,exactEquals:()=>Eo,floor:()=>eo,forEach:()=>Fo,fromValues:()=>Ka,inverse:()=>fo,len:()=>Oo,length:()=>co,lerp:()=>go,max:()=>no,min:()=>to,mul:()=>Ao,multiply:()=>Za,negate:()=>uo,normalize:()=>po,random:()=>_o,rotate:()=>So,round:()=>ro,scale:()=>io,scaleAndAdd:()=>ao,set:()=>Ja,sqrDist:()=>No,sqrLen:()=>Po,squaredDistance:()=>so,squaredLength:()=>lo,str:()=>To,sub:()=>ko,subtract:()=>Xa,transformMat2:()=>vo,transformMat2d:()=>yo,transformMat3:()=>bo,transformMat4:()=>xo,zero:()=>wo});function Wa(){var e=new M(2);return M!=Float32Array&&(e[0]=0,e[1]=0),e}function Ga(e){var t=new M(2);return t[0]=e[0],t[1]=e[1],t}function Ka(e,t){var n=new M(2);return n[0]=e,n[1]=t,n}function qa(e,t){return e[0]=t[0],e[1]=t[1],e}function Ja(e,t,n){return e[0]=t,e[1]=n,e}function Ya(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e}function Xa(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e}function Za(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e}function Qa(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e}function $a(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e}function eo(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e}function to(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e}function no(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e}function ro(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e}function io(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e}function ao(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e}function oo(e,t){var n=t[0]-e[0],r=t[1]-e[1];return Math.hypot(n,r)}function so(e,t){var n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r}function co(e){var t=e[0],n=e[1];return Math.hypot(t,n)}function lo(e){var t=e[0],n=e[1];return t*t+n*n}function uo(e,t){return e[0]=-t[0],e[1]=-t[1],e}function fo(e,t){return e[0]=1/t[0],e[1]=1/t[1],e}function po(e,t){var n=t[0],r=t[1],i=n*n+r*r;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e}function mo(e,t){return e[0]*t[0]+e[1]*t[1]}function ho(e,t,n){var r=t[0]*n[1]-t[1]*n[0];return e[0]=e[1]=0,e[2]=r,e}function go(e,t,n,r){var i=t[0],a=t[1];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e}function _o(e,t){t||=1;var n=N()*2*Math.PI;return e[0]=Math.cos(n)*t,e[1]=Math.sin(n)*t,e}function vo(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i,e[1]=n[1]*r+n[3]*i,e}function yo(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i+n[4],e[1]=n[1]*r+n[3]*i+n[5],e}function bo(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[3]*i+n[6],e[1]=n[1]*r+n[4]*i+n[7],e}function xo(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[4]*i+n[12],e[1]=n[1]*r+n[5]*i+n[13],e}function So(e,t,n,r){var i=t[0]-n[0],a=t[1]-n[1],o=Math.sin(r),s=Math.cos(r);return e[0]=i*s-a*o+n[0],e[1]=i*o+a*s+n[1],e}function Co(e,t){var n=e[0],r=e[1],i=t[0],a=t[1],o=Math.sqrt(n*n+r*r)*Math.sqrt(i*i+a*a),s=o&&(n*i+r*a)/o;return Math.acos(Math.min(Math.max(s,-1),1))}function wo(e){return e[0]=0,e[1]=0,e}function To(e){return`vec2(`+e[0]+`, `+e[1]+`)`}function Eo(e,t){return e[0]===t[0]&&e[1]===t[1]}function Do(e,t){var n=e[0],r=e[1],i=t[0],a=t[1];return Math.abs(n-i)<=1e-6*Math.max(1,Math.abs(n),Math.abs(i))&&Math.abs(r-a)<=1e-6*Math.max(1,Math.abs(r),Math.abs(a))}var Oo,ko,Ao,jo,Mo,No,Po,Fo,Io=n((()=>{P(),Oo=co,ko=Xa,Ao=Za,jo=Qa,Mo=oo,No=so,Po=lo,Fo=function(){var e=Wa();return function(t,n,r,i,a,o){var s,c;for(n||=2,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],a(e,e,o),t[s]=e[0],t[s+1]=e[1];return t}}()})),z=r({glMatrix:()=>k,mat2:()=>re,mat2d:()=>De,mat3:()=>et,mat4:()=>Pt,quat:()=>hi,quat2:()=>na,vec2:()=>Ua,vec3:()=>An,vec4:()=>Er}),B=n((()=>{P(),Ee(),$e(),Nt(),kn(),ta(),Ha(),Io(),Tr(),mi()})),Lo=i(((e,t)=>{function n(e,t,n){return Math.min(Math.max(e,t),n)}t.exports=n})),Ro=i(((e,n)=>{var r=Lo(),i=(B(),t(z)).vec4,a=(B(),t(z)).vec3,o=(B(),t(z)).mat4;function s(e,t,n){var r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw e.getShaderInfoLog(r);return r}function c(e,t,n,r,i){var a=s(e,e.VERTEX_SHADER,t),o=s(e,e.FRAGMENT_SHADER,n),c=e.createProgram();if(e.attachShader(c,a),e.attachShader(c,o),e.linkProgram(c),!e.getProgramParameter(c,e.LINK_STATUS))throw e.getProgramInfoLog(c);for(var l=0;l<r.length;l++){var u=r[l];if(c[u]=e.getAttribLocation(c,u),c[u]===-1)throw Error(`Shader program has no `+u+` attribute`)}for(var d=0;d<i.length;d++){var f=i[d];if(c[f]=e.getUniformLocation(c,f),c[f]===-1)throw Error(`Shader program has no `+f+` uniform`)}return c}function l(e,t){for(var n=e.getAttachedShaders(t),r=0;r<n.length;r++){var i=n[r];e.detachShader(t,i),e.deleteShader(i)}e.deleteProgram(t)}function u(e,t,n,r){var i=e.createBuffer();return e.bindBuffer(t,i),e.bufferData(t,r,n),i}function d(e,t,n,r){return{vertexIndices:u(e,e.ELEMENT_ARRAY_BUFFER,e.STATIC_DRAW,new Uint16Array(t)),vertexPositions:u(e,e.ARRAY_BUFFER,e.STATIC_DRAW,new Float32Array(n)),textureCoords:u(e,e.ARRAY_BUFFER,e.STATIC_DRAW,new Float32Array(r))}}function f(e,t){e.deleteBuffer(t.vertexIndices),e.deleteBuffer(t.vertexPositions),e.deleteBuffer(t.textureCoords)}function p(e,t){for(var n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES),r=0;r<n;r++)e.enableVertexAttribArray(r)}function m(e,t){for(var n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES),r=0;r<n;r++)e.disableVertexAttribArray(r)}function h(e,t,n){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n._texture),e.uniform1i(t.uSampler,0)}function g(e,t,n,r){var i=((n+1)*256-r)/65536;e.uniform1f(t.uDepth,i)}var _=1,v=i.create(),y=o.create();o.identity(y);function b(e,t,n){var r=_;t&&t.opacity!=null&&(r=t.opacity),e.uniform1f(n.opacity,r);var i=v;t&&t.colorOffset&&(i=t.colorOffset),e.uniform4fv(n.colorOffset,i);var a=y;t&&t.colorMatrix&&(a=t.colorMatrix),e.uniformMatrix4fv(n.colorMatrix,!1,a)}var x=a.create(),S=a.create();function C(e,t,n,i){if(n.x===0&&n.width===1&&n.y===0&&n.height===1)e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),o.identity(i);else{var s=n.x,c=r(s,0,1),l=c-s,u=1-c,d=r(n.width-l,0,u),f=n.width-d,p=1-n.height-n.y,m=r(p,0,1),h=m-p,g=1-m,_=r(n.height-h,0,g),v=n.height-_;a.set(S,n.width/d,n.height/_,1),a.set(x,(f-l)/d,(v-h)/_,0),o.identity(i),o.translate(i,i,x),o.scale(i,i,S),e.viewport(e.drawingBufferWidth*c,e.drawingBufferHeight*m,e.drawingBufferWidth*d,e.drawingBufferHeight*_)}}n.exports={createShaderProgram:c,destroyShaderProgram:l,createConstantBuffers:d,destroyConstantBuffers:f,enableAttributes:p,disableAttributes:m,setTexture:h,setDepth:g,setViewport:C,setupPixelEffectUniforms:b}})),zo=i(((e,t)=>{t.exports=[`attribute vec3 aVertexPosition;`,`attribute vec2 aTextureCoord;`,`uniform float uDepth;`,`uniform mat4 uViewportMatrix;`,`uniform mat4 uProjMatrix;`,`varying vec2 vTextureCoord;`,`void main(void) {`,`  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);`,`  gl_Position.z = uDepth * gl_Position.w;`,`  vTextureCoord = aTextureCoord;`,`}`].join(`
`)})),Bo=i(((e,t)=>{t.exports=[`#ifdef GL_FRAGMENT_PRECISION_HIGH`,`precision highp float;`,`#else`,`precision mediump float;`,`#endif`,`uniform sampler2D uSampler;`,`uniform float uOpacity;`,`uniform vec4 uColorOffset;`,`uniform mat4 uColorMatrix;`,`varying vec2 vTextureCoord;`,`void main(void) {`,`  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;`,`  gl_FragColor = vec4(color.rgba * uOpacity);`,`}`].join(`
`)})),Vo=i(((e,n)=>{var r=(B(),t(z)).mat4,i=(B(),t(z)).vec3,a=g(),o=Ro(),s=o.createConstantBuffers,c=o.destroyConstantBuffers,l=o.createShaderProgram,u=o.destroyShaderProgram,d=o.enableAttributes,f=o.disableAttributes,p=o.setViewport,m=o.setupPixelEffectUniforms,h=o.setDepth,_=o.setTexture,v=zo(),y=Bo(),b=[0,1,2,0,2,3],x=[-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],S=[0,0,1,0,1,1,0,1],C=[`aVertexPosition`,`aTextureCoord`],w=[`uDepth`,`uOpacity`,`uSampler`,`uProjMatrix`,`uViewportMatrix`,`uColorOffset`,`uColorMatrix`];function T(e){this.gl=e,this.projMatrix=r.create(),this.viewportMatrix=r.create(),this.translateVector=i.create(),this.scaleVector=i.create(),this.constantBuffers=s(e,b,x,S),this.shaderProgram=l(e,v,y,C,w)}T.prototype.destroy=function(){c(this.gl,this.constantBuffers),u(this.gl,this.shaderProgram),a(this)},T.prototype.startLayer=function(e,t){var n=this.gl,r=this.shaderProgram,i=this.constantBuffers,a=this.viewportMatrix;n.useProgram(r),d(n,r),p(n,e,t,a),n.uniformMatrix4fv(r.uViewportMatrix,!1,a),n.bindBuffer(n.ARRAY_BUFFER,i.vertexPositions),n.vertexAttribPointer(r.aVertexPosition,3,n.FLOAT,n.FALSE,0,0),n.bindBuffer(n.ARRAY_BUFFER,i.textureCoords),n.vertexAttribPointer(r.aTextureCoord,2,n.FLOAT,n.FALSE,0,0),m(n,e.effects(),{opacity:r.uOpacity,colorOffset:r.uColorOffset,colorMatrix:r.uColorMatrix})},T.prototype.endLayer=function(e,t){var n=this.gl,r=this.shaderProgram;f(n,r)},T.prototype.renderTile=function(e,t,n,i){var a=this.gl,o=this.shaderProgram,s=this.constantBuffers,c=this.projMatrix,l=this.translateVector,u=this.scaleVector;l[0]=e.centerX(),l[1]=e.centerY(),l[2]=-.5,u[0]=e.scaleX(),u[1]=e.scaleY(),u[2]=1,r.copy(c,n.view().projection()),r.rotateX(c,c,e.rotX()),r.rotateY(c,c,e.rotY()),r.translate(c,c,l),r.scale(c,c,u),a.uniformMatrix4fv(o.uProjMatrix,!1,c),h(a,o,i,e.z),_(a,o,t),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,s.vertexIndices),a.drawElements(a.TRIANGLES,b.length,a.UNSIGNED_SHORT,0)},n.exports=T})),Ho=i(((e,t)=>{var n=Vo(),r=x();function i(){this.constructor.super_.apply(this,arguments)}r(i,n),t.exports=i})),Uo=i(((e,t)=>{var n=Vo(),r=x();function i(){this.constructor.super_.apply(this,arguments)}r(i,n),t.exports=i})),Wo=i(((e,t)=>{t.exports=[`attribute vec3 aVertexPosition;`,`uniform float uDepth;`,`uniform mat4 uViewportMatrix;`,`uniform mat4 uInvProjMatrix;`,`varying vec4 vRay;`,`void main(void) {`,`  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);`,`  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);`,`}`].join(`
`)})),Go=i(((e,t)=>{t.exports=[`#ifdef GL_FRAGMENT_PRECISION_HIGH`,`precision highp float;`,`#else`,`precision mediump float`,`#endif`,`uniform sampler2D uSampler;`,`uniform float uOpacity;`,`uniform float uTextureX;`,`uniform float uTextureY;`,`uniform float uTextureWidth;`,`uniform float uTextureHeight;`,`uniform vec4 uColorOffset;`,`uniform mat4 uColorMatrix;`,`varying vec4 vRay;`,`const float PI = 3.14159265358979323846264;`,`void main(void) {`,`  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);`,`  float phi  = acos(vRay.y * r);`,`  float theta = atan(vRay.x, -1.0*vRay.z);`,`  float s = 0.5 + 0.5 * theta / PI;`,`  float t = 1.0 - phi / PI;`,`  s = s * uTextureWidth + uTextureX;`,`  t = t * uTextureHeight + uTextureY;`,`  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;`,`  gl_FragColor = vec4(color.rgba * uOpacity);`,`}`].join(`
`)})),Ko=i(((e,n)=>{var r=(B(),t(z)).mat4,i=g(),a=Ro(),o=a.createConstantBuffers,s=a.destroyConstantBuffers,c=a.createShaderProgram,l=a.destroyShaderProgram,u=a.enableAttributes,d=a.disableAttributes,f=a.setViewport,p=a.setupPixelEffectUniforms,m=a.setDepth,h=a.setTexture,_=Wo(),v=Go(),y=[0,1,2,0,2,3],b=[-1,-1,0,1,-1,0,1,1,0,-1,1,0],x=[0,0,1,0,1,1,0,1],S=[`aVertexPosition`],C=[`uDepth`,`uOpacity`,`uSampler`,`uInvProjMatrix`,`uViewportMatrix`,`uColorOffset`,`uColorMatrix`,`uTextureX`,`uTextureY`,`uTextureWidth`,`uTextureHeight`];function w(e){this.gl=e,this.invProjMatrix=r.create(),this.viewportMatrix=r.create(),this.constantBuffers=o(e,y,b,x),this.shaderProgram=c(e,_,v,S,C)}w.prototype.destroy=function(){s(this.gl,this.constantBuffers),l(this.gl,this.shaderProgram),i(this)},w.prototype.startLayer=function(e,t){var n=this.gl,i=this.shaderProgram,a=this.constantBuffers,o=this.invProjMatrix,s=this.viewportMatrix;n.useProgram(i),u(n,i),f(n,e,t,s),n.uniformMatrix4fv(i.uViewportMatrix,!1,s),n.bindBuffer(n.ARRAY_BUFFER,a.vertexPositions),n.vertexAttribPointer(i.aVertexPosition,3,n.FLOAT,n.FALSE,0,0),n.bindBuffer(n.ARRAY_BUFFER,a.textureCoords),r.copy(o,e.view().projection()),r.invert(o,o),n.uniformMatrix4fv(i.uInvProjMatrix,!1,o);var c=e.effects().textureCrop||{},l=c.x==null?0:c.x,d=c.y==null?0:c.y,m=c.width==null?1:c.width,h=c.height==null?1:c.height;n.uniform1f(i.uTextureX,l),n.uniform1f(i.uTextureY,d),n.uniform1f(i.uTextureWidth,m),n.uniform1f(i.uTextureHeight,h),p(n,e.effects(),{opacity:i.uOpacity,colorOffset:i.uColorOffset,colorMatrix:i.uColorMatrix})},w.prototype.endLayer=function(e,t){var n=this.gl,r=this.shaderProgram;d(n,r)},w.prototype.renderTile=function(e,t,n,r){var i=this.gl,a=this.shaderProgram,o=this.constantBuffers;m(i,a,r,e.z),h(i,a,t),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,o.vertexIndices),i.drawElements(i.TRIANGLES,y.length,i.UNSIGNED_SHORT,0)},n.exports=w})),qo=i(((e,t)=>{var n=Ho(),r=Uo(),i=Ko();function a(e){switch(e.type){case`webgl`:e.registerRenderer(`flat`,`flat`,r),e.registerRenderer(`cube`,`rectilinear`,n),e.registerRenderer(`equirect`,`rectilinear`,i);break;default:throw Error(`Unknown stage type: `+e.type)}}t.exports=a})),Jo=i(((e,t)=>{function n(){for(var e=0,t=0;t<arguments.length;t++){var n=arguments[t];e+=n,e+=n<<10,e^=n>>6}return e+=e<<3,e^=e>>11,e+=e<<15,e>=0?e:-e}t.exports=n})),Yo=i(((e,t)=>{function n(e,t){return(+e%(t=+t)+t)%t}t.exports=n})),Xo=i(((e,t)=>{var n=Yo(),r=64;function i(e){if(e!=null&&(!isFinite(e)||Math.floor(e)!==e||e<1))throw Error(`Set: invalid capacity`);this._capacity=this._capacity||r,this._buckets=[];for(var t=0;t<this._capacity;t++)this._buckets.push([]);this._size=0}i.prototype.add=function(e){for(var t=n(e.hash(),this._capacity),r=this._buckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return r[i]=e,a}return r.push(e),this._size++,null},i.prototype.remove=function(e){for(var t=n(e.hash(),this._capacity),r=this._buckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a)){for(var o=i;o<r.length-1;o++)r[o]=r[o+1];return--r.length,this._size--,a}}return null},i.prototype.has=function(e){for(var t=n(e.hash(),this._capacity),r=this._buckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return!0}return!1},i.prototype.size=function(){return this._size},i.prototype.clear=function(){for(var e=0;e<this._capacity;e++)this._buckets[e].length=0;this._size=0},i.prototype.forEach=function(e){for(var t=0,n=0;n<this._capacity;n++)for(var r=this._buckets[n],i=0;i<r.length;i++)e(r[i]),t+=1;return t},t.exports=i})),Zo=i(((e,t)=>{var n=Xo();function r(){this._stack=[],this._visited=new n,this._vertices=null}r.prototype.search=function(e,t,n){var r=this._stack,i=this._visited,a=this._vertices,o=0;for(this._clear(),r.push(t);r.length>0;){var s=r.pop();if(!i.has(s)&&e.intersects(s.vertices(a))){i.add(s);for(var c=s.neighbors(),l=0;l<c.length;l++)r.push(c[l]);n.push(s),o++}}return this._vertices=a,this._clear(),o},r.prototype._clear=function(){this._stack.length=0,this._visited.clear()},t.exports=r})),Qo=i(((e,t)=>{var n=Yo();function r(e){if(!isFinite(e)||Math.floor(e)!==e||e<0)throw Error(`LruMap: invalid capacity`);this._capacity=e,this._keys=Array(this._capacity),this._values=Array(this._capacity),this._start=0,this._size=0}r.prototype._index=function(e){return n(this._start+e,this._capacity)},r.prototype.get=function(e){for(var t=0;t<this._size;t++){var n=this._keys[this._index(t)];if(e.equals(n))return this._values[this._index(t)]}return null},r.prototype.set=function(e,t){if(this._capacity===0)return e;this.del(e);var n=this._size===this._capacity?this._keys[this._index(0)]:null;return this._keys[this._index(this._size)]=e,this._values[this._index(this._size)]=t,this._size<this._capacity?this._size++:this._start=this._index(1),n},r.prototype.del=function(e){for(var t=0;t<this._size;t++)if(e.equals(this._keys[this._index(t)])){for(var n=this._values[this._index(t)],r=t;r<this._size-1;r++)this._keys[this._index(r)]=this._keys[this._index(r+1)],this._values[this._index(r)]=this._values[this._index(r+1)];return this._size--,n}return null},r.prototype.has=function(e){for(var t=0;t<this._size;t++)if(e.equals(this._keys[this._index(t)]))return!0;return!1},r.prototype.size=function(){return this._size},r.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._start=0,this._size=0},r.prototype.forEach=function(e){for(var t=0,n=0;n<this._size;n++)e(this._keys[this._index(n)],this._values[this._index(n)]),t+=1;return t},t.exports=r})),$o=i(((e,t)=>{function n(e){this._fallbackOnly=!!e.fallbackOnly}n.prototype.numHorizontalTiles=function(){return Math.ceil(this.width()/this.tileWidth())},n.prototype.numVerticalTiles=function(){return Math.ceil(this.height()/this.tileHeight())},n.prototype.fallbackOnly=function(){return this._fallbackOnly},t.exports=n})),es=i(((e,t)=>{function n(e,t){return e<t?-1:+(e>t)}t.exports=n})),ts=i(((e,t)=>{var n=es();function r(e,t){for(var r=[],i=0;i<e.length;i++)r.push(new t(e[i]));return r.sort(function(e,t){return n(e.width(),t.width())}),r}function i(e){for(var t=[],n=0;n<e.length;n++)e[n]._fallbackOnly||t.push(e[n]);if(!t.length)throw Error(`No selectable levels in list`);return t}t.exports={makeLevelList:r,makeSelectableLevelList:i}})),ns=i(((e,t)=>{function n(e){var t=typeof e;if(t===`object`){if(e===null)return`null`;if(Object.prototype.toString.call(e)===`[object Array]`)return`array`;if(Object.prototype.toString.call(e)===`[object RegExp]`)return`regexp`}return t}t.exports=n})),rs=i(((e,n)=>{var r=x(),i=Jo(),a=Zo(),o=Qo(),s=$o(),c=ts().makeLevelList,l=ts().makeSelectableLevelList,u=Lo(),d=es(),f=ns(),p=(B(),t(z)).vec3,m=(B(),t(z)).vec4,h=64,g=`fudlrb`,_={f:{x:0,y:0},b:{x:0,y:Math.PI},l:{x:0,y:Math.PI/2},r:{x:0,y:-Math.PI/2},u:{x:Math.PI/2,y:0},d:{x:-Math.PI/2,y:0}},v=p.create();function y(e,t,n,r){t&&p.rotateZ(e,e,v,t),n&&p.rotateX(e,e,v,n),r&&p.rotateY(e,e,v,r)}for(var b={},S=0;S<g.length;S++){var C=g[S],w=_[C],T=p.fromValues(0,0,-1);y(T,0,w.x,w.y),b[C]=T}var E={f:[`l`,`r`,`u`,`d`],b:[`r`,`l`,`u`,`d`],l:[`b`,`f`,`u`,`d`],r:[`f`,`b`,`u`,`d`],u:[`l`,`r`,`b`,`f`],d:[`l`,`r`,`f`,`b`]},D=[[0,1],[1,0],[0,-1],[-1,0]];function O(e,t,n,r,i){this.face=e,this.x=t,this.y=n,this.z=r,this._geometry=i,this._level=i.levelList[r]}O.prototype.rotX=function(){return _[this.face].x},O.prototype.rotY=function(){return _[this.face].y},O.prototype.centerX=function(){return(this.x+.5)/this._level.numHorizontalTiles()-.5},O.prototype.centerY=function(){return .5-(this.y+.5)/this._level.numVerticalTiles()},O.prototype.scaleX=function(){return 1/this._level.numHorizontalTiles()},O.prototype.scaleY=function(){return 1/this._level.numVerticalTiles()},O.prototype.vertices=function(e){e||=[p.create(),p.create(),p.create(),p.create()];var t=_[this.face];function n(e,n,r){p.set(e,n,r,-.5),y(e,0,t.x,t.y)}var r=this.centerX()-this.scaleX()/2,i=this.centerX()+this.scaleX()/2,a=this.centerY()-this.scaleY()/2,o=this.centerY()+this.scaleY()/2;return n(e[0],r,o),n(e[1],i,o),n(e[2],i,a),n(e[3],r,a),e},O.prototype.parent=function(){if(this.z===0)return null;var e=this.face,t=this.z,n=this.x,r=this.y,i=this._geometry,a=i.levelList[t],o=i.levelList[t-1];return new O(e,Math.floor(n/a.numHorizontalTiles()*o.numHorizontalTiles()),Math.floor(r/a.numVerticalTiles()*o.numVerticalTiles()),t-1,i)},O.prototype.children=function(e){if(this.z===this._geometry.levelList.length-1)return null;var t=this.face,n=this.z,r=this.x,i=this.y,a=this._geometry,o=a.levelList[n],s=a.levelList[n+1],c=s.numHorizontalTiles()/o.numHorizontalTiles(),l=s.numVerticalTiles()/o.numVerticalTiles();e||=[];for(var u=0;u<c;u++)for(var d=0;d<l;d++){var f=c*r+u,p=l*i+d,m=n+1;e.push(new O(t,f,p,m,a))}return e},O.prototype.neighbors=function(){var e=this._geometry,t=e._neighborsCache,n=t.get(this);if(n)return n;for(var r=e._vec,i=this.face,a=this.x,o=this.y,s=this.z,c=this._level,l=c.numHorizontalTiles(),d=c.numVerticalTiles(),f=[],m=0;m<D.length;m++){var h=D[m][0],g=D[m][1],v=a+h,b=o+g,x=s,S=i;if(v<0||v>=l||b<0||b>=d){var C=this.centerX(),w=this.centerY();v<0?(p.set(r,-.5,w,-.5),S=E[i][0]):v>=l?(p.set(r,.5,w,-.5),S=E[i][1]):b<0?(p.set(r,C,.5,-.5),S=E[i][2]):b>=d&&(p.set(r,C,-.5,-.5),S=E[i][3]);var T=_[i];y(r,0,T.x,T.y),T=_[S],y(r,0,-T.x,-T.y),v=u(Math.floor((.5+r[0])*l),0,l-1),b=u(Math.floor((.5-r[1])*d),0,d-1)}f.push(new O(S,v,b,x,e))}return t.set(this,f),f},O.prototype.hash=function(){return i(g.indexOf(this.face),this.z,this.y,this.x)},O.prototype.equals=function(e){return this._geometry===e._geometry&&this.face===e.face&&this.z===e.z&&this.y===e.y&&this.x===e.x},O.prototype.cmp=function(e){return d(this.z,e.z)||d(g.indexOf(this.face),g.indexOf(e.face))||d(this.y,e.y)||d(this.x,e.x)},O.prototype.str=function(){return`CubeTile(`+tile.face+`, `+tile.x+`, `+tile.y+`, `+tile.z+`)`};function k(e){if(this.constructor.super_.call(this,e),this._size=e.size,this._tileSize=e.tileSize,this._size%this._tileSize!==0)throw Error(`Level size is not multiple of tile size: `+this._size+` `+this._tileSize)}r(k,s),k.prototype.width=function(){return this._size},k.prototype.height=function(){return this._size},k.prototype.tileWidth=function(){return this._tileSize},k.prototype.tileHeight=function(){return this._tileSize},k.prototype._validateWithParentLevel=function(e){var t=this.width(),n=this.height(),r=this.tileWidth(),i=this.tileHeight(),a=this.numHorizontalTiles(),o=this.numVerticalTiles(),s=e.width(),c=e.height(),l=e.tileWidth(),u=e.tileHeight(),d=e.numHorizontalTiles(),f=e.numVerticalTiles();if(t%s!==0)throw Error(`Level width must be multiple of parent level: `+t+` vs. `+s);if(n%c!==0)throw Error(`Level height must be multiple of parent level: `+n+` vs. `+c);if(a%d!==0)throw Error(`Number of horizontal tiles must be multiple of parent level: `+a+` (`+t+`/`+r+`) vs. `+d+` (`+s+`/`+l+`)`);if(o%f!==0)throw Error(`Number of vertical tiles must be multiple of parent level: `+o+` (`+n+`/`+i+`) vs. `+f+` (`+c+`/`+u+`)`)};function A(e){if(f(e)!==`array`)throw Error(`Level list must be an array`);this.levelList=c(e,k),this.selectableLevelList=l(this.levelList);for(var t=1;t<this.levelList.length;t++)this.levelList[t]._validateWithParentLevel(this.levelList[t-1]);this._tileSearcher=new a(this),this._neighborsCache=new o(h),this._vec=m.create(),this._viewSize={}}A.prototype.maxTileSize=function(){for(var e=0,t=0;t<this.levelList.length;t++){var n=this.levelList[t];e=Math.max(e,n.tileWidth,n.tileHeight)}return e},A.prototype.levelTiles=function(e,t){var n=this.levelList.indexOf(e),r=e.numHorizontalTiles()-1,i=e.numVerticalTiles()-1;t||=[];for(var a=0;a<g.length;a++)for(var o=g[a],s=0;s<=r;s++)for(var c=0;c<=i;c++)t.push(new O(o,s,c,n,this));return t},A.prototype._closestTile=function(e,t){var n=this._vec;m.set(n,0,0,1,1),m.transformMat4(n,n,e.inverseProjection());var r=1/0,i=null;for(var a in b){var o=b[a],s=1-p.dot(o,n);s<r&&(r=s,i=a)}for(var c=Math.max(Math.abs(n[0]),Math.abs(n[1]),Math.abs(n[2]))/.5,l=0;l<3;l++)n[l]=n[l]/c;var d=_[i];y(n,0,-d.x,-d.y);var f=this.levelList.indexOf(t),h=t.numHorizontalTiles(),g=t.numVerticalTiles(),v=u(Math.floor((.5+n[0])*h),0,h-1),x=u(Math.floor((.5-n[1])*g),0,g-1);return new O(i,v,x,f,this)},A.prototype.visibleTiles=function(e,t,n){var r=this._viewSize,i=this._tileSearcher;if(n||=[],e.size(r),r.width===0||r.height===0)return n;var a=this._closestTile(e,t);if(!i.search(e,a,n))throw Error(`Starting tile is not visible`);return n},A.Tile=A.prototype.Tile=O,A.type=A.prototype.type=`cube`,O.type=O.prototype.type=`cube`,n.exports=A})),is=i(((e,n)=>{var r=x(),i=Jo(),a=Zo(),o=Qo(),s=$o(),c=ts().makeLevelList,l=ts().makeSelectableLevelList,u=Lo(),d=Yo(),f=es(),p=ns(),m=(B(),t(z)).vec2,h=(B(),t(z)).vec4,g=64,_=[[0,1],[1,0],[0,-1],[-1,0]];function v(e,t,n,r){this.x=e,this.y=t,this.z=n,this._geometry=r,this._level=r.levelList[n]}v.prototype.rotX=function(){return 0},v.prototype.rotY=function(){return 0},v.prototype.centerX=function(){var e=this._level.width(),t=this._level.tileWidth();return(this.x*t+.5*this.width())/e-.5},v.prototype.centerY=function(){var e=this._level.height(),t=this._level.tileHeight();return .5-(this.y*t+.5*this.height())/e},v.prototype.scaleX=function(){var e=this._level.width();return this.width()/e},v.prototype.scaleY=function(){var e=this._level.height();return this.height()/e},v.prototype.width=function(){var e=this._level.width(),t=this._level.tileWidth();return this.x===this._level.numHorizontalTiles()-1&&d(e,t)||t},v.prototype.height=function(){var e=this._level.height(),t=this._level.tileHeight();return this.y===this._level.numVerticalTiles()-1&&d(e,t)||t},v.prototype.levelWidth=function(){return this._level.width()},v.prototype.levelHeight=function(){return this._level.height()},v.prototype.vertices=function(e){e||=[m.create(),m.create(),m.create(),m.create()];var t=this.centerX()-this.scaleX()/2,n=this.centerX()+this.scaleX()/2,r=this.centerY()-this.scaleY()/2,i=this.centerY()+this.scaleY()/2;return m.set(e[0],t,i),m.set(e[1],n,i),m.set(e[2],n,r),m.set(e[3],t,r),e},v.prototype.parent=function(){if(this.z===0)return null;var e=this._geometry,t=this.z-1;return new v(Math.floor(this.x/2),Math.floor(this.y/2),t,e)},v.prototype.children=function(e){if(this.z===this._geometry.levelList.length-1)return null;var t=this._geometry,n=this.z+1;return e||=[],e.push(new v(2*this.x,2*this.y,n,t)),e.push(new v(2*this.x,2*this.y+1,n,t)),e.push(new v(2*this.x+1,2*this.y,n,t)),e.push(new v(2*this.x+1,2*this.y+1,n,t)),e},v.prototype.neighbors=function(){var e=this._geometry,t=e._neighborsCache,n=t.get(this);if(n)return n;for(var r=this.x,i=this.y,a=this.z,o=this._level,s=o.numHorizontalTiles()-1,c=o.numVerticalTiles()-1,l=[],u=0;u<_.length;u++){var d=_[u][0],f=_[u][1],p=r+d,m=i+f,h=a;0<=p&&p<=s&&0<=m&&m<=c&&l.push(new v(p,m,h,e))}return t.set(this,l),l},v.prototype.hash=function(){return i(this.z,this.y,this.x)},v.prototype.equals=function(e){return this._geometry===e._geometry&&this.z===e.z&&this.y===e.y&&this.x===e.x},v.prototype.cmp=function(e){return f(this.z,e.z)||f(this.y,e.y)||f(this.x,e.x)},v.prototype.str=function(){return`FlatTile(`+tile.x+`, `+tile.y+`, `+tile.z+`)`};function y(e){this.constructor.super_.call(this,e),this._width=e.width,this._height=e.height,this._tileWidth=e.tileWidth,this._tileHeight=e.tileHeight}r(y,s),y.prototype.width=function(){return this._width},y.prototype.height=function(){return this._height},y.prototype.tileWidth=function(){return this._tileWidth},y.prototype.tileHeight=function(){return this._tileHeight},y.prototype._validateWithParentLevel=function(e){var t=this.width(),n=this.height(),r=this.tileWidth(),i=this.tileHeight(),a=e.width(),o=e.height(),s=e.tileWidth(),c=e.tileHeight();if(t%a!==0)return Error(`Level width must be multiple of parent level: `+t+` vs. `+a);if(n%o!==0)return Error(`Level height must be multiple of parent level: `+n+` vs. `+o);if(r%s!==0)return Error(`Level tile width must be multiple of parent level: `+r+` vs. `+s);if(i%c!==0)return Error(`Level tile height must be multiple of parent level: `+i+` vs. `+c)};function b(e){if(p(e)!==`array`)throw Error(`Level list must be an array`);this.levelList=c(e,y),this.selectableLevelList=l(this.levelList);for(var t=1;t<this.levelList.length;t++)this.levelList[t]._validateWithParentLevel(this.levelList[t-1]);this._tileSearcher=new a(this),this._neighborsCache=new o(g),this._vec=h.create(),this._viewSize={}}b.prototype.maxTileSize=function(){for(var e=0,t=0;t<this.levelList.length;t++){var n=this.levelList[t];e=Math.max(e,n.tileWidth,n.tileHeight)}return e},b.prototype.levelTiles=function(e,t){var n=this.levelList.indexOf(e),r=e.numHorizontalTiles()-1,i=e.numVerticalTiles()-1;t||=[];for(var a=0;a<=r;a++)for(var o=0;o<=i;o++)t.push(new v(a,o,n,this));return t},b.prototype._closestTile=function(e,t){var n=this._vec;h.set(n,0,0,1,1),h.transformMat4(n,n,e.inverseProjection());var r=.5+n[0],i=.5-n[1],a=this.levelList.indexOf(t),o=t.width(),s=t.height(),c=t.tileWidth(),l=t.tileHeight(),d=t.numHorizontalTiles(),f=t.numVerticalTiles();return new v(u(Math.floor(r*o/c),0,d-1),u(Math.floor(i*s/l),0,f-1),a,this)},b.prototype.visibleTiles=function(e,t,n){var r=this._viewSize,i=this._tileSearcher;if(n||=[],e.size(r),r.width===0||r.height===0)return n;var a=this._closestTile(e,t);if(!i.search(e,a,n))throw Error(`Starting tile is not visible`);return n},b.Tile=b.prototype.Tile=v,b.type=b.prototype.type=`flat`,v.type=v.prototype.type=`flat`,n.exports=b})),as=i(((e,t)=>{var n=x(),r=Jo(),i=es(),a=ts(),o=$o(),s=ns();function c(e,t){this.z=e,this._geometry=t,this._level=t.levelList[e]}c.prototype.rotX=function(){return 0},c.prototype.rotY=function(){return 0},c.prototype.centerX=function(){return .5},c.prototype.centerY=function(){return .5},c.prototype.scaleX=function(){return 1},c.prototype.scaleY=function(){return 1},c.prototype.parent=function(){return this.z===0?null:new c(this.z-1,this._geometry)},c.prototype.children=function(e){return this.z===this._geometry.levelList.length-1?null:(e||=[],e.push(new c(this.z+1,this._geometry)),e)},c.prototype.neighbors=function(){return[]},c.prototype.hash=function(){return r(this.z)},c.prototype.equals=function(e){return this._geometry===e._geometry&&this.z===e.z},c.prototype.cmp=function(e){return i(this.z,e.z)},c.prototype.str=function(){return`EquirectTile(`+tile.z+`)`};function l(e){this.constructor.super_.call(this,e),this._width=e.width}n(l,o),l.prototype.width=function(){return this._width},l.prototype.height=function(){return this._width/2},l.prototype.tileWidth=function(){return this._width},l.prototype.tileHeight=function(){return this._width/2};function u(e){if(s(e)!==`array`)throw Error(`Level list must be an array`);this.levelList=a.makeLevelList(e,l),this.selectableLevelList=a.makeSelectableLevelList(this.levelList)}u.prototype.maxTileSize=function(){for(var e=0,t=0;t<this.levelList.length;t++){var n=this.levelList[t];e=Math.max(e,n.tileWidth,n.tileHeight)}return e},u.prototype.levelTiles=function(e,t){var n=this.levelList.indexOf(e);return t||=[],t.push(new c(n,this)),t},u.prototype.visibleTiles=function(e,t,n){var r=new c(this.levelList.indexOf(t),this);n||=[],n.length=0,n.push(r)},u.Tile=u.prototype.Tile=c,u.type=u.prototype.type=`equirect`,c.type=c.prototype.type=`equirect`,t.exports=u})),os=i(((e,t)=>{function n(e,t,n){return 2*Math.atan(n*Math.tan(e/2)/t)}function r(e,t,r){return n(e,t,r)}function i(e,t,r){return n(e,t,Math.sqrt(t*t+r*r))}function a(e,t,r){return n(e,r,t)}function o(e,t,r){return n(e,r,Math.sqrt(t*t+r*r))}function s(e,t,r){return n(e,Math.sqrt(t*t+r*r),t)}function c(e,t,r){return n(e,Math.sqrt(t*t+r*r),r)}t.exports={convert:n,htov:r,htod:i,vtoh:a,vtod:o,dtoh:s,dtov:c}})),ss=i(((e,t)=>{function n(e){return typeof e==`number`&&isFinite(e)}t.exports=n})),cs=i(((e,t)=>{function n(e){return e.toPrecision(15)}t.exports=n})),ls=i(((e,t)=>{function n(){var e=arguments;return function(t){for(var n=t,r=0;r<e.length;r++)n=e[r].call(null,n);return n}}t.exports=n})),us=i(((e,n)=>{var r=l(),i=(B(),t(z)).mat4,a=(B(),t(z)).vec4,o=T(),s=os(),c=Yo(),u=ss(),d=Lo(),f=cs(),p=ls(),m=g(),h=0,_=0,v=0,y=0,b=0,x=Math.PI/4,S=0,C=0,w=1e-6;function E(e,t){this._yaw=e&&e.yaw!=null?e.yaw:v,this._pitch=e&&e.pitch!=null?e.pitch:y,this._roll=e&&e.roll!=null?e.roll:b,this._fov=e&&e.fov!=null?e.fov:x,this._width=e&&e.width!=null?e.width:h,this._height=e&&e.height!=null?e.height:_,this._projectionCenterX=e&&e.projectionCenterX!=null?e.projectionCenterX:S,this._projectionCenterY=e&&e.projectionCenterY!=null?e.projectionCenterY:C,this._limiter=t||null,this._projMatrix=i.create(),this._invProjMatrix=i.create(),this._frustum=[a.create(),a.create(),a.create(),a.create(),a.create()],this._projectionChanged=!0,this._params={},this._fovs={},this._tmpVec=a.create(),this._update()}r(E),E.prototype.destroy=function(){m(this)},E.prototype.yaw=function(){return this._yaw},E.prototype.pitch=function(){return this._pitch},E.prototype.roll=function(){return this._roll},E.prototype.projectionCenterX=function(){return this._projectionCenterX},E.prototype.projectionCenterY=function(){return this._projectionCenterY},E.prototype.fov=function(){return this._fov},E.prototype.width=function(){return this._width},E.prototype.height=function(){return this._height},E.prototype.size=function(e){return e||={},e.width=this._width,e.height=this._height,e},E.prototype.parameters=function(e){return e||={},e.yaw=this._yaw,e.pitch=this._pitch,e.roll=this._roll,e.fov=this._fov,e},E.prototype.limiter=function(){return this._limiter},E.prototype.setYaw=function(e){this._resetParams(),this._params.yaw=e,this._update(this._params)},E.prototype.setPitch=function(e){this._resetParams(),this._params.pitch=e,this._update(this._params)},E.prototype.setRoll=function(e){this._resetParams(),this._params.roll=e,this._update(this._params)},E.prototype.setFov=function(e){this._resetParams(),this._params.fov=e,this._update(this._params)},E.prototype.setProjectionCenterX=function(e){this._resetParams(),this._params.projectionCenterX=e,this._update(this._params)},E.prototype.setProjectionCenterY=function(e){this._resetParams(),this._params.projectionCenterY=e,this._update(this._params)},E.prototype.offsetYaw=function(e){this.setYaw(this._yaw+e)},E.prototype.offsetPitch=function(e){this.setPitch(this._pitch+e)},E.prototype.offsetRoll=function(e){this.setRoll(this._roll+e)},E.prototype.offsetFov=function(e){this.setFov(this._fov+e)},E.prototype.setSize=function(e){this._resetParams(),this._params.width=e.width,this._params.height=e.height,this._update(this._params)},E.prototype.setParameters=function(e){this._resetParams(),this._params.yaw=e.yaw,this._params.pitch=e.pitch,this._params.roll=e.roll,this._params.fov=e.fov,this._params.projectionCenterX=e.projectionCenterX,this._params.projectionCenterY=e.projectionCenterY,this._update(this._params)},E.prototype.setLimiter=function(e){this._limiter=e||null,this._update()},E.prototype._resetParams=function(){var e=this._params;e.yaw=null,e.pitch=null,e.roll=null,e.fov=null,e.width=null,e.height=null},E.prototype._update=function(e){e??=(this._resetParams(),this._params);var t=this._yaw,n=this._pitch,r=this._roll,i=this._fov,a=this._projectionCenterX,o=this._projectionCenterY,s=this._width,c=this._height;if(e.yaw=e.yaw==null?t:e.yaw,e.pitch=e.pitch==null?n:e.pitch,e.roll=e.roll==null?r:e.roll,e.fov=e.fov==null?i:e.fov,e.width=e.width==null?s:e.width,e.height=e.height==null?c:e.height,e.projectionCenterX=e.projectionCenterX==null?a:e.projectionCenterX,e.projectionCenterY=e.projectionCenterY==null?o:e.projectionCenterY,this._limiter&&(e=this._limiter(e),!e))throw Error(`Bad view limiter`);e=this._normalize(e);var l=e.yaw,d=e.pitch,f=e.roll,p=e.fov,m=e.width,h=e.height,g=e.projectionCenterX,_=e.projectionCenterY;if(!u(l)||!u(d)||!u(f)||!u(p)||!u(m)||!u(h)||!u(g)||!u(_))throw Error(`Bad view - suspect a broken limiter`);this._yaw=l,this._pitch=d,this._roll=f,this._fov=p,this._width=m,this._height=h,this._projectionCenterX=g,this._projectionCenterY=_,(l!==t||d!==n||f!==r||p!==i||m!==s||h!==c||g!==a||_!==o)&&(this._projectionChanged=!0,this.emit(`change`)),(m!==s||h!==c)&&this.emit(`resize`)},E.prototype._normalize=function(e){this._normalizeCoordinates(e);var t=s.htov(Math.PI,e.width,e.height),n=isNaN(t)?Math.PI:Math.min(Math.PI,t);return e.fov=d(e.fov,w,n-w),e},E.prototype._normalizeCoordinates=function(e){return`yaw`in e&&(e.yaw=c(e.yaw-Math.PI,-2*Math.PI)+Math.PI),`pitch`in e&&(e.pitch=c(e.pitch-Math.PI,-2*Math.PI)+Math.PI),`roll`in e&&(e.roll=c(e.roll-Math.PI,-2*Math.PI)+Math.PI),e},E.prototype.normalizeToClosest=function(e,t){var n=this._yaw,r=this._pitch,i=e.yaw,a=e.pitch,o=i-2*Math.PI,s=i+2*Math.PI;Math.abs(o-n)<Math.abs(i-n)?i=o:Math.abs(s-n)<Math.abs(i-n)&&(i=s);var c=a-2*Math.PI,l=a+2*Math.PI;return Math.abs(c-r)<Math.abs(a-r)?a=c:Math.abs(c-r)<Math.abs(a-r)&&(a=l),t||={},t.yaw=i,t.pitch=a,t},E.prototype.updateWithControlParameters=function(e){var t=this._fov,n=s.vtoh(t,this._width,this._height);isNaN(n)&&(n=t),this.offsetYaw(e.axisScaledX*n+e.x*2*n+e.yaw),this.offsetPitch(e.axisScaledY*t+e.y*2*n+e.pitch),this.offsetRoll(-e.roll),this.offsetFov(e.zoom*t)},E.prototype._updateProjection=function(){var e=this._projMatrix,t=this._invProjMatrix,n=this._frustum;if(this._projectionChanged){var r=this._width,a=this._height,o=this._fov,c=s.vtoh(o,r,a),l=r/a,u=this._projectionCenterX,d=this._projectionCenterY;if(u!==0||d!==0){var f=Math.atan(u*2*Math.tan(c/2)),p=Math.atan(d*2*Math.tan(o/2)),m=this._fovs;m.leftDegrees=(c/2+f)*180/Math.PI,m.rightDegrees=(c/2-f)*180/Math.PI,m.upDegrees=(o/2+p)*180/Math.PI,m.downDegrees=(o/2-p)*180/Math.PI,i.perspectiveFromFieldOfView(e,m,-1,1)}else i.perspective(e,o,l,-1,1);i.rotateZ(e,e,this._roll),i.rotateX(e,e,this._pitch),i.rotateY(e,e,this._yaw),i.invert(t,e),this._matrixToFrustum(e,n),this._projectionChanged=!1}},E.prototype._matrixToFrustum=function(e,t){a.set(t[0],e[3]+e[0],e[7]+e[4],e[11]+e[8],0),a.set(t[1],e[3]-e[0],e[7]-e[4],e[11]-e[8],0),a.set(t[2],e[3]+e[1],e[7]+e[5],e[11]+e[9],0),a.set(t[3],e[3]-e[1],e[7]-e[5],e[11]-e[9],0),a.set(t[4],e[3]+e[2],e[7]+e[6],e[11]+e[10],0)},E.prototype.projection=function(){return this._updateProjection(),this._projMatrix},E.prototype.inverseProjection=function(){return this._updateProjection(),this._invProjMatrix},E.prototype.intersects=function(e){this._updateProjection();for(var t=this._frustum,n=this._tmpVec,r=0;r<t.length;r++){for(var i=t[r],o=!1,s=0;s<e.length;s++){var c=e[s];a.set(n,c[0],c[1],c[2],0),a.dot(i,n)>=0&&(o=!0)}if(!o)return!1}return!0},E.prototype.selectLevel=function(e){for(var t=o()*this._height,n=Math.tan(.5*this._fov),r=0;r<e.length;r++){var i=e[r];if(n*i.height()>=t)return i}return e[e.length-1]},E.prototype.coordinatesToScreen=function(e,t){var n=this._tmpVec;t||={};var r=this._width,i=this._height;if(r<=0||i<=0)return t.x=null,t.y=null,null;var o=e.yaw,s=e.pitch,c=Math.sin(o)*Math.cos(s),l=-Math.sin(s),u=-Math.cos(o)*Math.cos(s);if(a.set(n,c,l,u,1),a.transformMat4(n,n,this.projection()),n[3]>=0)t.x=r*(n[0]/n[3]+1)/2,t.y=i*(1-n[1]/n[3])/2;else return t.x=null,t.y=null,null;return t},E.prototype.screenToCoordinates=function(e,t){var n=this._tmpVec;t||={};var r=this._width,i=this._height,o=2*e.x/r-1,s=1-2*e.y/i;a.set(n,o,s,1,1),a.transformMat4(n,n,this.inverseProjection());var c=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);return t.yaw=Math.atan2(n[0],-n[2]),t.pitch=Math.acos(n[1]/c)-Math.PI/2,this._normalizeCoordinates(t),t},E.prototype.coordinatesToPerspectiveTransform=function(e,t,n){n||=``;var r=this._height,i=this._width,a=this._fov,o=.5*r/Math.tan(a/2),s=``;return s+=`translateX(`+f(i/2)+`px) `,s+=`translateY(`+f(r/2)+`px) `,s+=`translateX(-50%) translateY(-50%) `,s+=`perspective(`+f(o)+`px) `,s+=`translateZ(`+f(o)+`px) `,s+=`rotateZ(`+f(-this._roll)+`rad) `,s+=`rotateX(`+f(-this._pitch)+`rad) `,s+=`rotateY(`+f(this._yaw)+`rad) `,s+=`rotateY(`+f(-e.yaw)+`rad) `,s+=`rotateX(`+f(e.pitch)+`rad) `,s+=`translateZ(`+f(-t)+`px) `,s+=n+` `,s},E.limit={yaw:function(e,t){return function(n){return n.yaw=d(n.yaw,e,t),n}},pitch:function(e,t){return function(n){return n.pitch=d(n.pitch,e,t),n}},roll:function(e,t){return function(n){return n.roll=d(n.roll,e,t),n}},hfov:function(e,t){return function(n){var r=n.width,i=n.height;if(r>0&&i>0){var a=s.htov(e,r,i),o=s.htov(t,r,i);n.fov=d(n.fov,a,o)}return n}},vfov:function(e,t){return function(n){return n.fov=d(n.fov,e,t),n}},resolution:function(e){return function(t){var n=t.height;if(n){var r=o()*n,i=2*Math.atan(r/e);t.fov=d(t.fov,i,1/0)}return t}},traditional:function(e,t,n){return n??=t,p(E.limit.resolution(e),E.limit.vfov(0,t),E.limit.hfov(0,n),E.limit.pitch(-Math.PI/2,Math.PI/2))}},E.type=E.prototype.type=`rectilinear`,n.exports=E})),ds=i(((e,n)=>{var r=l(),i=(B(),t(z)).mat4,a=(B(),t(z)).vec4,o=T(),s=ss(),c=Lo(),u=g(),d=0,f=0,p=.5,m=.5,h=1,_=[1,0,1,0],v=[-1,-1,1,1],y=1e-6;function b(e,t){if(!(e&&e.mediaAspectRatio!=null))throw Error(`mediaAspectRatio must be defined`);this._x=e&&e.x!=null?e.x:p,this._y=e&&e.y!=null?e.y:m,this._zoom=e&&e.zoom!=null?e.zoom:h,this._mediaAspectRatio=e.mediaAspectRatio,this._width=e&&e.width!=null?e.width:d,this._height=e&&e.height!=null?e.height:f,this._limiter=t||null,this._projMatrix=i.create(),this._invProjMatrix=i.create(),this._frustum=[0,0,0,0],this._projectionChanged=!0,this._params={},this._vec=a.create(),this._update()}r(b),b.prototype.destroy=function(){u(this)},b.prototype.x=function(){return this._x},b.prototype.y=function(){return this._y},b.prototype.zoom=function(){return this._zoom},b.prototype.mediaAspectRatio=function(){return this._mediaAspectRatio},b.prototype.width=function(){return this._width},b.prototype.height=function(){return this._height},b.prototype.size=function(e){return e||={},e.width=this._width,e.height=this._height,e},b.prototype.parameters=function(e){return e||={},e.x=this._x,e.y=this._y,e.zoom=this._zoom,e.mediaAspectRatio=this._mediaAspectRatio,e},b.prototype.limiter=function(){return this._limiter},b.prototype.setX=function(e){this._resetParams(),this._params.x=e,this._update(this._params)},b.prototype.setY=function(e){this._resetParams(),this._params.y=e,this._update(this._params)},b.prototype.setZoom=function(e){this._resetParams(),this._params.zoom=e,this._update(this._params)},b.prototype.offsetX=function(e){this.setX(this._x+e)},b.prototype.offsetY=function(e){this.setY(this._y+e)},b.prototype.offsetZoom=function(e){this.setZoom(this._zoom+e)},b.prototype.setMediaAspectRatio=function(e){this._resetParams(),this._params.mediaAspectRatio=e,this._update(this._params)},b.prototype.setSize=function(e){this._resetParams(),this._params.width=e.width,this._params.height=e.height,this._update(this._params)},b.prototype.setParameters=function(e){this._resetParams(),this._params.x=e.x,this._params.y=e.y,this._params.zoom=e.zoom,this._params.mediaAspectRatio=e.mediaAspectRatio,this._update(this._params)},b.prototype.setLimiter=function(e){this._limiter=e||null,this._update()},b.prototype._resetParams=function(){var e=this._params;e.x=null,e.y=null,e.zoom=null,e.mediaAspectRatio=null,e.width=null,e.height=null},b.prototype._update=function(e){e??=(this._resetParams(),this._params);var t=this._x,n=this._y,r=this._zoom,i=this._mediaAspectRatio,a=this._width,o=this._height;if(e.x=e.x==null?t:e.x,e.y=e.y==null?n:e.y,e.zoom=e.zoom==null?r:e.zoom,e.mediaAspectRatio=e.mediaAspectRatio==null?i:e.mediaAspectRatio,e.width=e.width==null?a:e.width,e.height=e.height==null?o:e.height,this._limiter&&(e=this._limiter(e),!e))throw Error(`Bad view limiter`);var l=e.x,u=e.y,d=e.zoom,f=e.mediaAspectRatio,p=e.width,m=e.height;if(!s(l)||!s(u)||!s(d)||!s(f)||!s(p)||!s(m))throw Error(`Bad view - suspect a broken limiter`);d=c(d,y,1/0),this._x=l,this._y=u,this._zoom=d,this._mediaAspectRatio=f,this._width=p,this._height=m,(l!==t||u!==n||d!==r||f!==i||p!==a||m!==o)&&(this._projectionChanged=!0,this.emit(`change`)),(p!==a||m!==o)&&this.emit(`resize`)},b.prototype._zoomX=function(){return this._zoom},b.prototype._zoomY=function(){var e=this._mediaAspectRatio,t=this._width/this._height,n=this._zoom,r=n*e/t;return isNaN(r)&&(r=n),r},b.prototype.updateWithControlParameters=function(e){var t=this.zoom(),n=this._zoomX(),r=this._zoomY();this.offsetX(e.axisScaledX*n+e.x*t),this.offsetY(e.axisScaledY*r+e.y*t),this.offsetZoom(e.zoom*t)},b.prototype._updateProjection=function(){var e=this._projMatrix,t=this._invProjMatrix,n=this._frustum;if(this._projectionChanged){var r=this._x,a=this._y,o=this._zoomX(),s=this._zoomY(),c=n[0]=.5-a+.5*s,l=n[1]=r-.5+.5*o,u=n[2]=.5-a-.5*s,d=n[3]=r-.5-.5*o;i.ortho(e,d,l,u,c,-1,1),i.invert(t,e),this._projectionChanged=!1}},b.prototype.projection=function(){return this._updateProjection(),this._projMatrix},b.prototype.inverseProjection=function(){return this._updateProjection(),this._invProjMatrix},b.prototype.intersects=function(e){this._updateProjection();for(var t=this._frustum,n=0;n<t.length;n++){for(var r=t[n],i=_[n],a=v[n],o=!1,s=0;s<e.length;s++){var c=e[s];if(a<0&&c[i]<r||a>0&&c[i]>r){o=!0;break}}if(!o)return!1}return!0},b.prototype.selectLevel=function(e){for(var t=o()*this.width(),n=this._zoom,r=0;r<e.length;r++){var i=e[r];if(n*i.width()>=t)return i}return e[e.length-1]},b.prototype.coordinatesToScreen=function(e,t){var n=this._vec;t||={};var r=this._width,i=this._height;if(r<=0||i<=0)return t.x=null,t.y=null,null;var o=e&&e.x!=null?e.x:p,s=e&&e.y!=null?e.y:m;a.set(n,o-.5,.5-s,-1,1),a.transformMat4(n,n,this.projection());for(var c=0;c<3;c++)n[c]/=n[3];return t.x=r*(n[0]+1)/2,t.y=i*(1-n[1])/2,t},b.prototype.screenToCoordinates=function(e,t){var n=this._vec;t||={};var r=this._width,i=this._height,o=2*e.x/r-1,s=1-2*e.y/i;return a.set(n,o,s,1,1),a.transformMat4(n,n,this.inverseProjection()),t.x=.5+n[0],t.y=.5-n[1],t},b.limit={x:function(e,t){return function(n){return n.x=c(n.x,e,t),n}},y:function(e,t){return function(n){return n.y=c(n.y,e,t),n}},zoom:function(e,t){return function(n){return n.zoom=c(n.zoom,e,t),n}},resolution:function(e){return function(t){if(t.width<=0||t.height<=0)return t;var n=t.width,r=o()*n/e;return t.zoom=c(t.zoom,r,1/0),t}},visibleX:function(e,t){return function(n){var r=t-e;n.zoom>r&&(n.zoom=r);var i=e+.5*n.zoom,a=t-.5*n.zoom;return n.x=c(n.x,i,a),n}},visibleY:function(e,t){return function(n){if(n.width<=0||n.height<=0)return n;var r=n.width/n.height/n.mediaAspectRatio,i=(t-e)*r;n.zoom>i&&(n.zoom=i);var a=e+.5*n.zoom/r,o=t-.5*n.zoom/r;return n.y=c(n.y,a,o),n}},letterbox:function(){return function(e){if(e.width<=0||e.height<=0)return e;var t=e.width/e.height,n=1,r=t/e.mediaAspectRatio;e.mediaAspectRatio>=t&&(e.zoom=Math.min(e.zoom,n)),e.mediaAspectRatio<=t&&(e.zoom=Math.min(e.zoom,r));var i,a;e.zoom>n?i=a=.5:(i=0+.5*e.zoom/n,a=1-.5*e.zoom/n);var o,s;return e.zoom>r?o=s=.5:(o=0+.5*e.zoom/r,s=1-.5*e.zoom/r),e.x=c(e.x,i,a),e.y=c(e.y,o,s),e}}},b.type=b.prototype.type=`flat`,n.exports=b})),fs=i(((e,t)=>{var n=d(),r=Yo();function i(e){this._concurrency=e&&e.concurrency||1,this._paused=e&&!!e.paused||!1,this._pool=[];for(var t=0;t<this._concurrency;t++)this._pool.push(new n(e));this._next=0}i.prototype.length=function(){for(var e=0,t=0;t<this._pool.length;t++)e+=this._pool[t].length();return e},i.prototype.push=function(e,t){var n=this._next,i=this._pool[n].push(e,t);return this._next=r(this._next+1,this._concurrency),i},i.prototype.pause=function(){if(!this._paused){this._paused=!0;for(var e=0;e<this._concurrency;e++)this._pool[e].pause()}},i.prototype.resume=function(){if(this._paused){this._paused=!1;for(var e=0;e<this._concurrency;e++)this._pool[e].resume()}},t.exports=i})),ps=i(((e,t)=>{function n(){}t.exports=n})),ms=i(((e,t)=>{var n=ps();function r(){var e=Array.prototype.slice.call(arguments,0);return function(){var t=e.slice(0),r=null,i=null,a=arguments.length?Array.prototype.slice.call(arguments,0,arguments.length-1):[],o=arguments.length?arguments[arguments.length-1]:n;function s(){if(arguments[0])r=i=null,o.apply(null,arguments);else if(!t.length)r=i=null,o.apply(null,arguments);else{r=t.shift();var e=r,n=Array.prototype.slice.call(arguments,1);n.push(s);var a=r.apply(null,n);if(e===r){if(typeof a!=`function`)throw Error(`chain: chaining on non-cancellable function`);i=a}}}function c(){i&&i.apply(null,arguments)}return a.unshift(null),s.apply(null,a),c}}t.exports=r})),hs=i(((e,t)=>{function n(e,t){var n=null;function r(){n!=null&&(n=null,t(null))}function i(){n!=null&&(clearTimeout(n),n=null,t.apply(null,arguments))}return n=setTimeout(r,e),i}t.exports=n})),gs=i(((e,t)=>{var n=l(),r=S(),i=fs(),a=ms(),o=hs(),s=u(),c={x:`x`,y:`y`,z:`z`,f:`face`},d=`bdflru`,f=4,p=1e4;function m(e,t){t||={},this._loadPool=new i({concurrency:t.concurrency||f}),this._retryDelay=t.retryDelay||p,this._retryMap={},this._sourceFromTile=e}n(m),m.prototype.loadAsset=function(e,t,n){var i=this,c=this._retryDelay,l=this._retryMap,u=this._sourceFromTile(t),d=u.url,f=u.rect,p=e.loadImage.bind(e,d,f),m=function(e){return i._loadPool.push(p,function(n,a){n?(n instanceof r&&(l[d]=s(),i.emit(`networkError`,n,t)),e(n,t)):(delete l[d],e(null,t,a))})},h,g=l[d];if(g!=null){var _=s()-g;_<c?h=c-_:(h=0,delete l[d])}return a(o.bind(null,h),m)(n)},m.fromString=function(e,t){t||={};var n=t&&t.cubeMapPreviewFaceOrder||d;return new m(t.cubeMapPreviewUrl?i:r,t);function r(t){var n=e;for(var r in c){var i=c[r],a=h(r),o=t.hasOwnProperty(i)?t[i]:``;n=n.replace(a,o)}return{url:n}}function i(e){return e.z===0?a(e):r(e)}function a(e){var r=n.indexOf(e.face)/6;return{url:t.cubeMapPreviewUrl,rect:{x:0,y:r,width:1,height:1/6}}}};function h(e){var t=`\\{(`+e+`)\\}`;return new RegExp(t,`g`)}t.exports=m})),_s=i(((e,t)=>{function n(e){this._asset=e}n.prototype.asset=function(){return this._asset},n.prototype.loadAsset=function(e,t,n){var r=this,i=setTimeout(function(){n(null,t,r._asset)},0);function a(){clearTimeout(i),n.apply(null,arguments)}return a},t.exports=n})),vs=i(((e,t)=>{var n=b(),r=x(),i=l(),a=g();function o(e){this.constructor.super_.call(this,e),this._timestamp=0}r(o,n),i(o),o.prototype.destroy=function(){a(this)},o.prototype.timestamp=function(){return this._timestamp},o.prototype.isDynamic=function(){return!0},o.prototype.markDirty=function(){this._timestamp++,this.emit(`change`)},t.exports=o})),ys=i(((e,t)=>{var n=Yo(),r=64;function i(e){if(e!=null&&(!isFinite(e)||Math.floor(e)!==e||e<1))throw Error(`Map: invalid capacity`);this._capacity=e||r,this._keyBuckets=[],this._valBuckets=[];for(var t=0;t<this._capacity;t++)this._keyBuckets.push([]),this._valBuckets.push([]);this._size=0}i.prototype.get=function(e){for(var t=n(e.hash(),this._capacity),r=this._keyBuckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return this._valBuckets[t][i]}return null},i.prototype.set=function(e,t){for(var r=n(e.hash(),this._capacity),i=this._keyBuckets[r],a=this._valBuckets[r],o=0;o<i.length;o++){var s=i[o];if(e.equals(s)){var c=a[o];return i[o]=e,a[o]=t,c}}return i.push(e),a.push(t),this._size++,null},i.prototype.del=function(e){for(var t=n(e.hash(),this._capacity),r=this._keyBuckets[t],i=this._valBuckets[t],a=0;a<r.length;a++){var o=r[a];if(e.equals(o)){for(var s=i[a],c=a;c<r.length-1;c++)r[c]=r[c+1],i[c]=i[c+1];return--r.length,--i.length,this._size--,s}}return null},i.prototype.has=function(e){for(var t=n(e.hash(),this._capacity),r=this._keyBuckets[t],i=0;i<r.length;i++){var a=r[i];if(e.equals(a))return!0}return!1},i.prototype.size=function(){return this._size},i.prototype.clear=function(){for(var e=0;e<this._capacity;e++)this._keyBuckets[e].length=0,this._valBuckets[e].length=0;this._size=0},i.prototype.forEach=function(e){for(var t=0,n=0;n<this._capacity;n++)for(var r=this._keyBuckets[n],i=this._valBuckets[n],a=0;a<r.length;a++)e(r[a],i[a]),t+=1;return t},t.exports=i})),bs=i(((e,t)=>{var n=Yo();function r(e){if(!isFinite(e)||Math.floor(e)!==e||e<0)throw Error(`LruSet: invalid capacity`);this._capacity=e,this._elements=Array(this._capacity),this._start=0,this._size=0}r.prototype._index=function(e){return n(this._start+e,this._capacity)},r.prototype.add=function(e){if(this._capacity===0)return e;this.remove(e);var t=this._size===this._capacity?this._elements[this._index(0)]:null;return this._elements[this._index(this._size)]=e,this._size<this._capacity?this._size++:this._start=this._index(1),t},r.prototype.remove=function(e){for(var t=0;t<this._size;t++){var n=this._elements[this._index(t)];if(e.equals(n)){for(var r=t;r<this._size-1;r++)this._elements[this._index(r)]=this._elements[this._index(r+1)];return this._size--,n}}return null},r.prototype.has=function(e){for(var t=0;t<this._size;t++)if(e.equals(this._elements[this._index(t)]))return!0;return!1},r.prototype.size=function(){return this._size},r.prototype.clear=function(){this._elements.length=0,this._start=0,this._size=0},r.prototype.forEach=function(e){for(var t=0,n=0;n<this._size;n++)e(this._elements[this._index(n)]),t+=1;return t},t.exports=r})),xs=i(((e,t)=>{function n(e,t){for(var n in t)n in e||(e[n]=t[n]);return e}t.exports=n})),Ss=i(((e,t)=>{var n=ps();function r(e){return function(){var t=arguments.length?Array.prototype.slice.call(arguments,0,arguments.length-1):[],r=arguments.length?arguments[arguments.length-1]:n,i=null,a=!1;function o(){!arguments[0]||a?r.apply(null,arguments):i=e.apply(null,t)}return t.push(o),o(!0),function(){a=!0,i.apply(null,arguments)}}}t.exports=r})),Cs=i(((e,t)=>{var n=ys(),r=Xo(),i=bs(),a=l(),o=xs(),s=Ss(),c=ms(),u=x(),d=g(),f=typeof MARZIPANODEBUG<`u`&&MARZIPANODEBUG.textureStore,p={IDLE:0,START:1,MARK:2,END:3},m={previouslyVisibleCacheSize:512},h=0;function _(){}u(_,Error);function v(e,t){var n=this,r=h++;n._id=r,n._store=e,n._tile=t,n._asset=null,n._texture=null,n._changeHandler=function(){e.emit(`textureInvalid`,t)};var i=e.source(),a=e.stage(),o=i.loadAsset.bind(i),l=a.createTexture.bind(a),u=c(s(o),l);e.emit(`textureStartLoad`,t),f&&console.log(`loading`,r,t),n._cancel=u(a,t,function(i,a,o,s){n._cancel=null,i?(o&&o.destroy(),s&&s.destroy(),i instanceof _?(e.emit(`textureCancel`,t),f&&console.log(`cancel`,r,t)):(e.emit(`textureError`,t,i),f&&console.log(`error`,r,t))):(n._texture=s,o.isDynamic()?(n._asset=o,o.addEventListener(`change`,n._changeHandler)):o.destroy(),e.emit(`textureLoad`,t),f&&console.log(`load`,r,t))})}v.prototype.asset=function(){return this._asset},v.prototype.texture=function(){return this._texture},v.prototype.destroy=function(){var e=this._id,t=this._store,n=this._tile,r=this._asset,i=this._texture,a=this._cancel;a?a(new _(`Texture load cancelled`)):(r&&(r.removeEventListener(`change`,this._changeHandler),r.destroy()),i&&i.destroy(),t.emit(`textureUnload`,n),f&&console.log(`unload`,e,n),d(this))},a(v);function y(e,t,a){a=o(a||{},m),this._source=e,this._stage=t,this._state=p.IDLE,this._delimCount=0,this._itemMap=new n,this._visible=new r,this._previouslyVisible=new i(a.previouslyVisibleCacheSize),this._pinMap=new n,this._newVisible=new r,this._noLongerVisible=[],this._visibleAgain=[],this._evicted=[]}a(y),y.prototype.destroy=function(){this.clear(),d(this)},y.prototype.stage=function(){return this._stage},y.prototype.source=function(){return this._source},y.prototype.clear=function(){var e=this;e._evicted.length=0,e._itemMap.forEach(function(t){e._evicted.push(t)}),e._evicted.forEach(function(t){e._unloadTile(t)}),e._itemMap.clear(),e._visible.clear(),e._previouslyVisible.clear(),e._pinMap.clear(),e._newVisible.clear(),e._noLongerVisible.length=0,e._visibleAgain.length=0,e._evicted.length=0},y.prototype.clearNotPinned=function(){var e=this;e._evicted.length=0,e._itemMap.forEach(function(t){e._pinMap.has(t)||e._evicted.push(t)}),e._evicted.forEach(function(t){e._unloadTile(t)}),e._visible.clear(),e._previouslyVisible.clear(),e._evicted.length=0},y.prototype.startFrame=function(){if(this._state!==p.IDLE&&this._state!==p.START)throw Error(`TextureStore: startFrame called out of sequence`);this._state=p.START,this._delimCount++},y.prototype.markTile=function(e){if(this._state!==p.START&&this._state!==p.MARK)throw Error(`TextureStore: markTile called out of sequence`);this._state=p.MARK;var t=this._itemMap.get(e),n=t&&t.texture(),r=t&&t.asset();n&&r&&n.refresh(e,r),this._newVisible.add(e)},y.prototype.endFrame=function(){if(this._state!==p.START&&this._state!==p.MARK&&this._state!==p.END)throw Error(`TextureStore: endFrame called out of sequence`);this._state=p.END,this._delimCount--,this._delimCount||(this._update(),this._state=p.IDLE)},y.prototype._update=function(){var e=this;e._noLongerVisible.length=0,e._visible.forEach(function(t){e._newVisible.has(t)||e._noLongerVisible.push(t)}),e._visibleAgain.length=0,e._newVisible.forEach(function(t){e._previouslyVisible.has(t)&&e._visibleAgain.push(t)}),e._visibleAgain.forEach(function(t){e._previouslyVisible.remove(t)}),e._evicted.length=0,e._noLongerVisible.forEach(function(t){var n=e._itemMap.get(t);if(n&&n.texture()){var r=e._previouslyVisible.add(t);r!=null&&e._evicted.push(r)}else n&&e._unloadTile(t)}),e._evicted.forEach(function(t){e._pinMap.has(t)||e._unloadTile(t)}),e._newVisible.forEach(function(t){e._itemMap.get(t)||e._loadTile(t)});var t=e._visible;e._visible=e._newVisible,e._newVisible=t,e._newVisible.clear(),e._noLongerVisible.length=0,e._visibleAgain.length=0,e._evicted.length=0},y.prototype._loadTile=function(e){if(this._itemMap.has(e))throw Error(`TextureStore: loading texture already in cache`);var t=new v(this,e);this._itemMap.set(e,t)},y.prototype._unloadTile=function(e){var t=this._itemMap.del(e);if(!t)throw Error(`TextureStore: unloading texture not in cache`);t.destroy()},y.prototype.asset=function(e){var t=this._itemMap.get(e);return t?t.asset():null},y.prototype.texture=function(e){var t=this._itemMap.get(e);return t?t.texture():null},y.prototype.pin=function(e){var t=(this._pinMap.get(e)||0)+1;return this._pinMap.set(e,t),this._itemMap.has(e)||this._loadTile(e),t},y.prototype.unpin=function(e){var t=this._pinMap.get(e);if(t)t--,t>0?this._pinMap.set(e,t):(this._pinMap.del(e),!this._visible.has(e)&&!this._previouslyVisible.has(e)&&this._unloadTile(e));else throw Error(`TextureStore: unpin when not pinned`);return t},y.prototype.query=function(e){var t=this._itemMap.get(e),n=this._pinMap.get(e)||0;return{visible:this._visible.has(e),previouslyVisible:this._previouslyVisible.has(e),hasAsset:t!=null&&t.asset()!=null,hasTexture:t!=null&&t.texture()!=null,pinned:n!==0,pinCount:n}},t.exports=y})),ws=i(((e,t)=>{function n(e,t){for(var n in t)e[n]=t[n];return e}t.exports=n})),Ts=i(((e,t)=>{var n=l(),r=ws(),i=g();function a(e,t,n,r,i){i||={};var a=this;this._source=e,this._geometry=t,this._view=n,this._textureStore=r,this._effects=i.effects||{},this._fixedLevelIndex=null,this._viewChangeHandler=function(){a.emit(`viewChange`,a.view())},this._view.addEventListener(`change`,this._viewChangeHandler),this._textureStoreChangeHandler=function(){a.emit(`textureStoreChange`,a.textureStore())},this._textureStore.addEventListener(`textureLoad`,this._textureStoreChangeHandler),this._textureStore.addEventListener(`textureError`,this._textureStoreChangeHandler),this._textureStore.addEventListener(`textureInvalid`,this._textureStoreChangeHandler)}n(a),a.prototype.destroy=function(){this._view.removeEventListener(`change`,this._viewChangeHandler),this._textureStore.removeEventListener(`textureLoad`,this._textureStoreChangeHandler),this._textureStore.removeEventListener(`textureError`,this._textureStoreChangeHandler),this._textureStore.removeEventListener(`textureInvalid`,this._textureStoreChangeHandler),i(this)},a.prototype.source=function(){return this._source},a.prototype.geometry=function(){return this._geometry},a.prototype.view=function(){return this._view},a.prototype.textureStore=function(){return this._textureStore},a.prototype.effects=function(){return this._effects},a.prototype.setEffects=function(e){this._effects=e,this.emit(`effectsChange`,this._effects)},a.prototype.mergeEffects=function(e){r(this._effects,e),this.emit(`effectsChange`,this._effects)},a.prototype.fixedLevel=function(){return this._fixedLevelIndex},a.prototype.setFixedLevel=function(e){if(e!==this._fixedLevelIndex){if(e!=null&&(e>=this._geometry.levelList.length||e<0))throw Error(`Level index out of range: `+e);this._fixedLevelIndex=e,this.emit(`fixedLevelChange`,this._fixedLevelIndex)}},a.prototype._selectLevel=function(){return this._fixedLevelIndex==null?this._view.selectLevel(this._geometry.selectableLevelList):this._geometry.levelList[this._fixedLevelIndex]},a.prototype.visibleTiles=function(e){var t=this._selectLevel();return this._geometry.visibleTiles(this._view,t,e)},a.prototype.pinLevel=function(e){for(var t=this._geometry.levelList[e],n=this._geometry.levelTiles(t),r=0;r<n.length;r++)this._textureStore.pin(n[r])},a.prototype.unpinLevel=function(e){for(var t=this._geometry.levelList[e],n=this._geometry.levelTiles(t),r=0;r<n.length;r++)this._textureStore.unpin(n[r])},a.prototype.pinFirstLevel=function(){return this.pinLevel(0)},a.prototype.unpinFirstLevel=function(){return this.unpinLevel(0)},t.exports=a})),Es=i(((e,t)=>{var n=l(),r=g();function i(e){var t=this;this._stage=e,this._running=!1,this._rendering=!1,this._requestHandle=null,this._boundLoop=this._loop.bind(this),this._renderInvalidHandler=function(){t._rendering||t.renderOnNextFrame()},this._stage.addEventListener(`renderInvalid`,this._renderInvalidHandler)}n(i),i.prototype.destroy=function(){this.stop(),this._stage.removeEventListener(`renderInvalid`,this._renderInvalidHandler),r(this)},i.prototype.stage=function(){return this._stage},i.prototype.start=function(){this._running=!0,this.renderOnNextFrame()},i.prototype.stop=function(){this._requestHandle&&=(window.cancelAnimationFrame(this._requestHandle),null),this._running=!1},i.prototype.renderOnNextFrame=function(){this._running&&!this._requestHandle&&(this._requestHandle=window.requestAnimationFrame(this._boundLoop))},i.prototype._loop=function(){if(!this._running)throw Error(`Render loop running while in stopped state`);this._requestHandle=null,this._rendering=!0,this.emit(`beforeRender`),this._rendering=!1,this._stage.render(),this.emit(`afterRender`)},t.exports=i})),Ds=i(((e,t)=>{function n(){this.velocity=null,this.friction=null,this.offset=null}n.equals=function(e,t){return e.velocity===t.velocity&&e.friction===t.friction&&e.offset===t.offset},n.prototype.equals=function(e){return n.equals(this,e)},n.prototype.update=function(e,t){e.offset&&(this.offset=this.offset||0,this.offset+=e.offset);var n=this.offsetFromVelocity(t);n&&(this.offset=this.offset||0,this.offset+=n),this.velocity=e.velocity,this.friction=e.friction},n.prototype.reset=function(){this.velocity=null,this.friction=null,this.offset=null},n.prototype.velocityAfter=function(e){return this.velocity?this.friction?r(this.velocity,this.friction*e):this.velocity:null},n.prototype.offsetFromVelocity=function(e){e=Math.min(e,this.nullVelocityTime());var t=this.velocityAfter(e);return(this.velocity+t)/2*e},n.prototype.nullVelocityTime=function(){return this.velocity==null?0:this.velocity&&!this.friction?1/0:Math.abs(this.velocity/this.friction)};function r(e,t){return e<0?Math.min(0,e+t):e>0?Math.max(0,e-t):0}t.exports=n})),Os=i(((e,t)=>{var n=l(),r=Ds(),i=g();function a(e,t,n,i,a){if(!e)throw Error(`KeyControlMethod: keyCode must be defined`);if(!t)throw Error(`KeyControlMethod: parameter must be defined`);if(!n)throw Error(`KeyControlMethod: velocity must be defined`);if(!i)throw Error(`KeyControlMethod: friction must be defined`);a||=document,this._keyCode=e,this._parameter=t,this._velocity=n,this._friction=i,this._element=a,this._keydownHandler=this._handlePress.bind(this),this._keyupHandler=this._handleRelease.bind(this),this._blurHandler=this._handleBlur.bind(this),this._element.addEventListener(`keydown`,this._keydownHandler),this._element.addEventListener(`keyup`,this._keyupHandler),window.addEventListener(`blur`,this._blurHandler),this._dynamics=new r,this._pressing=!1}n(a),a.prototype.destroy=function(){this._element.removeEventListener(`keydown`,this._keydownHandler),this._element.removeEventListener(`keyup`,this._keyupHandler),window.removeEventListener(`blur`,this._blurHandler),i(this)},a.prototype._handlePress=function(e){e.keyCode===this._keyCode&&(this._pressing=!0,this._dynamics.velocity=this._velocity,this._dynamics.friction=0,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`active`))},a.prototype._handleRelease=function(e){e.keyCode===this._keyCode&&(this._pressing&&(this._dynamics.friction=this._friction,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`inactive`)),this._pressing=!1)},a.prototype._handleBlur=function(){this._dynamics.velocity=0,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`inactive`),this._pressing=!1},t.exports=a})),ks=i(((e,t)=>{(function(e,n,r,i){var a=[``,`webkit`,`moz`,`MS`,`ms`,`o`],o=n.createElement(`div`),s=`function`,c=Math.round,l=Math.abs,u=Date.now;function d(e,t,n){return setTimeout(_(e,n),t)}function f(e,t,n){return Array.isArray(e)?(p(e,n[t],n),!0):!1}function p(e,t,n){var r;if(e){if(e.forEach)e.forEach(t,n);else if(e.length!==i)for(r=0;r<e.length;)t.call(n,e[r],r,e),r++;else for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)}}function m(e,t,n){for(var r=Object.keys(t),a=0;a<r.length;)(!n||n&&e[r[a]]===i)&&(e[r[a]]=t[r[a]]),a++;return e}function h(e,t){return m(e,t,!0)}function g(e,t,n){var r=t.prototype,i=e.prototype=Object.create(r);i.constructor=e,i._super=r,n&&m(i,n)}function _(e,t){return function(){return e.apply(t,arguments)}}function v(e,t){return typeof e==s?e.apply(t&&t[0]||i,t):e}function y(e,t){return e===i?t:e}function b(e,t,n){p(w(t),function(t){e.addEventListener(t,n,!1)})}function x(e,t,n){p(w(t),function(t){e.removeEventListener(t,n,!1)})}function S(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function C(e,t){return e.indexOf(t)>-1}function w(e){return e.trim().split(/\s+/g)}function T(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var r=0;r<e.length;){if(n&&e[r][n]==t||!n&&e[r]===t)return r;r++}return-1}function E(e){return Array.prototype.slice.call(e,0)}function D(e,t,n){for(var r=[],i=[],a=0;a<e.length;){var o=t?e[a][t]:e[a];T(i,o)<0&&r.push(e[a]),i[a]=o,a++}return n&&(r=t?r.sort(function(e,n){return e[t]>n[t]}):r.sort()),r}function O(e,t){for(var n,r,o=t[0].toUpperCase()+t.slice(1),s=0;s<a.length;){if(n=a[s],r=n?n+o:t,r in e)return r;s++}return i}var k=1;function A(){return k++}function j(e){var t=e.ownerDocument;return t.defaultView||t.parentWindow}var ee=/mobile|tablet|ip(ad|hone|od)|android/i,te=`ontouchstart`in e,M=O(e,`PointerEvent`)!==i,N=te&&ee.test(navigator.userAgent),ne=`touch`,P=`pen`,re=`mouse`,ie=`kinect`,ae=25,F=1,oe=2,I=4,L=8,se=1,ce=2,le=4,ue=8,de=16,R=ce|le,fe=ue|de,pe=R|fe,me=[`x`,`y`],he=[`clientX`,`clientY`];function ge(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(t){v(e.options.enable,[e])&&n.handler(t)},this.init()}ge.prototype={handler:function(){},init:function(){this.evEl&&b(this.element,this.evEl,this.domHandler),this.evTarget&&b(this.target,this.evTarget,this.domHandler),this.evWin&&b(j(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&x(this.element,this.evEl,this.domHandler),this.evTarget&&x(this.target,this.evTarget,this.domHandler),this.evWin&&x(j(this.element),this.evWin,this.domHandler)}};function _e(e){return new(e.options.inputClass||(M?Re:N?Ke:te?Je:Ne))(e,ve)}function ve(e,t,n){var r=n.pointers.length,i=n.changedPointers.length,a=t&F&&r-i===0,o=t&(I|L)&&r-i===0;n.isFirst=!!a,n.isFinal=!!o,a&&(e.session={}),n.eventType=t,ye(e,n),e.emit(`hammer.input`,n),e.recognize(n),e.session.prevInput=n}function ye(e,t){var n=e.session,r=t.pointers,i=r.length;n.firstInput||=Se(t),i>1&&!n.firstMultiple?n.firstMultiple=Se(t):i===1&&(n.firstMultiple=!1);var a=n.firstInput,o=n.firstMultiple,s=o?o.center:a.center,c=t.center=Ce(r);t.timeStamp=u(),t.deltaTime=t.timeStamp-a.timeStamp,t.angle=De(s,c),t.distance=Ee(s,c),be(n,t),t.offsetDirection=Te(t.deltaX,t.deltaY),t.scale=o?ke(o.pointers,r):1,t.rotation=o?Oe(o.pointers,r):0,xe(n,t);var l=e.element;S(t.srcEvent.target,l)&&(l=t.srcEvent.target),t.target=l}function be(e,t){var n=t.center,r=e.offsetDelta||{},i=e.prevDelta||{},a=e.prevInput||{};(t.eventType===F||a.eventType===I)&&(i=e.prevDelta={x:a.deltaX||0,y:a.deltaY||0},r=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=i.x+(n.x-r.x),t.deltaY=i.y+(n.y-r.y)}function xe(e,t){var n=e.lastInterval||t,r=t.timeStamp-n.timeStamp,a,o,s,c;if(t.eventType!=L&&(r>ae||n.velocity===i)){var u=n.deltaX-t.deltaX,d=n.deltaY-t.deltaY,f=we(r,u,d);o=f.x,s=f.y,a=l(f.x)>l(f.y)?f.x:f.y,c=Te(u,d),e.lastInterval=t}else a=n.velocity,o=n.velocityX,s=n.velocityY,c=n.direction;t.velocity=a,t.velocityX=o,t.velocityY=s,t.direction=c}function Se(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:c(e.pointers[n].clientX),clientY:c(e.pointers[n].clientY)},n++;return{timeStamp:u(),pointers:t,center:Ce(t),deltaX:e.deltaX,deltaY:e.deltaY}}function Ce(e){var t=e.length;if(t===1)return{x:c(e[0].clientX),y:c(e[0].clientY)};for(var n=0,r=0,i=0;i<t;)n+=e[i].clientX,r+=e[i].clientY,i++;return{x:c(n/t),y:c(r/t)}}function we(e,t,n){return{x:t/e||0,y:n/e||0}}function Te(e,t){return e===t?se:l(e)>=l(t)?e>0?ce:le:t>0?ue:de}function Ee(e,t,n){n||=me;var r=t[n[0]]-e[n[0]],i=t[n[1]]-e[n[1]];return Math.sqrt(r*r+i*i)}function De(e,t,n){n||=me;var r=t[n[0]]-e[n[0]],i=t[n[1]]-e[n[1]];return Math.atan2(i,r)*180/Math.PI}function Oe(e,t){return De(t[1],t[0],he)-De(e[1],e[0],he)}function ke(e,t){return Ee(t[0],t[1],he)/Ee(e[0],e[1],he)}var Ae={mousedown:F,mousemove:oe,mouseup:I},je=`mousedown`,Me=`mousemove mouseup`;function Ne(){this.evEl=je,this.evWin=Me,this.allow=!0,this.pressed=!1,ge.apply(this,arguments)}g(Ne,ge,{handler:function(e){var t=Ae[e.type];t&F&&e.button===0&&(this.pressed=!0),t&oe&&e.which!==1&&(t=I),this.pressed&&this.allow&&(t&I&&(this.pressed=!1),this.callback(this.manager,t,{pointers:[e],changedPointers:[e],pointerType:re,srcEvent:e}))}});var Pe={pointerdown:F,pointermove:oe,pointerup:I,pointercancel:L,pointerout:L},Fe={2:ne,3:P,4:re,5:ie},Ie=`pointerdown`,Le=`pointermove pointerup pointercancel`;e.MSPointerEvent&&(Ie=`MSPointerDown`,Le=`MSPointerMove MSPointerUp MSPointerCancel`);function Re(){this.evEl=Ie,this.evWin=Le,ge.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}g(Re,ge,{handler:function(e){var t=this.store,n=!1,r=Pe[e.type.toLowerCase().replace(`ms`,``)],i=Fe[e.pointerType]||e.pointerType,a=i==ne,o=T(t,e.pointerId,`pointerId`);r&F&&(e.button===0||a)?o<0&&(t.push(e),o=t.length-1):r&(I|L)&&(n=!0),!(o<0)&&(t[o]=e,this.callback(this.manager,r,{pointers:t,changedPointers:[e],pointerType:i,srcEvent:e}),n&&t.splice(o,1))}});var ze={touchstart:F,touchmove:oe,touchend:I,touchcancel:L},Be=`touchstart`,Ve=`touchstart touchmove touchend touchcancel`;function He(){this.evTarget=Be,this.evWin=Ve,this.started=!1,ge.apply(this,arguments)}g(He,ge,{handler:function(e){var t=ze[e.type];if(t===F&&(this.started=!0),this.started){var n=Ue.call(this,e,t);t&(I|L)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:ne,srcEvent:e})}}});function Ue(e,t){var n=E(e.touches),r=E(e.changedTouches);return t&(I|L)&&(n=D(n.concat(r),`identifier`,!0)),[n,r]}var We={touchstart:F,touchmove:oe,touchend:I,touchcancel:L},Ge=`touchstart touchmove touchend touchcancel`;function Ke(){this.evTarget=Ge,this.targetIds={},ge.apply(this,arguments)}g(Ke,ge,{handler:function(e){var t=We[e.type],n=qe.call(this,e,t);n&&this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:ne,srcEvent:e})}});function qe(e,t){var n=E(e.touches),r=this.targetIds;if(t&(F|oe)&&n.length===1)return r[n[0].identifier]=!0,[n,n];var i,a,o=E(e.changedTouches),s=[],c=this.target;if(a=n.filter(function(e){return S(e.target,c)}),t===F)for(i=0;i<a.length;)r[a[i].identifier]=!0,i++;for(i=0;i<o.length;)r[o[i].identifier]&&s.push(o[i]),t&(I|L)&&delete r[o[i].identifier],i++;if(s.length)return[D(a.concat(s),`identifier`,!0),s]}function Je(){ge.apply(this,arguments);var e=_(this.handler,this);this.touch=new Ke(this.manager,e),this.mouse=new Ne(this.manager,e)}g(Je,ge,{handler:function(e,t,n){var r=n.pointerType==ne,i=n.pointerType==re;if(r)this.mouse.allow=!1;else if(i&&!this.mouse.allow)return;t&(I|L)&&(this.mouse.allow=!0),this.callback(e,t,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ye=O(o.style,`touchAction`),Xe=Ye!==i,Ze=`compute`,Qe=`auto`,$e=`manipulation`,et=`none`,tt=`pan-x`,nt=`pan-y`;function rt(e,t){this.manager=e,this.set(t)}rt.prototype={set:function(e){e==Ze&&(e=this.compute()),Xe&&(this.manager.element.style[Ye]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return p(this.manager.recognizers,function(t){v(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),it(e.join(` `))},preventDefaults:function(e){if(!Xe){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented)t.preventDefault();else{var r=this.actions,i=C(r,et),a=C(r,nt),o=C(r,tt);if(i||a&&n&R||o&&n&fe)return this.preventSrc(t)}}},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};function it(e){if(C(e,et))return et;var t=C(e,tt),n=C(e,nt);return t&&n?tt+` `+nt:t||n?t?tt:nt:C(e,$e)?$e:Qe}var at=1,ot=2,st=4,ct=8,lt=ct,ut=16,dt=32;function ft(e){this.id=A(),this.manager=null,this.options=h(e||{},this.defaults),this.options.enable=y(this.options.enable,!0),this.state=at,this.simultaneous={},this.requireFail=[]}ft.prototype={defaults:{},set:function(e){return m(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(f(e,`recognizeWith`,this))return this;var t=this.simultaneous;return e=ht(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return f(e,`dropRecognizeWith`,this)||(e=ht(e,this),delete this.simultaneous[e.id]),this},requireFailure:function(e){if(f(e,`requireFailure`,this))return this;var t=this.requireFail;return e=ht(e,this),T(t,e)===-1&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(f(e,`dropRequireFailure`,this))return this;e=ht(e,this);var t=T(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){var t=this,n=this.state;function r(r){t.manager.emit(t.options.event+(r?pt(n):``),e)}n<ct&&r(!0),r(),n>=ct&&r(!0)},tryEmit:function(e){if(this.canEmit())return this.emit(e);this.state=dt},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(dt|at)))return!1;e++}return!0},recognize:function(e){var t=m({},e);v(this.options.enable,[this,t])?(this.state&(lt|ut|dt)&&(this.state=at),this.state=this.process(t),this.state&(ot|st|ct|ut)&&this.tryEmit(t)):(this.reset(),this.state=dt)},process:function(e){},getTouchAction:function(){},reset:function(){}};function pt(e){return e&ut?`cancel`:e&ct?`end`:e&st?`move`:e&ot?`start`:``}function mt(e){return e==de?`down`:e==ue?`up`:e==ce?`left`:e==le?`right`:``}function ht(e,t){var n=t.manager;return n?n.get(e):e}function gt(){ft.apply(this,arguments)}g(gt,ft,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return t===0||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,r=t&(ot|st),i=this.attrTest(e);return r&&(n&L||!i)?t|ut:r||i?n&I?t|ct:t&ot?t|st:ot:dt}});function _t(){gt.apply(this,arguments),this.pX=null,this.pY=null}g(_t,gt,{defaults:{event:`pan`,threshold:10,pointers:1,direction:pe},getTouchAction:function(){var e=this.options.direction,t=[];return e&R&&t.push(nt),e&fe&&t.push(tt),t},directionTest:function(e){var t=this.options,n=!0,r=e.distance,i=e.direction,a=e.deltaX,o=e.deltaY;return i&t.direction||(t.direction&R?(i=a===0?se:a<0?ce:le,n=a!=this.pX,r=Math.abs(e.deltaX)):(i=o===0?se:o<0?ue:de,n=o!=this.pY,r=Math.abs(e.deltaY))),e.direction=i,n&&r>t.threshold&&i&t.direction},attrTest:function(e){return gt.prototype.attrTest.call(this,e)&&(this.state&ot||!(this.state&ot)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=mt(e.direction);t&&this.manager.emit(this.options.event+t,e),this._super.emit.call(this,e)}});function vt(){gt.apply(this,arguments)}g(vt,gt,{defaults:{event:`pinch`,threshold:0,pointers:2},getTouchAction:function(){return[et]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&ot)},emit:function(e){if(this._super.emit.call(this,e),e.scale!==1){var t=e.scale<1?`in`:`out`;this.manager.emit(this.options.event+t,e)}}});function yt(){ft.apply(this,arguments),this._timer=null,this._input=null}g(yt,ft,{defaults:{event:`press`,pointers:1,time:500,threshold:5},getTouchAction:function(){return[Qe]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime>t.time;if(this._input=e,!r||!n||e.eventType&(I|L)&&!i)this.reset();else if(e.eventType&F)this.reset(),this._timer=d(function(){this.state=lt,this.tryEmit()},t.time,this);else if(e.eventType&I)return lt;return dt},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===lt&&(e&&e.eventType&I?this.manager.emit(this.options.event+`up`,e):(this._input.timeStamp=u(),this.manager.emit(this.options.event,this._input)))}});function bt(){gt.apply(this,arguments)}g(bt,gt,{defaults:{event:`rotate`,threshold:0,pointers:2},getTouchAction:function(){return[et]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&ot)}});function xt(){gt.apply(this,arguments)}g(xt,gt,{defaults:{event:`swipe`,threshold:10,velocity:.65,direction:R|fe,pointers:1},getTouchAction:function(){return _t.prototype.getTouchAction.call(this)},attrTest:function(e){var t=this.options.direction,n;return t&(R|fe)?n=e.velocity:t&R?n=e.velocityX:t&fe&&(n=e.velocityY),this._super.attrTest.call(this,e)&&t&e.direction&&e.distance>this.options.threshold&&l(n)>this.options.velocity&&e.eventType&I},emit:function(e){var t=mt(e.direction);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}});function St(){ft.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}g(St,ft,{defaults:{event:`tap`,pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[$e]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime<t.time;if(this.reset(),e.eventType&F&&this.count===0)return this.failTimeout();if(r&&i&&n){if(e.eventType!=I)return this.failTimeout();var a=!this.pTime||e.timeStamp-this.pTime<t.interval,o=!this.pCenter||Ee(this.pCenter,e.center)<t.posThreshold;if(this.pTime=e.timeStamp,this.pCenter=e.center,!o||!a?this.count=1:this.count+=1,this._input=e,this.count%t.taps===0)return this.hasRequireFailures()?(this._timer=d(function(){this.state=lt,this.tryEmit()},t.interval,this),ot):lt}return dt},failTimeout:function(){return this._timer=d(function(){this.state=dt},this.options.interval,this),dt},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==lt&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}});function Ct(e,t){return t||={},t.recognizers=y(t.recognizers,Ct.defaults.preset),new Et(e,t)}Ct.VERSION=`2.0.4`,Ct.defaults={domEvents:!1,touchAction:Ze,enable:!0,inputTarget:null,inputClass:null,preset:[[bt,{enable:!1}],[vt,{enable:!1},[`rotate`]],[xt,{direction:R}],[_t,{direction:R},[`swipe`]],[St],[St,{event:`doubletap`,taps:2},[`tap`]],[yt]],cssProps:{userSelect:`none`,touchSelect:`none`,touchCallout:`none`,contentZooming:`none`,userDrag:`none`,tapHighlightColor:`rgba(0,0,0,0)`}};var wt=1,Tt=2;function Et(e,t){t||={},this.options=h(t,Ct.defaults),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.element=e,this.input=_e(this),this.touchAction=new rt(this,this.options.touchAction),Dt(this,!0),p(t.recognizers,function(e){var t=this.add(new e[0](e[1]));e[2]&&t.recognizeWith(e[2]),e[3]&&t.requireFailure(e[3])},this)}Et.prototype={set:function(e){return m(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?Tt:wt},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,r=this.recognizers,i=t.curRecognizer;(!i||i&&i.state&lt)&&(i=t.curRecognizer=null);for(var a=0;a<r.length;)n=r[a],t.stopped!==Tt&&(!i||n==i||n.canRecognizeWith(i))?n.recognize(e):n.reset(),!i&&n.state&(ot|st|ct)&&(i=t.curRecognizer=n),a++}},get:function(e){if(e instanceof ft)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(f(e,`add`,this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(f(e,`remove`,this))return this;var t=this.recognizers;return e=this.get(e),t.splice(T(t,e),1),this.touchAction.update(),this},on:function(e,t){var n=this.handlers;return p(w(e),function(e){n[e]=n[e]||[],n[e].push(t)}),this},off:function(e,t){var n=this.handlers;return p(w(e),function(e){t?n[e].splice(T(n[e],t),1):delete n[e]}),this},emit:function(e,t){this.options.domEvents&&Ot(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(n&&n.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var r=0;r<n.length;)n[r](t),r++}},destroy:function(){this.element&&Dt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}};function Dt(e,t){var n=e.element;p(e.options.cssProps,function(e,r){n.style[O(n.style,r)]=t?e:``})}function Ot(e,t){var r=n.createEvent(`Event`);r.initEvent(e,!0,!0),r.gesture=t,t.target.dispatchEvent(r)}m(Ct,{INPUT_START:F,INPUT_MOVE:oe,INPUT_END:I,INPUT_CANCEL:L,STATE_POSSIBLE:at,STATE_BEGAN:ot,STATE_CHANGED:st,STATE_ENDED:ct,STATE_RECOGNIZED:lt,STATE_CANCELLED:ut,STATE_FAILED:dt,DIRECTION_NONE:se,DIRECTION_LEFT:ce,DIRECTION_RIGHT:le,DIRECTION_UP:ue,DIRECTION_DOWN:de,DIRECTION_HORIZONTAL:R,DIRECTION_VERTICAL:fe,DIRECTION_ALL:pe,Manager:Et,Input:ge,TouchAction:rt,TouchInput:Ke,MouseInput:Ne,PointerEventInput:Re,TouchMouseInput:Je,SingleTouchInput:He,Recognizer:ft,AttrRecognizer:gt,Tap:St,Pan:_t,Swipe:xt,Pinch:vt,Rotate:bt,Press:yt,on:b,off:x,each:p,merge:h,extend:m,inherit:g,bindFn:_,prefixed:O}),typeof define==s&&define.amd?define(function(){return Ct}):t!==void 0&&t.exports?t.exports=Ct:e[r]=Ct})(window,document,`Hammer`)})),As=i(((e,t)=>{var n=ks(),r=1,i=`MarzipanoHammerElementId`;function a(e,t){return e[i]||(e[i]=r++),t+e[i]}function o(){this._managers={},this._refCount={}}o.prototype.get=function(e,t){var n=a(e,t);return this._managers[n]||(this._managers[n]=this._createManager(e,t),this._refCount[n]=0),this._refCount[n]++,new s(this,this._managers[n],e,t)},o.prototype._createManager=function(e,t){var r=new n.Manager(e);return t===`mouse`?r.add(new n.Pan({direction:n.DIRECTION_ALL,threshold:0})):(t===`touch`||t===`pen`||t===`kinect`)&&(r.add(new n.Pan({direction:n.DIRECTION_ALL,threshold:20,pointers:1})),r.add(new n.Pinch)),r},o.prototype._releaseHandle=function(e,t){var n=a(e,t);this._refCount[n]&&(this._refCount[n]--,this._refCount[n]||(this._managers[n].destroy(),delete this._managers[n],delete this._refCount[n]))};function s(e,t,n,r){this._manager=t,this._element=n,this._type=r,this._hammerGestures=e,this._eventHandlers=[]}s.prototype.on=function(e,t){var n=this._type,r=function(e){n===e.pointerType&&t(e)};this._eventHandlers.push({events:e,handler:r}),this._manager.on(e,r)},s.prototype.release=function(){for(var e=0;e<this._eventHandlers.length;e++){var t=this._eventHandlers[e];this._manager.off(t.events,t.handler)}this._hammerGestures._releaseHandle(this._element,this._type),this._manager=null,this._element=null,this._type=null,this._hammerGestures=null},s.prototype.manager=function(){return this._manager},t.exports=new o})),js=i(((e,t)=>{function n(e,t,n,i,a){var o=Math.sqrt(t**2+n**2);e=Math.max(e,o/i),r(t,n,e,a),a[0]=Math.abs(a[0]),a[1]=Math.abs(a[1])}function r(e,t,n,r){var i=Math.atan(t/e);r[0]=n*Math.cos(i),r[1]=n*Math.sin(i)}t.exports={maxFriction:n,changeVectorNorm:r}})),Ms=i(((e,t)=>{var n=l(),r=Ds(),i=As(),a=xs(),o=js().maxFriction,s=g(),c={friction:6,maxFrictionTime:.3,hammerEvent:`pan`},u=typeof MARZIPANODEBUG<`u`&&MARZIPANODEBUG.controls;function d(e,t,n){if(this._element=e,this._opts=a(n||{},c),this._startEvent=null,this._lastEvent=null,this._active=!1,this._dynamics={x:new r,y:new r},this._hammer=i.get(e,t),this._hammer.on(`hammer.input`,this._handleHammerEvent.bind(this)),this._opts.hammerEvent!=`pan`&&this._opts.hammerEvent!=`pinch`)throw Error(this._opts.hammerEvent+` is not a hammerEvent managed in DragControlMethod`);this._hammer.on(this._opts.hammerEvent+`start`,this._handleStart.bind(this)),this._hammer.on(this._opts.hammerEvent+`move`,this._handleMove.bind(this)),this._hammer.on(this._opts.hammerEvent+`end`,this._handleEnd.bind(this)),this._hammer.on(this._opts.hammerEvent+`cancel`,this._handleEnd.bind(this))}n(d),d.prototype.destroy=function(){this._hammer.release(),s(this)},d.prototype._handleHammerEvent=function(e){if(e.isFirst){if(u&&this._active)throw Error(`DragControlMethod active detected when already active`);this._active=!0,this.emit(`active`)}if(e.isFinal){if(u&&!this._active)throw Error(`DragControlMethod inactive detected when already inactive`);this._active=!1,this.emit(`inactive`)}},d.prototype._handleStart=function(e){e.preventDefault(),this._startEvent=e},d.prototype._handleMove=function(e){e.preventDefault(),this._startEvent&&(this._updateDynamicsMove(e),this.emit(`parameterDynamics`,`axisScaledX`,this._dynamics.x),this.emit(`parameterDynamics`,`axisScaledY`,this._dynamics.y))},d.prototype._handleEnd=function(e){e.preventDefault(),this._startEvent&&(this._updateDynamicsRelease(e),this.emit(`parameterDynamics`,`axisScaledX`,this._dynamics.x),this.emit(`parameterDynamics`,`axisScaledY`,this._dynamics.y)),this._startEvent=!1,this._lastEvent=!1},d.prototype._updateDynamicsMove=function(e){var t=e.deltaX,n=e.deltaY,r=this._lastEvent||this._startEvent;r&&(t-=r.deltaX,n-=r.deltaY);var i=this._element.getBoundingClientRect(),a=i.right-i.left,o=i.bottom-i.top;t/=a,n/=o,this._dynamics.x.reset(),this._dynamics.y.reset(),this._dynamics.x.offset=-t,this._dynamics.y.offset=-n,this._lastEvent=e};var f=[null,null];d.prototype._updateDynamicsRelease=function(e){var t=this._element.getBoundingClientRect(),n=t.right-t.left,r=t.bottom-t.top,i=1e3*e.velocityX/n,a=1e3*e.velocityY/r;this._dynamics.x.reset(),this._dynamics.y.reset(),this._dynamics.x.velocity=i,this._dynamics.y.velocity=a,o(this._opts.friction,this._dynamics.x.velocity,this._dynamics.y.velocity,this._opts.maxFrictionTime,f),this._dynamics.x.friction=f[0],this._dynamics.y.friction=f[1]},t.exports=d})),Ns=i(((e,t)=>{var n=l(),r=Ds(),i=As(),a=xs(),o=js().maxFriction,s=g(),c={speed:8,friction:6,maxFrictionTime:.3};function u(e,t,n){this._element=e,this._opts=a(n||{},c),this._active=!1,this._hammer=i.get(e,t),this._dynamics={x:new r,y:new r},this._hammer.on(`panstart`,this._handleStart.bind(this)),this._hammer.on(`panmove`,this._handleMove.bind(this)),this._hammer.on(`panend`,this._handleRelease.bind(this)),this._hammer.on(`pancancel`,this._handleRelease.bind(this))}n(u),u.prototype.destroy=function(){this._hammer.release(),s(this)},u.prototype._handleStart=function(e){e.preventDefault(),this._active||(this._active=!0,this.emit(`active`))},u.prototype._handleMove=function(e){e.preventDefault(),this._updateDynamics(e,!1)},u.prototype._handleRelease=function(e){e.preventDefault(),this._updateDynamics(e,!0),this._active&&(this._active=!1,this.emit(`inactive`))};var d=[null,null];u.prototype._updateDynamics=function(e,t){var n=this._element.getBoundingClientRect(),r=n.right-n.left,i=n.bottom-n.top,a=Math.max(r,i),s=e.deltaX/a*this._opts.speed,c=e.deltaY/a*this._opts.speed;this._dynamics.x.reset(),this._dynamics.y.reset(),this._dynamics.x.velocity=s,this._dynamics.y.velocity=c,t&&(o(this._opts.friction,this._dynamics.x.velocity,this._dynamics.y.velocity,this._opts.maxFrictionTime,d),this._dynamics.x.friction=d[0],this._dynamics.y.friction=d[1]),this.emit(`parameterDynamics`,`x`,this._dynamics.x),this.emit(`parameterDynamics`,`y`,this._dynamics.y)},t.exports=u})),Ps=i(((e,t)=>{var n=l(),r=Ds(),i=xs(),a=g(),o={frictionTime:.2,zoomDelta:.001};function s(e,t){this._element=e,this._opts=i(t||{},o),this._dynamics=new r,this._eventList=[];var n=this._opts.frictionTime?this.withSmoothing:this.withoutSmoothing;this._wheelListener=n.bind(this),e.addEventListener(`wheel`,this._wheelListener)}n(s),s.prototype.destroy=function(){this._element.removeEventListener(`wheel`,this._wheelListener),a(this)},s.prototype.withoutSmoothing=function(e){this._dynamics.offset=c(e)*this._opts.zoomDelta,this.emit(`parameterDynamics`,`zoom`,this._dynamics),e.preventDefault(),this.emit(`active`),this.emit(`inactive`)},s.prototype.withSmoothing=function(e){var t=e.timeStamp;for(this._eventList.push(e);this._eventList[0].timeStamp<t-this._opts.frictionTime*1e3;)this._eventList.shift(0);for(var n=0,r=0;r<this._eventList.length;r++){var i=c(this._eventList[r])*this._opts.zoomDelta;n+=i/this._opts.frictionTime}this._dynamics.velocity=n,this._dynamics.friction=Math.abs(n)/this._opts.frictionTime,this.emit(`parameterDynamics`,`zoom`,this._dynamics),e.preventDefault(),this.emit(`active`),this.emit(`inactive`)};function c(e){var t=e.deltaMode==1?20:1;return e.deltaY*t}t.exports=s})),Fs=i(((e,t)=>{var n=l(),r=Ds(),i=As(),a=g();function o(e,t,n){this._hammer=i.get(e,t),this._lastEvent=null,this._active=!1,this._dynamics=new r,this._hammer.on(`pinchstart`,this._handleStart.bind(this)),this._hammer.on(`pinch`,this._handleEvent.bind(this)),this._hammer.on(`pinchend`,this._handleEnd.bind(this)),this._hammer.on(`pinchcancel`,this._handleEnd.bind(this))}n(o),o.prototype.destroy=function(){this._hammer.release(),a(this)},o.prototype._handleStart=function(){this._active||(this._active=!0,this.emit(`active`))},o.prototype._handleEnd=function(){this._lastEvent=null,this._active&&(this._active=!1,this.emit(`inactive`))},o.prototype._handleEvent=function(e){var t=e.scale;this._lastEvent&&(t/=this._lastEvent.scale),this._dynamics.offset=(t-1)*-1,this.emit(`parameterDynamics`,`zoom`,this._dynamics),this._lastEvent=e},t.exports=o})),Is=i(((e,t)=>{var n=l(),r=Ds(),i=g();function a(e){if(!e)throw Error(`VelocityControlMethod: parameter must be defined`);this._parameter=e,this._dynamics=new r}n(a),a.prototype.destroy=function(){i(this)},a.prototype.setVelocity=function(e){this._dynamics.velocity=e,this.emit(`parameterDynamics`,this._parameter,this._dynamics)},a.prototype.setFriction=function(e){this._dynamics.friction=e,this.emit(`parameterDynamics`,this._parameter,this._dynamics)},t.exports=a})),Ls=i(((e,t)=>{var n=l(),r=Ds(),i=g();function a(e,t,n,i){if(!e)throw Error(`ElementPressControlMethod: element must be defined`);if(!t)throw Error(`ElementPressControlMethod: parameter must be defined`);if(!n)throw Error(`ElementPressControlMethod: velocity must be defined`);if(!i)throw Error(`ElementPressControlMethod: friction must be defined`);this._element=e,this._pressHandler=this._handlePress.bind(this),this._releaseHandler=this._handleRelease.bind(this),e.addEventListener(`mousedown`,this._pressHandler),e.addEventListener(`mouseup`,this._releaseHandler),e.addEventListener(`mouseleave`,this._releaseHandler),e.addEventListener(`touchstart`,this._pressHandler),e.addEventListener(`touchmove`,this._releaseHandler),e.addEventListener(`touchend`,this._releaseHandler),this._parameter=t,this._velocity=n,this._friction=i,this._dynamics=new r,this._pressing=!1}n(a),a.prototype.destroy=function(){this._element.removeEventListener(`mousedown`,this._pressHandler),this._element.removeEventListener(`mouseup`,this._releaseHandler),this._element.removeEventListener(`mouseleave`,this._releaseHandler),this._element.removeEventListener(`touchstart`,this._pressHandler),this._element.removeEventListener(`touchmove`,this._releaseHandler),this._element.removeEventListener(`touchend`,this._releaseHandler),i(this)},a.prototype._handlePress=function(){this._pressing=!0,this._dynamics.velocity=this._velocity,this._dynamics.friction=0,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`active`)},a.prototype._handleRelease=function(){this._pressing&&(this._dynamics.friction=this._friction,this.emit(`parameterDynamics`,this._parameter,this._dynamics),this.emit(`inactive`)),this._pressing=!1},t.exports=a})),Rs=i(((e,t)=>{var n=l(),r=Ds(),i=u(),a=g();function o(e){e||={},this._methods=[],this._parameters=[`x`,`y`,`axisScaledX`,`axisScaledY`,`zoom`,`yaw`,`pitch`,`roll`],this._now=e.nowForTesting||i,this._composedOffsets={},this._composeReturn={offsets:this._composedOffsets,changing:null}}n(o),o.prototype.add=function(e){if(!this.has(e)){var t={};this._parameters.forEach(function(e){t[e]={dynamics:new r,time:null}});var n=this._updateDynamics.bind(this,t),i={instance:e,dynamics:t,parameterDynamicsHandler:n};e.addEventListener(`parameterDynamics`,n),this._methods.push(i)}},o.prototype.remove=function(e){var t=this._indexOfInstance(e);if(t>=0){var n=this._methods.splice(t,1)[0];n.instance.removeEventListener(`parameterDynamics`,n.parameterDynamicsHandler)}},o.prototype.has=function(e){return this._indexOfInstance(e)>=0},o.prototype._indexOfInstance=function(e){for(var t=0;t<this._methods.length;t++)if(this._methods[t].instance===e)return t;return-1},o.prototype.list=function(){for(var e=[],t=0;t<this._methods.length;t++)e.push(this._methods[t].instance);return e},o.prototype._updateDynamics=function(e,t,n){var r=e[t];if(!r)throw Error(`Unknown control parameter `+t);var i=this._now();r.dynamics.update(n,(i-r.time)/1e3),r.time=i,this.emit(`change`)},o.prototype._resetComposedOffsets=function(){for(var e=0;e<this._parameters.length;e++)this._composedOffsets[this._parameters[e]]=0},o.prototype.offsets=function(){var e,t=!1,n=this._now();this._resetComposedOffsets();for(var r=0;r<this._methods.length;r++)for(var i=this._methods[r].dynamics,a=0;a<this._parameters.length;a++){e=this._parameters[a];var o=i[e],s=o.dynamics;s.offset!=null&&(this._composedOffsets[e]+=s.offset,s.offset=null);var c=(n-o.time)/1e3,l=s.offsetFromVelocity(c);l&&(this._composedOffsets[e]+=l);var u=s.velocityAfter(c);s.velocity=u,u&&(t=!0),o.time=n}return this._composeReturn.changing=t,this._composeReturn},o.prototype.destroy=function(){for(var e=this.list(),t=0;t<e.length;t++)this.remove(e[t]);a(this)},t.exports=o})),zs=i(((e,t)=>{var n=l(),r=Rs(),i=g(),a=typeof MARZIPANODEBUG<`u`&&MARZIPANODEBUG.controls;function o(e){e||={},this._methods={},this._methodGroups={},this._composer=new r,this._enabled=e&&e.enabled?!!e.enabled:!0,this._activeCount=0,this.updatedViews_=[],this._attachedRenderLoop=null}n(o),o.prototype.destroy=function(){this.detach(),this._composer.destroy(),i(this)},o.prototype.methods=function(){var e={};for(var t in this._methods)e[t]=this._methods[t];return e},o.prototype.method=function(e){return this._methods[e]},o.prototype.registerMethod=function(e,t,n){if(this._methods[e])throw Error(`Control method already registered with id `+e);this._methods[e]={instance:t,enabled:!1,active:!1,activeHandler:this._handleActive.bind(this,e),inactiveHandler:this._handleInactive.bind(this,e)},n&&this.enableMethod(e,t)},o.prototype.unregisterMethod=function(e){var t=this._methods[e];if(!t)throw Error(`No control method registered with id `+e);t.enabled&&this.disableMethod(e),delete this._methods[e]},o.prototype.enableMethod=function(e){var t=this._methods[e];if(!t)throw Error(`No control method registered with id `+e);t.enabled||(t.enabled=!0,t.active&&this._incrementActiveCount(),this._listen(e),this._updateComposer(),this.emit(`methodEnabled`,e))},o.prototype.disableMethod=function(e){var t=this._methods[e];if(!t)throw Error(`No control method registered with id `+e);t.enabled&&(t.enabled=!1,t.active&&this._decrementActiveCount(),this._unlisten(e),this._updateComposer(),this.emit(`methodDisabled`,e))},o.prototype.addMethodGroup=function(e,t){this._methodGroups[e]=t},o.prototype.removeMethodGroup=function(e){delete this._methodGroups[e]},o.prototype.methodGroups=function(){var e={};for(var t in this._methodGroups)e[t]=this._methodGroups[t];return e},o.prototype.enableMethodGroup=function(e){var t=this;t._methodGroups[e].forEach(function(e){t.enableMethod(e)})},o.prototype.disableMethodGroup=function(e){var t=this;t._methodGroups[e].forEach(function(e){t.disableMethod(e)})},o.prototype.enabled=function(){return this._enabled},o.prototype.enable=function(){this._enabled||(this._enabled=!0,this._activeCount>0&&this.emit(`active`),this.emit(`enabled`),this._updateComposer())},o.prototype.disable=function(){this._enabled&&(this._enabled=!1,this._activeCount>0&&this.emit(`inactive`),this.emit(`disabled`),this._updateComposer())},o.prototype.attach=function(e){this._attachedRenderLoop&&this.detach(),this._attachedRenderLoop=e,this._beforeRenderHandler=this._updateViewsWithControls.bind(this),this._changeHandler=e.renderOnNextFrame.bind(e),this._attachedRenderLoop.addEventListener(`beforeRender`,this._beforeRenderHandler),this._composer.addEventListener(`change`,this._changeHandler)},o.prototype.detach=function(){this._attachedRenderLoop&&=(this._attachedRenderLoop.removeEventListener(`beforeRender`,this._beforeRenderHandler),this._composer.removeEventListener(`change`,this._changeHandler),this._beforeRenderHandler=null,this._changeHandler=null,null)},o.prototype.attached=function(){return this._attachedRenderLoop!=null},o.prototype._listen=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);t.instance.addEventListener(`active`,t.activeHandler),t.instance.addEventListener(`inactive`,t.inactiveHandler)},o.prototype._unlisten=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);t.instance.removeEventListener(`active`,t.activeHandler),t.instance.removeEventListener(`inactive`,t.inactiveHandler)},o.prototype._handleActive=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);if(!t.enabled)throw Error(`Should not receive event from disabled control method`);t.active||(t.active=!0,this._incrementActiveCount())},o.prototype._handleInactive=function(e){var t=this._methods[e];if(!t)throw Error(`Bad method id`);if(!t.enabled)throw Error(`Should not receive event from disabled control method`);t.active&&(t.active=!1,this._decrementActiveCount())},o.prototype._incrementActiveCount=function(){this._activeCount++,a&&this._checkActiveCount(),this._enabled&&this._activeCount===1&&this.emit(`active`)},o.prototype._decrementActiveCount=function(){this._activeCount--,a&&this._checkActiveCount(),this._enabled&&this._activeCount===0&&this.emit(`inactive`)},o.prototype._checkActiveCount=function(){var e=0;for(var t in this._methods){var n=this._methods[t];n.enabled&&n.active&&e++}if(e!=this._activeCount)throw Error(`Bad control state`)},o.prototype._updateComposer=function(){var e=this._composer;for(var t in this._methods){var n=this._methods[t],r=this._enabled&&n.enabled;r&&!e.has(n.instance)&&e.add(n.instance),!r&&e.has(n.instance)&&e.remove(n.instance)}},o.prototype._updateViewsWithControls=function(){var e=this._composer.offsets();e.changing&&this._attachedRenderLoop.renderOnNextFrame(),this.updatedViews_.length=0;for(var t=this._attachedRenderLoop.stage().listLayers(),n=0;n<t.length;n++){var r=t[n].view();this.updatedViews_.indexOf(r)<0&&(t[n].view().updateWithControlParameters(e.offsets),this.updatedViews_.push(r))}},t.exports=o})),Bs=i(((e,t)=>{var n=D().setTransform,r=cs();function i(e,t,i,a){a||=``,n(e,`translateX(`+r(t)+`px) translateY(`+r(i)+`px) translateZ(0) `+a)}t.exports=i})),Vs=i(((e,t)=>{var n=l(),r=Bs(),i=D().setTransform,a=g();function o(e,t,n,r,i){i||={},i.perspective=i.perspective||{},i.perspective.extraTransforms=i.perspective.extraTransforms==null?``:i.perspective.extraTransforms,this._domElement=e,this._parentDomElement=t,this._view=n,this._coords={},this._perspective={},this.setPosition(r),this._parentDomElement.appendChild(this._domElement),this.setPerspective(i.perspective),this._visible=!0,this._position={x:0,y:0}}n(o),o.prototype.destroy=function(){this._parentDomElement.removeChild(this._domElement),a(this)},o.prototype.domElement=function(){return this._domElement},o.prototype.position=function(){return this._coords},o.prototype.setPosition=function(e){for(var t in e)this._coords[t]=e[t];this._update()},o.prototype.perspective=function(){return this._perspective},o.prototype.setPerspective=function(e){for(var t in e)this._perspective[t]=e[t];this._update()},o.prototype.show=function(){this._visible||(this._visible=!0,this._update())},o.prototype.hide=function(){this._visible&&(this._visible=!1,this._update())},o.prototype._update=function(){var e=this._domElement,t=this._coords,n=this._position,r,i,a=!1;if(this._visible){var o=this._view;this._perspective.radius?(a=!0,this._setEmbeddedPosition(o,t)):(o.coordinatesToScreen(t,n),r=n.x,i=n.y,r!=null&&i!=null&&(a=!0,this._setPosition(r,i)))}a?(e.style.display=`block`,e.style.position=`absolute`):(e.style.display=`none`,e.style.position=``)},o.prototype._setEmbeddedPosition=function(e,t){var n=e.coordinatesToPerspectiveTransform(t,this._perspective.radius,this._perspective.extraTransforms);i(this._domElement,n)},o.prototype._setPosition=function(e,t){r(this._domElement,e,t,this._perspective.extraTransforms)},t.exports=o})),Hs=i(((e,t)=>{var n=l(),r=Vs(),i=f(),a=Bs(),o=D().setAbsolute,s=D().setOverflowHidden,c=D().setOverflowVisible,u=D().setNullSize,d=D().setPixelSize,p=D().setWithVendorPrefix(`pointer-events`),m=g();function h(e,t,n,r,i){i||={},this._parentDomElement=e,this._stage=t,this._view=n,this._renderLoop=r,this._hotspots=[],this._visible=!0,this._rect=i.rect,this._visibilityOrRectChanged=!0,this._stageWidth=null,this._stageHeight=null,this._tmpRect={},this._hotspotContainerWrapper=document.createElement(`div`),o(this._hotspotContainerWrapper),p(this._hotspotContainerWrapper,`none`),this._parentDomElement.appendChild(this._hotspotContainerWrapper),this._hotspotContainer=document.createElement(`div`),o(this._hotspotContainer),p(this._hotspotContainer,`all`),this._hotspotContainerWrapper.appendChild(this._hotspotContainer),this._updateHandler=this._update.bind(this),this._renderLoop.addEventListener(`afterRender`,this._updateHandler)}n(h),h.prototype.destroy=function(){for(;this._hotspots.length;)this.destroyHotspot(this._hotspots[0]);this._parentDomElement.removeChild(this._hotspotContainerWrapper),this._renderLoop.removeEventListener(`afterRender`,this._updateHandler),m(this)},h.prototype.domElement=function(){return this._hotspotContainer},h.prototype.setRect=function(e){this._rect=e,this._visibilityOrRectChanged=!0},h.prototype.rect=function(){return this._rect},h.prototype.createHotspot=function(e,t,n){t||={};var i=new r(e,this._hotspotContainer,this._view,t,n);return this._hotspots.push(i),i._update(),this.emit(`hotspotsChange`),i},h.prototype.hasHotspot=function(e){return this._hotspots.indexOf(e)>=0},h.prototype.listHotspots=function(){return[].concat(this._hotspots)},h.prototype.destroyHotspot=function(e){var t=this._hotspots.indexOf(e);if(t<0)throw Error(`No such hotspot`);this._hotspots.splice(t,1),e.destroy(),this.emit(`hotspotsChange`)},h.prototype.hide=function(){this._visible&&(this._visible=!1,this._visibilityOrRectChanged=!0,this._update())},h.prototype.show=function(){this._visible||(this._visible=!0,this._visibilityOrRectChanged=!0,this._update())},h.prototype._update=function(){var e=this._hotspotContainerWrapper,t=this._stage.width(),n=this._stage.height(),r=this._tmpRect;if(this._visibilityOrRectChanged||this._rect&&(t!==this._stageWidth||n!==this._stageHeight)){var o=this._visible;e.style.display=o?`block`:`none`,o&&(this._rect?(i(t,n,this._rect,r),a(e,t*r.x,n*r.y),d(e,t*r.width,n*r.height),s(e)):(a(e,0,0),u(e),c(e))),this._stageWidth=t,this._stageHeight=n,this._visibilityOrRectChanged=!1}for(var l=0;l<this._hotspots.length;l++)this._hotspots[l]._update()},t.exports=h})),Us=i(((e,t)=>{var n=Ts(),r=Cs(),i=Hs(),a=l(),o=u(),s=ps(),c=ns(),d=xs(),f=g();function p(e,t){this._viewer=e,this._view=t,this._layers=[],this._hotspotContainer=new i(e._controlContainer,e.stage(),this._view,e.renderLoop()),this._movement=null,this._movementStartTime=null,this._movementStep=null,this._movementParams=null,this._movementCallback=null,this._updateMovementHandler=this._updateMovement.bind(this),this._updateHotspotContainerHandler=this._updateHotspotContainer.bind(this),this._viewer.addEventListener(`sceneChange`,this._updateHotspotContainerHandler),this._viewChangeHandler=this.emit.bind(this,`viewChange`),this._view.addEventListener(`change`,this._viewChangeHandler),this._updateHotspotContainer()}a(p),p.prototype.destroy=function(){this._view.removeEventListener(`change`,this._viewChangeHandler),this._viewer.removeEventListener(`sceneChange`,this._updateHotspotContainerHandler),this._movement&&this.stopMovement(),this._hotspotContainer.destroy(),this.destroyAllLayers(),f(this)},p.prototype.hotspotContainer=function(){return this._hotspotContainer},p.prototype.layer=function(){return this._layers[0]},p.prototype.listLayers=function(){return[].concat(this._layers)},p.prototype.view=function(){return this._view},p.prototype.viewer=function(){return this._viewer},p.prototype.visible=function(){return this._viewer.scene()===this},p.prototype.createLayer=function(e){e||={};var t=e.textureStoreOpts||{},i=e.layerOpts||{},a=e.source,o=e.geometry,s=this._view,c=new n(a,o,s,new r(a,this._viewer.stage(),t),i);return this._layers.push(c),e.pinFirstLevel&&c.pinFirstLevel(),this.emit(`layerChange`),c},p.prototype.destroyLayer=function(e){var t=this._layers.indexOf(e);if(t<0)throw Error(`No such layer in scene`);this._layers.splice(t,1),this.emit(`layerChange`),e.textureStore().destroy(),e.destroy()},p.prototype.destroyAllLayers=function(){for(;this._layers.length>0;)this.destroyLayer(this._layers[0])},p.prototype.switchTo=function(e,t){return this._viewer.switchScene(this,e,t)},p.prototype.lookTo=function(e,t,n){var r=this;if(t||={},n||=s,c(e)!==`object`)throw Error(`Target view parameters must be an object`);var i=t.ease==null?function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)}:t.ease,a=t.controlsInterrupt!=null&&t.controlsInterrupt,o=t.transitionDuration==null?1e3:t.transitionDuration,l=t.shortest==null||t.shortest,u=this._view,f=u.parameters(),p={};d(p,e),d(p,f),l&&u.normalizeToClosest&&u.normalizeToClosest(p,p);var m=function(){var e=!1;return function(t,n){if(n>=o&&e)return null;var r=Math.min(n/o,1);for(var a in t){var s=f[a],c=p[a];t[a]=s+i(r)*(c-s)}return e=n>=o,t}},h=this._viewer.controls().enabled();a||this._viewer.controls().disable(),this.startMovement(m,function(){h&&r._viewer.controls().enable(),n()})},p.prototype.startMovement=function(e,t){var n=this._viewer.renderLoop();this._movement&&this.stopMovement();var r=e();if(typeof r!=`function`)throw Error(`Bad movement`);this._movement=e,this._movementStep=r,this._movementStartTime=o(),this._movementParams={},this._movementCallback=t,n.addEventListener(`beforeRender`,this._updateMovementHandler),n.renderOnNextFrame()},p.prototype.stopMovement=function(){var e=this._movementCallback,t=this._viewer.renderLoop();this._movement&&(this._movement=null,this._movementStep=null,this._movementStartTime=null,this._movementParams=null,this._movementCallback=null,t.removeEventListener(`beforeRender`,this._updateMovementHandler),e&&e())},p.prototype.movement=function(){return this._movement},p.prototype._updateMovement=function(){if(!this._movement)throw Error(`Should not call update`);var e=this._viewer.renderLoop(),t=this._view,n=o()-this._movementStartTime,r=this._movementStep,i=this._movementParams;i=t.parameters(i),i=r(i,n),i==null?this.stopMovement():(t.setParameters(i),e.renderOnNextFrame())},p.prototype._updateHotspotContainer=function(){this.visible()?this._hotspotContainer.show():this._hotspotContainer.hide()},t.exports=p})),Ws=i(((e,t)=>{var n=l(),r=xs(),i=u(),a={duration:1/0};function o(e){e=r(e||{},a),this._duration=e.duration,this._startTime=null,this._handle=null,this._check=this._check.bind(this)}n(o),o.prototype.start=function(){this._startTime=i(),this._handle==null&&this._duration<1/0&&this._setup(this._duration)},o.prototype.started=function(){return this._startTime!=null},o.prototype.stop=function(){this._startTime=null,this._handle!=null&&(clearTimeout(this._handle),this._handle=null)},o.prototype._setup=function(e){this._handle=setTimeout(this._check,e)},o.prototype._teardown=function(){clearTimeout(this._handle),this._handle=null},o.prototype._check=function(){var e=i()-this._startTime,t=this._duration-e;this._teardown(),t<=0?(this.emit(`timeout`),this._startTime=null):t<1/0&&this._setup(t)},o.prototype.duration=function(){return this._duration},o.prototype.setDuration=function(e){this._duration=e,this._startTime!=null&&this._check()},t.exports=o})),Gs=i(((e,t)=>{var n=xs(),r=g(),i={active:`move`,inactive:`default`,disabled:`default`};function a(e,t,r,a){a=n(a||{},i),this._element=r,this._controls=e,this._id=t,this._attached=!1,this._setActiveCursor=this._setCursor.bind(this,a.active),this._setInactiveCursor=this._setCursor.bind(this,a.inactive),this._setDisabledCursor=this._setCursor.bind(this,a.disabled),this._setOriginalCursor=this._setCursor.bind(this,this._element.style.cursor),this._updateAttachmentHandler=this._updateAttachment.bind(this),e.addEventListener(`methodEnabled`,this._updateAttachmentHandler),e.addEventListener(`methodDisabled`,this._updateAttachmentHandler),e.addEventListener(`enabled`,this._updateAttachmentHandler),e.addEventListener(`disabled`,this._updateAttachmentHandler),this._updateAttachment()}a.prototype.destroy=function(){this._detachFromControlMethod(this._controls.method(this._id)),this._setOriginalCursor(),this._controls.removeEventListener(`methodEnabled`,this._updateAttachmentHandler),this._controls.removeEventListener(`methodDisabled`,this._updateAttachmentHandler),this._controls.removeEventListener(`enabled`,this._updateAttachmentHandler),this._controls.removeEventListener(`disabled`,this._updateAttachmentHandler),r(this)},a.prototype._updateAttachment=function(){var e=this._controls,t=this._id;e.enabled()&&e.method(t).enabled?this._attachToControlMethod(e.method(t)):this._detachFromControlMethod(e.method(t))},a.prototype._attachToControlMethod=function(e){this._attached||=(e.instance.addEventListener(`active`,this._setActiveCursor),e.instance.addEventListener(`inactive`,this._setInactiveCursor),e.active?this._setActiveCursor():this._setInactiveCursor(),!0)},a.prototype._detachFromControlMethod=function(e){this._attached&&=(e.instance.removeEventListener(`active`,this._setActiveCursor),e.instance.removeEventListener(`inactive`,this._setInactiveCursor),this._setDisabledCursor(),!1)},a.prototype._setCursor=function(e){this._element.style.cursor=e},t.exports=a})),Ks=i(((e,t)=>{var n=xs(),r=Ms(),i=Ns(),a=Ps(),o=Fs(),s=Os(),c={mouseViewMode:`drag`,dragMode:`pan`};function l(e,t,l){l=n(l||{},c);var u={mouseViewDrag:new r(t,`mouse`),mouseViewQtvr:new i(t,`mouse`),leftArrowKey:new s(37,`x`,-.7,3),rightArrowKey:new s(39,`x`,.7,3),upArrowKey:new s(38,`y`,-.7,3),downArrowKey:new s(40,`y`,.7,3),plusKey:new s(107,`zoom`,-.7,3),minusKey:new s(109,`zoom`,.7,3),wKey:new s(87,`y`,-.7,3),aKey:new s(65,`x`,-.7,3),sKey:new s(83,`y`,.7,3),dKey:new s(68,`x`,.7,3),qKey:new s(81,`roll`,.7,3),eKey:new s(69,`roll`,-.7,3)},d=[`scrollZoom`,`touchView`,`pinch`];l.scrollZoom!==!1&&(u.scrollZoom=new a(t));var f={arrowKeys:[`leftArrowKey`,`rightArrowKey`,`upArrowKey`,`downArrowKey`],plusMinusKeys:[`plusKey`,`minusKey`],wasdKeys:[`wKey`,`aKey`,`sKey`,`dKey`],qeKeys:[`qKey`,`eKey`]};switch(l.dragMode){case`pinch`:u.pinch=new r(t,`touch`,{hammerEvent:`pinch`});break;case`pan`:u.touchView=new r(t,`touch`),u.pinch=new o(t,`touch`);break;default:throw Error(`Unknown drag mode: `+l.dragMode)}switch(l.mouseViewMode){case`drag`:d.push(`mouseViewDrag`);break;case`qtvr`:d.push(`mouseViewQtvr`);break;default:throw Error(`Unknown mouse view mode: `+l.mouseViewMode)}for(var p in u){var m=u[p];e.registerMethod(p,m),d.indexOf(p)>=0&&e.enableMethod(p)}for(var h in f){var g=f[h];e.addMethodGroup(h,g)}return u}t.exports=l})),qs=i(((e,t)=>{var n=u();function r(e,t,r){var i=!1,a=n();function o(){if(!i){var s=(n()-a)/e;s<1?(t(s),requestAnimationFrame(o)):(t(1),r())}}return t(0),requestAnimationFrame(o),function(){i=!0,r.apply(null,arguments)}}t.exports=r})),Js=i(((e,t)=>{var n=l(),r=Es(),i=zs(),a=Us(),o=Ws(),s=O(),c=Gs(),u=As(),d=Ks(),f=qo(),p=D().setOverflowHidden,m=D().setAbsolute,h=D().setFullSize,_=qs(),v=ps(),y=g();function b(e,t){t||={},this._domElement=e,p(e),this._stage=new s(t.stage),f(this._stage),this._domElement.appendChild(this._stage.domElement()),this._controlContainer=document.createElement(`div`),m(this._controlContainer),h(this._controlContainer),e.appendChild(this._controlContainer),this._size={},this.updateSize(),this._updateSizeListener=this.updateSize.bind(this),window.addEventListener(`resize`,this._updateSizeListener),this._renderLoop=new r(this._stage),this._controls=new i,this._controlMethods=d(this._controls,this._controlContainer,t.controls),this._controls.attach(this._renderLoop),this._hammerManagerTouch=u.get(this._controlContainer,`touch`),this._hammerManagerMouse=u.get(this._controlContainer,`mouse`),this._dragCursor=new c(this._controls,`mouseViewDrag`,e,t.cursors&&t.cursors.drag||{}),this._renderLoop.start(),this._scenes=[],this._currentScene=null,this._replacedScene=null,this._cancelCurrentTween=null,this._layerChangeHandler=this._updateSceneLayers.bind(this),this._viewChangeHandler=this.emit.bind(this,`viewChange`),this._idleTimer=new o,this._idleTimer.start(),this._resetIdleTimerHandler=this._resetIdleTimer.bind(this),this.addEventListener(`viewChange`,this._resetIdleTimerHandler),this._triggerIdleTimerHandler=this._triggerIdleTimer.bind(this),this._idleTimer.addEventListener(`timeout`,this._triggerIdleTimerHandler),this._stopMovementHandler=this.stopMovement.bind(this),this._controls.addEventListener(`active`,this._stopMovementHandler),this.addEventListener(`sceneChange`,this._stopMovementHandler),this._idleMovement=null}n(b),b.prototype.destroy=function(){for(var e in window.removeEventListener(`resize`,this._updateSizeListener),this._currentScene&&this._removeSceneEventListeners(this._currentScene),this._replacedScene&&this._removeSceneEventListeners(this._replacedScene),this._dragCursor.destroy(),this._controlMethods)this._controlMethods[e].destroy();for(;this._scenes.length;)this.destroyScene(this._scenes[0]);this._domElement.removeChild(this._stage.domElement()),this._stage.destroy(),this._renderLoop.destroy(),this._controls.destroy(),this._controls=null,this._cancelCurrentTween&&this._cancelCurrentTween(),y(this)},b.prototype.updateSize=function(){var e=this._size;e.width=this._domElement.clientWidth,e.height=this._domElement.clientHeight,this._stage.setSize(e)},b.prototype.stage=function(){return this._stage},b.prototype.renderLoop=function(){return this._renderLoop},b.prototype.controls=function(){return this._controls},b.prototype.domElement=function(){return this._domElement},b.prototype.createScene=function(e){e||={};var t=this.createEmptyScene({view:e.view});return t.createLayer({source:e.source,geometry:e.geometry,pinFirstLevel:e.pinFirstLevel,textureStoreOpts:e.textureStoreOpts,layerOpts:e.layerOpts}),t},b.prototype.createEmptyScene=function(e){e||={};var t=new a(this,e.view);return this._scenes.push(t),t},b.prototype._updateSceneLayers=function(){var e,t,n=this._stage,r=this._currentScene,i=this._replacedScene,a=n.listLayers(),o=[];if(i&&(o=o.concat(i.listLayers())),r&&(o=o.concat(r.listLayers())),Math.abs(a.length-o.length)!==1)throw Error(`Stage and scene out of sync`);if(o.length<a.length){for(e=0;e<a.length;e++)if(t=a[e],o.indexOf(t)<0){this._removeLayerFromStage(t);break}}if(o.length>a.length)for(e=0;e<o.length;e++)t=o[e],a.indexOf(t)<0&&this._addLayerToStage(t,e)},b.prototype._addLayerToStage=function(e,t){e.pinFirstLevel(),this._stage.addLayer(e,t)},b.prototype._removeLayerFromStage=function(e){this._stage.removeLayer(e),e.unpinFirstLevel(),e.textureStore().clearNotPinned()},b.prototype._addSceneEventListeners=function(e){e.addEventListener(`layerChange`,this._layerChangeHandler),e.addEventListener(`viewChange`,this._viewChangeHandler)},b.prototype._removeSceneEventListeners=function(e){e.removeEventListener(`layerChange`,this._layerChangeHandler),e.removeEventListener(`viewChange`,this._viewChangeHandler)},b.prototype.destroyScene=function(e){var t=this._scenes.indexOf(e);if(t<0)throw Error(`No such scene in viewer`);var n,r;if(this._currentScene===e){for(this._removeSceneEventListeners(e),r=e.listLayers(),n=0;n<r.length;n++)this._removeLayerFromStage(r[n]);this._cancelCurrentTween&&=(this._cancelCurrentTween(),null),this._currentScene=null,this.emit(`sceneChange`)}if(this._replacedScene===e){for(this._removeSceneEventListeners(e),r=e.listLayers(),n=0;n<r.length;n++)this._removeLayerFromStage(r[n]);this._replacedScene=null}this._scenes.splice(t,1),e.destroy()},b.prototype.destroyAllScenes=function(){for(;this._scenes.length>0;)this.destroyScene(this._scenes[0])},b.prototype.hasScene=function(e){return this._scenes.indexOf(e)>=0},b.prototype.listScenes=function(){return[].concat(this._scenes)},b.prototype.scene=function(){return this._currentScene},b.prototype.view=function(){var e=this._currentScene;return e?e.view():null},b.prototype.lookTo=function(e,t,n){var r=this._currentScene;r&&r.lookTo(e,t,n)},b.prototype.startMovement=function(e,t){var n=this._currentScene;n&&n.startMovement(e,t)},b.prototype.stopMovement=function(){var e=this._currentScene;e&&e.stopMovement()},b.prototype.movement=function(){var e=this._currentScene;if(e)return e.movement()},b.prototype.setIdleMovement=function(e,t){this._idleTimer.setDuration(e),this._idleMovement=t},b.prototype.breakIdleMovement=function(){this.stopMovement(),this._resetIdleTimer()},b.prototype._resetIdleTimer=function(){this._idleTimer.start()},b.prototype._triggerIdleTimer=function(){var e=this._idleMovement;e&&this.startMovement(e)};var x=1e3;function S(e,t,n){t.listLayers().forEach(function(t){t.mergeEffects({opacity:e})}),t._hotspotContainer.domElement().style.opacity=e}b.prototype.switchScene=function(e,t,n){var r=this;t||={},n||=v;var i=this._stage,a=this._currentScene;if(a===e){n();return}if(this._scenes.indexOf(e)<0)throw Error(`No such scene in viewer`);this._cancelCurrentTween&&=(this._cancelCurrentTween(),null);var o=a?a.listLayers():[],s=e.listLayers(),c=i.listLayers();if(a&&(c.length!==o.length||c.length>1&&c[0]!=o[0]))throw Error(`Stage not in sync with viewer`);for(var l=t.transitionDuration==null?x:t.transitionDuration,u=t.transitionUpdate==null?S:t.transitionUpdate,d=0;d<s.length;d++)this._addLayerToStage(s[d]);function f(t){u(t,e,a)}function p(){if(r._replacedScene){r._removeSceneEventListeners(r._replacedScene),o=r._replacedScene.listLayers();for(var e=0;e<o.length;e++)r._removeLayerFromStage(o[e]);r._replacedScene=null}r._cancelCurrentTween=null,n()}this._cancelCurrentTween=_(l,f,p),this._currentScene=e,this._replacedScene=a,this.emit(`sceneChange`),this.emit(`viewChange`),this._addSceneEventListeners(e)},t.exports=b})),Ys=i(((e,n)=>{var r=(B(),t(z)).vec4,i=(B(),t(z)).mat4;function a(e){var t=e||{};return t.colorOffset=t.colorOffset||r.create(),t.colorMatrix=t.colorMatrix||i.create(),t}function o(e,t,n){s(n,e,t.colorMatrix),r.add(n,n,t.colorOffset)}function s(e,t,n){var r=t[0],i=t[1],a=t[2],o=t[3];return e[0]=n[0]*r+n[1]*i+n[2]*a+n[3]*o,e[1]=n[4]*r+n[5]*i+n[6]*a+n[7]*o,e[2]=n[8]*r+n[9]*i+n[10]*a+n[11]*o,e[3]=n[12]*r+n[13]*i+n[14]*a+n[15]*o,e}var c=r.create();function l(e,t){for(var n=e.width,i=e.height,a=e.data,s=0;s<n*i;s++)r.set(c,a[s*4+0]/255,a[s*4+1]/255,a[s*4+2]/255,a[s*4+3]/255),o(c,t,c),a[s*4+0]=c[0]*255,a[s*4+1]=c[1]*255,a[s*4+2]=c[2]*255,a[s*4+3]=c[3]*255}n.exports={identity:a,applyToPixel:o,applyToImageData:l}})),Xs=i(((e,t)=>{var n=xs(),r=.1,i=.01,a={yawSpeed:r,pitchSpeed:r,fovSpeed:r,yawAccel:i,pitchAccel:i,fovAccel:i,targetPitch:0,targetFov:null};function o(e){e=n(e||{},a);var t=e.yawSpeed,r=e.pitchSpeed,i=e.fovSpeed,o=e.yawAccel,s=e.pitchAccel,c=e.fovAccel,l=e.targetPitch,u=e.targetFov;return function(){var e=0,n=0,a=0,d=0,f=0,p=0,m=0,h,g,_,v;return function(y,b){if(h=(b-e)/1e3,f=Math.min(n+h*o,t),g=f*h,y.yaw+=g,l!=null&&y.pitch!==l){var x=.5*a*a/s;p=Math.abs(l-y.pitch)>x?Math.min(a+h*s,r):Math.max(a-h*s,0),_=p*h,l<y.pitch&&(y.pitch=Math.max(l,y.pitch-_)),l>y.pitch&&(y.pitch=Math.min(l,y.pitch+_))}if(u!=null&&y.fov!==l){var S=.5*d*d/c;m=Math.abs(u-y.fov)>S?Math.min(d+h*c,i):Math.max(d-h*c,0),v=m*h,u<y.fov&&(y.fov=Math.max(u,y.fov-v)),u>y.fov&&(y.fov=Math.min(u,y.fov+v))}return e=b,n=f,a=p,d=m,y}}}t.exports=o})),Zs=i(((e,t)=>{function n(e,t){function n(){t&&t.length>0?e.apply(null,t):e()}setTimeout(n,0)}t.exports=n})),Qs=i(((e,t)=>{function n(e){return e*Math.PI/180}t.exports=n})),$s=i(((e,t)=>{function n(e){return e*180/Math.PI}t.exports=n})),ec=i(((e,n)=>{n.exports={WebGlStage:O(),WebGlCubeRenderer:Ho(),WebGlFlatRenderer:Uo(),WebGlEquirectRenderer:Ko(),registerDefaultRenderers:qo(),CubeGeometry:rs(),FlatGeometry:is(),EquirectGeometry:as(),RectilinearView:us(),FlatView:ds(),ImageUrlSource:gs(),SingleAssetSource:_s(),StaticAsset:b(),DynamicAsset:vs(),TextureStore:Cs(),Layer:Ts(),RenderLoop:Es(),KeyControlMethod:Os(),DragControlMethod:Ms(),QtvrControlMethod:Ns(),ScrollZoomControlMethod:Ps(),PinchZoomControlMethod:Fs(),VelocityControlMethod:Is(),ElementPressControlMethod:Ls(),Controls:zs(),Dynamics:Ds(),Viewer:Js(),Scene:Us(),Hotspot:Vs(),HotspotContainer:Hs(),colorEffects:Ys(),registerDefaultControls:Ks(),autorotate:Xs(),util:{async:p(),cancelize:h(),chain:ms(),clamp:Lo(),clearOwnProperties:g(),cmp:es(),compose:ls(),convertFov:os(),decimal:cs(),defaults:xs(),defer:Zs(),degToRad:Qs(),delay:hs(),dom:D(),extend:ws(),hash:Jo(),inherits:x(),mod:Yo(),noop:ps(),now:u(),once:m(),pixelRatio:T(),radToDeg:$s(),real:ss(),retry:Ss(),tween:qs(),type:ns()},dependencies:{bowser:C(),glMatrix:(B(),t(z)),eventEmitter:l(),hammerjs:ks()}}})),tc=e(ec(),1);function nc(e){}function rc(e){oc(e)}function ic(e,t,n){let r=document.createElement(`div`);r.className=`hotspot link-hotspot`,r.setAttribute(`role`,`button`),r.setAttribute(`tabindex`,`0`),r.setAttribute(`aria-label`,`Menuju ${t||e.target}`);let i=document.createElement(`div`);i.className=`link-hotspot-pulse`;let a=document.createElement(`img`);a.src=`/img/link.png`,a.className=`link-hotspot-icon`;let o=e.rotation??0;a.style.transform=`rotate(${o}rad)`,a.style.webkitTransform=`rotate(${o}rad)`,i.appendChild(a);let s=document.createElement(`div`);s.className=`hotspot-tooltip link-hotspot-tooltip`,s.textContent=t||`Lihat Lokasi`,r.appendChild(i),r.appendChild(s);let c=t=>{t.stopPropagation(),n(e.target)};return r.addEventListener(`click`,c),r.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&c(e)}),r}function ac(e){let t=document.createElement(`div`);t.className=typeof window<`u`&&window.innerWidth>768?`hotspot info-hotspot visible`:`hotspot info-hotspot`,t.setAttribute(`role`,`button`),t.setAttribute(`tabindex`,`0`);let n=document.createElement(`div`);n.className=`info-hotspot-header`;let r=document.createElement(`div`);r.className=`info-hotspot-icon-wrapper`;let i=document.createElement(`img`);i.src=`/img/info.png`,i.className=`info-hotspot-icon`,i.alt=`Info`,r.appendChild(i);let a=document.createElement(`div`);a.className=`info-hotspot-title-wrapper`;let o=document.createElement(`div`);o.className=`info-hotspot-title`,o.innerHTML=e.title||`Informasi`,a.appendChild(o);let s=document.createElement(`div`);s.className=`info-hotspot-close-wrapper`;let c=document.createElement(`img`);c.src=`/img/close.png`,c.className=`info-hotspot-close-icon`,c.alt=`Tutup`,s.appendChild(c),n.appendChild(r),n.appendChild(a),n.appendChild(s);let l=document.createElement(`div`);return l.className=`info-hotspot-text`,l.innerHTML=e.text||`<p>Tidak ada keterangan tambahan.</p>`,t.appendChild(n),t.appendChild(l),n.addEventListener(`click`,n=>{n.stopPropagation();let r=t.classList.toggle(`visible`);window.innerWidth<=600&&r&&oc(e)}),s.addEventListener(`click`,e=>{e.stopPropagation(),t.classList.remove(`visible`)}),t}function oc(e){let t=document.getElementById(`mobile-info-modal`);t&&t.remove();let n=document.createElement(`div`);n.id=`mobile-info-modal`,n.className=`modal-overlay`,n.innerHTML=`
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
  `,document.body.appendChild(n);let r=()=>n.remove();n.querySelector(`#btn-close-mob-info`)?.addEventListener(`click`,r),n.querySelector(`#btn-dismiss-mob-info`)?.addEventListener(`click`,r),n.addEventListener(`click`,e=>{e.target===n&&r()})}function sc(e,t,n,r,i=null){if(!e||!t)return;let a=e.hotspotContainer();if(typeof a.listHotspots==`function`)[...a.listHotspots()].forEach(e=>a.destroyHotspot(e));else if(a._hotspots)for(;a._hotspots.length>0;)a.destroyHotspot(a._hotspots[0]);Array.isArray(i)&&i.length>0?i.filter(e=>e.sceneId===t.id&&e.status===`published`&&e.isActive!==!1).forEach(e=>{if(e.type===`link`){let t=n.find(t=>t.id===e.target),i=ic(e,e.title?e.title:t?t.name:e.target,r);a.createHotspot(i,{yaw:e.yaw,pitch:e.pitch})}else{let t=ac(e);a.createHotspot(t,{yaw:e.yaw,pitch:e.pitch})}}):((t.linkHotspots||[]).forEach(e=>{let t=n.find(t=>t.id===e.target),i=ic(e,t?t.name:e.target,r);a.createHotspot(i,{yaw:e.yaw,pitch:e.pitch})}),(t.infoHotspots||[]).forEach(e=>{let t=ac(e);a.createHotspot(t,{yaw:e.yaw,pitch:e.pitch})}))}var V=new class{constructor(){this.overlay=null,this.box=null,this.activeResolve=null,this.keyHandler=null}ensureElements(){if(this.overlay&&document.body.contains(this.overlay))return;let e=document.createElement(`div`);e.id=`ecomodal-confirm-overlay`,e.className=`ecomodal-overlay hidden`,e.setAttribute(`role`,`dialog`),e.setAttribute(`aria-modal`,`true`),e.innerHTML=`
      <div class="ecomodal-card" id="ecomodal-confirm-card">
        <div class="ecomodal-header">
          <div class="ecomodal-icon-wrap" id="ecomodal-icon-wrap">
            <span id="ecomodal-icon">🗑️</span>
          </div>
          <div class="ecomodal-title-wrap">
            <h3 id="ecomodal-title" class="ecomodal-title">Konfirmasi Tindakan</h3>
            <span id="ecomodal-subtitle" class="ecomodal-subtitle">Tindakan ini memerlukan konfirmasi</span>
          </div>
          <button type="button" class="ecomodal-close-btn" id="ecomodal-btn-close" aria-label="Tutup">✕</button>
        </div>
        <div class="ecomodal-body">
          <div id="ecomodal-message" class="ecomodal-message"></div>
        </div>
        <div class="ecomodal-footer">
          <button type="button" class="ecomodal-btn ecomodal-btn-cancel" id="ecomodal-btn-cancel">Batal</button>
          <button type="button" class="ecomodal-btn ecomodal-btn-confirm" id="ecomodal-btn-confirm">Ya, Lanjutkan</button>
        </div>
      </div>
    `,document.body.appendChild(e),this.overlay=e,this.box=e.querySelector(`#ecomodal-confirm-card`);let t=e.querySelector(`#ecomodal-btn-cancel`),n=e.querySelector(`#ecomodal-btn-confirm`),r=e.querySelector(`#ecomodal-btn-close`);t.addEventListener(`click`,()=>this.resolve(!1)),r.addEventListener(`click`,()=>this.resolve(!1)),n.addEventListener(`click`,()=>this.resolve(!0)),e.addEventListener(`click`,t=>{t.target===e&&this.resolve(!1)})}resolve(e){if(this.keyHandler&&=(document.removeEventListener(`keydown`,this.keyHandler),null),this.overlay&&this.overlay.classList.add(`hidden`),this.activeResolve){let t=this.activeResolve;this.activeResolve=null,t(e)}}confirm({title:e=`Konfirmasi Hapus`,subtitle:t=`Tindakan ini tidak dapat dibatalkan`,message:n=`Apakah Anda yakin ingin menghapus data ini?`,type:r=`danger`,confirmText:i=`Ya, Hapus`,cancelText:a=`Batal`,icon:o=`🗑️`}={}){this.ensureElements();let s=this.overlay.querySelector(`#ecomodal-title`),c=this.overlay.querySelector(`#ecomodal-subtitle`),l=this.overlay.querySelector(`#ecomodal-message`),u=this.overlay.querySelector(`#ecomodal-icon-wrap`),d=this.overlay.querySelector(`#ecomodal-icon`),f=this.overlay.querySelector(`#ecomodal-btn-confirm`),p=this.overlay.querySelector(`#ecomodal-btn-cancel`);return s.textContent=e,c.textContent=t,l.innerHTML=typeof n==`string`?n.split(`

`).map(e=>`<p style="margin: 0 0 10px 0; line-height: 1.55;">${e.replace(/\n/g,`<br>`)}</p>`).join(``):n,d.textContent=o,u.className=`ecomodal-icon-wrap ecomodal-type-${r}`,f.textContent=i,f.className=`ecomodal-btn ecomodal-btn-${r}`,p.textContent=a,this.overlay.classList.remove(`hidden`),f.focus(),new Promise(e=>{this.activeResolve=e,this.keyHandler=e=>{e.key===`Escape`&&(e.preventDefault(),this.resolve(!1))},document.addEventListener(`keydown`,this.keyHandler)})}alert({title:e=`Pemberitahuan`,subtitle:t=`Informasi Sistem`,message:n=``,type:r=`warning`,confirmText:i=`Mengerti`,icon:a=`⚠️`}={}){this.ensureElements();let o=this.overlay.querySelector(`#ecomodal-btn-cancel`);return o.style.display=`none`,this.confirm({title:e,subtitle:t,message:n,type:r,confirmText:i,icon:a}).finally(()=>{o.style.display=``})}};typeof window<`u`&&(window.EcoModal=V);var cc=`vtour_admin_token`,lc=`vtour_admin_user`,H={getToken(){try{return sessionStorage.getItem(cc)||localStorage.getItem(cc)||``}catch{return``}},setSession(e,t){try{e&&(sessionStorage.setItem(cc,e),localStorage.setItem(cc,e)),t&&(sessionStorage.setItem(lc,JSON.stringify(t)),localStorage.setItem(lc,JSON.stringify(t)))}catch{}},clearSession(){try{sessionStorage.removeItem(cc),sessionStorage.removeItem(lc),localStorage.removeItem(cc),localStorage.removeItem(lc)}catch{}},getUser(){try{let e=sessionStorage.getItem(lc)||localStorage.getItem(lc);if(e)return JSON.parse(e)}catch{}if(typeof document<`u`){let e=document.querySelector(`meta[name="eco-user"]`);if(e&&e.getAttribute(`content`))try{let t=JSON.parse(e.getAttribute(`content`));if(t&&(t.username||t.email))return t}catch{}}return null},isAuthenticated(){if(this.getToken())return!0;if(typeof document<`u`){let e=document.querySelector(`meta[name="eco-server-auth"]`);if(e&&e.getAttribute(`content`)===`true`)return!0}return!1},getCsrfToken(){if(typeof document>`u`)return``;let e=document.querySelector(`meta[name="csrf-token"]`);if(e&&e.getAttribute(`content`))return e.getAttribute(`content`);let t=document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);return t?decodeURIComponent(t[1]):``},getAuthHeaders(e={},t=!1){let n=this.getToken(),r=this.getCsrfToken(),i={Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`,...n?{Authorization:`Bearer ${n}`}:{},...r?{"X-CSRF-TOKEN":r}:{},...e};return!t&&!i[`Content-Type`]&&(i[`Content-Type`]=`application/json`),i},getAuthHeadersMultipart(e={}){return this.getAuthHeaders(e,!0)},_isHandling401:!1,handleUnauthorized(e,t){if(!this._isHandling401&&(this._isHandling401=!0,setTimeout(()=>{this._isHandling401=!1},4e3),!(typeof window<`u`&&window.location.pathname.includes(`/login`))&&(console.warn(`[Eco Land ApiService] Akses tidak terotorisasi (401) pada: ${t}`),this.clearSession(),typeof window<`u`&&window.location.hash&&window.location.hash.startsWith(`#admin`)))){try{sessionStorage.setItem(`admin_redirect_hash`,window.location.hash)}catch{}setTimeout(()=>{window.location.href=`/login`},300)}},async request(e,t={}){let n=t.body instanceof FormData,r=(t.method||`GET`).toUpperCase(),i=n?this.getAuthHeadersMultipart(t.headers||{}):this.getAuthHeaders(t.headers||{}),a={credentials:`same-origin`,...t,method:r,headers:i},o=await fetch(e,a);return o.status===401&&this.handleUnauthorized(o,e),o},async login(e,t){try{let n=await(await fetch(`/api/auth/login`,{method:`POST`,credentials:`same-origin`,headers:{"Content-Type":`application/json`,Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`,...this.getCsrfToken()?{"X-CSRF-TOKEN":this.getCsrfToken()}:{}},body:JSON.stringify({username:e,password:t})})).json();return n.success&&n.token?(this.setSession(n.token,n.user),{success:!0,user:n.user}):{success:!1,message:n.message||`Login gagal`}}catch(n){try{let n=await(await fetch(`/api.php?action=login`,{method:`POST`,credentials:`same-origin`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({username:e,password:t})})).json();return n.success&&n.token?(this.setSession(n.token,n.user),{success:!0,user:n.user}):{success:!1,message:n.message||`Login gagal`}}catch{return{success:!1,message:`Tidak dapat menghubungi server: `+n.message}}}},async logout(){try{await this.request(`/api/auth/logout`,{method:`POST`})}catch{}this.clearSession()},async getHotspots(){try{let e=await fetch(`/api/hotspots`,{credentials:`same-origin`});if(e.ok){let t=await e.json();return Array.isArray(t.hotspots)?t.hotspots:[]}}catch{console.warn(`API /api/hotspots gagal, fallback ke /data/hotspots.json`)}try{let e=await fetch(`/data/hotspots.json`);if(e.ok){let t=await e.json();return Array.isArray(t.hotspots)?t.hotspots:[]}}catch(e){console.error(`Gagal memuat hotspots.json:`,e)}return[]},async saveHotspots(e){let t={version:`1.1.0`,hotspots:e};try{let e=await this.request(`/api/hotspots`,{method:`POST`,body:JSON.stringify(t)});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.message||`HTTP Error ${e.status}`)}return await e.json()}catch(e){try{let e=await fetch(`/api.php?action=save_hotspots`,{method:`POST`,credentials:`same-origin`,headers:this.getAuthHeaders(),body:JSON.stringify(t)});if(e.ok)return await e.json()}catch{}throw e}},async exportBackup(){try{let e=await this.request(`/api/backup/export`);if(e.ok)return await e.json()}catch{}let e=await this.getHotspots();return{exportType:`marzipano_hotspots_backup`,version:`1.1.0`,exportedAt:new Date().toISOString(),project:`Eco Land — Kawasan Penanaman Pohon ±2 Hektare Aceh`,totalHotspots:e.length,data:{version:`1.1.0`,lastUpdated:new Date().toISOString(),hotspots:e}}},async importBackup(e){let t=await this.request(`/api/backup/import`,{method:`POST`,body:JSON.stringify(e)});if(!t.ok){let e=await t.json().catch(()=>({}));throw Error(e.message||`Gagal memulihkan cadangan`)}return await t.json()},async saveSceneCustomName(e,t){try{let n=await this.request(`/api/scenes/rename`,{method:`POST`,body:JSON.stringify({sceneId:e,newName:t})});if(n.ok)return await n.json()}catch{}return{success:!0}},async getScenes(){try{let e=await fetch(`/api/scenes`,{credentials:`same-origin`});if(e.ok)return(await e.json()).scenes||[]}catch(e){console.warn(`Gagal memuat /api/scenes:`,e)}return[]},async getCustomSceneNames(){try{let e=await fetch(`/api/scenes/custom`,{credentials:`same-origin`});if(e.ok)return await e.json()}catch{}return{}},async updateScene(e,t){let n=await this.request(`/api/admin/scenes/${e}`,{method:`PUT`,body:JSON.stringify(t)}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal memperbarui metadata scene`);return r},async getTreeDashboard(e=null){let t=e&&e!==`all`?`?planting_zone_id=${encodeURIComponent(e)}`:``,n=await this.request(`/api/admin/trees/dashboard${t}`);if(!n.ok)throw Error(`Gagal memuat dashboard penanaman`);return await n.json()},async getTreeSpecies(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/trees/species?${t}`);if(!n.ok)throw Error(`Gagal memuat daftar jenis pohon`);return await n.json()},async getTreeSpeciesDetail(e){let t=await this.request(`/api/admin/trees/species/${encodeURIComponent(e)}`);if(!t.ok)throw t.status===404?Error(`Jenis pohon dengan ID "${e}" tidak ditemukan atau telah dihapus.`):Error(`Gagal memuat detail jenis pohon (HTTP ${t.status})`);return await t.json()},async saveTreeSpecies(e,t=null){let n=e instanceof FormData,r=t?`/api/admin/trees/species/${t}`:`/api/admin/trees/species`,i=n&&t?`POST`:t?`PUT`:`POST`;n&&t&&e.append(`_method`,`PUT`);let a=await this.request(r,{method:i,body:n?e:JSON.stringify(e)}),o=await a.json().catch(()=>({}));if(!a.ok){let e=Error(o.message||`Gagal menyimpan jenis pohon (HTTP ${a.status})`);throw e.status=a.status,e.errors=o.errors||null,e.raw=o,e}return o},async deleteTreeSpecies(e){let t=await this.request(`/api/admin/trees/species/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus jenis pohon`);return n},async getPublicTreeSpecies(){let e=await fetch(`/api/tree-species`,{credentials:`same-origin`});if(!e.ok)throw Error(`Gagal memuat katalog publik jenis pohon`);return await e.json()},async getPublicTreeSpeciesDetail(e){let t=await fetch(`/api/tree-species/${e}`,{credentials:`same-origin`});if(!t.ok)throw Error(`Gagal memuat detail jenis pohon`);return await t.json()},async getPlantingActivities(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/trees/activities?${t}`);if(!n.ok)throw Error(`Gagal memuat kegiatan penanaman`);return await n.json()},async savePlantingActivity(e,t=null){let n=t?`/api/admin/trees/activities/${t}`:`/api/admin/trees/activities`,r=t?`PUT`:`POST`,i=await this.request(n,{method:r,body:JSON.stringify(e)}),a=await i.json();if(!i.ok){let e=Error(a.message||`Gagal menyimpan kegiatan penanaman`);throw e.errors=a.errors||null,e.status=i.status,e}return a},async getPlantingActivity(e){let t=await this.request(`/api/admin/trees/activities/${e}`);if(!t.ok)throw Error(`Gagal memuat detail kegiatan penanaman`);return await t.json()},async deletePlantingActivity(e){let t=await this.request(`/api/admin/trees/activities/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus kegiatan penanaman`);return n},async correctPlantingActivityItem(e,t,n){let r=await this.request(`/api/admin/trees/activities/items/${e}/correct`,{method:`POST`,body:JSON.stringify({new_quantity:t,reason:n})}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal menyimpan koreksi bibit awal`);return i},async getTreeSurveys(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/trees/surveys?${t}`);if(!n.ok)throw Error(`Gagal memuat catatan survei pemantauan`);return await n.json()},async getTreeSurveyDetail(e){let t=await this.request(`/api/admin/trees/surveys/${e}`);if(!t.ok)throw Error(`Gagal memuat detail survei pemantauan`);return await t.json()},async saveTreeSurvey(e,t=null){let n=t?`/api/admin/trees/surveys/${t}`:`/api/admin/trees/surveys`,r=t?`PUT`:`POST`,i=await this.request(n,{method:r,body:JSON.stringify(e)}),a=await i.json();if(!i.ok)throw Error(a.message||`Gagal menyimpan survei pemantauan`);return a},async deleteTreeSurvey(e){let t=await this.request(`/api/admin/trees/surveys/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus survei`);return n},async getTreeMaintenance(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/trees/maintenance?${t}`);if(!n.ok)throw Error(`Gagal memuat catatan perawatan`);return await n.json()},async getTreeMaintenanceDetail(e){let t=await this.request(`/api/admin/trees/maintenance/${e}`);if(!t.ok)throw Error(`Gagal memuat detail catatan perawatan`);return await t.json()},async saveTreeMaintenance(e,t=null){let n=t?`/api/admin/trees/maintenance/${t}`:`/api/admin/trees/maintenance`,r=t?`PUT`:`POST`,i=await this.request(n,{method:r,body:JSON.stringify(e)}),a=await i.json();if(!i.ok)throw Error(a.message||`Gagal menyimpan catatan perawatan`);return a},async deleteTreeMaintenance(e){let t=await this.request(`/api/admin/trees/maintenance/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus catatan perawatan`);return n},async previewTreeImport(e,t){let n=new FormData;n.append(`file`,e),n.append(`type`,t);let r=await this.request(`/api/admin/trees/import/preview`,{method:`POST`,body:n}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal memvalidasi berkas impor`);return i},async executeTreeImport(e,t){let n=await this.request(`/api/admin/trees/import/execute`,{method:`POST`,body:JSON.stringify({type:e,data:t,confirm:!0})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menjalankan impor data`);return r},async getZones(e={}){let t=new URLSearchParams(e).toString();try{let e=await this.request(`/api/admin/zones?${t}`);if(e.ok)return await e.json()}catch{}try{let e=await fetch(`/api/zones?${t}`,{credentials:`same-origin`});if(e.ok)return await e.json()}catch{}throw Error(`Gagal memuat daftar kawasan`)},async getZone(e){let t=await this.request(`/api/admin/zones/${e}`);if(!t.ok)throw Error(`Gagal memuat detail kawasan`);return await t.json()},async saveZone(e,t=null){let n=t?`/api/admin/zones/${t}`:`/api/admin/zones`,r=t?`PUT`:`POST`,i=await this.request(n,{method:r,body:JSON.stringify(e)}),a=await i.json();if(!i.ok)throw Error(a.message||`Gagal menyimpan data kawasan`);return a},async deleteZone(e){let t=await this.request(`/api/admin/zones/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus kawasan`);return n},async archiveZone(e){let t=await this.request(`/api/admin/zones/${e}/archive`,{method:`POST`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal mengubah status arsip`);return n},async linkZoneScenes(e,t){let n=await this.request(`/api/admin/zones/${e}/link-scenes`,{method:`POST`,body:JSON.stringify({scene_ids:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menghubungkan panorama`);return r},async getPublicZones(){let e=await fetch(`/api/zones`,{credentials:`same-origin`});if(!e.ok)throw Error(`Gagal memuat kawasan publik`);return await e.json()},async getPublicZone(e){let t=await fetch(`/api/zones/${e}`,{credentials:`same-origin`});if(!t.ok)throw Error(`Gagal memuat detail kawasan publik`);return await t.json()},async getZonePhotos(e,t={}){let n=new URLSearchParams(t).toString(),r=await this.request(`/api/admin/zones/${e}/photos?${n}`);if(!r.ok)throw Error(`Gagal memuat galeri foto kawasan`);return await r.json()},async uploadZonePhotos(e,t){let n=await this.request(`/api/admin/zones/${e}/photos`,{method:`POST`,body:t}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal mengunggah foto kawasan`);return r},async updateZonePhoto(e,t,n){let r=n instanceof FormData,i=`PUT`,a=n;r?(i=`POST`,n.append(`_method`,`PUT`)):a=JSON.stringify(n);let o=await this.request(`/api/admin/zones/${e}/photos/${t}`,{method:i,body:a}),s=await o.json();if(!o.ok)throw Error(s.message||`Gagal memperbarui metadata foto`);return s},async deleteZonePhoto(e,t){let n=await this.request(`/api/admin/zones/${e}/photos/${t}`,{method:`DELETE`}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menghapus foto kawasan`);return r},async setZoneCoverPhoto(e,t){let n=await this.request(`/api/admin/zones/${e}/photos/${t}/set-cover`,{method:`POST`}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menjadikan foto sebagai sampul`);return r},async reorderZonePhotos(e,t){let n=await this.request(`/api/admin/zones/${e}/photos/reorder`,{method:`POST`,body:JSON.stringify({photo_ids:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menyimpan urutan foto`);return r},async getPublicZonePhotos(e){let t=await fetch(`/api/zones/${e}/photos`,{credentials:`same-origin`});if(!t.ok)throw Error(`Gagal memuat galeri foto publik kawasan`);return await t.json()},async getAllPublicPhotos(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/photos?${t}`,{credentials:`same-origin`});if(!n.ok)throw Error(`Gagal memuat galeri foto kawasan publik`);return await n.json()},async getActivityLogs(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/activity-logs?${t}`);if(!n.ok)throw Error(`Gagal memuat log aktivitas`);return await n.json()},async getSettings(){let e=await this.request(`/api/admin/settings`);if(!e.ok)throw Error(`Gagal memuat pengaturan aplikasi`);return await e.json()},async saveSettings(e){let t=await this.request(`/api/admin/settings`,{method:`POST`,body:JSON.stringify({settings:e})}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menyimpan pengaturan`);return n},async uploadLogo(e){let t=await this.request(`/api/admin/settings/logo`,{method:`POST`,body:e}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal mengunggah logo aplikasi`);return n},async removeLogo(){let e=await this.request(`/api/admin/settings/logo`,{method:`DELETE`}),t=await e.json();if(!e.ok)throw Error(t.message||`Gagal menghapus logo aplikasi`);return t},async getUsers(){let e=await this.request(`/api/admin/users`);if(!e.ok)throw Error(`Gagal memuat daftar pengguna`);return await e.json()},async saveUser(e,t=null){let n=t?`/api/admin/users/${t}`:`/api/admin/users`,r=t?`PUT`:`POST`,i=await this.request(n,{method:r,body:JSON.stringify(e)}),a=await i.json();if(!i.ok)throw Error(a.message||`Gagal menyimpan data pengguna`);return a},async deleteUser(e){let t=await this.request(`/api/admin/users/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus pengguna`);return n},async getPublicAlbums(e={}){let t=new URLSearchParams(e).toString(),n=await fetch(`/api/albums?${t}`,{credentials:`same-origin`});if(!n.ok)throw Error(`Gagal memuat album galeri`);return await n.json()},async getPublicAlbumDetail(e){let t=await fetch(`/api/albums/${e}`,{credentials:`same-origin`});if(!t.ok)throw Error(`Gagal memuat detail album`);return await t.json()},async getAdminAlbums(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/albums?${t}`);if(!n.ok)throw Error(`Gagal memuat daftar album`);return await n.json()},async getAdminAlbumDetail(e){let t=await this.request(`/api/admin/albums/${e}`);if(!t.ok)throw Error(`Gagal memuat detail album`);return await t.json()},async createAlbum(e){let t=await this.request(`/api/admin/albums`,{method:`POST`,body:JSON.stringify(e)}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal membuat album`);return n},async updateAlbum(e,t){let n=await this.request(`/api/admin/albums/${e}`,{method:`PUT`,body:JSON.stringify(t)}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal memperbarui album`);return r},async deleteAlbum(e){let t=await this.request(`/api/admin/albums/${e}`,{method:`DELETE`}),n=await t.json();if(!t.ok)throw Error(n.message||`Gagal menghapus album`);return n},async addPhotosToAlbum(e,t){let n=await this.request(`/api/admin/albums/${e}/photos`,{method:`POST`,body:JSON.stringify({photo_ids:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menambahkan foto ke album`);return r},async removePhotoFromAlbum(e,t){let n=await this.request(`/api/admin/albums/${e}/photos/${t}`,{method:`DELETE`}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menghapus foto dari album`);return r},async setAlbumCover(e,t){let n=await this.request(`/api/admin/albums/${e}/cover`,{method:`POST`,body:JSON.stringify({photo_id:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal mengubah sampul album`);return r},async reorderAlbumPhotos(e,t){let n=await this.request(`/api/admin/albums/${e}/reorder`,{method:`POST`,body:JSON.stringify({photo_ids:t})}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal mengubah urutan foto`);return r},async uploadPhotosToAlbum(e,t){let n=await this.request(`/api/admin/albums/${e}/upload-photos`,{method:`POST`,body:t}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal mengunggah foto ke album`);return r},async updateAlbumPhotoMetadata(e,t,n){let r=await this.request(`/api/admin/albums/${e}/photos/${t}`,{method:`PUT`,body:JSON.stringify(n)}),i=await r.json();if(!r.ok)throw Error(i.message||`Gagal memperbarui informasi foto`);return i},async deleteAlbumPhotoPermanently(e,t){let n=await this.request(`/api/admin/albums/${e}/photos/${t}/permanent`,{method:`DELETE`}),r=await n.json();if(!n.ok)throw Error(r.message||`Gagal menghapus foto permanen`);return r},async getAvailablePhotosForAlbum(e={}){let t=new URLSearchParams(e).toString(),n=await this.request(`/api/admin/albums/available-photos?${t}`);if(!n.ok)throw Error(`Gagal memuat foto tersedia`);return await n.json()}},uc=[];function dc(e){typeof e==`function`&&uc.push(e)}function fc(e){uc.forEach(t=>{try{t(e)}catch(e){console.warn(`Error in auth change listener:`,e)}})}async function pc(){document.getElementById(`admin-login-modal`);let e=document.getElementById(`admin-login-form`),t=document.getElementById(`admin-login-error`),n=document.getElementById(`btn-close-login-modal`),r=document.getElementById(`btn-admin-logout`);e&&e.addEventListener(`submit`,async n=>{n.preventDefault();let r=document.getElementById(`admin-username`),i=document.getElementById(`admin-password`),a=e.querySelector(`button[type="submit"]`);if(!r||!i)return;a.disabled=!0,a.textContent=`Memverifikasi...`,t&&t.classList.add(`hidden`);let o=await H.login(r.value.trim(),i.value);a.disabled=!1,a.textContent=`Masuk Administrator`,o.success?(gc(),r.value=``,i.value=``,s.success(`✓ Berhasil Masuk`,`Selamat datang kembali, ${o.user?.name||o.user?.username||`Administrator`}!`),fc(!0)):(t&&(t.textContent=o.message||`Kredensial tidak valid`,t.classList.remove(`hidden`)),s.error(`✕ Gagal Masuk`,o.message||`Username atau kata sandi admin salah.`))}),n&&n.addEventListener(`click`,gc);let i=e=>{e&&typeof e.preventDefault==`function`&&e.preventDefault(),hc()};r&&r.addEventListener(`click`,i),document.querySelectorAll(`.btn-sidebar-quick-logout`).forEach(e=>{e.addEventListener(`click`,i)}),await mc()}async function mc(){if(typeof document>`u`)return null;let e=document.querySelector(`meta[name="eco-server-auth"]`),t=e&&e.getAttribute(`content`)===`true`,n=H.getToken();if(t||n)try{let e=await H.request(`/api/auth/verify`);if(e.ok){let t=await e.json();if(t.authenticated)return t.token?H.setSession(t.token,t.user):t.user&&!n&&H.setSession(``,t.user),t.user}else e.status===401&&!t&&H.clearSession()}catch{}return null}function hc(){try{let e=H.getToken();e&&fetch(`/api/auth/logout`,{method:`POST`,headers:{Authorization:`Bearer ${e}`},keepalive:!0}).catch(()=>{})}catch(e){console.warn(`API logout error:`,e)}H.clearSession();try{sessionStorage.clear(),localStorage.removeItem(`vtour_admin_token`),localStorage.removeItem(`vtour_admin_user`),localStorage.removeItem(`admin_redirect_hash`)}catch{}window.location.href=`/logout`}function gc(){let e=document.getElementById(`admin-login-modal`);e&&e.classList.add(`hidden`)}function _c(){if(H.isAuthenticated())return!0;if(typeof document<`u`){let e=document.querySelector(`meta[name="eco-server-auth"]`);if(e&&e.getAttribute(`content`)===`true`)return!0}return!1}async function vc({scenes:e,hotspots:t,selectedZoneId:n=`all`,onNavigateToPanorama:r,onNavigateToEditor:i,onNavigateToTrees:a,onNavigateToZones:o,onNavigateToSpecies:s,onNavigateToActivities:c,onNavigateToSurveys:l,onNavigateToMaintenance:u,onNavigateToReports:d,onNavigateToLogs:f}){let p=document.getElementById(`admin-dashboard-content`);if(!p)return;let m=new Set(e.map(e=>e.id)),h=e.length,g=t.filter(e=>e.type===`link`);t.filter(e=>e.type===`info`);let _=t.filter(e=>e.status===`draft`),v=t.filter(e=>e.status===`published`);t.filter(e=>e.isActive===!1||e.status===`inactive`);let y=new Set(g.map(e=>e.sceneId));e.filter(e=>!y.has(e.id));let b=g.filter(e=>!m.has(e.target));e.filter(e=>e.status!==`tersedia`);let x=Math.max(0,t.length-b.length),S=null;try{S=await H.getTreeDashboard(n)}catch(e){console.warn(`Could not load tree dashboard stats:`,e)}let C=S?.indicators||{total_zones:0,total_species:0,total_activities:0,total_initial_seedlings:0,total_alive_initial:0,total_dead_initial:0,total_missing_initial:0,total_replacements:0,monitored_batches_count:0,survival_rate:null,survival_rate_status:`data_belum_lengkap`};C.survival_rate!==null&&`${C.survival_rate}`;let w=C.survival_rate_status===`terverifikasi`?`pill-success`:`pill-info`,T=(C.total_zones||0)>0,E=(C.total_species||0)>0,D=`Belum Dimulai`,O=`pill-warning`,k=`Kawasan dan master jenis pohon belum dikonfigurasi.`,A=`Belum ada data kawasan dan spesies terdaftar.`;T&&E?(D=`Selesai`,O=`pill-success`,k=`${C.total_zones} kawasan aktif terdaftar & ${C.total_species} master jenis pohon siap.`,A=`Semua data persiapan awal telah lengkap.`):(T||E)&&(D=`Sedang Berjalan`,O=`pill-info`,k=`${C.total_zones||0} kawasan & ${C.total_species||0} spesies tercatat.`,A=T?`Master jenis pohon belum ditambahkan.`:`Data kawasan belum ditambahkan.`);let j=(C.total_activities||0)>0,ee=(C.total_initial_seedlings||0)>0,te=`Belum Dimulai`,M=`pill-warning`,N=`Belum ada kegiatan penanaman di lapangan yang dicatat.`,ne=`Pencatatan batch/kelompok bibit awal belum dilakukan.`;j&&ee?(te=`Selesai`,M=`pill-success`,N=`${C.total_activities} kegiatan penanaman tercatat dengan total ${C.total_initial_seedlings} bibit awal.`,ne=`Kelompok penanaman aktif di lapangan.`):j&&(te=`Sedang Berjalan`,M=`pill-info`,N=`${C.total_activities} kegiatan tercatat.`,ne=`Rincian jumlah bibit pohon per spesies belum diisi.`);let P=(C.monitored_batches_count||0)>0,re=(C.total_replacements||0)>0,ie=`Belum Dimulai`,ae=`pill-warning`,F=`Pemeriksaan sensus dan tindakan silvikultur belum dicatat.`,oe=`Survei sensus hidup/mati bibit belum diinput.`;P&&re?(ie=`Selesai`,ae=`pill-success`,F=`${C.monitored_batches_count} kelompok telah disensus, ${C.total_replacements} bibit penyulaman tertangani.`,oe=`Survei dan silvikultur aktif berjalan berkala.`):(P||re)&&(ie=`Sedang Berjalan`,ae=`pill-info`,F=P?`${C.monitored_batches_count} kelompok terpantau.`:`${C.total_replacements} bibit disulam.`,oe=P?`Belum ada tindakan penyulaman bibit mati.`:`Survei sensus tanaman belum dicatat.`);let I=h>0,L=v.length>0,se=`Belum Dimulai`,ce=`pill-warning`,le=`Panorama dan hotspot belum disiapkan.`,ue=`Aset panorama atau hotspot belum terpasang.`;I&&L&&_.length===0?(se=`Selesai`,ce=`pill-success`,le=`${h} panorama multiresolution & ${v.length} hotspot aktif terpublikasi.`,ue=`Seluruh hotspot telah terbit untuk publik.`):I&&(se=`Sedang Berjalan`,ce=`pill-info`,le=`${h} panorama tersedia, ${v.length} hotspot terpublikasi.`,ue=_.length>0?`${_.length} hotspot masih berupa draft.`:`Sebagian hotspot belum ditautkan.`);let de=C.survival_rate!==null,R=`Belum Dimulai`,fe=`pill-warning`,pe=`Data evaluasi dan pelaporan belum lengkap.`,me=`Perlu data penanaman dan survei untuk menghasilkan laporan.`;de?(R=`Selesai`,fe=`pill-success`,pe=`Kelangsungan hidup ${C.survival_rate}% terverifikasi. Rekapitulasi & ekspor data siap diunduh.`,me=`Laporan komprehensif siap.`):j&&(R=`Sedang Berjalan`,fe=`pill-info`,pe=`Data awal penanaman tersedia, menunggu hasil survei sensus untuk perhitungan kelulusan hidup (survival rate).`,me=`Perhitungan survival rate membutuhkan sensus survei terverifikasi.`),p.innerHTML=`
    <!-- Top Action Banner -->
    <div class="admin-dashboard-hero bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="admin-hero-content">
        <div class="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/></svg>
          <span>Sistem Informasi Terpadu</span>
        </div>
        <h2 class="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Ringkasan Sistem Informasi Eco Land & Restorasi Kawasan</h2>
        <p class="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Pantau status kelengkapan 6 panorama Marzipano, integritas hotspot interaktif, dan statistik penanaman bibit pohon kawasan ±2 hektare secara aktual.
        </p>
      </div>
      <div class="admin-hero-actions flex items-center gap-2.5 flex-wrap shrink-0">
        <button id="dash-btn-open-editor" class="btn-primary-action btn-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <span>Editor Hotspot</span>
        </button>
        <button id="dash-btn-open-panoramas" class="btn-secondary-action btn-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer">
          <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <span>Panorama (${h})</span>
        </button>
        <button id="dash-btn-open-trees" class="btn-secondary-action btn-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer">
          <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/><path d="M12 8c-1.5 0-3 1.5-3 3"/></svg>
          <span>Data Penanaman</span>
        </button>
      </div>
    </div>

    <!-- E.1. DELAPAN KARTU STATISTIK UTAMA (AKTUAL & NON-FIKTIF) -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
            Indikator Kunci Kawasan & Penanaman (Data Aktual)
          </h3>
        </div>
        <span class="admin-header-pill ${w} text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          ${C.survival_rate_status===`terverifikasi`?`Terverifikasi`:`Belum Ada Sensus`}
        </span>
      </div>
      <div class="admin-stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 1. Total Kawasan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Total Kawasan</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-slate-900 leading-tight">${C.total_zones}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Lahan terdaftar dalam sistem</div>
        </div>

        <!-- 2. Kawasan Aktif -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Kawasan Aktif</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-blue-600 leading-tight">${C.total_zones}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Dalam status restorasi aktif</div>
        </div>

        <!-- 3. Total Jenis Pohon -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Total Jenis Pohon</span>
            <div class="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/><path d="M12 8c-1.5 0-3 1.5-3 3"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-slate-900 leading-tight">${C.total_species}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Spesies terdata di master database</div>
        </div>

        <!-- 4. Total Kegiatan Penanaman -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Kegiatan Penanaman</span>
            <div class="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-sky-700 leading-tight">${C.total_activities}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Batch kelompok bibit tercatat</div>
        </div>

        <!-- 5. Total Bibit Awal yang Tercatat -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Total Bibit Awal</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-blue-600 leading-tight">${C.total_initial_seedlings?.toLocaleString(`id-ID`)||0}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Batang ditanam (rekaman historis)</div>
        </div>

        <!-- 6. Jumlah Kelompok yang Sudah Dipantau -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Kelompok Dipantau</span>
            <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-indigo-700 leading-tight">${C.monitored_batches_count}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Memiliki catatan sensus lapangan</div>
        </div>

        <!-- 7. Jumlah Scene Panorama -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Scene Panorama</span>
            <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-slate-900 leading-tight">${h}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Titik foto 360° Marzipano</div>
        </div>

        <!-- 8. Jumlah Hotspot Valid & Terdaftar -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Hotspot Valid</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-blue-600 leading-tight">${x}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">${v.length} publik, ${_.length} draft</div>
        </div>
      </div>
    </div>

    <!-- E.2. PANEL TAHAPAN PENGELOLAAN KAWASAN (WORKFLOW 5 TAHAPAN) -->
    <div class="mb-8">
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
            Alur & Tahapan Pengelolaan Kawasan Penanaman
          </h3>
        </div>
        <p class="text-slate-500 text-xs mt-1">
          Panduan progres berbasis data aktual. Admin dapat membuka seluruh modul kapan saja secara mandiri.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <!-- Tahap 1: Persiapan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${D===`Selesai`?`#059669`:D===`Sedang Berjalan`?`#0284c7`:`#d97706`};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 1</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Persiapan Kawasan & Spesies</h4>
              </div>
              <span class="admin-header-pill ${O} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${D}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${k}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${A}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-zones" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>
              <span>Kelola Kawasan</span>
            </button>
            <button id="stage-btn-species" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/></svg>
              <span>Master Spesies</span>
            </button>
          </div>
        </div>

        <!-- Tahap 2: Kegiatan Penanaman -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${te===`Selesai`?`#059669`:te===`Sedang Berjalan`?`#0284c7`:`#d97706`};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 2</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Kegiatan Penanaman</h4>
              </div>
              <span class="admin-header-pill ${M} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${te}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${N}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${ne}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-activities" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
              <span>Pencatatan Penanaman</span>
            </button>
          </div>
        </div>

        <!-- Tahap 3: Pemantauan dan Perawatan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${ie===`Selesai`?`#059669`:ie===`Sedang Berjalan`?`#0284c7`:`#d97706`};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 3</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Pemantauan & Perawatan</h4>
              </div>
              <span class="admin-header-pill ${ae} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${ie}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${F}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${oe}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-surveys" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Pemantauan</span>
            </button>
            <button id="stage-btn-maintenance" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <span>Perawatan & Sulam</span>
            </button>
          </div>
        </div>

        <!-- Tahap 4: Dokumentasi Digital (Virtual Tour) -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${se===`Selesai`?`#059669`:se===`Sedang Berjalan`?`#0284c7`:`#d97706`};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 4</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Dokumentasi Digital 360°</h4>
              </div>
              <span class="admin-header-pill ${ce} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${se}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${le}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${ue}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-editor" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <span>Editor Hotspot</span>
            </button>
            <button id="stage-btn-panoramas" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <span>Panorama</span>
            </button>
          </div>
        </div>

        <!-- Tahap 5: Evaluasi dan Pelaporan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${R===`Selesai`?`#059669`:R===`Sedang Berjalan`?`#0284c7`:`#d97706`};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 5</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Evaluasi & Pelaporan</h4>
              </div>
              <span class="admin-header-pill ${fe} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${R}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${pe}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${me}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-reports" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <span>Rekapitulasi & Ekspor</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  `,p.querySelector(`#dash-btn-open-editor`)?.addEventListener(`click`,()=>{i&&i()}),p.querySelector(`#dash-btn-open-panoramas`)?.addEventListener(`click`,()=>{r&&r()}),p.querySelector(`#dash-btn-open-trees`)?.addEventListener(`click`,()=>{a&&a()}),p.querySelector(`#stage-btn-zones`)?.addEventListener(`click`,()=>{o&&o()}),p.querySelector(`#stage-btn-species`)?.addEventListener(`click`,()=>{s&&s()}),p.querySelector(`#stage-btn-activities`)?.addEventListener(`click`,()=>{c&&c()}),p.querySelector(`#stage-btn-surveys`)?.addEventListener(`click`,()=>{l&&l()}),p.querySelector(`#stage-btn-maintenance`)?.addEventListener(`click`,()=>{u&&u()}),p.querySelector(`#stage-btn-editor`)?.addEventListener(`click`,()=>{i&&i()}),p.querySelector(`#stage-btn-panoramas`)?.addEventListener(`click`,()=>{r&&r()}),p.querySelector(`#stage-btn-reports`)?.addEventListener(`click`,()=>{d&&d()})}var yc=[];async function bc({scenes:e,hotspots:t,onOpenEditorForScene:n,onPreviewScene:r,onScenesUpdated:i}){let a=document.getElementById(`admin-panoramas-content`);if(!a)return;try{let[t,n]=await Promise.all([H.getZones().catch(()=>({zones:[]})),H.getScenes().catch(()=>[])]);yc=t.zones||[],n&&n.length>0&&n.forEach(t=>{let n=e.find(e=>e.id===t.id);n&&(t.planting_zone_id!==void 0&&(n.planting_zone_id=t.planting_zone_id),t.name&&(n.name=t.name),t.description!==void 0&&(n.description=t.description),t.status&&(n.status=t.status),t.initialViewParameters&&(n.initialViewParameters={...n.initialViewParameters,...t.initialViewParameters}),t.initialView&&(n.initialView={...n.initialView,...t.initialView}),t.initial_yaw!==void 0&&(n.initial_yaw=t.initial_yaw),t.initial_pitch!==void 0&&(n.initial_pitch=t.initial_pitch),t.initial_fov!==void 0&&(n.initial_fov=t.initial_fov))})}catch{yc=[]}let o=e=>{let n=t.filter(t=>t.sceneId===e);return{links:n.filter(e=>e.type===`link`).length,infos:n.filter(e=>e.type===`info`).length,drafts:n.filter(e=>e.status===`draft`).length,total:n.length,list:n}};a.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">🌐</span>
          <span>Manajemen Panorama (${e.length} Scene)</span>
        </h2>
        <p class="zones-hero-desc">
          Kelola seluruh panorama 360°, ubah nama tampilan, deskripsi, tautkan ke kawasan restorasi, dan atur sudut pandang awal.
        </p>
      </div>
    </div>

    <div class="admin-panoramas-grid">
      ${e.map((e,t)=>{let n=o(e.id),r=`/tiles/${e.id}/preview.jpg`,i=e.status===`tersedia`,a=yc.find(t=>t.id===e.planting_zone_id);return`
            <div class="admin-pano-card" data-scene-id="${e.id}">
              <div class="pano-card-media">
                <img src="${r}" alt="${xc(e.name)}" class="pano-card-thumb" onerror="this.onerror=null; this.src='/img/placeholder-360.svg';" />
                <div class="pano-card-overlay">
                  <span class="pano-seq-badge">Titik #${e.sequence||t+1}</span>
                  <span class="pano-status-badge ${i?`ready`:`missing`}">
                    ${i?`✓ Aset Tile Siap`:`⏳ Menunggu Foto`}
                  </span>
                </div>
              </div>

              <div class="pano-card-body">
                <div class="pano-card-title-row">
                  <h3 class="pano-display-name" id="name-display-${e.id}">${xc(e.name)}</h3>
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
                          🏞️ ${xc(a.name)}
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
                  <div><strong>Deskripsi:</strong> ${xc(e.description||`Belum ada deskripsi`)}</div>
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
                  ${yc.map(e=>`<option value="${e.id}">${xc(e.name)}</option>`).join(``)}
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
  `,a.querySelectorAll(`.btn-open-editor`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);n&&n(t)})}),a.querySelectorAll(`.btn-preview-scene`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);r&&r(t)})});let c=document.getElementById(`modal-config-scene`),l=document.getElementById(`form-config-scene`),u=()=>{let e=parseFloat(document.getElementById(`cfg-scene-yaw`)?.value||0)||0,t=parseFloat(document.getElementById(`cfg-scene-pitch`)?.value||0)||0,n=parseFloat(document.getElementById(`cfg-scene-fov`)?.value||1.394599)||1.394599,r=(e*180/Math.PI).toFixed(1),i=(t*180/Math.PI).toFixed(1),a=(n*180/Math.PI).toFixed(1),o=document.getElementById(`cfg-scene-yaw-deg`);o&&(o.textContent=`${r}°`);let s=document.getElementById(`cfg-scene-pitch-deg`);s&&(s.textContent=`${i}°`);let c=document.getElementById(`cfg-scene-fov-deg`);c&&(c.textContent=`${a}°`)};[`cfg-scene-yaw`,`cfg-scene-pitch`,`cfg-scene-fov`].forEach(e=>{document.getElementById(e)?.addEventListener(`input`,u)}),document.getElementById(`btn-reset-view-params`)?.addEventListener(`click`,()=>{document.getElementById(`cfg-scene-yaw`).value=0,document.getElementById(`cfg-scene-pitch`).value=0,document.getElementById(`cfg-scene-fov`).value=1.394599,u()}),a.querySelectorAll(`.btn-config-scene`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-scene-id`),r=e.find(e=>e.id===n);if(!r)return;document.getElementById(`cfg-scene-id`).value=r.id,document.getElementById(`cfg-scene-name`).value=r.name,document.getElementById(`cfg-scene-desc`).value=r.description||``;let i=document.getElementById(`cfg-scene-zone`);i&&(i.innerHTML=`
          <option value="">-- Tanpa Kawasan --</option>
          ${yc.map(e=>`<option value="${e.id}" ${e.id===r.planting_zone_id?`selected`:``}>${xc(e.name)}</option>`).join(``)}
        `,i.value=r.planting_zone_id||``),document.getElementById(`cfg-scene-status`).value=r.status||`tersedia`;let a=r.initialViewParameters?.yaw??r.initial_yaw??0,s=r.initialViewParameters?.pitch??r.initial_pitch??0,l=r.initialViewParameters?.fov??r.initial_fov??1.394599;document.getElementById(`cfg-scene-yaw`).value=a,document.getElementById(`cfg-scene-pitch`).value=s,document.getElementById(`cfg-scene-fov`).value=l,u(),document.getElementById(`modal-config-scene-title`).textContent=`⚙️ Edit Panorama: ${r.name} (${r.id})`;let d=o(r.id),f=document.getElementById(`cfg-scene-hotspots-list`);f.innerHTML=d.list.length>0?d.list.map(e=>`
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 6px; background: rgba(255,255,255,0.02); border-radius: 4px;">
            <span>${e.type===`link`?`🧭`:`ℹ️`} <strong>${xc(e.title||`(Tanpa Judul)`)}</strong> <code style="font-size: 10px; color: var(--clr-text-muted);">(${e.type})</code></span>
            <span style="font-size: 10px; color: ${e.status===`published`?`#34d399`:`#f59e0b`};">${e.status}</span>
          </div>
        `).join(``):`<span style="color: var(--clr-text-muted); font-size: 11px;">Belum ada hotspot pada scene ini.</span>`,c.classList.remove(`hidden`),setTimeout(()=>{document.getElementById(`cfg-scene-name`)?.focus()},50)})});let d=()=>c?.classList.add(`hidden`);document.getElementById(`btn-close-config-scene-modal`)?.addEventListener(`click`,d),document.getElementById(`btn-cancel-config-scene`)?.addEventListener(`click`,d),c?.addEventListener(`click`,e=>{e.target===c&&d()}),window._adminPanoModalEscAttached||(window._adminPanoModalEscAttached=!0,window.addEventListener(`keydown`,e=>{if(e.key===`Escape`){let e=document.getElementById(`modal-config-scene`);e&&!e.classList.contains(`hidden`)&&e.classList.add(`hidden`)}})),l?.addEventListener(`submit`,async a=>{a.preventDefault();let o=document.getElementById(`cfg-scene-id`).value,u=e.find(e=>e.id===o);if(!u)return;let d=(e,t=0)=>{if(e===``||e==null)return t;let n=String(e).replace(`,`,`.`).trim(),r=parseFloat(n);return isNaN(r)?t:r},f=document.getElementById(`cfg-scene-zone`).value||null,p={name:document.getElementById(`cfg-scene-name`).value.trim(),description:document.getElementById(`cfg-scene-desc`).value.trim(),planting_zone_id:f,status:document.getElementById(`cfg-scene-status`).value,initial_yaw:d(document.getElementById(`cfg-scene-yaw`).value,0),initial_pitch:d(document.getElementById(`cfg-scene-pitch`).value,0),initial_fov:d(document.getElementById(`cfg-scene-fov`).value,1.394599)},m=l?.querySelector(`button[type="submit"]`);m&&(m.disabled=!0,m.textContent=`Menyimpan...`);try{await H.updateScene(o,p),u.name=p.name,u.description=p.description,u.planting_zone_id=p.planting_zone_id,u.status=p.status,u.initial_yaw=p.initial_yaw,u.initial_pitch=p.initial_pitch,u.initial_fov=p.initial_fov,u.initialViewParameters||={},u.initialViewParameters.yaw=p.initial_yaw,u.initialViewParameters.pitch=p.initial_pitch,u.initialViewParameters.fov=p.initial_fov,u.initialView||={},u.initialView.yaw=p.initial_yaw,u.initialView.pitch=p.initial_pitch,u.initialView.fov=p.initial_fov,c.classList.add(`hidden`),s.saved(`Konfigurasi scene '${u.name}' berhasil disimpan.`),i&&i(),bc({scenes:e,hotspots:t,onOpenEditorForScene:n,onPreviewScene:r,onScenesUpdated:i})}catch(e){s.error(`✕ Gagal menyimpan konfigurasi`,e.message)}finally{m&&(m.disabled=!1,m.textContent=`💾 Simpan Konfigurasi Scene`)}})}function xc(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Sc=class{constructor({scenes:e,getHotspots:t,onHotspotsChanged:n,onSceneSwitchRequest:r}){this.scenes=e,this.getHotspots=t,this.onHotspotsChanged=n,this.onSceneSwitchRequest=r,this.viewer=null,this.currentSceneId=null,this.currentMarzipanoScene=null,this.currentView=null,this.sceneMap=new Map,this.mode=`select`,this.previewShowDrafts=!1,this.selectedHotspotId=null,this.clipboardHotspot=null,this.isDragging=!1,this.hasUnsavedChanges=!1,this.historyStack=[],this.redoStack=[],this.searchQuery=``,this.filterScene=`all`,this.filterType=`all`,this.filterStatus=`all`,this.handleViewerClick=this.handleViewerClick.bind(this),this.handleBeforeUnload=this.handleBeforeUnload.bind(this),this.cachedTreeSpeciesList=[],this.cachedPlantingActivitiesList=[]}init(){this.populateSceneDropdowns(),this.bindToolbarEvents(),this.bindFormEvents(),this.bindSearchFilterEvents(),window.addEventListener(`beforeunload`,this.handleBeforeUnload),this.loadTreeMetadata()}populateSceneDropdowns(){let e=document.getElementById(`editor-scene-select`);if(e&&this.scenes&&this.scenes.length>0){let t=this.currentSceneId||e.value;e.innerHTML=this.scenes.map((e,n)=>`<option value="${e.id}" ${e.id===t?`selected`:``}>Titik ${e.sequence||n+1}: ${Cc(e.name)}</option>`).join(``),this.currentSceneId&&(e.value=this.currentSceneId)}let t=document.getElementById(`editor-filter-scene`);if(t&&this.scenes&&this.scenes.length>0){let e=this.filterScene||t.value||`all`;t.innerHTML=`<option value="all" ${e===`all`?`selected`:``}>Semua Scene</option>`+this.scenes.map((t,n)=>`<option value="${t.id}" ${t.id===e?`selected`:``}>Titik ${t.sequence||n+1}: ${Cc(t.name)}</option>`).join(``)}}async loadTreeMetadata(){if(_c()){try{let e;try{e=await H.getTreeSpecies({per_page:100})}catch{e=await(await fetch(`/api/tree-species`,{credentials:`same-origin`})).json()}this.cachedTreeSpeciesList=e.species||e.data||(Array.isArray(e)?e:[])}catch(e){console.warn(`loadTreeMetadata species error:`,e)}try{let e=await H.getPlantingActivities({per_page:100});this.cachedPlantingActivitiesList=e.activities||e.data||(Array.isArray(e)?e:[])}catch(e){console.warn(`loadTreeMetadata activities error:`,e)}}else{try{let e=await fetch(`/api/tree-species`,{credentials:`same-origin`});if(e.ok){let t=await e.json();this.cachedTreeSpeciesList=t.species||t.data||(Array.isArray(t)?t:[])}}catch(e){console.warn(`loadTreeMetadata public species fallback error:`,e)}this.cachedPlantingActivitiesList=[]}}handleBeforeUnload(e){this.hasUnsavedChanges&&(e.preventDefault(),e.returnValue=`Terdapat perubahan hotspot yang belum disimpan ke server!`)}initViewer(){let e=document.getElementById(`admin-editor-pano`);e&&(this.viewer||(this.viewer=new tc.default.Viewer(e,{controls:{mouseViewMode:`drag`},stage:{progressive:!0}}),e.addEventListener(`click`,this.handleViewerClick),typeof ResizeObserver<`u`&&new ResizeObserver(()=>{this.viewer&&e.clientWidth>0&&e.clientHeight>0&&(this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render())}).observe(e)))}refreshViewerSize(){let e=document.getElementById(`admin-editor-pano`);!this.viewer&&e&&this.initViewer(),this.viewer&&(this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render())}setScene(e,t=!1){if(!e)return;this.currentSceneId=e;let n=document.getElementById(`admin-editor-pano`);if(!this.viewer&&n&&this.initViewer(),!this.viewer)return;let r=this.scenes.find(t=>t.id===e);if(!r)return;this.viewer.updateSize();let i=document.getElementById(`editor-scene-select`);i&&i.value!==e&&(i.value=e);let a=document.getElementById(`editor-preview-scene-select`);a&&a.value!==e&&(a.value=e);let o=this.sceneMap.get(e);if(t&&o){if(this.viewer.hasScene&&this.viewer.hasScene(o.scene))try{this.viewer.destroyScene(o.scene)}catch{}this.sceneMap.delete(e),o=null}if(!o){let t=null,n=null,i=r.initialViewParameters||r.initialView||{};if(r.levels&&r.levels.length>0)t=tc.default.ImageUrlSource.fromString(`/tiles/${r.id}/{z}/{f}/{y}/{x}.jpg`,{cubeMapPreviewUrl:`/tiles/${r.id}/preview.jpg`}),n=new tc.default.CubeGeometry(r.levels);else{let e=r.panorama||r.panorama_path;t=tc.default.ImageUrlSource.fromString(e),n=new tc.default.EquirectGeometry([{width:4096}])}let a=r.faceSize||896,s=tc.default.RectilinearView.limit.traditional(a,100*Math.PI/180,120*Math.PI/180),c=new tc.default.RectilinearView({yaw:i.yaw??0,pitch:i.pitch??0,fov:i.fov??Math.PI/2},s);o={scene:this.viewer.createScene({source:t,geometry:n,view:c,pinFirstLevel:!0}),view:c},this.sceneMap.set(e,o)}this.currentMarzipanoScene=o.scene,this.currentView=o.view,o.scene.switchTo({transitionDuration:0}),this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render(),setTimeout(()=>{this.viewer&&(this.viewer.updateSize(),this.viewer.stage()&&this.viewer.stage().render())},50),this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.updateCurrentSceneTitleUI(r)}updateCurrentSceneTitleUI(e){let t=document.getElementById(`editor-current-scene-name`);t&&(t.textContent=`${e.name} (${e.id})`)}setMode(e){this.mode=e,document.querySelectorAll(`.editor-tool-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-mode`)===e)});let t=document.querySelector(`.admin-editor-layout`),n=document.getElementById(`editor-preview-bar`),r=document.getElementById(`admin-editor-pano`);if(r&&(r.classList.remove(`mode-add`,`mode-move`,`mode-preview`),e.startsWith(`add-`)&&r.classList.add(`mode-add`),e===`move`&&r.classList.add(`mode-move`),e===`preview`&&r.classList.add(`mode-preview`)),e===`preview`){if(t&&t.classList.add(`preview-active`),n){n.classList.remove(`hidden`);let e=document.getElementById(`editor-preview-scene-select`);e&&this.scenes&&(e.innerHTML=this.scenes.map((e,t)=>`<option value="${e.id}" ${e.id===this.currentSceneId?`selected`:``}>Titik ${e.sequence||t+1}: ${Cc(e.name)}</option>`).join(``));let t=document.getElementById(`preview-toggle-drafts`);t&&(t.checked=this.previewShowDrafts)}this.selectedHotspotId=null,document.getElementById(`mobile-info-modal`)?.remove(),this.refreshViewerSize(),this.renderHotspotsOnCurrentScene(),this.showToast(`Mode Pratinjau Pengunjung Aktif.`);return}t&&t.classList.remove(`preview-active`),n&&n.classList.add(`hidden`),document.getElementById(`mobile-info-modal`)?.remove();let i=document.getElementById(`editor-mode-hint`);i&&(e===`add-link`?(i.innerHTML=`👉 <strong>Mode Tambah Navigasi:</strong> Klik posisi pada panorama untuk menempatkan tanda panah.`,i.classList.remove(`hidden`)):e===`add-info`?(i.innerHTML=`👉 <strong>Mode Tambah Informasi:</strong> Klik posisi pada panorama untuk menempatkan titik edukasi.`,i.classList.remove(`hidden`)):e===`move`?(i.innerHTML=`✋ <strong>Mode Pindahkan:</strong> Klik atau seret hotspot pada panorama untuk mengubah posisinya.`,i.classList.remove(`hidden`)):i.classList.add(`hidden`)),this.refreshViewerSize(),this.renderHotspotsOnCurrentScene(),this.renderHotspotsList()}handleViewerClick(e){if(this.currentView&&!this.isDragging&&(this.mode===`add-link`||this.mode===`add-info`)){let t=document.getElementById(`admin-editor-pano`).getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=this.currentView.screenToCoordinates({x:n,y:r});if(!i)return;this.saveHistorySnapshot(`Tambah Hotspot`);let a=this.mode===`add-link`,o=this.scenes.filter(e=>e.id!==this.currentSceneId),s=o.length>0?o[0].id:this.scenes[0].id,c=`hs_${a?`link`:`info`}_${Date.now()}`,l={id:c,sceneId:this.currentSceneId,type:a?`link`:`info`,yaw:i.yaw,pitch:i.pitch,title:a?`Menuju ${this.getSceneName(s)}`:`Informasi Baru`,status:`draft`,isActive:!0,source:`editor`};a?(l.target=s,l.rotation=0,l.icon=`arrow`):(l.text=`<p>Tuliskan deskripsi pohon atau konservasi di sini.</p>`,l.icon=`tree`),this.getHotspots().push(l),this.selectedHotspotId=c,this.hasUnsavedChanges=!0,this.setMode(`select`),this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.openHotspotForm(l),this.notifyHotspotsChanged(),this.showToast(`Hotspot berhasil ditempatkan! Silakan lengkapi formulir di samping.`)}}getSceneName(e){let t=this.scenes.find(t=>t.id===e);return t?t.name:e}renderHotspotsOnCurrentScene(){if(!this.currentMarzipanoScene)return;let e=this.currentMarzipanoScene.hotspotContainer();if(typeof e.listHotspots==`function`)[...e.listHotspots()].forEach(t=>e.destroyHotspot(t));else if(e._hotspots)for(;e._hotspots.length>0;)e.destroyHotspot(e._hotspots[0]);this.getHotspots().filter(e=>e.sceneId===this.currentSceneId).forEach(t=>{if(this.mode===`preview`){if(t.isActive===!1||t.status===`inactive`||!this.previewShowDrafts&&t.status===`draft`)return;if(t.type===`link`){let n=this.scenes.find(e=>e.id===t.target),r=ic(t,t.title?t.title:n?n.name:t.target,e=>{this.setScene(e)});e.createHotspot(r,{yaw:t.yaw,pitch:t.pitch})}else{let n=ac(t);e.createHotspot(n,{yaw:t.yaw,pitch:t.pitch})}return}let n=this.createEditorHotspotDOM(t);e.createHotspot(n,{yaw:t.yaw,pitch:t.pitch})})}createEditorHotspotDOM(e){let t=e.id===this.selectedHotspotId,n=e.type===`link`,r=this.mode===`preview`,i=document.createElement(`div`);if(i.className=`hotspot ${n?`link-hotspot`:`info-hotspot visible`} editor-hotspot-item ${n?`link-type`:`info-type`}`,t&&i.classList.add(`selected`),e.status===`draft`&&i.classList.add(`status-draft`),e.isActive===!1&&i.classList.add(`status-inactive`),i.setAttribute(`data-id`,e.id),i.setAttribute(`role`,`button`),i.setAttribute(`tabindex`,`0`),n){i.setAttribute(`aria-label`,`Menuju ${e.title||this.getSceneName(e.target)}`);let t=document.createElement(`div`);t.className=`link-hotspot-pulse`;let n=document.createElement(`img`);n.src=`/img/link.png`,n.className=`link-hotspot-icon`;let r=e.rotation??0;n.style.transform=`rotate(${r}rad)`,n.style.webkitTransform=`rotate(${r}rad)`,t.appendChild(n);let a=e.title||this.getSceneName(e.target),o=document.createElement(`div`);o.className=`hotspot-tooltip link-hotspot-tooltip editor-hs-tooltip`,o.textContent=a||`Lihat Lokasi`,i.appendChild(t),i.appendChild(o)}else{i.setAttribute(`aria-label`,e.title||`Informasi`);let t=document.createElement(`div`);t.className=`info-hotspot-header`;let n=document.createElement(`div`);n.className=`info-hotspot-icon-wrapper`;let r=document.createElement(`img`);r.src=`/img/info.png`,r.className=`info-hotspot-icon`,r.alt=`Info`,n.appendChild(r);let a=document.createElement(`div`);a.className=`info-hotspot-title-wrapper`;let o=document.createElement(`div`);o.className=`info-hotspot-title editor-hs-tooltip`,o.textContent=e.title||`Informasi`,a.appendChild(o);let s=document.createElement(`div`);s.className=`info-hotspot-close-wrapper`;let c=document.createElement(`img`);c.src=`/img/close.png`,c.className=`info-hotspot-close-icon`,c.alt=`Tutup / Buka`,s.appendChild(c),t.appendChild(n),t.appendChild(a),t.appendChild(s);let l=document.createElement(`div`);l.className=`info-hotspot-text editor-hs-desc-body`,l.innerHTML=Tc(e.text||e.rawText||`Tidak ada keterangan tambahan.`),i.appendChild(t),i.appendChild(l),s.addEventListener(`click`,e=>{e.stopPropagation(),i.classList.toggle(`visible`)})}if(!r){let t=document.createElement(`div`);t.className=`editor-hs-badge badge-${e.status||`published`}`,t.textContent=e.status===`draft`?`D`:e.isActive===!1?`OFF`:`✓`,i.appendChild(t)}return i.addEventListener(`click`,t=>{t.stopPropagation(),this.selectHotspot(e.id)}),this.attachDragEvents(i,e),i}attachDragEvents(e,t){let n=0,r=0,i=!1;e.addEventListener(`pointerdown`,e=>{if(this.mode===`preview`||e.target.closest(`.info-hotspot-close-wrapper`))return;e.stopPropagation(),this.isDragging=!0,i=!1,n=e.clientX,r=e.clientY;let a=document.getElementById(`admin-editor-pano`).getBoundingClientRect(),o=e=>{if(!this.isDragging)return;let o=e.clientX-n,s=e.clientY-r;if(Math.hypot(o,s)>5){i=!0;let n=e.clientX-a.left,r=e.clientY-a.top,o=this.currentView.screenToCoordinates({x:n,y:r});o&&(t.yaw=o.yaw,t.pitch=o.pitch,this.updateCoordinateInputsUI(o.yaw,o.pitch),this.renderHotspotsOnCurrentScene())}},s=()=>{document.removeEventListener(`pointermove`,o),document.removeEventListener(`pointerup`,s),setTimeout(()=>{this.isDragging=!1},50),i&&(this.saveHistorySnapshot(`Pindahkan Hotspot`),this.hasUnsavedChanges=!0,this.notifyHotspotsChanged(),this.showToast(`Posisi hotspot "${t.title||t.id}" berhasil diperbarui.`))};document.addEventListener(`pointermove`,o),document.addEventListener(`pointerup`,s)})}selectHotspot(e,t=!1){this.selectedHotspotId=e;let n=this.getHotspots().find(t=>t.id===e);n&&(n.sceneId!==this.currentSceneId&&this.setScene(n.sceneId),t&&this.currentView&&typeof n.yaw==`number`&&typeof n.pitch==`number`&&(this.currentView.setYaw(n.yaw),this.currentView.setPitch(n.pitch)),this.renderHotspotsOnCurrentScene(),this.highlightListItem(e),this.openHotspotForm(n))}updateCoordinateInputsUI(e,t){let n=document.getElementById(`prop-yaw`),r=document.getElementById(`prop-pitch`);n&&(n.value=Number(e).toFixed(4)),r&&(r.value=Number(t).toFixed(4))}openHotspotForm(e){let t=document.getElementById(`editor-properties-panel`);if(!t)return;t.classList.remove(`empty-state`);let n=e.type===`link`,r=this.scenes.map(t=>`<option value="${t.id}" ${t.id===e.target?`selected`:``}>${t.name} (${t.id})</option>`).join(``),i=wc(e.text||e.rawText||``);t.innerHTML=`
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
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label for="prop-title" style="margin-bottom: 0;">Judul / Nama Hotspot:</label>
            <span id="prop-title-counter" style="font-size: 10px; color: var(--clr-text-dim);">${(e.title||``).length} karakter</span>
          </div>
          <input type="text" id="prop-title" class="form-input" value="${Cc(e.title||``)}" placeholder="Contoh: Pohon Trembesi / Menuju Titik 2" required />
          ${n?`
            <button type="button" id="btn-sync-target-title" class="btn-xs-helper" title="Samakan judul dengan nama scene tujuan saat ini">
              🔄 Gunakan Nama Scene Tujuan
            </button>
          `:``}
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
              Pilih sumber informasi untuk mengisi judul & deskripsi secara otomatis.
            </small>
          </div>

          <div class="form-group ${e.infoSourceType===`tree_species`?``:`hidden`}" id="group-select-tree-species">
            <label for="prop-tree-species">Pilih Spesies Pohon Terkait:</label>
            <select id="prop-tree-species" class="form-select">
              <option value="">-- Pilih Jenis Pohon --</option>
              ${this.cachedTreeSpeciesList.map(t=>`<option value="${t.id}" ${t.id==e.treeSpeciesId?`selected`:``}>${Cc(t.common_name)} (${Cc(t.scientific_name||``)})</option>`).join(``)}
            </select>
          </div>

          <div class="form-group ${e.infoSourceType===`planting_activity`||e.infoSourceType===`latest_survey`?``:`hidden`}" id="group-select-planting-activity">
            <label for="prop-planting-activity">Pilih Kelompok / Batch Penanaman:</label>
            <select id="prop-planting-activity" class="form-select">
              <option value="">-- Pilih Kelompok Penanaman --</option>
              ${this.cachedPlantingActivitiesList.map(t=>`<option value="${t.id}" ${t.id==e.plantingActivityId?`selected`:``}>[${Cc(t.batch_code)}] ${Cc(t.name)} (${Cc(t.location_zone)})</option>`).join(``)}
            </select>
          </div>

          <div class="form-group" id="group-prop-desc">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label for="prop-desc" style="margin-bottom: 0;">Deskripsi Informasi:</label>
              <span id="prop-desc-counter" style="font-size: 10px; color: var(--clr-text-dim);">0 karakter</span>
            </div>

            <!-- Formatting Toolbar -->
            <div class="editor-format-toolbar">
              <button type="button" class="editor-format-btn" data-tag="b" title="Tebal / Bold"><b>B</b></button>
              <button type="button" class="editor-format-btn" data-tag="i" title="Miring / Italic"><i>I</i></button>
              <button type="button" class="editor-format-btn" data-tag="bullet" title="Daftar Poin / Bullet List">• List</button>
              <button type="button" class="editor-format-btn" data-tag="nl" title="Baris Baru / Newline">↵ Baris</button>
              <button type="button" class="editor-format-btn btn-template" id="btn-tpl-tree" title="Sisipkan Template Informasi Pohon">🌿 Template Pohon</button>
              <button type="button" class="editor-format-btn btn-template" id="btn-tpl-activity" title="Sisipkan Template Kegiatan">📋 Template Kegiatan</button>
              <button type="button" class="editor-format-btn btn-clean" id="btn-clean-html" title="Rapikan dan hilangkan tag HTML mentah">🧹 Rapikan Teks</button>
            </div>

            <textarea id="prop-desc" class="form-textarea has-toolbar" rows="5" placeholder="Tuliskan keterangan detail informasi pohon atau konservasi...">${Cc(i)}</textarea>

            <!-- Live Info Preview Box -->
            <div class="editor-info-preview-card">
              <div class="editor-info-preview-header">
                <span class="preview-badge">👁️ Pratinjau Tampilan Info</span>
                <button type="button" id="btn-toggle-preview" class="btn-xs-text">Sembunyikan</button>
              </div>
              <div id="editor-info-preview-content" class="editor-info-preview-body">
                <div class="preview-title" id="preview-title-render">${Cc(e.title||`Informasi`)}</div>
                <div class="preview-text" id="preview-desc-render">${Tc(i)}</div>
              </div>
            </div>
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
    `;let a=document.getElementById(`hotspot-properties-form`),o=document.getElementById(`btn-apply-props`),s=document.getElementById(`btn-duplicate-current`),c=document.getElementById(`btn-delete-current`),l=document.getElementById(`btn-close-prop-form`),u=document.getElementById(`prop-title`),d=document.getElementById(`prop-title-counter`),f=document.getElementById(`preview-title-render`),p=document.getElementById(`prop-desc`),m=document.getElementById(`prop-desc-counter`),h=document.getElementById(`preview-desc-render`),g=document.getElementById(`editor-info-preview-content`),_=document.getElementById(`btn-toggle-preview`),v=document.getElementById(`prop-rotation-slider`),y=document.getElementById(`prop-rotation`),b=document.getElementById(`prop-info-source`),x=document.getElementById(`group-select-tree-species`),S=document.getElementById(`group-select-planting-activity`),C=document.getElementById(`prop-tree-species`),w=document.getElementById(`prop-planting-activity`),T=document.getElementById(`btn-sync-target-title`),E=document.getElementById(`prop-target`),D=t=>{e.title=t,d&&(d.textContent=`${t.length} karakter`),f&&(f.textContent=t||(n?`Navigasi`:`Informasi`));let r=document.querySelector(`.editor-hotspot-item[data-id="${e.id}"] .link-hotspot-tooltip`);r&&(r.textContent=t||this.getSceneName(e.target));let i=document.querySelector(`.editor-hotspot-item[data-id="${e.id}"] .info-hotspot-title`);i&&(i.textContent=t||`Informasi`);let a=document.querySelector(`.editor-hotspots-table tr[data-id="${e.id}"] .hs-row-title, .editor-hotspots-table div[data-id="${e.id}"] .hs-row-title`);a&&(a.textContent=t||e.id),this.hasUnsavedChanges=!0};u?.addEventListener(`input`,e=>{D(e.target.value.trim())}),T&&E&&u&&T.addEventListener(`click`,()=>{let e=this.getSceneName(E.value);u.value=e,D(e),this.showToast(`Judul disinkronkan ke: ${e}`)}),E&&E.addEventListener(`change`,()=>{if(n&&(!u.value||u.value.startsWith(`Menuju `))){let e=this.getSceneName(E.value);u.value=`Menuju ${e}`,D(u.value)}});let O=t=>{if(e.text=t,m){let e=t?t.split(`
`).length:0;m.textContent=`${t.length} karakter • ${e} baris`}h&&(h.innerHTML=Tc(t));let n=document.querySelector(`.editor-hotspot-item[data-id="${e.id}"] .info-hotspot-text`);n&&(n.innerHTML=Tc(t)),this.hasUnsavedChanges=!0};if(p?.addEventListener(`input`,e=>{O(e.target.value)}),p){let e=p.value,t=e?e.split(`
`).length:0;m&&(m.textContent=`${e.length} karakter • ${t} baris`)}_&&g&&_.addEventListener(`click`,()=>{let e=g.classList.toggle(`hidden`);_.textContent=e?`Tampilkan`:`Sembunyikan`});let k=e=>{if(!p)return;let t=p.selectionStart,n=p.selectionEnd,r=p.value,i=r.substring(t,n),a=``,o=0;e===`b`?(a=`<b>${i||`Teks Tebal`}</b>`,o=i?a.length:3+(i||`Teks Tebal`).length):e===`i`?(a=`<i>${i||`Teks Miring`}</i>`,o=i?a.length:3+(i||`Teks Miring`).length):e===`bullet`?(a=i?i.split(`
`).map(e=>e.startsWith(`• `)?e:`• ${e}`).join(`
`):`• Item poin baru
`,o=a.length):e===`nl`&&(a=`
`,o=1),p.value=r.substring(0,t)+a+r.substring(n),p.focus(),p.setSelectionRange(t+o,t+o),O(p.value)};if(a?.querySelectorAll(`.editor-format-btn[data-tag]`).forEach(e=>{e.addEventListener(`click`,()=>{k(e.getAttribute(`data-tag`))})}),document.getElementById(`btn-clean-html`)?.addEventListener(`click`,()=>{if(!p)return;let e=wc(p.value);p.value=e,O(e),this.showToast(`Format teks telah dirapikan.`)}),document.getElementById(`btn-tpl-tree`)?.addEventListener(`click`,()=>{p&&(p.value=(p.value?p.value+`

`:``)+`Nama Lokal: -
Nama Ilmiah: -
Famili: -
Status: Jenis Asli / Lokal

Fungsi Ekologis:
Pohon konservasi dan pengayaan vegetasi kawasan.

Manfaat:
Peneduh alami, penahan erosi, dan penunjang mikroklimat.`,O(p.value),this.showToast(`Template informasi pohon disisipkan.`))}),document.getElementById(`btn-tpl-activity`)?.addEventListener(`click`,()=>{p&&(p.value=(p.value?p.value+`

`:``)+`Batch Penanaman: -
Zona: Blok Restorasi
Tanggal Tanam: -
Pelaksana: -
Total Bibit: 100 bibit
Kelangsungan Hidup: 95%`,O(p.value),this.showToast(`Template kegiatan penanaman disisipkan.`))}),b&&b.addEventListener(`change`,e=>{let t=e.target.value;x&&x.classList.toggle(`hidden`,t!==`tree_species`),S&&S.classList.toggle(`hidden`,t!==`planting_activity`&&t!==`latest_survey`)}),C&&C.addEventListener(`change`,e=>{let t=e.target.value;if(!t)return;let n=this.cachedTreeSpeciesList.find(e=>String(e.id)===String(t));if(!n)return;let r=n.common_name+(n.scientific_name?` (${n.scientific_name})`:``);u&&(u.value=r,D(r));let i=[`Nama Lokal: ${n.local_name||n.common_name}`,`Nama Ilmiah: ${n.scientific_name||`-`}`,`Famili: ${n.family||`-`}`,`Status Asal: ${n.origin_status_label||n.origin_status||`Jenis Asli / Lokal`}`];n.total_planted>0&&i.push(`Total Ditanam: ${n.total_planted} bibit`),i.push(``),i.push(`Fungsi Ekologis:`),i.push(n.ecological_function||`Pohon konservasi dan pengayaan vegetasi alami.`),i.push(``),i.push(`Manfaat & Karakteristik:`),i.push(n.description||n.benefits||`Pohon konservasi pendukung ekosistem.`);let a=i.join(`
`);p&&(p.value=a,O(a)),this.showToast(`Konten diisi dari spesies: ${n.common_name}`)}),w&&w.addEventListener(`change`,e=>{let t=e.target.value;if(!t)return;let n=this.cachedPlantingActivitiesList.find(e=>String(e.id)===String(t));if(!n)return;let r=`[${n.batch_code}] ${n.name}`;u&&(u.value=r,D(r));let i=[`Kelompok / Batch: ${n.batch_code}`,`Nama Kegiatan: ${n.name}`,`Zona Lokasi: ${n.location_zone||`-`}`,`Tanggal Tanam: ${n.activity_date||`-`}`,`Penyelenggara: ${n.organizer||`-`} (PJ: ${n.person_in_charge||`-`})`,`Total Bibit Awal: ${n.total_initial_seedlings||0} bibit`,`Tingkat Kelangsungan: ${n.survival_rate!==null&&n.survival_rate!==void 0?n.survival_rate+`%`:`Dalam pemantauan`}`];Array.isArray(n.species_list)&&n.species_list.length>0&&(i.push(``),i.push(`Komposisi Jenis Pohon:`),n.species_list.forEach(e=>{i.push(`• ${e.common_name||e.species_id}: ${e.quantity} ${e.unit||`bibit`}`)}));let a=i.join(`
`);p&&(p.value=a,O(a)),this.showToast(`Konten diisi dari kelompok: ${n.batch_code}`)}),v&&y){let t=t=>{let n=(parseFloat(t)||0)*Math.PI/180;e.rotation=n;let r=document.querySelector(`.editor-hotspot-item[data-id="${e.id}"] .link-hotspot-icon`);r&&(r.style.transform=`rotate(${n}rad)`,r.style.webkitTransform=`rotate(${n}rad)`),this.hasUnsavedChanges=!0};v.addEventListener(`input`,e=>{y.value=e.target.value,t(e.target.value)}),y.addEventListener(`input`,e=>{v.value=e.target.value,t(e.target.value)})}let A=()=>{this.saveHistorySnapshot(`Edit Pengaturan Hotspot`),e.title=document.getElementById(`prop-title`)?.value.trim()||``,e.yaw=parseFloat(document.getElementById(`prop-yaw`)?.value)||0,e.pitch=parseFloat(document.getElementById(`prop-pitch`)?.value)||0,e.status=document.getElementById(`prop-status`)?.value||`published`,e.isActive=document.getElementById(`prop-active`)?.checked!==!1,n?(e.target=document.getElementById(`prop-target`)?.value,e.rotation=parseFloat(y?.value||0)*Math.PI/180,e.infoSourceType=`manual`,e.treeSpeciesId=null,e.plantingActivityId=null):(e.text=document.getElementById(`prop-desc`)?.value||``,e.infoSourceType=b?.value||`manual`,e.treeSpeciesId=e.infoSourceType===`tree_species`&&document.getElementById(`prop-tree-species`)?.value||null,e.plantingActivityId=(e.infoSourceType===`planting_activity`||e.infoSourceType===`latest_survey`)&&document.getElementById(`prop-planting-activity`)?.value||null),this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.notifyHotspotsChanged(),this.showToast(`Perubahan hotspot diterapkan di memori.`)};o?.addEventListener(`click`,A),a?.addEventListener(`submit`,e=>{e.preventDefault(),A()}),s?.addEventListener(`click`,()=>{this.duplicateHotspot(e.id)}),c?.addEventListener(`click`,()=>{this.deleteHotspot(e.id)}),l?.addEventListener(`click`,()=>{this.selectedHotspotId=null,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),t.innerHTML=`
        <div class="prop-empty-notice">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>Pilih salah satu hotspot di panorama atau daftar untuk mengubah propertinya.</p>
        </div>
      `})}duplicateHotspot(e){let t=this.getHotspots().find(t=>t.id===e);if(!t)return;this.saveHistorySnapshot(`Duplikasi Hotspot`);let n=`hs_copy_${Date.now()}`,r=JSON.parse(JSON.stringify(t));r.id=n,r.title=`${t.title||`Hotspot`} (Salinan)`,r.yaw=(r.yaw||0)+.08,r.pitch=(r.pitch||0)+.01,r.status=`draft`,r.source=`editor`,this.getHotspots().push(r),this.selectedHotspotId=n,this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.openHotspotForm(r),this.notifyHotspotsChanged(),this.showToast(`Hotspot berhasil digandakan sebagai draft (${n})!`)}copyHotspotToClipboard(e){let t=this.getHotspots().find(t=>t.id===e);t&&(this.clipboardHotspot=JSON.parse(JSON.stringify(t)),this.showToast(`Hotspot "${t.title||t.id}" disalin ke papan klip.`))}pasteHotspotFromClipboard(){if(!this.clipboardHotspot){s.warning(`Papan Klip Kosong`,`Salin hotspot terlebih dahulu menggunakan tombol Salin.`);return}this.saveHistorySnapshot(`Tempel Hotspot`);let e=`hs_paste_${Date.now()}`,t=JSON.parse(JSON.stringify(this.clipboardHotspot));if(t.id=e,t.sceneId=this.currentSceneId,t.title=`${t.title} (Tempel)`,t.status=`draft`,t.source=`editor`,t.type===`link`&&t.target===this.currentSceneId){let e=this.scenes.find(e=>e.id!==this.currentSceneId);e&&(t.target=e.id)}this.getHotspots().push(t),this.selectedHotspotId=e,this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.openHotspotForm(t),this.notifyHotspotsChanged(),this.showToast(`Hotspot ditempelkan ke scene ${this.currentSceneId} sebagai draft.`)}async deleteHotspot(e){let t=this.getHotspots().find(t=>t.id===e);if(!t||!await V.confirm({title:`Hapus Hotspot?`,subtitle:`Hotspot "${t.title||t.id}" akan dihapus dari tur visual.`,message:`Apakah Anda yakin ingin menghapus hotspot ini dari adegan tur 360°? Tindakan ini dapat dibatalkan sebelum disimpan permanen.`,type:`danger`,confirmText:`Ya, Hapus Hotspot`,cancelText:`Batal`,icon:`📍`}))return;this.saveHistorySnapshot(`Hapus Hotspot`);let n=this.getHotspots(),r=n.findIndex(t=>t.id===e);r!==-1&&n.splice(r,1),this.selectedHotspotId=null,this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList();let i=document.getElementById(`editor-properties-panel`);i&&(i.innerHTML=`
        <div class="prop-empty-notice">
          <p>Hotspot telah dihapus. Pilih hotspot lain untuk melihat detailnya.</p>
        </div>
      `),this.notifyHotspotsChanged(),this.showToast(`Hotspot berhasil dihapus.`)}saveHistorySnapshot(e=`Perubahan`){let t=JSON.stringify(this.getHotspots());this.historyStack.push(t),this.historyStack.length>30&&this.historyStack.shift(),this.redoStack=[],this.updateUndoRedoButtonsUI()}undo(){if(this.historyStack.length===0)return;let e=JSON.stringify(this.getHotspots());this.redoStack.push(e);let t=this.historyStack.pop(),n=JSON.parse(t),r=this.getHotspots();r.length=0,n.forEach(e=>r.push(e)),this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.updateUndoRedoButtonsUI(),this.notifyHotspotsChanged(),this.showToast(`Undo: Perubahan terakhir dibatalkan.`)}redo(){if(this.redoStack.length===0)return;let e=JSON.stringify(this.getHotspots());this.historyStack.push(e);let t=this.redoStack.pop(),n=JSON.parse(t),r=this.getHotspots();r.length=0,n.forEach(e=>r.push(e)),this.hasUnsavedChanges=!0,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.updateUndoRedoButtonsUI(),this.notifyHotspotsChanged(),this.showToast(`Redo: Perubahan dikembalikan.`)}updateUndoRedoButtonsUI(){let e=document.getElementById(`tool-undo`),t=document.getElementById(`tool-redo`);e&&(e.disabled=this.historyStack.length===0),t&&(t.disabled=this.redoStack.length===0)}async saveToServer(e=!1){let t=this.getHotspots();e&&t.forEach(e=>{e.status===`draft`&&(e.status=`published`)});let n=document.getElementById(`btn-editor-save-draft`),r=document.getElementById(`btn-editor-publish`);n&&(n.disabled=!0),r&&(r.disabled=!0);try{let n=await H.saveHotspots(t);this.hasUnsavedChanges=!1,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.notifyHotspotsChanged(),e?s.published(n?.message||`Seluruh hotspot berhasil dipublikasikan!`):s.saved(n?.message||`Perubahan hotspot berhasil disimpan ke server.`)}catch(e){console.error(`Gagal menyimpan:`,e),s.error(`✕ Gagal menyimpan ke server`,e.message||`Perubahan tetap tersimpan sementara di memori browser.`)}finally{n&&(n.disabled=!1),r&&(r.disabled=!1)}}renderHotspotsList(){let e=document.getElementById(`editor-hotspots-table`),t=document.getElementById(`editor-filter-count`);if(!e)return;let n=[...this.getHotspots()];if(this.filterScene!==`all`&&(n=n.filter(e=>e.sceneId===this.filterScene)),this.filterType!==`all`&&(n=n.filter(e=>e.type===this.filterType)),this.filterStatus!==`all`&&(n=n.filter(e=>e.status===this.filterStatus)),this.searchQuery){let e=this.searchQuery.toLowerCase();n=n.filter(t=>{let n=(t.title||``).toLowerCase().includes(e),r=(t.text||``).toLowerCase().includes(e),i=(t.target||``).toLowerCase().includes(e);return n||r||i})}t&&(t.textContent=`${n.length} Hotspot`),n.length===0?e.innerHTML=`
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
                <div class="hs-row-title">${Cc(e.title||e.id)}</div>
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
        `}).join(``),e.querySelectorAll(`.hs-list-row`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);this.selectHotspot(t,!0)})}))}highlightListItem(e){document.querySelectorAll(`.hs-list-row`).forEach(t=>{t.classList.toggle(`active-row`,t.getAttribute(`data-id`)===e)})}bindToolbarEvents(){document.getElementById(`tool-select`)?.addEventListener(`click`,()=>this.setMode(`select`)),document.getElementById(`tool-add-link`)?.addEventListener(`click`,()=>this.setMode(`add-link`)),document.getElementById(`tool-add-info`)?.addEventListener(`click`,()=>this.setMode(`add-info`)),document.getElementById(`tool-move`)?.addEventListener(`click`,()=>this.setMode(`move`)),document.getElementById(`tool-preview`)?.addEventListener(`click`,()=>{this.setMode(this.mode===`preview`?`select`:`preview`)}),document.getElementById(`btn-exit-preview`)?.addEventListener(`click`,()=>{this.setMode(`select`)});let e=document.getElementById(`editor-preview-scene-select`);e&&e.addEventListener(`change`,e=>{this.setScene(e.target.value)});let t=document.getElementById(`preview-toggle-drafts`);t&&t.addEventListener(`change`,e=>{this.previewShowDrafts=e.target.checked,this.renderHotspotsOnCurrentScene(),this.showToast(this.previewShowDrafts?`Hotspot draf disertakan dalam pratinjau.`:`Hanya hotspot published yang ditampilkan.`)}),document.getElementById(`tool-undo`)?.addEventListener(`click`,()=>this.undo()),document.getElementById(`tool-redo`)?.addEventListener(`click`,()=>this.redo()),document.getElementById(`tool-duplicate`)?.addEventListener(`click`,()=>{this.selectedHotspotId?this.duplicateHotspot(this.selectedHotspotId):s.warning(`Peringatan`,`Pilih salah satu hotspot terlebih dahulu untuk digandakan.`)}),document.getElementById(`tool-copy`)?.addEventListener(`click`,()=>{this.selectedHotspotId?this.copyHotspotToClipboard(this.selectedHotspotId):s.warning(`Peringatan`,`Pilih salah satu hotspot terlebih dahulu untuk disalin.`)}),document.getElementById(`tool-paste`)?.addEventListener(`click`,()=>{this.pasteHotspotFromClipboard()}),document.getElementById(`tool-delete`)?.addEventListener(`click`,()=>{this.selectedHotspotId?this.deleteHotspot(this.selectedHotspotId):s.warning(`Peringatan`,`Pilih hotspot yang ingin dihapus.`)}),document.getElementById(`btn-editor-save-draft`)?.addEventListener(`click`,()=>{this.saveToServer(!1)}),document.getElementById(`btn-editor-publish`)?.addEventListener(`click`,()=>{confirm(`Publikasikan seluruh perubahan hotspot agar dapat langsung dilihat oleh pengunjung?`)&&this.saveToServer(!0)});let n=document.getElementById(`editor-scene-select`);n&&n.addEventListener(`change`,e=>{this.setScene(e.target.value)})}bindFormEvents(){document.getElementById(`btn-editor-revert`)?.addEventListener(`click`,async()=>{if(confirm(`Batalkan seluruh perubahan yang belum disimpan dan muat ulang dari server?`)){let e=await H.getHotspots(),t=this.getHotspots();t.length=0,e.forEach(e=>t.push(e)),this.hasUnsavedChanges=!1,this.renderHotspotsOnCurrentScene(),this.renderHotspotsList(),this.notifyHotspotsChanged(),this.showToast(`Data dikembalikan ke versi server.`)}})}bindSearchFilterEvents(){let e=document.getElementById(`editor-search-input`),t=document.getElementById(`editor-filter-scene`),n=document.getElementById(`editor-filter-type`),r=document.getElementById(`editor-filter-status`);e?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim(),this.renderHotspotsList()}),t?.addEventListener(`change`,e=>{this.filterScene=e.target.value,this.renderHotspotsList()}),n?.addEventListener(`change`,e=>{this.filterType=e.target.value,this.renderHotspotsList()}),r?.addEventListener(`change`,e=>{this.filterStatus=e.target.value,this.renderHotspotsList()})}notifyHotspotsChanged(){this.onHotspotsChanged&&this.onHotspotsChanged(this.getHotspots())}showToast(e){typeof e==`string`?e.includes(`berhasil`)||e.includes(`diterapkan`)?s.success(`✓ Berhasil`,e):e.includes(`Gagal`)||e.includes(`gagal`)?s.error(`✕ Gagal`,e):s.info(`Informasi Hotspot`,e):s.show(e)}};function Cc(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function wc(e){if(!e)return``;if(!/<[a-z][\s\S]*>/i.test(e))return String(e).trim();let t=String(e);return t=t.replace(/<br\s*\/?>/gi,`
`),t=t.replace(/<\/p>/gi,`

`),t=t.replace(/<p[^>]*>/gi,``),t=t.replace(/<[^>]+>/g,``),t=t.replace(/&amp;/g,`&`).replace(/&lt;/g,`<`).replace(/&gt;/g,`>`).replace(/&quot;/g,`"`).replace(/&#039;/g,`'`),t.trim()}function Tc(e){if(!e||!e.trim())return`<span style="color: var(--clr-text-dim); font-style: italic;">(Belum ada deskripsi informasi)</span>`;let t=Cc(e);return t=t.replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/gi,`<b>$1</b>`).replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/gi,`<strong>$1</strong>`).replace(/&lt;i&gt;(.*?)&lt;\/i&gt;/gi,`<i>$1</i>`).replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/gi,`<em>$1</em>`).replace(/&lt;br\s*\/?&gt;/gi,`<br>`).replace(/\n/g,`<br>`),t}function Ec({scenes:e,getHotspots:t,onRestoreComplete:n}){let r=document.getElementById(`admin-backup-content`);if(!r)return;let i=new Set(e.map(e=>e.id));r.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">💾</span>
          <span>Cadangan &amp; Pemulihan Basis Data</span>
        </h2>
        <p class="zones-hero-desc">
          Ekspor cadangan konfigurasi hotspot dan metadata Marzipano dalam format JSON serta pemulihan aman dengan perlindungan penimpaan data.
        </p>
      </div>
    </div>

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
  `,r.querySelector(`#btn-export-json`)?.addEventListener(`click`,async()=>{try{let e=await H.exportBackup(),t=JSON.stringify(e,null,2),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`),a=`marzipano_hotspots_backup_${new Date().toISOString().slice(0,10)}.json`;i.href=r,i.download=a,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r),s.saved(`Data cadangan berhasil diekspor.`)}catch(e){s.error(`✕ Gagal mengekspor data cadangan`,e.message)}});let a=r.querySelector(`#backup-file-input`),o=r.querySelector(`#btn-browse-file`),c=r.querySelector(`#backup-dropzone`),l=r.querySelector(`#import-validation-box`),u=r.querySelector(`#import-validation-summary`),d=r.querySelector(`#btn-confirm-import`),f=r.querySelector(`#btn-cancel-import`),p=null;o?.addEventListener(`click`,()=>a?.click()),c?.addEventListener(`dragover`,e=>{e.preventDefault(),c.classList.add(`drag-over`)}),c?.addEventListener(`dragleave`,()=>{c.classList.remove(`drag-over`)}),c?.addEventListener(`drop`,e=>{e.preventDefault(),c.classList.remove(`drag-over`),e.dataTransfer.files.length>0&&m(e.dataTransfer.files[0])}),a?.addEventListener(`change`,e=>{e.target.files.length>0&&m(e.target.files[0])});function m(e){if(!e.name.endsWith(`.json`)){s.error(`✕ Format berkas tidak valid`,`Hanya berkas berformat .json yang dapat dipulihkan.`);return}let t=new FileReader;t.onload=e=>{try{h(JSON.parse(e.target.result))}catch(e){s.error(`✕ Format JSON tidak valid`,e.message)}},t.readAsText(e)}function h(e){let n=[];if(Array.isArray(e.hotspots))n=e.hotspots;else if(e.data&&Array.isArray(e.data.hotspots))n=e.data.hotspots;else{s.error(`✕ Struktur berkas tidak valid`,`Tidak ditemukan array hotspots pada berkas JSON.`);return}let r=0,a=new Set,o=0,c=t(),d=new Set(c.map(e=>e.id)),f=0;n.forEach(e=>{i.has(e.sceneId)?r++:a.add(e.sceneId),e.type===`link`&&!i.has(e.target)&&o++,d.has(e.id)&&f++}),p=e,u.innerHTML=`
      <ul class="val-list">
        <li><strong>Total Hotspot Ditemukan:</strong> ${n.length} titik</li>
        <li><strong>Hotspot dengan Scene Cocok:</strong> ${r} titik</li>
        ${a.size>0?`<li class="val-warn">⚠️ <strong>Scene Tidak Dikenal:</strong> ${Array.from(a).join(`, `)}</li>`:`<li class="val-ok">✓ Semua ID scene asal terdaftar pada sistem.</li>`}
        ${o>0?`<li class="val-warn">⚠️ <strong>Target Navigasi Tidak Dikenal:</strong> ${o} titik</li>`:`<li class="val-ok">✓ Semua tujuan navigasi valid.</li>`}
        <li><strong>ID yang Tumpang Tindih (Akan diperbarui):</strong> ${f} titik</li>
      </ul>
      <p style="font-size: 13px; color: var(--clr-text-muted); margin-top: 8px;">
        Menerapkan cadangan ini akan memperbarui dataset hotspot di server. Lanjutkan?
      </p>
    `,l.classList.remove(`hidden`)}d?.addEventListener(`click`,async()=>{if(p)try{d.disabled=!0,d.textContent=`Memulihkan...`;let e=await H.importBackup(p);s.imported(e?.message||`Pemulihan cadangan berhasil diterapkan!`),l.classList.add(`hidden`),p=null,n&&n()}catch(e){s.error(`✕ Gagal memulihkan cadangan`,e.message)}finally{d.disabled=!1,d.textContent=`Terapkan Pemulihan`}}),f?.addEventListener(`click`,()=>{l.classList.add(`hidden`),p=null,a&&(a.value=``)})}var Dc=`vtour_display_settings`,Oc={defaultScene:`0-1-pano_20261004_100402_6`,autorotate:!1,autorotateSpeed:1,hotspotAnimation:`pulse`,showTooltipsByDefault:!0,themeAccent:`#2ecc71`};function kc(){try{let e=localStorage.getItem(Dc);return e?{...Oc,...JSON.parse(e)}:{...Oc}}catch{return{...Oc}}}function Ac(e){localStorage.setItem(Dc,JSON.stringify(e))}async function jc({scenes:e=[],onSettingsUpdated:t}={}){let n=document.getElementById(`admin-settings-content`);if(!n)return;let r=kc(),i={};if(_c())try{i=(await H.getSettings()).flat||{}}catch(e){console.warn(`Gagal memuat settings dari server:`,e)}let a=e.map(e=>`<option value="${e.id}" ${e.id===r.defaultScene?`selected`:``}>${e.name} (${e.id})</option>`).join(``);n.innerHTML=`
    <div class="settings-container" style="width: 100%; display: flex; flex-direction: column; gap: 24px;">
      <div class="zones-hero-card">
        <div style="flex: 1; min-width: 280px;">
          <h2 class="zones-hero-title">
            <span class="zones-hero-icon">⚙️</span>
            <span>Pengaturan Sistem &amp; Identitas Organisasi</span>
          </h2>
          <p class="zones-hero-desc">
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
                <img id="logo-preview-img" src="${Mc(i.app_logo)}" alt="Logo Aplikasi" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;" />
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
            <input type="text" id="set-org-name" class="form-input" required value="${Mc(i.org_name||`IKHW Aceh (Inisiatif Konservasi & Hutan Wakaf)`)}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 14px;">
            <div class="form-group">
              <label for="set-org-email" style="color: #fff; font-size: 13px;">Email Kontak Resmi:</label>
              <input type="email" id="set-org-email" class="form-input" value="${Mc(i.org_contact_email||`info@ikhw.org`)}" />
            </div>
            <div class="form-group">
              <label for="set-app-title" style="color: #fff; font-size: 13px;">Judul Sistem / Header:</label>
              <input type="text" id="set-app-title" class="form-input" value="${Mc(i.app_title||`Eco Land — Kawasan Penanaman Pohon & Virtual Tour 360°`)}" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label for="set-org-address" style="color: #fff; font-size: 13px;">Alamat Kantor Organisasi:</label>
            <textarea id="set-org-address" class="form-input" rows="2">${Mc(i.org_address||`Banda Aceh, Provinsi Aceh, Indonesia`)}</textarea>
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
            <textarea id="set-program-description" class="form-input" rows="5" required style="line-height: 1.6; resize: vertical;" placeholder="Tulis deskripsi program dan kawasan restorasi...">${Mc(i.program_description||`Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.`)}</textarea>
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
  `;let o=n.querySelector(`#input-app-logo`),c=n.querySelector(`#btn-select-logo`),l=n.querySelector(`#btn-upload-logo`),u=n.querySelector(`#btn-remove-logo`),d=n.querySelector(`#logo-upload-form`),f=n.querySelector(`#logo-preview-box`),p=n.querySelector(`#selected-logo-name`);c?.addEventListener(`click`,()=>{o?.click()}),o?.addEventListener(`change`,()=>{let e=o.files?.[0];if(!e)return;if(e.size>2097152){s.error(`Ukuran File Terlalu Besar`,`Ukuran logo maksimal 2 MB.`),o.value=``,l&&(l.disabled=!0);return}p&&(p.textContent=`Berkas dipilih: ${e.name} (${(e.size/1024).toFixed(1)} KB)`),l&&(l.disabled=!1);let t=new FileReader;t.onload=e=>{f&&(f.innerHTML=`<img src="${e.target.result}" alt="Pratinjau Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;" />`)},t.readAsDataURL(e)}),d?.addEventListener(`submit`,async e=>{e.preventDefault();let t=o.files?.[0];if(!t){s.error(`Pilih Berkas`,`Silakan pilih berkas logo terlebih dahulu.`);return}let n=new FormData;n.append(`logo`,t),l&&(l.disabled=!0,l.textContent=`Mengunggah...`);try{let e=await H.uploadLogo(n);i.app_logo=e.logo_url,s.saved(e.message||`Logo aplikasi berhasil diunggah.`),u&&(u.style.display=`flex`),p&&(p.textContent=`Logo aktif terpasang: `+e.logo_url.split(`/`).pop()),o.value=``,Nc(e.logo_url)}catch(e){s.error(`✕ Gagal Mengunggah Logo`,e.message)}finally{l&&(l.disabled=!0,l.textContent=`⬆️ Unggah Logo`)}}),u?.addEventListener(`click`,async()=>{if(confirm(`Kembalikan logo aplikasi ke ikon default bawaan?`)){u.disabled=!0,u.textContent=`Mereset...`;try{let e=await H.removeLogo();i.app_logo=``,s.updated(e.message||`Logo aplikasi telah dikembalikan ke default.`),u.style.display=`none`,p&&(p.textContent=`Menggunakan logo bawaan vektor SVG`),f&&(f.innerHTML=`
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #fff;">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        `),o.value=``,Nc(``)}catch(e){s.error(`✕ Gagal Mereset Logo`,e.message)}finally{u.disabled=!1,u.textContent=`🗑️ Reset ke Default`}}});let m=n.querySelector(`#org-settings-form`);m?.addEventListener(`submit`,async e=>{e.preventDefault();let t={org_name:n.querySelector(`#set-org-name`).value.trim(),org_contact_email:n.querySelector(`#set-org-email`).value.trim(),app_title:n.querySelector(`#set-app-title`).value.trim(),org_address:n.querySelector(`#set-org-address`).value.trim()},r=m.querySelector(`button[type="submit"]`);r&&(r.disabled=!0,r.textContent=`Menyimpan...`);try{let e=await H.saveSettings(t);s.saved(e?.message||`Identitas organisasi berhasil disimpan ke database.`)}catch(e){s.error(`✕ Gagal menyimpan identitas`,e.message)}finally{r&&(r.disabled=!1,r.textContent=`💾 Simpan Identitas Organisasi`)}});let h=n.querySelector(`#program-desc-form`),g=n.querySelector(`#btn-cancel-program-desc`),_=n.querySelector(`#set-program-description`),v=i.program_description||`Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.`;g?.addEventListener(`click`,()=>{_&&(_.value=v,s.info(`Perubahan deskripsi dibatalkan.`))}),h?.addEventListener(`submit`,async e=>{e.preventDefault();let t=_?.value?.trim();if(!t){s.error(`Validasi Gagal`,`Deskripsi program/kawasan tidak boleh kosong.`);return}let n=h.querySelector(`button[type="submit"]`);n&&(n.disabled=!0,n.textContent=`Menyimpan...`);try{let e=await H.saveSettings({program_description:t});i.program_description=t,s.saved(e?.message||`Deskripsi program dan kawasan berhasil disimpan.`);let n=document.getElementById(`hero-desc`);n&&(n.textContent=t);let r=document.getElementById(`info-general-desc`);r&&(r.textContent=t)}catch(e){s.error(`✕ Gagal menyimpan deskripsi`,e.message)}finally{n&&(n.disabled=!1,n.textContent=`💾 Simpan Perubahan`)}});let y=n.querySelector(`#display-settings-form`),b=n.querySelector(`#btn-reset-settings`);y?.addEventListener(`submit`,e=>{e.preventDefault();let i={...r,defaultScene:n.querySelector(`#set-default-scene`).value,hotspotAnimation:n.querySelector(`#set-animation`).value,showTooltipsByDefault:n.querySelector(`#set-tooltips`).checked};Ac(i),s.saved(`Pengaturan tampilan berhasil disimpan.`),t&&t(i)}),b?.addEventListener(`click`,()=>{confirm(`Kembalikan seluruh pengaturan tampilan ke pengaturan default?`)&&(Ac(Oc),s.updated(`Pengaturan tampilan berhasil dikembalikan ke default.`),jc({scenes:e,onSettingsUpdated:t}),t&&t(Oc))})}function Mc(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}function Nc(e){document.querySelectorAll(`.brand-logo-icon`).forEach(t=>{t.id!==`logo-preview-box`&&(t.innerHTML=e?`<img src="${Mc(e)}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`:`
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      `)})}function Pc(e){if(!e)return``;if(e instanceof Date)return isNaN(e.getTime())?``:`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`;let t=String(e).trim();if(!t||t===`dd/mm/yyyy`||t===`-`)return``;let n=t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);if(n)return`${n[1]}-${n[2].padStart(2,`0`)}-${n[3].padStart(2,`0`)}`;let r=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(r){let e=r[1].padStart(2,`0`),t=r[2].padStart(2,`0`);return`${r[3]}-${t}-${e}`}return``}function U(e,t=`-`){if(!e)return t;let n=Pc(e);if(!n)return t;let[r,i,a]=n.split(`-`);return`${a}/${i}/${r}`}function Fc(e){return e&&Pc(e)||null}var Ic=[],Lc=[],Rc=[],W=[];async function G(e,t=[],n=null,r=null,i=!0){if(t&&t.length>0&&(W=t),i){let t=e===`dashboard`?`#admin/trees/dashboard`:`#admin/trees/${e}`;if(r===`create`||n===`create`?t=`#admin/trees/${e}/create`:r===`edit`&&n&&(t=`#admin/trees/${e}/${n}/edit`),window.location.hash!==t){window.location.hash=t;return}}let a=document.getElementById(`admin-trees-content`);a&&(document.getElementById(`tree-subpane-content`)||zc(a,t),await Bc(e,t,n,r))}function zc(e,t){e.innerHTML=`
    <!-- Tree Subpane Content Area -->
    <div id="tree-subpane-content" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px;">
        <span class="loading-spinner"></span> Memuat data penanaman...
      </div>
    </div>
  `}async function Bc(e,t,n=null,r=null){let i=document.getElementById(`tree-subpane-content`);if(i)try{if(r===`create`||n===`create`){if(e===`species`){Xc(null,i);return}if(e===`activities`){await el(null,i,t);return}if(e===`surveys`){await nl(null,i);return}if(e===`maintenance`){await il(null,i);return}}else if(r===`edit`&&n){if(e===`species`){await Vc(n,i);return}if(e===`activities`){await Hc(n,i,t);return}if(e===`surveys`){await Uc(n,i);return}if(e===`maintenance`){await Wc(n,i);return}}e===`dashboard`?await Kc(i):e===`species`?await qc(i):e===`activities`?await Zc(i,t):e===`surveys`?await tl(i):e===`maintenance`?await rl(i):e===`reports`?al(i):e===`import-export`&&ol(i)}catch(e){i.innerHTML=`
      <div class="alert-banner alert-danger" style="margin: 20px 0;">
        ⚠️ Terjadi kesalahan saat memuat modul: ${K(e.message)}
      </div>
    `}}async function Vc(e,t){t.innerHTML=`<div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;"><span class="loading-spinner"></span> Memuat data jenis pohon untuk disunting...</div>`;try{let n=await H.getTreeSpeciesDetail(e),r=n.species||n;if(!r||!r.id)throw Error(`Data jenis pohon tidak ditemukan di server.`);Xc(r,t)}catch(e){Gc(t,`Jenis Pohon Tidak Ditemukan`,e.message||`Spesies dengan ID tersebut tidak ditemukan atau telah dihapus.`,()=>G(`species`,W))}}async function Hc(e,t,n){t.innerHTML=`<div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;"><span class="loading-spinner"></span> Memuat kegiatan penanaman untuk disunting...</div>`;try{let r=await H.getPlantingActivity(e),i=r.activity||r;if(!i||!i.id)throw Error(`Data kegiatan penanaman tidak ditemukan di server.`);await el(i,t,n||W,Rc)}catch(e){Gc(t,`Kegiatan Penanaman Tidak Ditemukan`,e.message||`Kegiatan penanaman dengan ID tersebut tidak ditemukan atau telah dihapus.`,()=>G(`activities`,W))}}async function Uc(e,t){t.innerHTML=`<div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;"><span class="loading-spinner"></span> Memuat data pemantauan untuk disunting...</div>`;try{let n=await H.getTreeSurveyDetail(e);if(n&&n.survey)await nl(n.survey,t);else throw Error(`Data survei pemantauan tidak ditemukan di server.`)}catch(e){Gc(t,`Survei Pemantauan Tidak Ditemukan`,e.message||`Catatan survei dengan ID tersebut tidak ditemukan atau telah dihapus.`,()=>G(`surveys`,W))}}async function Wc(e,t){t.innerHTML=`<div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;"><span class="loading-spinner"></span> Memuat data perawatan untuk disunting...</div>`;try{let n=await H.getTreeMaintenanceDetail(e),r=n.maintenance||n.log;if(r)await il(r,t);else throw Error(`Data perawatan tidak ditemukan di server.`)}catch(e){Gc(t,`Catatan Perawatan Tidak Ditemukan`,e.message||`Catatan perawatan dengan ID tersebut tidak ditemukan atau telah dihapus.`,()=>G(`maintenance`,W))}}function Gc(e,t,n,r){e.innerHTML=`
    <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 48px 24px; text-align: center; margin: 20px 0;">
      <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
      <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 8px;">${K(t)}</h3>
      <p style="color: var(--clr-text-muted); font-size: 13px; max-width: 480px; margin: 0 auto 20px; line-height: 1.5;">
        ${K(n)}
      </p>
      <button id="btn-err-back-to-tree-list" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
        <span>←</span> Kembali ke Daftar
      </button>
    </div>
  `,document.getElementById(`btn-err-back-to-tree-list`)?.addEventListener(`click`,r)}async function Kc(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat indikator penanaman...</div>`;let[t,n]=await Promise.all([H.getTreeDashboard(),H.getZones({sort_by:`created_at`,sort_dir:`asc`}).catch(()=>({zones:[]}))]),r=t.indicators||{},i=t.needs_inspection||[],a=t.charts?.species_distribution||[],o=n.zones||[],s=o.length||r.total_zones||0,c=o.filter(e=>!e.is_archived&&e.status===`active`).length||r.total_zones||0,l=o.reduce((e,t)=>e+(parseFloat(t.area_in_ha)||0),0),u=r.total_initial_seedlings||o.reduce((e,t)=>e+(parseInt(t.total_initial_seedlings)||0),0),d=r.survival_rate!==null&&r.survival_rate!==void 0?r.survival_rate:null,f=r.survival_rate===null?`Data Belum Lengkap`:`${r.survival_rate}%`,p=r.survival_rate===null?`pill-neutral`:r.survival_rate>=80?`pill-success`:r.survival_rate>=60?`pill-warning`:`pill-danger`;e.innerHTML=`
    <!-- Top KPI Metrics Grid (Kawasan & Penanaman) -->
    <div class="zones-metrics-grid" style="margin-bottom: 24px;">
      <!-- Metric 1: Total Kawasan -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap emerald">
          <span>🏞️</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Total Kawasan</div>
          <div class="zone-metric-value">${s} <span style="font-size: 13px; font-weight: 500; color: var(--clr-text-muted);">Lahan</span></div>
          <div class="zone-metric-sub">✅ ${c} Kawasan Aktif Restorasi</div>
        </div>
      </div>

      <!-- Metric 2: Total Luas Lahan -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap sky">
          <span>📐</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Total Luas Lahan</div>
          <div class="zone-metric-value" style="color: #38bdf8;">${l.toFixed(2)} <span style="font-size: 13px; font-weight: 500;">Ha</span></div>
          <div class="zone-metric-sub">± ${(l*1e4).toLocaleString(`id-ID`)} m² Luas Kumulatif</div>
        </div>
      </div>

      <!-- Metric 3: Total Bibit Tertanam -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap amber">
          <span>🌱</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Total Bibit Awal</div>
          <div class="zone-metric-value" style="color: #fbbf24;">${Number(u).toLocaleString(`id-ID`)} <span style="font-size: 13px; font-weight: 500;">Btg</span></div>
          <div class="zone-metric-sub">Dari seluruh batch penanaman</div>
        </div>
      </div>

      <!-- Metric 4: Kelulusan Hidup / Survival -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap purple">
          <span>📊</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Rerata Survival</div>
          <div class="zone-metric-value" style="color: ${d!==null&&d>=75?`#34d399`:`#c084fc`};">
            ${d===null?`<span style="font-size: 14px; font-weight: 600; color: var(--clr-text-dim);">Belum Cukup</span>`:`${d}%`}
          </div>
          <div class="zone-metric-sub">${d===null?`Menunggu hasil sensus survei`:`Kondisi Tegakan Sangat Baik`}</div>
        </div>
      </div>
    </div>

    <!-- Top KPI Grid: 7 Indikator Utama + Kelangsungan Hidup -->
    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
      <div class="stat-card">
        <span class="stat-label">Total Kawasan Aktif</span>
        <span class="stat-value" style="color: #38bdf8;">${r.total_zones||0}</span>
        <span class="stat-desc">Kawasan penanaman terdaftar</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Jenis Pohon</span>
        <span class="stat-value">${r.total_species||0}</span>
        <span class="stat-desc">Spesies kayu & buah hutan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kegiatan Penanaman</span>
        <span class="stat-value" style="color: #60a5fa;">${r.total_activities||0}</span>
        <span class="stat-desc">Batch penanaman lapangan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Bibit Awal</span>
        <span class="stat-value" style="color: var(--clr-primary, #10b981);">${r.total_initial_seedlings?.toLocaleString()||0}</span>
        <span class="stat-desc">Bibit kelompok awal historis</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kelompok Dipantau</span>
        <span class="stat-value" style="color: #a78bfa;">${r.monitored_batches_count||0}</span>
        <span class="stat-desc">Sudah memiliki data survei</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Scene Panorama</span>
        <span class="stat-value">${r.total_scenes||0}</span>
        <span class="stat-desc">Titik foto 360° Marzipano</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Hotspot Terdaftar</span>
        <span class="stat-value">${r.total_hotspots||0}</span>
        <span class="stat-desc">Navigasi & info lapangan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kelangsungan Hidup</span>
        <span class="stat-value"><span class="admin-header-pill ${p}" style="font-size: 16px; padding: 3px 8px;">${f}</span></span>
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
          ${a.length>0?a.map(e=>`
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
                  <span style="font-weight: 500;">${K(e.common_name)} <i>(${K(e.scientific_name)})</i></span>
                  <span style="font-weight: 600;">${e.total_planted} bibit</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                  <div style="background: var(--clr-primary, #10b981); height: 100%; width: ${Math.min(100,e.total_planted/Math.max(1,r.total_initial_seedlings)*100)}%;"></div>
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
                    <span style="font-weight: 500;">${K(e.name)} <code style="font-size:11px;color:#38bdf8;">(${K(e.zone_code)})</code></span>
                    <span style="font-weight: 600;">${Number(e.total_planted).toLocaleString(`id-ID`)} bibit</span>
                  </div>
                  <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: #38bdf8; height: 100%; width: ${Math.min(100,e.total_planted/Math.max(1,r.total_initial_seedlings)*100)}%;"></div>
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
          ⚠️ Kelompok Perlu Survei Ulang (${i.length})
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto;">
          ${i.length>0?i.map(e=>`
              <div style="padding: 10px 12px; background: rgba(255,255,255,0.03); border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; font-weight: 500;">
                  <span>${K(e.batch_code)} — ${K(e.name)}</span>
                  <span style="color: #f59e0b;">${e.survival_rate===null?`Belum Survei`:e.survival_rate+`%`}</span>
                </div>
                <div style="font-size: 12px; color: var(--clr-text-muted); margin-top: 3px;">
                  📍 ${K(e.location_zone)} • ${K(e.reason)}
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
                    <strong>${K(e.batch_code||`-`)}</strong>
                    <span style="color: #94a3b8;">📅 ${U(e.survey_date)}</span>
                  </div>
                  <div style="color: #cbd5e1; margin-top: 2px;">
                    Hidup: <strong style="color: #34d399;">${e.alive_count} btg</strong> • Kondisi: ${K(e.health_condition||`-`)} • Petugas: ${K(e.inspector_name||`-`)}
                  </div>
                </div>
              `).join(``):`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada catatan survei pemantauan terbaru.</p>`}
        </div>
      </div>
    </div>
  `}async function qc(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat master jenis pohon...</div>`,Ic=(await H.getTreeSpecies()).species||[],e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">🌳</span>
          <span>Master Data Jenis Pohon</span>
        </h2>
        <p class="zones-hero-desc">
          Koleksi taksonomi jenis pohon silvikultur, status asal, atribut morfologi, dan data ekologis kawasan restorasi.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-add-species" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>➕</span> Tambah Jenis Pohon Baru
        </button>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; gap: 8px; flex: 1; min-width: 260px;">
        <input type="text" id="filter-species-search" class="form-input" placeholder="Cari nama umum, ilmiah, nama lokal..." style="max-width: 300px;" />
        <select id="filter-species-origin" class="form-select" style="max-width: 180px;">
          <option value="all">Semua Status Asal</option>
          <option value="lokal_asli">Jenis Lokal / Asli</option>
          <option value="introduksi">Jenis Introduksi</option>
          <option value="belum_diverifikasi">Belum Diverifikasi</option>
        </select>
      </div>
      <div style="font-size: 12px; color: var(--clr-text-muted);">
        Total: <strong style="color: #fff;" id="species-count-badge">${Ic.length}</strong> jenis
      </div>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Nama Umum</th>
            <th style="padding: 10px 14px;">Nama Ilmiah</th>
            <th style="padding: 10px 14px;">Nama Lokal</th>
            <th style="padding: 10px 14px;">Status Asal</th>
            <th style="padding: 10px 14px; text-align: right;">Total Ditanam</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="species-table-body">
          ${Jc(Ic)}
        </tbody>
      </table>
    </div>
  `;let t=document.getElementById(`filter-species-search`),n=document.getElementById(`filter-species-origin`),r=()=>{let r=t.value.toLowerCase(),i=n.value,a=Ic.filter(e=>{let t=e.common_name.toLowerCase().includes(r)||e.scientific_name.toLowerCase().includes(r)||(e.local_name||``).toLowerCase().includes(r),n=i===`all`||e.origin_status===i;return t&&n});document.getElementById(`species-table-body`).innerHTML=Jc(a);let o=document.getElementById(`species-count-badge`);o&&(o.textContent=a.length),Yc(e)};t?.addEventListener(`input`,r),n?.addEventListener(`change`,r),document.getElementById(`btn-add-species`)?.addEventListener(`click`,()=>{G(`species`,W,null,`create`)}),Yc(e)}function Jc(e){return e.length===0?`<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Tidak ada data jenis pohon ditemukan.</td></tr>`:e.map(e=>`
    <tr style="border-bottom: 1px solid var(--clr-border);">
      <td style="padding: 10px 14px;">
        <span style="font-weight: 600; color: var(--clr-text);">${K(e.common_name)}</span>
      </td>
      <td style="padding: 10px 14px;">
        <span style="font-style: italic; color: var(--clr-primary, #10b981);">${K(e.scientific_name)}</span>
      </td>
      <td style="padding: 10px 14px;">
        <span style="color: var(--clr-text);">${K(e.local_name||`-`)}</span>
      </td>
      <td style="padding: 10px 14px;">
        <span class="admin-header-pill ${e.origin_status===`lokal_asli`?`pill-success`:e.origin_status===`introduksi`?`pill-warning`:`pill-neutral`}" style="font-size: 11px;">
          ${e.origin_status===`lokal_asli`?`Lokal / Asli`:e.origin_status===`introduksi`?`Introduksi`:`Belum Diverifikasi`}
        </span>
      </td>
      <td style="padding: 10px 14px; text-align: right; font-weight: 600;">
        ${e.total_planted?.toLocaleString()||0} bibit
      </td>
      <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
        <a href="#katalog?species=${encodeURIComponent(e.id)}" target="_blank" rel="noopener noreferrer" class="icon-btn-sm" title="Lihat Profil Jenis Pohon di Katalog" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none; font-size: 13px; margin-right: 4px;">👁️</a>
        <button class="btn-edit-species icon-btn-sm" data-id="${e.id}" title="Edit Data">✏️</button>
        <button class="btn-del-species icon-btn-sm" data-id="${e.id}" title="Hapus Spesies" style="color: #ef4444;">🗑️</button>
      </td>
    </tr>
  `).join(``)}function Yc(e){document.querySelectorAll(`.btn-edit-species`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);G(`species`,W,t,`edit`)})}),document.querySelectorAll(`.btn-del-species`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`),r=Ic.find(e=>e.id===n),i=r?r.common_name:`spesies ini`;if(await V.confirm({title:`Hapus Jenis Pohon?`,subtitle:i,message:`Apakah Anda yakin ingin menghapus jenis pohon <strong>"${K(i)}"</strong>?<br><br>Data yang sudah terhubung dengan kegiatan penanaman atau katalog pohon tidak dapat dihapus.`,type:`danger`,confirmText:`Ya, Hapus`,cancelText:`Batal`,icon:`🌳`}))try{await H.deleteTreeSpecies(n),s.deleted(`Jenis pohon "${i}" berhasil dihapus.`),await qc(e)}catch(e){s.error(`✕ Gagal menghapus jenis pohon`,e.message)}})})}function Xc(e=null,t){let n=!!e,r=n?`Edit Jenis Pohon: ${K(e.common_name)}`:`Tambah Jenis Pohon Baru`;t.innerHTML=`
    <!-- Hero Banner Card & Navigasi -->
    <div class="zones-hero-card" style="margin-bottom: 20px;">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">${n?`✏️`:`🌱`}</span>
          <span>${r}</span>
        </h2>
        <p class="zones-hero-desc">
          Lengkapi atribut taksonomi, informasi morfologi, parameter silvikultur, dan dokumentasi visual jenis pohon untuk katalog restorasi.
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 10px; z-index: 2; flex-wrap: wrap;">
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
              <input type="text" id="page-sp-common" class="form-input" required placeholder="Contoh: Merbau Aceh / Bungur" value="${K(e?.common_name||``)}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama populer yang ditampilkan utama pada katalog publik.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-scientific" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Ilmiah (Spesies / Takson): <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="page-sp-scientific" class="form-input" required placeholder="Contoh: Intsia bijuga / Lagerstroemia speciosa" value="${K(e?.scientific_name||``)}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama ilmiah unik internasional (binomial nomenclature).</small>
            </div>

            <div class="form-group">
              <label for="page-sp-local" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Lokal / Daerah:
              </label>
              <input type="text" id="page-sp-local" class="form-input" placeholder="Contoh: Kayu Ipil, Bungur Hutan" value="${K(e?.local_name||``)}" />
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
              <input type="text" id="page-sp-family" class="form-input" placeholder="Contoh: Fabaceae / Lythraceae / Moraceae" value="${K(e?.family||``)}" />
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
              <textarea id="page-sp-ecological" class="form-textarea" rows="3" placeholder="Penyedia habitat burung, naungan kanopi rapat, penahan erosi lereng terjal, pengikat nitrogen tanah...">${K(e?.ecological_function||``)}</textarea>
              <small style="color: var(--clr-text-muted); font-size: 11px;">Peran spesies dalam keseimbangan ekosistem bentang alam.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-benefits" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Manfaat &amp; Kegunaan Ekonomi / Tradisional:
              </label>
              <textarea id="page-sp-benefits" class="form-textarea" rows="2" placeholder="Kayu pertukangan bernilai tinggi, pakan satwa lebah madu, buah hutan konsumsi...">${K(e?.benefits||``)}</textarea>
            </div>

            <div class="form-group">
              <label for="page-sp-desc" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Deskripsi Tambahan &amp; Morfologi:
              </label>
              <textarea id="page-sp-desc" class="form-textarea" rows="3" placeholder="Tinggi pohon dewasa dapat mencapai 25 meter, diameter batang 60 cm, daun majemuk berpasangan...">${K(e?.description||``)}</textarea>
            </div>
          </div>
        </div>

        <!-- CARD 4: FOTO DAN REFERENSI -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>📸</span> Card 4 — Foto dan Referensi
            </h3>
            <span id="sp-photos-count-badge" style="font-size: 11px; background: rgba(16, 185, 129, 0.15); color: #6ee7b7; padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600;">
              0 Foto Terpilih
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 20px;">
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div class="form-group">
                <label for="page-sp-photo-file" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Upload Berkas Foto Pohon (Bisa Lebih Dari 1 Foto):
                </label>
                <div id="sp-dropzone" style="border: 2px dashed rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.04); border-radius: 10px; padding: 18px 14px; text-align: center; cursor: pointer; transition: all 0.2s;">
                  <span style="font-size: 28px; display: block; margin-bottom: 4px;">📁</span>
                  <span style="color: #6ee7b7; font-weight: 600; font-size: 13px;">Klik atau Tarik Berkas Foto ke Sini</span>
                  <p style="color: var(--clr-text-muted); font-size: 11.5px; margin: 4px 0 10px;">
                    Mendukung unggah lebih dari satu foto sekaligus (JPEG/PNG/WebP, maks 5MB per file)
                  </p>
                  <label for="page-sp-photo-file" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer; margin: 0 auto;">
                    <span>📂</span> Pilih Berkas Foto...
                  </label>
                  <input type="file" id="page-sp-photo-file" accept="image/*" multiple style="display: none;" />
                </div>
              </div>

              <div class="form-group">
                <label for="page-sp-photo-path" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Atau Tambahkan URL / Path Foto:
                </label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="page-sp-photo-path" class="form-input" placeholder="/storage/tree-species/merbau.jpg atau URL eksternal" />
                  <button type="button" id="btn-add-url-photo" class="btn-secondary-action btn-sm" style="white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;">
                    <span>➕</span> Tambah
                  </button>
                </div>
                <small style="color: var(--clr-text-muted); font-size: 11px;">Ketik URL/path foto lalu klik Tambah untuk memasukkan ke galeri foto.</small>
              </div>

              <div class="form-group">
                <label for="page-sp-ref" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Sumber Referensi Identifikasi:
                </label>
                <input type="text" id="page-sp-ref" class="form-input" placeholder="Buku Flora Malesiana / Balai Litbang" value="${K(e?.reference_source||``)}" />
                <small style="color: var(--clr-text-muted); font-size: 11px;">Rujukan pustaka atau tim surveyor yang mengidentifikasi spesies.</small>
              </div>
            </div>

            <!-- Preview Card Galeri Multi-Foto -->
            <div style="display: flex; flex-direction: column; background: rgba(0,0,0,0.25); border: 1px solid var(--clr-border); border-radius: 10px; padding: 14px; min-height: 240px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 12.5px; font-weight: 600; color: #e2e8f0;">Daftar Foto Dokumentasi Pohon</span>
                <span style="font-size: 11px; color: var(--clr-text-muted);">⭐ = Foto Sampul</span>
              </div>
              <div id="sp-gallery-preview-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; max-height: 320px; overflow-y: auto; padding-right: 4px;">
                <!-- Populated by JS -->
              </div>
              <div id="sp-gallery-empty-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 160px; color: var(--clr-text-muted); font-size: 12px; text-align: center;">
                <span style="font-size: 32px; margin-bottom: 6px;">📷</span>
                Belum ada foto yang dipilih.<br><span style="font-size: 11px;">Pilih satu atau lebih file foto di sebelah kiri.</span>
              </div>
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
  `;let i=[];e&&(Array.isArray(e.gallery_photos)&&e.gallery_photos.length>0?i=[...e.gallery_photos]:e.photo_path&&(i=[e.photo_path]));let a=[],o=null,c=!1,l=()=>{c=!0};i.length>0&&(o=`existing:${e?.photo_path||i[0]}`);let u=document.getElementById(`sp-gallery-preview-grid`),d=document.getElementById(`sp-gallery-empty-state`),f=document.getElementById(`sp-photos-count-badge`),p=document.getElementById(`page-sp-photo-file`),m=document.getElementById(`sp-dropzone`),h=document.getElementById(`page-sp-photo-path`),g=document.getElementById(`btn-add-url-photo`),_=()=>{let e=i.length+a.length;if(f&&(f.textContent=`${e} Foto Terpilih`,f.style.color=e>0?`#6ee7b7`:`#94a3b8`),e===0){u&&(u.innerHTML=``),d&&(d.style.display=`flex`),o=null;return}d&&(d.style.display=`none`);let t=!1;if(o){if(o.startsWith(`existing:`)&&i.includes(o.replace(`existing:`,``)))t=!0;else if(o.startsWith(`staged:`)){let e=o.replace(`staged:`,``);a.some(t=>t.id===e)&&(t=!0)}}t||(i.length>0?o=`existing:${i[0]}`:a.length>0&&(o=`staged:${a[0].id}`));let n=``;function r(e){if(!e||typeof e!=`string`||(e=e.trim(),!e))return``;if(e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`blob:`)||e.startsWith(`data:`))return e;for(e=e.replace(/^.*?\/storage\/app\/public\//,``);e.startsWith(`/storage/storage/`);)e=e.replace(`/storage/storage/`,`/storage/`);for(;e.startsWith(`/public/storage/`);)e=e.replace(`/public/storage/`,`/storage/`);return e.startsWith(`/storage/`)?e:e.startsWith(`storage/`)?`/`+e:e.startsWith(`/`)?e.startsWith(`/demo/`)?`/storage`+e:e:`/storage/`+e}i.forEach((e,t)=>{let i=o===`existing:${e}`,a=r(e);n+=`
        <div style="position: relative; border-radius: 8px; overflow: hidden; border: 2px solid ${i?`#10b981`:`rgba(255,255,255,0.12)`}; background: #070d0a; aspect-ratio: 1/1; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
          <img src="${a}" alt="Foto ${t+1}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/favicon.svg'" />
          
          <button type="button" class="btn-toggle-cover" data-cover-key="existing:${e}" title="${i?`Foto Sampul Utama`:`Klik untuk jadikan Foto Sampul`}" style="position: absolute; top: 4px; left: 4px; background: ${i?`#10b981`:`rgba(15,23,42,0.85)`}; color: ${i?`#fff`:`#f59e0b`}; border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; padding: 2px 6px; font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 3px; z-index: 2;">
            ${i?`★ Sampul`:`☆ Sampul`}
          </button>

          <button type="button" class="btn-delete-photo" data-type="existing" data-idx="${t}" title="Hapus Foto" style="position: absolute; top: 4px; right: 4px; background: rgba(239,68,68,0.88); color: #fff; border: none; border-radius: 5px; width: 22px; height: 22px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2;">
            ✕
          </button>

          <span style="position: absolute; bottom: 3px; right: 4px; background: rgba(0,0,0,0.7); color: #cbd5e1; font-size: 9.5px; padding: 1px 5px; border-radius: 3px;">
            Tersimpan
          </span>
        </div>
      `}),a.forEach((e,t)=>{let r=o===`staged:${e.id}`;n+=`
        <div style="position: relative; border-radius: 8px; overflow: hidden; border: 2px solid ${r?`#10b981`:`rgba(16,185,129,0.35)`}; background: #070d0a; aspect-ratio: 1/1; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
          <img src="${e.previewUrl}" alt="${K(e.file.name)}" style="width: 100%; height: 100%; object-fit: cover;" />
          
          <button type="button" class="btn-toggle-cover" data-cover-key="staged:${e.id}" title="${r?`Foto Sampul Utama`:`Klik untuk jadikan Foto Sampul`}" style="position: absolute; top: 4px; left: 4px; background: ${r?`#10b981`:`rgba(15,23,42,0.85)`}; color: ${r?`#fff`:`#f59e0b`}; border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; padding: 2px 6px; font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 3px; z-index: 2;">
            ${r?`★ Sampul`:`☆ Sampul`}
          </button>

          <button type="button" class="btn-delete-photo" data-type="staged" data-idx="${t}" title="Hapus Foto" style="position: absolute; top: 4px; right: 4px; background: rgba(239,68,68,0.88); color: #fff; border: none; border-radius: 5px; width: 22px; height: 22px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2;">
            ✕
          </button>

          <span style="position: absolute; bottom: 3px; right: 4px; background: rgba(16,185,129,0.85); color: #fff; font-size: 9.5px; padding: 1px 5px; border-radius: 3px; font-weight: 600;">
            Baru
          </span>
        </div>
      `}),u&&(u.innerHTML=n,u.querySelectorAll(`.btn-toggle-cover`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),o=e.getAttribute(`data-cover-key`),l(),_()})}),u.querySelectorAll(`.btn-delete-photo`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-type`),r=parseInt(e.getAttribute(`data-idx`),10);if(n===`existing`)i.splice(r,1);else if(n===`staged`){let e=a.splice(r,1);e[0]?.previewUrl&&URL.revokeObjectURL(e[0].previewUrl)}l(),_()})}))};_();let v=e=>{if(e&&e.length!==0){for(let t=0;t<e.length;t++){let n=e[t];n.type.startsWith(`image/`)&&a.push({file:n,id:`staged_`+Math.random().toString(36).substring(2,9),previewUrl:URL.createObjectURL(n)})}l(),_()}};p?.addEventListener(`change`,e=>{v(e.target.files),p.value=``}),m&&([`dragenter`,`dragover`].forEach(e=>{m.addEventListener(e,e=>{e.preventDefault(),e.stopPropagation(),m.style.borderColor=`#10b981`,m.style.background=`rgba(16, 185, 129, 0.12)`})}),[`dragleave`,`drop`].forEach(e=>{m.addEventListener(e,e=>{e.preventDefault(),e.stopPropagation(),m.style.borderColor=`rgba(16, 185, 129, 0.35)`,m.style.background=`rgba(16, 185, 129, 0.04)`})}),m.addEventListener(`drop`,e=>{e.dataTransfer&&e.dataTransfer.files&&v(e.dataTransfer.files)})),[`page-sp-common`,`page-sp-scientific`,`page-sp-local`,`page-sp-family`,`page-sp-origin`,`page-sp-ref`,`page-sp-ecological`,`page-sp-benefits`,`page-sp-desc`].forEach(e=>{let t=document.getElementById(e);t&&(t.addEventListener(`input`,l),t.addEventListener(`change`,l))}),document.getElementById(`page-sp-active`)?.addEventListener(`change`,l),g?.addEventListener(`click`,()=>{let e=h.value.trim();e&&(i.includes(e)?s.info(`URL foto sudah ada di daftar.`):(i.push(e),h.value=``,l(),_()))});let y=async()=>{(c||a.length>0)&&!await V.confirm({title:`Batalkan Perubahan?`,subtitle:`Perubahan pada data jenis pohon belum disimpan.`,message:`Data atau berkas foto yang Anda masukkan akan dibatalkan jika kembali ke daftar sekarang. Apakah Anda yakin?`,type:`warning`,confirmText:`Ya, Tinggalkan`,cancelText:`Tetap di Sini`,icon:`🌳`})||G(`species`,W)};document.getElementById(`breadcrumb-btn-species-list`)?.addEventListener(`click`,y),document.getElementById(`btn-back-to-species`)?.addEventListener(`click`,y),document.getElementById(`btn-cancel-species-form`)?.addEventListener(`click`,y),document.getElementById(`btn-cancel-species-bottom`)?.addEventListener(`click`,y);let b=document.getElementById(`modal-species-preview`),x=document.getElementById(`modal-species-preview-body`);document.getElementById(`btn-preview-species-form`)?.addEventListener(`click`,()=>{let e=document.getElementById(`page-sp-common`).value.trim()||`(Nama belum diisi)`,t=document.getElementById(`page-sp-scientific`).value.trim()||`(Nama ilmiah belum diisi)`,n=document.getElementById(`page-sp-local`).value.trim()||`-`,r=document.getElementById(`page-sp-family`).value.trim()||`-`,s=document.getElementById(`page-sp-origin`).value,c=s===`lokal_asli`?`Lokal / Asli`:s===`introduksi`?`Introduksi`:`Belum Diverifikasi`,l=document.getElementById(`page-sp-ecological`).value.trim()||`-`,u=document.getElementById(`page-sp-benefits`).value.trim()||`-`,d=document.getElementById(`page-sp-ref`).value.trim()||`-`,f=``;if(o){if(o.startsWith(`existing:`))f=o.replace(`existing:`,``);else if(o.startsWith(`staged:`)){let e=o.replace(`staged:`,``),t=a.find(t=>t.id===e);t&&(f=t.previewUrl)}}f||(i.length>0?f=i[0]:a.length>0&&(f=a[0].previewUrl));let p=i.length+a.length;x.innerHTML=`
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--clr-border); border-radius: 8px; padding: 16px;">
        ${f?`<div style="width: 100%; height: 180px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; position: relative;">
                 <img src="${f}" alt="${K(e)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/favicon.svg'" />
                 <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: #6ee7b7; font-size: 11px; padding: 2px 8px; border-radius: 4px;">
                   📷 ${p} Foto Dokumentasi
                 </span>
               </div>`:``}
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div>
            <h3 style="color: #fff; margin: 0; font-size: 16px;">${K(e)}</h3>
            <span style="font-size: 13px; font-style: italic; color: #34d399;">${K(t)}</span>
          </div>
          <span class="admin-header-pill pill-success" style="font-size: 11px;">${c}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 12px; color: var(--clr-text-muted);">
          <div><strong>Famili:</strong> ${K(r)}</div>
          <div><strong>Nama Lokal:</strong> ${K(n)}</div>
        </div>
        <div style="font-size: 12px; color: var(--clr-text); margin-bottom: 8px;">
          <strong>Fungsi Ekologis:</strong><br />
          <p style="margin: 4px 0 0; color: var(--clr-text-muted); line-height: 1.4;">${K(l)}</p>
        </div>
        <div style="font-size: 12px; color: var(--clr-text); margin-bottom: 8px;">
          <strong>Manfaat:</strong><br />
          <p style="margin: 4px 0 0; color: var(--clr-text-muted); line-height: 1.4;">${K(u)}</p>
        </div>
        <div style="font-size: 11px; color: var(--clr-text-muted); border-top: 1px solid var(--clr-border-subtle); padding-top: 8px;">
          <strong>Referensi:</strong> ${K(d)}
        </div>
      </div>
    `,b.classList.remove(`hidden`)}),document.getElementById(`btn-close-species-preview-modal`)?.addEventListener(`click`,()=>b.classList.add(`hidden`)),document.getElementById(`btn-dismiss-species-preview`)?.addEventListener(`click`,()=>b.classList.add(`hidden`));let S=async()=>{let e=document.getElementById(`species-form-alert`),t=document.getElementById(`page-sp-common`).value.trim(),r=document.getElementById(`page-sp-scientific`).value.trim();if(!t){e.className=`alert-box error`,e.textContent=`Nama umum pohon (Indonesia) wajib diisi.`,e.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!r){e.className=`alert-box error`,e.textContent=`Nama ilmiah (spesies) wajib diisi.`,e.scrollIntoView({behavior:`smooth`,block:`center`});return}let l=[document.getElementById(`btn-save-species-form`),document.getElementById(`btn-save-species-bottom`)];l.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{let e=document.getElementById(`page-sp-id`).value,l=new FormData;if(l.append(`common_name`,t),l.append(`scientific_name`,r),l.append(`local_name`,document.getElementById(`page-sp-local`).value.trim()),l.append(`family`,document.getElementById(`page-sp-family`).value.trim()),l.append(`origin_status`,document.getElementById(`page-sp-origin`).value),l.append(`reference_source`,document.getElementById(`page-sp-ref`).value.trim()),l.append(`ecological_function`,document.getElementById(`page-sp-ecological`).value.trim()),l.append(`benefits`,document.getElementById(`page-sp-benefits`).value.trim()),l.append(`description`,document.getElementById(`page-sp-desc`).value.trim()),l.append(`is_active`,document.getElementById(`page-sp-active`).checked?`1`:`0`),a.forEach(e=>{l.append(`photos[]`,e.file)}),l.append(`existing_photos`,JSON.stringify(i)),o){if(o.startsWith(`existing:`))l.append(`cover_photo`,o.replace(`existing:`,``));else if(o.startsWith(`staged:`)){let e=o.replace(`staged:`,``),t=a.findIndex(t=>t.id===e);t!==-1&&l.append(`cover_photo_new_index`,t.toString())}}await H.saveTreeSpecies(l,e||null),n?s.updated(`Data jenis pohon '${t}' berhasil disimpan.`):s.created(`Data jenis pohon '${t}' berhasil disimpan.`),c=!1,G(`species`,W)}catch(t){e.className=`alert-box error`,t.status===422&&t.errors?(e.innerHTML=`<strong>Validasi Gagal:</strong><br>${Object.entries(t.errors).map(([e,t])=>`• ${Array.isArray(t)?t.join(`, `):t}`).join(`<br>`)}<br><small style="margin-top: 6px; display: block; color: var(--clr-text-muted);">Seluruh data input dan berkas foto tetap dipertahankan.</small>`,s.error(`✕ Validasi Gagal`,t.message||`Periksa kembali isian formulir.`)):t.status===403?(e.textContent=`Akses Ditolak: Anda tidak memiliki izin administrator untuk menyimpan data.`,s.error(`✕ Akses Ditolak`,t.message)):t.status===404?(e.textContent=`Data tidak ditemukan: Spesies yang akan diperbarui tidak ditemukan di server.`,s.error(`✕ Tidak Ditemukan`,t.message)):(e.textContent=`Gagal menyimpan jenis pohon: ${t.message}. Seluruh data input tetap dipertahankan.`,s.error(`✕ Gagal menyimpan jenis pohon`,t.message)),e.scrollIntoView({behavior:`smooth`,block:`center`}),l.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=`💾 ${n?`Simpan Perubahan`:`Simpan Jenis Pohon`}`)})}};document.getElementById(`btn-save-species-form`)?.addEventListener(`click`,S),document.getElementById(`btn-save-species-bottom`)?.addEventListener(`click`,S),document.getElementById(`species-page-form`)?.addEventListener(`submit`,e=>{e.preventDefault(),S()})}async function Zc(e,t){t&&t.length>0&&(W=t),e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat kegiatan penanaman...</div>`;let[n,r,i]=await Promise.all([H.getPlantingActivities(),H.getTreeSpecies(),H.getZones()]);Lc=n.activities||[],Ic=r.species||[],Rc=i.zones||[],e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">🌱</span>
          <span>Kegiatan Penanaman &amp; Batch Bibit</span>
        </h2>
        <p class="zones-hero-desc">
          Pencatatan batch penanaman bibit pohon silvikultur, alokasi kawasan restorasi, tim pelaksana, dan rincian varietas tanaman.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-add-activity" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>➕</span> Catat Kegiatan Penanaman
        </button>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; gap: 8px; flex: 1;">
        <input type="text" id="filter-act-search" class="form-input" placeholder="Cari batch, kegiatan, zona..." style="max-width: 320px;" />
      </div>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Kode Batch</th>
            <th style="padding: 10px 14px;">Tanggal Penanaman</th>
            <th style="padding: 10px 14px;">Kawasan Penanaman</th>
            <th style="padding: 10px 14px;">Zona / Blok</th>
            <th style="padding: 10px 14px; text-align: right;">Total Awal</th>
            <th style="padding: 10px 14px; text-align: center;">Kelangsungan Hidup</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="act-table-body">
          ${Qc(Lc)}
        </tbody>
      </table>
    </div>

  `,document.getElementById(`filter-act-search`)?.addEventListener(`input`,n=>{let r=n.target.value.toLowerCase().trim(),i=Lc.filter(e=>{let t=(e.batch_code||``).toLowerCase().includes(r),n=(e.name||``).toLowerCase().includes(r),i=(e.location_zone||``).toLowerCase().includes(r),a=(e.planting_zone_name||``).toLowerCase().includes(r),o=(e.person_in_charge||``).toLowerCase().includes(r),s=(e.organizer||``).toLowerCase().includes(r);return t||n||i||a||o||s}),a=document.getElementById(`act-table-body`);a&&(a.innerHTML=Qc(i)),$c(e,t)}),document.getElementById(`btn-add-activity`)?.addEventListener(`click`,()=>{G(`activities`,W,null,`create`)}),$c(e,t)}function Qc(e){return e.length===0?`<tr><td colspan="7" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan kegiatan penanaman.</td></tr>`:e.map(e=>{let t=e.survival_rate===null?`Data Belum Lengkap`:`${e.survival_rate}%`,n=e.survival_rate===null?`pill-neutral`:e.survival_rate>=80?`pill-success`:`pill-warning`,r=e.planting_zone_name;if(!r&&e.planting_zone_id&&Rc&&Rc.length>0){let t=Rc.find(t=>t.id===e.planting_zone_id);t&&(r=t.name)}return r||=`Kawasan Restorasi`,`
      <tr style="border-bottom: 1px solid var(--clr-border);">
        <td style="padding: 10px 14px;">
          <span style="font-weight: 600; color: #fff; font-family: monospace; font-size: 13px;">${K(e.batch_code)}</span>
        </td>
        <td style="padding: 10px 14px; white-space: nowrap;">
          <span style="font-size: 12.5px; color: var(--clr-text); display: inline-flex; align-items: center; gap: 5px;">
            <span>📅</span> ${U(e.activity_date)}
          </span>
        </td>
        <td style="padding: 10px 14px;">
          <span style="font-weight: 500; color: #34d399; display: inline-flex; align-items: center; gap: 5px;">
            <span>🏞️</span> ${K(r)}
          </span>
        </td>
        <td style="padding: 10px 14px;">
          <span style="color: var(--clr-text);">📍 ${K(e.location_zone)}</span>
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
    `}).join(``)}function $c(e,t){document.querySelectorAll(`.btn-edit-activity`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);G(`activities`,W,t,`edit`)})}),document.querySelectorAll(`.btn-del-activity`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=n.getAttribute(`data-id`);if(await V.confirm({title:`Hapus Kegiatan Penanaman?`,subtitle:`Tindakan ini akan menghapus catatan kegiatan dan rincian bibit.`,message:`Apakah Anda yakin ingin menghapus kegiatan penanaman ini beserta rincian bibitnya? Tindakan ini tidak dapat dibatalkan.`,type:`danger`,confirmText:`Ya, Hapus Kegiatan`,cancelText:`Batal`,icon:`🌱`}))try{await H.deletePlantingActivity(r),s.deleted(`Catatan kegiatan penanaman berhasil dihapus.`),Zc(e,t)}catch(e){s.error(`✕ Gagal menghapus kegiatan penanaman`,e.message)}})})}async function el(e=null,t,n=[],r=[]){let i=!!e;(!r||r.length===0)&&(Rc.length>0?r=Rc:(r=(await H.getZones()).zones||[],Rc=r)),(!n||n.length===0)&&(n=W),(!Ic||Ic.length===0)&&(Ic=(await H.getTreeSpecies()).species||[]);let a=e&&e.items&&e.items.length>0?e.items:[];t.innerHTML=`
    <!-- Hero Banner Card & Navigasi -->
    <div class="zones-hero-card" style="margin-bottom: 20px;">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">${i?`✏️`:`🌱`}</span>
          <span>${i?`Edit Kegiatan Penanaman: ${K(e.batch_code)}`:`Catat Kegiatan Penanaman Baru`}</span>
        </h2>
        <p class="zones-hero-desc">
          ${i?`Perbarui data pelaksanaan, kawasan penanaman, tim pelaksana, dan rincian jenis bibit yang ditanam.`:`Catat data pelaksanaan kegiatan penanaman baru, kawasan target, tim pelaksana, dan rincian bibit awal yang ditanam.`}
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 10px; z-index: 2; flex-wrap: wrap;">
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
            ${i?`<input type="text" id="edit-act-batch" class="form-input" readonly value="${K(e.batch_code)}" style="background: rgba(255,255,255,0.05); cursor: not-allowed; opacity: 0.85;" />
                 <small style="color: var(--clr-text-muted); font-size: 11px;">Kode unik batch penanaman dipertahankan sebagai referensi riwayat.</small>`:`<input type="text" id="edit-act-batch" class="form-input" required placeholder="Contoh: BATCH-2026-01" value="" />
                 <small style="color: var(--clr-text-muted); font-size: 11px;">Kode unik batch penanaman untuk identifikasi dan referensi pemantauan berkala.</small>`}
          </div>

          <div class="form-group">
            <label for="edit-act-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="edit-act-date" class="form-input" required value="${i?Pc(e.activity_date):new Date().toISOString().split(`T`)[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD${i?` • Tampilan: ${U(e.activity_date)}`:``}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="edit-act-name" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Kegiatan Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-name" class="form-input" required placeholder="Contoh: Penanaman Pohon Blok Utara Kawasan" value="${i?K(e.name):``}" />
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
              ${r.map(t=>`<option value="${t.id}" ${i?t.id===e.planting_zone_id?`selected`:``:r.length===1?`selected`:``}>${K(t.name)} (${K(t.zone_code||``)})</option>`).join(``)}
            </select>
          </div>

          <div class="form-group">
            <label for="edit-act-zone" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Zona / Blok <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-zone" class="form-input" required placeholder="Contoh: Blok A - Lereng Barat" value="${i?K(e.location_zone):``}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="edit-act-scene" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Hubungkan ke Panorama Marzipano (Opsional):
            </label>
            <select id="edit-act-scene" class="form-select">
              <option value="">-- Tanpa Hubungan Panorama --</option>
              ${n.map(t=>`<option value="${t.id}" ${i&&t.id===e.scene_id?`selected`:``}>${K(t.name)}</option>`).join(``)}
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
            <input type="text" id="edit-act-pic" class="form-input" required placeholder="Penanggung Jawab Lapangan" value="${i?K(e.person_in_charge):``}" />
          </div>

          <div class="form-group">
            <label for="edit-act-org" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tim / Organisasi / Mitra: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-org" class="form-input" required placeholder="Contoh: Tim IKHW Aceh" value="${i?K(e.organizer):`Tim IKHW Aceh`}" />
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
          <textarea id="edit-act-notes" class="form-textarea" rows="3" placeholder="Kondisi cuaca saat tanam, perlakuan mulsa, persiapan lubang tanam...">${i?K(e.notes||``):``}</textarea>
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
  `;let o=document.getElementById(`edit-act-items-container`),c=(e=null)=>{let t=document.createElement(`div`);return t.className=`edit-act-item-row`,e&&e.id&&(t.dataset.itemId=String(e.id)),t.style.cssText=`display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid var(--clr-border-subtle);`,t.innerHTML=`
      <select class="form-select edit-item-sp-select" style="flex: 2; min-width: 200px;" required>
        <option value="">-- Pilih Jenis Pohon --</option>
        ${Ic.map(t=>`<option value="${t.id}" ${e&&t.id===e.tree_species_id?`selected`:``}>${K(t.common_name)} (${K(t.scientific_name)})</option>`).join(``)}
      </select>
      <input type="number" class="form-input edit-item-qty-input" style="flex: 1; min-width: 100px;" placeholder="Jumlah bibit" min="1" value="${e?e.quantity:``}" required />
      <input type="text" class="form-input edit-item-unit-input" style="width: 90px;" value="${K(e?.unit||`batang`)}" placeholder="Satuan" />
      <button type="button" class="icon-btn-sm edit-btn-del-row" style="color: #ef4444;" title="Hapus Baris" aria-label="Hapus Baris">✕</button>
    `,t.querySelector(`.edit-btn-del-row`).addEventListener(`click`,()=>{o.querySelectorAll(`.edit-act-item-row`).length>1?t.remove():s.warning(`Peringatan Input`,`Minimal satu jenis pohon harus ada dalam kegiatan penanaman.`)}),t};a.length>0?a.forEach(e=>o.appendChild(c(e))):o.appendChild(c(null)),document.getElementById(`btn-edit-add-item-row`)?.addEventListener(`click`,()=>{o.appendChild(c(null))});let l=!1,u=()=>{l=!0};t.querySelectorAll(`input, select, textarea`).forEach(e=>{e.addEventListener(`input`,u),e.addEventListener(`change`,u)});let d=async()=>{(!l||await V.confirm({title:`Batalkan Pengisian Kegiatan?`,subtitle:`Perubahan Belum Disimpan`,message:`Data kegiatan penanaman yang telah Anda ubah akan hilang jika Anda meninggalkan halaman ini sekarang. Apakah Anda yakin ingin kembali?`,type:`warning`,confirmText:`Ya, Tinggalkan`,cancelText:`Tetap di Sini`,icon:`⚠️`}))&&G(`activities`,W)};document.getElementById(`breadcrumb-btn-act-list`)?.addEventListener(`click`,d),document.getElementById(`btn-back-to-act`)?.addEventListener(`click`,d),document.getElementById(`btn-cancel-act-top`)?.addEventListener(`click`,d),document.getElementById(`btn-cancel-act-bottom`)?.addEventListener(`click`,d);let f=()=>{document.querySelectorAll(`.field-error-msg`).forEach(e=>e.remove()),document.querySelectorAll(`.input-field-error`).forEach(e=>{e.classList.remove(`input-field-error`),e.style.borderColor=``})},p=(e,t)=>{if(!e)return;e.classList.add(`input-field-error`),e.style.borderColor=`#ef4444`;let n=document.createElement(`div`);n.className=`field-error-msg`,n.style.cssText=`color: #ef4444; font-size: 11px; margin-top: 4px; font-weight: 500;`,n.textContent=`⚠ ${t}`,e.nextSibling?e.parentNode.insertBefore(n,e.nextSibling):e.parentNode.appendChild(n)},m=async()=>{let t=document.getElementById(`act-edit-alert`);t.classList.add(`hidden`),t.textContent=``,f();let n=document.getElementById(`edit-act-batch`).value.trim(),r=document.getElementById(`edit-act-date`).value,a=Fc(r),c=document.getElementById(`edit-act-name`).value.trim(),u=document.getElementById(`edit-act-zone-id`).value,d=document.getElementById(`edit-act-zone`).value.trim(),m=document.getElementById(`edit-act-scene`).value,h=document.getElementById(`edit-act-pic`).value.trim(),g=document.getElementById(`edit-act-org`).value.trim(),_=document.getElementById(`edit-act-notes`).value.trim();if(!n){t.className=`alert-banner alert-danger`,t.textContent=`Kode / kelompok batch kegiatan penanaman wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-batch`),`Kode batch wajib diisi.`);return}if(!a){t.className=`alert-banner alert-danger`,t.textContent=`Tanggal penanaman wajib diisi dengan format tanggal yang valid.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-date`),`Tanggal penanaman tidak valid.`);return}if(!c){t.className=`alert-banner alert-danger`,t.textContent=`Nama kegiatan penanaman wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-name`),`Nama kegiatan penanaman wajib diisi.`);return}if(!u){t.className=`alert-banner alert-danger`,t.textContent=`Kawasan penanaman wajib dipilih.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-zone-id`),`Pilih kawasan penanaman.`);return}if(!d){t.className=`alert-banner alert-danger`,t.textContent=`Zona deskriptif / blok penanaman wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-zone`),`Zona deskriptif / blok penanaman wajib diisi.`);return}if(!h){t.className=`alert-banner alert-danger`,t.textContent=`Nama penanggung jawab (PIC) wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-pic`),`Nama penanggung jawab (PIC) wajib diisi.`);return}if(!g){t.className=`alert-banner alert-danger`,t.textContent=`Tim atau organisasi pelaksana wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),p(document.getElementById(`edit-act-org`),`Tim atau organisasi pelaksana wajib diisi.`);return}let v=o.querySelectorAll(`.edit-act-item-row`),y=[],b=!1;if(v.forEach(e=>{let t=e.querySelector(`.edit-item-sp-select`).value,n=e.querySelector(`.edit-item-qty-input`).value,r=parseInt(n,10),i=e.querySelector(`.edit-item-unit-input`).value.trim()||`batang`,a=e.dataset.itemId?parseInt(e.dataset.itemId,10):null;if(t&&!isNaN(r)&&r>0){let e={tree_species_id:t,quantity:r,unit:i};a&&(e.id=a),y.push(e)}else t&&(isNaN(r)||r<=0)?(b=!0,p(e.querySelector(`.edit-item-qty-input`),`Jumlah bibit minimal 1.`)):!t&&n&&p(e.querySelector(`.edit-item-sp-select`),`Pilih jenis pohon.`)}),b){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah bibit harus berupa angka bulat positif (minimal 1).`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(y.length===0){t.className=`alert-banner alert-danger`,t.textContent=`Pilih setidaknya 1 jenis pohon dengan jumlah bibit yang valid.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}let x={batch_code:n,activity_date:a,name:c,planting_zone_id:u||null,location_zone:d,scene_id:m||null,person_in_charge:h,organizer:g,notes:_,items:y},S=[document.getElementById(`btn-save-act-top`),document.getElementById(`btn-save-act-bottom`)];S.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{await H.savePlantingActivity(x,i?e.id:null),s.show({type:`success`,title:i?`Berhasil diperbarui.`:`Berhasil disimpan.`,message:i?`Data kegiatan penanaman '${n}' berhasil diperbarui.`:`Data kegiatan penanaman '${n}' dan rincian bibit berhasil dicatat.`}),l=!1,G(`activities`,W)}catch(e){t.className=`alert-banner alert-danger`,e.errors&&typeof e.errors==`object`?t.innerHTML=`
          <strong>✕ Gagal menyimpan kegiatan: Terdapat kesalahan validasi input</strong>
          <ul style="margin: 8px 0 0 18px; padding: 0;">${Object.entries(e.errors).map(([e,t])=>{let n=Array.isArray(t)?t.join(`, `):String(t);if(e===`batch_code`)p(document.getElementById(`edit-act-batch`),n);else if(e===`name`)p(document.getElementById(`edit-act-name`),n);else if(e===`activity_date`)p(document.getElementById(`edit-act-date`),n);else if(e===`location_zone`)p(document.getElementById(`edit-act-zone`),n);else if(e===`planting_zone_id`)p(document.getElementById(`edit-act-zone-id`),n);else if(e===`scene_id`)p(document.getElementById(`edit-act-scene`),n);else if(e===`person_in_charge`)p(document.getElementById(`edit-act-pic`),n);else if(e===`organizer`)p(document.getElementById(`edit-act-org`),n);else if(e.startsWith(`items.`)){let t=e.split(`.`),r=parseInt(t[1],10),i=t[2],a=o.querySelectorAll(`.edit-act-item-row`);a[r]&&(i===`tree_species_id`?p(a[r].querySelector(`.edit-item-sp-select`),n):i===`quantity`&&p(a[r].querySelector(`.edit-item-qty-input`),n))}return`<li>${K(n)}</li>`}).join(``)}</ul>
          <div style="margin-top: 6px; font-size: 11px; opacity: 0.85;">Seluruh data input yang telah Anda isi tetap dipertahankan. Silakan periksa kembali dan simpan ulang.</div>
        `:t.textContent=`Gagal menyimpan kegiatan penanaman: ${e.message}. Seluruh data input tetap dipertahankan.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),s.error(`✕ Gagal menyimpan kegiatan`,e.message||`Terjadi kesalahan validasi.`),S.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=`💾 ${i?`Simpan Perubahan`:`Simpan Kegiatan`}`)})}};document.getElementById(`btn-save-act-top`)?.addEventListener(`click`,m),document.getElementById(`btn-save-act-bottom`)?.addEventListener(`click`,m),document.getElementById(`form-edit-activity`)?.addEventListener(`submit`,e=>{e.preventDefault(),m()})}async function tl(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat catatan survei pemantauan...</div>`;let[t,n]=await Promise.all([H.getTreeSurveys(),H.getPlantingActivities()]),r=t.surveys||[];Lc=n.activities||[],e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">📋</span>
          <span>Pemantauan Pertumbuhan &amp; Sensus Pohon</span>
        </h2>
        <p class="zones-hero-desc">
          Riwayat survei sensus berkala tanaman, analisis laju kelangsungan hidup (survival rate), dan evaluasi kondisi pertumbuhan bibit per batch.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-add-survey" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>➕</span> Catat Hasil Survei
        </button>
      </div>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Tanggal Survei</th>
            <th style="padding: 10px 14px;">Kode Batch</th>
            <th style="padding: 10px 14px;">Kawasan / Blok</th>
            <th style="padding: 10px 14px;">Bibit Hidup Awal</th>
            <th style="padding: 10px 14px;">Mati / Hilang</th>
            <th style="padding: 10px 14px; text-align: center;">Kelangsungan Hidup</th>
            <th style="padding: 10px 14px;">Pemeriksa</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${r.length>0?r.map(e=>{let t=e.planting_zone_name||`Kawasan Restorasi`,n=e.location_zone||`-`;return`
                <tr style="border-bottom: 1px solid var(--clr-border);">
                  <td style="padding: 10px 14px; font-weight: 600; white-space: nowrap;">📅 ${U(e.survey_date)}</td>
                  <td style="padding: 10px 14px;">
                    <span style="font-weight: 600; color: #fff; font-family: monospace; font-size: 13px;">${K(e.batch_code||`-`)}</span>
                  </td>
                  <td style="padding: 10px 14px;">
                    <span style="font-weight: 500; color: #34d399; display: inline-flex; align-items: center; gap: 4px;">
                      <span>🏞️</span> ${K(t)}
                    </span><br>
                    <span style="font-size: 11px; color: var(--clr-text-muted);">📍 ${K(n)}</span>
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
                  <td style="padding: 10px 14px;">${K(e.inspector_name)}</td>
                  <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                    <button class="btn-edit-survey icon-btn-sm" data-id="${e.id}" title="Edit Survei" aria-label="Edit Survei" style="margin-right: 4px; color: #38bdf8;">✏️</button>
                    <button class="btn-del-survey icon-btn-sm" data-id="${e.id}" title="Hapus Survei" aria-label="Hapus Survei" style="color: #ef4444;">🗑️</button>
                  </td>
                </tr>
              `}).join(``):`<tr><td colspan="8" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan survei pemantauan.</td></tr>`}
        </tbody>
      </table>
    </div>

  `,document.getElementById(`btn-add-survey`)?.addEventListener(`click`,()=>{G(`surveys`,W,null,`create`)}),document.querySelectorAll(`.btn-edit-survey`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);G(`surveys`,W,t,`edit`)})}),document.querySelectorAll(`.btn-del-survey`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`);if(await V.confirm({title:`Hapus Catatan Pemantauan?`,subtitle:`Data riwayat survei dan kesehatan pohon akan dihapus.`,message:`Apakah Anda yakin ingin menghapus catatan survei ini? Tindakan ini tidak dapat dibatalkan.`,type:`danger`,confirmText:`Ya, Hapus Survei`,cancelText:`Batal`,icon:`📊`}))try{await H.deleteTreeSurvey(n),s.deleted(`Catatan survei pemantauan berhasil dihapus.`),tl(e)}catch(e){s.error(`✕ Gagal menghapus survei`,e.message)}})})}async function nl(e=null,t){let n=!!e;(!Lc||Lc.length===0)&&(Lc=(await H.getPlantingActivities()).activities||[]),t.innerHTML=`
    <!-- Hero Banner Card & Navigasi -->
    <div class="zones-hero-card" style="margin-bottom: 20px;">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">${n?`✏️`:`📋`}</span>
          <span>${n?`Edit Pemantauan Tanaman: ${K(e.batch_code||e.id)}`:`Catat Hasil Survei Pemantauan Tanaman`}</span>
        </h2>
        <p class="zones-hero-desc">
          ${n?`Koreksi hasil sensus lapangan, kondisi kesehatan bibit, dan pengukuran silvikultur batch tanaman.`:`Rekam hasil sensus berkala, laju kelangsungan hidup, dan catatan silvikultur per batch penanaman.`}
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 10px; z-index: 2; flex-wrap: wrap;">
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
              ${Lc.map(t=>`<option value="${t.id}" ${e&&t.id===e.planting_activity_id?`selected`:``}>${K(t.batch_code)} - ${K(t.name)} (${t.total_initial_seedlings} bibit)</option>`).join(``)}
            </select>
          </div>

          <div class="form-group">
            <label for="srv-form-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Pemeriksaan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="srv-form-date" class="form-input" required value="${e?Pc(e.survey_date):new Date().toISOString().split(`T`)[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD ${e?`• Tampilan sebelumnya: ${U(e.survey_date)}`:``}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-inspector" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Petugas Pemeriksa: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="srv-form-inspector" class="form-input" required placeholder="Nama Surveyor / Tim Lapangan" value="${K(e?.inspector_name||``)}" />
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
            <input type="text" id="srv-form-symptoms" class="form-input" placeholder="Kekeringan, dimakan satwa, tertutup gulma..." value="${K(e?.damage_symptoms||``)}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Catatan Lapangan & Rekomendasi Tindakan:
            </label>
            <textarea id="srv-form-notes" class="form-textarea" rows="3" placeholder="Perlu penyiangan piringan, pemupukan tambahan, penyulaman...">${K(e?.field_notes||``)}</textarea>
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
  `;let r=!1,i=()=>{r=!0};t.querySelectorAll(`input, select, textarea`).forEach(e=>{e.addEventListener(`input`,i),e.addEventListener(`change`,i)});let a=async()=>{(!r||await V.confirm({title:`Batalkan Pengisian Survei?`,subtitle:`Perubahan Belum Disimpan`,message:`Data hasil sensus pemantauan yang telah Anda ubah akan hilang jika Anda meninggalkan halaman ini sekarang. Apakah Anda yakin ingin kembali?`,type:`warning`,confirmText:`Ya, Tinggalkan`,cancelText:`Tetap di Sini`,icon:`⚠️`}))&&G(`surveys`,W)};document.getElementById(`breadcrumb-btn-srv-list`)?.addEventListener(`click`,a),document.getElementById(`btn-back-to-srv`)?.addEventListener(`click`,a),document.getElementById(`btn-cancel-srv-top`)?.addEventListener(`click`,a),document.getElementById(`btn-cancel-srv-bottom`)?.addEventListener(`click`,a);let o=async()=>{let t=document.getElementById(`srv-form-alert`);t.classList.add(`hidden`),t.textContent=``;let i=document.getElementById(`srv-form-act`).value,a=document.getElementById(`srv-form-date`).value,o=Fc(a),c=document.getElementById(`srv-form-inspector`).value.trim(),l=document.getElementById(`srv-form-alive`).value,u=document.getElementById(`srv-form-dead`).value,d=document.getElementById(`srv-form-missing`).value,f=document.getElementById(`srv-form-health`).value,p=parseFloat(document.getElementById(`srv-form-height`).value)||null,m=parseFloat(document.getElementById(`srv-form-diameter`).value)||null,h=document.getElementById(`srv-form-symptoms`).value.trim()||null,g=document.getElementById(`srv-form-notes`).value.trim()||null;if(!i){t.className=`alert-banner alert-danger`,t.textContent=`Pilih kelompok / batch penanaman.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!o){t.className=`alert-banner alert-danger`,t.textContent=`Tanggal pemeriksaan wajib diisi dengan tanggal yang valid.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!c){t.className=`alert-banner alert-danger`,t.textContent=`Nama petugas pemeriksa wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}let _=parseInt(l,10),v=parseInt(u,10),y=parseInt(d,10)||0;if(isNaN(_)||_<0){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah bibit hidup tidak boleh kosong atau bernilai negatif.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(isNaN(v)||v<0){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah bibit mati tidak boleh negatif.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(y<0){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah bibit hilang tidak boleh negatif.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}let b=Lc.find(e=>e.id===i);if(b&&b.total_initial_seedlings>0&&_>b.total_initial_seedlings){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah bibit hidup (${_}) tidak boleh melebihi jumlah awal batch (${b.total_initial_seedlings} bibit).`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}let x={planting_activity_id:i,survey_date:o,alive_count:_,dead_count:v,missing_count:y,health_condition:f,inspector_name:c,average_height_cm:p,average_diameter_cm:m,damage_symptoms:h,field_notes:g,is_verified:!0},S=[document.getElementById(`btn-save-srv-top`),document.getElementById(`btn-save-srv-bottom`)];S.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{await H.saveTreeSurvey(x,n?e.id:null),n?s.show({type:`success`,title:`Berhasil diperbarui.`,message:`Data hasil pemantauan tanaman berhasil diperbarui.`}):s.saved(`Catatan survei pemantauan pohon berhasil disimpan.`),r=!1,G(`surveys`,W)}catch(e){t.className=`alert-banner alert-danger`,t.textContent=`Gagal menyimpan survei: ${e.message}. Seluruh data input tetap dipertahankan.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),s.error(`✕ Gagal menyimpan survei`,e.message),S.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=n?`💾 Simpan Perubahan`:`💾 Simpan Survei`)})}};document.getElementById(`btn-save-srv-top`)?.addEventListener(`click`,o),document.getElementById(`btn-save-srv-bottom`)?.addEventListener(`click`,o),document.getElementById(`form-survey-page`)?.addEventListener(`submit`,e=>{e.preventDefault(),o()})}async function rl(e){e.innerHTML=`<div style="text-align: center; padding: 30px;">⏳ Memuat catatan perawatan & penyulaman...</div>`;let[t,n]=await Promise.all([H.getTreeMaintenance(),H.getPlantingActivities()]),r=t.logs||[];Lc=n.activities||[],e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">🛠️</span>
          <span>Perawatan, Pemupukan &amp; Penyulaman</span>
        </h2>
        <p class="zones-hero-desc">
          Pencatatan tindakan silvikultur (penyiangan, penyiraman, pemupukan) serta bibit pengganti penyulaman untuk menjaga kelangsungan hidup tegakan.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-add-maintenance" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>➕</span> Catat Tindakan Perawatan
        </button>
      </div>
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
                  <td style="padding: 10px 14px; font-weight: 600;">📅 ${U(e.maintenance_date)}</td>
                  <td style="padding: 10px 14px;">${K(e.batch_code)} (${K(e.location_zone)})</td>
                  <td style="padding: 10px 14px;">
                    <span class="admin-header-pill ${e.action_type===`penyulaman`?`pill-warning`:`pill-neutral`}" style="font-size: 11px;">
                      ${K(e.action_type_label)}
                    </span>
                  </td>
                  <td style="padding: 10px 14px;">${e.plants_handled_count||`-`} bibit</td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #f59e0b;">
                    ${e.replacement_plants_count>0?`+${e.replacement_plants_count} bibit baru`:`-`}
                  </td>
                  <td style="padding: 10px 14px;">${K(e.officer_or_team)}</td>
                  <td style="padding: 10px 14px; font-size: 12px; color: var(--clr-text-muted);">${K(e.action_reason||e.notes||`-`)}</td>
                  <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                    <button class="btn-edit-maintenance icon-btn-sm" data-id="${e.id}" title="Edit Catatan Perawatan" aria-label="Edit Catatan Perawatan" style="margin-right: 4px; color: #38bdf8;">✏️</button>
                    <button class="btn-del-maintenance icon-btn-sm" data-id="${e.id}" title="Hapus" aria-label="Hapus" style="color: #ef4444;">🗑️</button>
                  </td>
                </tr>
              `).join(``):`<tr><td colspan="8" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan perawatan.</td></tr>`}
        </tbody>
      </table>
    </div>

  `,document.getElementById(`btn-add-maintenance`)?.addEventListener(`click`,()=>{G(`maintenance`,W,null,`create`)}),document.querySelectorAll(`.btn-edit-maintenance`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`);G(`maintenance`,W,t,`edit`)})}),document.querySelectorAll(`.btn-del-maintenance`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-id`);if(await V.confirm({title:`Hapus Catatan Perawatan?`,subtitle:`Data perawatan / penyulaman tanaman akan dihapus.`,message:`Apakah Anda yakin ingin menghapus catatan perawatan ini? Tindakan ini tidak dapat dibatalkan.`,type:`danger`,confirmText:`Ya, Hapus Catatan`,cancelText:`Batal`,icon:`🛠️`}))try{await H.deleteTreeMaintenance(n),s.deleted(`Catatan perawatan berhasil dihapus.`),rl(e)}catch(e){s.error(`✕ Gagal menghapus perawatan`,e.message)}})})}async function il(e=null,t){let n=!!e;(!Lc||Lc.length===0)&&(Lc=(await H.getPlantingActivities()).activities||[]),t.innerHTML=`
    <!-- Hero Banner Card & Navigasi -->
    <div class="zones-hero-card" style="margin-bottom: 20px;">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">${n?`✏️`:`🛠️`}</span>
          <span>${n?`Edit Perawatan &amp; Penyulaman: ${K(e.batch_code||e.id)}`:`Catat Tindakan Perawatan / Penyulaman`}</span>
        </h2>
        <p class="zones-hero-desc">
          ${n?`Koreksi tindakan silvikultur, bibit penyulaman baru, dan tim pelaksana penanganan bibit.`:`Catat tindakan silvikultur (penyiangan, penyiraman, pemupukan) atau penyulaman bibit baru pengganti.`}
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 10px; z-index: 2; flex-wrap: wrap;">
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
              ${Lc.map(t=>`<option value="${t.id}" ${e&&t.id===e.planting_activity_id?`selected`:``}>${K(t.batch_code)} - ${K(t.name)}</option>`).join(``)}
            </select>
          </div>

          <div class="form-group">
            <label for="mnt-form-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Pelaksanaan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="mnt-form-date" class="form-input" required value="${e?Pc(e.maintenance_date):new Date().toISOString().split(`T`)[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD ${e?`• Tampilan sebelumnya: ${U(e.maintenance_date)}`:``}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="mnt-form-team" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Petugas / Tim Pelaksana: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="mnt-form-team" class="form-input" required placeholder="Contoh: Tim Silvikultur IKHW" value="${K(e?.officer_or_team||`Tim Silvikultur IKHW`)}" />
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
            <input type="text" id="mnt-form-reason" class="form-input" placeholder="Gulma menutupi tajuk bibit / bibit mati kekeringan / pemupukan berkala..." value="${K(e?.action_reason||``)}" />
          </div>

          <div class="form-group">
            <label for="mnt-form-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Catatan Tambahan & Dokumentasi:
            </label>
            <textarea id="mnt-form-notes" class="form-textarea" rows="3" placeholder="Kondisi pasca tindakan, rekomendasi pemantauan lanjutan...">${K(e?.notes||``)}</textarea>
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
  `;let r=!1,i=()=>{r=!0};t.querySelectorAll(`input, select, textarea`).forEach(e=>{e.addEventListener(`input`,i),e.addEventListener(`change`,i)});let a=async()=>{(!r||await V.confirm({title:`Batalkan Pengisian Perawatan?`,subtitle:`Perubahan Belum Disimpan`,message:`Data tindakan perawatan atau penyulaman yang telah Anda ubah akan hilang jika Anda meninggalkan halaman ini sekarang. Apakah Anda yakin ingin kembali?`,type:`warning`,confirmText:`Ya, Tinggalkan`,cancelText:`Tetap di Sini`,icon:`⚠️`}))&&G(`maintenance`,W)};document.getElementById(`breadcrumb-btn-mnt-list`)?.addEventListener(`click`,a),document.getElementById(`btn-back-to-mnt`)?.addEventListener(`click`,a),document.getElementById(`btn-cancel-mnt-top`)?.addEventListener(`click`,a),document.getElementById(`btn-cancel-mnt-bottom`)?.addEventListener(`click`,a);let o=async()=>{let t=document.getElementById(`mnt-form-alert`);t.classList.add(`hidden`),t.textContent=``;let i=document.getElementById(`mnt-form-act`).value,a=document.getElementById(`mnt-form-date`).value,o=Fc(a),c=document.getElementById(`mnt-form-action`).value,l=document.getElementById(`mnt-form-team`).value.trim(),u=document.getElementById(`mnt-form-handled`).value,d=document.getElementById(`mnt-form-replacement`).value,f=document.getElementById(`mnt-form-cost`).value,p=document.getElementById(`mnt-form-reason`).value.trim()||null,m=document.getElementById(`mnt-form-notes`).value.trim()||null;if(!i){t.className=`alert-banner alert-danger`,t.textContent=`Pilih kelompok / batch penanaman.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!o){t.className=`alert-banner alert-danger`,t.textContent=`Tanggal pelaksanaan wajib diisi dengan tanggal yang valid.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(!l){t.className=`alert-banner alert-danger`,t.textContent=`Petugas atau tim pelaksana wajib diisi.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}let h=parseInt(u,10)||0,g=parseInt(d,10)||0,_=f?parseFloat(f):null;if(h<0){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah tanaman ditangani tidak boleh negatif.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}if(g<0){t.className=`alert-banner alert-danger`,t.textContent=`Jumlah bibit penyulaman tidak boleh negatif.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`});return}let v={planting_activity_id:i,maintenance_date:o,action_type:c,officer_or_team:l,plants_handled_count:h,replacement_plants_count:g,action_reason:p,notes:m,cost:_},y=[document.getElementById(`btn-save-mnt-top`),document.getElementById(`btn-save-mnt-bottom`)];y.forEach(e=>{e&&(e.disabled=!0,e.innerHTML=`⏳ Menyimpan...`)});try{await H.saveTreeMaintenance(v,n?e.id:null),n?s.show({type:`success`,title:`Berhasil diperbarui.`,message:`Catatan perawatan dan penyulaman berhasil diperbarui.`}):s.saved(`Catatan perawatan dan penyulaman berhasil disimpan.`),r=!1,G(`maintenance`,W)}catch(e){t.className=`alert-banner alert-danger`,t.textContent=`Gagal menyimpan catatan perawatan: ${e.message}. Seluruh data input tetap dipertahankan.`,t.classList.remove(`hidden`),t.scrollIntoView({behavior:`smooth`,block:`center`}),s.error(`✕ Gagal menyimpan perawatan`,e.message),y.forEach(e=>{e&&(e.disabled=!1,e.innerHTML=n?`💾 Simpan Perubahan`:`💾 Simpan Tindakan`)})}};document.getElementById(`btn-save-mnt-top`)?.addEventListener(`click`,o),document.getElementById(`btn-save-mnt-bottom`)?.addEventListener(`click`,o),document.getElementById(`form-maintenance-page`)?.addEventListener(`submit`,e=>{e.preventDefault(),o()})}function al(e){e.innerHTML=`
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
  `}function ol(e){e.innerHTML=`
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
  `;let t=document.getElementById(`form-import-preview`),n=document.getElementById(`import-preview-container`);t?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`import-type`).value,r=document.getElementById(`import-file`).files[0];if(r){n.innerHTML=`<div style="text-align: center; padding: 20px;">⏳ Memvalidasi berkas CSV...</div>`,n.classList.remove(`hidden`);try{let e=await H.previewTreeImport(r,t);sl(n,e,t)}catch(e){n.innerHTML=`
        <div class="alert-banner alert-danger">
          ⚠️ Validasi Gagal: ${K(e.message)}
        </div>
      `}}})}function sl(e,t,n){let r=t.invalid_count>0,i=t.valid_count>0;e.innerHTML=`
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
                <td style="padding: 6px 10px;">${K(e.common_name||e.batch_code||``)} ${e.scientific_name?`(<i>${e.scientific_name}</i>)`:``} ${e.quantity?`— ${e.quantity} bibit`:``}</td>
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
  `,document.getElementById(`btn-execute-import`)?.addEventListener(`click`,async()=>{let r=document.getElementById(`btn-execute-import`);try{r&&(r.disabled=!0,r.textContent=`Menyimpan data impor...`);let i=await H.executeTreeImport(n,t.valid_data);s.imported(i?.message||`Data impor berhasil disimpan ke database.`),e.classList.add(`hidden`)}catch(e){s.error(`✕ Gagal mengimpor data`,e.message)}finally{r&&(r.disabled=!1,r.textContent=`💾 Simpan ${t.valid_count} Data Valid ke Database`)}})}function K(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var cl=null,ll=[],ul=`all`,dl=``,fl=`all`,q=[],pl=0;function ml(e){return e?String(e).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().trim().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``):``}function hl(e){if(!e||e<=0)return`0 B`;let t=1024,n=[`B`,`KB`,`MB`,`GB`],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/t**r).toFixed(1))+` `+n[r]}function gl(e,t){cl=t,ul=`all`,dl=``,fl=`all`,e.innerHTML=`
    <div class="zone-gallery-admin-wrapper space-y-5">
      <!-- Gallery Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 class="text-base font-bold text-white flex items-center gap-2">
            <span>🖼️</span> Galeri Foto Kawasan: <span class="text-blue-400 font-semibold">${kl(t.name)}</span>
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
          <select id="admin-gallery-cat-filter" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500">
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
          <select id="admin-gallery-status-filter" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500">
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
            class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-blue-500 placeholder-slate-500"
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
    <div id="admin-upload-modal" class="admin-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="upload-modal-title">
      <div class="admin-modal-box" style="max-width: 680px; width: 95%;">
        <div class="admin-modal-header">
          <h3 id="upload-modal-title" style="margin: 0; font-size: 16px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
            <span>📤</span> Unggah Foto Dokumentasi Kawasan
          </h3>
          <button type="button" id="btn-close-upload-modal" class="icon-btn-sm" title="Tutup Popup">✕</button>
        </div>

        <form id="admin-upload-form" style="display: flex; flex-direction: column; margin: 0; min-height: 0;">
          <div class="admin-modal-body" style="display: flex; flex-direction: column; gap: 16px; max-height: calc(85vh - 130px); overflow-y: auto; padding-right: 6px;">
            <div id="admin-upload-error" class="hidden alert-box error" style="padding: 10px 14px; font-size: 12px; border-radius: 8px;"></div>

            <!-- Path Structure Preview Banner -->
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 78, 59, 0.16)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 12px 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                <span style="font-size: 12px; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 6px;">
                  <span>📁</span> Struktur Jalur Penyimpanan Berkas:
                </span>
                <span style="font-size: 10.5px; font-weight: 600; color: #94a3b8; background: rgba(0, 0, 0, 0.4); padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08);">
                  Kategori / Judul Foto / Label
                </span>
              </div>
              <div id="upload-live-path-preview" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11.5px; color: #6ee7b7; background: rgba(0, 0, 0, 0.55); padding: 7px 12px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.25); overflow-x: auto; white-space: nowrap; word-break: break-all;">
                /storage/zones/.../photos/kondisi-kawasan/...
              </div>
              <p style="margin: 6px 0 0; font-size: 11px; color: #94a3b8;">
                Berkas disimpan ke direktori kategori dan diberi penamaan terstruktur berdasarkan label judul masing-masing foto.
              </p>
            </div>

            <!-- Kategori Foto (Global for this upload batch) -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Kategori Foto Dokumentasi <span style="color: #ef4444;">*</span>
              </label>
              <select
                id="upload-category-input"
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
              >
                <option value="Lanskap & Topografi">Lanskap & Topografi</option>
                <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                <option value="Bibit & Spesies">Bibit & Spesies</option>
                <option value="Pertumbuhan Vegetasi">Pertumbuhan Vegetasi</option>
                <option value="Pemantauan">Pemantauan</option>
                <option value="Perawatan">Perawatan</option>
                <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
              </select>
            </div>

            <!-- File Upload Dropzone -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 12.5px; font-weight: 600; color: #e2e8f0;">
                  Pilih Berkas Foto (Bisa pilih lebih dari 1 foto sekaligus) <span style="color: #ef4444;">*</span>
                </label>
                <span id="upload-dropzone-counter" style="font-size: 11.5px; color: #34d399; font-weight: 600;">0 berkas dipilih</span>
              </div>
              <div id="upload-dropzone" style="position: relative; border: 2px dashed rgba(16, 185, 129, 0.4); border-radius: 12px; background: rgba(16, 185, 129, 0.05); padding: 22px 16px; text-align: center; transition: all 0.2s ease; cursor: pointer;">
                <input
                  type="file"
                  id="upload-file-input"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 2;"
                />
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; pointer-events: none;">
                  <span style="font-size: 32px;">📁</span>
                  <span style="font-size: 13.5px; font-weight: 600; color: #6ee7b7;">Klik atau seret foto-foto ke area ini</span>
                  <span style="font-size: 11px; color: var(--clr-text-muted);">Format: JPG, PNG, WebP (Maksimal 5 MB per berkas foto)</span>
                </div>
              </div>
            </div>

            <!-- Staged Photos List (Cards) -->
            <div id="upload-staged-container" class="hidden" style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                <span style="font-size: 12.5px; font-weight: 700; color: #e2e8f0; display: flex; align-items: center; gap: 6px;">
                  <span>📸</span> Foto Siap Diunggah (<span id="upload-staged-count-num">0</span>)
                </span>
                <div style="display: flex; gap: 8px;">
                  <button type="button" id="btn-add-more-photos" class="btn-secondary-action" style="padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer;">
                    <span>➕</span> Tambah Foto
                  </button>
                  <button type="button" id="btn-clear-staged-photos" class="btn-secondary-action" style="padding: 4px 10px; font-size: 11px; color: #f87171; border-color: rgba(239, 68, 68, 0.3); cursor: pointer;">
                    Bersihkan
                  </button>
                </div>
              </div>

              <!-- Staged Cards List Container -->
              <div id="upload-staged-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 240px; overflow-y: auto; padding-right: 4px;">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <!-- Deskripsi / Keterangan (Caption) -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Deskripsi / Keterangan Foto (Caption)
              </label>
              <textarea
                id="upload-caption-input"
                rows="2"
                placeholder="Tulis uraian konteks dokumentasi kawasan ini..."
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; resize: vertical; box-sizing: border-box;"
              ></textarea>
            </div>

            <!-- Tanggal & Checkboxes -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start;">
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                  Tanggal Dokumentasi Lapangan
                </label>
                <input
                  type="date"
                  id="upload-date-input"
                  style="width: 100%; padding: 9px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
                />
              </div>

              <!-- Checkbox panel -->
              <div style="padding: 10px 14px; background: rgba(0, 0, 0, 0.28); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; display: flex; flex-direction: column; gap: 8px; margin-top: 22px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="upload-is-published" checked style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                  <span>Publikasikan ke Galeri Publik</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="upload-is-cover" checked style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                  <span>Terapkan Pilihan Foto Sampul</span>
                </label>
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" id="btn-cancel-upload" class="btn-secondary-action btn-sm">Batal</button>
            <button type="submit" id="btn-submit-upload" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
              <span>🚀</span> <span id="upload-submit-btn-text">Mulai Unggah</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Photo Modal Container -->
    <div id="admin-edit-photo-modal" class="admin-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
      <div class="admin-modal-box" style="max-width: 580px;">
        <div class="admin-modal-header">
          <h3 id="edit-modal-title" style="margin: 0; font-size: 16px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
            <span>✏️</span> Edit Metadata Foto Dokumentasi
          </h3>
          <button type="button" id="btn-close-edit-modal" class="icon-btn-sm" title="Tutup Popup">✕</button>
        </div>

        <form id="admin-edit-photo-form" style="display: flex; flex-direction: column; margin: 0; min-height: 0;">
          <input type="hidden" id="edit-photo-id" />
          <div class="admin-modal-body" style="display: flex; flex-direction: column; gap: 16px; max-height: calc(85vh - 140px); overflow-y: auto;">
            <div id="admin-edit-error" class="hidden alert-box error" style="padding: 10px 14px; font-size: 12px; border-radius: 8px;"></div>

            <!-- Preview & Replace File -->
            <div style="display: flex; align-items: center; gap: 14px; padding: 12px 14px; background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(16, 185, 129, 0.22); border-radius: 12px;">
              <img id="edit-preview-img" src="" alt="" style="width: 68px; height: 68px; border-radius: 10px; object-fit: cover; border: 1px solid rgba(255, 255, 255, 0.15); flex-shrink: 0;" />
              <div style="font-size: 12.5px; color: var(--clr-text-muted); flex: 1; min-width: 0;">
                <p id="edit-preview-filename" style="font-family: monospace; font-size: 12px; color: #e2e8f0; font-weight: 600; margin-bottom: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">-</p>
                <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; color: #34d399; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); padding: 5px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                  <span>🔄 Ganti File Foto</span>
                  <input type="file" id="edit-replace-file" accept="image/jpeg,image/png,image/webp" style="display: none;" />
                </label>
              </div>
            </div>

            <!-- Judul Foto -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Judul Foto / Label
              </label>
              <input
                type="text"
                id="edit-title-input"
                placeholder="Masukkan judul foto dokumentasi..."
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
              />
            </div>

            <!-- Deskripsi Foto -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Deskripsi / Keterangan Foto (Caption)
              </label>
              <textarea
                id="edit-caption-input"
                rows="2"
                placeholder="Deskripsi dokumentasi lapangan..."
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; resize: vertical; box-sizing: border-box;"
              ></textarea>
            </div>

            <!-- Two-Column: Kategori & Tanggal -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                  Kategori Foto
                </label>
                <select
                  id="edit-category-input"
                  style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
                >
                  <option value="Lanskap & Topografi">Lanskap & Topografi</option>
                  <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                  <option value="Bibit & Spesies">Bibit & Spesies</option>
                  <option value="Pertumbuhan Vegetasi">Pertumbuhan Vegetasi</option>
                  <option value="Pemantauan">Pemantauan</option>
                  <option value="Perawatan">Perawatan</option>
                  <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                  <option value="Fasilitas">Fasilitas</option>
                  <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                  Tanggal Dokumentasi
                </label>
                <input
                  type="date"
                  id="edit-date-input"
                  style="width: 100%; padding: 9px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
                />
              </div>
            </div>

            <!-- Checkbox panel -->
            <div style="padding: 12px 14px; background: rgba(0, 0, 0, 0.28); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; display: flex; flex-direction: column; gap: 8px;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                <input type="checkbox" id="edit-is-published" style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                <span>Publikasikan Foto di Galeri Publik</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                <input type="checkbox" id="edit-is-cover" style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                <span>Jadikan Foto Sampul Utama Kawasan</span>
              </label>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" id="btn-cancel-edit" class="btn-secondary-action btn-sm">Batal</button>
            <button type="submit" id="btn-submit-edit" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
              <span>💾</span> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;let n=document.getElementById(`admin-gallery-cat-filter`),r=document.getElementById(`admin-gallery-status-filter`),i=document.getElementById(`admin-gallery-search`);n&&n.addEventListener(`change`,e=>{ul=e.target.value,vl()}),r&&r.addEventListener(`change`,e=>{fl=e.target.value,vl()}),i&&i.addEventListener(`input`,e=>{dl=e.target.value.toLowerCase().trim(),vl()}),Cl(),El(),_l()}async function _l(){let e=document.getElementById(`admin-gallery-grid`);if(e&&cl)try{ll=(await H.getZonePhotos(cl.id)).photos||[],vl()}catch(t){console.error(`Failed to load zone photos:`,t),e.innerHTML=`
      <div class="p-6 text-center text-xs text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
        Gagal memuat foto kawasan: ${kl(t.message)}
      </div>
    `}}function vl(){let e=document.getElementById(`admin-gallery-grid`);if(!e)return;let t=ll.filter(e=>{if(ul!==`all`&&e.category!==ul||fl===`published`&&!e.is_published||fl===`draft`&&e.is_published)return!1;if(dl){let t=(e.title||``).toLowerCase().includes(dl),n=(e.caption||``).toLowerCase().includes(dl);if(!t&&!n)return!1}return!0});if(t.length===0){e.innerHTML=`
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
    `;let t=document.getElementById(`btn-empty-upload`);t&&t.addEventListener(`click`,wl)}else e.innerHTML=`
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${t.map(e=>{let t=e.file_url||e.file_path,n=e.file_size?`${Math.round(e.file_size/1024)} KB`:`-`,r=U(e.documented_at);return`
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition shadow-lg">
            <div class="relative aspect-4/3 bg-slate-950 overflow-hidden group">
              <img
                src="${t}"
                alt="${kl(e.alt_text||e.title)}"
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
                  🏷️ ${kl(e.category||`Kondisi Kawasan`)}
                </span>
              </div>
            </div>

            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h5 class="text-xs font-bold text-white line-clamp-1" title="${kl(e.title||`-`)}">
                  ${kl(e.title||`Foto Tanpa Judul`)}
                </h5>
                ${e.caption?`
                  <p class="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug" title="${kl(e.caption)}">
                    ${kl(e.caption)}
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
  `,e.querySelectorAll(`.btn-set-cover`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);try{e.textContent=`Menyimpan...`,e.disabled=!0,await H.setZoneCoverPhoto(cl.id,t),s.updated(`Foto berhasil ditetapkan sebagai sampul kawasan.`),await _l()}catch(e){s.error(`✕ Gagal menetapkan foto sampul`,e.message)}finally{e.disabled=!1,e.textContent=`⭐ Jadikan Sampul`}})}),e.querySelectorAll(`.btn-edit-photo`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-id`),10),n=ll.find(e=>e.id===t);n&&Dl(n)})}),e.querySelectorAll(`.btn-delete-photo`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=ll.find(e=>String(e.id)===String(t));if(await V.confirm({title:`Hapus Foto Dokumentasi?`,subtitle:n?.caption||`Dokumentasi Kawasan`,message:`Apakah Anda yakin ingin menghapus foto dokumentasi ini dari kawasan? File foto dan catatan terkait akan dihapus secara permanen.`,type:`danger`,confirmText:`Ya, Hapus Foto`,cancelText:`Batal`,icon:`🗑️`}))try{await H.deleteZonePhoto(cl.id,t),s.deleted(`Foto dokumentasi kawasan berhasil dihapus.`),await _l()}catch(e){s.error(`✕ Gagal menghapus foto`,e.message)}})})}function yl(){let e=document.getElementById(`upload-live-path-preview`);if(!e)return;let t=document.getElementById(`upload-category-input`),n=ml(t?t.value:`Kondisi Kawasan`)||`kondisi-kawasan`,r=cl?.id||`KW-01`,i=`foto-dokumentasi`;q.length>0&&(i=ml((pl>=0&&pl<q.length?q[pl]:q[0]).title)||`foto-kawasan`);let a=new Date,o=a.getFullYear().toString()+String(a.getMonth()+1).padStart(2,`0`)+String(a.getDate()).padStart(2,`0`)+`_`+String(a.getHours()).padStart(2,`0`)+String(a.getMinutes()).padStart(2,`0`);e.textContent=`/storage/zones/${r}/photos/${n}/${i}_${o}_xxxxxx.jpg`}function bl(){let e=document.getElementById(`upload-staged-container`),t=document.getElementById(`upload-staged-list`),n=document.getElementById(`upload-staged-count-num`),r=document.getElementById(`upload-dropzone-counter`),i=document.getElementById(`upload-submit-btn-text`);if(!e||!t)return;let a=q.length;n&&(n.textContent=a),r&&(r.textContent=a>0?`${a} berkas dipilih`:`0 berkas dipilih`),i&&(i.textContent=a>0?`Unggah ${a} Foto`:`Mulai Unggah`),a===0?(e.classList.add(`hidden`),t.innerHTML=``):(e.classList.remove(`hidden`),t.innerHTML=q.map((e,t)=>{let n=t===pl;return`
      <div class="staged-card" data-index="${t}" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: rgba(15, 23, 42, 0.7); border: 1px solid ${n?`rgba(16, 185, 129, 0.6)`:`rgba(255, 255, 255, 0.1)`}; border-radius: 10px; transition: all 0.2s ease;">
        <img src="${e.previewUrl}" alt="Preview" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; flex-shrink: 0; border: 1px solid rgba(255, 255, 255, 0.15);" />
        
        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${kl(e.file.name)}">
              📄 ${kl(e.file.name)} (${hl(e.file.size)})
            </span>
            <span style="font-size: 10px; font-family: monospace; color: #34d399; background: rgba(16, 185, 129, 0.12); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.25);">
              #${t+1}
            </span>
          </div>

          <div style="position: relative;">
            <input
              type="text"
              class="staged-title-input"
              data-index="${t}"
              value="${kl(e.title)}"
              placeholder="Judul / Label Foto (otomatis jadi nama berkas)"
              style="width: 100%; padding: 6px 10px; background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 6px; color: #ffffff; font-size: 12px; outline: none; box-sizing: border-box;"
            />
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0;">
          <button
            type="button"
            class="staged-cover-btn"
            data-index="${t}"
            style="padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 4px; ${n?`background: #10b981; color: #022c22; border: 1px solid #34d399;`:`background: rgba(255, 255, 255, 0.06); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.12);`}"
            title="${n?`Foto ini terpilih sebagai sampul utama kawasan`:`Pilih foto ini sebagai sampul kawasan`}"
          >
            ${n?`★ Sampul`:`☆ Sampul`}
          </button>
          <button
            type="button"
            class="staged-remove-btn"
            data-index="${t}"
            title="Hapus foto dari antrean unggah"
            style="color: #f87171; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 2px 7px; font-size: 11.5px; cursor: pointer;"
          >
            ✕
          </button>
        </div>
      </div>
    `}).join(``),t.querySelectorAll(`.staged-title-input`).forEach(e=>{e.addEventListener(`input`,e=>{let t=parseInt(e.target.getAttribute(`data-index`),10);!isNaN(t)&&q[t]&&(q[t].title=e.target.value,yl())})}),t.querySelectorAll(`.staged-cover-btn`).forEach(e=>{e.addEventListener(`click`,t=>{let n=parseInt(e.getAttribute(`data-index`),10);if(!isNaN(n)){pl=n;let e=document.getElementById(`upload-is-cover`);e&&(e.checked=!0),bl(),yl()}})}),t.querySelectorAll(`.staged-remove-btn`).forEach(e=>{e.addEventListener(`click`,t=>{let n=parseInt(e.getAttribute(`data-index`),10);!isNaN(n)&&q[n]&&(q[n].previewUrl&&URL.revokeObjectURL(q[n].previewUrl),q.splice(n,1),pl>=q.length&&(pl=Math.max(0,q.length-1)),bl(),yl())})}))}function xl(e){if(!e||e.length===0)return;let t=[`image/jpeg`,`image/png`,`image/webp`];Array.from(e).forEach(e=>{let n=e.name.split(`.`).pop().toLowerCase();if(!(t.includes(e.type)||[`jpg`,`jpeg`,`png`,`webp`].includes(n))){s.error(`Berkas Ditolak`,`${e.name} bukan format gambar JPG, PNG, atau WebP.`);return}if(e.size>5242880){s.error(`Ukuran Terlalu Besar`,`${e.name} melebihi batas 5 MB.`);return}let r=(e.name.substring(0,e.name.lastIndexOf(`.`))||e.name).replace(/[-_]+/g,` `).trim();q.push({file:e,title:r,previewUrl:URL.createObjectURL(e)})}),q.length>0&&(pl<0||pl>=q.length)&&(pl=0),bl(),yl()}function Sl(){q&&q.length>0&&q.forEach(e=>{e.previewUrl&&URL.revokeObjectURL(e.previewUrl)}),q=[],pl=0;let e=document.getElementById(`upload-file-input`);e&&(e.value=``)}function Cl(){let e=document.getElementById(`btn-admin-upload-photos`),t=document.getElementById(`admin-upload-modal`),n=document.getElementById(`btn-close-upload-modal`),r=document.getElementById(`btn-cancel-upload`),i=document.getElementById(`admin-upload-form`),a=document.getElementById(`upload-file-input`),o=document.getElementById(`upload-dropzone`),c=document.getElementById(`upload-category-input`),l=document.getElementById(`btn-add-more-photos`),u=document.getElementById(`btn-clear-staged-photos`);e&&e.addEventListener(`click`,wl),n&&n.addEventListener(`click`,Tl),r&&r.addEventListener(`click`,Tl),t&&t.addEventListener(`click`,e=>{e.target===t&&Tl()}),a&&a.addEventListener(`change`,e=>{e.target.files&&e.target.files.length>0&&(xl(e.target.files),a.value=``)}),o&&([`dragenter`,`dragover`].forEach(e=>{o.addEventListener(e,e=>{e.preventDefault(),e.stopPropagation(),o.style.borderColor=`#10b981`,o.style.background=`rgba(16, 185, 129, 0.14)`})}),[`dragleave`,`drop`].forEach(e=>{o.addEventListener(e,e=>{e.preventDefault(),e.stopPropagation(),o.style.borderColor=`rgba(16, 185, 129, 0.4)`,o.style.background=`rgba(16, 185, 129, 0.05)`})}),o.addEventListener(`drop`,e=>{let t=e.dataTransfer;t&&t.files&&t.files.length>0&&xl(t.files)})),l&&a&&l.addEventListener(`click`,()=>{a.click()}),u&&u.addEventListener(`click`,()=>{Sl(),bl(),yl()}),c&&c.addEventListener(`change`,()=>{yl()}),i&&i.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`admin-upload-error`),n=document.getElementById(`btn-submit-upload`),r=document.getElementById(`upload-submit-btn-text`);if(t&&t.classList.add(`hidden`),q.length===0){t&&(t.textContent=`Pilih setidaknya satu file foto untuk diunggah.`,t.classList.remove(`hidden`));return}let a=new FormData;q.forEach(e=>{a.append(`photos[]`,e.file),a.append(`titles[]`,(e.title||``).trim())}),a.append(`category`,c?c.value:`Kondisi Kawasan`);let o=document.getElementById(`upload-is-cover`)?.checked;o&&pl>=0&&pl<q.length?(a.append(`cover_index`,String(pl)),a.append(`is_cover`,`1`)):a.append(`is_cover`,o?`1`:`0`);let l=document.getElementById(`upload-caption-input`)?.value.trim()||``;l&&a.append(`caption`,l);let u=Fc(document.getElementById(`upload-date-input`)?.value);u&&a.append(`documented_at`,u),a.append(`is_published`,document.getElementById(`upload-is-published`)?.checked?`1`:`0`),n.disabled=!0,r&&(r.textContent=`Mengunggah ${q.length} Foto...`);try{let e=await H.uploadZonePhotos(cl.id,a);Tl(),i.reset(),s.uploaded(e?.message||`${q.length} foto kawasan berhasil diunggah.`),await _l()}catch(e){t&&(t.textContent=e.message||`Gagal mengunggah foto.`,t.classList.remove(`hidden`)),s.error(`✕ Gagal mengunggah foto`,e.message||`Periksa file foto dan coba lagi.`)}finally{n.disabled=!1,r&&(r.textContent=`Mulai Unggah`)}})}function wl(){Sl();let e=document.getElementById(`admin-upload-modal`),t=document.getElementById(`upload-date-input`);t&&!t.value&&(t.value=new Date().toISOString().substring(0,10)),bl(),yl(),e&&e.classList.remove(`hidden`)}function Tl(){Sl();let e=document.getElementById(`admin-upload-modal`);e&&e.classList.add(`hidden`)}function El(){let e=document.getElementById(`admin-edit-photo-modal`),t=document.getElementById(`btn-close-edit-modal`),n=document.getElementById(`btn-cancel-edit`),r=document.getElementById(`admin-edit-photo-form`),i=document.getElementById(`edit-replace-file`);t&&t.addEventListener(`click`,Ol),n&&n.addEventListener(`click`,Ol),e&&e.addEventListener(`click`,t=>{t.target===e&&Ol()}),i&&i.addEventListener(`change`,e=>{let t=e.target.files[0];if(t){let e=document.getElementById(`edit-preview-img`),n=document.getElementById(`edit-preview-filename`);e&&(e.src=URL.createObjectURL(t)),n&&(n.textContent=`File Baru: ${t.name}`)}}),r&&r.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-photo-id`).value,n=document.getElementById(`btn-submit-edit`),r=document.getElementById(`admin-edit-error`);r&&r.classList.add(`hidden`);let a=new FormData;a.append(`title`,document.getElementById(`edit-title-input`).value.trim()),a.append(`caption`,document.getElementById(`edit-caption-input`).value.trim()),a.append(`category`,document.getElementById(`edit-category-input`).value);let o=Fc(document.getElementById(`edit-date-input`).value);o&&a.append(`documented_at`,o),a.append(`is_published`,document.getElementById(`edit-is-published`).checked?`1`:`0`),a.append(`is_cover`,document.getElementById(`edit-is-cover`).checked?`1`:`0`),i&&i.files.length>0&&a.append(`photo`,i.files[0]),n.disabled=!0,n.textContent=`Menyimpan...`;try{let e=await H.updateZonePhoto(cl.id,t,a);Ol(),s.updated(e?.message||`Metadata foto kawasan berhasil diperbarui.`),await _l()}catch(e){r&&(r.textContent=e.message||`Gagal memperbarui metadata foto.`,r.classList.remove(`hidden`)),s.error(`✕ Gagal memperbarui foto`,e.message)}finally{n.disabled=!1,n.textContent=`Simpan Perubahan`}})}function Dl(e){let t=document.getElementById(`admin-edit-photo-modal`);if(!t)return;document.getElementById(`edit-photo-id`).value=e.id,document.getElementById(`edit-title-input`).value=e.title||``,document.getElementById(`edit-caption-input`).value=e.caption||``,document.getElementById(`edit-category-input`).value=e.category||`Kondisi Kawasan`,document.getElementById(`edit-date-input`).value=Pc(e.documented_at),document.getElementById(`edit-is-published`).checked=!!e.is_published,document.getElementById(`edit-is-cover`).checked=!!e.is_cover;let n=document.getElementById(`edit-preview-img`),r=document.getElementById(`edit-preview-filename`);n&&(n.src=e.file_url||e.file_path),r&&(r.textContent=e.title||`Foto #${e.id}`);let i=document.getElementById(`edit-replace-file`);i&&(i.value=``);let a=document.getElementById(`admin-edit-error`);a&&a.classList.add(`hidden`),t.classList.remove(`hidden`)}function Ol(){let e=document.getElementById(`admin-edit-photo-modal`);e&&e.classList.add(`hidden`)}function kl(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Al=[],jl=null,Ml=localStorage.getItem(`ecoland_zone_view_mode`)||`table`;async function Nl(e,t=null,n=!0,r=`tab-ringkasan`){if(t&&(jl=t),n){let n=`#admin/zones`;if(e===`create`?n=`#admin/zones/create`:e===`edit`&&t?n=`#admin/zones/${t}/edit`:e===`detail`&&t?n=`#admin/zones/${t}/detail`:e===`gallery`&&(n=`#admin/zones/gallery`),window.location.hash!==n){window.location.hash=n;return}}let i=document.getElementById(`admin-zones-content`);i&&(document.getElementById(`zone-pane-container`)||Pl(i),i.querySelectorAll(`.zone-nav-tab`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-zone-tab`)===e)}),e===`list`?Al.length===0?await Fl():Il():e===`create`?await Vl(null,null):e===`edit`?await Vl(null,jl):e===`detail`&&jl?await Hl(jl,r):e===`gallery`&&(Al.length===0&&await Fl(),Zl()))}function Pl(e){e.innerHTML=`
    <!-- Top Hero Banner -->
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">🏞️</span>
          <span>Manajemen Kawasan / Lahan Penanaman</span>
        </h2>
        <p class="zones-hero-desc">
          Kelola data kawasan restorasi, pemetaan spasial polygon batas lahan, target bibit pohon, dan album dokumentasi foto.
        </p>
      </div>
      <div style="display: flex; gap: 10px; align-items: center; z-index: 2;">
        <button id="btn-zone-open-gallery" class="zone-nav-tab" data-zone-tab="gallery" style="display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; font-weight: 600; cursor: pointer; border: 1px solid var(--clr-border); background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-sm); color: var(--clr-text-muted);">
          <span>🖼️</span> Galeri Foto Dokumentasi
        </button>
        <button id="btn-zone-add-new" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; font-weight: 600; cursor: pointer;">
          <span>➕</span> Tambah Kawasan Baru
        </button>
      </div>
    </div>

    <!-- Dynamic Container -->
    <div id="zone-pane-container" style="min-height: 420px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;">
        <span class="loading-spinner"></span> Memuat data kawasan...
      </div>
    </div>
  `,e.querySelectorAll(`.zone-nav-tab`).forEach(e=>{e.addEventListener(`click`,()=>{Nl(e.getAttribute(`data-zone-tab`))})});let t=e.querySelector(`#btn-zone-add-new`);t&&t.addEventListener(`click`,()=>{Nl(`create`)})}async function Fl(){let e=document.getElementById(`zone-pane-container`);if(e)try{Al=(await H.getZones({sort_by:`created_at`,sort_dir:`asc`,archived:`all`})).zones||[],Il()}catch(t){e.innerHTML=`
      <div class="alert-error" style="padding: 18px 22px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #fca5a5; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div>
          <strong>❌ Gagal memuat data kawasan:</strong> ${J(t.message)}
        </div>
        <button id="btn-retry-zones" class="btn-secondary-action btn-sm" style="cursor: pointer;">🔄 Coba Lagi</button>
      </div>
    `;let n=document.getElementById(`btn-retry-zones`);n&&n.addEventListener(`click`,Fl)}}function Il(){let e=document.getElementById(`zone-pane-container`);e&&(Al.length,e.innerHTML=`
    <!-- Zones Content Container (Table or Grid) -->
    <div id="zones-data-container">
      ${Ml===`table`?Rl(Al):zl(Al)}
    </div>
  `,Bl())}function Ll(e,t=!1){return t||e===`archived`||e===`arsip`?`<span class="badge-status-inactive" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); display: inline-flex; align-items: center; gap: 5px; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600;"><span style="width:6px;height:6px;border-radius:50%;background:#94a3b8;"></span> Arsip</span>`:{active:`<span class="badge-status-published"><span style="width:6px;height:6px;border-radius:50%;background:#10b981;"></span> Aktif</span>`,preparation:`<span class="badge-status-draft"><span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span> Persiapan</span>`,monitoring:`<span class="badge-status-monitoring"><span style="width:6px;height:6px;border-radius:50%;background:#38bdf8;"></span> Pemantauan</span>`,completed:`<span class="badge-status-completed"><span style="width:6px;height:6px;border-radius:50%;background:#9ca3af;"></span> Selesai</span>`,archived:`<span class="badge-status-inactive" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); display: inline-flex; align-items: center; gap: 5px; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600;"><span style="width:6px;height:6px;border-radius:50%;background:#94a3b8;"></span> Arsip</span>`}[e]||`<span class="badge-status-completed">${J(e)}</span>`}function Rl(e){return!e||e.length===0?`
      <div style="text-align: center; padding: 56px 20px; background: var(--clr-surface); border-radius: var(--radius-md); border: 1px dashed var(--clr-border);">
        <div style="font-size: 48px; margin-bottom: 14px;">🏞️</div>
        <h4 style="color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 8px;">Tidak Ada Kawasan Ditemukan</h4>
        <p style="color: var(--clr-text-muted); font-size: 13.5px; max-width: 480px; margin: 0 auto 20px; line-height: 1.5;">
          Tidak ada data kawasan penanaman yang sesuai dengan filter pencarian Anda, atau belum ada kawasan terdaftar.
        </p>
        <button id="btn-empty-add-zone" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
          <span>➕</span> Tambah Kawasan Baru
        </button>
      </div>
    `:`
    <div class="zones-table-box">
      <table class="zones-table">
        <thead>
          <tr>
            <th style="width: 100px;">Kode</th>
            <th>Nama Kawasan & Lokasi</th>
            <th style="width: 110px;">Luas Lahan</th>
            <th style="width: 90px; text-align: center;">Penanaman</th>
            <th style="width: 100px; text-align: center;">Bibit Awal</th>
            <th style="width: 90px; text-align: center;">Survival</th>
            <th style="width: 90px; text-align: center;">Panorama</th>
            <th style="width: 100px; text-align: center;">Status</th>
            <th style="width: 270px; text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(e=>{let t=Ll(e.status,e.is_archived),n=e.survival_rate!==null&&e.survival_rate!==void 0?parseFloat(e.survival_rate):null,r=n===null?`<span style="color: var(--clr-text-dim); font-size: 11px;">Belum cukup</span>`:`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <span style="font-weight: 700; color: ${n>=75?`#34d399`:`#fbbf24`};">${n}%</span>
          <div style="width: 48px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 99px; overflow: hidden;">
            <div style="width: ${Math.min(100,n)}%; height: 100%; background: ${n>=75?`#10b981`:`#f59e0b`};"></div>
          </div>
        </div>
      `;return`
      <tr data-zone-id="${e.id}">
        <!-- KODE -->
        <td>
          <span style="font-family: monospace; font-size: 12px; font-weight: 700; background: rgba(16,185,129,0.12); color: #34d399; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.25); white-space: nowrap;">
            ${J(e.zone_code)}
          </span>
        </td>

        <!-- NAMA KAWASAN & LOKASI -->
        <td>
          <div style="font-weight: 700; color: #ffffff; font-size: 14px; margin-bottom: 3px;">
            ${J(e.name)}
          </div>
        </td>

        <!-- LUAS LAHAN -->
        <td>
          <div style="font-weight: 700; color: #38bdf8; font-size: 13.5px;">
            ${(parseFloat(e.area_in_ha)||0).toFixed(2)} Ha
          </div>
          <div style="font-size: 11px; color: var(--clr-text-dim); margin-top: 1px;">
            ${e.area_size} ${e.area_unit}
          </div>
        </td>

        <!-- PENANAMAN -->
        <td style="text-align: center;">
          <div style="font-weight: 700; color: #ffffff; font-size: 13.5px;">${e.activities_count||0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">Kegiatan</div>
        </td>

        <!-- BIBIT AWAL -->
        <td style="text-align: center;">
          <div style="font-weight: 700; color: #fbbf24; font-size: 13.5px;">
            ${(e.total_initial_seedlings||0).toLocaleString(`id-ID`)}
          </div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">${e.species_count||0} jenis</div>
        </td>

        <!-- SURVIVAL -->
        <td style="text-align: center;">
          ${r}
        </td>

        <!-- PANORAMA 360 -->
        <td style="text-align: center;">
          <div style="font-weight: 700; color: #ffffff; font-size: 13.5px;">${e.scenes_count||0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">Scene 360°</div>
        </td>

        <!-- STATUS -->
        <td style="text-align: center;">
          ${t}
        </td>

        <!-- AKSI -->
        <td style="text-align: right; white-space: nowrap;">
          <div style="display: inline-flex; gap: 6px; align-items: center;">
            <button class="btn-action-detail zone-btn-action detail" data-id="${e.id}" title="Buka Detail Kawasan (8 Tab)">
              <span>🔍</span> Detail
            </button>
            <button class="btn-action-edit zone-btn-action edit" data-id="${e.id}" title="Edit Data Kawasan">
              <span>✏️</span> Edit
            </button>
            <button class="btn-action-archive zone-btn-action archive" data-id="${e.id}" title="${e.is_archived?`Aktifkan Kembali`:`Arsipkan Kawasan`}">
              <span>${e.is_archived?`♻️`:`📦`}</span> ${e.is_archived?`Pulihkan`:`Arsip`}
            </button>
            <button class="btn-action-delete zone-btn-action delete" data-id="${e.id}" title="Hapus Kawasan">
              <span>🗑️</span> Hapus
            </button>
          </div>
        </td>
      </tr>
    `}).join(``)}
        </tbody>
      </table>
    </div>
  `}function zl(e){return!e||e.length===0?Rl(e):`
    <div class="zones-cards-grid">
      ${e.map(e=>{let t=Ll(e.status,e.is_archived),n=e.survival_rate!==null&&e.survival_rate!==void 0?parseFloat(e.survival_rate):null,r=e.main_photo_path||null;return`
      <div class="zone-grid-card" data-zone-id="${e.id}">
        <!-- Cover Banner -->
        <div class="zone-card-cover">
          ${r?`
            <img src="${r}" alt="${J(e.name)}" onerror="this.onerror=null; this.src='/favicon.svg';" />
          `:`
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(12,20,16,0.95) 100%);">
              <span style="font-size: 42px; margin-bottom: 4px;">🏞️</span>
              <span style="font-size: 11px; color: var(--clr-text-muted);">Foto Dokumentasi Belum Diunggah</span>
            </div>
          `}
          <div style="position: absolute; top: 12px; left: 12px; z-index: 2;">
            <span style="font-family: monospace; font-size: 11.5px; font-weight: 700; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); color: #34d399; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.35);">
              ${J(e.zone_code)}
            </span>
          </div>
          <div style="position: absolute; top: 12px; right: 12px; z-index: 2;">
            ${t}
          </div>
        </div>

        <!-- Card Body -->
        <div class="zone-card-body">
          <div>
            <h4 style="color: #ffffff; font-size: 16px; font-weight: 800; margin: 4px 0 6px; line-height: 1.3;">
              ${J(e.name)}
            </h4>
          </div>

          <!-- Mini Stats Grid -->
          <div class="zone-card-stats">
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Luas Lahan</span>
              <span class="zone-card-stat-val" style="color: #38bdf8;">${(parseFloat(e.area_in_ha)||0).toFixed(2)} Ha</span>
            </div>
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Bibit Awal</span>
              <span class="zone-card-stat-val" style="color: #fbbf24;">${(e.total_initial_seedlings||0).toLocaleString(`id-ID`)}</span>
            </div>
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Kegiatan</span>
              <span class="zone-card-stat-val">${e.activities_count||0} Batch</span>
            </div>
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Survival</span>
              <span class="zone-card-stat-val" style="color: ${n!==null&&n>=75?`#34d399`:`#c084fc`};">
                ${n===null?`Belum Sensus`:`${n}%`}
              </span>
            </div>
          </div>

          <!-- Card Actions Footer -->
          <div style="display: flex; gap: 6px; align-items: center; justify-content: space-between; border-top: 1px solid var(--clr-border-subtle); padding-top: 14px; margin-top: 6px; flex-wrap: wrap;">
            <div style="display: flex; gap: 6px;">
              <button class="btn-action-detail zone-btn-action detail" data-id="${e.id}" title="Detail Kawasan">
                <span>🔍</span> Detail
              </button>
              <button class="btn-action-edit zone-btn-action edit" data-id="${e.id}" title="Edit Kawasan">
                <span>✏️</span> Edit
              </button>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn-action-archive zone-btn-action archive" data-id="${e.id}" title="${e.is_archived?`Pulihkan`:`Arsipkan`}">
                <span>${e.is_archived?`♻️`:`📦`}</span>
              </button>
              <button class="btn-action-delete zone-btn-action delete" data-id="${e.id}" title="Hapus Kawasan">
                <span>🗑️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `}).join(``)}
    </div>
  `}function Bl(){let e=document.getElementById(`zone-pane-container`);if(!e)return;let t=e.querySelector(`.zones-table-box`);t&&(t.scrollLeft=0);let n=e.querySelector(`#btn-empty-add-zone`);n&&n.addEventListener(`click`,()=>Nl(`create`)),e.querySelectorAll(`.btn-action-detail`).forEach(e=>{e.addEventListener(`click`,()=>{Nl(`detail`,e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-action-edit`).forEach(e=>{e.addEventListener(`click`,()=>{Nl(`edit`,e.getAttribute(`data-id`))})}),e.querySelectorAll(`.btn-action-tour`).forEach(e=>{e.addEventListener(`click`,()=>{e.getAttribute(`data-id`),window.location.hash=`tour`})}),e.querySelectorAll(`.btn-action-archive`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=Al.find(e=>String(e.id)===String(t)),r=!n||!n.is_archived;if(await V.confirm({title:r?`Arsipkan Kawasan?`:`Pulihkan Kawasan?`,subtitle:n?n.name:`Status Kawasan`,message:r?`Apakah Anda yakin ingin mengarsipkan kawasan <strong>"${J(n?.name||``)}"</strong>?<br><br>Kawasan yang diarsipkan akan disembunyikan dari daftar publik namun datanya tetap tersimpan aman.`:`Apakah Anda yakin ingin mengaktifkan kembali kawasan <strong>"${J(n?.name||``)}"</strong>?`,type:r?`warning`:`info`,confirmText:r?`Ya, Arsipkan`:`Ya, Pulihkan`,icon:r?`📦`:`♻️`}))try{let e=await H.archiveZone(t);window.dispatchEvent(new CustomEvent(`zones-updated`)),s.show({type:`success`,title:e.action===`archived`?`✓ Berhasil diarsipkan`:`✓ Berhasil dipulihkan`,message:e.message||`Status kawasan berhasil diperbarui.`}),await Fl()}catch(e){s.error(`✕ Gagal mengubah status arsip`,e.message)}})}),e.querySelectorAll(`.btn-action-delete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=Al.find(e=>String(e.id)===String(t));if(n){let e=[];if(n.photos_count>0&&e.push(`${n.photos_count} Foto Galeri`),n.activities_count>0&&e.push(`${n.activities_count} Kegiatan Penanaman`),n.surveys_count>0&&e.push(`${n.surveys_count} Data Pemantauan / Survei`),n.scenes_count>0&&e.push(`${n.scenes_count} Scene Panorama`),e.length>0){await V.alert({title:`Kawasan Tidak Dapat Dihapus`,subtitle:`Data Terkait Masih Aktif`,message:`Kawasan <strong>"${J(n.name)}"</strong> masih memiliki link data terkait:<br><ul style="margin: 8px 0 12px 18px; padding: 0;">${e.map(e=>`<li><strong>${e}</strong></li>`).join(``)}</ul>Harap hapus atau lepaskan link data tersebut terlebih dahulu sebelum menghapus kawasan ini.`,type:`warning`,confirmText:`Saya Mengerti`,icon:`⚠️`});return}}if(await V.confirm({title:`Hapus Kawasan Permanen?`,subtitle:n?n.name:`Tindakan Permanen`,message:`Apakah Anda yakin ingin menghapus kawasan <strong>"${J(n?.name||``)}"</strong> secara permanen?<br><br>Kawasan ini tidak memiliki link data terkait dan akan langsung dihapus dari sistem. Tindakan ini tidak dapat dibatalkan.`,type:`danger`,confirmText:`Ya, Hapus Permanen`,cancelText:`Batal`,icon:`🗑️`}))try{let e=await H.deleteZone(t);window.dispatchEvent(new CustomEvent(`zones-updated`)),s.show({type:`success`,title:`✓ Berhasil dihapus`,message:e.message||`Kawasan berhasil dihapus.`}),await Fl()}catch(e){s.error(`✕ Tidak Dapat Menghapus Kawasan`,e.message)}})})}async function Vl(e=null,t=null){let n=document.getElementById(`zone-pane-container`);if(!n)return;if(!e&&t){n.innerHTML=`
      <div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;">
        <span class="loading-spinner"></span> Memuat data kawasan untuk disunting...
      </div>
    `;try{let n=Al.find(e=>String(e.id)===String(t)||e.zone_code===t);if(n)e=(await H.getZone(n.id)).zone||n;else{let n=await H.getZone(t);if(n&&n.zone)e=n.zone;else throw Error(`Data kawasan tidak ditemukan di server.`)}}catch(e){n.innerHTML=`
        <div class="zone-form-card" style="text-align: center; padding: 48px 24px; border-radius: 12px; background: var(--clr-surface); border: 1px solid var(--clr-border);">
          <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
          <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 8px;">Kawasan Tidak Ditemukan</h3>
          <p style="color: var(--clr-text-muted); font-size: 13px; max-width: 480px; margin: 0 auto 20px; line-height: 1.5;">
            ${J(e.message||`Kawasan penanaman dengan ID atau kode tersebut tidak ditemukan atau telah dihapus.`)}
          </p>
          <button id="btn-err-back-to-zones" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>←</span> Kembali ke Daftar Kawasan
          </button>
        </div>
      `,document.getElementById(`btn-err-back-to-zones`)?.addEventListener(`click`,()=>{Nl(`list`)});return}}let r=!!e,i=r?`Edit Kawasan: ${e.name}`:`Tambah Kawasan / Lahan Baru`,a=!1;n.innerHTML=`
    <div class="zone-form-card">
      <!-- Breadcrumb Nav Inside Form -->
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 16px;">
        <button id="breadcrumb-btn-zones-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">
          ← Kembali ke Semua Kawasan
        </button>
        <span>/</span>
        <span style="color: #38bdf8; font-weight: 600;">${r?`Sunting Data Kawasan`:`Formulir Kawasan Baru`}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--clr-border); padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <h3 style="color: #fff; margin: 0; font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
          <span>${r?`✏️`:`➕`}</span> <span>${i}</span>
        </h3>
        <button id="btn-cancel-zone-form" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
          <span>←</span> Kembali ke Daftar
        </button>
      </div>

      <form id="zone-edit-form">
        <input type="hidden" id="form-zone-id" value="${e?e.id:``}" />

        <!-- BAGIAN 1: INFORMASI DASAR -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">1</span>
            <span>Informasi Dasar Kawasan</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="form-zone-code" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Kode Kawasan (Unik): <span style="color: var(--clr-danger);">*</span>
              </label>
              <input type="text" id="form-zone-code" class="form-input" required placeholder="Contoh: KW-ACEH-02" value="${e?e.zone_code:``}" />
              <small style="color: var(--clr-text-dim); font-size: 11px; display: block; margin-top: 4px;">Kode unik sebagai pengenal permanen dalam sistem.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-name" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Nama Kawasan: <span style="color: var(--clr-danger);">*</span>
              </label>
              <input type="text" id="form-zone-name" class="form-input" required placeholder="Nama lengkap kawasan penanaman" value="${e?J(e.name):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-category" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Kategori Kawasan:
              </label>
              <input type="text" id="form-zone-category" class="form-input" placeholder="e.g. Silvikultur, Konservasi Pesisir, Arboretum" value="${e?J(e.category||``):`Silvikultur & Konservasi`}" />
            </div>
            <div class="form-group">
              <label for="form-zone-status" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Status Kawasan: <span style="color: var(--clr-danger);">*</span>
              </label>
              <select id="form-zone-status" class="form-select" required>
                <option value="preparation" ${e&&e.status===`preparation`?`selected`:``}>Persiapan Lahan</option>
                <option value="active" ${!e||e.status===`active`?`selected`:``}>Aktif Penanaman</option>
                <option value="monitoring" ${e&&e.status===`monitoring`?`selected`:``}>Pemantauan</option>
                <option value="completed" ${e&&e.status===`completed`?`selected`:``}>Selesai / Mandiri</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-purpose" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
              Tujuan Penanaman:
            </label>
            <input type="text" id="form-zone-purpose" class="form-input" placeholder="Tujuan utama program penanaman pada kawasan ini" value="${e?J(e.planting_purpose||``):``}" />
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-desc" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
              Deskripsi Kawasan:
            </label>
            <textarea id="form-zone-desc" class="form-input" rows="3" placeholder="Uraian gambaran umum kawasan, vegetasi, dan karakteristik ekosistem">${e?J(e.description||``):``}</textarea>
          </div>
        </div>

        <!-- BAGIAN 2: INFORMASI LOKASI -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">2</span>
            <span>Informasi Lokasi Deskriptif & Titik Referensi</span>
          </div>
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="form-zone-address" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
              Alamat / Keterangan Lokasi:
            </label>
            <input type="text" id="form-zone-address" class="form-input" placeholder="Jalan, blok, atau patokan lokasi deskriptif" value="${e?J(e.address||``):``}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-village" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Desa / Gampong:</label>
              <input type="text" id="form-zone-village" class="form-input" placeholder="Gampong" value="${e?J(e.village||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-district" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Kecamatan:</label>
              <input type="text" id="form-zone-district" class="form-input" placeholder="Kecamatan" value="${e?J(e.district||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-city" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Kabupaten / Kota:</label>
              <input type="text" id="form-zone-city" class="form-input" placeholder="Kabupaten" value="${e?J(e.city||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-province" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Provinsi:</label>
              <input type="text" id="form-zone-province" class="form-input" placeholder="Provinsi" value="${e?J(e.province||``):`Aceh`}" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;">
            <div class="form-group">
              <label for="form-zone-lat" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Latitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lat" class="form-input" placeholder="Contoh: 5.4818556" value="${e&&e.latitude?e.latitude:``}" />
              <small style="color: var(--clr-text-dim); font-size: 11px; display: block; margin-top: 4px;">Titik koordinat referensi patok, bukan poligon GPS.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-lng" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Longitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lng" class="form-input" placeholder="Contoh: 95.5840917" value="${e&&e.longitude?e.longitude:``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-access" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Catatan Akses Lapangan:</label>
              <input type="text" id="form-zone-access" class="form-input" placeholder="Akses kendaraan, jalan setapak, rute masuk" value="${e?J(e.access_notes||``):``}" />
            </div>
          </div>
        </div>

        <!-- BAGIAN 3: INFORMASI LAHAN & LUASAN -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">3</span>
            <span>Informasi Lahan & Luasan (Input Manual Bebas Poligon)</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-area-size" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Luas Lahan: <span style="color: var(--clr-danger);">*</span>
              </label>
              <input type="number" step="0.01" min="0" id="form-zone-area-size" class="form-input" required placeholder="Contoh: 2.00" value="${e?e.area_size:``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-area-unit" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Satuan Luas: <span style="color: var(--clr-danger);">*</span>
              </label>
              <select id="form-zone-area-unit" class="form-select" required>
                <option value="ha" ${!e||e.area_unit===`ha`?`selected`:``}>Hektare (ha)</option>
                <option value="m2" ${e&&e.area_unit===`m2`?`selected`:``}>Meter Persegi (m²)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="form-zone-meas-method" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Metode Pengukuran Luas:</label>
              <input type="text" id="form-zone-meas-method" class="form-input" placeholder="e.g. Survei Patok Batas, Data Deskriptif" value="${e?J(e.measurement_method||``):`Survei Patok Lapangan Deskriptif`}" />
            </div>
            <div class="form-group">
              <label for="form-zone-meas-date" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Tanggal Pengukuran:</label>
              <input type="date" id="form-zone-meas-date" class="form-input" value="${e&&e.measurement_date?Pc(e.measurement_date):``}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-land-notes" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Catatan Kondisi Lahan & Tanah:</label>
            <textarea id="form-zone-land-notes" class="form-input" rows="2" placeholder="Kondisi topografi, jenis tanah, kemiringan lereng, vegetasi awal">${e?J(e.land_condition_notes||``):``}</textarea>
          </div>
        </div>

        <!-- BAGIAN 4: PENGELOLAAN & PUBLIKASI -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">4</span>
            <span>Pengelolaan, Target & Publikasi</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-pic" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Penanggung Jawab / Koordinator:</label>
              <input type="text" id="form-zone-pic" class="form-input" placeholder="Nama koordinator lapangan" value="${e?J(e.person_in_charge||``):``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-org" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Organisasi / Lembaga Mitra:</label>
              <input type="text" id="form-zone-org" class="form-input" placeholder="IKHW / Mitra" value="${e?J(e.organization||``):`IKHW Aceh`}" />
            </div>
            <div class="form-group">
              <label for="form-zone-target" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Target Penanaman (Batang):</label>
              <input type="number" min="0" id="form-zone-target" class="form-input" placeholder="e.g. 1000" value="${e&&e.planting_target?e.planting_target:``}" />
            </div>
            <div class="form-group">
              <label for="form-zone-start-date" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Tanggal Mulai Program:</label>
              <input type="date" id="form-zone-start-date" class="form-input" value="${e&&e.start_date?Pc(e.start_date):``}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-internal-notes" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Catatan Internal (Tidak Tampil ke Publik):</label>
            <textarea id="form-zone-internal-notes" class="form-input" rows="2" placeholder="Catatan internal pengelola">${e?J(e.internal_notes||``):``}</textarea>
          </div>

          <div style="display: flex; gap: 20px; align-items: center; margin-top: 16px; padding: 12px; background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.2);">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #fff; font-size: 13px; font-weight: 500;">
              <input type="checkbox" id="form-zone-published" style="width: 16px; height: 16px; accent-color: var(--clr-primary);" ${!e||e.is_published?`checked`:``} />
              <span>Publikasikan kawasan ini ke halaman publik dan navigasi Virtual Tour</span>
            </label>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--clr-border); padding-top: 20px;">
          <button type="button" id="btn-cancel-form" class="btn-secondary-action" style="cursor: pointer;">Batal</button>
          <button type="submit" id="btn-submit-zone" class="btn-primary-action" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>💾</span> <span>${r?`Simpan Perubahan`:`Tambahkan Kawasan`}</span>
          </button>
        </div>
      </form>
    </div>
  `;let o=()=>{a=!0};n.querySelectorAll(`input, select, textarea`).forEach(e=>{e.addEventListener(`input`,o),e.addEventListener(`change`,o)});let c=async()=>{(!a||await V.confirm({title:`Batalkan Pengisian Formulir?`,subtitle:`Perubahan Belum Disimpan`,message:`Data yang telah Anda masukkan pada formulir kawasan akan hilang jika Anda meninggalkan halaman ini sekarang. Apakah Anda yakin?`,type:`warning`,confirmText:`Ya, Tinggalkan`,cancelText:`Tetap di Sini`,icon:`⚠️`}))&&Nl(`list`)};document.getElementById(`breadcrumb-btn-zones-list`)?.addEventListener(`click`,c),document.getElementById(`btn-cancel-zone-form`)?.addEventListener(`click`,c),document.getElementById(`btn-cancel-form`)?.addEventListener(`click`,c);let l=document.getElementById(`zone-edit-form`);l&&l.addEventListener(`submit`,async e=>{e.preventDefault();let t={zone_code:document.getElementById(`form-zone-code`).value.trim(),name:document.getElementById(`form-zone-name`).value.trim(),category:document.getElementById(`form-zone-category`).value.trim(),status:document.getElementById(`form-zone-status`).value,planting_purpose:document.getElementById(`form-zone-purpose`).value.trim(),description:document.getElementById(`form-zone-desc`).value.trim(),address:document.getElementById(`form-zone-address`).value.trim(),village:document.getElementById(`form-zone-village`).value.trim(),district:document.getElementById(`form-zone-district`).value.trim(),city:document.getElementById(`form-zone-city`).value.trim(),province:document.getElementById(`form-zone-province`).value.trim(),latitude:document.getElementById(`form-zone-lat`).value?parseFloat(document.getElementById(`form-zone-lat`).value):null,longitude:document.getElementById(`form-zone-lng`).value?parseFloat(document.getElementById(`form-zone-lng`).value):null,access_notes:document.getElementById(`form-zone-access`).value.trim(),area_size:parseFloat(document.getElementById(`form-zone-area-size`).value)||0,area_unit:document.getElementById(`form-zone-area-unit`).value,measurement_method:document.getElementById(`form-zone-meas-method`).value.trim(),measurement_date:Fc(document.getElementById(`form-zone-meas-date`).value),land_condition_notes:document.getElementById(`form-zone-land-notes`).value.trim(),person_in_charge:document.getElementById(`form-zone-pic`).value.trim(),organization:document.getElementById(`form-zone-org`).value.trim(),planting_target:document.getElementById(`form-zone-target`).value?parseInt(document.getElementById(`form-zone-target`).value):null,start_date:Fc(document.getElementById(`form-zone-start-date`).value),internal_notes:document.getElementById(`form-zone-internal-notes`).value.trim(),is_published:document.getElementById(`form-zone-published`).checked},n=document.getElementById(`form-zone-id`).value,r=!!n,i=document.getElementById(`btn-submit-zone`);i.disabled=!0,i.innerHTML=`<span>⏳</span> Menyimpan...`;try{let e=await H.saveZone(t,n||null);window.dispatchEvent(new CustomEvent(`zones-updated`)),r?s.updated(e.message||`Perubahan data kawasan berhasil disimpan.`):s.created(e.message||`Data kawasan baru berhasil disimpan.`),a=!1,await Fl(),Nl(`list`)}catch(e){s.error(`✕ Gagal menyimpan kawasan`,e.message||`Periksa kembali formulir kawasan dan coba lagi.`),i.disabled=!1,i.innerHTML=`<span>💾</span> <span>${r?`Simpan Perubahan`:`Tambahkan Kawasan`}</span>`}})}async function Hl(e,t=`tab-ringkasan`){let n=document.getElementById(`zone-pane-container`);if(n){n.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;">
      <span class="loading-spinner"></span> Memuat detail kawasan (8 Tab)...
    </div>
  `;try{Ul(await H.getZone(e),t)}catch(e){n.innerHTML=`
      <div class="alert-error" style="padding: 18px 22px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #fca5a5; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div>❌ Gagal memuat detail kawasan: ${J(e.message)}</div>
        <button id="btn-back-to-list" class="btn-secondary-action btn-sm" style="cursor: pointer;">← Kembali</button>
      </div>
    `;let t=document.getElementById(`btn-back-to-list`);t&&t.addEventListener(`click`,()=>Nl(`list`))}}}function Ul(e,t=`tab-ringkasan`){let n=document.getElementById(`zone-pane-container`);if(!n)return;let r=e.zone;e.summary,e.land_info;let i=document.getElementById(`tab-nav-zone-detail`);if(i&&(i.classList.remove(`hidden`),i.classList.add(`active`)),n.innerHTML=`
    <!-- Detail Header Card -->
    <div style="background: var(--clr-surface); padding: 22px 26px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-family: monospace; font-size: 13px; font-weight: 700; background: rgba(16,185,129,0.15); color: #34d399; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.3);">
              ${J(r.zone_code)}
            </span>
            <h2 style="margin: 0; color: #fff; font-size: 22px; font-weight: 800;">${J(r.name)}</h2>
            ${Ll(r.status,r.is_archived)}
          </div>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 8px 0 0; display: flex; align-items: center; gap: 6px;">
            <span>📍</span> ${J(r.address||(r.village?r.village+`, `+r.district:`Lokasi Terdaftar`))} • ${J(r.city||`Aceh`)}
          </p>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="btn-detail-edit-zone" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>✏️</span> Edit Kawasan
          </button>
          <button id="btn-detail-back-list" class="btn-text-btn btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>←</span> Daftar Kawasan
          </button>
        </div>
      </div>

      <!-- 8 Tabs Bar -->
      <div class="zone-detail-tabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-top: 18px; margin-top: 16px; overflow-x: auto;">
        <button class="zone-tab-link active" data-tab="tab-ringkasan">1. Ringkasan</button>
        <button class="zone-tab-link" data-tab="tab-lahan">2. Informasi Lahan</button>
        <button class="zone-tab-link" data-tab="tab-penanaman">3. Jenis & Penanaman</button>
        <button class="zone-tab-link" data-tab="tab-pemantauan">4. Pemantauan</button>
        <button class="zone-tab-link" data-tab="tab-perawatan">5. Perawatan</button>
        <button class="zone-tab-link" data-tab="tab-galeri">6. Galeri Foto</button>
        <button class="zone-tab-link" data-tab="tab-tour">7. Virtual Tour</button>
        <button class="zone-tab-link" data-tab="tab-laporan">8. Laporan</button>
      </div>
    </div>

    <!-- Tab Contents Container -->
    <div id="zone-tab-body">
      ${Wl(e)}
    </div>
  `,n.querySelectorAll(`.zone-tab-link`).forEach(t=>{t.addEventListener(`click`,()=>{n.querySelectorAll(`.zone-tab-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let i=t.getAttribute(`data-tab`),a=document.getElementById(`zone-tab-body`);a&&(i===`tab-ringkasan`?a.innerHTML=Wl(e):i===`tab-lahan`?a.innerHTML=Gl(e):i===`tab-penanaman`?a.innerHTML=Kl(e):i===`tab-pemantauan`?a.innerHTML=ql(e):i===`tab-perawatan`?a.innerHTML=Jl(e):i===`tab-galeri`?gl(a,r):i===`tab-tour`?a.innerHTML=Yl(e):i===`tab-laporan`&&(a.innerHTML=Xl(e)))})}),t===`tab-galeri`){let e=n.querySelector(`.zone-tab-link[data-tab="tab-galeri"]`);e&&(n.querySelectorAll(`.zone-tab-link`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`));let t=document.getElementById(`zone-tab-body`);t&&gl(t,r)}let a=document.getElementById(`btn-detail-edit-zone`);a&&a.addEventListener(`click`,()=>Nl(`edit`,r.id));let o=document.getElementById(`btn-detail-back-list`);o&&o.addEventListener(`click`,()=>Nl(`list`))}function Wl(e){let t=e.zone,n=e.summary,r=n.survival_rate===null?`Data belum cukup`:`${n.survival_rate}%`;return`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Luas Lahan Tercatat</span>
        <span class="stat-value" style="color: #38bdf8;">${t.area_size} ${t.area_unit}</span>
        <span class="stat-desc">±${n.area_in_ha} Hektare (Deskriptif)</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Kegiatan Penanaman</span>
        <span class="stat-value">${n.activities_count}</span>
        <span class="stat-desc">Batch kegiatan terdaftar</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Bibit Awal Ditanam</span>
        <span class="stat-value" style="color: #fbbf24;">${(n.total_initial_seedlings||0).toLocaleString(`id-ID`)}</span>
        <span class="stat-desc">${n.unique_species_count} Spesies Pohon Berbeda</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Kelangsungan Hidup Terkini</span>
        <span class="stat-value" style="color: ${n.survival_rate&&n.survival_rate>=75?`#34d399`:`#f59e0b`};">
          ${r}
        </span>
        <span class="stat-desc">Formula: Bibit hidup awal / awal ditanam</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Scene Panorama Terkait</span>
        <span class="stat-value">${n.scenes_count}</span>
        <span class="stat-desc">Terhubung Marzipano</span>
      </div>
    </div>

    <!-- Description & Context -->
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Tujuan & Deskripsi Kawasan</h4>
      <p style="color: var(--clr-text-muted); font-size: 13.5px; line-height: 1.6; margin-top: 8px;">
        ${J(t.description||`Tidak ada deskripsi tambahan.`)}
      </p>
      ${t.planting_purpose?`
        <div style="margin-top: 14px; padding: 14px 16px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--clr-primary); border-radius: 6px;">
          <strong style="color: var(--clr-primary); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em;">TUJUAN PENANAMAN:</strong>
          <p style="margin: 4px 0 0; color: #fff; font-size: 13.5px;">${J(t.planting_purpose)}</p>
        </div>
      `:``}
    </div>
  `}function Gl(e){let t=e.land_info;return`
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h3 style="color: #fff; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 18px;">Spesifikasi & Karakteristik Lahan</h3>
      <table class="data-table" style="width: 100%; font-size: 13px;">
        <tbody>
          <tr>
            <td style="width: 240px; color: var(--clr-text-muted); padding: 12px 0;">Luas Tercatat</td>
            <td style="color: #38bdf8; font-weight: 700;">${t.area_size} ${t.area_unit} (±${t.area_in_ha} Hektare)</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Metode Pengukuran</td>
            <td style="color: #fff;">${J(t.measurement_method||`-`)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Tanggal Pengukuran</td>
            <td style="color: #fff;">${U(t.measurement_date)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Kondisi Lahan & Tanah</td>
            <td style="color: #fff;">${J(t.land_condition_notes||`Belum ada catatan khusus`)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Titik Koordinat Acuan</td>
            <td style="color: #fff;">
              ${t.latitude&&t.longitude?`${t.latitude}° N, ${t.longitude}° E (Patok Referensi)`:`<span style="color:var(--clr-text-dim)">Tidak ada koordinat GPS (Input deskriptif tetap valid)</span>`}
            </td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Aksesibilitas / Rute</td>
            <td style="color: #fff;">${J(t.access_notes||`-`)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Alamat Administratif</td>
            <td style="color: #fff;">${J(t.address||`-`)}, ${J(t.village||``)}, ${J(t.district||``)}, ${J(t.city||``)}, ${J(t.province||``)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `}function Kl(e){let t=e.activities||[],n=e.species||[];return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Spesies Pohon Tertanam -->
      <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Jenis Pohon Tertanam di Kawasan Ini (${n.length} Jenis)</h4>
        ${n.length>0?`
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 14px;">
            ${n.map(e=>`
              <div style="background: var(--clr-surface-card); padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
                <div style="font-weight: 700; color: #fff; font-size: 14px;">${J(e.local_name)}</div>
                <div style="font-style: italic; font-size: 12px; color: var(--clr-primary-light);">${J(e.scientific_name)}</div>
                <div style="font-size: 11px; color: var(--clr-text-muted); margin-top: 4px;">Famili: ${J(e.family||`-`)}</div>
                <div style="font-size: 14px; font-weight: 800; color: #fbbf24; margin-top: 8px;">
                  ${(e.total_initial_quantity||0).toLocaleString(`id-ID`)} Batang
                </div>
              </div>
            `).join(``)}
          </div>
        `:`<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada bibit pohon yang tercatat di kawasan ini.</p>`}
      </div>

      <!-- Riwayat Kegiatan Penanaman -->
      <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Daftar Kegiatan Penanaman (${t.length} Kegiatan)</h4>
        ${t.length>0?`
          <div style="overflow-x: auto; margin-top: 14px;">
            <table class="zones-table" style="min-width: 600px;">
              <thead>
                <tr>
                  <th>Batch Code</th>
                  <th>Nama Kegiatan</th>
                  <th>Tanggal</th>
                  <th>Spesies & Jumlah</th>
                  <th>Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                ${t.map(e=>`
                  <tr>
                    <td style="font-family: monospace; color: #34d399; font-weight: 700;">${e.batch_code}</td>
                    <td style="font-weight: 600; color: #fff;">${J(e.name)}</td>
                    <td>${U(e.activity_date)}</td>
                    <td>
                      ${e.items&&e.items.length>0?e.items.map(e=>`${e.species?e.species.local_name:`Pohon`}: ${e.quantity} ${e.unit||`btg`}`).join(`, `):`-`}
                    </td>
                    <td>${J(e.person_in_charge||`-`)}</td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        `:`<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada kegiatan penanaman yang dicatat pada kawasan ini.</p>`}
      </div>
    </div>
  `}function ql(e){let t=e.surveys||[];return`
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Catatan Survei & Pemantauan Tanaman Historis (${t.length} Survei)</h4>
      ${t.length>0?`
        <div style="overflow-x: auto; margin-top: 14px;">
          <table class="zones-table" style="min-width: 640px;">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kegiatan / Batch</th>
                <th style="text-align: center;">Hidup Awal</th>
                <th style="text-align: center;">Mati</th>
                <th style="text-align: center;">Hilang</th>
                <th>Kondisi</th>
                <th>Pemeriksa</th>
              </tr>
            </thead>
            <tbody>
              ${t.map(e=>`
                <tr>
                  <td>${U(e.survey_date)}</td>
                  <td style="font-weight: 600; color: #fff;">${e.activity?e.activity.name:`-`}</td>
                  <td style="text-align: center; color: #34d399; font-weight: 700;">${e.alive_count||0}</td>
                  <td style="text-align: center; color: var(--clr-danger); font-weight: 700;">${e.dead_count||0}</td>
                  <td style="text-align: center; color: #fbbf24; font-weight: 700;">${e.missing_count||0}</td>
                  <td>${J(e.health_condition||`-`)}</td>
                  <td>${J(e.inspector_name||`-`)}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada survei pemantauan untuk kawasan ini.</p>`}
    </div>
  `}function Jl(e){let t=e.maintenance||[];return`
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Riwayat Tindakan Silvikultur, Perawatan & Penyulaman (${t.length} Tindakan)</h4>
      ${t.length>0?`
        <div style="overflow-x: auto; margin-top: 14px;">
          <table class="zones-table" style="min-width: 640px;">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Tindakan</th>
                <th style="text-align: center;">Jumlah Ditangani</th>
                <th style="text-align: center;">Bibit Sulaman</th>
                <th>Pelaksana</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              ${t.map(e=>`
                <tr>
                  <td>${U(e.maintenance_date)}</td>
                  <td style="font-weight: 700; color: #fff; text-transform: capitalize;">${J(e.action_type||`-`)}</td>
                  <td style="text-align: center;">${e.plants_treated_count||0}</td>
                  <td style="text-align: center; color: #34d399; font-weight: 700;">${e.replacement_plants_count||0}</td>
                  <td>${J(e.executor_name||`-`)}</td>
                  <td style="color: var(--clr-text-muted);">${J(e.notes||`-`)}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada tindakan perawatan atau penyulaman yang dicatat pada kawasan ini.</p>`}
    </div>
  `}function Yl(e){let t=e.scenes||[];return`
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px; font-weight: 700;">Panorama 360° Terhubung Kawasan Ini (${t.length} Scene)</h4>
        <a href="#tour" class="btn-primary-action btn-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
          <span>🌐</span> Buka Virtual Tour Penuh
        </a>
      </div>
      ${t.length>0?`
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
          ${t.map(e=>`
            <div style="background: var(--clr-surface-card); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--clr-border-subtle);">
              <img src="${e.thumbnail_path||`/tiles/`+e.id+`/preview.jpg`}" alt="${e.name}" style="width: 100%; height: 130px; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              <div style="padding: 12px;">
                <div style="font-weight: 700; color: #fff; font-size: 13.5px;">${J(e.name)}</div>
                <div style="font-size: 11.5px; color: var(--clr-primary-light); margin-top: 4px;">🎯 ${e.hotspots_count||0} Hotspots</div>
              </div>
            </div>
          `).join(``)}
        </div>
      `:`<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada scene panorama yang dihubungkan ke kawasan ini.</p>`}
    </div>
  `}function Xl(e){let t=e.zone,n=e.summary;return`
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px; font-weight: 700;">Ekspor Laporan Kawasan: ${J(t.name)}</h4>
        <div style="display: flex; gap: 8px;">
          <a href="/api/admin/trees/reports/summary/csv" class="btn-secondary-action btn-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;" download>
            <span>📥</span> Unduh Ringkasan CSV
          </a>
          <button onclick="window.print()" class="btn-text-btn btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>🖨️</span> Cetak Halaman
          </button>
        </div>
      </div>
      <div style="background: var(--clr-surface-card); padding: 20px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle); font-size: 13.5px; line-height: 1.8;">
        <div><strong>Kawasan:</strong> ${J(t.name)} (${J(t.zone_code)})</div>
        <div><strong>Luas Tercatat:</strong> ${t.area_size} ${t.area_unit} (±${n.area_in_ha} Ha)</div>
        <div><strong>Status:</strong> ${J(t.status)} • <strong>Target Penanaman:</strong> ${t.planting_target||`-`} batang</div>
        <div><strong>Bibit Tertanam:</strong> ${(n.total_initial_seedlings||0).toLocaleString(`id-ID`)} batang (${n.unique_species_count} jenis)</div>
        <div><strong>Kelangsungan Hidup Kelompok Awal:</strong> ${n.survival_rate===null?`Data belum cukup`:n.survival_rate+`%`}</div>
        <div><strong>Total Survei Pemantauan:</strong> ${n.total_surveys} kali • <strong>Tindakan Perawatan:</strong> ${n.total_maintenance} kali</div>
      </div>
    </div>
  `}function Zl(){let e=document.getElementById(`zone-pane-container`);e&&(e.innerHTML=`
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="color: #fff; margin: 0; font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            <span>🖼️</span> Galeri Dokumentasi Foto per Kawasan
          </h3>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 4px 0 0;">
            Pilih kawasan penanaman untuk melihat, mengunggah, atau mengelola foto dokumentasi lapangannya.
          </p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px;">
        ${Al.map(e=>`
          <div class="zone-grid-card">
            <div class="zone-card-cover">
              ${e.main_photo_path?`
                <img src="${e.main_photo_path}" alt="${J(e.name)}" onerror="this.onerror=null; this.src='/favicon.svg';" />
              `:`
                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(12,20,16,0.95) 100%);">
                  <span style="font-size: 40px; margin-bottom: 4px;">🏞️</span>
                  <span style="font-size: 11px; color: var(--clr-text-muted);">Foto Sampul Belum Diatur</span>
                </div>
              `}
              <div style="position: absolute; top: 10px; right: 10px; z-index: 2;">
                ${Ll(e.status)}
              </div>
              <div style="position: absolute; top: 10px; left: 10px; z-index: 2;">
                <span style="font-family: monospace; font-size: 11px; font-weight: 700; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: #34d399; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.35);">
                  ${J(e.zone_code)}
                </span>
              </div>
            </div>
            <div class="zone-card-body">
              <div>
                <h5 style="margin: 0 0 6px; color: #fff; font-size: 15px; font-weight: 800;">${J(e.name)}</h5>
                <p style="font-size: 12px; color: var(--clr-text-muted); margin: 0;">
                  📐 ${e.area_size} ${e.area_unit} • 🏷️ ${J(e.category||`Konservasi`)}
                </p>
              </div>
              <button class="btn-open-zone-gallery btn-primary-action btn-sm" data-id="${e.id}" style="width: 100%; margin-top: 16px; justify-content: center; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                <span>🖼️</span> Buka Galeri Kawasan
              </button>
            </div>
          </div>
        `).join(``)}
      </div>
    </div>
  `,e.querySelectorAll(`.btn-open-zone-gallery`).forEach(e=>{e.addEventListener(`click`,()=>{Nl(`detail`,e.getAttribute(`data-id`),`tab-galeri`)})}))}function J(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Ql=`rekap`,$l=[],eu=null;async function tu(){let e=document.getElementById(`admin-reports-content`);e&&(ru(e),await iu(Ql))}async function nu(e){Ql=e;let t=document.getElementById(`admin-reports-content`);t&&(document.getElementById(`report-content-pane`)||ru(t),t.querySelectorAll(`.report-tab-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-report-tab`)===e)}),await iu(e))}function ru(e){e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">📊</span>
          <span>Laporan &amp; Statistik Penanaman</span>
        </h2>
        <p class="zones-hero-desc">
          Rekapitulasi kuantitatif, analisis kelangsungan hidup (survival rate), laporan agregat per kawasan dan jenis pohon, serta ekspor berkas.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;" download>
          <span>📥</span> Unduh Semua Data (CSV)
        </a>
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
  `,e.querySelectorAll(`.report-tab-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{await nu(e.getAttribute(`data-report-tab`))})})}async function iu(e){let t=document.getElementById(`report-pane-body`);if(t)try{eu||=await H.getTreeDashboard(),$l.length===0&&($l=(await H.getZones()).zones||[]),e===`rekap`?au(t,eu):e===`survival`?ou(t,eu):e===`per-kawasan`?su(t,$l):e===`per-pohon`?cu(t,eu):e===`ekspor`&&lu(t)}catch(e){t.innerHTML=`
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat data laporan: ${e.message}
      </div>
    `}}function au(e,t){let n=t.indicators||t.metrics||{},r=n.total_initial_seedlings||0,i=n.total_alive_initial||0,a=n.total_dead_initial||0,o=n.total_missing_initial||0,s=n.total_replacements||0,c=n.survival_rate,l=c==null?`Data Belum Lengkap`:`${Number(c).toFixed(1)}%`;e.innerHTML=`
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
  `}function ou(e,t){t.survival;let n=t.needs_inspection||[];e.innerHTML=`
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
                  <td style="padding: 8px;">${e.last_survey_date?U(e.last_survey_date):`Belum pernah`}</td>
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
  `}function su(e,t){e.innerHTML=`
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
  `}function cu(e,t){let n=t.charts?.species_distribution||[];e.innerHTML=`
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
  `}function lu(e){e.innerHTML=`
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
  `}var uu=[];async function du(){let e=document.getElementById(`admin-users-content`);e&&(fu(e),await mu())}function fu(e){e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">👥</span>
          <span>Pengguna dan Hak Akses</span>
        </h2>
        <p class="zones-hero-desc">
          Atur pembagian peran: Administrator (seluruh kontrol), Petugas Penanaman (input kegiatan &amp; survei), Editor Konten (panorama &amp; publikasi).
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-add-user" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>➕</span> Tambah Pengguna
        </button>
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
  `;let t=e.querySelector(`#btn-add-user`);t&&t.addEventListener(`click`,()=>pu(null));let n=e.querySelector(`#user-form-modal`),r=e.querySelector(`#btn-close-user-modal`),i=e.querySelector(`#btn-cancel-user-modal`),a=()=>{n&&(n.style.display=`none`,n.classList.add(`hidden`))};r&&r.addEventListener(`click`,a),i&&i.addEventListener(`click`,a);let o=e.querySelector(`#user-account-form`);o&&o.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`user-edit-id`).value,n={name:document.getElementById(`user-input-name`).value.trim(),username:document.getElementById(`user-input-username`).value.trim(),email:document.getElementById(`user-input-email`).value.trim()||null,role:document.getElementById(`user-input-role`).value},r=document.getElementById(`user-input-password`).value;r&&(n.password=r);let i=!!t,c=o.querySelector(`button[type="submit"]`);c&&(c.disabled=!0,c.textContent=`Menyimpan...`);try{let e=await H.saveUser(n,t||null);i?s.updated(e.message||`Data pengguna berhasil disimpan.`):s.created(e.message||`Pengguna baru berhasil ditambahkan.`),a(),await mu()}catch(e){s.error(`✕ Gagal menyimpan pengguna`,e.message)}finally{c&&(c.disabled=!1,c.textContent=`Simpan Pengguna`)}})}function pu(e=null){let t=document.getElementById(`user-form-modal`);if(!t)return;t.style.display=`flex`,t.classList.remove(`hidden`),document.getElementById(`user-modal-title`).innerText=e?`Edit Pengguna: ${e.name}`:`Tambah Pengguna Baru`,document.getElementById(`user-edit-id`).value=e?e.id:``,document.getElementById(`user-input-name`).value=e?e.name:``,document.getElementById(`user-input-username`).value=e?e.username:``,document.getElementById(`user-input-email`).value=e&&e.email?e.email:``,document.getElementById(`user-input-role`).value=e?e.role:`petugas_penanaman`,document.getElementById(`user-input-password`).value=``;let n=document.getElementById(`pwd-help-text`);n&&(n.innerText=e?`(Kosongkan jika tidak ingin mengubah sandi)`:`(Wajib diisi, min 6 karakter)`);let r=document.getElementById(`user-input-password`);r&&(r.required=!e)}async function mu(){let e=document.getElementById(`users-table-wrapper`);if(e)try{uu=(await H.getUsers()).users||[],hu(e,uu)}catch(t){e.innerHTML=`
      <div style="color: #fca5a5; padding: 16px;">❌ Gagal memuat daftar pengguna: ${t.message}</div>
    `}}function hu(e,t){if(!t||t.length===0){e.innerHTML=`<div style="text-align: center; color: var(--clr-text-muted); padding: 30px;">Tidak ada pengguna terdaftar.</div>`;return}let n={administrator:`<span class="badge-status-published" style="font-size: 11px;">Administrator</span>`,admin:`<span class="badge-status-published" style="font-size: 11px;">Administrator</span>`,superadmin:`<span class="badge-status-published" style="font-size: 11px;">Super Admin</span>`,petugas_penanaman:`<span class="badge-status-draft" style="color:#38bdf8;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);font-size: 11px;font-weight:600;padding:2px 8px;border-radius:9999px;">🌱 Petugas Penanaman</span>`,editor_konten:`<span class="badge-status-draft" style="color:#fbbf24;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.35);font-size: 11px;font-weight:600;padding:2px 8px;border-radius:9999px;">✏️ Editor Konten</span>`};e.innerHTML=`
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
      <td style="padding: 10px; font-weight: 600; color: #fff;">${gu(e.name)}</td>
      <td style="padding: 10px; font-family: monospace; color: var(--clr-primary);">${gu(e.username)}</td>
      <td style="padding: 10px; color: var(--clr-text-muted);">${gu(e.email||`-`)}</td>
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
  `,e.querySelectorAll(`.btn-edit-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=uu.find(e=>String(e.id)===String(t));n&&pu(n)})}),e.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=uu.find(e=>String(e.id)===String(t));if(await V.confirm({title:`Hapus Pengguna?`,subtitle:n?.name||n?.username||`Akun Pengguna`,message:`Apakah Anda yakin ingin menghapus akun pengguna <strong>"${gu(n?.name||n?.username||``)}"</strong>? Pengguna ini tidak akan dapat login lagi ke sistem.`,type:`danger`,confirmText:`Ya, Hapus Pengguna`,cancelText:`Batal`,icon:`🗑️`}))try{let e=await H.deleteUser(t);s.deleted(e.message||`Pengguna berhasil dihapus.`),await mu()}catch(e){s.error(`✕ Gagal menghapus: `+e.message)}})})}function gu(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var _u=[];async function vu(){let e=document.getElementById(`admin-activity-logs-content`);e&&(yu(e),await bu())}function yu(e){e.innerHTML=`
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">📜</span>
          <span>Log Aktivitas Sistem</span>
        </h2>
        <p class="zones-hero-desc">
          Rekaman jejak audit sistem: penambahan kawasan, pembaruan bibit, survei pemantauan, publikasi hotspot, dan autentikasi.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-refresh-logs" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>🔄</span> Segarkan Log
        </button>
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
  `;let t=e.querySelector(`#btn-refresh-logs`);t&&t.addEventListener(`click`,bu);let n=e.querySelector(`#log-search`),r=e.querySelector(`#log-filter-module`),i=async()=>{await bu({search:n.value.trim(),module:r.value})};n&&n.addEventListener(`input`,Su(i,300)),r&&r.addEventListener(`change`,i)}async function bu(e={}){let t=document.getElementById(`logs-table-wrapper`);if(t)try{_u=(await H.getActivityLogs(e)).logs||[],xu(t,_u)}catch(e){t.innerHTML=`
      <div style="color: #fca5a5; padding: 16px;">❌ Gagal memuat log: ${e.message}</div>
    `}}function xu(e,t){e.innerHTML=!t||t.length===0?`
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
          ${Cu(e.user_name||`Admin`)}
        </td>
        <td style="padding: 10px;">
          ${n}
        </td>
        <td style="padding: 10px; font-weight: 500; text-transform: uppercase; font-size: 11px; color: var(--clr-primary);">
          ${Cu(e.module)}
        </td>
        <td style="padding: 10px; color: #fff;">
          ${Cu(e.description)}
        </td>
        <td style="padding: 10px; font-family: monospace; font-size: 11px; color: var(--clr-text-dim);">
          ${e.ip_address||`-`}
        </td>
      </tr>
    `}).join(``)}
      </tbody>
    </table>
  `}function Su(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}function Cu(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var wu=1800,Tu=300,Eu=wu,Du=Tu,Ou=Eu-Du,ku=Date.now(),Au=null,ju=!1,Mu=0,Nu=null,Pu=`ecoland_admin_last_activity`;function Fu(){if(typeof window<`u`){try{`BroadcastChannel`in window&&(Nu=new BroadcastChannel(`ecoland_admin_session_channel`),Nu.onmessage=e=>{Iu(e.data)})}catch(e){console.warn(`BroadcastChannel tidak didukung, menggunakan fallback storage event:`,e)}window.addEventListener(`storage`,e=>{if(e.key===Pu&&e.newValue){let t=parseInt(e.newValue,10);!isNaN(t)&&t>ku&&(ku=t,ju&&Vu())}})}}function Iu(e){if(e&&e.type)switch(e.type){case`ACTIVITY`:case`KEEP_ALIVE`:e.timestamp&&e.timestamp>ku&&(ku=e.timestamp,ju&&Vu());break;case`LOGOUT`:Ku(),hc()}}function Lu(e){try{Nu&&Nu.postMessage(e)}catch{}try{(e.type===`ACTIVITY`||e.type===`KEEP_ALIVE`)&&localStorage.setItem(Pu,String(e.timestamp||Date.now()))}catch{}}function Ru(){if(ju)return;let e=Date.now();e-Mu<1e4||(Mu=e,ku=e,Lu({type:`ACTIVITY`,timestamp:e}))}function zu(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function Bu(e){let t=document.getElementById(`admin-session-warning-modal`),n=document.getElementById(`session-warning-timer`),r=document.getElementById(`admin-session-indicator`),i=document.getElementById(`admin-session-text`),a=document.getElementById(`admin-session-dot`);t&&(t.classList.remove(`hidden`),ju=!0),n&&(n.textContent=zu(e)),r&&i&&(r.classList.remove(`bg-blue-500/10`,`text-blue-400`,`border-blue-500/20`),r.classList.add(`bg-amber-500/20`,`text-amber-300`,`border-amber-500/40`,`animate-pulse`),i.textContent=`Sesi Berakhir: ${zu(e)}`),a&&(a.classList.remove(`bg-blue-400`),a.classList.add(`bg-amber-400`))}function Vu(){let e=document.getElementById(`admin-session-warning-modal`),t=document.getElementById(`admin-session-indicator`),n=document.getElementById(`admin-session-text`),r=document.getElementById(`admin-session-dot`);e&&(e.classList.add(`hidden`),ju=!1),t&&n&&(t.classList.add(`bg-blue-500/10`,`text-blue-400`,`border-blue-500/20`),t.classList.remove(`bg-amber-500/20`,`text-amber-300`,`border-amber-500/40`,`animate-pulse`),n.textContent=`Sesi Aktif`),r&&(r.classList.add(`bg-blue-400`),r.classList.remove(`bg-amber-400`))}async function Hu(){let e=document.getElementById(`btn-session-keep-alive`);e&&(e.disabled=!0,e.textContent=`Memperpanjang...`);let t=H.getToken(),n=document.querySelector(`meta[name="csrf-token"]`),r=n?n.getAttribute(`content`):``,i=!1;try{let e=await fetch(`/api/auth/session-ping`,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`,...t?{Authorization:`Bearer ${t}`}:{},...r?{"X-CSRF-TOKEN":r}:{}}});if(e.ok){let t=await e.json().catch(()=>({}));t.idle_timeout_minutes&&(Eu=t.idle_timeout_minutes*60),t.idle_warning_minutes&&(Du=t.idle_warning_minutes*60,Ou=Eu-Du),i=!0}}catch{}if(!i)try{(await fetch(`/admin/session/keep-alive`,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`,...r?{"X-CSRF-TOKEN":r}:{}}})).ok&&(i=!0)}catch{}e&&(e.disabled=!1,e.textContent=`Tetap Login`);let a=Date.now();ku=a,Vu(),Lu({type:`KEEP_ALIVE`,timestamp:a}),s.success(`✓ Sesi Diperpanjang`,`Sesi login administrator Anda tetap aktif dan berhasil diperpanjang.`)}function Uu(){if(!_c()||!window.location.hash.startsWith(`#admin`)){Vu();return}let e=Math.floor((Date.now()-ku)/1e3);e>=Eu?(Ku(),Vu(),Lu({type:`LOGOUT`}),s.warning(`Sesi Berakhir`,`Sesi Anda telah berakhir karena tidak ada aktivitas selama 30 menit. Mengalihkan ke halaman login...`),setTimeout(()=>{hc()},1200)):e>=Ou?Bu(Eu-e):ju&&Vu()}function Wu(){[`mousedown`,`mousemove`,`keydown`,`scroll`,`touchstart`,`click`].forEach(e=>{window.addEventListener(e,Ru,{passive:!0})})}function Gu(){if(typeof window>`u`)return;let e=document.querySelector(`meta[name="admin-idle-timeout"]`);if(e&&e.content){let t=parseInt(e.content,10);!isNaN(t)&&t>0&&(Eu=t*60)}let t=document.querySelector(`meta[name="admin-idle-warning"]`);if(t&&t.content){let e=parseInt(t.content,10);!isNaN(e)&&e>0&&(Du=e*60)}Ou=Math.max(60,Eu-Du);let n=localStorage.getItem(Pu),r=Date.now();if(n){let e=parseInt(n,10);!isNaN(e)&&e<=r&&r-e<Eu*1e3?ku=e:(ku=r,localStorage.setItem(Pu,String(r)))}else ku=r,localStorage.setItem(Pu,String(r));Fu(),Wu();let i=document.getElementById(`btn-session-keep-alive`);i&&i.addEventListener(`click`,e=>{e.preventDefault(),Hu()});let a=document.getElementById(`btn-session-logout-now`);a&&a.addEventListener(`click`,e=>{e.preventDefault(),Lu({type:`LOGOUT`}),hc()}),Au&&clearInterval(Au),Au=setInterval(Uu,1e3)}function Ku(){Au&&=(clearInterval(Au),null),Vu()}function qu(){ku=Date.now(),Vu(),Lu({type:`ACTIVITY`,timestamp:ku})}var Ju=[],Yu=[],Xu=`list`,Y=null,Zu=``,Qu=`all`,$u=`all`,ed=`all`,td=`cards`,nd=!1,X=[],rd=[`Kondisi Kawasan`,`Kegiatan Penanaman`,`Pertumbuhan Tanaman`,`Pemantauan`,`Perawatan`,`Fasilitas`,`Dokumentasi Silvikultur`,`Dokumentasi Lainnya`];async function id(e=`admin-albums-content`,t=null,n=null){let r=document.getElementById(e);if(r){if(t)Xu=t,Y=n||null;else{let e=window.location.hash||``,t=e.match(/^#admin\/albums\/([^/]+)\/edit$/),n=e.match(/^#admin\/albums\/([^/]+)\/photos$/),r=e.match(/^#admin\/albums\/create$/);t?(Xu=`edit`,Y=t[1]):n?(Xu=`manage-photos`,Y=n[1]):r?(Xu=`create`,Y=null):(Xu=`list`,Y=null)}try{let e=localStorage.getItem(`admin_albums_view_mode`);(e===`cards`||e===`table`)&&(td=e)}catch{}await ad(),od(r)}}async function ad(){try{let[e,t]=await Promise.all([H.getAdminAlbums({search:Zu,category:Qu,planting_zone_id:$u}).catch(()=>({albums:[]})),H.getZones({sort_by:`name`,sort_dir:`asc`}).catch(()=>({zones:[]}))]),n=e.albums||[];ed===`published`?n=n.filter(e=>e.is_published):ed===`draft`&&(n=n.filter(e=>!e.is_published)),Ju=n,Yu=t.zones||[]}catch(e){console.error(`Gagal memuat data album:`,e),Ju=[]}}function od(e){Ju.length,e.innerHTML=`
    <div id="admin-albums-root" class="admin-albums-sharp space-y-6">
      <!-- 1. Hero Banner Card -->
      <div class="zones-hero-card">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 w-full">
          <div class="flex items-center gap-4">
            <div class="zones-hero-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.35); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
              📸
            </div>
            <div>
              <h2 class="zones-hero-title">Manajemen Album Kegiatan Galeri</h2>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto shrink-0 z-10">
            <button id="btn-album-create-new" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all duration-200">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>+ Buat Album Baru</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Dynamic Content Pane -->
      <div id="album-dynamic-container">
        <!-- Rendered based on currentAlbumView -->
      </div>
    </div>

    <!-- Modal Container for Photo Selection from Existing Photos -->
    <div id="album-photo-modal" class="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md hidden flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg">
              🖼️
            </div>
            <div>
              <h3 class="text-sm font-bold text-white" id="modal-album-title">Pilih Foto untuk Album</h3>
              <p class="text-xs text-slate-400">Pilih dari koleksi dokumentasi foto kawasan yang sudah terunggah</p>
            </div>
          </div>
          <button id="btn-close-photo-modal" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">✕</button>
        </div>
        <div id="modal-photo-list" class="p-6 overflow-y-auto flex-1 min-h-[320px]">
          <!-- Grid of available photos loaded via API -->
        </div>
        <div class="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/80 shrink-0">
          <span class="text-xs text-slate-300 font-medium" id="modal-selected-count">0 foto terpilih</span>
          <div class="flex items-center gap-3">
            <button id="btn-cancel-add-photos" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">Batal</button>
            <button id="btn-submit-add-photos" class="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition disabled:opacity-50 cursor-pointer" disabled>
              Tambahkan ke Album
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 2: Edit Keterangan Foto -->
    <div id="album-photo-edit-modal" class="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-md hidden flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              ✏️
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Sunting Keterangan Foto Kegiatan</h3>
              <p class="text-xs text-slate-400">Perbarui judul/label, narasi kegiatan, dan teks aksesibilitas</p>
            </div>
          </div>
          <button id="btn-close-edit-photo-modal" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">✕</button>
        </div>
        <form id="form-edit-photo-meta" class="p-6 space-y-4">
          <input type="hidden" id="edit-photo-id" />
          <div class="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <img id="edit-photo-thumb" src="" class="w-16 h-12 rounded-lg object-cover bg-slate-900 shrink-0 border border-white/10" />
            <div class="min-w-0 text-xs">
              <span class="text-slate-400 block text-[10px]">Tinjauan Foto:</span>
              <p id="edit-photo-info" class="font-mono text-blue-400 truncate text-[11px]"></p>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1">Judul / Label Foto</label>
            <input type="text" id="edit-photo-title" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500" placeholder="Label foto..." />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1">Keterangan / Caption Kegiatan</label>
            <textarea id="edit-photo-caption" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed" placeholder="Catatan dokumentasi foto..."></textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1">Alt Text (Aksesibilitas &amp; SEO)</label>
            <input type="text" id="edit-photo-alt" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500" placeholder="Deskripsi gambar..." />
          </div>
          <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button type="button" id="btn-cancel-edit-photo" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">Batal</button>
            <button type="submit" id="btn-save-edit-photo" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition cursor-pointer">
              Simpan Keterangan
            </button>
          </div>
        </form>
      </div>
    </div>
  `,document.getElementById(`btn-album-create-new`)?.addEventListener(`click`,()=>{cd(`create`)}),document.getElementById(`btn-close-photo-modal`)?.addEventListener(`click`,xd),document.getElementById(`btn-cancel-add-photos`)?.addEventListener(`click`,xd),document.getElementById(`btn-close-edit-photo-modal`)?.addEventListener(`click`,vd),document.getElementById(`btn-cancel-edit-photo`)?.addEventListener(`click`,vd),sd()}function sd(){let e=document.getElementById(`album-dynamic-container`);e&&(Xu===`create`||Xu===`edit`?md(e):Xu===`manage-photos`?hd(e):ld(e))}function cd(e,t=null,n=!0){if(Xu=e,Y=t,n){let n=`#admin/albums`;if(e===`create`?n=`#admin/albums/create`:e===`edit`&&t?n=`#admin/albums/${t}/edit`:e===`manage-photos`&&t&&(n=`#admin/albums/${t}/photos`),window.location.hash!==n){window.location.hash=n;return}}let r=document.getElementById(`admin-header-title`),i=document.getElementById(`admin-breadcrumb-active`);r&&i&&(e===`create`?(r.textContent=`Formulir Tambah Album Kegiatan Baru`,i.textContent=`Tambah Album`):e===`edit`?(r.textContent=`Sunting Informasi & Koleksi Album`,i.textContent=`Edit Album`):e===`manage-photos`?(r.textContent=`Pengelolaan Foto & Urutan Album`,i.textContent=`Kelola Foto`):(r.textContent=`Manajemen Album Kegiatan Galeri Kawasan`,i.textContent=`Album Kegiatan`)),sd(),window.scrollTo({top:0,behavior:`smooth`})}function ld(e){let t=!!(Zu||Qu!==`all`||$u!==`all`||ed!==`all`);e.innerHTML=`
    <!-- Toolbar Search, Filter & View Mode Card -->
    <div class="zones-toolbar-card">
      <div class="zones-toolbar-left flex-wrap">
        <!-- Search Box -->
        <div class="zone-search-wrapper flex-1 min-w-[200px] max-w-sm">
          <svg class="zone-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="album-search-input" value="${Z(Zu)}" class="zone-search-input" placeholder="Cari nama kegiatan, mitra, deskripsi..." />
          ${Zu?`<button id="btn-album-search-clear" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer p-1">✕</button>`:``}
        </div>

        <!-- Filter Kategori Silvikultur -->
        <select id="album-filter-category" class="zone-filter-select" title="Filter berdasarkan kategori kegiatan">
          <option value="all">Semua Kategori</option>
          ${rd.map(e=>`<option value="${e}" ${Qu===e?`selected`:``}>${e}</option>`).join(``)}
        </select>

        <!-- Filter Kawasan -->
        <select id="album-filter-zone" class="zone-filter-select" title="Filter berdasarkan kawasan penanaman">
          <option value="all">Semua Kawasan</option>
          ${Yu.map(e=>`<option value="${e.id}" ${$u===e.id?`selected`:``}>${e.name}</option>`).join(``)}
        </select>

        <!-- Filter Status Publikasi -->
        <select id="album-filter-status" class="zone-filter-select" title="Filter status publikasi">
          <option value="all" ${ed===`all`?`selected`:``}>Semua Status</option>
          <option value="published" ${ed===`published`?`selected`:``}>Publikasi Saja</option>
          <option value="draft" ${ed===`draft`?`selected`:``}>Draft Saja</option>
        </select>

        ${t?`
          <button id="btn-album-reset-filters" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition cursor-pointer" title="Hapus semua filter">
            ✕ Reset Filter
          </button>
        `:``}
      </div>

      <!-- View Switcher Toggle -->
      <div class="zones-toolbar-right">
        <div class="zones-view-toggle">
          <button id="btn-album-view-cards" class="zone-view-btn ${td===`cards`?`active`:``}" title="Tampilan Kartu Grid">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span class="hidden md:inline">Kartu</span>
          </button>
          <button id="btn-album-view-table" class="zone-view-btn ${td===`table`?`active`:``}" title="Tampilan Tabel Ringkas">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <span class="hidden md:inline">Tabel</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content View (Cards or Table) -->
    <div id="album-content-display">
      ${td===`cards`?ud():dd()}
    </div>
  `;let n=document.getElementById(`album-search-input`);n?.addEventListener(`keydown`,async e=>{e.key===`Enter`&&(Zu=n.value.trim(),await pd())}),document.getElementById(`btn-album-search-clear`)?.addEventListener(`click`,async()=>{Zu=``,await pd()}),document.getElementById(`album-filter-category`)?.addEventListener(`change`,async e=>{Qu=e.target.value,await pd()}),document.getElementById(`album-filter-zone`)?.addEventListener(`change`,async e=>{$u=e.target.value,await pd()}),document.getElementById(`album-filter-status`)?.addEventListener(`change`,async e=>{ed=e.target.value,await pd()}),document.getElementById(`btn-album-reset-filters`)?.addEventListener(`click`,async()=>{Zu=``,Qu=`all`,$u=`all`,ed=`all`,await pd(),s.info(`Filter Direset`,`Semua kriteria pencarian dan filter telah dikembalikan.`)}),document.getElementById(`btn-album-view-cards`)?.addEventListener(`click`,()=>{td=`cards`;try{localStorage.setItem(`admin_albums_view_mode`,`cards`)}catch{}ld(e)}),document.getElementById(`btn-album-view-table`)?.addEventListener(`click`,()=>{td=`table`;try{localStorage.setItem(`admin_albums_view_mode`,`table`)}catch{}ld(e)}),fd()}function ud(){return Ju.length===0?`
      <div class="zones-empty-card text-center py-16 px-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <span class="text-5xl block mb-3">📁</span>
        <h3 class="text-base font-bold text-white">Belum Ada Album Kegiatan Ditemukan</h3>
        <p class="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
          Tidak ada album yang sesuai dengan filter pencarian Anda, atau belum ada album yang dibuat.
        </p>
        <button id="btn-empty-create-album" class="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>+ Buat Album Sekarang</span>
        </button>
      </div>
    `:`
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      ${Ju.map(e=>{let t=e.cover_photo?.thumbnail_url||e.cover_photo?.file_url||e.cover_url||``,n=parseInt(e.photos_count||e.photo_count,10)||0;return`
          <div class="album-modern-card group flex flex-col justify-between" data-album-id="${e.id}">
            <div>
              <!-- Cover Image Box (16:10 Ratio) -->
              <div class="album-card-cover-wrap relative">
                ${t?`
                  <img src="${Z(t)}" alt="${Z(e.title)}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=''; this.classList.add('hidden');">
                `:`
                  <div class="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 gap-2">
                    <svg class="w-8 h-8 opacity-40 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span class="text-[11px] font-medium text-slate-500">Belum ada foto sampul</span>
                  </div>
                `}
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none"></div>

                <!-- Top Badges -->
                <div class="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/80 text-blue-300 border border-blue-500/30 backdrop-blur-md shadow-sm">
                    <svg class="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                    <span class="truncate max-w-[130px]">${Z(e.category||`Silvikultur`)}</span>
                  </span>

                  ${e.is_published?`
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-sm">
                      <span class="album-pulse-dot"></span>
                      <span>Publik</span>
                    </span>
                  `:`
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-slate-400 border border-slate-700 backdrop-blur-md">
                      <span>Draft</span>
                    </span>
                  `}
                </div>

                <!-- Bottom Meta in Cover -->
                <div class="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-slate-200 pointer-events-none">
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-medium bg-slate-950/75 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 text-slate-300">
                    <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"></line><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"></line><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"></line></svg>
                    <span>${e.activity_date?U(e.activity_date):`Belum diatur`}</span>
                  </span>
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-950/80 text-blue-300 font-mono font-bold text-[11px] border border-blue-500/40 backdrop-blur-md">
                    <svg class="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><circle cx="12" cy="13" r="4" stroke-width="2"></circle></svg>
                    <span>${n} Foto</span>
                  </span>
                </div>
              </div>

              <!-- Card Content Area -->
              <div class="p-4 space-y-2.5">
                <div>
                  <h3 class="text-sm font-bold text-white group-hover:text-blue-400 transition leading-snug line-clamp-2" title="${Z(e.title)}">
                    ${Z(e.title)}
                  </h3>
                  <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span class="inline-flex items-center gap-1 text-slate-300 truncate max-w-[170px]" title="Kawasan">
                      <svg class="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><circle cx="12" cy="10" r="3" stroke-width="2"></circle></svg>
                      <span class="truncate">${Z(e.zone?.name||`Kawasan Umum`)}</span>
                    </span>
                    <span class="text-slate-600">&bull;</span>
                    <span class="text-[10px] text-slate-500 font-mono shrink-0">Urutan #${e.sort_order||0}</span>
                  </div>
                </div>

                <!-- Organizer & Location Tags (If present) -->
                ${e.organizer||e.location_name?`
                  <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                    ${e.organizer?`
                      <span class="album-chip bg-slate-900/90 text-slate-300 border border-slate-800" title="Penyelenggara / Mitra">
                        <svg class="w-3 h-3 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <span class="truncate max-w-[150px]">${Z(e.organizer)}</span>
                      </span>
                    `:``}
                    ${e.location_name?`
                      <span class="album-chip bg-slate-900/90 text-slate-300 border border-slate-800" title="Plot / Titik Lapangan">
                        <svg class="w-3 h-3 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                        <span class="truncate max-w-[130px]">${Z(e.location_name)}</span>
                      </span>
                    `:``}
                  </div>
                `:``}

                <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[34px]">
                  ${Z(e.description||`Tidak ada catatan ringkas mengenai kegiatan ini.`)}
                </p>
              </div>
            </div>

            <!-- Card Actions Footer -->
            <div class="px-4 pb-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
              <button class="btn-manage-photos flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold border border-blue-500/30 transition-all duration-200 cursor-pointer shadow-sm" data-id="${e.id}">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Kelola Foto (${n})</span>
              </button>
              <button class="btn-edit-album p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer" title="Edit Album" data-id="${e.id}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </button>
              <button class="btn-delete-album p-2 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition cursor-pointer" title="Hapus Album" data-id="${e.id}" data-title="${Z(e.title)}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        `}).join(``)}
    </div>
  `}function dd(){return Ju.length===0?`<div class="p-8 text-center text-slate-400">Belum ada album ditemukan.</div>`:`
    <div class="zones-table-box overflow-x-auto">
      <table class="zones-table w-full text-left border-collapse text-xs">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px]">
            <th class="p-3.5">Sampul</th>
            <th class="p-3.5">Nama Kegiatan / Album</th>
            <th class="p-3.5">Kategori</th>
            <th class="p-3.5">Kawasan &amp; Lokasi</th>
            <th class="p-3.5">Tanggal</th>
            <th class="p-3.5 text-center">Foto</th>
            <th class="p-3.5 text-center">Status</th>
            <th class="p-3.5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          ${Ju.map(e=>{let t=e.cover_photo?.thumbnail_url||e.cover_photo?.file_url||e.cover_url||``,n=parseInt(e.photos_count||e.photo_count,10)||0;return`
              <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3.5">
                  <div class="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/80">
                    ${t?`<img src="${Z(t)}" class="w-full h-full object-cover">`:`<div class="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">Polos</div>`}
                  </div>
                </td>
                <td class="p-3.5">
                  <div class="font-bold text-white leading-snug">${Z(e.title)}</div>
                  ${e.organizer?`
                    <div class="inline-flex items-center gap-1 text-[11px] font-medium text-sky-400 mt-0.5">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      <span>${Z(e.organizer)}</span>
                    </div>
                  `:``}
                  <div class="text-[11px] font-normal text-slate-400 line-clamp-1 mt-0.5">${Z(e.description||``)}</div>
                </td>
                <td class="p-3.5">
                  <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                    ${Z(e.category||`-`)}
                  </span>
                </td>
                <td class="p-3.5 text-slate-300">
                  <div class="font-medium text-slate-200">${Z(e.zone?.name||`Kawasan Umum`)}</div>
                  ${e.location_name?`
                    <div class="inline-flex items-center gap-1 text-[10px] text-amber-400/90 mt-0.5">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                      <span>${Z(e.location_name)}</span>
                    </div>
                  `:``}
                </td>
                <td class="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                  ${e.activity_date?U(e.activity_date):`-`}
                </td>
                <td class="p-3.5 text-center font-bold font-mono text-blue-400">
                  ${n}
                </td>
                <td class="p-3.5 text-center">
                  ${e.is_published?`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"><span class="album-pulse-dot"></span><span>Publik</span></span>`:`<span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">Draft</span>`}
                </td>
                <td class="p-3.5 text-right whitespace-nowrap">
                  <div class="inline-flex items-center gap-1.5">
                    <button class="btn-manage-photos px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] border border-blue-500/30 transition cursor-pointer" data-id="${e.id}">
                      Kelola Foto (${n})
                    </button>
                    <button class="btn-edit-album p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer" data-id="${e.id}" title="Edit Album">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button class="btn-delete-album p-1.5 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition cursor-pointer" data-id="${e.id}" data-title="${Z(e.title)}" title="Hapus">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `}).join(``)}
        </tbody>
      </table>
    </div>
  `}function fd(){document.getElementById(`btn-empty-create-album`)?.addEventListener(`click`,()=>{cd(`create`)}),document.querySelectorAll(`.btn-copy-admin-album-link`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-slug`),n=`${window.location.origin}/#galeri?album=${encodeURIComponent(t)}`;navigator.clipboard.writeText(n).then(()=>{s.success(`Tautan Tersalin`,`Tautan publik album telah disalin ke papan klip.`)}).catch(()=>{prompt(`Salin URL publik berikut:`,n)})})}),document.querySelectorAll(`.btn-manage-photos`).forEach(e=>{e.addEventListener(`click`,()=>{cd(`manage-photos`,e.getAttribute(`data-id`))})}),document.querySelectorAll(`.btn-edit-album`).forEach(e=>{e.addEventListener(`click`,()=>{cd(`edit`,e.getAttribute(`data-id`))})}),document.querySelectorAll(`.btn-delete-album`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-title`);if(await V.confirm({title:`Hapus Album Kegiatan?`,subtitle:`Album "${n}" akan dihapus dari daftar.`,message:`Foto asli di kawasan tidak akan terhapus dari server, hanya pengelompokan album ini yang dihapus. Lanjutkan?`,type:`danger`,confirmText:`Ya, Hapus Album`,cancelText:`Batal`,icon:`📁`}))try{await H.deleteAlbum(t),s.success(`Album Dihapus`,`Album "${n}" berhasil dihapus.`),await pd()}catch(e){s.error(`Gagal Menghapus Album`,e.message)}})})}async function pd(){await ad();let e=document.getElementById(`album-dynamic-container`);e&&ld(e)}async function md(e){let t={title:``,category:`Dokumentasi Silvikultur`,organizer:``,planting_zone_id:``,location_name:``,activity_date:new Date().toISOString().split(`T`)[0],description:``,is_published:!0,sort_order:0,cover_photo_id:null},n=Xu===`edit`&&Y,r=[];if(e.innerHTML=`
    <div class="flex items-center justify-center py-20 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-xs">Memuat formulir album kegiatan...</span>
    </div>
  `,n)try{let e=await H.getAdminAlbumDetail(Y);if(e.album)t=e.album,r=e.album.photos||[];else throw Error(`Data album tidak ditemukan di server.`)}catch(t){e.innerHTML=`
        <div class="zone-form-card space-y-6 text-center py-12">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-3xl text-rose-400">
            ⚠️
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Album Tidak Ditemukan</h3>
            <p class="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              ${Z(t.message||`Data album dengan ID tersebut tidak ditemukan atau telah dihapus.`)}
            </p>
          </div>
          <div class="pt-2">
            <button id="btn-err-back-to-albums" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition cursor-pointer">
              ← Kembali ke Daftar Album
            </button>
          </div>
        </div>
      `,document.getElementById(`btn-err-back-to-albums`)?.addEventListener(`click`,()=>{cd(`list`)});return}let i=[];try{i=(await H.getAvailablePhotosForAlbum({album_id:Y||``})).photos||[]}catch(e){console.warn(`Gagal memuat foto tersedia:`,e)}let a=new Set(r.map(e=>e.id)),o=t.cover_photo_id||(r.length>0?r[0].id:null);e.innerHTML=`
    <div class="zone-form-card space-y-6">
      <!-- Form Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div>
          <h3 class="text-lg font-bold text-white tracking-tight">
            ${n?`Sunting Album: ${Z(t.title)}`:`Buat Album Kegiatan Galeri Baru`}
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">
            Lengkapi formulir di bawah ini untuk mengelompokkan dokumentasi foto kegiatan secara tematik di galeri publik.
          </p>
        </div>
        <button id="btn-cancel-album-form" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer self-start sm:self-center">
          ✕ Batal &amp; Kembali
        </button>
      </div>

      <form id="album-form" class="space-y-6">
        <!-- BAGIAN 1: IDENTITAS KEGIATAN -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">1</span>
            <span>Identitas &amp; Klasifikasi Kegiatan</span>
          </div>

          <div class="space-y-4">
            <!-- Nama Kegiatan / Judul Album -->
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1.5">
                Nama Kegiatan / Judul Album <span class="text-rose-400 font-bold">*</span>
              </label>
              <input
                type="text"
                id="album-input-title"
                required
                value="${Z(t.title||``)}"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="Contoh: Kuliah Lapangan Mahasiswa Kehutanan USK 2026"
              />
              <p class="text-[11px] text-slate-400 mt-1">Nama ringkas dan informatif mengenai kegiatan dokumentasi ini.</p>
            </div>

            <!-- Kategori Silvikultur & Kawasan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">
                  Kategori Dokumentasi <span class="text-rose-400 font-bold">*</span>
                </label>
                <select id="album-input-category" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition">
                  ${rd.map(e=>`<option value="${e}" ${t.category===e?`selected`:``}>${e}</option>`).join(``)}
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Klasifikasi topik untuk filter galeri publik.</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">
                  Kawasan Terkait
                </label>
                <select id="album-input-zone" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition">
                  <option value="">-- Semua Kawasan (Dokumentasi Umum) --</option>
                  ${Yu.map(e=>`<option value="${e.id}" ${t.planting_zone_id===e.id?`selected`:``}>${e.name} (${e.zone_code})</option>`).join(``)}
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Pilih kawasan penanaman spesifik jika relevan.</p>
              </div>
            </div>

            <!-- Tanggal Pelaksanaan, Penyelenggara & Lokasi Plot -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-xs font-bold text-slate-200">Tanggal Pelaksanaan</label>
                  <button type="button" id="btn-set-today" class="text-[10px] text-blue-400 hover:underline">Hari Ini</button>
                </div>
                <input
                  type="date"
                  id="album-input-date"
                  value="${t.activity_date?t.activity_date.split(`T`)[0]:``}"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition font-mono"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">Penyelenggara / Mitra Pelaksana</label>
                <input
                  type="text"
                  id="album-input-organizer"
                  value="${Z(t.organizer||``)}"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Contoh: USK, BPDASHL, Tim IKHW"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">Plot / Titik Lapangan</label>
                <input
                  type="text"
                  id="album-input-location"
                  value="${Z(t.location_name||``)}"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Contoh: Blok A - Lereng Barat"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- BAGIAN 2: CATATAN & NARASI KEGIATAN -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">2</span>
            <span>Deskripsi &amp; Catatan Kegiatan</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1.5">
              Deskripsi Lengkap / Ringkasan Dokumentasi
            </label>
            <textarea
              id="album-input-desc"
              rows="4"
              class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed transition"
              placeholder="Jelaskan tujuan kegiatan silvikultur ini, peserta yang terlibat, kondisi cuaca di lapangan, jumlah pohon/bibit yang diobservasi, atau temuan spesifik saat monitoring..."
            >${Z(t.description||``)}</textarea>
            <p class="text-[11px] text-slate-400 mt-1">Deskripsi ini akan ditampilkan kepada pengunjung galeri saat membuka album kegiatan.</p>
          </div>
        </div>

        <!-- BAGIAN 3: PILIH FOTO DARI KOLEKSI KAWASAN SEKARANG -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">3</span>
            <span>Pilih Foto dari Galeri Kawasan &amp; Tentukan Sampul</span>
          </div>

          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-2">
              <p class="text-slate-400">
                Pilih foto yang relevan untuk dimasukkan ke dalam album ini. Klik tombol <span class="text-amber-400 font-bold">⭐ Jadikan Sampul</span> untuk memilih cover album.
              </p>
              <span id="form-selected-photo-count" class="font-bold text-blue-400 shrink-0 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/30">
                ${a.size} Foto Terpilih
              </span>
            </div>

            ${i.length===0?`
              <div class="p-6 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span>📸 Belum ada foto lain di sistem. Anda dapat membuat album ini terlebih dahulu dan mengunggah foto langsung setelah disimpan.</span>
              </div>
            `:`
              <div class="album-form-photo-grid">
                ${i.map(e=>{let t=a.has(e.id),n=o===e.id,r=e.thumbnail_url||e.file_url;return`
                    <div class="album-form-photo-item ${t?`selected`:``} ${n?`is-cover`:``}" data-photo-id="${e.id}">
                      ${n?`<span class="album-form-cover-badge">⭐ Sampul</span>`:``}
                      <img src="${Z(r)}" class="w-full h-24 object-cover" />
                      <div class="p-2 bg-slate-900/90 flex flex-col justify-between">
                        <span class="text-[10px] text-slate-300 font-medium truncate">${Z(e.title||`Foto #`+e.id)}</span>
                        <div class="mt-1.5 flex items-center justify-between pt-1 border-t border-slate-800">
                          <label class="inline-flex items-center gap-1 text-[10px] text-slate-300 cursor-pointer">
                            <input type="checkbox" class="form-photo-chk w-3.5 h-3.5 rounded text-blue-600 bg-slate-800 border-slate-700" value="${e.id}" ${t?`checked`:``}>
                            <span>Pilih</span>
                          </label>
                          <button type="button" class="btn-make-cover text-[9px] font-bold text-amber-400 hover:text-amber-300 ${t?``:`opacity-30 pointer-events-none`}" data-photo-id="${e.id}">
                            ⭐ Sampul
                          </button>
                        </div>
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            `}
          </div>
        </div>

        <!-- BAGIAN 4: PENGATURAN STATUS & PRIORITAS -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">4</span>
            <span>Pengaturan Status Publikasi &amp; Tampilan</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <!-- Modern Toggle Switch Publikasi -->
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-2">Status Publikasi Album</label>
              <div class="modern-toggle-wrap" id="toggle-wrap-published">
                <div class="modern-toggle ${t.is_published?`active`:``}" id="ui-toggle-published">
                  <input type="checkbox" id="album-input-published" ${t.is_published?`checked`:``} />
                  <div class="modern-toggle-slider"></div>
                </div>
                <div>
                  <span class="text-xs font-bold text-white block" id="toggle-label-published">
                    ${t.is_published?`Publik (Dapat Dilihat Umum)`:`Draft (Hanya Pengelola)`}
                  </span>
                  <span class="text-[11px] text-slate-400">
                    ${t.is_published?`Album aktif dan tampil di halaman galeri publik.`:`Disembunyikan dari publik hingga siap diterbitkan.`}
                  </span>
                </div>
              </div>
            </div>

            <!-- Urutan Prioritas Sort Order -->
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1.5">
                Urutan Prioritas Tampilan (Angka)
              </label>
              <input
                type="number"
                id="album-input-order"
                value="${t.sort_order||0}"
                min="0"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 font-mono transition"
                placeholder="0"
              />
              <p class="text-[11px] text-slate-400 mt-1">Angka lebih kecil tampil lebih awal di galeri (0 = standar urut tanggal).</p>
            </div>
          </div>
        </div>

        <!-- FORM ACTION BUTTONS -->
        <div class="pt-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button type="button" id="btn-cancel-album-action" class="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
            ← Kembali ke Daftar Album
          </button>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button type="submit" id="btn-submit-album-form" class="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              ${n?`💾 Simpan Perubahan Album`:`✨ Buat &amp; Publikasikan Album`}
            </button>
          </div>
        </div>
      </form>
    </div>
  `;let c=!1,l=()=>{c=!0};document.getElementById(`btn-set-today`)?.addEventListener(`click`,()=>{let e=document.getElementById(`album-input-date`);e&&(e.value=new Date().toISOString().split(`T`)[0],l())});let u=async()=>{(!c||await V.confirm({title:`Batalkan Perubahan?`,subtitle:`Perubahan pada formulir album belum disimpan.`,message:`Data yang telah Anda masukkan akan hilang jika Anda meninggalkan halaman ini sekarang. Apakah Anda yakin?`,type:`warning`,confirmText:`Ya, Tinggalkan`,cancelText:`Tetap di Sini`}))&&cd(`list`)};document.getElementById(`btn-breadcrumb-albums`)?.addEventListener(`click`,u),document.getElementById(`btn-cancel-album-form`)?.addEventListener(`click`,u),document.getElementById(`btn-cancel-album-action`)?.addEventListener(`click`,u);let d=document.getElementById(`toggle-wrap-published`),f=document.getElementById(`ui-toggle-published`),p=document.getElementById(`album-input-published`),m=document.getElementById(`toggle-label-published`);[`album-input-title`,`album-input-category`,`album-input-zone`,`album-input-organizer`,`album-input-location`,`album-input-date`,`album-input-desc`,`album-input-order`].forEach(e=>{let t=document.getElementById(e);t&&(t.addEventListener(`input`,l),t.addEventListener(`change`,l))}),d?.addEventListener(`click`,e=>{e.preventDefault(),p.checked=!p.checked,f.classList.toggle(`active`,p.checked),p.checked?m.textContent=`Publik (Dapat Dilihat Umum)`:m.textContent=`Draft (Hanya Pengelola)`,l()});let h=new Set(a),g=document.getElementById(`form-selected-photo-count`),_=()=>{document.querySelectorAll(`.album-form-photo-item`).forEach(e=>{let t=parseInt(e.getAttribute(`data-photo-id`),10),n=h.has(t),r=o===t;e.classList.toggle(`selected`,n),e.classList.toggle(`is-cover`,r);let i=e.querySelector(`.form-photo-chk`);i&&(i.checked=n);let a=e.querySelector(`.btn-make-cover`);a&&(a.classList.toggle(`opacity-30`,!n),a.classList.toggle(`pointer-events-none`,!n));let s=e.querySelector(`.album-form-cover-badge`);r&&!s?(s=document.createElement(`span`),s.className=`album-form-cover-badge`,s.textContent=`⭐ Sampul`,e.prepend(s)):!r&&s&&s.remove()}),g&&(g.textContent=`${h.size} Foto Terpilih`)};document.querySelectorAll(`.form-photo-chk`).forEach(e=>{e.addEventListener(`change`,e=>{let t=parseInt(e.target.value,10);e.target.checked?(h.add(t),o||=t):(h.delete(t),o===t&&(o=h.values().next().value||null)),l(),_()})}),document.querySelectorAll(`.btn-make-cover`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.getAttribute(`data-photo-id`),10);h.has(n)&&(o=n,l(),_())})}),document.getElementById(`album-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`album-input-title`).value.trim();if(!t){s.warning(`Validasi Diperlukan`,`Nama Kegiatan / Judul Album wajib diisi.`),document.getElementById(`album-input-title`)?.focus();return}let r={title:t,category:document.getElementById(`album-input-category`).value,organizer:document.getElementById(`album-input-organizer`).value.trim()||null,planting_zone_id:document.getElementById(`album-input-zone`).value||null,location_name:document.getElementById(`album-input-location`).value.trim()||null,activity_date:document.getElementById(`album-input-date`).value||null,sort_order:parseInt(document.getElementById(`album-input-order`).value,10)||0,description:document.getElementById(`album-input-desc`).value.trim()||null,is_published:p.checked,cover_photo_id:o||null,photo_ids:Array.from(h)},i=document.getElementById(`btn-submit-album-form`);i.disabled=!0,i.innerHTML=`
      <span class="loading-spinner"></span>
      <span>${n?`Menyimpan perubahan...`:`Membuat album...`}</span>
    `;try{if(n)await H.updateAlbum(Y,r),s.success(`Album Disimpan`,`Perubahan album "${r.title}" berhasil disimpan.`);else{let e=await H.createAlbum(r);s.success(`Album Dibuat`,`Album kegiatan "${r.title}" berhasil ditambahkan.`),e.album?.id&&(Y=e.album.id)}c=!1,await pd(),cd(`list`)}catch(e){s.error(`Gagal Menyimpan Album`,e.message),i.disabled=!1,i.innerHTML=n?`💾 Simpan Perubahan Album`:`✨ Buat &amp; Publikasikan Album`}})}async function hd(e){if(!Y){cd(`list`);return}e.innerHTML=`
    <div class="flex items-center justify-center py-20 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-xs">Memuat detail foto album kegiatan...</span>
    </div>
  `;let t;try{t=(await H.getAdminAlbumDetail(Y)).album}catch(e){s.error(`Gagal Memuat Foto Album`,e.message),cd(`list`);return}let n=t.photos||[];e.innerHTML=`
    <div class="space-y-6">
      <!-- Breadcrumb Nav -->
      <nav class="flex items-center gap-2 text-xs text-slate-400">
        <button id="btn-back-to-albums-list" class="hover:text-blue-400 transition cursor-pointer font-medium">
          ← Kembali ke Semua Album
        </button>
        <span class="text-slate-600">/</span>
        <span class="text-slate-300 font-medium truncate max-w-xs">${Z(t.title)}</span>
        <span class="text-slate-600">/</span>
        <span class="text-blue-400 font-semibold">Kelola Foto (${n.length})</span>
      </nav>

      <!-- Top Info Card -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-lg">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>${Z(t.title)}</span>
            </h3>
            <span class="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25">
              🏷️ ${Z(t.category||`Dokumentasi`)}
            </span>
            ${t.zone?.name?`
              <span class="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                🏞️ ${Z(t.zone.name)}
              </span>
            `:``}
            ${t.is_published?`
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span class="album-pulse-dot"></span>
                <span>Publik</span>
              </span>
            `:`
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                Draft
              </span>
            `}
          </div>
          <p class="text-xs text-slate-400 mt-1.5">
            Total <strong>${n.length} foto</strong> terkelompok dalam album ini. Anda dapat mengunggah foto langsung, menentukan foto sampul, menyunting keterangan/alt-text, atau mengatur urutan tampilan.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button class="btn-edit-album inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition cursor-pointer" data-id="${t.id}" title="Sunting rincian informasi album">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span>Edit Album</span>
          </button>
          <button id="btn-toggle-direct-upload" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>+ Unggah Foto Baru</span>
          </button>
          <button id="btn-open-photo-picker" class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 font-bold text-xs border border-blue-500/30 transition cursor-pointer" title="Pilih dari koleksi foto kawasan yang sudah ada">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Pilih dari Kawasan</span>
          </button>
        </div>
      </div>

      <!-- Direct Upload Section with Interactive Previews (Collapsible) -->
      <div id="direct-upload-box" class="${nd?``:`hidden`} bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl space-y-4 transition-all">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-blue-400 text-base">📤</span>
            <h4 class="text-sm font-bold text-white">Unggah Berkas Foto Langsung ke Album Ini</h4>
          </div>
          <span class="text-[11px] text-slate-400 font-mono">Format: JPG, JPEG, PNG, WebP (Maks 5 MB/foto)</span>
        </div>

        <form id="form-direct-upload" class="space-y-4">
          <!-- Dropzone Area -->
          <div>
            <div id="upload-dropzone" class="upload-dropzone-box">
              <input
                type="file"
                id="input-direct-upload-files"
                multiple
                accept="image/jpeg,image/png,image/webp,image/jpg"
                class="hidden"
              />
              <div class="flex flex-col items-center justify-center pointer-events-none">
                <svg class="w-10 h-10 text-blue-400/80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                <p class="text-xs font-bold text-white mb-1">Tarik &amp; Lepaskan Berkas Foto ke Sini, atau <span class="text-blue-400 underline">Pilih Berkas</span></p>
                <p class="text-[11px] text-slate-400">Pilih hingga 20 foto sekaligus dari komputer Anda.</p>
              </div>
            </div>

            <!-- Upload Queue Previews Container -->
            <div id="upload-preview-container" class="hidden">
              <div class="flex items-center justify-between mt-4 pb-2 border-b border-slate-800 text-xs">
                <span class="font-bold text-white" id="upload-preview-summary">0 foto dipilih</span>
                <button type="button" id="btn-clear-upload-queue" class="text-rose-400 hover:text-rose-300 text-[11px] font-semibold cursor-pointer">
                  Bersihkan Pilihan
                </button>
              </div>
              <div id="upload-previews-grid" class="upload-preview-grid">
                <!-- Dynamically rendered preview cards -->
              </div>
            </div>
          </div>

          <!-- Metadata Options for Uploaded Photos -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1">Keterangan / Caption Bawaan (Opsional)</label>
              <input
                type="text"
                id="input-direct-upload-caption"
                placeholder="Contoh: Dokumentasi tahapan awal penanaman bibit"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1">Alt Text Aksesibilitas (Opsional)</label>
              <input
                type="text"
                id="input-direct-upload-alt"
                placeholder="Deskripsi singkat foto untuk pembaca layar"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="chk-direct-upload-cover" class="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4" />
              <span>Jadikan foto pertama sebagai Foto Sampul Utama album</span>
            </label>

            <button
              type="submit"
              id="btn-submit-direct-upload"
              class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-blue-500/20 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span id="btn-submit-direct-upload-text">Mulai Unggah Foto</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Photos Grid Inside Album -->
      <div id="album-photos-grid">
        ${n.length===0?`
          <div class="p-14 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
            <span class="text-5xl block mb-3">🖼️</span>
            <h4 class="text-sm font-bold text-white">Album Ini Belum Memiliki Foto</h4>
            <p class="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Klik <strong>"+ Unggah Foto Baru"</strong> untuk mengunggah dari perangkat, atau <strong>"Pilih dari Kawasan"</strong> untuk menambahkan foto dokumentasi yang sudah ada di kawasan ini.
            </p>
          </div>
        `:`
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            ${n.map((e,r)=>{let i=t.cover_photo_id===e.id,a=e.thumbnail_url||e.file_url;return`
                <div class="relative group rounded-xl overflow-hidden bg-slate-950 border ${i?`border-amber-400 ring-2 ring-amber-400/30`:`border-slate-800`} transition-all flex flex-col justify-between" data-photo-id="${e.id}">
                  <div>
                    <!-- Photo Image Box (16:10) -->
                    <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                      <img src="${Z(a)}" alt="${Z(e.alt_text||e.title||``)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                      <!-- Top Badges -->
                      <div class="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-slate-300 border border-white/10 backdrop-blur-sm">
                          #${r+1}
                        </span>
                        ${i?`
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 shadow-md">
                            ⭐ Sampul
                          </span>
                        `:``}
                      </div>
                    </div>

                    <!-- Photo Details -->
                    <div class="p-3 space-y-1">
                      <div class="font-bold text-white text-xs truncate" title="${Z(e.title||`Foto #`+(r+1))}">
                        ${Z(e.title||`Foto #`+(r+1))}
                      </div>
                      <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed" title="${Z(e.caption||``)}">
                        ${Z(e.caption||`Belum ada keterangan khusus.`)}
                      </p>
                      ${e.alt_text?`
                        <div class="text-[10px] text-slate-500 truncate" title="Alt Text: ${Z(e.alt_text)}">
                          Alt: ${Z(e.alt_text)}
                        </div>
                      `:``}
                    </div>
                  </div>

                  <!-- Card Action Toolbar -->
                  <div class="p-2.5 pt-2 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-1 text-[11px]">
                    <div class="flex items-center gap-1">
                      <!-- Reorder Buttons -->
                      <button
                        class="btn-move-photo-prev p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer ${r===0?`opacity-30 pointer-events-none`:``}"
                        title="Pindahkan ke urutan sebelumnya"
                        data-index="${r}"
                      >
                        ◀
                      </button>
                      <button
                        class="btn-move-photo-next p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer ${r===n.length-1?`opacity-30 pointer-events-none`:``}"
                        title="Pindahkan ke urutan berikutnya"
                        data-index="${r}"
                      >
                        ▶
                      </button>
                    </div>

                    <div class="flex items-center gap-1">
                      ${i?``:`
                        <button
                          class="btn-set-as-cover p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
                          title="Jadikan Foto Sampul Utama"
                          data-photo-id="${e.id}"
                        >
                          ⭐
                        </button>
                      `}
                      <button
                        class="btn-edit-photo-meta p-1.5 rounded-lg bg-slate-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-300 border border-slate-700 transition cursor-pointer"
                        title="Sunting Keterangan / Alt Text"
                        data-photo-id="${e.id}"
                      >
                        ✏️
                      </button>
                      <button
                        class="btn-remove-from-album p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition cursor-pointer"
                        title="Keluarkan dari album ini (foto tetap di kawasan)"
                        data-photo-id="${e.id}"
                      >
                        ✕
                      </button>
                      <button
                        class="btn-delete-photo-permanent p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
                        title="Hapus foto ini secara permanen dari server"
                        data-photo-id="${e.id}"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              `}).join(``)}
          </div>
        `}
      </div>
    </div>
  `,document.getElementById(`btn-back-to-albums-list`)?.addEventListener(`click`,()=>cd(`list`)),document.getElementById(`btn-toggle-direct-upload`)?.addEventListener(`click`,()=>{nd=!nd;let e=document.getElementById(`direct-upload-box`);e&&e.classList.toggle(`hidden`,!nd)}),gd(e),document.getElementById(`btn-open-photo-picker`)?.addEventListener(`click`,()=>{bd(Y,n.map(e=>e.id))}),document.querySelectorAll(`.btn-set-as-cover`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=parseInt(t.getAttribute(`data-photo-id`),10);try{await H.updateAlbum(Y,{cover_photo_id:n}),s.success(`Foto Sampul Ditetapkan`,`Foto berhasil ditetapkan sebagai sampul utama album.`),await hd(e)}catch(e){s.error(`Gagal Menetapkan Sampul`,e.message)}})}),document.querySelectorAll(`.btn-edit-photo-meta`).forEach(t=>{t.addEventListener(`click`,()=>{let r=parseInt(t.getAttribute(`data-photo-id`),10),i=n.find(e=>e.id===r);i&&_d(i,e)})}),document.querySelectorAll(`.btn-move-photo-prev`).forEach(t=>{t.addEventListener(`click`,async()=>{let r=parseInt(t.getAttribute(`data-index`),10);if(r>0){let t=[...n],i=t[r];t[r]=t[r-1],t[r-1]=i;let a=t.map(e=>e.id);try{await H.reorderAlbumPhotos(Y,a),s.success(`Urutan Diperbarui`,`Urutan foto berhasil dipindahkan.`),await hd(e)}catch(e){s.error(`Gagal Mengubah Urutan`,e.message)}}})}),document.querySelectorAll(`.btn-move-photo-next`).forEach(t=>{t.addEventListener(`click`,async()=>{let r=parseInt(t.getAttribute(`data-index`),10);if(r<n.length-1){let t=[...n],i=t[r];t[r]=t[r+1],t[r+1]=i;let a=t.map(e=>e.id);try{await H.reorderAlbumPhotos(Y,a),s.success(`Urutan Diperbarui`,`Urutan foto berhasil dipindahkan.`),await hd(e)}catch(e){s.error(`Gagal Mengubah Urutan`,e.message)}}})}),document.querySelectorAll(`.btn-remove-from-album`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-photo-id`);if(await V.confirm({title:`Keluarkan Foto dari Album?`,subtitle:`Foto akan dilepas dari daftar koleksi album ini.`,message:`Foto asli di kawasan tetap aman dan tidak akan dihapus dari server. Lanjutkan?`,type:`warning`,confirmText:`Ya, Keluarkan`,cancelText:`Batal`,icon:`🖼️`}))try{await H.removePhotoFromAlbum(Y,n),s.info(`Foto Dikeluarkan`,`Foto telah dilepas dari album ini.`),await hd(e)}catch(e){s.error(`Gagal Mengeluarkan Foto`,e.message)}})}),document.querySelectorAll(`.btn-delete-photo-permanent`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-photo-id`);if(await V.confirm({title:`Hapus Foto Permanen?`,subtitle:`PERINGATAN: File foto dan catatannya akan dihapus permanen dari server.`,message:`File foto dan catatannya akan dihapus jika tidak digunakan di album/fitur lain. Tindakan ini tidak dapat dibatalkan. Lanjutkan?`,type:`danger`,confirmText:`Ya, Hapus Permanen`,cancelText:`Batal`,icon:`🗑️`}))try{await H.deleteAlbumPhotoPermanently(Y,n),s.success(`Foto Dihapus`,`Foto berhasil dihapus secara permanen dari server.`),await hd(e)}catch(e){s.error(`Gagal Menghapus Foto`,e.message)}})})}function gd(e){let t=document.getElementById(`upload-dropzone`),n=document.getElementById(`input-direct-upload-files`),r=document.getElementById(`upload-preview-container`),i=document.getElementById(`upload-previews-grid`),a=document.getElementById(`upload-preview-summary`),o=document.getElementById(`btn-clear-upload-queue`),c=document.getElementById(`btn-submit-direct-upload`),l=document.getElementById(`btn-submit-direct-upload-text`),u=document.getElementById(`form-direct-upload`);if(!t||!n)return;t.addEventListener(`click`,()=>n.click()),[`dragenter`,`dragover`].forEach(e=>{t.addEventListener(e,e=>{e.preventDefault(),e.stopPropagation(),t.classList.add(`dragover`)})}),[`dragleave`,`drop`].forEach(e=>{t.addEventListener(e,e=>{e.preventDefault(),e.stopPropagation(),t.classList.remove(`dragover`)})}),t.addEventListener(`drop`,e=>{let t=e.dataTransfer;t&&t.files&&t.files.length>0&&d(t.files)}),n.addEventListener(`change`,()=>{n.files&&n.files.length>0&&(d(n.files),n.value=``)}),o?.addEventListener(`click`,()=>{X.forEach(e=>{e.previewUrl&&URL.revokeObjectURL(e.previewUrl)}),X=[],f()});function d(e){let t=[`image/jpeg`,`image/jpg`,`image/png`,`image/webp`];Array.from(e).forEach(e=>{if(X.length>=20){s.warning(`Batas Maksimum`,`Maksimal 20 berkas sekaligus yang dapat dipilih.`);return}let n=!0,r=``;t.includes(e.type.toLowerCase())?e.size>5242880&&(n=!1,r=`Ukuran > 5 MB`):(n=!1,r=`Format bukan JPG/PNG/WebP`);let i=n?URL.createObjectURL(e):``,a=X.length===0;X.push({id:Math.random().toString(36).substring(2,9),file:e,name:e.name,size:e.size,sizeFormatted:Sd(e.size),previewUrl:i,isValid:n,errorMsg:r,isCover:a&&n})}),f()}function f(){if(!r||!i)return;if(X.length===0){r.classList.add(`hidden`),c&&(c.disabled=!0),l&&(l.textContent=`Mulai Unggah Foto`);return}r.classList.remove(`hidden`);let e=X.filter(e=>e.isValid).length,t=X.length-e;a&&(a.innerHTML=`
        <span><strong>${X.length} berkas dipilih</strong> (${e} valid${t>0?`, <span class="text-rose-400 font-bold">${t} tidak memenuhi syarat</span>`:``})</span>
      `),i.innerHTML=X.map(e=>`
        <div class="upload-preview-card ${e.is_cover||e.isCover?`is-cover`:``} ${e.isValid?``:`is-invalid`}" data-queue-id="${e.id}">
          <button type="button" class="upload-preview-remove-btn" title="Hapus dari antrean" data-remove-id="${e.id}">✕</button>

          <div class="upload-preview-thumb-wrap">
            ${e.isValid?`
              <img src="${e.previewUrl}" alt="${Z(e.name)}" />
            `:`
              <div class="w-full h-full flex flex-col items-center justify-center p-2 text-rose-400 bg-rose-950/40 text-center">
                <span class="text-xl">⚠️</span>
                <span class="text-[9px] mt-1 font-semibold leading-tight">${Z(e.errorMsg)}</span>
              </div>
            `}

            ${e.isValid?`
              <button type="button" class="upload-preview-cover-btn ${e.isCover?`active`:``}" data-set-cover-id="${e.id}">
                ${e.isCover?`⭐ Sampul`:`Jadikan Sampul`}
              </button>
            `:``}
          </div>

          <div class="upload-preview-info">
            <span class="text-[11px] font-medium text-slate-200 truncate block" title="${Z(e.name)}">${Z(e.name)}</span>
            <div class="flex items-center justify-between mt-1 text-[10px] text-slate-400">
              <span>${e.sizeFormatted}</span>
              ${e.isValid?`<span class="text-emerald-400 font-bold">Siap</span>`:`<span class="text-rose-400 font-bold">Ditolak</span>`}
            </div>
          </div>
        </div>
      `).join(``),i.querySelectorAll(`.upload-preview-remove-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-remove-id`),r=X.find(e=>e.id===n);if(r&&r.previewUrl&&URL.revokeObjectURL(r.previewUrl),X=X.filter(e=>e.id!==n),r&&r.isCover){let e=X.find(e=>e.isValid);e&&(e.isCover=!0)}f()})}),i.querySelectorAll(`.upload-preview-cover-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-set-cover-id`);X.forEach(e=>{e.isCover=e.id===n}),f()})}),c&&(c.disabled=e===0||t>0),l&&(t>0?l.textContent=`Hapus ${t} Berkas Bermasalah Terlebih Dahulu`:l.textContent=`Unggah ${e} Foto ke Album`)}u?.addEventListener(`submit`,async t=>{t.preventDefault();let n=X.filter(e=>e.isValid);if(n.length===0){s.warning(`Peringatan`,`Silakan pilih setidaknya satu file foto yang valid untuk diunggah.`);return}let r=document.getElementById(`input-direct-upload-caption`),i=document.getElementById(`input-direct-upload-alt`),a=document.getElementById(`chk-direct-upload-cover`),o=new FormData;n.forEach(e=>{o.append(`photos[]`,e.file)}),r?.value.trim()&&o.append(`caption`,r.value.trim()),i?.value.trim()&&o.append(`alt_text`,i.value.trim()),(n.find(e=>e.isCover)||a?.checked)&&o.append(`is_cover`,`1`);try{c.disabled=!0,c.innerHTML=`
        <span class="loading-spinner"></span>
        <span>Mengunggah ${n.length} foto...</span>
      `,await H.uploadPhotosToAlbum(Y,o),s.success(`Foto Berhasil Diunggah`,`${n.length} foto kegiatan berhasil ditambahkan ke album.`),X.forEach(e=>{e.previewUrl&&URL.revokeObjectURL(e.previewUrl)}),X=[],nd=!1,await hd(e)}catch(e){s.error(`Gagal Mengunggah Foto`,e.message),c.disabled=!1,c.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>Mulai Unggah Foto</span>
      `}})}function _d(e,t){let n=document.getElementById(`album-photo-edit-modal`),r=document.getElementById(`edit-photo-id`),i=document.getElementById(`edit-photo-thumb`),a=document.getElementById(`edit-photo-info`),o=document.getElementById(`edit-photo-title`),c=document.getElementById(`edit-photo-caption`),l=document.getElementById(`edit-photo-alt`),u=document.getElementById(`form-edit-photo-meta`);n&&(r&&(r.value=e.id),i&&(i.src=e.thumbnail_url||e.file_url||``),a&&(a.textContent=e.title||`Foto #`+e.id),o&&(o.value=e.title||``),c&&(c.value=e.caption||``),l&&(l.value=e.alt_text||``),n.classList.remove(`hidden`),u&&(u.onsubmit=async n=>{n.preventDefault();let r=document.getElementById(`btn-save-edit-photo`);r&&(r.disabled=!0,r.textContent=`Menyimpan...`);try{await H.updateAlbumPhotoMetadata(Y,e.id,{title:o?.value.trim()||null,caption:c?.value.trim()||null,alt_text:l?.value.trim()||null}),s.success(`Keterangan Disimpan`,`Metadata foto berhasil diperbarui.`),vd(),t&&await hd(t)}catch(e){s.error(`Gagal Menyimpan Keterangan`,e.message),r&&(r.disabled=!1,r.textContent=`Simpan Keterangan`)}}))}function vd(){let e=document.getElementById(`album-photo-edit-modal`);e&&e.classList.add(`hidden`)}var yd=new Set;async function bd(e,t=[]){let n=document.getElementById(`album-photo-modal`),r=document.getElementById(`modal-photo-list`),i=document.getElementById(`modal-selected-count`),a=document.getElementById(`btn-submit-add-photos`);if(n&&r){n.classList.remove(`hidden`),yd=new Set,i.textContent=`0 foto terpilih`,a.disabled=!0,r.innerHTML=`
    <div class="flex items-center justify-center py-16 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-xs">Memuat foto kawasan tersedia...</span>
    </div>
  `;try{let n=(await H.getAvailablePhotosForAlbum({album_id:e})).photos||[];if(n.length===0){r.innerHTML=`
        <div class="p-8 text-center text-slate-400">
          <span class="text-3xl block mb-2">📸</span>
          <p class="text-xs">Tidak ada foto baru yang tersedia untuk ditambahkan ke album ini.</p>
        </div>
      `;return}r.innerHTML=`
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        ${n.map(e=>{let n=t.includes(e.id),r=e.thumbnail_url||e.file_url;return`
            <label class="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer select-none group ${n?`opacity-40 pointer-events-none`:``}">
              <input type="checkbox" class="modal-photo-checkbox hidden" value="${e.id}" ${n?`disabled`:``} />
              <div class="h-28 overflow-hidden">
                <img src="${Z(r)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div class="photo-selection-check absolute top-2 right-2 w-6 h-6 rounded-lg bg-slate-900/80 border border-slate-600 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <div class="p-2 bg-slate-900/90 text-[11px] truncate text-slate-300">
                ${Z(e.title||`Foto #`+e.id)}
              </div>
            </label>
          `}).join(``)}
      </div>
    `,r.querySelectorAll(`.modal-photo-checkbox`).forEach(e=>{e.addEventListener(`change`,()=>{let t=parseInt(e.value,10),n=e.closest(`label`);e.checked?(yd.add(t),n.classList.add(`border-blue-500`,`ring-2`,`ring-blue-500/30`),n.querySelector(`.photo-selection-check`).classList.add(`bg-blue-600`,`border-blue-400`)):(yd.delete(t),n.classList.remove(`border-blue-500`,`ring-2`,`ring-blue-500/30`),n.querySelector(`.photo-selection-check`).classList.remove(`bg-blue-600`,`border-blue-400`));let r=yd.size;i.textContent=`${r} foto terpilih`,a.disabled=r===0})}),a.onclick=async()=>{if(yd.size!==0){a.disabled=!0,a.textContent=`Menambahkan...`;try{await H.addPhotosToAlbum(e,Array.from(yd)),s.success(`Foto Ditambahkan`,`${yd.size} foto berhasil ditambahkan ke album.`),xd();let t=document.getElementById(`album-dynamic-container`);t&&await hd(t)}catch(e){s.error(`Gagal Menambahkan Foto`,e.message),a.disabled=!1,a.textContent=`Tambahkan ke Album`}}}}catch(e){r.innerHTML=`<div class="p-8 text-center text-rose-400 text-xs">Gagal memuat foto: ${e.message}</div>`}}}function xd(){let e=document.getElementById(`album-photo-modal`);e&&e.classList.add(`hidden`)}function Sd(e){if(!e||e===0)return`0 B`;let t=1024,n=[`B`,`KB`,`MB`,`GB`],r=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/t**r).toFixed(1))+` `+n[r]}function Z(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var Cd=`ecoland_admin_theme`;function wd(){try{return localStorage.getItem(Cd)===`light`?`light`:`dark`}catch(e){return console.warn(`localStorage is not available for reading theme:`,e),`dark`}}function Td(e){let t=e===`light`?`light`:`dark`;try{localStorage.setItem(Cd,t)}catch(e){console.warn(`localStorage is not available for writing theme:`,e)}return Dd(t),t}function Ed(){return Td(wd()===`dark`?`light`:`dark`)}function Dd(e){let t=e===`dark`;document.documentElement.setAttribute(`data-admin-theme`,e),t?(document.documentElement.classList.add(`dark`),document.documentElement.classList.remove(`light`)):(document.documentElement.classList.add(`light`),document.documentElement.classList.remove(`dark`));let n=document.getElementById(`view-admin`);n&&(n.classList.toggle(`theme-dark`,t),n.classList.toggle(`theme-light`,!t)),Od(e),window.dispatchEvent(new CustomEvent(`ecoland-theme-changed`,{detail:{theme:e}}))}function Od(e){let t=document.getElementById(`btn-admin-theme-toggle`);if(!t)return;let n=e===`dark`,r=document.getElementById(`theme-toggle-moon-icon`),i=document.getElementById(`theme-toggle-sun-icon`);r&&i&&(n?(r.classList.remove(`hidden`),i.classList.add(`hidden`)):(r.classList.add(`hidden`),i.classList.remove(`hidden`)));let a=n?`Mode Gelap aktif. Klik untuk beralih ke Mode Terang`:`Mode Terang aktif. Klik untuk beralih ke Mode Gelap`;t.setAttribute(`aria-label`,a),t.setAttribute(`title`,n?`Mode Gelap (Klik untuk beralih ke Mode Terang)`:`Mode Terang (Klik untuk beralih ke Mode Gelap)`)}function kd(){Dd(wd());let e=document.getElementById(`btn-admin-theme-toggle`);e&&!e.hasAttribute(`data-theme-bound`)&&(e.setAttribute(`data-theme-bound`,`true`),e.addEventListener(`click`,e=>{e.preventDefault(),Ed()})),window._adminThemeStorageBound||(window._adminThemeStorageBound=!0,window.addEventListener(`storage`,e=>{e.key===Cd&&Dd(e.newValue===`light`?`light`:`dark`)}))}kd();var Ad=`dashboard`,jd=null,Md=null,Nd=null,Pd=null,Fd=null,Id=null,Ld=`list`,Rd=null,zd=[],Q=null,Bd=[...c],Vd=`all`;async function Hd({onPublicTourUpdate:e,onExitAdminToTour:t}){kd(),await pc(),_c()&&Gu(),dc(async e=>{if(e){Gu();let e=sessionStorage.getItem(`admin_redirect_hash`);sessionStorage.removeItem(`admin_redirect_hash`),await qd(),Ud(),e&&e.startsWith(`#admin`)?(window.location.hash=e,Xd(e)):window.location.hash.startsWith(`#admin`)?Xd(window.location.hash):(window.location.hash=`#admin/dashboard`,$(`dashboard`,null,!1))}else Ku(),window.location.hash&&window.location.hash.startsWith(`#admin`)&&(window.location.hash=`beranda`)});try{let[e,t]=await Promise.all([H.getScenes(),H.getCustomSceneNames().catch(()=>({}))]);e&&e.length>0?e.forEach(e=>{let n=Bd.find(t=>t.id===e.id);n&&(n.name=t[e.id]||e.name||n.name,n.description=e.description??n.description,n.planting_zone_id=e.planting_zone_id??n.planting_zone_id,n.status=e.status??n.status,e.initialViewParameters&&(n.initialViewParameters={...n.initialViewParameters,...e.initialViewParameters}),e.initialView&&(n.initialView={...n.initialView,...e.initialView}))}):t&&Bd.forEach(e=>{t[e.id]&&(e.name=t[e.id])})}catch(e){console.warn(`Gagal sinkronisasi data scene server:`,e)}zd=await H.getHotspots(),Q=new Sc({scenes:Bd,getHotspots:()=>zd,onHotspotsChanged:t=>{zd=t,rf(),e&&e(zd)},onSceneSwitchRequest:e=>{Q.setScene(e)}}),Q.init(),window.__editorInstance=Q,Bd.length>0&&(Q.currentSceneId=Bd[0].id),tf(t),Ec({scenes:Bd,getHotspots:()=>zd,onRestoreComplete:async()=>{zd=await H.getHotspots(),Q.renderHotspotsOnCurrentScene(),Q.renderHotspotsList(),nf(),e&&e(zd)}}),jc({scenes:Bd,onSettingsUpdated:()=>{}}),Wd(),Ud(),_c()?(await qd(),window.location.hash.startsWith(`#admin`)?Xd(window.location.hash):nf()):window.location.hash&&window.location.hash.startsWith(`#admin`)&&(sessionStorage.setItem(`admin_redirect_hash`,window.location.hash),window.location.href=`/login`),rf()}function Ud(){let e=H.getUser()||{name:`Administrator`,username:`admin`,email:`admin@ikhw.org`,role:`administrator`},t=e.name||e.username||`Administrator`,n=e.email||`admin@ikhw.org`,r={administrator:`Administrator`,admin:`Admin Sistem`,superadmin:`Super Admin`,petugas_penanaman:`Petugas Penanaman`,editor_konten:`Editor Konten`}[e.role]||e.role||`Petugas Penanaman`,i=e.role===`admin`||e.role===`superadmin`||e.role===`administrator`,a=t.trim().split(/\s+/).filter(Boolean),o=a.length>=2?(a[0][0]+a[1][0]).toUpperCase():t.substring(0,2).toUpperCase(),s=document.getElementById(`topbar-user-avatar`),c=document.getElementById(`dropdown-user-avatar-lg`),l=document.getElementById(`topbar-user-name`),u=document.getElementById(`dropdown-user-fullname`),d=document.getElementById(`topbar-user-role`),f=document.getElementById(`dropdown-user-role-badge`),p=document.getElementById(`dropdown-user-email`),m=document.getElementById(`sidebar-user-avatar`),h=document.getElementById(`sidebar-user-name`),g=document.getElementById(`sidebar-user-email`);s&&(s.textContent=o||`AD`),c&&(c.textContent=o||`AD`),l&&(l.textContent=t),u&&(u.textContent=t),p&&(p.textContent=n),d&&(d.textContent=r,d.className=e.role===`petugas_penanaman`?`text-[10px] text-sky-400 font-medium leading-none mt-0.5`:e.role===`editor_konten`?`text-[10px] text-amber-400 font-medium leading-none mt-0.5`:`text-[10px] text-blue-400 font-medium leading-none mt-0.5`),f&&(f.textContent=r,f.className=e.role===`petugas_penanaman`?`profile-dropdown-role-badge inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20`:e.role===`editor_konten`?`profile-dropdown-role-badge inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20`:`profile-dropdown-role-badge inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20`),m&&(m.textContent=o||`AD`),h&&(h.textContent=t),g&&(g.textContent=n);let _=i;document.querySelectorAll(`[data-admin-tab="users"], [data-admin-tab="settings"]`).forEach(e=>{_?e.style.opacity=`1`:(e.style.opacity=`0.45`,e.setAttribute(`title`,`Menu ini hanya dapat dikelola oleh Administrator Sistem`))})}function Wd(){let e=document.getElementById(`admin-profile-dropdown-root`),t=document.getElementById(`btn-admin-profile-toggle`),n=document.getElementById(`admin-profile-menu`),r=document.getElementById(`topbar-profile-chevron`);if(!t||!n)return;let i=()=>{n.classList.add(`hidden`),t.setAttribute(`aria-expanded`,`false`),r&&r.classList.remove(`rotated`)},a=()=>{n.classList.remove(`hidden`),t.setAttribute(`aria-expanded`,`true`),r&&r.classList.add(`rotated`)};t.hasAttribute(`data-bound`)||(t.setAttribute(`data-bound`,`true`),t.addEventListener(`click`,e=>{e.stopPropagation(),t.getAttribute(`aria-expanded`)===`true`?i():a()})),document.querySelectorAll(`.profile-menu-nav-item`).forEach(e=>{e.hasAttribute(`data-bound`)||(e.setAttribute(`data-bound`,`true`),e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-target-tab`);i(),t&&$(t)}))}),document.addEventListener(`click`,t=>{e&&!e.contains(t.target)&&i()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!n.classList.contains(`hidden`)&&(i(),t.focus())})}function Gd(e){let t=document.getElementById(`topbar-zone-switcher-container`);t&&([`dashboard`,`zones`,`trees`,`reports`].includes(e)?t.classList.remove(`hidden`):t.classList.add(`hidden`))}function Kd(e,t=null,n=null,r=null){let i=document.getElementById(`admin-header-title`),a=document.getElementById(`admin-breadcrumb-active`),o=document.getElementById(`breadcrumb-category-wrapper`),s=document.getElementById(`breadcrumb-category-title`),c=document.getElementById(`breadcrumb-btn-root`);c&&!c.hasAttribute(`data-bound`)&&(c.setAttribute(`data-bound`,`true`),c.addEventListener(`click`,()=>$(`dashboard`)));let l=null,u=`Dashboard Ringkasan Virtual Tour & Silvikultur`,d=`Dashboard Ringkasan`;e===`dashboard`?(l=null,u=`Dashboard Ringkasan Virtual Tour & Silvikultur`,d=`Ringkasan`):e===`zones`?(l=`2. Persiapan`,t===`create`||r===`create`?(u=`Formulir Tambah Kawasan Baru`,d=`Tambah Kawasan`):t===`edit`||r===`edit`?(u=`Sunting Informasi & Batas Kawasan`,d=`Edit Kawasan`):t===`detail`?(u=`Detail Informasi Kawasan (8 Tab)`,d=`Detail Kawasan`):t===`gallery`?(u=`Galeri Foto Dokumentasi Kawasan`,d=`Galeri Kawasan`):(u=`Manajemen Kawasan / Lahan Penanaman Pohon`,d=`Manajemen Kawasan`)):e===`trees`?t===`species`?(l=`2. Persiapan`,r===`create`||n===`create`?(u=`Formulir Tambah Jenis Pohon Baru`,d=`Tambah Spesies`):r===`edit`?(u=`Sunting Data Taksonomi & Silvikultur Pohon`,d=`Edit Spesies`):(u=`Master Jenis Pohon (Silvikultur)`,d=`Master Jenis Pohon`)):t===`activities`?(l=`3. Pelaksanaan`,r===`create`||n===`create`?(u=`Catat Kegiatan Penanaman Baru`,d=`Catat Penanaman`):r===`edit`?(u=`Sunting Catatan Batch & Penanaman`,d=`Edit Penanaman`):(u=`Kegiatan Penanaman & Batch Bibit`,d=`Kegiatan Penanaman`)):t===`surveys`?(l=`4. Pemantauan & Perawatan`,r===`create`||n===`create`?(u=`Catat Hasil Sensus Pemantauan Tanaman`,d=`Catat Pemantauan`):r===`edit`?(u=`Sunting Data Sensus Pemantauan Tanaman`,d=`Edit Pemantauan`):(u=`Pemantauan Pertumbuhan & Sensus Pohon`,d=`Pemantauan Tanaman`)):t===`maintenance`?(l=`4. Pemantauan & Perawatan`,r===`create`||n===`create`?(u=`Catat Tindakan Perawatan / Penyulaman`,d=`Catat Perawatan`):r===`edit`?(u=`Sunting Catatan Tindakan Perawatan`,d=`Edit Perawatan`):(u=`Perawatan, Pemupukan & Penyulaman`,d=`Perawatan & Penyulaman`)):(l=`1. Dashboard`,u=`Statistik & Ringkasan Penanaman`,d=`Statistik Penanaman`):e===`panoramas`?(l=`5. Dokumentasi Digital`,u=`Manajemen Panorama 360° Kawasan`,d=`Manajemen Panorama`):e===`editor`?(l=`5. Dokumentasi Digital`,u=`Visual Hotspot & Spatial Editor Marzipano`,d=`Editor Hotspot`):e===`albums`?(l=`5. Dokumentasi Digital`,t===`create`?(u=`Formulir Tambah Album Kegiatan Baru`,d=`Tambah Album`):t===`edit`?(u=`Sunting Informasi & Koleksi Album`,d=`Edit Album`):t===`manage-photos`?(u=`Pengelolaan Foto & Urutan Album`,d=`Kelola Foto`):(u=`Manajemen Album Kegiatan Galeri Kawasan`,d=`Album Kegiatan`)):e===`reports`?(l=`6. Evaluasi & Pelaporan`,t===`per-kawasan`?(u=`Laporan Agregat per Kawasan`,d=`Rekapitulasi Kawasan`):t===`per-pohon`?(u=`Laporan Distribusi per Jenis Pohon`,d=`Rekapitulasi Pohon`):t===`ekspor`?(u=`Pusat Ekspor & Unduhan Data`,d=`Ekspor Data`):(u=`Laporan & Statistik Penanaman Komprehensif`,d=`Laporan & Statistik`)):e===`settings`?(l=`7. Pengelolaan Sistem`,u=`Pengaturan Sistem & Identitas Organisasi`,d=`Pengaturan & Identitas`):e===`users`?(l=`7. Pengelolaan Sistem`,u=`Manajemen Pengguna & Hak Akses`,d=`Kelola Pengguna`):e===`activity-logs`?(l=`7. Pengelolaan Sistem`,u=`Log Histori Aktivitas & Jejak Audit`,d=`Log Aktivitas`):e===`backup`&&(l=`7. Pengelolaan Sistem`,u=`Cadangan & Pemulihan Basis Data`,d=`Cadangan Data`),i&&(i.textContent=u),a&&(a.textContent=d),o&&s&&(l?(s.textContent=l,o.classList.remove(`hidden`)):o.classList.add(`hidden`))}async function qd(){if(!_c())return;let e=document.getElementById(`topbar-zone-switcher`);if(e)try{let t=(await H.getZones({sort_by:`name`,sort_dir:`asc`})).zones||[];e.innerHTML=`<option value="all" class="bg-slate-900 text-white">Semua Kawasan (Agregat)</option>`,t.forEach(t=>{let n=document.createElement(`option`);n.value=t.id,n.className=`bg-slate-900 text-white`,n.textContent=`${t.name} ${t.zone_code?`(${t.zone_code})`:``}`,e.appendChild(n)}),Vd&&(e.value=Vd),e.hasAttribute(`data-bound`)||(e.setAttribute(`data-bound`,`true`),e.addEventListener(`change`,()=>{Vd=e.value,nf()}))}catch(e){console.warn(`Gagal memuat switcher kawasan:`,e)}}function Jd(e,t=null,n=null,r=null){return e===`dashboard`?`#admin/dashboard`:e===`zones`?t===`create`||r===`create`?`#admin/zones/create`:(t===`edit`||r===`edit`)&&n?`#admin/zones/${n}/edit`:t===`detail`&&n?`#admin/zones/${n}/detail`:t===`gallery`?`#admin/zones/gallery`:`#admin/zones`:e===`trees`?t&&t!==`dashboard`?r===`create`||n===`create`?`#admin/trees/${t}/create`:(r===`edit`||r===`detail`)&&n?`#admin/trees/${t}/${n}/edit`:`#admin/trees/${t}`:`#admin/trees/dashboard`:e===`panoramas`?`#admin/panoramas`:e===`editor`?`#admin/editor`:e===`albums`?t===`create`?`#admin/albums/create`:t===`edit`&&n?`#admin/albums/${n}/edit`:t===`manage-photos`&&n?`#admin/albums/${n}/photos`:`#admin/albums`:e===`settings`?`#admin/settings`:e===`reports`?t&&t!==`rekap`?`#admin/reports/${t}`:`#admin/reports`:e===`users`?`#admin/users`:e===`activity-logs`?`#admin/activity-logs`:e===`backup`?`#admin/backup`:`#admin/dashboard`}function Yd(e){if(!e)return{tab:`dashboard`,subTab:null,extraId:null,action:null};let t=e.replace(/^[#/]+/,``).split(`/`).filter(Boolean);if(t[0]!==`admin`)return null;let n=t[1]||`dashboard`,r=t[2]||null,i=t[3]||null,a=t[4]||null;if(n===`kawasan`||n===`zones`)return r===`create`?{tab:`zones`,subTab:`create`,extraId:null,action:`create`}:r===`gallery`?{tab:`zones`,subTab:`gallery`,extraId:null,action:null}:r&&i===`edit`?{tab:`zones`,subTab:`edit`,extraId:r,action:`edit`}:r===`edit`&&i?{tab:`zones`,subTab:`edit`,extraId:i,action:`edit`}:r&&i===`detail`?{tab:`zones`,subTab:`detail`,extraId:r,action:`detail`}:r===`detail`&&i?{tab:`zones`,subTab:`detail`,extraId:i,action:`detail`}:r&&r!==`list`?{tab:`zones`,subTab:`detail`,extraId:r,action:`detail`}:{tab:`zones`,subTab:`list`,extraId:null,action:null};let o={species:`species`,"tree-species":`species`,activities:`activities`,surveys:`surveys`,maintenance:`maintenance`};if(o[n]){let e=o[n];return r===`create`?{tab:`trees`,subTab:e,extraId:null,action:`create`}:r&&i===`edit`?{tab:`trees`,subTab:e,extraId:r,action:`edit`}:r===`edit`&&i?{tab:`trees`,subTab:e,extraId:i,action:`edit`}:r&&r!==`list`?{tab:`trees`,subTab:e,extraId:r,action:`edit`}:{tab:`trees`,subTab:e,extraId:null,action:null}}if(n===`trees`){let e=r===`tree-species`?`species`:r||`dashboard`;if([`species`,`activities`,`surveys`,`maintenance`].includes(e)){if(i===`create`)return{tab:`trees`,subTab:e,extraId:null,action:`create`};if(i&&a===`edit`)return{tab:`trees`,subTab:e,extraId:i,action:`edit`};if(i===`edit`&&a)return{tab:`trees`,subTab:e,extraId:a,action:`edit`};if(i&&i!==`list`)return{tab:`trees`,subTab:e,extraId:i,action:`edit`}}return{tab:`trees`,subTab:e,extraId:null,action:null}}return n===`logs`||n===`activity-logs`?{tab:`activity-logs`,subTab:null,extraId:null,action:null}:n===`albums`||n===`album`?r===`create`?{tab:`albums`,subTab:`create`,extraId:null,action:`create`}:r&&i===`edit`?{tab:`albums`,subTab:`edit`,extraId:r,action:`edit`}:r&&(i===`photos`||i===`manage-photos`)?{tab:`albums`,subTab:`manage-photos`,extraId:r,action:`manage-photos`}:r&&r!==`list`?{tab:`albums`,subTab:`edit`,extraId:r,action:`edit`}:{tab:`albums`,subTab:`list`,extraId:null,action:null}:n===`reports`?{tab:`reports`,subTab:r||`rekap`,extraId:null,action:null}:{tab:n,subTab:r,extraId:i,action:null}}function Xd(e){let t=Yd(e);if(t){if(!_c()){sessionStorage.setItem(`admin_redirect_hash`,e),window.location.href=`/login`;return}$(t.tab,t.subTab,!1,t.extraId,t.action)}}function Zd(e=`dashboard`,t=null){if(!_c()){sessionStorage.setItem(`admin_redirect_hash`,Jd(e,t)),window.location.href=`/login`;return}let n=Jd(e,t);window.location.hash=n,$(e,t,!1)}function Qd(){let e=document.getElementById(`admin-sidebar`),t=document.getElementById(`admin-sidebar-backdrop`);e&&e.classList.add(`-translate-x-full`),t&&t.classList.add(`hidden`)}function $d(){let e=document.getElementById(`admin-sidebar`),t=document.getElementById(`admin-sidebar-backdrop`);e&&e.classList.remove(`-translate-x-full`),t&&t.classList.remove(`hidden`)}function ef(){let e=document.getElementById(`admin-sidebar`),t=document.getElementById(`admin-main-wrapper`),n=document.getElementById(`btn-toggle-sidebar-collapse`),r=document.getElementById(`btn-sidebar-collapse-toggle`),i=e=>{n&&n.setAttribute(`aria-expanded`,e?`false`:`true`),r&&r.setAttribute(`aria-expanded`,e?`false`:`true`)},a=(n,r=!0)=>{if(e&&t){if(e.classList.toggle(`sidebar-collapsed`,n),t.classList.toggle(`sidebar-collapsed`,n),i(n),r)try{localStorage.setItem(`admin_sidebar_collapsed`,n?`true`:`false`)}catch{}setTimeout(()=>{window.dispatchEvent(new Event(`resize`))},260)}},o=()=>{let t=!e?.classList.contains(`sidebar-collapsed`);a(t,!0)};try{localStorage.getItem(`admin_sidebar_collapsed`)===`true`&&window.innerWidth>=1024?a(!0,!1):i(!1)}catch{i(!1)}n&&!n.hasAttribute(`data-bound`)&&(n.setAttribute(`data-bound`,`true`),n.addEventListener(`click`,o)),r&&!r.hasAttribute(`data-bound`)&&(r.setAttribute(`data-bound`,`true`),r.addEventListener(`click`,o))}function tf(e){ef(),document.querySelectorAll(`.admin-nav-btn`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.getAttribute(`data-admin-tab`),r=e.getAttribute(`data-tree-subtab`),i=e.getAttribute(`data-zone-subtab`),a=e.getAttribute(`data-report-subtab`);Qd(),n&&(n===`zones`?$(`zones`,i||`list`):n===`reports`?$(`reports`,a||`rekap`):n===`trees`?$(`trees`,r||`dashboard`):$(n))})});let t=document.getElementById(`btn-admin-view-public`);t&&t.addEventListener(`click`,e=>{Qd(),t.tagName.toLowerCase()!==`a`&&(e.preventDefault(),window.open(window.location.origin+`/#beranda`,`_blank`,`noopener,noreferrer`))});let n=document.getElementById(`btn-admin-mobile-sidebar`),r=document.getElementById(`btn-close-admin-sidebar-mobile`),i=document.getElementById(`admin-sidebar-backdrop`);n&&n.addEventListener(`click`,$d),r&&r.addEventListener(`click`,Qd),i&&i.addEventListener(`click`,Qd)}function $(e,t=null,n=!0,r=null,i=null){if(Ad=e,qu(),e===`trees`?(jd=t,Md=r,Nd=i):e===`zones`?(Pd=t,Fd=r):e===`reports`?Id=t:e===`albums`&&(Ld=t||`list`,Rd=r||null),n){let n=Jd(e,t,r,i);window.location.hash!==n&&(window.location.hash.startsWith(`#admin`)||window.location.hash===``)&&(window.location.hash=n)}document.querySelectorAll(`.admin-nav-btn`).forEach(t=>{let n=t.getAttribute(`data-admin-tab`),r=t.getAttribute(`data-tree-subtab`),i=t.getAttribute(`data-zone-subtab`),a=t.getAttribute(`data-report-subtab`),o=!1;o=e===`trees`?n===`trees`&&(r===jd||!jd&&r===`dashboard`):e===`zones`?n===`zones`&&(i===Pd||!Pd&&i===`list`||[`create`,`edit`,`detail`].includes(Pd)&&i===`list`):e===`reports`?n===`reports`&&(a===Id||!Id&&a===`rekap`):n===e,t.classList.toggle(`active`,o)}),document.querySelectorAll(`.admin-subpane`).forEach(t=>{t.classList.toggle(`active`,t.id===`admin-pane-${e}`)}),Kd(e,t,r,i),Gd(e),nf(),window.scrollTo(0,0),e===`editor`&&Q&&setTimeout(()=>{window.dispatchEvent(new Event(`resize`)),Q.refreshViewerSize();let e=Q.currentSceneId||(Bd.length>0?Bd[0].id:null);e&&Q.setScene(e)},100)}function nf(){rf(),_c()&&(Ad===`dashboard`?vc({scenes:Bd,hotspots:zd,selectedZoneId:Vd,onNavigateToPanorama:()=>$(`panoramas`),onNavigateToEditor:()=>$(`editor`),onNavigateToTrees:()=>$(`trees`,`dashboard`),onNavigateToZones:()=>$(`zones`,`list`),onNavigateToSpecies:()=>$(`trees`,`species`),onNavigateToActivities:()=>$(`trees`,`activities`),onNavigateToSurveys:()=>$(`trees`,`surveys`),onNavigateToMaintenance:()=>$(`trees`,`maintenance`),onNavigateToReports:()=>$(`reports`,`rekap`),onNavigateToLogs:()=>$(`activity-logs`)}):Ad===`zones`?Nl(Pd||`list`,Fd,!1):Ad===`panoramas`?bc({scenes:Bd,hotspots:zd,onOpenEditorForScene:e=>{Q&&(Q.currentSceneId=e),$(`editor`),setTimeout(()=>{Q&&Q.setScene(e)},120)},onPreviewScene:e=>{window.location.hash=`tour`;let t=new CustomEvent(`preview-scene`,{detail:{sceneId:e}});window.dispatchEvent(t)},onScenesUpdated:()=>{nf()}}):Ad===`trees`?G(jd||`dashboard`,Bd,Md,Nd,!1):Ad===`reports`?Id?nu(Id):tu():Ad===`settings`?jc({scenes:Bd,onSettingsUpdated:()=>{}}):Ad===`backup`?Ec({scenes:Bd,getHotspots:()=>zd,onRestoreComplete:async()=>{zd=await H.getHotspots(),nf()}}):Ad===`users`?du():Ad===`activity-logs`?vu():Ad===`editor`?Q&&(Q.renderHotspotsList(),Q.renderHotspotsOnCurrentScene()):Ad===`albums`&&(document.getElementById(`admin-albums-root`)?cd(Ld||`list`,Rd,!1):id(`admin-albums-content`,Ld,Rd)))}function rf(){let e=zd.filter(e=>e.status===`draft`).length,t=document.getElementById(`admin-draft-count-badge`);t&&(t.textContent=e>0?`${e} Draft`:`Sinkron`,t.className=`px-2.5 py-1 rounded-full text-xs font-semibold ${e>0?`bg-amber-500/10 text-amber-400 border border-amber-500/30`:`bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}`)}export{_c as a,sc as c,ec as d,c as f,U as i,nc as l,Hd as n,dc as o,Zd as r,H as s,Xd as t,rc as u};