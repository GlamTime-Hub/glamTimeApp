import {
  MessageCircleMore,
  MessageCircleHeart,
  Building2,
  Bell,
  TicketCheck,
  FileText,
  BadgeHelp,
  Mail,
  BookLock,
  Award,
  SquareScissors,
} from "@/lib/icons/Icons";

export const MENU_OPTIONS = [
  {
    section: "Mi Perfil",
    options: [
      {
        icon: <Building2 className="text-foreground" />,
        text: "Mis Negocios",
        href: "/glam/(tabs)/profile/my-business",
        roles: ["admin"],
      },
      {
        icon: <MessageCircleMore className="text-foreground" />,
        text: "Mis Reseñas",
        href: "/glam/(tabs)/profile/my-reviews",
        roles: ["professional", "user", "admin"],
      },
      {
        icon: <MessageCircleHeart className="text-foreground" />,
        text: "Reseñas Recibidas",
        href: "/glam/(tabs)/profile/reviews-received",
        roles: ["professional", "admin"],
      },
      {
        icon: <SquareScissors className="text-foreground" />,
        text: "Mis Servicios",
        href: "/glam/(tabs)/profile/my-services",
        roles: ["professional", "admin"],
      },
    ],
  },
  {
    section: "Configuraciones",
    options: [
      {
        icon: <Bell className="text-foreground" />,
        text: "Notificaciones",
        href: "/glam/(tabs)/profile/notifications",
        roles: ["professional", "user", "admin"],
      },
      {
        icon: <TicketCheck className="text-foreground" />,
        text: "Quiero ser premium",
        href: "/glam/(tabs)/profile/premium",
        roles: ["user"],
      },
      {
        icon: <Award className="text-foreground" />,
        text: "Mi Plan",
        href: "/glam/(tabs)/profile/my-plan",
        roles: ["admin"],
      },
    ],
  },
  {
    section: "Ayuda",
    options: [
      {
        icon: <BadgeHelp className="text-foreground" />,
        text: "Preguntas frecuentes",
        href: "/glam/(tabs)/profile/frequently-asked-questions",
        roles: ["professional", "admin", "user"],
      },
      {
        icon: <Mail className="text-foreground" />,
        text: "Contacto",
        href: "/glam/(tabs)/profile/contact",
        roles: ["professional", "admin", "user"],
      },
    ],
  },
  {
    section: "Legal",
    options: [
      {
        icon: <FileText className="text-foreground" />,
        text: "Terminos y condiciones",
        href: "/glam/(tabs)/profile/legal-privacity",
        roles: ["professional", "admin", "user"],
      },
      {
        icon: <BookLock className="text-foreground" />,
        text: "Politica de privacidad",
        href: "/glam/(tabs)/profile/legal-privacity",
        roles: ["professional", "admin", "user"],
      },
    ],
  },
];
