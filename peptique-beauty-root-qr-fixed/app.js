const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbyB43xPTLQdnArHXLNTQHSuKToNrS5QW1Wq_zYirZMsAKvCo0ucXCcvWzoEgI_v65Wz0g/exec"; // Peptique-only Google Apps Script endpoint.

const products = [
  {id:'T15',code:'T15',name:'Tirzepatide',size:'15 MG',price:1800,category:'Injectables'},
  {id:'T30',code:'T30',name:'Tirzepatide',size:'30 MG',price:2400,category:'Injectables'},
  {id:'T60',code:'T60',name:'Tirzepatide',size:'60 MG',price:3800,category:'Injectables'},
  {id:'RT10',code:'RT10',name:'Retatrutide',size:'10 MG',price:1700,category:'Injectables'},
  {id:'RT20',code:'RT20',name:'Retatrutide',size:'20 MG',price:2200,category:'Injectables'},
  {id:'RT30',code:'RT30',name:'Retatrutide',size:'30 MG',price:3100,category:'Injectables'},
  {id:'GTT1200-A',code:'GTT 1200',name:'Glutathione Glutaone',size:'1200 MG',price:1000,category:'Injectables'},
  {id:'GTT1200-B',code:'GTT 1200',name:'Glutathione Luthione',size:'1200 MG',price:1000,category:'Injectables'},
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

const shippingRates = {'Metro Manila':100,'Luzon':150,'Visayas':200,'Mindanao':250};
const paymentQR = {'GCash':'gcash-qr.jpg','GoTyme Bank':'gotyme-qr.jpg','MariBank':'maribank-qr.jpg'};
let cart = JSON.parse(localStorage.getItem('peptiqueCart') || '{}');
let activeFilter = 'All';
let lastOrderSummary = '';

const peso = n => n===0 ? 'FREE' : `₱${Number(n).toLocaleString('en-PH')}`;
const grid = document.querySelector('#product-grid');
const search = document.querySelector('#product-search');

function renderProducts(){
  const q=(search.value||'').trim().toLowerCase();
  const visible=products.filter(p => (activeFilter==='All'||p.category===activeFilter) && `${p.name} ${p.code} ${p.size}`.toLowerCase().includes(q));
  grid.innerHTML=visible.map(p=>`<article class="product-card"><span class="product-tag">${p.category.toUpperCase()} • ${p.code}</span><h3>${p.name}</h3><p class="product-meta">${p.size}</p><div class="product-bottom"><span class="price">${peso(p.price)}</span><button class="add-button" data-add="${p.id}">ADD TO BAG</button></div></article>`).join('');
  document.querySelector('#no-results').hidden=!!visible.length;
}
function saveCart(){localStorage.setItem('peptiqueCart',JSON.stringify(cart));updateCart();}
function cartEntries(){return Object.entries(cart).map(([id,qty])=>({product:products.find(p=>p.id===id),qty})).filter(x=>x.product&&x.qty>0)}
function subtotal(){return cartEntries().reduce((s,x)=>s+x.product.price*x.qty,0)}
function updateCart(){
  const entries=cartEntries(); const count=entries.reduce((s,x)=>s+x.qty,0); document.querySelectorAll('.cart-count').forEach(x=>x.textContent=count);
  const container=document.querySelector('#cart-items');
  container.innerHTML=entries.length?entries.map(({product:p,qty})=>`<div class="cart-row"><div><h4>${p.name}</h4><small>${p.size} · ${peso(p.price)}</small><div class="qty-control"><button data-qty="${p.id}" data-delta="-1">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1">+</button><button class="remove" data-remove="${p.id}">remove</button></div></div><b>${peso(p.price*qty)}</b></div>`).join(''):'<p class="empty-cart">Your bag is waiting for something pretty ♡</p>';
  document.querySelector('#cart-subtotal').textContent=peso(subtotal()); document.querySelector('#cart-total').textContent=peso(subtotal());
}
function toast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}
function openCart(){document.querySelector('.cart-drawer').classList.add('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','false');document.querySelector('.drawer-backdrop').classList.add('open')}
function closeCart(){document.querySelector('.cart-drawer').classList.remove('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','true');document.querySelector('.drawer-backdrop').classList.remove('open')}

document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]'); if(add){cart[add.dataset.add]=(cart[add.dataset.add]||0)+1;saveCart();toast('Added to your Peptique bag ♡');return}
  const qty=e.target.closest('[data-qty]'); if(qty){const id=qty.dataset.qty;cart[id]=(cart[id]||0)+Number(qty.dataset.delta);if(cart[id]<=0)delete cart[id];saveCart();return}
  const rem=e.target.closest('[data-remove]');if(rem){delete cart[rem.dataset.remove];saveCart();return}
  if(e.target.closest('[data-open-cart]'))openCart(); if(e.target.closest('[data-close-cart]'))closeCart();
});

