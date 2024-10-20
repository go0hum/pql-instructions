import styled from 'styled-components';

export const Home: React.FC = () => {
    return (
        <Container className="container">
            <h1 className="roboto-bold">Quidditch League</h1>
            <p className="roboto-regular">
                El Quidditch es el deporte más popular en la comunidad mágica.
                Es una especie de fútbol-baloncesto aéreo que se juega volando
                sobre escobas. Entre las escobas hay de muy diversa calidad,
                desde la Barredora 5, pasando por la Nimbus 2000 y Nimbus 2001,
                hasta llegar a la Saeta de Fuego, escoba prácticamente exclusiva
                para profesionales y de la que Harry Potter tiene un modelo que
                le regaló su padrino Sirius Black.
            </p>
            <h2 className="roboto-bold">Las Reglas</h2>
            <p className="roboto-regular">
                Las reglas oficiales del Quidditch fueron establecidas en 1750
                por el Departamento de Deportes y Juegos Mágicos. Las reglas más
                generales incluyen:
                <ul>
                    <li>
                        Los jugadores no pueden salirse de las líneas que
                        limitan el campo de juego, aunque pueden volar tan alto
                        como deseen. La Quaffle se entrega al equipo contrario
                        si algún jugador se sale de los límites.
                    </li>
                    <li>
                        Los Capitanes pueden pedir tiempo fuera en el momento
                        que lo necesiten. Se puede extender hasta por dos horas
                        si el juego ha durado por más de 12 horas. De no
                        regresar al juego el equipo queda descalificado.
                    </li>
                    <li>
                        El árbitro puede otorgar penaltis si se comete una
                        falta. Un solo Cazador del equipo agredido vuela desde
                        el círculo central hacia el área de anotación e intenta
                        anotar. El Guardián del equipo contrario puede intentar
                        bloquear el disparo, pero ningún otro jugador debe
                        interferir.
                    </li>
                    <li>
                        Se permite el contacto, pero los jugadores no pueden
                        sujetar la escoba de otro ni tampoco ninguna parte de su
                        cuerpo. (Draco Malfoy rompe esta regla en El Prisionero
                        de Azkaban sujetando la cola de la escoba de Harry para
                        evitar que atrape la Snitch).
                    </li>
                    <li>
                        No se permiten sustituciones de jugadores, aún si alguno
                        está muy lastimado para continuar (se hacen excepciones
                        si el juego se prolonga por demasiado tiempo, y los
                        jugadores están demasiado fatigados para continuar).
                    </li>
                    <li>
                        Los jugadores pueden llevar sus varitas al campo de
                        juego, pero no se pueden usar para hechizar a otros
                        jugadores, al árbitro, las pelotas, o los espectadores.
                        (El derecho de cargar las varitas en el juego fue
                        otorgado durante la cúspide de las persecuciones de
                        magos por parte de los Muggles, de acuerdo con Quidditch
                        A Través de los Tiempos).
                    </li>
                </ul>
            </p>
            <h2 className="roboto-bold">El juego</h2>
            <p className="roboto-regular">
                Se juega en un estadio en forma ovalada(150 metros de semieje
                mayor y 55 de semieje menor), cada uno de los lados está dotado
                de tres aros ubicados a un distinto nivel de altura. Para el
                juego se utilizan tres tipos de bolas distintas: Quaffle,
                Bludger y la Snitch Dorada. La bola más importante durante el
                encuentro, es la Quaffle, que se utiliza para marcar tantos
                haciéndola pasar a través de los aros del equipo contrario, al
                pasarlos por los aros se ganan 10 puntos, con ella juegan los
                Cazadores. Las Bludgers son bolas que atacan a los equipos. Son
                pequeñas pero pesadas y vuelan con fuerza y son receptadas por
                los Bateadores, quienes utilizan bates pequeños para evitar que
                golpeen a algún jugado de su equipo. Y la Snitch Dorada es una
                pequeña bola dorada y alada muy rápida y difícil de atrapar, la
                cuál debe ser atrapada por los Buscadores, al atraparla se ganan
                150 puntos y el partido se termina. El juego enfrenta a dos
                equipos de siete jugadores cada uno. Existen distintos trabajos
                entre los jugadores: un Guardián, dos Golpeadores, tres
                Cazadores y un Buscador. El Guardián es una especie de portero
                que se encarga de evitar que el equipo contrario introduzca la
                Quaffle en los aros Bludger hierro Bludger de su respectivo
                equipo. Los Bateadores son los encargados de repeler las
                Bludgers, y en su caso dirigirlas hacia el equipo contrario. Los
                Cazadores son los encargados de procurar introducir la Quaffle a
                través de los aros contrarios. Por último, el Buscador es el
                encargado de estar atento durante todo el juego para poder
                atrapar la Snitch Dorada antes que el equipo contrario. Al
                atrapar la Snitch Dorada el juego finaliza, y el equipo que la
                atrapa gana 150 puntos.
            </p>
        </Container>
    );
};

const Container = styled.div`
    p {
        margin: 2rem 0;
        text-align: justify;
        ul {
            margin-top: 1rem;
            li {
                margin: 0.5rem 0;
            }
        }
    }
    h1,
    h2 {
        text-transform: uppercase;
    }
`;
