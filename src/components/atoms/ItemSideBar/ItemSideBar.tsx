import { ExpandMoreOutlined, Settings } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemIcon, ListItemText, SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { styles } from "./stylesItemSideBar";
import { AccordionMenu } from "../accordionMenu/AccordionMenu";

interface Props {
    name: string;
    action: () => void;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    options?: { name: string, options: { name: string }[] }[]
}

export const ItemSideBar = ({
    Icon,
    name,
    options = [],
    action
}: Props) => {
    console.log(options);

    return (
        <>
            {options.length > 0 ?
                options.map(option => (
                    <>

                        <Accordion key={option.name}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreOutlined />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Settings sx={styles.iconHeader} />
                                <Typography>{name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {option.options?.length > 1 ?
                                    option.options.map(subOption => (
                                        <AccordionMenu
                                            key={subOption.name}
                                            name={subOption.name}
                                        />
                                    ))
                                    :
                                    <Typography>
                                        {option.name}
                                    </Typography>
                                }
                            </AccordionDetails>
                        </Accordion>
                    </>
                ))
                :
                <ListItem button onClick={action}>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItem>
            }
        </>
    )
}
