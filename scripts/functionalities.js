function convert_date_to_minutes_formate(seconds) {
  // Calculate the number of hours
  const hours = Math.floor(seconds / 3600);

  // Calculate the remaining seconds after subtracting the hours
  const remainingSeconds = seconds % 3600;

  // Calculate the number of minutes
  const minutes = Math.floor(remainingSeconds / 60);

  return { hours, minutes };
}
const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categories = data.data;

  setCategories(categories);
};

const setCategories = (categories) => {
  let category_container = document.getElementById("category-container");

  console.log(categories);
  let element_strings = "";
  categories.forEach((category) => {
    if (category.category === "All") {
      element_strings += ` <input  onclick= "showCards( '${category.category_id}')" type="radio" name="options" data-title="${category.category}" class="btn " checked />`;
    } else
      element_strings += ` <input onclick= "showCards( '${category.category_id}')" type="radio" name="options" data-title="${category.category}" class="btn" />`;
  });

  category_container.innerHTML = element_strings;
};

const showCards = async (category_id) => {
  console.log("id: ", category_id);
  let card_area = document.getElementById("card-area");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  const data = await res.json();
  const specific_categories = data.data;
  console.log(specific_categories);
  let element_strings = "";
  specific_categories.forEach((specific_category) => {
    console.log(specific_category);

    let time_in_seconds = specific_category.others.posted_date;
    console.log("date:", time_in_seconds);
    let time_in_hrs_min = convert_date_to_minutes_formate(time_in_seconds);
    console.log(
      "date:",
      time_in_hrs_min.hours,
      "hrs  ",
      time_in_hrs_min.minutes
    );
    element_strings += `  <div class="card">
         <div class="img-container border h-72 p-5 ">
           <img class=" object-fill h-52 w-96  rounded-md" src=${specific_category.thumbnail} class="" alt="" srcset="" />
 <div class="relative -top-[40px] flex justify-end">
 `;

    if (specific_category.others.posted_date.length > 0) {
      element_strings += `      <p class="bg-black text-center me-2  w-40 text-white  ">      ${time_in_hrs_min.hours}hrs ${time_in_hrs_min.minutes} min ago
  </p>
</div>
      
    </div>
    <div class="card-contents mt-5  border gap-5 flex">
     
<img class=" w-[60px] h-[60px] rounded-full" src=${specific_category.authors[0].profile_picture} alt="" srcset="">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold">
      ${specific_category.title}
        </h1> `;
    } else {
      element_strings += `    
</div>
      
    </div>
    <div class="card-contents  border mt-5 gap-5 flex">
     
<img class=" w-[60px] h-[60px] rounded-full" src=${specific_category.authors[0].profile_picture} alt="" srcset="">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold">${specific_category.title}
        </h1>`;
    }

    

    if (specific_category.authors[0].verified === true) {
      element_strings += `             <div class="flex gap-2">
                  <p class="text-gray">${specific_category.authors[0].profile_name}</p>
                   
                  <svg class="mt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_11_215)">
    <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
    <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
  </g>
  <defs>
    <clipPath id="clip0_11_215">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
                  </div>
     
                  <p class="text-gray">${specific_category.others.views} views</p>
               
                </div>
              </div>
            </div>`;
    } else {
      element_strings += `<div class="flex">
                    <p class="text-gray">${specific_category.authors[0].profile_name}</p>
         
                    </div>
       
                    <p class="text-gray">${specific_category.others.views} views</p>
                 
                  </div>
                </div>
              </div>`;
    }
  });

  card_area.innerHTML = element_strings;
};

showCards(1000);
loadCategory();
