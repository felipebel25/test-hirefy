import { Home, Person, QuestionMarkOutlined, Settings, Store } from "@mui/icons-material";

export const dataSidebar = [
    {
        name: "Home",
        icon: Home,
        href: ""
    },
    {
        name: "How it works",
        icon: QuestionMarkOutlined,
        href: ""
    },
    {
        name: "Marketplace",
        icon: Store,
        href: ""
    },
    {
        name: "For Talents",
        icon: Person,
        href: ""
    },
    {
        name: "Categories",
        icon: Settings,
        options: [
            {
                name: 'Lorem ipsum',
                options: [
                    {
                        name: "Lorem ipsum",
                    },
                    {
                        name: "Lorem ipsum",
                    }
                ]
            },
      
        ]
    },
]