
// cat data loading
function DataLoad(){

    const url=`https://openapi.programming-hero.com/api/videos/categories`
    fetch(url)
    .then(res=>res.json())
    .then(Data=>{

        // cat btn create
 const btnContainer=getId('btnContainer')
Data.data.forEach(cat => {
// console.log(cat)
const Btn=document.createElement('div')
Btn.innerHTML=`
<button class="btn colorBtn" id='${cat.category}' onclick="catId('${cat.category_id}','${cat.category}')">${cat.category}</button>
`
btnContainer.appendChild(Btn)
});


    })

}

function catId(cId,isBG){

const colorBtn=document.getElementsByClassName('colorBtn')
for(const btn of colorBtn){
    btn.classList.remove('bg-red-500')
}
getId(isBG).classList.add('bg-red-500')

DataLoad2(cId)
}
let rejValue='1000'
let sorted=false

function sort(){
sorted=true
DataLoad2(rejValue,sorted)
}

// cat id data loading

function DataLoad2(cId,sorted){
    console.log(sorted)
rejValue=cId
    const url=`https://openapi.programming-hero.com/api/videos/category/${cId}`
    fetch(url).then(res=>res.json())
    .then(Data=>{
if(sorted){

    Data.data.sort((a,b)=>{
        const firstE=a.others.views
        const second=b.others.views
        const firstViewNumber=parseInt(firstE.replace('K','')||0)
        const secondViewNumber=parseInt(second.replace('K','')||0)
        return  secondViewNumber - firstViewNumber 
    })

}
        

// empty message enable
if(Data.data.length===0){
    getId('emptyMessage').classList.remove('hidden')
}else{
    getId('emptyMessage').classList.add('hidden')
}


        Data=Data.data




const videoContainer=getId('VideoContainer');
videoContainer.innerHTML=''
Data.forEach((Video)=>{
    // console.log(Video)
// create a video card

// set verified
let vImg=''
if(Video.authors[0]?.verified||undefined){
   vImg=`<img src="v.png" alt="" class="">`
}


const videoCard=document.createElement('div')
videoCard.classList='card w-96 bg-base-100 shadow-xl'
videoCard.innerHTML=`
<div>
<figure><img src="${Video.thumbnail}" alt="Shoes" /></figure>
</div>

<div class="flex items-center px-2 gap-3  pb-6 pt-4">
          
<div class='w-1/6'>
<img src="${Video.authors[0]?.profile_picture}" alt="" class="w-full rounded-full">
</div>
<div>
<h2 class="card-title">${Video.title}</h2>
<div class='flex items-center gap-2'>
<p class='font-semibold text-blue-400'>${Video?.authors[0]?.profile_name}</p>
${vImg}
</div>
<p>${Video.others?.views||'00'} Views</p>
</div>
        </div>
`
videoContainer.appendChild(videoCard)

})

    })
    .catch(Error=>console.error(Error))
}






DataLoad()
DataLoad2(rejValue,sorted)
