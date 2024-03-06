import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList({ brand, id, price, product }) {
  const nameBrand = brand ? brand : "Неизвестный бренд";
  return (
    <List sx={{ width: "100%", maxWidth: 1, bgcolor: "background.paper" }}>
      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Pravis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={`${nameBrand}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>

              <Typography>{product}</Typography>

              <Typography>
                Price:{" "}
                {new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "USD",
                }).format(price)}
              </Typography>

              <Typography>ID: {id}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
    </List>
  );
}
