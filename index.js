const questions = () => {
  window.location.href = "second.html";
};
const homeBtn = () => {
  window.location.href = "index.html";
};

const LoadData = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const value = data.data;

  //  this is the category adding section
  const categoryContainer = document.getElementById("display-category");
  value.forEach((category) => {
    const NewDiv = document.createElement("div");
    NewDiv.classList = ` `;
    NewDiv.innerHTML = `
  <div  class="tabs tabs-boxed ">
  <a onclick="displayLoad('${category.category_id}')" class="tab">${category.category}</a> 
 
</div>
  `;
    categoryContainer.appendChild(NewDiv);
  });
};

const displayLoad = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const dataArray = data.data;

  getCategory(id);

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  // condition_----------------------------------------

  if (dataArray.length === 0) {
    cardContainer.classList.remove("grid");
    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
 
 <img src="./img/icon.png" alt="" class="mx-auto mt-6 md:mt-20 ">
 <h1 class="text-center font-bold pt-3 text-2xl"> Oops!! Sorry, There is no content here</h1>
 
 `;
    cardContainer.appendChild(cardDiv);
  }
  // ----------------------------------------------------------------
  else {
    displayCard(dataArray)
  }

};

let catId = 0;
const getCategory = (id) => {
  catId = id;
}
const displayCard = (dataArray) => {

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  cardContainer.classList.add("grid");
  dataArray.forEach((card) => {
    // console.log(card.others.posted_date);
    const numbers = card.others.posted_date;

    const hours = Math.floor(numbers / 3600);
    const seconds = numbers % 3600;
    const minutes = Math.floor(seconds / 60);

    const cardDiv = document.createElement("div");
    const p = document.getElementById("p");
    cardDiv.classList = `card  shadow-xl`;
    cardDiv.innerHTML = `

 <figure  >
 <div class="flex justify-end">
   <img class="h-52 w-full relative" src="${card.thumbnail}"
   alt="not found">
    
   </img>
   
   

   <p id="p" class=" text-white  absolute  items-end  top-44 rounded-lg  text-center bg-black px-1    " >${numbers ? hours + "hrs " + minutes + " min" + " ago" : ""
      }  </p>
 
   
  
 
    </div>
   </figure>
   
   <div class="card-body ">
   
 
  
   

  
   <div class="card-footer flex justify-between   my-auto ">
     <div class="flex gap-4">
       <div>
         <div class="avatar online">
           <div class="w-14 rounded-full">
             <img
               src="${card.authors[0].profile_picture}"
             />
           </div>
         </div>
       </div>
       <div>
       <h2 class="card-title  ">
       ${card.title}
       </h2>
        <div class="flex justify-evenly gap-2 items-center">
      
     
         <h6>${card?.authors[0]?.profile_name}   </h6> 
        <h6> ${card?.authors[0]?.verified
        ? ' <img src="./img/verified.jpg" alt="" class"inline-block">'
        : ""
      }</h6>
        </div>
         <small> ${card?.others?.views}  Views </small>
       </div>
     </div>
    
   </div>
 </div>

 `;
    cardContainer.appendChild(cardDiv);
  });
}
document.getElementById('sort-btn').addEventListener('click',async function() {
    const res = await fetch(
      ` https://openapi.programming-hero.com/api/videos/category/${catId}`
    );
    console.log(catId);
    const data = await res.json();
    const array = data.data;
    const result = array.sort(
      (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
    );
    displayCard(result)

})






displayLoad(1000);
LoadData();