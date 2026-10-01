import { Component } from "@angular/core";
import { UserComponent } from "./user/user";

@Component({
  imports: [UserComponent],
  selector: "app-root",
  styleUrl: "./app.css",
  templateUrl: "./app.html",
})
export class App {}
