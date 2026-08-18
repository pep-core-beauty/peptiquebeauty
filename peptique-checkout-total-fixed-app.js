const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbyB43xPTLQdnArHXLNTQHSuKToNrS5QW1Wq_zYirZMsAKvCo0ucXCcvWzoEgI_v65Wz0g/exec"; // Peptique-only Google Apps Script endpoint.

const fallbackProducts = [
  {id:'T15',code:'T15',name:'Tirzepatide',size:'15 MG',price:1800,category:'Injectables'},
  {id:'T30',code:'T30',name:'Tirzepatide',size:'30 MG',price:2400,category:'Injectables'},
  {id:'T60',code:'T60',name:'Tirzepatide',size:'60 MG',price:3800,category:'Injectables'},
  {id:'RT10',code:'RT10',name:'Retatrutide',size:'10 MG',price:1700,category:'Injectables'},
  {id:'RT20',code:'RT20',name:'Retatrutide',size:'20 MG',price:2200,category:'Injectables'},
  {id:'RT30',code:'RT30',name:'Retatrutide',size:'30 MG',price:3100,category:'Injectables'},
  {id:'GTT1200-KR',code:'GTT 1200',name:'Glutathione Korea',size:'1200 MG',price:1000,category:'Injectables'},
  {id:'GTT1500',code:'GTT 1500',name:'Glutathione Fuan',size:'1500 MG',price:1700,category:'Injectables'},
  {id:'CU50',code:'CU50',name:'GHK-CU',size:'50 MG',price:1200,category:'Injectables'},
  {id:'CU100',code:'CU100',name:'GHK-CU',size:'100 MG',price:1700,category:'Injectables'},
  {id:'KPV10',code:'KPV10',name:'KPV',size:'10 MG',price:1500,category:'Injectables'},
  {id:'LC216',code:'LC216',name:'Lipo-C with B12',size:'10 ML',price:1500,category:'Injectables'},
  {id:'LCS26',code:'LCS26',name:'Fat Blaster',size:'10 ML',price:2000,category:'Injectables'},
  {id:'AMO50',code:'AMO50',name:'5-Amino 1MQ',size:'50 MG',price:1500,category:'Injectables'},
  {id:'KLOW',code:'KLOW',name:'KLOW CU50 + TB10 + BC10 + KPV10',size:'80 MG',price:2400,category:'Injectables'},
  {id:'GLOW',code:'GLOW',name:'GLOW CU50 + TB10 + BC10',size:'70 MG',price:2100,category:'Injectables'},
  {id:'2S50',code:'2S50',name:'SS31',size:'50 MG',price:4000,category:'Injectables'},
  {id:'2S10',code:'2S10',name:'SS31',size:'10 MG',price:1500,category:'Injectables'},
  {id:'HHB10',code:'HHB10',name:'HHB',size:'10 ML',price:1800,category:'Injectables'},
  {id:'MS10',code:'MS10',name:'Mots-C',size:'10 MG',price:1400,category:'Injectables'},
  {id:'Wolverine10',code:'Wolverine10',name:'BPC-157 + TB500',size:'10 MG',price:1800,category:'Injectables'},
  {id:'BPC10',code:'BPC10',name:'BPC-157',size:'10 MG',price:1300,category:'Injectables'},
  {id:'XA10',code:'XA10',name:'Semax',size:'10 MG',price:1300,category:'Injectables'},
  {id:'SK10',code:'SK10',name:'Selank',size:'10 MG',price:1300,category:'Injectables'},
  {id:'NJ500',code:'NJ500',name:'NAD+',size:'500 MG',price:1500,category:'Injectables'},
  {id:'TS10',code:'TS10',name:'Tesamorelin',size:'10 MG',price:2500,category:'Injectables'},
  {id:'ET10',code:'ET10',name:'Epitalon',size:'10 MG',price:1500,category:'Injectables'},
  {id:'CGL5',code:'CGL5',name:'Cagrilintide',size:'5 MG',price:1700,category:'Injectables'},
  {id:'5AD',code:'5AD',name:'AOD',size:'5 MG',price:1800,category:'Injectables'},
  {id:'AU100-INJ',code:'AU100',name:'AHK CU',size:'100 MG',price:1300,category:'Injectables'},
  {id:'LBC10',code:'LBC 10',name:'Lemon Bottle — China Variant',size:'10 ML',price:1050,category:'Injectables'},
  {id:'LBC50',code:'LBC 50',name:'Lemon Bottle — China Variant',size:'50 ML',price:1800,category:'Injectables'},
  {id:'LBK',code:'LBK',name:'Lemon Bottle — Korea Variant',size:'10 ML',price:1700,category:'Injectables'},
  {id:'LVVL',code:'LV-VL',name:'Lipo Vela V-Line',size:'5 ML',price:599,category:'Injectables'},
  {id:'LV',code:'LV',name:'Lipo Vela',size:'10 ML',price:799,category:'Injectables'},
  {id:'AQUA',code:'AQUA',name:'Aqualyx',size:'8 ML',price:600,category:'Injectables'},

  {id:'TG1',code:'TG1',name:'GHK Topical',size:'1 GRAM',price:1300,category:'Topicals'},
  {id:'MATRIX',code:'MATRIX',name:'Matrixyl',size:'10 MG',price:1300,category:'Topicals'},
  {id:'SNAP8',code:'SNAP8',name:'Snap 8',size:'10 MG',price:1300,category:'Topicals'},
  {id:'SG04',code:'SG04',name:'Pink Hya (Pink Hyaluronic Acid)',size:'10 ML',price:680,category:'Topicals'},
  {id:'PDRN',code:'PDRN',name:'PDRN Skin Booster',size:'10 ML',price:700,category:'Topicals'},
  {id:'AU100-TOP',code:'AU100',name:'AHK CU',size:'10 ML',price:1300,category:'Topicals'},

  {id:'V1',code:'V1',name:'Reusable Pen Complete Set',size:'COMPLETE SET',price:1000,category:'Accessories'},
  {id:'V2',code:'V2',name:'Reusable Pen Complete Set',size:'COMPLETE SET',price:1000,category:'Accessories'},
  {id:'V4',code:'V4',name:'Reusable Pen Complete Set',size:'COMPLETE SET',price:1000,category:'Accessories'},
  {id:'CG',code:'CG',name:'Cartridge',size:'3 ML',price:40,category:'Accessories'},
  {id:'PEN-NEEDLES',code:'Pen Needles',name:'Pen Needles 31G × 8 mm',size:'8 MM',price:10,category:'Accessories'},
  {id:'TS-CONTAINER',code:'TS CONTAINER',name:'Trzy Set Container',size:'1 PC',price:120,category:'Accessories'},
  {id:'VIAL-PINK-CAP',code:'VIAL PINK CAP',name:'Vial Case Storage',size:'1 PC',price:60,category:'Accessories'},
  {id:'VIAL-OPENER',code:'VIAL OPENER',name:'Vial Opener',size:'1 PC',price:40,category:'Accessories'},

  {id:'SYRINGES',code:'SYRINGES',name:'Syringes',size:'10 PCS',price:100,category:'Supplies'},
  {id:'ALCOHOL-PADS',code:'ALCOHOL PADS',name:'Alcohol Pads',size:'10 PCS',price:40,category:'Supplies'},
  {id:'BAC-WATER',code:'BAC WATER',name:'Bac Water',size:'10 ML',price:80,category:'Supplies'},
  {id:'OTHER-FREEBIES',code:'OTHER FREEBIES',name:'Other Freebies',size:'—',price:0,category:'Supplies'}
];

