import { AuthLayout } from "@/components/layouts"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import Link from "next/link"

const RegisterPage = () => {
    return (
        <AuthLayout title={"Ingresar"} >
            <Box sx={{ width: 350, padding: "10px 20px" }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Registrarse</Typography>
                    </Grid>
                    <Grid item xs={12} mt={4} mb={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label='Name'
                            InputLabelProps={{
                                shrink: true
                            }}
                            placeholder="Name"
                        />
                    </Grid>
                    <Grid item xs={12} mb={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label='Correo'
                            InputLabelProps={{
                                shrink: true
                            }}
                            placeholder="Correo"

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
                            InputLabelProps={{
                                shrink: true
                            }}
                            placeholder="Contrasena"
                        />
                    </Grid>
                    <Grid
                        mb={4}

                        item xs={12}>
                        <Button color="secondary" className="circular-btn" fullWidth>
                            Registrarse
                        </Button>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                        <Link href='/auth/login' passHref>
                            Ya tienes Cuenta?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage