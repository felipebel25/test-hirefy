import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next'
import NextLink from "next/link"
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Box, Button, Chip, Divider, Grid, TextField, Typography } from "@mui/material"
import { ErrorOutline, GitHub } from "@mui/icons-material";
import { isEmail } from "utils";

import { AuthLayout } from "@/components/layouts"

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [isError, setIsError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders()
            .then(providers => {
                setProviders(providers);
            })
    }, [])


    const destinationToGoRegister = `?p=${router.query.p?.toString()}` || '?p=/'
    const onLogin = async ({ email, password }: FormData) => {
        setIsError(false);

        // const destination = router.query.p?.toString() || '/'

        // const isValidLogin = await loginUser(email, password)
        // if (!isValidLogin) {
        //     setIsError(true)
        //     return
        // }
        // router.replace(destination)
        await signIn('credentials', { email: email, password: password })

    }

    return (
        <AuthLayout title={"Login | Teslita"} >
            <form onSubmit={handleSubmit(onLogin)}>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1" component='h1'>Iniciar Sesión | Teslita</Typography>
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
                                label='Contraseña'
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid
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
                        <Grid item xs={12} sx={{ mt: '1.5rem', mb: "1rem" }} display={'flex'} justifyContent={'flex-end'}>
                            <Button color="primary" href={`/auth/register${destinationToGoRegister}`}>
                                No tienes una Cuenta?
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'flex-end'}>
                            <Divider sx={{ width: "100%", mb: 2 }} />
                            {Object.values(providers).map((provider: any) => {
                                if (provider.id === 'credentials') return (<div key={provider.id} ></div>)
                                if (provider.id === 'github') return (
                                    <Button

                                        key={provider.id}
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        sx={{ mb: 1, cursor: "pointer" }}
                                        onClick={() => signIn(provider.id)}
                                        startIcon={<GitHub />}

                                    >
                                        Login with {provider.name}
                                    </Button>
                                )
                                return (
                                    <Button
                                        key={provider.id}
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        sx={{ mb: 1 }}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        {provider.name}
                                    </Button>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req })

    const { p = '/' } = query

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}


export default LoginPage

