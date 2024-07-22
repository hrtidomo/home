DROP TABLE IF EXISTS parametro CASCADE;
DROP TABLE IF EXISTS perfil CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS persona CASCADE;
DROP TABLE IF EXISTS franquicia CASCADE;
DROP TABLE IF EXISTS modulo CASCADE;
DROP TABLE IF EXISTS codigo CASCADE;
DROP TABLE IF EXISTS auditoria CASCADE;
DROP TABLE IF EXISTS abonado CASCADE;
DROP TABLE IF EXISTS servicio CASCADE;
DROP TABLE IF EXISTS serviciosabonado CASCADE;
DROP TABLE IF EXISTS envio CASCADE;
DROP TABLE IF EXISTS factura CASCADE;
DROP TABLE IF EXISTS enviosfactura CASCADE;
DROP TABLE IF EXISTS categoria CASCADE;
DROP TABLE IF EXISTS bulto CASCADE;
DROP TABLE IF EXISTS contacto CASCADE;
DROP TABLE IF EXISTS contactosabonado CASCADE;
DROP TABLE IF EXISTS lineafactura CASCADE;
DROP TABLE IF EXISTS soporte CASCADE;
DROP TABLE IF EXISTS seguimiento CASCADE;
DROP TABLE IF EXISTS festivo CASCADE;
DROP TABLE IF EXISTS abonadosfranquicia CASCADE;
DROP TABLE IF EXISTS cargo CASCADE;
DROP TABLE IF EXISTS grupo CASCADE;
DROP TABLE IF EXISTS agregado CASCADE;
DROP TABLE IF EXISTS direccion CASCADE;
DROP TABLE IF EXISTS origenenvio CASCADE;
DROP TABLE IF EXISTS personasabonado CASCADE;
DROP TABLE IF EXISTS tmpenvio CASCADE;
DROP TABLE IF EXISTS destinoenvio CASCADE;
DROP TABLE IF EXISTS adjuntosoporte CASCADE;
DROP TABLE IF EXISTS integracion CASCADE;
DROP TABLE IF EXISTS ceco CASCADE;
DROP TABLE IF EXISTS cecosintegracion CASCADE;
DROP TABLE IF EXISTS serviciosintegracion CASCADE;
DROP TABLE IF EXISTS interfaz CASCADE;
DROP TABLE IF EXISTS dispositivo CASCADE;
DROP TABLE IF EXISTS dispositivosfranquicia CASCADE;
DROP TABLE IF EXISTS repartidor CASCADE;
DROP TABLE IF EXISTS dispositivosrepartidor CASCADE;
DROP TABLE IF EXISTS repartidoresfranquicia CASCADE;
DROP TABLE IF EXISTS ordenador CASCADE;
DROP TABLE IF EXISTS ordenadoresfranquicia CASCADE;
DROP TABLE IF EXISTS telefono CASCADE;
DROP TABLE IF EXISTS telefonosfranquicia CASCADE;
DROP TABLE IF EXISTS headset CASCADE;
DROP TABLE IF EXISTS headsetsfranquicia CASCADE;
DROP TABLE IF EXISTS impresora CASCADE;
DROP TABLE IF EXISTS impresorasfranquicia CASCADE;
DROP TABLE IF EXISTS router CASCADE;
DROP TABLE IF EXISTS routersfranquicia CASCADE;
DROP TABLE IF EXISTS credenciales CASCADE;
DROP TABLE IF EXISTS zonareparto CASCADE;
DROP TABLE IF EXISTS vertice CASCADE;
DROP TABLE IF EXISTS prospecto CASCADE;
DROP TABLE IF EXISTS comercial CASCADE;
DROP TABLE IF EXISTS accion CASCADE;
DROP TABLE IF EXISTS tarea CASCADE;
DROP TABLE IF EXISTS objetivo CASCADE;
DROP TABLE IF EXISTS jornada CASCADE;
DROP TABLE IF EXISTS goal CASCADE;
DROP TABLE IF EXISTS abonadoscomercial CASCADE;
DROP TABLE IF EXISTS comercialesfranquicia CASCADE;
DROP TABLE IF EXISTS evento CASCADE;
DROP TABLE IF EXISTS clasificacion CASCADE;
DROP TABLE IF EXISTS servidor CASCADE;
DROP TABLE IF EXISTS estadoenvio CASCADE;
DROP TABLE IF EXISTS proceso CASCADE;
DROP TABLE IF EXISTS resultadoproceso CASCADE;
DROP TABLE IF EXISTS direccionunica CASCADE;
DROP TABLE IF EXISTS proveedor CASCADE;
DROP TABLE IF EXISTS tmpabonado CASCADE;
DROP TABLE IF EXISTS posicion CASCADE;
DROP TABLE IF EXISTS geografia CASCADE;
DROP TABLE IF EXISTS distribucion CASCADE;
DROP TABLE IF EXISTS gruposervicios CASCADE;
DROP TABLE IF EXISTS agrupacionesservicios CASCADE;

DROP SEQUENCE IF EXISTS sq_parametro_idparametro CASCADE;
DROP SEQUENCE IF EXISTS sq_perfil_idperfil CASCADE;
DROP SEQUENCE IF EXISTS sq_usuario_idusuario CASCADE;
DROP SEQUENCE IF EXISTS sq_persona_idpersona CASCADE;
DROP SEQUENCE IF EXISTS sq_franquicia_idfranquicia CASCADE;
DROP SEQUENCE IF EXISTS sq_modulo_idmodulo CASCADE;
DROP SEQUENCE IF EXISTS sq_codigo_idcodigo CASCADE;
DROP SEQUENCE IF EXISTS sq_abonado_idabonado CASCADE;
DROP SEQUENCE IF EXISTS sq_servicio_idservicio CASCADE;
DROP SEQUENCE IF EXISTS sq_envio_idenvio CASCADE;
DROP SEQUENCE IF EXISTS sq_factura_idfactura CASCADE;
DROP SEQUENCE IF EXISTS sq_categoria_idcategoria CASCADE;
DROP SEQUENCE IF EXISTS sq_bulto_idbulto CASCADE;
DROP SEQUENCE IF EXISTS sq_contacto_idcontacto CASCADE;
DROP SEQUENCE IF EXISTS sq_lineafactura_idlineafactura CASCADE;
DROP SEQUENCE IF EXISTS sq_soporte_idsoporte CASCADE;
DROP SEQUENCE IF EXISTS sq_seguimiento_idseguimiento CASCADE;
DROP SEQUENCE IF EXISTS sq_festivo_idfestivo CASCADE;
DROP SEQUENCE IF EXISTS sq_abonadosfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_cargo_idcargo CASCADE;
DROP SEQUENCE IF EXISTS sq_grupo_idgrupo CASCADE;
DROP SEQUENCE IF EXISTS sq_agregado_idagregado CASCADE;
DROP SEQUENCE IF EXISTS sq_direccion_iddireccion CASCADE;
DROP SEQUENCE IF EXISTS sq_personasabonado_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_adjuntosoporte_idadjuntosoporte CASCADE;
DROP SEQUENCE IF EXISTS sq_integracion_idintegracion CASCADE;
DROP SEQUENCE IF EXISTS sq_ceco_idceco CASCADE;
DROP SEQUENCE IF EXISTS sq_interfaz_idinterfaz CASCADE;
DROP SEQUENCE IF EXISTS sq_dispositivo_iddispositivo CASCADE;
DROP SEQUENCE IF EXISTS sq_dispositivosfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_repartidor_idrepartidor CASCADE;
DROP SEQUENCE IF EXISTS sq_dispositivosrepartidor_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_repartidoresfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_ordenador_idordenador CASCADE;
DROP SEQUENCE IF EXISTS sq_ordenadoresfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_telefono_idtelefono CASCADE;
DROP SEQUENCE IF EXISTS sq_telefonosfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_headset_idheadset CASCADE;
DROP SEQUENCE IF EXISTS sq_headsetsfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_impresora_idimpresora CASCADE;
DROP SEQUENCE IF EXISTS sq_impresorasfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_router_idrouter CASCADE;
DROP SEQUENCE IF EXISTS sq_routersfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_credenciales_idcredenciales CASCADE;
DROP SEQUENCE IF EXISTS sq_zonareparto_idzonareparto CASCADE;
DROP SEQUENCE IF EXISTS sq_vertice_idvertice CASCADE;
DROP SEQUENCE IF EXISTS sq_prospecto_idprospecto CASCADE;
DROP SEQUENCE IF EXISTS sq_comercial_idcomercial CASCADE;
DROP SEQUENCE IF EXISTS sq_accion_idaccion CASCADE;
DROP SEQUENCE IF EXISTS sq_tarea_idtarea CASCADE;
DROP SEQUENCE IF EXISTS sq_objetivo_idobjetivo CASCADE;
DROP SEQUENCE IF EXISTS sq_jornada_idjornada CASCADE;
DROP SEQUENCE IF EXISTS sq_goal_idgoal CASCADE;
DROP SEQUENCE IF EXISTS sq_abonadoscomercial_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_comercialesfranquicia_idrelacion CASCADE;
DROP SEQUENCE IF EXISTS sq_evento_idevento CASCADE;
DROP SEQUENCE IF EXISTS sq_clasificacion_idclasificacion CASCADE;
DROP SEQUENCE IF EXISTS sq_servidor_idservidor CASCADE;
DROP SEQUENCE IF EXISTS sq_estadoenvio_idestadoenvio CASCADE;
DROP SEQUENCE IF EXISTS sq_proceso_idproceso CASCADE;
DROP SEQUENCE IF EXISTS sq_resultadoproceso_idresultado CASCADE;
DROP SEQUENCE IF EXISTS sq_direccionunica_iddireccionunica CASCADE;
DROP SEQUENCE IF EXISTS sq_proveedor_idproveedor CASCADE;
DROP SEQUENCE IF EXISTS sq_tmpabonado_idtmpabonado CASCADE;
DROP SEQUENCE IF EXISTS sq_posicion_idposicion CASCADE;
DROP SEQUENCE IF EXISTS sq_geografia_idgeografia CASCADE;
DROP SEQUENCE IF EXISTS sq_distribucion_iddistribucion CASCADE;
DROP SEQUENCE IF EXISTS sq_gruposervicios_idgruposervicios CASCADE;
DROP SEQUENCE IF EXISTS sq_agrupacionesservicios_idrelacion CASCADE;

-- ---------------------------------------------------------------------------------
-- PARAMETRO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_parametro_idparametro;

CREATE TABLE parametro (
    idparametro INTEGER NOT NULL DEFAULT nextval('sq_parametro_idparametro'),
    idmodulo INTEGER NOT NULL,
    tipo VARCHAR(1) NOT NULL,
    nombre VARCHAR(48) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    PRIMARY KEY (idparametro)
);


COMMENT ON TABLE parametro IS 'Parametros de aplicación. Permite parametrizar el comportamiento de un módulo.';
COMMENT ON COLUMN  parametro.idparametro IS 'Identificador unico del parametro.';
COMMENT ON COLUMN  parametro.idmodulo IS 'Identificador del modulo al que pertenece el parametro.';
COMMENT ON COLUMN  parametro.tipo IS 'Define el tipo de dato. A: Alfanumerico, N:Numerico';
COMMENT ON COLUMN  parametro.nombre IS 'Nombre del parámetro.';
COMMENT ON COLUMN  parametro.valor IS 'Valor del parámetro.';
-- ---------------------------------------------------------------------------------
-- PERFIL 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_perfil_idperfil;

CREATE TABLE perfil (
    idperfil INTEGER NOT NULL DEFAULT nextval('sq_perfil_idperfil'),
    idmodulo INTEGER NOT NULL,
    orden SMALLINT,
    visible VARCHAR(1) NOT NULL,
    descripcion VARCHAR(64) NOT NULL,
    PRIMARY KEY (idperfil)
);

CREATE INDEX ix_perfil_idmodulo ON perfil(idmodulo);

COMMENT ON TABLE perfil IS 'Perfil del accesor.';
COMMENT ON COLUMN  perfil.idperfil IS 'Identificador único del perfil.';
COMMENT ON COLUMN  perfil.idmodulo IS 'Identificador del módulo al que pertenece el perfil.';
COMMENT ON COLUMN  perfil.orden IS '';
COMMENT ON COLUMN  perfil.visible IS '';
COMMENT ON COLUMN  perfil.descripcion IS 'Descripcion del perfil.';
-- ---------------------------------------------------------------------------------
-- USUARIO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_usuario_idusuario;

CREATE TABLE usuario (
    idusuario INTEGER NOT NULL DEFAULT nextval('sq_usuario_idusuario'),
    idpersona INTEGER,
    idcontacto INTEGER,
    idperfil INTEGER NOT NULL,
    clavec VARCHAR(64),
    clavee VARCHAR(64) NOT NULL,
    ivalidez DATE NOT NULL,
    fvalidez DATE,
    intentos INTEGER,
    recuperacion VARCHAR(255),
    PRIMARY KEY (idusuario)
);

CREATE INDEX ix_usuario_idpersona ON usuario(idpersona);
CREATE INDEX ix_usuario_idperfil ON usuario(idperfil);
CREATE INDEX ix_usuario_ivalidez ON usuario(ivalidez);

COMMENT ON TABLE usuario IS 'Usuario. Accesores a los distintos módulos.';
COMMENT ON COLUMN  usuario.idusuario IS 'Identificador único del usuario.';
COMMENT ON COLUMN  usuario.idpersona IS 'Identificador de la persona.';
COMMENT ON COLUMN  usuario.idcontacto IS '';
COMMENT ON COLUMN  usuario.idperfil IS 'Identificador del perfil.';
COMMENT ON COLUMN  usuario.clavec IS 'Clave de acceso en claro';
COMMENT ON COLUMN  usuario.clavee IS 'Clave de acceso encriptada';
COMMENT ON COLUMN  usuario.ivalidez IS 'Fecha de inicio de la validez de las credenciales.';
COMMENT ON COLUMN  usuario.fvalidez IS 'Fecha de fin de la validez de las credenciales.';
COMMENT ON COLUMN  usuario.intentos IS 'Numero de intentos fallidos de acceso.';
COMMENT ON COLUMN  usuario.recuperacion IS 'Texto a comparar para reactivar las credenciales.';
-- ---------------------------------------------------------------------------------
-- PERSONA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_persona_idpersona;

CREATE TABLE persona (
    idpersona INTEGER NOT NULL DEFAULT nextval('sq_persona_idpersona'),
    tipo VARCHAR(1) NOT NULL,
    razonsocial VARCHAR(64),
    nombre VARCHAR(64),
    apellidos VARCHAR(64),
    movil VARCHAR(12),
    fijo VARCHAR(16),
    correo VARCHAR(128),
    nif VARCHAR(10),
    PRIMARY KEY (idpersona)
);


COMMENT ON COLUMN  persona.idpersona IS '';
COMMENT ON COLUMN  persona.tipo IS 'Tipo de persona. F: Fisica, J: Juridica';
COMMENT ON COLUMN  persona.razonsocial IS 'Razon social de la empresa en caso de  tratarse de una persona juridica.';
COMMENT ON COLUMN  persona.nombre IS 'Nombre de la persona cuando se trata de una persona fisica.';
COMMENT ON COLUMN  persona.apellidos IS 'Apellidos de la persona cuando se trata de una persona fisica.';
COMMENT ON COLUMN  persona.movil IS 'Numero de telefono movil.';
COMMENT ON COLUMN  persona.fijo IS 'Numero de telefono fijo. Permite incluir una extension.';
COMMENT ON COLUMN  persona.correo IS 'Direccion de correo electronico.';
COMMENT ON COLUMN  persona.nif IS 'Número de identificación fiscal.';
-- ---------------------------------------------------------------------------------
-- FRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_franquicia_idfranquicia;

CREATE TABLE franquicia (
    idfranquicia INTEGER NOT NULL DEFAULT nextval('sq_franquicia_idfranquicia'),
    codigo VARCHAR(10) NOT NULL,
    descripcion VARCHAR(64) NOT NULL,
    tipovia VARCHAR(8) NOT NULL,
    via VARCHAR(64) NOT NULL,
    numerovia VARCHAR(4) NOT NULL,
    restovia VARCHAR(64),
    cp VARCHAR(5) NOT NULL,
    localidad VARCHAR(64) NOT NULL,
    provincia VARCHAR(64) NOT NULL,
    fijo VARCHAR(16) NOT NULL,
    latitud DECIMAL(18,15),
    longitud DECIMAL(18,15),
    PRIMARY KEY (idfranquicia)
);

CREATE INDEX ix_franquicia_codigo ON franquicia(codigo);

