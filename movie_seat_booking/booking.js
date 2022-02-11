let movieList = '';
let selectedSeats = [];
let finalprice = 0;
let finalAmt = null;
window.onload = function () { 
   [...Array(9).keys()].map((i) => {
      let j = 0;
      document.getElementById(`Seatrow-${i}`).innerHTML = `
         <div class="col-sm-3 text-right">
            <span class='pl-2 seats' id=${'seat-'+i+j}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+1)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+2)}>&#9751;</span>
         </div>
         <div class="col-sm-3 text-center ">
            <span class='pl-2 seats occupied' id=${'seat-'+i+''+(j+3)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+4)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+5)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+6)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+7)}>&#9751;</span>
         </div>
         <div class="col-sm-3">
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+8)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+9)}>&#9751;</span>
            <span class='pl-2 seats' id=${'seat-'+i+''+(j+10)}>&#9751;</span>
         </div>
      `
   })
   const fetchMovies = async () => {
      const resonse = await fetch('./movie.json');
      const data = await resonse.json();
      const movies = Object.values(data)
      Object.values(movies).map(function(movie){
         movieList  = movie;
        return Object.values(movie).map(function(mov){
           let newE = document.createElement('option')
           let optionText = document.createTextNode(`${mov.name} - ${mov.price}`)
           newE.appendChild(optionText)
           newE.setAttribute('value',mov.name);
           newE.setAttribute('data-price',mov.price);
           newE.setAttribute("data-amount",mov.amount);
           return document.querySelector('#movieListSelector').append(newE)
         })
      })
   }
   fetchMovies()
}
window.addEventListener('keypress',function(){
   if(selectedSeats.length === 0 )
      document.querySelector('#selectedSeatsList span').innerHTML = 'None'
})
setTimeout(() => {
   const seats = document.querySelectorAll('.seats')
   const onMovieChange = document.querySelector('#movieListSelector');
   function seatSelected(e){
      e.preventDefault();
      let seat = this.getAttribute('id')
      let prevClassNames = this.className;
      
      if(this.className.toString().includes('occupied')){
         alert('Seat Already Occupied!! \n Please Select another One')
      }
      else{
         if(this.className.toString().includes('selected')){
            // unselect the seat;
            
            this.className = `pl-2 seats`;
            let seatUnselection = selectedSeats.findIndex(function(value){
               return seat === value ? value : null
            });
            selectedSeats.filter(function(value){
               return value === seat ? (selectedSeats.splice(seatUnselection,1) ): null   
            })
            
         }
         else{
            this.className = `${prevClassNames} selected`
            if(!selectedSeats.includes(seat)){
               selectedSeats.push(seat)
            }
            else{
               alert('This Seat cannot be Selected \n Cause its either Occupied or Selected')
            }
         }
      } 
      document.querySelector('#selectedSeatsList span').innerHTML = selectedSeats.toString();
      finalAmt = document.querySelector('#MPrice #priceOMovie').getAttribute('data-amount');
      finalprice = finalAmt * selectedSeats.length;
   }
   function getMovie(){
      if(this.value === 'ChooseMovie'){
         document.querySelector('#selectedMovieName #MName').innerHTML = `None`;
         document.querySelector('#selectedMovieName #MPrice').style.display = 'none';         
         document.querySelector('#selectedMovieName #MPrice span').innerHTML = `$0.00`;
      }
      document.querySelector('#selectedMovieName #MName').innerHTML = `${this.value}`;
      document.querySelector('#selectedMovieName #MPrice').style.display = 'block';
      document.querySelector('#selectedMovieName #MPrice #priceOMovie').setAttribute('data-amount',this.selectedOptions[0].dataset.amount);
      document.querySelector('#selectedMovieName #MPrice #priceOMovie').innerHTML = `${this.selectedOptions[0].dataset.price}`;
      finalAmt = document.querySelector('#MPrice #priceOMovie').getAttribute('data-amount');
      finalprice = finalAmt * selectedSeats.length;
   }
   seats.forEach(function(seat){
      seat.addEventListener('click',seatSelected)
   })
   onMovieChange.addEventListener('change',getMovie);
},100)
setInterval(() => {
   if(finalprice !== 0){
      document.querySelector("#finalAmount").style.display = "block";
      document.querySelector("#payMe").innerHTML = "$"+finalprice
   }
},200)