import { useContext } from "react"
import { Grid, Typography } from "@mui/material"
import { CartContext } from "context"
import { format } from "utils"

interface Props {
    orderValues?: { numberOfItems: number, tax: number, total: number, subtotal: number }
}

export const OrderSummary = ({ orderValues }: Props) => {
    const { numberOfItems, tax, total, subtotal } = useContext(CartContext)

    const taxCountry = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100
    const summaryValues = orderValues ? orderValues : { numberOfItems, tax, total, subtotal }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. products</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'} >
                <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? `productos` : 'prodict'} </Typography>
            </Grid>
            <Grid item xs={6}  >
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'} >
                <Typography>{format(summaryValues.subtotal)}</Typography>
            </Grid>
            <Grid item xs={6}  >
                <Typography>Impuestos ({taxCountry}%)</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'} >
                <Typography>{format(summaryValues.tax)}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }} >
                <Typography variant="subtitle1">Total :</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }} display={'flex'} justifyContent={'flex-end'} >
                <Typography variant="subtitle1">{format(summaryValues.total)}</Typography>
            </Grid>
        </Grid>
    )
}