COMMENT ON TABLE franquicia IS 'Franquicia. También se le llama delegación, agencia.';
COMMENT ON COLUMN  franquicia.idfranquicia IS 'Identificador unico de la franquicia. Autoincremental.';
COMMENT ON COLUMN  franquicia.codigo IS 'Código de la franquicia. Asignado por la central.';
COMMENT ON COLUMN  franquicia.descripcion IS 'Nombre descriptivo de la franquicia. Por ejemplo 02625: AYALA';
COMMENT ON COLUMN  franquicia.tipovia IS 'Tipo de via. Por ejemplo:C, PZA., AV. etc.';
COMMENT ON COLUMN  franquicia.via IS '';
COMMENT ON COLUMN  franquicia.numerovia IS '';
COMMENT ON COLUMN  franquicia.restovia IS 'Resto descriptivo de la via. Por ejemplo, Piso, Bloque, Nave, etc';
COMMENT ON COLUMN  franquicia.cp IS 'Codigo postal.';
COMMENT ON COLUMN  franquicia.localidad IS 'Localidad.';
COMMENT ON COLUMN  franquicia.provincia IS 'Provincia.';
COMMENT ON COLUMN  franquicia.fijo IS 'Telefono fijo de la franquicia.';
COMMENT ON COLUMN  franquicia.latitud IS '';
COMMENT ON COLUMN  franquicia.longitud IS '';
-- ---------------------------------------------------------------------------------
-- MODULO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_modulo_idmodulo;

CREATE TABLE modulo (
    idmodulo INTEGER NOT NULL DEFAULT nextval('sq_modulo_idmodulo'),
    ncorto VARCHAR(32) NOT NULL,
    nlargo VARCHAR(64) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY (idmodulo)
);


COMMENT ON COLUMN  modulo.idmodulo IS 'Identificador unico del modulo.';
COMMENT ON COLUMN  modulo.ncorto IS '';
COMMENT ON COLUMN  modulo.nlargo IS '';
COMMENT ON COLUMN  modulo.descripcion IS '';
-- ---------------------------------------------------------------------------------
-- CODIGO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_codigo_idcodigo;

CREATE TABLE codigo (
    idcodigo INTEGER NOT NULL DEFAULT nextval('sq_codigo_idcodigo'),
    idcategoria INTEGER NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    descripcion VARCHAR(256) NOT NULL,
    orden SMALLINT DEFAULT '0',
    PRIMARY KEY (idcodigo)
);

CREATE INDEX ix_codigo_idcategoria ON codigo(idcategoria);

COMMENT ON TABLE codigo IS 'Almacena todos los códigos que puedan emplearse. Se agruparán por idcodigo atendiendo a su uso.';
COMMENT ON COLUMN  codigo.idcodigo IS 'Identificador único del código.';
COMMENT ON COLUMN  codigo.idcategoria IS 'Identificador de la categoría a la que pertenece el código.';
COMMENT ON COLUMN  codigo.codigo IS 'Valor del código.';
COMMENT ON COLUMN  codigo.descripcion IS 'Descripción del código.';
COMMENT ON COLUMN  codigo.orden IS 'Número de orden para presentar los elementos ordenados.';
-- ---------------------------------------------------------------------------------
-- AUDITORIA 
-- ---------------------------------------------------------------------------------
CREATE TABLE auditoria (
    momento TIMESTAMP NOT NULL,
    idmodulo INTEGER NOT NULL,
    usuario VARCHAR(80) NOT NULL,
    tabla VARCHAR(60),
    idpk INTEGER NOT NULL,
    accion VARCHAR(1) NOT NULL,
    PRIMARY KEY (momento)
);

CREATE INDEX ix_auditoria_momento ON auditoria(momento);
CREATE INDEX ix_auditoria_usuario ON auditoria(usuario);
CREATE INDEX ix_auditoria_idmodulo ON auditoria(idmodulo);

COMMENT ON TABLE auditoria IS 'Auditoría de cambios en la base de datos. Registra las acciones de los usuarios sobre las tablas del modelo.';
COMMENT ON COLUMN  auditoria.momento IS 'Momento exacto del cambio.';
COMMENT ON COLUMN  auditoria.idmodulo IS 'Itentificador del módulo que ha usado el usuario.';
COMMENT ON COLUMN  auditoria.usuario IS 'Identificador del usuario.';
COMMENT ON COLUMN  auditoria.tabla IS 'Tabla afectada.';
COMMENT ON COLUMN  auditoria.idpk IS 'Identificador de la clave primaria de la tabla afectada. Define el registro que se ha modificado o insertado.';
COMMENT ON COLUMN  auditoria.accion IS 'Tipo de acción. Puede ser : I,U o D.';
-- ---------------------------------------------------------------------------------
-- ABONADO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_abonado_idabonado;

CREATE TABLE abonado (
    idabonado INTEGER NOT NULL DEFAULT nextval('sq_abonado_idabonado'),
    idprospecto INTEGER,
    idestado INTEGER NOT NULL,
    idsector INTEGER,
    idfpago INTEGER,
    idvencimiento INTEGER,
    fac DATE,
    falta DATE,
    nif VARCHAR(24),
    razonsocial VARCHAR(128) NOT NULL,
    telefono VARCHAR(16),
    correo VARCHAR(128),
    iban VARCHAR(24),
    titular VARCHAR(128),
    lihrecogida VARCHAR(5),
    lshrecogida VARCHAR(5),
    PRIMARY KEY (idabonado)
);


COMMENT ON TABLE abonado IS 'Clientes de las franquicias.';
COMMENT ON COLUMN  abonado.idabonado IS 'Identificador único del abonado.';
COMMENT ON COLUMN  abonado.idprospecto IS '';
COMMENT ON COLUMN  abonado.idestado IS 'Identificador del estado del abonado.';
COMMENT ON COLUMN  abonado.idsector IS 'Identificador unico del sector de actividad.';
COMMENT ON COLUMN  abonado.idfpago IS 'Identificador de la forma de pago.';
COMMENT ON COLUMN  abonado.idvencimiento IS '';
COMMENT ON COLUMN  abonado.fac IS 'Fecha de la última acción comercial.';
COMMENT ON COLUMN  abonado.falta IS 'Fecha de alta del abonado en el sistema.';
COMMENT ON COLUMN  abonado.nif IS 'Numero de identificacion fiscal.';
COMMENT ON COLUMN  abonado.razonsocial IS 'Razon social - Nombre de la empresa.';
COMMENT ON COLUMN  abonado.telefono IS 'Número de telefono de la empresa.';
COMMENT ON COLUMN  abonado.correo IS 'Dirección de correo electrónico.';
COMMENT ON COLUMN  abonado.iban IS '';
COMMENT ON COLUMN  abonado.titular IS 'Titular de la cuenta bancaria.';
COMMENT ON COLUMN  abonado.lihrecogida IS 'Limite inferior hora de recogida.';
COMMENT ON COLUMN  abonado.lshrecogida IS 'Limite superior hora de recogida.';
-- ---------------------------------------------------------------------------------
-- SERVICIO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_servicio_idservicio;

CREATE TABLE servicio (
    idservicio INTEGER NOT NULL DEFAULT nextval('sq_servicio_idservicio'),
    codigo VARCHAR(10) NOT NULL,
    descripcion VARCHAR(64) NOT NULL,
    condiciones TEXT,
    hora VARCHAR(5),
    PRIMARY KEY (idservicio)
);


COMMENT ON TABLE servicio IS 'Servicio de envío.';
COMMENT ON COLUMN  servicio.idservicio IS 'Identificador único del servicio.';
COMMENT ON COLUMN  servicio.codigo IS 'Código del servicio.';
COMMENT ON COLUMN  servicio.descripcion IS 'Descripción del servicio.';
COMMENT ON COLUMN  servicio.condiciones IS 'Condiciones de entrega y demensiones del servicio. ';
COMMENT ON COLUMN  servicio.hora IS 'Hora máxima de entrega del servicio.';
-- ---------------------------------------------------------------------------------
-- SERVICIOSABONADO 
-- ---------------------------------------------------------------------------------
CREATE TABLE serviciosabonado (
    idservicio INTEGER NOT NULL,
    idabonado INTEGER NOT NULL,
    PRIMARY KEY (idservicio, idabonado)
);

CREATE INDEX ix_serviciosabonado_idservicio ON serviciosabonado(idservicio);
CREATE INDEX ix_serviciosabonado_idabonado ON serviciosabonado(idabonado);

COMMENT ON TABLE serviciosabonado IS 'Relaciona los servicios de abonados.';
COMMENT ON COLUMN  serviciosabonado.idservicio IS 'Identificador unico del servicio.';
COMMENT ON COLUMN  serviciosabonado.idabonado IS '';
-- ---------------------------------------------------------------------------------
-- ENVIO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_envio_idenvio;

CREATE TABLE envio (
    idenvio INTEGER NOT NULL DEFAULT nextval('sq_envio_idenvio'),
    idproveedor INTEGER NOT NULL,
    idestado INTEGER,
    factualizacion TIMESTAMP,
    idabonado INTEGER,
    idceco INTEGER,
    frqabonado INTEGER,
    frqorigen INTEGER,
    frqdestino INTEGER,
    frqtercera INTEGER,
    idservicio INTEGER NOT NULL,
    idcobro INTEGER NOT NULL,
    idgenerador INTEGER,
    idgeografia INTEGER NOT NULL,
    idtramo INTEGER,
    idfrecuencia INTEGER NOT NULL,
    idrepartidorr INTEGER,
    idrepartidore INTEGER,
    numero VARCHAR(16) NOT NULL,
    fcreacion DATE NOT NULL,
    fenvio DATE NOT NULL,
    fhrecogida TIMESTAMP NOT NULL,
    fhrfinalizada TIMESTAMP,
    fhefinalizada TIMESTAMP,
    fhestado TIMESTAMP NOT NULL,
    referencia VARCHAR(48),
    remitente VARCHAR(64) NOT NULL,
    cpremitente VARCHAR(10) NOT NULL,
    destinatario VARCHAR(64) NOT NULL,
    cpdestinatario VARCHAR(10) NOT NULL,
    sabado VARCHAR(1) NOT NULL,
    bultos INTEGER NOT NULL,
    recogidaoficina VARCHAR(1) NOT NULL,
    entregaoficina VARCHAR(1) NOT NULL,
    reembolso DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (idenvio)
);

CREATE UNIQUE INDEX ux_envio_numero ON envio(numero);
CREATE INDEX ix_envio_frqabonado ON envio(frqabonado);
CREATE INDEX ix_envio_frqorigen ON envio(frqorigen);
CREATE INDEX ix_envio_frqdestino ON envio(frqdestino);
CREATE INDEX ix_envio_frqtercera ON envio(frqtercera);
CREATE INDEX ix_envio_idservicio ON envio(idservicio);
CREATE INDEX ix_envio_idcobro ON envio(idcobro);
CREATE INDEX ix_envio_idgenerador ON envio(idgenerador);
CREATE INDEX ix_envio_idgeografia ON envio(idgeografia);
CREATE INDEX ix_envio_idtramo ON envio(idtramo);
CREATE INDEX ix_envio_fenvio ON envio(fenvio);
CREATE INDEX ix_envio_fcreacion ON envio(fcreacion);

COMMENT ON TABLE envio IS 'Envío. ';
COMMENT ON COLUMN  envio.idenvio IS 'Identificador único del envío.';
COMMENT ON COLUMN  envio.idproveedor IS '';
COMMENT ON COLUMN  envio.idestado IS 'Estado del envio.';
COMMENT ON COLUMN  envio.factualizacion IS 'Fecha y hora de la última actualización del estado.';
COMMENT ON COLUMN  envio.idabonado IS 'Identificador del abonado. Si existe pertenece a la franquicia de origen.';
COMMENT ON COLUMN  envio.idceco IS '';
COMMENT ON COLUMN  envio.frqabonado IS 'Identificador de la franquicia a la que pertenece el abonado.';
COMMENT ON COLUMN  envio.frqorigen IS 'Identificador de la franquicia de origen.';
COMMENT ON COLUMN  envio.frqdestino IS 'Identificador de la franquicia de destino.';
COMMENT ON COLUMN  envio.frqtercera IS 'Identificador de la franquicia tercera';
COMMENT ON COLUMN  envio.idservicio IS 'Identificador del servicio de envío.';
COMMENT ON COLUMN  envio.idcobro IS 'Identificador del tipo de cobro.';
COMMENT ON COLUMN  envio.idgenerador IS 'Identificador del sistema que genera el envío. Determina si el envio se generó por G3, SAGEC, APC, etc.';
COMMENT ON COLUMN  envio.idgeografia IS 'Tipo geografico. Puede ser urbano, interurbano, etc.';
COMMENT ON COLUMN  envio.idtramo IS 'Identificador del tramo horario. Solo aplica cuando  el servicio es ECOM.';
COMMENT ON COLUMN  envio.idfrecuencia IS 'Identificador de frecuencia. Solo aplica a algunos servicios.';
COMMENT ON COLUMN  envio.idrepartidorr IS '';
COMMENT ON COLUMN  envio.idrepartidore IS '';
COMMENT ON COLUMN  envio.numero IS 'Numero de envio. Asignado por central. Es tambien  identificador unico.';
COMMENT ON COLUMN  envio.fcreacion IS 'Fecha de creación del envío.';
COMMENT ON COLUMN  envio.fenvio IS 'Fecha de envio';
COMMENT ON COLUMN  envio.fhrecogida IS 'Fecha y hora de recogida prevista.';
COMMENT ON COLUMN  envio.fhrfinalizada IS 'Fecha y hora de recogida finalizada.';
COMMENT ON COLUMN  envio.fhefinalizada IS 'Fecha y hora de entrega finalizada.';
COMMENT ON COLUMN  envio.fhestado IS 'Fecha y hora del ultimo estado.';
COMMENT ON COLUMN  envio.referencia IS 'Referencia del cliente.';
COMMENT ON COLUMN  envio.remitente IS 'Nombre del remitente.';
COMMENT ON COLUMN  envio.cpremitente IS 'Código postal del remitente.';
COMMENT ON COLUMN  envio.destinatario IS 'Nombre del destinatario.';
COMMENT ON COLUMN  envio.cpdestinatario IS 'Código postal del destinatario.';
COMMENT ON COLUMN  envio.sabado IS 'Entrega en sabado -> S/N';
COMMENT ON COLUMN  envio.bultos IS 'Número total de bultos.';
COMMENT ON COLUMN  envio.recogidaoficina IS 'Indica si se recoge en la oficina -> S/N';
COMMENT ON COLUMN  envio.entregaoficina IS 'Indica si se entrega en la oficina -> S/N';
COMMENT ON COLUMN  envio.reembolso IS 'Importe del reembolso. Hasta 99.999,99';
-- ---------------------------------------------------------------------------------
-- FACTURA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_factura_idfactura;

CREATE TABLE factura (
    idfactura INTEGER NOT NULL DEFAULT nextval('sq_factura_idfactura'),
    idmoneda INTEGER NOT NULL,
    pdf VARCHAR(256),
    ffactura DATE NOT NULL,
    numero VARCHAR(32) NOT NULL,
    baseimponible DECIMAL(10,2) NOT NULL,
    tipo DECIMAL(5,2) NOT NULL,
    importe DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (idfactura)
);

CREATE INDEX ix_factura_ffactura ON factura(ffactura);
CREATE INDEX ix_factura_idmoneda ON factura(idmoneda);

COMMENT ON TABLE factura IS 'Facturas emitidas.';
COMMENT ON COLUMN  factura.idfactura IS 'Identificador único de la factura.';
COMMENT ON COLUMN  factura.idmoneda IS 'Identificador de la moneda utiliada en la transacción.';
COMMENT ON COLUMN  factura.pdf IS 'Ruta del archivo para localiar la factura.';
COMMENT ON COLUMN  factura.ffactura IS 'Fecha de la factura.';
COMMENT ON COLUMN  factura.numero IS 'Número de factura.';
COMMENT ON COLUMN  factura.baseimponible IS 'Base imponible.';
COMMENT ON COLUMN  factura.tipo IS 'Tipo imponible.';
COMMENT ON COLUMN  factura.importe IS 'Importe total de la factura.';
-- ---------------------------------------------------------------------------------
-- ENVIOSFACTURA 
-- ---------------------------------------------------------------------------------
CREATE TABLE enviosfactura (
    idfactura INTEGER NOT NULL,
    idenvio INTEGER NOT NULL,
    facturado VARCHAR(1) NOT NULL,
    PRIMARY KEY (idfactura, idenvio)
);


COMMENT ON COLUMN  enviosfactura.idfactura IS '';
COMMENT ON COLUMN  enviosfactura.idenvio IS '';
COMMENT ON COLUMN  enviosfactura.facturado IS 'Indica si los envios estan ya facturados.';
-- ---------------------------------------------------------------------------------
-- CATEGORIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_categoria_idcategoria;

CREATE TABLE categoria (
    idcategoria INTEGER NOT NULL DEFAULT nextval('sq_categoria_idcategoria'),
    categoria VARCHAR(10) NOT NULL,
    descripcion VARCHAR(64) NOT NULL,
    tipo VARCHAR(1) NOT NULL,
    longitud INTEGER NOT NULL,
    PRIMARY KEY (idcategoria)
);

CREATE INDEX ix_categoria_categoria ON categoria(categoria);

