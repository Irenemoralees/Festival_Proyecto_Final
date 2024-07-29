const mongoose = require('mongoose');
const User = require('./models/user.model');
const Festival = require('./models/festival.model');
const Booking = require('./models/booking.model');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

  const users = [
    {  name: "Alice Johnson", email: "alice@example.com", password: "password123", role: "user" },
    {  name: "Bob Smith", email: "bob@example.com", password: "password123", role: "admin" },
    {  name: "Charlie Brown", email: "charlie@example.com", password: "password123", role: "user" },
    { name: "Dana Scully", email: "dana@example.com", password: "password123", role: "admin" }
];


const festivals = [
    { festivalName: "Primavera Sound", type: "Pop-rock, Indie", description: "El Primavera Sound recupera su espíritu original con un cartel que homenajea los noventa y refleja las músicas del mundo, el underground y el mainstream, destacando la paridad y con un lineup mayoritariamente femenino. El festival asume su responsabilidad cultural y social, demostrando un compromiso con la igualdad.", image: "https://www.thenewbarcelonapost.com/wp-content/uploads/2022/06/Primavera-Sound-%C2%A9-Gaelle-Beri.jpg", location: "Barcelona", video:"", price: 70 },
    {festivalName: "Mad Cool Festival", type: "Pop, Rock, Indie", description: "El Mad Cool Festival es un evento musical en Madrid conocido por su variada oferta de géneros, que incluye rock, indie, pop, electrónica, hip-hop y música experimental. Atrae tanto a artistas consagrados como emergentes, ofreciendo una experiencia musical diversa y rica para sus asistentes.", image: "https://www.telemadrid.es/2020/02/18/noticias/cultura/Imagen-Mad-Cool_2205689432_7557944_1300x731.jpg", location: "Madrid", video: "https://youtu.be/WimUhHwVnSo?si=heaWktGRuZmvCtTw" , price: 80},
    {festivalName: "BBK Live Bilbao", type: "Pop-rock, Indie", description: "Festival que cuenta con bandas de la talla de Arcade Fire o Jungle y promesas como Alcalá Norte. Kobetamendi congrega a 110.000 personas procedentes de más de 50 países en estos tres días de disfrute de la música en directo en la naturaleza en un festival cuidado y comprometido en un entorno único en Bilbao BBK Live.", image: "https://bilbaobbklive.com/wp-content/uploads/2023/06/BBL22_AMBIENTE_LogoBBL_SHARONLOPEZ_2-1-scaled.jpg", location: "Bilbao", video: "https://www.youtube.com/embed/SswWog-ZwsM?si=iKnaULQ_ZA2mL1Bz" , price: 95},
    {festivalName: "Bombastic Festival", type: "Pop-rock, Trap, Indie, Reguetón", description: "El Bombastic Festival en Asturias es un evento musical que ofrece una variada programación con géneros como electrónica, hip-hop, trap, pop, indie y, sobre todo, cargado de reguetón. Atrae tanto a artistas nacionales como internacionales, proporcionando una experiencia vibrante y diversa para sus asistentes.", image: "https://www.atlanticohoy.com/uploads/s1/31/09/02/3/un-escenario-del-festival-boombastic-festival-boombastic.webp", location: "Asturias", video: "https://www.youtube.com/embed/izYDADBHhmk?si=c4m0Ftfogec5DjKC" , price: 60},
    { festivalName: "Mallorca Live Festival", type: "Pop-rock, Indie, Punk, Electrónica", description: "El festival en Magaluf, que ya cumple 7 ediciones, se consolida como una gran propuesta insular en España. Reúne a artistas de pop, rock, indie, punk y electrónica, abarcando desde clásicos hasta la nueva generación, celebrándose en Calvià a inicios del verano bajo el sol del Mediterráneo.", image: "https://s3.ppllstatics.com/salamancahoy/www/multimedia/2023/05/20/mallorcalivefestival-k1YF-U200345900362UBI-1200x840@SalamancaHoy.jpg", location: "Mallorca", video: "https://youtu.be/SB0AeSMCuT0?si=Jta0jIXnQDoYXCU1", price: 70 },
    {festivalName: "Resurrection Fest", type: "Hardcore punk, Metal, Heavy metal", description: "Con 18 ediciones, el Resurrection ha transformado Viveiro en un destino clave para la comunidad metalera de España y Europa. Aunque inicialmente centrado en hardcore punk y metal alternativo, el festival ahora incluye propuestas más masivas y generalistas de rock.", image: "https://www.riffvalley.es/wp-content/uploads/2023/03/0.jpg", location: "Galicia", video: "https://youtu.be/WkCWGeCMla4?si=VkDeEByiioFFosIy" , price: 75},
    { festivalName: "Sonorama", type: "Pop alternativo", description: "Con 26 ediciones y en su 27ª edición, el festival indie de referencia en España ha renovado su modelo de crecimiento vertical y su audiencia, manteniendo el equilibrio entre nuevas generaciones y seguidores veteranos. Se consolida como un punto de encuentro intergeneracional centrado en el pop alternativo.", image: "https://www.laguiago.com/wp-content/uploads/2022/05/98-min.png", location: "Castilla y León", video: "https://youtu.be/k2GAUBe6zzk?si=041CUjfSgwjh3Urb" , price: 50},
    { festivalName: "Río Babel", type: "Reguetón, Pop, Rock", description: "Río Babel nace con el propósito de tender puentes entre la música de Latinoamérica y España. Es el festival más ecléctico que inaugura el verano en Madrid y a día de hoy, ya se ha consolidado como uno de los festivales de referencia en la capital.", image: "https://i0.wp.com/rawmagazine.es/wp-content/uploads/2023/07/DSC4283.jpg?fit=1500%2C1001&ssl=1", location: "Madrid", video: "https://youtu.be/LYZKtQwKwig?si=qZtoN8icIDndGFD6" , price: 60},
    {festivalName: "Viña Rock", type: "Rock", description: "Uno de los festivales que más apuesta por su esencia vuelve con todas las pilas recargadas. Viña Rock volverá a reunir a miles de amantes del rock este 2024 para disfrutar del sonido de las mejores guitarras eléctricas.", image: "https://static.eldiario.es/clip/3492da3a-c15f-455e-8ffa-67f83d117edc_16-9-discover-aspect-ratio_default_0.jpg", location: "Albacete", video: "https://youtu.be/Uaqrjws4BRQ?si=f_TvW-vZLaVtK-pu" , price: 40},
    { festivalName: "Medusa Sunbeach Festival", type: "Electrónica", description: "El Medusa Sunbeach Festival, celebrado en la playa de Cullera, Valencia, desde 2014, es un evento de música electrónica que presenta estilos como EDM, Techno, Indie, Hardstyle, Dubstep y Trap. Cada edición tiene una temática diferente, que inspira la estética del escenario principal.", image: "https://wololosound.com/wp-content/uploads/1697453783-medusa-festival-entradas-2024-enterticket.jpg", location: "Valencia", video: "https://youtu.be/CbRoIUjeNM8?si=1V-tJzZ6eYtLU1EM", price: 80 },
    { festivalName: "Marenostrum", type: "Pop, Rock, Electrónica, Reguetón", description: "MARENØSTRUM FUENGIROLA es uno de los recintos musicales al aire libre más espectaculares y uno de los escenarios más exclusivos de España por su cercanía al mar y por la visión del monumental castillo Sohail. Nació en 2016, como una apuesta clara y decidida del Ayuntamiento fuengiroleño por la música en vivo.", image: "https://cdn.valenciaplaza.com/public/Image/2019/7/imagen147528g_NoticiaAmpliada_NoticiaAmpliada_NoticiaAmpliada.jpg", location: "Fuengirola", video: "https://youtu.be/lMN_PlsHgZk?si=vTWJm1HW8NAim50D", price: 70 },
    { festivalName: "Coca-Cola Music Experience", type: "Pop, Rock, Reguetón, Indie", description: "El Coca-Cola Music Experience es un festival musical en España orientado a la juventud, que presenta una amplia gama de géneros como pop, rock, indie y electrónica. Organizado por Coca-Cola, se celebra en varias ciudades españolas y ofrece una experiencia festiva con artistas reconocidos y emergentes, combinando música en vivo con actividades interactivas.", image: "https://bcma.es/wp-content/uploads/2019/10/IPSOS-SAVE-THE-DATE-28-JUNIO-3.png", location: "Madrid", video: "https://youtu.be/MvH-uTEijHg?si=JgIR0zMPbJlTRxmX", price: 60 },
    { festivalName: "A Summer Story", type: "Techno, House, Electrónica", description: "A Summer Story es un festival de música electrónica celebrado en Madrid, España. Enfocado en géneros como EDM, techno y house, ofrece grandes escenarios y producciones visuales impresionantes, atrayendo a un público joven y entusiasta de la música electrónica.", image: "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2023/10/13122055/01_ASS23_Jota_00037-1-1-1.jpg", location: "Madrid", video: "https://youtu.be/SwjYFlMgKt4?si=9Mr1BEUueECukfMz" , price: 50},
    { festivalName: "Reggaetón Beach Festival", type: "Reguetón", description: "El **Reguetón Beach Festival** es un evento de música urbana centrado en reguetón y géneros relacionados, celebrado en playas y zonas costeras de España. Atrae a un público joven y ofrece una experiencia festiva en un ambiente playero.", image: "https://s3.eu-west-1.amazonaws.com/rbfweb2023/festivals/August2023/YMmJRVndzgxItkFFsxgB.jpg", location: "Madrid", video: "https://youtu.be/9k51XaBZLuw?si=xXJByZG2ova0rVrL" , price: 55},
    { festivalName: "Arenal Sound", type: "Pop, Rock, Indie, Electrónica", description: "Arenal Sound es un festival de música en Burriana, Castellón, que ofrece una variedad de géneros como pop, rock, indie y electrónica. Se celebra cerca de la playa, atrae a un público joven y cuenta con múltiples escenarios durante varios días.", image: "https://estaticos-cdn.prensaiberica.es/clip/540119ae-60b7-4a20-9c04-6b40cd5b7a37_16-9-discover-aspect-ratio_default_0.jpg", location: "Castellón", video: "https://youtu.be/OU3QgGAEUFM?si=4CIYkyKE-im0ErTc", price: 65 }

];




const seedDB = async () => {
    await User.deleteMany({});
    await Festival.deleteMany({});
    await Booking.deleteMany({});
  
    for (const user of users) {
        const newUser = new User(user);
        await newUser.save();
    }

    for (const festival of festivals) {
        const newFestival = new Festival(festival);
        await newFestival.save();
    }

    // for (const booking of bookings) {
    //     const newBooking = new Booking(booking);
    //     await newBooking.save();
    // }
};

seedDB().then(() => {
    console.log(`Seeds creadas correctamente!`)
    mongoose.connection.close();
});