// Google Sheets "Stocks" is the master product catalog.
// The embedded catalog above is only a fallback if Google is temporarily unavailable.
let products = fallbackProducts.map(p => ({...p, inStock:true}));
let stockFeedReady = false;

const slug = value => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'item';
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function productFromStockRow(row, index){
  const category = String(row.category || '').trim() || 'Other';
  const code = String(row.code || '').trim();
  const name = String(row.product || '').trim();
  const size = String(row.variant || '').trim() || 'Standard';
  const price = Number(row.price);
  if(!code || !name || !Number.isFinite(price) || price < 0) return null;
  // Category + code keeps the browser ID unique even if a duplicate code is accidentally entered.
  return {
    id:`${slug(category)}--${slug(code)}`,
    code,
    name,
    size,
    price,
    category,
    availableQty: row.availableQty === null || row.availableQty === undefined ? null : Math.max(0, Number(row.availableQty) || 0),
    inStock: row.inStock === true && (row.availableQty === null || row.availableQty === undefined || Number(row.availableQty) > 0),
    sheetRow:index + 2
  };
}

function syncCategoryFilters(){
  const filters = document.querySelector('.filters');
  if(!filters) return;
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  if(activeFilter !== 'All' && !categories.includes(activeFilter)) activeFilter = 'All';
  filters.innerHTML = [
    `<button class="filter ${activeFilter==='All'?'active':''}" data-filter="All">All</button>`,
    ...categories.map(c => `<button class="filter ${activeFilter===c?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`)
  ].join('');
}