COMMENT ON TABLE categoria IS 'Categorías de los códigos. Permite agrupar los códigos en distintas categorías.';
COMMENT ON COLUMN  categoria.idcategoria IS 'Identificador unico de la categoria del codigo.';
COMMENT ON COLUMN  categoria.categoria IS 'Nombre de la categoría.';
COMMENT ON COLUMN  categoria.descripcion IS 'Descripcion de la categoría.';
COMMENT ON COLUMN  categoria.tipo IS 'Define el tipo de dato. A: Alfanumerico, N:Numerico';
COMMENT ON COLUMN  categoria.longitud IS 'Longitud efectiva del campo codigo.';
-- ---------------------------------------------------------------------------------
-- BULTO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_bulto_idbulto;

CREATE TABLE bulto (
    idbulto INTEGER NOT NULL DEFAULT nextval('sq_bulto_idbulto'),
    idenvio INTEGER NOT NULL,
    referencia VARCHAR(48),
    peso DECIMAL(6,1) NOT NULL,
    alto DECIMAL(6,1) NOT NULL,
    ancho DECIMAL(6,1) NOT NULL,
    largo DECIMAL(6,1) NOT NULL,
    pesosorter DECIMAL(6,1) NOT NULL,
    altosorter DECIMAL(6,1) NOT NULL,
    anchosorter DECIMAL(6,1) NOT NULL,
    largosorter DECIMAL(6,1) NOT NULL,
    PRIMARY KEY (idbulto)
);

CREATE INDEX ix_bulto_idenvio ON bulto(idenvio);

COMMENT ON TABLE bulto IS 'Bulto de un envío.';
COMMENT ON COLUMN  bulto.idbulto IS 'Identificador único del bulto.';
COMMENT ON COLUMN  bulto.idenvio IS 'Identificador del envío al que pertenece el bulto.';
COMMENT ON COLUMN  bulto.referencia IS 'Referencia del bulto.';
COMMENT ON COLUMN  bulto.peso IS 'Peso del bulto en Kg.';
COMMENT ON COLUMN  bulto.alto IS 'Altura del bulto en cm.';
COMMENT ON COLUMN  bulto.ancho IS 'Anchura del bulto en cm.';
COMMENT ON COLUMN  bulto.largo IS 'Longitud del bulto en cm.';
COMMENT ON COLUMN  bulto.pesosorter IS 'Peso del bulto en Kg indicado por SORTER.';
COMMENT ON COLUMN  bulto.altosorter IS 'Altura del bulto en cm. indicada por SORTER';
COMMENT ON COLUMN  bulto.anchosorter IS 'Anchura del bulto en cm. indicada por SORTER.';
COMMENT ON COLUMN  bulto.largosorter IS 'Longitud del bulto en cm. indicada por SORTER.';
-- ---------------------------------------------------------------------------------
-- CONTACTO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_contacto_idcontacto;

CREATE TABLE contacto (
    idcontacto INTEGER NOT NULL DEFAULT nextval('sq_contacto_idcontacto'),
    cargo VARCHAR(64),
    nombre VARCHAR(64) NOT NULL,
    apellidos VARCHAR(64) NOT NULL,
    movil VARCHAR(12),
    fijo VARCHAR(16),
    correo VARCHAR(128),
    PRIMARY KEY (idcontacto)
);


COMMENT ON TABLE contacto IS 'Personas de contacto.';
COMMENT ON COLUMN  contacto.idcontacto IS 'Identificador unico del contacto.';
COMMENT ON COLUMN  contacto.cargo IS 'Departamento o cargo que ocupa la persona de contacto.';
COMMENT ON COLUMN  contacto.nombre IS 'Nombre de la persona.';
COMMENT ON COLUMN  contacto.apellidos IS 'Apellidos de la persona.';
COMMENT ON COLUMN  contacto.movil IS 'Numero de telefono movil.';
COMMENT ON COLUMN  contacto.fijo IS 'Numero de telefono fijo. Permite incluir una extension.';
COMMENT ON COLUMN  contacto.correo IS 'Direccion de correo electronico.';
-- ---------------------------------------------------------------------------------
-- CONTACTOSABONADO 
-- ---------------------------------------------------------------------------------
CREATE TABLE contactosabonado (
    idcontacto INTEGER NOT NULL,
    idabonado INTEGER NOT NULL,
    preferente VARCHAR(1),
    PRIMARY KEY (idcontacto, idabonado)
);

CREATE INDEX ix_contactosabonado_idcontacto ON contactosabonado(idcontacto);
CREATE INDEX ix_contactosabonado_idabonado ON contactosabonado(idabonado);

COMMENT ON TABLE contactosabonado IS 'Relaciona las personas de contacto de los abonados.';
COMMENT ON COLUMN  contactosabonado.idcontacto IS '';
COMMENT ON COLUMN  contactosabonado.idabonado IS '';
COMMENT ON COLUMN  contactosabonado.preferente IS 'Indica si es el contacto preferente';
-- ---------------------------------------------------------------------------------
-- LINEAFACTURA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_lineafactura_idlineafactura;

CREATE TABLE lineafactura (
    idlineafactura INTEGER NOT NULL DEFAULT nextval('sq_lineafactura_idlineafactura'),
    idfactura INTEGER NOT NULL,
    unidades SMALLINT,
    concepto VARCHAR(256) NOT NULL,
    unitario DECIMAL(10,2),
    importe DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (idlineafactura)
);


COMMENT ON COLUMN  lineafactura.idlineafactura IS 'Identificador único de la línea de factura.';
COMMENT ON COLUMN  lineafactura.idfactura IS 'Identificador de la factura a la que pertenece.';
COMMENT ON COLUMN  lineafactura.unidades IS 'Número de unidades.';
COMMENT ON COLUMN  lineafactura.concepto IS 'Descripción del concepto.';
COMMENT ON COLUMN  lineafactura.unitario IS 'Importe unitario.';
COMMENT ON COLUMN  lineafactura.importe IS 'Importe.  Hasta 99.999.999 99';
-- ---------------------------------------------------------------------------------
-- SOPORTE 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_soporte_idsoporte;

CREATE TABLE soporte (
    idsoporte INTEGER NOT NULL DEFAULT nextval('sq_soporte_idsoporte'),
    idmodulo INTEGER NOT NULL,
    idsolicitante INTEGER NOT NULL,
    idcategoria INTEGER NOT NULL,
    idestado INTEGER NOT NULL,
    tipo VARCHAR(3) NOT NULL,
    numenvio VARCHAR(16),
    fentrada TIMESTAMP NOT NULL,
    factualizacion TIMESTAMP,
    asunto VARCHAR(128) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY (idsoporte)
);


COMMENT ON TABLE soporte IS 'Registro de incidencias.';
COMMENT ON COLUMN  soporte.idsoporte IS '';
COMMENT ON COLUMN  soporte.idmodulo IS '';
COMMENT ON COLUMN  soporte.idsolicitante IS '';
COMMENT ON COLUMN  soporte.idcategoria IS '';
COMMENT ON COLUMN  soporte.idestado IS '';
COMMENT ON COLUMN  soporte.tipo IS 'Tipo de soporte: ENV->Envios, FAC->Facturación.';
COMMENT ON COLUMN  soporte.numenvio IS 'Número de envío.';
COMMENT ON COLUMN  soporte.fentrada IS 'Fecha y hora de entrada.';
COMMENT ON COLUMN  soporte.factualizacion IS 'Fecha y hora de la última actualización.';
COMMENT ON COLUMN  soporte.asunto IS '';
COMMENT ON COLUMN  soporte.descripcion IS 'Descripción de la solicitud.';
-- ---------------------------------------------------------------------------------
-- SEGUIMIENTO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_seguimiento_idseguimiento;

CREATE TABLE seguimiento (
    idseguimiento INTEGER NOT NULL DEFAULT nextval('sq_seguimiento_idseguimiento'),
    idsoporte INTEGER NOT NULL,
    idgestor INTEGER NOT NULL,
    factuacion TIMESTAMP NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (idseguimiento)
);


COMMENT ON COLUMN  seguimiento.idseguimiento IS 'Identificador único de seguimiento.';
COMMENT ON COLUMN  seguimiento.idsoporte IS '';
COMMENT ON COLUMN  seguimiento.idgestor IS '';
COMMENT ON COLUMN  seguimiento.factuacion IS 'Fecha y hora de actuación.';
COMMENT ON COLUMN  seguimiento.descripcion IS 'Descripción de la actuación.';
-- ---------------------------------------------------------------------------------
-- FESTIVO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_festivo_idfestivo;

CREATE TABLE festivo (
    idfestivo INTEGER NOT NULL DEFAULT nextval('sq_festivo_idfestivo'),
    fecha DATE NOT NULL,
    tipo VARCHAR(1) NOT NULL,
    PRIMARY KEY (idfestivo)
);


COMMENT ON COLUMN  festivo.idfestivo IS 'Identificador unico';
COMMENT ON COLUMN  festivo.fecha IS 'Fecha festiva.';
COMMENT ON COLUMN  festivo.tipo IS 'Tipo de festivo: N->Nacional, A->Autonomica';
-- ---------------------------------------------------------------------------------
-- ABONADOSFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_abonadosfranquicia_idrelacion;

CREATE TABLE abonadosfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_abonadosfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idabonado INTEGER NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE abonadosfranquicia IS 'Relacion por periodo entre los abonados y las franquicias.';
COMMENT ON COLUMN  abonadosfranquicia.idrelacion IS 'Identificador único del registro.';
COMMENT ON COLUMN  abonadosfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  abonadosfranquicia.idabonado IS '';
COMMENT ON COLUMN  abonadosfranquicia.codigo IS 'Codigo de abonado proporcionado por la franquicia. Los códigos solo son únicos en la franquicia.';
COMMENT ON COLUMN  abonadosfranquicia.finicio IS 'Fecha de inicio de la relación.';
COMMENT ON COLUMN  abonadosfranquicia.ffin IS 'Fecha de fin del periodo de la relación. Cuando el valor es NULL el periodo no ha acabado.';
-- ---------------------------------------------------------------------------------
-- CARGO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_cargo_idcargo;

CREATE TABLE cargo (
    idcargo INTEGER NOT NULL DEFAULT nextval('sq_cargo_idcargo'),
    descripcion VARCHAR(64) NOT NULL,
    PRIMARY KEY (idcargo)
);


COMMENT ON COLUMN  cargo.idcargo IS 'Identificador único del cargo.';
COMMENT ON COLUMN  cargo.descripcion IS 'Descripción del cargo.';
-- ---------------------------------------------------------------------------------
-- GRUPO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_grupo_idgrupo;

CREATE TABLE grupo (
    idgrupo INTEGER NOT NULL DEFAULT nextval('sq_grupo_idgrupo'),
    idpersona INTEGER NOT NULL,
    idcargo INTEGER NOT NULL,
    idfranquicia INTEGER,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idgrupo)
);


COMMENT ON TABLE grupo IS 'Estructura de cargos del grupo.';
COMMENT ON COLUMN  grupo.idgrupo IS 'Identificador único del registro.';
COMMENT ON COLUMN  grupo.idpersona IS '';
COMMENT ON COLUMN  grupo.idcargo IS '';
COMMENT ON COLUMN  grupo.idfranquicia IS '';
COMMENT ON COLUMN  grupo.finicio IS 'Fecha de inicio en el cargo.';
COMMENT ON COLUMN  grupo.ffin IS 'Fecha de fin en la ocupación del cargo. Si el valor es NULL la persona está vigente en el cargo.';
-- ---------------------------------------------------------------------------------
-- AGREGADO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_agregado_idagregado;

CREATE TABLE agregado (
    idagregado INTEGER NOT NULL DEFAULT nextval('sq_agregado_idagregado'),
    idabonado INTEGER NOT NULL,
    idcategoria INTEGER NOT NULL,
    anio SMALLINT NOT NULL,
    mes SMALLINT NOT NULL,
    importe DECIMAL(11,2) NOT NULL,
    envios INTEGER NOT NULL,
    PRIMARY KEY (idagregado)
);

CREATE UNIQUE INDEX ux_agregado_am ON agregado(idabonado,anio,mes);

COMMENT ON COLUMN  agregado.idagregado IS 'Identificador único del dato agregado.';
COMMENT ON COLUMN  agregado.idabonado IS '';
COMMENT ON COLUMN  agregado.idcategoria IS '';
COMMENT ON COLUMN  agregado.anio IS 'Año.';
COMMENT ON COLUMN  agregado.mes IS 'Mes';
COMMENT ON COLUMN  agregado.importe IS 'Importe agregado para la categoria,  año y mes.';
COMMENT ON COLUMN  agregado.envios IS 'Número de envíos.';
-- ---------------------------------------------------------------------------------
-- DIRECCION 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_direccion_iddireccion;

CREATE TABLE direccion (
    iddireccion INTEGER NOT NULL DEFAULT nextval('sq_direccion_iddireccion'),
    idabonado INTEGER NOT NULL,
    idceco INTEGER,
    idtipo INTEGER NOT NULL,
    idtipovia INTEGER,
    via VARCHAR(64),
    numerovia VARCHAR(16),
    restovia VARCHAR(64),
    cp VARCHAR(5),
    localidad VARCHAR(64),
    provincia VARCHAR(48),
    pais VARCHAR(48),
    preferente VARCHAR(1) NOT NULL,
    latitud DECIMAL(18,15),
    longitud DECIMAL(18,15),
    observaciones TEXT,
    PRIMARY KEY (iddireccion)
);


COMMENT ON COLUMN  direccion.iddireccion IS '';
COMMENT ON COLUMN  direccion.idabonado IS '';
COMMENT ON COLUMN  direccion.idceco IS '';
COMMENT ON COLUMN  direccion.idtipo IS 'Tipo de direccion: Fiscal, recogida, etc.';
COMMENT ON COLUMN  direccion.idtipovia IS 'Tipo de via.';
COMMENT ON COLUMN  direccion.via IS '';
COMMENT ON COLUMN  direccion.numerovia IS 'Resto de la dirección.';
COMMENT ON COLUMN  direccion.restovia IS 'Resto descriptivo de la via. Por ejemplo, Piso, Bloque, Nave, etc';
COMMENT ON COLUMN  direccion.cp IS 'Codigo postal.';
COMMENT ON COLUMN  direccion.localidad IS 'Localidad.';
COMMENT ON COLUMN  direccion.provincia IS 'Nombre de la provincia.';
COMMENT ON COLUMN  direccion.pais IS 'Pais del remitente.';
COMMENT ON COLUMN  direccion.preferente IS 'Indica si se trata de la dirección preferida para mostrar.';
COMMENT ON COLUMN  direccion.latitud IS '';
COMMENT ON COLUMN  direccion.longitud IS '';
COMMENT ON COLUMN  direccion.observaciones IS 'Observaciones sobre la dirección. ';
-- ---------------------------------------------------------------------------------
-- ORIGENENVIO 
-- ---------------------------------------------------------------------------------
CREATE TABLE origenenvio (
    idenvio INTEGER NOT NULL,
    idtipovia INTEGER,
    via VARCHAR(64),
    numerovia VARCHAR(16),
    restovia VARCHAR(64),
    cp VARCHAR(8),
    localidad VARCHAR(64),
    provincia VARCHAR(48),
    pais VARCHAR(48),
    latitud DECIMAL(18,15),
    longitud DECIMAL(18,15),
    origengis VARCHAR(32),
    intentos SMALLINT NOT NULL,
    PRIMARY KEY (idenvio)
);

CREATE INDEX ix_origenenvio_direccion ON origenenvio(idtipovia,via,numerovia,restovia,cp,localidad);

COMMENT ON TABLE origenenvio IS 'Dirección del origen del envio (remitente)';
COMMENT ON COLUMN  origenenvio.idenvio IS 'Identificador del envio al que corresponde esta dirección de origen';
COMMENT ON COLUMN  origenenvio.idtipovia IS 'Tipo de via.';
COMMENT ON COLUMN  origenenvio.via IS 'Nombre de la vía';
COMMENT ON COLUMN  origenenvio.numerovia IS 'Número';
COMMENT ON COLUMN  origenenvio.restovia IS 'Resto descriptivo de la via. Por ejemplo, Piso, Bloque, Nave, etc';
COMMENT ON COLUMN  origenenvio.cp IS 'Codigo postal.';
COMMENT ON COLUMN  origenenvio.localidad IS 'Localidad.';
COMMENT ON COLUMN  origenenvio.provincia IS 'Nombre de la provincia.';
COMMENT ON COLUMN  origenenvio.pais IS 'Pais del remitente.';
COMMENT ON COLUMN  origenenvio.latitud IS '';
COMMENT ON COLUMN  origenenvio.longitud IS '';
COMMENT ON COLUMN  origenenvio.origengis IS 'Origen de la geocodificacion M-Manual, H->Historico, A->Sistema de geolocalización (IGN, GOOGLE, OSM, etc.)';
COMMENT ON COLUMN  origenenvio.intentos IS 'Número de intentos de geolocalizacion.';
-- ---------------------------------------------------------------------------------
-- PERSONASABONADO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_personasabonado_idrelacion;

