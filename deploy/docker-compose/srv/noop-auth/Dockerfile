FROM openjdk:17-jdk-alpine as builder

LABEL author="lear" \
	email="362664609@qq.com"

#ADD ./target/noop-auth-*.jar /app.jar
ADD ./noop-auth-*.jar /app.jar

RUN sh -c 'touch /app.jar'

EXPOSE 10002

CMD ["--server.port=10002"]

ENV JAVA_OPTS="-server -Xms256m -Xmx256m"
#ENTRYPOINT ["java", "-jar","/app.jar"]
ENTRYPOINT exec java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.jar