async function loadLiveStocks(){
  try{
    const url = `${ORDER_ENDPOINT}?action=stocks&_=${Date.now()}`;
    const r = await fetch(url, {cache:'no-store'});
    const data = await r.json();
    if(!r.ok || data.ok !== true || !Array.isArray(data.stocks)) throw new Error(data.message || 'Catalog feed unavailable.');

    const liveProducts = data.stocks.map(productFromStockRow).filter(Boolean);
    if(!liveProducts.length) throw new Error('The Stocks tab has no valid product rows.');

    products = liveProducts;
    stockFeedReady = true;

    // Migrate any legacy cart keys to the current Sheet-catalog IDs so totals,
    // checkout and inventory deduction all use the same product identifier.
    const migratedCart={};
    Object.entries(cart||{}).forEach(([oldKey,qty])=>{
      const item=resolveCartItem(oldKey);
      if(item && Number(qty)>0) migratedCart[item.id]=(migratedCart[item.id]||0)+Number(qty);
    });
    cart=migratedCart;
    localStorage.setItem('peptiqueCart',JSON.stringify(cart));

    syncCategoryFilters();
    renderProducts();
    updateCart();
    if(typeof recalcCheckout==='function' && checkout && !checkout.hidden) recalcCheckout();
  }catch(err){
    console.warn('Peptique live catalog feed:', err);
    // Keep the storefront usable with the embedded fallback catalog if Google is temporarily unreachable.
  }
}

const paymentQR = {'GCash':'gcash-qr.jpg','GoTyme Bank':'gotyme-qr.jpg','MariBank':'maribank-qr.jpg'};
let cart = JSON.parse(localStorage.getItem('peptiqueCart') || '{}');
let activeFilter = 'All';
let lastOrderSummary = '';

const peso = n => n===0 ? 'FREE' : `₱${Number(n).toLocaleString('en-PH')}`;
const grid = document.querySelector('#product-grid');
const search = document.querySelector('#product-search');

const shopQty = {};
function isVialDiscountEligible(p){
  // Applies to peptide/injectable vials measured in MG. Liquid ML products and supplies are excluded.
  return p.category==='Injectables' && /\bMG\b/i.test(p.size);
}
function resolveCartItem(key){
  const raw=String(key||'');
  // Current Sheet-catalog ID.
  let base=products.find(p=>p.id===raw);

  // Backward compatibility for carts created before the Sheet catalog used
  // category--code IDs (for example T15, RT10, AU100-INJ).
  if(!base){
    const legacy=fallbackProducts.find(p=>p.id===raw);
    if(legacy){
      base=products.find(p=>
        p.code===legacy.code &&
        p.category===legacy.category &&
        p.name===legacy.name &&
        p.size===legacy.size
      ) || products.find(p=>p.code===legacy.code && p.category===legacy.category);
    }
  }

  // Also accept a unique product code as a cart key.
  if(!base){
    const byCode=products.filter(p=>String(p.code)===raw);
    if(byCode.length===1) base=byCode[0];
  }

  return base ? {...base,cartKey:base.id,packageName:'',price:base.price} : null;
}
function productGroups(list){
  const groups=[];
  const map=new Map();
  list.forEach(p=>{
    const key=`${p.category}||${p.name}`;
    if(!map.has(key)){const g={key,category:p.category,name:p.name,variants:[]};map.set(key,g);groups.push(g)}
    map.get(key).variants.push(p);
  });
  return groups;
}
function variantLabel(p, group){
  const sameSize=group.variants.filter(v=>v.size===p.size).length>1;
  return sameSize ? `${p.code} · ${p.size}` : p.size;
}
function renderProducts(){
  const q=(search.value||'').trim().toLowerCase();
  const visible=products.filter(p => (activeFilter==='All'||p.category===activeFilter) && `${p.name} ${p.code} ${p.size}`.toLowerCase().includes(q));
  const groups=productGroups(visible);
  grid.innerHTML=groups.map(g=>{
    const codes=g.variants.map(v=>v.code).join(' / ');
    const priceMin=Math.min(...g.variants.map(v=>v.price));
    const priceMax=Math.max(...g.variants.map(v=>v.price));
    const priceText=priceMin===priceMax?peso(priceMin):`${peso(priceMin)} – ${peso(priceMax)}`;
    const rows=g.variants.map(v=>{
      const key=v.id;
      const qty=shopQty[key] ?? 1; shopQty[key]=qty;
      const disabled=v.inStock?'':' disabled';
      const buttonText=v.inStock?'ADD TO CART':'SOLD OUT';
      return `<div class="variant-row variant-card ${v.inStock?'':'sold-out'}">
        <div class="variant-card-head">
          <div class="variant-info"><b>${esc(g.name)} ${esc(v.size.toLowerCase())}</b><small>${esc(v.code)}</small></div>
          <strong class="variant-price">${peso(v.price)}</strong>
        </div>
        <div class="variant-card-actions">
          <div class="shop-stepper"><button type="button" data-shop-qty="${key}" data-delta="-1" aria-label="Decrease ${v.name} ${v.size}"${disabled}>−</button><span data-shop-count="${key}">${qty}</span><button type="button" data-shop-qty="${key}" data-delta="1" aria-label="Increase ${v.name} ${v.size}"${disabled}>+</button></div>
          <button class="variant-add" type="button" data-add-variant="${key}"${disabled}>${buttonText}</button>
        </div>
      </div>`;
    }).join('');
    return `<article class="product-card grouped-card collapsed" data-product-group="${g.key}">
      <div class="product-card-summary" data-toggle-group="${g.key}" role="button" tabindex="0" aria-expanded="false">
        <div><span class="product-tag">${esc(g.category.toUpperCase())}${g.variants.length===1?' • '+esc(codes):''}</span><h3>${esc(g.name)}</h3><p class="product-meta">${g.variants.length>1?'From '+priceText:priceText}</p></div>
        <span class="product-open-label">VIEW OPTIONS <b>＋</b></span>
      </div>
      <div class="product-options" hidden>
        <div class="variant-list">${rows}</div>
      </div>
    </article>`;
  }).join('');
  document.querySelector('#no-results').hidden=!!groups.length;
}
function saveCart(){localStorage.setItem('peptiqueCart',JSON.stringify(cart));updateCart();}
function cartEntries(){return Object.entries(cart).map(([key,qty])=>({product:resolveCartItem(key),qty,key})).filter(x=>x.product&&x.qty>0)}
function subtotal(){return cartEntries().reduce((s,x)=>s+x.product.price*x.qty,0)}
function updateCart(){
  const entries=cartEntries(); const count=entries.reduce((s,x)=>s+x.qty,0); document.querySelectorAll('.cart-count').forEach(x=>x.textContent=count);
  const container=document.querySelector('#cart-items');
  container.innerHTML=entries.length?entries.map(({product:p,qty,key})=>`<div class="cart-row"><div><h4>${p.name}</h4><small>${p.size} · ${peso(p.price)}</small><div class="qty-control"><button data-qty="${key}" data-delta="-1">−</button><span>${qty}</span><button data-qty="${key}" data-delta="1">+</button><button class="remove" data-remove="${key}">remove</button></div></div><b>${peso(p.price*qty)}</b></div>`).join(''):'<p class="empty-cart">Your bag is waiting for something pretty ♡</p>';
  document.querySelector('#cart-subtotal').textContent=peso(subtotal()); document.querySelector('#cart-total').textContent=peso(subtotal());
}
function toast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}
function openCart(){document.querySelector('.cart-drawer').classList.add('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','false');document.querySelector('.drawer-backdrop').classList.add('open')}
function closeCart(){document.querySelector('.cart-drawer').classList.remove('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','true');document.querySelector('.drawer-backdrop').classList.remove('open')}

