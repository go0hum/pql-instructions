import React from "react";
import { FormTeam } from '../components/FormTeam/FormTeam';

export const TeamAdd: React.FC  = () => {
    return (
        <section className="container">
            <h1 className="roboto-bold">Agregar Team</h1>
            <FormTeam />
        </section>
    );
};
