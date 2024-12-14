import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../userContext';
import { TldrawUiButton, TldrawUiIcon } from 'tldraw';

export function UserToolbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleNavUserHome = () => {
        navigate('/?from=multiplayer');
    }

    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <TldrawUiButton type="icon" title="Logout" onClick={handleLogout}>
                <TldrawUiIcon icon="exit" />
            </TldrawUiButton>
            <TldrawUiButton type="icon" title="Home" onClick={handleNavUserHome}>
                <TldrawUiIcon icon="home" />
            </TldrawUiButton>
        </div>
    );
}
