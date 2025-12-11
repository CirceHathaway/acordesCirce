const songs = [
    {
        title: "Al Alto y Sublime",
        artist: "Gadiel Espinosa",
        key: "A",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">A</span>A</span> el alto y sublime que <span class="g"><span class="chord">D</span>habita en la eternidad</span>
Y su <span class="g"><span class="chord">Bm</span>nombre</span> es el santo de <span class="g"><span class="chord">E</span>Israel.</span>
<span class="g"><span class="chord">A</span>Al</span> que habita en las alturas y <span class="g"><span class="chord">D</span>en la santidad,</span>
Y con el <span class="g"><span class="chord">Bm</span>quebrantado</span> y humilde de <span class="g"><span class="chord">E</span>espíritu.</span>

[Puente]
<span class="g"><span class="chord">F#m</span>Para</span> hacer vivir el <span class="g"><span class="chord">D</span>espíritu humilde,</span>
<span class="g"><span class="chord">F#m</span>Y</span> para vivificar el <span class="g"><span class="chord">D</span>corazón</span> <span class="g"><span class="chord">E</span>quebrantado.</span>

[Coro]
<span class="g"><span class="chord">A</span>Sea</span> la gloria <span class="g"><span class="chord">E</span>honor</span> <span class="g"><span class="chord">Bm</span>alabanza</span> y <span class="g"><span class="chord">D</span>poder</span> <span class="g"><span class="chord">E</span>...</span>
<span class="g"><span class="chord">A</span>Al</span> que reina por los <span class="g"><span class="chord">E</span>siglos</span> y su <span class="g"><span class="chord">Bm</span>nombre</span>
<span class="g"><span class="chord">D</span>San</span> <span class="g"><span class="chord">E</span>to</span> <span class="g"><span class="chord">A</span>es.</span>`
    },

    {
        title: "Digno y Santo",
        artist: "Ingrid Rosario",
        key: "D",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">D</span>Digno</span> y santo el <span class="g"><span class="chord">Am</span>cordero</span>
<span class="g"><span class="chord">C</span>Inmolado</span> en la <span class="g"><span class="chord">G</span>cruz,</span>
<span class="g"><span class="chord">D</span>Nuevo</span> canto levan<span class="g"><span class="chord">Am</span>taremos</span>
<span class="g"><span class="chord">C</span>Al</span> quien su trono <span class="g"><span class="chord">G</span>está.</span>

[Coro]
<span class="g"><span class="chord">D</span>Santo.</span> santo, santo,
<span class="g"><span class="chord">Am</span>Dios</span> todo poderoso,
<span class="g"><span class="chord">C</span>Quien</span> fue, quien es y quien <span class="g"><span class="chord">G</span>vendrá.</span>
<span class="g"><span class="chord">D</span>La</span> creación te canta,
<span class="g"><span class="chord">Am</span>Hosanna</span> al gran yo soy,
<span class="g"><span class="chord">C</span>Tu</span> eres mi todo,
<span class="g"><span class="chord">G</span>Y</span> yo te adoraré.

[Verso 2]
<span class="g"><span class="chord">D</span>De</span> un arco iris, esta <span class="g"><span class="chord">Am</span>vestido,</span>
<span class="g"><span class="chord">C</span>Tu</span> voz resuena como los <span class="g"><span class="chord">G</span>truenos.</span>
<span class="g"><span class="chord">D</span>Recibe</span> honor y gloria,
<span class="g"><span class="chord">Am</span>Poder</span> y majestad,
<span class="g"><span class="chord">C</span>A</span> ti al único <span class="g"><span class="chord">G</span>rey.</span>

[Puente]
<span class="g"><span class="chord">D</span>Tan</span> grandioso, <span class="g"><span class="chord">Am</span>asombroso</span>
<span class="g"><span class="chord">C</span>Con</span> solo decir <span class="g"><span class="chord">G</span>Jesús.</span>`
    },

    {
        title: "Santo Eres Tú",
        artist: "Rey de Reyes",
        key: "G",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">G</span>Se</span> oye un son del cielo
<span class="g"><span class="chord">G</span>Como</span> el de muchas aguas
<span class="g"><span class="chord">G</span>Desde</span> el trono viene, <span class="g"><span class="chord">D</span>adoración</span>
Se oye un <span class="g"><span class="chord">C</span>grito</span> <span class="g"><span class="chord">D</span>de</span> <span class="g"><span class="chord">Em</span>alabanza</span>
<span class="g"><span class="chord">C</span>Desde</span> <span class="g"><span class="chord">D</span>las</span> <span class="g"><span class="chord">Em</span>naciones</span>
<span class="g"><span class="chord">C</span>y</span> su gloria <span class="g"><span class="chord">Am</span>dan</span> a <span class="g"><span class="chord">D</span>conocer,</span> <span class="g"><span class="chord">D7</span>Cantando.</span>

[Coro]
<span class="g"><span class="chord">G</span>Santo, Santo</span> <span class="g"><span class="chord">Bm</span>Santo</span> es el <span class="g"><span class="chord">C</span>Señor.</span>
<span class="g"><span class="chord">D</span>Santo,</span> Santo Santo  es el <span class="g"><span class="chord">Bm</span>Señor.</span>
<span class="g"><span class="chord">C</span>Multitud</span> de <span class="g"><span class="chord">D</span>ángeles,</span> y <span class="g"><span class="chord">Bm7</span>redimidos</span>
Te adoran <span class="g"><span class="chord">Em</span>hoy,</span><span class="g"><span class="chord">D</span>...</span>
<span class="g"><span class="chord">C</span>Santo, Santo</span> <span class="g"><span class="chord">D</span>Santo,</span> eres <span class="g"><span class="chord">G</span>Tú.</span>`
    },

    {
        title: "Ven",
        artist: "Marco Barrientos",
        key: "D",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">D</span>Ven,</span> es hora de ado<span class="g"><span class="chord">G</span>rar</span><span class="g"><span class="chord">D</span>le</span>
<span class="g"><span class="chord">A</span>Ven,</span> abre tu cora<span class="g"><span class="chord">Em7</span>zón</span> a <span class="g"><span class="chord">G</span>Él</span>
<span class="g"><span class="chord">D</span>Ven,</span> ante su trono es<span class="g"><span class="chord">G</span>ta</span><span class="g"><span class="chord">D</span>mos</span>
<span class="g"><span class="chord">A</span>Ven,</span> ante la majes<span class="g"><span class="chord">Em7</span>tad</span> de <span class="g"><span class="chord">G</span>Dios,</span> <span class="g"><span class="chord">D</span>ven</span>

[Coro]
<span class="g"><span class="chord">G</span>Toda</span> lengua confesará <span class="g"><span class="chord">D</span>que Él es Dios</span>
<span class="g"><span class="chord">G</span>Las</span> rodillas se dobla<span class="g"><span class="chord">D</span>rán</span>
<span class="g"><span class="chord">G</span>Y</span> un tesoro eterno <span class="g"><span class="chord">Bm</span>tendrás en Él</span>
<span class="g"><span class="chord">Em</span>Si</span> escoges su <span class="g"><span class="chord">A</span>amor.</span>

[Final]
El es <span class="g"><span class="chord">G</span>Rey,</span>
El es <span class="g"><span class="chord">D</span>Rey.</span>`
    },

    {
        title: "Algo Está Cayendo Aquí",
        artist: "José Luis Reyes",
        key: "G",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">G</span>Algo</span> está cayendo <span class="g"><span class="chord">Am</span>aquí</span>
<span class="g"><span class="chord">D</span>Es</span> tan fuerte sobre <span class="g"><span class="chord">G</span>mí</span>
<span class="g"><span class="chord">Em</span>Mis</span> manos levanta<span class="g"><span class="chord">Am</span>ré</span>
<span class="g"><span class="chord">D</span>Y</span> su gloria toca<span class="g"><span class="chord">G</span>ré</span> <span class="g"><span class="chord">C</span>...</span> <span class="g"><span class="chord">G</span>...</span>

[Coro]
<span class="g"><span class="chord">G</span>Está</span> cayendo <span class="g"><span class="chord">C</span>...</span> <span class="g"><span class="chord">G</span>...</span>
Su gloria sobre <span class="g"><span class="chord">D</span>mí</span>
Sanando <span class="g"><span class="chord">Am</span>heridas</span>
Levantando al <span class="g"><span class="chord">C</span>caído</span>
Su gloria está <span class="g"><span class="chord">D</span>aquí</span>
Su gloria está <span class="g"><span class="chord">G</span>aquí.</span>

[Adoración]
Su gloria está <span class="g"><span class="chord">Em</span>aquí.</span> <span class="g"><span class="chord">D</span>...</span>`
    },

    {
        title: "De los Montes",
        artist: "Marco Barrientos",
        key: "D",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">D</span>Llenas</span> nuestro hogar de danza
<span class="g"><span class="chord">Bm</span>De</span> tu <span class="g"><span class="chord">G</span>gozo</span> la <span class="g"><span class="chord">A</span>Ciudad</span>
<span class="g"><span class="chord">D</span>La</span> injusticia Tú quebrantas
<span class="g"><span class="chord">Bm</span>Si</span> se <span class="g"><span class="chord">G</span>humilla</span> Tu <span class="g"><span class="chord">A</span>Heredad.</span>

[Coro]
De los <span class="g"><span class="chord">D</span>montes</span> <span class="g"><span class="chord">A</span>,</span> A los <span class="g"><span class="chord">G</span>valles</span>
ya se <span class="g"><span class="chord">Bm</span>escucha</span> <span class="g"><span class="chord">F#m</span>...</span> el <span class="g"><span class="chord">G</span>clamor</span> <span class="g"><span class="chord">A</span>...</span>
<span class="g"><span class="chord">D</span>De</span> los Cielos <span class="g"><span class="chord">A</span>,</span> A los <span class="g"><span class="chord">G</span>Pueblos</span>
ya te <span class="g"><span class="chord">Bm</span>cantan</span> <span class="g"><span class="chord">F#m</span>...</span> con <span class="g"><span class="chord">G</span>amor</span> <span class="g"><span class="chord">A</span>...</span>

[Verso 2]
<span class="g"><span class="chord">D</span>Tu</span> Luz Vence las tinieblas
<span class="g"><span class="chord">Bm</span>Al</span> an<span class="g"><span class="chord">G</span>dar</span> ante la <span class="g"><span class="chord">A</span>Cruz</span>
<span class="g"><span class="chord">D</span>Llena</span> Tu Gloria la Tierra
<span class="g"><span class="chord">Bm</span>Como</span> el <span class="g"><span class="chord">G</span>mar</span> en pleni<span class="g"><span class="chord">A</span>tud.</span>

[Puente]
//Ale</span><span class="g"><span class="chord">G</span>luya</span> <span class="g"><span class="chord">Em</span>...</span> Ale<span class="g"><span class="chord">Bm</span>luya</span><span class="g"><span class="chord">F#m</span>...</span>
Ale</span><span class="g"><span class="chord">G</span>luya</span> <span class="g"><span class="chord">Em</span>...</span> Ale<span class="g"><span class="chord">A</span>luya.</span>`
    },

    {
        title: "Al que es Digno",
        artist: "Marcos Witt",
        key: "C",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">C</span>Al</span> que es digno de <span class="g"><span class="chord">F</span>recibir</span> la <span class="g"><span class="chord">G</span>gloria</span>
<span class="g"><span class="chord">C</span>Al</span> que es digno de <span class="g"><span class="chord">F</span>recibir</span> <span class="g"><span class="chord">G</span>honor</span>

[Coro]
<span class="g"><span class="chord">F</span>Levantemos nuestras </span><span class="g"><span class="chord">G</span>manos y ado</span><span class="g"><span class="chord">Em</span>re</span><span class="g"><span class="chord">Am</span>mos</span>
A <span class="g"><span class="chord">F</span>Jesús</span> cor<span class="g"><span class="chord">G</span>dero</span>de <span class="g"><span class="chord">Em</span>glo</span><span class="g"><span class="chord">Am</span>ria</span>
Y exal<span class="g"><span class="chord">F</span>temos su </span><span class="g"><span class="chord">G</span>incomparable </span><span class="g"><span class="chord">Em</span>majes</span><span class="g"><span class="chord">Am</span>tad</span>
Al que <span class="g"><span class="chord">F</span>vive</span> vive por <span class="g"><span class="chord">G</span>siempre</span>
<span class="g"><span class="chord">F</span>Al</span> gran yo <span class="g"><span class="chord">G</span>soy,</span> a <span class="g"><span class="chord">C</span>Jesús.</span>`
    },

    {
        title: "Atrae mi Corazón",
        artist: "Marcos Brunet",
        key: "C",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">C</span>Es</span> a Ti a quien a <span class="g"><span class="chord">F</span>anhelo</span>
Es por Ti que yo <span class="g"><span class="chord">Dm</span>suspiro</span>
Más allá del <span class="g"><span class="chord">F</span>velo</span> yo <span class="g"><span class="chord">G</span>voy</span>
A decirte que te <span class="g"><span class="chord">Am</span>quiero,</span> <span class="g"><span class="chord">G</span>Je</span><span class="g"><span class="chord">C</span>sús.</span>

[Coro]
Atrae mi <span class="g"><span class="chord">F</span>corazón</span>
Atrae mi <span class="g"><span class="chord">Dm</span>corazón</span>
Atrae mi <span class="g"><span class="chord">F</span>corazón,</span> Je<span class="g"><span class="chord">G</span>sús</span>
Me muero de amor por <span class="g"><span class="chord">Am</span>ti,</span>
<span class="g"><span class="chord">G</span>Me</span> muero de amor por <span class="g"><span class="chord">C</span>Ti.</span>

[Verso 2]
Quiero que el mundo <span class="g"><span class="chord">F</span>sepa</span>
Quiero que el mundo <span class="g"><span class="chord">Dm</span>vea</span>
Que Tú eres mi <span class="g"><span class="chord">F</span>amado</span> <span class="g"><span class="chord">G</span>...</span>
Y yo soy <span class="g"><span class="chord">Am</span>tuyo.</span> <span class="g"><span class="chord">G</span>...</span> <span class="g"><span class="chord">C</span>...</span>

[Puente]
<span class="g"><span class="chord">F</span>Yo</span> en ti y <span class="g"><span class="chord">Dm</span>Tu</span>en mí Je<span class="g"><span class="chord">Am</span>sús,</span>
este es el <span class="g"><span class="chord">G</span>pacto.</span>`
    },

    {
        title: "Anhelo conocerte Espíritu Santo",
        artist: "Rey de Reyes",
        key: "A",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">A</span>Anhelo</span> Conocerte Espíritu <span class="g"><span class="chord">D</span>Santo</span>
<span class="g"><span class="chord">E</span>Anhelo</span> siempre estar cerca de <span class="g"><span class="chord">A</span>Ti</span>
<span class="g"><span class="chord">F#m</span>Mas</span>yo sé que he fallado tu <span class="g"><span class="chord">Bm</span>presencia</span>
He descuidado ven y <span class="g"><span class="chord">D</span>limpia todo </span><span class="g"><span class="chord">Bm</span>lo que hay en</span> <span class="g"><span class="chord">E</span>mí.</span>

[Verso 2]
<span class="g"><span class="chord">A</span>Como</span> Paloma con tu gracia hoy des<span class="g"><span class="chord">D</span>ciende</span>
<span class="g"><span class="chord">E</span>Como</span> aceite derramado ún<span class="g"><span class="chord">A</span>geme</span>
Como <span class="g"><span class="chord">F#m</span>fuente</span>de agua de viva
<span class="g"><span class="chord">Bm</span>Sacia</span> mi ser, llama de <span class="g"><span class="chord">D</span>fuego</span> ven y <span class="g"><span class="chord">E</span>purifíca</span><span class="g"><span class="chord">A</span>me.</span>`
    },

    {
        title: "Como Zaqueo",
        artist: "Alexis Peña",
        key: "G",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">G</span>Como</span> Zaque<span class="g"><span class="chord">D</span>o, yo quiero</span> su<span class="g"><span class="chord">Em7</span>bir</span>
A lo <span class="g"><span class="chord">C</span>más</span>alto, que yo <span class="g"><span class="chord">G</span>pueda</span>
Solo para <span class="g"><span class="chord">D</span>verte,</span> mirar hacia <span class="g"><span class="chord">Em7</span>mí,</span>
Y lla<span class="g"><span class="chord">C</span>mar</span> tu atención hacia <span class="g"><span class="chord">G</span>mí.</span>

[Pre-Coro]
Necesito de ti, <span class="g"><span class="chord">C</span>Señor,</span><span class="g"><span class="chord">G</span>necesito</span>de <span class="g"><span class="chord">C</span>ti,</span> oh Padre
<span class="g"><span class="chord">G</span>Soy</span> pequeño y nada <span class="g"><span class="chord">Am</span>más,</span> dame de tu <span class="g"><span class="chord">F</span>paz</span>
Lo dejo todo para se<span class="g"><span class="chord">D</span>guirte.</span>

[Coro]
<span class="g"><span class="chord">G</span>Entra</span> en mi <span class="g"><span class="chord">D</span>casa,</span>entra en mi <span class="g"><span class="chord">Em7</span>vida,</span>
Estremece mi estruc<span class="g"><span class="chord">C</span>tura,</span>
Sana todas las he<span class="g"><span class="chord">G</span>ridas.</span>
Dame de tu santi<span class="g"><span class="chord">D</span>dad,</span>
Yo quiero amarte solo a <span class="g"><span class="chord">Em</span>ti,</span>
Porque el Señor es mi gran a<span class="g"><span class="chord">C</span>mor,</span>
<span class="g"><span class="chord">D</span>Haz</span> un milagro en <span class="g"><span class="chord">G</span>mí.</span>

[Instrumental]
<span class="chord">G</span>   <span class="chord">D</span>   <span class="chord">Em</span>   <span class="chord">C</span>`
    },

    {
        title: "10000 Razones",
        artist: "Su Presencia",
        key: "C",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">F</span>Que</span> todo lo que <span class="g"><span class="chord">C</span>soy,</span> ben<span class="g"><span class="chord">G</span>diga</span> al Se<span class="g"><span class="chord">Am</span>ñor.</span>
<span class="g"><span class="chord">F</span>Su</span> nombre <span class="g"><span class="chord">C</span>Santo</span> <span class="g"><span class="chord">G</span>es,</span>
Con <span class="g"><span class="chord">F</span>todo</span> mi <span class="g"><span class="chord">C</span>ser,</span> <span class="g"><span class="chord">F</span>can</span><span class="g"><span class="chord">G</span>ta</span><span class="g"><span class="chord">Am</span>ré,</span>
<span class="g"><span class="chord">F</span>Su</span> nombre <span class="g"><span class="chord">G</span>alaba</span><span class="g"><span class="chord">C</span>ré.</span>

[Verso 1]
<span class="g"><span class="chord">F</span>Sale</span> el <span class="g"><span class="chord">C</span>sol,</span> es un <span class="g"><span class="chord">G</span>nuevo</span>amane<span class="g"><span class="chord">Am</span>cer,</span>
<span class="g"><span class="chord">F</span>Es</span> tiempo <span class="g"><span class="chord">C</span>de</span> ado<span class="g"><span class="chord">G</span>rar</span> otra <span class="g"><span class="chord">Am</span>vez,</span>
No <span class="g"><span class="chord">F</span>importa</span>lo que <span class="g"><span class="chord">C</span>venga,</span> mi an<span class="g"><span class="chord">G</span>helo</span> es que me <span class="g"><span class="chord">Am</span>encuentres,</span>
<span class="g"><span class="chord">F</span>Cantando</span><span class="g"><span class="chord">C</span>hasta</span>que se <span class="g"><span class="chord">G</span>ponga</span> el <span class="g"><span class="chord">C</span>sol.</span>

[Verso 2]
<span class="g"><span class="chord">F</span>Tu</span> amor es <span class="g"><span class="chord">C</span>grande,</span><span class="g"><span class="chord">G</span>eres</span> pa<span class="g"><span class="chord">C</span>ciente,</span>
<span class="g"><span class="chord">F</span>y</span> bonda<span class="g"><span class="chord">C</span>doso</span> es tu <span class="g"><span class="chord">G</span>cora</span><span class="g"><span class="chord">Am</span>zón,</span>
por <span class="g"><span class="chord">F</span>todo</span> lo que has <span class="g"><span class="chord">C</span>hecho</span> yo <span class="g"><span class="chord">G</span>seguiré</span> can<span class="g"><span class="chord">Am</span>tando,</span>
<span class="g"><span class="chord">F</span>diez</span> mil razo<span class="g"><span class="chord">C</span>nes</span> para <span class="g"><span class="chord">G</span>ala</span><span class="g"><span class="chord">Am</span>bar.</span>

[Verso 3]
Y <span class="g"><span class="chord">F</span>en</span> ese <span class="g"><span class="chord">C</span>día,</span> cuando <span class="g"><span class="chord">G</span>ya</span>no tenga <span class="g"><span class="chord">Am</span>fuerzas</span>
<span class="g"><span class="chord">F</span>y</span>se acer<span class="g"><span class="chord">C</span>que</span> ya <span class="g"><span class="chord">G</span>el</span>fi<span class="g"><span class="chord">Am</span>nal,</span>
<span class="g"><span class="chord">F</span>Aun</span><span class="g"><span class="chord">C</span>así</span> te segui<span class="g"><span class="chord">G</span>ré</span> can<span class="g"><span class="chord">Am</span>tando,</span>
<span class="g"><span class="chord">F</span>Por</span> diez mil a<span class="g"><span class="chord">C</span>ños</span> y la <span class="g"><span class="chord">G</span>eter</span>ni<span class="g"><span class="chord">C</span>dad.</span>`
    },

    {
        title: "A Ti atribuimos la Gloria",
        artist: "Miel San Marcos",
        key: "G",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">G</span>A</span>Ti atribuimos la <span class="g"><span class="chord">C</span>gloria,</span>
A <span class="g"><span class="chord">Am</span>ti</span>atribuimos la <span class="g"><span class="chord">D</span>honra,</span>
A <span class="g"><span class="chord">G</span>ti</span>atribuimos <span class="g"><span class="chord">C</span>poder</span> y <span class="g"><span class="chord">Cm</span>majestad,</span>
<span class="g"><span class="chord">G</span>Santo</span> es <span class="g"><span class="chord">D</span>el</span> Se<span class="g"><span class="chord">G</span>ñor.</span>`
    },

    {
        title: "Abre mis Ojos",
        artist: "Danilo Montero",
        key: "D",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">D</span>Abre</span> mis ojos oh Cristo,
<span class="g"><span class="chord">Bm</span>Abre</span> mis ojos te pido,
Yo quiero <span class="g"><span class="chord">G</span>verte,</span>
Yo quiero <span class="g"><span class="chord">D</span>verte.</span>

[Coro]
Y contem<span class="g"><span class="chord">A</span>plar</span> tu Majes<span class="g"><span class="chord">Bm</span>tad,</span>
<span class="g"><span class="chord">G</span>Y</span>el resplandor de tu <span class="g"><span class="chord">A</span>Gloria,</span>
De<span class="g"><span class="chord">A</span>rrama</span> tu amor y po<span class="g"><span class="chord">Bm</span>der,</span>
Cuando can<span class="g"><span class="chord">G</span>tamos,</span>
Santo, <span class="g"><span class="chord">A</span>Santo.</span>

Y contem<span class="g"><span class="chord">A</span>plar</span> tu Majes<span class="g"><span class="chord">Bm</span>tad,</span>
<span class="g"><span class="chord">G</span>Y</span>el resplandor de tu <span class="g"><span class="chord">A</span>Gloria,</span>
De<span class="g"><span class="chord">A</span>rrama</span> tu amor y po<span class="g"><span class="chord">Bm</span>der,</span>
Cuando can<span class="g"><span class="chord">Em</span>tamos,</span>
Santo, <span class="g"><span class="chord">A</span>Santo.</span>
<span class="g"><span class="chord">G</span>Santo,</span>Santo, <span class="g"><span class="chord">A</span>Santo,</span>
Yo quiero <span class="g"><span class="chord">D</span>verte.</span>

[Puente]
<span class="g"><span class="chord">D</span>Santo,</span> Santo, Santo,
<span class="g"><span class="chord">A</span>Santo,</span> Santo, Santo,
<span class="g"><span class="chord">G</span>Santo,</span> Santo, <span class="g"><span class="chord">A</span>Santo,</span>
Yo quiero <span class="g"><span class="chord">D</span>verte.</span>`
    },

    {
        title: "A donde iré",
        artist: "Neway Music",
        key: "F",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">F</span>Siento</span> que sin ti,
Mi vida <span class="g"><span class="chord">Bb</span>es nada,</span>
<span class="g"><span class="chord">C</span>Y</span> que sin tu amor no vivi<span class="g"><span class="chord">Am</span>ré,</span>
<span class="g"><span class="chord">Dm</span>Estoy</span> confundida a tal ma<span class="g"><span class="chord">Gm</span>nera,</span>
Qui<span class="g"><span class="chord">Bb</span>siera</span> ahora <span class="g"><span class="chord">Gm</span>mismo te</span> pudiera <span class="g"><span class="chord">C</span>ver.</span>

[Verso 2]
<span class="g"><span class="chord">F</span>Pienso</span> que sin ti la vida <span class="g"><span class="chord">Bb</span>es vana,</span>
<span class="g"><span class="chord">C</span>Y</span> que sin tu amor no vivi<span class="g"><span class="chord">Am</span>ré,</span>
<span class="g"><span class="chord">Dm</span>Estoy</span> confundida a tal ma<span class="g"><span class="chord">Gm</span>nera,</span>
<span class="g"><span class="chord">Bb</span>Por</span> favor se<span class="g"><span class="chord">Gm</span>ñor</span> ayú<span class="g"><span class="chord">C</span>dame.</span>

[Coro]
<span class="g"><span class="chord">F</span>A</span>donde iré Jehová sin <span class="g"><span class="chord">C</span>ti,</span>
A donde iré Jehová sin <span class="g"><span class="chord">Dm</span>ti,</span>
A donde i<span class="g"><span class="chord">Bb</span>ré,</span>
A donde i<span class="g"><span class="chord">C</span>ré</span> Jehová sin <span class="g"><span class="chord">F</span>ti.</span>

[Coro 2]
<span class="g"><span class="chord">F</span>Si</span>tu eres el fuego que me <span class="g"><span class="chord">C</span>quema,</span>
Quiero sentirte de mil ma<span class="g"><span class="chord">Dm</span>neras,</span>
A donde i<span class="g"><span class="chord">Bb</span>ré,</span>
A donde i<span class="g"><span class="chord">C</span>ré</span> Jehová sin <span class="g"><span class="chord">F</span>ti.</span>`
    },

    {
        title: "Al estar ante Ti",
        artist: "Jesús Adrián Romero",
        key: "D",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">D</span>Al</span> estar ante <span class="g"><span class="chord">A</span>ti,</span>
Ado<span class="g"><span class="chord">Em</span>rando</span> frente al mar de cris<span class="g"><span class="chord">Bm</span>tal,</span>
Entre <span class="g"><span class="chord">D</span>la</span>multi<span class="g"><span class="chord">A</span>tud,</span>
En a<span class="g"><span class="chord">Em</span>sombro</span> allí me habré de pos<span class="g"><span class="chord">Bm</span>trar.</span>

[Verso 2]
Y mi <span class="g"><span class="chord">D</span>canto</span> uni<span class="g"><span class="chord">A</span>ré,</span>
A mi<span class="g"><span class="chord">Em</span>llones</span> proclamándote <span class="g"><span class="chord">Bm</span>Rey,</span>
Y mi <span class="g"><span class="chord">D</span>voz</span> oi<span class="g"><span class="chord">A</span>rás,</span>
Entre <span class="g"><span class="chord">Em</span>las multitudes</span> can<span class="g"><span class="chord">Bm</span>tar,</span>oooh <span class="g"><span class="chord">A</span>ohh.</span>

[Coro]
Digno es el cor<span class="g"><span class="chord">G</span>dero</span> de <span class="g"><span class="chord">D</span>Dios,</span>
El que fue inmo<span class="g"><span class="chord">G</span>lado</span> en <span class="g"><span class="chord">F#m</span>la</span><span class="g"><span class="chord">Bm</span>cruz,</span>
Digno <span class="g"><span class="chord">A</span>de</span>la <span class="g"><span class="chord">G</span>honra</span>y el po<span class="g"><span class="chord">D</span>der,</span>
La sabidu<span class="g"><span class="chord">Em</span>ría</span>suya <span class="g"><span class="chord">A</span>es.</span>

[Coro 2]
Y al que esta en el <span class="g"><span class="chord">G</span>trono</span> sea el ho<span class="g"><span class="chord">D</span>nor,</span>
Santo, Santo, <span class="g"><span class="chord">G</span>Santo</span> es <span class="g"><span class="chord">F#m</span>el</span>se<span class="g"><span class="chord">Bm</span>ñor,</span>
Reina <span class="g"><span class="chord">A</span>por</span> los <span class="g"><span class="chord">G</span>siglos</span> con po<span class="g"><span class="chord">D</span>der,</span>
Todo lo que e<span class="g"><span class="chord">Em</span>xiste</span> es por <span class="g"><span class="chord">A</span>él.</span>`
    },

    {
        title: "Agnus Dei",
        artist: "Marco Barrientos",
        key: "A",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">A</span>Aleluya,</span> Alelu<span class="g"><span class="chord">D</span>ya,</span>
Reinas tu poderoso <span class="g"><span class="chord">A</span>Dios.</span>
Aleluya, Alelu<span class="g"><span class="chord">D</span>ya,</span>
<span class="g"><span class="chord">E</span>San</span><span class="g"><span class="chord">A</span>to.</span>

[Coro]
<span class="g"><span class="chord">E</span>San</span><span class="g"><span class="chord">A</span>to,</span>
El Señor Dios po<span class="g"><span class="chord">D</span>dero</span><span class="g"><span class="chord">E</span>so,</span>
Digno eres <span class="g"><span class="chord">D</span>Tú,</span> Digno eres Tú...
Tú eres <span class="g"><span class="chord">E</span>San</span><span class="g"><span class="chord">A</span>to,</span> <span class="g"><span class="chord">E</span>San</span><span class="g"><span class="chord">A</span>to,</span>
El Señor Dios po<span class="g"><span class="chord">D</span>dero</span><span class="g"><span class="chord">E</span>so,</span>
Digno eres <span class="g"><span class="chord">D</span>Tú,</span> Digno eres Tú,
<span class="g"><span class="chord">E</span>A</span><span class="g"><span class="chord">A</span>mén.</span>`
    },

    {
        title: "Al que esta sentado en el Trono",
        artist: "Marcos Brunet",
        key: "G",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">G</span>Quiero</span> conocerte <span class="g"><span class="chord">Em7</span>cada día más a ti,</span>
en<span class="g"><span class="chord">C</span>trar</span> en tu pre<span class="g"><span class="chord">Am</span>sencia</span> y ado<span class="g"><span class="chord">D</span>rar.</span>

[Pre-Coro]
Re<span class="g"><span class="chord">Em7</span>vélanos</span>tu gloria, de<span class="g"><span class="chord">D</span>seamos</span> ir mucho más a ti,
que<span class="g"><span class="chord">C</span>remos</span> Tu pre<span class="g"><span class="chord">Am</span>sencia,</span> Je<span class="g"><span class="chord">D</span>sús.</span>

[Coro]
<span class="g"><span class="chord">G</span>Al</span> que esta sentado en el trono,
<span class="g"><span class="chord">Em7</span>al</span>que vive para siempre y siempre,
sea la <span class="g"><span class="chord">Am</span>gloria,</span> sea la <span class="g"><span class="chord">Bm</span>honra</span> y el poder
sea la <span class="g"><span class="chord">C</span>gloria,</span> sea la <span class="g"><span class="chord">D</span>honra</span> y el poder...`
    },

    {
        title: "Al que me ciñe de poder",
        artist: "Marcos Witt",
        key: "E",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">E</span>Al</span> que me ciñe de poder,
Aquél que mi victoria <span class="g"><span class="chord">C#m</span>es,</span>
sólo a él alaba<span class="g"><span class="chord">A</span>ré</span>solo a <span class="g"><span class="chord">B7</span>él,</span>exalta<span class="g"><span class="chord">E</span>ré.</span>

[Coro]
<span class="g"><span class="chord">A</span>De</span> ti se<span class="g"><span class="chord">B7</span>rá</span> mi ala<span class="g"><span class="chord">E</span>banza,</span>
en <span class="g"><span class="chord">A</span>la</span> con<span class="g"><span class="chord">B7</span>grega</span><span class="g"><span class="chord">E</span>ción.</span>
<span class="g"><span class="chord">A</span>Canta</span><span class="g"><span class="chord">B7</span>ré</span> y a<span class="g"><span class="chord">G#m</span>laba</span><span class="g"><span class="chord">C#m</span>ré,</span>
Tu <span class="g"><span class="chord">A</span>nom</span><span class="g"><span class="chord">B</span>bre</span> Se<span class="g"><span class="chord">E</span>ñor.</span>`
    },

    {
        title: "Bueno es alabar",
        artist: "Danilo Montero",
        key: "G",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">G</span>Bueno</span> es ala<span class="g"><span class="chord">C</span>bar,</span> oh Se<span class="g"><span class="chord">D</span>ñor,</span>tu <span class="g"><span class="chord">C</span>nom</span><span class="g"><span class="chord">D</span>bre,</span>
<span class="g"><span class="chord">G</span>Darte</span> gloria, <span class="g"><span class="chord">C</span>honra</span> y ho<span class="g"><span class="chord">D</span>nor,</span> por <span class="g"><span class="chord">C</span>siem</span><span class="g"><span class="chord">D</span>pre,</span>
<span class="g"><span class="chord">G</span>Bueno</span> es ala<span class="g"><span class="chord">C</span>barte</span> Je<span class="g"><span class="chord">D</span>sús,</span>
Y go<span class="g"><span class="chord">Em</span>zarme</span> en tu po<span class="g"><span class="chord">D</span>der.</span>

[Coro]
Porque <span class="g"><span class="chord">G</span>grande</span><span class="g"><span class="chord">C</span>eres</span><span class="g"><span class="chord">D</span>tú,</span>
<span class="g"><span class="chord">G</span>Grandes</span><span class="g"><span class="chord">C</span>son</span>tus <span class="g"><span class="chord">D</span>obras,</span>
Porque <span class="g"><span class="chord">G</span>grande</span><span class="g"><span class="chord">C</span>eres</span><span class="g"><span class="chord">D</span>tú,</span>
Grande es tu <span class="g"><span class="chord">Em7</span>amor,</span>
Grande es tu <span class="g"><span class="chord">D</span>gloria.</span>`
    },

    {
        title: "Cristo yo te Amo",
        artist: "Vino Nuevo",
        key: "E",
        type: "Adoración",
        content: `
Cristo yo te <span class="g"><span class="chord">E</span>amo,</span>
Cristo yo te <span class="g"><span class="chord">C#m</span>amo,</span>
No hay nadie como <span class="g"><span class="chord">A</span>tú,</span><span class="g"><span class="chord">B</span>..</span>
Je<span class="g"><span class="chord">E</span>sús.</span>

[Verso 2]
<span class="g"><span class="chord">E</span>Y</span>no<span class="g"><span class="chord">A</span>sé</span>dón<span class="g"><span class="chord">B</span>de</span> estu<span class="g"><span class="chord">E</span>viera,</span>
Si yo a ti no te <span class="g"><span class="chord">C#m</span>tuviera,</span>
Si no hubiera cono<span class="g"><span class="chord">A</span>cido,</span><span class="g"><span class="chord">B</span>..</span>
Al Dios que me <span class="g"><span class="chord">E</span>ama.</span>`
    },

    {
        title: "Cuando Cristo Vino",
        artist: "Himno",
        key: "D",
        type: "Alabanza",
        content: `
<span class="g"><span class="chord">D</span>Cuan</span>do Cristo <span class="g"><span class="chord">G</span>vino</span>a mi cora<span class="g"><span class="chord">D</span>zón,</span>
mi vida en<span class="g"><span class="chord">G</span>tera</span> cam<span class="g"><span class="chord">A</span>bió.</span>
Su <span class="g"><span class="chord">D</span>paz</span> y su a<span class="g"><span class="chord">G</span>mor</span> ale<span class="g"><span class="chord">F#m</span>jaron</span> de <span class="g"><span class="chord">Bm</span>mí,</span>
las <span class="g"><span class="chord">Em</span>dudas,</span> las <span class="g"><span class="chord">A</span>sombras</span> y el te<span class="g"><span class="chord">D</span>mor.</span><span class="g"><span class="chord">D7</span>..</span>

[Coro]
Mi <span class="g"><span class="chord">G</span>vida</span> comen<span class="g"><span class="chord">A</span>zó,</span>cuan<span class="g"><span class="chord">F#m</span>do</span>el Señor lle<span class="g"><span class="chord">Bm</span>gó,</span>
Y <span class="g"><span class="chord">Em</span>hoy</span>puedo can<span class="g"><span class="chord">G</span>tar</span> de su a<span class="g"><span class="chord">A</span>mor.</span>

[Verso 2]
<span class="g"><span class="chord">D</span>Hoy</span> quiero que <span class="g"><span class="chord">G</span>Cristo</span> te trans<span class="g"><span class="chord">D</span>forme</span> a ti,
que <span class="g"><span class="chord">D</span>cambie</span> tu <span class="g"><span class="chord">G</span>vida</span> tam<span class="g"><span class="chord">A</span>bién.</span>
<span class="g"><span class="chord">D</span>Piensa</span> en la <span class="g"><span class="chord">G</span>cruz</span> donde <span class="g"><span class="chord">F#m</span>murió</span> por <span class="g"><span class="chord">Bm</span>ti,</span>
y <span class="g"><span class="chord">Em</span>ábre</span><span class="g"><span class="chord">A</span>le</span>tu cora<span class="g"><span class="chord">D</span>zón.</span>`
    },

    {
        title: "Cuan Grande es Dios",
        artist: "En Espíritu y en Verdad",
        key: "A",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">A</span>El</span> esplendor de un Rey,
Ves<span class="g"><span class="chord">F#m</span>tido</span>en majestad,
La Tierra alegre <span class="g"><span class="chord">D</span>está,</span>
La Tierra alegre <span class="g"><span class="chord">E</span>está.</span>

[Verso 2]
Cubi<span class="g"><span class="chord">A</span>erto</span>está de luz,
Ven<span class="g"><span class="chord">F#m</span>ció</span>a la oscuridad,
Y tiembla a su <span class="g"><span class="chord">D</span>voz,</span>
Y tiembla a su <span class="g"><span class="chord">E</span>voz.</span>

[Coro]
Cuán <span class="g"><span class="chord">A</span>grande</span>es Dios,
Cántale, cuán <span class="g"><span class="chord">F#m</span>grande</span>es Dios,
Y todos lo ve<span class="g"><span class="chord">D</span>rán,</span>
Cuán <span class="g"><span class="chord">E</span>grande</span>es Di<span class="g"><span class="chord">A</span>os.</span>

[Verso 3]
<span class="g"><span class="chord">A</span>Día</span> a día Él está,
Y el <span class="g"><span class="chord">F#m</span>tiempo</span> está en Él,
Principio y el <span class="g"><span class="chord">D</span>fin,</span>
Principio y el <span class="g"><span class="chord">E</span>fin.</span>

[Verso 4]
La <span class="g"><span class="chord">A</span>tri</span>nidad en Dios,
El <span class="g"><span class="chord">F#m</span>Padre,</span> Hijo, Espíritu,
Cordero y el le<span class="g"><span class="chord">D</span>ón,</span>
Cordero y el le<span class="g"><span class="chord">E</span>ón,</span>

[Puente]
Tu nombre <span class="g"><span class="chord">A</span>sobre</span>todo es,
Eres <span class="g"><span class="chord">F#m</span>digno</span>de alabar,
Y mi <span class="g"><span class="chord">D</span>ser</span>dirá,
Cuán <span class="g"><span class="chord">E</span>grande</span>es <span class="g"><span class="chord">A</span>Dios.</span>

[Final]
<span class="g"><span class="chord">E</span>Mi</span> <span class="g"><span class="chord">D</span>co</span><span class="g"><span class="chord">E</span>ra</span><span class="g"><span class="chord">A</span>zón,</span> en<span class="g"><span class="chord">D</span>tona</span> la can<span class="g"><span class="chord">A</span>ción,</span> <span class="g"><span class="chord">F#m</span>..</span>
Cuán grande es <span class="g"><span class="chord">D</span>ÉL,</span><span class="g"><span class="chord">E</span>..</span>
Cuán grande es <span class="g"><span class="chord">A</span>ÉL.</span>`
    },

    {
        title: "Dame de Beber",
        artist: "Marco Barrientos",
        key: "D",
        type: "Adoración",
        content: `
<span class="g"><span class="chord">D</span>Quiero</span> estar en tu pre<span class="g"><span class="chord">Em</span>sencia,</span><span class="g"><span class="chord">A</span>..</span>
Y poderte contem<span class="g"><span class="chord">D</span>plar,</span><span class="g"><span class="chord">Bm</span>..</span>
Necesito estar con<span class="g"><span class="chord">Em</span>tigo,</span><span class="g"><span class="chord">A</span>..</span>
Necesito ado<span class="g"><span class="chord">D</span>rar.</span>

[Coro]
Dame <span class="g"><span class="chord">D7</span>de</span>be<span class="g"><span class="chord">G</span>ber</span><span class="g"><span class="chord">A</span>..</span>
de tu manan<span class="g"><span class="chord">F#m</span>tial,</span><span class="g"><span class="chord">Bm</span>..</span>
Dame de be<span class="g"><span class="chord">G</span>ber,</span><span class="g"><span class="chord">A</span>..</span>
necesito <span class="g"><span class="chord">D</span>más.</span><span class="g"><span class="chord">D7</span>..</span>

Dame de be<span class="g"><span class="chord">G</span>ber,</span><span class="g"><span class="chord">A</span>..</span>
de tu manan<span class="g"><span class="chord">F#m</span>tial,</span><span class="g"><span class="chord">Bm</span>..</span>
Dame de be<span class="g"><span class="chord">Em</span>ber,</span><span class="g"><span class="chord">A</span>..</span>
necesito <span class="g"><span class="chord">D</span>más.</span>

[Puente]
<span class="g"><span class="chord">G</span>Quie</span>_<span class="g"><span class="chord">A</span>ro</span><span class="g"><span class="chord">D</span>más, </span><span class="g"><span class="chord">Em</span>quie</span><span class="g"><span class="chord">F#m</span>ro</span><span class="g"><span class="chord">Bm</span>más,</span>
<span class="g"><span class="chord">G</span>Más</span> de tu es<span class="g"><span class="chord">D</span>píritu,</span>
<span class="g"><span class="chord">G</span>Más</span> de tu pre<span class="g"><span class="chord">D</span>sencia,</span>
<span class="g"><span class="chord">Em</span>Quie</span>_<span class="g"><span class="chord">F#m</span>ro</span> <span class="g"><span class="chord">Bm</span>más,</span><span class="g"><span class="chord">G</span>..</span>
<span class="g"><span class="chord">A</span>de</span> <span class="g"><span class="chord">D</span>ti.</span>

[Final]
Yo quiero <span class="g"><span class="chord">D</span>más,</span>
Yo quiero <span class="g"><span class="chord">G</span>más,</span>
Yo quiero <span class="g"><span class="chord">Bm</span>más,</span>y más y <span class="g"><span class="chord">A</span>más</span>de ti Se<span class="g"><span class="chord">G</span>ñor.</span>`
    },

    {
        title: "De Gloria en Gloria te veo",
        artist: "Marcos Witt",
        key: "D",
        type: "Adoración",
        content: `
De <span class="g"><span class="chord">D</span>gloria</span> en <span class="g"><span class="chord">A</span>gloria</span> te <span class="g"><span class="chord">Bm</span>veo,</span>
<span class="g"><span class="chord">G</span>Cuanto</span> más te co<span class="g"><span class="chord">D</span>nozco,</span>
<span class="g"><span class="chord">Em</span>Quiero</span> saber más de <span class="g"><span class="chord">A</span>ti.</span>

[Verso 2]
Mi <span class="g"><span class="chord">D</span>Dios</span> cuan <span class="g"><span class="chord">A</span>buen</span> alfa<span class="g"><span class="chord">Bm</span>rero,</span>
<span class="g"><span class="chord">G</span>Que</span>brántame, trans<span class="g"><span class="chord">D</span>fórmame,</span>
<span class="g"><span class="chord">Em7</span>Moldéame</span> a tu i<span class="g"><span class="chord">A</span>magen</span> Se<span class="g"><span class="chord">D</span>ñor.</span>

[Coro]
<span class="g"><span class="chord">G</span>Quiero</span><span class="g"><span class="chord">A</span>ser</span>más <span class="g"><span class="chord">F#m</span>como</span><span class="g"><span class="chord">Bm</span>tu,</span>
<span class="g"><span class="chord">G</span>Ver</span> la <span class="g"><span class="chord">A</span>vida</span><span class="g"><span class="chord">F#m</span>como</span><span class="g"><span class="chord">Bm</span>tu,</span>
<span class="g"><span class="chord">G</span>Satu</span><span class="g"><span class="chord">A</span>rarme</span>de tu es<span class="g"><span class="chord">F#m</span>píri</span><span class="g"><span class="chord">Bm</span>tu,</span>
Y <span class="g"><span class="chord">Em7</span>reflejar</span>al <span class="g"><span class="chord">G</span>mundo</span>tu a<span class="g"><span class="chord">A</span>mor.</span>

<span class="g"><span class="chord">G</span>Quiero</span><span class="g"><span class="chord">A</span>ser</span>más <span class="g"><span class="chord">F#m</span>como</span><span class="g"><span class="chord">Bm</span>tu,</span>
<span class="g"><span class="chord">G</span>Ver</span> la <span class="g"><span class="chord">A</span>vida</span><span class="g"><span class="chord">F#m</span>como</span><span class="g"><span class="chord">Bm</span>tu,</span>
<span class="g"><span class="chord">G</span>Satu</span><span class="g"><span class="chord">A</span>rarme</span>de tu es<span class="g"><span class="chord">F#m</span>píri</span><span class="g"><span class="chord">Bm</span>tu,</span>
Y <span class="g"><span class="chord">Em7</span>reflejar</span>al <span class="g"><span class="chord">A</span>mundo</span>tu a<span class="g"><span class="chord">D</span>mor.`
    },

    {
        title: "Digno eres de gloria",
        artist: "Rey de Reyes",
        key: "C",
        type: "Adoración",
        content: `
Digno eres de <span class="g"><span class="chord">C</span>gloria</span> y ala<span class="g"><span class="chord">Am</span>banza,</span>
<span class="g"><span class="chord">F</span>Le</span>vantamos nuestras <span class="g"><span class="chord">Dm</span>manos</span> ado<span class="g"><span class="chord">F</span>rándote</span> Se<span class="g"><span class="chord">G</span>ñor.</span>

[Coro]
Grande eres <span class="g"><span class="chord">C</span>tú,</span>
Grandes tus milagros <span class="g"><span class="chord">Am</span>son,</span>
No hay otro como <span class="g"><span class="chord">F</span>tú,</span>
No hay <span class="g"><span class="chord">F</span>otro</span>como <span class="g"><span class="chord">G</span>tú.`
    },

    {
        title: "Digno",
        artist: "Marcos Brunet",
        key: "G",
        type: "Adoración",
        content: `
No <span class="g"><span class="chord">G</span>tengo</span>nada para ofrecer,
<span class="g"><span class="chord">Em</span>Nada</span> que te pueda sorprender,
Solo el cora<span class="g"><span class="chord">C</span>zón</span> quebran<span class="g"><span class="chord">Em</span>tado,</span>
Una y otra <span class="g"><span class="chord">D</span>vez.</span>

[Verso 2]
No hay <span class="g"><span class="chord">G</span>Nada</span>que me enamore más
<span class="g"><span class="chord">Em</span>Nada</span> que me apasione más
Solo tu pre<span class="g"><span class="chord">C</span>sencia,</span> solo tu
Mi<span class="g"><span class="chord">Em</span>rada</span>me hacen suspi<span class="g"><span class="chord">D</span>rar.</span>

[Pre-Coro]
Me incl<span class="g"><span class="chord">C</span>ino</span>ante <span class="g"><span class="chord">Cm</span>tí</span>Rey que,
Per<span class="g"><span class="chord">G</span>dona</span>multitud de e<span class="g"><span class="chord">D</span>rrores,</span>
Me incl<span class="g"><span class="chord">C</span>ino</span>ante <span class="g"><span class="chord">Cm</span>ti.</span>

[Coro]
<span class="g"><span class="chord">G</span>Digno,</span> eternamente, <span class="g"><span class="chord">Em</span>digno,</span>
Impresionante y <span class="g"><span class="chord">D</span>digno,</span>
Solo ante ti yo me incl<span class="g"><span class="chord">C</span>ino.</span>`
    },

    {
        title: "Dios Incomparable",
        artist: "Generación 12",
        key: "B",
        type: "Adoración",
        content: `
[Intro] 
<span class="g"><span class="chord">B</span></span><span class="g"><span class="chord">F#</span></span><span class="g"><span class="chord">G#</span></span><span class="g"><span class="chord">E</span></span>

<span class="g"><span class="chord">B</span>Dios</span>de mi c<span class="g"><span class="chord">F#</span>orazón,</span> <span class="g"><span class="chord">G#m</span>..</span>
En ti encontré mi <span class="g"><span class="chord">E</span>salvación,</span>
<span class="g"><span class="chord">B</span>Tu</span>gloria y <span class="g"><span class="chord">F#</span>majestad</span> <span class="g"><span class="chord">G#m</span>..</span>
Quiero siempre <span class="g"><span class="chord">E</span>contemplar.</span>

<span class="g"><span class="chord">B</span>Tu</span>eres mi <span class="g"><span class="chord">F#</span>adoración</span> <span class="g"><span class="chord">G#m</span>..</span>
Y mi e<span class="g"><span class="chord">E</span>terna</span>canción,
<span class="g"><span class="chord">B</span>Todo</span>mi <span class="g"><span class="chord">F#</span>interior</span> <span class="g"><span class="chord">G#m</span>..</span>
es cautivado <span class="g"><span class="chord">E</span>por</span>tu amor.</span>

<span class="g"><span class="chord">B</span>Eres</span>Dios <span class="g"><span class="chord">F#</span>eterno,</span>solo tu eres <span class="g"><span class="chord">G#m</span>bueno,</span>
Dios incompa<span class="g"><span class="chord">E</span>rable</span>eres <span class="g"><span class="chord">B</span>tú.</span>
Nunca me sepa<span class="g"><span class="chord">F#</span>raré</span> de tu gran a<span class="g"><span class="chord">G#m</span>mor,</span>
Eres mi Se<span class="g"><span class="chord">E</span>ñor,</span>mi salva<span class="g"><span class="chord">B</span>dor.</span>

<span class="g"><span class="chord">B</span>Alelu</span><span class="g"><span class="chord">F#</span>ya,</span><span class="g"><span class="chord">G#m</span>..</span>
Alelu<span class="g"><span class="chord">E</span>ya.</span>
    `
    }
];