import { AuthLayout } from "@/components/layouts"
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material"
import { AuthContext } from "context";
import Link from "next/link"
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { tesloApi } from "services";
import { isEmail } from "utils";


type FormData = {
    name: string;
    email: string;
    password: string;

}

const RegisterPage = () => {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [isError, setIsError] = useState({
        isOpen: false,
        message: ''
    });
    const { registerUser } = useContext(AuthContext)

    const onRegisterForm = async ({ email, name, password }: FormData) => {
        const { hasError, message } = await registerUser(name, email, password)

        if (hasError) {
            setIsError({ isOpen: hasError, message: message || '' })
            return
        }
        const destination = router.query.p?.toString() || '/'

        setIsError({
            isOpen: false,
            message: ''
        })
        router.replace(destination)
        // try {
        //     const { data } = await tesloApi.post('/user/register', { name, email, password });
        //     const { token, user } = data;
        //     console.log(token, user);
        //     setIsError(false)
        // } catch (error) {
        //     setIsError(true)
        // }
    }
    return (
        <AuthLayout title={"Ingresar"} >
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1" component='h1'>Registrarse</Typography>
                        </Grid>
                        {isError.isOpen &&
                            <Chip
                                label={isError.message}
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                            />
                        }
                        <Grid item xs={12} mt={4} mb={3}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label='Name'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                placeholder="Name"
                                {...register('name', {
                                    required: 'This name is required',
                                    minLength: { value: 2, message: 'Min 2 characters' },
                                    maxLength: { value: 30, message: "Max 30  characters" }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} mb={3}>
                            <TextField
                                type="email"
                                fullWidth
                                variant="outlined"
                                label='Correo'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                placeholder="Correo"
                                {...register('email', {
                                    required: "The email is required",
                                    validate: isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid mb={4} item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='password'
                                label='Contrasena'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                placeholder="Contrasena"
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Min 6 characters' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid mb={4} item xs={12}>
                            <Button type='submit' color="secondary" className="circular-btn" fullWidth>
                                Registrarse
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                            <Link href={`/auth/login?p=${router.query.p?.toString() || '?p=/'}`} passHref>
                                Ya tienes Cuenta?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage