window.addEventListener('load',()=>{
	let long;
	let lat;
	let temperatureDescrip = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	let temperatureSectionSpan = document.querySelector('.temperature span');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat  = position.coords.latitude;


			const proxy=`https://cors-anywhere.herokuapp.com/`;
			const api=`${proxy}https://api.darksky.net/forecast/6777d8c6cb3e7ec1515650cc41654b31/${lat},${long}`;

			fetch(api)
			.then(respone =>{
			return respone.json();
			})
			.then(data =>{
			const {temperature,summary,icon} = data.currently;
			temperatureDegree.textContent=temperature;
			temperatureDescrip.style.fontSize="larger";
			temperatureDescrip.textContent=summary;
			locationTimezone.textContent=data.timezone;
			//formula for celcius
			let celcius=(temperature-32)*(5/9);

			//seticons
			setIcons(icon,document.querySelector('.icon'));

			//change temperature to c /f;
			temperatureSection.addEventListener("click",()=>{
				if(temperatureSectionSpan.textContent==="F"){
					temperatureSectionSpan.textContent="C";
					temperatureDegree.textContent= Math.floor(celcius);
				}else{
					temperatureSectionSpan.textContent="F";
					temperatureDegree.textContent=temperature;
				}
			})

					});
		});
	}
	function setIcons(icon,iconId){
		const skycons= new Skycons({color:"white"});
		const currentIcon= icon.replace(/-/g ,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);
	}
});