document.addEventListener('click',e=>{
  const toggle=e.target.closest('[data-toggle-group]');
  if(toggle){
    const card=toggle.closest('[data-product-group]');
    const options=card?.querySelector('.product-options');
    const isOpen=card?.classList.contains('open');
    if(card&&options){
      card.classList.toggle('open',!isOpen);card.classList.toggle('collapsed',isOpen);
      options.hidden=isOpen;toggle.setAttribute('aria-expanded',String(!isOpen));
      const icon=toggle.querySelector('.product-open-label b');if(icon)icon.textContent=isOpen?'＋':'−';
      const label=toggle.querySelector('.product-open-label');if(label)label.childNodes[0].nodeValue=isOpen?'VIEW OPTIONS ':'HIDE OPTIONS ';
    }
    return;
  }
  const shopStep=e.target.closest('[data-shop-qty]');
  if(shopStep){
    const id=shopStep.dataset.shopQty;
    const item=resolveCartItem(id);
    const maxQty=item && item.availableQty!==null && item.availableQty!==undefined ? Math.max(1,item.availableQty) : Infinity;
    shopQty[id]=Math.min(maxQty,Math.max(1,(shopQty[id]??1)+Number(shopStep.dataset.delta)));
    const count=document.querySelector(`[data-shop-count="${id}"]`);if(count)count.textContent=shopQty[id];
    return;
  }
  const variantAdd=e.target.closest('[data-add-variant]');
  if(variantAdd){
    const key=variantAdd.dataset.addVariant;
    const item=resolveCartItem(key);
    if(!item || item.inStock===false){toast('This option is currently sold out.');return;}
    const n=Math.max(1,shopQty[key]??1);
    const currentInCart=cart[key]||0;
    if(item.availableQty!==null && item.availableQty!==undefined && currentInCart+n>item.availableQty){
      toast(`Only ${Math.max(0,item.availableQty-currentInCart)} left available.`);return;
    }
    cart[key]=currentInCart+n;
    shopQty[key]=1;
    const c=document.querySelector(`[data-shop-count="${key}"]`);if(c)c.textContent='1';
    saveCart();toast(`${n} item${n>1?'s':''} added to your Peptique bag ♡`);return;
  }
  const add=e.target.closest('[data-add]'); if(add){cart[add.dataset.add]=(cart[add.dataset.add]||0)+1;saveCart();toast('Added to your Peptique bag ♡');return}
  const qty=e.target.closest('[data-qty]'); if(qty){const id=qty.dataset.qty;cart[id]=(cart[id]||0)+Number(qty.dataset.delta);if(cart[id]<=0)delete cart[id];saveCart();return}
  const rem=e.target.closest('[data-remove]');if(rem){delete cart[rem.dataset.remove];saveCart();return}
  if(e.target.closest('[data-open-cart]'))openCart(); if(e.target.closest('[data-close-cart]'))closeCart();
});

document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-toggle-group]')){e.preventDefault();e.target.click();}});

document.querySelector('.filters')?.addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderProducts()});
search.addEventListener('input',renderProducts);
document.querySelectorAll('[data-category-jump]').forEach(b=>b.addEventListener('click',()=>{const wanted=b.dataset.categoryJump;activeFilter=products.some(p=>p.category===wanted)?wanted:'All';document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===activeFilter));document.querySelector('#shop').scrollIntoView({behavior:'smooth'});renderProducts()}));

document.querySelector('.nav-toggle').addEventListener('click',e=>{const nav=document.querySelector('.nav');nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));

const checkout=document.querySelector('#checkout-modal'),backdrop=document.querySelector('#checkout-backdrop'),form=document.querySelector('#checkout-form');

// One simple packaging choice at checkout keeps the product cards uncluttered.
let packaging=document.querySelector('#packaging-method');
if(!packaging){
  const deliveryNoteEl=document.querySelector('#delivery-note');
  const label=document.createElement('label');
  label.className='span-2';
  label.innerHTML='PACKAGING <select name="packagingMethod" id="packaging-method"><option value="Complete Set">Complete Set — listed prices</option><option value="Vial + BAC Water only">Vial + BAC Water only — ₱200 off each eligible vial</option></select><small class="field-help">Discount applies only to eligible MG injectable vials in your bag.</small>';
  deliveryNoteEl.insertAdjacentElement('afterend',label);
  packaging=label.querySelector('select');
}
function eligibleVialQty(){return cartEntries().reduce((sum,{product:p,qty})=>sum+(isVialDiscountEligible(p)?qty:0),0)}

