const dialog=document.querySelector('#booking-dialog');
document.querySelectorAll('a[href="index.html#demo"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();dialog.showModal();}));
document.querySelector('#close-booking').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const form=document.querySelector('#demo-form');const today=new Date();form.elements.date.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;document.querySelector('#form-status').textContent=`Demo request preview complete for ${form.elements.institution.value.trim()}. No request was sent or meeting booked.`;});
