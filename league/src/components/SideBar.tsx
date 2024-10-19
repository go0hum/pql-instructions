import styled from "styled-components";
import logo from "../assets/pql_logo.jpeg";
import { vars } from "../styles/Vars";
import { AiOutlineMenuFold, AiTwotoneHome, AiOutlineTeam } from "react-icons/ai";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import {NavLink, useLocation} from "react-router-dom";

export const SideBar = ({openMenu, setOpenMenu}) => {

    const sidebarOpen = () => {
        setOpenMenu(!openMenu);
    }
    const {pathName} = useLocation();
    const isActive = location.pathname;

    return (
        <Container isOpen={openMenu}>
            <button 
            className="close"
            onClick={sidebarOpen}
            >
                <AiOutlineMenuFold />
            </button>
            <div className="Logo">
                <div className="imgOut">
                    <img src={logo} />
                </div>
                <h2>Quidditch League</h2>
            </div>
            {
                Links.map(({icon, label, to}) => (
                    <div className="LinkContainer" key={label}>
                        <NavLink to={to} className={
                            ({isActive}) => `Links${isActive?` active`: ``}`
                        }>
                            <div className="linkicon">
                                {icon}
                            </div>
                            {
                                openMenu && 
                                (<span>{label}</span>)
                            }
                        </NavLink>
                    </div>
                ))
            }
        <Divider />
        </Container>
    );
}


const Links = [
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

const Container = styled.div`
  color: #202020;
  position:sticky;
  background: #EFEFF6;
  padding-top: 20px;
  .close {
    position: absolute;
    top: 100px;
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 4px #000, 0 0 7px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({isOpen}) => 
            (isOpen?`initial`: `rotate(180deg)`)
    };
  }
  .Logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: ${vars.lgSpacing};
    padding: 1rem;
    .imgOut {
        display: flex;
        img {
            border-radius: 50%; 
            max-width: 100%;
            height: auto;
        }
        cursor: pointer;
        transition: all 0.3s;
        transform: display: ${({isOpen}) => 
            (isOpen?`scale(0.7)`: `scale(1.5)`)
        };
    }
    h2 {
        display: ${({isOpen}) => 
            (isOpen?`block`: `none`)
        };
    }
  }
  .LinkContainer {
    margin: 8px 0;
    padding: 0 15%;
    :hover {
        background: #ccc;
    }
    .Links {
        text-decoration: none;
        align-items: center;
        display: flex;
        .linkicon {
            padding: .2rem 1rem;
            display: flex;
            svg {
                font-size: 22px;
            }
        }
        &.active {
            .linkicon {
                svg {
                    color: #202020;
                }
            }
            span {
                color: #202020;
            }
        }
    }
  }
`;

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: #5b5858;
    margin: 10px 0;
`;