document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderProducts()}));
search.addEventListener('input',renderProducts);
document.querySelectorAll('[data-category-jump]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.categoryJump;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===activeFilter));document.querySelector('#shop').scrollIntoView({behavior:'smooth'});renderProducts()}));

document.querySelector('.nav-toggle').addEventListener('click',e=>{const nav=document.querySelector('.nav');nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));

const checkout=document.querySelector('#checkout-modal'),backdrop=document.querySelector('#checkout-backdrop'),form=document.querySelector('#checkout-form');
function openCheckout(){if(!cartEntries().length){toast('Add an item to your bag first');return}closeCart();checkout.hidden=false;backdrop.classList.add('open');recalcCheckout()}
function closeCheckout(){checkout.hidden=true;backdrop.classList.remove('open')}
document.querySelector('#proceed-checkout').addEventListener('click',openCheckout);document.querySelector('#close-checkout').addEventListener('click',closeCheckout);backdrop.addEventListener('click',closeCheckout);

const delivery=document.querySelector('#delivery-method'),region=document.querySelector('#region'),regionLabel=document.querySelector('#region-label'),deliveryNote=document.querySelector('#delivery-note');
function recalcCheckout(){
  const sub=subtotal();let ship=0;let shipText='—';
  if(delivery.value==='Lalamove'){shipText='Paid to rider';deliveryNote.hidden=false;deliveryNote.textContent='Lalamove delivery fee is paid directly to the rider upon delivery and is not included in your store total.';regionLabel.hidden=true;region.required=false;}
  else if(delivery.value==='J&T'){regionLabel.hidden=false;region.required=true;deliveryNote.hidden=false;deliveryNote.textContent='J&T shipping is added to your order total.';if(region.value){ship=shippingRates[region.value]||0;shipText=peso(ship)}}
  else{regionLabel.hidden=true;region.required=false;deliveryNote.hidden=true}
  document.querySelector('#checkout-subtotal').textContent=peso(sub);document.querySelector('#checkout-shipping').textContent=shipText;document.querySelector('#checkout-total').textContent=peso(sub+ship);
  return {sub,ship,total:sub+ship,shipText};
}
delivery.addEventListener('change',()=>{if(delivery.value!=='J&T')region.value='';recalcCheckout()});region.addEventListener('change',recalcCheckout);

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
  if(!ORDER_ENDPOINT || ORDER_ENDPOINT.includes('PASTE_YOUR_')){toast('Checkout connection is not deployed yet.');return}

  const submitButton=form.querySelector('button[type="submit"]');
  const originalText=submitButton.textContent;
  submitButton.disabled=true;submitButton.textContent='SENDING ORDER…';

  try{
    const fd=new FormData(form); const totals=recalcCheckout();
    if(fd.get('deliveryMethod')==='J&T'&&!fd.get('region')){throw new Error('Select your J&T destination.')}
    const orderNo=makeOrderNumber();
    const entries=cartEntries();
    const itemLines=entries.map(({product:p,qty})=>`${qty}× ${p.name} ${p.size} — ${peso(p.price*qty)}`).join('\n');
    const itemData=entries.map(({product:p,qty})=>({id:p.id,code:p.code,name:p.name,size:p.size,price:p.price,qty,lineTotal:p.price*qty}));
    lastOrderSummary=`PEPTIQUE BEAUTY PH\nOrder: ${orderNo}\n\n${itemLines}\n\nSubtotal: ${peso(totals.sub)}\nShipping: ${totals.shipText}\nTotal: ${peso(totals.total)}\n\nCustomer: ${fd.get('fullName')}\nContact: ${fd.get('contact')}\nEmail: ${fd.get('email')||'—'}\nAddress: ${fd.get('address')}, ${fd.get('barangay')}, ${fd.get('city')}, ${fd.get('province')}\nLandmark: ${fd.get('landmark')||'—'}\nDelivery: ${fd.get('deliveryMethod')}${fd.get('region')?' — '+fd.get('region'):''}\nPayment: ${fd.get('paymentMethod')}\nNotes: ${fd.get('notes')||'—'}`;

    const receipt=await fileToPayload(document.querySelector('#receipt').files?.[0]);
    const payload={
      orderNumber:orderNo,
      customer:{fullName:fd.get('fullName'),contact:fd.get('contact'),email:fd.get('email')||'',address:fd.get('address'),barangay:fd.get('barangay'),city:fd.get('city'),province:fd.get('province'),landmark:fd.get('landmark')||''},
      delivery:{method:fd.get('deliveryMethod'),region:fd.get('region')||'',shippingFee:totals.ship,shippingText:totals.shipText},
      payment:{method:fd.get('paymentMethod'),status:'Paid - To verify'},
      items:itemData,itemsText:itemLines,subtotal:totals.sub,total:totals.total,notes:fd.get('notes')||'',orderSummary:lastOrderSummary,receipt
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
document.querySelector('#continue-shopping').addEventListener('click',()=>{document.querySelector('#success-modal').hidden=true;cart={};saveCart();form.reset();panel.hidden=true;document.querySelector('#file-name').textContent='Choose image or PDF';document.querySelector('#shop').scrollIntoView({behavior:'smooth'})});

renderProducts();updateCart();
