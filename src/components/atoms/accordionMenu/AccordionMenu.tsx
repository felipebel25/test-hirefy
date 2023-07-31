import { ExpandMoreOutlined, Settings } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

interface Props {
    name: string;
}
export const AccordionMenu = ({ name }: Props) => {
    return (
        <Accordion key={name}>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {name}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}
