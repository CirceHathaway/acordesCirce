const songs = [
    {
        title: "Al el Alto y Sublime",
        artist: "Gadiel Espinosa",
        key: "A",
        content:
        `        <span class="chord">A</span>                          <span class="chord">D</span>
        A el alto y sublime que habita en la eternidad
            <span class="chord">Bm</span>                        <span class="chord">E</span>    
        Y su nombre es el santo de Israel
        <span class="chord">A</span>                             <span class="chord">D</span>
        Al que habita en las alturas y en la santidad
               <span class="chord">Bm</span>                          <span class="chord">E</span> 
        Y con el quebrantado y humilde de espiritu

        <span class="chord">F#m</span>                  <span class="chord">D</span>
        Para hacer vivir el espiritu humilde
        <span class="chord">F#m</span>                    <span class="chord">D</span>         <span class="chord">E</span>
        Y para vivificar el corazon quebrantado

        <span class="chord">A</span>               <span class="chord">E</span>      <span class="chord">Bm</span>        <span class="chord">D</span>   <span class="chord">E</span>
        Sea la gloria  honor  alabanza y  poder
        <span class="chord">A</span>                   <span class="chord">E</span>          <span class="chord">Bm</span> 
        Al que reina por los siglos y su nombre
        <span class="chord">D</span> <span class="chord">E</span>  <span class="chord">A</span>
        Santo  es.`
    },

    {
        title: "Digno y Santo",
        artist: "Kari Jobe",
        key: "D",
        content: `
        <span class="chord">D</span>           <span class="chord">Am</span>        <span class="chord">C</span>              <span class="chord">G</span>
        Digno y santo el cordero inmolado en la cruz
        <span class="chord">D</span>          <span class="chord">Am</span>          <span class="chord">C</span>                  <span class="chord">G</span>
        Nuevo canto levantaremos al que en su trono esta

        <span class="chord">D</span>                 <span class="chord">Am</span>
        Santo, santo, santo Dios todo poderoso
        <span class="chord">C</span>                                    <span class="chord">G</span>
        Quien fue, quien es y quien vendrá
        <span class="chord">D</span>                  <span class="chord">Am</span>
        La creación te canta hosanna al gran yo soy
        <span class="chord">C</span>                <span class="chord">G</span>
        Tu eres mi todo y yo te adorare

        <span class="chord">D</span>            <span class="chord">Am</span>           <span class="chord">C</span>                <span class="chord">G</span>
        De un arco iris estas vestido tu voz resuena como un estruendo
        <span class="chord">D</span>                 <span class="chord">Am</span>               <span class="chord">C</span>              <span class="chord">G</span>
        Recibe honor y gloria, poder y majestad a ti al único rey

        <span class="chord">D</span>                 <span class="chord">Am</span>
        Santo, santo, santo Dios todo poderoso
        <span class="chord">C</span>                                    <span class="chord">G</span>
        quien fue, quien es y quien vendrá
        <span class="chord">D</span>                  <span class="chord">Am</span>
        La creación te canta hosanna al gran yo soy
        <span class="chord">C</span>                <span class="chord">G</span>
        Tu eres mi todo y yo te adorare

        <span class="chord">D</span>            <span class="chord">Am</span>           <span class="chord">C</span>           <span class="chord">G</span>
        Tan grandioso, asombroso con solo decir Jesús
        <span class="chord">D</span>              <span class="chord">Am</span>
        Cristo tu nombre es grande fuerte inagotable
        <span class="chord">C</span>               <span class="chord">G</span>
        Tu misterio glorioso es

        <span class="chord">D</span>                 <span class="chord">Am7</span>
        Santo,santo, santo Dios todo poderoso
        <span class="chord">C</span>                                    <span class="chord">G</span>
        Quien fue, quien es y quien vendra
        <span class="chord">D</span>                  <span class="chord">Am7</span>
        La creación te canta hosanna al gran yo soy
        <span class="chord">C</span>                <span class="chord">G</span>
        Tu eres mi todo y yo te adorare.`
    },

    {
        title: "Santo Eres Tú",
        artist: "Rey de Reyes",
        key: "G",
        content: `
        <span class="chord">G</span>
        Se oye un son del cielo
        <span class="chord">G</span>
        Como el de muchas aguas
        <span class="chord">G</span>                       <span class="chord">D</span>
        Desde el trono viene, adoración
                <span class="chord">C</span>     <span class="chord">D</span>     <span class="chord">Em</span>
        Se oye un grito de alabanza
        <span class="chord">C</span>     <span class="chord">D</span>    <span class="chord">Em</span>
        Desde las naciones
        <span class="chord">C</span>           <span class="chord">Am</span>       <span class="chord">D</span>         <span class="chord">D7</span>
        y su gloria dan a conocer, Cantando.

        [Coro]
        <span class="chord">G</span>            <span class="chord">Bm</span>             <span class="chord">C</span>
        Santo, Santo Santo  es el Señor.
        <span class="chord">D</span>                        <span class="chord">Bm</span>
        Santo, Santo Santo  es el Señor.
        <span class="chord">C</span>             <span class="chord">D</span>          <span class="chord">Bm7</span>
        Multitud de ángeles, y redimidos
                <span class="chord">Em7</span>  <span class="chord">D</span>
        Te adoran hoy,
        <span class="chord">C</span>             <span class="chord">D</span>          <span class="chord">G</span>
        Santo, Santo, Santo eres Tú.`
    },

    {
        title: "Ven",
        artist: "Marco Barrientos",
        key: "D",
        content: `
        <span class="chord">D</span>                 <span class="chord">G</span>    <span class="chord">D</span>
        Ven, es hora de adorarle
        <span class="chord">A</span>               <span class="chord">Em7</span>  <span class="chord">G</span>
        Ven, abre tu corazón a Él
        <span class="chord">D</span>                   <span class="chord">G</span>  <span class="chord">D</span>
        Ven, ante su trono estamos
        <span class="chord">A</span>               <span class="chord">Em7</span>       <span class="chord">G</span>    <span class="chord">D</span>
        Ven, ante la majestad de Dios, ven

        [Coro]
        <span class="chord">G</span>                  <span class="chord">D</span>
        Toda lengua confesará que Él es Dios
        <span class="chord">G</span>                   <span class="chord">D</span>
        Las rodillas se doblarán
        <span class="chord">G</span>                   <span class="chord">Bm</span>
        Y un tesoro eterno tendrás en Él
            <span class="chord">Em</span>         <span class="chord">A</span>
        Si escoges su amor.

        [Final]
            <span class="chord">G</span>
        El es Rey,
            <span class="chord">D</span>
        El es Rey.`
    },

    {
        title: "Algo Está Cayendo Aquí",
        artist: "José Luis Reyes",
        key: "G",
        content: `
        <span class="chord">G</span>                  <span class="chord">Am</span>
        Algo está cayendo aquí
        <span class="chord">D</span>                    <span class="chord">G</span>
        Es tan fuerte sobre mí
        <span class="chord">Em</span>                <span class="chord">Am</span>
        Mis manos levantaré
        <span class="chord">D</span>                <span class="chord">G</span>  <span class="chord">C</span>  <span class="chord">G</span>
        Y su gloria tocaré

                <span class="chord">G</span>  <span class="chord">C</span>  <span class="chord">G</span>
        Está cayendo
                        <span class="chord">D</span>
        Su gloria sobre mí
                    <span class="chord">Am</span>
        Sanando heridas
                        <span class="chord">C</span>
        Levantando al caído
                        <span class="chord">D</span>
        Su gloria está aquí
                        <span class="chord">G</span>
        Su gloria está aquí.

        [Adoración]
                        <span class="chord">Em</span>  <span class="chord">D</span>
        Su gloria está aquí.`
    },

    {
        title: "De los Montes",
        artist: "Marco Barrientos",
        key: "D",
        content: `
        <span class="chord">D</span>
        Llenas nuestro hogar de danza
        <span class="chord">Bm</span>  <span class="chord">G</span>        <span class="chord">A</span>
        De tu gozo la Ciudad
        <span class="chord">D</span>
        La injusticia Tú quebrantas
        <span class="chord">Bm</span>      <span class="chord">G</span>           <span class="chord">A</span>
        Si se humilla Tu Heredad.

        [Coro]
                <span class="chord">D</span>     <span class="chord">A</span>       <span class="chord">G</span>
        De los montes    A los valles
              <span class="chord">Bm</span>      <span class="chord">F#m</span>      <span class="chord">G</span>   <span class="chord">A</span>
        Ya se escucha     el clamor
                <span class="chord">D</span>     <span class="chord">A</span>       <span class="chord">G</span>
        De los Cielos    A los Pueblos
              <span class="chord">Bm</span>     <span class="chord">F#m</span>       <span class="chord">G</span>   <span class="chord">A</span>    <span class="chord">D</span>
        Ya te cantan      Con Amor.

        [Verso 2]
        <span class="chord">D</span>
        Tu Luz Vence las tinieblas
        <span class="chord">Bm</span>    <span class="chord">G</span>           <span class="chord">A</span>
        Al andar ante la Cruz
        <span class="chord">D</span>
        Llena Tu Gloria la Tierra
        <span class="chord">Bm</span>      <span class="chord">G</span>           <span class="chord">A</span>
        Como el mar en plenitud.

        [Puente]
            <span class="chord">G</span>    <span class="chord">Em</span>       <span class="chord">Bm</span>   <span class="chord">F#m</span>
        //Aleluya,      Aleluya
            <span class="chord">G</span>    <span class="chord">Em</span>        <span class="chord">A</span>
        Aleluya,      Aleluya//`
    },

    {
        title: "Al que es Digno",
        artist: "Marcos Witt",
        key: "C",
        content: `
        <span class="chord">C</span>                 <span class="chord">F</span>         <span class="chord">G</span>
        Al que es digno de recibir la gloria
                <span class="chord">C</span>        <span class="chord">F</span>        <span class="chord">G</span>
        Al que es digno de recibir honor

        <span class="chord">F</span>                 <span class="chord">G</span>           <span class="chord">Em</span> <span class="chord">Am</span>
        Levantemos nuestras manos y adoremos
            <span class="chord">F</span>      <span class="chord">G</span>       <span class="chord">Em</span> <span class="chord">Am</span>
        A Jesús cordero de gloria
              <span class="chord">F</span>      <span class="chord">G</span>             <span class="chord">Em</span>   <span class="chord">A</span>
        Y exaltemos su incomparable majestad
               <span class="chord">F</span>            <span class="chord">G</span>
        Al que vive por siempre
        <span class="chord">F</span>           <span class="chord">G</span>       <span class="chord">C</span>
        Al gran yo soy, a Jesús.`
    },

    {
        title: "Atrae mi Corazón",
        artist: "Marcos Brunet",
        key: "C",
        content: `
        <span class="chord">C</span>                    <span class="chord">F</span>
        Es a Ti a quien a anhelo
                           <span class="chord">Dm</span>
        Es por Ti que yo suspiro
                    <span class="chord">F</span>        <span class="chord">G</span>
        Más allá del velo yo voy
                         <span class="chord">Am</span>     <span class="chord">G</span>  <span class="chord">C</span>
        A decirte que te quiero, Jesús.

        [Coro]
                  <span class="chord">F</span>
        Atrae mi corazón
                  <span class="chord">Dm</span>
        Atrae mi corazón
                  <span class="chord">F</span>        <span class="chord">G</span>
        Atrae mi corazón, Jesús
                             <span class="chord">Am</span>  <span class="chord">G</span>  <span class="chord">C</span>
        Me muero de amor por Ti.

        [Verso 2]
                            <span class="chord">F</span>
        Quiero que el mundo sepa
                            <span class="chord">Dm</span>
        Quiero que el mundo vea
                       <span class="chord">F</span>     <span class="chord">G</span>
        Que Tú eres mi amado
                 <span class="chord">Am</span>    <span class="chord">G</span>   <span class="chord">C</span>
        Y yo soy tuyo.

        [Puente]
        <span class="chord">F</span>         <span class="chord">Dm</span>         <span class="chord">Am</span>
        Yo en Ti y Tu en mí Jesús,
                    <span class="chord">G</span>
        este es el pacto.`
    }
];