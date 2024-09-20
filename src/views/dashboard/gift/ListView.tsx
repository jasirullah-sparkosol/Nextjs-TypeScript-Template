'use client';
import { useMemo } from 'react';
import DataTable from 'components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import Stack from '@mui/material/Stack';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useDeleteGiftMutation, useGetGiftsQuery } from 'api/services/giftApi';
import { Gift } from 'types/api/gift';
import Avatar from 'components/@extended/Avatar';
import { getFullImagePath } from 'utils/imageUtils';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { SnackbarProps } from 'types/snackbar';
import Loader from '../../../components/Loader';

export default function ListView() {
    const router = useRouter();
    const { data, refetch, isLoading } = useGetGiftsQuery(null, {
        refetchOnMountOrArgChange: true
    });
    const [deleteGift] = useDeleteGiftMutation();

    const getAvatar = (item: Gift) => {
        if (item.image) return getFullImagePath(item.image);
        return '/assets/images/users/default.png';
    };

    const handleOnEdit = (item: Gift) => {
        router.push(`/gifts/${item._id}/edit`);
    };

    const handleOnDelete = async (item: Gift) => {
        if (confirm('Are you sure?')) {
            await deleteGift(item._id || '');

            refetch();

            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Item deleted successfully!',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    }
                } as SnackbarProps)
            );
        }
    };

    const columns = useMemo<ColumnDef<Gift>[]>(
        () => [
            {
                header: 'Image',
                accessorKey: 'image',
                cell: (props: any) => {
                    return <Avatar alt={props.row.original._id} src={getAvatar(props.row.original)} />;
                }
            },
            {
                header: 'Name',
                accessorKey: 'name'
            },
            {
                header: 'Points',
                accessorKey: 'points'
            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: (props: any) => {
                    return (
                        <Stack spacing={2} direction="row" justifyContent="center" alignContent="center">
                            <EditOutlined
                                size={20}
                                style={{ cursor: 'pointer', color: 'green' }}
                                onClick={() => handleOnEdit(props.row.original)}
                            />

                            <DeleteOutlined
                                color="red"
                                size={20}
                                style={{ cursor: 'pointer', color: 'red' }}
                                onClick={() => handleOnDelete(props.row.original)}
                            />
                        </Stack>
                    );
                }
            }
        ],
        []
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Stack direction="row" justifyContent="flex-end">
                    <AnimateButton>
                        <Button variant="contained" type="button" onClick={() => router.push('/gifts/create')}>
                            Add Gift
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>

            <DataTable columns={columns} data={data ?? []} />
        </>
    );
}
