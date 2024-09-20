'use client';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import CameraOutlined from '@ant-design/icons/CameraOutlined';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// types
import Image from 'next/image';
import { SnackbarProps } from 'types/snackbar';
import { Gift } from 'types/api/gift';
import { dispatch } from 'store';
import Typography from '@mui/material/Typography';
import { FormLabel } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { usePostSaveFileMutation } from 'api/services/fileApi';
import { useLazyGetGiftQuery, usePostGiftMutation, useUpdateGiftMutation } from 'api/services/giftApi';
import { getFullImagePath } from 'utils/imageUtils';
import { FormikHelpers } from 'formik/dist/types';
import Loader from 'components/Loader';

interface FormProps {
    id?: string;
}

const validationSchema = yup.object({
    name: yup.string().required('Name field is required.').min(3, 'Name should be of minimum 3 characters length'),
    image: yup.string().optional(),
    points: yup.number().required('Points is required.')
});

const initialValues = {
    name: '',
    image: '',
    points: 0
};

export default function Form({ id }: FormProps) {
    const router = useRouter();
    const [postSaveFile] = usePostSaveFileMutation();
    const [postGift] = usePostGiftMutation();
    const [updateGift] = useUpdateGiftMutation();
    const [refetch, { data: gift, isLoading }] = useLazyGetGiftQuery();

    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string>('/assets/images/users/default.png');

    const onSubmit = async (values: Gift, { setFieldValue }: FormikHelpers<Gift>) => {
        let image = values.image;
        if (selectedImage) {
            const response = await postSaveFile(selectedImage);
            if (response && response.data) {
                await setFieldValue('image', response.data.name ?? '');
                image = response.data.name ?? '';
            }
        }

        if (gift) {
            await updateGift({
                ...values,
                _id: id,
                points: Number(values.points),
                image
            });
        } else {
            await postGift({
                ...values,
                points: Number(values.points),
                image
            });
        }

        dispatch(
            openSnackbar({
                open: true,
                message: `Form ${gift ? 'submitted' : 'updated'} successfully!`,
                variant: 'alert',
                alert: {
                    color: 'success'
                }
            } as SnackbarProps)
        );

        router.push('/gifts');
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    // mount
    useEffect(() => {
        if (gift) {
            formik.setValues(gift);

            if (gift.image) {
                setImageUrl(getFullImagePath(gift.image));
            }
        }
    }, [gift]);

    useEffect(() => {
        if (id) {
            refetch(id);
        }
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                            <FormLabel
                                htmlFor="change-avtar"
                                sx={{
                                    position: 'relative', // borderRadius: '50%',
                                    overflow: 'hidden',
                                    '&:hover .MuiBox-root': { opacity: 1 },
                                    cursor: 'pointer'
                                }}>
                                <Image
                                    src={imageUrl}
                                    width={200}
                                    height={200}
                                    style={{ objectFit: 'contain', border: '1px solid #d4d4d8' }}
                                    priority
                                    alt="gift-image"
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        background: 'rgba(0,0,0,.65)',
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Stack spacing={0.5} alignItems="center">
                                        <CameraOutlined style={{ fontSize: '1.5rem' }} />
                                        <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                                            Upload
                                        </Typography>
                                    </Stack>
                                </Box>
                            </FormLabel>
                            <TextField
                                type="file"
                                id="change-avtar"
                                placeholder="Outlined"
                                variant="outlined"
                                sx={{ display: 'none' }}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="points">Points</InputLabel>
                            <TextField
                                fullWidth
                                id="points"
                                name="points"
                                type="number"
                                placeholder="Enter points"
                                value={formik.values.points}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.points && Boolean(formik.errors.points)}
                                helperText={formik.touched.points && formik.errors.points}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
}
