import { FormPlayer } from "../components/FormPlayer/FormPlayer";

export const PlayerAdd: React.FC = () => {      
    return (
        <section className="container">
            <h1 className="roboto-bold">Agregar Player</h1>
            <FormPlayer />
        </section>
    );
}