CREATE TABLE personasabonado (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_personasabonado_idrelacion'),
    idabonado INTEGER NOT NULL,
    idpersona INTEGER NOT NULL,
    PRIMARY KEY (idrelacion)
);

CREATE UNIQUE INDEX ux_personasabonado_idabonado_idpersona ON personasabonado(idabonado, idpersona);

COMMENT ON TABLE personasabonado IS 'Relación de personas por abonado.';
COMMENT ON COLUMN  personasabonado.idrelacion IS 'Identificador único de la relación.';
COMMENT ON COLUMN  personasabonado.idabonado IS '';
COMMENT ON COLUMN  personasabonado.idpersona IS '';
-- ---------------------------------------------------------------------------------
-- TMPENVIO 
-- ---------------------------------------------------------------------------------
CREATE TABLE tmpenvio (
    fechacarga DATE NOT NULL,
    franquicia VARCHAR(5) NOT NULL,
    fechacreacion VARCHAR(24) NOT NULL,
    fechaenvio VARCHAR(24) NOT NULL,
    fecharecogida VARCHAR(24),
    fhrfinalizada VARCHAR(24),
    fefinalizada VARCHAR(24),
    fechaestado VARCHAR(24) NOT NULL,
    estado VARCHAR(48),
    abonado VARCHAR(6),
    centrocoste VARCHAR(32),
    fqsolicitante VARCHAR(5),
    fqcliente VARCHAR(5),
    fqorigen VARCHAR(5),
    fqdestino VARCHAR(5),
    fqtercera VARCHAR(5),
    numero VARCHAR(12) NOT NULL,
    referencia VARCHAR(64),
    tpcobro VARCHAR(32),
    tpgeografico VARCHAR(32),
    codservicio VARCHAR(32),
    tramohorario VARCHAR(16),
    frecuencia VARCHAR(32),
    sabado VARCHAR(4),
    totalbultos VARCHAR(8) NOT NULL,
    peso VARCHAR(8),
    alto VARCHAR(8),
    ancho VARCHAR(8),
    largo VARCHAR(8),
    pesosorter VARCHAR(8),
    altosorter VARCHAR(8),
    anchosorter VARCHAR(8),
    largosorter VARCHAR(8),
    recogidaoficina VARCHAR(4),
    entregaoficina VARCHAR(4),
    nombreentrega VARCHAR(64),
    nombrerecogida VARCHAR(64),
    remitente VARCHAR(64),
    remitentetpvia VARCHAR(16),
    remitentevia VARCHAR(64),
    remitentenumvia VARCHAR(32),
    remitenterestovia VARCHAR(64),
    remitentecp VARCHAR(16),
    remitentepoblacion VARCHAR(64),
    remitenteprovincia VARCHAR(32),
    remitentepais VARCHAR(32),
    telefonorecogida VARCHAR(24),
    destinatarionombre VARCHAR(64),
    destinatariotpvia VARCHAR(16),
    destinatariovia VARCHAR(64),
    destinatarionumvia VARCHAR(32),
    destinatariorestovia VARCHAR(64),
    destinatariocp VARCHAR(16),
    destinatariopoblacion VARCHAR(64),
    destinatarioprovincia VARCHAR(32),
    destinatariopais VARCHAR(32),
    generador VARCHAR(32),
    tpreembolso VARCHAR(16),
    reembolso VARCHAR(16)
);


COMMENT ON TABLE tmpenvio IS 'Tabla auxiliar para la carga de envíos.';
COMMENT ON COLUMN  tmpenvio.fechacarga IS '';
COMMENT ON COLUMN  tmpenvio.franquicia IS '';
COMMENT ON COLUMN  tmpenvio.fechacreacion IS '';
COMMENT ON COLUMN  tmpenvio.fechaenvio IS '';
COMMENT ON COLUMN  tmpenvio.fecharecogida IS '';
COMMENT ON COLUMN  tmpenvio.fhrfinalizada IS '';
COMMENT ON COLUMN  tmpenvio.fefinalizada IS '';
COMMENT ON COLUMN  tmpenvio.fechaestado IS '';
COMMENT ON COLUMN  tmpenvio.estado IS '';
COMMENT ON COLUMN  tmpenvio.abonado IS '';
COMMENT ON COLUMN  tmpenvio.centrocoste IS '';
COMMENT ON COLUMN  tmpenvio.fqsolicitante IS '';
COMMENT ON COLUMN  tmpenvio.fqcliente IS '';
COMMENT ON COLUMN  tmpenvio.fqorigen IS '';
COMMENT ON COLUMN  tmpenvio.fqdestino IS '';
COMMENT ON COLUMN  tmpenvio.fqtercera IS '';
COMMENT ON COLUMN  tmpenvio.numero IS '';
COMMENT ON COLUMN  tmpenvio.referencia IS '';
COMMENT ON COLUMN  tmpenvio.tpcobro IS '';
COMMENT ON COLUMN  tmpenvio.tpgeografico IS '';
COMMENT ON COLUMN  tmpenvio.codservicio IS '';
COMMENT ON COLUMN  tmpenvio.tramohorario IS '';
COMMENT ON COLUMN  tmpenvio.frecuencia IS '';
COMMENT ON COLUMN  tmpenvio.sabado IS '';
COMMENT ON COLUMN  tmpenvio.totalbultos IS '';
COMMENT ON COLUMN  tmpenvio.peso IS '';
COMMENT ON COLUMN  tmpenvio.alto IS '';
COMMENT ON COLUMN  tmpenvio.ancho IS '';
COMMENT ON COLUMN  tmpenvio.largo IS '';
COMMENT ON COLUMN  tmpenvio.pesosorter IS '';
COMMENT ON COLUMN  tmpenvio.altosorter IS '';
COMMENT ON COLUMN  tmpenvio.anchosorter IS '';
COMMENT ON COLUMN  tmpenvio.largosorter IS '';
COMMENT ON COLUMN  tmpenvio.recogidaoficina IS '';
COMMENT ON COLUMN  tmpenvio.entregaoficina IS '';
COMMENT ON COLUMN  tmpenvio.nombreentrega IS '';
COMMENT ON COLUMN  tmpenvio.nombrerecogida IS '';
COMMENT ON COLUMN  tmpenvio.remitente IS '';
COMMENT ON COLUMN  tmpenvio.remitentetpvia IS '';
COMMENT ON COLUMN  tmpenvio.remitentevia IS '';
COMMENT ON COLUMN  tmpenvio.remitentenumvia IS '';
COMMENT ON COLUMN  tmpenvio.remitenterestovia IS '';
COMMENT ON COLUMN  tmpenvio.remitentecp IS '';
COMMENT ON COLUMN  tmpenvio.remitentepoblacion IS '';
COMMENT ON COLUMN  tmpenvio.remitenteprovincia IS '';
COMMENT ON COLUMN  tmpenvio.remitentepais IS '';
COMMENT ON COLUMN  tmpenvio.telefonorecogida IS '';
COMMENT ON COLUMN  tmpenvio.destinatarionombre IS '';
COMMENT ON COLUMN  tmpenvio.destinatariotpvia IS '';
COMMENT ON COLUMN  tmpenvio.destinatariovia IS '';
COMMENT ON COLUMN  tmpenvio.destinatarionumvia IS '';
COMMENT ON COLUMN  tmpenvio.destinatariorestovia IS '';
COMMENT ON COLUMN  tmpenvio.destinatariocp IS '';
COMMENT ON COLUMN  tmpenvio.destinatariopoblacion IS '';
COMMENT ON COLUMN  tmpenvio.destinatarioprovincia IS '';
COMMENT ON COLUMN  tmpenvio.destinatariopais IS '';
COMMENT ON COLUMN  tmpenvio.generador IS '';
COMMENT ON COLUMN  tmpenvio.tpreembolso IS '';
COMMENT ON COLUMN  tmpenvio.reembolso IS '';
-- ---------------------------------------------------------------------------------
-- DESTINOENVIO 
-- ---------------------------------------------------------------------------------
CREATE TABLE destinoenvio (
    idenvio INTEGER NOT NULL,
    idtipovia INTEGER,
    via VARCHAR(64),
    numerovia VARCHAR(16),
    restovia VARCHAR(64),
    cp VARCHAR(8),
    localidad VARCHAR(64),
    provincia VARCHAR(48),
    pais VARCHAR(48),
    latitud DECIMAL(18,15),
    longitud DECIMAL(18,15),
    origengis VARCHAR(32),
    intentos SMALLINT NOT NULL,
    PRIMARY KEY (idenvio)
);

CREATE INDEX ix_destinoenvio_direccion ON destinoenvio(idtipovia,via,numerovia,restovia,cp,localidad);

COMMENT ON COLUMN  destinoenvio.idenvio IS 'Identificador del envio al que corresponde esta dirección de origen';
COMMENT ON COLUMN  destinoenvio.idtipovia IS 'Tipo de via.';
COMMENT ON COLUMN  destinoenvio.via IS 'Nombre de la vía';
COMMENT ON COLUMN  destinoenvio.numerovia IS 'Número';
COMMENT ON COLUMN  destinoenvio.restovia IS 'Resto descriptivo de la via. Por ejemplo, Piso, Bloque, Nave, etc';
COMMENT ON COLUMN  destinoenvio.cp IS 'Codigo postal.';
COMMENT ON COLUMN  destinoenvio.localidad IS 'Localidad.';
COMMENT ON COLUMN  destinoenvio.provincia IS 'Nombre de la provincia.';
COMMENT ON COLUMN  destinoenvio.pais IS 'Pais del remitente.';
COMMENT ON COLUMN  destinoenvio.latitud IS '';
COMMENT ON COLUMN  destinoenvio.longitud IS '';
COMMENT ON COLUMN  destinoenvio.origengis IS 'Origen de la geocodificacion M-Manual, H->Historico, A->Sistema de geolocalización (IGN, GOOGLE, OSM, etc.)';
COMMENT ON COLUMN  destinoenvio.intentos IS 'Número de intentos de geolocalizacion.';
-- ---------------------------------------------------------------------------------
-- ADJUNTOSOPORTE 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_adjuntosoporte_idadjuntosoporte;

CREATE TABLE adjuntosoporte (
    idadjuntosoporte INTEGER NOT NULL DEFAULT nextval('sq_adjuntosoporte_idadjuntosoporte'),
    idsoporte INTEGER,
    idseguimiento INTEGER,
    nombre VARCHAR(64) NOT NULL,
    ruta VARCHAR(128) NOT NULL,
    PRIMARY KEY (idadjuntosoporte)
);

CREATE INDEX ix_adjuntosoporte_idsoporte ON adjuntosoporte(idsoporte);
CREATE INDEX ix_adjuntosoporte_idseguimiento ON adjuntosoporte(idseguimiento);

COMMENT ON TABLE adjuntosoporte IS 'Ficheros adjuntos para los soportes y seguimientos.';
COMMENT ON COLUMN  adjuntosoporte.idadjuntosoporte IS 'Identificador único del adjunto.';
COMMENT ON COLUMN  adjuntosoporte.idsoporte IS '';
COMMENT ON COLUMN  adjuntosoporte.idseguimiento IS '';
COMMENT ON COLUMN  adjuntosoporte.nombre IS 'Nombre del archivo';
COMMENT ON COLUMN  adjuntosoporte.ruta IS 'Ruta completa del archivo.';
-- ---------------------------------------------------------------------------------
-- INTEGRACION 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_integracion_idintegracion;

CREATE TABLE integracion (
    idintegracion INTEGER NOT NULL DEFAULT nextval('sq_integracion_idintegracion'),
    idabonado INTEGER NOT NULL,
    finicio DATE,
    PRIMARY KEY (idintegracion)
);


COMMENT ON COLUMN  integracion.idintegracion IS 'Identificador unico de la integración de un abonado.';
COMMENT ON COLUMN  integracion.idabonado IS '';
COMMENT ON COLUMN  integracion.finicio IS 'Fecha de inicio de la integración
';
-- ---------------------------------------------------------------------------------
-- CECO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_ceco_idceco;

CREATE TABLE ceco (
    idceco INTEGER NOT NULL DEFAULT nextval('sq_ceco_idceco'),
    idabonado INTEGER NOT NULL,
    codigo VARCHAR(32) NOT NULL,
    descripcion VARCHAR(40),
    PRIMARY KEY (idceco)
);


COMMENT ON TABLE ceco IS 'Centros de coste de los abonados.';
COMMENT ON COLUMN  ceco.idceco IS 'Identificador unico del CECO.';
COMMENT ON COLUMN  ceco.idabonado IS '';
COMMENT ON COLUMN  ceco.codigo IS '';
COMMENT ON COLUMN  ceco.descripcion IS '';
-- ---------------------------------------------------------------------------------
-- CECOSINTEGRACION 
-- ---------------------------------------------------------------------------------
CREATE TABLE cecosintegracion (
    idceco INTEGER NOT NULL,
    idintegracion INTEGER NOT NULL,
    PRIMARY KEY (idceco, idintegracion)
);


COMMENT ON TABLE cecosintegracion IS 'Relacion de CECO del abonado para la integración especifica.';
COMMENT ON COLUMN  cecosintegracion.idceco IS '';
COMMENT ON COLUMN  cecosintegracion.idintegracion IS '';
-- ---------------------------------------------------------------------------------
-- SERVICIOSINTEGRACION 
-- ---------------------------------------------------------------------------------
CREATE TABLE serviciosintegracion (
    idservicio INTEGER NOT NULL,
    idintegracion INTEGER NOT NULL,
    PRIMARY KEY (idservicio, idintegracion)
);


COMMENT ON COLUMN  serviciosintegracion.idservicio IS '';
COMMENT ON COLUMN  serviciosintegracion.idintegracion IS '';
-- ---------------------------------------------------------------------------------
-- INTERFAZ 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_interfaz_idinterfaz;

CREATE TABLE interfaz (
    idinterfaz INTEGER NOT NULL DEFAULT nextval('sq_interfaz_idinterfaz'),
    idintegracion INTEGER NOT NULL,
    origen SMALLINT NOT NULL,
    destino VARCHAR(64) NOT NULL,
    PRIMARY KEY (idinterfaz)
);


COMMENT ON TABLE interfaz IS 'Descripcion de los archivos de importacion de las integraciones.';
COMMENT ON COLUMN  interfaz.idinterfaz IS '';
COMMENT ON COLUMN  interfaz.idintegracion IS '';
COMMENT ON COLUMN  interfaz.origen IS 'Número de columna del archivo de origen.';
COMMENT ON COLUMN  interfaz.destino IS 'Nombre del campo de destino.';
-- ---------------------------------------------------------------------------------
-- DISPOSITIVO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_dispositivo_iddispositivo;

CREATE TABLE dispositivo (
    iddispositivo INTEGER NOT NULL DEFAULT nextval('sq_dispositivo_iddispositivo'),
    uid VARCHAR(64),
    matricula VARCHAR(32),
    imei VARCHAR(15),
    marca VARCHAR(32),
    modelo VARCHAR(32),
    contrato VARCHAR(32),
    telefono VARCHAR(16),
    pin VARCHAR(4),
    PRIMARY KEY (iddispositivo)
);

CREATE UNIQUE INDEX ux_dispositivo_uid ON dispositivo(uid);

COMMENT ON TABLE dispositivo IS 'Terminales moviles.';
COMMENT ON COLUMN  dispositivo.iddispositivo IS 'Identificador unico del dispositivo.';
COMMENT ON COLUMN  dispositivo.uid IS 'Identificador asignado por aplicación en el propio dispositivo.';
COMMENT ON COLUMN  dispositivo.matricula IS '';
COMMENT ON COLUMN  dispositivo.imei IS '';
COMMENT ON COLUMN  dispositivo.marca IS '';
COMMENT ON COLUMN  dispositivo.modelo IS '';
COMMENT ON COLUMN  dispositivo.contrato IS 'Indica  si el dispositivo es alquilado o en propiedad.';
COMMENT ON COLUMN  dispositivo.telefono IS 'Número de teléfono.';
COMMENT ON COLUMN  dispositivo.pin IS 'PIN para el desbloqueo.';
-- ---------------------------------------------------------------------------------
-- DISPOSITIVOSFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_dispositivosfranquicia_idrelacion;

CREATE TABLE dispositivosfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_dispositivosfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    iddispositivo INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE dispositivosfranquicia IS 'Relacion de terminales moviles por franquicia.';
COMMENT ON COLUMN  dispositivosfranquicia.idrelacion IS '';
COMMENT ON COLUMN  dispositivosfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  dispositivosfranquicia.iddispositivo IS '';
COMMENT ON COLUMN  dispositivosfranquicia.finicio IS 'Fecha de inicio de la relacion del terminal movil y la franquicia.';
COMMENT ON COLUMN  dispositivosfranquicia.ffin IS 'Fecha de fin de la relación entre dispositivo movil y franquicia.';
-- ---------------------------------------------------------------------------------
-- REPARTIDOR 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_repartidor_idrepartidor;