// Vial-only packaging is ₱200 off per eligible vial by default.
// A valid active code from the Google Sheet Discounts tab can override the per-vial amount.
let appliedDiscountCode='';
let appliedDiscountPerVial=200;
let discountCodeInput=document.querySelector('#discount-code');
let discountApplyButton=document.querySelector('#apply-discount-code');
let discountCodeStatus=document.querySelector('#discount-code-status');
if(!discountCodeInput){
  const packagingLabel=packaging?.closest('label');
  const codeLabel=document.createElement('label');
  codeLabel.className='span-2 discount-code-field';
  codeLabel.innerHTML=`DISCOUNT CODE <div class="discount-code-row"><input id="discount-code" name="discountCode" type="text" inputmode="text" autocomplete="off" placeholder="Enter discount code" maxlength="24"><button id="apply-discount-code" type="button">APPLY</button></div><small id="discount-code-status" class="field-help">Optional. Active PB codes change the vial-only discount per eligible vial.</small>`;
  packagingLabel?.insertAdjacentElement('afterend',codeLabel);
  discountCodeInput=codeLabel.querySelector('#discount-code');
  discountApplyButton=codeLabel.querySelector('#apply-discount-code');
  discountCodeStatus=codeLabel.querySelector('#discount-code-status');
}
function currentDiscountPerVial(){return appliedDiscountCode?appliedDiscountPerVial:200}
function packagingDiscount(){return packaging&&packaging.value==='Vial + BAC Water only'?Math.min(subtotal(),eligibleVialQty()*currentDiscountPerVial()):0}
async function applyDiscountCode(){
  const code=String(discountCodeInput?.value||'').trim().toUpperCase();
  if(discountCodeInput)discountCodeInput.value=code;
  if(!code){
    appliedDiscountCode='';appliedDiscountPerVial=200;
    if(discountCodeStatus)discountCodeStatus.textContent='No code applied — vial-only packaging uses the standard ₱200 discount per eligible vial.';
    recalcCheckout();return;
  }
  if(packaging?.value!=='Vial + BAC Water only'){
    if(discountCodeStatus)discountCodeStatus.textContent='Choose Vial + BAC Water only first to use a packaging discount code.';
    return;
  }
  const old=discountApplyButton?.textContent;
  if(discountApplyButton){discountApplyButton.disabled=true;discountApplyButton.textContent='CHECKING…';}
  try{
    const r=await fetch(`${ORDER_ENDPOINT}?action=discount&code=${encodeURIComponent(code)}&_=${Date.now()}`,{cache:'no-store'});
    const data=await r.json();
    if(!r.ok||data.ok!==true||data.valid!==true||!(Number(data.discount)>0))throw new Error('Invalid or inactive discount code.');
    appliedDiscountCode=code;appliedDiscountPerVial=Number(data.discount);
    if(discountCodeStatus)discountCodeStatus.textContent=`${code} applied — ${peso(appliedDiscountPerVial)} off each eligible vial.`;
    recalcCheckout();
  }catch(err){
    appliedDiscountCode='';appliedDiscountPerVial=200;
    if(discountCodeStatus)discountCodeStatus.textContent='Code not active. Standard ₱200 vial-only discount will apply.';
    recalcCheckout();
  }finally{
    if(discountApplyButton){discountApplyButton.disabled=false;discountApplyButton.textContent=old||'APPLY';}
  }
}
discountApplyButton?.addEventListener('click',applyDiscountCode);
discountCodeInput?.addEventListener('input',()=>{appliedDiscountCode='';appliedDiscountPerVial=200;if(discountCodeStatus)discountCodeStatus.textContent='Press APPLY to verify this code.';recalcCheckout();});
discountCodeInput?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();applyDiscountCode();}});

let discountRow=document.querySelector('#checkout-discount-row');
if(!discountRow){
  const shippingRow=document.querySelector('#checkout-shipping')?.closest('div');
  discountRow=document.createElement('div');
  discountRow.id='checkout-discount-row';
  discountRow.hidden=true;
  discountRow.innerHTML='<span>Packaging discount</span><b id="checkout-discount">−₱0</b>';
  shippingRow?.insertAdjacentElement('beforebegin',discountRow);
}
function openCheckout(){if(!cartEntries().length){toast('Add an item to your bag first');return}closeCart();checkout.hidden=false;backdrop.classList.add('open');recalcCheckout()}
function closeCheckout(){checkout.hidden=true;backdrop.classList.remove('open')}
document.querySelector('#proceed-checkout').addEventListener('click',openCheckout);document.querySelector('#close-checkout').addEventListener('click',closeCheckout);backdrop.addEventListener('click',closeCheckout);

