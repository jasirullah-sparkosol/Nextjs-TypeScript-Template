'use client';

import React, { FocusEvent, SyntheticEvent, useEffect, useState } from 'react';

// next
import { signIn } from 'next-auth/react';

// material-ui
import Button from '@mui/material/Button';
// @ts-ignore
import Checkbox from '@mui/material/Checkbox';
// @ts-ignore
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { APP_DEFAULT_PATH } from 'config';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useSearchParams } from 'next/navigation';
import { openSnackbar } from '../../../store/reducers/snackbar';
import { SnackbarProps } from '../../../types/snackbar';
import { useDispatch } from 'react-redux';

export default function AuthLogin({ providers, csrfToken }: any) {
    const params = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.get('error')) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: params.get('error'),
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    }
                } as SnackbarProps)
            );
        }
    }, [params]);

    // @ts-ignore
    const [checked, setChecked] = useState(false);
    const [capsWarning, setCapsWarning] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    const onKeyDown = (keyEvent: any) => {
        if (keyEvent.getModifierState('CapsLock')) {
            setCapsWarning(true);
        } else {
            setCapsWarning(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    phone: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    phone: Yup.string().min(8, 'Min 8 chars are required').max(255).required('Phone is required'),
                    password: Yup.string().min(8, 'Min 8 chars are required').max(255).required('Password is required')
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                    signIn('sign-in', {
                        redirect: true,
                        phone: values.phone,
                        password: values.password,
                        callbackUrl: APP_DEFAULT_PATH
                    }).then(
                        (res: any) => {
                            if (res?.error) {
                                setErrors({ submit: res.error });
                                setSubmitting(false);
                            } else {
                                setSubmitting(false);
                            }
                        },
                        (res) => {
                            setErrors({ submit: res.error });
                            setSubmitting(false);
                        }
                    );
                }}>
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-login">Phone #</InputLabel>
                                    <OutlinedInput
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={values.phone}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Phone"
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                    />
                                </Stack>
                                {touched.phone && errors.phone && (
                                    <FormHelperText error id="standard-weight-helper-text-phone-login">
                                        {errors.phone}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        color={capsWarning ? 'warning' : 'primary'}
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={(event: FocusEvent<any, Element>) => {
                                            setCapsWarning(false);
                                            handleBlur(event);
                                        }}
                                        onKeyDown={onKeyDown}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    color="secondary">
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {capsWarning && (
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'warning.main' }}
                                            id="warning-helper-text-password-login">
                                            Caps lock on!
                                        </Typography>
                                    )}
                                </Stack>
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Grid>

                            {/*<Grid item xs={12} sx={{ mt: -1 }}>*/}
                            {/*    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>*/}
                            {/*        <FormControlLabel*/}
                            {/*            control={*/}
                            {/*                <Checkbox*/}
                            {/*                    checked={checked}*/}
                            {/*                    onChange={(event) => setChecked(event.target.checked)}*/}
                            {/*                    name="checked"*/}
                            {/*                    color="primary"*/}
                            {/*                    size="small"*/}
                            {/*                />*/}
                            {/*            }*/}
                            {/*            label={<Typography variant="h6">Keep me sign in</Typography>}*/}
                            {/*        />*/}
                            {/*    </Stack>*/}
                            {/*</Grid>*/}
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary">
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
}
