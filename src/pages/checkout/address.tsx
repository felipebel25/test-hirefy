import { ShopLayout } from "@/components/layouts"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

const AddresPage = () => {
    return (
        <ShopLayout title={"Direccion"} pageDescription={"confirmar direccion del destino"}>
            <Typography variant="h1" component={'h1'}>Direccion</Typography>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Nombres' variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Apellidos' variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion' variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion 2 (opcional)' variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Codigo Postal' variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* <TextField label='Codigo Postal' variant="outlined" fullWidth /> */}
                    <FormControl fullWidth>
                        <InputLabel>Pais</InputLabel>
                        <Select
                            variant='outlined'
                            label='Pais'
                            value={1}
                        >
                            <MenuItem value={1}>Mexico</MenuItem>
                            <MenuItem value={2}>Afas</MenuItem>
                            <MenuItem value={3}>Colom</MenuItem>
                            <MenuItem value={4}>reasd</MenuItem>
                            <MenuItem value={5}>agggasdrw</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Telefono' variant="outlined" fullWidth />
                </Grid>
                <Box sx={{ mt: 5, width: "100%" }} display={'flex'} justifyContent={'center'}>
                    <Button size="large" color="secondary" className="circular-btn">Revisar Pedido</Button>

                </Box>
            </Grid>
        </ShopLayout>
    )
}

export default AddresPage