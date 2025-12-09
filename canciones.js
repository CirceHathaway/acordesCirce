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
<span class="g"><span class="chord">C</span>A</span> lo más alto, que yo <span class="g"><span class="chord">G</span>pueda</span>
Solo para <span class="g"><span class="chord">D</span>verte,</span> mirar hacia <span class="g"><span class="chord">Em7</span>mí,</span>
Y lla<span class="g"><span class="chord">C</span>mar</span> tu atención hacia <span class="g"><span class="chord">G</span>mí.</span>

[Pre-Coro]
<span class="g"><span class="chord">C</span>Necesito</span> de ti, <span class="g"><span class="chord">G</span>Señor,</span> Necesito de <span class="g"><span class="chord">C</span>ti,</span> oh Padre
<span class="g"><span class="chord">G</span>Soy</span> pequeño y nada <span class="g"><span class="chord">Am</span>más,</span> dame de tu <span class="g"><span class="chord">F</span>paz</span>
Lo dejo todo para se<span class="g"><span class="chord">D</span>guirte.</span>

[Coro]
<span class="g"><span class="chord">G</span>Entra</span> en mi casa, <span class="g"><span class="chord">D</span>entra</span> en mi <span class="g"><span class="chord">Em7</span>vida,</span>
Estremece mi estruc<span class="g"><span class="chord">C</span>tura,</span>
Sana todas las he<span class="g"><span class="chord">G</span>ridas.</span>
Dame de tu santi<span class="g"><span class="chord">D</span>dad,</span>
Yo quiero amarte solo a <span class="g"><span class="chord">Em</span>ti,</span>
Porque el Señor es mi gran a<span class="g"><span class="chord">C</span>mor,</span>
<span class="g"><span class="chord">D</span>Haz</span> un milagro en <span class="g"><span class="chord">G</span>mí.</span>

[Instrumental]
<span class="chord">G</span>   <span class="chord">D/F#</span>   <span class="chord">Em</span>   <span class="chord">C</span>`
    }
];