const delivery=document.querySelector('#delivery-method'),region=document.querySelector('#region'),regionLabel=document.querySelector('#region-label'),deliveryNote=document.querySelector('#delivery-note');
function recalcCheckout(){
  const sub=subtotal();const discount=packagingDiscount();let ship=0;let shipText='—';
  const deliveryMethod=(delivery.value||'').trim();
  const selectedRegion=(region.value||'').trim();
  if(deliveryMethod==='Lalamove'){shipText='Paid to rider';deliveryNote.hidden=false;deliveryNote.textContent='Lalamove delivery fee is paid directly to the rider upon delivery and is not included in your store total.';regionLabel.hidden=true;region.required=false;}
  else if(deliveryMethod.startsWith('J&T')){regionLabel.hidden=false;region.required=true;deliveryNote.hidden=false;deliveryNote.textContent='J&T shipping is added to your order total.';if(selectedRegion){ship=Number(shippingRates[selectedRegion]||0);shipText=peso(ship)}}
  else{regionLabel.hidden=true;region.required=false;deliveryNote.hidden=true}
  document.querySelector('#checkout-subtotal').textContent=peso(sub);
  const discountValue=document.querySelector('#checkout-discount');
  if(discountRow){discountRow.hidden=discount<=0;if(discountValue)discountValue.textContent=`−${peso(discount)}`;}
  document.querySelector('#checkout-shipping').textContent=shipText;document.querySelector('#checkout-total').textContent=peso(sub-discount+ship);
  return {sub,discount,netSubtotal:sub-discount,ship,total:sub-discount+ship,shipText};
}
function handleDeliveryChange(){if(!(delivery.value||'').startsWith('J&T'))region.value='';recalcCheckout()}
delivery.addEventListener('change',handleDeliveryChange);
delivery.addEventListener('input',handleDeliveryChange);
region.addEventListener('change',recalcCheckout);
region.addEventListener('input',recalcCheckout);
packaging?.addEventListener('change',()=>{if(packaging.value!=='Vial + BAC Water only'){appliedDiscountCode='';appliedDiscountPerVial=200;if(discountCodeStatus)discountCodeStatus.textContent='Discount codes apply to Vial + BAC Water only.';}recalcCheckout();});

const payment=document.querySelector('#payment-method'),panel=document.querySelector('#payment-panel'),qr=document.querySelector('#payment-qr'),paymentName=document.querySelector('#payment-name');
payment.addEventListener('change',()=>{if(payment.value&&paymentQR[payment.value]){qr.src=paymentQR[payment.value];paymentName.textContent=payment.value;panel.hidden=false}else panel.hidden=true});
document.querySelector('#receipt').addEventListener('change',e=>document.querySelector('#file-name').textContent=e.target.files?.[0]?.name||'Choose image or PDF');

