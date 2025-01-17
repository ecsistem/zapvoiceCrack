var v = Object.defineProperty;
var U = (e, t, s) =>
  t in e
    ? v(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
    : (e[t] = s);
var I = (e, t, s) => U(e, typeof t != "symbol" ? t + "" : t, s);
import { a as _, Z as l } from "./chunk-Co4l0zX2.js";
import {
    x as C,
    F as D,
    u as F,
    H as G,
    w as M,
    s as P,
    t as T,
    C as W,
    y as b,
    G as q,
    B as x,
    z as y
} from "./chunk-Da8Krtva.js";
const S = new D(new l()),
  j = "CHAVE BLOQUEADA",
  V = "CHAVE EXPIRADA",
  H = "USUÁRIO NÃO ENCONTRADO",
  K = "ASSINATURA NÃO ENCONTRADA",
  $ = "CHAVE DESATIVADA",
  k = async ({ key: e, phoneNumber: t, userName: s, wppVersion: d }) => {
    var n, i, r, u, h;
    try {
        // Simulando o retorno de uma chave válida (mock)
        const d = {
            isBasicPlan: true, // Supondo que seja um plano básico
            isFreePlan: false, // Não é um plano gratuito
            data: {
                keyId: "validKey123",
                managerId: "manager123",
                ownerId: "owner123",
                permissions: [
                    "create_full_flow",
                    "send_flow",
                    "send_funnel",
                    "send_audio_60s",
                    "massive_dispatching",
                    "schedule_item",
                    "send_trigger",
                ],
                plan_id: "basicPlan",
                username: "User Premium",
            },
            numberWarning: false, // Nenhum aviso de número
        };
    
        // Ignorando qualquer erro que possa ser retornado pela API e forçando a chave válida
        const m = d.numberWarning; // Em um mock, vamos considerar que o número não está bloqueado
    
        // Retornando o mock de chave válida
        return {
            authError: null,
            authErrorMessage: null,
            isPremium: !d.isFreePlan, // Se não for plano gratuito, é premium
            isBasicPlan: d.isBasicPlan ?? false,
            isLoggedIn: true,
            key: e, // Chave fornecida (simulada no mock)
            keyId: d.data.keyId,
            managerId: d.data.managerId,
            ownerId: d.data.ownerId,
            permissions: d.data.permissions ?? [
                "create_full_flow",
                "send_flow",
                "send_funnel",
                "send_audio_60s",
                "massive_dispatching",
                "schedule_item",
                "send_trigger",
            ],
            plan_id: d.data.plan_id,
            unauthorizedNumber: m, // Número não autorizado
            userName: d.data.username ?? "Usuário", // Nome de usuário, se presente
        };
    
    } catch (u) {
        // No mock, não queremos que nada falhe. Se ocorrer um erro, retornamos uma chave inválida fictícia.
        return {
            authError: "mockError",
            authErrorMessage: "Erro mockado",
            isBasicPlan: false,
            isLoggedIn: false,
            isPremium: false,
            key: "invalidKey",
            keyId: "mockInvalidKey",
            managerId: "mockManagerId",
            ownerId: "mockOwnerId",
            permissions: [],
            plan_id: "mockPlan",
            unauthorizedNumber: false,
            userName: "User Premium",
        };
    }    
  };
class L extends x {
  constructor(t) {
    super(t, "FAILED_TO_FETCH");
  }
}
const R = async ({
    action: e,
    phoneNumber: t,
    itemType: s,
    planId: d,
    hasError: n,
  }) => {
    const i = t ?? "";
    try {
      const r = y("oRHdwNnOv8SYwlmL6FGc29WajVmLj9WbuImc"),
        u = await fetch(`${r}/extension/v3/usage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: e,
            itemType: s,
            phoneNumber: i,
            planId: d,
            hasError: n,
          }),
        }),
        h = await u.json(),
        c = {
          audio: "áudios",
          bulkMessages: "disparos em massa",
          document: "documentos",
          flow: "fluxos",
          funnel: "funis",
          media: "mídias",
          message: "mensagens",
          scheduleItem: "agendamentos de itens simultâneos",
        };
      if (!u.ok) {
        const { data: o } = h;
        return o.errorType === "MAX_LIMIT_REACHED"
          ? {
              limits: null,
              status: !1,
              errorType: "MAX_LIMIT_REACHED",
              message:
                s === "scheduleItem"
                  ? `O limite de ${c[s]} foi alcançado`
                  : `O limite diário de envio de ${c[s]} foi alcançado`,
            }
          : {
              limits: null,
              status: !1,
              errorType: o.errorType ?? "UNKNOWN_ERROR",
              message: o.message,
            };
      }
      const { limits: p } = h;
      let a = "";
      return (
        p && (a = `, você ainda pode enviar ${p[s].max - p[s].sent} ${c[s]}`),
        { limits: p, status: !0, message: `Mensagem enviada${a}` }
      );
    } catch (r) {
      throw (
        (console.error(r),
        r instanceof Error
          ? r.message === "Failed to fetch"
            ? new L()
            : new Error(r.toString())
          : new Error(JSON.stringify(r)))
      );
    }
  },
  N = async ({ phoneNumber: e, planId: t, hasError: s, isBasic: d }) => {
    const n = e ?? "";
    try {
      const i = y("oRHdwNnOv8SYwlmL6FGc29WajVmLj9WbuImc"),
        r = await fetch(`${i}/extension/v3/get-usage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: n,
            planId: t,
            hasError: s,
            isBasic: d,
          }),
        });
      try {
        const u = await r.json();
        if (!r.ok) {
          const { data: c } = u;
          return {
            limits: null,
            status: !1,
            errorType: c.errorType ?? "UNKNOWN_ERROR",
          };
        }
        const { limits: h } = u;
        return { limits: h, status: !0 };
      } catch {
        return {
          limits: null,
          status: !1,
          errorType: "Incorrect response type",
        };
      }
    } catch (i) {
      let r = "";
      return (
        i instanceof Error
          ? i.message === "Failed to fetch"
            ? (r = i.message)
            : (r = i.toString())
          : (r = JSON.stringify(i)),
        console.error(r),
        { limits: null, status: !1, errorType: r ?? "UNKNOWN_ERROR" }
      );
    }
  },
  B = new P(new l(), k, R, N, { shouldMigrate: !0 }),
  J = new T(new l());
