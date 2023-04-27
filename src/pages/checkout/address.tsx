import { ShopLayout } from "@/components/layouts"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, NoSsr, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { CartContext } from "context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ChangeEvent, EventHandler, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { countries } from "utils"
import { getAddressFromCookies } from "utils/cookies";

type FormData = {
    firstName: string;
    lastName: string;
    phone: string,
    country: string,
    city: string,
    address: string,
    address2?: string,
    zip: string,
}

const AddresPage = () => {
    const { push } = useRouter()
    const { updateAddress } = useContext(CartContext)
    const { register, handleSubmit, watch, formState: { errors } ,reset } = useForm<FormData>({
        defaultValues:{
            firstName:"",
            lastName:"",
            address:'',
            address2: '',
            zip: '',
            city: '',
            country: '',
            phone: '',
        }
    });
  const [defaultCountry, setDefaultCountry] = useState('');
    const onSubmitAddress = (data: FormData) => {
        updateAddress(data)
        push('/checkout/summary')
    }

    useEffect(() => {
        const addressFromCookies = getAddressFromCookies();
        reset(addressFromCookies);
        setDefaultCountry(addressFromCookies.country || countries[0].code)
      }, [reset, getAddressFromCookies])



    return (
        <ShopLayout title={"Direccion"} pageDescription={"confirmar direccion del destino"}>
            <Typography variant="h1" component={'h1'}>Direccion</Typography>
            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Grid container spacing={2} mt={2}>
                    {/* ---------Name--------- */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombres'
                            {...register('firstName', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 30, message: "Max 30  characters" }
                            })}
                            error={!!errors.firstName}
                            helperText={!!errors.firstName && 'Min 2 characters, maximum 2 characters'}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* -----------Apellidos---------- */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('lastName', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 30, message: "Max 30  characters" }

                            })}
                            error={!!errors.lastName}
                            helperText={!!errors.lastName && 'Min 2 characters, maximum 2 characters'}
                            label='Apellidos'
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* ----------------Direcciones---------------- */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('address', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 50, message: "Max 50  characters" }

                            })}
                            error={!!errors.address}
                            helperText={!!errors.address && 'Min 2 characters, maximum 2 characters'}
                            label='Direccion'
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* --------------Direccion 2--------------- */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('address2', {
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 50, message: "Max 50  characters" }
                            })}
                            error={!!errors.address2}
                            helperText={!!errors.address2 && 'Min 2 characters, maximum 2 characters'}
                            label='Direccion 2 (opcional)'
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* -------------------Codigo Postal----------------- */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('zip', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 20, message: "Max 50  characters" }
                            })}
                            error={!!errors.zip}
                            helperText={!!errors.zip && 'Min 2 characters, maximum 2 characters'}
                            label='Codigo Postal'
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* ------------------------Ciudad-------------------- */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('city', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 20, message: "Max 50  characters" }
                            })}
                            error={!!errors.city}
                            helperText={!!errors.city && 'Min 2 characters, maximum 2 characters'}
                            label='Ciudad'
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* -----------------------Country-------------------- */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <NoSsr>
                                <TextField
                                    key={defaultCountry}
                                    select
                                    label='Pais'
                                    variant='outlined'
                                    defaultValue={defaultCountry}
                                    {...register('country', {
                                        required: 'Este campo es requerido',

                                    })}
                                    error={!!errors.country}
                                // helperText={!!errors.country && 'Min 1 characters, maximum 2 characters'}
                                >
                                    {countries.map(country => (
                                        <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                    ))}
                                </TextField>
                            </NoSsr>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('phone', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Min 2 characters' },
                                maxLength: { value: 20, message: "Max 50  characters" }
                            })}
                            error={!!errors.phone}
                            helperText={!!errors.phone && 'Min 2 characters, maximum 2 characters'}
                            label='Telefono'
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Box sx={{ mt: 5, width: "100%" }} display={'flex'} justifyContent={'center'}>
                        <Button type="submit" size="large" color="secondary" className="circular-btn">Revisar Pedido</Button>
                    </Box>
                </Grid>
            </form>
        </ShopLayout>
    )
}

export default AddresPage