CREATE TABLE repartidor (
    idrepartidor INTEGER NOT NULL DEFAULT nextval('sq_repartidor_idrepartidor'),
    idpersona INTEGER,
    nombre VARCHAR(64) NOT NULL,
    PRIMARY KEY (idrepartidor)
);


COMMENT ON COLUMN  repartidor.idrepartidor IS '';
COMMENT ON COLUMN  repartidor.idpersona IS '';
COMMENT ON COLUMN  repartidor.nombre IS 'Nombre o descripción del repartidor.';
-- ---------------------------------------------------------------------------------
-- DISPOSITIVOSREPARTIDOR 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_dispositivosrepartidor_idrelacion;

CREATE TABLE dispositivosrepartidor (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_dispositivosrepartidor_idrelacion'),
    idterminal INTEGER NOT NULL,
    idrepartidor INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idrelacion)
);


COMMENT ON COLUMN  dispositivosrepartidor.idrelacion IS '';
COMMENT ON COLUMN  dispositivosrepartidor.idterminal IS '';
COMMENT ON COLUMN  dispositivosrepartidor.idrepartidor IS '';
COMMENT ON COLUMN  dispositivosrepartidor.finicio IS '';
COMMENT ON COLUMN  dispositivosrepartidor.ffin IS '';
-- ---------------------------------------------------------------------------------
-- REPARTIDORESFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_repartidoresfranquicia_idrelacion;

CREATE TABLE repartidoresfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_repartidoresfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idrepartidor INTEGER NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idrelacion)
);


COMMENT ON COLUMN  repartidoresfranquicia.idrelacion IS '';
COMMENT ON COLUMN  repartidoresfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  repartidoresfranquicia.idrepartidor IS '';
COMMENT ON COLUMN  repartidoresfranquicia.codigo IS 'Codigo del repartidor.';
COMMENT ON COLUMN  repartidoresfranquicia.finicio IS '';
COMMENT ON COLUMN  repartidoresfranquicia.ffin IS '';
-- ---------------------------------------------------------------------------------
-- ORDENADOR 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_ordenador_idordenador;

CREATE TABLE ordenador (
    idordenador INTEGER NOT NULL DEFAULT nextval('sq_ordenador_idordenador'),
    ninventario VARCHAR(16),
    ubicacion VARCHAR(128),
    host VARCHAR(32),
    ip VARCHAR(15),
    anydesk VARCHAR(32),
    procesador VARCHAR(32),
    so VARCHAR(32),
    marca VARCHAR(32),
    modelo VARCHAR(32),
    PRIMARY KEY (idordenador)
);


COMMENT ON COLUMN  ordenador.idordenador IS 'Identificador unico del ordenador.';
COMMENT ON COLUMN  ordenador.ninventario IS 'Número de inventario.';
COMMENT ON COLUMN  ordenador.ubicacion IS 'Describe la localización del elemento en la oficina.';
COMMENT ON COLUMN  ordenador.host IS 'Nombre del host.';
COMMENT ON COLUMN  ordenador.ip IS 'IP Fija asignada al ordenador.';
COMMENT ON COLUMN  ordenador.anydesk IS 'Nombre o número asignado por anydesk a la instalación.';
COMMENT ON COLUMN  ordenador.procesador IS 'Caracteristicas del procesador.';
COMMENT ON COLUMN  ordenador.so IS 'Sistema operativo';
COMMENT ON COLUMN  ordenador.marca IS '';
COMMENT ON COLUMN  ordenador.modelo IS '';
-- ---------------------------------------------------------------------------------
-- ORDENADORESFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_ordenadoresfranquicia_idrelacion;

CREATE TABLE ordenadoresfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_ordenadoresfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idordenador INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    comentario TEXT,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE ordenadoresfranquicia IS 'Relacion de terminales moviles por franquicia.';
COMMENT ON COLUMN  ordenadoresfranquicia.idrelacion IS '';
COMMENT ON COLUMN  ordenadoresfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  ordenadoresfranquicia.idordenador IS '';
COMMENT ON COLUMN  ordenadoresfranquicia.finicio IS 'Fecha de inicio de la relacion del terminal movil y la franquicia.';
COMMENT ON COLUMN  ordenadoresfranquicia.ffin IS 'Fecha de fin de la relación entre dispositivo movil y franquicia.';
COMMENT ON COLUMN  ordenadoresfranquicia.comentario IS 'Texto explicativo sobre traslados, bajas, etc.';
-- ---------------------------------------------------------------------------------
-- TELEFONO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_telefono_idtelefono;

CREATE TABLE telefono (
    idtelefono INTEGER NOT NULL DEFAULT nextval('sq_telefono_idtelefono'),
    ninventario VARCHAR(16),
    ubicacion VARCHAR(128),
    extension VARCHAR(8),
    ip VARCHAR(15),
    marca VARCHAR(32),
    modelo VARCHAR(32),
    nserie VARCHAR(32),
    PRIMARY KEY (idtelefono)
);


COMMENT ON TABLE telefono IS 'Telefonos de sobremesa.';
COMMENT ON COLUMN  telefono.idtelefono IS 'Identificador unico del  telefono.';
COMMENT ON COLUMN  telefono.ninventario IS 'Número de inventario.';
COMMENT ON COLUMN  telefono.ubicacion IS 'Describe la localización del elemento en la oficina.';
COMMENT ON COLUMN  telefono.extension IS 'Número de extensión asignada al telefono.';
COMMENT ON COLUMN  telefono.ip IS 'IP Fija asignada al ordenador.';
COMMENT ON COLUMN  telefono.marca IS '';
COMMENT ON COLUMN  telefono.modelo IS '';
COMMENT ON COLUMN  telefono.nserie IS 'Número de serie.';
-- ---------------------------------------------------------------------------------
-- TELEFONOSFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_telefonosfranquicia_idrelacion;

CREATE TABLE telefonosfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_telefonosfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idtelefono INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    comentario TEXT,
    PRIMARY KEY (idrelacion)
);


COMMENT ON COLUMN  telefonosfranquicia.idrelacion IS '';
COMMENT ON COLUMN  telefonosfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  telefonosfranquicia.idtelefono IS '';
COMMENT ON COLUMN  telefonosfranquicia.finicio IS 'Fecha de inicio de la relacion del terminal movil y la franquicia.';
COMMENT ON COLUMN  telefonosfranquicia.ffin IS 'Fecha de fin de la relación entre dispositivo movil y franquicia.';
COMMENT ON COLUMN  telefonosfranquicia.comentario IS 'Texto explicativo sobre traslados, bajas, etc.';
-- ---------------------------------------------------------------------------------
-- HEADSET 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_headset_idheadset;

CREATE TABLE headset (
    idheadset INTEGER NOT NULL DEFAULT nextval('sq_headset_idheadset'),
    descripcion VARCHAR(64),
    ninventario VARCHAR(16),
    marca VARCHAR(32),
    modelo VARCHAR(32),
    PRIMARY KEY (idheadset)
);


COMMENT ON TABLE headset IS 'Manos libres - auriculares para telefono.';
COMMENT ON COLUMN  headset.idheadset IS '';
COMMENT ON COLUMN  headset.descripcion IS '';
COMMENT ON COLUMN  headset.ninventario IS 'Número de inventario.';
COMMENT ON COLUMN  headset.marca IS '';
COMMENT ON COLUMN  headset.modelo IS '';
-- ---------------------------------------------------------------------------------
-- HEADSETSFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_headsetsfranquicia_idrelacion;

CREATE TABLE headsetsfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_headsetsfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idheadset INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    comentario TEXT,
    PRIMARY KEY (idrelacion)
);


COMMENT ON COLUMN  headsetsfranquicia.idrelacion IS '';
COMMENT ON COLUMN  headsetsfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  headsetsfranquicia.idheadset IS '';
COMMENT ON COLUMN  headsetsfranquicia.finicio IS 'Fecha de inicio de la relacion del terminal movil y la franquicia.';
COMMENT ON COLUMN  headsetsfranquicia.ffin IS 'Fecha de fin de la relación entre dispositivo movil y franquicia.';
COMMENT ON COLUMN  headsetsfranquicia.comentario IS 'Texto explicativo sobre traslados, bajas, etc.';
-- ---------------------------------------------------------------------------------
-- IMPRESORA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_impresora_idimpresora;

CREATE TABLE impresora (
    idimpresora INTEGER NOT NULL DEFAULT nextval('sq_impresora_idimpresora'),
    ninventario VARCHAR(16),
    ubicacion VARCHAR(128),
    renting VARCHAR(1),
    mantenimiento VARCHAR(64),
    ip VARCHAR(15),
    marca VARCHAR(32),
    modelo VARCHAR(32),
    PRIMARY KEY (idimpresora)
);


COMMENT ON COLUMN  impresora.idimpresora IS '';
COMMENT ON COLUMN  impresora.ninventario IS 'Número de inventario.';
COMMENT ON COLUMN  impresora.ubicacion IS 'Describe la localización del elemento en la oficina.';
COMMENT ON COLUMN  impresora.renting IS 'Indica si la impresora es en propiedad o renting: P->Propiedad, R->Renting.';
COMMENT ON COLUMN  impresora.mantenimiento IS '';
COMMENT ON COLUMN  impresora.ip IS 'IP Fija asignada al ordenador.';
COMMENT ON COLUMN  impresora.marca IS '';
COMMENT ON COLUMN  impresora.modelo IS '';
-- ---------------------------------------------------------------------------------
-- IMPRESORASFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_impresorasfranquicia_idrelacion;

CREATE TABLE impresorasfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_impresorasfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idimpresora INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    comentario TEXT,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE impresorasfranquicia IS 'Relación de impresoras asociadas a la franquicia.';
COMMENT ON COLUMN  impresorasfranquicia.idrelacion IS '';
COMMENT ON COLUMN  impresorasfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  impresorasfranquicia.idimpresora IS '';
COMMENT ON COLUMN  impresorasfranquicia.finicio IS 'Fecha de inicio de la relacion del terminal movil y la franquicia.';
COMMENT ON COLUMN  impresorasfranquicia.ffin IS 'Fecha de fin de la relación entre dispositivo movil y franquicia.';
COMMENT ON COLUMN  impresorasfranquicia.comentario IS 'Texto explicativo sobre traslados, bajas, etc.';
-- ---------------------------------------------------------------------------------
-- ROUTER 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_router_idrouter;

CREATE TABLE router (
    idrouter INTEGER NOT NULL DEFAULT nextval('sq_router_idrouter'),
    proveedor VARCHAR(48),
    ip VARCHAR(15),
    marca VARCHAR(32),
    modelo VARCHAR(32),
    wifissid VARCHAR(64),
    wifipassword VARCHAR(64),
    usuario VARCHAR(48),
    clave VARCHAR(48),
    PRIMARY KEY (idrouter)
);


COMMENT ON COLUMN  router.idrouter IS '';
COMMENT ON COLUMN  router.proveedor IS 'Proveedor del servicio de fibra.';
COMMENT ON COLUMN  router.ip IS 'IP Fija asignada al ordenador.';
COMMENT ON COLUMN  router.marca IS '';
COMMENT ON COLUMN  router.modelo IS '';
COMMENT ON COLUMN  router.wifissid IS 'SSID WiFi.';
COMMENT ON COLUMN  router.wifipassword IS 'Contraseña de acceso a la WiFi';
COMMENT ON COLUMN  router.usuario IS 'Usuario para la administración del router';
COMMENT ON COLUMN  router.clave IS 'Clave de acceso para el usuario de administración del router.';
-- ---------------------------------------------------------------------------------
-- ROUTERSFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_routersfranquicia_idrelacion;

CREATE TABLE routersfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_routersfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idrouter INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    comentario TEXT,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE routersfranquicia IS 'Relación de routers de las franquicias.';
COMMENT ON COLUMN  routersfranquicia.idrelacion IS '';
COMMENT ON COLUMN  routersfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  routersfranquicia.idrouter IS '';
COMMENT ON COLUMN  routersfranquicia.finicio IS 'Fecha de inicio de la relacion del terminal movil y la franquicia.';
COMMENT ON COLUMN  routersfranquicia.ffin IS 'Fecha de fin de la relación entre dispositivo movil y franquicia.';
COMMENT ON COLUMN  routersfranquicia.comentario IS 'Texto explicativo sobre traslados, bajas, etc.';
-- ---------------------------------------------------------------------------------
-- CREDENCIALES 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_credenciales_idcredenciales;

CREATE TABLE credenciales (
    idcredenciales INTEGER NOT NULL DEFAULT nextval('sq_credenciales_idcredenciales'),
    idfranquicia INTEGER NOT NULL,
    sistema VARCHAR(32) NOT NULL,
    nombre VARCHAR(64),
    apellidos VARCHAR(64),
    usuario VARCHAR(64) NOT NULL,
    clave VARCHAR(64) NOT NULL,
    PRIMARY KEY (idcredenciales)
);


COMMENT ON COLUMN  credenciales.idcredenciales IS '';
COMMENT ON COLUMN  credenciales.idfranquicia IS '';
COMMENT ON COLUMN  credenciales.sistema IS 'Código del sistema al que se accede: G3, APc, WILSON, etc.';
COMMENT ON COLUMN  credenciales.nombre IS 'Nombre de la persona cuando se trata de una persona fisica.';
COMMENT ON COLUMN  credenciales.apellidos IS 'Apellidos de la persona cuando se trata de una persona fisica.';
COMMENT ON COLUMN  credenciales.usuario IS '';
COMMENT ON COLUMN  credenciales.clave IS '';
-- ---------------------------------------------------------------------------------
-- ZONAREPARTO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_zonareparto_idzonareparto;

CREATE TABLE zonareparto (
    idzonareparto INTEGER NOT NULL DEFAULT nextval('sq_zonareparto_idzonareparto'),
    idgeografia INTEGER NOT NULL,
    nombre VARCHAR(32) NOT NULL,
    colorborde VARCHAR(16),
    colorfondo VARCHAR(16),
    PRIMARY KEY (idzonareparto)
);


COMMENT ON TABLE zonareparto IS 'Zonas de reparto de las franquicias.';
COMMENT ON COLUMN  zonareparto.idzonareparto IS '';
COMMENT ON COLUMN  zonareparto.idgeografia IS '';
COMMENT ON COLUMN  zonareparto.nombre IS '';
COMMENT ON COLUMN  zonareparto.colorborde IS '';
COMMENT ON COLUMN  zonareparto.colorfondo IS '';
-- ---------------------------------------------------------------------------------
-- VERTICE 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_vertice_idvertice;

CREATE TABLE vertice (
    idvertice INTEGER NOT NULL DEFAULT nextval('sq_vertice_idvertice'),
    idzonareparto INTEGER NOT NULL,
    orden SMALLINT NOT NULL,
    latitud DECIMAL(18,15) NOT NULL,
    longitud DECIMAL(18,15) NOT NULL,
    PRIMARY KEY (idvertice)
);


COMMENT ON TABLE vertice IS 'Vertices de los poligonos que conforman las zonas de reparto.';
COMMENT ON COLUMN  vertice.idvertice IS '';
COMMENT ON COLUMN  vertice.idzonareparto IS '';
COMMENT ON COLUMN  vertice.orden IS '';
COMMENT ON COLUMN  vertice.latitud IS '';
COMMENT ON COLUMN  vertice.longitud IS '';
-- ---------------------------------------------------------------------------------
-- PROSPECTO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_prospecto_idprospecto;

CREATE TABLE prospecto (
    idprospecto INTEGER NOT NULL DEFAULT nextval('sq_prospecto_idprospecto'),
    idcomercial INTEGER,
    idorigen INTEGER NOT NULL,
    idsector INTEGER,
    idestado INTEGER NOT NULL,
    idtipovia INTEGER,
    fentrada TIMESTAMP NOT NULL,
    fac DATE,
    zona VARCHAR(3),
    prioridad VARCHAR(5),
    nif VARCHAR(9),
    razonsocial VARCHAR(64) NOT NULL,
    descripcion VARCHAR(64),
    pcontacto VARCHAR(64),
    tcontacto VARCHAR(64),
    ccontacto VARCHAR(128),
    gps VARCHAR(20),
    via VARCHAR(64),
    numerovia VARCHAR(4),
    restovia VARCHAR(64),
    cp VARCHAR(5),
    localidad VARCHAR(64),
    tenpeso SMALLINT,
    tendimensiones VARCHAR(32),
    tencantidad SMALLINT,
    urbano SMALLINT,
    nacional SMALLINT,
    islas SMALLINT,
    seguro VARCHAR(1),
    valormedio DECIMAL(8,2),
    preciomedio DECIMAL(8,2),
    facturacion DECIMAL(9,2),
    proveedoren VARCHAR(64),
    teipeso SMALLINT,
    teidimensiones VARCHAR(32),
    teicantidad SMALLINT,
    documentos VARCHAR(1),
    cajas VARCHAR(1),
    proveedorei VARCHAR(64),
    etiquetas VARCHAR(1),
    impresora VARCHAR(1),
    tipoimpresora VARCHAR(48),
    plataforma VARCHAR(32),
    ce VARCHAR(1),
    burofax VARCHAR(1),
    email VARCHAR(1),
    sms VARCHAR(1),
    vmburofax INTEGER,
    vmemail INTEGER,
    vmsms INTEGER,
    proveedorce VARCHAR(64),
    PRIMARY KEY (idprospecto)
);

CREATE INDEX ix_prospecto_idcomercial ON prospecto(idcomercial);
CREATE INDEX ix_prospecto_idorigen ON prospecto(idorigen);
CREATE INDEX ix_prospecto_idsector ON prospecto(idsector);
CREATE INDEX ix_prospecto_idestado ON prospecto(idestado);
CREATE INDEX ix_prospecto_fentrada ON prospecto(fentrada);
CREATE INDEX ix_prospecto_razonsocial ON prospecto(razonsocial);

COMMENT ON TABLE prospecto IS 'Clientes potenciales.';
COMMENT ON COLUMN  prospecto.idprospecto IS 'Identificador unico del cliente potencial.';
COMMENT ON COLUMN  prospecto.idcomercial IS 'Identificador unico del comercial.';
COMMENT ON COLUMN  prospecto.idorigen IS '';
COMMENT ON COLUMN  prospecto.idsector IS 'Identificador unico del sector de actividad.';
COMMENT ON COLUMN  prospecto.idestado IS '';
COMMENT ON COLUMN  prospecto.idtipovia IS 'Identificador del tipo de via.';
COMMENT ON COLUMN  prospecto.fentrada IS 'Fecha de alta en la tabla de clientes potenciales.';
COMMENT ON COLUMN  prospecto.fac IS 'Fecha de la ultima acción comercial.';
COMMENT ON COLUMN  prospecto.zona IS 'Zona';
COMMENT ON COLUMN  prospecto.prioridad IS 'Prioridad';
COMMENT ON COLUMN  prospecto.nif IS 'Numero de identificacion fiscal.';
COMMENT ON COLUMN  prospecto.razonsocial IS 'Razon social - Nombre de la empresa.';
COMMENT ON COLUMN  prospecto.descripcion IS 'Otra forma de identificar la empresa que no coincide con la razon social.';
COMMENT ON COLUMN  prospecto.pcontacto IS 'Persona(s) de contacto.';
COMMENT ON COLUMN  prospecto.tcontacto IS 'Telefono de contacto.';
COMMENT ON COLUMN  prospecto.ccontacto IS 'Correo electronico del contacto.';
COMMENT ON COLUMN  prospecto.gps IS 'Geolocalizacion.';
COMMENT ON COLUMN  prospecto.via IS '';
COMMENT ON COLUMN  prospecto.numerovia IS '';
COMMENT ON COLUMN  prospecto.restovia IS 'Resto descriptivo de la via. Por ejemplo, Piso, Bloque, Nave, etc';
COMMENT ON COLUMN  prospecto.cp IS 'Codigo postal.';
COMMENT ON COLUMN  prospecto.localidad IS 'Localidad.';
COMMENT ON COLUMN  prospecto.tenpeso IS 'TEN - Tipolǵia Envios Nacionales: Peso';
COMMENT ON COLUMN  prospecto.tendimensiones IS 'TEN - Tipolǵia Envios Nacionales: Dimensiones';
COMMENT ON COLUMN  prospecto.tencantidad IS 'TEN - Tipolǵia Envios Nacionales: Cantidad mensusal';
COMMENT ON COLUMN  prospecto.urbano IS 'Urbano. Número estimado de envíos.';
COMMENT ON COLUMN  prospecto.nacional IS 'Nacional. Número estimado de envíos.';
COMMENT ON COLUMN  prospecto.islas IS 'Islas. Número estimado de envíos.';
COMMENT ON COLUMN  prospecto.seguro IS 'Envíos asegurados S->Si, N->No';
COMMENT ON COLUMN  prospecto.valormedio IS 'Valor medio de los envíos. XXXXXX.XX';
COMMENT ON COLUMN  prospecto.preciomedio IS 'Precio medio de los envíos. XXXXXX.XX';
COMMENT ON COLUMN  prospecto.facturacion IS '';
COMMENT ON COLUMN  prospecto.proveedoren IS 'Proveedor actual para envíos nacionales';
COMMENT ON COLUMN  prospecto.teipeso IS 'TEI - Tipolǵia Envios Interacionales: Peso';
COMMENT ON COLUMN  prospecto.teidimensiones IS 'TEI - Tipolǵia Envios Internacionales: Dimensiones';
COMMENT ON COLUMN  prospecto.teicantidad IS 'TEI - Tipolǵia Envios Interacionales: Cantidad mensusal';
COMMENT ON COLUMN  prospecto.documentos IS 'TEI - Tipolǵia Envios Interacionales: Documentos S->Si N->No';
COMMENT ON COLUMN  prospecto.cajas IS 'TEI - Tipolǵia Envios Interacionales: Cajas S->Si, N->No';
COMMENT ON COLUMN  prospecto.proveedorei IS 'Proveedor actual para envíos internacionales';
COMMENT ON COLUMN  prospecto.etiquetas IS 'Imprime etiquetas. S->Si, N->No';
COMMENT ON COLUMN  prospecto.impresora IS 'Impresora propia. S->Si, N->No';
COMMENT ON COLUMN  prospecto.tipoimpresora IS 'Tipo de impresora';
COMMENT ON COLUMN  prospecto.plataforma IS 'Nombre de la plataforma e-commerce (Puede ser NO)';
COMMENT ON COLUMN  prospecto.ce IS 'Comunicaciones electrónicas. S->Si, N->No';
COMMENT ON COLUMN  prospecto.burofax IS 'Comunicaciones electrónicas. Burofax: S->Si, N->No';
COMMENT ON COLUMN  prospecto.email IS 'Comunicaciones electrónicas. eMail Certificado: S->Si, N->No';
COMMENT ON COLUMN  prospecto.sms IS 'Comunicaciones electrónicas. SMS Certificado: S->Si, N->No';
COMMENT ON COLUMN  prospecto.vmburofax IS 'Comunicaciones electrónicas. Volumen medio de BUROFAX.';
COMMENT ON COLUMN  prospecto.vmemail IS 'Comunicaciones electrónicas. Volumen medio de EMAIL.';
COMMENT ON COLUMN  prospecto.vmsms IS 'Comunicaciones electrónicas. Volumen medio de SMS.';
COMMENT ON COLUMN  prospecto.proveedorce IS 'Proveedor actual para comunicaciones electrónicas';
-- ---------------------------------------------------------------------------------
-- COMERCIAL 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_comercial_idcomercial;

CREATE TABLE comercial (
    idcomercial INTEGER NOT NULL DEFAULT nextval('sq_comercial_idcomercial'),
    idpersona INTEGER NOT NULL,
    PRIMARY KEY (idcomercial)
);

CREATE INDEX ix_comercial_idcomercial ON comercial(idcomercial);
CREATE INDEX ix_comercial_idpersona ON comercial(idpersona);

COMMENT ON COLUMN  comercial.idcomercial IS 'Identificador unico del comercial.';
COMMENT ON COLUMN  comercial.idpersona IS '';
-- ---------------------------------------------------------------------------------
-- ACCION 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_accion_idaccion;

CREATE TABLE accion (
    idaccion INTEGER NOT NULL DEFAULT nextval('sq_accion_idaccion'),
    idcomercial INTEGER NOT NULL,
    idtipo INTEGER NOT NULL,
    idmedio INTEGER,
    idprospecto INTEGER,
    idabonado INTEGER,
    idestado INTEGER,
    idoferta INTEGER,
    semana SMALLINT DEFAULT '0',
    faplazamiento DATE,
    fplanificacion TIMESTAMP,
    frealizacion TIMESTAMP,
    titulo VARCHAR(128),
    observaciones TEXT,
    color VARCHAR(8),
    PRIMARY KEY (idaccion)
);

CREATE INDEX ix_accion_fplanificacion ON accion(fplanificacion);
CREATE INDEX ix_accion_titulo ON accion(titulo);

COMMENT ON TABLE accion IS 'Acciones asociadas a los clientes potenciales y abonados.';
COMMENT ON COLUMN  accion.idaccion IS 'Identificador único de la acción comercial.';
COMMENT ON COLUMN  accion.idcomercial IS 'Identificador del comercial';
COMMENT ON COLUMN  accion.idtipo IS 'Tipo de evento.';
COMMENT ON COLUMN  accion.idmedio IS 'Medio de la acción comercial: llamada, reunión, etc.';
COMMENT ON COLUMN  accion.idprospecto IS 'Identificador del cliente potencial con el que está asociado el evento.';
COMMENT ON COLUMN  accion.idabonado IS '';
COMMENT ON COLUMN  accion.idestado IS 'Identificador del código de estado.';
COMMENT ON COLUMN  accion.idoferta IS 'Identificador del tipo de oferta.';
COMMENT ON COLUMN  accion.semana IS 'Semana del año (ISO).';
COMMENT ON COLUMN  accion.faplazamiento IS 'Fecha del aplazamiento si el estado es APLAZADA.';
COMMENT ON COLUMN  accion.fplanificacion IS 'Fecha de planificacion del evento.';
COMMENT ON COLUMN  accion.frealizacion IS 'Fecha en que se completa el evento.';
COMMENT ON COLUMN  accion.titulo IS 'Descripcion breve del evento.';
COMMENT ON COLUMN  accion.observaciones IS 'Texto descriptivo asociado al evento.';
COMMENT ON COLUMN  accion.color IS 'Color de fondo.';
-- ---------------------------------------------------------------------------------
-- TAREA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_tarea_idtarea;

CREATE TABLE tarea (
    idtarea INTEGER NOT NULL DEFAULT nextval('sq_tarea_idtarea'),
    idcomercial INTEGER NOT NULL,
    idorigen INTEGER,
    categoria VARCHAR(8),
    titulo VARCHAR(64) NOT NULL,
    descripcion TEXT,
    fitarea TIMESTAMP,
    fftarea TIMESTAMP,
    progreso SMALLINT NOT NULL,
    PRIMARY KEY (idtarea)
);

CREATE INDEX ix_tarea_idcomercial ON tarea(idcomercial);
CREATE INDEX ix_tarea_categoria ON tarea(categoria);
CREATE INDEX ix_tarea_fitarea ON tarea(fitarea);

COMMENT ON COLUMN  tarea.idtarea IS '';
COMMENT ON COLUMN  tarea.idcomercial IS '';
COMMENT ON COLUMN  tarea.idorigen IS 'Identificador del usuario que asigna la tarea.';
COMMENT ON COLUMN  tarea.categoria IS '';
COMMENT ON COLUMN  tarea.titulo IS 'Titulo de la tarea.';
COMMENT ON COLUMN  tarea.descripcion IS '';
COMMENT ON COLUMN  tarea.fitarea IS 'Fecha y hora de inicio de la tarea.';
COMMENT ON COLUMN  tarea.fftarea IS 'Fecha y hora de finaliación de la tarea.';
COMMENT ON COLUMN  tarea.progreso IS 'Grado de ejecución de la tarea. Se expresa como un porcentaje . La tarea se da por finaliada con el valor 100.';
-- ---------------------------------------------------------------------------------
-- OBJETIVO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_objetivo_idobjetivo;

CREATE TABLE objetivo (
    idobjetivo INTEGER NOT NULL DEFAULT nextval('sq_objetivo_idobjetivo'),
    idcategoria INTEGER NOT NULL,
    idcomercial INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE NOT NULL,
    laborables SMALLINT,
    objetivo DECIMAL(8,2) NOT NULL,
    cantidadreal DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (idobjetivo)
);


COMMENT ON COLUMN  objetivo.idobjetivo IS 'Objetivos comerciales.
';
COMMENT ON COLUMN  objetivo.idcategoria IS 'Identificador de la cetegoría del objetivo. Visitas, Ofertas, Altas, etc.';
COMMENT ON COLUMN  objetivo.idcomercial IS '';
COMMENT ON COLUMN  objetivo.finicio IS 'Fecha de inicio del periodo.';
COMMENT ON COLUMN  objetivo.ffin IS 'Fecha de fin del periodo.';
COMMENT ON COLUMN  objetivo.laborables IS 'Número de días laborables del periodo.';
COMMENT ON COLUMN  objetivo.objetivo IS 'Cantidad que constituye el objetivo.';
COMMENT ON COLUMN  objetivo.cantidadreal IS 'Cantidad que constituye la cifra real.';
-- ---------------------------------------------------------------------------------
-- JORNADA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_jornada_idjornada;

CREATE TABLE jornada (
    idjornada INTEGER NOT NULL DEFAULT nextval('sq_jornada_idjornada'),
    idcomercial INTEGER NOT NULL,
    horas SMALLINT NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE NOT NULL,
    PRIMARY KEY (idjornada)
);


COMMENT ON COLUMN  jornada.idjornada IS '';
COMMENT ON COLUMN  jornada.idcomercial IS '';
COMMENT ON COLUMN  jornada.horas IS 'Número de horas de la jornada
';
COMMENT ON COLUMN  jornada.finicio IS '';
COMMENT ON COLUMN  jornada.ffin IS '';
-- ---------------------------------------------------------------------------------
-- GOAL 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_goal_idgoal;

CREATE TABLE goal (
    idgoal INTEGER NOT NULL DEFAULT nextval('sq_goal_idgoal'),
    idcategoria INTEGER NOT NULL,
    idcomercial INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE NOT NULL,
    laborables SMALLINT,
    objetivo DECIMAL(8,2) NOT NULL,
    cantidadreal DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (idgoal)
);


COMMENT ON TABLE goal IS 'Replica de la tabla OBJETIVO para probar distribuciones de objetivos.';
COMMENT ON COLUMN  goal.idgoal IS 'Objetivos comerciales.
';
COMMENT ON COLUMN  goal.idcategoria IS 'Identificador de la cetegoría del objetivo. Visitas, Ofertas, Altas, etc.';
COMMENT ON COLUMN  goal.idcomercial IS '';
COMMENT ON COLUMN  goal.finicio IS 'Fecha de inicio del periodo.';
COMMENT ON COLUMN  goal.ffin IS 'Fecha de fin del periodo.';
COMMENT ON COLUMN  goal.laborables IS 'Número de días laborables del periodo.';
COMMENT ON COLUMN  goal.objetivo IS 'Cantidad que constituye el objetivo.';
COMMENT ON COLUMN  goal.cantidadreal IS 'Cantidad que constituye la cifra real.';
-- ---------------------------------------------------------------------------------
-- ABONADOSCOMERCIAL 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_abonadoscomercial_idrelacion;

