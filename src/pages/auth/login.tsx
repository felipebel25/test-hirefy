import { useContext, useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material"
import NextLink from "next/link"
import { useForm } from "react-hook-form";
import { tesloApi } from "services";
import { isEmail } from "utils";

import { AuthLayout } from "@/components/layouts"
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "context";
import { useRouter } from "next/router";
type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const router = useRouter()
    const { loginUser } = useContext(AuthContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [isError, setIsError] = useState(false);
    const destinationToGoRegister = `?p=${router.query.p?.toString()}` || '?p=/'

    const onLogin = async ({ email, password }: FormData) => {
        setIsError(false);
        
        const destination = router.query.p?.toString() || '/'

        const isValidLogin = await loginUser(email, password)
        if (!isValidLogin) {
            setIsError(true)
            return
        }
        router.replace(destination)
    }

    return (
        <AuthLayout title={"Ingresar"} >
            <form onSubmit={handleSubmit(onLogin)}>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1" component='h1'>Iniciar Sesion</Typography>
                            {isError &&
                                <Chip
                                    label='No reconocemos ese usuario / password'
                                    color="error"
                                    icon={<ErrorOutline />}
                                    className="fadeIn"
                                />
                            }
                        </Grid>
                        <Grid item xs={12} mt={4} mb={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="email"
                                label='Correo'
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                                //para volver booleano un objeto
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid
                            mb={4}
                            item
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='password'
                                label='Contrasena'
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid
                            mb={4}
                            item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                            <NextLink href={`/auth/register${destinationToGoRegister}`} >
                                No tienes Cuenta?
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage