import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import person from "../../assets/person-logo.png"

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const SidebarContainer = styled.div`
    background: ${({ theme }) => theme.sidebar.background.default};
    color: ${({ theme }) => theme.sidebar.text.default};
    width: ${({ $isOpened }) => ($isOpened ? '200px' : '40px')};
    min-height: 600px;
    height: auto;
    border-radius: 20px;
    padding: 20px;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.sidebar.logo.default};

    img {
        transition: 0.3s;
        width: ${({ $isOpened }) => ($isOpened ? '50px' : '40px')};
    }
`;

const LogoText = styled.span`
    display: ${({ $isOpened }) => ($isOpened ? 'block' : 'none')};
    font-weight: bold;
    margin-left: 0.5rem;
`;
const ToggleButton = styled.button`
    position: relative;
    top: 0;
    right: -2rem;
    background: ${({theme}) => theme.sidebar.background.default};
    border-radius: 50%;
    height: 30px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 0;
    transition: 0.3s;

    &:hover {
        background: ${({theme}) => theme.sidebar.background.hover};
    }
    &:active {
        background: ${({theme}) => theme.sidebar.background.active};
    }
`;
const MenuSection = styled.div`
    margin-bottom: 1rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 0.5rem;


  visibility: ${({ $isOpened }) => ($isOpened ? 'visible' : 'hidden')};
  transform: translateY(${({ $isOpened }) => ($isOpened ? '0' : '-20px')});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    background 0.2s ease,
    color 0.2s ease;
  transition-delay: ${({ $isOpened, $index }) =>
    $isOpened ? `${0.1 * $index}s` : '0s'};

  & > svg {
    opacity: 1;
    position: relative;
    visibility: visible;
    z-index: 1;
    height: 20px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    transform: ${({ $isOpened }) => ($isOpened ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)')};
  }

  background: ${({ $isActive, theme }) =>
    $isActive ? theme.sidebar.background.active : 'transparent'};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.sidebar.text.active : theme.sidebar.text.default};

  &:hover {
    background: ${({ theme }) => theme.sidebar.background.hover};
  }

  span {
    display: ${({ $isOpened }) => ($isOpened ? 'block' : 'none')};
  }
`;

const BottomMenuItem = styled(MenuItem)`
  transform: translateY(${({ $isOpened }) => ($isOpened ? '0' : '20px')});
  transition-delay: ${({ $isOpened, $index }) =>
    $isOpened ? `${0.1 * (routes.length + $index)}s` : '0s'};
  transition-duration: 0.4s;
`;
const MenuSectionProfile = styled(MenuSection)`
    margin-bottom: 0;

    hr {
        opacity: 0.5;
    }
`
const MenuItemProfile = styled(MenuItem)`

    padding-left: ${($isOpened) => $isOpened ? '0' : 'inherit'};
    margin-bottom: ${({$isOpened}) => $isOpened ? '0' : '-30px'};
    margin-top: 20px;
    visibility: visible;

    img {
        width: ${({$isOpened}) => $isOpened ? '50px' : '40px'};
        border-radius: 10px;
    }
    .user {
        font-size: 0.5rem;
    }
    .person {
        font-weight: bold;
        color: ${({ theme }) => theme.sidebar.logo.default} !important;
    }
    div {

    }
`
const ProfilePopup = styled.div`
    position: absolute;
    left: 70px;
    height: 300px;
    bottom: -10px;
    width: 200px;
    background: ${({ theme }) => theme.sidebar.background.default};
    color: ${({ theme }) => theme.sidebar.text.default};
    border-radius: 10px;
    padding: 20px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
    z-index: 100;
    display: ${({ $visible }) => ($visible ? 'block' : 'none')};
    font-weight:bold;
    font-size: 18px;
    display:flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;

    img {
        display: block;
        width: 40px;
        height: 40px;
        aspect-ratio: 1/1;
    }
    .popap-person {
        display:flex;
        width: 100%;
        flex-direction:row;
        align-items: center;
        gap: 10px;
    }
    .popap-person__email {
        font-size: 0.5rem;
        font-weight: 400;
    }
    .popap-person__name {
        color: ${({ theme }) => theme.sidebar.logo.default};
    }
    .logout{
        font-size: 10px;
    }
    .terms {
        font-weight: 500;
        font-size: 8px;
    }
     hr {
        flex-shrink: 0;
        height: 1px;
        margin: 10px 0;
        border: none;
        background: ${({ theme }) => theme.sidebar.text.default};
        opacity: 0.3;
    }
`;
const Sidebar = (props) => {

    const { color } = props;
    const [isOpened, setIsOpened] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverTimer, setHoverTimer] = useState(null);

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
        setActiveItem(path);
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    useEffect(() => {
        return () => {
        if (hoverTimer) clearTimeout(hoverTimer);
        };
    }, [hoverTimer]);

    const formatName = (name) => {
        const [firstName, lastName] = name.split(' ');
        return lastName ? `${firstName} ${lastName[0]}.` : firstName;
    };

    return (
        <SidebarContainer $isOpened={isOpened}>
                <LogoContainer $isOpened={isOpened}>
                    <img src={ logo } alt="TensorFlow logo"/>
                    <LogoText $isOpened={isOpened}>TensorFlow</LogoText>
                    <ToggleButton $isOpened={isOpened} onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
                    </ToggleButton>
                </LogoContainer>
                <MenuSection>
                    {routes.map((route, index) => (
                        <MenuItem
                            key={route.title}
                            $index={index}
                            onClick={() => goToRoute(route.path)}
                            $isOpened={isOpened}
                            $isActive={activeItem === route.path}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </MenuItem>
                    ))}
                </MenuSection>
                <MenuSection>
                {bottomRoutes.map((route, index) => (
                    <BottomMenuItem
                        key={route.title}
                        $index={index}
                        onClick={() => goToRoute(route.path)}
                        $isOpened={isOpened}
                        $isActive={activeItem === route.path}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </BottomMenuItem>
                    ))}
                </MenuSection>
                 <MenuSectionProfile
                    $isOpened={isOpened}
                    onMouseEnter={() => {
                        if (!isOpened) {
                        clearTimeout(hoverTimer);
                        setIsHovered(true);
                        }
                    }}
                    onMouseLeave={() => {
                        const timer = setTimeout(() => setIsHovered(false), 1000);
                        setHoverTimer(timer);
                    }}
                >
                    <hr />
                    <MenuItemProfile
                        $isOpened={isOpened}
                    >
                        <img src={person} alt="person" />
                        <div>
                            <span className='user'>User Account</span>
                            <span className='person'> {formatName('Mark Talbierz')}</span>
                        </div>
                        {!isOpened && isHovered && (
                           <ProfilePopup
                                $visible={isHovered}
                                onMouseEnter={() => {
                                clearTimeout(hoverTimer);
                                setIsHovered(true);
                                }}
                                onMouseLeave={() => {
                                const timer = setTimeout(() => setIsHovered(false), 1000);
                                setHoverTimer(timer);
                                }}
                            >
                                <div className='popap-person'>
                                    <img src={person} alt="person" />
                                    <div>
                                        <div className='popap-person__name'> Mark Talbierz </div>
                                        <div className='popap-person__email'>hello@talbierz.com</div>
                                    </div>
                                </div>
                                <hr />
                                <div>View profile</div>
                                <div>Manage subscriptions</div>
                                <div>View history</div>
                                <hr />
                                <div className='logout'>Logout</div>
                                <div className='terms'>v 10.34 - Terms and Conditions</div>
                            </ProfilePopup>
                        )}
                    </MenuItemProfile>
                </MenuSectionProfile>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