CREATE TABLE abonadoscomercial (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_abonadoscomercial_idrelacion'),
    idcomercial INTEGER NOT NULL,
    idabonado INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE abonadoscomercial IS 'Relación entre abonados y comerciales por periodo.';
COMMENT ON COLUMN  abonadoscomercial.idrelacion IS 'Identificador único de la relación.';
COMMENT ON COLUMN  abonadoscomercial.idcomercial IS '';
COMMENT ON COLUMN  abonadoscomercial.idabonado IS '';
COMMENT ON COLUMN  abonadoscomercial.finicio IS 'Fecha de inicio del periodo de la relación.';
COMMENT ON COLUMN  abonadoscomercial.ffin IS 'Fecha de fin del periodo de la relación. Si el valor es NULL, la relación continua.';
-- ---------------------------------------------------------------------------------
-- COMERCIALESFRANQUICIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_comercialesfranquicia_idrelacion;

CREATE TABLE comercialesfranquicia (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_comercialesfranquicia_idrelacion'),
    idfranquicia INTEGER NOT NULL,
    idcomercial INTEGER NOT NULL,
    finicio DATE NOT NULL,
    ffin DATE,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE comercialesfranquicia IS 'Relacion entre franquicias y comerciales por periodo.';
COMMENT ON COLUMN  comercialesfranquicia.idrelacion IS 'Identificador único de la relación.';
COMMENT ON COLUMN  comercialesfranquicia.idfranquicia IS '';
COMMENT ON COLUMN  comercialesfranquicia.idcomercial IS '';
COMMENT ON COLUMN  comercialesfranquicia.finicio IS 'Fecha de inicio del periodo de la relación';
COMMENT ON COLUMN  comercialesfranquicia.ffin IS 'Fecha de fin del periodo de la relación.';
-- ---------------------------------------------------------------------------------
-- EVENTO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_evento_idevento;

CREATE TABLE evento (
    idevento INTEGER NOT NULL DEFAULT nextval('sq_evento_idevento'),
    idpersona INTEGER NOT NULL,
    titulo VARCHAR(64) NOT NULL,
    finicio TIMESTAMP NOT NULL,
    ffin TIMESTAMP NOT NULL,
    diacompleto VARCHAR(1),
    descripcion TEXT,
    lugar VARCHAR(32),
    color VARCHAR(8),
    colortexto VARCHAR(8),
    colorborde VARCHAR(8),
    tiporepeticion VARCHAR(1) NOT NULL,
    exclusiones VARCHAR(128),
    ignorar VARCHAR(128),
    fcreacion TIMESTAMP NOT NULL,
    organizador VARCHAR(64),
    corganizador VARCHAR(128),
    ffinrepeticion DATE,
    PRIMARY KEY (idevento)
);


COMMENT ON COLUMN  evento.idevento IS 'Identificador único del evento.';
COMMENT ON COLUMN  evento.idpersona IS 'Identificador de la persona propietaria del evento.';
COMMENT ON COLUMN  evento.titulo IS 'Título del evento';
COMMENT ON COLUMN  evento.finicio IS 'Fecha de inicio del evento.';
COMMENT ON COLUMN  evento.ffin IS 'Fecha de finalización del evento.';
COMMENT ON COLUMN  evento.diacompleto IS 'Indica si el evento ocupa el día completo.';
COMMENT ON COLUMN  evento.descripcion IS 'Descripción del evento.';
COMMENT ON COLUMN  evento.lugar IS 'Lugar donde se lleva a cabo el evento.';
COMMENT ON COLUMN  evento.color IS 'Color del evento.';
COMMENT ON COLUMN  evento.colortexto IS 'Color del texto.';
COMMENT ON COLUMN  evento.colorborde IS 'Color del borde.';
COMMENT ON COLUMN  evento.tiporepeticion IS 'Indica la frecuencia de repetición: 0->Nunca, 1->Diaria, 2->Semanal, 3->Mensual, 4->Anual';
COMMENT ON COLUMN  evento.exclusiones IS 'Lista de dias a excluir en las repeticiones separada por punto y coma.';
COMMENT ON COLUMN  evento.ignorar IS 'Lista de dias a ignorar en las repeticiones separada por punto y coma.';
COMMENT ON COLUMN  evento.fcreacion IS 'Fecha de creación del evento.';
COMMENT ON COLUMN  evento.organizador IS 'Nombre del organizador del evento.';
COMMENT ON COLUMN  evento.corganizador IS 'Correo del organizador.';
COMMENT ON COLUMN  evento.ffinrepeticion IS 'Fecha de fin de la repetición.';
-- ---------------------------------------------------------------------------------
-- CLASIFICACION 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_clasificacion_idclasificacion;

CREATE TABLE clasificacion (
    idclasificacion INTEGER NOT NULL DEFAULT nextval('sq_clasificacion_idclasificacion'),
    iddispositivo INTEGER,
    idzonareparto INTEGER,
    idenvio INTEGER,
    momento TIMESTAMP NOT NULL,
    lectura TEXT,
    accion VARCHAR(3) NOT NULL,
    latitud DECIMAL(18,15),
    longitud DECIMAL(18,15),
    PRIMARY KEY (idclasificacion)
);

CREATE INDEX ix_clasificacion_idenvio ON clasificacion(idenvio);
CREATE INDEX ix_clasificacion_idzonareparto ON clasificacion(idzonareparto);

COMMENT ON TABLE clasificacion IS 'Tabla para la separación de envíos por zona de reparto.';
COMMENT ON COLUMN  clasificacion.idclasificacion IS '';
COMMENT ON COLUMN  clasificacion.iddispositivo IS '';
COMMENT ON COLUMN  clasificacion.idzonareparto IS '';
COMMENT ON COLUMN  clasificacion.idenvio IS '';
COMMENT ON COLUMN  clasificacion.momento IS '';
COMMENT ON COLUMN  clasificacion.lectura IS 'Código leido por el dispositivo.';
COMMENT ON COLUMN  clasificacion.accion IS '';
COMMENT ON COLUMN  clasificacion.latitud IS '';
COMMENT ON COLUMN  clasificacion.longitud IS '';
-- ---------------------------------------------------------------------------------
-- SERVIDOR 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_servidor_idservidor;

CREATE TABLE servidor (
    idservidor INTEGER NOT NULL DEFAULT nextval('sq_servidor_idservidor'),
    nombre VARCHAR(32),
    ubicacion VARCHAR(64),
    ippublica VARCHAR(15),
    ipprivada VARCHAR(32),
    factualizacion TIMESTAMP,
    PRIMARY KEY (idservidor)
);


COMMENT ON COLUMN  servidor.idservidor IS '';
COMMENT ON COLUMN  servidor.nombre IS 'Nombre del servidor.';
COMMENT ON COLUMN  servidor.ubicacion IS 'Ubicación física del servidor.';
COMMENT ON COLUMN  servidor.ippublica IS 'Direccion publica.';
COMMENT ON COLUMN  servidor.ipprivada IS 'Dirección IP privada.';
COMMENT ON COLUMN  servidor.factualizacion IS 'Fecha de la ultima actualización del la IP publica.';
-- ---------------------------------------------------------------------------------
-- ESTADOENVIO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_estadoenvio_idestadoenvio;

CREATE TABLE estadoenvio (
    idestadoenvio INTEGER NOT NULL DEFAULT nextval('sq_estadoenvio_idestadoenvio'),
    idenvio INTEGER NOT NULL,
    idestado INTEGER NOT NULL,
    momento TIMESTAMP NOT NULL,
    fhestado TIMESTAMP NOT NULL,
    PRIMARY KEY (idestadoenvio)
);

CREATE INDEX ix_estadoenvio_idenvio_momento ON estadoenvio(idenvio, momento);

COMMENT ON TABLE estadoenvio IS 'Trazabilidad de los estados de los envíos.';
COMMENT ON COLUMN  estadoenvio.idestadoenvio IS '';
COMMENT ON COLUMN  estadoenvio.idenvio IS '';
COMMENT ON COLUMN  estadoenvio.idestado IS 'Identificador del estado';
COMMENT ON COLUMN  estadoenvio.momento IS '';
COMMENT ON COLUMN  estadoenvio.fhestado IS 'Fecha y hora de actualizacion del estado en CENTRAL.';
-- ---------------------------------------------------------------------------------
-- PROCESO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_proceso_idproceso;

CREATE TABLE proceso (
    idproceso INTEGER NOT NULL DEFAULT nextval('sq_proceso_idproceso'),
    idmodulo INTEGER NOT NULL,
    idservidor INTEGER NOT NULL,
    idresultado INTEGER NOT NULL,
    inicio TIMESTAMP NOT NULL,
    fin TIMESTAMP,
    observaciones TEXT,
    PRIMARY KEY (idproceso)
);

CREATE INDEX ix_proceso_inicio ON proceso(inicio);

COMMENT ON COLUMN  proceso.idproceso IS '';
COMMENT ON COLUMN  proceso.idmodulo IS '';
COMMENT ON COLUMN  proceso.idservidor IS '';
COMMENT ON COLUMN  proceso.idresultado IS '';
COMMENT ON COLUMN  proceso.inicio IS 'Momento de inicio de ejecución del proceso.';
COMMENT ON COLUMN  proceso.fin IS 'Momento de finalización de la ejecución del proceso.';
COMMENT ON COLUMN  proceso.observaciones IS '';
-- ---------------------------------------------------------------------------------
-- RESULTADOPROCESO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_resultadoproceso_idresultado;

CREATE TABLE resultadoproceso (
    idresultado INTEGER NOT NULL DEFAULT nextval('sq_resultadoproceso_idresultado'),
    idproceso INTEGER NOT NULL,
    clave TEXT NOT NULL,
    valor TEXT NOT NULL,
    PRIMARY KEY (idresultado)
);


COMMENT ON COLUMN  resultadoproceso.idresultado IS '';
COMMENT ON COLUMN  resultadoproceso.idproceso IS '';
COMMENT ON COLUMN  resultadoproceso.clave IS '';
COMMENT ON COLUMN  resultadoproceso.valor IS '';
-- ---------------------------------------------------------------------------------
-- DIRECCIONUNICA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_direccionunica_iddireccionunica;

CREATE TABLE direccionunica (
    iddireccionunica INTEGER NOT NULL DEFAULT nextval('sq_direccionunica_iddireccionunica'),
    idtipovia INTEGER,
    via VARCHAR(64),
    numerovia VARCHAR(16),
    restovia VARCHAR(64),
    cp VARCHAR(8),
    localidad VARCHAR(64),
    provincia VARCHAR(48),
    pais VARCHAR(48),
    latitud DECIMAL(18,15),
    longitud DECIMAL(18,15),
    origengis VARCHAR(32),
    intentos SMALLINT NOT NULL,
    PRIMARY KEY (iddireccionunica)
);

CREATE INDEX ix_direccionunica_cp ON direccionunica(cp);
CREATE UNIQUE INDEX ux_direccionunica_todos ON direccionunica(idtipovia,via,numerovia,restovia,cp,localidad,provincia,pais);

COMMENT ON TABLE direccionunica IS 'Direcciones unicas de los envios .';
COMMENT ON COLUMN  direccionunica.iddireccionunica IS 'Identificador único de la dirección.';
COMMENT ON COLUMN  direccionunica.idtipovia IS 'Tipo de via.';
COMMENT ON COLUMN  direccionunica.via IS 'Nombre de la vía';
COMMENT ON COLUMN  direccionunica.numerovia IS 'Número';
COMMENT ON COLUMN  direccionunica.restovia IS 'Resto descriptivo de la via. Por ejemplo, Piso, Bloque, Nave, etc';
COMMENT ON COLUMN  direccionunica.cp IS 'Codigo postal.';
COMMENT ON COLUMN  direccionunica.localidad IS 'Localidad.';
COMMENT ON COLUMN  direccionunica.provincia IS 'Nombre de la provincia.';
COMMENT ON COLUMN  direccionunica.pais IS 'Pais del remitente.';
COMMENT ON COLUMN  direccionunica.latitud IS '';
COMMENT ON COLUMN  direccionunica.longitud IS '';
COMMENT ON COLUMN  direccionunica.origengis IS 'Origen de la geocodificacion M-Manual, H->Historico, A->Sistema de geolocalización (IGN, GOOGLE, OSM, etc.)';
COMMENT ON COLUMN  direccionunica.intentos IS 'Número de intentos de geolocalizacion.';
-- ---------------------------------------------------------------------------------
-- PROVEEDOR 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_proveedor_idproveedor;

CREATE TABLE proveedor (
    idproveedor INTEGER NOT NULL DEFAULT nextval('sq_proveedor_idproveedor'),
    proveedor VARCHAR(64) NOT NULL,
    PRIMARY KEY (idproveedor)
);


COMMENT ON TABLE proveedor IS 'Proveedor de envios. MRW, GLS, UPS, etc.';
COMMENT ON COLUMN  proveedor.idproveedor IS 'Identificador único del proveedor.';
COMMENT ON COLUMN  proveedor.proveedor IS 'Nombre del provvedor de envíos.';
-- ---------------------------------------------------------------------------------
-- TMPABONADO 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_tmpabonado_idtmpabonado;

CREATE TABLE tmpabonado (
    idtmpabonado INTEGER NOT NULL DEFAULT nextval('sq_tmpabonado_idtmpabonado'),
    codigoabonado VARCHAR(6) NOT NULL,
    codigofranquicia VARCHAR(5) NOT NULL,
    numeroenvio VARCHAR(12) NOT NULL,
    idenvio INTEGER,
    PRIMARY KEY (idtmpabonado)
);

CREATE INDEX ix_tmpabonado_numeroenvio ON tmpabonado(numeroenvio);
CREATE INDEX ix_tmpabonado_cliente ON tmpabonado(codigofranquicia, codigoabonado);

COMMENT ON COLUMN  tmpabonado.idtmpabonado IS '';
COMMENT ON COLUMN  tmpabonado.codigoabonado IS 'Código de abonado.';
COMMENT ON COLUMN  tmpabonado.codigofranquicia IS 'Código de la franquicia del abonado.';
COMMENT ON COLUMN  tmpabonado.numeroenvio IS 'Número de envío.';
COMMENT ON COLUMN  tmpabonado.idenvio IS 'Identificador único del envio. Cuando el valor NO sea nulo, estará actualizado el envío.';
-- ---------------------------------------------------------------------------------
-- POSICION 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_posicion_idposicion;

CREATE TABLE posicion (
    idposicion INTEGER NOT NULL DEFAULT nextval('sq_posicion_idposicion'),
    iddispositivo INTEGER NOT NULL,
    latitud DECIMAL(18,15) NOT NULL,
    longitud DECIMAL(18,15) NOT NULL,
    momento TIMESTAMP NOT NULL,
    PRIMARY KEY (idposicion)
);

CREATE INDEX ix_posicion_momento ON posicion(momento);

COMMENT ON COLUMN  posicion.idposicion IS '';
COMMENT ON COLUMN  posicion.iddispositivo IS '';
COMMENT ON COLUMN  posicion.latitud IS '';
COMMENT ON COLUMN  posicion.longitud IS '';
COMMENT ON COLUMN  posicion.momento IS 'Momento del posicionamiento.';
-- ---------------------------------------------------------------------------------
-- GEOGRAFIA 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_geografia_idgeografia;

CREATE TABLE geografia (
    idgeografia INTEGER NOT NULL DEFAULT nextval('sq_geografia_idgeografia'),
    idfranquicia INTEGER NOT NULL,
    denominacion VARCHAR(64) NOT NULL,
    activa VARCHAR(1) NOT NULL,
    PRIMARY KEY (idgeografia)
);


COMMENT ON COLUMN  geografia.idgeografia IS '';
COMMENT ON COLUMN  geografia.idfranquicia IS '';
COMMENT ON COLUMN  geografia.denominacion IS '';
COMMENT ON COLUMN  geografia.activa IS 'Indica si la geografía está activa. S->Si, N->No';
-- ---------------------------------------------------------------------------------
-- DISTRIBUCION 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_distribucion_iddistribucion;

CREATE TABLE distribucion (
    iddistribucion INTEGER NOT NULL DEFAULT nextval('sq_distribucion_iddistribucion'),
    idenvio INTEGER NOT NULL,
    idzonareparto INTEGER,
    PRIMARY KEY (iddistribucion)
);


COMMENT ON TABLE distribucion IS 'Zonas de reparto de las direcciones de entrega de los envíos.';
COMMENT ON COLUMN  distribucion.iddistribucion IS '';
COMMENT ON COLUMN  distribucion.idenvio IS '';
COMMENT ON COLUMN  distribucion.idzonareparto IS '';
-- ---------------------------------------------------------------------------------
-- GRUPOSERVICIOS 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_gruposervicios_idgruposervicios;

CREATE TABLE gruposervicios (
    idgruposervicios INTEGER NOT NULL DEFAULT nextval('sq_gruposervicios_idgruposervicios'),
    descripcion VARCHAR(64) NOT NULL,
    PRIMARY KEY (idgruposervicios)
);


COMMENT ON COLUMN  gruposervicios.idgruposervicios IS '';
COMMENT ON COLUMN  gruposervicios.descripcion IS '';
-- ---------------------------------------------------------------------------------
-- AGRUPACIONESSERVICIOS 
-- ---------------------------------------------------------------------------------
CREATE SEQUENCE sq_agrupacionesservicios_idrelacion;

CREATE TABLE agrupacionesservicios (
    idrelacion INTEGER NOT NULL DEFAULT nextval('sq_agrupacionesservicios_idrelacion'),
    idgruposervicios INTEGER NOT NULL,
    idservicio INTEGER NOT NULL,
    PRIMARY KEY (idrelacion)
);


COMMENT ON TABLE agrupacionesservicios IS 'Agrupaciones de servicios.';
COMMENT ON COLUMN  agrupacionesservicios.idrelacion IS '';
COMMENT ON COLUMN  agrupacionesservicios.idgruposervicios IS '';
COMMENT ON COLUMN  agrupacionesservicios.idservicio IS '';
ALTER TABLE parametro ADD CONSTRAINT fk_modulo_parametro FOREIGN KEY (idmodulo) REFERENCES modulo(idmodulo);
ALTER TABLE perfil ADD CONSTRAINT fk_modulo_perfil FOREIGN KEY (idmodulo) REFERENCES modulo(idmodulo);
ALTER TABLE usuario ADD CONSTRAINT fk_perfil_usuario FOREIGN KEY (idperfil) REFERENCES perfil(idperfil);
ALTER TABLE usuario ADD CONSTRAINT fk_persona_usuario FOREIGN KEY (idpersona) REFERENCES persona(idpersona);
ALTER TABLE usuario ADD CONSTRAINT fk_contacto_usuario FOREIGN KEY (idcontacto) REFERENCES contacto(idcontacto);
ALTER TABLE codigo ADD CONSTRAINT fk_categoria_codigo FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria);
ALTER TABLE auditoria ADD CONSTRAINT fk_modulo_auditoria FOREIGN KEY (idmodulo) REFERENCES modulo(idmodulo);
ALTER TABLE abonado ADD CONSTRAINT fk_codigo_abonado_idestado FOREIGN KEY (idestado) REFERENCES codigo(idcodigo);
ALTER TABLE abonado ADD CONSTRAINT fk_codigo_abonado_idfpago FOREIGN KEY (idsector) REFERENCES codigo(idcodigo);
ALTER TABLE abonado ADD CONSTRAINT fk_codigo_abonado_idvencimiento FOREIGN KEY (idfpago) REFERENCES codigo(idcodigo);
ALTER TABLE abonado ADD CONSTRAINT fk_prospecto_abonado FOREIGN KEY (idprospecto) REFERENCES prospecto(idprospecto);
ALTER TABLE abonado ADD FOREIGN KEY (idvencimiento) REFERENCES codigo(idcodigo);
ALTER TABLE serviciosabonado ADD CONSTRAINT fk_abonado_serviciosabonado FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE serviciosabonado ADD CONSTRAINT fk_servicio_serviciosabonado FOREIGN KEY (idservicio) REFERENCES servicio(idservicio);
ALTER TABLE envio ADD CONSTRAINT fk_franquicia_envio_origen FOREIGN KEY (frqabonado) REFERENCES franquicia(idfranquicia);
ALTER TABLE envio ADD CONSTRAINT fk_franquicia_envio_destino FOREIGN KEY (frqorigen) REFERENCES franquicia(idfranquicia);
ALTER TABLE envio ADD CONSTRAINT fk_franquicia_envio_frqcliente FOREIGN KEY (frqdestino) REFERENCES franquicia(idfranquicia);
ALTER TABLE envio ADD CONSTRAINT fk_franquicia_envio_frqtercera FOREIGN KEY (frqtercera) REFERENCES franquicia(idfranquicia);
ALTER TABLE envio ADD CONSTRAINT fk_codigo_envio_idcobro FOREIGN KEY (idestado) REFERENCES codigo(idcodigo);
ALTER TABLE envio ADD CONSTRAINT fk_codigo_envio_idgenerador FOREIGN KEY (idservicio) REFERENCES codigo(idcodigo);
ALTER TABLE envio ADD CONSTRAINT fk_codigo_envio_idtramo FOREIGN KEY (idcobro) REFERENCES codigo(idcodigo);
ALTER TABLE envio ADD CONSTRAINT fk_codigo_envio_idestado FOREIGN KEY (idgenerador) REFERENCES codigo(idcodigo);
ALTER TABLE envio ADD CONSTRAINT fk_abonado_envio FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE envio ADD CONSTRAINT fk_ceco_envio FOREIGN KEY (idceco) REFERENCES ceco(idceco);
ALTER TABLE envio ADD CONSTRAINT fk_repartidor_envio_idrepartidorr FOREIGN KEY (idrepartidorr) REFERENCES repartidor(idrepartidor);
ALTER TABLE envio ADD CONSTRAINT fk_repartidor_envio_idrepartidore FOREIGN KEY (idrepartidore) REFERENCES repartidor(idrepartidor);
ALTER TABLE envio ADD CONSTRAINT fk_proveedor_envio FOREIGN KEY (idproveedor) REFERENCES proveedor(idproveedor);
ALTER TABLE envio ADD FOREIGN KEY (idgeografia) REFERENCES codigo(idcodigo);
ALTER TABLE envio ADD FOREIGN KEY (idtramo) REFERENCES codigo(idcodigo);
ALTER TABLE envio ADD FOREIGN KEY (idfrecuencia) REFERENCES codigo(idcodigo);
ALTER TABLE factura ADD CONSTRAINT fk_codigo_factura FOREIGN KEY (idmoneda) REFERENCES codigo(idcodigo);
ALTER TABLE enviosfactura ADD CONSTRAINT fk_factura_enviosfactura FOREIGN KEY (idfactura) REFERENCES factura(idfactura);
ALTER TABLE enviosfactura ADD FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE bulto ADD CONSTRAINT fk_envio_bulto FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE contactosabonado ADD CONSTRAINT fk_abonado_contactosabonado FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE contactosabonado ADD CONSTRAINT fk_contacto_contactosabonado FOREIGN KEY (idcontacto) REFERENCES contacto(idcontacto);
ALTER TABLE lineafactura ADD CONSTRAINT fk_factura_lineafactura FOREIGN KEY (idfactura) REFERENCES factura(idfactura);
ALTER TABLE soporte ADD CONSTRAINT fk_usuario_soporte FOREIGN KEY (idsolicitante) REFERENCES usuario(idusuario);
ALTER TABLE soporte ADD CONSTRAINT fk_modulo_soporte FOREIGN KEY (idmodulo) REFERENCES modulo(idmodulo);
ALTER TABLE soporte ADD CONSTRAINT fk_codigo_soporte_idcategoria FOREIGN KEY (idcategoria) REFERENCES codigo(idcodigo);
ALTER TABLE soporte ADD CONSTRAINT fk_codigo_soporte_idestado FOREIGN KEY (idestado) REFERENCES codigo(idcodigo);
ALTER TABLE seguimiento ADD CONSTRAINT fk_usuario_seguimiento FOREIGN KEY (idgestor) REFERENCES usuario(idusuario);
ALTER TABLE seguimiento ADD CONSTRAINT fk_soporte_seguimiento FOREIGN KEY (idsoporte) REFERENCES soporte(idsoporte);
ALTER TABLE abonadosfranquicia ADD CONSTRAINT fk_franquicia_abonadosfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE abonadosfranquicia ADD CONSTRAINT fk_abonado_abonadosfranquicia FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE grupo ADD CONSTRAINT fk_persona_grupo FOREIGN KEY (idpersona) REFERENCES persona(idpersona);
ALTER TABLE grupo ADD CONSTRAINT fk_franquicia_grupo FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE grupo ADD CONSTRAINT fk_cargo_grupo FOREIGN KEY (idcargo) REFERENCES cargo(idcargo);
ALTER TABLE agregado ADD CONSTRAINT fk_codigo_agregado_idcategoria FOREIGN KEY (idcategoria) REFERENCES codigo(idcodigo);
ALTER TABLE agregado ADD CONSTRAINT fk_abonado_agregado FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE direccion ADD CONSTRAINT fk_codigo_direccion_idtipo FOREIGN KEY (idtipo) REFERENCES codigo(idcodigo);
ALTER TABLE direccion ADD CONSTRAINT fk_codigo_direccion_idtipovia FOREIGN KEY (idtipovia) REFERENCES codigo(idcodigo);
ALTER TABLE direccion ADD CONSTRAINT fk_abonado_direccion FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE direccion ADD CONSTRAINT fk_ceco_direccion FOREIGN KEY (idceco) REFERENCES ceco(idceco);
ALTER TABLE origenenvio ADD CONSTRAINT fk_codigo_origenenvio FOREIGN KEY (idtipovia) REFERENCES codigo(idcodigo);
ALTER TABLE origenenvio ADD CONSTRAINT fk_envio_origenenvio FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE personasabonado ADD CONSTRAINT fk_persona_abonado FOREIGN KEY (idpersona) REFERENCES persona(idpersona);
ALTER TABLE personasabonado ADD CONSTRAINT fk_abonado_personasabonado FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE destinoenvio ADD CONSTRAINT fk_codigo_destinoenvio FOREIGN KEY (idtipovia) REFERENCES codigo(idcodigo);
ALTER TABLE destinoenvio ADD CONSTRAINT fk_envio_destinoenvio FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE adjuntosoporte ADD CONSTRAINT fk_soporte_adjuntosoporte FOREIGN KEY (idsoporte) REFERENCES soporte(idsoporte);
ALTER TABLE adjuntosoporte ADD CONSTRAINT fk_seguimiento_adjuntosoporte FOREIGN KEY (idseguimiento) REFERENCES seguimiento(idseguimiento);
ALTER TABLE integracion ADD CONSTRAINT fk_abonado_integracion FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE ceco ADD CONSTRAINT fk_abonado_ceco FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE cecosintegracion ADD CONSTRAINT fk_integracion_cecosintegracion FOREIGN KEY (idintegracion) REFERENCES integracion(idintegracion);
ALTER TABLE cecosintegracion ADD CONSTRAINT fk_ceco_cecointegracion FOREIGN KEY (idceco) REFERENCES ceco(idceco);
ALTER TABLE serviciosintegracion ADD CONSTRAINT fk_servicio_serviciosintegracion FOREIGN KEY (idservicio) REFERENCES servicio(idservicio);
ALTER TABLE serviciosintegracion ADD CONSTRAINT fk_integracion_serviciosintegracion FOREIGN KEY (idintegracion) REFERENCES integracion(idintegracion);
ALTER TABLE interfaz ADD CONSTRAINT fk_integracion_interfaz FOREIGN KEY (idintegracion) REFERENCES integracion(idintegracion);
ALTER TABLE dispositivosfranquicia ADD CONSTRAINT fk_franquicia_dispositivosfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE dispositivosfranquicia ADD CONSTRAINT fk_dispositivo_dispositivosfranquicia FOREIGN KEY (iddispositivo) REFERENCES dispositivo(iddispositivo);
ALTER TABLE repartidor ADD CONSTRAINT fk_persona_repartidor FOREIGN KEY (idpersona) REFERENCES persona(idpersona);
ALTER TABLE dispositivosrepartidor ADD CONSTRAINT fk_terminal_dispositivosrepartidor FOREIGN KEY (idterminal) REFERENCES dispositivosfranquicia(idrelacion);
ALTER TABLE dispositivosrepartidor ADD CONSTRAINT fk_repartidor_dispositivosrepartidor FOREIGN KEY (idrepartidor) REFERENCES repartidor(idrepartidor);
ALTER TABLE repartidoresfranquicia ADD CONSTRAINT fk_franquicia_repartidoresfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE repartidoresfranquicia ADD CONSTRAINT fk_repartidor_repartidoresfranquicia FOREIGN KEY (idrepartidor) REFERENCES repartidor(idrepartidor);
ALTER TABLE ordenadoresfranquicia ADD CONSTRAINT fk_franquicia_ordenadoresfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE ordenadoresfranquicia ADD CONSTRAINT fk_ordenador_ordenadoresfranquicia FOREIGN KEY (idordenador) REFERENCES ordenador(idordenador);
ALTER TABLE telefonosfranquicia ADD CONSTRAINT fk_franquicia_telefonosfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE telefonosfranquicia ADD CONSTRAINT fk_telefono_telefonosfranquicia FOREIGN KEY (idtelefono) REFERENCES telefono(idtelefono);
ALTER TABLE headsetsfranquicia ADD CONSTRAINT fk_franquicia_headsetsfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE headsetsfranquicia ADD CONSTRAINT fk_headset_headsetsfranquicia FOREIGN KEY (idheadset) REFERENCES headset(idheadset);
ALTER TABLE impresorasfranquicia ADD CONSTRAINT fk_franquicia_impresorasfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE impresorasfranquicia ADD CONSTRAINT fk_impresora_impresorasfranquicia FOREIGN KEY (idimpresora) REFERENCES impresora(idimpresora);
ALTER TABLE routersfranquicia ADD CONSTRAINT fk_franquicia_routersfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE routersfranquicia ADD CONSTRAINT fk_router_routersfranquicia FOREIGN KEY (idrouter) REFERENCES router(idrouter);
ALTER TABLE credenciales ADD CONSTRAINT fk_franquicia_credenciales FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE zonareparto ADD CONSTRAINT fk_geografia_zonareparto FOREIGN KEY (idgeografia) REFERENCES geografia(idgeografia);
ALTER TABLE vertice ADD CONSTRAINT fk_zonareparto_vertice FOREIGN KEY (idzonareparto) REFERENCES zonareparto(idzonareparto);
ALTER TABLE prospecto ADD CONSTRAINT fk_codigoorigen_prospecto FOREIGN KEY (idorigen) REFERENCES codigo(idcodigo);
ALTER TABLE prospecto ADD CONSTRAINT fk_codigo_prospecto_idestado FOREIGN KEY (idsector) REFERENCES codigo(idcodigo);
ALTER TABLE prospecto ADD CONSTRAINT fk_codigo_prospecto_idorigen FOREIGN KEY (idestado) REFERENCES codigo(idcodigo);
ALTER TABLE accion ADD CONSTRAINT fk_codigo_accion_idestado FOREIGN KEY (idtipo) REFERENCES codigo(idcodigo);
ALTER TABLE accion ADD CONSTRAINT fk_codigo_accion_idtipo FOREIGN KEY (idmedio) REFERENCES codigo(idcodigo);
ALTER TABLE accion ADD CONSTRAINT fk_codigo_accion_idoferta FOREIGN KEY (idestado) REFERENCES codigo(idcodigo);
ALTER TABLE accion ADD CONSTRAINT fk_codigo_accion_idmedio FOREIGN KEY (idoferta) REFERENCES codigo(idcodigo);
ALTER TABLE accion ADD CONSTRAINT fk_abonado_evento FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE accion ADD CONSTRAINT fk_prospecto_accion FOREIGN KEY (idprospecto) REFERENCES prospecto(idprospecto);
ALTER TABLE accion ADD CONSTRAINT fk_comercial_accion FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE tarea ADD CONSTRAINT fk_usuario_tarea_idorigen FOREIGN KEY (idorigen) REFERENCES usuario(idusuario);
ALTER TABLE tarea ADD CONSTRAINT fk_comercial_tarea FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE objetivo ADD CONSTRAINT fk_codigo_objetivo_idcategoria FOREIGN KEY (idcategoria) REFERENCES codigo(idcodigo);
ALTER TABLE objetivo ADD CONSTRAINT fk_comercial_objetivo FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE jornada ADD CONSTRAINT fk_comercial_jornada FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE goal ADD CONSTRAINT fk_codigo_goal_idcategoria FOREIGN KEY (idcategoria) REFERENCES codigo(idcodigo);
ALTER TABLE goal ADD CONSTRAINT fk_comercial_goal FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE abonadoscomercial ADD CONSTRAINT fk_abonado_abonadoscomercial FOREIGN KEY (idabonado) REFERENCES abonado(idabonado);
ALTER TABLE abonadoscomercial ADD CONSTRAINT fk_comercial_abonadoscomercial FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE comercialesfranquicia ADD CONSTRAINT fk_franquicia_comercialesfranquicia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE comercialesfranquicia ADD CONSTRAINT fk_comercial_comercialesfranquicia FOREIGN KEY (idcomercial) REFERENCES comercial(idcomercial);
ALTER TABLE evento ADD CONSTRAINT fk_persona_evento FOREIGN KEY (idpersona) REFERENCES persona(idpersona);
ALTER TABLE clasificacion ADD CONSTRAINT fk_envio_clasificacion FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE clasificacion ADD CONSTRAINT fk_dispositivo_clasificacion FOREIGN KEY (iddispositivo) REFERENCES dispositivo(iddispositivo);
ALTER TABLE clasificacion ADD CONSTRAINT fk_zonareparto_clasificacion FOREIGN KEY (idzonareparto) REFERENCES zonareparto(idzonareparto);
ALTER TABLE estadoenvio ADD CONSTRAINT fk_codigo_estadoenvio FOREIGN KEY (idestado) REFERENCES codigo(idcodigo);
ALTER TABLE estadoenvio ADD CONSTRAINT fk_envio_estadoenvio FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE proceso ADD CONSTRAINT fk_modulo_proceso FOREIGN KEY (idmodulo) REFERENCES modulo(idmodulo);
ALTER TABLE proceso ADD CONSTRAINT fk_codigo_proceso_idresultado FOREIGN KEY (idresultado) REFERENCES codigo(idcodigo);
ALTER TABLE proceso ADD CONSTRAINT fk_servidor_proceso FOREIGN KEY (idservidor) REFERENCES servidor(idservidor);
ALTER TABLE resultadoproceso ADD CONSTRAINT fk_proceso_resultado FOREIGN KEY (idproceso) REFERENCES proceso(idproceso);
ALTER TABLE direccionunica ADD CONSTRAINT fk_codigo_direccionunica_idtipovia FOREIGN KEY (idtipovia) REFERENCES codigo(idcodigo);
ALTER TABLE geografia ADD CONSTRAINT fk_franquicia_geografia FOREIGN KEY (idfranquicia) REFERENCES franquicia(idfranquicia);
ALTER TABLE distribucion ADD CONSTRAINT fk_envio_distribucion FOREIGN KEY (idenvio) REFERENCES envio(idenvio);
ALTER TABLE distribucion ADD CONSTRAINT fk_zonareparto_distribucion FOREIGN KEY (idzonareparto) REFERENCES zonareparto(idzonareparto);
ALTER TABLE agrupacionesservicios ADD CONSTRAINT fk_servicio_agrupacionesservicios FOREIGN KEY (idservicio) REFERENCES servicio(idservicio);
ALTER TABLE agrupacionesservicios ADD CONSTRAINT fk_gruposervicios_agrupacionesservicios FOREIGN KEY (idgruposervicios) REFERENCES gruposervicios(idgruposervicios);