const productsData = [
    {
       id: 1,
       name: "Emilia",
       price: 10.500,
       category: "Sets",
       img: "./assets/img/set1.jpg",
    },
    {
       id: 2,
       name: "Madison",
       price: 11.000,
       category: "Sets",
       img: "./assets/img/set5.jpg",
   }, 
   {
       id: 3,
       name: "Rosina",
       price: 12.500,
       category: "Sets",
       img: "./assets/img/set2.jpg",
   },
   {
       id: 4,
       name: "Santorini",
       price: 13.500,
       category: "Sets",
       img: "./assets/img/set4.jpg",
   },
   {
       id: 5,
       name: "Cleo",
       price: 9.900,
       category: "SS24",
       img: "./assets/img/summer1.jpg",
   },
   {
       id: 6,
       name: "Moana",
       price: 10.000,
       category: "SS24",
       img: "./assets/img/summer2.jpg",
   },
   {
       id: 7,
       name: "Eva",
       price: 10.500,
       category: "SS24",
       img: "./assets/img/summer3.jpg",
   },
   {
       id: 8,
       name: "Danna",
       price: 11.000,
       category: "SS24",
       img: "./assets/img/summer4.jpg",
   },
   {
       id: 9,
       name: "Cassie",
       price: 8.000,
       category: "Dresses",
       img: "./assets/img/dress1.jpg",
   },
   {
       id: 10,
       name: "Kylie",
       price: 8.800,
       category: "Dresses",
       img: "./assets/img/dress2.jpg",
   },
   {
       id: 11,
       name: "Kendall",
       price: 9.000,
       category: "Dresses",
       img: "./assets/img/dress3.jpg",
   },
   {
       id: 12,
       name: "Lena",
       price: 9.500,
       category: "Dresses",
       img: "./assets/img/dress4.jpg",
   },
   {
       id: 13,
       name: "Ambar",
       price: 4.500,
       category: "Tops",
       img: "./assets/img/tops1.jpg",
   },
   {
       id: 14,
       name: "Emma",
       price: 6.000,
       category: "Tops",
       img: "./assets/img/tops2.jpg",
   },
   {
       id: 15,
       name: "Kim",
       price: 5.000,
       category: "Tops",
       img: "./assets/img/tops3.jpg",
   },
   {
       id: 16,
       name: "Hallie",
       price: 6.000,
       category: "Tops",
       img: "./assets/img/top4.jpg",
   },
   {
       id: 17,
       name: "Cher",
       price: 12.500,
       category: "Bottoms",
       img: "./assets/img/bottom1.jpg",
   },
   {
       id: 18,
       name: "Hannah",
       price: 21.000,
       category: "Bottoms",
       img: "./assets/img/bottom2.jpg",
   },
   {
       id: 19,
       name: "Kourtney",
       price: 15.000,
       category: "Bottoms",
       img: "./assets/img/bottom3.jpg",
   },
   {
       id: 20,
       name: "Afrika",
       price: 20.000,
       category: "Bottoms",
       img: "./assets/img/bottom4.jpg",
   },
   ];
   
   // @param {number} size 
   // @returns {array}
   
   const DivideProductsInParts = (size) => {
       let productsList = [];
       for (let i = 0; i < productsData.length; i += size)
         productsList.push(productsData.slice(i, i + size));
       return productsList;
     };
     
     const appState = {
       products: DivideProductsInParts(8),
       currentProductsIndex: 0,
       productsLimit: DivideProductsInParts(8).length,
       activeFilter: null,
     };