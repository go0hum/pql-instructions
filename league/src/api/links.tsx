import { AiTwotoneHome, AiOutlineTeam } from "react-icons/ai";
import { GiAmericanFootballPlayer } from "react-icons/gi";

export const Links = [
    {
        label: "Home",
        icon: <AiTwotoneHome />,
        to: "/"
    },
    {
        label: "Magical Team",
        icon: <AiOutlineTeam />,
        to: "/magical-team"
    },
    {
        label: "Player Management",
        icon: <GiAmericanFootballPlayer />,
        to: "/player-management"
    },
];