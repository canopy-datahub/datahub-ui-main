import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Toggle from '../../components/Toggle/Toggle';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { ADMIN_SYSTEM_SETTINGS, UPDATE_TOP_BANNER } from '../../constants/apiRoutes';
import { setTopBanner } from '../../store/systemSettings/systemSettingsSlice';
import { NotificationType, BaseNotification } from '../../store/notifications/notificationConstants';
import { addNotification } from '../../store/notifications/notificationsSlice';
import classes from './SystemSettings.module.scss';

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// Originals — mirror the seed values in 727_data_system_setting.sql. Used by the
// "Reset" links so an admin can revert to the day-one banner without retyping it.
const DEFAULT_BANNER_TEXT =
    '⚠ Demo Site: All studies, datasets, and files on this site are synthetic and intended for demonstration purposes only.';
const DEFAULT_BANNER_COLOR = '#ffc107';

const SystemSettings = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { restGet, restPut } = useRest();
    const { token } = useKeycloak();
    const { user } = useSelector((state) => state.userProfile);

    const [enabled, setEnabled] = useState(false);
    const [text, setText] = useState('');
    const [bgColor, setBgColor] = useState('#ffc107');
    const [colorError, setColorError] = useState('');
    const [textError, setTextError] = useState('');
    const [saving, setSaving] = useState(false);

    // Client-side capability guard. Backend still enforces auth on every call;
    // this is a UX guard so anyone who hits the URL directly without the right
    // capability gets bounced rather than seeing a broken page. system-settings.read
    // is the access gate; system-settings.update gates the save endpoint.
    useEffect(() => {
        if (user && Object.keys(user).length > 0 && !user?.capabilities?.includes('system-settings.read')) {
            router.push('/');
        }
    }, [user]);

    useEffect(() => {
        if (!token) {
            return;
        }
        restGet(ADMIN_SYSTEM_SETTINGS, { errorMessage: 'Failed to load system settings' }).then((response) => {
            if (response?.status === 200 && response?.data?.data?.topBanner) {
                const b = response.data.data.topBanner;
                setEnabled(Boolean(b.enabled));
                setText(b.text || '');
                setBgColor(b.bgColor || '#ffc107');
            }
        });
    }, [token]);

    const validate = () => {
        let ok = true;
        if (!HEX_PATTERN.test(bgColor)) {
            setColorError('Color must be a hex value like #RRGGBB or #RGB.');
            ok = false;
        } else {
            setColorError('');
        }
        if (enabled && !text.trim()) {
            setTextError('Text is required when the banner is enabled.');
            ok = false;
        } else {
            setTextError('');
        }
        return ok;
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }
        setSaving(true);
        const body = { enabled, text, bgColor };
        const response = await restPut(UPDATE_TOP_BANNER, body, {
            errorMessage: 'Failed to save banner settings',
        });
        setSaving(false);
        if (response?.status === 200) {
            dispatch(setTopBanner(body));
            const note = { ...BaseNotification };
            note.message = 'Banner settings saved.';
            note.type = NotificationType.SUCCESS;
            note.delay = 4000;
            dispatch(addNotification(note));
        }
    };

    const crumbs = [
        { page: 'Home', pageLink: '/', ariaLabel: 'home' },
        { page: 'System Settings', pageLink: '/systemSettings', ariaLabel: 'system settings' },
    ];

    return (
        <>
            <Banner title="System Settings" manualCrumbs={crumbs} variant="lab1" ariaLabel="System Settings Breadcrumb" />
            <div className={classes.container}>
                <h2 className={classes.sectionTitle}>Top Banner</h2>
                <p className={classes.sectionDescription}>
                    Site-wide announcement banner shown at the top of every page to all visitors, including users who are not signed in.
                </p>

                <div className={classes.card}>
                    <div className={classes.cardTitle}>Configuration</div>

                    <Toggle
                        controlId="topBannerEnabled"
                        label="Show banner"
                        type="switch"
                        selected={enabled}
                        handleChange={(e) => setEnabled(e.target.checked)}
                        name="topBannerEnabled"
                    />

                    <div className={classes.fieldHeader}>
                        <Form.Label htmlFor="topBannerText" className={classes.fieldLabel}>
                            Banner text
                        </Form.Label>
                        <button
                            type="button"
                            className={classes.resetLink}
                            onClick={() => setText(DEFAULT_BANNER_TEXT)}
                            disabled={text === DEFAULT_BANNER_TEXT}
                        >
                            Reset text
                        </button>
                    </div>
                    <Input
                        controlId="topBannerText"
                        name="topBannerText"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Text shown in the banner"
                        maxLength={500}
                    />
                    {textError ? <div className={classes.fieldError}>{textError}</div> : null}

                    <div className={classes.fieldHeader}>
                        <Form.Label htmlFor="topBannerColorPicker" className={classes.fieldLabel}>
                            Background color
                        </Form.Label>
                        <button
                            type="button"
                            className={classes.resetLink}
                            onClick={() => setBgColor(DEFAULT_BANNER_COLOR)}
                            disabled={bgColor.toLowerCase() === DEFAULT_BANNER_COLOR}
                        >
                            Reset color
                        </button>
                    </div>
                    <div className={classes.colorRow}>
                        <input
                            id="topBannerColorPicker"
                            type="color"
                            value={HEX_PATTERN.test(bgColor) ? expandHex(bgColor) : DEFAULT_BANNER_COLOR}
                            onChange={(e) => setBgColor(e.target.value)}
                            aria-label="Banner background color"
                        />
                        <div className={classes.hexInput}>
                            <Input
                                controlId="topBannerHex"
                                name="topBannerHex"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                placeholder={DEFAULT_BANNER_COLOR}
                                ariaLabel="Banner background color hex value"
                            />
                        </div>
                    </div>
                    {colorError ? <div className={classes.fieldError}>{colorError}</div> : null}

                    <div className={classes.previewLabel}>Preview</div>
                    <div
                        className={classes.previewBox}
                        style={{ backgroundColor: HEX_PATTERN.test(bgColor) ? bgColor : 'transparent' }}
                    >
                        {text || <em>(empty)</em>}
                    </div>

                    <div className={classes.actions}>
                        <Button
                            label={saving ? 'Saving…' : 'Save'}
                            variant="primary"
                            size="medium"
                            handleClick={handleSave}
                            disabled={saving}
                            ariaLabel="Save banner settings"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

// Browser <input type="color"> only accepts #rrggbb; expand short form for it.
const expandHex = (hex) => {
    if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
        return '#' + hex.slice(1).split('').map((c) => c + c).join('');
    }
    return hex;
};

export default SystemSettings;
