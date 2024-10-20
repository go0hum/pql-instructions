import logo from '../../assets/pql_logo.jpeg';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { SideBarProps } from '../../interfaces/SideBarProps';
import { Container, Divider } from './styles';
import { Links } from '../../api/links';

export const SideBar = ({ openMenu, setOpenMenu }: SideBarProps) => {
    const sidebarOpen = () => {
        setOpenMenu(!openMenu);
    };
    const location = useLocation();
    const isActive = location.pathname;

    return (
        <Container isOpen={openMenu}>
            <button className="close" onClick={sidebarOpen}>
                <AiOutlineMenuFold />
            </button>
            <div className="Logo">
                <div className="imgOut">
                    <img src={logo} />
                </div>
                <h2 className="roboto-black">Quidditch League</h2>
            </div>
            {Links.map(({ icon, label, to }) => (
                <div className="LinkContainer" key={label}>
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `roboto-regular Links${isActive ? ` active` : ``}`
                        }
                    >
                        <div className="linkicon">{icon}</div>
                        {openMenu && <span>{label}</span>}
                    </NavLink>
                </div>
            ))}
            <Divider />
        </Container>
    );
};