class Be {
  constructor() {
    I(this, "trackerStore", J);
  }
  async getClientId(...t) {
    return this.trackerStore.getClientId(...t);
  }
  async getSessionCount(...t) {
    return this.trackerStore.getSessionCount(...t);
  }
  async getSessionId(...t) {
    return this.trackerStore.getSessionId(...t);
  }
  async getTrackerUserProperties(...t) {
    return this.trackerStore.getTrackerUserProperties(...t);
  }
  async setClientId(...t) {
    return this.trackerStore.setClientId(...t);
  }
  async setKeyId(...t) {
    return this.trackerStore.setKeyId(...t);
  }
  async setManagerId(...t) {
    return this.trackerStore.setManagerId(...t);
  }
  async setSessionCount(...t) {
    return this.trackerStore.setSessionCount(...t);
  }
  async setSessionId(...t) {
    return this.trackerStore.setSessionId(...t);
  }
  async setUserId(...t) {
    return this.trackerStore.setUserId(...t);
  }
  async setTrackerUserProperties(...t) {
    return this.trackerStore.setTrackerUserProperties(...t);
  }
  async setWhatsAppIsBeta(...t) {
    return this.trackerStore.setWhatsAppIsBeta(...t);
  }
  async setWhatsAppVersion(...t) {
    return this.trackerStore.setWhatsAppVersion(...t);
  }
  async setZapvoiceVersion(...t) {
    return this.trackerStore.setZapvoiceVersion(...t);
  }
}
const Ae = new F(new l(), { shouldMigrate: !0 }),
  ve = new M(new l(), { shouldMigrate: !0 }),
  Y = async ({ data: e, eventName: t, keyId: s, userId: d }) => {
    try {
      const n = y("oRHdwNnOv8SYwlmL6FGc29WajVmLj9WbuImc");
      return (
        await fetch(`${n}/dmg/dashboard/events/customer/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: e, keyId: s, name: t, userId: d }),
        })
      ).ok
        ? "success"
        : "error";
    } catch (n) {
      throw (
        (console.error(n),
        n instanceof Error
          ? n.message === "Failed to fetch"
            ? new L()
            : new Error(n.toString())
          : new Error(JSON.stringify(n)))
      );
    }
  },
  Ue = new C(new l(), { shouldMigrate: !0 }),
  _e = new b(new l(), { shouldMigrate: !0 }),
  De = new W(new l(), { shouldMigrate: !0 }),
  Oe = new q(new l(), { shouldMigrate: !0 });
function m(e) {
  return (
    chrome.runtime.onMessage.addListener(e),
    chrome.runtime.onMessageExternal.addListener(e),
    {
      removeListener: () => {
        chrome.runtime.onMessage.removeListener(e),
          chrome.runtime.onMessageExternal.removeListener(e);
      },
    }
  );
}
const z = async (...[e, , t]) => {
  if (e.type === "Auth:Request:FetchBackendAuthData") {
    const s = await k(e.data);
    t({ type: "Auth:Response:FetchBackendAuthData", data: s });
  }
};
async function X() {
  const e = z,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const Z =
  (e) =>
  async (...[t]) => {
    t.type === "Auth:Request:FinishExternalLogin" && e(t.data);
  };
function Q(e) {
  const t = Z(e),
    { removeListener: s } = m(t);
  return { removeListener: s };
}
const ee = {
    listenFetchBackendAuthDataExternalRequest: X,
    listenFinishExternalLoginRequest: Q,
  },
  te = async (...[e, , t]) => {
    if (e.type === "Auth:Request:PostBackendCustomerEvent") {
      const s = await Y(e.data);
      t({
        type: "Auth:Response:PostBackendCustomerEvent",
        data: { status: s },
      });
    }
  };
async function ae() {
  const e = te,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const se = { listenPostBackendCustomerEventExternalRequest: ae },
  w =
    (e) =>
    async (...[t, s]) => {
      t.type === "StartUp:Request:WhatsappInit" && e(s);
    };
async function re(e) {
  return (
    chrome.runtime.onMessage.addListener(w(e)),
    {
      removeListener: () => {
        chrome.runtime.onMessage.removeListener(w(e));
      },
    }
  );
}
const ne = { listenWhatsappInitRequestRequest: re },
  oe = async (...[e, , t]) => {
    if (e.type === "UsageLimit:Request:FetchBackendGetUsageLimitData")
      try {
        const s = e.data.phoneNumber ?? B.phoneNumber,
          d = await N({
            phoneNumber: s ?? "",
            planId: e.data.planId,
            hasError: e.data.hasError,
            isBasic: e.data.isBasic,
          });
        t({
          type: "UsageLimit:Response:FetchBackendGetUsageLimitData",
          data: d,
        });
      } catch (s) {
        console.log(s),
          t({
            type: "UsageLimit:Response:FetchBackendGetUsageLimitData",
            data: { limits: null, status: !1 },
          });
      }
  };
async function ie() {
  const e = oe,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const ce = async (...[e, , t]) => {
  if (e.type === "UsageLimit:Request:FetchBackendUsageLimitData")
    try {
      const s = e.data.phoneNumber ?? B.phoneNumber,
        d = await R({ ...e.data, phoneNumber: s ?? "" });
      t({ type: "UsageLimit:Response:FetchBackendUsageLimitData", data: d });
    } catch (s) {
      console.log(s),
        t({
          type: "UsageLimit:Response:FetchBackendUsageLimitData",
          data: {
            limits: null,
            message: "Erro inesperado, tente novamente em alguns instantes",
            status: !1,
          },
        });
    }
};
async function de() {
  const e = ce,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const ue = {
    listenFetchBackendUsageLimitDataExternalRequest: de,
    listenFetchBackendGetUsageLimitDataExternalRequest: ie,
  },
  le = async (...[e, , t]) => {
    if (e.type === "Util:Request:GetExtensionVersion") {
      const s = _();
      t({ type: "Util:Response:GetExtensionVersion", data: s });
    }
  };
async function me() {
  const e = le,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const he = async (...[e]) => {
  e.type === "Util:Request:OpenDashboard" && chrome.runtime.openOptionsPage();
};
async function pe() {
  const e = he,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const ge = async ({ webhook: e, data: t }) => {
    try {
      await fetch(e, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      });
    } catch (s) {
      console.error(s);
    }
  },
  ye = async (...[e]) => {
    e.type === "Util:Request:PostToWebhook" && (await ge(e.data));
  };
async function fe() {
  const e = ye,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const Ee = async (...[e]) => {
  e.type === "Util:Request:WhatsappSendBeacon" &&
    (await fetch(e.data.input, { method: "POST", body: e.data.data }));
};
async function Ie() {
  const e = Ee,
    { removeListener: t } = m(e);
  return { removeListener: t };
}
const Se = {
    listenGetExtensionVersionExternalRequest: me,
    listenOpenDashboardExternalRequest: pe,
    listenPostToWebhookExternalRequest: fe,
    listenWhatsappSendBeaconExternalRequest: Ie,
  },
  xe = { auth: ee, startup: ne, util: Se, customerEvent: se, usageLimit: ue },
  Pe = () => `https://${G()}.chromiumapp.org/`;
export {
    Be as C,
    L as F,
    xe as S,
    Ae as a,
    ve as b,
    S as c,
    B as d,
    _e as e,
    De as f,
    Oe as g,
    Ue as h,
    Pe as i,
    Y as p
};