function makeOrderNumber(){const d=new Date(),pad=n=>String(n).padStart(2,'0');return `PB-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${Math.random().toString(36).slice(2,7).toUpperCase()}`}
async function fileToPayload(file){
  if(!file) return null;
  const maxBytes=5*1024*1024;
  if(file.size>maxBytes) throw new Error('Receipt file must be 5 MB or smaller.');
  const dataUrl=await new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=()=>reject(new Error('Could not read receipt file.'));
    reader.readAsDataURL(file);
  });
  return {name:file.name,type:file.type||'application/octet-stream',base64:String(dataUrl).split(',')[1]||''};
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!cartEntries().length)return;
  const receiptFile=document.querySelector('#receipt').files?.[0]||null;
  if(!ORDER_ENDPOINT || ORDER_ENDPOINT.includes('PASTE_YOUR_')){toast('Checkout connection is not deployed yet.');return}

  const submitButton=form.querySelector('button[type="submit"]');
  const originalText=submitButton.textContent;
  submitButton.disabled=true;submitButton.textContent='SENDING ORDER…';

  try{
    await loadLiveStocks();
    const unavailable=cartEntries().filter(({product:p})=>p.inStock===false);
    if(unavailable.length) throw new Error(`${unavailable[0].product.name} ${unavailable[0].product.size} is currently sold out. Please remove it from your bag.`);
    const insufficient=cartEntries().find(({product:p,qty})=>p.availableQty!==null&&p.availableQty!==undefined&&qty>p.availableQty);
    if(insufficient) throw new Error(`${insufficient.product.name} ${insufficient.product.size} only has ${insufficient.product.availableQty} left. Please adjust your quantity.`);
    const fd=new FormData(form); const totals=recalcCheckout();
    if(String(fd.get('deliveryMethod')||'').startsWith('J&T')&&!fd.get('region')){throw new Error('Select your J&T destination.')}
    if(String(fd.get('deliveryMethod')||'').startsWith('J&T') && totals.ship<=0){throw new Error('Please select your J&T destination so the shipping fee can be added.')} 
    const orderNo=makeOrderNumber();
    const entries=cartEntries();
    const packagingChoice=String(fd.get('packagingMethod')||'Complete Set');
    const itemLines=entries.map(({product:p,qty})=>`${qty}× ${p.name} ${p.size}${packagingChoice==='Vial + BAC Water only'&&isVialDiscountEligible(p)?' · Vial + BAC Water only':''} — ${peso(p.price*qty)}`).join('\n');
    const itemData=entries.map(({product:p,qty,key})=>({id:p.id,cartKey:key,code:p.code,name:p.name,size:p.size,package:packagingChoice==='Vial + BAC Water only'&&isVialDiscountEligible(p)?'Vial + BAC Water only':'Complete Set',price:p.price,qty,lineTotal:p.price*qty}));
    lastOrderSummary=`PEPTIQUE BEAUTY PH\nOrder: ${orderNo}\n\n${itemLines}\n\nItems subtotal: ${peso(totals.sub)}\nPackaging: ${packagingChoice}\nPackaging discount: ${totals.discount?'-'+peso(totals.discount):'—'}${appliedDiscountCode?`\nDiscount code: ${appliedDiscountCode} (${peso(appliedDiscountPerVial)}/vial)`:''}\nShipping: ${totals.shipText}\nTotal: ${peso(totals.total)}\n\nCustomer: ${fd.get('fullName')}\nContact: ${fd.get('contact')}\nEmail: ${fd.get('email')||'—'}\nAddress: ${fd.get('address')}, ${fd.get('barangay')}, ${fd.get('city')}, ${fd.get('province')}\nLandmark: ${fd.get('landmark')||'—'}\nDelivery: ${fd.get('deliveryMethod')}${fd.get('region')?' — '+fd.get('region'):''}\nPayment: ${fd.get('paymentMethod')}\nNotes: ${fd.get('notes')||'—'}`;

    const receipt=await fileToPayload(receiptFile);
    const payload={
      orderNumber:orderNo,
      customer:{fullName:fd.get('fullName'),contact:fd.get('contact'),email:fd.get('email')||'',address:fd.get('address'),barangay:fd.get('barangay'),city:fd.get('city'),province:fd.get('province'),landmark:fd.get('landmark')||''},
      delivery:{method:fd.get('deliveryMethod'),region:fd.get('region')||'',shippingFee:totals.ship,shippingText:totals.shipText},
      payment:{method:fd.get('paymentMethod'),status:receiptFile?'Paid - To verify':'Payment selected - receipt not uploaded'},
      packagingMethod:packagingChoice,
      discountCode:appliedDiscountCode,
      discountPerVial:currentDiscountPerVial(),
      eligibleVialQty:eligibleVialQty(),
      grossSubtotal:totals.sub,
      packagingDiscount:totals.discount,
      items:itemData,itemsText:itemLines,subtotal:totals.netSubtotal,total:totals.total,notes:[`Packaging: ${packagingChoice}`,appliedDiscountCode?`Discount code: ${appliedDiscountCode} (${peso(appliedDiscountPerVial)}/vial)`:'',totals.discount?`Packaging discount: -${peso(totals.discount)}`:'',fd.get('notes')||''].filter(Boolean).join(' | '),orderSummary:lastOrderSummary,receipt
    };

    const r=await fetch(ORDER_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const text=await r.text();
    let result={};try{result=JSON.parse(text)}catch{}
    if(!r.ok || result.ok!==true) throw new Error(result.message||'Could not save order to Google Sheets.');

    document.querySelector('#order-number').textContent=orderNo;closeCheckout();document.querySelector('#success-modal').hidden=false;
  }catch(err){
    console.error(err);toast(err.message||'Could not send order. Please try again.');
  }finally{submitButton.disabled=false;submitButton.textContent=originalText;}
});
document.querySelector('#copy-order').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(lastOrderSummary);toast('Order summary copied ♡')}catch{toast('Copy unavailable — screenshot your order number instead')}});
document.querySelector('#continue-shopping').addEventListener('click',()=>{document.querySelector('#success-modal').hidden=true;cart={};saveCart();form.reset();if(packaging)packaging.value='Complete Set';appliedDiscountCode='';appliedDiscountPerVial=200;if(discountCodeInput)discountCodeInput.value='';if(discountCodeStatus)discountCodeStatus.textContent='Optional. Active PB codes change the vial-only discount per eligible vial.';panel.hidden=true;document.querySelector('#file-name').textContent='Choose image or PDF';document.querySelector('#shop').scrollIntoView({behavior:'smooth'})});

syncCategoryFilters();renderProducts();updateCart();loadLiveStocks();
