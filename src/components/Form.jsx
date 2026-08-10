import { useState } from "react";
import { useTranslation } from "react-i18next";
import SiteConfigs from "../configs/AppConfigs";

 
export function PasswordFieldLogin({ register, errors }) {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">{t("password")} :</label>
            <input type={showPassword ? "text" : "password"} id="password" placeholder={t("password")}
                className={`form-control border-${SiteConfigs.color} pe-5`} // padding-end to not overlap icon
                {...register("password", { required: `${t("password")} ${t("required")}` })}
            />
            <i className={`bi bi-eye${!showPassword ? "-slash" : ""} position-absolute`}
                style={{ top: "38px", right: "15px", cursor: "pointer", color: "#888" }}
                onClick={() => setShowPassword(!showPassword)} >
            </i>
            {errors.password && ( <p className="text-danger">{errors.password.message}</p> )}
        </div>
    );
}

export function PasswordField({ register, errors }) {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">{t("password")} :</label>
            <input type={showPassword ? "text" : "password"} id="password" placeholder={t("password")}
                className={`form-control border-${SiteConfigs.color} pe-5`} 
                {...register("password", {
                    required: `${t("password")} ${t("required")}`,
                    minLength: { value: 6, message: `Minimum 6 ${t("characters")}`},
                })}
            />
            <i className={`bi bi-eye${!showPassword ? "-slash" : ""} position-absolute`}
                style={{ top: "38px", right: "15px", cursor: "pointer", color: "#888" }}
                onClick={() => setShowPassword(!showPassword)} >
            </i>
            {errors.password && ( <p className="text-danger">{errors.password.message}</p> )}
        </div>
    );
}

export function ConfirmPasswordField({ register, errors, watch }) {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3 position-relative">
            <label htmlFor="confirmPassword" className="form-label ">{t("confirm_password")} :</label>
            <input type={showPassword ? "text" : "password"} id="confirmPassword" placeholder={t("confirm_password")}
                className={`form-control border-${SiteConfigs.color} pe-5`}
                {...register("confirmPassword", {
                required: `${t("confirm_password")} ${t("required")}`,
                validate: (value) => value === watch("password") || `${t("passwords_do_not_match")}`,
              })}
            />
            <i className={`bi bi-eye${!showPassword ? "-slash" : ""} position-absolute`}
                style={{ top: "38px", right: "15px", cursor: "pointer", color: "#888" }}
                onClick={() => setShowPassword(!showPassword)} >
            </i>
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
        </div>
    );
}

export function OldPasswordField({ register, errors }) {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3 position-relative">
            <label htmlFor="oldPassword" className="form-label">{t("Old Password")} :</label>
            <input type={showPassword ? "text" : "password"} id="code" placeholder={t("Old Password")}
                className={`form-control border-${SiteConfigs.color} pe-5`} // padding-end to not overlap icon
                {...register("oldPassword", { required: `${t("Old Password")} ${t("required")}` })}
            />
            <i className={`bi bi-eye${!showPassword ? "-slash" : ""} position-absolute`}
                style={{ top: "38px", right: "15px", cursor: "pointer", color: "#888" }}
                onClick={() => setShowPassword(!showPassword)} >
            </i>
            {errors.code && ( <p className="text-danger">{errors.code.message}</p> )}
        </div>
    );
}

export function EmailField({ register, errors }) {
    const { t } = useTranslation();

    return (
        <div className="mb-3">
            <label htmlFor="email" className="form-label">{t("email")} :</label>
            <input type="email" id="email" placeholder={t("email")} className={`form-control border-${SiteConfigs.color}`}
                {...register("email", { required: `${t("email")} ${t("required")}`, })}
            />
            {errors.email && ( <p className="text-danger">{errors.email.message}</p> )}
        </div>
    );
}

export function CheckboxFieldLogin({ register }) {
    const { t } = useTranslation();

    return (
        <div className="mb-3 form-check">
            <input type="checkbox" className={`form-check-input border-${SiteConfigs.color}`} id="check" 
                {...register("rememberMe")}
            />
            <label htmlFor="check" className="form-check-label">{t("Check_me_out")}</label>
        </div>
    );
}

export function TextField({ label, name, register, errors, required = true }) {
    const { t } = useTranslation();

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{t(label)} :</label>
            <input type="text" id={name} placeholder={t(label)} className={`form-control border-${SiteConfigs.color}`}
                {...register(name, { required: required ? `${t(label)} ${t("required")}` : false, })}
            />
            {errors?.[name] && ( <p className="text-danger">{errors[name].message}</p> )}
        </div>
    );
}

export function TextAreaField({ label, name, register, errors, rows = 4, required = true }) {
    const { t } = useTranslation();

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{t(label)} :</label>
            <textarea id={name} rows={rows} placeholder={t(label)} className={`form-control border-${SiteConfigs.color}`}
                {...register(name, { required: required ? `${t(label)} ${t("required")}` : false, })}
            />
            {errors?.[name] && ( <p className="text-danger">{errors[name].message}</p> )}
        </div>
    );
}

export function ButtonSubmit({ name, icon }) {
    const { t } = useTranslation();

    return (
        <div className="">
            <button type="submit" className={`btn btn-${SiteConfigs.color} w-100 `}>
                <i className={icon}> </i>{t(name)}
            </button>
        </div>  
    );
}
  
export function SelectField({ label, name, options = [], register, errors, required = true, key = false }) {
  const { t } = useTranslation();
  
  // 🔧 Normalisation des options : accepte string[] ou { value, label }[]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    } else if (typeof opt === "object" && opt !== null) {
      return {
        value: key ? opt.id : opt.name ?? opt.value ?? "",
        label: opt.label ?? opt.name ?? opt.value ?? "",
      };
    } else {
      return { value: "", label: "" };
    }
  });

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{t(label)} :</label>

      <select id={name} className={`form-select border-${SiteConfigs.color}`}
        {...register(name, { required: required ? `${t(label)} ${t("required")}` : false, })} >

        <option value="">{t("Select an option")}</option>
        {normalizedOptions.map((opt, i) => (
          <option key={i} value={opt.value}>  {t(opt.label)} </option>
        ))}

      </select>

      {errors?.[name] && <p className="text-danger">{errors[name].message}</p>}
    </div>
  );
}

